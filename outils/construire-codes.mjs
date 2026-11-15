// Codes Morand (/codes/) : assemble codes/codes_data.json à partir du dépôt de Wealth Morand, qui reste la source
// (js/repertoire.js : répertoire des actes ; js/calc.js : formulaires de la CNESST et forfaits ; js/catalogues.js :
// codes de vulnérabilité). Les tests de Wealth vérifient ces montants contre son moteur de calcul.
//   node outils/construire-codes.mjs <dossier du dépôt wealth>
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const wealth = path.resolve(process.argv[2] || path.join(RACINE, "../wealth"));
if (!fs.existsSync(path.join(wealth, "js/repertoire.js"))) { console.error("Usage : node outils/construire-codes.mjs <dépôt wealth>"); process.exit(2); }
const require = createRequire(import.meta.url);
const Calc = require(path.join(wealth, "js/calc.js")), Rep = require(path.join(wealth, "js/repertoire.js"));
// catalogues.js est écrit pour le navigateur : on lui donne une fenêtre minimale et on lit ses codes de vulnérabilité.
const fenetre = { Calc };
vm.runInNewContext(fs.readFileSync(path.join(wealth, "js/catalogues.js"), "utf8"), { window: fenetre });
const VULN = fenetre.WM.catalogues.CODES_VULNERABILITE;
if (!Array.isArray(VULN) || VULN.length < 20) throw new Error("Codes de vulnérabilité introuvables dans js/catalogues.js.");

