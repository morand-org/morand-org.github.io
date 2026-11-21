# Morand

Site statique des outils du médecin de famille, servi par GitHub Pages à www.morand.org.

| Adresse | Contenu | Source |
|---|---|---|
| `/` | Page couverture, installable, hors ligne | ce dépôt (`index.html`, `morand/`, `sw.js`) |
| `/confidentialite/` | Confidentialité et avertissements | ce dépôt |
| `/wealth/` | Wealth Morand | dépôt `wealth` de la même organisation (GitHub Pages de projet) |
| `/guides/` | Guide Morand : catalogue de guides cliniques | copie construite depuis Trouve ta clinique |
| `/map/` | Map Morand : carte interactive de la Montérégie | copie construite depuis Trouve ta clinique |
| `/crds/` | CRDS Morand : priorité, critères et prérequis des formulaires de l'APSS (`crds/crds_data.json`, recherche instantanée) | écrit ici : un fichier par formulaire dans `outils/crds/formulaires/` (transcrit et vérifié contre le PDF du MSSS), assemblé par `node outils/crds/construire-crds.mjs` |
| `/codes/` | Codes Morand : codes d'actes, CNESST, codes de vulnérabilité | `outils/construire-codes.mjs`, depuis le dépôt de Wealth |

## Mettre à jour la carte et les guides

```
git clone --depth 1 https://github.com/TrouveTaClinique/trouvetaclinique.github.io ../ttc
node outils/construire.mjs ../ttc [fichier de motifs personnels, hors dépôt]
```

La copie est fidèle, sauf : aucune mesure d'audience ; recherche assistée des guides masquée tant que
son adresse sous morand.org n'est pas fixée (`ADRESSE_IA` dans `outils/construire.mjs`) ; liens vers les
autres pages de Trouve ta clinique dirigés vers le site d'origine ; commentaires HTML retirés.

**Ajouts propres à Guide Morand** : les ressources de `outils/guides-ajouts.mjs` (même forme que
`guides/donnees.json`) sont ajoutées au catalogue à chaque construction : fiche dans son sujet, après sa
voisine (`apres`), en tête de « Récemment ajoutés », nombres mis à jour. Une ressource que le catalogue
d'origine contient déjà (même adresse) n'est pas ajoutée deux fois.

## Accueil clinique de l'Hôpital Pierre-Boucher (CRDS Morand)

Les 14 protocoles et les modalités d'accès viennent d'un relevé du portail de l'accueil clinique, fait par un
médecin connecté. Le relevé (JSON) reste hors du dépôt ; il contient aussi des fiches de services de 2015 qui ne
sont pas publiées.

```
node outils/crds/importer-accueil-pb.mjs <relevé.json>   # fabrique outils/crds/accueil-pierre-boucher.mjs
node outils/crds/construire-crds.mjs                      # refait crds/crds_data.json
```

Chaque ligne publiée est une ligne du relevé, choisie par son rang et recopiée telle quelle. Le portail coupe le
texte après le signe « < » : ces lignes ne sont jamais publiées, et la version de l'ordonnance les remplace quand
elle existe. Quand le portail et l'ordonnance diffèrent, les deux versions sont affichées et nommées.

## Codes Morand

Les codes viennent du dépôt de Wealth Morand, qui reste la source et vérifie leurs montants dans ses tests
(`js/repertoire.js`, `js/calc.js` pour la CNESST, `js/catalogues.js` pour les codes de vulnérabilité) :

```
node outils/construire-codes.mjs ../wealth    # refait codes/codes_data.json
```

