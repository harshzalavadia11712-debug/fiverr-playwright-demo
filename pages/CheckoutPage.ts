import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;

  readonly checkoutOverview: Locator;
  readonly orderCompleteMessage: Locator;
  readonly orderCompleteHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });

    this.firstNameInput = page.getByPlaceholder('First Name');

    this.lastNameInput = page.getByPlaceholder('Last Name');

    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });

    this.finishButton = page.getByRole('button', {
      name: 'Finish',
    });

    this.checkoutOverview = page.getByText('Checkout: Overview');

    this.orderCompleteMessage = page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );

    this.orderCompleteHeader = page.getByText(
      'Thank you for your order!'
    );
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async verifyCheckoutOverview() {
    await expect(this.checkoutOverview).toBeVisible();
  }

  async verifyOrderCompleted() {
    await expect(this.orderCompleteHeader).toBeVisible();
    await expect(this.orderCompleteMessage).toBeVisible();
  }
}