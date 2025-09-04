import { countQuantity } from "./countQuantity.js";
import { cart } from '../../data/cart.js';

// Function: update the cart quantity on the checkout-header-section
//  ( 0 items )
export function updateCartQuantityUI() {
  const cartQuantity = countQuantity(cart);
  const checkoutItem = document.querySelector('.js-return-to-home-link');
  if (cartQuantity < 2) {
    checkoutItem.innerHTML = `${cartQuantity} item`;
  } else {
    checkoutItem.innerHTML = `${cartQuantity} items`;
  }
}