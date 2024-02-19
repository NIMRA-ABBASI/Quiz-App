const question = document.getElementById("question");
const choice = Array.from(document.getElementsByClassName("choice-text"));
const progress_tag = document.getElementById("progress_tag");
const score = document.getElementById("score");
const progress_div_full = document.getElementById("progress_div_full");
const loader = document.getElementById("load");
const game = document.getElementById("game");

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((responseQs) => {
    questions = responseQs.results.map((responseQ) => {
      //object
      const formatquestion = {
        question: responseQ.question,
      };

      const answerchoices =[...responseQ.incorrect_answers];
      responseQ.answer = Math.floor(Math.random()*3)+1;
      answerchoices.splice(responseQ.answer,0,responseQ.correct_answer);
      answerchoices.forEach((choice,index) =>
      {
        formatquestion["choice" + (index+1)] = choice;
       formatquestion["answer"] = responseQ.answer;
      })
      return formatquestion;
    });
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

questionCounter = 0;
rightones = 0;
availableQuesions = [];
MAX_QUESTIONS = 3;
val = "incorrect";

startGame = () => {
  availableQuesions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  questionCounter++;
  if (availableQuesions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", rightones);
    //go to the end page
    return window.location.assign("end.html");
  }

  progress_tag.innerText = `Question  ${questionCounter}/${MAX_QUESTIONS}`;
  //update progress bar
  progress_div_full.style.width = (questionCounter / MAX_QUESTIONS) * 100 + "%";

  //display Question
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestionobj = availableQuesions[questionIndex];
  question.innerText = currentQuestionobj.question;
  //display choices
  for (let i = 0; i < choice.length; i++) {
    choice[i].innerText = currentQuestionobj["choice" + (i + 1)];
  }

  //removing the visited question so it wont display again
  availableQuesions.splice(questionIndex, 1);
};

choice.forEach((ch) => {
  ch.addEventListener("click", (e) => {
    for (let i = 1; i < 5; i++) {
      if (e.target.innerText === currentQuestionobj["choice" + i]) {
        if (i != currentQuestionobj.answer) {
          //console.log(val);
          e.target.parentElement.classList.add(val);
        } else {
          rightones += 10;
          e.target.parentElement.classList.add("correct");
          score.innerText = rightones;
          break;
        }
      }
    }

    setTimeout(() => {
      if (val == "incorrect") {
        e.target.parentElement.classList.remove("incorrect");
      }
      e.target.parentElement.classList.remove("correct");
      getNewQuestion();
    }, 600);
  });
});
