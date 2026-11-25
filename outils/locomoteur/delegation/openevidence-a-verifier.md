# Ce qu'OpenEvidence doit vérifier

Produit par `node outils/locomoteur/a-verifier-openevidence.mjs` à partir des fichiers de données. Ne pas modifier à la main.

**Comment faire.** Coller chaque bloc tel quel dans OpenEvidence, un bloc par question, puis me renvoyer les réponses (le tableau et ses références). Les codes (ex. `CERV-P12`) me permettent de remettre chaque chiffre au bon endroit et de le marquer « vérifié » avec sa source.

**Ordre suggéré.** 1) Fréquences de départ de chaque région (elles fixent le point de départ de tous les calculs). 2) Poids « à vérifier » et combinaisons non vérifiées. 3) Poids provisoires forts (rapport de vraisemblance de 5 ou plus, ou de 0,2 ou moins) : ce sont ceux qui déplacent le plus les probabilités. Les poids du contexte (côté, durée, mode d'apparition, mécanisme) ne sont pas soumis : ils traduisent la définition du diagnostic (une fracture aiguë ne dure pas depuis trois mois), pas une donnée publiée.

Les valeurs actuelles sont données à OpenEvidence pour qu'il les confirme ou les corrige ; une réponse « no data » est utile aussi (le poids reste provisoire et prudent).

| Région | Consignes | Fréquences | À vérifier | Forts provisoires |
|---|---|---|---|---|
| Cervicalgie ou douleur cervico-brachiale | 0 | réponse reçue (2026-11-24) | 0 | 0 |
| Douleur à l'épaule | 1 | réponse reçue (2026-11-24) | 1 | 0 |
| Douleur au coude | 1 | réponse reçue (2026-11-24) | 0 | 3 |
| Douleur au poignet ou à la main | 0 | réponse reçue (2026-11-24) | 0 | 0 |
| Lombalgie, avec ou sans irradiation | 1 | réponse reçue (2026-11-24) | 0 | 3 |
| Douleur à la hanche ou à l'aine | 0 | réponse reçue (2026-11-24) | 0 | 0 |
| Douleur au genou | 0 | réponse reçue (2026-11-24) | 0 | 0 |
| Douleur à la cheville ou à la jambe | 0 | réponse reçue (2026-11-24) | 0 | 0 |
| Douleur au pied | 0 | réponse reçue (2026-11-24) | 0 | 0 |

## Cervicalgie ou douleur cervico-brachiale (CERV)

## Douleur à l'épaule (EPAU)

### EPAU 1. Poids à vérifier et combinaisons (1 élément)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for shoulder pain; the French wording is kept in quotes.

Target diagnosis: long head of biceps tendinopathy or rupture
EPAU-P29. « Upper cut test (Uppercut) » — current LR+ 3.38, LR− 0.26

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur au coude (COUD)

### COUD 1. Poids provisoires forts (2 sur 2) (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for elbow pain; the French wording is kept in quotes.

Target diagnosis: inflammatory or crystal arthritis of the elbow
COUD-P30. « Tophus » — current LR+ 8, LR− 0.9

Target diagnosis: cervical radiculopathy referred to the elbow
COUD-P31. « Douleur aggravée par les mouvements du cou » — current LR+ 5, LR− 0.5
COUD-P32. « Spurling ou mouvements du cou reproduisant la douleur » — current LR+ 5, LR− 0.4

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur au poignet ou à la main (POIG)

## Lombalgie, avec ou sans irradiation (LOMB)

### LOMB 1. Poids provisoires forts (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for low back pain; the French wording is kept in quotes.

Target diagnosis: pregnancy-related low back and pelvic girdle pain
LOMB-P5. « Grossesse en cours ou accouchement récent » — current LR+ 200, LR− 0.01

Target diagnosis: lumbar disc herniation with radiculopathy
LOMB-P6. « Où est la douleur : Irradie sous le genou, jusqu'au pied » — current LR+ 6, LR− 0.2

Target diagnosis: adult degenerative scoliosis
LOMB-P7. « Scoliose visible ou gibbosité » — current LR+ 5, LR− 0.5

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur à la hanche ou à l'aine (HANC)

## Douleur au genou (GENO)

## Douleur à la cheville ou à la jambe (CHEV)

## Douleur au pied (PIED)
