import { describe, expect, test, vi } from 'vitest';
import { renderComponent } from '../../__utils__/render';
import { configureComponentServer } from '../../__utils__/server';
import LoginForm from '../../../src/components/LoginForm';

describe('LoginForm tests', async () => {
  await configureComponentServer().then(async ({ server, page }) => {
    test('Render', async () => {
      const component = await renderComponent(<LoginForm />, server);
      await page.setContent(component);

      await page.type('#email', 'username');
      await page.type('#pass', 'password');
      await page.click('button');

      const cookies = await page.cookies();

      const hasTokenCookie = cookies.findIndex(c => c.name === 'token') !== -1;

      expect(hasTokenCookie).toBe(true);
    });
  });
});
