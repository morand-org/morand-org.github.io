# Douleur au genou : poids et sources

Produit par `node outils/locomoteur/lister-sources.mjs genou` (Prototype 0.4 · novembre 2026). Ne pas modifier à la main.

Poids : 354 (validés 0, vérifiés 6, à vérifier 10, provisoires 338).

## Syndrome fémoro-patellaire

Probabilité de départ (provisoire) : 12 ans 25 %, 16 ans 32 %, 28 ans 20 %, 50 ans 6 %, 70 ans 2 % ; femme ×1,5, homme ×0,7.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>sfp` | Genou atteint (positif : ) | — | — | Les deux 1,8 | provisoire | — |
| `sport.aucun>sfp` | Activités physiques : Peu ou pas de sport | — | — | 0,8 / 1 | provisoire | — |
| `sport.course>sfp` | Activités physiques : Course à pied | — | — | 1,5 / 1 | provisoire | — |
| `sport.velo>sfp` | Activités physiques : Vélo | — | — | 1,3 / 1 | provisoire | — |
| `sport.danse>sfp` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,4 / 1 | provisoire | — |
| `sport.muscu>sfp` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,2 / 1 | provisoire | — |
| `sport.natation>sfp` | Activités physiques : Natation | — | — | 1,1 / 1 | provisoire | — |
| `premier>sfp` | Premier épisode | — | — | 0,8 / 1,3 | provisoire | — |
| `duree>sfp` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 0,5 ; 1 à 6 semaines 0,9 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 1,4 | provisoire | — |
| `apparition>sfp` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 0,5 ; Graduel 1,8 ; Insidieux 1,8 | provisoire | — |
| `localisation.anterieure>sfp` | Où est la douleur : Antérieure, autour de la rotule | — | — | 3 / 0,3 | provisoire | — |
| `localisation.pole_inf>sfp` | Où est la douleur : Sous la rotule (tendon rotulien) | — | — | 1,2 / 1 | provisoire | — |
| `localisation.diffuse>sfp` | Où est la douleur : Diffuse, mal localisée | — | — | 1,3 / 1 | provisoire | — |
| `type_douleur>sfp` | Type de douleur (positif : ) | — | — | Pression, comme un bleu 1,1 | provisoire | — |
| `escaliers>sfp` | Pire dans les escaliers | — | — | 1,8 / 0,4 | provisoire | — |
| `assis>sfp` | Pire en position assise prolongée | — | — | 2,5 / 0,6 | provisoire | — |
| `accroupi>sfp` | Pire accroupi ou à genoux | — | — | 1,8 / 0,5 | provisoire | — |
| `course_saut>sfp` | Pire à la course ou au saut | — | — | 1,5 / 0,7 | provisoire | — |
| `moment>sfp` | Horaire (positif : ) | — | — | Pire le matin, mieux en bougeant 0,7 ; Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>sfp` | Douleur la nuit | — | — | 0,6 / 1,1 | provisoire | — |
| `derobade>sfp` | Dérobements (le genou lâche) | — | — | 1,2 / 0,95 | provisoire | — |
| `accrochage>sfp` | Accrochages | — | — | 1,2 / 0,95 | provisoire | — |
| `enflure>sfp` | Enflure du genou (actuelle ou récurrente) | — | — | 0,4 / 1,2 | provisoire | — |
| `posture>sfp` | Posture (positif : ) | — | — | Genu valgum 1,3 | provisoire | — |
| `arches>sfp` | Arches plantaires (positif : ) | — | — | Affaissées 1,3 | provisoire | — |
| `trendelenburg>sfp` | Trendelenburg (positif : ) | — | — | Positif 1,2 | provisoire | — |
| `squat_bi>sfp` | Squat bipodal (positif : douleur antérieure) | 91 % | 50 % | 1,82 / 0,18 | a_verifier | Nunes et coll., 2013, revue systématique (Phys Ther Sport) : douleur à l'accroupissement |
| `squat_uni>sfp` | Squat unipodal (positif : ) | — | — | Valgus dynamique 1,5 ; Douloureux 1,3 | provisoire | — |
| `ex_atrophie>sfp` | Atrophie du quadriceps | — | — | 1,2 / 0,95 | provisoire | — |
| `flot>sfp` | Flot (signe du flot) (positif : ) | — | — | Négatif 1,2 ; Légèrement positif 0,6 ; Positif 0,4 | provisoire | — |
| `glacon>sfp` | Test du glaçon (positif : ) | — | — | Positif 0,3 | provisoire | — |
| `p_rotule>sfp` | Rotule | — | — | 1,3 / 0,9 | provisoire | — |
| `p_facettes>sfp` | Facettes rotuliennes | — | — | 2 / 0,5 | provisoire | — |
| `arom_flexion>sfp` | Flexion active (positif : ) | — | — | Complète, fin douloureuse 1,2 | provisoire | — |
| `rrom_extension>sfp` | Extension résistée | — | — | 1,2 / 0,95 | provisoire | — |
| `mobilite_rotule>sfp` | Mobilité rotulienne (positif : ) | — | — | Diminuée 1,2 | provisoire | — |
| `clarke>sfp` | Clarke (rabot) | 39 % | 67 % | 1,18 / 0,91 | a_verifier | Nunes et coll., 2013 ou Cook et coll., 2012 (revues systématiques) |
| `mcconnell>sfp` | McConnell | — | — | 2 / 0,7 | provisoire | — |
| `crepitants>sfp` | Crépitants | — | — | 1,2 / 0,95 | provisoire | — |

