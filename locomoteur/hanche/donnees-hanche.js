/* Locomoteur Morand, hanche et aine (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), parties A à H ;
   coxarthrose surtout d'après Metcalfe et coll., 2019, JAMA (examen clinique rationnel).
   Même format que le genou : p() provisoire, est() à vérifier, ver()/verRv() vérifié avec sa source. */
(function () {
  "use strict";
  const { p, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), PALP = "palp", TEST = "test";
  const METCALFE = "Metcalfe et coll., 2019, JAMA (examen clinique rationnel, coxarthrose)", SUTLIVE = "Sutlive et coll., 2008, JOSPT (PMID 18758047)";
  const GRIMALDI17 = "Grimaldi et coll., 2017, BJSM (PMID 27633027)", GRIMALDI15 = "Grimaldi et coll., 2015, Sports Med", LEQUESNE = "Lequesne et coll., 2008, Arthritis Rheum (n = 17)";
  const REIMAN15 = "Reiman et coll., 2015, BJSM, méta-analyse (PMID 25515771)", PALSSON = "Pålsson et coll., 2020, KSSTA (PMID 32335699)", REIMAN13 = "Reiman et coll., 2013, BJSM (PMID 22773321)";
  const SERNER = "Serner et coll., 2016, BJSM (PMID 27531521)", TIJSSEN = "Tijssen et coll., 2017, Scand J Med Sci Sports (arthroscopie)", FEARON = "Fearon et coll., 2013, BJSM (PMID 22983121)";
  const lim = ["lim_douleur", "lim_raideur"];

  const ANGLAIS = { coxarthrose: "hip osteoarthritis", sdgt: "greater trochanteric pain syndrome (gluteal tendinopathy)", adducteurs: "adductor-related groin pain",
    ij_aigu: "acute hamstring injury", fracture: "proximal femur (hip) fracture", cfa: "femoroacetabular impingement or labral tear", psoas: "iliopsoas-related groin pain or snapping hip",
    piriforme: "deep gluteal (piriformis) syndrome", meralgie: "meralgia paresthetica", osteite: "osteitis pubis (pubic-related groin pain)", parietale: "inguinal-related groin pain (sports hernia)",
    avulsion: "pelvic apophyseal avulsion fracture", ij_tendino: "proximal hamstring tendinopathy", epiphysiolyse: "slipped capital femoral epiphysis", ff_col: "femoral neck or shaft stress fracture",
    osteonecrose: "osteonecrosis of the femoral head", apophysite: "iliac crest apophysitis", contusion: "thigh or iliac crest contusion", bassin: "pelvic or sacral fragility fracture",
    lombaire: "hip pain referred from the lumbar spine", ppr: "polymyalgia rheumatica" };

  const CONDUITES = C.aideMemoire("hanche", { coxarthrose: 1, sdgt: 2, adducteurs: 3, ij_aigu: 4, fracture: 5, cfa: 6, psoas: 9, piriforme: 10, meralgie: 11, osteite: 12, parietale: 13,
    avulsion: 14, ij_tendino: 15, epiphysiolyse: 17, ff_col: [19, 28], osteonecrose: 20, apophysite: 22, contusion: 23, bassin: 24, lombaire: 25, ppr: 26 });
  const items = ref => C.aideMemoire("hanche", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("hanche"),
    { titre: "Pour tous", items: [{ t: "Enseignement : nature de l'atteinte, pronostic, autogestion" },
      { t: "Consignes de reconsultation : fièvre, impossibilité de mettre du poids, douleur nocturne, engourdissement en selle ou trouble urinaire" }] }];

  const INFOS = {
    localisation: { aide: "Plusieurs choix possibles", info: "Douleur maximale à la face médiale de la cuisse : RV+ 7,8 pour la coxarthrose ; à l'aine : coxarthrose (RV+ 1,7) et conflit fémoro-acétabulaire (aine comme site principal chez 87 %) ; latérale au grand trochanter : syndrome trochantérien ; irradiant sous le genou : origine lombaire." },
    escaliers: { info: "Douleur dans les escaliers ou les pentes : coxarthrose, Se 68 %, Sp 68 % (RV+ 2,1 ; RV− 0,47 ; Metcalfe 2019)." },
    assis: { info: "Une douleur aggravée en position assise oriente vers le conflit fémoro-acétabulaire, la tendinopathie proximale des ischio-jambiers ou le syndrome fessier profond ; non aggravée assis : critère de Bierma-Zeinstra pour la coxarthrose." },
    soulage_assis: { info: "Douleur soulagée en position assise : coxarthrose, Se 92 %, Sp 33 % ; son absence la rend moins probable (RV− 0,24)." },
    chaussettes: { info: "Difficulté à mettre chaussures et chaussettes : oriente vers la coxarthrose plutôt que le syndrome trochantérien (rapport de cotes 0,06 pour le syndrome trochantérien ; Fearon 2013)." },
    couche_cote: { info: "Douleur couché sur le côté atteint : typique du syndrome douloureux du grand trochanter." },
    atcd_fam_arthrose: { info: "Antécédent familial d'arthrose : RV+ 2,1 pour la coxarthrose radiographique (Metcalfe 2019)." },
    atcd_gonarthrose: { info: "Antécédent de gonarthrose : RV+ 2,1 pour la coxarthrose (Metcalfe 2019)." },
    squat_hanche: { info: "Douleur postérieure à l'accroupissement : RV+ 6,1 pour la coxarthrose (Se 24 %, Sp 96 %). L'accroupissement douloureux fait partie du cluster de Sutlive." },
    prom_ri: { info: "Rotation interne diminuée : coxarthrose (Se 66 %, Sp 79 %, RV+ 3,2) ; limitée en position neutre : conflit fémoro-acétabulaire (Sp 94 %, RV+ 4,8). 25° ou moins : critère du cluster de Sutlive." },
    prom_add: { info: "Adduction passive diminuée : Se 80 %, Sp 81 % pour la coxarthrose (RV+ 4,2 ; RV− 0,25)." },
    prom_abd: { info: "Abduction passive normale : rend la coxarthrose moins probable (RV− 0,26)." },
    douleur_aine_passive: { info: "Douleur inguinale en abduction ou adduction passive : RV+ 5,7 pour la coxarthrose (Se 33 %, Sp 94 %)." },
    rrom_abd: { info: "Faiblesse des abducteurs : coxarthrose (Se 44 %, Sp 90 %, RV+ 4,5) et tendinopathie glutéale (Se 80 %, Sp 71 % ; normale, RV− 0,28)." },
    rrom_derot: { info: "Hanche et genou à 90°, le patient résiste à la rotation externe ramenée vers le neutre. Tendinopathie glutéale : Se 88 %, Sp 97,3 % (Lequesne 2008, 17 patients).", positif: "douleur trochantérienne reproduite", video: "Resisted external derotation test" },
    appui_30s: { info: "Appui unipodal tenu 30 secondes : une douleur trochantérienne a une Sp de 97–100 % pour la tendinopathie glutéale (RV+ ≈ 12 ; Grimaldi 2017).", positif: "douleur latérale de hanche pendant les 30 s", video: "30 second single leg stance test" },
    trendelenburg: { info: "Tendinopathie glutéale : Se 72,7 %, Sp 76,9 % (RV+ 3,1 ; RV− 0,36). Peu reproductible." },
    fadir: { info: "Flexion, adduction et rotation interne. Conflit fémoro-acétabulaire ou lésion labrale : Se 94–99 %, Sp 5 % (méta-analyse de Reiman) : positif, il n'oriente presque pas.", positif: "douleur inguinale reproduite", video: "FADIR test" },
    scour: { info: "Compression axiale du fémur en flexion-adduction avec balayage. Critère du cluster de Sutlive (coxarthrose ; 4 sur 5 : RV+ 24,3).", positif: "douleur à l'aine ou à la hanche", video: "Scour test hip" },
    percussion: { info: "Stéthoscope sur la symphyse, percussion de la rotule de chaque côté : son atténué du côté fracturé. Fracture de hanche : Se 95 %, Sp 86 % (RV+ 6,8 ; RV− 0,06).", positif: "son plus faible du côté atteint", video: "Patellar pubic percussion test" },
    p_trochanter: { info: "Grand trochanter indolore : la tendinopathie glutéale est peu probable (Se 80 %) ; douloureux, peu spécifique." },
    p_inguinal: { info: "Douleur à la palpation du pli inguinal : coxarthrose, Se 60 %, Sp 75 % (RV+ 2,4). Critère de Bierma-Zeinstra." },
    p_adducteurs: { info: "Adducteurs indolores à la palpation : valeur prédictive négative de 91–96 % pour une lésion aiguë (IRM ; Serner 2016)." },
  };

  // Cluster de Sutlive (coxarthrose) et de Bierma-Zeinstra.
  const sutlive = L => [L.dans("squat_hanche", ["aine", "posterieure", "limite"]), L.oui("scour"), L.dans("arom_flexion", ["fin", "lim_douleur"]), L.dans("arom_extension", ["fin", "lim_douleur"]),
    L.v("prom_ri_deg") !== null && Number(L.v("prom_ri_deg")) <= 25];
  const bierma = L => [[L.age !== null && L.age > 60, L.age !== null], [L.v("duree") === "gt3m", L.repondu("duree")], [L.non("assis"), L.repondu("assis")],
    [L.oui("p_inguinal"), L.repondu("p_inguinal")], [L.dans("prom_re", lim), L.repondu("prom_re")]];

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "HANC-P1", cle: "coxarthrose|raideur|moins30", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P2", cle: "coxarthrose|raideur|aucune", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P3", cle: "sdgt|chaussettes>sdgt", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P4", cle: "sdgt|p_trochanter>sdgt", note: "OpenEvidence (24 nov. 2026) : RV+ 2,2, RV− 0,2 dans une étude cas-témoins (Ganderton 2017, surestimé) ; valeur plausible" },
    { code: "HANC-P5", cle: "adducteurs|p_adducteurs>adducteurs", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P6", cle: "adducteurs|rrom_add>adducteurs", note: "OpenEvidence (24 nov. 2026) : valeurs probablement tirées d'une autre cible (test de compression, ostéite pubienne, Verrall 2005)" },
    { code: "HANC-P7", cle: "cfa|localisation.aine>cfa", note: "OpenEvidence (24 nov. 2026) : seule la sensibilité est utilisable (87 %, Tijssen 2017)" },
    { code: "HANC-P8", cle: "cfa|clic>cfa", note: "OpenEvidence (24 nov. 2026) : clic, Se 57 % et RV− 0,43 (Tijssen 2017) ; l'élément combiné n'a pas été étudié" },
    { code: "HANC-P9", cle: "osteonecrose|fluoro_cortico>osteonecrose", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P10", cle: "sdgt|localisation.laterale>sdgt", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P11", cle: "ij_aigu|localisation.cuisse_post>ij_aigu", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P12", cle: "ij_aigu|p_ij>ij_aigu", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P13", cle: "psoas|ressaut>psoas", rvp: 1.33, rvn: 0.93, statut: "verifie", piste: "Haskel et coll., 2021 (Arthroscopy, PMID 33340679) : ressaut, Se 24 %, Sp 82 % ; référence : réponse à l'infiltration" },
    { code: "HANC-P14", cle: "meralgie|localisation.cuisse_lat_brulure>meralgie", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P15", cle: "meralgie|pelvic_comp>meralgie", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P16", cle: "osteite|localisation.pubis>osteite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P17", cle: "osteite|p_symphyse>osteite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P18", cle: "avulsion|p_epines>avulsion", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P19", cle: "ij_tendino|localisation.ischion>ij_tendino", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P20", cle: "epiphysiolyse|prom_ri|complete", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P21", cle: "epiphysiolyse|drehmann>epiphysiolyse", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P22", cle: "apophysite|localisation.crete>apophysite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P23", cle: "apophysite|p_crete>apophysite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P24", cle: "lombaire|deficit_l2l4>lombaire", note: "OpenEvidence (24 nov. 2026) : élément combiné non étudié ; composantes RV+ 2,3 à 7,7 et RV− 0,57 à 0,95" },
    { code: "HANC-P25", cle: "ppr|localisation.epaules>ppr", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "HANC-P26", cle: "ppr|raideur|plus30", rv: {"plus30": 1.8}, statut: "verifie", piste: "Dasgupta et coll., 2012 (Ann Rheum Dis, PMID 22388996) : raideur matinale de plus de 45 min, Se 77 %, Sp 57 % ; aucun seuil de 30 min publié" },
    { code: "HANC-P27", cle: "ppr|raideur_epaules>ppr", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
  ];
  window.Locomoteur.definir({
    revues: REVUES_OE,
    id: "hanche", partie: "hanche", en: "hip and groin", rc: "Douleur à la hanche",
    titre: "Douleur à la hanche ou à l'aine", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.hanche || {}).sources,

    diagnostics: [
      { id: "coxarthrose", nom: "Coxarthrose", n: "coxarthrose", base: [[12, .002], [30, .02], [45, .12], [60, .3], [75, .4], [90, .45]],
        repere: "Symptomatique 9,2 % après 45 ans ; 6,2 % après 60 ans ; 8 % à 35–70 ans (A, C)" },
      { id: "sdgt", nom: "Syndrome douloureux du grand trochanter (tendinopathie glutéale)", n: "syndrome douloureux du grand trochanter", base: [[12, .005], [25, .03], [40, .12], [55, .2], [70, .2], [85, .15]],
        sexe: { F: 2.2, M: .45 }, repere: "1,8–5,6/1 000/an ; 10–20 % des douleurs de hanche en médecine générale ; 17,6 % à 50–79 ans, femmes 23,5 % (A, C)" },
      { id: "adducteurs", nom: "Pubalgie des adducteurs", n: "pubalgie des adducteurs", base: [[12, .03], [18, .08], [25, .07], [40, .03], [60, .01]], sexe: { M: 1.8, F: .55 },
        repere: "Hanche et aine : 11 % des blessures sportives ; adducteurs 63–68 % des lésions hanche-aine du sportif (A, C)" },
      { id: "ij_aigu", nom: "Lésion aiguë des ischio-jambiers", n: "lésion des ischio-jambiers", base: [[12, .02], [18, .05], [30, .05], [45, .03], [60, .01]], sexe: { M: 1.4, F: .7 },
        repere: "19–24 % des blessures en football professionnel ; 37 % des lésions musculaires du sportif (A, C)" },
      { id: "fracture", grave: true, nom: "Fracture de la hanche (col ou massif trochantérien)", n: "fracture de la hanche", base: [[12, .003], [40, .003], [60, .01], [75, .05], [90, .1]], sexe: { F: 1.5, M: .7 },
        repere: "681/100 000 après 55 ans (A, C)" },
      { id: "cfa", nom: "Conflit fémoro-acétabulaire ou lésion du labrum", n: "conflit fémoro-acétabulaire", base: [[12, .008], [15, .03], [18, .07], [30, .08], [45, .04], [60, .01]],
        repere: "17 % des consultants pour douleur de hanche ; labrum : 22–55 % des hanches douloureuses mais 38–69 % des asymptomatiques (A)" },
      { id: "psoas", nom: "Ilio-psoas ou hanche à ressaut", n: "atteinte de l'ilio-psoas", base: [[12, .02], [20, .04], [35, .03], [60, .01]], repere: "12–36 % des douleurs inguinales du sportif (A)" },
      { id: "piriforme", nom: "Syndrome du piriforme (fessier profond)", n: "syndrome fessier profond", base: [[12, .003], [30, .02], [50, .03], [70, .02]], sexe: { F: 1.3, M: .8 }, repere: "6–8 % des sciatiques (A)" },
      { id: "meralgie", nom: "Méralgie paresthésique", n: "méralgie paresthésique", base: [[12, .002], [30, .01], [50, .02], [70, .01]], repere: "32,6/100 000 p-a (A)" },
      { id: "osteite", nom: "Ostéite pubienne (douleur pubienne de l'athlète)", n: "ostéite pubienne", base: [[12, .005], [18, .02], [30, .015], [45, .005]], sexe: { M: 2, F: .5 }, repere: "0,5–8 % des athlètes ; 9 % des lésions hanche-aine du sportif (A, C)" },
      { id: "parietale", nom: "Pubalgie pariétale (douleur inguinale de l'athlète)", n: "pubalgie pariétale", base: [[12, .005], [18, .02], [30, .02], [45, .005]], sexe: { M: 2.5, F: .4 }, repere: "2–5 % des blessures sportives ; 7 % chez le sportif (A, C)" },
      { id: "avulsion", nom: "Avulsion apophysaire du bassin (adolescent)", n: "avulsion apophysaire du bassin", base: [[12, .04], [14, .06], [16, .05], [19, .01], [25, .001]], sexe: { M: 1.8, F: .55 },
        repere: "56 % des lésions apophysaires du membre inférieur en académie de football ; épine iliaque antéro-inférieure 33–49 % (A, C)" },
      { id: "ij_tendino", nom: "Tendinopathie proximale des ischio-jambiers", n: "tendinopathie proximale des ischio-jambiers", base: [[12, .002], [25, .02], [40, .03], [60, .02]], repere: "Pas d'incidence ; coureurs (A)" },
      { id: "epiphysiolyse", grave: true, nom: "Épiphysiolyse fémorale supérieure", n: "épiphysiolyse fémorale supérieure", base: [[10, .02], [12, .03], [14, .025], [16, .008], [18, .001]], sexe: { M: 1.6, F: .6 },
        repere: "Environ 10,8/100 000 enfants (4,8 dans une autre série) (A, C)" },
      { id: "ff_col", grave: true, nom: "Fracture de stress du col ou de la diaphyse fémorale", n: "fracture de stress fémorale", base: [[12, .002], [18, .008], [30, .006], [50, .002]], sexe: { F: 1.8, M: .55 },
        repere: "Moins de 5 % des fractures de stress ; diaphyse : 14,3 % des lésions osseuses de fatigue du coureur (A, C)" },
      { id: "osteonecrose", grave: true, nom: "Ostéonécrose de la tête fémorale", n: "ostéonécrose de la tête fémorale", base: [[12, .001], [30, .005], [45, .008], [70, .006]], sexe: { M: 1.3, F: .8 },
        repere: "2,5/100 000 p-a ; 2ᵉ pic féminin vers 70 ans (A, C)" },
      { id: "apophysite", nom: "Apophysite de la crête iliaque", n: "apophysite de la crête iliaque", base: [[12, .02], [14, .03], [17, .015], [20, .002], [25, .0005]], repere: "5,5 % des diagnostics de surmenage chez l'enfant (C)" },
      { id: "contusion", nom: "Contusion de la cuisse ou de la crête iliaque", n: "contusion", base: [[12, .04], [20, .05], [40, .03], [70, .03]], repere: "18,2 % des blessures hanche-cuisse du sportif (C)" },
      { id: "bassin", grave: true, nom: "Fracture de fragilité du bassin ou du sacrum", n: "fracture de fragilité du bassin", base: [[12, .0005], [50, .001], [70, .01], [85, .03], [95, .04]], sexe: { F: 2, M: .5 },
        repere: "Jusqu'à 9,35/1 000 chez les femmes de 90 ans et plus (C)" },
      { id: "lombaire", nom: "Douleur projetée d'origine lombaire", n: "douleur projetée lombaire", base: [[12, .01], [30, .05], [50, .08], [70, .08]], repere: "Rang attribué par jugement clinique (A, C)" },
      { id: "ppr", grave: true, nom: "Polymyalgia rheumatica", n: "polymyalgia rheumatica", base: [[12, .0001], [50, .002], [65, .01], [80, .015]], sexe: { F: 1.5, M: .7 }, repere: "Sujet âgé (C)" },
    ],
    residuel: { id: "nonspec", nom: "Douleur non spécifique (aucun diagnostic précis)", n: "douleur de hanche non spécifique",
      explication: "Probabilité qu'aucun des diagnostics de la liste ne soit en cause : elle monte quand les éléments spécifiques sont absents ou négatifs. Penser à une cause viscérale (hernie, urologique, gynécologique) ou vasculaire.",
      conduite: [{ t: "Rassurer ; dosage de la charge ; réévaluer si la douleur persiste ou change" }, { t: "Revoir dans 4–6 sem ; examen abdominal, inguinal et lombaire si la douleur persiste" }] },
    compatibles: [["coxarthrose", "sdgt"], ["coxarthrose", "lombaire"], ["sdgt", "lombaire"], ["adducteurs", "osteite"], ["adducteurs", "parietale"], ["adducteurs", "psoas"], ["osteite", "parietale"],
      ["cfa", "psoas"], ["cfa", "adducteurs"], ["piriforme", "ij_tendino"], ["piriforme", "lombaire"], ["coxarthrose", "ppr"], ["sdgt", "ppr"], ["fracture", "bassin"], ["coxarthrose", "osteonecrose"]],

    grappes: [
      { id: "sutlive", dx: "coxarthrose", nom: "Cluster de Sutlive : 4 sur 5 ou plus", rv: 24.3, couvre: ["squat_hanche", "scour", "arom_flexion", "arom_extension", "prom_ri"], statut: "verifie",
        piste: `${SUTLIVE} : RV+ 24,3 (4,4–142,1), n = 72`, si: L => sutlive(L).filter(Boolean).length >= 4 },
      { id: "bierma_pos", dx: "coxarthrose", nom: "Cluster de Bierma-Zeinstra : 4 sur 5 ou plus", rv: 4.9, couvre: ["duree", "assis", "p_inguinal", "prom_re"], statut: "verifie",
        piste: `${METCALFE} : RV+ 4,9`, si: L => bierma(L).filter(x => x[0]).length >= 4 },
      { id: "bierma_neg", dx: "coxarthrose", nom: "Cluster de Bierma-Zeinstra : 1 sur 5 ou moins", rv: .24, couvre: ["duree", "assis", "p_inguinal", "prom_re"], statut: "verifie",
        piste: `${METCALFE} : RV− 0,24`, si: L => bierma(L).filter(x => x[1]).length >= 4 && bierma(L).filter(x => x[0]).length <= 1 },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Hanche atteinte", "Droite", "Gauche", { ppr: 5, coxarthrose: 1.3, sdgt: 1.3, osteite: 1.5, lombaire: 1.5, osteonecrose: 1.5, epiphysiolyse: 1.2,
          fracture: .05, ij_aigu: .1, avulsion: .1, contusion: .1, adducteurs: .5, cfa: .6, meralgie: .5, ff_col: .4, bassin: .5 }, "Douleur aux deux hanches"),
        C.accompagne(), C.refere(), C.travail({ physique: { coxarthrose: 1.3 } }), C.travailPrecision(),
        C.sport({ aucun: { adducteurs: .3, ij_aigu: .3, cfa: .6, osteite: .3, parietale: .3, avulsion: .4, ff_col: .4, psoas: .5 },
          course: { ij_aigu: 1.5, ij_tendino: 2, ff_col: 2.5, sdgt: 1.3, psoas: 1.3, apophysite: 1.5 },
          pivot: { adducteurs: 2.5, osteite: 2, parietale: 2.5, cfa: 1.5, ij_aigu: 1.8, avulsion: 1.8, psoas: 1.5 }, contact: { adducteurs: 2, parietale: 2, contusion: 2.5, osteite: 1.5 },
          danse: { cfa: 1.8, psoas: 2.5, avulsion: 1.3 }, glisse: { adducteurs: 1.3, contusion: 1.3 }, raquette: { adducteurs: 1.3 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(),
        ouiNon("atcd_fam_arthrose", "ATCD familial d'arthrose", { oui: "ATCD familial d'arthrose", non: "", effets: { coxarthrose: ver(.34, .84, `${METCALFE} : RV+ 2,1 (1,2–3,6)`) } }),
        ouiNon("atcd_gonarthrose", "Gonarthrose connue", { oui: "gonarthrose connue", non: "", effets: { coxarthrose: ver(.33, .84, `${METCALFE} : RV+ 2,1`) } }),
        ouiNon("atcd_hanche_enfance", "Maladie de la hanche dans l'enfance (dysplasie, Perthes, épiphysiolyse)", { oui: "ATCD de maladie de la hanche dans l'enfance", non: "",
          effets: { coxarthrose: p(2.5, .95), cfa: p(1.5, .95) } }),
        ouiNon("fluoro_cortico", "Fluoroquinolone ou corticoïde récents", { oui: "fluoroquinolone ou corticoïde récents", non: "",
          effets: { osteonecrose: { rvp: 5, rvn: .8, statut: "a_verifier", piste: "Fukushima et coll., 2013 (PMID 23450014) : corticoïdes, rapport de cotes 31,5 (facteur de risque, pas un RV)" } } }),
        C.atcdMedicaux(),
        ouiNon("obesite", "Obésité (IMC 30 ou plus)", { oui: "obésité", non: "", effets: { coxarthrose: p(1.5, .9), sdgt: p(1.5, .9), meralgie: p(2, .9) } }),
        ouiNon("osteoporose", "Ostéoporose ou fracture de fragilité", { oui: "ostéoporose", non: "", effets: { fracture: p(2, .9), bassin: p(3, .8) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux(), C.atcdRhumato("ppr", 1, 1),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ coxarthrose: p(.8, 1.3) }), C.depuis(), C.contexte(),
          C.duree({ lt7: { fracture: 3, ij_aigu: 3, adducteurs: 1.5, avulsion: 3, contusion: 3, bassin: 2, coxarthrose: .2, sdgt: .3, cfa: .3, osteite: .4, parietale: .4, ij_tendino: .2, meralgie: .5, lombaire: .6, osteonecrose: .5 },
            s1_6: { ff_col: 1.5, adducteurs: 1.3, ij_aigu: 1.2, psoas: 1.2, ppr: 1.5, fracture: .8, contusion: .8 },
            s6_12: { ff_col: 1.3, cfa: 1.2, sdgt: 1.2, osteite: 1.3, parietale: 1.3, ppr: 1.3, fracture: .3, contusion: .3, ij_aigu: .5 },
            gt3m: { coxarthrose: 2.5, sdgt: 2, cfa: 1.8, ij_tendino: 2, piriforme: 1.5, osteite: 1.5, parietale: 1.5, meralgie: 1.5, lombaire: 1.5, fracture: .05, contusion: .05, ij_aigu: .2, avulsion: .1 } }),
          C.apparition({ subit_trauma: { fracture: 5, ij_aigu: 5, avulsion: 5, contusion: 6, adducteurs: 2, bassin: 3, coxarthrose: .2, sdgt: .2, cfa: .5, osteite: .3, parietale: .4, ij_tendino: .3,
              piriforme: .4, meralgie: .3, lombaire: .4, osteonecrose: .3, epiphysiolyse: 1.5, ff_col: .3, ppr: .2, apophysite: .4 },
            subit: { osteonecrose: 2, ff_col: 2, bassin: 2, epiphysiolyse: 2, ppr: 2, contusion: .2 },
            graduel: { sdgt: 2, adducteurs: 2, osteite: 2.5, parietale: 2.5, ij_tendino: 2.5, psoas: 2, ff_col: 3, apophysite: 3, cfa: 2, epiphysiolyse: 1.5, fracture: .05, contusion: .05, avulsion: .2, ij_aigu: .2 },
            insidieux: { coxarthrose: 3, sdgt: 2, piriforme: 2, meralgie: 2, lombaire: 2, osteonecrose: 2, cfa: 1.5, ppr: 1.5, fracture: .05, contusion: .05, avulsion: .1, ij_aigu: .1 } }),
          choix("mecanisme", "Mécanisme", [
            o("chute", "Chute sur la hanche", { fracture: 5, bassin: 3, contusion: 2.5, ij_aigu: .3 }, { n: "chute sur la hanche" }),
            o("sprint", "Sprint, frappe ou contraction explosive", { ij_aigu: 4, avulsion: 4, adducteurs: 2, psoas: 1.5, fracture: .2 }, { n: "contraction explosive" }),
            o("ecart", "Grand écart ou étirement brusque", { ij_aigu: 3, adducteurs: 3, avulsion: 2 }, { n: "étirement brusque" }),
            o("coup", "Coup direct", { contusion: 5, fracture: 1.5 }, { n: "coup direct" })], { si: trauma, masqueSi: "contexte" }),
          ouiNon("pop_cuisse", "Claquement ou pop à l'arrière de la cuisse ou au bassin", { si: trauma, oui: "claquement", nie: "claquement", effets: { ij_aigu: p(4, .5), avulsion: p(3, .6) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("aine", "Aine", { coxarthrose: ver(.39, .74, `${METCALFE} : douleur inguinale`), cfa: { rvp: 2.5, rvn: .2, statut: "a_verifier", piste: `${TIJSSEN} : aine comme site principal chez 87 % (Sp non interprétable)` },
              psoas: p(2.5, .6), adducteurs: p(1.5, .7), parietale: p(2, .6), osteonecrose: p(2, .7), ff_col: p(2, .7), fracture: p(1.5, .8), sdgt: p(.4, 1.2) }, { n: "à l'aine" }),
            m("cuisse_med", "Face médiale de la cuisse (maximale)", { coxarthrose: ver(.12, .98, `${METCALFE} : douleur maximale à la face médiale de la cuisse, RV+ 7,8 (1,7–37)`), adducteurs: p(4, .4) }, { n: "à la face médiale de la cuisse" }),
            m("laterale", "Latérale, sur le grand trochanter", { sdgt: p(6, .2), coxarthrose: p(.8, 1), meralgie: p(1.2, 1), lombaire: p(1.2, 1) }, { n: "latérale, au grand trochanter" }),
            m("fesse", "Fesse", { piriforme: p(4, .5), lombaire: p(3, .5), ij_tendino: p(2, .7), sdgt: p(1.3, .9), coxarthrose: p(1.2, 1) }, { n: "à la fesse" }),
            m("ischion", "Ischion (os de la fesse en position assise)", { ij_tendino: p(6, .3), ij_aigu: p(2, .8), avulsion: p(2, .9), piriforme: p(1.5, .9) }, { n: "à l'ischion" }),
            m("cuisse_post", "Arrière de la cuisse", { ij_aigu: p(6, .3), ij_tendino: p(2, .8), lombaire: p(1.5, .9) }, { n: "à l'arrière de la cuisse" }),
            m("pubis", "Pubis (symphyse)", { osteite: p(6, .3), adducteurs: p(2, .7), bassin: p(1.5, .9) }, { n: "au pubis" }),
            m("crete", "Crête iliaque ou épine antérieure du bassin", { apophysite: p(5, .3), avulsion: p(4, .5), contusion: p(2, .8) }, { n: "à la crête iliaque" }),
            m("cuisse_lat_brulure", "Face antéro-latérale de la cuisse, brûlure ou engourdissement", { meralgie: p(10, .2), lombaire: p(1.5, .9) }, { n: "brûlure antéro-latérale de la cuisse" }),
            m("sous_genou", "Irradie sous le genou", { lombaire: p(4, .5), piriforme: p(1.5, .9), coxarthrose: p(.7, 1) }, { n: "irradiant sous le genou" }),
            m("epaules", "Aussi aux épaules ou au cou, avec raideur", { ppr: p(10, .3) }, { n: "aussi aux épaules" }),
          ], { gabarit: "douleur a/n {v}" }),
          C.type({ brulure: { meralgie: 3, lombaire: 2, piriforme: 1.5 }, choc: { lombaire: 2.5, piriforme: 1.5 }, sourde: { coxarthrose: 1.3, osteonecrose: 1.3 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("escaliers", "Pire dans les escaliers ou les pentes", { g: "facteurs", agg: "les escaliers et les pentes", aggNie: "aux escaliers",
            effets: { coxarthrose: ver(.68, .68, `${METCALFE} : RV+ 2,1 ; RV− 0,47`), sdgt: p(1.3, .9) } }),
          ouiNon("premiers_pas", "Douleur aux premiers pas après le repos", { g: "facteurs", agg: "les premiers pas après le repos", aggNie: "aux premiers pas",
            effets: { coxarthrose: ver(.92, .26, `${METCALFE} : RV+ 1,2 ; RV− 0,31`) } }),
          ouiNon("assis", "Pire en position assise prolongée", { agg: "la position assise prolongée", aggNie: "assis", effets: { cfa: p(2, .7), ij_tendino: p(3, .5), piriforme: p(3, .6), coxarthrose: p(.7, 1.1) } }),
          ouiNon("soulage_assis", "Soulagée en position assise", { oui: "soulagée en position assise", non: "", effets: { coxarthrose: ver(.92, .33, `${METCALFE} : RV+ 1,4 ; RV− 0,24`) } }),
          ouiNon("couche_cote", "Pire couché sur le côté atteint", { agg: "le décubitus latéral", aggNie: "couché sur le côté", effets: { sdgt: p(4, .3), coxarthrose: p(1.2, .95) } }),
          ouiNon("chaussettes", "Difficulté à mettre chaussures et chaussettes", { oui: "difficulté à mettre chaussures et chaussettes", nie: "difficulté à l'habillage",
            effets: { coxarthrose: p(2.5, .6), sdgt: { rvp: .3, rvn: 1.2, statut: "a_verifier", piste: `${FEARON} : rapport de cotes 0,06 pour le syndrome trochantérien (oriente vers la coxarthrose)` } } }),
          ouiNon("course_sport", "Pire à la course, au sprint ou aux changements de direction", { g: "facteurs", agg: "la course et les changements de direction", aggNie: "à la course",
            effets: { adducteurs: p(3, .4), osteite: p(3, .4), parietale: p(3, .4), ij_aigu: p(2, .6), ff_col: p(3, .4), cfa: p(1.5, .8), psoas: p(2, .7), apophysite: p(2.5, .6) } }),
          ouiNon("toux", "Pire à la toux ou à l'éternuement", { agg: "la toux", aggNie: "à la toux", effets: { parietale: p(4, .7), osteite: p(1.5, .95), lombaire: p(1.5, .95) } }),
          C.attenuants(),
          C.moment({ matin: { coxarthrose: 1.3, ppr: 3, osteonecrose: 1 }, soir: { sdgt: 1.3, adducteurs: 1.3 }, constante: { osteonecrose: 1.5, bassin: 1.5 } }),
          C.nocturne({ osteonecrose: p(2, .8), ff_col: p(1.5, .9), coxarthrose: p(1.3, .9), sdgt: p(1.5, .9), ppr: p(2, .8) }),
          C.raideur({ plus30: { ppr: 5 } }, [{ dx: "coxarthrose", rv: { moins30: 1.6, aucune: .8 }, statut: "a_verifier", piste: `${METCALFE} : raideur matinale de moins de 60 min, RV+ 1,5–1,7 (seuil différent de l'outil)` }]),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("clic", "Clic, accrochage ou blocage dans l'aine", { oui: "clic ou accrochage", nie: "clic", effets: { cfa: { rvp: 2, rvn: .8, statut: "a_verifier", piste: `${TIJSSEN} : clic 57 %, dérobade 28 %, blocage 26 % (Sp non interprétable)` }, psoas: p(3, .8) } }),
          ouiNon("ressaut", "Ressaut audible ou visible de la hanche", { oui: "ressaut de la hanche", nie: "ressaut", effets: { psoas: p(6, .7), sdgt: p(1.3, .95) } }),
          ouiNon("paresthesies", "Engourdissements ou picotements dans la jambe", { oui: "paresthésies", nie: "paresthésie", effets: { lombaire: p(4, .5), piriforme: p(3, .7), meralgie: p(3, .8) } }),
          ouiNon("douleur_dos", "Lombalgie", { oui: "lombalgie", nie: "lombalgie", effets: { lombaire: p(4, .4), piriforme: p(1.3, .95) } }),
          ouiNon("raideur_epaules", "Raideur matinale des épaules et du cou", { oui: "raideur des ceintures", nie: "raideur des ceintures", effets: { ppr: p(10, .2) } }),
          ouiNon("symptomes_acg", "Céphalée nouvelle, claudication de la mâchoire ou trouble visuel", { oui: "symptômes d'artérite temporale", nie: "symptôme d'artérite temporale", drapeau: true, effets: { ppr: p(3, .9) } }),
          C.autresArticulations({ ppr: p(2, .8) }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre(), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("prothese", "Prothèse de la hanche", {}, { n: "prothèse de la hanche" }), m("infiltration", "Infiltration ou chirurgie récente de la hanche", {}, { n: "infiltration récente" })]),
          ouiNon("selle", "Engourdissement en selle, trouble urinaire ou faiblesse progressive", { oui: "anesthésie en selle ou trouble sphinctérien", nie: "anesthésie en selle", drapeau: true }),
          ouiNon("appui_impossible", "Incapable de mettre du poids sur la jambe", { oui: "incapable de mettre du poids", nie: "incapacité à l'appui", drapeau: true,
            effets: { fracture: p(4, .3), ff_col: p(3, .7), epiphysiolyse: p(3, .8), bassin: p(2.5, .7), avulsion: p(1.5, .9) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        C.fonctionnel({ boiterie: { sdgt: 1.3, fracture: 2, epiphysiolyse: 3, osteonecrose: 1.5 }, appui: { fracture: 4, bassin: 2.5, ff_col: 2 }, rotext: { epiphysiolyse: 4, fracture: 2 } },
          { garder: ["demarche", "trendelenburg", "appui_uni"],
            ajouts: [choix("squat_hanche", "Accroupissement profond", [o("normal", "Normal et indolore", {}, { n: "accroupissement profond normal et indolore" }),
              o("aine", "Douleur à l'aine", { cfa: 1.8, psoas: 1.3 }, { n: "accroupissement douloureux à l'aine" }),
              o("posterieure", "Douleur postérieure (fesse)", {}, { n: "accroupissement douloureux en postérieur" }), o("limite", "Limité", { coxarthrose: 2 }, { n: "accroupissement limité" })],
              { ligneEx: "squat", effets: [{ dx: "coxarthrose", se: .24, sp: .96, pos: ["posterieure"], neg: ["normal"], statut: "verifie", piste: `${METCALFE} : douleur postérieure à l'accroupissement, RV+ 6,1` }] })],
            effets: { demarche: [{ dx: "coxarthrose", rv: { boiterie: 1.5, normale: .35 }, statut: "verifie", piste: `${METCALFE} : boiterie, Se 85 %, Sp 43 %` }],
              trendelenburg: [{ dx: "sdgt", rv: { positif: 3.1, negatif: .36 }, statut: "verifie", piste: `${GRIMALDI15} : Se 72,7 %, Sp 76,9 %` }],
              appui_uni: [{ dx: "sdgt", rv: { anormal: 2 } }] } }),
        { titre: "Palpation", res: PALP, toutNormal: true, labels: ["Douloureux", "Indolore"], questions: [
          ouiNon("p_trochanter", "Grand trochanter", { court: "grand trochanter", effets: { sdgt: { rvp: 1.6, rvn: .3, statut: "a_verifier", piste: `${GRIMALDI17} : Se 80 %, Sp faible ; indolore, la tendinopathie est peu probable` } } }),
          ouiNon("p_inguinal", "Pli inguinal", { court: "pli inguinal", effets: { coxarthrose: ver(.6, .75, `${METCALFE} : ligament inguinal douloureux, RV+ 2,4`), psoas: p(2, .7) } }),
          ouiNon("p_adducteurs", "Adducteurs (origine pubienne)", { court: "adducteurs", genre: "mp", effets: { adducteurs: { rvp: 3, rvn: .15, statut: "a_verifier", piste: `${SERNER} : indolores, valeur prédictive négative 91–96 % (lésion aiguë, IRM)` } } }),
          ouiNon("p_symphyse", "Symphyse pubienne", { court: "symphyse pubienne", genre: "f", effets: { osteite: p(5, .3), bassin: p(1.5, .9) } }),
          ouiNon("p_canal", "Canal inguinal (orifice superficiel)", { court: "canal inguinal", effets: { parietale: p(4, .4) } }),
          ouiNon("p_ischion", "Tubérosité ischiatique", { court: "tubérosité ischiatique", genre: "f", effets: { ij_tendino: p(4, .3), ij_aigu: p(2, .6), avulsion: p(2, .8) } }),
          ouiNon("p_ij", "Ischio-jambiers (corps musculaire)", { court: "ischio-jambiers", genre: "mp", effets: { ij_aigu: p(5, .3) } }),
          ouiNon("p_epines", "Épines iliaques antérieures (supérieure, inférieure)", { court: "épines iliaques antérieures", genre: "fp", effets: { avulsion: p(5, .3), meralgie: p(1.5, .9) } }),
          ouiNon("p_crete", "Crête iliaque", { court: "crête iliaque", genre: "f", effets: { apophysite: p(5, .3), contusion: p(2, .8) } }),
          ouiNon("p_fessier", "Région fessière profonde (piriforme)", { court: "région fessière profonde", genre: "f", effets: { piriforme: p(4, .4), ij_tendino: p(1.3, .95) } }),
          ouiNon("p_psoas", "Ilio-psoas (sous le ligament inguinal)", { court: "ilio-psoas", effets: { psoas: p(3, .5) } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_flexion", "Flexion active", "flexion", { lim_douleur: { coxarthrose: 1.5, cfa: 1.5 }, lim_raideur: { coxarthrose: 2 }, fin: { cfa: 1.5 } }),
          C.amplitude("arom_extension", "Extension active", "extension", { lim_douleur: { coxarthrose: 1.3, psoas: 1.5 }, lim_raideur: { coxarthrose: 1.5 } }),
        ] },
        { titre: "PROM", toutNormal: true, questions: [
          C.amplitude("prom_ri", "Rotation interne passive (90° de flexion)", "rotation interne", { fin: { cfa: 1.5, coxarthrose: 1.2 } }, false,
            [{ dx: "coxarthrose", se: .66, sp: .79, pos: lim, neg: ["complete"], statut: "verifie", piste: `${METCALFE} : rotation interne diminuée, RV+ 3,2` },
              { dx: "cfa", se: .29, sp: .94, pos: lim, neg: ["complete"], statut: "verifie", piste: `${PALSSON} : rotation interne limitée en position neutre, RV+ 4,8` },
              { dx: "epiphysiolyse", rv: { lim_douleur: 4, lim_raideur: 4, complete: .2 } }, { dx: "osteonecrose", rv: { lim_douleur: 2 } }]),
          C.degres("prom_ri", "Rotation interne mesurée"),
          C.amplitude("prom_re", "Rotation externe passive", "rotation externe", { lim_douleur: { coxarthrose: 2 }, lim_raideur: { coxarthrose: 2.5 } }),
          C.amplitude("prom_add", "Adduction passive", "adduction", {}, false, [{ dx: "coxarthrose", se: .8, sp: .81, pos: lim, neg: ["complete"], statut: "verifie", piste: `${METCALFE} : adduction passive diminuée, RV+ 4,2 ; RV− 0,25` }]),
          C.amplitude("prom_abd", "Abduction passive", "abduction", { lim_douleur: { adducteurs: 2 } }, false,
            [{ dx: "coxarthrose", se: .88, sp: .46, pos: lim, neg: ["complete"], statut: "verifie", piste: `${METCALFE} : abduction normale, RV− 0,26` }]),
          ouiNon("douleur_aine_passive", "Douleur à l'aine en abduction ou adduction passive", { oui: "douleur inguinale en abduction ou adduction passive", non: "",
            effets: { coxarthrose: ver(.33, .94, `${METCALFE} : RV+ 5,7`) } }),
        ] },
        { titre: "RROM", toutNormal: true, questions: [
          choix("rrom_abd", "Abduction résistée", [o("normale", "Forte et indolore", {}, { n: "abduction résistée forte et indolore" }), o("douleur", "Douloureuse", { sdgt: 3 }, { n: "abduction résistée douloureuse" }),
            o("faiblesse", "Faible", {}, { n: "abduction résistée faible" })], { effets: [
              { dx: "sdgt", se: .8, sp: .71, pos: ["faiblesse"], neg: ["normale"], statut: "verifie", piste: `${GRIMALDI15} : force des abducteurs diminuée, RV+ 2,8 ; RV− 0,28` },
              { dx: "coxarthrose", se: .44, sp: .9, pos: ["faiblesse"], neg: ["normale", "douleur"], statut: "verifie", piste: `${METCALFE} : faiblesse des abducteurs, RV+ 4,5` }] }),
          ouiNon("rrom_add", "Adduction résistée", { court: "adduction résistée", genre: "f", oui: "adduction résistée douloureuse", non: "adduction résistée indolore",
            effets: { adducteurs: { rvp: 4, rvn: .5, statut: "a_verifier", piste: `${SERNER} : valeur prédictive positive 80–81 % (lésion aiguë)` }, osteite: p(1.5, .9) } }),
          ouiNon("rrom_flexion", "Flexion résistée de la hanche", { court: "flexion résistée", genre: "f", oui: "flexion résistée douloureuse", non: "flexion résistée indolore", effets: { psoas: p(3, .5), avulsion: p(2, .8), cfa: p(1.3, .9) } }),
          ouiNon("rrom_ij", "Flexion résistée du genou (ischio-jambiers)", { court: "flexion résistée du genou", genre: "f", oui: "flexion résistée du genou douloureuse", non: "flexion résistée du genou indolore",
            effets: { ij_aigu: p(4, .3), ij_tendino: p(2.5, .5) } }),
          ouiNon("rrom_derot", "Dérotation externe résistée", { court: "dérotation externe résistée", genre: "f", oui: "dérotation externe résistée douloureuse", non: "dérotation externe résistée indolore",
            effets: { sdgt: ver(.88, .973, LEQUESNE) } }),
        ] },
        { titre: "Tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("fadir", "FADIR", { court: "FADIR", effets: { cfa: ver(.96, .05, `${REIMAN15} : Se 94–99 %, Sp 5 %`) } }),
          ouiNon("scour", "Scour test", { court: "Scour test", effets: { coxarthrose: p(2, .6) } }),
          ouiNon("faber", "FABER (Patrick)", { court: "FABER", effets: { cfa: p(1.5, .8), coxarthrose: p(1.3, .9), lombaire: p(1.2, 1) } }),
          ouiNon("appui_30s", "Appui unipodal 30 s : douleur trochantérienne", { court: "appui unipodal 30 s", horsNormal: true,
            effets: { sdgt: verRv(12, undefined, `${GRIMALDI17} : Sp 100 %, RV+ ≈ 12 (Lequesne 2008 : Se 100 %, Sp 97,3 %, n = 17)`) } }),
          ouiNon("drehmann", "Drehmann (rotation externe obligatoire à la flexion)", { court: "signe de Drehmann", horsNormal: true, effets: { epiphysiolyse: p(15, .3), cfa: p(1.3, .95) },
            info: "Hanche fléchie passivement : la cuisse part d'elle-même en rotation externe. Évocateur d'épiphysiolyse chez l'adolescent.", video: "Drehmann sign" }),
          ouiNon("percussion", "Percussion pubo-patellaire", { court: "percussion pubo-patellaire", genre: "f", horsNormal: true, effets: { fracture: ver(.95, .86, `${REIMAN13} : RV+ 6,8 ; RV− 0,06`) } }),
          ouiNon("lasegue", "Lasègue ou slump", { court: "Lasègue", effets: { lombaire: p(4, .5), piriforme: p(1.5, .9), ij_aigu: p(1.3, .95) } }),
          ouiNon("pelvic_comp", "Compression du nerf cutané latéral (sous l'épine iliaque antéro-supérieure)", { court: "compression du nerf cutané latéral", genre: "f", horsNormal: true, effets: { meralgie: p(5, .4) } }),
        ] },
        { fin: true, questions: C.controlateral() },
        { titre: "Lombaire et neuro", adjacent: "lombaire", sansCote: true, toutNormal: true, questions: [
          choix("lombaire_mob", "Lombaire : mobilité", [o("normale", "Indolore", {}, { n: "mobilité indolore" }), o("douleur", "Douleur reproduite", { lombaire: 4 }, { n: "douleur reproduite à la mobilisation" })]),
          ouiNon("deficit_l2l4", "Déficit de force, de sensibilité ou de réflexe L2–L4", { oui: "déficit L2–L4", non: "force, sensibilité et réflexes L2–L4 normaux", effets: { lombaire: p(5, .8) } }),
        ] },
        { titre: "Genou", adjacent: "genou", toutNormal: true, questions: [
          choix("genou_mob", "Genou : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation du genou indolore" }), o("douleur", "Douloureuse", {}, { n: "mobilisation du genou douloureuse" })]),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      C.regles.septique("une hanche", [], [["appui_impossible", ["oui"]]]),
      L => ((L.trauma() || L.age >= 65) && (L.oui("appui_impossible") || L.oui("percussion") || L.v("demarche") === "appui" || (L.v("demarche") === "rotext" && L.age >= 50)))
        ? { niveau: "urgence", titre: "Fracture de la hanche à éliminer", ro: "fracture de la hanche", texte: "Appui impossible, percussion pubo-patellaire positive ou membre en rotation externe après une chute.",
          conduite: items(5) } : null,
      L => (L.age !== null && L.age >= 9 && L.age <= 16 && (L.dans("prom_ri", ["lim_douleur", "lim_raideur"]) || L.oui("drehmann") || L.v("demarche") === "rotext" || L.oui("appui_impossible") || (!L.trauma() && L.dans("demarche", ["boiterie"]))))
        ? { niveau: "urgence", titre: "Épiphysiolyse fémorale supérieure à éliminer", ro: "épiphysiolyse fémorale supérieure", texte: "Adolescent avec boiterie, rotation interne limitée ou pied en rotation externe ; la douleur est parfois au genou.",
          conduite: items(17) } : null,
      L => (!L.trauma() && (L.oui("course_sport") || L.a("sport", "course")) && L.a("localisation", "aine") && (L.oui("nocturne") || L.oui("appui_impossible") || L.dans("prom_ri", ["lim_douleur"])))
        ? { niveau: "rapide", titre: "Fracture de stress du col fémoral à éliminer", ro: "fracture de stress du col fémoral", texte: "Coureur avec douleur inguinale d'effort, nocturne ou à l'appui : une fracture du côté en tension est une urgence orthopédique.",
          conduite: items(19) } : null,
      L => (L.oui("fluoro_cortico") && L.a("localisation", "aine") && !L.trauma())
        ? { niveau: "considerer", titre: "Ostéonécrose de la tête fémorale à éliminer", ro: "ostéonécrose de la tête fémorale", texte: "Corticoïdes (ou alcool régulier) et douleur inguinale.", conduite: items(20) } : null,
      L => ((L.oui("raideur_epaules") || L.a("localisation", "epaules")) && L.age !== null && L.age >= 50)
        ? { niveau: L.oui("symptomes_acg") ? "urgence" : "rapide", titre: L.oui("symptomes_acg") ? "Artérite à cellules géantes à éliminer" : "Polymyalgia rheumatica à considérer", ro: L.oui("symptomes_acg") ? "artérite à cellules géantes" : "polymyalgia rheumatica",
          texte: "50 ans et plus, douleur et raideur des ceintures. Claudication de la mâchoire : RV+ 4,9 pour l'artérite à cellules géantes.", conduite: [...(L.oui("symptomes_acg") ? [{ t: "Céphalée, claudication de la mâchoire ou trouble visuel : prednisone et évaluation le jour même (risque de cécité)" }] : []), ...items(26)] } : null,
      L => (L.oui("selle") ? { niveau: "urgence", titre: "Syndrome de la queue de cheval à éliminer", ro: "syndrome de la queue de cheval", texte: "Anesthésie en selle, trouble urinaire ou faiblesse progressive.",
        conduite: [{ t: "Urgence : IRM lombaire le jour même" }] } : null),
      L => ((L.oui("osteoporose") || L.age >= 70) && (L.a("localisation", "pubis") || L.a("localisation", "fesse")) && (L.oui("appui_impossible") || L.dans("apparition", ["subit", "subit_trauma"])))
        ? { niveau: "rapide", titre: "Fracture de fragilité du bassin ou du sacrum à éliminer", ro: "fracture de fragilité du bassin", texte: "Sujet âgé ou ostéoporotique, douleur pubienne ou fessière brutale.", conduite: items(24) } : null,
      L => ((L.oui("deficit_l2l4") || L.oui("lasegue") || L.a("localisation", "sous_genou")) ? { niveau: "considerer", titre: "Origine lombaire à considérer", ro: "douleur projetée lombaire", texte: "Irradiation sous le genou, signes neurologiques ou test de tension neurale positif.", conduite: items(25) } : null),
      C.regles.tumeur("Radiographie du bassin et de la hanche."),
    ],
  });
})();
