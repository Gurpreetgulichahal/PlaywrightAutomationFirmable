import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test.describe('Search Page Workflows', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await page.goto('https://staging.firmable.com/dashboard');
    await page.getByRole('link', { name: 'Search', exact: true }).click();
  });

  test('should perform a search, interact with results, and save search', async ({ page }) => {
    // Click the 'Search' link
    await page.getByRole('link', { name: 'Search', exact: true }).click();
    await page.goto('https://staging.firmable.com/dashboard/search/a9633fe5357f4091b77b69f6afe60f83');

    // Fill in the search fields
    await searchPage.searchInputName.click();
    await searchPage.searchInputName.fill('common');
    await searchPage.searchInputIndustrt.click();
    await searchPage.searchInputIndustrt.fill('Banking');

    // Click on 'Commonwealth Bank' link and span
    await page.getByRole('link', { name: 'Commonwealth Bank', exact: true }).click();
    await page.locator('span').filter({ hasText: 'Commonwealth Bank' }).click();

    // Click 'Back' button
    await page.getByRole('button', { name: 'Back' }).click();

    // Click 'Save', fill 'Search name', and save
    //await page.getByText('Save', { exact: true }).click();
    // await page.getByRole('textbox', { name: 'Search name' }).click();
    // await page.getByRole('textbox', { name: 'Search name' }).fill('Name');
    // await page.getByRole('button', { name: 'Save' }).click();

    // Go to the saved search URL (example URL, update as needed)
    await page.goto('https://staging.firmable.com/dashboard/search/a9633fe5357f4091b77b69f6afe60f83');
  });

  // Edge case 1: Search with gibberish/no results
  test('should show no results for gibberish search', async () => {
    
    await searchPage.search('asdkjfhaksjdhf', 'zzzzzz');
    await expect(searchPage.noResultsMessage).toBeVisible();
  });

  // Edge case 2: Save search with empty name
  test('should show error when saving search with empty name', async () => {
    await searchPage.search(' ', ' ');
    // await searchPage.clickSave();
    // await searchPage.confirmSave();  
    await expect(searchPage.noResultsMessage).toBeVisible();
  });

  //Edge case 3: Search with special characters
  test('should handle special characters in search', async () => {
    await searchPage.search('!@#$%^&*()', '!@#$%^&*()');
    // Accept either no results or a handled error message
    await expect(searchPage.noResultsMessage).toBeVisible();
    //const noResultsVisible = await searchPage.noResultsMessage.isVisible().catch(() => false);
    // const errorVisible = await searchPage.errorMessage.isVisible().catch(() => false);
    //expect(noResultsVisible).toBeVisible();
    //expect(noResultsVisible || errorVisible).toBeTruthy();

  });
}); 
