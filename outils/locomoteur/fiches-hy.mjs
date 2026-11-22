/* MSK Morand : fiches high yield. Produit, pour chaque région de REGIONS dont les fichiers outils/locomoteur/fiches-hy/<série>.json
   existent (extraits des PDF du clinicien par fiches-hy/extraire.py, avec leurs planches dans locomoteur/<région>/fiches/img/) :
     locomoteur/<région>/fiches/index.html          bibliothèque de la région (une section par série : poignet et main, lombaire et dorsal)
     locomoteur/<région>/fiches/<slug>/index.html   une page par fiche (8 encadrés ou renvoi, planche, références)
     locomoteur/fiches-hy.js                        lien diagnostic du calcul → fiche, pour la page de résultats
   et met à jour la liste des fiches de l'accueil (entre les marqueurs <!-- fiches-hy --> et <!-- /fiches-hy -->).
   Les termes passent par termes-quebec.mjs. Les renvois (« Voir la fiche C12 ») deviennent des liens, d'une région à l'autre.
     node outils/locomoteur/fiches-hy.mjs */
import fs from "node:fs";
import path from "node:path";
import { quebeciser } from "./termes-quebec.mjs";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const ecrire = (f, t) => { fs.mkdirSync(path.dirname(path.join(RACINE, f)), { recursive: true }); fs.writeFileSync(path.join(RACINE, f), t); };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Régions : nom, calcul lié, séries de fiches (fichier JSON) et diagnostic du calcul → code de fiche (une fiche d'une autre
   région est permise, ex. la radiculopathie cervicale « C8 » depuis le coude). */
const REGIONS = {
  cervical: { nom: "Rachis cervical", calcul: "le cou", series: [{ fichier: "cervical", nom: "Rachis cervical" }],
    dx: { nonspec: "C1", myofascial: "C2", facettaire: "C3", arthrose: "C4", entorse: "C5", cervicogenique: "C6", musculaire: "C7", radiculopathie: "C8", stinger: "C9", torticolis: "C10",
      ppr: "C12", myelopathie: "C13", par: "C14", fracture: "C15", defile: "C16", infection: "C18", arnold: "C19" } },
  epaule: { nom: "Épaule", calcul: "l'épaule", series: [{ fichier: "epaule", nom: "Épaule" }],
    dx: { sous_acro: "E1", myalgie: "E2", capsulite: "E3", ac_entorse: "E4", rupture: "E5", dyskinesie: "E6", fracture_hp: "E7", clavicule: "E8", omarthrose: "E9", calcifiante: "E10",
      instab_ant: "E11", ac_arthrose: "E12", ppr: "E13", biceps: "E14", cervical: "E15", slap: "E16", instab_post: "E19" } },
  coude: { nom: "Coude", calcul: "le coude", series: [{ fichier: "coude", nom: "Coude" }],
    dx: { epi_lat: "Co1", epi_med: "Co2", lanceur: "Co4", fracture: "Co6", tunnel_cubital: "Co7", bursite: "Co8", bursite_septique: "Co8", arthrose: "Co9", luxation: "Co12", lcu: "Co13",
      biceps: "Co14", ocd: "Co15", conflit_post: "Co17", triceps: "Co18", tunnel_radial: "Co19", arthrite: "Co20", cervical: "C8", nonspec: "Co21" } },
  poignet: { nom: "Poignet et main", calcul: "le poignet ou la main", series: [{ fichier: "poignet", nom: "Poignet" }, { fichier: "main", nom: "Main" }],
    dx: { canal_carpien: "P1", fx_radius: "P2", nonspec: "P3", kyste: "P4", dequervain: "P5", tenosynovite: "P6", arthrose_poignet: "P7", tfcc: "P8", scaphoide: "P9", scapholunaire: "P10",
      par: "P11", gymnaste: "P12", cristaux: "P13", hamatum: "P16", kienbock: "P17", guyon: "P18", perilunaire: "P20", arthrose_digitale: "M1", rhizarthrose: "M2", ressaut: "M3",
      entorse_doigt: "M5", fx_main: "M6", dupuytren: "M7", lcu_pouce: "M10", maillet: "M12", psoriasique: "M13", poulie: "M14", jersey: "M15", teno_infectieuse: "M20", cervical: "C8" } },
  lombaire: { nom: "Rachis lombaire et dorsal", calcul: "le dos", series: [{ fichier: "lombaire", nom: "Rachis lombaire" }, { fichier: "dorsal", nom: "Rachis dorsal" }],
    dx: { commune: "L1", musculaire: "L2", discogenique: "L3", facettaire: "L4", grossesse: "L5", stenose: "L6", si: "L7", hernie: "L8", spondylolisthesis: "L9", fracture_osteo: "L10",
      spondylolyse: "L11", scoliose: "L12", spa: "L13", cancer: "L18", infection: "L19", queue: "L20" } },
  hanche: { nom: "Hanche et bassin", calcul: "la hanche", series: [{ fichier: "hanche", nom: "Hanche et bassin" }],
    dx: { coxarthrose: "H1", sdgt: "H2", adducteurs: "H3", ij_aigu: "H4", fracture: "H5", cfa: "H6–7", psoas: "H9", piriforme: "H10", meralgie: "H11", osteite: "H12", parietale: "H13",
      avulsion: "H14", ij_tendino: "H15", epiphysiolyse: "H17", ff_col: "H19", osteonecrose: "H20", apophysite: "H22", contusion: "H23", bassin: "H24", lombaire: "H25", ppr: "H26" } },
};
const SECTIONS = [["epidemiologie", "Épidémiologie"], ["presentation", "Présentation clinique"], ["examen", "Examen physique"], ["physiopathologie", "Physiopathologie"],
  ["ddx", "Diagnostic différentiel"], ["investigations", "Investigations"], ["traitement", "Traitement"], ["pronostic", "Pronostic"]];
