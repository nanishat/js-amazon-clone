import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/formateCurrency.js';
import { countQuantity } from './utils/countQuantity.js';
import { formatDate } from './utils/formatDate.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  //check if the product id matches
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  //checkif the delivery option id matches
  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const dateString = formatDate(deliveryOption);


  cartSummaryHTML += `
    <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label js-quantity-label${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" 
            data-product-id="${matchingProduct.id}">Update</span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" 
            data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">Delete</span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
        </div>
    </div>
    `;
});

//delivery option generated HTML
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const dateString = formatDate(deliveryOption);

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = (deliveryOption.id === cartItem.deliveryOptionId);

    html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}"
            >
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                </div>
            </div>
        `
  });
  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

updateCartQuantityUI();

// Function: update the cart quantity on the checkout ( 0 items )
function updateCartQuantityUI() {
  const cartQuantity = countQuantity(cart);
  const checkoutItem = document.querySelector('.js-return-to-home-link');
  if (cartQuantity < 2) {
    checkoutItem.innerHTML = `${cartQuantity} item`;
  } else {
    checkoutItem.innerHTML = `${cartQuantity} items`;
  }
}

// delete button
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      //explaination: link is connected to the 
      // .js-delete-link, for that we can get the dataset alongside with productId...which can be saved in local variable for future use... 
      const { productId } = link.dataset;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateCartQuantityUI();
    });
  });

// update button
document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.add('is-editing-quantity');
    });
  });

// save button
document.querySelectorAll('.js-save-link')
  .forEach((link) => {

    const { productId } = link.dataset;
    const inputElement = document.querySelector(`.js-quantity-input-${productId}`);

    //click event
    link.addEventListener('click', () => {
      handleUpdateQuantity(productId, inputElement);
    });

    //keydown event
    inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleUpdateQuantity(productId, inputElement);
      }
    });
  });

//handles update quantity based on onclick or keydown attribute
function handleUpdateQuantity(productId, inputElement) {
  const newQuantity = Number(inputElement.value);

  //validation with early return
  if (newQuantity <= 0 || newQuantity >= 1000) {
    alert('Quantity must be at least 0 and less than 1000');
    return;
  }

  //this works for both, onclick and keydown
  updateQuantity(productId, newQuantity);

  //update in UI
  const quantityLabel = document.querySelector(`.js-quantity-label${productId}`);
  quantityLabel.innerHTML = newQuantity;
  updateCartQuantityUI();

  //works on while editing quantity and removes classList
  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  container.classList.remove('is-editing-quantity');
}

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
    });
  });