// AH-748 DT9209 (rév. 2018-06) : Consultation en ORL adulte et enfant. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
export default formulaire(meta("AH-748", "orl", "ORL adulte et enfant", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire."],
  alertes_titre: "Communiquer avec l'ORL de garde",
  alertes_urgence: ["Épistaxis majeure non contrôlée", "Fracture du nez avec hématome septal (diriger vers l'urgence)", "Abcès péri-amygdalien",
    "Otite externe avec sténose complète du conduit auditif externe ou cellulite"],
}), [
  ["Otologie", "Surdité", [["D", "Avec retard de langage chez l'enfant"], ["E", "Évaluation surdité chronique (souhaitable : audiogramme)"]], { sou: ["E:Audiogramme"], syn: ["audition", "hypoacousie"] }],
  ["Otologie", "Otites à répétition ou séreuse persistante (depuis + 3 mois)", "D"],
  ["Otologie", "Acouphène incommodant depuis plus de 6 mois", "E", { sou: ["E:Audiogramme"], syn: ["acouphène", "tinnitus"] }],
  ["Otologie", "Vertiges", [["C", "Sévères, anormalement incapacitants avec examen neurologique normal"], ["D", "Récidivants ou dont l'évolution sur plusieurs semaines est non favorable"]], { syn: ["étourdissement"] }],
  ["Otologie", "Paralysie faciale périphérique unilatérale", "C", { pre: ["Débuter stéroïdes oraux et antiviraux"],
    ori: ["Légende du formulaire : pour les usagers de 16 ans ou plus présentant une paralysie faciale idiopathique depuis moins de 72 heures et sans contre-indication au traitement, une corticothérapie orale est fortement recommandée. Un traitement de 50 mg de prednisone po die pour 10 jours constitue une thérapie valable. La prescription concomitante d'antiviraux demeure à la discrétion du clinicien ; la prescription d'antiviraux sans corticothérapie est déconseillée. Il est aussi recommandé de prescrire un lubrifiant oculaire de même que des larmes artificielles ainsi qu'une protection oculaire nocturne au besoin (American Academy of Otolaryngology Head and Neck Surgery)."],
    syn: ["Bell", "paralysie de Bell"] }],
  ["Rhinosinusologie", "Épistaxis récidivante et chronique", "D", { syn: ["saignement de nez"] }],
  ["Rhinosinusologie", "Fracture nasale déplacée", "B", { ori: ["Si hématome septal : diriger l'usager vers l'urgence.", "RX nasal non recommandé."], syn: ["nez"] }],
  ["Rhinosinusologie", "Rhinosinusites chroniques ou sinusites à répétition (+ de 3 par année)", "E", { syn: ["sinusite"] }],
  ["Rhinosinusologie", "Rhinite chronique/obstruction nasale chronique/déviation septale", "E", { syn: ["septum", "nez"] }],
  ["Autres", "Hypertrophie adéno-amygdalienne", [["D", "Avec suspicion d'apnée du sommeil depuis > 3 mois"], ["E", "Sans suspicion d'apnée du sommeil"]], { syn: ["amygdales", "adénoïdes", "apnée"] }],
  ["Autres", "Amygdalites à répétition", "E", { syn: ["amygdales"] }],
  ["Autres", "Nodule thyroïdien", "D", { pre: ["L:Prescrire TSH", "I:Prescrire écho"], syn: ["thyroïde"] }],
  ["Autres", "Changement de la voix", [["C", "D'apparition récente, constant, et d'une durée > 4 semaines"], ["D", "Chronique ou intermittente"]], { syn: ["dysphonie", "enrouement"] }],
  ["Autres", "Masse cervicale", [["B", "Suspecte de néoplasie maligne (facteurs de risques : alcool, tabac, apparition récente ou croissance rapide)"], ["D", "Sans suspicion de critère de néoplasie maligne"]], { syn: ["cou", "adénopathie", "cancer"] }],
  ["Autres", "Lésion buccale", [["B", "Suspecte de néoplasie maligne"], ["D", "Bénigne"]], { syn: ["bouche", "cancer"] }],
  ["Autres", "Lésion cutanée de la tête ou du cou suspecte de néoplasie maligne non mélanocytaire", "D", { syn: ["peau", "cancer", "carcinome"] }],
]);
