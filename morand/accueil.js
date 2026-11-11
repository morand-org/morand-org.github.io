/* Morand : page couverture installable et utilisable hors ligne. Le service worker de l'accueil ne garde que
   les fichiers de l'accueil ; Wealth Morand et Guide Morand ont chacun le leur. */
if ("serviceWorker" in navigator) addEventListener("load", () => { navigator.serviceWorker.register("/sw.js").catch(() => {}); });
