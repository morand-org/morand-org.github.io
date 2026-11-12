/* CRDS Morand : petites fonctions pour écrire chaque formulaire APSS de façon compacte et fidèle.
   R(catégorie, libellé, priorité, options)
   - priorité : "C", ou une liste de variantes [["C", "Avec douleur"], ["D", "Sans douleur"]] ;
   - options.pre : prérequis obligatoires, options.sou : souhaitables. Préfixe du type : "L:" laboratoire, "I:" imagerie,
     "E:" examen, sans préfixe : autre. Les libellés sont recopiés du formulaire (seule la première lettre est mise en capitale).
   - options.ori : orientations et notes du formulaire ; options.syn : mots de recherche (pas des libellés officiels) ;
   - options.lib : libellé exact du formulaire quand le titre affiché le développe (ex. « FA »). */
const cap = t => t.charAt(0).toUpperCase() + t.slice(1);
function trier(liste = []) {
  const o = { laboratoires: [], imagerie: [], examens: [], autres: [] };
  for (const x of liste) {
    const m = /^([LIE]):\s*(.*)$/.exec(x);
    if (!m) o.autres.push(cap(x));
    else o[{ L: "laboratoires", I: "imagerie", E: "examens" }[m[1]]].push(cap(m[2]));
  }
  return o;
}
export function formulaire(meta, raisons) {
  const ids = new Set();
  const problemes = raisons.map(([categorie, probleme, prio, opt = {}]) => {
    const variantes = typeof prio === "string" ? [[prio, null]] : prio;
    let id = `${meta.prefixe}-${probleme}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
    while (ids.has(id)) id += "-2";
    ids.add(id);
    const p = { id, formulaire: meta.id, specialite: meta.specialite, categorie, probleme, synonymes: opt.syn || [],
      priorites: variantes.map(([niveau, critere]) => ({ niveau, criteres: critere ? [critere] : [probleme] })),
      prerequis_obligatoires: trier(opt.pre), prerequis_souhaitables: trier(opt.sou), orientation: opt.ori || [] };
    if (opt.lib) p.libelle_formulaire = opt.lib;
    if (opt.urg) p.exclusions_urgence = opt.urg;
    for (const v of p.priorites) if (!/^([A-E]|HORS)$/.test(v.niveau)) throw new Error(`${meta.id} : priorité « ${v.niveau} » invalide pour « ${probleme} »`);
    return p;
  });
  const { prefixe, ...f } = meta;
  return { formulaire: f, problemes };
}
export const MSSS = "MSSS";
