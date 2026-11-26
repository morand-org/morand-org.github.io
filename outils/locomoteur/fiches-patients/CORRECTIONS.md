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
- **Descriptions de changement (correction du 26 novembre 2026) :** quand OpenEvidence décrit son changement au lieu de donner le texte (« ajout », « texte nuancé », « nouveau texte », « deux lignes ci-dessus », « une seule puce → deux puces »), la ligne de la réponse porte déjà le texte révisé : la description n'est jamais recopiée. Après chaque intégration, vérifier tout le texte des fiches (restes de note, phrase sans point final, phrase répétée).
- Les autres corrections se reportent fiche par fiche, grâce à l'identifiant `[région/id]`, dans `ajouts/` ou `textes/`, puis on relance `produire-fiches.mjs`.

## Version 2 : passe finale de simplification (demande du 26 novembre 2026) — faite le 26 novembre

Faite après l'intégration de toutes les révisions d'OpenEvidence, puis les fiches v2 ont été publiées sur le site.

- **Où :** `simplification/` (appliqué par `produire-fiches.mjs` après les revues). `_communes.json` : phrases répétées dans plusieurs fiches ; `<région>.json` : paires [ancien, nouveau] par fiche. Si un passage n'est plus trouvé (texte changé), la production s'arrête : la simplification est alors à revoir.
- **Fait :** les 129 règles de douleur en phrases courtes (seuil, puis « Elle doit être revenue à son niveau habituel le lendemain matin », puis quoi faire sinon) ; 437 phrases repérées (statistiques, mentions d'études, plus de 25 mots, mots savants) ramenées à 51, presque toutes des listes de signes d'alarme ; noms d'exercices en mots courants (« Rotation vers l'extérieur », « Contraction de la cuisse ») ; « (à vérifier) » n'est plus imprimé dans les références.
- **Règles suivies :**

- Relire le texte de toutes les fiches et le simplifier pour les patients, pour un niveau de scolarité faible.
- Garder peu de statistiques et ne pas parler des études : pas de pourcentages, de « X personnes sur 10 », de « les études montrent » ni de noms d'études dans le texte du patient. Les sources restent dans les journaux d'intégration (`revision/integration/`).
- Phrases courtes, mots simples, une idée par phrase ; garder les signes d'alarme et les consignes de sécurité.

## Publication de la version 2 (26 novembre 2026)

- Les PDF de la version 2 remplacent ceux de la version 1 **sous les mêmes noms de fichiers**, pour que les liens déjà donnés (résultats du calcul, listes, favoris) restent bons. Les listes et le lien du calcul affichent le titre médical et le sous-titre.
- Pour republier après une correction : `node outils/locomoteur/fiches-patients/produire-fiches.mjs [région]`, puis `node outils/locomoteur/fiches-patients.mjs` (copie les PDF v2 et refait les listes).
- La fiche du doigt à ressaut corrigée le 24 novembre est reprise dans la version 2 (mêmes dessins).
