async function signupFormHandler(event) {
event.preventDefault();





const username = documnet.querySelector("#username-signup");
const pasword = document.querySelector('#password-signup');

if(username && password) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username:username.value,
            password:password.value,
        }),
        headers:{"Content-Type": "application/json"}, 
    });
    if(response.ok) {
    console.log("success");

    document.location.replace("/dashboard");
}
    else {
    alert(response.statusText);
    }
}
}

document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);
