import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

require('dotenv').config(); // For CommonJS
// or
import 'dotenv/config'; // For ES modules

test.describe.skip('Register Page', () => {
  test('should register a new user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      process.env.REGISTER_FIRSTNAME!,
      process.env.REGISTER_LASTNAME!,
      process.env.REGISTER_EMAIL!,
      process.env.REGISTER_MOBILE!,
      process.env.REGISTER_PASSWORD!
    );
    // Check for a success message or redirect (update selector as needed)
    await expect(page.locator('.success-message, [data-testid="register-success"]')).toBeVisible();
  });
}); 