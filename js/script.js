// DARK MODE
const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}

if (toggle) {
  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "dark",
      document.body.classList.contains("dark")
    );
  };
}

// SEARCH
const search = document.getElementById("searchInput");
if (search) {
  search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    document.querySelectorAll(".video-card").forEach(card => {
      card.style.display =
        card.dataset.title.includes(value) ? "block" : "none";
    });
  });
}

// LOGIN DISPLAY
const user = localStorage.getItem("user");
const userName = document.getElementById("userName");
if (user && userName) {
  userName.textContent = "👤 " + user;
}
