# Douleur au pied : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs pied` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 306 (validés 0, vérifiés 4, à vérifier 4, provisoires 298).

## Fasciite plantaire (talalgie plantaire)

Probabilité de départ (provisoire) : 12 ans 2 %, 20 ans 6 %, 35 ans 15 %, 50 ans 20 %, 65 ans 15 %, 80 ans 10 %.

Repères publiés : 3,83/1 000 p-a en médecine générale, pic à 45–64 ans ; environ 10 % sur la vie ; 4,5–10 % des coureurs (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>fasciite` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>fasciite` | Pied atteint | — | — | Les deux 1,3 | provisoire | — |
| `travail>fasciite` | Occupation | — | — | Travail physique (charges, manutention) 1,3 ; Debout toute la journée (commerce, usine, soins) 1,5 | provisoire | — |
| `sport.marche>fasciite` | Activités physiques : Marche ou randonnée | — | — | 1,3 / 1 | provisoire | — |
| `sport.course>fasciite` | Activités physiques : Course à pied | — | — | 1,8 / 1 | provisoire | — |
| `obesite>fasciite` | Obésité (IMC 30 ou plus) | — | — | 1,8 / 0,8 | provisoire | — |
| `premier>fasciite` | Premier épisode | — | — | 1,2 / 0,8 | provisoire | — |
| `duree>fasciite` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>fasciite` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2,5 ; Insidieux 2 | provisoire | — |
| `localisation.talon_plantaire>fasciite` | Où est la douleur : Sous le talon | — | — | 8 / 0,1 | provisoire | — |
| `localisation.talon_post>fasciite` | Où est la douleur : Arrière ou côtés du talon | — | — | 0,5 / 1,1 | provisoire | — |
| `premiers_pas>fasciite` | Douleur aux premiers pas du matin ou après le repos | — | — | 4 / 0,2 | provisoire | — |
| `marche>fasciite` | Pire à la marche ou debout | — | — | 1,8 / 0,5 | provisoire | — |
| `course_saut>fasciite` | Pire à la course ou au saut | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>fasciite` | Horaire | — | — | Pire le matin, mieux en bougeant 2 | provisoire | — |
| `nocturne>fasciite` | Douleur la nuit | — | — | 0,6 / 1,1 | provisoire | — |
| `enflure>fasciite` | Enflure du pied | — | — | 0,4 / 1,1 | provisoire | — |
| `arches>fasciite` | Arches plantaires | — | — | Creuses 1,2 | provisoire | — |
| `demarche>fasciite` | Démarche | — | — | Boiterie antalgique 1,2 | provisoire | — |
| `talons_pointes>fasciite` | Marche sur talons et pointes | — | — | Difficile ou douloureuse 1,3 | provisoire | — |
| `p_calc_med>fasciite` | Tubercule calcanéen médial (insertion du fascia) | — | — | 4 / 0,2 | provisoire | — |
| `p_calc_comp>fasciite` | Calcanéus en compression latérale | — | — | 0,8 / 1 | provisoire | — |
| `windlass>fasciite` | Windlass en charge | 32 % | 100 % | 31,8 / 0,68 | verifie | De Garceau et coll., 2003, Foot Ankle Int (PMID 12793489) : Se 31,8 %, Sp 100 % (plafonnée à 99 %) |

Conduite :
- Investigation : clinique : douleur sous le talon aux premiers pas, sensibilité du tubercule médial du calcanéus. Pas d'imagerie initiale (ne modifie la conduite que dans 2 % des cas ; l'éperon calcanéen n'a pas de valeur). Tableau atypique ou échec après 3 mois : radiographie en charge, puis échographie (fascia ≥ 4 mm). Différentiel : fracture de stress du calcanéus (compression médio-latérale douloureuse), atrophie du coussinet (douleur centrale, pire pieds nus), tunnel tarsien (brûlure, paresthésies), enthésite de spondylarthrite (bilatérale, lombalgie inflammatoire, psoriasis). — *Trojian et coll., 2019, American Family Physician (PMID 31194492) ; Morrissey et coll., 2021, British Journal of Sports Medicine (PMID 33785535) ; Cooper, 2023, JAMA ; Wilcox et coll., 2026, American Family Physician ; Aqil et coll., 2013, Clinical Orthopaedics and Related Research (PMID 23813184)*
- Traitement : éducation, bandage adhésif de l'arche, étirement spécifique du fascia (10 fois 10 s, 3 fois/j, avant les premiers pas) ; renforcement à charge élevée (élévation unipodale du talon sur une marche, serviette roulée sous les orteils, aux 2 jours). Orthèse préfabriquée ou talonnette (le sur-mesure n'est pas supérieur). Attelle de nuit : données contradictoires. Infiltration (p. ex. triamcinolone 20 mg) : bénéfice ≤ 1 mois, rupture du fascia dans environ 2,4 % ; jamais comme seul traitement. Ondes de choc après ≥ 3 mois d'échec. — *Trojian et coll., 2019, American Family Physician (PMID 31194492) ; Morrissey et coll., 2021, British Journal of Sports Medicine (PMID 33785535) ; Cooper, 2023, JAMA ; Wilcox et coll., 2026, American Family Physician ; Aqil et coll., 2013, Clinical Orthopaedics and Related Research (PMID 23813184)*
- Suivi : 4–6 sem, puis 3 mois ; évolution souvent supérieure à 1 an. — *Trojian et coll., 2019, American Family Physician (PMID 31194492) ; Morrissey et coll., 2021, British Journal of Sports Medicine (PMID 33785535) ; Cooper, 2023, JAMA ; Wilcox et coll., 2026, American Family Physician ; Aqil et coll., 2013, Clinical Orthopaedics and Related Research (PMID 23813184)*
- Retour / référence : échec à 6–12 mois → orthopédie ou médecine du sport ; douleur nocturne, trauma, signes neurologiques ou généraux → revoir le diagnostic. — *Trojian et coll., 2019, American Family Physician (PMID 31194492) ; Morrissey et coll., 2021, British Journal of Sports Medicine (PMID 33785535) ; Cooper, 2023, JAMA ; Wilcox et coll., 2026, American Family Physician ; Aqil et coll., 2013, Clinical Orthopaedics and Related Research (PMID 23813184)*

## Hallux valgus

Probabilité de départ (provisoire) : 12 ans 2 %, 25 ans 5 %, 45 ans 8 %, 65 ans 12 %, 80 ans 14 % ; femme ×2,5, homme ×0,4.

Repères publiés : 23 % à 18–65 ans, 35,7 % après 65 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>hallux_valgus` | Pied atteint | — | — | Les deux 2 | provisoire | — |
| `duree>hallux_valgus` | Depuis combien de temps | — | — | Moins de 7 jours 0,1 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>hallux_valgus` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,1 ; Insidieux 3 | provisoire | — |
| `localisation.mtp1>hallux_valgus` | Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) | — | — | 4 / 0,3 | provisoire | — |
| `chaussures>hallux_valgus` | Pire dans des chaussures serrées, mieux en les retirant | — | — | 2 / 0,7 | provisoire | — |
| `enflure>hallux_valgus` | Enflure du pied | — | — | 0,6 / 1,05 | provisoire | — |
| `deformation_prog>hallux_valgus` | Déformation qui s'accentue | — | — | 4 / 0,5 | provisoire | — |
| `ex_hallux_valgus>hallux_valgus` | Hallux valgus visible | — | — | 10 / 0,1 | provisoire | — |
| `ex_callosites>hallux_valgus` | Callosités plantaires | — | — | 1,3 / 0,95 | provisoire | — |
| `p_mtp1>hallux_valgus` | 1ʳᵉ métatarso-phalangienne | — | — | 2 / 0,6 | provisoire | — |

Conduite :
- Investigation : clinique ; radiographies en charge si chirurgie envisagée ou arthrose suspectée (angle d'hallux valgus normal < 15° ; modéré 20–40° ; sévère > 40°). — *Hurn et coll., 2022, Arthritis Care & Research ; Meyr et coll., 2022, Journal of Foot and Ankle Surgery*
- Traitement : chaussures larges, protection de l'exostose, orthèse plantaire (douleur réduite de 9/100 à moyen terme, sans effet durable ni sur l'angle), écarteur d'orteils. — *Hurn et coll., 2022, Arthritis Care & Research ; Meyr et coll., 2022, Journal of Foot and Ankle Surgery*
- Suivi : au besoin. — *Hurn et coll., 2022, Arthritis Care & Research ; Meyr et coll., 2022, Journal of Foot and Ankle Surgery*
- Retour / référence : douleur ou gêne fonctionnelle malgré 6–12 mois de mesures → orthopédie ; la chirurgie fait mieux que l'orthèse à 12 mois (douleur 21 contre 41/100) ; pas d'indication esthétique (jusqu'à un tiers d'insatisfaits). — *Hurn et coll., 2022, Arthritis Care & Research ; Meyr et coll., 2022, Journal of Foot and Ankle Surgery*

## Déformation des orteils latéraux ou bunionette

Probabilité de départ (provisoire) : 12 ans 1 %, 40 ans 3 %, 60 ans 8 %, 75 ans 12 %, 85 ans 14 % ; femme ×1,5, homme ×0,7.

