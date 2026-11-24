/* MSK Morand : produit la page de chaque région (locomoteur/<région>/index.html) à partir de celle du genou, et met à
   jour les tuiles de l'accueil (locomoteur/index.html) selon les fichiers de données présents.
     node outils/locomoteur/pages.mjs */
import fs from "node:fs";
import path from "node:path";
const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const lire = f => fs.readFileSync(path.join(RACINE, f), "utf8");

// Ordre de l'accueil ; « rc » : lead de la page.
const REGIONS = [
  { id: "cervical", nom: "Cervical", douleur: "Douleur cervicale", lead: "Douleur cervicale ou cervico-brachiale." },
  { id: "epaule", nom: "Épaule", douleur: "Douleur à l'épaule", lead: "Douleur à l'épaule." },
  { id: "coude", nom: "Coude", douleur: "Douleur au coude", lead: "Douleur au coude." },
  { id: "poignet", nom: "Poignet et main", douleur: "Douleur au poignet ou à la main", lead: "Douleur au poignet ou à la main." },
  { id: "lombaire", nom: "Lombaire", douleur: "Douleur lombaire", lead: "Lombalgie, avec ou sans irradiation au membre inférieur." },
  { id: "hanche", nom: "Hanche", douleur: "Douleur à la hanche ou à l'aine", lead: "Douleur à la hanche, à l'aine ou à la fesse." },
  { id: "genou", nom: "Genou", douleur: "Douleur au genou", lead: "Douleur au genou." },
  { id: "cheville", nom: "Cheville", douleur: "Douleur à la cheville ou à la jambe", lead: "Douleur à la cheville ou à la jambe." },
  { id: "pied", nom: "Pied", douleur: "Douleur au pied", lead: "Douleur au pied.", aides: ["cheville"] },
];
// Nombre de diagnostics de chaque région prête (chargement des données dans Node).
globalThis.window = globalThis;
new Function(lire("locomoteur/moteur.js"))(); new Function(lire("locomoteur/commun.js"))();
for (const r of REGIONS) {
  const am = `locomoteur/${r.id}/aide-memoire-${r.id}.js`, dn = `locomoteur/${r.id}/donnees-${r.id}.js`;
  r.pret = fs.existsSync(path.join(RACINE, dn));
  if (!r.pret) continue;
  for (const a of [r.id, ...(r.aides || [])]) { const f = `locomoteur/${a}/aide-memoire-${a}.js`; if (fs.existsSync(path.join(RACINE, f))) new Function(lire(f))(); }
  new Function(lire(dn))();
  r.nb = window.Locomoteur.donnees[r.id].diagnostics.length;
}

const prets = REGIONS.filter(x => x.pret).map(x => x.id).join(",");
const avecRegions = h => h.replace(/<body class="lo-outil" data-articulation="([a-z]+)"( data-regions="[^"]*")?>/, `<body class="lo-outil" data-articulation="$1" data-regions="${prets}">`);
fs.writeFileSync(path.join(RACINE, "locomoteur/genou/index.html"), avecRegions(lire("locomoteur/genou/index.html")));
const modele = lire("locomoteur/genou/index.html");
for (const r of REGIONS.filter(x => x.pret && x.id !== "genou")) {
  const minu = r.douleur[0].toLowerCase() + r.douleur.slice(1);
  let h = modele
    .replace("<title>Genou | MSK Morand</title>", `<title>${r.nom} | MSK Morand</title>`)
    .replace("pour la douleur au genou : anamnèse", `pour la ${minu.replace(/^douleur /, "douleur ")} : anamnèse`)
    .replace('<script src="/locomoteur/genou/donnees-genou.js" defer></script>',
      [r.id, ...(r.aides || [])].map(a => `<script src="/locomoteur/${a}/aide-memoire-${a}.js" defer></script>\n`).join("") + `<script src="/locomoteur/${r.id}/donnees-${r.id}.js" defer></script>`)
    .replace('data-articulation="genou"', `data-articulation="${r.id}"`).replace('<script src="/locomoteur/genou/aide-memoire-genou.js" defer></script>\n', "")
    .replace('<span class="cache"> : douleur au genou</span>', `<span class="cache"> : ${minu}</span>`)
    .replace("<p class=\"cr-lead\">Douleur au genou. Cochez", `<p class="cr-lead">${r.lead} Cochez`)
    .replace('<a class="cr-vue" href="/locomoteur/genou/" aria-current="page">Genou</a>', `<a class="cr-vue" href="/locomoteur/${r.id}/" aria-current="page">${r.nom}</a>`);
  if (h.includes("donnees-genou") || h.includes('"genou"')) throw new Error(`Page ${r.id} : remplacement incomplet`);
  fs.writeFileSync(path.join(RACINE, `locomoteur/${r.id}/index.html`), h);
  console.log(`locomoteur/${r.id}/index.html`);
}

// Consultation sans région choisie (bouton « Démarrer la consultation » de l'accueil) : l'atlas et les puces ajoutent les plaintes.
{
  const h = modele.replace("<title>Genou | MSK Morand</title>", "<title>Consultation | MSK Morand</title>")
    .replace('<script src="/locomoteur/genou/donnees-genou.js" defer></script>\n', "").replace('<script src="/locomoteur/genou/aide-memoire-genou.js" defer></script>\n', "")
    .replace('data-articulation="genou"', 'data-articulation="consultation"')
    .replace("pour la douleur au genou : anamnèse", "pour les consultations musculosquelettiques : anamnèse")
    .replace('<span class="cache"> : douleur au genou</span>', '<span class="cache"> : consultation</span>')
    .replace("<p class=\"cr-lead\">Douleur au genou. Cochez", "<p class=\"cr-lead\">Touchez la zone douloureuse sur l'atlas, puis cochez")
    .replace('<a class="cr-vue" href="/locomoteur/genou/" aria-current="page">Genou</a>', '<a class="cr-vue" href="/locomoteur/consultation/" aria-current="page">Consultation</a>');
  if (h.includes("donnees-genou") || h.includes('"genou"')) throw new Error("Page consultation : remplacement incomplet");
  fs.mkdirSync(path.join(RACINE, "locomoteur/consultation"), { recursive: true });
  fs.writeFileSync(path.join(RACINE, "locomoteur/consultation/index.html"), h);
  console.log("locomoteur/consultation/index.html");
}

// Accueil : tuiles actives pour les régions prêtes.
let hub = lire("locomoteur/index.html");
const debut = hub.indexOf('<ol class="lo-regions cr-specs">'), fin = hub.indexOf("</ol>", debut);
const tuiles = REGIONS.map(r => r.pret
  ? `    <li><a class="cr-spec lo-region" href="/locomoteur/${r.id}/"><span class="cr-spec-nom">${r.nom}</span><span class="cr-spec-sous">${r.nb} diagnostics</span></a></li>`
  : `    <li><span class="cr-spec lo-region lo-region-inactive" aria-disabled="true"><span class="cr-spec-nom">${r.nom}</span><span class="cr-spec-sous">À venir</span></span></li>`).join("\n");
hub = hub.slice(0, debut) + '<ol class="lo-regions cr-specs">\n' + tuiles + "\n  " + hub.slice(fin);
fs.writeFileSync(path.join(RACINE, "locomoteur/index.html"), hub);
console.log(`locomoteur/index.html : ${REGIONS.filter(r => r.pret).map(r => r.id).join(", ")}`);
