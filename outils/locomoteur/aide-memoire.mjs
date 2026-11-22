/* MSK Morand : produit locomoteur/aide-memoire.js à partir du document OpenEvidence archivé (parties F et H).
   Pour chaque région : le bloc commun (mesures générales) et chaque fiche de conduite (investigation, traitement, suivi,
   retour ou référence), avec les sources de la fiche correspondante de la partie F quand elle existe.
     node outils/locomoteur/aide-memoire.mjs
   Les fichiers de données relient leurs diagnostics aux fiches par leur numéro (C.aideMemoire). */
import fs from "node:fs";
import path from "node:path";
import { quebeciser } from "./termes-quebec.mjs";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const DOS = path.join(RACINE, "outils/locomoteur/sources/2026-11-21-openevidence");
const H = fs.readFileSync(path.join(DOS, "H-aide-memoire-quebec.md"), "utf8").split("\n");
const F = fs.readFileSync(path.join(DOS, "F-conduites.md"), "utf8").split("\n");

// Références de la partie F : « 12. [Titre](url). Auteurs. Revue. Année… »
const refs = {};
for (const l of F) {
  const m = l.match(/^(\d+)\.\s+\[(.+?)\]\((.+?)\)\. (.*)$/);
  if (!m) continue;
  const [, n, , url, cit] = m;
  const auteur = cit.split(",")[0].split(" ")[0], an = (cit.match(/\b(19|20)\d\d\b/) || [""])[0];
  const revue = (cit.split(". ")[1] || "").split(/ ?[:(]/)[0].replace(/^The /, "").trim();
  const pmid = (url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/) || [])[1];
  refs[n] = `${auteur}${cit.includes(",") ? " et coll." : ""}, ${an}${revue ? `, ${revue}` : ""}${pmid ? ` (PMID ${pmid})` : ""}`;
}
const net = s => s.replace(/\[\\\[(\d+)\\\]\]\([^)]*\)(\S*\))?/g, "").replace(/\\([<>*_\[\]])/g, "$1").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
const numeros = s => [...s.matchAll(/\[\\\[(\d+)\\\]\]/g)].map(m => m[1]);

