/* Locomoteur Morand, genou (prototype 0.3, novembre 2026) : questions, diagnostics, poids, règles et conduite.
   Région de référence : la note suit le format des notes de clinique locomotrice (voir le moteur) et l'examen ne garde
   que les tests retenus par le clinicien (liste du 18 novembre 2026).

   Statut des poids :
     p(RV si oui, RV si non)  estimation clinique provisoire, sans source : à remplacer.
     lit(Se, Sp, « piste »)   sensibilité et spécificité publiées, citées de mémoire : à vérifier.
     est(RV+, RV−, « piste ») rapports de vraisemblance publiés, cités de mémoire : à vérifier.
     ver(…) / verRv(…)        chiffre confirmé dans l'article (rapport de validation du LCA, 21 novembre 2026).
   Option d'un choix : o(valeur, libellé, { diagnostic: RV }, { n: texte de la note }).
   « g » regroupe les éléments qui se recoupent : seul le plus fort en faveur et le plus fort en défaveur comptent. */
(function () {
  "use strict";
  const { p, lit, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const ver = (se, sp, piste, extra) => ({ se, sp, piste, statut: "verifie", ...extra });
  const verRv = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "verifie", ...extra });
  const SOKAL = "Sokal et coll., 2022, méta-analyse bivariée (Knee Surg Sports Traumatol Arthrosc), PMID 35150292";
  const WAGEMAKERS = "Wagemakers et coll., 2010, médecine familiale (Arch Phys Med Rehabil), PMID 20801267";
  const DECARY = "Décary et coll., 2018 (PLoS One), PMID 29894492";
  const trauma = L => L.trauma();
  const PALP = "palp", TEST = "test";

  window.Locomoteur.definir({
    id: "genou", partie: "genou", rc: "Douleur au genou",
    titre: "Douleur au genou", version: "Prototype 0.3 · novembre 2026", ages: "12 ans et plus",

    /* ---------- Diagnostics : probabilité de départ par âge (points [âge, probabilité]) et multiplicateur de cote du sexe ---------- */
    diagnostics: [
      { id: "sfp", nom: "Syndrome fémoro-patellaire", n: "syndrome fémoro-patellaire", base: [[12, .25], [16, .32], [28, .2], [50, .06], [70, .02]], sexe: { F: 1.5, M: .7 }, fiches: ["athlete-1"],
        conduite: ["Pas d'imagerie d'emblée ; radiographie si présentation atypique, épanchement ou absence d'amélioration après 3 mois de traitement bien suivi.",
          "Enseignement : ajuster les charges (escaliers, accroupissement, course).",
          "Renforcement du quadriceps et de la hanche (abducteurs, rotateurs externes), idéalement en physiothérapie ; taping ou orthèses plantaires possibles à court terme.",
          "Suivi dans 6 à 8 semaines."] },
      { id: "arthrose", nom: "Arthrose du genou", n: "gonarthrose", base: [[12, .003], [16, .005], [28, .04], [45, .2], [55, .35], [70, .55], [85, .65]], sexe: { F: 1.25, M: .8 },
        fiches: ["50plus-61", "50plus-62"],
        conduite: [{ t: "Diagnostic clinique sans imagerie possible : 45 ans et plus, douleur liée à l'activité, raideur matinale absente ou de 30 min ou moins (NICE).", si: L => L.age >= 45 && L.dans("raideur", ["aucune", "moins30"]) },
          "Radiographie en charge si présentation atypique ou si une référence en orthopédie est envisagée ; pas d'IRM (Choisir avec soin).",
          "Exercice (renforcement et aérobie), perte de poids si surpoids, éducation (programme GLA:D Canada).",
          "AINS topiques en premier ; AINS oraux à court terme selon le profil ; infiltration de corticostéroïdes possible lors d'une poussée.",
          "Orthopédie si arthrose invalidante malgré le traitement : CRDS AH-753, priorité D, avec le rapport de radiographie."],
        liens: [{ t: "CRDS : arthrose invalidante du genou", u: "/crds/?q=arthrose%20invalidante%20du%20genou" }] },
      { id: "menisque", nom: "Déchirure méniscale", n: "déchirure méniscale", base: [[12, .04], [16, .07], [28, .12], [50, .15], [70, .12]], sexe: { M: 1.2, F: .85 }, fiches: ["athlete-5", "50plus-63"],
        conduite: [{ t: "Probablement dégénérative (40 ans et plus, sans traumatisme important) : traitement conservateur et physiothérapie ; pas d'IRM ni d'arthroscopie d'emblée (Choisir avec soin).", si: L => L.age >= 40 && !L.trauma() },
          { t: "Traumatique avec symptômes mécaniques : IRM à envisager ; genou bloqué en extension : orthopédie rapidement.", si: L => L.trauma() || L.age === null || L.age < 40 },
          "Physiothérapie (amplitude, contrôle de l'épanchement, renforcement).",
          "Orthopédie : CRDS AH-753, déchirure méniscale aiguë ou traumatique (moins de 60 ans), priorité D, avec le rapport d'IRM."],
        liens: [{ t: "CRDS : déchirure méniscale", u: "/crds/?q=d%C3%A9chirure%20m%C3%A9niscale" }] },
      { id: "lca", nom: "Rupture du LCA", n: "rupture du LCA", base: [[12, .03], [16, .06], [28, .07], [50, .025], [70, .01]], sexe: { F: 1.2, M: .9 }, fiches: ["athlete-6"],
        conduite: ["Radiographie si un critère d'Ottawa est présent (fracture de Segond, arrachement).",
          "Physiothérapie précoce (amplitude, épanchement, quadriceps) ; béquilles et orthèse au besoin.",
          "IRM pour confirmer en cas de doute ou si une reconstruction est envisagée (jeune actif, sport de pivot, instabilité).",
          "Orthopédie : CRDS AH-753, rupture du ligament croisé avec physiothérapie initiée, priorité C, avec le rapport d'IRM."],
        liens: [{ t: "CRDS : rupture du ligament croisé", u: "/crds/?q=ligament%20crois%C3%A9" }] },
      { id: "lcp", nom: "Entorse du LCP", n: "entorse du LCP", base: [[12, .004], [25, .01], [50, .008], [70, .004]], sexe: { M: 1.3, F: .75 },
        conduite: ["Radiographie selon la règle d'Ottawa.", "LCP isolé : traitement conservateur, physiothérapie centrée sur le quadriceps.",
          "Atteinte combinée ou du coin postéro-latéral : orthopédie rapidement."] },
      { id: "collat", nom: "Entorse d'un ligament collatéral (LLI, LLE)", n: "entorse du ligament collatéral", base: [[12, .03], [16, .05], [28, .05], [50, .03], [70, .015]], fiches: ["athlete-4"],
        conduite: ["Radiographie selon la règle d'Ottawa.",
          "LLI, grade I ou II : traitement conservateur, mise en charge selon la tolérance, orthèse articulée si grade II ou III, physiothérapie.",
          "Laxité en varus, laxité à 0° ou atteinte de plusieurs ligaments : orthopédie rapidement (coin postéro-latéral, luxation du genou)."] },
      { id: "rotule", nom: "Instabilité ou luxation de la rotule", n: "instabilité rotulienne", base: [[12, .05], [16, .07], [28, .03], [50, .006], [70, .003]], sexe: { F: 1.4, M: .75 }, fiches: ["athlete-9"],
        conduite: ["Après une première luxation : radiographie (face, profil, axiale) pour éliminer une fracture ostéochondrale ; IRM si hémarthrose importante ou fragment.",
          "Physiothérapie (quadriceps, hanche, proprioception) ; orthèse de stabilisation rotulienne à court terme.",
          "Orthopédie si fragment ostéochondral, luxations récidivantes ou instabilité persistante."] },
      { id: "tendino", nom: "Tendinopathie rotulienne ou quadricipitale", n: "tendinopathie rotulienne", base: [[12, .04], [16, .07], [28, .06], [50, .03], [70, .02]], sexe: { M: 1.3, F: .8 },
        fiches: ["athlete-2", "50plus-68"],
        conduite: ["Pas d'imagerie d'emblée ; échographie si doute diagnostique ou rupture partielle soupçonnée.",
          "Programme de mise en charge progressive (isométrique, puis lourd et lent), gestion des sauts ; physiothérapie.",
          "Éviter les infiltrations de corticostéroïdes dans le tendon."] },
      { id: "hoffa", nom: "Syndrome du coussinet adipeux (Hoffa)", n: "syndrome de Hoffa", base: [[12, .02], [25, .03], [50, .02], [70, .01]],
        conduite: ["Éviter l'hyperextension ; taping (décharge du coussinet) ; physiothérapie (contrôle de l'extension, quadriceps).", "Échographie ou IRM si persistant."] },
      { id: "bit", nom: "Syndrome de la bandelette ilio-tibiale", n: "syndrome de la bandelette ilio-tibiale", base: [[12, .01], [16, .02], [28, .05], [50, .02], [70, .006]], fiches: ["athlete-3"],
        conduite: ["Pas d'imagerie d'emblée.", "Ajuster l'entraînement (volume, dénivelé), renforcer les abducteurs de la hanche, physiothérapie ; infiltration possible si la douleur persiste."] },
      { id: "bprep", nom: "Bursite prépatellaire", n: "bursite prépatellaire", base: [[12, .01], [16, .01], [28, .02], [50, .03], [70, .02]], sexe: { M: 1.5, F: .7 }, fiches: ["50plus-69"],
        conduite: ["Protection, éviter l'appui sur les genoux, glace, AINS.", "Bourse chaude, rouge ou fièvre : ponction-aspiration de la bourse (bursite septique, souvent à S. aureus) avec culture, Gram et cristaux."] },
      { id: "poie", nom: "Tendinobursite de la patte d'oie", n: "tendinobursite de la patte d'oie", base: [[12, .003], [16, .005], [28, .01], [50, .05], [70, .06]], sexe: { F: 1.6, M: .65 },
        fiches: ["athlete-8", "50plus-64"],
        conduite: ["Exercices (ischiojambiers, quadriceps), perte de poids au besoin ; infiltration possible.", "Chercher une gonarthrose associée."] },
      { id: "apo", nom: "Apophysite (Osgood-Schlatter, Sinding-Larsen-Johansson)", n: "apophysite de traction (Osgood-Schlatter ou Sinding-Larsen-Johansson)",
        base: [[11, .18], [13, .15], [15, .1], [17, .04], [19, .008], [25, .001]], sexe: { M: 1.4, F: .7 }, fiches: ["athlete-7"],
        conduite: ["Bénin et spontanément résolutif : activité selon la douleur, glace, étirements (quadriceps, ischiojambiers).",
          "Radiographie si atypique (unilatéral avec douleur nocturne, au repos ou masse) pour éliminer une tumeur ou une fracture-avulsion."] },
      { id: "arthrite", nom: "Arthrite microcristalline ou inflammatoire", n: "arthrite microcristalline ou inflammatoire", base: [[12, .01], [16, .01], [28, .02], [50, .05], [70, .07]],
        fiches: ["50plus-66"],
        conduite: ["Épanchement inexpliqué, surtout chaud : ponction articulaire (numération, Gram, culture, cristaux) ; l'infection doit être éliminée.",
          "Bilan selon le tableau : FSC, CRP, VS, acide urique, FR et anti-CCP ; HLA-B27 si spondylarthrite soupçonnée ; radiographie (chondrocalcinose).",
          "Rhumatologie : CRDS AH-765 (arthrite microcristalline, polyarthrite)."],
        liens: [{ t: "CRDS : arthropathie inflammatoire", u: "/crds/?q=arthrite" }] },
      { id: "baker", nom: "Kyste poplité (de Baker)", n: "kyste poplité", base: [[12, .003], [16, .005], [28, .01], [50, .04], [70, .06]], fiches: ["50plus-65"],
        conduite: ["Échographie si doute ; traiter la cause (arthrose, ménisque).", "Mollet enflé ou douloureux : un kyste rompu imite une TVP ; écho-doppler pour l'éliminer."] },
      { id: "insuff", nom: "Insuffisance sous-chondrale ou fracture d'insuffisance", n: "insuffisance sous-chondrale ou fracture d'insuffisance", base: [[12, .0005], [45, .002], [60, .012], [75, .03], [90, .04]],
        sexe: { F: 1.6, M: .65 }, fiches: ["50plus-67", "50plus-70"],
        conduite: ["Radiographie, souvent normale au début ; IRM si la douleur est brutale ou persiste.", "Décharge partielle (béquilles) ; bilan d'ostéoporose.", "Orthopédie si fracture ou collapsus."] },
    ],
    /* Diagnostics qui coexistent souvent : ils ne se font pas concurrence (les autres, oui ; voir le moteur). Provisoire. */
    compatibles: [["lca", "menisque"], ["lca", "collat"], ["menisque", "collat"], ["lca", "lcp"], ["lcp", "collat"], ["arthrose", "menisque"], ["arthrose", "baker"], ["menisque", "baker"],
      ["arthrose", "poie"], ["arthrose", "arthrite"], ["arthrite", "baker"], ["sfp", "bit"], ["rotule", "sfp"], ["sfp", "hoffa"], ["tendino", "hoffa"], ["arthrose", "insuff"]],

    /* ---------- Questions ---------- */
    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.visite(), C.sexe(), C.age(), C.cote("Genou atteint", "Droit", "Gauche"), C.accompagne(), C.refere(),
        C.travail({ physique: { arthrose: 1.2, menisque: 1.2 }, ajouts: [o("genoux", "Travail à genoux (plancher, toiture, plomberie…)", { bprep: 3, menisque: 1.3, arthrose: 1.2 }, { n: "travail à genoux" })] }),
        C.travailPrecision(),
        C.sport({ aucun: { lca: .5, rotule: .7, tendino: .5, bit: .4, sfp: .8, collat: .7 }, marche: { arthrose: 1.1, poie: 1.2 },
          course: { bit: 2.5, sfp: 1.5, tendino: 1.2 }, velo: { bit: 1.8, sfp: 1.3 },
          pivot: { lca: 2, menisque: 1.4, rotule: 1.5, tendino: 2, apo: 1.5, collat: 1.5 }, raquette: { menisque: 1.3, lca: 1.3, tendino: 1.3 },
          contact: { collat: 2, lca: 1.6, lcp: 2, menisque: 1.3 }, glisse: { lca: 2, collat: 2 }, danse: { rotule: 1.6, sfp: 1.4, hoffa: 1.5, tendino: 1.4, apo: 1.3 },
          muscu: { tendino: 1.3, sfp: 1.2 }, natation: { collat: 1.5, sfp: 1.1 } }),
        C.sportPrecision(), C.administratif(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        C.nil(), C.atcdMsk(),
        ouiNon("atcd_genou", "Blessure ou chirurgie antérieure à ce genou", { oui: "blessure ou chirurgie antérieure à ce genou", nie: "blessure au genou",
          effets: { arthrose: p(1.8, .85), menisque: p(1.4, .95), lca: p(1.2, 1), rotule: p(1.5, .95) } }),
        C.atcdMedicaux(),
        ouiNon("obesite", "Obésité (IMC 30 ou plus)", { oui: "obésité", non: "", effets: { arthrose: p(1.6, .85), poie: p(1.8, .8) } }),
        C.rx(), C.atcdAutres(), C.atcdFamiliaux({ arthrite: p(1.5, .9) }), C.atcdRhumato("arthrite"),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { questions: [C.rappel()] },
        { titre: "Début et mécanisme", negInline: true, questions: [
          C.premier({ lca: p(1.5, .7), collat: p(1.5, .6), menisque: p(1.2, .9), arthrose: p(.7, 1.5), rotule: p(.7, 1.6), arthrite: p(.7, 1.5), sfp: p(.8, 1.3) }),
          C.depuis(), C.contexte(),
          C.duree({ lt7: { lca: 2, collat: 2.5, menisque: 1.3, rotule: 1.5, lcp: 2, arthrose: .4, tendino: .4, sfp: .5, poie: .5, apo: .6, arthrite: 1.5, bprep: 1.5, bit: .6, insuff: 1.5 },
            s1_6: { lca: 1.3, collat: 1.3, menisque: 1.2, arthrose: .7, tendino: .8, sfp: .9 }, s6_12: { arthrose: 1.1, tendino: 1.2, sfp: 1.2, lca: .7, collat: .5 },
            gt3m: { arthrose: 1.8, tendino: 1.5, sfp: 1.4, poie: 1.3, apo: 1.3, hoffa: 1.2, lca: .5, collat: .3, arthrite: .8, rotule: .8, insuff: .6 } }),
          C.apparition({ subit_trauma: { lca: 4, collat: 4, menisque: 2, rotule: 3, lcp: 4, bprep: 1.5, sfp: .3, arthrose: .3, tendino: .3, bit: .2, poie: .3, apo: .4, arthrite: .3, baker: .5, insuff: .5 },
            subit: { arthrite: 3, insuff: 3, menisque: 1.3, rotule: 1.2, lca: .3, collat: .3, sfp: .5 },
            graduel: { sfp: 1.8, arthrose: 1.8, tendino: 1.8, bit: 2, poie: 1.6, apo: 1.8, hoffa: 1.5, menisque: .8, rotule: .4, lca: .15, collat: .15, lcp: .2 },
            insidieux: { sfp: 1.8, arthrose: 2, tendino: 1.5, bit: 1.5, poie: 1.6, apo: 1.5, baker: 1.3, hoffa: 1.3, menisque: .8, rotule: .3, lca: .1, collat: .1, lcp: .2 } }),
          choix("mecanisme", "Mécanisme", [
            o("pivot", "Pivot ou torsion, pied au sol", { menisque: 2, rotule: 2, collat: 1.2 }, { n: "pivot sur pied fixe" }),
            o("deceleration", "Décélération ou réception de saut", { menisque: 1.2 }, { n: "décélération ou réception de saut" }),
            o("valgus", "Coup ou stress en valgus (de l'extérieur)", { collat: 4, menisque: 1.2 }, { n: "stress en valgus" }),
            o("varus", "Coup ou stress en varus (de l'intérieur)", { collat: 3 }, { n: "stress en varus" }),
            o("direct", "Coup direct sur le genou", { bprep: 2 }, { n: "coup direct sur le genou" }),
            o("tibia", "Coup sur le tibia, genou fléchi (chute sur le genou, tableau de bord)", { lcp: 6 }, { n: "coup sur le tibia, genou fléchi" }),
            o("hyperext", "Hyperextension", { lcp: 1.5, hoffa: 1.5 }, { n: "hyperextension" }),
            o("accroupi", "En s'accroupissant ou en se relevant", { menisque: 3, collat: .3 }, { n: "en s'accroupissant" })],
            { si: trauma, masqueSi: "contexte", effets: [{ dx: "lca", opt: "pivot", rv: { pivot: 5 }, statut: "verifie", piste: `${DECARY} : pivot contre tout autre mécanisme (RV− 0,25 en l'absence de pivot)` },
              { dx: "lca", rv: { deceleration: 2.5, valgus: 1.5, varus: 1.2, direct: .6, hyperext: 2, accroupi: .3, tibia: .8 } }] }),
          ouiNon("pop", "Pop au moment de la blessure", { si: trauma, oui: "pop", nie: "pop", effets: { lca: verRv(2.3, .5, WAGEMAKERS), rotule: p(1.5, .9), menisque: p(1.2, .9) } }),
          ouiNon("enflure_rapide", "Œdème en moins de 2 heures", { si: trauma, oui: "œdème dans les 2 h", nie: "œdème rapide", g: "hemarthrose",
            effets: { lca: p(3, .4, { piste: `${DECARY} : épanchement immédiat RV+ 11,0, RV− 0,34, pour la rupture complète seulement ; « immédiat » non défini en heures (à confirmer)` }), rotule: p(2.5, .7), menisque: p(.8, 1) } }),
          ouiNon("enflure_tardive", "Œdème après quelques heures (6 à 24 h)", { si: trauma, oui: "œdème dans les 24 h", non: "", effets: { menisque: p(2, .8), lca: p(.8, 1) } }),
          ouiNon("poursuivre", "A pu poursuivre l'activité", { si: trauma, oui: "a pu poursuivre l'activité", non: "incapable de poursuivre l'activité", effets: { lca: p(.5, 2), rotule: p(.7, 1.5) } }),
          ouiNon("ecchymose", "Ecchymose", { si: trauma, oui: "ecchymose", nie: "ecchymose", g: "ecchymose", effets: { collat: p(2, .8), lca: p(1.3, .9) } }),
          ouiNon("rotule_sortie", "Sensation que la rotule est sortie de place", { oui: "sensation que la rotule est sortie de place", nie: "sensation de luxation rotulienne", effets: { rotule: p(8, .4) } }),
        ] },
        { titre: "Évolution", questions: [C.evolution(), C.reaggravations()] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("anterieure", "Antérieure, autour de la rotule", { sfp: p(3, .3), rotule: p(1.5, .6), tendino: p(1.3, .8), apo: p(.8, 1), hoffa: p(1.3, .9) }, { n: "antérieure, autour de la rotule" }),
            m("prerotulienne", "Devant la rotule, superficielle", { bprep: p(6, .3, { g: "bprep" }) }, { n: "devant la rotule" }),
            m("pole_inf", "Sous la rotule (tendon rotulien)", { tendino: p(4, .4), apo: p(2, .8), sfp: p(1.2, 1) }, { n: "pôle inférieur de la rotule" }),
            m("infrapat", "Sous la rotule, de chaque côté du tendon", { hoffa: p(4, .6), tendino: p(1.5, .9) }, { n: "de chaque côté du tendon rotulien" }),
            m("tuberosite", "Tubérosité tibiale", { apo: p(6, .3, { g: "apo" }), tendino: p(1.5, .9) }, { n: "tubérosité tibiale" }),
            m("interligne_med", "Interligne médial", { menisque: p(2.5, .5), arthrose: p(1.8, .7), collat: p(1.8, .7), poie: p(1.2, 1) }, { n: "interligne médial" }),
            m("interligne_lat", "Interligne latéral", { menisque: p(1.8, .8), bit: p(1.5, .9), collat: p(1.3, .9), arthrose: p(1.2, .95) }, { n: "interligne latéral" }),
            m("patte_oie", "Médiale, sous l'interligne (patte d'oie)", { poie: p(5, .3), collat: p(1.2, 1) }, { n: "patte d'oie" }),
            m("laterale", "Latérale, au-dessus de l'interligne (bandelette)", { bit: p(5, .3), collat: p(1.2, .9) }, { n: "face latérale, au-dessus de l'interligne" }),
            m("posterieure", "Postérieure (creux poplité)", { baker: p(5, .5, { g: "baker" }), menisque: p(1.3, .95), lcp: p(1.5, .95) }, { n: "creux poplité" }),
            m("diffuse", "Diffuse, mal localisée", { arthrite: p(2, .8), sfp: p(1.3, 1), arthrose: p(1.3, 1) }, { n: "diffuse" }),
          ], { gabarit: "douleur a/n {v}", aide: "Plusieurs choix possibles. Une fois un siège coché, les sièges non cochés comptent comme absents." }),
          choix("irradiation", "Irradiation", [o("aucune", "Aucune", {}, { n: "sans irradiation" }), o("cuisse", "Vers la cuisse ou la hanche", {}, { n: "irradiation vers la cuisse" }),
            o("mollet", "Vers le mollet", { baker: 1.5 }, { n: "irradiation vers le mollet" }), o("radiculaire", "Le long du membre (trajet radiculaire)", {}, { n: "irradiation le long du membre" })]),
          C.type({ pression: { sfp: 1.1, arthrose: 1.1 }, sourde: { arthrose: 1.2 }, aigue: { menisque: 1.3 }, pulsatile: { arthrite: 1.5 } }),
        ] },
        { titre: "Intensité", questions: C.intensites() },
        { titre: "Facteurs et horaire", negInline: true, questions: [
          ouiNon("pivots_agg", "Pire en pivotant", { agg: "les pivots", aggNie: "aux pivots", effets: { menisque: p(1.8, .7), lca: p(1.5, .8), rotule: p(1.3, .9) } }),
          ouiNon("escaliers", "Pire dans les escaliers", { agg: "les escaliers", aggNie: "aux escaliers", effets: { sfp: p(1.8, .4), arthrose: p(1.5, .6), tendino: p(1.3, .8), menisque: p(1.1, .95) } }),
          ouiNon("marche", "Pire à la marche", { agg: "la marche", aggNie: "à la marche", effets: { arthrose: p(1.6, .6), menisque: p(1.2, .9), poie: p(1.3, .9), insuff: p(1.5, .9) } }),
          ouiNon("assis", "Pire en position assise prolongée", { agg: "la position assise prolongée", aggNie: "en position assise", effets: { sfp: p(2.5, .6), arthrose: p(1.2, .95) } }),
          ouiNon("accroupi", "Pire accroupi ou à genoux", { agg: "l'accroupissement et la position à genoux", aggNie: "aux squats", g: "accroupi",
            effets: { sfp: p(1.8, .5), menisque: p(1.6, .7), bprep: p(2, .6), tendino: p(1.3, .9), apo: p(1.5, .8) } }),
          ouiNon("course_saut", "Pire à la course ou au saut", { agg: "la course et les sauts", aggNie: "aux sauts", effets: { tendino: p(2.5, .4), bit: p(2, .5), sfp: p(1.5, .7), apo: p(2, .6) } }),
          ouiNon("hyperext_agg", "Pire genou en hyperextension (debout, genoux verrouillés)", { agg: "l'hyperextension", aggNie: "en hyperextension", effets: { hoffa: p(3, .8) } }),
          C.attenuants(),
          C.moment({ matin: { arthrite: 2.5, arthrose: .9, sfp: .7 }, soir: { arthrose: 1.4, sfp: 1.3, tendino: 1.3, menisque: 1.2, arthrite: .5 }, constante: { arthrite: 1.3 } }),
          C.nocturne({ arthrite: p(1.8, .7), arthrose: p(1.3, .9), insuff: p(2, .8), sfp: p(.6, 1.1), tendino: p(.7, 1.05) }),
          C.reveils({ arthrite: p(2.5, .8) }),
          C.raideur({ aucune: { arthrite: .4, arthrose: .8 }, moins30: { arthrose: 1.8, arthrite: .6 }, plus30: { arthrite: 3.5, arthrose: .6 } }),
        ] },
        { titre: "Traitements", questions: C.traitements() },
        { titre: "Limitations", questions: C.limitations() },
        { titre: "Éléments associés", questions: [
          ouiNon("derobade", "Dérobements (le genou lâche)", { oui: "dérobements", nie: "dérobement",
            effets: { lca: verRv(1.6, .6, WAGEMAKERS), rotule: p(2, .6), sfp: p(1.2, .95), menisque: p(1.2, .95) } }),
          ouiNon("blocage", "Blocages vrais (impossible d'étendre le genou)", { oui: "blocages vrais", nie: "blocage", effets: { menisque: p(2.5, .8), arthrose: p(1.2, 1) } }),
          ouiNon("accrochage", "Accrochages", { oui: "accrochages", nie: "accrochage", effets: { menisque: p(1.5, .8), sfp: p(1.2, .95), arthrose: p(1.2, .95) } }),
          ouiNon("enflure", "Enflure du genou (actuelle ou récurrente)", { oui: "enflure du genou", nie: "enflure", g: "epanchement",
            effets: { lca: verRv(1.6, .8, `${WAGEMAKERS} (enflure rapportée au questionnaire)`), arthrite: p(2.5, .4), menisque: p(1.4, .8), arthrose: p(1.3, .9), baker: p(1.5, .8),
              sfp: p(.4, 1.2), tendino: p(.5, 1.1), bit: p(.4, 1.1), apo: p(.6, 1.05), hoffa: p(.7, 1.05) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", nie: "rougeur", g: "inflammation", effets: { arthrite: p(3, .7), bprep: p(2.5, .85), arthrose: p(.6, 1) } }),
          ouiNon("douleur_hanche", "Douleur à la hanche ou à l'aine", { oui: "douleur à la hanche", nie: "douleur à la hanche" }),
          ouiNon("douleur_dos", "Lombalgie", { oui: "lombalgie", nie: "lombalgie" }),
          ouiNon("douleur_cheville", "Douleur à la cheville ou au pied", { oui: "douleur à la cheville", nie: "douleur à la cheville" }),
          C.autresArticulations({ arthrite: p(3, .8) }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [
        { labels: ["Présent", "Absent"], drapeaux: true, toutNormal: "Tout absent", questions: [
          C.fievre({ arthrite: p(2, .9) }), C.symptGeneraux(), C.cancer(),
          C.risqueInfection([m("prothese", "Prothèse du genou", {}, { n: "prothèse du genou" }), m("infiltration", "Infiltration ou chirurgie récente du genou", {}, { n: "infiltration récente" })]),
          ouiNon("mollet", "Mollet enflé, chaud ou douloureux", { oui: "œdème ou douleur au mollet", nie: "œdème du mollet", drapeau: true, effets: { baker: p(1.5, 1) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen", note: "examen", blocs: [
        C.fonctionnel({ valgum: { sfp: 1.3, rotule: 1.3, arthrose: 1.1 }, varum: { arthrose: 1.8, menisque: 1.1 }, plat: { sfp: 1.3 },
          demarche_normale: { arthrite: .7 }, boiterie: { lca: 1.3, menisque: 1.2, arthrite: 1.5, arthrose: 1.2, insuff: 1.5 }, appui: { arthrite: 2, lca: 1.5, insuff: 2 },
          squat_normal: { menisque: .8 }, squat_ant: { tendino: 1.5, hoffa: 1.3 }, squat_med: { menisque: 2, arthrose: 1.3 }, squat_lat: { menisque: 1.5, bit: 1.3 }, squat_limite: { arthrose: 1.5 },
          squatEffets: { sfp: lit(.91, .5, "Nunes et coll., 2013, revue systématique (Phys Ther Sport) : douleur à l'accroupissement", { pos: ["ant"], neg: ["normal"], g: "accroupi" }) },
          uni_valgus: { sfp: 1.5, rotule: 1.3 }, uni_douleur: { tendino: 1.5, sfp: 1.3 }, saut_douleur: { tendino: 2, apo: 1.5 }, trendelenburg: { sfp: 1.2 },
          recurvatum: { rotule: 1.3, hoffa: 1.5 }, duck_pos: { menisque: 2.5 }, appui_uni: { rotule: 1.3, lca: 1.3 }, saut_uni: { tendino: 2, apo: 1.5 } }),
        { titre: "Inspection", sep: ", ", toutNormal: true, questions: [
          ouiNon("ex_oedeme", "Œdème", { oui: "œdème", non: "pas d'œdème" }),
          ouiNon("ex_chaleur", "Rougeur ou chaleur", { oui: "rougeur ou chaleur", non: "pas de rougeur", g: "inflammation", effets: { arthrite: p(4, .5), bprep: p(2, .9), arthrose: p(.5, 1.1) } }),
          ouiNon("ex_ecchymose", "Ecchymose", { oui: "ecchymose", non: "", g: "ecchymose", effets: { collat: p(2, .8), lca: p(1.3, .95) } }),
          ouiNon("ex_atrophie", "Atrophie du quadriceps", { oui: "atrophie du quadriceps", non: "", effets: { arthrose: p(1.5, .9), lca: p(1.3, .95), sfp: p(1.2, .95) } }),
          multi("ex_tumefaction", "Tuméfaction localisée", [m("aucun", "Aucune", {}, { exclusif: true }),
            m("prerotulienne", "Devant la rotule (bourse)", { bprep: p(10, .2, { g: "bprep" }) }, { n: "tuméfaction prérotulienne" }),
            m("tuberosite", "Tubérosité tibiale proéminente", { apo: p(3, .7, { g: "apo" }) }, { n: "tubérosité tibiale proéminente" }),
            m("poplitee", "Masse au creux poplité", { baker: p(8, .4, { g: "baker" }) }, { n: "masse poplitée" }),
            m("osseux", "Élargissement osseux (ostéophytes)", { arthrose: p(4, .7, { g: "arthrose-osseux" }) }, { n: "élargissement osseux" })], { aucun: "", gabarit: "{v}" }),
        ] },
        { titre: "Épanchement", toutNormal: true, questions: [
          choix("flot", "Flot (signe du flot)", [o("negatif", "Négatif", { arthrite: .4, lca: .5, menisque: .7, arthrose: .8, baker: .8, sfp: 1.2, tendino: 1.1, bit: 1.1 }, { n: "flot négatif" }),
            o("leger", "Légèrement positif", { menisque: 1.5, arthrose: 1.5, lca: 1.3, arthrite: 1.5, sfp: .6 }, { n: "flot légèrement positif" }),
            o("positif", "Positif", { lca: 2, arthrite: 2, menisque: 1.5, arthrose: 1.4, rotule: 1.5, sfp: .4, tendino: .5, bit: .4 }, { n: "flot positif" })], { g: "epanchement" }),
          choix("glacon", "Test du glaçon", [o("negatif", "Négatif", { lca: .7, arthrite: .7 }, { n: "test du glaçon négatif" }),
            o("positif", "Positif", { lca: 3, arthrite: 3, rotule: 2, menisque: 1.5, arthrose: 1.3, sfp: .3, tendino: .4, bit: .3 }, { n: "test du glaçon positif" })], { g: "epanchement" }),
        ] },
        { titre: "Palpation", res: PALP, toutNormal: true, labels: ["Douloureux", "Indolore"], questions: [
          ouiNon("p_rotule", "Rotule", { court: "rotule", genre: "f", effets: { rotule: p(1.3, .9), sfp: p(1.3, .9) } }),
          ouiNon("p_facettes", "Facettes rotuliennes", { court: "facettes rotuliennes", genre: "fp", horsNormal: true, effets: { sfp: p(2, .5, { g: "sfp-ex" }), rotule: p(1.3, .9) } }),
          ouiNon("p_tendon_rot", "Tendon rotulien (pôle inférieur)", { court: "tendon rotulien",
            effets: { tendino: est(1.8, .4, "Cook et coll., 2001 : palpation du tendon rotulien, sensible mais peu spécifique", { g: "tendino-ex" }), apo: p(1.5, .9), hoffa: p(1.3, .9) } }),
          ouiNon("p_tendon_quad", "Tendon quadricipital", { court: "tendon quadricipital", effets: { tendino: p(2, .8, { g: "tendino-ex" }) } }),
          ouiNon("p_tta", "Tubérosité tibiale", { court: "tubérosité tibiale", genre: "f", effets: { apo: p(5, .2, { g: "apo" }), tendino: p(1.3, .9) } }),
          ouiNon("p_poie", "Patte d'oie", { court: "patte d'oie", genre: "f", effets: { poie: p(5, .3) } }),
          choix("p_interlignes", "Interlignes", [o("aucune", "Indolores", { arthrose: .8, collat: .8 }, { n: "interligne médial indolore ; interligne latéral indolore", normal: true }),
            o("mediale", "Médial douloureux", { arthrose: 1.5, collat: 1.5 }, { n: "interligne médial douloureux ; interligne latéral indolore" }),
            o("laterale", "Latéral douloureux", { collat: 1.3 }, { n: "interligne médial indolore ; interligne latéral douloureux" }),
            o("deux", "Médial et latéral douloureux", { arthrose: 1.5 }, { n: "interlignes médial et latéral douloureux" })],
            { effets: { menisque: lit(.63, .77, "Hegedus et coll., 2007, méta-analyse (JOSPT) : douleur à l'interligne", { pos: ["mediale", "laterale", "deux"], neg: ["aucune"], g: "menisque-ex" }) } }),
          ouiNon("p_lli", "LLI", { court: "LLI", effets: { collat: p(3, .4, { g: "collat-ex" }) } }),
          ouiNon("p_lle", "LLE", { court: "LLE", effets: { collat: p(3, .8, { g: "collat-ex" }) } }),
          ouiNon("p_bit", "Bandelette ilio-tibiale (épicondyle latéral)", { court: "bandelette ilio-tibiale", genre: "f", effets: { bit: p(4, .4, { g: "bit-ex" }) } }),
          ouiNon("p_perone", "Tête du péroné", { court: "tête du péroné", genre: "f", effets: { collat: p(1.5, .95) } }),
          ouiNon("p_poplite", "Creux poplité", { court: "creux poplité", effets: { baker: p(2.5, .7), lcp: p(1.5, .95) } }),
          ouiNon("p_retinaculum", "Bord médial de la rotule (rétinaculum)", { court: "bord médial de la rotule", horsNormal: true, effets: { rotule: p(3, .5, { g: "rotule-ex" }) } }),
          ouiNon("p_rebords", "Rebords osseux articulaires", { court: "rebords osseux", genre: "mp", horsNormal: true, effets: { arthrose: p(1.8, .8, { g: "arthrose-osseux" }), insuff: p(1.5, .9) } }),
        ] },
        { titre: "AROM", toutNormal: true, questions: [
          C.amplitude("arom_flexion", "Flexion active", "flexion", { complete: { arthrose: .6, menisque: .8, arthrite: .6 }, fin: { menisque: 1.3, sfp: 1.2 },
            lim_douleur: { menisque: 1.5, arthrite: 1.8, lca: 1.4, arthrose: 1.3, baker: 1.3 }, lim_raideur: { arthrose: 2.5, arthrite: 1.3 } }),
          C.degres("arom_flexion", "Flexion active mesurée"),
          C.amplitude("arom_extension", "Extension active", "extension", { complete: { menisque: .85, arthrose: .8 }, fin: { hoffa: 1.5 },
            lim_douleur: { menisque: 1.5, lca: 1.5, arthrite: 1.5 }, lim_raideur: { arthrose: 2.5 }, blocage: { menisque: 4 } }, true),
          C.degres("arom_extension", "Déficit d'extension active", true),
        ] },
        { titre: "PROM", toutNormal: true, questions: [
          C.amplitude("prom_flexion", "Flexion passive", "flexion", { complete: { arthrose: .7 }, lim_douleur: { menisque: 1.3, arthrite: 1.5 }, lim_raideur: { arthrose: 2 } }),
          C.degres("prom_flexion", "Flexion passive mesurée"),
          C.amplitude("prom_extension", "Extension passive", "extension", { complete: { arthrose: .8 }, lim_raideur: { arthrose: 2 }, blocage: { menisque: 3 } }, true),
          C.degres("prom_extension", "Déficit d'extension passive", true),
        ] },
        { titre: "RROM", res: "rrom", toutNormal: true, labels: ["Douloureuse", "Indolore"], questions: [
          ouiNon("rrom_flexion", "Flexion résistée", { court: "flexion", genre: "f", effets: { poie: p(1.5, .9) } }),
          ouiNon("rrom_extension", "Extension résistée", { court: "extension", genre: "f", effets: { tendino: p(2, .6), apo: p(1.5, .8), sfp: p(1.2, .95) } }),
        ] },
        { titre: "LCA", toutNormal: true, questions: [
          C.lig("lachman", "Lachman", "Lachman", { lca: ver(.81, .85, SOKAL, { pos: ["laxite"], neg: ["normal"] }) },
            { aide: "Genou fléchi à 20–30°, translation antérieure du tibia." }),
          C.lig("tiroir_ant", "Tiroir antérieur", "tiroir antérieur", { lca: ver(.83, .85, `${SOKAL} ; en soins primaires, Wagemakers 2010 : RV+ 2,0, RV− 0,3`, { pos: ["laxite"], neg: ["normal"] }) }),
        ] },
        { titre: "LCP", toutNormal: true, questions: [
          C.lig("tiroir_post", "Tiroir postérieur", "tiroir postérieur", { lcp: lit(.9, .99, "Rubinstein et coll., 1994", { pos: ["laxite"], neg: ["normal"] }) }),
          ouiNon("sag", "Sag sign", { court: "sag sign", res: TEST, effets: { lcp: p(8, .6, { g: "lcp-ex" }) } }),
        ] },
        { titre: "LLI", fusion: "stress en valgus à 0° et 30°", toutNormal: true, questions: [
          C.lig("valgus0", "Stress en valgus à 0°", "stress en valgus à 0°", { collat: { rv: { normal: .7, douleur: 2, laxite: 5 }, g: "collat-ex" }, lca: { rv: { laxite: 2 } } }),
          C.lig("valgus30", "Stress en valgus à 30°", "stress en valgus à 30°",
            { collat: { rv: { normal: .3, douleur: 3, laxite: 5 }, g: "collat-ex", statut: "a_verifier", piste: "Solomon et coll., 2001, JAMA (examen clinique rationnel) : données limitées" } }),
        ] },
        { titre: "LLE", fusion: "stress en varus à 0° et 30°", toutNormal: true, questions: [
          C.lig("varus0", "Stress en varus à 0°", "stress en varus à 0°", { collat: { rv: { normal: .9, douleur: 2, laxite: 5 }, g: "collat-ex" }, lca: { rv: { laxite: 1.5 } } }),
          C.lig("varus30", "Stress en varus à 30°", "stress en varus à 30°", { collat: { rv: { normal: .7, douleur: 2.5, laxite: 4 }, g: "collat-ex" } }),
        ] },
        { titre: "Ménisques", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          choix("mcmurray", "McMurray", [o("negatif", "Négatif", {}, { n: "McMurray négatif" }), o("med", "Positif médial", {}, { n: "McMurray positif médial" }), o("lat", "Positif latéral", {}, { n: "McMurray positif latéral" })],
            { effets: { menisque: lit(.7, .71, "Hegedus et coll., 2007, méta-analyse (JOSPT)", { pos: ["med", "lat"], neg: ["negatif"], g: "menisque-ex" }) } }),
          ouiNon("thessaly", "Thessaly (20°)", { court: "Thessaly", aide: "Appui unipodal, genou à 20°, rotations du tronc.",
            effets: { menisque: est(2.5, .4, "Karachalios et coll., 2005 (valeurs élevées) ; Goossens et coll., 2015 et Blyth et coll., 2015 (valeurs faibles) : à trancher", { g: "menisque-ex" }) } }),
          ouiNon("apley", "Apley", { court: "Apley", effets: { menisque: est(2, .6, "Hegedus et coll., 2007 ou Smith et coll., 2015 (méta-analyses)", { g: "menisque-ex" }) } }),
        ] },
        { titre: "Rotule", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          choix("mobilite_rotule", "Mobilité rotulienne", [o("normale", "Normale", {}, { n: "mobilité rotulienne normale et indolore" }), o("augmentee", "Augmentée", { rotule: 3 }, { n: "mobilité rotulienne augmentée" }),
            o("diminuee", "Diminuée", { arthrose: 1.5, sfp: 1.2 }, { n: "mobilité rotulienne diminuée" })]),
          ouiNon("clarke", "Clarke (rabot)", { court: "Clarke (rabot)", effets: { sfp: lit(.39, .67, "Nunes et coll., 2013 ou Cook et coll., 2012 (revues systématiques)", { g: "sfp-ex" }) } }),
          ouiNon("apprehension", "Appréhension rotulienne", { court: "appréhension rotulienne", genre: "f",
            effets: { rotule: est(4, .3, "Ahmad et coll., 2009 (appréhension mobile) ; données limitées", { g: "rotule-ex" }) } }),
          ouiNon("hoffa_test", "Pincement du fat pad (Hoffa)", { court: "pincement du fat pad (Hoffa)", res: "palp", effets: { hoffa: p(4, .4) } }),
          ouiNon("mcconnell", "McConnell", { court: "McConnell", aide: "Douleur en contraction isométrique à différents angles, soulagée par une poussée médiale de la rotule.", effets: { sfp: p(2, .7, { g: "sfp-ex" }) } }),
        ] },
        { titre: "Autres tests", ligne: false, res: TEST, toutNormal: true, labels: ["Positif", "Négatif"], questions: [
          ouiNon("dial", "Dial test", { court: "Dial test", horsNormal: true, effets: { lcp: p(3, .9), collat: p(2, .95) } }),
          choix("elj", "Élévation de la jambe tendue", [o("possible", "Possible", {}, { n: "élévation de la jambe tendue possible" }), o("impossible", "Impossible", {}, { n: "élévation de la jambe tendue impossible" })]),
          ouiNon("lag_ext", "Lag en extension", { court: "lag en extension", effets: { tendino: p(2, .95) } }),
          ouiNon("noble", "Noble", { court: "Noble", effets: { bit: p(4, .4, { g: "bit-ex" }) } }),
          ouiNon("crepitants", "Crépitants", { court: "crépitants", genre: "mp", res: "pres", horsNormal: true, effets: { arthrose: p(2, .6), sfp: p(1.2, .95) } }),
        ] },
        { titre: "Règle d'Ottawa", si: L => L.trauma() && (!L.repondu("duree") || L.v("duree") === "lt7"), ligne: "Ottawa", aide: "Traumatisme : radiographie si au moins un critère. L'âge (55 ans et plus) et la palpation (rotule isolée, tête du péroné) sont repris des autres sections.",
          questions: [
            ouiNon("ott_4pas", "Incapable de faire 4 pas, immédiatement après la blessure et à l'examen", { oui: "incapable de faire 4 pas", non: "4 pas possibles" }),
            ouiNon("ott_flexion", "Incapable de fléchir à 90°", { oui: "flexion à 90° impossible", non: "flexion à 90° possible" }),
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
        ? { niveau: "rapide", titre: "Bursite prépatellaire septique à éliminer", ro: "bursite septique", texte: "Bourse prépatellaire enflée avec chaleur, rougeur ou fièvre.",
          conduite: ["Ponction-aspiration de la bourse (culture, Gram, cristaux) ; antibiotique selon le résultat."] } : null,
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
        const enfant = L.age !== null && L.age < 18 ? " Chez les moins de 18 ans, la règle a été moins étudiée." : "";
        if (crit.length) return { niveau: "rapide", titre: "Radiographie du genou indiquée (règle d'Ottawa)", ro: "fracture", texte: `Critère : ${crit.join(", ")}.${enfant}`,
          conduite: ["Radiographie du genou (règle d'Ottawa positive)."] };
        if (faits.every(Boolean)) return { niveau: "info", titre: "Règle d'Ottawa négative", texte: `Aucun critère : la radiographie n'est pas nécessaire pour éliminer une fracture.${enfant}` };
        return { niveau: "info", titre: "Règle d'Ottawa à compléter", texte: "Traumatisme : âge, 4 pas, flexion à 90°, palpation de la rotule et de la tête du péroné." };
      },
      L => L.v("elj") === "impossible" ? { niveau: "rapide", titre: "Rupture de l'appareil extenseur à éliminer", ro: "rupture de l'appareil extenseur",
        texte: "Élévation de la jambe tendue impossible : tendon quadricipital ou rotulien, ou fracture de la rotule.",
        conduite: ["Radiographie et orthopédie rapidement (médecin de garde) ; CRDS AH-753, priorité B, si rupture complète confirmée."],
        liens: [{ t: "CRDS : rupture du tendon rotulien ou quadricipital", u: "/crds/?q=rupture%20du%20tendon%20rotulien" }] } : null,
      L => {
        const plusieurs = L.v("lachman") === "laxite" && (L.v("valgus0") === "laxite" || L.v("varus0") === "laxite" || L.v("tiroir_post") === "laxite");
        if (!(L.oui("pouls_dim") || L.oui("deficit_fibulaire") || plusieurs)) return null;
        return { niveau: "urgence", titre: "Luxation du genou ou atteinte neurovasculaire à éliminer", ro: "luxation du genou",
          texte: plusieurs ? "Laxité de plusieurs ligaments." : "Pouls diminués ou déficit du nerf fibulaire.", conduite: ["Diriger à l'urgence : évaluation vasculaire (indice tibio-brachial, imagerie) et orthopédie."] };
      },
      L => (L.v("arom_extension") === "blocage" || L.v("prom_extension") === "blocage") ? { niveau: "rapide", titre: "Genou bloqué", ro: "déchirure méniscale en anse de seau",
        texte: "Blocage mécanique de l'extension : déchirure méniscale en anse de seau ou corps libre.", conduite: ["Orthopédie rapidement (IRM selon l'accès)."] } : null,
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
          conduite: ["Radiographie du genou : face, profil, axiale et vue de l'échancrure (tunnel)."] } : null,
      C.regles.tumeur("Radiographie du genou, fémur distal et tibia proximal compris."),
      L => L.oui("mollet") ? { niveau: "rapide", titre: "Thrombose veineuse profonde à éliminer", ro: "TVP", texte: "Mollet enflé, chaud ou douloureux. Un kyste poplité rompu peut l'imiter.",
        conduite: ["Score de Wells, D-dimères ou écho-doppler selon la probabilité."], liens: [{ t: "CRDS : accueil clinique, thrombophlébite profonde", u: "/crds/?q=TVP" }] } : null,
      L => (L.oui("pkb") || L.oui("reflexe_rot") || L.oui("deficit_l3l4") || L.v("irradiation") === "radiculaire" || L.dans("type_douleur", ["brulure", "choc"]) || (L.oui("douleur_dos") && L.v("lombaire_mob") === "douleur"))
        ? { niveau: "considerer", titre: "Origine lombaire (radiculopathie L3–L4) à considérer", ro: "radiculopathie L3–L4", texte: "Douleur de type nerveux, irradiation radiculaire ou signes neurologiques.",
          conduite: ["Examen neurologique et lombaire complet."] } : null,
      L => (L.age !== null && L.age >= 18 && (L.dans("hanche_ri", ["limitee"]) || L.oui("fadir") || L.oui("douleur_hanche")))
        ? { niveau: "considerer", titre: "Douleur référée de la hanche à considérer", ro: "douleur référée de la hanche", texte: "Rotation interne de la hanche limitée ou douloureuse, ou douleur à l'aine.",
          conduite: ["Radiographie du bassin et de la hanche si la rotation interne est limitée ou douloureuse."] } : null,
      L => (L.oui("autres_articulations") && (L.v("raideur") === "plus30" || L.oui("reveils")))
        ? { niveau: "considerer", titre: "Arthrite inflammatoire à considérer", ro: "arthrite inflammatoire", texte: "Plusieurs articulations, raideur matinale prolongée ou réveils nocturnes.",
          conduite: ["Bilan inflammatoire ; rhumatologie (CRDS AH-765) selon le tableau."], liens: [{ t: "CRDS : rhumatologie", u: "/crds/?q=polyarthrite" }] } : null,
      // Critères cliniques de l'ACR pour l'arthrose : affichés, pas comptés (ils recoupent l'âge et des signes déjà comptés).
      L => {
        if (L.age === null || L.age < 40) return null;
        const items = [[L.age > 50, true], [L.v("raideur") === "moins30", L.repondu("raideur")], [L.oui("crepitants"), L.repondu("crepitants")],
          [L.oui("p_rebords"), L.repondu("p_rebords")], [L.a("ex_tumefaction", "osseux"), L.repondu("ex_tumefaction")], [L.non("ex_chaleur"), L.repondu("ex_chaleur")]];
        const evalues = items.filter(x => x[1]).length, oui = items.filter(x => x[0]).length;
        if (evalues < 4) return null;
        return { niveau: "info", titre: `Critères cliniques de l'ACR pour l'arthrose : ${oui} sur 6`,
          texte: `${oui >= 3 ? "Compatible (3 ou plus)" : "Moins de 3"} ; ${evalues} critères évalués (Altman et coll., 1986, à vérifier). Ce compte n'entre pas dans le calcul : il reprend l'âge et des signes déjà comptés.` };
      },
    ],
  });
})();
