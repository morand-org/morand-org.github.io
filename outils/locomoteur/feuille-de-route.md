# MSK Morand : feuille de route

Décidée avec le clinicien le 22 novembre 2026, à partir des deux audits de ChatGPT. Les numéros sont ceux de la proposition faite ce jour-là ; l'ordre ci-dessous est l'ordre de travail.

## Déjà en ligne (PR #5 à #11)

- Neuf régions : cervical, épaule, coude, poignet et main, lombaire, hanche, genou, cheville, pied.
- Consultation à plusieurs plaintes, avec une sauvegarde locale des patients sous une étiquette neutre.
- Termes de l'usage québécois (`termes-quebec.mjs`) et logo officiel.
- Validation par 32 vignettes : `validation/rapport.md`.
- Liste de ce qu'OpenEvidence doit vérifier : `delegation/openevidence-a-verifier.md`.
- Mesures de sécurité de l'audit :
  - section MSK dans la page Confidentialité ;
  - alerte persistante dans la barre du téléphone ;
  - fourchette décrite comme une analyse de sensibilité.
- 190 fiches high yield (blocs 1 à 8), avec bibliothèques et liens depuis les résultats.

## Ordre de travail

1. **Fiches high yield de toutes les régions.** Faites le 22 novembre 2026 pour les blocs 1 à 8 : cervical, dorsal, lombaire, épaule, coude, poignet, main, hanche. Cela fait 190 fiches, dont 14 renvois.
   - Reste à faire : genou, cheville et pied, à l'arrivée de leurs PDF.
   - Pour un nouveau bloc :
     - `python3 -I outils/locomoteur/fiches-hy/extraire.py <pdf> outils/locomoteur/fiches-hy/<série>.json locomoteur/<région>/fiches/img` ;
     - ajouter la série et ses liens dans `REGIONS` de `fiches-hy.mjs` ;
     - lancer `node outils/locomoteur/fiches-hy.mjs`.
2. **Point 23.** (en attente des fichiers de ChatGPT) Les prompts sont prêts dans `delegation/prompts-chatgpt-23.md`. À l'arrivée des fichiers JSON de ChatGPT, intégrer :
   - les fiches d'exercices imprimables ;
   - l'encadré « Retour au sport » ;
   - la bibliothèque d'infiltrations.

   Ensuite, vérifier les références et ajouter à la liste OpenEvidence les doses et les chiffres à confirmer.
3. Puis, du plus simple au plus long :
   1. ✅ (PR #13) **17. Repère « Pondéré ».** Légende du trait doré (questions qui comptent dans le calcul) et du statut des poids (vérifié ou provisoire).
   2. ✅ (PR #13) **9. Diagnostics qui peuvent coexister.** Quand deux diagnostics probables sont compatibles (`compatibles` des données), le dire (ex. « arthrose et déchirure méniscale : souvent associées »).
   3. ✅ (PR #13) **16. Indicateur d'avancement.** Par section (« Examen : 6 sur 14 ») et sections importantes encore vides.
   4. ✅ (PR #13) **3. Éléments clés non évalués.** Pour les 3 premiers diagnostics, les tests décisifs qui n'ont pas été faits (« Lachman non évalué »). Non évalué n'est jamais un négatif.
   5. ✅ (PR #13) **2. Indicateur de fiabilité par région.** Faible, moyenne ou bonne, selon les éléments discriminants répondus, la part de poids vérifiés et la largeur de la fourchette.
   6. ✅ (PR #13) **10. Douleur projetée d'une région à l'autre.** Proposer d'ajouter la plainte voisine : hanche quand le genou est douloureux, cou quand c'est l'épaule ou le coude, dos quand c'est la hanche.
   7. ✅ (PR #13) **7. « Qu'est-ce qui me ferait changer d'avis ? »** Pour le diagnostic de tête, ce qui le ferait tomber ; pour le 2ᵉ, ce qui le ferait passer premier.
   8. **1. Bandeau « Sécurité » en tête des résultats.** Alertes de toutes les plaintes, en rouge (urgence), orange (rapide) et jaune (à considérer), visibles aussi sur ordinateur. Les drapeaux rouges vérifiés et absents s'écrivent dans la note.
   9. **5. Contexte de consultation.** Bureau, urgence ou clinique sportive, qui ajuste les fréquences de départ.
   10. **8. Comparateur de deux diagnostics.** Côte à côte, avec les éléments qui les départagent le mieux.
   11. **6. « Prochaine question la plus utile ».** Les 3 questions non répondues qui changeraient le plus le classement, avec l'effet attendu si positif ou négatif.
   12. **15. Mode rapide.** Une dizaine de questions discriminantes par région ; passage au mode complet d'un clic.
   13. **11. Conduite en six blocs.** Investigations, Traitement, À éviter, Suivi, Consignes de reconsultation, Référence, avec la conduite conditionnelle (« si échec à 6 semaines… »).
4. **19. Atlas de la douleur** (avant-dernier) : schéma du corps cliquable pour choisir la région et la localisation.
5. **14. Importateur de note sans IA** (dernier). Le principe :
   - dictionnaires pour les négations, le côté, la durée et les tests positifs ou négatifs ;
   - écran de confirmation avant de remplir quoi que ce soit ;
   - rien n'est coché sans confirmation.

## Retirés par le clinicien

4 (validation dans les tests automatiques et nouvelles vignettes), 12 (plan de suivi daté), 13 (formats de note et « Vérifier ma note »), 18 (accueil en trois étapes), 20 (grades A à D), 21 (journal des modifications), 22 (mode résident).

## En attente du clinicien

- Les PDF des fiches high yield du genou, de la cheville et du pied.
- Les fichiers JSON de ChatGPT du point 23.
- Les réponses d'OpenEvidence, par code (ex. `CERV-P12`), pour remplacer les poids provisoires.

## Pour reprendre le travail

- Branche : `ccr-903a5a10-511ciu`. Publication par PR vers `main`, puis fusion.
- Après toute modification des données, lancer :
  - `node outils/locomoteur/pages.mjs` ;
  - `node outils/locomoteur/lister-sources.mjs <région>` ;
  - `node outils/locomoteur/a-verifier-openevidence.mjs` ;
  - `node outils/locomoteur/validation/valider.mjs` ;
  - `node outils/locomoteur/fiches-hy.mjs`.
- Tests : `node tests/site.test.mjs`. La variable `SCENARIOS=locomoteur,fichesHY` lance seulement ces scénarios. Deux échecs de la barre de recherche de l'accueil principal existent déjà sur `main` et ne viennent pas de MSK.
