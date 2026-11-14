/* Accueil clinique de l'Hôpital Pierre-Boucher : fabrique outils/crds/accueil-pierre-boucher.mjs à partir du relevé
   du portail (JSON fait par le médecin connecté, gardé hors du dépôt).
     node outils/crds/importer-accueil-pb.mjs <relevé.json>
   Règles :
   - chaque ligne publiée est une ligne du relevé, choisie par son rang et recopiée telle quelle ; seuls sont retirés
     l'étiquette entre crochets au début (« [Ordonnance OPE-…] »), les titres « Indication », « Contre-indications »,
     « Générales », « Spécifiques » et les espaces en double ;
   - le portail coupe le texte après le signe « < » (« Hb < 110> ») : ces lignes ne sont jamais publiées ; la version
     complète de l'ordonnance les remplace quand elle existe ;
   - quand le portail et l'ordonnance diffèrent, les deux versions sont gardées, chacune nommée ;
   - les fiches « Aides/Guides » du portail (2015) ne sont pas reprises. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const [fichier] = process.argv.slice(2);
if (!fichier) { console.error("Usage : node outils/crds/importer-accueil-pb.mjs <relevé.json>"); process.exit(2); }
const R = JSON.parse(fs.readFileSync(fichier, "utf8"));
const brut = JSON.stringify(R);

const TRONQUE = /<\s*\d+[a-zA-Z]{0,3}>/;                  // « < 110> », « (< 2> », « <1> », « < 110g> »
const ETIQUETTE = /^\[([^\]]+)\]\s*/;
const net = s => String(s).replace(ETIQUETTE, "")
  .replace(/^(\d+\.\s*)?indications?\s*[—:-]?\s*/i, "")
  .replace(/^contre-?indications?\s*:?\s*(?=g[ée]n[ée]rales)/i, "").replace(/^g[ée]n[ée]rales?\s*[—:]?\s*/i, "").replace(/^sp[ée]cifiques?\s*:?\s*/i, "")
  .replace(/^[-−]\s*/, "").replace(/\s{2,}/g, " ").trim();
