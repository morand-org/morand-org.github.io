/* Morand, accueil : avant l'affichage, l'écran d'ouverture une fois par session (le sceau Morand et les logos des outils).
   Chargé dans <head>, sans defer, pour couvrir la page avant qu'elle ne s'affiche. */
try { if (!sessionStorage.getItem("morand.ouverture")) { document.documentElement.classList.add("avec-ouverture"); sessionStorage.setItem("morand.ouverture", "1"); } } catch (e) { /* stockage indisponible : pas d'ouverture */ }
