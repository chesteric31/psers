importScripts('https://cdnjs.cloudflare.com/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js');

toolbox.precache(['index.html', 'latest.html', './css/style.css', './images/push-off.png', './images/push-on.png']);
toolbox.router.get('/images*', toolbox.cacheFirst);

/*toolbox.router.get('/', toolbox.cacheFirst, {
    cache: {
        name: 'pwa-sers-cache',
    }
})*/
self.toolbox.router.get('/(.*)', function(req, vals, opts) {
  return toolbox.networkFirst(req, vals, opts)
    .catch(function(error) {
      if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
        return toolbox.cacheOnly(new Request('/index.html'), vals, opts);
      }
      throw error;
    });
});

self.addEventListener('push', function(event) {

  console.info('Event: Push');

  var title = 'New Update for PSERS';

  var body = {
    'body': 'Click to see the latest episodes',
    'tag': 'psers',
    'icon': './images/icons/icon-72x72.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, body)
  );
});

self.addEventListener('notificationclick', function(event) {

  var url = './latest.html';

  event.notification.close(); //Close the notification

  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    clients.openWindow(url)
  );

});