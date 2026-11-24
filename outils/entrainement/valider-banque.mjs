/* Morand — Entraînement clinique : vérifie la banque de cartes (entrainement/banque/*.json) avant publication.
     node outils/entrainement/valider-banque.mjs
   Règles (plan de la phase 1, section 3) : identifiant unique, réponse increase | neutral | decrease, au moins une référence,
   statut connu, nature de la donnée indiquée ; un chiffre (LR, Se, Sp, OR) doit se retrouver tel quel dans le texte de la source,
   pour qu'aucune valeur ne soit ajoutée par la conversion. */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const dossier = path.join(RACINE, "entrainement/banque");
const index = JSON.parse(fs.readFileSync(path.join(dossier, "index.json"), "utf8"));
const REPONSES = new Set(["increase", "neutral", "decrease"]), STATUTS = new Set(["validee", "en_revision", "experimentale"]);
const fr = x => String(x).replace(".", ",");
const erreurs = [], ids = new Set();
let n = 0;
for (const p of index.paquets) {
  const paquet = JSON.parse(fs.readFileSync(path.join(RACINE, p.fichier), "utf8"));
  if (paquet.cartes.length !== p.cartes) erreurs.push(`${p.cle} : ${paquet.cartes.length} cartes, l'index en annonce ${p.cartes}`);
  for (const c of paquet.cartes) {
    n++;
    const e = m => erreurs.push(`${c.id} : ${m}`);
    if (ids.has(c.id)) e("identifiant en double"); ids.add(c.id);
    if (!REPONSES.has(c.reponse)) e(`réponse inconnue (${c.reponse})`);
    if (!STATUTS.has(c.statut)) e(`statut inconnu (${c.statut})`);
    if (!c.enonce || !c.diagnostic || !c.diagnostic.nom) e("énoncé ou diagnostic manquant");
    if (!c.references || !c.references.length) e("aucune référence");
    for (const r of c.references || []) if (!(paquet.references || {})[r]) e(`référence ${r} absente du paquet`);
    if (!c.donnee || !c.donnee.nature) e("nature de la donnée manquante");
    if (c.statut === "validee" && !c.valide_le) e("carte validée sans date de validation");
    const source = `${c.explication} ${c.contexte_puce || ""}`;
    for (const k of ["lr_positif", "lr_negatif", "odds_ratio"]) {
      const v = c.donnee && c.donnee[k];
      if (v !== null && v !== undefined && !source.includes(fr(v))) e(`${k} ${v} absent du texte de la source`);
    }
    for (const k of ["sensibilite", "specificite"]) {
      const v = c.donnee && c.donnee[k];
      if (v && !source.includes(v)) e(`${k} « ${v} » absent du texte de la source`);
    }
  }
}
const parStatut = {};
for (const p of index.paquets) for (const c of JSON.parse(fs.readFileSync(path.join(RACINE, p.fichier), "utf8")).cartes) parStatut[c.statut] = (parStatut[c.statut] || 0) + 1;
console.log(`${n} cartes dans ${index.paquets.length} paquets : ${Object.entries(parStatut).map(([s, k]) => `${k} ${s}`).join(", ")}`);
if (erreurs.length) { console.log(erreurs.slice(0, 40).join("\n")); console.log(`${erreurs.length} erreur(s)`); process.exit(1); }
console.log("Banque valide.");
