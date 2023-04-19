import './style.css';

import { fetchData, getAppId } from './modules/app.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  getAppId();
});
