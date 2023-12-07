

//import { createCartMarkUp } from "./cart-markup";

//createCartMarkUp(cartArr);


const list = document.querySelector(".js-cart-list");
const buttonAddProduct = document.querySelector(".btn-pl");
const buttonDeleteProduct = document.querySelector(".btn-deleteProduct");
const buttonCleanCart= document.querySelector(".js-delete-all");


//Створюємо ключ для localeStorage
const KEY_CART = "cart";
//Створюємо пустий масив для доданих продуктів або наповнюємо його з localeStorage, якщо там вже щось є
const cartArr = JSON.parse(localStorage.getItem(KEY_CART)) ?? [];


buttonAddProduct.addEventListener("click", onClick); //????додавати слухачa на цій сторінці чи 1?

function onClick(evt) {
    //При кліку на кнопку шукаємо потрібний продукт за id, викликаючи функцію findProduct
    const product=findProduct(evt.target);
    cartArr.push(product);
    localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
}

//Функція пошуку необхідного продукту за id в масиві foodInfo (який надходить з серверу на 1 сторінці)
function findProduct (elem) {
    const productId = Number(elem.dataset._id);
    return foodInfo.find(({_id}) => _id === productId) //?????? як стукати до масиву foodInfo з 1 сторінки
}


function createCartMarkUp(arr) {
    const cartMarkUp = arr.map(({ _id, name, img, category, price, size }) => {
        const cleanedCategory = category.replace(/_/g, ' ');

        return `<li class="selectedProduct" data-id=${_id}>
            <div class="product-picture">
                <img src="${img}" alt="${name}" class="" loading="lazy" />
            </div>

            <div class="product-info-container">

            <div class="info-header">
                <h2 class="product-name">${name}</h2>
                <button class="btn-deleteProduct"></button>
            </div>

            <div class="product-info">
                <p class="quality"> Category: <span class="value">${cleanedCategory}</span>
                </p>
                <p class="quality"> Size:<span class="value">${size}</span></p>
            </div>
            <div class="price">
                <span>${price}</span>
            </div>
            </div>
        </li>`;
    }).join(""); 

    list.innerHTML=cartMarkUp;
}