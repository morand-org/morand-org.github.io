// AH-772 DT9429 (rév. 2022-05) : Consultation en neurochirurgie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const IRM12 = "I:Rapport d'IRM < 12 mois et autres rapports d'investigation";
const IRMTDM = "I:Rapport d'IRM ou TDM et autres rapports d'investigation";
const IMG = "I:Rapport d'imagerie et autres rapports d'investigation";
export default formulaire(meta("AH-772", "neurochir", "Neurochirurgie adulte", {
  consignes: ["Pour les alertes cliniques et les priorités A et B (voir verso), communiquer avec le spécialiste.",
    "Aviser l'usager d'apporter une copie CD-ROM des imageries pour le rendez-vous.",
    "Cocher la raison de consultation et compléter la section Impression diagnostique et renseignements cliniques obligatoires. Joindre les autres rapports d'investigation pertinents si disponibles.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc."],
  alertes_titre: "Alertes cliniques et raisons de consultation de priorité A ou B : communiquer avec le neurochirurgien de garde",
  alertes_urgence: ["Hémorragie intracrânienne", "Syndrome d'hypertension intracrânienne avec ou sans altération de l'état de conscience",
    "Apparition soudaine ou rapidement progressive d'un déficit neurologique (localisation cérébrale, médullaire ou queue de cheval ou radiculopathie aiguë avec déficit moteur significatif)",
    "Myélopathie aiguë ou subaiguë (compression médullaire) avec évolution rapide des symptômes", "Sténose carotidienne symptomatique",
    "Traumatisme cranio-cérébral (TCC) ou spino-médullaire aigu modéré et sévère", "Fracture du crâne ou du rachis", "Tumeurs cérébrales intraparenchymateuses : métastases, gliomes ou autres",
    "Tumeurs du rachis intra-durales ou extra-durales (primaires ou métastatiques)"],
}), [
  ["Rachis cervico-dorsal", "Myélopathie compressive avec symptômes > 8 semaines", "C", { pre: [IRM12], syn: ["myélopathie", "sténose cervicale"] }],
  ["Rachis cervico-dorsal", "Radiculopathie douloureuse ou sensitivo-motrice (ex. : hernie discale cervicale)", [["D", "Avec symptômes sévères et limitation fonctionnelle (AVD/AVQ) > 8 semaines"], ["E", "Avec symptômes modérés chroniques > 8 semaines"]], { pre: [IRM12], syn: ["hernie cervicale", "cervicobrachialgie"] }],
  ["Rachis cervico-dorsal", "Cervicalgie/dorsalgie avec instabilité anatomique, démontrée à l'imagerie, sans atteinte médullaire ou radiculaire", "D", { pre: ["I:Rapport d'imagerie et autres rapports d'investigation si disponible"], syn: ["cervicalgie", "instabilité"] }],
  ["Rachis lombo-sacré", "Radiculopathie douloureuse ou sensitivo-motrice ou claudication neurogénique", [["D", "Avec symptômes sévères et limitation fonctionnelle (AVD/AVQ) > 8 semaines"], ["E", "Avec symptômes modérés chroniques > 8 semaines"]],
    { pre: [IRM12, "Échec physiothérapie x 8 semaines et médication"], syn: ["sciatalgie", "hernie discale", "sténose spinale", "claudication neurogénique"] }],
  ["Rachis lombo-sacré", "Lombalgie isolée sans atteinte radiculaire avec anomalie structurelle (scoliose, spondylolyse, spondylolisthésis, sténose spinale, sténose foraminale)", "E", { pre: [IRM12], syn: ["lombalgie", "spondylolisthésis", "scoliose"] }],
  ["Nerfs périphériques", "Neuropathie compressive (ex. : tunnel carpien ou canal cubital)", [["D", "Avec atteinte motrice"], ["E", "Sans atteinte motrice"]], { pre: ["E:EMG < 1 an et autres rapports d'investigation"], syn: ["canal carpien", "cubital"] }],
  ["Nerfs périphériques", "Tumeur d'un nerf périphérique", "D", { pre: ["I:IRM ou échographie < 12 mois"], syn: ["schwannome", "neurofibrome"] }],
  ["Tumeur", "Tumeurs intracrâniennes extracérébrales : méningiome, neurinome, schwannome, tumeur hypophysaire, base ou voûte du crâne", [["C", "Avec symptôme neurologique progressif"], ["D", "Sans symptôme neurologique progressif"]], { pre: [IRMTDM], syn: ["méningiome", "hypophyse", "tumeur cérébrale"] }],
  ["Vasculaire", "Anévrisme cérébral, malformation artério-veineuse, fistule durale, angiome caverneux (sans hémorragie)", "D", { pre: [IRMTDM], syn: ["anévrisme", "MAV"] }],
  ["Vasculaire", "Sténose carotidienne asymptomatique (≥ 70 %)", "D", { pre: [IMG], syn: ["carotide"] }],
  ["Fonctionnel", "Névralgie cranio-faciale (ex. : trijumeau) réfractaire au traitement médical", "D", { pre: ["I:Rapport d'IRM et autres rapports d'investigation"], syn: ["trijumeau"] }],
  ["Fonctionnel", "Neuromodulation pour syndrome douloureux chronique ou pour spasticité", "E", { pre: ["Rapports d'investigation"], syn: ["neurostimulation", "spasticité", "douleur chronique"] }],
  ["Crânien divers", "Hydrocéphalie chronique ou à pression normale", "D", { pre: [IMG], syn: ["hydrocéphalie", "HPN"] }],
  ["Crânien divers", "Kyste intracrânien (ex. : arachnoïdien, glande pinéale)", "E", { pre: [IRMTDM], syn: ["kyste arachnoïdien"] }],
  ["Crânien divers", "Lésion osseuse crânienne d'aspect bénin (ex. : kyste, malformation osseuse)", "E", { pre: [IRMTDM], syn: ["crâne"] }],
  ["Crânien divers", "Malformation de Chiari type 1 : symptomatique ou avec syrinx", "D", { ori: ["Symptômes associés à la malformation de Chiari type 1 : céphalée occipito-cervicale à l'effort, trouble de déglutition, apnée du sommeil. La présence d'au moins un de ces symptômes est requise."], syn: ["Chiari", "syrinx"] }],
]);
