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

- ✅ Les PDF des fiches résumées du genou, de la cheville et du pied : reçus et publiés le 24 novembre (blocs 9, 10 et 11).
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

1. ✅ (PR #47) Audit du quiz : pied fini, rapport classé (CSV) envoyé.
2. ✅ (PR #48) Logo MSK en mode sombre : fond intérieur transparent, doré comme les autres sceaux.
3. ✅ (PR #49, #52) Fiches résumées du genou, de la cheville et du pied publiées (67 fiches) ; 100 cartes simples du quiz tirées de ces fiches.
4. ✅ (PR #50) Fiche patient du doigt à ressaut remplacée par la version corrigée (suivi : `outils/locomoteur/fiches-patients/CORRECTIONS.md`). Les autres fiches seront probablement corrigées aussi, surtout les images.
5. ✅ (PR #51) Page d'accueil refaite d'après la maquette : fond vert forêt pâle, Cormorant Garamond, recherches fréquentes, catégories, « Mis à jour », « Nouveautés ». Liens « Quiz » et « Morandle » ajoutés à l'en-tête le 25 novembre (mise en ligne) ; pas de « Rétroaction » (aucune adresse de contact donnée).
6. ✅ Solutions proposées le 24 novembre pour valider et corriger les images faites par Gemini (réponse en attente du Dr Morand).
7. ✅ doctordle.org analysé le 24 novembre : faisable avec notre base (réponse et plan proposés au Dr Morand).
8. Plus tard : catalogue imprimable des fiches patients, pour un petit classeur à remettre aux patients. Il doit être parfait.
9. Plus tard : analyser docteur-kilinc.com et dire ce dont on pourrait s'inspirer.
10. ✅ Morandle (choix du Dr Morand : nom « Morandle », dans MSK Morand, indice « bonne région ») : page cachée `/locomoteur/morandle/`, un cas par jour, 6 indices, réponse choisie dans les 240 fiches résumées, statistiques et séries locales, partage, cas précédents, mode éditeur (`?editeur=1`). 40 cas pilotes rédigés d'après les fiches (`outils/locomoteur/morandle/cas.json`), tous « en révision » (pastille visible). Mis en ligne le 25 novembre à la demande du Dr Morand, avant validation : les cas se valident au fil de l'eau avec le mode éditeur. Régénérer : `node outils/locomoteur/morandle.mjs [export des décisions]`.

## Demandes du 25 novembre 2026

1. ✅ Quiz (`/entrainement/`) et Morandle (`/locomoteur/morandle/`) en ligne : pages indexées, au plan du site, liens dans l'en-tête de l'accueil (ordinateur), dans « Nouveautés » et dans le hub MSK (section « S'entraîner »), liens croisés entre les deux jeux. Morandle commence le 25 novembre (cas n° 1).
2. ⏳ Images des fiches patients faites par Gemini : abandon des schémas dessinés en SVG (jugés trop mauvais). À faire plus tard : pour chaque image fautive, une consigne de correction à donner à Gemini, ou des photos de référence par cas.
3. ✅ Accueil : trois variantes proposées (parchemin d'origine avec écriture vert forêt et or ; bleu pâle ; bleu marine). Choix du Dr Morand : parchemin, vert forêt et or (mode sombre inchangé, vert forêt foncé).
4. ✅ Quiz : l'explication reste affichée jusqu'à « Question suivante » (ou Entrée) dans tous les modes, sauf le contre-la-montre (passage automatique rapide).
5. ✅ Morandle mis en avant : pastille « Nouveau » sur le lien de l'en-tête de l'accueil, bandeau « Nouveau · Morandle » sous la recherche (à la place des recherches fréquentes sur téléphone ; caché sur un écran de moins de 600 px de haut), grande carte en haut du hub MSK.
6. ✅ Morandle : 12 cas d'archives rédigés d'après les fiches résumées (E4, G10, M12, L11, Pi20, C5, Co8, H4, Ch5, M10, E10, D6), joués comme cas n° 1 à 12 (13 au 24 novembre) ; le cas du 25 novembre (polymyalgia rheumatica) devient le n° 13. Banque : 52 cas, tous « en révision ». Les parties déjà enregistrées passent du n° 1 au n° 13 (stockage morandle-v2) ; les cas précédents comptent dans les statistiques, pas dans la série.
7. ✅ Morandle publié automatiquement : le nouveau cas paraît chaque matin à 7 h, heure de l'Est (la page fait la bascule, heure avancée comprise ; rien à publier chaque jour). Calendrier fixe (`outils/locomoteur/morandle/calendrier.json`) : les jours parus ne changent jamais, les nouveaux cas s'ajoutent à la fin. Cas brouillés dans `donnees.json`. Plus de pastille « En révision » (choix du Dr Morand).
8. ✅ Morandle : banque de 200 cas, un par fiche résumée (40 fiches écartées : douleurs non spécifiques, contusions, fiches génériques, rares ou en doublon). Calendrier jusqu'au 31 mai 2027 environ, puis reprise du début.
9. ✅ « Disjonction » remplacée par « luxation » partout (fiche E4 et son adresse, consultation de l'épaule, quiz, base de données, Morandle, sources) ; l'ancienne adresse de la fiche E4 redirige. Restent dans des images : la planche de la fiche E4 et le PDF patient correspondant (à refaire avec les nouvelles fiches).
10. ✅ Accueil : barre de recherche pleine largeur, « Ctrl K » et « Nouveautés » retirés, bouton « Chercher » vert forêt, sceaux Wealth, Guide, Map, CRDS et Codes agrandis et traits épaissis (originaux : `outils/morand/sceaux-originaux/`, script `outils/morand/sceaux-epaissir.py`).
11. ✅ Fiches patients, version 2 : document texte complet et propositions envoyés ; décisions du Dr Morand appliquées.
    - 129 fiches produites ici d'après la maquette du 25 novembre (format Lettre, une feuille recto verso), avec les titres médicaux, les nouvelles rubriques et la règle de douleur d'une heure.
    - Script : `outils/locomoteur/fiches-patients/produire-fiches.mjs` ; ajouts dans `ajouts/` ; texte assemblé dans `textes-v2/`.
12. ⏳ Fiches patients : révision par OpenEvidence (document `revision/fiches-patients-texte-complet.txt`, une région à la fois), reprise des corrections, puis consignes de dessin pour Gemini et publication sur le site.

13. ✅ Algorithme (demande du 25 novembre) :
    - « Graduel » précisé partout, dans la note seulement : « début graduel sans trauma ni faux mouvement » (le bouton reste « Graduel », à la demande du Dr Morand).
    - Épaule : question « Difficulté à s'habiller le matin » (dans la note ; sans effet sur le calcul, aucune donnée publiée).
    - Épaule : amplitudes ajoutées (abduction active, rotation interne active avec le niveau atteint par le pouce, abduction passive, rotation interne passive à 90° d'abduction, degrés de la rotation externe active et de la flexion passive). Pour la note ; sans poids, faute de valeur publiée.
    - Capsulite : règle de définition (moteur : grappe `definition`, liste `neutralise`). Une rotation externe passive complète et indolore compte une seule fois (RV 0,05, l'estimation déjà en place), et la raideur racontée ou les limitations actives ou passives ne comptent plus en faveur de la capsulite. Histoire typique : 39 % → 9,7 % ; avec limitations actives : 89 % → 7,4 %.
14. ✅ Décisions du Dr Morand : pas de poids pour l'habillage du matin ; la règle de la capsulite suffit ; ajouter les amplitudes qui manquent, surtout en passif (pas de rotations actives de la hanche). Ajouts, sans poids (aucune valeur publiée) :
    - cervical (actif) : flexion, inclinaison latérale ;
    - coude (nouveau bloc PROM) : flexion, extension (déficit), pronation, supination ;
    - poignet (passif) : flexion, extension, déviations radiale et ulnaire ;
    - lombaire (actif) : inclinaison latérale, rotation du tronc ;
    - hanche (passif) : flexion, extension (Thomas) ;
    - cheville (passif) : dorsiflexion (Silfverskiöld), flexion plantaire ;
    - pied (passif) : flexion de l'hallux.
15. ✅ Épaule : test « Uppercut » pour le long biceps (groupe des tests du biceps avec Speed et Yergason : seul le plus fort compte). RV+ 3,38 (Kibler 2009) et RV− 0,26 (Cardoso 2019), tirés de la base FlashCards ; statut « à vérifier », car la fiche de médecine sportive donne Se 77 %, Sp 80 %. Soumis à OpenEvidence sous le code EPAU-P29 ; les codes déjà donnés ne changent plus quand un élément s'ajoute.
16. ✅ Hanche : test de Thomas (négatif, cuisse soulevée, genou qui s'étend, les deux), sans poids (jugé médiocre, Haskel 2021).
17. ✅ Propositions envoyées au Dr Morand (`outils/locomoteur/propositions/2026-11-25-cuisse-jambe-et-tests.md`). Choix : ajouts aux régions existantes, tous les tests recommandés, consigne OpenEvidence.
18. ✅ Tests high yield ajoutés, chiffres de la base FlashCards, statut « à vérifier » (liste OpenEvidence à jour, codes stables) :
    - épaule : Jerk, Kim, critères EULAR/ACR 2012 de la polymyalgia (score ; remplace la raideur matinale, l'horaire et les autres articulations) ;
    - poignet et main : extension et adduction du 1er métacarpien, synergie de l'ECU ;
    - hanche : HEC, test actif du piriforme et étirement assis (les deux négatifs), compression pelvienne de Nouraei (remplace l'ancienne compression du nerf cutané) ;
    - genou : appréhension dynamique inversée, inclinaison de la rotule, test actif du quadriceps, règle de Pittsburgh (alerte) ;
    - lombaire : test d'Adams (remplace « gibbosité »), symphyse et Trendelenburg modifié (grossesse) ; le sill sign y était déjà ;
    - cheville : score CAIT, critères de Liu.
19. ✅ Schéma du corps : zones cuisse (hanche et genou) et jambe (genou et cheville), de face et de dos, avec le côté.
20. ⏳ Cuisse et jambe : consigne OpenEvidence envoyée (`outils/locomoteur/delegation/openevidence-cuisse-jambe.md`, blocs 1 à 6). Les nouveaux diagnostics seront ajoutés à la réception des fréquences et des signes.
21. ⏳ Fiches patients v2 : dossier OpenEvidence par région envoyé (`outils/locomoteur/fiches-patients/revision/openevidence/`).
22. ✅ Fiches patients v2 : retour à la règle de douleur « le lendemain matin » (décision du 26 novembre ; fiches régénérées). Les fiches déjà envoyées à OpenEvidence disent « dans l'heure » : à l'intégration, la règle reste « le lendemain matin » (`outils/locomoteur/fiches-patients/CORRECTIONS.md`).
23. ✅ Fiches patients v2 : révision d'OpenEvidence intégrée pour les 9 régions (129 fiches ; épaule et parties coupées ajoutées le 26 novembre). Tri selon la consigne du Dr Morand : sécurité, erreurs et cohérence retenues ; nuances par manque d'études, statistiques et délai d'une heure écartés. Sommaire : `outils/locomoteur/fiches-patients/revision/integration/00-SOMMAIRE.md`.
24. ✅ OpenEvidence complété : épaule (EPA-01 à 14), PIE-12 à 14, HAN-11 à 15. Règle de douleur de CHE-08 (Sever) à 2 sur 10, comme les autres apophysites.
25. ⏳ Fiches patients v2, une fois toutes les révisions d'OpenEvidence reçues : repasser sur le texte de toutes les fiches et le simplifier pour un niveau de scolarité faible (peu de statistiques, pas d'études dans le texte du patient). Règles : `outils/locomoteur/fiches-patients/CORRECTIONS.md`.
26. ✅ Outil d'intégration corrigé : les descriptions de changement d'OpenEvidence (« ajout », « texte nuancé », « nouveau texte », « deux lignes ci-dessus ») ne sont plus collées au texte du patient (45 phrases corrigées dans le cervical, le coude, l'épaule, le genou et la hanche) ; « 5ᵉ » gardé ; vérification de tout le texte des 129 fiches sans reste de note.
