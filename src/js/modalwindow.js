export { openModalProduct }
import Api from './api'; // Модуль API
import icons from '/img/icons.svg'; // Іконки для відображення
// let isModalOpen = false;
// let isModalOpening = false;

const modalBackground = document.querySelector('.modal-background'); // Фон модального вікна
const modal = document.querySelector('.modal'); // Саме модальне вікно

// Оголошення функції для відкриття модального вікна з деталями продукту
export default async function openModalProduct(productId) {
  // if (isModalOpen || isModalOpening) {
  //   return;
  // }
  // isModalOpening = true;
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

    // Вставка інформації про продукт в модальне вікно
    modal.insertAdjacentHTML('beforeend', renderModalCard(modalProduct));

    document
      .querySelector('.modal-btn')
      .addEventListener('click', () => updateCart(modalProduct));

    document
      .querySelector('.modal-close-btn')
      .addEventListener('click', closeModalHandler);
    modalBackground.addEventListener('click', clickOnBackdrop);
    document.addEventListener('keydown', escapeModalHandler);

    document
      .querySelector('button[data-action="decrement"]')
      .addEventListener('click', () => {
        const countValue = spanQuantity.textContent - 1;
        spanQuantity.textContent = countValue;

        
      });

    document
      .querySelector('button[data-action="increment"]')
      .addEventListener('click', () => {
      });
  } catch (error) {
    console.error('Error fetching product data:', error.message);
  } finally {
    // isModalOpen = true;
    // isModalOpening = false;
  }
}

// Функція для рендерингу вмісту модального вікна з інформацією про продукт
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
        <button class="modal-btn" aria-label="add to card">
          <span class="modal-btn-text">Add to</span>
          <svg class="modal-icon-shop test" width="18" height="18">
            <use href="${icons}#icon-shopping-cart"></use>
          </svg>
        </button>
      </p>
    </div>`;
}

function closeModalHandler() {
  modalBackground.classList.add('is-hidden');
  document.body.classList.remove('is-modal-open');

  document
    .querySelector('.modal-close-btn')
    .removeEventListener('click', closeModalHandler);
  // modalBackground.removeEventListener('click', clickOnBackdrop);
  document.removeEventListener('keydown', escapeModalHandler);
  // isModalOpen = false; // Позначаємо, що модальне вікно закрите
}

function escapeModalHandler({ key }) {
  if (key === 'Escape') {
    closeModalHandler();
  }
}

