import { KEY_CART, addToCart } from '/js/cart-localestorage.js';
import axios from 'axios';
import iconsSvg from '/img/icons.svg';
import { checkId, add } from './products.js';
import { openModalProduct } from '/js/modalwindow';
import Api from './api.js';

async function fetchDiscontFood() {
  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';

  try {
    const response = await Api.getDiscountedProducts();
    return response;
  } catch (error) {
    throw error;
  } finally {
    // Скрываем лоадер после выполнения запроса
    document.getElementById('overlay').style.display = 'none';
  }
}

const discountList = document.querySelector('.discount-list');
let prodList = [];

async function createMarkup() {
  const storage = localStorage.getItem(KEY_CART);
  const lim = 2;
  try {
    let responce = await fetchDiscontFood();
    prodList = responce.slice(0, lim);

    const createProducts = prodList
      .map(({ _id, name, img, price }) => {
        const isIDInLocaleStorage = storage
          ? JSON.parse(storage).some(item => item._id === _id)
          : false;
        const svgHref = isIDInLocaleStorage
          ? `${iconsSvg}#icon-cart`
          : `${iconsSvg}#icon-shopping-cart`;

        return `<li class="discount-item" data-id="${_id}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${iconsSvg}#icon-discount"></use>
                </svg>
    <div class="discount-item-img">
      <img class="discount-img"  src="${img}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${name}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${price}</p>
        <div class="info-div">
          <button class="info-title-link" aria-label="Price" data-_id="${_id}">
            <svg class="img-svg-osnova" data-_id="${_id}" width="18" height="18">
              <use class="use" data-_id="${_id}"
                href="${svgHref}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`;
      })
      .join('');

    discountList.insertAdjacentHTML('beforeend', createProducts);
    const linkBag = document.querySelector('.discount-list');

    linkBag.addEventListener('click', handleButtonClick);
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', createMarkup);

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
      // знаходимо продукт за id в масиві prodList
      const clickedProduct = prodList.find(product => product._id === dataId);
      checkId(closestLi);
      // перевірка чи знайдено продукт
      if (clickedProduct) {
        // виклик функції на додавання в localeStorage
        noButton = 1;
        add(clickedProduct, prodList);
      }
    }
    // знаходимо елемент use в середині кнопки
    closestButton.setAttribute('disabled', true);
  }
  const clickedLi = event.target.closest('li');
  if (clickedLi && !noButton) {
    const clickedId = clickedLi.dataset.id;
    openModalProduct(clickedId);
  }
}
