# Intègre les révisions d'OpenEvidence aux fiches patients v2, avec tri (sécurité, erreurs et cohérence : oui ;
# nuances ajoutées par manque d'études, statistiques, règle d'une heure : non).
#   python3 -I outils/locomoteur/fiches-patients/integrer-revues.py <région> [--ecrire]
# Lit revision/reponses/*<région>* ; compare à textes-v2/<région>.json ; écrit revues/<région>.json et
# revision/integration/<région>.md (journal). Décisions manuelles : revision/decisions-revues.json.
import json, re, sys, os, glob, difflib, unicodedata

B = "/home/user/morand-org.github.io/outils/locomoteur/fiches-patients/"
REP = B + "revision/reponses/"
ICI = os.path.dirname(os.path.abspath(__file__))
REGION = sys.argv[1]; ECRIRE = "--ecrire" in sys.argv
CODE = {"pied": "PIE", "cheville": "CHE", "hanche": "HAN", "lombaire": "LOM", "poignet": "MAI", "coude": "COU", "cervical": "CER", "epaule": "EPA", "genou": "GEN"}[REGION]
DECISIONS = json.load(open(B + "revision/decisions-revues.json", encoding="utf8"))

TETES = [(r"EN BREF", "en_bref"), (r"CE QUE VOUS AVEZ", "ce_que_vous_avez"), (r"POURQUOI ÇA ARRIVE", "pourquoi"), (r"SOULAGER LA DOULEUR", "soulager"),
         (r"CE QUI AIDE", "ce_qui_aide"), (r"À ÉVITER POUR L'INSTANT", "a_eviter"), (r"RÈGLE DE DOULEUR \(0 À 10\)", "regle_de_douleur"),
         (r"CONSULTEZ RAPIDEMENT(?: \([^)]*\))?", "urgence"), (r"QUAND RECONSULTER", "medecin"), (r"REVOYEZ VOTRE MÉDECIN SI", "medecin"),
         (r"DURÉE HABITUELLE", "duree_habituelle"), (r"PROGRAMME D'EXERCICES", "exercices"), (r"RÉFÉRENCES", "references")]
PARAGRAPHES = {"ce_que_vous_avez", "regle_de_douleur", "duree_habituelle"}
CHAMPS = [("Phase", "phase"), ("But", "but"), ("Départ", "position_de_depart"), ("Mouvement", "mouvement"), ("Dosage", "dosage"), ("Progression", "progression"),
          ("Plus facile", "plus_facile"), ("Erreur fréquente", "erreur_frequente"), ("Illustration demandée", "illustration")]

def norm(s):
    s = unicodedata.normalize("NFKC", (s or "").replace("ᵉ", "\x03")).replace("\x03", "ᵉ").replace("’", "'")   # garder « 5ᵉ ».replace(" ", " ").replace("\xa0", " ")
    return re.sub(r"\s+", " ", s).strip()
def cle(s):  # comparaison souple
    s = norm(s).lower().replace("ᵉ", "e"); s = re.sub(r"[«»\"“”().,;:!?…'’\-–—]", " ", s); return re.sub(r"\s+", " ", s).strip()
def proche(a, b): return difflib.SequenceMatcher(None, cle(a), cle(b)).ratio()

# ---------- Lecture et découpage des réponses ----------
def lire_reponses():
    t = ""
    for f in sorted(glob.glob(REP + f"*openevidence-{REGION}*")):
        if f.endswith((".md", ".txt")): t += "\n" + open(f, encoding="utf8").read()
    t = t.replace("**", "")
    t = re.sub(r"\[\[\d+\]\]\([^)]*\)", "", t)
    for _ in range(3): t = re.sub(r"(?<![\[\w])\[\d+(?:[,–-]\d+)*\](?!\()", "", t)
    return t

def fiches(t):
    ms = list(re.finditer(r"FICHE (%s-\d{2}) · \[([a-z_]+)/([a-z0-9_]+)\]" % CODE, t))
    out = {}
    for i, m in enumerate(ms):
        corps = t[m.end(): ms[i + 1].start() if i + 1 < len(ms) else len(t)]
        corps = re.split(r"\n\s*(?:#+\s*)?(?:Notes de révision|References\s*\n|Références d'OpenEvidence)", corps)[0]
        out[m.group(1)] = (m.group(3), corps)
    return out

