const appId = JSON.parse(localStorage.getItem('appId'));
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=`;

const commentsCounter = async (id) => {
  const commentHeadin = document.getElementById(`commentsHeading${id}`);
  const comments = JSON.parse(localStorage.getItem(`${id}comments`)) || [];
  commentHeadin.innerText += ` (${comments.length || 0})`;
};

export default commentsCounter;
