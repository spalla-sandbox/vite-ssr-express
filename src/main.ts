import { renderSSRHead } from '@unhead/ssr';
import { createHead, useServerHead } from 'unhead';
import getRouter from './router';
import { PageContext } from './types';

function renderSnippet(snippet: string | string[]) {
  if (Array.isArray(snippet)) return snippet.join('\n');
  return snippet?.toString() || '';
}

function setupDefaults() {
  useServerHead({
    htmlAttrs: {
      lang: 'pt', // Change to your language
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
  const unhead = createHead();
  setupDefaults();
  const router = await getRouter();
  const match = router.lookup(`/${url}`);
  const page = await match.handler();
  const content = await page(match.params, context);

  if (!content) return null;

  const { htmlAttributes, head, bodyAttributes, body, footer } = content;

  const unheadPayload = await renderSSRHead(unhead);

  const html = `
    <!DOCTYPE html>
    <html ${renderSnippet(htmlAttributes)} ${unheadPayload.htmlAttrs}>
      <head>
        ${renderSnippet(head)}
        ${unheadPayload.headTags}
      </head>
      <body ${renderSnippet(bodyAttributes)} ${unheadPayload.bodyAttrs}>
        ${renderSnippet(body)}
        ${renderSnippet(footer)}
      </body>
    </html>
  `;

  return html;
}
