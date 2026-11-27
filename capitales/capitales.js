/* Morand : quiz des capitales du monde (page cachée). Trois modes : pratique libre, contre-la-montre, série sans faute.
   Réponse en choix multiples ou tapée. Indices à la demande : première lettre, truc mnémotechnique, fait connu ; un de chaque
   sorte par partie (illimités en pratique libre). Données : /capitales/pays.json (produit par outils/capitales/pays.py). */
(function () {
  "use strict";
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const melanger = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const MODES = { libre: "Pratique libre", chrono: "Contre-la-montre", serie: "Série sans faute" };
  const SORTES = { lettre: "Première lettre", memo: "Truc mnémotechnique", fait: "Fait connu" };

  /* ---------- Records (stockage local, facultatif) ---------- */
  const CLE = "morand-capitales-v1";
  const lire = () => { try { return JSON.parse(localStorage.getItem(CLE)) || { records: {} }; } catch (e) { return { records: {} }; } };
  const ecrire = m => { try { localStorage.setItem(CLE, JSON.stringify(m)); } catch (e) { /* navigation privée */ } };

  /* ---------- Comparaison des réponses tapées ---------- */
  const normaliser = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[ʻ’'`´]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim().replace(/^(la|le|les|l) /, "").replace(/\bste\b/g, "sainte").replace(/\bst\b/g, "saint");
  function distance(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  const formes = p => [...p.capitales, ...p.aussi].map(normaliser);
  function juger(p, reponse) {
    const r = normaliser(reponse); if (!r) return { ok: false };
    for (const f of formes(p)) if (f === r) return { ok: true, exact: true };
    for (const f of formes(p)) { const tol = f.length >= 9 ? 2 : f.length >= 5 ? 1 : 0; if (tol && distance(f, r) <= tol) return { ok: true, exact: false }; }
    return { ok: false };
  }

  /* ---------- État ---------- */
  let PAYS = [], partie = null, chronoId = null, attente = null;
  const reglage = () => ({ reponse: ($("input[name=cp-reponse]:checked") || {}).value || "choix", continent: $("#cp-continent").value });
  const cleRecord = (mode, r, duree) => [mode, r.reponse, r.continent || "tous", duree || ""].join("|");

  fetch("/capitales/pays.json", { cache: "no-cache" }).then(x => { if (!x.ok) throw new Error(x.status); return x.json(); }).then(d => {
    PAYS = d;
    const n = {}; for (const p of PAYS) n[p.continent] = (n[p.continent] || 0) + 1;
    $("#cp-continent").innerHTML = `<option value="">Tous les pays (${PAYS.length})</option>` + Object.keys(n).sort((a, b) => a.localeCompare(b, "fr")).map(c => `<option value="${esc(c)}">${esc(c)} (${n[c]})</option>`).join("");
    afficherRecords();
  }).catch(() => { $("#cp-chargement").textContent = "Les pays n'ont pas pu être chargés. Rechargez la page."; });

  function afficherRecords() {
    const r = reglage(), rec = lire().records;
    const ch = [60, 120, 300].map(d => rec[cleRecord("chrono", r, d)] !== undefined ? `${d < 120 ? "1 min" : d / 60 + " min"} : ${rec[cleRecord("chrono", r, d)]}` : "").filter(Boolean);
    $("[data-record=chrono]").textContent = ch.length ? "Records · " + ch.join(" · ") : "";
    const s = rec[cleRecord("serie", r)]; $("[data-record=serie]").textContent = s !== undefined ? `Record : ${s} de suite` : "";
    const l = rec[cleRecord("libre", r)]; $("[data-record=libre]").textContent = l !== undefined ? `Pays réussis au total : ${l}` : "";
  }
  $("#cp-continent").addEventListener("change", afficherRecords);
  $$("input[name=cp-reponse]").forEach(x => x.addEventListener("change", afficherRecords));

  /* ---------- Démarrer ---------- */
  $$("[data-mode]").forEach(b => b.addEventListener("click", () => demarrer(b.dataset.mode, Number(b.dataset.duree) || 0)));
  function demarrer(mode, duree) {
    if (!PAYS.length) return;
    const r = reglage(), liste = PAYS.filter(p => !r.continent || p.continent === r.continent);
    partie = { mode, duree, reglage: r, liste, paquet: melanger(liste), i: -1, bonnes: 0, repondues: 0, serie: 0, erreurs: [],
      jetons: { lettre: 1, memo: 1, fait: 1 }, fin: 0, finie: false, courant: null, revele: {}, repondu: false };
    $("#cp-accueil").hidden = true; $("#cp-fin").hidden = true; $("#cp-partie").hidden = false;
    $("#cp-choix").hidden = r.reponse !== "choix"; $("#cp-form").hidden = r.reponse !== "tape";
    $("#cp-chrono").hidden = mode !== "chrono";
    $("[data-indice=lettre]").hidden = r.reponse === "choix";   // en choix multiples, la première lettre donnerait la réponse
    if (mode === "chrono") { partie.fin = Date.now() + duree * 1000; tic(); chronoId = setInterval(tic, 250); }
    suivante();
  }
  function tic() {
    if (!partie || partie.mode !== "chrono") return;
    const reste = Math.max(0, Math.ceil((partie.fin - Date.now()) / 1000));
    $("#cp-chrono").textContent = `${Math.floor(reste / 60)}:${String(reste % 60).padStart(2, "0")}`;
    $("#cp-chrono").classList.toggle("cp-urgent", reste <= 10);
    if (reste <= 0) terminer();
  }

  /* ---------- Question ---------- */
  function suivante() {
    clearTimeout(attente);
    if (!partie || partie.finie) return;
    partie.i++;
    if (partie.i >= partie.paquet.length) {
      if (partie.mode === "serie") return terminer(true);
      partie.paquet = melanger(partie.liste); partie.i = 0;
    }
    const p = partie.paquet[partie.i]; partie.courant = p; partie.revele = {}; partie.repondu = false;
    $("#cp-pays").textContent = p.pays;
    $("#cp-indices").innerHTML = "";
    $("#cp-retour").hidden = true;
    majEtat(); majIndices();
    if (partie.reglage.reponse === "choix") proposerChoix(p);
    else { const q = $("#cp-q"); q.value = ""; q.disabled = false; $("#cp-valider").disabled = false; $("#cp-passer").disabled = false; q.focus(); }
  }
  function majEtat() {
    const t = partie.mode === "libre" ? `${partie.bonnes} / ${partie.repondues} réussis`
      : partie.mode === "serie" ? `Série : ${partie.serie} · pays ${partie.i + 1} sur ${partie.paquet.length}` : `${partie.bonnes} bonne${partie.bonnes > 1 ? "s" : ""} réponse${partie.bonnes > 1 ? "s" : ""}`;
    $("#cp-etat").textContent = `${MODES[partie.mode]} · ${t}`;
  }
  function proposerChoix(p) {
    const bon = new Set(formes(p));
    const voisin = c => { const n = normaliser(c); return [...bon].some(f => f === n || f.includes(n) || n.includes(f)); };
    const prendre = l => melanger(l.filter(x => x !== p).map(x => x.capitales[0])).filter((c, k, a) => !voisin(c) && a.indexOf(c) === k);
    let leurres = prendre(PAYS.filter(x => x.continent === p.continent));
    if (leurres.length < 3) leurres = leurres.concat(prendre(PAYS).filter(c => !leurres.includes(c)));
    const options = melanger([p.capitales[0], ...leurres.slice(0, 3)]);
    $("#cp-choix").innerHTML = options.map((c, k) => `<button type="button" class="cp-option" data-c="${esc(c)}"><span class="cp-touche" aria-hidden="true">${k + 1}</span>${esc(c)}</button>`).join("");
    $$("#cp-choix .cp-option").forEach(b => b.addEventListener("click", () => repondre(b.dataset.c, b)));
  }

  /* ---------- Indices ---------- */
  const illimite = () => partie.mode === "libre";
  function majIndices() {
    for (const s of Object.keys(SORTES)) {
      const b = $(`[data-indice=${s}]`), deja = !!partie.revele[s], plus = illimite() || partie.jetons[s] > 0;
      b.disabled = deja || !plus || partie.repondu;
      $(`[data-reste=${s}]`).textContent = illimite() ? "" : partie.jetons[s] > 0 ? "· 1 restant" : "· utilisé";
    }
  }
  function texteIndice(p, s) {
    if (s === "lettre") { const c = p.capitales[0], lettres = c.replace(/[^\p{L}]/gu, "").length; return `${p.capitales.length > 1 ? "Une des réponses commence" : "Commence"} par « ${c[0].toUpperCase()} » (${lettres} lettres).`; }
    return masquer(p, s === "memo" ? p.memo : p.fait);
  }
  // Avant la réponse, le nom de la capitale est caché dans le truc et le fait (« Chypre : …, la ville coupée en deux »).
  function masquer(p, t) {
    const noms = [...p.capitales, ...p.aussi].filter(n => n.length > 1).sort((a, b) => b.length - a.length)
      .map(n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[-\s]/g, "[-\\s]"));
    if (!noms.length) return t;
    const pays = p.pays.replace(/ \(.*\)$/, ""), garde = t.split(pays);   // le nom du pays reste visible (Guinée-Bissau, Djibouti…)
    return garde.map(x => x.replace(new RegExp(`(?<!\\p{L})(?:${noms.join("|")})(?!\\p{L})`, "giu"), "…")).join(pays);
  }
  $$("[data-indice]").forEach(b => b.addEventListener("click", () => {
    const s = b.dataset.indice; if (!partie || partie.repondu || partie.revele[s]) return;
    if (!illimite()) { if (partie.jetons[s] <= 0) return; partie.jetons[s]--; }
    partie.revele[s] = true;
    $("#cp-indices").insertAdjacentHTML("beforeend", `<li class="ml-indice"><b>${esc(SORTES[s])} :</b> ${esc(texteIndice(partie.courant, s))}</li>`);
    majIndices();
  }));

  /* ---------- Réponse ---------- */
  $("#cp-form").addEventListener("submit", e => {
    e.preventDefault(); if (!partie || partie.repondu) return;
    if (!$("#cp-q").value.trim()) { $("#cp-q").focus(); return; }   // Entrée sur un champ vide : rien (« Passer » sert à passer)
    repondre($("#cp-q").value);
  });
  $("#cp-passer").addEventListener("click", () => { if (partie && !partie.repondu) repondre(""); });
  function repondre(reponse, bouton) {
    if (!partie || partie.repondu || partie.finie) return;
    const p = partie.courant;
    const j = partie.reglage.reponse === "choix" ? { ok: formes(p).includes(normaliser(reponse)), exact: true } : juger(p, reponse);
    partie.repondu = true; partie.repondues++;
    if (j.ok) { partie.bonnes++; partie.serie++; } else partie.erreurs.push({ pays: p.pays, capitales: p.capitales, donne: reponse });
    // Retour visuel.
    if (partie.reglage.reponse === "choix") $$("#cp-choix .cp-option").forEach(b => {
      b.disabled = true; if (formes(p).includes(normaliser(b.dataset.c))) b.classList.add("cp-bon"); else if (b === bouton) b.classList.add("cp-faux");
    });
    else { $("#cp-q").disabled = true; $("#cp-valider").disabled = true; $("#cp-passer").disabled = true; }
    const bonne = p.capitales.length > 1 ? p.capitales.join(", ") : p.capitales[0];
    $("#cp-verdict").textContent = j.ok ? (j.exact ? "Bonne réponse !" : `Bonne réponse ! (on écrit : ${p.capitales.find(c => distance(normaliser(c), normaliser(reponse)) <= 2) || p.capitales[0]})`) : reponse.trim() ? "Ce n'est pas ça." : "Passé.";
    $("#cp-verdict").className = "cp-verdict " + (j.ok ? "cp-ok" : "cp-non");
    $("#cp-bonne").innerHTML = `${esc(p.pays)} : <b>${esc(bonne)}</b>`;
    $("#cp-note").textContent = p.note; $("#cp-note").hidden = !p.note;
    $("#cp-fait").textContent = p.fait;
    $("#cp-retour").hidden = false;
    majEtat(); majIndices();
    if (partie.mode === "serie" && !j.ok) { $("#cp-suivante").textContent = "Voir le résultat"; $("#cp-suivante").focus(); return; }
    $("#cp-suivante").textContent = "Question suivante";
    if (partie.mode === "chrono") attente = setTimeout(suivante, j.ok ? 700 : 1800);
    else $("#cp-suivante").focus();
  }
  $("#cp-suivante").addEventListener("click", () => {
    if (!partie) return;
    if (partie.mode === "serie" && partie.erreurs.length) return terminer();
    suivante();
  });

  /* ---------- Clavier ---------- */
  document.addEventListener("keydown", e => {
    if (!partie || partie.finie || $("#cp-partie").hidden || e.altKey || e.ctrlKey || e.metaKey) return;
    if (partie.repondu && e.key === "Enter") { e.preventDefault(); $("#cp-suivante").click(); return; }
    if (!partie.repondu && partie.reglage.reponse === "choix" && /^[1-4]$/.test(e.key)) { const b = $$("#cp-choix .cp-option")[Number(e.key) - 1]; if (b) b.click(); }
  });

  /* ---------- Fin ---------- */
  $("#cp-terminer").addEventListener("click", () => terminer());
  function terminer(tout) {
    if (!partie || partie.finie) return;
    partie.finie = true; clearInterval(chronoId); clearTimeout(attente);
    const m = lire(), r = partie.reglage, cle = cleRecord(partie.mode, r, partie.duree);
    let titre, score, record = "";
    if (partie.mode === "chrono") {
      titre = "Temps écoulé !"; score = `${partie.bonnes} bonne${partie.bonnes > 1 ? "s" : ""} réponse${partie.bonnes > 1 ? "s" : ""} sur ${partie.repondues}`;
      if (m.records[cle] === undefined || partie.bonnes > m.records[cle]) { if (m.records[cle] !== undefined || partie.bonnes) record = "Nouveau record !"; m.records[cle] = partie.bonnes; }
      else record = `Record : ${m.records[cle]}`;
    } else if (partie.mode === "serie") {
      titre = tout ? "Sans faute : tous les pays !" : "Fin de la série"; score = `${partie.serie} capitale${partie.serie > 1 ? "s" : ""} de suite`;
      if (m.records[cle] === undefined || partie.serie > m.records[cle]) { if (partie.serie) record = "Nouveau record !"; m.records[cle] = partie.serie; }
      else record = `Record : ${m.records[cle]}`;
    } else {
      titre = "Fin de la pratique"; score = `${partie.bonnes} réussi${partie.bonnes > 1 ? "s" : ""} sur ${partie.repondues}`;
      m.records[cle] = (m.records[cle] || 0) + partie.bonnes;
    }
    ecrire(m);
    $("#cp-partie").hidden = true; $("#cp-fin").hidden = false;
    $("#cp-fin-titre").textContent = titre; $("#cp-fin-score").textContent = score; $("#cp-fin-record").textContent = record;
    const err = partie.erreurs;
    $("#cp-erreurs").innerHTML = err.length ? `<h3>À revoir</h3><ul>${err.map(x => `<li><span>${esc(x.pays)}</span><b>${esc(x.capitales.join(", "))}</b></li>`).join("")}</ul>` : "";
    $("#cp-fin-titre").focus();
  }
  $("#cp-rejouer").addEventListener("click", () => partie && demarrer(partie.mode, partie.duree));
  $("#cp-accueil-btn").addEventListener("click", () => { partie = null; $("#cp-fin").hidden = true; $("#cp-partie").hidden = true; $("#cp-accueil").hidden = false; afficherRecords(); });
})();
