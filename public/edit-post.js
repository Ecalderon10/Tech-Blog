async function editFormHAndler(event) {


    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();
    console.log(title);
    console.log(content);

    const id = this.getAttribute('data-id')
    const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
    title,
    content,
    }),

    headers:{
        "Content-Type": "application/json",
    },
    });

    if(response.ok) {
    document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}
const editBtnEl = document.querySelectorAll(".edit-post")
for (let i = 0; i < editBtnEl.length; i++) {
     console.log(editBtnEl[i])
    editBtnEl[i].addEventListener("click", editFormHandler)
    
}
