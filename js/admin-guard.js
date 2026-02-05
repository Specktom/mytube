import { app } from "./firebase.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(app);

const username = localStorage.getItem("user");

if (!username) {
  location.href = "login.html";
}

const userRef = doc(db, "users", username);
const snap = await getDoc(userRef);

if (!snap.exists() || snap.data().role !== "admin") {
  alert("Access denied");
  location.href = "index.html";
}

