/* Locomoteur Morand (prototype) : moteur commun à toutes les articulations.
   Un fichier de données par articulation (locomoteur/genou/donnees-genou.js) décrit les questions, les diagnostics et
   les poids ; ce moteur calcule les probabilités, les alertes et la note. Rien n'est transmis ni conservé.

   Calcul (pour chaque diagnostic, indépendamment des autres : un patient peut en avoir deux) :
     cote de départ = probabilité selon l'âge exact (interpolée entre les points du fichier) × multiplicateur du sexe ;
     chaque réponse multiplie la cote par son rapport de vraisemblance (RV), tiré de la sensibilité et de la spécificité
     quand elles sont connues (RV+ = Se / (1 − Sp), RV− = (1 − Se) / Sp) ;
     une réponse vide ou « ? » ne compte pas.
   Tests qui se recoupent (même « groupe », ex. McMurray, Thessaly et interligne pour le ménisque) : on ne garde que le
   plus fort en faveur et le plus fort en défaveur, pour ne pas compter deux fois la même information.
   Fourchette : le même calcul avec des poids 30 % plus faibles ou plus forts et une cote de départ divisée ou
   multipliée par 1,5 ; elle montre la marge d'incertitude des poids, pas un intervalle de confiance.

   Statut de chaque poids : « provisoire » (estimation clinique, aucune source), « a_verifier » (valeur publiée de
   mémoire, avec une piste), « verifie » (confirmé dans l'article), « valide » (approuvé par le clinicien). */
