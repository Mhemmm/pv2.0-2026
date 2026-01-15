import { GoogleGenAI } from "https://esm.run/@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBNZJyzr9JU6PVE7XDsqoW9JoFXJwY00UE"
});

document.addEventListener("DOMContentLoaded", () => {
  const chatDropdown = document.querySelector(".chat-dropdown");
  const toggle = chatDropdown.querySelector(".chatdropdown-toggle");
  const panel = chatDropdown.querySelector(".chat-panel");
  const closeBtn = chatDropdown.querySelector(".chatclose-btn");

  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const messages = document.getElementById("chatMessages");

  panel.style.display = "none";

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
      panel.style.flexDirection = "column";
      chatInput.focus();
    }
  });

  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    const prompt = "Använd endast vanlig text (inga $ eller LaTeX). " + text;

    // Nu utan try/catch
    const output = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ type: "text", text: prompt }]
    });

    const answer =
      output.text ||
      output.output_text ||
      output.candidates?.[0]?.content?.[0]?.text ||
      "Inget svar";

    addMessage(answer, "bot");
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `message ${type}`;
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
});