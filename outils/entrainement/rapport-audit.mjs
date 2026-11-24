/* Morand — Entraînement clinique : rapport de l'audit des cartes, en tableau (CSV pour Excel ou Numbers).
     node outils/entrainement/rapport-audit.mjs
   Écrit outils/entrainement/audit/rapport-audit.csv : une ligne par carte jugée, triée par région, puis par pertinence
   (essentielle d'abord, retirées à la fin), puis par diagnostic. Séparateur « ; » et BOM, pour Excel en français. */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const index = JSON.parse(fs.readFileSync(path.join(RACINE, "entrainement/banque/index.json"), "utf8"));
const PERT = { 1: "1 Essentielle", 2: "2 Importante", 3: "3 Complémentaire", 4: "4 Pointue (médecine du sport)", 0: "Retirée" };
const NIV = { 1: "Léger", 2: "Modéré", 3: "Difficile" }, REP = { increase: "↑ Augmente", neutral: "↔ Neutre", decrease: "↓ Diminue" };
const cel = v => { const s = String(v ?? ""); return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const lignes = [["Région", "Pertinence", "Niveau", "Diagnostic", "Énoncé", "Réponse", "Type", "Carte", "Énoncé d'origine (corrigé)", "Définition affichée", "Raison du retrait", "Identifiant"]];
const compte = {};
for (const p of index.paquets) {
  const paquet = JSON.parse(fs.readFileSync(path.join(RACINE, p.fichier), "utf8"));
  const jugees = paquet.cartes.filter(c => c.pertinence !== undefined);
  if (!jugees.length) continue;
  const rang = c => (c.retrait ? 9 : c.pertinence);
  jugees.sort((a, b) => rang(a) - rang(b) || a.diagnostic.nom.localeCompare(b.diagnostic.nom, "fr") || a.difficulte - b.difficulte);
  for (const c of jugees) {
    lignes.push([p.region, c.retrait ? PERT[0] : PERT[c.pertinence], c.retrait ? "" : NIV[c.difficulte], c.diagnostic.nom, c.enonce, REP[c.reponse], c.type,
      c.origine ? "Nouvelle (" + c.source + ")" : "Base des flashcards", c.enonce_source || "", c.definition || "", c.retrait || "", c.id]);
    const k = p.region; compte[k] ||= { total: 0, nouvelles: 0, retirees: 0, 1: 0, 2: 0, 3: 0, 4: 0, L: 0, M: 0, D: 0 };
    compte[k].total++; if (c.origine) compte[k].nouvelles++;
    if (c.retrait) compte[k].retirees++; else { compte[k][c.pertinence]++; compte[k]["LMD"[c.difficulte - 1]]++; }
  }
}
const sortie = path.join(RACINE, "outils/entrainement/audit/rapport-audit.csv");
fs.writeFileSync(sortie, "﻿" + lignes.map(l => l.map(cel).join(";")).join("\r\n") + "\r\n");
for (const [r, c] of Object.entries(compte))
  console.log(`${r} : ${c.total} cartes (${c.nouvelles} nouvelles), ${c.retirees} retirées ; pertinence 1/2/3/4 : ${c[1]}/${c[2]}/${c[3]}/${c[4]} ; léger/modéré/difficile : ${c.L}/${c.M}/${c.D}`);
console.log(`Rapport : ${path.relative(RACINE, sortie)} (${lignes.length - 1} lignes)`);
