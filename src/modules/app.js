const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const categoriesContainer = document.querySelector('#categories');

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { categories } = data;

    categories.forEach((category) => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';

      const categoryImage = document.createElement('img');
      categoryImage.src = category.strCategoryThumb;
      categoryImage.alt = category.strCategory;

      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = category.strCategory;

      categoryDiv.appendChild(categoryImage);
      categoryDiv.appendChild(categoryTitle);

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