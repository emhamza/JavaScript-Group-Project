import './style.css';

import { fetchData, getAppId } from './modules/app.js';

import mealDishesCounter from './modules/itemCtr.js';

import commentsCounter from './modules/commentsCtr.js';

// Call the countMealDishes function to display the total number of meal dishes on the homepage
// mealDishesCounter.countMealDishes();
// commentsCounter.countComments();

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  mealDishesCounter();
  if (!localStorage.getItem('appId')) {
    getAppId();
  }
});