const deOrdonnance = s => /^\[(Ordonnance|OPE|ANNEXE)/.test(s);
const choisir = (liste, rangs, nom) => rangs.map(i => {
  if (liste[i] == null) throw new Error(`${nom} : pas de ligne au rang ${i}`);
  if (TRONQUE.test(liste[i])) throw new Error(`${nom} : la ligne ${i} est coupée après « < » : « ${liste[i]} »`);
  return net(liste[i]);
});
const suite = (a, b) => Array.from({ length: b - a + 1 }, (_, k) => a + k);
// Une ligne de l'ordonnance qui en réunit plusieurs (« − a − b » ou « a ; b ») : une par élément.
const separer = (s, motif) => s.split(motif).map(x => x.trim()).filter(Boolean);
// Notes du relevé (écarts entre le portail et l'ordonnance), sans les chemins de fichiers.
const ecart = i => { if (R.a_verifier[i] == null) throw new Error(`a_verifier ${i} absent`);
  return R.a_verifier[i].replace(/\s*\((?:[^()]*?(?:download\/|uploads\/)[^()]*)\)/g, "").replace(/\s+\./g, ".").trim(); };

/* Choix par protocole : rangs des lignes du relevé. « ciOrd » : contre-indications selon l'ordonnance, quand elles
   diffèrent de la page du portail. « syn » : mots de recherche seulement (pas des libellés officiels). */
const GYN = "Signes vitaux instables : cette ordonnance, plus ancienne, indique « TAS ≥ 200 mm Hg ou TAD ≥ 130 mm Hg » ; les protocoles récents du portail indiquent « TAS ≥ 180 mm Hg ou TAS ≤ 100 mm Hg ou TAD ≥ 100 mm Hg ».";
const CHOIX = [
  { i: 0, id: "pb-drs", msss: "Douleur rétrosternale", syn: ["DRS", "douleur thoracique", "angine", "cardio"],
    indication: [0], ciGen: [0, 1], ciSpec: suite(2, 5), ciOrd: { rangs: [6], motif: /\s*−\s*/ }, prerequis: [0], urgence: suite(0, 3), aNoter: [0], ecarts: [7, 8] },
  { i: 1, id: "pb-fa", msss: "Suspicion de fibrillation auriculaire", syn: ["FA", "fibrillation", "flutter", "arythmie", "palpitations"],
    indication: [1], ciGen: [0, 1], ciSpec: suite(2, 5), prerequis: [0], urgence: [0], annexes: [1, 2, 3, 4, 6, 7], ecarts: [9, 10] },
  { i: 2, id: "pb-hematemese-melena", syn: ["hématémèse", "méléna", "HDH", "hémorragie digestive haute", "selles noires", "vomissements de sang"],
    indication: [0], ciGen: [0, 1], ciSpec: [2, 3, 4, 5, 6, 7, 12, 9, 10, 11], prerequis: [0, 1], urgence: [0, 2], annexes: [0, 1, 2], ecarts: [14],
    ecartsTexte: p => [`« ${net(p.prerequis[1])} » est une vérification faite par l'infirmière à l'arrivée : l'IPP doit donc être commencé avant la visite. L'ordonnance écrit « ${net(p.prerequis[2])} ».`] },
  { i: 3, id: "pb-rectorragie", syn: ["rectorragie", "sang dans les selles", "HDB", "hémorragie digestive basse"],
    indication: [0], ciGen: [0, 1], ciSpec: suite(2, 7), prerequis: [], urgence: [0], ecarts: [15] },
  { i: 4, id: "pb-diverticulite", msss: "Suspicion de diverticulite", syn: ["diverticulite", "douleur abdominale", "fosse iliaque gauche"],
    indication: [0], ciGen: [0, 1], ciSpec: [2, 3, 4], prerequis: [0], souhaitables: [0], urgence: [0, 1, 2], ecarts: [17, 18] },
  { i: 5, id: "pb-saignement-t1", msss: "Saignement vaginal au premier trimestre", syn: ["grossesse", "saignement", "1er trimestre", "fausse couche", "menace d'avortement"],
    indication: [0], ciGenOrd: [5], ciSpec: suite(1, 4), prerequis: [], urgence: [0, 2], ecartsTexte: [GYN], ecarts: [21, 22], algoOrd: [13], sansPortail: true },
  { i: 6, id: "pb-saignements-menstruels", syn: ["ménorragie", "saignement utérin anormal", "SUA", "menstruations abondantes", "règles"],
    indication: [0], ciGenOrd: [5], ciSpec: suite(1, 4), prerequis: [0], urgence: [0, 1], annexes: [0, 1], ecartsTexte: [GYN], ecarts: [23, 24] },
  { i: 7, id: "pb-grossesse-arretee", syn: ["grossesse arrêtée", "fausse couche", "avortement manqué", "grossesse non évolutive"],
    indication: [1], ciGenOrd: [4], ciSpec: suite(1, 3), prerequis: [], urgence: [0], ecartsTexte: [GYN], ecarts: [25] },
  { i: 8, id: "pb-grossesse-ectopique", syn: ["GEU", "ectopique", "extra-utérine", "grossesse"],
    indication: [1], ciGenOrd: [6], ciSpec: suite(1, 5), prerequis: [], urgence: [0, 2], ecartsTexte: [GYN], ecarts: [26], algoOrd: [8], sansPortail: true },
  { i: 9, id: "pb-embolie-pulmonaire", syn: ["EP", "embolie", "TEP", "dyspnée", "douleur pleurétique"],
    indication: [0], ciGen: [0, 1], ciSpec: suite(2, 12), ciOrd: { rangs: [13], motif: /\s*;\s*/ }, prerequis: [0, 1], souhaitables: [0], urgence: [0, 1], aNoter: [0], ecarts: [28, 29] },
  { i: 10, id: "pb-map", syn: ["MAP", "claudication", "MVAS", "artériopathie", "blue toe", "ischémie"],
    indication: [0, 1, 2], ciGen: [0, 1], ciSpec: [2, 3], prerequis: [], urgence: [0, 1] },
  { i: 11, id: "pb-tpp", msss: "Suspicion de thrombophlébite profonde", syn: ["TVP", "TPP", "thrombose", "phlébite", "mollet", "thrombophlébite"],
    indication: [0], ciGen: [0, 1], ciSpec: suite(2, 7), prerequis: [0, 1, 2], urgence: [0], annexes: [2], portailSans: [1, 2],
    // Seuils confirmés le 14 novembre 2026 : ceux de l'ordonnance (Wells ≥ 2, immobilisation > 3 jours) ; le portail se trompe.
    ecartsTexte: p => ["Les valeurs de l'ordonnance OPE-00108 sont les bonnes (vérifié le 14 novembre 2026) : score de Wells ≥ 2 et immobilisation récente > 3 jours. Le portail affiche « Score de Wells ≥ 1 » et « Immobilisation récente (≤ 3 jours) » : les deux étapes du portail qui reposent sur ce seuil ne sont pas reproduites.",
      `« ${net(p.prerequis[2])} » est une vérification faite par l'infirmière à l'arrivée : la première dose doit donc être prescrite et prise avant la visite (ordonnance pour la pharmacie : « première dose STAT »).`] },
  { i: 12, id: "pb-cellulite", msss: "Cellulite", syn: ["cellulite", "infection de la peau", "érysipèle", "antibiotique IV"],
    indication: [0], ciGen: [0, 1], ciSpec: [2, 3, 4], prerequis: [0], urgence: [0] },
  { i: 13, id: "pb-hematurie", msss: "Hématurie macroscopique", syn: ["hématurie", "sang dans l'urine", "urologie"],
    indication: [0], ciGenOrd: [5], ciSpec: suite(1, 4), prerequis: [], urgence: [0], ecartsTexte: [GYN.replace("plus ancienne", "de 2017")], ecarts: [34] },
];

const page = p => p.sources.find(s => /page du protocole/.test(s.titre)) || p.sources[0];
const protocoles = CHOIX.map(c => {
  const p = R.protocoles[c.i], nom = p.nom;
  const ens = p.ensuite, ains = p.a_inscrire_sur_la_demande;
  for (const i of c.portailSans || []) if (deOrdonnance(ens[i]) || !/Score de Wells/.test(ens[i])) throw new Error(`${nom} : la ligne ${i} à écarter n'est pas celle attendue`);
  const omises = ens.filter(x => !deOrdonnance(x) && TRONQUE.test(x)).length;
  const notesRedigees = typeof c.ecartsTexte === "function" ? c.ecartsTexte(p) : c.ecartsTexte || [];
  for (const t of notesRedigees) for (const [, cite] of t.matchAll(/« ([^»]+) »/g)) if (!brut.replace(/\\"/g, '"').includes(cite)) throw new Error(`${nom} : citation absente du relevé : ${cite}`);
  const ordo = /^(.*?)\s*;/.exec(p.formulaire.numero + " ;")[1];
  const x = {
    id: c.id, nom, specialite: p.specialite, syn: c.syn, ...(c.msss ? { msss: c.msss } : {}),
    mise_a_jour: (page(p).mise_a_jour || "").replace(/^Dernière mise à jour le /i, "").toLowerCase(),
    delai: p.delai || "",
    indication: choisir(p.inclusion, c.indication, `${nom}, indication`),
    contre_indications: {
      generales: c.ciGenOrd ? choisir(p.exclusion, c.ciGenOrd, `${nom}, générales`).flatMap(s => separer(s, /\s*;\s*/).map(y => y.replace(/^\d+\.\s*/, ""))) : choisir(p.exclusion, c.ciGen, `${nom}, générales`),
      generales_selon: c.ciGenOrd ? `l'ordonnance ${ordo}` : "le portail",
      specifiques: choisir(p.exclusion, c.ciSpec, `${nom}, spécifiques`),
      ...(c.ciOrd ? { selon_ordonnance: choisir(p.exclusion, c.ciOrd.rangs, `${nom}, ordonnance`).flatMap(s => separer(s, c.ciOrd.motif)) } : {}),
    },
    prerequis: choisir(p.prerequis, c.prerequis, `${nom}, prérequis`).map(t => t.replace(/\s+:$/, "")),
    souhaitables: choisir(p.souhaitables, c.souhaitables || [], `${nom}, souhaitables`),
    urgence: choisir(p.drapeaux_rouges, c.urgence, `${nom}, urgence`),
    a_noter: choisir(p.notes, c.aNoter || [], `${nom}, à noter`),
    ordonnance: { numero: p.formulaire.numero, version: p.formulaire.version, titre: p.formulaire.nom, url: p.formulaire.url, mode: p.formulaire.mode },
    detail: {
      algorithme_ordonnance: c.algoOrd ? choisir(ens, c.algoOrd, `${nom}, algorithme`) : ens.filter(deOrdonnance).filter(s => !TRONQUE.test(s)).map(net),
      algorithme_portail: c.sansPortail ? [] : ens.filter((s, i) => !(c.portailSans || []).includes(i) && !deOrdonnance(s) && !TRONQUE.test(s)).map(net),
      algorithme_note: c.sansPortail ? "La suite de l'algorithme de l'infirmière (selon le β-hCG et l'échographie) n'est pas reproduite : trop d'étapes sont coupées sur le portail. Consultez l'ordonnance sur le portail." : "",
      scores: ains.filter(s => /^\[OPE-\d+\]/.test(s) && !TRONQUE.test(s)).map(net),
      pharmacie: ains.filter(s => /^\[(OPE-\d+A|ANNEXE 1)\]/.test(s) && !/TRANSMISSION CONFIDENTIELLE/.test(s) && !TRONQUE.test(s)).map(net),
      annexes: choisir(p.notes, c.annexes || [], `${nom}, annexes`),
      ecarts: [...notesRedigees, ...(c.ecarts || []).map(ecart)],
      lignes_omises: omises,
    },
    page: page(p).url,
  };
  return x;
});

const a = R.acces;
const acces = {
  clientele: choisir(a.qui_peut_referer, [0, 1, 2], "clientèle"),
  comment_referer: choisir(a.comment_referer, suite(0, 7), "comment référer"),
  heures: choisir(a.heures, [0, 1], "heures"),
  contre_indications_toutes: choisir(a.aller_plutot_a_l_urgence, suite(0, 7), "contre-indications générales"),
  ecart_contre_indications: ecart(0),
  coordonnees: { telephone: a.coordonnees_service.telephone, telecopieur: a.coordonnees_service.telecopieur, adresse: a.coordonnees_service.adresse },
  patient: choisir(a.document_informations_patient, [1, 5, 6, 8, 13, 14, 15, 16], "information au patient"),
  provenance: choisir(a.territoire, [0], "provenance"),
  notes: [ecart(1), ecart(2), ecart(4)],
};

const data = {
  installation: R.installation, cisss: R.cisss, portail: R.portail, releve_le: R.releve_le,
  droits: R.conditions_utilisation[0],
  avis: "Relevé du portail de l'accueil clinique, réservé aux médecins inscrits. Les protocoles et les ordonnances du portail font foi : vérifiez-y la version en vigueur avant de référer. Le portail coupe certains textes après le signe « < » : ces lignes ne sont pas reproduites ici, la version complète de l'ordonnance les remplace quand elle existe.",
  acces, protocoles,
};

// Garde-fous : rien de coupé, aucun nom retiré, et chaque citation « … » des notes existe dans le relevé.
const tout = JSON.stringify({ ...data, protocoles: data.protocoles.map(p => ({ ...p, detail: { ...p.detail, ecarts: [] } })), acces: { ...acces, ecart_contre_indications: "" } });
if (TRONQUE.test(tout)) throw new Error("Une ligne coupée après « < » se trouve hors des notes d'écarts : " + TRONQUE.exec(tout)[0]);
if (/\[(nom|noms|cellulaire)[^\]]*retir/.test(JSON.stringify(data))) throw new Error("Une mention « nom retiré » se trouve dans les données publiées.");

fs.writeFileSync(path.join(ICI, "accueil-pierre-boucher.mjs"),
  `/* Accueil clinique de l'Hôpital Pierre-Boucher (CISSS de la Montérégie-Est). Fichier fabriqué par
   outils/crds/importer-accueil-pb.mjs à partir du relevé du portail du ${R.releve_le} : ne pas le modifier à la main.
   Chaque ligne vient du portail ou de l'ordonnance préétablie, recopiée telle quelle. ${R.conditions_utilisation[0]} */
export const ACCUEIL_PIERRE_BOUCHER = ${JSON.stringify(data, null, 1)};
`);
console.log(`${protocoles.length} protocoles ; lignes coupées non reproduites : ${protocoles.reduce((n, p) => n + p.detail.lignes_omises, 0)}.`);
for (const p of protocoles) console.log(` - ${p.nom} : ${p.prerequis.length} prérequis, ${p.contre_indications.specifiques.length} contre-indications spécifiques, ${p.detail.algorithme_ordonnance.length}+${p.detail.algorithme_portail.length} lignes d'algorithme, ${p.detail.lignes_omises} omises`);
