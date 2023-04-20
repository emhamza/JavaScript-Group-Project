const commentsCounter = (() => {
  const countComments = () => {
    const comments = document.querySelectorAll('.comment');
    const counterElement = document.querySelector('#comments-counter');
    counterElement.innerText = comments.length;
  };

  return {
    countComments,
  };
})();

export default commentsCounter;
