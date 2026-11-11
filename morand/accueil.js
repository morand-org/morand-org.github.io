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
