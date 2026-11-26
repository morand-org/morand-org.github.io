# Révision des fiches patients par OpenEvidence : ce qui a été retenu

26 novembre 2026. Sept régions reçues : cervical, coude, poignet et main, lombaire, hanche, cheville et pied. Épaule et genou : pas encore reçus.

## Les règles appliquées (consigne du Dr Morand)

- **Retenu :**
  - signes d'alarme, avec leur classement entre « Consultez rapidement » et « Revoyez votre médecin si » ;
  - erreurs de fait et incohérences (version plus facile, vouvoiement, matériel, doublons) ;
  - conseils pratiques clairs (ex. « Ne mettez pas de poids sur la jambe en attendant »).
- **Écarté :**
  - les nuances ajoutées seulement parce qu'aucune étude ne le prouve (« aide » devenu « peut aider ») : le consensus d'experts suffit ;
  - les statistiques dans le texte du patient (« environ 4 personnes sur 10 ») ;
  - le délai d'une heure : la règle de douleur reste « le lendemain matin ».
- **Références :** le format court de la fiche est gardé ; le PMID ou le DOI est complété quand OpenEvidence l'a trouvé.
- **Signes « dans les prochains jours » :** ils passent dans « Revoyez votre médecin si », précédés de « Dans les prochains jours : ».

## En chiffres

| Région | Fiches révisées | Changements retenus | Écartés | Fiches sans réponse |
|---|---|---|---|---|
| Rachis cervical | 12 | 64 | 4 | — |
| Coude | 12 | 82 | 5 | — |
| Poignet et main | 17 | 105 | 13 | — |
| Rachis lombaire | 12 | 89 | 7 | — |
| Hanche et bassin | 11 | 61 | 4 | HAN-12, HAN-13, HAN-14, HAN-15 |
| Cheville et jambe | 15 | 91 | 9 | — |
| Pied | 12 | 85 | 9 | PIE-13, PIE-14 |
| **Total** | **91** | **577** | **51** | |

Parmi les changements écartés, 17 l'ont été à ma relecture, selon la même règle (nuances par manque d'études, statistiques). Ils sont notés « décision manuelle » dans les journaux.

## Mise en page

- Les 129 fiches tiennent toujours sur une feuille recto verso, avec un texte de 9 points ou plus.
- 15 fiches, très remplies après la révision, ont un interligne un peu plus serré : CER-06, COU-01, COU-03, COU-12, MAI-01, LOM-01, LOM-05, LOM-06, LOM-10, LOM-12, HAN-01, CHE-01, CHE-03, CHE-06, PIE-01.

## Corrections faites dans toutes les régions

Ces défauts, relevés par OpenEvidence dans quelques fiches, ont été corrigés partout :

- 25 « versions plus faciles » qui répétaient la position de départ (« Faites-le assis » alors qu'on l'est déjà) ;
- le matériel « poids léger », détecté à tort dans des phrases comme « le poids réparti » ;
- le texte « Soulager la douleur » des nerfs du rachis, qui était aussi dans les fiches de nerfs de la main, du coude et du pied ;
- « à la dose prévue pour son poids » dans les fiches d'enfants, devenu « à la dose qui convient à l'âge et au poids ».

## À renvoyer à OpenEvidence (réponses coupées)

- **Pied :** fin de PIE-12 (Iselin), PIE-13 (Sever, rangée aussi en cheville) et PIE-14 (contusion du pied).
- **Hanche :** fin de HAN-11 (signes « Revoyez votre médecin si »), puis HAN-12 à HAN-15.
- **Épaule** (EPA-01 à 14) et **genou** (GEN-01 à 18) : pas encore reçus.

## Où trouver tout cela

- **Réponses d'OpenEvidence, telles que reçues :** `revision/reponses/`.
- **Journal de chaque région**, avec chaque changement retenu ou écarté et la raison : `revision/integration/<région>.md`.
- **Corrections appliquées :** `revues/<région>.json`.
- **Décisions manuelles :** `revision/decisions-revues.json`.
- **Outil :** `integrer-revues.py`. Il se relance à chaque nouvelle réponse.
- **Fiches PDF (hors du site) :** `v2/`, et toutes les fiches en un fichier : `v2/fiches-patients-v2-toutes.pdf`.
