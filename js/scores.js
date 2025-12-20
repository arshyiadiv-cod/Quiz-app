document.addEventListener("DOMContentLoaded", () => {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  const list = document.querySelector("ol");
  console.log(highScores, list);

  const content = highScores.map((score, index) => `
    <li>
      <span>${index + 1}</span>
      <p>${score.name}</p>
      <span>${score.score}</span>
    </li>
  `);

  list.innerHTML = content.join("");
});
