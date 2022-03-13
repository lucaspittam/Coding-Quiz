//global
var questionI = 0; 
var scoreT = 60; 
var timeI = 0; 
var mainEl = document.querySelector("#main");
var questionWEl = document.querySelector("#question-wrapper");
var headerWEl = document.querySelector("#header-wrapper");


// array for questions
var questionArray = [
    {
        text: "What parts of an HTML file can have JavaScript scripts added to them?",
        choice1: "The <body> section",
        choice2: "The <head> section",
        choice3: "Both the <head> and <body> sections are acceptable",
        choice4: "The <meta> section",
        answer: "3"
    },
    {
        text: "What is the correct way to declare an array in JavaScript?",
        choice1: 'var colors = "red", "green", "blue"',
        choice2: 'var colors = ["red", "green", "blue"]',
        choice3: 'var colors = (1:"red", 2:"green", 3:"blue")',
        choice4: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
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
        text: 'How do you write "Hello World" in an alert box?',
        choice1: 'alert("Hello World");',
        choice2: 'msgBox("Hello World");',
        choice3: 'msg("Hello World");',
        choice4: 'alertBox("Hello World");',
        answer: "1"
    },
    {
        text: "What operator is the AND operator?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "3"
    },
    {
        text: "What type of event occurs when an HTML element is clicked on?",
        choice1: "onchange",
        choice2: "onmouseclick",
        choice3: "onmouseover",
        choice4: "onclick",
        answer: "4"
    },
    {
        text: "What operator is the OR operator?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "4"
    },
    {
        text: 'How do you call a function named "myFunction"?',
        choice1: "call function myFunction()",
        choice2: "myFunction()",
        choice3: "call myFunction()",
        choice4: "call.myFunction()",
        answer: "2"
    },
    {
        text: "What operator is used to assign a value to a vairable?",
        choice1: "=",
        choice2: "===",
        choice3: "#",
        choice4: "<<",
        answer: "1"
    },
    {
        text: "How do you write a comment in JavaScript?",
        choice1: "'This is a comment",
        choice2: "<!-- This is a comment -->",
        choice3: "rem This is a comment",
        choice4: "//This is a comment",
        answer: "4"
    },
    {
        //duplicate last question to correct for the quiz advancing past the final question due to the way the nextQfunction advances.
        //there is likely a better way to structure the logic in that function so this is not necessary
        text: "How do you write a comment in JavaScript?",
        choice1: "'This is a comment",
        choice2: "<!-- This is a comment -->",
        choice3: "rem This is a comment",
        choice4: "//This is a comment",
        answer: "4"
    }
];

var highscoreLEl = document.createElement("a");
highscoreLEl.href = "./scores.html";
highscoreLEl.innerHTML = "View High Scores";
headerWEl.appendChild(highscoreLEl);

var timerEl = document.createElement("p");
timerEl.textContent = "Time: " + scoreT;
headerWEl.appendChild(timerEl);

//create title. 
var questionTEl = document.createElement("h2");
questionTEl.textContent = "Coding Quiz Challenge";
questionWEl.appendChild(questionTEl);

//create  instructions
var instrucEl = document.createElement("p");
instrucEl.innerHTML = "Try to answer the following code-related questions within the time limit.<br> Keep in mind that incorrect answers will penalize your score/time by 10 seconds."
instrucEl.id = "instructions";
questionWEl.appendChild(instrucEl);

//the button wrapper is needed to get the style the start button correctly
var sBWEl = document.createElement("div");
sBWEl.id = "startBtn-wrapper";

//the start button calls startQ function when clicked, it is removed once the quiz starts
var sBEl = document.createElement("button");
sBEl.className = "btn";
sBEl.id = "startBtn";
sBEl.innerHTML = "Start Quiz";
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

    var initialBtnEl = document.createElement("buton");
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
    localStorage.setItem("scores", JSON.stringify(savedScores));
    window.location.href = "./scores.html";
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