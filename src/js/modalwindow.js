import axios from 'axios'
import iconsSvg from '/img/icons.svg'
import { addToCart } from '/js/cart-localestorage.js'

export { openModal }
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
  .then(data => console.log(data))
  .catch(err => {
    console.log(err)
  })

async function fetchInfoFood() {
  // Показываем лоадер перед запросом
  document.getElementById('overlay').style.display = 'flex'

  const url = `https://food-boutique.b.goit.study/api/products/{Id}`
  try {
    const responce = await axios.get(url)
    return responce.data
  } catch (error) {
    throw error
  } finally {
    // Скрываем лоадер после выполнения запроса
    document.getElementById('overlay').style.display = 'none'
  }
}

const modalContent = document.querySelector('.modal-content')
const closeIcon = document.querySelector(".close-icon")
let prodList = []

async function createModalMarkup() {
  const lim = 2
  try {
    let responce = await fetchDiscontFood()
    prodList = responce.slice(0, lim)

    const createProducts = prodList
      .map(({ img, name, popularity, desc, category, price, size, _id }) => {
        const cleanedCategory = category.replace(/_/g, ' ')

        return `<div class="item-pl" data-id="${_id}">
                <div class="background-img-pl">
                    <img src="${img}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${name}</h2>
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${cleanedCategory}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${size}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${popularity}</b></p>
                    <p class="paragraph-pl">Description: <b class="value-pl">${desc}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${price}</b>
                    <button class="btn-pl">Add to 
                        <svg class="icon-pl">
                            <use href="${iconsSvg}"></use>
                        </svg>
                    </button>
                </div>
            </div>`
      })
      .join('')

    modalContent.insertAdjacentHTML('beforeend', createProducts)
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('load', createModalMarkup)

const linkBag = document.querySelector('.modal-content')

linkBag.addEventListener('click', addCart)

let btn

function addCart(evt) {
  btn = evt.target.closest('.btn-pl')
  if (evt.target.closest('.btn-pl')) {
    addToCart(evt, prodList)
  }
  const svg = btn.querySelector('.img-svg-osnova use')
  svg.setAttribute('href', '../../img/icons.svg#icon-cart')
  btn.setAttribute('disabled', true)
  btn.style.cursor = 'auto'
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



///////////////////////


function openModal() {
  const modal = document.querySelector('.backdrop')

  document.querySelectorAll('.item-pl').forEach(li => {
    li.addEventListener('click', (event) => {
      // Check if the clicked element or its parent has the class .btn-pl
      if (!event.target.closest('.btn-pl')) {
        modal.classList.add('active')
        closeModal(modal)
      }
    })
  })
}


function closeModal(modal) {
  const closeButton = modal.querySelector('.button-modal-close')

  function closeModalHandler() {
    modal.classList.remove('active')
    document.removeEventListener('keydown', escKeyHandler)
  }

  function escKeyHandler(event) {
    if (event.key === 'Escape') {
      closeModalHandler()
    }
  }

  closeButton.addEventListener('click', closeModalHandler)
  document.addEventListener('keydown', escKeyHandler)
}
