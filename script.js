function goTo(page) {
  window.location.href = page;
}

/* POPUP MESSAGES */
function showMessage(type) {
  const text = {
    memory1: "I still remember that day perfectly 💖",
    memory2: "That date was magical ✨",
    memory3: "My favorite memory is you 😍"
  };
  document.getElementById("popupText").innerText = text[type];
  document.querySelector(".popup").style.display = "block";
}

function closePopup() {
  document.querySelector(".popup").style.display = "none";
}

/* QUIZ — AUTO NEXT, NO SCORE, NO SOUND */

const quizQuestions = [
  {
    q: "What do I like the most?",
    options: ["You 💕", "Sleep 😴", "Food 🍕"],
    correct: 0
  },
  {
    q: "Our vibe is best described as?",
    options: ["Cute 🥰", "Chaotic 😂", "Perfect 💖"],
    correct: 2
  },
  {
    q: "What makes me instantly happy?",
    options: ["Your smile 😊", "Music 🎶", "Coffee ☕"],
    correct: 0
  },
  {
    q: "My favorite place?",
    options: ["Home 🏠", "Beach 🌊", "With you 💑"],
    correct: 2
  },
  {
    q: "Who knows me best?",
    options: ["Me 😌", "You 💕", "Google 🤓"],
    correct: 1
  }
];

let quizIndex = 0;
let lockAnswer = false;

function loadQuestion() {
  lockAnswer = false;

  const q = quizQuestions[quizIndex];
  document.getElementById("question").innerText = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(btn, index);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(button, selected) {
  if (lockAnswer) return;

  if (selected === quizQuestions[quizIndex].correct) {
    lockAnswer = true;

    launchConfetti();
    document.getElementById("correctPopup").style.display = "flex";

    setTimeout(() => {
      document.getElementById("correctPopup").style.display = "none";
      quizIndex++;

      if (quizIndex < quizQuestions.length) {
        loadQuestion();
      } else {
        window.location.href = "surprise.html";
      }
    }, 1200);
  } else {
    button.classList.add("shake");
    setTimeout(() => button.classList.remove("shake"), 400);
  }
}

/* CONFETTI */
function launchConfetti() {
  for (let i = 0; i < 18; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "%";
    c.style.background =
      `hsl(${Math.random() * 360}, 70%, 70%)`;
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 1200);
  }
}

/* INIT */
if (document.getElementById("question")) {
  loadQuestion();
}



/* COUNTDOWN */
const countdown = document.getElementById("countdown");
if (countdown) {
  const target = new Date("February 5, 2026 00:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff/(1000*60*60))%24);
    const m = Math.floor((diff/(1000*60))%60);
    const s = Math.floor((diff/1000)%60);
    countdown.innerText = `${d} days ${h}h ${m}m ${s}s 💕`;
  }, 1000);
}
