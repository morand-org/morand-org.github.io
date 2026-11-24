/* MSK Morand : base de données OpenEvidence (page non indexée). Charge les fichiers produits par
   outils/locomoteur/base-donnees.py, puis recherche et filtre dans le navigateur. Rien n'est transmis. */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const REGIONS = { cervical: "Rachis cervical", dorsal: "Rachis dorsal", lombaire: "Rachis lombaire et sacro-iliaque", epaule: "Épaule", coude: "Coude",
    poignet: "Poignet et main", hanche: "Hanche et bassin", genou: "Genou", cheville: "Cheville et jambe", pied: "Pied", general: "Général" };
  const COURT = { fc: "Flashcards", oe24: "Vérification 24 nov.", oe21: "Document 21 nov.", hy: "Fiche résumée" };
  const PAGE = 60;
  let tout = [], sources = {}, vus = PAGE, actifs = new Set();

  function rendre() {
    const q = norm($("#bd-q").value).split(/\s+/).filter(Boolean), r = $("#bd-region").value, cat = $("#bd-cat").value;
    const res = tout.filter(x => actifs.has(x.s) && (!r || x.r === r) && (!cat || x.cat.split(" · ")[0] === cat) && q.every(m => x.cle.includes(m)));
    $("#bd-compte").textContent = `${res.length.toLocaleString("fr-CA")} donnée${res.length > 1 ? "s" : ""} sur ${tout.length.toLocaleString("fr-CA")}`;
    $("#bd-liste").innerHTML = res.slice(0, vus).map(carte).join("");
    $("#bd-plus").hidden = res.length <= vus;
  }
  function carte(x) {
    const refs = x.refs.map(i => sources[x.s].refs[i]).filter(Boolean);
    const chiffres = (x.c || []).filter(([k]) => !/^Commentaire/.test(k)), com = (x.c || []).find(([k]) => /^Commentaire/.test(k));
    return `<li class="bd-carte" lang="${x.lang === "en" ? "fr" : "fr"}">
      <p class="bd-meta"><span class="bd-src" data-s="${x.s}">${esc(COURT[x.s])}</span><span>${esc(REGIONS[x.r] || x.r)}</span><span>${esc(x.cat)}</span>${x.code ? `<span class="bd-code">${esc(x.code)}</span>` : ""}${x.st ? `<span class="bd-alerte">${esc(x.st)}</span>` : ""}</p>
      ${x.dx ? `<h2 class="bd-dx">${esc(x.dx)}</h2>` : ""}
      ${x.e && x.e !== x.t ? `<p class="bd-enonce"><strong>${esc(x.e)}</strong>${x.dir ? ` <span class="bd-dir">${esc(x.dir)}</span>` : ""}</p>` : x.dir ? `<p class="bd-enonce"><span class="bd-dir">${esc(x.dir)}</span></p>` : ""}
      <p class="bd-texte"${x.lang === "en" && !x.c ? ' lang="en"' : ""}>${esc(x.t)}</p>
      ${chiffres.length ? `<dl class="bd-chiffres">${chiffres.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd${x.lang === "en" ? ' lang="en"' : ""}>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
      ${com ? `<details class="bd-com"><summary>Commentaire d'OpenEvidence (en anglais)</summary><p lang="en">${esc(com[1])}</p></details>` : ""}
      ${x.g ? `<p class="bd-garde">Mise en garde : ${esc(x.g)}</p>` : ""}
      ${refs.length ? `<ol class="bd-refs">${refs.map(f => `<li>${f.u ? `<a href="${esc(f.u)}" target="_blank" rel="noopener">${esc(f.t)}</a>` : esc(f.t)}</li>`).join("")}</ol>` : `<p class="bd-sansref">Aucune référence citée pour cette donnée.</p>`}
      ${x.lien ? `<p class="bd-lien"><a class="lo-lien" href="${esc(x.lien)}">Ouvrir la fiche ${esc(x.code || "")}</a></p>` : ""}
    </li>`;
  }

  fetch("/locomoteur/donnees/index.json").then(r => r.json()).then(index => Promise.all(index.sources.map(s => fetch(`/locomoteur/donnees/${s}.json`).then(r => r.json()))))
    .then(lots => {
      for (const d of lots) {
        sources[d.source.id] = d;
        for (const x of d.items) {
          x.s = d.source.id;
          x.cle = norm([x.dx, x.t, x.e, x.cat, x.code, x.tags, ...(x.c || []).map(c => c.join(" ")), ...x.refs.map(i => (d.refs[i] || {}).t)].join(" "));
          tout.push(x);
        }
      }
      actifs = new Set(Object.keys(sources));
      $("#bd-sources").innerHTML = lots.map(d => `<button type="button" class="bd-puce" data-s="${d.source.id}" aria-pressed="true">${esc(d.source.nom)} <span>${d.items.length.toLocaleString("fr-CA")}</span></button>`).join("");
      const regions = [...new Set(tout.map(x => x.r))].sort((a, b) => Object.keys(REGIONS).indexOf(a) - Object.keys(REGIONS).indexOf(b));
      for (const r of regions) $("#bd-region").add(new Option(REGIONS[r] || r, r));
      const cats = [...new Set(tout.map(x => x.cat.split(" · ")[0]))].sort((a, b) => a.localeCompare(b, "fr"));
      for (const c of cats) $("#bd-cat").add(new Option(c, c));
      $("#bd-fichiers").innerHTML = lots.map(d => `<li><strong>${esc(d.source.nom)}</strong> : ${esc(d.source.description)} <a class="lo-lien" href="/locomoteur/donnees/${d.source.id}.json" download>Télécharger (JSON)</a></li>`).join("");
      const p = new URLSearchParams(location.search);
      if (p.get("q")) $("#bd-q").value = p.get("q");
      if (p.get("region") && REGIONS[p.get("region")]) $("#bd-region").value = p.get("region");
      rendre();
    }, () => { $("#bd-compte").textContent = "Les données n'ont pas pu être chargées. Vérifiez la connexion, puis rechargez la page."; });

  let minuterie = null;
  $("#bd-q").addEventListener("input", () => { clearTimeout(minuterie); minuterie = setTimeout(() => { vus = PAGE; rendre(); }, 150); });
  for (const s of ["#bd-region", "#bd-cat"]) $(s).addEventListener("change", () => { vus = PAGE; rendre(); });
  $("#bd-plus").addEventListener("click", () => { vus += PAGE; rendre(); });
  $("#bd-sources").addEventListener("click", e => {
    const b = e.target.closest("[data-s]"); if (!b) return;
    const on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", on ? "true" : "false");
    if (on) actifs.add(b.dataset.s); else actifs.delete(b.dataset.s);
    vus = PAGE; rendre();
  });
})();
