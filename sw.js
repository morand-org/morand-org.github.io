/* Morand, accueil : hors ligne pour la page couverture et la page de confidentialité seulement.
   Les autres sections (/wealth/, /guides/, /map/) ne passent pas par ici ; leurs caches ne sont jamais touchés. */
const CACHE = "morand-accueil-v2";
const FICHIERS = ["/", "/confidentialite/", "/manifest.webmanifest", "/morand/accueil.css", "/morand/accueil.js", "/morand/inter.woff2",
  "/morand/newsreader.woff2", "/morand/sceau-wealth.svg", "/morand/sceau-guide.svg", "/morand/sceau-map.svg", "/morand/icone.svg"];
const A_MOI = u => u.origin === self.location.origin && (u.pathname === "/" || u.pathname === "/index.html" || u.pathname === "/manifest.webmanifest"
  || u.pathname.startsWith("/morand/") || u.pathname.startsWith("/confidentialite/"));
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(cles => Promise.all(cles.filter(k => k.startsWith("morand-accueil-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || !A_MOI(u)) return;   // les autres sections : le réseau, sans intervention
  e.respondWith(fetch(r, { cache: "no-cache" }).then(rep => {
    if (rep.ok) { const copie = rep.clone(); caches.open(CACHE).then(c => c.put(r, copie)); }
    return rep;
  }).catch(() => caches.match(r, { ignoreSearch: true }).then(x => x || caches.match("/"))));
});
