import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { loginData } from '../test-data/loginData';

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await expect(page).toHaveURL(/inventory/);
  });

  test('user can add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addFirstProductToCart();

    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('added product should be displayed in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addFirstProductToCart();

    await productsPage.openCart();

    await expect(cartPage.cartTitle).toBeVisible();

    const cartItemCount = await cartPage.getCartItemCount();

    expect(cartItemCount).toBe(1);
  });

});