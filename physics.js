let questions = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Load JSON
fetch("json/physics.json")
.then(response => response.json())
.then(data => {
    questions = data;
    userAnswers = new Array(questions.length).fill(null);
    loadQuestion();
})
.catch(error => {
    document.getElementById("question").innerHTML = "Failed to load questions.";
    console.error(error);
});

function loadQuestion(){

    let q = questions[currentQuestion];

    document.getElementById("question").innerHTML =
        (currentQuestion + 1) + ". " + q.question;

    let optionsHTML = "";

    q.options.forEach((option,index)=>{

        let checked = userAnswers[currentQuestion] == index ? "checked" : "";

        optionsHTML += `
        <label class="option">
            <input type="radio"
                   name="answer"
                   value="${index}"
                   ${checked}
                   onchange="saveAnswer(${index})">

            ${option}
        </label>
        `;

    });

    document.getElementById("options").innerHTML = optionsHTML;

}

function saveAnswer(index){
    userAnswers[currentQuestion] = index;
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

function submitQuiz(){

    score = 0;

    for(let i = 0; i < questions.length; i++){
        if(userAnswers[i] == questions[i].answer){
            score++;
        }
    }

    const timerText = document.getElementById("timer").textContent;

    localStorage.setItem("subject", "physics");
    localStorage.setItem("subjectId", 3);
    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("time", timerText);

    window.location.href = "result.html";
}