// Titres en capitales → phrase ; noms propres et sigles rétablis.
const NOMS_PROPRES = ["Arnold", "Grisel", "Kanavel", "Dupuytren", "Bennett", "Kienböck", "Guyon", "Heberden", "Bouchard", "Milwaukee", "Legg-Calvé-Perthes", "Bertolotti", "Scheuermann",
  "Tietze", "Essex-Lopresti", "Osgood-Schlatter", "Sever", "Haglund", "Morton", "Lisfranc", "Freiberg", "Iselin", "Charcot", "Hoffa", "Baker", "Mason"];
const SIGLES = ["PECARN", "SLAP", "IPP", "IPD", "MCP", "DISH", "TFCC", "LCA", "LCP", "ACR", "EULAR", "AJI", "PAR"];
const PROPRES = [...NOMS_PROPRES.map(n => [new RegExp(`(^|[^\\p{L}])${n.toLocaleLowerCase("fr-CA")}(?![\\p{L}])`, "gu"), `$1${n}`]),
  ...SIGLES.map(n => [new RegExp(`(^|[^\\p{L}])${n.toLowerCase()}(?![\\p{L}])`, "gu"), `$1${n}`]),
  [/\bde quervain\b/g, "De Quervain"], [/\bc-spine\b/g, "C-spine"], [/(^|[\s(])([cdlst])(\d)/g, (m, a, l, d) => `${a}${l.toUpperCase()}${d}`]];
const phrase = t => { let s = t.toLocaleLowerCase("fr-CA"); for (const [re, r] of PROPRES) s = s.replace(re, r); return s.charAt(0).toLocaleUpperCase("fr-CA") + s.slice(1); };
const titreDe = f => quebeciser(phrase(f.titre.replace(/\s*\((FICHE DE RÉFÉRENCE|LOMBAIRE)\)/, "")));
const sansAccents = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const slug = (f, titre) => `${sansAccents(f.no).toLowerCase().replace(/[–-]/g, "-")}-${sansAccents(titre).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60).replace(/-$/, "")}`;
const majuscule = s => s.charAt(0).toLocaleUpperCase("fr-CA") + s.slice(1);
// Mots composés coupés en fin de ligne dans le PDF : « prono- supination » → « prono-supination ».
const recoller = t => t.replace(/(\p{L})- (\p{L})/gu, "$1-$2");
const CODE = /\b(Co|[CDEHLMP])(\d+(?:[–-]\d+)?)\b/g;

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

// 1. Toutes les fiches, indexées par code, pour les renvois d'une région à l'autre.
const index = new Map(), parRegion = {};
for (const [region, R] of Object.entries(REGIONS)) {
  parRegion[region] = [];
  for (const serie of R.series) {
    const source = path.join(RACINE, `outils/locomoteur/fiches-hy/${serie.fichier}.json`);
    if (!fs.existsSync(source)) continue;
    for (const f of JSON.parse(fs.readFileSync(source, "utf8"))) {
      const titre = titreDe(f), x = { ...f, region, serie: serie.nom, titreFr: titre, slug: slug(f, titre), tagsFr: quebeciser(phrase(f.tags)) };
      x.u = `/locomoteur/${region}/fiches/${x.slug}/`;
      index.set(f.no, x); parRegion[region].push(x);
    }
  }
}
// Renvoi seul (« Voir la fiche C12. ») : le lien depuis le calcul mène directement à la fiche visée.
const cible = code => { const f = index.get(code); if (!f) return null; const m = f.renvoi && f.renvoi.texte.match(/^Voir la fiche ((?:Co|[CDEHLMP])\d+)\.$/); return m && index.get(m[1]) ? index.get(m[1]) : f; };
// Codes de fiche liés, seulement dans la phrase « Voir… » (ailleurs, « L5 » ou « C7 » sont des niveaux vertébraux).
const lierRenvoi = texte => {
  const t = esc(majuscule(quebeciser(recoller(texte)))), fin = t.search(/\.\s|\.$/);
  const tete = fin < 0 ? t : t.slice(0, fin), reste = fin < 0 ? "" : t.slice(fin);
  return (/^Voir\b/.test(tete) ? tete.replace(CODE, (m, a, b) => { const f = index.get(a + b); return f ? `<a href="${f.u}" title="${esc(f.titreFr)}">${m}</a>` : m; }) : tete) + reste;
};

const liensJs = {}, resume = [];
for (const [region, R] of Object.entries(REGIONS)) {
  const fiches = parRegion[region];
  if (!fiches.length) continue;
  const base = `/locomoteur/${region}/fiches/`, dxDe = new Map();
  // Retire les pages d'anciennes fiches (titre ou numéro changé).
  const dossier = path.join(RACINE, `locomoteur/${region}/fiches`), slugs = new Set(fiches.map(f => f.slug));
  if (fs.existsSync(dossier)) for (const d of fs.readdirSync(dossier, { withFileTypes: true }))
    if (d.isDirectory() && d.name !== "img" && !slugs.has(d.name)) fs.rmSync(path.join(dossier, d.name), { recursive: true });
  liensJs[region] = {};
  for (const [dx, code] of Object.entries(R.dx)) {
    const f = cible(code);
    if (!f) { console.warn(`${region} : fiche ${code} introuvable pour ${dx}`); continue; }
    liensJs[region][dx] = { u: f.u, no: f.no };
    if (index.get(code).region === region) dxDe.set(code, dx);
  }

  fiches.forEach((f, i) => {
    const refs = new Map(f.refs.map(r => [r.n, r]));
    const appel = ns => ns.map(n => `<a href="#r${n}">${n}</a>`).join(",");
    const contenu = f.renvoi
      ? `    <div class="hy-grille hy-grille-renvoi">
      <section class="hy-case hy-renvoi"><h2>Renvoi et particularités</h2><p>${lierRenvoi(f.renvoi.texte)}${f.renvoi.refs.length ? `<sup class="hy-appel">${appel(f.renvoi.refs)}</sup>` : ""}</p></section>
    </div>`
      : `    <div class="hy-grille">
${SECTIONS.map(([cle, nom]) => {
  const c = f[cle] || { texte: "", refs: [] }, titre = c.titre ? majuscule(phrase(c.titre)) : nom;
  return `      <section class="hy-case"><h2>${esc(titre)}</h2><p>${esc(majuscule(quebeciser(recoller(c.texte))))}${c.refs.length ? `<sup class="hy-appel">${appel(c.refs)}</sup>` : ""}</p></section>`;
}).join("\n")}
    </div>`;
    const cites = f.renvoi ? f.renvoi.refs : SECTIONS.flatMap(([cle]) => (f[cle] || { refs: [] }).refs);
    const ordre = [...new Set([...cites, ...f.refs.map(r => r.n)])].filter(n => refs.has(n));
    const listeRefs = ordre.map(n => { const r = refs.get(n); return `        <li id="r${n}" value="${n}">${r.url ? `<a href="${esc(r.url)}" rel="noopener">${esc(r.texte)}</a>` : esc(r.texte)}</li>`; }).join("\n");
    const prec = fiches[i - 1], suiv = fiches[i + 1], dx = dxDe.get(f.no);
    const html = tete(`${f.no} ${f.titreFr}`, `Fiche high yield ${f.no} : ${f.titreFr}. Épidémiologie, présentation, examen, différentiel, investigations, traitement et pronostic, avec références.`) + `  <nav class="hy-fil" aria-label="Fil d'Ariane"><a href="/locomoteur/">MSK Morand</a><span aria-hidden="true">›</span><a href="${base}">${esc(R.nom)} : fiches</a><span aria-hidden="true">›</span><span>${f.no}</span></nav>
  <article class="hy-fiche">
    <header class="hy-tete"><p class="hy-no">Fiche ${f.no}</p><p class="hy-tags">${esc(f.tagsFr)}</p></header>
    <h1 class="hy-titre">${esc(f.titreFr)}</h1>
${f.planche ? `    <figure class="hy-planche"><img src="${base}img/${f.planche}" alt="Planche anatomique : ${esc(f.titreFr.toLocaleLowerCase("fr-CA"))}" width="480" height="643"></figure>\n` : ""}${contenu}
    <p class="hy-signature"><img src="/locomoteur/signature-morand.webp" alt="Dr Morand" width="174" height="56"></p>
${listeRefs ? `    <section class="hy-refs" aria-labelledby="hy-refs-titre">
      <h2 id="hy-refs-titre">Références</h2>
      <ol>
${listeRefs}
      </ol>
    </section>
` : ""}  </article>
  <p class="hy-actions">${dx ? `<a class="lo-bouton" href="/locomoteur/${region}/">Ouvrir le calcul pour ${esc(R.calcul)}</a>` : ""}<a class="lo-lien" href="${base}">Toutes les fiches</a></p>
  <nav class="hy-suite" aria-label="Fiches voisines">${prec ? `<a href="${prec.u}" rel="prev"><span>${prec.no}</span> ${esc(prec.titreFr)}</a>` : "<span></span>"}${suiv ? `<a href="${suiv.u}" rel="next"><span>${suiv.no}</span> ${esc(suiv.titreFr)}</a>` : "<span></span>"}</nav>
` + pied;
    ecrire(`locomoteur/${region}/fiches/${f.slug}/index.html`, html);
  });

  const carte = f => `    <li><a class="hy-carte" href="${f.u}">${f.planche ? `<img src="${base}img/${f.planche}" alt="" width="480" height="643" loading="lazy">` : "<span></span>"}
      <span class="hy-carte-texte"><span class="hy-carte-no">${f.no}${dxDe.has(f.no) ? `<span class="hy-carte-calcul">dans le calcul</span>` : ""}${f.renvoi ? `<span class="hy-carte-renvoi">renvoi</span>` : ""}</span><span class="hy-carte-titre">${esc(f.titreFr)}</span><span class="hy-carte-tags">${esc(f.tagsFr)}</span></span></a></li>`;
  const series = R.series.filter(s => fiches.some(f => f.serie === s.nom));
  const listes = series.map(s => `${series.length > 1 ? `  <h2 class="lo-regions-titre hy-serie">${esc(s.nom)}</h2>\n` : ""}  <ol class="hy-biblio">
${fiches.filter(f => f.serie === s.nom).map(carte).join("\n")}
  </ol>`).join("\n");
  ecrire(`locomoteur/${region}/fiches/index.html`, tete(`${R.nom} : fiches`, `Fiches high yield, ${R.nom.toLocaleLowerCase("fr-CA")} : une page par pathologie, avec références.`) + `  <nav class="hy-fil" aria-label="Fil d'Ariane"><a href="/locomoteur/">MSK Morand</a><span aria-hidden="true">›</span><span>${esc(R.nom)} : fiches</span></nav>
  <section class="cr-intro hy-intro">
    <h1>${esc(R.nom)}</h1>
    <p class="cr-devise">Fiches high yield</p>
    <p class="cr-lead">${fiches.length} fiches d'une page : épidémiologie, présentation, examen, physiopathologie, différentiel, investigations, traitement et pronostic, avec leurs références. Les fiches marquées « dans le calcul » s'ouvrent aussi depuis les résultats.</p>
    <p class="hy-actions"><a class="lo-bouton" href="/locomoteur/${region}/">Ouvrir le calcul pour ${esc(R.calcul)}</a></p>
  </section>
${listes}
  <p class="cr-petit hy-note">Fiches rédigées par le clinicien à partir de la littérature citée ; termes adaptés à l'usage québécois.</p>
` + pied);
  resume.push({ region, nom: R.nom, n: fiches.length, lies: Object.keys(liensJs[region]).length });
}

ecrire("locomoteur/fiches-hy.js", `/* Produit par node outils/locomoteur/fiches-hy.mjs. Ne pas modifier à la main.
   Diagnostic du calcul → fiche high yield (de la région ou d'une autre). */
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
console.log(resume.map(r => `${r.region} : ${r.n} fiches, ${r.lies} diagnostics liés`).join("\n"));
