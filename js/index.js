import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(app);
const username = localStorage.getItem("user");

if (!username) location.href = "login.html";

document.getElementById("user").innerText = "👤 " + username;

window.logout = () => {
  localStorage.clear();
  location.href = "login.html";
};

/* ADMIN BUTTON */
const userSnap = await getDoc(doc(db, "users", username));
if (userSnap.exists() && userSnap.data().role === "admin") {
  document.getElementById("adminBtn").style.display = "inline";
}

/* LOAD VIDEOS */
const videosDiv = document.getElementById("videos");
const searchInput = document.getElementById("searchInput");

const snap = await getDocs(collection(db, "videos"));
let videos = [];

snap.forEach(d => videos.push({ id: d.id, ...d.data() }));

function render(list) {
  videosDiv.innerHTML = "";
  list.forEach(v => {
    videosDiv.innerHTML += `
      <div class="video-card">
        <a href="watch.html?id=${v.id}">
          <video src="${v.url}" muted></video>
        </a>
        <h3>${v.title}</h3>
        <a href="channel.html?user=${v.user}">👤 ${v.user}</a>
      </div>
    `;
  });
}

render(videos);

searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  render(
    videos.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.user.toLowerCase().includes(q)
    )
  );
};