def lignes(corps):
    for pat, _ in TETES: corps = re.sub(r"(?<!« )(?<!«)(%s)(?! »)" % pat, r"\n\1\n", corps)
    for lab in ["Titre :", "Sous-titre :", "Ancien titre :", "Diagnostic correspondant", "Matériel :"]: corps = corps.replace(lab, "\n" + lab)
    corps = re.sub(r"(Exercice \d+ :)", r"\n\1", corps)
    for lab, _ in CHAMPS: corps = re.sub(r"(?<!\n)(?<![A-Za-zÀ-ÿ])(%s :)" % re.escape(lab), r"\n\1", corps)
    out = []
    for l in corps.split("\n"):
        l = re.sub(r"^[\s#=\-–•*]+", "", l).strip(); l = re.sub(r"\s*=+\s*$", "", l)
        # Remarques de vérification collées au texte : « (Vérifié : …) », « À VÉRIFIER : … » en fin de ligne.
        l = re.sub(r"\s*\((?:Vérifié|VÉRIFIÉ|Verifié|À vérifier|À VÉRIFIER|A vérifier)\b[^()]*(?:\([^()]*\)[^()]*)*\)\.?", "", l)
        l = re.sub(r"(?<=[.!?»)])\s*(?:À|A) VÉRIFIER\s*:(?![^\[]*\]).*$", "", l).strip()
        if l: out.append(l)
    return out

def sections(ls):
    S = {"titre": [], "exercices": []}; cur = "titre"; ex = None
    tetes = [(re.compile(r"^%s$" % p), k) for p, k in TETES]
    for l in ls:
        tete = next((k for r, k in tetes if r.match(l)), None)
        if tete: cur = tete; S.setdefault(cur, []); continue
        if cur == "exercices":
            m = re.match(r"^Exercice (\d+) : (.*)$", l)
            if m: ex = {"no": int(m.group(1)), "nom": m.group(2)}; S["exercices"].append(ex); continue
            if l.startswith("Matériel :") or ex is None: continue
            m = next(((k, l[len(lab) + 2:].strip()) for lab, k in CHAMPS if l.startswith(lab + " :")), None)
            if m: ex[m[0]] = m[1]
            elif ex and re.match(r"^\[", l): pass
            continue
        S.setdefault(cur, []).append(l)
    return S

# ---------- Marqueurs ----------
def marqueurs(l):
    segs, i = [], 0
    for m in re.finditer(r"\[(?=MODIFI|VÉRIFI|VERIFI|À VÉRIFIER|A VÉRIFIER|AJOUT|NOTE|Note)", l):
        if m.start() < i: continue
        d, j = 0, m.start()
        while j < len(l):
            if l[j] == "[": d += 1
            elif l[j] == "]":
                d -= 1
                if d == 0: break
            j += 1
        segs.append((i, m.start(), l[m.start() + 1:j])); i = j + 1
    segs.append((i, len(l), None))
    return segs

def hors_guillemets_split(s, sep):
    d = 0
    for k, c in enumerate(s):
        if c == "«": d += 1
        elif c == "»": d -= 1
        elif d == 0 and s.startswith(sep, k): return s[:k], s[k + len(sep):]
    return s, None

def sans_guillemets(s):
    s = s.strip()
    if s.startswith("«") and s.endswith("»") and s.count("«") == 1: s = s[1:-1]
    return s.strip().strip("« »").strip() if s.startswith("«") and s.endswith("»") else s.strip()

