# Douleur à la hanche ou à l'aine : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs hanche` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 306 (validés 0, vérifiés 25, à vérifier 8, provisoires 273).

## Coxarthrose

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 2 %, 45 ans 12 %, 60 ans 30 %, 75 ans 40 %, 90 ans 45 %.

Repères publiés : Symptomatique 9,2 % après 45 ans ; 6,2 % après 60 ans ; 8 % à 35–70 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>coxarthrose` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>coxarthrose` | Hanche atteinte | — | — | Les deux 1,3 | provisoire | — |
| `travail>coxarthrose` | Occupation | — | — | Travail physique (charges, manutention) 1,3 | provisoire | — |
| `atcd_fam_arthrose>coxarthrose` | ATCD familial d'arthrose | 34 % | 84 % | 2,12 / 0,79 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV+ 2,1 (1,2–3,6) |
| `atcd_gonarthrose>coxarthrose` | Gonarthrose connue | 33 % | 84 % | 2,06 / 0,8 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV+ 2,1 |
| `atcd_hanche_enfance>coxarthrose` | Maladie de la hanche dans l'enfance (dysplasie, Perthes, épiphysiolyse) | — | — | 2,5 / 0,95 | provisoire | — |
| `obesite>coxarthrose` | Obésité (IMC 30 ou plus) | — | — | 1,5 / 0,9 | provisoire | — |
| `premier>coxarthrose` | Premier épisode | — | — | 0,8 / 1,3 | provisoire | — |
| `duree>coxarthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>coxarthrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 3 | provisoire | — |
| `localisation.aine>coxarthrose` | Où est la douleur : Aine | 39 % | 74 % | 1,5 / 0,82 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : douleur inguinale |
| `localisation.cuisse_med>coxarthrose` | Où est la douleur : Face médiale de la cuisse (maximale) | 12 % | 98 % | 6 / 0,9 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : douleur maximale à la face médiale de la cuisse, RV+ 7,8 (1,7–37) |
| `localisation.laterale>coxarthrose` | Où est la douleur : Latérale, sur le grand trochanter | — | — | 0,8 / 1 | provisoire | — |
| `localisation.fesse>coxarthrose` | Où est la douleur : Fesse | — | — | 1,2 / 1 | provisoire | — |
| `localisation.sous_genou>coxarthrose` | Où est la douleur : Irradie sous le genou | — | — | 0,7 / 1 | provisoire | — |
| `type_douleur>coxarthrose` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `escaliers>coxarthrose` | Pire dans les escaliers ou les pentes | 68 % | 68 % | 2,13 / 0,47 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV+ 2,1 ; RV− 0,47 |
| `premiers_pas>coxarthrose` | Douleur aux premiers pas après le repos | 92 % | 26 % | 1,24 / 0,31 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV+ 1,2 ; RV− 0,31 |
| `assis>coxarthrose` | Pire en position assise prolongée | — | — | 0,7 / 1,1 | provisoire | — |
| `soulage_assis>coxarthrose` | Soulagée en position assise | 92 % | 33 % | 1,37 / 0,24 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV+ 1,4 ; RV− 0,24 |
| `couche_cote>coxarthrose` | Pire couché sur le côté atteint | — | — | 1,2 / 0,95 | provisoire | — |
| `chaussettes>coxarthrose` | Difficulté à mettre chaussures et chaussettes | — | — | 2,5 / 0,6 | provisoire | — |
| `moment>coxarthrose` | Horaire | — | — | Pire le matin, mieux en bougeant 1,3 | provisoire | — |
| `nocturne>coxarthrose` | Douleur la nuit | — | — | 1,3 / 0,9 | provisoire | — |
| `raideur>coxarthrose` | Raideur matinale | — | — | Moins de 30 minutes 1,6 ; Aucune 0,8 | a_verifier | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : raideur matinale de moins de 60 min, RV+ 1,5–1,7 (seuil différent de l'outil) |
| `demarche>coxarthrose` | Démarche | — | — | Boiterie antalgique 1,5 ; Normale 0,35 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : boiterie, Se 85 %, Sp 43 % |
| `squat_hanche>coxarthrose` | Accroupissement profond | — | — | Limité 2 | provisoire | — |
| `squat_hanche>coxarthrose` | Accroupissement profond (positif : douleur postérieure (fesse)) | 24 % | 96 % | 6 / 0,79 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : douleur postérieure à l'accroupissement, RV+ 6,1 |
| `p_inguinal>coxarthrose` | Pli inguinal | 60 % | 75 % | 2,4 / 0,53 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : ligament inguinal douloureux, RV+ 2,4 |
| `arom_flexion>coxarthrose` | Flexion active | — | — | Limitée avec douleur 1,5 ; Limitée par raideur 2 | provisoire | — |
| `arom_extension>coxarthrose` | Extension active | — | — | Limitée avec douleur 1,3 ; Limitée par raideur 1,5 | provisoire | — |
| `prom_ri>coxarthrose` | Rotation interne passive (90° de flexion) | — | — | Complète, fin douloureuse 1,2 | provisoire | — |
| `prom_ri>coxarthrose` | Rotation interne passive (90° de flexion) (positif : limitée avec douleur, limitée par raideur) | 66 % | 79 % | 3,14 / 0,43 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : rotation interne diminuée, RV+ 3,2 |
| `prom_re>coxarthrose` | Rotation externe passive | — | — | Limitée avec douleur 2 ; Limitée par raideur 2,5 | provisoire | — |
| `prom_add>coxarthrose` | Adduction passive (positif : limitée avec douleur, limitée par raideur) | 80 % | 81 % | 4,21 / 0,25 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : adduction passive diminuée, RV+ 4,2 ; RV− 0,25 |
| `prom_abd>coxarthrose` | Abduction passive (positif : limitée avec douleur, limitée par raideur) | 88 % | 46 % | 1,63 / 0,26 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : abduction normale, RV− 0,26 |
| `douleur_aine_passive>coxarthrose` | Douleur à l'aine en abduction ou adduction passive | 33 % | 94 % | 5,5 / 0,71 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV+ 5,7 |
| `rrom_abd>coxarthrose` | Abduction résistée (positif : faible) | 44 % | 90 % | 4,4 / 0,62 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : faiblesse des abducteurs, RV+ 4,5 |
| `scour>coxarthrose` | Scour test | — | — | 2 / 0,6 | provisoire | — |
| `faber>coxarthrose` | FABER (Patrick) | — | — | 1,3 / 0,9 | provisoire | — |
| `grappe:sutlive>coxarthrose` | Combinaison : Cluster de Sutlive : 4 sur 5 ou plus | — | — | 24,3 / — | verifie | Sutlive et coll., 2008, JOSPT (PMID 18758047) : RV+ 24,3 (4,4–142,1), n = 72 |
| `grappe:bierma_pos>coxarthrose` | Combinaison : Cluster de Bierma-Zeinstra : 4 sur 5 ou plus | — | — | 4,9 / — | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV+ 4,9 |
| `grappe:bierma_neg>coxarthrose` | Combinaison : Cluster de Bierma-Zeinstra : 1 sur 5 ou moins | — | — | — / 0,24 | verifie | Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose) : RV− 0,24 |

Conduite :
- Investigation : diagnostic clinique si ≥ 45 ans, douleur liée à l'activité et raideur matinale absente ou ≤ 30 min ; signes utiles : douleur à l'aine à la mobilisation passive, rotation interne et adduction limitées, douleur postérieure à l'accroupissement. Radiographie (bassin de face et profil de hanche) si tableau atypique, douleur sévère ou rapidement progressive, ou avant une référence chirurgicale. IRM rarement utile (suspicion d'ostéonécrose, de fracture d'insuffisance, de tumeur ou d'infection). — *Metcalfe et coll., 2019, JAMA ; Tang et coll., 2025, Nature Reviews ; Katz et coll., 2021, JAMA ; Kolasinski et coll., 2020, Arthritis & Rheumatology ; Bannuru et coll., 2019, Osteoarthritis and Cartilage (PMID 31278997) ; Hannon et coll., 2023, Arthritis & Rheumatology*
- Traitement : éducation et exercice (traitement de base), perte de poids si surpoids (bénéfice extrapolé du genou), canne ; AINS oral en première intention pharmacologique, à dose minimale et en cure courte ; acétaminophène à effet faible ; pas d'opioïdes. Infiltration intra-articulaire échoguidée : lignes directrices divergentes (recommandée par l'ACR, non recommandée par l'OARSI) ; bénéfice net à 2 sem et 2 mois, nul à 4–6 mois ; à réserver aux poussées. — *Metcalfe et coll., 2019, JAMA ; Tang et coll., 2025, Nature Reviews ; Katz et coll., 2021, JAMA ; Kolasinski et coll., 2020, Arthritis & Rheumatology ; Bannuru et coll., 2019, Osteoarthritis and Cartilage (PMID 31278997) ; Hannon et coll., 2023, Arthritis & Rheumatology*
- Suivi : 3 mois. — *Metcalfe et coll., 2019, JAMA ; Tang et coll., 2025, Nature Reviews ; Katz et coll., 2021, JAMA ; Kolasinski et coll., 2020, Arthritis & Rheumatology ; Bannuru et coll., 2019, Osteoarthritis and Cartilage (PMID 31278997) ; Hannon et coll., 2023, Arthritis & Rheumatology*
- Retour / référence : échec après environ 6 mois de traitement bien conduit, ou plus tôt si douleur nocturne, périmètre de marche très réduit ou perte fonctionnelle marquée → orthopédie avec radiographies récentes (une fois le patient candidat, ne pas retarder la chirurgie pour d'autres traitements non chirurgicaux) ; aggravation rapide → nouvelle radiographie (ostéonécrose, arthrose rapidement destructrice). — *Metcalfe et coll., 2019, JAMA ; Tang et coll., 2025, Nature Reviews ; Katz et coll., 2021, JAMA ; Kolasinski et coll., 2020, Arthritis & Rheumatology ; Bannuru et coll., 2019, Osteoarthritis and Cartilage (PMID 31278997) ; Hannon et coll., 2023, Arthritis & Rheumatology*

## Syndrome douloureux du grand trochanter (tendinopathie glutéale)

Probabilité de départ (provisoire) : 12 ans 1 %, 25 ans 3 %, 40 ans 12 %, 55 ans 20 %, 70 ans 20 %, 85 ans 15 % ; femme ×2,2, homme ×0,45.

Repères publiés : 1,8–5,6/1 000/an ; 10–20 % des douleurs de hanche en médecine générale ; 17,6 % à 50–79 ans, femmes 23,5 % (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>sdgt` | Hanche atteinte | — | — | Les deux 1,3 | provisoire | — |
| `sport.course>sdgt` | Activités physiques : Course à pied | — | — | 1,3 / 1 | provisoire | — |
| `obesite>sdgt` | Obésité (IMC 30 ou plus) | — | — | 1,5 / 0,9 | provisoire | — |
| `duree>sdgt` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>sdgt` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2 ; Insidieux 2 | provisoire | — |
| `localisation.aine>sdgt` | Où est la douleur : Aine | — | — | 0,4 / 1,2 | provisoire | — |
| `localisation.laterale>sdgt` | Où est la douleur : Latérale, sur le grand trochanter | — | — | 6 / 0,2 | provisoire | — |
| `localisation.fesse>sdgt` | Où est la douleur : Fesse | — | — | 1,3 / 0,9 | provisoire | — |
| `escaliers>sdgt` | Pire dans les escaliers ou les pentes | — | — | 1,3 / 0,9 | provisoire | — |
| `couche_cote>sdgt` | Pire couché sur le côté atteint | — | — | 4 / 0,3 | provisoire | — |
| `chaussettes>sdgt` | Difficulté à mettre chaussures et chaussettes | — | — | 0,3 / 1,2 | a_verifier | Fearon et coll., 2013, BJSM (PMID 22983121) : rapport de cotes 0,06 pour le syndrome trochantérien (oriente vers la coxarthrose) |
| `moment>sdgt` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>sdgt` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `ressaut>sdgt` | Ressaut audible ou visible de la hanche | — | — | 1,3 / 0,95 | provisoire | — |
| `demarche>sdgt` | Démarche | — | — | Boiterie antalgique 1,3 | provisoire | — |
| `trendelenburg>sdgt` | Trendelenburg | — | — | Positif 3,1 ; Négatif 0,36 | verifie | Grimaldi et coll., 2015, Sports Med : Se 72,7 %, Sp 76,9 % |
| `appui_uni>sdgt` | Appui unipodal | — | — | Instable ou douloureux 2 | provisoire | — |
| `p_trochanter>sdgt` | Grand trochanter | — | — | 1,6 / 0,3 | a_verifier | Grimaldi et coll., 2017, BJSM (PMID 27633027) : Se 80 %, Sp faible ; indolore, la tendinopathie est peu probable |
| `rrom_abd>sdgt` | Abduction résistée | — | — | Douloureuse 3 | provisoire | — |
| `rrom_abd>sdgt` | Abduction résistée (positif : faible) | 80 % | 71 % | 2,76 / 0,28 | verifie | Grimaldi et coll., 2015, Sports Med : force des abducteurs diminuée, RV+ 2,8 ; RV− 0,28 |
| `rrom_derot>sdgt` | Dérotation externe résistée | 88 % | 97 % | 32,59 / 0,12 | verifie | Lequesne et coll., 2008, Arthritis Rheum (n = 17) |
| `appui_30s>sdgt` | Appui unipodal 30 s : douleur trochantérienne | — | — | 12 / — | verifie | Grimaldi et coll., 2017, BJSM (PMID 27633027) : Sp 100 %, RV+ ≈ 12 (Lequesne 2008 : Se 100 %, Sp 97,3 %, n = 17) |

