import { app } from "./firebase.js";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(app);

// get username from URL
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  alert("Channel not found");
  location.href = "index.html";
}

// DOM
const avatarEl = document.getElementById("avatar");
const nameEl = document.getElementById("channelName");
const bioEl = document.getElementById("channelBio");
const videosEl = document.getElementById("channelVideos");

/* LOAD USER */
const userRef = doc(db, "users", username);
const snap = await getDoc(userRef);

if (!snap.exists()) {
  alert("Channel not found");
  location.href = "index.html";
}

const user = snap.data();

// text
nameEl.textContent = user.displayName || username;
bioEl.textContent = user.bio || "";

// 🔥 PROFILE PICTURE
avatarEl.src = user.avatar
  ? user.avatar
  : "https://placehold.co/80x80";

/* LOAD VIDEOS */
const q = query(
  collection(db, "videos"),
  where("user", "==", username)
);

const vids = await getDocs(q);

videosEl.innerHTML = "";

vids.forEach(docu => {
  const v = docu.data();

  videosEl.innerHTML += `
    <div class="video-card">
      <video src="${v.url}" controls></video>
      <h4>${v.title}</h4>
    </div>
  `;
});
