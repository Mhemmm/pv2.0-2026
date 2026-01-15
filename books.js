document.addEventListener("DOMContentLoaded", () => {
    const bookshelf = document.getElementById("bookshelf");
    const searchInput = document.getElementById("SearchInput");
    const filterOptions = document.querySelectorAll(".filter-option");

    let activeTheme = "all";

    async function loadBooks() {
        try {
            const response = await fetch(
                "https://openlibrary.org/search.json?q=fantasy&limit=20"
            );
            const data = await response.json();

            data.docs.forEach(book => {
                const title = book.title || "Untitled";
                const author = book.author_name
                    ? book.author_name.join(", ")
                    : "";
                const coverId = book.cover_i;

                const coverUrl = coverId
                    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                    : "https://via.placeholder.com/150x220?text=No+Cover";

                // ---------- THEME DETECTION ----------
                const subjects = book.subject || [];
                let theme = "other";

                if (subjects.some(s => s.toLowerCase().includes("fantasy")))
                    theme = "fantasy";
                else if (subjects.some(s => s.toLowerCase().includes("horror")))
                    theme = "horror";
                else if (subjects.some(s => s.toLowerCase().includes("adventure")))
                    theme = "adventure";
                else if (subjects.some(s => s.toLowerCase().includes("science")))
                    theme = "science";

                // ---------- CREATE CARD ----------
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class="BookCardTemplate" data-theme="${theme}">
                        <a href="https://openlibrary.org${book.key}" target="_blank">
                            <img src="${coverUrl}" alt="${title}">
                        </a>
                        <footer class="BookName">
                            ${title}${author ? " – " + author : ""}
                        </footer>
                        <img
                            class="addbutton"
                            src="https://www.citypng.com/public/uploads/small/11639609700adr8oezftyzrqr8lhzj8grcvyzlrje7f4pls6seuo32auctlnebpkieixy17191a21ybfkrry6yejsbevdah18of7mkxp8b8dpky.png"
                            alt="Add book"
                        >
                    </div>
                `;
                bookshelf.appendChild(li);
            });
        } catch (error) {
            console.error("Failed to load books:", error);
        }
    }

    // ---------- SEARCH + FILTER ----------
    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();

        document.querySelectorAll(".BookCardTemplate").forEach(book => {
            const title = book
                .querySelector(".BookName")
                .textContent.toLowerCase();
            const bookTheme = book.dataset.theme;

            const matchesSearch = title.includes(query);
            const matchesTheme =
                activeTheme === "all" || bookTheme === activeTheme;

            book.parentElement.style.display =
                matchesSearch && matchesTheme ? "inline-block" : "none";
        });
    }

    // ---------- SEARCH ----------
    searchInput.addEventListener("input", applyFilters);

    // ---------- FILTER ----------
    filterOptions.forEach(option => {
        option.addEventListener("click", e => {
            e.preventDefault();
            activeTheme = option.dataset.theme;
            applyFilters();
        });
    });

    // ---------- INIT ----------
    loadBooks();
});
