// AH-768 DT9421 (rév. 2019-01) : Consultation en oncologie médicale/hémato-oncologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const PRE = ["I:Rapport(s) d'imagerie médicale (obligatoire)", "Rapport de pathologie (s'il y a lieu)"];
export default formulaire(meta("AH-768", "onco", "Oncologie médicale / hémato-oncologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Les usagers présentant un diagnostic ou une suspicion de néoplasie primaire provenant d'un système spécifique peuvent être dirigés vers la spécialité concernée, selon les pratiques locales courantes.",
    "Les lymphomes et les cancers hématologiques doivent être référés via le formulaire « Consultation en hémato-oncologie/hématologie adulte »."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Symptômes de compression médullaire", "Hypercalcémie maligne Ca corrigé > 3 mmol/L", "Neutropénie fébrile (T° ≥ 38,3 °C et neutrophiles < 1,0 ×10⁹/L)",
    "Symptômes neurologiques rapidement progressifs d'une lésion primaire ou métastatique", "Syndrome de la veine cave supérieure"],
}), [
  ["Oncologie", "Néoplasie de novo", "B", { pre: [...PRE, "Préciser le site du primaire (si connu) et les métastase(s) si connue(s)"], syn: ["cancer", "tumeur"] }],
  ["Oncologie", "Suspicion de nouvelles métastases chez un usager avec une histoire de néoplasie antérieure sans suivi actif en oncologie", "B", { pre: [...PRE, "Préciser le site primaire et le lieu du suivi antérieur pour le cancer"], syn: ["cancer", "métastase", "récidive"] }],
  ["Oncologie", "Situation clinique suspecte de néoplasie ou de métastases sans site primaire identifié", "B", { pre: [...PRE, "Spécifier"], syn: ["cancer", "métastase", "primaire inconnu"] }],
  ["Oncologie", "Réévaluation du traitement en l'absence de suivi actif en oncologie (ex. : hormonothérapie)", "E", { syn: ["hormonothérapie", "cancer du sein"] }],
]);
