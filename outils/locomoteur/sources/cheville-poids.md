# Douleur à la cheville ou à la jambe : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs cheville` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 349 (validés 0, vérifiés 18, à vérifier 4, provisoires 327).

## Entorse latérale de la cheville

Probabilité de départ (provisoire) : 12 ans 30 %, 16 ans 38 %, 25 ans 30 %, 40 ans 20 %, 60 ans 12 %, 80 ans 8 %.

Repères publiés : Pic de 7,2/1 000 p-a à 15–19 ans, la moitié seulement consulte ; 1ʳᵉ cause chez l'adulte et le sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>entorse_lat` | Cheville atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.aucun>entorse_lat` | Activités physiques : Peu ou pas de sport | — | — | 0,6 / 1 | provisoire | — |
| `sport.pivot>entorse_lat` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,8 / 1 | provisoire | — |
| `sport.raquette>entorse_lat` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>entorse_lat` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,3 / 1 | provisoire | — |
| `sport.danse>entorse_lat` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `atcd_entorses>entorse_lat` | Entorses antérieures de cette cheville | — | — | 1,5 / 0,9 | provisoire | — |
| `premier>entorse_lat` | Premier épisode | — | — | 1,3 / 0,8 | provisoire | — |
| `duree>entorse_lat` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 0,4 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>entorse_lat` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>entorse_lat` | Mécanisme | — | — | Inversion (cheville tournée vers l'intérieur) 3 ; Éversion ou rotation externe du pied 0,3 ; Poussée ou départ explosif 0,2 ; Coup direct 0,5 | provisoire | — |
| `coup_baton>entorse_lat` | Sensation de coup de bâton ou de pop derrière la cheville ou au mollet | — | — | 0,6 / 1,1 | provisoire | — |
| `oedeme_rapide>entorse_lat` | Œdème rapide et important | — | — | 1,5 / 0,6 | provisoire | — |
| `localisation.laterale>entorse_lat` | Où est la douleur : Latérale, devant ou sous la malléole externe | — | — | 4 / 0,2 | provisoire | — |
| `localisation.mediale>entorse_lat` | Où est la douleur : Médiale (malléole interne, rétromalléolaire) | — | — | 0,5 / 1,2 | provisoire | — |
| `derobade>entorse_lat` | Entorses à répétition ou cheville qui cède | — | — | 1,2 / 1 | provisoire | — |
| `enflure>entorse_lat` | Enflure de la cheville | — | — | 2 / 0,3 | provisoire | — |
| `rougeur_chaleur>entorse_lat` | Rougeur ou chaleur | — | — | 0,8 / 1 | provisoire | — |
| `demarche>entorse_lat` | Démarche | — | — | Boiterie antalgique 1,3 ; Incapable de mettre du poids 1,5 | provisoire | — |
| `ex_oedeme_lat>entorse_lat` | Œdème latéral | — | — | 1,5 / 0,1 | a_verifier | Baltes et coll., 2024, KSSTA (PMID 38385771) : gonflement latéral dans les 2 premiers jours, Se 100 % pour la rupture ligamentaire (n = 43) ; RV− fixé à 0,1 |
| `ex_ecchymose>entorse_lat` | Hématome ou ecchymose | 43 % | 85 % | 2,87 / 0,67 | verifie | Baltes et coll., 2024, KSSTA (PMID 38385771) : hématome à l'examen aigu (91 % à l'examen différé) |
| `ex_chaleur>entorse_lat` | Rougeur ou chaleur | — | — | 0,8 / 1 | provisoire | — |
| `p_mall_lat>entorse_lat` | Malléole latérale : bord postérieur ou pointe (6 cm) | — | — | 1,2 / 0,8 | provisoire | — |
| `p_ltfa>entorse_lat` | Ligament talo-fibulaire antérieur | — | — | 1,6 / 0,2 | a_verifier | Netterström-Wedin et coll., 2022, Sports Health (méta-analyse) : Se > 90 %, Sp < 50 % |
| `p_lcf>entorse_lat` | Ligament calcanéo-fibulaire | — | — | 2 / 0,6 | provisoire | — |
| `arom_df>entorse_lat` | Dorsiflexion active | — | — | Limitée avec douleur 1,2 | provisoire | — |
| `arom_fp>entorse_lat` | Flexion plantaire active | — | — | Limitée avec douleur 1,3 | provisoire | — |
| `prom_inversion>entorse_lat` | Inversion passive | — | — | Limitée avec douleur 2 | provisoire | — |
| `tiroir_ant>entorse_lat` | Tiroir antérieur | — | — | Laxité 3 ; Douleur sans laxité 1,3 ; Normal et indolore 0,7 | a_verifier | Netterström-Wedin et coll., 2022, Sports Health (méta-analyse) : Se 12–80 %, Sp 67–100 % |
| `talar_tilt>entorse_lat` | Talar tilt | — | — | Laxité 3 ; Normal et indolore 0,8 | a_verifier | Netterström-Wedin et coll., 2022, Sports Health (méta-analyse) : Se 17–66 %, Sp 82–100 % |

Conduite :
- Investigation : règles d'Ottawa. Palper chez tous la fibula proximale, la base du 5ᵉ métatarsien, le naviculaire et la syndesmose. Le réexamen à 4–5 j évalue mieux la gravité (hématome, sensibilité du ligament talo-fibulaire antérieur et tiroir antérieur : sensibilité 96 %, spécificité 84 %). Ni radiographie en stress ni IRM initiale. — *Beckenkamp et coll., 2017, British Journal of Sports Medicine (PMID 27884861) ; Dowling et coll., 2009, Academic Emergency Medicine (PMID 19187397) ; Martin et coll., 2021, Journal of Orthopaedic and Sports Physical Therapy (PMID 33789434) ; Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Wu et coll., 2025, American Family Physician*
- Traitement : traitement fonctionnel : appui progressif selon la tolérance et orthèse semi-rigide ou lacée (préférée au bandage adhésif), portée 4–6 sem selon l'APTA (5–10 j selon d'autres sources). Entorse sévère avec appui impossible : immobilisation courte ≤ 10 j (plâtre sous le genou ou orthèse à étrier dans l'essai CAST), puis orthèse ; éviter toute immobilisation rigide au-delà de 10 j. Exercices précoces, puis programme neuromusculaire de 8–12 sem (réduit les récidives d'environ 40 %). Physiothérapie supervisée non requise pour les grades 1–2 (aucun gain à 3 mois dans l'essai de Kingston) ; à privilégier si entorse sévère. Analgésie de base. — *Beckenkamp et coll., 2017, British Journal of Sports Medicine (PMID 27884861) ; Dowling et coll., 2009, Academic Emergency Medicine (PMID 19187397) ; Martin et coll., 2021, Journal of Orthopaedic and Sports Physical Therapy (PMID 33789434) ; Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Wu et coll., 2025, American Family Physician*
- Suivi : réexamen à 4–7 j, puis 4–6 sem. Travail sédentaire à 2–6 sem, travail physique ou sport à 6–8 sem. Orthèse au sport jusqu'à 12 mois (récidive 15 % contre 27 %). — *Beckenkamp et coll., 2017, British Journal of Sports Medicine (PMID 27884861) ; Dowling et coll., 2009, Academic Emergency Medicine (PMID 19187397) ; Martin et coll., 2021, Journal of Orthopaedic and Sports Physical Therapy (PMID 33789434) ; Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Wu et coll., 2025, American Family Physician*
- Retour / référence : douleur ou enflure persistante à 6 sem → radiographies si non faites, puis IRM (lésion ostéochondrale, fibulaires, fracture occulte : fiches 18, 16 et 25) ; déformation ou atteinte neurovasculaire → urgence. — *Beckenkamp et coll., 2017, British Journal of Sports Medicine (PMID 27884861) ; Dowling et coll., 2009, Academic Emergency Medicine (PMID 19187397) ; Martin et coll., 2021, Journal of Orthopaedic and Sports Physical Therapy (PMID 33789434) ; Herring et coll., 2024, Medicine and Science in Sports and Exercise ; Wu et coll., 2025, American Family Physician*

## Instabilité chronique de la cheville

Probabilité de départ (provisoire) : 12 ans 2 %, 18 ans 5 %, 30 ans 6 %, 50 ans 4 %, 70 ans 2 %.

Repères publiés : 40 % après une première entorse (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>instab` | Cheville atteinte | — | — | Les deux 0,4 | provisoire | — |
| `sport.aucun>instab` | Activités physiques : Peu ou pas de sport | — | — | 0,7 / 1 | provisoire | — |
| `sport.pivot>instab` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `atcd_entorses>instab` | Entorses antérieures de cette cheville | — | — | 5 / 0,3 | provisoire | — |
| `premier>instab` | Premier épisode | — | — | 0,3 / 3 | provisoire | — |
| `duree>instab` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>instab` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 | provisoire | — |
| `localisation.laterale>instab` | Où est la douleur : Latérale, devant ou sous la malléole externe | — | — | 2 / 0,6 | provisoire | — |
| `derobade>instab` | Entorses à répétition ou cheville qui cède | — | — | 6 / 0,3 | provisoire | — |
| `arches>instab` | Arches plantaires | — | — | Creuses 1,5 | provisoire | — |
| `appui_uni>instab` | Appui unipodal | — | — | Instable ou douloureux 2 | provisoire | — |
| `p_ltfa>instab` | Ligament talo-fibulaire antérieur | — | — | 1,3 / 0,9 | provisoire | — |
| `tiroir_ant>instab` | Tiroir antérieur | — | — | Laxité 3 ; Normal et indolore 0,6 | provisoire | — |
| `talar_tilt>instab` | Talar tilt | — | — | Laxité 3 ; Normal et indolore 0,7 | provisoire | — |

Conduite :
- Investigation : première entorse il y a ≥ 12 mois, puis dérobements ou entorses à répétition (≥ 2 épisodes) et questionnaire CAIT < 24. Rechercher un varus de l'arrière-pied, un pied creux, une hyperlaxité, un tiroir antérieur. Radiographies en charge ; IRM si chirurgie envisagée ou lésion associée suspectée. — *Tsikopoulos et coll., 2018, Clinical Orthopaedics and Related Research (PMID 29771855) ; Doherty et coll., 2017, British Journal of Sports Medicine (PMID 28053200) ; Aicale et coll., 2020, Foot & Ankle International*
- Traitement : physiothérapie multimodale supervisée (équilibre et renforcement) ≥ 4 sem : gain de 10 points au CAIT (seuil cliniquement important : 3) ; orthèse au sport. — *Tsikopoulos et coll., 2018, Clinical Orthopaedics and Related Research (PMID 29771855) ; Doherty et coll., 2017, British Journal of Sports Medicine (PMID 28053200) ; Aicale et coll., 2020, Foot & Ankle International*
- Suivi : 6–8 sem, puis 3 mois. — *Tsikopoulos et coll., 2018, Clinical Orthopaedics and Related Research (PMID 29771855) ; Doherty et coll., 2017, British Journal of Sports Medicine (PMID 28053200) ; Aicale et coll., 2020, Foot & Ankle International*
- Retour / référence : échec après 3–6 mois de réadaptation et d'orthèse → orthopédie (réparation de Broström ; seuil fondé sur le consensus). — *Tsikopoulos et coll., 2018, Clinical Orthopaedics and Related Research (PMID 29771855) ; Doherty et coll., 2017, British Journal of Sports Medicine (PMID 28053200) ; Aicale et coll., 2020, Foot & Ankle International*

## Tendinopathie d'Achille corporéale

Probabilité de départ (provisoire) : 12 ans 1 %, 20 ans 3 %, 35 ans 8 %, 50 ans 10 %, 65 ans 7 %, 80 ans 4 % ; homme ×1,2, femme ×0,85.

Repères publiés : 1,85–2,35/1 000 p-a ; 7–9 % des coureurs par an (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>achille` | Cheville atteinte | — | — | Les deux 1,5 | provisoire | — |
| `sport.aucun>achille` | Activités physiques : Peu ou pas de sport | — | — | 0,8 / 1 | provisoire | — |
| `sport.course>achille` | Activités physiques : Course à pied | — | — | 2 / 1 | provisoire | — |
| `sport.danse>achille` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,2 / 1 | provisoire | — |
| `fluoro_cortico>achille` | Fluoroquinolone ou corticoïde récents | — | — | 1,5 / 0,95 | provisoire | — |
| `duree>achille` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>achille` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2,5 ; Insidieux 2 | provisoire | — |
| `localisation.achille_corps>achille` | Où est la douleur : Tendon d'Achille, 2 à 6 cm au-dessus du talon | 84 % | 73 % | 3,11 / 0,22 | verifie | Martin et coll., 2018, JOSPT, guide de pratique (PMID 29712543) : douleur rapportée 2 à 6 cm au-dessus de l'insertion (n = 21) |
| `localisation.achille_ins>achille` | Où est la douleur : Insertion du tendon d'Achille (arrière du talon) | — | — | 0,8 / 1 | provisoire | — |
| `course_saut>achille` | Pire à la course ou au saut | — | — | 2,5 / 0,4 | provisoire | — |
| `pointes>achille` | Pire en montant sur la pointe des pieds | — | — | 2 / 0,5 | provisoire | — |
| `moment>achille` | Horaire | — | — | Pire le matin, mieux en bougeant 2 | provisoire | — |
| `raideur>achille` | Raideur matinale | — | — | Moins de 30 minutes 1,3 | provisoire | — |
| `enflure>achille` | Enflure de la cheville | — | — | 0,8 / 1,05 | provisoire | — |
| `talons_pointes>achille` | Marche sur talons et pointes | — | — | Difficile ou douloureuse 1,5 | provisoire | — |
| `saut_uni>achille` | Saut unipodal | — | — | Douloureux 1,5 | provisoire | — |
| `pointe_uni>achille` | Montée sur pointe unipodale | — | — | Douloureuse 2 | provisoire | — |
| `p_achille_corps>achille` | Tendon d'Achille, portion moyenne | 78 % | 77 % | 3,39 / 0,29 | verifie | Martin et coll., 2018, JOSPT, guide de pratique (PMID 29712543) : échographie, n = 21 |
| `arom_fp>achille` | Flexion plantaire active | — | — | Limitée avec douleur 1,2 | provisoire | — |
| `rrom_fp>achille` | Flexion plantaire résistée | — | — | 2 / 0,6 | provisoire | — |
| `royal_london>achille` | Royal London Hospital test | 54 % | 86 % | 3,86 / 0,53 | verifie | Reiman et coll., 2014, J Athl Train (PMID 25243736) |
| `arc_sign>achille` | Arc sign | 42 % | 88 % | 3,5 / 0,66 | verifie | Reiman et coll., 2014, J Athl Train (PMID 25243736) |

Conduite :
- Investigation : clinique : douleur 2–7 cm au-dessus de l'insertion, à l'activité, aux tests de charge (élévations du talon, sauts) et à la palpation. Imagerie seulement si doute (échographie d'abord). Rechercher une fluoroquinolone récente (cesser au premier symptôme tendineux), une corticothérapie, une spondylarthrite. — *Cooper, 2023, JAMA ; Martin et coll., 2018, Journal of Orthopaedic and Sports Physical Therapy (PMID 29712543) ; Alves et coll., 2019, European Journal of Clinical Pharmacology (PMID 31270563)*
- Traitement : mise en charge progressive ≥ 12 sem : excentrique d'Alfredson (3 × 15, genou tendu puis fléchi, 2 fois/j ; la version « selon la tolérance » fait aussi bien) ou résistance lourde et lente (3 fois/sem), d'efficacité équivalente. Talonnettes : option (essai HEALTHY). AINS : sans effet sur l'évolution. Ondes de choc : deuxième ligne. Infiltration de corticoïde : essais contradictoires, aucun bénéfice à 12 mois dans l'essai Inject → à éviter en première ligne. Plasma riche en plaquettes : inefficace. — *Cooper, 2023, JAMA ; Martin et coll., 2018, Journal of Orthopaedic and Sports Physical Therapy (PMID 29712543) ; Alves et coll., 2019, European Journal of Clinical Pharmacology (PMID 31270563)*
- Suivi : 6 sem, puis 12 sem. Récupération médiane d'environ 12 sem chez le coureur ; l'amélioration se poursuit jusqu'à 1 an. — *Cooper, 2023, JAMA ; Martin et coll., 2018, Journal of Orthopaedic and Sports Physical Therapy (PMID 29712543) ; Alves et coll., 2019, European Journal of Clinical Pharmacology (PMID 31270563)*
- Retour / référence : douleur brutale avec claquement → fiche 5 ; échec après 3–6 mois de mise en charge bien conduite → médecine du sport (20–29 % d'échecs). — *Cooper, 2023, JAMA ; Martin et coll., 2018, Journal of Orthopaedic and Sports Physical Therapy (PMID 29712543) ; Alves et coll., 2019, European Journal of Clinical Pharmacology (PMID 31270563)*

## Tendinopathie d'insertion, Haglund ou bursite rétro-calcanéenne

Probabilité de départ (provisoire) : 12 ans 1 %, 25 ans 2 %, 45 ans 5 %, 60 ans 6 %, 80 ans 4 %.

Repères publiés : Environ un tiers des douleurs achilléennes (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>insertion` | Cheville atteinte | — | — | Les deux 1,4 | provisoire | — |
| `sport.course>insertion` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `obesite>insertion` | Obésité (IMC 30 ou plus) | — | — | 1,5 / 0,9 | provisoire | — |
| `duree>insertion` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>insertion` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2 ; Insidieux 2 | provisoire | — |
| `localisation.achille_corps>insertion` | Où est la douleur : Tendon d'Achille, 2 à 6 cm au-dessus du talon | — | — | 0,6 / 1,1 | provisoire | — |
| `localisation.achille_ins>insertion` | Où est la douleur : Insertion du tendon d'Achille (arrière du talon) | — | — | 6 / 0,3 | provisoire | — |
| `course_saut>insertion` | Pire à la course ou au saut | — | — | 1,8 / 0,6 | provisoire | — |
| `pointes>insertion` | Pire en montant sur la pointe des pieds | — | — | 1,8 / 0,6 | provisoire | — |
| `descente>insertion` | Pire accroupi, en descente ou en dorsiflexion | — | — | 1,3 / 0,9 | provisoire | — |
| `moment>insertion` | Horaire | — | — | Pire le matin, mieux en bougeant 2 | provisoire | — |
| `pointe_uni>insertion` | Montée sur pointe unipodale | — | — | Douloureuse 2 | provisoire | — |
| `haglund>insertion` | Saillie postérieure du calcanéus (Haglund) | — | — | 3 / 0,8 | provisoire | — |
| `p_achille_ins>insertion` | Insertion du tendon d'Achille | — | — | 5 / 0,3 | provisoire | — |
| `rrom_fp>insertion` | Flexion plantaire résistée | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Investigation : douleur dans les 2 cm de l'insertion ; radiographie de profil utile (Haglund, enthésophyte, calcifications). Atteinte bilatérale ou autres enthésites → rechercher une spondylarthrite. — *Hall et coll., 2024, Foot & Ankle International ; Heckman et coll., 2009, American Journal of Sports Medicine ; Morancie et coll., 2025, American Family Physician*
- Traitement : excentrique au sol, sans dorsiflexion (3 × 15, 2 fois/j, 12 sem : 67 % de satisfaits contre environ 30 % avec le protocole sur marche) ; éviter les étirements et les côtes au début ; talonnettes (avis d'experts). Ondes de choc : essais contradictoires. Bursite rétro-calcanéenne : infiltration échoguidée de la bourse en option (consensus), jamais dans le tendon. — *Hall et coll., 2024, Foot & Ankle International ; Heckman et coll., 2009, American Journal of Sports Medicine ; Morancie et coll., 2025, American Family Physician*
- Suivi : 6–8 sem. — *Hall et coll., 2024, Foot & Ankle International ; Heckman et coll., 2009, American Journal of Sports Medicine ; Morancie et coll., 2025, American Family Physician*
- Retour / référence : échec à environ 6 mois (20–40 %) → orthopédie. — *Hall et coll., 2024, Foot & Ankle International ; Heckman et coll., 2009, American Journal of Sports Medicine ; Morancie et coll., 2025, American Family Physician*

## Rupture du tendon d'Achille

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 1 %, 40 ans 2 %, 55 ans 2 %, 70 ans 1 %, 85 ans 1 % ; homme ×2, femme ×0,5.

Repères publiés : 15,7/100 000 p-a ; 42,6 chez les hommes de 30–49 ans ; 68 % liées au sport (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>rupture_achille` | Cheville atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.pivot>rupture_achille` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.raquette>rupture_achille` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 2 / 1 | provisoire | — |
| `fluoro_cortico>rupture_achille` | Fluoroquinolone ou corticoïde récents | — | — | 3 / 0,9 | provisoire | — |
| `duree>rupture_achille` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 6 semaines à 3 mois 0,4 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>rupture_achille` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 ; Subit, sans traumatisme 3 ; Graduel 0,2 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>rupture_achille` | Mécanisme | — | — | Poussée ou départ explosif 5 | provisoire | — |
| `coup_baton>rupture_achille` | Sensation de coup de bâton ou de pop derrière la cheville ou au mollet | — | — | 6 / 0,3 | provisoire | — |
| `localisation.achille_corps>rupture_achille` | Où est la douleur : Tendon d'Achille, 2 à 6 cm au-dessus du talon | — | — | 3 / 0,5 | provisoire | — |
| `localisation.mollet>rupture_achille` | Où est la douleur : Mollet | — | — | 2 / 0,9 | provisoire | — |
| `pointes>rupture_achille` | Pire en montant sur la pointe des pieds | — | — | 3 / 0,3 | provisoire | — |
| `demarche>rupture_achille` | Démarche | — | — | Boiterie antalgique 1,5 | provisoire | — |
| `talons_pointes>rupture_achille` | Marche sur talons et pointes | — | — | Difficile ou douloureuse 2 | provisoire | — |
| `pointe_uni>rupture_achille` | Montée sur pointe unipodale | — | — | Impossible ou sans inversion du talon 4 | provisoire | — |
| `p_achille_corps>rupture_achille` | Tendon d'Achille, portion moyenne | — | — | 2 / 0,7 | provisoire | — |
| `p_defect>rupture_achille` | Défect palpable du tendon d'Achille | 73 % | 89 % | 6,64 / 0,3 | verifie | Maffulli, 1998, Am J Sports Med (PMID 9548122) |
| `p_mollet>rupture_achille` | Mollet | — | — | 1,5 / 0,9 | provisoire | — |
| `rrom_fp>rupture_achille` | Flexion plantaire résistée | — | — | 3 / 0,5 | provisoire | — |
| `thompson>rupture_achille` | Thompson | 96 % | 93 % | 13,71 / 0,04 | verifie | Maffulli, 1998, Am J Sports Med (PMID 9548122) ; Reiman et coll., 2014, J Athl Train (PMID 25243736) |
| `matles>rupture_achille` | Matles | 88 % | 85 % | 5,87 / 0,14 | verifie | Maffulli, 1998, Am J Sports Med (PMID 9548122) |

