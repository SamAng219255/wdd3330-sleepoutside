import { renderListWithTemplate } from './utils.mjs';

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

export default class ShoppingCart {
  constructor(cartItems, listElement) {
    this.cartItems = cartItems;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.cartItems;
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(cartItemTemplate, this.listElement, list);
  }
}
