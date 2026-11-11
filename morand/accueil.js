/* Morand : page couverture installable et utilisable hors ligne. Le service worker de l'accueil ne garde que
   les fichiers de l'accueil ; Wealth Morand et Guide Morand ont chacun le leur. */
if ("serviceWorker" in navigator) addEventListener("load", () => { navigator.serviceWorker.register("/sw.js").catch(() => {}); });

/* « Installer l'app » : une seule app pour l'accueil, Wealth, Guide et Map (portée « / »). Chrome et Edge proposent
   l'installation ; sur iPhone et iPad, Safari ne le permet pas d'un bouton : la marche à suivre s'affiche. Rien n'est
   montré si l'app est déjà ouverte comme app installée. */
(() => {
  const bouton = document.getElementById("installer"), aide = document.getElementById("installer-aide");
  if (!bouton || !aide) return;
  const installee = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (installee) return;
  let invite = null;
  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); invite = e; bouton.hidden = false; });
  addEventListener("appinstalled", () => { invite = null; bouton.hidden = true; });
  if (ios) bouton.hidden = false;
  bouton.addEventListener("click", async () => {
    if (invite) { invite.prompt(); await invite.userChoice.catch(() => null); invite = null; bouton.hidden = true; return; }
    aide.hidden = false; document.getElementById("installer-fermer").focus();
  });
  document.getElementById("installer-fermer").addEventListener("click", () => { aide.hidden = true; bouton.focus(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !aide.hidden) { aide.hidden = true; bouton.focus(); } });
})();
