const ENDPOINT = "https://onlinequiz.hasura.app/v1/graphql";

// உன் Hasura Admin Secret அல்லது API Key இங்கே போடு
const ADMIN_SECRET = "YOUR_ADMIN_SECRET";

async function graphqlRequest(query, variables = {}) {

    const response = await fetch(ENDPOINT, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": ADMIN_SECRET
        },

        body: JSON.stringify({
            query,
            variables
        })

    });

    const data = await response.json();

    return data;

}