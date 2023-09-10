import { Locator, Page, BrowserContext, expect } from '@playwright/test';
import { BaseUI } from './base.ui.page';

export class Google extends BaseUI {
  //Locators
  protected searchInput: Locator;
  protected searchButton: Locator;
  protected secondResult: Locator;
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.searchInput = page.getByLabel('Search', { exact: true });
    this.searchButton = page.getByRole('button', { name: 'Google Search' });
    this.secondResult = page.locator("(//div[@jscontroller='SC7lYd'])[1]");
  }

  async goTo(url: string) {
    await this.goToURL(url);
  }

  async searchQuery(query: string) {
    await this.fillElement(this.searchInput, query);
  }

  async tapSearch() {
    await this.tapElement(this.searchButton);
  }

  async tapSecondResult() {
    const [multipage] = await Promise.all([
      this.context.waitForEvent('page'),
      await this.openInNewTap(this.secondResult),
    ]);

    const tab = multipage.context().pages();
    await tab[1].bringToFront();
    const newTabTitle = await tab[1].title();
    const newTabHeading = tab[1].getByRole('heading', { name: 'Selenium', exact: true });
    expect(newTabTitle).toContain('Selenium');
    expect(await newTabHeading.innerText()).toBe('Selenium');
  }
}
