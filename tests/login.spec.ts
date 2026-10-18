import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../test-data/loginData';

test.describe('Login Tests', () => {

  test('user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(loginPage.productsText).toBeVisible();
  });


  test('invalid user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginData.invalidUser.username,
      loginData.invalidUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });


  test('locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginData.lockedUser.username,
      loginData.lockedUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

});