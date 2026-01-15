document.addEventListener("DOMContentLoaded", () => {

    const chatDropdown = document.querySelector(".chat-dropdown");
    const toggle = chatDropdown.querySelector(".chatdropdown-toggle");
    const panel = chatDropdown.querySelector(".chat-panel");
    const closeBtn = chatDropdown.querySelector(".chatclose-btn");

    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
    const messages = document.getElementById("chatMessages");

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        panel.style.display = panel.style.display === "flex" ? "none" : "flex";
    });

    closeBtn.addEventListener("click", () => {
        panel.style.display = "none";
    });

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, "user");
        input.value = "";

        // TEMP fake AI response
        setTimeout(() => {
            addMessage("AI response goes here 👋", "ai");
        }, 600);
    }

    function addMessage(text, type) {
        const msg = document.createElement("div");
        msg.className = `message ${type}`;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

});
