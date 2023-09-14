document.querySelector("#email").addEventListener("submit", () => {
    const register = {
        email: email.value,
        password: password.value
    }
    fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(register),
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

