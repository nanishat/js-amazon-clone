import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}

//save cart to the localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function: update cart based on productId and dropdown
export function updateCart(productId, quantity = 1) {
  //gave a default value quantity = 1, to avoid undefined

  let matchingItem = cart.find(cartItem => cartItem.productId === productId);

  /*
  let matchingItem;
  cart.forEach((cartItem) => {
    //cartItem = productId and quantity; as we pushed it
    if (productId === cartItem.productId) {
      //if product has found in the cartItem, we can store that product into a variable
      matchingItem = cartItem;
    }
  });
  */

  //if we did find a productID/productId in the cartItem, it will be stored in the matchingItem, eventually it will return truthy value
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      //productId: productId,
      //quantity: quantity

      //using shorthand
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

//an empty object to store each products timeout
const addedMessageTimeouts = {};

// Function: show 'Added' message based on productId
export function addedTextFeature(productId) {

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

//Function: remove from the cart based on productId
export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    return;
  }

  if (!validDeliveryOption(deliveryOptionId)) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log('load cart success!');

    func();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}