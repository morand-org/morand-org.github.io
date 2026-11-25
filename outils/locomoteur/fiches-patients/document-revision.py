# MSK Morand : produit les documents de révision des fiches patients (novembre 2026).
#   python3 -I outils/locomoteur/fiches-patients/document-revision.py
# Lit les textes des fiches (outils/locomoteur/fiches-patients/textes/<région>.json, ceux qui ont servi aux PDF publiés)
# et la version corrigée du doigt à ressaut (PDF). Écrit dans outils/locomoteur/fiches-patients/revision/ :
#   - fiches-patients-texte-complet.txt : toutes les fiches, par région, avec la consigne pour OpenEvidence ;
#     chaque région se suffit à elle-même (à envoyer une région à la fois) ; chaque fiche porte un identifiant
#     [région/id] pour reprendre les corrections ;
#   - propositions-fiches-patients.md : propositions générales (propositions-generales.md, écrites à la main), puis
#     titres médicaux proposés, relevé automatique par fiche et diagnostics sans fiche.
import json, os, re, subprocess

RACINE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.."))
SORTIE = os.path.join(RACINE, "outils/locomoteur/fiches-patients/revision")
os.makedirs(SORTIE, exist_ok=True)
REGIONS = [("cervical", "Rachis cervical"), ("epaule", "Épaule"), ("coude", "Coude"), ("poignet", "Poignet et main"),
           ("lombaire", "Rachis lombaire"), ("hanche", "Hanche et bassin"), ("genou", "Genou"),
           ("cheville", "Cheville et jambe"), ("pied", "Pied")]

