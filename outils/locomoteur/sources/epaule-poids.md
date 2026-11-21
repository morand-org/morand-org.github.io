# Douleur à l'épaule : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs epaule` (Prototype 0.5 · novembre 2026). Ne pas modifier à la main.

Poids : 253 (validés 0, vérifiés 31, à vérifier 7, provisoires 215).

## Douleur sous-acromiale (tendinopathie de la coiffe)

Probabilité de départ (provisoire) : 12 ans 8 %, 20 ans 15 %, 35 ans 30 %, 50 ans 35 %, 65 ans 30 %, 80 ans 25 %.

Repères publiés : 29 % des nouveaux cas en médecine générale ; 65–85 % selon le contexte (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `travail>sous_acro` | Occupation | — | — | Travail physique (charges, manutention) 1,3 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,5 | provisoire | — |
| `sport.raquette>sous_acro` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,5 / 1 | provisoire | — |
| `sport.lancer>sous_acro` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 1,5 / 1 | provisoire | — |
| `sport.muscu>sous_acro` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,2 / 1 | provisoire | — |
| `sport.natation>sous_acro` | Activités physiques : Natation | — | — | 1,8 / 1 | provisoire | — |
| `sport.escalade>sous_acro` | Activités physiques : Escalade | — | — | 1,3 / 1 | provisoire | — |
| `duree>sous_acro` | Depuis combien de temps | — | — | Moins de 7 jours 0,6 ; 1 à 6 semaines 1,1 ; 6 semaines à 3 mois 1,3 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>sous_acro` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Graduel 2 ; Insidieux 1,5 | provisoire | — |
| `localisation.laterale>sous_acro` | Où est la douleur : Face latérale du bras (deltoïde) | — | — | 3 / 0,4 | provisoire | — |
| `localisation.anterieure>sous_acro` | Où est la douleur : Antérieure (coulisse du biceps) | — | — | 1,2 / 0,9 | provisoire | — |
| `localisation.sous_coude>sous_acro` | Où est la douleur : Irradie sous le coude | — | — | 0,5 / 1,05 | provisoire | — |
| `bras_leve>sous_acro` | Pire bras levé ou au-dessus de la tête | — | — | 2,5 / 0,4 | provisoire | — |
| `couche_epaule>sous_acro` | Pire couché sur l'épaule | — | — | 1,8 / 0,6 | provisoire | — |
| `faiblesse>sous_acro` | Faiblesse à lever le bras | — | — | 1,2 / 0,9 | provisoire | — |
| `raideur_prog>sous_acro` | Perte progressive de mouvement (difficulté à s'habiller, à attacher le soutien-gorge) | — | — | 0,6 / 1,1 | provisoire | — |
| `cou_aggrave>sous_acro` | Douleur reproduite par les mouvements du cou | — | — | 0,6 / 1,1 | provisoire | — |
| `moment>sous_acro` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>sous_acro` | Douleur la nuit | — | — | 1,5 / 0,7 | provisoire | — |
| `p_trochiter>sous_acro` | Trochiter (insertion de la coiffe) | — | — | 1,5 / 0,7 | provisoire | — |
| `arom_elev>sous_acro` | Élévation active (flexion) | — | — | Limitée avec douleur 1,5 | provisoire | — |
| `prom_re>sous_acro` | Rotation externe passive | — | — | Complète, fin douloureuse 1,3 | provisoire | — |
| `rrom_re>sous_acro` | Rotation externe résistée (positif : douloureuse, faible) | 63 % | 75 % | 2,52 / 0,49 | verifie | Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe) : douleur ou faiblesse, RV+ 2,6 ; RV− 0,49 |
| `jobe>sous_acro` | Abduction résistée (Jobe) | — | — | Forte et indolore 0,5 ; Douloureuse 2 ; Faible 1,5 | provisoire | — |
| `arc>sous_acro` | Arc douloureux | 71 % | 81 % | 3,74 / 0,36 | verifie | Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe) |
| `hawkins>sous_acro` | Hawkins-Kennedy | 76 % | 48 % | 1,46 / 0,5 | verifie | Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe) |
| `neer>sous_acro` | Neer | — | — | 1,3 / 0,8 | a_verifier | Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe) : RV+ 0,98–1,6 ; RV− 0,60–1,1 |
| `grappe:park_conflit>sous_acro` | Combinaison : Park : Hawkins + arc douloureux + rotation externe résistée | — | — | 10,6 / — | a_verifier | Park et coll., 2005, J Bone Joint Surg Am (PMID 15995110) : probabilité post-test 95 % ; RV+ ≈ 10,6 non vérifiable dans l'extrait |
| `grappe:michener_pos>sous_acro` | Combinaison : Michener : 3 sur 5 ou plus | — | — | 2,9 / — | verifie | Michener et coll., 2009, Arch Phys Med Rehabil (PMID 19887215) : RV+ 2,9 (arthroscopie, n = 55) |
| `grappe:michener_neg>sous_acro` | Combinaison : Michener : moins de 3 sur 5 | — | — | — / 0,34 | verifie | Michener et coll., 2009, Arch Phys Med Rehabil (PMID 19887215) : RV− 0,34 |

Conduite :
- Investigation : clinique ; pas d'imagerie initiale ; radiographie ± échographie si échec à 6–12 sem, faiblesse ou trauma. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : éducation, activité selon la douleur, analgésie de base, exercices à domicile ou physiothérapie ; infiltration sous-acromiale (triamcinolone ou méthylprednisolone ≤ 20 mg) si douleur nocturne (soulagement 4–8 sem). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6 sem, puis 3 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : faiblesse marquée ou échec à 3 mois (rupture) → imagerie et orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Myalgie ou douleur non spécifique

Probabilité de départ (provisoire) : 12 ans 25 %, 20 ans 20 %, 35 ans 15 %, 50 ans 10 %, 70 ans 6 %.

