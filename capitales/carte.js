/* Morand : capitales, jeu « Punaise sur la carte » (bêta). 10 pays ; on plante une punaise, puis le score dépend de la
   distance à la capitale (5 000 × e^(−d / 1 492,7 km), comme le barème mondial de GeoGuessr). Facile : le pays est coloré
   en or ; difficile : contours seulement. Carte : /capitales/carte.json (produit par outils/capitales/carte.py). */
(function () {
  "use strict";
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const NS = "http://www.w3.org/2000/svg";
  const el = (n, a) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const melanger = l => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nombre = n => Math.round(n).toLocaleString("fr-CA");
  const MANCHES = 10, MAX = 5000;
  const CLE = "morand-capitales-v1";
  const lire = () => { try { return JSON.parse(localStorage.getItem(CLE)) || { records: {} }; } catch (e) { return { records: {} }; } };
  const ecrire = m => { try { localStorage.setItem(CLE, JSON.stringify(m)); } catch (e) { /* navigation privée */ } };

  let CARTE = null, PAYS = null, partie = null, vb = null, cadre = null, punaise = null;
  const svg = $("#cp-svg");
  if (!svg) return;

  /* ---------- Géographie ---------- */
  const versXY = (lat, lon) => [(lon + 180) / 360 * CARTE.largeur, (90 - lat) / 180 * CARTE.hauteur];
  const versLL = (x, y) => [90 - y / CARTE.hauteur * 180, x / CARTE.largeur * 360 - 180];
  function km(a, b) {
    const r = Math.PI / 180, dLa = (b[0] - a[0]) * r, dLo = (b[1] - a[1]) * r;
    const h = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
  }
  const points = d => Math.round(MAX * Math.exp(-d / 1492.7));

  /* ---------- Chargement ---------- */
  function charger() {
    if (CARTE) return Promise.resolve();
    return Promise.all([fetch("/capitales/carte.json").then(r => r.json()), fetch("/capitales/pays.json").then(r => r.json())]).then(([c, p]) => {
      CARTE = c; PAYS = p; cadre = { x: c.cadre[0], y: c.cadre[1], w: c.cadre[2], h: c.cadre[3] };
      svg.appendChild(el("rect", { class: "cp-mer", x: -500, y: -500, width: c.largeur + 1000, height: c.hauteur + 1000 }));
      const g = el("g", { class: "cp-terres" });
      g.appendChild(el("path", { class: "cp-terre", d: c.autres }));
      for (const [n, d] of Object.entries(c.pays)) g.appendChild(el("path", { class: "cp-terre", d, "data-pays": n }));
      svg.appendChild(g);
      svg.appendChild(el("g", { id: "cp-calque" }));
    });
  }
  function recordTexte() {
    const r = lire().records, f = r["carte|facile"], d = r["carte|difficile"];
    const t = [f !== undefined ? `facile : ${nombre(f)}` : "", d !== undefined ? `difficile : ${nombre(d)}` : ""].filter(Boolean);
    $("#cp-carte-record").textContent = t.length ? "Records · " + t.join(" · ") : "";
  }
  recordTexte();

  /* ---------- Vue (viewBox), déplacement et zoom ---------- */
  function rapport() { const r = svg.getBoundingClientRect(); return r.width > 0 && r.height > 0 ? r.width / r.height : 2; }   // carte cachée : rapport par défaut
  function borner(v) {
    const a = rapport(), wMax = Math.max(cadre.w, cadre.h * a), wMin = cadre.w / 60;
    v.w = Math.min(wMax, Math.max(wMin, v.w)); v.h = v.w / a;
    const cx = Math.min(cadre.x + cadre.w, Math.max(cadre.x, v.x + v.w / 2)), cy = Math.min(cadre.y + cadre.h, Math.max(cadre.y, v.y + v.h / 2));
    if (v.w >= cadre.w) v.x = cadre.x + cadre.w / 2 - v.w / 2; else v.x = Math.min(cadre.x + cadre.w - v.w, Math.max(cadre.x, cx - v.w / 2));
    if (v.h >= cadre.h) v.y = cadre.y + cadre.h / 2 - v.h / 2; else v.y = Math.min(cadre.y + cadre.h - v.h, Math.max(cadre.y, cy - v.h / 2));
    return v;
  }
  function appliquer() {
    vb = borner(vb); svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    const u = vb.w / Math.max(1, svg.getBoundingClientRect().width);   // unités de carte par pixel
    svg.style.setProperty("--u", u);
    $$("#cp-calque [data-r]").forEach(c => c.setAttribute("r", Number(c.dataset.r) * u));
    $$("#cp-calque [data-trait]").forEach(c => c.setAttribute("stroke-width", Number(c.dataset.trait) * u));
  }
  function toutVoir() { vb = { x: cadre.x, y: cadre.y, w: Math.max(cadre.w, cadre.h * rapport()), h: 0 }; appliquer(); }
  function zoomer(f, px, py) {
    const nw = vb.w / f, ax = px === undefined ? vb.x + vb.w / 2 : px, ay = py === undefined ? vb.y + vb.h / 2 : py;
    const nh = nw / rapport();
    vb = { x: ax - (ax - vb.x) * (nw / vb.w), y: ay - (ay - vb.y) * (nh / vb.h), w: nw, h: nh }; appliquer();
  }
  function versCarte(cx, cy) { const p = svg.createSVGPoint(); p.x = cx; p.y = cy; return p.matrixTransform(svg.getScreenCTM().inverse()); }
  function cadrer(pts) {   // montrer tous ces points (en unités de carte), avec une marge
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), a = rapport();
    let w = Math.max(x1 - x0, (y1 - y0) * a) * 1.6 + 40;
    vb = { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - w / a / 2, w, h: w / a }; appliquer();
  }

  const pointeurs = new Map(); let geste = null;
  svg.addEventListener("pointerdown", e => {
    svg.setPointerCapture(e.pointerId); pointeurs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    geste = { depart: { x: e.clientX, y: e.clientY }, vb: { ...vb }, bouge: false, pinch: pointeurs.size > 1 ? ecart() : null };
  });
  function ecart() { const [a, b] = [...pointeurs.values()]; return { d: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 }; }
  svg.addEventListener("pointermove", e => {
    if (!pointeurs.has(e.pointerId) || !geste) return;
    pointeurs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointeurs.size > 1) {
      const p = ecart(); if (!geste.pinch) { geste.pinch = p; geste.vb = { ...vb }; return; }
      geste.bouge = true; const f = p.d / Math.max(1, geste.pinch.d); vb = { ...geste.vb }; const c = versCarte(p.cx, p.cy); zoomer(f, c.x, c.y); return;
    }
    const dx = e.clientX - geste.depart.x, dy = e.clientY - geste.depart.y;
    if (!geste.bouge && Math.hypot(dx, dy) < 6) return;
    geste.bouge = true; const u = geste.vb.w / svg.getBoundingClientRect().width;
    vb = { ...geste.vb, x: geste.vb.x - dx * u, y: geste.vb.y - dy * u }; appliquer();
  });
  function fin(e) {
    if (!pointeurs.has(e.pointerId)) return;
    pointeurs.delete(e.pointerId);
    if (geste && !geste.bouge && pointeurs.size === 0 && e.type === "pointerup") { const c = versCarte(e.clientX, e.clientY); planter(c.x, c.y); }
    if (pointeurs.size === 0) geste = null;
  }
  svg.addEventListener("pointerup", fin); svg.addEventListener("pointercancel", fin);
  svg.addEventListener("wheel", e => { e.preventDefault(); const c = versCarte(e.clientX, e.clientY); zoomer(e.deltaY < 0 ? 1.25 : 0.8, c.x, c.y); }, { passive: false });
  $("#cp-zoom-plus").addEventListener("click", () => zoomer(1.6));
  $("#cp-zoom-moins").addEventListener("click", () => zoomer(1 / 1.6));
  $("#cp-zoom-tout").addEventListener("click", toutVoir);
  window.addEventListener("resize", () => { if (vb && !$("#cp-carte-jeu").hidden) appliquer(); });

  /* ---------- Partie ---------- */
  $$("[data-carte]").forEach(b => b.addEventListener("click", () => demarrer(b.dataset.carte)));
  function demarrer(niveau) {
    const cont = ($("#cp-continent") || {}).value || "";
    charger().then(() => {
      const liste = PAYS.filter(p => !cont || p.continent === cont);
      partie = { niveau, continent: cont, paquet: melanger(liste).slice(0, Math.min(MANCHES, liste.length)), i: -1, total: 0, manches: [] };
      $("#cp-accueil").hidden = true; $("#cp-carte-fin").hidden = true; $("#cp-carte-jeu").hidden = false;
      requestAnimationFrame(() => { toutVoir(); suivant(); });
    }).catch(() => { $("#cp-carte-record").textContent = "La carte n'a pas pu être chargée. Rechargez la page."; });
  }
  function suivant() {
    partie.i++;
    if (partie.i >= partie.paquet.length) return terminer();
    const p = Object.assign({}, partie.paquet[partie.i], { capitales: CARTE.capitales[partie.paquet[partie.i].pays] }); partie.courant = p; partie.valide = false; punaise = null;
    $("#cp-carte-pays").textContent = p.pays;
    $("#cp-carte-etat").textContent = `Pays ${partie.i + 1} sur ${partie.paquet.length} · ${nombre(partie.total)} points`;
    $("#cp-carte-retour").hidden = true; $("#cp-carte-valider").disabled = true; $("#cp-carte-valider").hidden = false;
    $("#cp-calque").innerHTML = "";
    $$(".cp-terre.cp-or").forEach(e => e.classList.remove("cp-or"));
    if (partie.niveau === "facile") {
      const t = $(`.cp-terre[data-pays="${CSS.escape(p.pays)}"]`);
      if (t) t.classList.add("cp-or");
      else { const [x, y] = versXY(p.capitales[0][1], p.capitales[0][2]); $("#cp-calque").appendChild(el("circle", { class: "cp-anneau", cx: x, cy: y, "data-r": 28, r: 1, "data-trait": 2 })); }
    }
    toutVoir(); $("#cp-carte-pays").focus({ preventScroll: true });
  }
  function planter(x, y) {
    if (!partie || partie.valide) return;
    punaise = [x, y];
    let g = $("#cp-punaise");
    if (!g) { g = el("g", { id: "cp-punaise" }); $("#cp-calque").appendChild(g); }
    g.innerHTML = "";
    g.appendChild(el("circle", { class: "cp-punaise-tete", cx: x, cy: y, "data-r": 7, r: 1, "data-trait": 2 }));
    g.appendChild(el("circle", { class: "cp-punaise-point", cx: x, cy: y, "data-r": 2, r: 1 }));
    $("#cp-carte-valider").disabled = false; appliquer();
  }
  $("#cp-carte-valider").addEventListener("click", () => {
    if (!partie || partie.valide || !punaise) return;
    partie.valide = true;
    const p = partie.courant, ll = versLL(punaise[0], punaise[1]);
    const cands = p.capitales.map(([nom, la, lo]) => ({ nom, la, lo, d: km(ll, [la, lo]) })).sort((a, b) => a.d - b.d);
    const c = cands[0], pts = points(c.d); partie.total += pts;
    partie.manches.push({ pays: p.pays, capitale: c.nom, d: c.d, pts });
    const [cx, cy] = versXY(c.la, c.lo), calque = $("#cp-calque");
    calque.insertBefore(el("line", { class: "cp-trait", x1: punaise[0], y1: punaise[1], x2: cx, y2: cy, "data-trait": 2 }), calque.firstChild);
    for (const k of cands.slice(1)) { const [x, y] = versXY(k.la, k.lo); calque.appendChild(el("circle", { class: "cp-capitale cp-autre", cx: x, cy: y, "data-r": 5, r: 1, "data-trait": 1.5 })); }
    calque.appendChild(el("circle", { class: "cp-capitale", cx, cy, "data-r": 7, r: 1, "data-trait": 2 }));
    cadrer([punaise, [cx, cy]]);
    $("#cp-carte-verdict").textContent = `${nombre(pts)} points`;
    $("#cp-carte-verdict").className = "cp-verdict " + (pts >= 4000 ? "cp-ok" : pts < 1500 ? "cp-non" : "");
    $("#cp-carte-bonne").innerHTML = `${esc(p.pays)} : <b>${esc(c.nom)}</b> · votre punaise est à ${nombre(c.d)} km`;
    $("#cp-carte-fait").textContent = p.fait;
    $("#cp-carte-valider").hidden = true; $("#cp-carte-retour").hidden = false;
    $("#cp-carte-etat").textContent = `Pays ${partie.i + 1} sur ${partie.paquet.length} · ${nombre(partie.total)} points`;
    $("#cp-carte-suivant").textContent = partie.i + 1 >= partie.paquet.length ? "Voir le résultat" : "Pays suivant";
    $("#cp-carte-suivant").focus({ preventScroll: true });
  });
  $("#cp-carte-suivant").addEventListener("click", suivant);
  $("#cp-carte-terminer").addEventListener("click", terminer);
  document.addEventListener("keydown", e => {
    if (!partie || $("#cp-carte-jeu").hidden || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "Enter" && !partie.valide && punaise) { e.preventDefault(); $("#cp-carte-valider").click(); }
    else if (e.key === "+" || e.key === "=") zoomer(1.6); else if (e.key === "-") zoomer(1 / 1.6);
  });

  function terminer() {
    if (!partie) return;
    const m = lire(), cle = "carte|" + partie.niveau, complet = partie.manches.length === partie.paquet.length;
    let record = "";
    if (complet && !partie.continent) {
      if (m.records[cle] === undefined || partie.total > m.records[cle]) { record = "Nouveau record !"; m.records[cle] = partie.total; ecrire(m); }
      else record = `Record : ${nombre(m.records[cle])}`;
    }
    $("#cp-carte-jeu").hidden = true; $("#cp-carte-fin").hidden = false;
    $("#cp-carte-fin-titre").textContent = complet ? "Partie terminée" : "Partie interrompue";
    $("#cp-carte-fin-score").textContent = `${nombre(partie.total)} points sur ${nombre(MAX * partie.paquet.length)}`;
    $("#cp-carte-fin-record").textContent = record;
    $("#cp-carte-manches").innerHTML = partie.manches.length ? `<h3>Vos punaises</h3><ul>${partie.manches.map(x => `<li><span>${esc(x.pays)} · ${esc(x.capitale)}</span><b>${nombre(x.d)} km · ${nombre(x.pts)}</b></li>`).join("")}</ul>` : "";
    $("#cp-carte-fin-titre").focus(); recordTexte();
    partie.fini = true;
  }
  $("#cp-carte-rejouer").addEventListener("click", () => partie && demarrer(partie.niveau));
  $("#cp-carte-accueil").addEventListener("click", () => { $("#cp-carte-fin").hidden = true; $("#cp-carte-jeu").hidden = true; $("#cp-accueil").hidden = false; partie = null; recordTexte(); });
})();
