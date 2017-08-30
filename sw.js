(global => {
  'use strict';

  importScripts('https://cdnjs.cloudflare.com/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js');

  toolbox.precache(['index.html', 'latest.html', './css/style.css', './images/push-off.png', './images/push-on.png']);
  toolbox.router.get('/images*', toolbox.cacheFirst);
  toolbox.options.debug = true;

  toolbox.router.get('/', toolbox.cacheFirst, {
      cache: {
          name: 'pwa-sers-cache',
      },
      networkTimeoutSeconds: 5
  })
 // Ensure that our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
/*self.toolbox.router.get('/(.*)', function(req, vals, opts) {
  return toolbox.networkFirst(req, vals, opts)
    .catch(function(error) {
      if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
        return toolbox.cacheOnly(new Request('/index.html'), vals, opts);
      }
      throw error;
    });
});*/
this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              var cachedFile = getFilenameFromUrl(event.request.url);
              // Return the offline page
              return caches.match(cachedFile);
          })
    );
  }
});

this.addEventListener('push', function(event) {

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

this.addEventListener('notificationclick', function(event) {

  var url = './latest.html';

  event.notification.close(); //Close the notification

  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    clients.openWindow(url)
  );
});

function getFilenameFromUrl(path){
    path = path.substring(path.lastIndexOf("/")+ 1);
    return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
}
