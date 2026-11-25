# OpenEvidence : nouveaux diagnostics de la cuisse et de la jambe

25 novembre 2026. Choix du Dr Morand : ajouter ces diagnostics aux régions existantes. La cuisse va à la hanche, la jambe à la cheville. Le schéma du corps reçoit une zone « cuisse », qui ouvre la hanche et le genou, et une zone « jambe », qui ouvre le genou et la cheville.

**Comment faire.**
- Coller chaque bloc tel quel dans OpenEvidence, un bloc par question, dans l'ordre.
- Me renvoyer les réponses : les tableaux et leurs références.
- Les codes (ex. `HANC-NF1`) me permettent de remettre chaque chiffre au bon endroit.

**Pourquoi rien n'est encore ajouté au calcul.** Nos bases ne donnent aucune fréquence ni aucune valeur diagnostique pour ces diagnostics. J'ajouterai chaque diagnostic à l'outil dès la réception des réponses. Un diagnostic sans fréquence publiée sera discuté avec vous avant d'être ajouté.

**Ordre.**
1. Fréquences de départ (blocs 1 et 2) : elles fixent le point de départ du calcul.
2. Valeur des signes (blocs 3 et 4).
3. Conduite en première ligne (bloc 5), pour l'aide-mémoire et les fiches.
4. Description exacte des tests ajoutés le 25 novembre (bloc 6), quand vous voulez.

## Bloc 1. Fréquences de départ : cuisse (région Hanche)

```text
Among patients 12 years and older consulting in primary care, sports medicine or the emergency department for hip, groin or thigh pain, what proportion has each of the following diagnoses? These diagnoses will be added to an existing list (hip osteoarthritis, greater trochanteric pain syndrome, adductor-related groin pain, acute hamstring injury, proximal femur fracture, femoroacetabular impingement, iliopsoas, deep gluteal syndrome, meralgia paresthetica, thigh contusion, femoral stress fracture, among others), so give the proportion within that same population.

HANC-NF1. Quadriceps muscle strain or tear (mainly rectus femoris)
HANC-NF2. Acute adductor muscle strain or tear (as opposed to long-standing adductor-related groin pain)
HANC-NF3. Myositis ossificans of the thigh
HANC-NF4. Bone or soft-tissue tumour of the thigh or hip (soft-tissue sarcoma, osteosarcoma, Ewing sarcoma, metastasis, myeloma)
HANC-NF5. Acute compartment syndrome of the thigh

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate. If only an incidence in the general population or among athletes is published (for example injuries per 1000 athlete-exposures), give it with its denominator.
```

## Bloc 2. Fréquences de départ : jambe (région Cheville)

```text
Among patients 12 years and older consulting in primary care, sports medicine or the emergency department for ankle or leg (shin or calf) pain, what proportion has each of the following diagnoses? These diagnoses will be added to an existing list (lateral ankle sprain, Achilles tendinopathy and rupture, ankle fracture, medial tibial stress syndrome, tibial or fibular stress fracture, chronic exertional compartment syndrome, medial gastrocnemius strain (tennis leg), among others), so give the proportion within that same population.

CHEV-NF1. Soleus muscle strain
CHEV-NF2. Popliteal artery entrapment syndrome
CHEV-NF3. Common or superficial fibular (peroneal) nerve entrapment
CHEV-NF4. Deep vein thrombosis of the leg (in patients presenting with calf or leg pain)
CHEV-NF5. Traumatic tibial or fibular shaft fracture
CHEV-NF6. Acute compartment syndrome of the leg
CHEV-NF7. Bone or soft-tissue tumour of the leg (soft-tissue sarcoma, osteosarcoma, Ewing sarcoma, adamantinoma, metastasis)

Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate. If only an incidence in the general population or among athletes is published (for example injuries per 1000 athlete-exposures), give it with its denominator.
```

## Bloc 3. Valeur des signes : cuisse (région Hanche)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it, in patients consulting for hip, groin or thigh pain. Also list any validated clinical decision rule or cluster for that diagnosis, with its accuracy.

Target diagnosis: quadriceps muscle strain or tear (mainly rectus femoris)
HANC-NS1. Sudden anterior thigh pain while sprinting or kicking
HANC-NS2. Palpable defect or mass in the anterior thigh
HANC-NS3. Pain on resisted knee extension or resisted hip flexion
HANC-NS4. Pain on passive knee flexion in prone (prone knee bend, Ely test)
HANC-NS5. Ecchymosis of the thigh

Target diagnosis: acute adductor muscle strain or tear
HANC-NS6. Sudden groin pain during a change of direction, kick or split
HANC-NS7. Pain on resisted adduction (adductor squeeze test)
HANC-NS8. Tenderness of the adductor longus (proximal tendon or muscle belly)
HANC-NS9. Pain on passive abduction stretch

Target diagnosis: myositis ossificans of the thigh
HANC-NS10. Thigh contusion 2 to 4 weeks earlier with a persisting or enlarging firm mass
HANC-NS11. Limited knee flexion after a thigh contusion (give the threshold studied)
HANC-NS12. Contusion severity, sports setting, early massage or re-injury (risk factors)
HANC-NS13. Calcification on plain radiograph at 3 to 4 weeks

Target diagnosis: bone or soft-tissue tumour of the thigh or hip
HANC-NS14. Night pain or pain at rest
HANC-NS15. Soft-tissue mass larger than 5 cm, deep to the fascia, enlarging, or painless
HANC-NS16. Mass without a clear injury, or "haematoma" that does not resolve
HANC-NS17. Unexplained weight loss or past history of cancer

