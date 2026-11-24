/* Morand — Entraînement clinique : applique l'audit des cartes (pertinence, niveau, énoncé corrigé, définition, retrait)
   et ajoute les nouvelles cartes tirées des fiches résumées ou du document OpenEvidence du 21 novembre.
     node outils/entrainement/appliquer-audit.mjs
   À relancer après convertir-base.py ou appliquer-decisions.mjs. Lit outils/entrainement/audit/<région>.txt :

     @ msk-cervical CERV                  paquet de la banque, préfixe des nouvelles cartes
     & Rachis lombaire et dorsal          (facultatif) nouveau nom de la région, pour toutes ses cartes
     = C1 1                               source C1 (ou oe21:<rang>) = diagnostic 1 de la banque (sinon : nommé d'après la source)
     001-04 3 D | e: Âge plus avancé      carte MSK-001-04 : pertinence, niveau, puis champs facultatifs
     009-06 0 - | r: Mesure d'IRM de recherche…
     + C1 epi 1 L ↑ demo | Sexe féminin   nouvelle carte : source, rubrique, pertinence, niveau, réponse, type | énoncé

   Pertinence (médecin de famille d'abord, médecin du sport ensuite) : 1 essentielle, 2 importante, 3 complémentaire,
   4 pointue (surtout médecine du sport) ; 0 retirée du jeu (la carte reste dans la banque, avec la raison « r: »).
   Niveau : L léger, M modéré, D difficile (champ « difficulte » : 1, 2, 3).
   Champs facultatifs : « e: » énoncé corrigé (l'ancien est gardé dans « enonce_source »), « def: » courte définition
   affichée sous l'énoncé, « r: » raison du retrait.
   Nouvelle carte : la source est une fiche résumée (C1, rubrique epi, pre, exa, phy, dif, inv, tra, pro) ou un élément du
   document du 21 novembre (oe21:<rang>, rubrique « - ») ; l'explication est la phrase de la source, telle quelle, avec
   ses références. Aucun chiffre n'est ajouté : la carte ne donne que le sens (↑ ↔ ↓) que la phrase énonce.
   Une vérification du 24 novembre (oe24:<rang>, rubrique « - ») est en anglais : la carte porte alors « x: », la traduction
   fidèle du passage utilisé (mêmes chiffres), qui devient l'explication. « x: » peut aussi préciser une autre source.
   Une décision « remise » du mode éditeur (outils/entrainement/decisions.json) remet une carte retirée dans le jeu. */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const lire = f => JSON.parse(fs.readFileSync(path.join(RACINE, f), "utf8"));
const hy = lire("locomoteur/donnees/hy.json"), oe21 = lire("locomoteur/donnees/oe21.json"), oe24 = lire("locomoteur/donnees/oe24.json");
const decisionsF = path.join(RACINE, "outils/entrainement/decisions.json");
const decisions = fs.existsSync(decisionsF) ? JSON.parse(fs.readFileSync(decisionsF, "utf8")) : {};
const REP = { "↑": "increase", "↔": "neutral", "↓": "decrease" }, NIV = { L: 1, M: 2, D: 3 };
const TYPES = { demo: "Facteurs démographiques", anam: "Anamnèse", exam: "Examen physique", test: "Tests spécifiques", imag: "Imagerie",
  labo: "Laboratoire", risq: "Facteurs de risque", evol: "Évolution temporelle", trait: "Réponse aux traitements", drap: "Drapeaux rouges" };
const RUBRIQUES = { epi: "Épidémiologie", pre: "Présentation clinique", exa: "Examen physique", phy: "Physiopathologie", dif: "Diagnostic différentiel",
  inv: "Investigations", tra: "Traitement", pro: "Pronostic" };
const REGION_HY = { "msk-cervical": "cervical", "msk-lombaire": "lombaire", "msk-epaule": "epaule", "msk-coude": "coude", "msk-poignet": "poignet",
  "msk-hanche": "hanche", "msk-genou": "genou", "msk-cheville": "cheville", "msk-pied": "pied" };

