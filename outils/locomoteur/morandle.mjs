/* MSK Morand : Morandle, un cas par jour (/locomoteur/morandle/, public depuis le 25 novembre 2026).
     node outils/locomoteur/morandle.mjs [morandle-decisions-AAAA-MM-JJ.json]
   Lit les cas rédigés (outils/locomoteur/morandle/cas.json : fiche, 6 indices, autres fiches acceptées ; « archives » :
   les cas n° 1 à 12, du 13 au 24 novembre ; « cas » : les autres), le calendrier (calendrier.json, voir plus bas), les décisions du
   mode éditeur (outils/locomoteur/morandle/decisions.json, facultatif) et les fiches résumées publiées
   (locomoteur/donnees/hy.json, locomoteur/fiches-hy.js, locomoteur/fiches-patients.js). Écrit
   locomoteur/morandle/donnees.json (cas brouillés, dans l'ordre du calendrier) :
     - diagnostics : toutes les fiches résumées (code, nom, région), la liste où le joueur choisit sa réponse ;
     - cas : dans l'ordre des jours, brouillés, avec le lien vers la fiche résumée et la fiche patient, et la présentation
       et l'examen de la fiche pour l'explication finale.
   Un nouveau cas paraît chaque matin à 7 h, heure de l'Est (la page fait la bascule ; rien à publier chaque jour). Un cas
   retiré par l'éditeur quitte le calendrier s'il n'est pas encore paru ; un cas validé porte « validee ». */
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
const preparer = c => {
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
};
const archives = (source.archives || []).map(preparer).filter(Boolean);
const cas = source.cas.map(preparer).filter(Boolean);
for (const c of archives) if (cas.some(x => x.code === c.code)) erreurs.push(`${c.code} : à la fois dans « archives » et dans « cas »`);

// Calendrier (outils/locomoteur/morandle/calendrier.json) : le cas de chaque jour, dans l'ordre, à partir de « debut ».
// Les jours déjà publiés (jusqu'à demain inclus, heure de l'Est, bascule à 7 h) ne changent jamais ; les nouveaux cas
// s'ajoutent à la fin, mélangés (graine fixe), sans deux cas de suite dans la même région ; un cas retiré par l'éditeur
// quitte le calendrier s'il n'est pas encore publié.
const DEBUT = "2026-11-13", HEURE = 7;
const calF = path.join(RACINE, "outils/locomoteur/morandle/calendrier.json");
const tous = new Map([...archives, ...cas].map(c => [c.code, c]));
let ordre;
if (fs.existsSync(calF)) ordre = JSON.parse(fs.readFileSync(calF, "utf8")).ordre;
else {
  // Premier calendrier : les archives (n° 1 à 12) puis le mélange des 40 premiers cas, comme publiés le 25 novembre 2026.
  let graine = 20261125;
  const alea = () => { graine = (graine * 1664525 + 1013904223) >>> 0; return graine / 4294967296; };
  const m = cas.slice().sort((a, b) => (a.code < b.code ? -1 : 1));
  for (let i = m.length - 1; i > 0; i--) { const j = Math.floor(alea() * (i + 1)); [m[i], m[j]] = [m[j], m[i]]; }
  for (let i = 1; i < m.length; i++) if (m[i].r === m[i - 1].r) {
    const k = m.findIndex((c, j) => j > i && c.r !== m[i - 1].r && (!m[i + 1] || c.r !== m[i + 1].r));
    if (k > 0) [m[i], m[k]] = [m[k], m[i]];
  }
  ordre = [...archives, ...m].map(c => c.code);
}
// Jour publié aujourd'hui (heure de l'Est, bascule à 7 h) ; on fige aussi celui de demain.
const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23" })
  .formatToParts(new Date()).map(x => [x.type, x.value]));
const jourUTC = j => { const [a, m, d] = j.split("-").map(Number); return Date.UTC(a, m - 1, d); };
const publie = Math.round((jourUTC(`${parts.year}-${parts.month}-${parts.day}`) - jourUTC(DEBUT)) / 864e5) + (+parts.hour >= HEURE ? 1 : 0);
const fige = Math.max(0, publie + 1);
for (const [k, code] of ordre.entries()) if (k < fige && !tous.has(code)) erreurs.push(`${code} : cas déjà publié (n° ${k + 1}) absent de cas.json`);
ordre = ordre.filter((code, k) => k < fige || (tous.has(code) && tous.get(code).statut !== "retiree"));
const nouveaux = [...tous.values()].filter(c => !ordre.includes(c.code) && c.statut !== "retiree").sort((a, b) => (a.code < b.code ? -1 : 1));
let graine2 = 20261126 + ordre.length;
const alea2 = () => { graine2 = (graine2 * 1664525 + 1013904223) >>> 0; return graine2 / 4294967296; };
for (let i = nouveaux.length - 1; i > 0; i--) { const j = Math.floor(alea2() * (i + 1)); [nouveaux[i], nouveaux[j]] = [nouveaux[j], nouveaux[i]]; }
const suite = [];
while (nouveaux.length) {
  const avant = suite.length ? suite[suite.length - 1].r : (tous.get(ordre[ordre.length - 1]) || {}).r;
  const k = nouveaux.findIndex(c => c.r !== avant);
  suite.push(nouveaux.splice(k >= 0 ? k : 0, 1)[0]);
}
ordre.push(...suite.map(c => c.code));
fs.writeFileSync(calF, JSON.stringify({ note: "Calendrier de Morandle : le cas de chaque jour (n° 1 = debut). Écrit par outils/locomoteur/morandle.mjs ; les jours publiés ne changent pas.", debut: DEBUT, ordre }, null, 1) + "\n");
const melange = ordre.map(code => tous.get(code));

// Brouillage : chaque cas est codé (XOR et base64), pour qu'on ne lise pas les réponses à venir d'un coup d'œil dans le fichier.
const brouiller = (o, i) => { const b = Buffer.from(JSON.stringify(o), "utf8"), k = `morandle-${i}`; for (let j = 0; j < b.length; j++) b[j] ^= k.charCodeAt(j % k.length) ^ ((j * 131) & 255); return b.toString("base64"); };
const diagnostics = [...fiches.values()].filter(f => !EXCLURE.has(f.code)).map(f => ({ c: f.code, n: f.nom, r: f.r })).sort((a, b) => a.n.localeCompare(b.n, "fr"));
const sortie = { version: "2026-11-25", debut: DEBUT, heure: HEURE, fuseau: "America/Toronto", archives: archives.length, regions: REGIONS, diagnostics, cas: melange.map(brouiller) };
fs.mkdirSync(path.join(RACINE, "locomoteur/morandle"), { recursive: true });
fs.writeFileSync(path.join(RACINE, "locomoteur/morandle/donnees.json"), JSON.stringify(sortie));
console.log(`${melange.length} cas au calendrier (${publie} publiés ; le n° ${publie + 1} paraît au prochain 7 h, heure de l'Est), dont ${archives.length} en archives (${melange.filter(c => c.statut === "validee").length} validés, ${melange.filter(c => c.statut === "retiree").length} retirés), ${diagnostics.length} diagnostics dans la liste, ${melange.filter(c => c.patient).length} cas avec fiche patient`);
if (erreurs.length) { console.log(erreurs.join("\n")); process.exit(1); }
