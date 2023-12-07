import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';

const BASE_URL = 'https://food-boutique.b.goit.study/api';

function fetchCategories() {
    return axios.get(`${BASE_URL}/products/categories`).then(({ data }) => data);
};

const refs = {
  selector: document.querySelector('.select__body'),
};

fetchCategories()
  .then(data => {
    const markup = createSelectorMarkup(data);
      refs.selector.insertAdjacentHTML('beforeend', markup);
      select();
  })
  .catch(error => {
    Notiflix.Notify.failure(
      `❌ Oops! Something went wrong! Error ${error} Try reloading the page! ❌`
    );
  });

function createSelectorMarkup(arr) {
  return arr
    .map(
      category => `<div class="select__item">${category.replace(/_/g, ' ')}</div>`
    )
    .join('');
}




// !------------------- SELECT JS -----------------!\\
let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest('.select'),
      currentText = select.querySelector('.select__current');
    currentText.innerText = text;
    select.classList.remove('is-active');
  }
};

