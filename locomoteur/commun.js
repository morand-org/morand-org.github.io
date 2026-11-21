/* Locomoteur Morand : questions et blocs communs à toutes les régions, écrits pour produire une note au format des
   notes de clinique locomotrice (voir le moteur). Chaque région passe ses propres poids : RV par option, ou
   p(RV si oui, RV si non) par diagnostic. Les poids passés ici sont provisoires, comme dans les fichiers de régions. */
(function () {
  "use strict";
  const { o, m, ouiNon, choix, multi, nombre, texte, caseQ } = window.Locomoteur.outils;
  const DEPUIS = { lt7: "depuis moins de 7 jours", s1_6: "depuis 1 à 6 semaines", s6_12: "depuis 6 semaines à 3 mois", gt3m: "depuis plus de 3 mois" };

  // Remplace les effets d'options d'une liste à cocher : { option: [effets complets { dx, rvp, rvn | se, sp, statut, piste }] }.
  const surcharger = (rv, q) => { if (!rv) return q; for (const [opt, liste] of Object.entries(rv)) { q.effets = q.effets.filter(e => !(e.opt === opt && liste.some(x => x.dx === e.dx))).concat(liste.map(e => ({ g: "atcd-rhumato", ...e, opt }))); } return q; };
  const C = {
    /* Identification */
    visite: () => choix("visite", "Visite", [o("initiale", "Première visite", {}, { n: "" }), o("suivi", "Suivi", {}, { n: "" })], { info: "En suivi, la note titre « Évolution depuis la dernière visite » et la raison de consultation commence par « Suivi »." }),
    sexe: () => choix("sexe", "Sexe", [o("F", "Femme"), o("M", "Homme")], { info: "La fréquence de plusieurs atteintes diffère selon le sexe (ex. syndrome fémoro-patellaire et instabilité rotulienne plus fréquents chez les filles et les femmes)." }),
    age: () => nombre("age", "Âge", { unite: "ans", min: 12, max: 110, aide: "Âge exact", info: "Les causes changent beaucoup avec l'âge (apophysites chez l'adolescent, atteintes ligamentaires chez le jeune sportif, arthrose après 45 ans) : la probabilité de départ suit l'âge exact." }),
    // cote("Genou atteint", "Droit", "Gauche")
    cote: (libelle, d, g, bilateral = {}, deux = null) => choix("cote", libelle, [o("D", d, {}, { abr: "D", cote: d.toLowerCase() }), o("G", g, {}, { abr: "G", cote: g.toLowerCase() }),
      o("B", "Les deux", bilateral, { abr: "bilat", cote: "bilatéral", rc: deux })],
      { info: "Une atteinte des deux côtés oriente vers une cause de surcharge, dégénérative ou systémique (fémoro-patellaire, arthrose, arthrite inflammatoire, apophysite) plutôt que vers une blessure." }),
    accompagne: () => texte("accompagne", "Accompagné de", { aide: "Facultatif, par exemple « sa mère »." }),
    refere: () => texte("refere", "Référé par (professionnel, question posée)", { gabarit: "Référé par {v}", aide: "Ex. « thérapeute sportive pour précision diagnostique ; écho? »." }),
    dominance: (libelle = "Dominance podale") => choix("lateralite", libelle, [o("D", "Droitier"), o("G", "Gaucher"), o("A", "Ambidextre")],
      { info: "Pour la note seulement : aucune donnée ne la relie au diagnostic." }),
    // travail({ physique: {…}, ajouts: [o(…)] }) ; la précision écrite remplace l'option dans la note.
    /* Options fixes (la question est commune à toutes les plaintes d'une consultation) : chaque région donne ses RV par option. */
    travail: (rv = {}) => choix("travail", "Occupation", [o("etudes", "Études", rv.etudes, { n: "étudiant{e}" }), o("bureau", "Travail de bureau ou sédentaire", rv.bureau, { n: "travail de bureau" }),
      o("physique", "Travail physique (charges, manutention)", rv.physique, { n: "travail physique" }), o("genoux", "Travail à genoux (plancher, toiture, plomberie…)", rv.genoux, { n: "travail à genoux" }),
      o("debout", "Debout toute la journée (commerce, usine, soins)", rv.debout, { n: "travail debout" }),
      o("manuel", "Gestes répétitifs des mains ou bras au-dessus des épaules", rv.manuel, { n: "travail manuel répétitif" }),
      o("retraite", "Retraite ou sans emploi", rv.retraite, { n: "retraité{e}" })],
      { court: "Occupation", precision: "travail_precision" }),
    travailPrecision: () => texte("travail_precision", "Occupation : précisions (métier, tâches physiques)", { court: "Occupation", precise: true }),
    /* Activités physiques : plusieurs choix possibles. Les sports qui pointent vers le même diagnostic ne comptent qu'une
       fois (groupe « sport ») ; « Peu ou pas de sport » exclut les autres. rv : { activité: { diagnostic: RV } }. */
    sport: (rv = {}) => multi("sport", "Activités physiques", [
      ["aucun", "Peu ou pas de sport", "peu ou pas de sport"], ["marche", "Marche ou randonnée", "marche ou randonnée"], ["course", "Course à pied", "course à pied"],
      ["velo", "Vélo", "vélo"], ["pivot", "Sports de pivot ou de saut (soccer, basketball, volleyball, handball…)", "sport de pivot ou de saut"],
      ["raquette", "Sports de raquette (tennis, badminton, pickleball, squash)", "sport de raquette"],
      ["contact", "Sports de contact ou de collision (hockey, football, rugby, combat)", "sport de contact"],
      ["lancer", "Sports de lancer (baseball, softball, water-polo)", "sport de lancer"], ["glisse", "Ski ou planche", "ski ou planche"],
      ["danse", "Danse, gymnastique ou cheerleading", "danse ou gymnastique"], ["muscu", "Musculation, haltérophilie ou CrossFit", "musculation"],
      ["natation", "Natation", "natation"], ["escalade", "Escalade", "escalade"], ["golf", "Golf", "golf"], ["yoga", "Yoga ou Pilates", "yoga ou Pilates"],
      ["autre", "Autre activité", "autre activité"],
    ].map(([v, l, n]) => m(v, l, Object.fromEntries(Object.entries(rv[v] || {}).map(([dx, x]) => [dx, { rvp: x, rvn: 1 }])), { n, exclusif: v === "aucun" })),
    { court: "Sports et loisirs", precision: "sport_precision", g: "sport", joint: " ; ", aucun: "Sports et loisirs : peu ou pas de sport",
      aide: "Plusieurs choix possibles", info: "Le type de sport oriente : pivot et saut (ligaments, ménisques, tendon rotulien), course et vélo (bandelette, fémoro-patellaire), contact (ligaments collatéraux). Si plusieurs sports pointent vers le même diagnostic, un seul compte. Les précisions (niveau, position, volume) vont dans le champ suivant." }),
    sportPrecision: () => texte("sport_precision", "Sports et loisirs : précisions (activité, niveau, position, volume)", { court: "Sports et loisirs", precise: true,
      aide: "Ex. « soccer AA, milieu de terrain, 3 entraînements/semaine ». Le premier élément sert aussi à l'impression." }),
    /* Habitudes de vie (communes à la consultation). */
    hdv: () => [choix("tabac", "Tabac", [o("non", "Non-fumeur", {}, { n: "non-fumeur{e}" }), o("actuel", "Fumeur", {}, { n: "tabagisme actif" }), o("ancien", "Ancien fumeur", {}, { n: "ancien{ne} fumeur{e}" })],
        { court: "Tabac" }),
      texte("alcool_drogues", "Alcool, cannabis ou autres drogues", { court: "ROH et drogues" })],
    administratif: () => texte("administratif", "Contexte (CNESST, SAAQ, arrêt de travail, attentes)", { court: "Contexte" }),

    /* Antécédents : « Nil », dépistage rhumatologique écrit en phrases. */
    nil: () => caseQ("atcd_nil", "Aucun antécédent (Nil)", { n: "Nil" }),
    /* « autres » : { cristaux: id du diagnostic goutte/chondrocalcinose, septique: id de l'arthrite septique } ; sans eux,
       goutte et pseudogoutte comptent pour « dx ». PAR connue → arthrite septique : Margaretten et coll., 2007 (JAMA). */
    atcdRhumato: (dx = "arthrite", forts = 4, moyens = 2.5, autres = {}) => surcharger(autres.rv, multi("atcd_rhumato", "ATCD d'uvéite, psoriasis, synovite, MII ou autre maladie rhumatologique", [
      m("aucun", "Aucun", {}, { exclusif: true }),
      m("uveite", "Uvéite", { [dx]: { rvp: moyens, rvn: 1 } }), m("psoriasis", "Psoriasis", { [dx]: { rvp: moyens, rvn: 1 } }),
      m("synovite", "Synovite", { [dx]: { rvp: 3, rvn: 1 } }), m("mii", "MII", { [dx]: { rvp: moyens, rvn: 1 } }),
      m("goutte", "Goutte", { [autres.cristaux || dx]: { rvp: autres.cristaux ? 6 : forts, rvn: 1, g: "atcd-cristaux" } }),
      m("pseudogoutte", "Pseudogoutte", { [autres.cristaux || dx]: { rvp: autres.cristaux ? 6 : forts, rvn: 1, g: "atcd-cristaux" } }),
      m("par", "Polyarthrite rhumatoïde", { [dx]: { rvp: forts, rvn: 1 }, ...(autres.septique ? { [autres.septique]: { se: .68, sp: .73, statut: "verifie", g: "septique-atcd",
        piste: "Margaretten et coll., 2007, JAMA (examen clinique rationnel) : PAR connue, RV+ 2,5, RV− 0,45" } } : {}) }),
      m("spa", "Spondylarthrite", { [dx]: { rvp: 3, rvn: 1 } }),
      m("infection", "Infection récente (urinaire, génitale, digestive)", { [dx]: { rvp: moyens, rvn: 1 } }),
    ], { court: "ATCD", g: "atcd-rhumato", aucun: "Pas d'ATCD d'uvéite / psoriasis / synovite / MII", gabarit: "ATCD de {v}" })),
    atcdFamiliaux: (effets) => ouiNon("atcd_familiaux", "ATCD familial de maladie rhumatologique", { oui: "ATCD familial de maladie rhumatologique",
      non: "Pas d'ATCD familial de maladie rhumatologique", effets }),
    rx: () => texte("rx", "Rx (médicaments)", { gabarit: "Rx : {v}" }),
    atcdMsk: () => texte("atcd_msk", "Blessures et problèmes MSK antérieurs", { gabarit: "Blessures et problèmes MSK antérieurs : {v}" }),
    atcdMedicaux: () => texte("atcd_medicaux", "ATCD médicaux et chirurgicaux", { gabarit: "ATCD médicaux : {v}" }),
    atcdAutres: () => texte("atcd_autres", "Autres (allergies, habitudes de vie)", { long: true }),

    /* HMA */
    rappel: () => texte("rappel", "Rappel de la dernière visite (date, diagnostic, traitement)", { si: L => L.v("visite") === "suivi" }),
    premier: (effets) => ouiNon("premier", "Premier épisode", { oui: "premier épisode", non: "épisodes antérieurs semblables", effets }),
    depuis: () => texte("depuis", "Début : date ou durée (ex. « le 2 novembre 2026 »)", { gabarit: "débuté {v}", info: "Repris dans la raison de consultation et la HMA." }),
    contexte: () => texte("contexte", "Contexte du début (activité, geste)", { colle: true, aide: "Ex. « au soccer, pivot sur pied fixe sans contact » : s'écrit à la suite de la date." }),
    duree: (rv = {}) => choix("duree", "Depuis combien de temps", ["lt7", "s1_6", "s6_12", "gt3m"].map((v, i) => o(v, ["Moins de 7 jours", "1 à 6 semaines", "6 semaines à 3 mois", "Plus de 3 mois"][i], rv[v],
      { n: "", depuis: DEPUIS[v] })), { info: "Une atteinte de moins de 7 jours oriente vers une blessure (ligament, ménisque, fracture) ; au-delà de 3 mois, vers l'arthrose, les tendinopathies et le fémoro-patellaire. Sert aussi à l'impression (aiguë, subaiguë, chronique) et à la règle d'Ottawa (traumatisme de moins de 7 jours)." }),
    apparition: (rv = {}) => choix("apparition", "Mode d'apparition", [o("subit_trauma", "Subit, avec un traumatisme", rv.subit_trauma, { n: "" }),
      o("subit", "Subit, sans traumatisme", rv.subit, { n: "début subit sans traumatisme" }), o("graduel", "Graduel", rv.graduel, { n: "début graduel" }),
      o("insidieux", "Insidieux", rv.insidieux, { n: "début insidieux" })],
      { aide: "Graduel : s'installe en quelques jours ou semaines, souvent avec une hausse d'activité. Insidieux : sans cause apparente, très lentement." }),
    evolution: () => choix("evolution", "Évolution", [o("mieux", "S'améliore", {}, { n: "évolution favorable" }), o("stable", "Stable", {}, { n: "évolution stable" }), o("pire", "S'aggrave", {}, { n: "en aggravation" })]),
    reaggravations: () => texte("reaggravations", "Réaggravations (quand, pourquoi)"),
    type: (rv = {}) => choix("type_douleur", "Type de douleur", [o("pression", "Pression, comme un bleu", rv.pression, { n: "de type pression" }),
      o("sourde", "Sourde, profonde", rv.sourde, { n: "sourde et profonde" }), o("aigue", "Aiguë, en coup de poignard", rv.aigue, { n: "aiguë, en coup de poignard" }),
      o("brulure", "Brûlure", rv.brulure, { n: "sous forme de brûlure" }), o("choc", "Choc électrique", rv.choc, { n: "en choc électrique" }),
      o("pulsatile", "Lancinante, pulsatile", rv.pulsatile, { n: "lancinante" }), o("autre", "Autre", {}, { n: "" })],
      { info: "Une brûlure ou un choc électrique évoquent une origine nerveuse (radiculopathie, nerf périphérique) plutôt qu'articulaire." }),
    intensites: () => [nombre("int_repos", "Intensité au repos (0 à 10)", { gabarit: "{v}/10 au repos", min: 0, max: 10, unite: "/10" }),
      nombre("int_activite", "Intensité à l'activité (0 à 10)", { gabarit: "{v}/10 à l'activité", min: 0, max: 10, unite: "/10" })],
    attenuants: () => texte("attenuants", "Diminuée par", { gabarit: "diminuée par {v}" }),
    moment: (rv = {}) => choix("moment", "Horaire", [o("matin", "Pire le matin, mieux en bougeant", rv.matin, { n: "pire le matin, mieux en bougeant" }),
      o("soir", "Pire en fin de journée ou après l'activité", rv.soir, { n: "pire en fin de journée et après l'activité" }), o("constante", "Constante", rv.constante, { n: "douleur constante" })]),
    nocturne: (effets) => ouiNon("nocturne", "Douleur la nuit", { oui: "douleur nocturne", nie: "douleur nocturne", drapeau: true, effets }),
    reveils: (effets) => ouiNon("reveils", "Réveils en deuxième partie de nuit", { oui: "réveils en deuxième partie de nuit", nie: "réveil nocturne", effets }),
    raideur: (rv = {}, effets) => choix("raideur", "Raideur matinale", [o("aucune", "Aucune", rv.aucune, { n: "pas de raideur matinale" }),
      o("moins30", "Moins de 30 minutes", rv.moins30, { n: "raideur matinale de moins de 30 min" }), o("plus30", "30 minutes ou plus", rv.plus30, { n: "raideur matinale de 30 min ou plus" })], { effets }),
    // Chaque traitement tenté a son propre effet : « Physiothérapie sans effet, glace avec effet partiel ».
    traitements: () => [["repos", "Repos ou arrêt de l'activité", "repos"], ["glace", "Glace ou chaleur", "glace"], ["ains", "AINS ou analgésiques", "AINS"],
      ["physio", "Physiothérapie", "physiothérapie"], ["chiro", "Chiropraticien ou ostéopathe", "chiropraticien"], ["orthese", "Orthèse, attelle ou taping", "orthèse"],
      ["infiltration", "Infiltration", "infiltration"]].map(([v, l, n]) => choix(`tt_${v}`, l, [o("bon", "Bon effet", {}, { n: `${n} avec bon effet` }),
        o("partiel", "Effet partiel", {}, { n: `${n} avec effet partiel` }), o("temporaire", "Temporaire", {}, { n: `${n} avec soulagement temporaire` }),
        o("nul", "Sans effet", {}, { n: `${n} sans effet` })])).concat([texte("tt_autres", "Autres traitements et leur effet")]),
    limitations: () => [ouiNon("impact_travail", "Limité au travail, à l'école ou dans la vie courante", { oui: "limité au travail ou dans la vie courante", non: "travail et vie courante possibles" }),
      ouiNon("arret_sport", "Arrêt ou réduction du sport", { oui: "arrêt ou réduction du sport", non: "poursuit le sport" }),
      texte("limitations", "Limitations, échéances sportives")],
    autresArticulations: (effets) => ouiNon("autres_articulations", "Douleur ou enflure d'autres articulations", { oui: "atteinte d'autres articulations", nie: "atteinte d'autres articulations", effets }),

    /* Drapeaux rouges (négatifs regroupés en fin d'HMA) */
    fievre: (effets) => ouiNon("fievre", "Fièvre ou frissons", { oui: "fièvre ou frissons", nie: "fièvre", drapeau: true, effets }),
    symptGeneraux: (effets) => ouiNon("sympt_generaux", "Perte de poids, sueurs nocturnes ou fatigue inexpliquées", { oui: "atteinte de l'état général", nie: "atteinte de l'état général", drapeau: true, effets }),
    cancer: (effets) => ouiNon("atcd_cancer", "Antécédent de cancer", { oui: "ATCD de cancer", nie: "ATCD de cancer", drapeau: true, effets }),
    /* « septique » : id de l'arthrite septique, si la région la calcule (diabète : Margaretten et coll., 2007). */
    risqueInfection: (ajouts = [], septique = null) => multi("risque_infection", "Facteurs de risque d'infection", [m("aucun", "Aucun", {}, { exclusif: true }),
      m("immuno", "Immunosuppression ou diabète", septique ? { [septique]: { rvp: 2.7, rvn: 1, statut: "verifie", piste: "Margaretten et coll., 2007, JAMA : diabète, Se 12 %, Sp 96 %, RV+ 2,7" } } : {}, { n: "immunosuppression ou diabète" }),
      ...ajouts, m("udi", "Drogues injectables", septique ? { [septique]: { rvp: 3, rvn: 1 } } : {}, { n: "drogues injectables" })], { aucun: "", gabarit: "facteur de risque d'infection : {v}",
      info: "Le risque d'arthrite septique augmente avec une prothèse, une chirurgie ou une infiltration récente, le diabète, l'immunosuppression, une PAR connue et l'âge de plus de 80 ans (Margaretten et coll., 2007)." }),

    /* Examen : fonctionnel (membre inférieur et bas du dos), en tête d'EXAMEN PHYSIQUE. */
    /* opts.garder : identifiants des questions à garder (toutes par défaut) ; opts.ajouts : questions propres à la région ;
       opts.effets : { question: [effets complets, ex. { dx, rv, statut, piste }] } pour des poids vérifiés. */
    fonctionnel: (rv = {}, opts = {}) => ({ titre: "Fonctionnel", tete: true, toutNormal: true, questions: [
      choix("posture", "Posture", [o("normale", "Normale", {}, { n: "posture normale" }), o("valgus", "Genu valgum", rv.valgum, { n: "genu valgum" }),
        o("varus", "Genu varum", rv.varum, { n: "genu varum" }), o("flexum", "Flexum", rv.flexum, { n: "flexum" }), o("recurvatum", "Recurvatum", rv.recurvatum, { n: "recurvatum" })], { ligneEx: "posture" }),
      choix("arches", "Arches plantaires", [o("normales", "Normales", {}, { n: "arches plantaires normales" }), o("plat", "Affaissées", rv.plat, { n: "arches plantaires affaissées" }),
        o("creux", "Creuses", rv.creux, { n: "pieds creux" })], { ligneEx: "posture" }),
      choix("demarche", "Démarche", [o("normale", "Normale", rv.demarche_normale, { n: "démarche normale" }), o("boiterie", "Boiterie antalgique", rv.boiterie, { n: "boiterie antalgique" }),
        o("appui", "Incapable de mettre du poids", rv.appui, { n: "incapable de mettre du poids" }), o("rotext", "Pied en rotation externe", rv.rotext, { n: "démarche pied en rotation externe" })], { ligneEx: "demarche" }),
      choix("talons_pointes", "Marche sur talons et pointes", [o("normale", "Normale", {}, { n: "marche sur talons et pointes normale" }),
        o("anormale", "Difficile ou douloureuse", rv.talons, { n: "marche sur talons et pointes difficile ou douloureuse" })], { ligneEx: "demarche" }),
      choix("trendelenburg", "Trendelenburg", [o("negatif", "Négatif", {}, { n: "Trendelenburg négatif" }), o("positif", "Positif", rv.trendelenburg, { n: "Trendelenburg positif" })], { ligneEx: "demarche" }),
      choix("squat_bi", "Squat bipodal", [o("normal", "Normal et indolore", rv.squat_normal, { n: "squat bipodal normal et indolore" }), o("ant", "Douleur antérieure", rv.squat_ant, { n: "squat bipodal avec douleur antérieure" }),
        o("med", "Douleur médiale", rv.squat_med, { n: "squat bipodal avec douleur médiale" }), o("lat", "Douleur latérale", rv.squat_lat, { n: "squat bipodal avec douleur latérale" }),
        o("limite", "Limité", rv.squat_limite, { n: "squat bipodal limité" })], { effets: rv.squatEffets, ligneEx: "squat" }),
      choix("duck_walk", "Duck walk", [o("negatif", "Négatif", rv.duck_neg, { n: "duck walk négatif" }), o("positif", "Douloureux ou impossible", rv.duck_pos, { n: "duck walk douloureux" })], { effets: rv.duckEffets, horsNormal: true, ligneEx: "squat" }),
      choix("squat_uni", "Squat unipodal", [o("normal", "Normal et indolore", rv.uni_normal, { n: "squat unipodal{cote} normal et indolore" }),
        o("valgus", "Valgus dynamique", rv.uni_valgus, { n: "squat unipodal{cote} avec valgus dynamique" }), o("douleur", "Douloureux", rv.uni_douleur, { n: "squat unipodal{cote} douloureux" })], { ligneEx: "squat" }),
      choix("appui_uni", "Appui unipodal", [o("normal", "Normal", {}, { n: "appui unipodal{cote} normal" }), o("anormal", "Instable ou douloureux", rv.appui_uni, { n: "appui unipodal{cote} instable ou douloureux" })],
        { horsNormal: true, ligneEx: "saut" }),
      choix("saut_bi", "Saut bipodal", [o("normal", "Normal et indolore", rv.saut_normal, { n: "saut bipodal normal et indolore" }), o("douleur", "Douloureux", rv.saut_douleur, { n: "saut bipodal douloureux" })], { ligneEx: "saut" }),
      choix("saut_uni", "Saut unipodal", [o("normal", "Normal", {}, { n: "saut unipodal{cote} normal" }), o("douleur", "Douloureux", rv.saut_uni, { n: "saut unipodal{cote} douloureux" }),
        ...(rv.saut_impossible ? [o("impossible", "Impossible", rv.saut_impossible, { n: "saut unipodal{cote} impossible" })] : [])], { horsNormal: true, ligneEx: "saut", effets: rv.sautEffets }),
    ].filter(q => !opts.garder || opts.garder.includes(q.id)).concat(opts.ajouts || [])
      .map(q => { if (opts.effets && opts.effets[q.id]) q.effets.push(...opts.effets[q.id].map(e => ({ statut: "provisoire", ...e }))); return q; }) }),
    // Ligament : normal et indolore / douleur sans laxité / laxité.
    lig: (id, libelle, court, effets, extra = {}) => choix(id, libelle, [o("normal", "Normal et indolore", {}, { n: "{court} normal et indolore" }),
      o("douleur", "Douleur sans laxité", extra.douleur || {}, { n: "{court} douloureux sans laxité" }), o("laxite", "Laxité", extra.laxite || {}, { n: "{court} avec laxité" }),
      o("equivoque", "Équivoque", {}, { n: "{court} équivoque" })],
      { court, effets, equivoque: true, aide: extra.aide, info: extra.info, positif: extra.positif, video: extra.video }),
    // Amplitude (AROM ou PROM) : complète et indolore / fin douloureuse / limitée (degrés facultatifs).
    amplitude: (id, libelle, court, rv = {}, deficit = false, effets) => choix(id, libelle, [o("complete", "Complète et indolore", rv.complete, { n: `${court} complète et indolore` }),
      o("fin", "Complète, fin douloureuse", rv.fin, { n: `${court} complète, douloureuse en fin de mouvement` }),
      o("lim_douleur", deficit ? "Déficit avec douleur" : "Limitée avec douleur", rv.lim_douleur, { n: deficit ? `${court} incomplète{deg} avec douleur` : `${court} limitée{deg} avec douleur` }),
      o("lim_raideur", deficit ? "Déficit par raideur" : "Limitée par raideur", rv.lim_raideur, { n: deficit ? `${court} incomplète{deg}, raideur` : `${court} limitée{deg}, raideur` }),
      ...(rv.blocage ? [o("blocage", "Blocage mécanique", rv.blocage, { n: `blocage mécanique de l'${court}{deg}` })] : [])], { court, degres: `${id}_deg`, effets }),
    degres: (id, libelle, deficit = false) => nombre(`${id}_deg`, libelle, { unite: "°", min: 0, max: 180, lie: true, gabarit: deficit ? "(déficit ~{v}°)" : "à ~{v}°",
      si: L => L.dans(id, ["lim_douleur", "lim_raideur", "blocage"]) }),
    controlateral: () => [choix("controlateral", "Côté controlatéral", [o("normal", "Normal", {}, { n: "normal" }), o("anormal", "Anormal", {}, { n: "anormal" })],
      { court: "Côté controlatéral", precision: "controlateral_precision" }),
      texte("controlateral_precision", "Côté controlatéral : précisions", { precise: true, aide: "Ex. « genou D, ROM complet avec 2° d'hyperextension »." })],
    autresObservations: () => ({ titre: "Autres observations", ligne: false, questions: [texte("ex_autres", "Autres observations à l'examen")] }),

    /* Investigations déjà faites et EDU */
    investigations: () => ({ id: "investigations", titre: "Investigations", note: "inv", blocs: [{ questions: [
      texte("investigations", "Investigations déjà faites (type, région, côté, date, résultat, source)", { long: true, aide: "Une investigation par ligne." }),
      texte("edu", "Échographie au cabinet (EDU)", { long: true, edu: true, aide: "Une trouvaille par ligne : section EDU de la note." }),
    ] }] }),

    /* Plan : cases dans l'ordre habituel, avec un petit champ pour les détails. */
    plan: () => ({ id: "plan", titre: "Impression et plan", note: "plan", blocs: [{ titre: "Impression", questions: [
      texte("impression_precisions", "Précisions à l'impression", { long: true, aide: "Une ligne par précision, ajoutée sous le diagnostic. Ex. « Douleur impossible à reproduire à l'examen ce jour »." }),
    ] }, { titre: "Plan", questions: [
      caseQ("plan_enseignement", "Enseignement et conseils", { n: "Enseignement et conseils" }),
      texte("plan_medication", "Médication (nom, dose, prn)"),
      caseQ("plan_physio", "Référence en physiothérapie", { n: "Référence physiothérapie" }),
      caseQ("plan_exercices", "Exercices à domicile", { n: "Exercices à domicile remis" }),
      texte("plan_orthese", "Orthèse, taping ou immobilisation"),
      texte("plan_sport", "Retour au sport (restrictions, étapes)", { gabarit: "Retour au sport : {v}" }),
      texte("plan_travail", "Travail ou école (note, limitations, formulaires)", { gabarit: "Travail ou école : {v}" }),
      texte("plan_imagerie", "Imagerie demandée"),
      texte("plan_infiltration", "Infiltration prévue"),
      texte("plan_reference", "Référence", { gabarit: "Référence : {v}" }),
      caseQ("plan_reconsultation", "Consignes de reconsultation", { n: "Consignes de reconsultation données" }),
      texte("plan_suivi", "Suivi (délai)", { gabarit: "RDV de suivi dans {v}" }),
      texte("plan_ajouts", "Autres éléments du plan", { long: true, aide: "Les suggestions de l'onglet Conduite s'ajoutent ici d'un clic (« + Plan »)." }),
    ] }] }),
  };

  /* Règles communes : âge, tumeur, infection d'une articulation périphérique. « ro » : ce qui s'écrit « … à R/O » dans l'impression. */
  C.regles = {
    age12: L => (L.age !== null && L.age < 12 ? { niveau: "info", titre: "Outil prévu pour les 12 ans et plus", texte: "Chez l'enfant plus jeune, les causes et leurs fréquences diffèrent : les probabilités ne s'appliquent pas." } : null),
    tumeur: (imagerie) => L => (L.oui("sympt_generaux") || (L.oui("atcd_cancer") && L.oui("nocturne")) || (L.oui("nocturne") && L.age !== null && L.age <= 25 && !L.trauma() && L.v("moment") === "constante"))
      ? { niveau: "rapide", titre: "Tumeur ou atteinte systémique à éliminer", ro: "tumeur", texte: L.oui("sympt_generaux") ? "Atteinte de l'état général." : "Douleur nocturne, sans traumatisme, avec un ATCD de cancer ou chez un jeune patient.",
        conduite: [imagerie, "FSC, CRP, VS ; investigation rapide si anomalie."] } : null,
    septique: (articulation, chaleurs, enflures) => L => {
      const inflam = chaleurs.some(id => L.oui(id)), epanch = enflures.some(([id, vals]) => vals.includes(L.v(id)));
      const risque = ["immuno", "prothese", "infiltration", "udi"].some(x => L.a("risque_infection", x));
      const conduite = [
        { t: "Ponction avant tout antibiotique (décompte, Gram, culture, cristaux) et hémocultures ; les cristaux n'excluent pas l'infection", src: "Margaretten et coll., 2007, JAMA ; Swisher et coll., 2025, AFP" },
        { t: "Leucocytes > 50 000/µL : RV ≈ 8 ; > 100 000/µL : RV ≈ 28 ; mais 30–50 % des arthrites septiques sont sous 50 000 et le Gram n'est positif qu'une fois sur 5", src: "Margaretten et coll., 2007, JAMA" },
        { t: "Ne jamais infiltrer de corticoïde tant que l'infection n'est pas exclue", src: "Gardner et coll., 2025, NEJM" }];
      if (L.oui("fievre") && (inflam || epanch)) return { niveau: "urgence", titre: "Arthrite septique à éliminer", ro: "arthrite septique", texte: `Fièvre avec ${articulation} enflé ou chaud. La fièvre manque chez près de la moitié des arthrites septiques.`,
        conduite: [{ t: "Transfert le jour même (urgence) : drainage articulaire et antibiotiques IV" }, ...conduite] };
      if (inflam && epanch) return { niveau: risque ? "urgence" : "rapide", titre: "Arthrite septique ou microcristalline à éliminer", ro: "arthrite septique", texte: `Articulation enflée et chaude${risque ? ", avec un facteur de risque d'infection" : ""}. L'absence de fièvre n'exclut pas l'infection (fièvre chez 57 %).`,
        conduite: [{ t: "Ponction articulaire le jour même" }, ...conduite] };
      return null;
    },
  };
  /* Mesures générales communes (aide-mémoire de première ligne, Québec : document OpenEvidence du 21 novembre 2026, parties F et H). */
  const adulte = L => L.age === null || L.age >= 18, enfant = L => L.age !== null && L.age < 18;
  C.mesures = {
    analgesie: [
      { t: "Acétaminophène 650–1000 mg q6h PRN (max 4 g/j ; 3 g/j si usage prolongé ou fragilité)", si: adulte },
      { t: "AINS en cure courte : ibuprofène 400 mg q6–8h PRN (max 2400 mg/j sur ordonnance) ou naproxène 250–500 mg BID (max 1000 mg/j)", si: adulte, src: "Kermond et coll., 2002, Ann Emerg Med (PMID 12192353) ; FitzGerald, 2025, Ann Intern Med" },
      { t: "Diclofénac topique (gel 1,16 % 2–4 g TID–QID ou 2,32 % BID) sur une articulation superficielle", si: adulte, src: "Bannuru et coll., 2019, OARSI (PMID 31278997)" },
      { t: "Ibuprofène 10 mg/kg q6–8h (max 400 mg/dose et 40 mg/kg/j), premier choix ; l'ajout d'acétaminophène ou d'un opioïde n'améliore pas le soulagement", si: enfant, src: "Kermond et coll., 2002, Ann Emerg Med (PMID 12192353)" },
      { t: "Acétaminophène 15 mg/kg q4–6h (max 75 mg/kg/j) si AINS contre-indiqué", si: enfant },
      { t: "AINS : éviter si DFGe < 30, cirrhose, grossesse ≥ 20 sem, anticoagulation, maladie cardiovasculaire ou fragilité (oraux) ; prudence ≥ 65 ans (IPP ou coxib si risque digestif)" }],
    charge: { t: "Dosage de la charge : activité permise si la douleur reste ≤ 3/10 et ne persiste pas après l'effort (chez l'adolescent, viser ≤ 2/10)", src: "Silbernagel et coll., 2007 (modèle de monitorage de la douleur)" },
  };
  /* Aide-mémoire de première ligne (Québec), fichier locomoteur/<région>/aide-memoire-<région>.js produit depuis le document
     OpenEvidence. liens : { diagnostic: numéro de fiche, [numéros] ou « clé:numéro » (ex. « main:7 ») }. */
  const fiche = (cle, ref) => {
    const [c, n] = String(ref).includes(":") ? String(ref).split(":") : [cle, String(ref)];
    const A = (window.Locomoteur.aideMemoire || {})[c], f = A && A.fiches[n];
    if (!f) throw new Error(`Fiche introuvable dans l'aide-mémoire : ${c} ${n}`);
    return { f, A };
  };
  C.aideMemoire = (cle, liens) => Object.fromEntries(Object.entries(liens).map(([dx, refs]) => [dx, [].concat(refs).flatMap(ref => {
    const { f, A } = fiche(cle, ref), src = f.src || `Aide-mémoire de première ligne (Québec), document OpenEvidence${A.sources ? " ; " + A.sources.replace(/^Sources principales : /, "") : ""}`;
    return f.items.map(t => ({ t: f.principes ? `${t} (principes généraux, sans recommandation spécifique)` : t, src }));
  })]));
  C.ficheAideMemoire = (cle, ref) => fiche(cle, ref).f;
  // Bloc commun de l'aide-mémoire → mesures générales (sans la ligne « † »).
  C.mesuresAideMemoire = (cle, titre = "Bloc commun (aide-mémoire, Québec)") => {
    const A = (window.Locomoteur.aideMemoire || {})[cle];
    return A && A.commun.length ? [{ titre, items: A.commun.filter(t => !/^†/.test(t)).map(t => ({ t })) }] : [];
  };
  /* Questions communes à toutes les plaintes d'une consultation (même réponse pour chaque région) et section où elles
     s'affichent. Les investigations et le plan sont communs en entier ; les autres questions sont propres à chaque plainte. */
  C.PARTAGES = {
    identification: ["visite", "sexe", "age", "accompagne", "refere", "lateralite", "administratif"],
    hdv: ["travail", "travail_precision", "sport", "sport_precision", "tabac", "alcool_drogues"],
    atcd: ["atcd_nil", "atcd_msk", "atcd_medicaux", "obesite", "diabete", "osteoporose", "fluoro_cortico", "rx", "atcd_autres", "atcd_familiaux", "atcd_rhumato"],
    drapeaux: ["fievre", "sympt_generaux", "atcd_cancer"],
    fonctionnel: ["posture", "arches", "demarche", "talons_pointes", "trendelenburg", "squat_bi", "duck_walk", "squat_uni", "appui_uni", "saut_bi", "saut_uni", "pointe_uni"],
  };
  window.Locomoteur.commun = C;
})();
