export { KEY_CART, addToCart, cartArr, deleteFromCart, findProduct };
import { updateCartNumber } from './header';

const refs = {
  cartEmpty: document.querySelector('.js-empty-cart'),
  cartFull: document.querySelector('.cart-full'),
};

//Створюємо ключ для localeStorage
const KEY_CART = 'cart';
//Створюємо пустий масив для доданих продуктів або наповнюємо його з localeStorage, якщо там вже щось є
const cartArr = JSON.parse(localStorage.getItem(KEY_CART)) ?? [];
//Оголосимо зміну для запису id вибраного продукту
let productId;

//Функція для додавання товарів в LocaleStorage по кліку на кнопку корзини
function addToCart(evt, arr) {
  //При кліку на кнопку шукаємо потрібний продукт за id, викликаючи функцію findProduct
  const product = findProduct(evt.target, arr);
  cartArr.push(product);
  localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
  //Функція оновлення кількості товарів у кошику (імпортується)
  updateCartNumber();
}

//Функція пошуку необхідного продукту за id в масиві,який надходить з серверу (викликається всередині addToCart)
function findProduct(elem, arr) {
  productId = elem.dataset._id;
  return arr.find(({ _id }) => _id === productId);
}

//Функція для видалення товару з LocaleStorage по кліку на кнопку delete на картці товару
function deleteFromCart(cartArr, btn) {
  try {
    const selectedProduct = btn.closest('.selectedProduct').dataset.id;
    //Перебираємо масив корзини, шукаємо індекс продукту з вибраним id і видаляємо його з масиву за індексом
    if (selectedProduct) {
      for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i]._id === selectedProduct) {
          cartArr.splice(i, 1);
          localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
          updateCartNumber();
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    //Коли в масиві не залишилося обєктів, видаляємо його з сховища
    if (cartArr.length === 0) {
      localStorage.removeItem(KEY_CART);
      refs.cartEmpty.style.display = 'flex';
      refs.cartFull.style.display = 'none';
      document.querySelector('.js-cart-numbers').innerHTML = 0;
      document.querySelector('#cart-count').innerHTML = 0;
    }
  }
}
