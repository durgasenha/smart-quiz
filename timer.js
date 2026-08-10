// ==============================
// Smart Quiz Timer
// ==============================

// 30 Minutes
let totalTime = 60;

// Timer Element
const timerElement = document.getElementById("timer");

// Interval Variable
let timerInterval;

// Start Timer
function startTimer() {

    timerInterval = setInterval(() => {

        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        timerElement.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        // Save Remaining Time
        localStorage.setItem("remainingTime", totalTime);

        if (totalTime <= 0) {

            clearInterval(timerInterval);

            alert("⏰ Time is Over!\nQuiz will be submitted automatically.");

            if (typeof submitQuiz === "function") {
                submitQuiz();
            }

            return;
        }

        totalTime--;

    }, 1000);

}

// Pause Timer
function pauseTimer() {
    clearInterval(timerInterval);
}

// Resume Timer
function resumeTimer() {
    startTimer();
}

// Reset Timer
function resetTimer() {

    clearInterval(timerInterval);

    totalTime = 30 * 60;

    startTimer();

}

// Start Automatically
startTimer();