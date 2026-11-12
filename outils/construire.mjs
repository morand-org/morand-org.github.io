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
import { AJOUTS_GUIDES } from "./guides-ajouts.mjs";

const [source, fichierMotifs] = process.argv.slice(2);
if (!source || !fs.existsSync(path.join(source, "monteregie/index.html"))) {
  console.error("Usage : node outils/construire.mjs <dépôt trouvetaclinique.github.io> [motifs]"); process.exit(2);
}
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
// Version de la feuille de Guide Morand dans son adresse : le service worker des guides garde les fichiers en cache ;
// une adresse nouvelle à chaque changement fait charger la bonne version tout de suite.
const VERSION_STYLE = crypto.createHash("sha256").update(fs.readFileSync(path.join(RACINE, "assets/guides-morand.css"))).digest("hex").slice(0, 10);
// Navigation commune des outils de Morand ; « actif » : wealth, guide, map ou crds.
const navMorand = actif => [["wealth", "/wealth/", "Wealth"], ["guide", "/guides/", "Guide"], ["map", "/map/", "Map"], ["crds", "/crds/", "CRDS"]]
  .map(([k, u, n]) => `<a href="${u}"${k === actif ? ' aria-current="page"' : ""}>${n}</a>`).join("");
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
const GARDES = /^\/(guides\/|assets\/|morand\/|crds\/|wealth\/|map\/|favicon-\d+\.png|$)/;
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
   Ouest en or, sapin et bordeaux, palette A retenue ; interface en encre et papier ; mode sombre en encre chaude), feuille assets/map-morand.css. */
{
  const b = carte;
  // L'élément #brand-home reste (le script de la carte s'y accroche), caché ; la navigation commune prend sa place.
  carte = carte.replace(/<div class="brand" id="brand-home"[^>]*>\s*<span class="logo-img"[^>]*><\/span>\s*<div class="logo-text">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="brand" id="brand-home" hidden></div>\n  <a class="mo-marque" href="/">Morand</a>\n  <nav class="mo-outils" aria-label="Outils Morand">${navMorand("map")}</nav>`);
  if (carte === b) throw new Error("Map Morand : marque de l'en-tête introuvable ; vérifier la page d'origine.");
  carte = carte.replace(/<a class="btn-share btn-morand"[\s\S]*?<\/a>\s*/, "");
  /* Deux familles de couleurs : les RÉGIONS (couleurs entre apostrophes dans le script de la carte : marqueurs, territoires,
     légende, filtres) et l'INTERFACE (feuilles de style : en-têtes, onglets, cartes, champs). L'interface prend l'encre, le
     papier et l'or de Morand ; les bleus et sarcelles restants deviennent des gris chauds neutres (pas un voile doré).
     Trois palettes de régions : MAP_PALETTE=A (encre, or et sapin), B (joaillerie), C (cartographie ancienne). */
  const PALETTES = {
    A: { est: "#b8892f", estPale: "#ecd9a6", estFonce: "#8f6a1f", centre: "#2f5d50", centrePale: "#bcd2c8", centreFonce: "#244a40", ouest: "#7a2e3a", ouestPale: "#e4c5c9" },
    B: { est: "#27467a", estPale: "#c4d0e4", estFonce: "#1e3961", centre: "#1d6b54", centrePale: "#bfdccf", centreFonce: "#165843", ouest: "#8c2f3f", ouestPale: "#e7c4c9" },
    C: { est: "#b87a1e", estPale: "#efd6a8", estFonce: "#94621a", centre: "#5a7034", centrePale: "#d5ddc0", centreFonce: "#475a29", ouest: "#3c5670", ouestPale: "#c9d4de" },
  };
  const P = PALETTES[process.env.MAP_PALETTE || "A"];   // A : retenue pour le site
  const REGIONS = { "#0080d7": P.est, "#a8dcf4": P.estPale, "#0075c4": P.estFonce, "#08a0a0": P.centre, "#a7dfdc": P.centrePale, "#067a7a": P.centreFonce,
    "#170a72": P.ouest, "#b8b1df": P.ouestPale };
  carte = carte.replace(/'(#[0-9a-fA-F]{6})'/g, (tout, h) => REGIONS[h.toLowerCase()] ? `'${REGIONS[h.toLowerCase()]}'` : tout);
  const INTERFACE = {
    "#170a72": "#17160f", "#08a0a0": "#9b7a3e", "#0080d7": "#8b6921", "#90f1e9": "#e7d3a1", "#7ee6df": "#e7d3a1", "#17a9a8": "#9b7a3e",
    "#0f2240": "#17160f", "#1a3558": "#3a362c", "#067a7a": "#7d6230", "#087c7c": "#7d6230", "#082f70": "#2b2820", "#0065a9": "#7d6230", "#0075c4": "#7d6230", "#271a86": "#2b2820", "#291a89": "#2b2820",
    "#111629": "#12110d", "#171e34": "#1a1914", "#202943": "#23211b", "#0f1526": "#12110d", "#1a2239": "#1a1914", "#18233a": "#1a1914", "#34435c": "#3a362c", "#141b30": "#161510", "#141b2d": "#161510",
  };
  // Autres bleus et sarcelles : gris chauds, même clarté, à peine teintés.
  const neutre = (r, g, b) => {
    const R = r / 255, G = g / 255, B = b / 255, mx = Math.max(R, G, B), mn = Math.min(R, G, B), l = (mx + mn) / 2, d = mx - mn;
    if (d < 0.02) return null;
    let h = mx === R ? ((G - B) / d) % 6 : mx === G ? (B - R) / d + 2 : (R - G) / d + 4; h *= 60; if (h < 0) h += 360;
    if (h < 165 || h > 275) return null;
    const c = (1 - Math.abs(2 * l - 1)) * 0.07, hh = 40 / 60, x = c * (1 - Math.abs((hh % 2) - 1)), m = l - c / 2;
    return [c + m, x + m, m].map(v => Math.round(v * 255));
  };
  const hex = v => "#" + v.map(n => n.toString(16).padStart(2, "0")).join("");
  carte = carte.replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])/g, h => {
    const k = h.toLowerCase();
    if (Object.values(P).includes(k)) return h;   // déjà une couleur de région
    if (INTERFACE[k]) return INTERFACE[k];
    const t = h.length === 4 ? h.slice(1).split("").map(c => c + c).join("") : h.slice(1);
    const v = neutre(parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16));
    return v ? hex(v) : h;
  }).replace(/rgba\(23,\s*10,\s*114,/g, "rgba(23,22,15,").replace(/rgba\(15,\s*34,\s*64,/g, "rgba(23,22,15,").replace(/rgba\(21,\s*31,\s*51,/g, "rgba(26,25,20,")
    .replace(/rgba\(144,\s*241,\s*233,/g, "rgba(201,163,92,").replace(/rgba\(8,\s*160,\s*160,/g, "rgba(155,122,62,")
    .replace(/rgba?\((\d+),\s*(\d+),\s*(\d+)/g, (tout, r, g, b) => { const v = neutre(+r, +g, +b); return v ? tout.replace(/\(\d+,\s*\d+,\s*\d+/, `(${v[0]},${v[1]},${v[2]}`) : tout; });
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
  // En-tête : la navigation commune de Morand (Wealth, Guide, Map, CRDS) ; les deux catalogues du Guide passent sous l'introduction.
  const catalogues = nav[1].replace("Ressources communautaires", 'Ressources<span class="gm-long"> communautaires</span>')
    .replace(/Guides cliniques(\s*<span class="guides-onglet-compte">)/, 'Guides<span class="gm-long"> cliniques</span>$1');
  t = remplacer(t, /<header class="site">[\s\S]*?<\/header>/,
    `<header class="gm-tete"><a class="gm-marque" href="/">Morand</a><nav class="gm-onglets" aria-label="Outils Morand">${navMorand("guide")}</nav></header>`, "en-tête");
  const lead = (t.match(/<section class="guides-band guides-intro">[\s\S]*?(<p class="lead">[\s\S]*?<\/p>)/) || [])[1] || "";
  const sujet = pageGuides ? "guides de pratique pour la première ligne" : "ressources communautaires pour vos patients";
  t = remplacer(t, /<section class="guides-band guides-intro">[\s\S]*?<\/section>/,
    // Le sceau et le nom ramènent aux guides (et rechargent la page des guides).
    `<section class="guides-band gm-intro"><a class="gm-logo" href="/guides/" tabindex="-1" aria-hidden="true"><img src="/morand/sceau-guide.svg" alt="" width="128" height="128"></a>` +
    `<h1><a class="gm-nom" href="/guides/">Guide Morand</a><span class="visually-hidden"> : ${sujet}</span></h1>` +
    `<p class="gm-devise">Prévention · Pertinence · Expérience</p>${lead.replace('class="lead"', 'class="gm-lead"')}` +
    `<nav class="gm-sous" aria-label="Catalogue">${catalogues}</nav></section>`, "introduction");
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

/* Référencement de Guide Morand : adresse canonique absolue sous www.morand.org, aperçu de partage de Morand
   (morand/og-guide.png), et la page rattachée au site Morand dans les données structurées (plus à Trouve ta clinique). */
const MORAND = "https://www.morand.org";
function seoGuide(t, chemin) {
  const u = MORAND + chemin, image = `${MORAND}/morand/og-guide.png`;
  t = remplacer(t, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${u}">`, "adresse canonique");
  t = remplacer(t, /(<meta property="og:site_name" content=")[^"]*/, "$1Guide Morand", "nom du site (og)");
  t = remplacer(t, /(<meta property="og:url" content=")[^"]*/, `$1${u}`, "adresse (og)");
  const titre = (t.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (titre) t = remplacer(t, /(<meta property="og:title" content=")[^"]*/, `$1${titre}`, "titre (og)");
  t = remplacer(t, /(<meta property="og:image" content=")[^"]*/, `$1${image}`, "image (og)");
  t = remplacer(t, /(<meta property="og:image:alt" content=")[^"]*/, "$1Guide Morand : guides de pratique et ressources communautaires", "texte de l'image (og)");
  t = remplacer(t, /(<meta name="twitter:image" content=")[^"]*/, `$1${image}`, "image (twitter)");
  t = remplacer(t, /("@type":"CollectionPage",[^<]*?"url":")[^"]*(")/, `$1${u}$2`, "adresse (données structurées)");
  t = remplacer(t, /"isPartOf":\{"@type":"WebSite","name":"[^"]*","url":"[^"]*"\}/, `"isPartOf":{"@type":"WebSite","@id":"${MORAND}/#site","name":"Morand","url":"${MORAND}/"}`, "site (données structurées)");
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
  ecrire(page, seoGuide(faviconMorand(versOrigine(nettoyer(alleger(t, page.endsWith("guides/index.html")))), "Guide Morand"), "/" + page.replace(/index\.html$/, "")));
}
/* Ressources ajoutées par Morand (outils/guides-ajouts.mjs) : la fiche dans la liste de son sujet, après sa voisine,
   dans guides/donnees.json et en tête de « Récemment ajoutés » ; les nombres (catalogue, sujet, organisme, format) suivent. */
{
  const fj = path.join(RACINE, "guides/donnees.json"), fh = path.join(RACINE, "guides/index.html");
  const donnees = JSON.parse(fs.readFileSync(fj, "utf8"));
  let t = fs.readFileSync(fh, "utf8");
  const h = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const plusUn = (motif, nom) => { t = remplacer(t, motif, (_, a, n, b) => `${a}${+n + 1}${b}`, nom); };
  const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const ajoutes = [];
  for (const { apres, ...g } of AJOUTS_GUIDES) {
    if (donnees.some(x => x.url === g.url)) continue;   // déjà dans le catalogue d'origine
    const i = donnees.findIndex(x => x.url === apres);
    donnees.splice(i < 0 ? donnees.length : i + 1, 0, g);
    const abo = g.acces === "abonnement";
    const li = `<li class="guides-resource" data-tags="${h(g.tags)}" data-id="${h(g.url)}" data-title="${h(g.title)}" data-org="${h(g.org)}" data-desc="${h(g.desc)}" data-category="${h(g.cat)}" data-format="${h(g.format)}"${abo ? ' data-abo="1"' : ""}>
        <a class="guides-resource-link" href="${h(g.url)}" target="_blank" rel="noopener noreferrer">
          <span class="guides-resource-source">${h(g.org)}${abo ? ' <span class="guides-acces">Abonnement requis</span>' : ""}${/\.pdf($|[#?])/i.test(g.url) ? ' <span class="guides-pdf">PDF</span>' : ""}</span>
          <h3>${h(g.title)}</h3>
          <span class="guides-resource-desc">${h(g.desc)}</span>
          <span class="guides-resource-arrow" aria-hidden="true">↗</span>
          <span class="visually-hidden"> (nouvel onglet)</span>
        </a>
      </li>`;
    // Après la fiche voisine ; sinon, à la fin de la liste du sujet.
    const voisine = new RegExp(`(<li class="guides-resource"[^>]*data-id="${echapper(h(apres || "-"))}"[^>]*>[\\s\\S]*?</li>)`);
    const sujet = new RegExp(`(<h2 id="guides-category-\\d+">${echapper(h(g.cat))}</h2>[\\s\\S]*?)(</ul>)`);
    t = voisine.test(t) ? t.replace(voisine, `$1\n${li}`) : remplacer(t, sujet, `$1\n${li}$2`, `sujet ${g.cat}`);
    plusUn(new RegExp(`(<h2 id="guides-category-\\d+">${echapper(h(g.cat))}</h2><span class="compte">)(\\d+)(<)`), `nombre du sujet ${g.cat}`);
    plusUn(new RegExp(`(<option value="${echapper(h(g.cat))}">[^<]*\\()(\\d+)(\\))`), `filtre du sujet ${g.cat}`);
    plusUn(new RegExp(`(<option value="${echapper(h(g.org))}">[^<]*\\()(\\d+)(\\))`), `filtre de l'organisme ${g.org}`);
    plusUn(new RegExp(`(<select id="guides-filtre-format"[\\s\\S]*?<option value="${echapper(h(g.format))}">[^<]*\\()(\\d+)(\\))`), `filtre du format ${g.format}`);
    plusUn(/(<span class="guides-onglet-compte">)(\d+)(<\/span><\/a><a href="\/guides\/ressources-communautaires\/")/, "nombre des guides cliniques");
    plusUn(/("numberOfItems":)(\d+)(})/, "nombre de la collection");
    plusUn(/(<p class="guides-status" id="guide-status"[^>]*>)(\d+)( ressources)/, "nombre du catalogue");
    ajoutes.push(g);
  }
  // Récemment ajoutés : les nouvelles fiches en tête, la liste garde sa longueur.
  for (const g of ajoutes.sort((a, b) => a.ajoute.localeCompare(b.ajoute))) {
    const [a, m, j] = g.ajoute.split("-").map(Number);
    const item = `<li><a href="${h(g.url)}" target="_blank" rel="noopener noreferrer">${h(g.title)}<span class="visually-hidden"> (nouvel onglet)</span></a> <span class="guides-recents-meta">${h(g.org)} · ajouté le ${j === 1 ? "1er" : j} ${MOIS[m - 1]} ${a}</span></li>`;
    t = remplacer(t, /(<ol class="guides-recents-liste">\s*)([\s\S]*?)(\s*<\/ol>)/, (_, d, liste, f) => {
      const items = liste.split(/\n\s*/).filter(Boolean);
      return d + [item, ...items.slice(0, Math.max(0, items.length - 1))].join("\n        ") + f;
    }, "Récemment ajoutés");
  }
  // Le nombre des guides cliniques, aussi dans l'onglet de la page des ressources communautaires.
  if (ajoutes.length) {
    const fr = path.join(RACINE, "guides/ressources-communautaires/index.html");
    const r = fs.readFileSync(fr, "utf8"), r2 = r.replace(/(<a href="\/guides\/">Guides<span class="gm-long"> cliniques<\/span> <span class="guides-onglet-compte">)(\d+)(<)/, (_, a, n, b) => `${a}${+n + ajoutes.length}${b}`);
    if (r2 === r) throw new Error("Guide Morand : nombre des guides cliniques introuvable dans les ressources communautaires.");
    fs.writeFileSync(fr, r2);
  }
  fs.writeFileSync(fh, t);
  fs.writeFileSync(fj, JSON.stringify(donnees, null, 2) + "\n");
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
