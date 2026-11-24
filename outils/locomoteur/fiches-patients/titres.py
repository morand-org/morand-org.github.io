# Relève, pour un PDF de fiches patients, le numéro, le titre et les pages de chaque fiche.  python3 -I titres.py fichier.pdf
import sys, re, subprocess, json
pdf = sys.argv[1]
n = int(re.search(r"Pages:\s+(\d+)", subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout).group(1))
fiches = []
for p in range(1, n + 1):
    t = subprocess.run(["pdftotext", "-layout", "-f", str(p), "-l", str(p), pdf, "-"], capture_output=True, text=True).stdout
    m = re.search(r"FICHE\s+(\d+)\s*/\s*(\d+)", t)
    lignes = [l.strip() for l in t.splitlines() if l.strip()]
    if m and "FICHE PATIENT" in t:
        i = next(k for k, l in enumerate(lignes) if "FICHE PATIENT" in l)
        titre = lignes[i + 1]
        if titre.count("(") > titre.count(")") or titre.endswith((" ou", "«", " de", " du", "-")):
            titre = (titre + " " + lignes[i + 2]).replace("- ", "-") if titre.endswith("-") else titre + " " + lignes[i + 2]
        fiches.append({"no": int(m.group(1)), "total": int(m.group(2)), "titre": titre.strip(), "debut": p, "fin": p})
    elif fiches:
        fiches[-1]["fin"] = p
print(json.dumps({"pages": n, "fiches": fiches}, ensure_ascii=False))
