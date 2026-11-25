/* Locomoteur Morand, rachis lombaire et sacro-iliaques (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles, conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), parties A à H.
   « Lombalgie non spécifique » tient lieu de douleur non spécifique : pas de reste calculé dans cette région.
   Même format que le genou : p() provisoire, est() à vérifier, ver()/verRv() vérifié avec sa source. */
(function () {
  "use strict";
  const { p, lit, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const trauma = L => L.trauma(), PALP = "palp", TEST = "test";
  const SURI = "Suri et coll., 2010, JAMA (examen clinique rationnel, sténose)", PETERSEN = "Petersen et coll., 2017, BMC Musculoskelet Disord (revue)";
  const COCHRANE_SLR = "van der Windt et coll., 2010, Cochrane (PMID 20166095)", SURI11 = "Suri et coll., 2011, Spine (PMID 20543768)";
  const CHOU = "Chou et coll., 2007, Ann Intern Med", HENSCHKE = "Henschke et coll., 2007, Eur Spine J (PMID 17566791)", COCHRANE_FX = "Williams et coll., 2023, Cochrane (fracture vertébrale)";
  const SHAW = "Shaw et coll., 2020, Eur Spine J", RUDWALEIT = "Rudwaleit et coll., 2006, Arthritis Rheum (critères de Berlin)", JOVEN = "Joven et coll., 2017, Arthritis Care Res";
  const LASLETT = "Laslett et coll., 2005, Man Ther (PMID 16038856) ; Petersen 2017", VROOMEN = "Vroomen et coll., 2002, J Neurol Neurosurg Psychiatry (PMID 11971050)";
  const VERWOERD = "Verwoerd et coll., 2016, Eur Spine J", KASAI = "Kasai et coll., 2006, Phys Ther (PMID 17033040)", LASLETT_C = "Laslett et coll., 2005, Spine J (PMID 15996606)";
  const SI = ["si_distraction", "si_compression", "si_thigh", "si_gaenslen", "si_sacral"];

  const ANGLAIS = { commune: "non-specific low back pain", musculaire: "lumbar muscle strain or spasm", discogenique: "discogenic low back pain", facettaire: "lumbar facet joint pain",
    grossesse: "pregnancy-related low back and pelvic girdle pain", stenose: "lumbar spinal stenosis", si: "sacroiliac joint pain", hernie: "lumbar disc herniation with radiculopathy",
    spondylolisthesis: "degenerative spondylolisthesis", fracture_osteo: "osteoporotic vertebral fracture", spondylolyse: "spondylolysis or isthmic spondylolisthesis",
    scoliose: "adult degenerative scoliosis", spa: "axial spondyloarthritis", cancer: "spinal malignancy", infection: "spondylodiscitis or epidural abscess", queue: "cauda equina syndrome" };

  const CONDUITES = C.aideMemoire("lombaire", { commune: 1, musculaire: 2, discogenique: 3, facettaire: 4, grossesse: 5, stenose: 6, si: 7, hernie: 8, spondylolisthesis: 9,
    fracture_osteo: [10, 16], spondylolyse: 11, scoliose: 12, spa: 13, cancer: 18, infection: 19, queue: 20 });
  const items = ref => C.aideMemoire("lombaire", { x: ref }).x;
  const MESURES = [...C.mesuresAideMemoire("lombaire"),
    { titre: "Pour tous", items: [{ t: "Enseignement : rester actif, pronostic habituellement favorable, éviter le repos au lit" },
      { t: "Consignes de reconsultation : engourdissement en selle, trouble urinaire ou fécal, faiblesse progressive, fièvre, douleur nocturne croissante" }] }];

  const INFOS = {
    scoliose_vue: { info: "Test d'Adams : penché vers l'avant, on cherche une gibbosité (bosse costale ou lombaire) d'un côté. Se 84,4 %, Sp 95,2 % (RV+ 17,6), mais chez l'adolescent ; concordance médiocre en lombaire chez l'adulte.", video: "Adams forward bend test" },
    p_symphyse: { info: "Grossesse ou post-partum : symphyse pubienne douloureuse à la palpation. Douleur de ceinture pelvienne : Se 81 %, Sp 99 % (chiffres de seconde main, à confirmer)." },
    trendelenburg_mod: { info: "Debout sur une jambe, l'autre hanche et le genou fléchis à 90°. Positif : douleur à la symphyse ou à la sacro-iliaque. Douleur de ceinture pelvienne : Se 60 %, Sp 97 % (chiffres de seconde main ; geste à confirmer)." },
    jambe_dos: { info: "Douleur de jambe plus forte que la douleur lombaire : élément du modèle de Vroomen pour la compression radiculaire (avec dermatome, toux et douleur paroxystique : Se 72 %, Sp 80 %) et du cluster de Cook (sténose)." },
    toux_jambe: { info: "Toux ou éternuement aggravant seulement la jambe : RV+ 1,74 pour la compression radiculaire (IRM, n = 395) ; aggravant le dos ou la jambe : RV ≈ 1, sans valeur." },
    assis_sans_douleur: { info: "Pas de douleur en position assise : RV+ 7,4 pour la sténose lombaire (Se 47 %, Sp 94 % ; Suri 2010)." },
    penche_avant: { info: "Amélioration penché vers l'avant (chariot, montée) : RV+ 6,4 pour la sténose." },
    claudication: { info: "Claudication neurogène (douleur des jambes à la marche ou debout, soulagée assis ou penché) : RV+ 3,7 ; son absence rend la sténose peu probable (RV− 0,23)." },
    amelioration_exercice: { info: "Critères de Berlin de la lombalgie inflammatoire : raideur matinale de plus de 30 min, amélioration à l'exercice et non au repos, réveil en 2ᵉ partie de nuit, fessalgie à bascule. 2 sur 4 : RV+ 3,7 ; 3 sur 4 : RV+ 12,4 ; aucun : RV− 0,25 (Rudwaleit 2006). En rhumatologie, la valeur tombe beaucoup." },
    fessalgie: { info: "Fessalgie à bascule (alternant d'un côté à l'autre) : RV+ 2,87 pour la spondyloarthrite débutante." },
    ains_reponse: { info: "Bonne réponse aux AINS en 48 h : RV+ 1,61 pour la spondyloarthrite axiale." },
    pas_mieux_1mois: { info: "Pas d'amélioration après 1 mois de traitement : RV+ 3,0 pour un cancer rachidien (Chou 2007)." },
    selle: { info: "Anesthésie en selle : RV+ 11 pour une pathologie rachidienne grave (urgence) ; rétention urinaire aiguë : RV+ 6,4 (Se 90 %) pour la queue de cheval." },
    grossesse: { info: "Lombalgie chez 50–70 % des grossesses ; douleur de ceinture pelvienne chez 10–65 %." },
    base_elargie: { info: "Marche à base élargie : RV+ 13 pour la sténose lombaire (Se 42 %, Sp 97 % ; Suri 2010). Romberg anormal : RV+ 4,2." },
    sill: { info: "Décroché palpable ou visible entre deux épineuses lombaires basses : spondylolisthésis (« sill sign » : Se 81 %, Sp 89 %, RV+ 7,4 ; RV− 0,21)." },
    schober: { info: "Test de Schober : peu utile pour la spondyloarthrite axiale (RV+ 1,3)." },
    reflexe_rot: { info: "Réflexe rotulien diminué : RV+ 7,7 pour une atteinte L4 (IRM)." },
    reflexe_ach: { info: "Réflexe achilléen diminué ou absent : RV+ 7,1 pour une atteinte L5–S1 ; dans la sténose, RV+ 2,1." },
    faiblesse_ehl: { info: "Faiblesse de l'extenseur de l'hallux : RV+ 4,4 pour une atteinte L5 (IRM)." },
    faiblesse_df: { info: "Faiblesse de la dorsiflexion de la cheville : RV+ 5,4 pour une hernie L4 (chirurgie)." },
    lasegue: { info: "Lasègue (élévation de la jambe tendue) : Se 92 %, Sp 28 % (populations chirurgicales) : négatif, il rend la hernie radiculaire peu probable.", positif: "douleur radiculaire sous le genou entre 30° et 70°", video: "Straight leg raise test" },
    lasegue_croise: { info: "Douleur reproduite dans la jambe atteinte en levant l'autre : Se 28 %, Sp 90 % : positif, il oriente fortement.", positif: "douleur dans la jambe atteinte", video: "Crossed straight leg raise" },
    slump: { info: "Assis, flexion du tronc et du cou, extension du genou et dorsiflexion. Hernie discale : Se 84 %, Sp 83 % (RV+ 4,9 ; RV− 0,19 ; cas-témoins).", positif: "douleur radiculaire soulagée par l'extension du cou", video: "Slump test" },
    femoral: { info: "Sur le ventre, flexion du genou (± extension de la hanche) : atteinte radiculaire L2–L4, RV+ 5,7 pour L3.", positif: "douleur à la face antérieure de la cuisse", video: "Femoral nerve tension test" },
    ext_passive: { info: "Sur le ventre, élévation passive des deux jambes tendues d'environ 30 cm. Instabilité radiologique : Se 84 %, Sp 90 % (RV+ 8,8 ; RV− 0,18 ; Kasai 2006).", positif: "douleur lombaire forte qui disparaît en redescendant les jambes", video: "Passive lumbar extension test" },
    centralisation: { info: "Douleur qui se rapproche de la ligne médiane avec des mouvements répétés : RV+ 6,9 pour une douleur discogénique (Laslett 2005).", video: "Centralization phenomenon McKenzie" },
    hyperext_uni: { info: "Hyperextension sur une jambe (stork test) : Se 50–55 % pour une spondylolyse active, peu spécifique.", video: "Stork test spondylolysis" },
    si_distraction: { info: "Grappe de Laslett (sacro-iliaque) : distraction, compression, thigh thrust, Gaenslen, sacral thrust. 3 sur 5 ou plus : RV+ 4,2 (7,0 sans centralisation) ; moins de 3 : RV− 0,12. Un test isolé ne vaut presque rien.", video: "SIJ distraction test" },
  };

  // Grappes : critères de Berlin, Laslett, cluster de Cook.
  const berlin = L => [L.v("raideur") === "plus30", L.oui("amelioration_exercice"), L.oui("reveils"), L.oui("fessalgie")];
  const berlinEvalues = L => ["raideur", "amelioration_exercice", "reveils", "fessalgie"].filter(id => L.repondu(id)).length;
  const laslett = L => SI.filter(id => L.oui(id)).length, laslettEvalues = L => SI.filter(id => L.repondu(id)).length;
  const cook = L => [L.age !== null && L.age > 48, L.v("cote") === "B", L.oui("jambe_dos"), L.oui("claudication"), L.oui("assis_sans_douleur") || L.oui("penche_avant")];

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "LOMB-P1", cle: "fracture_osteo|fluoro_cortico>fracture_osteo", rvp: 2.5, rvn: 0.88, statut: "verifie", piste: "Enthoven et coll., 2016 (Phys Ther, PMID 26183589), médecine familiale, plus de 55 ans : corticothérapie prolongée, Se 18 %, Sp 93 % ; fluoroquinolone : aucune donnée" },
    { code: "LOMB-P2", cle: "fracture_osteo|mecanisme|chute", rv: {"chute": 6.2}, statut: "verifie", piste: "Enthoven et coll., 2016 (Phys Ther, PMID 26183589), médecine familiale, plus de 55 ans : traumatisme, Se 21 %, Sp 97 %, RV+ 6,2" },
    { code: "LOMB-P3", cle: "spondylolyse|hyperext_uni>spondylolyse", note: "OpenEvidence (24 nov. 2026) : Se 50 à 55 % (Masci 2006) ; spécificité non établie" },
    { code: "LOMB-P4", cle: "infection|fievre>infection", note: "OpenEvidence (24 nov. 2026) : fièvre mesurée, Se 52 %, Sp 98 % (sources mixtes, Deyo 1992) ; « fièvre ou frissons » non étudiée" },
  ];
  window.Locomoteur.definir({
    frequencesRevues: { date: "2026-11-24", source: "outils/locomoteur/sources/openevidence-reponses/2026-11-24-genou-hanche-lombaire.md", verdict: "Aucune courbe confirmée ; rapports femmes-hommes et quelques fréquences corrigés là où des données publiées les contredisent" },
    revues: REVUES_OE,
    id: "lombaire", partie: "lombaire", partieExamen: "rachis lombaire", en: "low back", rc: "Lombalgie",
    titre: "Lombalgie, avec ou sans irradiation", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,
    sourcesConduite: (window.Locomoteur.aideMemoire.lombaire || {}).sources,

    diagnostics: [
      { id: "commune", nom: "Lombalgie non spécifique (mécanique)", n: "lombalgie non spécifique", base: [[12, .5], [30, .55], [50, .5], [70, .35], [85, .3]],
        repere: "Plus de 85 % des lombalgies en soins primaires ; 18 % des adolescents ; plus de 80 % sans diagnostic à 1 an chez l'enfant (A, C)" },
      { id: "musculaire", nom: "Contracture ou lésion musculaire lombaire", n: "contracture lombaire", base: [[12, .08], [18, .12], [30, .08], [50, .04], [70, .02]],
        repere: "Spasme 31 % et lésion musculaire paralombaire 19 % des atteintes lombaires NCAA (A, C)" },
      { id: "discogenique", nom: "Discopathie dégénérative ou douleur discogénique", n: "douleur discogénique", base: [[12, .02], [25, .06], [40, .08], [60, .07], [80, .05]],
        repere: "Dégénérescence asymptomatique 37 % à 20 ans, 96 % à 80 ans (A)" },
      { id: "facettaire", nom: "Syndrome facettaire lombaire", n: "syndrome facettaire", base: [[12, .01], [30, .04], [50, .1], [70, .12], [85, .12]],
        repere: "16–45 % des lombalgies chroniques (centres spécialisés) ; arthrose facettaire au scanner sans lien avec la douleur (A, C)" },
      { id: "grossesse", nom: "Lombalgie ou douleur pelvienne de la grossesse", n: "lombalgie de grossesse", base: [[12, .001], [20, .004], [30, .006], [40, .003], [50, .0003]], sexe: { F: 1, M: .001 },
        repere: "Lombalgie chez 50–70 % des grossesses ; ceinture pelvienne 10–65 % (A)" },
      { id: "stenose", nom: "Sténose spinale lombaire", n: "sténose spinale lombaire", base: [[12, .0005], [40, .01], [55, .06], [70, .18], [85, .22]],
        repere: "11 % de la population générale, 25 % en soins primaires (âge moyen 69 ans) (A, C)" },
      { id: "si", nom: "Douleur sacro-iliaque", n: "douleur sacro-iliaque", base: [[12, .01], [25, .05], [45, .07], [65, .05], [85, .04]], sexe: { F: 1.3, M: .8 },
        repere: "15–30 % des lombalgies chroniques non radiculaires (A)" },
      { id: "hernie", nom: "Hernie discale avec radiculopathie (sciatique, cruralgie)", n: "hernie discale avec radiculopathie", base: [[12, .01], [20, .03], [35, .05], [50, .05], [70, .03]],
        repere: "4 % des lombalgies en soins primaires ; 1,3 % chez l'enfant (A, C)" },
      { id: "spondylolisthesis", nom: "Spondylolisthésis dégénératif", n: "spondylolisthésis dégénératif", base: [[12, .001], [45, .01], [60, .04], [75, .06]], sexe: { F: 1.33, M: .67 }, repere: "Rapport femmes-hommes publié de 1,3 à 3 pour 1 (l'estimation donnait 6,25 pour 1) (OpenEvidence, 24 nov. 2026)",
        repere: "8,4 % des femmes, 2,7 % des hommes (A, C)" },
      { id: "fracture_osteo", grave: true, nom: "Fracture vertébrale ostéoporotique (ou d'insuffisance du sacrum)", n: "fracture vertébrale ostéoporotique", base: [[12, .0005], [50, .005], [65, .02], [75, .05], [90, .09]],
        sexe: { F: 2, M: .5 }, repere: "4 % des lombalgies en soins primaires ; seules 20,7 % sont reconnues (A, C)" },
      { id: "spondylolyse", nom: "Spondylolyse ou spondylolisthésis isthmique", n: "spondylolyse", base: [[12, .06], [15, .08], [18, .06], [25, .02], [40, .01]], sexe: { M: 1.47, F: .53 }, repere: "Adolescents symptomatiques : 2,2 à 3,5 garçons pour 1 fille (l'estimation donnait 1,6 pour 1) (OpenEvidence, 24 nov. 2026)",
        repere: "47 % des adolescents sportifs lombalgiques (41,7 %) ; 5 % des adultes (A, C)" },
      { id: "scoliose", nom: "Scoliose dégénérative de l'adulte", n: "scoliose dégénérative", base: [[12, .001], [45, .02], [60, .08], [75, .12], [85, .12]], repere: "38 % à 40–90 ans (poolé) (A) · Seule série en lombalgie : 2 % avant 45 ans, 15 % après 60 ans (l'estimation donnait 1 à 4 %) : fréquence relevée (OpenEvidence, 24 nov. 2026)" },
      { id: "spa", nom: "Spondyloarthrite axiale", n: "spondyloarthrite axiale", base: [[12, .005], [20, .025], [30, .035], [45, .025], [60, .008]], repere: "Pas de prédominance masculine en lombalgie chronique de première ligne : multiplicateur retiré (OpenEvidence, 24 nov. 2026)",
        repere: "Environ 5 % des lombalgies chroniques en médecine générale (0,3–24 %) (A, C)" },
      { id: "cancer", grave: true, nom: "Cancer ou métastase rachidienne", n: "atteinte néoplasique rachidienne", base: [[12, .0005], [40, .002], [60, .007], [80, .01]], repere: "0,7 % des lombalgies en soins primaires (A)" },
      { id: "infection", grave: true, nom: "Spondylodiscite ou abcès épidural", n: "spondylodiscite", base: [[12, .0001], [50, .0002], [80, .0005]], repere: "0,01 % des lombalgies en soins primaires (A)" },
      { id: "queue", grave: true, nom: "Syndrome de la queue de cheval", n: "syndrome de la queue de cheval", base: [[12, .0002], [30, .0006], [60, .0006]], repere: "0,04–0,08 % des lombalgies en soins primaires (A)" },
    ],
    compatibles: [["hernie", "discogenique"], ["stenose", "spondylolisthesis"], ["stenose", "facettaire"], ["stenose", "scoliose"], ["facettaire", "spondylolisthesis"], ["spa", "si"],
      ["fracture_osteo", "cancer"], ["cancer", "queue"], ["infection", "queue"], ["hernie", "queue"], ["hernie", "stenose"], ["grossesse", "si"], ["spondylolyse", "musculaire"]],

    grappes: [
      { id: "berlin3", dx: "spa", nom: "Critères de Berlin : 3 sur 4 ou plus", rv: 12.4, couvre: ["raideur", "amelioration_exercice", "reveils", "fessalgie"], statut: "verifie",
        piste: `${RUDWALEIT} : RV+ 12,4`, si: L => berlin(L).filter(Boolean).length >= 3 },
      { id: "berlin2", dx: "spa", nom: "Critères de Berlin : 2 sur 4", rv: 3.7, couvre: ["raideur", "amelioration_exercice", "reveils", "fessalgie"], statut: "verifie",
        piste: `${RUDWALEIT} : Se 70,3 %, Sp 81,2 %, RV+ 3,7`, si: L => berlin(L).filter(Boolean).length === 2 },
      { id: "berlin0", dx: "spa", nom: "Critères de Berlin : aucun", rv: .25, couvre: ["raideur", "amelioration_exercice", "reveils", "fessalgie"], statut: "verifie",
        piste: `${RUDWALEIT} : RV− 0,25`, si: L => berlinEvalues(L) === 4 && berlin(L).filter(Boolean).length === 0 },
      { id: "laslett_central", dx: "si", nom: "Laslett : 3 tests sur 5 ou plus, sans centralisation", rv: 7, couvre: [...SI, "centralisation"], statut: "verifie",
        piste: `${LASLETT} : Se 91 %, Sp 87 %, RV+ 7,0 (2,4–20,4)`, si: L => laslett(L) >= 3 && L.non("centralisation") },
      { id: "laslett", dx: "si", nom: "Laslett : 3 tests sur 5 ou plus", rv: 4.2, couvre: SI, statut: "verifie", piste: `${LASLETT} : Se 91 %, Sp 78 %, RV+ 4,2 (2,1–8,2)`, si: L => laslett(L) >= 3 },
      { id: "laslett_neg", dx: "si", nom: "Laslett : moins de 3 tests sur 5", rv: .12, couvre: SI, statut: "verifie", piste: `${LASLETT} : RV− 0,12`, si: L => laslettEvalues(L) === 5 && laslett(L) < 3 },
      { id: "cook", dx: "stenose", nom: "Cluster de Cook : 3 sur 5 ou plus", rv: 2.5, couvre: ["cote", "jambe_dos", "claudication", "assis_sans_douleur", "penche_avant"], statut: "verifie",
        piste: `${PETERSEN} : Se 29 %, Sp 88 %, RV+ 2,5 (n = 1 448)`, si: L => cook(L).filter(Boolean).length >= 3 },
    ],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(),
        C.cote("Côté de la douleur ou de l'irradiation", "Droit", "Gauche", { stenose: 2.5, spa: 1.5, commune: 1.1, facettaire: 1.3, queue: 3, hernie: .5, si: .5, musculaire: .8 }, "Lombalgie"),
        C.accompagne(), C.refere(), C.travail({ physique: { musculaire: 1.3, hernie: 1.2, commune: 1.1 } }), C.travailPrecision(),
        C.sport({ aucun: { spondylolyse: .4, musculaire: .6 }, pivot: { spondylolyse: 1.5, musculaire: 1.3 }, danse: { spondylolyse: 3, musculaire: 1.3 }, muscu: { spondylolyse: 1.5, musculaire: 1.5, hernie: 1.2 },
          contact: { musculaire: 1.5, spondylolyse: 1.5 }, golf: { musculaire: 1.3, facettaire: 1.2 }, raquette: { spondylolyse: 1.3 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(),
        ouiNon("grossesse", "Grossesse en cours ou accouchement récent", { si: L => L.sexe !== "M", oui: "grossesse en cours ou post-partum", non: "", effets: { grossesse: p(200, .01) } }),
        ouiNon("fluoro_cortico", "Fluoroquinolone ou corticoïde récents", { oui: "fluoroquinolone ou corticoïde récents", non: "",
          effets: { fracture_osteo: est(5, .9, `${COCHRANE_FX} : corticoïdes prolongés, RV+ 3,97–48,5 selon les études`), infection: p(2, .95) } }),
        C.atcdMedicaux(),
        ouiNon("osteoporose", "Ostéoporose ou fracture de fragilité", { oui: "ostéoporose", non: "", effets: { fracture_osteo: verRv(3.13, undefined, `${COCHRANE_FX} : antécédent d'ostéoporose, RV+ 3,13`) } }),
        ouiNon("obesite", "Obésité (IMC 30 ou plus)", { oui: "obésité", non: "", effets: { commune: p(1.2, .95), stenose: p(1.3, .95) } }),
        C.rx(), C.atcdAutres(),
        C.atcdFamiliaux({ spa: verRv(1.52, .88, `${JOVEN} : antécédent familial de spondyloarthrite`) }),
        C.atcdRhumato("spa", 3, 1.5, { rv: { uveite: [{ dx: "spa", se: .06, sp: .98, statut: "verifie", piste: `${JOVEN} : uvéite, RV+ 3,00` }],
          psoriasis: [{ dx: "spa", se: .136, sp: .919, statut: "verifie", piste: `${JOVEN} : psoriasis, RV+ 1,68` }], mii: [{ dx: "spa", se: .047, sp: .987, statut: "verifie", piste: `${JOVEN} : MII, RV+ 3,62` }] } }),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ commune: p(.9, 1.1), hernie: p(1.2, .9) }), C.depuis(), C.contexte(),
          C.duree({ lt7: { musculaire: 2.5, commune: 1.2, hernie: 1.3, fracture_osteo: 2, infection: 1.3, stenose: .3, spa: .3, facettaire: .5, spondylolisthesis: .4, scoliose: .3 },
            s1_6: { musculaire: 1.2, hernie: 1.3, commune: 1.1, fracture_osteo: 1.3 },
            s6_12: { discogenique: 1.3, facettaire: 1.2, si: 1.2, spa: 1.2, cancer: 1.5, musculaire: .5 },
            gt3m: { discogenique: 1.8, facettaire: 2, si: 1.8, stenose: 2.5, spa: 3, spondylolisthesis: 2, scoliose: 2.5, spondylolyse: 1.5, musculaire: .2, commune: .8 } }),
          C.apparition({ subit_trauma: { musculaire: 3, fracture_osteo: 3, hernie: 1.5, spondylolyse: 1.2, stenose: .3, spa: .2, facettaire: .5, scoliose: .2, cancer: .5 },
            subit: { musculaire: 1.5, hernie: 1.8, fracture_osteo: 3, infection: 1.5, commune: 1.2, spa: .3, stenose: .5 },
            graduel: { spondylolyse: 2, facettaire: 1.3, discogenique: 1.3, si: 1.3, stenose: 1.5, musculaire: .5 },
            insidieux: { spa: 3, stenose: 2, facettaire: 1.5, scoliose: 2, spondylolisthesis: 1.5, cancer: 1.2, infection: 1.3, musculaire: .3, fracture_osteo: .5 } }),
          choix("mecanisme", "Mécanisme", [
            o("charge", "Soulèvement d'une charge ou flexion-torsion", { musculaire: 2.5, hernie: 2, commune: 1.3, fracture_osteo: 1.5 }, { n: "soulèvement ou flexion-torsion" }),
            o("chute", "Chute de hauteur, accident ou coup", { fracture_osteo: 3, musculaire: 1.5 }, { n: "chute ou accident" }),
            o("hyperext", "Hyperextensions répétées (gymnastique, lancer, ballet)", { spondylolyse: 4, facettaire: 1.5 }, { n: "hyperextensions répétées" })],
            { si: trauma, masqueSi: "contexte", effets: [{ dx: "fracture_osteo", rv: { chute: 4 }, statut: "a_verifier", piste: `${COCHRANE_FX} : traumatisme significatif, RV+ 1,93–12,85` }] }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations(),
          ouiNon("pas_mieux_1mois", "Pas d'amélioration après 1 mois de traitement", { oui: "pas d'amélioration après 1 mois", non: "", si: L => L.dans("duree", ["s6_12", "gt3m"]),
            effets: { cancer: ver(.5, .81, `${CHOU} : RV+ 3,0`), commune: p(.7, 1.1) } })] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("centrale", "Lombaire centrale", { discogenique: p(2, .7), facettaire: p(1.3, .9), commune: p(1.2, .9), si: p(.5, 1.2), fracture_osteo: p(1.5, .9) }, { n: "lombaire centrale" }),
            m("paravertebrale", "Lombaire, d'un côté (paravertébrale)", { musculaire: p(2.5, .6), facettaire: p(1.5, .8), commune: p(1.2, .9) }, { n: "paravertébrale" }),
            m("fesse", "Fesse ou sacro-iliaque, sous la ceinture", { si: p(3, .4), spa: p(1.5, .9), hernie: p(1.2, 1), grossesse: p(1.5, .9) }, { n: "fessière, en sacro-iliaque" }),
            m("cuisse_post", "Arrière de la cuisse, sans dépasser le genou", { si: p(1.5, .9), facettaire: p(1.5, .9), discogenique: p(1.3, .9) }, { n: "irradiant à la cuisse" }),
            m("sous_genou", "Irradie sous le genou, jusqu'au pied", { hernie: p(6, .2), stenose: p(2, .6), commune: p(.5, 1.1) }, { n: "irradiant sous le genou" }),
            m("cuisse_ant", "Face antérieure de la cuisse (cruralgie)", { hernie: p(3, .9), stenose: p(1.5, .95) }, { n: "à la face antérieure de la cuisse" }),
            m("deux_jambes", "Les deux fesses ou les deux jambes", { stenose: { rvp: 6.3, rvn: .8, statut: "verifie", piste: `${SURI} : douleur bilatérale des fesses ou des jambes, RV+ 6,3 (3,1–13)` }, queue: p(3, .9), spa: p(1.3, .95) }, { n: "aux deux jambes" }),
            m("thoracique", "Monte vers le dos (thoracique)", { fracture_osteo: p(1.5, .9), spa: p(1.3, .95), cancer: p(1.2, 1), scoliose: p(1.3, .95) }, { n: "montant au dos" }),
          ], { gabarit: "douleur a/n {v}" }),
          ouiNon("jambe_dos", "Douleur de jambe plus forte que la douleur lombaire", { oui: "douleur de jambe plus forte que la douleur lombaire", non: "douleur lombaire prédominante",
            effets: { hernie: p(4, .4), stenose: p(1.8, .8), commune: p(.5, 1.2), facettaire: p(.6, 1.1), discogenique: p(.6, 1.1) } }),
          C.type({ brulure: { hernie: 2, stenose: 1.5 }, choc: { hernie: 3 }, sourde: { discogenique: 1.2, facettaire: 1.2, spa: 1.2 }, aigue: { musculaire: 1.3 } }),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("flexion_assis", "Pire en flexion ou assis longtemps", { g: "facteurs", agg: "la flexion et la position assise", aggNie: "en flexion",
            effets: { discogenique: p(2.5, .6), hernie: p(1.8, .7), musculaire: p(1.3, .9), stenose: p(.5, 1.2), facettaire: p(.7, 1.1) } }),
          ouiNon("extension", "Pire en extension ou debout cambré", { g: "facteurs", agg: "l'extension", aggNie: "en extension",
            effets: { facettaire: p(2.5, .6), spondylolyse: p(3, .5), stenose: p(1.8, .7), spondylolisthesis: p(1.8, .8), discogenique: p(.7, 1.1) } }),
          ouiNon("claudication", "Douleur des jambes à la marche ou debout, soulagée assis ou penché", { oui: "claudication neurogène", nie: "claudication neurogène",
            effets: { stenose: verRv(3.7, .23, `${SURI} : claudication neurogène, RV+ 3,7 (2,9–4,8) ; RV− 0,23`), spondylolisthesis: p(2, .8) } }),
          ouiNon("assis_sans_douleur", "Aucune douleur en position assise", { oui: "aucune douleur assis", non: "",
            effets: { stenose: ver(.47, .94, `${SURI} : RV+ 7,4 (1,9–30)`), discogenique: p(.5, 1.1), hernie: p(.6, 1.1) } }),
          ouiNon("penche_avant", "Mieux penché vers l'avant (chariot, montée)", { oui: "mieux penché vers l'avant", non: "",
            effets: { stenose: verRv(6.4, undefined, `${SURI} : RV+ 6,4 (4,1–9,9)`) } }),
          ouiNon("toux_jambe", "Toux ou éternuement augmente la douleur de jambe", { oui: "toux et éternuements augmentent la douleur de jambe", nie: "aggravation à la toux",
            effets: { hernie: ver(.4, .77, `${VERWOERD} : aggravant seulement la jambe, RV+ 1,74`) } }),
          ouiNon("lever_assis", "Douleur en se levant d'une chaise", { oui: "douleur au lever de la position assise", nie: "douleur au lever", effets: { si: p(2, .7), discogenique: p(1.5, .8) } }),
          C.attenuants(),
          C.moment({ matin: { spa: 2, discogenique: 1.2 }, soir: { facettaire: 1.3, stenose: 1.3, musculaire: 1.2 }, constante: { cancer: 2, infection: 2, fracture_osteo: 1.3 } }),
          C.nocturne({ cancer: p(2, .8), infection: p(2, .8), spa: p(1.5, .9), fracture_osteo: p(1.3, .9), commune: p(.8, 1.05) }),
          C.reveils(),
          C.raideur(),
          ouiNon("amelioration_exercice", "Mieux en bougeant, pas au repos", { oui: "améliorée par l'exercice, pas par le repos", non: "" }),
          ouiNon("fessalgie", "Fessalgie à bascule (d'un côté puis de l'autre)", { oui: "fessalgie à bascule", non: "", effets: { spa: ver(.347, .879, `${JOVEN} : RV+ 2,87`) } }),
          ouiNon("ains_reponse", "Nette amélioration en 48 h avec un AINS", { oui: "bonne réponse aux AINS", non: "", effets: { spa: ver(.669, .584, `${JOVEN} : RV+ 1,61`) } }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("paresthesies", "Engourdissements ou picotements dans un dermatome", { oui: "paresthésies dans un dermatome", nie: "paresthésie", effets: { hernie: p(3, .5), stenose: p(1.5, .8) } }),
          ouiNon("faiblesse", "Faiblesse d'une jambe ou pied qui accroche", { oui: "faiblesse d'une jambe", nie: "faiblesse", effets: { hernie: p(2.5, .8), queue: p(2, .95), stenose: p(1.3, .95) } }),
          C.autresArticulations({ spa: p(1.5, .9) }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ infection: { rvp: 3, rvn: .5, statut: "a_verifier", piste: "Lazzeri et coll., 2019 : fièvre chez environ 50 % (35–60 %) des infections rachidiennes" } }),
          C.symptGeneraux({ cancer: verRv(2.7, undefined, `${CHOU} : perte de poids inexpliquée, RV+ 2,7`), infection: p(2, .9) }),
          C.cancer({ cancer: verRv(14.7, undefined, `${HENSCHKE} : antécédent de cancer, RV+ 14,7 en première ligne (23,7 en revue)`) }),
          multi("risque_infection", "Facteurs de risque d'infection", [m("aucun", "Aucun", {}, { exclusif: true }),
            m("udi", "Drogues injectables", { infection: { rvp: 6.9, rvn: 1, statut: "verifie", piste: `${SHAW} : pathologie rachidienne grave, RV+ 6,9 (13,7 si autre foyer infectieux)` } }, { n: "drogues injectables" }),
            m("immuno", "Immunosuppression ou diabète", { infection: p(2.5, 1) }, { n: "immunosuppression ou diabète" }),
            m("geste", "Chirurgie, infiltration rachidienne ou bactériémie récentes", { infection: p(4, 1) }, { n: "geste rachidien ou bactériémie récents" })], { aucun: "", gabarit: "facteur de risque d'infection : {v}" }),
          ouiNon("selle", "Engourdissement en selle", { oui: "anesthésie en selle", nie: "anesthésie en selle", drapeau: true, effets: { queue: verRv(11, undefined, `${SHAW} : RV+ 11 (pathologie rachidienne grave, urgence)`) } }),
          ouiNon("retention", "Rétention urinaire, incontinence ou trouble fécal nouveaux", { oui: "trouble sphinctérien", nie: "trouble sphinctérien", drapeau: true,
            effets: { queue: { rvp: 6.4, rvn: .2, statut: "verifie", piste: `${CHOU} ; ${SHAW} : rétention urinaire, Se 90 %, RV+ 6,4` }, stenose: verRv(6.9, undefined, `${SURI} : trouble urinaire inexpliqué, RV+ 6,9`) } }),
          ouiNon("sciatique_bilat", "Sciatique des deux côtés, nouvelle", { oui: "sciatique bilatérale", nie: "sciatique bilatérale", drapeau: true, effets: { queue: p(2.2, .95) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        C.fonctionnel({ boiterie: { hernie: 1.5, fracture_osteo: 1.3 } }, { garder: ["demarche", "talons_pointes"],
          ajouts: [ouiNon("base_elargie", "Marche à base élargie", { oui: "marche à base élargie", non: "", ligneEx: "demarche", effets: { stenose: ver(.42, .97, `${SURI} : RV+ 13 (1,9–95)`) } }),
            ouiNon("romberg", "Romberg anormal", { oui: "Romberg anormal", non: "Romberg normal", ligneEx: "demarche", effets: { stenose: ver(.4, .91, `${SURI} : RV+ 4,2`) } })] }),
        { titre: "Inspection et palpation", sep: ", ", toutNormal: true, questions: [
          ouiNon("sill", "Décroché entre deux épineuses basses (sill sign, marche d'escalier)", { oui: "décroché palpable entre les épineuses", non: "pas de décroché",
            effets: { spondylolisthesis: ver(.81, .89, `${PETERSEN} : « sill sign », RV+ 7,4 ; RV− 0,21 (marche d'escalier : RV+ 4,7)`), spondylolyse: ver(.6, .87, `${PETERSEN} : marche d'escalier à la palpation, RV+ 4,7`) } }),
          ouiNon("p_paravert", "Paravertébraux douloureux ou en spasme", { oui: "paravertébraux douloureux", non: "paravertébraux indolores", effets: { musculaire: p(3, .4), commune: p(1.2, .9) } }),
          ouiNon("p_epineuse", "Épineuse douloureuse à la percussion", { oui: "épineuse douloureuse à la percussion", non: "", effets: { fracture_osteo: p(3, .5), infection: p(3, .5), cancer: p(2, .7), spondylolyse: p(1.5, .9) } }),
          ouiNon("p_si", "Sillon sacro-iliaque douloureux", { oui: "sillon sacro-iliaque douloureux", non: "", effets: { si: p(1.5, .7), spa: p(1.3, .9) } }),
          ouiNon("scoliose_vue", "Test d'Adams : gibbosité en flexion avant (ou scoliose visible)", { oui: "gibbosité au test d'Adams", non: "",
            effets: { scoliose: lit(.844, .952, "Côté et coll., 1998, Spine ; USPSTF 2018 : RV+ 17,6 (calculé), données d'adolescents ; concordance médiocre en lombaire") } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_flexion", "Flexion lombaire", "flexion", { complete: { stenose: 1.5 }, lim_douleur: { discogenique: 2, hernie: 2, musculaire: 1.5, stenose: .6 }, lim_raideur: { spa: 1.5, scoliose: 1.3 } }, false,
            [{ dx: "stenose", rv: { complete: 1.4 }, statut: "verifie", piste: `${SURI} : absence de douleur en flexion, RV+ 1,4` }]),
          C.amplitude("arom_extension", "Extension lombaire", "extension", { lim_douleur: { facettaire: 2, spondylolyse: 2.5, stenose: 1.8, spondylolisthesis: 1.5 }, lim_raideur: { spa: 1.5, stenose: 1.3 } }),
          C.amplitude("arom_inclinaison", "Inclinaison latérale lombaire", "inclinaison latérale"),
          C.amplitude("arom_rotation", "Rotation du tronc", "rotation du tronc"),
          ouiNon("schober", "Schober diminué", { oui: "Schober diminué", non: "Schober normal", horsNormal: true, effets: { spa: ver(.68, .47, "Kim et coll., 2026, AFP : RV+ 1,3") } }),
        ] },
        { titre: "Neurologique", ligne: "Neuro", toutNormal: true, questions: [
          ouiNon("reflexe_rot", "Réflexe rotulien diminué", { oui: "réflexe rotulien diminué", non: "réflexe rotulien normal", effets: { hernie: verRv(7.7, undefined, `${SURI11} : atteinte L4, RV+ 7,7`) } }),
          ouiNon("reflexe_ach", "Réflexe achilléen diminué ou absent", { oui: "réflexe achilléen diminué", non: "réflexe achilléen normal",
            effets: { hernie: verRv(7.1, undefined, `${PETERSEN} : atteinte L5–S1, RV+ 7,1`), stenose: ver(.47, .78, `${SURI} : RV+ 2,1`) } }),
          ouiNon("faiblesse_ehl", "Faiblesse de l'extenseur de l'hallux (L5)", { oui: "faiblesse de l'extenseur de l'hallux", non: "extenseur de l'hallux fort", effets: { hernie: ver(.61, .86, `${PETERSEN} : RV+ 4,4`) } }),
          ouiNon("faiblesse_df", "Faiblesse de la dorsiflexion de la cheville (L4)", { oui: "faiblesse de la dorsiflexion", non: "dorsiflexion forte", effets: { hernie: ver(.6, .89, `${PETERSEN} : RV+ 5,4`) } }),
          ouiNon("sensibilite", "Hypoesthésie dans un dermatome", { oui: "hypoesthésie dermatomale", non: "sensibilité normale", effets: { hernie: p(2.5, .7) } }),
        ] },
        { titre: "Tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("lasegue", "Lasègue (élévation de la jambe tendue)", { court: "Lasègue", effets: { hernie: ver(.92, .28, COCHRANE_SLR, { g: "tension" }) } }),
          ouiNon("lasegue_croise", "Lasègue croisé", { court: "Lasègue croisé", horsNormal: true, effets: { hernie: ver(.28, .9, COCHRANE_SLR, { g: "tension-croise" }) } }),
          ouiNon("slump", "Slump", { court: "slump", effets: { hernie: ver(.84, .83, `Majlesi et coll., 2008 (PMID 18391677) ; ${PETERSEN}`, { g: "tension" }) } }),
          ouiNon("femoral", "Étirement du nerf fémoral", { court: "étirement du nerf fémoral", horsNormal: true, effets: { hernie: verRv(5.7, undefined, `${SURI11} : atteinte L3, RV+ 5,7`) } }),
          ouiNon("ext_passive", "Extension lombaire passive", { court: "extension lombaire passive", genre: "f", horsNormal: true,
            effets: { spondylolisthesis: ver(.84, .9, `${KASAI} : instabilité radiologique, RV+ 8,8 ; RV− 0,18`), spondylolyse: p(2, .8) } }),
          ouiNon("p_symphyse", "Symphyse pubienne douloureuse (grossesse)", { court: "symphyse pubienne douloureuse", genre: "f", si: L => L.oui("grossesse"),
            effets: { grossesse: lit(.81, .99, "Chiffres de seconde main (base FlashCards ; Rejano-Campo et coll., 2017, Health Qual Life Outcomes), à confirmer", { g: "ceinture-ex" }) } }),
          ouiNon("trendelenburg_mod", "Trendelenburg modifié (grossesse)", { court: "Trendelenburg modifié", si: L => L.oui("grossesse"),
            effets: { grossesse: lit(.6, .97, "Chiffres de seconde main (base FlashCards ; Rejano-Campo et coll., 2017, Health Qual Life Outcomes), à confirmer", { g: "ceinture-ex" }) } }),
          ouiNon("centralisation", "Centralisation aux mouvements répétés", { court: "centralisation", genre: "f", horsNormal: true, effets: { discogenique: ver(.4, .94, `${LASLETT_C} : RV+ 6,9`) } }),
          ouiNon("hyperext_uni", "Hyperextension unipodale (stork)", { court: "hyperextension unipodale", genre: "f", horsNormal: true, effets: { spondylolyse: { rvp: 1.5, rvn: .8, statut: "a_verifier", piste: "Masci et coll., 2006, BJSM (PMID 16980534) : Se 50–55 %, Sp faible" } } }),
          ouiNon("si_distraction", "Sacro-iliaque : distraction", { court: "distraction sacro-iliaque", genre: "f", horsNormal: true }),
          ouiNon("si_compression", "Sacro-iliaque : compression", { court: "compression sacro-iliaque", genre: "f", horsNormal: true }),
          ouiNon("si_thigh", "Sacro-iliaque : thigh thrust", { court: "thigh thrust", horsNormal: true }),
          ouiNon("si_gaenslen", "Sacro-iliaque : Gaenslen", { court: "Gaenslen", horsNormal: true }),
          ouiNon("si_sacral", "Sacro-iliaque : sacral thrust", { court: "sacral thrust", horsNormal: true }),
        ] },
        { titre: "Hanche", adjacent: "hanche", toutNormal: true, questions: [
          choix("hanche_mob", "Hanche : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation de la hanche indolore" }), o("douleur", "Rotation interne limitée ou douloureuse", {}, { n: "rotation interne de la hanche limitée ou douloureuse" })]),
        ] },
        { titre: "Neurovasculaire", adjacent: "neurovasculaire", sansCote: true, toutNormal: true, questions: [
          ouiNon("pouls_dim", "Pouls pédieux diminués", { oui: "pouls pédieux diminués", non: "pouls pédieux normaux" }),
          ouiNon("anal", "Sensibilité périnéale ou tonus anal diminués", { oui: "sensibilité périnéale ou tonus anal diminués", non: "", effets: { queue: p(3, .9) } }),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    regles: [
      C.regles.age12,
      L => (L.oui("selle") || L.oui("retention") || L.oui("anal") || (L.oui("sciatique_bilat") && L.oui("faiblesse")))
        ? { niveau: "urgence", titre: "Syndrome de la queue de cheval à éliminer", ro: "syndrome de la queue de cheval", texte: "Anesthésie en selle (RV+ 11), rétention urinaire (RV+ 6,4), trouble sphinctérien ou sciatique bilatérale avec faiblesse.",
          conduite: items(20) } : null,
      L => (L.oui("fievre") && (L.a("risque_infection", "udi") || L.a("risque_infection", "immuno") || L.a("risque_infection", "geste") || L.oui("p_epineuse")))
        || (L.a("risque_infection", "udi") && L.oui("nocturne"))
        ? { niveau: "urgence", titre: "Spondylodiscite ou abcès épidural à éliminer", ro: "spondylodiscite", texte: "Fièvre (présente dans environ la moitié des cas) avec un facteur de risque ou une épineuse douloureuse.", conduite: items(19) } : null,
      L => (L.oui("atcd_cancer") || (L.oui("sympt_generaux") && L.age >= 50) || (L.oui("pas_mieux_1mois") && L.age >= 50 && L.oui("nocturne")))
        ? { niveau: "rapide", titre: "Néoplasie rachidienne à éliminer", ro: "néoplasie rachidienne", texte: "Antécédent de cancer (RV+ 14,7), perte de poids inexpliquée ou douleur nocturne sans amélioration après 1 mois. En première ligne, la probabilité reste faible sauf si antécédent de cancer (4,6 %).",
          conduite: items(18) } : null,
      L => ((L.oui("osteoporose") || L.oui("fluoro_cortico") || L.age >= 70 || (L.sexe === "F" && L.age >= 65)) && (L.trauma() || L.dans("apparition", ["subit"]) || L.oui("p_epineuse")))
        ? { niveau: "rapide", titre: "Fracture vertébrale à éliminer", ro: "fracture vertébrale", texte: "Ostéoporose, corticoïdes, âge avancé avec un début brutal ou une épineuse douloureuse.", conduite: items(10) } : null,
      L => (L.trauma() && L.v("mecanisme") === "chute" && L.age !== null && L.age < 65)
        ? { niveau: "rapide", titre: "Fracture traumatique à éliminer", ro: "fracture traumatique lombaire", texte: "Chute de hauteur ou accident : apophyses transverses (48 % des lésions lombaires), corps vertébral.", conduite: items(17) } : null,
      L => (L.oui("faiblesse_df") || L.oui("faiblesse_ehl")) && L.oui("faiblesse")
        ? { niveau: "rapide", titre: "Déficit moteur radiculaire", ro: "radiculopathie avec déficit moteur", texte: "Faiblesse objectivée : un déficit progressif ou sévère justifie une IRM et un avis rapide.", conduite: items(8) } : null,
      L => (L.age !== null && L.age < 18 && (L.dans("apparition", ["graduel", "insidieux"]) || L.dans("duree", ["s6_12", "gt3m"])))
        ? { niveau: "info", titre: "Lombalgie de l'enfant et de l'adolescent", texte: "Plus souvent structurelle que chez l'adulte (spondylolyse chez le sportif) ; drapeaux rouges propres à l'enfant.", conduite: items(21) } : null,
      C.regles.tumeur("Radiographie lombaire ; IRM selon le tableau."),
    ],
  });
})();
