import { baseApiUrl } from './api.js';

// const mealDishesCounter = (() => {
//   const countMealDishes = async () => {
//     try {
//       const response = await fetch(baseApiUrl);
//       const data = await response.json();
//       let totalMealDishes = 0;
//       data.categories.forEach((category) => {
//         totalMealDishes += category.meals.length;
//       });
//       const counterElement = document.querySelector('#meal-dish-counter');
//       counterElement.innerText = totalMealDishes;
//     } catch (error) {
//       console.error('An error occurred while counting meal dishes', error);
//       const counterElement = document.querySelector('#meal-dish-counter');
//       counterElement.innerText = 'N/A';
//     }
//   };

//   return {
//     countMealDishes,
//   };
// })();

const mealDishesCounter = async () => {
  const response = await fetch(baseApiUrl);
  const json = await response.json();
  const { categories } = json;
  document.getElementById('itemCount').innerText = categories.length;
};

export default mealDishesCounter;
