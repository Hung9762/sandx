import { Locator, Page, expect } from '@playwright/test';
import { BaseUI } from './base.ui.page';

export class Deel extends BaseUI {
  //----- Locators -----//
  protected roleSelector: Locator;
  protected roleOption: Locator;
  protected countrySelector: Locator;
  protected countryOption: Locator;
  protected countryLabel: Locator;
  protected searchButton: Locator;
  protected chartHeaderCountry: Locator;
  protected chartHeaderRole: Locator;
  //---- Error locators ----//
  protected roleIsRequired: Locator;
  protected countryIsRequired: Locator;
  //---- Constructor -----//
  constructor(page: Page, role: string, country: string) {
    super(page);
    this.roleSelector = page.getByPlaceholder('Select a role');
    this.roleOption = page.getByRole('option', { name: role });
    this.countrySelector = page.getByPlaceholder('Select a country');
    this.countryOption = page.getByRole('option', { name: country });
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.chartHeaderRole = page.getByRole('heading', { name: role, exact: true });
    this.chartHeaderCountry = page.getByRole('heading', { name: country, exact: true });
    this.roleIsRequired = page.getByText('Role is required');
    this.countryIsRequired = page.getByText('Role is required');
  }
  async goTo(url: string) {
    await this.goToURL(url);
  }

  async selectRole(role: string) {
    await this.tapElement(this.roleSelector);
    await this.arrowDown();
    await this.fillElement(this.roleSelector, role);
    await this.tapElement(this.roleOption);
  }

  async selectRoleUnHappyPath(role: string) {
    await this.tapElement(this.roleSelector);
    await this.fillElement(this.roleSelector, role);
  }

  async selectCountry(country: string) {
    await this.tapElement(this.countrySelector);
    await this.arrowDown();
    await this.fillElement(this.countrySelector, country);
    await this.tapElement(this.countryOption);
  }

  async selectCountryUnHappyPath(country: string) {
    await this.tapElement(this.countrySelector);
    await this.fillElement(this.countrySelector, country);
  }

  async tapSearch() {
    await this.tapElement(this.searchButton);
  }

  async validateChartHeaders(role: string, country: string) {
    let country_name = await this.getElementText(this.chartHeaderCountry);
    let role_name = await this.getElementText(this.chartHeaderRole);
    expect(country_name).toBe(country);
    expect(role_name).toBe(role);
  }

  async validateUnHappyPath() {
    await expect(this.roleIsRequired).toBeVisible();
    await expect(this.countryIsRequired).toBeVisible();
    await expect(this.chartHeaderRole).not.toBeVisible();
    await expect(this.chartHeaderCountry).not.toBeVisible();
  }
}
