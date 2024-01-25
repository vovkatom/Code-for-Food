export { openModalProduct }
import {
  KEY_CART,
  cartArr,
} from '/js/cart-localestorage';
import { updateCartNumber } from './header';
import iconSvg from '/img/icons.svg';

import Api from './api'; // Модуль API
import icons from '/img/icons.svg'; // Іконки для відображення

// Вибір DOM елементів
const modalBackground = document.querySelector('.modal-background'); // Фон модального вікна
const modal = document.querySelector('.modal'); // Саме модальне вікно

// Оголошення функції для відкриття модального вікна з деталями продукту
export default async function openModalProduct(productId) {
  const idP = productId;
  try {
    // Показ модального вікна
    modalBackground.classList.remove('is-hidden'); // Видалення класу для відображення фону
    document.body.classList.add('is-modal-open'); // Додавання класу для позначення відкриття модального вікна

    // Додавання іконки закриття до модального вікна
    modal.innerHTML = `
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${icons}#icon-x-close"></use>
        </svg>
      </button>
    `;

    // Отримання даних про продукт з API
    const modalProduct = await Api.getProduct(productId);
    modal.insertAdjacentHTML('beforeend', renderModalCard(modalProduct));

    document.querySelector('.modal-btn').addEventListener('click', () => {
      addCart(modalProduct); // Передача об'єкту modalProduct у функцію addCart
    });
      document.querySelector('.modal-btn-remove').addEventListener('click', () => {
        removeCart(modalProduct); // Передача об'єкту modalProduct у функцію addCart
      });

    
    
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i]._id === productId) {
        document.querySelector('.modal-btn').style.display = 'none';
        document.querySelector('.modal-btn-remove').style.display = 'block';
      }
    }


    document
      .querySelector('.modal-close-btn')
      .addEventListener('click', closeModalHandler);
    modalBackground.addEventListener('click', clickOnBackdrop);
    document.addEventListener('keydown', escapeModalHandler);

  } catch (error) {
    console.error('Error fetching product data:', error.message);
  } finally {
  }
}

function renderModalCard({
  img,
  name,
  category,
  size,
  popularity,
  desc,
  price,
}) {
  return `
    <div class="modal-container">
      <div>
        <div class="modal-img">
          <img
            src="${img}"
            alt="${name}"
          />
        </div>
      </div>
      <div class="modal-product-info">
        <h2 class="modal-title">${name}</h2>
        <div class="modal-details">
          <div>
            <span class="modal-subtitle">Category:</span>
            <span class="modal-subtitle-info">
              ${category.replaceAll('_', ' ')}
            </span>
          </div>
          <div>
            <span class="modal-subtitle">Size:</span>
            <span class="modal-subtitle-info">${size}</span>
          </div>
          <div>
            <span class="modal-subtitle">Popularity:</span>
            <span class="modal-subtitle-info">${popularity}</span>
          </div>
        </div>
        <p class="modal-about-product">${desc}</p>
      </div>
    </div>
    <div class="modal-price-container">
      <p class="modal-price-product">
        <span>$</span><span class="modal-price">${price}</span>
      </p>
      
      <div class="quantity-and-add">
      <button class="modal-btn" aria-label="add to card">
      <span class="modal-btn-text">Add to</span>
      <svg class="modal-icon-shop" width="18" height="18">
        <use href="${icons}#icon-shopping-cart"></use>
      </svg>
    </button>
    <button class="modal-btn-remove" aria-label="add to card">
      <span class="modal-btn-text">Remove from</span>
      <svg class="modal-icon-shop" width="18" height="18">
        <use href="${icons}#icon-shopping-cart"></use>
      </svg>
    </button>
      </div>
    </div>`;
}

let productsArray = []; // Ініціалізація порожнього масиву для продуктів

function addCart(product) {
      cartArr.push(product);
      localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
      //Функція оновлення кількості товарів у кошику (імпортується)
  updateCartNumber();
  document.querySelector('.modal-btn').style.display = 'none'
  document.querySelector('.modal-btn-remove').style.display = 'block';
  addCartSyncButtons(product);
}

function removeCart(product) {
  for (let i = 0; i < cartArr.length; i++) {
    if (cartArr[i]._id === product._id) {
      cartArr.splice(i, 1);
      localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
      updateCartNumber();
      document.querySelector('.modal-btn').style.display = 'block';
      document.querySelector('.modal-btn-remove').style.display = 'none';
      
    }
  }
  removeCartSyncButtons(product);
}

function addCartSyncButtons(id) {
  const idPorduct = id._id
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

function removeCartSyncButtons(id) {
  const idPorduct = id._id;
  const allPopular = document.querySelectorAll('.popular-list .item-popular');
  const allDiscount = document.querySelectorAll(
    '.discount-list .discount-item'
  );
  const allProducts = document.querySelectorAll('.products .item-pl');
  allPopular.forEach(elem => {
    if (elem.dataset.id === idPorduct) {
      const btn = elem.querySelector('.popularBtn');
      const svg = btn.querySelector('.icon-popular use');
      svg.setAttribute('href', `${iconSvg}#icon-shopping-cart`);
      btn.removeAttribute('disabled');
    }
  });
  allDiscount.forEach(elem => {
    if (elem.dataset.id === idPorduct) {
      const btn = elem.querySelector('.info-div .info-title-link');
      const svg = btn.querySelector('.img-svg-osnova use');
      svg.setAttribute('href', `${iconSvg}#icon-shopping-cart`);
      btn.removeAttribute('disabled');
    }
  });
  allProducts.forEach(elem => {
    if (elem.dataset.id === idPorduct) {
      const btn = elem.querySelector('.price-container-pl .btn-pl');
      const svg = btn.querySelector('.icon-pl use');
      svg.setAttribute('href', `${iconSvg}#icon-shopping-cart`);
      btn.removeAttribute('disabled');
    }
  });
}



function clickOnBackdrop({ target }) {
  if (target === modalBackground) {
    closeModalHandler();
  }
}

function closeModalHandler() {
  const modalContainer = document.querySelector('.modal-container');

  // Додаємо клас для виклику анімації закриття
  modalContainer.classList.add('modal-closing');

  // Затримка, щоб анімація могла відтворитися перед закриттям модального вікна
  setTimeout(() => {
    modalBackground.classList.add('is-hidden');
    document.body.classList.remove('is-modal-open');
    modalContainer.classList.remove('modal-closing');
  }, 1500);

  document
    .querySelector('.modal-close-btn')
    .removeEventListener('click', closeModalHandler);
  modalBackground.removeEventListener('click', clickOnBackdrop);
  document.removeEventListener('keydown', escapeModalHandler);
}

function escapeModalHandler({ key }) {
  if (key === 'Escape') {
    closeModalHandler();
  }
}