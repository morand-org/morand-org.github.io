/* Locomoteur Morand (prototype) : interface. Une consultation réunit une ou plusieurs plaintes (régions). Identification,
   habitudes de vie, antécédents, drapeaux généraux, examen fonctionnel, investigations et plan sont communs ; l'anamnèse,
   l'examen de la région, le diagnostic différentiel et la conduite sont propres à chaque plainte. Les régions se chargent
   à la demande. Rien n'est transmis ; « Sauvegarder » garde le patient dans ce navigateur seulement (localStorage). */
(function () {
  "use strict";
  const LO = window.Locomoteur, C = LO && LO.commun;
  if (!LO || !C || !LO.donnees) return;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nb = (x, dec = 2) => (x === undefined || x === null ? "—" : Number(x).toLocaleString("fr-CA", { maximumFractionDigits: dec }));
  const pct = pr => (pr < 0.05 ? "< 5 %" : pr > 0.95 ? "> 95 %" : `${Math.round(pr * 20) * 5} %`);
  const pctExact = x => `${Math.round(x * 100)} %`;
  const NIVEAU = { urgence: "Urgence", rapide: "Rapidement", considerer: "À considérer", info: "Information" };
  const ORDRE = ["cervical", "epaule", "coude", "poignet", "lombaire", "hanche", "genou", "cheville", "pied"];
  const NOMS = { cervical: "Cervical", epaule: "Épaule", coude: "Coude", poignet: "Poignet et main", lombaire: "Lombaire", hanche: "Hanche", genou: "Genou", cheville: "Cheville", pied: "Pied" };
  const AIDES = { pied: ["cheville"] };   // aide-mémoire d'une autre région utilisé par une région
  const prets = new Set((document.body.dataset.regions || document.body.dataset.articulation || "").split(",").filter(Boolean));
  const P = C.PARTAGES, PARTAGE = new Set(Object.values(P).flat());
  const form = $("#lo-form"), ouverts = new Set(), tousR = new Set();
  let etat = { regions: [], commun: {}, par: {} }, derniers = null, attente = 0, rendus = [], blocs = new Map(), cles = new Map();
  const blocsOuverts = new Set();
  const D = r => LO.donnees[r];
  const actives = () => etat.regions.filter(r => D(r));

  /* ---------- Réponses : communes (clé = id) ou propres à une plainte (clé = « région:id ») ---------- */
  const partagee = q => PARTAGE.has(q.id) || q.section.note === "inv" || q.section.note === "plan" || !!q.bloc.tete;
  const cleDe = (r, q) => (partagee(q) ? q.id : `${r}:${q.id}`);
  const lire = k => { const i = k.indexOf(":"); return i < 0 ? etat.commun[k] : (etat.par[k.slice(0, i)] || {})[k.slice(i + 1)]; };
  function ecrire(k, v) {
    const i = k.indexOf(":"), o = i < 0 ? etat.commun : (etat.par[k.slice(0, i)] = etat.par[k.slice(0, i)] || {}), id = i < 0 ? k : k.slice(i + 1);
    if (v === undefined) delete o[id]; else o[id] = v;
  }
  const repDe = r => ({ ...etat.commun, ...(etat.par[r] || {}) });
  // Réponses données, sans les « N/A ».
  const compteSaisies = () => [...Object.values(etat.commun), ...Object.values(etat.par).flatMap(o => Object.values(o))].filter(v => v !== "?" && v !== "" && !(Array.isArray(v) && !v.length)).length;
  const vide = () => !Object.keys(etat.commun).length && !Object.values(etat.par).some(o => Object.keys(o).length);

  /* ---------- Chargement des régions ---------- */
  const enCours = {};
  const script = src => new Promise((ok, ko) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
  function chargerRegion(r) {
    if (D(r)) return Promise.resolve();
    if (!enCours[r]) enCours[r] = [r, ...(AIDES[r] || [])].reduce((suite, a) => suite.then(() => ((LO.aideMemoire || {})[a] ? null : script(`/locomoteur/${a}/aide-memoire-${a}.js`))), Promise.resolve())
      .then(() => script(`/locomoteur/${r}/donnees-${r}.js`));
    return enCours[r];
  }

  /* ---------- Questionnaire ---------- */
  const etiquettes = q => q.labels || q.bloc.labels || ["Oui", "Non"];
  const equivoque = q => q.equivoque || (q.type === "oui_non" && (q.res || q.bloc.res) === "test");
  // Boutons de réponse : choix, « Équivoque » pour les tests (aucun effet sur le calcul), puis N/A (non évalué, non compté).
  function segments(q, k, opts, lid) {
    const extra = equivoque(q) && q.type === "oui_non" ? [["equivoque", "Équivoque"]] : [];
    return `<div class="lo-seg" role="group" aria-labelledby="${lid}">${[...opts, ...extra].map(([v, l]) =>
      `<button type="button" data-q="${k}" data-v="${esc(v)}" aria-pressed="false">${esc(l)}</button>`).join("")}<button type="button" class="lo-inconnu" data-q="${k}" data-v="?" aria-pressed="false" title="Non évalué ou ne sait pas : non compté">N/A</button></div>`;
  }
  // Toutes les définitions d'une question dans les plaintes actives (une question commune a des poids dans chaque région).
  const definitions = id => actives().map(r => [r, D(r).parQ[id]]).filter(([, q]) => q);
  const grappesDe = (r, q) => (D(r).grappes || []).filter(g => g.couvre.includes(q.id) || q.effets.some(e => e.g && g.couvre.includes(e.g)));
  const compte = (r, q) => (partagee(q) ? definitions(q.id) : [[r, q]]).some(([r2, q2]) => q2.effets.length > 0 || grappesDe(r2, q2).length > 0) || q.id === "sexe" || q.id === "age";
  /* Une question, ou un miroir : le miroir montre le contrôle de sa cible (même clé de réponse) sous son propre libellé. */
  function controle(r, q0) {
    const cible = q0.type === "miroir" ? D(r).parQ[q0.cible] : null;
    const q = cible ? { ...cible, libelle: q0.libelle, aide: q0.aide, info: q0.info || cible.info, section: cible.section, bloc: cible.bloc } : q0;
    const k = cleDe(r, cible || q0), dom = `${cible ? `${r}-${q0.id}` : k.replace(":", "-")}`, lid = `l-${dom}`;
    cles.set(k, { r, q: cible || q0 });
    rendus.push({ r, q: q0, dom });
    let ctl = "", large = false;
    if (q.type === "oui_non") { const [a, b] = etiquettes(q); ctl = segments(q, k, [["oui", a], ["non", b]], lid); }
    else if (q.type === "choix") {
      const court = q.options.length <= 4 && q.options.every(o => o.l.length <= 36) && q.options.reduce((n, o) => n + o.l.length, 0) <= 72;
      if (court) ctl = segments(q, k, q.options.map(o => [o.v, o.l]), lid);
      else ctl = `<select class="lo-select" id="c-${dom}" data-q="${k}" aria-labelledby="${lid}"><option value="">—</option>${q.options.map(o =>
        `<option value="${esc(o.v)}">${esc(o.l)}</option>`).join("")}<option value="?">N/A</option></select>`;
    } else if (q.type === "case") {
      ctl = `<button type="button" class="lo-puce lo-case" data-q="${k}" data-v="oui" aria-pressed="false" aria-labelledby="${lid}">${esc(q.n || q.libelle)}</button>`;
      return `<div class="lo-q lo-q-case" data-qid="${dom}"><span class="cache" id="${lid}">${esc(q.libelle)}</span>${ctl}</div>`;
    } else if (q.type === "multi") {
      large = true;
      ctl = `<div class="lo-puces" role="group" aria-labelledby="${lid}">${q.options.map(o =>
        `<button type="button" class="lo-puce" data-q="${k}" data-m="${esc(o.v)}" aria-pressed="false">${esc(o.l)}</button>`).join("")}</div>`;
    } else if (q.type === "nombre") {
      ctl = `<span class="lo-nombre"><input type="number" inputmode="numeric" id="c-${dom}" data-q="${k}" aria-labelledby="${lid}"${q.min !== undefined ? ` min="${q.min}"` : ""}${q.max !== undefined ? ` max="${q.max}"` : ""} step="1">${q.unite ? `<span class="lo-unite">${esc(q.unite)}</span>` : ""}</span>`;
    } else {
      large = true;
      ctl = q.long ? `<textarea class="lo-texte-libre" id="c-${dom}" data-q="${k}" aria-labelledby="${lid}" rows="2"></textarea>`
        : `<input type="text" class="lo-texte-libre" id="c-${dom}" data-q="${k}" aria-labelledby="${lid}">`;
    }
    const calcul = compte(r, cible || q0);
    const info = q.info || q.video || calcul ? `<button type="button" class="lo-info" data-info="${r}|${q0.id}" aria-expanded="false" aria-controls="i-${dom}" title="Information"><span aria-hidden="true">i</span><span class="cache"> : information sur ${esc(q.libelle)}</span></button>` : "";
    return `<div class="lo-q${large ? " lo-q-large" : ""}${calcul ? " lo-q-calcul" : ""}" data-qid="${dom}"><div class="lo-q-texte"><span class="lo-q-tete"><span class="lo-q-libelle" id="${lid}">${esc(q.libelle)}${calcul ? '<span class="cache"> (compte dans le calcul)</span>' : ""}</span>${info}</span>${q.aide ? `<span class="lo-q-aide">${esc(q.aide)}</span>` : ""}</div>${ctl}<div class="lo-info-panneau" id="i-${dom}" hidden></div></div>`;
  }
  /* Panneau « i » : pourquoi on le demande, comment faire le test, ce que la réponse change dans le calcul (chaque plainte), vidéo. */
  function libelleValeur(q, v) {
    if (q.type === "oui_non") return LO.libelleOption(q, v);
    return (q.options.find(o => o.v === v) || {}).l || v;
  }
  function infoHtml(r, q0) {
    const q = q0.type === "miroir" ? { ...D(r).parQ[q0.cible], info: q0.info || D(r).parQ[q0.cible].info } : q0;
    const morceaux = [], defs = partagee(q) ? definitions(q.id) : [[r, q]], plusieurs = defs.length > 1;
    if (q.info) morceaux.push(`<p>${esc(q.info)}</p>`);
    if (q.positif) morceaux.push(`<p><strong>Positif si :</strong> ${esc(q.positif)}</p>`);
    if (q.id === "sexe" || q.id === "age") morceaux.push("<p>Fixe la probabilité de départ de chaque diagnostic (fréquence selon l'âge exact et le sexe), avant toute autre réponse.</p>");
    for (const [r2, q2] of defs) {
      const d = D(r2), parValeur = new Map();
      const ajoute = (v, dx, rv, e) => { if (!(rv > 0) || Math.abs(Math.log(rv)) < 0.05) return; if (!parValeur.has(v)) parValeur.set(v, []); parValeur.get(v).push({ dx, rv, e }); };
      for (const e of q2.effets) {
        if (e.rv) for (const [v, rv] of Object.entries(e.rv)) ajoute(v, e.dx, rv, e);
        else {
          const [rp, rn] = LO.rvPosNeg(e), pos = e.pos || ["oui"], neg = e.neg || ["non"];
          const vp = q2.type === "multi" ? e.opt : pos[0], vn = q2.type === "multi" ? null : neg[0];
          if (rp !== undefined && rp !== null) ajoute(vp, e.dx, rp, e);
          if (vn && rn !== undefined && rn !== null) ajoute(vn, e.dx, rn, e);
        }
      }
      if (parValeur.size) {
        const lignes = [...parValeur.entries()].map(([v, l]) => {
          l.sort((a, b) => Math.abs(Math.log(b.rv)) - Math.abs(Math.log(a.rv)));
          return `<li><b>${esc(libelleValeur(q2, v))}</b> : ${l.slice(0, 5).map(x => `${x.rv > 1 ? "↑" : "↓"} ${esc(d.parDx[x.dx].n)} ×${nb(x.rv)}${x.e.statut === "verifie" || x.e.statut === "valide" ? " (vérifié)" : ""}`).join(" ; ")}</li>`;
        });
        morceaux.push(`<p class="lo-info-titre">Effet sur le calcul${plusieurs ? ` : ${esc(NOMS[r2].toLowerCase())}` : ""}</p><ul>${lignes.join("")}</ul>`);
        const sources = [...new Set(q2.effets.filter(e => e.piste).map(e => e.piste))];
        if (sources.length) morceaux.push(`<p class="lo-info-source">Sources : ${sources.map(esc).join(" · ")}</p>`);
      }
      const grappes = grappesDe(r2, q2);
      if (grappes.length) morceaux.push(`<p class="lo-info-titre">Fait partie d'une combinaison validée</p><ul>${grappes.map(g => `<li>${esc(g.nom)} : ${g.rv > 1 ? "↑" : "↓"} ${esc(d.parDx[g.dx].n)} ×${nb(g.rv)}${g.statut === "verifie" || g.statut === "valide" ? " (vérifié)" : ""}${g.piste ? ` <span class="lo-info-source">${esc(g.piste)}</span>` : ""}</li>`).join("")}</ul>`);
    }
    if (q.video) morceaux.push(`<p><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(`Physiotutors ${q.video}`)}" target="_blank" rel="noopener">Vidéo Physiotutors : ${esc(q.video)}</a></p>`);
    return morceaux.join("") || "<p>Pour la note seulement.</p>";
  }

  /* Bloc : titre, « Tout normal », aide, questions [{ r, q }]. */
  function blocHtml(ref, b, items, depliable = false) {
    if (!items.length) return "";
    blocs.set(ref, items);
    const bouton = b.toutNormal ? `<button type="button" class="lo-normal" data-normal="${ref}">${esc(typeof b.toutNormal === "string" ? b.toutNormal : "Tout normal")}</button>` : "";
    // Examen d'une région : chaque partie (inspection, palpation, tests…) se déplie ; ouverte si on y a répondu ou si on l'a ouverte.
    if (depliable && b.titre) {
      const repondu = items.some(({ r, q }) => q.type !== "miroir" && lire(cleDe(r, q)) !== undefined), ouvert = blocsOuverts.has(ref) || repondu || b.si;
      return `<details class="lo-bloc lo-bloc-depliable" data-bloc="${ref}"${ouvert ? " open" : ""}><summary><h3>${esc(b.titre)}</h3><span class="lo-compte" data-compte="${ref}"></span></summary>${bouton ? `<div class="lo-bloc-tete lo-bloc-outils"><span></span>${bouton}</div>` : ""}${b.aide ? `<p class="lo-bloc-aide">${esc(b.aide)}</p>` : ""}${items.map(x => controle(x.r, x.q)).join("")}</details>`;
    }
    return `<div class="lo-bloc" data-bloc="${ref}">${b.titre || bouton ? `<div class="lo-bloc-tete">${b.titre ? `<h3>${esc(b.titre)}</h3>` : "<span></span>"}${bouton}</div>` : ""}${b.aide ? `<p class="lo-bloc-aide">${esc(b.aide)}</p>` : ""}${items.map(x => controle(x.r, x.q)).join("")}</div>`;
  }
  // Questions communes d'une liste d'identifiants, dans l'ordre des fichiers de données, sans doublon.
  function communes(ids) {
    const vus = new Set(), items = [];
    for (const r of actives()) for (const s of D(r).sections) for (const b of s.blocs) for (const q of b.questions) {
      if (!ids.includes(q.id) || vus.has(q.id)) continue;
      vus.add(q.id); items.push({ r, q });
    }
    return items;
  }
  const section = (id, titre, corps, sous = "") => `<section class="lo-section" id="s-${id}" aria-labelledby="h-${id}"><h2 id="h-${id}">${esc(titre)}${sous}</h2>${corps}</section>`;
  function sectionPlaintes() {
    const puces = ORDRE.map(r => prets.has(r)
      ? `<button type="button" class="lo-puce" data-region="${r}" aria-pressed="${etat.regions.includes(r) ? "true" : "false"}">${esc(NOMS[r])}</button>`
      : `<button type="button" class="lo-puce" disabled title="À venir">${esc(NOMS[r])}</button>`).join("");
    return section("plaintes", "Plaintes", `<p class="lo-bloc-aide">Une ou plusieurs régions : chaque plainte a son anamnèse, son examen et son diagnostic différentiel ; l'identification, les antécédents et le plan sont communs.</p><div class="lo-puces lo-plaintes" role="group" aria-label="Régions de la plainte">${puces}</div>`);
  }
  function construire() {
    rendus = []; blocs.clear(); cles.clear();
    const regs = actives(), h = [sectionPlaintes()];
    if (regs.length) {
      const base = regs[0];
      h.push(section("identification", "Identification", blocHtml("c-id", {}, communes(P.identification))));
      h.push(section("hdv", "Habitudes de vie et activités", blocHtml("c-hdv", {}, communes(P.hdv))));
      h.push(section("antecedents", "Antécédents", blocHtml("c-atcd", {}, communes(P.atcd))));
      // Une section dépliable par plainte : côté et antécédents propres, puis l'anamnèse et les drapeaux propres à la région.
      for (const r of regs) {
        const d = D(r), corps = [];
        const propres = note => d.sections.filter(s => s.note === note).flatMap(s => s.blocs.flatMap(b => b.questions.filter(q => !partagee(q)).map(q => ({ r, q }))));
        corps.push(blocHtml(`${r}-plainte`, {}, propres("id")));
        corps.push(blocHtml(`${r}-atcd`, { titre: "Antécédents de cette région" }, propres("atcd")));
        for (const s of d.sections.filter(s => s.note === "hma")) s.blocs.forEach((b, i) =>
          corps.push(blocHtml(`${r}-${s.id}-${i}`, s.id === "drapeaux" ? { ...b, titre: b.titre || "Drapeaux rouges de cette région" } : b, b.questions.filter(q => !partagee(q)).map(q => ({ r, q })))));
        h.push(`<details class="lo-section lo-plainte" id="s-p-${r}" open><summary><h2>${esc(d.titre)}</h2></summary>${corps.join("")}</details>`);
      }
      h.push(section("drapeaux", "Drapeaux rouges généraux", blocHtml("c-drapeaux", { toutNormal: "Tout absent" }, communes(P.drapeaux))));
      // Examen : fonctionnel commun (blocs « tete »), puis l'examen de chaque région, dépliable.
      const ex = [], fonct = [], vus = new Set();
      for (const r of regs) for (const s of D(r).sections.filter(s => s.note === "examen")) for (const b of s.blocs.filter(b => b.tete)) for (const q of b.questions) if (!vus.has(q.id)) { vus.add(q.id); fonct.push({ r, q }); }
      ex.push(blocHtml("c-fonct", { titre: "Fonctionnel", toutNormal: true }, fonct, true));
      for (const r of regs) {
        const d = D(r), corps = [];
        for (const s of d.sections.filter(s => s.note === "examen")) s.blocs.forEach((b, i) => { if (!b.tete) corps.push(blocHtml(`${r}-${s.id}-${i}`, b, b.questions.map(q => ({ r, q })), true)); });
        ex.push(`<details class="lo-ex-region" id="s-ex-${r}" open><summary><h3>${esc(NOMS[r])}</h3></summary>${corps.join("")}</details>`);
      }
      h.push(section("examen", "Examen", ex.join("")));
      for (const s of D(base).sections.filter(s => s.note === "inv" || s.note === "plan")) h.push(section(s.id, s.titre, s.blocs.map((b, i) => blocHtml(`c-${s.id}-${i}`, b, b.questions.map(q => ({ r: base, q })))).join("")));
    } else h.push(`<p class="lo-vide">Choisissez la région de la plainte pour commencer.</p>`);
    form.innerHTML = h.join("");
    const liens = [["plaintes", "Plaintes"], ...(regs.length ? [["identification", "Identification"], ["hdv", "Habitudes"], ["antecedents", "Antécédents"], ...regs.map(r => [`p-${r}`, NOMS[r]]),
      ["drapeaux", "Drapeaux rouges"], ["examen", "Examen"], ["investigations", "Investigations"], ["plan", "Impression et plan"]] : [])];
    $("#lo-nav").innerHTML = liens.map(([id, t]) => `<a href="#s-${id}" data-nav="${id}">${esc(t)}<span class="lo-compte"></span></a>`).join("")
      + `<a href="#resultats">Résultats</a><a href="#sources">Sources</a><button type="button" class="lo-nouveau lo-secondaire" id="lo-patients-ouvrir">Patients</button><button type="button" class="lo-nouveau" id="lo-nouveau">Nouveau patient</button>`;
    remplir();
  }
  // Remet dans les contrôles les réponses en mémoire (après une reconstruction ou l'ouverture d'un patient).
  function remplir() {
    for (const k of cles.keys()) majControles(k);
  }
  function majControles(k) {
    const v = lire(k);
    for (const el of form.querySelectorAll(`[data-q="${k}"]`)) {
      if (el.tagName === "BUTTON") {
        const on = el.dataset.m !== undefined ? Array.isArray(v) && v.includes(el.dataset.m) : v === el.dataset.v;
        el.setAttribute("aria-pressed", on ? "true" : "false");
      } else if (el.value !== (v === undefined ? "" : String(v))) el.value = v === undefined ? "" : v;
    }
  }
  form.addEventListener("click", e => {
    const pr = e.target.closest("button[data-region]");
    if (pr) { basculerRegion(pr.dataset.region); return; }
    const bi = e.target.closest("button[data-info]");
    if (bi) {
      const [r, id] = bi.dataset.info.split("|"), panneau = document.getElementById(bi.getAttribute("aria-controls")), ouvrir = panneau.hidden;
      if (ouvrir) panneau.innerHTML = infoHtml(r, D(r).parQ[id]);
      panneau.hidden = !ouvrir; bi.setAttribute("aria-expanded", ouvrir ? "true" : "false");
      return;
    }
    const tout = e.target.closest("button[data-normal]");
    if (tout) {
      for (const { r, q } of blocs.get(tout.dataset.normal) || []) {
        if (q.type === "miroir" || q.horsNormal || !(derniers && derniers[r] && derniers[r].vus.has(q.id))) continue;
        const k = cleDe(r, q); if (lire(k) !== undefined) continue;
        const v = LO.normalDe(q); if (v === null) continue;
        ecrire(k, v); majControles(k);
      }
      planifier(); return;
    }
    const b = e.target.closest("button[data-q]");
    if (!b) return;
    const k = b.dataset.q, { q } = cles.get(k);
    if (b.dataset.m !== undefined) {
      const v = b.dataset.m, op = q.options.find(o => o.v === v);
      let cur = Array.isArray(lire(k)) ? lire(k).slice() : [];
      if (cur.includes(v)) cur = cur.filter(x => x !== v);
      else cur = op.exclusif ? [v] : cur.filter(x => !q.options.find(o => o.v === x).exclusif).concat(v);
      ecrire(k, cur.length ? cur : undefined);
    } else ecrire(k, lire(k) === b.dataset.v ? undefined : b.dataset.v);
    majControles(k); planifier();
  });
  const saisie = e => {
    const el = e.target.closest("[data-q]");
    if (!el || el.tagName === "BUTTON") return;
    const v = el.value.trim();
    ecrire(el.dataset.q, v === "" ? undefined : v);
    for (const autre of form.querySelectorAll(`[data-q="${el.dataset.q}"]:not(button)`)) if (autre !== el) autre.value = el.value;
    planifier();
  };
  form.addEventListener("input", saisie);
  form.addEventListener("change", saisie);
  form.addEventListener("submit", e => e.preventDefault());
  form.addEventListener("toggle", e => { const b = e.target.closest && e.target.closest(".lo-bloc-depliable"); if (b === e.target) { if (b.open) blocsOuverts.add(b.dataset.bloc); else blocsOuverts.delete(b.dataset.bloc); } }, true);
  function basculerRegion(r) {
    if (etat.regions.includes(r)) {
      if (etat.regions.length === 1) return;
      if (Object.keys(etat.par[r] || {}).length && !confirm(`Retirer la plainte « ${NOMS[r]} » et ses réponses ?`)) return;
      etat.regions = etat.regions.filter(x => x !== r); delete etat.par[r];
      construire(); maj(); sources(); return;
    }
    etat.regions.push(r);
    const puce = form.querySelector(`button[data-region="${r}"]`); if (puce) puce.setAttribute("aria-busy", "true");
    chargerRegion(r).then(() => { construire(); maj(); sources(); const s = document.getElementById(`s-p-${r}`); if (s) s.scrollIntoView({ block: "start" }); },
      () => { etat.regions = etat.regions.filter(x => x !== r); alert(`La région « ${NOMS[r]} » n'a pas pu être chargée.`); construire(); maj(); });
  }

  /* ---------- Calcul et affichage ---------- */
  function planifier() { cancelAnimationFrame(attente); attente = requestAnimationFrame(maj); }
  function maj() {
    const regs = actives();
    derniers = Object.fromEntries(regs.map(r => [r, LO.calculer(D(r), repDe(r))]));
    for (const { r, q, dom } of rendus) { const el = form.querySelector(`[data-qid="${dom}"]`); if (el) el.hidden = !derniers[r].vus.has(q.id); }
    for (const [ref, items] of blocs) {
      const el = form.querySelector(`[data-bloc="${ref}"]`); if (el) el.hidden = !items.some(({ r, q }) => derniers[r].vus.has(q.id));
      const c = form.querySelector(`[data-compte="${ref}"]`);
      if (c) { const n = new Set(items.filter(({ q }) => q.type !== "miroir").map(({ r, q }) => cleDe(r, q)).filter(k => lire(k) !== undefined)).size; c.textContent = n ? String(n) : ""; }
    }
    for (const a of document.querySelectorAll("#lo-nav [data-nav]")) {
      const sec = document.getElementById(`s-${a.dataset.nav}`); if (!sec) continue;
      const n = [...new Set([...sec.querySelectorAll("[data-q]")].map(el => el.dataset.q))].filter(k => lire(k) !== undefined).length;
      $(".lo-compte", a).textContent = n ? String(n) : "";
    }
    resultats(regs); conduite(regs);
    $("#lo-note").value = regs.length ? LO.redigerPlusieurs(regs.map(r => ({ d: D(r), res: derniers[r] }))) : "";
    barre(regs);
  }
  const departTexte = res => {
    const L = res.L, morceaux = [];
    if (L.sexe) morceaux.push(L.sexe === "F" ? "femme" : "homme");
    if (L.age !== null) morceaux.push(`${L.age} ans`);
    return morceaux.length ? morceaux.join(", ") : "âge et sexe inconnus";
  };
  const texteConduite = c => (typeof c === "string" ? c : c.t);
  function alertesHtml(liste, avecConduite) {
    return liste.map(a => `<div class="lo-alerte" data-niveau="${a.niveau}"><p class="lo-alerte-titre"><span class="lo-niveau">${NIVEAU[a.niveau]}</span>${esc(a.titre)}</p>
      <p>${esc(a.texte)}</p>${avecConduite && a.conduite ? `<ul>${a.conduite.map(c => `<li>${esc(texteConduite(c))}${c.src ? `<span class="lo-src">${esc(c.src)}</span>` : ""}</li>`).join("")}</ul>` : ""}${liens(a.liens)}</div>`).join("");
  }
  const liens = l => (l && l.length ? `<p class="lo-liens">${l.map(x => `<a href="${esc(x.u)}">${esc(x.t)}</a>`).join("")}</p>` : "");
  const plainteTitre = r => { const res = derniers[r], co = D(r).parQ.cote && res.rep.cote ? D(r).parQ.cote.options.find(o => o.v === res.rep.cote) : null; return `${NOMS[r]}${co ? ` ${co.abr}` : ""}`; };
  /* Diagnostics en trois groupes : à considérer en premier (probable), à garder en tête (possible ou peu probable, jusqu'à
     6 en tout), à ne pas manquer (diagnostics graves de la région, gardés visibles tant qu'ils dépassent 1 %). */
  const cles3 = x => {
    const pour = x.comptes.filter(c => c.l > 0).slice(0, 3), contre = x.comptes.filter(c => c.l < 0).slice(0, 2);
    return pour.length || contre.length ? `<span class="lo-dx-cles">${[...pour.map(c => `<span data-sens="haut">↑ ${esc(c.libelle)}</span>`), ...contre.map(c => `<span data-sens="bas">↓ ${esc(c.libelle)}</span>`)].join("")}</span>` : "";
  };
  // Fiche high yield liée au diagnostic (locomoteur/fiches-hy.js), et bibliothèque de la région.
  const hyLien = (r, id) => { const f = ((LO.fichesHY || {})[r] || {})[id]; return f ? `<p class="lo-fiches"><a class="lo-lien" href="${esc(f.u)}">Fiche high yield ${esc(f.no)}</a></p>` : ""; };
  const hyBiblio = r => ((LO.fichesHY || {})[r] ? `<p class="lo-discret lo-hy-biblio"><a href="/locomoteur/${r}/fiches/">Fiches high yield : ${esc(NOMS[r].toLowerCase())}</a></p>` : "");
  function itemDx(r, res, x, avecCles) {
    const verifies = x.comptes.filter(c => c.e.statut === "verifie" || c.e.statut === "valide").length;
    return `<li class="lo-dx-item" data-cat="${x.categorie[2]}" data-dx="${x.id}"><details${ouverts.has(`${r}|${x.id}`) ? " open" : ""}>
      <summary><span class="lo-dx-ligne"><span class="lo-dx-nom">${esc(x.x.nom)}</span><span class="lo-dx-pct">${pct(x.p)}</span></span>
        <span class="lo-jauge" aria-hidden="true"><span class="lo-jauge-plage"></span><span class="lo-jauge-val"></span></span>
        <span class="lo-dx-ligne lo-dx-sous"><span class="lo-dx-cat">${x.categorie[1]}</span><span title="Analyse de sensibilité : poids 30 % plus faibles ou plus forts, fréquence de départ 1,5 fois plus basse ou plus haute">si les poids varient : ${pct(x.bas)} à ${pct(x.haut)}</span></span>${avecCles ? cles3(x) : ""}</summary>
      <div class="lo-pourquoi">
        ${x.comptes.length ? `<p class="lo-discret">Éléments qui comptent : ${x.comptes.length}, dont ${verifies} vérifié${verifies > 1 ? "s" : ""} dans la littérature ; les autres poids sont provisoires.</p>` : ""}
        ${x.residuel ? `<p>${esc(x.x.explication || "Probabilité qu'aucun des diagnostics de la liste ne soit en cause.")}</p>` : `<p>Départ (${esc(departTexte(res))}) : ${pctExact(x.depart)}.</p>`}
        ${x.explique ? `<p>Pris seul : ${pct(x.seul)}. ${esc(x.explique.nom)}, plus probable, explique déjà une partie de ces éléments.</p>` : ""}
        ${x.comptes.length ? `<ul>${x.comptes.slice(0, 10).map(c => `<li><span class="lo-fleche" data-sens="${c.l > 0 ? "haut" : "bas"}">${c.l > 0 ? "↑" : "↓"} ×${nb(c.rv)}</span><span>${esc(c.libelle)}</span><span class="lo-statut" data-statut="${c.e.statut}">${LO.STATUTS[c.e.statut]}</span></li>`).join("")}</ul>`
          : x.residuel ? "" : "<p>Aucune réponse ne change encore ce diagnostic.</p>"}
        ${hyLien(r, x.id)}
        ${(x.x.fiches || []).length ? `<p class="lo-fiches">${x.x.fiches.map(id => `<button type="button" class="lo-lien" data-fiche="${esc(id)}">Fiche ${id.startsWith("athlete") ? "athlète" : "50 ans et plus"}</button>`).join("")}</p>` : ""}
        ${x.comptes.length > 10 ? `<p class="lo-discret">Et ${x.comptes.length - 10} autre${x.comptes.length - 10 > 1 ? "s" : ""} élément${x.comptes.length - 10 > 1 ? "s" : ""} de moindre poids.</p>` : ""}
      </div></details></li>`;
  }
  function dxHtml(r, res) {
    const L = res.diagnostics, premiers = L.filter(x => x.p >= 0.5), autres = L.filter(x => x.p < 0.5);
    const garder = tousR.has(r) ? autres : autres.slice(0, Math.max(0, 6 - premiers.length));
    const montres = new Set([...premiers, ...garder].map(x => x.id));
    const graves = L.filter(x => x.x.grave && !montres.has(x.id) && x.p >= 0.01);
    const groupe = (titre, liste, cles) => (liste.length ? `<h4 class="lo-dx-groupe">${titre}</h4><ol class="lo-dx" data-region="${r}">${liste.map((x, i) => itemDx(r, res, x, cles && i === 0)).join("")}</ol>` : "");
    // Diagnostics probables qui peuvent coexister (« compatibles » des données) : l'un n'exclut pas l'autre.
    const comp = new Set((D(r).compatibles || []).flatMap(([a, b]) => [`${a}|${b}`, `${b}|${a}`]));
    const cands = L.filter(x => !x.residuel && x.p >= 0.2).slice(0, 6), paires = [];
    cands.forEach((a, i) => cands.slice(i + 1).forEach(b => { if (comp.has(`${a.id}|${b.id}`)) paires.push(`${a.x.n} et ${b.x.n}`); }));
    const coexist = paires.length ? `<p class="lo-coexist"><strong>Peuvent coexister</strong> : ${esc(paires.slice(0, 3).join(" ; "))}. L'un n'exclut pas l'autre.</p>` : "";
    return groupe("À considérer en premier", premiers, true) + coexist + groupe(premiers.length ? "À garder en tête" : "Hypothèses", garder, !premiers.length) + groupe("À ne pas manquer", graves, false)
      + (L.length > montres.size + graves.length || tousR.has(r) ? `<button type="button" class="lo-lien lo-tous" data-tous="${r}">${tousR.has(r) ? "Afficher moins" : `Afficher les ${L.length} diagnostics`}</button>` : "");
  }
  function resultats(regs) {
    const zone = $("#lo-dx-regions"), plusieurs = regs.length > 1;
    if (!regs.length) { zone.innerHTML = ""; $("#lo-res-etat").textContent = "Choisissez la région de la plainte."; return; }
    const r0 = derniers[regs[0]], saisies = compteSaisies();
    const seulsDepart = regs.every(r => derniers[r].diagnostics.every(x => !x.comptes.length));
    $("#lo-res-etat").textContent = !saisies ? "Commencez par l'âge et le sexe."
      : seulsDepart ? `Probabilités de départ (${departTexte(r0)}). Remplissez l'anamnèse et l'examen.`
        : regs.map(r => `${plusieurs ? `${plainteTitre(r)} : ` : `${saisies} réponse${saisies > 1 ? "s" : ""} · `}${derniers[r].diagnostics[0].categorie[1].toLowerCase()} : ${derniers[r].diagnostics[0].x.nom.toLowerCase()}`).join(" · ");
    zone.innerHTML = regs.map(r => `<section class="lo-dx-region" data-region="${r}">${plusieurs ? `<h3 class="lo-c-titre">${esc(plainteTitre(r))}</h3>` : ""}<div class="lo-alertes">${alertesHtml(derniers[r].alertes, true)}</div>${dxHtml(r, derniers[r])}${hyBiblio(r)}</section>`).join("");
    for (const ol of zone.querySelectorAll("ol.lo-dx")) for (const li of ol.children) {
      const r = ol.dataset.region, x = derniers[r].diagnostics.find(y => y.id === li.dataset.dx);
      li.style.setProperty("--val", x.p.toFixed(4)); li.style.setProperty("--bas", x.bas.toFixed(4)); li.style.setProperty("--haut", x.haut.toFixed(4));
      li.querySelector("details").addEventListener("toggle", ev => { if (ev.target.open) ouverts.add(`${r}|${x.id}`); else ouverts.delete(`${r}|${x.id}`); });
    }
  }
  $("#lo-dx-regions").addEventListener("click", e => {
    const t = e.target.closest("button[data-tous]");
    if (t) { const r = t.dataset.tous; if (tousR.has(r)) tousR.delete(r); else tousR.add(r); resultats(actives()); return; }
    const f = e.target.closest("button[data-fiche]"); if (f) ouvrirFiche(f.dataset.fiche);
  });
  function conduite(regs) {
    const plusieurs = regs.length > 1, dejaPlan = String(etat.commun.plan_ajouts || "").split(/\r?\n/).map(x => x.trim());
    const ligne = c => `<li><span>${esc(c.t)}${c.src ? `<span class="lo-src">${esc(c.src)}</span>` : ""}</span><button type="button" class="lo-plus" data-plan="${esc(c.t)}"${dejaPlan.includes(c.t.replace(/\.$/, "")) ? " disabled" : ""}>+ Plan</button></li>`;
    let h = "";
    for (const r of regs) {
      const res = derniers[r], graves = res.alertes.filter(a => a.niveau !== "info" && a.conduite);
      if (plusieurs) h += `<h3 class="lo-c-titre lo-c-plainte">${esc(plainteTitre(r))}</h3>`;
      if (graves.length) h += `<h3 class="lo-c-titre">Alertes</h3>${alertesHtml(graves, true)}`;
      if (res.conduite.length) h += res.conduite.map(c => `<section class="lo-c-dx"><h3>${esc(c.dx.x.nom)} <span class="lo-dx-cat" data-cat="${c.dx.categorie[2]}">${c.dx.categorie[1]}</span></h3>
        <ul>${c.items.map(ligne).join("")}</ul>${liens(c.liens)}</section>`).join("");
      else h += `<p class="lo-vide">Aucune hypothèse n'est encore assez probable pour proposer une conduite propre à un diagnostic.</p>`;
    }
    // Mesures générales : une seule fois par titre, même avec plusieurs plaintes.
    const vus = new Set(), mesures = regs.flatMap(r => derniers[r].mesures).filter(g => !vus.has(g.titre) && vus.add(g.titre));
    if (mesures.length) h += `<h3 class="lo-c-titre lo-c-mesures">Mesures générales</h3>` + mesures.map(g => `<section class="lo-c-dx"><h3>${esc(g.titre)}</h3><ul>${g.items.map(ligne).join("")}</ul></section>`).join("");
    h += `<p class="lo-discret">Conduite indicative, à adapter au patient. La source de chaque recommandation est indiquée en petit ; « + Plan » n'ajoute que l'action.</p>`;
    $("#lo-conduite").innerHTML = regs.length ? h : "";
  }
  $("#lo-conduite").addEventListener("click", e => {
    const b = e.target.closest("button[data-plan]");
    if (!b) return;
    const t = b.dataset.plan.replace(/\.$/, ""), actuel = String(etat.commun.plan_ajouts || "").trim();
    etat.commun.plan_ajouts = actuel ? `${actuel}\n${t}` : t;
    majControles("plan_ajouts"); b.disabled = true; planifier();
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
  const fermer = dlg => (dlg.close ? dlg.close() : dlg.removeAttribute("open"));
  if (dialogue) dialogue.addEventListener("click", e => { if (e.target === dialogue || e.target.closest(".lo-fiche-fermer")) fermer(dialogue); });

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
  if ("IntersectionObserver" in window) new IntersectionObserver(es => { resultatsVus = es[0].isIntersecting; barre(actives()); }).observe($("#resultats"));
  function barre(regs) {
    const b = $("#lo-barre"), saisies = Object.values(etat.par).reduce((n, o) => n + Object.keys(o).length, 0);
    // Une alerte urgente ou rapide reste affichée dans la barre, avant l'hypothèse principale, jusqu'aux résultats.
    const alerte = derniers && regs.map(r => (derniers[r].alertes || []).find(a => a.niveau === "urgence" || a.niveau === "rapide")).find(Boolean);
    const montrer = !!(derniers && regs.length && (saisies > 2 || alerte) && !resultatsVus && matchMedia("(max-width: 1099px)").matches);
    b.hidden = !montrer;
    b.classList.toggle("lo-barre-alerte", !!alerte);
    if (montrer) $("#lo-barre-texte").textContent = alerte ? `⚠ ${alerte.titre}`
      : regs.map(r => { const t = derniers[r].diagnostics[0]; return `${regs.length > 1 ? `${NOMS[r]} : ` : ""}${t.x.nom} · ${t.categorie[1].toLowerCase()}`; }).join(" | ");
  }
  addEventListener("resize", () => barre(actives()));

  /* ---------- Patients : sauvegarde locale (ce navigateur seulement, non chiffrée, sans nom) ---------- */
  const CLE = "msk-morand-patients", MAX = 20, dlgP = document.getElementById("lo-patients");
  const lireP = () => { try { const x = JSON.parse(localStorage.getItem(CLE) || "[]"); return Array.isArray(x) ? x : []; } catch (e) { return []; } };
  const ecrireP = l => { try { localStorage.setItem(CLE, JSON.stringify(l)); return true; } catch (e) { return false; } };
  const dateFr = iso => new Date(iso).toLocaleString("fr-CA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  function listeP() {
    const l = lireP();
    $("#lo-patients-liste").innerHTML = l.length ? l.map(x => `<li><span><strong>${esc(x.etiquette)}</strong> · ${esc(x.regions.map(r => NOMS[r] || r).join(", "))} · ${esc(dateFr(x.maj))}</span>
      <span class="lo-patients-actions"><button type="button" class="lo-lien" data-ouvrir="${esc(x.id)}">Ouvrir</button><button type="button" class="lo-lien" data-supprimer="${esc(x.id)}">Supprimer</button></span></li>`).join("")
      : `<li class="lo-discret">Aucun patient sauvegardé.</li>`;
    $("#lo-patients-compte").textContent = `${l.length} sur ${MAX}`;
  }
  function ouvrirP() { listeP(); if (dlgP.showModal) dlgP.showModal(); else dlgP.setAttribute("open", ""); $("#lo-etiquette").focus(); }
  $("#lo-patients-form").addEventListener("submit", e => {
    e.preventDefault();
    const etiquette = $("#lo-etiquette").value.trim();
    if (!etiquette) { $("#lo-etiquette").focus(); return; }
    let l = lireP(); const deja = l.find(x => x.etiquette === etiquette);
    if (deja && !confirm(`Remplacer le patient « ${etiquette} » déjà sauvegardé ?`)) return;
    if (!deja && l.length >= MAX) { alert(`${MAX} patients au maximum : supprimez-en un d'abord.`); return; }
    const fiche = { id: deja ? deja.id : String(Date.now()), etiquette, maj: new Date().toISOString(), regions: etat.regions.slice(), commun: etat.commun, par: etat.par };
    l = [fiche, ...l.filter(x => x !== deja)];
    if (!ecrireP(l)) { alert("Sauvegarde impossible dans ce navigateur (stockage bloqué ou plein)."); return; }
    $("#lo-etiquette").value = ""; listeP();
  });
  dlgP.addEventListener("click", e => {
    if (e.target === dlgP || e.target.closest(".lo-fiche-fermer")) { fermer(dlgP); return; }
    const o = e.target.closest("button[data-ouvrir]"), s = e.target.closest("button[data-supprimer]");
    if (s) { const x = lireP().find(y => y.id === s.dataset.supprimer); if (x && confirm(`Supprimer le patient « ${x.etiquette} » ?`)) { ecrireP(lireP().filter(y => y.id !== x.id)); listeP(); } return; }
    if (o) {
      const x = lireP().find(y => y.id === o.dataset.ouvrir); if (!x) return;
      if (!vide() && !confirm("Remplacer la consultation en cours par ce patient ?")) return;
      const regions = x.regions.filter(r => prets.has(r));
      Promise.all(regions.map(chargerRegion)).then(() => {
        etat = { regions, commun: x.commun || {}, par: x.par || {} }; ouverts.clear(); tousR.clear();
        construire(); maj(); sources(); fermer(dlgP); scrollTo({ top: 0 });
      });
    }
  });
  $("#lo-patients-effacer").addEventListener("click", () => { if (lireP().length && confirm("Effacer tous les patients sauvegardés dans ce navigateur ?")) { ecrireP([]); listeP(); } });

  /* ---------- Navigation : sources, patients, nouveau patient ---------- */
  $("#lo-nav").addEventListener("click", e => {
    if (e.target.closest('a[href="#sources"]')) { $("#sources").open = true; return; }
    if (e.target.closest("#lo-patients-ouvrir")) { ouvrirP(); return; }
    if (!e.target.closest("#lo-nouveau")) return;
    if (!vide() && !confirm("Effacer toutes les réponses et commencer un nouveau patient ? (Les patients sauvegardés restent.)")) return;
    etat = { regions: etat.regions.slice(0, 1), commun: {}, par: {} }; ouverts.clear(); tousR.clear();
    construire(); maj(); choisir(onglets[0]); sources();
    scrollTo({ top: 0 });
  });

  /* ---------- Sources et validation (plaintes actives) ---------- */
  const elementDe = LO.elementDe, choixDx = $("#lo-src-dx");
  const poidsDe = (r, id) => D(r).questions.flatMap(q => q.effets).filter(e => e.dx === id);
  function statistiques() {
    const tous = actives().flatMap(r => [...D(r).questions.flatMap(q => q.effets), ...(D(r).grappes || [])]), n = { provisoire: 0, a_verifier: 0, verifie: 0, valide: 0 };
    for (const e of tous) n[e.statut]++;
    const articles = new Set(tous.filter(e => e.statut === "verifie" || e.statut === "valide").flatMap(e => (e.piste || "").split(/ ; | · /)).map(x => x.trim()).filter(Boolean));
    $("#lo-stats").textContent = `${actives().map(r => NOMS[r]).join(", ")} : ${tous.length} poids : ${n.valide} validé${n.valide > 1 ? "s" : ""}, ${n.verifie} vérifié${n.verifie > 1 ? "s" : ""} (${articles.size} source${articles.size > 1 ? "s" : ""}), ${n.a_verifier} à vérifier, ${n.provisoire} provisoires. Fréquences de départ : provisoires.`;
  }
  function tableau() {
    if (!choixDx.value) { $("#lo-table tbody").innerHTML = ""; return; }
    const [r, id] = choixDx.value.split("|"), d = D(r), x = d.parDx[id], lignes = [];
    lignes.push(`<tr class="lo-depart"><td>Probabilité de départ : ${x.base.map(([a, pr]) => `${a} ans ${pctExact(pr)}`).join(", ")}${x.sexe ? ` ; ${Object.entries(x.sexe).map(([s, f]) => `${s === "F" ? "femme" : "homme"} ×${nb(f)}`).join(", ")}` : ""}</td>
      <td colspan="4"></td><td><span class="lo-statut" data-statut="provisoire">Provisoire</span></td><td>${esc(x.repere || "")}</td></tr>`);
    for (const e of poidsDe(r, id)) {
      const statut = `<span class="lo-statut" data-statut="${e.statut}">${LO.STATUTS[e.statut]}</span>`, piste = esc(e.piste || "");
      if (e.rv) for (const [v, rv] of Object.entries(e.rv)) lignes.push(`<tr><td>${esc(elementDe(e, v))}</td><td>—</td><td>—</td><td colspan="2">RV ${nb(rv)}</td><td>${statut}</td><td>${piste}</td></tr>`);
      else {
        const [rp, rn] = LO.rvPosNeg(e);
        lignes.push(`<tr><td>${esc(elementDe(e))}</td><td>${e.se !== undefined ? pctExact(e.se) : "—"}</td><td>${e.sp !== undefined ? pctExact(e.sp) : "—"}</td><td>${nb(rp)}</td><td>${nb(rn)}</td><td>${statut}</td><td>${piste}</td></tr>`);
      }
    }
    for (const g of (d.grappes || []).filter(g => g.dx === id)) {
      const statut = `<span class="lo-statut" data-statut="${g.statut}">${LO.STATUTS[g.statut]}</span>`;
      lignes.push(`<tr class="lo-grappe"><td>Combinaison : ${esc(g.nom)}</td><td>${g.se !== undefined ? pctExact(g.se) : "—"}</td><td>${g.sp !== undefined ? pctExact(g.sp) : "—"}</td><td>${g.rv > 1 ? nb(g.rv) : "—"}</td><td>${g.rv < 1 ? nb(g.rv) : "—"}</td><td>${statut}</td><td>${esc(g.piste || "")}</td></tr>`);
    }
    $("#lo-table tbody").innerHTML = lignes.join("");
  }
  function sources() {
    const regs = actives(), avant = choixDx.value;
    choixDx.innerHTML = regs.map(r => `<optgroup label="${esc(NOMS[r])}">${D(r).diagnostics.map(x => `<option value="${r}|${x.id}">${esc(x.nom)} (${poidsDe(r, x.id).length} poids)</option>`).join("")}</optgroup>`).join("");
    if ([...choixDx.options].some(o => o.value === avant)) choixDx.value = avant;
    statistiques(); tableau();
    $("#lo-version").textContent = regs.length ? D(regs[0]).version : "";
    const sc = regs.map(r => D(r).sourcesConduite ? `${NOMS[r]} : ${D(r).sourcesConduite}` : null).filter(Boolean);
    $("#lo-src-conduite").innerHTML = sc.length ? `<strong>Conduite.</strong> Aide-mémoire de première ligne (Québec) du document OpenEvidence, à adapter au jugement clinique et aux corridors de services locaux. ${sc.map(esc).join(" ")}` : "";
  }
  choixDx.addEventListener("change", tableau);
  $("#lo-consigne").addEventListener("click", e => { if (!choixDx.value) return; const [r, id] = choixDx.value.split("|"); copier(LO.consigne(D(r), id), e.currentTarget, "Questions copiées"); });

  /* ---------- Départ : la région de la page ---------- */
  const depart = document.body.dataset.articulation;
  etat.regions = prets.has(depart) ? [depart] : [];
  Promise.all(etat.regions.map(chargerRegion)).then(() => { construire(); maj(); sources(); });
})();
