import { fetchCategories, fetchLikesForCategory } from './api.js';
import { renderCategory } from './category.js';

const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

const categoriesContainer = document.querySelector('#categories');

async function getAppId() {
  const response = await fetch(involvementApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    localStorage.setItem('appId', JSON.stringify(await response.text()));
  }
}

const fetchData = async () => {
  try {
    await getAppId(); // Call getAppId function to get the app id before rendering the categories

    const categories = await fetchCategories();

    const categoriesWithLikes = await Promise.all(
      categories.map(async (category) => {
        const likes = await fetchLikesForCategory(category.idCategory);
        return { ...category, likes };
      }),
    );

    categoriesWithLikes.forEach((category) => {
      const categoryDiv = renderCategory(category);
      categoriesContainer.appendChild(categoryDiv);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export { fetchData, getAppId };