const dollars = v => v.toLocaleString("fr-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " $";
// Les formulaires de la CNESST viennent du moteur ; à la fin du groupe « Formulaires et suppléments », comme dans Wealth.
const cnesst = Calc.CNESST.map(x => ({ g: "formulaires", n: `CNESST : ${x.nom.charAt(0).toLowerCase()}${x.nom.slice(1)}`, c: [x.code], t: x.tarif, p: Rep.PLEIN, k: "cnesst travail accident ivac formulaire" }));
const i = Rep.ACTES.findIndex(a => a.g === "non");
const actes = [...Rep.ACTES.slice(0, i), ...cnesst, ...Rep.ACTES.slice(i)];
const M = Calc.MONTANTS_LIEU;

/* Tarifs en cabinet et détail du manuel (outils/codes/manuel-ramq.json, extrait par outils/codes/extraire-manuel.py).
   Cabinet : la colonne « En cabinet » du manuel ; un tarif unique du manuel vaut pour les deux lieux ; les forfaits et
   suppléments de la Brochure no 1 viennent du moteur de Wealth (MONTANTS_LIEU), après contrôle de leur montant en
   établissement ; les formulaires de la CNESST ont un seul tarif. Un tarif introuvable reste null (« à confirmer »). */
const MAN = JSON.parse(fs.readFileSync(path.join(RACINE, "outils/codes/manuel-ramq.json"), "utf8"));
const BROCHURE = { "19957": "suppNonVulnerable", "19958": "suppVulnerableHorsGuichet", "19959": "suppVulnerableGuichet", "19960": "suppTresVulnerable",
  "15169": "forfaitResponsabilite", "15170": "forfaitResponsabilite", "15145": "suppSuiviGrossesse", "15159": "suppGrossessePremierTrimestre", "08877": "suppExamenEnfant" };
const MIXTE_SEUL = new Set(["42094", "42095", "42096", "42097", "42098", "42099"]);   // base du mixte (annexe XXIII) : établissement, au mixte
const LIEU_UNIQUE = new Set(["08875"]);   // forfait GMF (EP 33, annexe V) : un seul montant
const egal = (x, y) => Math.abs(x - y) < 0.001;
function cabinet(code, etab) {
  const m = (MAN.codes[code] || {}).tarif || {};
  if (m.cabinet != null) { if (m.etablissement != null && !egal(m.etablissement, etab)) throw new Error(`${code} : ${m.etablissement} au manuel, ${etab} au répertoire`); return m.cabinet; }
  if (m.unique != null) { if (!egal(m.unique, etab)) throw new Error(`${code} : tarif unique ${m.unique} au manuel, ${etab} au répertoire`); return m.unique; }
  if (BROCHURE[code]) { if (!egal(M.etablissement[BROCHURE[code]], etab)) throw new Error(`${code} : ${M.etablissement[BROCHURE[code]]} au moteur, ${etab} au répertoire`); return M.cabinet[BROCHURE[code]]; }
  if (LIEU_UNIQUE.has(code) || Calc.CNESST.some(x => x.code === code)) return etab;
  return null;
}
const sections = {};
for (const a of actes) {
  if (a.t == null) continue;
  const ts = Array.isArray(a.t) ? a.t : [a.t];
  if (a.c.some(c => MIXTE_SEUL.has(c))) { a.mixteSeul = true; a.cab = null; }
  else if (a.c.length > 2 && Array.isArray(a.t)) {   // demi-per diem : liste 1, par résident et par externe
    const e = M.etablissement.perDiem["1"]; if (!egal(e[0], ts[0]) || !egal(e[1], ts[1])) throw new Error("Demi-per diem : montants différents du moteur");
    a.cab = M.cabinet.perDiem["1"];
  } else {
    const cab = Array.isArray(a.t) && a.c.length === 2 ? a.c.map((c, i) => cabinet(c, ts[i])) : a.c.map(c => cabinet(c, ts[0]));
    a.cab = cab.includes(null) ? null : Array.isArray(a.t) ? cab : cab[0];
    if (!Array.isArray(a.t) && a.cab != null && a.c.length > 1 && cab.some(x => !egal(x, cab[0]))) a.cab = null;
  }
  // Détail du manuel : libellés, avis et règles recopiés, éléments de contexte, codes liés, lien vers la section.
  const m = { lib: {}, avis: [], sec: [], ctx: [], lies: [], ancre: null };
  for (const c of a.c) {
    const x = MAN.codes[c]; if (!x) continue;
    if (x.tarif && x.tarif.libelle && x.tarif.libelle.length) m.lib[c] = x.tarif.libelle.filter(l => !/^(En cabinet|En CLSC|en CLSC|En établissement|en établissement|lorsqu|Clientèle inscrite de)/.test(l)).join(" ");
    if (m.lib && m.lib[c] === "") delete m.lib[c];
    if (!m.ancre && x.tarif) m.ancre = x.tarif.ancre;
    for (const v of x.avis) if (!m.avis.includes(v)) m.avis.push(v);
    for (const sc of x.sections) { sections[sc.ancre] = { titre: sc.titre, texte: sc.texte, avis: sc.avis }; if (!m.sec.includes(sc.ancre)) m.sec.push(sc.ancre); }
    for (const v of x.contexte) if (!m.ctx.includes(v)) m.ctx.push(v);
    for (const v of x.lies) if (!a.c.includes(v) && !m.lies.includes(v)) m.lies.push(v);
  }
  for (const k of Object.keys(m)) if (m[k] == null || (Array.isArray(m[k]) && !m[k].length) || (typeof m[k] === "object" && !Array.isArray(m[k]) && !Object.keys(m[k]).length)) delete m[k];
  if (Object.keys(m).length) a.m = m;
}
const data = {
  source: Rep.source,
  groupes: Rep.GROUPES, frequents: Rep.FREQUENTS, actes,
  vulnerabilite: VULN,
  manuel: { ...MAN.source, sections },
  notes: {
    repertoire: `Tarifs : ${Rep.source}, avant la majoration selon le territoire. Colonnes « En cabinet » et « En CLSC ou en GMF-U en établissement » du manuel `
      + `(${MAN.source.titre}, consulté le ${new Date(MAN.source.consulte + "T12:00").toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}) ; les forfaits et suppléments de la Brochure no 1, selon le lieu. Un tarif en cabinet introuvable est marqué « à confirmer ». `
      + "Le détail de chaque code recopie les avis et les règles du manuel, sans les reformuler ; seul le manuel en vigueur fait foi. "
      + "Au mixte en GMF-U : 63,58 % des services médicaux, 62,15 % des services sur base de temps, 100 % des suppléments et des formulaires, en plus du forfait horaire. "
      + "Les actes chirurgicaux sont publiés en dollars entiers. Ordre : du plus fréquent au plus rare ; la recherche porte sur tous les actes.",
    cnesst: `${Calc.CNESST.length} formulaires de la CNESST et de l'IVAC : annexe XIII de l'Entente, en vigueur depuis le 1er avril 2025 (manuel de la RAMQ consulté le 25 octobre 2026). `
      + "Payés à 100 % du tarif dans tous les modes : à l'acte, au mixte (annexe XXIII, par. 2.11) et au taux horaire, à l'acte pour ces services sans facturer d'heures pour ce temps.",
    vulnerabilite: "Un patient inscrit est vulnérable s'il a au moins une de ces catégories ; il peut en avoir plusieurs. "
      + `Forfait annuel (EP 40, par. 6.01) : ${dollars(M.cabinet.forfaitVulnerable)} en cabinet, ${dollars(M.etablissement.forfaitVulnerable)} en établissement pour une catégorie ; 150 % pour deux ; 200 % pour trois ou plus. `
      + "Ajouter, modifier ou annuler un code se fait lors d'une visite ; l'inscription peut être modifiée dans les 90 jours suivant la visite (infolettre 171). "
      + "Libellés : Guide de gestion « Révision des codes de vulnérabilité » de la FMOQ (2017), d'après l'infolettre 171 de la RAMQ du 15 septembre 2017. "
      + "Modifications faites depuis à l'EP 40 : source manquante, non vérifiées ici. Vérifiez le libellé en vigueur avant d'inscrire un code.",
  },
};
fs.mkdirSync(path.join(RACINE, "codes"), { recursive: true });
fs.writeFileSync(path.join(RACINE, "codes/codes_data.json"), JSON.stringify(data, null, 1) + "\n");
const nCab = actes.filter(a => a.cab != null).length, nM = actes.filter(a => a.m && (a.m.avis || a.m.sec)).length;
console.log(`Tarifs en cabinet : ${nCab} actes ; avis ou règles du manuel : ${nM} actes.`);
console.log(`Codes Morand : ${actes.length} actes (dont ${cnesst.length} formulaires de la CNESST), ${VULN.length} codes de vulnérabilité.`);
