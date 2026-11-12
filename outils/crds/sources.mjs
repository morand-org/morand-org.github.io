/* Fiche de chaque formulaire dans le répertoire des formulaires normalisés du MSSS : code à barres, révision imprimée
   dans le PDF (« rév. AAAA-MM »), responsable du contenu indiqué sur la fiche. Vérifié le 12 novembre 2026. */
const B = "http://msssa4.msss.gouv.qc.ca/intra/formres.nsf/924ec80ebd8a511b85256e1a006ba718/";
const D1 = "MSSS – Direction du soutien à l'organisation clinique et à la gestion des effectifs médicaux";
const D2 = "MSSS – Direction du soutien à l'organisation clinique et de la gestion des effectifs médicaux spécialisés";
const D3 = "MSSS – Direction de l'accès aux services médicaux spécialisés";
export const SOURCES = {
  "AH-745": ["DT9206", "2018-06", "c0ac3e380c70c59085257fdf004f119e", D1], "AH-748": ["DT9209", "2018-06", "454ae838cf193baa85257ffc004b88ce", D1],
  "AH-749": ["DT9282", "2018-06", "0973ed3d3eb5f9df8525831c004edbbb", D1], "AH-750": ["DT9283", "2024-03", "ccf94ec0837f9c5f85258033006cea75", D1],
  "AH-751": ["DT9284", "2025-09", "f42bb1439d1023c785258033006cfb52", "MSSS"], "AH-752": ["DT9285", "2024-11", "1b89b1fc8afae48685258033006d04c8", D1],
  "AH-753": ["DT9286", "2018-06", "d807894ca89805e585257ffc004b89a2", D1], "AH-754": ["DT9287", "2024-02", "a9dfbd48388acbe485257ffc004b89c6", D1],
  "AH-755": ["DT9288", "2022-11", "84e5a8c52dbe09bd85257ffc004b89eb", D1], "AH-756": ["DT9199", "2022-04", "2711555f4ccc69b98525831c004f771a", D3],
  "AH-757": ["DT9211", "2021-12", "69d572e351d2650a852583c800481782", D3], "AH-758": ["DT9249", "2019-01", "3a51b1fbfb655c358525811b00560899", D2],
  "AH-759": ["DT9252", "2024-03", "dc8a55af9ca4cc268525811b005657e1", D2], "AH-760": ["DT9264", "2021-12", "2728ebabad2d1dd28525811b0056a5c8", D3],
  "AH-761": ["DT9267", "2022-04", "8218074d7fe6b2e38525811b005773ca", D3], "AH-762": ["DT9269", "2019-01", "96e3ed5f63529ad18525811b0061eb5c", D2],
  "AH-763": ["DT9487", "2019-04", "403e72326f69aa768525811b0062614a", D2], "AH-764": ["DT9300", "2020-11", "7610ca52355476638525811b0062bae2", D2],
  "AH-765": ["DT9302", "2022-04", "7e6439952b2eb3b38525811b006301c8", D3], "AH-766": ["DT9327", "2022-05", "87b466105375a570852582e900683932", D3],
  "AH-767": ["DT9330", "2022-04", "cdb49260bccc95dc852582e90068aec5", D3], "AH-768": ["DT9421", "2019-01", "3aca76b6ffe2b7ed852583c80052129c", D2],
  "AH-769": ["DT9423", "2024-03", "3d21a5cf2ba5b63c852583c80052d7fd", D2], "AH-770": ["DT9425", "2024-08", "795255348791d8dd852583c8005c79b7", D2],
  "AH-771": ["DT9427", "2019-01", "0513ac023e7f6a5f852583c8005d6795", D2], "AH-772": ["DT9429", "2022-05", "15bbefe807d6d296852582e9006938ec", D3],
};
export function meta(id, prefixe, specialite, autres = {}) {
  const [code_barre, revision, fiche, organisme] = SOURCES[id];
  return { id, prefixe, specialite, code_barre, revision, organisme, url: `${B}${fiche}?OpenDocument`, verifie_le: "2026-11-12",
    statut: "Dernière version publique trouvée, actualité non confirmée : la version du DMÉ ou de SAFIR peut être plus récente.", ...autres };
}
