const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

const renderCategory = (category) => {
  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'category';

  const categoryImage = document.createElement('img');
  categoryImage.src = category.strCategoryThumb;
  categoryImage.alt = category.strCategory;

  const categoryTitle = document.createElement('h3');
  categoryTitle.textContent = category.strCategory;

  categoryDiv.appendChild(categoryImage);
  categoryDiv.appendChild(categoryTitle);

  // Display number of likes for this category
  const likesCount = document.createElement('p');
  likesCount.className = 'likes-count';
  likesCount.textContent = `Likes: ${category.likes}`;
  categoryDiv.appendChild(likesCount);

  // Create buttons container for this category
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'd-grid gap-2';

  // Create a like button for this category
  const likeButton = document.createElement('button');
  likeButton.className = 'btn btn-outline-danger like-button my-like-button';
  likeButton.dataset.categoryId = category.idCategory;
  likeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 14.35 2 11.12 2 7.5 2 4.42 4.42 2 7.5 2c1.93 0 3.75.95 4.87 2.53C13.75 2.95 15.57 2 17.5 2 20.58 2 23 4.42 23 7.5c0 3.62-3.4 6.85-8.55 12.53L12 21.35z"/></svg>';

  // Add event listener to each like button
  likeButton.addEventListener('click', async () => {
    const { categoryId } = likeButton.dataset;

    try {
      // Send POST request to Involvement API to record the interaction
      const appId = JSON.parse(localStorage.getItem('appId'));
      const response = await fetch(`${involvementApiUrl}apps/${appId}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: categoryId,
          item_type: 'category',
        }),
      });

      if (response.status === 201) {
        const likesCount = categoryDiv.querySelector('.likes-count');
        const currentLikes = Number(likesCount.textContent.split(' ')[1]);
        likesCount.textContent = `Likes: ${currentLikes + 1}`;
      }
    } catch (error) {
      console.error('Error recording like:', error);
    }
  });

  // Create Comments button for this category
  const commentsButton = document.createElement('button');
  commentsButton.className = 'btn btn-outline-info';
  commentsButton.id = 'comments-button';
  commentsButton.textContent = 'Comments';

  // Create Reservations button for this category
  const reservationsButton = document.createElement('button');
  reservationsButton.className = 'btn btn-outline-info';
  reservationsButton.id = 'reservations-button';
  reservationsButton.textContent = 'Reservations';

  // Append buttons to buttons container
  buttonsContainer.appendChild(commentsButton);
  buttonsContainer.appendChild(reservationsButton);

  // Append buttons container to category div
  categoryDiv.appendChild(likeButton);
  categoryDiv.appendChild(buttonsContainer);

  return categoryDiv;
};

exports.renderCategory = renderCategory;
// export { renderCategory, getAppId };