Target diagnosis: acute compartment syndrome of the thigh
HANC-NS18. Pain out of proportion to the injury
HANC-NS19. Pain on passive stretch of the compartment muscles
HANC-NS20. Tense, swollen thigh compartment
HANC-NS21. High-energy trauma, femoral fracture or anticoagulation

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Bloc 4. Valeur des signes : jambe (région Cheville)

```text
For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it, in patients consulting for ankle or leg (shin or calf) pain. Also list any validated clinical decision rule or cluster for that diagnosis, with its accuracy.

Target diagnosis: soleus muscle strain
CHEV-NS1. Calf pain of gradual onset, or felt only after running (as opposed to a sudden "kick" in the calf)
CHEV-NS2. Pain on a single-leg heel raise with the knee bent, more than with the knee straight
CHEV-NS3. Deep tenderness in the lower or middle calf, beside the Achilles tendon
CHEV-NS4. Ability to keep walking or running after the onset

Target diagnosis: popliteal artery entrapment syndrome
CHEV-NS5. Exertional calf claudication in a young athlete
CHEV-NS6. Foot paresthesia or coldness with exercise
CHEV-NS7. Loss or decrease of distal pulses with active plantar flexion or passive dorsiflexion
CHEV-NS8. Drop of the ankle-brachial index after exercise or with provocative positions

Target diagnosis: common or superficial fibular (peroneal) nerve entrapment
CHEV-NS9. Numbness of the dorsum of the foot or of the first web space
CHEV-NS10. Tinel sign at the fibular head, or where the superficial fibular nerve exits the fascia above the lateral malleolus
CHEV-NS11. Weakness of ankle dorsiflexion or eversion (foot drop)
CHEV-NS12. Symptoms brought on by exercise

Target diagnosis: deep vein thrombosis of the leg
CHEV-NS13. Wells score for deep vein thrombosis (each probability category)
CHEV-NS14. Calf circumference more than 3 cm larger than the other side
CHEV-NS15. Pitting oedema limited to the symptomatic leg
CHEV-NS16. Tenderness along the deep venous system
CHEV-NS17. Homans sign
CHEV-NS18. Negative D-dimer (by Wells category)

Target diagnosis: traumatic tibial or fibular shaft fracture
CHEV-NS19. Direct blow or twisting injury with inability to bear weight
CHEV-NS20. Visible deformity
CHEV-NS21. Point bone tenderness of the tibial or fibular shaft

Target diagnosis: acute compartment syndrome of the leg
CHEV-NS22. Pain out of proportion to the injury
CHEV-NS23. Pain on passive stretch of the compartment muscles
CHEV-NS24. Paresthesia, then weakness, in the territory of the compartment nerves
CHEV-NS25. Tense compartment on palpation
CHEV-NS26. Tibial fracture, crush injury or anticoagulation
CHEV-NS27. Combination of two or more clinical findings

Target diagnosis: bone or soft-tissue tumour of the leg
CHEV-NS28. Night pain or pain at rest
CHEV-NS29. Soft-tissue mass larger than 5 cm, deep to the fascia, enlarging, or painless
CHEV-NS30. Bone pain in an adolescent without injury, or persisting more than 3 to 4 weeks

Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.
```

## Bloc 5. Conduite en première ligne (Québec)

```text
For each diagnosis below, summarise the recommended primary-care management in Quebec, Canada: investigations (which imaging, when), initial treatment, criteria for urgent referral, for non-urgent referral, and return to sport or work. Prefer Canadian or Quebec guidance (INESSS, Choosing Wisely Canada, Canadian societies), then NICE, AAOS, BJSM or JOSPT. Give one reference (first author, journal, year, PMID or DOI) for each recommendation and write "no guidance" when none exists; do not estimate.

1. Quadriceps muscle strain or tear (rectus femoris)
2. Acute adductor muscle strain or tear
3. Myositis ossificans of the thigh
4. Suspected bone or soft-tissue tumour of the thigh or leg
5. Acute compartment syndrome of the thigh or leg
6. Soleus muscle strain
7. Popliteal artery entrapment syndrome
8. Common or superficial fibular (peroneal) nerve entrapment
9. Suspected deep vein thrombosis of the leg in an outpatient with calf pain
10. Traumatic tibial or fibular shaft fracture
```

## Bloc 6. Description de tests ajoutés à l'outil le 25 novembre

Ces tests sont dans l'outil avec les chiffres de notre base FlashCards, au statut « à vérifier ». Leurs chiffres partent aussi dans la liste habituelle (`openevidence-a-verifier.md`). Ce bloc-ci demande seulement comment faire chaque test, pour que la description affichée dans l'outil soit exacte.

```text
For each test below, describe exactly how to perform it as in the original study: patient position, examiner hands, manoeuvre, and what counts as a positive result. Give the original reference (first author, journal, year, PMID or DOI). Write "unknown" if the original description cannot be found; do not guess.

T1. HEC test for iliopsoas tendinopathy (Vandeputte et al., Clin Orthop Relat Res 2025)
T2. Reversed dynamic patellar apprehension test (Zimmermann et al., Knee Surg Sports Traumatol Arthrosc 2019)
T3. Thumb metacarpal extension test and thumb metacarpal adduction test for trapeziometacarpal arthritis (Gelberman et al., J Hand Surg 2015)
T4. Active piriformis test and seated piriformis stretch test (Martin et al., Knee Surg Sports Traumatol Arthrosc 2014)
T5. Kim test and jerk test for posterior shoulder instability (Kim et al., Am J Sports Med 2005)
T6. Modified Trendelenburg test and symphysis palpation for pregnancy-related pelvic girdle pain (original source and accuracy)
T7. Clinical criteria of Liu et al. for anterolateral ankle impingement (Am J Sports Med 1997): list the six findings and the threshold
T8. Pelvic compression test for meralgia paresthetica (Nouraei et al., Neurosurgery 2007)
```
