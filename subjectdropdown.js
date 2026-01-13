console.log("JS LOADED");


const btn = document.getElementById("subjectsBtn");
const menu = document.getElementById("subjectsMenu");
const closeBtn = menu.querySelector(".close-btn");

btn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

closeBtn.addEventListener("click", () => {
    menu.style.display = "none";
});

document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
    }
});
