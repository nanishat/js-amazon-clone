import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/* runs multiple promises at the same time
Promise.all([
  //just because, fetch can return a new promise from over there, we can reduce some extra code like resolve here...
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((value) => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* example of promises
new Promise((resolve) => {
  loadProducts(() => {
    resolve('ola!');
  });
}).then((val) => {

  console.log(val);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
})
*/

/* example of callback hell
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

/* Promise description
Promise() is a class, it runs the inner function immediatley...
'resolve()' is a function
-> similer to done() function from jasmine
-> let us control when to go to the next step

while Promise start a code right away to execute, resolve is just like a friend who holds a flag, and wait for that function which is inside of Promise class is to finish first, then we go to 'next step'...

new Promise((resolve) => {
  console.log('start promise');
  loadProducts(() => {
    console.log('finished loading');
    resolve();
  });
}).then(() => {
  console.log('next step');
})

*/

/* async-await description
-> shortcut for promises
-> let us write asynchronous code like normal code
*/