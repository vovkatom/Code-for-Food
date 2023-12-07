import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import { save, load } from './filters-localstorage';


const BASE_URL = 'https://food-boutique.b.goit.study/api';

function fetchCategories() {
    return axios.get(`${BASE_URL}/products/categories`).then(({ data }) => data);
};

const refs = {
  selector: document.querySelector('.select__body'),
  currentfilter: document.querySelector('.select__current')
};

fetchCategories()
  .then(data => {
    const markup = createSelectorMarkup(data);
    refs.selector.insertAdjacentHTML('afterbegin', markup);
    select();
    //! <<<< local storage >>>>
    refs.selector.addEventListener('click', handleCategory);
    //! <<<< local storage >>>>
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

// ! local storage !

    function handleCategory(event) {
      const category = event.target.innerText.replace(/ /g, '_');
      const obj = {
        keyword: null,
        category: `${category}`,
        page: 1,
        limit: 6,
      };
      const value = obj;
      const key = 'filter';
      save(key, value);
}
    
function onLoad() {
    const filterObj = load('filter')
    refs.currentfilter.innerText = filterObj.category.replace(/_/g, ' ');
}
onLoad();

