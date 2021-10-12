console.log("EDDY CALDERON")

const logout = async () => {
    const response = await fetch('/api/users/logout', {
    method: "Post",
    headers:{ "Content-Type": "application/json"},
    });

    if(response.ok) {
    document.location.replace("/");
    }
    else {
        alert("error")
    }
};



$(document).ready(function () {
    document.querySelector('#logout').addEventListener("click",logout);
});