Conduite :
- Investigation : sensation de coup au mollet. Test de Thompson (sensibilité 96 %, spécificité 93 %), défaut palpable, dorsiflexion passive augmentée (test de Matles) : 2 signes suffisent. Une flexion plantaire active conservée n'exclut pas la rupture ; diagnostic manqué dans jusqu'à 25 % des cas. Échographie si examen équivoque ; pas d'imagerie avancée de routine. — *Gross et coll., 2016, Foot & Ankle International ; Barfod et coll., 2022, New England Journal of Medicine ; Costa et coll., 2020, Lancet (PMID 32035553)*
- Traitement : le jour même : attelle ou botte en équin, sans appui, béquilles ; thromboprophylaxie selon le score TRiP(cast) (traumatisme à haut risque). Traitement non chirurgical avec réadaptation fonctionnelle ou chirurgie : fonction semblable à 12 mois ; re-rupture 6,2 % contre 0,6 %, lésion nerveuse 0,6 % contre 2,8–5,2 % (Myhrvold, 2022) → décision partagée. — *Gross et coll., 2016, Foot & Ankle International ; Barfod et coll., 2022, New England Journal of Medicine ; Costa et coll., 2020, Lancet (PMID 32035553)*
- Suivi : selon l'orthopédiste ; 4 patients sur 10 seulement retrouvent leur niveau sportif à 1 an. — *Gross et coll., 2016, Foot & Ankle International ; Barfod et coll., 2022, New England Journal of Medicine ; Costa et coll., 2020, Lancet (PMID 32035553)*
- Retour / référence : toute rupture → orthopédie en quelques jours (les essais ont inclus les patients dans les 72 h à 14 j) ; présentation tardive → plus souvent chirurgicale. Douleur du mollet ou dyspnée sous immobilisation → Doppler ou urgence. — *Gross et coll., 2016, Foot & Ankle International ; Barfod et coll., 2022, New England Journal of Medicine ; Costa et coll., 2020, Lancet (PMID 32035553)*

