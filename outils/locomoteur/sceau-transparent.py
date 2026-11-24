# Sceau MSK : le fond crème intérieur devient transparent ; le dessin garde sa teinte dorée, avec une opacité
# proportionnelle à son écart avec le crème (comme les autres sceaux, dorés sur fond transparent).
import sys
from PIL import Image
src, dst, apercu = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert("RGBA")
w, h = im.size
px = im.load()
CREME = (253, 250, 242)
OR = (180, 138, 74)          # #b48a4a, la couleur des autres sceaux
lum = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
Lc, Lo = lum(CREME), lum(OR)
out = Image.new("RGBA", (w, h))
po = out.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a == 0: continue
        k = max(0.0, min(1.0, (Lc - lum((r, g, b))) / (Lc - Lo)))
        k = min(1.0, k * 1.15)
        po[x, y] = (*OR, int(round(255 * k * a / 255)))
out.save(dst, "WEBP", lossless=True, quality=100)
for nom, fond in (("sombre", (18, 17, 13)), ("clair", (247, 243, 234))):
    f = Image.new("RGBA", (w, h), (*fond, 255)); f.alpha_composite(out); f.convert("RGB").save(apercu.replace(".png", f"-{nom}.png"))
print("ok", out.size)
