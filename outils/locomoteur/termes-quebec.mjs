/* MSK Morand : termes de l'usage québécois. Appliqué aux aide-mémoire générés (aide-memoire.mjs) et aux fichiers de
   données ; l'archive du document source (sources/2026-11-21-openevidence/) reste textuelle.
     node outils/locomoteur/termes-quebec.mjs fichier…   (réécrit les fichiers donnés) */
import fs from "node:fs";

// Ordre important : les formes longues d'abord. Les identifiants (ppr, omarthrose…) ne sont jamais touchés.
export const TERMES = [
  [/Pseudo-?polyarthrite rhizomélique/g, "Polymyalgia rheumatica"],
  [/pseudo-?polyarthrite rhizomélique/g, "polymyalgia rheumatica"],
  [/\bPPR\b/g, "PMR"],
  [/zygapophysaires? \(facettaires?\)/g, m => m.startsWith("zygapophysaires") ? "facettaires" : "facettaire"],
  [/zygapophysaires/g, "facettaires"],
  [/zygapophysaire/g, "facettaire"],
  // « syndrome facettaire » (masculin) plutôt que « douleur facettaire ».
  [/([Dd])ouleur facettaire( cervicale| lombaire| thoracique)?/g, (m, d, r) => `${d === "D" ? "S" : "s"}yndrome facettaire${(r || "").replace("cervicale", "cervical")}`],
  [/[Ss]yndrome facettaire cervicale/g, m => m.slice(0, -1)],
  [/([Ff])ractures? de fatigue/g, m => m.replace("fatigue", "stress")],
  [/d'insuffisance ou de fatigue/g, "d'insuffisance ou de stress"],
  [/défilé thoraco-brachial/g, "défilé thoracique"],
  [/\bOmarthrose\b/g, "Arthrose gléno-humérale"],
  [/(?<![\w"'_])omarthrose(?![\w"'_:])/g, "arthrose gléno-humérale"],
  [/coup du lapin/g, "whiplash"],
  [/([Cc])apsulite rétractile/g, "$1apsulite adhésive"],
  [/([Ss])yndrome des loges/g, "$1yndrome compartimental"],
  [/([Ss])yndrome de loge/g, "$1yndrome compartimental"],
  [/Névralgie cervico-brachiale \(radiculopathie\)/g, "Radiculopathie cervicale"],
  [/([Nn])évralgie cervico-brachiale/g, (m, n) => `${n === "N" ? "R" : "r"}adiculopathie cervicale`],
  [/Myélopathie cervicarthrosique/g, "Myélopathie cervicale dégénérative"],
  [/Cervicarthrose/g, "Arthrose cervicale"],
  [/cervicarthrose/g, "arthrose cervicale"],
  [/Lombalgie commune \(non spécifique\)/g, "Lombalgie non spécifique (mécanique)"],
  [/Lombalgie commune/g, "Lombalgie non spécifique"],
  [/lombalgie commune/g, "lombalgie non spécifique"],
  [/Canal lombaire étroit/g, "Sténose spinale lombaire"],
  [/(l[ea]s?|un|du) canal lombaire étroit/g, (m, a) => ({ le: "la", la: "la", les: "les", un: "une", du: "de la" }[a] || a) + " sténose spinale lombaire"],
  [/canal lombaire étroit/g, "sténose spinale lombaire"],
  [/Fracture de l'extrémité supérieure du fémur/g, "Fracture de la hanche (col ou massif trochantérien)"],
];

export function quebeciser(texte) {
  for (const [re, rempl] of TERMES) texte = texte.replace(re, rempl);
  return texte;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop())) {
  for (const f of process.argv.slice(2)) {
    const avant = fs.readFileSync(f, "utf8"), apres = quebeciser(avant);
    if (apres !== avant) { fs.writeFileSync(f, apres); console.log(`${f} : modifié`); }
  }
}
