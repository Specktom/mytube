import { app } from "./firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

/* ================= REGISTER ================= */
window.register = async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  const fakeEmail = `${username}@mytube.local`;

  try {
    await createUserWithEmailAndPassword(auth, fakeEmail, password);

    await setDoc(doc(db, "users", username), {
      displayName: username,
      bio: "Welcome to my channel!",
      created: new Date()
    });

    localStorage.setItem("user", username);
    location.href = "index.html";

  } catch (err) {
    alert(err.message);
  }
};

/* ================= LOGIN ================= */
window.login = async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  const fakeEmail = `${username}@mytube.local`;

  try {
    await signInWithEmailAndPassword(auth, fakeEmail, password);

    const ref = doc(db, "users", username);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        displayName: username,
        bio: "Welcome to my channel!",
        created: new Date()
      });
    }

    localStorage.setItem("user", username);
    location.href = "index.html";

  } catch {
    alert("Invalid login");
  }
};

/* ================= LOGOUT (🔥 FIX) ================= */
window.logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn("Auth signout error (ignored)");
  }

  localStorage.removeItem("user");
  location.href = "login.html";
};
