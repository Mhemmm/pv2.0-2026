document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".dropdown").forEach(dropdown => {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");
        const closeBtn = dropdown.querySelector(".close-btn");

        // SAFETY CHECK
        if (!toggle || !menu) return;

        // Toggle dropdown
        toggle.addEventListener("click", (e) => {
            e.preventDefault();

            // Close others
            document.querySelectorAll(".dropdown-menu").forEach(other => {
                if (other !== menu) other.style.display = "none";
            });

            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });

        // Close button ▲
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                menu.style.display = "none";
            });
        }
    });

    // Click outside closes all
    document.addEventListener("click", (e) => {
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                const menu = dropdown.querySelector(".dropdown-menu");
                if (menu) menu.style.display = "none";
            }
        });
    });

});
