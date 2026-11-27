/* Tests du site Morand (accueil, Guide, Map, CRDS, Codes, confidentialité), dans Chromium (Playwright).
     node tests/site.test.mjs            tous les scénarios
     SCENARIOS=crds,codes node tests/site.test.mjs
   Le test sert le dépôt lui-même sur un port libre ; les appels vers d'autres sites (tuiles de la carte) sont bloqués.
   Aucune donnée personnelle : seulement les pages et les données publiées. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".mp3": "audio/mpeg", ".pdf": "application/pdf" };
const serveur = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname); if (p.endsWith("/")) p += "index.html";
  const f = path.join(RACINE, p);
  if (!f.startsWith(RACINE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end("introuvable"); return; }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
await new Promise(r => serveur.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${serveur.address().port}`;

let reussis = 0, echecs = 0;
function verifier(nom, condition, detail) {
  if (condition) reussis++;
  else { echecs++; console.error(`ÉCHEC : ${nom}${detail !== undefined ? ` (${typeof detail === "string" ? detail : JSON.stringify(detail)})` : ""}`); }
}
const lire = f => fs.readFileSync(path.join(RACINE, f), "utf8");
const PAGES = ["/", "/guides/", "/guides/ressources-communautaires/", "/map/", "/crds/", "/codes/", "/confidentialite/", "/merci/", "/locomoteur/", "/locomoteur/genou/", "/entrainement/", "/locomoteur/donnees/", "/locomoteur/morandle/", "/capitales/"];
const OUTILS = ["/guides/", "/guides/ressources-communautaires/", "/map/", "/crds/", "/codes/"];
const TRONQUE = /<\s*\d+[a-zA-Z]{0,3}>/;

async function ouvrir(nav, chemin, { largeur = 390, hauteur = 844, sombre = false, stockage = null, userAgent, horloge = null } = {}) {
  const ctx = await nav.newContext({ viewport: { width: largeur, height: hauteur }, serviceWorkers: "block", colorScheme: sombre ? "dark" : "light", ...(userAgent ? { userAgent, isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript(s => { try { sessionStorage.setItem("morand.ouverture", "1"); if (s) for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } }, stockage);
  await ctx.route("**/*", r => r.request().url().startsWith(BASE) ? r.continue() : r.abort());
  const p = await ctx.newPage(), erreurs = [];
  if (horloge) await p.clock.setFixedTime(new Date(horloge));   // heure figée (Date seulement ; les minuteries tournent)
  // Les appels bloqués vers d'autres sites (fond de carte) ne comptent pas comme des erreurs de la page.
  const dehors = t => /Failed to fetch|Failed to load resource|ERR_FAILED|net::|AJAXError/.test(t);
  p.on("pageerror", e => { if (!dehors(String(e))) erreurs.push(String(e)); });
  p.on("console", m => { if (m.type() === "error" && !dehors(m.text())) erreurs.push(m.text()); });
  const rep = await p.goto(BASE + chemin); await p.waitForTimeout(700);
  return { ctx, p, erreurs, statut: rep.status() };
}
const deborde = p => p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);

/* 1. Chaque page s'ouvre, sans erreur de script, sans défilement horizontal, à trois largeurs. */
async function pages(nav) {
  for (const largeur of [320, 390, 1280]) for (const u of PAGES) {
    const { ctx, p, erreurs, statut } = await ouvrir(nav, u, { largeur, hauteur: largeur > 1000 ? 800 : 700 });
    verifier(`${u} à ${largeur} px : la page s'ouvre`, statut === 200, statut);
    verifier(`${u} à ${largeur} px : aucune erreur de script`, erreurs.length === 0, erreurs);
    verifier(`${u} à ${largeur} px : pas de défilement horizontal`, !(await deborde(p)));
    // Pages de texte : une seule colonne, le titre au-dessus des paragraphes (pas côte à côte).
    if (u === "/confidentialite/") verifier(`${u} à ${largeur} px : une seule colonne de texte`, await p.evaluate(() => {
      const h = document.querySelector("main h1").getBoundingClientRect(), t = document.querySelector("main p").getBoundingClientRect();
      return t.top >= h.bottom && t.width > 250; }));
    await ctx.close();
  }
}

/* 2. Navigation : les six outils sur une ligne, l'outil courant marqué, sans chevaucher « Morand ». */
async function navigation(nav) {
  const ATTENDU = { "/guides/": "Guide", "/guides/ressources-communautaires/": "Guide", "/map/": "Map", "/crds/": "CRDS", "/codes/": "Codes" };
  for (const largeur of [320, 390, 1280]) for (const u of OUTILS) {
    const { ctx, p } = await ouvrir(nav, u, { largeur });
    const r = await p.evaluate(() => { const n = document.querySelector("nav[aria-label='Outils Morand']"); if (!n) return null;
      const a = [...n.querySelectorAll("a")], b = a.map(x => x.getBoundingClientRect()), m = n.parentElement.querySelector("a").getBoundingClientRect();
      return { noms: a.map(x => x.textContent.trim()), liens: a.map(x => x.getAttribute("href")), courant: (n.querySelector("[aria-current='page']") || {}).textContent,
        uneLigne: Math.abs(b[0].top - b[b.length - 1].top) < 2, dansEcran: b[b.length - 1].right <= innerWidth + 1, chevauche: m.right > b[0].left - 2 }; });
    verifier(`${u} à ${largeur} px : six outils dans l'en-tête`, r && r.noms.join() === "Wealth,Guide,Map,CRDS,Codes,MSK" && r.liens.join() === "/wealth/,/guides/,/map/,/crds/,/codes/,/locomoteur/", r);
    verifier(`${u} à ${largeur} px : onglets sur une ligne, dans l'écran, sans toucher « Morand »`, r && r.uneLigne && r.dansEcran && !r.chevauche, r);
    verifier(`${u} à ${largeur} px : l'outil courant est marqué`, r && r.courant === ATTENDU[u], r && r.courant);
    await ctx.close();
  }
}

/* 3. Mots collés : dans un conteneur en flex, une espace au début d'un élément disparaît (« GUIDESCLINIQUES »). */
async function motsColles(nav) {
  for (const largeur of [390, 1280]) for (const u of PAGES) {
    const { ctx, p } = await ouvrir(nav, u, { largeur });
    const colles = await p.evaluate(() => { const out = new Set();
      for (const e of document.querySelectorAll("body *")) { const cs = getComputedStyle(e); if (!/flex|grid/.test(cs.display) || !e.getClientRects().length) continue;
        const enfants = [...e.childNodes].filter(n => n.nodeType === 1 ? getComputedStyle(n).display !== "none" && n.getClientRects().length : n.textContent.trim());
        for (let i = 1; i < enfants.length; i++) { const a = enfants[i - 1], k = enfants[i]; if (k.nodeType !== 1) continue; const ks = getComputedStyle(k);
          if (/^\s+\S/.test(k.textContent) && /\S$/.test(a.textContent) && !parseFloat(cs.columnGap) && !parseFloat(ks.marginLeft) && ks.whiteSpace !== "pre" && /^inline/.test(ks.display) === false && ks.display !== "block" && ks.display !== "flex" && ks.display !== "grid") continue;
          if (/^\s+\S/.test(k.textContent) && /\S$/.test(a.textContent) && cs.flexDirection !== "column" && !parseFloat(cs.columnGap) && !parseFloat(ks.marginLeft) && ks.whiteSpace !== "pre" && k.tagName === "SPAN")
            out.add(e.textContent.replace(/\s+/g, " ").trim().slice(0, 60)); } }
      return [...out]; });
    verifier(`${u} à ${largeur} px : aucun mot collé`, colles.length === 0, colles);
    await ctx.close();
  }
}

/* 4. Accueil : six outils qui tiennent dans l'écran ; la recherche unique trouve dans chaque outil. */
async function accueil(nav) {
  for (const [largeur, hauteur] of [[390, 844], [320, 568], [1280, 720]]) {
    const { ctx, p } = await ouvrir(nav, "/", { largeur, hauteur });
    const r = await p.evaluate(() => ({ outils: [...document.querySelectorAll("#outils a")].map(a => a.getAttribute("href")), bas: document.querySelector(".pied").getBoundingClientRect().bottom, titre: document.querySelector("h1").textContent }));
    verifier(`accueil ${largeur}×${hauteur} : six outils`, r.outils.join() === "/wealth/,/guides/,/map/,/crds/,/codes/,/locomoteur/", r.outils);
    verifier(`accueil ${largeur}×${hauteur} : tout tient dans l'écran`, r.bas <= hauteur + 1, Math.round(r.bas));
    // La barre de recherche : un bouton « Chercher » dans le champ, et l'exemple tient en entier à côté du bouton.
    const b = await p.evaluate(() => { const i = document.getElementById("rg-q"), bt = document.querySelector(".rg-bouton"), ri = i.getBoundingClientRect(), rb = bt.getBoundingClientRect();
      const cs = getComputedStyle(i), ps = getComputedStyle(i, "::placeholder"), c = document.createElement("canvas").getContext("2d"); c.font = `${ps.fontWeight} ${ps.fontSize} Inter`;
      return { texte: bt.textContent, dedans: rb.left > ri.left && rb.right <= ri.right && rb.top >= ri.top && rb.bottom <= ri.bottom, haut: rb.height,
        place: ri.width - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth) - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), /* clientWidth d'un champ de recherche vaut 200 dans Chromium */ exemple: Math.ceil(c.measureText(i.placeholder).width), titre: document.querySelector("h1").getBoundingClientRect().top, tete: document.querySelector(".tete").getBoundingClientRect().bottom }; });
    verifier(`accueil ${largeur}×${hauteur} : bouton « Chercher » dans le champ`, b.texte === "Chercher" && b.dedans && b.haut >= 34, b);
    verifier(`accueil ${largeur}×${hauteur} : l'exemple de recherche n'est pas coupé`, b.exemple <= b.place, b);
    verifier(`accueil ${largeur}×${hauteur} : le titre ne passe pas sous l'en-tête`, b.titre >= b.tete, b);
    // Ordinateur : « Installer l'app » centré sur la première ligne du titre, aligné à droite sur le filet de l'en-tête.
    if (largeur >= 1000) {
      const i = await p.evaluate(() => { document.getElementById("installer-ligne").hidden = false;
        const bt = document.getElementById("installer").getBoundingClientRect(), h1 = document.querySelector("h1"), rg = document.createRange();
        rg.setStart(h1.firstChild, 0); rg.setEnd(h1.firstChild, h1.firstChild.length); const l1 = rg.getBoundingClientRect(), f = document.querySelector(".tete").getBoundingClientRect();
        return { ecart: Math.abs((bt.top + bt.bottom) / 2 - (l1.top + l1.bottom) / 2), droite: Math.abs(bt.right - f.right), bas: document.querySelector(".pied").getBoundingClientRect().bottom }; });
      verifier(`accueil ${largeur}×${hauteur} : « Installer l'app » centré sur « Six outils », aligné à droite`, i.ecart <= 2 && i.droite <= 1 && i.bas <= hauteur + 1, i);
    }
    await ctx.close();
  }
  const { ctx, p, erreurs } = await ouvrir(nav, "/");
  const chercher = async t => { await p.fill("#rg-q", t); await p.waitForTimeout(t ? 900 : 250); return p.evaluate(() => ({ groupes: [...document.querySelectorAll(".rg-groupe h2")].map(h => h.childNodes[1].textContent),
    etat: document.getElementById("rg-etat").textContent, outils: !!document.getElementById("outils").offsetParent, liens: [...document.querySelectorAll(".rg-groupe li a")].map(a => a.getAttribute("href")) })); };
  const tvp = await chercher("TVP");
  verifier("recherche de l'accueil : « TVP » trouve l'accueil clinique, le CRDS et les guides", ["Accueil clinique", "CRDS", "Guides cliniques"].every(g => tvp.groupes.includes(g)) && !tvp.outils, tvp.groupes);
  verifier("recherche de l'accueil : les liens mènent aux outils, avec la recherche", tvp.liens.some(l => l.startsWith("/crds/?q=")), tvp.liens.slice(0, 3));
  const code = await chercher("15804");
  verifier("recherche de l'accueil : un code d'acte mène à Codes Morand", code.groupes.join() === "Codes" && code.liens[0] === "/codes/?q=15804", code);
  const rien = await chercher("zzzzq");
  verifier("recherche de l'accueil : aucun résultat, c'est dit", rien.groupes.length === 0 && rien.etat.startsWith("Aucun résultat"), rien.etat);
  // Le bouton « Chercher » lance la recherche ; champ vide, il place le curseur dans le champ.
  await p.fill("#rg-q", "syncope"); await p.click(".rg-bouton"); await p.waitForTimeout(900);
  const bouton = await p.evaluate(() => ({ groupes: document.querySelectorAll(".rg-groupe").length, url: location.pathname + location.search }));
  verifier("recherche de l'accueil : le bouton « Chercher » lance la recherche, sans quitter la page", bouton.groupes > 0 && bouton.url === "/", bouton);
  await p.fill("#rg-q", ""); await p.waitForTimeout(250); await p.click(".rg-bouton");
  verifier("recherche de l'accueil : bouton sur un champ vide, le curseur va dans le champ", await p.evaluate(() => document.activeElement.id === "rg-q"));
  const vide = await chercher("");
  verifier("recherche de l'accueil : champ vidé, les outils reviennent", vide.outils && vide.groupes.length === 0);
  verifier("recherche de l'accueil : aucune erreur", erreurs.length === 0, erreurs);
  await ctx.close();
  // Safari sur iPhone : « Installer l'app » est affiché (plus haut) ; le pied (« Confidentialité », « MMXXVI ») reste dans l'écran, sans défilement.
  // Hauteurs visibles de Safari, barre d'adresse déployée : iPhone SE (1re gén.), SE (2e et 3e gén.), 13 mini, 15.
  const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  for (const [largeur, hauteur] of [[320, 568], [375, 553], [375, 629], [393, 659]]) {
    const o = await ouvrir(nav, "/", { largeur, hauteur, userAgent: IPHONE });
    const r = await o.p.evaluate(() => { const pied = document.querySelector(".pied").getBoundingClientRect(), liste = document.getElementById("outils").getBoundingClientRect();
      return { installer: !document.getElementById("installer-ligne").hidden, piedBas: Math.round(pied.bottom), piedHaut: Math.round(pied.top), listeBas: Math.round(liste.bottom), defile: document.documentElement.scrollHeight - innerHeight }; });
    verifier(`accueil, Safari sur iPhone ${largeur}×${hauteur} : « Installer l'app » affiché, pied entier dans l'écran, rien ne chevauche, pas de défilement`, r.installer && r.piedBas <= hauteur && r.listeBas <= r.piedHaut + 1 && r.defile <= 1, r);
    await o.ctx.close();
  }
  // Clin d'œil : « MMXXVI », au pied, n'est pas un lien ; au survol, seul le curseur change (doré) ; un clic ouvre les remerciements.
  for (const [largeur, hauteur] of [[390, 844], [1280, 720]]) {
    const o = await ouvrir(nav, "/", { largeur, hauteur });
    const a = await o.p.evaluate(() => { const e = document.querySelector(".pied-annee"), cs = getComputedStyle(e), r = e.getBoundingClientRect();
      return { texte: e.textContent, lien: !!e.closest("a"), curseur: cs.cursor, couleur: cs.color, voisin: getComputedStyle(document.querySelector(".pied")).color, haut: r.height }; });
    verifier(`accueil ${largeur} px : « MMXXVI » discret (pas un lien, même couleur que le pied)`, a.texte === "MMXXVI" && !a.lien && a.couleur === a.voisin, a);
    verifier(`accueil ${largeur} px : curseur en étoile dorée sur « MMXXVI », pas la main`, a.curseur.includes("curseur-etoile.svg") && !a.curseur.includes("pointer"), a.curseur);
    verifier(`accueil ${largeur} px : « MMXXVI » assez grand pour le doigt`, a.haut >= 38, a.haut);
    await o.p.click(".pied-annee"); await o.p.waitForURL("**/merci/"); await o.p.waitForTimeout(3400);
    const m = await o.p.evaluate(() => { const img = document.querySelector(".merci-portrait");
      return { titre: document.querySelector("h1").textContent, portrait: img.complete && img.naturalWidth > 0, visible: getComputedStyle(document.querySelector(".merci-plaque")).opacity }; });
    verifier(`accueil ${largeur} px : un clic sur « MMXXVI » ouvre les remerciements, portrait chargé`, m.titre === "Dr Philippe Morand" && m.portrait, m);
    verifier(`remerciements ${largeur} px : tout le texte finit par apparaître`, +m.visible === 1, m.visible);
    const pluie = await o.p.evaluate(() => { const c = document.querySelector(".merci-pluie"), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
      let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 20) n++;
      const r = c.getBoundingClientRect(); return { points: n, plein: r.width === innerWidth || r.width === document.documentElement.clientWidth, clics: getComputedStyle(c).pointerEvents }; });
    verifier(`remerciements ${largeur} px : la pluie d'étoiles dorées tombe sur toute la page, sans bloquer les clics`, pluie.points > 50 && pluie.plein && pluie.clics === "none", pluie);
    // Musique : le fichier se charge ; elle joue déjà, ou le bouton invite à la lancer ; le bouton la coupe et la relance.
    const son = () => o.p.evaluate(() => { const a = document.querySelector(".merci-audio"), b = document.querySelector(".merci-son");
      return { duree: Math.round(a.duration), pret: a.readyState, joue: !a.paused, bouton: !b.hidden, classe: b.className, etiquette: b.getAttribute("aria-label") }; });
    const s0 = await son();
    verifier(`remerciements ${largeur} px : la musique se charge (2 min 57 s) et joue, ou le bouton invite à la lancer`, s0.duree === 177 && s0.pret >= 1 && s0.bouton && (s0.joue || s0.classe.includes("invite")), s0);
    if (!s0.joue) await o.p.click(".merci-son");
    await o.p.waitForTimeout(400); const s1 = await son();
    await o.p.click(".merci-son"); await o.p.waitForTimeout(300); const s2 = await son();
    verifier(`remerciements ${largeur} px : le bouton doré coupe la musique`, s1.joue && s1.etiquette === "Couper la musique" && !s2.joue && s2.etiquette === "Jouer la musique", { s1, s2 });
    verifier(`remerciements ${largeur} px : aucune erreur`, o.erreurs.length === 0, o.erreurs);
    await o.ctx.close();
  }
}

