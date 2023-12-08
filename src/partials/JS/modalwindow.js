import { addToCart } from '/partials/JS/cart-localestorage.js';
import axios from 'axios';
import iconsSvg from '../../img/icons.svg';
// https://food-boutique.b.goit.study/api/products/:id
async function fetchInfoFood() {
  const url = `https://food-boutique.b.goit.study/api/products/:id`;
  try {
    const responce = await axios.get(url);
    return responce.data;
  } catch (error) {
    throw error;
  }
}

const refs = {
    modalContent: document.querySelector(".modal__content"),
    closeIcon: document.querySelector(".close-icon")
}


