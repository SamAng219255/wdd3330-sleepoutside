export default class CheckoutProcess {
  constructor(cartItems, summaryElem) {
    this.cartItems = cartItems;
    this.summaryElem = summaryElem;
  }

  displaySubtotal() {
    this.subtotal = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    this.summaryElem.innerHTML = `
      <p>Subtotal: $${this.subtotal.toFixed(2)}</p>
      <p>Tax: —</p>
      <p>Shipping: —</p>
      <hr>
      <p>Total: —</p>
    `;
  }

  displayTotal() {
    const tax = this.subtotal * 0.06;
    const shipping = 8 + 2 * this.cartItems.length;
    const total = this.subtotal + tax + shipping;
    this.summaryElem.innerHTML = `
      <p>Subtotal: $${this.subtotal.toFixed(2)}</p>
      <p>Tax: $${tax.toFixed(2)}</p>
      <p>Shipping: $${shipping.toFixed(2)}</p>
      <hr>
      <p>Total: $${total.toFixed(2)}</p>
    `;
  }
}