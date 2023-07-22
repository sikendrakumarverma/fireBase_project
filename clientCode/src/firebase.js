import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLRkdbI0jH-06Y2SuG_P9a7HLOcZ1I08U",
    authDomain: "fir-c6c3c.firebaseapp.com",
    projectId: "fir-c6c3c",
    storageBucket: "fir-c6c3c.appspot.com",
    messagingSenderId: "336613732186",
    appId: "1:336613732186:web:960ac8e9073faec3a74d63",
    measurementId: "G-62WXD6S7FX"
  };

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const auth = getAuth(app);

export { auth };

