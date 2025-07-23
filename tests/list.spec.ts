import { test, expect } from '@playwright/test';
import { ListPage } from '../pages/ListPage';

test.describe('List Page Workflows', () => {
  let listPage;

  test.beforeEach(async ({ page }) => {
    listPage = new ListPage(page);
    await listPage.goto();
  });

  test('should load the List page and display lists', async () => {
    await expect(listPage.listsLink).toBeVisible(); // Validate Lists link is visible
  });

  test('should open lists', async () => {
    await listPage.openList1();
    await listPage.openList2();
  });

  test('should download companies from list', async () => {
    await listPage.selectCompanyNameCheckbox();
    await listPage.selectThisPage();
    await listPage.downloadCompanies();
    await listPage.selectAustralia();
    await listPage.excludePreviouslyDownloaded();
    await listPage.exportList();
    await listPage.confirmExportInProgress();
  });

  test('should add companies to another list', async () => {
    await listPage.selectCompanyNameCheckbox();
    await listPage.selectThisPage();
    await listPage.openListActions();
    await listPage.addToAnotherList();
    await listPage.clickFirstCircle();
    await listPage.clickFirstCircleSvg();
  });

  test('should download people from list', async () => {
    await listPage.openPeopleTab();
    await listPage.selectPeopleNameCheckbox();
    await listPage.selectThisPage();
    await listPage.downloadPeople();
    await listPage.excludePreviouslyDownloaded();
    await listPage.exportList();
    await listPage.confirmExportInProgress();
  });

  test('should add people to another list', async () => {
    await listPage.openPeopleTab();
    await listPage.selectPeopleNameCheckbox();
    await listPage.selectThisPage();
    await listPage.openPeopleListActions();
    await listPage.addToAnotherPeopleList();
    await listPage.clickFirstCircleSvg();
  });

  test('should search for a person and interact with profile', async () => {
    await listPage.openPeopleTab();
    await listPage.searchPeople('Dan');
    await listPage.openDanAProfile();
    
    // Interact with profile tabs and actions on the same page
    // await listPage.page.waitForSelector('text=Dan A.');
    //
    await listPage.page.waitForSelector('text=Dan A.');
    await expect(
      listPage.page.locator('span.font-bold.break-all.text-h3', { hasText: 'Dan A.' })
    ).toBeVisible();
    
    //await expect(listPage.getByText('Dan A.')).toBeVisible()
    await listPage.page.getByRole('tab', { name: 'Profile' }).click();
    await listPage.page.getByRole('tab', { name: 'Work history' }).click();
    await listPage.page.getByRole('tab', { name: 'Skills & education' }).click();
    await listPage.page.getByText('Skills', { exact: true }).click();
    await listPage.page.getByRole('button', { name: 'Add to list' }).click();
    //await listPage.page.locator('.flex.rounded-full.shrink-0.justify-center.items-center.disabled\\:opacity-50.div.border.w-6.h-6.text-secondary-mono-80 > svg').first().click();
  
    await listPage.page.getByRole('button', { name: ' Back', exact: true }).click();
  });

  test('should open company profile and interact with tabs', async () => {
    await listPage.page.getByRole('button', { name: 'Companies (13)' }).click();
    await listPage.page.getByRole('link', { name: 'Commonwealth Bank' }).click();
    
    // Interact with company profile tabs and actions on the same page
    await listPage.page.getByRole('tab', { name: 'Profile' }).click();
    await listPage.page.getByRole('tab', { name: 'People (33,010)' }).click();
    await listPage.page.getByRole('tab', { name: 'NextGen' }).click();
    await listPage.page.getByRole('tab', { name: 'Recent news' }).click();
    await listPage.page.getByText('Company news').nth(1).click();
    await listPage.page.getByRole('tab', { name: 'Local registers' }).click();
    await listPage.page.getByRole('button', { name: 'Add to list' }).click();
    //await listPage.page.locator('.flex.rounded-full.shrink-0.justify-center.items-center.disabled\\:opacity-50.div.border.w-6.h-6.text-secondary-mono-80 > svg').first().click();
    await listPage.page.getByRole('button', { name: ' Back' }).click();
  });

  test('should show no results for gibberish people search', async () => {
    await listPage.openPeopleTab();
    await listPage.searchPeople('asdkjfhaksjdhf');
    await expect(listPage.noPeopleAddedMessage).toBeVisible();
  });

  test('should handle special characters in people search', async () => {
    await listPage.openPeopleTab();
    await listPage.searchPeople('!@#$%^&*()');
    await expect(listPage.noPeopleAddedMessage).toBeVisible();
  });

  test('should show no results for gibberish company search', async () => {
    await listPage.searchCompany('asdkjfhaksjdhf');
    await expect(listPage.noCompaniesAddedMessage).toBeVisible();
  });

  test('should handle special characters in company search', async () => {
    await listPage.searchCompany('!@#$%^&*()');
    await expect(listPage.noCompaniesAddedMessage).toBeVisible();
  });
}); 