// AH-766 DT9327 (rév. 2022-05) : Consultation en physiatrie adulte, médecine physique et réadaptation. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const DUREE = [["C", "Condition présente depuis plus de 4 semaines et moins de 6 mois"], ["D", "Condition présente depuis 6 mois et plus mais moins de 1 an"], ["E", "Condition présente depuis 1 an ou plus"]];
export default formulaire(meta("AH-766", "physiatrie", "Physiatrie adulte (médecine physique et réadaptation)", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir le formulaire.",
    "Ne remplir qu'une seule section par formulaire.",
    "Infiltration vertébrale sous fluoroscopie, échographie diagnostique et/ou infiltration échoguidée, EMG : si le service n'était pas offert dans sa région, il y aura orientation de la consultation directement vers la région la plus rapprochée où un physiatre ayant l'expertise pourrait le rencontrer.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Syndrome de la queue de cheval", "Pied tombant de moins de 48 h", "Myélopathie rapidement progressive", "Arthrite septique",
    "Incapacité fonctionnelle complète aiguë (incapacité totale de se mobiliser et d'assurer ses activités de la vie quotidienne)"],
}), [
  ["1. Atteinte locomotrice", "Consultation pour atteinte locomotrice (membre supérieur, membre inférieur, rachis)", [["D", "Condition présente depuis moins de 1 an"], ["E", "Condition connue depuis un an ou plus"]],
    { ori: ["Cocher le site : épaule, coude, poignet/main ; hanche, genou, cheville/pied ; cervicalgie/cervicobrachialgie, dorsal, lombalgie/lombosciatalgie. Case possible : opinion pour infiltration."], syn: ["lombalgie", "cervicalgie", "épaule", "genou", "douleur musculosquelettique", "infiltration"] }],
  ["2. Système nerveux périphérique", "Consultation pour système nerveux périphérique (mononévrite)", DUREE,
    { pre: ["Indiquer le site anatomique dans la section impression diagnostique"], ori: ["Cocher la case si demande d'EMG (et une des trois cases de durée)."], syn: ["EMG", "neuropathie", "canal carpien", "mononévrite"] }],
  ["3. Infiltration vertébrale sous fluoroscopie", "Infiltration vertébrale sous fluoroscopie : douleur radiculaire", DUREE, { pre: ["I:CT scan ou IRM"], syn: ["infiltration", "épidurale", "sciatalgie", "radiculopathie"] }],
  ["3. Infiltration vertébrale sous fluoroscopie", "Infiltration vertébrale sous fluoroscopie : douleur vertébrale", [["D", "Condition présente depuis plus de 4 semaines et moins de 1 an"], ["E", "Condition présente depuis 1 an ou plus"]], { pre: ["I:Rx"], syn: ["infiltration", "facettes", "lombalgie"] }],
  ["4. Échographie diagnostique et/ou infiltration échoguidée", "Atteinte des tissus mous membre supérieur, membre inférieur (échographie diagnostique et/ou infiltration échoguidée)",
    [["D", "Condition présente depuis plus de 4 semaines et moins de 1 an"], ["E", "Présente depuis 1 an ou plus"]], { pre: ["I:Radiographie"], syn: ["échographie", "infiltration", "tendinite"] }],
]);
