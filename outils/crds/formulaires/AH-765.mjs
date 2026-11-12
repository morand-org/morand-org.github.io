// AH-765 DT9302 (rév. 2022-04) : Consultation en rhumatologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const AI = "Arthropathie inflammatoire (excluant arthrose)", CV = "Collagénose ou vasculite";
const CRIT = "Facteur rhumatoïde ou anti-CCP ou CRP ≥ 15 ou antécédent de psoriasis ou érosion radiologique";
const AL = "Consulter les alertes cliniques.";
export default formulaire(meta("AH-765", "rhumato", "Rhumatologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc."],
  alertes_titre: "Rejoindre le rhumatologue de garde ou diriger l'usager vers l'urgence",
  alertes_urgence: ["Arthrite septique", "Arthrite avec fièvre", "Artérite temporale avec symptômes (céphalée nouvelle, perte visuelle ou diplopie, douleur au cuir chevelu, claudication de la mâchoire)",
    "Vasculite ou collagénose avec atteinte d'organe sévère"],
}), [
  [AI, "Suspicion d'arthrite microcristalline : goutte récidivante malgré traitement standard ou goutte tophacée", "D", { pre: ["L:FSC, CRP, créatinine, acide urique", "I:RX"], syn: ["goutte", "acide urique"] }],
  [AI, "Suspicion d'arthrite microcristalline : arthrite avec suspicion de pseudogoutte ou hydroxyapatite", "D", { pre: ["L:FSC, CRP, créatinine, acide urique", "I:RX"], syn: ["pseudogoutte", "CPPD"] }],
  [AI, "Suspicion de polyarthrite chronique ≥ 4 semaines", [["C", `Avec synovites claires ; ${CRIT} : positif`], ["D", "Avec synovites claires : négatif"],
    ["D", `Avec doute de synovites ; ${CRIT} : positif`], ["E", "Avec doute de synovites : négatif"]],
    { pre: ["L:FSC, CRP, créatinine, ALT, facteur rhumatoïde, anti-CCP", "I:RX"], syn: ["polyarthrite rhumatoïde", "PAR", "synovite", "arthrite"] }],
  [AI, "Spondylite ou sacroiliite", [["D", "Antécédent d'uvéite ou de psoriasis ou de maladie inflammatoire intestinale ou d'ITSS récente ou d'une sacro-iliite à l'imagerie : positif"], ["E", "Négatif"]],
    { pre: ["L:HLA-B27", "I:RX des sacro-iliaques"], ori: ["Lombalgie inflammatoire évoluant depuis plus de 3 mois avec début des symptômes < 45 ans, raideur matinale > 1 h, amélioration avec AINS ou activité physique."], syn: ["spondylarthrite", "sacro-iliite", "lombalgie inflammatoire"] }],
  [CV, "Polymyalgia rheumatica sans symptôme d'artérite temporale ≥ 50 ans", "B", { pre: ["L:FSC, VS, CRP"], ori: ["Polymyalgia rheumatica : douleurs des ceintures scapulaires ou pelviennes débutant après 50 ans avec raideur matinale > 1 h, ↑ VS ou ↑ CRP."], syn: ["PMR", "pseudopolyarthrite rhizomélique"] }],
  [CV, "Myopathie inflammatoire, avec au moins 2 valeurs de CK ≥ à 1,5 fois la normale", "C", { pre: ["L:CK, ANA"], syn: ["myosite", "CK"] }],
  [CV, "Vasculite autre que l'artérite temporale sans atteinte sévère d'organe", [["C", "De novo"], ["D", "Connue et stable"]], { pre: ["L:FSC, CRP, créatinine, analyse d'urine"], ori: [AL], syn: ["vasculite"] }],
  [CV, "Collagénose sans atteinte sévère d'organe de novo ou connue", [["D", "ANA ≥ 1/160"], ["E", "ANA < 1/160"]], { pre: ["L:FSC, CRP, créatinine, analyse d'urine"], ori: [AL], syn: ["lupus", "Sjögren", "sclérodermie", "ANA"] }],
  [CV, "Phénomène de Raynaud isolé", [["D", "ANA ≥ 1/160"], ["E", "ANA < 1/160"]], { syn: ["Raynaud"] }],
  ["Maladie osseuse", "Ostéoporose secondaire ou échec thérapeutique", "E", { pre: ["L:25(OH) vitamine D", "E:DMO"], ori: ["Ostéoporose avec échec thérapeutique : nouvelle fracture malgré traitement ≥ 12 mois ; diminution significative de la DMO malgré un traitement approprié."], syn: ["ostéoporose", "densitométrie"] }],
  ["Maladie osseuse", "Maladie de Paget", "E", { pre: ["L:Phosphatase alcaline", "I:RX, scintigraphie osseuse"], syn: ["Paget"] }],
  ["Autres", "Fibromyalgie avec problématique diagnostique et non thérapeutique", "E", { pre: ["L:FSC, CRP, CK, TSH", "Justifier"], syn: ["fibromyalgie", "douleur diffuse"] }],
  ["Autres", "Arthrose invalidante non-axiale avec échec au traitement", "E", { pre: ["I:RX", "Justifier"], syn: ["arthrose"] }],
]);