# Titres proposés : le terme médical en titre, le langage courant en sous-titre (demande du Dr Morand).
TITRES = {
 "cervical/nonspec": ("Cervicalgie mécanique", "Douleur mécanique au cou"),
 "cervical/myofascial": ("Syndrome myofascial du trapèze supérieur", "Tensions et nœuds musculaires entre le cou et l'épaule"),
 "cervical/facettaire": ("Syndrome facettaire cervical", "Douleur des petites articulations à l'arrière du cou"),
 "cervical/arthrose": ("Arthrose cervicale (discopathie dégénérative)", "Usure normale du cou"),
 "cervical/entorse": ("Entorse cervicale (coup de fouet)", "Entorse du cou après un choc"),
 "cervical/cervicogenique": ("Céphalée cervicogénique", "Mal de tête venant du cou"),
 "cervical/musculaire": ("Contracture ou élongation musculaire cervicale", "Muscle du cou tiré ou contracté"),
 "cervical/radiculopathie": ("Radiculopathie cervicale", "Nerf irrité au cou avec douleur au bras"),
 "cervical/stinger": ("Neurapraxie du plexus brachial (stinger)", "Décharge électrique dans un bras après un impact"),
 "cervical/torticolis": ("Torticolis aigu", "Cou bloqué d'un côté"),
 "cervical/defile": ("Syndrome du défilé thoracique neurogène", "Nerfs à l'étroit entre le cou et l'épaule"),
 "cervical/arnold": ("Névralgie occipitale (névralgie d'Arnold)", "Douleur vive à l'arrière du crâne"),
 "epaule/sous_acro": ("Tendinopathie de la coiffe des rotateurs (douleur sous-acromiale)", "Douleur aux tendons de l'épaule"),
 "epaule/myalgie": ("Myalgie de l'épaule", "Douleur musculaire de l'épaule"),
 "epaule/capsulite": ("Capsulite adhésive", "Épaule gelée"),
 "epaule/ac_entorse": ("Entorse ou luxation acromio-claviculaire", "Entorse sur le dessus de l'épaule"),
 "epaule/rupture": ("Rupture transfixiante de la coiffe des rotateurs", "Déchirure d'un tendon de l'épaule"),
 "epaule/dyskinesie": ("Dyskinésie scapulaire", "Mouvement modifié de l'omoplate"),
 "epaule/omarthrose": ("Arthrose gléno-humérale", "Usure du cartilage de l'épaule"),
 "epaule/calcifiante": ("Tendinopathie calcifiante de l'épaule", "Dépôt de calcium dans un tendon de l'épaule"),
 "epaule/instab_ant": ("Instabilité antérieure de l'épaule", "Épaule instable ou déboîtée vers l'avant"),
 "epaule/ac_arthrose": ("Arthrose acromio-claviculaire ou ostéolyse distale de la clavicule", "Usure de la petite articulation sur le dessus de l'épaule"),
 "epaule/biceps": ("Tendinopathie du long biceps", "Douleur à l'avant de l'épaule"),
 "epaule/cervical": ("Douleur projetée d'origine cervicale", "Douleur à l'épaule venant du cou"),
 "epaule/slap": ("Lésion SLAP (bourrelet supérieur de l'épaule)", "Atteinte du bourrelet de l'épaule"),
 "epaule/instab_post": ("Instabilité postérieure ou multidirectionnelle de l'épaule", "Épaule trop souple ou instable"),
 "coude/epi_lat": ("Épicondylite latérale (tennis elbow)", "Douleur à l'extérieur du coude"),
 "coude/epi_med": ("Épicondylite médiale (golfer's elbow)", "Douleur à l'intérieur du coude"),
 "coude/lanceur": ("Apophysite de l'épicondyle médial (coude du jeune lanceur)", "Irritation du cartilage de croissance du coude"),
 "coude/tunnel_cubital": ("Syndrome du tunnel cubital", "Nerf irrité à l'intérieur du coude"),
 "coude/bursite": ("Bursite olécrânienne", "Enflure à la pointe du coude"),
 "coude/arthrose": ("Arthrose du coude", "Usure de l'articulation du coude"),
 "coude/lcu": ("Entorse du ligament collatéral ulnaire du coude", "Entorse du ligament interne du coude chez le lanceur"),
 "coude/ocd": ("Ostéochondrite disséquante du capitulum", "Zone d'os et de cartilage fragilisée au coude"),
 "coude/conflit_post": ("Conflit postérieur du coude (surcharge en valgus-extension)", "Douleur à l'arrière du coude chez le lanceur"),
 "coude/triceps": ("Tendinopathie distale du triceps", "Douleur au tendon à l'arrière du coude"),
 "coude/tunnel_radial": ("Syndrome du tunnel radial", "Nerf irrité sur le dessus de l'avant-bras"),
 "coude/cervical": ("Douleur projetée d'origine cervicale (C6–C7)", "Douleur au coude venant du cou"),
 "poignet/canal_carpien": ("Syndrome du canal carpien", "Fourmillements dans la main"),
 "poignet/kyste": ("Kyste synovial", "Petite bosse bénigne au poignet ou au doigt"),
 "poignet/dequervain": ("Ténosynovite de De Quervain", "Douleur au bord du poignet, du côté du pouce"),
 "poignet/tenosynovite": ("Ténosynovite de l'extenseur ulnaire du carpe ou syndrome de l'intersection", "Tendinite du dos du poignet ou du côté du petit doigt"),
 "poignet/arthrose_poignet": ("Arthrose du poignet", "Usure du cartilage du poignet"),
 "poignet/tfcc": ("Lésion du complexe fibrocartilagineux triangulaire (TFCC)", "Douleur au poignet du côté du petit doigt"),
 "poignet/scapholunaire": ("Lésion du ligament scapho-lunaire", "Entorse d'un ligament du centre du poignet"),
 "poignet/gymnaste": ("Poignet du gymnaste (stress du cartilage de croissance du radius)", "Douleur au poignet chez le jeune gymnaste"),
 "poignet/guyon": ("Neuropathie ulnaire au canal de Guyon", "Nerf comprimé au talon de la main"),
 "poignet/arthrose_digitale": ("Arthrose digitale (nodules d'Heberden et de Bouchard)", "Arthrose des doigts"),
 "poignet/rhizarthrose": ("Rhizarthrose", "Arthrose à la base du pouce"),
 "poignet/ressaut": ("Doigt à ressaut (ténosynovite sténosante des fléchisseurs)", "Doigt qui accroche ou reste bloqué"),
 "poignet/entorse_doigt": ("Entorse ou luxation interphalangienne", "Entorse d'un doigt"),
 "poignet/dupuytren": ("Maladie de Dupuytren", "Épaississement de la paume"),
 "poignet/lcu_pouce": ("Entorse du ligament collatéral ulnaire du pouce (pouce du skieur)", "Entorse à la base du pouce"),
 "poignet/poulie": ("Lésion de poulie digitale du grimpeur", "Lésion d'une poulie du doigt"),
 "poignet/cervical": ("Douleur projetée d'origine cervicale (C6–C8)", "Douleur ou picotements à la main venant du cou"),
 "lombaire/commune": ("Lombalgie mécanique", "Mal de dos courant"),
 "lombaire/musculaire": ("Contracture ou lésion musculaire lombaire", "Faux mouvement ou contracture du bas du dos"),
 "lombaire/discogenique": ("Discopathie dégénérative (douleur discogénique)", "Douleur liée à un disque du bas du dos"),
 "lombaire/facettaire": ("Syndrome facettaire lombaire", "Douleur des petites articulations du bas du dos"),
 "lombaire/grossesse": ("Lombalgie et douleur pelvienne de la grossesse", "Mal de dos et douleur du bassin pendant la grossesse"),
 "lombaire/stenose": ("Sténose spinale lombaire", "Canal lombaire étroit"),
 "lombaire/si": ("Douleur sacro-iliaque", "Douleur de l'articulation du bassin"),
 "lombaire/hernie": ("Hernie discale lombaire avec radiculopathie (sciatique ou cruralgie)", "Nerf irrité dans le bas du dos et la jambe"),
 "lombaire/spondylolisthesis": ("Spondylolisthésis dégénératif", "Léger glissement d'une vertèbre"),
 "lombaire/spondylolyse": ("Spondylolyse ou spondylolisthésis isthmique", "Fissure de fatigue dans une vertèbre"),
 "lombaire/scoliose": ("Scoliose dégénérative de l'adulte", "Courbure de la colonne chez l'adulte"),
 "lombaire/spa": ("Spondyloarthrite axiale", "Raideur inflammatoire du dos"),
 "hanche/coxarthrose": ("Coxarthrose", "Arthrose de la hanche"),
 "hanche/sdgt": ("Syndrome douloureux du grand trochanter (tendinopathie glutéale)", "Douleur sur le côté de la hanche"),
 "hanche/adducteurs": ("Pubalgie des adducteurs", "Douleur aux muscles à l'intérieur de la cuisse"),
 "hanche/ij_aigu": ("Lésion aiguë des ischio-jambiers", "Claquage à l'arrière de la cuisse"),
 "hanche/cfa": ("Conflit fémoro-acétabulaire ou lésion du labrum", "Pincement à l'avant de la hanche"),
 "hanche/psoas": ("Tendinopathie de l'ilio-psoas ou hanche à ressaut", "Tendon qui claque ou tire à l'avant de la hanche"),
 "hanche/piriforme": ("Syndrome du piriforme (syndrome fessier profond)", "Douleur profonde dans la fesse"),
 "hanche/meralgie": ("Méralgie paresthésique", "Brûlure ou engourdissement sur le côté de la cuisse"),
 "hanche/osteite": ("Ostéite pubienne", "Irritation de l'os du pubis"),
 "hanche/parietale": ("Pubalgie pariétale", "Douleur à l'aine du sportif"),
 "hanche/avulsion": ("Avulsion apophysaire du bassin", "Arrachement d'une zone de croissance du bassin chez l'adolescent"),
 "hanche/ij_tendino": ("Tendinopathie proximale des ischio-jambiers", "Tendinite en haut de l'arrière de la cuisse"),
 "hanche/apophysite": ("Apophysite de la crête iliaque", "Douleur sur le bord de l'os du bassin chez l'adolescent"),
 "hanche/contusion": ("Contusion de la cuisse ou de la crête iliaque", "Coup direct sur la cuisse ou l'os de la hanche"),
 "hanche/lombaire": ("Douleur projetée d'origine lombaire", "Douleur à la hanche venant du bas du dos"),
 "genou/sfp": ("Syndrome fémoro-patellaire", "Douleur à l'avant du genou"),
 "genou/arthrose": ("Gonarthrose (arthrose du genou)", "Usure du cartilage du genou"),
 "genou/menisque": ("Déchirure méniscale", "Lésion du ménisque, le coussin du genou"),
 "genou/lca": ("Rupture du ligament croisé antérieur (LCA)", "Déchirure du ligament croisé antérieur : première phase"),
 "genou/lcp": ("Entorse du ligament croisé postérieur (LCP)", "Entorse d'un ligament au centre du genou"),
 "genou/collat": ("Entorse d'un ligament collatéral du genou", "Entorse d'un ligament sur le côté du genou"),
 "genou/rotule": ("Instabilité ou luxation de la rotule", "Rotule qui se déplace ou est instable"),
 "genou/tendino": ("Tendinopathie rotulienne ou quadricipitale", "Tendinite sous ou au-dessus de la rotule"),
 "genou/hoffa": ("Syndrome du coussinet adipeux (maladie de Hoffa)", "Irritation du coussinet sous la rotule"),
 "genou/bit": ("Syndrome de la bandelette ilio-tibiale", "Douleur à l'extérieur du genou"),
 "genou/bprep": ("Bursite prépatellaire", "Enflure devant la rotule"),
 "genou/poie": ("Tendinobursite de la patte d'oie", "Douleur sous l'intérieur du genou"),
 "genou/osgood": ("Maladie d'Osgood-Schlatter", "Douleur sur la bosse sous le genou chez l'adolescent"),
 "genou/slj": ("Maladie de Sinding-Larsen-Johansson", "Douleur à la pointe basse de la rotule chez l'adolescent"),
 "genou/contusion": ("Contusion ou entorse légère du genou", "Coup ou torsion légère du genou"),
 "genou/plica": ("Syndrome de la plica", "Repli irrité à l'intérieur du genou"),
 "genou/discoide": ("Ménisque discoïde", "Ménisque de forme plus large"),
 "genou/baker": ("Kyste poplité (kyste de Baker)", "Petite poche de liquide derrière le genou"),
 "cheville/entorse_lat": ("Entorse latérale de la cheville", "Entorse externe de la cheville"),
 "cheville/instab": ("Instabilité chronique de la cheville", "Cheville qui se tord souvent"),
 "cheville/achille": ("Tendinopathie d'Achille corporéale", "Tendinite du milieu du tendon d'Achille"),
 "cheville/insertion": ("Tendinopathie d'insertion d'Achille (maladie de Haglund, bursite rétro-calcanéenne)", "Douleur à l'attache du tendon d'Achille sur le talon"),
 "cheville/periostite": ("Syndrome de stress tibial médial (périostite tibiale)", "Douleur le long du tibia"),
 "cheville/loge": ("Syndrome compartimental chronique d'effort", "Tension musculaire à l'effort dans la jambe"),
 "cheville/mollet": ("Déchirure du gastrocnémien médial (tennis leg)", "Claquage du mollet"),
 "cheville/sever": ("Maladie de Sever (apophysite calcanéenne)", "Douleur au talon chez l'enfant ou l'adolescent"),
 "cheville/tibpost": ("Dysfonction du tendon tibial postérieur", "Tendinite à l'intérieur de la cheville"),
 "cheville/arthrose": ("Arthrose de la cheville", "Usure du cartilage de la cheville"),
 "cheville/syndesmose": ("Entorse de la syndesmose (entorse haute)", "Entorse haute de la cheville"),
 "cheville/deltoide": ("Entorse du ligament deltoïde", "Entorse interne de la cheville"),
 "cheville/fibulaires": ("Tendinopathie des fibulaires", "Tendinite sur le côté extérieur de la cheville"),
 "cheville/conflit": ("Conflit antérieur ou postérieur de la cheville", "Pincement à l'avant ou à l'arrière de la cheville"),
 "cheville/tarsien": ("Syndrome du tunnel tarsien", "Nerf irrité à l'intérieur de la cheville"),
 "pied/fasciite": ("Fasciite plantaire", "Douleur sous le talon"),
 "pied/hallux_valgus": ("Hallux valgus", "Déviation du gros orteil (oignon)"),
 "pied/orteils": ("Orteils en griffe ou en marteau, et bunionette", "Déformation des petits orteils"),
 "pied/arthrose_mp": ("Arthrose du médio-pied", "Arthrose du milieu du pied"),
 "pied/hallux_rigidus": ("Hallux rigidus", "Arthrose et raideur du gros orteil"),
 "pied/metatarsalgie": ("Métatarsalgie (lésion de la plaque plantaire)", "Douleur sous l'avant du pied"),
 "pied/morton": ("Névrome de Morton", "Nerf irrité entre deux orteils"),
 "pied/turf_toe": ("Entorse de la plaque plantaire de l'hallux (turf toe)", "Entorse sous la base du gros orteil"),
 "pied/sesamoide": ("Sésamoïdite", "Douleur sous le coussin du gros orteil"),
 "pied/synostose": ("Synostose du tarse (coalition tarsienne)", "Pont entre deux os du pied"),
 "pied/os_navic": ("Os naviculaire accessoire douloureux", "Petite bosse osseuse sensible à l'intérieur du pied"),
 "pied/iselin": ("Maladie d'Iselin (apophysite de la base du 5e métatarsien)", "Douleur sur la bosse externe du pied chez le jeune"),
 "pied/sever": ("Maladie de Sever (apophysite calcanéenne)", "Douleur au talon chez l'enfant ou l'adolescent"),
 "pied/contusion": ("Contusion ou écrasement du pied", "Coup ou écrasement du pied"),
}
RESSAUT_PDF = "locomoteur/poignet/patients/12-doigt-qui-accroche-ou-reste-bloque-doigt-a-ressaut.pdf"

