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
    const tax = subtotal * 0.06;
    const shipping = 8 + 2 * this.cartItems.length;
    const total = subtotal + tax + shipping;
    this.summaryElem.innerHTML = `
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax: $${tax.toFixed(2)}</p>
      <p>Shipping: $${shipping.toFixed(2)}</p>
      <hr>
      <p>Total: $${total.toFixed(2)}</p>
    `;
  }
}