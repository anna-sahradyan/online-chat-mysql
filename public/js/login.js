
document.querySelector("#email").addEventListener("submit", () => {
    const login = {
        email: email.value,
        password: password.value
    }
    fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status === "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerHTML = data.error
            }
            else{
                success.style.display = "block"
                error.style.display = "none"
                error.innerHTML = data.success
            }
        })
})

