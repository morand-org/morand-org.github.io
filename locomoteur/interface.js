/* Locomoteur Morand (prototype) : interface commune. Construit le questionnaire à partir du fichier de données de
   l'articulation (body[data-articulation]), recalcule à chaque réponse et affiche les diagnostics, la conduite, la note
   et le tableau des sources. Les réponses restent en mémoire dans la page : rien n'est stocké ni transmis. */
(function () {
  "use strict";
  const LO = window.Locomoteur, d = LO && LO.donnees && LO.donnees[document.body.dataset.articulation];
  if (!d) return;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nb = (x, dec = 2) => (x === undefined || x === null ? "—" : Number(x).toLocaleString("fr-CA", { maximumFractionDigits: dec }));
  const pct = pr => (pr < 0.05 ? "< 5 %" : pr > 0.95 ? "> 95 %" : `${Math.round(pr * 20) * 5} %`);
  const pctExact = x => `${Math.round(x * 100)} %`;
  const NIVEAU = { urgence: "Urgence", rapide: "Rapidement", considerer: "À considérer", info: "Information" };
  const form = $("#lo-form"), ouverts = new Set();
  let rep = {}, tous = false, dernier = null, attente = 0;

  /* ---------- Questionnaire ---------- */
  const etiquettes = q => q.labels || q.bloc.labels || ["Oui", "Non"];
  function segments(q, opts) {
    return `<div class="lo-seg" role="group" aria-labelledby="l-${q.id}">${opts.map(([v, l]) =>
      `<button type="button" data-q="${q.id}" data-v="${esc(v)}" aria-pressed="false">${esc(l)}</button>`).join("")}<button type="button" class="lo-inconnu" data-q="${q.id}" data-v="?" aria-pressed="false" title="Ne sait pas ou indéterminé : non compté" aria-label="Ne sait pas">?</button></div>`;
  }
  function controle(q) {
    const lid = `l-${q.id}`;
    let ctl = "", large = false;
    if (q.type === "oui_non") { const [a, b] = etiquettes(q); ctl = segments(q, [["oui", a], ["non", b]]); }
    else if (q.type === "choix") {
      const court = q.options.length <= 4 && q.options.every(o => o.l.length <= 36) && q.options.reduce((n, o) => n + o.l.length, 0) <= 72;
      if (court) ctl = segments(q, q.options.map(o => [o.v, o.l]));
      else ctl = `<select class="lo-select" id="c-${q.id}" data-q="${q.id}" aria-labelledby="${lid}"><option value="">—</option>${q.options.map(o =>
        `<option value="${esc(o.v)}">${esc(o.l)}</option>`).join("")}<option value="?">Ne sait pas</option></select>`;
    } else if (q.type === "case") {
      ctl = `<button type="button" class="lo-puce lo-case" data-q="${q.id}" data-v="oui" aria-pressed="false" aria-labelledby="${lid}">${esc(q.n || q.libelle)}</button>`;
      return `<div class="lo-q lo-q-case" data-qid="${q.id}"><span class="cache" id="${lid}">${esc(q.libelle)}</span>${ctl}</div>`;
    } else if (q.type === "multi") {
      large = true;
      ctl = `<div class="lo-puces" role="group" aria-labelledby="${lid}">${q.options.map(o =>
        `<button type="button" class="lo-puce" data-q="${q.id}" data-m="${esc(o.v)}" aria-pressed="false">${esc(o.l)}</button>`).join("")}</div>`;
    } else if (q.type === "nombre") {
      ctl = `<span class="lo-nombre"><input type="number" inputmode="numeric" id="c-${q.id}" data-q="${q.id}" aria-labelledby="${lid}"${q.min !== undefined ? ` min="${q.min}"` : ""}${q.max !== undefined ? ` max="${q.max}"` : ""} step="1">${q.unite ? `<span class="lo-unite">${esc(q.unite)}</span>` : ""}</span>`;
    } else {
      large = true;
      ctl = q.long ? `<textarea class="lo-texte-libre" id="c-${q.id}" data-q="${q.id}" aria-labelledby="${lid}" rows="2"></textarea>`
        : `<input type="text" class="lo-texte-libre" id="c-${q.id}" data-q="${q.id}" aria-labelledby="${lid}">`;
    }
    const calcul = q.effets.length > 0 || q.id === "sexe" || q.id === "age";
    return `<div class="lo-q${large ? " lo-q-large" : ""}${calcul ? " lo-q-calcul" : ""}" data-qid="${q.id}"><div class="lo-q-texte"><span class="lo-q-libelle" id="${lid}">${esc(q.libelle)}${calcul ? '<span class="cache"> (compte dans le calcul)</span>' : ""}</span>${q.aide ? `<span class="lo-q-aide">${esc(q.aide)}</span>` : ""}</div>${ctl}</div>`;
  }
  function construire() {
    form.innerHTML = d.sections.map(s => `<section class="lo-section" id="s-${s.id}" aria-labelledby="h-${s.id}"><h2 id="h-${s.id}">${esc(s.titre)}</h2>${s.blocs.map((b, i) => {
      b.ref = `${s.id}-${i}`;
      const bouton = b.toutNormal ? `<button type="button" class="lo-normal" data-normal="${b.ref}">${esc(typeof b.toutNormal === "string" ? b.toutNormal : "Tout normal")}</button>` : "";
      return `<div class="lo-bloc" data-bloc="${b.ref}">${b.titre || bouton ? `<div class="lo-bloc-tete">${b.titre ? `<h3>${esc(b.titre)}</h3>` : "<span></span>"}${bouton}</div>` : ""}${b.aide ? `<p class="lo-bloc-aide">${esc(b.aide)}</p>` : ""}${b.questions.map(controle).join("")}</div>`;
    }).join("")}</section>`).join("");
    $("#lo-nav").innerHTML = d.sections.map(s => `<a href="#s-${s.id}" data-nav="${s.id}">${esc(s.titre)}<span class="lo-compte"></span></a>`).join("")
      + `<a href="#resultats">Résultats</a><a href="#sources">Sources</a><button type="button" class="lo-nouveau" id="lo-nouveau">Nouveau patient</button>`;
  }
  function majBoutons(id) {
    const v = rep[id];
    for (const b of form.querySelectorAll(`button[data-q="${id}"]`)) {
      const on = b.dataset.m !== undefined ? Array.isArray(v) && v.includes(b.dataset.m) : v === b.dataset.v;
      b.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }
  form.addEventListener("click", e => {
    const tout = e.target.closest("button[data-normal]");
    if (tout) {
      const vus = LO.visibles(d, rep), bloc = d.sections.flatMap(s => s.blocs).find(x => x.ref === tout.dataset.normal);
      for (const q of bloc.questions) {
        if (!vus.has(q.id) || q.id in rep || q.horsNormal) continue;
        const v = LO.normalDe(q); if (v === null) continue;
        rep[q.id] = v; majBoutons(q.id);
        const sel = form.querySelector(`select[data-q="${q.id}"]`); if (sel) sel.value = v;
      }
      planifier(); return;
    }
    const b = e.target.closest("button[data-q]");
    if (!b) return;
    const id = b.dataset.q, q = d.parQ[id];
    if (b.dataset.m !== undefined) {
      const v = b.dataset.m, op = q.options.find(o => o.v === v);
      let cur = Array.isArray(rep[id]) ? rep[id].slice() : [];
      if (cur.includes(v)) cur = cur.filter(x => x !== v);
      else cur = op.exclusif ? [v] : cur.filter(x => !q.options.find(o => o.v === x).exclusif).concat(v);
      if (cur.length) rep[id] = cur; else delete rep[id];
    } else if (rep[id] === b.dataset.v) delete rep[id];
    else rep[id] = b.dataset.v;
    majBoutons(id); planifier();
  });
  const saisie = e => {
    const el = e.target.closest("[data-q]");
    if (!el || el.tagName === "BUTTON") return;
    const v = el.value.trim();
    if (v === "") delete rep[el.dataset.q]; else rep[el.dataset.q] = v;
    planifier();
  };
  form.addEventListener("input", saisie);
  form.addEventListener("change", saisie);
  form.addEventListener("submit", e => e.preventDefault());

  /* ---------- Calcul et affichage ---------- */
  function planifier() { cancelAnimationFrame(attente); attente = requestAnimationFrame(maj); }
  function maj() {
    const vus = LO.visibles(d, rep);
    for (const s of d.sections) for (const b of s.blocs) {
      let un = false;
      for (const q of b.questions) { const v = vus.has(q.id); un = un || v; form.querySelector(`[data-qid="${q.id}"]`).hidden = !v; }
      form.querySelector(`[data-bloc="${b.ref}"]`).hidden = !un;
    }
    const res = LO.calculer(d, rep);
    dernier = res;
    for (const s of d.sections) {
      const n = s.blocs.flatMap(b => b.questions).filter(q => q.id in res.rep).length;
      const c = $(`[data-nav="${s.id}"] .lo-compte`);
      c.textContent = n ? String(n) : "";
    }
    diagnostics(res); conduite(res);
    $("#lo-note").value = LO.rediger(d, res);
    barre(res);
  }
  const departTexte = res => {
    const L = res.L, morceaux = [];
    if (L.sexe) morceaux.push(L.sexe === "F" ? "femme" : "homme");
    if (L.age !== null) morceaux.push(`${L.age} ans`);
    return morceaux.length ? morceaux.join(", ") : "âge et sexe inconnus";
  };
  function alertesHtml(liste, avecConduite) {
    return liste.map(a => `<div class="lo-alerte" data-niveau="${a.niveau}"><p class="lo-alerte-titre"><span class="lo-niveau">${NIVEAU[a.niveau]}</span>${esc(a.titre)}</p>
      <p>${esc(a.texte)}</p>${avecConduite && a.conduite ? `<ul>${a.conduite.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}${liens(a.liens)}</div>`).join("");
  }
  const liens = l => (l && l.length ? `<p class="lo-liens">${l.map(x => `<a href="${esc(x.u)}">${esc(x.t)}</a>`).join("")}</p>` : "");
  function diagnostics(res) {
    const seulsDepart = !Object.keys(res.rep).some(k => d.parQ[k] && d.parQ[k].effets.length);   // rien encore qui compte, à part l'âge et le sexe
    const tete = res.diagnostics[0];
    $("#lo-res-etat").textContent = !res.saisies ? "Commencez par l'âge et le sexe."
      : seulsDepart ? `Probabilités de départ (${departTexte(res)}). Remplissez l'anamnèse et l'examen.`
        : `${res.saisies} réponse${res.saisies > 1 ? "s" : ""} · ${tete.categorie[1].toLowerCase()} : ${tete.x.nom.toLowerCase()}`;
    $("#lo-alertes").innerHTML = alertesHtml(res.alertes, true);
    const montres = tous ? res.diagnostics : res.diagnostics.slice(0, 6);
    const ol = $("#lo-dx");
    ol.innerHTML = montres.map(x => `<li class="lo-dx-item" data-cat="${x.categorie[2]}" data-dx="${x.id}"><details${ouverts.has(x.id) ? " open" : ""}>
      <summary><span class="lo-dx-ligne"><span class="lo-dx-nom">${esc(x.x.nom)}</span><span class="lo-dx-pct">${pct(x.p)}</span></span>
        <span class="lo-jauge" aria-hidden="true"><span class="lo-jauge-plage"></span><span class="lo-jauge-val"></span></span>
        <span class="lo-dx-ligne lo-dx-sous"><span class="lo-dx-cat">${x.categorie[1]}</span><span>fourchette ${pct(x.bas)} à ${pct(x.haut)}</span></span></summary>
      <div class="lo-pourquoi">
        <p>Départ (${esc(departTexte(res))}) : ${pctExact(x.depart)}.</p>
        ${x.explique ? `<p>Pris seul : ${pct(x.seul)}. ${esc(x.explique.nom)}, plus probable, explique déjà une partie de ces éléments.</p>` : ""}
        ${x.comptes.length ? `<ul>${x.comptes.slice(0, 10).map(c => `<li><span class="lo-fleche" data-sens="${c.l > 0 ? "haut" : "bas"}">${c.l > 0 ? "↑" : "↓"} ×${nb(c.rv)}</span><span>${esc(c.libelle)}</span><span class="lo-statut" data-statut="${c.e.statut}">${LO.STATUTS[c.e.statut]}</span></li>`).join("")}</ul>`
          : "<p>Aucune réponse ne change encore ce diagnostic.</p>"}
        ${(x.x.fiches || []).length ? `<p class="lo-fiches">${x.x.fiches.map(id => `<button type="button" class="lo-lien" data-fiche="${esc(id)}">Fiche ${id.startsWith("athlete") ? "athlète" : "50 ans et plus"}</button>`).join("")}</p>` : ""}
        ${x.comptes.length > 10 ? `<p class="lo-discret">Et ${x.comptes.length - 10} autre${x.comptes.length - 10 > 1 ? "s" : ""} élément${x.comptes.length - 10 > 1 ? "s" : ""} de moindre poids.</p>` : ""}
      </div></details></li>`).join("");
    for (const li of ol.children) {
      const x = res.diagnostics.find(y => y.id === li.dataset.dx);
      li.style.setProperty("--val", x.p.toFixed(4)); li.style.setProperty("--bas", x.bas.toFixed(4)); li.style.setProperty("--haut", x.haut.toFixed(4));
      li.querySelector("details").addEventListener("toggle", ev => { if (ev.target.open) ouverts.add(x.id); else ouverts.delete(x.id); });
    }
    const t = $("#lo-tous");
    t.hidden = res.diagnostics.length <= 6;
    t.textContent = tous ? "Afficher les 6 premiers" : `Afficher les ${res.diagnostics.length} diagnostics`;
  }
  $("#lo-tous").addEventListener("click", () => { tous = !tous; if (dernier) diagnostics(dernier); });
  function conduite(res) {
    const graves = res.alertes.filter(a => a.niveau !== "info" && a.conduite);
    let h = graves.length ? `<h3 class="lo-c-titre">Alertes</h3>${alertesHtml(graves, true)}` : "";
    const dejaPlan = String(rep.plan_ajouts || "").split(/\r?\n/).map(x => x.trim());
    const ligne = t => `<li><span>${esc(t)}</span><button type="button" class="lo-plus" data-plan="${esc(t)}"${dejaPlan.includes(t.replace(/\.$/, "")) ? " disabled" : ""}>+ Plan</button></li>`;
    if (res.conduite.length) h += res.conduite.map(c => `<section class="lo-c-dx"><h3>${esc(c.dx.x.nom)} <span class="lo-dx-cat" data-cat="${c.dx.categorie[2]}">${c.dx.categorie[1]}</span></h3>
      <ul>${c.items.map(ligne).join("")}</ul>${liens(c.liens)}</section>`).join("");
    else h += `<p class="lo-vide">Aucune hypothèse n'est encore assez probable pour proposer une conduite.</p>`;
    h += `<p class="lo-discret">Conduite indicative, tirée des lignes directrices courantes (Ottawa, Choisir avec soin, NICE, CRDS) ; à valider.</p>`;
    $("#lo-conduite").innerHTML = h;
  }

  $("#lo-conduite").addEventListener("click", e => {
    const b = e.target.closest("button[data-plan]");
    if (!b) return;
    const t = b.dataset.plan.replace(/\.$/, ""), actuel = String(rep.plan_ajouts || "").trim();
    rep.plan_ajouts = actuel ? `${actuel}\n${t}` : t;
    const zone = form.querySelector('[data-q="plan_ajouts"]'); if (zone) zone.value = rep.plan_ajouts;
    b.disabled = true; planifier();
  });

  /* ---------- Fiches MSK : chargées au premier usage ---------- */
  let fiches = null;
  const chargerFiches = () => (fiches ? Promise.resolve(fiches) : fetch("/locomoteur/fiches.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(j => (fiches = j.fiches)));
  const dialogue = document.getElementById("lo-fiche");
  const SECTIONS_FICHE = [["clinique", "Clinique"], ["examen", "Examen"], ["imagerie", "Imagerie"], ["traitement", "Traitement"], ["redflags", "Drapeaux rouges"],
    ["ddx", "Diagnostic différentiel"], ["rhumato", "Volet rhumatologique"], ["facteurs", "Facteurs de risque"], ["pearls", "À retenir"]];
  function ouvrirFiche(id) {
    chargerFiches().then(F => {
      const f = F[id]; if (!f || !dialogue) return;
      const item = x => (Array.isArray(x) ? x.filter(Boolean).join(" : ") : x);   // texte déjà nettoyé à l'importation (gras et italique seulement)
      dialogue.querySelector(".lo-fiche-corps").innerHTML = `<p class="lo-sur">${f.serie === "athlete" ? "Fiche athlète" : "Fiche 50 ans et plus"} · n° ${f.no}</p>
        <h2>${f.titre}</h2><p class="lo-fiche-accroche">${f.accroche}</p>
        ${f.stats.length ? `<dl class="lo-fiche-stats">${f.stats.map(x => `<div><dt>${x.v}</dt><dd>${x.l}${x.s ? ` <span>${x.s}</span>` : ""}</dd></div>`).join("")}</dl>` : ""}
        ${f.info ? `<section><h3>${f.info.titre}</h3><ul>${f.info.items.map(x => `<li>${item(x)}</li>`).join("")}</ul>${f.info.note ? `<p class="lo-discret">${f.info.note}</p>` : ""}</section>` : ""}
        ${SECTIONS_FICHE.filter(([k]) => f[k] && f[k].length).map(([k, t]) => `<section><h3>${t}</h3><ul>${f[k].map(x => `<li>${item(x)}</li>`).join("")}</ul></section>`).join("")}
        <p class="lo-discret">Contenu rédigé de mémoire, à valider.</p>`;
      if (dialogue.showModal) dialogue.showModal(); else dialogue.setAttribute("open", "");
    }).catch(() => { /* fiches indisponibles hors ligne : rien à montrer */ });
  }
  if (dialogue) dialogue.addEventListener("click", e => { if (e.target === dialogue || e.target.closest(".lo-fiche-fermer")) dialogue.close ? dialogue.close() : dialogue.removeAttribute("open"); });
  $("#lo-dx").addEventListener("click", e => { const b = e.target.closest("button[data-fiche]"); if (b) ouvrirFiche(b.dataset.fiche); });

  /* ---------- Onglets ---------- */
  const onglets = [...document.querySelectorAll('.lo-onglets [role="tab"]')];
  function choisir(t) {
    for (const o of onglets) {
      const on = o === t;
      o.setAttribute("aria-selected", on ? "true" : "false"); o.tabIndex = on ? 0 : -1;
      document.getElementById(o.getAttribute("aria-controls")).hidden = !on;
    }
  }
  for (const t of onglets) {
    t.addEventListener("click", () => choisir(t));
    t.addEventListener("keydown", e => {
      const i = onglets.indexOf(t), j = e.key === "ArrowRight" ? (i + 1) % onglets.length : e.key === "ArrowLeft" ? (i + onglets.length - 1) % onglets.length : -1;
      if (j >= 0) { e.preventDefault(); onglets[j].focus(); choisir(onglets[j]); }
    });
  }

  /* ---------- Copier ---------- */
  function copier(texte, bouton, fait) {
    const ok = () => { const avant = bouton.dataset.texte || bouton.textContent; bouton.dataset.texte = avant; bouton.textContent = fait; setTimeout(() => { bouton.textContent = avant; }, 2200); };
    const secours = () => {
      const zone = document.createElement("textarea"); zone.value = texte; zone.setAttribute("readonly", ""); zone.className = "cache";
      document.body.appendChild(zone); zone.select();
      try { document.execCommand("copy"); ok(); } catch (e) { /* le texte reste sélectionnable dans la page */ }
      zone.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texte).then(ok, secours); else secours();
  }
  $("#lo-copier").addEventListener("click", e => copier($("#lo-note").value, e.currentTarget, "Note copiée"));

  /* ---------- Barre (téléphone) : l'hypothèse principale reste visible pendant le questionnaire ---------- */
  let resultatsVus = false;
  if ("IntersectionObserver" in window) new IntersectionObserver(es => { resultatsVus = es[0].isIntersecting; if (dernier) barre(dernier); }).observe($("#resultats"));
  function barre(res) {
    const b = $("#lo-barre"), tete = res.diagnostics[0];
    const montrer = res.saisies > 2 && !resultatsVus && matchMedia("(max-width: 1099px)").matches;
    b.hidden = !montrer;
    if (montrer) $("#lo-barre-texte").textContent = `${tete.x.nom} · ${tete.categorie[1].toLowerCase()}`;
  }
  addEventListener("resize", () => { if (dernier) barre(dernier); });

  /* ---------- Nouveau patient ---------- */
  $("#lo-nav").addEventListener("click", e => {
    if (e.target.closest('a[href="#sources"]')) { $("#sources").open = true; return; }
    if (!e.target.closest("#lo-nouveau")) return;
    if (Object.keys(rep).length && !confirm("Effacer toutes les réponses et commencer un nouveau patient ?")) return;
    rep = {}; ouverts.clear(); tous = false;
    construire(); maj(); choisir(onglets[0]);
    scrollTo({ top: 0 });
  });

  /* ---------- Sources et validation ---------- */
  const tousPoids = d.questions.flatMap(q => q.effets);
  function statistiques() {
    const n = { provisoire: 0, a_verifier: 0, verifie: 0, valide: 0 };
    for (const e of tousPoids) n[e.statut]++;
    $("#lo-stats").textContent = `${tousPoids.length} poids : ${n.valide} validé${n.valide > 1 ? "s" : ""}, ${n.verifie} vérifié${n.verifie > 1 ? "s" : ""}, ${n.a_verifier} à vérifier (littérature), ${n.provisoire} provisoires. Probabilités de départ et multiplicateurs du sexe : provisoires.`;
  }
  const elementDe = LO.elementDe;
  const poidsDe = id => tousPoids.filter(e => e.dx === id);
  function tableau() {
    const id = $("#lo-src-dx").value, x = d.parDx[id], lignes = [];
    lignes.push(`<tr class="lo-depart"><td>Probabilité de départ : ${x.base.map(([a, pr]) => `${a} ans ${pctExact(pr)}`).join(", ")}${x.sexe ? ` ; ${Object.entries(x.sexe).map(([s, f]) => `${s === "F" ? "femme" : "homme"} ×${nb(f)}`).join(", ")}` : ""}</td>
      <td colspan="4"></td><td><span class="lo-statut" data-statut="provisoire">Provisoire</span></td><td></td></tr>`);
    for (const e of poidsDe(id)) {
      const statut = `<span class="lo-statut" data-statut="${e.statut}">${LO.STATUTS[e.statut]}</span>`, piste = esc(e.piste || "");
      if (e.rv) for (const [v, rv] of Object.entries(e.rv)) lignes.push(`<tr><td>${esc(elementDe(e, v))}</td><td>—</td><td>—</td><td colspan="2">RV ${nb(rv)}</td><td>${statut}</td><td>${piste}</td></tr>`);
      else {
        const [rp, rn] = LO.rvPosNeg(e);
        lignes.push(`<tr><td>${esc(elementDe(e))}</td><td>${e.se !== undefined ? pctExact(e.se) : "—"}</td><td>${e.sp !== undefined ? pctExact(e.sp) : "—"}</td><td>${nb(rp)}</td><td>${nb(rn)}</td><td>${statut}</td><td>${piste}</td></tr>`);
      }
    }
    $("#lo-table tbody").innerHTML = lignes.join("");
  }
  const consigne = id => LO.consigne(d, id);
  const choixDx = $("#lo-src-dx");
  choixDx.innerHTML = d.diagnostics.map(x => `<option value="${x.id}">${esc(x.nom)} (${poidsDe(x.id).length} poids)</option>`).join("");
  choixDx.addEventListener("change", tableau);
  $("#lo-consigne").addEventListener("click", e => copier(consigne(choixDx.value), e.currentTarget, "Consigne copiée"));

  $("#lo-version").textContent = d.version;
  construire(); statistiques(); tableau(); maj();
})();
