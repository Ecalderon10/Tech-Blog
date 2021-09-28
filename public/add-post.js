async function newFormHandler(event) {
console.log("Eddy Caldeon")
event.preventDefault();

const title = document.querySelector('input[name="post-title"]').value;
const content = document.querySelector('input[name="content"]').value;
console.log(title, content)

const response = await fetch(`/api/posts`, {
method:"POST",
body: JSON.stringify({
title,
content,
}),
headers:{ "Content-Type": "application/json"}
});
if (response.ok) {
    document.location.replace('/dashboard');
} else {
    alert(response.statusText);
}
}


document.querySelector('#new-post').addEventListener('click', newFormHandler);