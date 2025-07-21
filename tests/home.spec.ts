import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {
  test('should load dashboard and display main header', async ({ page }) => {
    test.slow();
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.startSearchDiv1).toBeVisible();
    await homePage.goToHome();
    await homePage.searchIndustry();
    await homePage.searchSuburb();
    await homePage.searchKeywords('agriculture');
    await homePage.hideDropdown();
    await homePage.goToSearchCompanies();
    await homePage.startCompanyOrPeopleSearch()
    
  });
  
  test('should open and interact with Quick lookup', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.openQuickLookup();
    await homePage.quickLookupSwitchToPeople();
    await homePage.quickLookupSwitchToCompanies();
    //await homePage.closeQuickLookup();
  });

  test('should navigate lists from Home', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.openPrivateList();
    await homePage.openSharedList();
    await homePage.openNewList1();
    await homePage.openNewListText();
    await homePage.goToHome();
    await homePage.openPrivateList();
    await homePage.openTestSharedList();
    await homePage.openTestSharedText();
    await homePage.goToHome();
    await homePage.openManageLists();
    await homePage.openNewListText();
    await homePage.goToHome();
  });

  test('should check recent searches', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.openRecentSearches();
    await homePage.recentSwitchToPeople();
    await homePage.recentSwitchToCompanies();
    await homePage.openRecentSearchLink();
    await homePage.goToHome();
    await homePage.closeRecentSearches();
  });

  test('should check saved searches', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.openSavedSearches();
    await homePage.savedSwitchToPeople();
    await homePage.savedSwitchToCompanies();
    await homePage.openSavedSearchLink();
    await homePage.goToHome();
    await homePage.savedSwitchToPeople();
    await homePage.openSavedSearch2Link();
    await homePage.goToHome();
    await homePage.closeSavedSearches();
  });

  test('should click popular searches and interact with popup', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const popup = await homePage.openPopularSearch(page);
    await homePage.clickFiltersInPopup(popup);
    await popup.getByRole('link', { name: 'Home' }).click();
  });
  
  test('should show no results for empty search input', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchKeywords2('  ');
    await expect(page.locator('text=No results found.')).toBeVisible();
  });

  test('should show no results for gibberish search input', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchKeywords2('asdkjfhaksjdhf');
    await expect(page.locator('text=No results found.')).toBeVisible();

  });

  test('should show no results for special characters in search input', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchKeywords2('!@#$%^&*()');
    await expect(page.getByText('No results found')).toBeVisible();
  });

  test('should show no results for very long search input', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchKeywords2('a'.repeat(256));
    await expect(page.getByText('No results found')).toBeVisible();
  });
  
}); 