Conduite :
- Investigation : clinique (douleur latérale, sensibilité à la palpation du grand trochanter, douleur en décubitus latéral) ; pas d'imagerie initiale ; échographie ou IRM si échec (déchirure du moyen fessier ; les anomalies tendineuses sont fréquentes chez les sujets asymptomatiques). Atteinte bilatérale avec raideur matinale → penser à la polymyalgia rheumatica. — *Mellor et coll., 2018, BMJ (PMID 29720374)*
- Traitement : éducation sur la gestion de la charge (éviter les positions prolongées en adduction de hanche) et exercices supervisés pendant 8 sem : succès global de 77 % contre 58 % pour l'infiltration et 29 % pour l'attente à 8 sem ; 78 % contre 57 % à 1 an. Analgésie de base. Infiltration : soulagement à court terme seulement, option si la douleur empêche la rééducation. — *Mellor et coll., 2018, BMJ (PMID 29720374)*
- Suivi : 8 sem. — *Mellor et coll., 2018, BMJ (PMID 29720374)*
- Retour / référence : absence d'amélioration à 3 mois → imagerie, puis physiatrie ou orthopédie ; faiblesse nette des abducteurs (Trendelenburg) → rechercher une rupture. — *Mellor et coll., 2018, BMJ (PMID 29720374)*

## Pubalgie des adducteurs

Probabilité de départ (provisoire) : 12 ans 3 %, 18 ans 8 %, 25 ans 7 %, 40 ans 3 %, 60 ans 1 % ; homme ×1,8, femme ×0,55.

Repères publiés : Hanche et aine : 11 % des blessures sportives ; adducteurs 63–68 % des lésions hanche-aine du sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>adducteurs` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>adducteurs` | Hanche atteinte | — | — | Les deux 0,5 | provisoire | — |
| `sport.aucun>adducteurs` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.pivot>adducteurs` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2,5 / 1 | provisoire | — |
| `sport.raquette>adducteurs` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>adducteurs` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `sport.glisse>adducteurs` | Activités physiques : Ski ou planche | — | — | 1,3 / 1 | provisoire | — |
| `duree>adducteurs` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 ; 1 à 6 semaines 1,3 | provisoire | — |
| `apparition>adducteurs` | Mode d'apparition | — | — | Subit, avec un traumatisme 2 ; Graduel 2 | provisoire | — |
| `mecanisme>adducteurs` | Mécanisme | — | — | Sprint, frappe ou contraction explosive 2 ; Grand écart ou étirement brusque 3 | provisoire | — |
| `localisation.aine>adducteurs` | Où est la douleur : Aine | — | — | 1,5 / 0,7 | provisoire | — |
| `localisation.cuisse_med>adducteurs` | Où est la douleur : Face médiale de la cuisse (maximale) | — | — | 4 / 0,4 | provisoire | — |
| `localisation.pubis>adducteurs` | Où est la douleur : Pubis (symphyse) | — | — | 2 / 0,7 | provisoire | — |
| `course_sport>adducteurs` | Pire à la course, au sprint ou aux changements de direction | — | — | 3 / 0,4 | provisoire | — |
| `moment>adducteurs` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `p_adducteurs>adducteurs` | Adducteurs (origine pubienne) | — | — | 3 / 0,15 | a_verifier | Serner et coll., 2016, BJSM (PMID 27531521) : indolores, valeur prédictive négative 91–96 % (lésion aiguë, IRM) |
| `prom_abd>adducteurs` | Abduction passive | — | — | Limitée avec douleur 2 | provisoire | — |
| `rrom_add>adducteurs` | Adduction résistée | — | — | 4 / 0,5 | a_verifier | Serner et coll., 2016, BJSM (PMID 27531521) : valeur prédictive positive 80–81 % (lésion aiguë) |

Conduite :
- Investigation : sensibilité des adducteurs et douleur à l'adduction résistée (classification de Doha) ; rechercher les autres entités, souvent associées (ilio-psoas, inguinale, pubienne, hanche) ; radiographie ou IRM si doute sur la hanche ou échec. — *Weir et coll., 2015, British Journal of Sports Medicine (PMID 26031643) ; Hölmich et coll., 1999, Lancet (PMID 9989713)*
- Traitement : programme actif de renforcement 8–12 sem, 3 fois/sem (retour au sport sans douleur chez 23 athlètes contre 4 avec la physiothérapie passive) ; analgésie de base ; dosage de la charge. Prévention : exercice d'adduction de Copenhague. — *Weir et coll., 2015, British Journal of Sports Medicine (PMID 26031643) ; Hölmich et coll., 1999, Lancet (PMID 9989713)*
- Suivi : 4–6 sem. — *Weir et coll., 2015, British Journal of Sports Medicine (PMID 26031643) ; Hölmich et coll., 1999, Lancet (PMID 9989713)*
- Retour / référence : échec à 12 sem → médecine du sport ; douleur aiguë avec ecchymose ou défaut palpable → IRM (avulsion). — *Weir et coll., 2015, British Journal of Sports Medicine (PMID 26031643) ; Hölmich et coll., 1999, Lancet (PMID 9989713)*

