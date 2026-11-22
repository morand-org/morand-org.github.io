/* MSK Morand : liste de ce qu'OpenEvidence doit vérifier, tirée des fichiers de données (rien n'est inventé).
     node outils/locomoteur/a-verifier-openevidence.mjs
   Écrit outils/locomoteur/delegation/openevidence-a-verifier.md : par région, des consignes prêtes à coller dans
   OpenEvidence (en anglais : il y répond mieux), chaque élément avec un code (ex. CERV-P12) pour rapporter la réponse.
   Ordre : 1) fréquences de départ, 2) poids « à vérifier » et combinaisons non vérifiées, 3) poids provisoires forts
   (RV de 5 ou plus, ou de 0,2 ou moins), qui pèsent le plus sur le calcul. */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
globalThis.window = globalThis;
const charger = f => new Function(fs.readFileSync(path.join(RACINE, f), "utf8"))();
charger("locomoteur/moteur.js"); charger("locomoteur/commun.js");
for (const x of fs.readdirSync(path.join(RACINE, "locomoteur"), { withFileTypes: true }).filter(x => x.isDirectory())) {
  const f = `locomoteur/${x.name}/aide-memoire-${x.name}.js`; if (fs.existsSync(path.join(RACINE, f))) charger(f);
}
const LO = globalThis.Locomoteur;
const REGIONS = [["cervical", "CERV"], ["epaule", "EPAU"], ["coude", "COUD"], ["poignet", "POIG"], ["lombaire", "LOMB"], ["hanche", "HANC"], ["genou", "GENO"], ["cheville", "CHEV"], ["pied", "PIED"]];
const SEUIL = Math.log(5), PAR_CONSIGNE = 25;
// Questions de contexte : leurs poids forts traduisent la définition du diagnostic (une fracture aiguë ne dure pas depuis
// 3 mois, une entorse est traumatique), pas une donnée publiée. On ne les soumet pas, sauf s'ils sont « à vérifier ».
const CONTEXTE = new Set(["cote", "duree", "apparition", "mecanisme", "premier", "visite"]);
const nb = x => Number(x).toLocaleString("en-CA", { maximumFractionDigits: 2 });
const pc = x => (x >= .01 || x === 0 ? `${Math.round(x * 100)}%` : `${Number((x * 100).toPrecision(1))}%`);

const FORMAT_POIDS = `Answer as one table, one row per code, with columns: code | sensitivity | specificity | LR+ | LR− (95% CI if available) | population and setting (primary care, sports medicine, emergency, orthopedics) | reference standard | source (first author, journal, year, PMID). Prefer meta-analyses, then the best primary-care or sports-medicine study. If no study gives the accuracy of a finding, write "no data" for that code; do not estimate.`;
const FORMAT_FREQ = `Answer as one table, one row per code, with columns: code | proportion among these patients (by age group 12–17, 18–39, 40–59, 60+ if available) | sex ratio | setting | source (first author, journal, year, PMID). Write "no data" when none exists; do not estimate.`;

const sortie = ["# Ce qu'OpenEvidence doit vérifier", "",
  `Produit par \`node outils/locomoteur/a-verifier-openevidence.mjs\` à partir des fichiers de données. Ne pas modifier à la main.`, "",
  "**Comment faire.** Coller chaque bloc tel quel dans OpenEvidence, un bloc par question, puis me renvoyer les réponses (le tableau et ses références). Les codes (ex. `CERV-P12`) me permettent de remettre chaque chiffre au bon endroit et de le marquer « vérifié » avec sa source.", "",
  "**Ordre suggéré.** 1) Fréquences de départ de chaque région (elles fixent le point de départ de tous les calculs). 2) Poids « à vérifier » et combinaisons non vérifiées. 3) Poids provisoires forts (rapport de vraisemblance de 5 ou plus, ou de 0,2 ou moins) : ce sont ceux qui déplacent le plus les probabilités. Les poids du contexte (côté, durée, mode d'apparition, mécanisme) ne sont pas soumis : ils traduisent la définition du diagnostic (une fracture aiguë ne dure pas depuis trois mois), pas une donnée publiée.", "",
  "Les valeurs actuelles sont données à OpenEvidence pour qu'il les confirme ou les corrige ; une réponse « no data » est utile aussi (le poids reste provisoire et prudent).", ""];
const sommaire = [];

