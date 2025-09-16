import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { cart } from "../../data/cart-class.js";
import { loadProductsFetch } from '../../data/products.js';

//integration test
describe('test suite: renderOrderSummary', () => {

  //for access globally
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productName1 = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productName2 = 'Intermediate Size Basketball';

  //beforeAll hooks
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  //beforeEach hooks
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-return-to-home-link"></div>
      <div class="js-payment-summary"></div>
    `;

    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }];

    renderOrderSummary();
  });

  //afterEach hooks
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  //how the page looks
  it('displays the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual(productName1);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(productName2);
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual('$10.90');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });

  //how the page behaves
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(productName2);
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });

  //how the page behave
  it('updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50');
  });
});



/*
unit tests: testing one piece of code
integration test: tests many units/pieces of code working together

Hooks in Jasmine:
beforeEach() = runs code before each test
afterEach() = runs code after each test
beforeAll() = runs code before all test
afterAll() = runs code after all test
*/