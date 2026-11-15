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
  ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };
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
const PAGES = ["/", "/guides/", "/guides/ressources-communautaires/", "/map/", "/crds/", "/codes/", "/confidentialite/"];
const OUTILS = ["/guides/", "/guides/ressources-communautaires/", "/map/", "/crds/", "/codes/"];
const TRONQUE = /<\s*\d+[a-zA-Z]{0,3}>/;

async function ouvrir(nav, chemin, { largeur = 390, hauteur = 844, sombre = false, stockage = null } = {}) {
  const ctx = await nav.newContext({ viewport: { width: largeur, height: hauteur }, serviceWorkers: "block", colorScheme: sombre ? "dark" : "light" });
  await ctx.addInitScript(s => { try { sessionStorage.setItem("morand.ouverture", "1"); if (s) for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } }, stockage);
  await ctx.route("**/*", r => r.request().url().startsWith(BASE) ? r.continue() : r.abort());
  const p = await ctx.newPage(), erreurs = [];
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
    await ctx.close();
  }
}

/* 2. Navigation : les cinq outils sur une ligne, l'outil courant marqué, sans chevaucher « Morand ». */
async function navigation(nav) {
  const ATTENDU = { "/guides/": "Guide", "/guides/ressources-communautaires/": "Guide", "/map/": "Map", "/crds/": "CRDS", "/codes/": "Codes" };
  for (const largeur of [320, 390, 1280]) for (const u of OUTILS) {
    const { ctx, p } = await ouvrir(nav, u, { largeur });
    const r = await p.evaluate(() => { const n = document.querySelector("nav[aria-label='Outils Morand']"); if (!n) return null;
      const a = [...n.querySelectorAll("a")], b = a.map(x => x.getBoundingClientRect()), m = n.parentElement.querySelector("a").getBoundingClientRect();
      return { noms: a.map(x => x.textContent.trim()), liens: a.map(x => x.getAttribute("href")), courant: (n.querySelector("[aria-current='page']") || {}).textContent,
        uneLigne: Math.abs(b[0].top - b[b.length - 1].top) < 2, dansEcran: b[b.length - 1].right <= innerWidth + 1, chevauche: m.right > b[0].left - 2 }; });
    verifier(`${u} à ${largeur} px : cinq outils dans l'en-tête`, r && r.noms.join() === "Wealth,Guide,Map,CRDS,Codes" && r.liens.join() === "/wealth/,/guides/,/map/,/crds/,/codes/", r);
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

/* 4. Accueil : cinq outils qui tiennent dans l'écran ; la recherche unique trouve dans chaque outil. */
async function accueil(nav) {
  for (const [largeur, hauteur] of [[390, 844], [320, 568], [1280, 720]]) {
    const { ctx, p } = await ouvrir(nav, "/", { largeur, hauteur });
    const r = await p.evaluate(() => ({ outils: [...document.querySelectorAll("#outils a")].map(a => a.getAttribute("href")), bas: document.querySelector(".pied").getBoundingClientRect().bottom, titre: document.querySelector("h1").textContent }));
    verifier(`accueil ${largeur}×${hauteur} : cinq outils`, r.outils.join() === "/wealth/,/guides/,/map/,/crds/,/codes/", r.outils);
    verifier(`accueil ${largeur}×${hauteur} : tout tient dans l'écran`, r.bas <= hauteur + 1, Math.round(r.bas));
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
  const vide = await chercher("");
  verifier("recherche de l'accueil : champ vidé, les outils reviennent", vide.outils && vide.groupes.length === 0);
  verifier("recherche de l'accueil : aucune erreur", erreurs.length === 0, erreurs);
  await ctx.close();
}

/* 5. CRDS : recherche, onglets, accueil clinique de Pierre-Boucher, favoris et recherches récentes. */
async function crds(nav) {
  const D = JSON.parse(lire("crds/crds_data.json")), PB = D.accueil_clinique.pierre_boucher;
  const { ctx, p, erreurs } = await ouvrir(nav, "/crds/");
  const etat = () => p.evaluate(() => ({ etat: document.getElementById("cr-etat").textContent, tuiles: document.querySelectorAll(".cr-spec").length, panneau: document.querySelectorAll(".cr-ac-panneau").length,
    cartes: document.querySelectorAll(".cr-carte").length, ac: [...document.querySelectorAll(".cr-carte-ac h3")].map(h => h.textContent), onglets: [...document.querySelectorAll(".cr-vue")].map(b => b.textContent + (b.getAttribute("aria-selected") === "true" ? "*" : "")) }));
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
  await p.fill("#co-q", ""); await p.click('[data-v="vulnerabilite"]'); await p.waitForTimeout(200); e = await etat();
  verifier("Codes : les codes de vulnérabilité", e.titres.length === D.vulnerabilite.length, e.etat);
  await p.click('[data-v="tous"]'); await p.waitForTimeout(200); e = await etat();
  verifier("Codes : tous les actes, par groupe", e.titres.length === D.actes.length && e.cartes.length === D.groupes.length, e.etat);
  verifier("Codes : montants en dollars, deux décimales", (await p.locator(".co-valeur").first().textContent()).match(/^\d[\d\s]*,\d{2}(\s\/\s[\d\s]+,\d{2})?\s\$$/) !== null, await p.locator(".co-valeur").first().textContent());
  await p.goto(BASE + "/codes/?q=pessaire"); await p.waitForTimeout(600); e = await etat();
  verifier("Codes : un lien avec ?q= lance la recherche", e.titres.length === 1 && /pessaire/i.test(e.titres[0]), e);
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
  verifier("Guide : aucune erreur", erreurs.length === 0, erreurs);
  await ctx.close();
  const d = JSON.parse(lire("guides/donnees.json")), page = lire("guides/index.html");
  verifier("Guide : le nombre affiché est celui du catalogue", page.includes(`>${d.filter(x => x.format).length} ressources dans le catalogue<`));
  verifier("Guide : aucun doublon d'adresse dans le catalogue", new Set(d.map(x => x.url)).size === d.length);
}

/* 8. Mode sombre : les textes restent lisibles (contraste d'au moins 3 pour 1) sur chaque page. */
async function sombre(nav) {
  for (const u of ["/", "/guides/", "/guides/ressources-communautaires/", "/crds/", "/codes/", "/confidentialite/"]) {
    const { ctx, p } = await ouvrir(nav, u, { sombre: true });
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
  for (const f of ["index.html", "crds/index.html", "codes/index.html", "confidentialite/index.html"]) {
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
  verifier("robots.txt : annonce le plan du site", lire("robots.txt").includes("Sitemap: https://www.morand.org/sitemap.xml"));
  const m = JSON.parse(lire("manifest.webmanifest"));
  verifier("manifeste : un raccourci par outil, icônes présentes", m.shortcuts.map(s => s.url).join() === "/wealth/,/guides/,/map/,/crds/,/codes/" && m.shortcuts.every(s => fs.existsSync(path.join(RACINE, s.icons[0].src))), m.shortcuts.map(s => s.url));
  verifier("dépôt : CNAME et .nojekyll", lire("CNAME").trim() === "www.morand.org" && fs.existsSync(path.join(RACINE, ".nojekyll")));
}

const SCENARIOS = { pages, navigation, motsColles, accueil, crds, codes, guide, sombre };
const choisis = (process.env.SCENARIOS || "").split(",").map(s => s.trim()).filter(Boolean);
const nav = await chromium.launch();
try {
  for (const [nom, f] of Object.entries(SCENARIOS)) { if (choisis.length && !choisis.includes(nom)) continue;
    try { await f(nav); } catch (e) { echecs++; console.error(`ÉCHEC : ${nom} : déroulement (${String(e).split("\n")[0]})`); } }
  if (!choisis.length || choisis.includes("fichiers")) fichiers();
} finally { await nav.close(); serveur.close(); }
console.log(`${reussis} vérifications réussies, ${echecs} échec(s).`);
process.exit(echecs ? 1 : 0);
