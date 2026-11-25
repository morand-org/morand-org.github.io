/* Locomoteur Morand, genou (prototype 0.5, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Données : document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/), rapport LCA du même jour.
   Région de référence : la note suit le format des notes de clinique locomotrice (voir le moteur) et l'examen ne garde
   que les tests retenus par le clinicien (liste du 18 novembre 2026).

   Statut des poids :
     p(RV si oui, RV si non)  estimation clinique provisoire, sans source : à remplacer.
     lit(Se, Sp, « piste »)   sensibilité et spécificité publiées, citées de mémoire : à vérifier.
     est(RV+, RV−, « piste ») rapports de vraisemblance publiés, cités de mémoire : à vérifier.
     ver(…) / verRv(…)        chiffre tiré d'une étude identifiée (document OpenEvidence, rapport LCA), avec sa source.
   Option d'un choix : o(valeur, libellé, { diagnostic: RV }, { n: texte de la note }).
   « g » regroupe les éléments qui se recoupent : seul le plus fort en faveur et le plus fort en défaveur comptent. */
(function () {
  "use strict";
  const { p, lit, est, o, m, ouiNon, choix, multi, miroir } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const SOKAL = "Sokal et coll., 2022, méta-analyse bivariée (Knee Surg Sports Traumatol Arthrosc), PMID 35150292";
  const WAGEMAKERS = "Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267";
  const DECARY = "Décary et coll., 2018 (PLoS One), PMID 29894492";
  // Sources du document OpenEvidence du 21 novembre 2026 (outils/locomoteur/sources/2026-11-21-openevidence/, parties B, D, E et G).
  const DUONG = "Duong et coll., 2023, JAMA (revue)", KATZ = "Katz et coll., 2021, JAMA (revue)", HEGEDUS = "Hegedus et coll., 2007, méta-analyse (JOSPT), PMID 17939613";
  const GOOSSENS = "Goossens et coll., 2015 (JOSPT, n = 593), PMID 25420009", SNOEKER = "Snoeker et coll., 2015 (JOSPT, IRM), PMID 26161628";
  const KASTELEIN = "Kastelein et coll., 2008 (Am J Med), PMID 18954845", RUBINSTEIN = "Rubinstein et coll., 1994 (Am J Sports Med), PMID 7943523";
  const LUBOWITZ = "Lubowitz et coll., 2008 (Am J Sports Med)", AHMAD = "Ahmad et coll., 2009 (Am J Sports Med)";
  const YAN = "Yan et coll., 2011 (Swiss Med Wkly, cohorte chirurgicale), PMID 22180191", MCHUGH = "McHugh et coll., 2022 (Osteoarthritis Cartilage), PMID 34600120";
  const MARGARETTEN = "Margaretten et coll., 2007, JAMA (examen clinique rationnel)", VANNIES = "van Nies et coll., 2015 (Arthritis Res Ther)";
  const DECARY_MEN = "Décary et coll., 2018 (PM&R), PMID 29111463", DECARY_SFP = "Décary et coll., 2018 (Arch Phys Med Rehabil), PMID 29128344";
  const MCCLINTON = "McClinton et coll., 2020 (Curr Rev Musculoskelet Med)", GELBER = "Gelber, 2024 (Ann Intern Med) : critères cliniques de l'ACR";
  const KING = "King et coll., 2025 (Arthritis Care Res) : règle NICE, diagnostic du rhumatologue";
  const trauma = L => L.trauma();
  const PALP = "palp", TEST = "test";

  /* Noms anglais des diagnostics, pour les questions posées à OpenEvidence. */
  const ANGLAIS = { sfp: "patellofemoral pain syndrome", arthrose: "knee osteoarthritis", menisque: "meniscal tear", lca: "anterior cruciate ligament tear",
    lcp: "posterior cruciate ligament tear", collat: "medial or lateral collateral ligament sprain of the knee", rotule: "lateral patellar instability or dislocation",
    tendino: "patellar or quadriceps tendinopathy", hoffa: "Hoffa fat pad syndrome", bit: "iliotibial band syndrome", bprep: "prepatellar bursitis",
    poie: "pes anserine tendinobursitis", osgood: "Osgood-Schlatter disease", slj: "Sinding-Larsen-Johansson disease", contusion: "knee contusion or minor sprain",
    plica: "medial plica syndrome", ocd: "osteochondritis dissecans of the knee", discoide: "discoid meniscus", cristaux: "gout or calcium pyrophosphate arthritis of the knee",
    arthrite: "inflammatory arthritis of the knee (rheumatoid, spondyloarthritis, psoriatic)", septique: "septic arthritis of the knee",
    baker: "Baker's (popliteal) cyst", insuff: "subchondral insufficiency fracture of the knee" };

  /* ---------- Conduite par diagnostic : { t: action (va au plan avec « + Plan »), src: source de la recommandation } ----------
     Texte : aide-mémoire de première ligne (Québec) du document OpenEvidence du 21 novembre 2026 (partie H) ; sources : fiches
     de la partie F (outils/locomoteur/sources/2026-11-21-openevidence/). Ordre : investigation, traitement, suivi, référence. */
  const ACR_OA = "Kolasinski et coll., 2020, ACR/Arthritis Foundation (Arthritis Rheumatol)", OARSI = "Bannuru et coll., 2019, OARSI (PMID 31278997)";
  const DUONG_TT = "Duong et coll., 2023, JAMA (revue)", JADIDI = "Jadidi et coll., 2024, Curr Rev Musculoskelet Med", LINTNER = "Lintner et coll., 2023, AFP";
  const jeune = L => L.age !== null && L.age < 18;
  const CONDUITES = {
    arthrose: [
      { t: "Diagnostic clinique si 45 ans ou plus, douleur liée à l'activité et raideur matinale absente ou de 30 min ou moins : ni imagerie ni bilan sanguin", src: "NICE NG226, 2022 ; King et coll., 2025 (Arthritis Care Res)", si: L => L.age === null || L.age >= 45 },
      { t: "Radiographies en charge avec incidence axiale seulement si tableau atypique, progression rapide ou arthroplastie envisagée ; IRM rarement indiquée", src: `${DUONG_TT} ; Choisir avec soin Canada` },
      { t: "Éducation, exercice (supervisé de préférence ; GLA:D Canada), perte de poids de 5–10 % si surpoids, canne ou orthèse au besoin", src: `${ACR_OA} ; ${OARSI}` },
      { t: "Diclofénac topique en premier ; AINS oral en cure courte ; duloxétine en option (30 mg DIE 7 j, puis 60 mg DIE ; bénéfice modeste)", src: `${OARSI} ; ${ACR_OA}` },
      { t: "Infiltration de corticoïde pour une poussée (triamcinolone 40 mg ; bénéfice de 1 à 6 sem ; espacer d'au moins 3–4 mois)", src: "Jüni et coll., 2015, Cochrane" },
      { t: "Pas d'acide hyaluronique (déconseillé par l'ACR et le NICE ; option conditionnelle pour l'OARSI), ni de plasma riche en plaquettes, ni d'opioïdes", src: `${ACR_OA} ; ${OARSI}` },
      { t: "Pas d'arthroscopie pour une atteinte dégénérative, même avec symptômes mécaniques", src: "Mar, 2017, Ann Intern Med ; Siemieniuk et coll., 2017, BMJ" },
      { t: "Suivi dans 3 mois" },
      { t: "Orthopédie si atteinte radiographique modérée à sévère avec douleur ou perte fonctionnelle importantes malgré 6 mois de traitement bien conduit : CRDS AH-753, priorité D, avec rapport de radiographie", src: "Hannon et coll., 2023, ACR/AAHKS ; formulaire AH-753 (CRDS)" }],
    sfp: [
      { t: "Diagnostic clinique ; pas d'imagerie initiale. Radiographies (avec axiale) si échec, épanchement, trauma ou tableau atypique chez l'adolescent (ostéochondrite)", src: "Collins et coll., 2018, BJSM (PMID 29925502) ; APTA, 2020 (AFP)" },
      { t: "Éducation et dosage de la charge (escaliers, accroupissements, sauts, course) ; chez l'adolescent, viser une douleur de 2/10 ou moins avec reprise par paliers", src: "Winters et coll., 2020, BJSM (PMID 33106251)" },
      { t: "Consultation en physiothérapie : exercices de la hanche et du genou à volume élevé, 3 fois par semaine ; éviter l'attente passive", src: "Collins et coll., 2018, BJSM" },
      { t: "Taping ou orthèses plantaires préfabriquées en appoint à court terme (environ 6 sem)", src: "Collins et coll., 2018, BJSM" },
      { t: "Suivi dans 4–6 sem, puis à 3 mois (jusqu'à 1 patient sur 2 garde des douleurs à long terme)" },
      { t: "Revoir si enflure, blocage, instabilité ou douleur nocturne" }],
    menisque: [
      { t: "Lésion probablement dégénérative (40–45 ans et plus) : pas d'IRM de routine", src: `${DUONG_TT} ; Choisir avec soin Canada`, si: L => L.age === null || L.age >= 40 },
      { t: "Trauma en torsion chez le sujet jeune avec épanchement ou blocage : IRM", src: DUONG_TT, si: L => L.trauma() || (L.age !== null && L.age < 40) },
      { t: "Dégénérative : physiothérapie 3 mois ou plus ; la méniscectomie n'est pas supérieure à la chirurgie placebo (FIDELITY) et la physiothérapie est non inférieure à 2 et 5 ans (ESCAPE)", src: "Sihvonen et coll., 2018 (FIDELITY) ; Noorduyn et coll., 2022 (ESCAPE) ; Hunter et coll., 2019, Lancet" },
      { t: "Traumatique sans blocage : essai d'exercices de 4–12 sem acceptable", src: DUONG_TT },
      { t: "Suivi dans 6 sem, puis à 3 mois" },
      { t: "Orthopédie en 1–2 sem si genou verrouillé (anse de seau), lésion associée à une rupture du LCA ou dérobements après trauma ; sinon CRDS AH-753, priorité D, avec rapport d'IRM", src: `${DUONG_TT} ; formulaire AH-753 (CRDS)` }],
    lca: [
      { t: "Règle d'Ottawa pour la radiographie (fracture de Segond, arrachement des épines tibiales) ; IRM pour confirmer et voir les lésions méniscales et cartilagineuses", src: "Sokal et coll., 2022 (PMID 35150292) ; Bachmann et coll., 2004" },
      { t: "Glace, béquilles brèves, physiothérapie précoce (amplitude, quadriceps)" },
      { t: "Réadaptation structurée d'abord, option valable chez l'adulte : 50–60 % évitent la reconstruction, avec des résultats comparables ; décision partagée selon l'instabilité, le sport pivot et les lésions associées", src: "Frobell et coll., 2010 (KANON) ; Reijman et coll., 2021, BMJ (COMPARE, PMID 33687926) ; Beard et coll., 2022, Lancet" },
      { t: "Suivi dans 1–2 sem, puis à 6–12 sem" },
      { t: "Enfant et adolescent : référence rapide en orthopédie (au-delà de 12 sem de délai, plus de lésions méniscales)", src: "MacDonald et coll., 2021, JAMA Pediatr", si: jeune },
      { t: "Orthopédie si dérobements, sport pivot, lésion méniscale réparable ou genou verrouillé : CRDS AH-753, rupture du ligament croisé avec physiothérapie initiée, priorité C, avec rapport d'IRM", src: "Formulaire AH-753 (CRDS)" }],
    lcp: [
      { t: "Tiroir postérieur, affaissement postérieur ; radiographies (règle d'Ottawa) ; IRM", src: "Badri et coll., 2018, Curr Rev Musculoskelet Med" },
      { t: "Isolée, grades I–II : immobilisation relative 2 sem avec appui protégé, puis renforcement du quadriceps ; retour au sport en 4–8 sem. Grade III : extension 2–4 sem, retour en 3–4 mois", src: "Wind et coll., 2004, Am J Sports Med ; Badri et coll., 2018" },
      { t: "Suivi dans 2 sem, puis à 6 sem" },
      { t: "Orthopédie si grade III, translation de 8 mm ou plus, avulsion osseuse déplacée ou lésion multiligamentaire" }],
    collat: [
      { t: "Stress en valgus (LLI) ou en varus (LLE) à 30° et en extension ; règle d'Ottawa ; IRM si grade III ou rupture du LCA soupçonnée (associée à la quasi-totalité des grades III)", src: JADIDI },
      { t: "Grade I : symptomatique, appui toléré. Grades II–III isolés : attelle articulée (0–90°) avec appui toléré 6 sem, physiothérapie", src: `MacDonald et coll., 2021 ; ${JADIDI}` },
      { t: "Retour au sport : grade I 2–4 sem, grade II 4–6 sem, grade III 6–8 sem", src: JADIDI },
      { t: "Suivi dans 1–2 sem, puis réévaluation de la laxité à 6 sem" },
      { t: "Orthopédie si laxité en extension complète, lésion combinée ou avulsion osseuse ; LLE grade III ou angle postéro-latéral : orthopédie rapidement (chirurgie idéalement en moins de 3 sem)", src: "LaPrade et coll., 2002, Clin Orthop" }],
    rotule: [
      { t: "Radiographies de face, de profil et axiale ; IRM si hémarthrose (les radiographies manquent la majorité des fragments ostéochondraux)", src: "Reed et coll., 2026, Am J Sports Med" },
      { t: "Premier épisode sans fragment : immobilisation brève de confort, appui toléré, puis mobilisation précoce et renforcement ; une orthèse restrictive 4 sem ne réduit pas les récidives", src: `Liu et coll., 2018, Am J Sports Med ; ${JADIDI}` },
      { t: "Sports de contact évités environ 3 mois" },
      { t: "Suivi dans 1–2 sem ; récidive chez environ 30 % (près d'un enfant sur deux)" },
      { t: "Orthopédie si fragment ostéochondral ou corps libre, avulsion osseuse ou récidive" }],
    tendino: [
      { t: "Diagnostic clinique ; échographie ou IRM si doute" },
      { t: "Mise en charge progressive du tendon pendant 12 sem ou plus (isométrique, isotonique lourd et lent, pliométrique, puis gestes sportifs), guidée par la douleur", src: "Breda et coll., 2021, BJSM ; Kongsgaard et coll., 2009 ; Davis et coll., 2023" },
      { t: "Pas d'infiltration de corticoïde (gain perdu à 6 mois, risque d'affaiblissement du tendon) ; récupération possible sur 6–12 mois", src: "Davis et coll., 2023, Curr Rev Musculoskelet Med" },
      { t: "Suivi dans 6 sem, puis à 12 sem" },
      { t: "Échec après 3–6 mois de mise en charge bien conduite : médecine du sport" }],
    hoffa: [
      { t: "Éviter l'hyperextension ; taping de décharge du coussinet adipeux" },
      { t: "Consultation en physiothérapie : contrôle de l'extension, renforcement du quadriceps" },
      { t: "AINS en cure courte ; échographie ou IRM si la douleur persiste" }],
    bit: [
      { t: "Diagnostic clinique (douleur latérale au condyle fémoral chez le coureur ou le cycliste)" },
      { t: "Réduction du volume d'entraînement (dénivelé, descentes), AINS en cure courte, puis renforcement des abducteurs de la hanche ; récupération vers 6 sem chez la plupart", src: "Fredericson et coll., 2005 (PMID 15896092) ; Barker et coll., 2011" },
      { t: "Infiltration possible en phase aiguë (petit essai favorable)" },
      { t: "Suivi dans 6 sem ; échec après environ 6 mois : médecine du sport ou orthopédie" }],
    bprep: [
      { t: "Rechercher les signes septiques (fièvre > 37,8 °C, chaleur nette, porte d'entrée cutanée, cellulite) ; si présents ou doute : ponction (leucocytes > 3000/µL, neutrophiles > 50 %, Gram, culture). Environ un tiers sont septiques, à S. aureus dans 80 %", src: "Baumbach et coll., 2014 (PMID 24305696)" },
      { t: "Aseptique : éviter la ponction ; genouillère de protection, compression, AINS en cure courte" },
      { t: "Septique : céphalexine 500 mg QID (enfant 50 mg/kg/j en 3 doses, max 1 g/dose) 7–14 j selon l'évolution ; ne couvre pas le SARM", src: "Charret et coll., 2021, J Antimicrob Chemother (PMID 34293150) ; Brown et coll., 2022" },
      { t: "Revoir à 48–72 h si septique ; fièvre, cellulite extensive, immunosuppression ou absence d'amélioration : antibiotiques IV et drainage" }],
    poie: [
      { t: "Diagnostic clinique (sensibilité environ 5 cm sous l'interligne médial, douleur aux escaliers) ; chercher une gonarthrose associée" },
      { t: "Physiothérapie, diclofénac topique, perte de poids", src: "Babaei-Ghazani et coll., 2024 (PMID 37752656)" },
      { t: "Infiltration (triamcinolone 20 mg avec lidocaïne) à effet surtout bref, plus précise sous échographie", src: "Babaei-Ghazani et coll., 2024" },
      { t: "Suivi dans 6–8 sem ; échec : rechercher une fracture de stress du tibia proximal ou une lésion méniscale" }],
    osgood: [
      { t: "Diagnostic clinique ; radiographie de profil si atteinte unilatérale atypique, douleur nocturne ou trauma aigu", src: LINTNER },
      { t: "Activité permise si la douleur reste légère et cède au repos ; glace, étirements et renforcement ; pas d'immobilisation ni d'infiltration", src: `${LINTNER} ; Ladenhauf et coll., 2020 (PMID 31714260)` },
      { t: "Enseignement : les symptômes durent souvent plus d'un an (médiane d'environ 16 mois) ; plus de 90 % guérissent sans chirurgie" },
      { t: "Suivi dans 6–8 sem" },
      { t: "Douleur aiguë avec perte de l'extension active (avulsion de la tubérosité tibiale) : radiographies et orthopédie d'urgence ; ossicule douloureux après la fermeture des physes : orthopédie" }],
    slj: [
      { t: "Diagnostic clinique (pôle inférieur de la rotule chez le préadolescent sportif)", src: LINTNER },
      { t: "Même conduite que l'Osgood-Schlatter : activité selon la douleur, glace, étirements et renforcement ; bonne évolution en 2–8 mois", src: LINTNER },
      { t: "Suivi dans 6–8 sem" },
      { t: "Lever de la jambe tendue impossible, épanchement ou appui impossible : fracture en manchon de la rotule, radiographies et orthopédie d'urgence" }],
    contusion: [
      { t: "Règle d'Ottawa pour décider de la radiographie (Se ≈ 99 %, Sp ≈ 49 %)", src: "Bachmann et coll., 2004, Ann Intern Med ; Jackson et coll., 2003" },
      { t: "Glace, compression, appui toléré, analgésie de base" },
      { t: "Réexamen ligamentaire à 7–10 j (l'examen est souvent limité par la douleur au début) ; radiographie si douleur persistante à 10 j" },
      { t: "Épanchement rapide, blocage, instabilité ou lever de la jambe tendue impossible : imagerie et orthopédie ; pied froid ou pouls diminué : urgence" }],
    plica: [
      { t: "Diagnostic clinique (douleur antéro-médiale, ressaut, cordon palpable) ; IRM si doute", src: "Kuwabara et coll., 2021, Curr Rev Musculoskelet Med" },
      { t: "Physiothérapie, AINS, glace pendant 3 mois ou plus (amélioration chez la grande majorité) ; infiltration en option", src: "Kuwabara et coll., 2021" },
      { t: "Suivi dans 6–8 sem ; échec : orthopédie (résection arthroscopique)" }],
    ocd: [
      { t: "Radiographies de face, de profil, axiale et en tunnel des deux genoux (atteinte bilatérale dans 15–30 %) ; IRM pour la stabilité", src: "Mitchell et coll., 2025, Arthroscopy" },
      { t: "Lésion stable à physes ouvertes : traitement non chirurgical 3–6 mois (décharge initiale 4–6 sem, pas d'impact pendant au moins 3 mois) ; guérison chez environ 50–65 %", src: "Rosenberg et coll., 2026, Curr Rev Musculoskelet Med" },
      { t: "Radiographies de contrôle toutes les 6–12 sem" },
      { t: "Orthopédie pour tous ; rapidement si blocage, épanchement, perte d'amplitude ou physes fermées" }],
    discoide: [
      { t: "IRM ; atteinte souvent bilatérale", src: "Kramer et coll., 2009, J Am Acad Orthop Surg (PMID 19880680)" },
      { t: "Découverte fortuite asymptomatique : observation, pas de chirurgie" },
      { t: "Symptômes (ressaut, blocage, perte d'extension) : orthopédie pédiatrique (saucérisation avec ou sans réparation)" }],
    cristaux: [
      { t: "Ponction (cristaux, Gram, culture, décompte) avant tout antibiotique ; la présence de cristaux n'exclut pas l'infection", src: "Swisher et coll., 2025, AFP" },
      { t: "Crise de goutte : colchicine 1,2 mg, puis 0,6 mg 1 h plus tard ; 12 h après, 0,6 mg DIE–BID jusqu'à résolution (réduire avec clarithromycine, diltiazem, vérapamil, cyclosporine). Sinon naproxène 500 mg BID avec IPP, ou prednisone 30–35 mg DIE 5 j", src: "FitzGerald et coll., 2020, ACR (goutte)" },
      { t: "Chondrocalcinose aiguë de l'aîné : prednisone 30 mg DIE 2 j, équivalente à la colchicine (moins de diarrhée) ; infiltration une fois l'infection exclue", src: "Pascart et coll., 2023, Lancet Rheumatol (COLCHICORT)" },
      { t: "Hypo-uricémiant si tophus, dommages radiographiques ou 2 crises par an ou plus : allopurinol 100 mg/j ou moins au départ, cible < 360 µmol/L, colchicine 0,6 mg DIE 3–6 mois en prophylaxie", src: "FitzGerald et coll., 2020, ACR" },
      { t: "Chondrocalcinose avant 60 ans : rechercher hyperparathyroïdie, hémochromatose, hypomagnésémie" },
      { t: "Revoir à 48–72 h, puis dans 2–4 sem ; fièvre, immunosuppression, prothèse ou doute d'infection : urgence" },
      { t: "Rhumatologie au besoin : CRDS AH-765 (arthrite microcristalline)", src: "Formulaire AH-765 (CRDS)" }],
    arthrite: [
      { t: "Bilan : FSC, CRP, VS, FR, anti-CCP, HLA-B27 selon le tableau ; radiographies ; ponction si épanchement" },
      { t: "Arthrite inflammatoire soupçonnée (raideur matinale prolongée, plusieurs articulations, psoriasis, uvéite, MII) : rhumatologie, CRDS AH-765", src: "Formulaire AH-765 (CRDS)" },
      { t: "AINS en cure courte en attendant ; pas de corticoïde systémique avant l'avis si possible" }],
    septique: [
      { t: "Ponction avant antibiotiques (décompte, Gram, culture, cristaux) et hémocultures ; leucocytes > 50 000/µL : RV ≈ 8 ; > 100 000/µL : RV ≈ 28 ; mais 30–50 % sont sous 50 000", src: "Margaretten et coll., 2007, JAMA ; Earwood et coll., 2021, AFP" },
      { t: "Urgence : drainage articulaire et antibiotiques IV visant S. aureus et les streptocoques (SARM selon le risque), durée habituelle 3–4 sem", src: "Gardner et coll., 2025, NEJM" },
      { t: "Transfert le jour même ; ne jamais infiltrer de corticoïde tant que l'infection n'est pas exclue" }],
    baker: [
      { t: "Échographie si doute ; presque toujours secondaire à une atteinte intra-articulaire (arthrose, ménisque)" },
      { t: "Rupture : tableau indiscernable d'une thrombose veineuse → écho-doppler (un kyste n'exclut pas une thrombose ; répéter à 5–7 j si négatif)", src: "Langsfeld et coll., 1997 (PMID 9129621) ; Chopard et coll., 2020, JAMA" },
      { t: "Traiter la cause ; infiltration intra-articulaire de corticoïde (réduit le kyste à 4 sem) ; ponction échoguidée si symptomatique (récidive d'environ 13 %)" },
      { t: "Suivi dans 6 sem ; mollet tendu et très douloureux (syndrome compartimental, surtout sous anticoagulant) : urgence", src: "Frush et coll., 2015, Sports Health" }],
    insuff: [
      { t: "Radiographies en charge souvent normales au début → IRM (tôt si douleur disproportionnée, au plus tard après 6 sem) ; souvent associée à une lésion de la racine méniscale médiale", src: "Choi et coll., 2021, Am J Sports Med" },
      { t: "Appui protégé avec béquilles environ 6 sem, analgésie de base, optimisation du calcium et de la vitamine D ; bilan d'ostéoporose", src: "Choi et coll., 2021" },
      { t: "Suivi dans 6 sem ; effondrement sous-chondral, lésion étendue ou échec : orthopédie (environ 1 patient sur 3 évolue vers la chirurgie)" }],
  };

  /* ---------- Mesures générales selon le contexte (bloc commun de l'aide-mémoire, partie H) ---------- */
  const recente = L => L.trauma() && (!L.repondu("duree") || L.dans("duree", ["lt7", "s1_6"]));
  const surcharge = L => L.dans("apparition", ["graduel", "insidieux"]) || L.dans("duree", ["s6_12", "gt3m"]) && !L.trauma();
  const MESURES = [
    { titre: "Blessure récente", si: recente, items: [
      { t: "Protection et repos relatif ; appui selon la tolérance, béquilles au besoin" },
      { t: "Glace et compression les premiers jours (15 à 20 min aux 2 à 3 h), élévation" },
      { t: "Réexamen à 7–10 j : examen ligamentaire souvent limité par la douleur au début" },
      { t: "Consultation en physiothérapie dès que la douleur le permet" }] },
    { titre: "Douleur de surcharge", si: surcharge, items: [
      C.mesures.charge,
      { t: "Quantifier le stress mécanique (volume, fréquence, intensité, terrain) et le réduire, puis reprise par paliers d'environ 10 % par semaine" },
      { t: "Consultation en physiothérapie : renforcement progressif" }] },
    { titre: "Analgésie", items: C.mesures.analgesie },
    { titre: "Infiltration intra-articulaire du genou", si: L => L.age === null || L.age >= 40, items: [
      { t: "Triamcinolone 40 mg (aussi efficace que 80 mg) ; bénéfice surtout de 1 à 6 sem, nul à 6 mois ; espacer d'au moins 3–4 mois", src: "Jüni et coll., 2015, Cochrane" },
      { t: "Jamais avant d'avoir exclu une infection ; éviter dans les 3 mois précédant une arthroplastie ; aviser les diabétiques d'une hausse transitoire de la glycémie" }] },
    { titre: "Pour tous", items: [
      { t: "Enseignement : nature de l'atteinte, pronostic, autogestion" },
      { t: "Consignes de reconsultation : fièvre, genou chaud et enflé, blocage, mollet enflé, douleur nocturne" }] },
  ];

  /* ---------- Textes du bouton « i » : pourquoi on le demande, comment faire le test, positif si, vidéo (recherche Physiotutors) ---------- */
  const INFOS = {
    apprehension_inv: { info: "Test d'appréhension dynamique inversé (Zimmermann 2019) : instabilité rotulienne latérale, Se 93,7 %, Sp 88,2 % (RV+ 7,9 ; RV− 0,07). Description du geste à confirmer : demandée à OpenEvidence." },
    tilt: { info: "Genou tendu, on soulève le bord latéral de la rotule : une inclinaison réduite témoigne d'un rétinaculum latéral tendu. Syndrome fémoro-patellaire : RV+ 5,4 (Kasitinon 2021)." },
    quad_actif: { info: "Genou fléchi à 90°, pied tenu sur la table : la contraction du quadriceps ramène vers l'avant un tibia affaissé. LCP : Sp 97 % ; Se 98 % à l'origine (Daniel 1988), 54 % en étude indépendante (valeur retenue).", video: "Quadriceps active test" },
    premier: { info: "Une récidive oriente vers l'instabilité rotulienne, l'arthrose ou une arthrite récurrente ; un premier épisode traumatique, vers une blessure ligamentaire." },
    apparition: { info: "Un début traumatique oriente vers les ligaments, les ménisques et la rotule ; un début graduel ou insidieux, vers le fémoro-patellaire, les tendinopathies et l'arthrose ; un début subit sans traumatisme, vers une arthrite (cristaux, infection) ou une insuffisance sous-chondrale." },
    mecanisme: { info: "Pivot sur pied fixe : LCA, ménisque, rotule. Stress en valgus : LLI. Coup sur le tibia, genou fléchi : LCP. Accroupissement : ménisque." },
    pop: { info: "Un pop au moment de la blessure oriente vers une rupture du LCA." },
    enflure_rapide: { info: "Une hémarthrose en moins de 2 heures évoque une rupture du LCA, une luxation de la rotule ou une fracture." },
    enflure_tardive: { info: "Un épanchement qui apparaît en 6 à 24 heures évoque plutôt une lésion méniscale." },
    poursuivre: { info: "L'incapacité de poursuivre l'activité oriente vers une blessure importante, surtout du LCA." },
    ecchymose: { info: "Une ecchymose oriente vers une entorse ligamentaire (collatéral, LCA) ou une contusion." },
    rotule_sortie: { info: "La sensation que la rotule sort de place est très évocatrice d'une luxation ou d'une instabilité rotulienne." },
    localisation: { aide: "Plusieurs choix possibles", info: "Le siège oriente fortement : antérieur (fémoro-patellaire), pôle inférieur (tendon rotulien), interligne (ménisque, arthrose, collatéral), patte d'oie, face latérale (bandelette), creux poplité (kyste). Une fois un siège coché, les sièges non cochés comptent comme absents." },
    irradiation: { info: "Une irradiation le long du membre fait chercher une origine lombaire (L3–L4) ; vers la cuisse, une origine de la hanche." },
    pivots_agg: { info: "Une douleur en pivotant oriente vers le ménisque ou une instabilité (LCA, rotule)." },
    escaliers: { info: "Une douleur aux escaliers, surtout en descente, oriente vers le fémoro-patellaire et l'arthrose." },
    marche: { info: "Une douleur à la marche oriente vers l'arthrose, le ménisque ou une fracture d'insuffisance." },
    assis: { info: "Le « signe du cinéma » (douleur en position assise prolongée, genou fléchi) est typique du fémoro-patellaire." },
    accroupi: { info: "Une douleur accroupi ou à genoux oriente vers le fémoro-patellaire, le ménisque ou une bursite prépatellaire." },
    course_saut: { info: "Une douleur à la course ou au saut oriente vers la tendinopathie rotulienne, la bandelette ilio-tibiale ou une apophysite." },
    hyperext_agg: { info: "Une douleur en hyperextension, debout genoux verrouillés, oriente vers le syndrome du coussinet adipeux (Hoffa)." },
    moment: { info: "Pire le matin et mieux en bougeant : arthrite inflammatoire. Pire en fin de journée et après l'effort : atteinte mécanique." },
    nocturne: { info: "Une douleur nocturne oriente vers une arthrite ou une fracture d'insuffisance ; sans traumatisme chez un jeune, elle fait éliminer une tumeur." },
    reveils: { info: "Des réveils en deuxième partie de nuit, avec raideur matinale prolongée, évoquent une arthrite inflammatoire." },
    raideur: { info: "Plus de 30 minutes : arthrite inflammatoire. Moins de 30 minutes : arthrose." },
    derobade: { info: "Les dérobements évoquent une instabilité ligamentaire (LCA) ou rotulienne ; une inhibition du quadriceps par la douleur peut aussi les donner." },
    blocage: { info: "Un blocage vrai (impossible d'étendre le genou) évoque une anse de seau méniscale ou un corps libre ; à distinguer des accrochages." },
    accrochage: { info: "Des accrochages évoquent une lésion méniscale ou chondrale, ou une plica." },
    enflure: { info: "Un genou qui enfle évoque une atteinte intra-articulaire (ménisque, ligament, arthrose, arthrite) plutôt que péri-articulaire." },
    rougeur_chaleur: { info: "Rougeur et chaleur évoquent une arthrite (cristaux, infection) ou une bursite septique." },
    douleur_hanche: { info: "Une douleur à la hanche ou à l'aine fait examiner la hanche : douleur référée au genou (arthrose, épiphysiolyse chez l'adolescent)." },
    douleur_dos: { info: "Une lombalgie fait penser à une douleur référée ou à une radiculopathie L3–L4." },
    atcd_genou: { info: "Une blessure ou une chirurgie antérieure (méniscectomie, LCA) augmente le risque d'arthrose et de nouvelle lésion." },
    obesite: { info: "L'obésité augmente le risque d'arthrose et de tendinobursite de la patte d'oie." },
    atcd_rhumato: { info: "Uvéite, psoriasis, MII, synovite, goutte ou pseudogoutte orientent vers une arthrite inflammatoire ou microcristalline." },
    atcd_familiaux: { info: "Des antécédents familiaux de polyarthrite, de spondylarthrite, de psoriasis ou de goutte augmentent la probabilité d'une arthrite inflammatoire." },
    fievre: { info: "Fièvre avec un genou enflé ou chaud : arthrite septique jusqu'à preuve du contraire (ponction)." },
    sympt_generaux: { info: "Drapeau rouge : tumeur ou atteinte systémique." },
    atcd_cancer: { info: "Drapeau rouge : métastase osseuse si la douleur est nocturne ou au repos." },
    risque_infection: { info: "Immunosuppression, diabète, prothèse, infiltration récente ou drogues injectables augmentent le risque d'arthrite septique." },
    mollet: { info: "Un mollet enflé ou douloureux fait éliminer une TVP ; un kyste poplité rompu peut l'imiter." },
    posture: { info: "Genu varum : arthrose médiale. Genu valgum : fémoro-patellaire, instabilité rotulienne. Flexum : arthrose ou épanchement. Recurvatum : hyperlaxité, syndrome de Hoffa." },
    arches: { info: "Des arches affaissées (pronation) augmentent la charge fémoro-patellaire." },
    demarche: { info: "Une boiterie ou une incapacité de mise en charge oriente vers une atteinte intra-articulaire, une fracture ou une arthrite ; chez l'adolescent, examiner la hanche." },
    trendelenburg: { info: "Appui unipodal : le bassin descend du côté opposé.", positif: "le bassin s'abaisse du côté de la jambe levée (faiblesse du moyen fessier)", video: "Trendelenburg test" },
    squat_bi: { info: "Une douleur antérieure à l'accroupissement est le signe le plus sensible du syndrome fémoro-patellaire (Se ≈ 91 %) ; une douleur à l'interligne oriente vers le ménisque." },
    duck_walk: { info: "Marche accroupie (en « canard »).", positif: "douleur à l'interligne ou incapacité : lésion de la corne postérieure du ménisque", video: "Duck walk test" },
    squat_uni: { info: "Un valgus dynamique traduit un contrôle insuffisant de la hanche, fréquent dans le fémoro-patellaire.", video: "Single leg squat test" },
    saut_bi: { info: "Une douleur au saut oriente vers la tendinopathie rotulienne ou une apophysite." },
    ex_chaleur: { info: "Chaleur ou rougeur : arthrite (cristaux, infection) ; l'absence de chaleur va avec l'arthrose (critère ACR)." },
    ex_tumefaction: { info: "Bourse prérotulienne : bursite. Tubérosité proéminente : Osgood-Schlatter. Masse poplitée : kyste. Élargissement osseux : arthrose." },
    flot: { info: "On chasse le liquide du récessus médial vers le haut, puis on frotte la face latérale du genou.", positif: "une vague de liquide revient remplir le creux médial", video: "Bulge test knee effusion" },
    glacon: { info: "On comprime le cul-de-sac supra-patellaire puis on appuie sur la rotule (choc rotulien).", positif: "la rotule rebondit sur la trochlée : épanchement modéré à important", video: "Patellar tap test" },
    p_rotule: { info: "Une sensibilité isolée de la rotule est un critère de la règle d'Ottawa." },
    p_facettes: { info: "Palpation des facettes médiale et latérale en déplaçant la rotule ; sensibles dans le fémoro-patellaire." },
    p_tendon_rot: { info: "Pôle inférieur de la rotule et tendon : tendinopathie rotulienne, Sinding-Larsen-Johansson, syndrome de Hoffa." },
    p_tta: { info: "Tubérosité tibiale sensible chez l'adolescent : Osgood-Schlatter." },
    p_poie: { info: "Face médiale, 3 à 5 cm sous l'interligne : tendinobursite de la patte d'oie." },
    p_interlignes: { info: "Une douleur à l'interligne oriente vers le ménisque (Se ≈ 63 %, Sp ≈ 77 %), mais aussi vers l'arthrose et le ligament collatéral." },
    p_lli: { info: "Trajet du LLI, de l'épicondyle médial au tibia : entorse du LLI." },
    p_lle: { info: "Trajet du LLE, de l'épicondyle latéral à la tête du péroné : entorse du LLE." },
    p_bit: { info: "Épicondyle fémoral latéral, environ 3 cm au-dessus de l'interligne : syndrome de la bandelette ilio-tibiale." },
    p_perone: { info: "Une sensibilité de la tête du péroné est un critère de la règle d'Ottawa." },
    p_poplite: { info: "Une masse ou une douleur au creux poplité oriente vers un kyste poplité." },
    p_rebords: { info: "La sensibilité des rebords osseux est un critère ACR de l'arthrose ; elle rend la sensibilité de la rotule non « isolée » pour Ottawa." },
    arom_flexion: { info: "Une flexion limitée par la raideur oriente vers l'arthrose ; limitée par la douleur, vers le ménisque ou un épanchement." },
    arom_extension: { info: "Un blocage mécanique de l'extension évoque une anse de seau méniscale ; un déficit par raideur, l'arthrose." },
    rrom_extension: { info: "Une extension contre résistance douloureuse oriente vers le tendon rotulien ou quadricipital, ou une apophysite." },
    lachman: { aide: undefined, info: "Patient couché, genou fléchi à 20–30° ; une main stabilise le fémur, l'autre tire le tibia vers l'avant.",
      positif: "translation antérieure augmentée par rapport à l'autre genou ou arrêt mou (sans butée franche)", video: "Lachman test" },
    tiroir_ant: { info: "Genou fléchi à 90°, pied stabilisé, traction antérieure du tibia.", positif: "translation antérieure augmentée par rapport à l'autre côté, arrêt mou", video: "Anterior drawer test knee" },
    tiroir_post: { info: "Genou fléchi à 90°, poussée postérieure sur le tibia.", positif: "translation postérieure augmentée, perte de la marche tibiale", video: "Posterior drawer test knee" },
    sag: { info: "Hanches et genoux fléchis à 90°, talons soutenus : on regarde le profil des tubérosités tibiales.", positif: "le tibia s'affaisse vers l'arrière", video: "Posterior sag sign" },
    valgus0: { info: "Stress en valgus, genou en extension complète.", positif: "ouverture médiale : atteinte de plusieurs structures (LLI, croisés, capsule)", video: "Valgus stress test knee" },
    valgus30: { info: "Stress en valgus, genou fléchi à 30°.", positif: "douleur sur le LLI (entorse de grade I ou II) ou ouverture médiale (laxité, grade III)", video: "Valgus stress test knee" },
    varus0: { info: "Stress en varus, genou en extension complète.", positif: "ouverture latérale : atteinte de plusieurs structures (LLE, coin postéro-latéral, croisés)", video: "Varus stress test knee" },
    varus30: { info: "Stress en varus, genou fléchi à 30°.", positif: "douleur sur le LLE ou ouverture latérale", video: "Varus stress test knee" },
    mcmurray: { info: "Flexion maximale, rotation externe (ménisque médial) ou interne (ménisque latéral) du tibia, puis extension en maintenant la rotation.",
      positif: "claquement palpable ou douleur reproduite à l'interligne", video: "McMurray test" },
    thessaly: { aide: undefined, info: "Appui unipodal sur le genou atteint fléchi à 20° ; le patient pivote le tronc trois fois de chaque côté en tenant les mains de l'examinateur.",
      positif: "douleur à l'interligne, accrochage ou blocage", video: "Thessaly test" },
    apley: { info: "Patient sur le ventre, genou à 90°, compression axiale par le talon avec rotation du tibia.", positif: "douleur à l'interligne (une douleur en traction évoque plutôt un ligament)", video: "Apley test" },
    mobilite_rotule: { info: "Glissement médial et latéral de la rotule, genou en extension, quadriceps relâché (en quadrants).", video: "Patellar mobility test" },
    clarke: { info: "Main sur le pôle supérieur de la rotule, le patient contracte le quadriceps.", positif: "douleur rétropatellaire ; peu spécifique, souvent douloureux même chez des genoux sains", video: "Clarke's test" },
    apprehension: { info: "Genou fléchi à 20–30°, poussée latérale sur la rotule.", positif: "appréhension, contraction de défense ou crainte de luxation", video: "Patellar apprehension test" },
    mcconnell: { aide: undefined, info: "Contraction isométrique du quadriceps à 0°, 30°, 60°, 90° et 120°, puis répétée avec une poussée médiale de la rotule.",
      positif: "douleur reproduite, qui diminue avec la poussée médiale", video: "McConnell test" },
    hoffa_test: { info: "Pression du pouce de part et d'autre du tendon rotulien, genou fléchi, puis extension passive.", positif: "douleur antérieure sous la rotule en fin d'extension", video: "Hoffa test" },
    elj: { info: "Le patient soulève la jambe en extension complète.", positif: "impossible : rupture de l'appareil extenseur (tendon quadricipital ou rotulien, fracture de la rotule)" },
    lag_ext: { info: "Extension active incomplète alors que l'extension passive est complète.", positif: "faiblesse ou rupture partielle de l'appareil extenseur", video: "Extensor lag knee" },
    noble: { info: "Patient sur le côté, pression du pouce sur l'épicondyle fémoral latéral en étendant le genou depuis 90°.", positif: "douleur vers 30° de flexion", video: "Noble compression test" },
    dial: { info: "Patient sur le ventre, rotation externe des deux pieds, genoux fléchis à 30° puis à 90°.",
      positif: "rotation externe de plus de 10° par rapport à l'autre côté : à 30° seulement, coin postéro-latéral ; à 30° et 90°, coin postéro-latéral et LCP", video: "Dial test" },
    crepitants: { info: "Des crépitants à la mobilisation orientent vers l'arthrose (critère ACR)." },
    ott_4pas: { info: "Incapable de faire 4 pas, en transférant le poids deux fois sur chaque jambe, immédiatement après la blessure et à l'examen." },
    ott_flexion: { info: "Critère d'Ottawa : flexion active du genou impossible jusqu'à 90°." },
    hanche_ri: { info: "Une rotation interne de la hanche limitée ou douloureuse fait penser à une douleur référée de la hanche (arthrose ; épiphysiolyse chez l'adolescent)." },
    fadir: { info: "Flexion, adduction et rotation interne de la hanche.", positif: "douleur à l'aine", video: "FADIR test" },
    pkb: { info: "Prone knee bend (étirement du nerf fémoral) : patient sur le ventre, flexion passive du genou.", positif: "douleur à la face antérieure de la cuisse : radiculopathie L2–L4", video: "Prone knee bend test" },
    reflexe_rot: { info: "Un réflexe rotulien diminué oriente vers une radiculopathie L4." },
    pouls_dim: { info: "Des pouls diminués après un traumatisme font éliminer une lésion vasculaire (luxation du genou)." },
    deficit_fibulaire: { info: "Un déficit du nerf fibulaire après un traumatisme fait éliminer une luxation du genou ou une lésion du coin postéro-latéral." },
  };

  /* Textes « i » tirés du document OpenEvidence (parties B, D, E et G) : complètent ou remplacent les textes ci-dessus. */
  const INFOS_OE = {
    mecanisme: { info: "Pivot sur pied fixe : LCA (Décary : pivot contre tout autre mécanisme, RV+ 5,0 ; avec un pop, RV+ 9,8), ménisque, rotule. Force externe en valgus : LLI (RV+ 2,0). Coup sur le tibia, genou fléchi : LCP. Accroupissement : ménisque. Un début traumatique non précisé n'a pas de valeur ; c'est le mécanisme qui compte." },
    pop: { info: "Pop seul : RV+ 2,3 pour le LCA en première ligne (Wagemakers 2010), donc peu utile isolé. Avec un traumatisme en pivot : RV+ 9,8 (Décary 2018)." },
    enflure_rapide: { info: "Hémarthrose immédiate : rupture du LCA dans 62–77 % des cas ; aussi luxation de la rotule et fracture. Avec un pivot et un Lachman positif : RV+ 17,5 pour la rupture complète (Décary 2018). Chez l'adolescent, 70 % des hémarthroses traumatiques cachent une lésion sérieuse." },
    derobade: { info: "LCA : utile surtout en combinaison (au moins 2 sur 3 parmi enflure, pop et dérobements : RV+ 2,5 ; les 3 : RV+ 17,7 ; Wagemakers 2010). Ménisque : Se 43,5 %, Sp 84 % en cohorte chirurgicale. Gonarthrose : RV+ 1,24 seulement." },
    blocage: { info: "Blocage vrai : Se 55 %, Sp 96 % pour le ménisque en cohorte chirurgicale, mais très variable sur 38 études (Se 32–69 %, Sp 45–74 %) et non associé au diagnostic après 45 ans : valeur prudente retenue. Chez le jeune, penser aussi au ménisque discoïde et à l'ostéochondrite." },
    accrochage: { info: "Index des symptômes méniscaux de Niu (clic, accrochage, dérobade, douleur localisée à un point) : la probabilité de lésion méniscale passe d'environ 16 % sans symptôme à 76 % avec les quatre." },
    enflure: { info: "Enflure rapportée : RV+ 1,6 pour le LCA (Wagemakers) ; elle va contre la gonarthrose (RV+ 0,73 ; Duong 2023) et oriente vers une arthrite (cristaux, infection, inflammatoire) ou une lésion intra-articulaire. Choc rotulien + gonflement noté par le patient : RV 3,6 pour un épanchement à l'IRM." },
    raideur: { info: "Raideur matinale de moins de 30 min : gonarthrose (Se 88 %, Sp 52 %). De 30 min ou plus : arthrite inflammatoire (PAR : Se 74–77 %, Sp 48–52 %, RV+ 1,6), pouvoir discriminant faible (aire sous la courbe 0,64–0,68 ; van Nies 2015)." },
    marche: { info: "Douleur à l'activité : presque toujours présente dans la gonarthrose (Se 95 %) mais peu spécifique (Sp 19 %). Avec l'âge de 45 ans ou plus et une raideur de 30 min ou moins, c'est la règle NICE (Se 84 %, Sp 85 %, RV+ 5,6 ; RV− 0,19)." },
    escaliers: { info: "Une douleur aux escaliers, surtout en descente, oriente vers le fémoro-patellaire (critère du guide de l'APTA) et l'arthrose ; elle compte comme douleur à l'activité dans la règle NICE." },
    assis: { info: "Douleur en position assise prolongée : critère du guide de l'APTA pour le fémoro-patellaire, sans sensibilité ni spécificité publiées isolément." },
    squat_bi: { info: "Douleur antérieure à l'accroupissement : Se 91 %, Sp 50 % pour le fémoro-patellaire ; un accroupissement indolore rend ce diagnostic peu probable (RV− 0,18). Fait aussi partie de la grappe « 2 sur 3 » (RV+ 4,0)." },
    duck_walk: { info: "Accroupissement profond ou marche en canard : Se 75–77 %, Sp 36–42 % pour une lésion méniscale à l'IRM (RV+ 1,2–1,3) : peu discriminant.", positif: "douleur ou impossibilité à la marche accroupie", video: "Duck walk test" },
    posture: { info: "Genu varum ou valgum : facteur de risque de gonarthrose (rapport de cotes 1,49 pour la survenue, 3,59 pour la progression médiale), pas un signe diagnostique. L'alignement normal fait partie de la grappe de Décary pour la lésion méniscale dégénérative." },
    ex_tumefaction: { info: "Élargissement osseux : Se 55 %, Sp 95 %, RV+ 11 pour la gonarthrose, l'un des signes d'examen les plus forts. Bourse prépatellaire enflée : bursite (septique dans environ un tiers des cas). Tubérosité tibiale proéminente : Osgood-Schlatter." },
    crepitants: { info: "Crépitus à la mobilisation : Se 89 %, Sp 58–60 % pour la gonarthrose ; son absence la rend peu probable (RV− 0,19). Critère de l'ACR." },
    p_interlignes: { info: "Douleur à l'interligne : Se 63 %, Sp 77 % pour le ménisque (RV+ 2,7 ; méta-analyse de Hegedus). Interligne médial douloureux avec un traumatisme en pivot et une douleur médiale : RV+ 8,9 (Décary)." },
    p_facettes: { info: "Facettes rotuliennes douloureuses : avec un âge de moins de 40 ans, grappe de Décary pour le fémoro-patellaire (RV+ 8,7). La palpation rotulienne fait aussi partie de la grappe « 2 sur 3 »." },
    rrom_extension: { info: "Douleur à l'extension résistée : oriente vers le tendon rotulien, l'apophysite et le fémoro-patellaire (grappe « 2 sur 3 » : RV+ 4,0)." },
    lachman: { info: "Genou fléchi à 20–30°, translation antérieure du tibia avec arrêt mou. Méta-analyse bivariée : Se 81 %, Sp 85 %, RV+ 5,7, RV− 0,24 (Sokal 2022) ; dans la cohorte de Décary, le Lachman seul atteignait RV+ 38,4. Lachman négatif sans pivot ni pop : RV− 0,08.", positif: "translation antérieure augmentée ou arrêt mou", video: "Lachman test" },
    tiroir_ant: { info: "Genou à 90°, tibia tiré vers l'avant. Se 83 %, Sp 85 %, RV+ 6,3 (Sokal 2022) ; en première ligne, RV+ 2,0 seulement (Wagemakers 2010).", positif: "translation antérieure augmentée", video: "Anterior drawer test knee" },
    tiroir_post: { info: "Genou à 90°, tibia poussé vers l'arrière. Rupture chronique du LCP : Se 90 %, Sp 99 % (Rubinstein 1994).", positif: "translation postérieure augmentée", video: "Posterior drawer test knee" },
    sag: { info: "Hanches et genoux à 90°, regarder le profil du tibia. Avalement postérieur : Se 79 %, Sp 100 % pour le LCP (Lubowitz 2008).", positif: "tibia affaissé vers l'arrière", video: "Posterior sag sign" },
    valgus30: { info: "Stress en valgus genou à 30° (LLI isolé). À l'IRM : douleur Se 78 %, Sp 67 % (RV+ 2,3) ; laxité Se 91 %, Sp 49 % ; un test normal rend la lésion peu probable (RV− 0,18 ; Kastelein 2008). Laxité aussi en extension complète : lésion combinée.", positif: "douleur ou ouverture médiale", video: "Valgus stress test knee" },
    mcmurray: { info: "Méta-analyse de Hegedus : Se 70 %, Sp 71 % (RV+ 2,4) ; peu utile seul.", positif: "clic ou douleur à l'interligne pendant la rotation en extension", video: "McMurray test" },
    thessaly: { info: "Appui unipodal, genou à 20°, rotations du tronc. Dans la plus grande étude (Goossens 2015, n = 593, arthroscopie) : Se 64 %, Sp 53 %, RV+ 1,37 : peu discriminant.", positif: "douleur à l'interligne ou sensation de blocage", video: "Thessaly test" },
    apley: { info: "Patient sur le ventre, genou à 90°, compression et rotation. Se 60 %, Sp 70 % (Hegedus 2007).", positif: "douleur à l'interligne en compression", video: "Apley test" },
    apprehension: { info: "Test d'appréhension mobile (Ahmad 2009) : Se 100 %, Sp 88,4 % pour l'instabilité rotulienne latérale ; négatif, il l'exclut presque.", positif: "appréhension ou contraction réflexe quand la rotule est poussée latéralement en flexion", video: "Moving patellar apprehension test" },
    flot: { info: "Épanchement : oriente vers une lésion intra-articulaire (LCA, ménisque, fracture) ou une arthrite. Choc rotulien seul : RV 1,6 pour un épanchement à l'IRM après traumatisme." },
    arom_extension: { info: "Déficit d'extension avec douleur de l'interligne antérieur : Se 95 %, Sp 98 % pour une anse de seau du ménisque médial (Cerciello 2021). Un blocage vrai déclenche une alerte." },
    prom_flexion: { info: "Amplitude passive restreinte : Se 17 %, Sp 96 % pour la gonarthrose (RV+ 4,3)." },
    fievre: { info: "Fièvre : présente chez seulement 57 % des arthrites septiques ; son absence ne l'exclut pas. Avec un genou chaud et enflé, ponction le jour même." },
    atcd_rhumato: { info: "PAR connue : RV+ 2,5 pour une arthrite septique (Margaretten 2007). Goutte ou pseudogoutte antérieure : oriente vers une arthrite microcristalline. Psoriasis personnel ou familial : rhumatisme psoriasique." },
    ressaut: { info: "Un ressaut ou claquement oriente vers une plica (antéro-médial) ou, chez l'enfant, un ménisque discoïde (latéral, avec blocage ou perte d'extension)." },
    p_plica: { info: "Cordon douloureux palpable au bord antéro-médial de la rotule, parfois avec ressaut : syndrome de la plica.", positif: "cordon sensible qui roule sous le doigt, genou fléchi à 30–60°", video: "Medial plica test" },
    localisation: { info: "Le siège oriente fortement : antérieur (fémoro-patellaire ; isolé avant 40 ans, grappe de Décary RV+ 8,7), antéro-médial (plica), pôle inférieur (tendon rotulien, Sinding-Larsen), tubérosité (Osgood-Schlatter), interligne (ménisque, arthrose, collatéral), patte d'oie, face latérale (bandelette), creux poplité (kyste). Une fois un siège coché, les sièges non cochés comptent comme absents." },
    elj: { info: "Lever de la jambe tendue impossible : rupture de l'appareil extenseur (tendon quadricipital ou rotulien, fracture de la rotule) ; manquée au départ dans plus du tiers des cas. Chez le jeune : avulsion de la tubérosité tibiale, fracture en manchon de la rotule.", video: "Straight leg raise extensor mechanism" },
    ott_4pas: { info: "Critère d'Ottawa : incapable de faire 4 pas (2 transferts de poids sur chaque jambe) immédiatement après la blessure et à l'examen. La règle complète : Se 98,5 %, Sp 48,6 %, RV− 0,05." },
  };
  for (const [id, x] of Object.entries(INFOS_OE)) INFOS[id] = { ...INFOS[id], ...x };

  /* Critères cliniques de l'ACR (gonarthrose) : plus de 50 ans, raideur matinale de moins de 30 min, crépitus, sensibilité
     osseuse, élargissement osseux, pas de chaleur. Retourne le nombre présent et le nombre évalué. */
  function acr(L) {
    const items = [[L.age > 50, L.age !== null], [L.v("raideur") === "moins30", L.repondu("raideur")], [L.oui("crepitants"), L.repondu("crepitants")],
      [L.oui("p_rebords"), L.repondu("p_rebords")], [L.a("ex_tumefaction", "osseux"), L.repondu("ex_tumefaction")], [L.non("ex_chaleur"), L.repondu("ex_chaleur")]];
    return { oui: items.filter(x => x[0] && x[1]).length, evalues: items.filter(x => x[1]).length };
  }

  /* Réponses d'OpenEvidence du 24 nov. 2026 (outils/locomoteur/sources/openevidence-reponses/) : une valeur publiée remplace
     l'estimation quand l'étude porte sur cet élément ; sinon la remarque s'affiche dans Sources et limites. */
  const REVUES_OE = [
    { code: "GENO-P1", cle: "sfp|clarke>sfp", note: "OpenEvidence (24 nov. 2026) : valeurs exactes, mais pour la chondromalacie à l'arthroscopie, pas le syndrome fémoro-patellaire (Doberstein 2008)" },
    { code: "GENO-P2", cle: "menisque|blocage>menisque", se: 0.47, sp: 0.74, statut: "verifie", piste: "Niu et coll., 2011 (Arthritis Care Res) : blocage, 300 patients, diagnostic appuyé par l'IRM" },
    { code: "GENO-P3", cle: "tendino|p_tendon_rot>tendino", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P4", cle: "collat|valgus0|laxite", rv: {"laxite": 1.8, "normal": 0.18}, statut: "verifie", piste: "Kastelein et coll., 2008 (Am J Med, PMID 18954845), médecine familiale, IRM : laxité en valgus à 30°, Se 91 %, Sp 49 % ; « douleur sans laxité » : estimation" },
    { code: "GENO-P5", cle: "collat|varus0|laxite", note: "OpenEvidence (24 nov. 2026) : Se d'environ 25 % (petite série à l'urgence) ; aucune spécificité publiée" },
    { code: "GENO-P6", cle: "rotule|rotule_sortie>rotule", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P7", cle: "bit|localisation.laterale>bit", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P8", cle: "bprep|localisation.prerotulienne>bprep", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P9", cle: "bprep|ex_tumefaction.prerotulienne>bprep", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P10", cle: "poie|localisation.patte_oie>poie", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P11", cle: "poie|p_poie>poie", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P12", cle: "osgood|localisation.tuberosite>osgood", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P13", cle: "osgood|p_tta>osgood", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P14", cle: "slj|localisation.pole_inf>slj", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P15", cle: "slj|p_tendon_rot>slj", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P16", cle: "plica|p_plica>plica", se: 0.9, sp: 0.89, statut: "verifie", piste: "Stubbings et coll., 2014 (Knee, méta-analyse, PMID 24280039) : test MPP, populations chirurgicales (surestimation probable)" },
    { code: "GENO-P17", cle: "cristaux|atcd_rhumato.goutte>cristaux", rvp: 2, rvn: 0.56, statut: "verifie", piste: "Janssens et coll., 2010 (Arch Intern Med), médecine familiale, monoarthrite, cristaux à la ponction : goutte rapportée par le patient, Se 61 %, Sp 70 %" },
    { code: "GENO-P18", cle: "cristaux|atcd_rhumato.pseudogoutte>cristaux", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P19", cle: "cristaux|ex_chaleur>cristaux", rvp: 1.2, rvn: 0.45, statut: "verifie", piste: "Janssens et coll., 2010 (Arch Intern Med), médecine familiale : rougeur, Se 90 %, Sp 24 % pour la goutte ; chaleur et chondrocalcinose : aucune donnée" },
    { code: "GENO-P20", cle: "septique|enflure>septique", note: "OpenEvidence (24 nov. 2026) : enflure, Se 78 % dans l'arthrite septique (Margaretten 2007) ; aucune spécificité publiée" },
    { code: "GENO-P21", cle: "septique|risque_infection.prothese>septique", rvp: 3.1, rvn: 0.73, statut: "verifie", piste: "Margaretten et coll., 2007, JAMA (données de Kaandorp, 1995) : prothèse de hanche ou de genou, Se 35 %, Sp 89 %" },
    { code: "GENO-P22", cle: "septique|ex_chaleur>septique", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P23", cle: "septique|flot|negatif", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P24", cle: "baker|localisation.posterieure>baker", note: "OpenEvidence (24 nov. 2026) : aucune donnée publiée pour cet élément" },
    { code: "GENO-P25", cle: "baker|ex_tumefaction.poplitee>baker", rvp: 6.3, rvn: 0.3, statut: "verifie", piste: "Tang et coll., 2026 (Front Med, méta-analyse, PMID 41939773) : examen physique, Se 74 %, Sp 88 %" },
  ];
  window.Locomoteur.definir({
    frequencesRevues: { date: "2026-11-24", source: "outils/locomoteur/sources/openevidence-reponses/2026-11-24-genou-hanche-lombaire.md", verdict: "Aucune courbe confirmée ; rapports femmes-hommes et quelques fréquences corrigés là où des données publiées les contredisent" },
    revues: REVUES_OE,
    id: "genou", partie: "genou", en: "knee", rc: "Douleur au genou",
    titre: "Douleur au genou", version: "Version 0.5 · novembre 2026", ages: "12 ans et plus", infos: INFOS, conduites: CONDUITES, mesures: MESURES, anglais: ANGLAIS,

    /* ---------- Diagnostics : probabilité de départ par âge (points [âge, probabilité]) et multiplicateur de cote du sexe ----------
       Les probabilités de départ restent des estimations (provisoires) ; « repere » donne les fréquences publiées qui les
       guident (document OpenEvidence du 21 novembre 2026, parties A et C : numéros de références de ces parties). */
    diagnostics: [
      { id: "sfp", nom: "Syndrome fémoro-patellaire", n: "syndrome fémoro-patellaire", base: [[12, .25], [16, .32], [28, .2], [45, .1], [55, .05], [70, .02]], sexe: { F: 1.5, M: .7 }, fiches: ["athlete-1"],
        repere: "28,9 % des adolescents par an ; 25–40 % des gonalgies avant 45 ans et en clinique du sport ; 20,4 % des diagnostics de surmenage chez l'enfant (A249–251, C176)" },
      { id: "arthrose", nom: "Arthrose du genou", n: "gonarthrose", base: [[12, .003], [16, .005], [28, .03], [45, .18], [55, .33], [70, .5], [85, .6]], sexe: { F: 1.25, M: .8 },
        fiches: ["50plus-61", "50plus-62"], liens: [{ t: "CRDS : arthrose invalidante du genou", u: "/crds/?q=arthrose%20invalidante%20du%20genou" }],
        repere: "Symptomatique chez 12,1 % après 60 ans (environ 20 % après 65 ans) ; risque sur la vie d'environ 45 % ; 7,8 % à 45–64 ans (A216–248, C179)" },
      { id: "menisque", nom: "Déchirure méniscale", n: "déchirure méniscale", base: [[12, .03], [16, .06], [28, .09], [45, .12], [60, .12], [75, .1]], sexe: { M: 1.2, F: .85 }, fiches: ["athlete-5", "50plus-63"],
        liens: [{ t: "CRDS : déchirure méniscale", u: "/crds/?q=d%C3%A9chirure%20m%C3%A9niscale" }],
        repere: "61–79/100 000/an ; 9 % des gonalgies de l'adulte en première ligne ; fortuite chez 19 % des adultes indolores de plus de 40 ans (A4, A252, C2)" },
      { id: "lca", nom: "Rupture du LCA", n: "rupture du LCA", base: [[12, .03], [16, .06], [25, .06], [40, .03], [55, .015], [70, .008]], sexe: { F: 1.2, M: .9 }, fiches: ["athlete-6"],
        liens: [{ t: "CRDS : rupture du ligament croisé", u: "/crds/?q=ligament%20crois%C3%A9" }],
        repere: "68,6/100 000 p-a ; pic de 228 chez les filles de 14–18 ans ; 4 % des gonalgies aiguës de l'adulte ; 15,4 % des adultes consultant pour le genou (Décary 2018) ; 22–40 % des hémarthroses de l'adolescent (A261, C7)" },
      { id: "lcp", nom: "Entorse du LCP", n: "entorse du LCP", base: [[12, .004], [25, .01], [50, .008], [70, .004]], sexe: { M: 1.3, F: .75 },
        repere: "Isolée : 1,8/100 000 ; 2,4–4,7 % des blessures du genou chez le sportif (A279, C189)" },
      { id: "collat", nom: "Entorse d'un ligament collatéral (LLI, LLE)", n: "entorse du ligament collatéral", base: [[12, .03], [16, .05], [28, .05], [50, .03], [70, .015]], fiches: ["athlete-4"],
        repere: "LLI : 27–34 % des lésions du genou en sport professionnel, 36,1 % au secondaire ; 7 % des gonalgies aiguës de l'adulte (A259–260, C6)" },
      { id: "rotule", nom: "Instabilité ou luxation de la rotule", n: "instabilité rotulienne", base: [[12, .05], [16, .07], [28, .03], [50, .006], [70, .003]], sexe: { F: 1.4, M: .75 }, fiches: ["athlete-9"],
        repere: "14–42/100 000 ; pics de 108–147 chez l'adolescent ; 36–43 % des hémarthroses de l'enfant (A265–266, C184)" },
      { id: "tendino", nom: "Tendinopathie rotulienne ou quadricipitale", n: "tendinopathie rotulienne", base: [[12, .03], [16, .06], [28, .06], [50, .03], [70, .02]], sexe: { M: 1.3, F: .8 },
        fiches: ["athlete-2", "50plus-68"], repere: "14 % des athlètes d'élite, environ 45 % au volley ; 1,6/1 000 p-a chez l'adulte (A255–257, C6)" },
      { id: "hoffa", nom: "Syndrome du coussinet adipeux (Hoffa)", n: "syndrome de Hoffa", base: [[12, .015], [25, .02], [50, .015], [70, .008]], repere: "Pas de fréquence publiée dans le document" },
      { id: "bit", nom: "Syndrome de la bandelette ilio-tibiale", n: "syndrome de la bandelette ilio-tibiale", base: [[12, .01], [16, .02], [28, .05], [50, .02], [70, .006]], fiches: ["athlete-3"],
        repere: "5–14 % des blessures de course ; 4,7 % chez l'enfant (A258, C7)" },
      { id: "bprep", nom: "Bursite prépatellaire", n: "bursite prépatellaire", base: [[12, .008], [16, .01], [28, .015], [50, .025], [70, .02]], sexe: { M: 1.5, F: .7 }, fiches: ["50plus-69"],
        repere: "Au moins 10/100 000/an ; 1,5 % des gonalgies de l'adulte (A146, A267, C190)" },
      { id: "poie", nom: "Tendinobursite de la patte d'oie", n: "tendinobursite de la patte d'oie", base: [[12, .003], [16, .005], [28, .01], [50, .05], [70, .06]], sexe: { F: 1.6, M: .65 },
        fiches: ["athlete-8", "50plus-64"], repere: "20 % des gonarthroses symptomatiques (17,5 %) (A262–263, C185)" },
      { id: "osgood", nom: "Maladie d'Osgood-Schlatter", n: "maladie d'Osgood-Schlatter", base: [[9, .06], [12, .2], [14, .18], [16, .08], [18, .015], [21, .002], [25, .0005]], sexe: { M: 1.4, F: .7 },
        fiches: ["athlete-7"], repere: "Environ 10 % à 12–15 ans (9,8 %) ; risque doublé par le sport (A253–254, C192)" },
      { id: "slj", nom: "Maladie de Sinding-Larsen-Johansson", n: "maladie de Sinding-Larsen-Johansson", base: [[9, .05], [11, .06], [13, .035], [15, .012], [17, .003], [20, .0005]], sexe: { M: 1.3, F: .8 },
        repere: "3ᵉ rang chez l'enfant ; pas d'incidence spécifique (A268–269, C174)" },
      { id: "contusion", nom: "Contusion ou entorse légère, sans lésion structurelle", n: "contusion simple", base: [[12, .1], [18, .12], [30, .12], [50, .09], [70, .07]], sexe: { M: 1.15, F: .9 },
        repere: "Entorse et contusion : 42 % des gonalgies aiguës de l'adulte en première ligne ; contusion : 15,2 % des blessures du genou chez le sportif (C6, C107)" },
      { id: "plica", nom: "Syndrome de la plica", n: "syndrome de la plica", base: [[12, .008], [18, .012], [30, .01], [50, .004], [70, .002]], repere: "Au plus 3 % des arthroscopies (A270–271)" },
      { id: "ocd", nom: "Ostéochondrite disséquante", n: "ostéochondrite disséquante", base: [[10, .015], [13, .025], [16, .015], [19, .005], [25, .001], [40, .0003]], sexe: { M: 1.8, F: .55 },
        repere: "39/100 000 chez les garçons de 11–15 ans ; 9,5/100 000 à 6–19 ans (A275–276, C3)" },
      { id: "discoide", nom: "Ménisque discoïde", n: "ménisque discoïde", base: [[8, .02], [12, .01], [16, .005], [20, .002], [30, .0005]],
        repere: "Lésion méniscale, dont ménisque discoïde : 13–15 % des hémarthroses de l'enfant (C184)" },
      { id: "cristaux", nom: "Goutte ou chondrocalcinose (arthrite microcristalline)", n: "arthrite microcristalline", base: [[12, .0005], [30, .003], [45, .01], [60, .025], [75, .045], [85, .06]], sexe: { M: 1.4, F: .75 },
        fiches: ["50plus-66"], liens: [{ t: "CRDS : arthropathie microcristalline", u: "/crds/?q=goutte" }],
        repere: "Genou atteint dans 74 % des arthrites à pyrophosphate ; chondrocalcinose 7 % à 60–69 ans, 43 % après 80 ans ; goutte 2 % des gonalgies de l'adulte (A184, A205, A264, C181, C174)" },
      { id: "arthrite", nom: "Arthrite inflammatoire (PAR, spondylarthrite, psoriasique)", n: "arthrite inflammatoire", base: [[12, .006], [16, .008], [28, .012], [50, .015], [70, .015]], sexe: { F: 1.3, M: .8 },
        liens: [{ t: "CRDS : arthropathie inflammatoire", u: "/crds/?q=arthrite" }], repere: "Polyarthrite rhumatoïde : 0,5 % des gonalgies de l'adulte (C174)" },
      { id: "septique", grave: true, nom: "Arthrite septique", n: "arthrite septique", base: [[12, .002], [40, .002], [65, .003], [80, .005], [90, .007]],
        repere: "0,3 % des gonalgies de l'adulte ; plus fréquente après 80 ans (RV 3,5) (C174, Margaretten 2007)" },
      { id: "baker", nom: "Kyste poplité (de Baker)", n: "kyste poplité", base: [[12, .003], [16, .005], [28, .01], [50, .04], [70, .06]], fiches: ["50plus-65"],
        repere: "27,9 % des sujets âgés à l'IRM ; 4,4 % des codes chez l'adulte (A263, C3)" },
      { id: "insuff", nom: "Fracture sous-chondrale d'insuffisance", n: "fracture sous-chondrale d'insuffisance", base: [[12, .0005], [45, .002], [60, .012], [75, .03], [90, .04]],
        sexe: { F: 1.6, M: .65 }, fiches: ["50plus-67", "50plus-70"], repere: "3,29 % des IRM du genou ; âge moyen 65 ans ; surtout chez la femme (C186–187)" },
    ],
    /* Reste calculé : aucun diagnostic précis (voir le moteur). Pas d'entité « gonalgie non spécifique » dans le document. */
    residuel: { id: "nonspec", nom: "Douleur non spécifique (aucun diagnostic précis)", n: "gonalgie non spécifique",
      explication: "Probabilité qu'aucun des diagnostics de la liste ne soit en cause : elle monte quand les éléments spécifiques sont absents ou négatifs. Penser aussi à une douleur référée (hanche, lombaire).",
      conduite: [
        { t: "Rassurer : pas de lésion précise retrouvée ; réévaluer si la douleur persiste ou change" },
        { t: "Mesures générales : dosage de la charge, exercices de renforcement de la hanche et du genou, analgésie de base en cure courte", src: "Collins et coll., 2018, BJSM" },
        { t: "Revoir dans 4–6 sem ; examiner la hanche et la colonne lombaire (douleur référée) ; imagerie seulement si la douleur persiste ou si un drapeau rouge apparaît" }] },
    /* Diagnostics qui coexistent souvent : ils ne se font pas concurrence (les autres, oui ; voir le moteur). Provisoire. */
    compatibles: [["lca", "menisque"], ["lca", "collat"], ["menisque", "collat"], ["lca", "lcp"], ["lcp", "collat"], ["arthrose", "menisque"], ["arthrose", "baker"], ["menisque", "baker"],
      ["arthrose", "poie"], ["arthrose", "arthrite"], ["arthrite", "baker"], ["sfp", "bit"], ["rotule", "sfp"], ["sfp", "hoffa"], ["tendino", "hoffa"], ["arthrose", "insuff"],
      ["arthrose", "cristaux"], ["cristaux", "baker"], ["insuff", "menisque"], ["osgood", "slj"], ["osgood", "sfp"], ["slj", "sfp"], ["plica", "sfp"], ["discoide", "menisque"], ["ocd", "sfp"]],

    /* ---------- Grappes : combinaisons validées ; leur RV remplace celui des éléments qu'elles couvrent ----------
       Parties B, E et G du document OpenEvidence. Une seule grappe compte par élément : la plus forte. */
    grappes: [
      { id: "lca_pivot_pop", dx: "lca", nom: "Décary : traumatisme en pivot + pop", rv: 9.8, couvre: ["mecanisme", "pop"], statut: "verifie",
        piste: `${DECARY} : rupture partielle ou complète, RV+ 9,8 (5,6–17,3) ; validation interne 7,0`, si: L => L.v("mecanisme") === "pivot" && L.oui("pop") },
      { id: "lca_complete", dx: "lca", nom: "Décary : pivot + œdème immédiat + Lachman positif", rv: 17.5, couvre: ["mecanisme", "enflure_rapide", "lachman"], statut: "verifie",
        piste: `${DECARY} : rupture complète, RV+ 17,5 (9,8–31,5)`, si: L => L.v("mecanisme") === "pivot" && L.oui("enflure_rapide") && L.v("lachman") === "laxite" },
      { id: "lca_exclusion", dx: "lca", nom: "Décary : pas de pivot ou pas de pop, avec Lachman négatif", rv: .08, couvre: ["mecanisme", "pop", "lachman"], statut: "verifie",
        piste: `${DECARY} : exclusion, RV− 0,08 (0,03–0,24)`, si: L => (L.non("pop") || (L.repondu("mecanisme") && L.v("mecanisme") !== "pivot")) && L.v("lachman") === "normal" },
      { id: "lca_3sur3", dx: "lca", nom: "Wagemakers : enflure, pop et dérobements (3 sur 3)", rv: 17.7, couvre: ["enflure", "pop", "derobade"], statut: "verifie",
        piste: `${WAGEMAKERS} : RV+ 17,7 (2,2–145)`, si: L => L.oui("enflure") && L.oui("pop") && L.oui("derobade") },
      { id: "lca_2sur3", dx: "lca", nom: "Wagemakers : 2 sur 3 (enflure, pop, dérobements)", rv: 2.5, couvre: ["enflure", "pop", "derobade"], statut: "verifie",
        piste: `${WAGEMAKERS} : 2 sur 3 ou plus, Se 71 %, Sp 71 %, RV+ 2,5`, si: L => ["enflure", "pop", "derobade"].filter(id => L.oui(id)).length === 2 },
      { id: "lca_moins2", dx: "lca", nom: "Wagemakers : moins de 2 sur 3 (enflure, pop, dérobements)", rv: .41, couvre: ["enflure", "pop", "derobade"], statut: "verifie",
        piste: `${WAGEMAKERS} : RV− 0,41`, si: L => ["enflure", "pop", "derobade"].every(id => L.repondu(id)) && ["enflure", "pop", "derobade"].filter(id => L.oui(id)).length < 2 },
      { id: "men_trauma", dx: "menisque", nom: "Décary : pivot + douleur médiale + interligne médial douloureux", rv: 8.9, couvre: ["mecanisme", "localisation", "p_interlignes"], statut: "verifie",
        piste: `${DECARY_MEN} : lésion méniscale traumatique, RV+ 8,9 (6,1–13,1)`, si: L => L.v("mecanisme") === "pivot" && L.a("localisation", "interligne_med") && L.dans("p_interlignes", ["mediale", "deux"]) },
      { id: "men_degen", dx: "menisque", nom: "Décary : début progressif + douleur médiale + douleur aux pivots + alignement normal", rv: 6.4, couvre: ["apparition", "localisation", "pivots_agg", "posture"], statut: "verifie",
        piste: `${DECARY_MEN} : lésion méniscale dégénérative, RV+ 6,4 (4,0–10,4)`, si: L => L.dans("apparition", ["graduel", "insidieux"]) && L.a("localisation", "interligne_med") && L.oui("pivots_agg") && L.v("posture") === "normale" },
      { id: "sfp_decary", dx: "sfp", nom: "Décary : moins de 40 ans + douleur antérieure isolée ou facettes rotuliennes douloureuses", rv: 8.7, couvre: ["localisation", "p_facettes"], statut: "verifie",
        piste: `${DECARY_SFP} : Sp 93 %, RV+ 8,7`, si: L => L.age !== null && L.age < 40 && ((Array.isArray(L.v("localisation")) && L.v("localisation").join() === "anterieure") || L.oui("p_facettes")) },
      { id: "sfp_2sur3", dx: "sfp", nom: "2 sur 3 : extension résistée, palpation rotulienne, accroupissement douloureux", rv: 4, couvre: ["rrom_extension", "p_facettes", "p_rotule", "squat_bi", "accroupi"], statut: "verifie",
        piste: `${MCCLINTON} : RV+ 4,0`, si: L => [L.oui("rrom_extension"), L.oui("p_facettes") || L.oui("p_rotule"), L.v("squat_bi") === "ant"].filter(Boolean).length >= 2 },
      { id: "sfp_moins2", dx: "sfp", nom: "Moins de 2 sur 3 : extension résistée, palpation rotulienne, accroupissement", rv: .5, couvre: ["rrom_extension", "p_facettes", "p_rotule", "squat_bi", "accroupi"], statut: "verifie",
        piste: `${MCCLINTON} : RV− 0,5`, si: L => L.repondu("rrom_extension") && (L.repondu("p_facettes") || L.repondu("p_rotule")) && L.repondu("squat_bi")
          && [L.oui("rrom_extension"), L.oui("p_facettes") || L.oui("p_rotule"), L.v("squat_bi") === "ant"].filter(Boolean).length < 2 },
      { id: "oa_acr4", dx: "arthrose", nom: "Critères cliniques de l'ACR : 4 sur 6 ou plus", rv: 7.6, se: .84, sp: .89, couvre: ["raideur", "crepitants", "p_rebords", "ex_tumefaction", "ex_chaleur", "arthrose-osseux"], statut: "verifie",
        piste: `${GELBER} : 4 sur 6, Se 84 %, Sp 89 % (RV calculé)`, si: L => acr(L).oui >= 4 },
      { id: "oa_acr3", dx: "arthrose", nom: "Critères cliniques de l'ACR : 3 sur 6", rv: 3.1, se: .95, sp: .69, couvre: ["raideur", "crepitants", "p_rebords", "ex_tumefaction", "ex_chaleur", "arthrose-osseux"], statut: "verifie",
        piste: `${GELBER} : 3 sur 6 ou plus, Se 95 %, Sp 69 % (RV calculé)`, si: L => acr(L).oui === 3 },
      { id: "oa_acr_neg", dx: "arthrose", nom: "Critères cliniques de l'ACR : moins de 3 sur 6", rv: .07, couvre: ["raideur", "crepitants", "p_rebords", "ex_tumefaction", "ex_chaleur", "arthrose-osseux"], statut: "verifie",
        piste: `${GELBER} : moins de 3 sur 6, RV− 0,07 (calculé)`, si: L => acr(L).evalues >= 5 && acr(L).oui < 3 },
      { id: "oa_nice", dx: "arthrose", nom: "Règle NICE : 45 ans ou plus, douleur à l'activité, raideur matinale de 30 min ou moins", rv: 5.6, se: .84, sp: .85, couvre: ["marche", "escaliers", "raideur"], statut: "verifie",
        piste: `${KING} : Se 84 %, Sp 85 % (RV calculé)`, si: L => L.age >= 45 && (L.oui("marche") || L.oui("escaliers")) && L.dans("raideur", ["aucune", "moins30"]) },
      { id: "oa_nice_neg", dx: "arthrose", nom: "Règle NICE négative", rv: .19, couvre: ["marche", "escaliers", "raideur"], statut: "verifie",
        piste: `${KING} : RV− 0,19 (calculé)`, si: L => L.age !== null && L.repondu("marche") && L.repondu("raideur") && !(L.age >= 45 && (L.oui("marche") || L.oui("escaliers")) && L.dans("raideur", ["aucune", "moins30"])) },
    ],

    /* ---------- Questions ---------- */
    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(), C.cote("Genou atteint", "Droit", "Gauche", { sfp: 1.8, arthrose: 1.5, arthrite: 1.8, cristaux: 1.2, osgood: 1.6, slj: 1.6, ocd: 1.3, discoide: 1.5, tendino: 1.4, poie: 1.3, bit: 1.2, hoffa: 1.2, contusion: .3, septique: .2,
          lca: .3, lcp: .3, collat: .3, menisque: .5, rotule: .8, bprep: .5, baker: .8, insuff: .7 }, "Douleur aux deux genoux"), C.accompagne(), C.refere(),
        C.travail({ physique: { arthrose: 1.2, menisque: 1.2 }, genoux: { bprep: 3, menisque: 1.3, arthrose: 1.2 } }),
        C.travailPrecision(),
        C.sport({ aucun: { lca: .5, rotule: .7, tendino: .5, bit: .4, sfp: .8, collat: .7 }, marche: { arthrose: 1.1, poie: 1.2 },
          course: { bit: 2.5, sfp: 1.5, tendino: 1.2 }, velo: { bit: 1.8, sfp: 1.3 },
          pivot: { lca: 2, menisque: 1.4, rotule: 1.5, tendino: 2, osgood: 1.5, slj: 1.5, collat: 1.5, contusion: 1.2, plica: 1.2, ocd: 1.3 }, raquette: { menisque: 1.3, lca: 1.3, tendino: 1.3 },
          contact: { collat: 2, lca: 1.6, lcp: 2, menisque: 1.3, contusion: 1.5 }, glisse: { lca: 2, collat: 2 }, danse: { rotule: 1.6, sfp: 1.4, hoffa: 1.5, tendino: 1.4, osgood: 1.3, slj: 1.3},
          muscu: { tendino: 1.3, sfp: 1.2 }, natation: { collat: 1.5, sfp: 1.1 } }),
        C.sportPrecision(), ...C.hdv(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(),
        ouiNon("atcd_genou", "Blessure ou chirurgie antérieure à ce genou", { oui: "blessure ou chirurgie antérieure à ce genou", nie: "blessure au genou",
          effets: { arthrose: p(1.8, .85), menisque: p(1.4, .95), lca: p(1.2, 1), rotule: p(1.5, .95) } }),
        C.atcdMedicaux(),
        ouiNon("obesite", "Obésité (IMC 30 ou plus)", { oui: "obésité", non: "", effets: { arthrose: p(1.6, .85), poie: p(1.8, .8), cristaux: p(1.5, .9) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux({ arthrite: p(1.5, .9), cristaux: p(1.3, .95) }), C.atcdRhumato("arthrite", 4, 2.5, { cristaux: "cristaux", septique: "septique" }),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ lca: p(1.5, .7), collat: p(1.5, .6), menisque: p(1.2, .9), arthrose: p(.7, 1.5), rotule: p(.7, 1.6), arthrite: p(.7, 1.5), cristaux: p(.5, 1.8), sfp: p(.8, 1.3), contusion: p(1.3, .7) }),
          C.depuis(), C.contexte(),
          C.duree({ lt7: { lca: 2, collat: 2.5, menisque: 1.3, rotule: 1.5, lcp: 2, arthrose: .4, tendino: .4, sfp: .5, poie: .5, osgood: .6, slj: .6, arthrite: 1, cristaux: 2.5, septique: 2.5, contusion: 2.5, bprep: 1.5, bit: .6, insuff: 1.5, ocd: .6, plica: .6 },
            s1_6: { lca: 1.3, collat: 1.3, menisque: 1.2, arthrose: .7, tendino: .8, sfp: .9, contusion: 1.3 }, s6_12: { arthrose: 1.1, tendino: 1.2, sfp: 1.2, lca: .7, collat: .5, contusion: .3, cristaux: .6, septique: .2 },
            gt3m: { arthrose: 1.8, tendino: 1.5, sfp: 1.4, poie: 1.3, osgood: 1.3, slj: 1.3, hoffa: 1.2, lca: .5, collat: .3, arthrite: .8, cristaux: .3, septique: .1, contusion: .1, rotule: .8, insuff: .6, ocd: 1.3, plica: 1.3, discoide: 1.2 } }),
          C.apparition({ subit_trauma: { lca: 4, collat: 4, menisque: 2, rotule: 3, lcp: 4, bprep: 1.5, sfp: .3, arthrose: .3, tendino: .3, bit: .2, poie: .3, osgood: .4, slj: .4, arthrite: .3, cristaux: .3, septique: .3, baker: .5, insuff: .5, contusion: 6, ocd: .5, plica: .5, discoide: .7 },
            subit: { arthrite: 1.5, cristaux: 4, septique: 4, insuff: 3, menisque: 1.3, rotule: 1.2, lca: .3, collat: .3, sfp: .5, contusion: .2 },
            graduel: { sfp: 1.8, arthrose: 1.8, tendino: 1.8, bit: 2, poie: 1.6, osgood: 1.8, slj: 1.8, hoffa: 1.5, menisque: .8, rotule: .4, lca: .15, collat: .15, lcp: .2, plica: 1.5, ocd: 1.8, discoide: 1.3, contusion: .05, cristaux: .4, septique: .3 },
            insidieux: { sfp: 1.8, arthrose: 2, tendino: 1.5, bit: 1.5, poie: 1.6, osgood: 1.5, slj: 1.5, baker: 1.3, hoffa: 1.3, menisque: .8, rotule: .3, lca: .1, collat: .1, lcp: .2, plica: 1.5, ocd: 1.8, discoide: 1.5, contusion: .05, cristaux: .3, septique: .3, arthrite: 1.5 } }),
          choix("mecanisme", "Mécanisme", [
            o("pivot", "Pivot ou torsion, pied au sol", { menisque: 2, rotule: 2 }, { n: "pivot sur pied fixe" }),
            o("deceleration", "Décélération ou réception de saut", { menisque: 1.2 }, { n: "décélération ou réception de saut" }),
            o("valgus", "Coup ou stress en valgus (de l'extérieur)", { menisque: 1.2 }, { n: "stress en valgus" }),
            o("varus", "Coup ou stress en varus (de l'intérieur)", {}, { n: "stress en varus" }),
            o("direct", "Coup direct sur le genou", { bprep: 2 }, { n: "coup direct sur le genou" }),
            o("tibia", "Coup sur le tibia, genou fléchi (chute sur le genou, tableau de bord)", { lcp: 6 }, { n: "coup sur le tibia, genou fléchi" }),
            o("hyperext", "Hyperextension", { lcp: 1.5, hoffa: 1.5 }, { n: "hyperextension" }),
            o("accroupi", "En s'accroupissant ou en se relevant", { menisque: 3, collat: .3 }, { n: "en s'accroupissant" })],
            { si: trauma, masqueSi: "contexte", effets: [{ dx: "lca", opt: "pivot", rv: { pivot: 5 }, statut: "verifie", piste: `${DECARY} : pivot contre tout autre mécanisme (RV− 0,25 en l'absence de pivot)` },
              { dx: "lca", rv: { deceleration: 2.5, valgus: 1.5, varus: 1.2, direct: .6, hyperext: 2, accroupi: .3, tibia: .8 } },
              { dx: "collat", rv: { valgus: 2 }, statut: "verifie", piste: `${KASTELEIN} : traumatisme par une force externe sur la jambe, RV+ 2,0` },
              { dx: "collat", rv: { varus: 3, pivot: 1.2 } },
              { dx: "contusion", rv: { direct: 2.5, tibia: 1.5, pivot: .6, valgus: .8, varus: .8, deceleration: .8, accroupi: .5 } }] }),
          ouiNon("pop", "Pop au moment de la blessure", { si: trauma, oui: "pop", nie: "pop", effets: { lca: verRv(2.3, .51, `${WAGEMAKERS} : Se 63 %, Sp 73 %`), rotule: p(1.5, .9), menisque: p(1.2, .9), contusion: p(.4, 1.2) } }),
          ouiNon("enflure_rapide", "Œdème en moins de 2 heures", { si: trauma, oui: "œdème dans les 2 h", nie: "œdème rapide", g: "hemarthrose",
            effets: { lca: p(3, .4, { piste: `${DECARY} : épanchement immédiat RV+ 11,0, RV− 0,34, pour la rupture complète seulement ; « immédiat » non défini en heures (à confirmer)` }), rotule: p(2.5, .7), menisque: p(.8, 1), contusion: p(.3, 1.3), ocd: p(1.3, 1) } }),
          ouiNon("enflure_tardive", "Œdème après quelques heures (6 à 24 h)", { si: trauma, oui: "œdème dans les 24 h", non: "", effets: { menisque: p(2, .8), lca: p(.8, 1) } }),
          ouiNon("poursuivre", "A pu poursuivre l'activité", { si: trauma, oui: "a pu poursuivre l'activité", non: "incapable de poursuivre l'activité", effets: { lca: p(.5, 2), rotule: p(.7, 1.5), contusion: p(1.5, .6) } }),
          ouiNon("ecchymose", "Ecchymose", { si: trauma, oui: "ecchymose", nie: "ecchymose", g: "ecchymose", effets: { collat: p(2, .8), lca: p(1.3, .9), contusion: p(1.5, .9) } }),
          ouiNon("rotule_sortie", "Sensation que la rotule est sortie de place", { oui: "sensation que la rotule est sortie de place", nie: "sensation de luxation rotulienne", effets: { rotule: p(8, .4) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("anterieure", "Antérieure, autour de la rotule", { sfp: p(3, .3), rotule: p(1.5, .6), tendino: p(1.3, .8), osgood: p(.8, 1), slj: p(.8, 1), hoffa: p(1.3, .9) }, { n: "antérieure, autour de la rotule" }),
            m("prerotulienne", "Devant la rotule, superficielle", { bprep: p(6, .3, { g: "bprep" }) }, { n: "devant la rotule" }),
            m("pole_inf", "Sous la rotule (tendon rotulien)", { tendino: p(4, .4), osgood: p(.8, 1), slj: p(6, .3, { g: "slj" }), sfp: p(1.2, 1) }, { n: "pôle inférieur de la rotule" }),
            m("infrapat", "Sous la rotule, de chaque côté du tendon", { hoffa: p(4, .6), tendino: p(1.5, .9) }, { n: "de chaque côté du tendon rotulien" }),
            m("tuberosite", "Tubérosité tibiale", { osgood: p(6, .3, { g: "apo" }), slj: p(.5, 1.1), tendino: p(1.5, .9) }, { n: "tubérosité tibiale" }),
            m("anteromediale", "Antéro-médiale, au bord interne de la rotule", { plica: p(4, .5), sfp: p(1.2, 1), rotule: p(1.3, 1) }, { n: "antéro-médiale" }),
            m("interligne_med", "Interligne médial", { menisque: p(2.5, .5), arthrose: p(1.8, .7), collat: p(1.8, .7), poie: p(1.2, 1) }, { n: "interligne médial" }),
            m("interligne_lat", "Interligne latéral", { menisque: p(1.8, .8), discoide: p(3, .6), bit: p(1.5, .9), collat: p(1.3, .9), arthrose: p(1.2, .95) }, { n: "interligne latéral" }),
            m("patte_oie", "Médiale, sous l'interligne (patte d'oie)", { poie: p(5, .3), collat: p(1.2, 1) }, { n: "patte d'oie" }),
            m("laterale", "Latérale, au-dessus de l'interligne (bandelette)", { bit: p(5, .3), collat: p(1.2, .9) }, { n: "face latérale, au-dessus de l'interligne" }),
            m("posterieure", "Postérieure (creux poplité)", { baker: p(5, .5, { g: "baker" }), menisque: p(1.3, .95), lcp: p(1.5, .95) }, { n: "creux poplité" }),
            m("diffuse", "Diffuse, mal localisée", { arthrite: p(2, .8), cristaux: p(2, .8), septique: p(1.5, .9), sfp: p(1.3, 1), arthrose: p(1.3, 1) }, { n: "diffuse" }),
          ], { gabarit: "douleur a/n {v}", aide: "Plusieurs choix possibles. Une fois un siège coché, les sièges non cochés comptent comme absents." }),
          C.type({ pression: { sfp: 1.1, arthrose: 1.1 }, sourde: { arthrose: 1.2 }, aigue: { menisque: 1.3 }, pulsatile: { arthrite: 1.5, cristaux: 1.5, septique: 1.5 } }),
          choix("irradiation", "Irradiation", [o("aucune", "Aucune", {}, { n: "sans irradiation" }), o("cuisse", "Vers la cuisse ou la hanche", {}, { n: "irradiation vers la cuisse" }),
            o("mollet", "Vers le mollet", { baker: 1.5 }, { n: "irradiation vers le mollet" }), o("radiculaire", "Le long du membre (trajet radiculaire)", {}, { n: "irradiation le long du membre" })]),
          ...C.intensites(),
        ] },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("pivots_agg", "Pire en pivotant", { g: "facteurs", agg: "les pivots", aggNie: "aux pivots", effets: { menisque: p(1.8, .7), lca: p(1.5, .8), rotule: p(1.3, .9) } }),
          ouiNon("escaliers", "Pire dans les escaliers", { g: "facteurs", agg: "les escaliers", aggNie: "aux escaliers", effets: { sfp: p(1.8, .4), arthrose: p(1.5, .6), tendino: p(1.3, .8), menisque: p(1.1, .95), plica: p(1.3, .9) } }),
          ouiNon("marche", "Pire à la marche", { g: "facteurs", agg: "la marche", aggNie: "à la marche", effets: { arthrose: ver(.95, .19, `${DUONG} : douleur à l'activité`), menisque: p(1.2, .9), poie: p(1.3, .9), insuff: p(1.5, .9) } }),
          ouiNon("assis", "Pire en position assise prolongée", { g: "facteurs", agg: "la position assise prolongée", aggNie: "en position assise", effets: { sfp: p(2.5, .6), arthrose: p(1.2, .95), plica: p(1.3, .9) } }),
          ouiNon("accroupi", "Pire accroupi ou à genoux", { agg: "l'accroupissement et la position à genoux", aggNie: "aux squats", g: "accroupi",
            effets: { sfp: p(1.8, .5), menisque: p(1.6, .7), bprep: p(2, .6), tendino: p(1.3, .9), osgood: p(1.5, .8), slj: p(1.5, .8)} }),
          ouiNon("course_saut", "Pire à la course ou au saut", { g: "facteurs", agg: "la course ou les sauts", aggNie: "aux sauts", effets: { tendino: p(2.5, .4), bit: p(2, .5), sfp: p(1.5, .7), osgood: p(2, .6), slj: p(2, .6), ocd: p(1.5, .8), plica: p(1.3, .9) } }),
          ouiNon("hyperext_agg", "Pire genou en hyperextension (debout, genoux verrouillés)", { g: "facteurs", agg: "l'hyperextension", aggNie: "en hyperextension", effets: { hoffa: p(3, .8) } }),
          C.attenuants(),
          C.moment({ matin: { arthrite: 2.5, arthrose: .9, sfp: .7 }, soir: { arthrose: 1.4, sfp: 1.3, tendino: 1.3, menisque: 1.2, arthrite: .5 }, constante: { arthrite: 1.3, cristaux: 1.5, septique: 2 } }),
          C.nocturne({ arthrite: p(1.8, .7), cristaux: p(1.5, .9), septique: p(2, .7), arthrose: p(1.3, .9), insuff: p(2, .8), sfp: p(.6, 1.1), tendino: p(.7, 1.05) }),
          C.reveils({ arthrite: p(2.5, .8), cristaux: p(1.3, .95) }),
          C.raideur({}, [{ dx: "arthrose", rv: { moins30: 1.83, plus30: .23 }, statut: "verifie", piste: `${DUONG} : raideur matinale de moins de 30 min, Se 88 %, Sp 52 %` },
            { dx: "arthrite", rv: { plus30: 1.6, moins30: .44, aucune: .44 }, statut: "verifie", piste: `${VANNIES} : raideur matinale de 30 min ou plus (PAR, arthrite débutante), Se 74–77 %, Sp 48–52 %` }]),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("derobade", "Dérobements (le genou lâche)", { oui: "dérobements", nie: "dérobement",
            effets: { lca: verRv(1.6, .6, `${WAGEMAKERS} : Se 61 %, Sp 63 %`), rotule: p(2, .6), sfp: p(1.2, .95), menisque: ver(.435, .84, `${YAN} : dérobade`), arthrose: ver(.26, .79, `${DUONG} : dérobade, RV+ 1,24`), contusion: p(.6, 1.05) } }),
          ouiNon("blocage", "Blocages vrais (impossible d'étendre le genou)", { oui: "blocages vrais", nie: "blocage", effets: { menisque: est(2, .8, `Blocage : Se 55 %, Sp 96 % en cohorte chirurgicale (${YAN}), mais Se 32–69 %, Sp 45–74 % sur 38 études (${MCHUGH}) et non associé après 45 ans (Katz et coll., 2017) : valeur prudente`), arthrose: p(1.2, 1), discoide: p(3, .8), ocd: p(3, .85), plica: p(1.5, .95) } }),
          ouiNon("accrochage", "Accrochages", { oui: "accrochages", nie: "accrochage", effets: { menisque: p(1.5, .8), sfp: p(1.2, .95), arthrose: p(1.2, .95), ocd: p(2, .8), plica: p(1.5, .9), discoide: p(2, .9) } }),
          ouiNon("ressaut", "Ressaut ou claquement (le genou « saute »)", { oui: "ressaut", nie: "ressaut", effets: { discoide: p(4, .6), plica: p(2.5, .8), menisque: p(1.2, .95) } }),
          ouiNon("enflure", "Enflure du genou (actuelle ou récurrente)", { oui: "enflure du genou", nie: "enflure", g: "epanchement",
            effets: { lca: verRv(1.6, .8, `${WAGEMAKERS} (enflure rapportée au questionnaire)`), arthrite: p(2.5, .4), cristaux: p(3, .3), septique: p(4, .2), menisque: p(1.4, .8), arthrose: ver(.43, .41, `${DUONG} : gonflement rapporté, RV+ 0,73`), baker: p(1.5, .8), ocd: p(2, .8), discoide: p(1.3, .95), contusion: p(.5, 1.1),
              sfp: p(.4, 1.2), tendino: p(.5, 1.1), bit: p(.4, 1.1), osgood: p(.6, 1.05), slj: p(.6, 1.05), hoffa: p(.7, 1.05) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", nie: "rougeur", g: "inflammation", effets: { arthrite: p(2, .8), cristaux: p(4, .5), septique: p(4, .5), bprep: p(2.5, .85), arthrose: p(.6, 1) } }),
          ouiNon("douleur_hanche", "Douleur à la hanche ou à l'aine", { oui: "douleur à la hanche", nie: "douleur à la hanche" }),
          ouiNon("douleur_dos", "Lombalgie", { oui: "lombalgie", nie: "lombalgie" }),
          ouiNon("douleur_cheville", "Douleur à la cheville ou au pied", { oui: "douleur à la cheville", nie: "douleur à la cheville" }),
          C.autresArticulations({ arthrite: p(3, .8), cristaux: p(1.3, .95) }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ arthrite: p(1.5, .95), cristaux: p(1.4, .95), septique: p(3, .45, { piste: `${MARGARETTEN} : fièvre chez 57 % des arthrites septiques (Sp non rapportée)` }) }), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("prothese", "Prothèse du genou", { septique: p(5, 1), cristaux: p(.4, 1) }, { n: "prothèse du genou" }),
            m("infiltration", "Infiltration ou chirurgie récente du genou", { septique: ver(.24, .96, `${MARGARETTEN} : chirurgie articulaire récente, RV+ 6,9`) }, { n: "infiltration ou chirurgie récente" })], "septique"),
          ouiNon("mollet", "Mollet enflé, chaud ou douloureux", { oui: "œdème ou douleur au mollet", nie: "œdème du mollet", drapeau: true, effets: { baker: p(1.5, 1) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        C.fonctionnel({ valgum: { sfp: 1.3, rotule: 1.3, arthrose: 1.1 }, varum: { arthrose: 1.3, menisque: 1.1 }, plat: { sfp: 1.3 },
          demarche_normale: { arthrite: .7, cristaux: .7, septique: .4 }, boiterie: { lca: 1.3, menisque: 1.2, arthrite: 1.5, cristaux: 1.5, septique: 2, arthrose: 1.2, insuff: 1.5 }, appui: { arthrite: 2, cristaux: 2.5, septique: 3, lca: 1.5, insuff: 2 },
          squat_normal: { menisque: .8 }, squat_ant: { tendino: 1.5, hoffa: 1.3 }, squat_med: { menisque: 2, arthrose: 1.3 }, squat_lat: { menisque: 1.5, bit: 1.3 }, squat_limite: { arthrose: 1.5 },
          squatEffets: { sfp: ver(.91, .5, `${DUONG} : douleur antérieure à l'accroupissement ; indolore, le diagnostic est peu probable`, { pos: ["ant"], neg: ["normal"], g: "accroupi" }) },
          duckEffets: { menisque: ver(.76, .39, `${SNOEKER} : accroupissement profond ou marche en canard, Se 75–77 %, Sp 36–42 %`, { pos: ["positif"], neg: ["negatif"] }) },
          uni_valgus: { sfp: 1.5, rotule: 1.3 }, uni_douleur: { tendino: 1.5, sfp: 1.3 }, saut_douleur: { tendino: 2, osgood: 1.5, slj: 1.5}, trendelenburg: { sfp: 1.2 },
          recurvatum: { rotule: 1.3, hoffa: 1.5 }, flexum: { arthrose: 1.8, menisque: 1.2 }, appui_uni: { rotule: 1.3, lca: 1.3 }, saut_uni: { tendino: 2, osgood: 1.5, slj: 1.5} }),
        { titre: "Inspection", sep: ", ", toutNormal: true, questions: [
          ouiNon("ex_oedeme", "Œdème", { oui: "œdème", non: "pas d'œdème" }),
          ouiNon("ex_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", non: "pas de rougeur", g: "inflammation", effets: { arthrite: p(2.5, .7), cristaux: p(5, .4), septique: p(5, .4), bprep: p(2, .9), arthrose: p(.5, 1.1) } }),
          ouiNon("ex_ecchymose", "Ecchymose", { oui: "ecchymose", non: "", g: "ecchymose", effets: { collat: p(2, .8), lca: p(1.3, .95) } }),
          ouiNon("ex_atrophie", "Atrophie du quadriceps", { oui: "atrophie du quadriceps", non: "", effets: { arthrose: p(1.5, .9), lca: p(1.3, .95), sfp: p(1.2, .95) } }),
          multi("ex_tumefaction", "Tuméfaction localisée", [m("aucun", "Aucune", {}, { exclusif: true }),
            m("prerotulienne", "Devant la rotule (bourse)", { bprep: p(10, .2, { g: "bprep" }) }, { n: "tuméfaction prérotulienne" }),
            m("tuberosite", "Tubérosité tibiale proéminente", { osgood: p(3, .7, { g: "apo" }), slj: p(.7, 1) }, { n: "tubérosité tibiale proéminente" }),
            m("poplitee", "Masse au creux poplité", { baker: p(8, .4, { g: "baker" }) }, { n: "masse poplitée" }),
            m("osseux", "Élargissement osseux (ostéophytes)", { arthrose: ver(.55, .95, `${DUONG} ; ${KATZ} : élargissement osseux, RV+ 11`, { g: "arthrose-osseux" }) }, { n: "élargissement osseux" })], { aucun: "", gabarit: "{v}" }),
        ] },
        { titre: "Épanchement", toutNormal: true, questions: [
          choix("flot", "Flot (signe du flot)", [o("negatif", "Négatif", { arthrite: .4, cristaux: .4, septique: .2, contusion: 1.3, ocd: .7, lca: .5, menisque: .7, arthrose: .8, baker: .8, sfp: 1.2, tendino: 1.1, bit: 1.1 }, { n: "flot négatif" }),
            o("leger", "Légèrement positif", { menisque: 1.5, arthrose: 1.5, lca: 1.3, arthrite: 1.5, cristaux: 1.5, septique: 1.5, ocd: 1.5, sfp: .6 }, { n: "flot légèrement positif" }),
            o("positif", "Positif", { lca: 2, arthrite: 2, cristaux: 3, septique: 3, ocd: 1.5, contusion: .4, discoide: 1.2, menisque: 1.5, arthrose: 1.4, rotule: 1.5, sfp: .4, tendino: .5, bit: .4 }, { n: "flot positif" })], { g: "epanchement" }),
          choix("glacon", "Test du glaçon", [o("negatif", "Négatif", { lca: .7, arthrite: .7, cristaux: .7, septique: .5 }, { n: "test du glaçon négatif" }),
            o("positif", "Positif", { lca: 3, arthrite: 3, cristaux: 3, septique: 3, contusion: .3, ocd: 1.5, rotule: 2, menisque: 1.5, arthrose: 1.3, sfp: .3, tendino: .4, bit: .3 }, { n: "test du glaçon positif" })], { g: "epanchement" }),
        ] },
        { titre: "Palpation", res: PALP, toutNormal: true, labels: ["Douloureux", "Indolore"], questions: [
          ouiNon("p_rotule", "Rotule", { court: "rotule", genre: "f", effets: { rotule: p(1.3, .9), sfp: p(1.3, .9) } }),
          ouiNon("p_facettes", "Facettes rotuliennes", { court: "facettes rotuliennes", genre: "fp", horsNormal: true, effets: { sfp: p(2, .5, { g: "sfp-ex" }), rotule: p(1.3, .9) } }),
          ouiNon("p_tendon_rot", "Tendon rotulien (pôle inférieur)", { court: "tendon rotulien",
            effets: { tendino: est(1.8, .4, "Cook et coll., 2001 : palpation du tendon rotulien, sensible mais peu spécifique", { g: "tendino-ex" }), slj: p(5, .3, { g: "slj" }), hoffa: p(1.3, .9) } }),
          ouiNon("p_tendon_quad", "Tendon quadricipital", { court: "tendon quadricipital", effets: { tendino: p(2, .8, { g: "tendino-ex" }) } }),
          ouiNon("p_tta", "Tubérosité tibiale", { court: "tubérosité tibiale", genre: "f", effets: { osgood: p(5, .2, { g: "apo" }), slj: p(.6, 1.1), tendino: p(1.3, .9) } }),
          ouiNon("p_poie", "Patte d'oie", { court: "patte d'oie", genre: "f", effets: { poie: p(5, .3) } }),
          choix("p_interlignes", "Interlignes", [o("aucune", "Indolores", { arthrose: .8, collat: .8 }, { n: "interligne médial indolore ; interligne latéral indolore", normal: true }),
            o("mediale", "Médial douloureux", { arthrose: 1.5, collat: 1.5 }, { n: "interligne médial douloureux ; interligne latéral indolore" }),
            o("laterale", "Latéral douloureux", { collat: 1.3 }, { n: "interligne médial indolore ; interligne latéral douloureux" }),
            o("deux", "Médial et latéral douloureux", { arthrose: 1.5 }, { n: "interlignes médial et latéral douloureux" })],
            { effets: { menisque: ver(.63, .77, `${HEGEDUS} : douleur à l'interligne`, { pos: ["mediale", "laterale", "deux"], neg: ["aucune"], g: "menisque-ex" }) } }),
          ouiNon("p_lli", "LLI", { court: "LLI", effets: { collat: p(3, .4, { g: "collat-ex" }) } }),
          ouiNon("p_lle", "LLE", { court: "LLE", effets: { collat: p(3, .8, { g: "collat-ex" }) } }),
          ouiNon("p_bit", "Bandelette ilio-tibiale (épicondyle latéral)", { court: "bandelette ilio-tibiale", genre: "f", effets: { bit: p(4, .4, { g: "bit-ex" }) } }),
          ouiNon("p_perone", "Tête du péroné", { court: "tête du péroné", genre: "f", effets: { collat: p(1.5, .95) } }),
          ouiNon("p_poplite", "Creux poplité", { court: "creux poplité", effets: { baker: p(2.5, .7), lcp: p(1.5, .95) } }),
          ouiNon("p_retinaculum", "Bord médial de la rotule (rétinaculum)", { court: "bord médial de la rotule", horsNormal: true, effets: { rotule: p(3, .5, { g: "rotule-ex" }) } }),
          ouiNon("p_plica", "Cordon antéro-médial (plica)", { court: "cordon antéro-médial (plica)", horsNormal: true, effets: { plica: p(6, .4) } }),
          ouiNon("p_rebords", "Rebords osseux articulaires", { court: "rebords osseux", genre: "mp", horsNormal: true, effets: { arthrose: p(1.8, .8, { g: "arthrose-osseux" }), insuff: p(1.5, .9) } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_flexion", "Flexion active", "flexion", { complete: { arthrose: .6, menisque: .8, arthrite: .6, cristaux: .6}, fin: { menisque: 1.3, sfp: 1.2 },
            lim_douleur: { menisque: 1.5, arthrite: 1.8, cristaux: 1.8, septique: 2, lca: 1.4, arthrose: 1.3, baker: 1.3 }, lim_raideur: { arthrose: 2.5, arthrite: 1.3, cristaux: 1.3} }),
          C.degres("arom_flexion", "Flexion active mesurée"),
          C.amplitude("arom_extension", "Extension active", "extension", { complete: { menisque: .85, arthrose: .8 }, fin: { hoffa: 1.5 },
            lim_douleur: { menisque: 1.5, lca: 1.5, arthrite: 1.5, cristaux: 1.5, septique: 1.5, discoide: 1.5 }, lim_raideur: { arthrose: 2.5 }, blocage: { menisque: 4, discoide: 3, ocd: 2 } }, true),
          C.degres("arom_extension", "Déficit d'extension active", true),
        ] },
        { titre: "PROM", toutNormal: true, questions: [
          C.amplitude("prom_flexion", "Flexion passive", "flexion", { lim_douleur: { menisque: 1.3, arthrite: 1.5, cristaux: 1.5 } }, false,
            [{ dx: "arthrose", rv: { complete: .86, lim_douleur: 4.3, lim_raideur: 4.3 }, statut: "verifie", piste: `${DUONG} : amplitude restreinte, Se 17 %, Sp 96 %` }]),
          C.degres("prom_flexion", "Flexion passive mesurée"),
          C.amplitude("prom_extension", "Extension passive", "extension", { complete: { arthrose: .8 }, lim_raideur: { arthrose: 2 }, blocage: { menisque: 3 } }, true),
          C.degres("prom_extension", "Déficit d'extension passive", true),
        ] },
        { titre: "RROM", res: "rrom", toutNormal: true, labels: ["Douloureuse", "Indolore"], questions: [
          ouiNon("rrom_flexion", "Flexion résistée", { court: "flexion", genre: "f", effets: { poie: p(1.5, .9) } }),
          ouiNon("rrom_extension", "Extension résistée", { court: "extension", genre: "f", effets: { tendino: p(2, .6), osgood: p(1.5, .8), slj: p(1.5, .8), sfp: p(1.2, .95) } }),
        ] },
        { titre: "LCA", toutNormal: true, questions: [
          C.lig("lachman", "Lachman", "Lachman", { lca: ver(.81, .85, SOKAL, { pos: ["laxite"], neg: ["normal"] }) },
            { aide: "Genou fléchi à 20–30°, translation antérieure du tibia." }),
          C.lig("tiroir_ant", "Tiroir antérieur", "tiroir antérieur", { lca: ver(.83, .85, `${SOKAL} ; en soins primaires, Wagemakers 2010 : RV+ 2,0, RV− 0,3`, { pos: ["laxite"], neg: ["normal"] }) }),
        ] },
        { titre: "LCP", toutNormal: true, questions: [
          C.lig("tiroir_post", "Tiroir postérieur", "tiroir postérieur", { lcp: ver(.9, .99, RUBINSTEIN, { pos: ["laxite"], neg: ["normal"], g: "lcp-ex" }) }),
          ouiNon("sag", "Sag sign", { court: "sag sign", res: TEST, effets: { lcp: ver(.79, 1, `${LUBOWITZ} : avalement postérieur du tibia, Se 79 %, Sp 100 % (plafonnée à 99 %)`, { g: "lcp-ex" }) } }),
          ouiNon("quad_actif", "Test actif du quadriceps", { court: "test actif du quadriceps", res: TEST, horsNormal: true,
            effets: { lcp: lit(.54, .97, "Daniel et coll., 1988, J Bone Joint Surg Am (Se 98 % à l'origine) ; Se 54 % en étude indépendante (Badri et coll., 2018) ; Sp 97 %", { g: "lcp-ex" }) } }),
        ] },
        { titre: "LLI", fusion: "stress en valgus à 0° et 30°", toutNormal: true, questions: [
          C.lig("valgus0", "Stress en valgus à 0°", "stress en valgus à 0°", { collat: { rv: { normal: .7, douleur: 2, laxite: 5 }, g: "collat-ex" }, lca: { rv: { laxite: 2 } } }),
          C.lig("valgus30", "Stress en valgus à 30°", "stress en valgus à 30°",
            { collat: { rv: { normal: .18, douleur: 2.3, laxite: 2.3 }, g: "collat-ex", statut: "verifie", piste: `${KASTELEIN} (IRM) : douleur Se 78 %, Sp 67 % (RV+ 2,3, RV− 0,33) ; laxité Se 91 %, Sp 49 % (RV+ 1,78, RV− 0,18)` } }),
        ] },
        { titre: "LLE", fusion: "stress en varus à 0° et 30°", toutNormal: true, questions: [
          C.lig("varus0", "Stress en varus à 0°", "stress en varus à 0°", { collat: { rv: { normal: .9, douleur: 2, laxite: 5 }, g: "collat-ex" }, lca: { rv: { laxite: 1.5 } } }),
          C.lig("varus30", "Stress en varus à 30°", "stress en varus à 30°", { collat: { rv: { normal: .7, douleur: 2.5, laxite: 4 }, g: "collat-ex" } }),
        ] },
        { titre: "Ménisques", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          choix("mcmurray", "McMurray", [o("negatif", "Négatif", {}, { n: "McMurray négatif" }), o("med", "Positif médial", {}, { n: "McMurray positif médial" }), o("lat", "Positif latéral", {}, { n: "McMurray positif latéral" })],
            { effets: { menisque: ver(.7, .71, HEGEDUS, { pos: ["med", "lat"], neg: ["negatif"], g: "menisque-ex" }) } }),
          ouiNon("thessaly", "Thessaly (20°)", { court: "Thessaly", aide: "Appui unipodal, genou à 20°, rotations du tronc.",
            effets: { menisque: ver(.64, .53, `${GOOSSENS} : arthroscopie`, { g: "menisque-ex" }) } }),
          ouiNon("apley", "Apley", { court: "Apley", effets: { menisque: ver(.6, .7, HEGEDUS, { g: "menisque-ex" }) } }),
        ] },
        { titre: "Rotule", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          choix("mobilite_rotule", "Mobilité rotulienne", [o("normale", "Normale", {}, { n: "mobilité rotulienne normale et indolore" }), o("augmentee", "Augmentée", { rotule: 3 }, { n: "mobilité rotulienne augmentée" }),
            o("diminuee", "Diminuée", { arthrose: 1.5, sfp: 1.2 }, { n: "mobilité rotulienne diminuée" })]),
          ouiNon("clarke", "Clarke (rabot)", { court: "Clarke (rabot)", effets: { sfp: lit(.39, .67, "Nunes et coll., 2013 ou Cook et coll., 2012 (revues systématiques)", { g: "sfp-ex" }) } }),
          ouiNon("apprehension", "Appréhension rotulienne", { court: "appréhension rotulienne", genre: "f",
            effets: { rotule: ver(1, .884, `${AHMAD} : test d'appréhension mobile, Se 100 % (plafonnée à 99 %), Sp 88,4 %`, { g: "rotule-ex" }) } }),
          ouiNon("apprehension_inv", "Appréhension dynamique inversée", { court: "appréhension dynamique inversée", genre: "f", horsNormal: true,
            effets: { rotule: lit(.937, .882, "Zimmermann et coll., 2019, Knee Surg Sports Traumatol Arthrosc : RV+ 7,9 ; RV− 0,07", { g: "rotule-ex" }) } }),
          ouiNon("tilt", "Inclinaison de la rotule (tilt) réduite", { court: "test d'inclinaison de la rotule", horsNormal: true,
            effets: { sfp: est(5.4, undefined, "Kasitinon et coll., 2021, Curr Rev Musculoskelet Med ; APTA 2020 : RV+ 5,4", { g: "sfp-ex" }) } }),
          ouiNon("hoffa_test", "Pincement du fat pad (Hoffa)", { court: "pincement du fat pad (Hoffa)", res: "palp", effets: { hoffa: p(4, .4) } }),
          ouiNon("mcconnell", "McConnell", { court: "McConnell", aide: "Douleur en contraction isométrique à différents angles, soulagée par une poussée médiale de la rotule.", effets: { sfp: p(2, .7, { g: "sfp-ex" }) } }),
        ] },
        { titre: "Autres tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("dial", "Dial test", { court: "Dial test", horsNormal: true, effets: { lcp: p(3, .9), collat: p(2, .95) } }),
          choix("elj", "Élévation de la jambe tendue", [o("possible", "Possible", {}, { n: "élévation de la jambe tendue possible" }), o("impossible", "Impossible", {}, { n: "élévation de la jambe tendue impossible" })]),
          ouiNon("lag_ext", "Lag en extension", { court: "lag en extension", effets: { tendino: p(2, .95) } }),
          ouiNon("noble", "Noble", { court: "Noble", effets: { bit: p(4, .4, { g: "bit-ex" }) } }),
          ouiNon("crepitants", "Crépitants", { court: "crépitants", genre: "mp", res: "pres", horsNormal: true, effets: { arthrose: ver(.89, .59, `${DUONG} ; ${KATZ} : crépitus à la mobilisation`), sfp: p(1.2, .95) } }),
        ] },
        { titre: "Règle du genou d'Ottawa", si: L => L.trauma() && (!L.repondu("duree") || L.v("duree") === "lt7"), ligne: "Ottawa",
          aide: "Traumatisme de moins de 7 jours : radiographie si au moins un critère. Les réponses données ailleurs (âge, palpation) se recopient ici, et inversement.",
          questions: [
            miroir("ott_age", "age", "Âge (critère : 55 ans ou plus)"),
            ouiNon("ott_4pas", "Incapable de faire 4 pas, immédiatement après la blessure et à l'examen", { oui: "incapable de faire 4 pas", non: "4 pas possibles" }),
            ouiNon("ott_flexion", "Incapable de fléchir à 90°", { oui: "flexion à 90° impossible", non: "flexion à 90° possible" }),
            miroir("ott_rotule", "p_rotule", "Sensibilité de la rotule"),
            miroir("ott_rebords", "p_rebords", "Autre sensibilité osseuse du genou", { aide: "Si présente, la sensibilité de la rotule n'est plus « isolée »." }),
            miroir("ott_perone", "p_perone", "Sensibilité de la tête du péroné"),
          ] },
        { fin: true, questions: C.controlateral() },
        { titre: "Hanche", adjacent: "hanche", toutNormal: true, questions: [
          choix("hanche_ri", "Hanche : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation indolore" }), o("limitee", "Rotation interne limitée ou douloureuse", {}, { n: "rotation interne limitée ou douloureuse" })]),
          ouiNon("fadir", "FADIR", { court: "FADIR", res: TEST }),
        ] },
        { titre: "Lombaire", adjacent: "lombaire", sansCote: true, toutNormal: true, questions: [
          choix("lombaire_mob", "Lombaire : mobilité", [o("normale", "Indolore", {}, { n: "mobilité indolore" }), o("douleur", "Douleur reproduite", {}, { n: "douleur reproduite à la mobilisation" })]),
          ouiNon("pkb", "Prone knee bend", { court: "prone knee bend", res: TEST }),
          ouiNon("reflexe_rot", "Réflexe rotulien diminué", { oui: "réflexe rotulien diminué", non: "réflexe rotulien normal" }),
          ouiNon("deficit_l3l4", "Déficit de force ou de sensibilité L3–L4", { oui: "déficit L3–L4", non: "force et sensibilité L3–L4 normales" }),
        ] },
        { titre: "Cheville et neurovasculaire", adjacent: "cheville", toutNormal: true, questions: [
          choix("cheville_mob", "Cheville : mobilisation", [o("normale", "Indolore", {}, { n: "mobilisation indolore" }), o("douleur", "Douloureuse", {}, { n: "mobilisation douloureuse" })]),
          ouiNon("pouls_dim", "Pouls pédieux diminués ou absents", { oui: "pouls pédieux diminués", non: "pouls pédieux normaux" }),
          ouiNon("deficit_fibulaire", "Déficit du nerf fibulaire (dorsiflexion, dos du pied)", { oui: "déficit du nerf fibulaire", non: "" }),
        ] },
        C.autresObservations(),
      ] },
      C.investigations(),
      C.plan(),
    ],

    /* ---------- Règles : alertes hors du calcul des probabilités (« ro » : écrit « … à R/O » dans l'impression) ---------- */
    regles: [
      C.regles.age12,
      C.regles.septique("un genou", ["rougeur_chaleur", "ex_chaleur"], [["enflure", ["oui"]], ["flot", ["leger", "positif"]], ["glacon", ["positif"]]]),
      L => (L.a("ex_tumefaction", "prerotulienne") && (L.oui("ex_chaleur") || L.oui("rougeur_chaleur") || L.oui("fievre")))
        ? { niveau: "rapide", titre: "Bursite prépatellaire septique à éliminer", ro: "bursite septique", texte: "Bourse prépatellaire enflée avec chaleur, rougeur ou fièvre. Environ un tiers des bursites prépatellaires sont septiques, à S. aureus dans 80 %.",
          conduite: [{ t: "Ponction de la bourse : leucocytes > 3000/µL, neutrophiles > 50 %, Gram, culture", src: "Baumbach et coll., 2014 (PMID 24305696)" },
            { t: "Céphalexine 500 mg QID (enfant 50 mg/kg/j en 3 doses) 7–14 j ; revoir à 48–72 h ; IV et drainage si fièvre, cellulite extensive ou immunosuppression", src: "Charret et coll., 2021 (PMID 34293150)" }] } : null,
      // Règle du genou d'Ottawa (Stiell et coll.) : traumatisme récent.
      L => {
        if (!L.trauma() || (L.repondu("duree") && L.v("duree") !== "lt7")) return null;   // traumatisme récent (moins de 7 jours) seulement
        const flexion = L.oui("ott_flexion") || ["arom_flexion_deg", "prom_flexion_deg"].some(id => L.v(id) !== null && Number(L.v(id)) < 90);
        const rotuleIsolee = L.oui("p_rotule") && !L.oui("p_perone") && !L.oui("p_rebords");
        const crit = [], faits = [L.age !== null, L.repondu("ott_4pas"), L.repondu("ott_flexion") || L.repondu("arom_flexion_deg"), L.repondu("p_rotule"), L.repondu("p_perone")];
        if (L.age >= 55) crit.push("55 ans ou plus");
        if (L.oui("ott_4pas")) crit.push("incapable de faire 4 pas");
        if (flexion) crit.push("flexion impossible à 90°");
        if (rotuleIsolee) crit.push("sensibilité isolée de la rotule");
        if (L.oui("p_perone")) crit.push("sensibilité de la tête du péroné");
        const enfant = L.age !== null && L.age < 18 ? " Valide dès 5 ans." : "";
        if (crit.length) return { niveau: "rapide", titre: "Radiographie du genou indiquée (règle d'Ottawa)", ro: "fracture", texte: `Critère : ${crit.join(", ")}. Règle : Se 98,5 %, Sp 48,6 %.${enfant}`,
          conduite: [{ t: "Radiographie du genou (règle d'Ottawa positive)", src: "Bachmann et coll., 2004, Ann Intern Med" },
            { t: "Fracture du plateau tibial : attelle, sans appui, orthopédie le jour même (TDM) ; examen neurovasculaire et des loges", src: "Taljanovic et coll., 2020, ACR Appropriateness Criteria ; Assink et coll., 2024" },
            { t: "Fracture de la rotule non déplacée avec extension active : attelle en extension 5–6 sem ; orthopédie si marche > 2 mm, écart > 3 mm ou perte de l'extension", src: "Melvin et coll., 2011, J Am Acad Orthop Surg" }] };
        if (faits.every(Boolean)) return { niveau: "info", titre: "Règle d'Ottawa négative", texte: `Aucun critère : la radiographie n'est pas nécessaire pour éliminer une fracture (RV− 0,05 ; Bachmann et coll., 2004). Radiographie si la douleur persiste à 10 jours.${enfant}` };
        return { niveau: "info", titre: "Règle d'Ottawa à compléter", texte: "Traumatisme : âge, 4 pas, flexion à 90°, palpation de la rotule et de la tête du péroné." };
      },
      // Règle de Pittsburgh (Seaberg et coll., 1998) : chute ou coup direct récent.
      L => {
        if (!L.trauma() || (L.repondu("duree") && L.v("duree") !== "lt7") || !L.dans("mecanisme", ["direct", "tibia"])) return null;
        const crit = [];
        if (L.age !== null && (L.age < 12 || L.age > 50)) crit.push(L.age < 12 ? "moins de 12 ans" : "plus de 50 ans");
        if (L.oui("ott_4pas")) crit.push("incapable de faire 4 pas");
        if (crit.length) return { niveau: "rapide", titre: "Radiographie du genou indiquée (règle de Pittsburgh)", ro: "fracture", texte: `Chute ou coup direct, et : ${crit.join(", ")}. Règle : Se 99 %, Sp 60 %.`,
          conduite: [{ t: "Radiographie du genou (règle de Pittsburgh positive)", src: "Seaberg et coll., 1998, Ann Emerg Med" }] };
        if (L.age !== null && L.repondu("ott_4pas")) return { niveau: "info", titre: "Règle de Pittsburgh négative", texte: "Chute ou coup direct, de 12 à 50 ans, 4 pas possibles : la radiographie n'est pas nécessaire pour éliminer une fracture (Se 99 %, RV− 0,02 ; Seaberg et coll., 1998)." };
        return null;
      },
      L => L.v("elj") === "impossible" ? { niveau: "urgence", titre: "Rupture de l'appareil extenseur à éliminer", ro: "rupture de l'appareil extenseur",
        texte: `Élévation de la jambe tendue impossible : tendon quadricipital ou rotulien, ou fracture de la rotule${L.age !== null && L.age < 18 ? " ; chez le jeune, avulsion de la tubérosité tibiale ou fracture en manchon de la rotule" : ""}. Diagnostic manqué au départ dans plus du tiers des cas ; terrain : 40 ans et plus, insuffisance rénale, diabète, corticoïdes, fluoroquinolones.`,
        conduite: [{ t: "Défaut palpable ; radiographies (rotule basse : quadricipital ; haute : rotulien) ; attelle en extension, béquilles", src: "Siwek et coll., 1981 (PMID 6985557) ; Arnold et coll., 2022" },
          { t: "Orthopédie d'urgence : meilleurs résultats avec une réparation dans les jours qui suivent ; CRDS AH-753, priorité B, si rupture complète confirmée", src: "Danaher et coll., 2023 ; formulaire AH-753 (CRDS)" }],
        liens: [{ t: "CRDS : rupture du tendon rotulien ou quadricipital", u: "/crds/?q=rupture%20du%20tendon%20rotulien" }] } : null,
      L => {
        const plusieurs = L.v("lachman") === "laxite" && (L.v("valgus0") === "laxite" || L.v("varus0") === "laxite" || L.v("tiroir_post") === "laxite");
        if (!(L.oui("pouls_dim") || L.oui("deficit_fibulaire") || plusieurs)) return null;
        return { niveau: "urgence", titre: "Luxation du genou ou atteinte neurovasculaire à éliminer", ro: "luxation du genou",
          texte: `${plusieurs ? "Laxité dans plusieurs plans : luxation du genou possiblement réduite spontanément." : "Pouls diminués ou déficit du nerf fibulaire."} Lésion vasculaire dans environ 18 % des luxations, nerveuse dans 25 %.`,
          conduite: [{ t: "Pouls et indice de pression systolique cheville-bras : < 0,9 → angio-TDM ; pouls absents ou ischémie → urgence vasculaire immédiate", src: "LaPrade et coll., 2002 ; Badri et coll., 2018" }] };
      },
      L => (L.v("arom_extension") === "blocage" || L.v("prom_extension") === "blocage") ? { niveau: "rapide", titre: "Genou bloqué", ro: "déchirure méniscale en anse de seau",
        texte: "Blocage mécanique de l'extension : déchirure méniscale en anse de seau ou corps libre. Déficit d'extension avec douleur de l'interligne antérieur : Se 95 %, Sp 98 % pour l'anse de seau du ménisque médial (Cerciello et coll., 2021).",
        conduite: [{ t: "IRM et orthopédie en 1–2 semaines", src: DUONG }] } : null,
      // Hémarthrose traumatique de l'enfant et de l'adolescent.
      L => (L.age !== null && L.age < 18 && L.trauma() && (L.oui("enflure_rapide") || L.v("flot") === "positif" || L.v("glacon") === "positif"))
        ? { niveau: "rapide", titre: "Hémarthrose traumatique de l'adolescent", ro: "lésion intra-articulaire", texte: "Environ 70 % ont une lésion sérieuse, souvent invisible à la radiographie : luxation de la rotule (surtout 10–14 ans), rupture du LCA (15–18 ans), fracture des épines tibiales (8–14 ans), lésion méniscale ou ménisque discoïde.",
          conduite: [{ t: "Radiographies, puis IRM dans la semaine ; attelle de confort, béquilles, glace, ibuprofène", src: "Askenberger et coll., 2014, Am J Sports Med" },
            { t: "Orthopédie ou médecine du sport en 1–2 sem (environ 4 patients sur 10 sont opérés) ; fracture des épines tibiales : orthopédie en quelques jours", src: "Askenberger et coll., 2014 ; Gans et coll., 2014" }] } : null,
      // Angle postéro-latéral, LLE grade III.
      L => (L.v("varus30") === "laxite" || L.oui("dial")) ? { niveau: "rapide", titre: "Lésion de l'angle postéro-latéral à éliminer", ro: "lésion de l'angle postéro-latéral",
        texte: "Laxité en varus à 30° ou dial test positif : LLE grade III ou angle postéro-latéral. Vérifier le nerf fibulaire commun (pied tombant).",
        conduite: [{ t: "IRM ; orthopédie rapidement (chirurgie idéalement en moins de 3 semaines)", src: "LaPrade et coll., 2002, Clin Orthop (PMID 12218476)" }] } : null,
      // Épiphysiolyse fémorale supérieure (adolescent).
      L => {
        if (L.age === null || L.age > 17) return null;
        if (L.dans("hanche_ri", ["limitee"]) || L.oui("douleur_hanche") || L.dans("demarche", ["boiterie", "rotext", "appui"]))
          return { niveau: "urgence", titre: "Épiphysiolyse fémorale supérieure à éliminer", ro: "épiphysiolyse fémorale supérieure", texte: "Adolescent : une douleur au genou peut venir de la hanche.",
            conduite: ["Radiographie des deux hanches (face et grenouille) le jour même ; pas de mise en charge ; orthopédie."] };
        if (!L.repondu("hanche_ri")) return { niveau: "info", titre: "Examiner la hanche", texte: "Adolescent : la douleur au genou peut venir de la hanche (épiphysiolyse). Vérifier la rotation interne." };
        return null;
      },
      L => (L.age !== null && L.age <= 20 && !L.trauma() && (L.oui("enflure") || L.dans("flot", ["leger", "positif"]) || L.oui("blocage") || L.oui("accrochage")))
        ? { niveau: "considerer", titre: "Ostéochondrite disséquante à éliminer", ro: "ostéochondrite disséquante", texte: "Jeune patient avec épanchement, accrochages ou blocages, sans traumatisme.",
          conduite: [{ t: "Radiographies des deux genoux : face, profil, axiale et en tunnel (atteinte bilatérale dans 15–30 %) ; IRM pour la stabilité ; orthopédie", src: "Mitchell et coll., 2025, Arthroscopy" }] } : null,
      C.regles.tumeur("Radiographie du genou, fémur distal et tibia proximal compris."),
      L => L.oui("mollet") ? { niveau: "rapide", titre: "Thrombose veineuse profonde à éliminer", ro: "TVP", texte: "Mollet enflé, chaud ou douloureux. Un kyste poplité rompu donne un tableau indiscernable, et la présence d'un kyste n'exclut pas une thrombose.",
        conduite: [{ t: "Score de Wells, D-dimères ou écho-doppler selon la probabilité ; répéter le doppler à 5–7 j s'il est négatif", src: "Langsfeld et coll., 1997 ; Chopard et coll., 2020, JAMA" },
          { t: "Mollet tendu et très douloureux (syndrome compartimental, surtout sous anticoagulant) : urgence", src: "Frush et coll., 2015, Sports Health" }], liens: [{ t: "CRDS : accueil clinique, thrombophlébite profonde", u: "/crds/?q=TVP" }] } : null,
      L => (L.oui("pkb") || L.oui("reflexe_rot") || L.oui("deficit_l3l4") || L.v("irradiation") === "radiculaire" || L.dans("type_douleur", ["brulure", "choc"]) || (L.oui("douleur_dos") && L.v("lombaire_mob") === "douleur"))
        ? { niveau: "considerer", titre: "Origine lombaire (radiculopathie L3–L4) à considérer", ro: "radiculopathie L3–L4", texte: "Douleur de type nerveux, irradiation radiculaire ou signes neurologiques.",
          conduite: ["Examen neurologique et lombaire complet."] } : null,
      L => (L.age !== null && L.age >= 18 && (L.dans("hanche_ri", ["limitee"]) || L.oui("fadir") || L.oui("douleur_hanche")))
        ? { niveau: "considerer", titre: "Douleur référée de la hanche à considérer", ro: "douleur référée de la hanche", texte: "Rotation interne de la hanche limitée ou douloureuse, ou douleur à l'aine.",
          conduite: ["Radiographie du bassin et de la hanche si la rotation interne est limitée ou douloureuse."] } : null,
      L => (L.oui("autres_articulations") && (L.v("raideur") === "plus30" || L.oui("reveils")))
        ? { niveau: "considerer", titre: "Arthrite inflammatoire à considérer", ro: "arthrite inflammatoire", texte: "Plusieurs articulations, raideur matinale prolongée ou réveils nocturnes.",
          conduite: ["Bilan inflammatoire ; rhumatologie (CRDS AH-765) selon le tableau."], liens: [{ t: "CRDS : rhumatologie", u: "/crds/?q=polyarthrite" }] } : null,
      // Critères cliniques de l'ACR pour l'arthrose : comptés comme grappe (voir « grappes ») ; rappel du compte.
      L => {
        if (L.age === null || L.age < 40) return null;
        const { oui, evalues } = acr(L);
        if (evalues < 4) return null;
        return { niveau: "info", titre: `Critères cliniques de l'ACR pour l'arthrose : ${oui} sur 6`,
          texte: `${oui >= 4 ? "4 ou plus : RV+ 7,6" : oui === 3 ? "3 : RV+ 3,1" : evalues >= 5 ? "Moins de 3 : RV− 0,07" : "Moins de 3"} ; ${evalues} critères évalués (Gelber, 2024). Compté dans le calcul à la place des éléments qui le composent.` };
      },
    ],
  });
})();
