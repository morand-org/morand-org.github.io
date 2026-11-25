# Prompts pour ChatGPT : exercices, retour au sport, infiltrations

Point 23 de la liste de l'audit. Document : `outils/locomoteur/delegation/prompts-chatgpt-23.md` dans le dépôt.

## Mode d'emploi

1. Ouvrir **une nouvelle conversation ChatGPT pour chaque prompt** (A, B, puis C).
2. Copier **tout le bloc gris** du prompt et le coller tel quel.
3. ChatGPT livre une région (ou un groupe) à la fois, en fichier `.json`. Écrire **« suite »** pour la suivante, jusqu'à la fin de la liste.
4. M'envoyer les fichiers `.json` dans notre conversation : 9 pour A, 9 pour B, 7 pour C. Si ChatGPT n'a pas fait de fichier, copier-coller ses réponses.

Ce que j'en ferai :
- **A** devient une fiche d'exercices imprimable par diagnostic, remise au patient depuis les résultats.
- **B** ajoute un encadré « Retour au sport » dans la conduite.
- **C** devient une bibliothèque d'infiltrations reliée aux diagnostics.

Je vérifierai les références et je ferai une liste de ce qu'OpenEvidence doit confirmer, surtout les doses et les chiffres d'efficacité.

---

## Prompt A : fiches d'exercices pour le patient

