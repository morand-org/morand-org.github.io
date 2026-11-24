# Morand — Entraînement clinique : convertit la « Base de données pour FlashCards Morand MSK » (texte extrait du DOCX)
# en cartes JSON, une région par fichier (entrainement/banque/msk-<région>.json) et l'index des paquets.
#
#   python3 -I outils/entrainement/convertir-base.py base.txt
#   (base.txt : texte du DOCX, extrait par pandoc -t plain ou par extraire-docx.py)
#   Ensuite : node outils/entrainement/appliquer-audit.mjs (pertinence, niveau, retraits, nouvelles cartes).
#
# Règles (plan de la phase 1, section 3) :
#   - une carte par flèche (↑ augmente, ↔ neutre, ↓ diminue) : une puce à deux flèches donne deux cartes ;
#   - l'énoncé est la trouvaille (avant « : »), l'explication est le texte de la source, sans ajout ;
#   - un chiffre (LR, Se, Sp, OR) n'est retenu que s'il est écrit dans la puce, tel quel ; « calculé » est noté ;
#   - les références sont celles de la puce, avec leur DOI ;
#   - statut « en_revision » ; « experimentale » si la puce cite une étude que les « Limites » du lot disent non confirmée.
import json, os, re, sys, unicodedata

RACINE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../.."))
LOTS = {1: ("cervical", "Rachis cervical"), 2: ("lombaire", "Rachis lombaire"), 3: ("epaule", "Épaule"), 4: ("coude", "Coude"),
        5: ("poignet", "Poignet et main"), 6: ("hanche", "Hanche"), 7: ("genou", "Genou"), 8: ("cheville", "Cheville"), 9: ("pied", "Pied")}
FLECHES = {"↑": "increase", "↔": "neutral", "↓": "decrease"}

texte = open(sys.argv[1], encoding="utf8").read().replace(" ", " ")
lignes = texte.split("\n")
debuts = [i for i, l in enumerate(lignes) if re.match(r"^(Voici le lot|Lot) \d", l)]
debuts.append(len(lignes))


def nettoyer(s):
    return re.sub(r"\s+", " ", re.sub(r"\[\d+\]", "", s)).strip()


def references(bloc):
    """Liste de références numérotées (n. Titre. Auteurs. Revue. Année. doi:…), sur plusieurs lignes."""
    refs, cur = {}, None
    for l in bloc:
        m = re.match(r"^(\d+)\.\s+(.*)", l)
        if m:
            cur = int(m.group(1)); refs[cur] = m.group(2).strip(); continue
        if cur is not None and l.startswith("    "):
            refs[cur] += " " + l.strip()
        elif not l.strip():
            continue
        else:
            cur = None
    sortie = {}
    for n, t in refs.items():
        t = re.sub(r"\s+", " ", t).strip()
        doi = re.search(r"doi:\s*(\S+?)\.?$", t)
        url = re.search(r"https?://\S+", t)
        sortie[n] = {"n": n, "texte": t, **({"doi": doi.group(1)} if doi else {}), **({"url": url.group(0).rstrip(".")} if url and not doi else {})}
    return sortie


def type_de(label):
    t = label.lower()
    if re.search(r"\b(irm|radiograph|échograph|tdm|scanner|imagerie|rx|scintig|électromyo|emg)\b", t): return "Imagerie"
    if re.search(r"\b(crp|vs|leucocyt|hémocult|biolog|hla|facteur rhumatoïde|anti-ccp|acide urique|ponction|liquide|sanguin|bactériémie|hémoglobine|ck)\b", t): return "Laboratoire"
    if re.search(r"(fièvre|cancer|perte de poids|drapeau|incontinence|rétention|anesthésie en selle|immunosuppr|drogues iv)", t): return "Drapeaux rouges"
    if re.search(r"^(âge|sexe|femme|homme)\b|\bans\b|enfant|adolescent|personne âgée", t): return "Facteurs démographiques"
    if re.search(r"(soulag|réponse à|infiltration|ains|traitement|bloc|corticoth|physioth|chirurgie)", t): return "Réponse aux traitements"
    if re.search(r"(test|signe|manœuvre|score|règle|critère|grappe|tous positifs|tous négatifs)", t) or re.search(r"\b[A-Z][a-zé]+(?:-[A-Z][a-zé]+)? (positif|négatif)", label): return "Tests spécifiques"
    if re.search(r"(palpation|réflexe|force|amplitude|mobilité|rotation|flexion|extension|abduction|sensibilit|atrophie|déficit|œdème|épanchement|enflure|ecchymose|déformation|examen|douleur à la)", t): return "Examen physique"
    if re.search(r"(antécédent|sport|travail|joueur|diabète|tabac|obésité|grossesse|facteur de risque|médicament|statine|fluoroquinolone|course|athlète|coureur)", t): return "Facteurs de risque"
    if re.search(r"(durée|évolution|semaines|mois|chronique|récidiv|depuis|aigu|début|progressi)", t): return "Évolution temporelle"
    return "Anamnèse"


