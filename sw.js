// Replaces the offline worker of the old address: it clears the old cached app and sends any
// open window to the new address, so installed home-screen copies move over by themselves.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) {
      client.navigate('https://csymvoul.github.io/expensiarmus/' + new URL(client.url).hash);
    }
  })());
});
