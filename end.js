const username = document.getElementById("username");
const scorebtn = document.getElementById("scorebtn");
s = localStorage.getItem("mostRecentScore");
finalscore = document.getElementById("finalscore");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

finalscore.innerText = s;

username.addEventListener('keyup', () => {
    scorebtn.disabled = !username.value;
});

submit = (e) => {
    e.preventDefault();
    const score = {
        score: s,
        name: username.value,
    };
    highScores.push(score);
    console.log(highScores);

   localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};