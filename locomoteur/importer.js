/* Locomoteur Morand : importateur de note, sans IA (point 14 de l'audit). Analyse à règles d'une note existante : âge,
   sexe, côté, durée, mode d'apparition, tests nommés (positif ou négatif), symptômes et négations (« pas de… », « sans… »,
   « nie… »). Rien n'est rempli ici : la page montre ce qui a été reconnu, le clinicien coche, puis applique. Une question
   reconnue avec deux valeurs différentes est signalée comme contradiction et laissée décochée. Ce qui n'est pas reconnu
   n'est jamais rempli (non évalué n'est pas négatif).
   API : Locomoteur.importer.regionsDe(texte) → régions évoquées ; Locomoteur.importer.analyser(texte, [{ r, d }], cle) → constats. */
(function () {
  "use strict";
  const norm = t => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[’`]/g, "'").replace(/(?<=[a-z])-(?=[a-z])/g, " ");
  const NEG = /\b(pas de|pas d'|pas|aucun|aucune|absence de|absent|absente|nie|niee|sans|negatif|negative|neg|normal|normale|normaux|indolore|non)\b|(^|\s)-(\s|$)|\bn\b|0\/|ø/;
  const POS = /\b(positif|positive|pos|reproduit|reproduisant|douloureux|douloureuse|laxite|laxe|arret mou|instable|present|presente|augmente)\b|(^|\s)\+{1,3}(\s|$|\.|,)/;
  const REGIONS = [["genou", /\b(genou|rotul|menisqu|lca|lcp|gonalgie)/], ["epaule", /\b(epaule|coiffe|acromio|scapul)/], ["coude", /\b(coude|epicondyl|olecran)/],
    ["poignet", /\b(poignet|mains?\b|doigt|pouce|carpien|phalang|metacarp)/], ["hanche", /\b(hanche|aines?\b|fesse|trochant|coxarthr)/], ["lombaire", /\b(lombaire|lombalgie|dos\b|sciatique|lombo)/],
    ["cervical", /\b(cervical|cervicalgie|cou\b|nuque|torticolis)/], ["cheville", /\b(cheville|achille|mollet|malleol)/], ["pied", /\b(pied|talon|orteil|hallux|plantaire|metatars)/]];
  const NOMBRES = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10, quelques: 3 };

  function clauses(texte) {
    return String(texte || "").split(/\n+|(?<=[.;!?])\s+|;\s*|,\s+(?=[A-ZÉÈa-zéè])/).map(c => c.trim()).filter(c => c.length > 1);
  }
  function regionsDe(texte) {
    const t = norm(texte);
    return REGIONS.filter(([, re]) => re.test(t)).map(([r]) => r);
  }
  /* Plainte ou simple mention ? Une région n'est une plainte que si une phrase la décrit comme atteinte (douleur, durée,
     traumatisme, trouvaille anormale). Une articulation voisine examinée et normale (« hanche : amplitudes complètes,
     indolore ») n'est qu'une mention : proposée, mais décochée. */
  const ATTEINTE = /\b(douleur|douloureu\w*|mal\b|algie|\w+algie|sciatique|cruralgie|plainte|motif|consulte|raison de consultation|depuis|blessure|traumatisme|trauma|chute|pivot|torsion|entorse|accident|enflure|tumefaction|oedeme|epanchement|instab\w*|blocage|raideur|engourdi\w*|paresthesi\w*|faiblesse|craquement|positif|positive|limitee?s?|diminuee?s?|crepit\w*|laxite|ecchymose|deformation|irradi\w*)\b/;
  const NORMAL = /\b(normal|normale|normaux|normales|indolore|indolores|sans particularite|sp|ras|rien a signaler|sans anomalie|libre|libres|souple|completes?|negatif|negative|neg|non douloureu\w*|pas de douleur|aucune douleur|n)\b|\bwnl\b|\(-\)/;
  function plaintesDe(texte) {
    const cl = clauses(texte).map(norm), res = [];
    for (const [r, re] of REGIONS) {
      const ici = cl.filter(c => re.test(c));
      if (!ici.length) continue;
      // Clause atteinte : un mot d'atteinte sans négation ni mot de normalité qui la contredise.
      const atteinte = ici.some(c => ATTEINTE.test(c.replace(re, " ")) && !(NORMAL.test(c) && !/\b(positif|positive|douloureu\w*|limitee?s?|diminuee?s?)\b/.test(c)) && !nie(c, (c.match(ATTEINTE) || [""])[0]));
      res.push({ r, plainte: atteinte });
    }
    // Aucune atteinte reconnue : la première région nommée reste la plainte.
    if (res.length && !res.some(x => x.plainte)) res[0].plainte = true;
    return res;
  }
  // Durée en jours → option de « Depuis combien de temps ».
  function duree(t) {
    const m = t.match(/depuis\s+(\d+|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|quelques)\s*(jours?|j\b|semaines?|sem\b|mois|ans?\b|annees?)/);
    if (!m) return null;
    const n = /\d/.test(m[1]) ? +m[1] : NOMBRES[m[1]], u = m[2], jours = n * (/^j/.test(u) ? 1 : /^sem/.test(u) ? 7 : /^mois/.test(u) ? 30 : 365);
    return jours < 7 ? "lt7" : jours <= 42 ? "s1_6" : jours <= 84 ? "s6_12" : "gt3m";
  }
  const nie = (t, mot) => { const i = t.indexOf(mot); if (i < 0) return false; const avant = t.slice(Math.max(0, i - 30), i), apres = t.slice(i + mot.length, i + mot.length + 25);
    return /\b(pas de|pas d'|pas|aucun|aucune|absence de|nie|niee|sans|ni)\s*$/.test(avant.trim() + " ").valueOf() || /\b(pas de|pas d'|aucun|aucune|absence de|nie|sans|ni)\b[^.]*$/.test(avant) || /^\s*(absent|absente|negatif|negative|nie|niee|non)\b/.test(apres); };

  // Synonymes d'une question (phrases de la note et nom court), sans les mots trop généraux.
  const TROP_GENERAL = new Set(["douleur", "test", "oui", "non", "normal", "examen", "anamnese", "atcd"]);
  const syn = (l, min = 5) => [...new Set(l.filter(Boolean).map(norm).map(x => x.replace(/[()«»]/g, "").trim()).filter(x => x.length >= min && !TROP_GENERAL.has(x)))];
  // Nom court d'un test (« Neer », « Thessaly ») : 4 lettres suffisent, en mot entier.
  const nomme = (t, m) => (m.length >= 5 ? t.includes(m) : new RegExp(`(^|[^a-z])${m}([^a-z]|$)`).test(t));

  function analyser(texte, regions, cle) {
    const constats = [], vus = new Map(), cl = clauses(texte);
    const ajoute = (r, q, v, extrait) => {
      const k = cle(r, q), x = { r, q, k, v, extrait };
      if (vus.has(k)) { const autres = vus.get(k); if (autres.some(o => o.v !== v)) { autres.forEach(o => (o.conflit = true)); x.conflit = true; } else return; autres.push(x); }
      else vus.set(k, [x]);
      constats.push(x);
    };
    const tout = norm(texte);
    for (const { r, d } of regions) {
      const Q = d.parQ;
      // Identification : âge, sexe.
      const age = tout.match(/\b(\d{1,3})\s*(ans|an|a|yo)\b/);
      if (Q.age && age && +age[1] >= 12 && +age[1] <= 110) ajoute(r, Q.age, age[1], age[0]);
      const sexe = /\b(femme|patiente|fille|mme|madame)\b|\bf\s*\d{1,3}\s*ans\b|\b\d{1,3}\s*ans\s*f\b/.test(tout) ? "F"
        : /\b(homme|patient|garcon|monsieur)\b|(^|\s)m\.|\b[hm]\s*\d{1,3}\s*ans\b|\b\d{1,3}\s*ans\s*[hm]\b/.test(tout) ? "M" : null;
      if (Q.sexe && sexe) ajoute(r, Q.sexe, sexe, sexe === "F" ? "femme" : "homme");
      // Côté : « genou G », « épaule droite », « bilatéral ».
      const reg = (REGIONS.find(([x]) => x === r) || [, /$^/])[1];
      if (Q.cote) for (const c of cl) {
        const t = norm(c); if (!reg.test(t)) continue;
        const v = /\bbilat|des deux|aux deux|les deux\b/.test(t) ? "B" : /\b(droit|droite|dt)\b|\s(d)(\s|$|\.|,)/.test(t) ? "D" : /\b(gauche|gche)\b|\s(g)(\s|$|\.|,)/.test(t) ? "G" : null;
        if (v) { ajoute(r, Q.cote, v, c); break; }
      }
      // Durée et mode d'apparition.
      const du = duree(tout); if (Q.duree && du) ajoute(r, Q.duree, du, (tout.match(/depuis\s+\S+\s+\S+/) || [""])[0]);
      if (Q.apparition) {
        const trauma = /\b(traumatisme|trauma|chute|pivot|torsion|inversion|contact|accident|coup direct|reception)/;
        const m = tout.match(trauma);
        if (m && !nie(tout, m[1])) ajoute(r, Q.apparition, "subit_trauma", m[0]);
        else if (/\b(progressi|graduel|graduellement)/.test(tout)) ajoute(r, Q.apparition, "graduel", "début progressif");
        else if (/\binsidieu/.test(tout)) ajoute(r, Q.apparition, "insidieux", "début insidieux");
        else if (/\b(subit|soudain|brutal|brusque)/.test(tout)) ajoute(r, Q.apparition, "subit", "début subit");
      }
      // Questions du fichier : tests nommés et symptômes.
      for (const q of d.questions) {
        if (["age", "sexe", "cote", "duree", "apparition", "visite"].includes(q.id) || q.type === "texte" || q.type === "nombre" || q.type === "miroir") continue;
        const test = (q.res || q.bloc.res) === "test" || !!q.court;
        if (q.type === "oui_non") {
          const mots = [...syn([q.court], 4), ...syn([q.oui, q.nie, q.libelle.length <= 34 ? q.libelle : null])];
          for (const c of cl) {
            const t = norm(c), mot = mots.find(m => nomme(t, m)); if (!mot) continue;
            const v = test ? (POS.test(t.replace(mot, " ")) && !/\b(negatif|negative|normal|normale|indolore)\b/.test(t) ? "oui" : NEG.test(t.replace(mot, " ")) ? "non" : null)
              : (nie(t, mot) ? "non" : "oui");
            if (v) ajoute(r, q, v, c);   // toutes les mentions : deux valeurs différentes = contradiction
          }
        } else if (q.type === "choix") {
          const court = [...syn([q.court], 4), ...syn([q.libelle.length <= 20 ? q.libelle : null])];
          for (const c of cl) {
            const t = norm(c);
            // Test à plusieurs réponses (ex. Lachman : normal, douleur, laxité).
            if (court.length && court.some(m => nomme(t, m))) {
              const vals = q.options.map(o => o.v);
              const v = vals.includes("laxite") && /laxit|arret mou|positif|instab/.test(t) ? "laxite" : vals.includes("normal") && /normal|negatif|ferme|indolore/.test(t) ? "normal"
                : vals.includes("douleur") && /douleur|douloureux/.test(t) ? "douleur" : null;
              if (v) { ajoute(r, q, v, c); continue; }
            }
            const o = q.options.find(o2 => syn([o2.n]).some(m => m.length >= 8 && t.includes(m)));
            if (o) ajoute(r, q, o.v, c);
          }
        }
      }
    }
    return constats;
  }

  (window.Locomoteur = window.Locomoteur || {}).importer = { analyser, regionsDe, plaintesDe, clauses };
})();