## Lésion aiguë des ischio-jambiers

Probabilité de départ (provisoire) : 12 ans 2 %, 18 ans 5 %, 30 ans 5 %, 45 ans 3 %, 60 ans 1 % ; homme ×1,4, femme ×0,7.

Repères publiés : 19–24 % des blessures en football professionnel ; 37 % des lésions musculaires du sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ij_aigu` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>ij_aigu` | Hanche atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.aucun>ij_aigu` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.course>ij_aigu` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `sport.pivot>ij_aigu` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,8 / 1 | provisoire | — |
| `duree>ij_aigu` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 1,2 ; 6 semaines à 3 mois 0,5 ; Plus de 3 mois 0,2 | provisoire | — |
| `apparition>ij_aigu` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Graduel 0,2 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>ij_aigu` | Mécanisme | — | — | Chute sur la hanche 0,3 ; Sprint, frappe ou contraction explosive 4 ; Grand écart ou étirement brusque 3 | provisoire | — |
| `pop_cuisse>ij_aigu` | Claquement ou pop à l'arrière de la cuisse ou au bassin | — | — | 4 / 0,5 | provisoire | — |
| `localisation.ischion>ij_aigu` | Où est la douleur : Ischion (os de la fesse en position assise) | — | — | 2 / 0,8 | provisoire | — |
| `localisation.cuisse_post>ij_aigu` | Où est la douleur : Arrière de la cuisse | — | — | 6 / 0,3 | provisoire | — |
| `course_sport>ij_aigu` | Pire à la course, au sprint ou aux changements de direction | — | — | 2 / 0,6 | provisoire | — |
| `p_ischion>ij_aigu` | Tubérosité ischiatique | — | — | 2 / 0,6 | provisoire | — |
| `p_ij>ij_aigu` | Ischio-jambiers (corps musculaire) | — | — | 5 / 0,3 | provisoire | — |
| `rrom_ij>ij_aigu` | Flexion résistée du genou (ischio-jambiers) | — | — | 4 / 0,3 | provisoire | — |
| `lasegue>ij_aigu` | Lasègue ou slump | — | — | 1,3 / 0,95 | provisoire | — |

Conduite :
- Investigation : clinique ; ecchymose étendue, défaut palpable ou incapacité fonctionnelle marquée → IRM (avulsion proximale) ; chez l'adolescent, radiographie d'abord (avulsion osseuse de la tubérosité ischiatique). — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*
- Traitement : compression, glace, acétaminophène ± AINS à faible dose en cure courte ; rééducation précoce avec exercices d'allongement (retour au jeu en 28 j contre 51 chez des footballeurs d'élite) ; viser au moins 4 sem avant le retour pour les grades 1–2 ; récidive 12–34 %. — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*
- Suivi : 1–2 sem. — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*
- Retour / référence : avulsion de 3 tendons, de 2 tendons rétractés > 2 cm ou avulsion osseuse déplacée → orthopédie rapidement (réparation idéale en ≤ 4 sem ; au-delà d'environ 1 mois, plus de re-ruptures). — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*

## Fracture de la hanche (col ou massif trochantérien)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 60 ans 1 %, 75 ans 5 %, 90 ans 10 % ; femme ×1,5, homme ×0,7.

Repères publiés : 681/100 000 après 55 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>fracture` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>fracture` | Hanche atteinte | — | — | Les deux 0,05 | provisoire | — |
| `osteoporose>fracture` | Ostéoporose ou fracture de fragilité | — | — | 2 / 0,9 | provisoire | — |
| `duree>fracture` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,8 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>fracture` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>fracture` | Mécanisme | — | — | Chute sur la hanche 5 ; Sprint, frappe ou contraction explosive 0,2 ; Coup direct 1,5 | provisoire | — |
| `localisation.aine>fracture` | Où est la douleur : Aine | — | — | 1,5 / 0,8 | provisoire | — |
| `appui_impossible>fracture` | Incapable de mettre du poids sur la jambe | — | — | 4 / 0,3 | provisoire | — |
| `demarche>fracture` | Démarche | — | — | Boiterie antalgique 2 ; Incapable de mettre du poids 4 ; Pied en rotation externe 2 | provisoire | — |
| `percussion>fracture` | Percussion pubo-patellaire | 95 % | 86 % | 6,79 / 0,06 | verifie | Reiman et coll., 2013, BJSM (PMID 22773321) : RV+ 6,8 ; RV− 0,06 |

Conduite :
- Investigation : radiographies du bassin de face et de la hanche de profil. Si négatives mais appui impossible ou douleur importante : IRM en moins de 24 h (TDM si IRM non disponible ; une TDM négative n'exclut pas la fracture). Environ 39 % des aînés avec radiographie négative ont une fracture chirurgicale (44 % après 80 ans). — *Haj-Mirzaian et coll., 2020, Radiology (PMID 32633673) ; Tiwari et coll., 2015, Osteoporosis International (PMID 25146093) ; Klestil et coll., 2018, Scientific Reports ; Griffin et coll., 2016, British Journal of Sports Medicine (PMID 27629403) ; Pun et coll., 2015, Arthritis & Rheumatology ; Griffin et coll., 2022, Health Technology Assessment (PMID 35229713) ; Palmer et coll., 2019, BMJ (PMID 30733197)*
- Traitement : urgence ; à jeun, analgésie (acétaminophène, bloc fémoral ou ilio-fascial à l'urgence, qui réduit aussi le délirium) ; chirurgie en 24–48 h. — *Haj-Mirzaian et coll., 2020, Radiology (PMID 32633673) ; Tiwari et coll., 2015, Osteoporosis International (PMID 25146093) ; Klestil et coll., 2018, Scientific Reports ; Griffin et coll., 2016, British Journal of Sports Medicine (PMID 27629403) ; Pun et coll., 2015, Arthritis & Rheumatology ; Griffin et coll., 2022, Health Technology Assessment (PMID 35229713) ; Palmer et coll., 2019, BMJ (PMID 30733197)*
- Suivi : après le congé : traitement de l'ostéoporose (une fracture de hanche est en soi une indication de traiter selon Ostéoporose Canada 2023), prévention des chutes. — *Haj-Mirzaian et coll., 2020, Radiology (PMID 32633673) ; Tiwari et coll., 2015, Osteoporosis International (PMID 25146093) ; Klestil et coll., 2018, Scientific Reports ; Griffin et coll., 2016, British Journal of Sports Medicine (PMID 27629403) ; Pun et coll., 2015, Arthritis & Rheumatology ; Griffin et coll., 2022, Health Technology Assessment (PMID 35229713) ; Palmer et coll., 2019, BMJ (PMID 30733197)*
- Retour / référence : toute suspicion → urgence le jour même. — *Haj-Mirzaian et coll., 2020, Radiology (PMID 32633673) ; Tiwari et coll., 2015, Osteoporosis International (PMID 25146093) ; Klestil et coll., 2018, Scientific Reports ; Griffin et coll., 2016, British Journal of Sports Medicine (PMID 27629403) ; Pun et coll., 2015, Arthritis & Rheumatology ; Griffin et coll., 2022, Health Technology Assessment (PMID 35229713) ; Palmer et coll., 2019, BMJ (PMID 30733197)*

## Conflit fémoro-acétabulaire ou lésion du labrum

Probabilité de départ (provisoire) : 12 ans 1 %, 15 ans 3 %, 18 ans 7 %, 30 ans 8 %, 45 ans 4 %, 60 ans 1 %.

Repères publiés : 17 % des consultants pour douleur de hanche ; labrum : 22–55 % des hanches douloureuses mais 38–69 % des asymptomatiques (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>cfa` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>cfa` | Hanche atteinte | — | — | Les deux 0,6 | provisoire | — |
| `sport.aucun>cfa` | Activités physiques : Peu ou pas de sport | — | — | 0,6 / 1 | provisoire | — |
| `sport.pivot>cfa` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>cfa` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,8 / 1 | provisoire | — |
| `atcd_hanche_enfance>cfa` | Maladie de la hanche dans l'enfance (dysplasie, Perthes, épiphysiolyse) | — | — | 1,5 / 0,95 | provisoire | — |
| `duree>cfa` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>cfa` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 2 ; Insidieux 1,5 | provisoire | — |
| `localisation.aine>cfa` | Où est la douleur : Aine | — | — | 2,5 / 0,2 | a_verifier | Tijssen et coll., 2017, Scand J Med Sci Sports (arthroscopie) : aine comme site principal chez 87 % (Sp non interprétable) |
| `assis>cfa` | Pire en position assise prolongée | — | — | 2 / 0,7 | provisoire | — |
| `course_sport>cfa` | Pire à la course, au sprint ou aux changements de direction | — | — | 1,5 / 0,8 | provisoire | — |
| `clic>cfa` | Clic, accrochage ou blocage dans l'aine | — | — | 2 / 0,8 | a_verifier | Tijssen et coll., 2017, Scand J Med Sci Sports (arthroscopie) : clic 57 %, dérobade 28 %, blocage 26 % (Sp non interprétable) |
| `squat_hanche>cfa` | Accroupissement profond | — | — | Douleur à l'aine 1,8 | provisoire | — |
| `arom_flexion>cfa` | Flexion active | — | — | Complète, fin douloureuse 1,5 ; Limitée avec douleur 1,5 | provisoire | — |
| `prom_ri>cfa` | Rotation interne passive (90° de flexion) | — | — | Complète, fin douloureuse 1,5 | provisoire | — |
| `prom_ri>cfa` | Rotation interne passive (90° de flexion) (positif : limitée avec douleur, limitée par raideur) | 29 % | 94 % | 4,83 / 0,76 | verifie | Pålsson et coll., 2020, KSSTA (PMID 32335699) : rotation interne limitée en position neutre, RV+ 4,8 |
| `rrom_flexion>cfa` | Flexion résistée de la hanche | — | — | 1,3 / 0,9 | provisoire | — |
| `fadir>cfa` | FADIR | 96 % | 5 % | 1,01 / 0,8 | verifie | Reiman et coll., 2015, BJSM, méta-analyse (PMID 25515771) : Se 94–99 %, Sp 5 % |
| `faber>cfa` | FABER (Patrick) | — | — | 1,5 / 0,8 | provisoire | — |
| `drehmann>cfa` | Drehmann (rotation externe obligatoire à la flexion) | — | — | 1,3 / 0,95 | provisoire | — |

Conduite :
- Investigation : le diagnostic exige la triade symptômes, signes cliniques et imagerie (consensus de Warwick) ; test de flexion-adduction-rotation interne ni sensible ni spécifique ; radiographie du bassin de face et incidence de Dunn (morphologie en came ou en pince). La morphologie en came est fréquente chez les sujets asymptomatiques (environ 1 adulte sur 4, 1 athlète sur 2) : ne pas traiter l'image. IRM ou arthro-IRM si échec ou chirurgie envisagée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*
- Traitement : physiothérapie ciblée en premier, éducation, modification des activités, analgésie de base ; l'arthroscopie donne un gain modeste à 12 mois (environ 7 points sur 100 au score iHOT-33, près du seuil de pertinence clinique) : décision partagée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*
- Suivi : 3 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*
- Retour / référence : échec après 3–6 mois chez un patient sans arthrose établie, ou blocage vrai → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*

## Ilio-psoas ou hanche à ressaut

Probabilité de départ (provisoire) : 12 ans 2 %, 20 ans 4 %, 35 ans 3 %, 60 ans 1 %.

Repères publiés : 12–36 % des douleurs inguinales du sportif (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>psoas` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.aucun>psoas` | Activités physiques : Peu ou pas de sport | — | — | 0,5 / 1 | provisoire | — |
| `sport.course>psoas` | Activités physiques : Course à pied | — | — | 1,3 / 1 | provisoire | — |
| `sport.pivot>psoas` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>psoas` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 2,5 / 1 | provisoire | — |
| `duree>psoas` | Depuis combien de temps | — | — | 1 à 6 semaines 1,2 | provisoire | — |
| `apparition>psoas` | Mode d'apparition | — | — | Graduel 2 | provisoire | — |
| `mecanisme>psoas` | Mécanisme | — | — | Sprint, frappe ou contraction explosive 1,5 | provisoire | — |
| `localisation.aine>psoas` | Où est la douleur : Aine | — | — | 2,5 / 0,6 | provisoire | — |
| `course_sport>psoas` | Pire à la course, au sprint ou aux changements de direction | — | — | 2 / 0,7 | provisoire | — |
| `clic>psoas` | Clic, accrochage ou blocage dans l'aine | — | — | 3 / 0,8 | provisoire | — |
| `ressaut>psoas` | Ressaut audible ou visible de la hanche | — | — | 6 / 0,7 | provisoire | — |
| `squat_hanche>psoas` | Accroupissement profond | — | — | Douleur à l'aine 1,3 | provisoire | — |
| `p_inguinal>psoas` | Pli inguinal | — | — | 2 / 0,7 | provisoire | — |
| `p_psoas>psoas` | Ilio-psoas (sous le ligament inguinal) | — | — | 3 / 0,5 | provisoire | — |
| `arom_extension>psoas` | Extension active | — | — | Limitée avec douleur 1,5 | provisoire | — |
| `rrom_flexion>psoas` | Flexion résistée de la hanche | — | — | 3 / 0,5 | provisoire | — |

