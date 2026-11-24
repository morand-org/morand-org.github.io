/* MSK Morand : fiches d'infiltration pour le médecin (PDF du clinicien : une vue d'ensemble, puis une fiche d'une page par
   infiltration sous repère anatomique). Produit :
     - locomoteur/infiltrations/<nn>-<titre>.pdf : chaque fiche (et la vue d'ensemble), seulement si le PDF source est donné ;
     - locomoteur/infiltrations/index.html : la bibliothèque, par région ;
     - locomoteur/fiches-infiltration.js : diagnostic du calcul → fiche d'infiltration ;
   et le lien de l'accueil (entre <!-- infiltrations --> et <!-- /infiltrations -->).
     node outils/locomoteur/fiches-infiltration.mjs [source.pdf] */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sansAccents = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const slug = (no, t) => `${String(no).padStart(2, "0")}-${sansAccents(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60).replace(/-$/, "")}`;

// Page du PDF source, région, titre, niveau de preuve imprimé sur la fiche (⚠ : cortisone à éviter en première intention, selon la
// vue d'ensemble) et diagnostics du calcul (région:id, avec =niveau quand la fiche en donne un par indication).
const FICHES = [
  [1, "general", "Vue d'ensemble : produits, doses, fréquence et règles communes", "", []],
  [2, "cervical", "Céphalée cervicogénique et névralgie d'Arnold (bloc du grand nerf occipital)", "C", ["cervical:cervicogenique", "cervical:arnold"]],
  [3, "epaule", "Douleur sous-acromiale (bourse sous-acromio-deltoïdienne)", "A", ["epaule:sous_acro"]],
  [4, "epaule", "Capsulite adhésive", "B", ["epaule:capsulite"]],
  [5, "epaule", "Arthrose gléno-humérale", "C", ["epaule:omarthrose"]],
  [6, "epaule", "Arthrose acromio-claviculaire", "C", ["epaule:ac_arthrose"]],
  [7, "epaule", "Tendinopathie du long biceps", "C", ["epaule:biceps"]],
  [8, "coude", "Épicondylite latérale (tennis elbow)", "B ⚠", ["coude:epi_lat"]],
  [9, "coude", "Épicondylite médiale (golfer's elbow)", "B", ["coude:epi_med"]],
  [10, "coude", "Bursite olécrânienne aseptique", "B ⚠", ["coude:bursite"]],
  [11, "coude", "Articulation du coude", "C / A", ["coude:arthrose=C", "coude:arthrite=A"]],
  [12, "poignet", "Syndrome du canal carpien", "A", ["poignet:canal_carpien"]],
  [13, "poignet", "Ténosynovite de De Quervain", "B", ["poignet:dequervain"]],
  [14, "poignet", "Autre ténosynovite du poignet", "C", ["poignet:tenosynovite"]],
  [15, "poignet", "Articulation radiocarpienne", "C / A", ["poignet:arthrose_poignet=C", "poignet:cristaux=A"]],
  [16, "poignet", "Lésion du TFCC", "C", ["poignet:tfcc"]],
  [17, "poignet", "Arthrose digitale", "A ⚠", ["poignet:arthrose_digitale"]],
  [18, "poignet", "Rhizarthrose (trapézo-métacarpienne)", "B ⚠", ["poignet:rhizarthrose"]],
  [19, "poignet", "Doigt à ressaut", "B", ["poignet:ressaut"]],
  [20, "poignet", "Maladie de Dupuytren (nodules)", "C", ["poignet:dupuytren"]],
  [21, "poignet", "Dactylite psoriasique", "C", ["poignet:psoriasique"]],
  [22, "hanche", "Syndrome douloureux du grand trochanter", "B", ["hanche:sdgt"]],
  [23, "hanche", "Ostéite pubienne", "C", ["hanche:osteite"]],
  [24, "genou", "Articulation du genou", "A", ["genou:arthrose", "genou:cristaux", "genou:arthrite"]],
  [25, "genou", "Syndrome de la bandelette ilio-tibiale", "B", ["genou:bit"]],
  [26, "genou", "Bursite prépatellaire non infectée", "C", ["genou:bprep"]],
  [27, "genou", "Tendinobursite de la patte d'oie", "C", ["genou:poie"]],
  [28, "cheville", "Articulation tibio-talienne", "C / A", ["cheville:arthrose=C", "cheville:cristaux=A"]],
  [29, "cheville", "Conflit antérieur ou postérieur de la cheville", "C", ["cheville:conflit"]],
  [30, "pied", "Fasciite plantaire", "B ⚠", ["pied:fasciite"]],
  [31, "pied", "Première métatarso-phalangienne", "C / A", ["pied:hallux_rigidus=C", "pied:goutte=A"]],
  [32, "pied", "Névrome de Morton", "B", ["pied:morton"]],
];
const NOMS = { general: "Règles communes", cervical: "Rachis cervical", epaule: "Épaule", coude: "Coude", poignet: "Poignet et main", hanche: "Hanche", genou: "Genou", cheville: "Cheville", pied: "Pied" };

