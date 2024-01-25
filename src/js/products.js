import axios from 'axios';
import {
  KEY_CART,
  cartArr,
  addToCart,
  findProduct,
} from '/js/cart-localestorage';
import iconSvg from '/img/icons.svg';
import { updateCartNumber } from './header';
import { openModalProduct } from '/js/modalwindow';

export {
  foodInfo,
  fetchAndRender,
  fetchFoodCategory,
  getCategoriesFromLS,
  KEY_CATEGORY,
  renderFoodItems,
  homManyLimit,
  handleButtonClick,
  checkId,
  add,
};

import { funcPagination, loadMoreTrendMoves, pages } from './pagination.js';

const refs = {
  list: document.querySelector('.product-list'),
  pagination: document.querySelector('.tui-pagination'),
};

let foodInfo = [];
let totalPage;

async function fetchAndRender() {
  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';
  setLimit();
  const categoryInfo = await fetchFoodCategory();
  totalPage = categoryInfo.data.totalPages * categoryInfo.data.perPage;
  const limit = homManyLimit();
  if (totalPage <= Number(limit)) {
    refs.pagination.classList.replace('tui-pagination', 'paginationDop');
  }
  pages(totalPage);
  funcPagination(totalPage);
  try {
    let response;
    if (categoryInfo) {
      response = categoryInfo;
    }
    foodInfo = response.data.results;
    renderFoodItems(foodInfo);
  } catch (error) {
    console.error(error);
  } finally {
    // Скрываем лоадер после выполнения запроса
    document.getElementById('overlay').style.display = 'none';
    // openModal()
  }
}

function renderFoodItems(foodInfo) {
  const storage = localStorage.getItem(KEY_CART);
  const createMessage = `<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`;
  const createElement = foodInfo
    .map(
      ({
        img,
        name,
        popularity,
        category,
        price,
        size,
        _id,
        is10PercentOff,
      }) => {
        const cleanedCategory = category.replace(/_/g, ' ');
        const isIDInLocaleStorage = storage
          ? JSON.parse(storage).some(item => item._id === _id)
          : false;
        const svgDisc = is10PercentOff ? 'icon-discount-pl' : 'visually-hidden';
        const svgHref = isIDInLocaleStorage
          ? `${iconSvg}#icon-cart`
          : `${iconSvg}#icon-shopping-cart`;

        return `<li class="item-pl" data-id="${_id}">
                <div class="background-img-pl">
                    <img src="${img}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${name}</h2>
                <div class="container-info">
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${cleanedCategory}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${size}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${popularity}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${price}</b>
                    <button aria-label="add basket" class="btn-pl" ${
                      isIDInLocaleStorage ? 'disabled' : ''
                    }>
                        <svg class="icon-pl">
                            <use href="${svgHref}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${svgDisc}">
                <use href="${iconSvg}#icon-discount"></use>
                </svg>
                </div>
            </li>`;
      }
    )
    .join('');
  refs.list.innerHTML = createElement || createMessage;
}

window.addEventListener('load', fetchAndRender);

refs.list.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  // debugger;
  let noButton = 0;
  // отримуємо елемент, на якому відбувся клік
  const clickedElement = event.target;
  // Знаходимо найближчий батьківський елемнт типу button
  const closestButton = clickedElement.closest('button');
  // перевіряємо чи знайдено кнопку
  if (closestButton) {
    // Знаходимо найближчий батьківський елемент li
    const closestLi = closestButton.closest('li');
    // перевіряємо чи знайдено li
    if (closestLi) {
      // отримуємо значення data-id з li
      const dataId = closestLi.dataset.id;
      // знаходимо продукт за id в масиві foodInfo
      const clickedProduct = foodInfo.find(product => product._id === dataId);
      checkId(closestLi);
      // перевірка чи знайдено продукт
      if (clickedProduct) {
        // виклик функції на додавання в localeStorage
        noButton = 1;
        add(clickedProduct, foodInfo);
      }
    }
    // знаходимо елемент use в середині кнопки
    // const svg = closestButton.querySelector('.icon-pl use');
    // зміна svg
    // svg.setAttribute('href', `${iconSvg}#icon-cart`);
    // btn off
    closestButton.setAttribute('disabled', true);
  }
  const clickedLi = event.target.closest('li');
  if (clickedLi && !noButton) {
    const clickedId = clickedLi.dataset.id;
    openModalProduct(clickedId);
  }
}