(function (racine) {
  "use strict";

  const STATUTS = { provisoire: "Provisoire", a_verifier: "À vérifier", verifie: "Vérifié", valide: "Validé" };
  const CATEGORIES = [[0.8, "Très probable", "tres"], [0.5, "Probable", "probable"], [0.2, "Possible", "possible"], [0.05, "Peu probable", "peu"], [0, "Très peu probable", "infime"]];
  const NIVEAUX = { urgence: 0, rapide: 1, considerer: 2, info: 3 };
  const logit = p => Math.log(p / (1 - p));
  const sigm = x => 1 / (1 + Math.exp(-x));
  const borne = p => Math.min(0.995, Math.max(0.0005, p));
  const vide = v => v === undefined || v === null || v === "" || v === "?" || (Array.isArray(v) && v.length === 0);

  /* ---------- Outils pour écrire les fichiers de données ---------- */
  // p(RV si oui, RV si non) : estimation provisoire. lit(Se, Sp, piste) : valeur publiée à vérifier. est(RV+, RV−, piste) : RV publiés à vérifier.
  const p = (rvp, rvn, extra) => ({ rvp, rvn, ...extra });
  const lit = (se, sp, piste, extra) => ({ se, sp, piste, statut: "a_verifier", ...extra });
  const est = (rvp, rvn, piste, extra) => ({ rvp, rvn, piste, statut: "a_verifier", ...extra });
  const o = (v, l, rv, extra) => ({ v, l, rv: rv || {}, ...extra });       // option d'un choix : RV par diagnostic
  const m = (v, l, e, extra) => ({ v, l, e: e || {}, ...extra });          // option d'une liste à cocher : effets oui / non
  const binaires = (effets, g) => (Array.isArray(effets) ? effets.map(e => ({ g, ...e })) : Object.entries(effets || {}).map(([dx, e]) => ({ g, ...e, dx })));
  function ouiNon(id, libelle, opts = {}) { const { effets, g, ...reste } = opts; return { id, type: "oui_non", libelle, ...reste, effets: binaires(effets, g) }; }
  function choix(id, libelle, options, opts = {}) {
    const { effets, g, ...reste } = opts, parDx = {};
    for (const op of options) for (const [dx, rv] of Object.entries(op.rv)) (parDx[dx] = parDx[dx] || {})[op.v] = rv;
    const liste = Object.entries(parDx).map(([dx, rv]) => ({ g, ...(opts.statuts && opts.statuts[dx]), dx, rv }));
    return { id, type: "choix", libelle, options, ...reste, effets: [...liste, ...binaires(effets, g)] };
  }
  function multi(id, libelle, options, opts = {}) {
    const { g, ...reste } = opts, effets = [];
    for (const op of options) for (const [dx, e] of Object.entries(op.e)) effets.push({ g, ...e, dx, opt: op.v });
    return { id, type: "multi", libelle, options, ...reste, effets };
  }
  const nombre = (id, libelle, opts = {}) => ({ id, type: "nombre", libelle, effets: [], ...opts });
  const texte = (id, libelle, opts = {}) => ({ id, type: "texte", libelle, effets: [], ...opts });
  const caseQ = (id, libelle, opts = {}) => ({ id, type: "case", libelle, effets: [], ...opts });   // case à cocher (plan)
  // Miroir : reprend la réponse d'une autre question (ex. palpation de la tête du péroné dans la règle d'Ottawa) ; répondre ici répond là-bas.
  const miroir = (id, cible, libelle, opts = {}) => ({ id, type: "miroir", cible, libelle, effets: [], ...opts });

  /* Milieu de consultation (point 5 de l'audit) : ajuste la fréquence de départ, pour toutes les régions. À l'urgence,
     plus de traumatismes et d'atteintes graves, moins d'atteintes dégénératives ; en clinique de médecine du sport, plus de
     lésions sportives. Multiplicateurs provisoires, appliqués par famille de diagnostics (identifiants). */
  const TRAUMA = /fracture|fx_|luxation|rupture|lisfranc|perilunaire|scaphoide|avulsion|contusion|entorse|^lca$|^lcp$|collat|syndesmose|deltoide|hamatum|jersey|maillet|^ff_/;
  const DEGEN = /arthrose|stenose|spondylolisthesis|discogenique|dupuytren|scoliose|myelopathie|ressaut|canal_carpien|kienbock|^ppr$/;
  const SPORT = /tendino|^sfp$|menisque|instab|apophys|osgood|^slj$|sever|lanceur|adducteurs|^ij_|stinger|poulie|periostite|loge|slap|epi_lat|epi_med|^lcu$|^cfa$|osteite|parietale|psoas|^bit$|achille|insertion|fasciite|gymnaste|conflit|musculaire|dyskinesie|calcifiante|sous_acro|spondylolyse|turf_toe|iselin/;
  function milieu(d) {
    const urgence = {}, sport = {};
    for (const x of d.diagnostics) {
      const t = TRAUMA.test(x.id), g = !!x.grave, dg = DEGEN.test(x.id), sp = SPORT.test(x.id) && !t;
      let u = 1, s = 1;
      if (t) { u *= 2; s *= 1.2; }
      if (g && !t) { u *= 2; s *= 0.6; }
      if (dg) { u *= 0.6; s *= 0.6; }
      if (sp) { u *= 0.8; s *= 1.5; }
      if (u !== 1) urgence[x.id] = +u.toFixed(2);
      if (s !== 1) sport[x.id] = +s.toFixed(2);
    }
    return choix("milieu", "Milieu de consultation", [o("bureau", "Bureau ou GMF", {}, { n: "" }), o("urgence", "Urgence", urgence, { n: "" }), o("sport", "Clinique de médecine du sport", sport, { n: "" })],
      { info: "Ajuste la fréquence de départ : à l'urgence, traumatismes et atteintes graves deux fois plus fréquents, atteintes dégénératives moins fréquentes ; en clinique de médecine du sport, lésions sportives plus fréquentes. Multiplicateurs provisoires. Au bureau, aucun ajustement." });
  }

  /* Prépare un fichier de données : index, clés des poids, statut par défaut. Arrête tout si un diagnostic est inconnu. */
  function definir(d) {
    d.parDx = Object.fromEntries(d.diagnostics.map(x => [x.id, x]));
    d.compat = new Set();
    for (const [a, b] of d.compatibles || []) {
      if (!d.parDx[a] || !d.parDx[b]) throw new Error(`Diagnostic inconnu dans « compatibles » : ${a}, ${b}`);
      d.compat.add(`${a}|${b}`); d.compat.add(`${b}|${a}`);
    }
    const ident = d.sections.find(s => s.id === "identification");
    if (ident && !ident.blocs.some(b => b.questions.some(q => q.id === "milieu"))) {
      const qs = ident.blocs[0].questions, i = qs.findIndex(q => q.id === "age");
      qs.splice(i + 1, 0, milieu(d));
    }
    d.questions = []; d.parQ = {};
    for (const s of d.sections) for (const b of s.blocs) for (const q of b.questions) {
      if (d.parQ[q.id]) throw new Error(`Question en double : ${q.id}`);
      q.section = s; q.bloc = b; d.questions.push(q); d.parQ[q.id] = q;
      for (const e of q.effets) {
        if (!d.parDx[e.dx]) throw new Error(`Diagnostic inconnu « ${e.dx} » dans ${q.id}`);
        e.statut = e.statut || "provisoire"; e.cle = `${q.id}${e.opt ? "." + e.opt : ""}>${e.dx}`; e.q = q;
      }
    }
    for (const q of d.questions) if (q.type === "miroir" && !d.parQ[q.cible]) throw new Error(`Miroir sans cible : ${q.id} → ${q.cible}`);
    /* Grappes : combinaison validée d'éléments (ex. Décary : pivot + pop pour le LCA). Quand elle s'applique, son RV
       remplace celui des éléments qu'elle couvre (questions ou groupes « g »), pour ne pas les compter deux fois. */
    for (const g of d.grappes || []) {
      if (!d.parDx[g.dx]) throw new Error(`Diagnostic inconnu dans la grappe ${g.id}`);
      for (const k of g.couvre) if (!d.parQ[k] && !d.questions.some(q => q.effets.some(e => e.g === k))) throw new Error(`Grappe ${g.id} : « ${k} » n'est ni une question ni un groupe`);
      g.statut = g.statut || "provisoire"; g.cle = `grappe:${g.id}>${g.dx}`; g.grappe = true;
    }
    /* Revues (réponses d'OpenEvidence) : clé du générateur de consignes (« dx|question|valeur » pour un RV par réponse,
       « dx|clé du poids » sinon, « grappe|id »). Une valeur publiée remplace l'estimation, avec sa source ; sinon, la
       remarque (« aucune donnée publiée ») s'affiche dans Sources et limites. Le statut d'avant reste noté. */
    for (const r of d.revues || []) {
      const [dx, a, b] = r.cle.split("|");
      const e = dx === "grappe" ? (d.grappes || []).find(g => g.id === a)
        : b !== undefined ? ((d.parQ[a] || {}).effets || []).find(x => x.dx === dx && x.rv && b in x.rv)
        : d.questions.flatMap(q => q.effets).find(x => x.dx === dx && x.cle === a);
      if (!e) throw new Error(`Revue ${r.code} : élément introuvable (${r.cle})`);
      e.statutAvantRevue = e.statutAvantRevue || e.statut;
      e.avantRevue = e.avantRevue || { rv: e.rv ? { ...e.rv } : undefined, rvp: e.rvp, rvn: e.rvn, se: e.se, sp: e.sp };
      if (r.rv) Object.assign(e.rv, r.rv);
      if (r.se !== undefined) { e.se = r.se; e.sp = r.sp; delete e.rvp; delete e.rvn; }
      if (r.rvp !== undefined) { e.rvp = r.rvp; e.rvn = r.rvn; delete e.se; delete e.sp; }
      if (r.statut) e.statut = r.statut;
      if (r.piste) e.piste = r.piste;
      e.revue = r.note || "";
      e.codesRevue = [...(e.codesRevue || []), r.code];
    }
    if (d.residuel) { if (d.parDx[d.residuel.id]) throw new Error(`Reste en double : ${d.residuel.id}`); d.residuel.residuel = true; }
    for (const [id, en] of Object.entries(d.anglais || {})) { if (!d.parDx[id]) throw new Error(`Nom anglais pour un diagnostic inconnu : ${id}`); d.parDx[id].en = en; }
    for (const [id, c] of Object.entries(d.conduites || {})) { if (!d.parDx[id]) throw new Error(`Conduite pour un diagnostic inconnu : ${id}`); d.parDx[id].conduite = c; }
    // « infos » : textes du bouton « i » (pourquoi, comment, positif si, vidéo), tenus à part des questions.
    for (const [id, x] of Object.entries(d.infos || {})) { if (!d.parQ[id]) throw new Error(`Info pour une question inconnue : ${id}`); Object.assign(d.parQ[id], x); }
    (racine.Locomoteur.donnees = racine.Locomoteur.donnees || {})[d.id] = d;
    return d;
  }

  /* ---------- Lecture des réponses ---------- */
  function lecteur(rep) {
    const v = id => (vide(rep[id]) ? null : rep[id]);
    const age = () => { const x = v("age"); const n = x === null ? NaN : Number(x); return Number.isFinite(n) ? n : null; };
    return {
      v, age: age(), sexe: v("sexe"),
      oui: id => v(id) === "oui", non: id => v(id) === "non", repondu: id => v(id) !== null,
      dans: (id, liste) => liste.includes(v(id)),
      a: (id, opt) => Array.isArray(rep[id]) && rep[id].includes(opt),
      aucun: id => Array.isArray(rep[id]) && rep[id].some(x => x === "aucun"),
      trauma: () => v("apparition") === "subit_trauma",
    };
  }
  function visibles(d, rep) {
    const L = lecteur(rep), vus = new Set();
    for (const q of d.questions) if ((!q.bloc.si || q.bloc.si(L)) && (!q.si || q.si(L))) vus.add(q.id);
    return vus;
  }
  // Valeur d'une option de liste à cocher : « oui » si cochée ; « non » si une autre est cochée (ou « Aucun »).
  function valeurOption(q, val, opt) {
    if (!Array.isArray(val) || !val.length) return null;
    if (val.includes(opt)) return "oui";
    return "non";
  }
  function rvDe(e, r) {
    if (e.rv) return e.rv[r] === undefined ? null : e.rv[r];
    const pos = e.pos || ["oui"], neg = e.neg || ["non"];
    if (pos.includes(r)) return e.se !== undefined ? e.se / Math.max(0.01, 1 - e.sp) : (e.rvp === undefined ? null : e.rvp);
    if (neg.includes(r)) return e.se !== undefined ? Math.max(0.01, 1 - e.se) / e.sp : (e.rvn === undefined ? null : e.rvn);
    return null;
  }
  // RV+ et RV− d'un poids, pour le tableau des sources.
  function rvPosNeg(e) {
    if (e.rv) return null;
    if (e.se !== undefined) return [e.se / Math.max(0.01, 1 - e.sp), Math.max(0.01, 1 - e.se) / e.sp];   // Se ou Sp de 100 % : plafonnées à 99 %
    return [e.rvp, e.rvn];
  }
  const etiquettes = q => q.labels || q.bloc.labels || ["Oui", "Non"];
  function libelleOption(q, v) {
    if (q.type === "oui_non") return v === "oui" ? etiquettes(q)[0] : v === "non" ? etiquettes(q)[1] : v;
    const op = (q.options || []).find(x => x.v === v); return op ? op.l : v;
  }
  function libelleReponse(q, e, r) {
    if (q.type === "multi") { const op = q.options.find(x => x.v === e.opt); return `${op.l} : ${r === "oui" ? "oui" : "non"}`; }
    return `${q.libelle} : ${libelleOption(q, r).toLowerCase()}`;
  }

  function baseDe(x, age) {
    const pts = x.base, a = age === null ? 40 : age;
    if (a <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) if (a <= pts[i][0]) {
      const [a0, p0] = pts[i - 1], [a1, p1] = pts[i], t = (a - a0) / (a1 - a0);
      return sigm(logit(borne(p0)) + t * (logit(borne(p1)) - logit(borne(p0))));
    }
    return pts[pts.length - 1][1];
  }
  const categorie = pr => CATEGORIES.find(c => pr >= c[0]);

  /* Concurrence entre diagnostics. Deux diagnostics qui coexistent rarement (ex. LCA et luxation de la rotule) se
     disputent les mêmes éléments : celui qui a la plus forte cote « explique » ces éléments, et l'autre baisse.
     Ceux du fichier « compatibles » (ex. LCA, ménisque et collatéral) peuvent coexister et ne se font pas concurrence.
     Du plus fort au plus faible : p = cote / (1 + cote + somme des cotes ajustées des concurrents plus forts). */
  function concurrence(d, cotes) {
    const ordre = Object.keys(cotes).sort((a, b) => cotes[b] - cotes[a]), adj = {}, p = {}, par = {};
    for (const id of ordre) {
      let s = 0, fort = null;
      for (const j of ordre) {
        if (j === id) break;
        if (d.compat.has(`${id}|${j}`)) continue;
        s += adj[j]; if (!fort || adj[j] > adj[fort]) fort = j;
      }
      const seul = cotes[id] / (1 + cotes[id]);
      p[id] = cotes[id] / (1 + cotes[id] + s); adj[id] = p[id] / (1 - p[id]);
      if (fort && p[id] < seul / 2 && seul - p[id] > 0.1) par[id] = fort;
    }
    return { p, par };
  }

  /* ---------- Calcul ---------- */
  function calculer(d, brutes) {
    const vus = visibles(d, brutes), rep = {};
    for (const id of vus) if (!vide(brutes[id])) rep[id] = brutes[id];
    const L = lecteur(rep);
    const etats = d.diagnostics.map(x => {
      const p0 = borne(baseDe(x, L.age)), fs = L.sexe && x.sexe && x.sexe[L.sexe] ? x.sexe[L.sexe] : 1;
      return { x, lo: logit(p0) + Math.log(fs), p0, fs, groupes: new Map() };
    });
    const parId = Object.fromEntries(etats.map(z => [z.x.id, z]));
    for (const q of d.questions) {
      if (!(q.id in rep)) continue;
      for (const e of q.effets) {
        const r = q.type === "multi" ? valeurOption(q, rep[q.id], e.opt) : rep[q.id];
        if (r === null) continue;
        const rv = rvDe(e, r);
        if (rv === null || !(rv > 0) || rv === 1) continue;
        const z = parId[e.dx], cle = e.g || e.cle, l = Math.log(rv);
        const gr = z.groupes.get(cle) || { pos: null, neg: null };
        const c = { e, q, r, rv, l, libelle: libelleReponse(q, e, r) };
        if (l > 0) { if (!gr.pos || l > gr.pos.l) gr.pos = c; } else if (!gr.neg || l < gr.neg.l) gr.neg = c;
        z.groupes.set(cle, gr);
      }
    }
    for (const z of etats) {
      z.comptes = [];
      for (const gr of z.groupes.values()) { if (gr.pos) z.comptes.push(gr.pos); if (gr.neg) z.comptes.push(gr.neg); }
      // Grappes actives, de la plus forte à la plus faible ; une grappe dont un élément est déjà pris par une autre est ignorée.
      const actives = (d.grappes || []).filter(g => g.dx === z.x.id && g.si(L)).sort((a, b) => Math.abs(Math.log(b.rv)) - Math.abs(Math.log(a.rv)));
      const pris = new Set();
      for (const g of actives) {
        if (g.couvre.some(k => pris.has(k))) continue;
        const couverts = c => c.q && (g.couvre.includes(c.q.id) || (c.e.g && g.couvre.includes(c.e.g)));
        z.comptes = z.comptes.filter(c => !couverts(c));
        z.comptes.push({ e: g, q: null, r: null, rv: g.rv, l: Math.log(g.rv), libelle: g.nom, grappe: true });
        for (const k of g.couvre) pris.add(k);
      }
      z.somme = z.comptes.reduce((s, c) => s + c.l, 0);
      z.comptes.sort((a, b) => Math.abs(b.l) - Math.abs(a.l));
    }
    const scenario = (k, b) => concurrence(d, Object.fromEntries(etats.map(z => [z.x.id, Math.exp(z.lo + b + k * z.somme)])));
    const centre = scenario(1, 0), depart = concurrence(d, Object.fromEntries(etats.map(z => [z.x.id, Math.exp(z.lo)])));
    const extremes = [];
    for (const k of [0.7, 1.3]) for (const b of [-Math.log(1.5), Math.log(1.5)]) extremes.push(scenario(k, b));
    const diagnostics = etats.map(z => {
      const id = z.x.id, pr = centre.p[id], vals = extremes.map(s => s.p[id]);
      return { id, x: z.x, p: pr, bas: Math.min(pr, ...vals), haut: Math.max(pr, ...vals), categorie: categorie(pr), seul: sigm(z.lo + z.somme),
        explique: centre.par[id] ? d.parDx[centre.par[id]] : null, depart: depart.p[id], p0: z.p0, fs: z.fs, comptes: z.comptes,
        provisoires: z.comptes.filter(c => c.e.statut === "provisoire").length };
    });
    /* Reste : « douleur non spécifique », probabilité qu'aucun diagnostic de la liste ne soit en cause, soit le produit des
       (1 − p). Il monte quand les éléments spécifiques sont absents ou négatifs. Affiché après 6 réponses qui comptent. */
    const comptees = Object.keys(rep).filter(k => d.parQ[k] && d.parQ[k].effets.length).length;
    if (d.residuel && comptees >= 6) {
      const reste = s => d.diagnostics.reduce((t, x) => t * (1 - s.p[x.id]), 1), pr = reste(centre), vals = extremes.map(reste);
      diagnostics.push({ id: d.residuel.id, x: d.residuel, p: pr, bas: Math.min(pr, ...vals), haut: Math.max(pr, ...vals), categorie: categorie(pr), seul: pr,
        explique: null, depart: reste(depart), p0: null, fs: 1, comptes: [], provisoires: 0, residuel: true });
    }
    diagnostics.sort((a, b) => b.p - a.p);
    const alertes = [];
    for (const regle of d.regles || []) {
      const a = regle(L, rep);
      if (a) for (const x of [].concat(a)) alertes.push(x);
    }
    alertes.sort((a, b) => NIVEAUX[a.niveau] - NIVEAUX[b.niveau]);
    // Conduite : éléments { t: action, src: source } ; les mesures générales dépendent du contexte (blessure récente, surcharge, tous).
    const item = c => (typeof c === "string" ? { t: c } : c);
    const garder = c => typeof c === "string" || !c.si || c.si(L);
    const conduite = diagnostics.filter((x, i) => x.p >= 0.25 || (i === 0 && x.p >= 0.1)).map(x => ({
      dx: x, items: (x.x.conduite || []).filter(garder).map(item), liens: x.x.liens || [] }));
    const mesures = (d.mesures || []).filter(g => !g.si || g.si(L)).map(g => ({ titre: g.titre, items: g.items.filter(garder).map(item) }));
    return { rep, L, vus, diagnostics, alertes, conduite, mesures, saisies: Object.keys(rep).length };
  }

  /* ---------- Note pour le dossier (texte brut, à coller dans le DMÉ) ----------
     Format des notes de clinique locomotrice : IDENTIFICATION, RAISON DE CONSULTATION, ANTÉCÉDENTS, HMA (ou ÉVOLUTION
     DEPUIS LA DERNIÈRE VISITE), EXAMEN PHYSIQUE (fonctionnel, puis le module de la région : côté atteint, une puce par
     ligne, chaque élément suivi de son résultat), INVESTIGATIONS, IMPRESSION DIAGNOSTIQUE, PLAN. Titres en majuscules,
     puces « - », style télégraphique ; une section vide disparaît, sauf EXAMEN PHYSIQUE.
     Section du fichier de données : note = id, atcd, hma, examen, inv ou plan. Bloc d'examen : tete (fonctionnel, une
     ligne « Clé : valeur » par élément), ligne (préfixe de la puce ; false = sans préfixe), adjacent (dépistage adjacent),
     fin (côté controlatéral). Élément : court (nom), genre (m, f, mp, fp), oui et non (phrases), nie (nom pour « Pas de »),
     gabarit (« {v}/10 au repos »), option n (« {court} normal et indolore », « limitée{deg} avec douleur »). */
  const maj = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
  const minu = s => (s && /^[A-ZÀ-Ý][a-zà-ÿ]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
  const VOCAB = {
    palp: { pos: ["douloureux", "douloureuse", "douloureux", "douloureuses"], neg: ["indolore", "indolore", "indolores", "indolores"] },
    test: { pos: ["positif", "positive", "positifs", "positives"], neg: ["négatif", "négative", "négatifs", "négatives"] },
    rrom: { pos: ["douloureux", "douloureuse", "douloureux", "douloureuses"], neg: ["indolore", "indolore", "indolores", "indolores"] },
    pres: { pos: ["présent", "présente", "présents", "présentes"], neg: ["absent", "absente", "absents", "absentes"] },
    oui: { pos: ["oui", "oui", "oui", "oui"], neg: ["non", "non", "non", "non"] },
  };
  const GENRE = { m: 0, f: 1, mp: 2, fp: 3 };
  const et = a => (a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} et ${a[a.length - 1]}`);
  const pasDe = a => (a.length ? `${/^[aeiouyéèêàâîïôûœh]/i.test(a[0]) ? "Pas d'" : "Pas de "}${a.length < 2 ? a[0] : `${a.slice(0, -1).join(", ")} ni ${a[a.length - 1]}`}` : "");
  const lignes = v => String(v).split(/\r?\n/).map(x => x.trim().replace(/^[-•]\s*/, "")).filter(Boolean);
  // Texte d'un élément répondu (sans majuscule initiale ; null si l'élément ne s'écrit pas seul).
  function element(q, v, rep, d) {
    const court = q.court || q.libelle.toLowerCase();
    if (q.type === "case") return v === "oui" ? (q.n || q.libelle) : null;
    if (q.type === "nombre") return q.gabarit ? q.gabarit.replace("{v}", v) : `${court} ${v}${q.unite ? (/^[/°]/.test(q.unite) ? "" : " ") + q.unite : ""}`;
    if (q.type === "texte") return q.gabarit ? q.gabarit.replace("{v}", minu(String(v).trim())) : String(v).trim();
    if (q.type === "multi") {
      const ops = v.map(x => q.options.find(o2 => o2.v === x)).filter(Boolean);
      if (ops.some(op => op.exclusif)) return q.aucun || `${court} : aucun`;
      const noms = ops.map(op => (op.n || op.l.toLowerCase())), t = q.joint ? noms.join(q.joint) : et(noms);
      return q.gabarit ? q.gabarit.replace("{v}", t) : `${court} : ${t}`;
    }
    if (q.type === "oui_non") {
      if (v === "equivoque") return `${court} équivoque`;
      if (v === "oui" && q.oui) return q.oui;
      if (v === "non" && q.non) return q.non;
      const res = q.res || q.bloc.res;
      if (res && VOCAB[res]) return `${court} ${VOCAB[res][v === "oui" ? "pos" : "neg"][GENRE[q.genre || "m"]]}`;
      return null;
    }
    const op = q.options.find(x => x.v === v);
    if (!op) return null;
    let t = op.n !== undefined ? op.n : `${court} : ${op.l.toLowerCase()}`;
    const dq = q.degres && d.parQ[q.degres], dv = dq && rep[q.degres];
    const cq = d.parQ.cote, co = cq && rep.cote ? cq.options.find(x => x.v === rep.cote) : null;
    t = t.replace("{court}", court).replace("{deg}", dv ? " " + (dq.gabarit || "à ~{v}°").replace("{v}", dv) : "")
      .replace("{cote}", co && co.abr !== "bilat" ? ` ${co.abr}` : "").replace(/{e}/g, rep.sexe === "F" ? "e" : "").replace(/{ne}/g, rep.sexe === "F" ? "ne" : "");
    return t;
  }
  /* Sections de la note d'une région, avant assemblage : la note d'une consultation à plusieurs plaintes réunit celles de
     chaque région (identification, antécédents et plan communs ; HMA, examen et impression par plainte). */
  function sectionsNote(d, res) {
    const { rep, L, diagnostics, alertes } = res, S = {}, fem = L.sexe === "F";
    const sections = cle => d.sections.filter(s => s.note === cle);
    const repondues = b => b.questions.filter(q => q.id in rep);
    const el = q => element(q, rep[q.id], rep, d);
    const cq = d.parQ.cote, co = cq && rep.cote ? cq.options.find(x => x.v === rep.cote) : null, abr = co ? ` ${co.abr}` : "";
    const suivi = rep.visite === "suivi";
    const titre = (t, contenu) => { S[t] = contenu; };
    S.suivi = suivi;

    // IDENTIFICATION : « Femme de 23 ans, artiste peintre, rencontrée avec sa mère » sur une seule ligne, puis le reste.
    const id = [], mineur = L.age !== null && L.age < 18;
    const qui = L.sexe === "F" ? (mineur ? "Fille" : "Femme") : L.sexe === "M" ? (mineur ? "Garçon" : "Homme") : "Patient";
    const tq = d.parQ.travail, top = tq && rep.travail ? tq.options.find(o2 => o2.v === rep.travail) : null;
    const occupation = rep.travail_precision ? minu(String(rep.travail_precision).trim()) : top && top.n ? top.n.replace("{e}", fem ? "e" : "") : null;
    id.push(`- ${[`${qui}${L.age !== null ? ` de ${L.age} ans` : ""}`, occupation, rep.accompagne ? `rencontré${fem ? "e" : ""} avec ${minu(String(rep.accompagne).trim())}` : null].filter(Boolean).join(", ")}`);
    for (const s of sections("id")) for (const b of s.blocs) for (const q of repondues(b)) {
      if (["visite", "sexe", "age", "cote", "accompagne", "travail", "travail_precision"].includes(q.id) || q.precise) continue;
      const v = rep[q.id];
      if (q.id === "lateralite") { id.push(`- ${q.libelle} : ${{ D: fem ? "droitière" : "droitier", G: fem ? "gauchère" : "gaucher", A: "ambidextre" }[v]}`); continue; }
      if (q.precision && rep[q.precision]) { id.push(`- ${q.court || q.libelle} : ${minu(String(rep[q.precision]).trim())}`); continue; }
      if (q.type === "oui_non") { if (v === "oui") id.push(`- ${maj(q.oui || q.court || q.libelle)}`); continue; }
      const t = el(q); if (t) id.push(`- ${q.type === "texte" && !q.gabarit ? `${q.court || q.libelle} : ${minu(t)}` : maj(t)}`);
    }
    for (const q of d.questions.filter(x => x.precise && x.id in rep && x.section.note === "id" && x.id !== "travail_precision")) {
      const parent = d.questions.find(x => x.precision === q.id);
      if (!parent || !(parent.id in rep)) id.push(`- ${q.court || q.libelle} : ${minu(String(rep[q.id]).trim())}`);
    }
    titre("IDENTIFICATION", id);

    // RAISON DE CONSULTATION
    const duree = d.parQ.duree && rep.duree ? (d.parQ.duree.options.find(o2 => o2.v === rep.duree) || {}).depuis : null;
    const rc = `${co && co.rc ? co.rc : d.rc + abr}${L.trauma() ? " post-traumatique" : ""}${rep.depuis ? ` depuis ${String(rep.depuis).trim()}` : duree ? ` ${duree}` : ""}`;
    titre("RAISON DE CONSULTATION", [suivi ? `Suivi – ${minu(rc)}` : rc]);

    // ANTÉCÉDENTS
    const atcd = [], nie = [];
    const muet = q => q.type === "oui_non" && rep[q.id] === "non" && q.non === "";
    for (const s of sections("atcd")) for (const b of s.blocs) for (const q of repondues(b)) {
      const v = rep[q.id];
      if (muet(q)) continue;
      if (q.type === "oui_non" && v === "non" && !q.non) { nie.push(q.nie || q.court || q.libelle.toLowerCase()); continue; }
      if (q.type === "texte") { for (const x of lignes(v)) atcd.push(`- ${q.gabarit ? q.gabarit.replace("{v}", minu(x)) : maj(x)}`); continue; }
      const t = el(q) || (v === "oui" ? (q.court || q.libelle) : null); if (t) atcd.push(`- ${maj(t)}`);
    }
    if (nie.length) atcd.push(`- ${pasDe(nie.map(x => `ATCD de ${x}`))}`);
    titre("ANTÉCÉDENTS", atcd);

    // HMA (ou évolution) : une puce par bloc, éléments liés ensemble ; négatifs pertinents à la fin.
    const hma = [], negLocal = [], negDrapeaux = [];
    for (const s of sections("hma")) for (const b of s.blocs) {
      const morceaux = [], agg = [], aggNon = [], negIci = [];
      for (const q of repondues(b)) {
        const v = rep[q.id];
        if (q.type === "oui_non" && v === "non" && q.aggNie) { aggNon.push(q.aggNie); continue; }
        if (muet(q) || (q.masqueSi && rep[q.masqueSi])) continue;
        if (q.type === "oui_non" && v === "non" && !q.non) { (b.negInline ? negIci : q.drapeau || b.drapeaux ? negDrapeaux : negLocal).push(q.nie || q.court || q.libelle.toLowerCase()); continue; }
        if (q.type === "oui_non" && v === "oui" && q.agg) { if (!agg.length) morceaux.push("{agg}"); agg.push(q.agg); continue; }
        if (q.type === "oui_non" && v === "oui" && !q.oui) { morceaux.push(q.court || q.libelle.toLowerCase()); continue; }
        if (q.type === "texte" && b.texteSepare) { for (const x of lignes(v)) hma.push(`- ${maj(x)}`); continue; }
        const t = el(q); if (!t) continue;
        if (q.colle && morceaux.length) morceaux[morceaux.length - 1] += ` ${minu(t)}`; else morceaux.push(minu(t));
      }
      if (agg.length) morceaux[morceaux.indexOf("{agg}")] = `augmentée par ${et(agg)}`;
      if (negIci.length) morceaux.push(minu(pasDe(negIci)));
      if (morceaux.length) hma.push(`- ${maj(morceaux.join(b.sep || ", "))}`);
      if (aggNon.length) hma.push(`- Pas de douleur ${aggNon.length < 2 ? aggNon[0] : `${aggNon.slice(0, -1).join(", ")} ni ${aggNon[aggNon.length - 1]}`}`);
    }
    if (negLocal.length) hma.push(`- ${pasDe(negLocal)}`);
    if (negDrapeaux.length) hma.push(`- ${pasDe(negDrapeaux)}`);
    S.HMA = hma;

    // EXAMEN PHYSIQUE (toujours présent)
    const tete = [], module = [], adjacent = [], fin = [];
    for (const s of sections("examen")) for (const b of s.blocs) {
      const qs = repondues(b); if (!qs.length) continue;
      if (b.tete) {
        const groupes = [];
        for (const q of qs) { const t = el(q); if (!t) continue; const g = groupes.find(x => x.cle === (q.ligneEx || q.id)); if (g) g.items.push(t); else groupes.push({ cle: q.ligneEx || q.id, items: [t] }); }
        for (const g of groupes) tete.push(`- ${maj(g.items.join(" ; "))}`);
        continue;
      }
      const items = qs.filter(q => !q.precise && !q.lie && !muet(q) && !(q.masqueSi && rep[q.masqueSi])).map(q => el(q)).filter(Boolean);
      if (b.adjacent) { if (items.length) adjacent.push(`${b.adjacent}${b.sansCote ? "" : abr}, ${items.join(", ")}`); continue; }
      if (b.sep) { module.push(`- ${b.titre} : ${items.join(b.sep)}`); continue; }
      if (b.fusion && qs.length === b.questions.length && qs.every(q => rep[q.id] === rep[qs[0].id])) {
        const q0 = qs[0], t = element({ ...q0, court: b.fusion }, rep[q0.id], rep, d);
        module.push(`- ${b.titre} : ${t}`); continue;
      }
      if (b.fin) {
        for (const q of qs.filter(x => !x.precise)) {
          const prec = q.precision && rep[q.precision] ? String(rep[q.precision]).trim() : null;
          fin.push(`- ${q.court || q.libelle} : ${prec || minu(el(q) || "")}`);
        }
        continue;
      }
      if (!items.length) continue;
      const prefixe = b.ligne === false ? "" : `${b.ligne || b.titre} : `;
      module.push(`- ${prefixe}${prefixe ? items.join(" ; ") : maj(items.join(" ; "))}`);
    }
    const ex = [];
    if (module.length || adjacent.length || fin.length) {
      ex.push(`${(d.partieExamen || d.partie).toUpperCase()} :`);
      if (co) ex.push(`Côté atteint : ${co.cote}`);
      ex.push(...module);
      if (adjacent.length) ex.push(`- Dépistage adjacent : ${adjacent.join(" ; ")}`);
      ex.push(...fin);
    }
    S.tete = tete; S.module = ex; S.etiquette = `${(d.partieExamen || d.partie).toUpperCase()}${abr}`;

    // EDU (échographie au cabinet), puis INVESTIGATIONS (déjà faites)
    const edu = [], inv = [];
    for (const s of sections("inv")) for (const b of s.blocs) for (const q of repondues(b)) for (const x of lignes(rep[q.id])) (q.edu ? edu : inv).push(`- ${maj(x)}`);
    titre("EDU", edu);
    titre("INVESTIGATIONS", inv);

    // IMPRESSION DIAGNOSTIQUE
    const imp = [];
    const chron = { lt7: "aiguë", s1_6: "aiguë", s6_12: "subaiguë", gt3m: "chronique" }[rep.duree];
    const contexte = [rep.apparition ? (L.trauma() ? "post-traumatique" : "non traumatique") : null, chron,
      rep.sport_precision ? minu(String(rep.sport_precision).split(/[,;]/)[0].trim())
        : Array.isArray(rep.sport) && d.parQ.sport && !rep.sport.includes("aucun") ? rep.sport.map(x => (d.parQ.sport.options.find(o2 => o2.v === x) || {}).n).filter(Boolean).join(", ") : null,
      rep.evolution ? { mieux: "évolution favorable", stable: "évolution stable", pire: "en aggravation" }[rep.evolution] : null].filter(Boolean);
    const ordre = ["aiguë", "subaiguë", "chronique", "post-traumatique", "non traumatique"];
    contexte.sort((a, b) => (ordre.includes(a) ? ordre.indexOf(a) : 9) - (ordre.includes(b) ? ordre.indexOf(b) : 9));
    imp.push(`1- ${co && co.rc ? co.rc : d.rc + abr}${contexte.length ? " " + contexte.join(", ") : ""}`);
    const QUAL = { tres: "très prob", probable: "prob", possible: "moins prob" };
    const retenus = diagnostics.filter(x => QUAL[x.categorie[2]]).slice(0, 4);
    if (retenus.length) imp.push(`- ${retenus.map((x, i) => `${i ? x.x.n : maj(x.x.n)} ${QUAL[x.categorie[2]]}`).join(" > ")}`);
    const ro = [...new Set(alertes.filter(a => a.niveau !== "info" && a.ro).map(a => a.ro))];
    for (const x of ro) imp.push(`- ${maj(x)} à R/O`);
    // Envisagés puis écartés : probabilité de départ d'au moins 5 %, moins de 5 % après l'anamnèse et l'examen (assez de réponses).
    if (res.saisies >= 15) {
      const ecartes = diagnostics.filter(x => !x.residuel && x.depart >= 0.05 && x.p < 0.05).map(x => x.x.n);
      if (ecartes.length) imp.push(`- Pas d'évidence ${/^[aeiouyéèêàâîïôûœh]/i.test(ecartes[0]) ? "d'" : "de "}${ecartes.length < 2 ? ecartes[0] : `${ecartes.slice(0, -1).join(", ")} ni ${ecartes[ecartes.length - 1]}`}`);
    }
    S.precisions = lignes(rep.impression_precisions || "").map(x => `- ${maj(x)}`);
    titre("IMPRESSION DIAGNOSTIQUE", imp);

    // PLAN : cases cochées, dans l'ordre habituel.
    const plan = [];
    for (const s of sections("plan")) for (const b of s.blocs) for (const q of repondues(b)) {
      if (q.id === "impression_precisions") continue;
      if (q.type === "texte" && !q.gabarit) { for (const x of lignes(rep[q.id])) plan.push(/ :$/.test(x.trim()) ? maj(x.trim()) : `- ${maj(x)}`); continue; }
      const t = el(q); if (t) plan.push(`- ${maj(t)}`);
    }
    titre("PLAN", plan);
    return S;
  }
  const HMA = S => (S.suivi ? "ÉVOLUTION DEPUIS LA DERNIÈRE VISITE" : "HMA");
  function assembler(S) {
    const out = [], titre = (t, contenu) => { if (contenu && contenu.length) out.push(...(out.length ? [""] : []), `${t} :`, ...contenu); };
    for (const t of ["IDENTIFICATION", "RAISON DE CONSULTATION", "ANTÉCÉDENTS"]) titre(t, S[t]);
    titre(HMA(S), S.HMA);
    out.push(...(out.length ? [""] : []), "EXAMEN PHYSIQUE :", ...S.tete, ...(S.tete.length && S.module.length ? [""] : []), ...S.module);
    for (const t of ["EDU", "INVESTIGATIONS"]) titre(t, S[t]);
    titre("IMPRESSION DIAGNOSTIQUE", [...S["IMPRESSION DIAGNOSTIQUE"], ...S.precisions]);
    titre("PLAN", S.PLAN);
    return out.join("\n");
  }
  function rediger(d, res) { return assembler(sectionsNote(d, res)); }
  /* Plusieurs plaintes : liste [{ d, res }] dans l'ordre des plaintes. Les sections communes viennent de la première ; les
     lignes en double (antécédents, examen fonctionnel) ne s'écrivent qu'une fois. */
  function redigerPlusieurs(liste) {
    if (liste.length === 1) return rediger(liste[0].d, liste[0].res);
    const T = liste.map(({ d, res }) => sectionsNote(d, res)), S0 = T[0];
    const union = cle => [...new Set(T.flatMap(S => S[cle] || []))];
    const hma = T.flatMap(S => (S.HMA.length ? [`${S.etiquette} :`, ...S.HMA] : []));
    const S = { ...S0, "RAISON DE CONSULTATION": T.flatMap(S => S["RAISON DE CONSULTATION"] || []), "ANTÉCÉDENTS": union("ANTÉCÉDENTS"),
      HMA: hma, tete: union("tete"), module: T.flatMap((S, i) => [...(i && S.module.length ? [""] : []), ...S.module]),
      "IMPRESSION DIAGNOSTIQUE": T.flatMap((S, i) => (S["IMPRESSION DIAGNOSTIQUE"] || []).map((l, j) => (j === 0 ? l.replace(/^1- /, `${i + 1}- `) : l))) };
    return assembler(S);
  }
  // Valeur « normale » d'un élément, pour le bouton « Tout normal ».
  function normalDe(q) {
    if (q.normal !== undefined) return q.normal;
    if (q.type === "oui_non") return "non";
    if (q.type === "choix") { const op = q.options.find(x => x.normal) || q.options[0]; return op.v; }
    return null;
  }

  /* ---------- Validation : consigne pour Claude in Chrome avec OpenEvidence, tirée des poids du fichier ---------- */
  const nbFr = x => (x === undefined || x === null ? "—" : Number(x).toLocaleString("fr-CA", { maximumFractionDigits: 2 }));
  const pc = x => `${Math.round(x * 100)} %`;
  function elementDe(e, v) {
    const q = e.q;
    if (q.type === "multi") return `${q.libelle} : ${q.options.find(o2 => o2.v === e.opt).l}`;
    if (v !== undefined) return `${q.libelle} : ${libelleOption(q, v)}`;
    if (q.type === "choix") return `${q.libelle} (positif : ${(e.pos || []).map(x => libelleOption(q, x).toLowerCase()).join(", ")})`;
    return q.libelle;
  }
  /* Questions à poser à OpenEvidence pour un diagnostic (en anglais : OpenEvidence y répond mieux). Le clinicien les pose
     lui-même ; il rapporte les réponses avec leurs références, conservées dans outils/locomoteur/sources/. */
  function consigne(d, id) {
    const x = d.parDx[id], nom = x.en || x.nom, region = d.en || d.partie;
    const vus = new Set(), elements = [];
    for (const q of d.questions) for (const e of q.effets) {
      if (e.dx !== id || vus.has(q.id)) continue;
      const fort = e.se !== undefined || (e.rv ? Object.values(e.rv).some(v => Math.abs(Math.log(v)) >= 0.3) : [e.rvp, e.rvn].some(v => v > 0 && Math.abs(Math.log(v)) >= 0.3));
      if (!fort) continue;
      vus.add(q.id); elements.push(q.video || (q.type === "multi" && e.opt ? `${q.libelle} : ${q.options.find(o2 => o2.v === e.opt).l}` : q.libelle));
    }
    return `1. For ${nom}, give the diagnostic accuracy of each of these history and examination findings: ${elements.join("; ")}. For each: sensitivity, specificity, LR+ and LR− with 95% CI, number of studies and patients, reference standard, setting (primary care, sports medicine or orthopedics), and source (first author, year, PMID). Prefer meta-analyses; otherwise the best primary-care or sports-medicine study. Write "no data" when none exists.

2. Which validated combinations of history and physical examination findings (clusters or clinical prediction rules) diagnose or rule out ${nom}? For each: items, threshold, sensitivity, specificity, LR+, LR−, how it was validated, and source (first author, year, PMID).

3. Among patients ${d.ages || "12 years and older"} consulting in primary care or sports medicine for ${region} pain, what proportion has ${nom}? Give results by age group (12–17, 18–39, 40–59, 60+) and by sex if available, with sources (first author, year, PMID).`;
  }

  racine.Locomoteur = Object.assign(racine.Locomoteur || {}, {
    outils: { p, lit, est, o, m, ouiNon, choix, multi, nombre, texte, caseQ, miroir },
    definir, calculer, rediger, redigerPlusieurs, normalDe, consigne, elementDe, visibles, rvPosNeg, rvDe, libelleOption, STATUTS, CATEGORIES,
  });
})(typeof window !== "undefined" ? window : globalThis);
