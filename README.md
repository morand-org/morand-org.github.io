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
