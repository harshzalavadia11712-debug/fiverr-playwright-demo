import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { loginData } from '../test-data/loginData';

test.describe('Products Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await expect(page).toHaveURL(/inventory/);
  });

  test('products page should be displayed', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await expect(productsPage.productsTitle).toBeVisible();
  });

  test('products should be displayed', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
  });

  test('user can sort products by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');

    await expect(productsPage.sortDropdown).toHaveValue('lohi');
  });

});