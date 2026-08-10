let questions = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

fetch("json/gk.json")
.then(response => response.json())
.then(data => {
    questions = data;
    userAnswers = new Array(questions.length).fill(null);
    loadQuestion();
})
.catch(error => console.error("Error loading GK questions:", error));

function loadQuestion(){

    document.getElementById("question").innerHTML =
    (currentQuestion + 1) + ". " + questions[currentQuestion].question;

    let html = "";

    questions[currentQuestion].options.forEach((option,index)=>{

        let checked = "";

        if(userAnswers[currentQuestion] == index){
            checked = "checked";
        }

        html += `
        <label class="option">
            <input type="radio"
                   name="answer"
                   value="${index}"
                   ${checked}
                   onchange="saveAnswer(${index})">
            ${option}
        </label><br>`;
    });

    document.getElementById("options").innerHTML = html;
}

function saveAnswer(answer){
    userAnswers[currentQuestion] = answer;
}

function nextQuestion(){
    if(currentQuestion < questions.length-1){
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion(){
    if(currentQuestion > 0){
        currentQuestion--;
        loadQuestion();
    }
}

function submitQuiz() {

    score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] == questions[i].answer) {
            score++;
        }
    }

    const timerText = document.getElementById("timer").textContent;

    
localStorage.setItem("subject", "gk");
localStorage.setItem("subjectId", 9);
localStorage.setItem("score", score);
localStorage.setItem("total", questions.length);
localStorage.setItem("time", timerText);
    window.location.href = "result.html";
}
