const highscorelist = document.getElementById("list");
const highScore = JSON.parse(localStorage.getItem("highscores")) || [];

highscorelist.innerHTML = highScore.map((score) => {
    return `<li class="highscores"> ${score.name} - ${score.s}</li> `;
  })
  .join("");
