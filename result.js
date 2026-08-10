const HASURA_URL = "https://onlinequiz.hasura.app/v1/graphql";
const ADMIN_SECRET = "hatOvwIGxCyRUQ9XR5HZdKovMSUE7CW1Hgy3aQunmMazZzUwM6ZKA2HMwyO5HNIq";

// Get Data
const score = Number(localStorage.getItem("score")) || 0;
const total = Number(localStorage.getItem("total")) || 0;
const subject = localStorage.getItem("subject") || "";
const subjectId = Number(localStorage.getItem("subjectId")) || 0;
const userId = Number(localStorage.getItem("userId")) || 0;

const wrong = total - score;
const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

let grade = "Fail";

if (percentage >= 90) grade = "A+";
else if (percentage >= 80) grade = "A";
else if (percentage >= 70) grade = "B";
else if (percentage >= 60) grade = "C";

// Show Result
document.getElementById("subject").textContent = subject;
document.getElementById("correct").textContent = score;
document.getElementById("wrong").textContent = wrong;
document.getElementById("total").textContent = total;
document.getElementById("percentage").textContent = percentage + "%";
document.getElementById("grade").textContent = grade;
document.getElementById("bar").style.width = percentage + "%";

// Save Result
async function saveResult() {

    if (!userId || !subjectId) {
        console.error("userId or subjectId missing");
        return;
    }

    const mutation = `
    mutation {
      insert_quiz_results_one(
        object:{
          user_id:${userId},
          subject_id:${subjectId},
          score:${score},
          total:${total},
          subject:"${subject}"
        }
      ){
        id
      }
    }`;

    try {

        const response = await fetch(HASURA_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "x-hasura-admin-secret":ADMIN_SECRET
            },
            body:JSON.stringify({
                query: mutation
            })
        });

        const data = await response.json();

console.log("Hasura Response:", data);

if (data.errors) {
    console.error("GraphQL Error:", data.errors);
    alert(JSON.stringify(data.errors, null, 2));
} else {
    console.log("Result Saved Successfully");
}
    } catch(error){

        console.error("Save Error:", error);

    }

}

// Save only once
if (!sessionStorage.getItem("saved")) {
    saveResult();
    sessionStorage.setItem("saved", "yes");
}

// Buttons
function retryQuiz() {

    const subject = localStorage.getItem("subject");

    if (subject === "English") {
        window.location.href = "english.html";
    }
    else if (subject === "Physics") {
        window.location.href = "physics.html";
    }
    else if (subject === "Chemistry") {
        window.location.href = "chemistry.html";
    }
    else if (subject === "Biology") {
        window.location.href = "biology.html";
    }
    else if (subject === "Computer Science") {
        window.location.href = "computer.html";
    }
    else {
        window.location.href = "dashboard.html";
    }
}

function dashboard() {
    window.location.href = "dashboard.html";
}

function dashboard() {

    sessionStorage.removeItem("saved");

    window.location.href = "dashboard.html";

}