/* 5. CRDS : recherche, onglets, accueil clinique de Pierre-Boucher, favoris et recherches récentes. */
async function crds(nav) {
  const D = JSON.parse(lire("crds/crds_data.json")), PB = D.accueil_clinique.pierre_boucher;
  const { ctx, p, erreurs } = await ouvrir(nav, "/crds/");
  const etat = () => p.evaluate(() => ({ etat: document.getElementById("cr-etat").textContent, tuiles: document.querySelectorAll(".cr-spec").length, panneau: document.querySelectorAll(".cr-ac-panneau").length,
    cartes: document.querySelectorAll(".cr-carte").length, ac: [...document.querySelectorAll(".cr-carte-ac h3")].map(h => h.textContent), onglets: [...document.querySelectorAll(".cr-vue")].map(b => b.textContent + (b.getAttribute("aria-selected") === "true" ? "*" : "")) }));
  // TPP : les seuils de l'ordonnance (Wells ≥ 2) ; la phrase du portail sur les scores de 1 ou 2 n'est pas reprise.
  const tpp = JSON.stringify(PB.protocoles.find(x => x.id === "pb-tpp") || null);
  verifier("Accueil clinique, TPP : la phrase du portail « scores de Wells de 1 ou 2 » n'est pas affichée ; les seuils de l'ordonnance, oui",
    tpp !== "null" && !/Wells de 1 ou 2, un doppler/.test(tpp) && /Wells ≥ 2/.test(tpp), tpp.slice(0, 200));
  let e = await etat();
  verifier("CRDS : au départ, les spécialités", e.tuiles === D.formulaires.length && e.panneau === 0 && e.onglets.join() === "CRDS*,Accueil clinique,Favoris", e);
  await p.click('.cr-vue[data-v="accueil"]'); await p.waitForTimeout(200); e = await etat();
  verifier("CRDS : l'onglet Accueil clinique montre le panneau et ses protocoles", e.panneau === 1 && e.tuiles === 0 && (await p.locator(".cr-ac-panneau .cr-ac-puce").count()) === PB.protocoles.length, e);
  verifier("CRDS : sous les coordonnées, seul « Comment référer » reste, replié", await p.evaluate(() => { const d = [...document.querySelectorAll(".cr-ac-panneau > details")]; return d.length === 1 && !d[0].open && d[0].querySelector("summary").textContent === "Comment référer"; }));
  await p.fill("#cr-q", "TVP"); await p.waitForTimeout(300); e = await etat();
  verifier("CRDS : « TVP » trouve le protocole de l'accueil clinique d'abord, puis le CRDS", e.ac.join() === "Thrombophlébite profonde (TPP)" && e.cartes >= 2, e);
  // Chaque protocole se trouve par son nom ; aucun seuil coupé hors des notes repliées.
  let manquants = [], coupes = 0;
  for (const pr of PB.protocoles) { await p.fill("#cr-q", pr.nom); await p.waitForTimeout(120);
    const r = await p.evaluate(nom => { const c = [...document.querySelectorAll(".cr-carte-ac")].find(x => x.querySelector("h3").textContent === nom); if (!c) return null; const k = c.cloneNode(true); k.querySelectorAll(".cr-protocole").forEach(x => x.remove()); return k.textContent; }, pr.nom);
    if (r == null) manquants.push(pr.nom); else if (TRONQUE.test(r)) coupes++; }
  verifier("CRDS : les protocoles de Pierre-Boucher se trouvent tous par leur nom", manquants.length === 0, manquants);
  verifier("CRDS : aucun seuil coupé après « < » dans l'essentiel d'une fiche", coupes === 0, coupes);
  // Favoris et recherches récentes : gardés sur l'appareil.
  await p.fill("#cr-q", "TVP"); await p.waitForTimeout(300);
  await p.click(".cr-carte-ac .cr-fav"); await p.waitForTimeout(1700);
  await p.fill("#cr-q", ""); await p.waitForTimeout(250); await p.click('.cr-vue[data-v="favoris"]'); await p.waitForTimeout(200); e = await etat();
  verifier("CRDS : la fiche étoilée est dans les favoris", e.cartes === 1 && e.onglets.includes("Favoris (1)*"), e);
  verifier("CRDS : la recherche est proposée dans les récentes", (await p.locator(".cr-recent").allTextContents()).join().startsWith("TVP"));
  await p.reload(); await p.waitForTimeout(700); e = await etat();
  verifier("CRDS : les favoris survivent au rechargement", e.onglets.includes("Favoris (1)"), e.onglets);
  await p.goto(BASE + "/crds/?q=cardiologie"); await p.waitForTimeout(700); e = await etat();
  verifier("CRDS : un lien avec ?q= lance la recherche", e.cartes > 3, e.etat);
  // Chaque fiche : « spécialité · catégorie » en surtitre et le formulaire en bas (comme le 14 novembre).
  await p.fill("#cr-q", "ORL adulte et enfant"); await p.waitForTimeout(300);
  const sur = await p.evaluate(() => [...document.querySelectorAll(".cr-carte:not(.cr-carte-ac)")].map(c => ({ sur: c.querySelector(".cr-sur").textContent, pied: c.querySelector(".cr-source").textContent })));
  await p.fill("#cr-q", "Ophtalmologie adulte et enfant"); await p.waitForTimeout(300);
  const oph = await p.evaluate(() => [...document.querySelectorAll(".cr-carte:not(.cr-carte-ac) .cr-sur")].map(x => x.textContent));
  verifier("CRDS : la catégorie qui répète la spécialité n'est pas écrite en double", oph.length > 0 && !oph.some(t => /· Ophtalmologie$/.test(t)) && oph.includes("Ophtalmologie adulte et enfant"), [...new Set(oph)]);
  verifier("CRDS : chaque fiche porte « spécialité · catégorie » et son formulaire en bas", sur.length > 0 && sur.every(o => /^ORL adulte et enfant · \S/.test(o.sur) && /^AH-748 · rév\. .+Formulaire du MSSS$/.test(o.pied)) && !(await p.locator(".cr-groupe").count()), sur.slice(0, 2));
  // Titres : le problème seul ; le libellé complet du formulaire dans les critères.
  const fiche = async q => { await p.fill("#cr-q", q); await p.waitForTimeout(300);
    return p.evaluate(() => { const c = document.querySelector(".cr-carte:not(.cr-carte-ac)"); return { titre: c.querySelector("h3").textContent, criteres: [...c.querySelectorAll(".cr-bloc li")].map(l => l.textContent) }; }); };
  let fi = await fiche("Otites à répétition");
  verifier("CRDS : « Otites » en titre ; « depuis + 3 mois » seulement dans les critères", fi.titre === "Otites" && fi.criteres.some(x => x.includes("Otites à répétition ou séreuse persistante (depuis + 3 mois)")), fi);
  fi = await fiche("conjonctivite");
  verifier("CRDS : plusieurs priorités, le libellé complet en tête des critères", fi.titre === "Conjonctivite" && fi.criteres[0] === "Conjonctivite réfractaire au traitement depuis plus de 2 semaines", fi);
  verifier("CRDS : chaque titre court reprend le début ou les mots du libellé complet", D.problemes.every(x => x.titre && x.titre.length <= x.probleme.length), D.problemes.filter(x => !x.titre || x.titre.length > x.probleme.length).map(x => x.id));
  // Fiche de l'accueil clinique : notes techniques retirées ; contre-indications générales et sources repliées.
  await p.fill("#cr-q", "Thrombophlébite profonde (TPP)"); await p.waitForTimeout(300);
  const f = await p.evaluate(() => { const c = document.querySelector(".cr-carte-ac"); const t = c.textContent;
    return { ecarts: /Écarts relevés/.test(t), omises: /coupées? après le signe/.test(t), gen: !!c.querySelector("details.cr-ci-repli:not([open]) .cr-ci-gen"),
      src: !!c.querySelector("details.cr-sources-ac:not([open]) .cr-source"), srcVisible: [...c.querySelectorAll(".cr-source")].some(x => x.checkVisibility()) }; });
  verifier("Accueil clinique : ni « Écarts relevés » ni lignes omises ; générales et sources repliées", !f.ecarts && !f.omises && f.gen && f.src && !f.srcVisible, f);
  await p.fill("#cr-q", ""); await p.click('.cr-vue[data-v="accueil"]'); await p.waitForTimeout(200);
  verifier("Accueil clinique : la définition tient en une ligne", (await p.textContent(".cr-ac-panneau > .cr-ac-texte")) === "Prise en charge en 24 à 72 h, selon un protocole.");
  verifier("CRDS : plus de phrase sous le titre ; « Sources et limites » sans la liste des 26 formulaires", await p.evaluate(() => !document.querySelector(".cr-intro .cr-lead") && !document.getElementById("cr-formulaires") && /DMÉ ou de SAFIR/.test(document.querySelector(".cr-sources").textContent)));
  verifier("CRDS : aucune erreur", erreurs.length === 0, erreurs);
  await ctx.close();
  // Données : rien de coupé hors des notes d'écarts, aucun nom retiré, des sources partout.
  const sansEcarts = JSON.stringify({ ...PB, acces: { ...PB.acces, ecart_contre_indications: "" }, protocoles: PB.protocoles.map(x => ({ ...x, detail: { ...x.detail, ecarts: [] } })) });
  verifier("données de l'accueil clinique : aucun seuil coupé hors des notes d'écarts", !TRONQUE.test(sansEcarts));
  verifier("données de l'accueil clinique : aucune mention « nom retiré »", !/retir[ée]s? —|\[(nom|noms|cellulaire)/.test(JSON.stringify(PB)));
  verifier("données du CRDS : identifiants uniques", new Set(D.problemes.map(x => x.id)).size === D.problemes.length);
}

/* 6. Codes Morand : répertoire, groupes, codes de vulnérabilité, lien avec ?q=. */
async function codes(nav) {
  const D = JSON.parse(lire("codes/codes_data.json"));
  const { ctx, p, erreurs } = await ouvrir(nav, "/codes/");
  const etat = () => p.evaluate(() => ({ etat: document.getElementById("co-etat").textContent, titres: [...document.querySelectorAll(".co-titre")].map(x => x.textContent), cartes: [...document.querySelectorAll(".co-carte h2")].map(x => x.textContent) }));
  let e = await etat();
  verifier("Codes : au départ, les plus fréquents", e.titres.length === D.frequents.length && e.cartes.join() === "Les plus fréquents", e.etat);
  const chercher = async t => { await p.fill("#co-q", t); await p.waitForTimeout(250); return etat(); };
  e = await chercher("15804"); verifier("Codes : un code trouve son acte", e.titres.length === 1 && e.titres[0].startsWith("Suivi"), e);
  e = await chercher("stérilet"); verifier("Codes : un mot trouve ses actes, sans égard aux accents", e.titres.length >= 2 && e.titres.every(t => /stérilet/i.test(t)), e.titres);
  e = await chercher("FA"); verifier("Codes : « FA » trouve la fibrillation auriculaire, pas « forfait »", e.titres.length > 0 && e.titres.some(t => /Fibrillation auriculaire/.test(t)) && !e.titres.some(t => /^Forfait/.test(t)), e.titres);
  e = await chercher("cnesst"); verifier("Codes : les formulaires de la CNESST", e.titres.length === D.actes.filter(a => /^CNESST/.test(a.n)).length, e.etat);
  e = await chercher("zzzzq"); verifier("Codes : aucun résultat, c'est dit", e.titres.length === 0 && (await p.locator(".cr-vide").count()) === 1);
  await p.fill("#co-q", ""); await p.click('.co-vues [data-vue="vulnerabilite"]'); await p.waitForTimeout(200); e = await etat();
  verifier("Codes : les codes de vulnérabilité", e.titres.length === D.vulnerabilite.length, e.etat);
  await p.click('.co-vues [data-vue="actes"]'); await p.click('[data-v="tous"]'); await p.waitForTimeout(200); e = await etat();
  verifier("Codes : tous les actes, par groupe", e.titres.length === D.actes.length && e.cartes.length === D.groupes.length, e.etat);
  verifier("Codes : montants en dollars, deux décimales", (await p.locator(".co-valeur").first().textContent()).match(/^\d[\d\s]*,\d{2}(\s\/\s[\d\s]+,\d{2})?\s\$$/) !== null, await p.locator(".co-valeur").first().textContent());
  await p.goto(BASE + "/codes/?q=pessaire"); await p.waitForTimeout(600); e = await etat();
  verifier("Codes : un lien avec ?q= lance la recherche", e.titres.length === 1 && /pessaire/i.test(e.titres[0]), e);
  // Exactitude : les vérifications qui étaient dans les tests de Wealth, quand le répertoire y était affiché.
  const rangees = () => p.evaluate(() => [...document.querySelectorAll(".co-rangee")].map(r => ({ titre: r.querySelector(".co-titre").textContent, sous: (r.querySelector(".co-sous") || {}).textContent || "",
    valeur: ((r.querySelector(".co-valeur") || {}).textContent || "").replace(/\s/g, " "), detail: ((r.querySelector(".co-valeur-sous") || {}).textContent || "").replace(/\s/g, " "),
    code: (r.querySelector(".co-code") || {}).textContent || "", grise: r.classList.contains("co-non") })));
  await p.goto(BASE + "/codes/"); await p.waitForTimeout(600);
  // Réglages (mode, palier) : un seul prix ; au départ, mixte, moins de 500. À l'acte : colonne « En cabinet » du manuel.
  const regler = async (...t) => { for (const x of t) await p.click(`.co-segment button:text-is("${x}")`); await p.waitForTimeout(150); };
  await chercher("15804"); let r = await rangees();
  verifier("Codes : 15804 cherché, son code et son palier (500 et plus), au mixte : 23,49 $", r.length === 1 && r[0].valeur === "23,49 $" && r[0].sous.startsWith("15804"), r);
  await chercher("15803"); r = await rangees();
  verifier("Codes : 15803, moins de 500, au mixte : 20,50 $", r[0].valeur === "20,50 $" && r[0].sous.startsWith("15803"), r);
  verifier("Codes : plus de choix cabinet / établissement ; trois modes", (await p.locator(".co-segment button").allTextContents()).join() === "À l'acte,Mixte,Horaire,Moins de 500,500 et plus");
  await regler("À l'acte"); r = await rangees();
  verifier("Codes : à l'acte, 15803 : 42,85 $ (colonne « En cabinet » du manuel)", r[0].valeur === "42,85 $", r);
  await regler("Horaire"); r = await rangees();
  verifier("Codes : au taux horaire, une visite est « Compris dans l'heure »", r[0].valeur === "Compris dans l'heure" && r[0].grise, r);
  await chercher("15169"); r = await rangees();
  verifier("Codes : au taux horaire, le forfait de responsabilité se paie en plus : 8,25 $", r[0].valeur === "8,25 $", r);
  await chercher("09926"); r = await rangees();
  verifier("Codes : au taux horaire, un formulaire de la CNESST se paie : 27,57 $", r[0].valeur === "27,57 $", r);
  await chercher("01240"); r = await rangees();
  verifier("Codes : au taux horaire, un acte sans règle confirmée : « À confirmer »", r[0].valeur === "À confirmer" && r[0].grise, r);
  await regler("À l'acte", "500 et plus"); await chercher("suivi, patient non vulnérable de moins"); r = await rangees();
  verifier("Codes : 500 et plus à l'acte, sans chercher de code : 15804 à 49,15 $", r[0].valeur === "49,15 $" && r[0].sous.startsWith("15804"), r);
  await chercher("42094"); r = await rangees();
  verifier("Codes : la base du mixte, à l'acte : « Mixte seulement », en gris", r[0].valeur === "Mixte seulement" && r[0].grise, r);
  await chercher("08848"); r = await rangees();
  verifier("Codes : un tarif en cabinet introuvable au manuel : « À confirmer », pas un montant deviné", r[0].valeur === "À confirmer" && r[0].grise, r);
  await p.reload(); await p.waitForTimeout(700);
  const garde = await p.evaluate(() => [...document.querySelectorAll('.co-segment button[aria-pressed="true"]')].map(b => b.textContent).join());
  verifier("Codes : les réglages restent sur l'appareil", garde === "À l'acte,500 et plus", garde);
  await chercher("08875"); r = await rangees();
  verifier("Codes : le forfait GMF (08875), 9,35 $", r.length === 1 && r[0].titre.startsWith("Forfait de prise en charge et de suivi de la clientèle en GMF") && r[0].valeur === "9,35 $", r);
  // Détail : tous les prix, élément de contexte, codes liés, règles du manuel repliées, lien vers le manuel.
  await chercher("15803"); await p.click(".co-ligne"); await p.waitForTimeout(200);
  const det = await p.evaluate(() => { const d = document.querySelector(".co-detail:not([hidden])"); return d && { texte: d.textContent, lies: [...d.querySelectorAll("button.co-lie")].map(b => b.textContent),
    regles: !!d.querySelector("details.co-manuel:not([open])"), lien: (d.querySelector(".co-source a") || {}).href || "" }; });
  verifier("Codes : le détail de 15803 donne l'acte en cabinet et en établissement, le mixte et l'horaire", det && det.texte.includes("À l'acte, en cabinet : 42,85 $ (moins de 500) · 49,15 $ (500 et plus)")
    && det.texte.includes("À l'acte, en établissement : 32,25 $ (moins de 500) · 36,95 $ (500 et plus)") && det.texte.includes("Mixte (63,58 % du tarif en établissement) : 20,50 $ (moins de 500) · 23,49 $ (500 et plus)")
    && det.texte.includes("Horaire : compris dans l'heure"), det && det.texte.slice(0, 400));
  verifier("Codes : le détail recopie l'élément de contexte du manuel et lie la section du manuel", det.texte.includes("Médecin appartenant au même groupe que le médecin traitant") && det.regles && /manuel-remuneration-acte#\d+$/.test(det.lien), det.lien);
  await p.click('button.co-lie:text-is("15823")'); await p.waitForTimeout(250); r = await rangees();
  verifier("Codes : un code lié se touche et s'affiche", (await p.inputValue("#co-q")) === "15823" && r.length === 1 && r[0].sous.startsWith("15823") && det.lies.includes("15823"), r);
  await regler("Mixte", "Moins de 500"); await p.fill("#co-q", ""); await p.waitForTimeout(200);
  e = await chercher("cryochirurgie"); verifier("Codes : « cryochirurgie » trouve 6 actes", e.titres.length === 6, e.titres);
  e = await chercher("STERILET"); verifier("Codes : « STERILET » trouve les actes du stérilet, sans accents ni majuscules ; le curseur reste dans le champ",
    e.titres.length === 3 && e.titres.every(t => /stérilet/i.test(t)) && await p.evaluate(() => document.activeElement.id === "co-q"), e.titres);
  await p.fill("#co-q", ""); await p.click('[data-v="formulaires"]'); await p.waitForTimeout(200); r = await rangees();
  const nCnesst = D.actes.filter(a => /^CNESST/.test(a.n)).length;
  verifier("Codes : « Formulaires et suppléments » commence par le forfait GMF ; les 42 formulaires de la CNESST à la fin",
    nCnesst === 42 && r[0].titre.startsWith("Forfait de prise en charge") && r.slice(-42).every(x => x.titre.startsWith("CNESST")) && !r.slice(0, -42).some(x => x.titre.startsWith("CNESST")), { n: r.length, premier: r[0].titre });
  await p.fill("#co-q", "19914"); await p.waitForTimeout(250); e = await etat();
  verifier("Codes : 19914 cherché dans « Formulaires » mène au demi-per diem, avec un avis", (await p.locator(".co-avis").textContent()).includes("autres groupes") && e.titres.some(t => t.startsWith("Demi-per diem")), e.titres);
  await p.fill("#co-q", ""); await p.click('[data-v="non"]'); await p.waitForTimeout(200); r = await rangees();
  verifier("Codes : les actes non facturables à part sont marqués « Compris », en gris", r.length === D.actes.filter(a => !a.p).length && r.length > 0 && r.every(x => x.valeur === "Compris" && x.grise), r.length);
  await p.click('[data-v="tous"]'); await p.waitForTimeout(200); r = await rangees();
  verifier("Codes : le répertoire s'ouvre sur le forfait horaire ; chaque acte payé a un montant", r.length === D.actes.length && r[0].titre.startsWith("Forfait horaire") && r.filter(x => !x.grise).every(x => /\d,\d{2}( \/ [\d ]+,\d{2})? \$$/.test(x.valeur) || x.valeur === "— $"), r.find(x => !x.grise && !/\$$/.test(x.valeur)));
  // Codes de vulnérabilité : 20 catégories, la 14 fermée ; la source et sa limite sont dites.
  await p.setViewportSize({ width: 320, height: 700 });
  await p.click('.co-vues [data-vue="vulnerabilite"]'); await p.waitForTimeout(200); r = await rangees(); e = await etat();
  verifier("Vulnérabilité : 20 codes de 01 à 20, le 14 fermé et grisé, c'est dit", r.length === 20 && r[0].code === "01" && r[19].code === "20" && r.filter(x => x.grise).map(x => x.code).join() === "14"
    && e.etat === "20 catégories, dont 1 fermée" && r[13].titre.includes("Fermé le 30 juin 2019"), { etat: e.etat, grises: r.filter(x => x.grise).map(x => x.code) });
  const note = await p.textContent("#co-note-vulnerabilite");
  verifier("Vulnérabilité : source et limite indiquées", /FMOQ \(2017\)/.test(note) && /infolettre 171/.test(note) && /source manquante/.test(note), note);
  await p.fill("#co-q", "diabete"); await p.waitForTimeout(250); r = await rangees();
  verifier("Vulnérabilité : « diabete » sans accent trouve le code 05", r.map(x => x.code).join() === "05", r.map(x => x.code));
  await p.fill("#co-q", "FA"); await p.waitForTimeout(250); r = await rangees();
  verifier("Vulnérabilité : « FA » trouve seulement les codes 13 et 14", r.map(x => x.code).join() === "13,14", r.map(x => x.code));
  await p.fill("#co-q", "zzzzq"); await p.waitForTimeout(250);
  verifier("Vulnérabilité : aucun résultat, c'est dit ; rien ne déborde à 320 px", (await p.locator(".cr-vide").count()) === 1 && await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth));
  await p.fill("#co-q", ""); await p.click('.co-vues [data-vue="actes"]'); await p.click('[data-v="tous"]'); await p.waitForTimeout(200);
  verifier("Codes : tous les actes à 320 px, rien ne déborde", await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth));
  verifier("Codes : aucune erreur", erreurs.length === 0, erreurs);
  await ctx.close();
}