CONSIGNE = """CONSIGNE POUR OPENEVIDENCE (à coller avant chaque région)
Vous révisez des fiches d'information remises aux patients en médecine familiale, au Québec (français québécois).
Pour chaque fiche ci-dessous :
1. Vérifiez l'exactitude et l'actualité de chaque énoncé selon les données probantes et les guides de pratique
   récents (de préférence canadiens ou québécois : INESSS, Choisir avec soin Canada, sociétés savantes ; sinon NICE,
   ACR, AAOS, JOSPT, BJSM).
2. Vérifiez la sécurité, la pertinence et le dosage de chaque exercice (position de départ, mouvement, séries,
   répétitions, fréquence, progression), pour la phase de la blessure visée.
3. Vérifiez les signes qui doivent faire reconsulter, et séparez ceux qui exigent une consultation urgente.
4. Vérifiez chaque référence (auteurs, titre, revue, année, PMID ou DOI) ; proposez une référence plus récente
   si elle existe.
5. Gardez un langage simple (niveau de lecture de 6e année), le vouvoiement et les termes québécois.
Renvoyez chaque fiche au complet, dans la même structure, avec le même identifiant entre crochets.
Marquez chaque changement ainsi : [MODIFIÉ : ancien texte → nouveau texte — raison ; référence].
N'inventez aucune donnée : écrivez « À VÉRIFIER » en cas de doute.
"""


