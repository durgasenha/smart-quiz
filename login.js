const HASURA_URL = "https://onlinequiz.hasura.app/v1/graphql";
const ADMIN_SECRET = "hatOvwIGxCyRUQ9XR5HZdKovMSUE7CW1Hgy3aQunmMazZzUwM6ZKA2HMwyO5HNIq";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const query = `
        query Login($email: String!, $password: String!) {
            users(
                where: {
                    email: { _eq: $email },
                    password: { _eq: $password }
                }
            ) {
                id
                name
                email
            }
        }
    `;

    try {
        const response = await fetch(HASURA_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": ADMIN_SECRET
            },

            body: JSON.stringify({
                query: query,
                variables: {
                    email: email,
                    password: password
                }
            })
        });

        const result = await response.json();

        console.log("Hasura Response:", result);

        if (result.data && result.data.users && result.data.users.length > 0) {

            const user = result.data.users[0];

            localStorage.setItem("userId", user.id);
            localStorage.setItem("userName", user.name);
            localStorage.setItem("userEmail", user.email);

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Email or Password");
        }

    } catch (error) {

        console.error("Login Error:", error);
        alert("Server Error");
    }
});
