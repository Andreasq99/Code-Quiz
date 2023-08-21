var startBtn = document.querySelector(".start-button");
var yourScore = document.querySelector(".your-score");
var qWindow = document.querySelector("#quiz-game");
var scoreLink = document.querySelector("#score-link");
var lboard = document.querySelector("#lb-list");

var score = localStorage.getItem("score");
yourScore.innerHTML = score;

var lboardScores = [70, 45, 30, 20, score];
var lboardNames = ["AQ", "BN", "HO", "GT", ""];
var scoreIndex = 5;
var lboardList = [];

var initialsIndex = 3;
var initials = ["",""];
console.log(initials);

/* localStorage testing
localStorage.setItem("array",JSON.stringify([1,2,3,4,5]));
var lsArr = JSON.parse(localStorage.getItem("array"));
lsArr.push(6);
localStorage.setItem("array",JSON.stringify(lsArr));
console.log(localStorage.getItem("array"));
*/

document.addEventListener("keydown", function(event){
    console.log(event.key);
    console.log(initialsIndex);
    if(initialsIndex<2){
        initials[initialsIndex] = event.key.toUpperCase();
        initialsIndex++;
        console.log(initials);
        console.log(initialsIndex);
    }
});

refreshLboard();

function refreshLboard(){
    if(localStorage.getItem("lbs")===null){
        localStorage.setItem("lbs",JSON.stringify(lboardScores));
    } else {
        lboardScores = JSON.parse(localStorage.getItem("lbs"));
        lboardScores.push(score);
    }
    if(localStorage.getItem("lbn")===null){
        localStorage.setItem("lbn", JSON.stringify(lboardNames));
    } else {
        lboardNames = JSON.parse(localStorage.getItem("lbn"));
        lboardNames.push("");
    }
    console.log(lboardScores);
    console.log(lboardNames);

    lboardSort();
    renderLboard();
    localStorage.setItem("score", 0);

    
/*  old, bad code  
    if (localStorage.getItem("lb1")=== null){
        localStorage.setItem("lb1", score);
        lboardScores.push(score);
    } else if (localStorage.getItem("lb2")=== null){
        localStorage.setItem("lb2", score);
        lboardScores.push(score);
    } else if (localStorage.getItem("lb3")=== null){
        localStorage.setItem("lb3", score);
        lboardScores.push(score);
    } else if (localStorage.getItem("lb4")=== null){
        localStorage.setItem("lb4", score);
        lboardScores.push(score);
    } else if (localStorage.getItem("lb5")=== null){
        localStorage.setItem("lb5", score);
        lboardScores.push(score);
    } else {
        lboardScores.push(lb1);
        lboardScores.push(lb2);
        lboardScores.push(lb3);
        lboardScores.push(lb4);
        lboardScores.push(lb5);
        for (i=0;i<5;i++){
            if (score >= lboardScores[i]){
                newScoreIndex = i;
            }
        }
        console.log(newScoreIndex);
        if (newScoreIndex<lboardScores.length){
            lboardScores.splice(newScoreIndex, 0, score);
            lboardScores.
        }
    }
*/
}

function lboardSort(){
    console.log("lboardSort");
    for(i=0;i<lboardScores.length-1;i++){
        for(j=0;j<lboardScores.length-i-1;j++){
            if(lboardScores[j]<lboardScores[j+1]){
                tempScore = lboardScores[j];
                lboardScores[j] = lboardScores[j+1];
                lboardScores[j+1] = tempScore;

                tempName = lboardNames[j];
                lboardNames[j] = lboardNames[j+1];
                lboardNames[j+1] = tempName;

                console.log(lboardScores);
                console.log(lboardNames);
            }
        }

    }
    scoreIndex = lboardNames.indexOf("");
    console.log(scoreIndex);
    if(scoreIndex<5){
        initialsIndex = 0;
        lboardNames[lboardNames.indexOf("")] = "N/A";
    }
    console.log(scoreIndex);
    if(lboardScores.length>5){
        lboardScores.splice(5,lboardScores.length-5);
    }
    if(lboardNames.length>5){
        lboardNames.splice(5,lboardNames.length-5);
    }

    localStorage.setItem("lbs", JSON.stringify(lboardScores));
    localStorage.setItem("lbn", JSON.stringify(lboardNames));
}

function renderLboard(){

    console.log("renderLboard");
    for(i=0; i<lboardScores.length;i++){
        lboardList.push(document.createElement("li"));
        var listName = document.createElement("span");
        listName.textContent = lboardNames[i];
        var listScore = document.createElement("span");
        listScore.textContent = lboardScores[i];
        lboard.appendChild(lboardList[i]);
        lboardList[i].appendChild(listName);
        lboardList[i].appendChild(listScore);
    }
    console.log(initialsIndex);
    if(initialsIndex===0){
        initialPrompt();
    } else {
        var lossMessage = document.createElement("div");
        lossMessage.textContent = "You did not make the leaderboard!";
        var scoreSheet = document.querySelector("#score-sheet");
        scoreSheet.appendChild(lossMessage);
        console.log("loss");
    }
}

function initialPrompt(){
    lboardList[scoreIndex].firstChild.textContent = " ";
    console.log("initialPrompt");
    var tickToggler = true;
    var ticker = setInterval(function(){
        if(initialsIndex===0){
            if(tickToggler){
                lboardList[scoreIndex].firstChild.textContent = "_";
            } else {
                lboardList[scoreIndex].firstChild.textContent = " ";
            }
        } else if(initialsIndex===1){
            if(tickToggler){
                lboardList[scoreIndex].firstChild.textContent = initials[0] + "_";
            } else {
                lboardList[scoreIndex].firstChild.textContent = initials[0] + " ";
            }
        } else {
            lboardList[scoreIndex].firstChild.textContent = initials[0] + initials[1];
            clearInterval(ticker);
            lboardNames[scoreIndex] = initials[0] + initials[1];
            localStorage.setItem("lbn",JSON.stringify(lboardNames));
        }
        tickToggler = !tickToggler;
    }, 750);
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