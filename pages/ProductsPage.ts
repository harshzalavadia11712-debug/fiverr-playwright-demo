import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  // Page elements
  readonly productsTitle: Locator;
  readonly sortDropdown: Locator;
  readonly shoppingCartLink: Locator;
  readonly cartBadge: Locator;
  readonly productItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsTitle = page.getByText('Products', { exact: true });

    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );

    this.shoppingCartLink = page.locator(
      '[data-test="shopping-cart-link"]'
    );

    this.cartBadge = page.locator(
      '[data-test="shopping-cart-badge"]'
    );

    this.productItems = page.locator(
      '[data-test="inventory-item"]'
    );
  }

  // Verify Products page
  async verifyProductsPage() {
    await expect(this.productsTitle).toBeVisible();
  }

  // Sort products
  async sortBy(sortValue: string) {
    await this.sortDropdown.selectOption(sortValue);
  }

  // Add a specific product to cart
  async addProductToCart(productName: string) {
    const product = this.productItems.filter({
      hasText: productName,
    });

    await expect(product).toBeVisible();

    await product.getByRole('button', {
      name: /Add to cart/i,
    }).click();
  }

  // Alias for compatibility with existing tests
  async addProduct(productName: string) {
    await this.addProductToCart(productName);
  }

  // Add the first product displayed on the page
  async addFirstProductToCart() {
    const firstProduct = this.productItems.first();

    await expect(firstProduct).toBeVisible();

    await firstProduct.getByRole('button', {
      name: /Add to cart/i,
    }).click();
  }

  // Open shopping cart
  async openCart() {
    await this.shoppingCartLink.click();
  }

  // Alias used by checkout tests
  async goToCart() {
    await this.openCart();
  }

  // Get a specific product
  getProduct(productName: string): Locator {
    return this.productItems.filter({
      hasText: productName,
    });
  }

  // Get product name
  getProductName(productName: string): Locator {
    return this.getProduct(productName).locator(
      '[data-test="inventory-item-name"]'
    );
  }

  // Get product price
  getProductPrice(productName: string): Locator {
    return this.getProduct(productName).locator(
      '[data-test="inventory-item-price"]'
    );
  }

  // Get product description
  getProductDescription(productName: string): Locator {
    return this.getProduct(productName).locator(
      '[data-test="inventory-item-desc"]'
    );
  }

  // Remove a product from cart
  async removeProduct(productName: string) {
    const product = this.getProduct(productName);

    await product.getByRole('button', {
      name: /Remove/i,
    }).click();
  }

  // Get total number of products
  async getProductCount() {
    return await this.productItems.count();
  }
}