import { Notify } from "notiflix";
import {
    foodInfo,
    fetchAndRender,
    fetchFoodCategory,
    getCategoriesFromLS,
    KEY_CATEGORY,
    renderFoodItems,
  } from './products';
// import { Input } from "postcss";

const form = document.querySelector('#search');
// const input = document.querySelector('.search-input')
let timeoutId; // Змінна для зберігання ідентифікатора таймаута

// Додавання слухача подій до форми

form.addEventListener('input', handleInputOrSubmit);
form.addEventListener('submit', handleInputOrSubmit);

function handleInputOrSubmit(event) {
  event.preventDefault();
  // Введене значення не реагує на пробіли
  const keyword = form.elements.search.value.trim();
  const storedData = localStorage.getItem('filter');

  // Визначення типу події
  if (event.type === 'input' || event.type === 'submit') {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      updateLocalStorage(keyword, storedData);
      fetchAndRender();
    }, 1000);
  }
}

function updateLocalStorage(keyword, storedData) {
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      parsedData.keyword = `${keyword}`;
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }
}