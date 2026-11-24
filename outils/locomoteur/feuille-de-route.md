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
2. **Point 23.** Prompts dans `delegation/prompts-chatgpt-23.md`.
   - ✅ A, fiches d'exercices : remplacées par les fiches patients PDF du Dr Morand (PR #23). Leur texte corrigé (9 régions, 186 diagnostics, 441 exercices, 303 références dont 79 « à vérifier ») est archivé dans `outils/locomoteur/fiches-patients/textes/` (`archiver-textes.py`). Pistes : conseils au patient dans les résultats, pages web des fiches, vérification des références.
   - ✅ C, infiltrations : remplacées par les fiches d'infiltration du Dr Morand (PR #24, version du 22 novembre 16 h 13, avec les schémas ; la version de 15 h 44 a encore 31 « espaces réservés »).
   - B, encadré « Retour au sport » : pas encore reçu.

   Ensuite, vérifier les références et ajouter à la liste OpenEvidence les doses et les chiffres à confirmer.
3. Puis, du plus simple au plus long :
   1. ✅ (PR #13) **17. Repère « Pondéré ».** Légende du trait doré (questions qui comptent dans le calcul) et du statut des poids (vérifié ou provisoire).
   2. ✅ (PR #13) **9. Diagnostics qui peuvent coexister.** Quand deux diagnostics probables sont compatibles (`compatibles` des données), le dire (ex. « arthrose et déchirure méniscale : souvent associées »).
   3. ✅ (PR #13) **16. Indicateur d'avancement.** Par section (« Examen : 6 sur 14 ») et sections importantes encore vides.
   4. ✅ (PR #13) **3. Éléments clés non évalués.** Pour les 3 premiers diagnostics, les tests décisifs qui n'ont pas été faits (« Lachman non évalué »). Non évalué n'est jamais un négatif.
   5. ✅ (PR #13) **2. Indicateur de fiabilité par région.** Faible, moyenne ou bonne, selon les éléments discriminants répondus, la part de poids vérifiés et la largeur de la fourchette.
   6. ✅ (PR #13) **10. Douleur projetée d'une région à l'autre.** Proposer d'ajouter la plainte voisine : hanche quand le genou est douloureux, cou quand c'est l'épaule ou le coude, dos quand c'est la hanche.
   7. ✅ (PR #13) **7. « Qu'est-ce qui me ferait changer d'avis ? »** Pour le diagnostic de tête, ce qui le ferait tomber ; pour le 2ᵉ, ce qui le ferait passer premier.
   8. ✅ (PR #14) **1. Bandeau « Sécurité » en tête des résultats.** Alertes de toutes les plaintes, en rouge (urgence), orange (rapide) et jaune (à considérer), visibles aussi sur ordinateur. Les drapeaux rouges vérifiés et absents s'écrivent dans la note.
   9. ✅ (PR #14) **5. Contexte de consultation.** Bureau, urgence ou clinique sportive, qui ajuste les fréquences de départ.
   10. ✅ (PR #14) **8. Comparateur de deux diagnostics.** Côte à côte, avec les éléments qui les départagent le mieux.
   11. ✅ (PR #15) **6. « Prochaine question la plus utile ».** Les 3 questions non répondues qui changeraient le plus le classement, avec l'effet attendu si positif ou négatif.
   12. ✅ (PR #16) **15. Mode rapide.** Une dizaine de questions discriminantes par région ; passage au mode complet d'un clic.
   13. ✅ (PR #17) **11. Conduite en six blocs.** Investigations, Traitement, À éviter, Suivi, Consignes de reconsultation, Référence, avec la conduite conditionnelle (« si échec à 6 semaines… »).
4. **19. Atlas de la douleur** (avant-dernier) : schéma du corps cliquable pour choisir la région et la localisation.
5. **14. Importateur de note sans IA** (dernier). Le principe :
   - dictionnaires pour les négations, le côté, la durée et les tests positifs ou négatifs ;
   - écran de confirmation avant de remplir quoi que ce soit ;
   - rien n'est coché sans confirmation.

## Retirés par le clinicien

4 (validation dans les tests automatiques et nouvelles vignettes), 12 (plan de suivi daté), 13 (formats de note et « Vérifier ma note »), 18 (accueil en trois étapes), 20 (grades A à D), 21 (journal des modifications), 22 (mode résident).

## En attente du clinicien

- Les PDF des fiches high yield du genou, de la cheville et du pied.
- Le JSON « Retour au sport » (point 23 B), si vous le voulez encore.
- Les réponses d'OpenEvidence, par code (ex. `CERV-P12`), pour remplacer les poids provisoires. Reçu le 24 novembre : fréquences cervicales (CERV-F1 à F17), intégrées comme repères ; aucune courbe confirmée.

## Pour reprendre le travail

- Branche : `ccr-903a5a10-511ciu`. Publication par PR vers `main`, puis fusion.
- Après toute modification des données, lancer :
  - `node outils/locomoteur/pages.mjs` ;
  - `node outils/locomoteur/lister-sources.mjs <région>` ;
  - `node outils/locomoteur/a-verifier-openevidence.mjs` ;
  - `node outils/locomoteur/validation/valider.mjs` ;
  - `node outils/locomoteur/fiches-hy.mjs`.
- Tests : `node tests/site.test.mjs`. La variable `SCENARIOS=locomoteur,fichesHY` lance seulement ces scénarios. Deux échecs de la barre de recherche de l'accueil principal existent déjà sur `main` et ne viennent pas de MSK.

## Demandes du 23 et 24 novembre 2026 (à faire, dans cet ordre)

1. ✅ (PR #19) **Accueil de MSK et pages des régions**
   - Retirer l'encadré « Prototype ».
   - Mettre à sa place un gros bouton « Démarrer la consultation », qui ouvre l'outil sans région choisie.
   - Retirer « prêt à essayer » des tuiles.
   - Renommer « Fiches high yield » en « Fiches résumées des pathologies ».
   - Remplacer « aide-mémoire de première ligne (Québec) du document OpenEvidence » par des sources générales et crédibles, écrites pour les médecins et le public.
   - Retirer les bulles de navigation en haut de l'outil (Plaintes, Identification…). Garder Mode rapide, Patients et Nouveau patient.
2. ✅ (PR #20) **MSK visible partout** : accueil du site, onglets des autres outils, indexation.
   - Idée de page couverture : « Six outils pour la pratique », six cartes à sceau, I à VI.
3. ✅ (PR #21) **Conduite recopiée dans la note**
   - Seulement des phrases de note clinique (jamais « Clinique » seul).
   - Plan séparé par problème quand il y a plusieurs pathologies.
4. ✅ (PR #22) **Atlas** : utiliser le personnage fourni (images/4.jpg, plus musclé) ou le « lecteur anatomique des plaintes » fourni (HTML).
5. ✅ (PR #23) **Fiches patients** (PDF par région : cervical, lombaire, épaule, coude, poignet et main, hanche, genou, cheville, pied) : 140 fiches découpées (les fiches 9 cervicale et 4 de la hanche restaurées le 24 novembre, PR #28), liste par région, lien « Fiche patient (PDF à imprimer) » dans les résultats. Régénérer : `node outils/locomoteur/fiches-patients.mjs [région=source.pdf …]`.
6. ✅ (PR #24) **Fiches d'infiltration pour le médecin** (PDF) : vue d'ensemble et 31 fiches d'une page dans `/locomoteur/infiltrations/`, niveau de preuve par indication, mention « pas en première intention » (épicondylite latérale, bursite olécrânienne, arthrose digitale, rhizarthrose, fasciite plantaire), lien « Fiche d'infiltration (médecin) » dans les résultats pour 38 diagnostics. Régénérer : `node outils/locomoteur/fiches-infiltration.mjs [source.pdf]`.
7. ✅ (PR #25) **Point 14** : importateur de note sans IA. Bouton « Importer une note » : coller, analyser (règles, dans le navigateur), cocher, appliquer. Plaintes reconnues ajoutées ; contradictions dans la note et réponses déjà données autrement décochées ; ce qui n'est pas reconnu reste non évalué.
8. **Module « Morand — Entraînement clinique »** (`/entrainement/`), flashcards « augmente, neutre ou diminue ».
   - ✅ Phase 1 : audit et plan (`outils/entrainement/plan-phase-1.md`). Décisions : aperçu en page cachée ; polices à trancher après comparaison (site ou maquette 4B) ; validation des cartes au fil du jeu (mode éditeur) ; accès depuis MSK Morand à la publication.
   - ✅ Phase 2, prototype en page cachée (PR #26) : 1 708 cartes converties des 9 lots (`convertir-base.py`, `valider-banque.mjs`), 5 modes, points paramétrables, records locaux, révision adaptative (Leitner), favoris, progression, mode éditeur (`?editeur=1`, export puis `appliquer-decisions.mjs`).
   - ✅ Polices : celles de la maquette 4B (Playfair Display, JetBrains Mono), choix du Dr Morand.
   - À venir : validation des cartes ; statistiques détaillées, niveaux, « Mes questions difficiles » ; lien depuis MSK Morand et mise en ligne (avec accord) ; Supabase (classements) ensuite.
   - Selon le prompt du clinicien : phase 1, audit et plan présentés AVANT de coder ; aucune mise en production sans son accord.
   - Style de référence : maquette « Style 4B » (HTML fourni). Changements de style seulement avec son accord.
   - Base de questions : DOCX « Base de données pour FlashCards Morand MSK ».
   - ✅ Audit des 1 708 cartes (PR #39 à #47) : pertinence (médecin de famille, puis médecin du sport), niveau léger, modéré ou difficile, retraits réversibles avec raison, énoncés corrigés, définitions, nouvelles cartes simples (sexe, âge, anamnèse) tirées des fiches et des vérifications OpenEvidence. Fichiers : `outils/entrainement/audit/*.txt`, `appliquer-audit.mjs`, `rapport-audit.mjs`.

## Demandes reçues le 24 novembre 2026, après l'audit (à faire, dans cet ordre)

1. Audit du quiz : finir le pied, puis envoyer le rapport classé (CSV).
2. Logo MSK en mode sombre : l'intérieur reste blanc ; l'uniformiser avec les autres sceaux.
3. Fiches résumées du genou, de la cheville et du pied : PDF reçus (blocs 9, 10 et 11) ; les publier comme les autres régions, puis tirer des cartes simples du quiz de ces fiches.
4. Fiche patient du doigt à ressaut : remplacer par la version corrigée reçue (PDF « 12-doigt-qui-accroche-ou-reste-bloque »). Les autres fiches seront probablement corrigées aussi, surtout les images.
5. Page d'accueil de morand.org : la refaire d'après la maquette « Médecine familiale » (six outils en cartes, recherche, recherches fréquentes, installer l'app, nouveautés). Poser les questions avant.
6. Images des fiches faites par Gemini : plusieurs erreurs ; proposer des solutions pour les valider et les corriger.
7. Analyser doctordle.org : une section semblable est-elle possible avec notre base de données ?
8. Plus tard : catalogue imprimable des fiches patients, pour un petit classeur à remettre aux patients. Il doit être parfait.
9. Plus tard : analyser docteur-kilinc.com et dire ce dont on pourrait s'inspirer.
