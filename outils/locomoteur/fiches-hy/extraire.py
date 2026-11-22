# Extrait les fiches high yield d'un PDF (2 colonnes, 8 encadrés) en JSON. Usage : python3 -I extraire.py fichier.pdf sortie.json
import sys, json, re, pdfplumber
SECTIONS = ["ÉPIDÉMIOLOGIE", "PRÉSENTATION CLINIQUE", "EXAMEN PHYSIQUE", "PHYSIOPATHOLOGIE", "DIAGNOSTIC DIFFÉRENTIEL", "INVESTIGATIONS", "TRAITEMENT", "PRONOSTIC"]
CLES = ["epidemiologie", "presentation", "examen", "physiopathologie", "ddx", "investigations", "traitement", "pronostic"]
def lignes(mots):
    # regroupe les mots en lignes (y proche), puis ordonne
    L = []
    for w in sorted(mots, key=lambda w: (round(w["top"]), w["x0"])):
        if L and abs(L[-1]["top"] - w["top"]) < 3: L[-1]["mots"].append(w)
        else: L.append({"top": w["top"], "mots": [w]})
    return [(l["top"], " ".join(m["text"] for m in sorted(l["mots"], key=lambda m: m["x0"]))) for l in L]
fiches = []
with pdfplumber.open(sys.argv[1]) as pdf:
    for page in pdf.pages:
        W = page.width; mid = W / 2
        mots = page.extract_words(keep_blank_chars=False, use_text_flow=False, extra_attrs=["size", "fontname"])
        tout = lignes(mots)
        no = next((re.search(r"FICHE (C\d+)", t).group(1) for _, t in tout if re.search(r"FICHE C\d+", t)), None)
        if not no: continue
        # en-têtes de section : position (colonne, y)
        entetes = []
        for w in mots:
            pass
        lg = lignes([w for w in mots if w["x0"] < mid]); ld = lignes([w for w in mots if w["x0"] >= mid])
        def pos(col, titre):
            for y, t in col:
                if t.strip() == titre: return y
            return None
        ref_y = next((y for y, t in tout if t.strip() == "RÉFÉRENCES"), page.height)
        # bas des encadrés : signature (image) au-dessus des références ; on coupe à la plus basse des positions utiles
        res = {"no": no}
        haut = [(y, t) for y, t in tout if y < 90]
        res["tags"] = " ".join(t for y, t in haut if "FICHE" not in t).strip()
        res["tags"] = re.sub(r"^.*?FICHE C\d+\s*", "", next(t for y, t in tout if "FICHE" in t)).strip()
        # titre : lignes en grand corps entre l'en-tête et l'image
        gros = [w for w in mots if w["size"] > 14 and not re.match(r"^(FICHE|C\d+)$", w["text"])]
        res["titre"] = " ".join(t for _, t in lignes(gros)).strip()
        for i, (titre, cle) in enumerate(zip(SECTIONS, CLES)):
            col = lg if i % 2 == 0 else ld
            y0 = pos(col, titre)
            if y0 is None: res[cle] = ""; continue
            suivant = [pos(col, SECTIONS[j]) for j in range(i + 2, len(SECTIONS), 2)]
            suivant = [y for y in suivant if y is not None]
            y1 = min(suivant) if suivant else ref_y
            txt = " ".join(t for y, t in col if y0 < y < y1 - 2)
            txt = re.sub(r"\s*Dr\.?\s*Morand\s*$", "", txt).strip()
            # appels de référence (exposants) : regroupés à la fin de l'encadré
            cites = re.findall(r"\[(\d+)\]", txt)
            txt = re.sub(r"\s*\[\d+\]", "", txt).strip()
            res[cle] = {"texte": txt, "refs": [int(c) for c in dict.fromkeys(cites)]}
        # références : texte après RÉFÉRENCES, avec les liens
        refl = [w for w in mots if w["top"] > ref_y + 2]
        reftxt = " ".join(t for _, t in lignes(refl))
        liens = []
        for h in page.hyperlinks:
            ws = [w for w in refl if w["x0"] >= h["x0"] - 1 and w["x1"] <= h["x1"] + 1 and w["top"] >= h["top"] - 2 and w["bottom"] <= h["bottom"] + 2]
            if ws: liens.append({"uri": h["uri"], "x": h["x0"], "y": h["top"], "texte": " ".join(w["text"] for w in sorted(ws, key=lambda w: (round(w["top"]), w["x0"])))})
        refs = []
        for m in re.finditer(r"\[(\d+)\]\s*(.*?)(?=\s*·\s*\[\d+\]|$)", reftxt):
            n, t = int(m.group(1)), m.group(2).strip()
            uri = next((l["uri"] for l in liens if l["texte"] and (l["texte"][:15] in t or t[:15] in l["texte"])), None)
            refs.append({"n": n, "texte": t, "url": uri})
        res["refs"] = refs
        fiches.append(res)
json.dump(fiches, open(sys.argv[2], "w", encoding="utf8"), ensure_ascii=False, indent=1)
print(len(fiches), "fiches")
