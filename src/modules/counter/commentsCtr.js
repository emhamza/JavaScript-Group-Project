const commentsCounter = async (id) => {
  const comments = JSON.parse(localStorage.getItem(`${id}comments`)) || [];
  return comments.length || 0;
};

export default commentsCounter;
