# MSK Morand : extrait les fiches high yield d'un PDF du clinicien (une fiche par page : en-tête « FICHE C1 », titre,
# planche, 8 encadrés en 2 colonnes, références) en JSON, et leurs planches en WebP.
#   python3 -I extraire.py fichier.pdf sortie.json [dossier_des_planches]
# Cas gérés : numéros C1, Co1, H6–7 ; intertitre sur deux lignes (« DIAGNOSTIC DIFFÉRENTIEL (LÉSIONS / ASSOCIÉES) ») ;
# fiche « RENVOI & PARTICULARITÉS » (un seul encadré) ; page de suite qui ne porte que des références.
import sys, os, json, re, subprocess, tempfile, glob
import pdfplumber

NO = r"[A-Z][a-z]?\d+(?:[–-]\d+)?"
SECTIONS = ["ÉPIDÉMIOLOGIE", "PRÉSENTATION CLINIQUE", "EXAMEN PHYSIQUE", "PHYSIOPATHOLOGIE", "DIAGNOSTIC DIFFÉRENTIEL", "INVESTIGATIONS", "TRAITEMENT", "PRONOSTIC"]
CLES = ["epidemiologie", "presentation", "examen", "physiopathologie", "ddx", "investigations", "traitement", "pronostic"]


def lignes(mots):
    """Regroupe les mots en lignes (même hauteur), de haut en bas, de gauche à droite."""
    L = []
    for w in sorted(mots, key=lambda w: (round(w["top"]), w["x0"])):
        if L and abs(L[-1]["top"] - w["top"]) < 3:
            L[-1]["mots"].append(w)
        else:
            L.append({"top": w["top"], "mots": [w]})
    return [(l["top"], " ".join(m["text"] for m in sorted(l["mots"], key=lambda m: m["x0"]))) for l in L]


def encadre(txt):
    """Texte d'un encadré : les appels de référence (exposants) sont regroupés à la fin."""
    cites = re.findall(r"\[(\d+)\]", txt)
    txt = re.sub(r"\s*\[\d+\]", "", txt).strip()
    return {"texte": txt, "refs": [int(c) for c in dict.fromkeys(cites)]}


def references(page, mots):
    """Références « [n] Auteur… · [m] … » et leurs liens (annotations de la page)."""
    texte = " ".join(t for _, t in lignes(mots))
    liens = []
    for h in page.hyperlinks:
        ws = [w for w in mots if w["x0"] >= h["x0"] - 1 and w["x1"] <= h["x1"] + 1 and w["top"] >= h["top"] - 2 and w["bottom"] <= h["bottom"] + 2]
        if ws:
            liens.append({"uri": h["uri"], "texte": " ".join(w["text"] for w in sorted(ws, key=lambda w: (round(w["top"]), w["x0"])))})
    refs = []
    for m in re.finditer(r"\[(\d+)\]\s*(.*?)(?=\s*·\s*\[\d+\]|$)", texte):
        n, t = int(m.group(1)), m.group(2).strip()
        uri = next((l["uri"] for l in liens if l["texte"] and (l["texte"][:15] in t or t[:15] in l["texte"])), None)
        refs.append({"n": n, "texte": t, "url": uri})
    return refs


def planche(pdf_chemin, page_no, sortie):
    """Plus grande image JPEG de la page, en WebP de 480 px de large."""
    from PIL import Image
    with tempfile.TemporaryDirectory() as d:
        subprocess.run(["pdfimages", "-j", "-f", str(page_no), "-l", str(page_no), pdf_chemin, os.path.join(d, "i")], check=True)
        imgs = sorted(glob.glob(os.path.join(d, "i-*.jpg")), key=os.path.getsize, reverse=True)
        if not imgs:
            return False
        im = Image.open(imgs[0]).convert("RGB")
        im = im.resize((480, round(480 * im.height / im.width)), Image.LANCZOS)
        im.save(sortie, "WEBP", quality=76, method=6)
        return True


def extraire(chemin, dossier_img=None):
    fiches = []
    with pdfplumber.open(chemin) as pdf:
        for no_page, page in enumerate(pdf.pages, 1):
            mots = page.extract_words(extra_attrs=["size"])
            tout = lignes(mots)
            entete = next((t for _, t in tout if re.search(rf"FICHE {NO}", t)), None)
            if not entete:
                # Page de suite : seulement la fin des références de la fiche précédente.
                if fiches:
                    fiches[-1]["refs"] += references(page, mots)
                continue
            no = re.search(rf"FICHE ({NO})", entete).group(1)
            res = {"no": no, "page": no_page, "tags": re.sub(rf"^.*?FICHE {NO}\s*", "", entete).strip()}
            gros = [w for w in mots if w["size"] > 14 and not re.match(rf"^(FICHE|{NO})$", w["text"])]
            res["titre"] = " ".join(t for _, t in lignes(gros)).strip()
            ref_y = next((y for y, t in tout if t.strip() == "RÉFÉRENCES"), page.height)
            renvoi_y = next((y for y, t in tout if t.strip().startswith("RENVOI")), None)
            if renvoi_y is not None:
                res["renvoi"] = encadre(" ".join(t for y, t in tout if renvoi_y < y < ref_y - 2))
                for cle in CLES:
                    res[cle] = {"texte": "", "refs": []}
            else:
                mid = page.width / 2
                colonnes = [lignes([w for w in mots if w["x0"] < mid]), lignes([w for w in mots if w["x0"] >= mid])]
                entetes = {}
                for i, titre in enumerate(SECTIONS):
                    col = colonnes[i % 2]
                    j = next((k for k, (_, t) in enumerate(col) if t.strip().startswith(titre)), None)
                    if j is None:
                        continue
                    texte, suite = col[j][1].strip(), None
                    if texte.count("(") > texte.count(")") and j + 1 < len(col):
                        suite = col[j + 1][0]
                        texte += " " + col[j + 1][1].strip()
                    entetes[i] = (col[j][0], texte, suite)
                for i, (titre, cle) in enumerate(zip(SECTIONS, CLES)):
                    if i not in entetes:
                        res[cle] = {"texte": "", "refs": []}
                        continue
                    y0, texte_entete, suite = entetes[i]
                    suivants = [entetes[k][0] for k in range(i + 2, len(SECTIONS), 2) if k in entetes]
                    y1 = min(suivants) if suivants else ref_y
                    col = colonnes[i % 2]
                    res[cle] = encadre(" ".join(t for y, t in col if y0 < y < y1 - 2 and y != suite))
                    if texte_entete != titre:
                        res[cle]["titre"] = texte_entete
            res["refs"] = references(page, [w for w in mots if w["top"] > ref_y + 2])
            if dossier_img:
                os.makedirs(dossier_img, exist_ok=True)
                fichier = re.sub(r"[–-]", "-", no.lower()) + ".webp"
                res["planche"] = fichier if planche(chemin, no_page, os.path.join(dossier_img, fichier)) else None
            fiches.append(res)
    return fiches


if __name__ == "__main__":
    fiches = extraire(sys.argv[1], sys.argv[3] if len(sys.argv) > 3 else None)
    json.dump(fiches, open(sys.argv[2], "w", encoding="utf8"), ensure_ascii=False, indent=1)
    vides = [f["no"] for f in fiches if "renvoi" not in f and not all(f[c]["texte"] for c in CLES)]
    print(f"{len(fiches)} fiches, {sum('renvoi' in f for f in fiches)} renvois, {sum(len(f['refs']) for f in fiches)} références ; encadrés vides : {vides or 'aucun'}")
