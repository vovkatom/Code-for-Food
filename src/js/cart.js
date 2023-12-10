export { cleanCart };

import axios from 'axios';
import { KEY_CART, cartArr, deleteFromCart, } from "./cart-localestorage";
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
  totalPrice: document.querySelector(".total-price"),
  cartSuccess: document.querySelector('.js-success'),
  closeSuccess: document.querySelector('.js-close-success')
}

//Функція наповнення кошика при оновленні сторінки
fillCart()

function fillCart() {
  //Якщо масив cartArr з localeStorage не пустий, то відмальовуємо товари в кошику, інакше показуємо заглушку
  if (cartArr.length !== 0) {
    refs.cartEmpty.style.visibility = 'hidden';
    refs.cartFull.style.visibility = 'visible';
    refs.list.insertAdjacentHTML('beforeend', createCartMarkUp(cartArr));

    //Обчислюємо TOTAL 
      updateTotal();
    

    // Записуємо в лічильники кількість товарів в кошику
    refs.counterCart.textContent = cartArr.length
    refs.counterMainPage.textContent = cartArr.length
  } else {
    refs.cartEmpty.style.display = 'flex'
    refs.cartFull.style.display = 'none'
  }
}

//Функція для обчислення TOTAL
function updateTotal() {
   
  const total = cartArr.reduce((previousValue, product) => {
    return previousValue + product.price
  }, 0)
  refs.totalPrice.innerHTML = total.toFixed(2)
}


//Розмітка картки в кошику
function createCartMarkUp(arr) {
  return arr
    .map(({ _id, name, img, category, price, size }) => {
      const cleanedCategory = category.replace(/_/g, ' ')

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
        </li>`
    })
    .join('')
}


//??????????????????????????????????????????????????????????????
//По кліку на кнопву Delete видаляємо товар з корзини (функція імпортується)

function updateCartList() {
  document.querySelectorAll(refs.buttonDeleteProduct).forEach(btn => {
    btn.addEventListener('click', () => {
      deleteFromCart(cartArr, btn)

      refs.list.innerHTML = createCartMarkUp(cartArr)
      updateCartList()
      updateTotal()
    })
  })
}

updateCartList()



//По кліку на кнопву Delete all очищуємо корзину
refs.buttonCleanCart.addEventListener('click', cleanCart)

function cleanCart() {
  localStorage.removeItem(KEY_CART)

    refs.cartEmpty.style.display = 'flex';
  refs.cartFull.style.display = 'none';
  
  // Щоб очистити лічильники і список,перезаписуємо пустий масив
  refs.list.innerHTML = createCartMarkUp(cartArr)
  document.querySelector('.js-cart-numbers').innerHTML = 0
  document.querySelector('#cart-count').innerHTML = 0
}


  
//Відправлення замовлення на сервер через форму
refs.formSubmit.addEventListener('submit', handlerFormSubmit)

async function handlerFormSubmit(event) {
  event.preventDefault()
  const { email } = event.target.elements

  const valid = validateEmail(email)
  console.log(valid)
  if (!valid) {
    console.log('email is invalid')
    return
  }
  //Створимо функцію, яка за допомогою map створить новий масив обєктів (лише з властивостями productId i amount), який потрібно передати на сервер
  function createProducts(cartArr) {
    const products = cartArr.map(({ _id }) => {
      const productId = _id
      const newProduct = {
        productId,
        amount: 1,
      }
      return newProduct
    })
    return products
  }
  console.log('createProducts', createProducts(cartArr))

  //Створюємо обєкт для сервера з email покупця і масивом продуктів
  const newOrder = {
    email: email.value,
    products: createProducts(cartArr),
  };
  console.log(newOrder);

  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';

  await axios
    .post('https://food-boutique.b.goit.study/api/orders', newOrder)
    .then(data => {
      console.log(data)
      // Скрываем лоадер после запроса
      document.getElementById('overlay').style.display = 'none';
    })
    .catch(err => {
      console.error(err)
    }).finally(
      () => {
        openModalSuccess()
      }
    )

    
}

function validateEmail(email) {
  // const emailPattern = `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`
  return true
}

function openModalSuccess() {
  refs.cartSuccess.classList.remove('visually-hidden')
  refs.closeSuccess.addEventListener('click', () => {
    closeSuccessCart()
  })
}


function closeSuccessCart() {
  refs.cartSuccess.classList.add('visually-hidden')
  refs.formSubmit.reset()
  cleanCart()
}