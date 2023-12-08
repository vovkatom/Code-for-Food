// import debounce from "lodash.debounce";
import axios from "axios";
// import {createMarkup} from './'


let search = document.querySelector('.search-input');
let value = search.value;
console.log(value);

// Запис в LocaleStorage
function saveInputToLocalStorage(value) {
    localStorage.setitem('userInput', value);
}

// Функція для виклику запиту та отримання списку продуктів
const BASE_URL = 'https://food-boutique.b.goit.study/api/';
const productsEndpoint = 'products/'

function fetchProducts() {
    return axios.get(`${BASE_URL}${products}`)
    .then(({data}) => data)
}


// const refs = {
//     label: document.querySelector('.search-label'),
//     input: document.querySelector('.search-input')
// }




// refs.input.addEventListener('input', _.debounce() => {
//     fetchProducts()
// });

// function onValueInput() {

// }