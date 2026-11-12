// Plan du site (sitemap.xml) : les pages de Morand référencées par Google, avec la date de leur dernier changement
// (dernier commit du fichier, sinon aujourd'hui). La carte (/map/) n'y est pas : son adresse canonique reste
// celle de Trouve ta clinique. Wealth est dans son propre dépôt, servi sous /wealth/.
//   node outils/plan-du-site.mjs [dossier du dépôt wealth]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const WEALTH = process.argv[2] || path.join(RACINE, "../wealth");
const BASE = "https://www.morand.org";
const date = (depot, fichier) => {
  try { return execFileSync("git", ["-C", depot, "log", "-1", "--format=%cs", "--", fichier], { encoding: "utf8" }).trim() || null; } catch { return null; }
};
const aujourdhui = new Date().toISOString().slice(0, 10);
const PAGES = [
  ["/", RACINE, "index.html"],
  ["/wealth/", WEALTH, "index.html"],
  ["/guides/", RACINE, "guides/index.html"],
  ["/guides/ressources-communautaires/", RACINE, "guides/ressources-communautaires/index.html"],
  ["/crds/", RACINE, "crds/crds_data.json"],
  ["/confidentialite/", RACINE, "confidentialite/index.html"],
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(([u, d, f]) => `  <url><loc>${BASE}${u}</loc><lastmod>${date(d, f) || aujourdhui}</lastmod></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(RACINE, "sitemap.xml"), xml);
console.log(`sitemap.xml : ${PAGES.length} pages.`);
