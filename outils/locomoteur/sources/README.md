# Sources de MSK Morand

Tout ce que l'outil avance doit pouvoir être retrouvé ici.

- **Rapports reçus** : chaque réponse rapportée par le clinicien (questions posées à OpenEvidence, recherches dans PubMed)
  est conservée telle quelle, dans un fichier daté : `AAAA-MM-JJ-<région>-<sujet>.md`. On n'y corrige rien ; les
  décisions prises en l'intégrant (valeur retenue, valeur écartée, point à confirmer) sont notées à la fin du fichier.
- **Poids et recommandations** : `node outils/locomoteur/lister-sources.mjs` refait `<région>-poids.md` à partir des
  fichiers de données : chaque poids (clé, valeur, statut, source) et chaque recommandation de conduite (source).
- **Dans les fichiers de données** (`locomoteur/<région>/donnees-<région>.js`), chaque poids publié porte sa source dans
  `piste` (premier auteur, année, revue, PMID) ; chaque recommandation de conduite, dans `src`.

Statuts : `provisoire` (estimation clinique, en attente de données), `a_verifier` (valeur publiée citée de mémoire),
`verifie` (chiffre tiré d'une étude identifiée), `valide` (approuvé par le clinicien).
