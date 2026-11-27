# Carte du jeu « Punaise sur la carte » : contours des pays (Natural Earth 1:50m, paquet npm world-atlas@2.0.2, domaine
# public) en tracés SVG, projection équirectangulaire ; et coordonnées des capitales. Produit capitales/carte.json.
#   npm pack world-atlas@2.0.2 && tar xzf world-atlas-2.0.2.tgz
#   python3 -I outils/capitales/carte.py package/countries-50m.json
import json, os, sys

L, H = 2000, 1000            # carte entière : longitude -180..180, latitude 90..-90
NORD, SUD = 84.0, -58.0      # cadrage : sans l'Antarctique ni l'extrême Arctique

def x(lon): return (lon + 180) / 360 * L
def y(lat): return (90 - lat) / 180 * H

# Pays du jeu → code ISO 3166 numérique (identifiant de world-atlas).
ISO = {
"Afrique du Sud": "710", "Algérie": "012", "Angola": "024", "Bénin": "204", "Botswana": "072", "Burkina Faso": "854", "Burundi": "108", "Cap-Vert": "132",
"Cameroun": "120", "Centrafrique": "140", "Comores": "174", "Congo": "178", "République démocratique du Congo": "180", "Côte d'Ivoire": "384", "Djibouti": "262",
"Égypte": "818", "Érythrée": "232", "Eswatini": "748", "Éthiopie": "231", "Gabon": "266", "Gambie": "270", "Ghana": "288", "Guinée": "324", "Guinée-Bissau": "624",
"Guinée équatoriale": "226", "Kenya": "404", "Lesotho": "426", "Liberia": "430", "Libye": "434", "Madagascar": "450", "Malawi": "454", "Mali": "466", "Maroc": "504",
"Maurice": "480", "Mauritanie": "478", "Mozambique": "508", "Namibie": "516", "Niger": "562", "Nigeria": "566", "Ouganda": "800", "Rwanda": "646",
"Sao Tomé-et-Principe": "678", "Sénégal": "686", "Seychelles": "690", "Sierra Leone": "694", "Somalie": "706", "Soudan": "729", "Soudan du Sud": "728",
"Tanzanie": "834", "Tchad": "148", "Togo": "768", "Tunisie": "788", "Zambie": "894", "Zimbabwe": "716",
"Antigua-et-Barbuda": "028", "Argentine": "032", "Bahamas": "044", "Barbade": "052", "Belize": "084", "Bolivie": "068", "Brésil": "076", "Canada": "124", "Chili": "152",
"Colombie": "170", "Costa Rica": "188", "Cuba": "192", "Dominique": "212", "Équateur": "218", "États-Unis": "840", "Grenade": "308", "Guatemala": "320", "Guyana": "328",
"Haïti": "332", "Honduras": "340", "Jamaïque": "388", "Mexique": "484", "Nicaragua": "558", "Panama": "591", "Paraguay": "600", "Pérou": "604",
"République dominicaine": "214", "Saint-Kitts-et-Nevis": "659", "Sainte-Lucie": "662", "Saint-Vincent-et-les-Grenadines": "670", "Salvador": "222", "Suriname": "740",
"Trinité-et-Tobago": "780", "Uruguay": "858", "Venezuela": "862",
"Albanie": "008", "Allemagne": "276", "Andorre": "020", "Autriche": "040", "Belgique": "056", "Biélorussie": "112", "Bosnie-Herzégovine": "070", "Bulgarie": "100",
"Chypre": "196", "Croatie": "191", "Danemark": "208", "Espagne": "724", "Estonie": "233", "Finlande": "246", "France": "250", "Grèce": "300", "Hongrie": "348",
"Irlande": "372", "Islande": "352", "Italie": "380", "Lettonie": "428", "Liechtenstein": "438", "Lituanie": "440", "Luxembourg": "442", "Macédoine du Nord": "807",
"Malte": "470", "Moldavie": "498", "Monaco": "492", "Monténégro": "499", "Norvège": "578", "Pays-Bas": "528", "Pologne": "616", "Portugal": "620", "Tchéquie": "203",
"Roumanie": "642", "Royaume-Uni": "826", "Russie": "643", "Saint-Marin": "674", "Serbie": "688", "Slovaquie": "703", "Slovénie": "705", "Suède": "752", "Suisse": "756",
"Ukraine": "804", "Vatican": "336",
"Afghanistan": "004", "Arabie saoudite": "682", "Arménie": "051", "Azerbaïdjan": "031", "Bahreïn": "048", "Bangladesh": "050", "Bhoutan": "064",
"Birmanie (Myanmar)": "104", "Brunei": "096", "Cambodge": "116", "Chine": "156", "Corée du Nord": "408", "Corée du Sud": "410", "Émirats arabes unis": "784",
"Géorgie": "268", "Inde": "356", "Indonésie": "360", "Irak": "368", "Iran": "364", "Israël": "376", "Japon": "392", "Jordanie": "400", "Kazakhstan": "398",
"Kirghizistan": "417", "Koweït": "414", "Laos": "418", "Liban": "422", "Malaisie": "458", "Maldives": "462", "Mongolie": "496", "Népal": "524", "Oman": "512",
"Ouzbékistan": "860", "Pakistan": "586", "Palestine": "275", "Philippines": "608", "Qatar": "634", "Singapour": "702", "Sri Lanka": "144", "Syrie": "760",
"Tadjikistan": "762", "Thaïlande": "764", "Timor oriental": "626", "Turkménistan": "795", "Turquie": "792", "Viêt Nam": "704", "Yémen": "887",
"Australie": "036", "Fidji": "242", "Kiribati": "296", "Îles Marshall": "584", "Micronésie": "583", "Nauru": "520", "Nouvelle-Zélande": "554", "Palaos": "585",
"Papouasie-Nouvelle-Guinée": "598", "Samoa": "882", "Îles Salomon": "090", "Tonga": "776", "Tuvalu": "798", "Vanuatu": "548",
}

