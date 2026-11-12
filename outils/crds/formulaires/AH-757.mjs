// AH-757 DT9211 (rév. 2021-12) : Consultation en dermatologie adulte et pédiatrique. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const TUM = "Obligatoire au formulaire (tumoral) : taille de la lésion la plus suspecte (< 5 mm, 5-10 mm, > 10 mm)";
const INF = "Obligatoire au formulaire (inflammatoire/infectieux) : nombre de lésion(s) (≤ 10, 11-30, > 30) et atteintes incapacitantes (oui/non)";
export default formulaire(meta("AH-757", "derm", "Dermatologie adulte et pédiatrique", {
  consignes: ["Consulter les alertes cliniques au verso avant de remplir ce formulaire. Ne pas utiliser ce formulaire pour les services non assurés.",
    "Le traitement des conditions suivantes n'est pas assuré par la RAMQ : acrochordon, kératose séborrhéique, milia, lentigo solaire, melasma, kyste épidermique non inflammé ou infecté, angiome rubis, angiome stellaire, couperose, etc. Veuillez utiliser les corridors de service de votre région pour référer le patient.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Obligatoire pour toute demande : diagnostic probable ; site(s) anatomique(s) atteint(s) ; le patient est-il immunosupprimé, enceinte, âgé de moins de 1 an ; durée de la maladie ; nom des traitements tentés et durée ; le patient a-t-il été vu par un dermatologue (si oui, nom, copie des notes et rapport de pathologie).",
    "L'examen cutané de dépistage n'est pas un motif de consultation en dermatologie. Les conditions dont le traitement est non médicalement requis (ex. : acrochordons, kératoses séborrhéiques ou nævi non suspects ne causant pas de trouble fonctionnel objectivable) ne doivent pas être référées via ce formulaire.",
    "Algorithmes de traitement des maladies cutanées courantes : www.dermatoqc.org/medecin/algorithmes."],
  alertes_titre: "Référer l'usager vers l'urgence",
  alertes_urgence: ["Éruption pan-corporelle aiguë avec atteinte de l'état général", "Éruption pustuleuse, bulleuse ou érosive avec atteinte de l'état général ou atteinte des muqueuses",
    "Purpura aigu et progressif", "Urticaire aiguë avec angio-œdème"],
}), [
  ["Tumoral", "Kératose séborrhéique probable, éliminer lésion suspecte", "E", { pre: [TUM], ori: ["Les kératoses séborrhéiques et les nævi bénins peuvent se modifier au cours de leur évolution normale. Le traitement de ces conditions n'est pas assuré par la RAMQ."], syn: ["kératose", "grain de beauté"] }],
  ["Tumoral", "Naevus atypique probable, éliminer mélanome", "C", { pre: [TUM], syn: ["nævus", "grain de beauté", "mélanome"] }],
  ["Tumoral", "Mélanome très probable", "B", { pre: [TUM, "Description et évolution détaillées de la lésion"], syn: ["mélanome", "cancer de la peau"] }],
  ["Tumoral", "Tumeur suspecte de cancer, autre que mélanome (ex. : carcinome basocellulaire ou épidermoïde)", [["D", "LENTEMENT évolutive"], ["C", "RAPIDEMENT évolutive (< de 8 semaines)"]], { pre: [TUM], syn: ["carcinome", "basocellulaire", "épidermoïde", "cancer de la peau"] }],
  ["Tumoral", "Kératoses actiniques", "E", { pre: [TUM, "Échec à la cryothérapie OU au 5FU topique"], syn: ["kératose actinique"] }],
  ["Tumoral", "Hémangiome du nourrisson nécessitant un traitement", "B", { pre: [TUM], ori: ["Selon l'outil www.ihscoring.com/frca/step-1/."], syn: ["hémangiome", "bébé"] }],
  ["Tumoral", "Tache de vin de l'enfant âgé de moins d'un an", "C", { pre: [TUM], syn: ["angiome plan", "bébé"] }],
  ["Inflammatoire / infectieux", "Lésions érythémato-squameuses (ex. : eczéma, psoriasis, tinea)", [["D", "Étendues > 30 % de la surface corporelle ou palmo-plantaire sévère"], ["E", "Limitées < 30 % de la surface corporelle"]],
    { pre: [INF, "Échec à au moins 2 traitements topiques, dont un corticostéroïde topique (8 semaines au total)"], ori: ["Note : 1 paume = 1 %."], syn: ["eczéma", "psoriasis", "dermatite"] }],
  ["Inflammatoire / infectieux", "Lésions bulleuses non infectieuses sans atteinte de l'état général", "C", { pre: [INF], syn: ["pemphigoïde", "bulles"] }],
  ["Inflammatoire / infectieux", "Acné nodulo-kystique et cicatricielle incapacitante", "D", { pre: [INF, "Moyen de contraception initié chez la femme en âge de procréer", "Échec à 2 traitements topiques et antibiotique PO x 4 à 6 mois"], syn: ["acné", "isotrétinoïne"] }],
  ["Inflammatoire / infectieux", "Autres lésions acnéiformes (ex. : acné vulgaire, acné rosacée, folliculite, etc.)", "E", { pre: [INF, "Échec au traitement topique et antibiotique PO x 4 à 6 mois"], syn: ["acné", "rosacée"] }],
  ["Inflammatoire / infectieux", "Hidradénite suppurée modérée à sévère (plus de 10 nodules, abcès, fistules et cicatrices aux plis)", "D", { pre: [INF, "Échec au traitement topique et antibiotique PO x 6 mois"], syn: ["hidrosadénite", "HS"] }],
  ["Inflammatoire / infectieux", "Urticaire chronique idiopathique (durée > 6 semaines)", "D", { pre: [INF, "Échec 4 X dose antihistaminique de 2e génération ou dose maximale tolérée par le patient (si dose < 4 X, justifier)"],
    ori: ["Annexe 1 (exemples, doses standard et 4X) : cetirizine 10-40 mg PO/jour (4X = 20 mg PO bid) ; desloratadine 5-20 mg PO/jour (4X = 10 mg PO bid) ; loratadine 10-40 mg PO/jour (4X = 20 mg PO bid) ; rupatadine 10 mg PO/jour (4X = 20 mg PO bid). L'hydroxyzine et la diphenhydramine sont des antihistaminiques de première génération."],
    syn: ["urticaire", "antihistaminique"] }],
]);
