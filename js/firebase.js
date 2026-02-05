// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG 🔥 */
const firebaseConfig = {
  apiKey: "Your api key ",
  authDomain: "Your auth domain",
  projectId: "Your project id",
  storageBucket: "Your storage bucket ",
  messagingSenderId: "Your messaging sender id",
  appId: "Your app id"
};
/* ✅ EXPORT BOTH */
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
