import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe.skip('Skipping Login Page', () => {
  //test.describe.('Login Page', () => {
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    // After login, check for dashboard header as a sign of success
    const homePage = new HomePage(page);
    await expect(homePage.startSearchDiv1).toBeVisible();
  });
}); 