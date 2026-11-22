# Lombalgie, avec ou sans irradiation : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs lombaire` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 219 (validés 0, vérifiés 43, à vérifier 4, provisoires 172).

## Lombalgie non spécifique (mécanique)

Probabilité de départ (provisoire) : 12 ans 50 %, 30 ans 55 %, 50 ans 50 %, 70 ans 35 %, 85 ans 30 %.

Repères publiés : Plus de 85 % des lombalgies en soins primaires ; 18 % des adolescents ; plus de 80 % sans diagnostic à 1 an chez l'enfant (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>commune` | Côté de la douleur ou de l'irradiation | — | — | Les deux 1,1 | provisoire | — |
| `travail>commune` | Occupation | — | — | Travail physique (charges, manutention) 1,1 | provisoire | — |
| `obesite>commune` | Obésité (IMC 30 ou plus) | — | — | 1,2 / 0,95 | provisoire | — |
| `premier>commune` | Premier épisode | — | — | 0,9 / 1,1 | provisoire | — |
| `duree>commune` | Depuis combien de temps | — | — | Moins de 7 jours 1,2 ; 1 à 6 semaines 1,1 ; Plus de 3 mois 0,8 | provisoire | — |
| `apparition>commune` | Mode d'apparition | — | — | Subit, sans traumatisme 1,2 | provisoire | — |
| `mecanisme>commune` | Mécanisme | — | — | Soulèvement d'une charge ou flexion-torsion 1,3 | provisoire | — |
| `pas_mieux_1mois>commune` | Pas d'amélioration après 1 mois de traitement | — | — | 0,7 / 1,1 | provisoire | — |
| `localisation.centrale>commune` | Où est la douleur : Lombaire centrale | — | — | 1,2 / 0,9 | provisoire | — |
| `localisation.paravertebrale>commune` | Où est la douleur : Lombaire, d'un côté (paravertébrale) | — | — | 1,2 / 0,9 | provisoire | — |
| `localisation.sous_genou>commune` | Où est la douleur : Irradie sous le genou, jusqu'au pied | — | — | 0,5 / 1,1 | provisoire | — |
| `jambe_dos>commune` | Douleur de jambe plus forte que la douleur lombaire | — | — | 0,5 / 1,2 | provisoire | — |
| `nocturne>commune` | Douleur la nuit | — | — | 0,8 / 1,05 | provisoire | — |
| `p_paravert>commune` | Paravertébraux douloureux ou en spasme | — | — | 1,2 / 0,9 | provisoire | — |

Conduite :
- Investigation : pas d'imagerie sans drapeau rouge ; IRM immédiate si déficit sévère ou progressif, queue de cheval, infection ou cancer suspecté ; facteurs mineurs (> 50 ans, perte de poids, pas d'amélioration à 1 mois) : radiographie avec VS/CRP, ou réévaluation à 1 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : rester actif, chaleur ; AINS ± myorelaxant en courte cure ; physiothérapie précoce ; acétaminophène seul et opioïdes non supérieurs au placebo ; forme chronique : exercice, réadaptation multidisciplinaire, thérapie cognitivo-comportementale, puis AINS et duloxétine en 2ᵉ ligne. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 4 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : signes d'urgence du bloc commun, fièvre. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Contracture ou lésion musculaire lombaire

Probabilité de départ (provisoire) : 12 ans 8 %, 18 ans 12 %, 30 ans 8 %, 50 ans 4 %, 70 ans 2 %.

