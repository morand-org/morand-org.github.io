# MSK Morand : découpe une fiche patient (pages debut à fin) d'un PDF du clinicien, en gardant une seule copie des polices et
# des images partagées entre les pages (contrairement à pdfseparate + pdfunite, qui les recopient à chaque page).
#   python3 -I decouper.py source.pdf debut fin sortie.pdf [titre]
import sys
from pypdf import PdfReader, PdfWriter

source, debut, fin, sortie = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
lecteur = PdfReader(source)
ecrivain = PdfWriter()
for p in range(debut - 1, fin):
    ecrivain.add_page(lecteur.pages[p])
titre = sys.argv[5] if len(sys.argv) > 5 else f"Fiche patient — {lecteur.metadata.title if lecteur.metadata and lecteur.metadata.title else ''}".strip(" —")
ecrivain.add_metadata({"/Title": titre, "/Author": "Dr Morand"})
with open(sortie, "wb") as f:
    ecrivain.write(f)
