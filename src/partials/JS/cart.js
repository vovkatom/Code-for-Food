
import {KEY_CART, cartArr} from "./cart-localestorage";


const refs = {
    counterCart: document.querySelector(".js-cart-numbers"),
    counterMainPage: document.querySelector("#cart-count"),
    list : document.querySelector(".js-cart-list"),
    cartEmpty:document.querySelector(".empty-cart"),
    cartFull:document.querySelector(".cart-full"),
    buttonDeleteProduct : document.querySelector(".btn-deleteProduct"),
    buttonCleanCart: document.querySelector(".delete-all-btn"),
    }


 
//Функція наповнення кошика при оновленні сторінки
fillCart();

function fillCart() {
    //Якщо масив cartArr з localeStorage не пустий, то відмальовуємо товари в кошику, інакше показуємо заглушку
    if (cartArr.length !== 0 ){
            refs.cartEmpty.style.visibility = "hidden";
            refs.cartFull.style.visibility = "visible";
            refs.list.insertAdjacentHTML("beforeend", createCartMarkUp(cartArr));
         // Записуємо в лічильники кількість товарів в кошику
            refs.counterCart.textContent=cartArr.length;
            refs.counterMainPage.textContent=cartArr.length;
                        
    } else{
            refs.cartEmpty.style.display= "block";
            refs.cartFull.style.display= "none";  
    }
}

//Розмітка картки в кошику
function createCartMarkUp(arr) {
        return arr.map(({ _id, name, img, category, price, size }) => {
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
    }).join(""); 
        
    }

    //По кліку на кнопву Delete all очищуємо корзину
    refs.buttonCleanCart.addEventListener("click", cleanCart);

    function cleanCart() {
        localStorage.removeItem(KEY_CART);
        
        //refs.cartEmpty.style.display= "block";
        //refs.cartFull.style.display= "none";
        refs.cartEmpty.style.visibility = "visible";
        refs.cartFull.style.visibility = "hidden";


        // Як правильно очистити лічильники і список, бо очищається лише при оновлені сторінки
        //refs.counterCart.textContent= "0";
        //refs.counterMainPage.textContent="0";
        //cartArr.length === 0;
        //refs.list.innerHTML === "";
    }

