export { KEY_CART, cartArr, addToCart, deleteFromCart,  findProduct };


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
  console.log(product);
}

//Функція пошуку необхідного продукту за id в масиві,який надходить з серверу (викликається всередині addToCart)
function findProduct(elem, arr) {
  productId = elem.dataset._id;
  return arr.find(({ _id }) => _id === productId);
} 


//???????????????????????????????????????????????????????????????????
//Функція для видалення товарів з LocaleStorage по кліку на кнопку delete
function deleteFromCart(evt, cartArr) {
  //Перебираємо масив корзини, шукаємо індекс продукту з вибраним id і видаляємо його з масиву за індексом
  for (let i= 0; i < cartArr.length; i += 1 ) {
    productId = evt.target.dataset._id;
    if (cartArr[i]._id === productId) {
      cartArr.splice(i, 1); 
      localStorage.setItem(KEY_CART, JSON.stringify(cartArr)); 
  }
}

}

//console.log(evt.target);
//console.log(deleteFromCart(evt, cartArr));









