var startBtn = document.querySelector(".start-button");
var timer = document.querySelector(".timer-count");
var qWindow = document.querySelector("#quiz-game");

var wl = [0,0];
var qIndex = 0;
console.log(wl.length);
console.log(wl[1]);
console.log(timer.hasChildNodes());
console.log(qWindow.hasChildNodes());

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

window.alert("Hi! I was not able to complete this assignment on time, I asked for an extension though. Sorry!");

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

function startGame(){
    quizQs = shufflerArr(quizQs);
    runTimer();
    console.log(quizQs);
    console.log(quizQs[0]);
    console.log(quizQs[0].question);
    renderQuestion(quizQs[0]);
}

function runTimer(){
    var timeLeft = 75;
    var clock = setInterval(function(){
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            endGame(0);
            clearInterval(clock);
        }
    },1000);
}

function renderQuestion(q){
    while(qWindow.hasChildNodes()){
        qWindow.removeChild(qWindow.firstChild);
    }
    var qQuestion = document.createElement("div");
    qQuestion.innerHTML = q.question;
    qWindow.appendChild(qQuestion);
}

function endGame(score){
    console.log(score);
    qIndex = 0;
}
