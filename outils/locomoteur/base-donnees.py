# MSK Morand : base de données de tout ce qu'OpenEvidence a fourni, classée et sourcée (page cachée /locomoteur/donnees/).
#   python3 -I outils/locomoteur/base-donnees.py
# Sources (chacune dans locomoteur/donnees/<id>.json) :
#   fc    base des flashcards (entrainement/banque/msk-*.json, tirée de « Base de données pour FlashCards Morand MSK ») ;
#   oe24  vérifications du 24 novembre 2026 (outils/locomoteur/sources/openevidence-reponses/*.md) ;
#   oe21  document source du 21 novembre 2026, 8 parties (outils/locomoteur/sources/2026-11-21-openevidence/*.md) ;
#   hy    fiches résumées publiées (locomoteur/<région>/fiches/*/index.html).
# Chaque élément : région, diagnostic, catégorie, énoncé, chiffres éventuels et références (texte et lien). Rien n'est
# ajouté : le texte est celui de la source ; seuls les intitulés des colonnes anglaises sont traduits.
import glob, html, json, os, re

R = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../.."))
SORTIE = os.path.join(R, "locomoteur/donnees")
os.makedirs(SORTIE, exist_ok=True)
REGIONS = ["cervical", "dorsal", "lombaire", "epaule", "coude", "poignet", "hanche", "genou", "cheville", "pied", "general"]
NOM_REGION = {"rachis cervical": "cervical", "cervical": "cervical", "rachis dorsal": "dorsal", "rachis thoracique": "dorsal", "rachis lombaire": "lombaire",
              "lombaire": "lombaire", "sacro-iliaques": "lombaire", "sacro-iliaque": "lombaire", "épaule": "epaule", "coude": "coude", "poignet": "poignet",
              "main": "poignet", "poignet et main": "poignet", "hanche": "hanche", "hanche et bassin": "hanche", "genou": "genou", "cheville": "cheville",
              "cheville et jambe": "cheville", "pied": "pied"}
PREFIXES = [("rachis cervical", "cervical"), ("cervical", "cervical"), ("rachis dorsal", "dorsal"), ("rachis thoracique", "dorsal"), ("dorsal", "dorsal"),
            ("rachis lombaire", "lombaire"), ("lombaire", "lombaire"), ("sacro", "lombaire"), ("épaule", "epaule"), ("coude", "coude"), ("poignet", "poignet"),
            ("main", "poignet"), ("hanche", "hanche"), ("genou", "genou"), ("cheville", "cheville"), ("pied", "pied")]
def region_de(titre):
    t = titre.lower().strip()
    return next((r for p, r in PREFIXES if t.startswith(p)), "general")
CODE_REGION = {"CERV": "cervical", "EPAU": "epaule", "COUD": "coude", "POIG": "poignet", "LOMB": "lombaire", "HANC": "hanche", "GENO": "genou", "CHEV": "cheville", "PIED": "pied"}


class Refs:
    """Références d'une source, dédoublonnées par lien (ou par texte)."""
    def __init__(self): self.par_cle, self.liste = {}, []
    def ajouter(self, texte, url=None):
        texte = re.sub(r"\s+", " ", (texte or "").strip()) or (url or "")
        cle = (url or texte).lower()
        if cle not in self.par_cle:
            self.par_cle[cle] = len(self.liste); self.liste.append({"t": texte, **({"u": url} if url else {})})
        elif url and len(texte) > len(self.liste[self.par_cle[cle]]["t"]): self.liste[self.par_cle[cle]]["t"] = texte
        return self.par_cle[cle]


