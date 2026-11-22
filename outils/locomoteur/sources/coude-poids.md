# Douleur au coude : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs coude` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 263 (validés 0, vérifiés 15, à vérifier 4, provisoires 244).

## Épicondylite latérale (tennis elbow)

Probabilité de départ (provisoire) : 12 ans 6 %, 25 ans 20 %, 45 ans 35 %, 60 ans 25 %, 80 ans 12 %.

Repères publiés : 3,4/1 000 personnes-années, pic de 9/1 000 à 40–49 ans ; 40–50 % des joueurs de tennis amateurs sur la vie (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>epi_lat` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `travail>epi_lat` | Occupation | — | — | Travail de bureau ou sédentaire 1,3 ; Travail physique (charges, manutention) 1,3 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,8 | provisoire | — |
| `sport.raquette>epi_lat` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 2 / 1 | provisoire | — |
| `sport.escalade>epi_lat` | Activités physiques : Escalade | — | — | 1,3 / 1 | provisoire | — |
| `sport.golf>epi_lat` | Activités physiques : Golf | — | — | 1,3 / 1 | provisoire | — |
| `duree>epi_lat` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 1 à 6 semaines 1,2 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>epi_lat` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 0,7 ; Graduel 2 ; Insidieux 1,2 | provisoire | — |
| `localisation.laterale>epi_lat` | Où est la douleur : Latérale, à l'épicondyle | — | — | 5 / 0,1 | provisoire | — |
| `localisation.lat_distale>epi_lat` | Où est la douleur : Latérale, 3 à 5 cm sous l'épicondyle (avant-bras) | — | — | 1,3 / 0,95 | provisoire | — |
| `localisation.mediale>epi_lat` | Où est la douleur : Médiale, à l'épicondyle médial | — | — | 0,3 / 1,1 | provisoire | — |
| `localisation.diffuse>epi_lat` | Où est la douleur : Diffuse, dans tout le coude | — | — | 0,5 / 1,05 | provisoire | — |
| `prehension_agg>epi_lat` | Pire en serrant ou en saisissant un objet (poignée, tasse) | — | — | 3 / 0,3 | provisoire | — |
| `moment>epi_lat` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `blocage_coude>epi_lat` | Blocage ou accrochage du coude | — | — | 0,4 / 1,05 | a_verifier | Zwerus et coll., J Shoulder Elbow Surg (PMID 41192654) : 46,5 % des douleurs latérales ont un autre diagnostic que l'épicondylite ; le blocage oriente ailleurs |
| `p_epi_lat>epi_lat` | Épicondyle latéral douloureux | — | — | 5 / 0,1 | provisoire | — |
| `p_radial_distal>epi_lat` | Douleur 3 à 5 cm sous l'épicondyle latéral (arcade de Frohse) | — | — | 1,2 / 0,95 | provisoire | — |
| `cozen>epi_lat` | Extension résistée du poignet (Cozen) | — | — | 2,5 / 0,12 | a_verifier | Karanasios et coll., 2021, revue systématique (PMID 33814224 ; tendinopathie latérale) : Se 91 % (spécificité non publiée ; RV+ provisoire) |
| `maudsley>epi_lat` | Extension résistée du 3ᵉ doigt (Maudsley) | — | — | 2 / 0,4 | a_verifier | Karanasios et coll., 2021, revue systématique (PMID 33814224 ; tendinopathie latérale) : Se 70 % (spécificité non publiée) |
| `prehension>epi_lat` | Préhension plus faible coude en extension qu'en flexion | 80 % | 85 % | 5,33 / 0,24 | verifie | Karanasios et coll., 2021, revue systématique (PMID 33814224 ; tendinopathie latérale) : Se 78–83 %, Sp 80–90 % |

Conduite :
- Investigation : clinique (douleur à l'épicondyle latéral, reproduite par l'extension résistée du poignet ou du 3ᵉ doigt) ; pas d'imagerie ; radiographie si trauma, perte de mobilité ou tableau atypique. — *Wolf, 2023, New England Journal of Medicine ; Bisset et coll., 2006, BMJ (PMID 17012266) ; Coombes et coll., 2013, JAMA*
- Traitement : éducation (résolution spontanée en 6–12 mois chez la plupart), modification des gestes en cause, analgésie de base ou diclofénac topique, exercices excentriques à domicile ou physiothérapie, bracelet épicondylien (coussinet juste distal à l'épicondyle) au besoin. Éviter l'infiltration de corticoïde : mieux à 4–6 sem, mais pire à 6–12 mois, avec plus de récidives. — *Wolf, 2023, New England Journal of Medicine ; Bisset et coll., 2006, BMJ (PMID 17012266) ; Coombes et coll., 2013, JAMA*
- Suivi : 6–8 sem. — *Wolf, 2023, New England Journal of Medicine ; Bisset et coll., 2006, BMJ (PMID 17012266) ; Coombes et coll., 2013, JAMA*
- Retour / référence : symptômes invalidants persistants après environ 12 mois → orthopédie ou physiatrie ; paresthésies ou faiblesse d'extension des doigts → rechercher un tunnel radial ou une radiculopathie C6–C7. — *Wolf, 2023, New England Journal of Medicine ; Bisset et coll., 2006, BMJ (PMID 17012266) ; Coombes et coll., 2013, JAMA*

## Épicondylite médiale (golfer's elbow)

Probabilité de départ (provisoire) : 12 ans 2 %, 25 ans 5 %, 45 ans 8 %, 70 ans 4 %.

Repères publiés : Prévalence 0,4 % ; 10–20 % des épicondylites (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>epi_med` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `travail>epi_med` | Occupation | — | — | Travail physique (charges, manutention) 1,3 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,8 | provisoire | — |
| `sport.raquette>epi_med` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.lancer>epi_med` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 1,5 / 1 | provisoire | — |
| `sport.muscu>epi_med` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,3 / 1 | provisoire | — |
| `sport.escalade>epi_med` | Activités physiques : Escalade | — | — | 1,5 / 1 | provisoire | — |
| `sport.golf>epi_med` | Activités physiques : Golf | — | — | 2 / 1 | provisoire | — |
| `duree>epi_med` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 1 à 6 semaines 1,2 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>epi_med` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2 | provisoire | — |
| `mecanisme>epi_med` | Mécanisme | — | — | Lancer (douleur médiale à l'armé ou à l'accélération) 1,5 | provisoire | — |
| `localisation.laterale>epi_med` | Où est la douleur : Latérale, à l'épicondyle | — | — | 0,3 / 1,1 | provisoire | — |
| `localisation.mediale>epi_med` | Où est la douleur : Médiale, à l'épicondyle médial | — | — | 5 / 0,15 | provisoire | — |
| `prehension_agg>epi_med` | Pire en serrant ou en saisissant un objet (poignée, tasse) | — | — | 1,8 / 0,6 | provisoire | — |
| `lancer_agg>epi_med` | Douleur en lançant ou au service | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>epi_med` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `paresthesies_ulnaires>epi_med` | Engourdissements ou picotements des 4ᵉ et 5ᵉ doigts | — | — | 1,3 / 0,95 | provisoire | — |
| `p_epi_med>epi_med` | Épicondyle médial douloureux | — | — | 5 / 0,1 | provisoire | — |
| `flexion_pronation_res>epi_med` | Flexion du poignet ou pronation résistée douloureuse | — | — | 4 / 0,25 | provisoire | — |

Conduite :
- Investigation : clinique (douleur à l'épicondyle médial, flexion et pronation résistées) ; examiner le nerf ulnaire (névrite associée dans environ 20 % des cas) ; chez le lanceur, stress en valgus pour le ligament collatéral ulnaire. — *Creighton et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Meredith et coll., 2025, Current Reviews in Musculoskeletal Medicine*
- Traitement : modification des activités, analgésie de base ou diclofénac topique, exercices excentriques, bracelet ; prudence avec le corticoïde (proximité du nerf ulnaire, mêmes réserves que pour l'épicondylite latérale). — *Creighton et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Meredith et coll., 2025, Current Reviews in Musculoskeletal Medicine*
- Suivi : 6–8 sem. — *Creighton et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Meredith et coll., 2025, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : déficit ulnaire, instabilité en valgus ou échec après 6–12 mois → orthopédie. — *Creighton et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Meredith et coll., 2025, Current Reviews in Musculoskeletal Medicine*

## Coude du lanceur juvénile (apophysite de l'épicondyle médial)

Probabilité de départ (provisoire) : 12 ans 6 %, 14 ans 5 %, 17 ans 1 %, 20 ans 0 % ; homme ×1,5, femme ×0,7.

Repères publiés : Anomalie de l'épicondyle médial chez 40–58 % des jeunes joueurs de baseball (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>lanceur` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>lanceur` | Coude atteint | — | — | Les deux 0,3 | provisoire | — |
| `sport.lancer>lanceur` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 5 / 1 | provisoire | — |
| `premier>lanceur` | Premier épisode | — | — | 1,2 / 0,9 | provisoire | — |
| `duree>lanceur` | Depuis combien de temps | — | — | 1 à 6 semaines 1,5 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>lanceur` | Mode d'apparition | — | — | Graduel 2,5 | provisoire | — |
| `mecanisme>lanceur` | Mécanisme | — | — | Lancer (douleur médiale à l'armé ou à l'accélération) 3 | provisoire | — |
| `localisation.mediale>lanceur` | Où est la douleur : Médiale, à l'épicondyle médial | — | — | 5 / 0,1 | provisoire | — |
| `lancer_agg>lanceur` | Douleur en lançant ou au service | — | — | 4 / 0,3 | provisoire | — |
| `p_epi_med>lanceur` | Épicondyle médial douloureux | — | — | 6 / 0,1 | provisoire | — |
| `p_lcu>lanceur` | Ligament collatéral ulnaire douloureux (sous l'épicondyle médial) | — | — | 1,5 / 0,8 | provisoire | — |
| `flexion_pronation_res>lanceur` | Flexion du poignet ou pronation résistée douloureuse | — | — | 2 / 0,6 | provisoire | — |
| `milking>lanceur` | Milking maneuver (stress en valgus) | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : radiographies comparatives (élargissement ou fragmentation de l'apophyse). — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Lintner et coll., 2023, American Family Physician ; Brown et coll., 2019, Clinical Pediatrics*
- Traitement : arrêt complet des lancers 4–6 sem, glace, analgésie de base, physiothérapie (chaîne cinétique, épaule, tronc), retour progressif au lancer ; compétition vers 3 mois ; prévention par le décompte des lancers et les périodes de repos annuelles. — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Lintner et coll., 2023, American Family Physician ; Brown et coll., 2019, Clinical Pediatrics*
- Suivi : 4–6 sem. — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Lintner et coll., 2023, American Family Physician ; Brown et coll., 2019, Clinical Pediatrics*
- Retour / référence : séparation apophysaire > 3 mm, douleur aiguë avec « pop », instabilité en valgus → orthopédie. — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Lintner et coll., 2023, American Family Physician ; Brown et coll., 2019, Clinical Pediatrics*

## Fracture du coude (tête ou col radial, olécrâne, humérus distal, épicondyle médial)

Probabilité de départ (provisoire) : 12 ans 4 %, 30 ans 3 %, 65 ans 4 %, 85 ans 6 %.

Repères publiés : Tête et col radial 28–39/100 000/an (adulte) ; olécrâne 11,5–12/100 000, âge médian 66 ans ; humérus distal surtout chez la femme de plus de 60 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>fracture` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>fracture` | Coude atteint | — | — | Les deux 0,1 | provisoire | — |
| `sport.contact>fracture` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,3 / 1 | provisoire | — |
| `osteoporose>fracture` | Ostéoporose ou fracture de fragilité | — | — | 2 / 0,9 | provisoire | — |
| `duree>fracture` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,8 ; 6 semaines à 3 mois 0,2 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>fracture` | Mode d'apparition | — | — | Subit, avec un traumatisme 8 ; Graduel 0,1 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>fracture` | Mécanisme | — | — | Chute sur la main tendue 3 ; Chute ou coup direct sur le coude 2,5 ; Lancer (douleur médiale à l'armé ou à l'accélération) 0,3 | provisoire | — |
| `deformation_vue>fracture` | Déformation visible ou coude « sorti de place » | — | — | 3 / 0,8 | provisoire | — |
| `localisation.laterale>fracture` | Où est la douleur : Latérale, à l'épicondyle | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.posterieure>fracture` | Où est la douleur : Postérieure, à l'olécrâne | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.diffuse>fracture` | Où est la douleur : Diffuse, dans tout le coude | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>fracture` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `doigts_froids>fracture` | Main froide, pâle ou engourdie après le traumatisme | — | — | 3 / 0,95 | provisoire | — |
| `ex_deformation>fracture` | Déformation ou perte des repères (triangle olécrânien) | — | — | 3 / 0,8 | provisoire | — |
| `ex_epanchement>fracture` | Épanchement articulaire (fossette para-olécrânienne comblée) | — | — | 3 / 0,5 | provisoire | — |
| `ex_ecchymose_ant>fracture` | Ecchymose antécubitale | — | — | 1,5 / 0,9 | provisoire | — |
| `p_tete_radiale>fracture` | Tête radiale douloureuse | — | — | 3 / 0,3 | provisoire | — |
| `p_olecrane>fracture` | Olécrâne douloureux (os) | — | — | 2,5 / 0,5 | provisoire | — |
| `arom_flexion>fracture` | Flexion active | — | — | Complète et indolore 0,5 ; Limitée avec douleur 2 | provisoire | — |
| `pronosup>fracture` | Prono-supination limitée ou douloureuse | — | — | 3 / 0,4 | provisoire | — |
| `extension_contre_gravite>fracture` | Extension active du coude contre la gravité impossible | — | — | 3 / 0,8 | provisoire | — |
| `pouls_dim>fracture` | Pouls radial diminué ou main mal perfusée | — | — | 3 / 0,97 | provisoire | — |
| `ext_test>fracture` | Test d'extension : extension complète impossible | 97 % | 49 % | 1,88 / 0,07 | verifie | Appelboam et coll., 2008, BMJ (PMID 19066257 ; test d'extension, n = 1 740) : RV− 0,03 chez l'adulte, 0,11 chez l'enfant |
| `amp4>fracture` | Une des 4 amplitudes actives limitée (extension, flexion à 90°, pronation, supination) | 99 % | 60 % | 2,47 / 0,02 | verifie | Vinson et coll., 2016, Am J Emerg Med (PMID 26597495 ; quatre amplitudes, n = 251) : RV+ 2,48 ; RV− 0,017 (calculés) |

Conduite :
- Investigation : radiographies face, profil et oblique (coussinets graisseux) ; une extension complète possible rend la fracture peu probable ; tester la prono-supination ; palper le poignet (radio-ulnaire distale). — *de et coll., 2015, Orthopedics (PMID 26652338) ; Egenolf et coll., 2024, Archives of Orthopaedic and Trauma Surgery ; Surucu et coll., 2023, Journal of Shoulder and Elbow Surgery (PMID 36334862)*
- Traitement : Mason I (déplacement < 2 mm, pas de blocage) : écharpe de confort 2–7 j, puis mobilisation active précoce ; pas de port de charge pendant 6 sem ; pas de plâtre prolongé (raideur). — *de et coll., 2015, Orthopedics (PMID 26652338) ; Egenolf et coll., 2024, Archives of Orthopaedic and Trauma Surgery ; Surucu et coll., 2023, Journal of Shoulder and Elbow Surgery (PMID 36334862)*
- Suivi : 1 sem (la fonction à 1 sem prédit le résultat à 6 sem), puis 6 sem. — *de et coll., 2015, Orthopedics (PMID 26652338) ; Egenolf et coll., 2024, Archives of Orthopaedic and Trauma Surgery ; Surucu et coll., 2023, Journal of Shoulder and Elbow Surgery (PMID 36334862)*
- Retour / référence : blocage de la rotation → TDM et orthopédie ; déplacement > 2 mm, atteinte ≥ 30 % de la tête, luxation ou douleur du poignet associée → orthopédie. — *de et coll., 2015, Orthopedics (PMID 26652338) ; Egenolf et coll., 2024, Archives of Orthopaedic and Trauma Surgery ; Surucu et coll., 2023, Journal of Shoulder and Elbow Surgery (PMID 36334862)*
- Investigation : radiographies face et profil vrai ; vérifier l'extension active contre gravité (mécanisme extenseur) ; nerf ulnaire. — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Traitement : non déplacée avec extension active conservée : attelle postérieure 2–3 sem, puis mobilisation progressive. Aîné fragile à faible demande avec fracture déplacée : le traitement non chirurgical (écharpe brève, mobilisation précoce) donne des résultats fonctionnels équivalents à la chirurgie. — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Suivi : radiographie à 1 sem. — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Retour / référence : patient actif avec fracture déplacée, perte de l'extension active, fracture ouverte ou instabilité → orthopédie. — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Investigation : radiographies face, profil et oblique interne ± comparatives ; examen neurovasculaire. — *James et coll., 2021, Pediatric Emergency Care (PMID 31977764) ; Radomisli et coll., 1998, Clinical Orthopaedics and Related Research (PMID 9728157) ; Perry et coll., 2026, Lancet (PMID 41576983) ; Abzug et coll., 2020, Journal of the American Academy of Orthopaedic Surgeons (PMID 31268870) ; Stelmach et coll., 2023, Scientific Reports*
- Traitement : condyle latéral ≤ 2 mm : plâtre brachio-antébrachial et radiographie hebdomadaire (déplacement secondaire dans environ 27 % des cas). Col radial avec angulation < 30° : immobilisation 3 sem. Épicondyle médial : traitement non chirurgical dans la plupart des cas (pas de supériorité de la fixation dans l'essai SCIENCE). — *James et coll., 2021, Pediatric Emergency Care (PMID 31977764) ; Radomisli et coll., 1998, Clinical Orthopaedics and Related Research (PMID 9728157) ; Perry et coll., 2026, Lancet (PMID 41576983) ; Abzug et coll., 2020, Journal of the American Academy of Orthopaedic Surgeons (PMID 31268870) ; Stelmach et coll., 2023, Scientific Reports*
- Suivi : radiographie à 1 sem. — *James et coll., 2021, Pediatric Emergency Care (PMID 31977764) ; Radomisli et coll., 1998, Clinical Orthopaedics and Related Research (PMID 9728157) ; Perry et coll., 2026, Lancet (PMID 41576983) ; Abzug et coll., 2020, Journal of the American Academy of Orthopaedic Surgeons (PMID 31268870) ; Stelmach et coll., 2023, Scientific Reports*
- Retour / référence : fracture déplacée > 2 mm ou articulaire, fragment incarcéré dans l'articulation, coude instable → orthopédie le jour même. — *James et coll., 2021, Pediatric Emergency Care (PMID 31977764) ; Radomisli et coll., 1998, Clinical Orthopaedics and Related Research (PMID 9728157) ; Perry et coll., 2026, Lancet (PMID 41576983) ; Abzug et coll., 2020, Journal of the American Academy of Orthopaedic Surgeons (PMID 31268870) ; Stelmach et coll., 2023, Scientific Reports*
- Investigation : radiographies ; examen neurovasculaire (nerf ulnaire) ; TDM souvent nécessaire. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Wolf, « Lateral Epicondylitis », New England Journal of Medicine, 2023 ; Coombes et al., JAMA, 2013 ; Karjalainen et al., « Glucocorticoid injections for lateral elbow pain », Cochrane Database of Systematic Reviews, 2022 ; Krul et al., « Manipulative interventions for reducing pulled elbow in young children », Cochrane Database of Systematic Reviews, 2017 ; Aksel et al., American Journal of Emergency Medicine, 2025 ; Marson et al., « Interventions for treating supracondylar elbow fractures in children », Cochrane Database of Systematic Reviews, 2022 ; American College of Surgeons, « Best Practices in the Management of Orthopaedic Trauma », 2015 ; Egenolf et al., Archives of Orthopaedic and Trauma Surgery, 2024 ; Kim et al., Clinical Orthopaedics and Related Research, 2016 ; Baumbach et al., Archives of Orthopaedic and Trauma Surgery, 2014 ; Silver et al., « Peripheral Nerve Entrapment and Injury in the Upper Extremity », American Family Physician, 2021 ; Zwerus et al., American Journal of Sports Medicine, 2022 ; Breulmann et al., BMC Musculoskeletal Disorders, 2024 ; Perry et al. (essai SCIENCE), Lancet, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Traitement : attelle postérieure, analgésie. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Wolf, « Lateral Epicondylitis », New England Journal of Medicine, 2023 ; Coombes et al., JAMA, 2013 ; Karjalainen et al., « Glucocorticoid injections for lateral elbow pain », Cochrane Database of Systematic Reviews, 2022 ; Krul et al., « Manipulative interventions for reducing pulled elbow in young children », Cochrane Database of Systematic Reviews, 2017 ; Aksel et al., American Journal of Emergency Medicine, 2025 ; Marson et al., « Interventions for treating supracondylar elbow fractures in children », Cochrane Database of Systematic Reviews, 2022 ; American College of Surgeons, « Best Practices in the Management of Orthopaedic Trauma », 2015 ; Egenolf et al., Archives of Orthopaedic and Trauma Surgery, 2024 ; Kim et al., Clinical Orthopaedics and Related Research, 2016 ; Baumbach et al., Archives of Orthopaedic and Trauma Surgery, 2014 ; Silver et al., « Peripheral Nerve Entrapment and Injury in the Upper Extremity », American Family Physician, 2021 ; Zwerus et al., American Journal of Sports Medicine, 2022 ; Breulmann et al., BMC Musculoskeletal Disorders, 2024 ; Perry et al. (essai SCIENCE), Lancet, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Retour / référence : orthopédie le jour même (fracture le plus souvent chirurgicale). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Wolf, « Lateral Epicondylitis », New England Journal of Medicine, 2023 ; Coombes et al., JAMA, 2013 ; Karjalainen et al., « Glucocorticoid injections for lateral elbow pain », Cochrane Database of Systematic Reviews, 2022 ; Krul et al., « Manipulative interventions for reducing pulled elbow in young children », Cochrane Database of Systematic Reviews, 2017 ; Aksel et al., American Journal of Emergency Medicine, 2025 ; Marson et al., « Interventions for treating supracondylar elbow fractures in children », Cochrane Database of Systematic Reviews, 2022 ; American College of Surgeons, « Best Practices in the Management of Orthopaedic Trauma », 2015 ; Egenolf et al., Archives of Orthopaedic and Trauma Surgery, 2024 ; Kim et al., Clinical Orthopaedics and Related Research, 2016 ; Baumbach et al., Archives of Orthopaedic and Trauma Surgery, 2014 ; Silver et al., « Peripheral Nerve Entrapment and Injury in the Upper Extremity », American Family Physician, 2021 ; Zwerus et al., American Journal of Sports Medicine, 2022 ; Breulmann et al., BMC Musculoskeletal Disorders, 2024 ; Perry et al. (essai SCIENCE), Lancet, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*

## Luxation du coude

Probabilité de départ (provisoire) : 12 ans 2 %, 18 ans 2 %, 40 ans 1 %, 70 ans 0 %.

Repères publiés : 5,2/100 000, pic à 10–19 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>luxation` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>luxation` | Coude atteint | — | — | Les deux 0,05 | provisoire | — |
| `sport.contact>luxation` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `duree>luxation` | Depuis combien de temps | — | — | Moins de 7 jours 2 ; 1 à 6 semaines 0,5 ; 6 semaines à 3 mois 0,1 ; Plus de 3 mois 0,03 | provisoire | — |
| `apparition>luxation` | Mode d'apparition | — | — | Subit, avec un traumatisme 4 ; Graduel 0,05 ; Insidieux 0,03 | provisoire | — |
| `mecanisme>luxation` | Mécanisme | — | — | Chute sur la main tendue 2 ; Chute ou coup direct sur le coude 0,5 ; Charge lourde, coude forcé en extension (soulever, retenir) 0,3 | provisoire | — |
| `pop>luxation` | Claquement (« pop ») au moment de la blessure | — | — | 1,5 / 0,9 | provisoire | — |
| `deformation_vue>luxation` | Déformation visible ou coude « sorti de place » | — | — | 15 / 0,2 | provisoire | — |
| `doigts_froids>luxation` | Main froide, pâle ou engourdie après le traumatisme | — | — | 3 / 0,95 | provisoire | — |
| `ex_deformation>luxation` | Déformation ou perte des repères (triangle olécrânien) | — | — | 15 / 0,2 | provisoire | — |
| `ex_epanchement>luxation` | Épanchement articulaire (fossette para-olécrânienne comblée) | — | — | 2 / 0,8 | provisoire | — |
| `arom_flexion>luxation` | Flexion active | — | — | Limitée avec douleur 2 | provisoire | — |
| `pouls_dim>luxation` | Pouls radial diminué ou main mal perfusée | — | — | 3 / 0,97 | provisoire | — |
| `ext_test>luxation` | Test d'extension : extension complète impossible | — | — | 1,5 / 0,1 | provisoire | — |

Conduite :
- Investigation : radiographies avant et après réduction (rechercher une fracture de la tête radiale ou de la coronoïde) ; examen neurovasculaire avant et après. — *Iordens et coll., 2017, British Journal of Sports Medicine (PMID 26175020) ; Breulmann et coll., 2024, BMC Musculoskeletal Disorders*
- Traitement : réduction sous analgésie ou sédation, vérification de la stabilité, attelle brève (≤ 1 sem), puis mobilisation active précoce (retour au travail plus rapide, pas plus de récidives) ; plus de 3 sem d'immobilisation entraînent une raideur. — *Iordens et coll., 2017, British Journal of Sports Medicine (PMID 26175020) ; Breulmann et coll., 2024, BMC Musculoskeletal Disorders*
- Suivi : 1 sem (radiographie de contrôle), puis 4–6 sem. — *Iordens et coll., 2017, British Journal of Sports Medicine (PMID 26175020) ; Breulmann et coll., 2024, BMC Musculoskeletal Disorders*
- Retour / référence : fracture associée (luxation complexe), instabilité après réduction, atteinte neurovasculaire ou réduction impossible → orthopédie d'urgence. — *Iordens et coll., 2017, British Journal of Sports Medicine (PMID 26175020) ; Breulmann et coll., 2024, BMC Musculoskeletal Disorders*

## Syndrome du tunnel cubital (neuropathie ulnaire au coude)

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 4 %, 50 ans 7 %, 70 ans 6 % ; homme ×1,4, femme ×0,75.

Repères publiés : 30/100 000 personnes-années (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `travail>tunnel_cubital` | Occupation | — | — | Travail de bureau ou sédentaire 1,5 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,3 | provisoire | — |
| `diabete>tunnel_cubital` | Diabète | — | — | 1,3 / 0,97 | provisoire | — |
| `atcd_fracture_coude>tunnel_cubital` | Fracture ou luxation antérieure de ce coude | — | — | 1,5 / 0,95 | provisoire | — |
| `duree>tunnel_cubital` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>tunnel_cubital` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 1,5 ; Insidieux 2 | provisoire | — |
| `localisation.mediale>tunnel_cubital` | Où est la douleur : Médiale, à l'épicondyle médial | — | — | 2 / 0,7 | provisoire | — |
| `type_douleur>tunnel_cubital` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 2 | provisoire | — |
| `flexion_prolongee>tunnel_cubital` | Engourdi coude plié longtemps (téléphone, sommeil) | — | — | 3 / 0,5 | provisoire | — |
| `appui_coude>tunnel_cubital` | Pire en s'appuyant sur le coude | — | — | 1,5 / 0,9 | provisoire | — |
| `nocturne>tunnel_cubital` | Douleur la nuit | — | — | 1,5 / 0,8 | provisoire | — |
| `paresthesies_ulnaires>tunnel_cubital` | Engourdissements ou picotements des 4ᵉ et 5ᵉ doigts | — | — | 1,27 / 0,5 | verifie | Rubin et coll., 2016, Muscle Nerve (symptômes de neuropathie ulnaire) : symptômes sensitifs, RV+ 1,27 (RV− provisoire) |
| `schema_main>tunnel_cubital` | Engourdissement limité au 5ᵉ doigt et à la moitié ulnaire du 4ᵉ (schéma de la main) | 50 % | 93 % | 7,14 / 0,54 | verifie | Werner et coll., 2012, Muscle Nerve (schéma de la main, neuropathie ulnaire) : RV+ 7,1 (calculé) |
| `paresthesies_autres>tunnel_cubital` | Engourdissements du pouce, de l'index ou de tout le bras | — | — | 0,6 / 1,1 | provisoire | — |
| `faiblesse_main>tunnel_cubital` | Faiblesse ou maladresse de la main | — | — | 2,5 / 0,8 | provisoire | — |
| `hypo_ulnaire>tunnel_cubital` | Hypoesthésie du 5ᵉ doigt | — | — | 3 / 0,6 | provisoire | — |
| `froment>tunnel_cubital` | Froment ou faiblesse des interosseux | — | — | 4 / 0,8 | provisoire | — |
| `tinel_cubital>tunnel_cubital` | Tinel au coude (gouttière ulnaire) | — | — | 1,3 / 0,72 | verifie | Beekman et coll., 2009 (PMID 19553231 ; neuropathie ulnaire, n = 192) : Se 62 %, Sp 53 % |

Conduite :
- Investigation : clinique (paresthésies des 4ᵉ et 5ᵉ doigts, Tinel au coude, flexion soutenue du coude ; rechercher faiblesse des intrinsèques et signe de Froment) ; EMG si déficit, doute ou échec. — *Svernlöv et coll., 2009, Journal of Hand Surgery, European Volume ; Shah et coll., 2013, Journal of Hand Surgery (PMID 23647638) ; Dy et coll., 2016, Current Reviews in Musculoskeletal Medicine*
- Traitement : éviter la flexion prolongée et l'appui sur le coude, coussinet protecteur, attelle ou serviette enroulée la nuit (coude à environ 45° d'extension) pendant 3 mois ; analgésie de base. Environ 9 patients sur 10 sans déficit objectif évitent la chirurgie. — *Svernlöv et coll., 2009, Journal of Hand Surgery, European Volume ; Shah et coll., 2013, Journal of Hand Surgery (PMID 23647638) ; Dy et coll., 2016, Current Reviews in Musculoskeletal Medicine*
- Suivi : 6–8 sem, puis 3 mois. — *Svernlöv et coll., 2009, Journal of Hand Surgery, European Volume ; Shah et coll., 2013, Journal of Hand Surgery (PMID 23647638) ; Dy et coll., 2016, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : faiblesse, amyotrophie, atteinte axonale à l'EMG, ou absence d'amélioration après 3–4 mois → chirurgie. — *Svernlöv et coll., 2009, Journal of Hand Surgery, European Volume ; Shah et coll., 2013, Journal of Hand Surgery (PMID 23647638) ; Dy et coll., 2016, Current Reviews in Musculoskeletal Medicine*

## Bursite olécrânienne aseptique

Probabilité de départ (provisoire) : 12 ans 1 %, 40 ans 6 %, 70 ans 7 % ; homme ×2, femme ×0,6.

Repères publiés : Au moins 10/100 000/an, environ un tiers septiques (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `sport.contact>bursite` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `atcd_rhumato.goutte>bursite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 1,5 / 1 | provisoire | — |
| `duree>bursite` | Depuis combien de temps | — | — | 1 à 6 semaines 1,3 | provisoire | — |
| `apparition>bursite` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 ; Subit, sans traumatisme 2 ; Graduel 1,3 | provisoire | — |
| `mecanisme>bursite` | Mécanisme | — | — | Chute ou coup direct sur le coude 2 | provisoire | — |
| `localisation.posterieure>bursite` | Où est la douleur : Postérieure, à l'olécrâne | — | — | 3 / 0,3 | provisoire | — |
| `appui_coude>bursite` | Pire en s'appuyant sur le coude | — | — | 3 / 0,5 | provisoire | — |
| `enflure_post>bursite` | Enflure derrière le coude (« balle » sur l'olécrâne) | — | — | 15 / 0,2 | provisoire | — |
| `rougeur_chaleur>bursite` | Rougeur ou chaleur | — | — | 0,7 / 1,1 | provisoire | — |
| `ex_bourse>bursite` | Tuméfaction de la bourse olécrânienne | — | — | 20 / 0,1 | provisoire | — |
| `ex_epanchement>bursite` | Épanchement articulaire (fossette para-olécrânienne comblée) | — | — | 0,5 / 1 | provisoire | — |
| `ex_tophus>bursite` | Tophus | — | — | 2 / 0,95 | provisoire | — |

Conduite :
- Investigation : rechercher les signes septiques (fièvre > 37,8 °C, chaleur locale nette, porte d'entrée cutanée, cellulite) ; si présents ou doute → ponction (Gram, culture, décompte, cristaux) ; leucocytes > 1000–3000/mm³ ou prédominance de neutrophiles évocateurs d'infection. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*
- Traitement : aseptique : protection de l'appui, bandage compressif et AINS en courte cure (résolution d'environ 83 % à 4 sem, comparable à la ponction avec ou sans corticoïde) ; pas d'infiltration intrabursale de routine (infection, atrophie cutanée). Septique : céphalexine (*S. aureus* dans environ 80 % des cas) pendant 7–14 j selon l'évolution, ponction répétée au besoin. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*
- Suivi : 48–72 h si septique ; 4 sem si aseptique. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*
- Retour / référence : fièvre, cellulite extensive, immunosuppression ou absence d'amélioration à 48–72 h → antibiotiques IV et drainage ; forme chronique récidivante → orthopédie. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*

## Bursite olécrânienne septique

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 3 %, 70 ans 3 % ; homme ×2, femme ×0,6.

Repères publiés : Environ un tiers des bursites olécrâniennes (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>bursite_septique` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `diabete>bursite_septique` | Diabète | — | — | 1,5 / 0,95 | provisoire | — |
| `duree>bursite_septique` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; Plus de 3 mois 0,2 | provisoire | — |
| `apparition>bursite_septique` | Mode d'apparition | — | — | Subit, sans traumatisme 3 | provisoire | — |
| `mecanisme>bursite_septique` | Mécanisme | — | — | Chute ou coup direct sur le coude 1,5 | provisoire | — |
| `localisation.posterieure>bursite_septique` | Où est la douleur : Postérieure, à l'olécrâne | — | — | 3 / 0,3 | provisoire | — |
| `type_douleur>bursite_septique` | Type de douleur | — | — | Lancinante, pulsatile 2 | provisoire | — |
| `appui_coude>bursite_septique` | Pire en s'appuyant sur le coude | — | — | 2,5 / 0,5 | provisoire | — |
| `moment>bursite_septique` | Horaire | — | — | Constante 2 | provisoire | — |
| `nocturne>bursite_septique` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure_post>bursite_septique` | Enflure derrière le coude (« balle » sur l'olécrâne) | — | — | 15 / 0,2 | provisoire | — |
| `rougeur_chaleur>bursite_septique` | Rougeur ou chaleur | — | — | 4 / 0,3 | provisoire | — |
| `plaie>bursite_septique` | Éraflure, plaie ou piqûre sur le coude | — | — | 4 / 0,7 | provisoire | — |
| `fievre>bursite_septique` | Fièvre ou frissons | — | — | 4 / 0,6 | provisoire | — |
| `risque_infection.infiltration>bursite_septique` | Facteurs de risque d'infection : Infiltration récente du coude | — | — | 3 / 1 | provisoire | — |
| `ex_bourse>bursite_septique` | Tuméfaction de la bourse olécrânienne | — | — | 20 / 0,1 | provisoire | — |
| `ex_erytheme_bourse>bursite_septique` | Érythème sur la bourse olécrânienne | — | — | 3,1 / 0,23 | verifie | Reilly et Kamineni, 2016, J Shoulder Elbow Surg (PMID 26577126 ; bursite septique 83 % contre aseptique 27 %, calculé) |
| `p_bourse>bursite_septique` | Bourse olécrânienne douloureuse à la palpation | — | — | 2,4 / 0,19 | verifie | Reilly et Kamineni, 2016, J Shoulder Elbow Surg (PMID 26577126 ; bursite septique 83 % contre aseptique 27 %, calculé) |
| `ex_chaleur>bursite_septique` | Chaleur articulaire | — | — | 2,5 / 0,6 | provisoire | — |

Conduite :
- Investigation : rechercher les signes septiques (fièvre > 37,8 °C, chaleur locale nette, porte d'entrée cutanée, cellulite) ; si présents ou doute → ponction (Gram, culture, décompte, cristaux) ; leucocytes > 1000–3000/mm³ ou prédominance de neutrophiles évocateurs d'infection. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*
- Traitement : aseptique : protection de l'appui, bandage compressif et AINS en courte cure (résolution d'environ 83 % à 4 sem, comparable à la ponction avec ou sans corticoïde) ; pas d'infiltration intrabursale de routine (infection, atrophie cutanée). Septique : céphalexine (*S. aureus* dans environ 80 % des cas) pendant 7–14 j selon l'évolution, ponction répétée au besoin. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*
- Suivi : 48–72 h si septique ; 4 sem si aseptique. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*
- Retour / référence : fièvre, cellulite extensive, immunosuppression ou absence d'amélioration à 48–72 h → antibiotiques IV et drainage ; forme chronique récidivante → orthopédie. — *Ho et coll., 1978, Annals of Internal Medicine ; Nchinda et coll., 2021, Journal of Hand Surgery (PMID 33840568) ; Lormeau et coll., 2019, Joint Bone Spine (PMID 31615686)*

## Arthrose du coude

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 2 %, 60 ans 5 %, 80 ans 8 % ; homme ×1,5, femme ×0,7.

Repères publiés : Radiographique 25,2 % à 50–89 ans, symptomatique 0,9 % ; souvent post-traumatique ou chez le travailleur manuel (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>arthrose` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>arthrose` | Coude atteint | — | — | Les deux 1,5 | provisoire | — |
| `travail>arthrose` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 2 | provisoire | — |
| `atcd_fracture_coude>arthrose` | Fracture ou luxation antérieure de ce coude | — | — | 4 / 0,7 | provisoire | — |
| `duree>arthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>arthrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 0,5 ; Insidieux 3 | provisoire | — |
| `localisation.anterieure>arthrose` | Où est la douleur : Antérieure, au pli du coude | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.diffuse>arthrose` | Où est la douleur : Diffuse, dans tout le coude | — | — | 2 / 0,7 | provisoire | — |
| `type_douleur>arthrose` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `moment>arthrose` | Horaire | — | — | Pire le matin, mieux en bougeant 1,3 ; Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `raideur>arthrose` | Raideur matinale | — | — | Moins de 30 minutes 1,5 | provisoire | — |
| `blocage_coude>arthrose` | Blocage ou accrochage du coude | — | — | 3 / 0,7 | provisoire | — |
| `arom_flexion>arthrose` | Flexion active | — | — | Limitée par raideur 3 | provisoire | — |
| `arom_extension>arthrose` | Extension active | — | — | Complète et indolore 0,3 ; Déficit par raideur 3 | provisoire | — |
| `pronosup>arthrose` | Prono-supination limitée ou douloureuse | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Investigation : radiographies face et profil (ostéophytes, corps libres) ; souvent post-traumatique ou chez le travailleur manuel. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Wolf, « Lateral Epicondylitis », New England Journal of Medicine, 2023 ; Coombes et al., JAMA, 2013 ; Karjalainen et al., « Glucocorticoid injections for lateral elbow pain », Cochrane Database of Systematic Reviews, 2022 ; Krul et al., « Manipulative interventions for reducing pulled elbow in young children », Cochrane Database of Systematic Reviews, 2017 ; Aksel et al., American Journal of Emergency Medicine, 2025 ; Marson et al., « Interventions for treating supracondylar elbow fractures in children », Cochrane Database of Systematic Reviews, 2022 ; American College of Surgeons, « Best Practices in the Management of Orthopaedic Trauma », 2015 ; Egenolf et al., Archives of Orthopaedic and Trauma Surgery, 2024 ; Kim et al., Clinical Orthopaedics and Related Research, 2016 ; Baumbach et al., Archives of Orthopaedic and Trauma Surgery, 2014 ; Silver et al., « Peripheral Nerve Entrapment and Injury in the Upper Extremity », American Family Physician, 2021 ; Zwerus et al., American Journal of Sports Medicine, 2022 ; Breulmann et al., BMC Musculoskeletal Disorders, 2024 ; Perry et al. (essai SCIENCE), Lancet, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Traitement : éducation, modification des activités, analgésie de base, diclofénac topique, physiothérapie (maintien de l'amplitude) ; infiltration intra-articulaire au besoin. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Wolf, « Lateral Epicondylitis », New England Journal of Medicine, 2023 ; Coombes et al., JAMA, 2013 ; Karjalainen et al., « Glucocorticoid injections for lateral elbow pain », Cochrane Database of Systematic Reviews, 2022 ; Krul et al., « Manipulative interventions for reducing pulled elbow in young children », Cochrane Database of Systematic Reviews, 2017 ; Aksel et al., American Journal of Emergency Medicine, 2025 ; Marson et al., « Interventions for treating supracondylar elbow fractures in children », Cochrane Database of Systematic Reviews, 2022 ; American College of Surgeons, « Best Practices in the Management of Orthopaedic Trauma », 2015 ; Egenolf et al., Archives of Orthopaedic and Trauma Surgery, 2024 ; Kim et al., Clinical Orthopaedics and Related Research, 2016 ; Baumbach et al., Archives of Orthopaedic and Trauma Surgery, 2014 ; Silver et al., « Peripheral Nerve Entrapment and Injury in the Upper Extremity », American Family Physician, 2021 ; Zwerus et al., American Journal of Sports Medicine, 2022 ; Breulmann et al., BMC Musculoskeletal Disorders, 2024 ; Perry et al. (essai SCIENCE), Lancet, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Suivi : 3 mois. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Wolf, « Lateral Epicondylitis », New England Journal of Medicine, 2023 ; Coombes et al., JAMA, 2013 ; Karjalainen et al., « Glucocorticoid injections for lateral elbow pain », Cochrane Database of Systematic Reviews, 2022 ; Krul et al., « Manipulative interventions for reducing pulled elbow in young children », Cochrane Database of Systematic Reviews, 2017 ; Aksel et al., American Journal of Emergency Medicine, 2025 ; Marson et al., « Interventions for treating supracondylar elbow fractures in children », Cochrane Database of Systematic Reviews, 2022 ; American College of Surgeons, « Best Practices in the Management of Orthopaedic Trauma », 2015 ; Egenolf et al., Archives of Orthopaedic and Trauma Surgery, 2024 ; Kim et al., Clinical Orthopaedics and Related Research, 2016 ; Baumbach et al., Archives of Orthopaedic and Trauma Surgery, 2014 ; Silver et al., « Peripheral Nerve Entrapment and Injury in the Upper Extremity », American Family Physician, 2021 ; Zwerus et al., American Journal of Sports Medicine, 2022 ; Breulmann et al., BMC Musculoskeletal Disorders, 2024 ; Perry et al. (essai SCIENCE), Lancet, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Retour / référence : blocages (corps libres), perte d'amplitude fonctionnelle, symptômes ulnaires ou échec → orthopédie. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Wolf, « Lateral Epicondylitis », New England Journal of Medicine, 2023 ; Coombes et al., JAMA, 2013 ; Karjalainen et al., « Glucocorticoid injections for lateral elbow pain », Cochrane Database of Systematic Reviews, 2022 ; Krul et al., « Manipulative interventions for reducing pulled elbow in young children », Cochrane Database of Systematic Reviews, 2017 ; Aksel et al., American Journal of Emergency Medicine, 2025 ; Marson et al., « Interventions for treating supracondylar elbow fractures in children », Cochrane Database of Systematic Reviews, 2022 ; American College of Surgeons, « Best Practices in the Management of Orthopaedic Trauma », 2015 ; Egenolf et al., Archives of Orthopaedic and Trauma Surgery, 2024 ; Kim et al., Clinical Orthopaedics and Related Research, 2016 ; Baumbach et al., Archives of Orthopaedic and Trauma Surgery, 2014 ; Silver et al., « Peripheral Nerve Entrapment and Injury in the Upper Extremity », American Family Physician, 2021 ; Zwerus et al., American Journal of Sports Medicine, 2022 ; Breulmann et al., BMC Musculoskeletal Disorders, 2024 ; Perry et al. (essai SCIENCE), Lancet, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*

## Lésion du ligament collatéral ulnaire (lanceur)

Probabilité de départ (provisoire) : 12 ans 0 %, 14 ans 1 %, 16 ans 2 %, 22 ans 3 %, 35 ans 1 %, 50 ans 0 %.

Repères publiés : 0,95–1,4/10 000 expositions au baseball universitaire ; 31,8–33,1 % des lésions du coude au baseball (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>lcu` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>lcu` | Coude atteint | — | — | Les deux 0,2 | provisoire | — |
| `sport.lancer>lcu` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 5 / 1 | provisoire | — |
| `duree>lcu` | Depuis combien de temps | — | — | Moins de 7 jours 1,3 | provisoire | — |
| `apparition>lcu` | Mode d'apparition | — | — | Subit, avec un traumatisme 2 ; Subit, sans traumatisme 1,5 ; Insidieux 0,5 | provisoire | — |
| `mecanisme>lcu` | Mécanisme | — | — | Lancer (douleur médiale à l'armé ou à l'accélération) 6 | provisoire | — |
| `pop>lcu` | Claquement (« pop ») au moment de la blessure | — | — | 2,5 / 0,8 | provisoire | — |
| `localisation.laterale>lcu` | Où est la douleur : Latérale, à l'épicondyle | — | — | 0,3 / 1,1 | provisoire | — |
| `localisation.mediale>lcu` | Où est la douleur : Médiale, à l'épicondyle médial | — | — | 5 / 0,2 | provisoire | — |
| `lancer_agg>lcu` | Douleur en lançant ou au service | — | — | 4 / 0,3 | provisoire | — |
| `p_epi_med>lcu` | Épicondyle médial douloureux | — | — | 1,5 / 0,8 | provisoire | — |
| `p_lcu>lcu` | Ligament collatéral ulnaire douloureux (sous l'épicondyle médial) | — | — | 4 / 0,3 | provisoire | — |
| `flexion_pronation_res>lcu` | Flexion du poignet ou pronation résistée douloureuse | — | — | 1,3 / 0,9 | provisoire | — |
| `moving_valgus>lcu` | Moving valgus stress test | 98 % | 75 % | 3,92 / 0,03 | verifie | Sciascia et coll., Am J Sports Med (ligament collatéral ulnaire) : RV+ 3,94 ; RV− 0,02 |
| `milking>lcu` | Milking maneuver (stress en valgus) | 77 % | 85 % | 5,13 / 0,27 | verifie | Sciascia et coll., Am J Sports Med (ligament collatéral ulnaire) : RV+ 5,1 ; RV− 0,28 |

Conduite :
- Investigation : douleur médiale chez le lanceur, stress en valgus ; radiographies ; IRM si rupture suspectée chez l'athlète de lancer. — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Traitement : arrêt des lancers, analgésie de base, physiothérapie jusqu'à 12 sem, puis programme de retour au lancer ; pas d'infiltration de corticoïde. — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Suivi : 4–6 sem. — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Retour / référence : rupture complète ou échec chez le lanceur → orthopédie. — *Putukian et coll., 2026, Medicine and Science in Sports and Exercise*

## Rupture distale du biceps

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 45 ans 1 %, 65 ans 1 % ; homme ×10, femme ×0,1.

Repères publiés : 1,2–2,55/100 000 ; 92–96 % d'hommes, âge moyen 46 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>biceps` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>biceps` | Coude atteint | — | — | Les deux 0,1 | provisoire | — |
| `travail>biceps` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `sport.muscu>biceps` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 2 / 1 | provisoire | — |
| `duree>biceps` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,2 | provisoire | — |
| `apparition>biceps` | Mode d'apparition | — | — | Subit, avec un traumatisme 4 ; Subit, sans traumatisme 1,5 ; Graduel 0,3 ; Insidieux 0,2 | provisoire | — |
| `mecanisme>biceps` | Mécanisme | — | — | Chute sur la main tendue 0,5 ; Charge lourde, coude forcé en extension (soulever, retenir) 8 | provisoire | — |
| `pop>biceps` | Claquement (« pop ») au moment de la blessure | — | — | 5 / 0,3 | provisoire | — |
| `localisation.anterieure>biceps` | Où est la douleur : Antérieure, au pli du coude | — | — | 6 / 0,2 | provisoire | — |
| `ex_ecchymose_ant>biceps` | Ecchymose antécubitale | — | — | 6 / 0,5 | provisoire | — |
| `supination_faible>biceps` | Supination résistée faible | 95 % | 21 % | 1,2 / 0,24 | verifie | Zwerus et coll., 2022, Am J Sports Med (biceps distal, n = 86) : Se 95 %, Sp 21 % (RV+ 1,20, calculé) |
| `hook>biceps` | Hook test (tendon du biceps non crocheté) | 71 % | 96 % | 15,78 / 0,3 | verifie | Zwerus et coll., 2022, Am J Sports Med (biceps distal, n = 86) : RV+ 15,7 ; RV− 0,30 |
| `pli_bicipital>biceps` | Intervalle du pli bicipital de plus de 6 cm | 81 % | 91 % | 9 / 0,21 | verifie | Zwerus et coll., 2022, Am J Sports Med (biceps distal, n = 86) |
| `grappe:biceps_2pos>biceps` | Combinaison : Hook test et intervalle du pli bicipital tous deux positifs | — | — | 20 / — | verifie | Zwerus et coll., 2022, Am J Sports Med (biceps distal, n = 86) : Se 94 %, Sp 100 % (RV+ non calculable, plafonné à 20) |
| `grappe:biceps_2neg>biceps` | Combinaison : Hook test et intervalle du pli bicipital tous deux négatifs | — | — | — / 0,06 | verifie | Zwerus et coll., 2022, Am J Sports Med (biceps distal, n = 86) : RV− 0,06 |

Conduite :
- Investigation : « pop » lors d'une charge excentrique, ecchymose antécubitale ; test du crochet et intervalle du pli bicipital (les deux positifs en aigu : sensibilité 94 %, spécificité 100 %) ; imagerie superflue si les deux sont positifs, échographie ou IRM si résultats discordants. — *Zwerus et coll., 2022, American Journal of Sports Medicine ; O'Driscoll et coll., 2007, American Journal of Sports Medicine*
- Traitement : écharpe, analgésie. — *Zwerus et coll., 2022, American Journal of Sports Medicine ; O'Driscoll et coll., 2007, American Journal of Sports Medicine*
- Suivi : selon l'orthopédiste. — *Zwerus et coll., 2022, American Journal of Sports Medicine ; O'Driscoll et coll., 2007, American Journal of Sports Medicine*
- Retour / référence : référence orthopédique rapide pour toute rupture complète (réparation idéale en 2–4 sem ; le retard favorise la rétraction et peut imposer une reconstruction par greffe) ; traitement non chirurgical acceptable chez le patient âgé à faible demande (perte de force en supination et en flexion). — *Zwerus et coll., 2022, American Journal of Sports Medicine ; O'Driscoll et coll., 2007, American Journal of Sports Medicine*

## Ostéochondrite disséquante du capitulum

Probabilité de départ (provisoire) : 12 ans 2 %, 15 ans 1 %, 18 ans 0 %, 25 ans 0 %.

Repères publiés : 3,4–3,5 % des adolescents joueurs de baseball (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>ocd` | Coude atteint | — | — | Les deux 0,7 | provisoire | — |
| `sport.lancer>ocd` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 3 / 1 | provisoire | — |
| `duree>ocd` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 6 semaines à 3 mois 1,5 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>ocd` | Mode d'apparition | — | — | Graduel 2 | provisoire | — |
| `mecanisme>ocd` | Mécanisme | — | — | Chute sur la main tendue 1,3 | provisoire | — |
| `localisation.laterale>ocd` | Où est la douleur : Latérale, à l'épicondyle | — | — | 2 / 0,7 | provisoire | — |
| `lancer_agg>ocd` | Douleur en lançant ou au service | — | — | 2 / 0,7 | provisoire | — |
| `blocage_coude>ocd` | Blocage ou accrochage du coude | — | — | 5 / 0,5 | provisoire | — |
| `ex_epanchement>ocd` | Épanchement articulaire (fossette para-olécrânienne comblée) | — | — | 2 / 0,8 | provisoire | — |
| `p_tete_radiale>ocd` | Tête radiale douloureuse | — | — | 1,5 / 0,9 | provisoire | — |
| `arom_extension>ocd` | Extension active | — | — | Complète et indolore 0,5 ; Déficit avec douleur 2 ; Déficit par raideur 1,5 | provisoire | — |

Conduite :
- Investigation : adolescent lanceur ou gymnaste, douleur latérale, perte d'extension ; radiographies, IRM pour la stabilité. — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Traitement : lésion stable à physe ouverte : arrêt des lancers et des appuis 6 sem, puis reprise progressive ; réévaluation clinique et radiologique à 3–6 mois. — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Suivi : 6 sem. — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*
- Retour / référence : lésion instable, blocage, corps libre ou échec → orthopédie. — *Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Putukian et coll., 2026, Medicine and Science in Sports and Exercise*

## Conflit postérieur ou fracture de stress de l'olécrâne (lanceur)

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 1 %, 30 ans 1 %, 50 ans 0 %.

Repères publiés : Lésion de l'olécrâne la plus rapportée chez le sportif ; pas d'incidence (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>conflit_post` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.lancer>conflit_post` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 4 / 1 | provisoire | — |
| `duree>conflit_post` | Depuis combien de temps | — | — | 6 semaines à 3 mois 1,5 | provisoire | — |
| `apparition>conflit_post` | Mode d'apparition | — | — | Graduel 2 | provisoire | — |
| `mecanisme>conflit_post` | Mécanisme | — | — | Lancer (douleur médiale à l'armé ou à l'accélération) 2 | provisoire | — |
| `localisation.posterieure>conflit_post` | Où est la douleur : Postérieure, à l'olécrâne | — | — | 5 / 0,3 | provisoire | — |
| `appui_coude>conflit_post` | Pire en s'appuyant sur le coude | — | — | 1,3 / 0,9 | provisoire | — |
| `lancer_agg>conflit_post` | Douleur en lançant ou au service | — | — | 3 / 0,5 | provisoire | — |
| `blocage_coude>conflit_post` | Blocage ou accrochage du coude | — | — | 2 / 0,8 | provisoire | — |
| `p_olecrane>conflit_post` | Olécrâne douloureux (os) | — | — | 3 / 0,4 | provisoire | — |
| `arom_extension>conflit_post` | Extension active | — | — | Déficit avec douleur 2 | provisoire | — |

Conduite :
- Investigation : lanceur avec douleur postérieure en fin d'extension ; radiographies, IRM si négatives. (principes généraux, sans recommandation spécifique) — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Traitement : arrêt des lancers 6–8 sem, analgésie de base, physiothérapie. (principes généraux, sans recommandation spécifique) — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Suivi : 6 sem. (principes généraux, sans recommandation spécifique) — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Retour / référence : persistance, trait de fracture visible ou blocage → orthopédie. (principes généraux, sans recommandation spécifique) — *Duckworth et coll., 2023, Bone & Joint Journal (PMID 36722062) ; Joshi et coll., 2025, Journal of Bone and Joint Surgery (PMID 39787259) ; Lima et coll., 2026, Archives of Orthopaedic and Trauma Surgery*

## Tendinopathie ou rupture distale du triceps

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 50 ans 1 %, 70 ans 1 % ; homme ×2, femme ×0,6.

Repères publiés : Pas de donnée retrouvée (†).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>triceps` | Coude atteint | — | — | Les deux 0,3 | provisoire | — |
| `sport.muscu>triceps` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 2 / 1 | provisoire | — |
| `duree>triceps` | Depuis combien de temps | — | — | Moins de 7 jours 2 | provisoire | — |
| `apparition>triceps` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 | provisoire | — |
| `mecanisme>triceps` | Mécanisme | — | — | Charge lourde, coude forcé en extension (soulever, retenir) 3 | provisoire | — |
| `pop>triceps` | Claquement (« pop ») au moment de la blessure | — | — | 3 / 0,7 | provisoire | — |
| `localisation.posterieure>triceps` | Où est la douleur : Postérieure, à l'olécrâne | — | — | 5 / 0,3 | provisoire | — |
| `enflure_post>triceps` | Enflure derrière le coude (« balle » sur l'olécrâne) | — | — | 1,5 / 0,95 | provisoire | — |
| `p_olecrane>triceps` | Olécrâne douloureux (os) | — | — | 2 / 0,7 | provisoire | — |
| `extension_contre_gravite>triceps` | Extension active du coude contre la gravité impossible | — | — | 10 / 0,3 | provisoire | — |

Conduite :
- Investigation : extension active contre gravité ; défaut palpable ; radiographie de profil (écaille osseuse). — *Taylor et coll., 2012, Sports Health ; van et coll., 2003, Journal of Bone and Joint Surgery (PMID 14563805)*
- Traitement : tendinopathie : modification des activités, exercices. Rupture partielle < 50 % avec extension conservée : attelle à 30° de flexion pendant 4–6 sem. — *Taylor et coll., 2012, Sports Health ; van et coll., 2003, Journal of Bone and Joint Surgery (PMID 14563805)*
- Suivi : 2 sem. — *Taylor et coll., 2012, Sports Health ; van et coll., 2003, Journal of Bone and Joint Surgery (PMID 14563805)*
- Retour / référence : rupture complète ou perte de l'extension active → orthopédie en moins de 3 sem. — *Taylor et coll., 2012, Sports Health ; van et coll., 2003, Journal of Bone and Joint Surgery (PMID 14563805)*

## Syndrome du tunnel radial

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 50 ans 1 %, 70 ans 1 %.

Repères publiés : Pas de donnée retrouvée (†).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `travail>tunnel_radial` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `duree>tunnel_radial` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>tunnel_radial` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,5 ; Insidieux 1,5 | provisoire | — |
| `localisation.laterale>tunnel_radial` | Où est la douleur : Latérale, à l'épicondyle | — | — | 2 / 0,7 | provisoire | — |
| `localisation.lat_distale>tunnel_radial` | Où est la douleur : Latérale, 3 à 5 cm sous l'épicondyle (avant-bras) | — | — | 5 / 0,3 | provisoire | — |
| `type_douleur>tunnel_radial` | Type de douleur | — | — | Sourde, profonde 1,3 ; Brûlure 1,5 | provisoire | — |
| `prehension_agg>tunnel_radial` | Pire en serrant ou en saisissant un objet (poignée, tasse) | — | — | 1,5 / 0,8 | provisoire | — |
| `p_epi_lat>tunnel_radial` | Épicondyle latéral douloureux | — | — | 1,5 / 0,8 | provisoire | — |
| `p_radial_distal>tunnel_radial` | Douleur 3 à 5 cm sous l'épicondyle latéral (arcade de Frohse) | — | — | 5 / 0,3 | a_verifier | Aide-mémoire Québec (fiche 19, †) : critère clinique, sans précision publiée |
| `cozen>tunnel_radial` | Extension résistée du poignet (Cozen) | — | — | 1,5 / 0,8 | provisoire | — |
| `maudsley>tunnel_radial` | Extension résistée du 3ᵉ doigt (Maudsley) | — | — | 2 / 0,7 | provisoire | — |

Conduite :
- Investigation : clinique (douleur 3–5 cm distale à l'épicondyle latéral, sans déficit moteur ni sensitif) ; EMG habituellement normal. — *Dutton et coll., 2024, Muscle & Nerve ; Levina et coll., 2021, Current Reviews in Musculoskeletal Medicine ; Tang et coll., 2020, Journal of Hand Surgery, European Volume*
- Traitement : modification des activités (éviter extension du coude avec pronation et flexion du poignet répétées), AINS, attelle ; infiltration au besoin ; essai non chirurgical de 6–12 mois. — *Dutton et coll., 2024, Muscle & Nerve ; Levina et coll., 2021, Current Reviews in Musculoskeletal Medicine ; Tang et coll., 2020, Journal of Hand Surgery, European Volume*
- Suivi : 6–8 sem. — *Dutton et coll., 2024, Muscle & Nerve ; Levina et coll., 2021, Current Reviews in Musculoskeletal Medicine ; Tang et coll., 2020, Journal of Hand Surgery, European Volume*
- Retour / référence : faiblesse des extenseurs des doigts (atteinte du nerf interosseux postérieur) ou échec → chirurgie. — *Dutton et coll., 2024, Muscle & Nerve ; Levina et coll., 2021, Current Reviews in Musculoskeletal Medicine ; Tang et coll., 2020, Journal of Hand Surgery, European Volume*

## Arthrite inflammatoire ou microcristalline du coude (goutte, chondrocalcinose, PAR)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 1 %, 65 ans 2 %, 85 ans 3 %.

Repères publiés : Pas de donnée spécifique au coude (†) ; tophus olécrânien chez le goutteux âgé (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>arthrite` | Coude atteint | — | — | Les deux 3 | provisoire | — |
| `atcd_rhumato.uveite>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.synovite>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.goutte>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.par>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.spa>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 2,5 / 1 | provisoire | — |
| `duree>arthrite` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 | provisoire | — |
| `apparition>arthrite` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 4 | provisoire | — |
| `localisation.diffuse>arthrite` | Où est la douleur : Diffuse, dans tout le coude | — | — | 3 / 0,5 | provisoire | — |
| `type_douleur>arthrite` | Type de douleur | — | — | Lancinante, pulsatile 1,5 | provisoire | — |
| `moment>arthrite` | Horaire | — | — | Pire le matin, mieux en bougeant 2 ; Constante 1,5 | provisoire | — |
| `nocturne>arthrite` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `raideur>arthrite` | Raideur matinale | — | — | 30 minutes ou plus 4 | provisoire | — |
| `enflure_post>arthrite` | Enflure derrière le coude (« balle » sur l'olécrâne) | — | — | 1,5 / 0,9 | provisoire | — |
| `rougeur_chaleur>arthrite` | Rougeur ou chaleur | — | — | 3 / 0,5 | provisoire | — |
| `autres_articulations>arthrite` | Autres articulations enflées ou douloureuses | — | — | 5 / 0,6 | provisoire | — |
| `fievre>arthrite` | Fièvre ou frissons | — | — | 1,5 / 0,9 | provisoire | — |
| `ex_epanchement>arthrite` | Épanchement articulaire (fossette para-olécrânienne comblée) | — | — | 4 / 0,4 | provisoire | — |
| `ex_chaleur>arthrite` | Chaleur articulaire | — | — | 4 / 0,5 | provisoire | — |
| `ex_tophus>arthrite` | Tophus | — | — | 8 / 0,9 | provisoire | — |
| `arom_flexion>arthrite` | Flexion active | — | — | Complète et indolore 0,7 ; Limitée avec douleur 2 | provisoire | — |
| `arom_extension>arthrite` | Extension active | — | — | Complète et indolore 0,6 ; Déficit avec douleur 2 | provisoire | — |
| `pronosup>arthrite` | Prono-supination limitée ou douloureuse | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Investigation : monoarthrite aiguë = ponction (Gram, culture, cristaux, décompte), car l'arthrite septique peut être indiscernable ; VS, CRP, urate ; polyarthrite : FR, anti-CCP. — *Stamp et coll., 2019, Arthritis & Rheumatology*
- Traitement : goutte ou chondrocalcinose confirmée : voir le bloc commun. — *Stamp et coll., 2019, Arthritis & Rheumatology*
- Suivi : 48–72 h, puis 2–4 sem. — *Stamp et coll., 2019, Arthritis & Rheumatology*
- Retour / référence : fièvre, immunosuppression, prothèse ou doute d'infection → urgence ; polyarthrite persistante → rhumatologie. — *Stamp et coll., 2019, Arthritis & Rheumatology*

## Douleur projetée d'origine cervicale (C6–C7)

Probabilité de départ (provisoire) : 12 ans 1 %, 35 ans 2 %, 55 ans 4 %, 75 ans 3 %.

Repères publiés : Radiculopathie cervicale 83,2/100 000/an, pic à 50–54 ans (A, rachis cervical).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>cervical` | Coude atteint | — | — | Les deux 0,5 | provisoire | — |
| `apparition>cervical` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Insidieux 1,5 | provisoire | — |
| `localisation.diffuse>cervical` | Où est la douleur : Diffuse, dans tout le coude | — | — | 1,5 / 0,9 | provisoire | — |
| `type_douleur>cervical` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 2 | provisoire | — |
| `cou_agg>cervical` | Douleur aggravée par les mouvements du cou | — | — | 5 / 0,5 | provisoire | — |
| `paresthesies_ulnaires>cervical` | Engourdissements ou picotements des 4ᵉ et 5ᵉ doigts | — | — | 1,5 / 0,9 | provisoire | — |
| `paresthesies_autres>cervical` | Engourdissements du pouce, de l'index ou de tout le bras | — | — | 3 / 0,7 | provisoire | — |
| `faiblesse_main>cervical` | Faiblesse ou maladresse de la main | — | — | 1,5 / 0,95 | provisoire | — |
| `hypo_ulnaire>cervical` | Hypoesthésie du 5ᵉ doigt | — | — | 1,5 / 0,9 | provisoire | — |
| `spurling_coude>cervical` | Spurling ou mouvements du cou reproduisant la douleur | — | — | 5 / 0,4 | provisoire | — |
| `cou_mob>cervical` | Cou : mobilisation | — | — | Douloureuse ou reproduit la douleur du coude 4 | provisoire | — |
| `epaule_mob>cervical` | Épaule : mobilisation | — | — | Douloureuse ou limitée 1,3 | provisoire | — |

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j) ; diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID) sur l'épicondyle ou l'olécrâne.
- Analgésie de base (enfant) : acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) ; ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j).
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; prudence ≥ 65 ans (IPP si risque digestif).
- Céphalexine (bursite septique) : adulte 500 mg QID ; enfant 50 mg/kg/j en 3 doses (max 1 g/dose) ; réduire si ClCr < 60 mL/min (max 1 g/j entre 30 et 59). Ne couvre pas le SARM.
- Crise de goutte : colchicine 1,2 mg, puis 0,6 mg 1 h plus tard (max 1,8 mg la première heure) ; 12 h après, 0,6 mg DIE–BID jusqu'à résolution ; réduire avec les inhibiteurs du CYP3A4 ou de la P-gp (clarithromycine, diltiazem, vérapamil, cyclosporine) ; ne pas répéter avant 2 sem si ClCr < 30. Solutions de rechange : AINS à pleine dose ou prednisone 30–35 mg DIE pendant 5 j.
- Dosage de la charge : activité permise si douleur ≤ 3/10 et sans persistance après l'effort.
- Infiltration de corticoïde : soulagement de courte durée ; à éviter dans les tendinopathies du coude ; aviser les diabétiques d'une hausse transitoire de la glycémie.
- Intervalles de suivi : fondés sur le consensus et l'usage, non sur des essais.

Pour tous :
- Enseignement : la plupart des tendinopathies du coude guérissent en 6 à 12 mois ; doser la charge plutôt que l'arrêt complet
- Consignes de reconsultation : engourdissement ou faiblesse de la main, enflure ou rougeur croissante, fièvre, perte d'extension