## Fracture de la cheville ou du médio-pied

Probabilité de départ (provisoire) : 12 ans 6 %, 16 ans 5 %, 30 ans 5 %, 50 ans 8 %, 70 ans 12 %, 85 ans 15 %.

Repères publiés : 164–179/100 000 p-a chez l'adulte ; 3ᵉ fracture après 65 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>fracture` | Cheville atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.glisse>fracture` | Activités physiques : Ski ou planche | — | — | 1,3 / 1 | provisoire | — |
| `duree>fracture` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,8 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>fracture` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,3 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>fracture` | Mécanisme | — | — | Poussée ou départ explosif 0,3 ; Chute de hauteur ou réception sur le pied 2,5 ; Coup direct 1,5 | provisoire | — |
| `oedeme_rapide>fracture` | Œdème rapide et important | — | — | 1,8 / 0,6 | provisoire | — |
| `localisation.laterale>fracture` | Où est la douleur : Latérale, devant ou sous la malléole externe | — | — | 1,3 / 0,8 | provisoire | — |
| `localisation.haute>fracture` | Où est la douleur : Haute, au-dessus de la cheville, entre tibia et péroné | — | — | 1,2 / 1 | provisoire | — |
| `enflure>fracture` | Enflure de la cheville | — | — | 1,8 / 0,5 | provisoire | — |
| `demarche>fracture` | Démarche | — | — | Normale 0,5 ; Boiterie antalgique 1,5 ; Incapable de mettre du poids 2,5 | provisoire | — |
| `saut_uni>fracture` | Saut unipodal | — | — | Impossible 1,5 | provisoire | — |
| `ex_oedeme_lat>fracture` | Œdème latéral | — | — | 1,5 / 0,5 | provisoire | — |
| `ex_ecchymose>fracture` | Hématome ou ecchymose | — | — | 1,5 / 0,9 | provisoire | — |
| `p_mall_lat>fracture` | Malléole latérale : bord postérieur ou pointe (6 cm) | — | — | 2 / 0,4 | provisoire | — |
| `p_mall_med>fracture` | Malléole médiale : bord postérieur ou pointe (6 cm) | — | — | 2 / 0,7 | provisoire | — |
| `p_5mt>fracture` | Base du 5ᵉ métatarsien | — | — | 2 / 0,9 | provisoire | — |
| `p_navic>fracture` | Naviculaire | — | — | 1,8 / 0,95 | provisoire | — |
| `grappe:ottawa_neg>fracture` | Combinaison : Règles d'Ottawa négatives | — | — | — / 0,08 | verifie | Bachmann et coll., 2003, BMJ (PMID 12595378) ; Beckenkamp et coll., 2017, BJSM (PMID 27884861) : Se 99,4 %, Sp 35,3 %, RV− 0,08 |
| `grappe:ottawa_pos>fracture` | Combinaison : Règles d'Ottawa positives (au moins un critère) | 99 % | 35 % | 1,54 / — | verifie | Bachmann et coll., 2003, BMJ (PMID 12595378) ; Beckenkamp et coll., 2017, BJSM (PMID 27884861) : RV+ 1,54 (calculé) ; ne confirme pas |

Conduite :
- Investigation : règles d'Ottawa ; face, profil, mortaise ; palper la fibula proximale ; état cutané et neurovasculaire. Stabilité : espace clair médial < 4 mm sur un cliché en charge. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Traitement : luxation ou peau menacée : réduction urgente. Fracture stable (malléole latérale isolée Weber A, ou Weber B à mortaise congruente sans sensibilité médiale) : botte de marche ou orthèse avec appui toléré ; 3 sem d'orthèse non inférieures à 6 sem de plâtre (Kortekangas, 2019) ; orthèse amovible équivalente au plâtre (essai AIR). Thromboprophylaxie selon le score TRiP(cast). — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Suivi : radiographie en charge à 1 sem (le déplacement secondaire survient surtout dans les 2 premières semaines) ; les clichés de routine à 6 et 12 sem peuvent être omis (essai WARRIOR). — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Retour / référence : fracture bi- ou trimalléolaire, déplacement ou bascule du talus, espace clair médial ≥ 4 mm, fracture de la fibula au-dessus de la syndesmose, sensibilité ou ecchymose médiale avec fracture fibulaire, fracture ouverte → orthopédie le jour même. Diabète avec neuropathie → référence précoce (complications fréquentes). Après 50 ans et trauma mineur : revoir les facteurs de risque d'ostéoporose †. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*

## Périostite tibiale (syndrome de stress tibial médial)

Probabilité de départ (provisoire) : 12 ans 2 %, 16 ans 6 %, 22 ans 6 %, 35 ans 3 %, 50 ans 1 %, 70 ans 0 % ; femme ×1,5, homme ×0,75.

