async function deleteFormHandler(event) {
     alert('click')
    const id = this.getAttribute('data-id')

    console.log('id',id)
    const response = await fetch(`/api/posts/${id}`,{
        method:"DELETE",
         
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(response.ok) {
    document.location.replace('/dashboard/');
    }
    else {
    alert(response.statusText);
    }
}
const deleteBtnEl = document.querySelectorAll(".delete-post-btn")
console.log(deleteBtnEl)
for (let i = 0; i < deleteBtnEl.length; i++) {
     console.log(deleteBtnEl[i])
    deleteBtnEl[i].addEventListener("click", deleteFormHandler)
    
}