# Validation par vignettes

Produit par `node outils/locomoteur/validation/valider.mjs`. Vignettes : vignettes-2026-11-22.json (32 cas rédigés par ChatGPT), transcrites dans cas-vignettes.mjs.

- Diagnostic de référence en tête : 26/31 (84 %)
- Dans les 3 premiers : 31/31 (100 %)
- Référence ou différentiel acceptable dans les 5 premiers : 31/31 (100 %)
- Drapeaux rouges détectés : 11/11 (100 %)
- Alertes urgentes sans drapeau rouge : 0

| n° | région | référence | rang | probabilité | 3 premiers | drapeau rouge | alertes |
|---|---|---|---|---|---|---|---|
| 1 | genou | Syndrome douloureux fémoropatellaire (sfp) | 1 | 99 % | sfp 99 %, bit 5 %, hoffa 3 % | — | — |
| 2 | genou | Gonarthrose à prédominance fémorotibiale médiale (arthrose) | 1 | 100 % | arthrose 100 %, menisque 36 %, baker 3 % | — | — |
| 3 | genou | Rupture du ligament croisé antérieur (lca) | 1 | 100 % | lca 100 %, menisque 87 %, collat 45 % | — | info : Règle d'Ottawa à compléter |
| 4 | genou | Arthrite septique du genou (septique) | 2 | 38 % | cristaux 98 %, septique 38 %, arthrose 23 % | détecté (alerte) | urgence : Arthrite septique à éliminer |
| 5 | genou | Maladie d'Osgood-Schlatter (osgood) | 1 | 90 % | osgood 90 %, sfp 29 %, tendino 19 % | — | info : Examiner la hanche |
| 6 | cheville | Entorse latérale de la cheville, prédominant sur le ligament talofibulaire antérieur (entorse_lat) | 1 | 100 % | entorse_lat 100 %, syndesmose 14 %, lot 3 % | — | info : Règles d'Ottawa négatives |
| 7 | cheville | Rupture complète du tendon d'Achille (rupture_achille) | 1 | 100 % | rupture_achille 100 %, mollet 0 %, nonspec 0 % | détecté (alerte) | rapide : Rupture du tendon d'Achille à éliminer ; info : Règles d'Ottawa à compléter |
| 8 | cheville | Dysfonction du tendon tibial postérieur avec pied plat acquis de l'adulte (tibpost) | 1 | 100 % | tibpost 100 %, tarsien 10 %, nonspec 0 % | — | — |
| 9 | cheville | Lésion ostéochondrale du dôme talien (lot) | 2 | 25 % | nonspec 54 %, lot 25 %, conflit 12 % | — | considerer : Fracture manquée ou lésion associée à éliminer |
| 10 | cheville | Arthrite microcristalline aiguë de la cheville (cristaux) | 1 | 98 % | cristaux 98 %, arthrose 5 %, nonspec 1 % | détecté (alerte) | rapide : Arthrite septique ou microcristalline à éliminer |
| 11 | cheville | Conflit antérieur de cheville (conflit) | 1 | 78 % | conflit 78 %, nonspec 18 %, arthrose 7 % | — | — |
| 12 | pied | Fasciopathie plantaire (fasciite) | 1 | 100 % | fasciite 100 %, sever 0 %, nonspec 0 % | — | — |
| 13 | pied | Hallux rigidus (hallux_rigidus) | 1 | 98 % | hallux_rigidus 98 %, hallux_valgus 40 %, sesamoide 3 % | — | — |
| 14 | pied | Névrome interdigital de Morton (morton) | 1 | 96 % | morton 96 %, metatarsalgie 8 %, nonspec 4 % | — | — |
| 15 | pied | Neuroarthropathie de Charcot aiguë (charcot) | 1 | 100 % | charcot 100 %, fracture 9 %, goutte 1 % | détecté (alerte) | urgence : Pied de Charcot ou infection du pied diabétique à éliminer ; rapide : Arthrite septique ou microcristalline à éliminer |
| 16 | pied | Fracture de stress du deuxième métatarsien (ff_mt) | 1 | 75 % | ff_mt 75 %, nonspec 21 %, ff_navic 10 % | — | — |
| 17 | pied | Lésion de Lisfranc (lisfranc) | 1 | 100 % | lisfranc 100 %, fracture 82 %, contusion 1 % | détecté (alerte) | rapide : Lésion de Lisfranc à éliminer ; rapide : Fracture du calcanéus à éliminer ; info : Règles d'Ottawa du pied à compléter |
| 18 | hanche | Épiphysiolyse fémorale supérieure (epiphysiolyse) | 1 | 92 % | epiphysiolyse 92 %, nonspec 8 %, cfa 5 % | détecté (alerte) | urgence : Épiphysiolyse fémorale supérieure à éliminer ; considerer : Origine lombaire à considérer |
| 19 | hanche | Coxarthrose (coxarthrose) | 1 | 100 % | coxarthrose 100 %, sdgt 17 %, lombaire 6 % | — | — |
| 20 | hanche | Conflit fémoro-acétabulaire symptomatique (cfa) | 1 | 75 % | cfa 75 %, nonspec 17 %, psoas 17 % | — | — |
| 21 | hanche | Fracture proximale du fémur (fracture) | 1 | 100 % | fracture 100 %, bassin 94 %, contusion 0 % | détecté (alerte) | urgence : Fracture de la hanche à éliminer |
| 22 | hanche | Syndrome douloureux du grand trochanter (sdgt) | 1 | 100 % | sdgt 100 %, coxarthrose 1 %, lombaire 1 % | — | — |
| 23 | lombaire | Lombalgie mécanique aiguë non spécifique (commune) | 2 | 28 % | musculaire 90 %, commune 28 %, discogenique 11 % | — | — |
| 24 | lombaire | Radiculopathie S1 droite probablement liée à une hernie discale L5-S1 (hernie) | 1 | 100 % | hernie 100 %, discogenique 15 %, stenose 2 % | — | — |
| 25 | lombaire | Métastase vertébrale lombaire (cancer) | 1 | 61 % | cancer 61 %, commune 21 %, facettaire 7 % | détecté (alerte) | rapide : Néoplasie rachidienne à éliminer ; rapide : Tumeur ou atteinte systémique à éliminer |
| 26 | lombaire | Syndrome de la queue de cheval (queue) | 2 | 63 % | hernie 87 %, queue 63 %, commune 13 % | détecté (alerte) | urgence : Syndrome de la queue de cheval à éliminer ; rapide : Déficit moteur radiculaire |
| 27 | lombaire | Spondyloarthrite axiale (spa) | 1 | 88 % | spa 88 %, si 16 %, commune 10 % | — | — |
| 28 | epaule | Syndrome douloureux sous-acromial lié à une tendinopathie de la coiffe des rotateurs (sous_acro) | 1 | 100 % | sous_acro 100 %, calcifiante 31 %, rupture 6 % | — | — |
| 29 | epaule | Rupture transfixiante aiguë de la coiffe des rotateurs (rupture) | 1 | 100 % | rupture 100 %, sous_acro 63 %, fracture_hp 10 % | détecté (alerte) | rapide : Rupture traumatique de la coiffe à éliminer |
| 30 | epaule | Capsulite adhésive de l'épaule (capsulite) | 1 | 100 % | capsulite 100 %, omarthrose 6 %, sous_acro 0 % | — | — |
| 31 | epaule | Tendinopathie de la longue portion du biceps (biceps) | 2 | 14 % | sous_acro 17 %, biceps 14 %, slap 14 % | — | — |
| 32 | epaule | Néoplasie apicale pulmonaire avec douleur référée à l'épaule (hors liste) | — | — | sous_acro 39 %, capsulite 20 %, calcifiante 6 % | détecté (alerte) | rapide : Tumeur ou atteinte systémique à éliminer |
