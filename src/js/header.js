// import axios from 'axios';
import { cartArr } from '../partials/JS/cart-localestorage';

document.addEventListener('DOMContentLoaded', onItemNumber);

async function updateCartNumber() {
    let numberOfItems = cartArr.length;
    console.log(numberOfItems);

    let cartEl = document.getElementById('cart-count');

    if (cartEl) {
        cartEl.textContent = numberOfItems.toString();
    }
    console.log(cartEl);
}

export {updateCartNumber};
