import { baseApiUrl } from '../api.js';

const mealDishesCounter = async () => {
  const response = await fetch(baseApiUrl);
  const json = await response.json();
  const { categories } = json;
  document.getElementById('itemCount').innerText = categories.length;
};

export default mealDishesCounter;
