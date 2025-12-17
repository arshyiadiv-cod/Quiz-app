import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("scores");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");

const CORRECT_BONUS = 10;

const URL = "https://opentdb.com/api.php?amount=10&type=multiple";

let formattedData = [];
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let answered = false;

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
  nextButton.disabled = true;
  questionNumber.innerText = questionIndex + 1;
  showQuestion();
};

/////////////////////////////////////////////////////////////////////////////////////////

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];

  correctAnswer = correctAnswerIndex;
  answered = false;

  questionText.innerHTML = question;
  nextButton.disabled = true;

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
  if (answered) return;
  answered = true;

  answerButtons.forEach((btn) => (btn.disabled = true));
  nextButton.disabled = false;

  const selectedAnswer = Number(number);

  if (selectedAnswer === correctAnswer) {
    answerButtons[selectedAnswer].classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    answerButtons[selectedAnswer].classList.add("wrong");
    answerButtons[correctAnswer].classList.add("correct");
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

const nextHandler = () => {
  questionIndex++;

  if (questionIndex < formattedData.length) {
    questionNumber.innerText = questionIndex + 1;
    showQuestion();
  } else {
    alert("🎉 The End Quiz");
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
