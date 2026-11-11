# Morand

Site statique des outils du médecin de famille, servi par GitHub Pages à www.morand.org.

| Adresse | Contenu | Source |
|---|---|---|
| `/` | Page couverture, installable, hors ligne | ce dépôt (`index.html`, `morand/`, `sw.js`) |
| `/confidentialite/` | Confidentialité et avertissements | ce dépôt |
| `/wealth/` | Wealth Morand | dépôt `wealth` de la même organisation (GitHub Pages de projet) |
| `/guides/` | Guide Morand : catalogue de guides cliniques | copie construite depuis Trouve ta clinique |
| `/map/` | Map Morand : carte interactive de la Montérégie | copie construite depuis Trouve ta clinique |

## Mettre à jour la carte et les guides

```
git clone --depth 1 https://github.com/TrouveTaClinique/trouvetaclinique.github.io ../ttc
node outils/construire.mjs ../ttc [fichier de motifs personnels, hors dépôt]
```

La copie est fidèle, sauf : aucune mesure d'audience ; recherche assistée des guides masquée tant que
son adresse sous morand.org n'est pas fixée (`ADRESSE_IA` dans `outils/construire.mjs`) ; liens vers les
autres pages de Trouve ta clinique dirigés vers le site d'origine ; commentaires HTML retirés.

## Règles

- Aucun script d'une autre entreprise sur tout le site : sous une même adresse, il pourrait lire les
  données de Wealth Morand.
- Chaque section a son service worker et ne supprime que ses propres caches
  (`morand-accueil-`, `wealthmorand-`, `ttc-guides-`).
- Aucun nom de personne, courriel ou identifiant dans les fichiers.