/* 7. Guide : recherche, ajouts propres à Morand, fiches du CRDS dans les résultats. */
async function guide(nav) {
  const { ctx, p, erreurs } = await ouvrir(nav, "/guides/", { largeur: 1280, hauteur: 900 });
  await p.fill('input[type="search"]', "SDRC"); await p.waitForTimeout(900);
  const titres = await p.evaluate(() => [...document.querySelectorAll(".guides-resource")].filter(li => li.offsetParent && !li.hidden).map(li => li.dataset.title));
  verifier("Guide : « SDRC » trouve l'article ajouté du Médecin du Québec", titres.some(t => /à l’aide docteur/.test(t)), titres);
  await p.fill('input[type="search"]', "TVP"); await p.waitForTimeout(900);
  verifier("Guide : les fiches du CRDS suivent les résultats des guides", (await p.locator("#gm-crds li").count()) > 0);
  verifier("Guide : les pastilles de sujets ne s'affichent plus (la liste des sujets suffit)", await p.evaluate(() => { const n = document.querySelector(".guides-pastilles"); return !n || getComputedStyle(n).display === "none"; }));
  verifier("Guide : aucune erreur", erreurs.length === 0, erreurs);
  await ctx.close();
  const d = JSON.parse(lire("guides/donnees.json")), page = lire("guides/index.html");
  verifier("Guide : le nombre affiché est celui du catalogue", page.includes(`>${d.filter(x => x.format).length} ressources dans le catalogue<`));
  verifier("Guide : aucun doublon d'adresse dans le catalogue", new Set(d.map(x => x.url)).size === d.length);
}