Les tarifs en cabinet et le détail de chaque code (avis, règles, éléments de contexte, codes liés, lien vers la
section) viennent du Manuel des médecins omnipraticiens de la RAMQ (rémunération à l'acte), enregistré en .mht :

```
python3 outils/codes/extraire-manuel.py <manuel.mht> <date de consultation AAAA-MM-JJ>   # refait outils/codes/manuel-ramq.json
node outils/construire-codes.mjs ../wealth
```

Le texte est recopié sans reformulation. La construction s'arrête si un tarif en établissement du manuel diffère de
celui de Wealth. Les forfaits et suppléments de la Brochure no 1 prennent leur montant en cabinet dans le moteur de
Wealth (`MONTANTS_LIEU`). Un tarif en cabinet introuvable reste « à confirmer ». Les réglages de la page (mode : à
l'acte, en cabinet ; mixte ou horaire, en établissement ; palier de 500 inscrits) restent dans le stockage de l'appareil
(`morand.codes.reglages`). Au taux horaire, `h` vaut le montant payé en plus des heures (EP 40 : forfait de
responsabilité et suppléments d'examen ; forfaits payés dans tous les modes ; CNESST), « compris » pour les visites et
les interventions, ou null (à confirmer) : mêmes règles que le moteur de Wealth.

Wealth n'affiche plus ces codes : son en-tête mène ici. L'affichage (montants, part au mixte, « Compris », code 14
fermé, source et limite des codes de vulnérabilité) se vérifie donc dans le scénario `codes` de `tests/site.test.mjs`.

## Locomoteur Morand (prototype caché)

`/locomoteur/genou/` : aide à la décision pour la douleur au genou (12 ans et plus). Le clinicien coche l'anamnèse et
l'examen pendant la visite ; la page calcule le diagnostic différentiel, affiche les alertes (Ottawa, drapeaux rouges), la
conduite, et rédige une note en texte brut à coller au dossier. Rien n'est transmis ni conservé. Page non indexée, absente
du plan du site et de l'accueil.

- `locomoteur/moteur.js` : moteur commun à toutes les articulations (probabilité de départ selon l'âge exact et le sexe,
  rapports de vraisemblance, groupes de tests qui se recoupent, concurrence entre diagnostics, règles, note, consignes).
- `locomoteur/genou/donnees-genou.js` : questions, diagnostics, poids, règles et conduite du genou. Une autre articulation
  = un autre fichier de données et une page `locomoteur/<articulation>/index.html`.
- `locomoteur/interface.js`, `locomoteur/locomoteur.css` : l'interface.

**Aucun poids n'est validé.** Chaque poids a un statut : `provisoire` (estimation clinique), `a_verifier` (valeur publiée
citée de mémoire, avec une piste), `verifie` (confirmé dans l'article), `valide` (approuvé par le clinicien). Pour valider un
diagnostic : section « Sources et validation » de la page, « Copier la consigne OpenEvidence », la coller dans Claude in
Chrome avec OpenEvidence ouvert ; le tableau rendu garde la clé de chaque poids (`question>diagnostic`), ce qui permet de
reporter chaque chiffre dans le fichier de données après vérification dans l'article.

Le scénario `locomoteur` de `tests/site.test.mjs` vérifie un cas complet (adolescente, syndrome fémoro-patellaire).

## Recherche de l'accueil

`morand/recherche.js` cherche dans les données déjà publiées des outils (`guides/donnees.json`,
`crds/crds_data.json`, `codes/codes_data.json`, `map/data.json`), chargées au premier usage du champ. Rien n'est
transmis. Dans CRDS Morand, les favoris et les recherches récentes restent dans le stockage de l'appareil
(`morand.crds.favoris`, `morand.crds.recents`).

## Tests

```
node tests/site.test.mjs                      # tout (Chromium, par Playwright)
SCENARIOS=crds,codes node tests/site.test.mjs
```

Le test sert le dépôt lui-même et bloque les autres sites. Scénarios : `pages`, `navigation`, `motsColles`,
`accueil`, `crds`, `codes`, `guide`, `sombre`, `fichiers`. À lancer avant chaque publication ; une correction
ajoute la vérification qui aurait échoué avant.

## Référencement

- `robots.txt` permet tout et annonce `sitemap.xml`. Le plan du site se refait avec
  `node outils/plan-du-site.mjs ../wealth` (date du dernier commit de chaque page). La carte (`/map/`) n'y
  est pas : son adresse canonique reste celle de Trouve ta clinique.
- Chaque page référencée a son adresse canonique sous `https://www.morand.org`, une description, un
  aperçu de partage 1200 × 630 (`morand/og-*.png`, `/wealth/og-wealth.png`) et des données structurées.
  Pour le Guide, `seoGuide()` de `outils/construire.mjs` les pose à chaque construction.

## Règles

- Aucun script d'une autre entreprise sur tout le site : sous une même adresse, il pourrait lire les
  données de Wealth Morand.
- Chaque section a son service worker et ne supprime que ses propres caches
  (`morand-accueil-`, `wealthmorand-`, `ttc-guides-`).
- Aucun nom de personne, courriel ou identifiant dans les fichiers.
