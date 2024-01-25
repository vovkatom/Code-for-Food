import { Notify } from "notiflix";
import {
    fetchAndRender,
} from './products';
import { funcPagination, loadMoreTrendMoves, pages } from './pagination.js';
// import { Input } from "postcss";

const clean = document.querySelector('.clean-button');
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
      pages(1)
    }, 1000);
  }
}

function updateLocalStorage(keyword, storedData) {
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (keyword === '') {
        parsedData.keyword = null;
        // перевірка чи інші фільтри пусті:
        if (parsedData.category !== null) {
          clean.disabled = false;
        } else if (parsedData.byABC !== '') {
          clean.disabled = false;
        } else if (parsedData.byPopularity !== '') {
          clean.disabled = false;
        } else if (parsedData.byPrice !== '') {
          clean.disabled = false;
        } else {
          clean.disabled = true;
        }
      } else {
        parsedData.keyword = `${keyword}`;
        clean.disabled = false;
      }
      parsedData.page = 1;
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }
}