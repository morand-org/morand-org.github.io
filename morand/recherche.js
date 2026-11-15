/* Accueil de Morand : une recherche dans tous les outils (Guide, ressources communautaires, CRDS, accueil clinique,
   Codes, cliniques de la carte). Les données ne sont chargées qu'au premier usage du champ ; rien ne quitte l'appareil.
   Tout le texte passe par textContent. */
(() => {
  "use strict";
  const q = document.getElementById("rg-q"), res = document.getElementById("rg-res"), etat = document.getElementById("rg-etat"), liste = document.getElementById("outils");
  if (!q || !res || !liste) return;
  const html = document.documentElement;
  const sa = t => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const mots = t => sa(t).split(/[^a-z0-9]+/).filter(Boolean);
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  const u = (page, texte) => `${page}?q=${encodeURIComponent(texte)}`;
  const json = a => fetch(a).then(r => { if (!r.ok) throw new Error(a); return r.json(); });
  let index = null, minuterie = 0;

  // Un groupe par outil : son nom, son sceau, où mène « Voir tout », et ses fiches (titre, sous-titre, lien, mots).
  const charger = () => index || (index = Promise.all(["/guides/donnees.json", "/crds/crds_data.json", "/codes/codes_data.json", "/map/data.json"].map(json)).then(([g, c, k, m]) => {
    const pb = (c.accueil_clinique && c.accueil_clinique.pierre_boucher) || { protocoles: [] }, noms = Object.fromEntries(k.groupes);
    const guide = x => ({ t: x.title, s: [x.org, x.cat].filter(Boolean).join(" · "), u: x.url, dehors: true, w: mots(`${x.title} ${x.tags} ${x.org} ${x.cat}`) });
    return [
      { nom: "Accueil clinique", sceau: "/morand/sceau-crds.svg", tout: t => u("/crds/", t),
        items: pb.protocoles.map(p => ({ t: p.nom, s: `${pb.installation} · ${p.specialite}`, u: u("/crds/", p.nom), w: mots(`${p.nom} ${p.syn.join(" ")} ${p.specialite} accueil clinique`) })) },
      { nom: "CRDS", sceau: "/morand/sceau-crds.svg", tout: t => u("/crds/", t),
        items: c.problemes.map(p => ({ t: p.titre || p.probleme, s: `${p.specialite} · priorité ${[...new Set(p.priorites.map(v => v.niveau))].sort().join(", ")}`, u: u("/crds/", p.probleme), w: mots(`${p.probleme} ${p.specialite} ${p.synonymes.join(" ")}`) })) },
      { nom: "Codes", sceau: "/morand/sceau-codes.svg", tout: t => u("/codes/", t),
        items: [...k.actes.map(a => ({ t: a.n, s: [noms[a.g], a.c.join(", ")].filter(Boolean).join(" · "), u: u("/codes/", a.c[0] || a.n), codes: a.c, w: mots(`${a.n} ${a.c.join(" ")} ${a.k || ""}`) })),
          ...k.vulnerabilite.map(v => ({ t: `Code de vulnérabilité ${v.code}`, s: v.libelle, u: `/codes/?g=vulnerabilite&q=${encodeURIComponent(v.code)}`, w: mots(`${v.code} ${v.libelle} ${v.m} vulnerabilite`) }))] },
      { nom: "Guides cliniques", sceau: "/morand/sceau-guide.svg", tout: t => u("/guides/", t), items: g.filter(x => x.format).map(guide) },
      { nom: "Ressources communautaires", sceau: "/morand/sceau-guide.svg", tout: t => u("/guides/ressources-communautaires/", t), items: g.filter(x => !x.format).map(guide) },
      { nom: "Cliniques", sceau: "/morand/sceau-map.svg", tout: () => "/map/",
        items: [...(m.cliniques || []), ...(m.hopitaux || [])].map(x => ({ t: x.nom, s: [x.ville, x.rls ? "RLS " + x.rls : ""].filter(Boolean).join(" · "), u: "/map/", w: mots(`${x.nom} ${x.alias || ""} ${x.ville} ${x.rls || ""}`) })) },
    ];
  }));

  function fermer() { res.textContent = ""; res.hidden = true; etat.hidden = true; liste.classList.remove("rg-masque"); html.classList.remove("cherche"); }
  function rendre(G) {
    const m = mots(q.value); res.textContent = "";
    if (!m.length) return fermer();
    let total = 0;
    G.forEach(g => {
      // Chaque mot cherché commence un mot de la fiche ; deux lettres ou moins (FA, IC) : mot entier.
      const r = g.items.filter(x => m.every(k => x.w.some(w => k.length <= 2 ? w === k : w.startsWith(k))));
      if (!r.length) return;
      total += r.length;
      const s = el("section", "rg-groupe"), h = el("h2"), im = el("img"); im.src = g.sceau; im.alt = ""; im.width = im.height = 22;
      h.append(im, document.createTextNode(g.nom), el("span", null, String(r.length))); s.appendChild(h);
      const ul = el("ul");
      r.slice(0, 3).forEach(x => { const li = el("li"), a = el("a"), t = q.value.trim();
        a.href = x.codes && x.codes.includes(t) ? u("/codes/", t) : x.u;   // le code tapé, s'il est un des codes de l'acte if (x.dehors) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
        a.append(el("span", "rg-t", x.t), el("span", "rg-s", x.s)); li.appendChild(a); ul.appendChild(li); });
      s.appendChild(ul);
      if (r.length > 3) { const a = el("a", "rg-tout", `Voir les ${r.length} résultats`); a.href = g.tout(q.value.trim()); s.appendChild(a); }
      res.appendChild(s);
    });
    etat.textContent = total ? `${total} résultat${total > 1 ? "s" : ""}` : "Aucun résultat. Essayez un autre mot, ou un code.";
    etat.hidden = false; res.hidden = !total; liste.classList.add("rg-masque"); html.classList.add("cherche");
  }
  const lancer = () => charger().then(rendre).catch(() => { index = null; etat.textContent = "La recherche n'a pas pu charger ses données. Vérifiez la connexion."; etat.hidden = false; });
  q.addEventListener("focus", () => { charger().catch(() => { index = null; }); }, { once: true });
  q.addEventListener("input", () => { clearTimeout(minuterie); if (!q.value.trim()) return fermer(); minuterie = setTimeout(lancer, 60); });
  addEventListener("keydown", e => {
    if (e.key === "Escape" && document.activeElement === q && q.value) { q.value = ""; fermer(); }
    if (e.key === "/" && document.activeElement !== q && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  });
  // Au retour sur la page (bouton Précédent), le champ peut garder son texte : on refait la recherche.
  addEventListener("pageshow", () => { if (q.value.trim()) lancer(); });
})();
