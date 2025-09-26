// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhNXh5sC5ARKGnzROxBCdHlxbyDRO_Lnk",
  authDomain: "familybondingapp-f96f2.firebaseapp.com",
  projectId: "familybondingapp-f96f2",
  storageBucket: "familybondingapp-f96f2.firebasestorage.app",
  messagingSenderId: "132397435555",
  appId: "1:132397435555:web:ede0eeac0930236cb64d16",
  measurementId: "G-RC3Y7QDK22",
};

const app = initializeApp(firebaseConfig);
console.log("Firebase App initialized:", app.name); // should print [DEFAULT]

export const auth = getAuth(app);
console.log("Auth registered:", auth);

export const db = getFirestore(app);
