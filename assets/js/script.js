//global
var questionI = 0; 
var scoreT = 60; 
var timeI = 0; 
var mainEl = document.querySelector("#main");
var questionWEl = document.querySelector("#questionW");
var headerWEl = document.querySelector("#headerW");


// array for questions
var questionArray = [
    {
        text: "Commonly used data types do NOT include:",
        choice1: "Strings",
        choice2: "Booleans",
        choice3: "Alerts",
        choice4: "Numbers",
        answer: "3"
    },
    {
        text: "The condition in an if/else statement is enclosed in:",
        choice1: "Quotes",
        choice2: "Parenthesis",
        choice3: "Curly Brackets",
        choice4: "Square Brackets",
        answer: "2"
    },
    {
        text: "What operator is used to compare a value or variable?",
        choice1: "=",
        choice2: "===",
        choice3: "#",
        choice4: "<<",
        answer: "2"
    },
    {
        text:  "Arrays in JavaScript can be used to store:",
        choice1: "Numbers and Strings",
        choice2: "Other Arrays",
        choice3: "Booleans",
        choice4: "All of the above",
        answer: "4"
    },
    {
        text: "What operator is the Increment operator?",
        choice1: "+",
        choice2: "&",
        choice3: "++",
        choice4: "||",
        answer: "3"
    },
    {
        text: "String values must be enclosed within ______ when being assigned to variables",
        choice1: "Commas",
        choice2: "Curly Brackets",
        choice3: "Quotes",
        choice4: "Parenthesis",
        answer: "3"
    },
    {
        text: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2: "Terminal Bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: "4"
    },
    {
        text: "Where is the correct place to insert a JavaScript?",
        choice1: "The <head> section",
        choice2: "Both the <head> section and the <body> section are correct",
        choice3: "The <body> section",
        choice4: " Only the <footer> section",
        answer: "2"
    },
    {
        text: "JavaScript is the same as Java.",
        choice1: "True",
        choice2: "False",
        answer: "2"
    },
    {
        text: "JavaScript File Has An Extension of:",
        choice1: ".Java",
        choice2: ".Js",
        choice3: ".javascript",
        choice4: ".XML",
        answer: "2"
    },
];
// high score button
var highscoreLEl = document.createElement("a");
highscoreLEl.href = "./highscore.html";
highscoreLEl.innerHTML = "View High-Scores";
headerWEl.appendChild(highscoreLEl);

var timerEl = document.createElement("p");
timerEl.textContent = "Time Remaining: " + scoreT;
headerWEl.appendChild(timerEl);

//create title. 
var questionTEl = document.createElement("h2");
questionTEl.textContent = "Coding Quiz !!";
questionWEl.appendChild(questionTEl);

//create  instructions
var instrucEl = document.createElement("p");
instrucEl.innerHTML = "Answer the following questions within the time limit.<br> All wrong answers will deduct your score by 10 points (10 secs)."
instrucEl.id = "instructions";
questionWEl.appendChild(instrucEl);

//the button wrapper is needed to get the style the start button correctly
var sBWEl = document.createElement("div");
sBWEl.id = "startBtn-wrapper";

//the start button calls startQ function when clicked, it is removed once the quiz starts
var sBEl = document.createElement("button");
sBEl.className = "btn";
sBEl.id = "startBtn";
sBEl.innerHTML = "Start";
sBWEl.appendChild(sBEl);
questionWEl.appendChild(sBWEl);

