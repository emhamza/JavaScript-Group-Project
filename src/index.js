import './style.css';
import { fetchData, getAppId } from './modules/app.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  if (!localStorage.getItem('appId')) {
    getAppId();
  }
});
