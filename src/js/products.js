import axios from 'axios';
import { KEY_CART, cartArr, addToCart, findProduct } from '../partials/JS/cart-localestorage';
import iconSvg from "../img/icons.svg"

async function fetchFood(page, limit) {
    const url = `https://food-boutique.b.goit.study/api/products?page=${page}&limit=${limit}`
    try {
        const responce = await axios.get(url)
        return responce;
    }
    catch(error) {
        throw error
    }
}

const refs = {
    list: document.querySelector(".product-list"),
}

let page = 1;
let limit = 9;
let foodInfo = [];

async function fetchAndRender() {
    // визначається скільки завантажиться li в залежності від ширини екрана
    // if (window.innerWidth < 1440 && window.innerWidth > 767) {
    //     limit = 8;
    // }
    // else if (window.innerWidth < 768) {
    //     limit = 6;
    // }
    // else {
    //     limit = 9;
    // }
    const categoryInfo = fetchFoodCategory()
    
    try {
        let responce;
        if (!categoryInfo) {
            responce = await fetchFood(page, limit);
        } else {
            responce = await fetchFoodCategory(categoryInfo.page, categoryInfo.limit)
        }
        foodInfo = responce.data.results
        renderFoodItems(foodInfo);
    }
    catch (error) {
        console.error(error)
    }
}


function renderFoodItems(foodInfo) {
    const storage = localStorage.getItem(KEY_CART);

const createElement = foodInfo.map(({ img, name, popularity, category, price, size, _id }) => {
    const cleanedCategory = category.replace(/_/g, ' ');
    
    const isIDInLocaleStorage = storage ? JSON.parse(storage).some(item => item._id === _id) : false;

    const svgHref = isIDInLocaleStorage ? `${iconSvg}#icon-cart` : `${iconSvg}#icon-shopping-cart`;

                return `<li class="item-pl" data-id="${_id}">
                <div class="background-img-pl">
                    <img src="${img}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h3 class="product-name-pl">${name}</h3>
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${cleanedCategory}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${size}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${popularity}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${price}</b>
                    <button class="btn-pl" ${isIDInLocaleStorage ? 'disabled' : ''}>
                        <svg class="icon-pl">
                            <use href="${svgHref}"></use>
                        </svg>
                    </button>
                </div>
            </li>`;
}).join("");
            refs.list.insertAdjacentHTML("beforeend", createElement);
}

window.addEventListener("load", fetchAndRender)

refs.list.addEventListener("click", handleButtonClick)

function handleButtonClick(event) {
    // отримуємо елемент, на якому відбувся клік 
    const clickedElement = event.target;
    // Знаходимо найближчий батьківський елемнт типу button  
    const closestButton = clickedElement.closest('button');
    // перевіряємо чи знайдено кнопку 
    if (closestButton) {
    // Знаходимо найближчий батьківський елемент li
        const closestLi = closestButton.closest('li');
    // перевіряємо чи знайдено li
        if (closestLi) {
            // отримуємо значення data-id з li
            const dataId = closestLi.dataset.id;
            // знаходимо продукт за id в масиві foodInfo
            const clickedProduct = foodInfo.find(product => product._id === dataId);
            // перевірка чи знайдено продукт
            if (clickedProduct) {
            // виклик функції на додавання в localeStorage
                add(clickedProduct, foodInfo)
            }
        }
        // знаходимо елемент use в середині кнопки
        const svg = closestButton.querySelector('.icon-pl use');
        // зміна svg
        svg.setAttribute('href', `${iconSvg}#icon-cart`);
        // btn off
        closestButton.setAttribute('disabled', true);
    }
}

function add(elem, arr) {
  //При кліку на кнопку шукаємо потрібний продукт за id, викликаючи функцію findProduct
  const product = findP(elem, arr);
  cartArr.push(product);
  localStorage.setItem(KEY_CART, JSON.stringify(cartArr));
}


//Функція пошуку необхідного продукту за id в масиві,який надходить з серверу (викликається всередині addToCart)
function findP(elem, arr) {
    const productId = elem._id;
  return arr.find(({ _id }) => _id === productId);
}

// Фільтр по категоріям

const KEY_CATEGORY = 'filter' 

function getCategoriesFromLS() {
    const storage = localStorage.getItem(KEY_CATEGORY)
    try {
        const parseData = JSON.parse(storage)
        const { keyword, category, page, limit } = parseData
        return { keyword, category, page, limit }
    }
    catch (error) {
        console.error(error)
        return null
    }
} 

function fetchFoodCategory() {
    const obj = getCategoriesFromLS();
    if (obj) {
        const url = `https://food-boutique.b.goit.study/api/products?category=${obj.category}&page=${obj.page}&limit=${obj.limit}`
        try {
         const responce = axios.get(url)
        return responce;
    }
    catch(error) {
        throw error
    }
    } 
}

