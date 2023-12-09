// import axios from 'axios';
import { cartArr } from '/js/cart-localestorage';

document.addEventListener('DOMContentLoaded', updateCartNumber);

function updateCartNumber() {
    let numberOfItems = cartArr.length;
    console.log(numberOfItems);

    let cartEl = document.getElementById('cart-count');

    if (cartEl) {
        cartEl.textContent = numberOfItems.toString();
    }
    console.log(cartEl);
}

export {updateCartNumber};