```text
Tu es physiothérapeute et médecin du sport au Québec. Tu rédiges des fiches d'exercices à remettre au patient, pour chacun des diagnostics musculosquelettiques de la liste ci-dessous. Elles seront imprimées et remises en fin de consultation par un médecin de famille.

POUR CHAQUE DIAGNOSTIC
- Si une fiche d'exercices ne convient pas (urgence, fracture ou rupture à opérer, infection, tumeur, atteinte neurologique grave, maladie à traiter d'abord en rhumatologie), mets "applicable": false et donne la raison en une phrase.
- Sinon, une fiche d'une page, écrite pour le patient : vouvoiement, phrases courtes, niveau de lecture de 6e année, aucun mot médical sans explication.
- 3 à 6 exercices fondés sur les données probantes (ex. : renforcement hanche et genou pour la douleur fémoro-patellaire, charge lente et lourde pour les tendinopathies), du plus facile au plus difficile.
- Règle de douleur claire : pendant et après les exercices, une douleur jusqu'à 3 sur 10 est acceptable si elle est revenue à la normale le lendemain matin.

FORMAT JSON (un objet par diagnostic)
{
  "region": "genou",
  "id": "sfp",
  "nom": "Syndrome fémoro-patellaire",
  "applicable": true,
  "raison_si_non": "",
  "titre_patient": "Douleur à l'avant du genou (syndrome fémoro-patellaire)",
  "ce_que_vous_avez": "60 mots au plus",
  "ce_qui_aide": ["3 à 5 éléments"],
  "a_eviter_pour_l_instant": ["2 à 4 éléments"],
  "regle_de_douleur": "une phrase",
  "exercices": [
    {
      "nom": "Pont fessier",
      "position_de_depart": "…",
      "mouvement": "…",
      "dosage": "3 séries de 10, une fois par jour",
      "progression": "quand et comment rendre l'exercice plus difficile",
      "erreur_frequente": "…",
      "illustration": "description en une phrase d'un dessin au trait (pour un illustrateur)"
    }
  ],
  "duree_habituelle": "combien de temps avant l'amélioration, en semaines",
  "quand_reconsulter": ["2 à 4 signes d'alarme ou d'échec"],
  "references": [{"texte": "Auteur, revue, année", "doi_ou_pmid": "…"}]
}

RÈGLES À RESPECTER
- Français du Québec (ex. : physiothérapie, collet cervical, béquilles, botte de marche, glace).
- Ne jamais inventer. Cite seulement des références réelles, avec un DOI ou un PMID ; si tu n'es pas certain d'une donnée ou d'une référence, écris « à vérifier » au lieu de deviner.
- Pas de remplissage : seulement ce qui est utile en clinique, sans liste exhaustive.
- Garde exactement les identifiants (« region » et « id ») de la liste : ils servent à relier ta réponse à l'outil.

LIVRAISON
- Une région à la fois, dans l'ordre de la liste, en commençant par la première.
- Pour chaque région : un fichier JSON téléchargeable nommé exercices-<region>.json (un tableau d'objets, un objet par diagnostic, tous les diagnostics de la région, même ceux marqués non applicables), puis un résumé de 3 lignes.
- Si tu ne peux pas créer de fichier, affiche le JSON dans un seul bloc de code.
- Ensuite, arrête-toi et attends que j'écrive « suite » pour passer à la région suivante.

LISTE DES DIAGNOSTICS (identifiant : nom)
Rachis cervical (région « cervical ») :
- nonspec : Cervicalgie non spécifique (mécanique, posturale)
- myofascial : Syndrome myofascial (trapèze supérieur)
- facettaire : Syndrome facettaire cervical
- arthrose : Arthrose cervicale ou discopathie dégénérative
- entorse : Entorse cervicale (whiplash)
- cervicogenique : Céphalée cervicogénique
- musculaire : Contracture ou élongation musculaire du sportif
- radiculopathie : Radiculopathie cervicale
- stinger : Stinger ou burner (neurapraxie du plexus brachial)
- torticolis : Torticolis aigu acquis
- ppr : Polymyalgia rheumatica [URGENT / À NE PAS MANQUER]
- myelopathie : Myélopathie cervicale dégénérative [URGENT / À NE PAS MANQUER]
- par : Atteinte cervicale de la polyarthrite rhumatoïde (instabilité C1–C2) [URGENT / À NE PAS MANQUER]
- fracture : Fracture cervicale (odontoïde, fragilité) [URGENT / À NE PAS MANQUER]
- defile : Syndrome du défilé thoracique
- infection : Spondylodiscite cervicale ou abcès épidural [URGENT / À NE PAS MANQUER]
- arnold : Névralgie occipitale (Arnold)

Épaule (région « epaule ») :
- sous_acro : Douleur sous-acromiale (tendinopathie de la coiffe)
- myalgie : Myalgie ou douleur non spécifique
- capsulite : Capsulite adhésive
- ac_entorse : Entorse ou luxation acromio-claviculaire
- rupture : Rupture transfixiante de la coiffe
- dyskinesie : Dyskinésie scapulaire
- fracture_hp : Fracture de l'humérus proximal [URGENT / À NE PAS MANQUER]
- clavicule : Fracture de la clavicule
- omarthrose : Arthrose gléno-humérale
- calcifiante : Tendinopathie calcifiante
- instab_ant : Luxation ou instabilité antérieure
- ac_arthrose : Arthrose acromio-claviculaire ou ostéolyse distale de la clavicule
- ppr : Polymyalgia rheumatica [URGENT / À NE PAS MANQUER]
- biceps : Tendinopathie ou rupture du long biceps
- cervical : Douleur projetée d'origine cervicale
- slap : Lésion SLAP (labrum supérieur)
- instab_post : Instabilité postérieure ou multidirectionnelle

Coude (région « coude ») :
- epi_lat : Épicondylite latérale (tennis elbow)
- epi_med : Épicondylite médiale (golfer's elbow)
- lanceur : Coude du lanceur juvénile (apophysite de l'épicondyle médial)
- fracture : Fracture du coude (tête ou col radial, olécrâne, humérus distal, épicondyle médial) [URGENT / À NE PAS MANQUER]
- luxation : Luxation du coude [URGENT / À NE PAS MANQUER]
- tunnel_cubital : Syndrome du tunnel cubital (neuropathie ulnaire au coude)
- bursite : Bursite olécrânienne aseptique
- bursite_septique : Bursite olécrânienne septique [URGENT / À NE PAS MANQUER]
- arthrose : Arthrose du coude
- lcu : Lésion du ligament collatéral ulnaire (lanceur)
- biceps : Rupture distale du biceps [URGENT / À NE PAS MANQUER]
- ocd : Ostéochondrite disséquante du capitulum
- conflit_post : Conflit postérieur ou fracture de stress de l'olécrâne (lanceur)
- triceps : Tendinopathie ou rupture distale du triceps
- tunnel_radial : Syndrome du tunnel radial
- arthrite : Arthrite inflammatoire ou microcristalline du coude (goutte, chondrocalcinose, PAR)
- cervical : Douleur projetée d'origine cervicale (C6–C7)

Poignet et main (région « poignet ») :
- canal_carpien : Syndrome du canal carpien
- fx_radius : Fracture du radius distal (dont motte de beurre) [URGENT / À NE PAS MANQUER]
- scaphoide : Fracture du scaphoïde [URGENT / À NE PAS MANQUER]
- perilunaire : Luxation péri-lunaire [URGENT / À NE PAS MANQUER]
- kyste : Kyste synovial (poignet ou doigt)
- dequervain : Ténosynovite de De Quervain
- tenosynovite : Autre ténosynovite du poignet (extenseur ulnaire du carpe, intersection)
- arthrose_poignet : Arthrose du poignet (SLAC, SNAC, STT)
- tfcc : Lésion du TFCC ou instabilité radio-ulnaire distale
- scapholunaire : Lésion du ligament scapho-lunaire
- gymnaste : Poignet du gymnaste (stress de la physe radiale)
- hamatum : Fracture de l'hamulus de l'hamatum
- kienbock : Maladie de Kienböck
- guyon : Neuropathie ulnaire au canal de Guyon
- arthrose_digitale : Arthrose digitale (nodules d'Heberden et de Bouchard)
- rhizarthrose : Rhizarthrose (arthrose trapézo-métacarpienne)
- ressaut : Doigt à ressaut
- fx_main : Fracture de la main (métacarpien, phalange, Bennett)
- entorse_doigt : Entorse ou luxation interphalangienne (dont boutonnière)
- dupuytren : Maladie de Dupuytren
- lcu_pouce : Entorse du ligament collatéral ulnaire du pouce (pouce du skieur)
- maillet : Doigt en maillet
- jersey : Avulsion du fléchisseur profond (jersey finger) [URGENT / À NE PAS MANQUER]
- poulie : Lésion de poulie du grimpeur
- teno_infectieuse : Ténosynovite infectieuse des fléchisseurs [URGENT / À NE PAS MANQUER]
- par : Polyarthrite rhumatoïde (poignet et main)
- cristaux : Goutte ou chondrocalcinose (poignet ou main)
- psoriasique : Arthrite psoriasique (dactylite)
- cervical : Douleur projetée d'origine cervicale (C6–C8)

Rachis lombaire et bassin (région « lombaire ») :
- commune : Lombalgie non spécifique (mécanique)
- musculaire : Contracture ou lésion musculaire lombaire
- discogenique : Discopathie dégénérative ou douleur discogénique
- facettaire : Syndrome facettaire lombaire
- grossesse : Lombalgie ou douleur pelvienne de la grossesse
- stenose : Sténose spinale lombaire
- si : Douleur sacro-iliaque
- hernie : Hernie discale avec radiculopathie (sciatique, cruralgie)
- spondylolisthesis : Spondylolisthésis dégénératif
- fracture_osteo : Fracture vertébrale ostéoporotique (ou d'insuffisance du sacrum) [URGENT / À NE PAS MANQUER]
- spondylolyse : Spondylolyse ou spondylolisthésis isthmique
- scoliose : Scoliose dégénérative de l'adulte
- spa : Spondyloarthrite axiale
- cancer : Cancer ou métastase rachidienne [URGENT / À NE PAS MANQUER]
- infection : Spondylodiscite ou abcès épidural [URGENT / À NE PAS MANQUER]
- queue : Syndrome de la queue de cheval [URGENT / À NE PAS MANQUER]

Hanche et aine (région « hanche ») :
- coxarthrose : Coxarthrose
- sdgt : Syndrome douloureux du grand trochanter (tendinopathie glutéale)
- adducteurs : Pubalgie des adducteurs
- ij_aigu : Lésion aiguë des ischio-jambiers
- fracture : Fracture de la hanche (col ou massif trochantérien) [URGENT / À NE PAS MANQUER]
- cfa : Conflit fémoro-acétabulaire ou lésion du labrum
- psoas : Ilio-psoas ou hanche à ressaut
- piriforme : Syndrome du piriforme (fessier profond)
- meralgie : Méralgie paresthésique
- osteite : Ostéite pubienne (douleur pubienne de l'athlète)
- parietale : Pubalgie pariétale (douleur inguinale de l'athlète)
- avulsion : Avulsion apophysaire du bassin (adolescent)
- ij_tendino : Tendinopathie proximale des ischio-jambiers
- epiphysiolyse : Épiphysiolyse fémorale supérieure [URGENT / À NE PAS MANQUER]
- ff_col : Fracture de stress du col ou de la diaphyse fémorale [URGENT / À NE PAS MANQUER]
- osteonecrose : Ostéonécrose de la tête fémorale [URGENT / À NE PAS MANQUER]
- apophysite : Apophysite de la crête iliaque
- contusion : Contusion de la cuisse ou de la crête iliaque
- bassin : Fracture de fragilité du bassin ou du sacrum [URGENT / À NE PAS MANQUER]
- lombaire : Douleur projetée d'origine lombaire
- ppr : Polymyalgia rheumatica [URGENT / À NE PAS MANQUER]

Genou (région « genou ») :
- sfp : Syndrome fémoro-patellaire
- arthrose : Arthrose du genou
- menisque : Déchirure méniscale
- lca : Rupture du LCA
- lcp : Entorse du LCP
- collat : Entorse d'un ligament collatéral (LLI, LLE)
- rotule : Instabilité ou luxation de la rotule
- tendino : Tendinopathie rotulienne ou quadricipitale
- hoffa : Syndrome du coussinet adipeux (Hoffa)
- bit : Syndrome de la bandelette ilio-tibiale
- bprep : Bursite prépatellaire
- poie : Tendinobursite de la patte d'oie
- osgood : Maladie d'Osgood-Schlatter
- slj : Maladie de Sinding-Larsen-Johansson
- contusion : Contusion ou entorse légère, sans lésion structurelle
- plica : Syndrome de la plica
- ocd : Ostéochondrite disséquante
- discoide : Ménisque discoïde
- cristaux : Goutte ou chondrocalcinose (arthrite microcristalline)
- arthrite : Arthrite inflammatoire (PAR, spondylarthrite, psoriasique)
- septique : Arthrite septique [URGENT / À NE PAS MANQUER]
- baker : Kyste poplité (de Baker)
- insuff : Fracture sous-chondrale d'insuffisance

Cheville et jambe (région « cheville ») :
- entorse_lat : Entorse latérale de la cheville
- instab : Instabilité chronique de la cheville
- achille : Tendinopathie d'Achille corporéale
- insertion : Tendinopathie d'insertion, Haglund ou bursite rétro-calcanéenne
- rupture_achille : Rupture du tendon d'Achille [URGENT / À NE PAS MANQUER]
- fracture : Fracture de la cheville ou du médio-pied [URGENT / À NE PAS MANQUER]
- periostite : Périostite tibiale (syndrome de stress tibial médial)
- ff_tibia : Fracture de stress du tibia ou de la fibula
- loge : Syndrome compartimental chronique d'effort
- mollet : Lésion musculaire du mollet (tennis leg)
- sever : Maladie de Sever (apophysite calcanéenne)
- tibpost : Dysfonction du tibial postérieur
- arthrose : Arthrose de la cheville
- syndesmose : Entorse de la syndesmose (entorse haute)
- deltoide : Entorse médiale (ligament deltoïde) ou fracture de Maisonneuve
- fibulaires : Tendinopathie, déchirure ou luxation des fibulaires
- conflit : Conflit antérieur ou postérieur de la cheville
- lot : Lésion ostéochondrale du talus
- tarsien : Syndrome du tunnel tarsien
- cristaux : Goutte ou arthrite à pyrophosphate de la cheville
- insuff : Fracture d'insuffisance (tibia distal, fibula, calcanéus)

Pied (région « pied ») :
- fasciite : Fasciite plantaire (talalgie plantaire)
- hallux_valgus : Hallux valgus
- orteils : Déformation des orteils latéraux ou bunionette
- arthrose_mp : Arthrose du médio-pied
- hallux_rigidus : Hallux rigidus
- metatarsalgie : Métatarsalgie ou lésion de la plaque plantaire
- goutte : Goutte de la 1ʳᵉ métatarso-phalangienne (podagre)
- fracture : Fracture du pied (métatarsiens, base du 5ᵉ, orteils) [URGENT / À NE PAS MANQUER]
- morton : Névrome de Morton
- ff_mt : Fracture de stress métatarsienne (ou d'insuffisance)
- ff_navic : Fracture de stress du naviculaire [URGENT / À NE PAS MANQUER]
- ff_calc : Fracture de stress du calcanéus
- lisfranc : Lésion de Lisfranc (entorse ou fracture du médio-pied) [URGENT / À NE PAS MANQUER]
- turf_toe : Turf toe (entorse de la plaque plantaire de l'hallux)
- sesamoide : Sésamoïdite ou fracture du sésamoïde
- charcot : Pied de Charcot (neuro-ostéoarthropathie) [URGENT / À NE PAS MANQUER]
- synostose : Synostose (coalition) du tarse
- os_navic : Os naviculaire accessoire douloureux
- freiberg : Maladie de Freiberg
- iselin : Maladie d'Iselin (apophysite de la base du 5ᵉ métatarsien)
- sever : Maladie de Sever (apophysite calcanéenne)
- contusion : Contusion ou écrasement du pied
```

