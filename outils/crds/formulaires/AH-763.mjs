// AH-763 DT9487 (rév. 2019-04) : Consultation en pneumologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const NEO = "Suspicion de néoplasie", ACC = "Utiliser le formulaire d'Accueil clinique si disponible.";
export default formulaire(meta("AH-763", "pneumo", "Pneumologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Échelle de somnolence d'Epworth : http://sommeil-mg.net/spip/questionnaires/Echelle%20D'Epworth.pdf"],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Pneumonie : tableau clinique de pneumonie avec signes de sévérité (désaturation < 90 %, confusion, hypotension, etc.) ou fièvre persistante (> 48 h) sous traitement antibiotique",
    "MPOC : détérioration grave AVEC somnolence ou désaturation < 90 %", "Hémoptysie importante (100 ml ou +) ou répétée (20 ml à quelques reprises dans la même journée)",
    "Asthme : exacerbation d'asthme aiguë sévère ou sans réponse à la corticothérapie orale depuis 24 h", "Dyspnée : au repos, rapidement progressive (< 1 semaine)",
    "Suspicion d'embolie pulmonaire", "Épanchement pleural significatif AVEC fièvre associée ou suspicion d'infection (empyème) ou désaturation < 90 %"],
}), [
  [NEO, "Hémoptysie persistante", "B", { ori: [ACC], syn: ["crachat de sang", "cancer du poumon"] }],
  [NEO, "Nodule ou lésion suspecte sans néoplasie connue", [["B", "> 15 mm"], ["C", "8-15 mm"]], { pre: ["I:Rapport TDM"], ori: [ACC], syn: ["nodule pulmonaire", "cancer du poumon", "masse"] }],
  [NEO, "Épanchement pleural nouveau, unilatéral et symptomatique", "B", { ori: [ACC], syn: ["épanchement", "plèvre"] }],
  [NEO, "Micronodule < 8 mm évolutif à la TDM de suivi", "D", { syn: ["nodule pulmonaire"] }],
  [NEO, "Adénopathie médiastinale ou hilaire > 1 cm", "C", { syn: ["ganglion", "médiastin"] }],
  ["MPOC / asthme", "Exacerbation aiguë avec échec du plan d'action (corticothérapie orale ou antibiothérapie)", [["B", "MPOC"], ["B", "Asthme"]], { pre: ["Détailler traitement"], syn: ["MPOC", "asthme", "exacerbation"] }],
  ["MPOC / asthme", "MPOC/asthme suspecté ou réponse inadéquate au traitement de base", [["E", "MPOC"], ["E", "Asthme"]], { pre: ["E:Spirométrie si disponible"], syn: ["MPOC", "asthme", "spirométrie"] }],
  ["MPOC / asthme", "Réadaptation respiratoire", "E", { syn: ["MPOC", "réadaptation pulmonaire"] }],
  ["Infection respiratoire / toux", "Infiltrat persistant ou lentement résolutif (> 1 mois) à la radiographie pulmonaire malgré traitement", "C", { syn: ["pneumonie", "infiltrat"] }],
  ["Infection respiratoire / toux", "Bronchiectasies symptomatiques", "D", { syn: ["bronchiectasie"] }],
  ["Infection respiratoire / toux", "Toux chronique (> 8 semaines) avec radiographie pulmonaire normale", "E", { syn: ["toux"] }],
  ["Apnée", "Apnée obstructive du sommeil suspectée ou traitée ET hypersomnolence diurne sévère OU Epworth ≥ 15 OU index de désaturation (IDO) ≥ 30/h",
    [["C", "AVEC métier à risque (prérequis : justifier)"], ["D", "SANS métier à risque"]], { pre: ["Justifier (métier à risque)"], syn: ["apnée du sommeil", "SAOS", "CPAP", "Epworth"] }],
  ["Apnée", "Apnée du sommeil suspectée ou réévaluation de traitement", "E", { syn: ["apnée du sommeil", "SAOS", "CPAP"] }],
  ["Autres", "Dyspnée d'effort inexpliquée (non cardiaque, sans anémie avec radiographie pulmonaire normale)", "E", { pre: ["Justifier dans la section renseignements cliniques"], syn: ["essoufflement", "dyspnée"] }],
  ["Autres", "Maladies pulmonaires interstitielles (ex. : fibrose)", "D", { pre: ["I:Rapport TDM"], syn: ["fibrose pulmonaire", "interstitielle"] }],
]);