Repères publiés : Orteils latéraux : 52,5–60 % après 65 ans ; bunionette 13,2 % (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>orteils` | Pied atteint | — | — | Les deux 2 | provisoire | — |
| `duree>orteils` | Depuis combien de temps | — | — | Moins de 7 jours 0,1 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>orteils` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,1 ; Insidieux 3 | provisoire | — |
| `localisation.orteils>orteils` | Où est la douleur : Petits orteils | — | — | 5 / 0,4 | provisoire | — |
| `localisation.lateral>orteils` | Où est la douleur : Bord latéral, base du 5ᵉ métatarsien | — | — | 1,3 / 0,95 | provisoire | — |
| `chaussures>orteils` | Pire dans des chaussures serrées, mieux en les retirant | — | — | 2 / 0,7 | provisoire | — |
| `deformation_prog>orteils` | Déformation qui s'accentue | — | — | 4 / 0,5 | provisoire | — |
| `ex_orteils>orteils` | Orteils en griffe, en marteau ou bunionette | — | — | 8 / 0,2 | provisoire | — |
| `p_orteils>orteils` | Orteils | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : déformation souple ou rigide ; stabilité métatarso-phalangienne (tiroir : une déformation peut révéler une lésion de la plaque plantaire) ; cors, ulcères ; sensibilité et pouls chez le diabétique. — *Silver et coll., 2024, American Family Physician*
- Traitement : chaussure à bout large et profond, protections en silicone, coussinet métatarsien, soin des cors ; bandage ou attelle si déformation souple (avis d'experts). — *Silver et coll., 2024, American Family Physician*
- Suivi : au besoin ; plus serré chez le diabétique. — *Silver et coll., 2024, American Family Physician*
- Retour / référence : déformation rigide douloureuse, échec, cors ou ulcères récidivants (prioritaire si diabète) → orthopédie ou podiatrie. — *Silver et coll., 2024, American Family Physician*
- Investigation : clinique ; radiographies en charge si chirurgie envisagée. — *Schrier et coll., 2007, Foot & Ankle International ; Shi et coll., 2018, Journal of the American Academy of Orthopaedic Surgeons (PMID 30130354)*
- Traitement : chaussures larges, coussinage, soin des cors, orthèse ; infiltration seulement si bourse inflammatoire. La plupart répondent. — *Schrier et coll., 2007, Foot & Ankle International ; Shi et coll., 2018, Journal of the American Academy of Orthopaedic Surgeons (PMID 30130354)*
- Suivi : au besoin. — *Schrier et coll., 2007, Foot & Ankle International ; Shi et coll., 2018, Journal of the American Academy of Orthopaedic Surgeons (PMID 30130354)*
- Retour / référence : échec → orthopédie (ostéotomie). — *Schrier et coll., 2007, Foot & Ankle International ; Shi et coll., 2018, Journal of the American Academy of Orthopaedic Surgeons (PMID 30130354)*

## Arthrose du médio-pied

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 1 %, 55 ans 4 %, 70 ans 6 %, 85 ans 7 %.

Repères publiés : 12 % après 50 ans dans une cohorte, 5 % dans une autre (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>arthrose_mp` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>arthrose_mp` | Pied atteint | — | — | Les deux 1,5 | provisoire | — |
| `obesite>arthrose_mp` | Obésité (IMC 30 ou plus) | — | — | 1,3 / 0,9 | provisoire | — |
| `duree>arthrose_mp` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>arthrose_mp` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 3 | provisoire | — |
| `localisation.arche_med>arthrose_mp` | Où est la douleur : Arche médiale, saillie du naviculaire | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.dos_medio>arthrose_mp` | Où est la douleur : Dos du médio-pied | — | — | 3 / 0,5 | provisoire | — |
| `type_douleur>arthrose_mp` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `premiers_pas>arthrose_mp` | Douleur aux premiers pas du matin ou après le repos | — | — | 1,2 / 0,95 | provisoire | — |
| `marche>arthrose_mp` | Pire à la marche ou debout | — | — | 1,8 / 0,6 | provisoire | — |
| `moment>arthrose_mp` | Horaire | — | — | Pire le matin, mieux en bougeant 1,2 | provisoire | — |
| `arches>arthrose_mp` | Arches plantaires | — | — | Affaissées 1,5 | provisoire | — |
| `p_lisfranc>arthrose_mp` | Base du 2ᵉ métatarsien (articulation de Lisfranc) | — | — | 2 / 0,7 | provisoire | — |
| `prom_soustal>arthrose_mp` | Sous-talienne (inversion-éversion du talon) | — | — | Limitée avec douleur 1,5 ; Limitée par raideur 1,5 | provisoire | — |
| `prom_medio>arthrose_mp` | Médio-pied (pronation-supination de l'avant-pied) | — | — | Limitée avec douleur 2 ; Limitée par raideur 2,5 | provisoire | — |
| `stress_lisfranc>arthrose_mp` | Stress du médio-pied (abduction-pronation, pointe unipodale) | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : douleur dorsale du médio-pied à l'appui, sur terrain inégal et dans les escaliers, raideur matinale < 30 min ; radiographies en charge (face et profil) si doute ; faible corrélation entre l'image et les symptômes. — *Lim et coll., 2023, Rheumatology International*
- Traitement : aucun essai randomisé : orthèse moulant l'arche, semelle rigide (insertion pleine longueur en carbone) ou à bascule, analgésie de base. Infiltration guidée par imagerie : soulagement chez 58 % à 1–3 mois, 10 % à 6–12 mois. — *Lim et coll., 2023, Rheumatology International*
- Suivi : 3 mois. — *Lim et coll., 2023, Rheumatology International*
- Retour / référence : échec → orthopédie (arthrodèse) ; l'infiltration diagnostique aide à localiser l'articulation en cause. — *Lim et coll., 2023, Rheumatology International*

## Hallux rigidus

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 2 %, 50 ans 5 %, 65 ans 6 %, 80 ans 5 %.

Repères publiés : 7,8 % symptomatique après 50 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>hallux_rigidus` | Pied atteint | — | — | Les deux 1,5 | provisoire | — |
| `sport.danse>hallux_rigidus` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `duree>hallux_rigidus` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>hallux_rigidus` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Insidieux 3 | provisoire | — |
| `localisation.mtp1>hallux_rigidus` | Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) | — | — | 5 / 0,3 | provisoire | — |
| `pointes>hallux_rigidus` | Pire sur la pointe des pieds ou en poussant sur le gros orteil | — | — | 3 / 0,4 | provisoire | — |
| `talons_pointes>hallux_rigidus` | Marche sur talons et pointes | — | — | Difficile ou douloureuse 1,5 | provisoire | — |
| `p_mtp1>hallux_rigidus` | 1ʳᵉ métatarso-phalangienne | — | — | 3 / 0,5 | provisoire | — |
| `prom_mtp1>hallux_rigidus` | Extension passive de l'hallux | — | — | Complète et indolore 0,3 ; Complète, fin douloureuse 1,5 ; Limitée avec douleur 4 ; Limitée par raideur 6 | provisoire | — |

Conduite :
- Investigation : douleur et perte de dorsiflexion de la 1ʳᵉ métatarso-phalangienne, ostéophyte dorsal ; radiographies en charge ; le grade corrèle mal avec la douleur. — *Yee et coll., 2008, Foot & Ankle International*
- Traitement : chaussure à semelle rigide ou à bascule et à bout haut, orthèse (non supérieure au placebo dans un essai ; moins d'effets indésirables que la chaussure à bascule : 13 % contre 33 %). Infiltration (méthylprednisolone 40 mg avec lidocaïne, repérage anatomique suffisant) : bénéfice de quelques mois dans les grades débutants, nul dans les grades avancés. — *Yee et coll., 2008, Foot & Ankle International*
- Suivi : 3 mois. — *Yee et coll., 2008, Foot & Ankle International*
- Retour / référence : douleur persistante → orthopédie : dans l'essai HARD (2026), l'arthrodèse a réduit la douleur à la marche à 1,3 contre 5,7/10 à 12 mois ; 64 % du groupe en attente ont fini par être opérés. — *Yee et coll., 2008, Foot & Ankle International*

## Métatarsalgie ou lésion de la plaque plantaire

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 5 %, 50 ans 8 %, 70 ans 9 %, 85 ans 8 % ; femme ×1,5, homme ×0,7.

Repères publiés : 13–36 % des adultes (donnée faible) (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>metatarsalgie` | Pied atteint | — | — | Les deux 1,5 | provisoire | — |
| `travail>metatarsalgie` | Occupation | — | — | Travail physique (charges, manutention) 1,2 ; Debout toute la journée (commerce, usine, soins) 1,3 | provisoire | — |
| `sport.marche>metatarsalgie` | Activités physiques : Marche ou randonnée | — | — | 1,1 / 1 | provisoire | — |
| `duree>metatarsalgie` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>metatarsalgie` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2 ; Insidieux 2 | provisoire | — |
| `localisation.avant_pied>metatarsalgie` | Où est la douleur : Sous les têtes des métatarsiens | — | — | 5 / 0,3 | provisoire | — |
| `localisation.intermt>metatarsalgie` | Où est la douleur : Entre les orteils (3ᵉ ou 2ᵉ espace), irradiant aux orteils | — | — | 1,3 / 0,9 | provisoire | — |
| `marche>metatarsalgie` | Pire à la marche ou debout | — | — | 1,8 / 0,6 | provisoire | — |
| `chaussures>metatarsalgie` | Pire dans des chaussures serrées, mieux en les retirant | — | — | 1,5 / 0,8 | provisoire | — |
| `pointes>metatarsalgie` | Pire sur la pointe des pieds ou en poussant sur le gros orteil | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>metatarsalgie` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `arches>metatarsalgie` | Arches plantaires | — | — | Affaissées 1,2 ; Creuses 1,5 | provisoire | — |
| `ex_orteils>metatarsalgie` | Orteils en griffe, en marteau ou bunionette | — | — | 1,5 / 0,9 | provisoire | — |
| `ex_callosites>metatarsalgie` | Callosités plantaires | — | — | 3 / 0,7 | provisoire | — |
| `p_tetes>metatarsalgie` | Têtes métatarsiennes (plante) | — | — | 4 / 0,3 | provisoire | — |
| `tiroir_mtp>metatarsalgie` | Tiroir de la 2ᵉ métatarso-phalangienne (plaque plantaire) | — | — | 3 / 0,7 | provisoire | — |

Conduite :
- Investigation : rechercher la cause : métatarsien long, instabilité de la 2ᵉ métatarso-phalangienne (tiroir : sensibilité 81 %, spécificité 99,8 % ; œdème plantaire), maladie de Freiberg, fracture de stress, névrome de Morton, arthrite inflammatoire. Radiographies en charge (face, oblique, profil). — *Kinter et coll., 2020, Sports Health ; Besse et coll., 2017, Orthopaedics & Traumatology, Surgery & Research (PMID 28109624)*
- Traitement : coussinet ou barre métatarsienne placés en amont des têtes, chaussure à bout large, talon bas, semelle à bascule. Plaque plantaire : orteil maintenu à environ 10° de flexion plantaire par bandage, chaussure rigide ; éviter l'infiltration (ruptures de la plaque rapportées). — *Kinter et coll., 2020, Sports Health ; Besse et coll., 2017, Orthopaedics & Traumatology, Surgery & Research (PMID 28109624)*
- Suivi : 6 sem. — *Kinter et coll., 2020, Sports Health ; Besse et coll., 2017, Orthopaedics & Traumatology, Surgery & Research (PMID 28109624)*
- Retour / référence : instabilité ou orteil qui se croise, échec, synovite de plusieurs articulations (rhumatologie). — *Kinter et coll., 2020, Sports Health ; Besse et coll., 2017, Orthopaedics & Traumatology, Surgery & Research (PMID 28109624)*

## Goutte de la 1ʳᵉ métatarso-phalangienne (podagre)

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 45 ans 3 %, 60 ans 5 %, 80 ans 6 % ; homme ×2, femme ×0,5.

Repères publiés : 1ʳᵉ métatarso-phalangienne atteinte chez 56–78 % des goutteux ; prévalence 3,4 % à 40–59 ans, 8,8 % après 60 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>goutte` | Pied atteint | — | — | Les deux 0,5 | provisoire | — |
| `diabete>goutte` | Diabète ou neuropathie périphérique | — | — | 1,2 / 1 | provisoire | — |
| `obesite>goutte` | Obésité (IMC 30 ou plus) | — | — | 1,5 / 0,9 | provisoire | — |
| `atcd_rhumato.uveite>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.synovite>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.goutte>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 6 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 6 / 1 | provisoire | — |
| `atcd_rhumato.par>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.spa>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>goutte` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 1 / 1 | provisoire | — |
| `premier>goutte` | Premier épisode | — | — | 0,5 / 1,8 | provisoire | — |
| `duree>goutte` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,6 ; 6 semaines à 3 mois 0,4 ; Plus de 3 mois 0,4 | provisoire | — |
| `apparition>goutte` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 6 ; Graduel 0,3 ; Insidieux 0,3 | provisoire | — |
| `localisation.mtp1>goutte` | Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) | — | — | 6 / 0,2 | provisoire | — |
| `localisation.diffuse>goutte` | Où est la douleur : Diffuse, pied enflé | — | — | 1,5 / 0,9 | provisoire | — |
| `type_douleur>goutte` | Type de douleur | — | — | Lancinante, pulsatile 1,5 | provisoire | — |
| `moment>goutte` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `nocturne>goutte` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `enflure>goutte` | Enflure du pied | — | — | 3 / 0,4 | provisoire | — |
| `rougeur_chaleur>goutte` | Rougeur ou chaleur | — | — | 8 / 0,3 | provisoire | — |
| `autres_articulations>goutte` | Douleur ou enflure d'autres articulations | — | — | 1,5 / 0,9 | provisoire | — |
| `fievre>goutte` | Fièvre ou frissons | — | — | 1,4 / 0,95 | provisoire | — |
| `demarche>goutte` | Démarche | — | — | Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `ex_chaleur>goutte` | Rougeur ou chaleur | — | — | 8 / 0,3 | provisoire | — |
| `p_mtp1>goutte` | 1ʳᵉ métatarso-phalangienne | — | — | 4 / 0,3 | provisoire | — |
| `prom_mtp1>goutte` | Extension passive de l'hallux | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Investigation : diagnostic clinique si tableau typique ; ponction si doute ou suspicion d'infection (la présence de cristaux n'exclut pas l'infection). Chez le diabétique neuropathique : penser à l'ostéite et au pied de Charcot. — *Qaseem et coll., 2017, Annals of Internal Medicine*
- Traitement : crise : voir le bloc commun ; débuter tôt, glace en appoint, traitement « en poche » pour les récidives. Hypo-uricémiant : tophus, dommages radiographiques ou ≥ 2 crises/an (à envisager dès la première crise si insuffisance rénale de stade ≥ 3, urate > 535 µmol/L ou lithiases) ; allopurinol ≤ 100 mg/j au départ (moins si insuffisance rénale), cible < 360 µmol/L, prophylaxie pendant 3–6 mois ; peut être débuté pendant la crise. — *Qaseem et coll., 2017, Annals of Internal Medicine*
- Suivi : 2–4 sem, puis urate aux 2–5 sem pendant le titrage †. — *Qaseem et coll., 2017, Annals of Internal Medicine*
- Retour / référence : fièvre, immunosuppression, plaie ou doute d'infection → urgence. — *Qaseem et coll., 2017, Annals of Internal Medicine*

## Fracture du pied (métatarsiens, base du 5ᵉ, orteils)

Probabilité de départ (provisoire) : 12 ans 8 %, 18 ans 6 %, 35 ans 5 %, 55 ans 6 %, 75 ans 7 %.

Repères publiés : Métatarsiens 67–75/100 000/an, dont 5ᵉ 59,6–68 % ; orteils : fracture du pied la plus fréquente de l'enfant ; 11,9 % des fractures à 20–64 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>fracture` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>fracture` | Pied atteint | — | — | Les deux 0,1 | provisoire | — |
| `sport.pivot>fracture` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,3 / 1 | provisoire | — |
| `duree>fracture` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 1 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>fracture` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,3 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>fracture` | Mécanisme | — | — | Écrasement ou objet tombé sur le pied 2,5 ; Torsion du pied en pointe (flexion plantaire) 1,3 ; Inversion (cheville tournée) 2 ; Orteil heurté (coup de pied dans un meuble) 3 ; Chute de hauteur sur les talons 1,5 | provisoire | — |
| `ecchymose_plantaire>fracture` | Ecchymose sous le médio-pied | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.orteils>fracture` | Où est la douleur : Petits orteils | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.lateral>fracture` | Où est la douleur : Bord latéral, base du 5ᵉ métatarsien | — | — | 2,5 / 0,7 | provisoire | — |
| `localisation.diaphyse>fracture` | Où est la douleur : Sur un métatarsien, point précis (dos du pied) | — | — | 2 / 0,8 | provisoire | — |
| `enflure>fracture` | Enflure du pied | — | — | 2 / 0,5 | provisoire | — |
| `rougeur_chaleur>fracture` | Rougeur ou chaleur | — | — | 0,8 / 1 | provisoire | — |
| `demarche>fracture` | Démarche | — | — | Normale 0,5 ; Boiterie antalgique 1,5 ; Incapable de mettre du poids 2,5 | provisoire | — |
| `ex_oedeme>fracture` | Œdème dorsal | — | — | 2 / 0,5 | provisoire | — |
| `p_5mt>fracture` | Base du 5ᵉ métatarsien | — | — | 2 / 0,8 | provisoire | — |
| `p_navic>fracture` | Naviculaire (face dorsale, point « N ») | — | — | 1,5 / 0,95 | provisoire | — |
| `p_diaphyse>fracture` | Diaphyse d'un métatarsien | — | — | 2 / 0,7 | provisoire | — |
| `p_orteils>fracture` | Orteils | — | — | 2 / 0,7 | provisoire | — |
| `grappe:ottawa_neg>fracture` | Combinaison : Règles d'Ottawa du pied négatives | — | — | — / 0,08 | verifie | Bachmann et coll., 2003, BMJ (PMID 12595378) ; Beckenkamp et coll., 2017, BJSM (PMID 27884861) : RV− 0,08 |
| `grappe:ottawa_pos>fracture` | Combinaison : Règles d'Ottawa du pied positives (au moins un critère) | 99 % | 35 % | 1,54 / — | verifie | Bachmann et coll., 2003, BMJ (PMID 12595378) ; Beckenkamp et coll., 2017, BJSM (PMID 27884861) : RV+ 1,54 (calculé) |

Conduite :
- Investigation : radiographies face, oblique, profil. Fractures multiples ou douleur du médio-pied → rechercher une lésion de Lisfranc (fiche 17). — *Expert et coll., 2020, Journal of the American College of Radiology ; Silver et coll., 2024, American Family Physician*
- Traitement : 2ᵉ–4ᵉ, diaphyse ou col, non déplacée : botte, plâtre de marche ou chaussure à semelle rigide 3–4 sem, appui toléré. Diaphyse distale du 5ᵉ (fracture du danseur) : botte ou chaussure rigide 4 sem, traitement non chirurgical quel que soit le déplacement en l'absence de rotation. 1ᵉʳ métatarsien non déplacé : botte ou plâtre 3–4 sem (sans appui 1–2 sem à envisager). — *Expert et coll., 2020, Journal of the American College of Radiology ; Silver et coll., 2024, American Family Physician*
- Suivi : radiographies à 1–2 sem et à 4–6 sem. — *Expert et coll., 2020, Journal of the American College of Radiology ; Silver et coll., 2024, American Family Physician*
- Retour / référence : déplacement > 3–4 mm ou angulation > 10° (seuils de consensus, contestés), fractures multiples, 1ᵉʳ métatarsien déplacé, comminutif ou intra-articulaire, fracture ouverte, suspicion de loge → orthopédie. — *Expert et coll., 2020, Journal of the American College of Radiology ; Silver et coll., 2024, American Family Physician*
- Investigation : distinguer 3 zones : 1 = avulsion de la tubérosité ; 2 = jonction métaphyso-diaphysaire (Jones) ; 3 = diaphyse proximale (fracture de stress). Chez l'enfant, ne pas confondre avec l'apophyse (ligne longitudinale : fiche 26). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Silver et al., « Common Foot Fractures », American Family Physician, 2024 ; Bachmann et al., BMJ, 2003 ; Gorbachova et al., « ACR Appropriateness Criteria Acute Trauma to the Foot », 2020 ; Douillet et al. (essai CASTING), Lancet, 2024 ; Morrissey et al., « Management of Plantar Heel Pain: A Best Practice Guide », British Journal of Sports Medicine, 2021 ; Arnold et al., « Plantar Fasciitis: Guidelines From the American Physical Therapy Association », American Family Physician, 2025 ; Rathleff et al., Scandinavian Journal of Medicine & Science in Sports, 2015 ; DiGiovanni et al., Journal of Bone and Joint Surgery, 2003 ; Whittaker et al., British Journal of Sports Medicine, 2018 ; Riel et al., British Journal of Sports Medicine, 2023 ; Morancie et al., « Heel Pain », American Family Physician, 2025 ; Cooper, « Common Painful Foot and Ankle Conditions », JAMA, 2023 ; Hurn et al., Arthritis Care & Research, 2022 ; Torkki et al., JAMA, 2001 ; Dias et al., Cochrane Database of Systematic Reviews, 2024 ; Lim et al., Rheumatology International, 2023 ; Munteanu et al., Cochrane Database of Systematic Reviews, 2024 ; Miettinen et al. (essai HARD), Annals of Internal Medicine, 2026 ; Evans et al., « Foot orthoses for treating paediatric flat feet », Cochrane Database of Systematic Reviews, 2022 ; Kinter et Hodgkins, Sports Health, 2020 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020 ; Choi et al., Journal of Bone and Joint Surgery, 2021 ; Mologne et al., American Journal of Sports Medicine, 2005 ; Attia et al., American Journal of Sports Medicine, 2021 ; Hatch et Hacking, « Evaluation and Management of Toe Fractures », American Family Physician, 2003 ; Kensinger et al., Journal of Pediatric Orthopaedics, 2001 ; Appelbaum et al., consensus de l'American Association for the Surgery of Trauma, 2023 ; Thomson et al., Journal of Bone and Joint Surgery, 2013 ; Matthews et al., « Treatments for Morton's neuroma », Cochrane Database of Systematic Reviews, 2024 ; Schroeder et al., « Bone Stress Injuries », American Family Physician, 2024 ; Torg et al., American Journal of Sports Medicine, 2010 ; Lewis et Anderson, « Lisfranc Injuries in the Athlete », Foot & Ankle International, 2016 ; Gardner et al., Journal of Orthopaedic Trauma, 2008 ; Gupta et al., Current Reviews in Musculoskeletal Medicine, 2023 ; York et al., « Injuries to the great toe », Current Reviews in Musculoskeletal Medicine, 2017 ; Wukich et al., « Guidelines on the diagnosis and treatment of active Charcot neuro-osteoarthropathy (IWGDF 2023) », Diabetes/Metabolism Research and Reviews, 2024 ; Docquier et al., Orthopaedics & Traumatology: Surgery & Research, 2019 ; Williams et Cowell, Clinical Orthopaedics and Related Research, 1981 ; Touban et al., Journal of Pediatric Orthopaedics, 2026 ; Frush et Lindenfeld, Sports Health, 2009 ; Thakur et al., Journal of Bone and Joint Surgery, 2012.*
- Traitement : zone 1 : chaussure à semelle rigide ou botte avec appui toléré (non inférieure au plâtre ; retour à l'activité en 37 contre 43 j ; pseudarthrose environ 1 %). Zone 2 : plâtre sans appui 6 sem, puis botte jusqu'à 6 sem ; pseudarthrose 11–50 % sans chirurgie contre 0–11 % avec. Zone 3 : sans appui en attendant l'orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Silver et al., « Common Foot Fractures », American Family Physician, 2024 ; Bachmann et al., BMJ, 2003 ; Gorbachova et al., « ACR Appropriateness Criteria Acute Trauma to the Foot », 2020 ; Douillet et al. (essai CASTING), Lancet, 2024 ; Morrissey et al., « Management of Plantar Heel Pain: A Best Practice Guide », British Journal of Sports Medicine, 2021 ; Arnold et al., « Plantar Fasciitis: Guidelines From the American Physical Therapy Association », American Family Physician, 2025 ; Rathleff et al., Scandinavian Journal of Medicine & Science in Sports, 2015 ; DiGiovanni et al., Journal of Bone and Joint Surgery, 2003 ; Whittaker et al., British Journal of Sports Medicine, 2018 ; Riel et al., British Journal of Sports Medicine, 2023 ; Morancie et al., « Heel Pain », American Family Physician, 2025 ; Cooper, « Common Painful Foot and Ankle Conditions », JAMA, 2023 ; Hurn et al., Arthritis Care & Research, 2022 ; Torkki et al., JAMA, 2001 ; Dias et al., Cochrane Database of Systematic Reviews, 2024 ; Lim et al., Rheumatology International, 2023 ; Munteanu et al., Cochrane Database of Systematic Reviews, 2024 ; Miettinen et al. (essai HARD), Annals of Internal Medicine, 2026 ; Evans et al., « Foot orthoses for treating paediatric flat feet », Cochrane Database of Systematic Reviews, 2022 ; Kinter et Hodgkins, Sports Health, 2020 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020 ; Choi et al., Journal of Bone and Joint Surgery, 2021 ; Mologne et al., American Journal of Sports Medicine, 2005 ; Attia et al., American Journal of Sports Medicine, 2021 ; Hatch et Hacking, « Evaluation and Management of Toe Fractures », American Family Physician, 2003 ; Kensinger et al., Journal of Pediatric Orthopaedics, 2001 ; Appelbaum et al., consensus de l'American Association for the Surgery of Trauma, 2023 ; Thomson et al., Journal of Bone and Joint Surgery, 2013 ; Matthews et al., « Treatments for Morton's neuroma », Cochrane Database of Systematic Reviews, 2024 ; Schroeder et al., « Bone Stress Injuries », American Family Physician, 2024 ; Torg et al., American Journal of Sports Medicine, 2010 ; Lewis et Anderson, « Lisfranc Injuries in the Athlete », Foot & Ankle International, 2016 ; Gardner et al., Journal of Orthopaedic Trauma, 2008 ; Gupta et al., Current Reviews in Musculoskeletal Medicine, 2023 ; York et al., « Injuries to the great toe », Current Reviews in Musculoskeletal Medicine, 2017 ; Wukich et al., « Guidelines on the diagnosis and treatment of active Charcot neuro-osteoarthropathy (IWGDF 2023) », Diabetes/Metabolism Research and Reviews, 2024 ; Docquier et al., Orthopaedics & Traumatology: Surgery & Research, 2019 ; Williams et Cowell, Clinical Orthopaedics and Related Research, 1981 ; Touban et al., Journal of Pediatric Orthopaedics, 2026 ; Frush et Lindenfeld, Sports Health, 2009 ; Thakur et al., Journal of Bone and Joint Surgery, 2012.*
- Suivi : zone 1 : aux 2–4 sem, radiographie à 6 sem seulement si douleur. Zone 2 : radiographies aux 2–4 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Silver et al., « Common Foot Fractures », American Family Physician, 2024 ; Bachmann et al., BMJ, 2003 ; Gorbachova et al., « ACR Appropriateness Criteria Acute Trauma to the Foot », 2020 ; Douillet et al. (essai CASTING), Lancet, 2024 ; Morrissey et al., « Management of Plantar Heel Pain: A Best Practice Guide », British Journal of Sports Medicine, 2021 ; Arnold et al., « Plantar Fasciitis: Guidelines From the American Physical Therapy Association », American Family Physician, 2025 ; Rathleff et al., Scandinavian Journal of Medicine & Science in Sports, 2015 ; DiGiovanni et al., Journal of Bone and Joint Surgery, 2003 ; Whittaker et al., British Journal of Sports Medicine, 2018 ; Riel et al., British Journal of Sports Medicine, 2023 ; Morancie et al., « Heel Pain », American Family Physician, 2025 ; Cooper, « Common Painful Foot and Ankle Conditions », JAMA, 2023 ; Hurn et al., Arthritis Care & Research, 2022 ; Torkki et al., JAMA, 2001 ; Dias et al., Cochrane Database of Systematic Reviews, 2024 ; Lim et al., Rheumatology International, 2023 ; Munteanu et al., Cochrane Database of Systematic Reviews, 2024 ; Miettinen et al. (essai HARD), Annals of Internal Medicine, 2026 ; Evans et al., « Foot orthoses for treating paediatric flat feet », Cochrane Database of Systematic Reviews, 2022 ; Kinter et Hodgkins, Sports Health, 2020 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020 ; Choi et al., Journal of Bone and Joint Surgery, 2021 ; Mologne et al., American Journal of Sports Medicine, 2005 ; Attia et al., American Journal of Sports Medicine, 2021 ; Hatch et Hacking, « Evaluation and Management of Toe Fractures », American Family Physician, 2003 ; Kensinger et al., Journal of Pediatric Orthopaedics, 2001 ; Appelbaum et al., consensus de l'American Association for the Surgery of Trauma, 2023 ; Thomson et al., Journal of Bone and Joint Surgery, 2013 ; Matthews et al., « Treatments for Morton's neuroma », Cochrane Database of Systematic Reviews, 2024 ; Schroeder et al., « Bone Stress Injuries », American Family Physician, 2024 ; Torg et al., American Journal of Sports Medicine, 2010 ; Lewis et Anderson, « Lisfranc Injuries in the Athlete », Foot & Ankle International, 2016 ; Gardner et al., Journal of Orthopaedic Trauma, 2008 ; Gupta et al., Current Reviews in Musculoskeletal Medicine, 2023 ; York et al., « Injuries to the great toe », Current Reviews in Musculoskeletal Medicine, 2017 ; Wukich et al., « Guidelines on the diagnosis and treatment of active Charcot neuro-osteoarthropathy (IWGDF 2023) », Diabetes/Metabolism Research and Reviews, 2024 ; Docquier et al., Orthopaedics & Traumatology: Surgery & Research, 2019 ; Williams et Cowell, Clinical Orthopaedics and Related Research, 1981 ; Touban et al., Journal of Pediatric Orthopaedics, 2026 ; Frush et Lindenfeld, Sports Health, 2009 ; Thakur et al., Journal of Bone and Joint Surgery, 2012.*
- Retour / référence : zone 1 avec déplacement > 2–3 mm ou > 30 % de la surface articulaire → orthopédie (seuil contesté). Zone 2 : référence à envisager chez tous, surtout sportifs et patients actifs (vissage : consolidation 97 % contre 71 %). Zone 3 : orthopédie pour tous. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Silver et al., « Common Foot Fractures », American Family Physician, 2024 ; Bachmann et al., BMJ, 2003 ; Gorbachova et al., « ACR Appropriateness Criteria Acute Trauma to the Foot », 2020 ; Douillet et al. (essai CASTING), Lancet, 2024 ; Morrissey et al., « Management of Plantar Heel Pain: A Best Practice Guide », British Journal of Sports Medicine, 2021 ; Arnold et al., « Plantar Fasciitis: Guidelines From the American Physical Therapy Association », American Family Physician, 2025 ; Rathleff et al., Scandinavian Journal of Medicine & Science in Sports, 2015 ; DiGiovanni et al., Journal of Bone and Joint Surgery, 2003 ; Whittaker et al., British Journal of Sports Medicine, 2018 ; Riel et al., British Journal of Sports Medicine, 2023 ; Morancie et al., « Heel Pain », American Family Physician, 2025 ; Cooper, « Common Painful Foot and Ankle Conditions », JAMA, 2023 ; Hurn et al., Arthritis Care & Research, 2022 ; Torkki et al., JAMA, 2001 ; Dias et al., Cochrane Database of Systematic Reviews, 2024 ; Lim et al., Rheumatology International, 2023 ; Munteanu et al., Cochrane Database of Systematic Reviews, 2024 ; Miettinen et al. (essai HARD), Annals of Internal Medicine, 2026 ; Evans et al., « Foot orthoses for treating paediatric flat feet », Cochrane Database of Systematic Reviews, 2022 ; Kinter et Hodgkins, Sports Health, 2020 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020 ; Choi et al., Journal of Bone and Joint Surgery, 2021 ; Mologne et al., American Journal of Sports Medicine, 2005 ; Attia et al., American Journal of Sports Medicine, 2021 ; Hatch et Hacking, « Evaluation and Management of Toe Fractures », American Family Physician, 2003 ; Kensinger et al., Journal of Pediatric Orthopaedics, 2001 ; Appelbaum et al., consensus de l'American Association for the Surgery of Trauma, 2023 ; Thomson et al., Journal of Bone and Joint Surgery, 2013 ; Matthews et al., « Treatments for Morton's neuroma », Cochrane Database of Systematic Reviews, 2024 ; Schroeder et al., « Bone Stress Injuries », American Family Physician, 2024 ; Torg et al., American Journal of Sports Medicine, 2010 ; Lewis et Anderson, « Lisfranc Injuries in the Athlete », Foot & Ankle International, 2016 ; Gardner et al., Journal of Orthopaedic Trauma, 2008 ; Gupta et al., Current Reviews in Musculoskeletal Medicine, 2023 ; York et al., « Injuries to the great toe », Current Reviews in Musculoskeletal Medicine, 2017 ; Wukich et al., « Guidelines on the diagnosis and treatment of active Charcot neuro-osteoarthropathy (IWGDF 2023) », Diabetes/Metabolism Research and Reviews, 2024 ; Docquier et al., Orthopaedics & Traumatology: Surgery & Research, 2019 ; Williams et Cowell, Clinical Orthopaedics and Related Research, 1981 ; Touban et al., Journal of Pediatric Orthopaedics, 2026 ; Frush et Lindenfeld, Sports Health, 2009 ; Thakur et al., Journal of Bone and Joint Surgery, 2012.*
- Investigation : radiographies face, oblique, profil ; rotation et alignement de l'ongle ; état cutané. Enfant : saignement à l'éponychium ou plaie proximale à l'ongle de l'hallux après un orteil « cogné » = fracture physaire ouverte possible. — *Silver et coll., 2024, American Family Physician*
- Traitement : orteils latéraux : réduction si déplacement, syndactylie et chaussure à semelle rigide 3–6 sem. Hallux : botte ou plâtre de marche 2–3 sem, puis syndactylie et chaussure rigide 2–3 sem. Hématome sous-unguéal à ongle et rebords intacts : trépanation simple (données tirées des doigts). Fracture physaire ouverte de l'hallux : traiter en fracture ouverte (antibiotique : voir le bloc commun), référence. — *Silver et coll., 2024, American Family Physician*
- Suivi : 1–2 sem ; radiographie de contrôle de l'hallux à 1–2 sem, des autres orteils seulement si évolution défavorable. — *Silver et coll., 2024, American Family Physician*
- Retour / référence : fracture ouverte, rotation, fracture intra-articulaire déplacée ou > 25 % de la surface, hallux instable, écrasement sévère, atteinte neurovasculaire, la plupart des fractures physaires → orthopédie. — *Silver et coll., 2024, American Family Physician*

## Névrome de Morton

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 2 %, 45 ans 5 %, 65 ans 4 %, 80 ans 2 % ; femme ×1,6, homme ×0,65.

Repères publiés : 87,5 (femmes) et 50,2 (hommes)/100 000 (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>morton` | Pied atteint | — | — | Les deux 0,8 | provisoire | — |
| `travail>morton` | Occupation | — | — | Debout toute la journée (commerce, usine, soins) 1,2 | provisoire | — |
| `sport.course>morton` | Activités physiques : Course à pied | — | — | 1,2 / 1 | provisoire | — |
| `duree>morton` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>morton` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2 ; Insidieux 2 | provisoire | — |
| `localisation.avant_pied>morton` | Où est la douleur : Sous les têtes des métatarsiens | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.intermt>morton` | Où est la douleur : Entre les orteils (3ᵉ ou 2ᵉ espace), irradiant aux orteils | — | — | 8 / 0,2 | provisoire | — |
| `type_douleur>morton` | Type de douleur | — | — | Brûlure 3 ; Choc électrique 3 | provisoire | — |
| `marche>morton` | Pire à la marche ou debout | — | — | 1,5 / 0,8 | provisoire | — |
| `chaussures>morton` | Pire dans des chaussures serrées, mieux en les retirant | — | — | 3 / 0,2 | a_verifier | Cas opérés : chaussures serrées 86 %, soulagement en les retirant 81 % (spécificité non mesurée) |
| `moment>morton` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `engourdissement>morton` | Engourdissements ou brûlure dans les orteils | — | — | 4 / 0,4 | provisoire | — |
| `enflure>morton` | Enflure du pied | — | — | 0,5 / 1,05 | provisoire | — |
| `p_intermt>morton` | Espace intermétatarsien (pincement pouce-index) | — | — | 3 / 0,1 | a_verifier | Mahadevan et coll., 2015, J Foot Ankle Surg (PMID 25432459) : Se 96 %, spécificité non estimable ; RV− fixé à 0,1 |
| `mulder>morton` | Clic de Mulder | — | — | 4 / 0,6 | a_verifier | Mahadevan et coll., 2015, J Foot Ankle Surg (PMID 25432459) : Se 61 %, spécificité non rapportée |

Conduite :
- Investigation : douleur ou brûlure du 3ᵉ (ou 2ᵉ) espace irradiant aux orteils ; compression de l'espace entre pouce et index (sensibilité 96 %), ressaut de Mulder. Radiographies pour exclure fracture de stress ou maladie de Freiberg ; échographie si doute (sensibilité 91 %). — *Cooper, 2023, JAMA ; Barry et coll., 2024, Cochrane Database of Systematic Reviews*
- Traitement : chaussure à bout large, pas de talon haut, coussinet métatarsien en amont des têtes, orthèse. Infiltration (méthylprednisolone 40 mg avec lidocaïne, de préférence échoguidée) : bénéfice à 1 et 3 mois, nul à 12 mois ; atrophie cutanée ou du coussinet possible. Alcoolisation : pas d'essai, bénéfice non durable. — *Cooper, 2023, JAMA ; Barry et coll., 2024, Cochrane Database of Systematic Reviews*
- Suivi : 6 sem. — *Cooper, 2023, JAMA ; Barry et coll., 2024, Cochrane Database of Systematic Reviews*
- Retour / référence : douleur sévère ou échec → orthopédie (neurectomie : succès 70–90 %) ; environ 30 % sont opérés après infiltration. — *Cooper, 2023, JAMA ; Barry et coll., 2024, Cochrane Database of Systematic Reviews*

## Fracture de stress métatarsienne (ou d'insuffisance)

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 3 %, 30 ans 3 %, 50 ans 2 %, 70 ans 2 % ; femme ×1,6, homme ×0,65.

Repères publiés : 37,9 % des fractures de stress NCAA ; insuffisance 3,1/1 000 femmes-années chez l'aînée (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ff_mt` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>ff_mt` | Pied atteint | — | — | Les deux 0,4 | provisoire | — |
| `sport.aucun>ff_mt` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.course>ff_mt` | Activités physiques : Course à pied | — | — | 2,5 / 1 | provisoire | — |
| `sport.danse>ff_mt` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 2 / 1 | provisoire | — |
| `diabete>ff_mt` | Diabète ou neuropathie périphérique | — | — | 1,3 / 0,95 | provisoire | — |
| `osteoporose>ff_mt` | Ostéoporose ou fracture de fragilité | — | — | 2 / 0,9 | provisoire | — |
| `duree>ff_mt` | Depuis combien de temps | — | — | 1 à 6 semaines 1,5 | provisoire | — |
| `apparition>ff_mt` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 2 ; Graduel 3 | provisoire | — |
| `localisation.avant_pied>ff_mt` | Où est la douleur : Sous les têtes des métatarsiens | — | — | 2 / 0,7 | provisoire | — |
| `localisation.diaphyse>ff_mt` | Où est la douleur : Sur un métatarsien, point précis (dos du pied) | — | — | 6 / 0,3 | provisoire | — |
| `type_douleur>ff_mt` | Type de douleur | — | — | Sourde, profonde 1,2 | provisoire | — |
| `marche>ff_mt` | Pire à la marche ou debout | — | — | 2 / 0,6 | provisoire | — |
| `course_saut>ff_mt` | Pire à la course ou au saut | — | — | 3 / 0,4 | provisoire | — |
| `moment>ff_mt` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>ff_mt` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure>ff_mt` | Enflure du pied | — | — | 1,8 / 0,7 | provisoire | — |
| `demarche>ff_mt` | Démarche | — | — | Boiterie antalgique 1,5 | provisoire | — |
| `saut_uni>ff_mt` | Saut unipodal | — | — | Douloureux 2 | provisoire | — |
| `ex_oedeme>ff_mt` | Œdème dorsal | — | — | 2 / 0,7 | provisoire | — |
| `p_diaphyse>ff_mt` | Diaphyse d'un métatarsien | — | — | 6 / 0,3 | provisoire | — |
| `p_tetes>ff_mt` | Têtes métatarsiennes (plante) | — | — | 1,3 / 0,9 | provisoire | — |

Conduite :
- Investigation : douleur focale du 2ᵉ ou 3ᵉ métatarsien après une hausse de charge ; radiographie souvent normale pendant 2–3 sem → répéter ou IRM. Sites à haut risque : base du 2ᵉ (danse), 5ᵉ proximal. Dépister un déficit énergétique relatif (REDs) ; doser la 25(OH)D. Sujet âgé sans trauma : fracture d'insuffisance. — *Schroeder et coll., 2024, American Family Physician ; Boden et coll., 2001, American Journal of Sports Medicine ; Hoenig et coll., 2022, Nature Reviews*
- Traitement : botte de marche ou chaussure à semelle rigide et arrêt de l'impact 4–8 sem ; reprise graduelle après 5 j sans douleur au quotidien ; limiter les AINS. Fracture d'insuffisance : ajouter l'évaluation de l'ostéoporose (la prise en compte des fractures du pied dans le calcul du risque est débattue). — *Schroeder et coll., 2024, American Family Physician ; Boden et coll., 2001, American Journal of Sports Medicine ; Hoenig et coll., 2022, Nature Reviews*
- Suivi : 2–3 sem, puis 6 sem. — *Schroeder et coll., 2024, American Family Physician ; Boden et coll., 2001, American Journal of Sports Medicine ; Hoenig et coll., 2022, Nature Reviews*
- Retour / référence : site à haut risque, absence de consolidation → médecine du sport ou orthopédie. — *Schroeder et coll., 2024, American Family Physician ; Boden et coll., 2001, American Journal of Sports Medicine ; Hoenig et coll., 2022, Nature Reviews*

## Fracture de stress du naviculaire

Probabilité de départ (provisoire) : 12 ans 0 %, 18 ans 1 %, 25 ans 1 %, 40 ans 0 %, 60 ans 0 %.

Repères publiés : 26 des 180 fractures de stress chez le sportif (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ff_navic` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>ff_navic` | Pied atteint | — | — | Les deux 0,4 | provisoire | — |
| `sport.aucun>ff_navic` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.course>ff_navic` | Activités physiques : Course à pied | — | — | 2 / 1 | provisoire | — |
| `sport.pivot>ff_navic` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2 / 1 | provisoire | — |
| `duree>ff_navic` | Depuis combien de temps | — | — | 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>ff_navic` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 3 | provisoire | — |
| `localisation.arche_med>ff_navic` | Où est la douleur : Arche médiale, saillie du naviculaire | — | — | 2 / 0,8 | provisoire | — |
| `localisation.dos_medio>ff_navic` | Où est la douleur : Dos du médio-pied | — | — | 3 / 0,6 | provisoire | — |
| `marche>ff_navic` | Pire à la marche ou debout | — | — | 1,5 / 0,8 | provisoire | — |
| `course_saut>ff_navic` | Pire à la course ou au saut | — | — | 3 / 0,4 | provisoire | — |
| `saut_uni>ff_navic` | Saut unipodal | — | — | Douloureux 2 | provisoire | — |
| `p_navic>ff_navic` | Naviculaire (face dorsale, point « N ») | — | — | 4 / 0,3 | a_verifier | Modica et coll., 2026, Sports Health : point « N » chez jusqu'à 81 % des fractures de stress du naviculaire |

Conduite :
- Investigation : sportif (sprint, saut) avec douleur vague du médio-pied dorsal ; sensibilité du « point N » (dos du naviculaire, présente dans jusqu'à 81 %). Radiographies souvent faussement négatives → IRM ou TDM. — *Gross et coll., 2015, Foot & Ankle International ; Fowler et coll., 2011, Sports Medicine (PMID 21780848)*
- Traitement : site à haut risque : plâtre sans appui 6–8 sem (succès 96 % contre 47 % avec appui), puis botte 2–6 sem jusqu'à disparition de la sensibilité. — *Gross et coll., 2015, Foot & Ankle International ; Fowler et coll., 2011, Sports Medicine (PMID 21780848)*
- Suivi : 6 sem (point N) ; retour au sport en 4–6 mois. — *Gross et coll., 2015, Foot & Ankle International ; Fowler et coll., 2011, Sports Medicine (PMID 21780848)*
- Retour / référence : médecine du sport ou orthopédie pour tous (chirurgie souvent proposée à l'athlète de haut niveau). — *Gross et coll., 2015, Foot & Ankle International ; Fowler et coll., 2011, Sports Medicine (PMID 21780848)*

## Fracture de stress du calcanéus

Probabilité de départ (provisoire) : 12 ans 0 %, 20 ans 1 %, 40 ans 0 %, 70 ans 1 %.

Repères publiés : 2,6 % des fractures de stress du sportif (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ff_calc` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `sport.aucun>ff_calc` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.course>ff_calc` | Activités physiques : Course à pied | — | — | 2 / 1 | provisoire | — |
| `osteoporose>ff_calc` | Ostéoporose ou fracture de fragilité | — | — | 2 / 0,9 | provisoire | — |
| `duree>ff_calc` | Depuis combien de temps | — | — | 1 à 6 semaines 1,5 | provisoire | — |
| `apparition>ff_calc` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 3 | provisoire | — |
| `localisation.talon_plantaire>ff_calc` | Où est la douleur : Sous le talon | — | — | 2 / 0,8 | provisoire | — |
| `localisation.talon_post>ff_calc` | Où est la douleur : Arrière ou côtés du talon | — | — | 2 / 0,8 | provisoire | — |
| `course_saut>ff_calc` | Pire à la course ou au saut | — | — | 3 / 0,5 | provisoire | — |
| `saut_uni>ff_calc` | Saut unipodal | — | — | Douloureux 2 | provisoire | — |
| `p_calc_med>ff_calc` | Tubercule calcanéen médial (insertion du fascia) | — | — | 1,3 / 0,95 | provisoire | — |
| `p_calc_comp>ff_calc` | Calcanéus en compression latérale | — | — | 5 / 0,4 | provisoire | — |

Conduite :
- Investigation : talalgie après hausse d'activité, puis au repos ; compression médio-latérale du calcanéus douloureuse, saut unipodal difficile ; ligne de sclérose à la radiographie après 2–3 sem ; IRM de préférence. — *Walters et coll., 2014, Journal of Foot and Ankle Surgery (PMID 24618246) ; Myerson et coll., 1993, Clinical Orthopaedics and Related Research (PMID 8472441)*
- Traitement : décharge par botte de marche, talonnette ou béquilles environ 8 sem (jusqu'à 12 sem si trait visible) ; revoir nutrition et REDs ; pas de chirurgie. — *Walters et coll., 2014, Journal of Foot and Ankle Surgery (PMID 24618246) ; Myerson et coll., 1993, Clinical Orthopaedics and Related Research (PMID 8472441)*
- Suivi : 4 sem, puis 8 sem. — *Walters et coll., 2014, Journal of Foot and Ankle Surgery (PMID 24618246) ; Myerson et coll., 1993, Clinical Orthopaedics and Related Research (PMID 8472441)*
- Retour / référence : échec ou doute (tumeur, infection) → imagerie et orthopédie. — *Walters et coll., 2014, Journal of Foot and Ankle Surgery (PMID 24618246) ; Myerson et coll., 1993, Clinical Orthopaedics and Related Research (PMID 8472441)*

## Lésion de Lisfranc (entorse ou fracture du médio-pied)

Probabilité de départ (provisoire) : 12 ans 1 %, 20 ans 1 %, 35 ans 1 %, 55 ans 1 %, 75 ans 1 %.

Repères publiés : 9,2–14/100 000 p-a ; entorse du médio-pied : 2ᵉ rang chez le sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>lisfranc` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>lisfranc` | Pied atteint | — | — | Les deux 0,1 | provisoire | — |
| `sport.aucun>lisfranc` | Activités physiques : Peu ou pas de sport | — | — | 0,6 / 1 | provisoire | — |
| `sport.pivot>lisfranc` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2 / 1 | provisoire | — |
| `sport.contact>lisfranc` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `duree>lisfranc` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; Plus de 3 mois 0,3 | provisoire | — |
| `apparition>lisfranc` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Subit, sans traumatisme 0,3 ; Graduel 0,2 ; Insidieux 0,2 | provisoire | — |
| `mecanisme>lisfranc` | Mécanisme | — | — | Écrasement ou objet tombé sur le pied 1,5 ; Torsion du pied en pointe (flexion plantaire) 4 | provisoire | — |
| `ecchymose_plantaire>lisfranc` | Ecchymose sous le médio-pied | — | — | 6 / 0,6 | provisoire | — |
| `localisation.dos_medio>lisfranc` | Où est la douleur : Dos du médio-pied | — | — | 4 / 0,4 | provisoire | — |
| `enflure>lisfranc` | Enflure du pied | — | — | 2 / 0,6 | provisoire | — |
| `demarche>lisfranc` | Démarche | — | — | Normale 0,5 ; Boiterie antalgique 1,5 ; Incapable de mettre du poids 2,5 | provisoire | — |
| `ex_oedeme>lisfranc` | Œdème dorsal | — | — | 2 / 0,6 | provisoire | — |
| `ex_ecchymose_plantaire>lisfranc` | Ecchymose plantaire du médio-pied | — | — | 6 / 0,7 | provisoire | — |
| `p_lisfranc>lisfranc` | Base du 2ᵉ métatarsien (articulation de Lisfranc) | — | — | 5 / 0,2 | provisoire | — |
| `prom_medio>lisfranc` | Médio-pied (pronation-supination de l'avant-pied) | — | — | Limitée avec douleur 2 | provisoire | — |
| `stress_lisfranc>lisfranc` | Stress du médio-pied (abduction-pronation, pointe unipodale) | — | — | 5 / 0,4 | provisoire | — |

Conduite :
- Investigation : torsion ou charge axiale sur pied en flexion plantaire ; douleur et enflure du médio-pied, ecchymose plantaire (très évocatrice, souvent absente), élévation unipodale sur la pointe impossible. Radiographies bilatérales en charge : diastasis ≥ 2 mm entre le cunéiforme médial et la base du 2ᵉ métatarsien, signe de l'écaille. Diagnostic manqué dans 20 % ou plus (jusqu'à 50 % sur clichés sans charge). Radiographies normales et forte suspicion : TDM ou IRM, ou clichés en charge répétés à 7–10 j. — *Lewis et coll., 2016, Foot & Ankle International ; McDermott et coll., 2024, American Journal of Emergency Medicine (PMID 39276688) ; Silver et coll., 2024, American Family Physician*
- Traitement : en attendant : botte, sans appui. Lésion stable confirmée : plâtre ou botte sans appui 4–6 sem, puis botte en charge 2–4 sem. — *Lewis et coll., 2016, Foot & Ankle International ; McDermott et coll., 2024, American Journal of Emergency Medicine (PMID 39276688) ; Silver et coll., 2024, American Family Physician*
- Suivi : radiographies en charge à 2–3 sem. — *Lewis et coll., 2016, Foot & Ankle International ; McDermott et coll., 2024, American Journal of Emergency Medicine (PMID 39276688) ; Silver et coll., 2024, American Family Physician*
- Retour / référence : tout diastasis ou toute instabilité → orthopédie rapidement ; discuter tous les cas avec l'orthopédie ; fracture ouverte ou loge → urgence. — *Lewis et coll., 2016, Foot & Ankle International ; McDermott et coll., 2024, American Journal of Emergency Medicine (PMID 39276688) ; Silver et coll., 2024, American Family Physician*

## Turf toe (entorse de la plaque plantaire de l'hallux)

Probabilité de départ (provisoire) : 12 ans 0 %, 20 ans 1 %, 30 ans 1 %, 45 ans 0 %.

Repères publiés : 0,040–0,062/1 000 expositions au football (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>turf_toe` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>turf_toe` | Pied atteint | — | — | Les deux 0,1 | provisoire | — |
| `sport.aucun>turf_toe` | Activités physiques : Peu ou pas de sport | — | — | 0,3 / 1 | provisoire | — |
| `sport.pivot>turf_toe` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2,5 / 1 | provisoire | — |
| `sport.contact>turf_toe` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2,5 / 1 | provisoire | — |
| `duree>turf_toe` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; Plus de 3 mois 0,3 | provisoire | — |
| `apparition>turf_toe` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Graduel 0,2 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>turf_toe` | Mécanisme | — | — | Hyperextension du gros orteil 6 | provisoire | — |
| `localisation.mtp1>turf_toe` | Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) | — | — | 5 / 0,3 | provisoire | — |
| `pointes>turf_toe` | Pire sur la pointe des pieds ou en poussant sur le gros orteil | — | — | 3 / 0,4 | provisoire | — |
| `p_mtp1>turf_toe` | 1ʳᵉ métatarso-phalangienne | — | — | 4 / 0,4 | provisoire | — |
| `p_sesamoides>turf_toe` | Sésamoïdes (sous la 1ʳᵉ tête) | — | — | 2 / 0,7 | provisoire | — |
| `prom_mtp1>turf_toe` | Extension passive de l'hallux | — | — | Complète, fin douloureuse 1,5 ; Limitée avec douleur 2 | provisoire | — |

Conduite :
- Investigation : hyperextension de la 1ʳᵉ métatarso-phalangienne ; grade I (étirement), II (déchirure partielle), III (rupture, instabilité, faiblesse de flexion). Radiographies en charge (face, profil, axiale des sésamoïdes) : migration proximale des sésamoïdes ; IRM si grade II–III. — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Gupta et coll., 2023, Current Reviews in Musculoskeletal Medicine*
- Traitement : grade I : semelle rigide ou extension de Morton, bandage une fois l'enflure résorbée ; retour en 3–5 j. Grade II : botte de marche, avec ou sans béquilles, jusqu'à 2 sem ; retour en 2–4 sem. Grade III : botte ou plâtre jusqu'à 6 sem ; retour en 4–6 sem à 10–16 sem selon les sources. — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Gupta et coll., 2023, Current Reviews in Musculoskeletal Medicine*
- Suivi : 1–2 sem. — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Gupta et coll., 2023, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : grade III, migration ou fracture d'un sésamoïde, instabilité, échec → orthopédie (moins de 2 % sont opérés). — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Gupta et coll., 2023, Current Reviews in Musculoskeletal Medicine*

## Sésamoïdite ou fracture du sésamoïde

Probabilité de départ (provisoire) : 12 ans 1 %, 20 ans 2 %, 35 ans 1 %, 55 ans 1 %.

Repères publiés : 1–3 % des fractures de stress (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `sport.aucun>sesamoide` | Activités physiques : Peu ou pas de sport | — | — | 0,5 / 1 | provisoire | — |
| `sport.course>sesamoide` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>sesamoide` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 2 / 1 | provisoire | — |
| `duree>sesamoide` | Depuis combien de temps | — | — | 1 à 6 semaines 1,2 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>sesamoide` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 ; Graduel 2 | provisoire | — |
| `mecanisme>sesamoide` | Mécanisme | — | — | Hyperextension du gros orteil 2 | provisoire | — |
| `localisation.mtp1>sesamoide` | Où est la douleur : Gros orteil (1ʳᵉ métatarso-phalangienne) | — | — | 4 / 0,4 | provisoire | — |
| `course_saut>sesamoide` | Pire à la course ou au saut | — | — | 2 / 0,6 | provisoire | — |
| `pointes>sesamoide` | Pire sur la pointe des pieds ou en poussant sur le gros orteil | — | — | 3 / 0,4 | provisoire | — |
| `saut_uni>sesamoide` | Saut unipodal | — | — | Douloureux 1,5 | provisoire | — |
| `p_sesamoides>sesamoide` | Sésamoïdes (sous la 1ʳᵉ tête) | — | — | 6 / 0,3 | provisoire | — |
| `prom_mtp1>sesamoide` | Extension passive de l'hallux | — | — | Complète, fin douloureuse 1,5 | provisoire | — |

Conduite :
- Investigation : douleur plantaire sous la tête du 1ᵉʳ métatarsien ; radiographies face, profil et axiale des sésamoïdes : sésamoïde bipartite à bords lisses et corticalisés, fracture à bords irréguliers. IRM pour distinguer réaction de stress, fracture et nécrose. — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Traitement : décharge par orthèse à évidement sous le sésamoïde, semelle rigide ou à bascule, pas de talon haut (avis d'experts). Fracture non déplacée : immobilisation rigide 4–6 sem, puis appui protégé. — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Suivi : 6 sem. — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : fracture (site à haut risque), nécrose, pseudarthrose ou douleur prolongée → orthopédie ; la sésamoïdectomie est un dernier recours. — *York et coll., 2017, Current Reviews in Musculoskeletal Medicine*

## Pied de Charcot (neuro-ostéoarthropathie)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 60 ans 1 %, 80 ans 1 %.

Repères publiés : 0,56–0,79 % des diabétiques (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>charcot` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>charcot` | Pied atteint | — | — | Les deux 0,8 | provisoire | — |
| `diabete>charcot` | Diabète ou neuropathie périphérique | — | — | 30 / 0,05 | provisoire | — |
| `obesite>charcot` | Obésité (IMC 30 ou plus) | — | — | 1,3 / 0,95 | provisoire | — |
| `duree>charcot` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 ; Plus de 3 mois 1,2 | provisoire | — |
| `apparition>charcot` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Subit, sans traumatisme 2 ; Insidieux 2 | provisoire | — |
| `localisation.diffuse>charcot` | Où est la douleur : Diffuse, pied enflé | — | — | 4 / 0,6 | provisoire | — |
| `moment>charcot` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `nocturne>charcot` | Douleur la nuit | — | — | 1,3 / 1 | provisoire | — |
| `engourdissement>charcot` | Engourdissements ou brûlure dans les orteils | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure>charcot` | Enflure du pied | — | — | 4 / 0,3 | provisoire | — |
| `rougeur_chaleur>charcot` | Rougeur ou chaleur | — | — | 5 / 0,6 | provisoire | — |
| `deformation_prog>charcot` | Déformation qui s'accentue | — | — | 3 / 0,9 | provisoire | — |
| `ex_oedeme>charcot` | Œdème dorsal | — | — | 3 / 0,6 | provisoire | — |
| `ex_chaleur>charcot` | Rougeur ou chaleur | — | — | 5 / 0,6 | provisoire | — |
| `monofilament>charcot` | Monofilament 5,07 non perçu | — | — | 13 / 0,3 | verifie | Kanji et coll., 2010, JAMA (examen clinique rationnel) : neuropathie des grosses fibres, RV+ 11–16, RV− 0,09–0,54 |

Conduite :
- Investigation : y penser devant tout pied chaud, enflé ou rouge, souvent peu douloureux, chez un diabétique neuropathique à peau intacte ; écart de température cutanée d'environ 2 °C ou plus avec l'autre pied. Souvent pris pour une cellulite, une goutte ou une thrombose. Radiographies en charge des deux pieds (face, oblique, profil) ; IRM si elles sont normales. La CRP, la VS et la leucocytose ne servent ni à confirmer ni à exclure. — *Schaper et coll., 2024, Diabetes/Metabolism Research and Reviews ; Wukich et coll., 2024, Diabetes/Metabolism Research and Reviews*
- Traitement : décharge et immobilisation dès la suspicion, sans attendre la confirmation : plâtre de contact total non amovible (premier choix) ou botte haute portée en permanence, avec béquilles ; pas de dispositif s'arrêtant sous la cheville ; aucun traitement médicamenteux (bisphosphonates non recommandés). — *Schaper et coll., 2024, Diabetes/Metabolism Research and Reviews ; Wukich et coll., 2024, Diabetes/Metabolism Research and Reviews*
- Suivi : rapproché (ulcères sous plâtre chez environ 14 %) ; durée médiane de plusieurs mois (4–10), jusqu'à normalisation de la température et consolidation. — *Schaper et coll., 2024, Diabetes/Metabolism Research and Reviews ; Wukich et coll., 2024, Diabetes/Metabolism Research and Reviews*
- Retour / référence : équipe du pied diabétique ou orthopédie en quelques jours ; fièvre, plaie ou suspicion d'ostéite → urgence. — *Schaper et coll., 2024, Diabetes/Metabolism Research and Reviews ; Wukich et coll., 2024, Diabetes/Metabolism Research and Reviews*

## Synostose (coalition) du tarse

Probabilité de départ (provisoire) : 10 ans 1 %, 12 ans 1 %, 16 ans 1 %, 25 ans 0 %, 40 ans 0 %.

Repères publiés : Symptomatique : 3,5/100 000 enfants (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>synostose` | Pied atteint | — | — | Les deux 1,5 | provisoire | — |
| `entorses_rep>synostose` | Entorses de cheville à répétition | — | — | 2,5 / 0,9 | provisoire | — |
| `duree>synostose` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>synostose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 1,5 ; Insidieux 1,5 | provisoire | — |
| `localisation.arche_med>synostose` | Où est la douleur : Arche médiale, saillie du naviculaire | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.dos_medio>synostose` | Où est la douleur : Dos du médio-pied | — | — | 1,3 / 0,9 | provisoire | — |
| `arches>synostose` | Arches plantaires | — | — | Affaissées 2 | provisoire | — |
| `prom_soustal>synostose` | Sous-talienne (inversion-éversion du talon) | — | — | Complète et indolore 0,3 ; Limitée avec douleur 3 ; Limitée par raideur 5 | provisoire | — |

Conduite :
- Investigation : 10–16 ans : pied plat rigide, douleur à l'activité, entorses à répétition, mobilité sous-talienne réduite ; bilatérale dans environ 50 %. Radiographies avec oblique médiale à 45° (forme calcanéo-naviculaire) et profil (« nez de fourmilier » ; signe du C de la forme talo-calcanéenne) ; des radiographies normales n'excluent pas → TDM ou IRM. — *Catanzano et coll., 2023, JBJS Reviews (PMID 37307332) ; Lemley et coll., 2006, Foot & Ankle International*
- Traitement : ibuprofène, orthèse ou coin médial ; botte ou plâtre de marche 4–6 sem si sévère. — *Catanzano et coll., 2023, JBJS Reviews (PMID 37307332) ; Lemley et coll., 2006, Foot & Ankle International*
- Suivi : 6 sem. — *Catanzano et coll., 2023, JBJS Reviews (PMID 37307332) ; Lemley et coll., 2006, Foot & Ankle International*
- Retour / référence : orthopédie pédiatrique si échec (essai d'environ 6 mois ; succès moindre pour la forme talo-calcanéenne). — *Catanzano et coll., 2023, JBJS Reviews (PMID 37307332) ; Lemley et coll., 2006, Foot & Ankle International*

## Os naviculaire accessoire douloureux

Probabilité de départ (provisoire) : 10 ans 3 %, 12 ans 4 %, 16 ans 2 %, 25 ans 1 %, 40 ans 0 % ; femme ×1,3, homme ×0,8.

Repères publiés : Présent chez 15,1 %, douloureux chez 20,8 % des porteurs (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>os_navic` | Pied atteint | — | — | Les deux 1,5 | provisoire | — |
| `duree>os_navic` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>os_navic` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,3 ; Graduel 2 | provisoire | — |
| `localisation.arche_med>os_navic` | Où est la douleur : Arche médiale, saillie du naviculaire | — | — | 6 / 0,3 | provisoire | — |
| `arches>os_navic` | Arches plantaires | — | — | Affaissées 1,5 | provisoire | — |
| `p_navic>os_navic` | Naviculaire (face dorsale, point « N ») | — | — | 1,5 / 0,9 | provisoire | — |
| `p_os_navic>os_navic` | Tubérosité médiale du naviculaire | — | — | 6 / 0,3 | provisoire | — |

Conduite :
- Investigation : douleur médiale du médio-pied au frottement de la chaussure, sensibilité sur l'osselet et l'insertion du tibial postérieur, douleur à l'inversion contrariée ; radiographies (face, profil) ; IRM si doute. — *Gluck et coll., 2010, American Journal of Sports Medicine*
- Traitement : adaptation de la chaussure, coussinage, soutien d'arche, analgésie ; botte ou plâtre de marche court si crise aiguë. — *Gluck et coll., 2010, American Journal of Sports Medicine*
- Suivi : 6–8 sem ; soulagement complet sans chirurgie chez une minorité en clinique spécialisée, mais résolution chez environ 70 % en 2 ans en population. — *Gluck et coll., 2010, American Journal of Sports Medicine*
- Retour / référence : douleur persistante → orthopédie (excision : environ 80 % d'excellents résultats). — *Gluck et coll., 2010, American Journal of Sports Medicine*

## Maladie de Freiberg

Probabilité de départ (provisoire) : 11 ans 1 %, 14 ans 2 %, 17 ans 1 %, 25 ans 0 %, 40 ans 0 % ; femme ×3, homme ×0,35.

Repères publiés : Adolescentes de 11–17 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>freiberg` | Pied atteint | — | — | Les deux 0,5 | provisoire | — |
| `sport.danse>freiberg` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,5 / 1 | provisoire | — |
| `duree>freiberg` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>freiberg` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Graduel 2 | provisoire | — |
| `localisation.avant_pied>freiberg` | Où est la douleur : Sous les têtes des métatarsiens | — | — | 2 / 0,8 | provisoire | — |
| `pointes>freiberg` | Pire sur la pointe des pieds ou en poussant sur le gros orteil | — | — | 1,5 / 0,9 | provisoire | — |
| `p_tetes>freiberg` | Têtes métatarsiennes (plante) | — | — | 3 / 0,6 | provisoire | — |
| `tiroir_mtp>freiberg` | Tiroir de la 2ᵉ métatarso-phalangienne (plaque plantaire) | — | — | 1,5 / 0,95 | provisoire | — |

Conduite :
- Investigation : adolescente ou jeune femme, douleur de la tête du 2ᵉ métatarsien ; radiographie normale au début (aplatissement ensuite) ; IRM si doute. — *Touban et coll., 2026, Journal of Pediatric Orthopedics (PMID 42474446)*
- Traitement : décharge : semelle rigide ou à bascule, barre ou coussinet métatarsien, botte si aigu ; 84 % reprennent le sport sans chirurgie (médiane 3,7 mois). — *Touban et coll., 2026, Journal of Pediatric Orthopedics (PMID 42474446)*
- Suivi : 6 sem. — *Touban et coll., 2026, Journal of Pediatric Orthopedics (PMID 42474446)*
- Retour / référence : stades avancés (effondrement, corps libre) ou échec → orthopédie. — *Touban et coll., 2026, Journal of Pediatric Orthopedics (PMID 42474446)*

## Maladie d'Iselin (apophysite de la base du 5ᵉ métatarsien)

Probabilité de départ (provisoire) : 9 ans 2 %, 11 ans 3 %, 13 ans 2 %, 15 ans 1 %, 18 ans 0 %.

Repères publiés : Pas d'incidence (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>iselin` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.pivot>iselin` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `duree>iselin` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 | provisoire | — |
| `apparition>iselin` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 2 | provisoire | — |
| `localisation.lateral>iselin` | Où est la douleur : Bord latéral, base du 5ᵉ métatarsien | — | — | 5 / 0,4 | provisoire | — |
| `course_saut>iselin` | Pire à la course ou au saut | — | — | 2 / 0,6 | provisoire | — |
| `p_5mt>iselin` | Base du 5ᵉ métatarsien | — | — | 4 / 0,3 | provisoire | — |

Conduite :
- Investigation : 10–14 ans, douleur latérale à l'effort ; oblique : ligne apophysaire longitudinale, parallèle à la diaphyse (une fracture est transversale) ; comparer au côté sain. — *Williams et coll., 1981, Clinical Orthopaedics and Related Research (PMID 7273526) ; Canale et coll., 1992, Journal of Pediatric Orthopedics (PMID 1732301)*
- Traitement : modification d'activité, ibuprofène, étirements ; botte ou plâtre de marche court environ 4 sem si sévère, puis rééducation des fibulaires (consensus). — *Williams et coll., 1981, Clinical Orthopaedics and Related Research (PMID 7273526) ; Canale et coll., 1992, Journal of Pediatric Orthopedics (PMID 1732301)*
- Suivi : 4–6 sem ; guérison à la fusion. — *Williams et coll., 1981, Clinical Orthopaedics and Related Research (PMID 7273526) ; Canale et coll., 1992, Journal of Pediatric Orthopedics (PMID 1732301)*
- Retour / référence : trait transversal (fracture), pseudarthrose de l'apophyse → orthopédie. — *Williams et coll., 1981, Clinical Orthopaedics and Related Research (PMID 7273526) ; Canale et coll., 1992, Journal of Pediatric Orthopedics (PMID 1732301)*

## Maladie de Sever (apophysite calcanéenne)

Probabilité de départ (provisoire) : 9 ans 15 %, 11 ans 12 %, 12 ans 8 %, 13 ans 5 %, 14 ans 2 %, 16 ans 0 %, 18 ans 0 % ; homme ×1,4, femme ×0,7.

Repères publiés : 10,7 % des diagnostics de surmenage chez l'enfant (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>sever` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>sever` | Pied atteint | — | — | Les deux 1,8 | provisoire | — |
| `sport.pivot>sever` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `duree>sever` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 | provisoire | — |
| `apparition>sever` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2,5 | provisoire | — |
| `localisation.talon_plantaire>sever` | Où est la douleur : Sous le talon | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.talon_post>sever` | Où est la douleur : Arrière ou côtés du talon | — | — | 5 / 0,3 | provisoire | — |
| `premiers_pas>sever` | Douleur aux premiers pas du matin ou après le repos | — | — | 1,2 / 0,9 | provisoire | — |
| `course_saut>sever` | Pire à la course ou au saut | — | — | 3 / 0,4 | provisoire | — |
| `talons_pointes>sever` | Marche sur talons et pointes | — | — | Difficile ou douloureuse 1,5 | provisoire | — |
| `saut_uni>sever` | Saut unipodal | — | — | Douloureux 2 | provisoire | — |
| `p_calc_comp>sever` | Calcanéus en compression latérale | — | — | 5 / 0,3 | provisoire | — |

Conduite :
- Investigation : clinique, 8–15 ans : douleur à la compression médio-latérale du talon (sensibilité 97 %) et à l'appui unipodal sur le talon ; bilatérale dans environ 60 %. Radiographie seulement si tableau atypique, douleur nocturne, fièvre ou échec après 8 sem. — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*
- Traitement : activité selon la douleur (pas d'arrêt du sport dans les formes légères), talonnette ou coque talonnière (soulagement plus rapide à 1–2 mois ; à 3 mois, résultats équivalents à l'observation et à la physiothérapie), étirements du mollet, glace, ibuprofène PRN. Orthèses sur mesure non supérieures. Formes rebelles (environ 10 %) : botte de marche quelques semaines. — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*
- Suivi : 6–8 sem ; guérison moyenne en 2 mois environ, récidives possibles jusqu'à la fusion (15–16 ans). — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*
- Retour / référence : doute diagnostique ou échec. — *Lintner et coll., 2023, American Family Physician ; Perhamre et coll., 2011, Scandinavian Journal of Medicine & Science in Sports*

## Contusion ou écrasement du pied

Probabilité de départ (provisoire) : 12 ans 8 %, 18 ans 8 %, 35 ans 6 %, 60 ans 5 %, 80 ans 4 %.

Repères publiés : 1ᵉʳ rang des blessures du pied chez le sportif (NCAA) (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>contusion` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>contusion` | Pied atteint | — | — | Les deux 0,1 | provisoire | — |
| `sport.contact>contusion` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `duree>contusion` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,8 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>contusion` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>contusion` | Mécanisme | — | — | Écrasement ou objet tombé sur le pied 3 ; Torsion du pied en pointe (flexion plantaire) 0,7 ; Inversion (cheville tournée) 0,8 ; Orteil heurté (coup de pied dans un meuble) 2 ; Chute de hauteur sur les talons 1,2 | provisoire | — |
| `localisation.dos_medio>contusion` | Où est la douleur : Dos du médio-pied | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.orteils>contusion` | Où est la douleur : Petits orteils | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.diffuse>contusion` | Où est la douleur : Diffuse, pied enflé | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure>contusion` | Enflure du pied | — | — | 1,5 / 0,7 | provisoire | — |
| `ex_oedeme>contusion` | Œdème dorsal | — | — | 1,5 / 0,8 | provisoire | — |
| `p_lisfranc>contusion` | Base du 2ᵉ métatarsien (articulation de Lisfranc) | — | — | 1,3 / 0,9 | provisoire | — |
| `p_orteils>contusion` | Orteils | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : règles d'Ottawa pour le médio-pied ; radiographies d'emblée si écrasement, déformation ou douleur de l'avant-pied avec appui impossible ; pouls, sensibilité, loges (voir le bloc commun). (principes généraux, sans recommandation spécifique) — *Shim et coll., 2022, Archives of Orthopaedic and Trauma Surgery ; Wu et coll., 2025, American Family Physician*
- Traitement : glace, élévation, chaussure à semelle rigide, appui toléré, analgésie de base. (principes généraux, sans recommandation spécifique) — *Shim et coll., 2022, Archives of Orthopaedic and Trauma Surgery ; Wu et coll., 2025, American Family Physician*
- Suivi : 7–10 j ; douleur du médio-pied persistante → radiographies en charge (lésion de Lisfranc). (principes généraux, sans recommandation spécifique) — *Shim et coll., 2022, Archives of Orthopaedic and Trauma Surgery ; Wu et coll., 2025, American Family Physician*
- Retour / référence : douleur croissante avec enflure tendue, engourdissement, pied froid → urgence (fasciotomie nécessaire dans 14–18 % des écrasements dans un registre de traumatologie). (principes généraux, sans recommandation spécifique) — *Shim et coll., 2022, Archives of Orthopaedic and Trauma Surgery ; Wu et coll., 2025, American Family Physician*

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j) ; diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID).
- Analgésie de base (enfant) : ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j), premier choix ; acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) si AINS contre-indiqué.
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; éviter les AINS oraux en cas de maladie cardiovasculaire ou de fragilité ; prudence ≥ 65 ans (IPP ou coxib si risque digestif) ; limiter dans les fractures de stress.
- Règles d'Ottawa du pied : radiographie si douleur du médio-pied ET l'un des critères : sensibilité de la base du 5ᵉ métatarsien, sensibilité du naviculaire, incapacité de faire 4 pas immédiatement et à l'examen. Sensibilité d'environ 99 %, spécificité d'environ 38 %. Ne couvrent pas l'avant-pied (têtes métatarsiennes, orteils) ; imager malgré une règle négative en cas de neuropathie diabétique. Incidences : face, oblique et profil, en charge si possible.
- Thromboprophylaxie sous botte ou plâtre (adulte) : selon le score TRiP(cast) ; score < 7 : pas d'anticoagulant ; score ≥ 7 : énoxaparine 40 mg SC DIE (30 mg si ClCr < 30 mL/min) ou daltéparine 5000 unités SC DIE pendant l'immobilisation (bénéfice incertain). Les fractures du tarse, des métatarsiens et de l'avant-pied comptent comme traumatismes à faible risque ; la lésion de Lisfranc, à risque intermédiaire.
- Infiltrations de corticoïde : effet surtout bref (semaines) ; risque d'atrophie du coussinet plantaire, de dépigmentation et de rupture (fascia plantaire, plaque plantaire) ; au plus 2–3 par an au même site ; jamais avant d'avoir exclu une infection ; aviser les diabétiques.
- Crise de goutte : colchicine 1,2 mg, puis 0,6 mg 1 h plus tard (max 1,8 mg la première heure) ; 12 h après, 0,6 mg DIE–BID jusqu'à résolution. Avec un inhibiteur puissant du CYP3A4 (clarithromycine, azolés) : 0,6 mg puis 0,3 mg ; inhibiteur modéré (diltiazem, vérapamil) : 1,2 mg une fois ; inhibiteur de la P-gp (cyclosporine) : 0,6 mg une fois ; ne pas répéter avant 3 j. Contre-indiquée si insuffisance rénale ou hépatique avec l'un de ces inhibiteurs ; ne pas répéter avant 2 sem si ClCr < 30. Solutions de rechange : naproxène 500 mg BID avec IPP, ou prednisone 30–35 mg DIE pendant 5 j.
- Céphalexine (fracture ouverte d'orteil, en attendant la prise en charge) † : adulte 500 mg QID ; enfant 50 mg/kg/j en 3 doses (max 1 g/dose) ; réduire si ClCr < 60 mL/min. Le principe (couverture des Gram positifs, débutée tôt) vient des recommandations sur les fractures ouvertes ; aucun régime propre à l'orteil n'a été retrouvé.
- Syndrome compartimental du pied : douleur croissante et disproportionnée avec enflure tendue après un écrasement, une fracture du calcanéus, une lésion de Lisfranc ou une fracture du 1ᵉʳ métatarsien → urgence.
- Intervalles de suivi : fondés sur le consensus et l'usage, non sur des essais.

Pour tous :
- Enseignement : nature de l'atteinte, pronostic, chaussures adaptées, autogestion
- Consignes de reconsultation : fièvre, pied chaud et enflé, plaie, engourdissements, douleur nocturne
