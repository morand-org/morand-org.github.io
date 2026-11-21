/* Locomoteur Morand, coude (prototype 0.2, novembre 2026). Conventions : voir donnees-genou.js. Tous les poids sont provisoires ou à vérifier. */
(function () {
  "use strict";
  const { p, lit, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const TEST = ["Positif", "Négatif"], PALP = ["Sensible", "Indolore"], DOUL = ["Douloureux", "Indolore"];
  const trauma = L => L.trauma();

  window.Locomoteur.definir({
    id: "coude", partie: "coude", titre: "Douleur au coude", noteTitre: "Douleur au coude", version: "Prototype 0.2 · novembre 2026", ages: "12 ans et plus",

    diagnostics: [
      { id: "epi_lat", nom: "Épicondylalgie latérale", n: "épicondylalgie latérale", base: [[12, .05], [25, .15], [45, .4], [60, .3], [80, .15]], fiches: ["athlete-51", "50plus-21"],
        conduite: ["Pas d'imagerie d'emblée.", "Éducation : évolution favorable en 6 à 12 mois dans la plupart des cas ; ajuster les gestes de préhension.",
          "Exercices progressifs (isométriques, puis excentriques ou lourds et lents) ; orthèse de contre-force possible ; physiothérapie.",
          "Éviter les infiltrations répétées de corticostéroïdes (soulagement court, rechutes plus fréquentes).",
          "Orthopédie si échec après 3 mois de physiothérapie et 2 infiltrations : CRDS AH-753 (épicondylite et épitrochléite), priorité D, avec écho ou IRM."],
        liens: [{ t: "CRDS : épicondylite et épitrochléite", u: "/crds/?q=%C3%A9picondylite" }] },
      { id: "epi_med", nom: "Épicondylalgie médiale", n: "épicondylalgie médiale", base: [[12, .04], [25, .08], [45, .12], [70, .08]], fiches: ["athlete-52", "50plus-22"],
        conduite: ["Pas d'imagerie d'emblée ; échographie si doute (tendons fléchisseurs, ligament collatéral ulnaire).", "Ajuster les gestes (lancer, golf, musculation) ; exercices progressifs des fléchisseurs-pronateurs ; physiothérapie.",
          "Examiner le nerf ulnaire et le ligament collatéral ulnaire, souvent associés.", "Orthopédie si échec : CRDS AH-753 (épicondylite et épitrochléite), priorité D."],
        liens: [{ t: "CRDS : épicondylite et épitrochléite", u: "/crds/?q=%C3%A9picondylite" }] },
      { id: "lcu", nom: "Lésion du ligament collatéral ulnaire (surcharge en valgus)", n: "atteinte du ligament collatéral ulnaire (surcharge en valgus)", base: [[12, .06], [18, .08], [25, .05], [40, .01], [70, .005]], sexe: { M: 1.5, F: .65 },
        fiches: ["athlete-53", "athlete-56", "athlete-57"],
        conduite: ["Arrêt du lancer ou des gestes en valgus ; physiothérapie (fléchisseurs-pronateurs, mécanique du geste).", "Échographie dynamique ou arthro-IRM si instabilité soupçonnée, surtout chez un athlète de lancer.",
          "Orthopédie si instabilité ou échec chez un athlète de haut niveau."] },
      { id: "ulnaire", nom: "Neuropathie ulnaire au coude", n: "neuropathie ulnaire au coude", base: [[12, .02], [30, .05], [50, .08], [70, .08]], fiches: ["athlete-54", "50plus-23"],
        conduite: ["Éviter la flexion prolongée et l'appui sur le coude ; attelle de nuit en légère extension.", "EMG si déficit moteur, atrophie ou symptômes persistants plus de 3 mois.",
          "Référence si atteinte motrice : CRDS AH-753 (tunnel cubital confirmé à l'EMG, priorité C) ou AH-772 (neuropathie compressive)."],
        liens: [{ t: "CRDS : tunnel cubital", u: "/crds/?q=cubital" }] },
      { id: "bursite", nom: "Bursite olécrânienne", n: "bursite olécrânienne", base: [[12, .01], [30, .04], [50, .06], [70, .06]], sexe: { M: 1.8, F: .55 }, fiches: ["athlete-55", "50plus-25"],
        conduite: ["Protection, éviter l'appui ; compression ; AINS.", "Bourse chaude, rouge, plaie ou fièvre : ponction-aspiration (culture, Gram, cristaux) ; antibiotique selon le tableau.", "Pas d'infiltration ni de chirurgie d'emblée."] },
      { id: "biceps", nom: "Tendinopathie ou rupture du biceps distal", n: "atteinte du tendon distal du biceps", base: [[12, .005], [30, .02], [45, .04], [60, .03]], sexe: { M: 3, F: .3 }, fiches: ["athlete-59", "50plus-26"],
        conduite: ["Rupture complète soupçonnée (hook test positif, ecchymose, faiblesse en supination) : orthopédie rapidement (CRDS AH-753, priorité B) ; échographie ou IRM.",
          "Tendinopathie : repos relatif, physiothérapie."], liens: [{ t: "CRDS : rupture du biceps distal", u: "/crds/?q=biceps%20distal" }] },
      { id: "arthrose", nom: "Arthrose du coude", n: "arthrose du coude", base: [[12, .002], [40, .01], [60, .05], [75, .07]], sexe: { M: 1.5, F: .7 }, fiches: ["50plus-24"],
        conduite: ["Radiographie.", "Analgésie, physiothérapie ; infiltration possible.", "Orthopédie si blocages ou perte de fonction importante."] },
      { id: "ocd", nom: "Ostéochondrite disséquante du capitulum", n: "ostéochondrite disséquante du capitulum", base: [[12, .04], [15, .03], [18, .01], [25, .002]], fiches: ["athlete-58"],
        conduite: ["Radiographie (face, profil) ; IRM pour le stade.", "Arrêt des activités en appui ou en lancer ; orthopédie pédiatrique ou sportive."] },
      { id: "fracture", nom: "Fracture de la tête radiale ou luxation du coude", n: "fracture de la tête radiale ou luxation du coude", base: [[12, .03], [30, .03], [60, .03], [80, .04]], fiches: ["athlete-60"],
        conduite: ["Radiographie (face, profil ; signe du coussinet adipeux).", "Fracture non déplacée de la tête radiale : écharpe courte et mobilisation précoce.",
          "Fracture déplacée, luxation ou blocage de la pronosupination : orthopédie rapidement."] },
      { id: "radial", nom: "Compression nerveuse de l'avant-bras (tunnel radial, rond pronateur)", n: "compression nerveuse de l'avant-bras (tunnel radial ou rond pronateur)",
        base: [[12, .002], [30, .01], [50, .015], [70, .01]], fiches: ["50plus-28", "50plus-30"],
        conduite: ["Diagnostic clinique, souvent confondu avec l'épicondylalgie latérale.", "Éviter les gestes répétés de supination ou de pronation ; physiothérapie ; EMG si faiblesse."] },
      { id: "triceps", nom: "Tendinopathie du triceps", n: "tendinopathie du triceps", base: [[12, .003], [30, .01], [50, .015], [70, .01]], sexe: { M: 1.5, F: .7 }, fiches: ["50plus-27"],
        conduite: ["Physiothérapie (charge progressive) ; échographie si faiblesse en extension (rupture)."] },
      { id: "arthrite", nom: "Arthrite inflammatoire ou microcristalline", n: "arthrite inflammatoire ou microcristalline", base: [[12, .005], [40, .01], [70, .02]], fiches: ["50plus-29"],
        conduite: ["Ponction si épanchement (numération, Gram, culture, cristaux).", "Bilan inflammatoire ; rhumatologie (CRDS AH-765) selon le tableau."] },
      { id: "cervical", nom: "Douleur référée du cou (radiculopathie C6–C8)", n: "douleur référée d'origine cervicale", base: [[12, .005], [40, .03], [60, .04]],
        conduite: ["Examen cervical et neurologique complet ; voir l'outil cervical."], liens: [{ t: "Outil cervical", u: "/locomoteur/cervical/" }] },
    ],
    compatibles: [["epi_med", "lcu"], ["epi_med", "ulnaire"], ["lcu", "ulnaire"], ["epi_lat", "radial"], ["arthrose", "ulnaire"], ["epi_lat", "cervical"], ["ocd", "lcu"], ["arthrose", "bursite"]],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.sexe(), C.age(), C.cote("Coude atteint", "Droit", "Gauche", ["coude droit", "coude gauche", "deux coudes"]), C.accompagne(), C.lateralite(),
        C.dominant({ epi_lat: p(1.5, .7), epi_med: p(1.4, .8), lcu: p(2, .5) }),
        C.travail({ physique: { epi_lat: 1.5, epi_med: 1.3, biceps: 1.3 }, ajouts: [
          o("repetitif", "Gestes répétitifs ou outils (préhension, vissage, souris)", { epi_lat: 2, epi_med: 1.5, ulnaire: 1.3, radial: 1.5 }, { n: "gestes répétitifs ou outils" }),
          o("appui_coude", "Appui prolongé sur les coudes", { bursite: 3, ulnaire: 2 }, { n: "appui prolongé sur les coudes" })] }), C.travailPrecision(),
        C.sport({ aucun: { lcu: .4, ocd: .5 }, ajouts: [o("raquette", "Sport de raquette (tennis, badminton)", { epi_lat: 2.5, epi_med: 1.3 }, { n: "sport de raquette" }),
          o("lancer", "Sport de lancer (baseball, javelot, volleyball)", { lcu: 4, epi_med: 2, ocd: 2, ulnaire: 1.5 }, { n: "sport de lancer" }),
          o("golf", "Golf", { epi_med: 2.5, epi_lat: 1.3 }, { n: "golf" }),
          o("muscu", "Musculation ou haltérophilie", { biceps: 2.5, epi_med: 1.5, triceps: 2, lcu: 1.5, ulnaire: 1.3 }, { n: "musculation ou haltérophilie" }),
          o("appui", "Gymnastique ou sport en appui sur les bras", { ocd: 3, lcu: 1.5 }, { n: "gymnastique ou sport en appui sur les bras" })] }), C.sportPrecision(),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        ouiNon("atcd_coude", "Blessure, fracture ou chirurgie antérieure à ce coude", { court: "blessure, fracture ou chirurgie antérieure à ce coude", effets: { arthrose: p(2, .9), ulnaire: p(1.3, .95) } }),
        C.atcdRhumato("arthrite"), C.atcdFamiliaux({ arthrite: p(1.5, .9) }), C.atcdAutres(),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { titre: "Début", questions: [
          C.premier({ fracture: p(1.5, .7), biceps: p(1.3, .8), arthrose: p(.7, 1.4), ulnaire: p(.8, 1.2) }),
          C.duree({ lt7: { fracture: 3, biceps: 2, bursite: 1.5, epi_lat: .5, epi_med: .5, arthrose: .3, ulnaire: .6, radial: .5 }, s1_6: { fracture: 1.3, biceps: 1.3 },
            s6_12: { epi_lat: 1.2, epi_med: 1.2, fracture: .4 }, gt3m: { epi_lat: 1.5, epi_med: 1.3, arthrose: 1.8, ulnaire: 1.3, fracture: .2, bursite: .7 } }),
          C.apparition({ subit_trauma: { fracture: 6, biceps: 3, lcu: 2.5, bursite: 1.2, epi_lat: .3, epi_med: .4, ulnaire: .5, arthrose: .3, radial: .3, ocd: .5, triceps: 1.5 },
            subit: { bursite: 2, arthrite: 2.5, biceps: 1.5, lcu: 1.2, fracture: .3 },
            graduel: { epi_lat: 1.6, epi_med: 1.6, lcu: 1.5, ulnaire: 1.3, ocd: 1.5, triceps: 1.4, fracture: .1, biceps: .8 },
            insidieux: { arthrose: 2, ulnaire: 1.5, epi_lat: 1.3, radial: 1.5, fracture: .05, biceps: .5 } }),
          C.contexte(),
          choix("mecanisme", "Mécanisme", [o("main", "Chute sur la main tendue", { fracture: 3, lcu: 1.5 }, { n: "chute sur la main tendue" }),
            o("charge", "Charge brusque en flexion (soulever, retenir un poids)", { biceps: 5, triceps: 1.5 }, { n: "charge brusque en flexion" }),
            o("lancer", "En lançant", { lcu: 4, epi_med: 1.5 }, { n: "en lançant" }), o("direct", "Coup direct sur le coude", { bursite: 3, fracture: 1.5 }, { n: "coup direct sur le coude" })], { si: trauma }),
          ouiNon("pop", "Pop au moment de la blessure", { si: trauma, court: "pop", effets: { biceps: p(4, .5), lcu: p(2, .8) } }),
          ouiNon("ecchymose", "Ecchymose", { si: trauma, court: "ecchymose", g: "ecchymose", effets: { biceps: p(3, .7), fracture: p(2, .8) } }),
        ] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("laterale", "Latérale (épicondyle latéral)", { epi_lat: p(5, .2), radial: p(2, .9), ocd: p(1.5, .8), fracture: p(1.3, .9) }, { n: "latérale" }),
            m("mediale", "Médiale (épicondyle médial)", { epi_med: p(4, .3), lcu: p(3, .4), ulnaire: p(2, .6) }, { n: "médiale" }),
            m("posterieure", "Postérieure (olécrâne)", { bursite: p(3, .6), triceps: p(4, .6), arthrose: p(1.5, .9), lcu: p(1.3, .95) }, { n: "postérieure" }),
            m("anterieure", "Antérieure (pli du coude)", { biceps: p(5, .3), arthrose: p(1.3, .95) }, { n: "antérieure" }),
            m("avant_bras", "Avant-bras, sous l'épicondyle latéral", { radial: p(4, .7), epi_lat: p(1.3, 1) }, { n: "avant-bras, sous l'épicondyle latéral" }),
            m("diffuse", "Diffuse", { arthrite: p(2, .8), arthrose: p(1.5, .9) }, { n: "diffuse" }),
          ], { court: "Siège de la douleur", aide: "Plusieurs choix possibles. Une fois un siège coché, les sièges non cochés comptent comme absents." }),
          choix("irradiation", "Irradiation", [o("aucune", "Aucune", {}, { n: "sans irradiation" }), o("avant_bras", "Vers l'avant-bras", { epi_lat: 1.3, epi_med: 1.3, radial: 1.5 }, { n: "irradiation vers l'avant-bras" }),
            o("doigts45", "Vers les 4e et 5e doigts", { ulnaire: 4 }, { n: "irradiation vers les 4e et 5e doigts" }), o("bras", "Tout le bras, depuis le cou", { cervical: 4 }, { n: "irradiation de tout le bras depuis le cou" })]),
          C.type({ brulure: { ulnaire: 2, cervical: 1.5, radial: 1.5 }, choc: { ulnaire: 2.5, cervical: 2 } }), C.intensite(),
          ouiNon("paresthesies_45", "Engourdissements ou picotements des 4e et 5e doigts", { court: "paresthésies des 4e et 5e doigts", effets: { ulnaire: p(6, .3), cervical: p(1.5, .9), lcu: p(1.5, .95) } }),
          ouiNon("douleur_cou", "Douleur au cou", { court: "douleur au cou", effets: { cervical: p(3, .6) } }),
        ] },
        { titre: "Caractéristiques", questions: [
          ouiNon("prehension", "Pire en serrant ou en soulevant", { court: "douleur à la préhension", effets: { epi_lat: p(2.5, .3), epi_med: p(1.5, .7), biceps: p(1.3, .9), radial: p(1.3, .9) } }),
          ouiNon("lancer_douleur", "Douleur en lançant", { court: "douleur en lançant", effets: { lcu: p(4, .6), epi_med: p(1.5, .9) } }),
          ouiNon("flexion_prolongee", "Pire coude fléchi longtemps (téléphone, sommeil)", { court: "symptômes coude fléchi longtemps", effets: { ulnaire: p(3, .6) } }),
          ouiNon("fin_extension", "Douleur en fin d'extension", { court: "douleur en fin d'extension", effets: { lcu: p(2, .7), arthrose: p(2, .7), ocd: p(1.5, .8), triceps: p(1.3, .9) } }),
          ouiNon("blocage", "Blocages ou accrochages", { court: "blocages", effets: { ocd: p(4, .7), arthrose: p(2.5, .8) } }),
          ouiNon("raideur_mvt", "Perte de mouvement", { court: "perte de mouvement", effets: { arthrose: p(3, .4), fracture: p(2, .8), ocd: p(1.8, .8) } }),
          ouiNon("faiblesse", "Faiblesse en flexion ou en supination", { court: "faiblesse en flexion ou supination", effets: { biceps: p(4, .6) } }),
          C.nocturne({ arthrite: p(1.5, .8), ulnaire: p(1.3, .9) }),
          C.raideur({ aucune: { arthrite: .4 }, moins30: { arthrose: 1.5 }, plus30: { arthrite: 3, arthrose: .7 } }),
          ouiNon("enflure", "Enflure", { court: "enflure", g: "epanchement", effets: { bursite: p(4, .5), arthrite: p(3, .6), fracture: p(2, .8) } }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { court: "rougeur ou chaleur", g: "inflammation", effets: { arthrite: p(3, .7), bursite: p(3, .8) } }),
        ] },
        C.evolution(),
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [{ labels: ["Présent", "Absent"], noteTitre: "Drapeaux rouges", note: { pos: "présents", neg: "absents" }, questions: [
        C.fievre({ arthrite: p(2, .9), bursite: p(1.5, 1) }), C.symptGeneraux(), C.cancer(),
        C.risqueInfection([m("plaie", "Plaie ou écorchure sur le coude"), m("prothese", "Prothèse du coude")]),
      ] }] },

      { id: "examen", titre: "Examen du coude", note: "examen", blocs: [
        { titre: "Inspection", labels: ["Présent", "Absent"], note: { pos: "présent", neg: "absent" }, questions: [
          ouiNon("ex_bourse", "Tuméfaction sur l'olécrâne (bourse)", { court: "tuméfaction olécrânienne", effets: { bursite: p(10, .15) } }),
          ouiNon("ex_epanchement", "Épanchement (comblement para-olécrânien)", { court: "épanchement", g: "epanchement", effets: { arthrite: p(3, .6), fracture: p(3, .5), arthrose: p(1.5, .9) } }),
          ouiNon("ex_chaleur", "Chaleur ou rougeur", { court: "chaleur ou rougeur", g: "inflammation", effets: { arthrite: p(4, .6), bursite: p(2, .9) } }),
          ouiNon("ex_deformation", "Déformation ou ecchymose", { court: "déformation ou ecchymose", effets: { fracture: p(3, .8), biceps: p(3, .9) } }),
          ouiNon("valgus_asym", "Valgus augmenté par rapport à l'autre côté", { court: "valgus asymétrique", effets: { lcu: p(2, .95) } }),
        ] },
        { titre: "Amplitudes actives", questions: [
          choix("ex_flexion", "Flexion", [o("complete", "Complète", { arthrose: .6 }, { n: "flexion complète" }), o("douleur", "Douloureuse", { biceps: 1.3, arthrose: 1.2 }, { n: "flexion douloureuse" }),
            o("limitee", "Limitée", { arthrose: 2.5, fracture: 2, ocd: 1.5 }, { n: "flexion limitée" })]),
          choix("ex_extension", "Extension", [o("complete", "Complète", { arthrose: .6 }, { n: "extension complète" }),
            o("fin_douloureuse", "Complète, fin douloureuse", { lcu: 1.8, arthrose: 1.3, triceps: 1.3 }, { n: "extension complète, douloureuse en fin de mouvement" }),
            o("limitee", "Incomplète", { arthrose: 2.5, ocd: 1.8 }, { n: "extension incomplète" })],
            { effets: { fracture: lit(.97, .69, "Appelboam et coll., 2008 (BMJ) : test d'extension du coude après un traumatisme", { pos: ["limitee"], neg: ["complete", "fin_douloureuse"] }) } }),
          choix("ex_pronosup", "Pronation et supination", [o("complete", "Complètes et indolores", {}, { n: "pronation et supination complètes" }),
            o("douleur", "Douloureuses", { epi_med: 1.3, biceps: 1.3, radial: 1.3 }, { n: "pronation ou supination douloureuse" }),
            o("limitee", "Limitées", { fracture: 2.5, arthrose: 2 }, { n: "pronation ou supination limitée" })]),
        ] },
        { titre: "Contre résistance", labels: DOUL, note: { pos: "douloureuse", neg: "indolore" }, questions: [
          ouiNon("cozen", "Extension résistée du poignet (Cozen)", { court: "Cozen", effets: { epi_lat: p(3, .25, { g: "epilat-ex" }) } }),
          ouiNon("maudsley", "Extension résistée du majeur (Maudsley)", { court: "Maudsley", effets: { epi_lat: p(2.5, .5, { g: "epilat-ex" }), radial: p(1.5, .9) } }),
          ouiNon("mill", "Étirement passif des extenseurs (Mill)", { court: "Mill", effets: { epi_lat: p(2, .5, { g: "epilat-ex" }) } }),
          ouiNon("flexion_poignet_res", "Flexion résistée du poignet", { court: "flexion résistée du poignet", effets: { epi_med: p(3, .3, { g: "epimed-ex" }) } }),
          ouiNon("pronation_res", "Pronation résistée", { court: "pronation résistée", effets: { epi_med: p(2.5, .5, { g: "epimed-ex" }) } }),
          ouiNon("supination_res", "Supination résistée", { court: "supination résistée", effets: { biceps: p(3, .4, { g: "biceps-ex" }), radial: p(1.5, .9) } }),
          ouiNon("flexion_res", "Flexion résistée du coude", { court: "flexion résistée du coude", effets: { biceps: p(2.5, .5, { g: "biceps-ex" }) } }),
          ouiNon("extension_res", "Extension résistée du coude", { court: "extension résistée du coude", effets: { triceps: p(4, .4) } }),
        ] },
        { titre: "Palpation", labels: PALP, note: { pos: "sensible", neg: "indolore" }, questions: [
          ouiNon("palp_epi_lat", "Épicondyle latéral", { court: "épicondyle latéral", effets: { epi_lat: p(3, .15, { g: "epilat-ex" }) } }),
          ouiNon("palp_epi_med", "Épicondyle médial", { court: "épicondyle médial", effets: { epi_med: p(3, .2, { g: "epimed-ex" }), lcu: p(1.5, .8) } }),
          ouiNon("palp_lcu", "Ligament collatéral ulnaire (sous l'épicondyle médial)", { court: "ligament collatéral ulnaire", effets: { lcu: p(3, .4, { g: "lcu-ex" }) } }),
          ouiNon("palp_gouttiere", "Gouttière ulnaire", { court: "gouttière ulnaire", effets: { ulnaire: p(2.5, .6), lcu: p(1.3, .9) } }),
          ouiNon("palp_tete_radiale", "Tête radiale", { court: "tête radiale", effets: { fracture: p(3, .3), ocd: p(1.5, .8), arthrose: p(1.3, .9) } }),
          ouiNon("palp_olecrane", "Olécrâne", { court: "olécrâne", effets: { bursite: p(1.5, .8), triceps: p(2, .6), fracture: p(1.5, .8) } }),
          ouiNon("palp_biceps", "Tendon distal du biceps", { court: "tendon distal du biceps", effets: { biceps: p(3, .4, { g: "biceps-ex" }) } }),
          ouiNon("palp_arcade", "Arcade du supinateur (3 à 4 cm sous l'épicondyle latéral)", { court: "arcade du supinateur", effets: { radial: p(4, .4) } }),
        ] },
        { titre: "Tests spéciaux", labels: TEST, note: { pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("hook", "Hook test (biceps distal)", { court: "hook test", aide: "Coude à 90° en supination : on ne peut pas accrocher le tendon avec l'index.", effets: { biceps: lit(.98, .98, "O'Driscoll et coll., 2007 (petite série)", { g: "biceps-ex" }) } }),
          ouiNon("valgus_stress", "Stress en valgus (20 à 30°)", { court: "stress en valgus", effets: { lcu: p(3, .5, { g: "lcu-ex" }) } }),
          ouiNon("milking", "Milking ou moving valgus stress", { court: "milking ou moving valgus", effets: { lcu: lit(.98, .75, "O'Driscoll et coll., 2005 (moving valgus stress test)", { g: "lcu-ex" }) } }),
          ouiNon("tinel_cubital", "Tinel au tunnel cubital", { court: "Tinel cubital", effets: { ulnaire: est(3, .5, "Novak et coll., 1994 ; Beekman et coll., 2009", { g: "ulnaire-ex" }) } }),
          ouiNon("flexion_test", "Flexion maximale du coude 60 secondes (paresthésies)", { court: "test de flexion du coude", effets: { ulnaire: est(4, .4, "Novak et coll., 1994", { g: "ulnaire-ex" }) } }),
          ouiNon("nerf_instable", "Nerf ulnaire instable dans la gouttière", { court: "nerf ulnaire instable", effets: { ulnaire: p(2, .95) } }),
          ouiNon("froment", "Signe de Froment ou faiblesse des interosseux", { court: "Froment", effets: { ulnaire: p(4, .8) } }),
        ] },
        { questions: [C.controlateral()] },
        { titre: "Cervical", sous: "Cervical", labels: TEST, note: { pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("mvt_cou", "Douleur reproduite par les mouvements du cou", { court: "douleur aux mouvements du cou", effets: { cervical: p(3, .4, { g: "cervical-ex" }) } }),
          ouiNon("spurling", "Spurling", { court: "Spurling", effets: { cervical: lit(.5, .88, "Rubinstein et coll., 2007 ; Wainner et coll., 2003", { g: "cervical-ex" }) } }),
          ouiNon("deficit_neuro", "Déficit sensitif, moteur ou réflexe C6–C8", { court: "déficit C6–C8", effets: { cervical: p(5, .6, { g: "cervical-ex" }) } }),
        ] },
        { titre: "Épaule et poignet", sous: "Épaule et poignet", questions: [
          choix("epaule_poignet", "Épaule et poignet", [o("normaux", "Mobilité complète et indolore", {}, { n: "mobilité complète et indolore" }), o("anormaux", "Anormaux", {}, { n: "anomalie à l'examen" })]),
        ] },
        C.edu(), C.remarques(),
      ] },
    ],

    regles: [
      C.regles.age12,
      C.regles.septique("un coude", ["rougeur_chaleur", "ex_chaleur"], ["enflure", "ex_epanchement"]),
      L => (L.oui("ex_bourse") && (L.oui("ex_chaleur") || L.oui("rougeur_chaleur") || L.oui("fievre") || L.a("risque_infection", "plaie")))
        ? { niveau: "rapide", titre: "Bursite olécrânienne septique à éliminer", texte: "Bourse enflée avec chaleur, rougeur, plaie ou fièvre.", conduite: ["Ponction-aspiration de la bourse (culture, Gram, cristaux) ; antibiotique selon le résultat."] } : null,
      L => {
        if (!L.trauma()) return null;
        if (L.oui("ex_deformation") && L.v("ex_extension") === "limitee") return { niveau: "urgence", titre: "Luxation ou fracture déplacée à éliminer", texte: "Déformation et extension impossible après un traumatisme.",
          conduite: ["Radiographie ; vérifier le pouls radial et les nerfs (médian, ulnaire, radial) ; orthopédie en urgence."] };
        if (L.v("ex_extension") === "limitee") return { niveau: "rapide", titre: "Radiographie du coude indiquée", texte: "Extension complète impossible après un traumatisme (test d'extension du coude).",
          conduite: ["Radiographie du coude (face, profil)."] };
        if (L.dans("ex_extension", ["complete", "fin_douloureuse"])) return { niveau: "info", titre: "Test d'extension du coude négatif", texte: "Extension complète possible : fracture peu probable ; radiographie si sensibilité osseuse focale (tête radiale, olécrâne).",
          dansNote: "Extension complète du coude possible après le traumatisme : fracture peu probable (test d'extension du coude)." };
        return { niveau: "info", titre: "Traumatisme : vérifier l'extension complète", texte: "Une extension complète impossible indique une radiographie." };
      },
      L => (L.oui("hook") || (L.trauma() && L.oui("pop") && L.oui("faiblesse"))) ? { niveau: "rapide", titre: "Rupture du biceps distal à éliminer",
        texte: "Hook test positif, ou pop avec faiblesse en flexion et supination.", conduite: ["Orthopédie rapidement (réparation idéalement en 2 à 3 semaines) ; CRDS AH-753, priorité B ; échographie ou IRM."],
        liens: [{ t: "CRDS : rupture du biceps distal", u: "/crds/?q=biceps%20distal" }] } : null,
      L => L.oui("froment") ? { niveau: "rapide", titre: "Atteinte motrice du nerf ulnaire", texte: "Faiblesse des interosseux ou signe de Froment.",
        conduite: ["EMG et référence (CRDS AH-772, neuropathie compressive avec atteinte motrice, priorité D ; ou AH-753 si confirmée à l'EMG)."], liens: [{ t: "CRDS : neuropathie compressive", u: "/crds/?q=cubital" }] } : null,
      L => (L.age !== null && L.age <= 16 && L.v("sport") === "lancer" && L.a("localisation", "mediale")) ? { niveau: "considerer", titre: "Coude de la Petite Ligue (apophysite médiale) à considérer",
        texte: "Jeune lanceur avec douleur médiale.", conduite: ["Arrêt du lancer ; radiographie comparative si sensibilité osseuse ; respecter les limites de lancers."] } : null,
      L => (L.age !== null && L.age <= 18 && L.a("localisation", "laterale") && (L.oui("blocage") || L.oui("fin_extension") || L.oui("raideur_mvt")))
        ? { niveau: "considerer", titre: "Ostéochondrite disséquante du capitulum à éliminer", texte: "Adolescent avec douleur latérale, blocages ou perte d'extension.", conduite: ["Radiographie, puis IRM."] } : null,
      L => (L.oui("deficit_neuro") || L.v("irradiation") === "bras") ? { niveau: "considerer", titre: "Radiculopathie cervicale à considérer", texte: "Irradiation depuis le cou ou déficit neurologique.",
        conduite: ["Examen cervical et neurologique ; outil cervical."], liens: [{ t: "Outil cervical", u: "/locomoteur/cervical/" }] } : null,
      C.regles.tumeur("Radiographie du coude."),
    ],
  });
})();
