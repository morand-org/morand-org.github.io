# Ce qu'OpenEvidence doit vérifier

Produit par `node outils/locomoteur/a-verifier-openevidence.mjs` à partir des fichiers de données. Ne pas modifier à la main.

**Comment faire.** Coller chaque bloc tel quel dans OpenEvidence, un bloc par question, puis me renvoyer les réponses (le tableau et ses références). Les codes (ex. `CERV-P12`) me permettent de remettre chaque chiffre au bon endroit et de le marquer « vérifié » avec sa source.

**Ordre suggéré.** 1) Fréquences de départ de chaque région (elles fixent le point de départ de tous les calculs). 2) Poids « à vérifier » et combinaisons non vérifiées. 3) Poids provisoires forts (rapport de vraisemblance de 5 ou plus, ou de 0,2 ou moins) : ce sont ceux qui déplacent le plus les probabilités. Les poids du contexte (côté, durée, mode d'apparition, mécanisme) ne sont pas soumis : ils traduisent la définition du diagnostic (une fracture aiguë ne dure pas depuis trois mois), pas une donnée publiée.

Les valeurs actuelles sont données à OpenEvidence pour qu'il les confirme ou les corrige ; une réponse « no data » est utile aussi (le poids reste provisoire et prudent).

| Région | Consignes | Fréquences | À vérifier | Forts provisoires |
|---|---|---|---|---|
| Cervicalgie ou douleur cervico-brachiale | 3 | 17 | 13 | 12 |
| Douleur à l'épaule | 3 | 17 | 7 | 21 |
| Douleur au coude | 4 | 17 | 4 | 28 |
| Lombalgie, avec ou sans irradiation | 3 | 16 | 4 | 3 |
| Douleur à la hanche ou à l'aine | 3 | 21 | 9 | 18 |
| Douleur au genou | 3 | 23 | 3 | 22 |
| Douleur à la cheville ou à la jambe | 3 | 21 | 7 | 21 |
| Douleur au pied | 4 | 22 | 4 | 31 |

## Cervicalgie ou douleur cervico-brachiale (CERV)

### CERV 1. Fréquences de départ (17 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for neck pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

CERV-F1. non-specific mechanical neck pain — current estimate: 12 y 45%, 30 y 45%, 50 y 40%, 70 y 35%
CERV-F2. myofascial pain syndrome of the upper trapezius — current estimate: 12 y 5%, 25 y 12%, 45 y 12%, 70 y 6%; women ×1.4, men ×0.7
CERV-F3. cervical facet joint pain — current estimate: 12 y 1%, 30 y 5%, 50 y 10%, 70 y 12%
CERV-F4. cervical spondylosis or degenerative disc disease — current estimate: 12 y 0.2%, 35 y 3%, 50 y 12%, 65 y 20%, 80 y 25%
CERV-F5. whiplash-associated disorder — current estimate: 12 y 4%, 20 y 8%, 40 y 7%, 70 y 4%
CERV-F6. cervicogenic headache — current estimate: 12 y 1%, 30 y 4%, 50 y 4%, 70 y 3%; women ×1.5, men ×0.7
CERV-F7. cervical muscle strain in athletes — current estimate: 12 y 4%, 18 y 6%, 30 y 3%, 50 y 2%
CERV-F8. cervical radiculopathy — current estimate: 12 y 0.3%, 30 y 3%, 50 y 7%, 65 y 5%, 80 y 3%
CERV-F9. stinger or burner (brachial plexus neurapraxia) — current estimate: 12 y 1%, 18 y 3%, 25 y 2%, 35 y 0.5%; men ×3, women ×0.3
CERV-F10. acute acquired torticollis — current estimate: 12 y 4%, 25 y 4%, 50 y 3%, 70 y 2%
CERV-F11. polymyalgia rheumatica — current estimate: 12 y 0.01%, 50 y 0.3%, 65 y 1%, 80 y 2%; women ×1.5, men ×0.7
CERV-F12. degenerative cervical myelopathy — current estimate: 12 y 0.02%, 40 y 0.2%, 55 y 1%, 70 y 2%, 85 y 3%; men ×1.5, women ×0.7
CERV-F13. cervical spine involvement in rheumatoid arthritis (atlantoaxial instability) — current estimate: 12 y 0.05%, 40 y 0.2%, 60 y 0.4%, 80 y 0.4%; women ×2, men ×0.5
CERV-F14. cervical spine fracture (odontoid, fragility) — current estimate: 12 y 0.3%, 40 y 0.3%, 65 y 0.6%, 80 y 2%, 90 y 3%
CERV-F15. thoracic outlet syndrome — current estimate: 12 y 0.3%, 20 y 1%, 35 y 1%, 55 y 0.5%; women ×1.5, men ×0.7
CERV-F16. cervical spondylodiscitis or epidural abscess — current estimate: 12 y 0.01%, 50 y 0.03%, 80 y 0.06%
CERV-F17. occipital neuralgia — current estimate: 12 y 0.2%, 30 y 1%, 50 y 1%, 70 y 0.8%

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### CERV 2. Poids à vérifier et combinaisons (13 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for neck pain; the French wording is kept in quotes.

Target diagnosis: cervical radiculopathy
CERV-P1. « Douleur du bras plus forte que celle du cou » — current LR+ 3, LR− 0.7
CERV-P2. « Rotation vers le côté atteint de moins de 60° » — current LR+ 1.8, LR− 0.23
CERV-P3. « Hypoesthésie dans un dermatome » — current LR+ 1.5, LR− 0.9
CERV-P4. « Spurling test » — current LR+ 4, LR− 0.5
CERV-P5. « Upper limb tension test median nerve (ULTT A (nerf médian)) » — current LR+ 1.3, LR− 0.12
CERV-P6. « Cervical distraction test » — current LR+ 4.4, LR− 0.6
CERV-P7. Cluster « Wainner : 3 sur 4 » — current LR+ 6.1 (Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : Se 39 %, Sp 94 %, RV+ 6,1 (non vérifiable dans l'extrait))

Target diagnosis: degenerative cervical myelopathy
CERV-P8. « Maladresse des mains (boutons, écriture) » — current Se 58%, Sp 92%, LR+ 7.25, LR− 0.46
CERV-P9. « Trouble de la marche ou de l'équilibre » — current Se 58%, Sp 92%, LR+ 7.25, LR− 0.46
CERV-P10. « Trouble urinaire ou fécal nouveau » — current Se 41%, Sp 91%, LR+ 4.56, LR− 0.65
CERV-P11. « Marche en tandem anormale » — current Se 87%, Sp 53%, LR+ 1.85, LR− 0.25

Target diagnosis: thoracic outlet syndrome
CERV-P12. « Pire bras levés au-dessus de la tête » — current LR+ 3, LR− 0.2
CERV-P13. « Engourdissements ou picotements dans le bras ou la main » — current LR+ 2, LR− 0.2

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### CERV 3. Poids provisoires forts (12 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for neck pain; the French wording is kept in quotes.

Target diagnosis: cervicogenic headache
CERV-P14. « Où est la douleur : Tête (occiput, céphalée) » — current LR+ 5, LR− 0.3

Target diagnosis: cervical radiculopathy
CERV-P15. « Où est la douleur : Bras, sous le coude, trajet radiculaire » — current LR+ 6, LR− 0.2

Target diagnosis: stinger or burner (brachial plexus neurapraxia)
CERV-P16. « Brûlure ou engourdissement d'un bras après un contact, quelques minutes » — current LR+ 10, LR− 0.3

Target diagnosis: acute acquired torticollis
CERV-P17. « Attitude vicieuse (tête inclinée et tournée) » — current LR+ 8, LR− 0.3
CERV-P18. Rotation active = « Complète et indolore » — current LR 0.2

Target diagnosis: polymyalgia rheumatica
CERV-P19. « Où est la douleur : Aux deux épaules et aux hanches, avec raideur » — current LR+ 10, LR− 0.3
CERV-P20. Raideur matinale = « 30 minutes ou plus » — current LR 5
CERV-P21. « Raideur matinale des épaules et des hanches » — current LR+ 10, LR− 0.2

Target diagnosis: degenerative cervical myelopathy
CERV-P22. « Babinski » — current LR+ 5, LR− 0.9

Target diagnosis: cervical spine involvement in rheumatoid arthritis (atlantoaxial instability)
CERV-P23. « ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde » — current LR+ 50, LR− 0.1

Target diagnosis: cervical spondylodiscitis or epidural abscess
CERV-P24. « Facteurs de risque d'infection : Drogues injectables » — current LR+ 5, LR− 1

Target diagnosis: occipital neuralgia
CERV-P25. « Nerf grand occipital douloureux » — current LR+ 6, LR− 0.3

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur à l'épaule (EPAU)

### EPAU 1. Fréquences de départ (17 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for shoulder pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

EPAU-F1. subacromial pain or rotator cuff tendinopathy — current estimate: 12 y 8%, 20 y 15%, 35 y 30%, 50 y 35%, 65 y 30%, 80 y 25%
EPAU-F2. non-specific shoulder pain or muscle strain — current estimate: 12 y 25%, 20 y 20%, 35 y 15%, 50 y 10%, 70 y 6%
EPAU-F3. adhesive capsulitis (frozen shoulder) — current estimate: 12 y 0.1%, 35 y 2%, 45 y 8%, 55 y 10%, 65 y 6%, 80 y 3%; women ×1.4, men ×0.7
EPAU-F4. acromioclavicular joint sprain or separation — current estimate: 12 y 4%, 18 y 8%, 30 y 6%, 50 y 3%, 70 y 2%; men ×2, women ×0.5
EPAU-F5. full-thickness rotator cuff tear — current estimate: 12 y 0.2%, 40 y 2%, 55 y 6%, 65 y 12%, 75 y 20%, 85 y 25%
EPAU-F6. scapular dyskinesis — current estimate: 12 y 3%, 20 y 4%, 35 y 3%, 55 y 2%
EPAU-F7. proximal humerus fracture — current estimate: 12 y 1%, 40 y 0.5%, 60 y 2%, 75 y 5%, 90 y 7%; women ×2, men ×0.5
EPAU-F8. clavicle fracture — current estimate: 12 y 6%, 18 y 4%, 30 y 2%, 50 y 1%, 70 y 1%; men ×1.5, women ×0.7
EPAU-F9. glenohumeral osteoarthritis — current estimate: 12 y 0.1%, 45 y 0.5%, 60 y 3%, 75 y 6%, 90 y 8%
EPAU-F10. calcific tendinopathy of the rotator cuff — current estimate: 12 y 0.2%, 30 y 4%, 45 y 6%, 60 y 4%, 80 y 2%; women ×1.3, men ×0.8
EPAU-F11. anterior shoulder dislocation or instability — current estimate: 12 y 3%, 17 y 6%, 25 y 5%, 40 y 2%, 60 y 0.8%; men ×2, women ×0.5
EPAU-F12. acromioclavicular osteoarthritis or distal clavicle osteolysis — current estimate: 12 y 0.2%, 25 y 1%, 45 y 4%, 65 y 4%, 80 y 3%
EPAU-F13. polymyalgia rheumatica — current estimate: 12 y 0.01%, 50 y 0.3%, 65 y 1%, 80 y 2%; women ×1.5, men ×0.7
EPAU-F14. long head of biceps tendinopathy or rupture — current estimate: 12 y 0.5%, 30 y 2%, 50 y 3%, 70 y 2%
EPAU-F15. shoulder pain referred from the cervical spine — current estimate: 12 y 1%, 30 y 4%, 50 y 6%, 70 y 5%
EPAU-F16. SLAP lesion — current estimate: 12 y 0.5%, 18 y 2%, 30 y 2%, 45 y 0.8%; men ×1.3, women ×0.8
EPAU-F17. posterior or multidirectional shoulder instability — current estimate: 12 y 1%, 18 y 2%, 30 y 1%, 50 y 0.3%; women ×1.3, men ×0.8

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### EPAU 2. Poids à vérifier et combinaisons (7 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for shoulder pain; the French wording is kept in quotes.

Target diagnosis: subacromial pain or rotator cuff tendinopathy
EPAU-P1. « Neer test » — current LR+ 1.3, LR− 0.8
EPAU-P2. Cluster « Park : Hawkins + arc douloureux + rotation externe résistée » — current LR+ 10.6 (Park et coll., 2005, J Bone Joint Surg Am (PMID 15995110) : probabilité post-test 95 % ; RV+ ≈ 10,6 non vérifiable dans l'extrait)

Target diagnosis: adhesive capsulitis (frozen shoulder)
EPAU-P3. « Diabète ou neuropathie périphérique » — current LR+ 2.5, LR− 0.85

Target diagnosis: full-thickness rotator cuff tear
EPAU-P4. Cluster « Park : arc douloureux + drop-arm + faiblesse en rotation externe » — current LR+ 15.6 (Park et coll., 2005, J Bone Joint Surg Am (PMID 15995110) : probabilité post-test 91 % ; RV+ ≈ 15,6 non vérifiable dans l'extrait)

Target diagnosis: scapular dyskinesis
EPAU-P5. « Scapula décollée ou dyskinésie visible » — current LR+ 3, LR− 0.6

Target diagnosis: acromioclavicular osteoarthritis or distal clavicle osteolysis
EPAU-P6. « Où est la douleur : Irradie sous le coude » — current LR+ 0.3, LR− 1.05
EPAU-P7. « Acromio-claviculaire » — current LR+ 1.6, LR− 0.1

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### EPAU 3. Poids provisoires forts (21 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for shoulder pain; the French wording is kept in quotes.

Target diagnosis: adhesive capsulitis (frozen shoulder)
EPAU-P8. « Perte progressive de mouvement (difficulté à s'habiller, à attacher le soutien-gorge) » — current LR+ 6, LR− 0.2
EPAU-P9. Élévation active (flexion) = « Complète et indolore » — current LR 0.2
EPAU-P10. Rotation externe active = « Complète et indolore » — current LR 0.2
EPAU-P11. Rotation externe passive = « Complète et indolore » — current LR 0.05
EPAU-P12. Rotation externe passive = « Limitée avec douleur » — current LR 6
EPAU-P13. Rotation externe passive = « Limitée par raideur » — current LR 8

Target diagnosis: acromioclavicular joint sprain or separation
EPAU-P14. « Marche d'escalier acromio-claviculaire » — current LR+ 8, LR− 0.6
EPAU-P15. « Acromio-claviculaire » — current LR+ 3, LR− 0.2

Target diagnosis: clavicle fracture
EPAU-P16. « Clavicule » — current LR+ 6, LR− 0.1

Target diagnosis: anterior shoulder dislocation or instability
EPAU-P17. « Luxation antérieure de cette épaule » — current LR+ 8, LR− 0.4
EPAU-P18. « Sensation que l'épaule sort de place » — current LR+ 6, LR− 0.3
EPAU-P19. « Déformation visible ou épaule « carrée » » — current LR+ 6, LR− 0.9

Target diagnosis: acromioclavicular osteoarthritis or distal clavicle osteolysis
EPAU-P20. « Où est la douleur : Sommet de l'épaule (acromio-claviculaire) » — current LR+ 5, LR− 0.3

Target diagnosis: polymyalgia rheumatica
EPAU-P21. « Où est la douleur : Aux deux épaules et aux hanches, avec raideur » — current LR+ 10, LR− 0.3
EPAU-P22. Raideur matinale = « 30 minutes ou plus » — current LR 5
EPAU-P23. « Raideur matinale des épaules et des hanches » — current LR+ 10, LR− 0.2

Target diagnosis: long head of biceps tendinopathy or rupture
EPAU-P24. « Boule au milieu du bras (déformation de Popeye) » — current LR+ 15, LR− 0.9

Target diagnosis: shoulder pain referred from the cervical spine
EPAU-P25. « Où est la douleur : Irradie sous le coude » — current LR+ 6, LR− 0.4
EPAU-P26. « Douleur reproduite par les mouvements du cou » — current LR+ 6, LR− 0.3
EPAU-P27. « Engourdissements ou picotements dans le bras ou la main » — current LR+ 5, LR− 0.4
EPAU-P28. « Déficit de force, de sensibilité ou de réflexe C5–C6 » — current LR+ 5, LR− 0.8

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur au coude (COUD)

### COUD 1. Fréquences de départ (17 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for elbow pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

COUD-F1. lateral epicondylitis (lateral elbow tendinopathy) — current estimate: 12 y 6%, 25 y 20%, 45 y 35%, 60 y 25%, 80 y 12%
COUD-F2. medial epicondylitis — current estimate: 12 y 2%, 25 y 5%, 45 y 8%, 70 y 4%
COUD-F3. little league elbow (medial epicondyle apophysitis) — current estimate: 12 y 6%, 14 y 5%, 17 y 1%, 20 y 0.1%; men ×1.5, women ×0.7
COUD-F4. elbow fracture (radial head or neck, olecranon, distal humerus, medial epicondyle) — current estimate: 12 y 4%, 30 y 3%, 65 y 4%, 85 y 6%
COUD-F5. elbow dislocation — current estimate: 12 y 2%, 18 y 2%, 40 y 0.6%, 70 y 0.3%
COUD-F6. cubital tunnel syndrome (ulnar neuropathy at the elbow) — current estimate: 12 y 0.5%, 30 y 4%, 50 y 7%, 70 y 6%; men ×1.4, women ×0.75
COUD-F7. aseptic olecranon bursitis — current estimate: 12 y 1%, 40 y 6%, 70 y 7%; men ×2, women ×0.6
COUD-F8. septic olecranon bursitis — current estimate: 12 y 0.3%, 40 y 3%, 70 y 3%; men ×2, women ×0.6
COUD-F9. elbow osteoarthritis — current estimate: 12 y 0.1%, 40 y 2%, 60 y 5%, 80 y 8%; men ×1.5, women ×0.7
COUD-F10. ulnar collateral ligament injury of the elbow — current estimate: 12 y 0.2%, 14 y 0.6%, 16 y 2%, 22 y 3%, 35 y 0.5%, 50 y 0.1%
COUD-F11. distal biceps tendon rupture — current estimate: 12 y 0.02%, 30 y 0.4%, 45 y 1%, 65 y 0.6%; men ×10, women ×0.1
COUD-F12. osteochondritis dissecans of the capitellum — current estimate: 12 y 2%, 15 y 1%, 18 y 0.4%, 25 y 0.05%
COUD-F13. posteromedial impingement or olecranon stress fracture — current estimate: 12 y 0.5%, 18 y 1%, 30 y 0.6%, 50 y 0.2%
COUD-F14. distal triceps tendinopathy or rupture — current estimate: 12 y 0.2%, 30 y 0.8%, 50 y 0.8%, 70 y 0.5%; men ×2, women ×0.6
COUD-F15. radial tunnel syndrome — current estimate: 12 y 0.2%, 30 y 1%, 50 y 1%, 70 y 0.5%
COUD-F16. inflammatory or crystal arthritis of the elbow — current estimate: 12 y 0.2%, 40 y 0.8%, 65 y 2%, 85 y 3%
COUD-F17. cervical radiculopathy referred to the elbow — current estimate: 12 y 0.5%, 35 y 2%, 55 y 4%, 75 y 3%

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### COUD 2. Poids à vérifier et combinaisons (4 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for elbow pain; the French wording is kept in quotes.

Target diagnosis: lateral epicondylitis (lateral elbow tendinopathy)
COUD-P1. « Blocage ou accrochage du coude » — current LR+ 0.4, LR− 1.05
COUD-P2. « Cozen test (Extension résistée du poignet (Cozen)) » — current LR+ 2.5, LR− 0.12
COUD-P3. « Maudsley test (Extension résistée du 3ᵉ doigt (Maudsley)) » — current LR+ 2, LR− 0.4

Target diagnosis: radial tunnel syndrome
COUD-P4. « Douleur 3 à 5 cm sous l'épicondyle latéral (arcade de Frohse) » — current LR+ 5, LR− 0.3

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### COUD 3. Poids provisoires forts (1 sur 2) (25 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for elbow pain; the French wording is kept in quotes.

Target diagnosis: lateral epicondylitis (lateral elbow tendinopathy)
COUD-P5. « Où est la douleur : Latérale, à l'épicondyle » — current LR+ 5, LR− 0.1
COUD-P6. « Épicondyle latéral douloureux » — current LR+ 5, LR− 0.1

Target diagnosis: medial epicondylitis
COUD-P7. « Où est la douleur : Médiale, à l'épicondyle médial » — current LR+ 5, LR− 0.15
COUD-P8. « Épicondyle médial douloureux » — current LR+ 5, LR− 0.1

Target diagnosis: little league elbow (medial epicondyle apophysitis)
COUD-P9. « Activités physiques : Sports de lancer (baseball, softball, water-polo) » — current LR+ 5, LR− 1
COUD-P10. « Où est la douleur : Médiale, à l'épicondyle médial » — current LR+ 5, LR− 0.1
COUD-P11. « Épicondyle médial douloureux » — current LR+ 6, LR− 0.1

Target diagnosis: elbow dislocation
COUD-P12. « Déformation visible ou coude « sorti de place » » — current LR+ 15, LR− 0.2
COUD-P13. « Déformation ou perte des repères (triangle olécrânien) » — current LR+ 15, LR− 0.2
COUD-P14. « Elbow extension test » — current LR+ 1.5, LR− 0.1

Target diagnosis: aseptic olecranon bursitis
COUD-P15. « Enflure derrière le coude (« balle » sur l'olécrâne) » — current LR+ 15, LR− 0.2
COUD-P16. « Tuméfaction de la bourse olécrânienne » — current LR+ 20, LR− 0.1

Target diagnosis: septic olecranon bursitis
COUD-P17. « Enflure derrière le coude (« balle » sur l'olécrâne) » — current LR+ 15, LR− 0.2
COUD-P18. « Tuméfaction de la bourse olécrânienne » — current LR+ 20, LR− 0.1

Target diagnosis: ulnar collateral ligament injury of the elbow
COUD-P19. « Activités physiques : Sports de lancer (baseball, softball, water-polo) » — current LR+ 5, LR− 1
COUD-P20. « Où est la douleur : Médiale, à l'épicondyle médial » — current LR+ 5, LR− 0.2

Target diagnosis: distal biceps tendon rupture
COUD-P21. « Claquement (« pop ») au moment de la blessure » — current LR+ 5, LR− 0.3
COUD-P22. « Où est la douleur : Antérieure, au pli du coude » — current LR+ 6, LR− 0.2
COUD-P23. « Ecchymose antécubitale » — current LR+ 6, LR− 0.5

Target diagnosis: osteochondritis dissecans of the capitellum
COUD-P24. « Blocage ou accrochage du coude » — current LR+ 5, LR− 0.5

Target diagnosis: posteromedial impingement or olecranon stress fracture
COUD-P25. « Où est la douleur : Postérieure, à l'olécrâne » — current LR+ 5, LR− 0.3

Target diagnosis: distal triceps tendinopathy or rupture
COUD-P26. « Où est la douleur : Postérieure, à l'olécrâne » — current LR+ 5, LR− 0.3
COUD-P27. « Extension active du coude contre la gravité impossible » — current LR+ 10, LR− 0.3

Target diagnosis: radial tunnel syndrome
COUD-P28. « Où est la douleur : Latérale, 3 à 5 cm sous l'épicondyle (avant-bras) » — current LR+ 5, LR− 0.3

Target diagnosis: inflammatory or crystal arthritis of the elbow
COUD-P29. « Autres articulations enflées ou douloureuses » — current LR+ 5, LR− 0.6

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### COUD 4. Poids provisoires forts (2 sur 2) (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for elbow pain; the French wording is kept in quotes.

Target diagnosis: inflammatory or crystal arthritis of the elbow
COUD-P30. « Tophus » — current LR+ 8, LR− 0.9

Target diagnosis: cervical radiculopathy referred to the elbow
COUD-P31. « Douleur aggravée par les mouvements du cou » — current LR+ 5, LR− 0.5
COUD-P32. « Spurling ou mouvements du cou reproduisant la douleur » — current LR+ 5, LR− 0.4

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Lombalgie, avec ou sans irradiation (LOMB)

### LOMB 1. Fréquences de départ (16 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for low back pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

LOMB-F1. non-specific low back pain — current estimate: 12 y 50%, 30 y 55%, 50 y 50%, 70 y 35%, 85 y 30%
LOMB-F2. lumbar muscle strain or spasm — current estimate: 12 y 8%, 18 y 12%, 30 y 8%, 50 y 4%, 70 y 2%
LOMB-F3. discogenic low back pain — current estimate: 12 y 2%, 25 y 6%, 40 y 8%, 60 y 7%, 80 y 5%
LOMB-F4. lumbar facet joint pain — current estimate: 12 y 1%, 30 y 4%, 50 y 10%, 70 y 12%, 85 y 12%
LOMB-F5. pregnancy-related low back and pelvic girdle pain — current estimate: 12 y 0.1%, 20 y 0.4%, 30 y 0.6%, 40 y 0.3%, 50 y 0.03%; women ×1, men ×0
LOMB-F6. lumbar spinal stenosis — current estimate: 12 y 0.05%, 40 y 1%, 55 y 6%, 70 y 18%, 85 y 22%
LOMB-F7. sacroiliac joint pain — current estimate: 12 y 1%, 25 y 5%, 45 y 7%, 65 y 5%, 85 y 4%; women ×1.3, men ×0.8
LOMB-F8. lumbar disc herniation with radiculopathy — current estimate: 12 y 1%, 20 y 3%, 35 y 5%, 50 y 5%, 70 y 3%
LOMB-F9. degenerative spondylolisthesis — current estimate: 12 y 0.1%, 45 y 1%, 60 y 4%, 75 y 6%; women ×2.5, men ×0.4
LOMB-F10. osteoporotic vertebral fracture — current estimate: 12 y 0.05%, 50 y 0.5%, 65 y 2%, 75 y 5%, 90 y 9%; women ×2, men ×0.5
LOMB-F11. spondylolysis or isthmic spondylolisthesis — current estimate: 12 y 6%, 15 y 8%, 18 y 6%, 25 y 2%, 40 y 1%; men ×1.3, women ×0.8
LOMB-F12. adult degenerative scoliosis — current estimate: 12 y 0.1%, 50 y 1%, 70 y 3%, 85 y 4%
LOMB-F13. axial spondyloarthritis — current estimate: 12 y 0.5%, 20 y 3%, 30 y 4%, 45 y 3%, 60 y 0.8%; men ×1.3, women ×0.8
LOMB-F14. spinal malignancy — current estimate: 12 y 0.05%, 40 y 0.2%, 60 y 0.7%, 80 y 1%
LOMB-F15. spondylodiscitis or epidural abscess — current estimate: 12 y 0.01%, 50 y 0.02%, 80 y 0.05%
LOMB-F16. cauda equina syndrome — current estimate: 12 y 0.02%, 30 y 0.06%, 60 y 0.06%

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### LOMB 2. Poids à vérifier et combinaisons (4 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for low back pain; the French wording is kept in quotes.

Target diagnosis: osteoporotic vertebral fracture
LOMB-P1. « Fluoroquinolone ou corticoïde récents » — current LR+ 5, LR− 0.9
LOMB-P2. Mécanisme = « Chute de hauteur, accident ou coup » — current LR 4

Target diagnosis: spondylolysis or isthmic spondylolisthesis
LOMB-P3. « Stork test spondylolysis (Hyperextension unipodale (stork)) » — current LR+ 1.5, LR− 0.8

Target diagnosis: spondylodiscitis or epidural abscess
LOMB-P4. « Fièvre ou frissons » — current LR+ 3, LR− 0.5

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### LOMB 3. Poids provisoires forts (3 éléments)

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

### HANC 1. Fréquences de départ (21 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for hip and groin pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

HANC-F1. hip osteoarthritis — current estimate: 12 y 0.2%, 30 y 2%, 45 y 12%, 60 y 30%, 75 y 40%, 90 y 45%
HANC-F2. greater trochanteric pain syndrome (gluteal tendinopathy) — current estimate: 12 y 0.5%, 25 y 3%, 40 y 12%, 55 y 20%, 70 y 20%, 85 y 15%; women ×2.2, men ×0.45
HANC-F3. adductor-related groin pain — current estimate: 12 y 3%, 18 y 8%, 25 y 7%, 40 y 3%, 60 y 1%; men ×1.8, women ×0.55
HANC-F4. acute hamstring injury — current estimate: 12 y 2%, 18 y 5%, 30 y 5%, 45 y 3%, 60 y 1%; men ×1.4, women ×0.7
HANC-F5. proximal femur (hip) fracture — current estimate: 12 y 0.3%, 40 y 0.3%, 60 y 1%, 75 y 5%, 90 y 10%; women ×1.5, men ×0.7
HANC-F6. femoroacetabular impingement or labral tear — current estimate: 12 y 0.8%, 15 y 3%, 18 y 7%, 30 y 8%, 45 y 4%, 60 y 1%
HANC-F7. iliopsoas-related groin pain or snapping hip — current estimate: 12 y 2%, 20 y 4%, 35 y 3%, 60 y 1%
HANC-F8. deep gluteal (piriformis) syndrome — current estimate: 12 y 0.3%, 30 y 2%, 50 y 3%, 70 y 2%; women ×1.3, men ×0.8
HANC-F9. meralgia paresthetica — current estimate: 12 y 0.2%, 30 y 1%, 50 y 2%, 70 y 1%
HANC-F10. osteitis pubis (pubic-related groin pain) — current estimate: 12 y 0.5%, 18 y 2%, 30 y 2%, 45 y 0.5%; men ×2, women ×0.5
HANC-F11. inguinal-related groin pain (sports hernia) — current estimate: 12 y 0.5%, 18 y 2%, 30 y 2%, 45 y 0.5%; men ×2.5, women ×0.4
HANC-F12. pelvic apophyseal avulsion fracture — current estimate: 12 y 4%, 14 y 6%, 16 y 5%, 19 y 1%, 25 y 0.1%; men ×1.8, women ×0.55
HANC-F13. proximal hamstring tendinopathy — current estimate: 12 y 0.2%, 25 y 2%, 40 y 3%, 60 y 2%
HANC-F14. slipped capital femoral epiphysis — current estimate: 10 y 2%, 12 y 3%, 14 y 3%, 16 y 0.8%, 18 y 0.1%; men ×1.6, women ×0.6
HANC-F15. femoral neck or shaft stress fracture — current estimate: 12 y 0.2%, 18 y 0.8%, 30 y 0.6%, 50 y 0.2%; women ×1.8, men ×0.55
HANC-F16. osteonecrosis of the femoral head — current estimate: 12 y 0.1%, 30 y 0.5%, 45 y 0.8%, 70 y 0.6%; men ×1.3, women ×0.8
HANC-F17. iliac crest apophysitis — current estimate: 12 y 2%, 14 y 3%, 17 y 2%, 20 y 0.2%, 25 y 0.05%
HANC-F18. thigh or iliac crest contusion — current estimate: 12 y 4%, 20 y 5%, 40 y 3%, 70 y 3%
HANC-F19. pelvic or sacral fragility fracture — current estimate: 12 y 0.05%, 50 y 0.1%, 70 y 1%, 85 y 3%, 95 y 4%; women ×2, men ×0.5
HANC-F20. hip pain referred from the lumbar spine — current estimate: 12 y 1%, 30 y 5%, 50 y 8%, 70 y 8%
HANC-F21. polymyalgia rheumatica — current estimate: 12 y 0.01%, 50 y 0.2%, 65 y 1%, 80 y 2%; women ×1.5, men ×0.7

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### HANC 2. Poids à vérifier et combinaisons (9 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for hip and groin pain; the French wording is kept in quotes.

Target diagnosis: hip osteoarthritis
HANC-P1. Raideur matinale = « Moins de 30 minutes » — current LR 1.6
HANC-P2. Raideur matinale = « Aucune » — current LR 0.8

Target diagnosis: greater trochanteric pain syndrome (gluteal tendinopathy)
HANC-P3. « Difficulté à mettre chaussures et chaussettes » — current LR+ 0.3, LR− 1.2
HANC-P4. « Grand trochanter » — current LR+ 1.6, LR− 0.3

Target diagnosis: adductor-related groin pain
HANC-P5. « Adducteurs (origine pubienne) » — current LR+ 3, LR− 0.15
HANC-P6. « Adduction résistée » — current LR+ 4, LR− 0.5

Target diagnosis: femoroacetabular impingement or labral tear
HANC-P7. « Où est la douleur : Aine » — current LR+ 2.5, LR− 0.2
HANC-P8. « Clic, accrochage ou blocage dans l'aine » — current LR+ 2, LR− 0.8

Target diagnosis: osteonecrosis of the femoral head
HANC-P9. « Fluoroquinolone ou corticoïde récents » — current LR+ 5, LR− 0.8

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### HANC 3. Poids provisoires forts (18 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for hip and groin pain; the French wording is kept in quotes.

Target diagnosis: greater trochanteric pain syndrome (gluteal tendinopathy)
HANC-P10. « Où est la douleur : Latérale, sur le grand trochanter » — current LR+ 6, LR− 0.2

Target diagnosis: acute hamstring injury
HANC-P11. « Où est la douleur : Arrière de la cuisse » — current LR+ 6, LR− 0.3
HANC-P12. « Ischio-jambiers (corps musculaire) » — current LR+ 5, LR− 0.3

Target diagnosis: iliopsoas-related groin pain or snapping hip
HANC-P13. « Ressaut audible ou visible de la hanche » — current LR+ 6, LR− 0.7

Target diagnosis: meralgia paresthetica
HANC-P14. « Où est la douleur : Face antéro-latérale de la cuisse, brûlure ou engourdissement » — current LR+ 10, LR− 0.2
HANC-P15. « Compression du nerf cutané latéral (sous l'épine iliaque antéro-supérieure) » — current LR+ 5, LR− 0.4

Target diagnosis: osteitis pubis (pubic-related groin pain)
HANC-P16. « Où est la douleur : Pubis (symphyse) » — current LR+ 6, LR− 0.3
HANC-P17. « Symphyse pubienne » — current LR+ 5, LR− 0.3

Target diagnosis: pelvic apophyseal avulsion fracture
HANC-P18. « Épines iliaques antérieures (supérieure, inférieure) » — current LR+ 5, LR− 0.3

Target diagnosis: proximal hamstring tendinopathy
HANC-P19. « Où est la douleur : Ischion (os de la fesse en position assise) » — current LR+ 6, LR− 0.3

Target diagnosis: slipped capital femoral epiphysis
HANC-P20. Rotation interne passive (90° de flexion) = « Complète et indolore » — current LR 0.2
HANC-P21. « Drehmann sign » — current LR+ 15, LR− 0.3

Target diagnosis: iliac crest apophysitis
HANC-P22. « Où est la douleur : Crête iliaque ou épine antérieure du bassin » — current LR+ 5, LR− 0.3
HANC-P23. « Crête iliaque » — current LR+ 5, LR− 0.3

Target diagnosis: hip pain referred from the lumbar spine
HANC-P24. « Déficit de force, de sensibilité ou de réflexe L2–L4 » — current LR+ 5, LR− 0.8

Target diagnosis: polymyalgia rheumatica
HANC-P25. « Où est la douleur : Aussi aux épaules ou au cou, avec raideur » — current LR+ 10, LR− 0.3
HANC-P26. Raideur matinale = « 30 minutes ou plus » — current LR 5
HANC-P27. « Raideur matinale des épaules et du cou » — current LR+ 10, LR− 0.2

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur au genou (GENO)

### GENO 1. Fréquences de départ (23 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for knee pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

GENO-F1. patellofemoral pain syndrome — current estimate: 12 y 25%, 16 y 32%, 28 y 20%, 45 y 10%, 55 y 5%, 70 y 2%; women ×1.5, men ×0.7
GENO-F2. knee osteoarthritis — current estimate: 12 y 0.3%, 16 y 0.5%, 28 y 3%, 45 y 18%, 55 y 33%, 70 y 50%, 85 y 60%; women ×1.25, men ×0.8
GENO-F3. meniscal tear — current estimate: 12 y 3%, 16 y 6%, 28 y 9%, 45 y 12%, 60 y 12%, 75 y 10%; men ×1.2, women ×0.85
GENO-F4. anterior cruciate ligament tear — current estimate: 12 y 3%, 16 y 6%, 25 y 6%, 40 y 3%, 55 y 2%, 70 y 0.8%; women ×1.2, men ×0.9
GENO-F5. posterior cruciate ligament tear — current estimate: 12 y 0.4%, 25 y 1%, 50 y 0.8%, 70 y 0.4%; men ×1.3, women ×0.75
GENO-F6. medial or lateral collateral ligament sprain of the knee — current estimate: 12 y 3%, 16 y 5%, 28 y 5%, 50 y 3%, 70 y 2%
GENO-F7. lateral patellar instability or dislocation — current estimate: 12 y 5%, 16 y 7%, 28 y 3%, 50 y 0.6%, 70 y 0.3%; women ×1.4, men ×0.75
GENO-F8. patellar or quadriceps tendinopathy — current estimate: 12 y 3%, 16 y 6%, 28 y 6%, 50 y 3%, 70 y 2%; men ×1.3, women ×0.8
GENO-F9. Hoffa fat pad syndrome — current estimate: 12 y 2%, 25 y 2%, 50 y 2%, 70 y 0.8%
GENO-F10. iliotibial band syndrome — current estimate: 12 y 1%, 16 y 2%, 28 y 5%, 50 y 2%, 70 y 0.6%
GENO-F11. prepatellar bursitis — current estimate: 12 y 0.8%, 16 y 1%, 28 y 2%, 50 y 3%, 70 y 2%; men ×1.5, women ×0.7
GENO-F12. pes anserine tendinobursitis — current estimate: 12 y 0.3%, 16 y 0.5%, 28 y 1%, 50 y 5%, 70 y 6%; women ×1.6, men ×0.65
GENO-F13. Osgood-Schlatter disease — current estimate: 9 y 6%, 12 y 20%, 14 y 18%, 16 y 8%, 18 y 2%, 21 y 0.2%, 25 y 0.05%; men ×1.4, women ×0.7
GENO-F14. Sinding-Larsen-Johansson disease — current estimate: 9 y 5%, 11 y 6%, 13 y 4%, 15 y 1%, 17 y 0.3%, 20 y 0.05%; men ×1.3, women ×0.8
GENO-F15. knee contusion or minor sprain — current estimate: 12 y 10%, 18 y 12%, 30 y 12%, 50 y 9%, 70 y 7%; men ×1.15, women ×0.9
GENO-F16. medial plica syndrome — current estimate: 12 y 0.8%, 18 y 1%, 30 y 1%, 50 y 0.4%, 70 y 0.2%
GENO-F17. osteochondritis dissecans of the knee — current estimate: 10 y 2%, 13 y 3%, 16 y 2%, 19 y 0.5%, 25 y 0.1%, 40 y 0.03%; men ×1.8, women ×0.55
GENO-F18. discoid meniscus — current estimate: 8 y 2%, 12 y 1%, 16 y 0.5%, 20 y 0.2%, 30 y 0.05%
GENO-F19. gout or calcium pyrophosphate arthritis of the knee — current estimate: 12 y 0.05%, 30 y 0.3%, 45 y 1%, 60 y 3%, 75 y 5%, 85 y 6%; men ×1.4, women ×0.75
GENO-F20. inflammatory arthritis of the knee (rheumatoid, spondyloarthritis, psoriatic) — current estimate: 12 y 0.6%, 16 y 0.8%, 28 y 1%, 50 y 2%, 70 y 2%; women ×1.3, men ×0.8
GENO-F21. septic arthritis of the knee — current estimate: 12 y 0.2%, 40 y 0.2%, 65 y 0.3%, 80 y 0.5%, 90 y 0.7%
GENO-F22. Baker's (popliteal) cyst — current estimate: 12 y 0.3%, 16 y 0.5%, 28 y 1%, 50 y 4%, 70 y 6%
GENO-F23. subchondral insufficiency fracture of the knee — current estimate: 12 y 0.05%, 45 y 0.2%, 60 y 1%, 75 y 3%, 90 y 4%; women ×1.6, men ×0.65

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### GENO 2. Poids à vérifier et combinaisons (3 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for knee pain; the French wording is kept in quotes.

Target diagnosis: patellofemoral pain syndrome
GENO-P1. « Clarke's test » — current Se 39%, Sp 67%, LR+ 1.18, LR− 0.91

Target diagnosis: meniscal tear
GENO-P2. « Blocages vrais (impossible d'étendre le genou) » — current LR+ 2, LR− 0.8

Target diagnosis: patellar or quadriceps tendinopathy
GENO-P3. « Tendon rotulien (pôle inférieur) » — current LR+ 1.8, LR− 0.4

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### GENO 3. Poids provisoires forts (22 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for knee pain; the French wording is kept in quotes.

Target diagnosis: medial or lateral collateral ligament sprain of the knee
GENO-P4. Valgus stress test knee = « Laxité » — current LR 5
GENO-P5. Varus stress test knee = « Laxité » — current LR 5

Target diagnosis: lateral patellar instability or dislocation
GENO-P6. « Sensation que la rotule est sortie de place » — current LR+ 8, LR− 0.4

Target diagnosis: iliotibial band syndrome
GENO-P7. « Où est la douleur : Latérale, au-dessus de l'interligne (bandelette) » — current LR+ 5, LR− 0.3

Target diagnosis: prepatellar bursitis
GENO-P8. « Où est la douleur : Devant la rotule, superficielle » — current LR+ 6, LR− 0.3
GENO-P9. « Tuméfaction localisée : Devant la rotule (bourse) » — current LR+ 10, LR− 0.2

Target diagnosis: pes anserine tendinobursitis
GENO-P10. « Où est la douleur : Médiale, sous l'interligne (patte d'oie) » — current LR+ 5, LR− 0.3
GENO-P11. « Patte d'oie » — current LR+ 5, LR− 0.3

Target diagnosis: Osgood-Schlatter disease
GENO-P12. « Où est la douleur : Tubérosité tibiale » — current LR+ 6, LR− 0.3
GENO-P13. « Tubérosité tibiale » — current LR+ 5, LR− 0.2

Target diagnosis: Sinding-Larsen-Johansson disease
GENO-P14. « Où est la douleur : Sous la rotule (tendon rotulien) » — current LR+ 6, LR− 0.3
GENO-P15. « Tendon rotulien (pôle inférieur) » — current LR+ 5, LR− 0.3

Target diagnosis: medial plica syndrome
GENO-P16. « Medial plica test (Cordon antéro-médial (plica)) » — current LR+ 6, LR− 0.4

Target diagnosis: gout or calcium pyrophosphate arthritis of the knee
GENO-P17. « ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte » — current LR+ 6, LR− 1
GENO-P18. « ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte » — current LR+ 6, LR− 1
GENO-P19. « Rougeur ou chaleur » — current LR+ 5, LR− 0.4

Target diagnosis: septic arthritis of the knee
GENO-P20. « Enflure du genou (actuelle ou récurrente) » — current LR+ 4, LR− 0.2
GENO-P21. « Facteurs de risque d'infection : Prothèse du genou » — current LR+ 5, LR− 1
GENO-P22. « Rougeur ou chaleur » — current LR+ 5, LR− 0.4
GENO-P23. Bulge test knee effusion (Flot (signe du flot)) = « Négatif » — current LR 0.2

Target diagnosis: Baker's (popliteal) cyst
GENO-P24. « Où est la douleur : Postérieure (creux poplité) » — current LR+ 5, LR− 0.5
GENO-P25. « Tuméfaction localisée : Masse au creux poplité » — current LR+ 8, LR− 0.4

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur à la cheville ou à la jambe (CHEV)

### CHEV 1. Fréquences de départ (21 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for ankle pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

CHEV-F1. lateral ankle sprain — current estimate: 12 y 30%, 16 y 38%, 25 y 30%, 40 y 20%, 60 y 12%, 80 y 8%
CHEV-F2. chronic ankle instability — current estimate: 12 y 2%, 18 y 5%, 30 y 6%, 50 y 4%, 70 y 2%
CHEV-F3. midportion Achilles tendinopathy — current estimate: 12 y 1%, 20 y 3%, 35 y 8%, 50 y 10%, 65 y 7%, 80 y 4%; men ×1.2, women ×0.85
CHEV-F4. insertional Achilles tendinopathy, Haglund deformity or retrocalcaneal bursitis — current estimate: 12 y 0.5%, 25 y 2%, 45 y 5%, 60 y 6%, 80 y 4%
CHEV-F5. Achilles tendon rupture — current estimate: 12 y 0.1%, 25 y 0.8%, 40 y 2%, 55 y 2%, 70 y 1%, 85 y 0.6%; men ×2, women ×0.5
CHEV-F6. ankle fracture — current estimate: 12 y 6%, 16 y 5%, 30 y 5%, 50 y 8%, 70 y 12%, 85 y 15%
CHEV-F7. medial tibial stress syndrome — current estimate: 12 y 2%, 16 y 6%, 22 y 6%, 35 y 3%, 50 y 1%, 70 y 0.3%; women ×1.5, men ×0.75
CHEV-F8. tibial or fibular stress fracture — current estimate: 12 y 1%, 18 y 3%, 25 y 2%, 40 y 1%, 60 y 0.4%; women ×1.5, men ×0.75
CHEV-F9. chronic exertional compartment syndrome of the leg — current estimate: 12 y 0.5%, 18 y 2%, 30 y 2%, 45 y 1%, 60 y 0.3%
CHEV-F10. calf muscle strain (tennis leg) — current estimate: 12 y 0.3%, 25 y 1%, 40 y 3%, 55 y 3%, 70 y 2%; men ×1.3, women ×0.75
CHEV-F11. Sever disease (calcaneal apophysitis) — current estimate: 9 y 15%, 11 y 12%, 12 y 8%, 13 y 5%, 14 y 2%, 16 y 0.3%, 18 y 0.05%; men ×1.4, women ×0.7
CHEV-F12. posterior tibial tendon dysfunction — current estimate: 12 y 0.2%, 35 y 1%, 50 y 3%, 65 y 7%, 80 y 8%; women ×1.8, men ×0.55
CHEV-F13. ankle osteoarthritis — current estimate: 12 y 0.1%, 30 y 0.5%, 50 y 3%, 65 y 6%, 80 y 8%
CHEV-F14. syndesmotic (high ankle) sprain — current estimate: 12 y 2%, 16 y 3%, 25 y 3%, 45 y 2%, 70 y 1%; men ×1.2, women ×0.85
CHEV-F15. deltoid ligament sprain or Maisonneuve fracture — current estimate: 12 y 1%, 25 y 1%, 50 y 1%, 70 y 1%
CHEV-F16. peroneal tendinopathy, tear or subluxation — current estimate: 12 y 0.5%, 25 y 2%, 45 y 3%, 65 y 2%
CHEV-F17. anterior or posterior ankle impingement — current estimate: 12 y 0.5%, 20 y 2%, 35 y 2%, 55 y 1%
CHEV-F18. osteochondral lesion of the talus — current estimate: 12 y 1%, 18 y 2%, 30 y 2%, 50 y 1%
CHEV-F19. tarsal tunnel syndrome — current estimate: 12 y 0.1%, 30 y 0.4%, 50 y 0.8%, 70 y 0.8%
CHEV-F20. gout or calcium pyrophosphate arthritis of the ankle — current estimate: 12 y 0.05%, 30 y 0.4%, 45 y 1%, 60 y 3%, 80 y 4%; men ×1.5, women ×0.7
CHEV-F21. insufficiency fracture of the distal tibia, fibula or calcaneus — current estimate: 12 y 0.05%, 50 y 0.2%, 65 y 0.8%, 80 y 2%, 90 y 3%; women ×1.8, men ×0.55

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### CHEV 2. Poids à vérifier et combinaisons (7 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for ankle pain; the French wording is kept in quotes.

Target diagnosis: lateral ankle sprain
CHEV-P1. « Œdème latéral » — current LR+ 1.5, LR− 0.1
CHEV-P2. « Ligament talo-fibulaire antérieur » — current LR+ 1.6, LR− 0.2
CHEV-P3. Anterior drawer test ankle (Tiroir antérieur) = « Laxité » — current LR 3
CHEV-P4. Anterior drawer test ankle (Tiroir antérieur) = « Douleur sans laxité » — current LR 1.3
CHEV-P5. Anterior drawer test ankle (Tiroir antérieur) = « Normal et indolore » — current LR 0.7
CHEV-P6. Talar tilt test = « Laxité » — current LR 3
CHEV-P7. Talar tilt test = « Normal et indolore » — current LR 0.8

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### CHEV 3. Poids provisoires forts (21 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for ankle pain; the French wording is kept in quotes.

Target diagnosis: lateral ankle sprain
CHEV-P8. « Où est la douleur : Latérale, devant ou sous la malléole externe » — current LR+ 4, LR− 0.2

Target diagnosis: chronic ankle instability
CHEV-P9. « Entorses antérieures de cette cheville » — current LR+ 5, LR− 0.3
CHEV-P10. « Entorses à répétition ou cheville qui cède » — current LR+ 6, LR− 0.3

Target diagnosis: insertional Achilles tendinopathy, Haglund deformity or retrocalcaneal bursitis
CHEV-P11. « Où est la douleur : Insertion du tendon d'Achille (arrière du talon) » — current LR+ 6, LR− 0.3
CHEV-P12. « Insertion du tendon d'Achille » — current LR+ 5, LR− 0.3

Target diagnosis: Achilles tendon rupture
CHEV-P13. « Sensation de coup de bâton ou de pop derrière la cheville ou au mollet » — current LR+ 6, LR− 0.3

Target diagnosis: medial tibial stress syndrome
CHEV-P14. « Où est la douleur : Bord interne du tibia, tiers inférieur (diffuse) » — current LR+ 6, LR− 0.3
CHEV-P15. « Bord médial du tibia (diffus) » — current LR+ 5, LR− 0.3

Target diagnosis: tibial or fibular stress fracture
CHEV-P16. « Où est la douleur : Point précis sur le tibia ou le péroné » — current LR+ 6, LR− 0.4
CHEV-P17. « Point osseux précis du tibia ou de la fibula » — current LR+ 6, LR− 0.4

Target diagnosis: chronic exertional compartment syndrome of the leg
CHEV-P18. « Douleur ou tension après un temps d'effort fixe, qui cède au repos » — current LR+ 8, LR− 0.2

Target diagnosis: calf muscle strain (tennis leg)
CHEV-P19. « Où est la douleur : Mollet » — current LR+ 8, LR− 0.3
CHEV-P20. « Mollet » — current LR+ 6, LR− 0.3

Target diagnosis: Sever disease (calcaneal apophysitis)
CHEV-P21. « Calcanéus (compression latérale) » — current LR+ 5, LR− 0.3

Target diagnosis: peroneal tendinopathy, tear or subluxation
CHEV-P22. « Où est la douleur : Derrière la malléole externe (tendons fibulaires) » — current LR+ 6, LR− 0.5
CHEV-P23. « Claquement derrière la malléole externe » — current LR+ 6, LR− 0.7
CHEV-P24. « Tendons fibulaires (rétromalléolaire latéral) » — current LR+ 5, LR− 0.3

Target diagnosis: tarsal tunnel syndrome
CHEV-P25. « Engourdissements ou brûlure à la plante du pied » — current LR+ 6, LR− 0.3

Target diagnosis: gout or calcium pyrophosphate arthritis of the ankle
CHEV-P26. « ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte » — current LR+ 6, LR− 1
CHEV-P27. « ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte » — current LR+ 6, LR− 1
CHEV-P28. « Rougeur ou chaleur » — current LR+ 5, LR− 0.5

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Douleur au pied (PIED)

### PIED 1. Fréquences de départ (22 éléments)

```text
Among patients 12 years and older consulting in primary care or sports medicine for foot pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.

PIED-F1. plantar fasciitis (plantar heel pain) — current estimate: 12 y 2%, 20 y 6%, 35 y 15%, 50 y 20%, 65 y 15%, 80 y 10%
PIED-F2. hallux valgus — current estimate: 12 y 2%, 25 y 5%, 45 y 8%, 65 y 12%, 80 y 14%; women ×2.5, men ×0.4
PIED-F3. lesser toe deformities or bunionette — current estimate: 12 y 0.5%, 40 y 3%, 60 y 8%, 75 y 12%, 85 y 14%; women ×1.5, men ×0.7
PIED-F4. midfoot osteoarthritis — current estimate: 12 y 0.1%, 40 y 1%, 55 y 4%, 70 y 6%, 85 y 7%
PIED-F5. hallux rigidus — current estimate: 12 y 0.5%, 30 y 2%, 50 y 5%, 65 y 6%, 80 y 5%
PIED-F6. metatarsalgia or plantar plate injury — current estimate: 12 y 1%, 30 y 5%, 50 y 8%, 70 y 9%, 85 y 8%; women ×1.5, men ×0.7
PIED-F7. gout of the first metatarsophalangeal joint (podagra) — current estimate: 12 y 0.05%, 30 y 1%, 45 y 3%, 60 y 5%, 80 y 6%; men ×2, women ×0.5
PIED-F8. metatarsal, fifth metatarsal base or toe fracture — current estimate: 12 y 8%, 18 y 6%, 35 y 5%, 55 y 6%, 75 y 7%
PIED-F9. Morton neuroma — current estimate: 12 y 0.2%, 25 y 2%, 45 y 5%, 65 y 4%, 80 y 2%; women ×1.6, men ×0.65
PIED-F10. metatarsal stress fracture — current estimate: 12 y 1%, 18 y 3%, 30 y 3%, 50 y 2%, 70 y 2%; women ×1.6, men ×0.65
PIED-F11. navicular stress fracture — current estimate: 12 y 0.3%, 18 y 0.8%, 25 y 0.8%, 40 y 0.3%, 60 y 0.1%
PIED-F12. calcaneal stress fracture — current estimate: 12 y 0.2%, 20 y 0.5%, 40 y 0.4%, 70 y 0.6%
PIED-F13. Lisfranc injury — current estimate: 12 y 0.5%, 20 y 1%, 35 y 1%, 55 y 0.8%, 75 y 0.5%
PIED-F14. turf toe — current estimate: 12 y 0.2%, 20 y 0.8%, 30 y 0.6%, 45 y 0.2%
PIED-F15. sesamoiditis or sesamoid fracture — current estimate: 12 y 0.5%, 20 y 2%, 35 y 1%, 55 y 0.6%
PIED-F16. Charcot neuroarthropathy — current estimate: 12 y 0.01%, 40 y 0.2%, 60 y 0.5%, 80 y 0.5%
PIED-F17. tarsal coalition — current estimate: 10 y 1%, 12 y 1%, 16 y 0.8%, 25 y 0.2%, 40 y 0.05%
PIED-F18. painful accessory navicular — current estimate: 10 y 3%, 12 y 4%, 16 y 2%, 25 y 0.5%, 40 y 0.1%; women ×1.3, men ×0.8
PIED-F19. Freiberg disease — current estimate: 11 y 1%, 14 y 2%, 17 y 1%, 25 y 0.3%, 40 y 0.1%; women ×3, men ×0.35
PIED-F20. Iselin disease — current estimate: 9 y 2%, 11 y 3%, 13 y 2%, 15 y 0.5%, 18 y 0.1%
PIED-F21. Sever disease (calcaneal apophysitis) — current estimate: 9 y 15%, 11 y 12%, 12 y 8%, 13 y 5%, 14 y 2%, 16 y 0.3%, 18 y 0.05%; men ×1.4, women ×0.7
PIED-F22. foot contusion or crush injury — current estimate: 12 y 8%, 18 y 8%, 35 y 6%, 60 y 5%, 80 y 4%

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.
```

### PIED 2. Poids à vérifier et combinaisons (4 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them. The findings come from a French-language questionnaire for foot pain; the French wording is kept in quotes.

Target diagnosis: Morton neuroma
PIED-P1. « Pire dans des chaussures serrées, mieux en les retirant » — current LR+ 3, LR− 0.2
PIED-P2. « Espace intermétatarsien (pincement pouce-index) » — current LR+ 3, LR− 0.1
PIED-P3. « Mulder click test » — current LR+ 4, LR− 0.6

Target diagnosis: navicular stress fracture
PIED-P4. « Naviculaire (face dorsale, point « N ») » — current LR+ 4, LR− 0.3

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### PIED 3. Poids provisoires forts (1 sur 2) (25 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for foot pain; the French wording is kept in quotes.

Target diagnosis: plantar fasciitis (plantar heel pain)
PIED-P5. « Où est la douleur : Sous le talon » — current LR+ 8, LR− 0.1
PIED-P6. « Douleur aux premiers pas du matin ou après le repos » — current LR+ 4, LR− 0.2
PIED-P7. « Tubercule calcanéen médial (insertion du fascia) » — current LR+ 4, LR− 0.2

Target diagnosis: hallux valgus
PIED-P8. « Hallux valgus visible » — current LR+ 10, LR− 0.1

Target diagnosis: lesser toe deformities or bunionette
PIED-P9. « Où est la douleur : Petits orteils » — current LR+ 5, LR− 0.4
PIED-P10. « Orteils en griffe, en marteau ou bunionette » — current LR+ 8, LR− 0.2

Target diagnosis: hallux rigidus
PIED-P11. « Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) » — current LR+ 5, LR− 0.3
PIED-P12. Extension passive de l'hallux = « Limitée par raideur » — current LR 6

Target diagnosis: metatarsalgia or plantar plate injury
PIED-P13. « Où est la douleur : Sous les têtes des métatarsiens » — current LR+ 5, LR− 0.3

Target diagnosis: gout of the first metatarsophalangeal joint (podagra)
PIED-P14. « ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte » — current LR+ 6, LR− 1
PIED-P15. « ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte » — current LR+ 6, LR− 1
PIED-P16. « Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) » — current LR+ 6, LR− 0.2
PIED-P17. « Rougeur ou chaleur » — current LR+ 8, LR− 0.3

Target diagnosis: Morton neuroma
PIED-P18. « Où est la douleur : Entre les orteils (3ᵉ ou 2ᵉ espace), irradiant aux orteils » — current LR+ 8, LR− 0.2

Target diagnosis: metatarsal stress fracture
PIED-P19. « Où est la douleur : Sur un métatarsien, point précis (dos du pied) » — current LR+ 6, LR− 0.3
PIED-P20. « Diaphyse d'un métatarsien » — current LR+ 6, LR− 0.3

Target diagnosis: calcaneal stress fracture
PIED-P21. « Calcanéus en compression latérale » — current LR+ 5, LR− 0.4

Target diagnosis: Lisfranc injury
PIED-P22. « Ecchymose sous le médio-pied » — current LR+ 6, LR− 0.6
PIED-P23. « Ecchymose plantaire du médio-pied » — current LR+ 6, LR− 0.7
PIED-P24. « Base du 2ᵉ métatarsien (articulation de Lisfranc) » — current LR+ 5, LR− 0.2
PIED-P25. « Lisfranc stress test » — current LR+ 5, LR− 0.4

Target diagnosis: turf toe
PIED-P26. « Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) » — current LR+ 5, LR− 0.3

Target diagnosis: sesamoiditis or sesamoid fracture
PIED-P27. « Sésamoïdes (sous la 1ʳᵉ tête) » — current LR+ 6, LR− 0.3

Target diagnosis: Charcot neuroarthropathy
PIED-P28. « Diabète ou neuropathie périphérique » — current LR+ 30, LR− 0.05
PIED-P29. « Rougeur ou chaleur » — current LR+ 5, LR− 0.6

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

### PIED 4. Poids provisoires forts (2 sur 2) (6 éléments)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them. The findings come from a French-language questionnaire for foot pain; the French wording is kept in quotes.

Target diagnosis: tarsal coalition
PIED-P30. Sous-talienne (inversion-éversion du talon) = « Limitée par raideur » — current LR 5

Target diagnosis: painful accessory navicular
PIED-P31. « Où est la douleur : Arche médiale, saillie du naviculaire » — current LR+ 6, LR− 0.3
PIED-P32. « Tubérosité médiale du naviculaire » — current LR+ 6, LR− 0.3

Target diagnosis: Iselin disease
PIED-P33. « Où est la douleur : Bord latéral, base du 5ᵉ métatarsien » — current LR+ 5, LR− 0.4

Target diagnosis: Sever disease (calcaneal apophysitis)
PIED-P34. « Où est la douleur : Arrière ou côtés du talon » — current LR+ 5, LR− 0.3
PIED-P35. « Calcanéus en compression latérale » — current LR+ 5, LR− 0.3

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```
