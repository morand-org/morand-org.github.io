# Fiches patients : versions corrigées par le Dr Morand

Les fiches corrigées remplacent le fichier publié sous le même nom, pour que les liens existants (résultats du calcul,
listes par région) continuent de fonctionner. Ne pas relancer le découpage d'un PDF de région plus ancien sans
remettre ensuite ces fichiers.

| Date | Région | Fiche | Fichier | Changements |
|---|---|---|---|---|
| 2026-11-24 | Poignet et main | 12, doigt à ressaut | `locomoteur/poignet/patients/12-doigt-qui-accroche-ou-reste-bloque-doigt-a-ressaut.pdf` | Titre « Doigt à ressaut (Trigger finger) », consignes précisées (attelle, infiltration, quand reconsulter), illustrations des exercices refaites. |

## Version 2 : règles pour intégrer les réponses d'OpenEvidence

- **Règle de douleur (décision du 26 novembre 2026) :** elle reste « le lendemain matin », comme dans la version 1.
  - Les fiches envoyées à OpenEvidence le 25 novembre (`revision/openevidence/`) disaient « dans l'heure qui suit l'exercice ». Une correction d'OpenEvidence sur ce délai ne s'applique pas.
  - Si OpenEvidence apporte une donnée qui contredit le lendemain matin pour un problème précis, la signaler au Dr Morand sans la reporter.
- Les autres corrections se reportent fiche par fiche, grâce à l'identifiant `[région/id]`, dans `ajouts/` ou `textes/`, puis on relance `produire-fiches.mjs`.
