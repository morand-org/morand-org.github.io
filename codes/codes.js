/* Codes Morand : répertoire des actes (avec les formulaires de la CNESST) et codes de vulnérabilité, cherchés par code
   ou par mot dans codes_data.json (aucun appel réseau après le chargement). Tout le texte passe par textContent. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const q = $("co-q"), zone = $("co-liste"), etat = $("co-etat"), groupes = $("co-groupes");
  const sansAccents = t => String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const el = (tag, cls, texte) => { const e = document.createElement(tag); if (cls) e.className = cls; if (texte != null) e.textContent = texte; return e; };
  const nb = n => n.toLocaleString("fr-CA");
  const dollars = v => v.toLocaleString("fr-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let D = null, actes = [], vuln = [], groupe = "frequents", minuterie = 0;
  const ouverts = new Set();   // actes dont le détail est déplié

  /* Réglages : le mode (à l'acte, mixte, horaire) et le palier d'inscription choisissent le prix affiché ; gardés sur cet
     appareil. À l'acte : la colonne « En cabinet » du manuel ; le tarif à l'acte en établissement reste dans le détail.
     Mixte et horaire : en établissement (CLSC, GMF-U), seul lieu où ils existent. */
  const CLE = "morand.codes.reglages", DEFAUT = { mode: "mixte", palier: 0 };
  let R = { ...DEFAUT };
  try { const g = JSON.parse(localStorage.getItem(CLE) || "{}"); if (["acte", "mixte", "horaire"].includes(g.mode)) R.mode = g.mode; if (g.palier === 1) R.palier = 1; } catch (e) { /* stockage indisponible */ }
  const garder = () => { try { localStorage.setItem(CLE, JSON.stringify(R)); } catch (e) { /* stockage indisponible */ } };
  const reglages = $("co-reglages");
  const CHOIX = [["mode", "Mode de rémunération", [["acte", "À l'acte"], ["mixte", "Mixte"], ["horaire", "Horaire"]]], ["palier", "Inscrits", [[0, "Moins de 500"], [1, "500 et plus"]]]];
  function rendreReglages() {
    reglages.textContent = "";
    reglages.hidden = groupe === "vulnerabilite";
    for (const [cle, nom, opts] of CHOIX) {
      const g = el("div", "co-segment"); g.setAttribute("role", "group"); g.setAttribute("aria-label", nom);
      for (const [v, t] of opts) {
        const b = el("button", null, t); b.type = "button";
        b.setAttribute("aria-pressed", R[cle] === v ? "true" : "false");
        b.addEventListener("click", () => { R[cle] = v; garder(); rendreReglages(); rendre(); });
        g.appendChild(b);
      }
      reglages.appendChild(g);
    }
  }
  // Onglets : Actes | Vulnérabilité.
  const vues = $("co-vues");
  function rendreVues() {
    vues.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", (b.dataset.vue === "vulnerabilite") === (groupe === "vulnerabilite") ? "true" : "false"));
    groupes.hidden = groupe === "vulnerabilite"; rendreReglages();
  }
  vues.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    groupe = b.dataset.vue === "vulnerabilite" ? "vulnerabilite" : "frequents"; rendreVues(); rendre();
  }));

  // Palier : celui des réglages, sauf si l'on cherche un des deux codes (15804 : 500 inscrits et plus).
  function palierDe(a) {
    const m = (q.value.match(/\b\d{5}\b/) || [])[0];
    return m && Array.isArray(a.t) && !a.d && a.c.length === 2 && a.c.includes(m) ? a.c.indexOf(m) : R.palier;
  }
  // Le prix selon les réglages : un seul montant ; deux seulement pour deux cas différents (« par résident / par externe »).
  const montant = v => dollars(v) + " $";
  function prix(a) {
    if (a.t == null || !a.p) return { v: "Compris", sous: a.c.length ? "hors GMF-U" : "dans la visite", gris: true };
    if (a.mixteSeul && R.mode !== "mixte") return { v: "Mixte seulement", sous: "", gris: true };
    let base = R.mode === "acte" ? a.cab : a.t, pct = R.mode === "mixte" ? a.p : 100;
    if (R.mode === "horaire") {
      if (a.h === "compris") return { v: "Compris dans l'heure", sous: "", gris: true };
      if (a.h == null) return { v: "À confirmer", sous: "au taux horaire", gris: true };
      base = a.h;
    }
    if (base == null) return { v: "À confirmer", sous: "à l'acte en cabinet", gris: true };
    const f = x => x * pct / 100;
    if (Array.isArray(base) && a.d) return { v: `${dollars(f(base[0]))} / ${montant(f(base[1]))}`, sous: a.d.join(" / ") };
    return { v: montant(f(Array.isArray(base) ? base[palierDe(a)] : base)), sous: "" };
  }
  // Codes affichés : celui du palier choisi quand les deux codes sont les deux paliers (15803 / 15804).
  const codesAffiches = a => Array.isArray(a.t) && !a.d && a.c.length === 2 ? [a.c[palierDe(a)]] : a.c;

  function rangeeActe(a, avecGroupe) {
    const r = el("div", "co-rangee co-acte"), p = prix(a), id = a.c.join("-") || a.n;
    if (p.gris) r.classList.add("co-non");
    const tete = el("button", "co-ligne"); tete.type = "button"; tete.setAttribute("aria-expanded", ouverts.has(id) ? "true" : "false");
    const g = el("span", "co-texte"), d = el("span", "co-droite");
    g.append(el("span", "co-titre", a.n), el("span", "co-sous", [codesAffiches(a).join(", "), avecGroupe ? D.noms[a.g] : ""].filter(Boolean).join(" · ")));
    d.appendChild(el("span", "co-valeur", p.v)); if (p.sous) d.appendChild(el("span", "co-valeur-sous", p.sous));
    tete.append(g, d, el("span", "co-chevron"));
    r.appendChild(tete);
    const det = el("div", "co-detail"); det.hidden = !ouverts.has(id);
    tete.addEventListener("click", () => {
      const ouvrir = det.hidden; det.hidden = !ouvrir; tete.setAttribute("aria-expanded", ouvrir ? "true" : "false");
      if (ouvrir) { ouverts.add(id); if (!det.childElementCount) detail(a, det); } else ouverts.delete(id);
    });
    if (!det.hidden) detail(a, det);
    r.appendChild(det); return r;
  }

  /* Le détail : tous les prix, la note, puis le manuel de la RAMQ recopié (libellé, avis, règles, éléments de contexte),
     les codes liés et le lien vers la section du manuel. */
  function detail(a, z) {
    const bloc = (titre, cls) => { const b = el("div", "co-bloc" + (cls ? " " + cls : "")); if (titre) b.appendChild(el("h4", null, titre)); z.appendChild(b); return b; };
    if (a.t != null && a.p) {
      const b = bloc("Tous les prix"), ul = el("ul", "co-prix");
      const deux = Array.isArray(a.t), etiq = deux ? (a.d || ["moins de 500", "500 et plus"]) : null;
      const ligne = (nom, base, pct) => {
        if (base == null) return ul.appendChild(el("li", null, `${nom} : à confirmer`));
        const f = x => montant(x * pct / 100);
        ul.appendChild(el("li", null, `${nom} : ${deux ? base.map((x, i) => `${f(x)} (${etiq[i]})`).join(" · ") : f(base)}`));
      };
      if (!a.mixteSeul) { ligne("À l'acte, en cabinet", a.cab, 100); ligne("À l'acte, en établissement", a.t, 100); }
      ligne(`Mixte${a.p < 100 ? ` (${String(a.p).replace(".", ",")} % du tarif en établissement)` : " (payé à 100 %)"}`, a.t, a.p);
      if (!a.mixteSeul) {
        if (a.h === "compris") ul.appendChild(el("li", null, "Horaire : compris dans l'heure"));
        else if (a.h == null) ul.appendChild(el("li", null, "Horaire : à confirmer"));
        else ligne("Horaire, payé en plus des heures", a.h, 100);
      }
      b.appendChild(ul);
    }
    if (a.note) bloc().appendChild(el("p", null, a.note));
    const m = a.m || {};
    // L'essentiel d'abord : l'élément de contexte, les avis propres au code, les codes liés.
    if (m.ctx) { const b = bloc("Élément de contexte à inscrire"), ul = el("ul"); m.ctx.forEach(t => ul.appendChild(el("li", null, t))); b.appendChild(ul); }
    if (m.avis) { const b = bloc("Avis du manuel", "co-avis-ramq"); m.avis.forEach(t => b.appendChild(el("p", null, t))); }
    if (m.lies) {
      const b = bloc("Codes liés"), l = el("div", "co-lies");
      m.lies.forEach(c => {
        const connu = actes.some(x => x.c.includes(c));
        if (!connu) return l.appendChild(el("span", "co-lie co-lie-inconnu", c));
        const bt = el("button", "co-lie", c); bt.type = "button";
        bt.addEventListener("click", () => { q.value = c; groupe = "tous"; rendre(); q.focus(); });
        l.appendChild(bt);
      });
      b.appendChild(l);
    }
    // Puis le texte du manuel, replié : le libellé exact et les règles de la section.
    if (m.lib || m.sec) {
      const r = el("details", "co-bloc co-manuel"); r.appendChild(el("summary", null, "Règles du manuel"));
      if (m.lib) for (const [c, t] of Object.entries(m.lib)) { const p = el("p"); p.append(el("b", null, c + " "), document.createTextNode(t)); r.appendChild(p); }
      for (const an of m.sec || []) {
        const sc = D.manuel.sections[an]; if (!sc) continue;
        if (sc.titre) r.appendChild(el("h4", null, sc.titre));
        sc.texte.forEach(t => r.appendChild(el("p", null, t)));
        sc.avis.forEach(t => { const p = el("p", "co-avis-ramq"); p.append(el("b", null, "Avis : "), document.createTextNode(t)); r.appendChild(p); });
        const lien = el("a", "co-lien", "Section du manuel"); lien.href = `${D.manuel.url}#${an}`; lien.rel = "noopener"; r.appendChild(lien);
      }
      z.appendChild(r);
    }
    const src = el("p", "co-source");
    if (m.ancre) { const a2 = el("a", null, "Voir dans le manuel de la RAMQ"); a2.href = `${D.manuel.url}#${m.ancre}`; a2.rel = "noopener"; src.append(a2, document.createTextNode(" · ")); }
    src.appendChild(document.createTextNode(m.ancre || m.avis || m.sec ? `Manuel consulté le ${D.manuel.consulte_texte}` : "Rien de plus au manuel pour ce code : source manquante."));
    z.appendChild(src);
  }
  function rangeeVuln(v) {
    const r = el("div", "co-rangee co-vuln" + (v.ferme ? " co-non" : "")), g = el("div", "co-texte");
    g.append(el("p", "co-titre", v.note ? `${v.libelle}. ${v.note}` : v.libelle));
    r.append(el("p", "co-code", v.code), g); return r;
  }
  const carte = (titre, compte, rangees) => { const c = el("section", "co-carte"), t = el("div", "co-carte-tete"); t.append(el("h2", null, titre), el("span", "co-compte", compte));
    c.appendChild(t); rangees.forEach(r => c.appendChild(r)); return c; };

  // Chaque mot cherché commence un mot de la fiche ; deux lettres ou moins : mot entier (« FA » trouve la fibrillation
  // auriculaire, pas « forfait ») ; quatre lettres ou plus : aussi au milieu d'un mot (« chirurgie » trouve « cryochirurgie »).
  const debut = (liste, m) => liste.some(w => m.length <= 2 ? w === m : w.startsWith(m));
  const trouverActes = (mots, dans) => actes.filter(a => dans(a) && mots.every(m => debut(a.mots, m) || (m.length > 3 && a.texte.includes(m))));
  const trouverVuln = mots => vuln.filter(v => mots.every(m => debut(v.mots, m)));

  function rendre() {
    if (!D) return;
    const mots = sansAccents(q.value.trim()).split(/[^a-z0-9]+/).filter(Boolean), recherche = mots.length > 0;
    zone.textContent = "";
    groupes.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === groupe ? "true" : "false"));
    if (groupe === "vulnerabilite") {
      const l = trouverVuln(mots);
      if (l.length) zone.appendChild(carte("Codes de vulnérabilité", "de 01 à 20", l.map(rangeeVuln)));
      else zone.appendChild(el("p", "cr-vide", "Aucune catégorie ne correspond."));
      const fermees = l.filter(v => v.ferme).length;
      etat.textContent = `${nb(l.length)} catégorie${l.length > 1 ? "s" : ""}${fermees ? `, dont ${nb(fermees)} fermée${fermees > 1 ? "s" : ""}` : ""}`; return;
    }
    const large = groupe === "tous" || groupe === "frequents";
    const frequents = groupe === "frequents" && !recherche;
    let l = trouverActes(mots, a => frequents ? D.frequents.includes(a.c[0]) : large || a.g === groupe), ailleurs = false;
    // Rien dans le groupe choisi : la recherche porte sur tous les actes, et on le dit.
    if (!l.length && recherche && !large) { l = trouverActes(mots, () => true); ailleurs = l.length > 0; }
    const lv = recherche && large ? trouverVuln(mots) : [];
    etat.textContent = `${nb(l.length)} acte${l.length > 1 ? "s" : ""}${lv.length ? ` · ${nb(lv.length)} code${lv.length > 1 ? "s" : ""} de vulnérabilité` : ""}`;
    if (!l.length && !lv.length) { zone.appendChild(el("p", "cr-vide", "Aucun code ne correspond. Essayez un code (15804) ou un mot (suivi, stérilet, cryochirurgie).")); return; }
    if (ailleurs) zone.appendChild(el("p", "co-avis", `Rien dans « ${D.noms[groupe]} » : voici les résultats des autres groupes.`));
    if (frequents) {
      zone.appendChild(carte("Les plus fréquents", `${nb(l.length)} actes`, l.map(a => rangeeActe(a, true))));
      const tous = el("button", "co-tous", `Voir les ${nb(actes.length)} actes`); tous.type = "button";
      tous.addEventListener("click", () => { groupe = "tous"; rendre(); groupes.querySelector('[data-v="tous"]').focus(); });
      zone.appendChild(tous); return;
    }
    if (recherche) { if (l.length) zone.appendChild(carte("Actes", nb(l.length), l.map(a => rangeeActe(a, true)))); }
    else for (const [g, nom] of D.groupes) { const items = l.filter(a => a.g === g); if (items.length) zone.appendChild(carte(nom, nb(items.length), items.map(a => rangeeActe(a, false)))); }
    if (lv.length) zone.appendChild(carte("Codes de vulnérabilité", nb(lv.length), lv.map(rangeeVuln)));
  }

  fetch("/codes/codes_data.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    D = d; D.noms = Object.fromEntries(d.groupes);
    D.manuel.consulte_texte = new Date(D.manuel.consulte + "T12:00").toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" });
    rendreReglages();
    actes = d.actes.map(a => { const texte = sansAccents([a.n, a.c.join(" "), a.k || "", D.noms[a.g], a.note || ""].join(" ")); return { ...a, texte, mots: texte.split(/[^a-z0-9]+/).filter(Boolean) }; });
    vuln = d.vulnerabilite.map(v => ({ ...v, mots: sansAccents(`${v.code} ${v.libelle} ${v.m} vulnerabilite`).split(/[^a-z0-9]+/).filter(Boolean) }));
    [["frequents", "Les plus fréquents"], ["tous", "Tous les actes"], ...d.groupes].forEach(([v, t]) => {
      const b = el("button", "co-groupe", t); b.type = "button"; b.dataset.v = v;
      b.addEventListener("click", () => { groupe = v; rendre(); });
      groupes.appendChild(b);
    });
    for (const k of ["repertoire", "cnesst", "vulnerabilite"]) $("co-note-" + k).textContent = d.notes[k];
    const p = new URLSearchParams(location.search), depart = p.get("q"), g = p.get("g");
    if (g && (g === "vulnerabilite" || g === "tous" || D.noms[g])) groupe = g;
    rendreVues();
    if (depart) q.value = depart;
    rendre();
  }).catch(() => { etat.textContent = "Les données n'ont pas pu être chargées. Vérifiez la connexion, puis rechargez la page."; });

  q.addEventListener("input", () => { clearTimeout(minuterie); minuterie = setTimeout(rendre, 40); });
})();