def analyser(contenu):
    m = re.match(r"^(MODIFI[ÉE]|AJOUT[ÉE]?)\s*:?\s*(.*)$", contenu, re.S)
    if not m: return {"type": "note"}
    corps = m.group(2)
    corps, raison = hors_guillemets_split(corps, " — ")
    raison = raison or ""
    if "→" in corps:
        a, n = hors_guillemets_split(corps, "→")
        if re.search(r"rubrique|consigne 8", a, re.I) or (re.search(r"rubrique|consigne 8", n, re.I) and len(n) < 60): return {"type": "note", "raison": corps}
        # Déplacements : « ancien » (sous « … ») → « nouveau » (ajouté ici) ; → Même texte, déplacé ici, suivi de « … » ; → déplacé ici …
        a = re.sub(r"\s*\(sous «[^»]*»\)\s*$", "", a.strip())
        n = re.sub(r"\s*\((?:ajouté|ajoutée|déplacé|déplacée)[^()]*\)\s*$", "", n.strip())
        m_aj = re.match(r"^ajout(?:é|ée)? de\s*«\s*(.*)\s*»\s*$", n.strip(), re.I)
        if m_aj: n = m_aj.group(1)
        m_meme = re.match(r"^Même texte.*?(?:suivi de|avec|puis)\s*«\s*(.*?)\s*»", n.strip(), re.I)
        if m_meme and sans_guillemets(a) not in VIDE: n = sans_guillemets(a).rstrip() + " " + m_meme.group(1)
        elif re.match(r"^(Même texte|déplacé ici|déplacée ici)", n.strip(), re.I): n = "texte ci-dessus"
        n2 = sans_guillemets(n); a2 = sans_guillemets(a)
        if re.match(r"^(texte ci-(dessus|contre|dessous)|nouveau texte|nouvelle formulation|texte réécrit)\b", n2, re.I): n2 = SENT
        elif re.search(r"\[…\]|\[\.\.\.\]", n2):   # « Le premier jour surtout […] 15 à 20 minutes » : morceaux du texte de la ligne
            return {"type": "remplace", "ancien": a2, "nouveau": SENT, "raison": raison.strip(), "morceaux": [x.strip(" ,;") for x in re.split(r"\[…\]|\[\.\.\.\]", n2) if x.strip(" ,;")]}
        if re.match(r"^\(?(déplacé|déplacée)", a2, re.I): a2 = "(rien)"
        # Changement de mise en forme décrit (« une seule puce » → « deux puces » ; → « puce séparée ») : le texte est la ligne elle-même.
        if n2 != SENT and len(n2) < 90 and re.search(r"\bpuces?\b", n2, re.I) and (re.search(r"\bpuces?\b", a2, re.I) or re.match(r"^(une |deux |trois )?puces? (séparée|distincte|commune)", n2, re.I)):
            return {"type": "remplace", "ancien": a2, "nouveau": SENT, "raison": raison.strip(), "structure": True}
        return {"type": "remplace", "ancien": a2, "nouveau": n2, "raison": raison.strip()}
    if re.search(r"ajout", corps, re.I):
        aj = []
        apres = corps[re.search(r"ajout", corps, re.I).start():]
        for q in re.finditer(r"«\s*(.*?)\s*»(\s*(au début|à la fin|en tête|à la suite))?", apres):
            pos = q.group(3) or ("début" if q.group(1).rstrip().endswith(":") else "fin")
            aj.append((q.group(1), "début" if pos in ("au début", "en tête", "début") else "fin"))
        return {"type": "ajout", "ajouts": aj, "raison": (raison or corps).strip(), "corps": corps}
    return {"type": "note", "raison": (raison or corps).strip()}

VIDE = {"(absent)", "absent", "(absente)", "(rien)", "rien", "(ajout)", "ajout", "(aucun)", "(nouveau)", "nouveau", "(nouvel élément)", "(aucun texte)", "aucun texte", "", "(nouvelle ligne)", "(ajouté)"}
SENT = "\x02"   # « texte ci-dessus » / « texte ci-contre » : le nouveau texte est la ligne elle-même
RETIRE = re.compile(r"^\(?(retiré|supprimé|retirée|supprimée|retrait)\)?\.?$", re.I)
HEDGE = re.compile(r"aucun essai|aucune (donnée|étude|source|preuve|recommandation)|preuves? (limitée|faible)|certitude (faible|très faible)|faible certitude|non validé|pas d'essai|données (limitées|indirectes|probantes limitées)|non retrouvé|aucun dosage|peu de preuves|niveau de preuve", re.I)
MOTS_HEDGE = re.compile(r"\b(peut|peuvent|pourrait|parfois|souvent|une partie|chez certain|aider à|semble)\b", re.I)
SECU = re.compile(r"urgen|fractur|infect|septique|caillot|phléb|embol|charcot|lisfranc|queue de cheval|torsion|hernie|étrangl|déficit|faiblesse|loges|compartiment|nécrose|épiphysiolyse|tumeur|cancer|alarme|drapeau|ottawa|déboît|luxation|myélopathie|vasculaire|artère|insensib|diabét", re.I)
COHER = re.compile(r"cohéren|déjà (assis|debout|en appui)|départ est déjà|vouvo|aucun exercice ne s'en sert|ne renvoyait|semble venir|erreur|inexact|incorrect|contradict|confusion|doublon|répétition|consigne 8|plus facile|matériel", re.I)