function checkId(id) {
  const idPorduct = id.dataset.id;
  const allPopular = document.querySelectorAll('.popular-list .item-popular');
  const allDiscount = document.querySelectorAll(
    '.discount-list .discount-item'
  );
  const allProducts = document.querySelectorAll('.products .item-pl');
  allPopular.forEach(elem => {
    if (elem.dataset.id === idPorduct) {
      const btn = elem.querySelector('.popularBtn');
      const svg = btn.querySelector('.icon-popular use');
      svg.setAttribute('href', `${iconSvg}#icon-cart`);
      btn.setAttribute('disabled', true);
    }
  });
  allDiscount.forEach(elem => {
    if (elem.dataset.id === idPorduct) {
      const btn = elem.querySelector('.info-div .info-title-link');
      const svg = btn.querySelector('.img-svg-osnova use');
      svg.setAttribute('href', `${iconSvg}#icon-cart`);
      btn.setAttribute('disabled', true);
    }
  });
  allProducts.forEach(elem => {
    if (elem.dataset.id === idPorduct) {
      const btn = elem.querySelector('.price-container-pl .btn-pl');
      const svg = btn.querySelector('.icon-pl use');
      svg.setAttribute('href', `${iconSvg}#icon-cart`);
      btn.setAttribute('disabled', true);
    }
  });
}

function add(elem, arr) {
  //При кліку на кнопку шукаємо потрібний продукт за id, викликаючи функцію findProduct
  const product = findP(elem, arr);
  const foundProduct = cartArr.some(cart => cart._id === product._id);
  if (foundProduct) {
    return;
  } else {
    cartArr.push(product);
    localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
    //team
    updateCartNumber();
  }
}

//Функція пошуку необхідного продукту за id в масиві,який надходить з серверу (викликається всередині addToCart)
function findP(elem, arr) {
  const productId = elem._id;
  return arr.find(({ _id }) => _id === productId);
}

// Фільтр по категоріям

const KEY_CATEGORY = 'filter';

function getCategoriesFromLS() {
  const storage = localStorage.getItem(KEY_CATEGORY);
  try {
    const parseData = JSON.parse(storage);

    const defaultCategories = {};

    const categories = {
      ...defaultCategories,
      ...parseData,
    };

    // Додати перевірку та видалення значень, якщо вони відсутні
    Object.keys(categories).forEach(key => {
      if (categories[key] === undefined) {
        delete categories[key];
      }
    });

    return categories;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchFoodCategory() {
  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';

  const { keyword, category, page, limit, byABC, byPrice, byPopularity } =
    getCategoriesFromLS();

  const params = {
    keyword: keyword || '',
    category: category || '',
    page: page || 1, // Додавання значення за замовчуванням, якщо воно відсутнє
    limit: limit || 6, // Додавання значення за замовчуванням, якщо воно відсутнє
    byABC: byABC || '',
    byPrice: byPrice || '',
    byPopularity: byPopularity || '',
  };

  const queryString = Object.keys(params)
    .filter(
      key =>
        params[key] !== undefined && params[key] !== null && params[key] !== ''
    )
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const url = `https://food-boutique.b.goit.study/api/products?${queryString}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
  } finally {
    // Скрываем лоадер после выполнения запроса
    document.getElementById('overlay').style.display = 'none';
  }
}

function homManyLimit() {
  let limit;
  if (window.innerWidth < 1440 && window.innerWidth > 767) {
    limit = 8;
  } else if (window.innerWidth < 768) {
    limit = 6;
  } else {
    limit = 9;
  }
  return limit;
}

function setLimit() {
  const limit = homManyLimit();
  const storedLimit = localStorage.getItem('filter');
  const parseLimit = JSON.parse(storedLimit);
  parseLimit.limit = Number(limit);
  localStorage.setItem('filter', JSON.stringify(parseLimit));
}

let currentWindowWidth = window.innerWidth;
let resizeTimer;
const thresholdWidths = [768, 1440]; // межі при яких буде перемальовка
window.addEventListener('resize', resizeWidth);

function resizeWidth() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    const newWindowWidth = window.innerWidth;
    if (thresholdOfSwitches(currentWindowWidth, newWindowWidth)) {
      currentWindowWidth = newWindowWidth;
      refs.list.innerHTML = '';
      fetchAndRender();
    }
  }, 250);
}

function thresholdOfSwitches(oldWidth, newWidth) {
  return (
    thresholdWidths.some(
      threshold => oldWidth < threshold && newWidth >= threshold
    ) ||
    thresholdWidths.some(
      threshold => oldWidth >= threshold && newWidth < threshold
    )
  );
}