const dossier = path.join(RACINE, "outils/entrainement/audit");
const index = lire("entrainement/banque/index.json");
const erreurs = [], bilan = [];
for (const f of fs.readdirSync(dossier).filter(x => x.endsWith(".txt")).sort()) {
  const lignes = fs.readFileSync(path.join(dossier, f), "utf8").split("\n");
  const tete = lignes.find(l => l.startsWith("@ "));
  if (!tete) { erreurs.push(`${f} : ligne « @ paquet PRÉFIXE » manquante`); continue; }
  const [, cle, prefixe] = tete.split(/\s+/);
  const entree = index.paquets.find(p => p.cle === cle);
  if (!entree) { erreurs.push(`${f} : paquet ${cle} inconnu`); continue; }
  const fichier = path.join(RACINE, entree.fichier), paquet = JSON.parse(fs.readFileSync(fichier, "utf8"));
  // Repartir de la banque convertie : on retire les nouvelles cartes et les champs d'un audit précédent.
  paquet.cartes = paquet.cartes.filter(c => !c.origine);
  for (const c of paquet.cartes) {
    if (c.enonce_source) { c.enonce = c.enonce_source; delete c.enonce_source; }
    for (const k of ["pertinence", "retrait", "definition", "audit"]) delete c[k];
  }
  for (const k of Object.keys(paquet.references)) if (/^[hov]\d+$/.test(k)) delete paquet.references[k];
  const parId = new Map(paquet.cartes.map(c => [c.id, c])), dxParNo = new Map(paquet.cartes.map(c => [c.diagnostic.no, c.diagnostic]));
  const fiches = new Map(), compte = {}, vues = new Set();
  const champs = reste => Object.fromEntries(reste.map(s => s.trim()).filter(Boolean).map(s => { const m = s.match(/^(e|def|r|x):\s*(.+)$/); if (!m) erreurs.push(`${f} : champ illisible « ${s} »`); return m ? [m[1], m[2].trim()] : ["?", s]; }));
  const ref = (pre, liste, i) => { const k = `${pre}${i}`, r = liste[i]; if (r) paquet.references[k] = { n: k, texte: r.t, ...(r.u ? { url: r.u } : {}) }; return k; };
  for (const [no, brute] of lignes.entries()) {
    const l = brute.trim();
    if (!l || l.startsWith("#") || l.startsWith("@ ")) continue;
    const ou = `${f}:${no + 1}`;
    if (l.startsWith("= ")) { const [, code, dx] = l.split(/\s+/); fiches.set(code, dx === "-" ? null : +dx); continue; }
    if (l.startsWith("& ")) { const nom = l.slice(2).trim(); paquet.region = entree.region = nom; for (const c of paquet.cartes) c.region = nom; continue; }
    if (l.startsWith("+ ")) {
      const [avant, enonce, ...reste] = l.slice(2).split("|").map(s => s.trim());
      const [src, rub, p, niv, fl, ty] = avant.split(/\s+/), opt = champs(reste);
      if (!REP[fl] || !TYPES[ty] || !(+p >= 0 && +p <= 4) || !NIV[niv] || !enonce) { erreurs.push(`${ou} : nouvelle carte illisible`); continue; }
      let item, refs, sourceTexte, nomDx;
      if (src.startsWith("oe21:")) {
        item = oe21.items[+src.slice(5)];
        if (!item) { erreurs.push(`${ou} : élément ${src} introuvable`); continue; }
        refs = item.refs.map(i => ref("o", oe21.refs, i)); sourceTexte = `Document OpenEvidence du 21 novembre 2026 (${item.cat.split(" · ")[0].toLowerCase()})`; nomDx = item.dx;
      } else if (src.startsWith("oe24:")) {
        item = oe24.items[+src.slice(5)];
        if (!item || !opt.x) { erreurs.push(`${ou} : élément ${src} introuvable, ou explication traduite (x:) manquante`); continue; }
        refs = item.refs.map(i => ref("v", oe24.refs, i)); sourceTexte = "Vérification OpenEvidence du 24 novembre 2026 (fréquence de départ)"; nomDx = item.dx;
      } else {
        item = hy.items.find(x => x.r === REGION_HY[cle] && x.code === `Fiche ${src}` && x.cat.split(" · ")[1].startsWith(RUBRIQUES[rub] || "?"));
        if (!item) { erreurs.push(`${ou} : fiche ${src} (${rub}) introuvable`); continue; }
        refs = item.refs.map(i => ref("h", hy.refs, i)); sourceTexte = `Fiche résumée ${src} (${RUBRIQUES[rub].toLowerCase()})`; nomDx = item.dx;
      }
      const dxNo = fiches.has(src) ? fiches.get(src) : null;
      const diagnostic = dxNo !== null && dxNo !== undefined && dxParNo.has(dxNo) ? dxParNo.get(dxNo) : { no: null, nom: nomDx };
      const base = src.replace(/^oe21:/, "O").replace(/^oe24:/, "V").toUpperCase().replace(/^([A-Z]+)(\d)$/, "$10$2");
      compte[base] = (compte[base] || 0) + 1;
      paquet.cartes.push({
        id: `MSK-${prefixe}-${base}-${String(compte[base]).padStart(2, "0")}`, domaine: "MSK", region: paquet.region, diagnostic,
        type: TYPES[ty], enonce, reponse: REP[fl], explication: opt.x || item.t, donnee: { nature: sourceTexte.startsWith("Fiche") ? "Fiche résumée" : "OpenEvidence" },
        references: refs, difficulte: NIV[niv], pertinence: +p, ...(opt.def ? { definition: opt.def } : {}), ...(opt.r ? { retrait: opt.r } : {}),
        statut: "en_revision", valide_le: null, source: sourceTexte, origine: src.startsWith("oe2") ? src.slice(0, 4) : "fiche",
      });
      continue;
    }
    const [avant, ...reste] = l.split("|");
    const [id, p, niv] = avant.trim().split(/\s+/), opt = champs(reste), c = parId.get(`MSK-${id}`);
    if (!c) { erreurs.push(`${ou} : carte MSK-${id} introuvable dans ${cle}`); continue; }
    if (vues.has(c.id)) erreurs.push(`${ou} : carte ${c.id} jugée deux fois`); vues.add(c.id);
    if (!(+p >= 0 && +p <= 4) || (+p > 0 && !NIV[niv])) { erreurs.push(`${ou} : pertinence ou niveau illisible`); continue; }
    if (+p === 0 && !opt.r) erreurs.push(`${ou} : retrait sans raison`);
    c.pertinence = +p;
    if (NIV[niv]) c.difficulte = NIV[niv];
    if (opt.e) { c.enonce_source = c.enonce; c.enonce = opt.e; }
    if (opt.def) c.definition = opt.def;
    if (opt.r) c.retrait = opt.r;
  }
  // Une carte retirée que l'éditeur a remise dans le jeu y revient (pertinence 4 si l'audit l'avait mise à 0).
  for (const c of paquet.cartes) {
    if (c.retrait && decisions[c.id] && decisions[c.id].statut === "remise") { c.remise = decisions[c.id].date || true; c.retrait_audit = c.retrait; delete c.retrait; if (!c.pertinence) c.pertinence = 4; }
  }
  const nonJugees = paquet.cartes.filter(c => !c.origine && c.pertinence === undefined).map(c => c.id);
  entree.cartes = paquet.cartes.length;
  entree.experimentales = paquet.cartes.filter(c => c.statut === "experimentale").length;
  entree.retirees = paquet.cartes.filter(c => c.retrait).length;
  entree.jouables = paquet.cartes.filter(c => c.statut !== "experimentale" && !c.retrait).length;
  entree.diagnostics = new Set(paquet.cartes.map(c => c.diagnostic.nom)).size;
  paquet.diagnostics = [...new Map(paquet.cartes.map(c => [c.diagnostic.nom, c.diagnostic])).values()];
  fs.writeFileSync(fichier, JSON.stringify(paquet, null, 0));
  bilan.push(`${cle} : ${paquet.cartes.length} cartes (${paquet.cartes.filter(c => c.origine).length} nouvelles), ${entree.retirees} retirées, ${entree.jouables} jouables`
    + (nonJugees.length ? `, ${nonJugees.length} pas encore jugées` : ""));
}
fs.writeFileSync(path.join(RACINE, "entrainement/banque/index.json"), JSON.stringify(index, null, 1));
console.log(bilan.join("\n"));
if (erreurs.length) { console.log(erreurs.join("\n")); console.log(`${erreurs.length} erreur(s)`); process.exit(1); }
