export { cleanCart };
import axios from 'axios';
import { KEY_CART, cartArr, deleteFromCart } from './cart-localestorage';
import iconsSvg from '/img/icons.svg';

const refs = {
  counterCart: document.querySelector('.js-cart-numbers'),
  counterMainPage: document.querySelector('#cart-count'),
  list: document.querySelector('.js-cart-list'),
  cartEmpty: document.querySelector('.js-empty-cart'),
  cartFull: document.querySelector('.cart-full'),
  buttonDeleteProduct: '.delete-btn',
  buttonCleanCart: document.querySelector('.js-delete-all-btn'),
  formSubmit: document.querySelector('.form-cart'),
  totalPrice: document.querySelector('.total-price'),
  cartSuccess: document.querySelector('.js-success'),
  closeSuccess: document.querySelector('.js-close-success'),
  cartFormError: document.querySelector('.form-error'),
  invalidEmail: document.querySelector('.js-invalid-email'),
  closeInvalidEmail: document.querySelector('.js-close-invalid-email'),
};

//Функція наповнення кошика при оновленні сторінки
fillCart();

function fillCart() {
  //Якщо масив cartArr з localeStorage не пустий, то відмальовуємо товари в кошику, інакше показуємо заглушку
  if (cartArr.length !== 0) {
    refs.cartEmpty.style.display = 'none';
    refs.cartFull.style.display = 'flex';
    refs.list.insertAdjacentHTML('beforeend', createCartMarkUp(cartArr));

    //Викликаємо функцію оновлення загальної вартості товарів
    updateTotal();

    // Записуємо в лічильники кількість товарів в кошику
    refs.counterCart.textContent = cartArr.length;
    refs.counterMainPage.textContent = cartArr.length;
  } else {
    refs.cartEmpty.style.display = 'flex';
    refs.cartFull.style.display = 'none';
  }
}

//Функція оновлення загальної вартості товарів (Обчислюємо TOTAL)
function updateTotal() {
  const total = cartArr.reduce((previousValue, product) => {
    return previousValue + product.price;
  }, 0);
  refs.totalPrice.innerHTML = total.toFixed(2);
}

//Розмітка картки в кошику
function createCartMarkUp(arr) {
  return arr
    .map(({ _id, name, img, category, price, size }) => {
      const cleanedCategory = category.replace(/_/g, ' ');

      return `<li class="selectedProduct" data-id=${_id}>
            <div class="product-picture">
                <img src="${img}" alt="${name}" class="" loading="lazy" />
            </div>

            <div class="product-info-container">

            <div class="info-header">
                <h2 class="product-name">${name}</h2>
                <button class="delete-btn">
                    <svg class="" width="20" height="20">
                    <use href="${iconsSvg}#icon-x-close"></use>
                    </svg>
                </button>
            </div>

            <div class="product-info">
                <p class="info-quality-category"> Category: <span class="info-value">${cleanedCategory}</span>
                </p>
                <p class="info-quality"> Size:<span class="info-value">${size}</span></p>
            </div>
            <div class="price">$
            <span>${price}</span>
            </div>
            </div>
        </li>`;
    })
    .join('');
}

//Функція оновлення корзини при видалені 1 товару з корзини (функція deleteFromCart імпортується)
function updateCartList() {
  document.querySelectorAll(refs.buttonDeleteProduct).forEach(btn => {
    btn.addEventListener('click', () => {
      deleteFromCart(cartArr, btn);
      // Оновлюємо розмітку та загальну вартість
      refs.list.innerHTML = createCartMarkUp(cartArr);
      updateCartList();
      updateTotal();
    });
  });
}

updateCartList();

//По кліку на кнопву Delete all очищуємо корзину
refs.buttonCleanCart.addEventListener('click', cleanCart);

function cleanCart() {
  localStorage.removeItem(KEY_CART);

  refs.cartEmpty.style.display = 'flex';
  refs.cartFull.style.display = 'none';

  // Щоб очистити лічильники і список,перезаписуємо пустий масив
  refs.list.innerHTML = createCartMarkUp(cartArr);
  document.querySelector('.js-cart-numbers').innerHTML = 0;
  document.querySelector('#cart-count').innerHTML = 0;
}

//Відправлення замовлення на сервер через форму
refs.formSubmit.addEventListener('submit', handlerFormSubmit);

async function handlerFormSubmit(event) {
  event.preventDefault();
  const { email } = event.target.elements;

  const valid = validateEmail(email.value);
  if (!valid) {
    openModalInvalidEmail();
    return;
  }
  //Створимо функцію, яка за допомогою map створить новий масив обєктів (лише з властивостями productId i amount), який потрібно передати на сервер
  function createProducts(cartArr) {
    const products = cartArr.map(({ _id }) => {
      const productId = _id;
      const newProduct = {
        productId,
        amount: 1,
      };
      return newProduct;
    });
    return products;
  }

  //Створюємо обєкт для сервера з email покупця і масивом продуктів
  const newOrder = {
    email: email.value,
    products: createProducts(cartArr),
  };

  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';

  await axios
    .post('https://food-boutique.b.goit.study/api/orders', newOrder)
    .then(data => {
      // Скрываем лоадер после запроса
      document.getElementById('overlay').style.display = 'none';
      openModalSuccess();
      refs.cartFormError.innerHTML = '';
    })
    .catch(err => {
      console.error(err);
      document.getElementById('overlay').style.display = 'none';
      refs.cartFormError.innerHTML = `We had some error. Try again please.`;
    });
}

//Валідація email
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

//Модальне вікно після успішного запиту на сервер
function openModalSuccess() {
  refs.cartSuccess.classList.remove('visually-hidden');
  refs.closeSuccess.addEventListener('click', () => {
    closeSuccessCart();
  });
}

//Закриваємо модальне вікно і піднімаємося вверх
function closeSuccessCart() {
  setTimeout(scrollToTop, 500);
  refs.cartSuccess.classList.add('visually-hidden');
  refs.formSubmit.reset();
  cleanCart();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Optional: Smooth scrolling animation
  });
}

//Модальне вікно при введенні неправильного email
function openModalInvalidEmail() {
  refs.invalidEmail.classList.remove('visually-hidden');
  refs.closeInvalidEmail.addEventListener('click', () => {
    closeModalInvalidEmail();
  });
}

function closeModalInvalidEmail() {
  refs.invalidEmail.classList.add('visually-hidden');
}
