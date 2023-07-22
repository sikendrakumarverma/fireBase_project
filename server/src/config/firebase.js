const firebase = require("firebase-admin");
//const { getMessaging } = require("firebase-admin/messaging");

let serviceAccount = require('../../firebase-adminsdk.json');

const firebaseConfig = {
  apiKey: "AIzaSyCLRkdbI0jH-06Y2SuG_P9a7HLOcZ1I08U",
  authDomain: "fir-c6c3c.firebaseapp.com",
  projectId: "fir-c6c3c",
  storageBucket: "fir-c6c3c.appspot.com",
  messagingSenderId: "336613732186",
  appId: "1:336613732186:web:960ac8e9073faec3a74d63",
  measurementId: "G-62WXD6S7FX",
  credential: firebase.credential.cert(serviceAccount),

};

// var FCM = require('fcm-node');

// var serverKey =
//     "AAAATl-971o:APA91bGmLCzWO0xjcTdG1jSmRGxHMRHHGl9ursB8pnLec2nXCoZ318uuKBO8ZOC5rHwT6YUcoaOuaiC8fZx3K_JwOWQL7j732YkWOnY9d7dCG6sZE56sTxU1WEu3rY4YMayHylZjDlRO"

// //firebase push notification send
// var fcm = new FCM(serverKey);

const firebaseAdmin = firebase.initializeApp(firebaseConfig);
//const messaging = getMessaging(firebaseAdmin);

module.exports = { firebaseAdmin };