def decider(code, section, ch, outside):
    # Décisions manuelles : decisions.json { "<code>": [ [« extrait », "oui"|"non"], ... ] }
    blob = json.dumps(ch, ensure_ascii=False) + " " + outside
    for extrait, d in DECISIONS.get(code, []):
        if extrait in blob: return d, "décision manuelle"
    if ch["type"] == "note": return "oui", "note"
    raison = ch.get("raison", "")
    if section in ("urgence", "medecin"): return "oui", "signes : classement retenu"
    if section == "regle_de_douleur": return "oui", "règle de douleur (tri ensuite)"
    if SECU.search(raison) or SECU.search(ch.get("nouveau", "")) and section not in ("ce_que_vous_avez",): return "oui", "sécurité"
    if COHER.search(raison): return "oui", "cohérence"
    if ch["type"] == "remplace":
        a, n = ch["ancien"], ch["nouveau"]
        nouv_hedge = set(w.lower() for w in MOTS_HEDGE.findall(n)) - set(w.lower() for w in MOTS_HEDGE.findall(a))
        if HEDGE.search(raison) and (nouv_hedge or len(n) < len(a)): return "non", "nuance ajoutée par manque d'études"
        if re.search(r"\d+ ?%|\bRC\b|\bRV\b|odds|\d+ (personnes?|patients?|cas|pieds?|femmes?|hommes?|enfants?|jeunes|sportifs?|adultes?|kystes?)( \w+)? sur \d+|sur 100\b|une personne sur (deux|trois|quatre)", n): return "non", "statistique dans le texte du patient"
        if a not in VIDE and len(n) > 1.7 * len(a) + 70: return "revoir", "ajout long"
        if a in VIDE and len(n) > 170: return "revoir", "ajout long"
    if ch["type"] == "ajout" and HEDGE.search(raison): return "non", "nuance ajoutée par manque d'études"
    return "oui", "correction simple"

def texte_reel(n):   # texte à insérer (phrase complète), et non une description du changement
    n = n.strip()
    if n.count("«") >= 2 or "..." in n or "…" in n: return False
    return bool(re.match(r"^[«A-ZÀ-ÖØ-Ý0-9(]", n)) and bool(re.search(r"[.!?»)]$", n)) and len(n) >= 15

def contient(hors, n):
    ch, cn = cle(hors), cle(n)
    return bool(cn) and (cn in ch or (len(cn) > 25 and difflib.SequenceMatcher(None, ch, cn).find_longest_match(0, len(ch), 0, len(cn)).size > 0.85 * len(cn)))

