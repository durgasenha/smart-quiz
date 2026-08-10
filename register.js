const HASURA_URL = "https://onlinequiz.hasura.app/v1/graphql";
const ADMIN_SECRET = "hatOvwIGxCyRUQ9XR5HZdKovMSUE7CW1Hgy3aQunmMazZzUwM6ZKA2HMwyO5HNIq";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const mutation = `
    mutation Register($name:String!, $email:String!, $password:String!) {

      insert_users_one(object:{
        name:$name,
        email:$email,
        password:$password
      }){

        id
        name

      }

    }
    `;

    try{

        const response = await fetch(HASURA_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "x-hasura-admin-secret":ADMIN_SECRET
            },

            body:JSON.stringify({

                query:mutation,

                variables:{
                    name,
                    email,
                    password
                }

            })

        });

        const result = await response.json();
        console.log(result);

if (result.errors) {
    console.error(result.errors);
    alert(result.errors[0].message);
    return;
}

        if(result.data){

            alert("Registration Successful ✅");

            window.location.href="login.html";

        }else{

            alert("Registration Failed");

            console.log(result);

        }

    }catch(error){

        console.error(error);

        alert("Server Error");

    }

});