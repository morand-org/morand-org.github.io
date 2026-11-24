/* MSK Morand : fiches patients (PDF du clinicien, une fiche de 2 à 4 pages par diagnostic : information au recto, exercices
   illustrés au verso). Pour chaque région :
     - outils/locomoteur/fiches-patients/<région>.json : numéro, titre et pages de chaque fiche (relevés par titres.py) ;
     - locomoteur/<région>/patients/<nn>-<titre>.pdf : la fiche découpée, prête à imprimer (seulement si le PDF source est
       donné : node outils/locomoteur/fiches-patients.mjs <région>=<fichier.pdf> …) ;
     - locomoteur/<région>/patients/index.html : la liste des fiches ;
     - locomoteur/fiches-patients.js : diagnostic du calcul → fiche patient, pour la page de résultats ;
   et la liste des régions à l'accueil (entre <!-- fiches-patients --> et <!-- /fiches-patients -->).
     node outils/locomoteur/fiches-patients.mjs [région=source.pdf …] */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sansAccents = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const slug = (no, t) => `${String(no).padStart(2, "0")}-${sansAccents(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60).replace(/-$/, "")}`;

// Région : nom, et numéro de fiche → diagnostic du calcul.
const REGIONS = {
  cervical: { nom: "Rachis cervical", dx: { 1: "nonspec", 2: "myofascial", 3: "facettaire", 4: "arthrose", 5: "entorse", 6: "cervicogenique", 7: "musculaire", 8: "radiculopathie", 9: "stinger", 10: "torticolis", 11: "defile", 12: "arnold" } },
  epaule: { nom: "Épaule", dx: { 1: "sous_acro", 2: "myalgie", 3: "capsulite", 4: "ac_entorse", 5: "rupture", 6: "dyskinesie", 7: "omarthrose", 8: "calcifiante", 9: "instab_ant", 10: "ac_arthrose", 11: "biceps", 12: "cervical", 13: "slap", 14: "instab_post" } },
  coude: { nom: "Coude", dx: { 1: "epi_lat", 2: "epi_med", 3: "lanceur", 4: "tunnel_cubital", 5: "bursite", 6: "arthrose", 7: "lcu", 8: "ocd", 9: "conflit_post", 10: "triceps", 11: "tunnel_radial", 12: "cervical" } },
  poignet: { nom: "Poignet et main", dx: { 1: "canal_carpien", 2: "kyste", 3: "dequervain", 4: "tenosynovite", 5: "arthrose_poignet", 6: "tfcc", 7: "scapholunaire", 8: "gymnaste", 9: "guyon", 10: "arthrose_digitale",
    11: "rhizarthrose", 12: "ressaut", 13: "entorse_doigt", 14: "dupuytren", 15: "lcu_pouce", 16: "poulie", 17: "cervical" } },
  lombaire: { nom: "Rachis lombaire", dx: { 1: "commune", 2: "musculaire", 3: "discogenique", 4: "facettaire", 5: "grossesse", 6: "stenose", 7: "si", 8: "hernie", 9: "spondylolisthesis", 10: "spondylolyse", 11: "scoliose", 12: "spa" } },
  hanche: { nom: "Hanche et bassin", dx: { 1: "coxarthrose", 2: "sdgt", 3: "adducteurs", 4: "ij_aigu", 5: "cfa", 6: "psoas", 7: "piriforme", 8: "meralgie", 9: "osteite", 10: "parietale", 11: "avulsion", 12: "ij_tendino", 13: "apophysite", 14: "contusion", 15: "lombaire" } },
  genou: { nom: "Genou", dx: { 1: "sfp", 2: "arthrose", 3: "menisque", 4: "lca", 5: "lcp", 6: "collat", 7: "rotule", 8: "tendino", 9: "hoffa", 10: "bit", 11: "bprep", 12: "poie", 13: "osgood", 14: "slj", 15: "contusion", 16: "plica", 17: "discoide", 18: "baker" } },
  cheville: { nom: "Cheville et jambe", dx: { 1: "entorse_lat", 2: "instab", 3: "achille", 4: "insertion", 5: "periostite", 6: "loge", 7: "mollet", 8: "sever", 9: "tibpost", 10: "arthrose", 11: "syndesmose", 12: "deltoide", 13: "fibulaires", 14: "conflit", 15: "tarsien" } },
  pied: { nom: "Pied", dx: { 1: "fasciite", 2: "hallux_valgus", 3: "orteils", 4: "arthrose_mp", 5: "hallux_rigidus", 6: "metatarsalgie", 7: "morton", 8: "turf_toe", 9: "sesamoide", 10: "synostose", 11: "os_navic", 12: "iselin", 13: "sever", 14: "contusion" } },
};

