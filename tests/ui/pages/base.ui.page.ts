import { BrowserContext, Locator, Page } from '@playwright/test';

export class BaseUI {
  protected page: Page;
  protected context: BrowserContext;
  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  protected async goToURL(url: string) {
    await this.page.goto(url);
  }

  protected async fillElement(element: Locator, text: string) {
    await element.fill(text);
  }

  protected async tapElement(element: Locator) {
    await element.click();
  }

  protected async arrowDown() {
    await this.page.keyboard.press('ArrowDown', { delay: 1000 });
  }

  protected async getElementText(element: Locator) {
    return await element.textContent();
  }

  protected async openInNewTap(element: Locator) {
    await element.click({ button: 'middle' });
  }
}
