// AH-745 DT9206 (rév. 2018-06) : Consultation en ophtalmologie adulte et enfant. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const AV = "Inscrire résultat acuité visuelle en début de formulaire";
export default formulaire(meta("AH-745", "ophtalmo", "Ophtalmologie adulte et enfant", {
  consignes: ["Consulter les instructions pour les urgences cliniques de priorités A à référer à l'ophtalmologiste de garde, au verso.",
    "Le formulaire demande le résultat de l'acuité visuelle (O.D. et O.S.) en début de formulaire.",
    "Il est préférable de diriger les usagers vers l'optométriste pour : yeux secs ou larmoiement ; dépistage glaucome ; dépistage de rétinopathie diabétique ; dépistage de dégénérescence maculaire (DMLA) ; dépistage de cataracte ; évaluation des troubles de l'acuité visuelle ; dépistage visuel chez l'enfant. Ces services sont assurés par la RAMQ pour les usagers ≤ 18 ans et ≥ 65 ans."],
  alertes_titre: "Priorité A (≤ 3 jours) : communiquer directement avec l'ophtalmologiste de garde",
  alertes_urgence: ["Œil rouge douloureux aigu : ulcère aigu, uvéite, glaucome aigu", "Corps étranger de la cornée (prescrire pommade antibiotique QID)",
    "Sidérose (prescrire pommade antibiotique QID)", "Corps flottant du vitré avec flash aigu récent (< 7 jours)",
    "Trauma oculaire ou orbitaire ou perforation oculaire ou hyphéma", "Perte subite de vision < 24 heures ou amaurose fugace",
    "Diplopie avec atteinte pupillaire", "Cellulite orbitaire"],
}), [
  ["Ophtalmologie", "Zona ophtalmique avec œil rouge ou baisse de vision", "B", { pre: ["Débuter traitement antiviral", AV], syn: ["zona", "herpès"] }],
  ["Ophtalmologie", "Conjonctivite réfractaire au traitement depuis plus de 2 semaines", [["C", "Avec douleur"], ["D", "Sans douleur"]], { pre: [AV] }],
  ["Ophtalmologie", "Usager traité pour glaucome chronique", "D", { pre: ["E:Joindre résultat pression oculaire (si disponible)", AV] }],
  ["Ophtalmologie", "Rétinopathie diabétique documentée", "E", { pre: ["E:Rapport de l'optométriste", AV], syn: ["diabète"] }],
  ["Ophtalmologie", "Prise de Hydroxychloroquine (Plaquenil)", "E", { pre: ["Date début et dose", AV], syn: ["plaquenil", "HCQ"] }],
  ["Ophtalmologie", "Larmoiement chronique chez l'adulte", "E", { pre: [AV] }],
  ["Ophtalmologie", "Cataracte documentée et symptomatique", "E", { pre: ["E:Rapport de l'optométriste", AV] }],
  ["Ophtalmologie", "Lésions palpébrales", [["D", "D'allure maligne"], ["E", "D'allure bénigne"]], { syn: ["paupière"] }],
  ["Ophtalmologie", "Chalazion significatif persistant", "E", { pre: ["Traitement médical amorcé depuis 3 mois"], syn: ["paupière"] }],
  ["Pédiatrie", "Strabisme chez l'enfant de 8 mois à 6 ans", [["D", "Déviation aiguë et constante"], ["E", "Déviation intermittente"]]],
  ["Pédiatrie", "Dacryosténose persistante", "D", { pre: ["Enfant âgé > 12 mois"], ori: ["Si plus jeune que 12 mois : aucune indication de référer."], syn: ["larmoiement", "canal lacrymal"] }],
]);
