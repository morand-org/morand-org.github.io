// Construit Map Morand (/map/) et Guide Morand (/guides/) à partir du site Trouve ta clinique.
//   node outils/construire.mjs <dossier du dépôt trouvetaclinique.github.io> [fichier de motifs à retirer]
// Copie fidèle, avec ces changements seulement :
//  - aucune mesure d'audience (le script de Cloudflare est retiré) ;
//  - la recherche assistée des guides est masquée tant que son adresse sous morand.org n'est pas fixée
//    (ADRESSE_IA ci-dessous) : l'ancienne adresse n'apparaît plus dans les pages ;
//  - les liens vers les autres pages de Trouve ta clinique (fiches, RLS, PTEM…) mènent au site d'origine ;
//  - commentaires HTML retirés ; les motifs personnels du fichier donné (un par ligne, hors dépôt) sont effacés.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const [source, fichierMotifs] = process.argv.slice(2);
if (!source || !fs.existsSync(path.join(source, "monteregie/index.html"))) {
  console.error("Usage : node outils/construire.mjs <dépôt trouvetaclinique.github.io> [motifs]"); process.exit(2);
}
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
// Version de la feuille de Guide Morand dans son adresse : le service worker des guides garde les fichiers en cache ;
// une adresse nouvelle à chaque changement fait charger la bonne version tout de suite.
const VERSION_STYLE = crypto.createHash("sha256").update(fs.readFileSync(path.join(RACINE, "assets/guides-morand.css"))).digest("hex").slice(0, 10);
const empreinte = f => crypto.createHash("sha256").update(fs.readFileSync(path.join(RACINE, f))).digest("hex").slice(0, 10);
const ORIGINE = "https://trouvetaclinique.ca";
const ADRESSE_IA = "";   // ex. « https://ia.morand.org/ » une fois le service déplacé
const motifs = fichierMotifs ? fs.readFileSync(fichierMotifs, "utf8").split("\n").map(x => x.trim()).filter(x => x.length >= 4) : [];

const lire = f => fs.readFileSync(path.join(source, f), "utf8");
function copier(de, vers) {
  const a = path.join(source, de), b = path.join(RACINE, vers);
  fs.mkdirSync(path.dirname(b), { recursive: true });
  if (fs.statSync(a).isDirectory()) fs.cpSync(a, b, { recursive: true });
  else fs.copyFileSync(a, b);
}
function ecrire(vers, texte) { const b = path.join(RACINE, vers); fs.mkdirSync(path.dirname(b), { recursive: true }); fs.writeFileSync(b, texte); }
// Favicon : le cèdre de Morand, sur toutes les pages (les icônes d'onglet de Trouve ta clinique sont retirées).
const FAVICON = '<link rel="icon" href="/morand/icone.svg" type="image/svg+xml">\n<link rel="icon" href="/morand/favicon-32.png" sizes="32x32" type="image/png">';
function faviconMorand(html, nom) {
  const avant = html, sans = html.replace(/[ \t]*<link rel="icon"[^>]*>\n?/g, "");
  if (sans === avant) throw new Error(`${nom} : favicon introuvable ; vérifier la page d'origine.`);
  return sans.replace(/(<link rel="(?:apple-touch-icon|stylesheet)"[^>]*>)/, `${FAVICON}\n$1`);
}
const echapper = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function nettoyer(html) {
  let t = html
    .replace(/<script[^>]*cloudflareinsights[^>]*><\/script>\s*/g, "")
    .replace(/<link rel="(?:preconnect|dns-prefetch)" href="https:\/\/static\.cloudflareinsights\.com"[^>]*>\s*/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<span class="credit-perso">[^<]*<\/span>/g, "");
  for (const m of motifs) t = t.replace(new RegExp(echapper(m), "gi"), "");
  return t;
}
// Liens absolus du site d'origine : vers trouvetaclinique.ca, sauf ce qui est copié ici (/guides/, /assets/, accueil).
const GARDES = /^\/(guides\/|assets\/|morand\/|crds\/|favicon-\d+\.png|$)/;
const versOrigine = html => html.replace(/(href|src)="(\/[^"]*)"/g, (tout, att, p) => GARDES.test(p) ? tout : `${att}="${ORIGINE}${p}"`);

