/* Morand : jusqu'aux bords de l'écran (viewport-fit=cover) seulement dans l'app installée, qui n'a pas de barre d'adresse.
   Dans Safari sur iPhone (iOS 26), la barre d'adresse flotte par-dessus le bas de la page quand la page va jusqu'aux bords :
   le pied de page (« Confidentialité », « MMXXVI ») passait dessous. Sans « cover », la page s'arrête au-dessus de la barre.
   Chargé dans <head>, sans defer, avant l'affichage. */
try {
  if (matchMedia("(display-mode: standalone)").matches || navigator.standalone === true) {
    const m = document.querySelector('meta[name="viewport"]');
    if (m && !/viewport-fit/.test(m.content)) m.content += ", viewport-fit=cover";
  }
} catch (e) { /* rien : la page garde ses marges */ }
