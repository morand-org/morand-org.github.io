# Tâches déléguées (Gemini, ChatGPT)

Prompts à copier dans un autre assistant ; les réponses reviennent ici (un fichier daté par réponse) avant d'être intégrées.
Identifiants des diagnostics : `liste-diagnostics.txt` (« région-id = nom »).

## 1. Fiches « high yield » (texte) — une région par requête

```
Tu rédiges des fiches cliniques « high yield » en français (Québec) pour un outil d'aide à la décision en médecine
musculosquelettique de première ligne (médecine familiale et médecine du sport). Lecteur : médecin, pendant la consultation.

Pour chaque pathologie de la liste, une fiche de 100 à 150 mots (sans compter le titre ni les sources), avec exactement
ces rubriques, dans cet ordre :
- ligne : « Région · Plainte typique · Type » (ex. « Genou · Douleur antérieure · Pathologie de surcharge »)
- epidemiologie : qui est typiquement atteint
- presentation : symptômes, localisation, facteurs aggravants, éléments caractéristiques de l'anamnèse
- examen : 2 à 4 trouvailles ou tests réellement utiles (avec leur valeur si elle est solide, ex. « RV+ 5,7 »)
- physiopathologie : une seule phrase
- ddx : 3 à 5 diagnostics différentiels principaux
- investigations : imagerie ou laboratoire, et quand les demander (règles canadiennes : Ottawa, Choisir avec soin)
- traitement : première ligne, puis principales options de deuxième ligne (doses usuelles si médicament)
- pronostic : évolution habituelle et délai approximatif de récupération

Règles : aucune liste exhaustive de symptômes ; aucun test orthopédique peu discriminant ; aucune trouvaille négative
systématique ; chaque phrase doit servir à la pratique. Privilégier les lignes directrices québécoises et canadiennes,
sinon les méta-analyses et lignes directrices internationales récentes. N'invente aucun chiffre : si une valeur n'est
pas solide, n'en donne pas. Ajoute 1 à 3 sources réelles par fiche (premier auteur, année, revue, PMID ou DOI).

Réponds uniquement en JSON valide : un tableau d'objets
{ "id": "...", "titre": "...", "ligne": "...", "epidemiologie": "...", "presentation": "...", "examen": "...",
  "physiopathologie": "...", "ddx": "...", "investigations": "...", "traitement": "...", "pronostic": "...",
  "sources": ["Auteur, année, revue, PMID ..."] }

Liste (id = nom) :
[COLLER ICI LES LIGNES D'UNE RÉGION DE liste-diagnostics.txt]
```

## 2. Illustrations des fiches — une image par pathologie

Style de référence : l'atlas des pathologies du genou (planches anatomiques classiques). L'image reste secondaire : la
fiche met l'accent sur le texte.

```
Create one anatomical illustration in the style of a 19th-century medical atlas plate: finely engraved, hand-coloured
anatomy (bones in ivory, ligaments and tendons in pale pearly beige, muscles in muted brick red), soft shading, on a
plain warm parchment background (#F3EBDD), centred, with generous margins. The affected structure must be clearly
highlighted in a muted crimson glow; everything else stays in neutral tones. No text, no labels, no letters, no arrows,
no frame, no watermark, no signature. Realistic adult anatomy (adolescent anatomy only when stated). Portrait 4:5,
at least 1600 × 2000 px, PNG.

Subject: [RÉGION] — [PATHOLOGIE]. View: [VUE]. Highlight: [STRUCTURE].
```

Genou (vue et structure à mettre en évidence) — nommer chaque fichier `genou-<id>.png` :
- sfp : vue antéro-latérale ; cartilage rétro-patellaire et trochlée
- arthrose : vue antérieure, genou en extension ; compartiment fémoro-tibial médial (cartilage aminci, ostéophytes)
- menisque : vue supérieure du plateau tibial ; déchirure de la corne postérieure du ménisque médial
- lca : vue antérieure, genou fléchi à 90°, rotule retirée ; ligament croisé antérieur rompu
- lcp : même vue ; ligament croisé postérieur
- collat : vue médiale ; ligament collatéral médial
- rotule : vue antérieure ; rotule luxée en latéral, rétinaculum médial déchiré
- tendino : vue latérale ; tendon rotulien au pôle inférieur de la rotule
- hoffa : coupe sagittale ; coussinet adipeux infrapatellaire
- bit : vue latérale ; bandelette ilio-tibiale sur l'épicondyle fémoral latéral
- bprep : coupe sagittale ; bourse prépatellaire enflée
- poie : vue médiale ; tendons de la patte d'oie et leur bourse
- osgood : vue latérale, genou d'adolescent ; tubérosité tibiale et cartilage de croissance
- slj : vue latérale, genou d'adolescent ; pôle inférieur de la rotule
- contusion : vue antérieure ; tissus mous antérieurs ecchymotiques, structures intactes
- plica : vue antérieure, articulation ouverte ; plica synoviale médiale
- ocd : vue antérieure, genou fléchi ; fragment ostéochondral du condyle fémoral médial
- discoide : vue supérieure du plateau tibial ; ménisque latéral discoïde
- cristaux : coupe frontale ; dépôts cristallins dans le cartilage et les ménisques
- arthrite : coupe frontale ; synoviale épaissie et épanchement
- septique : coupe frontale ; synoviale enflammée et épanchement purulent
- baker : vue postérieure ; kyste poplité entre semi-membraneux et gastrocnémien médial
- insuff : coupe frontale ; lésion sous-chondrale du condyle fémoral médial

## 3. Cas cliniques de validation

```
Crée 30 vignettes cliniques réalistes de première ligne pour valider un outil de diagnostic différentiel
musculosquelettique : 5 genou, 5 cheville, 5 pied, 5 hanche ou aine, 5 lombaire, 5 épaule. Varie l'âge (12 à 85 ans),
le sexe et la difficulté ; inclus au moins 6 cas avec un drapeau rouge (fracture, arthrite septique, queue de cheval,
néoplasie, rupture tendineuse, épiphysiolyse…) et 4 cas ambigus. Pour chaque cas, donne seulement des éléments
d'anamnèse et d'examen standard (début, durée, mécanisme, siège, facteurs aggravants, signes associés, tests
d'examen nommés avec leur résultat), sans écrire le diagnostic dans la vignette.

Réponds en JSON : [{ "region": "...", "age": 0, "sexe": "F|M", "anamnese": ["..."], "examen": ["..."],
"diagnostic_de_reference": "...", "differentiels_acceptables": ["..."], "drapeau_rouge": true|false,
"justification": "..." }]
```
