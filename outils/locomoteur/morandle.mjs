/* MSK Morand : Morandle, un cas par jour (/locomoteur/morandle/, public depuis le 25 novembre 2026).
     node outils/locomoteur/morandle.mjs [morandle-decisions-AAAA-MM-JJ.json]
   Lit les cas rédigés (outils/locomoteur/morandle/cas.json : fiche, 6 indices, autres fiches acceptées), les décisions du
   mode éditeur (outils/locomoteur/morandle/decisions.json, facultatif) et les fiches résumées publiées
   (locomoteur/donnees/hy.json, locomoteur/fiches-hy.js, locomoteur/fiches-patients.js). Écrit
   locomoteur/morandle/donnees.json :
     - diagnostics : toutes les fiches résumées (code, nom, région), la liste où le joueur choisit sa réponse ;
     - cas : dans l'ordre des jours (mélange fixe, les régions alternent), avec le lien vers la fiche résumée et la fiche
       patient, et la présentation et l'examen de la fiche pour l'explication finale.
   Un cas retiré par l'éditeur n'est plus joué ; un cas validé porte « validee ». */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const lire = f => fs.readFileSync(path.join(RACINE, f), "utf8");
const REGIONS = { cervical: "Rachis cervical", epaule: "Épaule", coude: "Coude", poignet: "Poignet et main", lombaire: "Rachis lombaire et dorsal",
  hanche: "Hanche et bassin", genou: "Genou", cheville: "Cheville et jambe", pied: "Pied" };
// Fiches qui ne sont pas des diagnostics (règles de décision) : hors de la liste des réponses.
const EXCLURE = new Set(["C21", "C22"]);

const hy = JSON.parse(lire("locomoteur/donnees/hy.json"));
const fiches = new Map();
for (const x of hy.items) {
  const code = x.code.replace(/^Fiche /, "");
  if (!fiches.has(code)) fiches.set(code, { code, nom: x.dx, r: x.r, u: x.lien, sections: {} });
  fiches.get(code).sections[x.cat.split(" · ")[1] || ""] = x.t;
}
// Fiche patient de chaque fiche résumée : diagnostic du calcul → fiche résumée et → fiche patient.
const ctx = { window: {} };
vm.runInNewContext(lire("locomoteur/fiches-hy.js"), ctx);
vm.runInNewContext(lire("locomoteur/fiches-patients.js"), ctx);
const { fichesHY, fichesPatients } = ctx.window.Locomoteur, patient = {};
for (const [r, dxs] of Object.entries(fichesHY)) for (const [dx, f] of Object.entries(dxs)) if (fichesPatients[r] && fichesPatients[r][dx] && !patient[f.no]) patient[f.no] = fichesPatients[r][dx];

const source = JSON.parse(lire("outils/locomoteur/morandle/cas.json"));
// Décisions du mode éditeur : node outils/locomoteur/morandle.mjs morandle-decisions-AAAA-MM-JJ.json les ajoute à decisions.json
// (« validee » : le cas reste ; « signalee » : le cas est retiré du jeu, avec la remarque).
const decF = path.join(RACINE, "outils/locomoteur/morandle/decisions.json");
const decisions = fs.existsSync(decF) ? JSON.parse(fs.readFileSync(decF, "utf8")) : {};
if (process.argv[2]) {
  const nouvelles = JSON.parse(fs.readFileSync(process.argv[2], "utf8")).decisions || {};
  for (const [code, d] of Object.entries(nouvelles)) if (/^[A-Z][a-z]?\d+$/.test(code) && ["validee", "signalee"].includes(d.statut))
    decisions[code] = { statut: d.statut, date: String(d.date || "").slice(0, 10), ...(d.note ? { note: String(d.note).slice(0, 300) } : {}) };
  fs.writeFileSync(decF, JSON.stringify(decisions, null, 1) + "\n");
}
const erreurs = [];
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const cas = source.cas.map(c => {
  const f = fiches.get(c.code);
  if (!f) { erreurs.push(`${c.code} : fiche introuvable`); return null; }
  if (!Array.isArray(c.indices) || c.indices.length !== 6) erreurs.push(`${c.code} : il faut 6 indices`);
  for (const a of c.accepte || []) if (!fiches.has(a)) erreurs.push(`${c.code} : fiche acceptée ${a} introuvable`);
  // Un indice ne doit pas nommer le diagnostic (mots de 6 lettres ou plus du nom de la fiche).
  const mots = norm(f.nom).split(/[^a-z]+/).filter(m => m.length >= 6 && !["douleur", "douloureuse", "syndrome", "fracture", "maladie", "lesion", "tendon", "cheville"].includes(m));
  c.indices.forEach((t, i) => { const m = mots.find(m => norm(t).includes(m)); if (m) erreurs.push(`${c.code}, indice ${i + 1} : contient « ${m} » (nom du diagnostic)`); });
  const d = decisions[c.code] || {};
  return { code: c.code, accepte: [c.code, ...(c.accepte || [])], nom: f.nom, r: f.r, indices: c.indices, fiche: f.u, patient: patient[c.code] || null,
    presentation: f.sections["Présentation clinique"] || "", examen: f.sections["Examen physique"] || "", statut: d.statut === "validee" ? "validee" : d.statut === "retiree" || d.statut === "signalee" ? "retiree" : "en_revision",
    ...(d.note ? { note: d.note } : {}) };
}).filter(Boolean);

// Ordre des jours : mélange à graine fixe, puis on évite deux cas de suite dans la même région.
let graine = 20261125;
const alea = () => { graine = (graine * 1664525 + 1013904223) >>> 0; return graine / 4294967296; };
const melange = cas.slice().sort((a, b) => (a.code < b.code ? -1 : 1));
for (let i = melange.length - 1; i > 0; i--) { const j = Math.floor(alea() * (i + 1)); [melange[i], melange[j]] = [melange[j], melange[i]]; }
for (let i = 1; i < melange.length; i++) if (melange[i].r === melange[i - 1].r) {
  const k = melange.findIndex((c, j) => j > i && c.r !== melange[i - 1].r && (!melange[i + 1] || c.r !== melange[i + 1].r));
  if (k > 0) [melange[i], melange[k]] = [melange[k], melange[i]];
}

const diagnostics = [...fiches.values()].filter(f => !EXCLURE.has(f.code)).map(f => ({ c: f.code, n: f.nom, r: f.r })).sort((a, b) => a.n.localeCompare(b.n, "fr"));
const sortie = { version: "2026-11-25", debut: "2026-11-25", regions: REGIONS, diagnostics, cas: melange };
fs.mkdirSync(path.join(RACINE, "locomoteur/morandle"), { recursive: true });
fs.writeFileSync(path.join(RACINE, "locomoteur/morandle/donnees.json"), JSON.stringify(sortie));
console.log(`${melange.length} cas (${melange.filter(c => c.statut === "validee").length} validés, ${melange.filter(c => c.statut === "retiree").length} retirés), ${diagnostics.length} diagnostics dans la liste, ${melange.filter(c => c.patient).length} cas avec fiche patient`);
if (erreurs.length) { console.log(erreurs.join("\n")); process.exit(1); }