Repères publiés : 17 % des diagnostics ; le plus fréquent avant 40 ans ; 24 % chez l'adolescent (cervico-scapulaire) (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `duree>myalgie` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 ; 1 à 6 semaines 1,3 ; Plus de 3 mois 0,6 | provisoire | — |
| `localisation.posterieure>myalgie` | Où est la douleur : Postérieure ou scapulaire | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.trapeze>myalgie` | Où est la douleur : Trapèze, base du cou | — | — | 2,5 / 0,6 | provisoire | — |
| `cou_aggrave>myalgie` | Douleur reproduite par les mouvements du cou | — | — | 1,3 / 0,9 | provisoire | — |
| `nocturne>myalgie` | Douleur la nuit | — | — | 0,6 / 1,2 | provisoire | — |
| `p_trapeze>myalgie` | Trapèze et angulaire | — | — | 2,5 / 0,6 | provisoire | — |

Conduite :
- Investigation : clinique ; examiner le rachis cervical. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : analgésie de base, exercices, ergonomie. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 4–6 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Capsulite rétractile

Probabilité de départ (provisoire) : 12 ans 0 %, 35 ans 2 %, 45 ans 8 %, 55 ans 10 %, 65 ans 6 %, 80 ans 3 % ; femme ×1,4, homme ×0,7.

Repères publiés : 2,4/1 000/an ; prévalence 2–5 % (10–35 % chez le diabétique) ; surtout entre 40 et 70 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>capsulite` | Épaule atteinte | — | — | Les deux 1,3 | provisoire | — |
| `diabete>capsulite` | Diabète ou neuropathie périphérique | — | — | 2,5 / 0,85 | a_verifier | Diabète : rapport de cotes 3,69 pour la capsulite (facteur de risque, pas un RV) |
| `premier>capsulite` | Premier épisode | — | — | 1,3 / 0,7 | provisoire | — |
| `duree>capsulite` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; 6 semaines à 3 mois 1,8 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>capsulite` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 0,6 ; Graduel 1,5 ; Insidieux 2,5 | provisoire | — |
| `localisation.laterale>capsulite` | Où est la douleur : Face latérale du bras (deltoïde) | — | — | 1,5 / 0,8 | provisoire | — |
| `localisation.diffuse>capsulite` | Où est la douleur : Diffuse, profonde | — | — | 2,5 / 0,6 | provisoire | — |
| `type_douleur>capsulite` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `couche_epaule>capsulite` | Pire couché sur l'épaule | — | — | 1,5 / 0,8 | provisoire | — |
| `faiblesse>capsulite` | Faiblesse à lever le bras | — | — | 1,3 / 0,9 | provisoire | — |
| `raideur_prog>capsulite` | Perte progressive de mouvement (difficulté à s'habiller, à attacher le soutien-gorge) | — | — | 6 / 0,2 | provisoire | — |
| `moment>capsulite` | Horaire | — | — | Pire le matin, mieux en bougeant 1,2 ; Constante 1,3 | provisoire | — |
| `nocturne>capsulite` | Douleur la nuit | — | — | 2 / 0,6 | provisoire | — |
| `arom_elev>capsulite` | Élévation active (flexion) | — | — | Complète et indolore 0,2 ; Limitée avec douleur 2 ; Limitée par raideur 3 | provisoire | — |
| `arom_re>capsulite` | Rotation externe active | — | — | Complète et indolore 0,2 ; Limitée avec douleur 2 ; Limitée par raideur 4 | provisoire | — |
| `prom_re>capsulite` | Rotation externe passive | — | — | Complète et indolore 0,05 ; Limitée avec douleur 6 ; Limitée par raideur 8 | provisoire | — |
| `prom_flex>capsulite` | Flexion passive | — | — | Complète et indolore 0,3 | provisoire | — |

Conduite :
- Investigation : clinique (perte de la rotation externe passive) ; radiographie pour exclure une arthrose ; glycémie ou HbA1c et TSH (associations). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : éducation (évolution lente mais favorable), analgésie de base, infiltration intra-articulaire de corticoïde avec physiothérapie (mobilisation) ; douleur sévère : prednisone 30 mg DIE pendant 3 sem, puis sevrage. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6 sem, puis 3 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : peu d'amélioration après 3–6 mois → orthopédie ou physiatrie (distension, manipulation). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Entorse ou disjonction acromio-claviculaire

Probabilité de départ (provisoire) : 12 ans 4 %, 18 ans 8 %, 30 ans 6 %, 50 ans 3 %, 70 ans 2 % ; homme ×2, femme ×0,5.

Repères publiés : 11 % des traumatismes aigus ; 25,6 % des lésions d'épaule NCAA, 41,2 % en sport de collision (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>ac_entorse` | Épaule atteinte | — | — | Les deux 0,1 | provisoire | — |
| `sport.aucun>ac_entorse` | Activités physiques : Peu ou pas de sport | — | — | 0,6 / 1 | provisoire | — |
| `sport.velo>ac_entorse` | Activités physiques : Vélo | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>ac_entorse` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 3 / 1 | provisoire | — |
| `sport.glisse>ac_entorse` | Activités physiques : Ski ou planche | — | — | 1,8 / 1 | provisoire | — |
| `duree>ac_entorse` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 6 semaines à 3 mois 0,4 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>ac_entorse` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,2 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>ac_entorse` | Mécanisme | — | — | Chute ou coup sur le moignon de l'épaule 5 ; Chute sur la main tendue 0,6 ; Bras forcé en abduction et rotation externe 0,3 | provisoire | — |
| `localisation.sommet>ac_entorse` | Où est la douleur : Sommet de l'épaule (acromio-claviculaire) | — | — | 4 / 0,4 | provisoire | — |
| `deformation>ac_entorse` | Déformation visible ou épaule « carrée » | — | — | 3 / 0,8 | provisoire | — |
| `marche_ac>ac_entorse` | Marche d'escalier acromio-claviculaire | — | — | 8 / 0,6 | provisoire | — |
| `p_ac>ac_entorse` | Acromio-claviculaire | — | — | 3 / 0,2 | provisoire | — |
| `add_horiz>ac_entorse` | Adduction horizontale (cross-body) | — | — | 2 / 0,5 | provisoire | — |

Conduite :
- Investigation : radiographies avec incidence de Zanca, comparatives. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : types I–II : écharpe 3–7 j (max 2 sem), glace, analgésie, mobilisation précoce ; retour au sport vers 2 sem (I) ou 3–6 sem (II) ; type III : traitement conservateur, réévaluation à 6 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 1–2 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : types IV–VI → orthopédie rapide ; type III chez l'athlète ou le travailleur manuel → avis orthopédique. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Rupture transfixiante de la coiffe

Probabilité de départ (provisoire) : 12 ans 0 %, 40 ans 2 %, 55 ans 6 %, 65 ans 12 %, 75 ans 20 %, 85 ans 25 %.

Repères publiés : Environ 30 % après 70 ans, la moitié asymptomatique ; 10,7 % à 50–59 ans, 36,6 % après 80 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>rupture` | Épaule atteinte | — | — | Les deux 0,8 | provisoire | — |
| `travail>rupture` | Occupation | — | — | Travail physique (charges, manutention) 1,3 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,3 | provisoire | — |
| `duree>rupture` | Depuis combien de temps | — | — | Moins de 7 jours 1,5 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>rupture` | Mode d'apparition | — | — | Subit, avec un traumatisme 2,5 ; Subit, sans traumatisme 1,5 ; Insidieux 1,5 | provisoire | — |
| `mecanisme>rupture` | Mécanisme | — | — | Chute sur la main tendue 1,5 ; Traction ou effort brusque (soulever, retenir) 3 | provisoire | — |
| `localisation.laterale>rupture` | Où est la douleur : Face latérale du bras (deltoïde) | — | — | 2 / 0,6 | provisoire | — |
| `bras_leve>rupture` | Pire bras levé ou au-dessus de la tête | — | — | 1,5 / 0,8 | provisoire | — |
| `couche_epaule>rupture` | Pire couché sur l'épaule | — | — | 1,5 / 0,8 | provisoire | — |
| `faiblesse>rupture` | Faiblesse à lever le bras | — | — | 3 / 0,4 | provisoire | — |
| `raideur_prog>rupture` | Perte progressive de mouvement (difficulté à s'habiller, à attacher le soutien-gorge) | — | — | 1,3 / 0,9 | provisoire | — |
| `nocturne>rupture` | Douleur la nuit | — | — | 1,08 / 0,3 | verifie | Litaker et coll., 2000, J Am Geriatr Soc : Se > 97 %, Sp < 10 % |
| `atrophie>rupture` | Atrophie du supra- ou de l'infra-épineux | 56 % | 73 % | 2,05 / 0,61 | verifie | Litaker et coll., 2000, J Am Geriatr Soc ; Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe) : RV+ 2,0 |
| `ex_ecchymose>rupture` | Ecchymose | — | — | 1,5 / 0,95 | provisoire | — |
| `p_trochiter>rupture` | Trochiter (insertion de la coiffe) | — | — | 1,5 / 0,8 | provisoire | — |
| `crepitus>rupture` | Crépitus sous-acromial | 67 % | 80 % | 3,35 / 0,41 | verifie | Glover et coll., 2026 : rupture de coiffe (IRM, n = 63) |
| `arom_elev>rupture` | Élévation active (flexion) | — | — | Limitée avec douleur 1,4 | provisoire | — |
| `abd90_trauma>rupture` | Après un traumatisme : abduction au-delà de 90° impossible | 84 % | 71 % | 2,9 / 0,23 | verifie | Enger et coll., 2025, BMC Musculoskelet Disord (traumatisme aigu, IRM) : rupture transfixiante ou fracture occulte, RV+ 2,9 ; RV− 0,23 |
| `rrom_re>rupture` | Rotation externe résistée (positif : faible) | 76 % | 57 % | 1,78 / 0,42 | verifie | Litaker et coll., 2000, J Am Geriatr Soc : faiblesse, RV+ 1,78 ; RV− 0,42 |
| `jobe>rupture` | Abduction résistée (Jobe) | — | — | Forte et indolore 0,5 ; Faible 3 | provisoire | — |
| `drop_arm>rupture` | Drop-arm | — | — | 4 / 0,8 | provisoire | — |
| `er_lag>rupture` | External rotation lag sign | 47 % | 94 % | 7,83 / 0,56 | verifie | Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe) |
| `ir_lag>rupture` | Internal rotation lag sign (lift-off) | 97 % | 83 % | 5,71 / 0,04 | verifie | Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe) : sous-scapulaire |
| `belly_press>rupture` | Belly-press | 40 % | 98 % | 19,05 / 0,61 | verifie | Barth et coll., 2006, Arthroscopy (PMID 17027405) : sous-scapulaire |
| `bear_hug>rupture` | Bear-hug | 60 % | 92 % | 7,23 / 0,44 | verifie | Barth et coll., 2006, Arthroscopy (PMID 17027405) : sous-scapulaire |
| `grappe:park_rupture>rupture` | Combinaison : Park : arc douloureux + drop-arm + faiblesse en rotation externe | — | — | 15,6 / — | a_verifier | Park et coll., 2005, J Bone Joint Surg Am (PMID 15995110) : probabilité post-test 91 % ; RV+ ≈ 15,6 non vérifiable dans l'extrait |
| `grappe:litaker_pos>rupture` | Combinaison : Litaker : 65 ans et plus, douleur nocturne, faiblesse en rotation externe | — | — | 9,84 / — | verifie | Litaker et coll., 2000, J Am Geriatr Soc : score 4–5, Se 49 %, Sp 95 %, RV+ 9,84 |
| `grappe:litaker_neg>rupture` | Combinaison : Litaker : aucun des trois | — | — | — / 0,23 | verifie | Litaker et coll., 2000, J Am Geriatr Soc : score 0–1, RV 0,23 |

Conduite :
- Investigation : faiblesse en rotation externe ou en élévation ; radiographie et échographie (ou IRM). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : traumatique aiguë chez un patient actif : référence orthopédique rapide (réparation idéale en < 3–6 sem) ; dégénérative : physiothérapie 3 mois, analgésie, infiltration au besoin. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : perte de fonction brutale après une chute ou une luxation. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Dyskinésie scapulaire

Probabilité de départ (provisoire) : 12 ans 3 %, 20 ans 4 %, 35 ans 3 %, 55 ans 2 %.

Repères publiés : 61 % des sportifs d'armé ; 46–53 % des asymptomatiques (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `sport.aucun>dyskinesie` | Activités physiques : Peu ou pas de sport | — | — | 0,6 / 1 | provisoire | — |
| `sport.raquette>dyskinesie` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,5 / 1 | provisoire | — |
| `sport.lancer>dyskinesie` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 2,5 / 1 | provisoire | — |
| `sport.natation>dyskinesie` | Activités physiques : Natation | — | — | 1,5 / 1 | provisoire | — |
| `duree>dyskinesie` | Depuis combien de temps | — | — | Moins de 7 jours 0,4 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>dyskinesie` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Graduel 2 | provisoire | — |
| `localisation.posterieure>dyskinesie` | Où est la douleur : Postérieure ou scapulaire | — | — | 2 / 0,7 | provisoire | — |
| `dyskinesie_vue>dyskinesie` | Scapula décollée ou dyskinésie visible | — | — | 3 / 0,6 | a_verifier | Wright et coll., 2013, BJSM : glissement latéral et dyskinésie, RV ≈ 1 pour la pathologie de l'épaule en général |

