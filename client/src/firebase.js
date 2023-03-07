// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDnkxjgV9IBcTduYGu-GGI6vdQ1FggopQc",
  authDomain: "fir-auth-1-af4e9.firebaseapp.com",
  projectId: "fir-auth-1-af4e9",
  storageBucket: "fir-auth-1-af4e9.appspot.com",
  messagingSenderId: "611308328877",
  appId: "1:611308328877:web:316aba2fa264bfb507f324",
  measurementId: "G-EZ80GZGYTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export{app, auth};
