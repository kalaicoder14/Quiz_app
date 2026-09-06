// ==============================
// Quiz Questions
// ==============================

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: 1
    },

    {
        question: "Which language is used to make web pages interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "Which CSS property changes text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        answer: 2
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "var",
            "variable",
            "define",
            "int"
        ],
        answer: 0
    },

    {
        question: "Which method is used to print something in the browser console?",
        options: [
            "console.print()",
            "console.log()",
            "print.console()",
            "log.console()"
        ],
        answer: 1
    },

    {
        question: "Which Bootstrap class creates a primary button?",
        options: [
            ".button-primary",
            ".btn-primary",
            ".primary-button",
            ".btn-blue"
        ],
        answer: 1
    },

    {
        question: "Which Bootstrap class creates a responsive container?",
        options: [
            ".container",
            ".responsive",
            ".container-fluid-only",
            ".box"
        ],
        answer: 0
    },

    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: [
            "<!-- -->",
            "/* */",
            "//",
            "#"
        ],
        answer: 2
    }
];


// ==============================
// Variables
// ==============================

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let timeLeft = 30;

let timer;


// ==============================
// Start Quiz
// ==============================

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    document
        .getElementById("start-screen")
        .classList.add("d-none");

    document
        .getElementById("result-screen")
        .classList.add("d-none");

    document
        .getElementById("quiz-screen")
        .classList.remove("d-none");

    showQuestion();
}


// ==============================
// Display Question
// ==============================

function showQuestion() {

    clearInterval(timer);

    selectedAnswer = null;

    timeLeft = 30;

    document.getElementById("timer").textContent = timeLeft;

    const question = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question").textContent =
        question.question;


    // Progress Bar

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
        `${progress}%`;


    // Options

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";


    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.classList.add("option");

        button.textContent = option;

        button.onclick = () => selectAnswer(index, button);

        optionsContainer.appendChild(button);
    });


    document.getElementById("next-btn").disabled = true;

    startTimer();
}


// ==============================
// Select Answer
// ==============================

function selectAnswer(index, button) {

    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = index;

    const correctAnswer =
        questions[currentQuestion].answer;


    const options =
        document.querySelectorAll(".option");


    // Disable all options

    options.forEach(option => {

        option.style.pointerEvents = "none";
    });


    // Check answer

    if (index === correctAnswer) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        options[correctAnswer]
            .classList.add("correct");
    }


    document.getElementById("next-btn").disabled = false;

    clearInterval(timer);
}


// ==============================
// Timer
// ==============================

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent =
            timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            timeUp();
        }

    }, 1000);
}


// ==============================
// Time Up
// ==============================

function timeUp() {

    selectedAnswer = -1;

    const correctAnswer =
        questions[currentQuestion].answer;

    const options =
        document.querySelectorAll(".option");

    options.forEach(option => {

        option.style.pointerEvents = "none";
    });


    options[correctAnswer]
        .classList.add("correct");


    document.getElementById("next-btn").disabled = false;
}


// ==============================
// Next Question
// ==============================

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
}


// ==============================
// Show Result
// ==============================

function showResult() {

    clearInterval(timer);

    document
        .getElementById("quiz-screen")
        .classList.add("d-none");

    document
        .getElementById("result-screen")
        .classList.remove("d-none");


    const totalQuestions = questions.length;

    const percentage =
        Math.round((score / totalQuestions) * 100);


    document.getElementById("score").textContent =
        `${score} / ${totalQuestions}`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;


    let message;


    if (percentage >= 80) {

        message =
            "Excellent! You have a great understanding of web development.";

    } else if (percentage >= 60) {

        message =
            "Good job! Keep practicing to improve your score.";

    } else if (percentage >= 40) {

        message =
            "Nice attempt! A little more practice will help.";

    } else {

        message =
            "Keep learning and try the quiz again!";
    }


    document.getElementById("result-message")
        .textContent = message;
}


// ==============================
// Restart Quiz
// ==============================

function restartQuiz() {

    document
        .getElementById("result-screen")
        .classList.add("d-none");

    document
        .getElementById("quiz-screen")
        .classList.remove("d-none");

    startQuiz();
}