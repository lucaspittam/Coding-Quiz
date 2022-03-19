var highScoreW = document.querySelector("#high-scoreW");
var btnWEL = document.querySelector("#buttonW");
//load score , sorts them, then display :)
var loadScores = () => {
    var savedS = localStorage.getItem("Highscore");
    if (!savedS){
        console.log ("No Scores Yet!");
        return false;
    }
    savedS = JSON.parse(savedS);
    
    savedS.sort(function(a, b) {return a.score - b.score});
    var scoreLOL = document.createElement("ol");
    scoreLOL.id = "score-ol";
    highScoreW.appendChild(scoreLOL);

    for (var i = savedS.length-1; i > 0; i--) {
        var scoreLi = document.createElement("li");
        scoreLi.className = "score-li";
        scoreLi.innerHTML = savedS[i].initials + " - " + savedS[i].score;
        scoreLOL.appendChild(scoreLi);
    }
return true;
}
//call loadScores function if false emptySEl message
var ScoreLoad = loadScores();
if (ScoreLoad === false){
    var emptySEl = document.createElement("h2");
    emptySEl.id = "empty-score-msg";
    emptySEl.textContent = "No Scores Yet!";
    highScoreW.appendChild(emptySEl);
}
//scores button
var clearBEl = document.createElement("button");
clearBEl.id = "clear-scores";
clearBEl.className = "btn";
clearBEl.textContent = "Clear Scores";
btnWEL.appendChild(clearBEl);

//return button
var retBEl = document.createElement("button");
retBEl.id = "return-button";
retBEl.className = "btn";
retBEl.textContent = "Go Back";
btnWEL.appendChild(retBEl);

//clear localStorage 
var clearS = () => {
    localStorage.clear();
    location.reload()
}
//return  to index.html
var goBack = () => {
    window.location.href = "./index.html";
}

//event listening
retBEl.addEventListener("click", goBack);
clearBEl.addEventListener("click", clearS);