import { GoogleGenAI } from "https://esm.run/@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAajcvdetl5_RnB8vHIjHNV6tHWq0hCE9k"
});

document.addEventListener("DOMContentLoaded", () => {

  let currentSubject;
  const path = window.location.pathname;
  if (path.includes("fysik.html")) currentSubject = "Fysik";
  else if (path.includes("matte.html")) currentSubject = "Matte";
  else if (path.includes("svenska.html")) currentSubject = "Svenska";
  else if (path.includes("engelska.html")) currentSubject = "Engelska";
  else currentSubject = "Matte";

  const levelLinks = document.querySelectorAll(".SubjectLevel .dropdown-menu a");
  let currentLevel = levelLinks[0].textContent.trim();

  levelLinks.forEach(link => {
  link.addEventListener("click", e => {
  e.preventDefault();
  currentLevel = link.textContent.trim();
  getNewQuestion();
  });
  });

  const chatQuery = document.getElementById("chat-querry");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendAnswerBtn");
  const nextBtn = document.getElementById("Next");

  let currentQuestion = "";
  let currentAnswer = "";

  sendBtn.addEventListener("click", checkAnswer);
  chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") checkAnswer();});
  nextBtn.addEventListener("click", getNewQuestion);

  async function getNewQuestion() {
    chatQuery.textContent = "Laddar fråga...";
    chatInput.value = "";

    const prompt = `Generera en gymnasiefråga för ämnet ${currentSubject} på nivån ${currentLevel}.
    Skriv endast text, INTE LaTeX eller $-symboler. Separera frågan och svaret med "Svar:".
    Exempel: "En bil accelererar med 2 m/s². Hur lång tid tar det att nå 20 m/s? Svar: 10 s"`;

    const output = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ type: "text", text: prompt }]});

    const text = output.text ||
      output.output_text ||
      output.candidates?.[0]?.content?.[0]?.text ||
      "Inget svar";

      const parts = text.split("Svar:");
      currentQuestion = parts[0].trim();
      currentAnswer = (parts[1] || "").trim();

      chatQuery.textContent = currentQuestion;
    }

  function checkAnswer() {
    const userAnswer = chatInput.value.trim();
    if (!userAnswer) return;

    let feedback = "";
    if (!currentAnswer) {
      feedback = "Ingen korrekt lösning tillgänglig.";
    } 
    else if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
      feedback = "Rätt! Bra jobbat.";
    } 
    else {
      feedback = `Fel. Rätt svar: ${currentAnswer}`;
        }
      const feedbackDiv = document.createElement("div");
      feedbackDiv.className = "feedback";
      feedbackDiv.textContent = feedback;
      chatQuery.appendChild(feedbackDiv);
    }

  getNewQuestion();

});
