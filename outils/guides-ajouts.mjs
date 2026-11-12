// Guide Morand : ressources ajoutées au catalogue des guides cliniques, en plus de celles du site d'origine.
// Même forme que guides/donnees.json ; « apres » : l'adresse de la fiche après laquelle la placer (même sujet).
// Une ressource qui arrive un jour dans le catalogue d'origine (même adresse) n'est pas ajoutée deux fois.
// Chaque fiche : adresse vérifiée à la date « verifie » ; la description ne dit que ce que la page publique montre.
export const AJOUTS_GUIDES = [
  {
    title: "Syndrome douloureux régional complexe (SDRC) : à l’aide docteur ! (Le Médecin du Québec)",
    org: "Le Médecin du Québec (FMOQ)",
    cat: "Os, articulations et douleur",
    tags: "SDRC syndrome douloureux régional complexe syndrome de douleur régionale complexe algodystrophie algoneurodystrophie dystrophie sympathique réflexe Sudeck causalgie CRPS douleur chronique Médecin du Québec FMOQ",
    url: "https://lemedecinduquebec.org/archives/2025/11/formation-continue/2-le-syndrome-douloureux-regional-complexe-a-l-aide-docteur/",
    desc: "Article de formation continue (novembre 2025), dans le dossier « Douleur chronique : trucs et astuces pour aider vos patients ». Réservé aux abonnés.",
    verifie: "2026-11-12",
    ajoute: "2026-11-12",
    format: "guide",
    acces: "abonnement",
    apres: "https://www.urgencehsj.ca/wp-content/uploads/02-Syndrome-Douloureux-Regional-Complexe-Dre-Dziubinska-16-janvier-15.01-1.pdf",
  },
];
