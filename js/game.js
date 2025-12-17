import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("scores");

const CORRECT_BONUS = 10;

const URL = "https://opentdb.com/api.php?amount=10&type=multiple";

let formattedData = [];
let questionIndex = 0;
let correctAnswer = null;
let score = 0;

/////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
  showQuestion();
};

/////////////////////////////////////////////////////////////////////////////////////////

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];

  correctAnswer = correctAnswerIndex;
  questionText.innerHTML = question;

  answerButtons.forEach((button, index) => {
    button.innerText = answers[index];
    button.dataset.number = index;
    button.disabled = false;
    button.classList.remove("correct", "wrong");

    button.onclick = () => checkAnswer(button.dataset.number);
  });
};

/////////////////////////////////////////////////////////////////////////////////////////

const checkAnswer = (number) => {
  answerButtons.forEach((btn) => (btn.disabled = true));

  const selectedAnswer = Number(number);

  if (selectedAnswer === correctAnswer) {
    answerButtons[selectedAnswer].classList.add("correct");

    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    answerButtons[selectedAnswer].classList.add("wrong");
    answerButtons[correctAnswer].classList.add("correct");
  }

  setTimeout(() => {
    questionIndex++;

    if (questionIndex < formattedData.length) {
      showQuestion();
    } else {
      alert("🎉 The End Quiz");
    }
  }, 1500);
};

/////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", fetchData);
