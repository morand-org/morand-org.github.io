/* Morand, remerciements : de la poussière d'or qui scintille autour du portrait. Positions, tailles et rythmes au hasard ;
   rien si l'appareil demande moins d'animations. */
(() => {
  const zone = document.querySelector(".merci-poussiere");
  if (!zone || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const hasard = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < 26; i++) {
    const s = document.createElement("span"), t = hasard(1.6, 3.6).toFixed(1) + "px";
    // Surtout dans l'anneau du médaillon et autour du visage, peu au centre.
    const angle = hasard(0, 2 * Math.PI), rayon = hasard(0.28, 0.5);
    s.style.left = (50 + Math.cos(angle) * rayon * 100).toFixed(1) + "%";
    s.style.top = (48 + Math.sin(angle) * rayon * 92).toFixed(1) + "%";
    s.style.width = s.style.height = t;
    s.style.animationDuration = hasard(2.8, 6).toFixed(1) + "s";
    s.style.animationDelay = hasard(0.8, 6).toFixed(1) + "s";
    zone.append(s);
  }
})();
