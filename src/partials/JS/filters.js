import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import { save, load } from './filters-localstorage';
// import { fetchFoodCategory, fetchAndRender, renderFoodItems } from '../../js/products'
import {
  KEY_CART,
  cartArr,
  addToCart,
  findProduct,
} from './cart-localestorage.js'

import iconSvg from '../../img/icons.svg';

const BASE_URL = 'https://food-boutique.b.goit.study/api';

function fetchCategories() {
    return axios.get(`${BASE_URL}/products/categories`).then(({ data }) => data);
};

const refs = {
  selector: document.querySelector('.select__body'),
  currentfilter: document.querySelector('.select__current'),
  list: document.querySelector(".product-list"),
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
      category => `<div class="select__item">${category.replace(/_/g, ' ')}</div>`
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

// ! local storage !

function handleCategory(event) {
  const category = event.target.innerText.replace(/ /g, '_');
  const storedData = localStorage.getItem('filter');
// ! функція зміни категорії в local storage //
  if (storedData) {
    try {
      // Розпакувати JSON-рядок у Javascript-об'єкт
      const parsedData = JSON.parse(storedData);
      // Змінити тільки потрібну властивість (наприклад, keyword)
      parsedData.category = `${category}`;

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
  
    if (localStorage.getItem('filter'))
    {
      const filterObj = load('filter');
       if (filterObj.category !== null) {
        refs.currentfilter.innerText = filterObj.category.replace(/_/g, ' ');
      } 
    } else {
    return save(key, value);
    }
}

onLoad();

//!.....
async function fetchAndRender() {
  // визначається скільки завантажиться li в залежності від ширини екрана
  // if (window.innerWidth < 1440 && window.innerWidth > 767) {
  //     limit = 8;
  // }
  // else if (window.innerWidth < 768) {
  //     limit = 6;
  // }
  // else {
  //     limit = 9;
  // }
  const categoryInfo = fetchFoodCategory();

  try {
    let responce;
    if (categoryInfo) {
      responce = await fetchFoodCategory(categoryInfo.page, categoryInfo.limit);
    }
    foodInfo = responce.data.results;
    renderFoodItems(foodInfo);
  } catch (error) {
    console.error(error);
  }
}

let foodInfo = [];

function renderFoodItems(foodInfo) {
  const storage = localStorage.getItem(KEY_CART);

  const createElement = foodInfo
    .map(({ img, name, popularity, category, price, size, _id }) => {
      const cleanedCategory = category.replace(/_/g, ' ');

      const isIDInLocaleStorage = storage
        ? JSON.parse(storage).some(item => item._id === _id)
        : false;

      const svgHref = isIDInLocaleStorage
        ? `${iconSvg}#icon-cart`
        : `${iconSvg}#icon-shopping-cart`;

      return `<li class="item-pl" data-id="${_id}">
                <div class="background-img-pl">
                    <img src="${img}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h3 class="product-name-pl">${name}</h3>
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${cleanedCategory}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${size}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${popularity}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${price}</b>
                    <button class="btn-pl" ${
                      isIDInLocaleStorage ? 'disabled' : ''
                    }>
                        <svg class="icon-pl">
                            <use href="${svgHref}"></use>
                        </svg>
                    </button>
                </div>
            </li>`;
    })
    .join('');
  refs.list.innerHTML = createElement;
}

async function fetchFoodCategory() {
  const obj = getCategoriesFromLS();
  if (obj.category !== null) {
    const url = `https://food-boutique.b.goit.study/api/products?category=${obj.category}&page=${obj.page}&limit=${obj.limit}`;
    try {
      const responce = await axios.get(url);
      return responce;
    } catch (error) {
      throw error;
    }
  } else if (obj.keyword === null && obj.category === null) {
    const url = `https://food-boutique.b.goit.study/api/products?page=${obj.page}&limit=${obj.limit}`;
    try {
      const responce = await axios.get(url);
      return responce;
    } catch (error) {
      throw error;
    }
  }
}

function getCategoriesFromLS() {
  const storage = localStorage.getItem(KEY_CATEGORY);
  try {
    const parseData = JSON.parse(storage);
    const { keyword, category, page, limit } = parseData;
    return { keyword, category, page, limit };
  } catch (error) {
    console.error(error);
    return null;
  }
} 

const KEY_CATEGORY = 'filter'; 