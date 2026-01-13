console.log("JS LOADED");
console.log("Dropdowns found:", document.querySelectorAll(".dropdown"));

document.addEventListener("DOMContentLoaded", () => {

    const dropdowns = document.querySelectorAll(".dropdown");
    console.log("Dropdowns found:", dropdowns);

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");
        const closeBtn = dropdown.querySelector(".close-btn");

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();

            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove("open");
                    d.querySelector(".dropdown-menu").style.display = "none";
                }
            });

            const isOpen = dropdown.classList.contains("open");

            dropdown.classList.toggle("open", !isOpen);
            menu.style.display = isOpen ? "none" : "block";
        });

        closeBtn.addEventListener("click", () => {
            dropdown.classList.remove("open");
            menu.style.display = "none";
        });
    });

    document.addEventListener("click", () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("open");
            dropdown.querySelector(".dropdown-menu").style.display = "none";
        });
    });

});

