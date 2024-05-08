const editFormHandler = async(event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-body"]').value;
    console.log('Publish in');
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  }

  const addCommentHandler = async(event) => {
    console.log("HELLO");
    event.preventDefault();

    const body_content = document.querySelector('input[name="body"]').value;
    const id = window.location.toString().split('/') [
      window.location.toString().split('/').length - 1
    ];
    const data = {
      post_id: id,
      body: body_content
    }
    console.log(data);
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.replace('/dashboard/');
    }else {
      alert(response.statusText);
    }
  }
  
  
  
  const editPostFormEL = document.querySelector('#edit-post-form');
  if (editPostFormEL) {
    editPostFormEL.addEventListener('submit', editFormHandler);
  }
  
  const commentInputEl = document.querySelector('#edit-comment-form');
  if (commentInputEl) {
    commentInputEl.addEventListener('submit', addCommentHandler);
  }