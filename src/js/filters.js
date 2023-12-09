import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import { save, load } from './filters-localstorage';
import {
  foodInfo,
  fetchAndRender,
  fetchFoodCategory,
  getCategoriesFromLS,
  KEY_CATEGORY,
  renderFoodItems,
} from '../../js/products';
import {
  KEY_CART,
  cartArr,
  addToCart,
  findProduct,
} from './cart-localestorage.js';

import iconSvg from '../../img/icons.svg';

const BASE_URL = 'https://food-boutique.b.goit.study/api';

function fetchCategories() {
  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';
  
  return axios
    .get(`${BASE_URL}/products/categories`)
    .then(({ data }) => data)
    .catch(error => error)
}

const refs = {
  selector: document.querySelector('.select__body'),
  currentfilter: document.querySelector('.select__current'),
  list: document.querySelector('.product-list'),
};

fetchCategories()
  .then(data => {
    const markup = createSelectorMarkup(data);
    refs.selector.insertAdjacentHTML('afterbegin', markup);
    select();
    //! <<<< local storage >>>>
    refs.selector.addEventListener('click', handleCategory);
    //! <<<< local storage >>>>

    // Скрываем лоадер после выполнения запроса
    document.getElementById('overlay').style.display = 'none';
  })
  .catch(error => {
    Notiflix.Notify.failure(
      `❌ Oops! Something went wrong! Error ${error} Try reloading the page! ❌`
    );

    // Скрываем лоадер после выполнения запроса
    document.getElementById('overlay').style.display = 'none';
  });

function createSelectorMarkup(arr) {
  return arr
    .map(
      category =>
        `<div class="select__item">${category.replace(/_/g, ' ')}</div>`
    )
    .join('');
}

// !------------------- SELECT JS -----------------!\\
let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest('.select'),
      currentText = select.querySelector('.select__current');
    currentText.innerText = text;
    select.classList.remove('is-active');
  }
};
// ! ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ! local storage !

function handleCategory(event) {
  const category = event.target.innerText
    .replace(/ /g, '_')
    .replace(/&/g, '%26');

  const storedData = localStorage.getItem('filter');
  // ! функція зміни категорії в local storage //
  if (storedData) {
    try {
      // Розпакувати JSON-рядок у Javascript-об'єкт
      const parsedData = JSON.parse(storedData);
      // Змінити тільки потрібну властивість (наприклад, keyword)
      if (event.target.innerText !== 'Show all') {
        parsedData.category = `${category}`;
      } else {
        parsedData.category = null;
      }
      // Зберегти оновлений об'єкт назад в localStorage
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }

  fetchAndRender();
}

// Записуємо шаблонний масив в localStorage, якщо там пусто

function onLoad() {
  const obj = {
    keyword: null,
    category: null,
    page: 1,
    limit: 6,
  };
  const value = obj;
  const key = 'filter';

  if (localStorage.getItem('filter')) {
    const filterObj = load('filter');
    if (filterObj.category !== null) {
      refs.currentfilter.innerText = filterObj.category
        .replace(/_/g, ' ')
        .replace(/%26/g, '&');
    }
  } else {
    return save(key, value);
    }
}
onLoad();

// !------------------- Sort JS -----------------!\\

let sort = function() {
  let sortHeader = document.querySelectorAll('.sort-header');
  let sortItem = document.querySelectorAll('.sort-item');

  sortHeader.forEach(item => {
    item.addEventListener('click', sortToggle);
  });

  sortItem.forEach(item => {
    item.addEventListener('click', sortChoose);
  });

  function sortToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function sortChoose() {
    let text = this.innerText,
      sort = this.closest('.sort'),
      currentText = sort.querySelector('.sort-current');
    currentText.innerText = text;
    sort.classList.remove('is-active');
  }
};
sort();
