import { Page, Locator, expect } from '@playwright/test';

import 'dotenv/config';

export class HomePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly startSearchDiv1:Locator;
  readonly searchIndustryInput: Locator;
  readonly agricultureButton: Locator;
  readonly allAgricultureButton: Locator;
  readonly suburbInput: Locator;
  readonly actButton: Locator;
  readonly searchKeywordsInput: Locator;
  readonly manufacturingAgricultureButton: Locator;
  readonly startSearchDiv: Locator;
  readonly searchCompaniesLink: Locator;
  readonly quickLookupButton: Locator;
  readonly quickLookupPeopleTab: Locator;
  readonly quickLookupCompaniesTab: Locator;
  readonly quickLookupClose: Locator;
  readonly privateButton: Locator;
  readonly sharedButton: Locator;
  readonly manageListsLink: Locator;
  readonly newList1Link: Locator;
  readonly newListText: Locator;
  readonly testSharedLink: Locator;
  readonly testSharedText: Locator;
  readonly recentSearchesButton: Locator;
  readonly recentPeopleTab: Locator;
  readonly recentCompaniesTab: Locator;
  readonly recentSearchLink: Locator;
  readonly recentCloseButton: Locator;
  readonly savedSearchesButton: Locator;
  readonly savedPeopleTab: Locator;
  readonly savedCompaniesTab: Locator;
  readonly savedSearchLink: Locator;
  readonly savedSearch2Link: Locator;
  readonly savedCloseButton: Locator;
  readonly popularSearchButton: Locator;
  readonly filtersText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startSearchDiv1 = page.getByText('Start your company or people search');
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.searchIndustryInput = page.getByRole('textbox', { name: 'Search industry' });
    this.agricultureButton = page.getByRole('button', { name: 'Agriculture, forestry and fishing' });
    this.allAgricultureButton = page.getByRole('button', { name: 'All Agriculture, forestry and fishing' });
    this.suburbInput = page.getByRole('textbox', { name: 'Search for suburb, postcode' });
    this.actButton = page.getByRole('button', { name: 'Australian Capital Territory, AU' });
    this.searchKeywordsInput = page.getByRole('textbox', { name: 'Search keywords' });
    this.manufacturingAgricultureButton = page.getByRole('button', { name: 'manufacturing & agriculture' });
    this.startSearchDiv = page.getByText('Start your company or people search');
    
    //page.locator('div').filter({ hasText: /^Start your company or people search$/ }).first();
    this.searchCompaniesLink = page.getByRole('link', { name: 'Search companies' });
    this.quickLookupButton = page.getByRole('button', { name: 'Quick lookup' });
    this.quickLookupPeopleTab = page.getByRole('tab', { name: 'People' });
    this.quickLookupCompaniesTab = page.getByRole('tab', { name: 'Companies' });
    this.quickLookupClose = page.locator('.fixed.top-0.right-0');
    this.privateButton = page.getByRole('button', { name: 'Private' });
    this.sharedButton = page.getByRole('button', { name: 'Shared' });
    this.manageListsLink = page.getByRole('link', { name: 'Manage lists' });
    this.newList1Link = page.getByRole('link', { name: 'New list 1 13' });
    this.newListText = page.getByText('New list').nth(3);
    this.testSharedLink = page.getByRole('link', { name: 'test_shared 4' });
    this.testSharedText = page.getByText('test_shared').nth(1);
    this.recentSearchesButton = page.getByRole('button', { name: 'Recent searches' });
    this.recentPeopleTab = page.getByRole('button', { name: 'People', exact: true });
    this.recentCompaniesTab = page.getByRole('button', { name: 'Companies', exact: true });
    this.recentSearchLink = page.getByRole('link', { name: /\d{1,2}, \d{4},/ }); // fallback for date
    this.recentCloseButton = page.locator('.flex.transition-colors.duration-300.cursor-pointer.min-w-min.justify-center.items-center.shrink-0.text-content-dark.border.border-stroke-light.bg-surface-white.\\!p-2.rounded-lg.text-lg.hover\\:bg-surface-interactive-lighter.hover\\:border-stroke-interactive.hover\\:text-content-interactive.ml-auto');
    this.savedSearchesButton = page.getByRole('button', { name: 'Saved searches' });
    this.savedPeopleTab = page.getByRole('button', { name: 'People', exact: true });
    this.savedCompaniesTab = page.getByRole('button', { name: 'Companies', exact: true });
    this.savedSearchLink = page.getByRole('link', { name: 'Name Country [OR] Australia' });
    this.savedSearch2Link = page.getByRole('link', { name: 'Search Country [OR] Australia', exact: true });
    this.savedCloseButton = this.recentCloseButton;
    this.popularSearchButton = page.getByRole('button', { name: '17K companies with 10-50' });
    this.filtersText = page.getByText('Filters');
  }

  async goto() {
    await this.page.goto('https://staging.firmable.com/sign-in');
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async searchIndustry() {
    await this.searchIndustryInput.click();
    await this.agricultureButton.click();
    await this.allAgricultureButton.click();
  }

  async searchSuburb() {
    await this.suburbInput.click();
    await this.actButton.click();
  }

  async searchKeywords(keyword: string) {
    await this.searchKeywordsInput.click();
    await this.searchKeywordsInput.fill(keyword);
    await this.manufacturingAgricultureButton.click();
  }
  async searchKeywords2(keyword: string) {
    await this.searchKeywordsInput.click();
    await this.searchKeywordsInput.fill(keyword);
    //await this.manufacturingAgricultureButton.click();
  }

  async startCompanyOrPeopleSearch() {
    await this.startSearchDiv.click();
  }

  async goToSearchCompanies() {
    await this.searchCompaniesLink.click();
  }
  async hideDropdown(){
    await await this.suburbInput.click();
  }

  async openQuickLookup() {
    await this.quickLookupButton.click();
  }
  async quickLookupSwitchToPeople() {
    await this.quickLookupPeopleTab.click();
  }
  async quickLookupSwitchToCompanies() {
    await this.quickLookupCompaniesTab.click();
  }
  async closeQuickLookup() {
    await this.quickLookupClose.click();
  }
  async openPrivateList() {
    await this.privateButton.click();
  }
  async openSharedList() {
    await this.sharedButton.click();
  }
  async openNewList1() {
    await this.newList1Link.click();
  }
  async openNewListText() {
    await this.newListText.click();
  }
  async openTestSharedList() {
    await this.testSharedLink.click();
  }
  async openTestSharedText() {
    await this.testSharedText.click();
  }
  async openManageLists() {
    await this.manageListsLink.click();
  }
  async openRecentSearches() {
    await this.recentSearchesButton.click();
  }
  async recentSwitchToPeople() {
    await this.recentPeopleTab.click();
  }
  async recentSwitchToCompanies() {
    await this.recentCompaniesTab.click();
  }
  async openRecentSearchLink() {
    await this.recentSearchLink.first().click();
  }
  async closeRecentSearches() {
    await this.recentCloseButton.click();
  }
  async openSavedSearches() {
    await this.savedSearchesButton.click();
  }
  async savedSwitchToPeople() {
    await this.savedPeopleTab.click();
  }
  async savedSwitchToCompanies() {
    await this.savedCompaniesTab.click();
  }
  async openSavedSearchLink() {
    await this.savedSearchLink.click();
  }
  async openSavedSearch2Link() {
    await this.savedSearch2Link.click();
  }
  async closeSavedSearches() {
    await this.savedCloseButton.click();
  }
  async openPopularSearch(page: Page) {
    const popupPromise = page.waitForEvent('popup');
    await this.popularSearchButton.click();
    const popup = await popupPromise;
    return popup;
  }
  async clickFiltersInPopup(popup: Page) {
    await popup.getByText('Filters').click();
  }
} 