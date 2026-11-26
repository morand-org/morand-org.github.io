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

## Version 2 : passe finale de simplification (demande du 26 novembre 2026)

À faire une fois toutes les révisions d'OpenEvidence reçues et intégrées (épaule et parties coupées comprises), avant les consignes de dessin et la publication sur le site.

- Relire le texte de toutes les fiches et le simplifier pour les patients, pour un niveau de scolarité faible.
- Garder peu de statistiques et ne pas parler des études : pas de pourcentages, de « X personnes sur 10 », de « les études montrent » ni de noms d'études dans le texte du patient. Les sources restent dans les journaux d'intégration (`revision/integration/`).
- Phrases courtes, mots simples, une idée par phrase ; garder les signes d'alarme et les consignes de sécurité.
- Poser les questions de clarification au Dr Morand avant de commencer (niveau visé, exemples à suivre).