const source = process.argv[2], dossier = path.join(RACINE, "locomoteur/infiltrations");
fs.mkdirSync(dossier, { recursive: true });
const liens = {};
for (const [page, region, titre, niveau, dxs] of FICHES) {
  const fichier = `${slug(page - 1, titre)}.pdf`, u = `/locomoteur/infiltrations/${fichier}`;
  if (source) execFileSync("python3", ["-I", path.join(RACINE, "outils/locomoteur/fiches-patients/decouper.py"), source, String(page), String(page), path.join(dossier, fichier), `Infiltration — ${titre}`]);
  if (!fs.existsSync(path.join(dossier, fichier))) throw new Error(`Fiche absente : ${u} (donner le PDF source)`);
  for (const x of dxs) { const [r, reste] = x.split(":"), [id, n] = reste.split("="); (liens[r] = liens[r] || {})[id] = { u, titre, niveau: n || niveau.replace(" ⚠", ""), ...(niveau.includes("⚠") ? { pasPremiere: true } : {}) }; }
}

const ko = f => Math.round(fs.statSync(path.join(dossier, f)).size / 1024);
const groupes = Object.keys(NOMS).map(r => [r, FICHES.filter(f => f[1] === r)]).filter(([, l]) => l.length);
const html = fs.readFileSync(path.join(RACINE, "locomoteur/genou/patients/index.html"), "utf8");
const tete = html.slice(0, html.indexOf('<main class="hy-page">') + '<main class="hy-page">\n'.length)
  .replace(/<title>.*?<\/title>/, "<title>Infiltrations : fiches pour le médecin | MSK Morand</title>")
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Fiches d\'infiltration sous repère anatomique pour le médecin : indications, niveau de preuve, produit, dose, aiguille, repères, technique et précautions.">')
  .replace("Produit par node outils/locomoteur/fiches-patients.mjs", "Produit par node outils/locomoteur/fiches-infiltration.mjs");
const pied = html.slice(html.indexOf("</main>"));
fs.writeFileSync(path.join(dossier, "index.html"), tete + `  <nav class="hy-fil" aria-label="Fil d'Ariane"><a href="/locomoteur/">MSK Morand</a><span aria-hidden="true">›</span><span>Infiltrations</span></nav>
  <section class="cr-intro hy-intro">
    <h1>Infiltrations</h1>
    <p class="cr-devise">Fiches pour le médecin</p>
    <p class="cr-lead">${FICHES.length - 1} infiltrations sous repère anatomique, une page chacune : indications et niveau de preuve (A à C), protocole (produit, dose, aiguille, fréquence), repères anatomiques et technique, précautions et suivi. Commencez par la vue d'ensemble.</p>
  </section>
${groupes.map(([r, l]) => `  <h2 class="lo-regions-titre hy-serie">${esc(NOMS[r])}</h2>
  <ol class="hy-patients">
${l.map(([page, , titre, niveau]) => { const f = `${slug(page - 1, titre)}.pdf`; return `    <li><a href="/locomoteur/infiltrations/${f}" target="_blank" rel="noopener"><span class="hy-carte-no">${page === 1 ? "À lire d'abord" : `Niveau de preuve ${niveau.replace(" ⚠", "")}${niveau.includes("⚠") ? " · pas en première intention" : ""}`}</span><span class="hy-carte-titre">${esc(titre)}</span><span class="hy-carte-tags">PDF · 1 page · ${ko(f)} Ko</span></a></li>`; }).join("\n")}
  </ol>`).join("\n")}
` + pied);

fs.writeFileSync(path.join(RACINE, "locomoteur/fiches-infiltration.js"), `/* Produit par node outils/locomoteur/fiches-infiltration.mjs. Ne pas modifier à la main.
   Diagnostic du calcul → fiche d'infiltration pour le médecin (PDF d'une page). */
(function () { (window.Locomoteur = window.Locomoteur || {}).fichesInfiltration = ${JSON.stringify(liens)}; })();
`);

const hubF = path.join(RACINE, "locomoteur/index.html");
let hub = fs.readFileSync(hubF, "utf8");
const bloc = `<!-- infiltrations -->
  <h2 class="lo-regions-titre">Infiltrations</h2>
  <ol class="lo-regions cr-specs">
    <li><a class="cr-spec lo-hy-region" href="/locomoteur/infiltrations/"><span class="cr-spec-nom">Fiches pour le médecin</span><span class="cr-spec-sous">${FICHES.length - 1} infiltrations</span></a></li>
  </ol>
  <!-- /infiltrations -->`;
hub = hub.includes("<!-- infiltrations -->") ? hub.replace(/<!-- infiltrations -->[\s\S]*?<!-- \/infiltrations -->/, bloc) : hub.replace('  <details class="cr-sources">', `  ${bloc}\n\n  <details class="cr-sources">`);
fs.writeFileSync(hubF, hub);
console.log(`${FICHES.length} fiches ; ${Object.values(liens).reduce((n, o) => n + Object.keys(o).length, 0)} diagnostics liés`);
