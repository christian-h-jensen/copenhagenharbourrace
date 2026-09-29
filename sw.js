// Offline support: always try the network first (so edits show up straight away),
// fall back to the cached copy when there is no signal, e.g. out on the water.
// Bump VERSION when files are added or removed from PRECACHE.
var VERSION = "chr-v1";
var PAGES = ["index", "course", "classes", "prizes", "rules", "safety", "party", "addresses"];
var PRECACHE = ["./", "index.html", "css/style.css", "js/site.js", "manifest.webmanifest",
  "img/course-map.jpg", "img/icon-192.png", "img/logo-kr.png", "img/logo-bryggens.png"]
  .concat(PAGES.map(function (p) { return "da/" + p + ".html"; }))
  .concat(PAGES.map(function (p) { return "en/" + p + ".html"; }));

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(VERSION).then(function (cache) { return cache.addAll(PRECACHE); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(VERSION).then(function (cache) { cache.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true });
    })
  );
});
