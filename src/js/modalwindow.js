import { KEY_CART, addToCart } from '../partials/JS/cart-localestorage.js';
import axios from 'axios';
import iconsSvg from '../img/icons.svg';
// https://food-boutique.b.goit.study/api/products/:id
// async function fetchInfoFood() {
//   const url = `https://food-boutique.b.goit.study/api/products/{_id}`;
//   try {
//     const responce = await axios.get(url);
//     return responce.data;
//   } catch (error) {
//     throw error;
//   }
// }

fetchInfoFood()
    .then((data) => console.log(data))
    .catch((err) => {
        console.log(err);
})

async function fetchInfoFood() {
<<<<<<< Updated upstream:src/partials/JS/modalwindow.js
const url = `https://food-boutique.b.goit.study/api/products/{Id}`;
try {
=======
  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex';

  const url = `https://food-boutique.b.goit.study/api/products/${Id}`;
  try {
>>>>>>> Stashed changes:src/js/modalwindow.js
    const responce = await axios.get(url);
    return responce.data;
} catch (error) {
    throw error;
}
}

// const modalContent = document.querySelector('.modal');

let prodList = [];

(() => {
    const refs = {
        modalClose: document.querySelector(".button-modal-close"),
        modalContent: document.querySelector('.modal-content'),
    };

    refs.modalClose.addEventListener("click", toggleModal);
    function toggleModal() {
    refs.modalContent.classList.toggle("is-hidden");
    }
});


// const modal = document.getElementById(".modal-content");
// const closeModalBtn = document.getElementById(".button-modal-close");

// // Закрываем модальное окно при нажатии на крестик
// closeModalBtn.onclick = function() {
//     modal.style.display = "none";
// }

// // Закрываем модальное окно при клике вне его области
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

async function createModalMarkup() {
const lim = 2;
try {
    let responce = await fetchDiscontFood();
    prodList = responce.slice(0, lim);
    
    const createProducts = prodList
        .map(({ img, name, popularity, desc, category, price, size, _id }) => {
            const cleanedCategory = category.replace(/_/g, ' ');
            
        return `<div class="item-pl" data-id="${_id}">
                <div class="background-img-mob">
                    <img src="${img}" alt="" class="img-mob" loading="lazy" />
                </div>
<<<<<<< Updated upstream:src/partials/JS/modalwindow.js
                <h3 class="product-name-pl">${name}</h3>
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${cleanedCategory}</b>
=======
                <h3 class="product-name-mob">${name}</h3>
                <div class="product-info-mob">
                    <p class="paragraph-mob">
                        Category: <b class="value-mob">${cleanedCategory}</b>
>>>>>>> Stashed changes:src/js/modalwindow.js
                    </p>
                    <p class="paragraph-mob">Size: <b class="value-mob">${size}</b></p>
                    <p class="paragraph-mob">Popularity: <b class="value-mob">${popularity}</b></p>
                </div>
                <p class="desc-mob">Description: <b class="value-mob">${desc}</b></p>
                <div class="price-container-pl">
                    <b class="price-mob">$${price}</b>
                    <button class="btn-mob">Add to
                        <svg class="icon-mob">
                            <use href="${iconsSvg}"></use>
                        </svg>
                    </button>
                </div>
            </div>`;
    })
    .join('');

    refs.modalContent.insertAdjacentHTML('beforeend', createProducts);
} catch (error) {
    console.error(error);
}
}

// modalClose.addEventListener("click", toggleModal);
// function toggleModal() {
//     modalContent.classList.toggle("is-hidden");
//     }

window.addEventListener('load', createModalMarkup);

const linkBag = document.querySelector('.modal-content');

linkBag.addEventListener('click', addCart);

let btn;

function addCart(evt) {
<<<<<<< Updated upstream:src/partials/JS/modalwindow.js
btn = evt.target.closest('.btn-pl');
if (evt.target.closest('.btn-pl')) {
=======
  btn = evt.target.closest('.btn-mob');
  if (evt.target.closest('.btn-mob')) {
>>>>>>> Stashed changes:src/js/modalwindow.js
    addToCart(evt, prodList);
}
const svg = btn.querySelector('.img-svg-osnova use');
svg.setAttribute('href', '../../img/icons.svg#icon-cart');
btn.setAttribute('disabled', true);
btn.style.cursor = 'auto';
}



    




// function fetchInfoFood() {
//     const url = `https://food-boutique.b.goit.study/api/products/{id}`;
//     return fetch(url).then(resp => {
//         if (!resp.ok) {
//             throw new Error(resp.statusText)
//         }
//         return resp.json()
//     });
// }
