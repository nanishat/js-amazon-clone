import { cart } from '../data/cart-class.js';
import { products, loadProducts } from '../data/products.js';
import { countQuantity } from './utils/countQuantity.js';

loadProducts(renderProductsGrid);

// callback function -> renderProductsGrid()
// this function will run in the future, after loading products successfully

function renderProductsGrid() {

  let productsHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProduct = products;

  if (search) {
    filteredProduct = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLocaleLowerCase())) {
          matchingKeyword = true;
        }
      });
      return matchingKeyword ||
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    })
  }
  //code for generate html for each product from products
  filteredProduct.forEach((product) => {
    productsHTML +=
      `
        <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsURL()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        //getting product name from data-attribute 'data-product-name' from the genereted html...
        //const productId = button.dataset.productId;

        //using destructuring
        const { productId } = button.dataset;

        //moved these two lines of code from cart.js -> updateCart function to here, in order to achieve loosely coupled feature
        const dropDown = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(dropDown.value);

        cart.updateCart(productId, quantity);
        updateCartQuantityUI();
        cart.addedTextFeature(productId);

      });
    });

  // Function: update cart quantity on UI
  function updateCartQuantityUI() {
    const cartQuantity = countQuantity(cart);
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  updateCartQuantityUI();

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `index.html?search=${search}`;
    })
}