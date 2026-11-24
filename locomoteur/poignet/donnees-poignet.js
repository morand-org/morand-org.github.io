/* Locomoteur Morand, poignet et main (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), parties A à H
   (sections « Poignet » et « Main »). L'outil vise les 12 ans et plus : les fractures de l'enfant n'y sont pas détaillées.
   « Douleur non spécifique » : reste calculé (fiches « entorse / douleur non spécifique » du poignet et de la main).
   Format : p() provisoire, est() à vérifier, ver()/verRv() vérifié avec sa source. « † » du document : statut « à vérifier ». */
(function () {
  "use strict";
  const { p, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), TEST = "test";
  const DARCY = "D'Arcy et McGee, 2000, JAMA (examen clinique rationnel, canal carpien)", DABBAGH = "Dabbagh et coll., 2023, Phys Ther (méta-analyse des manœuvres, canal carpien)";
  const CTS6 = "Alvarez et Brown, 2024, AFP ; CTS-6 de Graham (score ≥ 12 : Se 89 %, Sp 80 %)", CARPENTER = "Carpenter et Raja, Occult Scaphoid Fractures (chapitre 16)";
  const SUH = "Suh et Grewal, 2018, J Hand Surg Eur (scaphoïde, examen à moins de 24 h)", COVENTRY = "Coventry et coll., 2023, EMJ (fracture occulte du scaphoïde, étude unique)";
  const EYLER = "Eyler et coll., 2018, Am J Emerg Med (fracture du poignet, n = 207)", AMSTERDAM = "Walenkamp et coll., 2015, BMC Musculoskelet Disord (règles d'Amsterdam, n = 395)";
  const TAY = "Tay et coll., 2007, J Hand Surg (ulnar fovea sign, n = 272)", OUYANG = "Ou Yang et coll., 2021, ANZ J Surg (prospectif, n = 110)";
  const GOUBAU = "Goubau et coll., 2014, J Hand Surg Eur (WHAT test, n = 100)", GELBERMAN = "Gelberman et coll., 2015, J Hand Surg (rhizarthrose, n = 129)", SELA = "Sela et coll., 2019, J Hand Ther (pressure-shear)";
  const RASHIDI = "Rashidi et coll., 2021, Eur Radiol (méta-analyse, ligament collatéral ulnaire du pouce)", COATES = "Coates et coll., 2012, Arthritis Rheum (CASPAR, arthrite psoriasique précoce)";
  const SQUEEZE = "van den Bosch et coll., 2015, Ann Rheum Dis (squeeze test)", WATSON = "Test de Watson (scaphoid shift) : Se 69 %, Sp 66 %";
  const CTS = [["paresthesies_median", 3.5], ["paresthesies_nocturnes", 4], ["atrophie_thenar", 5], ["phalen", 5], ["tinel_carpien", 4], ["hypo_median", 4.5]];
  const CTS_IDS = CTS.map(x => x[0]), ctsScore = L => CTS.reduce((s, [id, pts]) => s + (L.oui(id) ? pts : 0), 0);
  const SCAPH = ["p_tabatiere", "p_tubercule_scaph", "compression_pouce"];

  const ANGLAIS = { canal_carpien: "carpal tunnel syndrome", fx_radius: "distal radius fracture (including buckle fracture)", scaphoide: "scaphoid fracture", perilunaire: "perilunate dislocation",
    kyste: "ganglion cyst", dequervain: "De Quervain tenosynovitis", tenosynovite: "other wrist tenosynovitis (extensor carpi ulnaris, intersection syndrome)", arthrose_poignet: "wrist osteoarthritis (SLAC, SNAC, STT)",
    tfcc: "triangular fibrocartilage complex tear or distal radioulnar instability", scapholunaire: "scapholunate ligament injury", gymnaste: "gymnast wrist (distal radial physeal stress injury)",
    hamatum: "hook of hamate fracture", kienbock: "Kienböck disease", guyon: "ulnar neuropathy at Guyon canal", arthrose_digitale: "hand osteoarthritis (Heberden and Bouchard nodes)",
    rhizarthrose: "thumb carpometacarpal osteoarthritis", ressaut: "trigger finger", fx_main: "hand fracture (metacarpal, phalanx, Bennett)", entorse_doigt: "finger PIP sprain or dislocation (including boutonnière)",
    dupuytren: "Dupuytren disease", lcu_pouce: "thumb ulnar collateral ligament injury (skier's thumb)", maillet: "mallet finger", jersey: "jersey finger (flexor digitorum profundus avulsion)",
    poulie: "climber's pulley injury", teno_infectieuse: "pyogenic flexor tenosynovitis", par: "rheumatoid arthritis of the wrist and hand", cristaux: "gout or calcium pyrophosphate arthritis of the wrist or hand",
    psoriasique: "psoriatic arthritis (dactylitis)", cervical: "cervical radiculopathy referred to the hand" };

  const CONDUITES = C.aideMemoire("poignet", { canal_carpien: 1, fx_radius: [2, 21], scaphoide: 9, perilunaire: 20, kyste: [4, "main:16"], dequervain: 5, tenosynovite: [6, 14, 15], arthrose_poignet: 7,
    tfcc: [8, 19], scapholunaire: 10, gymnaste: 12, hamatum: 16, kienbock: 17, guyon: 18, arthrose_digitale: "main:1", rhizarthrose: "main:2", ressaut: "main:3", fx_main: ["main:4", "main:6", "main:17", "main:19"],
    entorse_doigt: ["main:5", "main:18"], dupuytren: "main:7", lcu_pouce: "main:10", maillet: "main:12", jersey: "main:15", poulie: "main:14", teno_infectieuse: "main:20", par: [11, "main:11"],
    cristaux: [13, "main:9"], psoriasique: "main:13" });
  const items = ref => C.aideMemoire("poignet", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("main"),
    { titre: "Pour tous", items: [{ t: "Enseignement : garder la main au-dessus du cœur et bouger les doigts sous une attelle ; une raideur des doigts s'installe vite" },
      { t: "Consignes de reconsultation : doigts froids, bleus ou engourdis, douleur croissante sous le plâtre, rougeur qui s'étend, fièvre" }] }];

  const INFOS = {
    phalen: { info: "Flexion maximale des deux poignets 60 secondes. Canal carpien : Se 57 %, Sp 67 % (RV+ 1,7) : peu utile seul ; compte dans le CTS-6.", positif: "paresthésies dans le territoire médian", video: "Phalen test" },
    tinel_carpien: { info: "Percussion du nerf médian au pli du poignet. Canal carpien : Se 45 %, Sp 78 % (RV+ 2,0) ; compte dans le CTS-6.", video: "Tinel sign carpal tunnel" },
    durkan: { info: "Pression du pouce sur le canal carpien 30 secondes. Canal carpien : Se 64 %, Sp 83 % (RV+ 3,8, calculé).", video: "Durkan test" },
    paresthesies_median: { info: "Schéma de Katz classique ou probable (pouce, index, majeur, sans la paume) : RV+ 2,4 ; schéma improbable : RV 0,2. Compte dans le CTS-6 (3,5 points)." },
    atrophie_thenar: { info: "Atrophie ou faiblesse thénarienne : Se 5,5–22 %, Sp 96–100 % (RV+ ≥ 4,5) : atteinte sévère. Compte dans le CTS-6 (5 points)." },
    hypo_median: { info: "Hypoalgésie ou perte de la discrimination de deux points dans le territoire médian : RV+ 3,1. Compte dans le CTS-6 (4,5 points). CTS-6 complet : score ≥ 12, RV+ 4,5 ; < 12, RV− 0,14." },
    p_tabatiere: { info: "Tabatière anatomique douloureuse : fracture du scaphoïde, Se 96 %, Sp 39 % : indolore, elle l'éloigne (RV− 0,15). Tabatière, tubercule et compression axiale tous indolores dans les 24 h : Se 100 %.", video: "Anatomical snuffbox palpation" },
    compression_pouce: { info: "Compression axiale du pouce : fracture du scaphoïde, Se 82 %, Sp 58 % (RV+ 2,0 ; RV− 0,24).", video: "Scaphoid compression test" },
    pronosup_res: { info: "Prono-supination résistée douloureuse : fracture occulte du scaphoïde, Se 100 %, Sp 97,9 % dans une seule étude (RV+ 45) : à confirmer." },
    finkelstein: { info: "Le patient fléchit le pouce dans la paume, l'examinateur incline le poignet vers l'ulnaire. De Quervain : Sp 100 % sur 72 poignets, sensibilité incertaine.", positif: "douleur à la styloïde radiale", video: "Finkelstein test" },
    what_test: { info: "WHAT test : poignet en hyperflexion, abduction résistée du pouce. De Quervain : Se 99 % : négatif, il l'exclut (RV− 0,03).", positif: "douleur au premier compartiment", video: "WHAT test De Quervain" },
    fovea: { info: "Sensibilité de la fovéa ulnaire, entre le styloïde ulnaire et le fléchisseur ulnaire du carpe. TFCC ou ligament ulno-triquétral : RV+ 7,1 dans l'étude d'origine (Tay), 1,7 dans une étude prospective : à vérifier.", video: "Ulnar fovea sign" },
    watson: { info: "Pouce de l'examinateur sur le tubercule du scaphoïde pendant l'inclinaison radiale : ressaut douloureux. Lésion scapho-lunaire : Se 69 %, Sp 66 % (RV+ 2,0).", video: "Watson scaphoid shift test" },
    ballottement_druj: { info: "Translation dorso-palmaire de l'ulna distal par rapport au radius, comparée à l'autre côté : instabilité radio-ulnaire distale, Se 59 %, Sp 96 %." },
    pressure_shear: { info: "Compression de la trapézo-métacarpienne avec un mouvement de cisaillement. Rhizarthrose : Se 99 %, Sp 95 % (RV+ 19,8 ; RV− 0,01, calculés).", video: "Pressure shear test thumb CMC" },
    grind: { info: "Compression axiale du 1ᵉʳ métacarpien avec rotation. Rhizarthrose : Se 44 %, Sp 92 % (RV+ 5,5) : positif, il oriente ; négatif, il n'exclut pas.", video: "CMC grind test" },
    valgus_pouce: { info: "Radiographie d'abord (avulsion). Stress en valgus de la métacarpo-phalangienne du pouce en extension et à 30° de flexion : laxité > 30° ou > 15–20° de plus que l'autre côté sans arrêt franc = rupture (Se 97 %, Sp 85 %).", video: "Thumb ulnar collateral ligament stress test" },
    squeeze_mcp: { info: "Compression latérale des 2ᵉ à 5ᵉ métacarpo-phalangiennes : arthrite (au moins une articulation gonflée), RV+ 3,0 ; RV− 0,6." },
    ex_dactylite: { info: "Doigt « en saucisse » : arthrite psoriasique précoce, Se 28 %, Sp 99 % (CASPAR). Exclure infection et goutte." },
    kanavel: { info: "Signes de Kanavel : enflure fusiforme, doigt tenu en flexion, douleur à l'extension passive, sensibilité le long de la gaine. Tous présents chez seulement 22 cas sur 41 : un seul signe avec une plaie suffit à consulter en urgence." },
  };

  window.Locomoteur.definir({
    id: "poignet", partie: "poignet", partieExamen: "poignet et main", en: "wrist or hand", rc: "Douleur au poignet ou à la main",
    titre: "Douleur au poignet ou à la main", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.poignet || {}).sources,

    diagnostics: [
      { id: "canal_carpien", nom: "Syndrome du canal carpien", n: "syndrome du canal carpien", base: [[12, .01], [30, .08], [50, .15], [70, .12]], sexe: { F: 1.5, M: .6 },
        repere: "88 (hommes) et 193 (femmes)/100 000/an en médecine générale (A)" },
      { id: "fx_radius", grave: true, nom: "Fracture du radius distal (dont motte de beurre)", n: "fracture du radius distal", base: [[12, .06], [18, .03], [40, .02], [65, .05], [85, .07]], sexe: { F: 1.3, M: .8 },
        repere: "162/100 000 : 302 avant 18 ans, 254 après 65 ans (A)" },
      { id: "scaphoide", grave: true, nom: "Fracture du scaphoïde", n: "fracture du scaphoïde", base: [[12, .01], [18, .03], [30, .02], [60, .008]], sexe: { M: 1.5, F: .6 },
        repere: "22/100 000 ; 60–90 % des fractures du carpe ; 16–25 % des fractures sont occultes à la première radiographie (A, H)" },
      { id: "perilunaire", grave: true, nom: "Luxation péri-lunaire", n: "luxation péri-lunaire", base: [[12, .0003], [25, .001], [50, .0005]], sexe: { M: 2, F: .5 }, repere: "Pas de donnée retrouvée ; à ne pas manquer (†)" },
      { id: "kyste", nom: "Kyste synovial (poignet ou doigt)", n: "kyste synovial", base: [[12, .04], [30, .05], [50, .04], [70, .03]], sexe: { F: 1.5, M: .7 }, repere: "2–3/1 000/an en médecine générale (A)" },
      { id: "dequervain", nom: "Ténosynovite de De Quervain", n: "ténosynovite de De Quervain", base: [[12, .01], [30, .05], [50, .06], [70, .03]], sexe: { F: 2, M: .4 },
        repere: "2,8 (femmes) et 0,6 (hommes)/1 000 personnes-années (A)" },
      { id: "tenosynovite", nom: "Autre ténosynovite du poignet (extenseur ulnaire du carpe, intersection)", n: "ténosynovite du poignet", base: [[12, .02], [30, .04], [50, .04], [70, .03]],
        repere: "15,8 % des diagnostics main-poignet en médecine générale ; extenseur ulnaire du carpe : 2ᵉ ténosynovite du sportif (A)" },
      { id: "arthrose_poignet", nom: "Arthrose du poignet (SLAC, SNAC, STT)", n: "arthrose du poignet", base: [[12, .0005], [40, .005], [60, .015], [80, .02]], sexe: { M: 1.5, F: .7 }, repere: "Prévalence 1,0–1,7 % (A)" },
      { id: "tfcc", nom: "Lésion du TFCC ou instabilité radio-ulnaire distale", n: "lésion du TFCC", base: [[12, .01], [25, .03], [50, .03], [70, .02]],
        repere: "42 % des douleurs post-traumatiques du poignet à radiographies normales (A)" },
      { id: "scapholunaire", nom: "Lésion du ligament scapho-lunaire", n: "lésion scapho-lunaire", base: [[12, .003], [25, .008], [50, .008], [70, .005]], sexe: { M: 1.5, F: .7 },
        repere: "Associée à environ un tiers des fractures du radius distal (A)" },
      { id: "gymnaste", nom: "Poignet du gymnaste (stress de la physe radiale)", n: "poignet du gymnaste", base: [[12, .02], [15, .015], [18, .002], [22, .0002]], repere: "Douleur du poignet chez 46–79 % des gymnastes (A)" },
      { id: "hamatum", nom: "Fracture de l'hamulus de l'hamatum", n: "fracture de l'hamatum", base: [[12, .001], [25, .002], [50, .001]], sexe: { M: 2, F: .5 }, repere: "2–4 % des fractures du carpe ; golf, raquette, bâton (A)" },
      { id: "kienbock", nom: "Maladie de Kienböck", n: "maladie de Kienböck", base: [[12, .0005], [30, .002], [50, .001]], sexe: { M: 1.5, F: .7 }, repere: "0,17 % (symptomatique) des patients imagés (A)" },
      { id: "guyon", nom: "Neuropathie ulnaire au canal de Guyon", n: "neuropathie ulnaire au poignet", base: [[12, .001], [30, .003], [60, .003]], repere: "Pas de donnée retrouvée ; cyclistes (†)" },
      { id: "arthrose_digitale", nom: "Arthrose digitale (nodules d'Heberden et de Bouchard)", n: "arthrose digitale", base: [[12, .0005], [40, .03], [55, .12], [70, .2], [85, .22]], sexe: { F: 1.4, M: .7 },
        repere: "Symptomatique 12,4 %, radiographique 41,4 % (A)" },
      { id: "rhizarthrose", nom: "Rhizarthrose (arthrose trapézo-métacarpienne)", n: "rhizarthrose", base: [[12, .0005], [40, .02], [55, .08], [70, .1]], sexe: { F: 1.6, M: .6 },
        repere: "Douloureuse chez 2,5 % des hommes et 4,6 % des femmes de 25–64 ans (A)" },
      { id: "ressaut", nom: "Doigt à ressaut", n: "doigt à ressaut", base: [[12, .003], [40, .03], [60, .05], [80, .03]], sexe: { F: 1.5, M: .7 }, repere: "Prévalence environ 2 % ; 5,8–20 % chez le diabétique (A)" },
      { id: "fx_main", nom: "Fracture de la main (métacarpien, phalange, Bennett)", n: "fracture de la main", base: [[12, .06], [20, .07], [35, .04], [65, .03]], sexe: { M: 1.6, F: .6 },
        repere: "Phalanges 125/100 000, métacarpiens 84/100 000 (5ᵉ rayon 42 %) ; fracture la plus fréquente à 18–34 ans (A)" },
      { id: "entorse_doigt", nom: "Entorse ou luxation interphalangienne (dont boutonnière)", n: "entorse interphalangienne", base: [[12, .04], [20, .04], [40, .02], [70, .01]], sexe: { M: 1.3, F: .8 },
        repere: "Entorses : 12,3 % des lésions main-poignet aux urgences (A)" },
      { id: "dupuytren", nom: "Maladie de Dupuytren", n: "maladie de Dupuytren", base: [[12, .0001], [40, .005], [55, .03], [70, .05]], sexe: { M: 2, F: .5 }, repere: "12 %, 21 % et 29 % à 55, 65 et 75 ans ; souvent indolore (A)" },
      { id: "lcu_pouce", nom: "Entorse du ligament collatéral ulnaire du pouce (pouce du skieur)", n: "entorse du LCU du pouce", base: [[12, .01], [25, .015], [50, .008], [70, .004]], repere: "Environ 50/100 000 (A)" },
      { id: "maillet", nom: "Doigt en maillet", n: "doigt en maillet", base: [[12, .005], [30, .008], [60, .01], [80, .008]], repere: "Environ 10/100 000 ; lésion tendineuse fermée la plus fréquente en sport (A)" },
      { id: "jersey", grave: true, nom: "Avulsion du fléchisseur profond (jersey finger)", n: "avulsion du fléchisseur profond", base: [[12, .001], [20, .002], [40, .001]], sexe: { M: 2, F: .5 },
        repere: "4 % des lésions tendineuses traumatiques aiguës (A)" },
      { id: "poulie", nom: "Lésion de poulie du grimpeur", n: "lésion de poulie", base: [[12, .001], [25, .003], [45, .001]], repere: "20 % des blessures chez 600 grimpeurs (A)" },
      { id: "teno_infectieuse", grave: true, nom: "Ténosynovite infectieuse des fléchisseurs", n: "ténosynovite infectieuse des fléchisseurs", base: [[12, .0005], [40, .001], [70, .001]],
        repere: "Pas de donnée retrouvée ; à ne pas manquer (†)" },
      { id: "par", nom: "Polyarthrite rhumatoïde (poignet et main)", n: "polyarthrite rhumatoïde", base: [[12, .001], [30, .006], [50, .012], [70, .012]], sexe: { F: 2.2, M: .45 },
        repere: "Prévalence 0,5–1 % ; mains atteintes dans 80–90 % des cas, poignet dans environ 75 % (A)" },
      { id: "cristaux", nom: "Goutte ou chondrocalcinose (poignet ou main)", n: "arthrite microcristalline", base: [[12, .0005], [40, .004], [65, .012], [85, .02]],
        repere: "Goutte 3,9–5,1 % (tous sites) ; chondrocalcinose 4–7 % après 40 ans, 18 % après 80 ans (A)" },
      { id: "psoriasique", nom: "Arthrite psoriasique (dactylite)", n: "arthrite psoriasique", base: [[12, .0005], [30, .002], [50, .003], [70, .002]], repere: "Prévalence 1–2/1 000 ; dactylite chez 40–50 % (A)" },
      { id: "cervical", nom: "Douleur projetée d'origine cervicale (C6–C8)", n: "douleur projetée cervicale", base: [[12, .003], [35, .015], [55, .03], [75, .02]],
        repere: "Radiculopathie cervicale 83,2/100 000/an, pic à 50–54 ans (A, rachis cervical)" },
    ],
    compatibles: [["fx_radius", "scapholunaire"], ["fx_radius", "tfcc"], ["fx_radius", "canal_carpien"], ["scaphoide", "scapholunaire"], ["arthrose_poignet", "scapholunaire"], ["arthrose_digitale", "rhizarthrose"],
      ["canal_carpien", "rhizarthrose"], ["canal_carpien", "ressaut"], ["canal_carpien", "dequervain"], ["canal_carpien", "cervical"], ["ressaut", "dupuytren"], ["par", "canal_carpien"], ["arthrose_digitale", "cristaux"],
      ["kyste", "arthrose_digitale"], ["guyon", "hamatum"], ["entorse_doigt", "fx_main"], ["tfcc", "tenosynovite"]],
    residuel: { id: "nonspec", nom: "Douleur non spécifique (aucun diagnostic précis)", n: "douleur non spécifique du poignet ou de la main",
      explication: "Probabilité qu'aucun des diagnostics de la liste ne soit en cause (entorse légère, douleur non spécifique) : elle monte quand les éléments spécifiques sont absents ou négatifs. Après une chute, 16 à 25 % des fractures du scaphoïde sont occultes : revoir à 10–14 jours si la douleur persiste.",
      conduite: items([3, "main:21"]) },

    grappes: [
      { id: "cts6_pos", dx: "canal_carpien", nom: "CTS-6 : score de 12 ou plus", rv: 4.5, couvre: CTS_IDS, statut: "verifie", piste: `${CTS6} : RV+ 4,5`,
        si: L => CTS_IDS.every(id => L.repondu(id)) && ctsScore(L) >= 12 },
      { id: "cts6_neg", dx: "canal_carpien", nom: "CTS-6 : score de moins de 12", rv: .14, couvre: CTS_IDS, statut: "verifie", piste: `${CTS6} : RV− 0,14`,
        si: L => CTS_IDS.every(id => L.repondu(id)) && ctsScore(L) < 12 },
      { id: "scaph_neg", dx: "scaphoide", nom: "Tabatière, tubercule du scaphoïde et compression axiale tous indolores", rv: .05, couvre: SCAPH, statut: "verifie",
        piste: `${SUH} : combinés dans les 24 h, Se 100 %, Sp 74 % (RV− non calculable, plafonné à 0,05)`, si: L => SCAPH.every(id => L.non(id)) },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Main atteinte", "Droite", "Gauche", { canal_carpien: 1.4, par: 5, arthrose_digitale: 3, rhizarthrose: 1.5, psoriasique: 1.5, cristaux: 1.3, fx_radius: .1, scaphoide: .1, fx_main: .05, perilunaire: .05,
          entorse_doigt: .1, maillet: .1, jersey: .05, lcu_pouce: .05, hamatum: .1, teno_infectieuse: .05, kyste: .3, tfcc: .3, scapholunaire: .2 }, "Douleur aux deux mains"),
        C.dominance("Main dominante"),
        C.accompagne(), C.refere(),
        C.travail({ manuel: { canal_carpien: 1.5, dequervain: 1.3, tenosynovite: 1.5, rhizarthrose: 1.3, ressaut: 1.3, arthrose_poignet: 1.5, kienbock: 1.5 },
          bureau: { canal_carpien: 1.3, tenosynovite: 1.2 }, physique: { tenosynovite: 1.3, fx_main: 1.2 } }),
        C.travailPrecision(),
        C.sport({ danse: { gymnaste: 1.5 }, escalade: { poulie: 20, ressaut: 1.3 }, golf: { hamatum: 5, tenosynovite: 1.5 }, raquette: { hamatum: 3, tenosynovite: 2, tfcc: 1.5 }, glisse: { lcu_pouce: 3, scaphoide: 1.5, fx_radius: 1.5 },
          contact: { fx_main: 1.5, entorse_doigt: 2, maillet: 1.5, jersey: 3 }, velo: { guyon: 4, canal_carpien: 1.2 }, muscu: { tenosynovite: 1.5, tfcc: 1.3 }, lancer: { entorse_doigt: 1.5, maillet: 1.5 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(), C.atcdMedicaux(),
        ouiNon("diabete", "Diabète", { oui: "diabète", non: "", effets: { ressaut: p(3, .9), dupuytren: p(2, .95), canal_carpien: p(1.5, .95), teno_infectieuse: p(1.5, .97) } }),
        ouiNon("grossesse", "Grossesse ou post-partum (moins d'un an)", { si: L => L.v("sexe") !== "M", oui: "grossesse ou post-partum", non: "", effets: { dequervain: p(4, .95), canal_carpien: p(2, .95) } }),
        ouiNon("osteoporose", "Ostéoporose ou fracture de fragilité", { oui: "ostéoporose", non: "", effets: { fx_radius: p(2, .9) } }),
        ouiNon("hypothyroidie", "Hypothyroïdie, insuffisance rénale ou dialyse", { oui: "hypothyroïdie ou insuffisance rénale", non: "", horsNormal: true, effets: { canal_carpien: p(1.5, .97), cristaux: p(1.3, .98) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux({ par: p(2, .9), psoriasique: p(2, .95) }),
        C.atcdRhumato("par", 4, 2, { cristaux: "cristaux", rv: { psoriasis: [{ dx: "psoriasique", rvp: 8, rvn: .9 }], uveite: [{ dx: "psoriasique", rvp: 2, rvn: 1 }] } }),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({}), C.depuis(), C.contexte(),
          C.duree({ lt7: { fx_radius: 3, scaphoide: 3, perilunaire: 3, fx_main: 3, entorse_doigt: 3, lcu_pouce: 3, maillet: 2.5, jersey: 3, poulie: 2.5, hamatum: 1.5, teno_infectieuse: 3, cristaux: 2,
              canal_carpien: .3, arthrose_digitale: .2, rhizarthrose: .2, arthrose_poignet: .2, dupuytren: .1, kyste: .5, ressaut: .4, kienbock: .3 },
            s1_6: { dequervain: 1.3, tenosynovite: 1.3, scaphoide: 1.2, tfcc: 1.2, gymnaste: 1.3, perilunaire: .5, teno_infectieuse: .5 },
            s6_12: { dequervain: 1.3, ressaut: 1.3, tfcc: 1.3, scapholunaire: 1.3, kienbock: 1.5, gymnaste: 1.5, fx_main: .3, fx_radius: .3, teno_infectieuse: .1 },
            gt3m: { canal_carpien: 2, arthrose_digitale: 3, rhizarthrose: 3, arthrose_poignet: 3, dupuytren: 3, ressaut: 1.5, kyste: 1.5, kienbock: 2, par: 1.5, fx_radius: .05, fx_main: .05, perilunaire: .02, teno_infectieuse: .02, jersey: .1 } }),
          C.apparition({ subit_trauma: { fx_radius: 6, scaphoide: 6, perilunaire: 8, fx_main: 6, entorse_doigt: 6, lcu_pouce: 6, maillet: 5, jersey: 6, poulie: 5, hamatum: 4, tfcc: 2, scapholunaire: 3,
              canal_carpien: .2, arthrose_digitale: .1, rhizarthrose: .2, dupuytren: .05, ressaut: .2, par: .1, kyste: .4, dequervain: .3 },
            subit: { cristaux: 5, teno_infectieuse: 3, ressaut: 1.5, kyste: 1.3, dequervain: 1.2, fx_radius: .2, fx_main: .2 },
            graduel: { dequervain: 2, tenosynovite: 2, canal_carpien: 1.5, ressaut: 1.5, kyste: 1.5, gymnaste: 2.5, tfcc: 1.3, kienbock: 1.5, fx_radius: .1, fx_main: .1, entorse_doigt: .1 },
            insidieux: { arthrose_digitale: 3, rhizarthrose: 3, arthrose_poignet: 3, canal_carpien: 2, dupuytren: 3, par: 2, kienbock: 1.5, fx_radius: .05, fx_main: .05, entorse_doigt: .05 } }),
          choix("mecanisme", "Mécanisme", [
            o("chute_main", "Chute sur la main tendue (poignet en extension)", { fx_radius: 3, scaphoide: 3, perilunaire: 2, scapholunaire: 2.5, tfcc: 1.5, fx_main: .3 }, { n: "chute sur la main tendue" }),
            o("coup_poing", "Coup de poing", { fx_main: 6, entorse_doigt: .5, fx_radius: .3 }, { n: "coup de poing" }),
            o("doigt_coince", "Doigt coincé ou frappé au bout (ballon)", { maillet: 5, entorse_doigt: 4, fx_main: 1.5 }, { n: "doigt frappé au bout" }),
            o("doigt_tire", "Doigt tiré en flexion (agrippe un chandail)", { jersey: 10, entorse_doigt: 1.5 }, { n: "doigt tiré en flexion" }),
            o("pouce_abduction", "Pouce forcé en abduction (bâton de ski, chute)", { lcu_pouce: 10, fx_main: 1.5 }, { n: "pouce forcé en abduction" }),
            o("prise_arquee", "Prise arquée ou réception en escalade", { poulie: 15 }, { n: "prise arquée" }),
            o("torsion", "Torsion du poignet ou appui en rotation", { tfcc: 3, tenosynovite: 1.5, scapholunaire: 1.5 }, { n: "torsion du poignet" }),
            o("bat_golf", "Coup de bâton, de raquette ou de golf (sol)", { hamatum: 8, tfcc: 1.3 }, { n: "impact du manche" })], { si: trauma, masqueSi: "contexte" }),
          ouiNon("pop_doigt", "Claquement (« pop ») à la base d'un doigt", { si: trauma, oui: "claquement à la base du doigt", nie: "claquement", effets: { poulie: p(8, .3), jersey: p(2, .7) } }),
          ouiNon("morsure", "Plaie au-dessus d'une jointure après un coup de poing, ou morsure", { oui: "plaie de coup de poing ou morsure", nie: "morsure", drapeau: true,
            effets: { teno_infectieuse: p(5, .9), fx_main: p(1.5, .95) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("radiale", "Côté du pouce du poignet (styloïde radiale, tabatière)", { dequervain: p(5, .2), scaphoide: p(4, .3), fx_radius: p(1.5, .7), arthrose_poignet: p(1.5, .8), tenosynovite: p(1.5, .8) }, { n: "radiale du poignet" }),
            m("dorsale", "Dos du poignet (centre)", { kyste: p(3, .5), scapholunaire: p(4, .4), kienbock: p(4, .4), gymnaste: p(4, .4), fx_radius: p(1.5, .7), arthrose_poignet: p(2, .6), tenosynovite: p(1.5, .8) }, { n: "dorsale du poignet" }),
            m("ulnaire", "Côté de l'auriculaire du poignet", { tfcc: p(6, .2), tenosynovite: p(2, .6), hamatum: p(2, .7), guyon: p(2, .7), fx_radius: p(1.3, .8) }, { n: "ulnaire du poignet" }),
            m("palmaire", "Face palmaire du poignet", { canal_carpien: p(1.5, .8), kyste: p(1.5, .9), hamatum: p(2, .8), scaphoide: p(1.3, .9) }, { n: "palmaire du poignet" }),
            m("base_pouce", "Base du pouce", { rhizarthrose: p(6, .2), dequervain: p(2, .6), lcu_pouce: p(3, .5), fx_main: p(1.3, .9) }, { n: "à la base du pouce" }),
            m("doigts", "Doigts (articulations interphalangiennes ou métacarpo-phalangiennes)", { arthrose_digitale: p(5, .2), par: p(3, .5), psoriasique: p(3, .5), entorse_doigt: p(4, .3), maillet: p(3, .5),
              jersey: p(3, .5), ressaut: p(2, .5), fx_main: p(2, .6), cristaux: p(1.5, .8), poulie: p(3, .5), teno_infectieuse: p(3, .5) }, { n: "aux doigts" }),
            m("paume", "Paume ou base des doigts", { ressaut: p(4, .4), dupuytren: p(6, .3), poulie: p(3, .6), fx_main: p(1.5, .8), hamatum: p(1.5, .9) }, { n: "à la paume" }),
            m("dos_main", "Dos de la main (métacarpiens)", { fx_main: p(4, .4), kyste: p(1.3, .9) }, { n: "au dos de la main" }),
          ], { gabarit: "douleur {v}" }),
          C.type({ brulure: { canal_carpien: 2, guyon: 2, cervical: 2 }, choc: { canal_carpien: 1.5, cervical: 2 }, pulsatile: { teno_infectieuse: 3, cristaux: 2 }, sourde: { arthrose_poignet: 1.3, arthrose_digitale: 1.3, kienbock: 1.3 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("pince_agg", "Pire en pinçant, en tournant une clé ou en ouvrant un pot", { g: "facteurs", agg: "la pince et la torsion", aggNie: "à la pince",
            effets: { rhizarthrose: p(3, .3), dequervain: p(2, .5), lcu_pouce: p(2, .7), tfcc: p(1.5, .8), arthrose_digitale: p(1.3, .9) } }),
          ouiNon("appui_poignet_agg", "Pire en appui sur le poignet (pousser, se relever, push-up)", { g: "facteurs", agg: "l'appui sur le poignet", aggNie: "à l'appui",
            effets: { tfcc: p(2.5, .5), scapholunaire: p(2.5, .6), gymnaste: p(4, .4), kienbock: p(2, .7), kyste: p(1.5, .8), fx_radius: p(1.5, .8), scaphoide: p(1.5, .8) } }),
          ouiNon("pronosup_agg", "Pire en tournant l'avant-bras (tournevis, poignée de porte)", { g: "facteurs", agg: "la prono-supination", aggNie: "en rotation de l'avant-bras",
            effets: { tfcc: p(3, .4), tenosynovite: p(1.5, .8) } }),
          ouiNon("accrochage_doigt", "Doigt qui accroche ou reste bloqué en flexion", { oui: "accrochage d'un doigt", nie: "accrochage", effets: { ressaut: p(15, .2) } }),
          ouiNon("flick", "Secouer la main soulage les engourdissements", { oui: "soulagé en secouant la main", non: "", effets: { canal_carpien: verRv(1.4, .85, "Flick sign, 2004 (n = 142) : Se 37 %, Sp 74 %") } }),
          C.attenuants(),
          C.moment({ matin: { par: 2, psoriasique: 1.5, arthrose_digitale: 1.2, ressaut: 1.3 }, soir: { arthrose_digitale: 1.3, rhizarthrose: 1.3, dequervain: 1.2 }, constante: { teno_infectieuse: 2, cristaux: 1.5 } }),
          C.nocturne({ canal_carpien: p(1.8, .6), teno_infectieuse: p(1.5, .9), cristaux: p(1.5, .9) }),
          C.raideur({ plus30: { par: 2, psoriasique: 1.5 }, moins30: { arthrose_digitale: 1.3, rhizarthrose: 1.2 } }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("paresthesies_median", "Engourdissements du pouce, de l'index et du majeur (schéma de Katz)", { oui: "paresthésies du territoire médian", nie: "paresthésie",
            effets: { canal_carpien: verRv(2.4, .5, `${DARCY} : schéma classique ou probable, RV+ 2,4`), cervical: p(1.5, .9) } }),
          ouiNon("paresthesies_nocturnes", "Engourdissements qui réveillent la nuit", { si: L => L.oui("paresthesies_median") || L.oui("paresthesies_ulnaires"), oui: "paresthésies nocturnes", non: "",
            effets: { canal_carpien: verRv(1.2, .7, `${DARCY} : RV+ 1,2`) } }),
          ouiNon("paresthesies_ulnaires", "Engourdissements de l'auriculaire et de l'annulaire", { oui: "paresthésies de l'auriculaire", nie: "", effets: { guyon: p(5, .3), cervical: p(1.5, .9), canal_carpien: p(.5, 1.1) } }),
          ouiNon("masse", "Bosse ou masse visible", { oui: "masse", nie: "masse", effets: { kyste: p(12, .2), dupuytren: p(2, .8), arthrose_digitale: p(1.5, .9), cristaux: p(1.5, .95) } }),
          ouiNon("enflure", "Enflure", { oui: "enflure", nie: "enflure", effets: { fx_radius: p(2, .5), fx_main: p(2, .5), entorse_doigt: p(2, .5), par: p(2.5, .6), cristaux: p(3, .5), teno_infectieuse: p(3, .3), psoriasique: p(2, .6),
            canal_carpien: p(.6, 1.1), arthrose_digitale: p(.8, 1.05) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { oui: "rougeur et chaleur", nie: "rougeur ou chaleur", drapeau: true, effets: { cristaux: p(5, .3), teno_infectieuse: p(4, .4), par: p(1.5, .8), psoriasique: p(1.5, .8) } }),
          ouiNon("plaie_doigt", "Coupure, piqûre ou plaie récente du doigt ou de la main", { oui: "plaie récente", nie: "plaie", effets: { teno_infectieuse: p(6, .5) } }),
          ouiNon("autres_articulations", "Autres articulations enflées ou douloureuses", { oui: "autres articulations atteintes", nie: "autre articulation atteinte", effets: { par: p(4, .4), psoriasique: p(2.5, .6), cristaux: p(1.5, .9) } }),
          ouiNon("cou_agg", "Douleur ou engourdissement aggravés par les mouvements du cou", { agg: "les mouvements du cou", aggNie: "aux mouvements du cou", effets: { cervical: p(6, .5) } }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ teno_infectieuse: p(3, .6), cristaux: p(1.3, .95) }), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("plaie", "Plaie, morsure ou injection dans la main", { teno_infectieuse: p(4, 1) }, { n: "plaie de la main" })]),
          ouiNon("doigts_froids", "Doigts froids, pâles ou engourdis après le traumatisme", { si: trauma, oui: "doigts froids ou engourdis", nie: "trouble circulatoire", drapeau: true,
            effets: { fx_radius: p(2, .97), perilunaire: p(4, .9) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        { titre: "Inspection", sep: ", ", toutNormal: true, questions: [
          ouiNon("ex_deformation", "Déformation du poignet (en dos de fourchette) ou du doigt", { oui: "déformation", non: "pas de déformation", effets: { fx_radius: p(8, .5), perilunaire: p(4, .6), fx_main: p(3, .7), entorse_doigt: p(3, .7) } }),
          ouiNon("ex_ecchymose", "Ecchymose", { oui: "ecchymose", non: "", effets: { fx_radius: est(5, .8, `${EYLER} : Sp 97,8 % pour une fracture du poignet (Se non publiée)`), fx_main: p(2, .8), entorse_doigt: p(2, .8), lcu_pouce: p(2, .8) } }),
          ouiNon("ex_rotation", "Doigts qui se croisent en flexion (mal rotation)", { oui: "malrotation d'un doigt", non: "pas de malrotation", horsNormal: true, effets: { fx_main: p(15, .7) } }),
          ouiNon("ex_kyste", "Masse ferme, lisse, qui transillumine", { oui: "masse kystique", non: "", horsNormal: true, effets: { kyste: p(20, .3) } }),
          ouiNon("ex_nodules", "Nodules d'Heberden ou de Bouchard (élargissement osseux)", { oui: "nodules d'Heberden ou de Bouchard", non: "", horsNormal: true,
            effets: { arthrose_digitale: { rvp: 8, rvn: .2, statut: "a_verifier", piste: "Critères cliniques ACR (Altman, 1990 ; élargissement osseux ≥ 2 articulations, etc.) : Se 92 %, Sp 98 % pour l'ensemble des critères" }, par: p(.5, 1.05) } }),
          ouiNon("ex_synovite", "Synovite (articulations gonflées et molles : MCP, IPP, poignet)", { oui: "synovite", non: "pas de synovite", effets: { par: p(6, .2), psoriasique: p(3, .5), cristaux: p(3, .5), arthrose_digitale: p(.5, 1.1) } }),
          ouiNon("ex_dactylite", "Dactylite (doigt en saucisse)", { oui: "dactylite", non: "", horsNormal: true, effets: { psoriasique: ver(.28, .99, `${COATES} : RV+ ≈ 28 (calculé)`), cristaux: p(2, .95), teno_infectieuse: p(3, .95) } }),
          ouiNon("ex_ongles", "Dystrophie unguéale psoriasique (ponctuations, onycholyse)", { oui: "dystrophie unguéale", non: "", horsNormal: true, effets: { psoriasique: ver(.38, .99, `${COATES} : RV+ ≈ 38 (calculé)`) } }),
          ouiNon("ex_tophus", "Tophus", { oui: "tophus", non: "", horsNormal: true, effets: { cristaux: p(15, .8) } }),
          ouiNon("ex_atrophie", "Atrophie thénarienne ou des interosseux", { oui: "atrophie", non: "", horsNormal: true, effets: { canal_carpien: p(3, .9), guyon: p(3, .9), cervical: p(1.5, .97) } }),
          ouiNon("ex_corde", "Nodule ou corde palmaire (test de la table positif)", { oui: "corde palmaire", non: "", horsNormal: true, effets: { dupuytren: p(30, .1), ressaut: p(1.5, .9) } }),
          ouiNon("ex_maillet", "Bout du doigt tombant (extension active de l'IPD impossible)", { oui: "doigt en maillet", non: "", horsNormal: true, effets: { maillet: p(40, .1) } }),
          ouiNon("ex_jersey", "Flexion active de l'IPD impossible (fléchisseur profond)", { oui: "flexion active de l'IPD impossible", non: "", horsNormal: true, effets: { jersey: p(40, .1) } }),
          ouiNon("ex_boutonniere", "Extension active faible de l'IPP (test d'Elson)", { oui: "extension active de l'IPP faible", non: "", horsNormal: true, effets: { entorse_doigt: p(5, .7) } }),
          ouiNon("kanavel", "Signes de Kanavel (enflure fusiforme, doigt fléchi, douleur à l'extension passive, gaine sensible)", { oui: "signes de Kanavel", non: "pas de signe de Kanavel", horsNormal: true,
            effets: { teno_infectieuse: { rvp: 10, rvn: .3, statut: "a_verifier", piste: "Tous les signes chez 22 des 41 cas confirmés ; pas de sensibilité ni de spécificité robustes" } } }),
        ] },
        { titre: "Palpation", sep: ", ", toutNormal: true, questions: [
          ouiNon("p_radius_distal", "Radius distal douloureux", { oui: "radius distal douloureux", non: "radius distal indolore", effets: { fx_radius: p(4, .1), gymnaste: p(3, .5), scaphoide: p(1.3, .9) } }),
          ouiNon("p_tabatiere", "Tabatière anatomique douloureuse", { oui: "tabatière douloureuse", non: "tabatière indolore", effets: { scaphoide: ver(.96, .39, `${CARPENTER} : RV+ 1,5 ; RV− 0,15`) } }),
          ouiNon("p_tubercule_scaph", "Tubercule du scaphoïde douloureux", { oui: "tubercule du scaphoïde douloureux", non: "tubercule du scaphoïde indolore", effets: { scaphoide: p(2, .3) } }),
          ouiNon("p_styloide_radiale", "Premier compartiment (styloïde radiale) douloureux ou épaissi", { oui: "premier compartiment douloureux", non: "", effets: { dequervain: p(5, .1), scaphoide: p(1.3, .9) } }),
          ouiNon("p_scapholunaire", "Intervalle scapho-lunaire (dos du poignet) douloureux", { oui: "intervalle scapho-lunaire douloureux", non: "", horsNormal: true, effets: { scapholunaire: p(3, .4), kyste: p(1.5, .8), kienbock: p(2, .7) } }),
          ouiNon("p_lunatum", "Lunatum douloureux (centre du dos du poignet)", { oui: "lunatum douloureux", non: "", horsNormal: true, effets: { kienbock: p(4, .3), perilunaire: p(2, .8), scapholunaire: p(1.5, .8) } }),
          ouiNon("p_ecu", "Extenseur ulnaire du carpe douloureux", { oui: "extenseur ulnaire du carpe douloureux", non: "", horsNormal: true, effets: { tenosynovite: p(4, .4), tfcc: p(1.3, .9) } }),
          ouiNon("p_hamatum", "Hamulus de l'hamatum douloureux (éminence hypothénar)", { oui: "hamulus douloureux", non: "", horsNormal: true, effets: { hamatum: p(8, .2), guyon: p(2, .7) } }),
          ouiNon("p_base_pouce", "Trapézo-métacarpienne douloureuse", { oui: "trapézo-métacarpienne douloureuse", non: "", effets: { rhizarthrose: p(4, .2), dequervain: p(1.3, .9) } }),
          ouiNon("p_poulie_a1", "Nodule douloureux à la poulie A1 (base du doigt, côté paume)", { oui: "nodule à la poulie A1", non: "", horsNormal: true, effets: { ressaut: p(8, .2), poulie: p(2, .8) } }),
          ouiNon("p_os_main", "Métacarpien ou phalange douloureux (os)", { oui: "douleur osseuse de la main", non: "pas de douleur osseuse de la main", effets: { fx_main: p(4, .1) } }),
          ouiNon("p_gaine", "Gaine du fléchisseur douloureuse sur toute sa longueur", { oui: "gaine du fléchisseur douloureuse", non: "", horsNormal: true, effets: { teno_infectieuse: p(5, .3), poulie: p(1.5, .9) } }),
          ouiNon("ex_chaleur", "Chaleur articulaire", { oui: "chaleur articulaire", non: "", effets: { cristaux: p(4, .4), par: p(2, .6), teno_infectieuse: p(2, .7) } }),
        ] },
        { titre: "Mobilité", toutNormal: true, questions: [
          C.amplitude("arom_poignet", "Mobilité du poignet (flexion, extension)", "mobilité du poignet", { lim_douleur: { fx_radius: 2, scaphoide: 1.5, tfcc: 1.3, gymnaste: 1.5, kienbock: 1.5 }, lim_raideur: { arthrose_poignet: 4, par: 2, kienbock: 2 },
            complete: { fx_radius: .3, arthrose_poignet: .3 } }),
          ouiNon("dorsiflexion_douleur", "Dorsiflexion du poignet douloureuse", { si: trauma, oui: "dorsiflexion douloureuse", non: "dorsiflexion indolore",
            effets: { fx_radius: est(1.5, .1, `${EYLER} : Se 95,7 % (Sp non publiée)`), scaphoide: p(1.3, .5) } }),
          ouiNon("pronosup_res", "Prono-supination résistée douloureuse", { si: trauma, oui: "prono-supination résistée douloureuse", non: "prono-supination résistée indolore", horsNormal: true,
            effets: { scaphoide: { rvp: 10, rvn: .2, statut: "a_verifier", piste: `${COVENTRY} : Se 100 %, Sp 97,9 %, RV+ 45 (6,5–312) ; plafonné à 10 en attendant une confirmation` }, tfcc: p(2, .7) } }),
          ouiNon("raideur_doigts", "Mobilité des doigts réduite (poing incomplet)", { oui: "poing incomplet", non: "poing complet", effets: { par: p(2, .6), arthrose_digitale: p(2, .6), dupuytren: p(2, .8), fx_main: p(2, .7), teno_infectieuse: p(2, .8) } }),
        ] },
        { titre: "Neurologique", ligne: "Neuro", toutNormal: true, questions: [
          ouiNon("hypo_median", "Hypoalgésie ou discrimination de deux points diminuée (territoire médian)", { oui: "hypoesthésie médiane", non: "sensibilité médiane normale",
            effets: { canal_carpien: verRv(3.1, .7, `${DARCY} : RV+ 3,1 (2,0–5,1) ; RV− provisoire`), cervical: p(1.5, .9) } }),
          ouiNon("atrophie_thenar", "Atrophie ou faiblesse thénarienne (abduction du pouce)", { oui: "faiblesse thénarienne", non: "force thénarienne normale",
            effets: { canal_carpien: verRv(4.5, .85, "Dabbagh et coll., 2021, BMC Musculoskelet Disord : Se 5,5–22 %, Sp 96–100 % ; faiblesse de l'abduction RV+ 1,8, RV− 0,5") } }),
          ouiNon("hypo_ulnaire", "Hypoesthésie de l'auriculaire", { oui: "hypoesthésie de l'auriculaire", non: "", horsNormal: true, effets: { guyon: p(4, .4), cervical: p(1.5, .9) } }),
          ouiNon("spurling_main", "Spurling ou mouvements du cou reproduisant les symptômes", { oui: "symptômes reproduits par le cou", non: "cou indolore", horsNormal: true, effets: { cervical: p(5, .4) } }),
          ouiNon("pouls_dim", "Pouls radial diminué ou recoloration lente", { oui: "pouls radial diminué", non: "pouls radial normal", drapeau: true, effets: { fx_radius: p(2, .97), perilunaire: p(3, .95) } }),
        ] },
        { titre: "Tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("phalen", "Phalen", { court: "Phalen", effets: { canal_carpien: ver(.57, .67, `${DABBAGH} : RV+ 1,7 (calculé)`, { g: "provocation" }) } }),
          ouiNon("tinel_carpien", "Tinel au poignet", { court: "Tinel au poignet", effets: { canal_carpien: ver(.45, .78, `${DABBAGH} : RV+ 2,0 (calculé)`, { g: "provocation" }) } }),
          ouiNon("durkan", "Compression carpienne (Durkan)", { court: "Durkan", horsNormal: true, effets: { canal_carpien: ver(.64, .83, "Currie et coll., 2022, JAMA : RV+ 3,8 (calculé)", { g: "provocation" }) } }),
          ouiNon("compression_pouce", "Compression axiale du pouce (scaphoïde)", { court: "compression axiale du pouce", si: trauma, effets: { scaphoide: ver(.82, .58, `${CARPENTER} : RV+ 2,0 ; RV− 0,24`) } }),
          ouiNon("finkelstein", "Finkelstein", { court: "Finkelstein", effets: { dequervain: { rvp: 5, rvn: .3, statut: "a_verifier", piste: "Sp 100 % sur 72 poignets ; sensibilité incertaine", g: "dq" } } }),
          ouiNon("what_test", "WHAT test (hyperflexion du poignet, abduction résistée du pouce)", { court: "WHAT test", horsNormal: true, effets: { dequervain: ver(.99, .29, `${GOUBAU} : RV− 0,03 (calculé)`, { g: "dq" }) } }),
          ouiNon("fovea", "Ulnar fovea sign", { court: "ulnar fovea sign", horsNormal: true, effets: { tfcc: est(3, .15, `${TAY} : RV+ 7,1 ; ${OUYANG} : RV+ 1,7 (calculés)`) } }),
          ouiNon("ballottement_druj", "Ballottement radio-ulnaire distal", { court: "ballottement radio-ulnaire distal", horsNormal: true, effets: { tfcc: ver(.59, .96, "Kraan et coll., 2026, J Hand Surg Eur : instabilité radio-ulnaire distale") } }),
          ouiNon("watson", "Watson (scaphoid shift)", { court: "Watson", horsNormal: true, effets: { scapholunaire: ver(.69, .66, WATSON) } }),
          ouiNon("pressure_shear", "Pressure-shear (trapézo-métacarpienne)", { court: "pressure-shear", horsNormal: true, effets: { rhizarthrose: verRv(19.8, .01, `${SELA} : Se 99 %, Sp 95 % (calculés)`, { g: "rhizo" }) } }),
          ouiNon("grind", "Grind test du pouce", { court: "grind test", horsNormal: true, effets: { rhizarthrose: ver(.44, .92, `${GELBERMAN} : RV+ 5,5 (calculé)`, { g: "rhizo" }) } }),
          ouiNon("valgus_pouce", "Stress en valgus de la MCP du pouce (laxité sans arrêt franc)", { court: "stress en valgus du pouce", horsNormal: true, effets: { lcu_pouce: ver(.97, .85, `${RASHIDI} : RV+ 6,5 ; RV− 0,04 (calculés)`) } }),
          ouiNon("squeeze_mcp", "Compression latérale des MCP (squeeze test)", { court: "squeeze test des MCP", horsNormal: true, effets: { par: verRv(3, .6, `${SQUEEZE} : arthrite, RV+ 3,0 ; RV− 0,6`), psoriasique: p(1.5, .9) } }),
        ] },
        { titre: "Coude et cou", adjacent: "coude", toutNormal: true, questions: [
          choix("cou_mob", "Cou : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation du cou indolore" }), o("douleur", "Douloureuse ou reproduit les symptômes de la main", { cervical: 4 }, { n: "mobilisation du cou douloureuse" })]),
          choix("coude_mob", "Coude : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation du coude indolore" }), o("douleur", "Douloureuse ou limitée", {}, { n: "mobilisation du coude douloureuse" })]),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      L => (L.oui("kanavel") || ((L.oui("plaie_doigt") || L.oui("morsure") || L.a("risque_infection", "plaie")) && (L.oui("rougeur_chaleur") || L.oui("p_gaine") || L.oui("fievre"))))
        ? { niveau: "urgence", titre: "Ténosynovite infectieuse ou infection de la main à éliminer", ro: "ténosynovite infectieuse des fléchisseurs",
          texte: "Signes de Kanavel, ou plaie avec rougeur, gaine douloureuse ou fièvre : chirurgie de la main en urgence (antibiotiques IV, drainage).", conduite: items("main:20") } : null,
      L => L.oui("morsure") ? { niveau: "urgence", titre: "Plaie de coup de poing (morsure humaine) : jamais de fermeture simple", ro: "arthrite septique de la MCP",
        texte: "Une plaie au-dessus d'une jointure après un coup de poing est une morsure jusqu'à preuve du contraire : radiographie, exploration et antibiotiques (amoxicilline-clavulanate).", conduite: items("main:6") } : null,
      L => (L.oui("ex_deformation") && L.trauma()) || L.oui("pouls_dim") || L.oui("doigts_froids")
        ? { niveau: "urgence", titre: L.oui("pouls_dim") || L.oui("doigts_froids") ? "Atteinte neurovasculaire à éliminer" : "Fracture déplacée ou luxation à éliminer", ro: "fracture ou luxation du poignet",
          texte: "Déformation, doigts froids ou pouls diminué : examen du nerf médian, attelle, radiographies (profil vrai : luxation péri-lunaire) et évaluation d'urgence.", conduite: items([20, 2]) } : null,
      L => {
        if (!L.trauma() || (L.repondu("duree") && !L.dans("duree", ["lt7", "s1_6"]))) return null;
        const scaph = SCAPH.filter(id => L.oui(id)).length + (L.oui("pronosup_res") ? 1 : 0);
        if (scaph) return { niveau: "rapide", titre: "Fracture du scaphoïde à éliminer", ro: "fracture du scaphoïde",
          texte: "Tabatière, tubercule, compression axiale ou prono-supination douloureux après un traumatisme : radiographies avec incidences du scaphoïde ; si normales, attelle et radiographie à 10–14 jours ou IRM précoce (16–25 % de fractures occultes).",
          conduite: items(9) };
        if (SCAPH.every(id => L.non(id))) return { niveau: "info", titre: "Scaphoïde peu probable", texte: "Tabatière, tubercule et compression axiale indolores (Se 100 % combinés dans les 24 h). Revoir si la douleur persiste 10 à 14 jours." };
        if (L.dans("mecanisme", ["chute_main"]) || L.a("localisation", "radiale")) return { niveau: "info", titre: "Scaphoïde à examiner", texte: "Chute sur la main ou douleur radiale : tabatière, tubercule du scaphoïde et compression axiale du pouce." };
        return null;
      },
      L => (L.trauma() && (L.oui("p_radius_distal") || L.oui("ex_deformation") || L.oui("ex_ecchymose")))
        ? { niveau: "rapide", titre: "Radiographie du poignet indiquée", ro: "fracture du radius distal", texte: "Traumatisme avec radius distal douloureux, déformation ou ecchymose (règles d'Amsterdam : Se 98 %).", conduite: items([2, 21]) } : null,
      L => (L.oui("ex_rotation") || (L.v("mecanisme") === "coup_poing" && L.oui("p_os_main")))
        ? { niveau: "rapide", titre: "Fracture de la main à radiographier", ro: "fracture de la main", texte: L.oui("ex_rotation") ? "Malrotation d'un doigt : réduction ou chirurgie de la main." : "Coup de poing avec douleur osseuse : radiographies (col du 5ᵉ métacarpien).", conduite: items(["main:6", "main:4"]) } : null,
      L => L.oui("ex_jersey") ? { niveau: "rapide", titre: "Avulsion du fléchisseur profond : chirurgie de la main en 7 à 10 jours", ro: "jersey finger", texte: "Flexion active de l'IPD impossible : le tendon se rétracte ; réparation rapide.", conduite: items("main:15") } : null,
      L => (L.oui("valgus_pouce") && L.trauma()) ? { niveau: "rapide", titre: "Rupture du ligament collatéral ulnaire du pouce", ro: "lésion de Stener", texte: "Laxité sans arrêt franc : risque de lésion de Stener ; chirurgie de la main rapidement.", conduite: items("main:10") } : null,
      L => (L.oui("ex_boutonniere") && L.trauma()) ? { niveau: "rapide", titre: "Lésion de la bandelette centrale (boutonnière)", ro: "boutonnière", texte: "Extension active faible de l'IPP : attelle de l'IPP en extension et suivi rapproché ; référer si doute.", conduite: items("main:18") } : null,
      L => (L.oui("atrophie_thenar") || L.oui("ex_atrophie")) && (L.oui("paresthesies_median") || L.oui("hypo_median"))
        ? { niveau: "rapide", titre: "Canal carpien sévère", ro: "canal carpien sévère", texte: "Atrophie ou faiblesse thénarienne : EMG et chirurgie de la main (décompression) sans attendre.", conduite: items(1) } : null,
      L => ((L.oui("ex_synovite") || L.oui("squeeze_mcp")) && (L.v("cote") === "B" || L.oui("autres_articulations")) && !L.trauma())
        ? { niveau: "rapide", titre: "Polyarthrite inflammatoire à éliminer", ro: "polyarthrite rhumatoïde", texte: "Synovites ou squeeze test positif, bilatéraux ou multiples : VS, CRP, FR, anti-CCP ; rhumatologie en moins de 6 semaines du début des symptômes.", conduite: items([11, "main:11"]) } : null,
      C.regles.septique("un poignet ou un doigt", ["rougeur_chaleur", "ex_chaleur"], [["ex_synovite", ["oui"]], ["enflure", ["oui"]]]),
      C.regles.tumeur("Radiographies du poignet ou de la main ; IRM selon le tableau."),
    ],
  });
})();
