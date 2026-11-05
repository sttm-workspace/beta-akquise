const C = "beta-akquise-v9";
const FILES = ["./", "./index.html", "./manifest.json", "./icon.svg", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./bg.jpg", "./screenshots/01-heute.png", "./screenshots/02-ziele.png", "./screenshots/03-woche.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(C).then(c => c.addAll(FILES.map(f => new Request(f, {cache: "reload"})))).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())));
// Online: immer frische Version holen (umgeht den 10-Minuten-Cache von GitHub Pages). Offline: aus dem Cache.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request, {cache: "no-cache"}).then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});