def liste(items):
    return "\n".join(f"  - {x}" for x in items)


def texte_fiche(no, r, x):
    cle = f"{r}/{x['id']}"
    titre, sous = TITRES.get(cle, (x["nom"], x["titre_patient"]))
    l = [f"=== FICHE {no} · [{cle}] ===",
         f"Titre actuel : {x['titre_patient']}",
         f"Titre proposé (terme médical) : {titre}",
         f"Sous-titre proposé (langage courant) : {sous}",
         f"Diagnostic correspondant dans MSK Morand : {x['nom']}", ""]
    if cle == "poignet/ressaut":
        brut = subprocess.run(["pdftotext", os.path.join(RACINE, RESSAUT_PDF), "-"], capture_output=True, text=True).stdout
        lignes = [s.strip() for s in brut.splitlines() if s.strip() and not re.match(r"^(Recto|Verso) · Page|^FICHE PATIENT|^FICHE \d+ / \d+|^Document d'information patient", s.strip())]
        l += ["(Texte tiré de la version corrigée publiée le 24 novembre 2026.)", ""] + lignes + [""]
        return "\n".join(l)
    l += ["CE QUE VOUS AVEZ", "  " + x["ce_que_vous_avez"], "",
          "CE QUI AIDE", liste(x["ce_qui_aide"]), "",
          "À ÉVITER POUR L'INSTANT", liste(x["a_eviter_pour_l_instant"]), "",
          "RÈGLE DE DOULEUR (0 À 10)", "  " + x["regle_de_douleur"], "",
          "QUAND RECONSULTER", liste(x["quand_reconsulter"]), "",
          "DURÉE HABITUELLE", "  " + x["duree_habituelle"], "",
          "PROGRAMME D'EXERCICES"]
    for k, e in enumerate(x.get("exercices", []), 1):
        l += [f"  Exercice {k} : {e.get('nom', '')}",
              f"    Départ : {e.get('position_de_depart', '')}",
              f"    Mouvement : {e.get('mouvement', '')}",
              f"    Dosage : {e.get('dosage', '')}",
              f"    Progression : {e.get('progression', '')}",
              f"    Erreur fréquente : {e.get('erreur_frequente', '')}",
              f"    Illustration demandée : {e.get('illustration', '')}"]
    l += ["", "RÉFÉRENCES"]
    l += [f"  - {ref.get('texte', '')}" + (f" ({ref['doi_ou_pmid']})" if ref.get("doi_ou_pmid") else "") for ref in x.get("references", [])]
    return "\n".join(l) + "\n"


