/* Locomoteur Morand, épaule (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), parties A à H ;
   tests surtout d'après Hermans et coll., 2013, JAMA (examen clinique rationnel). « Myalgie ou douleur non spécifique » tient
   lieu de douleur non spécifique : pas de reste calculé. Format : p() provisoire, est() à vérifier, ver()/verRv() vérifié. */
(function () {
  "use strict";
  const { p, est, o, m, ouiNon, choix, multi, texte } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), PALP = "palp", TEST = "test";
  const HERMANS = "Hermans et coll., 2013, JAMA (examen clinique rationnel, coiffe)", PARK = "Park et coll., 2005, J Bone Joint Surg Am (PMID 15995110)";
  const MICHENER = "Michener et coll., 2009, Arch Phys Med Rehabil (PMID 19887215)", LITAKER = "Litaker et coll., 2000, J Am Geriatr Soc", FARBER = "Farber et coll., 2006, J Bone Joint Surg Am (PMID 16818971)";
  const LO = "Lo et coll., 2004, Am J Sports Med", MALL = "Mall et coll., 2013, Am J Sports Med", HOLTBY = "Holtby et Razmjou, 2004, Arthroscopy (PMID 15007311)";
  const BARTH = "Barth et coll., 2006, Arthroscopy (PMID 17027405)", DEAN = "Dean et coll., 2023, Am J Sports Med (O'Brien, 2 621 patients)", CADOGAN = "Cadogan et coll., 2013, BMC Musculoskelet Disord (PMID 23634871)";
  const ENGER = "Enger et coll., 2025, BMC Musculoskelet Disord (traumatisme aigu, IRM)", GLOVER = "Glover et coll., 2026, J Telemed Telecare";
  const lim = ["lim_douleur", "lim_raideur"];

  const ANGLAIS = { sous_acro: "subacromial pain or rotator cuff tendinopathy", myalgie: "non-specific shoulder pain or muscle strain", capsulite: "adhesive capsulitis (frozen shoulder)",
    ac_entorse: "acromioclavicular joint sprain or separation", rupture: "full-thickness rotator cuff tear", dyskinesie: "scapular dyskinesis", fracture_hp: "proximal humerus fracture",
    clavicule: "clavicle fracture", omarthrose: "glenohumeral osteoarthritis", calcifiante: "calcific tendinopathy of the rotator cuff", instab_ant: "anterior shoulder dislocation or instability",
    ac_arthrose: "acromioclavicular osteoarthritis or distal clavicle osteolysis", ppr: "polymyalgia rheumatica", biceps: "long head of biceps tendinopathy or rupture",
    cervical: "shoulder pain referred from the cervical spine", slap: "SLAP lesion", instab_post: "posterior or multidirectional shoulder instability" };

  const CONDUITES = C.aideMemoire("epaule", { sous_acro: 1, myalgie: 2, capsulite: 3, ac_entorse: 4, rupture: 5, dyskinesie: 6, fracture_hp: 7, clavicule: 8, omarthrose: 9, calcifiante: 10,
    instab_ant: 11, ac_arthrose: [12, 17], ppr: 13, biceps: 14, cervical: 15, slap: 16, instab_post: 19 });
  const items = ref => C.aideMemoire("epaule", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("epaule"),
    { titre: "Pour tous", items: [{ t: "Enseignement : nature de l'atteinte, pronostic, autogestion ; garder l'épaule active dans la zone indolore" },
      { t: "Consignes de reconsultation : fièvre, épaule chaude et enflée, faiblesse soudaine, engourdissement du bras, douleur thoracique ou dyspnée" }] }];

  const INFOS = {
    lateralite: { info: "Pour la note ; l'épaule dominante est plus souvent atteinte par les tendinopathies de surcharge." },
    deboitement: { info: "Sensation que l'épaule sort de place : instabilité antérieure (jeune âge, luxation antérieure et début soudain sont des prédicteurs indépendants)." },
    clic_epaule: { info: "Craquement, clic ou accrochage : RV+ 2,0 pour une lésion labrale ; avec un anterior slide positif, RV+ 6,0 pour une lésion SLAP II–IV. Un antécédent de traumatisme seul n'oriente pas (RV+ 0,79)." },
    nocturne: { info: "Douleur nocturne : presque toujours présente dans les ruptures de coiffe (Se > 97 %) mais très peu spécifique ; elle compte dans le score de Litaker avec l'âge de 65 ans et plus et la faiblesse en rotation externe." },
    arc: { info: "Douleur entre 60° et 120° d'abduction active. Pathologie de la coiffe : Se 71 %, Sp 81 % (RV+ 3,7 ; absent, RV− 0,36). Fait partie des grappes de Park et de Michener.", positif: "douleur dans l'arc moyen, moindre au-delà de 120°", video: "Painful arc test" },
    hawkins: { info: "Flexion à 90°, coude fléchi, rotation interne forcée : Se 76 %, Sp 48 % (RV+ 1,5) : peu utile seul.", positif: "douleur antéro-latérale", video: "Hawkins Kennedy test" },
    neer: { info: "Élévation passive en rotation interne, scapula stabilisée : RV+ 0,98–1,6 : peu utile seul.", video: "Neer test" },
    drop_arm: { info: "Abaisser lentement le bras depuis 90° d'abduction. Fait partie de la grappe de Park pour la rupture (arc douloureux, drop-arm, faiblesse en rotation externe).", positif: "le bras tombe ou ne peut être contrôlé", video: "Drop arm test" },
    er_lag: { info: "Bras placé en rotation externe maximale, coude à 90° : le patient ne peut la maintenir. Rupture transfixiante : Se 47 %, Sp 94 % (RV+ 7,2).", positif: "le bras revient en rotation interne de plus de 5°", video: "External rotation lag sign" },
    ir_lag: { info: "Main décollée du dos (lift-off maintenu). Rupture du sous-scapulaire : Se 97 %, Sp 83 % (RV+ 5,6 ; négatif, RV− 0,04).", positif: "la main retombe sur le dos", video: "Internal rotation lag sign" },
    belly_press: { info: "Main sur le ventre, pousser sans reculer le coude. Sous-scapulaire : Se 40 %, Sp 97,9 % (RV+ 19) ; bear-hug : Se 60 %, Sp 91,7 % (RV+ 7,2).", positif: "le coude recule ou le poignet fléchit", video: "Belly press test" },
    bear_hug: { info: "Main sur l'épaule opposée, résister au soulèvement. Rupture du sous-scapulaire : Se 60 %, Sp 91,7 % (RV+ 7,2).", video: "Bear hug test" },
    apprehension: { info: "Abduction à 90° et rotation externe progressive. Critère : appréhension (pas la douleur). Instabilité antérieure : Se 72 %, Sp 96 % (RV+ 20,2).", positif: "appréhension, crainte de luxation", video: "Apprehension test shoulder" },
    relocation: { info: "Même position, poussée postérieure sur la tête humérale : l'appréhension disparaît. Se 81 %, Sp 92 % (RV+ 10,4 ; RV− 0,21).", positif: "soulagement de l'appréhension", video: "Relocation test" },
    surprise: { info: "Relâcher la poussée postérieure : retour brusque de l'appréhension. Se 63,9 %, Sp 98,9 %.", video: "Surprise release test" },
    sulcus: { info: "Traction vers le bas du bras le long du corps : creux sous l'acromion. Instabilité (multidirectionnelle) : Se 31 %, Sp 89 % (RV+ 2,8).", video: "Sulcus sign" },
    obrien: { info: "Flexion 90°, adduction 10°, rotation interne, résister vers le bas. Lésion SLAP : RV+ 1,37 (peu utile) ; douleur au sommet de l'épaule (acromio-claviculaire) : Se 41 %, Sp 95 % (RV+ 8,2).", video: "O'Brien test" },
    add_horiz: { info: "Adduction horizontale passive (cross-body). Acromio-claviculaire : Se 77 %, Sp 79 % (RV+ 3,7).", positif: "douleur à l'acromio-claviculaire", video: "Cross body adduction test" },
    ext_ac: { info: "Extension résistée, bras à 90° en rotation interne. Acromio-claviculaire : Se 72 %, Sp 85 % (RV+ 4,8). Les trois tests acromio-claviculaires positifs : RV+ 8,3.", video: "AC resisted extension test" },
    speed: { info: "Flexion résistée, coude tendu, avant-bras en supination. Long biceps : Se 32 %, Sp 75 % (RV+ 1,28) : peu utile.", video: "Speed test" },
    yergason: { info: "Supination résistée, coude à 90°. Long biceps : Se 43 %, Sp 79 % (RV+ 2,05).", video: "Yergason test" },
    uppercut: { info: "Bras le long du corps, coude fléchi à 90°, avant-bras en supination, poing fermé : le patient fait un « uppercut » rapide vers le menton contre la résistance de l'examinateur. Positif : douleur (ou ressaut douloureux) à l'avant de l'épaule. Long biceps : RV+ 3,38 (Kibler 2009, n = 101) ; négatif, RV− 0,26 (Cardoso 2019). À vérifier : une autre source donne Se 77 %, Sp 80 %.", positif: "douleur à l'avant de l'épaule", video: "Upper cut test" },
    biceps_load: { info: "Abduction 120°, rotation externe maximale, flexion résistée du coude. Lésion SLAP : RV+ 1,7 ; RV− 0,39 (étude indépendante).", video: "Biceps load test II" },
    prom_re: { info: "Perte de rotation externe passive : critère définitionnel de la capsulite (aucune valeur diagnostique mesurable). Complète et indolore, elle écarte la capsulite : la raideur racontée et les limitations actives ou passives ne plaident alors plus pour elle (règle de définition) ; une rotation externe passive douloureuse correspond à une capsulite dans 75 % des cas et à une arthrose gléno-humérale dans les autres, d'où la radiographie. Moins de 30° : RV+ 3,3 pour l'arthrose." },
    prom_flex: { info: "Flexion passive de moins de 120° : RV+ 6,87 pour l'arthrose gléno-humérale (IRM)." },
    habillage_matin: { info: "Raideur du matin qui gêne pour s'habiller (enfiler un manteau, attacher le soutien-gorge, se peigner) : évoque une polymyalgia rheumatica, surtout aux deux épaules et aux hanches après 50 ans, ou une capsulite. Aucune donnée publiée sur sa valeur diagnostique : pour la note, sans effet sur le calcul." },
    arom_abd: { info: "Abduction active dans le plan de l'omoplate. Une abduction active limitée avec une abduction passive complète oriente vers la coiffe (douleur ou rupture) plutôt que vers une raideur capsulaire. Pour la note, sans effet sur le calcul (aucune valeur publiée)." },
    arom_ri: { info: "Main dans le dos : noter le niveau vertébral atteint par le pouce (normal vers T7). La rotation interne se perd tôt dans la capsulite et l'arthrose. Pour la note, sans effet sur le calcul (aucune valeur publiée)." },
    prom_abd: { info: "Abduction passive, omoplate stabilisée. Patron capsulaire : rotation externe plus limitée que l'abduction, elle-même plus que la rotation interne. Pour la note, sans effet sur le calcul (aucune valeur publiée)." },
    prom_ri: { info: "Rotation interne passive à 90° d'abduction, omoplate stabilisée (normale vers 70°). Pour la note, sans effet sur le calcul (aucune valeur publiée)." },
    rrom_re: { info: "Rotation externe résistée douloureuse ou faible : pathologie de coiffe (Se 63 %, Sp 75 %, RV+ 2,6). Faiblesse : rupture de coiffe (RV+ 1,78 ; après un traumatisme aigu, RV+ 4,7)." },
    p_ac: { info: "Acromio-claviculaire indolore : la douleur acromio-claviculaire est peu probable (Se 96 %) ; douloureuse, peu spécifique." },
    abd90_trauma: { info: "Après un traumatisme aigu à radiographie normale, l'abduction au-delà de 90° impossible a Se 84 %, Sp 71 % pour une rupture transfixiante ou une fracture occulte (soins primaires, IRM)." },
  };

  // Grappes : Park, Michener, Litaker, acromio-claviculaire.
  const parkConflit = L => [L.oui("hawkins"), L.oui("arc"), L.dans("rrom_re", ["douleur", "faiblesse"])];
  const parkRupture = L => [L.oui("arc"), L.oui("drop_arm"), L.dans("rrom_re", ["faiblesse"])];
  const michener = L => [L.oui("neer"), L.oui("hawkins"), L.oui("arc"), L.dans("jobe", ["douleur", "faiblesse"]), L.dans("rrom_re", ["douleur", "faiblesse"])];
  const michenerEval = L => ["neer", "hawkins", "arc", "jobe", "rrom_re"].filter(id => L.repondu(id)).length;
  const litaker = L => [L.age !== null && L.age >= 65, L.oui("nocturne"), L.dans("rrom_re", ["faiblesse"])];
  const ac3 = L => [L.oui("add_horiz"), L.oui("ext_ac"), L.oui("obrien_ac")];

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "EPAU-P1", cle: "sous_acro|neer>sous_acro", se: 0.73, sp: 0.52, statut: "verifie", piste: "Zhao et coll., 2024 (BMC Musculoskelet Disord, méta-analyse, 7 études, 960 patients) : Neer, Se 73 %, Sp 52 %, RV+ 1,54, RV− 0,47" },
    { code: "EPAU-P2", cle: "grappe|park_conflit", note: "OpenEvidence (24 nov. 2026) : probabilité post-test de 95 % confirmée (Park 2005) ; RV non vérifiable dans le résumé" },
    { code: "EPAU-P3", cle: "capsulite|diabete>capsulite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P4", cle: "grappe|park_rupture", note: "OpenEvidence (24 nov. 2026) : probabilité post-test de 91 % confirmée (Park 2005) ; RV non vérifiable dans le résumé" },
    { code: "EPAU-P5", cle: "dyskinesie|dyskinesie_vue>dyskinesie", note: "OpenEvidence (24 nov. 2026) : Se 76 % contre la cinématique 3D (Uhl 2009) ; asymétrie aussi fréquente chez les sujets sans douleur" },
    { code: "EPAU-P6", cle: "ac_arthrose|localisation.sous_coude>ac_arthrose", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P7", cle: "ac_arthrose|p_ac>ac_arthrose", note: "OpenEvidence (24 nov. 2026) : Se 96 %, spécificité « faible » (Walton 2004) ; le RV− de 0,1 est probablement mal attribué" },
    { code: "EPAU-P8", cle: "capsulite|raideur_prog>capsulite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P9", cle: "capsulite|arom_elev|complete", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P10", cle: "capsulite|arom_re|complete", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P11", cle: "capsulite|prom_re|complete", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P12", cle: "capsulite|prom_re|lim_douleur", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P13", cle: "capsulite|prom_re|lim_raideur", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P14", cle: "ac_entorse|marche_ac>ac_entorse", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P15", cle: "ac_entorse|p_ac>ac_entorse", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P16", cle: "clavicule|p_clavicule>clavicule", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P17", cle: "instab_ant|atcd_luxation>instab_ant", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P18", cle: "instab_ant|deboitement>instab_ant", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P19", cle: "instab_ant|deformation>instab_ant", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P20", cle: "ac_arthrose|localisation.sommet>ac_arthrose", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P21", cle: "ppr|localisation.deux_epaules>ppr", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P22", cle: "ppr|raideur|plus30", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P23", cle: "ppr|raideur_ceintures>ppr", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P24", cle: "biceps|popeye>biceps", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P25", cle: "cervical|localisation.sous_coude>cervical", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P26", cle: "cervical|cou_aggrave>cervical", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "EPAU-P27", cle: "cervical|paresthesies>cervical", note: "OpenEvidence (24 nov. 2026) : Se d'au moins 80 % en clinique spécialisée ; RV+ inférieur à 5, RV− supérieur à 0,2" },
    { code: "EPAU-P28", cle: "cervical|deficit_c5c6>cervical", note: "OpenEvidence (24 nov. 2026) : élément combiné non étudié ; composantes RV+ 1,2 à 4,9 (faiblesse du biceps 3,7 ; réflexe bicipital 4,9)" },
  ];
  window.Locomoteur.definir({
    frequencesRevues: { date: "2026-11-24", source: "outils/locomoteur/sources/openevidence-reponses/2026-11-24-cervical-epaule-coude-poignet.md", verdict: "Aucune courbe confirmée ; rapports femmes-hommes et quelques fréquences corrigés là où des données publiées les contredisent" },
    revues: REVUES_OE,
    id: "epaule", partie: "épaule", en: "shoulder", rc: "Douleur à l'épaule",
    titre: "Douleur à l'épaule", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.epaule || {}).sources,

    diagnostics: [
      { id: "sous_acro", nom: "Douleur sous-acromiale (tendinopathie de la coiffe)", n: "douleur sous-acromiale", base: [[12, .08], [20, .15], [35, .3], [50, .35], [65, .3], [80, .25]],
        repere: "29 % des nouveaux cas en médecine générale ; 65–85 % selon le contexte (A, C)" },
      { id: "myalgie", nom: "Myalgie ou douleur non spécifique", n: "douleur d'épaule non spécifique", base: [[12, .25], [20, .2], [35, .15], [50, .1], [70, .06]],
        repere: "17 % des diagnostics ; le plus fréquent avant 40 ans ; 24 % chez l'adolescent (cervico-scapulaire) (A, C)" },
      { id: "capsulite", nom: "Capsulite adhésive", n: "capsulite adhésive", base: [[12, .001], [35, .02], [45, .08], [55, .1], [65, .06], [80, .03]], sexe: { F: 1.4, M: .7 },
        repere: "2,4/1 000/an ; prévalence 2–5 % (10–35 % chez le diabétique) ; surtout entre 40 et 70 ans (A, C)" },
      { id: "ac_entorse", nom: "Entorse ou luxation acromio-claviculaire", n: "entorse acromio-claviculaire", base: [[12, .04], [18, .08], [30, .06], [50, .03], [70, .02]], sexe: { M: 2, F: .5 },
        repere: "11 % des traumatismes aigus ; 25,6 % des lésions d'épaule NCAA, 41,2 % en sport de collision (A, C)" },
      { id: "rupture", nom: "Rupture transfixiante de la coiffe", n: "rupture transfixiante de la coiffe", base: [[12, .002], [40, .02], [55, .06], [65, .12], [75, .2], [85, .25]],
        repere: "Environ 30 % après 70 ans, la moitié asymptomatique ; 10,7 % à 50–59 ans, 36,6 % après 80 ans (A, C)" },
      { id: "dyskinesie", nom: "Dyskinésie scapulaire", n: "dyskinésie scapulaire", base: [[12, .03], [20, .04], [35, .03], [55, .02]], repere: "61 % des sportifs d'armé ; 46–53 % des asymptomatiques (A)" },
      { id: "fracture_hp", grave: true, nom: "Fracture de l'humérus proximal", n: "fracture de l'humérus proximal", base: [[12, .01], [40, .005], [60, .02], [75, .05], [90, .07]], sexe: { F: 2, M: .5 },
        repere: "60/100 000 ; 253/100 000 après 65 ans ; 31,4/100 000/an chez l'enfant (A, C)" },
      { id: "clavicule", nom: "Fracture de la clavicule", n: "fracture de la clavicule", base: [[12, .06], [18, .04], [30, .02], [50, .01], [70, .01]], sexe: { M: 1.5, F: .7 },
        repere: "52/100 000/an ; 87 % des lésions de la ceinture scapulaire de l'enfant (A, C)" },
      { id: "omarthrose", nom: "Arthrose gléno-humérale", n: "omarthrose", base: [[12, .001], [45, .005], [60, .03], [75, .06], [90, .08]], repere: "2–5 % des douleurs d'épaule ; 17,4–20,3 % radiographique après 65 ans (A, C)" },
      { id: "calcifiante", nom: "Tendinopathie calcifiante", n: "tendinopathie calcifiante", base: [[12, .002], [30, .04], [45, .06], [60, .04], [80, .02]], sexe: { F: 1.3, M: .8 },
        repere: "Calcifications dans 42,5 % des douleurs sous-acromiales ; 12 % en échographie (A, C)" },
      { id: "instab_ant", nom: "Luxation ou instabilité antérieure", n: "instabilité antérieure de l'épaule", base: [[12, .03], [17, .06], [25, .05], [40, .02], [60, .008]], sexe: { M: 2, F: .5 },
        repere: "23,9/100 000 ; 60,3/100 000 avant 18 ans ; 20,3 % des lésions d'épaule du sportif (A, C)" },
      { id: "ac_arthrose", nom: "Arthrose acromio-claviculaire ou ostéolyse distale de la clavicule", n: "arthropathie acromio-claviculaire", base: [[12, .002], [25, .01], [45, .04], [65, .04], [80, .03]],
        repere: "4 % des patients adressés ; ostéolyse : 6,5 % des IRM à 13–19 ans, liée au développé-couché (A, C)" },
      { id: "ppr", grave: true, nom: "Polymyalgia rheumatica", n: "polymyalgia rheumatica", base: [[12, .0001], [50, .003], [65, .012], [80, .018]], sexe: { F: 1.5, M: .7 },
        repere: "Risque sur la vie 2,4 % (femmes), 1,7 % (hommes) (A)" },
      { id: "biceps", nom: "Tendinopathie ou rupture du long biceps", n: "atteinte du long biceps", base: [[12, .005], [30, .02], [50, .03], [70, .02]], repere: "Données hospitalières seules, sous-estimées (A)" },
      { id: "cervical", nom: "Douleur projetée d'origine cervicale", n: "douleur projetée cervicale", base: [[12, .01], [30, .04], [50, .06], [70, .05]], repere: "Rang attribué par jugement clinique (A)" },
      { id: "slap", nom: "Lésion SLAP (labrum supérieur)", n: "lésion SLAP", base: [[12, .005], [18, .02], [30, .015], [45, .008]], sexe: { M: 1.3, F: .8 }, repere: "6–26 % des arthroscopies d'épaule ; 2,5 % chez le sportif (A, C)" },
      { id: "instab_post", nom: "Instabilité postérieure ou multidirectionnelle", n: "instabilité postérieure ou multidirectionnelle", base: [[12, .01], [18, .02], [30, .01], [50, .003]], sexe: { F: 1.3, M: .8 },
        repere: "Postérieure 4,0 %, multidirectionnelle 1,8 % chez le sportif (C)" },
    ],
    compatibles: [["sous_acro", "rupture"], ["sous_acro", "calcifiante"], ["sous_acro", "dyskinesie"], ["sous_acro", "ac_arthrose"], ["sous_acro", "biceps"], ["rupture", "biceps"],
      ["rupture", "omarthrose"], ["omarthrose", "ac_arthrose"], ["instab_ant", "slap"], ["slap", "biceps"], ["instab_post", "dyskinesie"], ["sous_acro", "cervical"], ["ppr", "sous_acro"],
      ["fracture_hp", "rupture"], ["ac_entorse", "clavicule"]],

    grappes: [
      { id: "park_rupture", dx: "rupture", nom: "Park : arc douloureux + drop-arm + faiblesse en rotation externe", rv: 15.6, couvre: ["arc", "drop_arm", "rrom_re"], statut: "a_verifier",
        piste: `${PARK} : probabilité post-test 91 % ; RV+ ≈ 15,6 non vérifiable dans l'extrait`, si: L => parkRupture(L).every(Boolean) },
      { id: "park_conflit", dx: "sous_acro", nom: "Park : Hawkins + arc douloureux + rotation externe résistée", rv: 10.6, couvre: ["hawkins", "arc", "rrom_re"], statut: "a_verifier",
        piste: `${PARK} : probabilité post-test 95 % ; RV+ ≈ 10,6 non vérifiable dans l'extrait`, si: L => parkConflit(L).every(Boolean) },
      { id: "michener_pos", dx: "sous_acro", nom: "Michener : 3 sur 5 ou plus", rv: 2.9, couvre: ["neer", "hawkins", "arc", "jobe", "rrom_re"], statut: "verifie",
        piste: `${MICHENER} : RV+ 2,9 (arthroscopie, n = 55)`, si: L => michener(L).filter(Boolean).length >= 3 },
      { id: "michener_neg", dx: "sous_acro", nom: "Michener : moins de 3 sur 5", rv: .34, couvre: ["neer", "hawkins", "arc", "jobe", "rrom_re"], statut: "verifie",
        piste: `${MICHENER} : RV− 0,34`, si: L => michenerEval(L) === 5 && michener(L).filter(Boolean).length < 3 },
      { id: "litaker_pos", dx: "rupture", nom: "Litaker : 65 ans et plus, douleur nocturne, faiblesse en rotation externe", rv: 9.84, couvre: ["nocturne", "rrom_re"], statut: "verifie",
        piste: `${LITAKER} : score 4–5, Se 49 %, Sp 95 %, RV+ 9,84`, si: L => litaker(L).every(Boolean) },
      { id: "litaker_neg", dx: "rupture", nom: "Litaker : aucun des trois", rv: .23, couvre: ["nocturne", "rrom_re"], statut: "verifie",
        piste: `${LITAKER} : score 0–1, RV 0,23`, si: L => L.age !== null && L.repondu("nocturne") && L.repondu("rrom_re") && !litaker(L).some(Boolean) },
      // Règle de définition : la capsulite exige une perte de mobilité passive, d'abord en rotation externe. Complète et
      // indolore, celle-ci remplace son propre poids et annule ce qui plaide pour la capsulite parmi les signes de raideur.
      { id: "capsulite_re_normale", dx: "capsulite", nom: "Rotation externe passive complète et indolore", rv: .05, definition: true,
        couvre: ["prom_re"], neutralise: ["raideur_prog", "habillage_matin", "arom_elev", "arom_re", "arom_abd", "arom_ri", "prom_flex", "prom_abd", "prom_ri"],
        piste: "Critère de définition (Zuckerman et Rokito, 2011, J Shoulder Elbow Surg, définition de consensus) : perte de mobilité active et passive. RV 0,05 : estimation déjà en place pour la rotation externe passive complète, aucune valeur publiée (EPAU-P11) ; la raideur racontée et les limitations actives ou passives ne comptent plus pour la capsulite.",
        si: L => L.v("prom_re") === "complete" },
      { id: "ac3", dx: "ac_arthrose", nom: "Trois tests acromio-claviculaires positifs", rv: 8.3, couvre: ["add_horiz", "ext_ac", "obrien_ac"], statut: "verifie",
        piste: `${MALL} : Se 25 %, Sp 97 % (RV calculé)`, si: L => ac3(L).every(Boolean) },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Épaule atteinte", "Droite", "Gauche", { ppr: 6, capsulite: 1.3, omarthrose: 1.3, cervical: 1.5, rupture: .8, instab_post: 1.5, fracture_hp: .05, clavicule: .05, ac_entorse: .1, instab_ant: .3, slap: .3 }, "Douleur aux deux épaules"),
        C.dominance("Main dominante"), C.accompagne(), C.refere(),
        C.travail({ manuel: { sous_acro: 1.5, rupture: 1.3, ac_arthrose: 1.3, calcifiante: 1.2 }, physique: { sous_acro: 1.3, rupture: 1.3, ac_arthrose: 1.3 } }), C.travailPrecision(),
        C.sport({ aucun: { instab_ant: .6, slap: .5, ac_entorse: .6, dyskinesie: .6 }, lancer: { sous_acro: 1.5, slap: 3, instab_ant: 1.3, dyskinesie: 2.5, instab_post: 1.5 }, raquette: { sous_acro: 1.5, slap: 1.5, dyskinesie: 1.5 },
          natation: { sous_acro: 1.8, instab_post: 2, dyskinesie: 1.5 }, contact: { ac_entorse: 3, instab_ant: 2.5, clavicule: 2.5, fracture_hp: 1.2 }, muscu: { ac_arthrose: 2, instab_ant: 1.3, biceps: 1.5, sous_acro: 1.2 },
          escalade: { sous_acro: 1.3, slap: 1.5, biceps: 1.3 }, glisse: { clavicule: 2, ac_entorse: 1.8, instab_ant: 1.5 }, velo: { clavicule: 1.5, ac_entorse: 1.3 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(),
        ouiNon("atcd_luxation", "Luxation antérieure de cette épaule", { oui: "ATCD de luxation de cette épaule", non: "", effets: { instab_ant: p(8, .4), slap: p(1.5, .95), omarthrose: p(1.5, .97) } }),
        ouiNon("diabete", "Diabète ou neuropathie périphérique", { oui: "diabète", nie: "diabète", effets: { capsulite: { rvp: 2.5, rvn: .85, statut: "a_verifier", piste: "Diabète : rapport de cotes 3,69 pour la capsulite (facteur de risque, pas un RV)" } } }),
        C.atcdMedicaux(),
        ouiNon("obesite", "Obésité (IMC 30 ou plus)", { oui: "obésité", non: "" }),
        ouiNon("osteoporose", "Ostéoporose ou fracture de fragilité", { oui: "ostéoporose", non: "", effets: { fracture_hp: p(2.5, .85) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux(), C.atcdRhumato("ppr", 1, 1),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ instab_ant: p(.6, 2), capsulite: p(1.3, .7) }), C.depuis(), C.contexte(),
          C.duree({ lt7: { ac_entorse: 3, clavicule: 3, fracture_hp: 3, instab_ant: 2.5, rupture: 1.5, myalgie: 1.5, calcifiante: 2, capsulite: .3, omarthrose: .2, ac_arthrose: .3, dyskinesie: .4, sous_acro: .6 },
            s1_6: { myalgie: 1.3, calcifiante: 1.3, sous_acro: 1.1, ppr: 1.5 },
            s6_12: { capsulite: 1.8, sous_acro: 1.3, rupture: 1.2, ppr: 1.3, ac_entorse: .4, clavicule: .3, fracture_hp: .4 },
            gt3m: { sous_acro: 1.5, capsulite: 1.5, omarthrose: 2.5, ac_arthrose: 2, rupture: 1.5, dyskinesie: 1.5, instab_post: 1.5, cervical: 1.5, myalgie: .6, ac_entorse: .1, clavicule: .05, fracture_hp: .1 } }),
          C.apparition({ subit_trauma: { ac_entorse: 6, clavicule: 6, fracture_hp: 6, instab_ant: 5, rupture: 2.5, slap: 2, biceps: 1.5, sous_acro: .4, capsulite: .3, omarthrose: .2, calcifiante: .3, dyskinesie: .3, cervical: .4, ppr: .2, instab_post: .8 },
            subit: { calcifiante: 5, rupture: 1.5, biceps: 2, ppr: 1.5, capsulite: .6, ac_entorse: .2, clavicule: .1 },
            graduel: { sous_acro: 2, dyskinesie: 2, ac_arthrose: 1.5, slap: 1.3, instab_post: 1.8, biceps: 1.3, capsulite: 1.5, ac_entorse: .05, clavicule: .05, fracture_hp: .05, instab_ant: .3 },
            insidieux: { capsulite: 2.5, omarthrose: 3, rupture: 1.5, sous_acro: 1.5, cervical: 2, ppr: 2, ac_arthrose: 1.5, ac_entorse: .05, clavicule: .05, fracture_hp: .05, instab_ant: .2 } }),
          choix("mecanisme", "Mécanisme", [
            o("chute_epaule", "Chute ou coup sur le moignon de l'épaule", { ac_entorse: 5, clavicule: 4, fracture_hp: 1.5, instab_ant: .5 }, { n: "chute sur l'épaule" }),
            o("chute_main", "Chute sur la main tendue", { fracture_hp: 3, instab_ant: 2, rupture: 1.5, clavicule: 1.5, ac_entorse: .6 }, { n: "chute sur la main tendue" }),
            o("armé", "Bras forcé en abduction et rotation externe", { instab_ant: 8, slap: 2, ac_entorse: .3 }, { n: "bras forcé en abduction et rotation externe" }),
            o("traction", "Traction ou effort brusque (soulever, retenir)", { rupture: 3, biceps: 3, slap: 2 }, { n: "traction ou effort brusque" })], { si: trauma, masqueSi: "contexte" }),
          ouiNon("deboitement", "Sensation que l'épaule sort de place", { oui: "sensation de déboîtement", nie: "sensation d'instabilité", effets: { instab_ant: p(6, .3), instab_post: p(3, .7), slap: p(1.5, .9) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("laterale", "Face latérale du bras (deltoïde)", { sous_acro: p(3, .4), rupture: p(2, .6), calcifiante: p(2, .7), capsulite: p(1.5, .8), cervical: p(.7, 1.1) }, { n: "à la face latérale du bras" }),
            m("sommet", "Sommet de l'épaule (acromio-claviculaire)", { ac_arthrose: p(5, .3), ac_entorse: p(4, .4), clavicule: p(1.5, .9) }, { n: "au sommet de l'épaule" }),
            m("anterieure", "Antérieure (coulisse du biceps)", { biceps: p(3, .5), slap: p(1.5, .8), sous_acro: p(1.2, .9), instab_ant: p(1.3, .9) }, { n: "antérieure" }),
            m("posterieure", "Postérieure ou scapulaire", { dyskinesie: p(2, .7), instab_post: p(2.5, .7), cervical: p(2, .7), myalgie: p(1.5, .8) }, { n: "postérieure" }),
            m("trapeze", "Trapèze, base du cou", { cervical: p(3, .5), myalgie: p(2.5, .6), ppr: p(1.5, .9) }, { n: "au trapèze" }),
            m("diffuse", "Diffuse, profonde", { capsulite: p(2.5, .6), omarthrose: p(2, .7), ppr: p(1.5, .9), fracture_hp: p(1.5, .9) }, { n: "diffuse et profonde" }),
            m("sous_coude", "Irradie sous le coude", { cervical: p(6, .4), sous_acro: p(.5, 1.05), ac_arthrose: { rvp: .3, rvn: 1.05, statut: "a_verifier", piste: `${CADOGAN} : pas de douleur sous le coude, élément du cluster` } }, { n: "irradiant sous le coude" }),
            m("deux_epaules", "Aux deux épaules et aux hanches, avec raideur", { ppr: p(10, .3) }, { n: "aux ceintures" }),
          ], { gabarit: "douleur a/n {v}" }),
          C.type({ brulure: { cervical: 3 }, choc: { cervical: 3 }, sourde: { capsulite: 1.3, omarthrose: 1.3 }, aigue: { calcifiante: 1.5 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("bras_leve", "Pire bras levé ou au-dessus de la tête", { g: "facteurs", agg: "les gestes au-dessus de la tête", aggNie: "bras levé",
            effets: { sous_acro: p(2.5, .4), rupture: p(1.5, .8), calcifiante: p(1.5, .8), ac_arthrose: p(1.5, .8), slap: p(1.5, .9), instab_ant: p(1.3, .9), cervical: p(.6, 1.1) } }),
          ouiNon("couche_epaule", "Pire couché sur l'épaule", { g: "facteurs", agg: "le décubitus sur l'épaule", aggNie: "couché dessus", effets: { sous_acro: p(1.8, .6), rupture: p(1.5, .8), capsulite: p(1.5, .8), calcifiante: p(1.5, .8), ac_arthrose: p(1.3, .9) } }),
          ouiNon("faiblesse", "Faiblesse à lever le bras", { oui: "faiblesse à lever le bras", nie: "faiblesse", effets: { rupture: p(3, .4), cervical: p(1.5, .9), sous_acro: p(1.2, .9), capsulite: p(1.3, .9) } }),
          ouiNon("raideur_prog", "Perte progressive de mouvement (difficulté à s'habiller, à attacher le soutien-gorge)", { oui: "perte progressive de mouvement", nie: "raideur",
            effets: { capsulite: p(6, .2), omarthrose: p(3, .6), rupture: p(1.3, .9), sous_acro: p(.6, 1.1) } }),
          ouiNon("cou_aggrave", "Douleur reproduite par les mouvements du cou", { oui: "douleur reproduite par les mouvements du cou", nie: "lien avec le cou", effets: { cervical: p(6, .3), myalgie: p(1.3, .9), sous_acro: p(.6, 1.1) } }),
          C.attenuants(),
          C.moment({ matin: { ppr: 3, capsulite: 1.2, omarthrose: 1.2 }, soir: { sous_acro: 1.3, ac_arthrose: 1.2 }, constante: { calcifiante: 1.5, capsulite: 1.3 } }),
          C.nocturne({ rupture: { rvp: 1.08, rvn: .3, statut: "verifie", piste: `${LITAKER} : Se > 97 %, Sp < 10 %` }, capsulite: p(2, .6), calcifiante: p(2, .8), sous_acro: p(1.5, .7), myalgie: p(.6, 1.2) }),
          C.raideur({ plus30: { ppr: 5 } }),
          ouiNon("habillage_matin", "Difficulté à s'habiller le matin", { oui: "difficulté à s'habiller le matin", nie: "difficulté à s'habiller le matin" }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("clic_epaule", "Craquement, clic ou accrochage", { oui: "clic ou accrochage", nie: "clic", effets: { slap: ver(.55, .73, `${DEAN} : lésion labrale, RV+ 2,0`), instab_ant: p(1.5, .9), ac_arthrose: p(1.2, .95) } }),
          ouiNon("popeye", "Boule au milieu du bras (déformation de Popeye)", { oui: "déformation de Popeye", nie: "déformation du biceps", effets: { biceps: p(15, .9) } }),
          ouiNon("paresthesies", "Engourdissements ou picotements dans le bras ou la main", { oui: "paresthésies du membre supérieur", nie: "paresthésie", effets: { cervical: p(5, .4) } }),
          ouiNon("raideur_ceintures", "Raideur matinale des épaules et des hanches", { oui: "raideur des ceintures", nie: "raideur des ceintures", effets: { ppr: p(10, .2) } }),
          ouiNon("symptomes_acg", "Céphalée nouvelle, claudication de la mâchoire ou trouble visuel", { oui: "symptômes d'artérite temporale", nie: "symptôme d'artérite temporale", drapeau: true, effets: { ppr: p(3, .9) } }),
          C.autresArticulations({ ppr: p(2, .8) }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre(), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("infiltration", "Infiltration ou chirurgie récente de l'épaule", {}, { n: "infiltration récente" })]),
          ouiNon("thorax", "Douleur thoracique, dyspnée ou douleur à l'effort", { oui: "douleur thoracique ou dyspnée", nie: "douleur thoracique", drapeau: true }),
          ouiNon("deformation", "Déformation visible ou épaule « carrée »", { oui: "déformation de l'épaule", nie: "déformation", drapeau: true, effets: { instab_ant: p(6, .9), fracture_hp: p(3, .9), clavicule: p(4, .8), ac_entorse: p(3, .8) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        { titre: "Inspection", sep: ", ", toutNormal: true, questions: [
          ouiNon("atrophie", "Atrophie du supra- ou de l'infra-épineux", { oui: "atrophie des fosses supra- ou infra-épineuse", non: "pas d'atrophie", effets: { rupture: ver(.556, .729, `${LITAKER} ; ${HERMANS} : RV+ 2,0`), cervical: p(1.5, .95) } }),
          ouiNon("marche_ac", "Marche d'escalier acromio-claviculaire", { oui: "marche d'escalier acromio-claviculaire", non: "", horsNormal: true, effets: { ac_entorse: p(8, .6) } }),
          ouiNon("dyskinesie_vue", "Scapula décollée ou dyskinésie visible", { oui: "dyskinésie scapulaire", non: "", horsNormal: true,
            effets: { dyskinesie: { rvp: 3, rvn: .6, statut: "a_verifier", piste: "Wright et coll., 2013, BJSM : glissement latéral et dyskinésie, RV ≈ 1 pour la pathologie de l'épaule en général" } } }),
          ouiNon("ex_ecchymose", "Ecchymose", { oui: "ecchymose", non: "", horsNormal: true, effets: { fracture_hp: p(3, .7), clavicule: p(2, .8), rupture: p(1.5, .95), biceps: p(2, .95) } }),
        ] },
        { titre: "Palpation", res: PALP, toutNormal: true, labels: ["Douloureux", "Indolore"], questions: [
          ouiNon("p_ac", "Acromio-claviculaire", { court: "acromio-claviculaire", genre: "f",
            effets: { ac_arthrose: { rvp: 1.6, rvn: .1, statut: "a_verifier", piste: "Walton et coll., 2004, JBJS (PMID 15069148) : Se 96 %, Sp faible" }, ac_entorse: p(3, .2) } }),
          ouiNon("p_clavicule", "Clavicule", { court: "clavicule", genre: "f", effets: { clavicule: p(6, .1) } }),
          ouiNon("p_coulisse", "Coulisse bicipitale", { court: "coulisse bicipitale", genre: "f", effets: { biceps: ver(.53, .54, "Gill et coll., 2007, Am J Sports Med : RV+ 1,15") } }),
          ouiNon("p_trochiter", "Trochiter (insertion de la coiffe)", { court: "trochiter", effets: { sous_acro: p(1.5, .7), rupture: p(1.5, .8), calcifiante: p(1.8, .8), fracture_hp: p(2, .8) } }),
          ouiNon("p_trapeze", "Trapèze et angulaire", { court: "trapèze", effets: { myalgie: p(2.5, .6), cervical: p(1.5, .8) } }),
          ouiNon("crepitus", "Crépitus sous-acromial", { court: "crépitus", res: "pres", horsNormal: true, effets: { rupture: ver(.67, .8, "Glover et coll., 2026 : rupture de coiffe (IRM, n = 63)"), omarthrose: p(2, .8) } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_elev", "Élévation active (flexion)", "élévation", { lim_douleur: { sous_acro: 1.5, rupture: 1.4, capsulite: 2, omarthrose: 2 }, lim_raideur: { capsulite: 3, omarthrose: 3 }, complete: { capsulite: .2, omarthrose: .4 } }),
          C.degres("arom_elev", "Élévation active mesurée"),
          C.amplitude("arom_re", "Rotation externe active", "rotation externe", { lim_douleur: { capsulite: 2, omarthrose: 2 }, lim_raideur: { capsulite: 4, omarthrose: 3 }, complete: { capsulite: .2 } }),
          C.degres("arom_re", "Rotation externe active mesurée"),
          C.amplitude("arom_abd", "Abduction active", "abduction"),
          C.degres("arom_abd", "Abduction active mesurée"),
          C.amplitude("arom_ri", "Rotation interne active (main dans le dos)", "rotation interne"),
          texte("arom_ri_deg", "Niveau atteint par le pouce", { lie: true, gabarit: "(pouce à {v})", aide: "Ex. « L3 » ; normal : vers T7.", si: L => L.dans("arom_ri", ["lim_douleur", "lim_raideur"]) }),
          ouiNon("abd90_trauma", "Après un traumatisme : abduction au-delà de 90° impossible", { si: trauma, oui: "abduction au-delà de 90° impossible", non: "abduction au-delà de 90° possible",
            effets: { rupture: ver(.84, .71, `${ENGER} : rupture transfixiante ou fracture occulte, RV+ 2,9 ; RV− 0,23`, { g: "trauma-ex" }), fracture_hp: p(2, .6, { g: "trauma-ex" }) } }),
        ] },
        { titre: "PROM", toutNormal: true, questions: [
          C.amplitude("prom_re", "Rotation externe passive", "rotation externe", { lim_douleur: { capsulite: 6, omarthrose: 3 }, lim_raideur: { capsulite: 8, omarthrose: 4 }, complete: { capsulite: .05, omarthrose: .3 }, fin: { sous_acro: 1.3 } }),
          C.degres("prom_re", "Rotation externe passive mesurée"),
          C.amplitude("prom_flex", "Flexion passive", "flexion", { complete: { capsulite: .3 } }, false,
            [{ dx: "omarthrose", se: .5, sp: .927, pos: lim, neg: ["complete"], statut: "verifie", piste: `${GLOVER} : flexion passive < 120°, RV+ 6,87` }]),
          C.degres("prom_flex", "Flexion passive mesurée"),
          C.amplitude("prom_abd", "Abduction passive", "abduction"),
          C.degres("prom_abd", "Abduction passive mesurée"),
          C.amplitude("prom_ri", "Rotation interne passive (à 90° d'abduction)", "rotation interne"),
          C.degres("prom_ri", "Rotation interne passive mesurée"),
        ] },
        { titre: "RROM", toutNormal: true, questions: [
          choix("rrom_re", "Rotation externe résistée", [o("normale", "Forte et indolore", {}, { n: "rotation externe résistée forte et indolore" }), o("douleur", "Douloureuse", {}, { n: "rotation externe résistée douloureuse" }),
            o("faiblesse", "Faible", {}, { n: "rotation externe résistée faible" })], { effets: [
              { dx: "sous_acro", se: .63, sp: .75, pos: ["douleur", "faiblesse"], neg: ["normale"], statut: "verifie", piste: `${HERMANS} : douleur ou faiblesse, RV+ 2,6 ; RV− 0,49` },
              { dx: "rupture", se: .759, sp: .573, pos: ["faiblesse"], neg: ["normale", "douleur"], statut: "verifie", piste: `${LITAKER} : faiblesse, RV+ 1,78 ; RV− 0,42` },
              { dx: "cervical", rv: { faiblesse: 1.5 } }] }),
          choix("jobe", "Abduction résistée (Jobe)", [o("normale", "Forte et indolore", { sous_acro: .5, rupture: .5 }, { n: "Jobe fort et indolore" }), o("douleur", "Douloureuse", { sous_acro: 2, calcifiante: 1.5 }, { n: "Jobe douloureux" }),
            o("faiblesse", "Faible", { rupture: 3, sous_acro: 1.5, cervical: 1.5 }, { n: "Jobe faible" })], { video: "Jobe test" }),
          ouiNon("rrom_flex_coude", "Flexion résistée du coude", { court: "flexion résistée du coude", genre: "f", oui: "flexion résistée du coude douloureuse", non: "flexion résistée du coude indolore", effets: { biceps: p(2, .8) } }),
        ] },
        { titre: "Coiffe", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("arc", "Arc douloureux", { court: "arc douloureux", effets: { sous_acro: ver(.71, .81, HERMANS), calcifiante: p(1.5, .8) } }),
          ouiNon("hawkins", "Hawkins-Kennedy", { court: "Hawkins", effets: { sous_acro: ver(.76, .48, HERMANS, { g: "conflit-ex" }) } }),
          ouiNon("neer", "Neer", { court: "Neer", effets: { sous_acro: est(1.3, .8, `${HERMANS} : RV+ 0,98–1,6 ; RV− 0,60–1,1`, { g: "conflit-ex" }) } }),
          ouiNon("drop_arm", "Drop-arm", { court: "drop-arm", horsNormal: true, effets: { rupture: p(4, .8, { g: "rupture-ex" }) } }),
          ouiNon("er_lag", "External rotation lag sign", { court: "external rotation lag sign", horsNormal: true, effets: { rupture: ver(.47, .94, HERMANS, { g: "rupture-ex" }) } }),
          ouiNon("ir_lag", "Internal rotation lag sign (lift-off)", { court: "internal rotation lag sign", horsNormal: true, effets: { rupture: ver(.97, .83, `${HERMANS} : sous-scapulaire`, { g: "sous-scap" }) } }),
          ouiNon("belly_press", "Belly-press", { court: "belly-press", horsNormal: true, effets: { rupture: ver(.4, .979, `${BARTH} : sous-scapulaire`, { g: "sous-scap" }) } }),
          ouiNon("bear_hug", "Bear-hug", { court: "bear-hug", horsNormal: true, effets: { rupture: ver(.6, .917, `${BARTH} : sous-scapulaire`, { g: "sous-scap" }) } }),
        ] },
        { titre: "Instabilité", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("apprehension", "Appréhension", { court: "appréhension", genre: "f", effets: { instab_ant: ver(.72, .96, FARBER, { g: "instab-ex" }) } }),
          ouiNon("relocation", "Relocation", { court: "relocation", genre: "f", effets: { instab_ant: ver(.81, .92, FARBER, { g: "instab-ex" }) } }),
          ouiNon("surprise", "Surprise (release)", { court: "surprise", genre: "f", horsNormal: true, effets: { instab_ant: ver(.639, .989, LO, { g: "instab-ex" }) } }),
          ouiNon("sulcus", "Sulcus", { court: "sulcus", horsNormal: true, effets: { instab_post: ver(.31, .89, "Jia et coll., 2008 ; Luime et coll., 2004, JAMA : RV+ 2,8") } }),
        ] },
        { titre: "Labrum, biceps et acromio-claviculaire", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("obrien", "O'Brien : douleur profonde (labrum)", { court: "O'Brien (labrum)", effets: { slap: ver(.626, .544, DEAN, { g: "slap-ex" }) } }),
          ouiNon("obrien_ac", "O'Brien : douleur au sommet (acromio-claviculaire)", { court: "O'Brien (acromio-claviculaire)", effets: { ac_arthrose: ver(.41, .95, MALL) } }),
          ouiNon("biceps_load", "Biceps load II", { court: "biceps load II", horsNormal: true, effets: { slap: verRv(1.7, .39, "Cook et coll., 2012, J Shoulder Elbow Surg (PMID 22036538)", { g: "slap-ex" }) } }),
          ouiNon("add_horiz", "Adduction horizontale (cross-body)", { court: "adduction horizontale", genre: "f", effets: { ac_arthrose: ver(.77, .79, MALL), ac_entorse: p(2, .5) } }),
          ouiNon("ext_ac", "Extension résistée acromio-claviculaire", { court: "extension résistée acromio-claviculaire", genre: "f", horsNormal: true, effets: { ac_arthrose: ver(.72, .85, MALL) } }),
          ouiNon("speed", "Speed", { court: "Speed", effets: { biceps: ver(.32, .75, HOLTBY, { g: "biceps-ex" }) } }),
          ouiNon("yergason", "Yergason", { court: "Yergason", horsNormal: true, effets: { biceps: ver(.43, .79, HOLTBY, { g: "biceps-ex" }) } }),
          ouiNon("uppercut", "Uppercut", { court: "uppercut", effets: { biceps: est(3.38, .26, "Kibler et coll., 2009, Am J Sports Med (n = 101) : RV+ 3,38 ; Cardoso et coll., 2019, J Shoulder Elbow Surg : RV− 0,26 (base FlashCards Morand MSK) ; la fiche de médecine sportive donne Se 77 %, Sp 80 %", { g: "biceps-ex" }) } }),
        ] },
        { fin: true, questions: C.controlateral() },
        { titre: "Cervical", adjacent: "cervical", sansCote: true, toutNormal: true, questions: [
          choix("cou_mob", "Cervical : mobilité", [o("normale", "Indolore", {}, { n: "mobilité indolore" }), o("douleur", "Douleur reproduite à l'épaule", { cervical: 4 }, { n: "douleur reproduite à l'épaule" })]),
          ouiNon("spurling", "Spurling", { court: "Spurling", res: TEST, effets: { cervical: p(4, .6) } }),
          ouiNon("deficit_c5c6", "Déficit de force, de sensibilité ou de réflexe C5–C6", { oui: "déficit C5–C6", non: "force, sensibilité et réflexes C5–C6 normaux", effets: { cervical: p(5, .8) } }),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      C.regles.septique("une épaule", [], []),
      L => ((L.trauma() && (L.oui("deformation") || (L.v("mecanisme") === "armé" && L.oui("deboitement")))) || (L.trauma() && L.age >= 60 && L.v("mecanisme") === "chute_main"))
        ? { niveau: "rapide", titre: "Luxation ou fracture à éliminer", ro: "luxation ou fracture de l'épaule", texte: "Traumatisme avec déformation, sensation de luxation, ou chute sur la main chez un sujet de 60 ans et plus.",
          conduite: [{ t: "Radiographies de l'épaule (face, profil de scapula, axillaire) avant toute réduction ; examen du nerf axillaire et des pouls" }, ...items(L.age >= 60 ? 7 : 11)] } : null,
      L => {
        // Faiblesse franche après un traumatisme, dès 40 ans : la réparation précoce donne les meilleurs résultats.
        const signes = [L.oui("abd90_trauma") && "abduction au-delà de 90° impossible (RV+ 2,9)", L.oui("drop_arm") && "drop-arm positif", L.oui("er_lag") && "lag en rotation externe",
          L.v("jobe") === "faiblesse" && "faiblesse au Jobe", L.v("rrom_re") === "faiblesse" && "faiblesse en rotation externe"].filter(Boolean);
        return L.trauma() && signes.length && L.age !== null && L.age >= 40
          ? { niveau: "rapide", titre: "Rupture traumatique de la coiffe à éliminer", ro: "rupture traumatique de la coiffe",
            texte: `Après un traumatisme : ${signes.join(", ")}. Les meilleurs résultats sont obtenus avec une réparation dans les 3 semaines.`, conduite: items(5) } : null;
      },
      L => ((L.oui("raideur_ceintures") || L.a("localisation", "deux_epaules")) && L.age !== null && L.age >= 50)
        ? { niveau: L.oui("symptomes_acg") ? "urgence" : "rapide", titre: L.oui("symptomes_acg") ? "Artérite à cellules géantes à éliminer" : "Polymyalgia rheumatica à considérer",
          ro: L.oui("symptomes_acg") ? "artérite à cellules géantes" : "polymyalgia rheumatica", texte: "50 ans et plus, douleur et raideur des ceintures. Claudication de la mâchoire : RV+ 4,9 pour l'artérite à cellules géantes.",
          conduite: [...(L.oui("symptomes_acg") ? [{ t: "Céphalée, claudication de la mâchoire ou trouble visuel : prednisone et évaluation le jour même (risque de cécité)" }] : []), ...items(13)] } : null,
      L => L.oui("thorax") ? { niveau: "urgence", titre: "Douleur projetée d'origine thoracique ou abdominale à éliminer", ro: "douleur projetée viscérale", texte: "Douleur d'épaule avec douleur thoracique, dyspnée ou douleur à l'effort : syndrome coronarien, embolie, atteinte pleurale ou sous-diaphragmatique.",
        conduite: [{ t: "Évaluation médicale le jour même (ECG selon le tableau)" }] } : null,
      L => (L.oui("paresthesies") || L.oui("spurling") || L.oui("deficit_c5c6") || L.a("localisation", "sous_coude"))
        ? { niveau: "considerer", titre: "Origine cervicale à considérer", ro: "radiculopathie cervicale", texte: "Irradiation sous le coude, paresthésies, Spurling positif ou déficit C5–C6.", conduite: items(15) } : null,
      L => (L.age !== null && L.age < 25 && L.v("mecanisme") === "armé" && L.oui("deboitement"))
        ? { niveau: "info", titre: "Luxation antérieure avant 25 ans", texte: "Récidive de 74–87 % : un avis orthopédique est recommandé." } : null,
      C.regles.tumeur("Radiographie de l'épaule et de l'humérus."),
    ],
  });
})();
