// AH-755 DT9288 (rév. 2022-11) : Consultation en pédiatrie générale. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const CC = "E:Courbe de croissance";   // souhaitable pour toute raison de consultation
const CAL = "Calendrier des symptômes";
export default formulaire(meta("AH-755", "pedia", "Pédiatrie générale", {
  consignes: ["Pour toutes situations que vous identifiez de priorité A, communiquer avec le pédiatre de garde.", "Souhaitable : courbe de croissance pour toute raison de consultation."],
  alertes_titre: "Alertes cliniques",
  alertes_urgence: ["Pour toutes situations que vous identifiez comme étant une alerte clinique, communiquer avec le pédiatre de garde ou diriger l'enfant vers l'urgence.",
    "Pour toutes situations que vous identifiez de priorité A, communiquer avec le pédiatre de garde."],
}), [
  ["Pédiatrie", "Irritabilité – Troubles d'alimentation", [["B", "Âge < 1 mois"], ["C", "Âge 1-6 mois"], ["D", "Âge > 6 mois"]], { sou: [CC], syn: ["nourrisson", "boire", "alimentation"] }],
  ["Pédiatrie", "Retard de croissance statural et/ou pondéral", [["C", "Âge ≤ 1 an"], ["D", "Âge > 1 an"]], { sou: [CC], syn: ["poids", "taille", "croissance"] }],
  ["Pédiatrie", "Douleur abdominale chronique/diarrhée chronique/constipation", "D", { sou: [CC, CAL], syn: ["ventre"] }],
  ["Pédiatrie", "Infections à répétition : respiratoires, urinaires et autres", "D", { sou: [CC, "I:Rapport imagerie médicale"] }],
  ["Pédiatrie", "Céphalée", [["B", "De novo avec vomissements et examen neurologique normal"], ["C", "Migraine"], ["D", "Chronique"]], { sou: [CC, CAL], syn: ["mal de tête", "migraine"] }],
  ["Pédiatrie", "Toux chronique/asthme", [["C", "Âge ≤ 6 mois"], ["D", "Âge > 6 mois"]], { sou: [CC, CAL], syn: ["toux", "asthme"] }],
  ["Pédiatrie", "Souffle cardiaque (enfant stable)", [["B", "Âge < 1 mois"], ["C", "Âge 1-3 mois"], ["D", "Âge > 3 mois"]], { sou: [CC], syn: ["coeur", "cœur", "souffle"] }],
  ["Pédiatrie", "Retard de développement chez un enfant 0-5 ans", "D", { sou: [CC, "Profil du développement Agir tôt et/ou rapports d'évaluation", "E:Courbe de périmètre crânien", "E:Évaluation orthophonique et audiogramme demandés si retard de langage"],
    ori: ["Référer au préalable au dépistage AGIR TÔT du CISSS ou CIUSSS."], syn: ["Agir tôt", "langage", "développement"] }],
  ["Pédiatrie", "Évaluation trouble scolaire – TDAH", "E", { pre: ["Rapport évaluation SNAP IV ou Conners ou questionnaire Poulin ou évaluation psychosociale"], sou: [CC], syn: ["TDAH", "école", "attention"] }],
  ["Pédiatrie", "Troubles de comportement", "E", { pre: ["Rapport évaluation psychosociale demandée"], sou: [CC], syn: ["comportement"] }],
  ["Pédiatrie", "Anomalie du crâne/plagiocéphalie", "C", { sou: [CC], syn: ["tête plate", "crâne"] }],
  ["Pédiatrie", "Problèmes cutanés", "D", { pre: ["Préciser"], sou: [CC], syn: ["peau", "eczéma"] }],
  ["Pédiatrie", "Énurésie", "E", { sou: [CC], syn: ["pipi au lit"] }],
  ["Pédiatrie", "Phimosis", "E", { sou: [CC], syn: ["prépuce"] }],
]);
