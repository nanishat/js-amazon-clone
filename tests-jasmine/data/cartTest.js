import { updateCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: updateCart', () => {
  it('adds an existing product into the cart', () => {

  });

  it('adds a new product into the cart', () => {
    //in order to prevent saving mock into localStorage
    spyOn(localStorage, 'setItem');

    //mock: localStorage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    updateCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});

/*
test case 2:
flaky test = test that sometimes passes and sometimes fails
mock = lets us replace a method with a fake version
to execute mock: spyOn(object, 'method name') --- which returns an object, there is a property in that object named 'and', which we can use to call another method named 'callFake' AKA Mock...
*/