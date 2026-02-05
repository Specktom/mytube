import { app } from "./firebase.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(app);
const username = localStorage.getItem("user");

if (!username) location.href = "login.html";

const userRef = doc(db, "users", username);

/* LOAD EXISTING DATA */
const snap = await getDoc(userRef);
if (snap.exists()) {
  const u = snap.data();
  document.getElementById("avatar").value = u.avatar || "";
  document.getElementById("banner").value = u.banner || "";
  document.getElementById("bio").value = u.bio || "";
}

/* SAVE PROFILE */
window.saveProfile = async () => {
  const avatar = document.getElementById("avatar").value.trim();
  const banner = document.getElementById("banner").value.trim();
  const bio = document.getElementById("bio").value.trim();

  await updateDoc(userRef, {
    avatar,
    banner,
    bio
  });

  alert("Profile updated!");
  location.href = "channel.html?user=" + username;
};
