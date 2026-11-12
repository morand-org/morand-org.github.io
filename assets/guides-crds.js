/* Guide Morand : les fiches de CRDS Morand dans les résultats de recherche des guides.
   Les données (/crds/crds_data.json) ne sont chargées qu'à la première recherche. Texte inséré par textContent. */
(() => {
  "use strict";
  const q = document.getElementById("guide-search"), zone = document.getElementById("gm-crds");
  if (!q || !zone) return;
  const liste = zone.querySelector("ul"), compte = zone.querySelector(".compte"), tout = zone.querySelector(".gm-crds-tout");
  const sansAccents = t => String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const mots = t => sansAccents(t).split(/[^a-z0-9]+/).filter(Boolean);
  let D = null, index = null, chargement = null, minuterie = 0;
  const MAX = 6;
  function charger() {
    if (!chargement) chargement = fetch("/crds/crds_data.json").then(r => r.ok ? r.json() : Promise.reject(r.status)).then(d => {
      D = d;
      index = d.problemes.map((p, rang) => {
        const texte = [p.probleme, p.libelle_formulaire || "", p.specialite, p.categorie, p.formulaire, ...p.synonymes, ...p.priorites.flatMap(x => x.criteres)].join(" ");
        return { p, rang, w: mots(texte), titre: sansAccents(`${p.probleme} ${p.libelle_formulaire || ""}`), syn: p.synonymes.map(sansAccents) };
      });
      (d.accueil_clinique ? d.accueil_clinique.conditions : []).forEach((c, i) => index.push({ ac: c, rang: -10 + i, w: mots(`${c.nom} ${c.syn.join(" ")}`), titre: sansAccents(c.nom), syn: c.syn.map(sansAccents) }));
    }).catch(() => { chargement = null; });
    return chargement;
  }
  const trouve = (e, m) => m.every(x => e.w.some(w => x.length <= 2 ? w === x : w.startsWith(x)));
  const score = (e, m) => m.reduce((s, x) => s + (e.titre.includes(x) ? 3 : 0) + (e.syn.includes(x) ? 3 : 0), 0);
  function rendre() {
    const texte = q.value.trim(), m = mots(texte);
    if (!index || !m.length || texte.length < 2) { zone.hidden = true; return; }
    const res = index.filter(e => trouve(e, m)).sort((a, b) => score(b, m) - score(a, m) || a.rang - b.rang);
    liste.textContent = "";
    res.slice(0, MAX).forEach(e => {
      const li = document.createElement("li"), a = document.createElement("a"), b = document.createElement("span"), t = document.createElement("span"), s = document.createElement("span");
      b.className = "gm-crds-prio"; t.className = "gm-crds-titre"; s.className = "gm-crds-sous";
      if (e.ac) { b.textContent = "AC"; b.dataset.niveau = "AC"; t.textContent = e.ac.nom; s.textContent = "Accueil clinique · 24 à 72 h"; a.href = `/crds/?q=${encodeURIComponent(e.ac.syn[0])}`; }
      else {
        const niv = e.p.priorites.map(x => x.niveau).sort(), h = niv[0], bas = niv[niv.length - 1];
        b.textContent = h === "HORS" ? "—" : h === bas ? h : `${h}–${bas}`; b.dataset.niveau = h;
        t.textContent = e.p.probleme; s.textContent = `${e.p.specialite} · ${e.p.formulaire}`;
        a.href = `/crds/?q=${encodeURIComponent(e.p.probleme)}`;
      }
      a.append(b, t, s); li.appendChild(a); liste.appendChild(li);
    });
    compte.textContent = res.length ? `${res.length}` : "";
    tout.href = `/crds/?q=${encodeURIComponent(texte)}`;
    tout.hidden = res.length <= MAX;
    tout.textContent = `Voir les ${res.length} fiches dans CRDS Morand`;
    zone.hidden = !res.length;
  }
  const declencher = () => { clearTimeout(minuterie); minuterie = setTimeout(() => { if (q.value.trim()) charger().then(rendre); else rendre(); }, 120); };
  q.addEventListener("input", declencher);
  q.form && q.form.addEventListener("submit", declencher);
  if (q.value.trim() || new URLSearchParams(location.search).get("q")) declencher();
})();