/* 7 bis. MSK Morand (prototype caché) : l'accueil de l'outil, puis un cas complet de genou, du questionnaire à la note.
   Fille de 15 ans, douleur antérieure graduelle, pire aux escaliers et assise : le syndrome fémoro-patellaire passe en tête. */
async function locomoteur(nav) {
  {
    const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/", { largeur: 390 });
    // Accueil : le bouton et le schéma du corps (zones des 9 régions, avec leur côté), sans tuiles de régions.
    const z = await p.evaluate(() => ({ titre: document.querySelector("h1").textContent, tuiles: document.querySelectorAll(".lo-region").length,
      bouton: document.querySelector(".lo-demarrer a").getAttribute("href"), zones: [...document.querySelectorAll(".lo-planche a")].map(a => a.getAttribute("href")) }));
    const regionsZones = [...new Set(z.zones.flatMap(h => new URL(h, BASE).searchParams.get("plainte").split(",")))];
    verifier("MSK Morand : accueil avec le bouton et le schéma du corps (9 régions cliquables, sans tuiles)",
      z.titre === "MSK Morand" && z.tuiles === 0 && z.bouton === "/locomoteur/consultation/" && regionsZones.length === 9 && z.zones.includes("/locomoteur/consultation/?plainte=genou&cote=D") && !(await deborde(p)), { ...z, regionsZones });
    verifier("MSK Morand : accueil sans erreur", erreurs.length === 0, erreurs);
    await p.click('.lo-planche a[href="/locomoteur/consultation/?plainte=genou&cote=D"]'); await p.waitForSelector('[data-q="genou:cote"]');
    const d = await p.evaluate(() => ({ url: location.pathname, plaintes: [...document.querySelectorAll(".lo-puce[aria-pressed=true][data-region]")].map(b => b.dataset.region),
      cote: document.querySelector('[data-q="genou:cote"][aria-pressed="true"]')?.textContent }));
    verifier("MSK Morand : une zone du schéma ouvre la consultation avec la plainte et son côté (genou droit)", d.url === "/locomoteur/consultation/" && d.plaintes.join() === "genou" && /^Droit/.test(d.cote || ""), d);
    // Cuisse et jambe : la zone ouvre les deux plaintes voisines, du même côté (lien de l'accueil, puis clic dans l'atlas).
    await p.goto(`${BASE}/locomoteur/consultation/?plainte=genou,cheville&cote=G`, { waitUntil: "networkidle" }); await p.waitForSelector('[data-q="cheville:cote"]');
    const jambe = await p.evaluate(() => ({ plaintes: [...document.querySelectorAll(".lo-puce[aria-pressed=true][data-region]")].map(b => b.dataset.region).sort().join(),
      cotes: ["genou", "cheville"].map(r => document.querySelector(`[data-q="${r}:cote"][aria-pressed="true"]`)?.dataset.v).join(),
      zones: document.querySelectorAll('.lo-zone[data-zone="hanche,genou"], .lo-zone[data-zone="genou,cheville"]').length }));
    await p.click('.lo-zone[data-zone="hanche,genou"][data-cote="G"] >> nth=0'); await p.waitForSelector('[data-q="hanche:cote"]'); await p.waitForTimeout(200);
    const cuisse = await p.evaluate(() => ({ plaintes: [...document.querySelectorAll(".lo-puce[aria-pressed=true][data-region]")].map(b => b.dataset.region).sort().join(),
      cote: document.querySelector('[data-q="hanche:cote"][aria-pressed="true"]')?.dataset.v }));
    verifier("MSK Morand : zones cuisse et jambe (8) ; la jambe gauche ouvre genou et cheville à gauche ; la cuisse gauche ajoute la hanche à gauche",
      z.zones.some(h => h.includes("plainte=hanche,genou")) && jambe.zones === 8 && jambe.plaintes === "cheville,genou" && jambe.cotes === "G,G" && cuisse.plaintes === "cheville,genou,hanche" && cuisse.cote === "G", { jambe, cuisse });
    await ctx.close();
    const r = { liens: regionsZones.map(x => `/locomoteur/${x}/`) };
    // Chaque région ouverte : la page se charge sans erreur, calcule, rédige la note et ne déborde pas à 390 px.
    for (const lien of r.liens.filter(l => l !== "/locomoteur/genou/")) {
      const { ctx: c2, p: p2, erreurs: e2 } = await ouvrir(nav, lien, { largeur: 390 });
      const clic = async (q, v) => (await p2.locator(`select[data-q="${q}"]`).count()) ? p2.selectOption(`select[data-q="${q}"]`, v) : p2.click(`button[data-q="${q}"][data-v="${v}"]`);
      const reg = lien.split("/")[2]; await p2.waitForSelector('[data-q="sexe"]');
      await clic("sexe", "M"); await p2.fill("#c-age", "40"); await clic(`${reg}:apparition`, "graduel"); await clic(`${reg}:duree`, "gt3m");
      for (const s of await p2.locator(".lo-bloc-depliable:not([open]) > summary").all()) { if (await s.isVisible()) await s.click(); }
      for (const b of await p2.locator("button[data-normal]").all()) { if (await b.isVisible()) await b.click(); }
      await p2.waitForTimeout(150);
      const x = await p2.evaluate(() => ({ dx: document.querySelectorAll(".lo-dx .lo-dx-item").length, note: document.querySelector("#lo-note").value,
        deborde: document.documentElement.scrollWidth > innerWidth + 1, conduite: document.querySelector("#lo-conduite").textContent.length }));
      verifier(`MSK ${lien} : diagnostics, conduite et note sans erreur ni débordement`, x.dx >= 5 && x.note.startsWith("IDENTIFICATION :") && x.conduite > 50 && !x.deborde && e2.length === 0, { ...x, note: x.note.slice(0, 80), e2 });
      await c2.close();
    }
  }
  for (const largeur of [390, 1280]) {
    const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/genou/", { largeur, hauteur: largeur > 1000 ? 900 : 844 });
    await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
    // Clé d'une réponse : commune (« age ») ou propre à la plainte (« genou:cote »).
    const k = async q => ((await p.locator(`[data-q="genou:${q}"]`).count()) ? `genou:${q}` : q);
    // Ouvre au besoin la partie dépliable qui contient la question, puis répond.
    const clic = async (q, v) => {
      const c = await k(q);
      await p.evaluate(c2 => { for (const d of document.querySelectorAll(`[data-q="${c2}"]`)) { const x = d.closest("details"); if (x && !x.open) x.open = true; } }, c);
      return (await p.locator(`select[data-q="${c}"]`).count()) ? p.selectOption(`select[data-q="${c}"]`, v) : p.click(`button[data-q="${c}"][data-v="${v}"]`);
    };
    await p.waitForSelector('[data-q="sexe"]');
    await clic("sexe", "F"); await p.fill("#c-age", "15"); await clic("cote", "G"); await p.fill("#c-accompagne", "sa mère");
    verifier(`Genou ${largeur} px : avec l'âge et le sexe seulement, les probabilités de départ sont annoncées`, /départ \(femme, 15 ans\)/.test(await p.textContent("#lo-res-etat")));
    verifier(`Genou ${largeur} px : adolescente, la hanche est à examiner`, (await p.textContent(".lo-alertes")).includes("Examiner la hanche"));
    await clic("duree", "s6_12"); await clic("apparition", "graduel"); await p.click('button[data-q="genou:localisation"][data-m="anterieure"]');
    await clic("escaliers", "oui"); await clic("assis", "oui"); await clic("derobade", "non"); await clic("enflure", "non"); await clic("fievre", "non");
    verifier(`Genou ${largeur} px : le mécanisme ne s'affiche qu'après un traumatisme`, await p.locator('[data-qid="genou-mecanisme"]').isHidden());
    verifier(`Genou ${largeur} px : en-tête, intro et pied de page des outils Morand`, await p.evaluate(() => !!document.querySelector(".cr-tete .cr-onglets a[aria-current='page'][href='/locomoteur/']")
      && !!document.querySelector(".cr-intro .cr-nom") && document.querySelector(".cr-pied").textContent.includes("MMXXVI")));
    verifier(`Genou ${largeur} px : les questions du calcul ont un trait doré, les autres non`, await p.evaluate(() =>
      document.querySelector('[data-qid="genou-lachman"]').classList.contains("lo-q-calcul") && !document.querySelector('[data-qid="genou-ex_oedeme"]').classList.contains("lo-q-calcul")));
    await p.click('button[data-q="sport"][data-m="danse"]'); await p.click('button[data-q="sport"][data-m="pivot"]');
    verifier(`Genou ${largeur} px : plusieurs activités physiques à la fois`, (await p.locator('button[data-q="sport"][aria-pressed="true"]').count()) === 2);
    verifier(`Genou ${largeur} px : pas de dominance au genou`, (await p.locator('[data-qid="lateralite"]').count()) === 0);
    // Examen : chaque partie se déplie ; « Tout normal » remplit la palpation, sauf les points facultatifs.
    verifier(`Genou ${largeur} px : les parties de l'examen sont fermées tant qu'on n'y a pas répondu`, !(await p.locator('[data-bloc="genou-examen-3"]').evaluate(e => e.open)));
    await p.click('[data-bloc="genou-examen-3"] > summary'); await p.click('[data-bloc="genou-examen-3"] button[data-normal]');
    verifier(`Genou ${largeur} px : « Tout normal » remplit la palpation, sauf les points facultatifs`,
      (await p.getAttribute('button[data-q="genou:p_rotule"][data-v="non"]', "aria-pressed")) === "true" && (await p.getAttribute('button[data-q="genou:p_facettes"][data-v="non"]', "aria-pressed")) === "false");
    await clic("p_facettes", "oui");
    await clic("flot", "negatif"); await clic("lachman", "normal"); await clic("squat_bi", "ant"); await clic("hanche_ri", "normale");
    await p.click('button[data-q="plan_enseignement"]');
    await p.waitForTimeout(150);
    const r = await p.evaluate(() => ({ tete: document.querySelector(".lo-dx .lo-dx-nom").textContent, cat: document.querySelector(".lo-dx .lo-dx-cat").textContent,
      groupe: document.querySelector(".lo-dx-groupe").textContent, cles: !!document.querySelector(".lo-dx-cles"), note: document.querySelector("#lo-note").value }));
    verifier(`Genou ${largeur} px : syndrome fémoro-patellaire en tête, très probable, à considérer en premier, avec ses éléments clés`,
      r.tete === "Syndrome fémoro-patellaire" && r.cat === "Très probable" && r.groupe === "À considérer en premier" && r.cles, r);
    verifier(`Genou ${largeur} px : la note suit le format clinique (identification, HMA, examen, impression, plan)`,
      r.note.startsWith("IDENTIFICATION :\n- Fille de 15 ans, rencontrée avec sa mère") && r.note.includes("\nRAISON DE CONSULTATION :\nDouleur au genou G")
      && /\nHMA :\n/.test(r.note) && r.note.includes("\nGENOU :\nCôté atteint : gauche\n") && r.note.includes("- Palpation : rotule indolore ; facettes rotuliennes douloureuses")
      && r.note.includes("- LCA : Lachman normal et indolore") && r.note.includes("1- Douleur au genou G subaiguë, non traumatique")
      && r.note.includes("- Syndrome fémoro-patellaire très prob") && r.note.includes("\nPLAN :\n- Enseignement et conseils") && !/%/.test(r.note), r.note.slice(0, 400));
    // Une réponse « N/A » ne compte pas ; un second clic efface la réponse.
    const avant = await p.textContent("#lo-res-etat");
    await clic("marche", "?"); await p.waitForTimeout(80);
    verifier(`Genou ${largeur} px : « N/A » ne compte pas`, (await p.textContent("#lo-res-etat")) === avant, [avant, await p.textContent("#lo-res-etat")]);
    // Traumatisme récent : la règle d'Ottawa demande la radiographie au premier critère.
    await clic("apparition", "subit_trauma"); await clic("duree", "lt7"); await clic("p_perone", "oui"); await p.waitForTimeout(80);
    verifier(`Genou ${largeur} px : règle d'Ottawa positive, radiographie indiquée`, (await p.textContent(".lo-alertes")).includes("Radiographie du genou indiquée"));
    // La fiche du diagnostic s'ouvre ; une suggestion de conduite s'ajoute au plan.
    await p.click(".lo-dx .lo-dx-item summary"); const fiche = p.locator(".lo-dx button[data-fiche]").first();
    if (await fiche.count()) { await fiche.click(); await p.waitForTimeout(300); verifier(`Genou ${largeur} px : la fiche s'ouvre`, (await p.textContent("#lo-fiche h2")).length > 5); await p.click("#lo-fiche .lo-fiche-fermer"); }
    await p.click("#t-conduite"); await p.locator(".lo-plus").first().click(); await p.waitForTimeout(100);
    verifier(`Genou ${largeur} px : « + Plan » ajoute la suggestion au plan`, (await p.inputValue('[data-q="plan_ajouts"]')).length > 10);
    // Copier la note, puis les questions pour OpenEvidence.
    await p.click("#t-note"); await p.click("#lo-copier"); await p.waitForTimeout(150);
    verifier(`Genou ${largeur} px : la note est copiée`, (await p.evaluate(() => navigator.clipboard.readText())).startsWith("IDENTIFICATION :"));
    await p.click("#sources > summary"); await p.waitForTimeout(100);
    verifier(`Genou ${largeur} px : « Sources et limites » s'ouvre, sans bulles de navigation ni bouton OpenEvidence`,
      await p.evaluate(() => document.getElementById("sources").open && !document.querySelector("#lo-nav a") && !document.getElementById("lo-consigne")));
    await p.selectOption("#lo-src-dx", "genou|lca"); await p.waitForTimeout(100);
    verifier(`Genou ${largeur} px : le tableau des sources montre les poids et les combinaisons du diagnostic choisi`, (await p.locator("#lo-table tbody tr").count()) > 20
      && (await p.textContent("#lo-table")).includes("Combinaison : Décary") && (await p.textContent("#lo-table")).includes("Sokal"));
    // Bouton « i » : pourquoi, effet sur le calcul, source et vidéo ; « Équivoque » ne compte pas.
    await p.click('button[data-info="genou|lachman"]'); await p.waitForTimeout(80);
    const info = await p.textContent("#i-genou-lachman");
    verifier(`Genou ${largeur} px : le « i » du Lachman donne l'effet sur le calcul, la source et la vidéo`, info.includes("Effet sur le calcul") && info.includes("Sokal") && info.includes("Physiotutors"), info.slice(0, 200));
    verifier(`Genou ${largeur} px : les tests ont une réponse « Équivoque »`, (await p.locator('button[data-q="genou:lachman"][data-v="equivoque"]').count()) === 1);
    // Deuxième plainte : la cheville s'ajoute, avec son anamnèse, son examen, son DDx et une 2ᵉ impression dans la note.
    await p.click('button[data-region="cheville"]'); await p.waitForSelector('[data-q="cheville:cote"]');
    await p.click('button[data-q="cheville:cote"][data-v="D"]'); await p.click('button[data-q="cheville:apparition"][data-v="graduel"]'); await p.waitForTimeout(150);
    const m = await p.evaluate(() => ({ regions: [...document.querySelectorAll(".lo-dx-region")].map(x => x.dataset.region), note: document.querySelector("#lo-note").value,
      age: document.querySelector("#c-age").value }));
    verifier(`Genou ${largeur} px : une 2ᵉ plainte (cheville) garde l'identification et ajoute son DDx et sa 2ᵉ impression`, m.regions.join() === "genou,cheville" && m.age === "15"
      && m.note.includes("2- Douleur à la cheville D") && m.note.includes("GENOU G :") && m.note.includes("CHEVILLE D :"), { ...m, note: m.note.slice(-400) });
    // Sauvegarde : identifiant sans nom, liste, puis réouverture.
    await p.click("#lo-patients-ouvrir"); await p.fill("#lo-etiquette", "AB-1"); await p.click('#lo-patients-form button[type="submit"]'); await p.waitForTimeout(100);
    verifier(`Genou ${largeur} px : le patient est sauvegardé dans ce navigateur`, (await p.textContent("#lo-patients-liste")).includes("AB-1"));
    await p.click("#lo-patients .lo-fiche-fermer");
    p.once("dialog", dlg => dlg.accept()); await p.click("#lo-nouveau"); await p.waitForTimeout(100);
    verifier(`Genou ${largeur} px : « Nouveau patient » efface tout`, (await p.locator('#lo-form button[data-q][aria-pressed="true"]').count()) === 0 && (await p.inputValue("#c-age")) === "");
    await p.click("#lo-patients-ouvrir"); await p.click('#lo-patients-liste button[data-ouvrir]'); await p.waitForSelector('[data-q="cheville:cote"]'); await p.waitForTimeout(150);
    verifier(`Genou ${largeur} px : le patient sauvegardé se rouvre avec ses deux plaintes`, (await p.inputValue("#c-age")) === "15"
      && (await p.getAttribute('button[data-q="cheville:cote"][data-v="D"]', "aria-pressed")) === "true");
    await p.evaluate(() => localStorage.clear());
    verifier(`Genou ${largeur} px : aucune erreur`, erreurs.length === 0, erreurs);
    await ctx.close();
  }
  {
    /* Épaule : « Graduel » précisé (sans trauma ni faux mouvement) ; règle de définition de la capsulite : une rotation externe
       passive complète et indolore annule ce qui plaide pour elle (raideur racontée, limitations actives). */
    const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/epaule/", { largeur: 390 });
    const g = await p.evaluate(() => document.querySelector('button[data-q="epaule:apparition"][data-v="graduel"]')?.textContent.trim());
    const r = await p.evaluate(() => {
      const LO = window.Locomoteur, d = LO.donnees.epaule;
      const forte = { age: "55", sexe: "F", duree: "s6_12", diabete: "oui", moment: "constante", apparition: "insidieux", raideur_prog: "oui", nocturne: "oui", couche_epaule: "oui", bras_leve: "oui" };
      const cap = rep => LO.calculer(d, rep).diagnostics.find(x => x.x.id === "capsulite").p;
      const res = LO.calculer(d, { ...forte, apparition: "graduel", habillage_matin: "oui", prom_re: "complete", arom_ri: "lim_douleur", arom_ri_deg: "L3", prom_abd: "lim_raideur", prom_abd_deg: "90" });
      return { complete: cap({ ...forte, prom_re: "complete" }), actives: cap({ ...forte, prom_re: "complete", arom_elev: "lim_douleur", arom_re: "lim_douleur" }),
        raideur: cap({ ...forte, prom_re: "lim_raideur" }), note: LO.rediger(d, res) };
    });
    verifier("Épaule : bouton « Graduel » inchangé ; « sans trauma ni faux mouvement » seulement dans la note", g === "Graduel" && /début graduel sans trauma ni faux mouvement/i.test(r.note), { g });
    verifier("Épaule : rotation externe passive complète et indolore, capsulite peu probable même avec une histoire typique et des limitations actives ; limitée par raideur, très probable",
      r.complete < .2 && r.actives < .2 && r.raideur > .8, { complete: r.complete, actives: r.actives, raideur: r.raideur });
    verifier("Épaule : habillage du matin, rotation interne active (niveau du pouce) et abduction passive dans la note",
      r.note.includes("difficulté à s'habiller le matin") && r.note.includes("rotation interne limitée (pouce à L3) avec douleur") && r.note.includes("abduction limitée à ~90°, raideur"), { note: r.note.slice(0, 1500) });
    const up = await p.evaluate(() => { const LO = window.Locomoteur, d = LO.donnees.epaule, q = d.parQ.uppercut, b = { age: "45", sexe: "M" };
      const bic = rep => LO.calculer(d, rep).diagnostics.find(x => x.x.id === "biceps").p;
      return { existe: !!q, g: q && q.effets[0].g, base: bic(b), pos: bic({ ...b, uppercut: "oui" }), neg: bic({ ...b, uppercut: "non" }) }; });
    verifier("Épaule : Uppercut (long biceps), dans le groupe des tests du biceps ; positif fait monter, négatif fait baisser",
      up.existe && up.g === "biceps-ex" && up.pos > up.base && up.neg < up.base, up);
    const hy = await p.evaluate(() => { const LO = window.Locomoteur, d = LO.donnees.epaule, pr = rep => LO.calculer(d, rep).diagnostics.find(x => x.x.id === "ppr").p;
      const base = { age: "70", sexe: "F", cote: "B", raideur_ceintures: "oui", raideur: "plus30", crp_vs: "oui" };
      return { jerk: !!d.parQ.jerk, kim: !!d.parQ.kim, haut: pr({ ...base, raideur45: "oui", hanches_ppr: "oui", fr_ccp_neg: "oui", autres_articulations: "non" }),
        bas: pr({ ...base, raideur45: "non", hanches_ppr: "oui", fr_ccp_neg: "non", autres_articulations: "oui" }) }; });
    verifier("Épaule : Jerk et Kim ajoutés ; score EULAR/ACR de la polymyalgia (4 ou plus : probable ; moins de 4 : peu probable)", hy.jerk && hy.kim && hy.haut > .5 && hy.bas < .2, hy);
    verifier("Épaule : aucune erreur", erreurs.length === 0, erreurs);
    // Amplitudes ajoutées dans les autres régions (surtout passives ; pas de rotations actives à la hanche), présentes et dans la note.
    const n = { cervical: ["arom_flexion", "arom_inclinaison"], coude: ["prom_flexion", "prom_extension", "prom_pronation", "prom_supination"],
      poignet: ["prom_flexion", "prom_extension", "prom_dev_rad", "prom_dev_uln"], lombaire: ["arom_inclinaison", "arom_rotation"], hanche: ["prom_flexion", "prom_extension"],
      cheville: ["prom_df", "prom_fp"], pied: ["prom_mtp1_flex"] }, amp = [];
    const tests = { poignet: ["ext_mc1", "add_mc1", "synergie_ecu"], hanche: ["hec", "piri_actif", "piri_assis", "compression_pelvienne", "thomas"],
      genou: ["apprehension_inv", "tilt", "quad_actif"], lombaire: ["p_symphyse", "trendelenburg_mod"], cheville: ["cait", "liu"] }, hyTests = [];
    for (const [reg, ids] of Object.entries(n)) {
      await p.goto(`${BASE}/locomoteur/${reg}/`, { waitUntil: "networkidle" });
      amp.push(await p.evaluate(([reg, ids]) => { const LO = window.Locomoteur, d = LO.donnees[reg];
        return [reg, ids.every(id => d.parQ[id] && d.parQ[id].effets.length === 0), LO.rediger(d, LO.calculer(d, Object.fromEntries(ids.map(id => [id, "lim_douleur"])))).includes(" limitée"),
          !Object.keys(d.parQ).some(k => reg === "hanche" && /^arom_(re|ri)$/.test(k)) && (reg !== "hanche" || (!!d.parQ.thomas && /Thomas modifié positif/.test(LO.rediger(d, LO.calculer(d, { thomas: "genou" })))))]; }, [reg, ids]));
      if (tests[reg]) hyTests.push(await p.evaluate(([reg, ids]) => { const LO = window.Locomoteur, d = LO.donnees[reg];
        const pitt = reg !== "genou" || ["Règle de Pittsburgh négative", "Radiographie du genou indiquée (règle de Pittsburgh)"].every((t, i) =>
          LO.calculer(d, { age: i ? "60" : "30", apparition: "subit_trauma", duree: "lt7", mecanisme: "direct", ott_4pas: "non" }).alertes.some(a => a.titre === t));
        return [reg, ids.filter(id => !d.parQ[id]), pitt, !d.parQ.pelvic_comp]; }, [reg, tests[reg]]));
    }
    verifier("Amplitudes ajoutées (cervical, coude, poignet, lombaire, hanche, cheville, pied) : présentes, sans poids, dans la note ; pas de rotations actives à la hanche ; test de Thomas",
      amp.length === 7 && amp.every(([, ok, note, sansRot]) => ok && note && sansRot) && erreurs.length === 0, { amp, erreurs });
    await p.goto(`${BASE}/locomoteur/genou/`, { waitUntil: "networkidle" });
    hyTests.push(await p.evaluate(ids => { const LO = window.Locomoteur, d = LO.donnees.genou;
      const pitt = ["Règle de Pittsburgh négative", "Radiographie du genou indiquée (règle de Pittsburgh)"].every((t, i) =>
        LO.calculer(d, { age: i ? "60" : "30", apparition: "subit_trauma", duree: "lt7", mecanisme: "direct", ott_4pas: "non" }).alertes.some(a => a.titre === t));
      return ["genou", ids.filter(id => !d.parQ[id]), pitt, true]; }, tests.genou));
    verifier("Tests high yield ajoutés (poignet, hanche, genou, lombaire, cheville) présents ; règle de Pittsburgh ; ancienne compression du nerf cutané retirée",
      hyTests.length === 5 && hyTests.every(([, manquants, pitt, retire]) => !manquants.length && pitt && retire), hyTests);
    await ctx.close();
  }
}

