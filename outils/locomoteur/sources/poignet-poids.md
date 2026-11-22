# Douleur au poignet ou à la main : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs poignet` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 371 (validés 0, vérifiés 22, à vérifier 7, provisoires 342).

## Syndrome du canal carpien

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 8 %, 50 ans 15 %, 70 ans 12 % ; femme ×1,5, homme ×0,6.

Repères publiés : 88 (hommes) et 193 (femmes)/100 000/an en médecine générale (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>canal_carpien` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>canal_carpien` | Main atteinte | — | — | Les deux 1,4 | provisoire | — |
| `travail>canal_carpien` | Occupation | — | — | Travail de bureau ou sédentaire 1,3 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `sport.velo>canal_carpien` | Activités physiques : Vélo | — | — | 1,2 / 1 | provisoire | — |
| `diabete>canal_carpien` | Diabète | — | — | 1,5 / 0,95 | provisoire | — |
| `grossesse>canal_carpien` | Grossesse ou post-partum (moins d'un an) | — | — | 2 / 0,95 | provisoire | — |
| `hypothyroidie>canal_carpien` | Hypothyroïdie, insuffisance rénale ou dialyse | — | — | 1,5 / 0,97 | provisoire | — |
| `duree>canal_carpien` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>canal_carpien` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Graduel 1,5 ; Insidieux 2 | provisoire | — |
| `localisation.palmaire>canal_carpien` | Où est la douleur : Face palmaire du poignet | — | — | 1,5 / 0,8 | provisoire | — |
| `type_douleur>canal_carpien` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 1,5 | provisoire | — |
| `flick>canal_carpien` | Secouer la main soulage les engourdissements | — | — | 1,4 / 0,85 | verifie | Flick sign, 2004 (n = 142) : Se 37 %, Sp 74 % |
| `nocturne>canal_carpien` | Douleur la nuit | — | — | 1,8 / 0,6 | provisoire | — |
| `paresthesies_median>canal_carpien` | Engourdissements du pouce, de l'index et du majeur (schéma de Katz) | — | — | 2,4 / 0,5 | verifie | D'Arcy et McGee, 2000, JAMA (examen clinique rationnel, canal carpien) : schéma classique ou probable, RV+ 2,4 |
| `paresthesies_nocturnes>canal_carpien` | Engourdissements qui réveillent la nuit | — | — | 1,2 / 0,7 | verifie | D'Arcy et McGee, 2000, JAMA (examen clinique rationnel, canal carpien) : RV+ 1,2 |
| `paresthesies_ulnaires>canal_carpien` | Engourdissements de l'auriculaire et de l'annulaire | — | — | 0,5 / 1,1 | provisoire | — |
| `enflure>canal_carpien` | Enflure | — | — | 0,6 / 1,1 | provisoire | — |
| `ex_atrophie>canal_carpien` | Atrophie thénarienne ou des interosseux | — | — | 3 / 0,9 | provisoire | — |
| `hypo_median>canal_carpien` | Hypoalgésie ou discrimination de deux points diminuée (territoire médian) | — | — | 3,1 / 0,7 | verifie | D'Arcy et McGee, 2000, JAMA (examen clinique rationnel, canal carpien) : RV+ 3,1 (2,0–5,1) ; RV− provisoire |
| `atrophie_thenar>canal_carpien` | Atrophie ou faiblesse thénarienne (abduction du pouce) | — | — | 4,5 / 0,85 | verifie | Dabbagh et coll., 2021, BMC Musculoskelet Disord : Se 5,5–22 %, Sp 96–100 % ; faiblesse de l'abduction RV+ 1,8, RV− 0,5 |
| `phalen>canal_carpien` | Phalen | 57 % | 67 % | 1,73 / 0,64 | verifie | Dabbagh et coll., 2023, Phys Ther (méta-analyse des manœuvres, canal carpien) : RV+ 1,7 (calculé) |
| `tinel_carpien>canal_carpien` | Tinel au poignet | 45 % | 78 % | 2,05 / 0,71 | verifie | Dabbagh et coll., 2023, Phys Ther (méta-analyse des manœuvres, canal carpien) : RV+ 2,0 (calculé) |
| `durkan>canal_carpien` | Compression carpienne (Durkan) | 64 % | 83 % | 3,76 / 0,43 | verifie | Currie et coll., 2022, JAMA : RV+ 3,8 (calculé) |
| `grappe:cts6_pos>canal_carpien` | Combinaison : CTS-6 : score de 12 ou plus | — | — | 4,5 / — | verifie | Alvarez et Brown, 2024, AFP ; CTS-6 de Graham (score ≥ 12 : Se 89 %, Sp 80 %) : RV+ 4,5 |
| `grappe:cts6_neg>canal_carpien` | Combinaison : CTS-6 : score de moins de 12 | — | — | — / 0,14 | verifie | Alvarez et Brown, 2024, AFP ; CTS-6 de Graham (score ≥ 12 : Se 89 %, Sp 80 %) : RV− 0,14 |

Conduite :
- Investigation : clinique ; EMG si tableau atypique ou avant chirurgie. — *Wright et coll., 2026, Journal of General Internal Medicine (PMID 42970225) ; Wipperman et coll., 2016, American Family Physician (PMID 28075090) ; Teemu et coll., 2023, Cochrane Database of Systematic Reviews ; Padua et coll., 2023, Lancet (PMID 36525982) ; Wipperman et coll., 2024, American Family Physician*
- Traitement : attelle neutre nocturne. Infiltration (méthylprednisolone 20 mg) supérieure à l'attelle à 6 semaines et 6 mois. — *Wright et coll., 2026, Journal of General Internal Medicine (PMID 42970225) ; Wipperman et coll., 2016, American Family Physician (PMID 28075090) ; Teemu et coll., 2023, Cochrane Database of Systematic Reviews ; Padua et coll., 2023, Lancet (PMID 36525982) ; Wipperman et coll., 2024, American Family Physician*
- Suivi : 6–8 sem. — *Wright et coll., 2026, Journal of General Internal Medicine (PMID 42970225) ; Wipperman et coll., 2016, American Family Physician (PMID 28075090) ; Teemu et coll., 2023, Cochrane Database of Systematic Reviews ; Padua et coll., 2023, Lancet (PMID 36525982) ; Wipperman et coll., 2024, American Family Physician*
- Retour / référence : déficit objectif, atrophie thénarienne, échec à 4–6 mois → chirurgie. — *Wright et coll., 2026, Journal of General Internal Medicine (PMID 42970225) ; Wipperman et coll., 2016, American Family Physician (PMID 28075090) ; Teemu et coll., 2023, Cochrane Database of Systematic Reviews ; Padua et coll., 2023, Lancet (PMID 36525982) ; Wipperman et coll., 2024, American Family Physician*

## Fracture du radius distal (dont motte de beurre)

Probabilité de départ (provisoire) : 12 ans 6 %, 18 ans 3 %, 40 ans 2 %, 65 ans 5 %, 85 ans 7 % ; femme ×1,3, homme ×0,8.

Repères publiés : 162/100 000 : 302 avant 18 ans, 254 après 65 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>fx_radius` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>fx_radius` | Main atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.glisse>fx_radius` | Activités physiques : Ski ou planche | — | — | 1,5 / 1 | provisoire | — |
| `osteoporose>fx_radius` | Ostéoporose ou fracture de fragilité | — | — | 2 / 0,9 | provisoire | — |
| `duree>fx_radius` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>fx_radius` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,1 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>fx_radius` | Mécanisme | — | — | Chute sur la main tendue (poignet en extension) 3 ; Coup de poing 0,3 | provisoire | — |
| `localisation.radiale>fx_radius` | Où est la douleur : Côté du pouce du poignet (styloïde radiale, tabatière) | — | — | 1,5 / 0,7 | provisoire | — |
| `localisation.dorsale>fx_radius` | Où est la douleur : Dos du poignet (centre) | — | — | 1,5 / 0,7 | provisoire | — |
| `localisation.ulnaire>fx_radius` | Où est la douleur : Côté de l'auriculaire du poignet | — | — | 1,3 / 0,8 | provisoire | — |
| `appui_poignet_agg>fx_radius` | Pire en appui sur le poignet (pousser, se relever, push-up) | — | — | 1,5 / 0,8 | provisoire | — |
| `enflure>fx_radius` | Enflure | — | — | 2 / 0,5 | provisoire | — |
| `doigts_froids>fx_radius` | Doigts froids, pâles ou engourdis après le traumatisme | — | — | 2 / 0,97 | provisoire | — |
| `ex_deformation>fx_radius` | Déformation du poignet (en dos de fourchette) ou du doigt | — | — | 8 / 0,5 | provisoire | — |
| `ex_ecchymose>fx_radius` | Ecchymose | — | — | 5 / 0,8 | a_verifier | Eyler et coll., 2018, Am J Emerg Med (fracture du poignet, n = 207) : Sp 97,8 % pour une fracture du poignet (Se non publiée) |
| `p_radius_distal>fx_radius` | Radius distal douloureux | — | — | 4 / 0,1 | provisoire | — |
| `arom_poignet>fx_radius` | Mobilité du poignet (flexion, extension) | — | — | Complète et indolore 0,3 ; Limitée avec douleur 2 | provisoire | — |
| `dorsiflexion_douleur>fx_radius` | Dorsiflexion du poignet douloureuse | — | — | 1,5 / 0,1 | a_verifier | Eyler et coll., 2018, Am J Emerg Med (fracture du poignet, n = 207) : Se 95,7 % (Sp non publiée) |
| `pouls_dim>fx_radius` | Pouls radial diminué ou recoloration lente | — | — | 2 / 0,97 | provisoire | — |

Conduite :
- Investigation : radiographies ; nerf médian. — *Patel et coll., 2021, American Family Physician ; Lameijer et coll., 2026, European Journal of Trauma and Emergency Surgery ; Kamal et coll., 2022, Journal of the American Academy of Orthopaedic Surgeons ; Garg et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41980835)*
- Traitement : alignement acceptable (bascule < 10°, raccourcissement ≤ 2 mm) : plâtre antébrachial 3 sem (non déplacée) ou 4 sem (réduite). Après 65 ans, la chirurgie n'améliore pas les résultats rapportés. — *Patel et coll., 2021, American Family Physician ; Lameijer et coll., 2026, European Journal of Trauma and Emergency Surgery ; Kamal et coll., 2022, Journal of the American Academy of Orthopaedic Surgeons ; Garg et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41980835)*
- Suivi : radiographie à 7–14 j ; bilan d'ostéoporose. — *Patel et coll., 2021, American Family Physician ; Lameijer et coll., 2026, European Journal of Trauma and Emergency Surgery ; Kamal et coll., 2022, Journal of the American Academy of Orthopaedic Surgeons ; Garg et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41980835)*
- Retour / référence : fracture instable ou articulaire déplacée → orthopédie. — *Patel et coll., 2021, American Family Physician ; Lameijer et coll., 2026, European Journal of Trauma and Emergency Surgery ; Kamal et coll., 2022, Journal of the American Academy of Orthopaedic Surgeons ; Garg et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41980835)*
- Investigation : confirmer l'absence de rupture corticale. — *Perry et coll., 2022, Lancet (PMID 35780790) ; Patel et coll., 2021, American Family Physician ; Money et coll., 2022, Pediatrics*
- Traitement : attelle amovible 3 sem ou bandage souple. — *Perry et coll., 2022, Lancet (PMID 35780790) ; Patel et coll., 2021, American Family Physician ; Money et coll., 2022, Pediatrics*
- Suivi : ni visite ni radiographie de contrôle. — *Perry et coll., 2022, Lancet (PMID 35780790) ; Patel et coll., 2021, American Family Physician ; Money et coll., 2022, Pediatrics*

