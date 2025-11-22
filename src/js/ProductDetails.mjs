import { qs, getLocalStorage, setLocalStorage } from './utils.mjs';
import setCartLabel from './cart_label.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));

    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();
  }
  addProductToCart() {
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
    setCartLabel(cart.length);
  }

  calculateDiscount() {
    const listPrice = this.product.ListPrice;
    const finalPrice = this.product.FinalPrice;
    
    if (listPrice > finalPrice) {
      const discountAmount = listPrice - finalPrice;
      const discountPercent = Math.round((discountAmount / listPrice) * 100);
      return {
        hasDiscount: true,
        discountPercent: discountPercent,
        discountAmount: discountAmount.toFixed(2)
      };
    }
    
    return {
      hasDiscount: false
    };
  }

  renderProductDetails() {
    qs('title').innerText = `Sleep Outside | ${this.product.Name}`;
    qs('h3').innerText = this.product.Brand.Name;
    qs('h2').innerText = this.product.NameWithoutBrand;
    qs('#tent-img').src = this.product.Images.PrimaryLarge;
    qs('#tent-img').alt = this.product.Name;

    const discount = this.calculateDiscount();
    const priceElement = qs('.product-card__price');

    if(discount.hasDiscount) {
      priceElement.innerHTML = `
        <div class="product-detail__discount">
          <span class="discount-badge">${discount.discountPercent}% OFF</span>
        </div>
        <span class="product-card__original-price">$${this.product.ListPrice.toFixed(2)}</span>
        <span class="product-card__final-price">$${this.product.FinalPrice.toFixed(2)}</span>
      `;
    } else {
      priceElement.innerText = `$${this.product.ListPrice.toFixed(2)}`;
    }

    // qs('.product-card__price').innerText = `$${this.product.ListPrice}`;
    qs('.product__color').innerText = this.product.Colors.ColorName;
    qs('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
    qs('#addToCart').setAttribute('data-id', this.productId);
  }
}
