import { getLocalStorage, setLocalStorage, qs, loadHeaderFooter } from './utils.mjs';
import setCartLabel from './cart_label.mjs';
import ShoppingCart from './ShoppingCart.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const cartItems = getLocalStorage('so-cart') || [];
const cartElem = qs('.product-list');

let addressUpdateFunction;

const cart = new ShoppingCart(cartItems, cartElem, () => {
  document
    .querySelectorAll('.cart-card__close')
    .forEach((btn) =>
      btn.addEventListener('click', () => removeFromCart(btn.dataset.id))
    );
});
cart.renderList();

const summaryElem = qs('.checkout-summary');


function removeFromCart(id) {
  cartItems.splice(
    cartItems.findIndex((item) => item.Id == id),
    1,
  );
  setLocalStorage('so-cart', cartItems);

  cart.renderList();
  setCartLabel(cartItems.length);
}

loadHeaderFooter();