Conduite :
- Investigation : ressaut antérieur à l'extension de la hanche fléchie ; le ressaut indolore est banal (environ 10 % de la population) ; échographie dynamique au besoin ; radiographie ou IRM si pathologie intra-articulaire suspectée. — *Maloy et coll., 2025, American Family Physician ; Benzon et coll., 2025, Regional Anesthesia and Pain Medicine*
- Traitement : ressaut indolore : rassurer. Douloureux : physiothérapie (étirements et renforcement) pendant ≥ 3 mois (environ 63 % améliorés) ; infiltration échoguidée de la bourse si échec (soulagement chez environ 72 %). — *Maloy et coll., 2025, American Family Physician ; Benzon et coll., 2025, Regional Anesthesia and Pain Medicine*
- Suivi : 6–8 sem. — *Maloy et coll., 2025, American Family Physician ; Benzon et coll., 2025, Regional Anesthesia and Pain Medicine*
- Retour / référence : échec après ≥ 3 mois → orthopédie ou médecine du sport. — *Maloy et coll., 2025, American Family Physician ; Benzon et coll., 2025, Regional Anesthesia and Pain Medicine*

## Syndrome du piriforme (fessier profond)

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 2 %, 50 ans 3 %, 70 ans 2 % ; femme ×1,3, homme ×0,8.

Repères publiés : 6–8 % des sciatiques (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>piriforme` | Depuis combien de temps | — | — | Plus de 3 mois 1,5 | provisoire | — |
| `apparition>piriforme` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Insidieux 2 | provisoire | — |
| `localisation.fesse>piriforme` | Où est la douleur : Fesse | — | — | 4 / 0,5 | provisoire | — |
| `localisation.ischion>piriforme` | Où est la douleur : Ischion (os de la fesse en position assise) | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.sous_genou>piriforme` | Où est la douleur : Irradie sous le genou | — | — | 1,5 / 0,9 | provisoire | — |
| `type_douleur>piriforme` | Type de douleur | — | — | Brûlure 1,5 ; Choc électrique 1,5 | provisoire | — |
| `assis>piriforme` | Pire en position assise prolongée | — | — | 3 / 0,6 | provisoire | — |
| `paresthesies>piriforme` | Engourdissements ou picotements dans la jambe | — | — | 3 / 0,7 | provisoire | — |
| `douleur_dos>piriforme` | Lombalgie | — | — | 1,3 / 0,95 | provisoire | — |
| `p_fessier>piriforme` | Région fessière profonde (piriforme) | — | — | 4 / 0,4 | provisoire | — |
| `lasegue>piriforme` | Lasègue ou slump | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : diagnostic d'exclusion (éliminer d'abord une cause lombaire) ; test d'étirement du piriforme en position assise (sensibilité 91 %, spécificité 80 %) ; IRM ou EMG si réfractaire. — *Chamberlain, 2021, American Family Physician ; Park et coll., 2020, Bone & Joint Journal (PMID 32349600) ; Hilal et coll., 2022, Pain Physician (PMID 35901473)*
- Traitement : étirements et physiothérapie, AINS ; infiltration (anesthésique avec corticoïde) si échec, sur la base de données de faible qualité. — *Chamberlain, 2021, American Family Physician ; Park et coll., 2020, Bone & Joint Journal (PMID 32349600) ; Hilal et coll., 2022, Pain Physician (PMID 35901473)*
- Suivi : 6–8 sem. — *Chamberlain, 2021, American Family Physician ; Park et coll., 2020, Bone & Joint Journal (PMID 32349600) ; Hilal et coll., 2022, Pain Physician (PMID 35901473)*
- Retour / référence : déficit neurologique → investigation lombaire ; échec prolongé → physiatrie ou orthopédie. — *Chamberlain, 2021, American Family Physician ; Park et coll., 2020, Bone & Joint Journal (PMID 32349600) ; Hilal et coll., 2022, Pain Physician (PMID 35901473)*

## Méralgie paresthésique

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 50 ans 2 %, 70 ans 1 %.

