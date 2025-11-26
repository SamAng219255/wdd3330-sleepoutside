import { qs, getLocalStorage, setLocalStorage } from './utils.mjs';
import setCartLabel from './cart_label.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;

    // storage key for this product's comments
    this.commentsKey = `comments_product_${this.productId}`;
  }

  async init() {
    // Wait for DOM elements
    const addToCartBtn = document.getElementById('addToCart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', this.addProductToCart.bind(this));
    }

    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
      commentForm.addEventListener("submit", this.saveComment.bind(this));
    }

    // Load the product
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product details and comments
    this.renderProductDetails();
    this.loadComments();
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
    return { hasDiscount: false };
  }

  renderProductDetails() {
    qs('title').innerText = `Sleep Outside | ${this.product.Name}`;
    qs('h3').innerText = this.product.Brand.Name;
    qs('h2').innerText = this.product.NameWithoutBrand;
    qs('#tent-img').src = this.product.Image;
    qs('#tent-img').alt = this.product.Name;

    const discount = this.calculateDiscount();
    const priceElement = qs('.product-card__price');

    if (discount.hasDiscount) {
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

    qs('.product__color').innerText = this.product.Colors.ColorName;
    qs('.product__description').innerHTML = this.product.DescriptionHtmlSimple;

    if (qs('#addToCart')) {
      qs('#addToCart').setAttribute('data-id', this.productId);
    }
  }

  // -----------------------------
  //       COMMENTS SYSTEM
  // -----------------------------

  // Load comments from localStorage
  loadComments() {
    const comments = getLocalStorage(this.commentsKey) || [];
    this.renderComments(comments);
  }

  // Display comments on the page
  renderComments(comments) {
    const list = document.getElementById("commentsList");
    if (!list) return;

    list.innerHTML = ""; // clear existing comments

    comments.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${c.name}</strong>: ${c.message}<br><small>${c.date}</small>`;
      list.appendChild(li);
    });
  }

  // Handle new comment submission
  saveComment(event) {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById("username").value.trim();
    const message = document.getElementById("commentText").value.trim();

    if (!name || !message) return; // Ignore empty comments

    const comment = {
      name,
      message,
      date: new Date().toLocaleString()
    };

    // Save to localStorage
    const comments = getLocalStorage(this.commentsKey) || [];
    comments.push(comment);
    setLocalStorage(this.commentsKey, comments);

    // Re-render comments and reset form
    this.renderComments(comments);
    event.target.reset();
  }
}
