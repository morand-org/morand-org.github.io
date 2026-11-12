// AH-749 DT9282 (rév. 2018-06) : Consultation en cardiologie adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const ACC = "Utiliser le formulaire d'Accueil clinique si disponible et selon l'état de l'usager.";
export default formulaire(meta("AH-749", "cardio", "Cardiologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso et favoriser les protocoles de l'Accueil clinique (si disponibles) avant de remplir ce formulaire.",
    "Utiliser ce formulaire seulement pour une nouvelle consultation. Dans le cas contraire, l'usager doit s'adresser au secrétariat de son cardiologue pour être vu."],
  alertes_titre: "Diriger l'usager à l'urgence",
  alertes_urgence: ["Syndrome coronarien aigu suspecté, angine de repos", "Insuffisance cardiaque décompensée",
    "Fibrillation auriculaire rapide ≥ 110 bpm au repos ou mal tolérée", "Syncope brutale (sans prodrome)",
    "Bradycardie symptomatique avec FC < 40 bpm ou pauses diurnes > 3 secondes documentées"],
}), [
  ["DRS / angine", "Angine d'effort sévère (CCS 3/4) stable", "B", { ori: [ACC], syn: ["angine", "douleur thoracique", "DRS"] }],
  ["DRS / angine", "DRS atypique avec facteurs de risque", "C", { ori: [ACC], syn: ["douleur rétrosternale", "douleur thoracique"] }],
  ["DRS / angine", "DRS typique évoluant depuis > 1 mois ou angine d'effort (CCS ≤ 2/4) stable", "C", { ori: [ACC], syn: ["douleur rétrosternale", "angine"] }],
  ["DRS / angine", "DRS atypique sans facteur de risque", "D", { syn: ["douleur rétrosternale", "douleur thoracique"] }],
  ["MCAS", "Suivi post infarctus de moins d'un an", "D", { syn: ["infarctus", "IM", "IDM", "coronarien"] }],
  ["MCAS", "Suivi post infarctus de plus d'un an", "E", { syn: ["infarctus", "IM", "IDM", "coronarien"] }],
  ["MCAS", "MCAS sans événement récent", "E", { syn: ["maladie coronarienne", "coronarien"] }],
  ["Dyspnée / insuffisance cardiaque", "Dyspnée d'effort de novo marquée (NYHA = 3/4) ou connue avec détérioration récente", "B", { syn: ["essoufflement", "NYHA", "IC"] }],
  ["Dyspnée / insuffisance cardiaque", "Dysfonction ventriculaire de novo (fraction éjection < 50 % si connue)", "C", { syn: ["FEVG", "fraction d'éjection", "IC"] }],
  ["Dyspnée / insuffisance cardiaque", "Dyspnée d'effort inexpliquée", "D", { syn: ["essoufflement"] }],
  ["Dyspnée / insuffisance cardiaque", "Suivi d'insuffisance cardiaque", "E", { syn: ["IC"] }],
  ["Troubles du rythme", "Bradycardie asymptomatique avec FC < 40 bpm ou pauses diurnes > 3 secondes documentées", "B", { syn: ["pause", "arythmie"] }],
  ["Troubles du rythme", "Fibrillation auriculaire de novo, FC < 110 bpm au repos", [["C", "FA de novo, FC < 110 bpm au repos"]], { lib: "FA de novo FC < 110 bpm au repos",
    pre: ["Débuter anticoagulothérapie si indiqué"], ori: [ACC], urg: ["Fibrillation auriculaire rapide ≥ 110 bpm au repos ou mal tolérée : diriger l'usager à l'urgence."],
    syn: ["FA", "arythmie", "anticoagulation"] }],
  ["Troubles du rythme", "TSV ou suspicion de TSV", "D", { syn: ["tachycardie supraventriculaire", "palpitations", "arythmie"] }],
  ["Troubles du rythme", "Palpitations d'allure bénigne", "E", { sou: ["E:Holter"], syn: ["arythmie"] }],
  ["Syncope", "Syncope avec cardiopathie", "B", { syn: ["perte de conscience"] }],
  ["Syncope", "Syncope sans cardiopathie", "D", { syn: ["perte de conscience"] }],
  ["Valvulopathie", "Valvulopathie aortique ou mitrale sévère", "C", { syn: ["sténose aortique", "insuffisance mitrale", "valve"] }],
  ["Valvulopathie", "Souffle cardiaque non investigué ou pathologie valvulaire non sévère", "E", { syn: ["valve", "valvulopathie"] }],
]);
