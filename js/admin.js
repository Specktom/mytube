import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(app);

window.logout = () => {
  localStorage.clear();
  location.href = "login.html";
};

const usersDiv = document.getElementById("adminUsers");
const snap = await getDocs(collection(db, "users"));

usersDiv.innerHTML = "";

snap.forEach(udoc => {
  const u = udoc.data();

  const div = document.createElement("div");
  div.style.border = "1px solid #444";
  div.style.padding = "10px";
  div.style.marginBottom = "10px";

  div.innerHTML = `
    <strong>${udoc.id}</strong><br>
    Role: ${u.role || "user"}<br>
    Status: ${u.banned ? "🚫 Banned" : "✅ Active"}<br><br>
    <button>${u.banned ? "Unban" : "Ban"}</button>
  `;

  div.querySelector("button").onclick = async () => {
    await updateDoc(doc(db, "users", udoc.id), {
      banned: !u.banned
    });
    location.reload();
  };

  usersDiv.appendChild(div);
});
