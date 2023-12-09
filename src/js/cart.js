import axios from 'axios';
import { KEY_CART, cartArr, deleteFromCart } from './cart-localestorage';

const refs = {
  counterCart: document.querySelector('.js-cart-numbers'),
  counterMainPage: document.querySelector('#cart-count'),
  list: document.querySelector('.js-cart-list'),
  cartEmpty: document.querySelector('.empty-cart'),
  cartFull: document.querySelector('.cart-full'),
  buttonDeleteProduct: document.querySelector('.btn-deleteProduct'),
  buttonCleanCart: document.querySelector('.delete-all-btn'),
  formSubmit: document.querySelector('.form'),
  totalPrice: document.querySelector('.total-price'),
};

//Функція наповнення кошика при оновленні сторінки
fillCart();

function fillCart() {
  //Якщо масив cartArr з localeStorage не пустий, то відмальовуємо товари в кошику, інакше показуємо заглушку
  if (cartArr.length !== 0) {
    refs.cartEmpty.style.visibility = 'hidden';
    refs.cartFull.style.visibility = 'visible';
    refs.list.insertAdjacentHTML('beforeend', createCartMarkUp(cartArr));

    //Обчислюємо TOTAL
    const total = cartArr.reduce((previousValue, product) => {
      return previousValue + product.price;
    }, 0);
    refs.totalPrice.innerHTML = total.toFixed(2);

    // Записуємо в лічильники кількість товарів в кошику
    refs.counterCart.textContent = cartArr.length;
    refs.counterMainPage.textContent = cartArr.length;
  } else {
    refs.cartEmpty.style.visibility = 'visible';
    refs.cartFull.style.visibility = 'hidden';
  }
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
                    <use href="./img/icons.svg#icon-x-close"></use>
                    </svg>
                </button>
            </div>

            <div class="product-info">
                <p class="info-quality"> Category: <span class="info-value">${cleanedCategory}</span>
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

//??????????????????????????????????????????????????????????????
//По кліку на кнопву Delete видаляємо товар з корзини (функція імпортується)
//refs.buttonDeleteProduct.addEventListener('click', deleteFromCart);

//По кліку на кнопву Delete all очищуємо корзину
refs.buttonCleanCart.addEventListener('click', cleanCart);

function cleanCart() {
  localStorage.removeItem(KEY_CART);

  refs.cartEmpty.style.visibility = 'visible';
  refs.cartFull.style.visibility = 'hidden';

  // Щоб очистити лічильники і список,перезаписуємо пустий масив
  refs.list.innerHTML = createCartMarkUp(cartArr);
}

//Відправлення замовлення на сервер через форму
refs.formSubmit.addEventListener('submit', handlerFormSubmit);

function handlerFormSubmit(event) {
  event.preventDefault();
  const { email } = event.target.elements;

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
  console.log(createProducts(cartArr));

  //Створюємо обєкт для сервера з email покупця і масивом продуктів
  const newOrder = {
    email: email.value,
    products: createProducts(cartArr),
  };
  console.log(newOrder);

  axios
    .post('https://food-boutique.b.goit.study/api/orders', newOrder)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });

  //?????????????????????????????????????? Після відправки запиту очищаємо корзину і форму,    та відображаємо вікно що корзина пуста
  //localStorage.removeItem(KEY_CART);
  //refs.list.innerHTML = createCartMarkUp(cartArr);
  //form.reset();

  //Модальне вікно ???????????????????????
}