/* 8. Mode sombre : les textes restent lisibles (contraste d'au moins 3 pour 1) sur chaque page. */
async function sombre(nav) {
  for (const u of ["/", "/guides/", "/guides/ressources-communautaires/", "/crds/", "/codes/", "/confidentialite/", "/merci/", "/locomoteur/", "/locomoteur/genou/"]) {
    const { ctx, p } = await ouvrir(nav, u, { sombre: true });
    if (u === "/merci/") await p.waitForTimeout(2600);   // les entrées en fondu
    const r = await p.evaluate(() => { const lum = c => { const m = c.match(/[\d.]+/g).map(Number), f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(m[0]) + .7152 * f(m[1]) + .0722 * f(m[2]); };
      const fond = e => { while (e) { const m = getComputedStyle(e).backgroundColor.match(/[\d.]+/g); if (m && (m.length < 4 || +m[3] > .5)) return getComputedStyle(e).backgroundColor; e = e.parentElement; } return "rgb(255,255,255)"; };
      const faibles = [];
      for (const e of document.querySelectorAll("body *")) { if (!e.offsetParent) continue; const t = [...e.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(" "); if (!t || /^\p{Extended_Pictographic}+$/u.test(t)) continue;
        const cs = getComputedStyle(e), b = e.getBoundingClientRect(); if (+cs.opacity < .1 || cs.visibility === "hidden" || b.width < 2 || b.height < 2) continue;
        const a = lum(cs.color), f = lum(fond(e)), c = (Math.max(a, f) + .05) / (Math.min(a, f) + .05); if (c < 3) faibles.push(`${t.slice(0, 24)} (${c.toFixed(1)})`); }
      return { page: getComputedStyle(document.body).backgroundColor, faibles: [...new Set(faibles)].slice(0, 6) }; });
    const m = r.page.match(/\d+/g).map(Number);
    verifier(`${u} en mode sombre : le fond est sombre`, m[0] + m[1] + m[2] < 150, r.page);
    verifier(`${u} en mode sombre : textes lisibles`, r.faibles.length === 0, r.faibles);
    await ctx.close();
  }
}

/* 9. Fichiers : référencement, sécurité du contenu, service worker, plan du site (sans navigateur). */
function fichiers() {
  for (const [f, canon] of [["index.html", "/"], ["guides/index.html", "/guides/"], ["guides/ressources-communautaires/index.html", "/guides/ressources-communautaires/"], ["crds/index.html", "/crds/"], ["codes/index.html", "/codes/"], ["confidentialite/index.html", "/confidentialite/"]]) {
    const h = lire(f);
    verifier(`${f} : adresse canonique sous www.morand.org`, h.includes(`<link rel="canonical" href="https://www.morand.org${canon}">`));
    verifier(`${f} : une description`, /<meta name="description" content="[^"]{50,}">/.test(h));
    let ok = true; for (const [, j] of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(j); } catch (e) { ok = false; } }
    verifier(`${f} : données structurées valides`, ok);
  }
  verifier("map/index.html : adresse canonique laissée à Trouve ta clinique", lire("map/index.html").includes('<link rel="canonical" href="https://trouvetaclinique.ca/monteregie/">'));
  // Pages écrites pour Morand : politique de sécurité stricte, donc ni style en ligne ni script en ligne.
  for (const f of ["index.html", "crds/index.html", "codes/index.html", "confidentialite/index.html", "merci/index.html", "locomoteur/index.html", "locomoteur/genou/index.html", "capitales/index.html"]) {
    const h = lire(f);
    verifier(`${f} : politique de sécurité du contenu présente`, /Content-Security-Policy" content="default-src 'self'/.test(h));
    verifier(`${f} : aucun attribut style, aucun script en ligne`, !/\sstyle="/.test(h) && !/<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>/.test(h));
    // Scripts, feuilles de style, images et cadres : tous de ce site (les liens <a> vers les sources sont permis).
    const ressources = [...h.matchAll(/<(?:script|img|iframe|source|video|audio|embed|object)\b[^>]*\s(?:src|data)="([^"]+)"|<link\b(?![^>]*rel="canonical")[^>]*\shref="([^"]+)"/g)].map(m => m[1] || m[2]);
    verifier(`${f} : aucune ressource d'un autre site`, ressources.length > 0 && ressources.every(x => x.startsWith("/") && !x.startsWith("//")), ressources.filter(x => !x.startsWith("/")));
  }
  const sw = lire("sw.js"), liste = JSON.parse("[" + sw.match(/const FICHIERS = \[([\s\S]*?)\];/)[1] + "]");
  const absents = liste.filter(u => !fs.existsSync(path.join(RACINE, u.endsWith("/") ? u + "index.html" : u)));
  verifier("service worker : chaque fichier à garder existe", absents.length === 0, absents);
  const plan = [...lire("sitemap.xml").matchAll(/<loc>https:\/\/www\.morand\.org(\/[^<]*)<\/loc>/g)].map(m => m[1]);
  verifier("plan du site : accueil, Guide, ressources, CRDS, Codes, confidentialité et Wealth", ["/", "/wealth/", "/guides/", "/guides/ressources-communautaires/", "/crds/", "/codes/", "/confidentialite/"].every(u => plan.includes(u)) && !plan.includes("/map/"), plan);
  // Jusqu'aux bords (viewport-fit=cover) seulement dans l'app installée : dans Safari (iOS 26), la barre d'adresse flottante couvrirait le pied.
  for (const f of ["index.html", "merci/index.html"]) {
    const h = lire(f);
    verifier(`${f} : pas de « viewport-fit=cover » dans le navigateur ; ajouté par plein-ecran.js dans l'app installée`, !h.includes("viewport-fit=cover") && h.indexOf('<script src="/morand/plein-ecran.js"></script>') > h.indexOf('name="viewport"'));
  }
  verifier("plein-ecran.js : n'ajoute « cover » qu'en mode app installée", /display-mode: standalone/.test(lire("morand/plein-ecran.js")) && /viewport-fit=cover/.test(lire("morand/plein-ecran.js")));
  verifier("remerciements : page cachée (non indexée, absente du plan du site)", lire("merci/index.html").includes('<meta name="robots" content="noindex,nofollow">') && !plan.includes("/merci/"));
  verifier("MSK Morand : pages publiques (indexées, au plan du site et à l'accueil)", ["locomoteur/index.html", "locomoteur/genou/index.html"].every(f => !lire(f).includes("noindex"))
    && plan.includes("/locomoteur/") && plan.includes("/locomoteur/consultation/") && lire("index.html").includes('href="/locomoteur/"'));
  verifier("Quiz et Morandle : pages publiques (indexées, au plan du site, liées de l'accueil et du hub MSK, liées entre elles)",
    ["entrainement/index.html", "locomoteur/morandle/index.html"].every(f => !lire(f).includes("noindex")) && plan.includes("/entrainement/") && plan.includes("/locomoteur/morandle/")
    && ["index.html", "locomoteur/index.html"].every(f => lire(f).includes('href="/entrainement/"') && lire(f).includes('href="/locomoteur/morandle/"'))
    && lire("entrainement/index.html").includes('href="/locomoteur/morandle/"') && lire("locomoteur/morandle/index.html").includes('href="/entrainement/"'));
  const pays = JSON.parse(lire("capitales/pays.json"));
  verifier("Capitales : page cachée (non indexée, absente du plan du site, liée de nulle part)", lire("capitales/index.html").includes('<meta name="robots" content="noindex, nofollow">') && !plan.includes("/capitales/")
    && ["index.html", "locomoteur/index.html", "entrainement/index.html"].every(f => !lire(f).includes("/capitales/")));
  verifier("Capitales : 195 pays uniques, chacun avec capitale, truc et fait", pays.length === 195 && new Set(pays.map(p => p.pays)).size === 195 && pays.every(p => p.capitales.length && p.memo && p.fait && p.continent && Array.isArray(p.villes) && !p.villes.some(v => p.capitales.includes(v))));
  verifier("robots.txt : annonce le plan du site", lire("robots.txt").includes("Sitemap: https://www.morand.org/sitemap.xml"));
  const m = JSON.parse(lire("manifest.webmanifest"));
  verifier("manifeste : un raccourci par outil, icônes présentes", m.shortcuts.map(s => s.url).join() === "/wealth/,/guides/,/map/,/crds/,/codes/" && m.shortcuts.every(s => fs.existsSync(path.join(RACINE, s.icons[0].src))), m.shortcuts.map(s => s.url));
  verifier("dépôt : CNAME et .nojekyll", lire("CNAME").trim() === "www.morand.org" && fs.existsSync(path.join(RACINE, ".nojekyll")));
}

/* MSK Morand : fiches high yield (bibliothèque, fiche, lien depuis le calcul). */
async function fichesHY(nav) {
  for (const largeur of [390, 1280]) {
    const { ctx, p, erreurs, statut } = await ouvrir(nav, "/locomoteur/cervical/fiches/", { largeur });
    const n = await p.locator(".hy-carte").count();
    verifier(`fiches ${largeur} : bibliothèque cervicale (26 fiches, sans erreur ni débordement)`, statut === 200 && n === 26 && !erreurs.length && !(await deborde(p)), { statut, n, erreurs });
    await p.click(".hy-carte >> nth=7"); await p.waitForLoadState("load");
    const f = await p.evaluate(() => ({ cases: document.querySelectorAll(".hy-case").length, appels: [...document.querySelectorAll(".hy-appel a")].map(a => a.getAttribute("href")),
      refs: [...document.querySelectorAll(".hy-refs li")].map(li => `#${li.id}`), img: document.querySelector(".hy-planche img").naturalWidth, titre: document.querySelector(".hy-titre").textContent }));
    verifier(`fiches ${largeur} : fiche C8 (8 encadrés, planche, appels reliés aux références)`, f.cases === 8 && f.img > 0 && f.appels.length > 0 && f.appels.every(h => f.refs.includes(h)) && !(await deborde(p)), f);
    await ctx.close();
  }
  {
    // Deux séries dans une région (poignet et main) et renvoi d'une fiche à l'autre (M11 → P11).
    const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/poignet/fiches/", { largeur: 390 });
    const r = await p.evaluate(() => ({ cartes: document.querySelectorAll(".hy-carte").length, series: document.querySelectorAll(".hy-serie").length }));
    verifier("fiches : bibliothèque du poignet et de la main (45 fiches, 2 séries)", r.cartes === 45 && r.series === 2 && !erreurs.length && !(await deborde(p)), { ...r, erreurs });
    await p.click(".hy-carte:has-text('M11')"); await p.waitForLoadState("load");
    const renvoi = await p.evaluate(() => [...document.querySelectorAll(".hy-renvoi a")].map(a => a.getAttribute("href")));
    verifier("fiches : le renvoi M11 mène à la fiche P11", renvoi.some(h => /\/locomoteur\/poignet\/fiches\/p11-/.test(h)), renvoi);
    await ctx.close();
  }
  const { ctx, p } = await ouvrir(nav, "/locomoteur/cervical/");
  const lien = await p.evaluate(() => (window.Locomoteur.fichesHY.cervical || {}).radiculopathie);
  verifier("fiches : le calcul cervical connaît la fiche de la radiculopathie", !!lien && /\/locomoteur\/cervical\/fiches\/c8-/.test(lien.u), lien);
  const inf = await p.evaluate(() => (window.Locomoteur.fichesInfiltration.cervical || {}).arnold);
  const pdf = inf && await p.request.get(new URL(inf.u, p.url()).href);
  verifier("fiches : le calcul cervical connaît la fiche d'infiltration du nerf d'Arnold (PDF servi)", !!inf && pdf.status() === 200 && /pdf/.test(pdf.headers()["content-type"]), inf);
  await ctx.close();
  {
    // Fiches d'infiltration pour le médecin : vue d'ensemble, puis 31 fiches par région.
    const { ctx: c2, p: p2, erreurs, statut } = await ouvrir(nav, "/locomoteur/infiltrations/", { largeur: 390 });
    const n = await p2.locator(".hy-patients a").count();
    verifier("fiches : bibliothèque des infiltrations (32 PDF, sans erreur ni débordement)", statut === 200 && n === 32 && !erreurs.length && !(await deborde(p2)), { statut, n, erreurs });
    await c2.close();
  }
}

/* MSK Morand : importer une note sans IA (analyse, confirmation, remplissage). */
async function importer(nav) {
  const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/consultation/", { largeur: 390 });
  await p.click("#lo-importer-ouvrir");
  await p.fill("#lo-import-texte", "Femme 34 ans, genou droit depuis 3 semaines après un pivot au soccer. Pas de blocage. Lachman positif, McMurray négatif. Pas de fièvre. Au deuxième examen, Lachman négatif.");
  await p.click("#lo-import-analyser"); await p.waitForSelector("#lo-import-appliquer");
  const r = await p.evaluate(() => ({ regions: [...document.querySelectorAll("input[data-region]")].map(i => i.dataset.region),
    lignes: document.querySelectorAll(".lo-importer-liste li").length, conflits: [...document.querySelectorAll(".lo-importer-liste li")].filter(li => /Contradiction/.test(li.textContent)).map(li => li.querySelector("input").checked) }));
  verifier("Importer : la note de genou est reconnue (plainte ajoutée, contradiction décochée)", r.regions.join() === "genou" && r.lignes >= 7 && r.conflits.length > 0 && r.conflits.every(c => !c) && !(await deborde(p)), r);
  await p.click("#lo-import-appliquer"); await p.waitForSelector('[data-q="genou:lachman"]', { state: "attached" });
  const f = await p.evaluate(() => ({ age: document.querySelector('input[data-q="age"]').value, lachman: document.querySelector('[data-q="genou:lachman"][aria-pressed="true"]')?.dataset.v,
    blocage: document.querySelector('[data-q="genou:blocage"][aria-pressed="true"]')?.dataset.v, mcmurray: document.querySelector('[data-q="genou:mcmurray"][aria-pressed="true"]')?.dataset.v || document.querySelector('select[data-q="genou:mcmurray"]')?.value,
    ouvert: document.getElementById("lo-importer").open }));
  verifier("Importer : les éléments cochés remplissent le formulaire (âge, blocage, McMurray) ; le Lachman contradictoire reste vide", f.age === "34" && !f.lachman && f.blocage === "non" && f.mcmurray === "negatif" && !f.ouvert && !erreurs.length, { ...f, erreurs });
  // Une deuxième note ajoute une plainte ; une réponse déjà donnée autrement est décochée.
  await p.click("#lo-importer-ouvrir");
  await p.fill("#lo-import-texte", "Homme 58 ans, épaule gauche depuis 4 mois. Hawkins positif, Neer positif. Coude : amplitudes complètes et indolores.");
  await p.click("#lo-import-analyser"); await p.waitForSelector("#lo-import-appliquer");
  const e = await p.evaluate(() => ({ regions: [...document.querySelectorAll("input[data-region]")].map(i => `${i.dataset.region}${i.disabled ? "" : "+"}${i.checked ? "✓" : ""}`),
    age: [...document.querySelectorAll(".lo-importer-liste li")].filter(li => /Déjà répondu/.test(li.textContent)).map(li => li.querySelector("input").checked) }));
  await p.click("#lo-import-appliquer"); await p.waitForSelector('[data-q="epaule:neer"]', { state: "attached" });
  const neer = await p.evaluate(() => ({ neer: document.querySelector('[data-q="epaule:neer"][aria-pressed="true"]')?.dataset.v, age: document.querySelector('input[data-q="age"]').value,
    plaintes: [...document.querySelectorAll(".lo-puce[aria-pressed=true][data-region]")].map(b => b.dataset.region) }));
  verifier("Importer : une note d'épaule ajoute la plainte (le coude examiné normal reste décoché), sans écraser l'âge déjà inscrit", e.regions.join() === "genou✓,epaule+✓,coude+" && e.age.length && e.age.every(c => !c) && neer.neer === "oui" && neer.age === "34"
    && neer.plaintes.includes("epaule") && neer.plaintes.includes("genou") && !neer.plaintes.includes("coude"), { e, neer });
  await ctx.close();
}

/* Entraînement clinique : modes, points, chrono (horloge simulée), défi quotidien, interruption, mode éditeur. */
async function entrainement(nav) {
  const etatJeu = p => p.evaluate(() => ({ ecran: document.body.dataset.ecran, score: document.querySelector("#en-score").textContent, position: document.querySelector("#en-position").textContent,
    verdict: (document.querySelector(".en-verdict") || {}).textContent || "", bon: !!document.querySelector(".en-retour-bon"), faux: !!document.querySelector(".en-retour-faux") }));
  {
    const { ctx, p, erreurs } = await ouvrir(nav, "/entrainement/", { largeur: 390 });
    const a = await p.evaluate(() => ({ modes: document.querySelectorAll("#en-accueil .en-mode").length, regions: document.querySelectorAll("#en-region option").length,
      titre: document.title, noindex: document.querySelector('meta[name="robots"]').content, total: document.querySelector("#en-region option").textContent }));
    verifier("Entraînement : accueil (5 modes, 9 régions, page indexée)", a.modes === 5 && a.regions === 10 && /^index/.test(a.noindex) && /\d cartes/.test(a.total) && !erreurs.length, { ...a, erreurs });
    // Audit : les cartes retirées ne comptent pas dans le jeu ; une définition s'affiche sous l'énoncé des termes pointus.
    const au = await p.evaluate(async () => {
      const i = await (await fetch("/entrainement/banque/index.json")).json(), c = i.paquets.find(x => x.cle === "msk-cervical");
      const b = await (await fetch(c.fichier)).json();
      return { option: document.querySelector('#en-region option[value="msk-cervical"]').textContent, jouables: c.jouables, retirees: b.cartes.filter(x => x.retrait).length,
        attendues: b.cartes.filter(x => x.statut !== "experimentale" && !x.retrait).length, jugees: b.cartes.filter(x => x.pertinence === undefined).length };
    });
    verifier("Entraînement : audit du rachis cervical (cartes retirées hors du jeu, toutes jugées)", au.retirees > 0 && au.jouables === au.attendues && au.option.includes(`(${au.jouables})`) && au.jugees === 0, au);
    await p.selectOption("#en-region", "msk-cervical"); await p.click('[data-mode="libre"]'); await p.waitForSelector("#en-partie:not([hidden])");
    let def = "";
    for (let i = 0; i < 80 && !def; i++) {
      def = await p.evaluate(() => (document.querySelector("#en-definition").hidden ? "" : document.querySelector("#en-definition").textContent));
      if (!def) { await p.keyboard.press("2"); await p.waitForSelector(".en-verdict"); await p.click("#en-suivante"); }
    }
    verifier("Entraînement : la définition d'un terme pointu s'affiche sous l'énoncé", def.length > 20, def);
    await p.click("#en-quitter"); await p.click("#en-changer"); await p.selectOption("#en-region", "");
    // Entraînement libre : réponse au clavier, rétroaction, explication, références, passage manuel.
    await p.click('button[data-mode="libre"]'); await p.waitForSelector("#en-partie:not([hidden])");
    await p.keyboard.press("1"); await p.waitForSelector(".en-verdict");
    const l = await etatJeu(p);
    const refs = await p.evaluate(() => document.querySelectorAll(".en-refs li").length);
    verifier("Entraînement : la touche 1 répond, la rétroaction donne la réponse attendue et les références", (l.bon || l.faux) && /Réponse|Bonne/.test(l.verdict) && refs > 0 && (l.bon ? +l.score.replace(/\s/g, "") >= 100 : l.score === "0"), { ...l, refs });
    await p.click("#en-suivante"); await p.waitForTimeout(100);
    verifier("Entraînement : « Question suivante » montre la carte 2", /Question 2/.test((await etatJeu(p)).position), await etatJeu(p));
    // Série parfaite : on répond jusqu'à la première erreur, le record est gardé.
    await p.click("#en-quitter"); await p.click("#en-changer"); await p.click('[data-mode="serie"]');
    // Hors contre-la-montre, l'explication reste jusqu'au bouton (ou Entrée) ; le dernier bouton mène au bilan.
    await p.keyboard.press("1"); await p.waitForSelector(".en-verdict"); await p.waitForTimeout(3500);
    const reste = await p.evaluate(() => ({ verdict: !!document.querySelector(".en-verdict"), bouton: !document.querySelector("#en-suivante").hidden, ecran: document.body.dataset.ecran }));
    verifier("Entraînement : hors contre-la-montre, l'explication reste affichée (3,5 s après) jusqu'au bouton", reste.verdict && reste.bouton && reste.ecran === "partie", reste);
    let dernier = await p.textContent("#en-suivante"); await p.keyboard.press("Enter"); await p.waitForTimeout(150);
    for (let i = 1; i < 60 && (await etatJeu(p)).ecran === "partie"; i++) {
      await p.keyboard.press(["1", "2", "3"][i % 3]); await p.waitForSelector("#en-suivante:not([hidden])");
      dernier = await p.textContent("#en-suivante"); await p.keyboard.press("Enter"); await p.waitForTimeout(150);
    }
    verifier("Entraînement : à la fin de la série, le bouton devient « Voir le bilan »", /Voir le bilan/.test(dernier), dernier);
    const sr = await p.evaluate(() => ({ ecran: document.body.dataset.ecran, sur: document.querySelector("#en-res-sur").textContent, rec: JSON.parse(localStorage.getItem("morand-entrainement-v1")).records.serie }));
    verifier("Entraînement : la série parfaite s'arrête à la première erreur et garde le record", sr.ecran === "resultats" && /Série parfaite/.test(sr.sur) && sr.rec && sr.rec.valeur >= 0, sr);
    verifier("Entraînement : résultats sans débordement ni erreur", !(await deborde(p)) && !erreurs.length, erreurs);
    await ctx.close();
  }
  {
    // Contre-la-montre 30 s avec une horloge simulée ; le chrono s'arrête quand l'onglet est caché.
    const ctx = await nav.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
    const p = await ctx.newPage(), erreurs = []; p.on("pageerror", e => erreurs.push(String(e)));
    await p.clock.install(); await p.goto(`${BASE}/entrainement/`); await p.waitForSelector("#en-accueil:not([hidden])");
    await p.click('[data-duree="30"]'); await p.waitForSelector("#en-partie:not([hidden])");
    await p.clock.runFor(10000);
    const c1 = await p.textContent("#en-chrono");
    await p.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, get: () => true }); document.dispatchEvent(new Event("visibilitychange")); });
    await p.clock.runFor(15000);
    const pause = await p.textContent("#en-chrono");
    await p.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, get: () => false }); document.dispatchEvent(new Event("visibilitychange")); });
    await p.keyboard.press("2"); await p.clock.runFor(2000);
    await p.clock.runFor(25000);
    const r = await p.evaluate(() => ({ ecran: document.body.dataset.ecran, sur: document.querySelector("#en-res-sur").textContent, q: document.querySelectorAll(".en-stat").length,
      rec: JSON.parse(localStorage.getItem("morand-entrainement-v1")).records["chrono-30"] }));
    verifier("Entraînement : chrono 30 s (20 s restantes après 10 s, en pause onglet caché, fin et record)", c1 === "20 s" && pause === "20 s" && r.ecran === "resultats" && /30 s/.test(r.sur) && r.rec, { c1, pause, ...r, erreurs });
    await ctx.close();
  }
  {
    // Défi quotidien : 10 cartes, résultat du jour gardé une seule fois.
    const { ctx, p } = await ouvrir(nav, "/entrainement/", { largeur: 390 });
    await p.click('[data-mode="defi"]'); await p.waitForSelector("#en-partie:not([hidden])");
    const pos = (await etatJeu(p)).position;
    for (let i = 0; i < 12 && (await etatJeu(p)).ecran === "partie"; i++) {
      await p.keyboard.press("1"); await p.waitForSelector("#en-suivante:not([hidden])"); await p.keyboard.press("Enter"); await p.waitForTimeout(150);
    }
    const d = await p.evaluate(() => ({ ecran: document.body.dataset.ecran, lead: document.querySelector("#en-res-lead").textContent, n: document.querySelector(".en-stat:nth-child(3) .en-stat-val").textContent }));
    await p.click("#en-changer");
    const fait = await p.textContent('[data-record="defi"]');
    verifier("Entraînement : défi quotidien de 10 cartes, résultat du jour enregistré", /Question 1 \/ 10/.test(pos) && d.ecran === "resultats" && /\/ 10/.test(d.n) && /enregistré/.test(d.lead) && /^Fait/.test(fait), { pos, ...d, fait });
    await ctx.close();
  }
  {
    // Mode éditeur (?editeur=1) : décision « Valider » gardée et exportable.
    const { ctx, p, erreurs } = await ouvrir(nav, "/entrainement/?editeur=1", { largeur: 390 });
    const ed = await p.isVisible("#en-editeur");
    await p.click('[data-mode="libre"]'); await p.waitForSelector("#en-partie:not([hidden])"); await p.keyboard.press("2"); await p.waitForSelector(".en-ed-carte");
    await p.click('[data-decider="validee"]');
    const dec = await p.evaluate(() => JSON.parse(localStorage.getItem("morand-entrainement-v1")).editeur);
    const statut = await p.evaluate(() => { document.querySelector("#en-suivante").click(); return true; });
    verifier("Entraînement : mode éditeur (panneau, décision « validée » gardée)", ed && Object.values(dec).some(x => x.statut === "validee") && statut && !erreurs.length, { ed, dec, erreurs });
    await ctx.close();
  }
}

