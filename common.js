async function saveResult(subjectId, score, totalQuestions, timeTaken) {
const HASURA_URL = "https://onlinequiz.hasura.app/v1/graphql";
const ADMIN_SECRET = "hatOvwIGxCyRUQ9XR5HZdKovMSUE7CW1Hgy3aQunmMazZzUwM6ZKA2HMwyO5HNIq";
    const userId = localStorage.getItem("userId");

    const mutation = `
    mutation SaveResult(
      $user_id:Int!,
      $subject_id:Int!,
      $score:Int!,
      $total:Int!
    ) {
      insert_quiz_results_one(object:{
        user_id:$user_id,
        subject_id:$subject_id,
        score:$score,
        total:$total
      }) {
        id
      }
    }
    `;

    const response = await fetch(HASURA_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "x-hasura-admin-secret":ADMIN_SECRET
        },
        body:JSON.stringify({
            query:mutation,
            variables:{
                user_id:Number(userId),
                subject_id:Number(subjectId),
                score:Number(score),
                total:Number(totalQuestions)
            }
        })
    });

    const result = await response.json();

    console.log(result);

    localStorage.setItem("subject","Tamil");
    localStorage.setItem("score",score);
    localStorage.setItem("total",totalQuestions);
    localStorage.setItem("time",timeTaken);

    window.location.href="result.html";
}