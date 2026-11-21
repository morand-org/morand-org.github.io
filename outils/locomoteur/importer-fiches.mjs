/* Locomoteur Morand : importe les fiches MSK (série athlète, 70 fiches ; série 50 ans et plus, 90 fiches) dans
   locomoteur/fiches.json, pour les afficher à côté des diagnostics.
     node outils/locomoteur/importer-fiches.mjs <dossier fiches/> <dossier fiches50/>
   Lit data/*.txt (format « @@ région rang no », « titre: », « ## section », « - élément ») et data/*.json.
   Ne garde que le texte : pas les dessins anatomiques. HTML limité à <b>, <i>, <em>, <strong>, <sub>, <sup>, <br>. */
import fs from "node:fs";
import path from "node:path";

const [athlete, cinquante] = process.argv.slice(2);
if (!athlete || !cinquante) { console.error("Usage : node outils/locomoteur/importer-fiches.mjs <fiches/> <fiches50/>"); process.exit(1); }
const SORTIE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../locomoteur/fiches.json");
const LISTES = new Set(["facteurs", "ddx", "clinique", "declencheurs", "examen", "imagerie", "redflags", "traitement", "pearls", "rhumato"]);
const REGION = { rachis_cervical: "cervical", rachis_lombaire: "lombaire" };

// Texte sûr : tout est échappé, sauf quelques balises de mise en forme sans attribut.
const PERMIS = /^<\/?(b|i|em|strong|sub|sup)>$|^<br\s*\/?>$/i;
const propre = s => String(s).split(/(<[^>]*>)/).map(x => (x.startsWith("<") ? (PERMIS.test(x) ? x.toLowerCase() : "") : x.replace(/<|>/g, c => (c === "<" ? "&lt;" : "&gt;")))).join("").trim();

function lire(texte, serie) {
  const fiches = []; let f = null, sec = null;
  for (const brute of texte.split(/\r?\n/)) {
    const ligne = brute.trimEnd();
    if (!ligne.trim() || ligne.trimStart().startsWith("#!")) continue;
    if (ligne.startsWith("@@")) {
      const [cle, rang, no] = ligne.slice(2).trim().split(/\s+/);
      f = { id: `${serie}-${no}`, serie, region: REGION[cle] || cle, no: +no, rang: +rang, titre: "", abbr: "", accroche: "", stats: [], info: null };
      for (const s of LISTES) f[s] = [];
      fiches.push(f); sec = null; continue;
    }
    if (ligne.startsWith("## ")) { sec = ligne.slice(3).trim(); if (!LISTES.has(sec)) throw new Error(`Section inconnue : ${sec}`); continue; }
    if (ligne.startsWith("- ") && sec) {
      const item = ligne.slice(2).trim();
      if (sec === "ddx") { const [n, ...d] = item.split("|"); f.ddx.push([propre(n), propre(d.join("|"))]); }
      else if (sec === "rhumato") { const ps = item.split("|").map(propre); f.rhumato.push([ps[0] || "", ps[1] || "", ps[2] || ""]); }
      else f[sec].push(propre(item));
      continue;
    }
    const m = ligne.match(/^(\w+):\s?(.*)$/);
    if (!m) throw new Error(`Ligne non reconnue : ${ligne}`);
    const [, cle, val] = m, ps = val.split("|").map(x => x.trim());
    sec = null;
    if (["titre", "abbr", "accroche"].includes(cle)) f[cle] = propre(val);
    else if (cle === "chips") f.declencheurs = ps.map(propre);
    else if (cle === "stat") f.stats.push({ v: propre(ps[0]), l: propre(ps[1] || ""), s: propre(ps[2] || "") });
    else if (cle === "info") f.info = { type: ps[0], titre: propre(ps[1] || ""), note: propre(ps[ps[0] === "bars" ? 3 : 2] || ""), items: [] };
    else if (cle === "rule" || cle === "kv") f.info.items.push(ps.map(propre));
    else if (cle === "step") f.info.items.push([propre(ps[2] || ""), propre(ps[3] || "")]);
    else if (cle === "bar") f.info.items.push([propre(ps[0]), propre(ps[2] || ps[1])]);
    // anat, hl, lab, refs : dessins et références internes, non repris.
  }
  return fiches;
}
function lireJson(fichier, serie) {
  return JSON.parse(fs.readFileSync(fichier, "utf8")).map(x => {
    const f = { id: `${serie}-${x.no}`, serie, region: REGION[x.region_key] || x.region_key, no: x.no, rang: x.rang, titre: propre(x.titre), abbr: propre(x.abbr || ""),
      accroche: propre(x.accroche || ""), stats: (x.stats || []).map(s => ({ v: propre(s.v), l: propre(s.l), s: propre(s.s || "") })), info: null };
    for (const s of LISTES) f[s] = (x[s] || []).map(it => (Array.isArray(it) ? it.map(propre) : propre(it)));
    if (x.infographie) f.info = { type: x.infographie.type || "bars", titre: propre(x.infographie.titre || ""), note: propre(x.infographie.note || ""),
      items: (x.infographie.items || []).map(it => (Array.isArray(it) ? it.map(propre) : [propre(it.l || ""), propre(it.t || it.d || "")])) };
    return f;
  });
}
const toutes = [];
for (const [dossier, serie] of [[athlete, "athlete"], [cinquante, "50plus"]]) {
  const data = path.join(dossier, "data");
  for (const nom of fs.readdirSync(data).sort()) {
    if (nom.startsWith("_")) continue;
    const f = path.join(data, nom);
    if (nom.endsWith(".txt")) toutes.push(...lire(fs.readFileSync(f, "utf8"), serie));
    else if (nom.endsWith(".json")) toutes.push(...lireJson(f, serie));
  }
}
toutes.sort((a, b) => (a.serie === b.serie ? a.no - b.no : a.serie < b.serie ? -1 : 1));
const ids = new Set(); for (const f of toutes) { if (ids.has(f.id)) throw new Error(`Fiche en double : ${f.id}`); ids.add(f.id); }
const sortie = { source: "Fiches MSK (série athlète et série 50 ans et plus), contenu rédigé de mémoire, à valider.", fiches: Object.fromEntries(toutes.map(f => [f.id, f])) };
fs.writeFileSync(SORTIE, JSON.stringify(sortie));
const parRegion = {}; for (const f of toutes) parRegion[f.region] = (parRegion[f.region] || 0) + 1;
console.log(`${toutes.length} fiches → ${path.relative(process.cwd(), SORTIE)} (${Math.round(fs.statSync(SORTIE).size / 1024)} Ko)`, parRegion);
