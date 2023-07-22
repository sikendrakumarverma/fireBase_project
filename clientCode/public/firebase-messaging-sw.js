importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = { apiKey: "AIzaSyCLRkdbI0jH-06Y2SuG_P9a7HLOcZ1I08U",
authDomain: "fir-c6c3c.firebaseapp.com",
projectId: "fir-c6c3c",
storageBucket: "fir-c6c3c.appspot.com",
messagingSenderId: "336613732186",
appId: "1:336613732186:web:960ac8e9073faec3a74d63",
measurementId: "G-62WXD6S7FX"};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});