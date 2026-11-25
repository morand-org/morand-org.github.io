/* Locomoteur Morand, rachis cervical (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), parties A à H.
   « Cervicalgie non spécifique » tient lieu de douleur non spécifique : pas de reste calculé.
   Format : p() provisoire, est() à vérifier, ver()/verRv() vérifié avec sa source. « † » du document : statut « à vérifier ». */
(function () {
  "use strict";
  const { p, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), PALP = "palp", TEST = "test";
  const WAINNER = "Wainner et coll., 2003, Spine (PMID 12544957 ; EMG, n = 82)", THOOMES = "Thoomes et coll., 2026, méta-analyse des tests neurodynamiques";
  const COOK = "Cook et coll., 2010, JOSPT (cluster de myélopathie, n = 249)", MYELO = "Myélopathie : 139 cas contre 108 témoins sains (spécificité surestimée)";
  const STIELL = "Stiell et coll., 2001, JAMA (PMID 11597289) ; 10 études, n = 35 544", HALL = "Hall et coll., méta-analyse : test de flexion-rotation (n = 182)";
  const NEURO = ["ultt", "rotation60", "distraction", "spurling"], COOKM = L => [L.oui("marche_myelo"), L.oui("hoffmann"), L.oui("supinateur"), L.oui("babinski"), L.age !== null && L.age > 45];

  const ANGLAIS = { nonspec: "non-specific mechanical neck pain", myofascial: "myofascial pain syndrome of the upper trapezius", facettaire: "cervical facet joint pain",
    arthrose: "cervical spondylosis or degenerative disc disease", entorse: "whiplash-associated disorder", cervicogenique: "cervicogenic headache", musculaire: "cervical muscle strain in athletes",
    radiculopathie: "cervical radiculopathy", stinger: "stinger or burner (brachial plexus neurapraxia)", torticolis: "acute acquired torticollis", ppr: "polymyalgia rheumatica",
    myelopathie: "degenerative cervical myelopathy", par: "cervical spine involvement in rheumatoid arthritis (atlantoaxial instability)", fracture: "cervical spine fracture (odontoid, fragility)",
    defile: "thoracic outlet syndrome", infection: "cervical spondylodiscitis or epidural abscess", arnold: "occipital neuralgia" };

  const CONDUITES = C.aideMemoire("cervical", { nonspec: 1, myofascial: 2, facettaire: 3, arthrose: 4, entorse: 5, cervicogenique: 6, musculaire: 7, radiculopathie: 8, stinger: 9,
    torticolis: 10, ppr: 12, myelopathie: 13, par: 14, fracture: [15, 21], defile: 16, infection: 18, arnold: 19 });
  const items = ref => C.aideMemoire("cervical", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("cervical"),
    { titre: "Pour tous", items: [{ t: "Enseignement : rester actif, pas de collet cervical, pronostic habituellement favorable" },
      { t: "Consignes de reconsultation : faiblesse ou maladresse des mains, trouble de la marche, trouble urinaire, fièvre, céphalée inhabituelle" }] }];

  const INFOS = {
    rotation45: { info: "Règle canadienne C-spine (patient alerte et stable) : facteur de risque élevé (65 ans et plus, mécanisme dangereux, paresthésies des membres) → imagerie ; sinon, si un facteur de faible risque permet d'examiner, rotation active de 45° des deux côtés possible → pas d'imagerie. Se 99,9 %, RV− 0,007." },
    mecanisme_dangereux: { info: "Chute de 1 m ou 5 marches, charge axiale sur la tête (plongeon), accident à haute vitesse, tonneau ou éjection, accident de VTT ou de vélo." },
    ultt: { info: "Test de tension du nerf médian (ULTT A) : Se 97 %, Sp 22 % : négatif, il rend la radiculopathie peu probable (RV− 0,12). Les quatre tests neurodynamiques négatifs : RV− 0,06–0,08.", positif: "symptômes du bras reproduits, modifiés par la position du cou", video: "Upper limb tension test median nerve" },
    spurling: { info: "Extension, inclinaison et rotation vers le côté atteint avec compression axiale. Radiculopathie : Se 38–98 %, Sp 84–100 % : positif, il oriente fortement.", positif: "douleur radiculaire reproduite dans le bras", video: "Spurling test" },
    distraction: { info: "Traction axiale de la tête en décubitus. Radiculopathie : Se 44 %, Sp 90–97 % : le soulagement des symptômes du bras oriente.", positif: "symptômes du bras soulagés", video: "Cervical distraction test" },
    rotation60: { info: "Rotation active vers le côté atteint de moins de 60° : élément du cluster de Wainner (Se 89 %, Sp 49 %)." },
    abduction: { info: "Main posée sur la tête : soulagement de la douleur du bras. Radiculopathie : Se 49 %, Sp 76 % (RV+ 2,08)." },
    hoffmann: { info: "Pichenette de l'ongle du majeur : flexion du pouce et de l'index. Myélopathie : RV+ 2,2 ; RV− 0,63. Élément du cluster de Cook.", video: "Hoffmann sign" },
    marche_myelo: { info: "Trouble de la marche ou de l'équilibre : élément du cluster de myélopathie de Cook (avec Hoffmann, supinateur inversé, Babinski, âge de plus de 45 ans ; 3 sur 5 : RV+ 30,9 ; 0 ou 1 sur 5 : RV− 0,18)." },
    maladresse: { info: "Maladresse des mains (boutons, écriture) : RV+ 7,3 pour la myélopathie (contre témoins sains, spécificité surestimée)." },
    flexion_rotation: { info: "Cou en flexion maximale, rotation passive de chaque côté. Céphalée cervicogénique C1–C2 : Se 83 %, Sp 83 % (RV+ 5,0 ; RV− 0,2).", positif: "rotation réduite de plus de 10° du côté atteint ou moins de 32°", video: "Cervical flexion rotation test" },
    p_segment: { info: "Sensibilité segmentaire à la palpation : syndrome facettaire, Se 94 % ; son absence la rend peu probable (RV− 0,08)." },
    sharp_purser: { info: "Chez la personne atteinte de PAR : flexion du cou, poussée postérieure sur le front en stabilisant C2. Instabilité atlanto-axoïdienne : Se 88 %, Sp 96 %. À faire avec prudence.", video: "Sharp Purser test" },
    reflexe_bicipital: { info: "Réflexe bicipital diminué : RV+ 4,9 pour une radiculopathie (EMG). Les réflexes sont spécifiques mais peu sensibles." },
  };

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "CERV-P1", cle: "radiculopathie|bras_cou>radiculopathie", note: "OpenEvidence (24 nov. 2026) : spécificité élevée (≥ 80 %) dans une cohorte de 2e ligne ; valeur exacte non publiée dans le résumé" },
    { code: "CERV-P2", cle: "radiculopathie|rotation60>radiculopathie", statut: "verifie", piste: "Wainner et coll., 2003 (Spine, PMID 12544957), EMG : Se 89 %, Sp 49 % (chiffres du texte intégral)" },
    { code: "CERV-P3", cle: "radiculopathie|hypoesthesie>radiculopathie", se: 0.44, sp: 0.72, statut: "verifie", piste: "Cohorte néerlandaise de 2e ligne, IRM et diagnostic du spécialiste : Se 44 %, Sp 72 %, RV+ 1,56, RV− 0,78 (contre l'EMG : 2,27 et 0,84)" },
    { code: "CERV-P4", cle: "radiculopathie|spurling>radiculopathie", se: 0.5, sp: 0.86, statut: "verifie", piste: "Wainner et coll., 2003 (Spine, PMID 12544957), EMG : Se 50 %, Sp 86 %, RV+ 3,5, RV− 0,58 ; études d'imagerie non regroupables (Thoomes 2026)" },
    { code: "CERV-P5", cle: "radiculopathie|ultt>radiculopathie", se: 0.7, sp: 0.71, statut: "verifie", piste: "Thoomes et coll., 2026 (BMC Musculoskelet Disord, méta-analyse, 3 études de 2e ligne) : Se 70 %, Sp 71 %, RV+ 2,45, RV− 0,42 (Wainner, contre l'EMG : 1,3 et 0,12)" },
    { code: "CERV-P6", cle: "radiculopathie|distraction>radiculopathie", statut: "verifie", piste: "Wainner et coll., 2003 (Spine, PMID 12544957), EMG : Se 44 %, Sp 90 %, RV+ 4,4, RV− 0,62" },
    { code: "CERV-P7", cle: "grappe|wainner3", statut: "verifie", piste: "Wainner et coll., 2003 (Spine, PMID 12544957), EMG, n = 82 : 3 sur 4, Se 39 %, Sp 94 %, RV+ 6,1 ; 4 sur 4 : RV+ 30,3 ; pas de validation externe" },
    { code: "CERV-P8", cle: "myelopathie|maladresse>myelopathie", statut: "verifie", piste: "Soufi et coll., 2025 (Sci Rep), 139 myélopathies adressées contre 108 volontaires sains : Se 58 %, Sp 92 % (surestimation probable)" },
    { code: "CERV-P9", cle: "myelopathie|marche_myelo>myelopathie", statut: "verifie", piste: "Soufi et coll., 2025 (Sci Rep), même cohorte : déséquilibre rapporté, Se 58 %, Sp 92 %" },
    { code: "CERV-P10", cle: "myelopathie|sphincters>myelopathie", statut: "verifie", piste: "Soufi et coll., 2025 (Sci Rep), même cohorte : trouble urinaire, Se 41 %, Sp 91 % ; incontinence fécale Se 12 %, Sp 98 % ; « nouveau » ne faisait pas partie de la définition" },
    { code: "CERV-P11", cle: "myelopathie|tandem>myelopathie", note: "OpenEvidence (24 nov. 2026) : chiffres incohérents dans l'article source (Se 87 % ou 73 %, Sp 53 % ou 57 %)" },
    { code: "CERV-P12", cle: "defile|bras_leve_agg>defile", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P13", cle: "defile|paresthesies>defile", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P14", cle: "cervicogenique|localisation.tete>cervicogenique", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P15", cle: "radiculopathie|localisation.bras>radiculopathie", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P16", cle: "stinger|brulure_transitoire>stinger", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P17", cle: "torticolis|torticolis_vu>torticolis", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P18", cle: "torticolis|arom_rotation|complete", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P19", cle: "ppr|localisation.epaules_hanches>ppr", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P20", cle: "ppr|raideur|plus30", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P21", cle: "ppr|raideur_ceintures>ppr", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P22", cle: "myelopathie|babinski>myelopathie", rvp: 4, rvn: 0.7, statut: "verifie", piste: "Cook et coll., 2009 (JOSPT), pratique spécialisée du rachis, étude cas-témoins : Babinski RV+ 4,0, RV− 0,7" },
    { code: "CERV-P23", cle: "par|atcd_rhumato.par>par", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P24", cle: "infection|risque_infection.udi>infection", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CERV-P25", cle: "arnold|p_occipital>arnold", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
  ];
  window.Locomoteur.definir({
    revues: REVUES_OE,
    id: "cervical", partie: "cervical", partieExamen: "rachis cervical", en: "neck", rc: "Cervicalgie",
    titre: "Cervicalgie ou douleur cervico-brachiale", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", frequencesRevues: { date: "2026-11-24", source: "outils/locomoteur/sources/openevidence-reponses/2026-11-24-cervical-frequences.md", verdict: "Aucune courbe confirmée ; repères ajoutés, valeurs provisoires" }, infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.cervical || {}).sources,

    diagnostics: [
      { id: "nonspec", nom: "Cervicalgie non spécifique (mécanique, posturale)", n: "cervicalgie non spécifique", base: [[12, .45], [30, .45], [50, .4], [70, .35]], repere: "Médecine générale australienne, 45 ans et plus (POLAR) : 41 % des diagnostics cervicaux ; compatible à 50 et 70 ans ; aucune donnée avant 45 ans (Haas 2023) (OpenEvidence, 24 nov. 2026)",
        repere: "Prévalence annuelle 30–50 % chez l'adulte, 21–42 % chez l'enfant ; 41,2 % des codes en médecine générale (A, C)" },
      { id: "myofascial", nom: "Syndrome myofascial (trapèze supérieur)", n: "syndrome myofascial", base: [[12, .05], [25, .12], [45, .12], [70, .06]], sexe: { F: 1.4, M: .7 }, repere: "Aucune donnée parmi les consultants ; points gâchettes du trapèze chez 94 % des cervicalgies chroniques, selon la définition retenue (Cerezo-Téllez 2016) (OpenEvidence, 24 nov. 2026)",
        repere: "Points gâchettes chez 100 % de 224 cervicalgiques chroniques en soins primaires (A)" },
      { id: "facettaire", nom: "Syndrome facettaire cervical", n: "syndrome facettaire cervical", base: [[12, .01], [30, .05], [50, .1], [70, .12]], repere: "Aucune donnée en première ligne ; 49 % des cervicalgies chroniques en clinique de la douleur, par blocs diagnostiques (Manchikanti 2020) (OpenEvidence, 24 nov. 2026)",
        repere: "36–67 % des cervicalgies chroniques (blocs, milieu spécialisé) (A)" },
      { id: "arthrose", nom: "Arthrose cervicale ou discopathie dégénérative", n: "arthrose cervicale", base: [[12, .002], [35, .03], [50, .12], [65, .2], [80, .25]], repere: "POLAR, 45 ans et plus : 24 % (dégénérescence 20 %, discopathie 4 %) ; compatible à 65 ans (Haas 2023) (OpenEvidence, 24 nov. 2026)",
        repere: "Dégénérescence discale radiographique 54 % (98 % à 60–69 ans), souvent asymptomatique ; 20,1 % chez l'adulte (A, C)" },
      { id: "entorse", nom: "Entorse cervicale (whiplash)", n: "entorse cervicale", base: [[12, .04], [20, .08], [40, .06], [55, .03], [70, .025]], repere: "POLAR, 45 ans et plus : 2,7 % ; valeurs après 45 ans abaissées en conséquence ; aucune donnée avant 45 ans (Haas 2023) (OpenEvidence, 24 nov. 2026)",
        repere: "Plus de 300/100 000 ; 38 % encore douloureux à 12 mois (A, C)" },
      { id: "cervicogenique", nom: "Céphalée cervicogénique", n: "céphalée cervicogénique", base: [[12, .01], [30, .04], [50, .04], [70, .03]], sexe: { F: 1.5, M: .7 }, repere: "1–4,1 % de la population (A) · POLAR, 45 ans et plus : 4,9 % ; rapport femmes-hommes discordant selon les études (Haas 2023 ; Sjaastad 2008) (OpenEvidence, 24 nov. 2026)" },
      { id: "musculaire", nom: "Contracture ou élongation musculaire du sportif", n: "contracture cervicale", base: [[12, .04], [18, .06], [30, .03], [50, .02]], repere: "Aucune donnée parmi les consultants : la part dépend du nombre de sportifs (surveillance des blessures sportives, Meron 2018) (OpenEvidence, 24 nov. 2026)",
        repere: "63 % des lésions cervicales des sportifs du secondaire (A, C)" },
      { id: "radiculopathie", nom: "Radiculopathie cervicale", n: "radiculopathie cervicale", base: [[12, .003], [30, .03], [50, .1], [65, .09], [80, .05]], repere: "POLAR, 45 ans et plus : 12,8 % des diagnostics inscrits par le médecin (non confirmés) ; valeurs relevées ; pic d'incidence à 50–54 ans (Haas 2023 ; Radhakrishnan 1994) (OpenEvidence, 24 nov. 2026)",
        repere: "83,2/100 000/an, pic à 50–54 ans (A, C)" },
      { id: "stinger", nom: "Stinger ou burner (neurapraxie du plexus brachial)", n: "stinger", base: [[12, .01], [18, .03], [25, .02], [35, .005]], sexe: { M: 3, F: .3 }, repere: "Aucune donnée parmi les consultants ; données surtout du football américain ; prédominance masculine sans chiffre direct (Green 2017) (OpenEvidence, 24 nov. 2026)",
        repere: "Prévalence de carrière 49–65 % au football universitaire ; 64 % des lésions cervicales au football (A, C)" },
      { id: "torticolis", nom: "Torticolis aigu acquis", n: "torticolis aigu", base: [[12, .04], [25, .04], [50, .03], [70, .02]], repere: "3,2 % chez l'adulte ; pas d'incidence (A, C) · POLAR, 45 ans et plus : 3,2 %, torticolis et dystonie confondus (Haas 2023) (OpenEvidence, 24 nov. 2026)" },
      { id: "ppr", grave: true, nom: "Polymyalgia rheumatica", n: "polymyalgia rheumatica", base: [[12, .0001], [50, .003], [65, .012], [80, .018]], sexe: { F: 1.5, M: .7 }, repere: "Incidence de 12 (50–59 ans) à 156 (70–79 ans) pour 100 000 par an : forme de la courbe compatible ; femmes 1,3 fois plus (Raheel 2017 ; Partington 2018) (OpenEvidence, 24 nov. 2026)",
        repere: "34–113/100 000/an après 50 ans (A)" },
      { id: "myelopathie", grave: true, nom: "Myélopathie cervicale dégénérative", n: "myélopathie cervicale", base: [[12, .0002], [40, .002], [55, .01], [70, .02], [85, .025]], sexe: { M: 1.5, F: .7 }, repere: "Incidence de 7,9 pour 100 000 années-personnes en première ligne ; prédominance masculine compatible (Wood 2026) (OpenEvidence, 24 nov. 2026)",
        repere: "Au moins 605/million, probablement sous-diagnostiquée ; 18,9/100 000 à 75–79 ans (A, C)" },
      { id: "par", grave: true, nom: "Atteinte cervicale de la polyarthrite rhumatoïde (instabilité C1–C2)", n: "atteinte cervicale de la PAR", base: [[12, .0005], [40, .002], [60, .004], [80, .004]], sexe: { F: 2, M: .5 }, repere: "Subluxation C1–C2 chez 4,6 % des PAR après 12 ans ; aucune donnée parmi les consultants (Le Quellec 2023) (OpenEvidence, 24 nov. 2026)",
        repere: "Atteinte cervicale chez 25–88 % des PAR ; atlanto-axoïdienne sévère 2,1 % (A)" },
      { id: "fracture", grave: true, nom: "Fracture cervicale (odontoïde, fragilité)", n: "fracture cervicale", base: [[12, .003], [40, .003], [65, .006], [80, .015], [90, .025]], repere: "Aucune donnée en première ligne ; 1,6 % (moins de 65 ans) et 2,0 % (65 ans et plus) des TDM cervicales à l'urgence (Radmard 2024) (OpenEvidence, 24 nov. 2026)",
        repere: "C2 : 8,2/100 000 ; 81 % par chute de faible énergie après 70 ans (A)" },
      { id: "defile", nom: "Syndrome du défilé thoracique", n: "syndrome du défilé thoracique", base: [[12, .003], [20, .01], [35, .01], [55, .005]], sexe: { F: 1.6, M: .55 }, repere: "Forme neurogène : 2 à 3 pour 100 000 par an ; environ 3 femmes pour 1 homme : multiplicateur relevé (Illig 2021) (OpenEvidence, 24 nov. 2026)",
        repere: "De 1–3/100 000 à 3–80/1 000 selon la définition (A)" },
      { id: "infection", grave: true, nom: "Spondylodiscite cervicale ou abcès épidural", n: "spondylodiscite cervicale", base: [[12, .0001], [50, .0003], [80, .0006]], sexe: { M: 1.3, F: .75 }, repere: "11–12 % des ostéomyélites vertébrales (A) · Prédominance masculine de 1,6 à 2 pour 1, ajoutée (Lindvig 2026) (OpenEvidence, 24 nov. 2026)" },
      { id: "arnold", nom: "Névralgie occipitale (Arnold)", n: "névralgie d'Arnold", base: [[12, .002], [30, .01], [50, .01], [70, .008]], repere: "1,3 % chez l'adulte (C) · POLAR, 45 ans et plus : 1,3 %, compatible (Haas 2023) (OpenEvidence, 24 nov. 2026)" },
    ],
    compatibles: [["nonspec", "myofascial"], ["facettaire", "arthrose"], ["arthrose", "radiculopathie"], ["arthrose", "myelopathie"], ["radiculopathie", "myelopathie"], ["entorse", "facettaire"],
      ["cervicogenique", "facettaire"], ["myofascial", "cervicogenique"], ["ppr", "arthrose"], ["par", "myelopathie"], ["fracture", "myelopathie"], ["entorse", "myofascial"]],

    grappes: [
      { id: "wainner4", dx: "radiculopathie", nom: "Wainner : 4 sur 4 (ULTT A, rotation < 60°, distraction, Spurling)", rv: 30.3, couvre: NEURO, statut: "verifie",
        piste: `${WAINNER} : RV+ 30,3`, si: L => NEURO.every(id => L.oui(id)) },
      { id: "wainner3", dx: "radiculopathie", nom: "Wainner : 3 sur 4", rv: 6.1, couvre: NEURO, statut: "a_verifier",
        piste: `${WAINNER} : Se 39 %, Sp 94 %, RV+ 6,1 (non vérifiable dans l'extrait)`, si: L => NEURO.filter(id => L.oui(id)).length === 3 },
      { id: "neuro_neg", dx: "radiculopathie", nom: "Tests neurodynamiques tous négatifs (ULTT, Spurling, distraction)", rv: .08, couvre: NEURO, statut: "verifie",
        piste: `${THOOMES} ; Grondin : 0 sur 4, RV− 0,06–0,08`, si: L => ["ultt", "spurling", "distraction"].every(id => L.non(id)) },
      { id: "cook3", dx: "myelopathie", nom: "Cook : 3 sur 5 ou plus (marche, Hoffmann, supinateur inversé, Babinski, plus de 45 ans)", rv: 30.9,
        couvre: ["marche_myelo", "hoffmann", "supinateur", "babinski"], statut: "verifie", piste: `${COOK} : Sp 99 %, RV+ 30,9 (5,5–181,8)`, si: L => COOKM(L).filter(Boolean).length >= 3 },
      { id: "cook0", dx: "myelopathie", nom: "Cook : 0 ou 1 sur 5", rv: .18, couvre: ["marche_myelo", "hoffmann", "supinateur", "babinski"], statut: "verifie",
        piste: `${COOK} : RV− 0,18 (0,12–0,42)`, si: L => ["marche_myelo", "hoffmann", "supinateur", "babinski"].every(id => L.repondu(id)) && COOKM(L).filter(Boolean).length <= 1 },
      { id: "facette_cluster", dx: "facettaire", nom: "Examen manuel, sensibilité segmentaire et extension-rotation douloureuse", rv: 4.8, couvre: ["p_segment", "ext_rot"], statut: "verifie",
        piste: "Blocs contrôlés (n = 125) : Se 77 %, Sp 84 %, RV+ 4,7–4,9", si: L => L.oui("p_segment") && L.oui("ext_rot") },
      { id: "ccr_neg", dx: "fracture", nom: "Règle canadienne C-spine négative", rv: .007, couvre: ["mecanisme_dangereux", "paresthesies_membres", "rotation45"], statut: "verifie",
        piste: `${STIELL} : Se 99,9 %, Sp 18,8 %, RV− 0,007`, si: L => L.trauma() && L.age !== null && L.age < 65 && L.non("mecanisme_dangereux") && L.non("paresthesies_membres") && L.oui("rotation45") },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Côté de la douleur ou de l'irradiation", "Droit", "Gauche", { nonspec: 1.2, myofascial: 1.2, arthrose: 1.5, ppr: 6, myelopathie: 2.5, radiculopathie: .2, stinger: .2, defile: .5, arnold: .5, torticolis: .3 }, "Cervicalgie"),
        C.accompagne(), C.refere(), C.travail({ bureau: { nonspec: 1.3, myofascial: 1.5 }, manuel: { myofascial: 1.3, defile: 1.5 }, physique: { radiculopathie: 1.2 } }), C.travailPrecision(),
        C.sport({ contact: { stinger: 4, musculaire: 2, entorse: 1.5, fracture: 1.3 }, natation: { nonspec: 1.2, defile: 1.5 }, velo: { nonspec: 1.2 }, lancer: { defile: 2 }, glisse: { fracture: 1.5, entorse: 1.3 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(), C.atcdMedicaux(),
        ouiNon("osteoporose", "Ostéoporose ou fracture de fragilité", { oui: "ostéoporose", non: "", effets: { fracture: p(2.5, .9) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux(), C.atcdRhumato("par", 1, 1, { rv: { par: [{ dx: "par", rvp: 50, rvn: .1 }] } }),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ torticolis: p(1.2, .9), nonspec: p(.9, 1.1) }), C.depuis(), C.contexte(),
          C.duree({ lt7: { torticolis: 4, entorse: 3, musculaire: 3, stinger: 4, fracture: 2, nonspec: 1.2, arthrose: .3, myelopathie: .3, facettaire: .5, cervicogenique: .5, defile: .4, ppr: .7 },
            s1_6: { entorse: 1.3, radiculopathie: 1.5, ppr: 1.5, torticolis: .5 },
            s6_12: { radiculopathie: 1.3, facettaire: 1.3, entorse: 1.2, torticolis: .2, stinger: .3 },
            gt3m: { arthrose: 2.5, facettaire: 2, myofascial: 1.8, cervicogenique: 2, myelopathie: 2.5, defile: 1.8, nonspec: 1.2, torticolis: .05, stinger: .1, musculaire: .2 } }),
          C.apparition({ subit_trauma: { entorse: 6, fracture: 5, stinger: 6, musculaire: 3, radiculopathie: 1.3, torticolis: .7, arthrose: .2, myelopathie: .3, myofascial: .4, ppr: .2, cervicogenique: .5, defile: .5 },
            subit: { torticolis: 6, radiculopathie: 1.5, infection: 1.5, nonspec: 1.2, entorse: .2, stinger: .2 },
            graduel: { myofascial: 1.8, nonspec: 1.5, facettaire: 1.3, cervicogenique: 1.5, radiculopathie: 1.3, defile: 1.5, torticolis: .3, entorse: .1, stinger: .1, fracture: .1 },
            insidieux: { arthrose: 3, myelopathie: 3, facettaire: 1.5, ppr: 2, par: 1.5, cervicogenique: 1.5, torticolis: .2, entorse: .05, stinger: .05, fracture: .1 } }),
          choix("mecanisme", "Mécanisme", [
            o("auto", "Accident de la route (impact arrière, whiplash)", { entorse: 5, fracture: 1.3, stinger: .3 }, { n: "accident de la route" }),
            o("contact", "Contact sportif (plaquage, tête en avant)", { stinger: 6, musculaire: 2, fracture: 1.3, entorse: 1.5 }, { n: "contact sportif" }),
            o("chute", "Chute (de sa hauteur ou plus)", { fracture: 3, entorse: 1.5 }, { n: "chute" }),
            o("faux_mouvement", "Faux mouvement, réveil avec le cou bloqué", { torticolis: 5, nonspec: 1.5, fracture: .2 }, { n: "faux mouvement" })], { si: trauma, masqueSi: "contexte" }),
        ] },
        { titre: "Règle canadienne C-spine", si: L => L.trauma() && (!L.repondu("duree") || L.dans("duree", ["lt7", "s1_6"])), ligne: "C-spine",
          aide: "Patient alerte (Glasgow 15) et stable après un traumatisme. Les facteurs à faible risque permettent d'évaluer la rotation.", questions: [
            ouiNon("mecanisme_dangereux", "Mécanisme dangereux (chute de 1 m ou 5 marches, charge axiale, haute vitesse, tonneau, éjection, vélo ou VTT)", { oui: "mécanisme dangereux", non: "pas de mécanisme dangereux" }),
            ouiNon("paresthesies_membres", "Paresthésies dans les membres", { oui: "paresthésies dans les membres", non: "pas de paresthésie" }),
            ouiNon("faible_risque", "Facteur de faible risque (collision arrière simple, assis, a marché, douleur retardée, pas de douleur médiane)", { oui: "facteur de faible risque", non: "aucun facteur de faible risque" }),
            ouiNon("rotation45", "Rotation active de 45° à droite et à gauche possible", { si: L => L.oui("faible_risque"), oui: "rotation de 45° possible des deux côtés", non: "rotation de 45° impossible" }),
          ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("cou", "Cou, sans irradiation", { nonspec: p(2, .6), facettaire: p(1.5, .8), torticolis: p(1.5, .9), radiculopathie: p(.5, 1.2) }, { n: "cervicale" }),
            m("trapeze", "Trapèze et omoplate", { myofascial: p(3, .5), nonspec: p(1.3, .9), radiculopathie: p(1.3, .9) }, { n: "au trapèze" }),
            m("bras", "Bras, sous le coude, trajet radiculaire", { radiculopathie: p(6, .2), defile: p(2, .7), stinger: p(2, .8), nonspec: p(.4, 1.1) }, { n: "irradiant au bras" }),
            m("tete", "Tête (occiput, céphalée)", { cervicogenique: p(5, .3), arnold: p(4, .6), myofascial: p(1.3, .95), facettaire: p(1.3, .95) }, { n: "céphalée occipitale" }),
            m("epaules_hanches", "Aux deux épaules et aux hanches, avec raideur", { ppr: p(10, .3) }, { n: "aux ceintures" }),
          ], { gabarit: "douleur a/n {v}" }),
          ouiNon("bras_cou", "Douleur du bras plus forte que celle du cou", { oui: "douleur du bras plus forte que celle du cou", non: "",
            effets: { radiculopathie: { rvp: 3, rvn: .7, statut: "a_verifier", piste: "Radiculopathie (n = 134) : spécificité élevée, RV+ < 5" } } }),
          C.type({ brulure: { radiculopathie: 2, stinger: 2, defile: 1.5, arnold: 1.5 }, choc: { radiculopathie: 2.5, arnold: 3, stinger: 2 }, sourde: { arthrose: 1.2, facettaire: 1.2 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("posture_agg", "Pire en position prolongée (écran, lecture)", { g: "facteurs", agg: "les positions prolongées", aggNie: "aux positions prolongées", effets: { nonspec: p(1.8, .7), myofascial: p(1.8, .7), facettaire: p(1.2, .95) } }),
          ouiNon("ext_agg", "Pire en regardant en haut ou en tournant la tête", { g: "facteurs", agg: "l'extension et la rotation", aggNie: "en extension", effets: { facettaire: p(2.5, .6), arthrose: p(1.5, .8), radiculopathie: p(1.5, .8) } }),
          ouiNon("bras_leve_agg", "Pire bras levés au-dessus de la tête", { agg: "les bras levés", aggNie: "bras levés", effets: { defile: { rvp: 3, rvn: .2, statut: "a_verifier", piste: "Défilé neurogène : aggravation bras en élévation chez 97 % (Sp non mesurée)" }, radiculopathie: p(.7, 1.05) } }),
          ouiNon("main_tete", "Soulagé la main sur la tête", { oui: "soulagé la main sur la tête", non: "", effets: { radiculopathie: p(3, .8) } }),
          C.attenuants(),
          C.moment({ matin: { ppr: 3, arthrose: 1.3, torticolis: 1.5 }, soir: { nonspec: 1.3, myofascial: 1.3 }, constante: { infection: 2, radiculopathie: 1.2 } }),
          C.nocturne({ infection: p(2, .8), radiculopathie: p(1.3, .9), ppr: p(1.5, .9) }),
          C.raideur({ plus30: { ppr: 5 } }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("paresthesies", "Engourdissements ou picotements dans le bras ou la main", { oui: "paresthésies du membre supérieur", nie: "paresthésie",
            effets: { radiculopathie: p(3, .3), defile: { rvp: 2, rvn: .2, statut: "a_verifier", piste: "Défilé neurogène : paresthésies chez 94 % (Sp non mesurée)" }, stinger: p(2, .7) } }),
          ouiNon("maladresse", "Maladresse des mains (boutons, écriture)", { oui: "maladresse des mains", nie: "maladresse",
            effets: { myelopathie: { se: .58, sp: .92, statut: "a_verifier", piste: `${MYELO} : RV+ 7,3 (calculé)` } } }),
          ouiNon("marche_myelo", "Trouble de la marche ou de l'équilibre", { oui: "trouble de la marche", nie: "trouble de la marche",
            effets: { myelopathie: { se: .58, sp: .92, statut: "a_verifier", piste: `${MYELO} : RV+ 7,3 (calculé)` } } }),
          ouiNon("brulure_transitoire", "Brûlure ou engourdissement d'un bras après un contact, quelques minutes", { si: trauma, oui: "brûlure transitoire du bras après un contact", nie: "brûlure transitoire", effets: { stinger: p(10, .3) } }),
          ouiNon("raideur_ceintures", "Raideur matinale des épaules et des hanches", { oui: "raideur des ceintures", nie: "raideur des ceintures", effets: { ppr: p(10, .2) } }),
          ouiNon("symptomes_acg", "Céphalée nouvelle, claudication de la mâchoire ou trouble visuel", { oui: "symptômes d'artérite temporale", nie: "symptôme d'artérite temporale", drapeau: true, effets: { ppr: p(3, .9) } }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ infection: p(3, .5) }), C.symptGeneraux(), C.cancer(),
          multi("risque_infection", "Facteurs de risque d'infection", [m("aucun", "Aucun", {}, { exclusif: true }), m("udi", "Drogues injectables", { infection: p(5, 1) }, { n: "drogues injectables" }),
            m("immuno", "Immunosuppression ou diabète", { infection: p(2.5, 1) }, { n: "immunosuppression ou diabète" })], { aucun: "", gabarit: "facteur de risque d'infection : {v}" }),
          ouiNon("sphincters", "Trouble urinaire ou fécal nouveau", { oui: "trouble sphinctérien", nie: "trouble sphinctérien", drapeau: true,
            effets: { myelopathie: { se: .41, sp: .91, statut: "a_verifier", piste: `${MYELO} : RV+ 4,6 (calculé)` } } }),
          ouiNon("signes_vasculaires", "Vertiges, diplopie, dysarthrie, dysphagie ou chute soudaine", { oui: "signes neurologiques centraux", nie: "signe vertébro-basilaire", drapeau: true }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        { titre: "Inspection et palpation", sep: ", ", toutNormal: true, questions: [
          ouiNon("torticolis_vu", "Attitude vicieuse (tête inclinée et tournée)", { oui: "attitude en torticolis", non: "pas d'attitude vicieuse", effets: { torticolis: p(8, .3), infection: p(1.5, .95) } }),
          ouiNon("p_mediane", "Sensibilité médiane des épineuses", { oui: "sensibilité médiane", non: "pas de sensibilité médiane", effets: { fracture: p(3, .3), infection: p(2, .7) } }),
          ouiNon("p_segment", "Sensibilité segmentaire paravertébrale", { oui: "sensibilité segmentaire", non: "pas de sensibilité segmentaire",
            effets: { facettaire: { rvp: 1.6, rvn: .08, statut: "verifie", piste: "Blocs contrôlés (n = 125) : Se 94 %, RV− 0,08" } } }),
          ouiNon("p_trapeze", "Points gâchettes du trapèze", { oui: "points gâchettes du trapèze", non: "", effets: { myofascial: p(4, .3), nonspec: p(1.2, .9) } }),
          ouiNon("p_occipital", "Nerf grand occipital douloureux", { oui: "émergence du grand occipital douloureuse", non: "", horsNormal: true, effets: { arnold: p(6, .3), cervicogenique: p(1.5, .9) } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_rotation", "Rotation active", "rotation", { lim_douleur: { torticolis: 3, entorse: 2, facettaire: 1.5, arthrose: 1.5 }, lim_raideur: { arthrose: 2.5, ppr: 1.5 }, complete: { torticolis: .2 } }),
          C.amplitude("arom_extension", "Extension active", "extension", { lim_douleur: { facettaire: 2, arthrose: 1.5, radiculopathie: 1.5 }, lim_raideur: { arthrose: 2.5 } }),
          C.amplitude("arom_flexion", "Flexion active", "flexion"),
          C.amplitude("arom_inclinaison", "Inclinaison latérale active", "inclinaison latérale"),
          ouiNon("ext_rot", "Extension-rotation reproduit la douleur", { oui: "extension-rotation douloureuse", non: "extension-rotation indolore", effets: { facettaire: p(2.5, .6) } }),
          ouiNon("rotation60", "Rotation vers le côté atteint de moins de 60°", { oui: "rotation de moins de 60° du côté atteint", non: "",
            effets: { radiculopathie: est(1.8, .23, `${WAINNER} : Se 89 %, Sp 49 % (non vérifiable dans l'extrait)`, { g: "neuro" }) } }),
        ] },
        { titre: "Neurologique", ligne: "Neuro", toutNormal: true, questions: [
          ouiNon("reflexe_bicipital", "Réflexe bicipital ou tricipital diminué", { oui: "réflexe du membre supérieur diminué", non: "réflexes du membre supérieur normaux",
            effets: { radiculopathie: ver(.24, .95, `${WAINNER} : RV+ 4,9 ; RV− 0,80`) } }),
          ouiNon("faiblesse_ms", "Faiblesse myotomale (biceps, deltoïde, triceps)", { oui: "faiblesse myotomale", non: "force du membre supérieur normale",
            effets: { radiculopathie: ver(.24, .94, `${WAINNER} : faiblesse du biceps, RV+ 3,7`), stinger: p(2, .8) } }),
          ouiNon("hypoesthesie", "Hypoesthésie dans un dermatome", { oui: "hypoesthésie dermatomale", non: "sensibilité normale", effets: { radiculopathie: est(1.5, .9, `${WAINNER} : RV+ 0,6–2,3`) } }),
          ouiNon("hoffmann", "Hoffmann", { court: "Hoffmann", res: TEST, effets: { myelopathie: verRv(2.2, .63, COOK) } }),
          ouiNon("supinateur", "Réflexe du supinateur inversé", { court: "supinateur inversé", res: TEST, horsNormal: true, effets: { myelopathie: p(3, .8) } }),
          ouiNon("babinski", "Babinski", { court: "Babinski", res: TEST, effets: { myelopathie: p(5, .9) } }),
          ouiNon("tandem", "Marche en tandem anormale", { oui: "marche en tandem anormale", non: "marche en tandem normale", effets: { myelopathie: { se: .87, sp: .53, statut: "a_verifier", piste: "Contre témoins sains : RV+ 1,85 ; RV− 0,25 (calculés)" } } }),
        ] },
        { titre: "Tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("spurling", "Spurling", { court: "Spurling", effets: { radiculopathie: est(4, .5, `${WAINNER} ; ${THOOMES} : Se 38–98 %, Sp 84–100 %`, { g: "neuro" }) } }),
          ouiNon("ultt", "ULTT A (nerf médian)", { court: "ULTT A", effets: { radiculopathie: est(1.3, .12, `${WAINNER} : Se 97 %, Sp 22 % (non vérifiable dans l'extrait)`, { g: "neuro" }) } }),
          ouiNon("distraction", "Distraction cervicale", { court: "distraction cervicale", genre: "f", effets: { radiculopathie: est(4.4, .6, `${WAINNER} : Se 44 %, Sp 90–97 %`, { g: "neuro" }) } }),
          ouiNon("abduction", "Signe d'abduction de l'épaule (main sur la tête)", { court: "signe d'abduction de l'épaule", horsNormal: true, effets: { radiculopathie: verRv(2.08, .66, THOOMES) } }),
          ouiNon("flexion_rotation", "Flexion-rotation cervicale", { court: "flexion-rotation", genre: "f", horsNormal: true, effets: { cervicogenique: ver(.83, .83, HALL) } }),
          ouiNon("sharp_purser", "Sharp-Purser (PAR seulement)", { court: "Sharp-Purser", horsNormal: true, si: L => L.a("atcd_rhumato", "par"), effets: { par: ver(.88, .96, "Sharp-Purser dans la PAR (n = 123)") } }),
          ouiNon("roos", "Roos (EAST) : bras levés 3 min", { court: "Roos", horsNormal: true, effets: { defile: p(3, .5) } }),
        ] },
        { titre: "Épaule", adjacent: "épaule", toutNormal: true, questions: [
          choix("epaule_mob", "Épaule : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation de l'épaule indolore" }), o("douleur", "Douloureuse ou limitée", { radiculopathie: .7 }, { n: "mobilisation de l'épaule douloureuse" })]),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      L => {
        if (!L.trauma() || (L.repondu("duree") && !L.dans("duree", ["lt7", "s1_6"]))) return null;
        const haut = (L.age !== null && L.age >= 65) || L.oui("mecanisme_dangereux") || L.oui("paresthesies_membres");
        if (haut) return { niveau: "urgence", titre: "Imagerie cervicale indiquée (règle canadienne C-spine)", ro: "fracture cervicale",
          texte: `Facteur de risque élevé : ${[L.age >= 65 && "65 ans et plus", L.oui("mecanisme_dangereux") && "mécanisme dangereux", L.oui("paresthesies_membres") && "paresthésies"].filter(Boolean).join(", ")}. Immobiliser ; TDM cervicale.`,
          conduite: items(21) };
        if (L.non("faible_risque") || L.non("rotation45")) return { niveau: "urgence", titre: "Imagerie cervicale indiquée (règle canadienne C-spine)", ro: "fracture cervicale",
          texte: L.non("faible_risque") ? "Aucun facteur de faible risque : la rotation ne peut être évaluée." : "Rotation active de 45° impossible.", conduite: items(21) };
        if (L.oui("rotation45") && L.non("mecanisme_dangereux") && L.non("paresthesies_membres")) return { niveau: "info", titre: "Règle canadienne C-spine négative", texte: "Pas d'imagerie nécessaire (Se 99,9 %, RV− 0,007)." };
        return { niveau: "info", titre: "Règle canadienne C-spine à compléter", texte: "Traumatisme : âge, mécanisme dangereux, paresthésies, facteur de faible risque, rotation de 45°." };
      },
      L => ((L.oui("maladresse") || L.oui("marche_myelo") || L.oui("hoffmann") || L.oui("babinski") || L.oui("sphincters")) && !L.trauma())
        ? { niveau: L.oui("sphincters") || L.oui("babinski") ? "urgence" : "rapide", titre: "Myélopathie cervicale à éliminer", ro: "myélopathie cervicale",
          texte: "Maladresse des mains, trouble de la marche, signes pyramidaux ou trouble sphinctérien. Cluster de Cook 3 sur 5 : RV+ 30,9.", conduite: items(13) } : null,
      L => (L.trauma() && L.v("mecanisme") === "contact" && (L.oui("paresthesies_membres") || (L.oui("brulure_transitoire") && L.v("cote") === "B")))
        ? { niveau: "urgence", titre: "Neurapraxie médullaire à éliminer", ro: "lésion médullaire", texte: "Contact sportif avec symptômes des deux bras ou des quatre membres : immobilisation et évaluation d'urgence.", conduite: items(17) } : null,
      L => (L.oui("fievre") && (L.a("risque_infection", "udi") || L.a("risque_infection", "immuno") || L.oui("p_mediane")))
        ? { niveau: "urgence", titre: "Spondylodiscite ou abcès épidural à éliminer", ro: "spondylodiscite cervicale", texte: "Fièvre avec un facteur de risque ou une sensibilité médiane.", conduite: items(18) } : null,
      L => L.a("atcd_rhumato", "par") && (L.oui("sharp_purser") || L.oui("paresthesies") || L.oui("maladresse"))
        ? { niveau: "rapide", titre: "Instabilité atlanto-axoïdienne à éliminer (PAR)", ro: "instabilité C1–C2", texte: "Polyarthrite rhumatoïde avec Sharp-Purser positif ou symptômes neurologiques.", conduite: items(14) } : null,
      L => ((L.oui("raideur_ceintures") || L.a("localisation", "epaules_hanches")) && L.age !== null && L.age >= 50)
        ? { niveau: L.oui("symptomes_acg") ? "urgence" : "rapide", titre: L.oui("symptomes_acg") ? "Artérite à cellules géantes à éliminer" : "Polymyalgia rheumatica à considérer",
          ro: L.oui("symptomes_acg") ? "artérite à cellules géantes" : "polymyalgia rheumatica", texte: "50 ans et plus, douleur et raideur des ceintures. Claudication de la mâchoire : RV+ 4,9 pour l'artérite.",
          conduite: [...(L.oui("symptomes_acg") ? [{ t: "Céphalée, claudication de la mâchoire ou trouble visuel : prednisone et évaluation le jour même (risque de cécité)" }] : []), ...items(12)] } : null,
      L => L.oui("signes_vasculaires") ? { niveau: "urgence", titre: "Dissection artérielle ou atteinte vertébro-basilaire à éliminer", ro: "dissection artérielle cervicale",
        texte: "Vertiges, diplopie, dysarthrie, dysphagie ou chute soudaine avec une cervicalgie : pas de manipulation ; évaluation d'urgence.", conduite: [{ t: "Urgence : angio-TDM ou angio-IRM selon le centre" }] } : null,
      C.regles.tumeur("Radiographie cervicale ; IRM selon le tableau."),
    ],
  });
})();