## Fracture du scaphoïde

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 3 %, 30 ans 2 %, 60 ans 1 % ; homme ×1,5, femme ×0,6.

Repères publiés : 22/100 000 ; 60–90 % des fractures du carpe ; 16–25 % des fractures sont occultes à la première radiographie (A, H).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>scaphoide` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>scaphoide` | Main atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.glisse>scaphoide` | Activités physiques : Ski ou planche | — | — | 1,5 / 1 | provisoire | — |
| `duree>scaphoide` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 1,2 | provisoire | — |
| `apparition>scaphoide` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 | provisoire | — |
| `mecanisme>scaphoide` | Mécanisme | — | — | Chute sur la main tendue (poignet en extension) 3 | provisoire | — |
| `localisation.radiale>scaphoide` | Où est la douleur : Côté du pouce du poignet (styloïde radiale, tabatière) | — | — | 4 / 0,3 | provisoire | — |
| `localisation.palmaire>scaphoide` | Où est la douleur : Face palmaire du poignet | — | — | 1,3 / 0,9 | provisoire | — |
| `appui_poignet_agg>scaphoide` | Pire en appui sur le poignet (pousser, se relever, push-up) | — | — | 1,5 / 0,8 | provisoire | — |
| `p_radius_distal>scaphoide` | Radius distal douloureux | — | — | 1,3 / 0,9 | provisoire | — |
| `p_tabatiere>scaphoide` | Tabatière anatomique douloureuse | 96 % | 39 % | 1,57 / 0,1 | verifie | Carpenter et Raja, Occult Scaphoid Fractures (chapitre 16) : RV+ 1,5 ; RV− 0,15 |
| `p_tubercule_scaph>scaphoide` | Tubercule du scaphoïde douloureux | — | — | 2 / 0,3 | provisoire | — |
| `p_styloide_radiale>scaphoide` | Premier compartiment (styloïde radiale) douloureux ou épaissi | — | — | 1,3 / 0,9 | provisoire | — |
| `arom_poignet>scaphoide` | Mobilité du poignet (flexion, extension) | — | — | Limitée avec douleur 1,5 | provisoire | — |
| `dorsiflexion_douleur>scaphoide` | Dorsiflexion du poignet douloureuse | — | — | 1,3 / 0,5 | provisoire | — |
| `pronosup_res>scaphoide` | Prono-supination résistée douloureuse | — | — | 10 / 0,2 | a_verifier | Coventry et coll., 2023, EMJ (fracture occulte du scaphoïde, étude unique) : Se 100 %, Sp 97,9 %, RV+ 45 (6,5–312) ; plafonné à 10 en attendant une confirmation |
| `compression_pouce>scaphoide` | Compression axiale du pouce (scaphoïde) | 82 % | 58 % | 1,95 / 0,31 | verifie | Carpenter et Raja, Occult Scaphoid Fractures (chapitre 16) : RV+ 2,0 ; RV− 0,24 |
| `grappe:scaph_neg>scaphoide` | Combinaison : Tabatière, tubercule du scaphoïde et compression axiale tous indolores | — | — | — / 0,05 | verifie | Suh et Grewal, 2018, J Hand Surg Eur (scaphoïde, examen à moins de 24 h) : combinés dans les 24 h, Se 100 %, Sp 74 % (RV− non calculable, plafonné à 0,05) |

Conduite :
- Investigation : suspicion avec radiographies normales : immobilisation et radiographie à 10–14 j, ou IRM précoce. — *Dunleavy et coll., 2025, Current Reviews in Musculoskeletal Medicine ; Gray et coll., 2023, Journal of Hand Surgery, European Volume ; Wouter et coll., 2015, Cochrane Database of Systematic Reviews ; Li et coll., 2023, Journal of the American Academy of Orthopaedic Surgeons (PMID 37332224) ; Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Winston et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Traitement : non déplacée : plâtre antébrachial 6 sem, puis TDM. — *Dunleavy et coll., 2025, Current Reviews in Musculoskeletal Medicine ; Gray et coll., 2023, Journal of Hand Surgery, European Volume ; Wouter et coll., 2015, Cochrane Database of Systematic Reviews ; Li et coll., 2023, Journal of the American Academy of Orthopaedic Surgeons (PMID 37332224) ; Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Winston et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : fracture déplacée, pôle proximal, présentation tardive → chirurgie de la main. — *Dunleavy et coll., 2025, Current Reviews in Musculoskeletal Medicine ; Gray et coll., 2023, Journal of Hand Surgery, European Volume ; Wouter et coll., 2015, Cochrane Database of Systematic Reviews ; Li et coll., 2023, Journal of the American Academy of Orthopaedic Surgeons (PMID 37332224) ; Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine ; Winston et coll., 2017, Current Reviews in Musculoskeletal Medicine*

## Luxation péri-lunaire

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 0 %, 50 ans 0 % ; homme ×2, femme ×0,5.

Repères publiés : Pas de donnée retrouvée ; à ne pas manquer (†).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>perilunaire` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>perilunaire` | Main atteinte | — | — | Les deux 0,05 | provisoire | — |
| `duree>perilunaire` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,5 ; Plus de 3 mois 0,02 | provisoire | — |
| `apparition>perilunaire` | Mode d'apparition | — | — | Subit, avec un traumatisme 8 | provisoire | — |
| `mecanisme>perilunaire` | Mécanisme | — | — | Chute sur la main tendue (poignet en extension) 2 | provisoire | — |
| `doigts_froids>perilunaire` | Doigts froids, pâles ou engourdis après le traumatisme | — | — | 4 / 0,9 | provisoire | — |
| `ex_deformation>perilunaire` | Déformation du poignet (en dos de fourchette) ou du doigt | — | — | 4 / 0,6 | provisoire | — |
| `p_lunatum>perilunaire` | Lunatum douloureux (centre du dos du poignet) | — | — | 2 / 0,8 | provisoire | — |
| `pouls_dim>perilunaire` | Pouls radial diminué ou recoloration lente | — | — | 3 / 0,95 | provisoire | — |

Conduite :
- Investigation : profil vrai ; nerf médian (atteint dans un tiers des cas). — *Rettig, 2003, American Journal of Sports Medicine ; Heineman et coll., 2023, Journal of Hand Surgery, European Volume ; Patel et coll., 2024, Annals of Plastic Surgery (PMID 39331744)*
- Traitement : urgence : réduction et chirurgie. — *Rettig, 2003, American Journal of Sports Medicine ; Heineman et coll., 2023, Journal of Hand Surgery, European Volume ; Patel et coll., 2024, Annals of Plastic Surgery (PMID 39331744)*

## Kyste synovial (poignet ou doigt)

Probabilité de départ (provisoire) : 12 ans 4 %, 30 ans 5 %, 50 ans 4 %, 70 ans 3 % ; femme ×1,5, homme ×0,7.

Repères publiés : 2–3/1 000/an en médecine générale (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>kyste` | Main atteinte | — | — | Les deux 0,3 | provisoire | — |
| `duree>kyste` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>kyste` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Subit, sans traumatisme 1,3 ; Graduel 1,5 | provisoire | — |
| `localisation.dorsale>kyste` | Où est la douleur : Dos du poignet (centre) | — | — | 3 / 0,5 | provisoire | — |
| `localisation.palmaire>kyste` | Où est la douleur : Face palmaire du poignet | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.dos_main>kyste` | Où est la douleur : Dos de la main (métacarpiens) | — | — | 1,3 / 0,9 | provisoire | — |
| `appui_poignet_agg>kyste` | Pire en appui sur le poignet (pousser, se relever, push-up) | — | — | 1,5 / 0,8 | provisoire | — |
| `masse>kyste` | Bosse ou masse visible | — | — | 12 / 0,2 | provisoire | — |
| `ex_kyste>kyste` | Masse ferme, lisse, qui transillumine | — | — | 20 / 0,3 | provisoire | — |
| `p_scapholunaire>kyste` | Intervalle scapho-lunaire (dos du poignet) douloureux | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Traitement : observation (plus de 50 % se résorbent) ; récidive de 59 % après ponction. Chez l'enfant, observer. — *Head et coll., 2015, Journal of Hand Surgery (PMID 25708437) ; Shanks et coll., 2022, Journal of Hand Surgery (PMID 35168830)*
- Investigation : clinique ; kyste mucoïde : radiographie (arthrose de l'interphalangienne distale). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Childress et al., « Common Finger Fractures and Dislocations », American Family Physician, 2022 ; Hilgefort et al., « Fingertip Injuries », American Family Physician, 2025 ; Dinh et al., « Approach to Mallet Finger Injury: Practical Guide for Canadian Primary Care Physicians », Canadian Family Physician, 2026 ; Currie et al., « Common Hand Conditions: A Review », JAMA, 2022 ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Atthakomol et al., Clinical Orthopaedics and Related Research, 2023 ; Lambi et al., « Metacarpal fractures », Journal of Hand Surgery (European Volume), 2023 ; Stevens et al., « Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections », Infectious Diseases Society of America, 2014 ; Dean et al., guide BSSH sur le ligament collatéral ulnaire du pouce, Journal of Hand Surgery (European Volume), 2024 ; Rooth et al., « Dupuytren's disease: a state-of-the-art review », Journal of Hand Surgery (European Volume), 2026 ; Kiely et al., Journal of Hand Surgery, 2022 ; Rask et al., Pediatric Emergency Care, 2021 ; Mehta et al., American Journal of Emergency Medicine, 2024 ; Idarrha et al., Injury, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Traitement : observation ; ne pas percer un kyste mucoïde (risque d'arthrite septique). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Childress et al., « Common Finger Fractures and Dislocations », American Family Physician, 2022 ; Hilgefort et al., « Fingertip Injuries », American Family Physician, 2025 ; Dinh et al., « Approach to Mallet Finger Injury: Practical Guide for Canadian Primary Care Physicians », Canadian Family Physician, 2026 ; Currie et al., « Common Hand Conditions: A Review », JAMA, 2022 ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Atthakomol et al., Clinical Orthopaedics and Related Research, 2023 ; Lambi et al., « Metacarpal fractures », Journal of Hand Surgery (European Volume), 2023 ; Stevens et al., « Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections », Infectious Diseases Society of America, 2014 ; Dean et al., guide BSSH sur le ligament collatéral ulnaire du pouce, Journal of Hand Surgery (European Volume), 2024 ; Rooth et al., « Dupuytren's disease: a state-of-the-art review », Journal of Hand Surgery (European Volume), 2026 ; Kiely et al., Journal of Hand Surgery, 2022 ; Rask et al., Pediatric Emergency Care, 2021 ; Mehta et al., American Journal of Emergency Medicine, 2024 ; Idarrha et al., Injury, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Suivi : au besoin. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Childress et al., « Common Finger Fractures and Dislocations », American Family Physician, 2022 ; Hilgefort et al., « Fingertip Injuries », American Family Physician, 2025 ; Dinh et al., « Approach to Mallet Finger Injury: Practical Guide for Canadian Primary Care Physicians », Canadian Family Physician, 2026 ; Currie et al., « Common Hand Conditions: A Review », JAMA, 2022 ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Atthakomol et al., Clinical Orthopaedics and Related Research, 2023 ; Lambi et al., « Metacarpal fractures », Journal of Hand Surgery (European Volume), 2023 ; Stevens et al., « Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections », Infectious Diseases Society of America, 2014 ; Dean et al., guide BSSH sur le ligament collatéral ulnaire du pouce, Journal of Hand Surgery (European Volume), 2024 ; Rooth et al., « Dupuytren's disease: a state-of-the-art review », Journal of Hand Surgery (European Volume), 2026 ; Kiely et al., Journal of Hand Surgery, 2022 ; Rask et al., Pediatric Emergency Care, 2021 ; Mehta et al., American Journal of Emergency Medicine, 2024 ; Idarrha et al., Injury, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*
- Retour / référence : douleur, déformation de l'ongle, écoulement ou infection → chirurgie de la main. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Childress et al., « Common Finger Fractures and Dislocations », American Family Physician, 2022 ; Hilgefort et al., « Fingertip Injuries », American Family Physician, 2025 ; Dinh et al., « Approach to Mallet Finger Injury: Practical Guide for Canadian Primary Care Physicians », Canadian Family Physician, 2026 ; Currie et al., « Common Hand Conditions: A Review », JAMA, 2022 ; Kolasinski et al., « 2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee », 2020 ; Atthakomol et al., Clinical Orthopaedics and Related Research, 2023 ; Lambi et al., « Metacarpal fractures », Journal of Hand Surgery (European Volume), 2023 ; Stevens et al., « Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections », Infectious Diseases Society of America, 2014 ; Dean et al., guide BSSH sur le ligament collatéral ulnaire du pouce, Journal of Hand Surgery (European Volume), 2024 ; Rooth et al., « Dupuytren's disease: a state-of-the-art review », Journal of Hand Surgery (European Volume), 2026 ; Kiely et al., Journal of Hand Surgery, 2022 ; Rask et al., Pediatric Emergency Care, 2021 ; Mehta et al., American Journal of Emergency Medicine, 2024 ; Idarrha et al., Injury, 2026 ; FitzGerald et al., « 2020 American College of Rheumatology Guideline for the Management of Gout », 2020.*

## Ténosynovite de De Quervain

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 5 %, 50 ans 6 %, 70 ans 3 % ; femme ×2, homme ×0,4.

Repères publiés : 2,8 (femmes) et 0,6 (hommes)/1 000 personnes-années (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `travail>dequervain` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,3 | provisoire | — |
| `grossesse>dequervain` | Grossesse ou post-partum (moins d'un an) | — | — | 4 / 0,95 | provisoire | — |
| `duree>dequervain` | Depuis combien de temps | — | — | 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>dequervain` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 1,2 ; Graduel 2 | provisoire | — |
| `localisation.radiale>dequervain` | Où est la douleur : Côté du pouce du poignet (styloïde radiale, tabatière) | — | — | 5 / 0,2 | provisoire | — |
| `localisation.base_pouce>dequervain` | Où est la douleur : Base du pouce | — | — | 2 / 0,6 | provisoire | — |
| `pince_agg>dequervain` | Pire en pinçant, en tournant une clé ou en ouvrant un pot | — | — | 2 / 0,5 | provisoire | — |
| `moment>dequervain` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `p_styloide_radiale>dequervain` | Premier compartiment (styloïde radiale) douloureux ou épaissi | — | — | 5 / 0,1 | provisoire | — |
| `p_base_pouce>dequervain` | Trapézo-métacarpienne douloureuse | — | — | 1,3 / 0,9 | provisoire | — |
| `finkelstein>dequervain` | Finkelstein | — | — | 5 / 0,3 | a_verifier | Sp 100 % sur 72 poignets ; sensibilité incertaine |
| `what_test>dequervain` | WHAT test (hyperflexion du poignet, abduction résistée du pouce) | 99 % | 29 % | 1,39 / 0,03 | verifie | Goubau et coll., 2014, J Hand Surg Eur (WHAT test, n = 100) : RV− 0,03 (calculé) |

Conduite :
- Investigation : Finkelstein. — *Challoumas et coll., 2023, JAMA Network Open ; Currie et coll., 2022, JAMA*
- Traitement : infiltration avec attelle du pouce 3–4 sem (succès 90 % contre 66 % pour l'infiltration seule). — *Challoumas et coll., 2023, JAMA Network Open ; Currie et coll., 2022, JAMA*
- Retour / référence : échec à 6 sem → chirurgie. — *Challoumas et coll., 2023, JAMA Network Open ; Currie et coll., 2022, JAMA*

## Autre ténosynovite du poignet (extenseur ulnaire du carpe, intersection)

Probabilité de départ (provisoire) : 12 ans 2 %, 30 ans 4 %, 50 ans 4 %, 70 ans 3 %.

Repères publiés : 15,8 % des diagnostics main-poignet en médecine générale ; extenseur ulnaire du carpe : 2ᵉ ténosynovite du sportif (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `travail>tenosynovite` | Occupation | — | — | Travail de bureau ou sédentaire 1,2 ; Travail physique (charges, manutention) 1,3 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `sport.raquette>tenosynovite` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 2 / 1 | provisoire | — |
| `sport.muscu>tenosynovite` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,5 / 1 | provisoire | — |
| `sport.golf>tenosynovite` | Activités physiques : Golf | — | — | 1,5 / 1 | provisoire | — |
| `duree>tenosynovite` | Depuis combien de temps | — | — | 1 à 6 semaines 1,3 | provisoire | — |
| `apparition>tenosynovite` | Mode d'apparition | — | — | Graduel 2 | provisoire | — |
| `mecanisme>tenosynovite` | Mécanisme | — | — | Torsion du poignet ou appui en rotation 1,5 | provisoire | — |
| `localisation.radiale>tenosynovite` | Où est la douleur : Côté du pouce du poignet (styloïde radiale, tabatière) | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.dorsale>tenosynovite` | Où est la douleur : Dos du poignet (centre) | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.ulnaire>tenosynovite` | Où est la douleur : Côté de l'auriculaire du poignet | — | — | 2 / 0,6 | provisoire | — |
| `pronosup_agg>tenosynovite` | Pire en tournant l'avant-bras (tournevis, poignée de porte) | — | — | 1,5 / 0,8 | provisoire | — |
| `p_ecu>tenosynovite` | Extenseur ulnaire du carpe douloureux | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Traitement : repos relatif, attelle, AINS ; atteinte multiple : rechercher une polyarthrite. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Fiches de la partie F (pas d'aide-mémoire détaillé pour le poignet dans le document).*
- Traitement : tendinopathie : attelle, AINS ; subluxation aiguë : immobilisation 6–8 sem. — *Gil et coll., 2019, Current Reviews in Musculoskeletal Medicine ; Pang et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Traitement : attelle en extension, AINS 2–3 sem ; infiltration si échec. — *Pujalte et coll., 2024, American Family Physician ; Gil et coll., 2019, Current Reviews in Musculoskeletal Medicine*

## Arthrose du poignet (SLAC, SNAC, STT)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 1 %, 60 ans 2 %, 80 ans 2 % ; homme ×1,5, femme ×0,7.

Repères publiés : Prévalence 1,0–1,7 % (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>arthrose_poignet` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `travail>arthrose_poignet` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `duree>arthrose_poignet` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>arthrose_poignet` | Mode d'apparition | — | — | Insidieux 3 | provisoire | — |
| `localisation.radiale>arthrose_poignet` | Où est la douleur : Côté du pouce du poignet (styloïde radiale, tabatière) | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.dorsale>arthrose_poignet` | Où est la douleur : Dos du poignet (centre) | — | — | 2 / 0,6 | provisoire | — |
| `type_douleur>arthrose_poignet` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `arom_poignet>arthrose_poignet` | Mobilité du poignet (flexion, extension) | — | — | Complète et indolore 0,3 ; Limitée par raideur 4 | provisoire | — |

Conduite :
- Investigation : radiographies. — *Mohammed et coll., 2026, Cochrane Database of Systematic Reviews ; Boever et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Traitement : attelle, AINS, physiothérapie, infiltration ; essai de 3–6 mois. — *Mohammed et coll., 2026, Cochrane Database of Systematic Reviews ; Boever et coll., 2026, Archives of Orthopaedic and Trauma Surgery*
- Retour / référence : échec → chirurgie de la main. — *Mohammed et coll., 2026, Cochrane Database of Systematic Reviews ; Boever et coll., 2026, Archives of Orthopaedic and Trauma Surgery*

## Lésion du TFCC ou instabilité radio-ulnaire distale

Probabilité de départ (provisoire) : 12 ans 1 %, 25 ans 3 %, 50 ans 3 %, 70 ans 2 %.

Repères publiés : 42 % des douleurs post-traumatiques du poignet à radiographies normales (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>tfcc` | Main atteinte | — | — | Les deux 0,3 | provisoire | — |
| `sport.raquette>tfcc` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,5 / 1 | provisoire | — |
| `sport.muscu>tfcc` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,3 / 1 | provisoire | — |
| `duree>tfcc` | Depuis combien de temps | — | — | 1 à 6 semaines 1,2 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>tfcc` | Mode d'apparition | — | — | Subit, avec un traumatisme 2 ; Graduel 1,3 | provisoire | — |
| `mecanisme>tfcc` | Mécanisme | — | — | Chute sur la main tendue (poignet en extension) 1,5 ; Torsion du poignet ou appui en rotation 3 ; Coup de bâton, de raquette ou de golf (sol) 1,3 | provisoire | — |
| `localisation.ulnaire>tfcc` | Où est la douleur : Côté de l'auriculaire du poignet | — | — | 6 / 0,2 | provisoire | — |
| `pince_agg>tfcc` | Pire en pinçant, en tournant une clé ou en ouvrant un pot | — | — | 1,5 / 0,8 | provisoire | — |
| `appui_poignet_agg>tfcc` | Pire en appui sur le poignet (pousser, se relever, push-up) | — | — | 2,5 / 0,5 | provisoire | — |
| `pronosup_agg>tfcc` | Pire en tournant l'avant-bras (tournevis, poignée de porte) | — | — | 3 / 0,4 | provisoire | — |
| `p_ecu>tfcc` | Extenseur ulnaire du carpe douloureux | — | — | 1,3 / 0,9 | provisoire | — |
| `arom_poignet>tfcc` | Mobilité du poignet (flexion, extension) | — | — | Limitée avec douleur 1,3 | provisoire | — |
| `pronosup_res>tfcc` | Prono-supination résistée douloureuse | — | — | 2 / 0,7 | provisoire | — |
| `fovea>tfcc` | Ulnar fovea sign | — | — | 3 / 0,15 | a_verifier | Tay et coll., 2007, J Hand Surg (ulnar fovea sign, n = 272) : RV+ 7,1 ; Ou Yang et coll., 2021, ANZ J Surg (prospectif, n = 110) : RV+ 1,7 (calculés) |
| `ballottement_druj>tfcc` | Ballottement radio-ulnaire distal | 59 % | 96 % | 14,75 / 0,43 | verifie | Kraan et coll., 2026, J Hand Surg Eur : instabilité radio-ulnaire distale |

Conduite :
- Investigation : douleur ulnaire ; IRM si persistance. — *Xiao et coll., 2021, Bone & Joint Journal (PMID 34334041) ; Lim et coll., 2024, Journal of Hand Surgery, European Volume*
- Traitement : attelle brachio-antébrachiale 6 sem (bon résultat 76 % contre 29 % avec attelle courte). — *Xiao et coll., 2021, Bone & Joint Journal (PMID 34334041) ; Lim et coll., 2024, Journal of Hand Surgery, European Volume*
- Retour / référence : instabilité radio-ulnaire distale d'emblée ; symptômes ≥ 3–6 mois. — *Xiao et coll., 2021, Bone & Joint Journal (PMID 34334041) ; Lim et coll., 2024, Journal of Hand Surgery, European Volume*
- Investigation : radiographies (variance ulnaire). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Fiches de la partie F (pas d'aide-mémoire détaillé pour le poignet dans le document).*
- Traitement : attelle, modification des activités. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Fiches de la partie F (pas d'aide-mémoire détaillé pour le poignet dans le document).*

## Lésion du ligament scapho-lunaire

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 1 %, 50 ans 1 %, 70 ans 1 % ; homme ×1,5, femme ×0,7.

Repères publiés : Associée à environ un tiers des fractures du radius distal (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>scapholunaire` | Main atteinte | — | — | Les deux 0,2 | provisoire | — |
| `duree>scapholunaire` | Depuis combien de temps | — | — | 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>scapholunaire` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 | provisoire | — |
| `mecanisme>scapholunaire` | Mécanisme | — | — | Chute sur la main tendue (poignet en extension) 2,5 ; Torsion du poignet ou appui en rotation 1,5 | provisoire | — |
| `localisation.dorsale>scapholunaire` | Où est la douleur : Dos du poignet (centre) | — | — | 4 / 0,4 | provisoire | — |
| `appui_poignet_agg>scapholunaire` | Pire en appui sur le poignet (pousser, se relever, push-up) | — | — | 2,5 / 0,6 | provisoire | — |
| `p_scapholunaire>scapholunaire` | Intervalle scapho-lunaire (dos du poignet) douloureux | — | — | 3 / 0,4 | provisoire | — |
| `p_lunatum>scapholunaire` | Lunatum douloureux (centre du dos du poignet) | — | — | 1,5 / 0,8 | provisoire | — |
| `watson>scapholunaire` | Watson (scaphoid shift) | 69 % | 66 % | 2,03 / 0,47 | verifie | Test de Watson (scaphoid shift) : Se 69 %, Sp 66 % |

Conduite :
- Investigation : diastasis > 3 mm, angle > 70°, cliché poing serré. — *Morrell et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Goorens et coll., 2026, Journal of Hand Surgery, European Volume ; Mathoulin et coll., 2017, Journal of Hand Surgery, European Volume*
- Retour / référence : chirurgie de la main rapidement (réparation aiguë supérieure). — *Morrell et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Goorens et coll., 2026, Journal of Hand Surgery, European Volume ; Mathoulin et coll., 2017, Journal of Hand Surgery, European Volume*

## Poignet du gymnaste (stress de la physe radiale)

Probabilité de départ (provisoire) : 12 ans 2 %, 15 ans 2 %, 18 ans 0 %, 22 ans 0 %.

Repères publiés : Douleur du poignet chez 46–79 % des gymnastes (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>gymnaste` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.danse>gymnaste` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,5 / 1 | provisoire | — |
| `duree>gymnaste` | Depuis combien de temps | — | — | 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 1,5 | provisoire | — |
| `apparition>gymnaste` | Mode d'apparition | — | — | Graduel 2,5 | provisoire | — |
| `localisation.dorsale>gymnaste` | Où est la douleur : Dos du poignet (centre) | — | — | 4 / 0,4 | provisoire | — |
| `appui_poignet_agg>gymnaste` | Pire en appui sur le poignet (pousser, se relever, push-up) | — | — | 4 / 0,4 | provisoire | — |
| `p_radius_distal>gymnaste` | Radius distal douloureux | — | — | 3 / 0,5 | provisoire | — |
| `arom_poignet>gymnaste` | Mobilité du poignet (flexion, extension) | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Investigation : radiographies (physe élargie). — *Lintner et coll., 2023, American Family Physician ; Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine*
- Traitement : arrêt des appuis 4–8 sem, attelle, reprise à 25 % du volume. — *Lintner et coll., 2023, American Family Physician ; Watkins et coll., 2022, Current Reviews in Musculoskeletal Medicine*

## Fracture de l'hamulus de l'hamatum

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 0 %, 50 ans 0 % ; homme ×2, femme ×0,5.

Repères publiés : 2–4 % des fractures du carpe ; golf, raquette, bâton (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>hamatum` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>hamatum` | Main atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.raquette>hamatum` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 3 / 1 | provisoire | — |
| `sport.golf>hamatum` | Activités physiques : Golf | — | — | 5 / 1 | provisoire | — |
| `duree>hamatum` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 | provisoire | — |
| `apparition>hamatum` | Mode d'apparition | — | — | Subit, avec un traumatisme 4 | provisoire | — |
| `mecanisme>hamatum` | Mécanisme | — | — | Coup de bâton, de raquette ou de golf (sol) 8 | provisoire | — |
| `localisation.ulnaire>hamatum` | Où est la douleur : Côté de l'auriculaire du poignet | — | — | 2 / 0,7 | provisoire | — |
| `localisation.palmaire>hamatum` | Où est la douleur : Face palmaire du poignet | — | — | 2 / 0,8 | provisoire | — |
| `localisation.paume>hamatum` | Où est la douleur : Paume ou base des doigts | — | — | 1,5 / 0,9 | provisoire | — |
| `p_hamatum>hamatum` | Hamulus de l'hamatum douloureux (éminence hypothénar) | — | — | 8 / 0,2 | provisoire | — |

Conduite :
- Investigation : TDM (détection 92 % contre 10 % pour la radiographie). — *Kadar et coll., 2018, Journal of Hand Surgery, European Volume ; Pulos et coll., 2023, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : chirurgie de la main. — *Kadar et coll., 2018, Journal of Hand Surgery, European Volume ; Pulos et coll., 2023, Current Reviews in Musculoskeletal Medicine*

## Maladie de Kienböck

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 50 ans 0 % ; homme ×1,5, femme ×0,7.

Repères publiés : 0,17 % (symptomatique) des patients imagés (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>kienbock` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `travail>kienbock` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `duree>kienbock` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; 6 semaines à 3 mois 1,5 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>kienbock` | Mode d'apparition | — | — | Graduel 1,5 ; Insidieux 1,5 | provisoire | — |
| `localisation.dorsale>kienbock` | Où est la douleur : Dos du poignet (centre) | — | — | 4 / 0,4 | provisoire | — |
| `type_douleur>kienbock` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `appui_poignet_agg>kienbock` | Pire en appui sur le poignet (pousser, se relever, push-up) | — | — | 2 / 0,7 | provisoire | — |
| `p_scapholunaire>kienbock` | Intervalle scapho-lunaire (dos du poignet) douloureux | — | — | 2 / 0,7 | provisoire | — |
| `p_lunatum>kienbock` | Lunatum douloureux (centre du dos du poignet) | — | — | 4 / 0,3 | provisoire | — |
| `arom_poignet>kienbock` | Mobilité du poignet (flexion, extension) | — | — | Limitée avec douleur 1,5 ; Limitée par raideur 2 | provisoire | — |

Conduite :
- Investigation : IRM (radiographies normales au début). — *Lichtman et coll., 2025, Journal of Bone and Joint Surgery (PMID 40338997)*
- Retour / référence : chirurgie de la main. — *Lichtman et coll., 2025, Journal of Bone and Joint Surgery (PMID 40338997)*

## Neuropathie ulnaire au canal de Guyon

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 60 ans 0 %.

Repères publiés : Pas de donnée retrouvée ; cyclistes (†).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `sport.velo>guyon` | Activités physiques : Vélo | — | — | 4 / 1 | provisoire | — |
| `localisation.ulnaire>guyon` | Où est la douleur : Côté de l'auriculaire du poignet | — | — | 2 / 0,7 | provisoire | — |
| `type_douleur>guyon` | Type de douleur | — | — | Brûlure 2 | provisoire | — |
| `paresthesies_ulnaires>guyon` | Engourdissements de l'auriculaire et de l'annulaire | — | — | 5 / 0,3 | provisoire | — |
| `ex_atrophie>guyon` | Atrophie thénarienne ou des interosseux | — | — | 3 / 0,9 | provisoire | — |
| `p_hamatum>guyon` | Hamulus de l'hamatum douloureux (éminence hypothénar) | — | — | 2 / 0,7 | provisoire | — |
| `hypo_ulnaire>guyon` | Hypoesthésie de l'auriculaire | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Investigation : EMG. — *Silver et coll., 2021, American Family Physician ; Earp et coll., 2014, Journal of the American Academy of Orthopaedic Surgeons (PMID 25344595)*
- Traitement : rembourrage, modification de l'appui ; pas d'infiltration. — *Silver et coll., 2021, American Family Physician ; Earp et coll., 2014, Journal of the American Academy of Orthopaedic Surgeons (PMID 25344595)*
- Retour / référence : déficit moteur, masse, échec à 2–4 mois. — *Silver et coll., 2021, American Family Physician ; Earp et coll., 2014, Journal of the American Academy of Orthopaedic Surgeons (PMID 25344595)*

## Arthrose digitale (nodules d'Heberden et de Bouchard)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 3 %, 55 ans 12 %, 70 ans 20 %, 85 ans 22 % ; femme ×1,4, homme ×0,7.

Repères publiés : Symptomatique 12,4 %, radiographique 41,4 % (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>arthrose_digitale` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>arthrose_digitale` | Main atteinte | — | — | Les deux 3 | provisoire | — |
| `duree>arthrose_digitale` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>arthrose_digitale` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,1 ; Insidieux 3 | provisoire | — |
| `localisation.doigts>arthrose_digitale` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 5 / 0,2 | provisoire | — |
| `type_douleur>arthrose_digitale` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `pince_agg>arthrose_digitale` | Pire en pinçant, en tournant une clé ou en ouvrant un pot | — | — | 1,3 / 0,9 | provisoire | — |
| `moment>arthrose_digitale` | Horaire | — | — | Pire le matin, mieux en bougeant 1,2 ; Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `raideur>arthrose_digitale` | Raideur matinale | — | — | Moins de 30 minutes 1,3 | provisoire | — |
| `masse>arthrose_digitale` | Bosse ou masse visible | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure>arthrose_digitale` | Enflure | — | — | 0,8 / 1,05 | provisoire | — |
| `ex_nodules>arthrose_digitale` | Nodules d'Heberden ou de Bouchard (élargissement osseux) | — | — | 8 / 0,2 | a_verifier | Critères cliniques ACR (Altman, 1990 ; élargissement osseux ≥ 2 articulations, etc.) : Se 92 %, Sp 98 % pour l'ensemble des critères |
| `ex_synovite>arthrose_digitale` | Synovite (articulations gonflées et molles : MCP, IPP, poignet) | — | — | 0,5 / 1,1 | provisoire | — |
| `raideur_doigts>arthrose_digitale` | Mobilité des doigts réduite (poing incomplet) | — | — | 2 / 0,6 | provisoire | — |

Conduite :
- Investigation : clinique ; radiographie si doute ; forme inflammatoire ou érosive, atteinte des métacarpo-phalangiennes ou synovite → exclure polyarthrite rhumatoïde, arthrite psoriasique, goutte. — *Bernard, 2018, Nature Reviews ; Kolasinski et coll., 2020, Arthritis Care & Research ; Favero et coll., 2022, Nature Reviews*
- Traitement : éducation et ergonomie, exercices de la main, orthèses, diclofénac topique en premier choix, AINS oral en courte cure, acétaminophène au besoin ; l'hydroxychloroquine est inefficace. — *Bernard, 2018, Nature Reviews ; Kolasinski et coll., 2020, Arthritis Care & Research ; Favero et coll., 2022, Nature Reviews*
- Suivi : 3 mois. — *Bernard, 2018, Nature Reviews ; Kolasinski et coll., 2020, Arthritis Care & Research ; Favero et coll., 2022, Nature Reviews*
- Retour / référence : synovite ou doute diagnostique → rhumatologie ; douleur ou déformation invalidante malgré le traitement → chirurgie de la main. — *Bernard, 2018, Nature Reviews ; Kolasinski et coll., 2020, Arthritis Care & Research ; Favero et coll., 2022, Nature Reviews*

## Rhizarthrose (arthrose trapézo-métacarpienne)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 2 %, 55 ans 8 %, 70 ans 10 % ; femme ×1,6, homme ×0,6.

Repères publiés : Douloureuse chez 2,5 % des hommes et 4,6 % des femmes de 25–64 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>rhizarthrose` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>rhizarthrose` | Main atteinte | — | — | Les deux 1,5 | provisoire | — |
| `travail>rhizarthrose` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,3 | provisoire | — |
| `duree>rhizarthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>rhizarthrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 3 | provisoire | — |
| `localisation.base_pouce>rhizarthrose` | Où est la douleur : Base du pouce | — | — | 6 / 0,2 | provisoire | — |
| `pince_agg>rhizarthrose` | Pire en pinçant, en tournant une clé ou en ouvrant un pot | — | — | 3 / 0,3 | provisoire | — |
| `moment>rhizarthrose` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `raideur>rhizarthrose` | Raideur matinale | — | — | Moins de 30 minutes 1,2 | provisoire | — |
| `p_base_pouce>rhizarthrose` | Trapézo-métacarpienne douloureuse | — | — | 4 / 0,2 | provisoire | — |
| `pressure_shear>rhizarthrose` | Pressure-shear (trapézo-métacarpienne) | — | — | 19,8 / 0,01 | verifie | Sela et coll., 2019, J Hand Ther (pressure-shear) : Se 99 %, Sp 95 % (calculés) |
| `grind>rhizarthrose` | Grind test du pouce | 44 % | 92 % | 5,5 / 0,61 | verifie | Gelberman et coll., 2015, J Hand Surg (rhizarthrose, n = 129) : RV+ 5,5 (calculé) |

Conduite :
- Investigation : douleur à la base du pouce, test de compression axiale avec rotation (grind test) ; radiographie. — *Kolasinski et coll., 2020, Arthritis Care & Research ; Currie et coll., 2022, JAMA*
- Traitement : éducation et protection articulaire, orthèse du pouce (recommandation forte de l'ACR ; effet sur la douleur surtout après 3 mois), diclofénac topique, exercices ; AINS oral en courte cure ; infiltration de corticoïde à bénéfice bref. — *Kolasinski et coll., 2020, Arthritis Care & Research ; Currie et coll., 2022, JAMA*
- Suivi : 3 mois. — *Kolasinski et coll., 2020, Arthritis Care & Research ; Currie et coll., 2022, JAMA*
- Retour / référence : échec du traitement conservateur → chirurgie de la main. — *Kolasinski et coll., 2020, Arthritis Care & Research ; Currie et coll., 2022, JAMA*

## Doigt à ressaut

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 3 %, 60 ans 5 %, 80 ans 3 % ; femme ×1,5, homme ×0,7.

Repères publiés : Prévalence environ 2 % ; 5,8–20 % chez le diabétique (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ressaut` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `travail>ressaut` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,3 | provisoire | — |
| `sport.escalade>ressaut` | Activités physiques : Escalade | — | — | 1,3 / 1 | provisoire | — |
| `diabete>ressaut` | Diabète | — | — | 3 / 0,9 | provisoire | — |
| `duree>ressaut` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>ressaut` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 1,5 ; Graduel 1,5 | provisoire | — |
| `localisation.doigts>ressaut` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 2 / 0,5 | provisoire | — |
| `localisation.paume>ressaut` | Où est la douleur : Paume ou base des doigts | — | — | 4 / 0,4 | provisoire | — |
| `accrochage_doigt>ressaut` | Doigt qui accroche ou reste bloqué en flexion | — | — | 15 / 0,2 | provisoire | — |
| `moment>ressaut` | Horaire | — | — | Pire le matin, mieux en bougeant 1,3 | provisoire | — |
| `ex_corde>ressaut` | Nodule ou corde palmaire (test de la table positif) | — | — | 1,5 / 0,9 | provisoire | — |
| `p_poulie_a1>ressaut` | Nodule douloureux à la poulie A1 (base du doigt, côté paume) | — | — | 8 / 0,2 | provisoire | — |

Conduite :
- Investigation : clinique (nodule sensible à la poulie A1, accrochage) ; rechercher diabète. — *Currie et coll., 2022, JAMA*
- Traitement : réduire les préhensions répétées ; attelle métacarpo-phalangienne en extension environ 6 sem (au moins 8 h/j), ou infiltration de la gaine (triamcinolone 10 mg avec lidocaïne ; succès d'environ 57 %, récidive d'environ 22 %, résultats moindres chez le diabétique) ; les deux options donnent des résultats comparables à 1 an. — *Currie et coll., 2022, JAMA*
- Suivi : 6 sem. — *Currie et coll., 2022, JAMA*
- Retour / référence : doigt bloqué, raideur, échec à 6 sem ou récidive → chirurgie de la main. — *Currie et coll., 2022, JAMA*

## Fracture de la main (métacarpien, phalange, Bennett)

Probabilité de départ (provisoire) : 12 ans 6 %, 20 ans 7 %, 35 ans 4 %, 65 ans 3 % ; homme ×1,6, femme ×0,6.

Repères publiés : Phalanges 125/100 000, métacarpiens 84/100 000 (5ᵉ rayon 42 %) ; fracture la plus fréquente à 18–34 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>fx_main` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>fx_main` | Main atteinte | — | — | Les deux 0,05 | provisoire | — |
| `travail>fx_main` | Occupation | — | — | Travail physique (charges, manutention) 1,2 | provisoire | — |
| `sport.contact>fx_main` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `duree>fx_main` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>fx_main` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,1 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>fx_main` | Mécanisme | — | — | Chute sur la main tendue (poignet en extension) 0,3 ; Coup de poing 6 ; Doigt coincé ou frappé au bout (ballon) 1,5 ; Pouce forcé en abduction (bâton de ski, chute) 1,5 | provisoire | — |
| `morsure>fx_main` | Plaie au-dessus d'une jointure après un coup de poing, ou morsure | — | — | 1,5 / 0,95 | provisoire | — |
| `localisation.base_pouce>fx_main` | Où est la douleur : Base du pouce | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.doigts>fx_main` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 2 / 0,6 | provisoire | — |
| `localisation.paume>fx_main` | Où est la douleur : Paume ou base des doigts | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.dos_main>fx_main` | Où est la douleur : Dos de la main (métacarpiens) | — | — | 4 / 0,4 | provisoire | — |
| `enflure>fx_main` | Enflure | — | — | 2 / 0,5 | provisoire | — |
| `ex_deformation>fx_main` | Déformation du poignet (en dos de fourchette) ou du doigt | — | — | 3 / 0,7 | provisoire | — |
| `ex_ecchymose>fx_main` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `ex_rotation>fx_main` | Doigts qui se croisent en flexion (mal rotation) | — | — | 15 / 0,7 | provisoire | — |
| `p_os_main>fx_main` | Métacarpien ou phalange douloureux (os) | — | — | 4 / 0,1 | provisoire | — |
| `raideur_doigts>fx_main` | Mobilité des doigts réduite (poing incomplet) | — | — | 2 / 0,7 | provisoire | — |

Conduite :
- Investigation : voir le bloc commun ; rechercher surtout la rotation. — *Childress et coll., 2022, American Family Physician*
- Traitement : angulation < 10° sans rotation : syndactylie 3–4 sem, mobilisation précoce ; fracture réduite : attelle en gouttière et radiographie après réduction. — *Childress et coll., 2022, American Family Physician*
- Suivi : radiographie à 7–10 j, puis toutes les 2 sem ; guérison en 4–6 sem. — *Childress et coll., 2022, American Family Physician*
- Retour / référence : rotation, fracture ouverte, intra-articulaire, oblique ou spiroïde → chirurgie de la main. — *Childress et coll., 2022, American Family Physician*
- Investigation : voir le bloc commun ; toute plaie en regard d'une articulation métacarpo-phalangienne après un coup de poing est une morsure jusqu'à preuve du contraire. — *Martínez-Catalán et coll., 2020, Journal of Hand Surgery (PMID 32718787) ; Pellatt et coll., 2019, Annals of Emergency Medicine (PMID 30853124) ; Bystritsky et coll., 2018, Annals of Internal Medicine ; Stevens et coll., 2014, Clinical Infectious Diseases ; Lambi et coll., 2023, Journal of Hand Surgery, European Volume ; Rerucha et coll., 2019, American Family Physician (PMID 30763047)*
- Traitement : col du 5ᵉ sans rotation : syndactylie et mobilisation précoce, équivalentes au plâtre ; angulation tolérée jusqu'à environ 60° selon les sources (seuils publiés de 30 à 70° ; aviser de la perte du relief de la jointure). Diaphyse non déplacée sans rotation : attelle en gouttière 3–4 sem †. Morsure : irrigation abondante, pas de fermeture primaire, tétanos, amoxicilline-clavulanate 3–5 j. — *Martínez-Catalán et coll., 2020, Journal of Hand Surgery (PMID 32718787) ; Pellatt et coll., 2019, Annals of Emergency Medicine (PMID 30853124) ; Bystritsky et coll., 2018, Annals of Internal Medicine ; Stevens et coll., 2014, Clinical Infectious Diseases ; Lambi et coll., 2023, Journal of Hand Surgery, European Volume ; Rerucha et coll., 2019, American Family Physician (PMID 30763047)*
- Suivi : radiographie à 1 sem, puis 3–4 sem. — *Martínez-Catalán et coll., 2020, Journal of Hand Surgery (PMID 32718787) ; Pellatt et coll., 2019, Annals of Emergency Medicine (PMID 30853124) ; Bystritsky et coll., 2018, Annals of Internal Medicine ; Stevens et coll., 2014, Clinical Infectious Diseases ; Lambi et coll., 2023, Journal of Hand Surgery, European Volume ; Rerucha et coll., 2019, American Family Physician (PMID 30763047)*
- Retour / référence : toute rotation, 2ᵉ ou 3ᵉ métacarpien angulé > 15°, fractures multiples, fracture ouverte ou intra-articulaire → chirurgie de la main ; morsure infectée ou atteinte articulaire → urgence (antibiotiques IV, lavage). — *Martínez-Catalán et coll., 2020, Journal of Hand Surgery (PMID 32718787) ; Pellatt et coll., 2019, Annals of Emergency Medicine (PMID 30853124) ; Bystritsky et coll., 2018, Annals of Internal Medicine ; Stevens et coll., 2014, Clinical Infectious Diseases ; Lambi et coll., 2023, Journal of Hand Surgery, European Volume ; Rerucha et coll., 2019, American Family Physician (PMID 30763047)*
- Investigation : radiographies du pouce (face, profil vrai) ; fracture articulaire instable. — *Lambi et coll., 2023, Journal of Hand Surgery, European Volume ; Li et coll., 2023, Journal of Hand Surgery, European Volume*
- Traitement : attelle du pouce, analgésie. — *Lambi et coll., 2023, Journal of Hand Surgery, European Volume ; Li et coll., 2023, Journal of Hand Surgery, European Volume*
- Retour / référence : toujours référer en chirurgie de la main dans la semaine ; une marche articulaire > 2 mm prédit l'arthrose. — *Lambi et coll., 2023, Journal of Hand Surgery, European Volume ; Li et coll., 2023, Journal of Hand Surgery, European Volume*
- Investigation : radiographies ; hématome sous-unguéal, lit unguéal. — *Childress et coll., 2022, American Family Physician ; Jennifer et coll., 2022, Pediatrics in Review ; Metcalfe et coll., 2016, Journal of Hand Surgery, European Volume*
- Traitement : attelle protectrice de l'interphalangienne distale 3–4 sem (jusqu'à 4–6 sem selon les sources) ; hématome douloureux > 50 % de l'ongle : trépanation ; lacération du lit unguéal : observation ou réparation, résultat esthétique semblable ; pas d'antibioprophylaxie. — *Childress et coll., 2022, American Family Physician ; Jennifer et coll., 2022, Pediatrics in Review ; Metcalfe et coll., 2016, Journal of Hand Surgery, European Volume*
- Suivi : 2–3 sem. — *Childress et coll., 2022, American Family Physician ; Jennifer et coll., 2022, Pediatrics in Review ; Metcalfe et coll., 2016, Journal of Hand Surgery, European Volume*
- Retour / référence : fracture déplacée, instable, atteinte > 1/3 de la surface articulaire, fracture ouverte complexe. — *Childress et coll., 2022, American Family Physician ; Jennifer et coll., 2022, Pediatrics in Review ; Metcalfe et coll., 2016, Journal of Hand Surgery, European Volume*

## Entorse ou luxation interphalangienne (dont boutonnière)

Probabilité de départ (provisoire) : 12 ans 4 %, 20 ans 4 %, 40 ans 2 %, 70 ans 1 % ; homme ×1,3, femme ×0,8.

Repères publiés : Entorses : 12,3 % des lésions main-poignet aux urgences (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>entorse_doigt` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>entorse_doigt` | Main atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.contact>entorse_doigt` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `sport.lancer>entorse_doigt` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 1,5 / 1 | provisoire | — |
| `duree>entorse_doigt` | Depuis combien de temps | — | — | Moins de 7 jours 3 | provisoire | — |
| `apparition>entorse_doigt` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Graduel 0,1 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>entorse_doigt` | Mécanisme | — | — | Coup de poing 0,5 ; Doigt coincé ou frappé au bout (ballon) 4 ; Doigt tiré en flexion (agrippe un chandail) 1,5 | provisoire | — |
| `localisation.doigts>entorse_doigt` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 4 / 0,3 | provisoire | — |
| `enflure>entorse_doigt` | Enflure | — | — | 2 / 0,5 | provisoire | — |
| `ex_deformation>entorse_doigt` | Déformation du poignet (en dos de fourchette) ou du doigt | — | — | 3 / 0,7 | provisoire | — |
| `ex_ecchymose>entorse_doigt` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `ex_boutonniere>entorse_doigt` | Extension active faible de l'IPP (test d'Elson) | — | — | 5 / 0,7 | provisoire | — |

Conduite :
- Investigation : radiographies avant et après réduction (fragment de la plaque palmaire) ; tester la bandelette centrale (extension active de l'interphalangienne proximale) et la stabilité latérale. — *Childress et coll., 2022, American Family Physician*
- Traitement : entorse stable : syndactylie 3–6 sem, mouvement protégé dès la première semaine. Luxation dorsale : réduction, attelle bloquant l'extension à 20–30° de flexion 2–3 sem, puis syndactylie. Luxation palmaire : attelle en extension complète 4–6 sem (risque de boutonnière). — *Childress et coll., 2022, American Family Physician*
- Suivi : toutes les 2–4 sem ; aviser que l'enflure et la raideur peuvent durer 12–18 mois. — *Childress et coll., 2022, American Family Physician*
- Retour / référence : irréductible, plaie ouverte, fragment > 30 % de la surface articulaire, luxation latérale ou instabilité → chirurgie de la main. — *Childress et coll., 2022, American Family Physician*
- Investigation : extension active faible de l'interphalangienne proximale après trauma ou luxation palmaire ; test d'Elson ; bandelette sagittale : subluxation du tendon extenseur à la flexion de la métacarpo-phalangienne. — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Carruthers et coll., 2016, Sports Health*
- Traitement : boutonnière aiguë : attelle de l'interphalangienne proximale en extension complète 4–6 sem, avec flexion active de la distale. Bandelette sagittale aiguë : attelle métacarpo-phalangienne en extension †. — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Carruthers et coll., 2016, Sports Health*
- Suivi : 2 sem. — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Carruthers et coll., 2016, Sports Health*
- Retour / référence : avulsion osseuse déplacée, lésion ouverte, déformation fixée ou échec → chirurgie de la main. — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Carruthers et coll., 2016, Sports Health*

## Maladie de Dupuytren

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 1 %, 55 ans 3 %, 70 ans 5 % ; homme ×2, femme ×0,5.

Repères publiés : 12 %, 21 % et 29 % à 55, 65 et 75 ans ; souvent indolore (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>dupuytren` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `diabete>dupuytren` | Diabète | — | — | 2 / 0,95 | provisoire | — |
| `duree>dupuytren` | Depuis combien de temps | — | — | Moins de 7 jours 0,1 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>dupuytren` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,05 ; Insidieux 3 | provisoire | — |
| `localisation.paume>dupuytren` | Où est la douleur : Paume ou base des doigts | — | — | 6 / 0,3 | provisoire | — |
| `masse>dupuytren` | Bosse ou masse visible | — | — | 2 / 0,8 | provisoire | — |
| `ex_corde>dupuytren` | Nodule ou corde palmaire (test de la table positif) | — | — | 30 / 0,1 | provisoire | — |
| `raideur_doigts>dupuytren` | Mobilité des doigts réduite (poing incomplet) | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : clinique (nodules, cordes palmaires) ; test de la table (main à plat impossible) ; mesurer la contracture. — *Jeremy et coll., 2015, Cochrane Database of Systematic Reviews ; Hurst et coll., 2009, New England Journal of Medicine*
- Traitement : observation et réassurance si nodules sans contracture ; pas d'attelle ni d'étirements efficaces. — *Jeremy et coll., 2015, Cochrane Database of Systematic Reviews ; Hurst et coll., 2009, New England Journal of Medicine*
- Suivi : 6–12 mois. — *Jeremy et coll., 2015, Cochrane Database of Systematic Reviews ; Hurst et coll., 2009, New England Journal of Medicine*
- Retour / référence : contracture métacarpo-phalangienne ≥ 30°, toute contracture interphalangienne proximale (seuil de 20° pour la BSSH), test de la table positif avec gêne fonctionnelle ou progression rapide → chirurgie de la main (aponévrotomie à l'aiguille, collagénase ou fasciectomie). — *Jeremy et coll., 2015, Cochrane Database of Systematic Reviews ; Hurst et coll., 2009, New England Journal of Medicine*

## Entorse du ligament collatéral ulnaire du pouce (pouce du skieur)

Probabilité de départ (provisoire) : 12 ans 1 %, 25 ans 2 %, 50 ans 1 %, 70 ans 0 %.

Repères publiés : Environ 50/100 000 (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>lcu_pouce` | Main atteinte | — | — | Les deux 0,05 | provisoire | — |
| `sport.glisse>lcu_pouce` | Activités physiques : Ski ou planche | — | — | 3 / 1 | provisoire | — |
| `duree>lcu_pouce` | Depuis combien de temps | — | — | Moins de 7 jours 3 | provisoire | — |
| `apparition>lcu_pouce` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 | provisoire | — |
| `mecanisme>lcu_pouce` | Mécanisme | — | — | Pouce forcé en abduction (bâton de ski, chute) 10 | provisoire | — |
| `localisation.base_pouce>lcu_pouce` | Où est la douleur : Base du pouce | — | — | 3 / 0,5 | provisoire | — |
| `pince_agg>lcu_pouce` | Pire en pinçant, en tournant une clé ou en ouvrant un pot | — | — | 2 / 0,7 | provisoire | — |
| `ex_ecchymose>lcu_pouce` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `valgus_pouce>lcu_pouce` | Stress en valgus de la MCP du pouce (laxité sans arrêt franc) | 97 % | 85 % | 6,47 / 0,04 | verifie | Rashidi et coll., 2021, Eur Radiol (méta-analyse, ligament collatéral ulnaire du pouce) : RV+ 6,5 ; RV− 0,04 (calculés) |

Conduite :
- Investigation : radiographies avant le test de stress (avulsion) ; stress en valgus en extension et à 30° de flexion, comparé au côté sain ; laxité > 30° ou différence > 15–20° sans arrêt franc = rupture complète. — *Rettig, 2004, American Journal of Sports Medicine ; Dean et coll., 2024, Journal of Hand Surgery, European Volume*
- Traitement : lésion partielle avec arrêt franc : attelle ou plâtre du pouce 4–6 sem, puis mobilisation ; effort sans restriction vers 12 sem. — *Rettig, 2004, American Journal of Sports Medicine ; Dean et coll., 2024, Journal of Hand Surgery, European Volume*
- Suivi : 2 sem, puis 6 sem. — *Rettig, 2004, American Journal of Sports Medicine ; Dean et coll., 2024, Journal of Hand Surgery, European Volume*
- Retour / référence : laxité importante, avulsion déplacée ou lésion de Stener suspectée → chirurgie de la main, décision partagée dans les 2 sem (BSSH). — *Rettig, 2004, American Journal of Sports Medicine ; Dean et coll., 2024, Journal of Hand Surgery, European Volume*

## Doigt en maillet

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 1 %, 60 ans 1 %, 80 ans 1 %.

Repères publiés : Environ 10/100 000 ; lésion tendineuse fermée la plus fréquente en sport (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>maillet` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>maillet` | Main atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.contact>maillet` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `sport.lancer>maillet` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 1,5 / 1 | provisoire | — |
| `duree>maillet` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 | provisoire | — |
| `apparition>maillet` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 | provisoire | — |
| `mecanisme>maillet` | Mécanisme | — | — | Doigt coincé ou frappé au bout (ballon) 5 | provisoire | — |
| `localisation.doigts>maillet` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 3 / 0,5 | provisoire | — |
| `ex_maillet>maillet` | Bout du doigt tombant (extension active de l'IPD impossible) | — | — | 40 / 0,1 | provisoire | — |

Conduite :
- Investigation : perte de l'extension active de l'interphalangienne distale ; radiographie de profil (avulsion osseuse, subluxation). — *Hilgefort et coll., 2025, American Family Physician ; Dinh et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41679948) ; Childress et coll., 2022, American Family Physician*
- Traitement : attelle de l'interphalangienne distale en extension ou légère hyperextension, en continu : 6–8 sem (maillet osseux) ou 8–12 sem (tendineux), puis 2 sem la nuit ; interphalangienne proximale libre ; toute flexion remet le compteur à zéro (garder l'attelle sous la douche, soutenir le doigt lors des changements) ; efficace même en présentation tardive. — *Hilgefort et coll., 2025, American Family Physician ; Dinh et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41679948) ; Childress et coll., 2022, American Family Physician*
- Suivi : toutes les 2 sem (peau, observance). — *Hilgefort et coll., 2025, American Family Physician ; Dinh et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41679948) ; Childress et coll., 2022, American Family Physician*
- Retour / référence : fragment > 1/3 de la surface articulaire, subluxation palmaire, lésion ouverte ou échec → chirurgie de la main. — *Hilgefort et coll., 2025, American Family Physician ; Dinh et coll., 2026, Canadian Family Physician Medecin De Famille Canadien (PMID 41679948) ; Childress et coll., 2022, American Family Physician*

## Avulsion du fléchisseur profond (jersey finger)

Probabilité de départ (provisoire) : 12 ans 0 %, 20 ans 0 %, 40 ans 0 % ; homme ×2, femme ×0,5.

Repères publiés : 4 % des lésions tendineuses traumatiques aiguës (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>jersey` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `cote>jersey` | Main atteinte | — | — | Les deux 0,05 | provisoire | — |
| `sport.contact>jersey` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 3 / 1 | provisoire | — |
| `duree>jersey` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>jersey` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 | provisoire | — |
| `mecanisme>jersey` | Mécanisme | — | — | Doigt tiré en flexion (agrippe un chandail) 10 | provisoire | — |
| `pop_doigt>jersey` | Claquement (« pop ») à la base d'un doigt | — | — | 2 / 0,7 | provisoire | — |
| `localisation.doigts>jersey` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 3 / 0,5 | provisoire | — |
| `ex_jersey>jersey` | Flexion active de l'IPD impossible (fléchisseur profond) | — | — | 40 / 0,1 | provisoire | — |

Conduite :
- Investigation : perte de la flexion active de l'interphalangienne distale (annulaire le plus souvent) ; radiographie (fragment). — *Rettig, 2004, American Journal of Sports Medicine ; Bachoura et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Traitement : attelle avec interphalangiennes en légère flexion en attendant. — *Rettig, 2004, American Journal of Sports Medicine ; Bachoura et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Suivi : selon le chirurgien. — *Rettig, 2004, American Journal of Sports Medicine ; Bachoura et coll., 2017, Current Reviews in Musculoskeletal Medicine*
- Retour / référence : chirurgie de la main pour tous ; type rétracté dans la paume à réparer en 7–10 j. — *Rettig, 2004, American Journal of Sports Medicine ; Bachoura et coll., 2017, Current Reviews in Musculoskeletal Medicine*

## Lésion de poulie du grimpeur

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 0 %, 45 ans 0 %.

Repères publiés : 20 % des blessures chez 600 grimpeurs (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>poulie` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.escalade>poulie` | Activités physiques : Escalade | — | — | 20 / 1 | provisoire | — |
| `duree>poulie` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 | provisoire | — |
| `apparition>poulie` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 | provisoire | — |
| `mecanisme>poulie` | Mécanisme | — | — | Prise arquée ou réception en escalade 15 | provisoire | — |
| `pop_doigt>poulie` | Claquement (« pop ») à la base d'un doigt | — | — | 8 / 0,3 | provisoire | — |
| `localisation.doigts>poulie` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 3 / 0,5 | provisoire | — |
| `localisation.paume>poulie` | Où est la douleur : Paume ou base des doigts | — | — | 3 / 0,6 | provisoire | — |
| `p_poulie_a1>poulie` | Nodule douloureux à la poulie A1 (base du doigt, côté paume) | — | — | 2 / 0,8 | provisoire | — |
| `p_gaine>poulie` | Gaine du fléchisseur douloureuse sur toute sa longueur | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : douleur à la base du doigt après un « pop » en prise arquée ; corde d'arc à la flexion résistée ; échographie. — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Schöffl et coll., 2006, Journal of Hand Surgery (PMID 16632061) ; Carruthers et coll., 2016, Sports Health ; Zbojniewicz, 2023, Pediatric Radiology*
- Traitement : grades I–III (poulie unique) : repos, anneau de protection, reprise progressive, retour en 2–3 mois ; pas d'infiltration de corticoïde. — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Schöffl et coll., 2006, Journal of Hand Surgery (PMID 16632061) ; Carruthers et coll., 2016, Sports Health ; Zbojniewicz, 2023, Pediatric Radiology*
- Suivi : 4 sem. — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Schöffl et coll., 2006, Journal of Hand Surgery (PMID 16632061) ; Carruthers et coll., 2016, Sports Health ; Zbojniewicz, 2023, Pediatric Radiology*
- Retour / référence : ruptures multiples ou corde d'arc évidente → chirurgie de la main ; avant 17 ans, exclure une fracture de stress épiphysaire (radiographie). — *Grandizio et coll., 2017, Current Reviews in Musculoskeletal Medicine ; Schöffl et coll., 2006, Journal of Hand Surgery (PMID 16632061) ; Carruthers et coll., 2016, Sports Health ; Zbojniewicz, 2023, Pediatric Radiology*

## Ténosynovite infectieuse des fléchisseurs

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 70 ans 0 %.

Repères publiés : Pas de donnée retrouvée ; à ne pas manquer (†).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>teno_infectieuse` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>teno_infectieuse` | Main atteinte | — | — | Les deux 0,05 | provisoire | — |
| `diabete>teno_infectieuse` | Diabète | — | — | 1,5 / 0,97 | provisoire | — |
| `duree>teno_infectieuse` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 0,5 ; 6 semaines à 3 mois 0,1 ; Plus de 3 mois 0,02 | provisoire | — |
| `apparition>teno_infectieuse` | Mode d'apparition | — | — | Subit, sans traumatisme 3 | provisoire | — |
| `morsure>teno_infectieuse` | Plaie au-dessus d'une jointure après un coup de poing, ou morsure | — | — | 5 / 0,9 | provisoire | — |
| `localisation.doigts>teno_infectieuse` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 3 / 0,5 | provisoire | — |
| `type_douleur>teno_infectieuse` | Type de douleur | — | — | Lancinante, pulsatile 3 | provisoire | — |
| `moment>teno_infectieuse` | Horaire | — | — | Constante 2 | provisoire | — |
| `nocturne>teno_infectieuse` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure>teno_infectieuse` | Enflure | — | — | 3 / 0,3 | provisoire | — |
| `rougeur_chaleur>teno_infectieuse` | Rougeur ou chaleur | — | — | 4 / 0,4 | provisoire | — |
| `plaie_doigt>teno_infectieuse` | Coupure, piqûre ou plaie récente du doigt ou de la main | — | — | 6 / 0,5 | provisoire | — |
| `fievre>teno_infectieuse` | Fièvre ou frissons | — | — | 3 / 0,6 | provisoire | — |
| `risque_infection.plaie>teno_infectieuse` | Facteurs de risque d'infection : Plaie, morsure ou injection dans la main | — | — | 4 / 1 | provisoire | — |
| `ex_dactylite>teno_infectieuse` | Dactylite (doigt en saucisse) | — | — | 3 / 0,95 | provisoire | — |
| `kanavel>teno_infectieuse` | Signes de Kanavel (enflure fusiforme, doigt fléchi, douleur à l'extension passive, gaine sensible) | — | — | 10 / 0,3 | a_verifier | Tous les signes chez 22 des 41 cas confirmés ; pas de sensibilité ni de spécificité robustes |
| `p_gaine>teno_infectieuse` | Gaine du fléchisseur douloureuse sur toute sa longueur | — | — | 5 / 0,3 | provisoire | — |
| `ex_chaleur>teno_infectieuse` | Chaleur articulaire | — | — | 2 / 0,7 | provisoire | — |
| `raideur_doigts>teno_infectieuse` | Mobilité des doigts réduite (poing incomplet) | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : signes de Kanavel (enflure fusiforme, doigt en flexion, douleur à l'extension passive, sensibilité le long de la gaine) ; ils peuvent être incomplets au début ; les examens ne sont pas diagnostiques. — *Mehta et coll., 2024, American Journal of Emergency Medicine (PMID 38147700) ; Hyatt et coll., 2017, Orthopedic Clinics of North America (PMID 28336044) ; Idarrha et coll., 2026, Injury (PMID 42721565)*
- Traitement : urgence : transfert immédiat, antibiotiques IV, consultation chirurgicale. — *Mehta et coll., 2024, American Journal of Emergency Medicine (PMID 38147700) ; Hyatt et coll., 2017, Orthopedic Clinics of North America (PMID 28336044) ; Idarrha et coll., 2026, Injury (PMID 42721565)*
- Retour / référence : chaque jour de délai aggrave le pronostic fonctionnel (OR ajusté 1,13 par jour) ; diabète = risque accru ; la disparition de la douleur à l'extension passive en stade avancé signe la nécrose, non l'amélioration. — *Mehta et coll., 2024, American Journal of Emergency Medicine (PMID 38147700) ; Hyatt et coll., 2017, Orthopedic Clinics of North America (PMID 28336044) ; Idarrha et coll., 2026, Injury (PMID 42721565)*

## Polyarthrite rhumatoïde (poignet et main)

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 50 ans 1 %, 70 ans 1 % ; femme ×2,2, homme ×0,45.

Repères publiés : Prévalence 0,5–1 % ; mains atteintes dans 80–90 % des cas, poignet dans environ 75 % (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>par` | Main atteinte | — | — | Les deux 5 | provisoire | — |
| `atcd_familiaux>par` | ATCD familial de maladie rhumatologique | — | — | 2 / 0,9 | provisoire | — |
| `atcd_rhumato.uveite>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 2 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 2 / 1 | provisoire | — |
| `atcd_rhumato.synovite>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 2 / 1 | provisoire | — |
| `atcd_rhumato.par>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.spa>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 2 / 1 | provisoire | — |
| `duree>par` | Depuis combien de temps | — | — | Plus de 3 mois 1,5 | provisoire | — |
| `apparition>par` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,1 ; Insidieux 2 | provisoire | — |
| `localisation.doigts>par` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 3 / 0,5 | provisoire | — |
| `moment>par` | Horaire | — | — | Pire le matin, mieux en bougeant 2 | provisoire | — |
| `raideur>par` | Raideur matinale | — | — | 30 minutes ou plus 2 | provisoire | — |
| `enflure>par` | Enflure | — | — | 2,5 / 0,6 | provisoire | — |
| `rougeur_chaleur>par` | Rougeur ou chaleur | — | — | 1,5 / 0,8 | provisoire | — |
| `autres_articulations>par` | Autres articulations enflées ou douloureuses | — | — | 4 / 0,4 | provisoire | — |
| `ex_nodules>par` | Nodules d'Heberden ou de Bouchard (élargissement osseux) | — | — | 0,5 / 1,05 | provisoire | — |
| `ex_synovite>par` | Synovite (articulations gonflées et molles : MCP, IPP, poignet) | — | — | 6 / 0,2 | provisoire | — |
| `ex_chaleur>par` | Chaleur articulaire | — | — | 2 / 0,6 | provisoire | — |
| `arom_poignet>par` | Mobilité du poignet (flexion, extension) | — | — | Limitée par raideur 2 | provisoire | — |
| `raideur_doigts>par` | Mobilité des doigts réduite (poing incomplet) | — | — | 2 / 0,6 | provisoire | — |
| `squeeze_mcp>par` | Compression latérale des MCP (squeeze test) | — | — | 3 / 0,6 | verifie | van den Bosch et coll., 2015, Ann Rheum Dis (squeeze test) : arthrite, RV+ 3,0 ; RV− 0,6 |

Conduite :
- Investigation : VS, CRP, FR, anti-CCP. — *Sparks, 2019, Annals of Internal Medicine ; Burmester et coll., 2017, Lancet (PMID 28612748)*
- Retour / référence : rhumatologie en < 6 sem du début des symptômes. — *Sparks, 2019, Annals of Internal Medicine ; Burmester et coll., 2017, Lancet (PMID 28612748)*
- Investigation : synovite symétrique des métacarpo-phalangiennes et interphalangiennes proximales, raideur matinale prolongée ; VS, CRP, FR, anti-CCP, FSC, créatinine, bilan hépatique ; radiographies des mains et des pieds. — *Burmester et coll., 2017, Lancet (PMID 28612748)*
- Traitement : AINS en attendant l'évaluation ; ne pas retarder la référence dans l'attente des résultats. — *Burmester et coll., 2017, Lancet (PMID 28612748)*
- Suivi : jusqu'à la prise en charge spécialisée. — *Burmester et coll., 2017, Lancet (PMID 28612748)*
- Retour / référence : rhumatologie en moins de 6 sem du début des symptômes. — *Burmester et coll., 2017, Lancet (PMID 28612748)*

## Goutte ou chondrocalcinose (poignet ou main)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 65 ans 1 %, 85 ans 2 %.

Repères publiés : Goutte 3,9–5,1 % (tous sites) ; chondrocalcinose 4–7 % après 40 ans, 18 % après 80 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>cristaux` | Main atteinte | — | — | Les deux 1,3 | provisoire | — |
| `hypothyroidie>cristaux` | Hypothyroïdie, insuffisance rénale ou dialyse | — | — | 1,3 / 0,98 | provisoire | — |
| `atcd_rhumato.goutte>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 6 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>cristaux` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 6 / 1 | provisoire | — |
| `duree>cristaux` | Depuis combien de temps | — | — | Moins de 7 jours 2 | provisoire | — |
| `apparition>cristaux` | Mode d'apparition | — | — | Subit, sans traumatisme 5 | provisoire | — |
| `localisation.doigts>cristaux` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 1,5 / 0,8 | provisoire | — |
| `type_douleur>cristaux` | Type de douleur | — | — | Lancinante, pulsatile 2 | provisoire | — |
| `moment>cristaux` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `nocturne>cristaux` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `masse>cristaux` | Bosse ou masse visible | — | — | 1,5 / 0,95 | provisoire | — |
| `enflure>cristaux` | Enflure | — | — | 3 / 0,5 | provisoire | — |
| `rougeur_chaleur>cristaux` | Rougeur ou chaleur | — | — | 5 / 0,3 | provisoire | — |
| `autres_articulations>cristaux` | Autres articulations enflées ou douloureuses | — | — | 1,5 / 0,9 | provisoire | — |
| `fievre>cristaux` | Fièvre ou frissons | — | — | 1,3 / 0,95 | provisoire | — |
| `ex_synovite>cristaux` | Synovite (articulations gonflées et molles : MCP, IPP, poignet) | — | — | 3 / 0,5 | provisoire | — |
| `ex_dactylite>cristaux` | Dactylite (doigt en saucisse) | — | — | 2 / 0,95 | provisoire | — |
| `ex_tophus>cristaux` | Tophus | — | — | 15 / 0,8 | provisoire | — |
| `ex_chaleur>cristaux` | Chaleur articulaire | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Investigation : ponction si monoarthrite ; avant 60 ans, rechercher hyperparathyroïdie, hémochromatose, hypomagnésémie. — *Rosenthal et coll., 2016, New England Journal of Medicine ; Pascart et coll., 2024, Lancet (PMID 39089298)*
- Traitement : infiltration intra-articulaire après exclusion d'une infection. — *Rosenthal et coll., 2016, New England Journal of Medicine ; Pascart et coll., 2024, Lancet (PMID 39089298)*
- Investigation : ponction si premier épisode ou doute d'infection ; urate (peut être normal en crise), créatinine ; rechercher des tophus. — *FitzGerald et coll., 2020, Arthritis & Rheumatology ; Anderson et coll., 2021, JAMA ; Cohen et coll., 2020, Current Rheumatology Reports*
- Traitement : crise : colchicine, AINS ou prednisone (bloc commun). Hypo-uricémiant si tophus, dommages radiographiques ou ≥ 2 crises/an : allopurinol ≤ 100 mg/j au départ (moins si insuffisance rénale), hausse mensuelle, cible d'urate < 360 µmol/L, avec prophylaxie anti-inflammatoire 3–6 mois. — *FitzGerald et coll., 2020, Arthritis & Rheumatology ; Anderson et coll., 2021, JAMA ; Cohen et coll., 2020, Current Rheumatology Reports*
- Suivi : urate toutes les 4 sem pendant l'ajustement, puis aux 6 mois. — *FitzGerald et coll., 2020, Arthritis & Rheumatology ; Anderson et coll., 2021, JAMA ; Cohen et coll., 2020, Current Rheumatology Reports*
- Retour / référence : fièvre ou doute d'arthrite septique → urgence ; goutte réfractaire ou tophacée sévère → rhumatologie. — *FitzGerald et coll., 2020, Arthritis & Rheumatology ; Anderson et coll., 2021, JAMA ; Cohen et coll., 2020, Current Rheumatology Reports*

## Arthrite psoriasique (dactylite)

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 50 ans 0 %, 70 ans 0 %.

Repères publiés : Prévalence 1–2/1 000 ; dactylite chez 40–50 % (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>psoriasique` | Main atteinte | — | — | Les deux 1,5 | provisoire | — |
| `atcd_familiaux>psoriasique` | ATCD familial de maladie rhumatologique | — | — | 2 / 0,95 | provisoire | — |
| `atcd_rhumato.psoriasis>psoriasique` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 8 / 0,9 | provisoire | — |
| `atcd_rhumato.uveite>psoriasique` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 2 / 1 | provisoire | — |
| `localisation.doigts>psoriasique` | Où est la douleur : Doigts (articulations interphalangiennes ou métacarpo-phalangiennes) | — | — | 3 / 0,5 | provisoire | — |
| `moment>psoriasique` | Horaire | — | — | Pire le matin, mieux en bougeant 1,5 | provisoire | — |
| `raideur>psoriasique` | Raideur matinale | — | — | 30 minutes ou plus 1,5 | provisoire | — |
| `enflure>psoriasique` | Enflure | — | — | 2 / 0,6 | provisoire | — |
| `rougeur_chaleur>psoriasique` | Rougeur ou chaleur | — | — | 1,5 / 0,8 | provisoire | — |
| `autres_articulations>psoriasique` | Autres articulations enflées ou douloureuses | — | — | 2,5 / 0,6 | provisoire | — |
| `ex_synovite>psoriasique` | Synovite (articulations gonflées et molles : MCP, IPP, poignet) | — | — | 3 / 0,5 | provisoire | — |
| `ex_dactylite>psoriasique` | Dactylite (doigt en saucisse) | 28 % | 99 % | 28 / 0,73 | verifie | Coates et coll., 2012, Arthritis Rheum (CASPAR, arthrite psoriasique précoce) : RV+ ≈ 28 (calculé) |
| `ex_ongles>psoriasique` | Dystrophie unguéale psoriasique (ponctuations, onycholyse) | 38 % | 99 % | 38 / 0,63 | verifie | Coates et coll., 2012, Arthritis Rheum (CASPAR, arthrite psoriasique précoce) : RV+ ≈ 38 (calculé) |
| `squeeze_mcp>psoriasique` | Compression latérale des MCP (squeeze test) | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : doigt « en saucisse » ; rechercher psoriasis, atteinte unguéale, enthésite, uvéite ; VS, CRP ; exclure infection et goutte. — *Coates et coll., 2022, Nature Reviews ; Al et coll., 2022, Rheumatology International*
- Traitement : AINS ; infiltration locale de corticoïde selon l'expertise. — *Coates et coll., 2022, Nature Reviews ; Al et coll., 2022, Rheumatology International*
- Suivi : 2–4 sem. — *Coates et coll., 2022, Nature Reviews ; Al et coll., 2022, Rheumatology International*
- Retour / référence : rhumatologie (adulte ou pédiatrique) en 4–6 sem ; fièvre ou porte d'entrée → exclure une ténosynovite infectieuse. — *Coates et coll., 2022, Nature Reviews ; Al et coll., 2022, Rheumatology International*

## Douleur projetée d'origine cervicale (C6–C8)

Probabilité de départ (provisoire) : 12 ans 0 %, 35 ans 2 %, 55 ans 3 %, 75 ans 2 %.

Repères publiés : Radiculopathie cervicale 83,2/100 000/an, pic à 50–54 ans (A, rachis cervical).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `type_douleur>cervical` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 2 | provisoire | — |
| `paresthesies_median>cervical` | Engourdissements du pouce, de l'index et du majeur (schéma de Katz) | — | — | 1,5 / 0,9 | provisoire | — |
| `paresthesies_ulnaires>cervical` | Engourdissements de l'auriculaire et de l'annulaire | — | — | 1,5 / 0,9 | provisoire | — |
| `cou_agg>cervical` | Douleur ou engourdissement aggravés par les mouvements du cou | — | — | 6 / 0,5 | provisoire | — |
| `ex_atrophie>cervical` | Atrophie thénarienne ou des interosseux | — | — | 1,5 / 0,97 | provisoire | — |
| `hypo_median>cervical` | Hypoalgésie ou discrimination de deux points diminuée (territoire médian) | — | — | 1,5 / 0,9 | provisoire | — |
| `hypo_ulnaire>cervical` | Hypoesthésie de l'auriculaire | — | — | 1,5 / 0,9 | provisoire | — |
| `spurling_main>cervical` | Spurling ou mouvements du cou reproduisant les symptômes | — | — | 5 / 0,4 | provisoire | — |
| `cou_mob>cervical` | Cou : mobilisation | — | — | Douloureuse ou reproduit les symptômes de la main 4 | provisoire | — |

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j) ; diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID) sur les articulations des doigts et la base du pouce.
- Analgésie de base (enfant) : acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) ; ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j).
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; prudence ≥ 65 ans (IPP si risque digestif).
- Amoxicilline-clavulanate (morsure, plaie en regard d'une articulation métacarpo-phalangienne) : adulte 875/125 mg BID ; enfant < 40 kg 45 mg/kg/j (composante amoxicilline) en 2 doses, max 875 mg/dose ; prophylaxie 3–5 j ; prendre au début du repas ; si DFG 10–30 : 500/125 mg q12h. Allergie à la pénicilline : moxifloxacine seule, ou lévofloxacine avec métronidazole (adulte).
- Céphalexine (fracture de Seymour, infection cutanée) : adulte 500 mg QID ; enfant 50 mg/kg/j en 3 doses (max 1 g/dose).
- Crise de goutte : colchicine 1,2 mg, puis 0,6 mg 1 h plus tard (max 1,8 mg la première heure) ; 12 h après, 0,6 mg DIE–BID jusqu'à résolution ; réduire avec les inhibiteurs du CYP3A4 ou de la P-gp ; ne pas répéter avant 2 sem si ClCr < 30. Solutions de rechange : AINS à pleine dose ou prednisone 30–35 mg DIE pendant 5 j.
- Examen de toute blessure du doigt : radiographies en 3 incidences (face, profil vrai, oblique) ; rotation évaluée doigts fléchis (chevauchement, orientation des ongles) ; flexion et extension isolées de chaque articulation ; sensibilité et recoloration capillaire.
- Dosage de la charge : activité permise si douleur ≤ 3/10 et sans persistance après l'effort.
- Intervalles de suivi : fondés sur le consensus et l'usage, non sur des essais.

Pour tous :
- Enseignement : garder la main au-dessus du cœur et bouger les doigts sous une attelle ; une raideur des doigts s'installe vite
- Consignes de reconsultation : doigts froids, bleus ou engourdis, douleur croissante sous le plâtre, rougeur qui s'étend, fièvre
