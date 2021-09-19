async function commentFormHandler(event) {
event.preventDefault();

const comment = document.querySelector('input[name="comment-body"]').value.trim();
const postId = window.location.toString().split('/')[
window.location.toString().split('/').length-1];

if (comment) {
const response = await fetch('/api/comments', {
    method: "POST",
    body: JSON.stringify({postId, comment}),
    headers:{"Content-Type": "application/json"},
});
if (response.ok) {
document.location.reload();
} else {
alert(response.statusText);
document.querySelector("#comment-form").style.display = "block";
}
}
}

document.querySelector(".comment-form")
document.addEventListener("submit",commentFormHandler);