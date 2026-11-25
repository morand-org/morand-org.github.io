# Sceaux SVG : cadre resserré (comme le sceau MSK) et traits épaissis (contour de la même couleur).
import re, sys
W = float(sys.argv[1]); src = sys.argv[2]; dst = sys.argv[3]
BOITES = {  # contenu mesuré (unités de l'image d'origine)
  "wealth": (37, 31, 473, 481), "guide": (37, 31, 473, 481), "map": (37, 31, 473, 481),
  "crds": (14.5, 9.9, 500.9, 502.1), "codes": (14.5, 9.9, 500.9, 502.1)}
for nom, (x0, y0, x1, y1) in BOITES.items():
    s = open(f"{src}/sceau-{nom}.svg", encoding="utf8").read()
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    demi = max(x1 - x0, y1 - y0) / 2 + W / 2 + 1.5
    vb = f'{cx - demi:.1f} {cy - demi:.1f} {2 * demi:.1f} {2 * demi:.1f}'
    s = re.sub(r'viewBox="[^"]*"', f'viewBox="{vb}"', s, count=1)
    s = s.replace('fill="#b48a4a"', f'fill="#b48a4a" stroke="#b48a4a" stroke-width="{W:g}" stroke-linejoin="round"')
    open(f"{dst}/sceau-{nom}.svg", "w", encoding="utf8").write(s)
