// AH-767 DT9330 (rév. 2022-04) : Consultation en chirurgie vasculaire et endovasculaire adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const AN = "Anévrisme asymptomatique", IMG = "I:Rapport d'imagerie";
const AN_NOTE = "Considérer seulement la mesure de diamètre prise en AP ou latérale. Le thrombus à l'intérieur de l'anévrisme n'influence pas l'échelle de priorité.";
export default formulaire(meta("AH-767", "vasc", "Chirurgie vasculaire et endovasculaire adulte", {
  consignes: ["Consulter les alertes cliniques au verso. Favoriser les protocoles de l'accueil clinique (si disponibles) avant de remplir le formulaire.",
    "Si connu en chirurgie vasculaire, favoriser une référence nominative auprès de son chirurgien.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Priorité A, communiquer avec le chirurgien vasculaire de garde de votre région : suspicion d'ischémie récente (< 14 jours) sans déficit moteur ou sensitif ; sténose carotidienne documentée > 50 % avec AIT (ICT) ou amaurose fugace ou AVC récent < de 14 jours ; anévrisme de l'aorte abdominale > 70 mm.",
    "Échelle CEAP : C1 télangiectasies ou veines réticulaires ; C2 varices ; C3 œdème ; C4 dermite de stase ou hyperpigmentation ; C5 ulcère veineux cicatrisé ; C6 ulcère veineux.",
    "Information sur la chirurgie vasculaire et endovasculaire : www.acvq.quebec."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Suspicion d'ischémie aiguë avec déficit moteur ou sensitif du membre supérieur, inférieur", "Ischémie mésentérique aiguë", "Tout anévrisme douloureux ou rompu (aortique, viscéral ou des membres)",
    "Suspicion d'une infection vasculaire (artère native ou prothèse vasculaire)",
    "Hémorragie aiguë ou menace d'hémorragie, externe ou interne d'origine vasculaire (traumatisme vasculaire, hémorragie d'un accès vasculaire pour hémodialyse, dissection aortique aiguë, hématome expansif, etc.)",
    "Gangrène humide ou suspicion d'infection nécrosante du pied", "Abcès plantaire avec sepsis chez un usager avec insuffisance artérielle connue ou suspectée",
    "Suspicion d'un AIT/AVC avec parésie unilatérale ou trouble de la parole persistant, fluctuant ou transitoire depuis < 48 h, ou référer à l'Accueil clinique si disponible et selon l'état de l'usager"],
}), [
  ["Insuffisance artérielle périphérique", "MVAS chronique avec gangrène humide ou douleur de repos ou plaie de novo (< 2 semaines)", "B", { syn: ["ischémie", "MVAS", "artérite", "plaie"] }],
  ["Insuffisance artérielle périphérique", "MVAS chronique avec gangrène sèche ou plaie chronique (> 2 semaines)", "C", { syn: ["ischémie", "MVAS", "plaie"] }],
  ["Insuffisance artérielle périphérique", "Claudication intermittente", [["D", "Sévère et incapacitante"], ["E", "Stable"]], { syn: ["claudication", "MVAS"] }],
  ["Sténose carotidienne", "ICT, AVC ou amaurose fugace avec sténose carotidienne de plus de 50 % dont les derniers symptômes remontent à plus de 14 jours et moins de 4 mois", "B", { pre: [IMG], ori: ["Consulter les alertes cliniques."], syn: ["carotide", "AIT", "AVC"] }],
  ["Sténose carotidienne", "Sténose carotidienne asymptomatique sévère + 70 %", "D", { pre: [IMG], syn: ["carotide"] }],
  ["Insuffisance veineuse", "Ulcère veineux avec échec au traitement médical ou récidive (CEAP ≥ 4/6)", "D", { ori: ["Référer de façon prioritaire en clinique de plaie si disponible et non au CRDS."], syn: ["ulcère", "plaie", "veine"] }],
  ["Insuffisance veineuse", "Varices avec reflux sévère de la saphène interne ou externe ou antérieur accessoire au Doppler", "E", { pre: ["I:Rapport de Doppler"],
    ori: ["Il n'y a aucune indication de chirurgie lorsqu'il n'y a pas de reflux de la saphène interne ou externe ou antérieur accessoire au Doppler, sauf exception."], syn: ["varices", "veine"] }],
  [AN, "Anévrisme de l'aorte abdominale", [["C", "Progression rapide peu importe le diamètre (≥ 10 mm / année)"], ["C", "50-70 mm"], ["D", "45-49 mm"], ["E", "31-44 mm"]],
    { pre: [IMG], ori: [AN_NOTE, "Le médecin de famille devrait assurer le suivi d'un anévrisme de l'aorte abdominale pour un diamètre < 45 mm par une échographie annuelle (Choisir avec soin).", "Consulter les alertes cliniques (> 70 mm : chirurgien vasculaire de garde)."], syn: ["AAA", "aorte", "anévrisme"] }],
  [AN, "Anévrisme de l'aorte thoracique descendante", [["C", "≥ 60 mm"], ["E", "< 60 mm"]], { pre: ["I:Rapport TDM ou ETT"], ori: [AN_NOTE, "Anévrisme de l'aorte thoracique ascendante : référer directement en chirurgie cardiaque et non au CRDS."], syn: ["aorte", "anévrisme"] }],
  [AN, "Anévrisme de l'artère iliaque", [["C", "≥ 30 mm"], ["E", "< 30 mm"]], { pre: [IMG], ori: [AN_NOTE], syn: ["anévrisme"] }],
  [AN, "Anévrisme de l'artère poplitée", [["C", "≥ 20 mm"], ["E", "< 20 mm"]], { pre: [IMG], ori: [AN_NOTE], syn: ["anévrisme"] }],
  [AN, "Anévrisme viscéral (artères rénales, splénique, mésentériques)", [["C", "≥ 20 mm"], ["E", "< 20 mm"]], { pre: [IMG], ori: [AN_NOTE], syn: ["anévrisme", "splénique", "rénale"] }],
  [AN, "Anévrisme viscéral chez femme enceinte ou en âge de procréer (peu importe le diamètre)", "B", { pre: [IMG], syn: ["anévrisme", "grossesse"] }],
]);
