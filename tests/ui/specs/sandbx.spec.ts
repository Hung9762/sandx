import { test, Page } from '@playwright/test';
import { Google } from '../pages/google.ui.page';

test.describe('Sanb challenge', () => {
  const baseURL = 'https:www.google.com';
  let google: Google;

  test.beforeEach(({ page, context }) => {
    google = new Google(page, context);
  });

  test('Challenge @HappyPath', async () => {
    await google.goTo(baseURL);
    await google.searchQuery('selenium');
    await google.tapSearch();
    await google.tapSecondResult();
  });
});
