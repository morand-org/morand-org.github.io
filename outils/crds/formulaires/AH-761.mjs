// AH-761 DT9267 (rév. 2022-04) : Consultation en médecine interne adulte. Transcrit du PDF statique du MSSS.
// Formulaire en deux étapes : (1) raison de consultation principale, (2) priorité commune à toutes les raisons.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const ETAPE2 = [["E", "Réévaluation du diagnostic ou du traitement chez usager stable"], ["D", "Condition(s) à investiguer ou non contrôlée(s)"],
  ["C", "Condition(s) instable(s) (prérequis : justification nécessaire dans la section « impr. diagn. »)"], ["B", "Condition(s) semi-urgente(s) (voir la liste des consignes du formulaire)"]];
const CLIN = "Référer à la clinique spécialisée appropriée si disponible dans votre région (ex. : Clinique de grossesse à risque élevé (GARE) ou de médecine obstétricale, Centre de diabète, Clinique préopératoire, etc.).";
const R = (cat, nom, syn, opt = {}) => [cat, nom, ETAPE2, { syn, ...opt }];
const MIG = "Médecine interne générale", AUT = "Champs de pratique (autres spécialités)";
export default formulaire(meta("AH-761", "mi", "Médecine interne adulte", {
  consignes: ["Consulter les alertes cliniques au verso. Favoriser les protocoles de l'Accueil clinique (si disponible) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Formulaire en deux étapes : choisir la raison de consultation principale (étape 1), puis la priorité clinique (étape 2) : E réévaluation chez usager stable ; D condition à investiguer ou non contrôlée ; C condition instable (justification nécessaire) ; B condition semi-urgente.",
    "Les internistes sont habilités à répondre aux raisons de consultation se retrouvant dans les formulaires des autres spécialités médicales selon les champs de pratique qu'ils ont indiqués au CRDS. Vous pouvez utiliser les formulaires des autres spécialités pour référer en médecine interne : dans la section nominative, indiquez « médecine interne ».",
    "Conditions semi-urgentes de priorité B (< 10 jours) : angine d'effort sévère stable (CCS 3/4), utiliser le formulaire de l'Accueil clinique si disponible ; dyspnée d'effort marquée de novo (NYHA 3/4) ; hyperthyroïdie avec T4 libre > 2X limite supérieure, utiliser le formulaire de l'Accueil clinique si disponible ; diabète de novo type 1 soupçonné sans acidose et sans cétonurie ; perturbation du bilan hépatique avec ALT entre 201 et 500 UI et INR normal ; ictère avec bilirubine > 60 ou > 40 avec dilatation des voies biliaires à l'échographie avec INR normal ; anémie sévère non ferriprive < 85 avec autre cytopénie ; suspicion de lymphome (ex. : magma ganglionnaire significatif de taille > 5 cm ou symptôme B) ; insuffisance rénale chronique avec DFG < 15 ml/min ; nodule ou lésion pulmonaire suspecte sans néoplasie connue > 15 mm, utiliser le formulaire de l'Accueil clinique si disponible ; exacerbation aiguë de MPOC ou asthme avec échec du plan d'action ; polymyalgia rheumatica de novo ou rechute sans symptôme d'artérite temporale ; bradycardie asymptomatique avec FC < 40 bpm ou pauses diurnes > 3 secondes documentées ; syncope avec cardiopathie ; hypercalcémie entre 3,0 et 3,5 mmol/l ou hypocalcémie entre 1,6 et 1,9 peu ou pas symptomatique ; FUO (fièvre d'origine indéterminée depuis > 14 jours et bilan infectieux de base négatif incluant hémocultures) ; hémoptysie persistante, utiliser le formulaire de l'Accueil clinique si disponible ; épanchement pleural nouveau, unilatéral et symptomatique.", CLIN],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Thrombose veineuse profonde ou embolie pulmonaire suspectée non traitée (pour la thrombose veineuse : utiliser le formulaire de l'Accueil clinique si disponible)",
    "Ischémie périphérique aiguë", "HTA sévère symptomatique", "Dyspnée au repos, rapidement progressive (< 1 semaine)", "Syndrome coronarien aigu suspecté ou angine de repos",
    "Insuffisance cardiaque décompensée", "Fibrillation auriculaire rapide > 110 bpm au repos ou mal tolérée", "Syncope brutale sans prodrome",
    "Bradycardie symptomatique avec FC < 40 bpm ou pauses diurnes > 3 secondes documentées", "Acidocétose diabétique", "Hépatite aiguë sévère (ALT > 500) : utiliser le formulaire de l'Accueil clinique si disponible",
    "Anémie sévère (Hb < 70 g/L)", "Thrombocytopénie sévère < 20 ×10⁹/L ou avec saignement significatif", "IRA : baisse du DFGe à moins de 15 ET symptômes urémiques ou atteintes à d'autres organes",
    "Augmentation de la créatinine > 200 %", "Augmentation de la créatinine > 100 % avec hématurie et protéinurie", "Hémoptysie importante (> 100 ml) ou répétée (20 ml à quelques reprises dans la même journée)",
    "Artérite temporale avec symptômes (céphalée nouvelle, perte visuelle ou diplopie, douleur au cuir chevelu, claudication de la mâchoire)", "Vasculite ou collagénose avec atteinte d'organe sévère"],
}), [
  R(MIG, "Thrombose veineuse ou embolie pulmonaire traitée (durée de traitement, récidive et thrombophilie)", ["TVP", "EP", "anticoagulation"]),
  R(MIG, "Maladie artérielle vasculaire (carotidienne, claudication intermittente, etc.)", ["MVAS", "claudication", "carotide"]),
  R(MIG, "Maladie artérielle vasculaire avec doppler (si disponible dans votre région)", ["doppler", "claudication"]),
  R(MIG, "Condition de grossesse (évaluation pré-grossesse, HTA, diabète pré existant ou gestationnel, dysthyroïdie, thrombose veineuse, thrombocytopénie, collagénose)", ["grossesse", "GARE", "prééclampsie"], { ori: ["Référer à la clinique GARE si disponible.", CLIN] }),
  R(MIG, "Évaluation préopératoire ou pré intervention", ["préop", "chirurgie"], { pre: ["Préciser la date et le type d'intervention"] }),
  R(MIG, "Découverte radiologique (nodule thyroïdien, pulmonaire, surrénalien, adénopathie, etc.)", ["incidentalome", "nodule"], { pre: ["I:Rapport d'imagerie"] }),
  R(MIG, "Anomalie de laboratoire (VS, CRP, CK, ANA, transaminase, etc.)", ["laboratoire"], { pre: ["L:Rapport de laboratoire ou préciser les valeurs"] }),
  R(MIG, "Autres conditions (ex. : perte de poids > 10 %, œdème périphérique, fatigue, syncope, fièvre d'origine inconnue, urticaire-angioedème, diaphorèse nocturne, etc.)", ["perte de poids", "fatigue", "fièvre"], { pre: ["Préciser dans la section « Impr. diagn. »"] }),
  R(AUT, "Cardiologie (FA, MCAS, dyspnée, insuffisance cardiaque, arythmie, palpitations, valvulopathie, etc.)", ["cœur"]),
  R(AUT, "Cardiologie avec tapis roulant (si disponible dans votre région)", ["épreuve d'effort", "tapis roulant"]),
  R(AUT, "Endocrinologie (diabète, dyslipidémie, dysthyroïdie, hypercalcémie, etc.)", ["diabète", "thyroïde", "cholestérol"], { ori: [CLIN] }),
  R(AUT, "Gastroentérologie et hépatologie (maladie inflammatoire, diarrhée, ascite, douleur abdominale, cirrhose, hémochromatose, etc.)", ["foie", "intestin"]),
  R(AUT, "Hématologie (anémie, cytopénie, MGUS, etc.)", ["anémie", "MGUS"]),
  R(AUT, "Néphrologie (HTA, protéinurie, insuffisance rénale, désordre électrolytique, etc.)", ["rein", "HTA"]),
  R(AUT, "Neurologie (céphalée, AVC-ICT, paresthésie, vertige, etc.)", ["AVC", "céphalée"]),
  R(AUT, "Pneumologie (dyspnée, toux, MPOC, apnée du sommeil, etc.)", ["poumon", "MPOC", "apnée"]),
  R(AUT, "Rhumatologie (arthrite inflammatoire, Raynaud, vasculite, PMR, ostéoporose, fibromyalgie, etc.)", ["arthrite", "PMR", "Raynaud"]),
]);
