/* Morand — Entraînement clinique : moteur de jeu. Il ne sait rien de la médecine : il reçoit des cartes { id, reponse, … },
   les tire, compte les points et les séries, et résume la partie. L'affichage, le chrono à l'écran et la sauvegarde sont
   ailleurs (ecrans.js, stockage.js). Utilisable aussi sous Node pour les tests (module.exports). */
(function (racine) {
  "use strict";

  // Tout ce qui se règle : points, bonus, délais, durées. Modifier ici seulement.
  const CONFIG = {
    points: { bonne: 100, rapide: { seuilMs: 2000, bonus: 25 }, series: [[10, 100], [5, 50]] },   // série : multiple de 10 → +100, sinon de 5 → +50
    delais: { chronoBonne: 450, chronoErreur: 1300 },                                             // passage automatique, contre-la-montre seulement (ms)
    durees: [30, 60, 120],
    defi: 10,
    poidsBoites: [6, 4, 3, 2, 1],   // tirage : une carte ratée (boîte 1) sort 6 fois plus souvent qu'une carte maîtrisée (boîte 5)
  };

  // Hasard reproductible (même graine → même suite) pour le défi quotidien.
  const graine = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const alea = n => () => { n = (n + 0x6d2b79f5) >>> 0; let t = n; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  function melanger(liste, rng) {
    const l = liste.slice();
    for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; }
    return l;
  }
  // Défi du jour : la même sélection pour tous (cartes triées par identifiant, puis mélange à graine fixe).
  function tirageDuJour(cartes, jour, n = CONFIG.defi) {
    const triees = cartes.slice().sort((a, b) => (a.id < b.id ? -1 : 1));
    return melanger(triees, alea(graine(`defi-${jour}`))).slice(0, n);
  }

  // Points d'une bonne réponse : base, rapidité, puis bonus de série.
  function points(juste, ms, serie, config = CONFIG) {
    if (!juste) return { total: 0, bonus: [] };
    const P = config.points, bonus = [];
    if (ms < P.rapide.seuilMs) bonus.push({ raison: "Réponse rapide", points: P.rapide.bonus });
    const s = P.series.find(([k]) => serie > 0 && serie % k === 0);
    if (s) bonus.push({ raison: `${serie} de suite`, points: s[1] });
    return { total: P.bonne + bonus.reduce((t, b) => t + b.points, 0), bonus };
  }

  /* Une partie. mode : chrono | serie | libre | defi | erreurs. poids(carte) donne le poids de tirage (révision adaptative).
     Les cartes ne reviennent pas avant que toutes soient sorties (sauf en entraînement libre, où rien ne revient). */
  function Partie({ mode, cartes, config = CONFIG, rng = Math.random, poids = () => 1, ordre = null }) {
    if (!cartes || !cartes.length) throw new Error("Aucune carte à jouer.");
    const reponses = [];
    let restantes = ordre ? ordre.slice() : cartes.slice(), courante = null, serie = 0, meilleure = 0, score = 0, finie = false;
    const fixe = !!ordre;   // défi, révision d'une liste : ordre imposé, une seule fois chaque carte

    function prochaine() {
      if (finie) return null;
      if (!restantes.length) {
        if (fixe || mode === "libre" || mode === "erreurs") { finie = true; return null; }
        restantes = cartes.filter(c => !courante || c.id !== courante.id);
        if (!restantes.length) restantes = cartes.slice();
      }
      let i = 0;
      if (!fixe) {
        const p = restantes.map(c => Math.max(0.01, poids(c))), total = p.reduce((a, b) => a + b, 0);
        let x = rng() * total;
        while (i < p.length - 1 && (x -= p[i]) > 0) i++;
      }
      courante = restantes.splice(i, 1)[0];
      return courante;
    }

    function repondre(choix, ms) {
      if (finie || !courante) return null;
      const juste = choix === courante.reponse;
      serie = juste ? serie + 1 : 0;
      meilleure = Math.max(meilleure, serie);
      const p = points(juste, ms, serie, config);
      score += p.total;
      reponses.push({ id: courante.id, carte: courante, choix, juste, ms, points: p.total });
      if (!juste && mode === "serie") finie = true;
      if (fixe && !restantes.length) finie = true;
      return { juste, attendue: courante.reponse, points: p.total, bonus: p.bonus, serie, score, fini: finie };
    }

    function terminer() { finie = true; }

    function resume() {
      const n = reponses.length, bonnes = reponses.filter(r => r.juste).length;
      return {
        mode, questions: n, bonnes, pct: n ? Math.round((bonnes / n) * 100) : 0, score, meilleureSerie: meilleure,
        serieFinale: serie, tempsMoyenMs: n ? Math.round(reponses.reduce((t, r) => t + r.ms, 0) / n) : 0,
        erreurs: reponses.filter(r => !r.juste).map(r => r.carte), reponses: reponses.slice(),
      };
    }

    return { prochaine, repondre, terminer, resume, get courante() { return courante; }, get finie() { return finie; }, get serie() { return serie; }, get score() { return score; } };
  }

  const api = { CONFIG, Partie, points, tirageDuJour, melanger, graine, alea };
  racine.EntrainementJeu = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