# Capitales (toutes celles qui sont acceptées) → (latitude, longitude).
COORD = {
"Pretoria": (-25.747, 28.188), "Le Cap": (-33.925, 18.424), "Bloemfontein": (-29.116, 26.214), "Alger": (36.754, 3.059), "Luanda": (-8.839, 13.289),
"Porto-Novo": (6.497, 2.605), "Cotonou": (6.366, 2.418), "Gaborone": (-24.628, 25.923), "Ouagadougou": (12.371, -1.520), "Gitega": (-3.428, 29.925),
"Bujumbura": (-3.383, 29.364), "Praia": (14.933, -23.513), "Yaoundé": (3.848, 11.502), "Bangui": (4.394, 18.558), "Moroni": (-11.702, 43.256),
"Brazzaville": (-4.263, 15.243), "Kinshasa": (-4.441, 15.266), "Yamoussoukro": (6.827, -5.290), "Abidjan": (5.360, -4.008), "Djibouti": (11.589, 43.145),
"Le Caire": (30.044, 31.236), "Asmara": (15.322, 38.925), "Mbabane": (-26.305, 31.136), "Lobamba": (-26.467, 31.200), "Addis-Abeba": (9.030, 38.740),
"Libreville": (0.416, 9.467), "Banjul": (13.454, -16.579), "Accra": (5.604, -0.187), "Conakry": (9.641, -13.578), "Bissau": (11.864, -15.598),
"Malabo": (3.755, 8.781), "Nairobi": (-1.292, 36.822), "Maseru": (-29.310, 27.478), "Monrovia": (6.300, -10.797), "Tripoli": (32.887, 13.191),
"Antananarivo": (-18.879, 47.508), "Lilongwe": (-13.963, 33.774), "Bamako": (12.639, -8.003), "Rabat": (34.021, -6.841), "Port-Louis": (-20.161, 57.499),
"Nouakchott": (18.079, -15.965), "Maputo": (-25.969, 32.573), "Windhoek": (-22.560, 17.066), "Niamey": (13.512, 2.112), "Abuja": (9.076, 7.399),
"Kampala": (0.347, 32.582), "Kigali": (-1.944, 30.062), "São Tomé": (0.336, 6.727), "Dakar": (14.716, -17.467), "Victoria": (-4.619, 55.452),
"Freetown": (8.484, -13.234), "Mogadiscio": (2.047, 45.318), "Khartoum": (15.501, 32.560), "Port-Soudan": (19.616, 37.216), "Djouba": (4.859, 31.571),
"Dodoma": (-6.163, 35.752), "N'Djaména": (12.134, 15.056), "Lomé": (6.131, 1.223), "Tunis": (36.806, 10.182), "Lusaka": (-15.388, 28.323), "Harare": (-17.825, 31.034),
"Saint John's": (17.127, -61.846), "Buenos Aires": (-34.604, -58.382), "Nassau": (25.048, -77.355), "Bridgetown": (13.097, -59.614), "Belmopan": (17.251, -88.759),
"Sucre": (-19.047, -65.260), "La Paz": (-16.490, -68.119), "Brasilia": (-15.794, -47.882), "Ottawa": (45.421, -75.697), "Santiago": (-33.449, -70.669),
"Bogota": (4.711, -74.072), "San José": (9.928, -84.091), "La Havane": (23.113, -82.367), "Roseau": (15.301, -61.388), "Quito": (-0.181, -78.468),
"Washington": (38.907, -77.037), "Saint-Georges": (12.056, -61.749), "Guatemala": (14.634, -90.507), "Georgetown": (6.801, -58.155), "Port-au-Prince": (18.594, -72.307),
"Tegucigalpa": (14.072, -87.192), "Kingston": (17.971, -76.793), "Mexico": (19.433, -99.133), "Managua": (12.115, -86.236), "Panama": (8.983, -79.519),
"Asuncion": (-25.264, -57.576), "Lima": (-12.046, -77.043), "Saint-Domingue": (18.486, -69.931), "Basseterre": (17.302, -62.717), "Castries": (14.010, -60.987),
"Kingstown": (13.155, -61.227), "San Salvador": (13.692, -89.218), "Paramaribo": (5.852, -55.204), "Port-d'Espagne": (10.660, -61.508), "Montevideo": (-34.901, -56.164),
"Caracas": (10.481, -66.904),
"Tirana": (41.328, 19.818), "Berlin": (52.520, 13.405), "Andorre-la-Vieille": (42.506, 1.522), "Vienne": (48.208, 16.374), "Bruxelles": (50.850, 4.352),
"Minsk": (53.904, 27.562), "Sarajevo": (43.856, 18.413), "Sofia": (42.698, 23.322), "Nicosie": (35.186, 33.382), "Zagreb": (45.815, 15.982),
"Copenhague": (55.676, 12.568), "Madrid": (40.417, -3.704), "Tallinn": (59.437, 24.754), "Helsinki": (60.170, 24.938), "Paris": (48.857, 2.352),
"Athènes": (37.984, 23.728), "Budapest": (47.498, 19.040), "Dublin": (53.350, -6.260), "Reykjavik": (64.147, -21.942), "Rome": (41.903, 12.496),
"Riga": (56.950, 24.106), "Vaduz": (47.141, 9.521), "Vilnius": (54.687, 25.280), "Luxembourg": (49.611, 6.132), "Skopje": (41.998, 21.425),
"La Valette": (35.899, 14.514), "Chișinău": (47.011, 28.864), "Monaco": (43.738, 7.425), "Podgorica": (42.441, 19.263), "Oslo": (59.914, 10.752),
"Amsterdam": (52.368, 4.904), "La Haye": (52.070, 4.300), "Varsovie": (52.230, 21.012), "Lisbonne": (38.722, -9.139), "Prague": (50.076, 14.438),
"Bucarest": (44.427, 26.103), "Londres": (51.507, -0.128), "Moscou": (55.756, 37.617), "Saint-Marin": (43.936, 12.447), "Belgrade": (44.787, 20.457),
"Bratislava": (48.149, 17.107), "Ljubljana": (46.057, 14.506), "Stockholm": (59.329, 18.069), "Berne": (46.948, 7.447), "Kyiv": (50.450, 30.523),
"Cité du Vatican": (41.903, 12.453),
"Kaboul": (34.556, 69.207), "Riyad": (24.713, 46.675), "Erevan": (40.179, 44.499), "Bakou": (40.409, 49.867), "Manama": (26.229, 50.586), "Dacca": (23.810, 90.413),
"Thimphou": (27.472, 89.639), "Naypyidaw": (19.763, 96.079), "Bandar Seri Begawan": (4.903, 114.940), "Phnom Penh": (11.556, 104.928), "Pékin": (39.904, 116.407),
"Pyongyang": (39.039, 125.763), "Séoul": (37.567, 126.978), "Abou Dabi": (24.453, 54.377), "Tbilissi": (41.716, 44.783), "New Delhi": (28.614, 77.209),
"Jakarta": (-6.208, 106.846), "Nusantara": (-0.963, 116.709), "Bagdad": (33.315, 44.366), "Téhéran": (35.689, 51.389), "Jérusalem": (31.769, 35.216),
"Tel-Aviv": (32.085, 34.782), "Tokyo": (35.676, 139.650), "Amman": (31.955, 35.945), "Astana": (51.169, 71.449), "Bichkek": (42.875, 74.570),
"Koweït": (29.376, 47.977), "Vientiane": (17.975, 102.633), "Beyrouth": (33.894, 35.502), "Kuala Lumpur": (3.139, 101.687), "Putrajaya": (2.926, 101.696),
"Malé": (4.175, 73.509), "Oulan-Bator": (47.886, 106.906), "Katmandou": (27.717, 85.324), "Mascate": (23.588, 58.383), "Tachkent": (41.299, 69.240),
"Islamabad": (33.684, 73.048), "Jérusalem-Est": (31.783, 35.233), "Ramallah": (31.904, 35.204), "Manille": (14.600, 120.984), "Doha": (25.285, 51.531),
"Singapour": (1.290, 103.852), "Sri Jayawardenepura Kotte": (6.890, 79.902), "Colombo": (6.927, 79.861), "Damas": (33.514, 36.277), "Douchanbé": (38.560, 68.787),
"Bangkok": (13.756, 100.502), "Dili": (-8.556, 125.560), "Achgabat": (37.960, 58.326), "Ankara": (39.934, 32.860), "Hanoï": (21.028, 105.834),
"Sanaa": (15.369, 44.191), "Aden": (12.785, 45.019),
"Canberra": (-35.281, 149.130), "Suva": (-18.142, 178.442), "Tarawa-Sud": (1.329, 172.979), "Majuro": (7.090, 171.380), "Palikir": (6.917, 158.159),
"Yaren": (-0.547, 166.921), "Wellington": (-41.287, 174.776), "Ngerulmud": (7.500, 134.624), "Port Moresby": (-9.443, 147.180), "Apia": (-13.834, -171.766),
"Honiara": (-9.446, 159.972), "Nukuʻalofa": (-21.139, -175.204), "Funafuti": (-8.521, 179.198), "Port-Vila": (-17.734, 168.322),
}