def ecrire(ident, nom, description, refs, items):
    with open(os.path.join(SORTIE, f"{ident}.json"), "w", encoding="utf8") as f:
        json.dump({"source": {"id": ident, "nom": nom, "description": description}, "refs": refs.liste, "items": items}, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{ident} : {len(items)} éléments, {len(refs.liste)} références")
    return len(items)


# ---------- Outils Markdown (documents convertis par pandoc) ----------
LIEN_CIT = re.compile(r"(?:<u>)?\[(?:<u>)?\\\[(\d+)\\\](?:</u>)?\]\((https?://[^)\s]+)\)(?:</u>)?")
def citations(texte):
    return [(int(n), u) for n, u in LIEN_CIT.findall(texte)]
def propre(texte):
    t = LIEN_CIT.sub("", texte)
    t = re.sub(r"<img [^>]*>", "", t)
    t = re.sub(r"\[([^\]]*)\]\((https?://[^)]+)\)", r"\1", t)
    t = re.sub(r"</?u>|\*\*|\\(?=[\[\]<>*_-])", "", t)
    t = t.replace("\\'", "'")
    return re.sub(r"\s+", " ", html.unescape(t)).strip(" -|")
def references_md(texte):
    """Listes de références « n. [Titre](lien). Auteurs. Revue. Année. doi:… » : lien → texte complet."""
    par_url = {}
    for l in texte.split("\n"):
        m = re.match(r"^\s*(\d+)\.\s+\[(?:<u>)?(.*?)(?:</u>)?\]\((https?://[^)\s]+)\)\.?\s*(.*)$", l)
        if m:
            par_url[m.group(3)] = propre(f"{m.group(2)}. {m.group(4)}")
    return par_url
def lignes_tableau(l):
    return [c.strip() for c in l.strip().strip("|").split("|")]


# ---------- 1. Flashcards ----------
def flashcards():
    refs, items = Refs(), []
    index = json.load(open(os.path.join(R, "entrainement/banque/index.json"), encoding="utf8"))
    SENS = {"increase": "↑ augmente", "neutral": "↔ neutre", "decrease": "↓ diminue"}
    for p in index["paquets"]:
        paquet = json.load(open(os.path.join(R, p["fichier"].lstrip("/")), encoding="utf8"))
        region = p["cle"].replace("msk-", "")
        for c in paquet["cartes"]:
            d = c["donnee"]
            chiffres = [[k, v] for k, v in [("RV+", d.get("lr_positif") if d.get("lr_positif") is not None else d.get("lr_positif_texte")),
                ("RV−", d.get("lr_negatif") if d.get("lr_negatif") is not None else d.get("lr_negatif_texte")), ("Se", d.get("sensibilite")), ("Sp", d.get("specificite")),
                ("RC", d.get("odds_ratio")), ("Nature", d.get("nature") + (" (calculé)" if d.get("calcule") else ""))] if v not in (None, "")]
            chiffres = [[k, ("%g" % v).replace(".", ",") if isinstance(v, (int, float)) else v] for k, v in chiffres]
            rs = [refs.ajouter(paquet["references"][str(n)]["texte"], ("https://doi.org/" + paquet["references"][str(n)]["doi"]) if paquet["references"][str(n)].get("doi") else paquet["references"][str(n)].get("url"))
                  for n in c["references"] if str(n) in paquet["references"]]
            items.append({"r": region, "dx": c["diagnostic"]["nom"], "n": c["diagnostic"]["no"], "cat": c["type"], "t": c["explication"],
                          "e": c["enonce"], "dir": SENS[c["reponse"]], "c": chiffres, "refs": rs, "code": c["id"],
                          **({"g": " ".join(c["mises_en_garde"])} if c.get("mises_en_garde") else {}), **({"st": "expérimentale"} if c["statut"] == "experimentale" else {})})
    return ecrire("fc", "Base des flashcards", "Document « Base de données pour FlashCards Morand MSK » (OpenEvidence) : 186 diagnostics, chaque donnée avec son sens (↑ ↔ ↓), ses chiffres et ses références.", refs, items)


# ---------- 2. Vérifications du 24 novembre ----------
def noms_diagnostics():
    noms, ordre = {}, {}
    for region in CODE_REGION.values():
        t = open(os.path.join(R, f"locomoteur/{region}/donnees-{region}.js"), encoding="utf8").read()
        ids = re.findall(r'\{ id: "([a-z_0-9]+)",(?: grave: true,)? nom: "([^"]+)"[^\n]*base:', t)
        noms[region] = dict(ids); ordre[region] = [i for i, _ in ids]
    return noms, ordre
TRAD = [("sensitiv", "Sensibilité"), ("specific", "Spécificité"), ("lr+", "RV+"), ("lr−", "RV−"), ("lr-", "RV−"), ("population", "Population et milieu"),
        ("reference standard", "Étalon de référence"), ("verdict", "Verdict (OpenEvidence)"), ("proportion", "Proportion parmi les consultants"),
        ("sex", "Rapport femmes-hommes"), ("setting", "Milieu"), ("source", "Source"), ("nearest", "Donnée la plus proche"), ("published accuracy", "Précision publiée"),
        ("why it does not transfer", "Pourquoi elle ne s'applique pas"), ("finding", "Élément")]
def traduire(entete):
    e = entete.lower()
    for k, v in TRAD:
        if k in e: return v
    return entete
def verifications():
    refs, items = Refs(), []
    codes = json.load(open(os.path.join(R, "outils/locomoteur/delegation/openevidence-codes.json"), encoding="utf8"))
    noms, ordre = noms_diagnostics()
    for f in sorted(glob.glob(os.path.join(R, "outils/locomoteur/sources/openevidence-reponses/*.md"))):
        texte = open(f, encoding="utf8").read()
        urls = references_md(texte)
        paragraphes = [l for l in texte.split("\n") if l.strip() and not l.startswith("|")]
        region, entetes = None, None
        for l in texte.split("\n"):
            m = re.findall(r"\b(CERV|EPAU|COUD|POIG|LOMB|HANC|GENO|CHEV|PIED)-[PF]\d+", l)
            if m and not l.startswith("|"): region = m[-1]
            if not l.startswith("|"): entetes = None; continue
            cells = lignes_tableau(l)
            if all(re.fullmatch(r":?-+:?", c) for c in cells if c): continue
            if entetes is None: entetes = [propre(c) for c in cells]; continue
            m = re.match(r"(?:\*\*)?(?:(CERV|EPAU|COUD|POIG|LOMB|HANC|GENO|CHEV|PIED)-)?([PF])(\d+)\b", cells[0])
            if not m: continue
            reg = m.group(1) or region
            if not reg: continue
            region = reg
            code = f"{reg}-{m.group(2)}{m.group(3)}"
            r = CODE_REGION[reg]
            if m.group(2) == "P":
                x = codes.get(code, {}); dx = noms[r].get(x.get("dx"), x.get("dx")); enonce = x.get("texte", "")
            else:
                i = int(m.group(3)) - 1; dx_id = ordre[r][i] if i < len(ordre[r]) else None
                dx = noms[r].get(dx_id, propre(cells[0])); enonce = "Fréquence de départ"
            colonnes = [[traduire(e), propre(v)] for e, v in zip(entetes[1:], cells[1:]) if propre(v) and not re.match(r"^r[ée]f", e.lower())]
            # Commentaires d'OpenEvidence qui citent ce code (texte anglais, tel quel).
            com = [propre(p) for p in paragraphes if re.search(rf"\b{code}\b", p) and len(p) > 60 and not re.match(r"^\s*\d+\.\s", p)]
            rs = [refs.ajouter(urls.get(u, u), u) for _, u in citations(l)]
            for p in paragraphes:
                if re.search(rf"\b{code}\b", p): rs += [refs.ajouter(urls.get(u, u), u) for _, u in citations(p)]
            cat = "Précision d'un élément (vérification)" if m.group(2) == "P" else "Fréquence de départ (vérification)"
            if any("nearest" in e.lower() for e in entetes): cat = "Donnée voisine (vérification)"
            items.append({"r": r, "dx": dx, "cat": cat, "t": enonce.split(" — ")[0] if enonce else dx, "c": colonnes + ([["Commentaire (OpenEvidence, en anglais)", " ".join(dict.fromkeys(com))]] if com else []),
                          "refs": list(dict.fromkeys(rs)), "code": code, "lang": "en", "doc": os.path.basename(f)})
    return ecrire("oe24", "Vérifications du 24 novembre 2026", "Réponses d'OpenEvidence aux questions de vérification : précision de chaque élément (Se, Sp, RV, population, étalon, source) et fréquences de départ par région. Chiffres et commentaires tels que fournis (en anglais).", refs, items)


# ---------- 3. Document source du 21 novembre ----------
PARTIES = {"A": "Fréquences par région", "B": "Tests spéciaux", "C": "Diagnostics par population", "D": "Examen de base", "E": "Anamnèse",
           "F": "Conduites", "G": "Confirmer ou exclure", "H": "Aide-mémoire Québec"}
def document_source():
    refs, items = Refs(), []
    for f in sorted(glob.glob(os.path.join(R, "outils/locomoteur/sources/2026-11-21-openevidence/[A-H]-*.md"))):
        partie = os.path.basename(f)[0]
        texte = open(f, encoding="utf8").read()
        urls = references_md(texte)
        region, sous, entetes = "general", None, None
        fin = re.search(r"^#+ (References|Références)\s*$", texte, re.M)
        corps = texte[:fin.start()] if fin else texte
        for l in corps.split("\n"):
            h = re.match(r"^(#{2,4}) (.*)$", l)
            if h:
                titre = propre(h.group(2)); cle = titre.lower().strip()
                if len(h.group(1)) == 2: region = region_de(cle); sous = None
                else: sous = titre
                entetes = None; continue
            if l.startswith("|"):
                cells = lignes_tableau(l)
                if all(re.fullmatch(r":?-+:?", c) for c in cells if c): continue
                if entetes is None: entetes = [propre(c) for c in cells]; continue
                vals = [propre(c) for c in cells]
                colonnes = [[e, v] for e, v in zip(entetes, vals) if v and not re.match(r"^r[ée]f", e.lower())]
                if not colonnes: continue
                dxcol = next((v for e, v in colonnes if re.search(r"diagnostic|cible", e.lower())), None)
                titre = next((v for e, v in colonnes if not re.search(r"^rang$", e.lower())), colonnes[0][1])
                rs = [refs.ajouter(urls.get(u, u), u) for _, u in citations(l)]
                items.append({"r": region, "dx": dxcol, "cat": PARTIES[partie] + (f" · {sous}" if sous else ""), "t": titre, "c": colonnes, "refs": list(dict.fromkeys(rs)), "code": f"21 nov., partie {partie}"})
                continue
            entetes = None
            if not l.strip() or l.startswith("<!--") or re.match(r"^\s*\d+\.\s+\[", l) or l.startswith("[Figure"): continue
            cites = citations(l)
            if not cites: continue
            t = propre(l)
            if len(t) < 25: continue
            items.append({"r": region, "dx": None, "cat": PARTIES[partie] + (f" · {sous}" if sous else ""), "t": t,
                          "refs": list(dict.fromkeys(refs.ajouter(urls.get(u, u), u) for _, u in cites)), "code": f"21 nov., partie {partie}"})
    return ecrire("oe21", "Document source du 21 novembre 2026", "Premier document d'OpenEvidence (8 parties : fréquences, tests spéciaux, populations, examen de base, anamnèse, conduites, confirmer ou exclure, aide-mémoire Québec), qui a servi à bâtir les 9 régions.", refs, items)


# ---------- 4. Fiches résumées ----------
def fiches_resumees():
    refs, items = Refs(), []
    for page in sorted(glob.glob(os.path.join(R, "locomoteur/*/fiches/*/index.html"))):
        region = page.split("/locomoteur/")[1].split("/")[0]
        h = open(page, encoding="utf8").read()
        no = re.search(r'<p class="hy-no">([^<]*)</p>', h); tags = re.search(r'<p class="hy-tags">([^<]*)</p>', h)
        titre = re.search(r'<h1 class="hy-titre">([^<]*)</h1>', h)
        if not titre: continue
        liens = {m.group(1): (re.sub(r"<[^>]+>", "", m.group(3)).strip(), m.group(2)) for m in re.finditer(r'<li id="r(\d+)"[^>]*>(?:<a href="([^"]+)"[^>]*>)?(.*?)</li>', h)}
        for m in re.finditer(r'<section class="hy-case"><h2>([^<]*)</h2><p>(.*?)</p></section>', h):
            appels = re.findall(r'href="#r(\d+)"', m.group(2))
            t = html.unescape(re.sub(r"<sup.*?</sup>|<[^>]+>", "", m.group(2))).strip()
            if not t: continue
            rs = [refs.ajouter(html.unescape(liens[n][0]), liens[n][1]) for n in appels if n in liens]
            items.append({"r": region, "dx": html.unescape(titre.group(1)), "cat": f"Fiche résumée · {html.unescape(m.group(1))}", "t": t, "refs": list(dict.fromkeys(rs)),
                          "code": html.unescape(no.group(1)) if no else "", "lien": "/" + os.path.relpath(os.path.dirname(page), R) + "/", **({"tags": html.unescape(tags.group(1))} if tags else {})})
    return ecrire("hy", "Fiches résumées", "Les fiches résumées publiées (blocs 1 à 8) : chaque rubrique (épidémiologie, examen, traitement, pronostic…) avec ses références.", refs, items)


total = flashcards() + verifications() + document_source() + fiches_resumees()
json.dump({"version": "2026-11-24", "sources": ["fc", "oe24", "oe21", "hy"], "total": total},
          open(os.path.join(SORTIE, "index.json"), "w", encoding="utf8"), ensure_ascii=False)
print(f"Total : {total} éléments")
