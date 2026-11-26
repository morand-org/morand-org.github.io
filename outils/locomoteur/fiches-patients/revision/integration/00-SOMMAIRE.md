# Révision des fiches patients par OpenEvidence : ce qui a été retenu

26 novembre 2026. Les neuf régions sont reçues et intégrées, soit les 129 fiches, y compris les parties qui avaient été coupées (PIE-12 à PIE-14, HAN-11 à HAN-15).

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

| Région | Fiches révisées | Changements retenus | Écartés |
|---|---|---|---|
| Rachis cervical | 12 | 64 | 4 |
| Épaule | 14 | 97 | 12 |
| Coude | 12 | 82 | 5 |
| Poignet et main | 17 | 106 | 13 |
| Rachis lombaire | 12 | 89 | 7 |
| Hanche et bassin | 15 | 98 | 6 |
| Genou | 18 | 90 | 8 |
| Cheville et jambe | 15 | 92 | 9 |
| Pied | 14 | 107 | 12 |
| **Total** | **129** | **825** | **76** |

PIE-13 (Sever) renvoie à CHE-08 : rien à changer dans la fiche du pied. Comme OpenEvidence le propose, la règle de douleur de CHE-08 passe à 2 sur 10, comme pour l'Iselin, l'Osgood-Schlatter et le Sinding-Larsen-Johansson.

Parmi les changements écartés, 32 l'ont été à ma relecture, selon la même règle (nuances par manque d'études, statistiques, mention d'études). Ils sont notés « décision manuelle » dans les journaux. Les passages réécrits à la main pour retirer une statistique ou garder une formulation plus simple sont notés « retouche manuelle ».

## Mise en page

- Les 129 fiches tiennent toujours sur une feuille recto verso, avec un texte de 9 points ou plus.
- 18 fiches, très remplies après la révision, ont un interligne un peu plus serré : CER-06, EPA-03, EPA-11, EPA-12, COU-01, COU-03, COU-12, MAI-01, LOM-01, LOM-05, LOM-06, LOM-10, LOM-12, HAN-14, CHE-01, CHE-03, CHE-06, PIE-01.

## Corrections faites dans toutes les régions

Ces défauts, relevés par OpenEvidence dans quelques fiches, ont été corrigés partout :

- 25 « versions plus faciles » qui répétaient la position de départ (« Faites-le assis » alors qu'on l'est déjà) ;
- le matériel « poids léger », détecté à tort dans des phrases comme « le poids réparti » ;
- le texte « Soulager la douleur » des nerfs du rachis, qui était aussi dans les fiches de nerfs de la main, du coude et du pied ;
- « à la dose prévue pour son poids » dans les fiches d'enfants, devenu « à la dose qui convient à l'âge et au poids ».

## Correction de l'outil d'intégration (26 novembre)

Quand OpenEvidence décrivait son changement au lieu de donner le texte (« ajout », « texte nuancé », « deux lignes ci-dessus », « nouveau texte », « Consultez rapidement »), l'outil collait cette description à la fin de la phrase du patient. 45 phrases étaient touchées, dans le cervical, le coude, l'épaule, le genou et la hanche ; c'était le cas dans les PDF déjà envoyés. Par exemple :

- « Genou très enflé, rouge et chaud, avec ou sans fièvre. ajout » ;
- les règles de douleur de GEN-02 à GEN-06 et de GEN-15, suivies de bouts de note ;
- « Fièvre avec douleur au cou. Consultez rapidement ».

Ces descriptions sont maintenant ignorées quand la ligne porte déjà le texte révisé. Une vérification de tout le texte des 129 fiches ne trouve plus aucun reste de note. Deux autres défauts sont corrigés : « 5ᵉ » devenait « 5e », et « Urgence, tout de suite : » restait au début d'un signe.

## À venir

- **Passe finale de simplification** de toutes les fiches, pour un niveau de scolarité faible (peu de statistiques, pas d'études dans le texte du patient) : voir `CORRECTIONS.md`.
- **Cuisse et jambe :** réponses d'OpenEvidence à recevoir pour les nouveaux diagnostics.

## Où trouver tout cela

- **Réponses d'OpenEvidence, telles que reçues :** `revision/reponses/`.
- **Journal de chaque région**, avec chaque changement retenu ou écarté et la raison : `revision/integration/<région>.md`.
- **Corrections appliquées :** `revues/<région>.json`.
- **Décisions manuelles :** `revision/decisions-revues.json`.
- **Outil :** `integrer-revues.py`. Il se relance à chaque nouvelle réponse.
- **Fiches PDF (hors du site) :** `v2/`, et toutes les fiches en un fichier : `v2/fiches-patients-v2-toutes.pdf`.
