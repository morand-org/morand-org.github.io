// AH-771 DT9427 (rév. 2019-01) : Consultation dirigée au médecin gériatre. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const TNC = "Trouble neurocognitif", AUT = "Autres";
export default formulaire(meta("AH-771", "geriatrie", "Gériatrie (consultation dirigée au médecin gériatre)", {
  consignes: ["Consulter les alertes cliniques au verso et continuer d'utiliser les corridors de consultation déjà existants : Accueil clinique, cliniques ambulatoires spécialisées de 3e ligne, cliniques de mémoire, hôpitaux de jour, équipes ambulatoires de gériatrie et psychogériatrie, services externes gériatriques, cliniques de la douleur, cliniques de chute, équipe SCPD, etc.",
    "Ce formulaire s'adresse à une clientèle de 65 ans et plus (principalement âgée de 75 ans et plus). Échelle C à E.",
    "Tout usager devra être accompagné d'un proche aidant (nom, lien et no de téléphone obligatoires).",
    "À joindre : ATCD, médication, investigation, autre(s) consultation(s) ; MMSE ou MOCA ; milieu de vie de l'usager ; intervenant principal au CLSC.",
    "SCPD : symptômes comportementaux et psychologiques de la démence. MAD : maintien à domicile.",
    "Maltraitance : « Il y a maltraitance quand un geste singulier ou répétitif, ou une absence d'action appropriée se produit dans une relation où il devrait y avoir de la confiance, et que cela cause du tort ou de la détresse chez une personne aînée. » (Ministère de la Famille, 2012). Ligne Aide Abus Aînés (AAA) : 1 888 485-ABUS."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Délirium ou altération de l'état d'éveil", "Personne âgée présentant une dangerosité immédiate et significative affectant sa sécurité ou celle de son entourage",
    "Chute avec séjour prolongé au sol ou incapacité significative à se déplacer"],
}), [
  [TNC, "Trouble neurocognitif majeur atypique", "D", { pre: ["I:Imagerie cérébrale 6 mois et moins", "E:MOCA ou MMSE"], syn: ["démence", "Alzheimer", "mémoire"] }],
  [TNC, "Trouble neurocognitif majeur typique : préciser la problématique à évaluer", "E", { pre: ["E:MOCA ou MMSE"], sou: ["I:Imagerie cérébrale"], syn: ["démence", "Alzheimer", "mémoire"] }],
  [TNC, "« Trouble du comportement » SCPD sans antécédent de maladies psychiatriques (réfractaire aux interventions de l'équipe SCPD de première ligne si disponible)",
    [["C", "MAD potentiellement compromis à court terme"], ["D", "MAD non compromis à court terme"]], { pre: ["I:Imagerie cérébrale 6 mois et moins", "E:MOCA ou MMSE"], syn: ["SCPD", "démence", "agitation", "maintien à domicile"] }],
  [TNC, "Chutes récurrentes non syncopales inexpliquées", "C", { sou: ["Rapport d'évaluation en physiothérapie"], syn: ["chute"] }],
  [AUT, "Maltraitance : situation d'abus, négligence, etc.", "C", { pre: ["Rapport d'évaluation psychosociale", "I:Rapport d'imagerie cérébrale ou à prescrire si non réalisé", "Nom et téléphone du travailleur social à inscrire dans renseignements cliniques"], syn: ["abus", "négligence", "maltraitance"] }],
  [AUT, "Perte de poids inexpliquée chez usager > 75 ans après investigation appropriée", "D", { pre: ["Rapports pertinents"], syn: ["perte de poids", "dénutrition"] }],
  [AUT, "Polypharmacie potentiellement néfaste/Déprescription", "D", { pre: ["Profil pharmacologique à jour (indiquer si plus d'une pharmacie)"], syn: ["polypharmacie", "déprescription", "médicaments"] }],
  [AUT, "Trouble de la marche et de l'équilibre", "D", { sou: ["I:Rapport d'imagerie cérébrale", "Rapport d'évaluation en physiothérapie"], syn: ["marche", "équilibre", "chute"] }],
]);
