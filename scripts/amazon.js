let productsHTML = '';

//code for generate html for each product from products
products.forEach((product) => {
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
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
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
      //getting product name from data-attribute 'data-product-name' on the genereted html...
      //const productId = button.dataset.productId;

      //using destructuring
      const { productId } = button.dataset;

      updateCart(productId);
      updateCartQuantityUI();
      addedTextFeature(productId);

    });
  });


// Function: update cart based on productId and dropdown
function updateCart(productId) {
  //cart quantity selector
  const dropDown = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(dropDown.value);

  let matchingItem;

  cart.forEach((item) => {
    //item = productId and quantity; as we pushed it
    if (productId === item.productId) {
      //if product has found in the item, we can store that product into a variable
      matchingItem = item;
    }
  });

  //if we did find a productID/productId in the item, it will be stored in the matchingItem, eventually it will return truthy value
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      //productId: productId,
      //quantity: quantity

      //using shorthand
      productId,
      quantity
    });
  }
}

// Function: update cart quantity on UI
function updateCartQuantityUI() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

//an empty object to store each products timeout
const addedMessageTimeouts = {};

// Function: show 'Added' message based on productId
function addedTextFeature(productId) {

  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-visible');

  //check, if there's a previous timeout for this product, If there is, we should stop it
  const previousTimeoutID = addedMessageTimeouts[productId];

  if (previousTimeoutID) {
    clearTimeout(previousTimeoutID);
  }

  const timeoutID = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);

  //saving the timeoutID for this prodcut, so we can stop it later if we need to...
  addedMessageTimeouts[productId] = timeoutID;
  //console.log(addedMessageTimeouts); //you can observe it
}