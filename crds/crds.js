/* CRDS Morand : recherche instantanée dans crds_data.json (aucun appel réseau après le chargement). Le texte des
   données n'est jamais inséré comme HTML : tout passe par textContent. Les cases cochées ne sont gardées nulle part. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const q = $("cr-q"), zone = $("cr-resultats"), etat = $("cr-etat"), vide = $("cr-vide"), urgence = $("cr-urgence");
  const sansAccents = t => String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const el = (tag, cls, texte) => { const e = document.createElement(tag); if (cls) e.className = cls; if (texte != null) e.textContent = texte; return e; };
  const NS = "http://www.w3.org/2000/svg";
  const icone = (cls, d) => { const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true"); s.setAttribute("class", cls);
    d.forEach(x => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", x); s.appendChild(p); }); return s; };
  const ALERTE = ["M12 3.5 2.8 19.5h18.4z", "M12 10v4.2", "M12 17.2v.1"], OK = ["M5 12.5l4.5 4.5L19 7.5"];
  const TYPES = { laboratoires: "Labo", imagerie: "Imagerie", examens: "Examen", autres: "" };
  let D = null, index = [], minuterie = 0;

  // Raccourci affiché selon l'appareil : ⌘K sur Mac et iPad avec clavier, Ctrl K ailleurs.
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  $("cr-raccourci").textContent = mac ? "⌘K" : "Ctrl K"; $("cr-raccourci").hidden = false;
  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); q.focus(); q.select(); return; }
    if (e.key === "/" && document.activeElement !== q && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
    if (e.key === "Escape" && document.activeElement === q && q.value) { q.value = ""; rendre(); }
  });

  // Surligne les mots cherchés dans un texte, sans HTML.
  function surligner(parent, texte, mots) {
    if (!mots.length) { parent.appendChild(document.createTextNode(texte)); return; }
    const plat = sansAccents(texte), marques = new Array(texte.length).fill(false);
    mots.forEach(m => { let i = plat.indexOf(m); while (i >= 0) { for (let k = i; k < i + m.length; k++) marques[k] = true; i = plat.indexOf(m, i + m.length); } });
    let i = 0;
    while (i < texte.length) {
      let j = i; while (j < texte.length && marques[j] === marques[i]) j++;
      const morceau = texte.slice(i, j);
      parent.appendChild(marques[i] ? el("mark", null, morceau) : document.createTextNode(morceau));
      i = j;
    }
  }

  // Chaque mot cherché doit commencer un mot de la fiche ; deux lettres ou moins (FA, IC), être un mot entier.
  function correspond(entree, mots) {
    return mots.every(m => entree.mots.some(w => m.length <= 2 ? w === m : w.startsWith(m)) || (m.length > 3 && entree.plat.includes(m)));
  }
  function score(entree, mots) {
    const titre = sansAccents(entree.p.probleme + " " + entree.p.specialite);
    return mots.reduce((s, m) => s + (titre.includes(m) ? 3 : 0) + (sansAccents(entree.p.synonymes.join(" ")).includes(m) ? 1 : 0), 0);
  }

  function carte(p, mots) {
    const f = D.formulaires.find(x => x.id === p.formulaire);
    const c = el("article", "cr-carte"); c.id = p.id;
    const tete = el("div", "cr-carte-tete"), gauche = el("div");
    const sur = el("p", "cr-sur"); surligner(sur, `${p.specialite} · ${p.categorie}`, mots); gauche.appendChild(sur);
    const h = el("h3"); surligner(h, p.probleme, mots); gauche.appendChild(h);
    tete.appendChild(gauche);
    // Une ou plusieurs priorités : la pastille donne la plus urgente (ou l'étendue, « B–D »), les critères donnent chaque variante.
    const niv = p.priorites.map(x => x.niveau), haut = [...niv].sort()[0], bas = [...niv].sort().slice(-1)[0];
    const b = el("div", "cr-prio"); b.dataset.niveau = haut;
    b.setAttribute("aria-label", haut === "HORS" ? "Hors CRDS" : haut === bas ? `Priorité ${haut}, ${D.echelle_priorite[haut]}` : `Priorités ${haut} à ${bas} selon les critères`);
    b.append(el("b", null, haut === "HORS" ? "—" : haut === bas ? haut : `${haut}–${bas}`), el("span", null, haut === bas ? D.echelle_priorite[haut] : "selon critères"));
    tete.appendChild(b); c.appendChild(tete);

    const crit = el("div", "cr-bloc"); crit.appendChild(el("h4", null, p.priorites.length > 1 ? "Priorité selon les critères" : "Critères cliniques"));
    const ul = el("ul", p.priorites.length > 1 ? "cr-variantes" : "cr-criteres");
    p.priorites.forEach(v => v.criteres.forEach(x => {
      const li = el("li");
      if (p.priorites.length > 1) { const n = el("span", "cr-mini", v.niveau); n.dataset.niveau = v.niveau; n.title = D.echelle_priorite[v.niveau]; li.appendChild(n); }
      const t = el("span"); surligner(t, x, mots); li.appendChild(t);
      if (p.priorites.length > 1) li.appendChild(el("span", "cr-delai", D.echelle_priorite[v.niveau]));
      ul.appendChild(li);
    }));
    crit.appendChild(ul); c.appendChild(crit);

    // Prérequis obligatoires : toujours affichés, même vides, pour qu'on sache qu'il n'y en a pas.
    const ob = Object.entries(p.prerequis_obligatoires).flatMap(([t, l]) => l.map(x => [t, x]));
    const pre = el("div", "cr-bloc cr-prerequis"); const h4 = el("h4"); h4.append(icone("i-alerte i-petit", ALERTE), document.createTextNode("Prérequis obligatoires")); pre.appendChild(h4);
    if (!ob.length) { pre.classList.add("cr-sans"); pre.appendChild(el("p", "cr-aucun", "Aucun prérequis inscrit au formulaire pour cette raison.")); }
    else {
      const l = el("ul");
      ob.forEach(([t, x], i) => {
        const li = el("li"), lab = el("label"), cb = el("input"), co = el("span", "cr-coche"), tx = el("span", "cr-texte");
        cb.type = "checkbox"; cb.id = `${p.id}-pre-${i}`; lab.htmlFor = cb.id;
        co.append(icone("i-alerte", ALERTE), icone("i-ok", OK));
        if (TYPES[t]) tx.appendChild(el("span", "cr-type", TYPES[t]));
        surligner(tx, x, mots);
        lab.append(cb, co, tx); li.appendChild(lab); l.appendChild(li);
        cb.addEventListener("change", () => { cb.setAttribute("aria-label", cb.checked ? "Fait" : "À faire"); });
      });
      pre.appendChild(l);
      pre.appendChild(el("p", "cr-aucun", "Cochez ce qui est fait ou demandé : l'alerte reste tant qu'un prérequis manque."));
    }
    c.appendChild(pre);

    const so = Object.entries(p.prerequis_souhaitables).flatMap(([t, l]) => l.map(x => [t, x]));
    if (so.length) {
      const s = el("div", "cr-bloc"); s.appendChild(el("h4", null, "Souhaitable"));
      const l = el("ul", "cr-souhaitable"); so.forEach(([t, x]) => { const li = el("li"); if (TYPES[t]) li.appendChild(el("span", "cr-type", TYPES[t])); surligner(li, x, mots); l.appendChild(li); });
      s.appendChild(l); c.appendChild(s);
    }
    const notes = [...(p.orientation || []), ...(p.exclusions_urgence || [])];
    if (notes.length) { const o = el("div", "cr-orientation"); notes.forEach(n => o.appendChild(el("p", null, n))); c.appendChild(o); }

    const src = el("p", "cr-source");
    src.append(document.createTextNode(`${f.id} · rév. ${f.revision}${p.libelle_formulaire ? ` · au formulaire : « ${p.libelle_formulaire} »` : ""} · `));
    const a = el("a", null, "Formulaire du MSSS"); a.href = f.url; a.rel = "noopener"; src.appendChild(a);
    c.appendChild(src);
    return c;
  }

  // Sans recherche : la liste des spécialités (un toucher filtre la spécialité).
  function specialites() {
    const g = el("div", "cr-specs");
    D.formulaires.forEach(f => {
      const n = index.filter(e => e.p.formulaire === f.id).length;
      const bt = el("button", "cr-spec"); bt.type = "button";
      bt.append(el("span", "cr-spec-nom", f.specialite), el("span", "cr-spec-sous", `${f.id} · ${n} raison${n > 1 ? "s" : ""}`));
      bt.addEventListener("click", () => { q.value = f.specialite; rendre(); q.focus(); });
      g.appendChild(bt);
    });
    zone.appendChild(g);
  }

  function rendre() {
    if (!D) return;
    const mots = sansAccents(q.value.trim()).split(/[^a-z0-9<>≤≥]+/).filter(Boolean);
    zone.textContent = ""; urgence.textContent = ""; urgence.hidden = true;
    if (!mots.length) {
      specialites(); vide.hidden = true;
      etat.textContent = `${D.formulaires.length} spécialité${D.formulaires.length > 1 ? "s" : ""} · ${index.length} raisons de consultation`;
      return;
    }
    const liste = index.filter(e => correspond(e, mots)).sort((a, b) => score(b, mots) - score(a, mots) || a.rang - b.rang);
    // Alertes cliniques du formulaire (urgence, spécialiste de garde) quand les résultats viennent d'une ou deux spécialités.
    const specs = [...new Set(liste.map(e => e.p.formulaire))];
    if (specs.length <= 2) specs.forEach(id => {
      const f = D.formulaires.find(x => x.id === id); if (!f || !f.alertes_urgence || !f.alertes_urgence.length) return;
      const titre = `${f.alertes_titre || "Diriger l'usager à l'urgence"} · ${f.specialite}`;
      const a = el("section", "cr-alerte"); a.setAttribute("aria-label", titre);
      const h = el("h2"); h.append(icone("i-alerte i-petit", ALERTE), document.createTextNode(titre)); a.appendChild(h);
      const ul = el("ul"); f.alertes_urgence.forEach(x => ul.appendChild(el("li", null, x))); a.appendChild(ul);
      if (f.consignes && f.consignes.length) { const d = el("details", "cr-consignes-f"); d.appendChild(el("summary", null, "Consignes du formulaire"));
        const u2 = el("ul"); f.consignes.forEach(x => u2.appendChild(el("li", null, x))); d.appendChild(u2); a.appendChild(d); }
      urgence.appendChild(a);
    });
    urgence.hidden = !urgence.childElementCount;
    liste.forEach(e => zone.appendChild(carte(e.p, mots)));
    vide.hidden = liste.length > 0;
    const n = liste.length;
    etat.textContent = `${n} raison${n > 1 ? "s" : ""} de consultation`;
  }

  function sources() {
    const z = $("cr-formulaires");
    D.formulaires.forEach(f => {
      const p = el("p", "cr-form"); const a = el("a", null, `${f.id} (${f.code_barre}), ${f.specialite}`); a.href = f.url; a.rel = "noopener";
      p.append(a, document.createTextNode(`, révision ${f.revision}, ${f.organisme}. Vérifié le ${f.verifie_le}. ${f.statut}`)); z.appendChild(p);
    });
    D.region.consignes.forEach(x => $("cr-consignes").appendChild(el("li", null, x)));
    $("cr-a-venir").textContent = D.a_venir;
  }

  fetch("/crds/crds_data.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    D = d;
    index = d.problemes.map((p, rang) => {
      const texte = [p.probleme, p.libelle_formulaire || "", p.specialite, p.categorie, p.formulaire, ...p.synonymes, ...p.priorites.flatMap(x => x.criteres),
        ...Object.values(p.prerequis_obligatoires).flat(), ...Object.values(p.prerequis_souhaitables).flat()].join(" ");
      const plat = sansAccents(texte);
      return { p, rang, plat, mots: plat.split(/[^a-z0-9]+/).filter(Boolean) };
    });
    sources(); rendre();
    const depart = new URLSearchParams(location.search).get("q"); if (depart) { q.value = depart; rendre(); }
  }).catch(() => { etat.textContent = "Les données n'ont pas pu être chargées. Vérifiez la connexion, puis rechargez la page."; });

  q.addEventListener("input", () => { clearTimeout(minuterie); minuterie = setTimeout(rendre, 40); });
})();
