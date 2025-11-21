import { getLocalStorage, setLocalStorage, qs, loadHeaderFooter } from './utils.mjs';
import setCartLabel from './cart_label.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const cartItems = getLocalStorage('so-cart') || [];
const cartElem = qs('.product-list');

const cart = new ShoppingCart(cartItems, cartElem, () => {
  document
    .querySelectorAll('.cart-card__close')
    .forEach((btn) =>
      btn.addEventListener('click', () => removeFromCart(btn.dataset.id))
    );
    if(cart.cartItems.length > 0) {
      const cartFooter = document.getElementById('cart-footer');
      cartFooter.classList.remove('hide');
      const totalElem = document.getElementById('cart-total');
      totalElem.innerText = `Total: $${cart.total.toFixed(2)}`;
    }
  }
);
cart.renderList();

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