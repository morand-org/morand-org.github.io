/* MSK Morand : fiches high yield. Produit, pour chaque région qui a un fichier outils/locomoteur/fiches-hy/<région>.json
   (extrait du PDF du clinicien par fiches-hy/extraire.py) :
     locomoteur/<région>/fiches/index.html          bibliothèque de la région
     locomoteur/<région>/fiches/<slug>/index.html   une page par fiche (8 encadrés, planche, références)
     locomoteur/fiches-hy.js                        lien diagnostic du calcul → fiche, pour la page de résultats
   et met à jour la liste des fiches de l'accueil (entre les marqueurs <!-- fiches-hy --> et <!-- /fiches-hy -->).
   Les termes passent par termes-quebec.mjs.
     node outils/locomoteur/fiches-hy.mjs */
import fs from "node:fs";
import path from "node:path";
import { quebeciser } from "./termes-quebec.mjs";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const ecrire = (f, t) => { fs.mkdirSync(path.dirname(path.join(RACINE, f)), { recursive: true }); fs.writeFileSync(path.join(RACINE, f), t); };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Région : nom, calcul lié, et fiche → diagnostic du calcul.
const REGIONS = {
  cervical: { nom: "Rachis cervical", calcul: "le cou", liens: { C1: "nonspec", C2: "myofascial", C3: "facettaire", C4: "arthrose", C5: "entorse", C6: "cervicogenique", C7: "musculaire",
    C8: "radiculopathie", C9: "stinger", C10: "torticolis", C12: "ppr", C13: "myelopathie", C14: "par", C15: "fracture", C16: "defile", C18: "infection", C19: "arnold" } },
};
const SECTIONS = [["epidemiologie", "Épidémiologie"], ["presentation", "Présentation clinique"], ["examen", "Examen physique"], ["physiopathologie", "Physiopathologie"],
  ["ddx", "Diagnostic différentiel"], ["investigations", "Investigations"], ["traitement", "Traitement"], ["pronostic", "Pronostic"]];
const PROPRES = [[/\barnold\b/g, "Arnold"], [/\bgrisel\b/g, "Grisel"], [/\bpecarn\b/g, "PECARN"], [/\bc-spine\b/g, "C-spine"], [/\bkanavel\b/g, "Kanavel"], [/\b(c\d)/g, m => m.toUpperCase()]];
const phrase = t => { let s = t.toLocaleLowerCase("fr-CA"); for (const [re, r] of PROPRES) s = s.replace(re, r); return s.charAt(0).toLocaleUpperCase("fr-CA") + s.slice(1); };
const titreDe = f => quebeciser(phrase(f.titre.replace(/\s*\(FICHE DE RÉFÉRENCE\)/, "")));
const slug = (f, titre) => `${f.no.toLowerCase()}-${titre.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60).replace(/-$/, "")}`;
const majuscule = s => s.charAt(0).toLocaleUpperCase("fr-CA") + s.slice(1);

const tete = (titre, description, profondeur) => `<!doctype html>
<html lang="fr-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="/morand/plein-ecran.js"></script>
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(titre)} | MSK Morand (prototype)</title>
<!-- Prototype caché : absent du plan du site et de l'accueil, non indexé. Produit par node outils/locomoteur/fiches-hy.mjs. -->
<meta name="robots" content="noindex,nofollow">
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#fdfcf8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#12110d" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/morand/icone.svg" type="image/svg+xml">
<link rel="icon" href="/morand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/morand/apple-touch-icon.png">
<link rel="preload" href="/morand/newsreader.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/crds/crds.css">
<link rel="stylesheet" href="/locomoteur/locomoteur.css">
<link rel="stylesheet" href="/locomoteur/fiches-hy.css">
</head>
<body class="hy">
<header class="cr-tete">
  <a class="cr-marque" href="/">Morand</a>
  <nav class="cr-onglets" aria-label="Outils Morand">
    <a href="/wealth/">Wealth</a>
    <a href="/guides/">Guide</a>
    <a href="/map/">Map</a>
    <a href="/crds/">CRDS</a>
    <a href="/codes/">Codes</a>
    <a href="/locomoteur/" aria-current="page">MSK</a>
  </nav>
</header>
<main class="hy-page">
`;
const pied = `</main>
<footer class="cr-pied"><a href="/confidentialite/">Confidentialité</a><span>MMXXVI</span></footer>
</body>
</html>
`;