---

## Prompt B : critères de retour au sport et au travail

```text
Tu es médecin du sport au Québec. Pour chacun des diagnostics musculosquelettiques de la liste ci-dessous, tu rédiges les critères de retour au sport et au travail. Ils seront affichés dans un outil d'aide à la décision utilisé par des médecins de famille pendant la consultation.

POUR CHAQUE DIAGNOSTIC
- Si le retour au sport n'est pas pertinent ou dépend entièrement du spécialiste (urgence, chirurgie, infection, tumeur, maladie inflammatoire), mets "applicable": false et donne la raison en une phrase.
- Sinon, un retour fondé sur des critères mesurables plutôt que sur le seul délai. Donne des tests simples faisables au bureau sans équipement spécialisé (ex. : saut unipodal, montée sur la pointe du pied 25 fois, indice de symétrie d'au moins 90 %).
- Distingue les sports à impact ou à pivot des sports sans impact quand c'est utile.

FORMAT JSON (un objet par diagnostic)
{
  "region": "genou",
  "id": "lca",
  "nom": "Rupture du LCA",
  "applicable": true,
  "raison_si_non": "",
  "delai_habituel": "fourchette selon la gravité ou le traitement (ex. : grade I, II, III ; opéré ou non)",
  "phases": [
    {"phase": "1. Protection", "objectifs": "…", "criteres_pour_passer_a_la_suivante": ["…"]}
  ],
  "criteres_de_retour_au_sport": ["critères objectifs et chiffrés"],
  "tests_au_bureau": ["test, comment le faire, seuil à atteindre"],
  "retour_au_travail": "travail sédentaire et travail physique",
  "recidive_et_prevention": "risque chiffré si connu ; programme de prévention reconnu (ex. : FIFA 11+)",
  "signaux_d_arret": ["signes qui imposent de cesser et de consulter"],
  "references": [{"texte": "Auteur, revue, année", "doi_ou_pmid": "…"}]
}

RÈGLES À RESPECTER
- Français du Québec (ex. : physiothérapie, collet cervical, béquilles, botte de marche, glace).
- Ne jamais inventer. Cite seulement des références réelles, avec un DOI ou un PMID ; si tu n'es pas certain d'une donnée ou d'une référence, écris « à vérifier » au lieu de deviner.
- Pas de remplissage : seulement ce qui est utile en clinique, sans liste exhaustive.
- Garde exactement les identifiants (« region » et « id ») de la liste : ils servent à relier ta réponse à l'outil.

LIVRAISON
- Une région à la fois, dans l'ordre de la liste, en commençant par la première.
- Pour chaque région : un fichier JSON téléchargeable nommé retour-sport-<region>.json (un tableau d'objets, un objet par diagnostic, tous les diagnostics de la région, même ceux marqués non applicables), puis un résumé de 3 lignes.
- Si tu ne peux pas créer de fichier, affiche le JSON dans un seul bloc de code.
- Ensuite, arrête-toi et attends que j'écrive « suite » pour passer à la région suivante.

LISTE DES DIAGNOSTICS (identifiant : nom)
Rachis cervical (région « cervical ») :
- nonspec : Cervicalgie non spécifique (mécanique, posturale)
- myofascial : Syndrome myofascial (trapèze supérieur)
- facettaire : Syndrome facettaire cervical
- arthrose : Arthrose cervicale ou discopathie dégénérative
- entorse : Entorse cervicale (whiplash)
- cervicogenique : Céphalée cervicogénique
- musculaire : Contracture ou élongation musculaire du sportif
- radiculopathie : Radiculopathie cervicale
- stinger : Stinger ou burner (neurapraxie du plexus brachial)
- torticolis : Torticolis aigu acquis
- ppr : Polymyalgia rheumatica [URGENT / À NE PAS MANQUER]
- myelopathie : Myélopathie cervicale dégénérative [URGENT / À NE PAS MANQUER]
- par : Atteinte cervicale de la polyarthrite rhumatoïde (instabilité C1–C2) [URGENT / À NE PAS MANQUER]
- fracture : Fracture cervicale (odontoïde, fragilité) [URGENT / À NE PAS MANQUER]
- defile : Syndrome du défilé thoracique
- infection : Spondylodiscite cervicale ou abcès épidural [URGENT / À NE PAS MANQUER]
- arnold : Névralgie occipitale (Arnold)

Épaule (région « epaule ») :
- sous_acro : Douleur sous-acromiale (tendinopathie de la coiffe)
- myalgie : Myalgie ou douleur non spécifique
- capsulite : Capsulite adhésive
- ac_entorse : Entorse ou luxation acromio-claviculaire
- rupture : Rupture transfixiante de la coiffe
- dyskinesie : Dyskinésie scapulaire
- fracture_hp : Fracture de l'humérus proximal [URGENT / À NE PAS MANQUER]
- clavicule : Fracture de la clavicule
- omarthrose : Arthrose gléno-humérale
- calcifiante : Tendinopathie calcifiante
- instab_ant : Luxation ou instabilité antérieure
- ac_arthrose : Arthrose acromio-claviculaire ou ostéolyse distale de la clavicule
- ppr : Polymyalgia rheumatica [URGENT / À NE PAS MANQUER]
- biceps : Tendinopathie ou rupture du long biceps
- cervical : Douleur projetée d'origine cervicale
- slap : Lésion SLAP (labrum supérieur)
- instab_post : Instabilité postérieure ou multidirectionnelle

Coude (région « coude ») :
- epi_lat : Épicondylite latérale (tennis elbow)
- epi_med : Épicondylite médiale (golfer's elbow)
- lanceur : Coude du lanceur juvénile (apophysite de l'épicondyle médial)
- fracture : Fracture du coude (tête ou col radial, olécrâne, humérus distal, épicondyle médial) [URGENT / À NE PAS MANQUER]
- luxation : Luxation du coude [URGENT / À NE PAS MANQUER]
- tunnel_cubital : Syndrome du tunnel cubital (neuropathie ulnaire au coude)
- bursite : Bursite olécrânienne aseptique
- bursite_septique : Bursite olécrânienne septique [URGENT / À NE PAS MANQUER]
- arthrose : Arthrose du coude
- lcu : Lésion du ligament collatéral ulnaire (lanceur)
- biceps : Rupture distale du biceps [URGENT / À NE PAS MANQUER]
- ocd : Ostéochondrite disséquante du capitulum
- conflit_post : Conflit postérieur ou fracture de stress de l'olécrâne (lanceur)
- triceps : Tendinopathie ou rupture distale du triceps
- tunnel_radial : Syndrome du tunnel radial
- arthrite : Arthrite inflammatoire ou microcristalline du coude (goutte, chondrocalcinose, PAR)
- cervical : Douleur projetée d'origine cervicale (C6–C7)

Poignet et main (région « poignet ») :
- canal_carpien : Syndrome du canal carpien
- fx_radius : Fracture du radius distal (dont motte de beurre) [URGENT / À NE PAS MANQUER]
- scaphoide : Fracture du scaphoïde [URGENT / À NE PAS MANQUER]
- perilunaire : Luxation péri-lunaire [URGENT / À NE PAS MANQUER]
- kyste : Kyste synovial (poignet ou doigt)
- dequervain : Ténosynovite de De Quervain
- tenosynovite : Autre ténosynovite du poignet (extenseur ulnaire du carpe, intersection)
- arthrose_poignet : Arthrose du poignet (SLAC, SNAC, STT)
- tfcc : Lésion du TFCC ou instabilité radio-ulnaire distale
- scapholunaire : Lésion du ligament scapho-lunaire
- gymnaste : Poignet du gymnaste (stress de la physe radiale)
- hamatum : Fracture de l'hamulus de l'hamatum
- kienbock : Maladie de Kienböck
- guyon : Neuropathie ulnaire au canal de Guyon
- arthrose_digitale : Arthrose digitale (nodules d'Heberden et de Bouchard)
- rhizarthrose : Rhizarthrose (arthrose trapézo-métacarpienne)
- ressaut : Doigt à ressaut
- fx_main : Fracture de la main (métacarpien, phalange, Bennett)
- entorse_doigt : Entorse ou luxation interphalangienne (dont boutonnière)
- dupuytren : Maladie de Dupuytren
- lcu_pouce : Entorse du ligament collatéral ulnaire du pouce (pouce du skieur)
- maillet : Doigt en maillet
- jersey : Avulsion du fléchisseur profond (jersey finger) [URGENT / À NE PAS MANQUER]
- poulie : Lésion de poulie du grimpeur
- teno_infectieuse : Ténosynovite infectieuse des fléchisseurs [URGENT / À NE PAS MANQUER]
- par : Polyarthrite rhumatoïde (poignet et main)
- cristaux : Goutte ou chondrocalcinose (poignet ou main)
- psoriasique : Arthrite psoriasique (dactylite)
- cervical : Douleur projetée d'origine cervicale (C6–C8)

Rachis lombaire et bassin (région « lombaire ») :
- commune : Lombalgie non spécifique (mécanique)
- musculaire : Contracture ou lésion musculaire lombaire
- discogenique : Discopathie dégénérative ou douleur discogénique
- facettaire : Syndrome facettaire lombaire
- grossesse : Lombalgie ou douleur pelvienne de la grossesse
- stenose : Sténose spinale lombaire
- si : Douleur sacro-iliaque
- hernie : Hernie discale avec radiculopathie (sciatique, cruralgie)
- spondylolisthesis : Spondylolisthésis dégénératif
- fracture_osteo : Fracture vertébrale ostéoporotique (ou d'insuffisance du sacrum) [URGENT / À NE PAS MANQUER]
- spondylolyse : Spondylolyse ou spondylolisthésis isthmique
- scoliose : Scoliose dégénérative de l'adulte
- spa : Spondyloarthrite axiale
- cancer : Cancer ou métastase rachidienne [URGENT / À NE PAS MANQUER]
- infection : Spondylodiscite ou abcès épidural [URGENT / À NE PAS MANQUER]
- queue : Syndrome de la queue de cheval [URGENT / À NE PAS MANQUER]

Hanche et aine (région « hanche ») :
- coxarthrose : Coxarthrose
- sdgt : Syndrome douloureux du grand trochanter (tendinopathie glutéale)
- adducteurs : Pubalgie des adducteurs
- ij_aigu : Lésion aiguë des ischio-jambiers
- fracture : Fracture de la hanche (col ou massif trochantérien) [URGENT / À NE PAS MANQUER]
- cfa : Conflit fémoro-acétabulaire ou lésion du labrum
- psoas : Ilio-psoas ou hanche à ressaut
- piriforme : Syndrome du piriforme (fessier profond)
- meralgie : Méralgie paresthésique
- osteite : Ostéite pubienne (douleur pubienne de l'athlète)
- parietale : Pubalgie pariétale (douleur inguinale de l'athlète)
- avulsion : Avulsion apophysaire du bassin (adolescent)
- ij_tendino : Tendinopathie proximale des ischio-jambiers
- epiphysiolyse : Épiphysiolyse fémorale supérieure [URGENT / À NE PAS MANQUER]
- ff_col : Fracture de stress du col ou de la diaphyse fémorale [URGENT / À NE PAS MANQUER]
- osteonecrose : Ostéonécrose de la tête fémorale [URGENT / À NE PAS MANQUER]
- apophysite : Apophysite de la crête iliaque
- contusion : Contusion de la cuisse ou de la crête iliaque
- bassin : Fracture de fragilité du bassin ou du sacrum [URGENT / À NE PAS MANQUER]
- lombaire : Douleur projetée d'origine lombaire
- ppr : Polymyalgia rheumatica [URGENT / À NE PAS MANQUER]

Genou (région « genou ») :
- sfp : Syndrome fémoro-patellaire
- arthrose : Arthrose du genou
- menisque : Déchirure méniscale
- lca : Rupture du LCA
- lcp : Entorse du LCP
- collat : Entorse d'un ligament collatéral (LLI, LLE)
- rotule : Instabilité ou luxation de la rotule
- tendino : Tendinopathie rotulienne ou quadricipitale
- hoffa : Syndrome du coussinet adipeux (Hoffa)
- bit : Syndrome de la bandelette ilio-tibiale
- bprep : Bursite prépatellaire
- poie : Tendinobursite de la patte d'oie
- osgood : Maladie d'Osgood-Schlatter
- slj : Maladie de Sinding-Larsen-Johansson
- contusion : Contusion ou entorse légère, sans lésion structurelle
- plica : Syndrome de la plica
- ocd : Ostéochondrite disséquante
- discoide : Ménisque discoïde
- cristaux : Goutte ou chondrocalcinose (arthrite microcristalline)
- arthrite : Arthrite inflammatoire (PAR, spondylarthrite, psoriasique)
- septique : Arthrite septique [URGENT / À NE PAS MANQUER]
- baker : Kyste poplité (de Baker)
- insuff : Fracture sous-chondrale d'insuffisance

Cheville et jambe (région « cheville ») :
- entorse_lat : Entorse latérale de la cheville
- instab : Instabilité chronique de la cheville
- achille : Tendinopathie d'Achille corporéale
- insertion : Tendinopathie d'insertion, Haglund ou bursite rétro-calcanéenne
- rupture_achille : Rupture du tendon d'Achille [URGENT / À NE PAS MANQUER]
- fracture : Fracture de la cheville ou du médio-pied [URGENT / À NE PAS MANQUER]
- periostite : Périostite tibiale (syndrome de stress tibial médial)
- ff_tibia : Fracture de stress du tibia ou de la fibula
- loge : Syndrome compartimental chronique d'effort
- mollet : Lésion musculaire du mollet (tennis leg)
- sever : Maladie de Sever (apophysite calcanéenne)
- tibpost : Dysfonction du tibial postérieur
- arthrose : Arthrose de la cheville
- syndesmose : Entorse de la syndesmose (entorse haute)
- deltoide : Entorse médiale (ligament deltoïde) ou fracture de Maisonneuve
- fibulaires : Tendinopathie, déchirure ou luxation des fibulaires
- conflit : Conflit antérieur ou postérieur de la cheville
- lot : Lésion ostéochondrale du talus
- tarsien : Syndrome du tunnel tarsien
- cristaux : Goutte ou arthrite à pyrophosphate de la cheville
- insuff : Fracture d'insuffisance (tibia distal, fibula, calcanéus)

Pied (région « pied ») :
- fasciite : Fasciite plantaire (talalgie plantaire)
- hallux_valgus : Hallux valgus
- orteils : Déformation des orteils latéraux ou bunionette
- arthrose_mp : Arthrose du médio-pied
- hallux_rigidus : Hallux rigidus
- metatarsalgie : Métatarsalgie ou lésion de la plaque plantaire
- goutte : Goutte de la 1ʳᵉ métatarso-phalangienne (podagre)
- fracture : Fracture du pied (métatarsiens, base du 5ᵉ, orteils) [URGENT / À NE PAS MANQUER]
- morton : Névrome de Morton
- ff_mt : Fracture de stress métatarsienne (ou d'insuffisance)
- ff_navic : Fracture de stress du naviculaire [URGENT / À NE PAS MANQUER]
- ff_calc : Fracture de stress du calcanéus
- lisfranc : Lésion de Lisfranc (entorse ou fracture du médio-pied) [URGENT / À NE PAS MANQUER]
- turf_toe : Turf toe (entorse de la plaque plantaire de l'hallux)
- sesamoide : Sésamoïdite ou fracture du sésamoïde
- charcot : Pied de Charcot (neuro-ostéoarthropathie) [URGENT / À NE PAS MANQUER]
- synostose : Synostose (coalition) du tarse
- os_navic : Os naviculaire accessoire douloureux
- freiberg : Maladie de Freiberg
- iselin : Maladie d'Iselin (apophysite de la base du 5ᵉ métatarsien)
- sever : Maladie de Sever (apophysite calcanéenne)
- contusion : Contusion ou écrasement du pied
```

