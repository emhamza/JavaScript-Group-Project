import './style.css';

import { fetchData, getAppId } from './modules/app.js';

import mealDishesCounter from './modules/counter/itemCtr.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  mealDishesCounter();
  if (!localStorage.getItem('appId')) {
    getAppId();
  }
});
