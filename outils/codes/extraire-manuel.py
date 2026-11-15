"""Codes Morand : extrait du Manuel des médecins omnipraticiens (rémunération à l'acte, RAMQ, page Web enregistrée en .mht)
les tarifs en cabinet et en établissement, les avis, les éléments de contexte et les codes liés des codes de Codes Morand.
Le texte des avis et des règles est recopié tel quel ; rien n'est reformulé.
    python3 outils/codes/extraire-manuel.py <manuel.mht> <date de consultation AAAA-MM-JJ>
(les codes cherchés : ceux de codes/codes_data.json)
Écrit outils/codes/manuel-ramq.json (versionné) ; codes/codes_data.json se refait ensuite avec outils/construire-codes.mjs."""
import email, json, re, sys, pathlib
from bs4 import BeautifulSoup

RACINE = pathlib.Path(__file__).resolve().parents[2]
URL = "https://www.ramq.gouv.qc.ca/fr/professionnels/medecin-omnipraticien-omnipraticienne/manuels-guides/manuel-remuneration-acte"
mht, consulte = sys.argv[1], sys.argv[2]
msg = email.message_from_binary_file(open(mht, "rb"))
html = max((p for p in msg.walk() if p.get_content_type() == "text/html"), key=lambda p: len(p.get_payload(decode=True)))
s = BeautifulSoup(html.get_payload(decode=True).decode(html.get_content_charset() or "utf-8", "replace"), "lxml")

def txt(e):
    return re.sub(r"\s+", " ", e.get_text(" ", strip=True).replace("\xa0", " ")).replace(" ,", ",").replace(" .", ".").replace("( ", "(").replace(" )", ")").strip()
def nombre(t):
    t = t.replace(" ", "").replace(" ", "")
    return float(t.replace(",", ".")) if re.fullmatch(r"\d+,\d{2}", t) else None
CODE = re.compile(r"\b\d{5}\b")
codes_cherches = {c for a in json.load(open(RACINE / "codes/codes_data.json"))["actes"] for c in a["c"]}

# 1. Tarifs : les rangées des tableaux. Une rangée de code ; ses montants, ou ceux des rangées « En cabinet » / « en établissement » qui suivent.
def cellules(tr): return tr.find_all("td", recursive=False)
def code_de(tr):
    for k, td in enumerate(cellules(tr)):
        if re.fullmatch(r"\d{5}", txt(td)): return txt(td), k
    return None, None
def montants(tds):  # les montants en dollars de la première colonne de montants (pas le « rôle » d'anesthésie)
    for td in tds:
        m = [nombre(txt(p)) for p in td.find_all("p")] or [nombre(txt(td))]
        m = [x for x in m if x is not None]
        if m: return m
    return []
LIEU_CAB, LIEU_ETAB = re.compile(r"^(en cabinet|lorsqu.effectuée en cabinet)", re.I), re.compile(r"^(en clsc|en établissement|en gmf-u|lorsqu.effectuée en établissement|en clsc et en gmf-u)", re.I)
tarifs = {}
for tr in s.find_all("tr"):
    code, k = code_de(tr)
    if not code or code not in codes_cherches or code in tarifs: continue
    tds = cellules(tr); desc = [txt(p) for p in tds[k + 1].find_all("p")] if k + 1 < len(tds) else []
    desc = [d for d in desc if d] or ([txt(tds[k + 1])] if k + 1 < len(tds) else [])
    m = montants(tds[k + 2:])
    lieux = [d for d in desc if LIEU_CAB.match(d) or LIEU_ETAB.match(d)]
    r = {"ancre": tr.get("id"), "libelle": desc}
    if len(m) == 2 and len(lieux) == 2 and LIEU_CAB.match(lieux[0]): r.update(cabinet=m[0], etablissement=m[1])
    elif len(m) == 1 and not lieux: r["unique"] = m[0]
    elif not m:
        # Montants dans les rangées suivantes, sans code : « En cabinet… 29,30 » puis « en établissement 22,00 ».
        suite = {}
        for sib in tr.find_next_siblings("tr"):
            if code_de(sib)[0]: break
            d = txt(sib); mm = montants(cellules(sib))
            if not mm: continue
            premiere = re.sub(r"^\s*", "", " ".join(txt(p) for p in sib.find_all("p")))
            if LIEU_CAB.search(premiere) and "cabinet" not in suite: suite["cabinet"] = mm[0] if len(mm) == 1 else None
            elif LIEU_ETAB.search(premiere) and "etablissement" not in suite: suite["etablissement"] = mm[0] if len(mm) == 1 else None
            if len(mm) == 2 and re.search(r"cabinet", d, re.I) and re.search(r"CLSC|établissement", d): suite = {"cabinet": mm[0], "etablissement": mm[1]}
            if len(suite) == 2: break
        if None not in suite.values(): r.update(suite)
    tarifs[code] = r