Repères publiés : Spasme 31 % et lésion musculaire paralombaire 19 % des atteintes lombaires NCAA (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>musculaire` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,8 | provisoire | — |
| `travail>musculaire` | Occupation | — | — | Travail physique (charges, manutention) 1,3 | provisoire | — |
| `sport.aucun>musculaire` | Activités physiques : Peu ou pas de sport | — | — | 0,6 / 1 | provisoire | — |
| `sport.pivot>musculaire` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>musculaire` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>musculaire` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `sport.muscu>musculaire` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,5 / 1 | provisoire | — |
| `sport.golf>musculaire` | Activités physiques : Golf | — | — | 1,3 / 1 | provisoire | — |
| `duree>musculaire` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 1,2 ; 6 semaines à 3 mois 0,5 ; Plus de 3 mois 0,2 | provisoire | — |
| `apparition>musculaire` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 ; Subit, sans traumatisme 1,5 ; Graduel 0,5 ; Insidieux 0,3 | provisoire | — |
| `mecanisme>musculaire` | Mécanisme | — | — | Soulèvement d'une charge ou flexion-torsion 2,5 ; Chute de hauteur, accident ou coup 1,5 | provisoire | — |
| `localisation.paravertebrale>musculaire` | Où est la douleur : Lombaire, d'un côté (paravertébrale) | — | — | 2,5 / 0,6 | provisoire | — |
| `type_douleur>musculaire` | Type de douleur | — | — | Aiguë, en coup de poignard 1,3 | provisoire | — |
| `flexion_assis>musculaire` | Pire en flexion ou assis longtemps | — | — | 1,3 / 0,9 | provisoire | — |
| `moment>musculaire` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `p_paravert>musculaire` | Paravertébraux douloureux ou en spasme | — | — | 3 / 0,4 | provisoire | — |
| `arom_flexion>musculaire` | Flexion lombaire | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Investigation : comme fiche 1 ; adolescent sportif avec douleur en extension > 2–3 sem : rechercher une spondylolyse (fiche 11). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : repos relatif 2–3 j, chaleur, analgésie de base, retour progressif. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 2 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : comme fiche 1. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Discopathie dégénérative ou douleur discogénique

Probabilité de départ (provisoire) : 12 ans 2 %, 25 ans 6 %, 40 ans 8 %, 60 ans 7 %, 80 ans 5 %.

Repères publiés : Dégénérescence asymptomatique 37 % à 20 ans, 96 % à 80 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>discogenique` | Depuis combien de temps | — | — | 6 semaines à 3 mois 1,3 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>discogenique` | Mode d'apparition | — | — | Graduel 1,3 | provisoire | — |
| `localisation.centrale>discogenique` | Où est la douleur : Lombaire centrale | — | — | 2 / 0,7 | provisoire | — |
| `localisation.cuisse_post>discogenique` | Où est la douleur : Arrière de la cuisse, sans dépasser le genou | — | — | 1,3 / 0,9 | provisoire | — |
| `jambe_dos>discogenique` | Douleur de jambe plus forte que la douleur lombaire | — | — | 0,6 / 1,1 | provisoire | — |
| `type_douleur>discogenique` | Type de douleur | — | — | Sourde, profonde 1,2 | provisoire | — |
| `flexion_assis>discogenique` | Pire en flexion ou assis longtemps | — | — | 2,5 / 0,6 | provisoire | — |
| `extension>discogenique` | Pire en extension ou debout cambré | — | — | 0,7 / 1,1 | provisoire | — |
| `assis_sans_douleur>discogenique` | Aucune douleur en position assise | — | — | 0,5 / 1,1 | provisoire | — |
| `lever_assis>discogenique` | Douleur en se levant d'une chaise | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>discogenique` | Horaire | — | — | Pire le matin, mieux en bougeant 1,2 | provisoire | — |
| `arom_flexion>discogenique` | Flexion lombaire | — | — | Limitée avec douleur 2 | provisoire | — |
| `centralisation>discogenique` | Centralisation aux mouvements répétés | 40 % | 94 % | 6,67 / 0,64 | verifie | Laslett et coll., 2005, Spine J (PMID 15996606) : RV+ 6,9 |

Conduite :
- Investigation : pas d'imagerie de routine (dégénérescence fréquente sans symptômes). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : comme la forme chronique de la fiche 1. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Syndrome facettaire lombaire

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 4 %, 50 ans 10 %, 70 ans 12 %, 85 ans 12 %.

Repères publiés : 16–45 % des lombalgies chroniques (centres spécialisés) ; arthrose facettaire au scanner sans lien avec la douleur (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>facettaire` | Côté de la douleur ou de l'irradiation | — | — | Les deux 1,3 | provisoire | — |
| `sport.golf>facettaire` | Activités physiques : Golf | — | — | 1,2 / 1 | provisoire | — |
| `duree>facettaire` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>facettaire` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 1,3 ; Insidieux 1,5 | provisoire | — |
| `mecanisme>facettaire` | Mécanisme | — | — | Hyperextensions répétées (gymnastique, lancer, ballet) 1,5 | provisoire | — |
| `localisation.centrale>facettaire` | Où est la douleur : Lombaire centrale | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.paravertebrale>facettaire` | Où est la douleur : Lombaire, d'un côté (paravertébrale) | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.cuisse_post>facettaire` | Où est la douleur : Arrière de la cuisse, sans dépasser le genou | — | — | 1,5 / 0,9 | provisoire | — |
| `jambe_dos>facettaire` | Douleur de jambe plus forte que la douleur lombaire | — | — | 0,6 / 1,1 | provisoire | — |
| `type_douleur>facettaire` | Type de douleur | — | — | Sourde, profonde 1,2 | provisoire | — |
| `flexion_assis>facettaire` | Pire en flexion ou assis longtemps | — | — | 0,7 / 1,1 | provisoire | — |
| `extension>facettaire` | Pire en extension ou debout cambré | — | — | 2,5 / 0,6 | provisoire | — |
| `moment>facettaire` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `arom_extension>facettaire` | Extension lombaire | — | — | Limitée avec douleur 2 | provisoire | — |

Conduite :
- Investigation : clinique. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : comme fiche 1. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : réfractaire > 3 mois → clinique de la douleur (blocs, radiofréquence). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Lombalgie ou douleur pelvienne de la grossesse

Probabilité de départ (provisoire) : 12 ans 0 %, 20 ans 0 %, 30 ans 1 %, 40 ans 0 %, 50 ans 0 % ; femme ×1, homme ×0.

Repères publiés : Lombalgie chez 50–70 % des grossesses ; ceinture pelvienne 10–65 % (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `grossesse>grossesse` | Grossesse en cours ou accouchement récent | — | — | 200 / 0,01 | provisoire | — |
| `localisation.fesse>grossesse` | Où est la douleur : Fesse ou sacro-iliaque, sous la ceinture | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Investigation : clinique (élévation active de la jambe tendue, tests de provocation pelvienne) ; éviter les radiographies. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : exercices, physiothérapie, ceinture pelvienne ; acétaminophène ; éviter les AINS et les opioïdes. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : aux visites prénatales. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : déficit neurologique, contractions, saignement, fièvre. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Sténose spinale lombaire

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 1 %, 55 ans 6 %, 70 ans 18 %, 85 ans 22 %.

Repères publiés : 11 % de la population générale, 25 % en soins primaires (âge moyen 69 ans) (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>stenose` | Côté de la douleur ou de l'irradiation | — | — | Les deux 2,5 | provisoire | — |
| `obesite>stenose` | Obésité (IMC 30 ou plus) | — | — | 1,3 / 0,95 | provisoire | — |
| `duree>stenose` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>stenose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 0,5 ; Graduel 1,5 ; Insidieux 2 | provisoire | — |
| `localisation.sous_genou>stenose` | Où est la douleur : Irradie sous le genou, jusqu'au pied | — | — | 2 / 0,6 | provisoire | — |
| `localisation.cuisse_ant>stenose` | Où est la douleur : Face antérieure de la cuisse (cruralgie) | — | — | 1,5 / 0,95 | provisoire | — |
| `localisation.deux_jambes>stenose` | Où est la douleur : Les deux fesses ou les deux jambes | — | — | 6,3 / 0,8 | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : douleur bilatérale des fesses ou des jambes, RV+ 6,3 (3,1–13) |
| `jambe_dos>stenose` | Douleur de jambe plus forte que la douleur lombaire | — | — | 1,8 / 0,8 | provisoire | — |
| `type_douleur>stenose` | Type de douleur | — | — | Brûlure 1,5 | provisoire | — |
| `flexion_assis>stenose` | Pire en flexion ou assis longtemps | — | — | 0,5 / 1,2 | provisoire | — |
| `extension>stenose` | Pire en extension ou debout cambré | — | — | 1,8 / 0,7 | provisoire | — |
| `claudication>stenose` | Douleur des jambes à la marche ou debout, soulagée assis ou penché | — | — | 3,7 / 0,23 | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : claudication neurogène, RV+ 3,7 (2,9–4,8) ; RV− 0,23 |
| `assis_sans_douleur>stenose` | Aucune douleur en position assise | 47 % | 94 % | 7,83 / 0,56 | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : RV+ 7,4 (1,9–30) |
| `penche_avant>stenose` | Mieux penché vers l'avant (chariot, montée) | — | — | 6,4 / — | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : RV+ 6,4 (4,1–9,9) |
| `moment>stenose` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `paresthesies>stenose` | Engourdissements ou picotements dans un dermatome | — | — | 1,5 / 0,8 | provisoire | — |
| `faiblesse>stenose` | Faiblesse d'une jambe ou pied qui accroche | — | — | 1,3 / 0,95 | provisoire | — |
| `retention>stenose` | Rétention urinaire, incontinence ou trouble fécal nouveaux | — | — | 6,9 / — | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : trouble urinaire inexpliqué, RV+ 6,9 |
| `base_elargie>stenose` | Marche à base élargie | 42 % | 97 % | 14 / 0,6 | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : RV+ 13 (1,9–95) |
| `romberg>stenose` | Romberg anormal | 40 % | 91 % | 4,44 / 0,66 | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : RV+ 4,2 |
| `arom_flexion>stenose` | Flexion lombaire | — | — | Complète et indolore 1,5 ; Limitée avec douleur 0,6 | provisoire | — |
| `arom_flexion>stenose` | Flexion lombaire | — | — | Complète et indolore 1,4 | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : absence de douleur en flexion, RV+ 1,4 |
| `arom_extension>stenose` | Extension lombaire | — | — | Limitée avec douleur 1,8 ; Limitée par raideur 1,3 | provisoire | — |
| `reflexe_ach>stenose` | Réflexe achilléen diminué ou absent | 47 % | 78 % | 2,14 / 0,68 | verifie | Suri et coll., 2010, JAMA (examen clinique rationnel, sténose) : RV+ 2,1 |
| `grappe:cook>stenose` | Combinaison : Cluster de Cook : 3 sur 5 ou plus | — | — | 2,5 / — | verifie | Petersen et coll., 2017, BMC Musculoskelet Disord (revue) : Se 29 %, Sp 88 %, RV+ 2,5 (n = 1 448) |

Conduite :
- Investigation : clinique (claudication neurogène soulagée en flexion) ; vérifier les pouls ; IRM seulement si chirurgie ou infiltration envisagée, ou déficit. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : exercice et thérapie manuelle, vélo stationnaire, AINS selon la tolérance ; péridurales peu efficaces à long terme. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : symptômes importants après 3–6 mois → chirurgie ; troubles sphinctériens, faiblesse progressive → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Douleur sacro-iliaque

Probabilité de départ (provisoire) : 12 ans 1 %, 25 ans 5 %, 45 ans 7 %, 65 ans 5 %, 85 ans 4 % ; femme ×1,3, homme ×0,8.

Repères publiés : 15–30 % des lombalgies chroniques non radiculaires (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>si` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,5 | provisoire | — |
| `duree>si` | Depuis combien de temps | — | — | 6 semaines à 3 mois 1,2 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>si` | Mode d'apparition | — | — | Graduel 1,3 | provisoire | — |
| `localisation.centrale>si` | Où est la douleur : Lombaire centrale | — | — | 0,5 / 1,2 | provisoire | — |
| `localisation.fesse>si` | Où est la douleur : Fesse ou sacro-iliaque, sous la ceinture | — | — | 3 / 0,4 | provisoire | — |
| `localisation.cuisse_post>si` | Où est la douleur : Arrière de la cuisse, sans dépasser le genou | — | — | 1,5 / 0,9 | provisoire | — |
| `lever_assis>si` | Douleur en se levant d'une chaise | — | — | 2 / 0,7 | provisoire | — |
| `p_si>si` | Sillon sacro-iliaque douloureux | — | — | 1,5 / 0,7 | provisoire | — |
| `grappe:laslett_central>si` | Combinaison : Laslett : 3 tests sur 5 ou plus, sans centralisation | — | — | 7 / — | verifie | Laslett et coll., 2005, Man Ther (PMID 16038856) ; Petersen 2017 : Se 91 %, Sp 87 %, RV+ 7,0 (2,4–20,4) |
| `grappe:laslett>si` | Combinaison : Laslett : 3 tests sur 5 ou plus | — | — | 4,2 / — | verifie | Laslett et coll., 2005, Man Ther (PMID 16038856) ; Petersen 2017 : Se 91 %, Sp 78 %, RV+ 4,2 (2,1–8,2) |
| `grappe:laslett_neg>si` | Combinaison : Laslett : moins de 3 tests sur 5 | — | — | — / 0,12 | verifie | Laslett et coll., 2005, Man Ther (PMID 16038856) ; Petersen 2017 : RV− 0,12 |

Conduite :
- Investigation : ≥ 3 tests de provocation positifs ; radiographie du bassin si spondylarthrite suspectée. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : physiothérapie (stabilisation), analgésie de base, ceinture. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 6 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : réfractaire → infiltration guidée. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Hernie discale avec radiculopathie (sciatique, cruralgie)

Probabilité de départ (provisoire) : 12 ans 1 %, 20 ans 3 %, 35 ans 5 %, 50 ans 5 %, 70 ans 3 %.

Repères publiés : 4 % des lombalgies en soins primaires ; 1,3 % chez l'enfant (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>hernie` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,5 | provisoire | — |
| `travail>hernie` | Occupation | — | — | Travail physique (charges, manutention) 1,2 | provisoire | — |
| `sport.muscu>hernie` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,2 / 1 | provisoire | — |
| `premier>hernie` | Premier épisode | — | — | 1,2 / 0,9 | provisoire | — |
| `duree>hernie` | Depuis combien de temps | — | — | Moins de 7 jours 1,3 ; 1 à 6 semaines 1,3 | provisoire | — |
| `apparition>hernie` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 ; Subit, sans traumatisme 1,8 | provisoire | — |
| `mecanisme>hernie` | Mécanisme | — | — | Soulèvement d'une charge ou flexion-torsion 2 | provisoire | — |
| `localisation.fesse>hernie` | Où est la douleur : Fesse ou sacro-iliaque, sous la ceinture | — | — | 1,2 / 1 | provisoire | — |
| `localisation.sous_genou>hernie` | Où est la douleur : Irradie sous le genou, jusqu'au pied | — | — | 6 / 0,2 | provisoire | — |
| `localisation.cuisse_ant>hernie` | Où est la douleur : Face antérieure de la cuisse (cruralgie) | — | — | 3 / 0,9 | provisoire | — |
| `jambe_dos>hernie` | Douleur de jambe plus forte que la douleur lombaire | — | — | 4 / 0,4 | provisoire | — |
| `type_douleur>hernie` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 3 | provisoire | — |
| `flexion_assis>hernie` | Pire en flexion ou assis longtemps | — | — | 1,8 / 0,7 | provisoire | — |
| `assis_sans_douleur>hernie` | Aucune douleur en position assise | — | — | 0,6 / 1,1 | provisoire | — |
| `toux_jambe>hernie` | Toux ou éternuement augmente la douleur de jambe | 40 % | 77 % | 1,74 / 0,78 | verifie | Verwoerd et coll., 2016, Eur Spine J : aggravant seulement la jambe, RV+ 1,74 |
| `paresthesies>hernie` | Engourdissements ou picotements dans un dermatome | — | — | 3 / 0,5 | provisoire | — |
| `faiblesse>hernie` | Faiblesse d'une jambe ou pied qui accroche | — | — | 2,5 / 0,8 | provisoire | — |
| `demarche>hernie` | Démarche | — | — | Boiterie antalgique 1,5 | provisoire | — |
| `arom_flexion>hernie` | Flexion lombaire | — | — | Limitée avec douleur 2 | provisoire | — |
| `reflexe_rot>hernie` | Réflexe rotulien diminué | — | — | 7,7 / — | verifie | Suri et coll., 2011, Spine (PMID 20543768) : atteinte L4, RV+ 7,7 |
| `reflexe_ach>hernie` | Réflexe achilléen diminué ou absent | — | — | 7,1 / — | verifie | Petersen et coll., 2017, BMC Musculoskelet Disord (revue) : atteinte L5–S1, RV+ 7,1 |
| `faiblesse_ehl>hernie` | Faiblesse de l'extenseur de l'hallux (L5) | 61 % | 86 % | 4,36 / 0,45 | verifie | Petersen et coll., 2017, BMC Musculoskelet Disord (revue) : RV+ 4,4 |
| `faiblesse_df>hernie` | Faiblesse de la dorsiflexion de la cheville (L4) | 60 % | 89 % | 5,45 / 0,45 | verifie | Petersen et coll., 2017, BMC Musculoskelet Disord (revue) : RV+ 5,4 |
| `sensibilite>hernie` | Hypoesthésie dans un dermatome | — | — | 2,5 / 0,7 | provisoire | — |
| `lasegue>hernie` | Lasègue (élévation de la jambe tendue) | 92 % | 28 % | 1,28 / 0,29 | verifie | van der Windt et coll., 2010, Cochrane (PMID 20166095) |
| `lasegue_croise>hernie` | Lasègue croisé | 28 % | 90 % | 2,8 / 0,8 | verifie | van der Windt et coll., 2010, Cochrane (PMID 20166095) |
| `slump>hernie` | Slump | 84 % | 83 % | 4,94 / 0,19 | verifie | Majlesi et coll., 2008 (PMID 18391677) ; Petersen et coll., 2017, BMC Musculoskelet Disord (revue) |
| `femoral>hernie` | Étirement du nerf fémoral | — | — | 5,7 / — | verifie | Suri et coll., 2011, Spine (PMID 20543768) : atteinte L3, RV+ 5,7 |

Conduite :
- Investigation : force, réflexes, Lasègue ; IRM seulement si pas d'amélioration à 4–6 sem chez un candidat à l'infiltration ou à la chirurgie, ou d'emblée si déficit sévère. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : rester actif, AINS, physiothérapie 6 sem ; corticoïdes systémiques et péridurale : bénéfice modeste et bref. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 2 sem, puis 6 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : chirurgie si > 6 sem avec IRM concordante (récupération plus rapide, résultat semblable à 1 an) ; déficit moteur ≤ 3/5 → chirurgie en < 3 j ; queue de cheval → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Spondylolisthésis dégénératif

Probabilité de départ (provisoire) : 12 ans 0 %, 45 ans 1 %, 60 ans 4 %, 75 ans 6 % ; femme ×2,5, homme ×0,4.

Repères publiés : 8,4 % des femmes, 2,7 % des hommes (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>spondylolisthesis` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>spondylolisthesis` | Mode d'apparition | — | — | Insidieux 1,5 | provisoire | — |
| `extension>spondylolisthesis` | Pire en extension ou debout cambré | — | — | 1,8 / 0,8 | provisoire | — |
| `claudication>spondylolisthesis` | Douleur des jambes à la marche ou debout, soulagée assis ou penché | — | — | 2 / 0,8 | provisoire | — |
| `sill>spondylolisthesis` | Décroché entre deux épineuses basses (marche d'escalier) | 81 % | 89 % | 7,36 / 0,21 | verifie | Petersen et coll., 2017, BMC Musculoskelet Disord (revue) : « sill sign », RV+ 7,4 ; RV− 0,21 (marche d'escalier : RV+ 4,7) |
| `arom_extension>spondylolisthesis` | Extension lombaire | — | — | Limitée avec douleur 1,5 | provisoire | — |
| `ext_passive>spondylolisthesis` | Extension lombaire passive | 84 % | 90 % | 8,4 / 0,18 | verifie | Kasai et coll., 2006, Phys Ther (PMID 17033040) : instabilité radiologique, RV+ 8,8 ; RV− 0,18 |

Conduite :
- Investigation : radiographie de profil debout ± flexion-extension. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement et suivi : comme fiche 6. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Fracture vertébrale ostéoporotique (ou d'insuffisance du sacrum)

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 1 %, 65 ans 2 %, 75 ans 5 %, 90 ans 9 % ; femme ×2, homme ×0,5.

Repères publiés : 4 % des lombalgies en soins primaires ; seules 20,7 % sont reconnues (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `fluoro_cortico>fracture_osteo` | Fluoroquinolone ou corticoïde récents | — | — | 5 / 0,9 | a_verifier | Williams et coll., 2023, Cochrane (fracture vertébrale) : corticoïdes prolongés, RV+ 3,97–48,5 selon les études |
| `osteoporose>fracture_osteo` | Ostéoporose ou fracture de fragilité | — | — | 3,13 / — | verifie | Williams et coll., 2023, Cochrane (fracture vertébrale) : antécédent d'ostéoporose, RV+ 3,13 |
| `duree>fracture_osteo` | Depuis combien de temps | — | — | Moins de 7 jours 2 ; 1 à 6 semaines 1,3 | provisoire | — |
| `apparition>fracture_osteo` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 ; Subit, sans traumatisme 3 ; Insidieux 0,5 | provisoire | — |
| `mecanisme>fracture_osteo` | Mécanisme | — | — | Soulèvement d'une charge ou flexion-torsion 1,5 ; Chute de hauteur, accident ou coup 3 | provisoire | — |
| `mecanisme>fracture_osteo` | Mécanisme | — | — | Chute de hauteur, accident ou coup 4 | a_verifier | Williams et coll., 2023, Cochrane (fracture vertébrale) : traumatisme significatif, RV+ 1,93–12,85 |
| `localisation.centrale>fracture_osteo` | Où est la douleur : Lombaire centrale | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.thoracique>fracture_osteo` | Où est la douleur : Monte vers le dos (thoracique) | — | — | 1,5 / 0,9 | provisoire | — |
| `moment>fracture_osteo` | Horaire | — | — | Constante 1,3 | provisoire | — |
| `nocturne>fracture_osteo` | Douleur la nuit | — | — | 1,3 / 0,9 | provisoire | — |
| `demarche>fracture_osteo` | Démarche | — | — | Boiterie antalgique 1,3 | provisoire | — |
| `p_epineuse>fracture_osteo` | Épineuse douloureuse à la percussion | — | — | 3 / 0,5 | provisoire | — |

Conduite :
- Investigation : radiographies face et profil ; IRM si négative avec suspicion forte ; bilan osseux ; ostéodensitométrie sans retarder le traitement. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : analgésie de base, mobilisation précoce, corset ≤ 8 sem au besoin ; bisphosphonate d'emblée (p. ex. alendronate 70 mg/sem), calcium, vitamine D, exercices d'équilibre. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 2–4 sem, puis 6–12 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : déficit neurologique → urgence ; douleur persistante à 6 sem → référence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Investigation : radiographie peu sensible (20–38 %) ; IRM de choix. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : aîné : analgésie, mobilisation précoce avec aide à la marche, traitement de l'ostéoporose ; sportif : décharge relative, retour gradué, bilan de déficit énergétique. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 2–4 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : douleur réfractaire ou instabilité → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Spondylolyse ou spondylolisthésis isthmique

Probabilité de départ (provisoire) : 12 ans 6 %, 15 ans 8 %, 18 ans 6 %, 25 ans 2 %, 40 ans 1 % ; homme ×1,3, femme ×0,8.

Repères publiés : 47 % des adolescents sportifs lombalgiques (41,7 %) ; 5 % des adultes (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `sport.aucun>spondylolyse` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.pivot>spondylolyse` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.raquette>spondylolyse` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>spondylolyse` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>spondylolyse` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 3 / 1 | provisoire | — |
| `sport.muscu>spondylolyse` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,5 / 1 | provisoire | — |
| `duree>spondylolyse` | Depuis combien de temps | — | — | Plus de 3 mois 1,5 | provisoire | — |
| `apparition>spondylolyse` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,2 ; Graduel 2 | provisoire | — |
| `mecanisme>spondylolyse` | Mécanisme | — | — | Hyperextensions répétées (gymnastique, lancer, ballet) 4 | provisoire | — |
| `extension>spondylolyse` | Pire en extension ou debout cambré | — | — | 3 / 0,5 | provisoire | — |
| `sill>spondylolyse` | Décroché entre deux épineuses basses (marche d'escalier) | 60 % | 87 % | 4,62 / 0,46 | verifie | Petersen et coll., 2017, BMC Musculoskelet Disord (revue) : marche d'escalier à la palpation, RV+ 4,7 |
| `p_epineuse>spondylolyse` | Épineuse douloureuse à la percussion | — | — | 1,5 / 0,9 | provisoire | — |
| `arom_extension>spondylolyse` | Extension lombaire | — | — | Limitée avec douleur 2,5 | provisoire | — |
| `ext_passive>spondylolyse` | Extension lombaire passive | — | — | 2 / 0,8 | provisoire | — |
| `hyperext_uni>spondylolyse` | Hyperextension unipodale (stork) | — | — | 1,5 / 0,8 | a_verifier | Masci et coll., 2006, BJSM (PMID 16980534) : Se 50–55 %, Sp faible |

Conduite :
- Investigation : douleur en extension chez l'adolescent sportif ; radiographies debout face et profil (pas d'obliques) ; IRM en premier (réaction de stress), TDM pour la consolidation ; vitamine D. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : arrêt du sport et des activités douloureuses ≥ 6 sem (souvent 3 mois), physiothérapie (gainage en flexion) ; corset controversé. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : aux 4–6 sem ; retour au sport selon la douleur (3–4 mois en moyenne). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : glissement de grade ≥ 2, signes neurologiques, échec à 6 mois → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Scoliose dégénérative de l'adulte

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 1 %, 70 ans 3 %, 85 ans 4 %.

Repères publiés : 38 % à 40–90 ans (poolé) (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>scoliose` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>scoliose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 2 | provisoire | — |
| `localisation.thoracique>scoliose` | Où est la douleur : Monte vers le dos (thoracique) | — | — | 1,3 / 0,95 | provisoire | — |
| `scoliose_vue>scoliose` | Scoliose visible ou gibbosité | — | — | 5 / 0,5 | provisoire | — |
| `arom_flexion>scoliose` | Flexion lombaire | — | — | Limitée par raideur 1,3 | provisoire | — |

Conduite :
- Investigation : radiographie debout du rachis complet si déformation ou progression. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : comme fiche 6. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 3–6 mois. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : déséquilibre, radiculopathie réfractaire → chirurgie du rachis. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Spondyloarthrite axiale

Probabilité de départ (provisoire) : 12 ans 1 %, 20 ans 3 %, 30 ans 4 %, 45 ans 3 %, 60 ans 1 % ; homme ×1,3, femme ×0,8.

Repères publiés : Environ 5 % des lombalgies chroniques en médecine générale (0,3–24 %) (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>spa` | Côté de la douleur ou de l'irradiation | — | — | Les deux 1,5 | provisoire | — |
| `atcd_familiaux>spa` | ATCD familial de maladie rhumatologique | — | — | 1,52 / 0,88 | verifie | Joven et coll., 2017, Arthritis Care Res : antécédent familial de spondyloarthrite |
| `atcd_rhumato.synovite>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.goutte>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.par>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.spa>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 1,5 / 1 | provisoire | — |
| `atcd_rhumato.uveite>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | 6 % | 98 % | 3 / 0,96 | verifie | Joven et coll., 2017, Arthritis Care Res : uvéite, RV+ 3,00 |
| `atcd_rhumato.psoriasis>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | 14 % | 92 % | 1,68 / 0,94 | verifie | Joven et coll., 2017, Arthritis Care Res : psoriasis, RV+ 1,68 |
| `atcd_rhumato.mii>spa` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | 5 % | 99 % | 3,62 / 0,97 | verifie | Joven et coll., 2017, Arthritis Care Res : MII, RV+ 3,62 |
| `duree>spa` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 3 | provisoire | — |
| `apparition>spa` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 0,3 ; Insidieux 3 | provisoire | — |
| `localisation.fesse>spa` | Où est la douleur : Fesse ou sacro-iliaque, sous la ceinture | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.deux_jambes>spa` | Où est la douleur : Les deux fesses ou les deux jambes | — | — | 1,3 / 0,95 | provisoire | — |
| `localisation.thoracique>spa` | Où est la douleur : Monte vers le dos (thoracique) | — | — | 1,3 / 0,95 | provisoire | — |
| `type_douleur>spa` | Type de douleur | — | — | Sourde, profonde 1,2 | provisoire | — |
| `moment>spa` | Horaire | — | — | Pire le matin, mieux en bougeant 2 | provisoire | — |
| `nocturne>spa` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `fessalgie>spa` | Fessalgie à bascule (d'un côté puis de l'autre) | 35 % | 88 % | 2,87 / 0,74 | verifie | Joven et coll., 2017, Arthritis Care Res : RV+ 2,87 |
| `ains_reponse>spa` | Nette amélioration en 48 h avec un AINS | 67 % | 58 % | 1,61 / 0,57 | verifie | Joven et coll., 2017, Arthritis Care Res : RV+ 1,61 |
| `autres_articulations>spa` | Douleur ou enflure d'autres articulations | — | — | 1,5 / 0,9 | provisoire | — |
| `p_si>spa` | Sillon sacro-iliaque douloureux | — | — | 1,3 / 0,9 | provisoire | — |
| `arom_flexion>spa` | Flexion lombaire | — | — | Limitée par raideur 1,5 | provisoire | — |
| `arom_extension>spa` | Extension lombaire | — | — | Limitée par raideur 1,5 | provisoire | — |
| `schober>spa` | Schober diminué | 68 % | 47 % | 1,28 / 0,68 | verifie | Kim et coll., 2026, AFP : RV+ 1,3 |
| `grappe:berlin3>spa` | Combinaison : Critères de Berlin : 3 sur 4 ou plus | — | — | 12,4 / — | verifie | Rudwaleit et coll., 2006, Arthritis Rheum (critères de Berlin) : RV+ 12,4 |
| `grappe:berlin2>spa` | Combinaison : Critères de Berlin : 2 sur 4 | — | — | 3,7 / — | verifie | Rudwaleit et coll., 2006, Arthritis Rheum (critères de Berlin) : Se 70,3 %, Sp 81,2 %, RV+ 3,7 |
| `grappe:berlin0>spa` | Combinaison : Critères de Berlin : aucun | — | — | — / 0,25 | verifie | Rudwaleit et coll., 2006, Arthritis Rheum (critères de Berlin) : RV− 0,25 |

Conduite :
- Investigation : lombalgie ≥ 3 mois débutée avant 45 ans, de rythme inflammatoire ; CRP, HLA-B27, radiographie du bassin ; IRM des sacro-iliaques si radiographie négative. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : AINS à dose maximale tolérée (p. ex. naproxène 500 mg BID) ; changer d'AINS si réponse insuffisante ; exercice, arrêt du tabac ; pas de corticoïde systémique. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Suivi : 4 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : rhumatologie si lombalgie inflammatoire, arthrite, enthésite ou dactylite, uvéite, psoriasis, maladie inflammatoire intestinale, histoire familiale ou bonne réponse aux AINS ; œil rouge douloureux → ophtalmologie urgente ; trauma sur rachis ankylosé → TDM. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Cancer ou métastase rachidienne

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 60 ans 1 %, 80 ans 1 %.

Repères publiés : 0,7 % des lombalgies en soins primaires (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>cancer` | Depuis combien de temps | — | — | 6 semaines à 3 mois 1,5 | provisoire | — |
| `apparition>cancer` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Insidieux 1,2 | provisoire | — |
| `pas_mieux_1mois>cancer` | Pas d'amélioration après 1 mois de traitement | 50 % | 81 % | 2,63 / 0,62 | verifie | Chou et coll., 2007, Ann Intern Med : RV+ 3,0 |
| `localisation.thoracique>cancer` | Où est la douleur : Monte vers le dos (thoracique) | — | — | 1,2 / 1 | provisoire | — |
| `moment>cancer` | Horaire | — | — | Constante 2 | provisoire | — |
| `nocturne>cancer` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `sympt_generaux>cancer` | Perte de poids, sueurs nocturnes ou fatigue inexpliquées | — | — | 2,7 / — | verifie | Chou et coll., 2007, Ann Intern Med : perte de poids inexpliquée, RV+ 2,7 |
| `atcd_cancer>cancer` | Antécédent de cancer | — | — | 14,7 / — | verifie | Henschke et coll., 2007, Eur Spine J (PMID 17566791) : antécédent de cancer, RV+ 14,7 en première ligne (23,7 en revue) |
| `p_epineuse>cancer` | Épineuse douloureuse à la percussion | — | — | 2 / 0,7 | provisoire | — |

Conduite :
- Investigation : l'antécédent de cancer est le prédicteur le plus fort ; IRM du rachis ; FSC, calcium, électrophorèse des protéines. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : selon l'oncologie ; compression : dexaméthasone et transfert. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : tout déficit → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Spondylodiscite ou abcès épidural

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 0 %, 80 ans 0 %.

Repères publiés : 0,01 % des lombalgies en soins primaires (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `fluoro_cortico>infection` | Fluoroquinolone ou corticoïde récents | — | — | 2 / 0,95 | provisoire | — |
| `duree>infection` | Depuis combien de temps | — | — | Moins de 7 jours 1,3 | provisoire | — |
| `apparition>infection` | Mode d'apparition | — | — | Subit, sans traumatisme 1,5 ; Insidieux 1,3 | provisoire | — |
| `moment>infection` | Horaire | — | — | Constante 2 | provisoire | — |
| `nocturne>infection` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `fievre>infection` | Fièvre ou frissons | — | — | 3 / 0,5 | a_verifier | Lazzeri et coll., 2019 : fièvre chez environ 50 % (35–60 %) des infections rachidiennes |
| `sympt_generaux>infection` | Perte de poids, sueurs nocturnes ou fatigue inexpliquées | — | — | 2 / 0,9 | provisoire | — |
| `risque_infection.udi>infection` | Facteurs de risque d'infection : Drogues injectables | — | — | 6,9 / 1 | verifie | Shaw et coll., 2020, Eur Spine J : pathologie rachidienne grave, RV+ 6,9 (13,7 si autre foyer infectieux) |
| `risque_infection.immuno>infection` | Facteurs de risque d'infection : Immunosuppression ou diabète | — | — | 2,5 / 1 | provisoire | — |
| `risque_infection.geste>infection` | Facteurs de risque d'infection : Chirurgie, infiltration rachidienne ou bactériémie récentes | — | — | 4 / 1 | provisoire | — |
| `p_epineuse>infection` | Épineuse douloureuse à la percussion | — | — | 3 / 0,5 | provisoire | — |

Conduite :
- Investigation : VS, CRP, hémocultures ; IRM avec gadolinium en urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : transfert ; chirurgie du rachis et infectiologie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : fièvre + lombalgie + facteur de risque ou déficit → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Syndrome de la queue de cheval

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 0 %, 60 ans 0 %.

Repères publiés : 0,04–0,08 % des lombalgies en soins primaires (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>queue` | Côté de la douleur ou de l'irradiation | — | — | Les deux 3 | provisoire | — |
| `localisation.deux_jambes>queue` | Où est la douleur : Les deux fesses ou les deux jambes | — | — | 3 / 0,9 | provisoire | — |
| `faiblesse>queue` | Faiblesse d'une jambe ou pied qui accroche | — | — | 2 / 0,95 | provisoire | — |
| `selle>queue` | Engourdissement en selle | — | — | 11 / — | verifie | Shaw et coll., 2020, Eur Spine J : RV+ 11 (pathologie rachidienne grave, urgence) |
| `retention>queue` | Rétention urinaire, incontinence ou trouble fécal nouveaux | — | — | 6,4 / 0,2 | verifie | Chou et coll., 2007, Ann Intern Med ; Shaw et coll., 2020, Eur Spine J : rétention urinaire, Se 90 %, RV+ 6,4 |
| `sciatique_bilat>queue` | Sciatique des deux côtés, nouvelle | — | — | 2,2 / 0,95 | provisoire | — |
| `anal>queue` | Sensibilité périnéale ou tonus anal diminués | — | — | 3 / 0,9 | provisoire | — |

Conduite :
- Investigation : signes du bloc commun ; résidu post-mictionnel > 200 mL ; IRM en urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Traitement : transfert immédiat ; décompression en 24–48 h. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*
- Retour / référence : ne jamais renvoyer une sciatalgie bilatérale nouvelle sans évaluation. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Chou et al., « Diagnostic Imaging for Low Back Pain », Annals of Internal Medicine, 2011 ; Qaseem et al., lignes directrices de l'American College of Physicians, Annals of Internal Medicine, 2017 ; Deyo et Mirza, « Herniated Lumbar Intervertebral Disk », New England Journal of Medicine, 2016 ; Katz et al., « Lumbar Spinal Stenosis », JAMA, 2022 ; Ramiro et al., recommandations ASAS-EULAR, Annals of the Rheumatic Diseases, 2023.*

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j).
- Analgésie de base (enfant) : acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) ; ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j).
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; prudence ≥ 65 ans (IPP si risque digestif).
- Dosage de la charge : activité permise si douleur ≤ 3/10 et sans persistance après l'effort.
- Urgence (queue de cheval) : anesthésie en selle, rétention ou incontinence nouvelle, sciatalgie bilatérale nouvelle ou qui s'aggrave, faiblesse progressive.
- Autres drapeaux rouges : antécédent de cancer, fièvre, drogues IV, immunosuppression, trauma, ostéoporose, perte de poids, douleur nocturne.

Pour tous :
- Enseignement : rester actif, pronostic habituellement favorable, éviter le repos au lit
- Consignes de reconsultation : engourdissement en selle, trouble urinaire ou fécal, faiblesse progressive, fièvre, douleur nocturne croissante
