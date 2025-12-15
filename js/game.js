import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-text");

const URL = "https://opentdb.com/api.php?amount=10&type=multiple";

let formattedData = [];
let questionIndex = 0;
let correctAnswer = null;


const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();

    formattedData = formatData(json.results);
    start();
  } catch (err) {
    console.error("error", err);
  }
};


const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
  showQuestion();
};


const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];

  correctAnswer = correctAnswerIndex;

  questionText.innerHTML = question;

  answerButtons.forEach((button, index) => {
    button.innerText = answers[index];
    button.onclick = () => checkAnswer(index);
  });
};


const checkAnswer = (index) => {
  if (index === correctAnswer) {
    alert("✅ right");
  } else {
    alert("❌ wrong");
  }

  nextQuestion();
};


const nextQuestion = () => {
  questionIndex++;

  if (questionIndex < formattedData.length) {
    showQuestion();
  } else {
    alert("🎉 the end quiz");
  }
};

window.addEventListener("load", fetchData);