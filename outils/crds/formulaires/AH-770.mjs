// AH-770 DT9425 (rév. 2024-08) : Consultation en immuno-allergie adulte et pédiatrique. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const EPI = "Prescrire l'auto-injecteur d'épinéphrine";
const REFR = "Période réfractaire possible de 6 semaines pour la validité des tests (faux négatif) post réaction anaphylactique.";
const MED = "Prérequis : spécifier le(s) médicament(s) et la réaction dans la section renseignements cliniques. En cas d'une nouvelle réaction médicamenteuse, remplir le formulaire AH-707 (Déclaration d'une nouvelle réaction d'allergie médicamenteuse).";
export default formulaire(meta("AH-770", "allergie", "Immuno-allergie adulte et pédiatrique", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Anaphylaxie de cause identifiée : se référer aux autres sections du formulaire.",
    "Allergie à un vaccin : remplir le formulaire « Déclaration de manifestations cliniques après une vaccination » et l'acheminer à la Direction de la santé publique. Ne pas référer au CRDS.",
    "Urticaire aiguë : se référer au tableau au verso du formulaire. Urticaire aiguë < 24 h, subaiguë 24 h – 6 semaines, chronique > 6 semaines. Débuter un antihistaminique (jusqu'à 4x la dose), par exemple : adulte, cétirizine 20 mg ID à BID + hydroxyzine 25 à 50 HS ; enfant (5 à 17 ans), cétirizine 5 à 20 mg ID. La corticothérapie systémique n'est pas un traitement de 1re intention de l'urticaire. S'il y a réponse au traitement, le conserver 3-6 mois et sevrer lentement ; sinon, indication de référence.",
    "Déficit immunitaire suspecté : information à allerg.qc.ca."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Anaphylaxie aiguë", "Exacerbation d'asthme aiguë sévère ou sans réponse à la corticothérapie orale depuis 24 h"],
}), [
  ["Respiratoire", "Rhinite/sinusite à répétition : évaluation et opinion thérapeutique", "E", { pre: ["Contrôle de l'environnement + corticostéroïdes intranasaux ≥ 6 semaines + antihistaminiques à dose recommandée"], syn: ["rhinite allergique", "sinusite"] }],
  ["Respiratoire", "Asthme", [["E", "Évaluation et opinion thérapeutique"], ["E", "Dépistage d'allergie"], ["E", "Évaluation pour désensibilisation"]], { syn: ["asthme", "désensibilisation", "tests cutanés"] }],
  ["Alimentaire", "Allergies alimentaires (spécifier l'aliment(s) suspecté(s))", [["D", "Âge < 2 ans, ≥ 2 aliments"], ["E", "Âge < 2 ans, 1 seul aliment"], ["E", "Âge ≥ 2 ans"]], { pre: [EPI], ori: [REFR], syn: ["arachide", "allergie alimentaire", "EpiPen"] }],
  ["Anaphylaxie", "Anaphylaxie de cause inexpliquée", [["C", "≥ 2 épisodes dans la dernière année"], ["D", "1er épisode"]], { pre: [EPI, "Spécifier les systèmes atteints"],
    ori: ["Critères diagnostiques d'anaphylaxie : ≥ 2 systèmes atteints (cutané incluant angioedème, respiratoire, gastrointestinal, cardiovasculaire).", REFR], syn: ["anaphylaxie", "EpiPen"] }],
  ["Anaphylaxie", "Allergies aux insectes avec réactions systémiques", "D", { pre: [EPI], ori: [REFR], syn: ["guêpe", "abeille", "hyménoptère", "venin"] }],
  ["Urticaire / angioedème", "Urticaire chronique > 6 semaines (avec ou sans angioedème) non contrôlée avec 4 fois la dose d'antihistaminique de 2e génération", "D", { syn: ["urticaire"] }],
  ["Urticaire / angioedème", "Angioedème isolé malgré l'arrêt de l'IECA ≥ 2 épisodes", "D", { syn: ["angioedème", "IECA"] }],
  ["Immunodéficience", "Déficit immunologique suspecté", [["D", "Si IgG anormal"], ["E", "Si IgG normal"]], { pre: ["L:FSC, IgG, IgA, IgM"], syn: ["immunodéficience", "infections à répétition"] }],
  ["Médicament", "Allergie médicamenteuse", [["E", "Pénicilline"], ["E", "Autre médicament"], ["C", "Médication essentielle sans alternative ET besoin de prescrire dans un court délai (préciser)"]],
    { pre: ["Spécifier le(s) médicament(s) et la réaction dans la section renseignements cliniques"], ori: [MED], syn: ["pénicilline", "allergie aux antibiotiques", "AH-707"] }],
  ["Vaccin", "Allergie à un vaccin", [["HORS", "Ne pas référer au CRDS : déclaration à la Direction de la santé publique"]],
    { ori: ["Remplir le formulaire « Déclaration de manifestations cliniques après une vaccination » (www.msss.gouv.qc.ca/professionnels/vaccination/mci/declarer-une-mci/) et l'acheminer à la Direction de la santé publique."], syn: ["vaccin", "MCI", "ESSI"] }],
]);