def nombre(s):
    s = s.strip()
    return float(s.replace(",", ".")) if re.fullmatch(r"\d+(?:,\d+)?", s) else None


def donnees(seg):
    lrp = re.search(r"LR\+\s*(?:d'environ|environ)?\s*([<>≤≥]?\s*\d+(?:,\d+)?)", seg)
    lrn = re.search(r"LR[−-]\s*(?:d'environ|environ)?\s*([<>≤≥]?\s*\d+(?:,\d+)?)", seg)
    se = re.search(r"\bSe (?:de )?(\d+(?:,\d+)?(?: à \d+(?:,\d+)?)?(?: ?%)?)", seg)
    sp = re.search(r"\bSp (?:de )?(\d+(?:,\d+)?(?: à \d+(?:,\d+)?)?(?: ?%)?)", seg)
    orr = re.search(r"\bOR (?:de )?(\d+(?:,\d+)?)", seg)
    d = {
        "lr_positif": nombre(lrp.group(1)) if lrp else None, "lr_negatif": nombre(lrn.group(1)) if lrn else None,
        "sensibilite": se.group(1).strip() if se else None, "specificite": sp.group(1).strip() if sp else None,
        "odds_ratio": nombre(orr.group(1)) if orr else None, "calcule": bool(re.search(r"calculés?\b", seg)),
    }
    if lrp and d["lr_positif"] is None: d["lr_positif_texte"] = lrp.group(1).strip()
    if lrn and d["lr_negatif"] is None: d["lr_negatif_texte"] = lrn.group(1).strip()
    d["nature"] = ("LR" if lrp or lrn else "Se et Sp" if se or sp else "Association (OR ou risque)" if orr or re.search(r"risque relatif|\bRR\b|HR ", seg)
                   else "Fréquence" if re.search(r"\d ?%", seg) else "Qualitatif")
    return d


QUALIF = re.compile(r"^\((faible|forte?|modérée?|discordant|discordante)\)\s*")
# Mots d'état : la 2e flèche d'une puce donne souvent l'état contraire (« Signe de l'arc positif … ; ↓ négatif »).
ETATS = ["non remplis", "remplis", "absentes", "absents", "absente", "absent", "présentes", "présents", "présente", "présent", "positives", "positifs",
         "positive", "positif", "négatives", "négatifs", "négative", "négatif", "normales", "normaux", "normale", "normal", "anormale", "anormal",
         "indolores", "indolore", "douloureuses", "douloureux", "douloureuse", "impossible", "possible", "diminuées", "diminués", "diminuée", "diminué",
         "limitées", "limités", "limitée", "limité", "réduite", "réduit", "faible", "élevées", "élevés", "élevée", "élevé", "bas", "basse",
         "unilatérales", "unilatéraux", "unilatérale", "unilatéral", "bilatérales", "bilatéraux", "bilatérale", "bilatéral"]
ETAT_RE = r"(?<![\w-])(" + "|".join(ETATS) + r")(?![\w-])"


