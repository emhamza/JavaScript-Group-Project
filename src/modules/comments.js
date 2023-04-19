const appId = JSON.parse(localStorage.getItem('appId'));
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=`;
const addCommentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;

const getComments = async (id) => {
  try {
    const response = await fetch(commentUrl + id);
    const data = await response.json();
    localStorage.setItem(`${id}comments`, JSON.stringify(data));
  } catch (e) {
    console.error(e.message);
  }
};

const showComments = (id) => {
  const commentList = document.getElementById(`commentList${id}`);
  const commentHeadin = document.getElementById(`commentsHeading${id}`);
  const comments = JSON.parse(localStorage.getItem(`${id}comments`)) || [];
  commentHeadin.innerText += ` (${comments.length || 0})`;

  if (Array.isArray(comments)) {
    comments.forEach((c) => {
      commentList.innerHTML += `
                <p>${c.creation_date} ${c.username} : ${c.comment}</p>
            `;
    });
  } else {
    commentList.innerHTML = '<p>There is no comments yet.</p>';
  }
};

const addComment = async ({ id, username, comment }) => {
  const response = await fetch(addCommentUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
      username,
      comment,
    }),
  });
  const json = await response.text();
  if (json === 'Created') {
    const commentList = document.getElementById(`commentList${id}`);
    getComments(id);

    if (commentList.childElementCount > 0 && commentList.firstElementChild.innerText === 'There is no comments yet.') {
      commentList.innerHTML = '';
      console.log('work');
    }
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    commentList.innerHTML += `
                <p>${yyyy}-${mm}-${dd} ${username} : ${comment}</p>
            `;
  }
};

module.exports = { getComments, showComments, addComment };