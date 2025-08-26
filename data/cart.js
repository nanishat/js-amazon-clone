export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

// Function: update cart based on productId and dropdown
export function updateCart(productId) {
    const dropDown = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(dropDown.value);

    let matchingItem;

    cart.forEach((cartItem) => {
        //cartItem = productId and quantity; as we pushed it
        if (productId === cartItem.productId) {
            //if product has found in the cartItem, we can store that product into a variable
            matchingItem = cartItem;
        }
    });

    //if we did find a productID/productId in the cartItem, it will be stored in the matchingItem, eventually it will return truthy value
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

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}