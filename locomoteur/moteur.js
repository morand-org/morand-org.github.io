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
  const binaires = (effets, g) => Object.entries(effets || {}).map(([dx, e]) => ({ g, ...e, dx }));
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

  /* Prépare un fichier de données : index, clés des poids, statut par défaut. Arrête tout si un diagnostic est inconnu. */
  function definir(d) {
    d.parDx = Object.fromEntries(d.diagnostics.map(x => [x.id, x]));
    d.compat = new Set();
    for (const [a, b] of d.compatibles || []) {
      if (!d.parDx[a] || !d.parDx[b]) throw new Error(`Diagnostic inconnu dans « compatibles » : ${a}, ${b}`);
      d.compat.add(`${a}|${b}`); d.compat.add(`${b}|${a}`);
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
    if (neg.includes(r)) return e.se !== undefined ? (1 - e.se) / e.sp : (e.rvn === undefined ? null : e.rvn);
    return null;
  }
  // RV+ et RV− d'un poids, pour le tableau des sources.
  function rvPosNeg(e) {
    if (e.rv) return null;
    if (e.se !== undefined) return [e.se / Math.max(0.01, 1 - e.sp), (1 - e.se) / e.sp];
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
    }).sort((a, b) => b.p - a.p);
    const alertes = [];
    for (const regle of d.regles || []) {
      const a = regle(L, rep);
      if (a) for (const x of [].concat(a)) alertes.push(x);
    }
    alertes.sort((a, b) => NIVEAUX[a.niveau] - NIVEAUX[b.niveau]);
    const conduite = diagnostics.filter((x, i) => x.p >= 0.25 || (i === 0 && x.p >= 0.1)).map(x => ({
      dx: x, items: (x.x.conduite || []).filter(c => typeof c === "string" || !c.si || c.si(L)).map(c => (typeof c === "string" ? c : c.t)),
      liens: x.x.liens || [] }));
    return { rep, L, vus, diagnostics, alertes, conduite, saisies: Object.keys(rep).length };
  }

  /* ---------- Note pour le dossier (texte brut, à coller dans le DMÉ) ---------- */
  const maj = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
  const liste = a => a.join(", ");
  function rediger(d, res) {
    const { rep, L, diagnostics, alertes } = res, lignes = [];
    const val = id => rep[id];
    // Identification
    const sexe = L.sexe === "F" ? "Femme" : L.sexe === "M" ? "Homme" : "Patient";
    const cote = { D: "genou droit", G: "genou gauche", B: "deux genoux" }[val("cote")];
    const titre = `${d.noteTitre}${cote ? ` (${cote})` : ""}`;
    lignes.push(titre.toUpperCase());
    const id = [L.age !== null ? `${sexe} de ${L.age} ans` : sexe];
    const lat = val("lateralite"), fem = L.sexe === "F";
    const morceaux = [];
    for (const q of d.sections[0].blocs.flatMap(b => b.questions)) {
      if (["sexe", "age", "cote"].includes(q.id) || !(q.id in rep)) continue;
      if (q.id === "lateralite") morceaux.push({ D: fem ? "droitière" : "droitier", G: fem ? "gauchère" : "gaucher", A: "ambidextre" }[lat]);
      else if (q.type === "oui_non") { if (rep[q.id] === "oui") morceaux.push(q.court || q.libelle.toLowerCase()); }
      else morceaux.push(fragment(q, rep[q.id]));
    }
    lignes.push(`${id[0]}${morceaux.length ? ", " + morceaux.join(", ") : ""}.`);
    // Sections
    for (const s of d.sections.slice(1)) {
      const paras = [];
      for (const b of s.blocs) {
        const qs = b.questions.filter(q => q.id in rep);
        if (!qs.length) continue;
        const frags = [], pos = [], neg = [];
        for (const q of qs) {
          const v = rep[q.id];
          if (q.type === "oui_non") {
            if (q.n) frags.push(v === "oui" ? q.n[0] : q.n[1]);
            else (v === "oui" ? pos : neg).push(q.court || q.libelle.toLowerCase());
          } else if (q.type === "multi") {
            const ops = v.map(x => q.options.find(o2 => o2.v === x)).filter(Boolean);
            frags.push(`${q.court || q.libelle} : ${liste(ops.map(op => (op.n || op.l).toLowerCase()))}`);
          } else frags.push(fragment(q, v));
        }
        const n = b.note || {};
        if (pos.length) frags.push(`${n.pos || "rapporte"} : ${liste(pos)}`);
        if (neg.length) frags.push(`${n.neg || "nie"} : ${liste(neg)}`);
        if (n.titre) paras.push(`${n.titre} : ${frags.join(" ; ")}.`);
        else paras.push(frags.map(f => maj(f) + ".").join(" "));
      }
      if (paras.length) { lignes.push("", s.noteTitre || s.titre.toUpperCase()); lignes.push(...paras); }
    }
    // Impression
    const retenus = diagnostics.filter(x => x.p >= 0.1);
    lignes.push("", "IMPRESSION");
    if (retenus.length && retenus[0].p >= 0.2) {
      lignes.push(`Hypothèse principale : ${retenus[0].x.n} (${retenus[0].categorie[1].toLowerCase()}).`);
      const autres = retenus.slice(1, 5);
      if (autres.length) lignes.push(`Diagnostic différentiel : ${liste(autres.map(x => `${x.x.n} (${x.categorie[1].toLowerCase()})`))}.`);
    } else lignes.push("Aucune hypothèse ne se détache avec les éléments saisis.");
    const graves = alertes.filter(a => a.niveau !== "info");
    if (graves.length) lignes.push(`À considérer : ${liste(graves.map(a => a.titre.toLowerCase()))}.`);
    // Conduite
    const plan = [];
    for (const a of graves) for (const c of a.conduite || []) plan.push(c);
    const principal = res.conduite.filter(c => c.dx.p >= 0.5);
    for (const c of (principal.length ? principal : res.conduite.slice(0, 1))) for (const t of c.items) plan.push(t);
    for (const a of alertes.filter(x => x.niveau === "info" && x.dansNote)) plan.push(a.dansNote);
    if (plan.length) { lignes.push("", "CONDUITE"); for (const t of [...new Set(plan)]) lignes.push(`- ${t}`); }
    return lignes.join("\n");
  }
  function fragment(q, v) {
    if (q.type === "nombre") return `${q.court || q.libelle} : ${v}${q.unite ? (q.unite.startsWith("/") || q.unite === "°" ? "" : " ") + q.unite : ""}`;
    if (q.type === "texte") return `${q.court || q.libelle} : ${String(v).trim()}`;
    const op = q.options.find(x => x.v === v);
    if (op && op.n) return op.n;
    return `${q.court || q.libelle} : ${(op ? op.l : v).toLowerCase()}`;
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
  function consigne(d, id) {
    const x = d.parDx[id], items = [];
    for (const e of d.questions.flatMap(q => q.effets).filter(e2 => e2.dx === id)) {
      const info = `${STATUTS[e.statut].toLowerCase()}${e.piste ? `, piste : ${e.piste}` : ""}`;
      if (e.rv) for (const [v, rv] of Object.entries(e.rv)) items.push(`${e.cle}=${v} | ${elementDe(e, v)} | RV ${nbFr(rv)} (${info})`);
      else if (e.se !== undefined) items.push(`${e.cle} | ${elementDe(e)} | Se ${pc(e.se)}, Sp ${pc(e.sp)} (${info})`);
      else items.push(`${e.cle} | ${elementDe(e)} | RV+ ${nbFr(e.rvp)}, RV− ${nbFr(e.rvn)} (${info})`);
    }
    return `Contexte : je valide les poids d'un outil d'aide à la décision pour la ${d.titre.toLowerCase()} en première ligne (patients de ${d.ages}). Diagnostic à valider : ${x.nom}.
Fais la recherche dans OpenEvidence (onglet ouvert). Pose tes questions à OpenEvidence en anglais ; rédige ta réponse en français.

Règles :
- Pour chaque élément ci-dessous, trouve la meilleure donnée publiée de sensibilité et de spécificité (ou de rapports de vraisemblance) pour ${x.nom}. Préfère les méta-analyses, puis les études en soins primaires ou en médecine du sport, puis les autres.
- Chaque chiffre vient d'un article précis : auteur, année, revue, PMID ou DOI. Ouvre la référence (PubMed) pour confirmer le chiffre et recopie-le tel quel, avec son intervalle de confiance.
- Sans donnée publiée, écris « aucune donnée ». N'estime rien.
- Garde la colonne « clé » telle quelle : elle sert à remettre le chiffre au bon endroit dans l'outil.

Éléments à vérifier (clé | élément | valeur actuelle dans l'outil) :
${items.join("\n")}

Rends un seul tableau, colonnes séparées par « | » :
clé | élément | sensibilité | spécificité | RV+ | RV− | IC 95 % | population (âge, contexte) | référence standard | auteur année revue | PMID ou DOI | type d'étude | remarque

Ensuite :
1. Les combinaisons validées pour ${x.nom} (grappes de signes, règles de décision) : éléments, seuil, sensibilité, spécificité, RV, population et source. Précise si l'âge ou le sexe fait partie de la combinaison.
2. Les éléments d'anamnèse ou d'examen utiles pour ${x.nom} qui manquent à ma liste, avec leurs chiffres et leurs sources.
3. La fréquence de ${x.nom} chez les patients qui consultent pour une ${d.titre.toLowerCase()}, par groupe d'âge (12-17, 18-39, 40-59, 60 et plus) et par sexe, avec les sources.`;
  }

  racine.Locomoteur = Object.assign(racine.Locomoteur || {}, {
    outils: { p, lit, est, o, m, ouiNon, choix, multi, nombre, texte },
    definir, calculer, rediger, consigne, elementDe, visibles, rvPosNeg, rvDe, libelleOption, STATUTS, CATEGORIES,
  });
})(typeof window !== "undefined" ? window : globalThis);
