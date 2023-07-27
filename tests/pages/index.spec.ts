import { waitFor } from 'pptr-testing-library';
import { describe, expect, test } from 'vitest';
import { configurePageServer, serverUrl } from '../__utils__/server';

describe('Index page tests', async () => {
  await configurePageServer().then(({ page }) => {
    test('should redirect', async () => {
      await page.goto(serverUrl('/restrito'));
      waitFor(() => expect(page.url()).not.toBe(serverUrl('/restrito')));
      waitFor(() => expect(page.url()).toBe(serverUrl('/negado')));
    });
  });
});
