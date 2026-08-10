let questions = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Load Geography Questions
fetch("json/geography.json")
.then(response => response.json())
.then(data => {
    questions = data;
    userAnswers = new Array(questions.length).fill(null);
    loadQuestion();
})
.catch(error => {
    console.error("Error loading Geography questions:", error);
});

// Display Question
function loadQuestion() {

    document.getElementById("question").innerHTML =
        (currentQuestion + 1) + ". " + questions[currentQuestion].question;

    let optionHTML = "";

    questions[currentQuestion].options.forEach((option, index) => {

        let checked = "";

        if (userAnswers[currentQuestion] === index) {
            checked = "checked";
        }

        optionHTML += `
        <label class="option">
            <input type="radio"
                   name="option"
                   value="${index}"
                   ${checked}
                   onchange="saveAnswer(${index})">
            ${option}
        </label>
        `;
    });

    document.getElementById("options").innerHTML = optionHTML;
}

// Save Answer
function saveAnswer(index) {
    userAnswers[currentQuestion] = index;
}

// Next Question
function nextQuestion() {

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

// Previous Question
function previousQuestion() {

    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Submit Quiz
function submitQuiz() {

    score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] == questions[i].answer) {
            score++;
        }

    }

    const timerText = document.getElementById("timer").textContent;

    localStorage.setItem("subject", "geography");
    localStorage.setItem("subjectId", 5);
    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("time", timerText);

    window.location.href = "result.html";
}