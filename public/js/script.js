const deletePost = async (id) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  };
  
  // Example event listener for the delete button
  document.querySelectorAll('.delete-post-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      deletePost(id);
    });
  });
  