---

## Prompt C : bibliothèque d'infiltrations et de ponctions

```text
Tu es médecin de famille et médecin du sport au Canada, et tu enseignes les infiltrations musculosquelettiques en première ligne. Tu rédiges une bibliothèque des infiltrations et des ponctions de la liste ci-dessous, pour des médecins de famille du Québec.

POUR CHAQUE INTERVENTION
- Médicaments et doses offerts au Canada, chez l'adulte, avec les noms commerciaux canadiens (ex. : méthylprednisolone acétate (Depo-Medrol), triamcinolone acétonide (Kenalog), lidocaïne 1 % ou 2 % sans épinéphrine).
- Technique à l'aveugle avec repères anatomiques ; dis si l'échoguidage est requis, recommandé ou facultatif, et pourquoi (précision chiffrée si connue).
- Preuve d'efficacité chiffrée et honnête : durée du soulagement, comparaison au placebo ou à la physiothérapie. Dis clairement quand l'infiltration est déconseillée.

FORMAT JSON (un objet par intervention)
{
  "id": "inf_sous_acromiale",
  "nom": "Infiltration sous-acromiale",
  "diagnostics_lies": ["epaule:sous_acro"],
  "indications": ["…"],
  "contre_indications_absolues": ["…"],
  "contre_indications_relatives": ["…"],
  "efficacite": "2 à 3 phrases chiffrées",
  "medicament_et_dose": "produit, dose, volume total, mélange avec l'anesthésique",
  "materiel": ["calibre et longueur de l'aiguille", "seringue", "…"],
  "position_et_reperes": "…",
  "technique_pas_a_pas": ["1. …", "2. …"],
  "echoguidage": "requis, recommandé ou facultatif, et pourquoi",
  "apres_l_intervention": ["repos relatif, glace, quoi surveiller"],
  "complications_a_expliquer_au_patient": ["avec fréquence si connue"],
  "frequence_maximale": "nombre par année et intervalle minimal",
  "particularites": "diabète (hausse de la glycémie), anticoagulants, grossesse, prothèse, infection",
  "references": [{"texte": "Auteur, revue, année", "doi_ou_pmid": "…"}]
}

RÈGLES À RESPECTER
- Français du Québec (ex. : physiothérapie, collet cervical, béquilles, botte de marche, glace).
- Ne jamais inventer. Cite seulement des références réelles, avec un DOI ou un PMID ; si tu n'es pas certain d'une donnée ou d'une référence, écris « à vérifier » au lieu de deviner.
- Pas de remplissage : seulement ce qui est utile en clinique, sans liste exhaustive.
- Garde exactement les identifiants (« region » et « id ») de la liste : ils servent à relier ta réponse à l'outil.

LIVRAISON
- Un groupe à la fois (Épaule, puis Coude, Poignet et main, Hanche, Genou, Cheville et pied, Rachis).
- Pour chaque groupe : un fichier JSON téléchargeable nommé infiltrations-<groupe>.json, puis un résumé de 3 lignes.
- Si tu ne peux pas créer de fichier, affiche le JSON dans un seul bloc de code.
- Ensuite, arrête-toi et attends que j'écrive « suite » pour passer au groupe suivant.

LISTE DES INTERVENTIONS (identifiant : nom ; diagnostics de l'outil qui s'y rattachent)
Épaule :
- inf_sous_acromiale : infiltration sous-acromiale (liens : epaule:sous_acro, epaule:calcifiante)
- inf_gleno_humerale : infiltration gléno-humérale, voie postérieure (liens : epaule:capsulite, epaule:omarthrose)
- inf_acromio_claviculaire : infiltration acromio-claviculaire (liens : epaule:ac_arthrose)
Coude :
- inf_epicondyle_lateral : infiltration de l'épicondyle latéral, en précisant quand l'éviter (liens : coude:epi_lat)
- asp_bursite_olecranienne : ponction de la bourse olécrânienne (liens : coude:bursite, coude:bursite_septique)
Poignet et main :
- inf_canal_carpien : infiltration du canal carpien (liens : poignet:canal_carpien)
- inf_de_quervain : infiltration du premier compartiment des extenseurs (liens : poignet:dequervain)
- inf_doigt_ressaut : infiltration de la poulie A1 (liens : poignet:ressaut)
- inf_rhizarthrose : infiltration trapézo-métacarpienne (liens : poignet:rhizarthrose)
- asp_kyste_synovial : ponction d'un kyste synovial du poignet (liens : poignet:kyste)
Hanche :
- inf_grand_trochanter : infiltration péritrochantérienne (liens : hanche:sdgt)
Genou :
- inf_genou : ponction et infiltration intra-articulaire du genou (liens : genou:arthrose, genou:cristaux, genou:arthrite)
- asp_bursite_prepatellaire : ponction de la bourse prépatellaire (liens : genou:bprep)
- inf_patte_oie : infiltration de la bourse de la patte d'oie (liens : genou:poie)
Cheville et pied :
- inf_cheville : infiltration tibio-talienne (liens : cheville:arthrose, cheville:cristaux)
- inf_fasciite_plantaire : infiltration de l'aponévrose plantaire, en précisant les risques (liens : pied:fasciite)
- inf_nevrome_morton : infiltration d'un névrome de Morton (liens : pied:morton)
Rachis :
- inf_points_gachettes : infiltration ou puncture sèche des points gâchettes (liens : cervical:myofascial)
- bloc_grand_occipital : bloc du nerf grand occipital (liens : cervical:arnold, cervical:cervicogenique)
```
