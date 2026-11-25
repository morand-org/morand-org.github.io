/* MSK Morand : Morandle, un cas par jour. Six indices ; chaque essai faux, ou « Passer », révèle le suivant. La réponse se
   choisit dans la liste des fiches résumées ; une réponse fausse de la bonne région s'affiche en doré. Les parties et les
   statistiques restent sur l'appareil (stockage local). Données : donnees.json (outils/locomoteur/morandle.mjs).
     ?n=12        rejouer le cas n° 12 (cas précédents)
     ?editeur=1   mode éditeur (tous les cas, validation, export) ; ?editeur=0 pour en sortir ; ?cas=G4 pour jouer un cas */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const pad = n => String(n).padStart(2, "0");
  const jourLocal = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const utc = j => { const [a, m, d] = j.split("-").map(Number); return Date.UTC(a, m - 1, d); };
  const dateDu = (debut, n) => { const d = new Date(utc(debut) + (n - 1) * 864e5); return d.toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }); };
  const lireLS = (k, defaut) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : defaut; } catch (e) { return defaut; } };
  const ecrireLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible : la partie reste en mémoire */ } };
  const CLE = "morandle-v2", CLE_ED = "morandle-editeur", CLE_DEC = "morandle-decisions";
  const CARRE = { passe: "⬜", faux: "🟥", region: "🟨", bon: "🟩" };

  const params = new URLSearchParams(location.search);
  if (params.has("editeur")) { if (params.get("editeur") === "0") ecrireLS(CLE_ED, false); else ecrireLS(CLE_ED, true); }
  const editeur = lireLS(CLE_ED, false) === true;

  let D, cas, numero, cle, partie, diag, actif = -1, jour = 0;
  // v1 (25 novembre 2026, premier jour) : le cas du jour était le n° 1 ; depuis l'ajout des 12 cas d'archives, c'est le n° 13.
  const renumeroter = (m, k) => {
    const parties = {};
    for (const [c, p] of Object.entries(m.parties || {})) parties[/^n\d+$/.test(c) ? `n${+c.slice(1) + k}` : c] = p;
    const s = m.stats ? { ...m.stats, comptes: (m.stats.comptes || []).map(n => n + k), dernier: m.stats.dernier ? m.stats.dernier + k : 0 } : null;
    return { parties, stats: s };
  };
  let memoire = lireLS(CLE, null);
  if (!memoire) { const v1 = lireLS("morandle-v1", null); memoire = v1 ? renumeroter(v1, 12) : { parties: {}, stats: null }; if (v1) ecrireLS(CLE, memoire); }

  fetch("/locomoteur/morandle/donnees.json", { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    D = d; diag = new Map(D.diagnostics.map(x => [norm(x.n), x]));
    const jouables = D.cas.filter(c => c.statut !== "retiree");
    const aujourdhui = Math.max(1, Math.round((utc(jourLocal()) - utc(D.debut)) / 864e5) + 1); jour = aujourdhui;
    const n = parseInt(params.get("n"), 10), code = params.get("cas");
    if (editeur && code && D.cas.some(c => c.code === code)) { cas = D.cas.find(c => c.code === code); numero = null; cle = `cas-${code}`; }
    else { numero = n >= 1 && n <= aujourdhui ? n : aujourdhui; cas = jouables[(numero - 1) % jouables.length]; cle = `n${numero}`; }
    partie = memoire.parties[cle] || { essais: [], fini: false, gagne: false };
    $("#ml-numero").textContent = numero ? `Cas n° ${numero} · ${dateDu(D.debut, numero)}${numero < aujourdhui ? " (cas précédent)" : ""}` : `Cas ${cas.code} (mode éditeur)`;
    const st = $("#ml-statut"); st.hidden = cas.statut === "validee"; st.textContent = cas.statut === "retiree" ? "Retiré" : "En révision";
    archives(aujourdhui); rendre(); stats();
    if (editeur) editeurRendre();
  }).catch(() => { $("#ml-numero").textContent = "Le cas n'a pas pu être chargé. Vérifiez la connexion, puis rechargez la page."; });

  /* ---------- Partie ---------- */
  function rendre() {
    const vus = partie.fini ? 6 : Math.min(6, partie.essais.length + 1), ol = $("#ml-indices");
    ol.textContent = "";
    cas.indices.forEach((t, i) => {
      const li = el("li", i < vus ? "ml-indice" : "ml-indice ml-cache");
      if (i < vus) li.textContent = t; else { li.setAttribute("aria-label", `Indice ${i + 1}, pas encore révélé`); }
      ol.appendChild(li);
    });
    const es = $("#ml-essais"); es.textContent = "";
    partie.essais.forEach((e, i) => {
      const li = el("li", `ml-essai ml-${e.t}`), no = el("span", "ml-essai-no", String(i + 1));
      const t = el("span", "ml-essai-t", e.t === "passe" ? "Passé" : e.n);
      const m = el("span", "ml-essai-m", e.t === "bon" ? "✓ Bonne réponse" : e.t === "region" ? "Bonne région" : e.t === "faux" ? "✕" : "—");
      li.append(no, t, m); es.appendChild(li);
    });
    const fini = partie.fini;
    $("#ml-form").hidden = fini; $("#ml-fin").hidden = !fini;
    if (fini) fin();
    bouton();
  }
  function bouton() { $("#ml-bouton").textContent = $("#ml-q").value.trim() ? "Soumettre" : "Passer"; }
  function sauver() { memoire.parties[cle] = partie; ecrireLS(CLE, memoire); }

  $("#ml-form").addEventListener("submit", e => {
    e.preventDefault();
    if (!cas || partie.fini) return;
    const q = $("#ml-q"), v = q.value.trim(), msg = $("#ml-message");
    if (!$("#ml-liste").hidden && actif >= 0) { choisir(actif); return; }
    msg.textContent = "";
    if (!v) partie.essais.push({ t: "passe" });
    else {
      const d = diag.get(norm(v));
      if (!d) { msg.textContent = "Choisissez un diagnostic dans la liste, ou laissez le champ vide pour passer."; return; }
      if (partie.essais.some(x => x.c === d.c)) { msg.textContent = "Vous avez déjà essayé ce diagnostic."; return; }
      const bon = cas.accepte.includes(d.c);
      partie.essais.push({ t: bon ? "bon" : d.r === cas.r ? "region" : "faux", c: d.c, n: d.n });
      if (bon) { partie.fini = true; partie.gagne = true; }
    }
    if (!partie.fini && partie.essais.length >= 6) partie.fini = true;
    q.value = ""; fermer(); sauver();
    if (partie.fini && numero) compter();
    rendre(); stats();
    if (!partie.fini) q.focus(); else $("#ml-verdict").focus({ preventScroll: false });
  });

  /* ---------- Liste des diagnostics (combobox) ---------- */
  const liste = $("#ml-liste"), champ = $("#ml-q");
  let resultats = [];
  function fermer() { liste.hidden = true; liste.textContent = ""; actif = -1; champ.setAttribute("aria-expanded", "false"); champ.removeAttribute("aria-activedescendant"); }
  function choisir(i) { champ.value = resultats[i].n; fermer(); bouton(); champ.focus(); }
  function surligner(i) {
    actif = i;
    [...liste.children].forEach((li, k) => li.setAttribute("aria-selected", k === i ? "true" : "false"));
    if (i >= 0) { champ.setAttribute("aria-activedescendant", `ml-opt-${i}`); liste.children[i].scrollIntoView({ block: "nearest" }); }
  }
  champ.addEventListener("input", () => {
    bouton(); $("#ml-message").textContent = "";
    const q = norm(champ.value);
    if (q.length < 2 || !D) return fermer();
    const mots = q.split(" ");
    resultats = D.diagnostics.filter(d => { const n = norm(d.n); return mots.every(m => n.includes(m)); })
      .sort((a, b) => (norm(a.n).startsWith(q) ? 0 : 1) - (norm(b.n).startsWith(q) ? 0 : 1) || a.n.localeCompare(b.n, "fr")).slice(0, 8);
    liste.textContent = "";
    if (!resultats.length) return fermer();
    resultats.forEach((d, i) => { const li = el("li", "ml-option", d.n); li.id = `ml-opt-${i}`; li.setAttribute("role", "option"); li.setAttribute("aria-selected", "false");
      li.appendChild(el("span", "ml-option-r", D.regions[d.r] || d.r)); li.addEventListener("mousedown", ev => { ev.preventDefault(); choisir(i); }); liste.appendChild(li); });
    liste.hidden = false; champ.setAttribute("aria-expanded", "true"); actif = -1;
  });
  champ.addEventListener("keydown", e => {
    if (liste.hidden) return;
    if (e.key === "ArrowDown") { e.preventDefault(); surligner(Math.min(resultats.length - 1, actif + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); surligner(Math.max(0, actif - 1)); }
    else if (e.key === "Escape") { e.preventDefault(); fermer(); }
  });
  champ.addEventListener("blur", () => setTimeout(fermer, 120));

  /* ---------- Fin de partie ---------- */
  function carres() { return partie.essais.map(e => CARRE[e.t]).join(""); }
  function fin() {
    const k = partie.essais.length;
    $("#ml-verdict").textContent = partie.gagne ? `Trouvé avec ${k} indice${k > 1 ? "s" : ""} !` : "Pas cette fois.";
    $("#ml-verdict").tabIndex = -1;
    $("#ml-reponse").textContent = `Réponse : ${cas.nom} (${D.regions[cas.r] || cas.r})`;
    $("#ml-carres").textContent = carres();
    const liens = $("#ml-liens"); liens.textContent = "";
    const a = el("a", "lo-lien", "Fiche résumée"); a.href = cas.fiche; liens.appendChild(a);
    if (cas.patient) { const p = el("a", "lo-lien", "Fiche patient (PDF)"); p.href = cas.patient.u; liens.appendChild(p); }
    const ex = $("#ml-explication"); ex.textContent = "";
    for (const [t, x] of [["Présentation clinique", cas.presentation], ["Examen physique", cas.examen]]) if (x) { ex.append(el("h3", null, t), el("p", null, x)); }
    $("#ml-demain").textContent = numero ? "Un nouveau cas chaque jour, à minuit." : "";
  }
  $("#ml-partager").addEventListener("click", () => {
    const k = partie.gagne ? partie.essais.length : "X";
    const texte = `Morandle${numero ? ` n° ${numero}` : ""} : ${k}/6\n${carres()}\nhttps://www.morand.org/locomoteur/morandle/`;
    const ok = () => { $("#ml-copie").textContent = "Copié !"; setTimeout(() => { $("#ml-copie").textContent = ""; }, 2500); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texte).then(ok, () => { $("#ml-copie").textContent = texte; });
    else $("#ml-copie").textContent = texte;
  });

  /* ---------- Statistiques (une fois par cas ; la série ne compte que les cas du jour, jours consécutifs) ---------- */
  function compter() {
    const s = memoire.stats || { joues: 0, gagnes: 0, serie: 0, meilleure: 0, dernier: 0, dist: [0, 0, 0, 0, 0, 0, 0], comptes: [] };
    if (s.comptes.includes(numero)) return;
    s.comptes.push(numero); s.joues++;
    const duJour = numero === jour;
    if (partie.gagne) { s.gagnes++; s.dist[partie.essais.length - 1]++; if (duJour) { s.serie = s.dernier === numero - 1 ? s.serie + 1 : 1; s.dernier = numero; } }
    else { s.dist[6]++; if (duJour) s.serie = 0; }
    s.meilleure = Math.max(s.meilleure, s.serie);
    memoire.stats = s; ecrireLS(CLE, memoire);
  }
  function stats() {
    const s = memoire.stats;
    $("#ml-stats").hidden = !s || !s.joues;
    if (!s || !s.joues) return;
    const dl = $("#ml-chiffres"); dl.textContent = "";
    for (const [v, t] of [[s.joues, "Cas joués"], [`${Math.round((s.gagnes / s.joues) * 100)} %`, "Réussite"], [s.serie, "Série actuelle"], [s.meilleure, "Meilleure série"]]) {
      const d = el("div"); d.append(el("dt", null, t), el("dd", null, String(v))); dl.appendChild(d);
    }
    const ol = $("#ml-distribution"), max = Math.max(1, ...s.dist); ol.textContent = "";
    s.dist.forEach((v, i) => {
      const li = el("li"), barre = el("span", "ml-barre"), plein = el("span", "ml-barre-plein");
      plein.style.width = v ? `${Math.max(6, (v / max) * 100)}%` : "0"; barre.appendChild(plein);
      li.append(el("span", "ml-dist-k", i < 6 ? String(i + 1) : "✕"), barre, el("span", "ml-dist-v", String(v))); ol.appendChild(li);
    });
  }

  /* ---------- Cas précédents ---------- */
  function archives(aujourdhui) {
    const ul = $("#ml-archives-liste"); ul.textContent = "";
    $("#ml-archives summary h2").textContent = aujourdhui > 1 ? `Cas précédents (${aujourdhui - 1})` : "Cas précédents";
    if (aujourdhui <= 1) { ul.appendChild(el("li", "ml-vide", "Aucun cas précédent pour l'instant : revenez demain.")); return; }
    for (let k = aujourdhui - 1; k >= Math.max(1, aujourdhui - 60); k--) {
      const p = memoire.parties[`n${k}`], li = el("li"), a = el("a", null, `Cas n° ${k} · ${dateDu(D.debut, k)}`); a.href = `?n=${k}`;
      li.append(a, el("span", "ml-arch-etat", p && p.fini ? (p.gagne ? `✓ ${p.essais.length}/6` : "✕") : "à jouer")); ul.appendChild(li);
    }
  }

  /* ---------- Mode éditeur ---------- */
  function editeurRendre() {
    $("#ml-editeur").hidden = false;
    const dec = lireLS(CLE_DEC, {}), ol = $("#ml-editeur-liste"); ol.textContent = "";
    D.cas.forEach(c => {
      const li = el("li", "ml-ed-cas"), d = dec[c.code];
      const h = el("h3"); const a = el("a", null, `${c.code} · ${c.nom}`); a.href = `?cas=${encodeURIComponent(c.code)}`; h.append(a, el("span", "ml-ed-r", D.regions[c.r] || c.r));
      const ind = el("ol", "ml-ed-indices"); c.indices.forEach(t => ind.appendChild(el("li", null, t)));
      const bts = el("p", "ml-ed-boutons");
      for (const [s, t] of [["validee", "Valider"], ["signalee", "Signaler"]]) { const b = el("button", "ml-btn-sec", t); b.type = "button"; b.dataset.code = c.code; b.dataset.statut = s; b.setAttribute("aria-pressed", d && d.statut === s ? "true" : "false"); bts.appendChild(b); }
      const lab = el("label", "ml-ed-note", "Remarque "), inp = el("input"); inp.type = "text"; inp.maxLength = 300; inp.value = (d && d.note) || ""; inp.dataset.code = c.code; lab.appendChild(inp);
      li.append(h, ind, bts, lab); ol.appendChild(li);
    });
    compte();
  }
  function compte() { const d = Object.values(lireLS(CLE_DEC, {})); $("#ml-editeur-compte").textContent = ` ${d.filter(x => x.statut === "validee").length} validé(s), ${d.filter(x => x.statut === "signalee").length} signalé(s) sur ${D.cas.length}`; }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-statut]"); if (!b) return;
    const dec = lireLS(CLE_DEC, {}), code = b.dataset.code, deja = dec[code] && dec[code].statut === b.dataset.statut;
    const note = (document.querySelector(`.ml-ed-note input[data-code="${CSS.escape(code)}"]`) || {}).value || "";
    if (deja) delete dec[code]; else dec[code] = { statut: b.dataset.statut, date: jourLocal(), ...(note ? { note } : {}) };
    ecrireLS(CLE_DEC, dec);
    b.parentNode.querySelectorAll("[data-statut]").forEach(x => x.setAttribute("aria-pressed", !deja && x === b ? "true" : "false"));
    compte();
  });
  document.addEventListener("input", e => {
    const i = e.target.closest(".ml-ed-note input"); if (!i) return;
    const dec = lireLS(CLE_DEC, {}); if (!dec[i.dataset.code]) return;
    dec[i.dataset.code].note = i.value.trim(); ecrireLS(CLE_DEC, dec);
  });
  $("#ml-exporter").addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ outil: "Morandle", exporte_le: new Date().toISOString(), decisions: lireLS(CLE_DEC, {}) }, null, 1)], { type: "application/json" }));
    a.download = `morandle-decisions-${jourLocal()}.json`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
})();