# 2. Avis et règles : les blocs « AVIS » (texte tel quel), rattachés aux codes qu'ils nomment ; la section de règles
#    qui renvoie au code (« Voir le code de facturation … ») ; les éléments de contexte qu'ils demandent d'inscrire.
def texte_avis(t): return re.sub(r"^AVIS\s*:\s*", "", txt(t))
def est_titre(div):
    if div.find(["h2", "h3", "h4"]): return True
    ps = div.find_all("p")
    return len(ps) == 1 and ps[0].find("strong") is not None and txt(ps[0]) == txt(ps[0].find("strong")) and len(txt(ps[0])) < 120
regles = {}
for t in s.select("table.avis"):
    a = texte_avis(t)
    nommes = set(CODE.findall(a)) & codes_cherches
    renvoi = re.match(r"Voir (le|les) codes? de facturation", a)
    # Un avis (autre qu'un renvoi « Voir les codes… ») qui énumère plus de six codes est une liste générale : il n'est rattaché à aucun.
    if not nommes or (not renvoi and len(set(CODE.findall(a))) > 6): continue
    bloc = t.find_parent("div", id=True) or t
    for c in nommes:
        r = regles.setdefault(c, {"avis": [], "sections": [], "renvoi": set()})
        if renvoi:
            r["renvoi"].update(set(CODE.findall(a)) - {c})
            # La section de règles : les paragraphes depuis le titre précédent, et ses autres avis.
            avant, titre = [], None
            for prev in bloc.find_previous_siblings("div"):
                if est_titre(prev): titre = prev; break
                avant.append(prev)
                if len(avant) >= 8: break
            apres = []
            for nxt in bloc.find_next_siblings("div"):
                if est_titre(nxt) or len(apres) >= 6: break
                apres.append(nxt)
            paras = [x for x in list(reversed(avant)) + apres if not re.match(r"^AVIS", txt(x)) and txt(x)]
            avis = [texte_avis(x.select_one("table.avis")) for x in list(reversed(avant)) + apres if x.select_one("table.avis")]
            avis = [x for x in avis if not re.match(r"Voir (le|les) codes? de facturation", x)]
            if not titre: continue   # sans titre trouvé, la section n'est pas sûre : rien n'est rattaché
            r["sections"].append({"titre": txt(titre), "ancre": (titre or bloc).get("id"),
                                  "texte": [txt(x) for x in paras][:8], "avis": avis[:6]})
        elif a not in r["avis"]:
            r["avis"].append(a)

def contexte(textes):
    out = []
    for t in textes:
        for m in re.finditer(r"élément de contexte\s*:?\s*(.+?)(?:\.\s|\.$|;|$)", t):
            e = m.group(1).strip(" «»")
            if e and e not in out: out.append(e)
    return out

sortie = {"source": {"titre": "Manuel des médecins omnipraticiens — Rémunération à l'acte (RAMQ)", "url": URL, "consulte": consulte}, "codes": {}}
for c in sorted(codes_cherches):
    t, r = tarifs.get(c), regles.get(c, {"avis": [], "sections": [], "renvoi": set()})
    tous = r["avis"] + [x for sct in r["sections"] for x in sct["texte"] + sct["avis"]]
    lies = sorted((set(CODE.findall(" ".join(tous))) | r["renvoi"]) - {c})
    sortie["codes"][c] = {"tarif": t, "avis": r["avis"], "sections": r["sections"][:2], "contexte": contexte(tous), "lies": lies}
out = RACINE / "outils/codes/manuel-ramq.json"
out.write_text(json.dumps(sortie, ensure_ascii=False, indent=1) + "\n")
n = sortie["codes"]
print(f"{len(n)} codes : {sum(1 for x in n.values() if x['tarif'])} tarifs, {sum(1 for x in n.values() if x['avis'] or x['sections'])} avec avis ou règles, "
      f"{sum(1 for x in n.values() if x['contexte'])} avec éléments de contexte.")
