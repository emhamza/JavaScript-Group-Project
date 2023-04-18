const baseApiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const categoriesContainer = document.querySelector('#categories');

async function fetchData() {
  try {
    // Fetch categories from base API
    const response = await fetch(baseApiUrl);
    const data = await response.json();
    const { categories } = data;

    // Fetch likes data from Involvement API and merge with categories
    const likesPromises = categories.map(async (category) => {
      const likesResponse = await fetch(`${involvementApiUrl}likes?item_id=${category.idCategory}&item_type=category`);
      const likesData = await likesResponse.json();
      category.likes = likesData.likes || 0;
      return category;
    });
    const categoriesWithLikes = await Promise.all(likesPromises);

    // Render categories with likes data
    categoriesWithLikes.forEach((category) => {
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
      categoryDiv.appendChild(buttonsContainer);

      categoriesContainer.appendChild(categoryDiv);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

exports.fetchData = fetchData;
