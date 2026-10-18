import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // Cart page elements
  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Cart page title
    this.cartTitle = page.getByText('Your Cart', { exact: true });

    // Cart products
    this.cartItems = page.locator('.cart_item');

    // Cart buttons
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  /**
   * Verify cart page is displayed
   */
  async verifyCartPage() {
    await expect(this.cartTitle).toBeVisible();
  }

  /**
   * Get number of products currently in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get a specific cart item by product name
   */
  cartItem(productName: string): Locator {
    return this.cartItems.filter({
      hasText: productName,
    });
  }

  /**
   * Remove a product from cart
   */
  async removeProduct(productName: string) {
    const item = this.cartItem(productName);

    await item
      .getByRole('button', {
        name: /Remove/i,
      })
      .click();
  }

  /**
   * Verify a product is displayed in cart
   */
  async verifyProductInCart(productName: string) {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  /**
   * Verify a product is NOT displayed in cart
   */
  async verifyProductNotInCart(productName: string) {
    await expect(this.cartItem(productName)).not.toBeVisible();
  }

  /**
   * Click Checkout
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Click Continue Shopping
   */
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }
}