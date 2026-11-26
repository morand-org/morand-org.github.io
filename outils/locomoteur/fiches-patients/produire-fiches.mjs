/* MSK Morand : produit les fiches patients (version 2), d'après la maquette du 25 novembre 2026, au format Lettre.
     node outils/locomoteur/fiches-patients/produire-fiches.mjs [région …] [--html]
   Assemble, pour chaque fiche :
     - le texte de la version 1 (textes/<région>.json, celui des PDF publiés) ;
     - le titre médical et le sous-titre (titres.json) ;
     - les ajouts de la version 2 (ajouts/<région>.json : en_bref, pourquoi, soulager, urgence, medecin, et pour chaque
       exercice phase, but, plus_facile) ;
     - la règle de douleur de la version 1, telle quelle : retour au niveau habituel le lendemain matin (décision du
       Dr Morand du 26 novembre 2026, qui renonce au délai d'une heure) ;
     - les dessins actuels (extraits des PDF publiés dans .cache/dessins, réduits à 600 px dans .cache/dessins-600 ;
       en attendant ceux de Gemini).
   Écrit textes-v2/<région>.json (le texte assemblé, source du document pour OpenEvidence) et v2/<région>/<n°>-<id>.pdf
   (hors du dépôt et du site : les fiches publiées ne changent qu'à la version finale). Chaque page est ajustée pour
   tenir sur une feuille : la taille du texte descend par petits pas, jamais sous 9 points (choix du Dr Morand : une feuille
   recto verso, texte d'environ 9,5 points), puis, au besoin, les dessins rapetissent. */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const ICI = path.dirname(new URL(import.meta.url).pathname), RACINE = path.resolve(ICI, "../../..");
const REGIONS = [["cervical", "Rachis cervical", "CER"], ["epaule", "Épaule", "EPA"], ["coude", "Coude", "COU"], ["poignet", "Poignet et main", "MAI"],
  ["lombaire", "Rachis lombaire", "LOM"], ["hanche", "Hanche et bassin", "HAN"], ["genou", "Genou", "GEN"], ["cheville", "Cheville et jambe", "CHE"], ["pied", "Pied", "PIE"]];
const COULEURS = { cervical: "#5b6f8f", epaule: "#8a5a83", coude: "#9a6b3c", poignet: "#4f7f78", lombaire: "#7d6536", hanche: "#a0524a", genou: "#2f6b4b", cheville: "#3f6f95", pied: "#6b7a3a" };
const VERSION = "version 2", REVISION = "26 novembre 2026";
const args = process.argv.slice(2), choisies = args.filter(a => !a.startsWith("--")), sansRevues = args.includes("--sans-revues"),
  seulementHtml = args.includes("--html") || sansRevues;   // --sans-revues : texte de base (sans revues/), dans .cache/textes-base, pour integrer-revues.py
const lireJSON = f => JSON.parse(fs.readFileSync(f, "utf8"));
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const TITRES = lireJSON(path.join(ICI, "titres.json"));

