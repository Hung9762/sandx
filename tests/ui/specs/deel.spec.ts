import { test, Page } from '@playwright/test';
import { Deel } from '../pages/deel.ui.page';

test.describe('Deel challenge', () => {
  const baseURL = 'https://growth.deel.training/dev/salary-insights';
  let home: Deel;
  let role: string;
  let country: string;

  test.beforeEach(({ page }) => {
    role = 'QA Engineer';
    country = 'Canada';
    home = new Deel(page, role, country);
  });

  test('Deel Challenge @HappyPath', async () => {
    await home.goTo(baseURL);
    await home.selectRole(role);
    await home.selectCountry(country);
    await home.tapSearch();
    await home.validateChartHeaders(role, country);
  });

  test('Deel Challenge @UnHappyPath', async () => {
    await home.goTo(baseURL);
    await home.selectRoleUnHappyPath(role);
    await home.selectCountryUnHappyPath(country);
    await home.tapSearch();
    await home.validateUnHappyPath();
  });
});
