// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG 🔥 */
const firebaseConfig = {
  apiKey: "AIzaSyDJSWhP3DjPm0eyfZw6kXvXK5iwKn1VfLo",
  authDomain: "mytube-1b96e.firebaseapp.com",
  projectId: "mytube-1b96e",
  storageBucket: "mytube-1b96e.appspot.com",
  messagingSenderId: "172386030935",
  appId: "1:172386030935:web:2a62ababc3aef2600b5a12"
};
/* ✅ EXPORT BOTH */
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
