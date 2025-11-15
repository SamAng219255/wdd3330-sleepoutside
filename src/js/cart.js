import { getLocalStorage, setLocalStorage, qs, loadHeaderFooter } from './utils.mjs';
import setCartLabel from './cart_label.mjs';
import ShoppingCart from './ShoppingCart.mjs';

function removeFromCart(id) {
  cartItems.splice(
    cartItems.findIndex((item) => item.Id == id),
    1,
  );
  setLocalStorage('so-cart', cartItems);

  renderCartContents();
  setCartLabel(cartItems.length);
}

const cartItems = getLocalStorage('so-cart') || [];
const cartElem = qs('.product-list');

const cart = new ShoppingCart(cartItems, cartElem);
cart.init();

document
  .querySelectorAll('.cart-card__close')
  .forEach((btn) =>
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id)),
  );

loadHeaderFooter();