var startQ =() => {
    questionWEl.removeChild(instrucEl);
    questionWEl.removeChild(sBWEl);

    questionTEl.textContent = questionArray[questionI].text;

    var choiceOlEl = document.createElement("ol");
    choiceOlEl.id = "choice-ol";
    questionWEl.appendChild(choiceOlEl);

  
    var choice1El = document.createElement("li");
    choice1El.setAttribute("choice-number", "1");
    choice1El.id = "choice1";
    choice1El.className = "choice";
    choice1El.textContent = questionArray[questionI].choice1;
    choiceOlEl.appendChild(choice1El);

    var choice2El = document.createElement("li");
    choice2El.setAttribute("choice-number", "2");
    choice2El.id = "choice2";
    choice2El.className = "choice";
    choice2El.textContent = questionArray[questionI].choice2;
    choiceOlEl.appendChild(choice2El);

    var choice3El = document.createElement("li");
    choice3El.setAttribute("choice-number", "3");
    choice3El.id = "choice3";
    choice3El.className = "choice";
    choice3El.textContent = questionArray[questionI].choice3;
    choiceOlEl.appendChild(choice3El);

    var choice4El = document.createElement("li");
    choice4El.setAttribute("choice-number", "4");
    choice4El.id = "choice4";
    choice4El.className = "choice";
    choice4El.textContent = questionArray[questionI].choice4;
    choiceOlEl.appendChild(choice4El);

    var feedbackEl = document.createElement("div");
    feedbackEl.id = "feedback-wrapper";
    questionWEl.appendChild(feedbackEl);
    var feedbackDividerEl = document.createElement("hr");
    feedbackEl.appendChild(feedbackDividerEl);
    var feedbackMsgEl = document.createElement("h3");
    feedbackMsgEl.id = "feedback-message";
    feedbackEl.appendChild(feedbackMsgEl);

    Sdown();
}
var nextQ= (event) => {
    
    var targetEl = event.target;
    var answer = targetEl.getAttribute("choice-number");
    if (answer){
        var feedbackMsgEl = document.querySelector("#feedback-message");
        if (answer===questionArray[questionI].answer){
            feedbackMsgEl.textContent = "Correct";
        }
        else {
            scoreT = Math.max(0, scoreT-10);
            feedbackMsgEl.textContent = "Wrong";
        }
    }

    if (questionI+1 < questionArray.length && (answer)){
        questionI++;
        questionTEl.textContent = questionArray[questionI].text;
        var choice1El = document.querySelector("#choice1");
        choice1El.textContent = questionArray[questionI].choice1;
        var choice2El = document.querySelector("#choice2");
        choice2El.textContent = questionArray[questionI].choice2;
        var choice3El = document.querySelector("#choice3");
        choice3El.textContent = questionArray[questionI].choice3;
        var choice4El = document.querySelector("#choice4");
        choice4El.textContent = questionArray[questionI].choice4;
    }
    if (targetEl.id === "initials-button") {
        sendI(event);
    }
}

var Sdown = () => {

    timeI = setInterval(function() {
        timerEl.textContent = "Time: " + scoreT;

        if (scoreT > 0) {
            scoreT--;
        }
        else if (scoreT === 0) {
            qDone();
        }
        
        //the other condition for ending the quiz is if all of the questions have been answered
        if (questionI+1 === questionArray.length){
            qDone();
        }
    }, 1000);
}

var qDone = () => {
    
    clearInterval(timeI);

    //clears away the unnecessary information to prepare for the initials form being displayed
    var feedbackMsgEl = document.querySelector("#feedback-message");
    feedbackMsgEl.textContent = "";

    var choiceOlEl = document.querySelector("#choice-ol");
    questionWEl.removeChild(choiceOlEl);
    timerEl.textContent = "Time: " + scoreT;
    questionTEl.innerHTML = "All Done! <br> Your Final Score is: " + scoreT;

    //create the form and the submit button
    var initialFormEl = document.createElement("form");
    initialFormEl.id = "initials-form";
    questionWEl.appendChild(initialFormEl);

    var inputWrapperEl = document.createElement("div");
    inputWrapperEl.id = "input-wrapper";
    initialFormEl.appendChild(inputWrapperEl);

    var initialLabelEl = document.createElement("label");
    initialLabelEl.form = "initials";
    initialLabelEl.id = "initials-label";
    initialLabelEl.textContent = "Enter Initials";
    inputWrapperEl.appendChild(initialLabelEl);

    var initialTextEl = document.createElement("input");
    initialTextEl.type = "text";
    initialTextEl.id = "initials";
    initialTextEl.name = "initials";
    inputWrapperEl.appendChild(initialTextEl);

    var initialBtnEl = document.createElement("button");
    initialBtnEl.className = "btn";
    initialBtnEl.id = "initials-button";
    initialBtnEl.textContent = "Submit";
    initialBtnEl.setAttribute("button-id", "initials-submit");
    initialFormEl.appendChild(initialBtnEl);   
}

//this function is called by the event listeners when either the submit buton is clicked, or when the initals are entered and the enter/return key is pressed
var sendI = function (event) {
    event.preventDefault();
    var initials = document.querySelector("#initials").value;
    var newScore = {initials: initials, score: scoreT};
    
    var savedScores = localStorage.getItem("scores");
    if (!savedScores){
        savedScores = [{initials: "", score: ""}];
        savedScores = JSON.stringify(savedScores);
    }
    savedScores = JSON.parse(savedScores);
    savedScores.push(newScore);
    localStorage.setItem("highscore", JSON.stringify(savedScores));
    window.location.href = "./highscore.html";
}

//this function clears the correct or wrong feedback that is displayed when the user selects an answer
//this function is called when the cursor moves over one of the next question's answer choices
var clearF = (event) => {
    var targetEl = event.target;
    var answer = targetEl.getAttribute("choice-number");
    //if answer exists, i.e. if there is a correct or wrong feedback message currently displayed, replace the text with "" to effectively
    //remove the string
    if (answer) {
        var feedbackMsgEl = document.querySelector("#feedback-message");
        feedbackMsgEl.textContent = "";
    }
}

//event listeners
sBEl.addEventListener("click", startQ);
questionWEl.addEventListener("click",nextQ);
questionWEl.addEventListener("submit",sendI);
questionWEl.addEventListener("mouseover", clearF);