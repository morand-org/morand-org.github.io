// AH-751 DT9284 (rév. 2025-09) : Consultation en néphrologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
// Prérequis pour toute raison de consultation (en tête du formulaire) ; échographie rénale souhaitable sauf troubles électrolytiques.
const TOUS = ["L:Créatinine, DFGe, Na, K, Cl, Ca, Ph, Mg, albumine, analyse urine et ratio protéine/créatinine sur un échantillon (spot urinaire)"];
const ECHO = ["I:Échographie rénale (si non déjà réalisée)"];
const CN = "L'utilisation du conseil numérique est fortement recommandée.";
const T = "(tableau d'équivalence du formulaire)";
export default formulaire(meta("AH-751", "nephro", "Néphrologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Prérequis pour toute raison de consultation : créatinine, DFGe, Na, K, Cl, Ca, Ph, Mg, albumine, analyse urine et ratio protéine/créatinine sur un échantillon (spot urinaire). Pour l'IRC avec DFGe entre 46-60 ml/min, l'échographie rénale est obligatoire.",
    "Souhaitable : prescrire une échographie rénale (si non déjà réalisée) pour toute raison de consultation sauf pour les troubles électrolytiques.",
    "Tableau d'équivalence de la protéinurie : légère < 1 g/jour (protéine/créatinine < 100 mg/mmol ; albumine/créatinine < 60 mg/mmol) ; modérée 1-3 g/jour (100-300 mg/mmol ; 60-180 mg/mmol) ; grave > 3 g/jour (> 300 mg/mmol ; > 180 mg/mmol). Normal : protéine/créatinine < 15 mg/mmol ; albumine/créatinine < 3 mg/mmol."],
  alertes_titre: "Communiquer avec le néphrologue de garde ou diriger l'usager à l'urgence",
  alertes_urgence: ["IRA : baisse du DFGe à moins de 15 ET symptômes urémiques ou atteintes à d'autres organes", "Augmentation de la créatinine > 200 %",
    "Augmentation de la créatinine > 100 % avec hématurie et protéinurie", "Glomérulonéphrite avec hémoptysie (exemple : vasculite)",
    "Troubles électrolytiques sévères et/ou symptomatiques", "Troubles acido-basiques sévères", "HTA sévère symptomatique"],
}), [
  ["IRA", "IRA significative", "C", { pre: [...TOUS, "L:2 rapports de créatinine", "I:Écho rénale demandée"], ori: ["Avant de référer pour une IRA, vous devez avoir 2 valeurs de créatinine sur une période entre 2 et 7 jours."], syn: ["insuffisance rénale aiguë", "créatinine", "rein"] }],
  ["IRC", "IRC : DFGe entre 15-45 ml/min stable", "D", { pre: [...TOUS, "I:L'échographie rénale demandée"], syn: ["insuffisance rénale chronique", "DFG", "rein"] }],
  ["IRC", "IRC : DFGe < 15 ml/min", "B", { pre: [...TOUS, "I:L'échographie rénale demandée"], syn: ["insuffisance rénale chronique", "DFG", "rein"] }],
  ["IRC", "IRC : DFGe entre 46-60 ml/min", "E", { pre: [...TOUS, "I:L'échographie rénale est obligatoire"], ori: [CN], syn: ["insuffisance rénale chronique", "DFG", "rein"] }],
  ["Protéinurie", "Protéinurie", [["B", "> 3 g/24 h avec hypoalbuminémie et anasarque"], ["C", `Grave ${T}`], ["D", `Modérée ${T}`], ["E", `Légère ${T} ; l'utilisation du conseil numérique est fortement recommandée`]],
    { pre: [...TOUS, "L:Protéine/créat sur une miction (spot urinaire) ou collecte urinaire de 24 h"], sou: ECHO, syn: ["albuminurie", "néphrotique"] }],
  ["HTA", "HTA réfractaire malgré 3 médicaments et plus, incluant un diurétique", "D", { pre: TOUS, sou: ECHO, syn: ["hypertension", "tension"] }],
  ["Autres", "Troubles électrolytiques et/ou acidose métabolique contrôlée à 2 reprises sur une période de 10 jours (après investigation et traitement)", "D", { pre: TOUS, syn: ["électrolytes", "hyponatrémie", "hyperkaliémie", "acidose"] }],
  ["Autres", "Polykystose", "E", { pre: [...TOUS, "I:L'échographie abdominale obligatoire"], ori: [CN], syn: ["kystes rénaux"] }],
  ["Autres", "Évaluation métabolique pour lithiases rénales (2 épisodes et +)", "E", { pre: TOUS, sou: ECHO, ori: [CN], syn: ["calculs", "lithiase", "pierre"] }],
  ["Autres", "Maladies génétiques rénales", "E", { pre: TOUS, sou: ECHO, ori: [CN] }],
  ["Autres", "Anomalie de l'anatomie rénale avec baisse du TFGE < 90 ml/min (rein unique, fer à cheval, atrophie rénale)", "E", { pre: TOUS, sou: ECHO,
    ori: ["Dans le cas d'un TFGE > 90 ml/min, envisagez une consultation au Conseil Numérique selon évolution."], syn: ["rein unique"] }],
  ["Autres", "Hématurie isolée après investigation urologique négative", "E", { pre: [...TOUS, "L:Créatinine, A/C urine"], sou: ECHO, ori: [CN], syn: ["sang dans l'urine"] }],
]);