def decoder(topo):
    sx, sy = topo["transform"]["scale"]; tx, ty = topo["transform"]["translate"]
    arcs = []
    for a in topo["arcs"]:
        px = py = 0; pts = []
        for dx, dy in a: px += dx; py += dy; pts.append((px * sx + tx, py * sy + ty))
        arcs.append(pts)
    return arcs

def anneau(arcs, idx):
    pts = []
    for i in idx:
        a = arcs[i] if i >= 0 else list(reversed(arcs[~i]))
        pts.extend(a if not pts else a[1:])
    return pts

def simplifier(pts, tol=0.45):
    """Douglas-Peucker (itératif) : enlève les points à moins de tol unités de la ligne."""
    if len(pts) < 5: return pts
    garde = [False] * len(pts); garde[0] = garde[-1] = True; pile = [(0, len(pts) - 1)]
    while pile:
        i, j = pile.pop(); (ax, ay), (bx, by) = pts[i], pts[j]; dx, dy = bx - ax, by - ay; n = (dx * dx + dy * dy) ** 0.5 or 1e-9
        k, dm = -1, tol
        for m in range(i + 1, j):
            px, py = pts[m]; d = abs(dy * px - dx * py + bx * ay - by * ax) / n if n > 1e-9 else ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
            if d > dm: k, dm = m, d
        if k >= 0: garde[k] = True; pile += [(i, k), (k, j)]
    return [q for q, g in zip(pts, garde) if g]

