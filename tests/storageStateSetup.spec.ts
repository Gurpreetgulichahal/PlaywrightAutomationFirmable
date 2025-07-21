require('dotenv').config();

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.use({ storageState: undefined }); // <-- Add this line

// This test logs in and saves the session state for reuse
// Run it once before running your main test suite

test.skip('login and save storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  await page.context().storageState({ path: 'storageState.json' });
}); 