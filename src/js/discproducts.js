import { KEY_CART, addToCart } from '/js/cart-localestorage.js';
import axios from 'axios';
import iconsSvg from '/img/icons.svg';

async function fetchDiscontFood() {
  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';

  const url = `https://food-boutique.b.goit.study/api/products/discount`;
  try {
    const responce = await axios.get(url);
    return responce.data;
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

        return `<li class="discount-item">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${iconsSvg}#icon-discount"></use>
                </svg>
              </div>
    <div class="discount-item-img">
      <img class="discount-img"  src="${img}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${name}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${price}</p>
        <div class="info-div">
          <button class="info-title-link" data-_id="${_id}">
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
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', createMarkup);

const linkBag = document.querySelector('.discount-list');

linkBag.addEventListener('click', addCart);

let btn;

function addCart(evt) {
  btn = evt.target.closest('.info-title-link');
  if (evt.target.closest('.info-title-link')) {
    addToCart(evt, prodList);
  }
  const svg = btn.querySelector('.img-svg-osnova use');
  svg.setAttribute('href', `${iconsSvg}#icon-cart`);
  btn.setAttribute('disabled', true);
  btn.style.cursor = 'auto';
}
