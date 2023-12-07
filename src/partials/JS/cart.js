
import {KEY_CART, cartArr} from "./cart-localestorage";
//import { createCartMarkUp } from "./cart-markup";



const Number=document.querySelector(".js-cart-numbers")
const list = document.querySelector(".js-cart-list");
const cartEmpty=document.querySelector(".empty-cart");
const cartFull=document.querySelector(".cart-full");
const buttonDeleteProduct = document.querySelector(".btn-deleteProduct");
const buttonCleanCart= document.querySelector(".js-delete-all");


    
createCartMarkUp(cartArr, list);


function createCartMarkUp(arr, list) {
    let cartMarkUp;
    if (arr.length) {
        cartMarkUp = arr.map(({ _id, name, img, category, price, size }) => {
        const cleanedCategory = category.replace(/_/g, ' ');
        cartEmpty.disabled=true;
        cartFull.disabled=false;
        Number.textContent=cartArr.length;

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
    } else{
        cartEmpty.disabled=false;
        cartFull.disabled=true;
    }
    list.innerHTML=cartMarkUp;
}
