// Login check
const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");

// Login ஆகவில்லை என்றால் Login page
if (!userId) {
    alert("Please Login First!");
    window.location.href = "login.html";
}

// Welcome Message
const welcome = document.getElementById("welcome");

if (welcome) {
    welcome.innerHTML = `Welcome, ${userName} 👋`;
}

// Logout Function
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        window.location.href = "index.html";
    }
}