const liensJs = {}, resume = [];
for (const [region, R] of Object.entries(REGIONS)) {
  const source = path.join(RACINE, `outils/locomoteur/fiches-hy/${region}.json`);
  if (!fs.existsSync(source)) continue;
  const fiches = JSON.parse(fs.readFileSync(source, "utf8")).map(f => {
    const titre = titreDe(f);
    return { ...f, titreFr: titre, slug: slug(f, titre), tagsFr: quebeciser(phrase(f.tags)), dx: R.liens[f.no] || null };
  });
  const base = `/locomoteur/${region}/fiches/`;
  liensJs[region] = Object.fromEntries(fiches.filter(f => f.dx).map(f => [f.dx, { u: `${base}${f.slug}/`, no: f.no }]));

  fiches.forEach((f, i) => {
    const refs = new Map(f.refs.map(r => [r.n, r]));
    const appel = ns => ns.map(n => `<a href="#r${n}">${n}</a>`).join(",");
    const cases = SECTIONS.map(([cle, nom]) => {
      const c = f[cle] || { texte: "", refs: [] };
      return `      <section class="hy-case"><h2>${nom}</h2><p>${esc(majuscule(quebeciser(c.texte)))}${c.refs.length ? `<sup class="hy-appel">${appel(c.refs)}</sup>` : ""}</p></section>`;
    }).join("\n");
    const ordre = [...new Set(SECTIONS.flatMap(([cle]) => (f[cle] || { refs: [] }).refs))].filter(n => refs.has(n));
    const listeRefs = ordre.map(n => { const r = refs.get(n); return `        <li id="r${n}" value="${n}">${r.url ? `<a href="${esc(r.url)}" rel="noopener">${esc(r.texte)}</a>` : esc(r.texte)}</li>`; }).join("\n");
    const prec = fiches[i - 1], suiv = fiches[i + 1];
    const html = tete(`${f.no} ${f.titreFr}`, `Fiche high yield ${f.no} : ${f.titreFr}. Épidémiologie, présentation, examen, différentiel, investigations, traitement et pronostic, avec références.`) + `  <nav class="hy-fil" aria-label="Fil d'Ariane"><a href="/locomoteur/">MSK Morand</a><span aria-hidden="true">›</span><a href="${base}">${esc(R.nom)} : fiches</a><span aria-hidden="true">›</span><span>${f.no}</span></nav>
  <article class="hy-fiche">
    <header class="hy-tete"><p class="hy-no">Fiche ${f.no}</p><p class="hy-tags">${esc(f.tagsFr)}</p></header>
    <h1 class="hy-titre">${esc(f.titreFr)}</h1>
    <figure class="hy-planche"><img src="${base}img/${f.no.toLowerCase()}.webp" alt="Planche anatomique : ${esc(f.titreFr.toLocaleLowerCase("fr-CA"))}" width="480" height="643"></figure>
    <div class="hy-grille">
${cases}
    </div>
    <p class="hy-signature"><img src="/locomoteur/signature-morand.webp" alt="Dr Morand" width="174" height="56"></p>
    <section class="hy-refs" aria-labelledby="hy-refs-titre">
      <h2 id="hy-refs-titre">Références</h2>
      <ol>
${listeRefs}
      </ol>
    </section>
  </article>
  <p class="hy-actions">${f.dx ? `<a class="lo-bouton" href="/locomoteur/${region}/">Ouvrir le calcul pour ${esc(R.calcul)}</a>` : ""}<a class="lo-lien" href="${base}">Toutes les fiches</a></p>
  <nav class="hy-suite" aria-label="Fiches voisines">${prec ? `<a href="${base}${prec.slug}/" rel="prev"><span>${prec.no}</span> ${esc(prec.titreFr)}</a>` : "<span></span>"}${suiv ? `<a href="${base}${suiv.slug}/" rel="next"><span>${suiv.no}</span> ${esc(suiv.titreFr)}</a>` : "<span></span>"}</nav>
` + pied;
    ecrire(`locomoteur/${region}/fiches/${f.slug}/index.html`, html);
  });

  const cartes = fiches.map(f => `    <li><a class="hy-carte" href="${base}${f.slug}/"><img src="${base}img/${f.no.toLowerCase()}.webp" alt="" width="480" height="643" loading="lazy">
      <span class="hy-carte-texte"><span class="hy-carte-no">${f.no}${f.dx ? `<span class="hy-carte-calcul">dans le calcul</span>` : ""}</span><span class="hy-carte-titre">${esc(f.titreFr)}</span><span class="hy-carte-tags">${esc(f.tagsFr)}</span></span></a></li>`).join("\n");
  ecrire(`locomoteur/${region}/fiches/index.html`, tete(`${R.nom} : fiches`, `Fiches high yield, ${R.nom.toLocaleLowerCase("fr-CA")} : une page par pathologie, avec références.`) + `  <nav class="hy-fil" aria-label="Fil d'Ariane"><a href="/locomoteur/">MSK Morand</a><span aria-hidden="true">›</span><span>${esc(R.nom)} : fiches</span></nav>
  <section class="cr-intro hy-intro">
    <h1>${esc(R.nom)}</h1>
    <p class="cr-devise">Fiches high yield</p>
    <p class="cr-lead">${fiches.length} fiches d'une page : épidémiologie, présentation, examen, physiopathologie, différentiel, investigations, traitement et pronostic, avec leurs références. Les fiches marquées « dans le calcul » s'ouvrent aussi depuis les résultats.</p>
    <p class="hy-actions"><a class="lo-bouton" href="/locomoteur/${region}/">Ouvrir le calcul pour ${esc(R.calcul)}</a></p>
  </section>
  <ol class="hy-biblio">
${cartes}
  </ol>
  <p class="cr-petit hy-note">Fiches rédigées par le clinicien à partir de la littérature citée ; termes adaptés à l'usage québécois.</p>
` + pied);
  resume.push({ region, nom: R.nom, n: fiches.length, lies: Object.keys(liensJs[region]).length });
}

