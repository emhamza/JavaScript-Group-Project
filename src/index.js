import './style.css';

import { fetchData, getAppId } from './modules/app.js';

if (!localStorage.getItem('appId')) {
  getAppId();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});