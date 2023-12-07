//Створюємо ключ для localeStorage
const KEY_CART = "cart";
//Створюємо пустий масив для доданих продуктів або наповнюємо його з localeStorage, якщо там вже щось є
const cartArr = JSON.parse(localStorage.getItem(KEY_CART)) ?? [];

//Функція для додавання товарів в LocaleStorage по кліку на кнопку корзини
function addToCart(evt, arr) {
    //При кліку на кнопку шукаємо потрібний продукт за id, викликаючи функцію findProduct
    const product=findProduct(evt.target, arr);
    cartArr.push(product);
    localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
}


//Функція пошуку необхідного продукту за id в масиві,який надходить з серверу (викликається всередині addToCart)
function findProduct (elem, arr) {
    const productId = Number(elem.dataset._id);
    return arr.find(({_id}) => _id === productId) 
}

export {KEY_CART, cartArr, addToCart, findProduct};