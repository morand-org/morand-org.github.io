/* Morand : page couverture installable et utilisable hors ligne. Le service worker de l'accueil ne garde que
   les fichiers de l'accueil ; Wealth Morand et Guide Morand ont chacun le leur. */
if ("serviceWorker" in navigator) addEventListener("load", () => { navigator.serviceWorker.register("/sw.js").catch(() => {}); });

/* « Installer l'app » : une seule app pour l'accueil, Wealth, Guide et Map (portée « / »). Le bouton est sous
   l'introduction, et seulement là où l'installation est possible : Chrome et Edge l'installent d'un toucher ; sur
   iPhone, iPad et Safari sur Mac, la marche à suivre s'affiche. Rien n'est montré dans l'app déjà installée. */
(() => {
  const ligne = document.getElementById("installer-ligne"), bouton = document.getElementById("installer"), aide = document.getElementById("installer-aide");
  if (!ligne || !bouton || !aide) return;
  const installee = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (installee) return;
  let invite = null;
  const ua = navigator.userAgent, tactile = navigator.maxTouchPoints > 1;
  const ios = /iP(hone|ad|od)/.test(ua) || (navigator.platform === "MacIntel" && tactile);
  // Safari sur Mac (macOS 14 et plus) : « Ajouter au Dock », dans le menu Fichier.
  const safariMac = !ios && /Macintosh/.test(ua) && /Safari\//.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua);
  const montrer = () => { ligne.hidden = false; };
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); invite = e; montrer(); });
  addEventListener("appinstalled", () => { invite = null; ligne.hidden = true; });
  if (ios || safariMac) {
    if (safariMac) {
      const etapes = document.getElementById("installer-etapes"), b = t => { const s = document.createElement("strong"); s.textContent = t; return s; };
      etapes.replaceChildren("Dans Safari, ouvrez le menu ", b("Fichier"), ", puis ", b("Ajouter au Dock"), ".");
    }
    montrer();
  }
  bouton.addEventListener("click", async () => {
    if (invite) {
      invite.prompt();
      const choix = await invite.userChoice.catch(() => null);
      invite = null;
      if (choix && choix.outcome === "accepted") ligne.hidden = true;
      return;
    }
    aide.hidden = false; document.getElementById("installer-fermer").focus();
  });
  document.getElementById("installer-fermer").addEventListener("click", () => { aide.hidden = true; bouton.focus(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !aide.hidden) { aide.hidden = true; bouton.focus(); } });
})();

/* Écran d'ouverture (une fois par session, voir demarrage.js) : le sceau Morand, au centre le lion, la balance, le cerf,
   la boussole et la chouette, puis le cèdre de Morand. Un seul dessin au centre à la fois. Les images ne sont chargées
   que si l'écran joue. Sans JavaScript, ou si une image tarde, le voile s'efface seul (accueil.css). */
(() => {
  const html = document.documentElement;
  if (!html.classList.contains("avec-ouverture")) return;
  const SUITE = ["lion", "balance", "cerf", "boussole", "chouette", "cedre"];
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ecran = document.createElement("div"); ecran.className = "ouverture"; ecran.setAttribute("aria-hidden", "true");
  const sceau = document.createElement("div"); sceau.className = "ouv-sceau";
  const image = src => { const i = new Image(); i.alt = ""; i.decoding = "async"; i.src = src; return i; };
  const cadre = image("/morand/ouverture-cadre.svg"); cadre.className = "ouv-cadre";
  const motifs = SUITE.map(k => { const i = image(`/morand/ouverture-${k}.svg`); i.className = "ouv-motif"; i.hidden = true; return i; });
  sceau.append(cadre, ...motifs); ecran.appendChild(sceau); document.body.appendChild(ecran);
  const fin = () => { ecran.classList.add("sort"); setTimeout(() => { ecran.remove(); html.classList.remove("avec-ouverture"); }, 420); };
  const pret = Promise.all([cadre, ...motifs].map(i => (i.decode ? i.decode() : Promise.resolve()).catch(() => {})));
  Promise.race([pret, new Promise(r => setTimeout(r, 1200))]).then(() => {
    ecran.classList.add("joue");
    if (reduit) { motifs[motifs.length - 1].hidden = false; setTimeout(fin, 600); return; }
    let i = 0;
    const montrer = () => {
      motifs.forEach((m, k) => { m.hidden = k !== i; });
      if (i < motifs.length - 1) { i += 1; setTimeout(montrer, 150); } else setTimeout(fin, 520);
    };
    setTimeout(montrer, 200);
  });
})();
