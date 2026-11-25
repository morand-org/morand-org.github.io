# MSK Morand : produit les documents de révision des fiches patients (novembre 2026).
#   python3 -I outils/locomoteur/fiches-patients/document-revision.py
# Lit les fiches de la version 2, assemblées par produire-fiches.mjs (outils/locomoteur/fiches-patients/textes-v2/<région>.json :
# texte publié, titres retenus, ajouts, règle de douleur d'une heure). Écrit dans outils/locomoteur/fiches-patients/revision/ :
#   - fiches-patients-texte-complet.txt : toutes les fiches de la version 2, par région, avec la consigne pour OpenEvidence ;
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
TITRES = {k: (v["titre"], v["sous_titre"]) for k, v in json.load(open(os.path.join(RACINE, "outils/locomoteur/fiches-patients/titres.json"), encoding="utf8")).items()}
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
6. Les rubriques « En bref », « Pourquoi ça arrive » et « Soulager la douleur », ainsi que la phase, le but et la
   version plus facile de chaque exercice, sont nouvelles : vérifiez-les avec attention. « Soulager la douleur » ne
   donne volontairement aucune dose de médicament : gardez-le ainsi.
7. Règle de douleur : nous demandons que la douleur revienne à son niveau habituel « dans l'heure qui suit
   l'exercice ». Vérifiez ce critère pour chaque problème ; si les données appuient plutôt un autre délai (par
   exemple le lendemain matin, comme dans le modèle de surveillance de la douleur utilisé pour les tendinopathies),
   indiquez-le, avec la référence.
8. Vérifiez le classement des signes : « Consultez rapidement » (sans attendre le prochain rendez-vous) ou
   « Revoyez votre médecin si ».
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


def texte_fiche_v2(f, sever_cheville=None):
    l = [f"=== FICHE {f['code']} · [{f['cle']}] ===",
         f"Titre : {f['titre']}", f"Sous-titre : {f['sous_titre']}",
         f"Ancien titre : {f['titre_v1']}", f"Diagnostic correspondant dans MSK Morand : {f['diagnostic']}", ""]
    if sever_cheville:
        return "\n".join(l + [f"Même fiche que {sever_cheville} (maladie de Sever) : voir la région Cheville et jambe.", ""])
    l += ["EN BREF", liste(f["en_bref"]), "", "CE QUE VOUS AVEZ", "  " + f["ce_que_vous_avez"], "",
          "POURQUOI ÇA ARRIVE", liste(f["pourquoi"]), "", "SOULAGER LA DOULEUR", liste(f["soulager"]), "",
          "CE QUI AIDE", liste(f["ce_qui_aide"]), "", "À ÉVITER POUR L'INSTANT", liste(f["a_eviter"]), "",
          "RÈGLE DE DOULEUR (0 À 10)", "  " + f["regle_de_douleur"], ""]
    if f["urgence"]:
        l += ["CONSULTEZ RAPIDEMENT (sans attendre : urgence, 911 si c'est grave ; en cas de doute, Info-Santé 811)", liste(f["urgence"]), "",
              "REVOYEZ VOTRE MÉDECIN SI", liste(f["medecin"]), ""]
    else:
        l += ["QUAND RECONSULTER", liste(f["medecin"]), ""]
    l += ["DURÉE HABITUELLE", "  " + f["duree_habituelle"], "", "PROGRAMME D'EXERCICES"]
    if f["materiel"]: l.append("  Matériel : " + ", ".join(f["materiel"]))
    for k, e in enumerate(f["exercices"], 1):
        l += [f"  Exercice {k} : {e.get('nom', '')}"]
        for etiquette, champ in (("Phase", "phase"), ("But", "but"), ("Départ", "position_de_depart"), ("Mouvement", "mouvement"), ("Dosage", "dosage"),
                                 ("Progression", "progression"), ("Plus facile", "plus_facile"), ("Erreur fréquente", "erreur_frequente"), ("Illustration demandée", "illustration")):
            if e.get(champ): l.append(f"    {etiquette} : {e[champ]}")
    l += ["", "RÉFÉRENCES"]
    l += [f"  - {ref.get('texte', '')}" + (f" ({ref['doi_ou_pmid']})" if ref.get("doi_ou_pmid") else "") for ref in f["references"]]
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
    # 1. Texte complet de la version 2, pour OpenEvidence (fiches assemblées par produire-fiches.mjs).
    v2 = {r: json.load(open(os.path.join(RACINE, f"outils/locomoteur/fiches-patients/textes-v2/{r}.json"), encoding="utf8")) for r, _ in REGIONS}
    code_sever = next(f["code"] for f in v2["cheville"] if f["cle"] == "cheville/sever")
    t = [f"FICHES PATIENTS · MSK MORAND · VERSION 2 · TEXTE COMPLET POUR RÉVISION ({total} fiches, novembre 2026)",
         "Texte des fiches de la version 2 (nouvelle mise en page), par région. Chaque région se suffit à elle-même :",
         "envoyez-les une à la fois à OpenEvidence, précédées de la consigne. Les identifiants entre crochets [région/id]",
         "servent à reprendre les corrections.", "", CONSIGNE]
    for r, nom in REGIONS:
        t += ["", "#" * 100, f"RÉGION : {nom.upper()} ({len(v2[r])} fiches)", "#" * 100, ""]
        t += [texte_fiche_v2(f, code_sever if f["cle"] == "pied/sever" else None) for f in v2[r]]
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
