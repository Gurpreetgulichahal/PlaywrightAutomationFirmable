import { Page, Locator, expect } from '@playwright/test';
import 'dotenv/config';

export class SearchPage {
  readonly page: Page;
  readonly searchInputName: Locator;
  readonly searchInputIndustrt: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly noResultsMessage: Locator;
  readonly saveButton: Locator;
  readonly searchNameTextbox: Locator;
  readonly saveConfirmButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputName = page.getByRole('cell', { name: 'Name Sort by Company name' }).getByPlaceholder('Search');
    this.searchInputIndustrt = page.getByRole('cell', { name: 'Industry Sort by Industry' }).getByPlaceholder('Search')
    this.searchButton = page.locator('button[type="submit"], button:has-text("Search")');
    this.searchResults = page.getByRole('link', { name: 'Commonwealth Bank' });
    this.noResultsMessage = page.locator('svg path[d^="M0 16C0 7."]');
    this.saveButton = page.getByText('Save', { exact: true });
    this.searchNameTextbox = page.getByRole('textbox', { name: 'Search name' });
    this.saveConfirmButton = page.getByRole('button', { name: 'Save' });
    this.errorMessage = page.getByText(/required|enter a name/i).first();
  }

  async goto() {
    await this.page.goto('https://staging.firmable.com/dashboard/search');
  }

  async search(keyword: string, industry: string) {
    await this.searchInputName.fill(keyword);
    await this.searchInputIndustrt.fill(industry);
    //await this.searchButton.click();
  }

  async clickResult() {
    await this.searchResults.click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async fillSearchName(name: string) {
    await this.searchNameTextbox.fill(name);
  }

  async confirmSave() {
    await this.saveConfirmButton.click();
  }

  async gotoSavedSearch(url: string) {
    await this.page.goto(url);
  }

  // Utility methods for edge case checks
  async isNoResultsVisible() {
    return await this.noResultsMessage.isVisible().catch(() => false);
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible().catch(() => false);
  }
} 