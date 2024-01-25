import axios from 'axios';
import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import { save, load } from './filters-localstorage';
import { fetchAndRender, getCategoriesFromLS } from './products.js';
import { pages } from './pagination.js';

const BASE_URL = 'https://food-boutique.b.goit.study/api';

function fetchCategories() {
  return axios
    .get(`${BASE_URL}/products/categories`)
    .then(({ data }) => data)
    .catch(error => error);
}

const refs = {
  selector: document.querySelector('.select__body'),
  currentfilter: document.querySelector('.select__current'),
  list: document.querySelector('.product-list'),
  sort: document.querySelector('.sort-body'),
  currentSort: document.querySelector('.sort-current'),
  form: document.querySelector('#search'),
};

fetchCategories()
  .then(data => {
    const markup = createSelectorMarkup(data);
    refs.selector.insertAdjacentHTML('afterbegin', markup);
    select();
    //! <<<< local storage >>>>
    refs.selector.addEventListener('click', handleCategory);
    //! <<<< local storage >>>>
  })
  .catch(error => {
    Notiflix.Notify.failure(
      `❌ Oops! Something went wrong! Error ${error} Try reloading the page! ❌`
    );
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
// Записуємо вибрану категорію в локал сторедж і відмальовуємо товари:
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
        clean.disabled = false;
      } else {
        parsedData.category = null;

        // перевірка чи інші фільтри пусті:
        if (parsedData.keyword !== null) {
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
      }
      parsedData.page = 1;
      // Зберегти оновлений об'єкт назад в localStorage
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }
  pages(1);
  fetchAndRender();
}

//! Записуємо шаблонний масив в localStorage при завантаженні сторінки,
//! якщо там пусто, якщо ні підставляємо значення в поля>
const filterObj = load('filter');
function onLoad() {
  const { keyword, category, page, limit, byABC, byPrice, byPopularity } =
    getCategoriesFromLS();
  const obj = {
    keyword: keyword || null,
    category: category || null,
    page: page || 1, // Додавання значення за замовчуванням, якщо воно відсутнє
    limit: limit || 6, // Додавання значення за замовчуванням, якщо воно відсутнє
    byABC: byABC || '',
    byPrice: byPrice || '',
    byPopularity: byPopularity || '',
  };
  const value = obj;
  const key = 'filter';
  if (localStorage.getItem('filter')) {
    if (filterObj.category !== null) {
      refs.currentfilter.innerText = filterObj.category
        .replace(/_/g, ' ')
        .replace(/%26/g, '&');
    }
    if (filterObj.keyword !== null) {
      // console.log(refs.form.elements.search);
      refs.form.elements.search.value = filterObj.keyword;
    }
    if (filterObj.byABC) {
      if (filterObj.byABC === 'false') {
        refs.currentSort.innerText = 'Z to A';
      }
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
  }
  save(key, value);
  pages();
}
onLoad();

// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// !------------------- Sort JS Markup-----------------!\\

let sort = function () {
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
  const sortType = event.target.innerText;

  const storedData = localStorage.getItem('filter');

  try {
    const parsedData = JSON.parse(storedData);
    if (sortType === 'A to Z') {
      parsedData.byPrice = '';
      parsedData.byPopularity = '';
      parsedData.byABC = '';
      const updatedData = parsedData;
      save('filter', updatedData);
      fetchAndRender();
    } else if (sortType === 'Z to A') {
      parsedData.byPrice = '';
      parsedData.byPopularity = '';
      parsedData.byABC = 'false';
      const updatedData = parsedData;
      save('filter', updatedData);
      fetchAndRender();
      clean.disabled = false;
    } else if (sortType === 'Cheap') {
      parsedData.byABC = '';
      parsedData.byPopularity = '';
      parsedData.byPrice = 'true';
      const updatedData = parsedData;
      save('filter', updatedData);
      fetchAndRender();
      clean.disabled = false;
    } else if (sortType === 'Expensive') {
      parsedData.byABC = '';
      parsedData.byPopularity = '';
      parsedData.byPrice = 'false';
      const updatedData = parsedData;
      save('filter', updatedData);
      fetchAndRender();
      clean.disabled = false;
    } else if (sortType === 'Popular') {
      parsedData.byABC = '';
      parsedData.byPrice = '';
      parsedData.byPopularity = 'false';
      const updatedData = parsedData;
      save('filter', updatedData);
      fetchAndRender();
      clean.disabled = false;
    } else if (sortType === 'Not Popular') {
      parsedData.byABC = '';
      parsedData.byPrice = '';
      parsedData.byPopularity = 'true';
      const updatedData = parsedData;
      save('filter', updatedData);
      fetchAndRender();
      clean.disabled = false;
    } else if (sortType === 'Reset Sort') {
      parsedData.byPrice = '';
      parsedData.byPopularity = '';
      parsedData.byABC = '';
      const updatedData = parsedData;
      save('filter', updatedData);
      fetchAndRender();

      if (parsedData.keyword !== null) {
        clean.disabled = false;
      } else if (parsedData.category !== null) {
        clean.disabled = false;
      } else {
        clean.disabled = true;
      }
    }
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
}
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ! Clean all filters

const clean = document.querySelector('.clean-button');

clean.addEventListener('click', cleanFilters);

const storedData = localStorage.getItem('filter');
const parsedData = JSON.parse(storedData);

function cleanFilters() {
  parsedData.page = 1;
  parsedData.keyword = null;
  parsedData.category = null;
  parsedData.byPrice = '';
  parsedData.byPopularity = '';
  parsedData.byABC = '';
  const updatedData = parsedData;
  refs.currentSort.innerText = 'A to Z';
  refs.currentfilter.innerText = 'Categories';
  refs.form.reset();
  save('filter', updatedData);
  fetchAndRender();
  clean.disabled = true;
}

cleanActivation();
function cleanActivation() {
  // перевіряємо чи активувати кнопку Clean
  if (parsedData.keyword !== null) {
    clean.disabled = false;
  } else if (parsedData.byABC !== '') {
    clean.disabled = false;
  } else if (parsedData.byPopularity !== '') {
    clean.disabled = false;
  } else if (parsedData.byPrice !== '') {
    clean.disabled = false;
  } else if (parsedData.category !== null) {
    clean.disabled = false;
  } else {
    clean.disabled = true;
  }
}
