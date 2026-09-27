importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC4X4AzkoqdjBuv5ux5wGLcXTPdrqvm3iU",
  authDomain: "brisbois-bembe.firebaseapp.com",
  projectId: "brisbois-bembe",
  storageBucket: "brisbois-bembe.firebasestorage.app",
  messagingSenderId: "372368865645",
  appId: "1:372368865645:web:553d127d5af6c140b2c264",
  measurementId: "G-YBJ7SB95CE"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  const title = notification.title || "Brisbois Portal";
  const options = {
    body: notification.body || "Du hast eine neue Nachricht.",
    icon: "/Brisbois-Portal/icon-192.png",
    badge: "/Brisbois-Portal/icon-192.png",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow("/Brisbois-Portal/");
      }
    })
  );
});
