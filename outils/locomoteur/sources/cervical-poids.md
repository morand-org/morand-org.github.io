# Cervicalgie ou douleur cervico-brachiale : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs cervical` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 178 (validés 0, vérifiés 13, à vérifier 13, provisoires 152).

## Cervicalgie non spécifique (mécanique, posturale)

Probabilité de départ (provisoire) : 12 ans 45 %, 30 ans 45 %, 50 ans 40 %, 70 ans 35 %.

Repères publiés : Prévalence annuelle 30–50 % chez l'adulte, 21–42 % chez l'enfant ; 41,2 % des codes en médecine générale (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>nonspec` | Côté de la douleur ou de l'irradiation | — | — | Les deux 1,2 | provisoire | — |
| `travail>nonspec` | Occupation | — | — | Travail de bureau ou sédentaire 1,3 | provisoire | — |
| `sport.velo>nonspec` | Activités physiques : Vélo | — | — | 1,2 / 1 | provisoire | — |
| `sport.natation>nonspec` | Activités physiques : Natation | — | — | 1,2 / 1 | provisoire | — |
| `premier>nonspec` | Premier épisode | — | — | 0,9 / 1,1 | provisoire | — |
| `duree>nonspec` | Depuis combien de temps | — | — | Moins de 7 jours 1,2 ; Plus de 3 mois 1,2 | provisoire | — |
| `apparition>nonspec` | Mode d'apparition | — | — | Subit, sans traumatisme 1,2 ; Graduel 1,5 | provisoire | — |
| `mecanisme>nonspec` | Mécanisme | — | — | Faux mouvement, réveil avec le cou bloqué 1,5 | provisoire | — |
| `localisation.cou>nonspec` | Où est la douleur : Cou, sans irradiation | — | — | 2 / 0,6 | provisoire | — |
| `localisation.trapeze>nonspec` | Où est la douleur : Trapèze et omoplate | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.bras>nonspec` | Où est la douleur : Bras, sous le coude, trajet radiculaire | — | — | 0,4 / 1,1 | provisoire | — |
| `posture_agg>nonspec` | Pire en position prolongée (écran, lecture) | — | — | 1,8 / 0,7 | provisoire | — |
| `moment>nonspec` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `p_trapeze>nonspec` | Points gâchettes du trapèze | — | — | 1,2 / 0,9 | provisoire | — |

Conduite :
- Investigation : aucune imagerie sans drapeau rouge. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : éducation, rester actif, ergonomie ; analgésie de base ; exercices d'amplitude ± physiothérapie (renforcement supervisé si > 3 mois) ; pas de collet ni de modalités passives. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 4–6 sem si non résolu. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : faiblesse ou engourdissement d'un membre, trouble de la marche, fièvre, douleur nocturne progressive. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Syndrome myofascial (trapèze supérieur)

Probabilité de départ (provisoire) : 12 ans 5 %, 25 ans 12 %, 45 ans 12 %, 70 ans 6 % ; femme ×1,4, homme ×0,7.

Repères publiés : Points gâchettes chez 100 % de 224 cervicalgiques chroniques en soins primaires (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>myofascial` | Côté de la douleur ou de l'irradiation | — | — | Les deux 1,2 | provisoire | — |
| `travail>myofascial` | Occupation | — | — | Travail de bureau ou sédentaire 1,5 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,3 | provisoire | — |
| `duree>myofascial` | Depuis combien de temps | — | — | Plus de 3 mois 1,8 | provisoire | — |
| `apparition>myofascial` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Graduel 1,8 | provisoire | — |
| `localisation.trapeze>myofascial` | Où est la douleur : Trapèze et omoplate | — | — | 3 / 0,5 | provisoire | — |
| `localisation.tete>myofascial` | Où est la douleur : Tête (occiput, céphalée) | — | — | 1,3 / 0,95 | provisoire | — |
| `posture_agg>myofascial` | Pire en position prolongée (écran, lecture) | — | — | 1,8 / 0,7 | provisoire | — |
| `moment>myofascial` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `p_trapeze>myofascial` | Points gâchettes du trapèze | — | — | 4 / 0,3 | provisoire | — |

Conduite :
- Investigation : clinique. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : chaleur, étirements, correction posturale, physiothérapie ; analgésie de base en courte cure. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 4–6 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : comme fiche 1. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Syndrome facettaire cervical

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 5 %, 50 ans 10 %, 70 ans 12 %.

Repères publiés : 36–67 % des cervicalgies chroniques (blocs, milieu spécialisé) (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>facettaire` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>facettaire` | Mode d'apparition | — | — | Graduel 1,3 ; Insidieux 1,5 | provisoire | — |
| `localisation.cou>facettaire` | Où est la douleur : Cou, sans irradiation | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.tete>facettaire` | Où est la douleur : Tête (occiput, céphalée) | — | — | 1,3 / 0,95 | provisoire | — |
| `type_douleur>facettaire` | Type de douleur | — | — | Sourde, profonde 1,2 | provisoire | — |
| `posture_agg>facettaire` | Pire en position prolongée (écran, lecture) | — | — | 1,2 / 0,95 | provisoire | — |
| `ext_agg>facettaire` | Pire en regardant en haut ou en tournant la tête | — | — | 2,5 / 0,6 | provisoire | — |
| `p_segment>facettaire` | Sensibilité segmentaire paravertébrale | — | — | 1,6 / 0,08 | verifie | Blocs contrôlés (n = 125) : Se 94 %, RV− 0,08 |
| `arom_rotation>facettaire` | Rotation active | — | — | Limitée avec douleur 1,5 | provisoire | — |
| `arom_extension>facettaire` | Extension active | — | — | Limitée avec douleur 2 | provisoire | — |
| `ext_rot>facettaire` | Extension-rotation reproduit la douleur | — | — | 2,5 / 0,6 | provisoire | — |
| `grappe:facette_cluster>facettaire` | Combinaison : Examen manuel, sensibilité segmentaire et extension-rotation douloureuse | — | — | 4,8 / — | verifie | Blocs contrôlés (n = 125) : Se 77 %, Sp 84 %, RV+ 4,7–4,9 |

Conduite :
- Investigation : clinique (douleur en extension-rotation) ; imagerie seulement si drapeau rouge. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : comme fiche 1. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 6–8 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : réfractaire > 3 mois → clinique de la douleur (blocs, radiofréquence). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Arthrose cervicale ou discopathie dégénérative

Probabilité de départ (provisoire) : 12 ans 0 %, 35 ans 3 %, 50 ans 12 %, 65 ans 20 %, 80 ans 25 %.

Repères publiés : Dégénérescence discale radiographique 54 % (98 % à 60–69 ans), souvent asymptomatique ; 20,1 % chez l'adulte (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>arthrose` | Milieu de consultation | — | — | Urgence 0,6 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `cote>arthrose` | Côté de la douleur ou de l'irradiation | — | — | Les deux 1,5 | provisoire | — |
| `duree>arthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>arthrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 3 | provisoire | — |
| `type_douleur>arthrose` | Type de douleur | — | — | Sourde, profonde 1,2 | provisoire | — |
| `ext_agg>arthrose` | Pire en regardant en haut ou en tournant la tête | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>arthrose` | Horaire | — | — | Pire le matin, mieux en bougeant 1,3 | provisoire | — |
| `arom_rotation>arthrose` | Rotation active | — | — | Limitée avec douleur 1,5 ; Limitée par raideur 2,5 | provisoire | — |
| `arom_extension>arthrose` | Extension active | — | — | Limitée avec douleur 1,5 ; Limitée par raideur 2,5 | provisoire | — |

Conduite :
- Investigation : imagerie seulement si déficit ou drapeau rouge (changements dégénératifs fréquents sans symptômes). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : analgésie de base, physiothérapie, activité. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 6–8 sem ; rechercher une myélopathie à chaque visite. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : maladresse des mains, trouble de la marche, urgences mictionnelles. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Entorse cervicale (whiplash)

Probabilité de départ (provisoire) : 12 ans 4 %, 20 ans 8 %, 40 ans 7 %, 70 ans 4 %.

Repères publiés : Plus de 300/100 000 ; 38 % encore douloureux à 12 mois (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>entorse` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `sport.contact>entorse` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,5 / 1 | provisoire | — |
| `sport.glisse>entorse` | Activités physiques : Ski ou planche | — | — | 1,3 / 1 | provisoire | — |
| `duree>entorse` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 1,2 | provisoire | — |
| `apparition>entorse` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,1 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>entorse` | Mécanisme | — | — | Accident de la route (impact arrière, whiplash) 5 ; Contact sportif (plaquage, tête en avant) 1,5 ; Chute (de sa hauteur ou plus) 1,5 | provisoire | — |
| `arom_rotation>entorse` | Rotation active | — | — | Limitée avec douleur 2 | provisoire | — |

Conduite :
- Investigation : règle canadienne C-spine (fiche 21) ; grades I–II sans imagerie si règle négative. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : mobilisation précoce, exercices d'amplitude à domicile (5–10 répétitions, 6–8 fois/j), analgésie de base ; pas de collet ; grade III : physiothérapie supervisée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 2–4 sem, puis 3 mois (environ la moitié des grades II encore symptomatiques). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : déficit progressif → urgence ; signes neurologiques persistants à 3 mois → évaluation spécialisée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Céphalée cervicogénique

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 4 %, 50 ans 4 %, 70 ans 3 % ; femme ×1,5, homme ×0,7.

Repères publiés : 1–4,1 % de la population (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>cervicogenique` | Depuis combien de temps | — | — | Moins de 7 jours 0,5 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>cervicogenique` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 1,5 ; Insidieux 1,5 | provisoire | — |
| `localisation.tete>cervicogenique` | Où est la douleur : Tête (occiput, céphalée) | — | — | 5 / 0,3 | provisoire | — |
| `p_occipital>cervicogenique` | Nerf grand occipital douloureux | — | — | 1,5 / 0,9 | provisoire | — |
| `flexion_rotation>cervicogenique` | Flexion-rotation cervicale | 83 % | 83 % | 4,88 / 0,2 | verifie | Hall et coll., méta-analyse : test de flexion-rotation (n = 182) |

Conduite :
- Investigation : clinique ; imagerie si drapeau rouge de céphalée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : physiothérapie cervicale, analgésie de base ; bloc du grand nerf occipital si réfractaire. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : céphalée brutale, fièvre, déficit neurologique. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Contracture ou élongation musculaire du sportif

Probabilité de départ (provisoire) : 12 ans 4 %, 18 ans 6 %, 30 ans 3 %, 50 ans 2 %.

Repères publiés : 63 % des lésions cervicales des sportifs du secondaire (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>musculaire` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `sport.contact>musculaire` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `duree>musculaire` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; Plus de 3 mois 0,2 | provisoire | — |
| `apparition>musculaire` | Mode d'apparition | — | — | Subit, avec un traumatisme 3 | provisoire | — |
| `mecanisme>musculaire` | Mécanisme | — | — | Contact sportif (plaquage, tête en avant) 2 | provisoire | — |

Conduite :
- Investigation : règle canadienne C-spine si trauma ; examen neurologique complet. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : repos relatif, glace ou chaleur, analgésie de base ; retour au jeu avec amplitude complète indolore et force normale. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 1–2 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : symptômes neurologiques bilatéraux → urgence. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Radiculopathie cervicale

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 3 %, 50 ans 7 %, 65 ans 5 %, 80 ans 3 %.

Repères publiés : 83,2/100 000/an, pic à 50–54 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>radiculopathie` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,2 | provisoire | — |
| `travail>radiculopathie` | Occupation | — | — | Travail physique (charges, manutention) 1,2 | provisoire | — |
| `duree>radiculopathie` | Depuis combien de temps | — | — | 1 à 6 semaines 1,5 ; 6 semaines à 3 mois 1,3 | provisoire | — |
| `apparition>radiculopathie` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,3 ; Subit, sans traumatisme 1,5 ; Graduel 1,3 | provisoire | — |
| `localisation.cou>radiculopathie` | Où est la douleur : Cou, sans irradiation | — | — | 0,5 / 1,2 | provisoire | — |
| `localisation.trapeze>radiculopathie` | Où est la douleur : Trapèze et omoplate | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.bras>radiculopathie` | Où est la douleur : Bras, sous le coude, trajet radiculaire | — | — | 6 / 0,2 | provisoire | — |
| `bras_cou>radiculopathie` | Douleur du bras plus forte que celle du cou | — | — | 3 / 0,7 | a_verifier | Radiculopathie (n = 134) : spécificité élevée, RV+ < 5 |
| `type_douleur>radiculopathie` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 2,5 | provisoire | — |
| `ext_agg>radiculopathie` | Pire en regardant en haut ou en tournant la tête | — | — | 1,5 / 0,8 | provisoire | — |
| `bras_leve_agg>radiculopathie` | Pire bras levés au-dessus de la tête | — | — | 0,7 / 1,05 | provisoire | — |
| `main_tete>radiculopathie` | Soulagé la main sur la tête | — | — | 3 / 0,8 | provisoire | — |
| `moment>radiculopathie` | Horaire | — | — | Constante 1,2 | provisoire | — |
| `nocturne>radiculopathie` | Douleur la nuit | — | — | 1,3 / 0,9 | provisoire | — |
| `paresthesies>radiculopathie` | Engourdissements ou picotements dans le bras ou la main | — | — | 3 / 0,3 | provisoire | — |
| `arom_extension>radiculopathie` | Extension active | — | — | Limitée avec douleur 1,5 | provisoire | — |
| `rotation60>radiculopathie` | Rotation vers le côté atteint de moins de 60° | — | — | 1,8 / 0,23 | a_verifier | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : Se 89 %, Sp 49 % (non vérifiable dans l'extrait) |
| `reflexe_bicipital>radiculopathie` | Réflexe bicipital ou tricipital diminué | 24 % | 95 % | 4,8 / 0,8 | verifie | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : RV+ 4,9 ; RV− 0,80 |
| `faiblesse_ms>radiculopathie` | Faiblesse myotomale (biceps, deltoïde, triceps) | 24 % | 94 % | 4 / 0,81 | verifie | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : faiblesse du biceps, RV+ 3,7 |
| `hypoesthesie>radiculopathie` | Hypoesthésie dans un dermatome | — | — | 1,5 / 0,9 | a_verifier | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : RV+ 0,6–2,3 |
| `spurling>radiculopathie` | Spurling | — | — | 4 / 0,5 | a_verifier | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) ; Thoomes et coll., 2026, méta-analyse des tests neurodynamiques : Se 38–98 %, Sp 84–100 % |
| `ultt>radiculopathie` | ULTT A (nerf médian) | — | — | 1,3 / 0,12 | a_verifier | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : Se 97 %, Sp 22 % (non vérifiable dans l'extrait) |
| `distraction>radiculopathie` | Distraction cervicale | — | — | 4,4 / 0,6 | a_verifier | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : Se 44 %, Sp 90–97 % |
| `abduction>radiculopathie` | Signe d'abduction de l'épaule (main sur la tête) | — | — | 2,08 / 0,66 | verifie | Thoomes et coll., 2026, méta-analyse des tests neurodynamiques |
| `epaule_mob>radiculopathie` | Épaule : mobilisation | — | — | Douloureuse ou limitée 0,7 | provisoire | — |
| `grappe:wainner4>radiculopathie` | Combinaison : Wainner : 4 sur 4 (ULTT A, rotation < 60°, distraction, Spurling) | — | — | 30,3 / — | verifie | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : RV+ 30,3 |
| `grappe:wainner3>radiculopathie` | Combinaison : Wainner : 3 sur 4 | — | — | 6,1 / — | a_verifier | Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82) : Se 39 %, Sp 94 %, RV+ 6,1 (non vérifiable dans l'extrait) |
| `grappe:neuro_neg>radiculopathie` | Combinaison : Tests neurodynamiques tous négatifs (ULTT, Spurling, distraction) | — | — | — / 0,08 | verifie | Thoomes et coll., 2026, méta-analyse des tests neurodynamiques ; Grondin : 0 sur 4, RV− 0,06–0,08 |

Conduite :
- Investigation : pas d'imagerie initiale ; IRM si douleur importante à 4–6 sem ou déficit progressif. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : AINS, physiothérapie (exercices, mobilisation, traction) ; amélioration habituelle en 4–6 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 2–4 sem (force, réflexes). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : chirurgie si douleur invalidante après 6–12 sem, déficit moteur progressif ou myélopathie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Stinger ou burner (neurapraxie du plexus brachial)

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 3 %, 25 ans 2 %, 35 ans 1 % ; homme ×3, femme ×0,3.

Repères publiés : Prévalence de carrière 49–65 % au football universitaire ; 64 % des lésions cervicales au football (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>stinger` | Milieu de consultation | — | — | Urgence 0,8 ; Clinique de médecine du sport 1,5 | provisoire | — |
| `cote>stinger` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,2 | provisoire | — |
| `sport.contact>stinger` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 4 / 1 | provisoire | — |
| `duree>stinger` | Depuis combien de temps | — | — | Moins de 7 jours 4 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>stinger` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,1 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>stinger` | Mécanisme | — | — | Accident de la route (impact arrière, whiplash) 0,3 ; Contact sportif (plaquage, tête en avant) 6 | provisoire | — |
| `localisation.bras>stinger` | Où est la douleur : Bras, sous le coude, trajet radiculaire | — | — | 2 / 0,8 | provisoire | — |
| `type_douleur>stinger` | Type de douleur | — | — | Brûlure 2 ; Choc électrique 2 | provisoire | — |
| `paresthesies>stinger` | Engourdissements ou picotements dans le bras ou la main | — | — | 2 / 0,7 | provisoire | — |
| `brulure_transitoire>stinger` | Brûlure ou engourdissement d'un bras après un contact, quelques minutes | — | — | 10 / 0,3 | provisoire | — |
| `faiblesse_ms>stinger` | Faiblesse myotomale (biceps, deltoïde, triceps) | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : imagerie si symptômes > 24 h, récidive ou atteinte bilatérale. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : retrait du jeu ; retour le jour même seulement si unilatéral, résolu en < 5 min, examen neurologique, force et amplitude normaux. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 24–48 h si symptômes persistants ; 2ᵉ épisode dans la saison : retrait et imagerie ; ≥ 3 épisodes : imagerie ± EMG, arrêt pour la saison. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : symptômes bilatéraux = lésion médullaire jusqu'à preuve du contraire → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Torticolis aigu acquis

Probabilité de départ (provisoire) : 12 ans 4 %, 25 ans 4 %, 50 ans 3 %, 70 ans 2 %.

Repères publiés : 3,2 % chez l'adulte ; pas d'incidence (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>torticolis` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,3 | provisoire | — |
| `premier>torticolis` | Premier épisode | — | — | 1,2 / 0,9 | provisoire | — |
| `duree>torticolis` | Depuis combien de temps | — | — | Moins de 7 jours 4 ; 1 à 6 semaines 0,5 ; 6 semaines à 3 mois 0,2 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>torticolis` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,7 ; Subit, sans traumatisme 6 ; Graduel 0,3 ; Insidieux 0,2 | provisoire | — |
| `mecanisme>torticolis` | Mécanisme | — | — | Faux mouvement, réveil avec le cou bloqué 5 | provisoire | — |
| `localisation.cou>torticolis` | Où est la douleur : Cou, sans irradiation | — | — | 1,5 / 0,9 | provisoire | — |
| `moment>torticolis` | Horaire | — | — | Pire le matin, mieux en bougeant 1,5 | provisoire | — |
| `torticolis_vu>torticolis` | Attitude vicieuse (tête inclinée et tournée) | — | — | 8 / 0,3 | provisoire | — |
| `arom_rotation>torticolis` | Rotation active | — | — | Complète et indolore 0,2 ; Limitée avec douleur 3 | provisoire | — |

Conduite :
- Investigation : clinique si afébrile et sans trauma ; chez l'enfant, rechercher infection ORL, trauma et signes neurologiques. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : analgésie de base, chaleur, collet souple quelques jours ; myorelaxant en courte cure chez l'adulte. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 1 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : fièvre, dysphagie, déficit ; non résolu à 1 sem chez l'enfant → TDM dynamique et référence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Polymyalgia rheumatica

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 0 %, 65 ans 1 %, 80 ans 2 % ; femme ×1,5, homme ×0,7.

Repères publiés : 34–113/100 000/an après 50 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>ppr` | Milieu de consultation | — | — | Urgence 1,2 ; Clinique de médecine du sport 0,36 | provisoire | — |
| `cote>ppr` | Côté de la douleur ou de l'irradiation | — | — | Les deux 6 | provisoire | — |
| `duree>ppr` | Depuis combien de temps | — | — | Moins de 7 jours 0,7 ; 1 à 6 semaines 1,5 | provisoire | — |
| `apparition>ppr` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 2 | provisoire | — |
| `localisation.epaules_hanches>ppr` | Où est la douleur : Aux deux épaules et aux hanches, avec raideur | — | — | 10 / 0,3 | provisoire | — |
| `moment>ppr` | Horaire | — | — | Pire le matin, mieux en bougeant 3 | provisoire | — |
| `nocturne>ppr` | Douleur la nuit | — | — | 1,5 / 0,9 | provisoire | — |
| `raideur>ppr` | Raideur matinale | — | — | 30 minutes ou plus 5 | provisoire | — |
| `raideur_ceintures>ppr` | Raideur matinale des épaules et des hanches | — | — | 10 / 0,2 | provisoire | — |
| `symptomes_acg>ppr` | Céphalée nouvelle, claudication de la mâchoire ou trouble visuel | — | — | 3 / 0,9 | provisoire | — |
| `arom_rotation>ppr` | Rotation active | — | — | Limitée par raideur 1,5 | provisoire | — |

Conduite :
- Investigation : VS et CRP (requises), FSC, bilan de base, FR et anti-CCP ; rechercher une artérite à cellules géantes. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : prednisone 15 mg DIE (12,5–25 mg), réduire à 10 mg en 4–8 sem, puis de 1 mg toutes les 4 sem ; calcium, vitamine D, protection osseuse. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 2–4 sem (réponse attendue en 2 sem), puis toutes les 4–8 sem la 1ʳᵉ année ; référence en rhumatologie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : céphalée, claudication de la mâchoire, trouble visuel → corticoïdes et spécialiste en < 24 h. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Myélopathie cervicale dégénérative

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 55 ans 1 %, 70 ans 2 %, 85 ans 3 % ; homme ×1,5, femme ×0,7.

Repères publiés : Au moins 605/million, probablement sous-diagnostiquée ; 18,9/100 000 à 75–79 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>myelopathie` | Milieu de consultation | — | — | Urgence 1,2 ; Clinique de médecine du sport 0,36 | provisoire | — |
| `cote>myelopathie` | Côté de la douleur ou de l'irradiation | — | — | Les deux 2,5 | provisoire | — |
| `duree>myelopathie` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>myelopathie` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Insidieux 3 | provisoire | — |
| `maladresse>myelopathie` | Maladresse des mains (boutons, écriture) | 58 % | 92 % | 7,25 / 0,46 | a_verifier | Myélopathie : 139 cas contre 108 témoins sains (spécificité surestimée) : RV+ 7,3 (calculé) |
| `marche_myelo>myelopathie` | Trouble de la marche ou de l'équilibre | 58 % | 92 % | 7,25 / 0,46 | a_verifier | Myélopathie : 139 cas contre 108 témoins sains (spécificité surestimée) : RV+ 7,3 (calculé) |
| `sphincters>myelopathie` | Trouble urinaire ou fécal nouveau | 41 % | 91 % | 4,56 / 0,65 | a_verifier | Myélopathie : 139 cas contre 108 témoins sains (spécificité surestimée) : RV+ 4,6 (calculé) |
| `hoffmann>myelopathie` | Hoffmann | — | — | 2,2 / 0,63 | verifie | Cook et coll., 2010, JOSPT (cluster de myélopathie, n = 249) |
| `supinateur>myelopathie` | Réflexe du supinateur inversé | — | — | 3 / 0,8 | provisoire | — |
| `babinski>myelopathie` | Babinski | — | — | 5 / 0,9 | provisoire | — |
| `tandem>myelopathie` | Marche en tandem anormale | 87 % | 53 % | 1,85 / 0,25 | a_verifier | Contre témoins sains : RV+ 1,85 ; RV− 0,25 (calculés) |
| `grappe:cook3>myelopathie` | Combinaison : Cook : 3 sur 5 ou plus (marche, Hoffmann, supinateur inversé, Babinski, plus de 45 ans) | — | — | 30,9 / — | verifie | Cook et coll., 2010, JOSPT (cluster de myélopathie, n = 249) : Sp 99 %, RV+ 30,9 (5,5–181,8) |
| `grappe:cook0>myelopathie` | Combinaison : Cook : 0 ou 1 sur 5 | — | — | — / 0,18 | verifie | Cook et coll., 2010, JOSPT (cluster de myélopathie, n = 249) : RV− 0,18 (0,12–0,42) |

Conduite :
- Investigation : IRM cervicale ; score mJOA. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : référence chirurgicale si modérée ou sévère (mJOA ≤ 14) ; légère (15–17) : chirurgie ou réadaptation supervisée avec surveillance. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : tous les 3–6 mois si non opérée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : détérioration rapide de la marche, des mains ou des sphincters → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Atteinte cervicale de la polyarthrite rhumatoïde (instabilité C1–C2)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 60 ans 0 %, 80 ans 0 % ; femme ×2, homme ×0,5.

Repères publiés : Atteinte cervicale chez 25–88 % des PAR ; atlanto-axoïdienne sévère 2,1 % (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>par` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `atcd_rhumato.uveite>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.synovite>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.goutte>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.spa>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 1 / 1 | provisoire | — |
| `atcd_rhumato.par>par` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 50 / 0,1 | provisoire | — |
| `apparition>par` | Mode d'apparition | — | — | Insidieux 1,5 | provisoire | — |
| `sharp_purser>par` | Sharp-Purser (PAR seulement) | 88 % | 96 % | 22 / 0,13 | verifie | Sharp-Purser dans la PAR (n = 123) |

Conduite :
- Investigation : radiographies face, profil, bouche ouverte et flexion-extension (intervalle atlanto-dental > 3 mm anormal, > 5 mm instable) ; IRM si signes neurologiques. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : contrôle de la maladie (rhumatologie). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : radiographies dynamiques tous les 2–3 ans et avant toute intubation. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : instabilité ou signes neurologiques → neurochirurgie ; signe de Lhermitte, faiblesse → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Fracture cervicale (odontoïde, fragilité)

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 0 %, 65 ans 1 %, 80 ans 2 %, 90 ans 3 %.

Repères publiés : C2 : 8,2/100 000 ; 81 % par chute de faible énergie après 70 ans (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>fracture` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 1,2 | provisoire | — |
| `sport.contact>fracture` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,3 / 1 | provisoire | — |
| `sport.glisse>fracture` | Activités physiques : Ski ou planche | — | — | 1,5 / 1 | provisoire | — |
| `osteoporose>fracture` | Ostéoporose ou fracture de fragilité | — | — | 2,5 / 0,9 | provisoire | — |
| `duree>fracture` | Depuis combien de temps | — | — | Moins de 7 jours 2 | provisoire | — |
| `apparition>fracture` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Graduel 0,1 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>fracture` | Mécanisme | — | — | Accident de la route (impact arrière, whiplash) 1,3 ; Contact sportif (plaquage, tête en avant) 1,3 ; Chute (de sa hauteur ou plus) 3 ; Faux mouvement, réveil avec le cou bloqué 0,2 | provisoire | — |
| `p_mediane>fracture` | Sensibilité médiane des épineuses | — | — | 3 / 0,3 | provisoire | — |
| `grappe:ccr_neg>fracture` | Combinaison : Règle canadienne C-spine négative | — | — | — / 0,01 | verifie | Stiell et coll., 2001, JAMA (PMID 11597289) ; 10 études, n = 35 544 : Se 99,9 %, Sp 18,8 %, RV− 0,007 |

Conduite :
- Investigation : ≥ 65 ans avec trauma = imagerie d'emblée (TDM). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : collet rigide, transfert et avis de chirurgie du rachis ; bilan et traitement de l'ostéoporose. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : par l'équipe spécialisée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : tout déficit neurologique → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Investigation : ≥ 16 ans, alerte et stable. Imagerie (TDM) si ≥ 65 ans, mécanisme dangereux (chute ≥ 1 m ou 5 marches, charge axiale, collision > 100 km/h, tonneau, éjection, véhicule récréatif, vélo) ou paresthésies. Sinon, en présence d'un facteur de faible risque (collision arrière simple, assis, ambulant, douleur retardée, pas de sensibilité médiane), tester la rotation active de 45° des deux côtés : possible = pas d'imagerie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : règle positive → collet et transfert ; règle négative → fiche 5. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : selon le diagnostic. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : déficit neurologique, douleur médiane croissante. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Syndrome du défilé thoracique

Probabilité de départ (provisoire) : 12 ans 0 %, 20 ans 1 %, 35 ans 1 %, 55 ans 1 % ; femme ×1,5, homme ×0,7.

Repères publiés : De 1–3/100 000 à 3–80/1 000 selon la définition (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>defile` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,5 | provisoire | — |
| `travail>defile` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `sport.lancer>defile` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 2 / 1 | provisoire | — |
| `sport.natation>defile` | Activités physiques : Natation | — | — | 1,5 / 1 | provisoire | — |
| `duree>defile` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>defile` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,5 ; Graduel 1,5 | provisoire | — |
| `localisation.bras>defile` | Où est la douleur : Bras, sous le coude, trajet radiculaire | — | — | 2 / 0,7 | provisoire | — |
| `type_douleur>defile` | Type de douleur | — | — | Brûlure 1,5 | provisoire | — |
| `bras_leve_agg>defile` | Pire bras levés au-dessus de la tête | — | — | 3 / 0,2 | a_verifier | Défilé neurogène : aggravation bras en élévation chez 97 % (Sp non mesurée) |
| `paresthesies>defile` | Engourdissements ou picotements dans le bras ou la main | — | — | 2 / 0,2 | a_verifier | Défilé neurogène : paresthésies chez 94 % (Sp non mesurée) |
| `roos>defile` | Roos (EAST) : bras levés 3 min | — | — | 3 / 0,5 | provisoire | — |

Conduite :
- Investigation : clinique (forme neurogène > 90 %) ; Doppler si forme vasculaire suspectée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : physiothérapie spécifique (posture, ceinture scapulaire) 3–6 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : réfractaire ou déficit moteur → chirurgie ; œdème ou cyanose du bras, main ischémique → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Spondylodiscite cervicale ou abcès épidural

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 0 %, 80 ans 0 %.

Repères publiés : 11–12 % des ostéomyélites vertébrales (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `milieu>infection` | Milieu de consultation | — | — | Urgence 2 ; Clinique de médecine du sport 0,6 | provisoire | — |
| `apparition>infection` | Mode d'apparition | — | — | Subit, sans traumatisme 1,5 | provisoire | — |
| `moment>infection` | Horaire | — | — | Constante 2 | provisoire | — |
| `nocturne>infection` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `fievre>infection` | Fièvre ou frissons | — | — | 3 / 0,5 | provisoire | — |
| `risque_infection.udi>infection` | Facteurs de risque d'infection : Drogues injectables | — | — | 5 / 1 | provisoire | — |
| `risque_infection.immuno>infection` | Facteurs de risque d'infection : Immunosuppression ou diabète | — | — | 2,5 / 1 | provisoire | — |
| `torticolis_vu>infection` | Attitude vicieuse (tête inclinée et tournée) | — | — | 1,5 / 0,95 | provisoire | — |
| `p_mediane>infection` | Sensibilité médiane des épineuses | — | — | 2 / 0,7 | provisoire | — |

Conduite :
- Investigation : VS, CRP, hémocultures ; IRM avec gadolinium en urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : transfert ; chirurgie du rachis et infectiologie ; pas d'antibiotique empirique avant les prélèvements, sauf sepsis ou compression. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : hospitalier. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : fièvre + douleur rachidienne + facteur de risque (diabète, drogues IV, dialyse, procédure récente) → urgence. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Névralgie occipitale (Arnold)

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 1 %, 50 ans 1 %, 70 ans 1 %.

Repères publiés : 1,3 % chez l'adulte (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>arnold` | Côté de la douleur ou de l'irradiation | — | — | Les deux 0,5 | provisoire | — |
| `localisation.tete>arnold` | Où est la douleur : Tête (occiput, céphalée) | — | — | 4 / 0,6 | provisoire | — |
| `type_douleur>arnold` | Type de douleur | — | — | Brûlure 1,5 ; Choc électrique 3 | provisoire | — |
| `p_occipital>arnold` | Nerf grand occipital douloureux | — | — | 6 / 0,3 | provisoire | — |

Conduite :
- Investigation : clinique. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Traitement : analgésie de base, chaleur, physiothérapie ; bloc du grand nerf occipital (diagnostique et thérapeutique). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Suivi : 4–6 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*
- Retour / référence : réfractaire → clinique de la douleur. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Stiell et al., « The Canadian C-Spine Rule », JAMA, 2001 ; Côté et al., lignes directrices OPTIMa, European Spine Journal, 2016 ; Leonard et al., règle PECARN, Lancet Child & Adolescent Health, 2024 ; Dejaco et al., recommandations EULAR/ACR sur la polymyalgia rheumatica, Arthritis & Rheumatology, 2015 ; Dutton et al., Muscle & Nerve, 2024.*

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j) ; diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID).
- Analgésie de base (enfant) : acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) ; ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j).
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; prudence ≥ 65 ans (IPP si risque digestif).
- Dosage de la charge : activité permise si douleur ≤ 3/10 et sans persistance après l'effort.
- Drapeaux rouges cervicaux : trauma, déficit neurologique, signes de myélopathie (maladresse des mains, trouble de la marche, sphincters), fièvre, antécédent de cancer, douleur nocturne progressive.

Pour tous :
- Enseignement : rester actif, pas de collet cervical, pronostic habituellement favorable
- Consignes de reconsultation : faiblesse ou maladresse des mains, trouble de la marche, trouble urinaire, fièvre, céphalée inhabituelle
