import { baseApiUrl } from '../api.js';

const mealDishesCounter = async () => {
  try {
    const response = await fetch(baseApiUrl);
    const json = await response.json();
    const categories = json.categories || [];

    const itemCountElement = document.getElementById('itemCount');
    if (itemCountElement) {
      itemCountElement.innerText = categories.length;
    } else {
      console.error('Could not find element with ID "itemCount"');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};

export default mealDishesCounter;
