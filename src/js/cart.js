import { getLocalStorage, setLocalStorage } from './utils.mjs';

const cartItems = getLocalStorage('so-cart') || [];

function renderCartContents() {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  document.querySelectorAll(".cart-card__close")
    .forEach(
      btn => btn.addEventListener(
        "click",
        e => removeFromCart(btn.dataset.id)
      )
    );
}

function removeFromCart(id) {
  cartItems.splice(cartItems.findIndex(item => item.Id == id), 1);
  setLocalStorage('so-cart', cartItems);

  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__close" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

renderCartContents();