def couper(r):
    """Coupe un anneau qui traverse l'antiméridien (Russie, Fidji) en morceaux, un de chaque côté,
    fermés le long du bord de la carte : sinon une ligne horizontale traverse tout le globe."""
    sauts = [i for i in range(1, len(r)) if abs(r[i][0] - r[i - 1][0]) > 180]
    if not sauts: return [r]
    r = r[sauts[0]:] + r[1:sauts[0]]          # l'anneau commence juste après une traversée
    morceaux, cour = [], [r[0]]
    for a, b in zip(r, r[1:]):
        if abs(b[0] - a[0]) > 180:
            bord = 180 if a[0] > 0 else -180
            lb = b[0] + (360 if bord == 180 else -360)
            t = (bord - a[0]) / (lb - a[0]) if lb != a[0] else 0
            lat = a[1] + t * (b[1] - a[1])
            cour.append((bord, lat)); morceaux.append(cour); cour = [(-bord, lat), b]
        else: cour.append(b)
    morceaux.append(cour)
    return morceaux

def chemin(rings):
    out = []
    for r0 in rings:
      for r in couper(list(r0)):
        pts, prec = [], None
        for lon, lat in r:
            lat = max(SUD - 2, min(NORD + 2, lat))
            p = (round(x(lon) * 2) / 2, round(y(lat) * 2) / 2)
            if p != prec: pts.append(p); prec = p
        pts = simplifier(pts)
        if len(pts) < 3: continue
        s = "M" + " ".join(f"{a:g},{b:g}" for a, b in pts) + "Z"
        out.append(s)
    return "".join(out)