Repères publiés : 32,6/100 000 p-a (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>meralgie` | Hanche atteinte | — | — | Les deux 0,5 | provisoire | — |
| `obesite>meralgie` | Obésité (IMC 30 ou plus) | — | — | 2 / 0,9 | provisoire | — |
| `duree>meralgie` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>meralgie` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Insidieux 2 | provisoire | — |
| `localisation.laterale>meralgie` | Où est la douleur : Latérale, sur le grand trochanter | — | — | 1,2 / 1 | provisoire | — |
| `localisation.cuisse_lat_brulure>meralgie` | Où est la douleur : Face antéro-latérale de la cuisse, brûlure ou engourdissement | — | — | 10 / 0,2 | provisoire | — |
| `type_douleur>meralgie` | Type de douleur | — | — | Brûlure 3 | provisoire | — |
| `paresthesies>meralgie` | Engourdissements ou picotements dans la jambe | — | — | 3 / 0,8 | provisoire | — |
| `p_epines>meralgie` | Épines iliaques antérieures (supérieure, inférieure) | — | — | 1,5 / 0,9 | provisoire | — |
| `pelvic_comp>meralgie` | Compression du nerf cutané latéral (sous l'épine iliaque antéro-supérieure) | — | — | 5 / 0,4 | provisoire | — |

Conduite :
- Investigation : clinique (paresthésies ou brûlure antéro-latérale de la cuisse, sans déficit moteur) ; EMG ou imagerie si tableau atypique ou masse suspectée. — *Nofal et coll., 2012, Cochrane Database of Systematic Reviews ; Kloosterziel et coll., 2020, Muscle & Nerve*
- Traitement : vêtements amples, retrait des ceintures serrées, perte de poids ; amélioration spontanée chez environ 69 % ; AINS ou agent neuropathique au besoin. Infiltration : séries observationnelles favorables, mais un essai contrôlé ne montre pas de supériorité sur le placebo. — *Nofal et coll., 2012, Cochrane Database of Systematic Reviews ; Kloosterziel et coll., 2020, Muscle & Nerve*
- Suivi : 6–8 sem. — *Nofal et coll., 2012, Cochrane Database of Systematic Reviews ; Kloosterziel et coll., 2020, Muscle & Nerve*
- Retour / référence : déficit moteur, atteinte des réflexes (ce n'est pas une méralgie) ou symptômes invalidants persistants → neurologie ou chirurgie. — *Nofal et coll., 2012, Cochrane Database of Systematic Reviews ; Kloosterziel et coll., 2020, Muscle & Nerve*

## Ostéite pubienne (douleur pubienne de l'athlète)

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 2 %, 30 ans 2 %, 45 ans 1 % ; homme ×2, femme ×0,5.

Repères publiés : 0,5–8 % des athlètes ; 9 % des lésions hanche-aine du sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>osteite` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>osteite` | Hanche atteinte | — | — | Les deux 1,5 | provisoire | — |
| `sport.aucun>osteite` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.pivot>osteite` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2 / 1 | provisoire | — |
| `sport.contact>osteite` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `duree>osteite` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>osteite` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2,5 | provisoire | — |
| `localisation.pubis>osteite` | Où est la douleur : Pubis (symphyse) | — | — | 6 / 0,3 | provisoire | — |
| `course_sport>osteite` | Pire à la course, au sprint ou aux changements de direction | — | — | 3 / 0,4 | provisoire | — |
| `toux>osteite` | Pire à la toux ou à l'éternuement | — | — | 1,5 / 0,95 | provisoire | — |
| `p_symphyse>osteite` | Symphyse pubienne | — | — | 5 / 0,3 | provisoire | — |
| `rrom_add>osteite` | Adduction résistée | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : sensibilité de la symphyse et de l'os adjacent ; IRM seulement en l'absence d'amélioration. — *Henning, 2014, Sports Health ; Chen et coll., 2024, Current Reviews in Musculoskeletal Medicine*
- Traitement : réadaptation active, dosage de la charge, analgésie de base ; retour au sport en environ 3, 7 et 10 sem selon le stade (I à III) ; guérison parfois sur 6–12 mois. — *Henning, 2014, Sports Health ; Chen et coll., 2024, Current Reviews in Musculoskeletal Medicine*
- Suivi : 4–6 sem. — *Henning, 2014, Sports Health ; Chen et coll., 2024, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : échec après ≥ 12 sem → médecine du sport ou orthopédie ; fièvre ou antécédent de chirurgie pelvienne → exclure une ostéomyélite †. — *Henning, 2014, Sports Health ; Chen et coll., 2024, Current Reviews in Musculoskeletal Medicine*

## Pubalgie pariétale (douleur inguinale de l'athlète)

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 2 %, 30 ans 2 %, 45 ans 1 % ; homme ×2,5, femme ×0,4.

Repères publiés : 2–5 % des blessures sportives ; 7 % chez le sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>parietale` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.aucun>parietale` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.pivot>parietale` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2,5 / 1 | provisoire | — |
| `sport.contact>parietale` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `duree>parietale` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>parietale` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Graduel 2,5 | provisoire | — |
| `localisation.aine>parietale` | Où est la douleur : Aine | — | — | 2 / 0,6 | provisoire | — |
| `course_sport>parietale` | Pire à la course, au sprint ou aux changements de direction | — | — | 3 / 0,4 | provisoire | — |
| `toux>parietale` | Pire à la toux ou à l'éternuement | — | — | 4 / 0,7 | provisoire | — |
| `p_canal>parietale` | Canal inguinal (orifice superficiel) | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Investigation : douleur du canal inguinal sans hernie palpable, aggravée par les abdominaux résistés, la toux ou le Valsalva ; échographie dynamique pour exclure une hernie vraie. — *Forlizzi et coll., 2023, American Journal of Sports Medicine*
- Traitement : physiothérapie 8–12 sem, analgésie de base. — *Forlizzi et coll., 2023, American Journal of Sports Medicine*
- Suivi : 6 sem. — *Forlizzi et coll., 2023, American Journal of Sports Medicine*
- Retour / référence : persistance après 8–12 sem → chirurgie générale (dans un essai, retour au sport à 3 mois chez 90 % après réparation laparoscopique contre 27 % avec la physiothérapie). — *Forlizzi et coll., 2023, American Journal of Sports Medicine*

## Avulsion apophysaire du bassin (adolescent)

Probabilité de départ (provisoire) : 12 ans 4 %, 14 ans 6 %, 16 ans 5 %, 19 ans 1 %, 25 ans 0 % ; homme ×1,8, femme ×0,55.

Repères publiés : 56 % des lésions apophysaires du membre inférieur en académie de football ; épine iliaque antéro-inférieure 33–49 % (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>avulsion` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>avulsion` | Hanche atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.aucun>avulsion` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.pivot>avulsion` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,8 / 1 | provisoire | — |
| `sport.danse>avulsion` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `duree>avulsion` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>avulsion` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Graduel 0,2 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>avulsion` | Mécanisme | — | — | Sprint, frappe ou contraction explosive 4 ; Grand écart ou étirement brusque 2 | provisoire | — |
| `pop_cuisse>avulsion` | Claquement ou pop à l'arrière de la cuisse ou au bassin | — | — | 3 / 0,6 | provisoire | — |
| `localisation.ischion>avulsion` | Où est la douleur : Ischion (os de la fesse en position assise) | — | — | 2 / 0,9 | provisoire | — |
| `localisation.crete>avulsion` | Où est la douleur : Crête iliaque ou épine antérieure du bassin | — | — | 4 / 0,5 | provisoire | — |
| `appui_impossible>avulsion` | Incapable de mettre du poids sur la jambe | — | — | 1,5 / 0,9 | provisoire | — |
| `p_ischion>avulsion` | Tubérosité ischiatique | — | — | 2 / 0,8 | provisoire | — |
| `p_epines>avulsion` | Épines iliaques antérieures (supérieure, inférieure) | — | — | 5 / 0,3 | provisoire | — |
| `rrom_flexion>avulsion` | Flexion résistée de la hanche | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : douleur brutale au sprint ou au tir ; radiographies du bassin de face et en grenouille (épine iliaque antéro-inférieure, épine iliaque antéro-supérieure, tubérosité ischiatique, crête iliaque). — *Eberbach et coll., 2017, BMC Musculoskeletal Disorders ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Traitement : béquilles avec appui protégé jusqu'à la marche indolore (3–6 sem), puis rééducation progressive ; retour au sport vers 3–4 mois. — *Eberbach et coll., 2017, BMC Musculoskeletal Disorders ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Suivi : 2 sem, puis 6 sem (radiographie de contrôle). — *Eberbach et coll., 2017, BMC Musculoskeletal Disorders ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Retour / référence : déplacement > 1,5–2 cm (seuil d'experts, non validé), avulsion de la tubérosité ischiatique (plus de douleurs persistantes), non-union symptomatique → orthopédie. — *Eberbach et coll., 2017, BMC Musculoskeletal Disorders ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*

## Tendinopathie proximale des ischio-jambiers

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 2 %, 40 ans 3 %, 60 ans 2 %.

Repères publiés : Pas d'incidence ; coureurs (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ij_tendino` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.course>ij_tendino` | Activités physiques : Course à pied | — | — | 2 / 1 | provisoire | — |
| `duree>ij_tendino` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>ij_tendino` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2,5 | provisoire | — |
| `localisation.fesse>ij_tendino` | Où est la douleur : Fesse | — | — | 2 / 0,7 | provisoire | — |
| `localisation.ischion>ij_tendino` | Où est la douleur : Ischion (os de la fesse en position assise) | — | — | 6 / 0,3 | provisoire | — |
| `localisation.cuisse_post>ij_tendino` | Où est la douleur : Arrière de la cuisse | — | — | 2 / 0,8 | provisoire | — |
| `assis>ij_tendino` | Pire en position assise prolongée | — | — | 3 / 0,5 | provisoire | — |
| `p_ischion>ij_tendino` | Tubérosité ischiatique | — | — | 4 / 0,3 | provisoire | — |
| `p_fessier>ij_tendino` | Région fessière profonde (piriforme) | — | — | 1,3 / 0,95 | provisoire | — |
| `rrom_ij>ij_tendino` | Flexion résistée du genou (ischio-jambiers) | — | — | 2,5 / 0,5 | provisoire | — |

Conduite :
- Investigation : clinique (douleur ischiatique à la position assise et à la course) ; IRM si doute ou échec. — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*
- Traitement : mise en charge progressive (excentrique ou résistance lente lourde), dosage de la charge ; ondes de choc en option (dans un essai, 80 % de retour au sport à 3 mois) ; l'infiltration de corticoïde ne soulage durablement qu'une minorité (23–38 % à 6 mois). — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*
- Suivi : 6–8 sem. — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*
- Retour / référence : environ 20 % d'échecs à 6 mois → médecine du sport ou orthopédie. — *Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Askling et coll., 2014, British Journal of Sports Medicine (PMID 24620041) ; Yetter et coll., 2024, Current Reviews in Musculoskeletal Medicine ; Lefèvre et coll., 2024, American Journal of Sports Medicine*

## Épiphysiolyse fémorale supérieure

Probabilité de départ (provisoire) : 10 ans 2 %, 12 ans 3 %, 14 ans 3 %, 16 ans 1 %, 18 ans 0 % ; homme ×1,6, femme ×0,6.

Repères publiés : Environ 10,8/100 000 enfants (4,8 dans une autre série) (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>epiphysiolyse` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>epiphysiolyse` | Hanche atteinte | — | — | Les deux 1,2 | provisoire | — |
| `apparition>epiphysiolyse` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 ; Subit, sans traumatisme 2 ; Graduel 1,5 | provisoire | — |
| `appui_impossible>epiphysiolyse` | Incapable de mettre du poids sur la jambe | — | — | 3 / 0,8 | provisoire | — |
| `demarche>epiphysiolyse` | Démarche | — | — | Boiterie antalgique 3 ; Pied en rotation externe 4 | provisoire | — |
| `prom_ri>epiphysiolyse` | Rotation interne passive (90° de flexion) | — | — | Limitée avec douleur 4 ; Limitée par raideur 4 ; Complète et indolore 0,2 | provisoire | — |
| `drehmann>epiphysiolyse` | Drehmann (rotation externe obligatoire à la flexion) | — | — | 15 / 0,3 | provisoire | — |

Conduite :
- Investigation : adolescent avec boiterie et douleur de la hanche, de l'aine, de la cuisse ou du genou (douleur au genou comme motif principal dans environ 1 cas sur 4, avec un retard diagnostique plus long) ; perte de rotation interne. Radiographies du bassin de face et en grenouille des deux hanches ; si l'appui est impossible (glissement instable) : face et profil chirurgical, sans position en grenouille. IRM si radiographies équivoques. — *Webb et coll., 2025, American Family Physician ; Martin et coll., 2015, Herman, Melissa Martinek*
- Traitement : décharge immédiate (béquilles ou fauteuil roulant), aucune tentative de réduction ; orthopédie le jour même (fixation idéalement en moins de 24 h). — *Webb et coll., 2025, American Family Physician ; Martin et coll., 2015, Herman, Melissa Martinek*
- Suivi : surveiller la hanche opposée (glissement controlatéral fréquent, surtout dans les 18 mois) ; bilan endocrinien si âge < 10 ans ou > 16 ans, ou petite taille. — *Webb et coll., 2025, American Family Physician ; Martin et coll., 2015, Herman, Melissa Martinek*
- Retour / référence : toute douleur de la hanche ou du genou controlatéral → radiographies immédiates. — *Webb et coll., 2025, American Family Physician ; Martin et coll., 2015, Herman, Melissa Martinek*

## Fracture de stress du col ou de la diaphyse fémorale

Probabilité de départ (provisoire) : 12 ans 0 %, 18 ans 1 %, 30 ans 1 %, 50 ans 0 % ; femme ×1,8, homme ×0,55.

Repères publiés : Moins de 5 % des fractures de stress ; diaphyse : 14,3 % des lésions osseuses de fatigue du coureur (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ff_col` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>ff_col` | Hanche atteinte | — | — | Les deux 0,4 | provisoire | — |
| `sport.aucun>ff_col` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.course>ff_col` | Activités physiques : Course à pied | — | — | 2,5 / 1 | provisoire | — |
| `duree>ff_col` | Depuis combien de temps | — | — | 1 à 6 semaines 1,5 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>ff_col` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 2 ; Graduel 3 | provisoire | — |
| `localisation.aine>ff_col` | Où est la douleur : Aine | — | — | 2 / 0,7 | provisoire | — |
| `course_sport>ff_col` | Pire à la course, au sprint ou aux changements de direction | — | — | 3 / 0,4 | provisoire | — |
| `nocturne>ff_col` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `appui_impossible>ff_col` | Incapable de mettre du poids sur la jambe | — | — | 3 / 0,7 | provisoire | — |
| `demarche>ff_col` | Démarche | — | — | Incapable de mettre du poids 2 | provisoire | — |

Conduite :
- Investigation : coureur ou militaire avec douleur à l'aine à l'effort ; radiographies souvent normales → IRM ; décharge complète et arrêt des activités en attendant l'imagerie ; rechercher un déficit énergétique relatif. — *Schroeder et coll., 2022, American Family Physician ; Shaw et coll., 2022, Journal of Bone and Joint Surgery (PMID 35234724)*
- Traitement : côté compression (inféro-médial, < 50 % de la largeur du col) : décharge ≥ 4–6 sem jusqu'à l'absence de douleur et la guérison à l'imagerie, puis progression (appui partiel, complet, activité sans impact, course). — *Schroeder et coll., 2022, American Family Physician ; Shaw et coll., 2022, Journal of Bone and Joint Surgery (PMID 35234724)*
- Suivi : 2 sem, puis selon l'imagerie de contrôle. — *Schroeder et coll., 2022, American Family Physician ; Shaw et coll., 2022, Journal of Bone and Joint Surgery (PMID 35234724)*
- Retour / référence : côté tension (supéro-latéral), trait ≥ 50 % ou fracture complète → orthopédie immédiate ; fracture déplacée = urgence (ostéonécrose ou non-union jusqu'à 50 %). Référer toutes les formes en médecine du sport ou en orthopédie. — *Schroeder et coll., 2022, American Family Physician ; Shaw et coll., 2022, Journal of Bone and Joint Surgery (PMID 35234724)*
- Investigation : douleur de la cuisse à l'effort ; test du levier (valeur diagnostique mal établie) ; radiographies négatives dans près de 4 cas sur 5 → IRM ; exclure une atteinte du col fémoral ; rechercher un déficit énergétique relatif. — *Boden et coll., 2001, American Journal of Sports Medicine*
- Traitement : site à faible risque : appui partiel 1–4 sem, puis complet ; course légère vers 6 sem ; sport vers 12 sem (plus long si atteinte de haut grade à l'IRM). — *Boden et coll., 2001, American Journal of Sports Medicine*
- Suivi : 2–4 sem. — *Boden et coll., 2001, American Journal of Sports Medicine*
- Retour / référence : douleur au repos ou nocturne, douleur à l'aine, aggravation → nouvelle imagerie et orthopédie. — *Boden et coll., 2001, American Journal of Sports Medicine*

## Ostéonécrose de la tête fémorale

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 45 ans 1 %, 70 ans 1 % ; homme ×1,3, femme ×0,8.

Repères publiés : 2,5/100 000 p-a ; 2ᵉ pic féminin vers 70 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>osteonecrose` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>osteonecrose` | Hanche atteinte | — | — | Les deux 1,5 | provisoire | — |
| `fluoro_cortico>osteonecrose` | Fluoroquinolone ou corticoïde récents | — | — | 5 / 0,8 | a_verifier | Fukushima et coll., 2013 (PMID 23450014) : corticoïdes, rapport de cotes 31,5 (facteur de risque, pas un RV) |
| `duree>osteonecrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 | provisoire | — |
| `apparition>osteonecrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 2 ; Insidieux 2 | provisoire | — |
| `localisation.aine>osteonecrose` | Où est la douleur : Aine | — | — | 2 / 0,7 | provisoire | — |
| `type_douleur>osteonecrose` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `moment>osteonecrose` | Horaire | — | — | Pire le matin, mieux en bougeant 1 ; Constante 1,5 | provisoire | — |
| `nocturne>osteonecrose` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `demarche>osteonecrose` | Démarche | — | — | Boiterie antalgique 1,5 | provisoire | — |
| `prom_ri>osteonecrose` | Rotation interne passive (90° de flexion) | — | — | Limitée avec douleur 2 | provisoire | — |

Conduite :
- Investigation : facteurs de risque (corticoïdes à dose moyenne > 20 mg/j ou cumulée > 2 g de prednisone, alcool, tabac, drépanocytose, lupus, trauma) ; radiographies, puis IRM si normales (évalue aussi la hanche opposée). — *Zalavras et coll., 2014, Journal of the American Academy of Orthopaedic Surgeons (PMID 24966252) ; Dubé et coll., 2024, Archives of Orthopaedic and Trauma Surgery*
- Traitement : analgésie de base, appui protégé † ; réduire les facteurs de risque modifiables ; le zolédronate n'a pas prévenu l'effondrement dans un essai. — *Zalavras et coll., 2014, Journal of the American Academy of Orthopaedic Surgeons (PMID 24966252) ; Dubé et coll., 2024, Archives of Orthopaedic and Trauma Surgery*
- Suivi : selon l'orthopédiste. — *Zalavras et coll., 2014, Journal of the American Academy of Orthopaedic Surgeons (PMID 24966252) ; Dubé et coll., 2024, Archives of Orthopaedic and Trauma Surgery*
- Retour / référence : orthopédie rapidement, avant l'effondrement (décompression possible aux stades précoces ; sans traitement, la majorité des hanches symptomatiques s'effondrent). — *Zalavras et coll., 2014, Journal of the American Academy of Orthopaedic Surgeons (PMID 24966252) ; Dubé et coll., 2024, Archives of Orthopaedic and Trauma Surgery*

## Apophysite de la crête iliaque

Probabilité de départ (provisoire) : 12 ans 2 %, 14 ans 3 %, 17 ans 2 %, 20 ans 0 %, 25 ans 0 %.

Repères publiés : 5,5 % des diagnostics de surmenage chez l'enfant (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>apophysite` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.course>apophysite` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `apparition>apophysite` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Graduel 3 | provisoire | — |
| `localisation.crete>apophysite` | Où est la douleur : Crête iliaque ou épine antérieure du bassin | — | — | 5 / 0,3 | provisoire | — |
| `course_sport>apophysite` | Pire à la course, au sprint ou aux changements de direction | — | — | 2,5 / 0,6 | provisoire | — |
| `p_crete>apophysite` | Crête iliaque | — | — | 5 / 0,3 | provisoire | — |

Conduite :
- Investigation : adolescent coureur, sensibilité de la crête iliaque ; radiographie si douleur aiguë (avulsion). — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Traitement : repos relatif 4–6 sem, analgésie de base, puis rééducation des abducteurs et des abdominaux ; pas d'infiltration de corticoïde ; la reprise prématurée du sprint expose à une avulsion. — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Suivi : 4–6 sem. — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Retour / référence : douleur brutale, impotence → radiographies. — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*

## Contusion de la cuisse ou de la crête iliaque

Probabilité de départ (provisoire) : 12 ans 4 %, 20 ans 5 %, 40 ans 3 %, 70 ans 3 %.

Repères publiés : 18,2 % des blessures hanche-cuisse du sportif (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>contusion` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>contusion` | Hanche atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.contact>contusion` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2,5 / 1 | provisoire | — |
| `sport.glisse>contusion` | Activités physiques : Ski ou planche | — | — | 1,3 / 1 | provisoire | — |
| `duree>contusion` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,8 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>contusion` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>contusion` | Mécanisme | — | — | Chute sur la hanche 2,5 ; Coup direct 5 | provisoire | — |
| `localisation.crete>contusion` | Où est la douleur : Crête iliaque ou épine antérieure du bassin | — | — | 2 / 0,8 | provisoire | — |
| `p_crete>contusion` | Crête iliaque | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : cuisse : gravité selon la flexion du genou à 12–24 h (légère > 90°, modérée 45–90°, sévère < 45°). Crête iliaque : radiographie chez l'adolescent (avulsion). — *Aronen et coll., 2006, Clinical Journal of Sport Medicine (PMID 17016112) ; Trojian, 2013, Clinics in Sports Medicine (PMID 23522512) ; Anderson et coll., 2001, American Journal of Sports Medicine ; Hall et coll., 2013, Clinics in Sports Medicine (PMID 23522513) ; Ryan et coll., 1991, American Journal of Sports Medicine (PMID 1867338)*
- Traitement : cuisse : immobilisation immédiate du genou fléchi à 120° pendant 24 h (série non contrôlée), puis étirements indolores et isométriques ; glace, compression ; AINS au plus 48–72 h ; pas de massage vigoureux précoce ; retour moyen en 2–3 sem selon la gravité. Crête iliaque : glace, compression, béquilles au besoin, rembourrage au retour. — *Aronen et coll., 2006, Clinical Journal of Sport Medicine (PMID 17016112) ; Trojian, 2013, Clinics in Sports Medicine (PMID 23522512) ; Anderson et coll., 2001, American Journal of Sports Medicine ; Hall et coll., 2013, Clinics in Sports Medicine (PMID 23522513) ; Ryan et coll., 1991, American Journal of Sports Medicine (PMID 1867338)*
- Suivi : 1 sem ; myosite ossifiante dans environ 9 % des contusions du quadriceps : y penser sans amélioration à 10–14 j, radiographie à 3–4 sem. — *Aronen et coll., 2006, Clinical Journal of Sport Medicine (PMID 17016112) ; Trojian, 2013, Clinics in Sports Medicine (PMID 23522512) ; Anderson et coll., 2001, American Journal of Sports Medicine ; Hall et coll., 2013, Clinics in Sports Medicine (PMID 23522513) ; Ryan et coll., 1991, American Journal of Sports Medicine (PMID 1867338)*
- Retour / référence : cuisse tendue, douleur croissante ou à l'étirement passif (syndrome compartimental, parfois tardif) → urgence. — *Aronen et coll., 2006, Clinical Journal of Sport Medicine (PMID 17016112) ; Trojian, 2013, Clinics in Sports Medicine (PMID 23522512) ; Anderson et coll., 2001, American Journal of Sports Medicine ; Hall et coll., 2013, Clinics in Sports Medicine (PMID 23522513) ; Ryan et coll., 1991, American Journal of Sports Medicine (PMID 1867338)*

## Fracture de fragilité du bassin ou du sacrum

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 0 %, 70 ans 1 %, 85 ans 3 %, 95 ans 4 % ; femme ×2, homme ×0,5.

Repères publiés : Jusqu'à 9,35/1 000 chez les femmes de 90 ans et plus (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>bassin` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>bassin` | Hanche atteinte | — | — | Les deux 0,5 | provisoire | — |
| `osteoporose>bassin` | Ostéoporose ou fracture de fragilité | — | — | 3 / 0,8 | provisoire | — |
| `duree>bassin` | Depuis combien de temps | — | — | Moins de 7 jours 2 | provisoire | — |
| `apparition>bassin` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 ; Subit, sans traumatisme 2 | provisoire | — |
| `mecanisme>bassin` | Mécanisme | — | — | Chute sur la hanche 3 | provisoire | — |
| `localisation.pubis>bassin` | Où est la douleur : Pubis (symphyse) | — | — | 1,5 / 0,9 | provisoire | — |
| `moment>bassin` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `appui_impossible>bassin` | Incapable de mettre du poids sur la jambe | — | — | 2,5 / 0,7 | provisoire | — |
| `demarche>bassin` | Démarche | — | — | Incapable de mettre du poids 2,5 | provisoire | — |
| `p_symphyse>bassin` | Symphyse pubienne | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : aîné avec douleur de l'aine, de la fesse ou lombaire basse après une chute mineure ou sans trauma ; radiographies peu sensibles (20–38 %) → IRM (près de 100 %) ou TDM (60–75 %). — *Urits et coll., 2020, Current Pain and Headache Reports ; Gewiess et coll., 2024, Archives of Orthopaedic and Trauma Surgery*
- Traitement : fracture stable : analgésie (acétaminophène d'abord ; AINS avec prudence chez l'aîné), mobilisation précoce avec appui selon la tolérance, prévention des chutes. Ostéoporose : évaluer et traiter (bisphosphonate en premier) ; selon Ostéoporose Canada 2023, traiter d'emblée après une fracture de hanche ou vertébrale ou ≥ 2 fractures ostéoporotiques, si risque à 10 ans ≥ 20 %, ou si score T ≤ −2,5 à ≥ 70 ans ; après une fracture pelvienne isolée, calculer le risque (FRAX ou CAROC). Commencer tôt ne nuit pas à la consolidation. — *Urits et coll., 2020, Current Pain and Headache Reports ; Gewiess et coll., 2024, Archives of Orthopaedic and Trauma Surgery*
- Suivi : 1–2 sem (la douleur s'améliore habituellement dans ce délai), puis 6 sem. — *Urits et coll., 2020, Current Pain and Headache Reports ; Gewiess et coll., 2024, Archives of Orthopaedic and Trauma Surgery*
- Retour / référence : douleur immobilisante après 5–7 j ou fracture déplacée → orthopédie ; patient anticoagulé → observation hospitalière (risque hémorragique). — *Urits et coll., 2020, Current Pain and Headache Reports ; Gewiess et coll., 2024, Archives of Orthopaedic and Trauma Surgery*

## Douleur projetée d'origine lombaire

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 5 %, 50 ans 8 %, 70 ans 8 %.

Repères publiés : Rang attribué par jugement clinique (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>lombaire` | Hanche atteinte | — | — | Les deux 1,5 | provisoire | — |
| `duree>lombaire` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>lombaire` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Insidieux 2 | provisoire | — |
| `localisation.laterale>lombaire` | Où est la douleur : Latérale, sur le grand trochanter | — | — | 1,2 / 1 | provisoire | — |
| `localisation.fesse>lombaire` | Où est la douleur : Fesse | — | — | 3 / 0,5 | provisoire | — |
| `localisation.cuisse_post>lombaire` | Où est la douleur : Arrière de la cuisse | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.cuisse_lat_brulure>lombaire` | Où est la douleur : Face antéro-latérale de la cuisse, brûlure ou engourdissement | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.sous_genou>lombaire` | Où est la douleur : Irradie sous le genou | — | — | 4 / 0,5 | provisoire | — |
| `type_douleur>lombaire` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 2,5 | provisoire | — |
| `toux>lombaire` | Pire à la toux ou à l'éternuement | — | — | 1,5 / 0,95 | provisoire | — |
| `paresthesies>lombaire` | Engourdissements ou picotements dans la jambe | — | — | 4 / 0,5 | provisoire | — |
| `douleur_dos>lombaire` | Lombalgie | — | — | 4 / 0,4 | provisoire | — |
| `faber>lombaire` | FABER (Patrick) | — | — | 1,2 / 1 | provisoire | — |
| `lasegue>lombaire` | Lasègue ou slump | — | — | 4 / 0,5 | provisoire | — |
| `lombaire_mob>lombaire` | Lombaire : mobilité | — | — | Douleur reproduite 4 | provisoire | — |
| `deficit_l2l4>lombaire` | Déficit de force, de sensibilité ou de réflexe L2–L4 | — | — | 5 / 0,8 | provisoire | — |

Conduite :
- Investigation : en faveur de la hanche : douleur à l'aine, rotation interne limitée ou douloureuse, difficulté à enfiler les bas, pas de douleur sous le genou. En faveur du rachis : lombalgie, douleur dermatomale ou sous le genou, élévation de la jambe tendue ou étirement fémoral positifs, déficit neurologique. Les deux atteintes coexistent chez environ 1 patient sur 7 ; radiographie de la hanche si doute. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*
- Traitement : selon la cause (voir le document du rachis lombaire). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*
- Suivi : 4–6 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*
- Retour / référence : déficit progressif, anesthésie en selle, rétention urinaire, antécédent de cancer, perte de poids inexpliquée → investigation urgente. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Bannuru et al., « OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis », Osteoarthritis and Cartilage, 2019 ; Metcalfe et al., « Does This Patient Have Hip Osteoarthritis? », JAMA, 2019 ; Paskins et al. (essai HIT), BMJ, 2022 ; Hannon et al., lignes directrices ACR/AAHKS sur le moment de l'arthroplastie, Arthritis & Rheumatology, 2023 ; Mellor et al. (essai LEAP), BMJ, 2018 ; Haj-Mirzaian et al., Radiology, 2020 ; Klestil et al., Scientific Reports, 2018 ; Griffin et al., « The Warwick Agreement on Femoroacetabular Impingement Syndrome », British Journal of Sports Medicine, 2016 ; Griffin et al. (essai UK FASHIoN), Lancet, 2018 ; Kocher et al., Journal of Bone and Joint Surgery, 1999 ; Rogie et al., Journal of Pediatric Orthopaedics, 2026 ; Woods et al., lignes directrices PIDS/IDSA sur l'arthrite bactérienne aiguë de l'enfant, 2024 ; Kermond et al., Annals of Emergency Medicine, 2002 ; Weir et al., « Doha Agreement Meeting on Terminology and Definitions in Groin Pain in Athletes », British Journal of Sports Medicine, 2015 ; Hölmich et al., Lancet, 1999 ; Askling et al., British Journal of Sports Medicine, 2013 ; Shaw et Segal, « Evaluation and Referral for Developmental Dysplasia of the Hip in Infants », Pediatrics, 2016 ; Patel, Groupe d'étude canadien sur les soins de santé préventifs, CMAJ, 2001 ; Webb et al., « Slipped Capital Femoral Epiphysis: Rapid Evidence Review », American Family Physician, 2025 ; Schroeder et al., « Hip Fractures: Diagnosis and Management », American Family Physician, 2022 ; Maloy et al., « Groin Pain and Injuries », American Family Physician, 2025 ; Eberbach et al., BMC Musculoskeletal Disorders, 2017 ; Molina et al., Journal of Pediatric Orthopaedics, 2026 ; Ryan et al., American Journal of Sports Medicine, 1991 ; Khalil et al., « Treatment for meralgia paraesthetica », Cochrane Database of Systematic Reviews, 2012 ; Urits et al., Current Pain and Headache Reports, 2020 ; Garg et al., « Approach to Osteoporosis Diagnosis and Fracture Risk Management in Primary Care », Canadian Family Physician, 2026 ; Mukhtyar et al., « 2025 EULAR Recommendations for the Management of Polymyalgia Rheumatica and Primary Large Vessel Vasculitis », Annals of the Rheumatic Diseases, 2026 ; Dejaco et al., recommandations EULAR/ACR 2015 sur la polymyalgia rheumatica ; Pascart et al. (essai COLCHICORT), Lancet Rheumatology, 2023 ; Boden et al., « Low-Risk Stress Fractures », American Journal of Sports Medicine, 2001.*

## Polymyalgia rheumatica

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 0 %, 65 ans 1 %, 80 ans 2 % ; femme ×1,5, homme ×0,7.

Repères publiés : Sujet âgé (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ppr` | Milieu de consultation | — | — | Urgence 1,2 ; Clinique de médecine du sport 0,36 | provisoire | — |
| `cote>ppr` | Hanche atteinte | — | — | Les deux 5 | provisoire | — |
| `atcd_rhumato.uveite>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.synovite>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.goutte>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.par>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.spa>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>ppr` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 1 / 1 | provisoire | — |
| `duree>ppr` | Depuis combien de temps | — | — | 1 à 6 semaines 1,5 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>ppr` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 2 ; Insidieux 1,5 | provisoire | — |
| `localisation.epaules>ppr` | Où est la douleur : Aussi aux épaules ou au cou, avec raideur | — | — | 10 / 0,3 | provisoire | — |
| `moment>ppr` | Horaire | — | — | Pire le matin, mieux en bougeant 3 | provisoire | — |
| `nocturne>ppr` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `raideur>ppr` | Raideur matinale | — | — | 30 minutes ou plus 5 | provisoire | — |
| `raideur_epaules>ppr` | Raideur matinale des épaules et du cou | — | — | 10 / 0,2 | provisoire | — |
| `symptomes_acg>ppr` | Céphalée nouvelle, claudication de la mâchoire ou trouble visuel | — | — | 3 / 0,9 | provisoire | — |
| `autres_articulations>ppr` | Douleur ou enflure d'autres articulations | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : ≥ 50 ans, douleur bilatérale des ceintures scapulaire et pelvienne, raideur matinale ≥ 45 min, VS ou CRP élevées (plus de 90 % des cas) ; FSC, FR, anti-CCP, électrophorèse des protéines, TSH ; rechercher systématiquement les signes d'artérite à cellules géantes. — *Dejaco et coll., 2015, Arthritis & Rheumatology ; Mukhtyar et coll., 2026, Annals of the Rheumatic Diseases (PMID 42481270)*
- Traitement : EULAR 2025 : référer tous les cas suspectés ; la corticothérapie peut le plus souvent attendre la confirmation. Si elle est amorcée en première ligne (accès retardé) : prednisone 15–25 mg DIE ; amélioration attendue à 2 sem, quasi complète à 4 sem ; sevrage selon le bloc commun ; protection osseuse. — *Dejaco et coll., 2015, Arthritis & Rheumatology ; Mukhtyar et coll., 2026, Annals of the Rheumatic Diseases (PMID 42481270)*
- Suivi : toutes les 4–8 sem la première année, puis toutes les 8–12 sem ; rechute chez 40–60 % (revenir à la dose précédant la rechute). — *Dejaco et coll., 2015, Arthritis & Rheumatology ; Mukhtyar et coll., 2026, Annals of the Rheumatic Diseases (PMID 42481270)*
- Retour / référence : céphalée nouvelle, sensibilité du cuir chevelu, claudication de la mâchoire, symptômes visuels → artérite à cellules géantes : prednisone 40–60 mg DIE immédiatement et évaluation spécialisée en moins de 24 h. Réponse insuffisante aux doses usuelles → remettre le diagnostic en question. — *Dejaco et coll., 2015, Arthritis & Rheumatology ; Mukhtyar et coll., 2026, Annals of the Rheumatic Diseases (PMID 42481270)*

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j). Le diclofénac topique est peu utile pour l'articulation de la hanche (trop profonde).
- Analgésie de base (enfant) : ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j), premier choix dans les blessures musculosquelettiques ; acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j).
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; éviter les AINS oraux en cas de maladie cardiovasculaire ou de fragilité ; prudence ≥ 65 ans (IPP ou coxib si risque digestif) ; dose minimale efficace, durée la plus courte.
- Crise microcristalline : colchicine 1,2 mg, puis 0,6 mg 1 h plus tard (max 1,8 mg la première heure) ; 12 h après, 0,6 mg DIE–BID jusqu'à résolution ; réduire avec les inhibiteurs du CYP3A4 ou de la P-gp (clarithromycine, diltiazem, vérapamil, cyclosporine) ; ne pas répéter avant 2 sem si ClCr < 30. Solutions de rechange : naproxène 500 mg BID avec IPP, ou prednisone 30–35 mg DIE pendant 5 j (goutte).
- Polymyalgia rheumatica : prednisone 15–25 mg DIE (jamais > 30 mg) ; 10 mg/j atteints en 4–8 sem ; puis −1 mg toutes les 4 sem.
- Dosage de la charge : activité permise si douleur ≤ 3/10 et sans persistance après l'effort.
- Infiltration de corticoïde : soulagement de courte durée ; à éviter dans les 3 mois précédant une arthroplastie ; aviser les diabétiques d'une hausse transitoire de la glycémie.
- Intervalles de suivi : fondés sur le consensus et l'usage, non sur des essais (sauf polymyalgia rheumatica).

Pour tous :
- Enseignement : nature de l'atteinte, pronostic, autogestion
- Consignes de reconsultation : fièvre, impossibilité de mettre du poids, douleur nocturne, engourdissement en selle ou trouble urinaire
