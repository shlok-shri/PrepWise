// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK15yluKBUIrHE4GIKT9z29g3EsQR5TLE",
  authDomain: "prepwise-1670c.firebaseapp.com",
  projectId: "prepwise-1670c",
  storageBucket: "prepwise-1670c.firebasestorage.app",
  messagingSenderId: "1035475301540",
  appId: "1:1035475301540:web:ca6fe842aa630963a0e231",
  measurementId: "G-294Q60MD1N"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);