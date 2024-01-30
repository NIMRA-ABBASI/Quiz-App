const question = document.getElementById("question");
const choice = Array.from(document.getElementsByClassName("choice-text"));
const progress_tag = document.getElementById("progress_tag");
const score = document.getElementById("score");
const progress_div_full = document.getElementById("progress_div_full");

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    }
    ,
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    }
    ,
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    }
];
questionCounter = 0;
rightones = 0;
availableQuesions = [];
MAX_QUESTIONS = 3;
val = "incorrect";

startGame = () => {
    availableQuesions = [...questions];
    getNewQuestion();
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
        choice[i].innerText = currentQuestionobj['choice' + (i + 1)];
    }

    //removing the visited question so it wont display again
    availableQuesions.splice(questionIndex, 1);

};

choice.forEach(ch => {
    ch.addEventListener("click", (e) => {
        for (let i = 1; i < 5; i++) {
           // console.log(e.target.innerText === currentQuestionobj["choice" + i]);
            if (e.target.innerText === currentQuestionobj["choice" + i]) {
                if (i != currentQuestionobj.answer) {
                    console.log(val);
                    e.target.parentElement.classList.add(val);
                }
                else {
                    console.log("correct");
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
        }, 600)
    })
});

startGame();
