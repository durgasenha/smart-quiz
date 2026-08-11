const HASURA_URL = "https://onlinequiz.hasura.app/v1/graphql";

const ADMIN_SECRET = "YOUR_HASURA_SECRET";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const mutation = `
        mutation Register(
            $name: String!,
            $email: String!,
            $password: String!
        ) {
            insert_users_one(
                object: {
                    name: $name,
                    email: $email,
                    password: $password
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
                query: mutation,
                variables: {
                    name: name,
                    email: email,
                    password: password
                }
            })
        });

        const result = await response.json();

        console.log("Hasura Response:", result);

        if (result.errors) {

            console.error(result.errors);

            alert(result.errors[0].message);

            return;
        }

        if (result.data && result.data.insert_users_one) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            alert("Registration Failed");
        }

    } catch (error) {

        console.error("Registration Error:", error);

        alert("Server Error");
    }

});
