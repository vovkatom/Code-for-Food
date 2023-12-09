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

  // Визначення типу події
  if (event.type === 'input') {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      pushAndRender(keyword);
    }, 1000);
  } else if (event.type === 'submit') {
    pushAndRender(keyword);
  }

}

const storedData = localStorage.getItem('filter');

function pushAndRender(keyword) {
  if (storedData) {
    try {
      // Розпакувати JSON-рядок у Javascript-об'єкт
      const parsedData = JSON.parse(storedData);
      // Змінити тільки потрібну властивість (наприклад, keyword)
      parsedData.keyword = `${keyword}`;

      // Зберегти оновлений об'єкт назад в localStorage
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }
  fetchAndRender();
}
