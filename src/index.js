import './style.css';

const { fetchData } = require('./modules/app.js');

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});
