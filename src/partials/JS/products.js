import axios from 'axios';

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
let limit;
let foodInfo = [];
let id = 0;

async function fetchAndRender() {
    if (window.innerWidth < 1440 && window.innerWidth > 767) {
        limit = 8;
    }
    else if (window.innerWidth < 768) {
        limit = 6;
    }
    else {
        limit = 9;
    }
    try {   
        const responce = await fetchFood(page, limit)
        foodInfo = responce.data.results;

        const createElement = foodInfo.map(({ img, name, popularity, category, price, size }) => {
            const cleanedCategory = category.replace(/_/g, ' ');
            const correctPrice = `$${price}`
            id = id + 1;

            return `<li class="item-pl" data-id="${id}">
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
                    <b class="price-pl">${correctPrice}</b>
                    <button class="btn-pl">
                        <svg class="icon-pl">
                            <use href="./img/icons.svg#icon-shopping-cart"></use>
                        </svg>
                    </button>
                </div>
            </li>`;
        }).join("");

        refs.list.insertAdjacentHTML("beforeend", createElement);
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener("load", fetchAndRender)

refs.list.addEventListener("click", handleClick)

function handleClick(event) {
   const clickedElement = event.target;
    const closestLi = clickedElement.closest('li');
    if (closestLi) {
        const dataId = closestLi.dataset.id;
        console.log(dataId);
    }
}