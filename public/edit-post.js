console.log("HELLLOOOOOOOOO");

async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();
  console.log(title);
  console.log(content);

  const id = event.target.getAttribute("data-id");
  //   const id = window.location.toString().split("/")[
  //     window.location.toString().split("/").length - 1
  //   ];
  console.log("HELLO!!!! FORM HANDLER!!!!!!");
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      content,
    }),

    headers: {
      "Content-Type": "application/json",
    },
  });
    console.log(response)
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}
const editBtnEl = document.querySelector(".edit-post-form");

editBtnEl.addEventListener("submit", editFormHandler);
