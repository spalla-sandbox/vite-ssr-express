import { renderSSRHead } from '@unhead/ssr';
import { createHead } from 'unhead';
import { definePageHead } from './page';
import getRouter from './router';
import { Page, PageContext } from './types';

function renderSnippet(snippet: string | string[]) {
  if (Array.isArray(snippet)) return snippet.join('\n');
  return snippet?.toString() || '';
}

/**
 * Setup default values for all pages rendered
 */
function setupDefaults() {
  definePageHead({
    htmlAttrs: {
      lang: 'pt',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    titleTemplate: 'POC - %s',
    title: 'Vite + Express + SSR',
  });
}

export async function render(url: string, context: PageContext) {
  // Create head must be before render page, so will catch all definition
  const unhead = createHead();
  setupDefaults();

  // Create the router that will search and map all *.page.ts files
  const router = await getRouter();
  const match = router.lookup(`/${url}`);

  // Dinamically import the page calling handler() function from router
  const page: Page = await match.handler();

  // Execute the page function
  const content = await page(match.params, context);

  // If not returns content, maybe was a redirect
  if (!content) return null;

  // Get the page contents
  const { head, body, footer } = content;

  // Get the head and html/body attrs contents
  const unheadPayload = await renderSSRHead(unhead);

  // Construct the HTML to response
  const html = `
    <!DOCTYPE html>
    <html ${unheadPayload.htmlAttrs}>
      <head>
        ${renderSnippet(head)}
        ${unheadPayload.headTags}
      </head>
      <body ${unheadPayload.bodyAttrs}>
        ${renderSnippet(body)}
        ${renderSnippet(footer)}
      </body>
    </html>
  `;

  return html;
}
