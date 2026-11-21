/* Locomoteur Morand, genou (prototype 0.1, novembre 2026) : questions, diagnostics, poids, règles et conduite.

   ATTENTION : aucun poids n'est encore validé.
     p(RV si oui, RV si non)  estimation clinique provisoire, sans source : à remplacer.
     lit(Se, Sp, « piste »)   sensibilité et spécificité publiées, citées de mémoire : à vérifier dans l'article.
     est(RV+, RV−, « piste ») rapports de vraisemblance publiés, cités de mémoire : à vérifier.
   Les probabilités de départ (base, par âge exact) et les multiplicateurs du sexe sont aussi provisoires.
   Option d'un choix : o(valeur, libellé, { diagnostic: RV }). Liste à cocher : m(valeur, libellé, { diagnostic: p(…) }).
   « g » regroupe les éléments qui se recoupent : seul le plus fort en faveur et le plus fort en défaveur comptent. */
(function () {
  "use strict";
  const { p, lit, est, o, m, ouiNon, choix, multi, nombre, texte } = window.Locomoteur.outils;
  const TEST = ["Positif", "Négatif"], PALP = ["Sensible", "Indolore"];
  const trauma = L => L.trauma();

  window.Locomoteur.definir({
    id: "genou",
    titre: "Douleur au genou",
    noteTitre: "Douleur au genou",
    version: "Prototype 0.1 · novembre 2026",
    ages: "12 ans et plus",

    /* ---------- Diagnostics : probabilité de départ par âge (points [âge, probabilité]) et multiplicateur de cote du sexe ---------- */
    diagnostics: [
      { id: "sfp", nom: "Syndrome fémoro-patellaire", n: "syndrome fémoro-patellaire", base: [[12, .25], [16, .32], [28, .2], [50, .06], [70, .02]], sexe: { F: 1.5, M: .7 },
        conduite: ["Pas d'imagerie d'emblée ; radiographie si présentation atypique, épanchement ou absence d'amélioration après 3 mois de traitement bien suivi.",
          "Explication et ajustement des charges (escaliers, accroupissement, course).",
          "Exercices de renforcement du quadriceps et de la hanche (abducteurs, rotateurs externes), idéalement en physiothérapie ; taping ou orthèses plantaires possibles à court terme.",
          "Revoir dans 6 à 8 semaines."] },
      { id: "arthrose", nom: "Arthrose du genou", n: "arthrose du genou", base: [[12, .003], [16, .005], [28, .04], [45, .2], [55, .35], [70, .55], [85, .65]], sexe: { F: 1.25, M: .8 },
        conduite: [{ t: "Diagnostic clinique possible sans imagerie : 45 ans et plus, douleur liée à l'activité, raideur matinale absente ou de 30 minutes ou moins (NICE).", si: L => L.age >= 45 && L.dans("raideur", ["aucune", "moins30"]) },
          "Radiographie debout (en charge) si présentation atypique ou si une référence en orthopédie est envisagée ; pas d'IRM (Choisir avec soin).",
          "Exercice (renforcement et aérobie), perte de poids si surpoids, éducation (programme GLA:D Canada).",
          "AINS topiques en premier ; AINS oraux à court terme selon le profil ; infiltration de corticostéroïdes possible lors d'une poussée.",
          "Orthopédie si arthrose invalidante malgré le traitement : CRDS AH-753, priorité D, avec le rapport de radiographie."],
        liens: [{ t: "CRDS : arthrose invalidante du genou", u: "/crds/?q=arthrose%20invalidante%20du%20genou" }] },
      { id: "menisque", nom: "Déchirure méniscale", n: "déchirure méniscale", base: [[12, .04], [16, .07], [28, .12], [50, .15], [70, .12]], sexe: { M: 1.2, F: .85 },
        conduite: [{ t: "Probablement dégénérative (40 ans et plus, sans traumatisme important) : traitement conservateur et physiothérapie ; pas d'IRM ni d'arthroscopie d'emblée (Choisir avec soin).", si: L => L.age >= 40 && !L.trauma() },
          { t: "Traumatique avec symptômes mécaniques : IRM à envisager ; genou bloqué en extension : orthopédie rapidement.", si: L => L.trauma() || L.age === null || L.age < 40 },
          "Physiothérapie (amplitude, contrôle de l'épanchement, renforcement).",
          "Orthopédie : CRDS AH-753, déchirure méniscale aiguë ou traumatique (moins de 60 ans), priorité D, avec le rapport d'IRM."],
        liens: [{ t: "CRDS : déchirure méniscale", u: "/crds/?q=d%C3%A9chirure%20m%C3%A9niscale" }] },
      { id: "lca", nom: "Rupture du ligament croisé antérieur", n: "rupture du ligament croisé antérieur", base: [[12, .03], [16, .06], [28, .07], [50, .025], [70, .01]], sexe: { F: 1.2, M: .9 },
        conduite: ["Radiographie si un critère d'Ottawa est présent (fracture de Segond, arrachement).",
          "Physiothérapie précoce (amplitude, épanchement, quadriceps) ; béquilles et orthèse au besoin.",
          "IRM pour confirmer en cas de doute ou si une reconstruction est envisagée (jeune actif, sport de pivot, instabilité).",
          "Orthopédie : CRDS AH-753, rupture du ligament croisé avec physiothérapie initiée, priorité C, avec le rapport d'IRM."],
        liens: [{ t: "CRDS : rupture du ligament croisé", u: "/crds/?q=ligament%20crois%C3%A9" }] },
      { id: "collat", nom: "Entorse d'un ligament collatéral (LCM, LCL)", n: "entorse d'un ligament collatéral", base: [[12, .03], [16, .05], [28, .05], [50, .03], [70, .015]],
        conduite: ["Radiographie selon la règle d'Ottawa.",
          "LCM, grade I ou II : traitement conservateur, mise en charge selon la tolérance, orthèse articulée si grade II ou III, physiothérapie.",
          "Laxité en varus, laxité en extension complète ou atteinte de plusieurs ligaments : orthopédie rapidement (coin postéro-latéral, luxation du genou)."] },
      { id: "rotule", nom: "Instabilité ou luxation de la rotule", n: "instabilité rotulienne", base: [[12, .05], [16, .07], [28, .03], [50, .006], [70, .003]], sexe: { F: 1.4, M: .75 },
        conduite: ["Après une première luxation : radiographie (face, profil, axiale) pour éliminer une fracture ostéochondrale ; IRM si hémarthrose importante ou fragment.",
          "Physiothérapie (quadriceps, hanche, proprioception) ; orthèse de stabilisation rotulienne à court terme.",
          "Orthopédie si fragment ostéochondral, luxations récidivantes ou instabilité persistante."] },
      { id: "tendino", nom: "Tendinopathie rotulienne ou quadricipitale", n: "tendinopathie rotulienne ou quadricipitale", base: [[12, .04], [16, .07], [28, .06], [50, .03], [70, .02]], sexe: { M: 1.3, F: .8 },
        conduite: ["Pas d'imagerie d'emblée ; échographie si doute diagnostique ou rupture partielle soupçonnée.",
          "Programme de mise en charge progressive (isométrique, puis lourd et lent), gestion des sauts ; physiothérapie.",
          "Éviter les infiltrations de corticostéroïdes dans le tendon."] },
      { id: "bit", nom: "Syndrome de la bandelette ilio-tibiale", n: "syndrome de la bandelette ilio-tibiale", base: [[12, .01], [16, .02], [28, .05], [50, .02], [70, .006]],
        conduite: ["Pas d'imagerie d'emblée.", "Ajuster l'entraînement (volume, dénivelé), renforcer les abducteurs de la hanche, physiothérapie ; infiltration possible si la douleur persiste."] },
      { id: "bprep", nom: "Bursite prérotulienne", n: "bursite prérotulienne", base: [[12, .01], [16, .01], [28, .02], [50, .03], [70, .02]], sexe: { M: 1.5, F: .7 },
        conduite: ["Protection, éviter l'appui sur les genoux, glace, AINS.", "Bourse chaude, rouge ou fièvre : ponction-aspiration de la bourse (bursite septique, souvent à S. aureus) avec culture, Gram et cristaux."] },
      { id: "poie", nom: "Tendinobursite de la patte d'oie", n: "tendinobursite de la patte d'oie", base: [[12, .003], [16, .005], [28, .01], [50, .05], [70, .06]], sexe: { F: 1.6, M: .65 },
        conduite: ["Exercices (ischiojambiers, quadriceps), perte de poids au besoin ; infiltration possible.", "Chercher une arthrose associée."] },
      { id: "apo", nom: "Apophysite (Osgood-Schlatter, Sinding-Larsen-Johansson)", n: "apophysite (Osgood-Schlatter ou Sinding-Larsen-Johansson)", base: [[11, .18], [13, .15], [15, .1], [17, .04], [19, .008], [25, .001]], sexe: { M: 1.4, F: .7 },
        conduite: ["Bénin et spontanément résolutif : activité selon la douleur, glace, étirements (quadriceps, ischiojambiers).",
          "Radiographie si atypique (unilatéral avec douleur nocturne, au repos ou masse) pour éliminer une tumeur ou une fracture-avulsion."] },
      { id: "arthrite", nom: "Arthrite microcristalline ou inflammatoire", n: "arthrite microcristalline ou inflammatoire", base: [[12, .01], [16, .01], [28, .02], [50, .05], [70, .07]],
        conduite: ["Épanchement inexpliqué, surtout chaud : ponction articulaire (numération, Gram, culture, cristaux) ; l'infection doit être éliminée.",
          "Bilan selon le tableau : FSC, CRP, VS, acide urique, FR et anti-CCP ; HLA-B27 si spondylarthrite soupçonnée ; radiographie (chondrocalcinose).",
          "Rhumatologie : CRDS AH-765 (arthrite microcristalline, polyarthrite)."],
        liens: [{ t: "CRDS : arthropathie inflammatoire", u: "/crds/?q=arthrite" }] },
      { id: "baker", nom: "Kyste poplité (de Baker)", n: "kyste poplité (de Baker)", base: [[12, .003], [16, .005], [28, .01], [50, .04], [70, .06]],
        conduite: ["Échographie si doute ; traiter la cause (arthrose, ménisque).", "Mollet enflé ou douloureux : un kyste rompu imite une TVP ; écho-doppler pour l'éliminer."] },
    ],

    /* Diagnostics qui coexistent souvent : ils ne se font pas concurrence (les autres, oui ; voir le moteur). Provisoire. */
    compatibles: [["lca", "menisque"], ["lca", "collat"], ["menisque", "collat"], ["arthrose", "menisque"], ["arthrose", "baker"], ["menisque", "baker"],
      ["arthrose", "poie"], ["arthrose", "arthrite"], ["arthrite", "baker"], ["sfp", "bit"], ["rotule", "sfp"]],

    /* ---------- Questions ---------- */
    sections: [
      { id: "identification", titre: "Identification", blocs: [
        { questions: [
          choix("sexe", "Sexe", [o("F", "Femme"), o("M", "Homme")], { aide: "Change la probabilité de départ de chaque diagnostic." }),
          nombre("age", "Âge", { unite: "ans", min: 12, max: 110, aide: "Âge exact : la probabilité de départ suit l'âge." }),
          choix("cote", "Genou atteint", [o("D", "Droit"), o("G", "Gauche"), o("B", "Les deux")]),
          choix("lateralite", "Latéralité", [o("D", "Droitier"), o("G", "Gaucher"), o("A", "Ambidextre")], { aide: "Pour la note seulement : aucune donnée ne la relie aux atteintes du genou." }),
          choix("travail", "Occupation", [o("etudes", "Études", {}, { n: "aux études" }), o("bureau", "Travail de bureau ou sédentaire", {}, { n: "travail sédentaire" }),
            o("physique", "Travail physique", { arthrose: 1.2, menisque: 1.2 }, { n: "travail physique" }),
            o("genoux", "Travail à genoux (plancher, toiture, plomberie…)", { bprep: 3, menisque: 1.3, arthrose: 1.2 }, { n: "travail à genoux" }),
            o("retraite", "Retraite ou sans emploi", {}, { n: "retraité ou sans emploi" })], { court: "Occupation" }),
          choix("sport", "Activité physique", [o("aucun", "Peu ou pas de sport", { lca: .5, rotule: .7, tendino: .5, bit: .4, sfp: .8, collat: .7 }, { n: "peu ou pas de sport" }),
            o("course", "Course à pied ou vélo", { bit: 2.5, sfp: 1.5, tendino: 1.2 }, { n: "course à pied ou vélo" }),
            o("pivot", "Sport de pivot ou de saut (soccer, basketball, ski, volleyball, badminton…)", { lca: 2, menisque: 1.4, rotule: 1.5, tendino: 2, apo: 1.5, collat: 1.5 }, { n: "sport de pivot ou de saut" }),
            o("autre", "Autre activité", {}, { n: "autre activité physique" })]),
          ouiNon("obesite", "Surpoids important (IMC 30 ou plus)", { court: "IMC de 30 ou plus", effets: { arthrose: p(1.6, .85), poie: p(1.8, .8) } }),
        ] },
      ] },

      { id: "anamnese", titre: "Anamnèse", noteTitre: "HISTOIRE", blocs: [
        { titre: "Début", questions: [
          ouiNon("premier", "Premier épisode", { n: ["Premier épisode", "Épisodes antérieurs semblables"],
            effets: { lca: p(1.5, .7), collat: p(1.5, .6), menisque: p(1.2, .9), arthrose: p(.7, 1.5), rotule: p(.7, 1.6), arthrite: p(.7, 1.5), sfp: p(.8, 1.3) } }),
          choix("duree", "Depuis combien de temps", [
            o("lt7", "Moins de 7 jours", { lca: 2, collat: 2.5, menisque: 1.3, rotule: 1.5, arthrose: .4, tendino: .4, sfp: .5, poie: .5, apo: .6, arthrite: 1.5, bprep: 1.5, bit: .6 }, { n: "douleur depuis moins de 7 jours" }),
            o("s1_6", "1 à 6 semaines", { lca: 1.3, collat: 1.3, menisque: 1.2, arthrose: .7, tendino: .8, sfp: .9 }, { n: "douleur depuis 1 à 6 semaines" }),
            o("s6_12", "6 semaines à 3 mois", { arthrose: 1.1, tendino: 1.2, sfp: 1.2, lca: .7, collat: .5 }, { n: "douleur depuis 6 semaines à 3 mois" }),
            o("gt3m", "Plus de 3 mois", { arthrose: 1.8, tendino: 1.5, sfp: 1.4, poie: 1.3, apo: 1.3, lca: .5, collat: .3, arthrite: .8, rotule: .8 }, { n: "douleur depuis plus de 3 mois" })]),
          choix("apparition", "Mode d'apparition", [
            o("subit_trauma", "Subit, avec un traumatisme", { lca: 4, collat: 4, menisque: 2, rotule: 3, bprep: 1.5, sfp: .3, arthrose: .3, tendino: .3, bit: .2, poie: .3, apo: .4, arthrite: .3, baker: .5 }, { n: "début subit lors d'un traumatisme" }),
            o("subit", "Subit, sans traumatisme", { arthrite: 3, menisque: 1.3, rotule: 1.2, lca: .3, collat: .3, sfp: .5 }, { n: "début subit sans traumatisme" }),
            o("graduel", "Graduel", { sfp: 1.8, arthrose: 1.8, tendino: 1.8, bit: 2, poie: 1.6, apo: 1.8, menisque: .8, rotule: .4, lca: .15, collat: .15 }, { n: "début graduel" }),
            o("insidieux", "Insidieux", { sfp: 1.8, arthrose: 2, tendino: 1.5, bit: 1.5, poie: 1.6, apo: 1.5, baker: 1.3, menisque: .8, rotule: .3, lca: .1, collat: .1 }, { n: "début insidieux" })],
            { aide: "Graduel : s'installe en quelques jours ou semaines, souvent avec une hausse d'activité. Insidieux : sans cause apparente, très lentement." }),
          choix("mecanisme", "Mécanisme", [
            o("pivot", "Pivot ou torsion, pied au sol", { lca: 2.5, menisque: 2, rotule: 2, collat: 1.2 }, { n: "mécanisme de pivot, pied au sol" }),
            o("deceleration", "Décélération ou réception de saut", { lca: 2.5, menisque: 1.2 }, { n: "décélération ou réception de saut" }),
            o("valgus", "Coup ou stress en valgus (de l'extérieur)", { collat: 4, lca: 1.5, menisque: 1.2 }, { n: "stress en valgus" }),
            o("varus", "Coup ou stress en varus (de l'intérieur)", { collat: 3, lca: 1.2 }, { n: "stress en varus" }),
            o("direct", "Coup direct sur le genou", { bprep: 2, lca: .6 }, { n: "coup direct sur le genou" }),
            o("hyperext", "Hyperextension", { lca: 2 }, { n: "hyperextension" }),
            o("accroupi", "En s'accroupissant ou en se relevant", { menisque: 3, lca: .3, collat: .3 }, { n: "en s'accroupissant ou en se relevant" })],
            { si: trauma }),
          ouiNon("pop", "Pop ou craquement au moment de la blessure", { si: trauma, court: "pop", effets: { lca: p(2.5, .5), rotule: p(1.5, .9), menisque: p(1.2, .9) } }),
          ouiNon("enflure_rapide", "Enflure en moins de 2 heures", { si: trauma, court: "enflure rapide (moins de 2 h)", g: "hemarthrose",
            effets: { lca: p(3, .4), rotule: p(2.5, .7), menisque: p(.8, 1) } }),
          ouiNon("enflure_tardive", "Enflure après quelques heures (6 à 24 h)", { si: trauma, court: "enflure tardive (6 à 24 h)", effets: { menisque: p(2, .8), lca: p(.8, 1) } }),
          ouiNon("poursuivre", "A pu poursuivre l'activité", { si: trauma, n: ["A pu poursuivre l'activité", "N'a pas pu poursuivre l'activité"], effets: { lca: p(.5, 2), rotule: p(.7, 1.5) } }),
          ouiNon("ecchymose", "Ecchymose", { si: trauma, court: "ecchymose", g: "ecchymose", effets: { collat: p(2, .8), lca: p(1.3, .9) } }),
          ouiNon("rotule_sortie", "Sensation que la rotule est sortie de place", { court: "sensation que la rotule est sortie de place", effets: { rotule: p(8, .4) } }),
        ] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("anterieure", "Antérieure, autour de la rotule", { sfp: p(3, .3), rotule: p(1.5, .6), tendino: p(1.3, .8), apo: p(.8, 1) }, { n: "antérieure, autour de la rotule" }),
            m("prerotulienne", "Devant la rotule, superficielle", { bprep: p(6, .3, { g: "bprep" }) }, { n: "devant la rotule, superficielle" }),
            m("pole_inf", "Sous la rotule (tendon rotulien)", { tendino: p(4, .4), apo: p(2, .8), sfp: p(1.2, 1) }, { n: "sous la rotule" }),
            m("tuberosite", "Tubérosité tibiale", { apo: p(6, .3, { g: "apo" }), tendino: p(1.5, .9) }, { n: "à la tubérosité tibiale" }),
            m("interligne_med", "Interligne médial", { menisque: p(2.5, .5), arthrose: p(1.8, .7), collat: p(1.8, .7), poie: p(1.2, 1) }, { n: "à l'interligne médial" }),
            m("interligne_lat", "Interligne latéral", { menisque: p(1.8, .8), bit: p(1.5, .9), collat: p(1.3, .9), arthrose: p(1.2, .95) }, { n: "à l'interligne latéral" }),
            m("patte_oie", "Médiale, sous l'interligne (patte d'oie)", { poie: p(5, .3), collat: p(1.2, 1) }, { n: "médiale, sous l'interligne" }),
            m("laterale", "Latérale, au-dessus de l'interligne (bandelette)", { bit: p(5, .3), collat: p(1.2, .9) }, { n: "latérale, au-dessus de l'interligne" }),
            m("posterieure", "Postérieure (creux poplité)", { baker: p(5, .5, { g: "baker" }), menisque: p(1.3, .95) }, { n: "postérieure" }),
            m("diffuse", "Diffuse, mal localisée", { arthrite: p(2, .8), sfp: p(1.3, 1), arthrose: p(1.3, 1) }, { n: "diffuse" }),
          ], { court: "Siège de la douleur", aide: "Plusieurs choix possibles. Une fois un siège coché, les sièges non cochés comptent comme absents." }),
          choix("irradiation", "Irradiation", [o("aucune", "Aucune", {}, { n: "sans irradiation" }), o("cuisse", "Vers la cuisse ou la hanche", {}, { n: "irradiation vers la cuisse ou la hanche" }),
            o("mollet", "Vers le mollet", { baker: 1.5 }, { n: "irradiation vers le mollet" }), o("radiculaire", "Le long du membre (trajet radiculaire)", {}, { n: "irradiation radiculaire le long du membre" })]),
          choix("type_douleur", "Type de douleur", [o("pression", "Pression, comme un bleu", { sfp: 1.1, arthrose: 1.1 }), o("sourde", "Sourde, profonde", { arthrose: 1.2 }),
            o("aigue", "Aiguë, en coup de poignard", { menisque: 1.3 }), o("brulure", "Brûlure"), o("choc", "Choc électrique"), o("pulsatile", "Lancinante, pulsatile", { arthrite: 1.5 }), o("autre", "Autre")],
            { court: "Type de douleur", aide: "Brûlure ou choc électrique : penser à une origine nerveuse (voir les alertes)." }),
          nombre("intensite", "Intensité (0 à 10)", { court: "Intensité", unite: "/10", min: 0, max: 10 }),
          ouiNon("douleur_hanche", "Douleur à la hanche ou à l'aine", { court: "douleur à la hanche ou à l'aine" }),
          ouiNon("douleur_dos", "Douleur au bas du dos", { court: "douleur au bas du dos" }),
          ouiNon("douleur_cheville", "Douleur à la cheville ou au pied", { court: "douleur à la cheville ou au pied" }),
          ouiNon("autres_articulations", "Douleur ou enflure d'autres articulations", { court: "atteinte d'autres articulations", effets: { arthrite: p(3, .8) } }),
        ] },
        { titre: "Caractéristiques", questions: [
          ouiNon("derobade", "Dérobades (le genou lâche)", { court: "dérobades", effets: { lca: p(2, .5), rotule: p(2, .6), sfp: p(1.2, .95), menisque: p(1.2, .95) } }),
          ouiNon("blocage", "Blocages vrais (impossible d'étendre le genou)", { court: "blocages vrais", effets: { menisque: p(2.5, .8), arthrose: p(1.2, 1) } }),
          ouiNon("accrochage", "Accrochages ou sensation d'accrocher", { court: "accrochages", effets: { menisque: p(1.5, .8), sfp: p(1.2, .95), arthrose: p(1.2, .95) } }),
          ouiNon("escaliers", "Pire dans les escaliers", { court: "douleur pire dans les escaliers", effets: { sfp: p(1.8, .4), arthrose: p(1.5, .6), tendino: p(1.3, .8), menisque: p(1.1, .95) } }),
          ouiNon("marche", "Pire à la marche", { court: "douleur pire à la marche", effets: { arthrose: p(1.6, .6), menisque: p(1.2, .9), poie: p(1.3, .9) } }),
          ouiNon("assis", "Pire en position assise prolongée", { court: "douleur pire en position assise prolongée", effets: { sfp: p(2.5, .6), arthrose: p(1.2, .95) } }),
          ouiNon("accroupi", "Pire accroupi ou à genoux", { court: "douleur pire accroupi ou à genoux", g: "accroupi",
            effets: { sfp: p(1.8, .5), menisque: p(1.6, .7), bprep: p(2, .6), tendino: p(1.3, .9), apo: p(1.5, .8) } }),
          ouiNon("course_saut", "Pire à la course ou au saut", { court: "douleur pire à la course ou au saut", effets: { tendino: p(2.5, .4), bit: p(2, .5), sfp: p(1.5, .7), apo: p(2, .6) } }),
          choix("moment", "Moment de la journée", [o("matin", "Pire le matin, mieux en bougeant", { arthrite: 2.5, arthrose: .9, sfp: .7 }, { n: "douleur pire le matin, améliorée par le mouvement" }),
            o("soir", "Pire en fin de journée ou après l'activité", { arthrose: 1.4, sfp: 1.3, tendino: 1.3, menisque: 1.2, arthrite: .5 }, { n: "douleur pire en fin de journée ou après l'activité" }),
            o("constante", "Constante", { arthrite: 1.3 }, { n: "douleur constante" })]),
          ouiNon("nocturne", "Douleur la nuit", { court: "douleur nocturne", drapeau: true, effets: { arthrite: p(1.8, .7), arthrose: p(1.3, .9), sfp: p(.6, 1.1), tendino: p(.7, 1.05) } }),
          ouiNon("reveils", "Réveils en deuxième partie de nuit", { court: "réveils en deuxième partie de nuit", effets: { arthrite: p(2.5, .8) } }),
          choix("raideur", "Raideur matinale", [o("aucune", "Aucune", { arthrite: .4, arthrose: .8 }, { n: "aucune raideur matinale" }),
            o("moins30", "Moins de 30 minutes", { arthrose: 1.8, arthrite: .6 }, { n: "raideur matinale de moins de 30 minutes" }),
            o("plus30", "30 minutes ou plus", { arthrite: 3.5, arthrose: .6 }, { n: "raideur matinale de 30 minutes ou plus" })]),
          ouiNon("enflure", "Enflure du genou (actuelle ou récurrente)", { court: "enflure", g: "epanchement",
            effets: { arthrite: p(2.5, .4), menisque: p(1.4, .8), lca: p(1.4, .8), arthrose: p(1.3, .9), baker: p(1.5, .8), sfp: p(.4, 1.2), tendino: p(.5, 1.1), bit: p(.4, 1.1), apo: p(.6, 1.05) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { court: "rougeur ou chaleur", g: "inflammation", effets: { arthrite: p(3, .7), bprep: p(2.5, .85), arthrose: p(.6, 1) } }),
        ] },
      ] },

      { id: "antecedents", titre: "Antécédents", noteTitre: "ANTÉCÉDENTS", blocs: [
        { questions: [
          ouiNon("atcd_genou", "Blessure ou chirurgie antérieure à ce genou", { court: "blessure ou chirurgie antérieure à ce genou", effets: { arthrose: p(1.8, .85), menisque: p(1.4, .95), lca: p(1.2, 1), rotule: p(1.5, .95) } }),
          multi("atcd_rhumato", "Antécédents personnels", [
            m("aucun", "Aucun", {}, { exclusif: true }),
            m("goutte", "Goutte", { arthrite: p(4, 1) }), m("pseudogoutte", "Pseudogoutte (chondrocalcinose)", { arthrite: p(4, 1) }),
            m("psoriasis", "Psoriasis", { arthrite: p(2.5, 1) }), m("mii", "Maladie inflammatoire de l'intestin", { arthrite: p(2.5, 1) }),
            m("uveite", "Uvéite", { arthrite: p(2.5, 1) }), m("par", "Polyarthrite rhumatoïde", { arthrite: p(4, 1) }),
            m("spa", "Spondylarthrite", { arthrite: p(3, 1) }), m("synovite", "Synovite antérieure", { arthrite: p(3, 1) }),
            m("infection", "Infection récente (urinaire, génitale, digestive)", { arthrite: p(2.5, 1) }), m("autre", "Autre maladie rhumatologique", { arthrite: p(2, 1) }),
          ], { court: "Antécédents rhumatologiques", g: "atcd-rhumato" }),
          ouiNon("atcd_familiaux", "Antécédents familiaux rhumatologiques (polyarthrite, spondylarthrite, psoriasis, goutte)", { court: "antécédents familiaux rhumatologiques", effets: { arthrite: p(1.5, .9) } }),
          texte("atcd_autres", "Autres antécédents, médicaments", { court: "Autres" }),
        ] },
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", noteTitre: "DRAPEAUX ROUGES", blocs: [
        { labels: ["Présent", "Absent"], note: { pos: "présents", neg: "absents" }, questions: [
          ouiNon("fievre", "Fièvre ou frissons", { court: "fièvre", drapeau: true, effets: { arthrite: p(2, .9) } }),
          ouiNon("sympt_generaux", "Perte de poids, sueurs nocturnes ou fatigue inexpliquées", { court: "symptômes généraux", drapeau: true }),
          ouiNon("atcd_cancer", "Antécédent de cancer", { court: "antécédent de cancer", drapeau: true }),
          multi("risque_infection", "Facteurs de risque d'infection articulaire", [m("aucun", "Aucun", {}, { exclusif: true }), m("immuno", "Immunosuppression ou diabète"),
            m("prothese", "Prothèse du genou"), m("infiltration", "Infiltration ou chirurgie récente du genou"), m("udi", "Drogues injectables")], { court: "Facteurs de risque d'infection" }),
          ouiNon("mollet", "Mollet enflé, chaud ou douloureux", { court: "mollet enflé ou douloureux", drapeau: true, effets: { baker: p(1.5, 1) } }),
        ] },
      ] },

      { id: "examen", titre: "Examen du genou", noteTitre: "EXAMEN", blocs: [
        { titre: "Inspection", note: { titre: "Inspection", pos: "présent", neg: "absent" }, labels: ["Présent", "Absent"], questions: [
          choix("ex_alignement", "Alignement", [o("normal", "Normal", {}, { n: "alignement normal" }), o("valgus", "Valgus", { sfp: 1.3, rotule: 1.3, arthrose: 1.1 }, { n: "genu valgum" }),
            o("varus", "Varus", { arthrose: 1.8, menisque: 1.1 }, { n: "genu varum" }), o("flexum", "Flexum", { arthrose: 1.8, menisque: 1.2 }, { n: "flexum" }),
            o("recurvatum", "Recurvatum", { rotule: 1.3, lca: 1.1 }, { n: "recurvatum" })]),
          choix("ex_demarche", "Démarche", [o("normale", "Normale", { arthrite: .7 }, { n: "démarche normale" }), o("boiterie", "Boiterie", { lca: 1.3, menisque: 1.2, arthrite: 1.5, arthrose: 1.2 }, { n: "boiterie" }),
            o("appui", "Incapable de mettre du poids", { arthrite: 2, lca: 1.5 }, { n: "incapable de mettre du poids" }), o("rotext", "Pied en rotation externe", {}, { n: "marche le pied en rotation externe" })]),
          choix("ex_epanchement", "Épanchement", [o("aucun", "Aucun", { arthrite: .3, lca: .4, menisque: .6, arthrose: .8, baker: .7, sfp: 1.2, tendino: 1.1, bit: 1.1 }, { n: "pas d'épanchement" }),
            o("leger", "Léger (signe du flot)", { menisque: 1.5, arthrose: 1.5, lca: 1.3, arthrite: 1.5, sfp: .6 }, { n: "épanchement léger" }),
            o("important", "Modéré à important (choc rotulien)", { lca: 3, arthrite: 3, rotule: 2, menisque: 1.5, arthrose: 1.3, sfp: .3, tendino: .4, bit: .3 }, { n: "épanchement modéré à important" })],
            { g: "epanchement" }),
          ouiNon("ex_chaleur", "Chaleur ou rougeur", { court: "chaleur ou rougeur", g: "inflammation", effets: { arthrite: p(4, .5), bprep: p(2, .9), arthrose: p(.5, 1.1) } }),
          ouiNon("ex_ecchymose", "Ecchymose", { court: "ecchymose", g: "ecchymose", effets: { collat: p(2, .8), lca: p(1.3, .95) } }),
          multi("ex_tumefaction", "Tuméfaction localisée", [m("aucun", "Aucune", {}, { exclusif: true }),
            m("prerotulienne", "Devant la rotule (bourse)", { bprep: p(10, .2, { g: "bprep" }) }, { n: "devant la rotule" }),
            m("tuberosite", "Tubérosité tibiale proéminente", { apo: p(3, .7, { g: "apo" }) }, { n: "tubérosité tibiale proéminente" }),
            m("poplitee", "Masse au creux poplité", { baker: p(8, .4, { g: "baker" }) }, { n: "masse poplitée" }),
            m("osseux", "Élargissement osseux (ostéophytes)", { arthrose: p(4, .7, { g: "arthrose-osseux" }) }, { n: "élargissement osseux" })], { court: "Tuméfaction" }),
          ouiNon("ex_atrophie", "Atrophie du quadriceps", { court: "atrophie du quadriceps", effets: { arthrose: p(1.5, .9), lca: p(1.3, .95), sfp: p(1.2, .95) } }),
        ] },
        { titre: "Amplitudes", note: { titre: "Amplitudes" }, questions: [
          choix("ex_flexion", "Flexion", [o("complete", "Complète", { arthrose: .6, menisque: .8, arthrite: .6 }, { n: "flexion complète" }),
            o("douleur", "Limitée par la douleur", { menisque: 1.5, arthrite: 1.8, lca: 1.4, arthrose: 1.3, baker: 1.3 }, { n: "flexion limitée par la douleur" }),
            o("raideur", "Limitée par la raideur", { arthrose: 2.5, arthrite: 1.3 }, { n: "flexion limitée par la raideur" }), o("limitee", "Limitée", { arthrose: 1.5, menisque: 1.3 }, { n: "flexion limitée" })]),
          nombre("ex_flexion_deg", "Flexion mesurée", { court: "flexion mesurée", unite: "°", min: 0, max: 160, si: L => L.dans("ex_flexion", ["douleur", "raideur", "limitee"]) }),
          choix("ex_extension", "Extension", [o("complete", "Complète", { menisque: .85, arthrose: .8 }, { n: "extension complète" }),
            o("douleur", "Déficit par la douleur", { menisque: 1.5, lca: 1.5, arthrite: 1.5 }, { n: "déficit d'extension par la douleur" }),
            o("raideur", "Déficit par la raideur", { arthrose: 2.5 }, { n: "déficit d'extension par la raideur" }), o("blocage", "Blocage mécanique", { menisque: 4 }, { n: "blocage mécanique de l'extension" })]),
          nombre("ex_extension_deg", "Déficit d'extension", { court: "déficit d'extension mesuré", unite: "°", min: 0, max: 90, si: L => L.dans("ex_extension", ["douleur", "raideur", "blocage"]) }),
          choix("ex_elj", "Élévation de la jambe tendue (extension active)", [o("possible", "Possible", {}, { n: "élévation de la jambe tendue possible" }), o("impossible", "Impossible", {}, { n: "élévation de la jambe tendue impossible" })]),
        ] },
        { titre: "Palpation", labels: PALP, note: { titre: "Palpation", pos: "sensible", neg: "indolore" }, questions: [
          choix("ex_interligne", "Interligne articulaire", [o("aucune", "Indolore", { arthrose: .8, collat: .8 }, { n: "interligne indolore" }),
            o("mediale", "Médial sensible", { arthrose: 1.5, collat: 1.5 }, { n: "interligne médial sensible" }), o("laterale", "Latéral sensible", { collat: 1.3 }, { n: "interligne latéral sensible" }),
            o("deux", "Les deux sensibles", { arthrose: 1.5 }, { n: "interlignes médial et latéral sensibles" })],
            { effets: { menisque: lit(.63, .77, "Hegedus et coll., 2007, méta-analyse (JOSPT) : douleur à l'interligne", { pos: ["mediale", "laterale", "deux"], neg: ["aucune"], g: "menisque-ex" }) } }),
          ouiNon("ex_facettes", "Facettes rotuliennes", { court: "facettes rotuliennes", effets: { sfp: p(2, .5, { g: "sfp-ex" }), rotule: p(1.3, .9) } }),
          ouiNon("ex_pole_inf", "Pôle inférieur de la rotule, tendon rotulien", { court: "pôle inférieur de la rotule",
            effets: { tendino: est(1.8, .4, "Cook et coll., 2001 : palpation du tendon rotulien, sensible mais peu spécifique", { g: "tendino-ex" }), apo: p(1.5, .9) } }),
          ouiNon("ex_tuberosite", "Tubérosité tibiale", { court: "tubérosité tibiale", effets: { apo: p(5, .2, { g: "apo" }), tendino: p(1.3, .9) } }),
          ouiNon("ex_poie", "Patte d'oie (face médiale, sous l'interligne)", { court: "patte d'oie", effets: { poie: p(5, .3) } }),
          ouiNon("ex_epicondyle", "Épicondyle fémoral latéral (bandelette)", { court: "épicondyle fémoral latéral", effets: { bit: p(4, .4, { g: "bit-ex" }) } }),
          ouiNon("ex_lcm", "Trajet du ligament collatéral médial", { court: "trajet du LCM", effets: { collat: p(3, .4, { g: "collat-ex" }) } }),
          ouiNon("ex_retinaculum", "Bord médial de la rotule (rétinaculum)", { court: "bord médial de la rotule", effets: { rotule: p(3, .5, { g: "rotule-ex" }) } }),
          ouiNon("ex_osseux", "Rebords osseux articulaires", { court: "rebords osseux", effets: { arthrose: p(1.8, .8, { g: "arthrose-osseux" }) } }),
          ouiNon("ex_crepitants", "Crépitants à la mobilisation", { court: "crépitants", labels: ["Présents", "Absents"], effets: { arthrose: p(2, .6), sfp: p(1.2, .95) } }),
        ] },
        { titre: "Règle du genou d'Ottawa", si: trauma, labels: ["Oui", "Non"], note: { titre: "Critères d'Ottawa", pos: "présents", neg: "absents" },
          aide: "Traumatisme récent : radiographie si au moins un critère (l'âge de 55 ans et plus est tiré de l'identification).", questions: [
          ouiNon("ott_4pas", "Incapable de faire 4 pas, immédiatement après la blessure et à l'examen", { court: "incapable de faire 4 pas" }),
          ouiNon("ott_flexion", "Incapable de fléchir à 90°", { court: "flexion impossible à 90°" }),
          ouiNon("ott_rotule", "Sensibilité isolée de la rotule", { court: "sensibilité isolée de la rotule" }),
          ouiNon("ott_perone", "Sensibilité de la tête du péroné", { court: "sensibilité de la tête du péroné" }),
        ] },
        { titre: "Ménisques", labels: TEST, note: { titre: "Tests méniscaux", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("mcmurray", "McMurray", { court: "McMurray", aide: "Flexion maximale, rotation du tibia, puis extension. Positif : claquement ou douleur à l'interligne.",
            effets: { menisque: lit(.7, .71, "Hegedus et coll., 2007, méta-analyse (JOSPT)", { g: "menisque-ex" }) } }),
          ouiNon("thessaly", "Thessaly (20°)", { court: "Thessaly", aide: "Appui unipodal, genou à 20°, rotations du tronc. Positif : douleur à l'interligne ou accrochage.",
            effets: { menisque: est(2.5, .4, "Karachalios et coll., 2005 (valeurs élevées) ; Goossens et coll., 2015 et Blyth et coll., 2015 (valeurs faibles) : à trancher", { g: "menisque-ex" }) } }),
          ouiNon("apley", "Apley (compression)", { court: "Apley", aide: "Sur le ventre, genou à 90°, compression et rotation. Positif : douleur à l'interligne.",
            effets: { menisque: est(2, .6, "Hegedus et coll., 2007 ou Smith et coll., 2015 (méta-analyses)", { g: "menisque-ex" }) } }),
          ouiNon("flexion_max", "Douleur en flexion passive maximale", { court: "douleur en flexion maximale", effets: { menisque: p(1.8, .6, { g: "menisque-ex" }), arthrose: p(1.3, .8) } }),
          ouiNon("hyperext", "Douleur en hyperextension forcée", { court: "douleur en hyperextension forcée", effets: { menisque: p(2, .7, { g: "menisque-ex" }) } }),
        ] },
        { titre: "Ligaments croisés", labels: TEST, note: { titre: "Ligaments croisés", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("lachman", "Lachman", { court: "Lachman", aide: "Genou fléchi à 20–30°, translation antérieure du tibia. Positif : translation augmentée ou arrêt mou.",
            effets: { lca: lit(.85, .94, "Benjaminse et coll., 2006, méta-analyse (JOSPT)", { g: "lca-laxite" }) } }),
          ouiNon("tiroir_ant", "Tiroir antérieur", { court: "tiroir antérieur", aide: "Genou à 90°, traction antérieure du tibia. Positif : translation augmentée par rapport à l'autre côté.",
            effets: { lca: lit(.62, .88, "Benjaminse et coll., 2006 ; van Eck et coll., 2013 (méta-analyses ; aigu et chronique diffèrent)", { g: "lca-laxite" }) } }),
          ouiNon("pivot", "Pivot shift", { court: "pivot shift", aide: "Valgus et rotation interne, de l'extension vers la flexion. Positif : ressaut.",
            effets: { lca: lit(.24, .98, "Benjaminse et coll., 2006, méta-analyse (JOSPT)", { g: "lca-laxite" }) } }),
          ouiNon("lelli", "Signe du levier (Lelli)", { court: "signe du levier", aide: "Poing sous le tiers proximal du mollet, pression sur la cuisse. Positif : le talon ne se soulève pas.",
            effets: { lca: est(4, .4, "Lelli et coll., 2016 ; méta-analyses ultérieures", { g: "lca-laxite" }) } }),
        ] },
        { titre: "Ligaments collatéraux", labels: TEST, note: { titre: "Ligaments collatéraux", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("valgus30", "Valgus à 30°", { court: "valgus à 30°", aide: "Positif : douleur ou ouverture médiale (LCM).",
            effets: { collat: est(4, .3, "Solomon et coll., 2001, JAMA (examen clinique rationnel) : données limitées", { g: "collat-ex" }) } }),
          ouiNon("valgus0", "Valgus en extension complète", { court: "valgus à 0°", aide: "Ouverture en extension : atteinte de plusieurs structures (LCM, croisé, capsule).",
            effets: { collat: p(5, .8, { g: "collat-ex" }), lca: p(2, .9) } }),
          ouiNon("varus30", "Varus à 30°", { court: "varus à 30°", aide: "Positif : ouverture latérale (LCL, coin postéro-latéral).", effets: { collat: p(4, .7, { g: "collat-ex" }) } }),
          ouiNon("varus0", "Varus en extension complète", { court: "varus à 0°", aide: "Ouverture en extension : atteinte de plusieurs structures.", effets: { collat: p(5, .9, { g: "collat-ex" }), lca: p(1.5, 1) } }),
        ] },
        { titre: "Rotule et appareil extenseur", labels: TEST, note: { titre: "Rotule", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("apprehension", "Appréhension rotulienne", { court: "appréhension rotulienne", aide: "Glissement latéral de la rotule, genou à 20–30°. Positif : appréhension ou défense.",
            effets: { rotule: est(4, .3, "Ahmad et coll., 2009 (appréhension mobile) ; données limitées", { g: "rotule-ex" }) } }),
          ouiNon("glissement", "Glissement latéral augmenté", { court: "glissement latéral augmenté", aide: "Hypermobilité latérale de la rotule par rapport à l'autre côté.", effets: { rotule: p(3, .6, { g: "rotule-ex" }) } }),
          ouiNon("clarke", "Clarke (compression rotulienne)", { court: "Clarke", aide: "Compression de la rotule pendant une contraction du quadriceps. Positif : douleur.",
            effets: { sfp: lit(.39, .67, "Nunes et coll., 2013 ou Cook et coll., 2012 (revues systématiques)", { g: "sfp-ex" }) } }),
          ouiNon("ex_accroupi", "Douleur à l'accroupissement", { court: "douleur à l'accroupissement", g: "accroupi",
            effets: { sfp: lit(.91, .5, "Nunes et coll., 2013, revue systématique (Phys Ther Sport)"), menisque: p(1.3, .8), tendino: p(1.5, .7) } }),
          ouiNon("decline", "Accroupissement unipodal sur plan incliné", { court: "accroupissement unipodal", aide: "Positif : douleur au tendon rotulien.",
            effets: { tendino: p(3, .3, { g: "tendino-ex" }), sfp: p(1.3, .8) } }),
        ] },
        { titre: "Bandelette ilio-tibiale", labels: TEST, note: { titre: "Bandelette", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("noble", "Noble", { court: "Noble", aide: "Pression sur l'épicondyle latéral en passant de la flexion à l'extension. Positif : douleur vers 30°.", effets: { bit: p(4, .4, { g: "bit-ex" }) } }),
          ouiNon("ober", "Ober", { court: "Ober", aide: "Sur le côté, hanche en extension et abduction, puis adduction. Positif : la cuisse ne descend pas.", effets: { bit: p(2, .6, { g: "bit-ex" }) } }),
        ] },
      ] },

      { id: "connexes", titre: "Hanche, lombaire et cheville", noteTitre: "ARTICULATIONS VOISINES", blocs: [
        { titre: "Hanche", labels: TEST, note: { titre: "Hanche", pos: "positifs", neg: "négatifs" }, questions: [
          choix("hanche_ri", "Rotation interne de la hanche", [o("normale", "Normale et indolore", {}, { n: "rotation interne normale et indolore" }), o("limitee", "Limitée ou douloureuse", {}, { n: "rotation interne limitée ou douloureuse" })]),
          ouiNon("drehmann", "Signe de Drehmann", { court: "Drehmann", aide: "En fléchissant la hanche, la cuisse part en rotation externe et en abduction." }),
          ouiNon("fadir", "FADIR (douleur à l'aine)", { court: "FADIR", aide: "Flexion, adduction et rotation interne de la hanche." }),
        ] },
        { titre: "Lombaire", labels: TEST, note: { titre: "Lombaire", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("lombaire_repro", "Douleur lombaire à la mobilisation", { court: "douleur lombaire à la mobilisation" }),
          ouiNon("wassermann", "Étirement fémoral (Wassermann)", { court: "étirement fémoral", aide: "Sur le ventre, extension de la hanche, genou fléchi. Positif : douleur à la face antérieure de la cuisse." }),
          ouiNon("reflexe_rot", "Réflexe rotulien diminué", { court: "réflexe rotulien diminué" }),
          ouiNon("deficit_l3l4", "Déficit sensitif ou moteur L3–L4", { court: "déficit L3–L4" }),
        ] },
        { titre: "Cheville, pied et neurovasculaire", labels: ["Présent", "Absent"], note: { titre: "Distal", pos: "présents", neg: "absents" }, questions: [
          ouiNon("pied_plat", "Pied plat ou pronation marquée", { court: "pied plat ou pronation", effets: { sfp: p(1.3, .9) } }),
          ouiNon("pouls_dim", "Pouls pédieux diminués ou absents", { court: "pouls pédieux diminués" }),
          ouiNon("deficit_fibulaire", "Déficit du nerf fibulaire (dorsiflexion, dos du pied)", { court: "déficit du nerf fibulaire" }),
        ] },
        { titre: "Remarques", questions: [texte("remarques", "Autres observations", { court: "Remarques", long: true })] },
      ] },
    ],

    /* ---------- Règles : alertes hors du calcul des probabilités ---------- */
    regles: [
      (L) => (L.age !== null && L.age < 12 ? { niveau: "info", titre: "Outil prévu pour les 12 ans et plus", texte: "Chez l'enfant plus jeune, les causes et leurs fréquences diffèrent : les probabilités ne s'appliquent pas." } : null),
      // Arthrite septique (articulation) et bursite septique.
      (L) => {
        const inflam = L.oui("rougeur_chaleur") || L.oui("ex_chaleur"), epanch = L.oui("enflure") || L.dans("ex_epanchement", ["leger", "important"]);
        const risque = ["immuno", "prothese", "infiltration", "udi"].some(x => L.a("risque_infection", x)), sorties = [];
        if (L.oui("fievre") && (inflam || epanch)) sorties.push({ niveau: "urgence", titre: "Arthrite septique à éliminer", texte: "Fièvre avec un genou enflé ou chaud.",
          conduite: ["Ponction articulaire urgente (numération, Gram, culture, cristaux) ; diriger à l'urgence."] });
        else if (inflam && epanch) sorties.push({ niveau: risque ? "urgence" : "rapide", titre: "Arthrite septique ou microcristalline à éliminer",
          texte: `Genou enflé et chaud${risque ? ", avec un facteur de risque d'infection" : ""}.`, conduite: ["Ponction articulaire le jour même (numération, Gram, culture, cristaux)."] });
        if (L.a("ex_tumefaction", "prerotulienne") && (inflam || L.oui("fievre"))) sorties.push({ niveau: "rapide", titre: "Bursite prérotulienne septique à éliminer",
          texte: "Bourse prérotulienne enflée avec chaleur, rougeur ou fièvre.", conduite: ["Ponction-aspiration de la bourse (culture, Gram, cristaux) ; antibiotique selon le résultat."] });
        return sorties;
      },
      // Règle du genou d'Ottawa (Stiell et coll.) : traumatisme récent.
      (L) => {
        if (!L.trauma()) return null;
        const crit = [], faits = [L.age !== null, L.repondu("ott_4pas"), L.repondu("ott_flexion") || L.repondu("ex_flexion_deg"), L.repondu("ott_rotule"), L.repondu("ott_perone")];
        if (L.age >= 55) crit.push("55 ans ou plus");
        if (L.oui("ott_4pas")) crit.push("incapable de faire 4 pas");
        if (L.oui("ott_flexion") || (L.v("ex_flexion_deg") !== null && Number(L.v("ex_flexion_deg")) < 90)) crit.push("flexion impossible à 90°");
        if (L.oui("ott_rotule")) crit.push("sensibilité isolée de la rotule");
        if (L.oui("ott_perone")) crit.push("sensibilité de la tête du péroné");
        const enfant = L.age !== null && L.age < 18 ? " Chez les moins de 18 ans, la règle a été moins étudiée." : "";
        if (crit.length) return { niveau: "rapide", titre: "Radiographie du genou indiquée (règle d'Ottawa)", texte: `Critère : ${crit.join(", ")}.${enfant}`,
          conduite: ["Radiographie du genou (règle d'Ottawa positive)."] };
        if (faits.every(Boolean)) return { niveau: "info", titre: "Règle d'Ottawa négative", texte: `Aucun critère : la radiographie n'est pas nécessaire pour éliminer une fracture.${enfant}`,
          dansNote: "Règle du genou d'Ottawa négative : pas de radiographie pour éliminer une fracture." };
        return { niveau: "info", titre: "Règle d'Ottawa à compléter", texte: "Traumatisme : évaluer les cinq critères (âge, 4 pas, flexion à 90°, rotule, tête du péroné)." };
      },
      // Appareil extenseur.
      (L) => L.v("ex_elj") === "impossible" ? { niveau: "rapide", titre: "Rupture de l'appareil extenseur à éliminer",
        texte: "Extension active impossible : tendon quadricipital ou rotulien, ou fracture de la rotule.",
        conduite: ["Radiographie et orthopédie rapidement (médecin de garde) ; CRDS AH-753, priorité B, si rupture complète confirmée."],
        liens: [{ t: "CRDS : rupture du tendon rotulien ou quadricipital", u: "/crds/?q=rupture%20du%20tendon%20rotulien" }] } : null,
      // Luxation du genou, atteinte neurovasculaire.
      (L) => {
        const plusieurs = L.oui("lachman") && (L.oui("valgus0") || L.oui("varus0"));
        if (!(L.oui("pouls_dim") || L.oui("deficit_fibulaire") || plusieurs)) return null;
        return { niveau: "urgence", titre: "Luxation du genou ou atteinte neurovasculaire à éliminer",
          texte: plusieurs ? "Laxité de plusieurs ligaments." : "Pouls diminués ou déficit du nerf fibulaire.", conduite: ["Diriger à l'urgence : évaluation vasculaire (indice tibio-brachial, imagerie) et orthopédie."] };
      },
      // Genou bloqué.
      (L) => L.v("ex_extension") === "blocage" ? { niveau: "rapide", titre: "Genou bloqué",
        texte: "Blocage mécanique de l'extension : déchirure méniscale en anse de seau ou corps libre.", conduite: ["Orthopédie rapidement (IRM selon l'accès)."] } : null,
      // Épiphysiolyse fémorale supérieure (adolescent).
      (L) => {
        if (L.age === null || L.age > 17) return null;
        if (L.dans("hanche_ri", ["limitee"]) || L.oui("drehmann") || L.oui("douleur_hanche") || L.dans("ex_demarche", ["boiterie", "rotext", "appui"]))
          return { niveau: "urgence", titre: "Épiphysiolyse fémorale supérieure à éliminer", texte: "Adolescent : une douleur au genou peut venir de la hanche.",
            conduite: ["Radiographie des deux hanches (face et grenouille) le jour même ; pas de mise en charge ; orthopédie."] };
        if (!L.repondu("hanche_ri")) return { niveau: "info", titre: "Examiner la hanche", texte: "Adolescent : la douleur au genou peut venir de la hanche (épiphysiolyse). Vérifier la rotation interne." };
        return null;
      },
      // Ostéochondrite disséquante (adolescent, jeune adulte).
      (L) => (L.age !== null && L.age <= 20 && !L.trauma() && (L.oui("enflure") || L.dans("ex_epanchement", ["leger", "important"]) || L.oui("blocage") || L.oui("accrochage")))
        ? { niveau: "considerer", titre: "Ostéochondrite disséquante à éliminer", texte: "Jeune patient avec épanchement, accrochages ou blocages, sans traumatisme.",
          conduite: ["Radiographie du genou : face, profil, axiale et vue de l'échancrure (tunnel)."] } : null,
      // Tumeur.
      (L) => (L.oui("sympt_generaux") || (L.oui("atcd_cancer") && L.oui("nocturne")) || (L.oui("nocturne") && L.age !== null && L.age <= 25 && !L.trauma()))
        ? { niveau: "rapide", titre: "Tumeur osseuse à éliminer", texte: L.oui("sympt_generaux") ? "Symptômes généraux." : "Douleur nocturne sans traumatisme.",
          conduite: ["Radiographie du genou, fémur distal et tibia proximal compris ; investigation rapide si anomalie."] } : null,
      // TVP.
      (L) => L.oui("mollet") ? { niveau: "rapide", titre: "Thrombose veineuse profonde à éliminer", texte: "Mollet enflé, chaud ou douloureux. Un kyste poplité rompu peut l'imiter.",
        conduite: ["Score de Wells, D-dimères ou écho-doppler selon la probabilité."], liens: [{ t: "CRDS : accueil clinique, thrombophlébite profonde", u: "/crds/?q=TVP" }] } : null,
      // Origine lombaire.
      (L) => (L.oui("wassermann") || L.oui("reflexe_rot") || L.oui("deficit_l3l4") || L.v("irradiation") === "radiculaire" || L.dans("type_douleur", ["brulure", "choc"]) || (L.oui("douleur_dos") && L.oui("lombaire_repro")))
        ? { niveau: "considerer", titre: "Origine lombaire (radiculopathie L3–L4) à considérer", texte: "Douleur de type nerveux, irradiation radiculaire ou signes neurologiques.",
          conduite: ["Examen neurologique et lombaire complet."] } : null,
      // Hanche chez l'adulte.
      (L) => (L.age !== null && L.age >= 18 && (L.dans("hanche_ri", ["limitee"]) || L.oui("fadir") || L.oui("douleur_hanche")))
        ? { niveau: "considerer", titre: "Douleur référée de la hanche à considérer", texte: "Rotation interne de la hanche limitée ou douloureuse, ou douleur à l'aine.",
          conduite: ["Radiographie du bassin et de la hanche si la rotation interne est limitée ou douloureuse."] } : null,
      // Atteinte de plusieurs articulations.
      (L) => (L.oui("autres_articulations") && (L.v("raideur") === "plus30" || L.oui("reveils")))
        ? { niveau: "considerer", titre: "Arthrite inflammatoire à considérer", texte: "Plusieurs articulations, raideur matinale prolongée ou réveils nocturnes.",
          conduite: ["Bilan inflammatoire ; rhumatologie (CRDS AH-765) selon le tableau."], liens: [{ t: "CRDS : rhumatologie", u: "/crds/?q=polyarthrite" }] } : null,
      // Critères cliniques de l'ACR pour l'arthrose : affichés, pas comptés (ils recoupent l'âge et les signes déjà comptés).
      (L) => {
        if (L.age === null || L.age < 40) return null;
        const items = [[L.age > 50, true], [L.v("raideur") === "moins30", L.repondu("raideur")], [L.oui("ex_crepitants"), L.repondu("ex_crepitants")],
          [L.oui("ex_osseux"), L.repondu("ex_osseux")], [L.a("ex_tumefaction", "osseux"), L.repondu("ex_tumefaction")], [L.non("ex_chaleur"), L.repondu("ex_chaleur")]];
        const evalues = items.filter(x => x[1]).length, oui = items.filter(x => x[0]).length;
        if (evalues < 4) return null;
        return { niveau: "info", titre: `Critères cliniques de l'ACR pour l'arthrose : ${oui} sur 6`,
          texte: `${oui >= 3 ? "Compatible (3 ou plus)" : "Moins de 3"} ; ${evalues} critères évalués (Altman et coll., 1986, à vérifier). Ce compte n'entre pas dans le calcul : il reprend l'âge et des signes déjà comptés.` };
      },
    ],
  });
})();
