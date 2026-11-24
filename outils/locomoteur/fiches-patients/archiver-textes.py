# MSK Morand : archive le texte des fiches patients (JSON corrigés par le Dr Morand, un fichier par région, souvent livrés
# dans un bloc ```json d'un fichier .md) dans outils/locomoteur/fiches-patients/textes/<région>.json.
#   python3 -I outils/locomoteur/fiches-patients/archiver-textes.py région=fichier.md [région=fichier.md …]
# Vérifie que chaque objet porte la bonne région et un identifiant ; les identifiants doivent être ceux du calcul.
import json, os, re, sys

RACINE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.."))
sortie = os.path.join(RACINE, "outils/locomoteur/fiches-patients/textes")
os.makedirs(sortie, exist_ok=True)
for arg in sys.argv[1:]:
    region, fichier = arg.split("=", 1)
    texte = open(fichier, encoding="utf8").read()
    blocs = re.findall(r"```json\s*(.*?)```", texte, re.S) or [texte]
    fiches = [x for b in blocs for x in json.loads(b)]
    assert all(f.get("region") == region and f.get("id") for f in fiches), f"{region} : région ou identifiant manquant"
    with open(os.path.join(sortie, f"{region}.json"), "w", encoding="utf8") as f:
        json.dump(fiches, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{region} : {len(fiches)} fiches ({sum(1 for x in fiches if x.get('applicable'))} avec exercices)")