Conduite :
- Investigation : clinique ; chercher la cause (coiffe, instabilité, atteinte nerveuse). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : physiothérapie (contrôle scapulaire) 6–12 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6–8 sem. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Fracture de l'humérus proximal

Probabilité de départ (provisoire) : 12 ans 1 %, 40 ans 1 %, 60 ans 2 %, 75 ans 5 %, 90 ans 7 % ; femme ×2, homme ×0,5.

Repères publiés : 60/100 000 ; 253/100 000 après 65 ans ; 31,4/100 000/an chez l'enfant (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>fracture_hp` | Épaule atteinte | — | — | Les deux 0,05 | provisoire | — |
| `sport.contact>fracture_hp` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,2 / 1 | provisoire | — |
| `osteoporose>fracture_hp` | Ostéoporose ou fracture de fragilité | — | — | 2,5 / 0,85 | provisoire | — |
| `duree>fracture_hp` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 6 semaines à 3 mois 0,4 ; Plus de 3 mois 0,1 | provisoire | — |
| `apparition>fracture_hp` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>fracture_hp` | Mécanisme | — | — | Chute ou coup sur le moignon de l'épaule 1,5 ; Chute sur la main tendue 3 | provisoire | — |
| `localisation.diffuse>fracture_hp` | Où est la douleur : Diffuse, profonde | — | — | 1,5 / 0,9 | provisoire | — |
| `deformation>fracture_hp` | Déformation visible ou épaule « carrée » | — | — | 3 / 0,9 | provisoire | — |
| `ex_ecchymose>fracture_hp` | Ecchymose | — | — | 3 / 0,7 | provisoire | — |
| `p_trochiter>fracture_hp` | Trochiter (insertion de la coiffe) | — | — | 2 / 0,8 | provisoire | — |
| `abd90_trauma>fracture_hp` | Après un traumatisme : abduction au-delà de 90° impossible | — | — | 2 / 0,6 | provisoire | — |

Conduite :
- Investigation : radiographies face, profil en Y et axillaire ; nerf axillaire et pouls ; TDM si complexe. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : écharpe environ 1 sem, puis pendulaires (sem 1–2), mobilisation passive (sem 3–4), active-assistée (vers 6 sem), renforcement (vers 3 mois) ; bilan d'ostéoporose. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : radiographie à 1–2 sem, puis à 6 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : orthopédie si luxation-fracture, 3–4 fragments déplacés, tubérosité déplacée > 5 mm ou atteinte neurovasculaire. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Fracture de la clavicule

Probabilité de départ (provisoire) : 12 ans 6 %, 18 ans 4 %, 30 ans 2 %, 50 ans 1 %, 70 ans 1 % ; homme ×1,5, femme ×0,7.

Repères publiés : 52/100 000/an ; 87 % des lésions de la ceinture scapulaire de l'enfant (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>clavicule` | Épaule atteinte | — | — | Les deux 0,05 | provisoire | — |
| `sport.velo>clavicule` | Activités physiques : Vélo | — | — | 1,5 / 1 | provisoire | — |
| `sport.contact>clavicule` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2,5 / 1 | provisoire | — |
| `sport.glisse>clavicule` | Activités physiques : Ski ou planche | — | — | 2 / 1 | provisoire | — |
| `duree>clavicule` | Depuis combien de temps | — | — | Moins de 7 jours 3 ; 6 semaines à 3 mois 0,3 ; Plus de 3 mois 0,05 | provisoire | — |
| `apparition>clavicule` | Mode d'apparition | — | — | Subit, avec un traumatisme 6 ; Subit, sans traumatisme 0,1 ; Graduel 0,05 ; Insidieux 0,05 | provisoire | — |
| `mecanisme>clavicule` | Mécanisme | — | — | Chute ou coup sur le moignon de l'épaule 4 ; Chute sur la main tendue 1,5 | provisoire | — |
| `localisation.sommet>clavicule` | Où est la douleur : Sommet de l'épaule (acromio-claviculaire) | — | — | 1,5 / 0,9 | provisoire | — |
| `deformation>clavicule` | Déformation visible ou épaule « carrée » | — | — | 4 / 0,8 | provisoire | — |
| `ex_ecchymose>clavicule` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `p_clavicule>clavicule` | Clavicule | — | — | 6 / 0,1 | provisoire | — |