// Partie F : fiches « **N. Titre** » par région (« ## Coude (21 fiches) »).
const regionsF = { "Coude": "coude", "Poignet": "poignet", "Main": "main", "Hanche et aine": "hanche", "Genou": "genou", "Cheville et jambe": "cheville", "Pied": "pied" };
const ficheF = {};
let rF = null, nF = null;
for (const l of F) {
  const t = l.match(/^## (.+?) \(\d+ fiches\)/);
  if (t) { rF = regionsF[t[1]] || null; nF = null; if (rF) ficheF[rF] = {}; continue; }
  if (/^## /.test(l)) { rF = null; continue; }
  if (!rF) continue;
  const f = l.match(/^\*\*(\d+)\. (.+?)\*\*/);
  if (f) { nF = f[1]; ficheF[rF][nF] = { titre: net(f[2]), puces: [], refs: [] }; continue; }
  if (nF && /^- \*\*/.test(l)) { ficheF[rF][nF].puces.push(net(l.slice(2))); ficheF[rF][nF].refs.push(...numeros(l)); }
}

// Partie H : régions dans l'ordre du document, chacune ouverte par « ## Bloc commun ».
const ordreH = ["cervical", "dorsal", "lombaire", "epaule", "main", "coude", "genou", "hanche", "pied", "cheville"];
const sortie = {};
let iR = -1, zone = null, n = null;
for (const l of H) {
  if (/^## Bloc commun/.test(l)) { iR++; zone = "commun"; sortie[ordreH[iR]] = { commun: [], fiches: {}, sources: "" }; continue; }
  if (iR < 0) continue;
  const R = sortie[ordreH[iR]];
  const f = l.match(/^### (\d+)(?:–(\d+))?\. (.+)$/);
  if (f) { zone = "fiche"; n = f[1]; R.fiches[n] = { titre: net(f[3]).replace(/ †$/, ""), principes: / †$/.test(f[3]), items: [] }; if (f[2]) R.fiches[f[2]] = R.fiches[n]; continue; }
  if (/^\*Sources principales/.test(l)) { R.sources = net(l.replace(/^\*|\*$/g, "")); zone = null; continue; }
  if (!/^- /.test(l)) continue;
  const t = net(l.slice(2));
  if (zone === "commun") R.commun.push(t);
  else if (zone === "fiche") R.fiches[n].items.push(t);
}
// Poignet : pas de section dans la partie H ; on reprend les fiches de la partie F.
sortie.poignet = { commun: [], fiches: {}, sources: "Fiches de la partie F (pas d'aide-mémoire détaillé pour le poignet dans le document)." };
for (const [k, x] of Object.entries(ficheF.poignet || {})) sortie.poignet.fiches[k] = { titre: x.titre.replace(/ †$/, ""), principes: / †$/.test(x.titre), items: x.puces };
// Sources de chaque fiche : références de la fiche F au titre le plus proche (l'ordre diffère parfois entre F et H).
const mots = t => new Set(t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/).filter(w => w.length > 3 && !["fracture", "fractures", "lesion", "syndrome", "maladie"].includes(w)));
const proche = (t, liste) => {
  const a = mots(t); let mieux = null, score = 0;
  for (const [k, x] of Object.entries(liste)) {
    const b = mots(x.titre), inter = [...a].filter(w => b.has(w)).length, s = inter / Math.min(a.size || 1, b.size || 1);
    if (s > score) { score = s; mieux = k; }
  }
  return score >= 0.5 ? mieux : null;
};
const douteux = [];
for (const [r, x] of Object.entries(sortie)) for (const [k, fi] of Object.entries(x.fiches)) {
  if (!ficheF[r] || r === "poignet") { if (r === "poignet") fi.src = [...new Set(ficheF.poignet[k].refs)].map(m => refs[m]).filter(Boolean).join(" ; "); continue; }
  const kF = proche(fi.titre, ficheF[r]);
  if (!kF) { douteux.push(`${r} ${k} « ${fi.titre} » : aucune fiche F correspondante`); continue; }
  fi.src = [...new Set(ficheF[r][kF].refs)].map(m => refs[m]).filter(Boolean).join(" ; ");
}
// Un fichier par région de l'outil (poignet et main ensemble).
const fichiers = { cervical: ["cervical"], epaule: ["epaule"], coude: ["coude"], poignet: ["poignet", "main"], lombaire: ["lombaire", "dorsal"], hanche: ["hanche"], cheville: ["cheville"], pied: ["pied"] };
for (const [dossier, cles] of Object.entries(fichiers)) {
  const contenu = Object.fromEntries(cles.map(c => [c, sortie[c]]));
  fs.mkdirSync(path.join(RACINE, "locomoteur", dossier), { recursive: true });
  fs.writeFileSync(path.join(RACINE, "locomoteur", dossier, `aide-memoire-${dossier}.js`), `/* Produit par node outils/locomoteur/aide-memoire.mjs. Ne pas modifier à la main.
   Aide-mémoire de première ligne (Québec) du document OpenEvidence du 21 novembre 2026 (parties F et H), archivé dans
   outils/locomoteur/sources/2026-11-21-openevidence/. « principes » : conduite fondée sur les principes généraux (†). Termes de l'usage québécois (termes-quebec.mjs). */
(function () { const A = ((window.Locomoteur = window.Locomoteur || {}).aideMemoire = window.Locomoteur.aideMemoire || {});
  Object.assign(A, ${quebeciser(JSON.stringify(contenu))});
})();
`);
}
console.log(Object.entries(sortie).map(([r, x]) => `${r} : ${Object.keys(x.fiches).length} fiches (${Object.values(x.fiches).filter(f => f.src).length} avec sources), bloc commun ${x.commun.length}`).join("\n"));
if (douteux.length) console.log("Sans source :\n" + douteux.join("\n"));
