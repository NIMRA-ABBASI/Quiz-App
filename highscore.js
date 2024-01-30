const highscorelist = document.getElementById("highscorelist");
const highscore = JSON.parse(localStorage.getItem(highscore)) || [];

console.log(highscore);