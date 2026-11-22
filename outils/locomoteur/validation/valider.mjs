/* MSK Morand : validation par vignettes.
     node outils/locomoteur/validation/valider.mjs [--detail]
   Pour chaque vignette (cas-vignettes.mjs) : rang du diagnostic de référence, présence d'un différentiel acceptable dans
   les 5 premiers, et, pour les drapeaux rouges, alerte urgente ou rapide déclenchée ou diagnostic grave affiché (« À ne
   pas manquer », 1 % ou plus). Écrit aussi le rapport dans outils/locomoteur/validation/rapport.md. */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
globalThis.window = globalThis;
const charger = f => new Function(fs.readFileSync(path.join(RACINE, f), "utf8"))();
charger("locomoteur/moteur.js"); charger("locomoteur/commun.js");
for (const x of fs.readdirSync(path.join(RACINE, "locomoteur"), { withFileTypes: true }).filter(x => x.isDirectory())) {
  const f = `locomoteur/${x.name}/aide-memoire-${x.name}.js`; if (fs.existsSync(path.join(RACINE, f))) charger(f);
}
const LO = globalThis.Locomoteur, detail = process.argv.includes("--detail");
const cas = (await import("./cas-vignettes.mjs")).default;
const vignettes = JSON.parse(fs.readFileSync(path.join(RACINE, "outils/locomoteur/validation/vignettes-2026-11-22.json"), "utf8"));
const charges = new Set();
const t = { n: 0, top1: 0, top3: 0, acc5: 0, dr: 0, drOk: 0, fausses: 0 };
const lignes = ["| n° | région | référence | rang | probabilité | 3 premiers | drapeau rouge | alertes |", "|---|---|---|---|---|---|---|---|"];
for (const c of cas) {
  if (!charges.has(c.region)) { charger(`locomoteur/${c.region}/donnees-${c.region}.js`); charges.add(c.region); }
  const d = LO.donnees[c.region], r = LO.calculer(d, c.rep), L = r.diagnostics, v = vignettes[c.no - 1];
  for (const k of Object.keys(c.rep)) {
    if (!d.parQ[k]) throw new Error(`Vignette ${c.no} : question inconnue « ${k} »`);
    if (d.parQ[k].type === "miroir") throw new Error(`Vignette ${c.no} : « ${k} » recopie « ${d.parQ[k].cible} » ; saisir celle-ci`);
  }
  const rang = c.ref.length ? Math.min(...c.ref.map(id => { const i = L.findIndex(x => x.x.id === id); return i < 0 ? 99 : i + 1; })) : null;
  const p = rang && rang < 99 ? L[rang - 1].p : null;
  const acc5 = L.slice(0, 5).some(x => c.ref.includes(x.x.id) || c.acc.includes(x.x.id));
  const urgentes = r.alertes.filter(a => a.niveau === "urgence" || a.niveau === "rapide");
  const graveVu = c.ref.some(id => { const x = L.find(y => y.x.id === id); return x && x.x.grave && x.p >= .01; });
  if (c.ref.length) { t.n++; if (rang === 1) t.top1++; if (rang <= 3) t.top3++; if (acc5) t.acc5++; }
  let drTexte = "—";
  if (c.dr) { t.dr++; const ok = urgentes.length > 0 || graveVu; if (ok) t.drOk++; drTexte = ok ? (urgentes.length ? "détecté (alerte)" : "détecté (à ne pas manquer)") : "**manqué**"; }
  else if (urgentes.some(a => a.niveau === "urgence")) { t.fausses++; drTexte = "alerte urgente sans drapeau"; }
  const top3 = L.slice(0, 3).map(x => `${x.x.id} ${Math.round(x.p * 100)} %`).join(", ");
  lignes.push(`| ${c.no} | ${c.region} | ${v.diagnostic_de_reference} (${c.ref.join(", ") || "hors liste"}) | ${rang === null ? "—" : rang === 99 ? "absent" : rang} | ${p === null ? "—" : `${Math.round(p * 100)} %`} | ${top3} | ${drTexte} | ${r.alertes.map(a => `${a.niveau} : ${a.titre}`).join(" ; ") || "—"} |`);
  if (detail) console.log(`\n#${c.no} ${c.region} ${v.diagnostic_de_reference} → rang ${rang}\n  ${L.slice(0, 6).map(x => `${x.x.id} ${Math.round(x.p * 100)}`).join(" · ")}\n  alertes : ${r.alertes.map(a => `${a.niveau}:${a.titre}`).join(" | ") || "—"}`);
}
const pct = (a, b) => `${a}/${b} (${Math.round((a / b) * 100)} %)`;
const resume = [`Diagnostic de référence en tête : ${pct(t.top1, t.n)}`, `Dans les 3 premiers : ${pct(t.top3, t.n)}`,
  `Référence ou différentiel acceptable dans les 5 premiers : ${pct(t.acc5, t.n)}`, `Drapeaux rouges détectés : ${pct(t.drOk, t.dr)}`,
  `Alertes urgentes sans drapeau rouge : ${t.fausses}`];
fs.writeFileSync(path.join(RACINE, "outils/locomoteur/validation/rapport.md"), ["# Validation par vignettes", "",
  "Produit par `node outils/locomoteur/validation/valider.mjs`. Vignettes : vignettes-2026-11-22.json (32 cas rédigés par ChatGPT), transcrites dans cas-vignettes.mjs.", "",
  ...resume.map(x => `- ${x}`), "", ...lignes, ""].join("\n"));
console.log(resume.join("\n"));
