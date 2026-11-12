// AH-762 DT9269 (rév. 2019-01) : Consultation en microbiologie-infectiologie, maladies infectieuses adulte. Transcrit du PDF statique du MSSS.
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const SER = "Sérologie positive", NA = "Usager non en infection aiguë";
export default formulaire(meta("AH-762", "infectio", "Microbiologie-infectiologie adulte", {
  consignes: ["Consulter les alertes cliniques au verso. Favoriser les protocoles de l'Accueil clinique (si disponible) et les corridors de services fonctionnels déjà existants avant de remplir ce formulaire.",
    "Pour les plaies chroniques non infectées : référer à vos cliniques de soins de plaies.",
    "Conditions nécessitant une prise en charge < 24 h (utiliser le formulaire d'Accueil clinique si disponible, ou rejoindre le microbiologiste de garde, ou diriger l'usager vers l'urgence) : cellulite nécessitant un traitement IV ou réfractaire au traitement PO ; bursite nécessitant un traitement IV ou réfractaire au traitement PO ; morsure animale ou humaine surinfectée."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["Fièvre post retour de voyage, suspicion de malaria ou de maladie respiratoire sévère (MRS)", "Sepsis", "Méningite", "Endocardite", "Arthrite septique",
    "Ténosynovite infectieuse", "Cellulite rapidement progressive", "Exposition accidentelle à un liquide biologique", "Morsure animale autre que chien et chat", "Infection sévère chez un usager immunosupprimé"],
}), [
  [NA, "Gestion d'infections urinaires récidivantes", "C", { pre: ["L:Résultats de cultures d'urine positives et traitements associés"], syn: ["cystite", "infection urinaire"] }],
  [NA, "Gestion d'infections récidivantes à germes multi-résistants (ex. : SARM, ERV, etc.)", "C", { syn: ["SARM", "ERV", "résistance"] }],
  [NA, "Gestion d'infection dans un contexte de multiples allergies aux antibiotiques", "C", { syn: ["allergie", "antibiotique"] }],
  [NA, "Gestion d'infections à C. difficile récurrentes", "B", { syn: ["C. difficile", "diarrhée"] }],
  [SER, "VIH", [["B", "Nouvellement diagnostiqué (prérequis : résultat VIH)"], ["C", "Usager connu (prérequis : justifier la raison de consultation et prescrire décompte de CD4 et charge virale)"]],
    { pre: ["L:Résultat VIH (nouvellement diagnostiqué)", "L:Décompte de CD4 et charge virale, et justifier la raison de consultation (usager connu)"], syn: ["VIH", "sida"] }],
  [SER, "Hépatite B chronique", "C", { pre: ["L:Justifier et résultat de sérologie"], syn: ["VHB", "hépatite"] }],
  [SER, "Hépatite C", "C", { pre: ["L:Justifier et résultat de sérologie"], syn: ["VHC", "hépatite"] }],
  [SER, "Syphilis", "B", { pre: ["L:Résultat de sérologie"], syn: ["ITSS", "syphilis"] }],
  [SER, "Autres sérologies (ex. : toxo)", "C", { pre: ["L:Résultat de sérologie"], syn: ["toxoplasmose", "sérologie"] }],
  ["Autres", "Herpes simplex récidivant", "D", { syn: ["herpès", "HSV"] }],
  ["Autres", "Parasitose intestinale confirmée", "B", { pre: ["L:Résultat de recherche de parasites"], syn: ["parasite", "giardia"] }],
  ["Autres", "Infection non sévère du pied diabétique", "B", { ori: ["Pour les plaies chroniques non infectées : référer à vos cliniques de soins de plaies."], syn: ["pied diabétique", "plaie", "ulcère"] }],
  ["Autres", "Possibilité de maladie tropicale sans atteinte de l'état général (excluant la malaria)", "B", { syn: ["voyage", "tropical"] }],
  ["Autres", "TB latente suspectée (non active et non contagieuse)", [["B", "Avec agent immunosuppresseur en cours ou à venir"], ["D", "Contexte de dépistage"]], { syn: ["tuberculose", "TCT", "IGRA", "Mantoux"] }],
  ["Autres", "FUO (fièvre d'origine indéterminée depuis > 14 jours et bilan infectieux de base négatif incluant hémocultures)", "B", { pre: ["L:Résultats de laboratoire"], syn: ["fièvre", "FOI"] }],
]);