ecrire("locomoteur/fiches-hy.js", `/* Produit par node outils/locomoteur/fiches-hy.mjs. Ne pas modifier à la main.
   Diagnostic du calcul → fiche high yield de la région. */
(function () { (window.Locomoteur = window.Locomoteur || {}).fichesHY = ${JSON.stringify(liensJs)}; })();
`);

// Accueil : liste des bibliothèques de fiches.
const hubF = path.join(RACINE, "locomoteur/index.html");
let hub = fs.readFileSync(hubF, "utf8");
const bloc = `<!-- fiches-hy -->
  <h2 class="lo-regions-titre">Fiches high yield</h2>
  <ol class="lo-regions cr-specs">
${resume.map(r => `    <li><a class="cr-spec lo-hy-region" href="/locomoteur/${r.region}/fiches/"><span class="cr-spec-nom">${esc(r.nom)}</span><span class="cr-spec-sous">${r.n} fiches</span></a></li>`).join("\n")}
  </ol>
  <!-- /fiches-hy -->`;
hub = hub.includes("<!-- fiches-hy -->") ? hub.replace(/<!-- fiches-hy -->[\s\S]*?<!-- \/fiches-hy -->/, bloc) : hub.replace('  <details class="cr-sources">', `  ${bloc}\n\n  <details class="cr-sources">`);
fs.writeFileSync(hubF, hub);
console.log(resume.map(r => `${r.region} : ${r.n} fiches, ${r.lies} liées au calcul`).join("\n"));
