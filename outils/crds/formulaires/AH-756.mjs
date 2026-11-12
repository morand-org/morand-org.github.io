// AH-756 DT9199 (rév. 2022-04) : Consultation en chirurgie générale adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const SEIN = "Référer aux services de référence pour le sein : Centre de référence d'investigation désigné (CRID), guichet d'investigation et de référence du cancer du sein, clinique du sein ou Accueil clinique.";
export default formulaire(meta("AH-756", "chirgen", "Chirurgie générale adulte", {
  consignes: ["Consulter les alertes cliniques au verso. Favoriser les protocoles de l'Accueil clinique (si disponible) avant de remplir ce formulaire.",
    "Échelle B à E : pour les consultations de priorité A (≤ 3 jrs), ne pas les transmettre au CRDS ; utiliser les corridors suivants : spécialiste de garde, accueil clinique, etc.",
    "Remplir le formulaire AH-702 (demande de coloscopie) ou l'Accueil clinique disponible pour : haute suspicion de cancer colorectal basée sur l'imagerie, RSOSi positif (FIT positif), diarrhées chronique/constipation chronique, rectorragie, anémie ferriprive non gynécologique, suspicion de MII, suivi de diverticulite."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Douleur abdominale aiguë (ex. : appendicite, cholécystite, diverticulite compliquée ou sans réponse au traitement initial, ulcère perforé, etc.)",
    "Abcès ischiorectal", "Hémorragie digestive aiguë", "Hernie incarcérée", "Occlusion intestinale", "Abcès cutané / mammaire"],
}), [
  ["Digestifs", "Colique biliaire (un ou plusieurs épisodes)", "D", { pre: ["I:Rapport d'échographie abdominale"], syn: ["vésicule", "cholélithiase", "lithiase biliaire"] }],
  ["Digestifs", "Diverticulite avec récidives fréquentes prouvées au TDM de contrôle X 1", "D", { pre: ["I:Rapports de TDM"], syn: ["diverticule"] }],
  ["Digestifs", "Pathologies anorectales (douleur, saignement, prurit)", [["B", "Avec lésion suspecte au toucher rectal"], ["E", "Sans lésion suspecte au toucher rectal"], ["E", "Avec lésion non suspecte au toucher rectal"]], { syn: ["hémorroïdes", "fissure", "anus"] }],
  ["Digestifs", "Saignement anorectal", [["D", "Coloscopie normale réalisée dans les 3 dernières années"], ["D", "Moins de 30 ans sans antécédent familial de polypose ou de maladie inflammatoire intestinale"]], { syn: ["rectorragie", "hémorroïdes"] }],
  ["Digestifs", "Haute suspicion de cancer colorectal, RSOSi (FIT) positif, rectorragie, anémie ferriprive, suspicion de MII, suivi de diverticulite", [["HORS", "Remplir le formulaire AH-702 (demande de coloscopie) ou Accueil clinique disponible"]],
    { lib: "Haute suspicion de cancer colorectal basée sur l'imagerie, RSOSi positif (FIT positif), diarrhées chronique/constipation chronique, rectorragie, anémie ferriprive non gynécologique, suspicion de MII, suivi de diverticulite", syn: ["coloscopie", "FIT", "RSOSi", "côlon", "AH-702"] }],
  ["Hernies", "Hernie ombilicale/épigastrique symptomatique", "E", { syn: ["hernie", "nombril"] }],
  ["Hernies", "Hernie inguinale symptomatique", "D", { syn: ["hernie", "aine"] }],
  ["Hernies", "Hernie fémorale symptomatique ou asymptomatique", "D", { syn: ["hernie", "crurale"] }],
  ["Hernies", "Hernie incisionnelle symptomatique", "E", { syn: ["hernie", "éventration"] }],
  ["Peau", "Sinus pilonidal symptomatique", "E", { syn: ["kyste pilonidal"] }],
  ["Peau", "Kyste sébacé / tumeur bénigne avec interférence fonctionnelle", "E", { pre: ["Préciser le site et cocher « consultation » ou « consultation et exérèse »"], syn: ["kyste", "lipome", "exérèse"] }],
  ["Peau", "Ongle incarné", "D", { syn: ["ongle"] }],
  ["Seins", "Masse mammaire, anomalies radiologiques, écoulement sanguinolent ou autre changement suspect du sein", [["HORS", "Référer aux services de référence pour le sein de votre région"]],
    { ori: [SEIN, "Il est recommandé de référer en moins de 10 jours au guichet d'investigation et de référence du cancer du sein : < 30 ans avec un nodule de 2 cm ou qui augmente de volume ; ≥ 30 ans avec un nodule mammaire douloureux ou non ; > 50 ans avec un écoulement, une rétraction ou tout autre changement suspect du sein ; changements cutanés suspects au niveau du sein ; > 30 ans avec une masse axillaire de cause indéterminée (Direction générale de cancérologie, avril 2017)."],
      syn: ["sein", "mammaire", "nodule", "CRID"] }],
  ["Seins", "Investigation révélant un carcinome", "B", { pre: ["I:Rapports d'imagerie et de pathologie"], syn: ["sein", "cancer"] }],
  ["Seins", "Investigation révélant une anomalie autre", "C", { pre: ["I:Rapports d'imagerie et de pathologie"], syn: ["sein"] }],
]);