def resoudre(code, section, l, journal):
    """Rend (texte retenu, revenir_v2) pour une ligne avec ses marqueurs."""
    segs = marqueurs(l)
    hors = norm(" ".join(l[a:b] for a, b, _ in segs))
    res, revenir, ajouts, tout = "", False, [], None
    for a, b, c in segs:
        res += l[a:b]
        if c is None or not re.match(r"MODIFI|AJOUT", c): continue
        ch = analyser(c); d, pourquoi = decider(code, section, ch, hors)
        journal.append((section, d, pourquoi, ch))
        if ch["type"] == "remplace":
            old, new = ch["ancien"], ch["nouveau"]
            if new == SENT:
                ch["nouveau"] = hors
                if d == "non":
                    if ch.get("structure") or ch.get("morceaux"): revenir = True; continue
                    if old in VIDE: return None, False
                    if "…" in old or "..." in old: revenir = True
                    else: tout = old; revenir = True   # puis le texte de base le plus proche, s'il existe
                continue
            if d in ("oui", "revoir"):
                if RETIRE.match(new): res += "\x01"   # ligne retirée
                elif contient(hors, new): pass
                elif old not in VIDE and "…" not in old and "..." not in old and len(old) > 3 and old in res: res = res.replace(old, new)
                elif len(cle(hors)) > 8 and not texte_reel(new) and re.search(r"[.!?»):]\s*$", res): pass   # « ajout », « texte nuancé », « deux lignes ci-dessus » : description du changement ; la ligne porte déjà le texte
                else: res += " " + new + " "
            else:
                if old in VIDE: pass
                elif contient(hors, new):
                    if "…" in old or "..." in old or not old: revenir = True
                    else: res = res.replace(new, old) if new in res else res; revenir = revenir or new not in l
                else:
                    if "…" in old or "..." in old: revenir = True; res += " " + new + " "   # remplacé ensuite par le texte de base le plus proche
                    else: res += " " + old + " "
        elif ch["type"] == "ajout" and d == "non":
            for txt, pos in ch["ajouts"]:
                res = res.replace(txt, "")
            # le texte de la ligne contient déjà l'ajout ou non : on l'enlève dans les deux cas
        elif ch["type"] == "ajout":
            ajouts += ch["ajouts"]
    if tout is not None: res = tout
    for txt, pos in ajouts:   # après la lecture de toute la ligne
        if cle(txt) in cle(res): continue
        if pos == "début": res = txt + " " + res
        elif txt[:1] in "(,;" or txt[:1].islower():   # suite de la phrase : avant le point final
            base = res.rstrip(); fin = "." if base.endswith(".") else ""; base = base.rstrip(". ")
            sep = " " if txt[:1] in "(" or re.match(r"^(ou|et|ni) ", txt) else ("" if txt[:1] in ",;" else ", ")
            res = base + sep + txt.rstrip(".") + fin
        else: res = res.rstrip() + " " + txt
    if "\x01" in res: return None, False
    res = re.sub(r"\[(?:VÉRIFIÉ|VERIFIÉ|À VÉRIFIER|A VÉRIFIER|NOTE|Note)[^\]]*\]", "", res)
    res = re.sub(r"\bÀ VÉRIFIER\b\s*:?", "", res)
    for _ in range(2): res = re.sub(r"\s*\[[^\[\]]*\]", "", res)   # aucun crochet dans le texte du patient
    res = re.sub(r"\s*\((?=[^()]*(?:\bet al\.|\bet coll\.|PMID|doi:))[^()]*\)\.?", "", res)   # parenthèse qui cite une étude
    res = re.sub(r"\s*\((?:déplacé|déplacée|déplacés)[^()]*\)", "", res)   # « (déplacé ici) »
    res = norm(res)
    if res.startswith("«") and res.endswith("»") and res.count("«") == 1: res = res[1:-1].strip()
    return norm(res).replace(" .", ".").replace(" ,", ",").replace("( ", "(").replace(" )", ")"), revenir

def apparier(item, liste):
    best = max(liste, key=lambda x: proche(item, x), default=None)
    return (best, proche(item, best)) if best else (None, 0)

# ---------- Intégration ----------
# Texte de base, sans les corrections déjà retenues (node produire-fiches.mjs --sans-revues) : sinon une seconde passe ne verrait plus rien.
v2 = {x["code"]: x for x in json.load(open(B + f".cache/textes-base/{REGION}.json", encoding="utf8"))}
oe = fiches(lire_reponses())
revues, J = {}, [f"# Intégration de la révision d'OpenEvidence : {REGION}", "",
                 "Règles : on garde ce qui rend la fiche plus juste ou plus sûre (signes d'alarme, erreurs, cohérence, conseils pratiques) ; on écarte les nuances ajoutées seulement parce qu'aucune étude ne le prouve, les statistiques dans le texte du patient et le délai d'une heure (la règle de douleur reste « le lendemain matin »).", ""]
