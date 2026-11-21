/* MSK Morand : liste chaque poids (clé, valeur, statut, source) et chaque recommandation de conduite (source) d'une région,
   dans outils/locomoteur/sources/<région>-poids.md. Rien n'est inventé : tout vient du fichier de données.
     node outils/locomoteur/lister-sources.mjs [région]      (genou par défaut) */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const region = process.argv[2] || "genou";
globalThis.window = globalThis;
for (const f of ["locomoteur/moteur.js", "locomoteur/commun.js", `locomoteur/${region}/donnees-${region}.js`]) new Function(fs.readFileSync(path.join(RACINE, f), "utf8"))();
const d = globalThis.Locomoteur.donnees[region], LO = globalThis.Locomoteur;
const nb = x => (x === undefined || x === null ? "—" : Number(x).toLocaleString("fr-CA", { maximumFractionDigits: 2 }));
const pc = x => (x === undefined ? "—" : `${Math.round(x * 100)} %`);
const lignes = [`# ${d.titre} : poids et sources`, "", `Produit par \`node outils/locomoteur/lister-sources.mjs ${region}\` (${d.version}). Ne pas modifier à la main.`, ""];
const n = { provisoire: 0, a_verifier: 0, verifie: 0, valide: 0 };
for (const q of d.questions) for (const e of q.effets) n[e.statut]++;
for (const g of d.grappes || []) n[g.statut]++;
lignes.push(`Poids : ${Object.values(n).reduce((a, b) => a + b, 0)} (validés ${n.valide}, vérifiés ${n.verifie}, à vérifier ${n.a_verifier}, provisoires ${n.provisoire}).`, "");
for (const x of d.diagnostics) {
  lignes.push(`## ${x.nom}`, "", `Probabilité de départ (provisoire) : ${x.base.map(([a, p]) => `${a} ans ${pc(p)}`).join(", ")}${x.sexe ? ` ; ${Object.entries(x.sexe).map(([s, f]) => `${s === "F" ? "femme" : "homme"} ×${nb(f)}`).join(", ")}` : ""}.`, "");
  if (x.repere) lignes.push(`Repères publiés : ${x.repere}.`, "");
  lignes.push("| clé | élément | Se | Sp | RV+ / RV− ou RV | statut | source |", "|---|---|---|---|---|---|---|");
  for (const q of d.questions) for (const e of q.effets) {
    if (e.dx !== x.id) continue;
    const el = e.rv ? q.libelle : LO.elementDe(e);
    const rv = e.rv ? Object.entries(e.rv).map(([v, r]) => `${LO.libelleOption(q, v)} ${nb(r)}`).join(" ; ") : (([p, m]) => `${nb(p)} / ${nb(m)}`)(LO.rvPosNeg(e));
    lignes.push(`| \`${e.cle}\` | ${el} | ${pc(e.se)} | ${pc(e.sp)} | ${rv} | ${e.statut} | ${e.piste || "—"} |`);
  }
  for (const g of (d.grappes || []).filter(g => g.dx === x.id)) lignes.push(`| \`${g.cle}\` | Combinaison : ${g.nom} | ${pc(g.se)} | ${pc(g.sp)} | ${g.rv > 1 ? `${nb(g.rv)} / —` : `— / ${nb(g.rv)}`} | ${g.statut} | ${g.piste || "—"} |`);
  const cond = (x.conduite || []).map(c => (typeof c === "string" ? { t: c } : c));
  if (cond.length) { lignes.push("", "Conduite :"); for (const c of cond) lignes.push(`- ${c.t}${c.src ? ` — *${c.src}*` : ""}`); }
  lignes.push("");
}
if (d.mesures) { lignes.push("## Mesures générales", ""); for (const g of d.mesures) { lignes.push(`${g.titre} :`); for (const c of g.items) lignes.push(`- ${c.t}${c.src ? ` — *${c.src}*` : ""}`); lignes.push(""); } }
const sortie = path.join(RACINE, "outils/locomoteur/sources", `${region}-poids.md`);
fs.writeFileSync(sortie, lignes.join("\n"));
console.log(`${path.relative(RACINE, sortie)} : ${lignes.length} lignes`);
