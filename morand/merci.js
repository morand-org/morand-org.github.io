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

/* Pluie de poussière d'étoiles dorées : elle tombe doucement, en continu, sur toute la page (un canevas par-dessus,
   qui ne bloque aucun clic). Points scintillants et petites étoiles à quatre branches, qui ondulent en tombant.
   En pause quand l'onglet est caché ; rien si l'appareil demande moins d'animations. */
(() => {
  const toile = document.querySelector(".merci-pluie");
  if (!toile || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = toile.getContext("2d"), sombre = matchMedia("(prefers-color-scheme: dark)");
  const hasard = (a, b) => a + Math.random() * (b - a);
  let L = 0, H = 0, grains = [], avant = 0, boucle = 0;
  const grain = (enHaut) => ({ x: hasard(0, L), y: enHaut ? hasard(-40, -6) : hasard(-20, H), vy: hasard(14, 38), r: hasard(0.6, 1.9),
    etoile: Math.random() < 0.22, ampl: hasard(4, 18), freq: hasard(0.4, 1.1), phase: hasard(0, 6.3), scint: hasard(1.5, 4), alpha: hasard(0.45, 0.95) });
  function taille() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    L = innerWidth; H = innerHeight; toile.width = Math.round(L * dpr); toile.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const voulu = Math.min(120, Math.round(L * H / 7000));
    while (grains.length < voulu) grains.push(grain(false));
    grains.length = voulu;
  }
  function dessiner(t) {
    const dt = Math.min(0.05, (t - avant) / 1000 || 0); avant = t;
    ctx.clearRect(0, 0, L, H);
    const [r, v, b] = sombre.matches ? [236, 211, 150] : [176, 132, 52], s = t / 1000;
    for (const g of grains) {
      g.y += g.vy * dt;
      if (g.y > H + 12) Object.assign(g, grain(true));
      const x = g.x + Math.sin(s * g.freq + g.phase) * g.ampl, a = g.alpha * (0.55 + 0.45 * Math.sin(s * g.scint + g.phase));
      ctx.fillStyle = `rgba(${r},${v},${b},${a.toFixed(3)})`;
      if (g.etoile) {   // petite étoile à quatre branches
        const k = g.r * 3.2, m = g.r * 0.7;
        ctx.beginPath(); ctx.moveTo(x, g.y - k); ctx.lineTo(x + m, g.y - m); ctx.lineTo(x + k, g.y); ctx.lineTo(x + m, g.y + m);
        ctx.lineTo(x, g.y + k); ctx.lineTo(x - m, g.y + m); ctx.lineTo(x - k, g.y); ctx.lineTo(x - m, g.y - m); ctx.closePath(); ctx.fill();
      } else { ctx.beginPath(); ctx.arc(x, g.y, g.r, 0, 6.2832); ctx.fill(); }
    }
    boucle = requestAnimationFrame(dessiner);
  }
  taille(); addEventListener("resize", taille);
  document.addEventListener("visibilitychange", () => { cancelAnimationFrame(boucle); if (!document.hidden) { avant = performance.now(); boucle = requestAnimationFrame(dessiner); } });
  boucle = requestAnimationFrame(dessiner);
})();

/* Musique : elle part seule quand le navigateur le permet (Chrome et Edge, après le clic sur « MMXXVI » à l'accueil) ;
   sinon (iPhone, Firefox), au premier toucher ou à la première touche dans la page. Le bouton doré la coupe ou la relance. */
(() => {
  const audio = document.querySelector(".merci-audio"), bouton = document.querySelector(".merci-son");
  if (!audio || !bouton) return;
  const GESTES = ["click", "touchend", "keydown"];
  let attente = false;
  const etat = () => {
    const joue = !audio.paused;
    bouton.classList.toggle("joue", joue); bouton.classList.toggle("invite", attente && !joue);
    bouton.setAttribute("aria-label", joue ? "Couper la musique" : "Jouer la musique");
  };
  const jouer = () => audio.play().then(() => { attente = false; etat(); }).catch(() => { attente = true; etat(); });
  const retirer = () => GESTES.forEach(t => removeEventListener(t, premierGeste, true));
  function premierGeste(e) { if (!attente || e.target.closest(".merci-son")) return; retirer(); jouer(); }
  GESTES.forEach(t => addEventListener(t, premierGeste, true));
  bouton.addEventListener("click", () => { retirer(); attente = false; if (audio.paused) jouer(); else audio.pause(); etat(); });
  ["play", "pause", "ended"].forEach(t => audio.addEventListener(t, etat));
  bouton.hidden = false; etat(); jouer();
})();