for code in sorted(v2):
    f = v2[code]
    if code not in oe: J += [f"## {code} · {f['cle']} : pas de réponse d'OpenEvidence", ""]; continue
    ident, corps = oe[code]
    S = sections(lignes(corps)); journal, rv = [], {}
    # Titre
    for l in S.get("titre", []):
        if l.startswith("Titre :") and "[MODIFI" in l:
            t, _ = resoudre(code, "titre", l[len("Titre :"):].strip(), journal)
            if t and t != f["titre"] and any(d == "oui" for s, d, _, _ in journal if s == "titre"): rv["titre"] = t
    # Rubriques en liste ou en paragraphe
    urg_s, med_s = None, None
    for k in ["en_bref", "ce_que_vous_avez", "pourquoi", "soulager", "ce_qui_aide", "a_eviter", "regle_de_douleur", "urgence", "medecin", "duree_habituelle"]:
        if k not in S: continue
        brut = S[k]
        if k in PARAGRAPHES: brut = [" ".join(brut)]
        actuel = f[k] if isinstance(f[k], list) else [f[k]]
        sortie = []
        for l in brut:
            if re.match(r"^\[(MODIFI[ÉE]\s*:\s*rubrique|NOTE)", l) and not marqueurs(l)[-1][2] and norm(re.sub(r"\[[^\]]*\]", "", l)) == "":
                journal.append((k, "oui", "note", analyser(l[1:-1]))); continue
            t, revenir = resoudre(code, k, l, journal)
            if t is None or not t: continue
            if "[MODIFI" not in l and "[AJOUT" not in l:   # ligne sans marqueur : on garde le texte actuel le plus proche
                b, r = apparier(t, actuel)
                if r >= 0.6: t = b
                elif any(re.search(r"\[MODIFI[^\]]*\bpuces?\b", x) for x in brut):   # autre moitié d'une puce scindée
                    journal.append((k, "oui", "puce séparée (mise en forme)", {"type": "silence", "nouveau": t}))
                else: journal.append((k, "revoir", "ligne nouvelle sans marqueur", {"type": "silence", "nouveau": t}))
            elif revenir:
                b, r = apparier(t, actuel)
                if b and r >= 0.4: t = b
            sortie.append(t)
        if k == "regle_de_douleur":
            t = sortie[0] if sortie else f[k]
            t = re.sub(r"\s*\(dans les 24 heures\)", "", t)
            if "lendemain" in t and "l'heure qui suit" not in t and "heure" not in t.replace("heures", ""): sortie = [t]
            else: sortie = [f[k]]
            if cle(sortie[0]) != cle(f[k]): journal.append((k, "oui", "règle de douleur (lendemain matin)", {"type": "remplace", "ancien": f[k], "nouveau": sortie[0], "raison": "variante du lendemain"}))
        if k == "urgence": urg_s = sortie; continue
        if k == "medecin": med_s = sortie; continue
        if k in PARAGRAPHES and not sortie: continue
        val = sortie[0] if k in PARAGRAPHES else sortie
        if (k in PARAGRAPHES and cle(val) != cle(f[k])) or (k not in PARAGRAPHES and [cle(x) for x in val] != [cle(x) for x in f[k]]): rv[k] = val
    # Signes : « Urgence : » enlevé ; « Dans les prochains jours » passe à « Revoyez votre médecin si ».
    if urg_s is not None or med_s is not None:
        urg, med, plus_tard = [], list(med_s if med_s is not None else f["medecin"]), []
        for s in (urg_s if urg_s is not None else f["urgence"]):
            s = re.sub(r"^Urgence\s*(,\s*tout de suite\s*)?(\([^)]*\))?\s*:\s*", "", s); s = re.sub(r"\s*\(urgence\)\s*\.?$", ".", s)
            s = s[0].upper() + s[1:] if s else s
            if re.match(r"^(Dans les prochains jours|Rapidement \(dans les jours)", s, re.I):
                s = re.sub(r"^(Dans les prochains jours\s*:\s*)(\w)", lambda m: m.group(1) + m.group(2).lower(), s); plus_tard.append(s)
            else: urg.append(s)
        med = plus_tard + med
        if [cle(x) for x in urg] != [cle(x) for x in f["urgence"]]: rv["urgence"] = urg
        if [cle(x) for x in med] != [cle(x) for x in f["medecin"]]: rv["medecin"] = med
    # Exercices
    exr = {}
    for e in S.get("exercices", []):
        n = e["no"]
        if n > len(f["exercices"]): journal.append(("exercices", "revoir", f"exercice {n} ajouté", {"type": "silence", "nouveau": e.get("nom", "")})); continue
        cur = f["exercices"][n - 1]; ch = {}
        for _, c in CHAMPS:
            if c not in e or ("[MODIFI" not in e[c] and "[AJOUT" not in e[c]): continue
            t, revenir = resoudre(code, f"exercice {n} : {c}", e[c], journal)
            if t and not revenir and cle(t) != cle(cur.get(c, "")): ch[c] = t
        if ch: exr[str(n)] = ch
    if exr: rv["exercices"] = exr
    # Références : on garde le format court ; on complète le PMID ou le DOI manquant.
    if "references" in S:
        refs = [dict(r) for r in f["references"]]; chg = False
        for l in S["references"]:
            pm = re.search(r"PMID ?:? ?(\d{6,9})", l); doi = re.search(r"(?:DOI ?:? ?|doi:\s?)(10\.\d{4,9}/[^\s;)\]]+)", l)
            for r in refs:
                nom = r["texte"].split()[0].rstrip(",")
                if nom and nom in l and re.search(r"vérifier|^$", r.get("doi_ou_pmid", "") or "", re.I) and (pm or doi):
                    r["doi_ou_pmid"] = f"PMID: {pm.group(1)}" if pm else f"doi:{doi.group(1).rstrip('.')}"; chg = True
        if chg: rv["references"] = refs; journal.append(("references", "oui", "PMID ou DOI complété", {"type": "note"}))
    for chemin, val in DECISIONS.get("_retouches", {}).get(code, {}).items():
        p = chemin.split(".")
        if p[0] == "exercices": rv.setdefault("exercices", {}).setdefault(p[1], {})[p[2]] = val
        else: rv[p[0]] = val
        journal.append((p[0], "oui", "retouche manuelle", {"type": "remplace", "ancien": "", "nouveau": json.dumps(val, ensure_ascii=False)}))
    if rv: revues[f["cle"].split("/")[1] if not (REGION == "pied" and f["cle"] == "pied/sever") else "sever"] = {**rv, "_source": f"OpenEvidence, 26 novembre 2026 ({code})"}
    # Journal lisible
    J += [f"## {code} · {f['titre']}", ""]
    for s, d, pq, ch in journal:
        if ch.get("type") == "note" and pq == "note": continue
        sym = {"oui": "retenu", "non": "écarté", "revoir": "À REVOIR"}[d]
        if ch.get("type") == "remplace": txt = f"« {norm(ch['ancien'])[:140]} » → « {norm(ch['nouveau'])[:220]} »"
        elif ch.get("type") == "ajout": txt = "ajout : " + " ; ".join(f"« {a} »" for a, _ in ch["ajouts"])
        else: txt = norm(ch.get("nouveau", ""))[:220]
        J.append(f"- **{sym}** ({s} ; {pq}) : {txt}" + (f" — {norm(ch.get('raison',''))[:160]}" if ch.get("raison") else ""))
    J.append("")

print("\n".join(J) if not ECRIRE else f"{REGION} : {len(revues)} fiches modifiées ; {sum(1 for l in J if 'À REVOIR' in l)} à revoir")
if ECRIRE:
    os.makedirs(B + "revues", exist_ok=True); os.makedirs(B + "revision/integration", exist_ok=True)
    open(B + f"revues/{REGION}.json", "w", encoding="utf8").write(json.dumps(revues, ensure_ascii=False, indent=1) + "\n")
    open(B + f"revision/integration/{REGION}.md", "w", encoding="utf8").write("\n".join(J) + "\n")
