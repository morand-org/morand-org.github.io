// AH-764 DT9300 (rév. 2020-11) : Consultation en psychiatrie adulte ou au guichet d'accès en santé mentale adulte. Transcrit du PDF statique du MSSS.
// Étape 1 : motif ; étape 2 : tableau clinique ; étape 3 : priorité selon l'atteinte fonctionnelle (commune à tous les tableaux).
import { formulaire } from "../outils.mjs";
import { meta } from "../sources.mjs";
const ETAPE3 = [["B", "Trouble grave, instable, avec désorganisation légère et risque de dégradation si traitement retardé"], ["C", "Rupture fonctionnelle, ne répond pas au traitement ou aux interventions standards"],
  ["D", "Fonctionnement stable mais détresse significative, ne répond pas à un traitement ou une intervention standard"], ["E", "Condition chronique à optimiser"]];
const BASE = "L:Bilan de base, TSH";
const T = (nom, syn, opt = {}) => ["Tableau clinique", nom, ETAPE3, { syn, ...opt }];
export default formulaire(meta("AH-764", "psy", "Psychiatrie adulte (et guichet d'accès en santé mentale adulte)", {
  consignes: ["Consulter les alertes cliniques au verso. Ne pas utiliser ce formulaire pour un usager dangereux ou non collaborant.",
    "Étape 1, motif : évaluation diagnostique ; recommandations thérapeutiques ; consultation au guichet d'accès en santé mentale adulte ; accès aux services de nature sociale ou psychologique. Pour une opinion pharmacologique ou autre question brève, il est recommandé d'utiliser la consultation téléphonique (médecin spécialiste répondant en psychiatrie, MSRP, ou à défaut le psychiatre de garde).",
    "Étape 3 : les cotes de priorité ne sont que pour les demandes de consultation en services spécialisés.",
    "NE PAS utiliser ce formulaire pour : un usager ayant déjà un suivi actif en psychiatrie (le rediriger vers le psychiatre traitant ou son équipe) ; une expertise médico-légale ou une évaluation de capacité parentale ; un usager sans problématique de santé mentale (le diriger vers les services sociaux généraux de votre établissement).",
    "Au verso (à remplir) : antécédents psychiatriques ; facteurs de stress actuels ; histoire pharmacologique (molécule, dose maximale, efficacité, effets secondaires) ; démarches psychosociales antérieures et actuelles ; attentes du patient ; problème de dépendances ; situation discutée avec le MSRP ; sécurité (pas de risque immédiat pour lui-même et autrui) ; consentement verbal à l'envoi de la demande au GASM de son RLS ; motivation (si non motivé, travailler sa motivation avant de référer).",
    "Autres ressources indiquées au formulaire : Info-Social 811 ; centres de crise (www.centredecrise.ca/listecentres) ; ligne d'aide en prévention du suicide 1 866 277-3553 (1 866 APPELLE)."],
  alertes_titre: "Diriger l'usager vers l'urgence",
  alertes_urgence: ["État instable avec désorganisation marquée du langage ou du comportement", "Délirium",
    "Si jugé dangereux pour lui-même ou autrui, diriger l'usager aux urgences ; si non collaborant et jugé dangereux pour lui-même ou autrui : composer le 911"],
}), [
  T("Dépression récurrente ou réfractaire aux traitements à dose optimale", ["dépression", "antidépresseur"], { pre: [BASE, "Histoire pharmacologique"] }),
  T("Trouble anxieux réfractaire aux traitements à dose optimale", ["anxiété", "TAG", "panique"], { pre: [BASE, "Histoire pharmacologique"] }),
  T("Trouble de personnalité, réfractaire à une approche psychologique d'un intervenant de première ligne", ["personnalité", "borderline"]),
  T("Troubles de comportement ou de l'humeur associés à des troubles cognitifs", ["démence", "SCPD", "cognitif"], { pre: ["E:MOCA ou Folstein (si Folstein normal, 27 ou plus, MOCA obligatoire)"], ori: ["MOCA : formulaire disponible à www.mocatest.org."] }),
  T("Premier épisode psychotique ou de manie psychotique", ["psychose", "manie", "schizophrénie"], { pre: ["L:Si possible, dosage de cannabis, cocaïne et amphétamines"] }),
  T("Psychose ou manie", ["psychose", "bipolaire", "manie"], { pre: [BASE, "Histoire pharmacologique"] }),
  T("TDAH chez l'adulte réfractaire ou atypique", ["TDAH", "attention"], { pre: ["Questionnaire de dépistage CADDRA"], ori: ["CADDRA : formulaires disponibles à www.caddra.ca."] }),
  T("Toxicomanie en comorbidité avec un trouble psychiatrique (préciser la ou les substances)", ["dépendance", "alcool", "drogue", "toxicomanie"]),
  T("Autre (préciser)", ["santé mentale"]),
]);
