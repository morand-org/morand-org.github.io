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
const data = {
  source: Rep.source,
  groupes: Rep.GROUPES, frequents: Rep.FREQUENTS, actes,
  vulnerabilite: VULN,
  notes: {
    repertoire: `Tarifs : ${Rep.source}, colonne « En CLSC ou en GMF-U en établissement », avant la majoration selon le territoire. `
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
console.log(`Codes Morand : ${actes.length} actes (dont ${cnesst.length} formulaires de la CNESST), ${VULN.length} codes de vulnérabilité.`);
