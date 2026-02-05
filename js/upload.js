import { app } from "./firebase.js";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(app);
const user = localStorage.getItem("user");

const snap = await getDoc(doc(db, "users", user));
if (snap.exists() && snap.data().banned) {
  alert("You are banned from uploading");
  location.href = "index.html";
}

window.upload = async () => {
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;

  if (!title || !url) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "videos"), {
    title,
    url,
    user,
    created: serverTimestamp(),
    views: 0,
    likes: []
  });

  location.href = "index.html";
};
