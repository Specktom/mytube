const user = localStorage.getItem("user");

const protectedPages = [
  "/index.html",
  "/upload.html",
  "/watch.html"
];

const current = location.pathname;

if (protectedPages.some(p => current.endsWith(p))) {
  if (!user) {
    location.href = "login.html";
  }
}
