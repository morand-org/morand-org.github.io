/* Locomoteur Morand, coude (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), parties A à H.
   L'outil vise les 12 ans et plus : la pronation douloureuse et la fracture supracondylienne du jeune enfant n'y sont pas.
   « Douleur non spécifique » : reste calculé (fiche 21 de l'aide-mémoire, douleur non spécifique ou contusion).
   Format : p() provisoire, est() à vérifier, ver()/verRv() vérifié avec sa source. « † » du document : statut « à vérifier ». */
(function () {
  "use strict";
  const { p, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), TEST = "test";
  const APPELBOAM = "Appelboam et coll., 2008, BMJ (PMID 19066257 ; test d'extension, n = 1 740)", VINSON = "Vinson et coll., 2016, Am J Emerg Med (PMID 26597495 ; quatre amplitudes, n = 251)";
  const ZWERUS = "Zwerus et coll., 2022, Am J Sports Med (biceps distal, n = 86)", SCIASCIA = "Sciascia et coll., Am J Sports Med (ligament collatéral ulnaire)";
  const KARANASIOS = "Karanasios et coll., 2021, revue systématique (PMID 33814224 ; tendinopathie latérale)", BEEKMAN = "Beekman et coll., 2009 (PMID 19553231 ; neuropathie ulnaire, n = 192)";
  const REILLY = "Reilly et Kamineni, 2016, J Shoulder Elbow Surg (PMID 26577126 ; bursite septique 83 % contre aseptique 27 %, calculé)";
  const WERNER = "Werner et coll., 2012, Muscle Nerve (schéma de la main, neuropathie ulnaire)", RUBIN = "Rubin et coll., 2016, Muscle Nerve (symptômes de neuropathie ulnaire)";
  const ZWERUS_LAT = "Zwerus et coll., J Shoulder Elbow Surg (PMID 41192654) : 46,5 % des douleurs latérales ont un autre diagnostic que l'épicondylite";

  const ANGLAIS = { epi_lat: "lateral epicondylitis (lateral elbow tendinopathy)", epi_med: "medial epicondylitis", lanceur: "little league elbow (medial epicondyle apophysitis)",
    fracture: "elbow fracture (radial head or neck, olecranon, distal humerus, medial epicondyle)", luxation: "elbow dislocation", tunnel_cubital: "cubital tunnel syndrome (ulnar neuropathy at the elbow)",
    bursite: "aseptic olecranon bursitis", bursite_septique: "septic olecranon bursitis", arthrose: "elbow osteoarthritis", lcu: "ulnar collateral ligament injury of the elbow",
    biceps: "distal biceps tendon rupture", ocd: "osteochondritis dissecans of the capitellum", conflit_post: "posteromedial impingement or olecranon stress fracture",
    triceps: "distal triceps tendinopathy or rupture", tunnel_radial: "radial tunnel syndrome", arthrite: "inflammatory or crystal arthritis of the elbow", cervical: "cervical radiculopathy referred to the elbow" };

  const CONDUITES = C.aideMemoire("coude", { epi_lat: 1, epi_med: 2, lanceur: 4, fracture: [6, 10, 11, 16], luxation: 12, tunnel_cubital: 7, bursite: 8, bursite_septique: 8, arthrose: 9,
    lcu: 13, biceps: 14, ocd: 15, conflit_post: 17, triceps: 18, tunnel_radial: 19, arthrite: 20 });
  const items = ref => C.aideMemoire("coude", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("coude"),
    { titre: "Pour tous", items: [{ t: "Enseignement : la plupart des tendinopathies du coude guérissent en 6 à 12 mois ; doser la charge plutôt que l'arrêt complet" },
      { t: "Consignes de reconsultation : engourdissement ou faiblesse de la main, enflure ou rougeur croissante, fièvre, perte d'extension" }] }];

  const INFOS = {
    ext_test: { info: "Patient assis, bras en supination : extension complète du coude (comparée à l'autre côté). Extension complète possible : fracture peu probable (Se 96,8 % ; RV− 0,03 chez l'adulte, 0,11 chez l'enfant). Reconsulter si la douleur persiste 7 à 10 jours.", positif: "extension complète impossible", video: "Elbow extension test" },
    amp4: { info: "Quatre amplitudes actives : extension complète, flexion à 90°, pronation et supination complètes. Toutes normales après un traumatisme : RV− 0,017 pour une fracture ou un épanchement (n = 251)." },
    cozen: { info: "Poing fermé, poignet en extension résistée, coude en extension. Épicondylite latérale : Se 91 % (spécificité non publiée) : négatif, il l'éloigne.", positif: "douleur à l'épicondyle latéral", video: "Cozen test" },
    maudsley: { info: "Extension résistée du 3ᵉ doigt. Épicondylite latérale : Se 70 %.", positif: "douleur à l'épicondyle latéral", video: "Maudsley test" },
    prehension: { info: "Force de préhension (dynamomètre ou main de l'examinateur) coude en extension, comparée au coude fléchi : plus faible de 5–10 % dans l'épicondylite latérale (Se 78–83 %, Sp 80–90 %)." },
    hook: { info: "Coude fléchi à 90°, supination active : l'index de l'examinateur cherche à crocheter le tendon du biceps par le bord latéral. Absent : rupture complète (RV+ 15,7). Avec l'intervalle du pli bicipital, les deux positifs : Sp 100 % ; les deux négatifs : RV− 0,06.", positif: "tendon impossible à crocheter", video: "Hook test biceps" },
    pli_bicipital: { info: "Distance entre le pli du coude et l'extrémité distale du ventre du biceps, comparée à l'autre côté : plus de 6 cm (ou plus de 1,2 fois l'autre côté) : rupture complète du biceps distal (Se 81 %, Sp 91 %)." },
    moving_valgus: { info: "Épaule en abduction et rotation externe, stress en valgus pendant un passage rapide de la flexion complète à l'extension. Lésion du ligament collatéral ulnaire : Se 98 % : négatif, il l'exclut (RV− 0,02).", positif: "douleur médiale entre 120° et 70° de flexion", video: "Moving valgus stress test" },
    milking: { info: "Traction sur le pouce, coude fléchi à plus de 90°, épaule en rotation externe : stress en valgus. Ligament collatéral ulnaire : RV+ 5,1.", positif: "douleur ou laxité médiale", video: "Milking maneuver elbow" },
    tinel_cubital: { info: "Percussion du nerf ulnaire dans la gouttière épitrochléo-olécrânienne. Neuropathie ulnaire : Se 62 %, Sp 53 % (RV+ 1,3) : peu utile seul ; le schéma de la main est plus spécifique.", video: "Tinel sign cubital tunnel" },
    schema_main: { info: "Engourdissement limité au 5ᵉ doigt et à la moitié ulnaire du 4ᵉ, sans le pouce ni l'index : neuropathie ulnaire, Se 50 %, Sp 93 % (RV+ 7,1, calculé)." },
    froment: { info: "Pince pouce-index sur une feuille : flexion de l'interphalangienne du pouce (faiblesse de l'adducteur du pouce) : atteinte motrice du nerf ulnaire.", video: "Froment sign" },
    ex_erytheme_bourse: { info: "Bursite olécrânienne : érythème chez 83 % des septiques contre 27 % des aseptiques (RV+ ≈ 3,1 ; RV− ≈ 0,23, calculés). Fièvre, porte d'entrée cutanée et cellulite orientent aussi : ponctionner au moindre doute." },
    p_bourse: { info: "Bourse douloureuse à la palpation : 88 % des septiques contre 36 % des aseptiques (RV+ ≈ 2,4 ; RV− ≈ 0,19, calculés)." },
    p_epi_lat: { info: "Sensibilité de l'épicondyle latéral : critère d'inclusion des études, sans sensibilité ni spécificité publiées ; son absence éloigne l'épicondylite." },
    p_radial_distal: { info: "Douleur 3 à 5 cm sous l'épicondyle latéral, sur l'arcade de Frohse : syndrome du tunnel radial (pas de déficit, EMG habituellement normal)." },
  };

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "COUD-P1", cle: "epi_lat|blocage_coude>epi_lat", note: "OpenEvidence (24 nov. 2026) : non appuyé ; seules des données indirectes et biaisées existent (Blonna)" },
    { code: "COUD-P2", cle: "epi_lat|cozen>epi_lat", note: "OpenEvidence (24 nov. 2026) : Se 91 % (revue à risque de biais élevé) ; RV+ indirect d'environ 2,6 ; RV− introuvable" },
    { code: "COUD-P3", cle: "epi_lat|maudsley>epi_lat", note: "OpenEvidence (24 nov. 2026) : Se 70 % seulement, étude d'origine non retrouvée" },
    { code: "COUD-P4", cle: "tunnel_radial|p_radial_distal>tunnel_radial", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P5", cle: "epi_lat|localisation.laterale>epi_lat", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P6", cle: "epi_lat|p_epi_lat>epi_lat", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P7", cle: "epi_med|localisation.mediale>epi_med", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P8", cle: "epi_med|p_epi_med>epi_med", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P9", cle: "lanceur|sport.lancer>lanceur", note: "OpenEvidence (24 nov. 2026) : données indirectes (anomalie radiographique, pas l'apophysite) : RV+ d'environ 1,5, RV− très bas" },
    { code: "COUD-P10", cle: "lanceur|localisation.mediale>lanceur", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P11", cle: "lanceur|p_epi_med>lanceur", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P12", cle: "luxation|deformation_vue>luxation", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P13", cle: "luxation|ex_deformation>luxation", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P14", cle: "luxation|ext_test>luxation", note: "OpenEvidence (24 nov. 2026) : aucune donnée pour la luxation ; pour la fracture, RV+ 1,9 et RV− 0,03 (adultes), 0,11 (enfants) (Appelboam 2008)" },
    { code: "COUD-P15", cle: "bursite|enflure_post>bursite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P16", cle: "bursite|ex_bourse>bursite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P17", cle: "bursite_septique|enflure_post>bursite_septique", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P18", cle: "bursite_septique|ex_bourse>bursite_septique", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P19", cle: "lcu|sport.lancer>lcu", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P20", cle: "lcu|localisation.mediale>lcu", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P21", cle: "biceps|pop>biceps", note: "OpenEvidence (24 nov. 2026) : « pop » chez 17 patients sur 48 (Devereaux 2013) ; aucune spécificité" },
    { code: "COUD-P22", cle: "biceps|localisation.anterieure>biceps", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P23", cle: "biceps|ex_ecchymose_ant>biceps", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P24", cle: "ocd|blocage_coude>ocd", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P25", cle: "conflit_post|localisation.posterieure>conflit_post", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P26", cle: "triceps|localisation.posterieure>triceps", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P27", cle: "triceps|extension_contre_gravite>triceps", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P28", cle: "tunnel_radial|localisation.lat_distale>tunnel_radial", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "COUD-P29", cle: "arthrite|autres_articulations>arthrite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
  ];
  window.Locomoteur.definir({
    frequencesRevues: { date: "2026-11-24", source: "outils/locomoteur/sources/openevidence-reponses/2026-11-24-cervical-epaule-coude-poignet.md", verdict: "Aucune courbe confirmée ; rapports femmes-hommes et quelques fréquences corrigés là où des données publiées les contredisent" },
    revues: REVUES_OE,
    id: "coude", partie: "coude", partieExamen: "coude", en: "elbow", rc: "Douleur au coude",
    titre: "Douleur au coude", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.coude || {}).sources,

    diagnostics: [
      { id: "epi_lat", nom: "Épicondylite latérale (tennis elbow)", n: "épicondylite latérale", base: [[12, .06], [25, .2], [45, .35], [60, .25], [80, .12]],
        repere: "3,4/1 000 personnes-années, pic de 9/1 000 à 40–49 ans ; 40–50 % des joueurs de tennis amateurs sur la vie (A, C)" },
      { id: "epi_med", nom: "Épicondylite médiale (golfer's elbow)", n: "épicondylite médiale", base: [[12, .02], [25, .05], [45, .08], [70, .04]], repere: "Prévalence 0,4 % ; 10–20 % des épicondylites (A)" },
      { id: "lanceur", nom: "Coude du lanceur juvénile (apophysite de l'épicondyle médial)", n: "coude du lanceur juvénile", base: [[12, .06], [14, .05], [17, .01], [20, .001]], sexe: { M: 1.5, F: .7 },
        repere: "Anomalie de l'épicondyle médial chez 40–58 % des jeunes joueurs de baseball (A)" },
      { id: "fracture", grave: true, nom: "Fracture du coude (tête ou col radial, olécrâne, humérus distal, épicondyle médial)", n: "fracture du coude", base: [[12, .04], [30, .03], [65, .04], [85, .06]],
        repere: "Tête et col radial 28–39/100 000/an (adulte) ; olécrâne 11,5–12/100 000, âge médian 66 ans ; humérus distal surtout chez la femme de plus de 60 ans (A)" },
      { id: "luxation", grave: true, nom: "Luxation du coude", n: "luxation du coude", base: [[12, .02], [18, .015], [40, .006], [70, .003]], repere: "5,2/100 000, pic à 10–19 ans (A)" },
      { id: "tunnel_cubital", nom: "Syndrome du tunnel cubital (neuropathie ulnaire au coude)", n: "neuropathie ulnaire au coude", base: [[12, .005], [30, .04], [50, .07], [70, .06]], sexe: { M: 1.13, F: .87 }, repere: "1,3 homme pour 1 femme en médecine familiale au Royaume-Uni (OpenEvidence, 24 nov. 2026)",
        repere: "30/100 000 personnes-années (A)" },
      { id: "bursite", nom: "Bursite olécrânienne aseptique", n: "bursite olécrânienne", base: [[12, .01], [40, .06], [70, .07]], sexe: { M: 2, F: .6 }, repere: "Au moins 10/100 000/an, environ un tiers septiques (A)" },
      { id: "bursite_septique", grave: true, nom: "Bursite olécrânienne septique", n: "bursite olécrânienne septique", base: [[12, .003], [40, .025], [70, .03]], sexe: { M: 2, F: .6 },
        repere: "Environ un tiers des bursites olécrâniennes (A)" },
      { id: "arthrose", nom: "Arthrose du coude", n: "arthrose du coude", base: [[12, .001], [40, .015], [60, .05], [80, .08]], sexe: { M: 1.5, F: .7 },
        repere: "Radiographique 25,2 % à 50–89 ans, symptomatique 0,9 % ; souvent post-traumatique ou chez le travailleur manuel (A, C)" },
      { id: "lcu", nom: "Lésion du ligament collatéral ulnaire (lanceur)", n: "lésion du ligament collatéral ulnaire", base: [[12, .002], [14, .006], [16, .02], [22, .03], [35, .005], [50, .001]], sexe: { M: 1.76, F: .24 }, repere: "Reconstructions : 88 % d'hommes ; pic de 15 à 19 ans (OpenEvidence, 24 nov. 2026)",
        repere: "0,95–1,4/10 000 expositions au baseball universitaire ; 31,8–33,1 % des lésions du coude au baseball (A, C)" },
      { id: "biceps", grave: true, nom: "Rupture distale du biceps", n: "rupture distale du biceps", base: [[12, .0002], [30, .004], [45, .01], [65, .006]], sexe: { M: 1.9, F: .1 }, repere: "95 à 96 % d'hommes dans les séries (l'estimation donnait 100 pour 1) (OpenEvidence, 24 nov. 2026)",
        repere: "1,2–2,55/100 000 ; 92–96 % d'hommes, âge moyen 46 ans (A, C)" },
      { id: "ocd", nom: "Ostéochondrite disséquante du capitulum", n: "ostéochondrite du capitulum", base: [[12, .015], [15, .012], [18, .004], [25, .0005]], sexe: { M: 1.73, F: .27 }, repere: "Incidence de 3,8 contre 0,6 pour 100 000 chez le garçon et la fille (OpenEvidence, 24 nov. 2026)",
        repere: "3,4–3,5 % des adolescents joueurs de baseball (A)" },
      { id: "conflit_post", nom: "Conflit postérieur ou fracture de stress de l'olécrâne (lanceur)", n: "conflit postérieur du coude", base: [[12, .005], [18, .01], [30, .006], [50, .002]],
        repere: "Lésion de l'olécrâne la plus rapportée chez le sportif ; pas d'incidence (A)" },
      { id: "triceps", nom: "Tendinopathie ou rupture distale du triceps", n: "tendinopathie du triceps", base: [[12, .002], [30, .008], [50, .008], [70, .005]], sexe: { M: 1.86, F: .14 }, repere: "93 % d'hommes dans la plus grande série de ruptures (OpenEvidence, 24 nov. 2026)",
        repere: "Pas de donnée retrouvée (†)" },
      { id: "tunnel_radial", nom: "Syndrome du tunnel radial", n: "syndrome du tunnel radial", base: [[12, .002], [30, .01], [50, .01], [70, .005]], repere: "Pas de donnée retrouvée (†)" },
      { id: "arthrite", nom: "Arthrite inflammatoire ou microcristalline du coude (goutte, chondrocalcinose, PAR)", n: "arthrite du coude", base: [[12, .002], [40, .008], [65, .02], [85, .03]],
        repere: "Pas de donnée spécifique au coude (†) ; tophus olécrânien chez le goutteux âgé (C)" },
      { id: "cervical", nom: "Douleur projetée d'origine cervicale (C6–C7)", n: "douleur projetée cervicale", base: [[12, .005], [35, .02], [55, .04], [75, .03]],
        repere: "Radiculopathie cervicale 83,2/100 000/an, pic à 50–54 ans (A, rachis cervical)" },
    ],
    compatibles: [["epi_lat", "tunnel_radial"], ["epi_med", "tunnel_cubital"], ["epi_med", "lcu"], ["lanceur", "lcu"], ["lanceur", "ocd"], ["lcu", "conflit_post"], ["fracture", "luxation"],
      ["arthrose", "tunnel_cubital"], ["arthrose", "conflit_post"], ["arthrite", "bursite"], ["epi_lat", "cervical"], ["tunnel_cubital", "cervical"]],
    residuel: { id: "nonspec", nom: "Douleur non spécifique (aucun diagnostic précis)", n: "douleur du coude non spécifique",
      explication: "Probabilité qu'aucun des diagnostics de la liste ne soit en cause (douleur non spécifique ou contusion) : elle monte quand les éléments spécifiques sont absents ou négatifs. Penser aussi à une douleur projetée (cou, épaule).",
      conduite: items(21) },

    grappes: [
      { id: "biceps_2pos", dx: "biceps", nom: "Hook test et intervalle du pli bicipital tous deux positifs", rv: 20, couvre: ["hook", "pli_bicipital"], statut: "verifie",
        piste: `${ZWERUS} : Se 94 %, Sp 100 % (RV+ non calculable, plafonné à 20)`, si: L => L.oui("hook") && L.oui("pli_bicipital") },
      { id: "biceps_2neg", dx: "biceps", nom: "Hook test et intervalle du pli bicipital tous deux négatifs", rv: .06, couvre: ["hook", "pli_bicipital"], statut: "verifie",
        piste: `${ZWERUS} : RV− 0,06`, si: L => L.non("hook") && L.non("pli_bicipital") },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Coude atteint", "Droit", "Gauche", { arthrite: 3, arthrose: 1.5, cervical: .5, fracture: .1, luxation: .05, biceps: .1, triceps: .3, lanceur: .3, lcu: .2, ocd: .7 }, "Douleur aux coudes"),
        C.accompagne(), C.refere(),
        C.travail({ manuel: { epi_lat: 1.8, epi_med: 1.8, arthrose: 2, tunnel_cubital: 1.3, biceps: 1.5, tunnel_radial: 1.5 }, bureau: { epi_lat: 1.3, tunnel_cubital: 1.5 }, physique: { epi_lat: 1.3, epi_med: 1.3 } }),
        C.travailPrecision(),
        C.sport({ lancer: { lanceur: 5, lcu: 5, ocd: 3, conflit_post: 4, epi_med: 1.5 }, raquette: { epi_lat: 2, epi_med: 1.3 }, golf: { epi_med: 2, epi_lat: 1.3 },
          muscu: { biceps: 2, triceps: 2, epi_med: 1.3 }, escalade: { epi_med: 1.5, epi_lat: 1.3 }, contact: { luxation: 1.5, fracture: 1.3, bursite: 1.5 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(), C.atcdMedicaux(),
        ouiNon("diabete", "Diabète", { oui: "diabète", non: "", effets: { bursite_septique: p(1.5, .95), tunnel_cubital: p(1.3, .97) } }),
        ouiNon("osteoporose", "Ostéoporose ou fracture de fragilité", { oui: "ostéoporose", non: "", effets: { fracture: p(2, .9) } }),
        ouiNon("atcd_fracture_coude", "Fracture ou luxation antérieure de ce coude", { oui: "ATCD de fracture ou luxation de ce coude", non: "", effets: { arthrose: p(4, .7), tunnel_cubital: p(1.5, .95) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux(), C.atcdRhumato("arthrite", 4, 2.5, { rv: { goutte: [{ dx: "bursite", rvp: 1.5, rvn: 1 }] } }),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ lanceur: p(1.2, .9) }), C.depuis(), C.contexte(),
          C.duree({ lt7: { fracture: 3, luxation: 2, biceps: 2.5, triceps: 2, bursite_septique: 2.5, arthrite: 1.5, lcu: 1.3, arthrose: .2, epi_lat: .4, epi_med: .4, tunnel_cubital: .4, tunnel_radial: .4, ocd: .4 },
            s1_6: { epi_lat: 1.2, epi_med: 1.2, lanceur: 1.5, bursite: 1.3, fracture: .8, luxation: .5 },
            s6_12: { epi_lat: 1.3, epi_med: 1.3, lanceur: 1.3, ocd: 1.5, conflit_post: 1.5, tunnel_cubital: 1.3, fracture: .2, luxation: .1, biceps: .3 },
            gt3m: { epi_lat: 1.5, epi_med: 1.5, arthrose: 3, tunnel_cubital: 2, tunnel_radial: 2, ocd: 1.5, fracture: .05, luxation: .03, biceps: .2, bursite_septique: .2 } }),
          C.apparition({ subit_trauma: { fracture: 8, luxation: 4, biceps: 4, triceps: 3, lcu: 2, bursite: 1.5, epi_lat: .2, epi_med: .3, arthrose: .3, tunnel_cubital: .5, tunnel_radial: .3, cervical: .3, arthrite: .2 },
            subit: { arthrite: 4, bursite_septique: 3, bursite: 2, lcu: 1.5, biceps: 1.5, epi_lat: .7, arthrose: .5 },
            graduel: { epi_lat: 2, epi_med: 2, lanceur: 2.5, ocd: 2, conflit_post: 2, tunnel_radial: 1.5, tunnel_cubital: 1.5, bursite: 1.3, fracture: .1, luxation: .05, biceps: .3 },
            insidieux: { arthrose: 3, tunnel_cubital: 2, cervical: 1.5, tunnel_radial: 1.5, epi_lat: 1.2, fracture: .1, luxation: .03, biceps: .2, lcu: .5 } }),
          choix("mecanisme", "Mécanisme", [
            o("chute_main", "Chute sur la main tendue", { fracture: 3, luxation: 2, ocd: 1.3, biceps: .5 }, { n: "chute sur la main tendue" }),
            o("chute_coude", "Chute ou coup direct sur le coude", { fracture: 2.5, bursite: 2, bursite_septique: 1.5, luxation: .5 }, { n: "coup direct sur le coude" }),
            o("charge", "Charge lourde, coude forcé en extension (soulever, retenir)", { biceps: 8, triceps: 3, luxation: .3 }, { n: "charge excentrique, coude forcé en extension" }),
            o("lancer", "Lancer (douleur médiale à l'armé ou à l'accélération)", { lcu: 6, lanceur: 3, conflit_post: 2, epi_med: 1.5, fracture: .3 }, { n: "lancer" })],
            { si: trauma, masqueSi: "contexte" }),
          ouiNon("pop", "Claquement (« pop ») au moment de la blessure", { si: trauma, oui: "claquement", nie: "claquement",
            effets: { biceps: p(5, .3), triceps: p(3, .7), lcu: p(2.5, .8), luxation: p(1.5, .9) } }),
          ouiNon("deformation_vue", "Déformation visible ou coude « sorti de place »", { si: trauma, oui: "déformation visible", nie: "déformation", drapeau: true,
            effets: { luxation: p(15, .2), fracture: p(3, .8) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("laterale", "Latérale, à l'épicondyle", { epi_lat: p(5, .1), tunnel_radial: p(2, .7), ocd: p(2, .7), fracture: p(1.3, .9), epi_med: p(.3, 1.1), lcu: p(.3, 1.1) }, { n: "latérale" }),
            m("lat_distale", "Latérale, 3 à 5 cm sous l'épicondyle (avant-bras)", { tunnel_radial: p(5, .3), epi_lat: p(1.3, .95) }, { n: "à l'avant-bras proximal latéral" }),
            m("mediale", "Médiale, à l'épicondyle médial", { epi_med: p(5, .15), lanceur: p(5, .1), lcu: p(5, .2), tunnel_cubital: p(2, .7), epi_lat: p(.3, 1.1) }, { n: "médiale" }),
            m("posterieure", "Postérieure, à l'olécrâne", { bursite: p(3, .3), bursite_septique: p(3, .3), conflit_post: p(5, .3), triceps: p(5, .3), fracture: p(1.3, .9) }, { n: "postérieure" }),
            m("anterieure", "Antérieure, au pli du coude", { biceps: p(6, .2), arthrose: p(1.3, .9) }, { n: "antérieure" }),
            m("diffuse", "Diffuse, dans tout le coude", { arthrite: p(3, .5), arthrose: p(2, .7), fracture: p(1.5, .8), cervical: p(1.5, .9), epi_lat: p(.5, 1.05) }, { n: "diffuse" }),
          ], { gabarit: "douleur {v}" }),
          C.type({ brulure: { tunnel_cubital: 2, tunnel_radial: 1.5, cervical: 2 }, choc: { tunnel_cubital: 2, cervical: 2 }, pulsatile: { bursite_septique: 2, arthrite: 1.5 }, sourde: { arthrose: 1.3, tunnel_radial: 1.3 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("prehension_agg", "Pire en serrant ou en saisissant un objet (poignée, tasse)", { g: "facteurs", agg: "la préhension", aggNie: "à la préhension",
            effets: { epi_lat: p(3, .3), epi_med: p(1.8, .6), tunnel_radial: p(1.5, .8) } }),
          ouiNon("flexion_prolongee", "Engourdi coude plié longtemps (téléphone, sommeil)", { g: "facteurs", agg: "la flexion prolongée du coude", aggNie: "coude fléchi",
            effets: { tunnel_cubital: p(3, .5) } }),
          ouiNon("appui_coude", "Pire en s'appuyant sur le coude", { g: "facteurs", agg: "l'appui sur le coude", aggNie: "à l'appui sur le coude",
            effets: { bursite: p(3, .5), bursite_septique: p(2.5, .5), tunnel_cubital: p(1.5, .9), conflit_post: p(1.3, .9) } }),
          ouiNon("lancer_agg", "Douleur en lançant ou au service", { g: "facteurs", agg: "le lancer", aggNie: "au lancer",
            effets: { lcu: p(4, .3), lanceur: p(4, .3), conflit_post: p(3, .5), ocd: p(2, .7), epi_med: p(1.5, .8) } }),
          ouiNon("cou_agg", "Douleur aggravée par les mouvements du cou", { agg: "les mouvements du cou", aggNie: "aux mouvements du cou", effets: { cervical: p(5, .5) } }),
          C.attenuants(),
          C.moment({ matin: { arthrite: 2, arthrose: 1.3 }, soir: { epi_lat: 1.2, epi_med: 1.2, arthrose: 1.2 }, constante: { bursite_septique: 2, arthrite: 1.5, fracture: 1.5 } }),
          C.nocturne({ tunnel_cubital: p(1.5, .8), arthrite: p(1.5, .9), bursite_septique: p(1.5, .9) }),
          C.raideur({ plus30: { arthrite: 4 }, moins30: { arthrose: 1.5 } }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("blocage_coude", "Blocage ou accrochage du coude", { oui: "blocage du coude", nie: "blocage",
            effets: { ocd: p(5, .5), arthrose: p(3, .7), conflit_post: p(2, .8), epi_lat: { rvp: .4, rvn: 1.05, statut: "a_verifier", piste: `${ZWERUS_LAT} ; le blocage oriente ailleurs` } } }),
          ouiNon("enflure_post", "Enflure derrière le coude (« balle » sur l'olécrâne)", { oui: "enflure postérieure", nie: "enflure postérieure",
            effets: { bursite: p(15, .2), bursite_septique: p(15, .2), arthrite: p(1.5, .9), triceps: p(1.5, .95) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { oui: "rougeur et chaleur", nie: "rougeur ou chaleur", drapeau: true,
            effets: { bursite_septique: p(4, .3), arthrite: p(3, .5), bursite: p(.7, 1.1) } }),
          ouiNon("plaie", "Éraflure, plaie ou piqûre sur le coude", { oui: "porte d'entrée cutanée", nie: "porte d'entrée cutanée", effets: { bursite_septique: p(4, .7) } }),
          ouiNon("paresthesies_ulnaires", "Engourdissements ou picotements des 4ᵉ et 5ᵉ doigts", { oui: "paresthésies des 4ᵉ et 5ᵉ doigts", nie: "paresthésie",
            effets: { tunnel_cubital: verRv(1.27, .5, `${RUBIN} : symptômes sensitifs, RV+ 1,27 (RV− provisoire)`), cervical: p(1.5, .9), epi_med: p(1.3, .95) } }),
          ouiNon("schema_main", "Engourdissement limité au 5ᵉ doigt et à la moitié ulnaire du 4ᵉ (schéma de la main)", { si: L => L.oui("paresthesies_ulnaires"), oui: "territoire ulnaire strict", non: "",
            effets: { tunnel_cubital: ver(.5, .93, `${WERNER} : RV+ 7,1 (calculé)`) } }),
          ouiNon("paresthesies_autres", "Engourdissements du pouce, de l'index ou de tout le bras", { oui: "paresthésies hors du territoire ulnaire", nie: "",
            effets: { cervical: p(3, .7), tunnel_cubital: p(.6, 1.1) } }),
          ouiNon("faiblesse_main", "Faiblesse ou maladresse de la main", { oui: "faiblesse de la main", nie: "faiblesse de la main", effets: { tunnel_cubital: p(2.5, .8), cervical: p(1.5, .95) } }),
          ouiNon("autres_articulations", "Autres articulations enflées ou douloureuses", { oui: "autres articulations atteintes", nie: "autre articulation atteinte", effets: { arthrite: p(5, .6) } }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ bursite_septique: p(4, .6), arthrite: p(1.5, .9) }), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("infiltration", "Infiltration récente du coude", { bursite_septique: p(3, 1) }, { n: "infiltration récente" })]),
          ouiNon("doigts_froids", "Main froide, pâle ou engourdie après le traumatisme", { si: trauma, oui: "main froide ou engourdie", nie: "trouble circulatoire", drapeau: true, effets: { fracture: p(3, .95), luxation: p(3, .95) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        { titre: "Inspection et palpation", sep: ", ", toutNormal: true, questions: [
          ouiNon("ex_deformation", "Déformation ou perte des repères (triangle olécrânien)", { oui: "déformation", non: "pas de déformation", effets: { luxation: p(15, .2), fracture: p(3, .8) } }),
          ouiNon("ex_bourse", "Tuméfaction de la bourse olécrânienne", { oui: "tuméfaction de la bourse olécrânienne", non: "pas de bursite visible",
            effets: { bursite: p(20, .1), bursite_septique: p(20, .1) } }),
          ouiNon("ex_erytheme_bourse", "Érythème sur la bourse olécrânienne", { si: L => L.oui("ex_bourse"), oui: "érythème de la bourse", non: "bourse sans érythème",
            effets: { bursite_septique: verRv(3.1, .23, REILLY) } }),
          ouiNon("p_bourse", "Bourse olécrânienne douloureuse à la palpation", { si: L => L.oui("ex_bourse"), oui: "bourse douloureuse", non: "bourse indolore",
            effets: { bursite_septique: verRv(2.4, .19, REILLY) } }),
          ouiNon("ex_epanchement", "Épanchement articulaire (fossette para-olécrânienne comblée)", { oui: "épanchement du coude", non: "pas d'épanchement",
            effets: { fracture: p(3, .5), arthrite: p(4, .4), luxation: p(2, .8), ocd: p(2, .8), bursite: p(.5, 1) } }),
          ouiNon("ex_chaleur", "Chaleur articulaire", { oui: "coude chaud", non: "", effets: { arthrite: p(4, .5), bursite_septique: p(2.5, .6) } }),
          ouiNon("ex_ecchymose_ant", "Ecchymose antécubitale", { oui: "ecchymose au pli du coude", non: "", horsNormal: true, effets: { biceps: p(6, .5), fracture: p(1.5, .9) } }),
          ouiNon("ex_tophus", "Tophus", { oui: "tophus", non: "", horsNormal: true, effets: { arthrite: p(8, .9), bursite: p(2, .95) } }),
          ouiNon("p_epi_lat", "Épicondyle latéral douloureux", { oui: "épicondyle latéral douloureux", non: "épicondyle latéral indolore", effets: { epi_lat: p(5, .1), tunnel_radial: p(1.5, .8) } }),
          ouiNon("p_radial_distal", "Douleur 3 à 5 cm sous l'épicondyle latéral (arcade de Frohse)", { oui: "douleur à l'arcade de Frohse", non: "", horsNormal: true,
            effets: { tunnel_radial: { rvp: 5, rvn: .3, statut: "a_verifier", piste: "Aide-mémoire Québec (fiche 19, †) : critère clinique, sans précision publiée" }, epi_lat: p(1.2, .95) } }),
          ouiNon("p_epi_med", "Épicondyle médial douloureux", { oui: "épicondyle médial douloureux", non: "épicondyle médial indolore", effets: { epi_med: p(5, .1), lanceur: p(6, .1), lcu: p(1.5, .8) } }),
          ouiNon("p_lcu", "Ligament collatéral ulnaire douloureux (sous l'épicondyle médial)", { oui: "ligament collatéral ulnaire douloureux", non: "", horsNormal: true,
            effets: { lcu: p(4, .3), lanceur: p(1.5, .8) } }),
          ouiNon("p_tete_radiale", "Tête radiale douloureuse", { oui: "tête radiale douloureuse", non: "tête radiale indolore", effets: { fracture: p(3, .3), ocd: p(1.5, .9) } }),
          ouiNon("p_olecrane", "Olécrâne douloureux (os)", { oui: "olécrâne douloureux", non: "olécrâne indolore", effets: { fracture: p(2.5, .5), conflit_post: p(3, .4), triceps: p(2, .7) } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_flexion", "Flexion active", "flexion", { lim_douleur: { fracture: 2, arthrite: 2, luxation: 2 }, lim_raideur: { arthrose: 3 }, complete: { fracture: .5, arthrite: .7 } }),
          C.amplitude("arom_extension", "Extension active", "extension", { lim_douleur: { ocd: 2, conflit_post: 2, arthrite: 2 }, lim_raideur: { arthrose: 3, ocd: 1.5 }, complete: { arthrose: .3, ocd: .5, arthrite: .6 } }, true),
          ouiNon("pronosup", "Prono-supination limitée ou douloureuse", { oui: "prono-supination limitée", non: "prono-supination complète", effets: { fracture: p(3, .4), arthrose: p(1.5, .8), arthrite: p(1.5, .8) } }),
        ] },
        { titre: "Résistés", ligne: "Résistés", toutNormal: true, questions: [
          ouiNon("cozen", "Extension résistée du poignet (Cozen)", { court: "Cozen", res: TEST,
            effets: { epi_lat: { rvp: 2.5, rvn: .12, statut: "a_verifier", piste: `${KARANASIOS} : Se 91 % (spécificité non publiée ; RV+ provisoire)` }, tunnel_radial: p(1.5, .8) } }),
          ouiNon("maudsley", "Extension résistée du 3ᵉ doigt (Maudsley)", { court: "Maudsley", res: TEST, horsNormal: true,
            effets: { epi_lat: { rvp: 2, rvn: .4, statut: "a_verifier", piste: `${KARANASIOS} : Se 70 % (spécificité non publiée)`, g: "lateral" }, tunnel_radial: p(2, .7) } }),
          ouiNon("prehension", "Préhension plus faible coude en extension qu'en flexion", { oui: "préhension plus faible coude tendu", non: "", horsNormal: true,
            effets: { epi_lat: ver(.8, .85, `${KARANASIOS} : Se 78–83 %, Sp 80–90 %`, { g: "lateral" }) } }),
          ouiNon("flexion_pronation_res", "Flexion du poignet ou pronation résistée douloureuse", { oui: "flexion-pronation résistée douloureuse", non: "flexion-pronation résistée indolore",
            effets: { epi_med: p(4, .25), lanceur: p(2, .6), lcu: p(1.3, .9) } }),
          ouiNon("supination_faible", "Supination résistée faible", { oui: "supination faible", non: "supination forte", effets: { biceps: ver(.95, .21, `${ZWERUS} : Se 95 %, Sp 21 % (RV+ 1,20, calculé)`) } }),
          ouiNon("extension_contre_gravite", "Extension active du coude contre la gravité impossible", { oui: "extension active impossible", non: "extension active contre gravité possible",
            effets: { triceps: p(10, .3), fracture: p(3, .8) } }),
        ] },
        { titre: "Neurologique", ligne: "Neuro", toutNormal: true, questions: [
          ouiNon("hypo_ulnaire", "Hypoesthésie du 5ᵉ doigt", { oui: "hypoesthésie du 5ᵉ doigt", non: "sensibilité des doigts normale", effets: { tunnel_cubital: p(3, .6), cervical: p(1.5, .9) } }),
          ouiNon("froment", "Froment ou faiblesse des interosseux", { court: "Froment", res: TEST, effets: { tunnel_cubital: p(4, .8) } }),
          ouiNon("tinel_cubital", "Tinel au coude (gouttière ulnaire)", { court: "Tinel au coude", res: TEST, effets: { tunnel_cubital: verRv(1.3, .72, `${BEEKMAN} : Se 62 %, Sp 53 %`) } }),
          ouiNon("spurling_coude", "Spurling ou mouvements du cou reproduisant la douleur", { oui: "douleur reproduite par le cou", non: "cou indolore", effets: { cervical: p(5, .4) } }),
          ouiNon("pouls_dim", "Pouls radial diminué ou main mal perfusée", { oui: "pouls radial diminué", non: "pouls radial normal", drapeau: true, effets: { fracture: p(3, .97), luxation: p(3, .97) } }),
        ] },
        { titre: "Tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("ext_test", "Test d'extension : extension complète impossible", { court: "test d'extension", si: trauma, effets: { fracture: ver(.968, .485, `${APPELBOAM} : RV− 0,03 chez l'adulte, 0,11 chez l'enfant`, { g: "amplitudes" }),
            luxation: p(1.5, .1) } }),
          ouiNon("amp4", "Une des 4 amplitudes actives limitée (extension, flexion à 90°, pronation, supination)", { court: "test des quatre amplitudes", si: trauma, horsNormal: true,
            effets: { fracture: ver(.99, .6, `${VINSON} : RV+ 2,48 ; RV− 0,017 (calculés)`, { g: "amplitudes" }) } }),
          ouiNon("hook", "Hook test (tendon du biceps non crocheté)", { court: "hook test", effets: { biceps: ver(.71, .955, `${ZWERUS} : RV+ 15,7 ; RV− 0,30`) } }),
          ouiNon("pli_bicipital", "Intervalle du pli bicipital de plus de 6 cm", { court: "intervalle du pli bicipital", horsNormal: true, effets: { biceps: ver(.81, .91, ZWERUS) } }),
          ouiNon("moving_valgus", "Moving valgus stress test", { court: "moving valgus", horsNormal: true, effets: { lcu: ver(.98, .75, `${SCIASCIA} : RV+ 3,94 ; RV− 0,02`, { g: "lcu" }) } }),
          ouiNon("milking", "Milking maneuver (stress en valgus)", { court: "milking", horsNormal: true, effets: { lcu: ver(.77, .85, `${SCIASCIA} : RV+ 5,1 ; RV− 0,28`, { g: "lcu" }), lanceur: p(1.5, .9) } }),
        ] },
        { titre: "Épaule et cou", adjacent: "épaule", toutNormal: true, questions: [
          choix("cou_mob", "Cou : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation du cou indolore" }), o("douleur", "Douloureuse ou reproduit la douleur du coude", { cervical: 4 }, { n: "mobilisation du cou douloureuse" })]),
          choix("epaule_mob", "Épaule : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation de l'épaule indolore" }), o("douleur", "Douloureuse ou limitée", { cervical: 1.3 }, { n: "mobilisation de l'épaule douloureuse" })]),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      L => (L.oui("deformation_vue") || L.oui("ex_deformation") || L.oui("pouls_dim") || L.oui("doigts_froids"))
        ? { niveau: "urgence", titre: L.oui("pouls_dim") || L.oui("doigts_froids") ? "Atteinte neurovasculaire à éliminer" : "Luxation ou fracture déplacée à éliminer", ro: "luxation ou fracture du coude",
          texte: "Déformation, main froide ou pouls diminué : examen neurovasculaire (nerfs radial, médian, ulnaire), attelle sans réduction forcée, radiographie et évaluation d'urgence.", conduite: items(12) } : null,
      L => {
        if (!L.trauma() || (L.repondu("duree") && !L.dans("duree", ["lt7", "s1_6"])) || L.dans("mecanisme", ["charge", "lancer"])) return null;
        if (L.oui("ext_test") || L.oui("amp4")) return { niveau: "rapide", titre: "Radiographie du coude indiquée", ro: "fracture du coude",
          texte: L.oui("ext_test") ? "Extension complète impossible après un traumatisme (Se 96,8 %)." : "Une des quatre amplitudes actives est limitée.", conduite: [{ t: "Radiographies face, profil et oblique (coussinets graisseux)" }, ...items(6)] };
        if (L.non("ext_test")) return { niveau: "info", titre: "Test d'extension négatif", texte: "Extension complète possible : fracture peu probable (RV− 0,03 chez l'adulte, 0,11 chez l'enfant). Reconsulter si la douleur persiste 7 à 10 jours." };
        return { niveau: "info", titre: "Test d'extension à faire", texte: "Traumatisme récent : l'extension complète possible rend la fracture peu probable (RV− 0,03)." };
      },
      L => (L.oui("ex_bourse") || L.oui("enflure_post")) && (L.oui("fievre") || L.oui("ex_erytheme_bourse") || L.oui("plaie") || (L.oui("rougeur_chaleur") && L.oui("p_bourse")))
        ? { niveau: L.oui("fievre") ? "urgence" : "rapide", titre: "Bursite olécrânienne septique à éliminer", ro: "bursite septique",
          texte: `Bursite avec ${[L.oui("fievre") && "fièvre", L.oui("ex_erytheme_bourse") && "érythème", L.oui("plaie") && "porte d'entrée cutanée", L.oui("rougeur_chaleur") && "chaleur"].filter(Boolean).join(", ")}. Ponction avant tout antibiotique.`,
          conduite: items(8) } : null,
      C.regles.septique("un coude", ["rougeur_chaleur", "ex_chaleur"], [["ex_epanchement", ["oui"]]]),
      L => (L.trauma() && (L.oui("pop") || L.oui("ex_ecchymose_ant")) && (L.oui("hook") || L.oui("pli_bicipital") || L.a("localisation", "anterieure")))
        ? { niveau: "rapide", titre: "Rupture distale du biceps à éliminer", ro: "rupture distale du biceps", texte: "Claquement ou ecchymose antécubitale après une charge : la réparation est idéale en 2 à 4 semaines.", conduite: items(14) } : null,
      L => (L.oui("extension_contre_gravite") && (L.trauma() || L.a("localisation", "posterieure")))
        ? { niveau: "rapide", titre: "Rupture du triceps ou fracture de l'olécrâne à éliminer", ro: "rupture du triceps", texte: "Extension active contre la gravité impossible : radiographie de profil (écaille osseuse) et orthopédie.", conduite: items([18, 10]) } : null,
      L => (L.oui("froment") || (L.oui("faiblesse_main") && L.oui("paresthesies_ulnaires")))
        ? { niveau: "rapide", titre: "Atteinte motrice du nerf ulnaire", ro: "neuropathie ulnaire sévère", texte: "Faiblesse des muscles intrinsèques : EMG et référence (chirurgie à considérer avant l'atrophie).", conduite: items(7) } : null,
      L => (L.a("localisation", "laterale") && !L.trauma() && ((L.age !== null && L.age <= 30) || L.v("apparition") === "subit" || L.oui("blocage_coude")))
        ? { niveau: "considerer", titre: "Autre diagnostic que l'épicondylite à considérer", ro: "autre cause de douleur latérale",
          texte: "Douleur latérale avec un âge de 30 ans ou moins, un début aigu ou un blocage : 46,5 % des douleurs latérales ont un autre diagnostic (ostéochondrite, arthrose, fracture, instabilité)." } : null,
      L => (L.age !== null && L.age < 18 && (L.oui("lancer_agg") || L.a("sport", "lancer")) && (L.a("localisation", "mediale") || L.a("localisation", "laterale")))
        ? { niveau: "considerer", titre: "Coude du lanceur juvénile : arrêter les lancers", ro: "apophysite médiale ou ostéochondrite du capitulum",
          texte: "Jeune lanceur avec douleur médiale ou latérale : radiographies comparatives ; arrêt complet des lancers 4 à 6 semaines.", conduite: items([4, 15]) } : null,
      C.regles.tumeur("Radiographie du coude ; IRM selon le tableau."),
    ],
  });
})();