for (const [region, code] of REGIONS) {
  const f = `locomoteur/${region}/donnees-${region}.js`;
  if (!fs.existsSync(path.join(RACINE, f))) continue;
  charger(f);
  const d = LO.donnees[region], en = id => (d.anglais && d.anglais[id]) || d.parDx[id].nom;
  const plainte = d.en || d.partie, blocs = [];

  // 1. Fréquences de départ.
  const freq = d.diagnostics.filter(x => !x.residuel).map((x, i) => `${code}-F${i + 1}. ${en(x.id)} — current estimate: ${x.base.map(([a, p]) => `${a} y ${pc(p)}`).join(", ")}${x.sexe ? `; ${Object.entries(x.sexe).map(([s, k]) => `${s === "F" ? "women" : "men"} ×${nb(k)}`).join(", ")}` : ""}`);
  blocs.push({ titre: "Fréquences de départ", n: freq.length, texte: `Among patients ${d.ages === "12 ans et plus" ? "12 years and older" : d.ages} consulting in primary care or sports medicine for ${plainte} pain, what proportion has each of the following diagnoses? Our current estimates of the proportion by age are given; confirm or correct them.\n\n${freq.join("\n")}\n\n${FORMAT_FREQ}` });

  // 2 et 3. Poids : à vérifier (tous), puis provisoires forts.
  const items = { a_verifier: [], fort: [] }, vus = new Set();
  for (const q of d.questions) for (const e of q.effets) {
    if (e.statut !== "a_verifier" && e.statut !== "provisoire") continue;
    if (e.statut === "provisoire" && CONTEXTE.has(q.id)) continue;
    const nom = q.video ? (q.video.toLowerCase().includes(q.libelle.toLowerCase().split(" ")[0]) ? q.video : `${q.video} (${q.libelle})`) : null;
    if (e.rv) {
      for (const [v, r] of Object.entries(e.rv)) {
        if (e.statut === "provisoire" && Math.abs(Math.log(r)) < SEUIL) continue;
        const cle = `${e.dx}|${q.id}|${v}`; if (vus.has(cle)) continue; vus.add(cle);
        items[e.statut === "a_verifier" ? "a_verifier" : "fort"].push({ dx: e.dx, texte: `${nom || q.libelle} = « ${LO.libelleOption(q, v)} » — current LR ${nb(r)}` });
      }
      continue;
    }
    const [p, m] = LO.rvPosNeg(e);
    if (e.statut === "provisoire" && Math.max(Math.abs(Math.log(p)), Math.abs(Math.log(m))) < SEUIL) continue;
    const cle = `${e.dx}|${e.cle}`; if (vus.has(cle)) continue; vus.add(cle);
    const el = nom && q.type !== "multi" ? nom : LO.elementDe(e);
    if (vus.has(`${e.dx}|${el}`)) continue; vus.add(`${e.dx}|${el}`);
    items[e.statut === "a_verifier" ? "a_verifier" : "fort"].push({ dx: e.dx, texte: `« ${el} » — current ${e.se !== undefined ? `Se ${pc(e.se)}, Sp ${pc(e.sp)}, ` : ""}LR+ ${nb(p)}, LR− ${nb(m)}` });
  }
  for (const g of (d.grappes || []).filter(g => g.statut !== "verifie" && g.statut !== "valide"))
    items.a_verifier.push({ dx: g.dx, texte: `Cluster « ${g.nom} » — current ${g.rv > 1 ? "LR+" : "LR−"} ${nb(g.rv)}${g.piste ? ` (${g.piste})` : ""}` });

  let no = 0;
  const groupes = (liste, titre, intro) => {
    // Par diagnostic, puis en consignes d'au plus PAR_CONSIGNE éléments.
    const tri = [...liste].sort((a, b) => d.diagnostics.findIndex(x => x.id === a.dx) - d.diagnostics.findIndex(x => x.id === b.dx));
    for (let i = 0; i < tri.length; i += PAR_CONSIGNE) {
      const part = tri.slice(i, i + PAR_CONSIGNE), lignes = [];
      let dx = null;
      for (const it of part) { if (it.dx !== dx) { dx = it.dx; lignes.push(`\nTarget diagnosis: ${en(dx)}`); } lignes.push(`${code}-P${++no}. ${it.texte}`); }
      const nbParts = Math.ceil(tri.length / PAR_CONSIGNE);
      blocs.push({ titre: `${titre}${nbParts > 1 ? ` (${i / PAR_CONSIGNE + 1} sur ${nbParts})` : ""}`, n: part.length, texte: `${intro} The findings come from a French-language questionnaire for ${plainte} pain; the French wording is kept in quotes.\n${lignes.join("\n")}\n\n${FORMAT_POIDS}` });
    }
  };
  groupes(items.a_verifier, "Poids à vérifier et combinaisons", "For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are given; confirm or correct them.");
  groupes(items.fort, "Poids provisoires forts", "For each coded history or examination finding below, give its diagnostic accuracy for the target diagnosis shown above it. Our current values are provisional clinical estimates; confirm or correct them.");

  sortie.push(`## ${d.titre} (${code})`, "");
  blocs.forEach((b, i) => { sortie.push(`### ${code} ${i + 1}. ${b.titre} (${b.n} élément${b.n > 1 ? "s" : ""})`, "", "```text", b.texte.trim(), "```", ""); });
  sommaire.push(`| ${d.titre} | ${blocs.length} | ${freq.length} | ${items.a_verifier.length} | ${items.fort.length} |`);
}
sortie.splice(sortie.indexOf("Les valeurs actuelles sont données à OpenEvidence pour qu'il les confirme ou les corrige ; une réponse « no data » est utile aussi (le poids reste provisoire et prudent).") + 2, 0,
  "| Région | Consignes | Fréquences | À vérifier | Forts provisoires |", "|---|---|---|---|---|", ...sommaire, "");
const fichier = path.join(RACINE, "outils/locomoteur/delegation/openevidence-a-verifier.md");
fs.writeFileSync(fichier, sortie.join("\n"));
console.log(`${path.relative(RACINE, fichier)} :\n${sommaire.join("\n")}`);
