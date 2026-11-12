// AH-758 DT9249 (rév. 2019-01) : Consultation en endocrinologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const TOUS = "Joindre les rapports de laboratoire et d'imagerie (pour toutes les raisons de consultation)";
const CLIN = "Référer à la clinique spécialisée appropriée si disponible dans votre région (ex. : GARE, Centre du diabète gestationnel, Centre de diabète, Programme des habitudes de vie, Clinique des nodules thyroïdiens, etc.).";
const CA = "L:Ca total corrigé";
export default formulaire(meta("AH-758", "endo", "Endocrinologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Prérequis : joindre les rapports de laboratoire et d'imagerie pour toutes les raisons de consultation.",
    "Communiquer avec l'endocrinologue de garde de votre région pour : diabète de novo, type 1 soupçonné, sans acidose mais avec acétonurie.", CLIN],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Acidocétose diabétique", "Apoplexie hypophysaire", "Hypercalcémie avec calcium corrigé > 3,5 mmol/l", "Hypocalcémie très symptomatique ou calcium corrigé < 1,6 mmol/l",
    "Insuffisance surrénalienne avec instabilité hémodynamique", "Suspicion de phéochromocytome avec instabilité hémodynamique", "Tempête thyroïdienne"],
}), [
  ["Thyroïde", "Hyperthyroïdie (TSH ↓)", [["B", "T4 libre > 2X limite supérieure"], ["C", "T4 libre élevée ≤ 2X limite supérieure"], ["E", "T4 libre normale (et T3 normale si dosée)"]], { pre: [TOUS], syn: ["thyroïde", "Graves", "T4"] }],
  ["Thyroïde", "Nodule thyroïdien", [["B", "Associé à l'apparition récente de dysphonie ou adénopathie suspecte"], ["D", "Critères échographiques suspects ou > 4 cm"], ["E", "Autres nodules solides/mixtes ≥ 1 cm à l'écho"]],
    { pre: [TOUS, "L:TSH"], ori: ["Critères échographiques suspects : nodule thyroïdien avec microcalcifications, contour irrégulier, hypoéchogénicité marquée ou TI-RADS 4b ou 5 (critères non exhaustifs).", CLIN], syn: ["thyroïde", "TI-RADS"] }],
  ["Diabète", "Diabète de novo, type 1 soupçonné, sans acidose et sans cétonurie", "B", { pre: [TOUS], ori: ["Avec acétonurie : communiquer avec l'endocrinologue de garde de votre région."], syn: ["diabète type 1"] }],
  ["Diabète", "Diabète traité", [["C", "Avec hypoglycémie nécessitant assistance d'un tiers"], ["C", "HbA1c > 12 %"], ["D", "HbA1c 9-12 %"], ["E", "HbA1c < 9 %"]],
    { pre: [TOUS], ori: ["Pour une référence au Centre du diabète régional, remplir le formulaire spécifique si disponible."], syn: ["diabète", "HbA1c", "hypoglycémie"] }],
  ["Gonades", "Hirsutisme sans virilisation", "E", { pre: [TOUS], syn: ["pilosité"] }],
  ["Gonades", "Oligo/aménorrhée (ex. : syndrome ovaires polykystiques)", "E", { pre: [TOUS], syn: ["SOPK", "règles"] }],
  ["Gonades", "Hypogonadisme chez l'homme", [["D", "≤ 50 ans"], ["E", "> 50 ans"]], { pre: [TOUS, "L:2 dosages (avant 10 h 00) de testostérone abaissée"], syn: ["testostérone"] }],
  ["Gonades", "Hypogonadisme désirant fertilité (homme et femme)", "D", { pre: [TOUS], syn: ["fertilité", "infertilité"] }],
  ["Gonades", "Gynécomastie d'apparition de moins de 6 mois", "D", { pre: [TOUS], syn: ["seins homme"] }],
  ["Surrénales", "Insuffisance surrénalienne de novo sans instabilité hémodynamique", "B", { pre: [TOUS, "L:Cortisol de 8 h 00"], syn: ["Addison", "cortisol"] }],
  ["Surrénales", "Hypercorticisme", "C", { pre: [TOUS, "L:Cortisolurie 24 h (si prise d'oestrogène) ou test de suppression à la dexaméthasone 1 mg"],
    ori: ["Test de suppression : prescrire dexaméthasone 1 mg à 23 h et dosage de cortisolémie à 8 h 00 le lendemain (normale < 50 nmol/l)."], syn: ["Cushing", "cortisol"] }],
  ["Surrénales", "Nodule surrénalien", [["C", "≥ 4 cm ou suspect à l'imagerie ou catécholamines ou métanéphrines élevées"], ["D", "< 4 cm d'allure bénigne à l'imagerie et laboratoires anormaux"]],
    { pre: [TOUS, "L:Dosage de catécholamines et métanéphrines sur collecte d'urine de 24 h", "L:Test de suppression à la dexaméthasone 1 mg à 23 h", "L:Si hypertension ou hypokaliémie, ajouter dosage du ratio de rénine et d'aldostérone"], syn: ["incidentalome", "surrénale"] }],
  ["Phosphocalcique / os", "Ostéoporose", "E", { pre: [TOUS], ori: [CLIN], syn: ["densitométrie", "os"] }],
  ["Phosphocalcique / os", "Hypercalcémie", [["D", "Ca < 3 mmol/l"], ["B", "Ca 3 à 3,5 mmol/l"]], { pre: [TOUS, CA], syn: ["calcium", "parathyroïde"] }],
  ["Phosphocalcique / os", "Hypocalcémie", [["B", "Ca 1,6 à 1,9 mmol/l peu ou pas symptomatique"], ["D", "Ca > 1,9 mmol/l"]], { pre: [TOUS, CA], syn: ["calcium"] }],
  ["Hypophyse", "Masse hypophysaire", [["B", "Avec symptôme visuel"], ["D", "Sans symptôme visuel"]], { pre: [TOUS], syn: ["hypophyse", "adénome"] }],
  ["Hypophyse", "Hyperprolactinémie (dosage contrôlé 2 fois)", "D", { pre: [TOUS], syn: ["prolactine"] }],
  ["Grossesse", "Diabète, dysthyroïdie ou autre endocrinopathie en grossesse", "C", { pre: [TOUS], ori: [CLIN], syn: ["grossesse", "diabète gestationnel"] }],
  ["Grossesse", "Évaluation pré-grossesse chez patiente diabétique", "D", { pre: [TOUS], syn: ["grossesse", "diabète"] }],
]);
