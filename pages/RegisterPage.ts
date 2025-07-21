import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First name First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name Last name' });
    this.emailInput = page.getByRole('textbox', { name: 'Work email Work email' });
    this.mobileInput = page.getByRole('textbox', { name: 'Mobile number Mobile number' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password Password' });
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  }

  async goto() {
    await this.page.goto('https://staging.firmable.com/sign-in');
    await this.page.getByRole('link', { name: 'Sign up' }).click();
  }

  async register(firstName: string, lastName: string, email: string, mobile: string, password: string) {
    await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.mobileInput.click();
    await this.mobileInput.fill(mobile);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
} 