const sources = Object.fromEntries(process.argv.slice(2).map(a => a.split("=")));
const tete = titre => `<!doctype html>
<html lang="fr-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="/morand/plein-ecran.js"></script>
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(titre)} | MSK Morand</title>
<!-- Produit par node outils/locomoteur/fiches-patients.mjs. -->
<meta name="description" content="Fiches d'information et d'exercices à remettre au patient, une par pathologie, prêtes à imprimer.">
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

const liens = {}, resume = [];
for (const [region, R] of Object.entries(REGIONS)) {
  const index = path.join(RACINE, `outils/locomoteur/fiches-patients/${region}.json`);
  if (!fs.existsSync(index)) continue;
  const { fiches } = JSON.parse(fs.readFileSync(index, "utf8"));
  const dossier = path.join(RACINE, `locomoteur/${region}/patients`);
  fs.mkdirSync(dossier, { recursive: true });
  // Découpage (une fois, depuis le PDF source) : pages debut à fin de chaque fiche.
  if (sources[region]) {
    for (const f of fiches) {
      const sortie = path.join(dossier, `${slug(f.no, f.titre)}.pdf`);
      execFileSync("python3", ["-I", path.join(RACINE, "outils/locomoteur/fiches-patients/decouper.py"), sources[region], String(f.debut), String(f.fin), sortie]);
    }
  }
  liens[region] = {};
  for (const f of fiches) {
    const u = `/locomoteur/${region}/patients/${slug(f.no, f.titre)}.pdf`, dx = R.dx[f.no];
    if (!fs.existsSync(path.join(RACINE, u))) throw new Error(`Fiche absente : ${u} (donner le PDF source : ${region}=fichier.pdf)`);
    f.u = u; f.dx = dx;
    if (dx) liens[region][dx] = { u, titre: f.titre };
  }
  const ko = f => Math.round(fs.statSync(path.join(RACINE, f.u)).size / 1024);
  fs.writeFileSync(path.join(dossier, "index.html"), tete(`${R.nom} : fiches patients`) + `  <nav class="hy-fil" aria-label="Fil d'Ariane"><a href="/locomoteur/">MSK Morand</a><span aria-hidden="true">›</span><span>${esc(R.nom)} : fiches patients</span></nav>
  <section class="cr-intro hy-intro">
    <h1>${esc(R.nom)}</h1>
    <p class="cr-devise">Fiches patients</p>
    <p class="cr-lead">${fiches.length} fiches à remettre au patient : ce qu'il a, ce qui aide, ce qu'il faut éviter pour l'instant, quand reconsulter, puis un programme d'exercices illustré. Chaque fiche s'ouvre en PDF, prête à imprimer recto verso.</p>
    <p class="hy-actions"><a class="lo-bouton" href="/locomoteur/${region}/">Ouvrir le calcul</a></p>
  </section>
  <ol class="hy-patients">
${fiches.map(f => `    <li><a href="${f.u}" target="_blank" rel="noopener"><span class="hy-carte-no">Fiche ${f.no}</span><span class="hy-carte-titre">${esc(f.titre)}</span><span class="hy-carte-tags">PDF · ${f.fin - f.debut + 1} pages · ${ko(f)} Ko</span></a></li>`).join("\n")}
  </ol>
  <p class="cr-petit hy-note">Document d'information générale rédigé par le Dr Morand ; il ne remplace pas l'avis du médecin ou du physiothérapeute qui suit le patient.</p>
` + pied);
  resume.push({ region, nom: R.nom, n: fiches.length, lies: Object.keys(liens[region]).length });
}

fs.writeFileSync(path.join(RACINE, "locomoteur/fiches-patients.js"), `/* Produit par node outils/locomoteur/fiches-patients.mjs. Ne pas modifier à la main.
   Diagnostic du calcul → fiche patient (PDF prêt à imprimer). */
(function () { (window.Locomoteur = window.Locomoteur || {}).fichesPatients = ${JSON.stringify(liens)}; })();
`);

const hubF = path.join(RACINE, "locomoteur/index.html");
let hub = fs.readFileSync(hubF, "utf8");
const bloc = `<!-- fiches-patients -->
  <h2 class="lo-regions-titre">Fiches patients</h2>
  <ol class="lo-regions cr-specs">
${resume.map(r => `    <li><a class="cr-spec lo-hy-region" href="/locomoteur/${r.region}/patients/"><span class="cr-spec-nom">${esc(r.nom)}</span><span class="cr-spec-sous">${r.n} fiches</span></a></li>`).join("\n")}
  </ol>
  <!-- /fiches-patients -->`;
hub = hub.includes("<!-- fiches-patients -->") ? hub.replace(/<!-- fiches-patients -->[\s\S]*?<!-- \/fiches-patients -->/, bloc) : hub.replace('  <details class="cr-sources">', `  ${bloc}\n\n  <details class="cr-sources">`);
fs.writeFileSync(hubF, hub);
console.log(resume.map(r => `${r.region} : ${r.n} fiches, ${r.lies} liées au calcul`).join("\n"));
