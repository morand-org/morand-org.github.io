# Morand — Entraînement clinique : audit et plan (phase 1)

24 novembre 2026. Ce document répond à la phase 1 du mandat : rien n'a été modifié sur le site. Les décisions marquées **À décider** attendent votre accord avant la phase 2.

## 1. Ce que je propose, en bref

- Un module autonome à `/entrainement/`, écrit comme le reste du site : HTML, CSS et JavaScript sans cadriciel, sans étape de compilation, avec les mêmes règles de sécurité.
- Un moteur de jeu qui ignore la médecine : il lit des cartes JSON (diagnostic, énoncé, réponse, explication, données chiffrées, références) et ne sait rien du MSK. Ajouter la cardiologie, ce sera ajouter des fichiers JSON.
- La banque de départ vient de votre document « Base de données pour FlashCards Morand MSK », converti automatiquement. Aucune valeur n'est inventée : un LR, une Se ou une Sp n'apparaît que s'il est écrit dans la source, avec sa référence.
- Records, statistiques, favoris et révision des erreurs dans le navigateur d'abord (comme les patients de MSK Morand). Classements publics plus tard, avec Supabase, quand le prototype local sera stable.
- Rien n'est publié sur morand.org sans votre accord explicite.

## 2. Audit du site actuel

| Élément | Constat |
|---|---|
| Hébergement | GitHub Pages, domaine `www.morand.org`. Publication par fusion vers `main` (PR depuis la branche de travail). |
| Technologie | Site statique : HTML, CSS et JavaScript « vanille ». Aucun cadriciel, aucune compilation, aucun serveur. |
| Organisation | Un dossier par outil : `/wealth/`, `/guides/`, `/map/`, `/crds/`, `/codes/`, `/locomoteur/`. Chacun a sa page, sa feuille de style, son script et ses données (JSON ou JS). Ressources communes dans `/morand/`. |
| Navigation | En-tête commun (`cr-tete`) avec les onglets Wealth, Guide, Map, CRDS, Codes, MSK. Accueil « Six outils » à sceaux numérotés I à VI (grille 3 × 2 sur ordinateur). |
| Typographie | Newsreader (titres, à empattement) et Inter (texte), hébergées sur le site. |
| Couleurs | Ivoire, encre et or, avec un thème sombre automatique sur toutes les pages. |
| Sécurité | Politique de sécurité du contenu (CSP) stricte : aucun script ni style en ligne, aucune ressource externe (polices, scripts, API). |
| Données | Fichiers statiques. Persistance locale seulement (`localStorage`). Aucune base de données ni connexion. |
| Hors ligne | `sw.js` met en cache l'accueil, CRDS et Codes. Les autres sections passent directement par le réseau. |
| Référencement | `sitemap.xml`, balises description, `manifest.webmanifest` (raccourcis d'application). |
| Outils internes | Générateurs Node et Python dans `outils/`. Tests Playwright dans `tests/site.test.mjs` (navigation, accueil, chaque outil, thème sombre, débordements sur téléphone). |

**Ce que cela implique pour le module.** Un classement officiel exige un serveur qui recalcule les scores, ce que GitHub Pages ne fournit pas : il faudra Supabase (ou l'équivalent) et une exception dans la CSP pour son adresse. Les polices de la maquette (Playfair Display, JetBrains Mono) ne peuvent pas être chargées depuis Google : il faut les héberger sur le site ou utiliser celles du site.

## 3. La banque de questions (votre document)

| Lot | Région | Diagnostics | Puces ↑ ↓ ↔ | Références citées |
|---|---|---|---|---|
| 1 | Rachis cervical | 1 à 17 | 123 | 112 |
| 2 | Rachis lombaire | 18 à 33 | 134 | 108 |
| 3 | Épaule | 34 à 50 | 147 | 138 |
| 4 | Coude | 51 à 69 | 158 | 162 |
| 5 | Poignet et main | 70 à 98 | 213 | 232 |
| 6 | Hanche | 99 à 119 | 166 | 192 |
| 7 | Genou | 120 à 142 | 174 | 207 |
| 8 | Cheville | 143 à 164 | 194 | 235 |
| 9 | Pied | 165 à 186 | 178 | 204 |
| **Total** | | **186** | **≈ 1 490 puces, ≈ 1 700 cartes** | **≈ 1 590** |

- Certaines puces donnent deux cartes (« ↔ présente : LR+ 1,5 ; ↓ absente : LR− 0,33 »).
- Environ 1 190 puces sont chiffrées (LR, Se, Sp, OR, κ, %), dont environ 430 avec un LR explicite.
- Les références portent presque toutes un DOI : elles sont consultables.
- La numérotation des diagnostics (1 à 186) est la même que celle des fiches résumées et des fiches d'infiltration : chaque carte pourra renvoyer à la fiche de MSK Morand.
- Chaque lot finit par « Limites à garder en tête pour les flashcards » : chiffres non confirmés (ex. Cook 2010 pour la myélopathie), règles non validées, biais de spectre, données pronostiques. Ces puces ne deviennent pas des cartes, ou seulement en « expérimentale ».

### Conversion proposée

Un script (`outils/entrainement/convertir-base.py`) transforme le document en JSON, puis un validateur vérifie chaque carte. Exemple tiré du lot 1 :

```json
{
  "id": "MSK-0031",
  "domaine": "MSK",
  "region": "Rachis cervical",
  "diagnostic": { "no": 3, "nom": "Syndrome facettaire cervical" },
  "type": "Examen physique",
  "enonce": "Palpation segmentaire non douloureuse",
  "contexte": "Cervicalgie chronique",
  "reponse": "decrease",
  "explication": "Une palpation segmentaire indolore rend le syndrome facettaire peu probable.",
  "donnee": { "nature": "LR", "lr_negatif": 0.08, "lr_positif": null, "sensibilite": null, "specificite": null, "calcule": false },
  "references": [{ "court": "Schneider 2014", "doi": "…" }],
  "difficulte": 2,
  "statut": "en_revision",
  "valide_le": null,
  "source": "Base FlashCards MSK, lot 1, puce 3.4"
}
```

Règles du validateur :

- `reponse` vaut `increase`, `neutral` ou `decrease`, et suit la flèche de la source.
- Une valeur chiffrée n'existe que si elle est écrite telle quelle dans la puce. Un LR « calculé » (dérivé de Se et Sp par la source) est marqué comme tel.
- La **nature de la donnée** est toujours indiquée : LR, Se/Sp, OR (association), prévalence, consensus. Une association (OR) n'est jamais présentée comme un LR.
- « Neutre » seulement quand la source dit que l'élément ne change pas la probabilité (↔ : LR proche de 1, ou donnée non discriminante). Jamais pour une donnée absente.
- Toute carte a au moins une référence.
- Le type d'élément (anamnèse, examen, test, imagerie, laboratoire, drapeau rouge, évolution, réponse au traitement, facteur de risque, démographie) est proposé par mots clés, puis relu.

Trois statuts : **validée** (relue par vous, datée), **en révision** (convertie, pas encore relue) et **expérimentale** (donnée fragile signalée dans les « Limites »).

## 4. Le jeu

**Écran de partie (téléphone d'abord).** La carte occupe le centre : diagnostic ciblé, énoncé, puis trois gros boutons au pouce : ↑ Augmente (vert), ↔ Neutre (gris sauge), ↓ Diminue (rouge). En haut : progression, chrono, score et série. Touches 1, 2 et 3 au clavier, Entrée pour continuer.

**Rétroaction.** Verte ou rouge, immédiate, avec la bonne réponse, une phrase d'explication et, s'il y en a, LR+, LR−, Se et Sp. Passage automatique : environ 1 s après une bonne réponse et 2 s après une erreur, le temps de lire la bonne réponse. En entraînement libre, on avance soi-même, avec l'explication complète et les références.

**Modes.**

| Mode | Fonctionnement |
|---|---|
| Contre-la-montre | 30, 60 ou 120 s ; enchaînement automatique ; temps restant toujours visible. |
| Série parfaite | La première erreur termine la partie ; animation au nouveau record. |
| Entraînement libre | Sans limite de temps ; explication et références ; favoris ; revoir les ratées. |
| Défi quotidien | 10 cartes, les mêmes pour tous (tirage déterminé par la date, sans serveur) ; une seule tentative comptée. Le classement du jour attend Supabase. |
| Révision des erreurs | Seulement les cartes manquées (proposé par la maquette, en plus des quatre modes du mandat). |

**Points (paramétrables dans un seul objet de configuration).** Bonne réponse +100. Réponse en moins de 2 s +25. 5 bonnes de suite +50. 10 de suite +100. Erreur 0. Aucune pénalité de lenteur.

**Résultats.** Score, réussite (%), bonnes réponses, temps moyen, meilleure série, comparaison au record, puis trois boutons : Rejouer, Revoir les erreurs, Changer de mode. Les références détaillées se consultent ici, pas pendant la partie chronométrée.

**Interruption.** Si l'onglet est quitté pendant une partie chronométrée, le chrono s'arrête et la partie reprend au retour. Une partie abandonnée ne compte pas pour les records.

**Révision adaptative (simple au départ).** Système de Leitner à 5 boîtes par carte : une erreur ramène en boîte 1, une bonne réponse fait monter. Le tirage favorise les boîtes basses et les cartes difficiles, et espace les cartes maîtrisées. On pourra passer plus tard à une vraie répétition espacée (SM-2) sans changer le format des données. « Mes questions difficiles » liste les cartes ratées au moins deux fois ou restées en boîte 1.

**Statistiques.** Réussite par région, par diagnostic, par type d'élément et par difficulté. Niveaux indicatifs (Débutant, Intermédiaire, Avancé, Expert) selon la réussite sur les 200 dernières réponses et le volume. Ce n'est pas une certification. L'historique local est plafonné (2 000 réponses) pour ne pas saturer le navigateur.

## 5. Classements (plus tard, avec Supabase)

- Un navigateur ne peut pas déclarer un score officiel. Le client envoie la suite des réponses (carte, choix, horodatage). Une fonction serveur recalcule le score avec les mêmes règles et rejette ce qui est impossible (temps trop courts, durée dépassée, cartes hors tirage).
- Pour le défi quotidien, le serveur fournit les 10 cartes du jour et note l'heure de départ : une tentative par personne et par jour.
- Pseudonyme public facultatif, possibilité de rester anonyme, aucune connexion obligatoire pour jouer. Protection contre les envois automatisés : limite de fréquence et vérification par le serveur.
- Il vous faudra créer un projet Supabase et me donner son adresse et sa clé publique. L'adresse sera ajoutée à la CSP de `/entrainement/` seulement. La page Confidentialité devra être mise à jour (Loi 25) avant l'ouverture des classements.
- D'ici là, la section « Classements » montre vos records personnels.

## 6. Architecture du module

```
entrainement/
  index.html            accueil, modes, partie et résultats (un seul écran, sans rechargement)
  entrainement.css      style 4B adapté au site, thème sombre compris
  jeu.js                moteur : tirage, chrono, points, séries (aucune notion médicale)
  ecrans.js             affichage et interactions (clavier, pouce, accessibilité)
  stockage.js           records, historique, boîtes de Leitner, favoris (localStorage, puis Supabase)
  banque/index.json     liste des paquets (domaine, région, nombre de cartes, version)
  banque/msk-cervical.json, msk-lombaire.json, …   une région par fichier, chargée à la demande
outils/entrainement/
  convertir-base.py     document → cartes JSON
  valider-banque.mjs    vérifications de la section 3
  plan-phase-1.md       ce document
```

`stockage.js` expose la même interface en local et en ligne : passer à Supabase ne touchera ni au moteur ni aux écrans.

## 7. Fichiers touchés

- **Créés** : le dossier `entrainement/`, le dossier `outils/entrainement/` et un scénario `entrainement` dans `tests/site.test.mjs`.
- **Modifiés seulement à la mise en ligne, avec votre accord** :
  - `index.html` (accueil) et `morand/accueil.css` ;
  - les en-têtes des autres outils (onglet) ;
  - `sitemap.xml`, `manifest.webmanifest` (raccourci) ;
  - plus tard `confidentialite/` (Supabase).
- **Non touchés** : MSK Morand, CRDS, Codes, Guide, Map, Wealth et `sw.js`. Le module n'est pas mis en cache hors ligne au départ.

## 8. Risques de régression

| Risque | Parade |
|---|---|
| L'accueil est conçu pour six outils (grille 3 × 2, texte « Six outils », tests). | Selon votre choix : 7e outil (grille revue), ou accès depuis MSK Morand. Tests mis à jour. |
| Ouverture de la CSP pour Supabase. | Exception limitée à `/entrainement/` et à une seule adresse. |
| Données générées avec l'aide d'une IA (OpenEvidence) présentées comme établies. | Statuts, mention « en révision » visible, modes classés réservés aux cartes validées. |
| Stockage local plein ou effacé. | Historique plafonné ; erreurs de stockage sans effet sur le jeu. |
| Erreur de chrono ou de points. | Tests automatisés du moteur : chrono, points, séries, passage automatique, interruption. |

## 9. Étapes suivantes

1. **Phase 2, prototype** : accueil, modes, partie, résultats, records locaux, avec environ 30 cartes de démonstration du lot 1 que vous aurez validées. Vous recevez des captures et un aperçu.
2. **Phase 3, banque** : conversion des 9 lots, liste de relecture par lot, validation progressive.
3. **Phase 4** : statistiques, révision adaptative, favoris, historique, défi quotidien local.
4. **Phase 5** : tests complets, puis mise en ligne seulement avec votre accord. Supabase vient ensuite.

## 10. Décisions à prendre

1. **Aperçu pendant le développement** : page cachée sur morand.org (non listée, non indexée), ou rien en ligne (captures et fichier à ouvrir).
2. **Polices** : celles du site (Newsreader et Inter, plus une police à chasse fixe du système), ou celles de la maquette (Playfair Display et JetBrains Mono, hébergées sur le site, environ 150 Ko de plus).
3. **Validation des cartes** : relecture par lots à partir d'une liste, ou validation au fil du jeu (bouton « valider » visible pour vous seulement).
4. **Place sur l'accueil** : 7e outil « Entraînement » (l'accueil devient « Sept outils »), ou accès depuis MSK Morand au départ.
5. **Petites adaptations de la maquette 4B**, à confirmer :
   - un thème sombre (la maquette n'en a pas, le reste du site oui) ;
   - les durées 30, 60 et 120 s du mandat, au lieu de « 50 questions » ;
   - un cinquième mode, Défi quotidien ;
   - l'en-tête commun de Morand.org au lieu de la barre de la maquette.
