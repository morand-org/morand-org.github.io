/* Accueil clinique : ce qui est public et vérifiable. Source principale : MSSS, « Orientations ministérielles –
   Organisation et implantation d'un service d'accueil clinique » (révision mai 2022, publication 22-905-02W),
   consultée le 12 novembre 2026. Les protocoles locaux de la Montérégie ne sont pas publics (portails réservés
   aux médecins) : ils ne sont pas reproduits ici. */
const MSSS = "https://publications.msss.gouv.qc.ca/msss/fichiers/2022/22-905-02W.pdf";
export const ACCUEIL_CLINIQUE = {
  source: { titre: "MSSS, Orientations ministérielles – Organisation et implantation d'un service d'accueil clinique (révision mai 2022)", url: MSSS, consulte_le: "2026-11-12" },
  definition: "Service qui permet aux médecins et aux IPS d'orienter des usagers nécessitant une prise en charge dans un délai de 24 à 72 heures pour des conditions cliniques prédéterminées : les examens sont faits selon un protocole, puis une consultation avec le médecin spécialiste a lieu au besoin. Le professionnel demandeur assure le suivi de l'usager pendant l'épisode de soins.",
  regles: [
    "Chaque accueil clinique doit permettre le référencement des médecins et IPS de son CISSS ou CIUSSS travaillant à l'extérieur d'un centre hospitalier (GMF, cliniques privées, CHSLD, etc.).",
    "Les usagers doivent être référés vers l'accueil clinique de leur établissement le plus près du lieu de consultation ; si le protocole n'y est pas offert, l'usager peut être dirigé vers une autre installation du CISSS ou CIUSSS.",
    "Le professionnel demandeur doit assurer le suivi de l'usager et être joignable.",
    "CRDS de la Montérégie : l'accueil clinique demeure le lieu de référence prioritaire pour toutes les conditions cliniques disponibles à l'accueil clinique.",
  ],
  // Annexe B : les sept problèmes cliniques ciblés par le MSSS (les protocoles réellement offerts varient selon l'installation).
  conditions: [
    { nom: "Suspicion de thrombophlébite profonde", syn: ["TVP", "thrombose", "phlébite", "mollet"] },
    { nom: "Suspicion de fibrillation auriculaire ou fibrillation auriculaire stable (provenant de l'urgence)", syn: ["FA", "fibrillation", "arythmie"] },
    { nom: "Douleur rétrosternale", syn: ["DRS", "douleur thoracique", "angine"] },
    { nom: "Saignement vaginal au premier trimestre de grossesse", syn: ["grossesse", "saignement", "1er trimestre", "fausse couche"] },
    { nom: "Suspicion de diverticulite", syn: ["diverticulite", "douleur abdominale"] },
    { nom: "Hématurie macroscopique", syn: ["sang dans l'urine", "hématurie"] },
    { nom: "Cellulite", syn: ["cellulite", "infection de la peau"] },
  ],
  // Annexe A, Montérégie : installations (urgence 2B ou 3A, plus de 30 000 visites) qui doivent avoir un accueil clinique.
  monteregie: [
    { cisss: "CISSS de la Montérégie-Centre", installations: ["Hôpital Charles-LeMoyne", "Hôpital du Haut-Richelieu"] },
    { cisss: "CISSS de la Montérégie-Est", installations: ["Hôpital Pierre-Boucher", "Hôpital Honoré-Mercier"] },
    { cisss: "CISSS de la Montérégie-Ouest", installations: ["Hôpital du Suroît", "Centre hospitalier Anna-Laberge"] },
  ],
  portails: [{ nom: "Accueil clinique, territoire Pierre-Boucher (portail réservé aux médecins inscrits)", url: "https://pierre-boucher.accueilclinique.com/" }],
  limites: "Les protocoles, formulaires et coordonnées de chaque accueil clinique de la Montérégie ne sont pas publics : vérifiez l'offre de l'installation de votre territoire. Les sept problèmes sont ceux que le MSSS a ciblés en 2022 ; une installation peut en offrir d'autres, ou ne pas tous les offrir.",
};
