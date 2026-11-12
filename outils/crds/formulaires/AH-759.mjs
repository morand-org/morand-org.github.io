// AH-759 DT9252 (rév. 2024-03) : Consultation en gynécologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const ECHO = "I:Rapport d'échographie pelvienne";
const CPX = "Description masse annexielle complexe : hétérogène, zone solide, avec septa.";
export default formulaire(meta("AH-759", "gyn", "Gynécologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso. Favoriser les protocoles de l'Accueil clinique pour les grossesses du premier trimestre.",
    "Ce formulaire ne s'applique pas pour les grossesses au-delà de 14 semaines.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Orientés en 1re ligne et non pas au CRDS : visite gynécologique de santé préventive, incluant examen annuel/cytologie cervico-vaginale (PAP test)/dépistage ITSS ; ménopause ; contraception. Les maladies du sein ne sont pas prises en charge par la gynécologie.",
    "Besoins spéciaux : inscrire l'indice de masse corporelle si > 35, si mobilité réduite, besoin d'interprète, etc."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Grossesse ectopique soupçonnée ou confirmée", "Ménorragie aiguë importante", "Hyperemesis gravidarum avec déshydratation", "Abcès de la glande de Bartholin",
    "Infection pelvienne aiguë avec ou sans abcès", "Prolapsus génital complet en rétention urinaire", "Avortement avec saignement actif important ou fièvre",
    "Saignement du 1er trimestre, ou orienter la femme vers les ressources disponibles dans la région : Accueil clinique (utiliser formulaire approprié), clinique du 1er trimestre"],
}), [
  ["Saignements utérins anormaux (SUA)", "SUA post-ménopausiques", "C", { syn: ["saignement", "ménopause", "métrorragie"] }],
  ["Saignements utérins anormaux (SUA)", "SUA pré-ménopausiques", [["C", "Hb < 80"], ["D", "Hb entre 80 et 120"], ["E", "Hb > 120"]], { pre: ["L:Hb, ß-HCG", ECHO], syn: ["saignement", "ménorragie", "règles abondantes"] }],
  ["Fibromes", "Fibromes > 10 cm ou signes/symptômes compressifs", "D", { pre: [ECHO], syn: ["fibrome", "léiomyome"] }],
  ["Fibromes", "Fibromes asymptomatiques et Hb normale", "E", { pre: [ECHO], syn: ["fibrome", "léiomyome"] }],
  ["Masse annexielle", "Masse annexielle post-ménopausique", [["C", "Complexe"], ["D", "Simple"]], { pre: [ECHO, "L:Ca-125"], ori: [CPX], syn: ["ovaire", "kyste"] }],
  ["Masse annexielle", "Masse annexielle pré-ménopausique, persistante > 3 cm", [["C", "Complexe"], ["D", "Simple"]], { pre: ["I:2 rapports d'échographie pelvienne ≥ 2 mois d'intervalle"], ori: [CPX], syn: ["ovaire", "kyste"] }],
  ["Masse annexielle", "Masse annexielle avec ascite ou carcinomatose péritonéale", "B", { pre: ["I:Rapport d'imagerie"], syn: ["ovaire", "cancer"] }],
  ["Néoplasie", "Cytologie anormale ou lésion du col visuellement suspecte", [["HORS", "Référer directement au Centre de colposcopie de votre territoire"]], { syn: ["PAP", "col", "colposcopie", "HPV"] }],
  ["Néoplasie", "Lésion vulvaire ou vaginale suspecte", "C", { syn: ["vulve", "vagin"] }],
  ["Néoplasie", "Néoplasie de l'endomètre confirmée", "B", { pre: ["Rapport de pathologie"], syn: ["cancer", "endomètre"] }],
  ["Polypes et épaississement de l'endomètre", "Polypes de l'endomètre", [["D", "Post-ménopausiques sans SUA"], ["E", "Pré-ménopausiques"]], { syn: ["polype"] }],
  ["Polypes et épaississement de l'endomètre", "Épaississement de l'endomètre > 11 mm post ménopausique", "D", { pre: ["I:Rapport échographie endovaginale"], syn: ["endomètre"] }],
  ["Polypes et épaississement de l'endomètre", "Polype du col avec cytologie normale", "E", { syn: ["polype", "col"] }],
  ["Vulvo-vaginal", "Pathologies vulvaires/vaginales bénignes", "E", { syn: ["vulve", "vagin"] }],
  ["Vulvo-vaginal", "Vulvo-vaginites récidivantes et réfractaires", "E", { syn: ["vaginite", "candidose"] }],
  ["Vulvo-vaginal", "Dyspareunie ou vaginisme", "E", { syn: ["douleur relations"] }],
  ["Autres", "Complications reliées aux bandelettes urinaires", [["HORS", "Hors CRDS : référer à votre centre désigné en santé pelvienne"]],
    { ori: ["Référer à votre centre désigné en santé pelvienne via le formulaire de demande de consultation (www.msss.gouv.qc.ca/professionnels/soins-et-services/programme-sante-pelvienne/centres-designes/)."], syn: ["bandelette", "TVT"] }],
  ["Autres", "Contraception complexe, ligature tubaire ou stérilet", "E", { syn: ["contraception", "DIU", "stérilet"] }],
  ["Autres", "Infertilité", "E", { ori: ["Définition de l'infertilité : ≥ 1 an AVEC cycles réguliers ET âgée < 35 ans ; ≥ 6 mois AVEC cycles irréguliers OU âgée ≥ 35 ans ; spermogramme anormal ; ≥ 3 avortements spontanés."], syn: ["fertilité", "grossesse"] }],
  ["Autres", "Aménorrhée secondaire de > 6 mois", "D", { pre: ["L:TSH, PRL, LH, FSH, ß-HCG"], syn: ["règles", "aménorrhée"] }],
  ["Autres", "Ménopause complexe", "E", { pre: ["Justifier le besoin"], syn: ["ménopause"] }],
  ["Autres", "Prolapsus génital symptomatique", "E", { ori: ["Prolapsus génital symptomatique : cystocèle, rectocèle, prolapsus utérin ou évaluation de pessaire."], syn: ["descente d'organe", "pessaire", "cystocèle"] }],
  ["Autres", "Endométriose suspectée ou douleur pelvienne chronique (> 6 mois)", "E", { pre: [ECHO], syn: ["endométriose", "douleur pelvienne"] }],
]);