Repères publiés : 13–17 % des blessures de course ; 13,6–20 % des coureurs (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>periostite` | Cheville atteinte | — | — | Les deux 2 | provisoire | — |
| `sport.aucun>periostite` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.course>periostite` | Activités physiques : Course à pied | — | — | 2,5 / 1 | provisoire | — |
| `duree>periostite` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 1 à 6 semaines 1,2 | provisoire | — |
| `apparition>periostite` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,1 ; Graduel 3 | provisoire | — |
| `localisation.tibia_med>periostite` | Où est la douleur : Bord interne du tibia, tiers inférieur (diffuse) | — | — | 6 / 0,3 | provisoire | — |
| `localisation.tibia_focal>periostite` | Où est la douleur : Point précis sur le tibia ou le péroné | — | — | 1,5 / 0,9 | provisoire | — |
| `course_saut>periostite` | Pire à la course ou au saut | — | — | 3 / 0,3 | provisoire | — |
| `effort_loge>periostite` | Douleur ou tension après un temps d'effort fixe, qui cède au repos | — | — | 1,5 / 0,7 | provisoire | — |
| `moment>periostite` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>periostite` | Douleur la nuit | — | — | 0,6 / 1,1 | provisoire | — |
| `enflure>periostite` | Enflure de la cheville | — | — | 0,4 / 1,1 | provisoire | — |
| `arches>periostite` | Arches plantaires | — | — | Affaissées 1,3 | provisoire | — |
| `saut_uni>periostite` | Saut unipodal | — | — | Douloureux 1,8 ; Normal 0,5 | provisoire | — |
| `p_tibia_med>periostite` | Bord médial du tibia (diffus) | — | — | 5 / 0,3 | provisoire | — |
| `p_tibia_focal>periostite` | Point osseux précis du tibia ou de la fibula | — | — | 1,3 / 0,9 | provisoire | — |

Conduite :
- Investigation : clinique : sensibilité diffuse du bord postéro-médial du tibia sur > 5 cm. Sensibilité focale, œdème ou saut unipodal douloureux → suspecter une fracture de stress (radiographie, puis IRM). — *David et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Marques et coll., 2025, Gait & Posture (PMID 40633262)*
- Traitement : repos relatif des activités douloureuses (≥ 7–10 j), entraînement croisé, renforcement du mollet et de la hanche, reprise graduelle après 5 j sans douleur au quotidien. Aucun traitement n'a fait ses preuves ; ondes de choc prometteuses dans les formes chroniques ; orthèses plantaires si hyperpronation (prévention). — *David et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Marques et coll., 2025, Gait & Posture (PMID 40633262)*
- Suivi : 4–6 sem ; retour moyen en 6 sem environ. — *David et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Marques et coll., 2025, Gait & Posture (PMID 40633262)*
- Retour / référence : douleur focale ou nocturne → imagerie ; échec → médecine du sport. — *David et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Marques et coll., 2025, Gait & Posture (PMID 40633262)*

## Fracture de stress du tibia ou de la fibula

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 3 %, 25 ans 2 %, 40 ans 1 %, 60 ans 0 % ; femme ×1,5, homme ×0,75.

Repères publiés : Tibia : 49 % des fractures de stress de l'athlète (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>ff_tibia` | Cheville atteinte | — | — | Les deux 1,2 | provisoire | — |
| `sport.aucun>ff_tibia` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.course>ff_tibia` | Activités physiques : Course à pied | — | — | 2,5 / 1 | provisoire | — |
| `duree>ff_tibia` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 1,2 | provisoire | — |
| `apparition>ff_tibia` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 1,5 ; Graduel 3 | provisoire | — |
| `localisation.tibia_med>ff_tibia` | Où est la douleur : Bord interne du tibia, tiers inférieur (diffuse) | — | — | 2 / 0,8 | provisoire | — |
| `localisation.tibia_focal>ff_tibia` | Où est la douleur : Point précis sur le tibia ou le péroné | — | — | 6 / 0,4 | provisoire | — |
| `course_saut>ff_tibia` | Pire à la course ou au saut | — | — | 3 / 0,3 | provisoire | — |
| `effort_loge>ff_tibia` | Douleur ou tension après un temps d'effort fixe, qui cède au repos | — | — | 1,2 / 0,9 | provisoire | — |
| `marche>ff_tibia` | Pire à la marche | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>ff_tibia` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 ; Constante 1,2 | provisoire | — |
| `nocturne>ff_tibia` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `saut_uni>ff_tibia` | Saut unipodal | — | — | Douloureux 1,82 ; Impossible 1,82 ; Normal 0,02 | verifie | Hoenig et coll., 2022, Nat Rev Dis Primers : test du saut, Se 100 %, Sp 45 % (RV calculés, Se plafonnée à 99 %) |
| `p_tibia_med>ff_tibia` | Bord médial du tibia (diffus) | — | — | 1,5 / 0,8 | provisoire | — |
| `p_tibia_focal>ff_tibia` | Point osseux précis du tibia ou de la fibula | — | — | 6 / 0,4 | provisoire | — |

Conduite :
- Investigation : douleur focale à l'impact. Radiographie d'abord (souvent normale pendant 2–3 sem ; jusqu'à 85 % manquées) ; IRM d'emblée si site à haut risque suspecté. Bas risque : tibia postéro-médial, fibula. Haut risque : corticale antérieure du tibia (« ligne noire »), malléole médiale. Dépister un déficit énergétique relatif (REDs), une aménorrhée ; doser la 25(OH)D. — *Schroeder et coll., 2024, American Family Physician ; Burrus et coll., 2015, American Journal of Sports Medicine ; George et coll., 2024, Sports Medicine*
- Traitement : bas risque : décharge au niveau qui supprime la douleur (botte ou béquilles si la marche est douloureuse) pendant 2–6 sem, entraînement croisé, reprise par paliers de 1–2 sem sans douleur ; retour complet en 8–16 sem (environ 6 sem pour un grade 1 à l'IRM, 14 sem pour un grade 4). Limiter les AINS. Corriger une carence en vitamine D (viser ≥ 50–75 nmol/L) et assurer l'apport en calcium. — *Schroeder et coll., 2024, American Family Physician ; Burrus et coll., 2015, American Journal of Sports Medicine ; George et coll., 2024, Sports Medicine*
- Suivi : 2–3 sem, puis aux 4 sem ; récidive chez environ 1 patient sur 5. — *Schroeder et coll., 2024, American Family Physician ; Burrus et coll., 2015, American Journal of Sports Medicine ; George et coll., 2024, Sports Medicine*
- Retour / référence : site à haut risque, trait complet ou échec → médecine du sport ou orthopédie. — *Schroeder et coll., 2024, American Family Physician ; Burrus et coll., 2015, American Journal of Sports Medicine ; George et coll., 2024, Sports Medicine*

## Syndrome compartimental chronique d'effort

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 2 %, 30 ans 2 %, 45 ans 1 %, 60 ans 0 %.

Repères publiés : 27–34 % des douleurs de jambe d'effort en séries sportives (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>loge` | Cheville atteinte | — | — | Les deux 2,5 | provisoire | — |
| `sport.aucun>loge` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.course>loge` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `duree>loge` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>loge` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,1 ; Graduel 2,5 | provisoire | — |
| `localisation.tibia_med>loge` | Où est la douleur : Bord interne du tibia, tiers inférieur (diffuse) | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.mollet>loge` | Où est la douleur : Mollet | — | — | 2 / 0,8 | provisoire | — |
| `course_saut>loge` | Pire à la course ou au saut | — | — | 2 / 0,5 | provisoire | — |
| `effort_loge>loge` | Douleur ou tension après un temps d'effort fixe, qui cède au repos | — | — | 8 / 0,2 | provisoire | — |
| `enflure>loge` | Enflure de la cheville | — | — | 0,4 / 1,1 | provisoire | — |
| `paresthesies>loge` | Engourdissements ou brûlure à la plante du pied | — | — | 2 / 0,9 | provisoire | — |

Conduite :
- Investigation : douleur et tension d'une loge apparaissant à un effort reproductible et cédant en quelques minutes ; examen normal au repos. Confirmation par pressions intracompartimentales (critères de Pedowitz : ≥ 15 mmHg au repos, ≥ 30 à 1 min, ≥ 20 à 5 min ; validité débattue). Exclure un piège de l'artère poplitée (pouls diminués en dorsiflexion passive ou flexion plantaire active, indice de pression à l'effort) et une fracture de stress. — *Vogels et coll., 2022, Sports Medicine ; Vogels et coll., 2026, British Medical Bulletin (PMID 42478572) ; Edwards et coll., 2005, American Journal of Sports Medicine ; Stahel et coll., 2026, Journal of Trauma and Acute Care Surgery (PMID 42704783) ; Aurelia et coll., , Chapter 73.*
- Traitement : rééducation de la foulée (attaque par l'avant-pied, cadence élevée, 6 sem ; petite série non contrôlée), réduction de la charge. — *Vogels et coll., 2022, Sports Medicine ; Vogels et coll., 2026, British Medical Bulletin (PMID 42478572) ; Edwards et coll., 2005, American Journal of Sports Medicine ; Stahel et coll., 2026, Journal of Trauma and Acute Care Surgery (PMID 42704783) ; Aurelia et coll., , Chapter 73.*
- Suivi : 6–8 sem. — *Vogels et coll., 2022, Sports Medicine ; Vogels et coll., 2026, British Medical Bulletin (PMID 42478572) ; Edwards et coll., 2005, American Journal of Sports Medicine ; Stahel et coll., 2026, Journal of Trauma and Acute Care Surgery (PMID 42704783) ; Aurelia et coll., , Chapter 73.*
- Retour / référence : médecine du sport pour la mesure des pressions ; fasciotomie si échec (satisfaction d'environ 85 %, retour au niveau antérieur inconstant). Douleur persistante au repos avec loge tendue → urgence. — *Vogels et coll., 2022, Sports Medicine ; Vogels et coll., 2026, British Medical Bulletin (PMID 42478572) ; Edwards et coll., 2005, American Journal of Sports Medicine ; Stahel et coll., 2026, Journal of Trauma and Acute Care Surgery (PMID 42704783) ; Aurelia et coll., , Chapter 73.*

## Lésion musculaire du mollet (tennis leg)

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 1 %, 40 ans 3 %, 55 ans 3 %, 70 ans 2 % ; homme ×1,3, femme ×0,75.

Repères publiés : 13 % des lésions musculaires au football professionnel ; 15 % des blessures du coureur amateur (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>mollet` | Cheville atteinte | — | — | Les deux 0,2 | provisoire | — |
| `sport.course>mollet` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `sport.raquette>mollet` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 2 / 1 | provisoire | — |
| `duree>mollet` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 1,3 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>mollet` | Mode d'apparition | — | — | Subit, avec un traumatisme 2,5 ; Subit, sans traumatisme 3 ; Graduel 0,3 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>mollet` | Mécanisme | — | — | Poussée ou départ explosif 5 | provisoire | — |
| `coup_baton>mollet` | Sensation de coup de bâton ou de pop derrière la cheville ou au mollet | — | — | 4 / 0,5 | provisoire | — |
| `localisation.achille_corps>mollet` | Où est la douleur : Tendon d'Achille, 2 à 6 cm au-dessus du talon | — | — | 0,8 / 1 | provisoire | — |
| `localisation.mollet>mollet` | Où est la douleur : Mollet | — | — | 8 / 0,3 | provisoire | — |
| `pointes>mollet` | Pire en montant sur la pointe des pieds | — | — | 2 / 0,6 | provisoire | — |
| `pointe_uni>mollet` | Montée sur pointe unipodale | — | — | Douloureuse 2 | provisoire | — |
| `p_mollet>mollet` | Mollet | — | — | 6 / 0,3 | provisoire | — |
| `rrom_fp>mollet` | Flexion plantaire résistée | — | — | 2 / 0,6 | provisoire | — |

Conduite :
- Investigation : douleur aiguë du chef médial du gastrocnémien, genou en extension. Test de Thompson négatif et tendon continu (sinon fiche 5). Échographie si doute ; Doppler si thrombose suspectée (thrombose isolée dans environ 10 % des tableaux cliniques) ; ne pas anticoaguler sans confirmation. — *Delgado et coll., 2002, Radiology (PMID 12091669) ; Bright et coll., 2017, Sports Health*
- Traitement : protection relative, appui toléré, mise en charge précoce (isométrique, puis isotonique dès les premiers jours : retour au sport environ 3 sem plus tôt) ; éviter l'immobilisation prolongée. — *Delgado et coll., 2002, Radiology (PMID 12091669) ; Bright et coll., 2017, Sports Health*
- Suivi : 1–2 sem. Retour au sport : grade 1 en 1–3 sem, grade 2 en 4–8 sem, grade 3 en plus de 6 sem. — *Delgado et coll., 2002, Radiology (PMID 12091669) ; Bright et coll., 2017, Sports Health*
- Retour / référence : mollet tendu avec douleur disproportionnée → urgence (loge aiguë) ; doute sur une rupture du tendon d'Achille. — *Delgado et coll., 2002, Radiology (PMID 12091669) ; Bright et coll., 2017, Sports Health*

## Maladie de Sever (apophysite calcanéenne)

Probabilité de départ (provisoire) : 9 ans 15 %, 11 ans 12 %, 12 ans 8 %, 13 ans 5 %, 14 ans 2 %, 16 ans 0 %, 18 ans 0 % ; homme ×1,4, femme ×0,7.

Repères publiés : 3,7/1 000 enfants de 6–17 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>sever` | Cheville atteinte | — | — | Les deux 1,8 | provisoire | — |
| `sport.pivot>sever` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `duree>sever` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 | provisoire | — |
| `apparition>sever` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2,5 | provisoire | — |
| `localisation.achille_ins>sever` | Où est la douleur : Insertion du tendon d'Achille (arrière du talon) | — | — | 3 / 0,6 | provisoire | — |
| `course_saut>sever` | Pire à la course ou au saut | — | — | 3 / 0,4 | provisoire | — |
| `saut_uni>sever` | Saut unipodal | — | — | Douloureux 2 | provisoire | — |
| `p_achille_ins>sever` | Insertion du tendon d'Achille | — | — | 1,5 / 0,9 | provisoire | — |
| `p_calcaneum>sever` | Calcanéus (compression latérale) | — | — | 5 / 0,3 | provisoire | — |

Conduite :
- Investigation : clinique, 8–15 ans : douleur à la compression médio-latérale du talon (sensibilité 97 %) et à l'appui unipodal sur le talon ; bilatérale dans environ 60 %. Radiographie seulement si tableau atypique, douleur nocturne, fièvre ou échec après 8 sem. — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*
- Traitement : activité selon la douleur (pas d'arrêt du sport dans les formes légères), talonnette ou coque talonnière (soulagement plus rapide à 1–2 mois ; à 3 mois, résultats équivalents à l'observation et à la physiothérapie), étirements du mollet, glace, ibuprofène PRN. Orthèses sur mesure non supérieures. Formes rebelles (environ 10 %) : botte de marche quelques semaines. — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*
- Suivi : 6–8 sem ; guérison moyenne en 2 mois environ, récidives possibles jusqu'à la fusion (15–16 ans). — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*
- Retour / référence : doute diagnostique ou échec. — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*

## Dysfonction du tibial postérieur

Probabilité de départ (provisoire) : 12 ans 0 %, 35 ans 1 %, 50 ans 3 %, 65 ans 7 %, 80 ans 8 % ; femme ×1,8, homme ×0,55.

Repères publiés : 3,3–10 % (données faibles) ; environ 10 % chez le sujet âgé (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>tibpost` | Cheville atteinte | — | — | Les deux 1,3 | provisoire | — |
| `travail>tibpost` | Occupation | — | — | Travail physique (charges, manutention) 1,1 | provisoire | — |
| `sport.marche>tibpost` | Activités physiques : Marche ou randonnée | — | — | 1,2 / 1 | provisoire | — |
| `obesite>tibpost` | Obésité (IMC 30 ou plus) | — | — | 2 / 0,8 | provisoire | — |
| `duree>tibpost` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>tibpost` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2 ; Insidieux 2,5 | provisoire | — |
| `localisation.mediale>tibpost` | Où est la douleur : Médiale (malléole interne, rétromalléolaire) | — | — | 4 / 0,4 | provisoire | — |
| `marche>tibpost` | Pire à la marche | — | — | 1,8 / 0,6 | provisoire | — |
| `pointes>tibpost` | Pire en montant sur la pointe des pieds | — | — | 2 / 0,6 | provisoire | — |
| `moment>tibpost` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `enflure>tibpost` | Enflure de la cheville | — | — | 1,3 / 0,9 | provisoire | — |
| `arches>tibpost` | Arches plantaires | — | — | Affaissées 3 | provisoire | — |
| `talons_pointes>tibpost` | Marche sur talons et pointes | — | — | Difficile ou douloureuse 2 | provisoire | — |
| `pointe_uni>tibpost` | Montée sur pointe unipodale | — | — | Douloureuse 2 ; Impossible ou sans inversion du talon 4 | provisoire | — |
| `trop_orteils>tibpost` | Signe des « trop d'orteils » | — | — | 4 / 0,35 | provisoire | — |
| `p_tib_post>tibpost` | Tendon tibial postérieur (rétromalléolaire médial) | — | — | 4 / 0,4 | provisoire | — |
| `godet_tp>tibpost` | Œdème rétromalléolaire médial (godet) | 86 % | 100 % | 86 / 0,14 | verifie | DeOrio et coll., 2011, Foot Ankle Int (IRM) : Se 86 %, Sp 100 % (plafonnée à 99 %) |
| `prom_eversion>tibpost` | Éversion passive | — | — | Limitée avec douleur 1,3 | provisoire | — |
| `rrom_inversion>tibpost` | Inversion résistée | — | — | 3 / 0,5 | provisoire | — |

Conduite :
- Investigation : douleur et enflure rétro-malléolaires médiales, affaissement de l'arche, signe « trop d'orteils », élévation unipodale sur la pointe impossible ou douloureuse (normale : 5–10 répétitions) ; ces tests sont négatifs dans 20–35 % des cas confirmés. Radiographies en charge des pieds (face, profil) et de la cheville (face) ; IRM non requise. Stades : I ténosynovite sans déformation, II pied plat souple, III déformation rigide, IV atteinte de la cheville. — *Gluck et coll., 2010, American Journal of Sports Medicine ; Piraino et coll., 2020, Journal of Foot and Ankle Surgery ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Deu et coll., 2022, American Family Physician*
- Traitement : stades I–II : orthèse plantaire à soutien d'arche ou orthèse cheville-pied, étirement du mollet et renforcement excentrique pendant environ 4 mois (succès 83 %, 11 % opérés) ; douleur aiguë sévère : botte de marche 4–6 sem d'abord. Pas d'infiltration de corticoïde. — *Gluck et coll., 2010, American Journal of Sports Medicine ; Piraino et coll., 2020, Journal of Foot and Ankle Surgery ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Deu et coll., 2022, American Family Physician*
- Suivi : 6–8 sem, puis 3–4 mois. — *Gluck et coll., 2010, American Journal of Sports Medicine ; Piraino et coll., 2020, Journal of Foot and Ankle Surgery ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Deu et coll., 2022, American Family Physician*
- Retour / référence : déformation rigide ou échec à 3–6 mois → orthopédie. — *Gluck et coll., 2010, American Journal of Sports Medicine ; Piraino et coll., 2020, Journal of Foot and Ankle Surgery ; Millar et coll., 2026, Current Reviews in Musculoskeletal Medicine ; Deu et coll., 2022, American Family Physician*

## Arthrose de la cheville

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 50 ans 3 %, 65 ans 6 %, 80 ans 8 %.

Repères publiés : Symptomatique chez 3,4 % après 50 ans, souvent post-traumatique (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>arthrose` | Cheville atteinte | — | — | Les deux 1,2 | provisoire | — |
| `travail>arthrose` | Occupation | — | — | Travail physique (charges, manutention) 1,1 | provisoire | — |
| `sport.marche>arthrose` | Activités physiques : Marche ou randonnée | — | — | 1,1 / 1 | provisoire | — |
| `atcd_entorses>arthrose` | Entorses antérieures de cette cheville | — | — | 1,8 / 0,9 | provisoire | — |
| `obesite>arthrose` | Obésité (IMC 30 ou plus) | — | — | 1,3 / 0,9 | provisoire | — |
| `duree>arthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>arthrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 3 | provisoire | — |
| `localisation.anterieure>arthrose` | Où est la douleur : Antérieure (pli de la cheville) | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.diffuse>arthrose` | Où est la douleur : Diffuse, toute l'articulation | — | — | 2 / 0,8 | provisoire | — |
| `type_douleur>arthrose` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `marche>arthrose` | Pire à la marche | — | — | 1,8 / 0,6 | provisoire | — |
| `descente>arthrose` | Pire accroupi, en descente ou en dorsiflexion | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>arthrose` | Horaire | — | — | Pire le matin, mieux en bougeant 1,2 | provisoire | — |
| `raideur>arthrose` | Raideur matinale | — | — | Moins de 30 minutes 1,5 | provisoire | — |
| `blocage>arthrose` | Blocages ou accrochages | — | — | 1,3 / 0,95 | provisoire | — |
| `enflure>arthrose` | Enflure de la cheville | — | — | 1,3 / 0,9 | provisoire | — |
| `talons_pointes>arthrose` | Marche sur talons et pointes | — | — | Difficile ou douloureuse 1,3 | provisoire | — |
| `p_interligne>arthrose` | Interligne antérieur de la cheville | — | — | 1,5 / 0,8 | provisoire | — |
| `arom_df>arthrose` | Dorsiflexion active | — | — | Complète et indolore 0,6 ; Limitée avec douleur 1,5 ; Limitée par raideur 3 | provisoire | — |
| `arom_fp>arthrose` | Flexion plantaire active | — | — | Limitée par raideur 2 | provisoire | — |
| `prom_inversion>arthrose` | Inversion passive | — | — | Limitée par raideur 1,5 | provisoire | — |
| `prom_eversion>arthrose` | Éversion passive | — | — | Limitée par raideur 1,5 | provisoire | — |

Conduite :
- Investigation : post-traumatique dans 75–80 % des cas ; radiographies en charge (face, mortaise, profil). — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Traitement : peu de données propres à la cheville : éducation, perte de poids, canne controlatérale (décharge d'environ 25 %), chaussure à semelle à bascule, orthèse stabilisatrice, analgésie de base. Infiltration de corticoïde : effet d'environ 4 sem. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Suivi : 3 mois. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Retour / référence : douleur invalidante malgré le traitement → orthopédie (arthrodèse et prothèse : résultats semblables à 1 an dans l'essai TARVA). — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*

## Entorse de la syndesmose (entorse haute)

Probabilité de départ (provisoire) : 12 ans 2 %, 16 ans 3 %, 25 ans 3 %, 45 ans 2 %, 70 ans 1 % ; homme ×1,2, femme ×0,85.

Repères publiés : 1–11 % des entorses, jusqu'à 25 % chez l'athlète ; 24 % à 16–18 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>syndesmose` | Cheville atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.aucun>syndesmose` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.pivot>syndesmose` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.contact>syndesmose` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2,5 / 1 | provisoire | — |
| `sport.glisse>syndesmose` | Activités physiques : Ski ou planche | — | — | 1,5 / 1 | provisoire | — |
| `duree>syndesmose` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 1,3 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>syndesmose` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>syndesmose` | Mécanisme | — | — | Inversion (cheville tournée vers l'intérieur) 0,5 ; Dorsiflexion forcée 1,5 ; Poussée ou départ explosif 0,2 ; Chute de hauteur ou réception sur le pied 1,2 | provisoire | — |
| `mecanisme>syndesmose` | Mécanisme | — | — | Éversion ou rotation externe du pied 3,47 | verifie | Baltes et coll., 2022, KSSTA (PMID 35508553) : mécanisme en éversion (150 athlètes), RV+ 3,47 (1,55–7,77) |
| `oedeme_rapide>syndesmose` | Œdème rapide et important | — | — | 1,3 / 0,9 | provisoire | — |
| `disproportion>syndesmose` | Douleur disproportionnée par rapport à la blessure | — | — | 3,05 / — | verifie | Sman et coll., 2015, BJSM (PMID 24255766) : Sp 79 %, RV+ 3,05 (1,68–5,55) |
| `localisation.anterieure>syndesmose` | Où est la douleur : Antérieure (pli de la cheville) | — | — | 2 / 0,7 | provisoire | — |
| `localisation.haute>syndesmose` | Où est la douleur : Haute, au-dessus de la cheville, entre tibia et péroné | — | — | 4 / 0,5 | provisoire | — |
| `enflure>syndesmose` | Enflure de la cheville | — | — | 1,5 / 0,7 | provisoire | — |
| `demarche>syndesmose` | Démarche | — | — | Normale 0,6 ; Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `appui_uni>syndesmose` | Appui unipodal | — | — | Instable ou douloureux 1,5 | provisoire | — |
| `saut_uni>syndesmose` | Saut unipodal | — | — | Normal 0,37 | verifie | Sman et coll., 2015, BJSM (PMID 24255766) : saut unipodal impossible, Se 89 % ; possible, RV− 0,37 (0,13–1,03) |
| `ex_ecchymose>syndesmose` | Hématome ou ecchymose | — | — | 1,3 / 0,95 | provisoire | — |
| `p_syndesmose>syndesmose` | Syndesmose (tibio-fibulaire antéro-inférieure) | 92 % | 29 % | 1,3 / 0,28 | verifie | Netterström-Wedin et coll., 2021, Phys Ther Sport (PMID 33774464) |
| `p_perone_prox>syndesmose` | Fibula proximale | — | — | 1,5 / 0,95 | provisoire | — |
| `squeeze>syndesmose` | Squeeze test | 32 % | 85 % | 2,13 / 0,8 | verifie | Netterström-Wedin et coll., 2021, Phys Ther Sport (PMID 33774464) |
| `rot_ext>syndesmose` | Rotation externe forcée (Kleiger) | 70 % | 78 % | 3,18 / 0,38 | verifie | Netterström-Wedin et coll., 2021, Phys Ther Sport (PMID 33774464) |

Conduite :
- Investigation : mécanisme en rotation externe ou éversion ; douleur au-dessus de l'interligne. Sensibilité de la syndesmose (sensibilité 92 %), test de compression du mollet (spécificité 88 %), rotation externe en dorsiflexion, saut unipodal impossible ; aucun test ne suffit seul. Radiographies comparatives en charge (face, mortaise) ; jambe entière si la fibula proximale est sensible. IRM si doute. — *Sman et coll., 2015, British Journal of Sports Medicine (PMID 24255766) ; Wu et coll., 2025, American Family Physician ; Vopat et coll., 2017, Current Reviews in Musculoskeletal Medicine ; D'Hooghe et coll., 2017, Foot & Ankle International*
- Traitement : lésion stable (sans diastasis, deltoïde intact) : botte de marche avec appui protégé 1–3 sem (jusqu'à 6 sem si sévère), puis réadaptation (consensus, aucun essai). — *Sman et coll., 2015, British Journal of Sports Medicine (PMID 24255766) ; Wu et coll., 2025, American Family Physician ; Vopat et coll., 2017, Current Reviews in Musculoskeletal Medicine ; D'Hooghe et coll., 2017, Foot & Ankle International*
- Suivi : 1–2 sem ; retour au sport moyen en 6–7 sem. — *Sman et coll., 2015, British Journal of Sports Medicine (PMID 24255766) ; Wu et coll., 2025, American Family Physician ; Vopat et coll., 2017, Current Reviews in Musculoskeletal Medicine ; D'Hooghe et coll., 2017, Foot & Ankle International*
- Retour / référence : diastasis (> 2 mm), lésion du deltoïde ou fracture associée → orthopédie. — *Sman et coll., 2015, British Journal of Sports Medicine (PMID 24255766) ; Wu et coll., 2025, American Family Physician ; Vopat et coll., 2017, Current Reviews in Musculoskeletal Medicine ; D'Hooghe et coll., 2017, Foot & Ankle International*

## Entorse médiale (ligament deltoïde) ou fracture de Maisonneuve

Probabilité de départ (provisoire) : 12 ans 1 %, 25 ans 1 %, 50 ans 1 %, 70 ans 1 %.

Repères publiés : 0,77/10 000 expositions chez l'athlète ; pas d'autre donnée (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>deltoide` | Cheville atteinte | — | — | Les deux 0,2 | provisoire | — |
| `sport.contact>deltoide` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `duree>deltoide` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>deltoide` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>deltoide` | Mécanisme | — | — | Inversion (cheville tournée vers l'intérieur) 0,3 ; Éversion ou rotation externe du pied 3 | provisoire | — |
| `localisation.mediale>deltoide` | Où est la douleur : Médiale (malléole interne, rétromalléolaire) | — | — | 4 / 0,5 | provisoire | — |
| `p_mall_med>deltoide` | Malléole médiale : bord postérieur ou pointe (6 cm) | — | — | 2 / 0,8 | provisoire | — |
| `p_deltoide>deltoide` | Ligament deltoïde | — | — | 4 / 0,3 | provisoire | — |
| `p_perone_prox>deltoide` | Fibula proximale | — | — | 2 / 0,9 | provisoire | — |
| `prom_eversion>deltoide` | Éversion passive | — | — | Limitée avec douleur 2 | provisoire | — |
| `rot_ext>deltoide` | Rotation externe forcée (Kleiger) | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : rare isolément (3–4 % des lésions ligamentaires) → rechercher une fracture ou une atteinte de la syndesmose. Radiographies de la cheville, et de la jambe entière si sensibilité de la fibula proximale, fracture isolée de la malléole médiale ou élargissement isolé de l'espace clair médial (le trait fibulaire est invisible de face dans 25 % des fractures de Maisonneuve). — *Wu et coll., 2025, American Family Physician*
- Traitement : lésion isolée à mortaise congruente : botte ou orthèse avec appui toléré 4–6 sem (faible niveau de preuve). — *Wu et coll., 2025, American Family Physician*
- Suivi : 1–2 sem, avec radiographie en charge. — *Wu et coll., 2025, American Family Physician*
- Retour / référence : fracture de Maisonneuve, élargissement de l'espace clair médial ou atteinte de la syndesmose → orthopédie le jour même. — *Wu et coll., 2025, American Family Physician*

## Tendinopathie, déchirure ou luxation des fibulaires

Probabilité de départ (provisoire) : 12 ans 1 %, 25 ans 2 %, 45 ans 3 %, 65 ans 2 %.

Repères publiés : Pas de donnée populationnelle (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>fibulaires` | Cheville atteinte | — | — | Les deux 0,4 | provisoire | — |
| `sport.course>fibulaires` | Activités physiques : Course à pied | — | — | 1,3 / 1 | provisoire | — |
| `sport.danse>fibulaires` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `atcd_entorses>fibulaires` | Entorses antérieures de cette cheville | — | — | 1,5 / 0,9 | provisoire | — |
| `premier>fibulaires` | Premier épisode | — | — | 0,8 / 1,3 | provisoire | — |
| `duree>fibulaires` | Depuis combien de temps | — | — | Plus de 3 mois 1,5 | provisoire | — |
| `apparition>fibulaires` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 ; Graduel 2 | provisoire | — |
| `mecanisme>fibulaires` | Mécanisme | — | — | Inversion (cheville tournée vers l'intérieur) 1,5 ; Dorsiflexion forcée 2 | provisoire | — |
| `localisation.laterale>fibulaires` | Où est la douleur : Latérale, devant ou sous la malléole externe | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.retro_lat>fibulaires` | Où est la douleur : Derrière la malléole externe (tendons fibulaires) | — | — | 6 / 0,5 | provisoire | — |
| `derobade>fibulaires` | Entorses à répétition ou cheville qui cède | — | — | 1,5 / 0,9 | provisoire | — |
| `ressaut>fibulaires` | Claquement derrière la malléole externe | — | — | 6 / 0,7 | provisoire | — |
| `arches>fibulaires` | Arches plantaires | — | — | Creuses 1,5 | provisoire | — |
| `p_fibulaires>fibulaires` | Tendons fibulaires (rétromalléolaire latéral) | — | — | 5 / 0,3 | provisoire | — |
| `prom_inversion>fibulaires` | Inversion passive | — | — | Limitée avec douleur 1,3 | provisoire | — |
| `rrom_eversion>fibulaires` | Éversion résistée | — | — | 3 / 0,5 | provisoire | — |

Conduite :
- Investigation : douleur rétro-malléolaire latérale à l'éversion contrariée ; ressaut à la circumduction (luxation) ; varus de l'arrière-pied favorisant. Échographie dynamique (la meilleure pour la subluxation) ; IRM si déchirure suspectée. — *Deu et coll., 2022, American Family Physician*
- Traitement : tendinopathie : modification d'activité, coin latéral, botte brève en phase aiguë, mise en charge progressive. Infiltration de la gaine : données contradictoires, à éviter en première ligne. — *Deu et coll., 2022, American Family Physician*
- Suivi : 6 sem. — *Deu et coll., 2022, American Family Physician*
- Retour / référence : luxation ou subluxation (échec du traitement non chirurgical dans plus de la moitié des cas), déchirure complète, appui impossible au-delà de 1–2 sem, échec à 3–6 mois → orthopédie. — *Deu et coll., 2022, American Family Physician*

## Conflit antérieur ou postérieur de la cheville

Probabilité de départ (provisoire) : 12 ans 1 %, 20 ans 2 %, 35 ans 2 %, 55 ans 1 %.

Repères publiés : Conflit antéro-latéral dans environ 30 % des instabilités chroniques (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>conflit` | Cheville atteinte | — | — | Les deux 0,5 | provisoire | — |
| `sport.pivot>conflit` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,3 / 1 | provisoire | — |
| `sport.danse>conflit` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 2 / 1 | provisoire | — |
| `atcd_entorses>conflit` | Entorses antérieures de cette cheville | — | — | 2 / 0,8 | provisoire | — |
| `duree>conflit` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>conflit` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2 ; Insidieux 1,5 | provisoire | — |
| `mecanisme>conflit` | Mécanisme | — | — | Dorsiflexion forcée 1,2 | provisoire | — |
| `localisation.laterale>conflit` | Où est la douleur : Latérale, devant ou sous la malléole externe | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.anterieure>conflit` | Où est la douleur : Antérieure (pli de la cheville) | — | — | 3 / 0,6 | provisoire | — |
| `descente>conflit` | Pire accroupi, en descente ou en dorsiflexion | — | — | 3 / 0,5 | provisoire | — |
| `blocage>conflit` | Blocages ou accrochages | — | — | 1,5 / 0,9 | provisoire | — |
| `p_interligne>conflit` | Interligne antérieur de la cheville | — | — | 3 / 0,5 | provisoire | — |
| `arom_df>conflit` | Dorsiflexion active | — | — | Limitée avec douleur 2 ; Limitée par raideur 1,5 | provisoire | — |
| `arom_fp>conflit` | Flexion plantaire active | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Investigation : antérieur : douleur en dorsiflexion ou à l'accroupissement après des entorses ; profil et oblique antéro-médiale (ostéophytes). Postérieur : douleur en flexion plantaire forcée (danse, football) ; profil (os trigone) ; IRM si doute. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Traitement : modification d'activité, physiothérapie ; infiltration échoguidée en option (conflit postérieur : retour à l'activité en 3–4 sem, environ 15 % opérés ensuite). — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Suivi : 6–8 sem. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Retour / référence : échec à 3–6 mois → orthopédie (arthroscopie). — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*

## Lésion ostéochondrale du talus

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 2 %, 30 ans 2 %, 50 ans 1 %.

Repères publiés : Suit 2–6,5 % des entorses ; 4,6/100 000 chez l'enfant (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>lot` | Cheville atteinte | — | — | Les deux 0,4 | provisoire | — |
| `sport.pivot>lot` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,3 / 1 | provisoire | — |
| `atcd_entorses>lot` | Entorses antérieures de cette cheville | — | — | 1,5 / 0,9 | provisoire | — |
| `duree>lot` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 ; 6 semaines à 3 mois 1,8 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>lot` | Mode d'apparition | — | — | Subit, avec un traumatisme 2 ; Insidieux 1,5 | provisoire | — |
| `mecanisme>lot` | Mécanisme | — | — | Inversion (cheville tournée vers l'intérieur) 1,3 ; Chute de hauteur ou réception sur le pied 1,3 | provisoire | — |
| `localisation.laterale>lot` | Où est la douleur : Latérale, devant ou sous la malléole externe | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.anterieure>lot` | Où est la douleur : Antérieure (pli de la cheville) | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.diffuse>lot` | Où est la douleur : Diffuse, toute l'articulation | — | — | 1,5 / 0,9 | provisoire | — |
| `type_douleur>lot` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `course_saut>lot` | Pire à la course ou au saut | — | — | 1,3 / 0,9 | provisoire | — |
| `derobade>lot` | Entorses à répétition ou cheville qui cède | — | — | 1,3 / 0,95 | provisoire | — |
| `blocage>lot` | Blocages ou accrochages | — | — | 3 / 0,8 | provisoire | — |
| `enflure>lot` | Enflure de la cheville | — | — | 1,3 / 0,9 | provisoire | — |
| `p_interligne>lot` | Interligne antérieur de la cheville | — | — | 1,5 / 0,9 | provisoire | — |
| `arom_df>lot` | Dorsiflexion active | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Investigation : douleur profonde, enflure ou accrochage persistant plus de 6 sem après une entorse ; radiographies (manquent environ 1 lésion sur 3), puis IRM ; TDM pour la taille. — *Gengatharan et coll., 2025, Journal of Foot and Ankle Surgery (PMID 39486788) ; Powers et coll., 2021, Arthroscopy (PMID 34863377)*
- Traitement : lésion aiguë non déplacée : immobilisation et appui protégé 4–6 sem, essai non chirurgical d'environ 3 mois (succès autour de 50 %). Enfant et adolescent : même approche ; guérison chez environ deux tiers dans une série, bien moins dans d'autres. — *Gengatharan et coll., 2025, Journal of Foot and Ankle Surgery (PMID 39486788) ; Powers et coll., 2021, Arthroscopy (PMID 34863377)*
- Suivi : 6 sem, puis 3 mois. — *Gengatharan et coll., 2025, Journal of Foot and Ankle Surgery (PMID 39486788) ; Powers et coll., 2021, Arthroscopy (PMID 34863377)*
- Retour / référence : fragment déplacé → orthopédie rapidement ; symptômes persistants à 3–6 mois → orthopédie. — *Gengatharan et coll., 2025, Journal of Foot and Ankle Surgery (PMID 39486788) ; Powers et coll., 2021, Arthroscopy (PMID 34863377)*

## Syndrome du tunnel tarsien

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 50 ans 1 %, 70 ans 1 %.

Repères publiés : 0,6 % dans les 2 ans après une entorse (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>tarsien` | Cheville atteinte | — | — | Les deux 1,2 | provisoire | — |
| `duree>tarsien` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>tarsien` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,5 ; Insidieux 2 | provisoire | — |
| `localisation.mediale>tarsien` | Où est la douleur : Médiale (malléole interne, rétromalléolaire) | — | — | 3 / 0,6 | provisoire | — |
| `localisation.plantaire>tarsien` | Où est la douleur : Plante du pied ou talon, avec engourdissements | — | — | 4 / 0,6 | provisoire | — |
| `type_douleur>tarsien` | Type de douleur | — | — | Brûlure 3 ; Choc électrique 3 | provisoire | — |
| `marche>tarsien` | Pire à la marche | — | — | 1,5 / 0,8 | provisoire | — |
| `nocturne>tarsien` | Douleur la nuit | — | — | 1,8 / 0,9 | provisoire | — |
| `paresthesies>tarsien` | Engourdissements ou brûlure à la plante du pied | — | — | 6 / 0,3 | provisoire | — |
| `arches>tarsien` | Arches plantaires | — | — | Affaissées 1,3 | provisoire | — |
| `p_tib_post>tarsien` | Tendon tibial postérieur (rétromalléolaire médial) | — | — | 1,5 / 0,9 | provisoire | — |
| `tinel_tarsien>tarsien` | Tinel au tunnel tarsien | — | — | 4 / 0,5 | provisoire | — |

Conduite :
- Investigation : douleur ou paresthésies plantaires, signe de Tinel rétro-malléolaire médial. Électrodiagnostic peu sensible (environ 50 %) : un résultat négatif n'exclut pas. Cause identifiable dans jusqu'à 80 % → échographie ou IRM si masse suspectée. Exclure une radiculopathie S1 et une polyneuropathie †. — *Boers et coll., 2026, JBJS Reviews ; Rungprai et coll., 2024, Foot & Ankle International ; Morancie et coll., 2025, American Family Physician*
- Traitement : orthèse, modification d'activité, AINS ; infiltration : données limitées. — *Boers et coll., 2026, JBJS Reviews ; Rungprai et coll., 2024, Foot & Ankle International ; Morancie et coll., 2025, American Family Physician*
- Suivi : 6–8 sem. — *Boers et coll., 2026, JBJS Reviews ; Rungprai et coll., 2024, Foot & Ankle International ; Morancie et coll., 2025, American Family Physician*
- Retour / référence : masse ou déficit moteur → référence d'emblée ; chirurgie après environ 12 mois d'échec (consensus). — *Boers et coll., 2026, JBJS Reviews ; Rungprai et coll., 2024, Foot & Ankle International ; Morancie et coll., 2025, American Family Physician*

## Goutte ou arthrite à pyrophosphate de la cheville

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 45 ans 1 %, 60 ans 3 %, 80 ans 4 % ; homme ×1,5, femme ×0,7.

Repères publiés : Cheville atteinte chez 18–60 % des goutteux (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>cristaux` | Cheville atteinte | — | — | Les deux 0,8 | provisoire | — |
| `obesite>cristaux` | Obésité (IMC 30 ou plus) | — | — | 1,5 / 0,9 | provisoire | — |
| `atcd_rhumato.uveite>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.synovite>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.goutte>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 6 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 6 / 1 | provisoire | — |
| `atcd_rhumato.par>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.spa>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 1 / 1 | provisoire | — |
| `premier>cristaux` | Premier épisode | — | — | 0,5 / 1,8 | provisoire | — |
| `duree>cristaux` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 0,6 ; 6 semaines à 3 mois 0,4 ; Plus de 3 mois 0,3 | provisoire | — |
| `apparition>cristaux` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 5 | provisoire | — |
| `localisation.diffuse>cristaux` | Où est la douleur : Diffuse, toute l'articulation | — | — | 2,5 / 0,7 | provisoire | — |
| `type_douleur>cristaux` | Type de douleur | — | — | Lancinante, pulsatile 1,5 | provisoire | — |
| `moment>cristaux` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `nocturne>cristaux` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `raideur>cristaux` | Raideur matinale | — | — | 30 minutes ou plus 1,2 | provisoire | — |
| `enflure>cristaux` | Enflure de la cheville | — | — | 3 / 0,3 | provisoire | — |
| `rougeur_chaleur>cristaux` | Rougeur ou chaleur | — | — | 5 / 0,5 | provisoire | — |
| `autres_articulations>cristaux` | Douleur ou enflure d'autres articulations | — | — | 1,5 / 0,9 | provisoire | — |
| `fievre>cristaux` | Fièvre ou frissons | — | — | 1,4 / 0,95 | provisoire | — |
| `demarche>cristaux` | Démarche | — | — | Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `ex_chaleur>cristaux` | Rougeur ou chaleur | — | — | 5 / 0,4 | provisoire | — |

Conduite :
- Investigation : monoarthrite sans diagnostic établi : ponction (cristaux, Gram, culture, décompte) ; la présence de cristaux n'exclut pas l'infection ; ne pas ponctionner à travers une cellulite. Différentiel : cellulite, arthrite septique, pied de Charcot chez le diabétique neuropathique. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Traitement : crise : voir le bloc commun. Hypo-uricémiant : tophus, dommages radiographiques ou ≥ 2 crises/an (à envisager dès la première crise si insuffisance rénale de stade ≥ 3, urate > 535 µmol/L ou lithiases) ; allopurinol ≤ 100 mg/j au départ, cible < 360 µmol/L, prophylaxie pendant 3–6 mois. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Suivi : 48–72 h, puis 2–4 sem. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*
- Retour / référence : fièvre, immunosuppression ou doute d'infection → urgence. — *Metitiri et coll., 2017, Foot & Ankle International ; Kortekangas et coll., 2019, BMJ (PMID 30674451) ; Kearney et coll., 2021, BMJ (PMID 34226192) ; Douillet et coll., 2024, Lancet (PMID 38368901) ; Hoshino et coll., 2012, Foot & Ankle International*

## Fracture d'insuffisance (tibia distal, fibula, calcanéus)

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 0 %, 65 ans 1 %, 80 ans 2 %, 90 ans 3 % ; femme ×1,8, homme ×0,55.

Repères publiés : Sujet âgé ; pas d'incidence spécifique (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>insuff` | Cheville atteinte | — | — | Les deux 0,7 | provisoire | — |
| `duree>insuff` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 ; Plus de 3 mois 0,5 | provisoire | — |
| `apparition>insuff` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 3 | provisoire | — |
| `localisation.diffuse>insuff` | Où est la douleur : Diffuse, toute l'articulation | — | — | 1,5 / 0,9 | provisoire | — |
| `marche>insuff` | Pire à la marche | — | — | 2 / 0,7 | provisoire | — |
| `nocturne>insuff` | Douleur la nuit | — | — | 2,5 / 0,8 | provisoire | — |
| `demarche>insuff` | Démarche | — | — | Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `p_calcaneum>insuff` | Calcanéus (compression latérale) | — | — | 3 / 0,7 | provisoire | — |

Conduite :
- Investigation : douleur spontanée de la cheville ou du talon sans trauma, surtout chez la femme ménopausée ; sensibilité osseuse focale ; radiographies souvent normales au début (jusqu'à 2 mois pour le calcanéus) → IRM. — *Ito et coll., 2004, Clinical Orthopaedics and Related Research (PMID 15187856) ; Morrison et coll., 2024, Journal of the American College of Radiology*
- Traitement : appui protégé (botte, canne) 6–8 sem ; acétaminophène d'abord ; évaluation et traitement de l'ostéoporose (ostéodensitométrie, calcium, vitamine D). — *Ito et coll., 2004, Clinical Orthopaedics and Related Research (PMID 15187856) ; Morrison et coll., 2024, Journal of the American College of Radiology*
- Suivi : 4–6 sem. — *Ito et coll., 2004, Clinical Orthopaedics and Related Research (PMID 15187856) ; Morrison et coll., 2024, Journal of the American College of Radiology*
- Retour / référence : déplacement ou absence de consolidation → orthopédie. — *Ito et coll., 2004, Clinical Orthopaedics and Related Research (PMID 15187856) ; Morrison et coll., 2024, Journal of the American College of Radiology*

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j) ; diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID). Dans les lésions aiguës des tissus mous, AINS et acétaminophène soulagent de façon équivalente. Pas d'opioïdes pour une entorse.
- Analgésie de base (enfant) : ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j), premier choix ; l'ajout d'acétaminophène ou d'un opioïde n'améliore pas le soulagement des blessures musculosquelettiques ; acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) si AINS contre-indiqué.
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; éviter les AINS oraux en cas de maladie cardiovasculaire ou de fragilité ; prudence ≥ 65 ans (IPP ou coxib si risque digestif) ; limiter dans les fractures de stress.
- Règles d'Ottawa (cheville et médio-pied) :
- Thromboprophylaxie sous immobilisation du membre inférieur (adulte) : calculer le score TRiP(cast). Score < 7 : pas d'anticoagulant (risque à 3 mois < 1 % dans l'essai CASTING). Score ≥ 7 : héparine de bas poids moléculaire pendant l'immobilisation — énoxaparine 40 mg SC DIE (30 mg DIE si ClCr < 30 mL/min) ou daltéparine 5000 unités SC DIE. Le bénéfice chez les patients à score élevé reste incertain (2,7 % d'événements malgré le traitement dans CASTING ; aucun bénéfice de l'héparine systématique dans POT-CAST). Rupture du tendon d'Achille et fracture diaphysaire du tibia ou de la fibula comptent comme traumatismes à haut risque. Position de Thrombose Canada à vérifier.
- Infiltrations de corticoïde : jamais dans un tendon porteur (Achille, tibial postérieur) ; jamais avant d'avoir exclu une infection ; aviser les diabétiques d'une hausse transitoire de la glycémie.
- Crise de goutte : colchicine 1,2 mg, puis 0,6 mg 1 h plus tard (max 1,8 mg la première heure) ; 12 h après, 0,6 mg DIE–BID jusqu'à résolution. Avec un inhibiteur puissant du CYP3A4 (clarithromycine, azolés) : 0,6 mg puis 0,3 mg ; inhibiteur modéré (diltiazem, vérapamil) : 1,2 mg une fois ; inhibiteur de la P-gp (cyclosporine) : 0,6 mg une fois ; ne pas répéter avant 3 j. Contre-indiquée si insuffisance rénale ou hépatique avec l'un de ces inhibiteurs ; ne pas répéter avant 2 sem si ClCr < 30. Solutions de rechange : naproxène 500 mg BID avec IPP, ou prednisone 30–35 mg DIE pendant 5 j.
- Dosage de la charge : activité permise si douleur ≤ 3/10 et sans persistance après l'effort (jusqu'à 5/10 toléré dans la réadaptation du tendon d'Achille).
- Intervalles de suivi : fondés sur le consensus et l'usage, non sur des essais.

Pour tous :
- Enseignement : nature de l'atteinte, pronostic, autogestion
- Consignes de reconsultation : fièvre, cheville chaude et enflée, mollet enflé, pied froid, engourdissements, douleur nocturne
