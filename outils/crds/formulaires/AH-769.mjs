// AH-769 DT9423 (rév. 2024-03) : Consultation en chirurgie plastique adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const MD = "Main et doigts", CT = "Cutané / tissu mou";
const ORTH = "Orthèse : information sur la prescription au site de la RAMQ (programme des appareils suppléant à une déficience physique).";
const NC = "Service non couvert par la RAMQ. Veuillez utiliser les corridors de service de votre région pour référer le patient.";
export default formulaire(meta("AH-769", "plastie", "Chirurgie plastique adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Communiquer avec le plasticien de garde de votre région pour : lacération refermée non compliquée avec atteinte tendineuse ou du nerf digital sans compromis vasculaire ; lacération main et doigt avec perte de substance > 1 cm² des tissus mous ou exposition des structures.",
    "Les cicatrices vicieuses autres qu'au visage et les cas d'esthétique ne sont pas couverts par la RAMQ et devront être dirigés vers des milieux de chirurgie esthétique et non au CRDS.",
    "Plaies complexes et chroniques : référer à la clinique de plaie de votre région et non au CRDS."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Fracture déplacée ou ouverte ou immobilisation impossible (carpe, métacarpe, phalange)", "Compromis vasculaire digital", "Arthrite septique ou ténosynovite infectieuse",
    "Luxation non réductible", "Amputation digitale", "Lacérations avec perte de substances très étendue des tissus mous (ex. : dégantement d'un doigt ou dos de la main) ou plaie très contaminée",
    "Fracture du visage (os malaire, nez, mandibule, orbite)", "Brûlure aiguë répondant aux critères d'un centre d'expertise", "Syndrome du compartiment", "Lacération complexe difficile à refermer"],
}), [
  [MD, "Tunnel carpien qui ne répond pas au traitement médical après 2 mois (orthèse et infiltration)", "D", { ori: [ORTH], syn: ["canal carpien", "main"] }],
  [MD, "Doigt gâchette", [["C", "Avec blocage permanent"], ["D", "Sans blocage ou blocage intermittent réductible"]], { syn: ["doigt à ressaut", "main"] }],
  [MD, "Kyste arthro-synovial", "E", { syn: ["ganglion", "kyste synovial", "poignet"] }],
  [MD, "Maladie de Dupuytren", [["D", "Avec perte d'extension"], ["E", "Sans perte d'extension"]], { syn: ["Dupuytren", "main"] }],
  [MD, "Tendinite De Quervain avec échec au traitement médical après 2 mois (orthèse et infiltration)", "D", { ori: [ORTH], syn: ["De Quervain", "poignet"] }],
  [MD, "Rhizarthrose invalidante avec échec au traitement médical (orthèse et infiltration)", "D", { pre: ["I:RX main"], ori: [ORTH], syn: ["arthrose du pouce", "rhizarthrose"] }],
  [MD, "Fracture aiguë et non déplacée de la main", "B", { pre: ["I:RX", "Immobilisation adéquate"], ori: ["Voir les alertes cliniques."], syn: ["fracture", "métacarpe", "phalange"] }],
  [MD, "Doigt en Maillet (Mallet finger)", "B", { pre: ["I:RX", "Immobilisation adéquate"], syn: ["mallet", "doigt"] }],
  [MD, "Luxation réduite des doigts", "B", { pre: ["I:RX post réduction"], ori: ["Voir les alertes cliniques."], syn: ["luxation", "doigt"] }],
  [CT, "Masse bénigne (ex. : lipome, kyste sébacé, etc.) causant des symptômes d'ordre fonctionnel objectivable", [["HORS", "Service non couvert par la RAMQ"]], { ori: [NC], syn: ["lipome", "kyste"] }],
  [CT, "Masse > 5 cm à la tête ou au cou avec atteintes fonctionnelles dont la bénignité a été démontrée par imagerie médicale", "E", { pre: ["I:Rapport d'imagerie"],
    ori: ["L'exérèse de certaines lésions ou masses bénignes n'est pas toujours un service assuré par la RAMQ (ex. : acrochordon, lipome et kératose séborrhéique, etc.) et pourrait être aux frais de l'usager. Merci de l'en aviser."], syn: ["lipome", "masse"] }],
  [CT, "Lésion cutanée maligne avec pathologie confirmée (ex. : basocellulaire, spinocellulaire, mélanome, etc.)", "B", { pre: ["Rapport de pathologie"], syn: ["cancer de la peau", "carcinome", "mélanome"] }],
  [CT, "Lésion cutanée bénigne", [["HORS", "Service non couvert par la RAMQ"]], { ori: [NC], syn: ["grain de beauté", "nævus"] }],
  [CT, "Cicatrice vicieuse du visage", "E", { syn: ["cicatrice"] }],
  ["Sein", "Réduction mammaire", "E", { syn: ["sein", "hypertrophie mammaire"] }],
  ["Sein", "Asymétrie mammaire", "E", { syn: ["sein"] }],
  ["Sein", "Reconstruction mammaire post néoplasie", "E", { syn: ["sein", "mastectomie"] }],
  ["Sein", "Gynécomastie", "E", { pre: ["I:Imagerie médicale", "L:Bilan endocrinien"], syn: ["seins homme"] }],
  ["Autres", "Fracture immobilisée non déplacée du carpe incluant scaphoïde", "B", { pre: ["I:RX du poignet incluant vue du scaphoïde"], ori: ["Voir les alertes cliniques."], syn: ["scaphoïde", "poignet", "fracture"] }],
  ["Autres", "Plaies complexes et chroniques", [["HORS", "Référer à la clinique de plaie de votre région et non au CRDS"]], { syn: ["plaie", "ulcère"] }],
  ["Autres", "Brûlures qui ne répondent pas aux critères des centres d'expertise", "B", { ori: ["Critères de référence aux centres d'expertise pour grands brûlés : document de l'INESSS (VBG_criteres_transfert_vers_centre_expertise.pdf)."], syn: ["brûlure"] }],
]);
