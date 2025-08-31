import { cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { countQuantity } from './utils/countQuantity.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
    <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
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
            <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
});

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
        link.addEventListener('click', () => {
            const { productId } = link.dataset;

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );

            container.classList.remove('is-editing-quantity');

            const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(inputElement.value);

            updateQuantity(productId, newQuantity);
        });
    });
