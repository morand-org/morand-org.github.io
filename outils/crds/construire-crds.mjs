/* Assemble crds/crds_data.json à partir d'un fichier par formulaire (outils/crds/formulaires/AH-7xx.mjs).
   node outils/crds/construire-crds.mjs */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ACCUEIL_CLINIQUE } from "./accueil-clinique.mjs";
import { ACCUEIL_PIERRE_BOUCHER } from "./accueil-pierre-boucher.mjs";
const ICI = path.dirname(fileURLToPath(import.meta.url)), RACINE = path.resolve(ICI, "../..");
const fichiers = fs.readdirSync(path.join(ICI, "formulaires")).filter(f => /^AH-\d{3}\.mjs$/.test(f)).sort();
const formulaires = [], problemes = [];
for (const f of fichiers) {
  const { default: x } = await import(pathToFileURL(path.join(ICI, "formulaires", f)));
  formulaires.push(x.formulaire); problemes.push(...x.problemes);
}
const ids = new Set();
for (const p of problemes) { if (ids.has(p.id)) throw new Error(`Identifiant en double : ${p.id}`); ids.add(p.id); }
const data = {
  schema: { version: 2,
    description: "Un problème = une raison de consultation d'un formulaire APSS, avec sa ou ses priorités (A à E) et leurs critères, ses prérequis obligatoires et souhaitables, ses orientations, et la source exacte. Les « synonymes » servent seulement à la recherche : ce ne sont pas des libellés officiels.",
    champs_probleme: ["id", "formulaire", "specialite", "categorie", "probleme", "libelle_formulaire (facultatif)", "synonymes", "priorites[{niveau, criteres}]",
      "prerequis_obligatoires{laboratoires, imagerie, examens, autres}", "prerequis_souhaitables{…}", "orientation", "exclusions_urgence (facultatif)"] },
  echelle_priorite: { A: "≤ 3 jours", B: "≤ 10 jours", C: "≤ 28 jours", D: "≤ 3 mois", E: "≤ 12 mois", HORS: "hors CRDS" },
  region: { nom: "Montérégie", source: "https://www.crdsmonteregie.com/medecins-omnipraticiens/", consignes: [
    "Une seule raison de consultation par demande ; ajouter l'information utile dans « Renseignements cliniques ».",
    "Justifier cliniquement tout changement de priorité.",
    "Les demandes « Autre » sont révisées par le médecin répondant de la spécialité.",
    "Indiquer si les prérequis sont demandés ou faits, et s'ils sont disponibles dans le DSQ.",
    "L'accueil clinique demeure le lieu de référence prioritaire pour les conditions qu'il couvre.",
    "Les formulaires AH-702 en gastroentérologie sont acheminés directement en endoscopie.",
    "Depuis le 31 mars 2024, seules les demandes transmises par le DMÉ ou SAFIR Web sont acceptées (Québec.ca)."] },
  // Protocoles locaux relevés : Hôpital Pierre-Boucher (outils/crds/importer-accueil-pb.mjs).
  accueil_clinique: { ...ACCUEIL_CLINIQUE, pierre_boucher: ACCUEIL_PIERRE_BOUCHER },
  formulaires, problemes,
  a_venir: formulaires.length < 26 ? `${26 - formulaires.length} formulaires APSS restent à transcrire et à vérifier.` : "",
};
fs.writeFileSync(path.join(RACINE, "crds/crds_data.json"), JSON.stringify(data, null, 1) + "\n");
console.log(`${formulaires.length} formulaires, ${problemes.length} raisons de consultation, ${ACCUEIL_PIERRE_BOUCHER.protocoles.length} protocoles d'accueil clinique (Pierre-Boucher).`);
