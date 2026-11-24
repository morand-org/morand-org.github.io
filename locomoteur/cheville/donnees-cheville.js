/* Locomoteur Morand, cheville et jambe distale (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/) : fréquences
   (parties A et C), tests (B), examen de base (D), anamnèse (E), confirmer ou exclure (G), conduite (aide-mémoire, F et H).
   Même format que le genou (voir donnees-genou.js) : p() provisoire, lit()/est() à vérifier, ver()/verRv() vérifié. */
(function () {
  "use strict";
  const { p, lit, est, o, m, ouiNon, choix, multi, miroir } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), PALP = "palp", TEST = "test";
  const BACHMANN = "Bachmann et coll., 2003, BMJ (PMID 12595378) ; Beckenkamp et coll., 2017, BJSM (PMID 27884861)";
  const NW2022 = "Netterström-Wedin et coll., 2022, Sports Health (méta-analyse)", NW2021 = "Netterström-Wedin et coll., 2021, Phys Ther Sport (PMID 33774464)";
  const SMAN = "Sman et coll., 2015, BJSM (PMID 24255766)", BALTES22 = "Baltes et coll., 2022, KSSTA (PMID 35508553)", BALTES24 = "Baltes et coll., 2024, KSSTA (PMID 38385771)";
  const MAFFULLI = "Maffulli, 1998, Am J Sports Med (PMID 9548122)", REIMAN = "Reiman et coll., 2014, J Athl Train (PMID 25243736)";
  const MARTIN = "Martin et coll., 2018, JOSPT, guide de pratique (PMID 29712543)", HOENIG = "Hoenig et coll., 2022, Nat Rev Dis Primers";
  const DEORIO = "DeOrio et coll., 2011, Foot Ankle Int (IRM)";

  const ANGLAIS = { entorse_lat: "lateral ankle sprain", instab: "chronic ankle instability", achille: "midportion Achilles tendinopathy",
    insertion: "insertional Achilles tendinopathy, Haglund deformity or retrocalcaneal bursitis", rupture_achille: "Achilles tendon rupture", fracture: "ankle fracture",
    periostite: "medial tibial stress syndrome", ff_tibia: "tibial or fibular stress fracture", loge: "chronic exertional compartment syndrome of the leg",
    mollet: "calf muscle strain (tennis leg)", sever: "Sever disease (calcaneal apophysitis)", tibpost: "posterior tibial tendon dysfunction", arthrose: "ankle osteoarthritis",
    syndesmose: "syndesmotic (high ankle) sprain", deltoide: "deltoid ligament sprain or Maisonneuve fracture", fibulaires: "peroneal tendinopathy, tear or subluxation",
    conflit: "anterior or posterior ankle impingement", lot: "osteochondral lesion of the talus", tarsien: "tarsal tunnel syndrome",
    cristaux: "gout or calcium pyrophosphate arthritis of the ankle", insuff: "insufficiency fracture of the distal tibia, fibula or calcaneus" };

  /* Conduite : aide-mémoire de première ligne (Québec), fiches numérotées de la section cheville (aide-memoire-cheville.js). */
  const CONDUITES = C.aideMemoire("cheville", { entorse_lat: 1, instab: 2, achille: 3, insertion: 4, rupture_achille: 5, fracture: 6, periostite: 7, ff_tibia: 8,
    loge: 9, mollet: 10, sever: 11, tibpost: 12, arthrose: 13, syndesmose: 14, deltoide: 15, fibulaires: 16, conflit: 17, lot: 18, tarsien: 19, cristaux: 23, insuff: 24 });
  const items = ref => C.aideMemoire("cheville", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("cheville"),
    { titre: "Pour tous", items: [{ t: "Enseignement : nature de l'atteinte, pronostic, autogestion" },
      { t: "Consignes de reconsultation : fièvre, cheville chaude et enflée, mollet enflé, pied froid, engourdissements, douleur nocturne" }] }];

  const INFOS = {
    mecanisme: { info: "Inversion : entorse latérale. Éversion ou rotation externe du pied : syndesmose (RV+ 3,47 ; Baltes 2022) et ligament deltoïde. Poussée ou départ explosif : tendon d'Achille ou mollet." },
    disproportion: { info: "Une douleur disproportionnée par rapport à la blessure oriente vers une entorse de la syndesmose (RV+ 3,05 ; Sp 79 % ; Sman 2015). Avec des paresthésies, penser au syndrome compartimental." },
    coup_baton: { info: "La sensation d'un coup de bâton ou d'un pop derrière la cheville évoque une rupture du tendon d'Achille ; au mollet, une lésion du jumeau interne (tennis leg)." },
    derobade: { info: "Des entorses à répétition ou une sensation que la cheville cède : instabilité chronique (environ 40 % après une première entorse)." },
    localisation: { aide: "Plusieurs choix possibles", info: "Douleur du tendon d'Achille 2 à 6 cm au-dessus de l'insertion : tendinopathie corporéale (Se 84 %, Sp 73 %, RV+ 3,1 ; absente, RV− 0,22). À l'insertion : tendinopathie d'insertion ou bursite (chez l'enfant, Sever). Bord interne du tibia, diffus : périostite ; point précis : fracture de stress. Une fois un siège coché, les sièges non cochés comptent comme absents." },
    effort_loge: { info: "Douleur ou tension qui revient après un temps d'effort fixe et cède en quelques minutes au repos, parfois avec engourdissements : syndrome compartimental chronique d'effort (27–34 % des douleurs de jambe d'effort chez le sportif)." },
    ex_oedeme_lat: { info: "Dans les 2 premiers jours, un gonflement latéral est présent dans toutes les ruptures ligamentaires latérales (Se 100 %, n = 43 ; Baltes 2024) : son absence rend la rupture peu probable." },
    ex_ecchymose: { info: "Hématome : présent chez 43 % des ruptures ligamentaires latérales à l'examen aigu, 91 % à l'examen différé (J4–J7) ; Sp 85 % (Baltes 2024)." },
    trop_orteils: { info: "Vu de derrière, plus d'orteils visibles du côté atteint : avant-pied en abduction (dysfonction du tibial postérieur). Négatif dans 20–35 % des cas.", video: "Too many toes sign" },
    godet_tp: { info: "Œdème rétromalléolaire médial prenant le godet : Se 86 %, Sp 100 % pour la dysfonction du tibial postérieur à l'IRM (DeOrio 2011)." },
    p_ltfa: { info: "Palpation du ligament talo-fibulaire antérieur : sensible (> 90 %) mais peu spécifique (< 50 %). La méta-analyse recommande de l'associer au tiroir antérieur, spécifique (Netterström-Wedin 2022)." },
    p_syndesmose: { info: "Syndesmose (ligament tibio-fibulaire antéro-inférieur) indolore : la lésion est peu probable (Se 92 %) ; douloureuse, peu spécifique (Sp 29 %)." },
    p_achille_corps: { info: "Portion moyenne du tendon d'Achille douloureuse : Se 78 %, Sp 77 % pour la tendinopathie à l'échographie (RV+ 3,4)." },
    p_defect: { info: "Défect palpable dans le tendon d'Achille : Se 73 %, Sp 89 % pour la rupture (Maffulli 1998)." },
    p_perone_prox: { info: "Toujours palper la fibula proximale après une entorse : une douleur à ce niveau avec une atteinte médiale fait éliminer une fracture de Maisonneuve." },
    tiroir_ant: { info: "Talus tiré vers l'avant, cheville en légère flexion plantaire. Spécifique (Sp 67–100 %) mais de sensibilité variable (12–80 %). L'examen différé (J4–J7 : hématome, sensibilité du talo-fibulaire antérieur, tiroir antérieur) a Se 96 %, Sp 84 % pour la rupture ligamentaire (RV+ 6,0 ; normal, RV− 0,05).", positif: "translation antérieure augmentée ou signe de succion", video: "Anterior drawer test ankle" },
    talar_tilt: { info: "Bascule du talus en inversion : Se 17–66 %, Sp 82–100 % pour les ligaments latéraux.", positif: "ouverture latérale augmentée", video: "Talar tilt test" },
    squeeze: { info: "Compression du tibia et de la fibula à mi-jambe. Syndesmose : Se ≈ 32 %, Sp 85 % (RV+ 2,1) : peu sensible.", positif: "douleur à la syndesmose", video: "Squeeze test ankle" },
    rot_ext: { info: "Genou fléchi à 90°, rotation externe du pied. Syndesmose : Se ≈ 70 %, Sp 78 % (RV+ 3,2 ; RV− 0,38).", positif: "douleur à la syndesmose", video: "Kleiger test" },
    thompson: { info: "Patient sur le ventre, compression du mollet. Rupture du tendon d'Achille : Se 96 %, Sp 93 % (RV+ 13,7 ; RV− 0,04).", positif: "pas de flexion plantaire", video: "Thompson test" },
    matles: { info: "Sur le ventre, genoux fléchis à 90° : le pied atteint tombe en dorsiflexion. Rupture : Se 88 %, Sp 85 %.", positif: "pied en neutre ou en dorsiflexion du côté atteint", video: "Matles test" },
    royal_london: { info: "Douleur du tendon à la palpation en légère flexion plantaire qui disparaît en dorsiflexion. Tendinopathie achilléenne : Se 54 %, Sp 86 % (RV+ 3,84).", positif: "douleur qui diminue nettement en dorsiflexion", video: "Royal London Hospital test" },
    arc_sign: { info: "Le renflement du tendon bouge avec la flexion-extension de la cheville (tendinopathie intratendineuse). Se 42 %, Sp 88 %.", positif: "épaississement qui se déplace avec le tendon", video: "Arc sign Achilles" },
    saut_uni: { info: "Saut unipodal impossible : Se 89 % pour la syndesmose (possible, RV− 0,37). Douleur au saut : fracture de stress du tibia (Se 100 %, Sp 45 %)." },
    pointe_uni: { info: "Montée sur pointe unipodale impossible ou sans inversion du talon : dysfonction du tibial postérieur ; faible ou impossible après un traumatisme : rupture du tendon d'Achille.", video: "Single leg heel raise test" },
    tinel_tarsien: { info: "Percussion du nerf tibial derrière la malléole interne.", positif: "paresthésies plantaires reproduites", video: "Tinel sign tarsal tunnel" },
    ott_4pas: { info: "Critère d'Ottawa : incapable de faire 4 pas (2 transferts de poids sur chaque pied) immédiatement après la blessure et à l'examen. Règles complètes : Se 99,4 %, Sp 35,3 %, RV− 0,08 ; valides dès 5 ans." },
  };

  /* Les règles d'Ottawa ont été mesurées chez des blessés récents, souvent enflés ou ecchymotiques : quand elles
     s'appliquent, la durée, l'œdème et l'ecchymose ne comptent plus à part pour la fracture (pas de double compte). */
  const OTT_POP = ["ott_4pas", "p_mall_lat", "p_mall_med", "p_5mt", "p_navic", "duree", "oedeme_rapide", "ex_oedeme_lat", "ex_ecchymose"];

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "CHEV-P1", cle: "entorse_lat|ex_oedeme_lat>entorse_lat", note: "OpenEvidence (24 nov. 2026) : Se 100 % entre 0 et 2 jours (Baltes 2024) ; spécificité non publiée" },
    { code: "CHEV-P2", cle: "entorse_lat|p_ltfa>entorse_lat", note: "OpenEvidence (24 nov. 2026) : Se 95–100 %, Sp 0–32 % (Netterström-Wedin 2022) : RV+ au plus 1,5" },
    { code: "CHEV-P3", cle: "entorse_lat|tiroir_ant|laxite", rv: {"laxite": 3.97}, statut: "verifie", piste: "Netterström-Wedin et coll., 2022 (Sports Health, méta-analyse, PMID 34286639) : tiroir antérieur, laxité Se 54 %, Sp 87 %, RV+ 3,97 ; test négatif RV− 0,54 ; « douleur sans laxité » : estimation" },
    { code: "CHEV-P4", cle: "entorse_lat|tiroir_ant|douleur", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P5", cle: "entorse_lat|tiroir_ant|normal", rv: {"normal": 0.54}, statut: "verifie", piste: "Netterström-Wedin et coll., 2022 (Sports Health, méta-analyse, PMID 34286639) : tiroir antérieur, laxité Se 54 %, Sp 87 %, RV+ 3,97 ; test négatif RV− 0,54 ; « douleur sans laxité » : estimation" },
    { code: "CHEV-P6", cle: "entorse_lat|talar_tilt|laxite", note: "OpenEvidence (24 nov. 2026) : instabilité chronique seulement, RV+ 2,2 à 4,1 (Rosen 2015) ; non regroupé" },
    { code: "CHEV-P7", cle: "entorse_lat|talar_tilt|normal", note: "OpenEvidence (24 nov. 2026) : valeurs publiées plus basses (RV− 0,58 à 0,66), en instabilité chronique seulement" },
    { code: "CHEV-P8", cle: "entorse_lat|localisation.laterale>entorse_lat", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P9", cle: "instab|atcd_entorses>instab", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P10", cle: "instab|derobade>instab", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P11", cle: "insertion|localisation.achille_ins>insertion", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P12", cle: "insertion|p_achille_ins>insertion", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P13", cle: "rupture_achille|coup_baton>rupture_achille", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P14", cle: "periostite|localisation.tibia_med>periostite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P15", cle: "periostite|p_tibia_med>periostite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P16", cle: "ff_tibia|localisation.tibia_focal>ff_tibia", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P17", cle: "ff_tibia|p_tibia_focal>ff_tibia", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P18", cle: "loge|effort_loge>loge", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P19", cle: "mollet|localisation.mollet>mollet", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P20", cle: "mollet|p_mollet>mollet", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P21", cle: "sever|p_calcaneum>sever", note: "OpenEvidence (24 nov. 2026) : Perhamre 2013, Se 97 %, Sp 100 %, enfants malades contre témoins sans douleur (surestimé) ; la valeur actuelle est dans l'intervalle de confiance" },
    { code: "CHEV-P22", cle: "fibulaires|localisation.retro_lat>fibulaires", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P23", cle: "fibulaires|ressaut>fibulaires", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P24", cle: "fibulaires|p_fibulaires>fibulaires", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P25", cle: "tarsien|paresthesies>tarsien", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P26", cle: "cristaux|atcd_rhumato.goutte>cristaux", rvp: 2, rvn: 0.56, statut: "verifie", piste: "Janssens et coll., 2010 (Arch Intern Med), médecine familiale, monoarthrite, cristaux à la ponction : goutte rapportée par le patient, Se 61 %, Sp 70 %" },
    { code: "CHEV-P27", cle: "cristaux|atcd_rhumato.pseudogoutte>cristaux", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "CHEV-P28", cle: "cristaux|rougeur_chaleur>cristaux", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
  ];
  window.Locomoteur.definir({
    revues: REVUES_OE,
    id: "cheville", partie: "cheville", en: "ankle", rc: "Douleur à la cheville",
    titre: "Douleur à la cheville ou à la jambe", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.cheville || {}).sources,

    /* Probabilités de départ : estimations (provisoires) guidées par les fréquences publiées (« repere », parties A et C). */
    diagnostics: [
      { id: "entorse_lat", nom: "Entorse latérale de la cheville", n: "entorse latérale de la cheville", base: [[12, .3], [16, .38], [25, .3], [40, .2], [60, .12], [80, .08]],
        repere: "Pic de 7,2/1 000 p-a à 15–19 ans, la moitié seulement consulte ; 1ʳᵉ cause chez l'adulte et le sportif (A, C)" },
      { id: "instab", nom: "Instabilité chronique de la cheville", n: "instabilité chronique de la cheville", base: [[12, .02], [18, .05], [30, .06], [50, .04], [70, .02]],
        repere: "40 % après une première entorse (A)" },
      { id: "achille", nom: "Tendinopathie d'Achille corporéale", n: "tendinopathie achilléenne corporéale", base: [[12, .01], [20, .03], [35, .08], [50, .1], [65, .07], [80, .04]], sexe: { M: 1.2, F: .85 },
        repere: "1,85–2,35/1 000 p-a ; 7–9 % des coureurs par an (A, C)" },
      { id: "insertion", nom: "Tendinopathie d'insertion, Haglund ou bursite rétro-calcanéenne", n: "tendinopathie d'insertion achilléenne", base: [[12, .005], [25, .02], [45, .05], [60, .06], [80, .04]],
        repere: "Environ un tiers des douleurs achilléennes (A)" },
      { id: "rupture_achille", grave: true, nom: "Rupture du tendon d'Achille", n: "rupture du tendon d'Achille", base: [[12, .001], [25, .008], [40, .02], [55, .015], [70, .01], [85, .006]], sexe: { M: 2, F: .5 },
        repere: "15,7/100 000 p-a ; 42,6 chez les hommes de 30–49 ans ; 68 % liées au sport (A, C)" },
      { id: "fracture", grave: true, nom: "Fracture de la cheville ou du médio-pied", n: "fracture de la cheville", base: [[12, .06], [16, .05], [30, .05], [50, .08], [70, .12], [85, .15]],
        repere: "164–179/100 000 p-a chez l'adulte ; 3ᵉ fracture après 65 ans (A, C)" },
      { id: "periostite", nom: "Périostite tibiale (syndrome de stress tibial médial)", n: "périostite tibiale", base: [[12, .02], [16, .06], [22, .06], [35, .03], [50, .01], [70, .003]], sexe: { F: 1.5, M: .75 },
        repere: "13–17 % des blessures de course ; 13,6–20 % des coureurs (A, C)" },
      { id: "ff_tibia", nom: "Fracture de stress du tibia ou de la fibula", n: "fracture de stress tibiale", base: [[12, .01], [18, .025], [25, .02], [40, .01], [60, .004]], sexe: { F: 1.5, M: .75 },
        repere: "Tibia : 49 % des fractures de stress de l'athlète (A, C)" },
      { id: "loge", nom: "Syndrome compartimental chronique d'effort", n: "syndrome compartimental chronique d'effort", base: [[12, .005], [18, .02], [30, .02], [45, .01], [60, .003]],
        repere: "27–34 % des douleurs de jambe d'effort en séries sportives (A, C)" },
      { id: "mollet", nom: "Lésion musculaire du mollet (tennis leg)", n: "lésion musculaire du mollet", base: [[12, .003], [25, .01], [40, .03], [55, .03], [70, .015]], sexe: { M: 1.3, F: .75 },
        repere: "13 % des lésions musculaires au football professionnel ; 15 % des blessures du coureur amateur (C)" },
      { id: "sever", nom: "Maladie de Sever (apophysite calcanéenne)", n: "maladie de Sever", base: [[9, .15], [11, .12], [12, .08], [13, .05], [14, .02], [16, .003], [18, .0005]], sexe: { M: 1.4, F: .7 },
        repere: "3,7/1 000 enfants de 6–17 ans (A)" },
      { id: "tibpost", nom: "Dysfonction du tibial postérieur", n: "dysfonction du tibial postérieur", base: [[12, .002], [35, .01], [50, .03], [65, .07], [80, .08]], sexe: { F: 1.8, M: .55 },
        repere: "3,3–10 % (données faibles) ; environ 10 % chez le sujet âgé (A, C)" },
      { id: "arthrose", nom: "Arthrose de la cheville", n: "arthrose de la cheville", base: [[12, .001], [30, .005], [50, .03], [65, .06], [80, .08]],
        repere: "Symptomatique chez 3,4 % après 50 ans, souvent post-traumatique (A)" },
      { id: "syndesmose", nom: "Entorse de la syndesmose (entorse haute)", n: "entorse de la syndesmose", base: [[12, .02], [16, .03], [25, .03], [45, .02], [70, .01]], sexe: { M: 1.2, F: .85 },
        repere: "1–11 % des entorses, jusqu'à 25 % chez l'athlète ; 24 % à 16–18 ans (A, C)" },
      { id: "deltoide", nom: "Entorse médiale (ligament deltoïde) ou fracture de Maisonneuve", n: "entorse médiale de la cheville", base: [[12, .01], [25, .01], [50, .01], [70, .01]],
        repere: "0,77/10 000 expositions chez l'athlète ; pas d'autre donnée (A, C)" },
      { id: "fibulaires", nom: "Tendinopathie, déchirure ou luxation des fibulaires", n: "tendinopathie des fibulaires", base: [[12, .005], [25, .02], [45, .03], [65, .02]],
        repere: "Pas de donnée populationnelle (A)" },
      { id: "conflit", nom: "Conflit antérieur ou postérieur de la cheville", n: "conflit de la cheville", base: [[12, .005], [20, .02], [35, .02], [55, .01]],
        repere: "Conflit antéro-latéral dans environ 30 % des instabilités chroniques (A)" },
      { id: "lot", nom: "Lésion ostéochondrale du talus", n: "lésion ostéochondrale du talus", base: [[12, .01], [18, .02], [30, .02], [50, .01]],
        repere: "Suit 2–6,5 % des entorses ; 4,6/100 000 chez l'enfant (A, C)" },
      { id: "tarsien", nom: "Syndrome du tunnel tarsien", n: "syndrome du tunnel tarsien", base: [[12, .001], [30, .004], [50, .008], [70, .008]],
        repere: "0,6 % dans les 2 ans après une entorse (A)" },
      { id: "cristaux", nom: "Goutte ou arthrite à pyrophosphate de la cheville", n: "arthrite microcristalline", base: [[12, .0005], [30, .004], [45, .01], [60, .025], [80, .04]], sexe: { M: 1.5, F: .7 },
        repere: "Cheville atteinte chez 18–60 % des goutteux (C)" },
      { id: "insuff", nom: "Fracture d'insuffisance (tibia distal, fibula, calcanéus)", n: "fracture d'insuffisance", base: [[12, .0005], [50, .002], [65, .008], [80, .02], [90, .03]], sexe: { F: 1.8, M: .55 },
        repere: "Sujet âgé ; pas d'incidence spécifique (C)" },
    ],
    residuel: { id: "nonspec", nom: "Douleur non spécifique (aucun diagnostic précis)", n: "douleur de cheville non spécifique",
      explication: "Probabilité qu'aucun des diagnostics de la liste ne soit en cause : elle monte quand les éléments spécifiques sont absents ou négatifs. Penser aussi à une douleur référée (lombaire, genou) ou à une atteinte du pied.",
      conduite: [{ t: "Rassurer ; dosage de la charge ; réévaluer si la douleur persiste ou change" },
        { t: "Revoir dans 4–6 sem ; radiographies si la douleur persiste après un traumatisme (fractures manquées : processus latéral du talus, processus antérieur du calcanéus, base du 5ᵉ métatarsien)" }] },
    compatibles: [["entorse_lat", "syndesmose"], ["entorse_lat", "lot"], ["entorse_lat", "fibulaires"], ["entorse_lat", "fracture"], ["instab", "conflit"], ["instab", "lot"],
      ["instab", "fibulaires"], ["achille", "insertion"], ["arthrose", "conflit"], ["arthrose", "cristaux"], ["tibpost", "tarsien"], ["deltoide", "syndesmose"], ["deltoide", "fracture"],
      ["periostite", "ff_tibia"], ["syndesmose", "fracture"], ["instab", "entorse_lat"]],

    grappes: [
      { id: "ottawa_neg", dx: "fracture", nom: "Règles d'Ottawa négatives", rv: .08, couvre: OTT_POP, statut: "verifie",
        piste: `${BACHMANN} : Se 99,4 %, Sp 35,3 %, RV− 0,08`, si: L => ["ott_4pas", "p_mall_lat", "p_mall_med", "p_5mt", "p_navic"].every(id => L.non(id)) },
      { id: "ottawa_pos", dx: "fracture", nom: "Règles d'Ottawa positives (au moins un critère)", rv: 1.54, se: .994, sp: .353, couvre: OTT_POP, statut: "verifie",
        piste: `${BACHMANN} : RV+ 1,54 (calculé) ; ne confirme pas`, si: L => ["ott_4pas", "p_mall_lat", "p_mall_med", "p_5mt", "p_navic"].some(id => L.oui(id)) },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Cheville atteinte", "Droite", "Gauche", { periostite: 2, ff_tibia: 1.2, loge: 2.5, sever: 1.8, tibpost: 1.3, arthrose: 1.2, cristaux: .8, achille: 1.5, insertion: 1.4, tarsien: 1.2,
          entorse_lat: .1, instab: .4, syndesmose: .1, rupture_achille: .1, fracture: .1, mollet: .2, lot: .4, fibulaires: .4, deltoide: .2, conflit: .5, insuff: .7 }, "Douleur aux deux chevilles"),
        C.accompagne(), C.refere(), C.travail({ physique: { arthrose: 1.1, tibpost: 1.1 } }), C.travailPrecision(),
        C.sport({ aucun: { entorse_lat: .6, periostite: .3, ff_tibia: .4, loge: .3, achille: .8, syndesmose: .4, instab: .7 },
          course: { achille: 2, periostite: 2.5, ff_tibia: 2.5, loge: 1.5, mollet: 1.5, insertion: 1.5, fibulaires: 1.3 },
          pivot: { entorse_lat: 1.8, instab: 1.5, syndesmose: 1.5, lot: 1.3, sever: 1.5, rupture_achille: 1.5, conflit: 1.3 },
          raquette: { rupture_achille: 2, mollet: 2, entorse_lat: 1.3 }, contact: { syndesmose: 2.5, entorse_lat: 1.3, deltoide: 1.5 }, glisse: { syndesmose: 1.5, fracture: 1.3 },
          danse: { conflit: 2, fibulaires: 1.3, achille: 1.2, entorse_lat: 1.3 }, marche: { tibpost: 1.2, arthrose: 1.1 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(),
        ouiNon("atcd_entorses", "Entorses antérieures de cette cheville", { oui: "entorses antérieures de cette cheville", nie: "entorse antérieure",
          effets: { instab: p(5, .3), entorse_lat: p(1.5, .9), lot: p(1.5, .9), conflit: p(2, .8), fibulaires: p(1.5, .9), arthrose: p(1.8, .9) } }),
        ouiNon("fluoro_cortico", "Fluoroquinolone ou corticoïde récents", { oui: "fluoroquinolone ou corticoïde récents", non: "", effets: { rupture_achille: p(3, .9), achille: p(1.5, .95) } }),
        C.atcdMedicaux(),
        ouiNon("obesite", "Obésité (IMC 30 ou plus)", { oui: "obésité", non: "", effets: { tibpost: p(2, .8), insertion: p(1.5, .9), arthrose: p(1.3, .9), cristaux: p(1.5, .9) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux(), C.atcdRhumato("cristaux", 1, 1, { cristaux: "cristaux" }),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ instab: p(.3, 3), entorse_lat: p(1.3, .8), cristaux: p(.5, 1.8), fibulaires: p(.8, 1.3) }),
          C.depuis(), C.contexte(),
          C.duree({ lt7: { entorse_lat: 2.5, fracture: 3, syndesmose: 2.5, rupture_achille: 2.5, mollet: 2.5, deltoide: 2.5, cristaux: 2.5, insuff: 1.5, achille: .3, insertion: .3, tibpost: .3,
              arthrose: .2, periostite: .4, ff_tibia: .5, loge: .3, sever: .5, instab: .5, conflit: .3, tarsien: .3, lot: .6 },
            s1_6: { entorse_lat: 1.3, syndesmose: 1.3, mollet: 1.3, ff_tibia: 1.3, periostite: 1.2, fracture: .8, cristaux: .6 },
            s6_12: { lot: 1.8, instab: 1.3, achille: 1.2, ff_tibia: 1.2, entorse_lat: .4, fracture: .3, rupture_achille: .4, cristaux: .4 },
            gt3m: { achille: 2, insertion: 2, tibpost: 2, arthrose: 2.5, instab: 2.5, conflit: 2, lot: 1.5, tarsien: 1.8, loge: 1.8, fibulaires: 1.5, entorse_lat: .1, fracture: .05, syndesmose: .1,
              rupture_achille: .1, mollet: .1, deltoide: .1, cristaux: .3, insuff: .5 } }),
          C.apparition({ subit_trauma: { entorse_lat: 6, fracture: 6, syndesmose: 6, deltoide: 5, rupture_achille: 3, mollet: 2.5, lot: 2, fibulaires: 1.5, instab: 1.5, achille: .2, insertion: .2,
              tibpost: .2, arthrose: .2, periostite: .1, ff_tibia: .2, loge: .1, sever: .3, conflit: .3, tarsien: .3, cristaux: .2, insuff: .3 },
            subit: { rupture_achille: 3, mollet: 3, cristaux: 5, insuff: 3, ff_tibia: 1.5, entorse_lat: .2, fracture: .3, syndesmose: .2 },
            graduel: { periostite: 3, ff_tibia: 3, loge: 2.5, achille: 2.5, insertion: 2, sever: 2.5, tibpost: 2, fibulaires: 2, conflit: 2, tarsien: 1.5, entorse_lat: .05, fracture: .05, syndesmose: .05,
              rupture_achille: .2, mollet: .3, deltoide: .05 },
            insidieux: { arthrose: 3, tibpost: 2.5, tarsien: 2, achille: 2, insertion: 2, conflit: 1.5, lot: 1.5, entorse_lat: .05, fracture: .05, syndesmose: .05, deltoide: .05, rupture_achille: .1, mollet: .1 } }),
          choix("mecanisme", "Mécanisme", [
            o("inversion", "Inversion (cheville tournée vers l'intérieur)", { entorse_lat: 3, fibulaires: 1.5, lot: 1.3, syndesmose: .5, deltoide: .3 }, { n: "inversion" }),
            o("eversion", "Éversion ou rotation externe du pied", { deltoide: 3, entorse_lat: .3 }, { n: "éversion ou rotation externe" }),
            o("dorsiflexion", "Dorsiflexion forcée", { syndesmose: 1.5, fibulaires: 2, conflit: 1.2 }, { n: "dorsiflexion forcée" }),
            o("poussee", "Poussée ou départ explosif", { rupture_achille: 5, mollet: 5, entorse_lat: .2, syndesmose: .2, fracture: .3 }, { n: "poussée ou départ explosif" }),
            o("chute", "Chute de hauteur ou réception sur le pied", { fracture: 2.5, syndesmose: 1.2, lot: 1.3 }, { n: "chute ou réception sur le pied" }),
            o("direct", "Coup direct", { fracture: 1.5, entorse_lat: .5 }, { n: "coup direct" })],
            { si: trauma, masqueSi: "contexte", effets: [{ dx: "syndesmose", rv: { eversion: 3.47 }, statut: "verifie", piste: `${BALTES22} : mécanisme en éversion (150 athlètes), RV+ 3,47 (1,55–7,77)` }] }),
          ouiNon("coup_baton", "Sensation de coup de bâton ou de pop derrière la cheville ou au mollet", { si: trauma, oui: "sensation de coup de bâton", nie: "coup de bâton",
            effets: { rupture_achille: p(6, .3), mollet: p(4, .5), entorse_lat: p(.6, 1.1) } }),
          ouiNon("oedeme_rapide", "Œdème rapide et important", { si: trauma, oui: "œdème rapide", nie: "œdème rapide", effets: { fracture: p(1.8, .6), entorse_lat: p(1.5, .6), syndesmose: p(1.3, .9) } }),
          ouiNon("disproportion", "Douleur disproportionnée par rapport à la blessure", { si: trauma, oui: "douleur disproportionnée", non: "",
            effets: { syndesmose: verRv(3.05, undefined, `${SMAN} : Sp 79 %, RV+ 3,05 (1,68–5,55)`) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("laterale", "Latérale, devant ou sous la malléole externe", { entorse_lat: p(4, .2), instab: p(2, .6), fibulaires: p(1.5, .8), conflit: p(1.5, .8), lot: p(1.3, .9), fracture: p(1.3, .8) }, { n: "latérale" }),
            m("retro_lat", "Derrière la malléole externe (tendons fibulaires)", { fibulaires: p(6, .5) }, { n: "rétromalléolaire latérale" }),
            m("anterieure", "Antérieure (pli de la cheville)", { conflit: p(3, .6), syndesmose: p(2, .7), arthrose: p(1.5, .8), lot: p(1.3, .9) }, { n: "antérieure" }),
            m("haute", "Haute, au-dessus de la cheville, entre tibia et péroné", { syndesmose: p(4, .5), fracture: p(1.2, 1) }, { n: "haute, à la syndesmose" }),
            m("mediale", "Médiale (malléole interne, rétromalléolaire)", { tibpost: p(4, .4), deltoide: p(4, .5), tarsien: p(3, .6), entorse_lat: p(.5, 1.2) }, { n: "médiale" }),
            m("achille_corps", "Tendon d'Achille, 2 à 6 cm au-dessus du talon", { achille: ver(.84, .73, `${MARTIN} : douleur rapportée 2 à 6 cm au-dessus de l'insertion (n = 21)`),
              rupture_achille: p(3, .5), insertion: p(.6, 1.1), mollet: p(.8, 1) }, { n: "au tendon d'Achille, 2 à 6 cm au-dessus du talon" }),
            m("achille_ins", "Insertion du tendon d'Achille (arrière du talon)", { insertion: p(6, .3), sever: p(3, .6), achille: p(.8, 1) }, { n: "à l'insertion du tendon d'Achille" }),
            m("tibia_med", "Bord interne du tibia, tiers inférieur (diffuse)", { periostite: p(6, .3), ff_tibia: p(2, .8), loge: p(1.5, .9) }, { n: "bord interne du tibia" }),
            m("tibia_focal", "Point précis sur le tibia ou le péroné", { ff_tibia: p(6, .4), periostite: p(1.5, .9) }, { n: "point précis du tibia ou du péroné" }),
            m("mollet", "Mollet", { mollet: p(8, .3), rupture_achille: p(2, .9), loge: p(2, .8) }, { n: "mollet" }),
            m("diffuse", "Diffuse, toute l'articulation", { arthrose: p(2, .8), cristaux: p(2.5, .7), lot: p(1.5, .9), insuff: p(1.5, .9) }, { n: "diffuse" }),
            m("plantaire", "Plante du pied ou talon, avec engourdissements", { tarsien: p(4, .6) }, { n: "plantaire" }),
          ], { gabarit: "douleur a/n {v}" }),
          C.type({ sourde: { arthrose: 1.3, lot: 1.3 }, brulure: { tarsien: 3 }, choc: { tarsien: 3 }, pulsatile: { cristaux: 1.5 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("course_saut", "Pire à la course ou au saut", { g: "facteurs", agg: "la course ou les sauts", aggNie: "aux sauts",
            effets: { periostite: p(3, .3), ff_tibia: p(3, .3), achille: p(2.5, .4), insertion: p(1.8, .6), loge: p(2, .5), sever: p(3, .4), lot: p(1.3, .9) } }),
          ouiNon("effort_loge", "Douleur ou tension après un temps d'effort fixe, qui cède au repos", { oui: "douleur après un temps d'effort fixe, qui cède au repos", nie: "douleur d'effort à seuil fixe",
            effets: { loge: p(8, .2), periostite: p(1.5, .7), ff_tibia: p(1.2, .9) } }),
          ouiNon("marche", "Pire à la marche", { g: "facteurs", agg: "la marche", aggNie: "à la marche", effets: { tibpost: p(1.8, .6), arthrose: p(1.8, .6), insuff: p(2, .7), ff_tibia: p(1.5, .8), tarsien: p(1.5, .8) } }),
          ouiNon("pointes", "Pire en montant sur la pointe des pieds", { g: "facteurs", agg: "la montée sur pointes", aggNie: "sur pointes",
            effets: { achille: p(2, .5), insertion: p(1.8, .6), rupture_achille: p(3, .3), tibpost: p(2, .6), mollet: p(2, .6) } }),
          ouiNon("descente", "Pire accroupi, en descente ou en dorsiflexion", { g: "facteurs", agg: "la dorsiflexion (accroupi, descente)", aggNie: "en dorsiflexion",
            effets: { conflit: p(3, .5), arthrose: p(1.5, .8), insertion: p(1.3, .9) } }),
          C.attenuants(),
          C.moment({ matin: { achille: 2, insertion: 2, arthrose: 1.2 }, soir: { periostite: 1.3, ff_tibia: 1.3, tibpost: 1.3 }, constante: { cristaux: 1.5, ff_tibia: 1.2 } }),
          C.nocturne({ ff_tibia: p(2, .8), insuff: p(2.5, .8), cristaux: p(2, .8), tarsien: p(1.8, .9), periostite: p(.6, 1.1) }),
          C.raideur({ moins30: { arthrose: 1.5, achille: 1.3 }, plus30: { cristaux: 1.2 } }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("derobade", "Entorses à répétition ou cheville qui cède", { oui: "cheville qui cède", nie: "instabilité", effets: { instab: p(6, .3), entorse_lat: p(1.2, 1), fibulaires: p(1.5, .9), lot: p(1.3, .95) } }),
          ouiNon("ressaut", "Claquement derrière la malléole externe", { oui: "claquement rétromalléolaire latéral", nie: "claquement", effets: { fibulaires: p(6, .7) } }),
          ouiNon("blocage", "Blocages ou accrochages", { oui: "blocages ou accrochages", nie: "blocage", effets: { lot: p(3, .8), conflit: p(1.5, .9), arthrose: p(1.3, .95) } }),
          ouiNon("enflure", "Enflure de la cheville", { oui: "enflure de la cheville", nie: "enflure", g: "epanchement",
            effets: { entorse_lat: p(2, .3), fracture: p(1.8, .5), syndesmose: p(1.5, .7), cristaux: p(3, .3), arthrose: p(1.3, .9), lot: p(1.3, .9), tibpost: p(1.3, .9), periostite: p(.4, 1.1), loge: p(.4, 1.1), achille: p(.8, 1.05) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", nie: "rougeur", g: "inflammation", effets: { cristaux: p(5, .5), entorse_lat: p(.8, 1) } }),
          ouiNon("paresthesies", "Engourdissements ou brûlure à la plante du pied", { oui: "paresthésies plantaires", nie: "paresthésie", effets: { tarsien: p(6, .3), loge: p(2, .9) } }),
          ouiNon("douleur_dos", "Lombalgie ou douleur qui descend du dos", { oui: "lombalgie", nie: "lombalgie" }),
          C.autresArticulations({ cristaux: p(1.5, .9) }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ cristaux: p(1.4, .95) }), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("infiltration", "Infiltration ou chirurgie récente de la cheville", {}, { n: "infiltration ou chirurgie récente" })]),
          ouiNon("mollet_tvp", "Mollet enflé, chaud ou douloureux sans traumatisme", { oui: "œdème ou douleur au mollet", nie: "œdème du mollet", drapeau: true }),
          ouiNon("pied_froid", "Pied froid ou pâle, ou déformation visible", { oui: "pied froid ou déformation", nie: "déformation", drapeau: true }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        C.fonctionnel({ boiterie: { entorse_lat: 1.3, fracture: 1.5, syndesmose: 1.5, rupture_achille: 1.5, insuff: 1.5, cristaux: 1.5 },
          appui: { fracture: 2.5, syndesmose: 2, entorse_lat: 1.5, cristaux: 2, insuff: 2 }, demarche_normale: { fracture: .5, syndesmose: .6 },
          talons: { rupture_achille: 2, tibpost: 2, achille: 1.5, arthrose: 1.3 }, plat: { tibpost: 3, periostite: 1.3, tarsien: 1.3 }, creux: { instab: 1.5, fibulaires: 1.5 },
          appui_uni: { instab: 2, syndesmose: 1.5 }, saut_uni: { achille: 1.5, sever: 2 }, saut_impossible: { fracture: 1.5 },
          sautEffets: [{ dx: "syndesmose", rv: { normal: .37 }, statut: "verifie", piste: `${SMAN} : saut unipodal impossible, Se 89 % ; possible, RV− 0,37 (0,13–1,03)` },
            { dx: "ff_tibia", rv: { douleur: 1.82, impossible: 1.82, normal: .02 }, statut: "verifie", piste: `${HOENIG} : test du saut, Se 100 %, Sp 45 % (RV calculés, Se plafonnée à 99 %)` },
            { dx: "periostite", rv: { douleur: 1.8, normal: .5 } }] },
          { garder: ["arches", "demarche", "talons_pointes", "appui_uni", "saut_bi", "saut_uni"],
            ajouts: [choix("pointe_uni", "Montée sur pointe unipodale", [o("normale", "Normale", {}, { n: "montée sur pointe unipodale{cote} normale" }),
              o("douloureuse", "Douloureuse", { achille: 2, insertion: 2, tibpost: 2, mollet: 2 }, { n: "montée sur pointe unipodale{cote} douloureuse" }),
              o("impossible", "Impossible ou sans inversion du talon", { tibpost: 4, rupture_achille: 4 }, { n: "montée sur pointe unipodale{cote} impossible ou sans inversion du talon" })], { ligneEx: "saut" })] }),
        { titre: "Inspection", sep: ", ", toutNormal: true, questions: [
          ouiNon("ex_oedeme_lat", "Œdème latéral", { oui: "œdème latéral", non: "pas d'œdème latéral",
            effets: { entorse_lat: { rvp: 1.5, rvn: .1, statut: "a_verifier", piste: `${BALTES24} : gonflement latéral dans les 2 premiers jours, Se 100 % pour la rupture ligamentaire (n = 43) ; RV− fixé à 0,1` }, fracture: p(1.5, .5) } }),
          ouiNon("ex_ecchymose", "Hématome ou ecchymose", { oui: "ecchymose", non: "", effets: { entorse_lat: ver(.43, .85, `${BALTES24} : hématome à l'examen aigu (91 % à l'examen différé)`), fracture: p(1.5, .9), syndesmose: p(1.3, .95) } }),
          ouiNon("ex_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", non: "pas de rougeur", g: "inflammation", effets: { cristaux: p(5, .4), entorse_lat: p(.8, 1) } }),
          ouiNon("trop_orteils", "Signe des « trop d'orteils »", { oui: "signe des « trop d'orteils »", non: "", horsNormal: true, effets: { tibpost: p(4, .35) } }),
          ouiNon("haglund", "Saillie postérieure du calcanéus (Haglund)", { oui: "saillie de Haglund", non: "", horsNormal: true, effets: { insertion: p(3, .8) } }),
          ouiNon("ex_deformation", "Déformation", { oui: "déformation", non: "" }),
        ] },
        { titre: "Palpation", res: PALP, toutNormal: true, labels: ["Douloureux", "Indolore"], questions: [
          ouiNon("p_mall_lat", "Malléole latérale : bord postérieur ou pointe (6 cm)", { court: "malléole latérale", genre: "f", effets: { fracture: p(2, .4), entorse_lat: p(1.2, .8) } }),
          ouiNon("p_mall_med", "Malléole médiale : bord postérieur ou pointe (6 cm)", { court: "malléole médiale", genre: "f", effets: { fracture: p(2, .7), deltoide: p(2, .8) } }),
          ouiNon("p_5mt", "Base du 5ᵉ métatarsien", { court: "base du 5ᵉ métatarsien", genre: "f", effets: { fracture: p(2, .9) } }),
          ouiNon("p_navic", "Naviculaire", { court: "naviculaire", effets: { fracture: p(1.8, .95) } }),
          ouiNon("p_ltfa", "Ligament talo-fibulaire antérieur", { court: "talo-fibulaire antérieur",
            effets: { entorse_lat: est(1.6, .2, `${NW2022} : Se > 90 %, Sp < 50 %`, { g: "lat-ex" }), instab: p(1.3, .9) } }),
          ouiNon("p_lcf", "Ligament calcanéo-fibulaire", { court: "calcanéo-fibulaire", effets: { entorse_lat: p(2, .6, { g: "lat-ex" }) } }),
          ouiNon("p_syndesmose", "Syndesmose (tibio-fibulaire antéro-inférieure)", { court: "syndesmose", genre: "f", effets: { syndesmose: ver(.92, .29, NW2021, { g: "synd-ex" }) } }),
          ouiNon("p_deltoide", "Ligament deltoïde", { court: "ligament deltoïde", effets: { deltoide: p(4, .3) } }),
          ouiNon("p_perone_prox", "Fibula proximale", { court: "fibula proximale", genre: "f", effets: { deltoide: p(2, .9), syndesmose: p(1.5, .95) } }),
          ouiNon("p_achille_corps", "Tendon d'Achille, portion moyenne", { court: "tendon d'Achille (portion moyenne)",
            effets: { achille: ver(.78, .77, `${MARTIN} : échographie, n = 21`, { g: "achille-ex" }), rupture_achille: p(2, .7) } }),
          ouiNon("p_achille_ins", "Insertion du tendon d'Achille", { court: "insertion du tendon d'Achille", genre: "f", effets: { insertion: p(5, .3), sever: p(1.5, .9) } }),
          ouiNon("p_defect", "Défect palpable du tendon d'Achille", { court: "défect palpable du tendon d'Achille", res: TEST, horsNormal: true,
            effets: { rupture_achille: ver(.73, .89, MAFFULLI, { g: "achille-rupt" }) } }),
          ouiNon("p_calcaneum", "Calcanéus (compression latérale)", { court: "calcanéus", effets: { sever: p(5, .3), insuff: p(3, .7) } }),
          ouiNon("p_tib_post", "Tendon tibial postérieur (rétromalléolaire médial)", { court: "tendon tibial postérieur", effets: { tibpost: p(4, .4, { g: "tibpost-ex" }), tarsien: p(1.5, .9) } }),
          ouiNon("godet_tp", "Œdème rétromalléolaire médial (godet)", { court: "œdème rétromalléolaire médial", res: TEST, horsNormal: true,
            effets: { tibpost: ver(.86, 1, `${DEORIO} : Se 86 %, Sp 100 % (plafonnée à 99 %)`, { g: "tibpost-ex" }) } }),
          ouiNon("p_fibulaires", "Tendons fibulaires (rétromalléolaire latéral)", { court: "tendons fibulaires", effets: { fibulaires: p(5, .3) } }),
          ouiNon("p_interligne", "Interligne antérieur de la cheville", { court: "interligne antérieur", effets: { conflit: p(3, .5), arthrose: p(1.5, .8), lot: p(1.5, .9) } }),
          ouiNon("p_tibia_med", "Bord médial du tibia (diffus)", { court: "bord médial du tibia", effets: { periostite: p(5, .3), ff_tibia: p(1.5, .8) } }),
          ouiNon("p_tibia_focal", "Point osseux précis du tibia ou de la fibula", { court: "point osseux précis du tibia ou de la fibula", horsNormal: true, effets: { ff_tibia: p(6, .4), periostite: p(1.3, .9) } }),
          ouiNon("p_mollet", "Mollet", { court: "mollet", effets: { mollet: p(6, .3), rupture_achille: p(1.5, .9) } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_df", "Dorsiflexion active", "dorsiflexion", { complete: { arthrose: .6 }, lim_douleur: { conflit: 2, arthrose: 1.5, lot: 1.5, entorse_lat: 1.2 }, lim_raideur: { arthrose: 3, conflit: 1.5 } }),
          C.degres("arom_df", "Dorsiflexion active mesurée"),
          C.amplitude("arom_fp", "Flexion plantaire active", "flexion plantaire", { lim_douleur: { conflit: 1.5, achille: 1.2, entorse_lat: 1.3 }, lim_raideur: { arthrose: 2 } }),
          C.degres("arom_fp", "Flexion plantaire active mesurée"),
        ] },
        { titre: "PROM", toutNormal: true, questions: [
          C.amplitude("prom_inversion", "Inversion passive", "inversion", { lim_douleur: { entorse_lat: 2, fibulaires: 1.3 }, lim_raideur: { arthrose: 1.5 } }),
          C.amplitude("prom_eversion", "Éversion passive", "éversion", { lim_douleur: { deltoide: 2, tibpost: 1.3 }, lim_raideur: { arthrose: 1.5 } }),
        ] },
        { titre: "RROM", res: "rrom", toutNormal: true, labels: ["Douloureuse", "Indolore"], questions: [
          ouiNon("rrom_eversion", "Éversion résistée", { court: "éversion", genre: "f", effets: { fibulaires: p(3, .5) } }),
          ouiNon("rrom_inversion", "Inversion résistée", { court: "inversion", genre: "f", effets: { tibpost: p(3, .5) } }),
          ouiNon("rrom_fp", "Flexion plantaire résistée", { court: "flexion plantaire", genre: "f", effets: { achille: p(2, .6), rupture_achille: p(3, .5), mollet: p(2, .6), insertion: p(1.5, .8) } }),
        ] },
        { titre: "Ligaments latéraux", toutNormal: true, questions: [
          C.lig("tiroir_ant", "Tiroir antérieur", "tiroir antérieur", { entorse_lat: { rv: { laxite: 3, douleur: 1.3, normal: .7 }, g: "lat-ex", statut: "a_verifier", piste: `${NW2022} : Se 12–80 %, Sp 67–100 %` },
            instab: { rv: { laxite: 3, normal: .6 } } }),
          C.lig("talar_tilt", "Talar tilt", "talar tilt", { entorse_lat: { rv: { laxite: 3, normal: .8 }, g: "lat-ex", statut: "a_verifier", piste: `${NW2022} : Se 17–66 %, Sp 82–100 %` },
            instab: { rv: { laxite: 3, normal: .7 } } }),
          ouiNon("differe", "Examen fait au 4ᵉ à 7ᵉ jour après l'entorse", { si: trauma, oui: "examen différé (J4–J7)", non: "", info: "L'examen différé évalue mieux la gravité : hématome, sensibilité du talo-fibulaire antérieur et tiroir antérieur réunis, Se 96 %, Sp 84 % pour la rupture ligamentaire (van Dijk ; Haraguchi 2007)." }),
        ] },
        { titre: "Tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("squeeze", "Squeeze test", { court: "squeeze test", effets: { syndesmose: ver(.32, .85, NW2021, { g: "synd-ex" }) } }),
          ouiNon("rot_ext", "Rotation externe forcée (Kleiger)", { court: "rotation externe forcée", genre: "f", effets: { syndesmose: ver(.7, .78, NW2021, { g: "synd-ex" }), deltoide: p(2, .8) } }),
          ouiNon("thompson", "Thompson", { court: "Thompson", effets: { rupture_achille: ver(.96, .93, `${MAFFULLI} ; ${REIMAN}`, { g: "achille-rupt" }) } }),
          ouiNon("matles", "Matles", { court: "Matles", horsNormal: true, effets: { rupture_achille: ver(.88, .85, MAFFULLI, { g: "achille-rupt" }) } }),
          ouiNon("royal_london", "Royal London Hospital test", { court: "Royal London Hospital test", horsNormal: true, effets: { achille: ver(.54, .86, REIMAN, { g: "achille-ex" }) } }),
          ouiNon("arc_sign", "Arc sign", { court: "arc sign", horsNormal: true, effets: { achille: ver(.42, .88, REIMAN, { g: "achille-ex" }) } }),
          ouiNon("tinel_tarsien", "Tinel au tunnel tarsien", { court: "Tinel au tunnel tarsien", horsNormal: true, effets: { tarsien: p(4, .5) } }),
        ] },
        { titre: "Règles d'Ottawa (cheville et pied)", si: L => L.trauma() && (!L.repondu("duree") || L.v("duree") === "lt7"), ligne: "Ottawa",
          aide: "Traumatisme récent : radiographie de la cheville si douleur malléolaire et un critère ; du pied si douleur du médio-pied et un critère. Les réponses de la palpation se recopient ici, et inversement.",
          questions: [
            ouiNon("ott_4pas", "Incapable de faire 4 pas, immédiatement après la blessure et à l'examen", { oui: "incapable de faire 4 pas", non: "4 pas possibles" }),
            miroir("ott_mall_lat", "p_mall_lat", "Malléole latérale : bord postérieur ou pointe (6 cm)"),
            miroir("ott_mall_med", "p_mall_med", "Malléole médiale : bord postérieur ou pointe (6 cm)"),
            miroir("ott_5mt", "p_5mt", "Base du 5ᵉ métatarsien"),
            miroir("ott_navic", "p_navic", "Naviculaire"),
          ] },
        { fin: true, questions: C.controlateral() },
        { titre: "Genou et lombaire", adjacent: "genou", toutNormal: true, questions: [
          choix("genou_mob", "Genou : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation du genou indolore" }), o("douleur", "Douloureuse", {}, { n: "mobilisation du genou douloureuse" })]),
          ouiNon("deficit_l5s1", "Déficit de force, de sensibilité ou de réflexe L5–S1", { oui: "déficit L5–S1", non: "force, sensibilité et réflexes L5–S1 normaux" }),
        ] },
        { titre: "Neurovasculaire", adjacent: "neurovasculaire", sansCote: true, toutNormal: true, questions: [
          ouiNon("pouls_dim", "Pouls pédieux ou tibial postérieur diminués", { oui: "pouls diminués", non: "pouls pédieux et tibial postérieur normaux" }),
          ouiNon("sensibilite_dim", "Sensibilité du pied diminuée", { oui: "sensibilité du pied diminuée", non: "sensibilité du pied normale" }),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      C.regles.septique("une cheville", ["rougeur_chaleur", "ex_chaleur"], [["enflure", ["oui"]]]),
      // Règles d'Ottawa de la cheville et du pied (Stiell) : traumatisme récent.
      L => {
        if (!L.trauma() || (L.repondu("duree") && L.v("duree") !== "lt7")) return null;
        const cheville = L.oui("p_mall_lat") || L.oui("p_mall_med"), pied = L.oui("p_5mt") || L.oui("p_navic"), quatre = L.oui("ott_4pas");
        const faits = ["ott_4pas", "p_mall_lat", "p_mall_med", "p_5mt", "p_navic"].every(id => L.repondu(id));
        const jeune = L.age !== null && L.age < 18;
        if (cheville || pied || quatre) {
          const rx = [cheville || (quatre && !pied) ? "de la cheville" : null, pied ? "du pied" : null].filter(Boolean).join(" et ");
          return { niveau: "rapide", titre: `Radiographie ${rx} indiquée (règles d'Ottawa)`, ro: "fracture",
            texte: `Critère : ${[quatre && "incapable de faire 4 pas", L.oui("p_mall_lat") && "malléole latérale", L.oui("p_mall_med") && "malléole médiale", L.oui("p_5mt") && "base du 5ᵉ métatarsien", L.oui("p_navic") && "naviculaire"].filter(Boolean).join(", ")}. Règles : Se 99,4 %, Sp 35,3 % ; valides dès 5 ans.`,
            conduite: [{ t: `Radiographie ${rx}`, src: BACHMANN }, ...(jeune ? [...items(20), ...items(21)] : items(6))] };
        }
        if (faits) return { niveau: "info", titre: "Règles d'Ottawa négatives", texte: "Aucun critère : la radiographie n'est pas nécessaire pour éliminer une fracture (RV− 0,08). Palper aussi la fibula proximale et la syndesmose." };
        return { niveau: "info", titre: "Règles d'Ottawa à compléter", texte: "Traumatisme récent : 4 pas, malléoles (bord postérieur et pointe, 6 cm), base du 5ᵉ métatarsien, naviculaire." };
      },
      L => (L.oui("p_perone_prox") && (L.oui("p_deltoide") || L.oui("p_mall_med") || L.oui("rot_ext") || L.oui("squeeze")))
        ? { niveau: "rapide", titre: "Fracture de Maisonneuve à éliminer", ro: "fracture de Maisonneuve", texte: "Fibula proximale douloureuse avec une atteinte médiale ou de la syndesmose.",
          conduite: [{ t: "Radiographies de la jambe entière et de la cheville (incidence de la mortaise)" }, ...items(15)] } : null,
      L => (L.oui("thompson") || L.oui("p_defect") || L.oui("matles") || L.v("pointe_uni") === "impossible" && L.trauma())
        ? { niveau: "rapide", titre: "Rupture du tendon d'Achille à éliminer", ro: "rupture du tendon d'Achille", texte: "Thompson positif (RV+ 13,7), défect palpable ou Matles positif.", conduite: items(5) } : null,
      L => (L.oui("pied_froid") || L.oui("ex_deformation") || L.oui("pouls_dim"))
        ? { niveau: "urgence", titre: "Déformation ou atteinte vasculaire", ro: "fracture-luxation", texte: "Pied froid ou pâle, pouls diminués ou déformation visible.",
          conduite: [{ t: "Urgence : réalignement, immobilisation, radiographies ; évaluation vasculaire" }] } : null,
      L => (L.trauma() && L.oui("disproportion") && (L.oui("paresthesies") || L.oui("sensibilite_dim")))
        ? { niveau: "urgence", titre: "Syndrome compartimental aigu à éliminer", ro: "syndrome compartimental", texte: "Douleur disproportionnée après un traumatisme, avec engourdissements ou sensibilité diminuée.",
          conduite: [{ t: "Urgence : mesure des pressions et avis orthopédique immédiat ; retirer plâtre ou bandage serré" }] } : null,
      L => L.oui("mollet_tvp") ? { niveau: "rapide", titre: "Thrombose veineuse profonde à éliminer", ro: "TVP", texte: "Mollet enflé, chaud ou douloureux. Différence de diamètre des mollets : RV+ 1,8 ; le signe de Homans n'a pas de valeur.",
        conduite: [{ t: "Score de Wells, D-dimères ou écho-doppler selon la probabilité" }], liens: [{ t: "CRDS : thrombophlébite profonde", u: "/crds/?q=TVP" }] } : null,
      // Fractures manquées après une « entorse » (fiche 25) : douleur qui persiste.
      L => (L.trauma() && L.dans("duree", ["s6_12", "gt3m"]) && L.v("evolution") !== "mieux")
        ? { niveau: "considerer", titre: "Fracture manquée ou lésion associée à éliminer", ro: "fracture occulte", texte: "Douleur qui persiste après une « entorse » : lésion ostéochondrale du talus, fibulaires, processus latéral du talus, processus antérieur du calcanéus, base du 5ᵉ métatarsien, syndesmose.",
          conduite: items(25) } : null,
      L => (L.age !== null && L.age < 18 && L.trauma() && (L.oui("p_mall_lat") || L.oui("p_mall_med")))
        ? { niveau: "info", titre: "Adolescent : penser à la physe", texte: "Douleur sur la physe fibulaire ou tibiale : à radiographies normales, il s'agit surtout d'une lésion ligamentaire ; les fractures de transition (Tillaux, triplane) touchent les 12–15 ans.",
          conduite: items(21) } : null,
      L => (L.oui("fluoro_cortico") && (L.a("localisation", "achille_corps") || L.a("localisation", "achille_ins")))
        ? { niveau: "info", titre: "Fluoroquinolone ou corticoïde et tendon d'Achille", texte: "Risque accru de rupture : cesser la fluoroquinolone si possible, éviter les charges explosives." } : null,
      L => (L.oui("deficit_l5s1") || (L.oui("douleur_dos") && L.oui("paresthesies")))
        ? { niveau: "considerer", titre: "Radiculopathie L5–S1 à considérer", ro: "radiculopathie L5–S1", texte: "Signes neurologiques ou douleur qui descend du dos.", conduite: [{ t: "Examen lombaire et neurologique complet" }] } : null,
      C.regles.tumeur("Radiographie de la cheville et de la jambe."),
    ],
  });
})();