def releve(r, x):
    """Points à revoir, relevés automatiquement."""
    p = []
    ex = x.get("exercices", [])
    if len(ex) < 3: p.append(f"{len(ex)} exercice(s) seulement")
    if len(ex) > 6: p.append(f"{len(ex)} exercices : beaucoup pour une fiche recto verso")
    for e in ex:
        manque = [c for c in ("dosage", "progression", "erreur_frequente") if not e.get(c)]
        if manque: p.append(f"« {e.get('nom', '')} » : {', '.join(manque)} manquant(s)")
        if len(e.get("illustration", "")) < 90: p.append(f"« {e.get('nom', '')} » : consigne d'illustration trop courte pour Gemini")
    refs = x.get("references", [])
    if not refs: p.append("aucune référence")
    for ref in refs:
        if not ref.get("doi_ou_pmid"): p.append(f"référence sans PMID ni DOI : {ref.get('texte', '')[:60]}")
        ans = [int(a) for a in re.findall(r"\b(19[89]\d|20[0-2]\d)\b", ref.get("texte", ""))]
        if ans and max(ans) < 2016: p.append(f"référence de {max(ans)} : chercher plus récent")
    urg = " ".join(x.get("quand_reconsulter", [])).lower()
    if not re.search(r"urgen|immédiat|sans tarder|sans attendre|rapidement", urg): p.append("aucun signe d'urgence distingué dans « Quand reconsulter »")
    return p


