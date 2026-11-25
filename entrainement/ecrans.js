/* Morand — Entraînement clinique : écrans (accueil, partie, résultats), clavier, chrono à l'écran, mode éditeur.
   Les cartes se chargent par région (banque/*.json) ; le moteur (jeu.js) tire et compte, le stockage (stockage.js) retient. */
(function () {
  "use strict";
  const J = window.EntrainementJeu, S = window.EntrainementStockage;
  if (!J || !S) return;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nb = x => Number(x).toLocaleString("fr-CA", { maximumFractionDigits: 2 });
  const sec = ms => `${(ms / 1000).toLocaleString("fr-CA", { maximumFractionDigits: 1, minimumFractionDigits: 1 })} s`;
  const REP = { increase: ["↑", "Augmente"], neutral: ["↔", "Neutre"], decrease: ["↓", "Diminue"] };
  const STATUT = { validee: "Validée", en_revision: "En révision", experimentale: "Expérimentale" };
  // Audit (outils/entrainement/appliquer-audit.mjs) : pertinence pour le médecin de famille, puis le médecin du sport.
  const PERTINENCE = { 1: "Essentielle", 2: "Importante", 3: "Complémentaire", 4: "Pointue (médecine du sport)", 0: "Retirée" };
  const NIVEAU = { 1: "Léger", 2: "Modéré", 3: "Difficile" };
  const MODES = { chrono: "Contre-la-montre", serie: "Série parfaite", libre: "Entraînement libre", defi: "Défi quotidien", erreurs: "Révision des erreurs" };

  /* ---------- Préférence : mode éditeur (?editeur=1) ---------- */
  const params = new URLSearchParams(location.search);
  if (params.has("editeur")) S.definirPref("editeur", params.get("editeur") !== "0");
  const editeur = () => S.pref("editeur", false);

  /* ---------- Banque : index, puis paquets à la demande ---------- */
  let index = null;
  const paquets = {};
  const charger = url => fetch(url, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  function paquet(cle) {
    if (!paquets[cle]) {
      const p = index.paquets.find(x => x.cle === cle);
      paquets[cle] = charger(p.fichier).then(d => {
        for (const c of d.cartes) { c.paquet = cle; c.refs = c.references.map(n => d.references[n]).filter(Boolean); }
        return d;
      });
    }
    return paquets[cle];
  }
  const remise = c => (S.decision(c.id) || {}).statut === "remise";
  const auJeu = c => c.statut !== "experimentale" && (!c.retrait || remise(c));
  const jouable = c => editeur() || (auJeu(c) && (S.decision(c.id) || {}).statut !== "signalee");
  async function cartesDe(cleRegion) {
    const cles = cleRegion ? [cleRegion] : index.paquets.map(p => p.cle);
    return (await Promise.all(cles.map(paquet))).flatMap(d => d.cartes).filter(jouable);
  }

  /* ---------- Accueil ---------- */
  const ecrans = { accueil: $("#en-accueil"), partie: $("#en-partie"), resultats: $("#en-resultats") };
  function montrer(nom) {
    for (const [k, el] of Object.entries(ecrans)) el.hidden = k !== nom;
    document.body.dataset.ecran = nom;
    scrollTo({ top: 0 });
  }
  const regionChoisie = () => $("#en-region").value;
  const regionDuJour = jour => index.paquets[J.graine(`region-${jour}`) % index.paquets.length];

  function accueil() {
    const jouablesDe = p => (editeur() ? p.cartes : p.jouables !== undefined ? p.jouables : p.cartes - p.experimentales);
    const sel = $("#en-region"), total = index.paquets.reduce((t, p) => t + jouablesDe(p), 0);
    if (sel.options.length === 1) {
      sel.options[0].textContent = `Toutes les régions (${total.toLocaleString("fr-CA")} cartes)`;
      for (const p of index.paquets) sel.add(new Option(`${p.region} (${jouablesDe(p)})`, p.cle));
      sel.value = S.pref("region", "");
      if (sel.selectedIndex < 0) sel.value = "";
    }
    // Records.
    const r = k => S.record(k);
    const chrono = J.CONFIG.durees.map(d => r(`chrono-${d}`) && `${d} s : ${r(`chrono-${d}`).valeur.toLocaleString("fr-CA")}`).filter(Boolean);
    $('[data-record="chrono"]').textContent = chrono.length ? `Records · ${chrono.join(" · ")}` : "";
    $('[data-record="serie"]').textContent = r("serie") ? `Record : ${r("serie").valeur} de suite` : "";
    const t = S.totaux();
    $('[data-record="libre"]').textContent = t.cartesVues ? `${t.cartesVues.toLocaleString("fr-CA")} cartes vues` : "";
    const jour = S.aujourdhui(), fait = S.defi(jour), rj = regionDuJour(jour);
    $("#en-defi-desc").textContent = `${J.CONFIG.defi} cartes, les mêmes pour tous. Aujourd'hui : ${rj.region.toLowerCase()}.`;
    $('[data-record="defi"]').textContent = fait ? `Fait : ${fait.bonnes}/${fait.questions}, ${fait.score.toLocaleString("fr-CA")} points` : "";
    const n = S.aRevoir().length, be = $('[data-mode="erreurs"]');
    $('[data-record="erreurs"]').textContent = n ? `${n} carte${n > 1 ? "s" : ""} à revoir` : "Aucune erreur à revoir";
    be.disabled = !n;
    // Progression par région et par type.
    const groupe = (titre, g, nom) => {
      const l = Object.entries(g).sort((a, b) => b[1].n - a[1].n);
      return l.length ? `<h3>${titre}</h3><ul class="en-barres">${l.map(([k, v]) => { const p = Math.round((v.ok / v.n) * 100);
        return `<li><span>${esc(nom(k))}</span><span class="en-barre" aria-hidden="true"><span class="en-barre-plein" data-largeur="${p}"></span></span><span>${p} % <small>(${v.n})</small></span></li>`; }).join("")}</ul>` : "";
    };
    const corps = groupe("Par région", S.parGroupe("r"), k => k) + groupe("Par type d'élément", S.parGroupe("ty"), k => k);
    $("#en-progression-corps").innerHTML = corps || `<p class="en-discret">Rien encore : jouez une partie pour voir votre réussite par région et par type d'élément.</p>`;
    for (const b of $$(".en-barre-plein")) b.style.width = `${b.dataset.largeur}%`;
    $("#en-progression").hidden = !t.reponses;
    if (t.reponses) $("#en-progression summary").textContent = `Votre progression · ${t.reponses.toLocaleString("fr-CA")} réponses, ${Math.round((t.bonnes / t.reponses) * 100)} % de réussite`;
    // Mode éditeur.
    const ed = $("#en-editeur"); ed.hidden = !editeur();
    if (editeur()) { const d = Object.values(S.decisions()); $("#en-editeur-compte").textContent = `${d.filter(x => x.statut === "validee").length} validée(s), ${d.filter(x => x.statut === "signalee").length} signalée(s), ${d.filter(x => x.statut === "remise").length} remise(s) ; les cartes expérimentales et retirées sont incluses.`; }
    compter();
  }
  async function compter() {
    const cle = regionChoisie(), p = cle ? index.paquets.filter(x => x.cle === cle) : index.paquets;
    $("#en-compte").textContent = `${p.reduce((t, x) => t + x.diagnostics, 0)} diagnostics`;
  }

  /* ---------- Partie ---------- */
  let partie = null, conf = null, carteDebut = 0, attente = null, chrono = null, verrou = false, derniere = null;
  const minuteur = { restant: 0, depuis: 0, marche: false };
  // Passage automatique : contre-la-montre seulement. Ailleurs, l'explication reste jusqu'à « Question suivante » (ou Entrée).
  const delai = juste => (juste ? J.CONFIG.delais.chronoBonne : J.CONFIG.delais.chronoErreur);

  async function demarrer(mode, options = {}) {
    let cartes, ordre = null;
    const jour = S.aujourdhui();
    try {
      if (mode === "defi") {
        const rj = regionDuJour(jour);
        const toutes = (await paquet(rj.cle)).cartes.filter(c => c.statut !== "experimentale" && !c.retrait);
        ordre = J.tirageDuJour(toutes, jour); cartes = ordre;
      } else if (options.liste) {
        cartes = options.liste; ordre = J.melanger(options.liste, Math.random);
      } else if (mode === "erreurs") {
        const ids = new Set(S.aRevoir()), toutes = await cartesDe("");
        cartes = toutes.filter(c => ids.has(c.id)); ordre = J.melanger(cartes, Math.random);
      } else cartes = await cartesDe(regionChoisie());
    } catch (e) { alert("Les cartes n'ont pas pu être chargées. Vérifiez la connexion, puis réessayez."); return; }
    if (!cartes.length) { alert("Aucune carte à jouer avec ce choix."); return; }
    conf = { mode, duree: options.duree || 0, jour, liste: options.liste || null, total: ordre ? ordre.length : 0 };
    partie = J.Partie({ mode, cartes, ordre, poids: c => J.CONFIG.poidsBoites[S.boite(c.id) - 1] * (S.vue(c.id) ? 1 : 1.5) });
    document.body.dataset.mode = mode;
    $("#en-suivante").hidden = true;
    minuteur.restant = conf.duree * 1000; minuteur.marche = false;
    montrer("partie");
    suivante();
    if (mode === "chrono") { chrono = setInterval(afficherChrono, 100); }
  }

  function afficherChrono() {
    const el = $("#en-chrono");
    if (conf.mode === "chrono") {
      const r = Math.max(0, minuteur.restant - (minuteur.marche ? performance.now() - minuteur.depuis : 0));
      el.textContent = `${Math.ceil(r / 1000)} s`;
      el.classList.toggle("en-urgent", r < 5000);
      $("#en-piste").style.width = `${(r / (conf.duree * 1000)) * 100}%`;
      if (r <= 0 && !verrou) fin();
    }
  }
  const lancerMinuteur = () => { if (conf.mode === "chrono" && !minuteur.marche) { minuteur.depuis = performance.now(); minuteur.marche = true; } };
  const arreterMinuteur = () => { if (minuteur.marche) { minuteur.restant -= performance.now() - minuteur.depuis; minuteur.marche = false; } };

  function suivante() {
    clearTimeout(attente); attente = null;
    const c = partie.prochaine();
    if (!c) { fin(); return; }
    verrou = false;
    const n = partie.resume().questions + 1;
    $("#en-position").textContent = `Question ${n}${conf.total ? ` / ${conf.total}` : ""} · ${c.region}`;
    if (conf.total) $("#en-piste").style.width = `${((n - 1) / conf.total) * 100}%`;
    else if (conf.mode !== "chrono") $("#en-piste").style.width = "0";
    $("#en-diag").textContent = c.diagnostic.nom;
    $("#en-enonce").textContent = c.enonce;
    $("#en-definition").textContent = c.definition || ""; $("#en-definition").hidden = !c.definition;
    $("#en-type").textContent = c.type;
    const d = S.decision(c.id), st = d && d.statut === "validee" ? "validee" : c.statut;
    $("#en-statut").textContent = d && d.statut === "signalee" ? "Signalée" : STATUT[st] || "";
    $("#en-statut").dataset.statut = d && d.statut === "signalee" ? "signalee" : st;
    $("#en-retour").innerHTML = ""; $("#en-retour").className = "en-retour";
    $("#en-suivante").hidden = true;
    for (const b of $$(".en-rep")) { b.disabled = false; b.className = b.className.replace(/ en-(bon|faux|eteint)/g, ""); }
    $("#en-score").textContent = partie.score.toLocaleString("fr-CA");
    $("#en-serie").textContent = `Série ${partie.serie}`;
    carteDebut = performance.now();
    lancerMinuteur();
    if (conf.mode !== "chrono") $("#en-chrono").textContent = "";
  }

  function repondre(choix) {
    if (verrou || !partie || !partie.courante) return;
    verrou = true;
    const ms = performance.now() - carteDebut, c = partie.courante;
    arreterMinuteur();   // le chrono s'arrête pendant la rétroaction
    const r = partie.repondre(choix, ms);
    S.reponse(c, r.juste, ms, conf.mode);
    derniere = { c, r, choix };
    for (const b of $$(".en-rep")) {
      b.disabled = true;
      if (b.dataset.rep === r.attendue) b.classList.add("en-bon");
      else if (b.dataset.rep === choix) b.classList.add("en-faux");
      else b.classList.add("en-eteint");
    }
    $("#en-score").textContent = r.score.toLocaleString("fr-CA");
    $("#en-serie").textContent = `Série ${r.serie}`;
    afficherRetour(c, r, choix);
    if (conf.mode === "chrono") attente = r.fini ? setTimeout(fin, delai(r.juste) + 300) : setTimeout(suivante, delai(r.juste));
    else {
      const b = $("#en-suivante");
      b.querySelector(".en-suivante-texte").textContent = r.fini ? "Voir le bilan" : "Question suivante";
      b.hidden = false; b.focus({ preventScroll: true });
    }
  }

  function donneesHtml(c) {
    const d = c.donnee || {}, l = [];
    if (d.lr_positif !== null && d.lr_positif !== undefined) l.push(["LR+", nb(d.lr_positif)]); else if (d.lr_positif_texte) l.push(["LR+", d.lr_positif_texte]);
    if (d.lr_negatif !== null && d.lr_negatif !== undefined) l.push(["LR−", nb(d.lr_negatif)]); else if (d.lr_negatif_texte) l.push(["LR−", d.lr_negatif_texte]);
    if (d.sensibilite) l.push(["Se", d.sensibilite]);
    if (d.specificite) l.push(["Sp", d.specificite]);
    if (d.odds_ratio !== null && d.odds_ratio !== undefined) l.push(["OR", nb(d.odds_ratio)]);
    const nature = `${d.nature || ""}${d.calcule ? " · calculé à partir de Se et Sp" : ""}`;
    return l.length || nature ? `<p class="en-donnees">${l.map(([k, v]) => `<span><strong>${k}</strong> ${esc(v)}</span>`).join("")}<span class="en-nature">${esc(nature)}</span></p>` : "";
  }
  function refsHtml(c) {
    return c.refs && c.refs.length ? `<ol class="en-refs">${c.refs.map(r => `<li>${esc(r.texte.replace(/\s*doi:\S+$/, ""))}${r.doi ? ` <a href="https://doi.org/${esc(r.doi)}" target="_blank" rel="noopener">doi:${esc(r.doi)}</a>` : r.url ? ` <a href="${esc(r.url)}" target="_blank" rel="noopener">lien</a>` : ""}</li>`).join("")}</ol>` : "";
  }
  function afficherRetour(c, r, choix) {
    const libre = conf.mode === "libre", el = $("#en-retour");
    const bonus = r.bonus.map(b => `${b.raison} +${b.points}`).join(" · ");
    el.className = `en-retour ${r.juste ? "en-retour-bon" : "en-retour-faux"}${libre ? " en-retour-long" : ""}`;
    el.innerHTML = `<p class="en-verdict"><span>${r.juste ? "✓ Bonne réponse" : "✕ Réponse attendue"} : ${REP[r.attendue][0]} ${REP[r.attendue][1]}</span>${r.juste ? `<span class="en-gain">+${r.points}${bonus ? ` <small>${esc(bonus)}</small>` : ""}</span>` : ""}</p>
      <p class="en-explication">${esc(c.explication)}</p>${donneesHtml(c)}
      ${c.mises_en_garde ? `<p class="en-garde">Mise en garde : ${esc(c.mises_en_garde.join(" "))}</p>` : ""}
      ${libre ? `<details class="en-sources"><summary>Références (${c.refs.length})</summary>${refsHtml(c)}</details>
        <p class="en-outils-carte"><button type="button" class="en-lien" data-favori="${esc(c.id)}">${S.favori(c.id) ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}</button></p>` : ""}
      ${editeur() ? editeurHtml(c) : ""}`;
    if (!r.juste) el.classList.add("en-secousse");
  }
  function editeurHtml(c) {
    const d = S.decision(c.id);
    return `<div class="en-ed-carte" data-carte="${esc(c.id)}"><p class="en-sur">Éditeur · ${esc(c.id)} · ${esc(c.source)}${c.a_relire ? ` · ${esc(c.a_relire)}` : ""}</p>
      ${c.pertinence !== undefined ? `<p class="en-ed-audit">Pertinence : ${esc(PERTINENCE[c.pertinence])} · Niveau : ${esc(NIVEAU[c.difficulte] || "")}${c.origine ? " · Nouvelle carte (source : " + esc(c.source) + ")" : ""}${c.enonce_source ? ` · Énoncé d'origine : « ${esc(c.enonce_source)} »` : ""}</p>` : ""}
      ${c.retrait ? `<p class="en-ed-audit en-ed-retrait">Retirée du jeu : ${esc(c.retrait)}</p>` : ""}
      <p class="en-ed-boutons"><button type="button" class="en-btn-sec" data-decider="validee" aria-pressed="${d && d.statut === "validee" ? "true" : "false"}">Valider</button><button type="button" class="en-btn-sec" data-decider="signalee" aria-pressed="${d && d.statut === "signalee" ? "true" : "false"}">Signaler</button>${c.retrait ? `<button type="button" class="en-btn-sec" data-decider="remise" aria-pressed="${d && d.statut === "remise" ? "true" : "false"}">Remettre dans le jeu</button>` : ""}</p>
      <label class="en-ed-note">Correction ou remarque <input type="text" maxlength="300" value="${esc((d && d.note) || "")}" placeholder="Ex. reformuler : « … »"></label></div>`;
  }

  function fin() {
    if (!partie) return;
    clearTimeout(attente); clearInterval(chrono); chrono = null; arreterMinuteur(); verrou = true;
    partie.terminer();
    const res = partie.resume();
    montrer("resultats");
    resultats(res);
  }

  /* ---------- Résultats ---------- */
  function resultats(res) {
    const mode = conf.mode, cleRec = mode === "chrono" ? `chrono-${conf.duree}` : mode === "serie" ? "serie" : null;
    let rec = null, lead = "";
    if (cleRec && res.questions) rec = S.proposerRecord(cleRec, mode === "serie" ? res.meilleureSerie : res.score, { bonnes: res.bonnes, questions: res.questions });
    if (mode === "defi" && res.questions) {
      const premiere = S.enregistrerDefi(conf.jour, { score: res.score, bonnes: res.bonnes, questions: res.questions, ms: res.reponses.reduce((t, r) => t + r.ms, 0) });
      lead = premiere ? "Votre résultat du jour est enregistré. Revenez demain pour un nouveau défi." : "Défi déjà fait aujourd'hui : cette partie ne remplace pas votre premier résultat.";
    }
    $("#en-res-sur").textContent = `Bilan · ${MODES[mode]}${mode === "chrono" ? ` ${conf.duree} s` : ""}`;
    $("#en-res-titre").textContent = rec && rec.nouveau && rec.ancien !== null ? "Nouveau record !" : res.questions ? "Séance terminée" : "Partie interrompue";
    if (rec) lead = rec.nouveau ? (rec.ancien === null ? "Premier record enregistré." : `Ancien record : ${rec.ancien.toLocaleString("fr-CA")}.`) : `Record personnel : ${rec.ancien.toLocaleString("fr-CA")}.`;
    if (res.erreurs.length) lead += ` ${res.erreurs.length === 1 ? "La carte manquée revient" : "Les cartes manquées reviennent"} plus souvent dans vos prochaines parties.`;
    $("#en-res-lead").textContent = lead.trim();
    document.body.classList.toggle("en-fete", !!(rec && rec.nouveau && rec.ancien !== null));
    const stats = [[res.score.toLocaleString("fr-CA"), "Score"], [`${res.pct} %`, "Réussite"], [`${res.bonnes} / ${res.questions}`, "Bonnes réponses"],
      [res.questions ? sec(res.tempsMoyenMs) : "—", "Temps moyen"], [String(res.meilleureSerie), "Meilleure série"]];
    if (rec) stats.push([(rec.nouveau ? (mode === "serie" ? res.meilleureSerie : res.score) : rec.ancien).toLocaleString("fr-CA"), "Record personnel"]);
    $("#en-stats").innerHTML = stats.map(([v, l]) => `<div class="en-stat"><span class="en-stat-val">${esc(v)}</span><span class="en-stat-lbl">${esc(l)}</span></div>`).join("");
    $("#en-revoir").disabled = !res.erreurs.length;
    $("#en-revoir").textContent = res.erreurs.length ? `Revoir les ${res.erreurs.length > 1 ? `${res.erreurs.length} erreurs` : "erreurs"}` : "Aucune erreur";
    $("#en-erreurs").innerHTML = res.erreurs.length ? `<h3>Cartes manquées</h3>${res.erreurs.map(c => {
      const choix = res.reponses.find(r => r.id === c.id && !r.juste).choix;
      return `<details class="en-erreur"><summary><span class="en-erreur-diag">${esc(c.diagnostic.nom)}</span> ${esc(c.enonce)} <span class="en-erreur-rep">${REP[c.reponse][0]} ${REP[c.reponse][1]} <small>(vous : ${REP[choix][1].toLowerCase()})</small></span></summary>
        <p class="en-explication">${esc(c.explication)}</p>${donneesHtml(c)}${refsHtml(c)}</details>`; }).join("")}` : "";
    resultats.dernier = res;
    $("#en-rejouer").focus({ preventScroll: true });
  }

  /* ---------- Événements ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest("button");
    if (!t) { if (e.target.closest("#en-retour") && attente && conf && conf.mode === "chrono") { clearTimeout(attente); partie.finie ? fin() : suivante(); } return; }
    if (t.dataset.mode && !t.disabled) { demarrer(t.dataset.mode, { duree: +t.dataset.duree || 0 }); return; }
    if (t.dataset.rep) { repondre(t.dataset.rep); return; }
    if (t.id === "en-suivante") { partie.finie ? fin() : suivante(); return; }
    if (t.id === "en-quitter") { fin(); return; }
    if (t.id === "en-rejouer") { demarrer(conf.mode, { duree: conf.duree, liste: conf.liste }); return; }
    if (t.id === "en-revoir") { const l = resultats.dernier.erreurs; if (l.length) demarrer("erreurs", { liste: l }); return; }
    if (t.id === "en-changer") { document.body.classList.remove("en-fete"); montrer("accueil"); accueil(); return; }
    if (t.dataset.favori) { const on = S.basculerFavori(t.dataset.favori); t.textContent = on ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"; return; }
    if (t.dataset.decider) {
      const bloc = t.closest(".en-ed-carte"), id = bloc.dataset.carte, deja = (S.decision(id) || {}).statut === t.dataset.decider;
      S.decider(id, deja ? null : t.dataset.decider, bloc.querySelector("input").value.trim());
      for (const b of bloc.querySelectorAll("[data-decider]")) b.setAttribute("aria-pressed", !deja && b === t ? "true" : "false");
      clearTimeout(attente); $("#en-suivante").hidden = false;   // l'éditeur avance lui-même
      return;
    }
    if (t.id === "en-exporter") { exporter(); return; }
    if (t.id === "en-editeur-quitter") { S.definirPref("editeur", false); accueil(); }
  });
  // Éditeur : taper une remarque arrête le passage automatique ; la remarque est gardée avec la décision.
  document.addEventListener("input", e => {
    const bloc = e.target.closest(".en-ed-carte"); if (!bloc) return;
    clearTimeout(attente); $("#en-suivante").hidden = false;
    const d = S.decision(bloc.dataset.carte); if (d) S.decider(bloc.dataset.carte, d.statut, e.target.value.trim());
  });
  $("#en-region").addEventListener("change", () => { S.definirPref("region", regionChoisie()); compter(); });

  document.addEventListener("keydown", e => {
    if (e.target.closest("input, select, textarea") || e.altKey || e.ctrlKey || e.metaKey) return;
    if (!ecrans.partie.hidden) {
      const k = { 1: "increase", 2: "neutral", 3: "decrease", ArrowUp: "increase", ArrowRight: "neutral", ArrowLeft: "neutral", ArrowDown: "decrease" }[e.key];
      if (k && !verrou) { e.preventDefault(); repondre(k); return; }
      if ((e.key === "Enter" || e.key === " ") && verrou && !e.target.closest("button")) { e.preventDefault(); clearTimeout(attente); partie.finie ? fin() : suivante(); return; }
      if (e.key === "Escape") { fin(); }
    }
  });
  // Interruption : onglet quitté pendant une partie chronométrée → chrono et passage automatique en pause.
  document.addEventListener("visibilitychange", () => {
    if (!partie || ecrans.partie.hidden) return;
    if (document.hidden) { arreterMinuteur(); if (attente) { clearTimeout(attente); attente = "pause"; } }
    else if (attente === "pause") { attente = setTimeout(() => (partie.finie ? fin() : suivante()), 400); }
    else if (!verrou) { carteDebut = performance.now(); lancerMinuteur(); }
  });

  function exporter() {
    const d = { outil: "Morand — Entraînement clinique", exporte_le: new Date().toISOString(), decisions: S.decisions() };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(d, null, 1)], { type: "application/json" }));
    a.download = `entrainement-decisions-${S.aujourdhui()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ---------- Départ ---------- */
  charger("/entrainement/banque/index.json").then(i => { index = i; accueil(); montrer("accueil"); },
    () => { $("#en-compte").textContent = "Les cartes n'ont pas pu être chargées."; });
})();
