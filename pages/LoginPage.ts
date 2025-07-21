import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Work email Work email' });
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password Password' });
  }

  async goto() {
    await this.page.goto('https://staging.firmable.com/sign-in');
  }

  async login(email?: string, password?: string) {
    const user = email || process.env.TEST_USERNAME;
    const pass = password || process.env.TEST_PASSWORD;
    if (!user || !pass) {
      throw new Error('Login credentials are missing. Please set TEST_USERNAME and TEST_PASSWORD in your .env file.');
    }
    await this.emailInput.click();
    await this.emailInput.fill(user);
    await this.continueButton.click();
    await this.passwordInput.fill(pass);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
} 