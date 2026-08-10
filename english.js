let questions = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Load Tamil Questions
fetch("json/tamil.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("tamil.json file not found");
        }

        return response.json();
    })

    .then(data => {

        questions = data;

        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("No questions found in tamil.json");
        }

        userAnswers = new Array(questions.length).fill(null);

        loadQuestion();
    })

    .catch(error => {

        console.error("Tamil Quiz Error:", error);

        document.getElementById("question").innerHTML =
            "Unable to load Tamil questions.";

        document.getElementById("options").innerHTML =
            "<p>Please check tamil.json file.</p>";
    });


// LOAD QUESTION

function loadQuestion() {

    if (questions.length === 0) {
        return;
    }

    const questionData = questions[currentQuestion];

    document.getElementById("question").innerHTML =
        (currentQuestion + 1) + ". " + questionData.question;

    let html = "";

    questionData.options.forEach((option, index) => {

        let checked = "";

        if (userAnswers[currentQuestion] == index) {
            checked = "checked";
        }

        html += `
            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="${index}"
                    ${checked}
                    onchange="saveAnswer(${index})"
                >

                ${option}

            </label>
        `;
    });

    document.getElementById("options").innerHTML = html;
}


// SAVE ANSWER

function saveAnswer(answer) {

    userAnswers[currentQuestion] = answer;
}


// NEXT

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();
    }
}


// PREVIOUS

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();
    }
}


// SUBMIT

function submitQuiz() {

    score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] == questions[i].answer) {

            score++;
        }
    }

    const timerElement =
        document.getElementById("timer");

    let timerText = "";

    if (timerElement) {

        timerText =
            timerElement.textContent;
    }

    localStorage.setItem("subject", "Tamil");

    localStorage.setItem("subjectId", "1");

    localStorage.setItem("score", score);

    localStorage.setItem("total", questions.length);

    localStorage.setItem("time", timerText);

    window.location.href = "result.html";
}
