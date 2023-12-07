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
let responce = [];

async function createMarkup() {
  const lim = 2;
  try {
    const responce = await fetchDiscontFood();
    const prodList = responce.slice(0, lim);
    const createProducts = prodList
      .map(({ _id, name, img, price }) => {
        return `<li class="discount-item" data-id="${_id}">
    <div class="discount-item-img">
      <img class="discount-img"  src="${img}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${name}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${price}</p>
        <div class="info-div">
          <a class="info-title-link" href="">
            <svg class="img-svg-osnova" width="18" height="18">
              <use
                href="./img/heroicons-solid_shopping-cart.svg#icon-shopping-cart"
              ></use>
            </svg>
          </a>
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
