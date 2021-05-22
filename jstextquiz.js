function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question(" AngularJS is perfect for?", ["SAPs", "MPAs", "DPAs", "ZAPs"], "SPAs"),
    new Question("AngularJS is a ?", ["HTML framework", "JQuery framework", "js framework", "SQL framework"], "js framework"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "Angularjs", "Django", "NodeJS"], "Django"),
    new Question("Which directive binds application data to the HTML view?", ["ng bind", "ng-view", "ng-model", "ng-init"], "ng bind"),
    new Question("____ in    AngularJS is the synchronization between the model and the view.", ["Scope", "Filter", "data-binding", "Services"], "data-binding"),
    new Question(" Which of the following can be used as a prefix for Directive?", ["ng", "x", "data-", "NG"], "ng"),
    new Question("  AngularJS expressions bind AngularJS data to HTML the same way as the _________ directive.", ["ng-bind", "ng-app", "ng-model", "ng-repe"], "ng-bind"),
    new Question("AngularJS expressions are written inside?", ["[]", "{}", "{{}}", "()"], "{{}}"),
    new Question(" The [] parameter in the module definition can be used to define dependent modules.", ["True", "False", "can not say", " Can be true or false"], "True"),
    new Question(" AngularJS version 1.0 was released in?", ["2011", "2012", "2013", "2014"], "2012")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();