/* Base de données OpenEvidence (page non indexée) : 4 sources chargées, recherche, filtre par région, références reliées. */
async function baseDonnees(nav) {
  const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/donnees/?q=lachman", { largeur: 390 });
  await p.waitForSelector(".bd-carte");
  const r = await p.evaluate(() => ({ compte: document.querySelector("#bd-compte").textContent, cartes: document.querySelectorAll(".bd-carte").length,
    liens: document.querySelectorAll(".bd-refs a[href^='http']").length, sources: document.querySelectorAll(".bd-puce").length, robots: document.querySelector('meta[name="robots"]').content }));
  await p.fill("#bd-q", ""); await p.selectOption("#bd-region", "pied"); await p.waitForTimeout(300);
  const pied = await p.evaluate(() => [...document.querySelectorAll(".bd-carte .bd-meta span:nth-child(2)")].every(s => s.textContent === "Pied") && document.querySelectorAll(".bd-carte").length > 0);
  verifier("Base de données : 4 sources (plus de 1 000 données), recherche « lachman » avec références reliées, filtre par région, page non indexée",
    /sur \d[\s\u202f\u00a0]?\d{3}/.test(r.compte) && r.cartes > 3 && r.liens > 3 && r.sources === 4 && /noindex/.test(r.robots) && pied && !erreurs.length && !(await deborde(p)), { ...r, pied, erreurs });
  await ctx.close();
}

