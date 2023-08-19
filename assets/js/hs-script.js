var startBtn = document.querySelector(".start-button");
var yourScore = document.querySelector(".your-score");
var qWindow = document.querySelector("#quiz-game");
var scoreLink = document.querySelector("#score-link");

var score = localStorage.getItem("score");
yourScore.innerHTML = score;


var lboard = [];
var lboardNames = [];

function refreshLboard(){
    if (localStorage.getItem("lb1")=== null){
        localStorage.setItem("lb1", score);
        lboard.push(score);
    } else if (localStorage.getItem("lb2")=== null){
        localStorage.setItem("lb2", score);
        lboard.push(score);
    } else if (localStorage.getItem("lb3")=== null){
        localStorage.setItem("lb3", score);
        lboard.push(score);
    } else if (localStorage.getItem("lb4")=== null){
        localStorage.setItem("lb4", score);
        lboard.push(score);
    } else if (localStorage.getItem("lb5")=== null){
        localStorage.setItem("lb5", score);
        lboard.push(score);
    } else {
        
    }
}

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


function runTimer(){
    timeLeft = 75;
    clock = setInterval(function(){
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
    clearInterval(clock);
    while(qWindow.hasChildNodes()){
        qWindow.removeChild(qWindow.firstChild);
    }
    var startText = document.createElement("div");
    startText.innerHTML = "Click Start to begin!";
    qWindow.appendChild(startText);
    scoreLink.style.display = "inline";
}
