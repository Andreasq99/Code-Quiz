var startBtn = document.querySelector(".start-button");
var resetBtn = document.querySelector(".reset-button");
var wScore = document.querySelector(".win");
var lScore = document.querySelector(".lose");
console.log(startBtn);
console.log(resetBtn);

var wl = [0,0];
console.log(wl.length);
console.log(wl[1]);

var quizQs = [{
    question: "Which is not a common data type?",
    answers: ["Boolean", "String", "Number", "Byte"]
},
{
    question: "The elements of an array are distinguished by which character?",
    answers: ["Semicolon", "Colon", "Comma", "Period"]
},
{
    question: "",
}
];

resetBtn.addEventListener("click", resetScore);

function resetScore(){
    console.log("reset score!");
    wl = [0,0];
    renderScore();
}

function renderScore(){
    wScore.textContent = wl[0];
    lScore.textContent = wl[1];
}

renderScore();