/* MSK Morand : atlas de la douleur (zone touchée → plainte et côté). */
async function atlas(nav) {
  const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/genou/", { largeur: 390 });
  const cote = async r => p.evaluate(r2 => document.querySelector(`[data-q="${r2}:cote"][aria-pressed="true"]`)?.textContent, r);
  await p.click('.lo-zone[data-zone="genou"][data-cote="G"]'); await p.waitForTimeout(200);
  const g = await cote("genou");
  await p.click('.lo-zone[data-zone="genou"][data-cote="D"]'); await p.waitForTimeout(200);
  const deux = await cote("genou");
  await p.click('.lo-zone[data-zone="epaule"][data-cote="D"] >> nth=0'); await p.waitForSelector('[data-q="epaule:cote"]');
  const plaintes = await p.evaluate(() => [...document.querySelectorAll(".lo-puce[aria-pressed=true]")].map(b => b.dataset.region));
  verifier("Atlas : genou gauche, puis les deux ; l'épaule droite ajoute la plainte avec son côté",
    g === "Gauche" && deux === "Les deux" && plaintes.includes("epaule") && (await cote("epaule")) === "Droite" && !erreurs.length && !(await deborde(p)), { g, deux, plaintes, erreurs });
  // Plusieurs zones à la suite : la page ne défile pas, les sections des plaintes s'ouvrent plus bas.
  const zone = s => p.evaluate(s2 => { const z = document.querySelector(s2); z.scrollIntoView({ block: "center" }); return scrollY; }, s);
  const y0 = await zone('.lo-zone[data-zone="hanche"][data-cote="G"]');
  await p.click('.lo-zone[data-zone="hanche"][data-cote="G"]'); await p.waitForSelector("#s-p-hanche");
  await p.click('.lo-zone[data-zone="cheville"][data-cote="G"] >> nth=0'); await p.waitForSelector("#s-p-cheville"); await p.waitForTimeout(200);
  const apres = await p.evaluate(() => ({ y: scrollY, ouvertes: ["hanche", "cheville"].every(r => document.getElementById(`s-p-${r}`).open) }));
  verifier("Atlas : deux zones de suite ajoutent leurs plaintes, sections ouvertes, sans défilement", Math.abs(apres.y - y0) < 4 && apres.ouvertes, { y0, ...apres });
  // Second clic : décoche. Genou « Les deux » → droit décoché → gauche seul ; gauche décoché → plainte retirée ; idem pour la hanche.
  await p.click('.lo-zone[data-zone="genou"][data-cote="D"] >> nth=0'); await p.waitForTimeout(200);
  const gSeul = await cote("genou");
  await p.click('.lo-zone[data-zone="genou"][data-cote="G"] >> nth=0'); await p.waitForTimeout(200);
  await p.click('.lo-zone[data-zone="hanche"][data-cote="G"] >> nth=0'); await p.waitForTimeout(200);
  const reste = await p.evaluate(() => [...document.querySelectorAll(".lo-puce[aria-pressed=true][data-region]")].map(b => b.dataset.region));
  verifier("Atlas : un second clic décoche le côté, puis retire la plainte", gSeul === "Gauche" && !reste.includes("genou") && !reste.includes("hanche") && reste.includes("epaule") && reste.includes("cheville"), { gSeul, reste });
  await ctx.close();
}