Conduite :
- Investigation : radiographies ; peau et examen neurovasculaire. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : adulte : écharpe 2–6 sem, mobilisation du coude et de la main, sports de contact après consolidation. Enfant et adolescent : écharpe de confort, radiographie à 4–6 sem, pas de contact pendant 2–3 sem de plus. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 1–2 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : urgence si fracture ouverte, peau menacée, atteinte neurovasculaire, épaule flottante ou fracture médiale déplacée vers l'arrière ; orthopédie rapide si déplacement > 100 %, raccourcissement > 2 cm, comminution ou fracture distale instable (adulte). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Arthrose gléno-humérale

Probabilité de départ (provisoire) : 12 ans 0 %, 45 ans 1 %, 60 ans 3 %, 75 ans 6 %, 90 ans 8 %.

Repères publiés : 2–5 % des douleurs d'épaule ; 17,4–20,3 % radiographique après 65 ans (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>omarthrose` | Épaule atteinte | — | — | Les deux 1,3 | provisoire | — |
| `atcd_luxation>omarthrose` | Luxation antérieure de cette épaule | — | — | 1,5 / 0,97 | provisoire | — |
| `duree>omarthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,2 ; Plus de 3 mois 2,5 | provisoire | — |
| `apparition>omarthrose` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Insidieux 3 | provisoire | — |
| `localisation.diffuse>omarthrose` | Où est la douleur : Diffuse, profonde | — | — | 2 / 0,7 | provisoire | — |
| `type_douleur>omarthrose` | Type de douleur | — | — | Sourde, profonde 1,3 | provisoire | — |
| `raideur_prog>omarthrose` | Perte progressive de mouvement (difficulté à s'habiller, à attacher le soutien-gorge) | — | — | 3 / 0,6 | provisoire | — |
| `moment>omarthrose` | Horaire | — | — | Pire le matin, mieux en bougeant 1,2 | provisoire | — |
| `crepitus>omarthrose` | Crépitus sous-acromial | — | — | 2 / 0,8 | provisoire | — |
| `arom_elev>omarthrose` | Élévation active (flexion) | — | — | Complète et indolore 0,4 ; Limitée avec douleur 2 ; Limitée par raideur 3 | provisoire | — |
| `arom_re>omarthrose` | Rotation externe active | — | — | Limitée avec douleur 2 ; Limitée par raideur 3 | provisoire | — |
| `prom_re>omarthrose` | Rotation externe passive | — | — | Complète et indolore 0,3 ; Limitée avec douleur 3 ; Limitée par raideur 4 | provisoire | — |
| `prom_flex>omarthrose` | Flexion passive (positif : limitée avec douleur, limitée par raideur) | 50 % | 93 % | 6,85 / 0,54 | verifie | Glover et coll., 2026, J Telemed Telecare : flexion passive < 120°, RV+ 6,87 |

Conduite :
- Investigation : radiographies face et axillaire. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : éducation, exercices, analgésie de base, infiltration intra-articulaire (soulagement 2–6 sem). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 3 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : douleur et limitation persistantes → orthopédie (arthroplastie). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Tendinopathie calcifiante

Probabilité de départ (provisoire) : 12 ans 0 %, 30 ans 4 %, 45 ans 6 %, 60 ans 4 %, 80 ans 2 % ; femme ×1,3, homme ×0,8.

Repères publiés : Calcifications dans 42,5 % des douleurs sous-acromiales ; 12 % en échographie (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `travail>calcifiante` | Occupation | — | — | Gestes répétitifs des mains ou bras au-dessus des épaules 1,2 | provisoire | — |
| `duree>calcifiante` | Depuis combien de temps | — | — | Moins de 7 jours 2 ; 1 à 6 semaines 1,3 | provisoire | — |
| `apparition>calcifiante` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 5 | provisoire | — |
| `localisation.laterale>calcifiante` | Où est la douleur : Face latérale du bras (deltoïde) | — | — | 2 / 0,7 | provisoire | — |
| `type_douleur>calcifiante` | Type de douleur | — | — | Aiguë, en coup de poignard 1,5 | provisoire | — |
| `bras_leve>calcifiante` | Pire bras levé ou au-dessus de la tête | — | — | 1,5 / 0,8 | provisoire | — |
| `couche_epaule>calcifiante` | Pire couché sur l'épaule | — | — | 1,5 / 0,8 | provisoire | — |
| `moment>calcifiante` | Horaire | — | — | Constante 1,5 | provisoire | — |
| `nocturne>calcifiante` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `p_trochiter>calcifiante` | Trochiter (insertion de la coiffe) | — | — | 1,8 / 0,8 | provisoire | — |
| `jobe>calcifiante` | Abduction résistée (Jobe) | — | — | Douloureuse 1,5 | provisoire | — |
| `arc>calcifiante` | Arc douloureux | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Investigation : radiographie (calcification). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : analgésie de base, infiltration sous-acromiale en poussée, physiothérapie ; échec > 4 mois : ponction-lavage échoguidée ou ondes de choc. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : douleur aiguë intense avec fièvre (exclure une infection). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Luxation ou instabilité antérieure

Probabilité de départ (provisoire) : 12 ans 3 %, 17 ans 6 %, 25 ans 5 %, 40 ans 2 %, 60 ans 1 % ; homme ×2, femme ×0,5.

Repères publiés : 23,9/100 000 ; 60,3/100 000 avant 18 ans ; 20,3 % des lésions d'épaule du sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>instab_ant` | Épaule atteinte | — | — | Les deux 0,3 | provisoire | — |
| `sport.aucun>instab_ant` | Activités physiques : Peu ou pas de sport | — | — | 0,6 / 1 | provisoire | — |
| `sport.contact>instab_ant` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2,5 / 1 | provisoire | — |
| `sport.lancer>instab_ant` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 1,3 / 1 | provisoire | — |
| `sport.glisse>instab_ant` | Activités physiques : Ski ou planche | — | — | 1,5 / 1 | provisoire | — |
| `sport.muscu>instab_ant` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,3 / 1 | provisoire | — |
| `atcd_luxation>instab_ant` | Luxation antérieure de cette épaule | — | — | 8 / 0,4 | provisoire | — |
| `premier>instab_ant` | Premier épisode | — | — | 0,6 / 2 | provisoire | — |
| `duree>instab_ant` | Depuis combien de temps | — | — | Moins de 7 jours 2,5 | provisoire | — |
| `apparition>instab_ant` | Mode d'apparition | — | — | Subit, avec un traumatisme 5 ; Graduel 0,3 ; Insidieux 0,2 | provisoire | — |
| `mecanisme>instab_ant` | Mécanisme | — | — | Chute ou coup sur le moignon de l'épaule 0,5 ; Chute sur la main tendue 2 ; Bras forcé en abduction et rotation externe 8 | provisoire | — |
| `deboitement>instab_ant` | Sensation que l'épaule sort de place | — | — | 6 / 0,3 | provisoire | — |
| `localisation.anterieure>instab_ant` | Où est la douleur : Antérieure (coulisse du biceps) | — | — | 1,3 / 0,9 | provisoire | — |
| `bras_leve>instab_ant` | Pire bras levé ou au-dessus de la tête | — | — | 1,3 / 0,9 | provisoire | — |
| `clic_epaule>instab_ant` | Craquement, clic ou accrochage | — | — | 1,5 / 0,9 | provisoire | — |
| `deformation>instab_ant` | Déformation visible ou épaule « carrée » | — | — | 6 / 0,9 | provisoire | — |
| `apprehension>instab_ant` | Appréhension | 72 % | 96 % | 18 / 0,29 | verifie | Farber et coll., 2006, J Bone Joint Surg Am (PMID 16818971) |
| `relocation>instab_ant` | Relocation | 81 % | 92 % | 10,13 / 0,21 | verifie | Farber et coll., 2006, J Bone Joint Surg Am (PMID 16818971) |
| `surprise>instab_ant` | Surprise (release) | 64 % | 99 % | 58,09 / 0,37 | verifie | Lo et coll., 2004, Am J Sports Med |

