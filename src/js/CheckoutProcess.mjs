import { formDataToObject } from './utils.mjs';
import ExternalServices from "./ExternalServices.mjs";

function packageItems(cartItems) {
  return cartItems.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1
  }));
}

export default class CheckoutProcess {
  constructor(cartItems, summaryElem) {
    this.cartItems = cartItems;
    this.summaryElem = summaryElem;
  }

  displaySubtotal() {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    this.summaryElem.innerHTML = `
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax: —</p>
      <p>Shipping: —</p>
      <hr>
      <p>Total: —</p>
    `;
  }

  displayTotal() {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    this.tax = subtotal * 0.06;
    this.shipping = 8 + 2 * this.cartItems.length;
    this.total = subtotal + this.tax + this.shipping;
    this.summaryElem.innerHTML = `
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax: $${this.tax.toFixed(2)}</p>
      <p>Shipping: $${this.shipping.toFixed(2)}</p>
      <hr>
      <p>Total: $${this.total.toFixed(2)}</p>
    `;
  }

  async checkout() {
    const formElem = document.forms['checkout'];
    const formData = formDataToObject(formElem);

    formData.items = packageItems(this.cartItems);
    formData.tax = this.tax;
    formData.shipping = this.shipping;
    formData.total = this.total;
    formData.orderDate = new Date().toISOString();

    try {
      console.log(await ExternalServices.checkout(formData));
    }
    catch(err) {
      console.error(err);
    }
  }
}