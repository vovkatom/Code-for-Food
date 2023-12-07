import { addToCart } from '/partials/JS/cart-localestorage.js';
import axios from 'axios';

async function fetchDiscontFood() {
  const url = `https://food-boutique.b.goit.study/api/products/discount`;
  try {
    const responce = await axios.get(url);
    return responce.data;
  } catch (error) {
    throw error;
  }
}

const discountList = document.querySelector('.discount-list');

async function createMarkup() {
  const lim = 2;
  try {
    let responce = await fetchDiscontFood();
    let prodList = responce.slice(0, lim);
    const cartSVG = './img/heroicons-solid_shopping-cart.svg';
    const cart = './img/cart.svg';
    const discontSVG = './img/discount.svg';

    const createProducts = prodList
      .map(({ _id, name, img, price }) => {
        return `<li class="discount-item">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${discontSVG}#icon-discount"></use>
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
                href="${cartSVG}#icon-shopping-cart"
              ></use>
            </svg>
            <svg class="visually-hidden" width="18" height="18">
              <use class="use""
                href="${cart}#icon-cart"
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
    return prodList;
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', createMarkup);

const linkBag = document.querySelector('.discount-list');

linkBag.addEventListener('click', addCart);

async function addCart(evt) {
  if (
    evt.target.classList.contains('info-title-link') ||
    evt.target.classList.contains('img-svg-osnova') ||
    evt.target.classList.contains('use')
  ) {
    addToCart(evt, await fetchDiscontFood());
    console.log(evt);
    // const old = document.querySelector('.img-svg-osnova');
    // document
    //   .querySelector('.visually-hidden')
    //   .classList.replace('visually-hidden', 'img-svg-osnova');
    // old.classList.replace('img-svg-osnova', 'visually-hidden');
  }
}