// ---------- Map Morand : la carte interactive de la Montérégie (/monteregie/) ----------
for (const f of ["data.json", "data-etablissements.json", "data-etablissements-centre.json", "leaflet.css", "leaflet.js",
  "territoires-rls-centre-ouest.js", "territoires-rls-est.js", "territoires-monteregie.js", "favicon-16.png", "favicon-32.png", "favicon-48.png", "vendor"])
  if (fs.existsSync(path.join(source, f))) copier(f, "map/" + f);
let carte = lire("monteregie/index.html");
carte = carte.replace(/(["'`(])\.\.\//g, "$1./");
carte = versOrigine(nettoyer(carte));
/* Dans l'app Morand (accueil installable, portée « / ») : la carte ne désinstalle plus le service worker de l'accueil
   (le script d'origine retirait tout service worker de portée « / ») ; un bouton ramène à l'accueil de Morand,
   puisque l'app installée n'a pas de bouton Retour. */
{
  const avant = carte;
  carte = carte.replace(/<script>\s*\/\/ Pas de PWA ici[\s\S]*?<\/script>\s*/, "");
  if (carte === avant) throw new Error("Map Morand : script de désinstallation introuvable ; vérifier la page d'origine.");
  const b = carte;
  carte = carte.replace(/(<div class="header-right">\s*)(<button class="btn-theme")/, '$1<a class="btn-share btn-morand" href="/" title="Accueil Morand" aria-label="Accueil Morand">'
    + '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 10.5 12 3.5l8.5 7V20a.5.5 0 0 1-.5.5h-5v-6h-6v6H4a.5.5 0 0 1-.5-.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></a>\n    $2');
  if (carte === b) throw new Error("Map Morand : en-tête introuvable ; vérifier la page d'origine.");
}
carte = faviconMorand(carte, "Map Morand");
/* Habit de Morand : sceau et nom dans l'en-tête, palette du site à la place de celle de Santé Québec (régions Est, Centre,
   Ouest en or, cèdre et bronze ; textes en encre ; mode sombre en encre chaude), feuille assets/map-morand.css. */
{
  const b = carte;
  carte = carte.replace(/<span class="logo-img" role="img" aria-label="[^"]*"><\/span>\s*<div class="logo-text">\s*<span class="brand-org">[^<]*<\/span>\s*<strong>[^<]*<\/strong>/,
    '<img class="mm-sceau" src="/morand/sceau-map.svg" alt="" width="46" height="46">\n  <div class="logo-text">\n    <span class="brand-org">Morand</span>\n    <strong>Map Morand</strong>');
  if (carte === b) throw new Error("Map Morand : logo de l'en-tête introuvable ; vérifier la page d'origine.");
  const COULEURS = {
    "#170a72": "#5e4a2c", "#08a0a0": "#5b7353", "#0080d7": "#8b6921", "#90f1e9": "#e2cf9f", "#7ee6df": "#e2cf9f", "#17a9a8": "#5b7353",
    "#0f2240": "#17160f", "#1a3558": "#3a362c", "#067a7a": "#4a6044", "#087c7c": "#4a6044", "#082f70": "#4a3a22", "#0065a9": "#7d6230", "#0075c4": "#7d6230", "#2b6caa": "#7d6230",
    "#a8dcf4": "#eadcb8", "#b8b1df": "#d8ccb8", "#a7dfdc": "#cfd8c8", "#a9d8db": "#cfd8c8", "#ebfbfa": "#f4f1ea", "#eff8fa": "#f6f3ec", "#d7e8ed": "#e6e0d3", "#bfd7df": "#d9d2c2", "#f7fcfd": "#fdfcf8",
    "#dbeafe": "#f1ece0", "#111629": "#12110d", "#171e34": "#1a1914", "#202943": "#23211b", "#0f1526": "#12110d", "#1a2239": "#1a1914", "#18233a": "#1a1914", "#34435c": "#3a362c",
  };
  // Les autres bleus, sarcelles et gris bleutés deviennent des teintes chaudes (même clarté, teinte or, moins saturée).
  const chaud = (r, g, b) => {
    const R = r / 255, G = g / 255, B = b / 255, mx = Math.max(R, G, B), mn = Math.min(R, G, B), l = (mx + mn) / 2, d = mx - mn;
    if (d < 0.02) return null;
    const sat = d / (1 - Math.abs(2 * l - 1));
    let h = mx === R ? ((G - B) / d) % 6 : mx === G ? (B - R) / d + 2 : (R - G) / d + 4; h *= 60; if (h < 0) h += 360;
    if (h < 165 || h > 275) return null;
    const s2 = Math.min(sat * 0.5, 0.45), c = (1 - Math.abs(2 * l - 1)) * s2, hh = 38 / 60, x = c * (1 - Math.abs((hh % 2) - 1)), m = l - c / 2;
    return [c + m, x + m, m].map(v => Math.round(v * 255));
  };
  const hex = v => "#" + v.map(n => n.toString(16).padStart(2, "0")).join("");
  carte = carte.replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])/g, h => {
    if (COULEURS[h.toLowerCase()]) return COULEURS[h.toLowerCase()];
    const t = h.length === 4 ? h.slice(1).split("").map(c => c + c).join("") : h.slice(1);
    const v = chaud(parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16));
    return v ? hex(v) : h;
  }).replace(/rgba\(23,\s*10,\s*114,/g, "rgba(94,74,44,").replace(/rgba\(15,\s*34,\s*64,/g, "rgba(23,22,15,").replace(/rgba\(21,\s*31,\s*51,/g, "rgba(26,25,20,")
    .replace(/rgba?\((\d+),\s*(\d+),\s*(\d+)/g, (tout, r, g, b) => { const v = chaud(+r, +g, +b); return v ? tout.replace(`${r},`, `${v[0]},`).replace(/,\s*\d+,\s*\d+$/, `,${v[1]},${v[2]}`) : tout; });
  carte = carte.replace(/<meta name="theme-color" content="[^"]*">/, '<meta name="theme-color" content="#f6f3ec">');
  carte = carte.replace(/<title>[^<]*<\/title>/, "<title>Map Morand : cliniques de la Montérégie</title>");
  carte = carte.replace("</body>", `<link rel="stylesheet" href="/assets/map-morand.css?v=${empreinte("assets/map-morand.css")}">\n</body>`);
}
// L'adresse canonique reste celle de la carte d'origine : les moteurs de recherche ne la voient pas en double.
ecrire("map/index.html", carte);

/* Guide Morand : une version pratique, moins officielle. On garde l'en-tête et les couleurs de Trouve ta clinique,
   mais sans navigation vers le reste de son site (menu, recherche du site, pied de page), sans bouton « Installer
   l'app » ; sur la page des guides, sans le texte d'introduction (de « Retrouvez… » à « Liens vérifiés… ») ni l'aide
   sous le champ de recherche. Chaque retrait est vérifié : une page qui change de forme arrête la construction. */
function retirer(t, motif, nom) {
  const avant = t.length, apres = t.replace(motif, "");
  if (apres.length === avant) throw new Error(`Guide Morand : « ${nom} » introuvable ; vérifier la page d'origine.`);
  return apres;
}
function alleger(t, pageGuides) {
  t = retirer(t, /\s*<nav class="navdesk"[\s\S]*?<\/nav>/, "menu du site");
  t = retirer(t, /\s*<div class="actions">[\s\S]*?<\/button>\s*<\/div>/, "recherche du site et menu");
  t = retirer(t, /\s*<footer class="pied-site">[\s\S]*?<\/footer>/, "pied de page du site");
  t = retirer(t, /\s*<div class="guides-app" id="guides-app"[\s\S]*?<\/p>\s*<\/div>/, "Installer l'app");
  t = retirer(t, /\s*<script src="\/assets\/guides-installer\.js[^"]*"[^>]*><\/script>/, "script d'installation");
  t = retirer(t, /\s*<script src="\/assets\/recherche\.js[^"]*"[^>]*><\/script>/, "script de recherche du site");
  t = retirer(t, /\s*<p class="guides-search-hint">[\s\S]*?<\/p>/, "aide de la recherche");
  if (pageGuides) t = retirer(t, /\s*<p class="lead">Retrouvez[\s\S]*?<\/p>\s*<p class="guides-avis">[\s\S]*?Liens vérifiés[^<]*<\/p>/, "texte d'introduction");
  else {
    // Ressources communautaires : la première phrase seulement, sans la liste des besoins ni le paragraphe des sources.
    t = retirer(t, /\s*<p class="guides-avis">Organismes de l’agglomération[\s\S]*?Info-Social[\s\S]*?<\/p>/, "sources des ressources communautaires");
    const avant = t; t = t.replace(/(<p class="lead">Trouvez un organisme communautaire ou une ligne d’aide vers qui diriger un patient) : [^<]*<\/p>/, "$1.</p>");
    if (t === avant) throw new Error("Guide Morand : « phrase d'introduction des ressources » introuvable ; vérifier la page d'origine.");
  }
  // Retouches de mise en page propres à Guide Morand (espace entre la recherche et « Filtrer »).
  t = t.replace(/(<link rel="stylesheet" href="\/assets\/guides-cliniques\.css[^"]*">)/, `$1\n  <link rel="stylesheet" href="/assets/guides-morand.css?v=${VERSION_STYLE}">`);
  if (!t.includes("/assets/guides-morand.css")) throw new Error("Guide Morand : feuille de style des guides introuvable.");
  // Les fichiers du catalogue (fiches de la FMPE…) sont copiés ici : on les sert d'ici.
  return habiller(t.replaceAll("https://trouvetaclinique.ca/guides/", "/guides/"), pageGuides);
}

/* Habit de Guide Morand (maquette « Recherche d'abord ») : en-tête Morand avec les deux onglets, sceau du cerf, nom et
   devise au centre, grand champ de recherche, filtres repliés sous « Filtres ». Les couleurs et les polices sont dans
   assets/guides-morand.css. La recherche, les filtres et le catalogue gardent le balisage et les scripts d'origine. */
function remplacer(t, motif, rempl, nom) {
  const apres = t.replace(motif, rempl);
  if (apres === t) throw new Error(`Guide Morand : « ${nom} » introuvable ; vérifier la page d'origine.`);
  return apres;
}
function habiller(t, pageGuides) {
  const nav = t.match(/\s*<nav class="guides-band guides-onglets" aria-label="Catalogue">([\s\S]*?)<\/nav>/);
  if (!nav) throw new Error("Guide Morand : « onglets » introuvables ; vérifier la page d'origine.");
  t = t.replace(nav[0], "");
  // Trois onglets : Guides cliniques, Ressources communautaires et CRDS Morand (page à part, /crds/).
  const onglets = nav[1].replace("Ressources communautaires", 'Ressources<span class="gm-long"> communautaires</span>')
    .replace(/Guides cliniques(\s*<span class="guides-onglet-compte">)/, 'Guides<span class="gm-long"> cliniques</span>$1') + '<a href="/crds/">CRDS</a>';
  t = remplacer(t, /<header class="site">[\s\S]*?<\/header>/,
    `<header class="gm-tete"><a class="gm-marque" href="/">Morand</a><nav class="gm-onglets" aria-label="Catalogue">${onglets}</nav></header>`, "en-tête");
  const lead = (t.match(/<section class="guides-band guides-intro">[\s\S]*?(<p class="lead">[\s\S]*?<\/p>)/) || [])[1] || "";
  const sujet = pageGuides ? "guides de pratique pour la première ligne" : "ressources communautaires pour vos patients";
  t = remplacer(t, /<section class="guides-band guides-intro">[\s\S]*?<\/section>/,
    // Le sceau et le nom ramènent aux guides (et rechargent la page des guides).
    `<section class="guides-band gm-intro"><a class="gm-logo" href="/guides/" tabindex="-1" aria-hidden="true"><img src="/morand/sceau-guide.svg" alt="" width="128" height="128"></a>` +
    `<h1><a class="gm-nom" href="/guides/">Guide Morand</a><span class="visually-hidden"> : ${sujet}</span></h1>` +
    `<p class="gm-devise">Prévention · Pertinence · Expérience</p>${lead.replace('class="lead"', 'class="gm-lead"')}</section>`, "introduction");
  t = remplacer(t, 'class="guides-band guides-band--green guides-search"', 'class="guides-band guides-search gm-recherche"', "bande de recherche");
  t = remplacer(t, '<h2 id="guides-search-title">', '<h2 id="guides-search-title" class="visually-hidden">', "titre de la recherche");
  t = remplacer(t, '<div class="guides-filter-area" hidden>', '<details class="gm-filtres"><summary>Filtres</summary><div class="guides-filter-area" hidden>', "zone des filtres");
  t = remplacer(t, /(<\/div>\s*)(<p class="guides-status")/, "$1</details>\n    $2", "fin des filtres");
  if (pageGuides) t = remplacer(t, 'placeholder="Sujet, organisme ou mot-clé…"', 'placeholder="Rechercher par mot-clé…"', "texte du champ");
  t = remplacer(t, /\s*<p class="guides-favoris-note">Vos favoris sont gardés[^<]*<\/p>/, "", "note des favoris");
  // Guides cliniques : les fiches de CRDS Morand qui correspondent à la recherche, après les résultats des guides.
  if (pageGuides) {
    // Après les résultats des guides (« Résultats les plus pertinents »).
    t = remplacer(t, /(<section class="guides-band guides-resultats"[\s\S]*?<\/section>)/,
      '$1\n  <section class="guides-band gm-crds" id="gm-crds" aria-labelledby="gm-crds-titre" hidden>' +
      '<div class="guides-category-heading"><h2 id="gm-crds-titre">CRDS Morand <span class="gm-crds-mention">priorité et prérequis</span></h2><span class="compte"></span></div>' +
      '<ul class="gm-crds-liste"></ul><a class="gm-crds-tout" href="/crds/" hidden></a></section>', "résultats CRDS");
    t = remplacer(t, /(<script src="\/assets\/guides-recherche\.js[^"]*"[^>]*><\/script>)/, `$1\n<script src="/assets/guides-crds.js?v=${empreinte("assets/guides-crds.js")}" defer></script>`, "script CRDS");
  }
  t = remplacer(t, '<body class="guides-page"', '<body class="guides-page gm"', "corps de page");
  t = remplacer(t, /(<title>[^<]*?)\s*\|\s*Trouve ta clinique<\/title>/, "$1 | Guide Morand</title>", "titre de la page");
  t = remplacer(t, '<meta name="theme-color" content="#08A0A0">', '<meta name="theme-color" content="#fdfcf8">', "couleur du navigateur");
  return t;
}

// ---------- Guide Morand : le catalogue de guides (/guides/) ----------
copier("guides", "guides");
{ const f = path.join(RACINE, "guides/donnees.json"); fs.writeFileSync(f, fs.readFileSync(f, "utf8").replaceAll("https://trouvetaclinique.ca/guides/", "/guides/")); }
for (const f of ["guides-aiguillage.js", "guides-cliniques.css", "guides-cliniques.js", "guides-installer.js", "guides-recherche.js",
  "logo-128.webp", "logo-128.png", "og-guides.png", "recherche.js", "seo-pages.css", "theme.js", "polices"])
  if (fs.existsSync(path.join(source, "assets", f))) copier("assets/" + f, "assets/" + f);
// /favicon-32.png : le cèdre de Morand (pas l'icône de Trouve ta clinique), pour les navigateurs qui le demandent d'office.
fs.copyFileSync(path.join(RACINE, "morand/favicon-32.png"), path.join(RACINE, "favicon-32.png"));
for (const page of ["guides/index.html", "guides/ressources-communautaires/index.html"]) {
  let t = lire(page);
  t = t.replace(/(<section class="guides-band guides-ia"[^>]*?)data-url="[^"]*"/, ADRESSE_IA ? `$1data-url="${ADRESSE_IA}"` : "$1data-url=\"\"");
  if (!ADRESSE_IA) t = t.replace(/(<section class="guides-band guides-ia"[^>]*?)(\s+hidden)?>/, "$1 hidden>");
  ecrire(page, faviconMorand(versOrigine(nettoyer(alleger(t, page.endsWith("guides/index.html")))), "Guide Morand"));
}
// Fichiers de texte copiés tels quels (scripts, données) : mêmes motifs effacés.
const TEXTES = /\.(js|css|json|webmanifest|html)$/;
function parcourir(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) parcourir(p);
    else if (TEXTES.test(e.name) && motifs.length) {
      const avant = fs.readFileSync(p, "utf8"); let apres = avant;
      for (const m of motifs) apres = apres.replace(new RegExp(echapper(m), "gi"), "");
      if (apres !== avant) fs.writeFileSync(p, apres);
    }
  }
}
for (const d of ["map", "guides", "assets"]) parcourir(path.join(RACINE, d));
console.log("Map Morand et Guide Morand construits.");
