// AH-752 DT9285 (rév. 2024-11) : Consultation en neurologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const EMG = "Outil de l'INESSS sur l'EMG : www.inesss.qc.ca (INESSS_EMG_Outil.pdf).";
const NM = "Neuromusculaire (consultation avec considération EMG)";
const ORTH = "Orthèse (non moulée adéquate) port nocturne pour 2 mois ou infiltration et considération chirurgicale";
export default formulaire(meta("AH-752", "neuro", "Neurologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Consultation en neurologie non indiquée, ou ressources spécialisées régionales : TDAH ; vertiges isolés (diriger en ORL) ; lombalgie et cervicalgie isolées (sans signe ou symptôme de radiculopathie) ; TCC et syndrome post-commotionnel ; trouble du sommeil."],
  alertes_titre: "Diriger l'usager à l'urgence",
  alertes_urgence: ["Symptômes neurologiques transitoires (hypoesthésie latéralisée, cécité monoculaire, hémianopsie, dysmétrie ou vertige avec autres signes neurologiques) excluant un trouble moteur ou un trouble de la parole depuis ≤ 48 heures : utiliser le formulaire de l'Accueil clinique si disponible dans la région",
    "Parésie unilatérale et/ou un trouble de la parole transitoire ou fluctuante se présentant entre 48 heures et 14 jours : utiliser le formulaire de l'Accueil clinique si disponible dans la région",
    "Suspicion d'un AIT/AVC avec parésie unilatérale et/ou trouble de la parole persistant, fluctuant ou transitoire depuis < 48 heures",
    "Céphalée à début subit ou qui s'accompagne d'indice d'alarme (température, déficit neurologique, altération du sensorium, papilloedème, suspicion d'artérite temporale, etc.)",
    "Altération de l'état de conscience ou état confusionnel aigu", "Status épileptique ou crises convulsives à répétition",
    "Suspicion d'une atteinte médullaire rapidement progressive", "Suspicion d'un syndrome de Guillain-Barré"],
}), [
  ["Vasculaire (AIT)", "Symptômes neurologiques focaux transitoires suggestifs d'AIT (ICT) se présentant après > 14 jours", "C", { syn: ["AIT", "ICT", "AVC"] }],
  ["Vasculaire (AIT)", "Symptômes neurologiques focaux transitoires excluant une parésie unilatérale et un trouble de la parole se présentant entre 48 heures et 14 jours", "C", { syn: ["AIT", "ICT", "AVC"] }],
  ["TNC", "Trouble neurocognitif majeur (TNC)", "D", { pre: ["E:Résultat MMSE ou MOCA et joindre rapport"], sou: ["L:Bilan sanguin incluant B12, TSH, VDRL", "I:Imagerie cérébrale"],
    ori: ["Seront vus en neuro les usagers avec symptômes atypiques ou progression rapide ou moins de 65 ans, avec une justification dans la section « Impr. diagn. »."], syn: ["démence", "Alzheimer", "mémoire", "cognitif"] }],
  [NM, "Tunnel carpien avec impact fonctionnel important au travail (et échec au traitement conservateur)", [["E", `${ORTH} ; date de prescription de l'orthèse et date de l'infiltration`],
    ["D", `Travail, absentéisme, arrêt de travail à préciser ; ${ORTH}`]],
    { pre: ["Préciser la date de prescription de l'orthèse et/ou la date d'infiltration"], ori: [EMG], syn: ["canal carpien", "EMG", "main"] }],
  [NM, "Polyneuropathie (autre que secondaire au diabète)", "E", { ori: ["Si diabète, justifier pourquoi l'examen est nécessaire : atypie ?", EMG], syn: ["neuropathie", "EMG"] }],
  [NM, "Radiculopathie avec atteinte motrice et/ou sensitive (sans drapeaux rouges)", [["C", "Atteinte fonctionnelle sévère avec impact majeur AVD-AVQ, pour > 6 semaines et < 6 mois avec considération chirurgicale et échec au traitement conservateur (date de début des symptômes)"],
    ["D", "Atteinte fonctionnelle sévère avec impact majeur pour les AVD-AVQ, pour > 6 mois avec considération chirurgicale et/ou infiltration ; échec au traitement conservateur pendant plus de 6 semaines (physiothérapie préalable suggérée)"]],
    { ori: [EMG], syn: ["sciatalgie", "hernie discale", "EMG"] }],
  [NM, "Suspicion de SLA, myasthénie grave ou myopathie", [["D", "Suspicion de SLA, myasthénie grave ou myopathie"], ["C", "Avec faiblesse objective ou CK > 1000"]], { syn: ["SLA", "myasthénie", "myopathie"] }],
  [NM, "Mononévrite isolée (cubitale, SPE, autres)", [["E", "Mononévrite isolée"], ["D", "Avec faiblesse et atteinte fonctionnelle"]], { syn: ["cubital", "SPE", "EMG"] }],
  ["Troubles du mouvement", "Suspicion de parkinsonisme", [["D", "Suspicion de parkinsonisme"], ["C", "Avec chute (excluant patient avec TNC ou comorbidités multiples)"]], { syn: ["Parkinson"] }],
  ["Troubles du mouvement", "Tremblement", [["D", "Tête"], ["E", "Membres supérieurs bilatérales (avec échec au propranolol)"]], { syn: ["tremblement essentiel"] }],
  ["Troubles du mouvement", "Autres troubles mouvements", "E", { pre: ["Préciser type de troubles"] }],
  ["Épilepsie", "Convulsion de novo", "B", { syn: ["crise", "épilepsie", "convulsion"] }],
  ["Épilepsie", "Épilepsie connue sans neurologue traitant", [["E", "Contrôlée/demande de réévaluation"], ["C", "Non contrôlée"], ["D", "Perte de conscience inexpliquée"]], { syn: ["crise", "convulsion"] }],
  ["SEP ou suspicion", "Suspicion clinique de SEP excluant trouvaille fortuite d'anomalies à l'IRM", "D", { pre: ["Préciser symptômes, anomalies neuro et impact fonctionnel dans section « Impr. diagn. »"], syn: ["sclérose en plaques", "SEP"] }],
  ["SEP ou suspicion", "SEP : diagnostic confirmé (sans neurologue traitant)", [["B", "Poussée active (préciser)"], ["D", "Poussée récente (préciser)"], ["E", "Maladie stable (préciser)"]], { syn: ["sclérose en plaques"] }],
  ["Céphalée", "Migraine avec échec au traitement abortif (Triptan) et 2 traitements prophylactiques", "D", { pre: ["Nommer les médicaments essayés : triptan, prophylaxie 1) et 2)"], syn: ["migraine", "céphalée", "mal de tête"] }],
  ["Céphalée", "Suspicion céphalée de Horton (Cluster)", "C", { pre: ["Justifier manif. autonomiques"], syn: ["algie vasculaire", "cluster", "mal de tête"] }],
  ["Céphalée", "Névralgie du trijumeau", "C", { pre: ["Décrire dlr paroxystique, territoire, zone gâchette, etc."], sou: ["Tentative tx à la Carbamazépine"], syn: ["trijumeau", "douleur faciale"] }],
  ["Céphalée", "Autre type de céphalée primaire", "E", { ori: ["Conseil numérique recommandé."], syn: ["mal de tête"] }],
  ["Imagerie", "Anomalies à l'imagerie fortuite, d'interprétation douteuse ou par suggestion d'un radiologiste", "E", { ori: ["Conseil numérique recommandé."], syn: ["IRM", "trouvaille fortuite"] }],
]);
