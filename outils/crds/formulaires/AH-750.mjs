// AH-750 DT9283 (rév. 2024-03) : Consultation en gastroentérologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const ENDO = "Pourrait être vu directement en endoscopie.";
const CN = "L'utilisation du conseil numérique est fortement recommandée.";
const PH = "Perturbations du bilan hépatique";
const IPP = "Une réponse partielle ou une rechute à l'arrêt des IPP ne constituent pas des échecs au traitement.";
export default formulaire(meta("AH-750", "gastro", "Gastroentérologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Remplir le formulaire AH-702 (demande de coloscopie) ou l'Accueil clinique si disponible pour : haute suspicion de cancer colorectal basée sur l'imagerie, RSOSi positif (FIT positif), diarrhées chronique/constipation chronique, rectorragie, anémie ferriprive non gynécologique, suspicion de MII, suivi de diverticulite.",
    "Annexe 1, bilan suggéré pour les perturbations du bilan hépatique. Pour tous : échographie abdominale ; bilan hépatique complet (ALT, AST, phosphatase alcaline, bilirubine, INR) ; HbsAg, anti-HCV ; % saturation de la transferrine, ferritine ; TSH. Selon les circonstances et selon disponibilité : bilan lipidique et HbA1C ; anticorps anti-transglutaminase ; ANA, dosage des gammaglobulines (IgA, IgM, IgG) ; anticorps anti-mitochondrie (si élévation surtout de la phosphatase alcaline) ; anticorps anti-muscle lisse et anti-LKM ; céruloplasmine et alpha-1 antitrypsine.",
    "Autre raison : utilisez le conseil numérique si cliniquement indiqué."],
  alertes_titre: "Diriger l'usager à l'urgence",
  alertes_urgence: ["Hémorragie digestive aiguë : hématémèse, rectorragie ou méléna dont la quantité ou la fréquence entraînent une instabilité cardio-vasculaire, ou chez un patient sous anticoagulant qui ne peut être cessé temporairement par le référant",
    "Impaction alimentaire ou corps étranger", "Cholangite", "Pancréatite aiguë", "Encéphalopathie hépatique de novo (1er épisode)", "Ascite (1er épisode ou fébrile)", "Hépatite aiguë sévère (ALT > 500)"],
}), [
  ["Œsophage et estomac", "Dysphagie œsophagienne", [["C", "Blocage avec restriction à s'alimenter à chaque repas avec une perte de poids secondaire (IPP à débuter dès que possible)"],
    ["D", "Blocage occasionnel chez un patient > 50 ans (IPP à débuter dès que possible)"],
    ["D", "Blocage occasionnel chez un patient < 50 ans ET persistant suite à un essai d'IPP pour 2 mois (prérequis : prise d'IPP 8 semaines)"]],
    { pre: ["Prise d'IPP 8 semaines (blocage occasionnel < 50 ans)"], ori: ["Blocage d'aliments principalement solides immédiatement suite à la déglutition. Ne s'applique pas pour : globus pharyngé (« boule constante dans la gorge ») ; dysphagie oro-pharyngée ; plénitude post-prandiale (sensation de blocage épigastrique)."],
      syn: ["dysphagie", "déglutition", "blocage"] }],
  ["Œsophage et estomac", "RGO sévère et avec symptômes résiduels significatifs malgré les IPP double dose ou IPP à action prolongée pour 8 semaines", "E",
    { pre: ["Prise d'IPP 8 semaines"], ori: [IPP], syn: ["reflux", "RGO", "brûlures"] }],
  ["Œsophage et estomac", "Dépistage du Barrett (homme > 50 ans avec ces 3 critères)", [["E", "RGO depuis plus de 10 ans ; aucune endoscopie les 10 dernières années ; facteurs de risque (caucasien, fumeur, obèse, historique familiale de Barrett ou néoplasie œsophagienne)"]],
    { ori: [ENDO], syn: ["Barrett", "reflux"] }],
  ["Œsophage et estomac", "Dyspepsie sans RGO réfractaire ou persistante après 8 semaines d'IPP", [["E", "< 60 ans"],
    ["D", "≥ 60 ans (le symptôme prédominant ne doit pas être le reflux, sinon case RGO à utiliser) sans signaux d'alarmes ; pourrait être vu directement en endoscopie"],
    ["D", "Anomalie à l'imagerie à corréler en gastroscopie (prérequis : résultat de l'imagerie recommandant la corrélation endoscopique) ; pourrait être vu directement en endoscopie"]],
    { pre: ["Prise d'IPP 8 semaines", "Recherche et éradication de H Pylori", "Arrêt des AINS lorsque possible", "I:Résultat de l'imagerie recommandant la corrélation endoscopique (anomalie à l'imagerie)"],
      ori: [IPP, "Durant l'attente, des thérapies de deuxième ligne peuvent être tentées (tricyclique, prokinétique)."], syn: ["dyspepsie", "gastroscopie", "pylori"] }],
  ["Œsophage et estomac", "Perte de plus de 10 % du poids causée par des symptômes digestifs", [["C", "Patient ≥ 60 ans avec dyspepsie et vomissement"], ["D", "Patient < 60 ans avec dyspepsie et vomissement"],
    ["D", "Avec douleur abdominale ou diarrhée (prérequis : CT abdo, anti-ttg, calprotectine fécale, tsh, crp)"]],
    { pre: ["I:CT abdo (avec douleur abdominale ou diarrhée)", "L:Anti-ttg, calprotectine fécale, TSH, CRP (avec douleur abdominale ou diarrhée)"], syn: ["perte de poids", "amaigrissement"] }],
  ["Œsophage et estomac", "Hématémèse ou méléna", [["D", "Avec Hb > 120"], ["C", "Avec Hb 100-119"]], { ori: ["Utilisez les protocoles d'accueil clinique si disponibles.", ENDO], syn: ["saignement digestif", "hémorragie"] }],
  ["Intestin", "Anti-transglutaminase positif (non connu cœliaque)", "D", { ori: [ENDO], syn: ["cœliaque", "coeliaque", "ttg"] }],
  ["Intestin", "Douleur abdominale chronique", "E", { pre: ["Pour obtenir une meilleure priorité, joindre un rapport d'imagerie anormale et/ou des résultats de laboratoires anormaux"], ori: ["Envisager le conseil numérique."], syn: ["douleur abdominale"] }],
  ["Intestin", "Diarrhée chronique sans anomalie aux prérequis chez un patient ayant < 50 ans", "E", { pre: ["L:Anti-ttg, calprotectine fécale, TSH, CRP"], ori: ["Si > 50 ans ou calprotectine haute : formulaire AH-702 en endoscopie."], syn: ["diarrhée"] }],
  [PH, "ALT entre 201-500 UI AVEC atteinte des fonctions hépatiques (bilirubine ou INR anormaux)", "B", { pre: ["L:Persistance des ALT > 200 lors d'un contrôle au moins 7 jours après le premier prélèvement"], syn: ["transaminases", "foie", "ALT"] }],
  [PH, "ALT entre 201-500 sans atteinte des fonctions hépatiques (bilirubine ou INR normaux)", "C", { pre: ["L:Persistance des ALT > 200 lors d'un contrôle au moins 7 jours après le premier prélèvement"], syn: ["transaminases", "foie", "ALT"] }],
  [PH, "ALT entre 91-200, bilirubine et INR normaux", "D", { pre: ["L:Persistance des ALT > 91 lors d'un contrôle au moins 30 jours après le premier prélèvement"], ori: [CN], syn: ["transaminases", "foie", "ALT"] }],
  [PH, "ALT entre 40-90 persistant suivi de plus de 6 mois avec anomalie au bilan d'hépatopathie de base", "E", { pre: ["Inscrire dans la section autres renseignements les anomalies retrouvées au bilan de base"], ori: [CN], syn: ["transaminases", "foie", "ALT"] }],
  [PH, "Stéatose hépatique ET risque de fibrose/cirrhose", [["E", "Une justification est nécessaire : NAFLD fibrosis score > 0,675 ; score FIB-4 > 3,25 ; obésité avec IMC > 40 ; splénomégalie ou thrombopénie ; foie bosselé ou dysmorphique à l'imagerie ; diabète depuis > 10 ans ; Fibroscan > 8"]],
    { ori: [CN, "Calculateurs (annexe 2 du formulaire) : NAFLD fibrosis score, mdcalc.com ; score FIB-4, cregg.org."], syn: ["stéatose", "foie gras", "NAFLD", "MASLD", "fibrose", "FIB-4"] }],
  [PH, "Cirrhose confirmée par imagerie avec bilirubine totale > 34 ou INR > 1.2", "D", { syn: ["cirrhose", "foie"] }],
  [PH, "Cirrhose confirmée par imagerie (INR, albumine et bilirubine totale normaux)", "E", { ori: [CN], syn: ["cirrhose", "foie"] }],
  [PH, "HbsAg positif avec ALT < 90 UI", "D", { syn: ["hépatite B", "VHB"] }],
  [PH, "AntiHCV positif avec ALT < 200 UI", "D", { syn: ["hépatite C", "VHC"] }],
  [PH, "Ictère avec bilirubine totale > 60 ou > 40 avec dilatation des voies biliaires à l'échographie", "B", { pre: ["I:Rapport imagerie médicale"], syn: ["jaunisse", "bilirubine"] }],
  ["Pancréas, foie et imagerie", "Anomalie à l'imagerie non suspecte au pancréas ou au foie (selon imagerie) mais nécessitant un suivi ou une précision", "E", { pre: ["I:Rapport imagerie"], ori: [CN] }],
  ["Pancréas, foie et imagerie", "Kyste pancréatique de type TIPMT des canaux secondaires", [["D", "Taille > 20 mm, wirsung dilaté, croissance ou nodule mural"], ["E", "Taille < 20 mm ou chez un patient de > 75 ans et absence de nodule mural, dilatation du wirsung ou croissance (l'utilisation du conseil numérique est fortement recommandée)"]],
    { pre: ["I:Rapport d'imagerie ou MRCP du pancréas"], syn: ["TIPMT", "IPMN", "pancréas"] }],
  ["Pancréas, foie et imagerie", "Haute suspicion de cancer digestif basée sur l'imagerie (excluant le cancer colorectal où il faut utiliser le formulaire AH-702)", "B", { pre: ["I:Rapport d'imagerie"], syn: ["cancer", "néoplasie"] }],
]);
