import { Page, Locator } from '@playwright/test';
import 'dotenv/config';

export class ListPage {
  readonly page: Page;
  readonly listsLink: Locator;
  readonly list1Link: Locator;
  readonly list2Link: Locator;
  readonly companyNameCheckbox: Locator;
  readonly selectThisPageBtn: Locator;
  readonly downloadCompaniesBtn: Locator;
  readonly australiaBtn: Locator;
  readonly australiaMenuItem: Locator;
  readonly excludeDownloadedBtn: Locator;
  readonly exportBtn: Locator;
  readonly exportInProgressHeading: Locator;
  readonly exportOkayBtn: Locator;
  readonly listActionsBtn: Locator;
  readonly addToAnotherListBtn: Locator;
  readonly firstCircleBtn: Locator;
  readonly firstCircleSvg: Locator;
  readonly peopleTabBtn: Locator;
  readonly peopleNameCheckbox: Locator;
  readonly downloadPeopleBtn: Locator;
  readonly peopleListActionsBtn: Locator;
  readonly addToAnotherPeopleListBtn: Locator;
  readonly peopleSearchCell: Locator;
  readonly peopleSearchInput: Locator;
  readonly danALink: Locator;
  readonly noResultsMessage: Locator;
  readonly companySearchInput: Locator;
  readonly noPeopleAddedMessage: Locator;
  readonly noCompaniesAddedMessage: Locator;
  // ... add more as needed

  constructor(page: Page) {
    this.page = page;
    this.listsLink = page.getByRole('link', { name: 'Lists', exact: true });
    this.list1Link = page.getByRole('link', { name: 'New list 1' });
    this.list2Link = page.getByRole('link', { name: 'New List 3 22 7 Test_qa' });
    this.companyNameCheckbox = page.getByRole('row', { name: 'Name Sort by Company name' }).getByRole('checkbox');
    this.selectThisPageBtn = page.getByText('Select this page');
    this.downloadCompaniesBtn = page.getByText('Download (10)');
    this.australiaBtn = page.locator('button:has-text("Australia")');
    this.australiaMenuItem = page.getByRole('menuitem', { name: 'Australia' });
    this.excludeDownloadedBtn = page.getByText('Exclude previously downloaded');
    this.exportBtn = page.getByRole('button', { name: 'Export' });
    this.exportInProgressHeading = page.getByRole('heading', { name: 'Your export is in progress!' });
    this.exportOkayBtn = page.getByRole('button', { name: 'Okay, got it' });
    this.listActionsBtn = page.getByRole('button', { name: 'List actions (10)' });
    this.addToAnotherListBtn = page.locator('button').filter({ hasText: 'Add to another list (10)' }).getByRole('button');
    this.firstCircleBtn = page.locator('.flex.rounded-full.shrink-0.justify-center.items-center.disabled\\:opacity-50.div.border').first();
    this.firstCircleSvg = page.locator('.flex.rounded-full.shrink-0.justify-center.items-center.disabled\\:opacity-50.div.border > svg').first();
    this.peopleTabBtn = page.getByRole('button', { name: 'People (7)' });
    this.peopleNameCheckbox = page.getByRole('row', { name: 'Name Sort by People name' }).getByRole('checkbox');
    this.downloadPeopleBtn = page.getByText('Download (7)');
    this.peopleListActionsBtn = page.getByRole('button', { name: 'List actions (7)' });
    this.addToAnotherPeopleListBtn = page.locator('button').filter({ hasText: 'Add to another list (7)' }).getByRole('button');
    this.peopleSearchCell = page.getByRole('cell', { name: 'Name Sort by People name' });
    this.peopleSearchInput = this.peopleSearchCell.getByPlaceholder('Search');
    this.danALink = page.getByRole('link', { name: 'Dan A.' });
    this.noResultsMessage = page.getByText('No results found'); // Adjust text if needed
    this.companySearchInput = page.getByRole('cell', { name: 'Name Sort by Company name' }).getByPlaceholder('Search');
    this.noPeopleAddedMessage = page.locator('div.text-heading.text-content-darker', { hasText: 'No people added yet' });
    this.noCompaniesAddedMessage = page.locator('div.text-heading.text-content-darker', { hasText: 'No companies added yet' });
    // ... add more as needed
  }

  async goto() {
    await this.page.goto('https://staging.firmable.com/dashboard/list/');
  }

  // Example action methods
  async openList1() { await this.list1Link.click(); }
  async openList2() { await this.list2Link.click(); }
  async selectCompanyNameCheckbox() { await this.companyNameCheckbox.click(); }
  async selectThisPage() { await this.selectThisPageBtn.click(); }
  async downloadCompanies() { await this.downloadCompaniesBtn.click(); }
  async selectAustralia() { await this.australiaBtn.click(); await this.australiaMenuItem.click(); }
  async excludePreviouslyDownloaded() { await this.excludeDownloadedBtn.click(); }
  async exportList() { await this.exportBtn.click(); }
  async confirmExportInProgress() { await this.exportInProgressHeading.click(); await this.exportOkayBtn.click(); }
  async openListActions() { await this.listActionsBtn.click(); }
  async addToAnotherList() { await this.addToAnotherListBtn.click(); }
  async clickFirstCircle() { await this.firstCircleBtn.click(); }
  async clickFirstCircleSvg() { await this.firstCircleSvg.click(); }
  async openPeopleTab() { await this.peopleTabBtn.click(); }
  async selectPeopleNameCheckbox() { await this.peopleNameCheckbox.click(); }
  async downloadPeople() { await this.downloadPeopleBtn.click(); }
  async openPeopleListActions() { await this.peopleListActionsBtn.click(); }
  async addToAnotherPeopleList() { await this.addToAnotherPeopleListBtn.click(); }
  async searchPeople(name: string) { await this.peopleSearchInput.click(); await this.peopleSearchInput.fill(name); }
  async openDanAProfile() { await this.danALink.click(); }
  async searchCompany(name: string) {
    await this.list1Link.click();
    await this.companySearchInput.click();
    await this.companySearchInput.fill(name);
  }
  // ... add more as needed
} 