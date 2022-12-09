const cacheName = "cacheStore-v2"

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request)
    })
  )
})

const cacheStores = [
  "https://athultony97.github.io/pwa-lab05/",
  "https://athultony97.github.io/pwa-lab05/index.html",
  "https://athultony97.github.io/pwa-lab05/main.js",
  "https://athultony97.github.io/pwa-lab05/manifest.json",
  "https://athultony97.github.io/pwa-lab05/service-worker.js",
  "https://athultony97.github.io/pwa-lab05/style.css"
]

// install event
self.addEventListener("install", function (event) {
    self.skipWaiting()
    caches
      .open(cacheName)
      .then(function (cache) {
        console.log("[Service Worker] Installing...")
        return cache.addAll(cacheStores)
      })
      .catch(err => {
        console.log("something went wrong", err)
      })
  })

  self.addEventListener("activate", function (event) {
    console.log("[Service worker] activated", event)
    event.waitUntil(clients.claim())
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.filter(cache => cache !== cacheName).map(cacheName => caches.delete(cacheName)))
      })
    )
  })


self.addEventListener("notificationclick", (event) => {
    const action = event.action;
    const notification = event.notification;
    const notificationData = notification.data;
    console.log("Data:", action);
    const options = {
      includeUncontrolled: true,
      type: "all",
    };
  
    switch (action) {
      case "agree":
        clients.matchAll(options).then((clients) => {
          clients.forEach((client) => {
            client.postMessage("So we both agree on that!");
          });
        });
        break;
  
      case "disagree":
        clients.matchAll(options).then((clients) => {
          clients.forEach((clients) => {
            clients.postMessage("Let's agree to disagree.");
          });
        });
        break;
  
      case "":
        console.log("Clicked on the notification.");
        const openPromise = clients.openWindow("/index.html");
        event.waitUntil(openPromise);
        break;
    }
  });