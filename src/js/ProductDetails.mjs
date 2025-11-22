import { qs, getLocalStorage, setLocalStorage } from './utils.mjs';
import setCartLabel from './cart_label.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {

    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }
  addProductToCart() {
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
    setCartLabel(cart.length);
  }
  renderProductDetails() {
    qs('title').innerText = `Sleep Outside | ${this.product.Name}`;
    qs('h3').innerText = this.product.Brand.Name;
    qs('h2').innerText = this.product.NameWithoutBrand;
    qs('#tent-img').src = this.product.Images.PrimaryLarge;
    qs('#tent-img').alt = this.product.Name;
    qs('.product-card__price').innerText = `$${this.product.ListPrice}`;
    qs('.product__color').innerText = this.product.Colors.ColorName;
    qs('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
    qs('#addToCart').setAttribute('data-id', this.productId);
  }
}
