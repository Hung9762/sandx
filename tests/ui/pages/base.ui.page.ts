import { Locator, Page } from '@playwright/test';

export class BaseUI {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
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
}
