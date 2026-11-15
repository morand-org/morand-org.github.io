/* Codes Morand : répertoire des actes (avec les formulaires de la CNESST) et codes de vulnérabilité, cherchés par code
   ou par mot dans codes_data.json (aucun appel réseau après le chargement). Tout le texte passe par textContent. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const q = $("co-q"), zone = $("co-liste"), etat = $("co-etat"), groupes = $("co-groupes");
  const sansAccents = t => String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const el = (tag, cls, texte) => { const e = document.createElement(tag); if (cls) e.className = cls; if (texte != null) e.textContent = texte; return e; };
  const nb = n => n.toLocaleString("fr-CA");
  const dollars = v => v.toLocaleString("fr-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let D = null, actes = [], vuln = [], groupe = "frequents", minuterie = 0;

  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  $("co-raccourci").textContent = mac ? "⌘K" : "Ctrl K"; $("co-raccourci").hidden = false;
  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); q.focus(); q.select(); return; }
    if (e.key === "/" && document.activeElement !== q && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
    if (e.key === "Escape" && document.activeElement === q && q.value) { q.value = ""; rendre(); }
  });

  // Un montant, ou deux (deux paliers ou deux cas), à la part payée donnée.
  const deux = (t, f) => Array.isArray(t) ? `${f(t[0])} / ${f(t[1])}` : f(t);
  const montant = (t, pct) => t == null ? "—" : deux(t, v => dollars(v * pct / 100)) + " $";
  function rangeeActe(a, avecGroupe) {
    const paliers = Array.isArray(a.t) ? (a.d ? a.d.join(" / ") : "moins de 500 / 500 inscrits et plus") : "";
    const sous = [avecGroupe ? D.noms[a.g] : "", a.c.length ? a.c.join(", ") : "", paliers, a.note || ""].filter(Boolean).join(" · ");
    const r = el("div", "co-rangee" + (a.p ? "" : " co-non")), g = el("div", "co-texte"), d = el("div", "co-droite");
    g.append(el("p", "co-titre", a.n), el("p", "co-sous", sous));
    if (!a.p) d.append(el("p", "co-valeur", "Compris"), el("p", "co-valeur-sous", a.c.length ? "hors GMF-U" : "dans la visite"));
    else d.append(el("p", "co-valeur", montant(a.t, 100)), el("p", "co-valeur-sous", a.t == null ? "à confirmer" : a.p === 100 ? "payé à 100 %" : `au mixte ${montant(a.t, a.p)}`));
    r.append(g, d); return r;
  }
  function rangeeVuln(v) {
    const r = el("div", "co-rangee co-vuln" + (v.ferme ? " co-non" : "")), g = el("div", "co-texte");
    g.append(el("p", "co-titre", v.note ? `${v.libelle}. ${v.note}` : v.libelle));
    r.append(el("p", "co-code", v.code), g); return r;
  }
  const carte = (titre, compte, rangees) => { const c = el("section", "co-carte"), t = el("div", "co-carte-tete"); t.append(el("h2", null, titre), el("span", "co-compte", compte));
    c.appendChild(t); rangees.forEach(r => c.appendChild(r)); return c; };

  // Chaque mot cherché commence un mot de la fiche ; deux lettres ou moins : mot entier (« FA » trouve la fibrillation
  // auriculaire, pas « forfait ») ; quatre lettres ou plus : aussi au milieu d'un mot (« chirurgie » trouve « cryochirurgie »).
  const debut = (liste, m) => liste.some(w => m.length <= 2 ? w === m : w.startsWith(m));
  const trouverActes = (mots, dans) => actes.filter(a => dans(a) && mots.every(m => debut(a.mots, m) || (m.length > 3 && a.texte.includes(m))));
  const trouverVuln = mots => vuln.filter(v => mots.every(m => debut(v.mots, m)));

  function rendre() {
    if (!D) return;
    const mots = sansAccents(q.value.trim()).split(/[^a-z0-9]+/).filter(Boolean), recherche = mots.length > 0;
    zone.textContent = "";
    groupes.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === groupe ? "true" : "false"));
    if (groupe === "vulnerabilite") {
      const l = trouverVuln(mots);
      if (l.length) zone.appendChild(carte("Codes de vulnérabilité", "de 01 à 20", l.map(rangeeVuln)));
      else zone.appendChild(el("p", "cr-vide", "Aucune catégorie ne correspond."));
      const fermees = l.filter(v => v.ferme).length;
      etat.textContent = `${nb(l.length)} catégorie${l.length > 1 ? "s" : ""}${fermees ? `, dont ${nb(fermees)} fermée${fermees > 1 ? "s" : ""}` : ""}`; return;
    }
    const large = groupe === "tous" || groupe === "frequents";
    const frequents = groupe === "frequents" && !recherche;
    let l = trouverActes(mots, a => frequents ? D.frequents.includes(a.c[0]) : large || a.g === groupe), ailleurs = false;
    // Rien dans le groupe choisi : la recherche porte sur tous les actes, et on le dit.
    if (!l.length && recherche && !large) { l = trouverActes(mots, () => true); ailleurs = l.length > 0; }
    const lv = recherche && large ? trouverVuln(mots) : [];
    etat.textContent = `${nb(l.length)} acte${l.length > 1 ? "s" : ""}${lv.length ? ` · ${nb(lv.length)} code${lv.length > 1 ? "s" : ""} de vulnérabilité` : ""}`;
    if (!l.length && !lv.length) { zone.appendChild(el("p", "cr-vide", "Aucun code ne correspond. Essayez un code (15804) ou un mot (suivi, stérilet, cryochirurgie).")); return; }
    if (ailleurs) zone.appendChild(el("p", "co-avis", `Rien dans « ${D.noms[groupe]} » : voici les résultats des autres groupes.`));
    if (frequents) {
      zone.appendChild(carte("Les plus fréquents", `${nb(l.length)} actes`, l.map(a => rangeeActe(a, true))));
      const tous = el("button", "co-tous", `Voir les ${nb(actes.length)} actes`); tous.type = "button";
      tous.addEventListener("click", () => { groupe = "tous"; rendre(); groupes.querySelector('[data-v="tous"]').focus(); });
      zone.appendChild(tous); return;
    }
    if (recherche) { if (l.length) zone.appendChild(carte("Actes", nb(l.length), l.map(a => rangeeActe(a, true)))); }
    else for (const [g, nom] of D.groupes) { const items = l.filter(a => a.g === g); if (items.length) zone.appendChild(carte(nom, nb(items.length), items.map(a => rangeeActe(a, false)))); }
    if (lv.length) zone.appendChild(carte("Codes de vulnérabilité", nb(lv.length), lv.map(rangeeVuln)));
  }

  fetch("/codes/codes_data.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    D = d; D.noms = Object.fromEntries(d.groupes);
    actes = d.actes.map(a => { const texte = sansAccents([a.n, a.c.join(" "), a.k || "", D.noms[a.g], a.note || ""].join(" ")); return { ...a, texte, mots: texte.split(/[^a-z0-9]+/).filter(Boolean) }; });
    vuln = d.vulnerabilite.map(v => ({ ...v, mots: sansAccents(`${v.code} ${v.libelle} ${v.m} vulnerabilite`).split(/[^a-z0-9]+/).filter(Boolean) }));
    [["frequents", "Les plus fréquents"], ["tous", "Tous les actes"], ...d.groupes, ["vulnerabilite", "Codes de vulnérabilité"]].forEach(([v, t]) => {
      const b = el("button", "co-groupe", t); b.type = "button"; b.dataset.v = v;
      b.addEventListener("click", () => { groupe = v; rendre(); });
      groupes.appendChild(b);
    });
    for (const k of ["repertoire", "cnesst", "vulnerabilite"]) $("co-note-" + k).textContent = d.notes[k];
    const p = new URLSearchParams(location.search), depart = p.get("q"), g = p.get("g");
    if (g && (g === "vulnerabilite" || g === "tous" || D.noms[g])) groupe = g;
    if (depart) q.value = depart;
    rendre();
  }).catch(() => { etat.textContent = "Les données n'ont pas pu être chargées. Vérifiez la connexion, puis rechargez la page."; });

  q.addEventListener("input", () => { clearTimeout(minuterie); minuterie = setTimeout(rendre, 40); });
})();
