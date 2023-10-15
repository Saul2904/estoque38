document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        document.getElementById("erro-login").style.visibility = "hidden";

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://127.0.0.1:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email':email, 'pwd':password })
        });

        if (response.status == 202) {
            const data = await response.json();
            const token = data.token;

            // Store the token securely, e.g., in localStorage
            localStorage.setItem('token', token);

            // Redirect to a protected page or perform other actions
            window.location.href = 'index.html';
        } else {
            document.getElementById("erro-login").style.visibility = "visible";
        }
    });
});