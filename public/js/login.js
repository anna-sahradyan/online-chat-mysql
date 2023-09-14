const form = document.querySelector('form');
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            const data = await response.json();
            error.style.display = "block";
            success.style.display = "none";
            error.innerHTML = data.message;
        } else {
            success.style.display = "block";
            error.style.display = "none";
            success.innerHTML = "Login successful!";
            document.getElementById('email').value= "";
            document.getElementById('password').value = "";
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