Conduite :
- Investigation : radiographies avant et après réduction ; nerf axillaire, pouls. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : réduction, écharpe environ 1 sem, puis physiothérapie ; après 40 ans : rechercher une rupture de coiffe si faiblesse à 3 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 1 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : orthopédie si < 25–30 ans ou sport de contact (récidive 47–87 %), perte osseuse ou récidive. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Arthrose acromio-claviculaire ou ostéolyse distale de la clavicule

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 1 %, 45 ans 4 %, 65 ans 4 %, 80 ans 3 %.

Repères publiés : 4 % des patients adressés ; ostéolyse : 6,5 % des IRM à 13–19 ans, liée au développé-couché (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `travail>ac_arthrose` | Occupation | — | — | Travail physique (charges, manutention) 1,3 ; Gestes répétitifs des mains ou bras au-dessus des épaules 1,3 | provisoire | — |
| `sport.muscu>ac_arthrose` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 2 / 1 | provisoire | — |
| `duree>ac_arthrose` | Depuis combien de temps | — | — | Moins de 7 jours 0,3 ; Plus de 3 mois 2 | provisoire | — |
| `apparition>ac_arthrose` | Mode d'apparition | — | — | Graduel 1,5 ; Insidieux 1,5 | provisoire | — |
| `localisation.sommet>ac_arthrose` | Où est la douleur : Sommet de l'épaule (acromio-claviculaire) | — | — | 5 / 0,3 | provisoire | — |
| `localisation.sous_coude>ac_arthrose` | Où est la douleur : Irradie sous le coude | — | — | 0,3 / 1,05 | a_verifier | Cadogan et coll., 2013, BMC Musculoskelet Disord (PMID 23634871) : pas de douleur sous le coude, élément du cluster |
| `bras_leve>ac_arthrose` | Pire bras levé ou au-dessus de la tête | — | — | 1,5 / 0,8 | provisoire | — |
| `couche_epaule>ac_arthrose` | Pire couché sur l'épaule | — | — | 1,3 / 0,9 | provisoire | — |
| `moment>ac_arthrose` | Horaire | — | — | Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `clic_epaule>ac_arthrose` | Craquement, clic ou accrochage | — | — | 1,2 / 0,95 | provisoire | — |
| `p_ac>ac_arthrose` | Acromio-claviculaire | — | — | 1,6 / 0,1 | a_verifier | Walton et coll., 2004, JBJS (PMID 15069148) : Se 96 %, Sp faible |
| `obrien_ac>ac_arthrose` | O'Brien : douleur au sommet (acromio-claviculaire) | 41 % | 95 % | 8,2 / 0,62 | verifie | Mall et coll., 2013, Am J Sports Med |
| `add_horiz>ac_arthrose` | Adduction horizontale (cross-body) | 77 % | 79 % | 3,67 / 0,29 | verifie | Mall et coll., 2013, Am J Sports Med |
| `ext_ac>ac_arthrose` | Extension résistée acromio-claviculaire | 72 % | 85 % | 4,8 / 0,33 | verifie | Mall et coll., 2013, Am J Sports Med |
| `grappe:ac3>ac_arthrose` | Combinaison : Trois tests acromio-claviculaires positifs | — | — | 8,3 / — | verifie | Mall et coll., 2013, Am J Sports Med : Se 25 %, Sp 97 % (RV calculé) |

Conduite :
- Investigation : radiographie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : modification des activités, analgésie de base, diclofénac topique, infiltration. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 3 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : échec après environ 6 mois → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Investigation : radiographie acromio-claviculaire. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : modifier la musculation (développé-couché, dips), AINS, infiltration. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : échec après 4–6 mois → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Pseudopolyarthrite rhizomélique

Probabilité de départ (provisoire) : 12 ans 0 %, 50 ans 0 %, 65 ans 1 %, 80 ans 2 % ; femme ×1,5, homme ×0,7.

Repères publiés : Risque sur la vie 2,4 % (femmes), 1,7 % (hommes) (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>ppr` | Épaule atteinte | — | — | Les deux 6 | provisoire | — |
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
| `apparition>ppr` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,2 ; Subit, sans traumatisme 1,5 ; Insidieux 2 | provisoire | — |
| `localisation.trapeze>ppr` | Où est la douleur : Trapèze, base du cou | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.diffuse>ppr` | Où est la douleur : Diffuse, profonde | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.deux_epaules>ppr` | Où est la douleur : Aux deux épaules et aux hanches, avec raideur | — | — | 10 / 0,3 | provisoire | — |
| `moment>ppr` | Horaire | — | — | Pire le matin, mieux en bougeant 3 | provisoire | — |
| `raideur>ppr` | Raideur matinale | — | — | 30 minutes ou plus 5 | provisoire | — |
| `raideur_ceintures>ppr` | Raideur matinale des épaules et des hanches | — | — | 10 / 0,2 | provisoire | — |
| `symptomes_acg>ppr` | Céphalée nouvelle, claudication de la mâchoire ou trouble visuel | — | — | 3 / 0,9 | provisoire | — |
| `autres_articulations>ppr` | Douleur ou enflure d'autres articulations | — | — | 2 / 0,8 | provisoire | — |

Conduite :
- Investigation : VS et CRP (requises), FSC, FR et anti-CCP ; rechercher une artérite à cellules géantes. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : prednisone 15 mg DIE (12,5–25 mg), réduire à 10 mg en 4–8 sem, puis de 1 mg toutes les 4 sem ; protection osseuse. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 2–4 sem, puis toutes les 4–8 sem ; référence en rhumatologie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : céphalée, claudication de la mâchoire, trouble visuel → spécialiste en < 24 h. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Tendinopathie ou rupture du long biceps

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 2 %, 50 ans 3 %, 70 ans 2 %.

Repères publiés : Données hospitalières seules, sous-estimées (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `sport.muscu>biceps` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,5 / 1 | provisoire | — |
| `sport.escalade>biceps` | Activités physiques : Escalade | — | — | 1,3 / 1 | provisoire | — |
| `apparition>biceps` | Mode d'apparition | — | — | Subit, avec un traumatisme 1,5 ; Subit, sans traumatisme 2 ; Graduel 1,3 | provisoire | — |
| `mecanisme>biceps` | Mécanisme | — | — | Traction ou effort brusque (soulever, retenir) 3 | provisoire | — |
| `localisation.anterieure>biceps` | Où est la douleur : Antérieure (coulisse du biceps) | — | — | 3 / 0,5 | provisoire | — |
| `popeye>biceps` | Boule au milieu du bras (déformation de Popeye) | — | — | 15 / 0,9 | provisoire | — |
| `ex_ecchymose>biceps` | Ecchymose | — | — | 2 / 0,95 | provisoire | — |
| `p_coulisse>biceps` | Coulisse bicipitale | 53 % | 54 % | 1,15 / 0,87 | verifie | Gill et coll., 2007, Am J Sports Med : RV+ 1,15 |
| `rrom_flex_coude>biceps` | Flexion résistée du coude | — | — | 2 / 0,8 | provisoire | — |
| `speed>biceps` | Speed | 32 % | 75 % | 1,28 / 0,91 | verifie | Holtby et Razmjou, 2004, Arthroscopy (PMID 15007311) |
| `yergason>biceps` | Yergason | 43 % | 79 % | 2,05 / 0,72 | verifie | Holtby et Razmjou, 2004, Arthroscopy (PMID 15007311) |

Conduite :
- Investigation : clinique ± échographie ; rupture (signe de Popeye) : rechercher une rupture de coiffe associée. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : tendinopathie : physiothérapie, analgésie de base, infiltration de la gaine au besoin ; rupture : pas de réparation en général. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 4–6 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : patient jeune ou travailleur manuel souhaitant une réparation → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Douleur projetée d'origine cervicale

Probabilité de départ (provisoire) : 12 ans 1 %, 30 ans 4 %, 50 ans 6 %, 70 ans 5 %.

Repères publiés : Rang attribué par jugement clinique (A).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>cervical` | Épaule atteinte | — | — | Les deux 1,5 | provisoire | — |
| `duree>cervical` | Depuis combien de temps | — | — | Plus de 3 mois 1,5 | provisoire | — |
| `apparition>cervical` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,4 ; Insidieux 2 | provisoire | — |
| `localisation.laterale>cervical` | Où est la douleur : Face latérale du bras (deltoïde) | — | — | 0,7 / 1,1 | provisoire | — |
| `localisation.posterieure>cervical` | Où est la douleur : Postérieure ou scapulaire | — | — | 2 / 0,7 | provisoire | — |
| `localisation.trapeze>cervical` | Où est la douleur : Trapèze, base du cou | — | — | 3 / 0,5 | provisoire | — |
| `localisation.sous_coude>cervical` | Où est la douleur : Irradie sous le coude | — | — | 6 / 0,4 | provisoire | — |
| `type_douleur>cervical` | Type de douleur | — | — | Brûlure 3 ; Choc électrique 3 | provisoire | — |
| `bras_leve>cervical` | Pire bras levé ou au-dessus de la tête | — | — | 0,6 / 1,1 | provisoire | — |
| `faiblesse>cervical` | Faiblesse à lever le bras | — | — | 1,5 / 0,9 | provisoire | — |
| `cou_aggrave>cervical` | Douleur reproduite par les mouvements du cou | — | — | 6 / 0,3 | provisoire | — |
| `paresthesies>cervical` | Engourdissements ou picotements dans le bras ou la main | — | — | 5 / 0,4 | provisoire | — |
| `atrophie>cervical` | Atrophie du supra- ou de l'infra-épineux | — | — | 1,5 / 0,95 | provisoire | — |
| `p_trapeze>cervical` | Trapèze et angulaire | — | — | 1,5 / 0,8 | provisoire | — |
| `rrom_re>cervical` | Rotation externe résistée | — | — | Faible 1,5 | provisoire | — |
| `jobe>cervical` | Abduction résistée (Jobe) | — | — | Faible 1,5 | provisoire | — |
| `cou_mob>cervical` | Cervical : mobilité | — | — | Douleur reproduite à l'épaule 4 | provisoire | — |
| `spurling>cervical` | Spurling | — | — | 4 / 0,6 | provisoire | — |
| `deficit_c5c6>cervical` | Déficit de force, de sensibilité ou de réflexe C5–C6 | — | — | 5 / 0,8 | provisoire | — |

Conduite :
- Investigation : examen cervical et neurologique (Spurling) ; mouvements de l'épaule indolores. (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement et suivi : voir le document cervical (fiches 1 et 8). (principes généraux, sans recommandation spécifique) — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Lésion SLAP (labrum supérieur)

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 2 %, 30 ans 2 %, 45 ans 1 % ; homme ×1,3, femme ×0,8.

Repères publiés : 6–26 % des arthroscopies d'épaule ; 2,5 % chez le sportif (A, C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>slap` | Épaule atteinte | — | — | Les deux 0,3 | provisoire | — |
| `sport.aucun>slap` | Activités physiques : Peu ou pas de sport | — | — | 0,5 / 1 | provisoire | — |
| `sport.raquette>slap` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,5 / 1 | provisoire | — |
| `sport.lancer>slap` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 3 / 1 | provisoire | — |
| `sport.escalade>slap` | Activités physiques : Escalade | — | — | 1,5 / 1 | provisoire | — |
| `atcd_luxation>slap` | Luxation antérieure de cette épaule | — | — | 1,5 / 0,95 | provisoire | — |
| `apparition>slap` | Mode d'apparition | — | — | Subit, avec un traumatisme 2 ; Graduel 1,3 | provisoire | — |
| `mecanisme>slap` | Mécanisme | — | — | Bras forcé en abduction et rotation externe 2 ; Traction ou effort brusque (soulever, retenir) 2 | provisoire | — |
| `deboitement>slap` | Sensation que l'épaule sort de place | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.anterieure>slap` | Où est la douleur : Antérieure (coulisse du biceps) | — | — | 1,5 / 0,8 | provisoire | — |
| `bras_leve>slap` | Pire bras levé ou au-dessus de la tête | — | — | 1,5 / 0,9 | provisoire | — |
| `clic_epaule>slap` | Craquement, clic ou accrochage | 55 % | 73 % | 2,04 / 0,62 | verifie | Dean et coll., 2023, Am J Sports Med (O'Brien, 2 621 patients) : lésion labrale, RV+ 2,0 |
| `obrien>slap` | O'Brien : douleur profonde (labrum) | 63 % | 54 % | 1,37 / 0,69 | verifie | Dean et coll., 2023, Am J Sports Med (O'Brien, 2 621 patients) |
| `biceps_load>slap` | Biceps load II | — | — | 1,7 / 0,39 | verifie | Cook et coll., 2012, J Shoulder Elbow Surg (PMID 22036538) |

Conduite :
- Investigation : clinique ; arthro-IRM si échec. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : physiothérapie 3–6 mois. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : échec → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Instabilité postérieure ou multidirectionnelle

Probabilité de départ (provisoire) : 12 ans 1 %, 18 ans 2 %, 30 ans 1 %, 50 ans 0 % ; femme ×1,3, homme ×0,8.

Repères publiés : Postérieure 4,0 %, multidirectionnelle 1,8 % chez le sportif (C).

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>instab_post` | Épaule atteinte | — | — | Les deux 1,5 | provisoire | — |
| `sport.lancer>instab_post` | Activités physiques : Sports de lancer (baseball, softball, water-polo) | — | — | 1,5 / 1 | provisoire | — |
| `sport.natation>instab_post` | Activités physiques : Natation | — | — | 2 / 1 | provisoire | — |
| `duree>instab_post` | Depuis combien de temps | — | — | Plus de 3 mois 1,5 | provisoire | — |
| `apparition>instab_post` | Mode d'apparition | — | — | Subit, avec un traumatisme 0,8 ; Graduel 1,8 | provisoire | — |
| `deboitement>instab_post` | Sensation que l'épaule sort de place | — | — | 3 / 0,7 | provisoire | — |
| `localisation.posterieure>instab_post` | Où est la douleur : Postérieure ou scapulaire | — | — | 2,5 / 0,7 | provisoire | — |
| `sulcus>instab_post` | Sulcus | 31 % | 89 % | 2,82 / 0,78 | verifie | Jia et coll., 2008 ; Luime et coll., 2004, JAMA : RV+ 2,8 |

Conduite :
- Investigation : clinique (sulcus, hyperlaxité) ; radiographies. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Traitement : physiothérapie 3–6 mois (contrôle scapulaire, coiffe). — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Suivi : 6–8 sem. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*
- Retour / référence : échec → orthopédie. — *Aide-mémoire de première ligne (Québec), document OpenEvidence ; Haas et al., « Management of Shoulder Pain in Primary Care », JAMA Internal Medicine, 2026 ; Simon et al., « Acute Shoulder Injuries in Adults », American Family Physician, 2023 ; lignes directrices AAOS sur les fractures de la clavicule, 2022 ; Van Gastel et al., Acta Orthopaedica, 2026 ; Lowry et al., BMC Primary Care, 2023 (Québec).*

## Mesures générales

Bloc commun (aide-mémoire, Québec) :
- Analgésie de base (adulte) : acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité) ; ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j) ; diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID) pour l'articulation acromio-claviculaire.
- Analgésie de base (enfant) : acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) ; ibuprofène 10 mg/kg q6–8h dès 6 mois (max 400 mg/dose et 40 mg/kg/j).
- AINS — précautions : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation ; prudence ≥ 65 ans (IPP si risque digestif).
- Dosage de la charge : activité permise si douleur ≤ 3/10 et sans persistance après l'effort.
- Infiltration de corticoïde : soulagement de courte durée ; aviser les diabétiques d'une hausse transitoire de la glycémie.

Pour tous :
- Enseignement : nature de l'atteinte, pronostic, autogestion ; garder l'épaule active dans la zone indolore
- Consignes de reconsultation : fièvre, épaule chaude et enflée, faiblesse soudaine, engourdissement du bras, douleur thoracique ou dyspnée
