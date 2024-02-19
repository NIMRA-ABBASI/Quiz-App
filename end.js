const username = document.getElementById("username");
const scorebtn = document.getElementById("scorebtn");
const finalscore = document.getElementById("finalscore");
const recentscore = localStorage.getItem("mostRecentScore");
finalscore.innerText = recentscore;
const Max_highscore = 5;
//localStorage.setItem("highscores", JSON.stringify([]));
const highScores = JSON.parse(localStorage.getItem("highscores")) ||[];

username.addEventListener("keyup", () => {
  scorebtn.disabled = !username.value;
});
scorebtn.addEventListener("click",(e)=>
{
  console.log("hello");
  e.preventDefault();
  const score = {
    s: recentscore,
    name: username.value,
  };
  highScores.push(score);
  //console.log(highScores);
  highScores.sort((a, b) => b.s - a.s);
  highScores.splice(Max_highscore);
  //console.log(highScores);
  localStorage.setItem("highscores", JSON.stringify(highScores));
  return window.location.assign("app.html");
})
