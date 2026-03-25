const CACHE_NAME = "lectio-v1";

self.addEventListener("install", event => {
    console.log("Service Worker installed");
    self.skipWaiting(); // 🔥 force activation immédiate
});

self.addEventListener("activate", event => {
    console.log("Service Worker activated");

    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );

    self.clients.claim(); // 🔥 prend le contrôle direct
});

self.addEventListener("fetch", event => {
    event.respondWith(fetch(event.request));
});