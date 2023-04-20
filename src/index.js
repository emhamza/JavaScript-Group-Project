import './style.css';

import { fetchData, getAppId } from './modules/app.js';

import mealDishesCounter from './modules/counter/itemCtr.js';

import commentsCounter from './modules/counter/commentsCtr.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  mealDishesCounter();
  if (!localStorage.getItem('appId')) {
    getAppId();
  }
});
