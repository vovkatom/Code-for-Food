import { cartArr } from './cart-localestorage';

document.addEventListener('DOMContentLoaded', updateCartNumber);

function updateCartNumber() {
    let numberOfItems = cartArr.length;
    let cartEl = document.getElementById('cart-count');
    if (cartEl) {
        cartEl.textContent = numberOfItems.toString();
    }
}

export {updateCartNumber};
