/* Morand — Entraînement clinique : persistance. Tout reste dans ce navigateur (localStorage) : records, historique, boîtes de
   révision (Leitner), favoris, préférences et décisions du mode éditeur. La même interface servira plus tard à Supabase
   (records officiels recalculés par le serveur) sans toucher au moteur ni aux écrans. Un stockage bloqué ou plein ne
   bloque jamais le jeu : on continue en mémoire. */
(function (racine) {
  "use strict";
  const CLE = "morand-entrainement-v1", MAX_HISTORIQUE = 2000, BOITES = 5;
  let memoire = null;
  const vide = () => ({ records: {}, defis: {}, cartes: {}, historique: [], favoris: [], parties: 0, editeur: {}, prefs: {} });
  function lire() {
    if (memoire) return memoire;
    try { const x = JSON.parse(localStorage.getItem(CLE) || "null"); memoire = x && typeof x === "object" ? { ...vide(), ...x } : vide(); }
    catch (e) { memoire = vide(); }
    return memoire;
  }
  function ecrire() { try { localStorage.setItem(CLE, JSON.stringify(memoire)); return true; } catch (e) { return false; } }
  const aujourdhui = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

  const S = {
    aujourdhui,
    // Réponse : historique (plafonné) et boîte de révision de la carte (erreur → boîte 1 ; bonne réponse → boîte suivante).
    reponse(carte, juste, ms, mode) {
      const m = lire(), c = m.cartes[carte.id] || { b: 1, v: 0, j: 0, e: 0 };
      c.v++; if (juste) { c.j++; c.b = Math.min(BOITES, c.b + 1); } else { c.e++; c.b = 1; }
      c.d = aujourdhui(); m.cartes[carte.id] = c;
      m.historique.push({ id: carte.id, r: carte.region, dx: carte.diagnostic && carte.diagnostic.no, ty: carte.type, ok: juste ? 1 : 0, ms: Math.round(ms), m: mode, t: Date.now() });
      if (m.historique.length > MAX_HISTORIQUE) m.historique.splice(0, m.historique.length - MAX_HISTORIQUE);
      ecrire();
    },
    boite: id => (lire().cartes[id] || { b: 1 }).b,
    vue: id => !!lire().cartes[id],
    // À revoir : cartes ratées dont la dernière réponse n'a pas encore été rattrapée (boîte 1).
    aRevoir: () => Object.entries(lire().cartes).filter(([, c]) => c.e > 0 && c.b === 1).map(([id]) => id),
    difficiles: () => Object.entries(lire().cartes).filter(([, c]) => c.e >= 2 || (c.e > 0 && c.b === 1)).map(([id]) => id),
    // Records locaux. cle : « chrono-60 », « serie »… ; renvoie true si c'est un nouveau record.
    record: cle => lire().records[cle] || null,
    proposerRecord(cle, valeur, details) {
      const m = lire(), r = m.records[cle];
      m.parties++;
      if (!r || valeur > r.valeur) { m.records[cle] = { valeur, ...details, date: aujourdhui() }; ecrire(); return { nouveau: true, ancien: r ? r.valeur : null }; }
      ecrire(); return { nouveau: false, ancien: r.valeur };
    },
    defi: jour => lire().defis[jour || aujourdhui()] || null,
    enregistrerDefi(jour, resultat) { const m = lire(); if (m.defis[jour]) return false; m.defis[jour] = { ...resultat, date: Date.now() }; ecrire(); return true; },
    favori: id => lire().favoris.includes(id),
    basculerFavori(id) { const m = lire(); m.favoris = m.favoris.includes(id) ? m.favoris.filter(x => x !== id) : m.favoris.concat(id); ecrire(); return m.favoris.includes(id); },
    favoris: () => lire().favoris.slice(),
    // Réussite par clé (région, type…) sur l'historique.
    parGroupe(cle) {
      const g = {};
      for (const h of lire().historique) { const k = h[cle]; if (k === undefined || k === null) continue; (g[k] = g[k] || { n: 0, ok: 0 }); g[k].n++; g[k].ok += h.ok; }
      return g;
    },
    totaux() { const h = lire().historique; return { reponses: h.length, bonnes: h.reduce((t, x) => t + x.ok, 0), cartesVues: Object.keys(lire().cartes).length, parties: lire().parties }; },
    // Préférences (polices, région choisie, mode éditeur).
    pref: (k, defaut) => (k in lire().prefs ? lire().prefs[k] : defaut),
    definirPref(k, v) { lire().prefs[k] = v; ecrire(); },
    // Mode éditeur : décision locale par carte (validee | signalee), exportée ensuite pour être appliquée à la banque.
    decision: id => lire().editeur[id] || null,
    decider(id, statut, note) { const m = lire(); if (!statut) delete m.editeur[id]; else m.editeur[id] = { statut, ...(note ? { note } : {}), date: aujourdhui() }; ecrire(); },
    decisions: () => ({ ...lire().editeur }),
    effacerTout() { memoire = vide(); try { localStorage.removeItem(CLE); } catch (e) { /* rien */ } },
  };
  racine.EntrainementStockage = S;
})(window);