def main(fichier):
    topo = json.load(open(fichier, encoding="utf8")); arcs = decoder(topo)
    inverse = {v: k for k, v in ISO.items()}
    pays, autres = {}, []
    for g in topo["objects"]["countries"]["geometries"]:
        if g.get("id") == "010": continue   # Antarctique
        polys = [g["arcs"]] if g["type"] == "Polygon" else g["arcs"] if g["type"] == "MultiPolygon" else []
        rings = [anneau(arcs, r) for p in polys for r in p]
        # Anneaux qui traversent l'antiméridien : découpés en deux par Natural Earth, rien à faire ; on écarte les sauts restants.
        d = chemin(rings)
        if not d: continue
        nom = inverse.get(g.get("id"))
        if nom and g["properties"]["name"] != "Ashmore and Cartier Is.": pays[nom] = pays.get(nom, "") + d
        else: autres.append(d)
    ici = os.path.dirname(os.path.abspath(__file__))
    import importlib.util
    spec = importlib.util.spec_from_file_location("pays", os.path.join(ici, "pays.py")); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    manque = [c for p in m.P for c in p[2] if c not in COORD]; assert not manque, manque
    assert set(ISO) == {p[0] for p in m.P}, set(ISO) ^ {p[0] for p in m.P}
    capitales = {p[0]: [[c, *COORD[c]] for c in p[2]] for p in m.P}
    sortie = {"source": "Natural Earth 1:50m (domaine public), via world-atlas 2.0.2", "largeur": L, "hauteur": H,
              "cadre": [0, round(y(NORD), 1), L, round(y(SUD) - y(NORD), 1)], "pays": pays, "autres": "".join(autres), "capitales": capitales}
    f = os.path.join(ici, "../../capitales/carte.json")
    json.dump(sortie, open(f, "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
    print(f"{len(pays)} pays tracés ; sans contour : {sorted(set(ISO) - set(pays))} ; {os.path.getsize(f) // 1024} Ko")

if __name__ == "__main__": main(sys.argv[1])
