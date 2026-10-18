import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { loginData } from '../test-data/loginData';

test.describe('Checkout Tests', () => {

  test('user can complete checkout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    // Add product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Go to cart
    await productsPage.goToCart();

    // Verify product is in cart
    await expect(
      cartPage.cartItem('Sauce Labs Backpack')
    ).toBeVisible();

    // Start checkout
    await checkoutPage.startCheckout();

    // Fill customer information
    await checkoutPage.fillCustomerInformation(
      'Harsh',
      'Zalavadia',
      '380001'
    );

    // Continue to overview
    await checkoutPage.continueToOverview();

    // Verify overview page
    await checkoutPage.verifyCheckoutOverview();

    // Complete order
    await checkoutPage.completeOrder();

    // Verify order completion
    await checkoutPage.verifyOrderCompleted();
  });

});