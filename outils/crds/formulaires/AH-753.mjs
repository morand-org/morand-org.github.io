// AH-753 DT9286 (rév. 2018-06) : Consultation en orthopédie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
// « Traitement* = 3 mois de physiothérapie et 2 infiltrations réalisées » (en tête du formulaire).
const ECHEC = "Échec au traitement (3 mois de physiothérapie et 2 infiltrations réalisées)";
export default formulaire(meta("AH-753", "ortho", "Orthopédie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Traitement = 3 mois de physiothérapie et 2 infiltrations réalisées.",
    "Immobilisation de fracture(s) : pour des fractures non immobilisées, vous êtes encouragé à ne pas diriger les usagers à l'urgence mais d'utiliser plutôt les corridors de services disponibles dans votre région."],
  alertes_titre: "Diriger l'usager à l'urgence",
  alertes_urgence: ["Fracture ouverte avec ou sans compromis neurovasculaire", "Luxation non réduite", "Syndrome compartimental", "Arthrite septique", "Syndrome de la queue de cheval"],
}), [
  ["Épaule", "Rupture complète de la coiffe des rotateurs aiguë prouvée à l'IRM ou à l'écho (usager < 50 ans)", "C", { pre: ["I:Rapport IRM ou écho"], syn: ["coiffe", "épaule"] }],
  ["Épaule", "Maladie de la coiffe des rotateurs (bursite, tendinite, accrochage, déchirure chronique coiffe des rotateurs, tendinose)", "D", { pre: [ECHEC, "I:Rapport IRM ou écho"], syn: ["coiffe", "épaule", "tendinite"] }],
  ["Épaule", "Luxation récidivante épaule avec physiothérapie débutée", "D", { pre: ["I:Rapport RX, arthro-IRM"], syn: ["instabilité", "épaule"] }],
  ["Épaule", "Arthrose invalidante épaule", "D", { pre: [ECHEC, "I:Rapport RX"], syn: ["arthrose", "épaule"] }],
  ["Coude", "Rupture complète du tendon biceps distal", "B", { syn: ["biceps", "coude"] }],
  ["Coude", "Épicondylite et épitrochléite", "D", { pre: ["Traitement (3 mois de physiothérapie et 2 infiltrations réalisées)", "I:Rapport écho ou IRM"], syn: ["tennis elbow", "coude"] }],
  ["Genou", "Rupture complète du tendon rotulien ou quadriceps", "B", { lib: "Rupture complète du tendon : rotulien, quadriceps", syn: ["rotulien", "quadriceps", "genou"] }],
  ["Genou", "Rupture ligament croisé avec physiothérapie initiée", "C", { pre: ["I:Rapport IRM"], syn: ["LCA", "ligament croisé", "genou"] }],
  ["Genou", "Déchirure méniscale aiguë ou traumatique (usager < 60 ans)", "D", { pre: ["I:Rapport IRM"], syn: ["ménisque", "genou"] }],
  ["Genou", "Arthrose invalidante du genou", "D", { pre: [ECHEC, "I:Rapport RX"], syn: ["gonarthrose", "genou"] }],
  ["Pied / cheville", "Rupture complète du tendon d'Achille", "B", { syn: ["Achille", "cheville"] }],
  ["Pied / cheville", "Entorse sévère persistante cheville (symptômes plus de 2 mois malgré immobilisation et physio)", "C", { pre: ["I:Rapport RX et IRM"], syn: ["entorse", "cheville"] }],
  ["Pied / cheville", "Arthrose invalidante cheville", "D", { pre: [ECHEC, "I:Rapport RX"], syn: ["arthrose", "cheville"] }],
  ["Pied / cheville", "Hallux valgus ou orteils marteau symptomatiques", "E", { pre: ["I:Rapport RX"], syn: ["oignon", "orteil", "pied"] }],
  ["Autres", "Fracture aiguë mineure non déplacée immobilisée ou subluxation aiguë", "B", { pre: ["I:RX"], ori: ["Pour des fractures non immobilisées, vous êtes encouragé à ne pas diriger les usagers à l'urgence mais d'utiliser plutôt les corridors de services disponibles dans votre région."], syn: ["fracture"] }],
  ["Autres", "Néoplasie musculo-squelettique", "B", { pre: ["I:Rapport RX"], syn: ["tumeur osseuse", "cancer"] }],
  ["Autres", "Entorse sévère persistante poignet (symptômes plus de 2 mois malgré attelle et physio)", "C", { pre: ["I:Rapport RX et IRM"], syn: ["entorse", "poignet"] }],
  ["Autres", "Arthrose invalidante hanche", "D", { pre: [ECHEC, "I:Rapport RX"], syn: ["coxarthrose", "hanche"] }],
  ["Autres", "Syndrome du tunnel carpien ou tunnel cubital confirmé à l'EMG", "C", { pre: ["E:Rapport EMG"], syn: ["canal carpien", "cubital", "main"] }],
]);
