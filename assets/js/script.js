var startBtn = document.querySelector(".start-button");
var timer = document.querySelector(".timer-count");
var qWindow = document.querySelector("#quiz-game");
var scoreLink = document.querySelector("#score-link");

var wl = [0,0];
var qIndex = 0;
console.log(wl.length);
console.log(wl[1]);
console.log(timer.hasChildNodes());
console.log(qWindow.hasChildNodes());
var timeLeft = 75;
var clock;


var quizQs = [{
    question: "Which is not a common data type?",
    answers: ["Boolean", "String", "Number", "Byte"],
    ans: 3
},
{
    question: "The elements of an array are distinguished by which character?",
    answers: ["Semicolon", "Colon", "Comma", "Period"],
    ans: 2
},
{
    question: "How do you reference an element in JavaScript with id 'hero'?",
    answers: ["document.getElementById('.hero')", "document.getElementById('#hero')", "document.getElementById(#hero)", "document.getElementById(.hero)"],
    ans: 1
},
{
    question: "What does DOM stand for?",
    answers: ["Document Object Model", "Document On My screen", "Department of Management", "Document Operations Manager"],
    ans: 0
}
];


function shufflerArr(arr){
    var sampArr = arr;
    var retArr = [];
    var length = arr.length;
    for(i=0;i<length;i++){
        var index = Math.floor(Math.random()*sampArr.length);
        retArr.push(sampArr[index]);
        sampArr.splice(index,1);
    }
    return retArr;
}

startBtn.addEventListener("click", startGame);
scoreLink.style.display = "none";


function startGame(){
    quizQs = shufflerArr(quizQs);
    runTimer();
    console.log(quizQs);
    console.log(quizQs[0]);
    console.log(quizQs[0].question);
    renderQuestion(quizQs[0]);
    startBtn.removeEventListener("click", startGame);
    startBtn.style.display = "none";
}

function runTimer(){
    timeLeft = 75;
    clock = setInterval(function(){
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            endGame();
        }
    },1000);
}

function renderQuestion(q){
    while(qWindow.hasChildNodes()){
        qWindow.removeChild(qWindow.firstChild);
    }
    var qQuestion = document.createElement("div");
    var qAnswers = document.createElement("ul");
    qQuestion.innerHTML = q.question;
    qWindow.appendChild(qQuestion);
    qWindow.appendChild(qAnswers);
    var ans = [];
    for(i=0;i<q.answers.length; i++){
        ans.push(document.createElement("li"));
        console.log(q.answers)
        ans[i].innerHTML = q.answers[i];
        qAnswers.appendChild(ans[i]);
        if (i===q.ans){
            ans[i].addEventListener("click", correctAnswer);
        } else {
            ans[i].addEventListener("click", incorrectAnswer);
        }
    }
}

function incorrectAnswer(){
    qIndex++;
    timeLeft-=20;
    if (timeLeft<0){
        timeLeft = 0;
        endGame();
    }
    timer.textContent = timeLeft;
    if(qIndex === quizQs.length){
        endGame();
    } else {
        renderQuestion(quizQs[qIndex]);
    }
}


function correctAnswer(){
    qIndex++;
    if(qIndex === quizQs.length){
        endGame();
    } else {
        renderQuestion(quizQs[qIndex]);
    }
}

function endGame(){
    console.log(timeLeft);
    localStorage.setItem("score", timeLeft);
    qIndex = 0;
    timer.textContent = timeLeft;
    clearInterval(clock);
    while(qWindow.hasChildNodes()){
        qWindow.removeChild(qWindow.firstChild);
    }
    var startText = document.createElement("div");
    startText.innerHTML = "Head to the leaderboard!";
    qWindow.appendChild(startText);
    scoreLink.style.display = "inline";
}
