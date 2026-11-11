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

const [source, fichierMotifs] = process.argv.slice(2);
if (!source || !fs.existsSync(path.join(source, "monteregie/index.html"))) {
  console.error("Usage : node outils/construire.mjs <dépôt trouvetaclinique.github.io> [motifs]"); process.exit(2);
}
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
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
const GARDES = /^\/(guides\/|assets\/|favicon-\d+\.png|$)/;
const versOrigine = html => html.replace(/(href|src)="(\/[^"]*)"/g, (tout, att, p) => GARDES.test(p) ? tout : `${att}="${ORIGINE}${p}"`);

// ---------- Map Morand : la carte interactive de la Montérégie (/monteregie/) ----------
for (const f of ["data.json", "data-etablissements.json", "data-etablissements-centre.json", "leaflet.css", "leaflet.js",
  "territoires-rls-centre-ouest.js", "territoires-rls-est.js", "territoires-monteregie.js", "favicon-16.png", "favicon-32.png", "favicon-48.png", "vendor"])
  if (fs.existsSync(path.join(source, f))) copier(f, "map/" + f);
let carte = lire("monteregie/index.html");
carte = carte.replace(/(["'`(])\.\.\//g, "$1./");
carte = versOrigine(nettoyer(carte));
// L'adresse canonique reste celle de la carte d'origine : les moteurs de recherche ne la voient pas en double.
ecrire("map/index.html", carte);

// ---------- Guide Morand : le catalogue de guides (/guides/) ----------
copier("guides", "guides");
for (const f of ["guides-aiguillage.js", "guides-cliniques.css", "guides-cliniques.js", "guides-installer.js", "guides-recherche.js",
  "logo-128.webp", "logo-128.png", "og-guides.png", "recherche.js", "seo-pages.css", "theme.js", "polices"])
  if (fs.existsSync(path.join(source, "assets", f))) copier("assets/" + f, "assets/" + f);
if (fs.existsSync(path.join(source, "favicon-32.png"))) copier("favicon-32.png", "favicon-32.png");
for (const page of ["guides/index.html", "guides/ressources-communautaires/index.html"]) {
  let t = lire(page);
  t = t.replace(/(<section class="guides-band guides-ia"[^>]*?)data-url="[^"]*"/, ADRESSE_IA ? `$1data-url="${ADRESSE_IA}"` : "$1data-url=\"\" hidden");
  ecrire(page, versOrigine(nettoyer(t)));
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