def enonce(seg, premier):
    """Trouvaille évaluée : la partie avant « : ». Pour la 2e flèche d'une puce, l'énoncé est reconstruit à partir du premier :
    mot d'état remplacé (« … positif » → « … négatif »), seuil remplacé (« < 4,3 mm » → « ≥ 5,0 mm »), sinon la trouvaille seule."""
    seg = QUALIF.sub("", seg)
    corps = seg.split(" : ")[0].strip() if " : " in seg else re.split(r"[,(]", seg)[0].strip()
    if premier is None: return corps, False
    bas = corps.lower().rstrip(".")
    if re.fullmatch(r"(son |sa |leur )?absence", bas): return f"Absence : {premier[0].lower()}{premier[1:]}", True
    if re.fullmatch(r"(" + "|".join(ETATS) + r")( seule?s?)?", bas):
        etat = re.sub(r" seule?s?$", "", bas)
        if premier.startswith("Absence de ") and etat.startswith("présent"):
            reste = premier[len("Absence de "):]
            return f"{reste[0].upper()}{reste[1:]} {etat}", True
        occ = list(re.finditer(ETAT_RE, premier))
        # Le mot d'état est remplacé seulement s'il qualifie la fin de la trouvaille (3 derniers mots) ; sinon « … : absente ».
        if occ and len(re.sub(r"\(.*?\)", "", premier[occ[-1].end():]).split()) <= 3:
            m = occ[-1]
            return premier[:m.start()] + etat + premier[m.end():], True
        return (f"{premier} {etat}" if len(premier.split()) <= 3 else f"{premier} : {etat}"), True
    if re.match(r"^[<>≤≥]", corps):
        base = re.sub(r"[<>≤≥]\s*\d+(?:,\d+)?\s*\S*", corps, premier, count=1)
        return (base if base != premier else f"{premier} ({corps})"), True
    if re.match(r"^(en |un seul|score |\d)", bas): return f"{premier} ({corps})", True
    if len(bas.split()) == 1: return f"{premier} ({corps.rstrip('.')})", "ambigu"
    return corps, len(corps.split()) <= 2


def difficulte(rep, d):
    if rep == "neutral": return 3
    if (d["lr_positif"] or 0) >= 5 or (d["lr_negatif"] is not None and d["lr_negatif"] <= 0.2): return 1
    return 2


