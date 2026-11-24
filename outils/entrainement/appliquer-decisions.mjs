/* Morand — Entraînement clinique : applique à la banque les décisions exportées du mode éditeur
   (bouton « Exporter mes décisions » sur /entrainement/?editeur=1).
     node outils/entrainement/appliquer-decisions.mjs entrainement-decisions-AAAA-MM-JJ.json
   « validee » → statut validee, valide_le = date de la décision ; « signalee » → statut experimentale (retirée du jeu)
   avec la remarque dans « signalement ». Les décisions sont aussi gardées dans outils/entrainement/decisions.json, pour
   qu'une nouvelle conversion du document ne les perde pas (convertir-base.py les relit). */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const fichier = process.argv[2];
if (!fichier) { console.error("Usage : node outils/entrainement/appliquer-decisions.mjs export.json"); process.exit(1); }
const nouvelles = JSON.parse(fs.readFileSync(fichier, "utf8")).decisions || {};
const archiveF = path.join(RACINE, "outils/entrainement/decisions.json");
const archive = fs.existsSync(archiveF) ? JSON.parse(fs.readFileSync(archiveF, "utf8")) : {};
for (const [id, d] of Object.entries(nouvelles)) if (/^[A-Z]+-\d{3}-\d{2}$/.test(id) && ["validee", "signalee"].includes(d.statut)) archive[id] = { statut: d.statut, date: String(d.date || "").slice(0, 10), ...(d.note ? { note: String(d.note).slice(0, 300) } : {}) };
fs.writeFileSync(archiveF, JSON.stringify(archive, null, 1) + "\n");
const index = JSON.parse(fs.readFileSync(path.join(RACINE, "entrainement/banque/index.json"), "utf8"));
let v = 0, s = 0;
for (const p of index.paquets) {
  const f = path.join(RACINE, p.fichier), paquet = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const c of paquet.cartes) {
    const d = archive[c.id]; if (!d) continue;
    if (d.statut === "validee") { c.statut = "validee"; c.valide_le = d.date; delete c.signalement; v++; }
    else { c.statut = "experimentale"; c.signalement = d.note || "Signalée"; c.valide_le = null; s++; }
    if (d.note && d.statut === "validee") c.remarque = d.note;
  }
  p.experimentales = paquet.cartes.filter(c => c.statut === "experimentale").length;
  p.validees = paquet.cartes.filter(c => c.statut === "validee").length;
  fs.writeFileSync(f, JSON.stringify(paquet, null, 0));
}
fs.writeFileSync(path.join(RACINE, "entrainement/banque/index.json"), JSON.stringify(index, null, 1));
console.log(`${v} carte(s) validée(s), ${s} signalée(s). Lancer ensuite : node outils/entrainement/valider-banque.mjs`);
