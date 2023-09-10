import { test } from '@playwright/test';
import { API } from '../pages/api.page';
import user from '../../../utils/user';

test.describe('API testcase', () => {
  let token: string;
  let api: API;

  test.beforeAll(async ({ request }) => {
    api = new API(request);
    token = await api.getUserInformation(user);
  });
});