DECISIONS_F = os.path.join(RACINE, "outils/entrainement/decisions.json")
DECISIONS = json.load(open(DECISIONS_F, encoding="utf8")) if os.path.exists(DECISIONS_F) else {}
index, total = [], 0
for li in range(9):
    lot = li + 1
    cle, region = LOTS[lot]
    bloc = lignes[debuts[li]:debuts[li + 1]]
    iref = next((i for i, l in enumerate(bloc) if l.strip() == "References"), len(bloc))
    corps, refs = bloc[:iref], references(bloc[iref + 1:])
    ilim = next((i for i, l in enumerate(corps) if l.startswith("Limites à garder")), len(corps))
    # « Limites à garder en tête » : chaque puce (titre. texte) devient une mise en garde pour les cartes qui citent les
    # mêmes études ; « non vérifiés », « non retrouvées », « erreur » ou « incohérences » rendent la carte expérimentale.
    limites, cur = [], None
    for l in corps[ilim + 1:]:
        if l.startswith("- "): limites.append(l[2:].strip()); continue
        if l.strip() and limites and not l.startswith(("Souhaitez", "Voulez")): limites[-1] += " " + l.strip()
    limites = [nettoyer(x) for x in limites]
    FRAGILE = re.compile(r"^(Chiffres non vérifiés|Sources non retrouvées|Erreur probable|Incohérences)")
    etudes = lambda t: {f"{a} {y}" for a, y in re.findall(r"([A-Z][A-Za-zÀ-ÿ'-]+)(?: et al\.)?,? (\d{4})", t)}
    # Puces, recollées, rattachées à leur diagnostic.
    # Une puce continue sur les lignes suivantes jusqu'à ses appels de référence (« …[13] ») ou une ligne vide.
    dx, puces, ouverte = None, [], False
    for l in corps[:ilim]:
        h = re.match(r"^(\d{1,3})\. (\S.*)$", l)
        if h and len(l) < 110 and not ouverte:
            dx = {"no": int(h.group(1)), "nom": h.group(2).strip()}; continue
        if l.startswith("- "):
            puces.append([dx, l[2:].strip()]); ouverte = not puces[-1][1].endswith("]"); continue
        if not l.strip():
            ouverte = False; continue
        if ouverte:
            puces[-1][1] += " " + l.strip(); ouverte = not puces[-1][1].endswith("]")
    cartes, compte = [], {}
    for dxp, p in puces:
        if dxp is None or not p or p[0] not in FLECHES: continue
        cites = [int(n) for n in re.findall(r"\[(\d+)\]", p)]
        propre = nettoyer(p)
        segs = [s for s in re.split(r"(?=[↑↔↓])", propre) if s.strip()]
        premier = None
        for s in segs:
            fl, seg = s[0], s[1:].strip().rstrip(";").strip()
            if fl not in FLECHES or not seg: continue
            seg_net = QUALIF.sub("", seg)
            if re.match(r"^\(discordante?\)", seg) and " : " not in seg and cartes and premier is not None:
                cartes[-1]["explication"] += f" Données discordantes : {seg_net}"
                cartes[-1]["discordant"] = True
                continue
            texte_enonce, reconstruit = enonce(seg, premier)
            if premier is None: premier = texte_enonce
            compte[dxp["no"]] = compte.get(dxp["no"], 0) + 1
            d = donnees(seg)
            exp = seg_net[0].upper() + seg_net[1:]
            auteurs = {f"{a} {y}" for a, y in re.findall(r"([A-Z][A-Za-zÀ-ÿ'-]+)(?: et al\.)? (\d{4})", propre)}
            carte = {
                "id": f"MSK-{dxp['no']:03d}-{compte[dxp['no']]:02d}",
                "domaine": "MSK", "region": region,
                "diagnostic": {"no": dxp["no"], "nom": dxp["nom"]},
                "type": type_de(texte_enonce),
                "enonce": texte_enonce[0].upper() + texte_enonce[1:],
                "reponse": FLECHES[fl],
                "explication": exp,
                **({"contexte_puce": propre} if len(segs) > 1 else {}),
                **({"force": "faible"} if re.match(r"^\(faible\)", seg) else {}),
                **({"discordant": True} if re.match(r"^\(discordante?\)", seg) else {}),
                "donnee": d,
                "references": [n for n in dict.fromkeys(cites) if n in refs],
                "difficulte": difficulte(FLECHES[fl], d),
                "statut": "experimentale" if reconstruit == "ambigu" or any(FRAGILE.match(x) and auteurs & etudes(x) for x in limites) else "en_revision",
                **({"mises_en_garde": gardes} if (gardes := [x for x in limites if auteurs & etudes(x)]) else {}),
                "valide_le": None,
                "source": f"Base FlashCards Morand MSK, lot {lot}, diagnostic {dxp['no']}",
                **({"a_relire": "énoncé ambigu : à reformuler" if reconstruit == "ambigu" else "énoncé reconstruit à partir de la puce"} if reconstruit else {}),
            }
            dec = DECISIONS.get(carte["id"])
            if dec and dec["statut"] == "validee": carte.update(statut="validee", valide_le=dec["date"])
            elif dec and dec["statut"] == "signalee": carte.update(statut="experimentale", signalement=dec.get("note", "Signalée"))
            cartes.append(carte)
    paquet = {"domaine": "MSK", "region": region, "cle": f"msk-{cle}", "lot": lot, "version": "2026-11-24",
              "source": "Base de données pour FlashCards Morand MSK (lot %d), références incluses" % lot,
              "diagnostics": sorted({(c["diagnostic"]["no"], c["diagnostic"]["nom"]) for c in cartes}), "cartes": cartes}
    paquet["diagnostics"] = [{"no": n, "nom": nom} for n, nom in paquet["diagnostics"]]
    # Références du lot, une seule fois : les cartes donnent leurs numéros.
    paquet["references"] = {str(n): refs[n] for n in sorted({n for c in cartes for n in c["references"]})}
    os.makedirs(os.path.join(RACINE, "entrainement/banque"), exist_ok=True)
    with open(os.path.join(RACINE, f"entrainement/banque/msk-{cle}.json"), "w", encoding="utf8") as f:
        json.dump(paquet, f, ensure_ascii=False, indent=0)
    index.append({"cle": f"msk-{cle}", "domaine": "MSK", "region": region, "fichier": f"/entrainement/banque/msk-{cle}.json", "cartes": len(cartes),
                  "experimentales": sum(c["statut"] == "experimentale" for c in cartes), "diagnostics": len(paquet["diagnostics"])})
    total += len(cartes)
    print(f"Lot {lot} {region} : {len(cartes)} cartes, {len(paquet['diagnostics'])} diagnostics, {sum(1 for c in cartes if c['statut'] == 'experimentale')} expérimentales, "
          f"{sum(1 for c in cartes if 'a_relire' in c)} énoncés reconstruits, références non trouvées : {sum(1 for c in cartes if not c['references'])}")
with open(os.path.join(RACINE, "entrainement/banque/index.json"), "w", encoding="utf8") as f:
    json.dump({"version": "2026-11-24", "domaines": {"MSK": "Musculosquelettique"}, "paquets": index}, f, ensure_ascii=False, indent=1)
print(f"Total : {total} cartes")
