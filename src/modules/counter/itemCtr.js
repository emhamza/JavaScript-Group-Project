import { baseApiUrl } from '../api.js';

const mealDishesCounter = async () => {
  const response = await fetch(baseApiUrl);
  const json = await response.json();
  const { categories } = json;

  const itemCountElement = document.getElementById('itemCount');
  if (itemCountElement) {
    itemCountElement.innerText = categories.length;
  } else {
    console.error('Could not find element with id "itemCount"');
  }
};

export default mealDishesCounter;
