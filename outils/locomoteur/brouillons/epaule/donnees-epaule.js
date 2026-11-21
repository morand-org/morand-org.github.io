/* Locomoteur Morand, épaule (prototype 0.2, novembre 2026). Mêmes conventions que donnees-genou.js :
   p(RV si oui, RV si non) provisoire ; lit(Se, Sp, piste) et est(RV+, RV−, piste) publiés, cités de mémoire, à vérifier. */
(function () {
  "use strict";
  const { p, lit, est, o, m, ouiNon, choix, multi } = window.Locomoteur.outils, C = window.Locomoteur.commun;
  const TEST = ["Positif", "Négatif"], PALP = ["Sensible", "Indolore"];
  const trauma = L => L.trauma();

  window.Locomoteur.definir({
    id: "epaule", partie: "épaule", titre: "Douleur à l'épaule", noteTitre: "Douleur à l'épaule", version: "Prototype 0.2 · novembre 2026", ages: "12 ans et plus",

    diagnostics: [
      { id: "sap", nom: "Tendinopathie de la coiffe ou douleur sous-acromiale", n: "tendinopathie de la coiffe des rotateurs (douleur sous-acromiale)", base: [[12, .1], [20, .22], [35, .35], [50, .38], [70, .3]],
        conduite: ["Pas d'imagerie d'emblée ; radiographie si aucune amélioration après 6 à 12 semaines, ou si arthrose ou calcification soupçonnée.",
          "Éducation, ajustement des activités au-dessus de la tête, renforcement de la coiffe et des stabilisateurs de l'omoplate (physiothérapie).",
          "AINS ; infiltration sous-acromiale de corticostéroïdes possible si la douleur empêche la réadaptation.",
          "Orthopédie si échec : CRDS AH-753 (maladie de la coiffe), priorité D, avec le rapport d'écho ou d'IRM."],
        liens: [{ t: "CRDS : maladie de la coiffe", u: "/crds/?q=coiffe" }] },
      { id: "coiffe", nom: "Déchirure de la coiffe des rotateurs", n: "déchirure de la coiffe des rotateurs", base: [[12, .005], [25, .02], [40, .06], [55, .15], [70, .3], [85, .4]], sexe: { M: 1.2, F: .85 },
        conduite: ["Échographie (ou IRM) si une déchirure transfixiante est soupçonnée, surtout après un traumatisme ou chez un patient actif.",
          { t: "Rupture traumatique aiguë chez un patient jeune ou actif : référer rapidement (CRDS AH-753, priorité C si prouvée chez moins de 50 ans).", si: L => L.trauma() },
          "Déchirure dégénérative : physiothérapie d'abord ; orthopédie si échec (CRDS AH-753, priorité D)."],
        liens: [{ t: "CRDS : coiffe des rotateurs", u: "/crds/?q=coiffe" }] },
      { id: "capsulite", nom: "Capsulite rétractile", n: "capsulite rétractile", base: [[12, .001], [30, .01], [45, .08], [55, .12], [70, .05]], sexe: { F: 1.4, M: .7 },
        conduite: ["Diagnostic clinique ; radiographie pour éliminer l'arthrose ou une autre cause.", "Expliquer l'évolution naturelle (des mois, jusqu'à 2 ans) ; exercices d'amplitude selon la douleur, physiothérapie.",
          "Infiltration intra-articulaire de corticostéroïdes utile en phase douloureuse précoce.", "Dépister le diabète, et l'hypothyroïdie au besoin."] },
      { id: "arthrose", nom: "Arthrose gléno-humérale", n: "arthrose gléno-humérale", base: [[12, .001], [40, .01], [55, .05], [70, .12], [85, .18]],
        conduite: ["Radiographie (face et axillaire).", "Exercice, analgésie, infiltration possible.", "Orthopédie si invalidante malgré le traitement : CRDS AH-753, priorité D, avec le rapport de radiographie."],
        liens: [{ t: "CRDS : arthrose invalidante de l'épaule", u: "/crds/?q=arthrose%20%C3%A9paule" }] },
      { id: "ac", nom: "Atteinte acromio-claviculaire (entorse, arthrose)", n: "atteinte acromio-claviculaire", base: [[12, .03], [25, .08], [45, .07], [70, .05]], sexe: { M: 1.5, F: .65 },
        conduite: ["Après un traumatisme : radiographie (comparer au côté sain) pour classer l'entorse.", "Grade I ou II : écharpe de confort quelques jours, glace, mobilisation précoce.",
          "Grade III et plus, ou déformation importante : orthopédie.", "Arthrose acromio-claviculaire : AINS, infiltration possible."] },
      { id: "instab", nom: "Instabilité ou luxation gléno-humérale", n: "instabilité gléno-humérale", base: [[12, .08], [18, .12], [25, .08], [40, .02], [70, .01]], sexe: { M: 1.4, F: .7 },
        conduite: ["Après une luxation : radiographie (face, axillaire ou en Y) pour confirmer la réduction et éliminer une fracture ; vérifier le nerf axillaire.",
          "Immobilisation courte, puis physiothérapie (stabilisation).", "Jeune sportif ou récidives : orthopédie (CRDS AH-753, luxation récidivante, priorité D, avec physiothérapie débutée)."],
        liens: [{ t: "CRDS : luxation récidivante de l'épaule", u: "/crds/?q=luxation%20r%C3%A9cidivante" }] },
      { id: "biceps", nom: "Tendinopathie du long biceps ou lésion SLAP", n: "tendinopathie du long chef du biceps ou lésion SLAP", base: [[12, .02], [25, .05], [45, .05], [70, .03]],
        conduite: ["Physiothérapie, ajustement des activités, AINS ; échographie si doute.", "Signe de Popeye (rupture du long chef) : traitement conservateur le plus souvent.",
          "Lésion SLAP soupçonnée chez un sportif de lancer : arthro-IRM et orthopédie si échec du traitement."] },
      { id: "calcif", nom: "Tendinopathie calcifiante", n: "tendinopathie calcifiante", base: [[12, .001], [30, .02], [45, .05], [60, .04], [75, .02]], sexe: { F: 1.3, M: .8 },
        conduite: ["Radiographie (calcification).", "Crise aiguë : AINS, glace ; infiltration ou lavage échoguidé possible."] },
      { id: "cervical", nom: "Douleur référée du cou (radiculopathie C5–C6)", n: "douleur référée d'origine cervicale", base: [[12, .01], [30, .04], [50, .07], [70, .07]],
        conduite: ["Examen cervical et neurologique complet ; voir l'outil cervical."], liens: [{ t: "Outil cervical", u: "/locomoteur/cervical/" }] },
      { id: "ppr", nom: "Pseudopolyarthrite rhizomélique", n: "pseudopolyarthrite rhizomélique", base: [[12, .0005], [49, .001], [55, .02], [70, .05], [85, .06]], sexe: { F: 1.5, M: .7 },
        conduite: ["VS, CRP, FSC, CK, TSH, FR et anti-CCP.", "Chercher une artérite temporale (céphalée, claudication de la mâchoire, trouble visuel).",
          "Réponse rapide à la prednisone à faible dose ; rhumatologie (CRDS AH-765, pseudopolyarthrite rhizomélique, priorité B)."],
        liens: [{ t: "CRDS : polymyalgia rheumatica", u: "/crds/?q=polymyalgia" }] },
      { id: "arthrite", nom: "Arthrite inflammatoire ou microcristalline", n: "arthrite inflammatoire ou microcristalline", base: [[12, .005], [40, .01], [70, .02]],
        conduite: ["Ponction si épanchement (numération, Gram, culture, cristaux).", "Bilan inflammatoire ; rhumatologie (CRDS AH-765) selon le tableau."] },
    ],
    compatibles: [["sap", "coiffe"], ["sap", "ac"], ["sap", "biceps"], ["sap", "calcif"], ["coiffe", "arthrose"], ["coiffe", "biceps"], ["instab", "biceps"], ["arthrose", "ac"],
      ["sap", "cervical"], ["coiffe", "cervical"], ["coiffe", "ac"], ["capsulite", "cervical"]],

    sections: [
      { id: "identification", titre: "Identification", note: "id", blocs: [{ questions: [
        C.sexe(), C.age(), C.cote("Épaule atteinte", "Droite", "Gauche", ["épaule droite", "épaule gauche", "deux épaules"]), C.accompagne(), C.lateralite(),
        C.dominant({ sap: p(1.3, .8), coiffe: p(1.3, .85) }),
        C.travail({ physique: { sap: 1.3, coiffe: 1.3, ac: 1.2 }, ajouts: [o("bras_hauts", "Travail les bras au-dessus des épaules", { sap: 1.8, coiffe: 1.5 }, { n: "travail les bras au-dessus des épaules" })] }), C.travailPrecision(),
        C.sport({ aucun: { instab: .6, ac: .7, biceps: .7 }, ajouts: [o("lancer", "Sport de lancer ou de raquette (baseball, volleyball, tennis, badminton…)", { sap: 1.6, biceps: 2, instab: 1.5 }, { n: "sport de lancer ou de raquette" }),
          o("contact", "Sport de contact ou de chute (hockey, football, vélo, ski…)", { ac: 2.5, instab: 2 }, { n: "sport de contact ou de chute" }),
          o("muscu", "Musculation", { ac: 1.8, sap: 1.3, biceps: 1.3 }, { n: "musculation" })] }), C.sportPrecision(),
        ouiNon("diabete", "Diabète", { court: "diabète", effets: { capsulite: p(2.5, .85), coiffe: p(1.2, 1) } }),
        ouiNon("tabac", "Tabagisme", { court: "tabagisme" }),
      ] }] },

      { id: "antecedents", titre: "Antécédents", note: "atcd", blocs: [{ questions: [
        ouiNon("atcd_epaule", "Blessure, luxation ou chirurgie antérieure à cette épaule", { court: "blessure, luxation ou chirurgie antérieure à cette épaule", effets: { instab: p(3, .7), arthrose: p(1.5, .9), coiffe: p(1.3, .95) } }),
        C.atcdRhumato("arthrite"), C.atcdFamiliaux({ arthrite: p(1.5, .9) }), C.atcdAutres(),
      ] }] },

      { id: "anamnese", titre: "Anamnèse", note: "hma", blocs: [
        { titre: "Début", questions: [
          C.premier({ instab: p(.6, 1.8), capsulite: p(1.3, .7), sap: p(.9, 1.1) }),
          C.duree({ lt7: { instab: 1.5, ac: 2, calcif: 2.5, sap: .6, capsulite: .3, arthrose: .3 }, s1_6: { calcif: 1.2, ac: 1.2 }, s6_12: { capsulite: 1.5, sap: 1.1, ac: .7, calcif: .7 },
            gt3m: { arthrose: 1.8, capsulite: 1.3, sap: 1.2, coiffe: 1.3, ac: .6, calcif: .6, instab: .8 } }),
          C.apparition({ subit_trauma: { instab: 4, ac: 4, coiffe: 2.5, biceps: 1.5, sap: .4, capsulite: .3, arthrose: .3, calcif: .3, ppr: .2, cervical: .5, arthrite: .3 },
            subit: { calcif: 4, arthrite: 2, cervical: 1.5, capsulite: .8, sap: .7, instab: .5, ac: .4 },
            graduel: { sap: 1.5, coiffe: 1.2, capsulite: 1.5, arthrose: 1.3, biceps: 1.3, ppr: 1.2, ac: .5, instab: .4, calcif: .6 },
            insidieux: { capsulite: 1.8, arthrose: 1.8, sap: 1.3, coiffe: 1.3, ppr: 1.3, instab: .2, ac: .3, calcif: .4 } }),
          C.contexte(),
          choix("mecanisme", "Mécanisme", [o("moignon", "Chute sur le dessus de l'épaule", { ac: 4, coiffe: 1.2 }, { n: "chute sur le dessus de l'épaule" }),
            o("main", "Chute sur la main tendue", { instab: 1.5, coiffe: 1.5, ac: 1.2 }, { n: "chute sur la main tendue" }),
            o("abduction", "Bras forcé en abduction et rotation externe", { instab: 4, biceps: 1.3 }, { n: "bras forcé en abduction et rotation externe" }),
            o("traction", "Traction ou soulèvement brusque", { coiffe: 2.5, biceps: 2 }, { n: "traction ou soulèvement brusque" }),
            o("lancer", "Lancer", { biceps: 2, instab: 1.5, sap: 1.2 }, { n: "en lançant" })], { si: trauma }),
          ouiNon("epaule_sortie", "Sensation que l'épaule est sortie de place", { court: "sensation que l'épaule est sortie de place", effets: { instab: p(8, .4) } }),
          ouiNon("bloquee", "Épaule déformée ou impossible à bouger depuis la blessure", { si: trauma, court: "épaule déformée ou bloquée depuis la blessure", effets: { instab: p(3, .8), ac: p(1.5, .9) } }),
          ouiNon("ecchymose", "Ecchymose", { si: trauma, court: "ecchymose", g: "ecchymose", effets: { coiffe: p(1.8, .9), ac: p(1.5, .9) } }),
        ] },
        { titre: "Douleur", questions: [
          multi("localisation", "Où est la douleur", [
            m("laterale", "Face latérale du bras (deltoïde)", { sap: p(2, .5), coiffe: p(1.6, .6), calcif: p(1.5, .8), capsulite: p(1.3, .8) }, { n: "face latérale du bras" }),
            m("dessus", "Sur le dessus de l'épaule (acromio-claviculaire)", { ac: p(5, .3, { g: "ac-loc" }) }, { n: "sur le dessus de l'épaule" }),
            m("anterieure", "Antérieure (sillon bicipital)", { biceps: p(3, .6), instab: p(1.3, .9) }, { n: "antérieure" }),
            m("profonde", "Profonde, diffuse", { capsulite: p(2, .8), arthrose: p(1.8, .8), ppr: p(1.5, .9) }, { n: "profonde, diffuse" }),
            m("posterieure", "Postérieure", { arthrose: p(1.3, .95), instab: p(1.2, 1) }, { n: "postérieure" }),
            m("cou", "Cou et trapèze", { cervical: p(4, .4), ppr: p(1.3, 1) }, { n: "cou et trapèze" }),
          ], { court: "Siège de la douleur", aide: "Plusieurs choix possibles. Une fois un siège coché, les sièges non cochés comptent comme absents." }),
          choix("irradiation", "Irradiation", [o("aucune", "Aucune", {}, { n: "sans irradiation" }), o("bras", "Jusqu'au bras, au-dessus du coude", { sap: 1.3, coiffe: 1.2 }, { n: "irradiation au bras, au-dessus du coude" }),
            o("main", "Sous le coude, jusqu'à la main", { cervical: 4, sap: .5, coiffe: .6 }, { n: "irradiation sous le coude, jusqu'à la main" }), o("cou", "Vers le cou", { cervical: 2.5 }, { n: "irradiation vers le cou" })]),
          C.type({ brulure: { cervical: 2 }, choc: { cervical: 2.5 }, pulsatile: { arthrite: 1.5, calcif: 1.3 } }), C.intensite(),
          ouiNon("paresthesies", "Engourdissements ou picotements dans le bras ou la main", { court: "paresthésies du membre supérieur", effets: { cervical: p(4, .5), sap: p(.8, 1.05) } }),
          ouiNon("douleur_cou", "Douleur au cou", { court: "douleur au cou", effets: { cervical: p(3, .5), ppr: p(1.3, 1) } }),
          ouiNon("bilaterale", "Douleur aux deux épaules (ou aux hanches aussi)", { court: "douleur aux deux épaules ou aux hanches", effets: { ppr: p(5, .3), capsulite: p(.6, 1.05), arthrite: p(1.5, .9) } }),
        ] },
        { titre: "Caractéristiques", questions: [
          ouiNon("au_dessus", "Pire les bras au-dessus de la tête", { court: "douleur pire les bras au-dessus de la tête", effets: { sap: p(2, .5), coiffe: p(1.5, .7), biceps: p(1.3, .8), calcif: p(1.3, 1) } }),
          ouiNon("couche", "Pire couché sur l'épaule", { court: "douleur pire couché sur l'épaule", effets: { sap: p(1.5, .7), coiffe: p(1.5, .7), calcif: p(1.3, .9) } }),
          ouiNon("faiblesse", "Faiblesse pour lever le bras", { court: "faiblesse pour lever le bras", effets: { coiffe: p(2.5, .5), sap: p(1.1, .9), cervical: p(1.5, .9) } }),
          ouiNon("raideur_mvt", "Perte de mouvement (attacher son soutien-gorge, se peigner)", { court: "perte de mouvement", effets: { capsulite: p(3, .3), arthrose: p(2, .6), coiffe: p(1.2, .9), sap: p(.8, 1.1) } }),
          ouiNon("craquements", "Craquements ou ressauts", { court: "craquements", effets: { arthrose: p(1.5, .9), biceps: p(1.5, .9), instab: p(1.3, .95) } }),
          ouiNon("instabilite", "Sensation d'instabilité ou de bras mort", { court: "sensation d'instabilité ou de bras mort", effets: { instab: p(4, .5), biceps: p(1.5, .9) } }),
          C.nocturne({ sap: p(1.5, .7), coiffe: p(1.6, .6), capsulite: p(1.8, .6), calcif: p(1.8, .8), arthrite: p(1.5, .8) }),
          C.reveils({ ppr: p(1.5, .9), arthrite: p(2, .8) }),
          C.raideur({ aucune: { ppr: .3, arthrite: .4 }, moins30: { arthrose: 1.3 }, plus30: { ppr: 4, arthrite: 3, capsulite: 1.2 } }),
          ouiNon("sympt_ppr", "Fatigue, perte d'appétit ou fébricule depuis le début", { court: "fatigue ou perte d'appétit", effets: { ppr: p(2.5, .8) } }),
          ouiNon("acg", "Céphalée récente, douleur de la mâchoire en mâchant ou trouble visuel", { court: "céphalée, claudication de la mâchoire ou trouble visuel", drapeau: true, effets: { ppr: p(2, 1) } }),
          ouiNon("effort", "Douleur déclenchée par l'effort ou avec essoufflement", { court: "douleur à l'effort ou avec essoufflement", drapeau: true }),
          ouiNon("rougeur_chaleur", "Rougeur ou chaleur", { court: "rougeur ou chaleur", g: "inflammation", effets: { arthrite: p(3, .8) } }),
          ouiNon("enflure", "Enflure de l'épaule", { court: "enflure", effets: { arthrite: p(2, .8) } }),
        ] },
        C.evolution(),
      ] },

      { id: "drapeaux", titre: "Drapeaux rouges", note: "hma", blocs: [{ labels: ["Présent", "Absent"], noteTitre: "Drapeaux rouges", note: { pos: "présents", neg: "absents" }, questions: [
        C.fievre({ arthrite: p(2, .9) }), C.symptGeneraux(), C.cancer(),
        C.risqueInfection([m("prothese", "Prothèse de l'épaule"), m("infiltration", "Infiltration ou chirurgie récente de l'épaule")]),
      ] }] },

      { id: "examen", titre: "Examen de l'épaule", note: "examen", blocs: [
        { titre: "Inspection", labels: ["Présent", "Absent"], note: { titre: "Inspection", pos: "présent", neg: "absent" }, questions: [
          ouiNon("atrophie", "Atrophie sus- ou sous-épineuse", { court: "atrophie de la fosse sus- ou sous-épineuse", effets: { coiffe: p(3, .8), cervical: p(1.5, .95) } }),
          ouiNon("deformation", "Déformation (marche d'escalier acromio-claviculaire, épaule carrée)", { court: "déformation", effets: { ac: p(3, .9), instab: p(2, .95) } }),
          ouiNon("ex_chaleur", "Enflure, chaleur ou rougeur", { court: "enflure, chaleur ou rougeur", g: "inflammation", effets: { arthrite: p(4, .6) } }),
          ouiNon("popeye", "Signe de Popeye (bosse du biceps)", { court: "signe de Popeye", effets: { biceps: p(6, .9) } }),
        ] },
        { titre: "Amplitudes", note: { titre: "Amplitudes" }, questions: [
          choix("elev_active", "Élévation active", [o("complete", "Complète", { capsulite: .2, arthrose: .4, coiffe: .7 }, { n: "élévation active complète" }),
            o("douleur", "Douloureuse ou limitée par la douleur", { sap: 1.5, coiffe: 1.3, calcif: 2 }, { n: "élévation active douloureuse" }),
            o("faible", "Impossible ou très faible", { coiffe: 5, cervical: 1.5, sap: .5 }, { n: "élévation active impossible ou très faible" }),
            o("raideur", "Limitée par la raideur", { capsulite: 3, arthrose: 2.5 }, { n: "élévation active limitée par la raideur" })]),
          choix("elev_passive", "Élévation passive", [o("complete", "Complète", { capsulite: .3, arthrose: .5 }, { n: "élévation passive complète" }),
            o("limitee", "Limitée", { capsulite: 3, arthrose: 2.5, sap: .4, coiffe: .6 }, { n: "élévation passive limitée" })]),
          choix("re_passive", "Rotation externe passive", [o("complete", "Complète", { capsulite: .15, arthrose: .5 }, { n: "rotation externe passive complète" }),
            o("limitee", "Limitée (moins de la moitié de l'autre côté)", { capsulite: 5, arthrose: 2.5, sap: .3 }, { n: "rotation externe passive limitée" })],
            { aide: "Perte de la rotation externe passive : capsulite ou arthrose ; elle est conservée dans l'atteinte de la coiffe." }),
          ouiNon("crepitants", "Crépitants gléno-huméraux", { court: "crépitants", labels: ["Présents", "Absents"], effets: { arthrose: p(3, .7) } }),
        ] },
        { titre: "Palpation", labels: PALP, note: { titre: "Palpation", pos: "sensible", neg: "indolore" }, questions: [
          ouiNon("palp_ac", "Articulation acromio-claviculaire", { court: "acromio-claviculaire", effets: { ac: est(1.5, .2, "Walton et coll., 2004 : sensible mais peu spécifique", { g: "ac-ex" }) } }),
          ouiNon("palp_sillon", "Sillon bicipital", { court: "sillon bicipital", effets: { biceps: p(2.5, .6, { g: "biceps-ex" }) } }),
          ouiNon("palp_tubercule", "Tubercule majeur", { court: "tubercule majeur", effets: { sap: p(1.5, .7), coiffe: p(1.5, .7), calcif: p(1.3, .9) } }),
        ] },
        { titre: "Coiffe et accrochage", labels: TEST, note: { titre: "Coiffe", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("arc", "Arc douloureux (60° à 120°)", { court: "arc douloureux", aide: "Douleur en abduction active entre 60° et 120°.",
            effets: { sap: est(3, .35, "Park et coll., 2005 (JBJS) ; Hermans et coll., 2013 (JAMA)", { g: "sap-ex" }), coiffe: est(2.5, .4, "Park et coll., 2005 ; Hermans et coll., 2013") } }),
          ouiNon("hawkins", "Hawkins-Kennedy", { court: "Hawkins", aide: "Bras à 90° de flexion, coude à 90°, rotation interne forcée. Positif : douleur.",
            effets: { sap: lit(.79, .59, "Hegedus et coll., 2012, méta-analyse (Br J Sports Med)", { g: "sap-ex" }) } }),
          ouiNon("neer", "Neer", { court: "Neer", aide: "Élévation passive maximale, omoplate stabilisée, rotation interne. Positif : douleur.",
            effets: { sap: lit(.72, .6, "Hegedus et coll., 2012, méta-analyse", { g: "sap-ex" }) } }),
          ouiNon("jobe", "Jobe (canette vide)", { court: "Jobe", aide: "Bras à 90° dans le plan de l'omoplate, pouces vers le bas, résistance. Positif : faiblesse ou douleur.",
            effets: { coiffe: est(2, .5, "Hermans et coll., 2013 (JAMA)", { g: "coiffe-ex" }), sap: p(1.3, .7) } }),
          ouiNon("re_resistance", "Faiblesse en rotation externe contre résistance", { court: "faiblesse en rotation externe", effets: { coiffe: est(4, .5, "Park et coll., 2005 ; Hermans et coll., 2013", { g: "coiffe-ex" }) } }),
          ouiNon("lag_re", "Signe du décalage en rotation externe", { court: "décalage en rotation externe", aide: "Rotation externe passive maximale, puis le patient tient la position. Positif : le bras revient.",
            effets: { coiffe: est(7, .6, "Hermans et coll., 2013 (JAMA) : RV+ élevé pour une déchirure transfixiante", { g: "coiffe-ex" }) } }),
          ouiNon("drop_arm", "Chute du bras (drop arm)", { court: "chute du bras", effets: { coiffe: est(3.3, .8, "Park et coll., 2005 ; Hermans et coll., 2013", { g: "coiffe-ex" }) } }),
          ouiNon("belly", "Belly press ou lift-off (sous-scapulaire)", { court: "belly press ou lift-off", effets: { coiffe: p(3, .8, { g: "coiffe-ex" }) } }),
        ] },
        { titre: "Biceps et acromio-claviculaire", labels: TEST, note: { titre: "Biceps et acromio-claviculaire", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("speed", "Speed", { court: "Speed", aide: "Flexion de l'épaule contre résistance, coude en extension, avant-bras en supination.", effets: { biceps: est(2, .6, "Hegedus et coll., 2012 : données hétérogènes", { g: "biceps-ex" }) } }),
          ouiNon("yergason", "Yergason", { court: "Yergason", aide: "Coude à 90°, supination contre résistance.", effets: { biceps: est(2, .8, "Hegedus et coll., 2012", { g: "biceps-ex" }) } }),
          ouiNon("obrien", "O'Brien", { court: "O'Brien", aide: "Flexion à 90°, adduction de 10°, pouce vers le bas, résistance. Douleur profonde : SLAP ; sur le dessus : acromio-claviculaire.",
            effets: { biceps: est(1.5, .5, "O'Brien et coll., 1998 (valeurs élevées) ; méta-analyses ultérieures plus faibles", { g: "biceps-ex" }), ac: p(1.5, .9) } }),
          ouiNon("cross_body", "Adduction horizontale forcée (cross-body)", { court: "cross-body", effets: { ac: est(2.5, .3, "Chronopoulos et coll., 2004", { g: "ac-ex" }) } }),
        ] },
        { titre: "Instabilité", labels: TEST, note: { titre: "Instabilité", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("apprehension", "Appréhension", { court: "appréhension", aide: "Couché, abduction 90° et rotation externe. Positif : appréhension.", effets: { instab: lit(.72, .96, "Farber et coll., 2006 (JBJS)", { g: "instab-ex" }) } }),
          ouiNon("relocation", "Relocation", { court: "relocation", aide: "Pression postérieure sur la tête humérale : l'appréhension disparaît.", effets: { instab: lit(.81, .92, "Farber et coll., 2006", { g: "instab-ex" }) } }),
          ouiNon("sulcus", "Signe du sillon (sulcus)", { court: "sillon", effets: { instab: p(2, .8, { g: "instab-ex" }) } }),
        ] },
        { questions: [C.controlateral()] },
        { titre: "Cou et neurologique", sous: "Cervical et neurologique", labels: TEST, note: { titre: "Cou et neurologique", pos: "positifs", neg: "négatifs" }, questions: [
          ouiNon("mvt_cou", "Douleur d'épaule reproduite par les mouvements du cou", { court: "douleur reproduite par les mouvements du cou", effets: { cervical: p(3, .4, { g: "cervical-ex" }), sap: p(.8, 1.05) } }),
          ouiNon("spurling", "Spurling", { court: "Spurling", aide: "Extension, inclinaison et compression axiale du cou vers le côté atteint. Positif : douleur radiculaire.",
            effets: { cervical: lit(.5, .88, "Rubinstein et coll., 2007 ; Wainner et coll., 2003", { g: "cervical-ex" }) } }),
          ouiNon("deficit_neuro", "Déficit sensitif, moteur ou réflexe C5–C6", { court: "déficit C5–C6", effets: { cervical: p(5, .6, { g: "cervical-ex" }) } }),
          ouiNon("axillaire", "Hypoesthésie du deltoïde (nerf axillaire)", { court: "hypoesthésie du deltoïde", si: trauma }),
        ] },
        C.edu(), C.remarques(),
      ] },
    ],

    regles: [
      C.regles.age12,
      C.regles.septique("une épaule", ["rougeur_chaleur", "ex_chaleur"], ["enflure", "ex_chaleur"]),
      L => L.oui("effort") ? { niveau: "urgence", titre: "Douleur d'origine cardiaque à éliminer", texte: "Douleur à l'épaule déclenchée par l'effort ou avec essoufflement.",
        conduite: ["ECG et troponines selon le tableau ; diriger à l'urgence si douleur actuelle ou instable."] } : null,
      L => (L.oui("acg") && (L.age === null || L.age >= 50)) ? { niveau: "urgence", titre: "Artérite à cellules géantes à éliminer", texte: "Céphalée récente, claudication de la mâchoire ou trouble visuel après 50 ans.",
        conduite: ["VS et CRP le jour même ; corticothérapie sans attendre si forte suspicion ; ophtalmologie en urgence si trouble visuel."] } : null,
      L => {
        if (!L.trauma()) return null;
        const signes = L.oui("bloquee") || L.oui("deformation") || L.v("elev_active") === "faible" || (L.age !== null && L.age >= 50) || L.oui("ecchymose");
        if (L.oui("bloquee") && (L.oui("epaule_sortie") || L.oui("deformation"))) return { niveau: "urgence", titre: "Luxation non réduite à éliminer",
          texte: "Épaule déformée ou bloquée après la blessure.", conduite: ["Radiographie avant et après réduction ; vérifier le nerf axillaire (sensibilité du deltoïde) et les pouls."] };
        return signes ? { niveau: "rapide", titre: "Radiographie de l'épaule indiquée", texte: "Traumatisme avec déformation, mobilité impossible, ecchymose ou 50 ans et plus.",
          conduite: ["Radiographie de l'épaule (face, axillaire ou en Y) : luxation, fracture de l'humérus proximal ou de la clavicule."] }
          : { niveau: "info", titre: "Traumatisme : radiographie selon l'examen", texte: "Radiographie si déformation, mobilité impossible, douleur osseuse ou 50 ans et plus." };
      },
      L => (L.oui("axillaire")) ? { niveau: "rapide", titre: "Atteinte du nerf axillaire", texte: "Hypoesthésie du deltoïde après un traumatisme.", conduite: ["Documenter ; EMG et orthopédie si persistante."] } : null,
      L => (L.trauma() && (L.oui("drop_arm") || L.oui("lag_re") || L.v("elev_active") === "faible"))
        ? { niveau: "rapide", titre: "Rupture traumatique aiguë de la coiffe à éliminer", texte: "Faiblesse importante après un traumatisme.",
          conduite: ["Échographie ou IRM rapidement ; CRDS AH-753, priorité C, si rupture complète prouvée chez moins de 50 ans."], liens: [{ t: "CRDS : rupture de la coiffe", u: "/crds/?q=coiffe" }] } : null,
      L => (L.oui("tabac") && (L.age === null || L.age >= 40) && (L.oui("sympt_generaux") || (L.oui("atrophie") && L.oui("paresthesies"))))
        ? { niveau: "rapide", titre: "Tumeur de l'apex pulmonaire (Pancoast) à éliminer", texte: "Fumeur avec symptômes généraux ou atteinte neurologique du membre.", conduite: ["Radiographie pulmonaire, puis TDM si doute."] } : null,
      L => (L.oui("bilaterale") && (L.age === null || L.age >= 50) && L.v("raideur") === "plus30")
        ? { niveau: "considerer", titre: "Pseudopolyarthrite rhizomélique à considérer", texte: "50 ans et plus, douleur des deux épaules, raideur matinale prolongée.", conduite: ["VS et CRP ; chercher une artérite temporale."] } : null,
      L => (L.oui("deficit_neuro") || (L.v("irradiation") === "main" && L.oui("paresthesies")))
        ? { niveau: "considerer", titre: "Radiculopathie cervicale à considérer", texte: "Irradiation sous le coude avec paresthésies, ou déficit neurologique.", conduite: ["Examen cervical et neurologique ; outil cervical."],
          liens: [{ t: "Outil cervical", u: "/locomoteur/cervical/" }] } : null,
      C.regles.tumeur("Radiographie de l'épaule et de l'humérus."),
    ],
  });
})();