/* Matériel nécessaire, d'après le texte des exercices. */
const MATERIEL = [["élastique", /élastique/i], ["serviette", /serviette/i], ["chaise", /chaise/i], ["marche ou escalier", /marche (basse|d'escalier)|escalier|step/i],
  ["mur", /\bmur\b/i], ["poids léger, bouteille d'eau ou sac à dos", /poids léger|petits? poids|poids (de|d'environ) \d|haltère|bouteille|boîte de conserve|sac à dos|(ajoutez|ajouter|ajoutant|tenant|tenez|avec|portant) (un |du |des |de )?(petits? |léger )?poids/i], ["ballon", /ballon/i], ["coussin", /coussin|oreiller/i],
  ["balle", /\bballe\b/i], ["bâton ou manche à balai", /bâton|manche à balai/i], ["table", /\btable\b/i], ["tapis d'exercice", /tapis/i]];
const materielDe = ex => MATERIEL.filter(([, re]) => ex.some(e => re.test([e.position_de_depart, e.mouvement, e.progression, e.plus_facile].join(" ")))).map(([n]) => n);

/* « Soulager la douleur » : textes types par genre de problème (les mêmes conseils d'une fiche à l'autre ; aucune dose,
   renvoi au pharmacien ou au médecin). Une fiche peut aussi donner sa propre liste. */
const SOULAGER = {
  aigu: ["Les premiers jours, appliquez de la glace 15 minutes, enveloppée dans un linge, quelques fois par jour.",
    "Acétaminophène au besoin ; un anti-inflammatoire en crème ou en comprimés peut aussi aider, si votre pharmacien ou votre médecin le juge approprié."],
  tendon: ["Glace 10 à 15 minutes, dans un linge, après une activité qui réveille la douleur, si elle vous soulage.",
    "Un anti-inflammatoire en crème sur la région douloureuse peut aider, si votre pharmacien le juge approprié.",
    "Les médicaments soulagent, mais ne guérissent pas le tendon : l'exercice reste le traitement."],
  arthrose: ["Chaleur 15 minutes pour la raideur ; glace 10 à 15 minutes, dans un linge, si l'articulation est enflée.",
    "Anti-inflammatoire en crème, ou en comprimés pour de courtes périodes, si votre pharmacien ou votre médecin le juge approprié."],
  dos: ["Chaleur 15 à 20 minutes pour détendre les muscles.",
    "Un anti-inflammatoire en comprimés pendant quelques jours peut aider, si votre pharmacien ou votre médecin le juge approprié."],
  nerf: ["Évitez les positions qui augmentent les engourdissements ou la douleur qui descend.",
    "Acétaminophène ou anti-inflammatoire au besoin, si votre pharmacien ou votre médecin le juge approprié ; parlez à votre médecin si la douleur vous empêche de dormir."],
  nerf_p: ["Évitez les positions et les gestes qui augmentent les engourdissements ou les picotements.",
    "Acétaminophène ou anti-inflammatoire au besoin, si votre pharmacien ou votre médecin le juge approprié ; parlez à votre médecin si la douleur vous empêche de dormir."],
  enfant: ["Glace 10 à 15 minutes, dans un linge, après le sport.",
    "Acétaminophène ou ibuprofène au besoin, à la dose qui convient à l'âge et au poids (demandez au pharmacien)."],
  grossesse: ["Chaleur douce ou bain tiède (pas chaud) pour détendre les muscles.",
    "Acétaminophène au besoin ; évitez les anti-inflammatoires pendant la grossesse, sauf avis de votre médecin."],
  inflam: ["Les anti-inflammatoires prescrits par votre médecin sont le traitement de base : prenez-les comme indiqué.",
    "Douche chaude ou chaleur le matin pour diminuer la raideur."],
  bursite: ["Glace 15 minutes, dans un linge, et un bandage compressif léger pour diminuer l'enflure.",
    "Un anti-inflammatoire au besoin, si votre pharmacien ou votre médecin le juge approprié."]
};
const PHASES = { M: "Dès maintenant", D: "Quand la douleur diminue", P: "Pour progresser" };

/* Ajouts (ajouts/<région>.json), format compact par fiche :
     b : « En bref » (3 phrases) ; p : « Pourquoi ça arrive » ; s : genre (clé de SOULAGER) ou liste ;
     u : rangs (à partir de 0) des signes de « Quand reconsulter » qui demandent de consulter rapidement ;
     "u+" : signes urgents ajoutés ; "m+" : signes non urgents ajoutés ;
     ex : pour chaque exercice, [phase (M, D ou P), but, version plus facile]. */
export function assembler(r, x, no) {
  const cle = `${r}/${x.id}`, t = TITRES[cle] || { titre: x.nom, sous_titre: x.titre_patient };
  // Maladie de Sever : une seule fiche, rangée en cheville et en pied (mêmes texte et ajouts que la cheville).
  const rA = r === "pied" && x.id === "sever" ? "cheville" : r;
  const ajoutsF = path.join(ICI, "ajouts", `${rA}.json`), aj = (fs.existsSync(ajoutsF) ? lireJSON(ajoutsF) : {})[x.id] || {};
  const [, nomR, pre] = REGIONS.find(([c]) => c === r);
  const exercices = x.exercices.map((e, k) => { const a = (aj.ex || [])[k]; return a ? { ...e, phase: PHASES[a[0]] || a[0], but: a[1], plus_facile: a[2] } : { ...e }; });
  const signes = x.quand_reconsulter, urg = new Set(aj.u || []);
  const sansPrefixe = t => { const u = t.replace(/^(En urgence( \(911 ou urgences\))?|Urgence( \(rendez-vous à l'urgence sans attendre\))?|Rapidement( \(dans les jours qui suivent\))?)\s*:\s*/i, "").replace(/^URGENCE/, "Urgence"); return u.charAt(0).toUpperCase() + u.slice(1); };
  const urgence = aj.u || aj["u+"] ? [...signes.filter((_, k) => urg.has(k)), ...(aj["u+"] || [])].map(sansPrefixe) : [];
  const medecin = urgence.length ? [...signes.filter((_, k) => !urg.has(k)), ...(aj["m+"] || [])] : [...signes, ...(aj["m+"] || [])];
  const soulager = Array.isArray(aj.s) ? aj.s : aj.s ? SOULAGER[aj.s] : [];
  if (aj.s && !soulager) throw new Error(`${cle} : genre « ${aj.s} » inconnu`);
  return simplifier(reviser(rA, x.id, {
    cle, region: r, region_nom: nomR, code: `${pre}-${String(no).padStart(2, "0")}`, no, titre: t.titre, sous_titre: t.sous_titre, titre_v1: x.titre_patient, diagnostic: x.nom,
    en_bref: aj.b || [], ce_que_vous_avez: x.ce_que_vous_avez, pourquoi: aj.p || [], ce_qui_aide: x.ce_qui_aide, a_eviter: x.a_eviter_pour_l_instant,
    soulager, regle_de_douleur: x.regle_de_douleur, urgence, medecin, duree_habituelle: x.duree_habituelle,
    materiel: materielDe(exercices), exercices, references: x.references || []
  }));
}

/* Passe de simplification (26 novembre 2026), après les revues : texte pour un niveau de scolarité faible (phrases courtes,
   mots courants, ni statistiques ni mention d'études). simplification/_communes.json : [ancien, nouveau] appliqués à toutes
   les fiches où le passage se trouve ; simplification/<région>.json : { "<code>": [[ancien, nouveau], …] }, et chaque passage
   doit se trouver dans la fiche (sinon, erreur : le texte a changé, la simplification est à revoir). Les références, les
   titres et les consignes de dessin ne sont pas touchés. */
const SIMPLE = (() => {
  const d = path.join(ICI, "simplification"); if (!fs.existsSync(d)) return { communes: [], parCode: {} };
  const parCode = {};
  for (const n of fs.readdirSync(d)) if (n.endsWith(".json") && !n.startsWith("_")) Object.assign(parCode, lireJSON(path.join(d, n)));
  const c = path.join(d, "_communes.json");
  return { communes: fs.existsSync(c) ? lireJSON(c) : [], parCode };
})();
const INTOUCHABLES = new Set(["cle", "region", "region_nom", "code", "no", "titre", "sous_titre", "titre_v1", "diagnostic", "references", "materiel", "illustration"]);
function simplifier(f) {
  if (sansRevues) return f;
  const remplacer = (ancien, nouveau, exige) => {
    let trouve = 0;
    const passer = (o, k) => {
      const v = o[k];
      if (typeof v === "string") { if (v.includes(ancien)) { trouve++; o[k] = v.split(ancien).join(nouveau); } }
      else if (Array.isArray(v)) v.forEach((_, i) => passer(v, i));
      else if (v && typeof v === "object") for (const kk of Object.keys(v)) if (!INTOUCHABLES.has(kk)) passer(v, kk);
    };
    for (const k of Object.keys(f)) if (!INTOUCHABLES.has(k)) passer(f, k);
    if (exige && !trouve) throw new Error(`${f.code} : passage à simplifier introuvable : « ${ancien.slice(0, 80)} »`);
  };
  for (const [a, n] of SIMPLE.communes) remplacer(a, n, false);
  for (const [a, n] of SIMPLE.parCode[f.code] || []) remplacer(a, n, true);
  return f;
}

/* Corrections retenues après la révision d'OpenEvidence (revues/<région>.json), triées par le Dr Morand et Claude :
   seulement ce qui rend la fiche plus juste ou plus sûre, en gardant un texte simple. Format par fiche : une rubrique
   remplacée en entier (titre, sous_titre, en_bref, ce_que_vous_avez, pourquoi, soulager, ce_qui_aide, a_eviter,
   regle_de_douleur, urgence, medecin, duree_habituelle, references, materiel) ; « exercices » : { "2": { champs } }
   (numéro de l'exercice, à partir de 1) ; « _journal » : décisions, hors fiche. */
function reviser(r, id, f) {
  const fic = path.join(ICI, "revues", `${r}.json`), rv = sansRevues ? null : (fs.existsSync(fic) ? lireJSON(fic) : {})[id];
  if (!rv) return f;
  for (const [k, v] of Object.entries(rv)) {
    if (k.startsWith("_") || k === "materiel") continue;
    if (k === "exercices") {
      for (const [n, champs] of Object.entries(v)) {
        const e = f.exercices[Number(n) - 1]; if (!e) throw new Error(`${f.cle} : exercice ${n} introuvable`);
        for (const c of Object.keys(champs)) if (!(c in e) && !["phase", "but", "plus_facile"].includes(c)) throw new Error(`${f.cle} : champ d'exercice « ${c} » inconnu`);
        Object.assign(e, champs);
      }
      continue;
    }
    if (!(k in f)) throw new Error(`${f.cle} : rubrique « ${k} » inconnue dans revues/${r}.json`);
    f[k] = v;
  }
  f.materiel = rv.materiel || materielDe(f.exercices);
  return f;
}

const CSS = fs.readFileSync(path.join(ICI, "gabarit-fiche.css"), "utf8");
function html(f) {
  const puces = l => `<ul>${l.map(s => `<li>${esc(s)}</li>`).join("")}</ul>`;
  const carte = (classe, titre, corps) => corps ? `<section class="carte ${classe}"><h2>${titre}</h2>${corps}</section>` : "";
  const echelle = `<div class="echelle" aria-hidden="true"><div class="barre"><span></span></div><div class="chiffres">${[...Array(11)].map((_, i) => `<b${i === 3 ? ' class="seuil"' : ""}>${i}</b>`).join("")}</div></div>`;
  const dessin = (e, k) => { const nom = `${f.cle.split("/")[1]}-${k + 1}.jpg`, reduit = path.join(ICI, ".cache/dessins-600", f.region, nom), f2 = fs.existsSync(reduit) ? reduit : path.join(ICI, ".cache/dessins", f.region, nom); return fs.existsSync(f2) ? `<img src="file://${f2}" alt="">` : `<div class="sans-dessin">${esc(e.illustration)}</div>`; };
  const ex = f.exercices.map((e, k) => `<article class="exercice">
    <div class="dessin">${dessin(e, k)}</div>
    <h3><span class="no">${k + 1}</span>${esc(e.nom)}</h3>${e.phase ? `<p class="phase">${esc(e.phase)}</p>` : ""}
    ${e.but ? `<p class="but">${esc(e.but)}</p>` : ""}
    <p><b>Départ :</b> ${esc(e.position_de_depart)}</p><p><b>Mouvement :</b> ${esc(e.mouvement)}</p>
    <p class="dosage"><b>Dosage :</b> ${esc(e.dosage)}</p>
    ${e.progression ? `<p><b>Progression :</b> ${esc(e.progression)}</p>` : ""}${e.plus_facile ? `<p><b>Plus facile :</b> ${esc(e.plus_facile)}</p>` : ""}
    ${e.erreur_frequente ? `<p><b>Erreur fréquente :</b> ${esc(e.erreur_frequente)}</p>` : ""}
    <p class="prescrit">☐ Prescrit pour vous <span>Charge ou élastique : </span><i></i></p></article>`).join("");
  // « à vérifier » reste dans les données (suivi), mais n'est pas imprimé sur la fiche remise au patient.
  const refs = f.references.map(r => esc(r.texte) + (r.doi_ou_pmid && !/vérifier/i.test(r.doi_ou_pmid) ? ` (${esc(r.doi_ou_pmid)})` : "")).join(" · ");
  const pied = cote => `<footer><span>Révisée le ${REVISION} · ${VERSION} · Ce document ne remplace pas l'avis de votre professionnel de la santé.</span><span>${cote}</span></footer>`;
  return `<!doctype html><html lang="fr-CA"><head><meta charset="utf-8"><title>${esc(f.code)} ${esc(f.titre)}</title><style>${CSS}</style></head>
<body style="--region:${COULEURS[f.region]}">
<div class="page"><div class="contenu">
  <p class="sur"><span class="region">${esc(f.region_nom)}</span> FICHE PATIENT · ${esc(f.code)} · COMPRENDRE ET AGIR</p>
  <h1>${esc(f.titre)}</h1><p class="sous-titre">${esc(f.sous_titre)}</p>
  ${f.en_bref.length ? `<section class="carte en-bref"><h2>En bref</h2>${puces(f.en_bref)}</section>` : ""}
  ${carte("", "Ce que vous avez", `<p>${esc(f.ce_que_vous_avez)}</p>`)}
  ${f.pourquoi.length || f.soulager.length ? `<div class="deux">${carte("", "Pourquoi ça arrive", f.pourquoi.length ? puces(f.pourquoi) : "")}${carte("", "Soulager la douleur", f.soulager.length ? puces(f.soulager) : "")}</div>` : ""}
  <div class="deux">${carte("aide", "Ce qui aide", puces(f.ce_qui_aide))}${carte("eviter", "À éviter pour l'instant", puces(f.a_eviter))}</div>
  <section class="carte douleur"><div class="douleur-tete"><h2>Règle de douleur (0 à 10)</h2>${echelle}</div><p>${esc(f.regle_de_douleur)}</p></section>
  <section class="carte consulter">${f.urgence.length ? `<div class="deux-int"><div><h2>Consultez rapidement</h2><p class="precision">Sans attendre : urgence (911 si c'est grave) ; en cas de doute, Info-Santé 811</p>${puces(f.urgence)}</div><div><h2>Revoyez votre médecin si</h2>${puces(f.medecin)}</div></div>` : `<h2>Quand reconsulter</h2>${puces(f.medecin)}`}</section>
  <div class="bas"><p class="duree"><b>Durée habituelle :</b> ${esc(f.duree_habituelle)}</p><p class="signature"><img src="file://${path.join(ICI, "gabarit-signature.png")}" alt="Dr Morand"></p></div>
</div>${pied("Recto · Page 1/2")}</div>
<div class="page"><div class="contenu">
  <p class="sur verso">PROGRAMME D'EXERCICES · ${esc(f.titre.toUpperCase())}</p>
  ${f.materiel.length ? `<p class="materiel"><b>Matériel :</b> ${esc(f.materiel.join(", "))}</p>` : ""}
  <div class="exercices n${f.exercices.length}">${ex}</div>
  <div class="bas">${refs ? `<p class="references"><b>Références :</b> ${refs}</p>` : "<p></p>"}<p class="signature"><img src="file://${path.join(ICI, "gabarit-signature.png")}" alt="Dr Morand"></p></div>
</div>${pied("Verso · Page 2/2 · Remis au patient")}</div>
</body></html>`;
}

/* Taille du texte : on part de 11 points et on descend par pas de 0,25 jusqu'à ce que chaque page tienne (minimum 9). */
const AJUSTER = () => [...document.querySelectorAll(".page")].map(p => {
  const c = p.querySelector(".contenu"); let t = 11;
  c.style.setProperty("--t", t + "pt");
  while (c.scrollHeight > c.clientHeight + 1 && t > 9) { t -= 0.25; c.style.setProperty("--t", t + "pt"); }
  // Encore trop long à 9 points : les dessins rapetissent (de 0,95 à 0,55 po au plus).
  let img = 0.95;
  while (c.scrollHeight > c.clientHeight + 1 && img > 0.55) { img -= 0.05; c.style.setProperty("--img", img.toFixed(2) + "in"); }
  // Toujours trop long : interligne et marges des cartes un peu plus serrés (deux crans), puis 8,75 points au plus bas.
  for (const cran of ["serre", "serre2"]) if (c.scrollHeight > c.clientHeight + 1) c.classList.add(cran);
  while (c.scrollHeight > c.clientHeight + 1 && t > 8.75) { t -= 0.25; c.style.setProperty("--t", t + "pt"); }
  return { t, img: +img.toFixed(2), serre: c.classList.contains("serre2") ? 2 : c.classList.contains("serre") ? 1 : 0, deborde: c.scrollHeight > c.clientHeight + 1 };
});

async function main() {
  const regions = REGIONS.filter(([r]) => !choisies.length || choisies.includes(r));
  const nav = seulementHtml ? null : await chromium.launch();
  const bilan = [];
  for (const [r] of regions) {
    const v1 = lireJSON(path.join(ICI, "textes", `${r}.json`)).filter(x => x.applicable);
    const sever = lireJSON(path.join(ICI, "textes", "cheville.json")).find(x => x.id === "sever");
    const fiches = v1.map((x, k) => assembler(r, r === "pied" && x.id === "sever" ? { ...sever, id: "sever" } : x, k + 1));
    const dossierTextes = path.join(ICI, sansRevues ? ".cache/textes-base" : "textes-v2");
    fs.mkdirSync(dossierTextes, { recursive: true });
    fs.writeFileSync(path.join(dossierTextes, `${r}.json`), JSON.stringify(fiches, null, 1) + "\n");
    if (sansRevues) continue;
    const dossier = path.join(ICI, "v2", r); fs.mkdirSync(dossier, { recursive: true });
    for (const f of fiches) {
      const base = path.join(dossier, `${String(f.no).padStart(2, "0")}-${f.cle.split("/")[1]}`);
      fs.writeFileSync(base + ".html", html(f));
      if (!nav) continue;
      const p = await nav.newPage();
      await p.goto("file://" + base + ".html"); await p.waitForLoadState("load");
      const t = await p.evaluate(AJUSTER);
      await p.pdf({ path: base + ".pdf", format: "Letter", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
      await p.close();
      const pages = +execFileSync("pdfinfo", [base + ".pdf"]).toString().match(/Pages:\s+(\d+)/)[1];
      bilan.push({ code: f.code, cle: f.cle, recto: t[0].t, verso: t[1].t, dessins: t[1].img, serre: Math.max(...t.map(x => x.serre)), pages, deborde: t.some(x => x.deborde) });
    }
    console.log(`${r} : ${fiches.length} fiches`);
  }
  if (nav) await nav.close();
  const pb = bilan.filter(b => b.deborde || b.pages !== 2);
  if (bilan.length) console.log(`taille du texte : recto ${Math.min(...bilan.map(b => b.recto))}–${Math.max(...bilan.map(b => b.recto))} pt, verso ${Math.min(...bilan.map(b => b.verso))}–${Math.max(...bilan.map(b => b.verso))} pt ; ${pb.length} fiche(s) hors gabarit` + (pb.length ? " : " + pb.map(b => b.code).join(", ") : ""));
  fs.writeFileSync(path.join(ICI, "v2", "bilan.json"), JSON.stringify(bilan, null, 1));
}
if (import.meta.url === `file://${process.argv[1]}`) main();
