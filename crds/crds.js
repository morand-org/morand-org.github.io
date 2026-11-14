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
  let D = null, index = [], indexPB = [], minuterie = 0;
  const motsDe = t => sansAccents(t).split(/[^a-z0-9]+/).filter(Boolean);

  // Raccourci affiché selon l'appareil : ⌘K sur Mac et iPad avec clavier, Ctrl K ailleurs.
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  $("cr-raccourci").textContent = mac ? "⌘K" : "Ctrl K"; $("cr-raccourci").hidden = false;
  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); q.focus(); q.select(); return; }
    if (e.key === "/" && document.activeElement !== q && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
    if (e.key === "Escape" && document.activeElement === q && q.value) { q.value = ""; rendre(); }
  });

  // Surligne les mots cherchés dans un texte, sans HTML.
  // Le texte des fiches est affiché tel quel, sans surlignage des mots cherchés.
  function surligner(parent, texte) { parent.appendChild(document.createTextNode(texte)); }

  // Chaque mot cherché doit commencer un mot de la fiche ; deux lettres ou moins (FA, IC), être un mot entier.
  function correspond(entree, mots) {
    return mots.every(m => entree.mots.some(w => m.length <= 2 ? w === m : w.startsWith(m)) || (m.length > 3 && entree.plat.includes(m)));
  }
  function score(entree, mots) {
    const titre = sansAccents(`${entree.p.probleme} ${entree.p.libelle_formulaire || ""} ${entree.p.specialite}`);
    // Un synonyme identique au mot cherché (FA, AAA, TDAH) compte autant que le titre.
    const syn = entree.p.synonymes.map(sansAccents);
    return mots.reduce((s, m) => s + (titre.includes(m) ? 3 : 0) + (syn.includes(m) ? 3 : syn.some(x => x.includes(m)) ? 1 : 0), 0);
  }

  function carte(p, mots) {
    const f = D.formulaires.find(x => x.id === p.formulaire);
    const c = el("article", "cr-carte"); c.id = p.id;
    const tete = el("div", "cr-carte-tete"), gauche = el("div");
    const sur = el("p", "cr-sur"); surligner(sur, `${p.specialite} · ${p.categorie}`, mots); gauche.appendChild(sur);
    const h = el("h3"); surligner(h, p.probleme, mots); gauche.appendChild(h);
    if ([...(p.orientation || []), ...(p.exclusions_urgence || [])].some(x => /accueil clinique/i.test(x)))
      gauche.appendChild(el("p", "cr-ac-pastille", "Accueil clinique d'abord, si disponible"));
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

    // Prérequis obligatoires en rouge ; sans prérequis : « Aucun prérequis » en vert ; souhaitables en jaune.
    const ob = Object.entries(p.prerequis_obligatoires).flatMap(([t, l]) => l.map(x => [t, x]));
    if (!ob.length) { const a = el("p", "cr-aucun-pre"); a.append(icone("i-ok i-petit", OK), document.createTextNode("Aucun prérequis")); c.appendChild(a); }
    else {
      const pre = el("div", "cr-bloc cr-prerequis"); const h4 = el("h4"); h4.append(icone("i-alerte i-petit", ALERTE), document.createTextNode("Prérequis obligatoires")); pre.appendChild(h4);
      const l = el("ul");
      ob.forEach(([t, x]) => { const li = el("li"); if (TYPES[t]) li.appendChild(el("span", "cr-type", TYPES[t])); li.appendChild(document.createTextNode(x)); l.appendChild(li); });
      pre.appendChild(l); c.appendChild(pre);
    }
    const so = Object.entries(p.prerequis_souhaitables).flatMap(([t, l]) => l.map(x => [t, x]));
    if (so.length) {
      const s2 = el("div", "cr-bloc cr-souhaitables"); s2.appendChild(el("h4", null, "Souhaitable"));
      const l = el("ul"); so.forEach(([t, x]) => { const li = el("li"); if (TYPES[t]) li.appendChild(el("span", "cr-type", TYPES[t])); li.appendChild(document.createTextNode(x)); l.appendChild(li); });
      s2.appendChild(l); c.appendChild(s2);
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

  // Accueil clinique : une carte par problème ciblé par le MSSS qui correspond à la recherche.
  function carteAccueil(c, mots) {
    const A = D.accueil_clinique, k = el("article", "cr-carte cr-carte-ac");
    const tete = el("div", "cr-carte-tete"), g = el("div");
    g.appendChild(el("p", "cr-sur", "Accueil clinique · problème ciblé par le MSSS"));
    const h = el("h3"); surligner(h, c.nom, mots); g.appendChild(h); tete.appendChild(g);
    const b = el("div", "cr-prio cr-prio-ac"); b.append(el("b", null, "AC"), el("span", null, "24 à 72 h")); b.setAttribute("aria-label", "Accueil clinique, prise en charge en 24 à 72 heures");
    tete.appendChild(b); k.appendChild(tete);
    k.appendChild(el("p", "cr-ac-texte", "Diriger vers l'accueil clinique de votre territoire si le protocole y est offert, avant le CRDS. Le professionnel demandeur assure le suivi."));
    const l = el("p", "cr-ac-texte"); l.textContent = "Montérégie : " + A.monteregie.map(x => x.installations.join(", ")).join(" ; ") + ".";
    k.appendChild(l);
    const src = el("p", "cr-source"); const a = el("a", null, "Orientations du MSSS (2022), annexe B"); a.href = A.source.url; a.rel = "noopener";
    src.append(document.createTextNode("Protocoles relevés ici : Hôpital Pierre-Boucher seulement. Ailleurs, vérifiez l'offre de votre installation · "), a); k.appendChild(src);
    return k;
  }
  // Petits blocs : une liste avec son titre ; un bloc repliable.
  const liste = (cls, lignes) => { const ul = el("ul", cls); lignes.forEach(x => ul.appendChild(el("li", null, x))); return ul; };
  function bloc(titre, lignes, cls) { const b = el("div", "cr-bloc" + (cls ? " " + cls : "")); b.append(el("h4", null, titre), liste("cr-criteres", lignes)); return b; }
  function repli(titre, cls) { const d = el("details", cls || "cr-region"); d.appendChild(el("summary", null, titre)); return d; }
  const lienPortail = (texte, url) => { const a = el("a", null, texte); a.href = url; a.rel = "noopener"; return a; };

  /* Accueil clinique de l'Hôpital Pierre-Boucher : une carte par protocole. L'essentiel pour référer est visible
     (indication, prérequis, contre-indications, comment référer) ; tout le protocole est replié dessous. */
  function cartePB(p) {
    const PB = D.accueil_clinique.pierre_boucher, ci = p.contre_indications, d = p.detail;
    const k = el("article", "cr-carte cr-carte-ac"); k.id = p.id;
    const tete = el("div", "cr-carte-tete"), g = el("div");
    g.append(el("p", "cr-sur", `Accueil clinique · ${PB.installation} · ${p.specialite}`), el("h3", null, p.nom)); tete.appendChild(g);
    const b = el("div", "cr-prio cr-prio-ac"); b.append(el("b", null, "AC"), el("span", null, "24 à 72 h")); b.setAttribute("aria-label", "Accueil clinique, prise en charge en 24 à 72 heures");
    tete.appendChild(b); k.appendChild(tete);
    if (p.delai) k.appendChild(el("p", "cr-ac-texte", p.delai));
    k.appendChild(bloc(p.indication.length > 1 ? "Indications" : "Indication", p.indication));

    // Prérequis en rouge ; aucun prérequis en vert ; souhaitable en jaune (comme les fiches du CRDS).
    if (!p.prerequis.length) {
      const a = el("p", "cr-aucun-pre"); a.append(icone("i-ok i-petit", OK), document.createTextNode("Aucun prérequis")); k.appendChild(a);
      k.appendChild(el("p", "cr-ac-texte cr-petit", "Le protocole n'en mentionne aucun ; l'ordonnance préétablie reste à remplir."));
    } else {
      const pre = el("div", "cr-bloc cr-prerequis"), h4 = el("h4"); h4.append(icone("i-alerte i-petit", ALERTE), document.createTextNode("Prérequis obligatoires"));
      pre.append(h4, liste(null, p.prerequis)); k.appendChild(pre);
    }
    if (p.souhaitables.length) { const s2 = el("div", "cr-bloc cr-souhaitables"); s2.append(el("h4", null, "Souhaitable"), liste(null, p.souhaitables)); k.appendChild(s2); }

    const c = el("div", "cr-bloc cr-ci"), hc = el("h4"); hc.append(icone("i-alerte i-petit", ALERTE), document.createTextNode("Contre-indications : diriger à l'urgence"));
    c.append(hc, liste("cr-criteres", ci.specifiques));
    c.append(el("p", "cr-ci-sous", `Générales, selon ${ci.generales_selon}`), liste("cr-criteres cr-ci-gen", ci.generales));
    if (ci.selon_ordonnance) c.append(el("p", "cr-ci-sous", `Selon l'ordonnance ${p.ordonnance.numero.split(" ")[0]}`), liste("cr-criteres cr-ci-gen", ci.selon_ordonnance));
    k.appendChild(c);
    const notes = [...p.urgence, ...p.a_noter];
    if (notes.length) { const o = el("div", "cr-orientation"); notes.forEach(n => o.appendChild(el("p", null, n))); k.appendChild(o); }

    // Pour référer : les deux gestes exigés par le portail, avec les coordonnées du service.
    const r = el("div", "cr-bloc cr-referer"); r.appendChild(el("h4", null, "Pour référer"));
    r.appendChild(liste("cr-criteres", [`Aviser d'abord l'infirmière : ${PB.acces.coordonnees.telephone}`,
      `Télécopier l'ordonnance ${p.ordonnance.numero.split(" ")[0]} remplie et votre note médicale : ${PB.acces.coordonnees.telecopieur}`,
      "Remettre au patient l'ordonnance originale, une copie de la note et le document d'informations"]));
    k.appendChild(r);

    const t = repli("Tout le protocole", "cr-region cr-protocole");
    const section = (titre, lignes, note) => { if (!lignes.length && !note) return; t.appendChild(el("h4", null, titre)); if (lignes.length) t.appendChild(liste(null, lignes)); if (note) t.appendChild(el("p", "cr-petit", note)); };
    section(`Ce que fait l'accueil clinique, selon l'ordonnance ${p.ordonnance.numero.split(" ")[0]}`, d.algorithme_ordonnance, d.algorithme_note);
    section("Ce que fait l'accueil clinique, selon le portail", d.algorithme_portail,
      d.algorithme_portail.length && d.lignes_omises ? `${d.lignes_omises} ligne${d.lignes_omises > 1 ? "s" : ""} du portail, coupée${d.lignes_omises > 1 ? "s" : ""} après le signe « < », ${d.lignes_omises > 1 ? "ne sont pas reproduites" : "n'est pas reproduite"} : cette liste est incomplète.` : "");
    section("Scores à remplir sur l'ordonnance", d.scores);
    section("Ordonnance pour la pharmacie communautaire", d.pharmacie);
    section("Annexes", d.annexes);
    section("Écarts relevés entre le portail et l'ordonnance", d.ecarts);
    k.appendChild(t);

    const src = el("p", "cr-source");
    src.append(document.createTextNode(`Portail de l'accueil clinique, page mise à jour le ${p.mise_a_jour} · ordonnance ${p.ordonnance.numero}, ${p.ordonnance.version} · relevé le ${PB.releve_le} · © CSSS Pierre-Boucher · `),
      lienPortail("Protocole", p.page), document.createTextNode(" · "), lienPortail("Ordonnance", p.ordonnance.url), document.createTextNode(" (connexion requise)"));
    k.appendChild(src);
    return k;
  }
  // Panneau : les protocoles de Pierre-Boucher et la marche à suivre pour référer.
  function panneauPB(s) {
    const PB = D.accueil_clinique.pierre_boucher, A = PB.acces;
    s.appendChild(el("h3", null, `${PB.installation} : ${PB.protocoles.length} protocoles`));
    const g = el("div", "cr-ac-puces");
    PB.protocoles.forEach(p => { const b = el("button", "cr-ac-puce", p.nom); b.type = "button"; b.addEventListener("click", () => { q.value = p.nom; rendre(); q.focus(); }); g.appendChild(b); });
    s.appendChild(g);
    const c = el("div", "cr-ac-coord");
    [["Infirmière", A.coordonnees.telephone], ["Télécopieur", A.coordonnees.telecopieur], ["Heures", A.heures.join(" · ")]].forEach(([n, v]) => { const p = el("p"); p.append(el("span", "cr-type", n), document.createTextNode(v)); c.appendChild(p); });
    s.appendChild(c);
    // Sous les coordonnées : la marche à suivre, repliée.
    const r = repli("Comment référer"); r.appendChild(liste(null, A.comment_referer)); s.appendChild(r);
  }

  function panneauAccueil() {
    const A = D.accueil_clinique, s = el("section", "cr-ac-panneau"); s.setAttribute("aria-labelledby", "cr-ac-titre");
    const h = el("h2", null, "Accueil clinique"); h.id = "cr-ac-titre"; s.appendChild(h);
    s.appendChild(el("p", "cr-ac-texte", A.definition));
    if (A.pierre_boucher) panneauPB(s);
    zone.appendChild(s);
  }

  function rendre() {
    if (!D) return;
    const mots = sansAccents(q.value.trim()).split(/[^a-z0-9]+/).filter(Boolean);
    zone.textContent = ""; urgence.textContent = ""; urgence.hidden = true;
    if (!mots.length) {
      specialites(); if (D.accueil_clinique) panneauAccueil(); vide.hidden = true;
      etat.textContent = `${D.formulaires.length} spécialité${D.formulaires.length > 1 ? "s" : ""} · ${index.length} raisons de consultation`;
      return;
    }
    const resultats = index.filter(e => correspond(e, mots)).sort((a, b) => score(b, mots) - score(a, mots) || a.rang - b.rang);
    // Alertes cliniques du formulaire (urgence, spécialiste de garde) quand les résultats viennent d'une ou deux spécialités.
    const specs = [...new Set(resultats.map(e => e.p.formulaire))];
    if (specs.length <= 2) specs.forEach(id => {
      const f = D.formulaires.find(x => x.id === id); if (!f || !f.alertes_urgence || !f.alertes_urgence.length) return;
      const titre = `${f.alertes_titre || "Diriger l'usager à l'urgence"} · ${f.specialite}`;
      // Repliable : ouverte sur grand écran, fermée sur téléphone pour laisser voir les résultats (le titre reste visible).
      const a = el("details", "cr-alerte"); a.open = matchMedia("(min-width: 760px)").matches;
      const h = el("summary"); h.append(icone("i-alerte i-petit", ALERTE), document.createTextNode(titre)); a.appendChild(h);
      const ul = el("ul"); f.alertes_urgence.forEach(x => ul.appendChild(el("li", null, x))); a.appendChild(ul);
      if (f.consignes && f.consignes.length) { const d = el("details", "cr-consignes-f"); d.appendChild(el("summary", null, "Consignes du formulaire"));
        const u2 = el("ul"); f.consignes.forEach(x => u2.appendChild(el("li", null, x))); d.appendChild(u2); a.appendChild(d); }
      urgence.appendChild(a);
    });
    urgence.hidden = !urgence.childElementCount;
    const ac = D.accueil_clinique ? D.accueil_clinique.conditions.filter(c => {
      const w = sansAccents(`${c.nom} ${c.syn.join(" ")}`).split(/[^a-z0-9]+/).filter(Boolean);
      return mots.every(m => w.some(x => m.length <= 2 ? x === m : x.startsWith(m)));
    }) : [];
    const pb = indexPB.filter(e => mots.every(m => e.w.some(x => m.length <= 2 ? x === m : x.startsWith(m)))).map(e => e.p);
    const acRestant = ac.filter(c => !pb.some(p => p.msss && c.nom.startsWith(p.msss)));
    pb.forEach(p => zone.appendChild(cartePB(p)));
    acRestant.forEach(c => zone.appendChild(carteAccueil(c, mots)));
    resultats.forEach(e => zone.appendChild(carte(e.p, mots)));
    const nAc = pb.length + acRestant.length;
    vide.hidden = resultats.length + nAc > 0;
    const n = resultats.length;
    etat.textContent = `${n} raison${n > 1 ? "s" : ""} de consultation${nAc ? ` · ${nAc} à l'accueil clinique` : ""}`;
  }

  function sources() {
    const z = $("cr-formulaires");
    D.formulaires.forEach(f => {
      const p = el("p", "cr-form"); const a = el("a", null, `${f.id} (${f.code_barre}), ${f.specialite}`); a.href = f.url; a.rel = "noopener";
      p.append(a, document.createTextNode(`, révision ${f.revision}, ${f.organisme}. Vérifié le ${f.verifie_le}. ${f.statut}`)); z.appendChild(p);
    });
    $("cr-formulaires-titre").textContent = `Les ${D.formulaires.length} formulaires transcrits (numéro, révision, statut)`;
    D.region.consignes.forEach(x => $("cr-consignes").appendChild(el("li", null, x)));
    $("cr-a-venir").textContent = D.a_venir; $("cr-a-venir").hidden = !D.a_venir;
  }

  fetch("/crds/crds_data.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    D = d;
    index = d.problemes.map((p, rang) => {
      const texte = [p.probleme, p.libelle_formulaire || "", p.specialite, p.categorie, p.formulaire, ...p.synonymes, ...p.priorites.flatMap(x => x.criteres),
        ...Object.values(p.prerequis_obligatoires).flat(), ...Object.values(p.prerequis_souhaitables).flat()].join(" ");
      const plat = sansAccents(texte);
      return { p, rang, plat, mots: plat.split(/[^a-z0-9]+/).filter(Boolean) };
    });
    const PB = d.accueil_clinique && d.accueil_clinique.pierre_boucher;
    indexPB = PB ? PB.protocoles.map(p => ({ p, w: motsDe(`${p.nom} ${p.syn.join(" ")} ${p.specialite} accueil clinique ${PB.installation}`) })) : [];
    sources(); rendre();
    const depart = new URLSearchParams(location.search).get("q"); if (depart) { q.value = depart; rendre(); }
  }).catch(() => { etat.textContent = "Les données n'ont pas pu être chargées. Vérifiez la connexion, puis rechargez la page."; });

  q.addEventListener("input", () => { clearTimeout(minuterie); minuterie = setTimeout(rendre, 40); });
})();