/* Morandle : le cas du jour se charge ; six « Passer » finissent la partie, la réponse et la fiche s'affichent ;
   une réponse hors liste est refusée ; une réponse de la bonne région est dorée ; les 12 cas d'archives se jouent sans toucher
   à la série ; une partie de la version 1 (cas n° 1 le 25 novembre) passe au n° 13 ; le mode éditeur liste tous les cas ;
   Morandle est mis en avant à l'accueil et dans le hub MSK. */
async function morandle(nav) {
  // Le 25 novembre 2026 à 10 h, heure de l'Est : le cas n° 13 est paru à 7 h.
  const { ctx, p, erreurs } = await ouvrir(nav, "/locomoteur/morandle/", { largeur: 390, horloge: "2026-11-25T15:00:00Z" });
  await p.waitForSelector(".ml-indice");
  const brut = lire("locomoteur/morandle/donnees.json"), d = JSON.parse(brut);
  const debrouiller = (x, i) => { const b = Buffer.from(x, "base64"), k = `morandle-${i}`; for (let j = 0; j < b.length; j++) b[j] ^= k.charCodeAt(j % k.length) ^ ((j * 131) & 255); return JSON.parse(b.toString("utf8")); };
  const jouables = d.cas.map(debrouiller), numero = +(await p.textContent("#ml-numero")).match(/n° (\d+)/)[1];
  verifier("Morandle : cas brouillés dans donnees.json (aucun indice ni explication lisible), sans pastille « En révision »",
    d.cas.every(x => typeof x === "string") && !/"indices"|consulte|"presentation"/.test(brut) && !(await p.$("#ml-statut")) && jouables.every(x => x.indices.length === 6));
  const c = jouables[(numero - 1) % jouables.length], voisin = d.diagnostics.find(x => x.r === c.r && !c.accepte.includes(x.c));
  const debut = await p.evaluate(() => ({ vus: document.querySelectorAll(".ml-indice:not(.ml-cache)").length, total: document.querySelectorAll(".ml-indice").length, robots: document.querySelector('meta[name="robots"]').content }));
  await p.fill("#ml-q", "pas un diagnostic"); await p.click("#ml-bouton");
  const refus = await p.textContent("#ml-message");
  await p.fill("#ml-q", voisin.n); await p.click("#ml-bouton");
  const dore = await p.evaluate(() => !!document.querySelector(".ml-essai.ml-region"));
  for (let i = 0; i < 5; i++) { await p.fill("#ml-q", ""); await p.click("#ml-bouton"); }
  const fin = await p.evaluate(() => ({ fini: !document.querySelector("#ml-fin").hidden, verdict: document.querySelector("#ml-verdict").textContent, reponse: document.querySelector("#ml-reponse").textContent,
    fiche: (document.querySelector("#ml-liens a") || {}).getAttribute?.("href") || "", vus: document.querySelectorAll(".ml-indice:not(.ml-cache)").length }));
  verifier("Morandle : 1 indice sur 6 au départ, page indexée", debut.vus === 1 && debut.total === 6 && /^index/.test(debut.robots), debut);
  verifier("Morandle : réponse hors liste refusée, bonne région en doré", /liste/.test(refus) && dore, { refus, dore });
  verifier("Morandle : six essais finissent la partie, réponse et fiche résumée affichées", fin.fini && fin.vus === 6 && fin.reponse.includes(c.nom) && fin.fiche.includes("/fiches/") && !erreurs.length && !(await deborde(p)), { ...fin, erreurs });
  // Archives : 12 cas avant le 25 novembre ; gagner un cas précédent compte dans les statistiques, pas dans la série.
  const arch = await p.evaluate(() => ({ n: document.querySelectorAll("#ml-archives-liste a").length, titre: document.querySelector("#ml-archives summary h2").textContent,
    premier: !!document.querySelector('#ml-archives-liste a[href="?n=1"]') }));
  verifier("Morandle : 12 cas d'archives (n° 1 à 12, 13 au 24 novembre), le cas du 25 novembre est le n° 13", d.archives === 12 && d.debut === "2026-11-13" && numero === 13 && arch.n === 12 && arch.premier && /\(\d+\)/.test(arch.titre)
    && jouables[12].code === "C12", { ...arch, numero, archives: d.archives, debut: d.debut });
  await p.goto(`${BASE}/locomoteur/morandle/?n=1`); await p.waitForSelector(".ml-indice");
  const t1 = await p.textContent("#ml-numero");
  await p.fill("#ml-q", jouables[0].nom); await p.press("#ml-q", "Enter"); await p.waitForSelector("#ml-fin:not([hidden])");
  const st = await p.evaluate(() => JSON.parse(localStorage.getItem("morandle-v2")).stats);
  verifier("Morandle : cas précédent n° 1 jouable ; gagné, il compte dans les statistiques sans changer la série", /n° 1 ·/.test(t1) && /précédent/.test(t1) && st.joues === 2 && st.gagnes === 1 && st.serie === 0, { t1, st });
  await p.goto(`${BASE}/locomoteur/morandle/?editeur=1`); await p.waitForSelector(".ml-ed-cas");
  verifier("Morandle : le mode éditeur liste tous les cas", (await p.evaluate(() => document.querySelectorAll(".ml-ed-cas").length)) === d.cas.length);
  await ctx.close();
  // Bascule à 7 h, heure de l'Est (heure normale en novembre, heure avancée en juillet).
  const noA = async h => { const { ctx, p } = await ouvrir(nav, "/locomoteur/morandle/", { horloge: h }); await p.waitForSelector(".ml-indice"); const t = await p.textContent("#ml-numero"); await ctx.close(); return t; };
  const jours = j => Math.round((Date.UTC(...j.split("-").map((x, i) => i === 1 ? x - 1 : +x)) - Date.UTC(2026, 10, 13)) / 864e5);
  const [a659, a701, e659, e701] = await Promise.all(["2026-11-26T11:59:00Z", "2026-11-26T12:01:00Z", "2027-07-01T10:59:00Z", "2027-07-01T11:01:00Z"].map(noA));
  verifier("Morandle : le nouveau cas paraît à 7 h, heure de l'Est (6 h 59 : cas de la veille ; 7 h 01 : nouveau cas), heure normale et heure avancée",
    /n° 13 · 25 novembre/.test(a659) && /n° 14 · 26 novembre/.test(a701) && new RegExp(`n° ${jours("2027-07-01")} · 30 juin`).test(e659) && new RegExp(`n° ${jours("2027-07-01") + 1} · 1 juillet`).test(e701), { a659, a701, e659, e701 });
  {
    // Version 1 : la partie du cas n° 1 (25 novembre) devient celle du n° 13.
    const v1 = JSON.stringify({ parties: { n1: { essais: [{ t: "faux", c: "X", n: "X" }], fini: true, gagne: false } },
      stats: { joues: 1, gagnes: 0, serie: 0, meilleure: 0, dernier: 0, dist: [0, 0, 0, 0, 0, 0, 1], comptes: [1] } });
    const { ctx, p } = await ouvrir(nav, "/locomoteur/morandle/?n=13", { largeur: 390, stockage: { "morandle-v1": v1 }, horloge: "2026-11-25T15:00:00Z" });
    await p.waitForSelector(".ml-indice");
    const v2 = await p.evaluate(() => ({ m: JSON.parse(localStorage.getItem("morandle-v2")), fini: !document.querySelector("#ml-fin").hidden }));
    verifier("Morandle : une partie de la version 1 (n° 1) est reprise comme n° 13", v2.fini && v2.m.parties.n13 && !v2.m.parties.n1 && v2.m.stats.comptes.join() === "13", v2.m);
    await ctx.close();
  }
  // Mise en avant : en-tête et bandeau « Nouveau » de l'accueil, carte en haut du hub MSK (avant « Démarrer la consultation »).
  const hub = lire("locomoteur/index.html"), acc = lire("index.html");
  verifier("Morandle : mis en avant à l'accueil (en-tête « Nouveau », bandeau) et en haut du hub MSK", /class="tete-lien" href="\/locomoteur\/morandle\/">Morandle<span class="tete-nv">Nouveau/.test(acc)
    && /class="promo"><a href="\/locomoteur\/morandle\/"/.test(acc) && hub.indexOf('class="lo-ml" href="/locomoteur/morandle/"') > 0 && hub.indexOf('class="lo-ml"') < hub.indexOf("lo-demarrer"));
  for (const [l, h] of [[390, 844], [1280, 800]]) {
    const { ctx, p } = await ouvrir(nav, "/", { largeur: l, hauteur: h });
    const vu = await p.evaluate(() => { const r = document.querySelector(".promo a").getBoundingClientRect(); return { haut: r.top, bas: r.bottom, larg: r.width, ecran: innerHeight }; });
    verifier(`Morandle : bandeau « Nouveau » visible à l'accueil sans défiler (${l} px)`, vu.larg > 150 && vu.bas <= vu.ecran && !(await deborde(p)), vu);
    await ctx.close();
  }
}

const SCENARIOS = { pages, morandle, navigation, motsColles, accueil, crds, codes, guide, locomoteur, fichesHY, atlas, importer, entrainement, baseDonnees, sombre };
const choisis = (process.env.SCENARIOS || "").split(",").map(s => s.trim()).filter(Boolean);
const nav = await chromium.launch();
try {
  for (const [nom, f] of Object.entries(SCENARIOS)) { if (choisis.length && !choisis.includes(nom)) continue;
    try { await f(nav); } catch (e) { echecs++; console.error(`ÉCHEC : ${nom} : déroulement (${String(e).split("\n")[0]})`); if (process.env.PILE) console.error(e.stack); } }
  if (!choisis.length || choisis.includes("fichiers")) fichiers();
} finally { await nav.close(); serveur.close(); }
console.log(`${reussis} vérifications réussies, ${echecs} échec(s).`);
process.exit(echecs ? 1 : 0);
