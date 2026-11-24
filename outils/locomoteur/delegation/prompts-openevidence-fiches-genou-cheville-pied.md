# Prompts pour OpenEvidence : fiches résumées du genou, de la cheville et du pied

Document : `outils/locomoteur/delegation/prompts-openevidence-fiches-genou-cheville-pied.md` dans le dépôt.

But : obtenir le **texte et les données** des fiches résumées (une page par pathologie) pour les trois régions qui manquent,
au même format que les blocs 1 à 8 (ex. « bloc5coude.pdf »). Gemini fera ensuite la mise en page et les dessins.

## Mode d'emploi

1. **Une conversation OpenEvidence par région** (genou, puis cheville, puis pied).
2. Coller **tout le bloc gris** de la région. OpenEvidence répond avec les 6 premières fiches.
3. Coller ensuite, une à la fois, les lignes « Suite » de la région, dans la même conversation (la numérotation des références continue d'elle-même).
4. Copier toutes les réponses de la région dans un seul fichier, par exemple `fiches-genou-openevidence.md`.
5. Pour Gemini : lui donner le fichier `.md`, une page d'un bloc existant comme modèle (ex. la page 1 de « bloc5coude.pdf ») et le prompt de la section « Prompt pour Gemini » plus bas.
6. M'envoyer **le fichier `.md` d'OpenEvidence** et **le PDF de Gemini**. Avec le `.md`, je mets le texte en ligne directement ; je prendrai les dessins dans le PDF.

Codes des fiches : **G1 à G23** (genou), **Ch1 à Ch22** (cheville), **Pi1 à Pi22** (pied), dans l'ordre de la liste des diagnostics de l'outil (n° 120 à 186).

---

## Genou (23 fiches)

```text
Tu rédiges des fiches « high yield » de pathologies musculosquelettiques pour des médecins de famille du Québec. Une fiche par pathologie, une page chacune, au format EXACT ci-dessous. Réponds en français du Québec.

FORMAT D'UNE FICHE (Markdown)
## FICHE G1 · GENOU · LOCALISATION OU PRÉSENTATION · MÉCANISME OU POPULATION
### TITRE DE LA PATHOLOGIE EN MAJUSCULES
- **Épidémiologie** : … [1][2]
- **Présentation clinique** : … [3]
- **Examen physique** : … [4][5]
- **Physiopathologie** : … [6]
- **Diagnostic différentiel** : … [7]
- **Investigations** : … [8]
- **Traitement** : … [9][10]
- **Pronostic** : … [11]

**Références** : [1] Nom AB et al. Revue Année. doi:… · [2] …

EXEMPLE (fiche déjà publiée, à imiter pour le ton, la longueur et la densité de chiffres)
## FICHE Co1 · COUDE · DOULEUR LATÉRALE · TENDINOSE DE SURCHARGE
### ÉPICONDYLITE LATÉRALE
- **Épidémiologie** : 3,4 par 1000 p-a, pic à 40–49 ans ; prévalence 1–3 % ; le tennis n'explique que 5 % des cas ; tabac (RC 3,4), travail répétitif et en force (RC 5,6). [1][2][3][4]
- **Présentation clinique** : douleur latérale progressive, sans traumatisme, à la préhension et à l'extension du poignet. [2][5]
- **Examen physique** : Cozen (Se 91 %), Maudsley (Se 70 %) ; force de préhension réduite de 5–10 % coude étendu (Se 78–83 %, Sp 80–90 %). Âge ≤ 30 ans, début aigu, blocage ou épanchement orientent ailleurs. [6][7][8]
- **Physiopathologie** : tendinose angiofibroblastique de l'origine du court extenseur radial du carpe, sans inflammation vraie. [2][9]
- **Diagnostic différentiel** : tunnel radial, arthrose radio-capitellaire, instabilité postéro-latérale, plica, radiculopathie cervicale. [2][10]
- **Investigations** : clinique ; la radiographie change la conduite dans 0,7 % ; tendinose à l'imagerie chez 37 % des asymptomatiques. [2][6]
- **Traitement** : éducation, exercices ; corticoïde : succès 92 % à 6 semaines mais récidive 54 % contre 12 % à 1 an ; PRP équivalent au placebo. [11][12][13]
- **Pronostic** : 89 % améliorés à 1 an sans traitement ; récidive 8,5 % en 2 ans. [3][14]

**Références** : [1] Karjalainen TV et al. Cochrane Database Syst Rev 2021. doi:10.1002/14651858.CD010951.pub2 · [2] Wolf JM. N Engl J Med 2023. doi:10.1056/NEJMcp2216734 · [3] … (et ainsi de suite)

RÈGLES
1. Style télégraphique : 8 à 30 mots par rubrique, jamais plus de 45 ; minuscule au début ; points-virgules entre les éléments ; aucune phrase d'introduction.
2. Des chiffres partout où ils existent : incidence, prévalence, âge de pointe, sexe, facteurs de risque (RC, RR), Se et Sp de chaque test, RV+ et RV−, règles de décision avec leurs chiffres, taux de succès, délais de guérison, récidive. Abréviations permises : Se, Sp, RV+, RV−, RC, RR, p-a (personnes-années), IC 95 %.
3. Ne jamais inventer. Chaque chiffre est suivi de sa référence [n]. S'il n'y a pas de donnée, l'écrire (ex. « aucune Se/Sp publiée », « histoire naturelle non étudiée »).
4. Examen physique : les tests utiles avec Se, Sp ou RV ; ce qui doit faire penser à autre chose.
5. Investigations : dire quand l'imagerie est inutile (« clinique ») et ce qui la justifie ; règles de décision (ex. Ottawa) avec leurs chiffres ; bilan sanguin ou ponction seulement si utile.
6. Traitement : première ligne d'abord, puis infiltration, puis chirurgie, avec leurs résultats ; nommer ce qui est inefficace (ex. « équivalent au placebo »).
7. Pronostic : évolution naturelle, délais de retour au sport ou au travail, récidive, complications, en chiffres.
8. Termes du Québec : physiothérapie, orthèse, attelle, botte de marche, béquilles, AINS, infiltration de corticostéroïde, radiographie, IRM, échographie, médecin de famille.
9. En-tête : « FICHE code · RÉGION · LOCALISATION OU PRÉSENTATION · MÉCANISME OU POPULATION », en majuscules, avec exactement ces 3 éléments après le code. Titre en majuscules.
10. Références : à la fin de chaque fiche, seulement celles qu'elle cite ; format « [n] Nom Initiales et al. Revue Année. doi:… » (ou PMID si pas de DOI). Numérotation continue pour toute la région : la première fiche commence à [1], une même étude garde son numéro d'une fiche à l'autre. Sources réelles et vérifiables seulement ; méta-analyses, revues Cochrane, guides de pratique et grandes cohortes en priorité, de préférence récentes.
11. Fiche de renvoi : si la liste indique « renvoi », écrire seulement l'en-tête, le titre et la phrase indiquée (ex. « Voir la fiche Ch8. »), sans rubriques.
12. Garde exactement les codes, l'ordre et les titres de la liste (tu peux préciser le titre entre parenthèses).

LIVRAISON
Six fiches par réponse, dans l'ordre, sans commentaire avant ni après. Commence par les fiches G1 à G6. J'écrirai « Suite » pour les suivantes.

LISTE : GENOU
G1 Syndrome fémoro-patellaire
G2 Arthrose du genou
G3 Déchirure méniscale (sans blocage)
G4 Rupture du ligament croisé antérieur
G5 Entorse du ligament croisé postérieur
G6 Entorse d'un ligament collatéral (LLI, LLE)
G7 Instabilité ou luxation de la rotule
G8 Tendinopathie rotulienne ou quadricipitale
G9 Syndrome du coussinet adipeux (Hoffa)
G10 Syndrome de la bandelette ilio-tibiale
G11 Bursite prépatellaire non infectée
G12 Tendinobursite de la patte d'oie
G13 Maladie d'Osgood-Schlatter
G14 Maladie de Sinding-Larsen-Johansson
G15 Contusion ou entorse légère, sans lésion structurelle
G16 Syndrome de la plica
G17 Ménisque discoïde
G18 Kyste poplité (de Baker)
G19 Ostéochondrite disséquante du genou
G20 Goutte ou chondrocalcinose du genou
G21 Arthrite inflammatoire (polyarthrite rhumatoïde, spondyloarthrite, arthrite psoriasique)
G22 Arthrite septique du genou
G23 Fracture sous-chondrale d'insuffisance
```

Puis, dans la même conversation, une ligne à la fois :

```text
Suite : fiches G7 à G12, même format, numérotation des références continue.
```
```text
Suite : fiches G13 à G18, même format, numérotation des références continue.
```
```text
Suite : fiches G19 à G23, même format, numérotation des références continue.
```

---

## Cheville et jambe (22 fiches)

```text
Tu rédiges des fiches « high yield » de pathologies musculosquelettiques pour des médecins de famille du Québec. Une fiche par pathologie, une page chacune, au format EXACT ci-dessous. Réponds en français du Québec.

FORMAT D'UNE FICHE (Markdown)
## FICHE Ch1 · CHEVILLE · LOCALISATION OU PRÉSENTATION · MÉCANISME OU POPULATION
### TITRE DE LA PATHOLOGIE EN MAJUSCULES
- **Épidémiologie** : … [1][2]
- **Présentation clinique** : … [3]
- **Examen physique** : … [4][5]
- **Physiopathologie** : … [6]
- **Diagnostic différentiel** : … [7]
- **Investigations** : … [8]
- **Traitement** : … [9][10]
- **Pronostic** : … [11]

**Références** : [1] Nom AB et al. Revue Année. doi:… · [2] …

EXEMPLE (fiche déjà publiée, à imiter pour le ton, la longueur et la densité de chiffres)
## FICHE Co1 · COUDE · DOULEUR LATÉRALE · TENDINOSE DE SURCHARGE
### ÉPICONDYLITE LATÉRALE
- **Épidémiologie** : 3,4 par 1000 p-a, pic à 40–49 ans ; prévalence 1–3 % ; le tennis n'explique que 5 % des cas ; tabac (RC 3,4), travail répétitif et en force (RC 5,6). [1][2][3][4]
- **Présentation clinique** : douleur latérale progressive, sans traumatisme, à la préhension et à l'extension du poignet. [2][5]
- **Examen physique** : Cozen (Se 91 %), Maudsley (Se 70 %) ; force de préhension réduite de 5–10 % coude étendu (Se 78–83 %, Sp 80–90 %). Âge ≤ 30 ans, début aigu, blocage ou épanchement orientent ailleurs. [6][7][8]
- **Physiopathologie** : tendinose angiofibroblastique de l'origine du court extenseur radial du carpe, sans inflammation vraie. [2][9]
- **Diagnostic différentiel** : tunnel radial, arthrose radio-capitellaire, instabilité postéro-latérale, plica, radiculopathie cervicale. [2][10]
- **Investigations** : clinique ; la radiographie change la conduite dans 0,7 % ; tendinose à l'imagerie chez 37 % des asymptomatiques. [2][6]
- **Traitement** : éducation, exercices ; corticoïde : succès 92 % à 6 semaines mais récidive 54 % contre 12 % à 1 an ; PRP équivalent au placebo. [11][12][13]
- **Pronostic** : 89 % améliorés à 1 an sans traitement ; récidive 8,5 % en 2 ans. [3][14]

**Références** : [1] Karjalainen TV et al. Cochrane Database Syst Rev 2021. doi:10.1002/14651858.CD010951.pub2 · [2] Wolf JM. N Engl J Med 2023. doi:10.1056/NEJMcp2216734 · [3] … (et ainsi de suite)

RÈGLES
1. Style télégraphique : 8 à 30 mots par rubrique, jamais plus de 45 ; minuscule au début ; points-virgules entre les éléments ; aucune phrase d'introduction.
2. Des chiffres partout où ils existent : incidence, prévalence, âge de pointe, sexe, facteurs de risque (RC, RR), Se et Sp de chaque test, RV+ et RV−, règles de décision avec leurs chiffres, taux de succès, délais de guérison, récidive. Abréviations permises : Se, Sp, RV+, RV−, RC, RR, p-a (personnes-années), IC 95 %.
3. Ne jamais inventer. Chaque chiffre est suivi de sa référence [n]. S'il n'y a pas de donnée, l'écrire (ex. « aucune Se/Sp publiée », « histoire naturelle non étudiée »).
4. Examen physique : les tests utiles avec Se, Sp ou RV ; ce qui doit faire penser à autre chose.
5. Investigations : dire quand l'imagerie est inutile (« clinique ») et ce qui la justifie ; règles de décision (ex. Ottawa) avec leurs chiffres ; bilan sanguin ou ponction seulement si utile.
6. Traitement : première ligne d'abord, puis infiltration, puis chirurgie, avec leurs résultats ; nommer ce qui est inefficace (ex. « équivalent au placebo »).
7. Pronostic : évolution naturelle, délais de retour au sport ou au travail, récidive, complications, en chiffres.
8. Termes du Québec : physiothérapie, orthèse, attelle, botte de marche, béquilles, AINS, infiltration de corticostéroïde, radiographie, IRM, échographie, médecin de famille.
9. En-tête : « FICHE code · RÉGION · LOCALISATION OU PRÉSENTATION · MÉCANISME OU POPULATION », en majuscules, avec exactement ces 3 éléments après le code. Titre en majuscules.
10. Références : à la fin de chaque fiche, seulement celles qu'elle cite ; format « [n] Nom Initiales et al. Revue Année. doi:… » (ou PMID si pas de DOI). Numérotation continue pour toute la région : la première fiche commence à [1], une même étude garde son numéro d'une fiche à l'autre. Sources réelles et vérifiables seulement ; méta-analyses, revues Cochrane, guides de pratique et grandes cohortes en priorité, de préférence récentes.
11. Fiche de renvoi : si la liste indique « renvoi », écrire seulement l'en-tête, le titre et la phrase indiquée, sans rubriques.
12. Garde exactement les codes, l'ordre et les titres de la liste (tu peux préciser le titre entre parenthèses).

LIVRAISON
Six fiches par réponse, dans l'ordre, sans commentaire avant ni après. Commence par les fiches Ch1 à Ch6. J'écrirai « Suite » pour les suivantes.

LISTE : CHEVILLE ET JAMBE
Ch1 Entorse latérale de la cheville
Ch2 Instabilité chronique de la cheville
Ch3 Tendinopathie d'Achille corporéale
Ch4 Tendinopathie d'insertion d'Achille, maladie de Haglund ou bursite rétro-calcanéenne
Ch5 Périostite tibiale (syndrome de stress tibial médial)
Ch6 Syndrome compartimental chronique d'effort
Ch7 Lésion musculaire du mollet (tennis leg)
Ch8 Maladie de Sever (apophysite calcanéenne)
Ch9 Dysfonction du tendon tibial postérieur
Ch10 Arthrose de la cheville
Ch11 Entorse de la syndesmose (entorse haute)
Ch12 Entorse médiale isolée (ligament deltoïde)
Ch13 Tendinopathie, déchirure ou luxation des fibulaires
Ch14 Conflit antérieur ou postérieur de la cheville
Ch15 Syndrome du tunnel tarsien
Ch16 Rupture du tendon d'Achille
Ch17 Fracture de la cheville ou du médio-pied (règles d'Ottawa)
Ch18 Fracture de stress du tibia ou de la fibula
Ch19 Fracture de Maisonneuve
Ch20 Lésion ostéochondrale du talus
Ch21 Goutte ou arthrite à pyrophosphate de la cheville
Ch22 Fracture d'insuffisance (tibia distal, fibula, calcanéus)
```

Puis, dans la même conversation :

```text
Suite : fiches Ch7 à Ch12, même format, numérotation des références continue.
```
```text
Suite : fiches Ch13 à Ch17, même format, numérotation des références continue.
```
```text
Suite : fiches Ch18 à Ch22, même format, numérotation des références continue.
```

---

## Pied (22 fiches)

```text
Tu rédiges des fiches « high yield » de pathologies musculosquelettiques pour des médecins de famille du Québec. Une fiche par pathologie, une page chacune, au format EXACT ci-dessous. Réponds en français du Québec.

FORMAT D'UNE FICHE (Markdown)
## FICHE Pi1 · PIED · LOCALISATION OU PRÉSENTATION · MÉCANISME OU POPULATION
### TITRE DE LA PATHOLOGIE EN MAJUSCULES
- **Épidémiologie** : … [1][2]
- **Présentation clinique** : … [3]
- **Examen physique** : … [4][5]
- **Physiopathologie** : … [6]
- **Diagnostic différentiel** : … [7]
- **Investigations** : … [8]
- **Traitement** : … [9][10]
- **Pronostic** : … [11]

**Références** : [1] Nom AB et al. Revue Année. doi:… · [2] …

EXEMPLE (fiche déjà publiée, à imiter pour le ton, la longueur et la densité de chiffres)
## FICHE Co1 · COUDE · DOULEUR LATÉRALE · TENDINOSE DE SURCHARGE
### ÉPICONDYLITE LATÉRALE
- **Épidémiologie** : 3,4 par 1000 p-a, pic à 40–49 ans ; prévalence 1–3 % ; le tennis n'explique que 5 % des cas ; tabac (RC 3,4), travail répétitif et en force (RC 5,6). [1][2][3][4]
- **Présentation clinique** : douleur latérale progressive, sans traumatisme, à la préhension et à l'extension du poignet. [2][5]
- **Examen physique** : Cozen (Se 91 %), Maudsley (Se 70 %) ; force de préhension réduite de 5–10 % coude étendu (Se 78–83 %, Sp 80–90 %). Âge ≤ 30 ans, début aigu, blocage ou épanchement orientent ailleurs. [6][7][8]
- **Physiopathologie** : tendinose angiofibroblastique de l'origine du court extenseur radial du carpe, sans inflammation vraie. [2][9]
- **Diagnostic différentiel** : tunnel radial, arthrose radio-capitellaire, instabilité postéro-latérale, plica, radiculopathie cervicale. [2][10]
- **Investigations** : clinique ; la radiographie change la conduite dans 0,7 % ; tendinose à l'imagerie chez 37 % des asymptomatiques. [2][6]
- **Traitement** : éducation, exercices ; corticoïde : succès 92 % à 6 semaines mais récidive 54 % contre 12 % à 1 an ; PRP équivalent au placebo. [11][12][13]
- **Pronostic** : 89 % améliorés à 1 an sans traitement ; récidive 8,5 % en 2 ans. [3][14]

**Références** : [1] Karjalainen TV et al. Cochrane Database Syst Rev 2021. doi:10.1002/14651858.CD010951.pub2 · [2] Wolf JM. N Engl J Med 2023. doi:10.1056/NEJMcp2216734 · [3] … (et ainsi de suite)

RÈGLES
1. Style télégraphique : 8 à 30 mots par rubrique, jamais plus de 45 ; minuscule au début ; points-virgules entre les éléments ; aucune phrase d'introduction.
2. Des chiffres partout où ils existent : incidence, prévalence, âge de pointe, sexe, facteurs de risque (RC, RR), Se et Sp de chaque test, RV+ et RV−, règles de décision avec leurs chiffres, taux de succès, délais de guérison, récidive. Abréviations permises : Se, Sp, RV+, RV−, RC, RR, p-a (personnes-années), IC 95 %.
3. Ne jamais inventer. Chaque chiffre est suivi de sa référence [n]. S'il n'y a pas de donnée, l'écrire (ex. « aucune Se/Sp publiée », « histoire naturelle non étudiée »).
4. Examen physique : les tests utiles avec Se, Sp ou RV ; ce qui doit faire penser à autre chose.
5. Investigations : dire quand l'imagerie est inutile (« clinique ») et ce qui la justifie ; règles de décision (ex. Ottawa) avec leurs chiffres ; bilan sanguin ou ponction seulement si utile.
6. Traitement : première ligne d'abord, puis infiltration, puis chirurgie, avec leurs résultats ; nommer ce qui est inefficace (ex. « équivalent au placebo »).
7. Pronostic : évolution naturelle, délais de retour au sport ou au travail, récidive, complications, en chiffres.
8. Termes du Québec : physiothérapie, orthèse plantaire, attelle, botte de marche, béquilles, AINS, infiltration de corticostéroïde, radiographie, IRM, échographie, médecin de famille.
9. En-tête : « FICHE code · RÉGION · LOCALISATION OU PRÉSENTATION · MÉCANISME OU POPULATION », en majuscules, avec exactement ces 3 éléments après le code. Titre en majuscules.
10. Références : à la fin de chaque fiche, seulement celles qu'elle cite ; format « [n] Nom Initiales et al. Revue Année. doi:… » (ou PMID si pas de DOI). Numérotation continue pour toute la région : la première fiche commence à [1], une même étude garde son numéro d'une fiche à l'autre. Sources réelles et vérifiables seulement ; méta-analyses, revues Cochrane, guides de pratique et grandes cohortes en priorité, de préférence récentes.
11. Fiche de renvoi : si la liste indique « renvoi », écrire seulement l'en-tête, le titre et la phrase indiquée, sans rubriques.
12. Garde exactement les codes, l'ordre et les titres de la liste (tu peux préciser le titre entre parenthèses).

LIVRAISON
Six fiches par réponse, dans l'ordre, sans commentaire avant ni après. Commence par les fiches Pi1 à Pi6. J'écrirai « Suite » pour les suivantes.

LISTE : PIED
Pi1 Fasciite plantaire
Pi2 Hallux valgus
Pi3 Déformation des orteils latéraux ou bunionette
Pi4 Arthrose du médio-pied
Pi5 Hallux rigidus
Pi6 Métatarsalgie ou lésion de la plaque plantaire
Pi7 Névrome de Morton
Pi8 Turf toe (entorse de la 1re métatarso-phalangienne)
Pi9 Sésamoïdite ou fracture du sésamoïde
Pi10 Synostose (coalition) du tarse
Pi11 Os naviculaire accessoire douloureux
Pi12 Maladie d'Iselin
Pi13 Maladie de Sever (renvoi : « Voir la fiche Ch8. »)
Pi14 Contusion ou écrasement du pied
Pi15 Goutte de la 1re métatarso-phalangienne (podagre)
Pi16 Fracture du pied (métatarsiens, base du 5e, orteils)
Pi17 Fracture de stress métatarsienne
Pi18 Fracture de stress du naviculaire
Pi19 Fracture de stress du calcanéus
Pi20 Lésion de Lisfranc
Pi21 Pied de Charcot
Pi22 Maladie de Freiberg
```

Puis, dans la même conversation :

```text
Suite : fiches Pi7 à Pi12, même format, numérotation des références continue.
```
```text
Suite : fiches Pi13 à Pi17, même format, numérotation des références continue.
```
```text
Suite : fiches Pi18 à Pi22, même format, numérotation des références continue.
```

---

## Prompt pour Gemini (mise en page et dessins)

Joindre : le fichier `.md` d'OpenEvidence de la région et **une page d'un bloc existant comme modèle** (ex. la page 1 de « bloc5coude.pdf »).

```text
Je joins (1) le texte de fiches médicales en Markdown et (2) une page modèle d'une série de fiches déjà publiée. Produis un PDF, une page par fiche, qui reprend EXACTEMENT la mise en page, les polices, les couleurs et le style de la page modèle :
- en haut à gauche « FICHE » et le code (ex. « FICHE G1 ») ; en haut à droite la ligne d'en-tête en petites capitales (ex. « GENOU · DOULEUR ANTÉRIEURE · SURCHARGE ») ;
- le titre centré en grandes capitales ;
- au centre, une planche anatomique dans le style de la gravure médicale classique (trait fin, ton sépia, hachures), qui montre la structure atteinte et la lésion ; aucune légende inventée ;
- dessous, les 8 rubriques en grille de 2 colonnes et 4 rangées, dans cet ordre : Épidémiologie | Présentation clinique ; Examen physique | Physiopathologie ; Diagnostic différentiel | Investigations ; Traitement | Pronostic ; intertitres en petites capitales ;
- en bas, « RÉFÉRENCES » et les références de la fiche sur une ou deux lignes, séparées par « · ».
Recopie le texte mot pour mot, sans le résumer, le corriger ni le compléter, et garde les appels de références [n] à la fin de chaque rubrique. Pour une fiche de renvoi (« Voir la fiche … »), mets seulement l'en-tête, le titre, la planche et cette phrase.
```
