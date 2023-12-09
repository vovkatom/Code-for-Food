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
} from './products.js';

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
  sort: document.querySelector('.sort-body'),
  currentSort: document.querySelector('.sort-current')
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

//! Записуємо шаблонний масив в localStorage, якщо там пусто >

function onLoad() {
  const obj = {
    keyword: null,
    category: null,
    page: 1,
    limit: 6,
    // byABC: null,
    // byPrice: 'true',
    // byPopularity: null,
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
    if (filterObj.byABC) {
      if (filterObj.byABC === 'false') { refs.currentSort.innerText = 'Z to A'; }
      if (filterObj.byABC === 'true') {
        refs.currentSort.innerText = 'A to Z';
      }
    }
    if (filterObj.byPrice) {
      if (filterObj.byPrice === 'false') {
        refs.currentSort.innerText = 'Expensive';
      }
      if (filterObj.byPrice === 'true') {
        refs.currentSort.innerText = 'Cheap';
      }
    }
    if (filterObj.byPopularity) {
      if (filterObj.byPopularity === 'false') {
        refs.currentSort.innerText = 'Popular';
      }
      if (filterObj.byPopularity === 'true') {
        refs.currentSort.innerText = 'Not Popular';
      }
    }
  } else {
    return save(key, value);
    }
}
onLoad();
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// !------------------- Sort JS Markup-----------------!\\

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
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ! -------------- SORT JS Work --------------------
refs.sort.addEventListener('click', handleSort);

function handleSort(event) {
  const sortType = event.target.innerText
   
  const storedData = localStorage.getItem('filter');
  
    try {
      const parsedData = JSON.parse(storedData);
        if (sortType === 'A to Z') {
          delete parsedData.byPrice;
          delete parsedData.byPopularity;
          parsedData.byABC = 'true';
          const updatedData = parsedData;
          save('filter', updatedData);
          fetchAndRender();
        } else if (sortType === 'Z to A') {
          delete parsedData.byPrice;
          delete parsedData.byPopularity;
          parsedData.byABC = 'false';
          const updatedData = parsedData;
          save('filter', updatedData);
          fetchAndRender();
        } else if (sortType === 'Cheap') {
          delete parsedData.byABC;
          delete parsedData.byPopularity;
          parsedData.byPrice = 'true';
          const updatedData = parsedData;
          save('filter', updatedData);
          fetchAndRender();
        } else if (sortType === 'Expensive') {
          delete parsedData.byABC;
          delete parsedData.byPopularity;
          parsedData.byPrice = 'false';
          const updatedData = parsedData;
          save('filter', updatedData);
          fetchAndRender();
        } else if (sortType === 'Popular') {
          delete parsedData.byABC;
          delete parsedData.byPrice;
          parsedData.byPopularity = 'false';
          const updatedData = parsedData;
          save('filter', updatedData);
          fetchAndRender();
        } else if (sortType === 'Not Popular') {
          delete parsedData.byABC;
          delete parsedData.byPrice;
          parsedData.byPopularity = 'true';
          const updatedData = parsedData;
          save('filter', updatedData);
          fetchAndRender();
        } else if (sortType === 'Show all') {
          delete parsedData.byABC;
          delete parsedData.byPrice;
          delete parsedData.byPopularity;
          const updatedData = parsedData;
          save('filter', updatedData);
          fetchAndRender();
        }
    }catch (error) {
      console.error('Error updating localStorage:', error);
    }
}
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^