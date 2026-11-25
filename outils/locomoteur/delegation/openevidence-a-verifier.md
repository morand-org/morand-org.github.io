# Ce qu'OpenEvidence doit vérifier

Produit par `node outils/locomoteur/a-verifier-openevidence.mjs` à partir des fichiers de données. Ne pas modifier à la main.

**Comment faire.** Coller chaque bloc tel quel dans OpenEvidence, un bloc par question, puis me renvoyer les réponses (le tableau et ses références). Les codes (ex. `CERV-P12`) me permettent de remettre chaque chiffre au bon endroit et de le marquer « vérifié » avec sa source.

**Ordre suggéré.** 1) Fréquences de départ de chaque région (elles fixent le point de départ de tous les calculs). 2) Poids « à vérifier » et combinaisons non vérifiées. 3) Poids provisoires forts (rapport de vraisemblance de 5 ou plus, ou de 0,2 ou moins) : ce sont ceux qui déplacent le plus les probabilités. Les poids du contexte (côté, durée, mode d'apparition, mécanisme) ne sont pas soumis : ils traduisent la définition du diagnostic (une fracture aiguë ne dure pas depuis trois mois), pas une donnée publiée.

Les valeurs actuelles sont données à OpenEvidence pour qu'il les confirme ou les corrige ; une réponse « no data » est utile aussi (le poids reste provisoire et prudent).

| Région | Consignes | Fréquences | À vérifier | Forts provisoires |
|---|---|---|---|---|
| Cervicalgie ou douleur cervico-brachiale | 0 | réponse reçue (2026-11-24) | 0 | 0 |
| Douleur à l'épaule | 1 | réponse reçue (2026-11-24) | 5 | 0 |
| Douleur au coude | 1 | réponse reçue (2026-11-24) | 0 | 3 |
| Douleur au poignet ou à la main | 1 | réponse reçue (2026-11-24) | 3 | 0 |
| Lombalgie, avec ou sans irradiation | 2 | réponse reçue (2026-11-24) | 3 | 2 |
| Douleur à la hanche ou à l'aine | 1 | réponse reçue (2026-11-24) | 3 | 0 |
| Douleur au genou | 1 | réponse reçue (2026-11-24) | 3 | 0 |
| Douleur à la cheville ou à la jambe | 1 | réponse reçue (2026-11-24) | 2 | 0 |
| Douleur au pied | 0 | réponse reçue (2026-11-24) | 0 | 0 |

## Cervicalgie ou douleur cervico-brachiale (CERV)

## Douleur à l'épaule (EPAU)

### EPAU 1. Poids à vérifier et combinaisons (5 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for shoulder pain; the French wording is kept in quotes.

Target diagnosis: polymyalgia rheumatica
EPAU-P30. Cluster « Critères EULAR/ACR 2012 : score de 4 ou plus » — current LR+ 5 (Macchioni et coll., 2014, Ann Rheum Dis (validation) : Se 92,6 %, Sp 81,5 %, RV+ 5,0 (base FlashCards))
EPAU-P31. Cluster « Critères EULAR/ACR 2012 : score de moins de 4 » — current LR− 0.09 (Macchioni et coll., 2014, Ann Rheum Dis (validation) : RV− 0,09 (base FlashCards))

Target diagnosis: long head of biceps tendinopathy or rupture
EPAU-P29. « Upper cut test (Uppercut) » — current LR+ 3.38, LR− 0.26

Target diagnosis: posterior or multidirectional shoulder instability
EPAU-P32. « Jerk test » — current Se 73%, Sp 98%, LR+ 36.5, LR− 0.28
EPAU-P33. « Kim test » — current Se 80%, Sp 94%, LR+ 13.33, LR− 0.21

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

### POIG 1. Poids à vérifier et combinaisons (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for wrist or hand pain; the French wording is kept in quotes.

Target diagnosis: other wrist tenosynovitis (extensor carpi ulnaris, intersection syndrome)
POIG-P43. « ECU synergy test (Synergie de l'extenseur ulnaire du carpe) » — current Se 74%, Sp 86%, LR+ 5.15, LR− 0.31

Target diagnosis: thumb carpometacarpal osteoarthritis
POIG-P44. « Extension du 1er métacarpien (pouce) » — current Se 94%, Sp 95%, LR+ 18.8, LR− 0.06
POIG-P45. « Adduction du 1er métacarpien (pouce) » — current Se 94%, Sp 93%, LR+ 13.43, LR− 0.06

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Lombalgie, avec ou sans irradiation (LOMB)

### LOMB 1. Poids à vérifier et combinaisons (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for low back pain; the French wording is kept in quotes.

Target diagnosis: pregnancy-related low back and pelvic girdle pain
LOMB-P8. « Symphyse pubienne douloureuse (grossesse) » — current Se 81%, Sp 99%, LR+ 81, LR− 0.19
LOMB-P9. « Trendelenburg modifié (grossesse) » — current Se 60%, Sp 97%, LR+ 20, LR− 0.41

Target diagnosis: adult degenerative scoliosis
LOMB-P7. « Adams forward bend test » — current Se 84%, Sp 95%, LR+ 17.58, LR− 0.16

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### LOMB 2. Poids provisoires forts (2 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for low back pain; the French wording is kept in quotes.

Target diagnosis: pregnancy-related low back and pelvic girdle pain
LOMB-P5. « Grossesse en cours ou accouchement récent » — current LR+ 200, LR− 0.01

Target diagnosis: lumbar disc herniation with radiculopathy
LOMB-P6. « Où est la douleur : Irradie sous le genou, jusqu'au pied » — current LR+ 6, LR− 0.2

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur à la hanche ou à l'aine (HANC)

### HANC 1. Poids à vérifier et combinaisons (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for hip and groin pain; the French wording is kept in quotes.

Target diagnosis: iliopsoas-related groin pain or snapping hip
HANC-P28. « HEC test (ilio-psoas) » — current Se 94%, Sp 88%, LR+ 7.83, LR− 0.07

Target diagnosis: deep gluteal (piriformis) syndrome
HANC-P29. Cluster « Test actif du piriforme et étirement assis tous deux négatifs » — current LR− 0.11 (Martin et coll., 2014, Knee Surg Sports Traumatol Arthrosc : les deux tests négatifs, Se 91 %, RV− 0,11 (base FlashCards))

Target diagnosis: meralgia paresthetica
HANC-P30. « Compression pelvienne (Nouraei) : symptômes soulagés » — current Se 95%, Sp 93%, LR+ 14.18, LR− 0.05

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur au genou (GENO)

### GENO 1. Poids à vérifier et combinaisons (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for knee pain; the French wording is kept in quotes.

Target diagnosis: patellofemoral pain syndrome
GENO-P26. « Inclinaison de la rotule (tilt) réduite » — current LR+ 5.4, LR− NaN

Target diagnosis: posterior cruciate ligament tear
GENO-P27. « Quadriceps active test » — current Se 54%, Sp 97%, LR+ 18, LR− 0.47

Target diagnosis: lateral patellar instability or dislocation
GENO-P28. « Appréhension dynamique inversée » — current Se 94%, Sp 88%, LR+ 7.94, LR− 0.07

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur à la cheville ou à la jambe (CHEV)

### CHEV 1. Poids à vérifier et combinaisons (2 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for ankle pain; the French wording is kept in quotes.

Target diagnosis: chronic ankle instability
CHEV-P29. « Score CAIT (Cumberland Ankle Instability Tool, sur 30) (positif : 25 ou moins) » — current Se 97%, Sp 87%, LR+ 7.32, LR− 0.04

Target diagnosis: anterior or posterior ankle impingement
CHEV-P30. « Conflit antérolatéral : au moins 5 des 6 signes de Liu » — current Se 94%, Sp 75%, LR+ 3.76, LR− 0.08

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur au pied (PIED)
