import { addToCart } from '/partials/JS/cart-localestorage.js';
import axios from 'axios';
import iconsSvg from '../../img/icons.svg';

async function fetchPopularFood() {
  const url = `https://food-boutique.b.goit.study/api/products/popular`;
  try {
    const responce = await axios.get(url);
    return responce.data;
  } catch (error) {
    throw error;
  }
}

const popularList = document.querySelector('.popular-list');
let prodList = [];

async function createMarkup() {
  const lim = 5;
  try {
    let responce = await fetchPopularFood();
    prodList = responce.slice(0, lim);
    const createProducts = prodList
      .map(({ img, name, popularity, category, price, size, _id }) => {
        const cleanedCategory = category.replace(/_/g, ' ');
        // const iconSvg = "./img/icons.svg#icon-shopping-cart"
        return  `<li class="item-popular" data-id="${_id}">
        <div class="background-img-popular">
            <img src="${img}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${name}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${cleanedCategory}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${size}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${popularity}</b></p>
        </div>
        </div>
            <button class="popularBtn">
                <svg class="icon-popular" data-_id="${_id}" width="12" height="12">
                    <use class="use-popular" data-_id="${_id}"
                        href="${iconsSvg}#icon-shopping-cart"
                    ></use>
                </svg>
            </button>
    </li>`;
      })
      .join('');

    popularList.insertAdjacentHTML('beforeend', createProducts);
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', createMarkup);

// const linkBag = document.querySelector('.popular-list');

// linkBag.addEventListener('click', addCart);

// let btn;

// function addCart(evt) {
//   btn = evt.target.closest('.info-title-link');
//   if (evt.target.closest('.info-title-link')) {
//     addToCart(evt, prodList);
//   }
//   const svg = btn.querySelector('.img-svg-osnova use');
//   svg.setAttribute('href', '../../img/icons.svg#icon-cart');
//   btn.setAttribute('disabled', true);
//   btn.style.cursor = 'auto';
// }