Conduite :
- Pas d'imagerie d'emblée ; radiographie si présentation atypique ou sans amélioration après 3 mois de traitement — *Consensus international sur la douleur fémoro-patellaire (Crossley et coll., 2016)*
- Ajuster les charges : escaliers, accroupissements, sauts, course
- Consultation en physiothérapie : renforcement combiné de la hanche et du genou — *Crossley et coll., 2016 ; Collins et coll., 2018 (consensus sur l'exercice)*
- Taping rotulien à court terme ; orthèses plantaires préfabriquées si arches affaissées — *Collins et coll., 2018*
- Suivi dans 6 à 8 semaines

## Arthrose du genou

Probabilité de départ (provisoire) : 12 ans 0 %, 16 ans 1 %, 28 ans 4 %, 45 ans 20 %, 55 ans 35 %, 70 ans 55 %, 85 ans 65 % ; femme ×1,25, homme ×0,8.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>arthrose` | Genou atteint (positif : ) | — | — | Les deux 1,5 | provisoire | — |
| `travail>arthrose` | Occupation (positif : ) | — | — | Travail physique 1,2 ; Travail à genoux (plancher, toiture, plomberie…) 1,2 | provisoire | — |
| `sport.marche>arthrose` | Activités physiques : Marche ou randonnée | — | — | 1,1 / 1 | provisoire | — |
| `atcd_genou>arthrose` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,8 / 0,85 | provisoire | — |
| `obesite>arthrose` | Obésité (IMC 30 ou plus) | — | — | 1,6 / 0,85 | provisoire | — |
| `premier>arthrose` | Premier épisode | — | — | 0,7 / 1,5 | provisoire | — |
| `duree>arthrose` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 0,4 ; 1 à 6 semaines 0,7 ; 6 semaines à 3 mois 1,1 ; Plus de 3 mois 1,8 | provisoire | — |
| `apparition>arthrose` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,8 ; Insidieux 2 | provisoire | — |
| `localisation.interligne_med>arthrose` | Où est la douleur : Interligne médial | — | — | 1,8 / 0,7 | provisoire | — |
| `localisation.interligne_lat>arthrose` | Où est la douleur : Interligne latéral | — | — | 1,2 / 0,95 | provisoire | — |
| `localisation.diffuse>arthrose` | Où est la douleur : Diffuse, mal localisée | — | — | 1,3 / 1 | provisoire | — |
| `type_douleur>arthrose` | Type de douleur (positif : ) | — | — | Pression, comme un bleu 1,1 ; Sourde, profonde 1,2 | provisoire | — |
| `escaliers>arthrose` | Pire dans les escaliers | — | — | 1,5 / 0,6 | provisoire | — |
| `marche>arthrose` | Pire à la marche | — | — | 1,6 / 0,6 | provisoire | — |
| `assis>arthrose` | Pire en position assise prolongée | — | — | 1,2 / 0,95 | provisoire | — |
| `moment>arthrose` | Horaire (positif : ) | — | — | Pire le matin, mieux en bougeant 0,9 ; Pire en fin de journée ou après l'activité 1,4 | provisoire | — |
| `nocturne>arthrose` | Douleur la nuit | — | — | 1,3 / 0,9 | provisoire | — |
| `raideur>arthrose` | Raideur matinale (positif : ) | — | — | Aucune 0,8 ; Moins de 30 minutes 1,8 ; 30 minutes ou plus 0,6 | provisoire | — |
| `blocage>arthrose` | Blocages vrais (impossible d'étendre le genou) | — | — | 1,2 / 1 | provisoire | — |
| `accrochage>arthrose` | Accrochages | — | — | 1,2 / 0,95 | provisoire | — |
| `enflure>arthrose` | Enflure du genou (actuelle ou récurrente) | — | — | 1,3 / 0,9 | provisoire | — |
| `rougeur_chaleur>arthrose` | Rougeur ou chaleur | — | — | 0,6 / 1 | provisoire | — |
| `posture>arthrose` | Posture (positif : ) | — | — | Genu valgum 1,1 ; Genu varum 1,8 ; Flexum 1,8 | provisoire | — |
| `demarche>arthrose` | Démarche (positif : ) | — | — | Boiterie antalgique 1,2 | provisoire | — |
| `squat_bi>arthrose` | Squat bipodal (positif : ) | — | — | Douleur médiale 1,3 ; Limité 1,5 | provisoire | — |
| `ex_chaleur>arthrose` | Rougeur ou chaleur | — | — | 0,5 / 1,1 | provisoire | — |
| `ex_atrophie>arthrose` | Atrophie du quadriceps | — | — | 1,5 / 0,9 | provisoire | — |
| `ex_tumefaction.osseux>arthrose` | Tuméfaction localisée : Élargissement osseux (ostéophytes) | — | — | 4 / 0,7 | provisoire | — |
| `flot>arthrose` | Flot (signe du flot) (positif : ) | — | — | Négatif 0,8 ; Légèrement positif 1,5 ; Positif 1,4 | provisoire | — |
| `glacon>arthrose` | Test du glaçon (positif : ) | — | — | Positif 1,3 | provisoire | — |
| `p_interlignes>arthrose` | Interlignes (positif : ) | — | — | Indolores 0,8 ; Médial douloureux 1,5 ; Médial et latéral douloureux 1,5 | provisoire | — |
| `p_rebords>arthrose` | Rebords osseux articulaires | — | — | 1,8 / 0,8 | provisoire | — |
| `arom_flexion>arthrose` | Flexion active (positif : ) | — | — | Complète et indolore 0,6 ; Limitée avec douleur 1,3 ; Limitée par raideur 2,5 | provisoire | — |
| `arom_extension>arthrose` | Extension active (positif : ) | — | — | Complète et indolore 0,8 ; Déficit par raideur 2,5 | provisoire | — |
| `prom_flexion>arthrose` | Flexion passive (positif : ) | — | — | Complète et indolore 0,7 ; Limitée par raideur 2 | provisoire | — |
| `prom_extension>arthrose` | Extension passive (positif : ) | — | — | Complète et indolore 0,8 ; Déficit par raideur 2 | provisoire | — |
| `mobilite_rotule>arthrose` | Mobilité rotulienne (positif : ) | — | — | Diminuée 1,5 | provisoire | — |
| `crepitants>arthrose` | Crépitants | — | — | 2 / 0,6 | provisoire | — |

Conduite :
- Diagnostic clinique, sans imagerie (45 ans et plus, douleur à l'activité, raideur matinale de 30 min ou moins) — *NICE NG226, 2022*
- Radiographie en charge seulement si atypique ou si une référence est envisagée ; pas d'IRM — *Choisir avec soin Canada*
- Exercice : renforcement et activité aérobie ; programme d'éducation et d'exercice (GLA:D Canada) — *OARSI 2019 ; ACR 2019*
- Perte de poids de 5 à 10 % si surpoids — *ACR 2019 ; NICE 2022*
- AINS topiques en premier ; AINS oraux prn de courte durée selon le profil — *OARSI 2019*
- Infiltration de corticostéroïdes possible lors d'une poussée — *ACR 2019*
- Orthopédie si arthrose invalidante malgré le traitement : CRDS AH-753, priorité D, avec rapport de radiographie — *Formulaire AH-753 (CRDS)*

## Déchirure méniscale

Probabilité de départ (provisoire) : 12 ans 4 %, 16 ans 7 %, 28 ans 12 %, 50 ans 15 %, 70 ans 12 % ; homme ×1,2, femme ×0,85.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>menisque` | Genou atteint (positif : ) | — | — | Les deux 0,5 | provisoire | — |
| `travail>menisque` | Occupation (positif : ) | — | — | Travail physique 1,2 ; Travail à genoux (plancher, toiture, plomberie…) 1,3 | provisoire | — |
| `sport.pivot>menisque` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,4 / 1 | provisoire | — |
| `sport.raquette>menisque` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>menisque` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,3 / 1 | provisoire | — |
| `atcd_genou>menisque` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,4 / 0,95 | provisoire | — |
| `premier>menisque` | Premier épisode | — | — | 1,2 / 0,9 | provisoire | — |
| `duree>menisque` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 1,3 ; 1 à 6 semaines 1,2 | provisoire | — |
| `apparition>menisque` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 2 ; Subit, sans traumatisme 1,3 ; Graduel 0,8 ; Insidieux 0,8 | provisoire | — |
| `mecanisme>menisque` | Mécanisme (positif : ) | — | — | Pivot ou torsion, pied au sol 2 ; Décélération ou réception de saut 1,2 ; Coup ou stress en valgus (de l'extérieur) 1,2 ; En s'accroupissant ou en se relevant 3 | provisoire | — |
| `pop>menisque` | Pop au moment de la blessure | — | — | 1,2 / 0,9 | provisoire | — |
| `enflure_rapide>menisque` | Œdème en moins de 2 heures | — | — | 0,8 / 1 | provisoire | — |
| `enflure_tardive>menisque` | Œdème après quelques heures (6 à 24 h) | — | — | 2 / 0,8 | provisoire | — |
| `localisation.interligne_med>menisque` | Où est la douleur : Interligne médial | — | — | 2,5 / 0,5 | provisoire | — |
| `localisation.interligne_lat>menisque` | Où est la douleur : Interligne latéral | — | — | 1,8 / 0,8 | provisoire | — |
| `localisation.posterieure>menisque` | Où est la douleur : Postérieure (creux poplité) | — | — | 1,3 / 0,95 | provisoire | — |
| `type_douleur>menisque` | Type de douleur (positif : ) | — | — | Aiguë, en coup de poignard 1,3 | provisoire | — |
| `pivots_agg>menisque` | Pire en pivotant | — | — | 1,8 / 0,7 | provisoire | — |
| `escaliers>menisque` | Pire dans les escaliers | — | — | 1,1 / 0,95 | provisoire | — |
| `marche>menisque` | Pire à la marche | — | — | 1,2 / 0,9 | provisoire | — |
| `accroupi>menisque` | Pire accroupi ou à genoux | — | — | 1,6 / 0,7 | provisoire | — |
| `moment>menisque` | Horaire (positif : ) | — | — | Pire en fin de journée ou après l'activité 1,2 | provisoire | — |
| `derobade>menisque` | Dérobements (le genou lâche) | — | — | 1,2 / 0,95 | provisoire | — |
| `blocage>menisque` | Blocages vrais (impossible d'étendre le genou) | — | — | 2,5 / 0,8 | provisoire | — |
| `accrochage>menisque` | Accrochages | — | — | 1,5 / 0,8 | provisoire | — |
| `enflure>menisque` | Enflure du genou (actuelle ou récurrente) | — | — | 1,4 / 0,8 | provisoire | — |
| `posture>menisque` | Posture (positif : ) | — | — | Genu varum 1,1 ; Flexum 1,2 | provisoire | — |
| `demarche>menisque` | Démarche (positif : ) | — | — | Boiterie antalgique 1,2 | provisoire | — |
| `squat_bi>menisque` | Squat bipodal (positif : ) | — | — | Normal et indolore 0,8 ; Douleur médiale 2 ; Douleur latérale 1,5 | provisoire | — |
| `duck_walk>menisque` | Duck walk (positif : ) | — | — | Douloureux ou impossible 2,5 | provisoire | — |
| `flot>menisque` | Flot (signe du flot) (positif : ) | — | — | Négatif 0,7 ; Légèrement positif 1,5 ; Positif 1,5 | provisoire | — |
| `glacon>menisque` | Test du glaçon (positif : ) | — | — | Positif 1,5 | provisoire | — |
| `p_interlignes>menisque` | Interlignes (positif : médial douloureux, latéral douloureux, médial et latéral douloureux) | 63 % | 77 % | 2,74 / 0,48 | a_verifier | Hegedus et coll., 2007, méta-analyse (JOSPT) : douleur à l'interligne |
| `arom_flexion>menisque` | Flexion active (positif : ) | — | — | Complète et indolore 0,8 ; Complète, fin douloureuse 1,3 ; Limitée avec douleur 1,5 | provisoire | — |
| `arom_extension>menisque` | Extension active (positif : ) | — | — | Complète et indolore 0,85 ; Déficit avec douleur 1,5 ; Blocage mécanique 4 | provisoire | — |
| `prom_flexion>menisque` | Flexion passive (positif : ) | — | — | Limitée avec douleur 1,3 | provisoire | — |
| `prom_extension>menisque` | Extension passive (positif : ) | — | — | Blocage mécanique 3 | provisoire | — |
| `mcmurray>menisque` | McMurray (positif : positif médial, positif latéral) | 70 % | 71 % | 2,41 / 0,42 | a_verifier | Hegedus et coll., 2007, méta-analyse (JOSPT) |
| `thessaly>menisque` | Thessaly (20°) | — | — | 2,5 / 0,4 | a_verifier | Karachalios et coll., 2005 (valeurs élevées) ; Goossens et coll., 2015 et Blyth et coll., 2015 (valeurs faibles) : à trancher |
| `apley>menisque` | Apley | — | — | 2 / 0,6 | a_verifier | Hegedus et coll., 2007 ou Smith et coll., 2015 (méta-analyses) |

Conduite :
- Déchirure probablement dégénérative : exercice et physiothérapie ; pas d'IRM ni d'arthroscopie d'emblée — *Choisir avec soin Canada ; BMJ Rapid Recommendations (Siemieniuk et coll., 2017)*
- Déchirure traumatique : IRM si symptômes mécaniques ou échec de la réadaptation
- Repos relatif : éviter les pivots et les accroupissements profonds 4 à 6 semaines
- Consultation en physiothérapie : amplitude, contrôle de l'épanchement, renforcement
- Genou bloqué : orthopédie rapidement
- Orthopédie si déchirure traumatique chez un patient de moins de 60 ans : CRDS AH-753, priorité D, avec rapport d'IRM — *Formulaire AH-753 (CRDS)*

## Rupture du LCA

Probabilité de départ (provisoire) : 12 ans 3 %, 16 ans 6 %, 28 ans 7 %, 50 ans 3 %, 70 ans 1 % ; femme ×1,2, homme ×0,9.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>lca` | Genou atteint (positif : ) | — | — | Les deux 0,3 | provisoire | — |
| `sport.aucun>lca` | Activités physiques : Peu ou pas de sport | — | — | 0,5 / 1 | provisoire | — |
| `sport.pivot>lca` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2 / 1 | provisoire | — |
| `sport.raquette>lca` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.contact>lca` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 1,6 / 1 | provisoire | — |
| `sport.glisse>lca` | Activités physiques : Ski ou planche | — | — | 2 / 1 | provisoire | — |
| `atcd_genou>lca` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,2 / 1 | provisoire | — |
| `premier>lca` | Premier épisode | — | — | 1,5 / 0,7 | provisoire | — |
| `duree>lca` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 2 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 0,7 ; Plus de 3 mois 0,5 | provisoire | — |
| `apparition>lca` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 4 ; Subit, sans traumatisme 0,3 ; Graduel 0,15 ; Insidieux 0,1 | provisoire | — |
| `mecanisme.pivot>lca` | Mécanisme (positif : ) | — | — | Pivot ou torsion, pied au sol 5 | verifie | Décary et coll., 2018 (PLoS One), PMID 29894492 : pivot contre tout autre mécanisme (RV− 0,25 en l'absence de pivot) |
| `mecanisme>lca` | Mécanisme (positif : ) | — | — | Décélération ou réception de saut 2,5 ; Coup ou stress en valgus (de l'extérieur) 1,5 ; Coup ou stress en varus (de l'intérieur) 1,2 ; Coup direct sur le genou 0,6 ; Hyperextension 2 ; En s'accroupissant ou en se relevant 0,3 ; Coup sur le tibia, genou fléchi (chute sur le genou, tableau de bord) 0,8 | provisoire | — |
| `pop>lca` | Pop au moment de la blessure | — | — | 2,3 / 0,5 | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 |
| `enflure_rapide>lca` | Œdème en moins de 2 heures | — | — | 3 / 0,4 | provisoire | Décary et coll., 2018 (PLoS One), PMID 29894492 : épanchement immédiat RV+ 11,0, RV− 0,34, pour la rupture complète seulement ; « immédiat » non défini en heures (à confirmer) |
| `enflure_tardive>lca` | Œdème après quelques heures (6 à 24 h) | — | — | 0,8 / 1 | provisoire | — |
| `poursuivre>lca` | A pu poursuivre l'activité | — | — | 0,5 / 2 | provisoire | — |
| `ecchymose>lca` | Ecchymose | — | — | 1,3 / 0,9 | provisoire | — |
| `pivots_agg>lca` | Pire en pivotant | — | — | 1,5 / 0,8 | provisoire | — |
| `derobade>lca` | Dérobements (le genou lâche) | — | — | 1,6 / 0,6 | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 |
| `enflure>lca` | Enflure du genou (actuelle ou récurrente) | — | — | 1,6 / 0,8 | verifie | Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267 (enflure rapportée au questionnaire) |
| `demarche>lca` | Démarche (positif : ) | — | — | Boiterie antalgique 1,3 ; Incapable de mettre du poids 1,5 | provisoire | — |
| `appui_uni>lca` | Appui unipodal (positif : ) | — | — | Instable ou douloureux 1,3 | provisoire | — |
| `ex_ecchymose>lca` | Ecchymose | — | — | 1,3 / 0,95 | provisoire | — |
| `ex_atrophie>lca` | Atrophie du quadriceps | — | — | 1,3 / 0,95 | provisoire | — |
| `flot>lca` | Flot (signe du flot) (positif : ) | — | — | Négatif 0,5 ; Légèrement positif 1,3 ; Positif 2 | provisoire | — |
| `glacon>lca` | Test du glaçon (positif : ) | — | — | Négatif 0,7 ; Positif 3 | provisoire | — |
| `arom_flexion>lca` | Flexion active (positif : ) | — | — | Limitée avec douleur 1,4 | provisoire | — |
| `arom_extension>lca` | Extension active (positif : ) | — | — | Déficit avec douleur 1,5 | provisoire | — |
| `lachman>lca` | Lachman (positif : laxité) | 81 % | 85 % | 5,4 / 0,22 | verifie | Sokal et coll., 2022, méta-analyse bivariée (Knee Surg Sports Traumatol Arthrosc), PMID 35150292 |
| `tiroir_ant>lca` | Tiroir antérieur (positif : laxité) | 83 % | 85 % | 5,53 / 0,2 | verifie | Sokal et coll., 2022, méta-analyse bivariée (Knee Surg Sports Traumatol Arthrosc), PMID 35150292 ; en soins primaires, Wagemakers 2010 : RV+ 2,0, RV− 0,3 |
| `valgus0>lca` | Stress en valgus à 0° (positif : ) | — | — | Laxité 2 | provisoire | — |
| `varus0>lca` | Stress en varus à 0° (positif : ) | — | — | Laxité 1,5 | provisoire | — |

Conduite :
- Radiographie si un critère d'Ottawa est présent (fracture de Segond, arrachement) — *Règle du genou d'Ottawa (Stiell et coll., 1996)*
- RICE, béquilles et orthèse au besoin les premiers jours
- Consultation en physiothérapie précoce : amplitude, épanchement, quadriceps
- Réadaptation d'abord possible, reconstruction différée selon l'instabilité — *Essai KANON (Frobell et coll., 2010)*
- IRM pour confirmer en cas de doute ou si une reconstruction est envisagée
- Orthopédie : CRDS AH-753, rupture du ligament croisé avec physiothérapie initiée, priorité C, avec rapport d'IRM — *Formulaire AH-753 (CRDS)*

## Entorse du LCP

Probabilité de départ (provisoire) : 12 ans 0 %, 25 ans 1 %, 50 ans 1 %, 70 ans 0 % ; homme ×1,3, femme ×0,75.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>lcp` | Genou atteint (positif : ) | — | — | Les deux 0,3 | provisoire | — |
| `sport.contact>lcp` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `duree>lcp` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 2 | provisoire | — |
| `apparition>lcp` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 4 ; Graduel 0,2 ; Insidieux 0,2 | provisoire | — |
| `mecanisme>lcp` | Mécanisme (positif : ) | — | — | Coup sur le tibia, genou fléchi (chute sur le genou, tableau de bord) 6 ; Hyperextension 1,5 | provisoire | — |
| `localisation.posterieure>lcp` | Où est la douleur : Postérieure (creux poplité) | — | — | 1,5 / 0,95 | provisoire | — |
| `p_poplite>lcp` | Creux poplité | — | — | 1,5 / 0,95 | provisoire | — |
| `tiroir_post>lcp` | Tiroir postérieur (positif : laxité) | 90 % | 99 % | 90 / 0,1 | a_verifier | Rubinstein et coll., 1994 |
| `sag>lcp` | Sag sign | — | — | 8 / 0,6 | provisoire | — |
| `dial>lcp` | Dial test | — | — | 3 / 0,9 | provisoire | — |

Conduite :
- Radiographie selon la règle d'Ottawa — *Stiell et coll., 1996*
- LCP isolé : traitement conservateur ; consultation en physiothérapie centrée sur le quadriceps
- Atteinte combinée ou du coin postéro-latéral : orthopédie rapidement

## Entorse d'un ligament collatéral (LLI, LLE)

Probabilité de départ (provisoire) : 12 ans 3 %, 16 ans 5 %, 28 ans 5 %, 50 ans 3 %, 70 ans 2 %.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>collat` | Genou atteint (positif : ) | — | — | Les deux 0,3 | provisoire | — |
| `sport.aucun>collat` | Activités physiques : Peu ou pas de sport | — | — | 0,7 / 1 | provisoire | — |
| `sport.pivot>collat` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.contact>collat` | Activités physiques : Sports de contact ou de collision (hockey, football, rugby, combat) | — | — | 2 / 1 | provisoire | — |
| `sport.glisse>collat` | Activités physiques : Ski ou planche | — | — | 2 / 1 | provisoire | — |
| `sport.natation>collat` | Activités physiques : Natation | — | — | 1,5 / 1 | provisoire | — |
| `premier>collat` | Premier épisode | — | — | 1,5 / 0,6 | provisoire | — |
| `duree>collat` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 2,5 ; 1 à 6 semaines 1,3 ; 6 semaines à 3 mois 0,5 ; Plus de 3 mois 0,3 | provisoire | — |
| `apparition>collat` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 4 ; Subit, sans traumatisme 0,3 ; Graduel 0,15 ; Insidieux 0,1 | provisoire | — |
| `mecanisme>collat` | Mécanisme (positif : ) | — | — | Pivot ou torsion, pied au sol 1,2 ; Coup ou stress en valgus (de l'extérieur) 4 ; Coup ou stress en varus (de l'intérieur) 3 ; En s'accroupissant ou en se relevant 0,3 | provisoire | — |
| `ecchymose>collat` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `localisation.interligne_med>collat` | Où est la douleur : Interligne médial | — | — | 1,8 / 0,7 | provisoire | — |
| `localisation.interligne_lat>collat` | Où est la douleur : Interligne latéral | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.patte_oie>collat` | Où est la douleur : Médiale, sous l'interligne (patte d'oie) | — | — | 1,2 / 1 | provisoire | — |
| `localisation.laterale>collat` | Où est la douleur : Latérale, au-dessus de l'interligne (bandelette) | — | — | 1,2 / 0,9 | provisoire | — |
| `ex_ecchymose>collat` | Ecchymose | — | — | 2 / 0,8 | provisoire | — |
| `p_interlignes>collat` | Interlignes (positif : ) | — | — | Indolores 0,8 ; Médial douloureux 1,5 ; Latéral douloureux 1,3 | provisoire | — |
| `p_lli>collat` | LLI | — | — | 3 / 0,4 | provisoire | — |
| `p_lle>collat` | LLE | — | — | 3 / 0,8 | provisoire | — |
| `p_perone>collat` | Tête du péroné | — | — | 1,5 / 0,95 | provisoire | — |
| `valgus0>collat` | Stress en valgus à 0° (positif : ) | — | — | Normal et indolore 0,7 ; Douleur sans laxité 2 ; Laxité 5 | provisoire | — |
| `valgus30>collat` | Stress en valgus à 30° (positif : ) | — | — | Normal et indolore 0,3 ; Douleur sans laxité 3 ; Laxité 5 | a_verifier | Solomon et coll., 2001, JAMA (examen clinique rationnel) : données limitées |
| `varus0>collat` | Stress en varus à 0° (positif : ) | — | — | Normal et indolore 0,9 ; Douleur sans laxité 2 ; Laxité 5 | provisoire | — |
| `varus30>collat` | Stress en varus à 30° (positif : ) | — | — | Normal et indolore 0,7 ; Douleur sans laxité 2,5 ; Laxité 4 | provisoire | — |
| `dial>collat` | Dial test | — | — | 2 / 0,95 | provisoire | — |

Conduite :
- Radiographie selon la règle d'Ottawa — *Stiell et coll., 1996*
- RICE, mise en charge selon la tolérance
- Grade II ou III : orthèse articulée 4 à 6 semaines
- Consultation en physiothérapie : amplitude et renforcement
- Retour au sport progressif : environ 1 à 3 semaines (grade I), 3 à 6 semaines (grade II)
- Laxité en varus, laxité à 0° ou plusieurs ligaments : orthopédie rapidement

## Instabilité ou luxation de la rotule

Probabilité de départ (provisoire) : 12 ans 5 %, 16 ans 7 %, 28 ans 3 %, 50 ans 1 %, 70 ans 0 % ; femme ×1,4, homme ×0,75.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>rotule` | Genou atteint (positif : ) | — | — | Les deux 0,8 | provisoire | — |
| `sport.aucun>rotule` | Activités physiques : Peu ou pas de sport | — | — | 0,7 / 1 | provisoire | — |
| `sport.pivot>rotule` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>rotule` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,6 / 1 | provisoire | — |
| `atcd_genou>rotule` | Blessure ou chirurgie antérieure à ce genou | — | — | 1,5 / 0,95 | provisoire | — |
| `premier>rotule` | Premier épisode | — | — | 0,7 / 1,6 | provisoire | — |
| `duree>rotule` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 1,5 ; Plus de 3 mois 0,8 | provisoire | — |
| `apparition>rotule` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 3 ; Subit, sans traumatisme 1,2 ; Graduel 0,4 ; Insidieux 0,3 | provisoire | — |
| `mecanisme>rotule` | Mécanisme (positif : ) | — | — | Pivot ou torsion, pied au sol 2 | provisoire | — |
| `pop>rotule` | Pop au moment de la blessure | — | — | 1,5 / 0,9 | provisoire | — |
| `enflure_rapide>rotule` | Œdème en moins de 2 heures | — | — | 2,5 / 0,7 | provisoire | — |
| `poursuivre>rotule` | A pu poursuivre l'activité | — | — | 0,7 / 1,5 | provisoire | — |
| `rotule_sortie>rotule` | Sensation que la rotule est sortie de place | — | — | 8 / 0,4 | provisoire | — |
| `localisation.anterieure>rotule` | Où est la douleur : Antérieure, autour de la rotule | — | — | 1,5 / 0,6 | provisoire | — |
| `pivots_agg>rotule` | Pire en pivotant | — | — | 1,3 / 0,9 | provisoire | — |
| `derobade>rotule` | Dérobements (le genou lâche) | — | — | 2 / 0,6 | provisoire | — |
| `posture>rotule` | Posture (positif : ) | — | — | Genu valgum 1,3 ; Recurvatum 1,3 | provisoire | — |
| `squat_uni>rotule` | Squat unipodal (positif : ) | — | — | Valgus dynamique 1,3 | provisoire | — |
| `appui_uni>rotule` | Appui unipodal (positif : ) | — | — | Instable ou douloureux 1,3 | provisoire | — |
| `flot>rotule` | Flot (signe du flot) (positif : ) | — | — | Positif 1,5 | provisoire | — |
| `glacon>rotule` | Test du glaçon (positif : ) | — | — | Positif 2 | provisoire | — |
| `p_rotule>rotule` | Rotule | — | — | 1,3 / 0,9 | provisoire | — |
| `p_facettes>rotule` | Facettes rotuliennes | — | — | 1,3 / 0,9 | provisoire | — |
| `p_retinaculum>rotule` | Bord médial de la rotule (rétinaculum) | — | — | 3 / 0,5 | provisoire | — |
| `mobilite_rotule>rotule` | Mobilité rotulienne (positif : ) | — | — | Augmentée 3 | provisoire | — |
| `apprehension>rotule` | Appréhension rotulienne | — | — | 4 / 0,3 | a_verifier | Ahmad et coll., 2009 (appréhension mobile) ; données limitées |

Conduite :
- Radiographie (face, profil, axiale) après une première luxation
- IRM si hémarthrose importante ou fragment ostéochondral soupçonné
- Traitement conservateur après une première luxation : immobilisation courte, puis physiothérapie (quadriceps, hanche, proprioception) — *Revue Cochrane (Smith et coll., 2015)*
- Orthèse de stabilisation rotulienne au retour au sport
- Orthopédie si fragment ostéochondral, luxations récidivantes ou instabilité persistante

## Tendinopathie rotulienne ou quadricipitale

Probabilité de départ (provisoire) : 12 ans 4 %, 16 ans 7 %, 28 ans 6 %, 50 ans 3 %, 70 ans 2 % ; homme ×1,3, femme ×0,8.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>tendino` | Genou atteint (positif : ) | — | — | Les deux 1,4 | provisoire | — |
| `sport.aucun>tendino` | Activités physiques : Peu ou pas de sport | — | — | 0,5 / 1 | provisoire | — |
| `sport.course>tendino` | Activités physiques : Course à pied | — | — | 1,2 / 1 | provisoire | — |
| `sport.pivot>tendino` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 2 / 1 | provisoire | — |
| `sport.raquette>tendino` | Activités physiques : Sports de raquette (tennis, badminton, pickleball, squash) | — | — | 1,3 / 1 | provisoire | — |
| `sport.danse>tendino` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,4 / 1 | provisoire | — |
| `sport.muscu>tendino` | Activités physiques : Musculation, haltérophilie ou CrossFit | — | — | 1,3 / 1 | provisoire | — |
| `duree>tendino` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 0,4 ; 1 à 6 semaines 0,8 ; 6 semaines à 3 mois 1,2 ; Plus de 3 mois 1,5 | provisoire | — |
| `apparition>tendino` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,8 ; Insidieux 1,5 | provisoire | — |
| `localisation.anterieure>tendino` | Où est la douleur : Antérieure, autour de la rotule | — | — | 1,3 / 0,8 | provisoire | — |
| `localisation.pole_inf>tendino` | Où est la douleur : Sous la rotule (tendon rotulien) | — | — | 4 / 0,4 | provisoire | — |
| `localisation.infrapat>tendino` | Où est la douleur : Sous la rotule, de chaque côté du tendon | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.tuberosite>tendino` | Où est la douleur : Tubérosité tibiale | — | — | 1,5 / 0,9 | provisoire | — |
| `escaliers>tendino` | Pire dans les escaliers | — | — | 1,3 / 0,8 | provisoire | — |
| `accroupi>tendino` | Pire accroupi ou à genoux | — | — | 1,3 / 0,9 | provisoire | — |
| `course_saut>tendino` | Pire à la course ou au saut | — | — | 2,5 / 0,4 | provisoire | — |
| `moment>tendino` | Horaire (positif : ) | — | — | Pire en fin de journée ou après l'activité 1,3 | provisoire | — |
| `nocturne>tendino` | Douleur la nuit | — | — | 0,7 / 1,05 | provisoire | — |
| `enflure>tendino` | Enflure du genou (actuelle ou récurrente) | — | — | 0,5 / 1,1 | provisoire | — |
| `squat_bi>tendino` | Squat bipodal (positif : ) | — | — | Douleur antérieure 1,5 | provisoire | — |
| `squat_uni>tendino` | Squat unipodal (positif : ) | — | — | Douloureux 1,5 | provisoire | — |
| `saut_bi>tendino` | Saut bipodal (positif : ) | — | — | Douloureux 2 | provisoire | — |
| `saut_uni>tendino` | Saut unipodal (positif : ) | — | — | Douloureux 2 | provisoire | — |
| `flot>tendino` | Flot (signe du flot) (positif : ) | — | — | Négatif 1,1 ; Positif 0,5 | provisoire | — |
| `glacon>tendino` | Test du glaçon (positif : ) | — | — | Positif 0,4 | provisoire | — |
| `p_tendon_rot>tendino` | Tendon rotulien (pôle inférieur) | — | — | 1,8 / 0,4 | a_verifier | Cook et coll., 2001 : palpation du tendon rotulien, sensible mais peu spécifique |
| `p_tendon_quad>tendino` | Tendon quadricipital | — | — | 2 / 0,8 | provisoire | — |
| `p_tta>tendino` | Tubérosité tibiale | — | — | 1,3 / 0,9 | provisoire | — |
| `rrom_extension>tendino` | Extension résistée | — | — | 2 / 0,6 | provisoire | — |
| `lag_ext>tendino` | Lag en extension | — | — | 2 / 0,95 | provisoire | — |

Conduite :
- Repos relatif : réduire les sauts selon la douleur (3/10 ou moins pendant et le lendemain) — *Modèle de monitorage de la douleur (Silbernagel et coll., 2007)*
- Programme de mise en charge progressive : isométriques, puis lourd et lent, puis pliométrie — *Kongsgaard et coll., 2009 ; Malliaras et coll., 2015*
- Consultation en physiothérapie
- Éviter les infiltrations de corticostéroïdes dans le tendon
- Échographie si doute diagnostique ou rupture partielle soupçonnée

## Syndrome du coussinet adipeux (Hoffa)

Probabilité de départ (provisoire) : 12 ans 2 %, 25 ans 3 %, 50 ans 2 %, 70 ans 1 %.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>hoffa` | Genou atteint (positif : ) | — | — | Les deux 1,2 | provisoire | — |
| `sport.danse>hoffa` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,5 / 1 | provisoire | — |
| `duree>hoffa` | Depuis combien de temps (positif : ) | — | — | Plus de 3 mois 1,2 | provisoire | — |
| `apparition>hoffa` | Mode d'apparition (positif : ) | — | — | Graduel 1,5 ; Insidieux 1,3 | provisoire | — |
| `mecanisme>hoffa` | Mécanisme (positif : ) | — | — | Hyperextension 1,5 | provisoire | — |
| `localisation.anterieure>hoffa` | Où est la douleur : Antérieure, autour de la rotule | — | — | 1,3 / 0,9 | provisoire | — |
| `localisation.infrapat>hoffa` | Où est la douleur : Sous la rotule, de chaque côté du tendon | — | — | 4 / 0,6 | provisoire | — |
| `hyperext_agg>hoffa` | Pire genou en hyperextension (debout, genoux verrouillés) | — | — | 3 / 0,8 | provisoire | — |
| `enflure>hoffa` | Enflure du genou (actuelle ou récurrente) | — | — | 0,7 / 1,05 | provisoire | — |
| `posture>hoffa` | Posture (positif : ) | — | — | Recurvatum 1,5 | provisoire | — |
| `squat_bi>hoffa` | Squat bipodal (positif : ) | — | — | Douleur antérieure 1,3 | provisoire | — |
| `p_tendon_rot>hoffa` | Tendon rotulien (pôle inférieur) | — | — | 1,3 / 0,9 | provisoire | — |
| `arom_extension>hoffa` | Extension active (positif : ) | — | — | Complète, fin douloureuse 1,5 | provisoire | — |
| `hoffa_test>hoffa` | Pincement du fat pad (Hoffa) | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Éviter l'hyperextension ; taping de décharge du coussinet adipeux
- Consultation en physiothérapie : contrôle de l'extension, renforcement du quadriceps
- AINS prn de courte durée
- Échographie ou IRM si la douleur persiste

## Syndrome de la bandelette ilio-tibiale

Probabilité de départ (provisoire) : 12 ans 1 %, 16 ans 2 %, 28 ans 5 %, 50 ans 2 %, 70 ans 1 %.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>bit` | Genou atteint (positif : ) | — | — | Les deux 1,2 | provisoire | — |
| `sport.aucun>bit` | Activités physiques : Peu ou pas de sport | — | — | 0,4 / 1 | provisoire | — |
| `sport.course>bit` | Activités physiques : Course à pied | — | — | 2,5 / 1 | provisoire | — |
| `sport.velo>bit` | Activités physiques : Vélo | — | — | 1,8 / 1 | provisoire | — |
| `duree>bit` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 0,6 | provisoire | — |
| `apparition>bit` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,2 ; Graduel 2 ; Insidieux 1,5 | provisoire | — |
| `localisation.interligne_lat>bit` | Où est la douleur : Interligne latéral | — | — | 1,5 / 0,9 | provisoire | — |
| `localisation.laterale>bit` | Où est la douleur : Latérale, au-dessus de l'interligne (bandelette) | — | — | 5 / 0,3 | provisoire | — |
| `course_saut>bit` | Pire à la course ou au saut | — | — | 2 / 0,5 | provisoire | — |
| `enflure>bit` | Enflure du genou (actuelle ou récurrente) | — | — | 0,4 / 1,1 | provisoire | — |
| `squat_bi>bit` | Squat bipodal (positif : ) | — | — | Douleur latérale 1,3 | provisoire | — |
| `flot>bit` | Flot (signe du flot) (positif : ) | — | — | Négatif 1,1 ; Positif 0,4 | provisoire | — |
| `glacon>bit` | Test du glaçon (positif : ) | — | — | Positif 0,3 | provisoire | — |
| `p_bit>bit` | Bandelette ilio-tibiale (épicondyle latéral) | — | — | 4 / 0,4 | provisoire | — |
| `noble>bit` | Noble | — | — | 4 / 0,4 | provisoire | — |

Conduite :
- Repos relatif : réduire le volume de course ou de vélo, éviter les descentes
- Quantifier et ajuster l'entraînement : volume, dénivelé, cadence
- Consultation en physiothérapie : renforcement des abducteurs de la hanche
- AINS prn de courte durée ; infiltration possible si la douleur persiste

## Bursite prépatellaire

Probabilité de départ (provisoire) : 12 ans 1 %, 16 ans 1 %, 28 ans 2 %, 50 ans 3 %, 70 ans 2 % ; homme ×1,5, femme ×0,7.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>bprep` | Genou atteint (positif : ) | — | — | Les deux 0,5 | provisoire | — |
| `travail>bprep` | Occupation (positif : ) | — | — | Travail à genoux (plancher, toiture, plomberie…) 3 | provisoire | — |
| `duree>bprep` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 1,5 | provisoire | — |
| `apparition>bprep` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 1,5 | provisoire | — |
| `mecanisme>bprep` | Mécanisme (positif : ) | — | — | Coup direct sur le genou 2 | provisoire | — |
| `localisation.prerotulienne>bprep` | Où est la douleur : Devant la rotule, superficielle | — | — | 6 / 0,3 | provisoire | — |
| `accroupi>bprep` | Pire accroupi ou à genoux | — | — | 2 / 0,6 | provisoire | — |
| `rougeur_chaleur>bprep` | Rougeur ou chaleur | — | — | 2,5 / 0,85 | provisoire | — |
| `ex_chaleur>bprep` | Rougeur ou chaleur | — | — | 2 / 0,9 | provisoire | — |
| `ex_tumefaction.prerotulienne>bprep` | Tuméfaction localisée : Devant la rotule (bourse) | — | — | 10 / 0,2 | provisoire | — |

Conduite :
- Éviter l'appui sur les genoux ; genouillère de protection
- Glace, compression, AINS prn
- Bourse chaude, rouge ou fièvre : ponction-aspiration (culture, Gram, cristaux)
- Pas d'infiltration d'emblée

## Tendinobursite de la patte d'oie

Probabilité de départ (provisoire) : 12 ans 0 %, 16 ans 1 %, 28 ans 1 %, 50 ans 5 %, 70 ans 6 % ; femme ×1,6, homme ×0,65.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>poie` | Genou atteint (positif : ) | — | — | Les deux 1,3 | provisoire | — |
| `sport.marche>poie` | Activités physiques : Marche ou randonnée | — | — | 1,2 / 1 | provisoire | — |
| `obesite>poie` | Obésité (IMC 30 ou plus) | — | — | 1,8 / 0,8 | provisoire | — |
| `duree>poie` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 0,5 ; Plus de 3 mois 1,3 | provisoire | — |
| `apparition>poie` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,3 ; Graduel 1,6 ; Insidieux 1,6 | provisoire | — |
| `localisation.interligne_med>poie` | Où est la douleur : Interligne médial | — | — | 1,2 / 1 | provisoire | — |
| `localisation.patte_oie>poie` | Où est la douleur : Médiale, sous l'interligne (patte d'oie) | — | — | 5 / 0,3 | provisoire | — |
| `marche>poie` | Pire à la marche | — | — | 1,3 / 0,9 | provisoire | — |
| `p_poie>poie` | Patte d'oie | — | — | 5 / 0,3 | provisoire | — |
| `rrom_flexion>poie` | Flexion résistée | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Exercices : ischiojambiers, quadriceps et hanche
- Perte de poids au besoin ; AINS topiques prn
- Infiltration de corticostéroïdes possible
- Chercher une gonarthrose associée

## Apophysite (Osgood-Schlatter, Sinding-Larsen-Johansson)

Probabilité de départ (provisoire) : 11 ans 18 %, 13 ans 15 %, 15 ans 10 %, 17 ans 4 %, 19 ans 1 %, 25 ans 0 % ; homme ×1,4, femme ×0,7.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>apo` | Genou atteint (positif : ) | — | — | Les deux 1,6 | provisoire | — |
| `sport.pivot>apo` | Activités physiques : Sports de pivot ou de saut (soccer, basketball, volleyball, handball…) | — | — | 1,5 / 1 | provisoire | — |
| `sport.danse>apo` | Activités physiques : Danse, gymnastique ou cheerleading | — | — | 1,3 / 1 | provisoire | — |
| `duree>apo` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 0,6 ; Plus de 3 mois 1,3 | provisoire | — |
| `apparition>apo` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,4 ; Graduel 1,8 ; Insidieux 1,5 | provisoire | — |
| `localisation.anterieure>apo` | Où est la douleur : Antérieure, autour de la rotule | — | — | 0,8 / 1 | provisoire | — |
| `localisation.pole_inf>apo` | Où est la douleur : Sous la rotule (tendon rotulien) | — | — | 2 / 0,8 | provisoire | — |
| `localisation.tuberosite>apo` | Où est la douleur : Tubérosité tibiale | — | — | 6 / 0,3 | provisoire | — |
| `accroupi>apo` | Pire accroupi ou à genoux | — | — | 1,5 / 0,8 | provisoire | — |
| `course_saut>apo` | Pire à la course ou au saut | — | — | 2 / 0,6 | provisoire | — |
| `enflure>apo` | Enflure du genou (actuelle ou récurrente) | — | — | 0,6 / 1,05 | provisoire | — |
| `saut_bi>apo` | Saut bipodal (positif : ) | — | — | Douloureux 1,5 | provisoire | — |
| `saut_uni>apo` | Saut unipodal (positif : ) | — | — | Douloureux 1,5 | provisoire | — |
| `ex_tumefaction.tuberosite>apo` | Tuméfaction localisée : Tubérosité tibiale proéminente | — | — | 3 / 0,7 | provisoire | — |
| `p_tendon_rot>apo` | Tendon rotulien (pôle inférieur) | — | — | 1,5 / 0,9 | provisoire | — |
| `p_tta>apo` | Tubérosité tibiale | — | — | 5 / 0,2 | provisoire | — |
| `rrom_extension>apo` | Extension résistée | — | — | 1,5 / 0,8 | provisoire | — |

Conduite :
- Enseignement : bénin, se règle avec la fin de la croissance
- Repos relatif : activités selon la douleur, sans arrêt complet obligatoire
- Glace après l'activité ; bande sous-rotulienne au besoin
- Étirements du quadriceps et des ischiojambiers ; physiothérapie si limitation
- Radiographie si atypique (unilatéral avec douleur nocturne ou au repos)

## Arthrite microcristalline ou inflammatoire

Probabilité de départ (provisoire) : 12 ans 1 %, 16 ans 1 %, 28 ans 2 %, 50 ans 5 %, 70 ans 7 %.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>arthrite` | Genou atteint (positif : ) | — | — | Les deux 1,8 | provisoire | — |
| `atcd_familiaux>arthrite` | ATCD familial de maladie rhumatologique | — | — | 1,5 / 0,9 | provisoire | — |
| `atcd_rhumato.uveite>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Uvéite | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.psoriasis>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Psoriasis | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.synovite>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Synovite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.mii>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : MII | — | — | 2,5 / 1 | provisoire | — |
| `atcd_rhumato.goutte>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Goutte | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.pseudogoutte>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Pseudogoutte | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.par>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Polyarthrite rhumatoïde | — | — | 4 / 1 | provisoire | — |
| `atcd_rhumato.spa>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Spondylarthrite | — | — | 3 / 1 | provisoire | — |
| `atcd_rhumato.infection>arthrite` | ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique : Infection récente (urinaire, génitale, digestive) | — | — | 2,5 / 1 | provisoire | — |
| `premier>arthrite` | Premier épisode | — | — | 0,7 / 1,5 | provisoire | — |
| `duree>arthrite` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 1,5 ; Plus de 3 mois 0,8 | provisoire | — |
| `apparition>arthrite` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,3 ; Subit, sans traumatisme 3 | provisoire | — |
| `localisation.diffuse>arthrite` | Où est la douleur : Diffuse, mal localisée | — | — | 2 / 0,8 | provisoire | — |
| `type_douleur>arthrite` | Type de douleur (positif : ) | — | — | Lancinante, pulsatile 1,5 | provisoire | — |
| `moment>arthrite` | Horaire (positif : ) | — | — | Pire le matin, mieux en bougeant 2,5 ; Pire en fin de journée ou après l'activité 0,5 ; Constante 1,3 | provisoire | — |
| `nocturne>arthrite` | Douleur la nuit | — | — | 1,8 / 0,7 | provisoire | — |
| `reveils>arthrite` | Réveils en deuxième partie de nuit | — | — | 2,5 / 0,8 | provisoire | — |
| `raideur>arthrite` | Raideur matinale (positif : ) | — | — | Aucune 0,4 ; Moins de 30 minutes 0,6 ; 30 minutes ou plus 3,5 | provisoire | — |
| `enflure>arthrite` | Enflure du genou (actuelle ou récurrente) | — | — | 2,5 / 0,4 | provisoire | — |
| `rougeur_chaleur>arthrite` | Rougeur ou chaleur | — | — | 3 / 0,7 | provisoire | — |
| `autres_articulations>arthrite` | Douleur ou enflure d'autres articulations | — | — | 3 / 0,8 | provisoire | — |
| `fievre>arthrite` | Fièvre ou frissons | — | — | 2 / 0,9 | provisoire | — |
| `demarche>arthrite` | Démarche (positif : ) | — | — | Normale 0,7 ; Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `ex_chaleur>arthrite` | Rougeur ou chaleur | — | — | 4 / 0,5 | provisoire | — |
| `flot>arthrite` | Flot (signe du flot) (positif : ) | — | — | Négatif 0,4 ; Légèrement positif 1,5 ; Positif 2 | provisoire | — |
| `glacon>arthrite` | Test du glaçon (positif : ) | — | — | Négatif 0,7 ; Positif 3 | provisoire | — |
| `arom_flexion>arthrite` | Flexion active (positif : ) | — | — | Complète et indolore 0,6 ; Limitée avec douleur 1,8 ; Limitée par raideur 1,3 | provisoire | — |
| `arom_extension>arthrite` | Extension active (positif : ) | — | — | Déficit avec douleur 1,5 | provisoire | — |
| `prom_flexion>arthrite` | Flexion passive (positif : ) | — | — | Limitée avec douleur 1,5 | provisoire | — |

Conduite :
- Ponction articulaire : numération, Gram, culture, cristaux
- Bilan : FSC, CRP, VS, acide urique, FR et anti-CCP ; radiographie (chondrocalcinose)
- Goutte ou pseudogoutte confirmée : colchicine, AINS ou corticostéroïdes selon le profil — *ACR 2020 (goutte)*
- Rhumatologie : CRDS AH-765 (arthrite microcristalline, polyarthrite) — *Formulaire AH-765 (CRDS)*

## Kyste poplité (de Baker)

Probabilité de départ (provisoire) : 12 ans 0 %, 16 ans 1 %, 28 ans 1 %, 50 ans 4 %, 70 ans 6 %.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>baker` | Genou atteint (positif : ) | — | — | Les deux 0,8 | provisoire | — |
| `apparition>baker` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,5 ; Insidieux 1,3 | provisoire | — |
| `localisation.posterieure>baker` | Où est la douleur : Postérieure (creux poplité) | — | — | 5 / 0,5 | provisoire | — |
| `irradiation>baker` | Irradiation (positif : ) | — | — | Vers le mollet 1,5 | provisoire | — |
| `enflure>baker` | Enflure du genou (actuelle ou récurrente) | — | — | 1,5 / 0,8 | provisoire | — |
| `mollet>baker` | Mollet enflé, chaud ou douloureux | — | — | 1,5 / 1 | provisoire | — |
| `ex_tumefaction.poplitee>baker` | Tuméfaction localisée : Masse au creux poplité | — | — | 8 / 0,4 | provisoire | — |
| `flot>baker` | Flot (signe du flot) (positif : ) | — | — | Négatif 0,8 | provisoire | — |
| `p_poplite>baker` | Creux poplité | — | — | 2,5 / 0,7 | provisoire | — |
| `arom_flexion>baker` | Flexion active (positif : ) | — | — | Limitée avec douleur 1,3 | provisoire | — |

Conduite :
- Échographie si doute diagnostique
- Traiter la cause : arthrose, ménisque
- Mollet enflé ou douloureux : écho-doppler pour éliminer une TVP
- Aspiration ou infiltration possible si symptomatique

## Insuffisance sous-chondrale ou fracture d'insuffisance

Probabilité de départ (provisoire) : 12 ans 0 %, 45 ans 0 %, 60 ans 1 %, 75 ans 3 %, 90 ans 4 % ; femme ×1,6, homme ×0,65.

| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |
|---|---|---|---|---|---|---|
| `cote>insuff` | Genou atteint (positif : ) | — | — | Les deux 0,7 | provisoire | — |
| `duree>insuff` | Depuis combien de temps (positif : ) | — | — | Moins de 7 jours 1,5 ; Plus de 3 mois 0,6 | provisoire | — |
| `apparition>insuff` | Mode d'apparition (positif : ) | — | — | Subit, avec un traumatisme 0,5 ; Subit, sans traumatisme 3 | provisoire | — |
| `marche>insuff` | Pire à la marche | — | — | 1,5 / 0,9 | provisoire | — |
| `nocturne>insuff` | Douleur la nuit | — | — | 2 / 0,8 | provisoire | — |
| `demarche>insuff` | Démarche (positif : ) | — | — | Boiterie antalgique 1,5 ; Incapable de mettre du poids 2 | provisoire | — |
| `p_rebords>insuff` | Rebords osseux articulaires | — | — | 1,5 / 0,9 | provisoire | — |

Conduite :
- Radiographie, souvent normale au début ; IRM si douleur brutale ou persistante
- Décharge partielle avec béquilles
- Bilan et traitement de l'ostéoporose
- Orthopédie si fracture ou collapsus

## Mesures générales

Blessure récente :
- Protection et repos relatif ; mise en charge selon la tolérance, béquilles au besoin
- RICE les premiers jours : glace 15 à 20 min aux 2 à 3 h, compression, élévation
- Acétaminophène ; AINS prn de courte durée si pas de contre-indication — *PEACE & LOVE (Dubois et Esculier, 2020) suggère d'éviter les anti-inflammatoires les premiers jours*
- Consultation en physiothérapie dès que la douleur le permet

Douleur de surcharge :
- Repos relatif : garder les activités peu douloureuses (3/10 ou moins pendant et le lendemain), réduire celles qui augmentent la douleur — *Modèle de monitorage de la douleur (Silbernagel et coll., 2007)*
- Quantifier le stress mécanique (volume, fréquence, intensité, terrain) et le réduire de 30 à 50 %, puis reprise d'environ 10 % par semaine
- Consultation en physiothérapie : renforcement progressif
- AINS topiques ou oraux prn, de courte durée

Pour tous :
- Enseignement et conseils : nature de l'atteinte, pronostic, autogestion
- Consignes de reconsultation : fièvre, genou chaud et enflé, blocage, mollet enflé, douleur nocturne
- Suivi dans 4 à 6 semaines
