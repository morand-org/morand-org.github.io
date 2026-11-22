# Douleur au genou : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs genou` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 496 (validés 0, vérifiés 45, à vérifier 3, provisoires 448).

## Syndrome fémoro-patellaire

Probabilité de départ (provisoire) : 12 ans 25 %, 16 ans 32 %, 28 ans 20 %, 45 ans 10 %, 55 ans 5 %, 70 ans 2 % ; femme ×1,5, homme ×0,7.

Repères publiés : 28,9 % des adolescents par an ; 25–40 % des gonalgies avant 45 ans et en clinique du sport ; 20,4 % des diagnostics de surmenage chez l'enfant (A249–251, C176).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>sfp` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>sfp` | Genou atteint | — | — | Les deux 1,8 | provisoire | — |
| `sport.aucun>sfp` | Activités physiques : Peu ou pas de sport | — | — | 0,8 / 1 | provisoire | — |
| `sport.course>sfp` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `sport.velo>sfp` | Activités physiques : Vélo | — | — | 1,3 / 1 | provisoire | — |
| `sport.danse>sfp` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,4 / 1 | provisoire | — |
| `sport.muscu>sfp` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,2 / 1 | provisoire | — |
| `sport.natation>sfp` | Activités physiques : Natation | — | — | 1,1 / 1 | provisoire | — |
| `premier>sfp` | Premier épisode | — | — | 0,8 / 1,3 | provisoire | — |
| `duree>sfp` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; 1 à 6 semaines 0,9 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 1,4 | provisoire | — |
| `apparition>sfp` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 0,5 ; Graduel 1,8 ; Insidieux 1,8 | provisoire | — |
| `localisation.anterieure>sfp` | Où est la douleur : Antérieure, autour de la rotule | — | — | 3 / 0,3 | provisoire | — |
| `localisation.pole_inf>sfp` | Où est la douleur : Sous la rotule (tendon rotulien) | — | — | 1,2 / 1 | provisoire | — |
| `localisation.anteromediale>sfp` | Où est la douleur : Antéro-médiale, au bord interne de la rotule | — | — | 1,2 / 1 | provisoire | — |
| `localisation.diffuse>sfp` | Où est la douleur : Diffuse, mal localisée | — | — | 1,3 / 1 | provisoire | — |
| `type_douleur>sfp` | Type de douleur | — | — | Pression, comme un bleu 1,1 | provisoire | — |
| `escaliers>sfp` | Pire dans les escaliers | — | — | 1,8 / 0,4 | provisoire | — |
| `assis>sfp` | Pire en position assise prolongée | — | — | 2,5 / 0,6 | provisoire | — |
| `accroupi>sfp` | Pire accroupi ou à genoux | — | — | 1,8 / 0,5 | provisoire | — |
| `course_saut>sfp` | Pire à la course ou au saut | — | — | 1,5 / 0,7 | provisoire | — |
| `moment>sfp` | Horaire | — | — | Pire le matin, mieux en bougeant 0,7 ; Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>sfp` | Douleur la nuit | — | — | 0,6 / 1,1 | provisoire | — |
| `derobade>sfp` | Dérobements (le genou lâche) | — | — | 1,2 / 0,95 | provisoire | — |
| `accrochage>sfp` | Accrochages | — | — | 1,2 / 0,95 | provisoire | — |
| `enflure>sfp` | Enflure du genou (actuelle ou récurrente) | — | — | 0,4 / 1,2 | provisoire | — |
| `posture>sfp` | Posture | — | — | Genu valgum 1,3 | provisoire | — |
| `arches>sfp` | Arches plantaires | — | — | Affaissées 1,3 | provisoire | — |
| `trendelenburg>sfp` | Trendelenburg | — | — | Positif 1,2 | provisoire | — |
| `squat_bi>sfp` | Squat bipodal (positif : douleur antérieure) | 91 % | 50 % | 1,82 / 0,18 | verifie | Duong et coll., 2023, JAMA (revue) : douleur antérieure à l'accroupissement ; indolore, le diagnostic est peu probable |
| `squat_uni>sfp` | Squat unipodal | — | — | Valgus dynamique 1,5 ; Douloureux 1,3 | provisoire | — |
| `ex_atrophie>sfp` | Atrophie du quadriceps | — | — | 1,2 / 0,95 | provisoire | — |
| `flot>sfp` | Flot (signe du flot) | — | — | Négatif 1,2 ; Légèrement positif 0,6 ; Positif 0,4 | provisoire | — |
| `glacon>sfp` | Test du glaçon | — | — | Positif 0,3 | provisoire | — |
| `p_rotule>sfp` | Rotule | — | — | 1,3 / 0,9 | provisoire | — |
| `p_facettes>sfp` | Facettes rotuliennes | — | — | 2 / 0,5 | provisoire | — |
| `arom_flexion>sfp` | Flexion active | — | — | Complète, fin douloureuse 1,2 | provisoire | — |
| `rrom_extension>sfp` | Extension résistée | — | — | 1,2 / 0,95 | provisoire | — |
| `mobilite_rotule>sfp` | Mobilité rotulienne | — | — | Diminuée 1,2 | provisoire | — |
| `clarke>sfp` | Clarke (rabot) | 39 % | 67 % | 1,18 / 0,91 | a_verifier | Nunes et coll., 2013 ou Cook et coll., 2012 (revues systématiques) |
| `mcconnell>sfp` | McConnell | — | — | 2 / 0,7 | provisoire | — |
| `crepitants>sfp` | Crépitants | — | — | 1,2 / 0,95 | provisoire | — |
| `grappe:sfp_decary>sfp` | Combinaison : Décary : moins de 40 ans + douleur antérieure isolée ou facettes rotuliennes douloureuses | — | — | 8,7 / — | verifie | Décary et coll., 2018 (Arch Phys Med Rehabil), PMID 29128344 : Sp 93 %, RV+ 8,7 |
| `grappe:sfp_2sur3>sfp` | Combinaison : 2 sur 3 : extension résistée, palpation rotulienne, accroupissement douloureux | — | — | 4 / — | verifie | McClinton et coll., 2020 (Curr Rev Musculoskelet Med) : RV+ 4,0 |
| `grappe:sfp_moins2>sfp` | Combinaison : Moins de 2 sur 3 : extension résistée, palpation rotulienne, accroupissement | — | — | — / 0,5 | verifie | McClinton et coll., 2020 (Curr Rev Musculoskelet Med) : RV− 0,5 |

Conduite :
- Diagnostic clinique ; pas d'imagerie initiale. Radiographies (avec axiale) si échec, épanchement, trauma ou tableau atypique chez l'adolescent (ostéochondrite) — *Collins et coll., 2018, BJSM (PMID 29925502) ; APTA, 2020 (AFP)*
- Éducation et dosage de la charge (escaliers, accroupissements, sauts, course) ; chez l'adolescent, viser une douleur de 2/10 ou moins avec reprise par paliers — *Winters et coll., 2020, BJSM (PMID 33106251)*
- Consultation en physiothérapie : exercices de la hanche et du genou à volume élevé, 3 fois par semaine ; éviter l'attente passive — *Collins et coll., 2018, BJSM*
- Taping ou orthèses plantaires préfabriquées en appoint à court terme (environ 6 sem) — *Collins et coll., 2018, BJSM*
- Suivi dans 4–6 sem, puis à 3 mois (jusqu'à 1 patient sur 2 garde des douleurs à long terme)
- Revoir si enflure, blocage, instabilité ou douleur nocturne

## Arthrose du genou

Probabilité de départ (provisoire) : 12 ans 0 %, 16 ans 1 %, 28 ans 3 %, 45 ans 18 %, 55 ans 33 %, 70 ans 50 %, 85 ans 60 % ; femme ×1,25, homme ×0,8.

Repères publiés : Symptomatique chez 12,1 % après 60 ans (environ 20 % après 65 ans) ; risque sur la vie d'environ 45 % ; 7,8 % à 45–64 ans (A216–248, C179).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>arthrose` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>arthrose` | Genou atteint | — | — | Les deux 1,5 | provisoire | — |
| `travail>arthrose` | Occupation | — | — | Travail physique (charges, manutention) 1,2 ; Travail à genoux (plancher, toiture, plomberie…) 1,2 | provisoire | — |
| `sport.marche>arthrose` | Activités physiques : Marche ou randonnée | — | — | 1,1 / 1 | provisoire | — |
| `atcd_genou>arthrose` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,8 / 0,85 | provisoire | — |
| `obesite>arthrose` | Obésité (IMC 30 ou plus) | — | — | 1,6 / 0,85 | provisoire | — |
| `premier>arthrose` | Premier épisode | — | — | 0,7 / 1,5 | provisoire | — |
| `duree>arthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 1 à 6 semaines 0,7 ; 6 semaines à 3 mois 1,1 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>arthrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,8 ; Insidieux 2 | provisoire | — |
| `localisation.interligne_med>arthrose` | Où est la douleur : Interligne médial | — | — | 1,8 / 0,7 | provisoire | — |
| `localisation.interligne_lat>arthrose` | Où est la douleur : Interligne latéral | — | — | 1,2 / 0,95 | provisoire | — |
| `localisation.diffuse>arthrose` | Où est la douleur : Diffuse, mal localisée | — | — | 1,3 / 1 | provisoire | — |
| `type_douleur>arthrose` | Type de douleur | — | — | Pression, comme un bleu 1,1 ; Sourde, profonde 1,2 | provisoire | — |
| `escaliers>arthrose` | Pire dans les escaliers | — | — | 1,5 / 0,6 | provisoire | — |
| `marche>arthrose` | Pire à la marche | 95 % | 19 % | 1,17 / 0,26 | verifie | Duong et coll., 2023, JAMA (revue) : douleur à l'activité |
| `assis>arthrose` | Pire en position assise prolongée | — | — | 1,2 / 0,95 | provisoire | — |
| `moment>arthrose` | Horaire | — | — | Pire le matin, mieux en bougeant 0,9 ; Pire en fin de journée ou après l'activité 1,4 | provisoire | — |
| `nocturne>arthrose` | Douleur la nuit | — | — | 1,3 / 0,9 | provisoire | — |
| `raideur>arthrose` | Raideur matinale | — | — | Moins de 30 minutes 1,83 ; 30 minutes ou plus 0,23 | verifie | Duong et coll., 2023, JAMA (revue) : raideur matinale de moins de 30 min, Se 88 %, Sp 52 % |
| `derobade>arthrose` | Dérobements (le genou lâche) | 26 % | 79 % | 1,24 / 0,94 | verifie | Duong et coll., 2023, JAMA (revue) : dérobade, RV+ 1,24 |
| `blocage>arthrose` | Blocages vrais (impossible d'étendre le genou) | — | — | 1,2 / 1 | provisoire | — |
| `accrochage>arthrose` | Accrochages | — | — | 1,2 / 0,95 | provisoire | — |
| `enflure>arthrose` | Enflure du genou (actuelle ou récurrente) | 43 % | 41 % | 0,73 / 1,39 | verifie | Duong et coll., 2023, JAMA (revue) : gonflement rapporté, RV+ 0,73 |
| `rougeur_chaleur>arthrose` | Rougeur ou chaleur | — | — | 0,6 / 1 | provisoire | — |
| `posture>arthrose` | Posture | — | — | Genu valgum 1,1 ; Genu varum 1,3 ; Flexum 1,8 | provisoire | — |
| `demarche>arthrose` | Démarche | — | — | Boiterie antalgique 1,2 | provisoire | — |
| `squat_bi>arthrose` | Squat bipodal | — | — | Douleur médiale 1,3 ; Limité 1,5 | provisoire | — |
| `ex_chaleur>arthrose` | Rougeur ou chaleur | — | — | 0,5 / 1,1 | provisoire | — |
| `ex_atrophie>arthrose` | Atrophie du quadriceps | — | — | 1,5 / 0,9 | provisoire | — |
| `ex_tumefaction.osseux>arthrose` | Tuméfaction localisée : Élargissement osseux (ostéophytes) | 55 % | 95 % | 11 / 0,47 | verifie | Duong et coll., 2023, JAMA (revue) ; Katz et coll., 2021, JAMA (revue) : élargissement osseux, RV+ 11 |
| `flot>arthrose` | Flot (signe du flot) | — | — | Négatif 0,8 ; Légèrement positif 1,5 ; Positif 1,4 | provisoire | — |
| `glacon>arthrose` | Test du glaçon | — | — | Positif 1,3 | provisoire | — |
| `p_interlignes>arthrose` | Interlignes | — | — | Indolores 0,8 ; Médial douloureux 1,5 ; Médial et latéral douloureux 1,5 | provisoire | — |
| `p_rebords>arthrose` | Rebords osseux articulaires | — | — | 1,8 / 0,8 | provisoire | — |
| `arom_flexion>arthrose` | Flexion active | — | — | Complète et indolore 0,6 ; Limitée avec douleur 1,3 ; Limitée par raideur 2,5 | provisoire | — |
| `arom_extension>arthrose` | Extension active | — | — | Complète et indolore 0,8 ; Déficit par raideur 2,5 | provisoire | — |
| `prom_flexion>arthrose` | Flexion passive | — | — | Complète et indolore 0,86 ; Limitée avec douleur 4,3 ; Limitée par raideur 4,3 | verifie | Duong et coll., 2023, JAMA (revue) : amplitude restreinte, Se 17 %, Sp 96 % |
| `prom_extension>arthrose` | Extension passive | — | — | Complète et indolore 0,8 ; Déficit par raideur 2 | provisoire | — |
| `mobilite_rotule>arthrose` | Mobilité rotulienne | — | — | Diminuée 1,5 | provisoire | — |
| `crepitants>arthrose` | Crépitants | 89 % | 59 % | 2,17 / 0,19 | verifie | Duong et coll., 2023, JAMA (revue) ; Katz et coll., 2021, JAMA (revue) : crépitus à la mobilisation |
| `grappe:oa_acr4>arthrose` | Combinaison : Critères cliniques de l'ACR : 4 sur 6 ou plus | 84 % | 89 % | 7,6 / — | verifie | Gelber, 2024 (Ann Intern Med) : critères cliniques de l'ACR : 4 sur 6, Se 84 %, Sp 89 % (RV calculé) |
| `grappe:oa_acr3>arthrose` | Combinaison : Critères cliniques de l'ACR : 3 sur 6 | 95 % | 69 % | 3,1 / — | verifie | Gelber, 2024 (Ann Intern Med) : critères cliniques de l'ACR : 3 sur 6 ou plus, Se 95 %, Sp 69 % (RV calculé) |
| `grappe:oa_acr_neg>arthrose` | Combinaison : Critères cliniques de l'ACR : moins de 3 sur 6 | — | — | — / 0,07 | verifie | Gelber, 2024 (Ann Intern Med) : critères cliniques de l'ACR : moins de 3 sur 6, RV− 0,07 (calculé) |
| `grappe:oa_nice>arthrose` | Combinaison : Règle NICE : 45 ans ou plus, douleur à l'activité, raideur matinale de 30 min ou moins | 84 % | 85 % | 5,6 / — | verifie | King et coll., 2025 (Arthritis Care Res) : règle NICE, diagnostic du rhumatologue : Se 84 %, Sp 85 % (RV calculé) |
| `grappe:oa_nice_neg>arthrose` | Combinaison : Règle NICE négative | — | — | — / 0,19 | verifie | King et coll., 2025 (Arthritis Care Res) : règle NICE, diagnostic du rhumatologue : RV− 0,19 (calculé) |

Conduite :
- Diagnostic clinique si 45 ans ou plus, douleur liée à l'activité et raideur matinale absente ou de 30 min ou moins : ni imagerie ni bilan sanguin — *NICE NG226, 2022 ; King et coll., 2025 (Arthritis Care Res)*
- Radiographies en charge avec incidence axiale seulement si tableau atypique, progression rapide ou arthroplastie envisagée ; IRM rarement indiquée — *Duong et coll., 2023, JAMA (revue) ; Choisir avec soin Canada*
- Éducation, exercice (supervisé de préférence ; GLA:D Canada), perte de poids de 5–10 % si surpoids, canne ou orthèse au besoin — *Kolasinski et coll., 2020, ACR/Arthritis Foundation (Arthritis Rheumatol) ; Bannuru et coll., 2019, OARSI (PMID 31278997)*
- Diclofénac topique en premier ; AINS oral en cure courte ; duloxétine en option (30 mg DIE 7 j, puis 60 mg DIE ; bénéfice modeste) — *Bannuru et coll., 2019, OARSI (PMID 31278997) ; Kolasinski et coll., 2020, ACR/Arthritis Foundation (Arthritis Rheumatol)*
- Infiltration de corticoïde pour une poussée (triamcinolone 40 mg ; bénéfice de 1 à 6 sem ; espacer d'au moins 3–4 mois) — *Jüni et coll., 2015, Cochrane*
- Pas d'acide hyaluronique (déconseillé par l'ACR et le NICE ; option conditionnelle pour l'OARSI), ni de plasma riche en plaquettes, ni d'opioïdes — *Kolasinski et coll., 2020, ACR/Arthritis Foundation (Arthritis Rheumatol) ; Bannuru et coll., 2019, OARSI (PMID 31278997)*
- Pas d'arthroscopie pour une atteinte dégénérative, même avec symptômes mécaniques — *Mar, 2017, Ann Intern Med ; Siemieniuk et coll., 2017, BMJ*
- Suivi dans 3 mois
- Orthopédie si atteinte radiographique modérée à sévère avec douleur ou perte fonctionnelle importantes malgré 6 mois de traitement bien conduit : CRDS AH-753, priorité D, avec rapport de radiographie — *Hannon et coll., 2023, ACR/AAHKS ; formulaire AH-753 (CRDS)*

## Déchirure méniscale

Probabilité de départ (provisoire) : 12 ans 3 %, 16 ans 6 %, 28 ans 9 %, 45 ans 12 %, 60 ans 12 %, 75 ans 10 % ; homme ×1,2, femme ×0,85.

Repères publiés : 61–79/100 000/an ; 9 % des gonalgies de l'adulte en première ligne ; fortuite chez 19 % des adultes indolores de plus de 40 ans (A4, A252, C2).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>menisque` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>menisque` | Genou atteint | — | — | Les deux 0,5 | provisoire | — |
| `travail>menisque` | Occupation | — | — | Travail physique (charges, manutention) 1,2 ; Travail à genoux (plancher, toiture, plomberie…) 1,3 | provisoire | — |
| `sport.pivot>menisque` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,4 / 1 | provisoire | — |
| `sport.raquette>menisque` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>menisque` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,3 / 1 | provisoire | — |
| `atcd_genou>menisque` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,4 / 0,95 | provisoire | — |
| `premier>menisque` | Premier épisode | — | — | 1,2 / 0,9 | provisoire | — |
| `duree>menisque` | Depuis combien de temps | — | — | Moins de 7 jours 1,3 ; 1 à 6 semaines 1,2 | provisoire | — |
| `apparition>menisque` | Mode d'apparition | — | — | Subit, avec un traumatisme 2 ; Subit, sans traumatisme 1,3 ; Graduel 0,8 ; Insidieux 0,8 | provisoire | — |
| `mecanisme>menisque` | Mécanisme | — | — | Pivot ou torsion, pied au sol 2 ; Décélération ou réception de saut 1,2 ; Coup ou stress en valgus (de l'extérieur) 1,2 ; En s'accroupissant ou en se relevant 3 | provisoire | — |
| `pop>menisque` | Pop au moment de la blessure | — | — | 1,2 / 0,9 | provisoire | — |
| `enflure_rapide>menisque` | Œdème en moins de 2 heures | — | — | 0,8 / 1 | provisoire | — |
| `enflure_tardive>menisque` | Œdème après quelques heures (6 à 24 h) | — | — | 2 / 0,8 | provisoire | — |
| `localisation.interligne_med>menisque` | Où est la douleur : Interligne médial | — | — | 2,5 / 0,5 | provisoire | — |
| `localisation.interligne_lat>menisque` | Où est la douleur : Interligne latéral | — | — | 1,8 / 0,8 | provisoire | — |
| `localisation.posterieure>menisque` | Où est la douleur : Postérieure (creux poplité) | — | — | 1,3 / 0,95 | provisoire | — |
| `type_douleur>menisque` | Type de douleur | — | — | Aiguë, en coup de poignard 1,3 | provisoire | — |
| `pivots_agg>menisque` | Pire en pivotant | — | — | 1,8 / 0,7 | provisoire | — |
| `escaliers>menisque` | Pire dans les escaliers | — | — | 1,1 / 0,95 | provisoire | — |
| `marche>menisque` | Pire à la marche | — | — | 1,2 / 0,9 | provisoire | — |
| `accroupi>menisque` | Pire accroupi ou à genoux | — | — | 1,6 / 0,7 | provisoire | — |
| `moment>menisque` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `derobade>menisque` | Dérobements (le genou lâche) | 44 % | 84 % | 2,72 / 0,67 | verifie | Yan et coll., 2011 (Swiss Med Wkly, cohorte chirurgicale), PMID 22180191 : dérobade |
| `blocage>menisque` | Blocages vrais (impossible d'étendre le genou) | — | — | 2 / 0,8 | a_verifier | Blocage : Se 55 %, Sp 96 % en cohorte chirurgicale (Yan et coll., 2011 (Swiss Med Wkly, cohorte chirurgicale), PMID 22180191), mais Se 32–69 %, Sp 45–74 % sur 38 études (McHugh et coll., 2022 (Osteoarthritis Cartilage), PMID 34600120) et non associé après 45 ans (Katz et coll., 2017) : valeur prudente |
| `accrochage>menisque` | Accrochages | — | — | 1,5 / 0,8 | provisoire | — |
| `ressaut>menisque` | Ressaut ou claquement (le genou « saute ») | — | — | 1,2 / 0,95 | provisoire | — |
| `enflure>menisque` | Enflure du genou (actuelle ou récurrente) | — | — | 1,4 / 0,8 | provisoire | — |
| `posture>menisque` | Posture | — | — | Genu varum 1,1 ; Flexum 1,2 | provisoire | — |
| `demarche>menisque` | Démarche | — | — | Boiterie antalgique 1,2 | provisoire | — |
| `squat_bi>menisque` | Squat bipodal | — | — | Normal et indolore 0,8 ; Douleur médiale 2 ; Douleur latérale 1,5 | provisoire | — |
| `duck_walk>menisque` | Duck walk (positif : douloureux ou impossible) | 76 % | 39 % | 1,25 / 0,62 | verifie | Snoeker et coll., 2015 (JOSPT, IRM), PMID 26161628 : accroupissement profond ou marche en canard, Se 75–77 %, Sp 36–42 % |
| `flot>menisque` | Flot (signe du flot) | — | — | Négatif 0,7 ; Légèrement positif 1,5 ; Positif 1,5 | provisoire | — |
| `glacon>menisque` | Test du glaçon | — | — | Positif 1,5 | provisoire | — |
| `p_interlignes>menisque` | Interlignes (positif : médial douloureux, latéral douloureux, médial et latéral douloureux) | 63 % | 77 % | 2,74 / 0,48 | verifie | Hegedus et coll., 2007, méta-analyse (JOSPT), PMID 17939613 : douleur à l'interligne |
| `arom_flexion>menisque` | Flexion active | — | — | Complète et indolore 0,8 ; Complète, fin douloureuse 1,3 ; Limitée avec douleur 1,5 | provisoire | — |
| `arom_extension>menisque` | Extension active | — | — | Complète et indolore 0,85 ; Déficit avec douleur 1,5 ; Blocage mécanique 4 | provisoire | — |
| `prom_flexion>menisque` | Flexion passive | — | — | Limitée avec douleur 1,3 | provisoire | — |
| `prom_extension>menisque` | Extension passive | — | — | Blocage mécanique 3 | provisoire | — |
| `mcmurray>menisque` | McMurray (positif : positif médial, positif latéral) | 70 % | 71 % | 2,41 / 0,42 | verifie | Hegedus et coll., 2007, méta-analyse (JOSPT), PMID 17939613 |
| `thessaly>menisque` | Thessaly (20°) | 64 % | 53 % | 1,36 / 0,68 | verifie | Goossens et coll., 2015 (JOSPT, n = 593), PMID 25420009 : arthroscopie |
| `apley>menisque` | Apley | 60 % | 70 % | 2 / 0,57 | verifie | Hegedus et coll., 2007, méta-analyse (JOSPT), PMID 17939613 |
| `grappe:men_trauma>menisque` | Combinaison : Décary : pivot + douleur médiale + interligne médial douloureux | — | — | 8,9 / — | verifie | Décary et coll., 2018 (PM&R), PMID 29111463 : lésion méniscale traumatique, RV+ 8,9 (6,1–13,1) |
| `grappe:men_degen>menisque` | Combinaison : Décary : début progressif + douleur médiale + douleur aux pivots + alignement normal | — | — | 6,4 / — | verifie | Décary et coll., 2018 (PM&R), PMID 29111463 : lésion méniscale dégénérative, RV+ 6,4 (4,0–10,4) |

Conduite :
- Lésion probablement dégénérative (40–45 ans et plus) : pas d'IRM de routine — *Duong et coll., 2023, JAMA (revue) ; Choisir avec soin Canada*
- Trauma en torsion chez le sujet jeune avec épanchement ou blocage : IRM — *Duong et coll., 2023, JAMA (revue)*
- Dégénérative : physiothérapie 3 mois ou plus ; la méniscectomie n'est pas supérieure à la chirurgie placebo (FIDELITY) et la physiothérapie est non inférieure à 2 et 5 ans (ESCAPE) — *Sihvonen et coll., 2018 (FIDELITY) ; Noorduyn et coll., 2022 (ESCAPE) ; Hunter et coll., 2019, Lancet*
- Traumatique sans blocage : essai d'exercices de 4–12 sem acceptable — *Duong et coll., 2023, JAMA (revue)*
- Suivi dans 6 sem, puis à 3 mois
- Orthopédie en 1–2 sem si genou verrouillé (anse de seau), lésion associée à une rupture du LCA ou dérobements après trauma ; sinon CRDS AH-753, priorité D, avec rapport d'IRM — *Duong et coll., 2023, JAMA (revue) ; formulaire AH-753 (CRDS)*

## Rupture du LCA

Probabilité de départ (provisoire) : 12 ans 3 %, 16 ans 6 %, 25 ans 6 %, 40 ans 3 %, 55 ans 2 %, 70 ans 1 % ; femme ×1,2, homme ×0,9.

Repères publiés : 68,6/100 000 p-a ; pic de 228 chez les filles de 14–18 ans ; 4 % des gonalgies aiguës de l'adulte ; 15,4 % des adultes consultant pour le genou (Décary 2018) ; 22–40 % des hémarthroses de l'adolescent (A261, C7).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>lca` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>lca` | Genou atteint | — | — | Les deux 0,3 | provisoire | — |
| `sport.aucun>lca` | Activités physiques : Peu ou pas de sport | — | — | 0,5 / 1 | provisoire | — |
| `sport.pivot>lca` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2 / 1 | provisoire | — |
| `sport.raquette>lca` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>lca` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,6 / 1 | provisoire | — |
| `sport.glisse>lca` | Activités physiques : Ski ou planche | — | — | 2 / 1 | provisoire | — |
| `atcd_genou>lca` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,2 / 1 | provisoire | — |
| `premier>lca` | Premier épisode | — | — | 1,5 / 0,7 | provisoire | — |
| `duree>lca` | Depuis combien de temps | — | — | Moins de 7 jours 2 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 0,7 ; Plus de 3 mois 0,5 | provisoire | — |
| `apparition>lca` | Mode d'apparition | — | — | Subit, avec un traumatisme 4 ; Subit, sans traumatisme 0,3 ; Graduel 0,15 ; Insidieux 0,1 | provisoire | — |
| `mecanisme.pivot>lca` | Mécanisme | — | — | Pivot ou torsion, pied au sol 5 | verifie | Décary et coll., 2018 (PLoS One), PMID 29894492 : pivot contre tout autre mécanisme (RV− 0,25 en l'absence de pivot) |
| `mecanisme>lca` | Mécanisme | — | — | Décélération ou réception de saut 2,5 ; Coup ou stress en valgus (de l'extérieur) 1,5 ; Coup ou stress en varus (de l'intérieur) 1,2 ; Coup direct sur le genou 0,6 ; Hyperextension 2 ; En s'accroupissant ou en se relevant 0,3 ; Coup sur le tibia, genou fléchi (chute sur le genou, tableau de bord) 0,8 | provisoire | — |
| `pop>lca` | Pop au moment de la blessure | — | — | 2,3 / 0,51 | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 : Se 63 %, Sp 73 % |
| `enflure_rapide>lca` | Œdème en moins de 2 heures | — | — | 3 / 0,4 | provisoire | Décary et coll., 2018 (PLoS One), PMID 29894492 : épanchement immédiat RV+ 11,0, RV− 0,34, pour la rupture complète seulement ; « immédiat » non défini en heures (à confirmer) |
| `enflure_tardive>lca` | Œdème après quelques heures (6 à 24 h) | — | — | 0,8 / 1 | provisoire | — |
| `poursuivre>lca` | A pu poursuivre l'activité | — | — | 0,5 / 2 | provisoire | — |
| `ecchymose>lca` | Ecchymose | — | — | 1,3 / 0,9 | provisoire | — |
| `pivots_agg>lca` | Pire en pivotant | — | — | 1,5 / 0,8 | provisoire | — |
| `derobade>lca` | Dérobements (le genou lâche) | — | — | 1,6 / 0,6 | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 : Se 61 %, Sp 63 % |
| `enflure>lca` | Enflure du genou (actuelle ou récurrente) | — | — | 1,6 / 0,8 | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 (enflure rapportée au questionnaire) |
| `demarche>lca` | Démarche | — | — | Boiterie antalgique 1,3 ; Incapable de mettre du poids 1,5 | provisoire | — |
| `appui_uni>lca` | Appui unipodal | — | — | Instable ou douloureux 1,3 | provisoire | — |
| `ex_ecchymose>lca` | Ecchymose | — | — | 1,3 / 0,95 | provisoire | — |
| `ex_atrophie>lca` | Atrophie du quadriceps | — | — | 1,3 / 0,95 | provisoire | — |
| `flot>lca` | Flot (signe du flot) | — | — | Négatif 0,5 ; Légèrement positif 1,3 ; Positif 2 | provisoire | — |
| `glacon>lca` | Test du glaçon | — | — | Négatif 0,7 ; Positif 3 | provisoire | — |
| `arom_flexion>lca` | Flexion active | — | — | Limitée avec douleur 1,4 | provisoire | — |
| `arom_extension>lca` | Extension active | — | — | Déficit avec douleur 1,5 | provisoire | — |
| `lachman>lca` | Lachman (positif : laxité) | 81 % | 85 % | 5,4 / 0,22 | verifie | Sokal et coll., 2022, méta-analyse bivariée (Knee Surg Sports Traumatol Arthrosc), PMID 35150292 |
| `tiroir_ant>lca` | Tiroir antérieur (positif : laxité) | 83 % | 85 % | 5,53 / 0,2 | verifie | Sokal et coll., 2022, méta-analyse bivariée (Knee Surg Sports Traumatol Arthrosc), PMID 35150292 ; en soins primaires, Wagemakers 2010 : RV+ 2,0, RV− 0,3 |
| `valgus0>lca` | Stress en valgus à 0° | — | — | Laxité 2 | provisoire | — |
| `varus0>lca` | Stress en varus à 0° | — | — | Laxité 1,5 | provisoire | — |
| `grappe:lca_pivot_pop>lca` | Combinaison : Décary : traumatisme en pivot + pop | — | — | 9,8 / — | verifie | Décary et coll., 2018 (PLoS One), PMID 29894492 : rupture partielle ou complète, RV+ 9,8 (5,6–17,3) ; validation interne 7,0 |
| `grappe:lca_complete>lca` | Combinaison : Décary : pivot + œdème immédiat + Lachman positif | — | — | 17,5 / — | verifie | Décary et coll., 2018 (PLoS One), PMID 29894492 : rupture complète, RV+ 17,5 (9,8–31,5) |
| `grappe:lca_exclusion>lca` | Combinaison : Décary : pas de pivot ou pas de pop, avec Lachman négatif | — | — | — / 0,08 | verifie | Décary et coll., 2018 (PLoS One), PMID 29894492 : exclusion, RV− 0,08 (0,03–0,24) |
| `grappe:lca_3sur3>lca` | Combinaison : Wagemakers : enflure, pop et dérobements (3 sur 3) | — | — | 17,7 / — | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 : RV+ 17,7 (2,2–145) |
| `grappe:lca_2sur3>lca` | Combinaison : Wagemakers : 2 sur 3 (enflure, pop, dérobements) | — | — | 2,5 / — | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 : 2 sur 3 ou plus, Se 71 %, Sp 71 %, RV+ 2,5 |
| `grappe:lca_moins2>lca` | Combinaison : Wagemakers : moins de 2 sur 3 (enflure, pop, dérobements) | — | — | — / 0,41 | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 : RV− 0,41 |

Conduite :
- Règle d'Ottawa pour la radiographie (fracture de Segond, arrachement des épines tibiales) ; IRM pour confirmer et voir les lésions méniscales et cartilagineuses — *Sokal et coll., 2022 (PMID 35150292) ; Bachmann et coll., 2004*
- Glace, béquilles brèves, physiothérapie précoce (amplitude, quadriceps)
- Réadaptation structurée d'abord, option valable chez l'adulte : 50–60 % évitent la reconstruction, avec des résultats comparables ; décision partagée selon l'instabilité, le sport pivot et les lésions associées — *Frobell et coll., 2010 (KANON) ; Reijman et coll., 2021, BMJ (COMPARE, PMID 33687926) ; Beard et coll., 2022, Lancet*
- Suivi dans 1–2 sem, puis à 6–12 sem
- Enfant et adolescent : référence rapide en orthopédie (au-delà de 12 sem de délai, plus de lésions méniscales) — *MacDonald et coll., 2021, JAMA Pediatr*
- Orthopédie si dérobements, sport pivot, lésion méniscale réparable ou genou verrouillé : CRDS AH-753, rupture du ligament croisé avec physiothérapie initiée, priorité C, avec rapport d'IRM — *Formulaire AH-753 (CRDS)*

## Entorse du LCP

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 1 %, 50 ans 1 %, 70 ans 0 % ; homme ×1,3, femme ×0,75.

Repères publiés : Isolée : 1,8/100 000 ; 2,4–4,7 % des blessures du genou chez le sportif (A279, C189).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>lcp` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>lcp` | Genou atteint | — | — | Les deux 0,3 | provisoire | — |
| `sport.contact>lcp` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `duree>lcp` | Depuis combien de temps | — | — | Moins de 7 jours 2 | provisoire | — |
| `apparition>lcp` | Mode d'apparition | — | — | Subit, avec un traumatisme 4 ; Graduel 0,2 ; Insidieux 0,2 | provisoire | — |
| `mecanisme>lcp` | Mécanisme | — | — | Coup sur le tibia, genou fléchi (chute sur le genou, tableau de bord) 6 ; Hyperextension 1,5 | provisoire | — |
| `localisation.posterieure>lcp` | Où est la douleur : Postérieure (creux poplité) | — | — | 1,5 / 0,95 | provisoire | — |
| `p_poplite>lcp` | Creux poplité | — | — | 1,5 / 0,95 | provisoire | — |
| `tiroir_post>lcp` | Tiroir postérieur (positif : laxité) | 90 % | 99 % | 90 / 0,1 | verifie | Rubinstein et coll., 1994 (Am J Sports Med), PMID 7943523 |
| `sag>lcp` | Sag sign | 79 % | 100 % | 79 / 0,21 | verifie | Lubowitz et coll., 2008 (Am J Sports Med) : avalement postérieur du tibia, Se 79 %, Sp 100 % (plafonnée à 99 %) |
| `dial>lcp` | Dial test | — | — | 3 / 0,9 | provisoire | — |

Conduite :
- Tiroir postérieur, affaissement postérieur ; radiographies (règle d'Ottawa) ; IRM — *Badri et coll., 2018, Curr Rev Musculoskelet Med*
- Isolée, grades I–II : immobilisation relative 2 sem avec appui protégé, puis renforcement du quadriceps ; retour au sport en 4–8 sem. Grade III : extension 2–4 sem, retour en 3–4 mois — *Wind et coll., 2004, Am J Sports Med ; Badri et coll., 2018*
- Suivi dans 2 sem, puis à 6 sem
- Orthopédie si grade III, translation de 8 mm ou plus, avulsion osseuse déplacée ou lésion multiligamentaire

## Entorse d'un ligament collatéral (LLI, LLE)

Probabilité de départ (provisoire) : 12 ans 3 %, 16 ans 5 %, 28 ans 5 %, 50 ans 3 %, 70 ans 2 %.

Repères publiés : LLI : 27–34 % des lésions du genou en sport professionnel, 36,1 % au secondaire ; 7 % des gonalgies aiguës de l'adulte (A259–260, C6).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>collat` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>collat` | Genou atteint | — | — | Les deux 0,3 | provisoire | — |
| `sport.aucun>collat` | Activités physiques : Peu ou pas de sport | — | — | 0,7 / 1 | provisoire | — |
| `sport.pivot>collat` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.contact>collat` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `sport.glisse>collat` | Activités physiques : Ski ou planche | — | — | 2 / 1 | provisoire | — |
| `sport.natation>collat` | Activités physiques : Natation | — | — | 1,5 / 1 | provisoire | — |
| `premier>collat` | Premier épisode | — | — | 1,5 / 0,6 | provisoire | — |
| `duree>collat` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 0,5 ; Plus de 3 mois 0,3 | provisoire | — |
| `apparition>collat` | Mode d'apparition | — | — | Subit, avec un traumatisme 4 ; Subit, sans traumatisme 0,3 ; Graduel 0,15 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>collat` | Mécanisme | — | — | En s'accroupissant ou en se relevant 0,3 | provisoire | — |
| `mecanisme>collat` | Mécanisme | — | — | Coup ou stress en valgus (de l'extérieur) 2 | verifie | Kastelein et coll., 2008 (Am J Med), PMID 18954845 : traumatisme par une force externe sur la jambe, RV+ 2,0 |
| `mecanisme>collat` | Mécanisme | — | — | Coup ou stress en varus (de l'intérieur) 3 ; Pivot ou torsion, pied au sol 1,2 | provisoire | — |
| `ecchymose>collat` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `localisation.interligne_med>collat` | Où est la douleur : Interligne médial | — | — | 1,8 / 0,7 | provisoire | — |
| `localisation.interligne_lat>collat` | Où est la douleur : Interligne latéral | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.patte_oie>collat` | Où est la douleur : Médiale, sous l'interligne (patte d'oie) | — | — | 1,2 / 1 | provisoire | — |
| `localisation.laterale>collat` | Où est la douleur : Latérale, au-dessus de l'interligne (bandelette) | — | — | 1,2 / 0,9 | provisoire | — |
| `ex_ecchymose>collat` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `p_interlignes>collat` | Interlignes | — | — | Indolores 0,8 ; Médial douloureux 1,5 ; Latéral douloureux 1,3 | provisoire | — |
| `p_lli>collat` | LLI | — | — | 3 / 0,4 | provisoire | — |
| `p_lle>collat` | LLE | — | — | 3 / 0,8 | provisoire | — |
| `p_perone>collat` | Tête du péroné | — | — | 1,5 / 0,95 | provisoire | — |
| `valgus0>collat` | Stress en valgus à 0° | — | — | Normal et indolore 0,7 ; Douleur sans laxité 2 ; Laxité 5 | provisoire | — |
| `valgus30>collat` | Stress en valgus à 30° | — | — | Normal et indolore 0,18 ; Douleur sans laxité 2,3 ; Laxité 2,3 | verifie | Kastelein et coll., 2008 (Am J Med), PMID 18954845 (IRM) : douleur Se 78 %, Sp 67 % (RV+ 2,3, RV− 0,33) ; laxité Se 91 %, Sp 49 % (RV+ 1,78, RV− 0,18) |
| `varus0>collat` | Stress en varus à 0° | — | — | Normal et indolore 0,9 ; Douleur sans laxité 2 ; Laxité 5 | provisoire | — |
| `varus30>collat` | Stress en varus à 30° | — | — | Normal et indolore 0,7 ; Douleur sans laxité 2,5 ; Laxité 4 | provisoire | — |
| `dial>collat` | Dial test | — | — | 2 / 0,95 | provisoire | — |

Conduite :
- Stress en valgus (LLI) ou en varus (LLE) à 30° et en extension ; règle d'Ottawa ; IRM si grade III ou rupture du LCA soupçonnée (associée à la quasi-totalité des grades III) — *Jadidi et coll., 2024, Curr Rev Musculoskelet Med*
- Grade I : symptomatique, appui toléré. Grades II–III isolés : attelle articulée (0–90°) avec appui toléré 6 sem, physiothérapie — *MacDonald et coll., 2021 ; Jadidi et coll., 2024, Curr Rev Musculoskelet Med*
- Retour au sport : grade I 2–4 sem, grade II 4–6 sem, grade III 6–8 sem — *Jadidi et coll., 2024, Curr Rev Musculoskelet Med*
- Suivi dans 1–2 sem, puis réévaluation de la laxité à 6 sem
- Orthopédie si laxité en extension complète, lésion combinée ou avulsion osseuse ; LLE grade III ou angle postéro-latéral : orthopédie rapidement (chirurgie idéalement en moins de 3 sem) — *LaPrade et coll., 2002, Clin Orthop*

## Instabilité ou luxation de la rotule

Probabilité de départ (provisoire) : 12 ans 5 %, 16 ans 7 %, 28 ans 3 %, 50 ans 1 %, 70 ans 0 % ; femme ×1,4, homme ×0,75.

Repères publiés : 14–42/100 000 ; pics de 108–147 chez l'adolescent ; 36–43 % des hémarthroses de l'enfant (A265–266, C184).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>rotule` | Genou atteint | — | — | Les deux 0,8 | provisoire | — |
| `sport.aucun>rotule` | Activités physiques : Peu ou pas de sport | — | — | 0,7 / 1 | provisoire | — |
| `sport.pivot>rotule` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>rotule` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,6 / 1 | provisoire | — |
| `atcd_genou>rotule` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,5 / 0,95 | provisoire | — |
| `premier>rotule` | Premier épisode | — | — | 0,7 / 1,6 | provisoire | — |
| `duree>rotule` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 ; Plus de 3 mois 0,8 | provisoire | — |
| `apparition>rotule` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 ; Subit, sans traumatisme 1,2 ; Graduel 0,4 ; Insidieux 0,3 | provisoire | — |
| `mecanisme>rotule` | Mécanisme | — | — | Pivot ou torsion, pied au sol 2 | provisoire | — |
| `pop>rotule` | Pop au moment de la blessure | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure_rapide>rotule` | Œdème en moins de 2 heures | — | — | 2,5 / 0,7 | provisoire | — |
| `poursuivre>rotule` | A pu poursuivre l'activité | — | — | 0,7 / 1,5 | provisoire | — |
| `rotule_sortie>rotule` | Sensation que la rotule est sortie de place | — | — | 8 / 0,4 | provisoire | — |
| `localisation.anterieure>rotule` | Où est la douleur : Antérieure, autour de la rotule | — | — | 1,5 / 0,6 | provisoire | — |
| `localisation.anteromediale>rotule` | Où est la douleur : Antéro-médiale, au bord interne de la rotule | — | — | 1,3 / 1 | provisoire | — |
| `pivots_agg>rotule` | Pire en pivotant | — | — | 1,3 / 0,9 | provisoire | — |
| `derobade>rotule` | Dérobements (le genou lâche) | — | — | 2 / 0,6 | provisoire | — |
| `posture>rotule` | Posture | — | — | Genu valgum 1,3 ; Recurvatum 1,3 | provisoire | — |
| `squat_uni>rotule` | Squat unipodal | — | — | Valgus dynamique 1,3 | provisoire | — |
| `appui_uni>rotule` | Appui unipodal | — | — | Instable ou douloureux 1,3 | provisoire | — |
| `flot>rotule` | Flot (signe du flot) | — | — | Positif 1,5 | provisoire | — |
| `glacon>rotule` | Test du glaçon | — | — | Positif 2 | provisoire | — |
| `p_rotule>rotule` | Rotule | — | — | 1,3 / 0,9 | provisoire | — |
| `p_facettes>rotule` | Facettes rotuliennes | — | — | 1,3 / 0,9 | provisoire | — |
| `p_retinaculum>rotule` | Bord médial de la rotule (rétinaculum) | — | — | 3 / 0,5 | provisoire | — |
| `mobilite_rotule>rotule` | Mobilité rotulienne | — | — | Augmentée 3 | provisoire | — |
| `apprehension>rotule` | Appréhension rotulienne | 100 % | 88 % | 8,62 / 0,01 | verifie | Ahmad et coll., 2009 (Am J Sports Med) : test d'appréhension mobile, Se 100 % (plafonnée à 99 %), Sp 88,4 % |

Conduite :
- Radiographies de face, de profil et axiale ; IRM si hémarthrose (les radiographies manquent la majorité des fragments ostéochondraux) — *Reed et coll., 2026, Am J Sports Med*
- Premier épisode sans fragment : immobilisation brève de confort, appui toléré, puis mobilisation précoce et renforcement ; une orthèse restrictive 4 sem ne réduit pas les récidives — *Liu et coll., 2018, Am J Sports Med ; Jadidi et coll., 2024, Curr Rev Musculoskelet Med*
- Sports de contact évités environ 3 mois
- Suivi dans 1–2 sem ; récidive chez environ 30 % (près d'un enfant sur deux)
- Orthopédie si fragment ostéochondral ou corps libre, avulsion osseuse ou récidive

## Tendinopathie rotulienne ou quadricipitale

Probabilité de départ (provisoire) : 12 ans 3 %, 16 ans 6 %, 28 ans 6 %, 50 ans 3 %, 70 ans 2 % ; homme ×1,3, femme ×0,8.

Repères publiés : 14 % des athlètes d'élite, environ 45 % au volley ; 1,6/1 000 p-a chez l'adulte (A255–257, C6).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>tendino` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>tendino` | Genou atteint | — | — | Les deux 1,4 | provisoire | — |
| `sport.aucun>tendino` | Activités physiques : Peu ou pas de sport | — | — | 0,5 / 1 | provisoire | — |
| `sport.course>tendino` | Activités physiques : Course à pied | — | — | 1,2 / 1 | provisoire | — |
| `sport.pivot>tendino` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2 / 1 | provisoire | — |
| `sport.raquette>tendino` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.danse>tendino` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,4 / 1 | provisoire | — |
| `sport.muscu>tendino` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,3 / 1 | provisoire | — |
| `duree>tendino` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 1 à 6 semaines 0,8 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>tendino` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,8 ; Insidieux 1,5 | provisoire | — |
| `localisation.anterieure>tendino` | Où est la douleur : Antérieure, autour de la rotule | — | — | 1,3 / 0,8 | provisoire | — |
| `localisation.pole_inf>tendino` | Où est la douleur : Sous la rotule (tendon rotulien) | — | — | 4 / 0,4 | provisoire | — |
| `localisation.infrapat>tendino` | Où est la douleur : Sous la rotule, de chaque côté du tendon | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.tuberosite>tendino` | Où est la douleur : Tubérosité tibiale | — | — | 1,5 / 0,9 | provisoire | — |
| `escaliers>tendino` | Pire dans les escaliers | — | — | 1,3 / 0,8 | provisoire | — |
| `accroupi>tendino` | Pire accroupi ou à genoux | — | — | 1,3 / 0,9 | provisoire | — |
| `course_saut>tendino` | Pire à la course ou au saut | — | — | 2,5 / 0,4 | provisoire | — |
| `moment>tendino` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>tendino` | Douleur la nuit | — | — | 0,7 / 1,05 | provisoire | — |
| `enflure>tendino` | Enflure du genou (actuelle ou récurrente) | — | — | 0,5 / 1,1 | provisoire | — |
| `squat_bi>tendino` | Squat bipodal | — | — | Douleur antérieure 1,5 | provisoire | — |
| `squat_uni>tendino` | Squat unipodal | — | — | Douloureux 1,5 | provisoire | — |
| `saut_bi>tendino` | Saut bipodal | — | — | Douloureux 2 | provisoire | — |
| `saut_uni>tendino` | Saut unipodal | — | — | Douloureux 2 | provisoire | — |
| `flot>tendino` | Flot (signe du flot) | — | — | Négatif 1,1 ; Positif 0,5 | provisoire | — |
| `glacon>tendino` | Test du glaçon | — | — | Positif 0,4 | provisoire | — |
| `p_tendon_rot>tendino` | Tendon rotulien (pôle inférieur) | — | — | 1,8 / 0,4 | a_verifier | Cook et coll., 2001 : palpation du tendon rotulien, sensible mais peu spécifique |
| `p_tendon_quad>tendino` | Tendon quadricipital | — | — | 2 / 0,8 | provisoire | — |
| `p_tta>tendino` | Tubérosité tibiale | — | — | 1,3 / 0,9 | provisoire | — |
| `rrom_extension>tendino` | Extension résistée | — | — | 2 / 0,6 | provisoire | — |
| `lag_ext>tendino` | Lag en extension | — | — | 2 / 0,95 | provisoire | — |

Conduite :
- Diagnostic clinique ; échographie ou IRM si doute
- Mise en charge progressive du tendon pendant 12 sem ou plus (isométrique, isotonique lourd et lent, pliométrique, puis gestes sportifs), guidée par la douleur — *Breda et coll., 2021, BJSM ; Kongsgaard et coll., 2009 ; Davis et coll., 2023*
- Pas d'infiltration de corticoïde (gain perdu à 6 mois, risque d'affaiblissement du tendon) ; récupération possible sur 6–12 mois — *Davis et coll., 2023, Curr Rev Musculoskelet Med*
- Suivi dans 6 sem, puis à 12 sem
- Échec après 3–6 mois de mise en charge bien conduite : médecine du sport

## Syndrome du coussinet adipeux (Hoffa)

Probabilité de départ (provisoire) : 12 ans 2 %, 25 ans 2 %, 50 ans 2 %, 70 ans 1 %.

Repères publiés : Pas de fréquence publiée dans le document.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>hoffa` | Genou atteint | — | — | Les deux 1,2 | provisoire | — |
| `sport.danse>hoffa` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,5 / 1 | provisoire | — |
| `duree>hoffa` | Depuis combien de temps | — | — | Plus de 3 mois 1,2 | provisoire | — |
| `apparition>hoffa` | Mode d'apparition | — | — | Graduel 1,5 ; Insidieux 1,3 | provisoire | — |
| `mecanisme>hoffa` | Mécanisme | — | — | Hyperextension 1,5 | provisoire | — |
| `localisation.anterieure>hoffa` | Où est la douleur : Antérieure, autour de la rotule | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.infrapat>hoffa` | Où est la douleur : Sous la rotule, de chaque côté du tendon | — | — | 4 / 0,6 | provisoire | — |
| `hyperext_agg>hoffa` | Pire genou en hyperextension (debout, genoux verrouillés) | — | — | 3 / 0,8 | provisoire | — |
| `enflure>hoffa` | Enflure du genou (actuelle ou récurrente) | — | — | 0,7 / 1,05 | provisoire | — |
| `posture>hoffa` | Posture | — | — | Recurvatum 1,5 | provisoire | — |
| `squat_bi>hoffa` | Squat bipodal | — | — | Douleur antérieure 1,3 | provisoire | — |
| `p_tendon_rot>hoffa` | Tendon rotulien (pôle inférieur) | — | — | 1,3 / 0,9 | provisoire | — |
| `arom_extension>hoffa` | Extension active | — | — | Complète, fin douloureuse 1,5 | provisoire | — |
| `hoffa_test>hoffa` | Pincement du fat pad (Hoffa) | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Éviter l'hyperextension ; taping de décharge du coussinet adipeux
- Consultation en physiothérapie : contrôle de l'extension, renforcement du quadriceps
- AINS en cure courte ; échographie ou IRM si la douleur persiste

## Syndrome de la bandelette ilio-tibiale

Probabilité de départ (provisoire) : 12 ans 1 %, 16 ans 2 %, 28 ans 5 %, 50 ans 2 %, 70 ans 1 %.

Repères publiés : 5–14 % des blessures de course ; 4,7 % chez l'enfant (A258, C7).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>bit` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>bit` | Genou atteint | — | — | Les deux 1,2 | provisoire | — |
| `sport.aucun>bit` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.course>bit` | Activités physiques : Course à pied | — | — | 2,5 / 1 | provisoire | — |
| `sport.velo>bit` | Activités physiques : Vélo | — | — | 1,8 / 1 | provisoire | — |
| `duree>bit` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 | provisoire | — |
| `apparition>bit` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2 ; Insidieux 1,5 | provisoire | — |
| `localisation.interligne_lat>bit` | Où est la douleur : Interligne latéral | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.laterale>bit` | Où est la douleur : Latérale, au-dessus de l'interligne (bandelette) | — | — | 5 / 0,3 | provisoire | — |
| `course_saut>bit` | Pire à la course ou au saut | — | — | 2 / 0,5 | provisoire | — |
| `enflure>bit` | Enflure du genou (actuelle ou récurrente) | — | — | 0,4 / 1,1 | provisoire | — |
| `squat_bi>bit` | Squat bipodal | — | — | Douleur latérale 1,3 | provisoire | — |
| `flot>bit` | Flot (signe du flot) | — | — | Négatif 1,1 ; Positif 0,4 | provisoire | — |
| `glacon>bit` | Test du glaçon | — | — | Positif 0,3 | provisoire | — |
| `p_bit>bit` | Bandelette ilio-tibiale (épicondyle latéral) | — | — | 4 / 0,4 | provisoire | — |
| `noble>bit` | Noble | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Diagnostic clinique (douleur latérale au condyle fémoral chez le coureur ou le cycliste)
- Réduction du volume d'entraînement (dénivelé, descentes), AINS en cure courte, puis renforcement des abducteurs de la hanche ; récupération vers 6 sem chez la plupart — *Fredericson et coll., 2005 (PMID 15896092) ; Barker et coll., 2011*
- Infiltration possible en phase aiguë (petit essai favorable)
- Suivi dans 6 sem ; échec après environ 6 mois : médecine du sport ou orthopédie

## Bursite prépatellaire

Probabilité de départ (provisoire) : 12 ans 1 %, 16 ans 1 %, 28 ans 2 %, 50 ans 3 %, 70 ans 2 % ; homme ×1,5, femme ×0,7.

Repères publiés : Au moins 10/100 000/an ; 1,5 % des gonalgies de l'adulte (A146, A267, C190).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>bprep` | Genou atteint | — | — | Les deux 0,5 | provisoire | — |
| `travail>bprep` | Occupation | — | — | Travail à genoux (plancher, toiture, plomberie…) 3 | provisoire | — |
| `duree>bprep` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 | provisoire | — |
| `apparition>bprep` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 | provisoire | — |
| `mecanisme>bprep` | Mécanisme | — | — | Coup direct sur le genou 2 | provisoire | — |
| `localisation.prerotulienne>bprep` | Où est la douleur : Devant la rotule, superficielle | — | — | 6 / 0,3 | provisoire | — |
| `accroupi>bprep` | Pire accroupi ou à genoux | — | — | 2 / 0,6 | provisoire | — |
| `rougeur_chaleur>bprep` | Rougeur ou chaleur | — | — | 2,5 / 0,85 | provisoire | — |
| `ex_chaleur>bprep` | Rougeur ou chaleur | — | — | 2 / 0,9 | provisoire | — |
| `ex_tumefaction.prerotulienne>bprep` | Tuméfaction localisée : Devant la rotule (bourse) | — | — | 10 / 0,2 | provisoire | — |

Conduite :
- Rechercher les signes septiques (fièvre > 37,8 °C, chaleur nette, porte d'entrée cutanée, cellulite) ; si présents ou doute : ponction (leucocytes > 3000/µL, neutrophiles > 50 %, Gram, culture). Environ un tiers sont septiques, à S. aureus dans 80 % — *Baumbach et coll., 2014 (PMID 24305696)*
- Aseptique : éviter la ponction ; genouillère de protection, compression, AINS en cure courte
- Septique : céphalexine 500 mg QID (enfant 50 mg/kg/j en 3 doses, max 1 g/dose) 7–14 j selon l'évolution ; ne couvre pas le SARM — *Charret et coll., 2021, J Antimicrob Chemother (PMID 34293150) ; Brown et coll., 2022*
- Revoir à 48–72 h si septique ; fièvre, cellulite extensive, immunosuppression ou absence d'amélioration : antibiotiques IV et drainage

## Tendinobursite de la patte d'oie

Probabilité de départ (provisoire) : 12 ans 0 %, 16 ans 1 %, 28 ans 1 %, 50 ans 5 %, 70 ans 6 % ; femme ×1,6, homme ×0,65.

Repères publiés : 20 % des gonarthroses symptomatiques (17,5 %) (A262–263, C185).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>poie` | Genou atteint | — | — | Les deux 1,3 | provisoire | — |
| `sport.marche>poie` | Activités physiques : Marche ou randonnée | — | — | 1,2 / 1 | provisoire | — |
| `obesite>poie` | Obésité (IMC 30 ou plus) | — | — | 1,8 / 0,8 | provisoire | — |
| `duree>poie` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; Plus de 3 mois 1,3 | provisoire | — |
| `apparition>poie` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,6 ; Insidieux 1,6 | provisoire | — |
| `localisation.interligne_med>poie` | Où est la douleur : Interligne médial | — | — | 1,2 / 1 | provisoire | — |
| `localisation.patte_oie>poie` | Où est la douleur : Médiale, sous l'interligne (patte d'oie) | — | — | 5 / 0,3 | provisoire | — |
| `marche>poie` | Pire à la marche | — | — | 1,3 / 0,9 | provisoire | — |
| `p_poie>poie` | Patte d'oie | — | — | 5 / 0,3 | provisoire | — |
| `rrom_flexion>poie` | Flexion résistée | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Diagnostic clinique (sensibilité environ 5 cm sous l'interligne médial, douleur aux escaliers) ; chercher une gonarthrose associée
- Physiothérapie, diclofénac topique, perte de poids — *Babaei-Ghazani et coll., 2024 (PMID 37752656)*
- Infiltration (triamcinolone 20 mg avec lidocaïne) à effet surtout bref, plus précise sous échographie — *Babaei-Ghazani et coll., 2024*
- Suivi dans 6–8 sem ; échec : rechercher une fracture de stress du tibia proximal ou une lésion méniscale

## Maladie d'Osgood-Schlatter

Probabilité de départ (provisoire) : 9 ans 6 %, 12 ans 20 %, 14 ans 18 %, 16 ans 8 %, 18 ans 2 %, 21 ans 0 %, 25 ans 0 % ; homme ×1,4, femme ×0,7.

Repères publiés : Environ 10 % à 12–15 ans (9,8 %) ; risque doublé par le sport (A253–254, C192).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>osgood` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>osgood` | Genou atteint | — | — | Les deux 1,6 | provisoire | — |
| `sport.pivot>osgood` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>osgood` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `duree>osgood` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 ; Plus de 3 mois 1,3 | provisoire | — |
| `apparition>osgood` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Graduel 1,8 ; Insidieux 1,5 | provisoire | — |
| `localisation.anterieure>osgood` | Où est la douleur : Antérieure, autour de la rotule | — | — | 0,8 / 1 | provisoire | — |
| `localisation.pole_inf>osgood` | Où est la douleur : Sous la rotule (tendon rotulien) | — | — | 0,8 / 1 | provisoire | — |
| `localisation.tuberosite>osgood` | Où est la douleur : Tubérosité tibiale | — | — | 6 / 0,3 | provisoire | — |
| `accroupi>osgood` | Pire accroupi ou à genoux | — | — | 1,5 / 0,8 | provisoire | — |
| `course_saut>osgood` | Pire à la course ou au saut | — | — | 2 / 0,6 | provisoire | — |
| `enflure>osgood` | Enflure du genou (actuelle ou récurrente) | — | — | 0,6 / 1,05 | provisoire | — |
| `saut_bi>osgood` | Saut bipodal | — | — | Douloureux 1,5 | provisoire | — |
| `saut_uni>osgood` | Saut unipodal | — | — | Douloureux 1,5 | provisoire | — |
| `ex_tumefaction.tuberosite>osgood` | Tuméfaction localisée : Tubérosité tibiale proéminente | — | — | 3 / 0,7 | provisoire | — |
| `p_tta>osgood` | Tubérosité tibiale | — | — | 5 / 0,2 | provisoire | — |
| `rrom_extension>osgood` | Extension résistée | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Diagnostic clinique ; radiographie de profil si atteinte unilatérale atypique, douleur nocturne ou trauma aigu — *Lintner et coll., 2023, AFP*
- Activité permise si la douleur reste légère et cède au repos ; glace, étirements et renforcement ; pas d'immobilisation ni d'infiltration — *Lintner et coll., 2023, AFP ; Ladenhauf et coll., 2020 (PMID 31714260)*
- Enseignement : les symptômes durent souvent plus d'un an (médiane d'environ 16 mois) ; plus de 90 % guérissent sans chirurgie
- Suivi dans 6–8 sem
- Douleur aiguë avec perte de l'extension active (avulsion de la tubérosité tibiale) : radiographies et orthopédie d'urgence ; ossicule douloureux après la fermeture des physes : orthopédie

## Maladie de Sinding-Larsen-Johansson

Probabilité de départ (provisoire) : 9 ans 5 %, 11 ans 6 %, 13 ans 4 %, 15 ans 1 %, 17 ans 0 %, 20 ans 0 % ; homme ×1,3, femme ×0,8.

Repères publiés : 3ᵉ rang chez l'enfant ; pas d'incidence spécifique (A268–269, C174).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>slj` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>slj` | Genou atteint | — | — | Les deux 1,6 | provisoire | — |
| `sport.pivot>slj` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>slj` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `duree>slj` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 ; Plus de 3 mois 1,3 | provisoire | — |
| `apparition>slj` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Graduel 1,8 ; Insidieux 1,5 | provisoire | — |
| `localisation.anterieure>slj` | Où est la douleur : Antérieure, autour de la rotule | — | — | 0,8 / 1 | provisoire | — |
| `localisation.pole_inf>slj` | Où est la douleur : Sous la rotule (tendon rotulien) | — | — | 6 / 0,3 | provisoire | — |
| `localisation.tuberosite>slj` | Où est la douleur : Tubérosité tibiale | — | — | 0,5 / 1,1 | provisoire | — |
| `accroupi>slj` | Pire accroupi ou à genoux | — | — | 1,5 / 0,8 | provisoire | — |
| `course_saut>slj` | Pire à la course ou au saut | — | — | 2 / 0,6 | provisoire | — |
| `enflure>slj` | Enflure du genou (actuelle ou récurrente) | — | — | 0,6 / 1,05 | provisoire | — |
| `saut_bi>slj` | Saut bipodal | — | — | Douloureux 1,5 | provisoire | — |
| `saut_uni>slj` | Saut unipodal | — | — | Douloureux 1,5 | provisoire | — |
| `ex_tumefaction.tuberosite>slj` | Tuméfaction localisée : Tubérosité tibiale proéminente | — | — | 0,7 / 1 | provisoire | — |
| `p_tendon_rot>slj` | Tendon rotulien (pôle inférieur) | — | — | 5 / 0,3 | provisoire | — |
| `p_tta>slj` | Tubérosité tibiale | — | — | 0,6 / 1,1 | provisoire | — |
| `rrom_extension>slj` | Extension résistée | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Diagnostic clinique (pôle inférieur de la rotule chez le préadolescent sportif) — *Lintner et coll., 2023, AFP*
- Même conduite que l'Osgood-Schlatter : activité selon la douleur, glace, étirements et renforcement ; bonne évolution en 2–8 mois — *Lintner et coll., 2023, AFP*
- Suivi dans 6–8 sem
- Lever de la jambe tendue impossible, épanchement ou appui impossible : fracture en manchon de la rotule, radiographies et orthopédie d'urgence

## Contusion ou entorse légère, sans lésion structurelle

Probabilité de départ (provisoire) : 12 ans 10 %, 18 ans 12 %, 30 ans 12 %, 50 ans 9 %, 70 ans 7 % ; homme ×1,15, femme ×0,9.

Repères publiés : Entorse et contusion : 42 % des gonalgies aiguës de l'adulte en première ligne ; contusion : 15,2 % des blessures du genou chez le sportif (C6, C107).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>contusion` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>contusion` | Genou atteint | — | — | Les deux 0,3 | provisoire | — |
| `sport.pivot>contusion` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,2 / 1 | provisoire | — |
| `sport.contact>contusion` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `premier>contusion` | Premier épisode | — | — | 1,3 / 0,7 | provisoire | — |
| `duree>contusion` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>contusion` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>contusion` | Mécanisme | — | — | Coup direct sur le genou 2,5 ; Coup sur le tibia, genou fléchi (chute sur le genou, tableau de bord) 1,5 ; Pivot ou torsion, pied au sol 0,6 ; Coup ou stress en valgus (de l'extérieur) 0,8 ; Coup ou stress en varus (de l'intérieur) 0,8 ; Décélération ou réception de saut 0,8 ; En s'accroupissant ou en se relevant 0,5 | provisoire | — |
| `pop>contusion` | Pop au moment de la blessure | — | — | 0,4 / 1,2 | provisoire | — |
| `enflure_rapide>contusion` | Œdème en moins de 2 heures | — | — | 0,3 / 1,3 | provisoire | — |
| `poursuivre>contusion` | A pu poursuivre l'activité | — | — | 1,5 / 0,6 | provisoire | — |
| `ecchymose>contusion` | Ecchymose | — | — | 1,5 / 0,9 | provisoire | — |
| `derobade>contusion` | Dérobements (le genou lâche) | — | — | 0,6 / 1,05 | provisoire | — |
| `enflure>contusion` | Enflure du genou (actuelle ou récurrente) | — | — | 0,5 / 1,1 | provisoire | — |
| `flot>contusion` | Flot (signe du flot) | — | — | Négatif 1,3 ; Positif 0,4 | provisoire | — |
| `glacon>contusion` | Test du glaçon | — | — | Positif 0,3 | provisoire | — |

Conduite :
- Règle d'Ottawa pour décider de la radiographie (Se ≈ 99 %, Sp ≈ 49 %) — *Bachmann et coll., 2004, Ann Intern Med ; Jackson et coll., 2003*
- Glace, compression, appui toléré, analgésie de base
- Réexamen ligamentaire à 7–10 j (l'examen est souvent limité par la douleur au début) ; radiographie si douleur persistante à 10 j
- Épanchement rapide, blocage, instabilité ou lever de la jambe tendue impossible : imagerie et orthopédie ; pied froid ou pouls diminué : urgence

## Syndrome de la plica

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 1 %, 30 ans 1 %, 50 ans 0 %, 70 ans 0 %.

Repères publiés : Au plus 3 % des arthroscopies (A270–271).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `sport.pivot>plica` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,2 / 1 | provisoire | — |
| `duree>plica` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 ; Plus de 3 mois 1,3 | provisoire | — |
| `apparition>plica` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 1,5 ; Insidieux 1,5 | provisoire | — |
| `localisation.anteromediale>plica` | Où est la douleur : Antéro-médiale, au bord interne de la rotule | — | — | 4 / 0,5 | provisoire | — |
| `escaliers>plica` | Pire dans les escaliers | — | — | 1,3 / 0,9 | provisoire | — |
| `assis>plica` | Pire en position assise prolongée | — | — | 1,3 / 0,9 | provisoire | — |
| `course_saut>plica` | Pire à la course ou au saut | — | — | 1,3 / 0,9 | provisoire | — |
| `blocage>plica` | Blocages vrais (impossible d'étendre le genou) | — | — | 1,5 / 0,95 | provisoire | — |
| `accrochage>plica` | Accrochages | — | — | 1,5 / 0,9 | provisoire | — |
| `ressaut>plica` | Ressaut ou claquement (le genou « saute ») | — | — | 2,5 / 0,8 | provisoire | — |
| `p_plica>plica` | Cordon antéro-médial (plica) | — | — | 6 / 0,4 | provisoire | — |

Conduite :
- Diagnostic clinique (douleur antéro-médiale, ressaut, cordon palpable) ; IRM si doute — *Kuwabara et coll., 2021, Curr Rev Musculoskelet Med*
- Physiothérapie, AINS, glace pendant 3 mois ou plus (amélioration chez la grande majorité) ; infiltration en option — *Kuwabara et coll., 2021*
- Suivi dans 6–8 sem ; échec : orthopédie (résection arthroscopique)

## Ostéochondrite disséquante

Probabilité de départ (provisoire) : 10 ans 2 %, 13 ans 3 %, 16 ans 2 %, 19 ans 1 %, 25 ans 0 %, 40 ans 0 % ; homme ×1,8, femme ×0,55.

Repères publiés : 39/100 000 chez les garçons de 11–15 ans ; 9,5/100 000 à 6–19 ans (A275–276, C3).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>ocd` | Genou atteint | — | — | Les deux 1,3 | provisoire | — |
| `sport.pivot>ocd` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,3 / 1 | provisoire | — |
| `duree>ocd` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 ; Plus de 3 mois 1,3 | provisoire | — |
| `apparition>ocd` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 1,8 ; Insidieux 1,8 | provisoire | — |
| `enflure_rapide>ocd` | Œdème en moins de 2 heures | — | — | 1,3 / 1 | provisoire | — |
| `course_saut>ocd` | Pire à la course ou au saut | — | — | 1,5 / 0,8 | provisoire | — |
| `blocage>ocd` | Blocages vrais (impossible d'étendre le genou) | — | — | 3 / 0,85 | provisoire | — |
| `accrochage>ocd` | Accrochages | — | — | 2 / 0,8 | provisoire | — |
| `enflure>ocd` | Enflure du genou (actuelle ou récurrente) | — | — | 2 / 0,8 | provisoire | — |
| `flot>ocd` | Flot (signe du flot) | — | — | Négatif 0,7 ; Légèrement positif 1,5 ; Positif 1,5 | provisoire | — |
| `glacon>ocd` | Test du glaçon | — | — | Positif 1,5 | provisoire | — |
| `arom_extension>ocd` | Extension active | — | — | Blocage mécanique 2 | provisoire | — |

Conduite :
- Radiographies de face, de profil, axiale et en tunnel des deux genoux (atteinte bilatérale dans 15–30 %) ; IRM pour la stabilité — *Mitchell et coll., 2025, Arthroscopy*
- Lésion stable à physes ouvertes : traitement non chirurgical 3–6 mois (décharge initiale 4–6 sem, pas d'impact pendant au moins 3 mois) ; guérison chez environ 50–65 % — *Rosenberg et coll., 2026, Curr Rev Musculoskelet Med*
- Radiographies de contrôle toutes les 6–12 sem
- Orthopédie pour tous ; rapidement si blocage, épanchement, perte d'amplitude ou physes fermées

## Ménisque discoïde

Probabilité de départ (provisoire) : 8 ans 2 %, 12 ans 1 %, 16 ans 1 %, 20 ans 0 %, 30 ans 0 %.

Repères publiés : Lésion méniscale, dont ménisque discoïde : 13–15 % des hémarthroses de l'enfant (C184).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>discoide` | Genou atteint | — | — | Les deux 1,5 | provisoire | — |
| `duree>discoide` | Depuis combien de temps | — | — | Plus de 3 mois 1,2 | provisoire | — |
| `apparition>discoide` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,7 ; Graduel 1,3 ; Insidieux 1,5 | provisoire | — |
| `localisation.interligne_lat>discoide` | Où est la douleur : Interligne latéral | — | — | 3 / 0,6 | provisoire | — |
| `blocage>discoide` | Blocages vrais (impossible d'étendre le genou) | — | — | 3 / 0,8 | provisoire | — |
| `accrochage>discoide` | Accrochages | — | — | 2 / 0,9 | provisoire | — |
| `ressaut>discoide` | Ressaut ou claquement (le genou « saute ») | — | — | 4 / 0,6 | provisoire | — |
| `enflure>discoide` | Enflure du genou (actuelle ou récurrente) | — | — | 1,3 / 0,95 | provisoire | — |
| `flot>discoide` | Flot (signe du flot) | — | — | Positif 1,2 | provisoire | — |
| `arom_extension>discoide` | Extension active | — | — | Déficit avec douleur 1,5 ; Blocage mécanique 3 | provisoire | — |

Conduite :
- IRM ; atteinte souvent bilatérale — *Kramer et coll., 2009, J Am Acad Orthop Surg (PMID 19880680)*
- Découverte fortuite asymptomatique : observation, pas de chirurgie
- Symptômes (ressaut, blocage, perte d'extension) : orthopédie pédiatrique (saucérisation avec ou sans réparation)

## Goutte ou chondrocalcinose (arthrite microcristalline)

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 45 ans 1 %, 60 ans 3 %, 75 ans 5 %, 85 ans 6 % ; homme ×1,4, femme ×0,75.

Repères publiés : Genou atteint dans 74 % des arthrites à pyrophosphate ; chondrocalcinose 7 % à 60–69 ans, 43 % après 80 ans ; goutte 2 % des gonalgies de l'adulte (A184, A205, A264, C181, C174).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>cristaux` | Genou atteint | — | — | Les deux 1,2 | provisoire | — |
| `obesite>cristaux` | Obésité (IMC 30 ou plus) | — | — | 1,5 / 0,9 | provisoire | — |
| `atcd_familiaux>cristaux` | ATCD familial de maladie rhumatologique | — | — | 1,3 / 0,95 | provisoire | — |
| `atcd_rhumato.goutte>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 6 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 6 / 1 | provisoire | — |
| `premier>cristaux` | Premier épisode | — | — | 0,5 / 1,8 | provisoire | — |
| `duree>cristaux` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 6 semaines à 3 mois 0,6 ; Plus de 3 mois 0,3 | provisoire | — |
| `apparition>cristaux` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 4 ; Graduel 0,4 ; Insidieux 0,3 | provisoire | — |
| `localisation.diffuse>cristaux` | Où est la douleur : Diffuse, mal localisée | — | — | 2 / 0,8 | provisoire | — |
| `type_douleur>cristaux` | Type de douleur | — | — | Lancinante, pulsatile 1,5 | provisoire | — |
| `moment>cristaux` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `nocturne>cristaux` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `reveils>cristaux` | Réveils en deuxième partie de nuit | — | — | 1,3 / 0,95 | provisoire | — |
| `enflure>cristaux` | Enflure du genou (actuelle ou récurrente) | — | — | 3 / 0,3 | provisoire | — |
| `rougeur_chaleur>cristaux` | Rougeur ou chaleur | — | — | 4 / 0,5 | provisoire | — |
| `autres_articulations>cristaux` | Douleur ou enflure d'autres articulations | — | — | 1,3 / 0,95 | provisoire | — |
| `fievre>cristaux` | Fièvre ou frissons | — | — | 1,4 / 0,95 | provisoire | — |
| `risque_infection.prothese>cristaux` | Facteurs de risque d'infection : Prothèse du genou | — | — | 0,4 / 1 | provisoire | — |
| `demarche>cristaux` | Démarche | — | — | Normale 0,7 ; Boiterie antalgique 1,5 ; Incapable de mettre du poids 2,5 | provisoire | — |
| `ex_chaleur>cristaux` | Rougeur ou chaleur | — | — | 5 / 0,4 | provisoire | — |
| `flot>cristaux` | Flot (signe du flot) | — | — | Négatif 0,4 ; Légèrement positif 1,5 ; Positif 3 | provisoire | — |
| `glacon>cristaux` | Test du glaçon | — | — | Négatif 0,7 ; Positif 3 | provisoire | — |
| `arom_flexion>cristaux` | Flexion active | — | — | Complète et indolore 0,6 ; Limitée avec douleur 1,8 ; Limitée par raideur 1,3 | provisoire | — |
| `arom_extension>cristaux` | Extension active | — | — | Déficit avec douleur 1,5 | provisoire | — |
| `prom_flexion>cristaux` | Flexion passive | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Ponction (cristaux, Gram, culture, décompte) avant tout antibiotique ; la présence de cristaux n'exclut pas l'infection — *Swisher et coll., 2025, AFP*
- Crise de goutte : colchicine 1,2 mg, puis 0,6 mg 1 h plus tard ; 12 h après, 0,6 mg DIE–BID jusqu'à résolution (réduire avec clarithromycine, diltiazem, vérapamil, cyclosporine). Sinon naproxène 500 mg BID avec IPP, ou prednisone 30–35 mg DIE 5 j — *FitzGerald et coll., 2020, ACR (goutte)*
- Chondrocalcinose aiguë de l'aîné : prednisone 30 mg DIE 2 j, équivalente à la colchicine (moins de diarrhée) ; infiltration une fois l'infection exclue — *Pascart et coll., 2023, Lancet Rheumatol (COLCHICORT)*
- Hypo-uricémiant si tophus, dommages radiographiques ou 2 crises par an ou plus : allopurinol 100 mg/j ou moins au départ, cible < 360 µmol/L, colchicine 0,6 mg DIE 3–6 mois en prophylaxie — *FitzGerald et coll., 2020, ACR*
- Chondrocalcinose avant 60 ans : rechercher hyperparathyroïdie, hémochromatose, hypomagnésémie
- Revoir à 48–72 h, puis dans 2–4 sem ; fièvre, immunosuppression, prothèse ou doute d'infection : urgence
- Rhumatologie au besoin : CRDS AH-765 (arthrite microcristalline) — *Formulaire AH-765 (CRDS)*

## Arthrite inflammatoire (PAR, spondylarthrite, psoriasique)

Probabilité de départ (provisoire) : 12 ans 1 %, 16 ans 1 %, 28 ans 1 %, 50 ans 2 %, 70 ans 2 % ; femme ×1,3, homme ×0,8.

Repères publiés : Polyarthrite rhumatoïde : 0,5 % des gonalgies de l'adulte (C174).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>arthrite` | Genou atteint | — | — | Les deux 1,8 | provisoire | — |
| `atcd_familiaux>arthrite` | ATCD familial de maladie rhumatologique | — | — | 1,5 / 0,9 | provisoire | — |
| `atcd_rhumato.uveite>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.synovite>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.par>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.spa>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 2,5 / 1 | provisoire | — |
| `premier>arthrite` | Premier épisode | — | — | 0,7 / 1,5 | provisoire | — |
| `duree>arthrite` | Depuis combien de temps | — | — | Moins de 7 jours 1 ; Plus de 3 mois 0,8 | provisoire | — |
| `apparition>arthrite` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 1,5 ; Insidieux 1,5 | provisoire | — |
| `localisation.diffuse>arthrite` | Où est la douleur : Diffuse, mal localisée | — | — | 2 / 0,8 | provisoire | — |
| `type_douleur>arthrite` | Type de douleur | — | — | Lancinante, pulsatile 1,5 | provisoire | — |
| `moment>arthrite` | Horaire | — | — | Pire le matin, mieux en bougeant 2,5 ; Pire en fin de journée ou après l'activité 0,5 ; Constante 1,3 | provisoire | — |
| `nocturne>arthrite` | Douleur la nuit | — | — | 1,8 / 0,7 | provisoire | — |
| `reveils>arthrite` | Réveils en deuxième partie de nuit | — | — | 2,5 / 0,8 | provisoire | — |
| `raideur>arthrite` | Raideur matinale | — | — | 30 minutes ou plus 1,6 ; Moins de 30 minutes 0,44 ; Aucune 0,44 | verifie | van Nies et coll., 2015 (Arthritis Res Ther) : raideur matinale de 30 min ou plus (PAR, arthrite débutante), Se 74–77 %, Sp 48–52 % |
| `enflure>arthrite` | Enflure du genou (actuelle ou récurrente) | — | — | 2,5 / 0,4 | provisoire | — |
| `rougeur_chaleur>arthrite` | Rougeur ou chaleur | — | — | 2 / 0,8 | provisoire | — |
| `autres_articulations>arthrite` | Douleur ou enflure d'autres articulations | — | — | 3 / 0,8 | provisoire | — |
| `fievre>arthrite` | Fièvre ou frissons | — | — | 1,5 / 0,95 | provisoire | — |
| `demarche>arthrite` | Démarche | — | — | Normale 0,7 ; Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `ex_chaleur>arthrite` | Rougeur ou chaleur | — | — | 2,5 / 0,7 | provisoire | — |
| `flot>arthrite` | Flot (signe du flot) | — | — | Négatif 0,4 ; Légèrement positif 1,5 ; Positif 2 | provisoire | — |
| `glacon>arthrite` | Test du glaçon | — | — | Négatif 0,7 ; Positif 3 | provisoire | — |
| `arom_flexion>arthrite` | Flexion active | — | — | Complète et indolore 0,6 ; Limitée avec douleur 1,8 ; Limitée par raideur 1,3 | provisoire | — |
| `arom_extension>arthrite` | Extension active | — | — | Déficit avec douleur 1,5 | provisoire | — |
| `prom_flexion>arthrite` | Flexion passive | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Bilan : FSC, CRP, VS, FR, anti-CCP, HLA-B27 selon le tableau ; radiographies ; ponction si épanchement
- Arthrite inflammatoire soupçonnée (raideur matinale prolongée, plusieurs articulations, psoriasis, uvéite, MII) : rhumatologie, CRDS AH-765 — *Formulaire AH-765 (CRDS)*
- AINS en cure courte en attendant ; pas de corticoïde systémique avant l'avis si possible

## Arthrite septique

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 65 ans 0 %, 80 ans 1 %, 90 ans 1 %.

Repères publiés : 0,3 % des gonalgies de l'adulte ; plus fréquente après 80 ans (RV 3,5) (C174, Margaretten 2007).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>septique` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>septique` | Genou atteint | — | — | Les deux 0,2 | provisoire | — |
| `atcd_rhumato.par>septique` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | 68 % | 73 % | 2,52 / 0,44 | verifie | Margaretten et coll., 2007, JAMA (examen clinique rationnel) : PAR connue, RV+ 2,5, RV− 0,45 |
| `duree>septique` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 6 semaines à 3 mois 0,2 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>septique` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 4 ; Graduel 0,3 ; Insidieux 0,3 | provisoire | — |
| `localisation.diffuse>septique` | Où est la douleur : Diffuse, mal localisée | — | — | 1,5 / 0,9 | provisoire | — |
| `type_douleur>septique` | Type de douleur | — | — | Lancinante, pulsatile 1,5 | provisoire | — |
| `moment>septique` | Horaire | — | — | Constante 2 | provisoire | — |
| `nocturne>septique` | Douleur la nuit | — | — | 2 / 0,7 | provisoire | — |
| `enflure>septique` | Enflure du genou (actuelle ou récurrente) | — | — | 4 / 0,2 | provisoire | — |
| `rougeur_chaleur>septique` | Rougeur ou chaleur | — | — | 4 / 0,5 | provisoire | — |
| `fievre>septique` | Fièvre ou frissons | — | — | 3 / 0,45 | provisoire | Margaretten et coll., 2007, JAMA (examen clinique rationnel) : fièvre chez 57 % des arthrites septiques (Sp non rapportée) |
| `risque_infection.immuno>septique` | Facteurs de risque d'infection : Immunosuppression ou diabète | — | — | 2,7 / 1 | verifie | Margaretten et coll., 2007, JAMA : diabète, Se 12 %, Sp 96 %, RV+ 2,7 |
| `risque_infection.prothese>septique` | Facteurs de risque d'infection : Prothèse du genou | — | — | 5 / 1 | provisoire | — |
| `risque_infection.infiltration>septique` | Facteurs de risque d'infection : Infiltration ou chirurgie récente du genou | 24 % | 96 % | 6 / 0,79 | verifie | Margaretten et coll., 2007, JAMA (examen clinique rationnel) : chirurgie articulaire récente, RV+ 6,9 |
| `risque_infection.udi>septique` | Facteurs de risque d'infection : Drogues injectables | — | — | 3 / 1 | provisoire | — |
| `demarche>septique` | Démarche | — | — | Normale 0,4 ; Boiterie antalgique 2 ; Incapable de mettre du poids 3 | provisoire | — |
| `ex_chaleur>septique` | Rougeur ou chaleur | — | — | 5 / 0,4 | provisoire | — |
| `flot>septique` | Flot (signe du flot) | — | — | Négatif 0,2 ; Légèrement positif 1,5 ; Positif 3 | provisoire | — |
| `glacon>septique` | Test du glaçon | — | — | Négatif 0,5 ; Positif 3 | provisoire | — |
| `arom_flexion>septique` | Flexion active | — | — | Limitée avec douleur 2 | provisoire | — |
| `arom_extension>septique` | Extension active | — | — | Déficit avec douleur 1,5 | provisoire | — |

Conduite :
- Ponction avant antibiotiques (décompte, Gram, culture, cristaux) et hémocultures ; leucocytes > 50 000/µL : RV ≈ 8 ; > 100 000/µL : RV ≈ 28 ; mais 30–50 % sont sous 50 000 — *Margaretten et coll., 2007, JAMA ; Earwood et coll., 2021, AFP*
- Urgence : drainage articulaire et antibiotiques IV visant S. aureus et les streptocoques (SARM selon le risque), durée habituelle 3–4 sem — *Gardner et coll., 2025, NEJM*
- Transfert le jour même ; ne jamais infiltrer de corticoïde tant que l'infection n'est pas exclue

## Kyste poplité (de Baker)

Probabilité de départ (provisoire) : 12 ans 0 %, 16 ans 1 %, 28 ans 1 %, 50 ans 4 %, 70 ans 6 %.

Repères publiés : 27,9 % des sujets âgés à l'IRM ; 4,4 % des codes chez l'adulte (A263, C3).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>baker` | Genou atteint | — | — | Les deux 0,8 | provisoire | — |
| `apparition>baker` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Insidieux 1,3 | provisoire | — |
| `localisation.posterieure>baker` | Où est la douleur : Postérieure (creux poplité) | — | — | 5 / 0,5 | provisoire | — |
| `irradiation>baker` | Irradiation | — | — | Vers le mollet 1,5 | provisoire | — |
| `enflure>baker` | Enflure du genou (actuelle ou récurrente) | — | — | 1,5 / 0,8 | provisoire | — |
| `mollet>baker` | Mollet enflé, chaud ou douloureux | — | — | 1,5 / 1 | provisoire | — |
| `ex_tumefaction.poplitee>baker` | Tuméfaction localisée : Masse au creux poplité | — | — | 8 / 0,4 | provisoire | — |
| `flot>baker` | Flot (signe du flot) | — | — | Négatif 0,8 | provisoire | — |
| `p_poplite>baker` | Creux poplité | — | — | 2,5 / 0,7 | provisoire | — |
| `arom_flexion>baker` | Flexion active | — | — | Limitée avec douleur 1,3 | provisoire | — |

Conduite :
- Échographie si doute ; presque toujours secondaire à une atteinte intra-articulaire (arthrose, ménisque)
- Rupture : tableau indiscernable d'une thrombose veineuse → écho-doppler (un kyste n'exclut pas une thrombose ; répéter à 5–7 j si négatif) — *Langsfeld et coll., 1997 (PMID 9129621) ; Chopard et coll., 2020, JAMA*
- Traiter la cause ; infiltration intra-articulaire de corticoïde (réduit le kyste à 4 sem) ; ponction échoguidée si symptomatique (récidive d'environ 13 %)
- Suivi dans 6 sem ; mollet tendu et très douloureux (syndrome compartimental, surtout sous anticoagulant) : urgence — *Frush et coll., 2015, Sports Health*

## Fracture sous-chondrale d'insuffisance

Probabilité de départ (provisoire) : 12 ans 0 %, 45 ans 0 %, 60 ans 1 %, 75 ans 3 %, 90 ans 4 % ; femme ×1,6, homme ×0,65.

Repères publiés : 3,29 % des IRM du genou ; âge moyen 65 ans ; surtout chez la femme (C186–187).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>insuff` | Genou atteint | — | — | Les deux 0,7 | provisoire | — |
| `duree>insuff` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 ; Plus de 3 mois 0,6 | provisoire | — |
| `apparition>insuff` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Subit, sans traumatisme 3 | provisoire | — |
| `marche>insuff` | Pire à la marche | — | — | 1,5 / 0,9 | provisoire | — |
| `nocturne>insuff` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `demarche>insuff` | Démarche | — | — | Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `p_rebords>insuff` | Rebords osseux articulaires | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Radiographies en charge souvent normales au début → IRM (tôt si douleur disproportionnée, au plus tard après 6 sem) ; souvent associée à une lésion de la racine méniscale médiale — *Choi et coll., 2021, Am J Sports Med*
- Appui protégé avec béquilles environ 6 sem, analgésie de base, optimisation du calcium et de la vitamine D ; bilan d'ostéoporose — *Choi et coll., 2021*
- Suivi dans 6 sem ; effondrement sous-chondral, lésion étendue ou échec : orthopédie (environ 1 patient sur 3 évolue vers la chirurgie)

## Mesures générales

Blessure récente :
- Protection et repos relatif ; appui selon la tolérance, béquilles au besoin
- Glace et compression les premiers jours (15 à 20 min aux 2 à 3 h), élévation
- Réexamen à 7–10 j : examen ligamentaire souvent limité par la douleur au début
- Consultation en physiothérapie dès que la douleur le permet

Douleur de surcharge :
- Dosage de la charge : activité permise si la douleur reste ≤ 3/10 et ne persiste pas après l'effort (chez l'adolescent, viser ≤ 2/10) — *Silbernagel et coll., 2007 (modèle de monitorage de la douleur)*
- Quantifier le stress mécanique (volume, fréquence, intensité, terrain) et le réduire, puis reprise par paliers d'environ 10 % par semaine
- Consultation en physiothérapie : renforcement progressif

Analgésie :
- Acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité)
- AINS en cure courte : ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j) — *Kermond et coll., 2002, Ann Emerg Med (PMID 12192353) ; FitzGerald, 2025, Ann Intern Med*
- Diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID) sur une articulation superficielle — *Bannuru et coll., 2019, OARSI (PMID 31278997)*
- Ibuprofène 10 mg/kg q6–8h (max 400 mg/dose et 40 mg/kg/j), premier choix ; l'ajout d'acétaminophène ou d'un opioïde n'améliore pas le soulagement — *Kermond et coll., 2002, Ann Emerg Med (PMID 12192353)*
- Acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) si AINS contre-indiqué
- AINS : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation, maladie cardiovasculaire ou fragilité (oraux) ; prudence ≥ 65 ans (IPP ou coxib si risque digestif)

Infiltration intra-articulaire du genou :
- Triamcinolone 40 mg (aussi efficace que 80 mg) ; bénéfice surtout de 1 à 6 sem, nul à 6 mois ; espacer d'au moins 3–4 mois — *Jüni et coll., 2015, Cochrane*
- Jamais avant d'avoir exclu une infection ; éviter dans les 3 mois précédant une arthroplastie ; aviser les diabétiques d'une hausse transitoire de la glycémie

Pour tous :
- Enseignement : nature de l'atteinte, pronostic, autogestion
- Consignes de reconsultation : fièvre, genou chaud et enflé, blocage, mollet enflé, douleur nocturne