def main():
    fiches = {r: [x for x in json.load(open(os.path.join(RACINE, f"outils/locomoteur/fiches-patients/textes/{r}.json"), encoding="utf8")) if x.get("applicable")] for r, _ in REGIONS}
    sans = {r: [x for x in json.load(open(os.path.join(RACINE, f"outils/locomoteur/fiches-patients/textes/{r}.json"), encoding="utf8")) if not x.get("applicable")] for r, _ in REGIONS}
    total = sum(len(v) for v in fiches.values())
    # 1. Texte complet, pour OpenEvidence.
    t = [f"FICHES PATIENTS · MSK MORAND · TEXTE COMPLET POUR RÉVISION ({total} fiches, novembre 2026)",
         "Texte des fiches publiées sur morand.org (rubrique MSK Morand), par région. Chaque région se suffit à elle-même :",
         "envoyez-les une à la fois à OpenEvidence, précédées de la consigne. Les identifiants entre crochets [région/id]",
         "servent à reprendre les corrections. Les titres proposés (terme médical) sont à confirmer.", "", CONSIGNE]
    for r, nom in REGIONS:
        t += ["", "#" * 100, f"RÉGION : {nom.upper()} ({len(fiches[r])} fiches)", "#" * 100, ""]
        t += [texte_fiche(k, r, x) for k, x in enumerate(fiches[r], 1)]
    open(os.path.join(SORTIE, "fiches-patients-texte-complet.txt"), "w", encoding="utf8").write("\n".join(t))
    # 2. Propositions : les générales (écrites à la main), puis les titres, le relevé et les diagnostics sans fiche.
    m = ["## Titres proposés (terme médical en titre, langage courant en sous-titre)", "",
         "| Région | N° | Titre actuel | Titre proposé | Sous-titre proposé |", "|---|---|---|---|---|"]
    for r, nom in REGIONS:
        for k, x in enumerate(fiches[r], 1):
            ti, so = TITRES.get(f"{r}/{x['id']}", (x["nom"], x["titre_patient"]))
            m.append(f"| {nom} | {k} | {x['titre_patient']} | **{ti}** | {so} |")
    m += ["", "## Relevé automatique, fiche par fiche", ""]
    for r, nom in REGIONS:
        m.append(f"### {nom}")
        for k, x in enumerate(fiches[r], 1):
            p, titre = releve(r, x), TITRES.get(r + "/" + x["id"], (x["nom"],))[0]
            m.append(f"- **{k}. {titre}** : " + ("; ".join(p) if p else "rien à signaler."))
        m.append("")
    m += ["## Diagnostics de MSK Morand sans fiche patient", "",
          "Ces diagnostics n'ont pas de fiche, parce qu'ils demandent d'abord une évaluation médicale ou une prise en charge "
          "particulière. Certains méritent quand même une courte fiche « En attendant votre rendez-vous » (voir les propositions générales).", "",
          "| Région | Diagnostic | Raison |", "|---|---|---|"]
    for r, nom in REGIONS:
        for x in sans[r]:
            m.append(f"| {nom} | {x['nom']} | {x.get('raison_si_non', '')} |")
    generales = open(os.path.join(SORTIE, "propositions-generales.md"), encoding="utf8").read()
    open(os.path.join(SORTIE, "propositions-fiches-patients.md"), "w", encoding="utf8").write(generales + "\n" + "\n".join(m) + "\n")
    print(f"{total} fiches ; {sum(len(v) for v in sans.values())} diagnostics sans fiche")


main()
