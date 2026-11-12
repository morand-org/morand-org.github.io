// AH-760 DT9264 (rév. 2021-12) : Consultation en hématologie et néoplasie hématologique adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const G = "×10⁹/L";
export default formulaire(meta("AH-760", "hemato", "Hématologie et néoplasie hématologique adulte", {
  consignes: ["Consulter les alertes cliniques au verso. Favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "À cocher au formulaire : résultats de laboratoire récents (< 2 mois) ; le patient a été avisé de la demande de consultation.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc."],
  alertes_titre: "Considérer diriger l'usager vers l'urgence (utiliser le formulaire de l'Accueil clinique si disponible)",
  alertes_urgence: ["Anémie sévère (Hb < 70 g/L)", `Thrombocytopénie sévère < 20 ${G} ou avec saignement significatif`, "Suspicion de leucémie aiguë", `Neutropénie < 1,0 ${G} et T° ≥ 38,3 °C`, "Thrombose aiguë"],
}), [
  ["Globules rouges", "Pancytopénie ou bicytopénie", "B", { lib: `Pancytopénie ou bicytopénie (neutros < 1 ${G} et plaquettes < 75 ${G} et/ou Hb < 85 g/L)`, syn: ["cytopénie"] }],
  ["Globules rouges", "Anémie inexpliquée", [["B", "Hb < 85 g/L"], ["D", "Hb entre 85 g/L et 100 g/L"], ["E", "Femme : Hb > 100 g/L à 112 g/L ; homme : Hb > 100 g/L à 130 g/L"]], { pre: ["L:Bilan martial, B12, créatinine, TSH"], syn: ["anémie", "hémoglobine"] }],
  ["Globules rouges", "Anémie ferriprive Hb < 100 g/L investiguée qui ne répond pas à 6 mois de thérapie orale", "C", { syn: ["fer", "ferritine", "anémie"] }],
  ["Globules rouges", "Polyglobulie", [["C", "Ht > 0,65 ou Hb > 200 g/L contrôlée"], ["E", "Ht > 0,10 de + que la normale"]], { syn: ["érythrocytose", "hématocrite"] }],
  ["Globules blancs", "Neutropénie", [["B", `< 0,5 ${G} (valeur absolue)`], ["D", `Entre 0,5 et 1 ${G} (valeur absolue)`], ["E", `Entre 1,1 et 1,3 ${G} (contrôlée après 3 mois)`]], { syn: ["neutrophiles"] }],
  ["Globules blancs", `G.B. > 20 ${G} avec myélémie`, "B", { ori: ["Myélémie : présence de myélocytes et métamyélocytes au décompte manuel."], syn: ["leucocytose", "globules blancs"] }],
  ["Globules blancs", `Neutrophilie inexpliquée de plus de 15 ${G} (contrôlée après 3 mois)`, "E", { syn: ["leucocytose"] }],
  ["Globules blancs", "Lymphocytose avec cytopénie ou lymphocytose marquée", [["B", "Hb < 100 g/L"], ["B", `Plaquettes < 100 ${G} ou neutros < 1 ${G}`], ["B", `Lymphocytose > 100 ${G}`]], { lib: "Lymphocytose avec : Hb < 100 g/L ; plaquettes < 100 ou neutros < 1 ; lymphocytose > 100", syn: ["lymphocytes", "LLC"] }],
  ["Globules blancs", `Lymphocytose isolée`, [["C", `De 30 à 100 ${G}`], ["D", `5 à 30 ${G}`]], { syn: ["lymphocytes", "LLC"] }],
  ["Globules blancs", "Éosinophilie supérieure à 1.5 contrôlée après 6 mois", "D", { syn: ["éosinophiles"] }],
  ["Plaquettes", "Thrombopénie", [["B", `20-49 ${G}`], ["D", `50-74 ${G}`], ["E", `75-100 ${G} contrôlée après 3 mois`]], { syn: ["thrombocytopénie", "plaquettes"] }],
  ["Plaquettes", "Thrombocytose", [["E", `450-699 ${G} contrôlée après 3 mois`], ["C", `700-999 ${G}`], ["B", `≥ 1000 ${G}`]], { syn: ["plaquettes"] }],
  ["Hémostase", "Diathèse hémorragique", [["D", "Avec tests anormaux"], ["E", "Avec tests normaux"]], { pre: ["L:INR, PTT, fibrinogène ou temps de thrombine"], syn: ["saignement", "coagulation", "von Willebrand"] }],
  ["Hémostase", "Thrombose récidivante ou site non usuel", "D", { syn: ["thrombose", "TVP", "embolie"] }],
  ["Hémostase", "Suspicion de thrombophilie", "E", { syn: ["thrombose", "coagulation"] }],
  ["Suspicion de néoplasie", "Suspicion de lymphome (ex. : magma ganglionnaire significatif de taille > 5 cm ou symptôme B)", "B", { ori: ["Symptôme B : fièvre inexpliquée, perte de poids de plus de 10 %, sudations nocturnes."], syn: ["lymphome", "ganglion", "adénopathie"] }],
  ["Suspicion de néoplasie", "Ganglions augmentés en nombre et en taille (exérèse chirurgicale suggérée si > 2 cm et soutenu > 3 mois)", "C", { syn: ["ganglion", "adénopathie"] }],
  ["Suspicion de néoplasie", "Splénomégalie (rate > 15 cm)", [["C", "Avec cytopénie"], ["D", "Sans cytopénie"]], { syn: ["rate"] }],
  ["Suspicion de néoplasie", "Lymphome confirmé", "B", { pre: ["Rapport de pathologie"], syn: ["lymphome"] }],
  ["Suspicion de néoplasie", "Pic monoclonal", [["B", `Avec cytopénie (Hb < 100 g/L ou plaquettes < 100 ${G} ou neutros < 1 ${G}) ou insuffisance rénale de novo ou hypercalcémie`], ["C", "> 15 g/L"],
    ["E", `< 15 g/L sans cytopénie (Hb > 100 g/L et plaquettes > 100 ${G} et neutros > 1 ${G})`]], { syn: ["MGUS", "myélome", "électrophorèse"] }],
  ["Autres", "Hémoglobinopathie prouvée", [["D", "Hb ≤ 100 g/L"], ["E", "Hb > 100 g/L"]], { syn: ["thalassémie", "drépanocytose"] }],
  ["Autres", "Ferritine augmentée avec gène HFE muté", [["D", "≥ 1000 mcg/L"], ["E", "< 1000 mcg/L"]], { ori: ["HFE : génotype, si homozygote ou double hétérozygote, associé à la présence d'une hémochromatose héréditaire (H63D, C282Y)."], syn: ["hémochromatose", "fer", "ferritine"] }],
  ["Autres", "Hématologie obstétricale", "C", { ori: ["Référer à la clinique GARE. Si non disponible, spécifier le lieu planifié de l'accouchement."], syn: ["grossesse", "GARE"] }],
]);
