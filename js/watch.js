import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const params = new URLSearchParams(location.search);
const videoId = params.get("id");

const user = localStorage.getItem("user");
if (!user) location.href = "login.html";

const videoRef = doc(db, "videos", videoId);

/* ---------- LOAD VIDEO ---------- */
const snap = await getDoc(videoRef);
if (!snap.exists()) {
  alert("Video not found");
  location.href = "index.html";
}

const v = snap.data();

document.getElementById("title").innerText = v.title;
document.getElementById("video").src = v.url;
document.getElementById("views").innerText = v.views || 0;

await updateDoc(videoRef, {
  views: increment(1)
});

/* ---------- LIKES ---------- */
const likeBtn = document.getElementById("likeBtn");

function updateLikeUI(likes = []) {
  likeBtn.innerText = `👍 ${likes.length}`;
  likeBtn.style.background = likes.includes(user) ? "red" : "";
}

updateLikeUI(v.likes || []);

likeBtn.onclick = async () => {
  const hasLiked = (v.likes || []).includes(user);

  await updateDoc(videoRef, {
    likes: hasLiked ? arrayRemove(user) : arrayUnion(user)
  });
};

/* ---------- REALTIME UPDATES ---------- */
onSnapshot(videoRef, snap => {
  const data = snap.data();
  updateLikeUI(data.likes || []);
  document.getElementById("views").innerText = data.views || 0;
});

/* ---------- COMMENTS ---------- */
const commentsDiv = document.getElementById("comments");
const commentInput = document.getElementById("commentText");

document.getElementById("commentBtn").onclick = async () => {
  const text = commentInput.value.trim();
  if (!text) return;

  await addDoc(collection(videoRef, "comments"), {
    user,
    text,
    created: new Date()
  });

  commentInput.value = "";
};

const commentsQuery = query(
  collection(videoRef, "comments"),
  orderBy("created", "desc")
);

onSnapshot(commentsQuery, snap => {
  commentsDiv.innerHTML = "";
  snap.forEach(doc => {
    const c = doc.data();
    commentsDiv.innerHTML += `
      <div class="comment">
        <b>${c.user}</b>
        <p>${c.text}</p>
      </div>
    `;
  });
});
