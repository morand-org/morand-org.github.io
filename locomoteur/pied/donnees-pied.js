/* Locomoteur Morand, pied (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), parties A à H.
   Même format que le genou : p() provisoire, lit()/est() à vérifier, ver()/verRv() vérifié avec sa source. */
(function () {
  "use strict";
  const { p, est, o, m, ouiNon, choix, multi, miroir } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), PALP = "palp", TEST = "test";
  const BACHMANN = "Bachmann et coll., 2003, BMJ (PMID 12595378) ; Beckenkamp et coll., 2017, BJSM (PMID 27884861)";
  const DEGARCEAU = "De Garceau et coll., 2003, Foot Ankle Int (PMID 12793489)", MAHADEVAN = "Mahadevan et coll., 2015, J Foot Ankle Surg (PMID 25432459)";
  const KANJI = "Kanji et coll., 2010, JAMA (examen clinique rationnel)", MENZ = "Menz et coll., 2006, Foot Ankle Int";
  const OTT = ["ott_4pas", "p_5mt", "p_navic"];

  const ANGLAIS = { fasciite: "plantar fasciitis (plantar heel pain)", hallux_valgus: "hallux valgus", orteils: "lesser toe deformities or bunionette", arthrose_mp: "midfoot osteoarthritis",
    hallux_rigidus: "hallux rigidus", metatarsalgie: "metatarsalgia or plantar plate injury", goutte: "gout of the first metatarsophalangeal joint (podagra)",
    fracture: "metatarsal, fifth metatarsal base or toe fracture", morton: "Morton neuroma", ff_mt: "metatarsal stress fracture", ff_navic: "navicular stress fracture",
    ff_calc: "calcaneal stress fracture", lisfranc: "Lisfranc injury", turf_toe: "turf toe", sesamoide: "sesamoiditis or sesamoid fracture", charcot: "Charcot neuroarthropathy",
    synostose: "tarsal coalition", os_navic: "painful accessory navicular", freiberg: "Freiberg disease", iselin: "Iselin disease", sever: "Sever disease (calcaneal apophysitis)",
    contusion: "foot contusion or crush injury" };

  const CONDUITES = C.aideMemoire("pied", { fasciite: 1, hallux_valgus: 2, orteils: [3, 4], arthrose_mp: 5, hallux_rigidus: 6, metatarsalgie: 8, goutte: 9, fracture: [10, 11, 12],
    morton: 13, ff_mt: 14, ff_navic: 15, ff_calc: 16, lisfranc: 17, turf_toe: 19, sesamoide: 20, charcot: 21, synostose: 22, os_navic: 23, freiberg: 24, iselin: 26, contusion: 27,
    sever: "cheville:11" });
  const items = ref => C.aideMemoire("pied", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("pied"),
    { titre: "Pour tous", items: [{ t: "Enseignement : nature de l'atteinte, pronostic, chaussures adaptées, autogestion" },
      { t: "Consignes de reconsultation : fièvre, pied chaud et enflé, plaie, engourdissements, douleur nocturne" }] }];

  const INFOS = {
    premiers_pas: { info: "Douleur aux premiers pas du matin ou après le repos : critère de consensus de la fasciite plantaire (guide de l'APTA), sans sensibilité ni spécificité publiées." },
    chaussures: { info: "Névrome de Morton : aggravation dans des chaussures serrées chez 86 % des cas opérés, soulagement en les retirant chez 81 % (spécificité non mesurée)." },
    ecchymose_plantaire: { info: "Une ecchymose plantaire au médio-pied après une torsion ou un écrasement évoque une lésion de Lisfranc, souvent manquée : radiographies en charge." },
    diabete: { info: "Diabète avec neuropathie : un pied chaud, rouge et enflé, peu douloureux, est un pied de Charcot jusqu'à preuve du contraire (décharge immédiate) ; une plaie fait chercher une infection." },
    p_calc_med: { info: "Sensibilité du tubercule calcanéen médial : critère de consensus de la fasciite plantaire (APTA), sans sensibilité ni spécificité publiées." },
    p_navic: { info: "Critère d'Ottawa du pied. Douleur au point « N » (face dorsale du naviculaire) : jusqu'à 81 % des fractures de stress du naviculaire, fracture à haut risque." },
    p_intermt: { info: "Pincement pouce-index de l'espace intermétatarsien (3ᵉ espace surtout) : indolore, il rend le névrome de Morton peu probable (Se 96 % ; Mahadevan 2015)." },
    windlass: { info: "Debout, extension passive de l'hallux. Fasciite plantaire : Se 31,8 %, Sp 100 % (De Garceau 2003) : positif, il confirme ; négatif, il n'exclut pas.", positif: "douleur plantaire au talon reproduite", video: "Windlass test" },
    mulder: { info: "Compression latérale de l'avant-pied avec pression plantaire de l'espace : clic palpable. Se 61 % : un test négatif n'exclut pas.", positif: "clic douloureux dans l'espace intermétatarsien", video: "Mulder click test" },
    tiroir_mtp: { info: "Translation dorsale de la phalange proximale sur la tête métatarsienne (2ᵉ rayon surtout) : instabilité de la plaque plantaire.", positif: "translation augmentée ou douleur reproduite", video: "Plantar plate drawer test" },
    stress_lisfranc: { info: "Abduction et pronation de l'avant-pied, talon fixé, ou appui unipodal sur pointe : douleur au médio-pied.", positif: "douleur à l'articulation de Lisfranc", video: "Lisfranc stress test" },
    monofilament: { info: "Monofilament 5,07 non perçu : RV+ 11–16 pour une neuropathie des grosses fibres ; vibration 128 Hz, 5 sites sur 8 non perçus ou plus : RV+ 35 (Kanji 2010)." },
    ott_4pas: { info: "Critère d'Ottawa : incapable de faire 4 pas immédiatement après la blessure et à l'examen. Règles complètes : Se 99,4 %, Sp 35,3 %, RV− 0,08." },
  };

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "PIED-P1", cle: "morton|chaussures>morton", note: "OpenEvidence (24 nov. 2026) : 86 % des patients opérés le rapportent ; aucune spécificité publiée" },
    { code: "PIED-P2", cle: "morton|p_intermt>morton", note: "OpenEvidence (24 nov. 2026) : Se 96 % chez des patients déjà diagnostiqués (Mahadevan 2015) ; aucune spécificité publiée" },
    { code: "PIED-P3", cle: "morton|mulder>morton", se: 0.59, sp: 0.85, statut: "verifie", piste: "Padua et coll., 2020 (Foot Ankle Int), 175 patients adressés, référence échographique : RV+ 3,95, RV− 0,48" },
    { code: "PIED-P4", cle: "ff_navic|p_navic>ff_navic", note: "OpenEvidence (24 nov. 2026) : Se 81 % dans des séries de fractures confirmées ; aucune spécificité publiée" },
    { code: "PIED-P5", cle: "fasciite|localisation.talon_plantaire>fasciite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P6", cle: "fasciite|premiers_pas>fasciite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P7", cle: "fasciite|p_calc_med>fasciite", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P8", cle: "hallux_valgus|ex_hallux_valgus>hallux_valgus", rvp: 7.1, rvn: 0.17, statut: "verifie", piste: "Menz et coll., 2010 (BMC Musculoskelet Disord, PMID 20854678) : auto-évaluation contre l'examinateur, 65–93 ans, Se 85 %, Sp 88 %" },
    { code: "PIED-P9", cle: "orteils|localisation.orteils>orteils", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P10", cle: "orteils|ex_orteils>orteils", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P11", cle: "hallux_rigidus|localisation.mtp1>hallux_rigidus", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P12", cle: "hallux_rigidus|prom_mtp1|lim_raideur", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P13", cle: "metatarsalgie|localisation.avant_pied>metatarsalgie", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P14", cle: "goutte|atcd_rhumato.goutte>goutte", rvp: 2, rvn: 0.56, statut: "verifie", piste: "Janssens et coll., 2010 (Arch Intern Med), médecine familiale, monoarthrite, cristaux à la ponction : goutte rapportée par le patient, Se 61 %, Sp 70 %" },
    { code: "PIED-P15", cle: "goutte|atcd_rhumato.pseudogoutte>goutte", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P16", cle: "goutte|localisation.mtp1>goutte", note: "OpenEvidence (24 nov. 2026) : gros orteil touché chez 73 % des goutteux au cours de la maladie (Stewart 2016) ; aucune spécificité publiée" },
    { code: "PIED-P17", cle: "goutte|rougeur_chaleur>goutte", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P18", cle: "morton|localisation.intermt>morton", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P19", cle: "ff_mt|localisation.diaphyse>ff_mt", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P20", cle: "ff_mt|p_diaphyse>ff_mt", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P21", cle: "ff_calc|p_calc_comp>ff_calc", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P22", cle: "lisfranc|ecchymose_plantaire>lisfranc", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P23", cle: "lisfranc|ex_ecchymose_plantaire>lisfranc", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P24", cle: "lisfranc|p_lisfranc>lisfranc", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P25", cle: "lisfranc|stress_lisfranc>lisfranc", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P26", cle: "turf_toe|localisation.mtp1>turf_toe", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P27", cle: "sesamoide|p_sesamoides>sesamoide", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P28", cle: "charcot|diabete>charcot", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P29", cle: "charcot|rougeur_chaleur>charcot", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P30", cle: "synostose|prom_soustal|lim_raideur", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P31", cle: "os_navic|localisation.arche_med>os_navic", note: "OpenEvidence (24 nov. 2026) : données indirectes seulement (Kamel 2020, patients ayant tous un os naviculaire accessoire), non applicables" },
    { code: "PIED-P32", cle: "os_navic|p_os_navic>os_navic", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P33", cle: "iselin|localisation.lateral>iselin", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P34", cle: "sever|localisation.talon_post>sever", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "PIED-P35", cle: "sever|p_calc_comp>sever", note: "OpenEvidence (24 nov. 2026) : Perhamre 2013, Se 97 %, Sp 100 %, enfants malades contre témoins sans douleur (surestimé) ; la valeur actuelle est dans l'intervalle de confiance" },
  ];
  window.Locomoteur.definir({
    frequencesRevues: { date: "2026-11-24", source: "outils/locomoteur/sources/openevidence-reponses/2026-11-24-cheville-pied.md", verdict: "Aucune courbe confirmée ; rapports femmes-hommes et quelques fréquences corrigés là où des données publiées les contredisent" },
    revues: REVUES_OE,
    id: "pied", partie: "pied", en: "foot", rc: "Douleur au pied",
    titre: "Douleur au pied", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.pied || {}).sources,

    diagnostics: [
      { id: "fasciite", nom: "Fasciite plantaire (talalgie plantaire)", n: "fasciite plantaire", base: [[12, .02], [20, .06], [35, .15], [50, .2], [65, .15], [80, .1]],
        repere: "3,83/1 000 p-a en médecine générale, pic à 45–64 ans ; environ 10 % sur la vie ; 4,5–10 % des coureurs (A, C)" },
      { id: "hallux_valgus", nom: "Hallux valgus", n: "hallux valgus", base: [[12, .02], [25, .05], [45, .08], [65, .12], [80, .14]], sexe: { F: 1.46, M: .54 }, repere: "Rapport femmes-hommes publié de 2,3 à 3 pour 1 (l'estimation donnait 6 pour 1) (OpenEvidence, 24 nov. 2026)",
        repere: "23 % à 18–65 ans, 35,7 % après 65 ans (A, C)" },
      { id: "orteils", nom: "Déformation des orteils latéraux ou bunionette", n: "déformation des orteils latéraux", base: [[12, .005], [40, .03], [60, .08], [75, .12], [85, .14]], sexe: { F: 1.11, M: .89 }, repere: "Rapport femmes-hommes de 1 à 1,5 pour 1 selon l'âge (l'estimation donnait 2 pour 1) (OpenEvidence, 24 nov. 2026)",
        repere: "Orteils latéraux : 52,5–60 % après 65 ans ; bunionette 13,2 % (A, C)" },
      { id: "arthrose_mp", nom: "Arthrose du médio-pied", n: "arthrose du médio-pied", base: [[12, .001], [40, .01], [55, .04], [70, .06], [85, .07]],
        repere: "12 % après 50 ans dans une cohorte, 5 % dans une autre (A)" },
      { id: "hallux_rigidus", nom: "Hallux rigidus", n: "hallux rigidus", base: [[12, .005], [30, .02], [50, .05], [65, .06], [80, .05]],
        repere: "7,8 % symptomatique après 50 ans (A, C)" },
      { id: "metatarsalgie", nom: "Métatarsalgie ou lésion de la plaque plantaire", n: "métatarsalgie", base: [[12, .01], [30, .05], [50, .08], [70, .09], [85, .08]], sexe: { F: 1.5, M: .7 },
        repere: "13–36 % des adultes (donnée faible) (A, C)" },
      { id: "goutte", nom: "Goutte de la 1ʳᵉ métatarso-phalangienne (podagre)", n: "podagre", base: [[12, .0005], [30, .01], [45, .03], [60, .05], [80, .06]], sexe: { M: 2, F: .5 },
        repere: "1ʳᵉ métatarso-phalangienne atteinte chez 56–78 % des goutteux ; prévalence 3,4 % à 40–59 ans, 8,8 % après 60 ans (A, C)" },
      { id: "fracture", grave: true, nom: "Fracture du pied (métatarsiens, base du 5ᵉ, orteils)", n: "fracture du pied", base: [[12, .08], [18, .06], [35, .05], [55, .06], [75, .07]],
        repere: "Métatarsiens 67–75/100 000/an, dont 5ᵉ 59,6–68 % ; orteils : fracture du pied la plus fréquente de l'enfant ; 11,9 % des fractures à 20–64 ans (A, C)" },
      { id: "morton", nom: "Névrome de Morton", n: "névrome de Morton", base: [[12, .002], [25, .02], [45, .05], [65, .04], [80, .02]], sexe: { F: 1.27, M: .73 }, repere: "Rapport femmes-hommes de 1,7 pour 1 en médecine familiale (l'estimation donnait 2,5 pour 1) (OpenEvidence, 24 nov. 2026)",
        repere: "87,5 (femmes) et 50,2 (hommes)/100 000 (A)" },
      { id: "ff_mt", nom: "Fracture de stress métatarsienne (ou d'insuffisance)", n: "fracture de stress métatarsienne", base: [[12, .01], [18, .03], [30, .03], [50, .02], [70, .02]], sexe: { F: 1.6, M: .65 },
        repere: "37,9 % des fractures de stress NCAA ; insuffisance 3,1/1 000 femmes-années chez l'aînée (A, C)" },
      { id: "ff_navic", grave: true, nom: "Fracture de stress du naviculaire", n: "fracture de stress du naviculaire", base: [[12, .003], [18, .008], [25, .008], [40, .003], [60, .001]],
        repere: "26 des 180 fractures de stress chez le sportif (C)" },
      { id: "ff_calc", nom: "Fracture de stress du calcanéus", n: "fracture de stress du calcanéus", base: [[12, .002], [20, .005], [40, .004], [70, .006]], repere: "2,6 % des fractures de stress du sportif (C)" },
      { id: "lisfranc", grave: true, nom: "Lésion de Lisfranc (entorse ou fracture du médio-pied)", n: "lésion de Lisfranc", base: [[12, .005], [20, .01], [35, .01], [55, .008], [75, .005]],
        repere: "9,2–14/100 000 p-a ; entorse du médio-pied : 2ᵉ rang chez le sportif (A, C)" },
      { id: "turf_toe", nom: "Turf toe (entorse de la plaque plantaire de l'hallux)", n: "turf toe", base: [[12, .002], [20, .008], [30, .006], [45, .002]], repere: "0,040–0,062/1 000 expositions au football (A, C)" },
      { id: "sesamoide", nom: "Sésamoïdite ou fracture du sésamoïde", n: "sésamoïdite", base: [[12, .005], [20, .015], [35, .012], [55, .006]], repere: "1–3 % des fractures de stress (A, C)" },
      { id: "charcot", grave: true, nom: "Pied de Charcot (neuro-ostéoarthropathie)", n: "pied de Charcot", base: [[12, .0001], [40, .002], [60, .005], [80, .005]], repere: "0,56–0,79 % des diabétiques (A)" },
      { id: "synostose", nom: "Synostose (coalition) du tarse", n: "synostose du tarse", base: [[10, .01], [12, .012], [16, .008], [25, .002], [40, .0005]], repere: "Symptomatique : 3,5/100 000 enfants (A)" },
      { id: "os_navic", nom: "Os naviculaire accessoire douloureux", n: "os naviculaire accessoire douloureux", base: [[10, .03], [12, .04], [16, .02], [25, .005], [40, .001]], sexe: { F: 1.3, M: .8 },
        repere: "Présent chez 15,1 %, douloureux chez 20,8 % des porteurs (C)" },
      { id: "freiberg", nom: "Maladie de Freiberg", n: "maladie de Freiberg", base: [[11, .01], [14, .015], [17, .01], [25, .003], [40, .001]], sexe: { F: 1.67, M: .33 }, repere: "Adolescentes de 11–17 ans (A, C) · Environ 5 femmes pour 1 homme (l'estimation donnait 8,6 pour 1) (OpenEvidence, 24 nov. 2026)" },
      { id: "iselin", nom: "Maladie d'Iselin (apophysite de la base du 5ᵉ métatarsien)", n: "maladie d'Iselin", base: [[9, .005], [11, .006], [13, .004], [15, .0012], [18, .0003]], repere: "Pas d'incidence (A, C) · Beaucoup plus rare que la maladie de Sever (13 autres apophysites contre 601 Sever, cohorte danoise) : fréquence abaissée (OpenEvidence, 24 nov. 2026)" },
      { id: "sever", nom: "Maladie de Sever (apophysite calcanéenne)", n: "maladie de Sever", base: [[9, .15], [11, .12], [12, .08], [13, .05], [14, .02], [16, .003], [18, .0005]], sexe: { M: 1.4, F: .7 },
        repere: "10,7 % des diagnostics de surmenage chez l'enfant (C)" },
      { id: "contusion", nom: "Contusion ou écrasement du pied", n: "contusion du pied", base: [[12, .08], [18, .08], [35, .06], [60, .05], [80, .04]], repere: "1ᵉʳ rang des blessures du pied chez le sportif (NCAA) (C)" },
    ],
    residuel: { id: "nonspec", nom: "Douleur non spécifique (aucun diagnostic précis)", n: "douleur au pied non spécifique",
      explication: "Probabilité qu'aucun des diagnostics de la liste ne soit en cause : elle monte quand les éléments spécifiques sont absents ou négatifs. Penser aussi à une neuropathie, une radiculopathie S1 ou une artériopathie.",
      conduite: [{ t: "Rassurer ; chaussures adaptées ; dosage de la charge ; réévaluer si la douleur persiste ou change" },
        { t: "Revoir dans 4–6 sem ; radiographies en charge si la douleur persiste" }] },
    compatibles: [["hallux_valgus", "orteils"], ["hallux_valgus", "metatarsalgie"], ["orteils", "metatarsalgie"], ["metatarsalgie", "morton"], ["hallux_rigidus", "sesamoide"],
      ["arthrose_mp", "hallux_valgus"], ["goutte", "hallux_valgus"], ["fracture", "lisfranc"], ["fracture", "contusion"], ["ff_mt", "metatarsalgie"], ["os_navic", "synostose"],
      ["sever", "fasciite"], ["charcot", "fracture"], ["hallux_rigidus", "hallux_valgus"]],

    grappes: [
      { id: "ottawa_neg", dx: "fracture", nom: "Règles d'Ottawa du pied négatives", rv: .08, couvre: OTT, statut: "verifie", piste: `${BACHMANN} : RV− 0,08`, si: L => OTT.every(id => L.non(id)) },
      { id: "ottawa_pos", dx: "fracture", nom: "Règles d'Ottawa du pied positives (au moins un critère)", rv: 1.54, se: .994, sp: .353, couvre: OTT, statut: "verifie",
        piste: `${BACHMANN} : RV+ 1,54 (calculé)`, si: L => OTT.some(id => L.oui(id)) },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Pied atteint", "Droit", "Gauche", { hallux_valgus: 2, orteils: 2, fasciite: 1.3, metatarsalgie: 1.5, morton: .8, arthrose_mp: 1.5, hallux_rigidus: 1.5, synostose: 1.5,
          os_navic: 1.5, sever: 1.8, charcot: .8, goutte: .5, fracture: .1, lisfranc: .1, turf_toe: .1, contusion: .1, ff_mt: .4, ff_navic: .4, freiberg: .5 }, "Douleur aux deux pieds"),
        C.accompagne(), C.refere(),
        C.travail({ physique: { fasciite: 1.3, metatarsalgie: 1.2 }, debout: { fasciite: 1.5, metatarsalgie: 1.3, morton: 1.2 } }),
        C.travailPrecision(),
        C.sport({ aucun: { ff_mt: .4, ff_navic: .3, ff_calc: .4, turf_toe: .3, sesamoide: .5, lisfranc: .6 },
          course: { fasciite: 1.8, ff_mt: 2.5, ff_navic: 2, ff_calc: 2, sesamoide: 1.5, morton: 1.2 }, pivot: { lisfranc: 2, turf_toe: 2.5, fracture: 1.3, ff_navic: 2, sever: 1.5, iselin: 1.5 },
          contact: { lisfranc: 2, turf_toe: 2.5, contusion: 1.5 }, danse: { sesamoide: 2, ff_mt: 2, hallux_rigidus: 1.3, freiberg: 1.5 }, marche: { fasciite: 1.3, metatarsalgie: 1.1 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(),
        ouiNon("diabete", "Diabète ou neuropathie périphérique", { oui: "diabète ou neuropathie", nie: "diabète", effets: { charcot: p(30, .05), goutte: p(1.2, 1), ff_mt: p(1.3, .95) } }),
        ouiNon("entorses_rep", "Entorses de cheville à répétition", { oui: "entorses de cheville à répétition", non: "", effets: { synostose: p(2.5, .9) } }),
        C.atcdMedicaux(),
        ouiNon("obesite", "Obésité (IMC 30 ou plus)", { oui: "obésité", non: "", effets: { fasciite: p(1.8, .8), goutte: p(1.5, .9), arthrose_mp: p(1.3, .9), charcot: p(1.3, .95) } }),
        ouiNon("osteoporose", "Ostéoporose ou fracture de fragilité", { oui: "ostéoporose", non: "", effets: { ff_mt: p(2, .9), ff_calc: p(2, .9) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux(), C.atcdRhumato("goutte", 1, 1, { cristaux: "goutte" }),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ goutte: p(.5, 1.8), fasciite: p(1.2, .8) }), C.depuis(), C.contexte(),
          C.duree({ lt7: { fracture: 3, lisfranc: 2.5, turf_toe: 2.5, contusion: 3, goutte: 3, charcot: 1.5, fasciite: .3, hallux_valgus: .1, orteils: .1, arthrose_mp: .2, hallux_rigidus: .2,
              metatarsalgie: .3, morton: .3, synostose: .3, os_navic: .4, freiberg: .4, sever: .5, iselin: .5 },
            s1_6: { ff_mt: 1.5, ff_navic: 1.3, ff_calc: 1.5, sesamoide: 1.2, fracture: 1, contusion: .8, goutte: .6 },
            s6_12: { ff_navic: 1.3, fasciite: 1.3, sesamoide: 1.3, fracture: .3, contusion: .3, goutte: .4 },
            gt3m: { fasciite: 2, hallux_valgus: 3, orteils: 3, arthrose_mp: 3, hallux_rigidus: 3, metatarsalgie: 2, morton: 2, synostose: 2, os_navic: 1.5, freiberg: 1.5, charcot: 1.2,
              fracture: .05, lisfranc: .3, turf_toe: .3, contusion: .05, goutte: .4 } }),
          C.apparition({ subit_trauma: { fracture: 6, lisfranc: 5, turf_toe: 5, contusion: 6, sesamoide: 1.5, os_navic: 1.3, fasciite: .2, hallux_valgus: .1, orteils: .1, arthrose_mp: .2,
              hallux_rigidus: .3, metatarsalgie: .3, morton: .2, goutte: .2, ff_mt: .3, ff_navic: .3, ff_calc: .3, charcot: .5, synostose: .5, freiberg: .4, sever: .3, iselin: .5 },
            subit: { goutte: 6, ff_mt: 2, charcot: 2, fracture: .3, contusion: .2, lisfranc: .3 },
            graduel: { fasciite: 2.5, ff_mt: 3, ff_navic: 3, ff_calc: 3, sesamoide: 2, metatarsalgie: 2, morton: 2, sever: 2.5, iselin: 2, freiberg: 2, os_navic: 2, synostose: 1.5,
              fracture: .05, lisfranc: .2, turf_toe: .2, contusion: .05, goutte: .3 },
            insidieux: { hallux_valgus: 3, orteils: 3, arthrose_mp: 3, hallux_rigidus: 3, metatarsalgie: 2, morton: 2, fasciite: 2, charcot: 2, synostose: 1.5,
              fracture: .05, lisfranc: .2, turf_toe: .1, contusion: .05, goutte: .3 } }),
          choix("mecanisme", "Mécanisme", [
            o("ecrasement", "Écrasement ou objet tombé sur le pied", { fracture: 2.5, contusion: 3, lisfranc: 1.5 }, { n: "écrasement" }),
            o("torsion", "Torsion du pied en pointe (flexion plantaire)", { lisfranc: 4, fracture: 1.3, contusion: .7 }, { n: "torsion du pied en flexion plantaire" }),
            o("inversion", "Inversion (cheville tournée)", { fracture: 2, contusion: .8 }, { n: "inversion" }),
            o("hyperext", "Hyperextension du gros orteil", { turf_toe: 6, sesamoide: 2 }, { n: "hyperextension de l'hallux" }),
            o("orteil", "Orteil heurté (coup de pied dans un meuble)", { fracture: 3, contusion: 2 }, { n: "orteil heurté" }),
            o("chute", "Chute de hauteur sur les talons", { fracture: 1.5, contusion: 1.2 }, { n: "chute sur les talons" })],
            { si: trauma, masqueSi: "contexte" }),
          ouiNon("ecchymose_plantaire", "Ecchymose sous le médio-pied", { si: trauma, oui: "ecchymose plantaire", nie: "ecchymose plantaire", effets: { lisfranc: p(6, .6), fracture: p(1.5, .9) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("talon_plantaire", "Sous le talon", { fasciite: p(8, .1), ff_calc: p(2, .8), sever: p(1.5, .8) }, { n: "plantaire au talon" }),
            m("talon_post", "Arrière ou côtés du talon", { sever: p(5, .3), ff_calc: p(2, .8), fasciite: p(.5, 1.1) }, { n: "au talon postérieur" }),
            m("arche_med", "Arche médiale, saillie du naviculaire", { os_navic: p(6, .3), ff_navic: p(2, .8), synostose: p(1.5, .9), arthrose_mp: p(1.3, .9) }, { n: "à l'arche médiale" }),
            m("dos_medio", "Dos du médio-pied", { lisfranc: p(4, .4), arthrose_mp: p(3, .5), ff_navic: p(3, .6), contusion: p(1.5, .9), synostose: p(1.3, .9) }, { n: "au dos du médio-pied" }),
            m("avant_pied", "Sous les têtes des métatarsiens", { metatarsalgie: p(5, .3), freiberg: p(2, .8), ff_mt: p(2, .7), morton: p(1.5, .8) }, { n: "sous les têtes métatarsiennes" }),
            m("intermt", "Entre les orteils (3ᵉ ou 2ᵉ espace), irradiant aux orteils", { morton: p(8, .2), metatarsalgie: p(1.3, .9) }, { n: "entre les orteils" }),
            m("mtp1", "Gros orteil (1ʳᵉ métatarso-phalangienne)", { hallux_valgus: p(4, .3), hallux_rigidus: p(5, .3), goutte: p(6, .2), turf_toe: p(5, .3), sesamoide: p(4, .4) }, { n: "au gros orteil" }),
            m("orteils", "Petits orteils", { orteils: p(5, .4), fracture: p(1.5, .9), contusion: p(1.3, .9) }, { n: "aux petits orteils" }),
            m("lateral", "Bord latéral, base du 5ᵉ métatarsien", { fracture: p(2.5, .7), iselin: p(5, .4), orteils: p(1.3, .95) }, { n: "au bord latéral du pied" }),
            m("diaphyse", "Sur un métatarsien, point précis (dos du pied)", { ff_mt: p(6, .3), fracture: p(2, .8) }, { n: "point précis sur un métatarsien" }),
            m("diffuse", "Diffuse, pied enflé", { charcot: p(4, .6), goutte: p(1.5, .9), contusion: p(1.5, .9) }, { n: "diffuse" }),
          ], { gabarit: "douleur a/n {v}" }),
          C.type({ brulure: { morton: 3 }, choc: { morton: 3 }, pulsatile: { goutte: 1.5 }, sourde: { arthrose_mp: 1.3, ff_mt: 1.2 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("premiers_pas", "Douleur aux premiers pas du matin ou après le repos", { oui: "douleur aux premiers pas", nie: "douleur aux premiers pas",
            effets: { fasciite: p(4, .2), arthrose_mp: p(1.2, .95), sever: p(1.2, .9) } }),
          ouiNon("marche", "Pire à la marche ou debout", { g: "facteurs", agg: "la marche et la station debout", aggNie: "à la marche",
            effets: { fasciite: p(1.8, .5), metatarsalgie: p(1.8, .6), ff_mt: p(2, .6), arthrose_mp: p(1.8, .6), morton: p(1.5, .8), ff_navic: p(1.5, .8) } }),
          ouiNon("course_saut", "Pire à la course ou au saut", { g: "facteurs", agg: "la course ou les sauts", aggNie: "aux sauts",
            effets: { ff_mt: p(3, .4), ff_navic: p(3, .4), ff_calc: p(3, .5), sever: p(3, .4), sesamoide: p(2, .6), iselin: p(2, .6), fasciite: p(1.5, .8) } }),
          ouiNon("chaussures", "Pire dans des chaussures serrées, mieux en les retirant", { oui: "pire dans des chaussures serrées", nie: "aggravation par les chaussures",
            effets: { morton: { rvp: 3, rvn: .2, statut: "a_verifier", piste: "Cas opérés : chaussures serrées 86 %, soulagement en les retirant 81 % (spécificité non mesurée)" }, hallux_valgus: p(2, .7), orteils: p(2, .7), metatarsalgie: p(1.5, .8) } }),
          ouiNon("pointes", "Pire sur la pointe des pieds ou en poussant sur le gros orteil", { g: "facteurs", agg: "la poussée sur l'avant-pied", aggNie: "en poussée",
            effets: { hallux_rigidus: p(3, .4), turf_toe: p(3, .4), sesamoide: p(3, .4), metatarsalgie: p(1.5, .8), freiberg: p(1.5, .9) } }),
          C.attenuants(),
          C.moment({ matin: { fasciite: 2, arthrose_mp: 1.2 }, soir: { metatarsalgie: 1.3, ff_mt: 1.3, morton: 1.3 }, constante: { goutte: 1.5, charcot: 1.5 } }),
          C.nocturne({ goutte: p(2, .8), ff_mt: p(1.5, .9), charcot: p(1.3, 1), fasciite: p(.6, 1.1) }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("engourdissement", "Engourdissements ou brûlure dans les orteils", { oui: "engourdissements des orteils", nie: "engourdissement", effets: { morton: p(4, .4), charcot: p(1.5, .9) } }),
          ouiNon("enflure", "Enflure du pied", { oui: "enflure du pied", nie: "enflure", effets: { fracture: p(2, .5), lisfranc: p(2, .6), contusion: p(1.5, .7), goutte: p(3, .4), charcot: p(4, .3), ff_mt: p(1.8, .7),
            fasciite: p(.4, 1.1), morton: p(.5, 1.05), hallux_valgus: p(.6, 1.05) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", nie: "rougeur", g: "inflammation", effets: { goutte: p(8, .3), charcot: p(5, .6), fracture: p(.8, 1) } }),
          ouiNon("deformation_prog", "Déformation qui s'accentue", { oui: "déformation progressive", nie: "déformation", effets: { hallux_valgus: p(4, .5), orteils: p(4, .5), charcot: p(3, .9) } }),
          ouiNon("douleur_dos", "Lombalgie ou douleur qui descend du dos", { oui: "lombalgie", nie: "lombalgie" }),
          C.autresArticulations({ goutte: p(1.5, .9) }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ goutte: p(1.4, .95) }), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("plaie", "Plaie ou ulcère du pied", {}, { n: "plaie au pied" })]),
          ouiNon("pied_froid", "Pied froid ou pâle, ou claudication", { oui: "pied froid ou claudication", nie: "claudication", drapeau: true }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        C.fonctionnel({ boiterie: { fracture: 1.5, lisfranc: 1.5, ff_mt: 1.5, goutte: 1.5, fasciite: 1.2 }, appui: { fracture: 2.5, lisfranc: 2.5, goutte: 2 }, demarche_normale: { fracture: .5, lisfranc: .5 },
          plat: { arthrose_mp: 1.5, os_navic: 1.5, synostose: 2, metatarsalgie: 1.2 }, creux: { metatarsalgie: 1.5, fasciite: 1.2 }, talons: { sever: 1.5, hallux_rigidus: 1.5, fasciite: 1.3 },
          saut_uni: { ff_mt: 2, ff_navic: 2, ff_calc: 2, sever: 2, sesamoide: 1.5 } },
          { garder: ["arches", "demarche", "talons_pointes", "appui_uni", "saut_uni"] }),
        { titre: "Inspection", sep: ", ", toutNormal: true, questions: [
          ouiNon("ex_hallux_valgus", "Hallux valgus visible", { oui: "hallux valgus", non: "pas d'hallux valgus", effets: { hallux_valgus: p(10, .1) } }),
          ouiNon("ex_orteils", "Orteils en griffe, en marteau ou bunionette", { oui: "orteils en griffe ou en marteau", non: "", horsNormal: true, effets: { orteils: p(8, .2), metatarsalgie: p(1.5, .9) } }),
          ouiNon("ex_oedeme", "Œdème dorsal", { oui: "œdème dorsal", non: "pas d'œdème", effets: { fracture: p(2, .5), lisfranc: p(2, .6), contusion: p(1.5, .8), ff_mt: p(2, .7), charcot: p(3, .6) } }),
          ouiNon("ex_ecchymose_plantaire", "Ecchymose plantaire du médio-pied", { oui: "ecchymose plantaire", non: "", horsNormal: true, effets: { lisfranc: p(6, .7) } }),
          ouiNon("ex_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", non: "pas de rougeur", g: "inflammation", effets: { goutte: p(8, .3), charcot: p(5, .6) } }),
          ouiNon("ex_callosites", "Callosités plantaires", { oui: "callosités plantaires", non: "", horsNormal: true, effets: { metatarsalgie: p(3, .7), hallux_valgus: p(1.3, .95) } }),
          ouiNon("ex_plaie", "Plaie ou ulcère", { oui: "plaie", non: "" , horsNormal: true }),
        ] },
        { titre: "Palpation", res: PALP, toutNormal: true, labels: ["Douloureux", "Indolore"], questions: [
          ouiNon("p_calc_med", "Tubercule calcanéen médial (insertion du fascia)", { court: "tubercule calcanéen médial", effets: { fasciite: p(4, .2), ff_calc: p(1.3, .95) } }),
          ouiNon("p_calc_comp", "Calcanéus en compression latérale", { court: "calcanéus en compression", effets: { ff_calc: p(5, .4), sever: p(5, .3), fasciite: p(.8, 1) } }),
          ouiNon("p_5mt", "Base du 5ᵉ métatarsien", { court: "base du 5ᵉ métatarsien", genre: "f", effets: { fracture: p(2, .8), iselin: p(4, .3) } }),
          ouiNon("p_navic", "Naviculaire (face dorsale, point « N »)", { court: "naviculaire", effets: { fracture: p(1.5, .95), ff_navic: { rvp: 4, rvn: .3, statut: "a_verifier", piste: "Modica et coll., 2026, Sports Health : point « N » chez jusqu'à 81 % des fractures de stress du naviculaire" }, os_navic: p(1.5, .9) } }),
          ouiNon("p_os_navic", "Tubérosité médiale du naviculaire", { court: "tubérosité médiale du naviculaire", genre: "f", effets: { os_navic: p(6, .3) } }),
          ouiNon("p_lisfranc", "Base du 2ᵉ métatarsien (articulation de Lisfranc)", { court: "articulation de Lisfranc", genre: "f", effets: { lisfranc: p(5, .2), arthrose_mp: p(2, .7), contusion: p(1.3, .9) } }),
          ouiNon("p_diaphyse", "Diaphyse d'un métatarsien", { court: "diaphyse métatarsienne", genre: "f", effets: { ff_mt: p(6, .3), fracture: p(2, .7) } }),
          ouiNon("p_tetes", "Têtes métatarsiennes (plante)", { court: "têtes métatarsiennes", genre: "fp", effets: { metatarsalgie: p(4, .3), freiberg: p(3, .6), ff_mt: p(1.3, .9) } }),
          ouiNon("p_intermt", "Espace intermétatarsien (pincement pouce-index)", { court: "espace intermétatarsien",
            effets: { morton: { rvp: 3, rvn: .1, statut: "a_verifier", piste: `${MAHADEVAN} : Se 96 %, spécificité non estimable ; RV− fixé à 0,1` } } }),
          ouiNon("p_mtp1", "1ʳᵉ métatarso-phalangienne", { court: "1ʳᵉ métatarso-phalangienne", genre: "f", effets: { hallux_rigidus: p(3, .5), goutte: p(4, .3), turf_toe: p(4, .4), hallux_valgus: p(2, .6) } }),
          ouiNon("p_sesamoides", "Sésamoïdes (sous la 1ʳᵉ tête)", { court: "sésamoïdes", genre: "mp", effets: { sesamoide: p(6, .3), turf_toe: p(2, .7) } }),
          ouiNon("p_orteils", "Orteils", { court: "orteils", genre: "mp", effets: { fracture: p(2, .7), orteils: p(2, .8), contusion: p(1.5, .9) } }),
        ] },
        { titre: "Mobilité", toutNormal: true, questions: [
          C.amplitude("prom_mtp1", "Extension passive de l'hallux", "extension de l'hallux", { complete: { hallux_rigidus: .3 }, fin: { hallux_rigidus: 1.5, turf_toe: 1.5, sesamoide: 1.5 },
            lim_douleur: { hallux_rigidus: 4, turf_toe: 2, goutte: 1.5 }, lim_raideur: { hallux_rigidus: 6 } }),
          C.degres("prom_mtp1", "Extension de l'hallux mesurée"),
          C.amplitude("prom_mtp1_flex", "Flexion passive de l'hallux", "flexion de l'hallux"),
          C.amplitude("prom_soustal", "Sous-talienne (inversion-éversion du talon)", "mobilité sous-talienne", { complete: { synostose: .3 }, lim_douleur: { synostose: 3, arthrose_mp: 1.5 }, lim_raideur: { synostose: 5, arthrose_mp: 1.5 } }),
          C.amplitude("prom_medio", "Médio-pied (pronation-supination de l'avant-pied)", "mobilité du médio-pied", { lim_douleur: { lisfranc: 2, arthrose_mp: 2 }, lim_raideur: { arthrose_mp: 2.5 } }),
        ] },
        { titre: "Tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("windlass", "Windlass en charge", { court: "Windlass", effets: { fasciite: ver(.318, 1, `${DEGARCEAU} : Se 31,8 %, Sp 100 % (plafonnée à 99 %)`) } }),
          ouiNon("mulder", "Clic de Mulder", { court: "clic de Mulder", horsNormal: true, effets: { morton: { rvp: 4, rvn: .6, statut: "a_verifier", piste: `${MAHADEVAN} : Se 61 %, spécificité non rapportée` } } }),
          ouiNon("tiroir_mtp", "Tiroir de la 2ᵉ métatarso-phalangienne (plaque plantaire)", { court: "tiroir de la 2ᵉ métatarso-phalangienne", horsNormal: true, effets: { metatarsalgie: p(3, .7), freiberg: p(1.5, .95) } }),
          ouiNon("stress_lisfranc", "Stress du médio-pied (abduction-pronation, pointe unipodale)", { court: "stress du médio-pied", horsNormal: true, effets: { lisfranc: p(5, .4), arthrose_mp: p(1.5, .9) } }),
          ouiNon("paper_grip", "Paper grip test (hallux)", { court: "paper grip test", horsNormal: true, info: "Le patient retient une carte sous l'hallux pendant qu'on la tire : faiblesse des fléchisseurs des orteils (Se 80 %, Sp 79 % ; Menz 2006). Pour la note : aucun diagnostic du calcul n'en dépend." }),
        ] },
        { titre: "Règles d'Ottawa du pied", si: L => L.trauma() && (!L.repondu("duree") || L.v("duree") === "lt7"), ligne: "Ottawa",
          aide: "Traumatisme récent avec douleur du médio-pied : radiographie du pied si un critère. Les réponses de la palpation se recopient ici.",
          questions: [
            ouiNon("ott_4pas", "Incapable de faire 4 pas, immédiatement après la blessure et à l'examen", { oui: "incapable de faire 4 pas", non: "4 pas possibles" }),
            miroir("ott_5mt", "p_5mt", "Base du 5ᵉ métatarsien"), miroir("ott_navic", "p_navic", "Naviculaire"),
          ] },
        { fin: true, questions: C.controlateral() },
        { titre: "Cheville", adjacent: "cheville", toutNormal: true, questions: [
          choix("cheville_mob", "Cheville : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation de la cheville indolore" }), o("douleur", "Douloureuse", {}, { n: "mobilisation de la cheville douloureuse" })]),
        ] },
        { titre: "Neurovasculaire", adjacent: "neurovasculaire", sansCote: true, toutNormal: true, questions: [
          ouiNon("pouls_dim", "Pouls pédieux ou tibial postérieur diminués", { oui: "pouls diminués", non: "pouls pédieux et tibial postérieur normaux" }),
          ouiNon("monofilament", "Monofilament 5,07 non perçu", { oui: "monofilament non perçu", non: "monofilament perçu",
            effets: { charcot: { rvp: 13, rvn: .3, statut: "verifie", piste: `${KANJI} : neuropathie des grosses fibres, RV+ 11–16, RV− 0,09–0,54` } } }),
          ouiNon("deficit_s1", "Déficit de force, de sensibilité ou de réflexe S1", { oui: "déficit S1", non: "force, sensibilité et réflexes S1 normaux" }),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      C.regles.septique("un pied", ["rougeur_chaleur", "ex_chaleur"], [["enflure", ["oui"]]]),
      L => {
        if (!L.trauma() || (L.repondu("duree") && L.v("duree") !== "lt7")) return null;
        if (OTT.some(id => L.oui(id))) return { niveau: "rapide", titre: "Radiographie du pied indiquée (règles d'Ottawa)", ro: "fracture",
          texte: `Critère : ${[L.oui("ott_4pas") && "incapable de faire 4 pas", L.oui("p_5mt") && "base du 5ᵉ métatarsien", L.oui("p_navic") && "naviculaire"].filter(Boolean).join(", ")}. Règles : Se 99,4 %, Sp 35,3 %.`,
          conduite: [{ t: "Radiographies du pied (face, profil, oblique)", src: BACHMANN }, ...items(10), ...items(11)] };
        if (OTT.every(id => L.repondu(id))) return { niveau: "info", titre: "Règles d'Ottawa du pied négatives", texte: "Aucun critère : la radiographie n'est pas nécessaire pour éliminer une fracture du médio-pied (RV− 0,08). Elles ne couvrent pas les orteils ni le Lisfranc." };
        return { niveau: "info", titre: "Règles d'Ottawa du pied à compléter", texte: "Traumatisme récent : 4 pas, base du 5ᵉ métatarsien, naviculaire." };
      },
      L => (L.trauma() && (L.oui("ecchymose_plantaire") || L.oui("ex_ecchymose_plantaire") || L.oui("stress_lisfranc") || (L.oui("p_lisfranc") && L.v("mecanisme") === "torsion")))
        ? { niveau: "rapide", titre: "Lésion de Lisfranc à éliminer", ro: "lésion de Lisfranc", texte: "Ecchymose plantaire, douleur à la base du 2ᵉ métatarsien ou stress du médio-pied douloureux : lésion souvent manquée.", conduite: items(17) } : null,
      L => (L.oui("diabete") && (L.oui("rougeur_chaleur") || L.oui("ex_chaleur")) && (L.oui("enflure") || L.oui("ex_oedeme")))
        ? { niveau: "urgence", titre: "Pied de Charcot ou infection du pied diabétique à éliminer", ro: "pied de Charcot", texte: "Diabète ou neuropathie avec un pied chaud, rouge et enflé.",
          conduite: [...items(21), { t: "Plaie, fièvre ou ulcère : infection du pied diabétique, évaluation le jour même" }] } : null,
      L => (L.a("risque_infection", "plaie") && (L.oui("fievre") || L.oui("rougeur_chaleur") || L.oui("ex_chaleur")))
        ? { niveau: "urgence", titre: "Infection du pied à éliminer", ro: "infection du pied", texte: "Plaie avec fièvre, rougeur ou chaleur.", conduite: [{ t: "Évaluation le jour même : sonde osseuse, radiographies, prélèvements, antibiotiques selon la gravité" }] } : null,
      L => (L.oui("p_navic") && !L.trauma() && (L.oui("course_saut") || L.a("localisation", "dos_medio")))
        ? { niveau: "rapide", titre: "Fracture de stress du naviculaire à éliminer", ro: "fracture de stress du naviculaire", texte: "Douleur au point « N » chez un sportif : fracture de stress à haut risque, souvent manquée à la radiographie.", conduite: items(15) } : null,
      L => (L.trauma() && L.v("mecanisme") === "chute")
        ? { niveau: "rapide", titre: "Fracture du calcanéus à éliminer", ro: "fracture du calcanéus", texte: "Chute de hauteur sur les talons : chercher aussi une fracture du rachis lombaire.", conduite: items(18) } : null,
      L => L.oui("pied_froid") || L.oui("pouls_dim")
        ? { niveau: "rapide", titre: "Artériopathie ou atteinte vasculaire à éliminer", ro: "artériopathie", texte: "Pied froid, claudication ou pouls diminués (pouls tibial postérieur anormal : RV+ 8,1 ; claudication : RV+ 3,3).",
          conduite: [{ t: "Indice de pression systolique cheville-bras ; après un traumatisme, évaluation vasculaire urgente", src: "Khan et coll., 2006, JAMA (examen clinique rationnel)" }] } : null,
      L => (L.oui("deficit_s1") || (L.oui("douleur_dos") && L.oui("engourdissement")))
        ? { niveau: "considerer", titre: "Radiculopathie S1 ou neuropathie à considérer", ro: "radiculopathie S1", texte: "Signes neurologiques ou douleur qui descend du dos.", conduite: [{ t: "Examen lombaire et neurologique complet ; monofilament et vibration si diabète" }] } : null,
      C.regles.tumeur("Radiographie du pied."),
    ],
  });
})();
