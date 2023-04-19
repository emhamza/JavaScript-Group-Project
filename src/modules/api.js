const baseApiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

export const fetchCategories = async () => {
  try {
    const response = await fetch(baseApiUrl);
    const data = await response.json();
    const { categories } = data;
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchLikesForCategory = async (categoryId) => {
  try {
    const likesResponse = await fetch(`${involvementApiUrl}likes?item_id=${categoryId}&item_type=category`);
    const likesData = await likesResponse.json();
    return likesData.likes || 0;
  } catch (error) {
    console.error(`Error fetching likes for category ${categoryId}:`, error);
    throw error;
  }
};
