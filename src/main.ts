import getRouter from './router';
import { PageContext } from './types';

function renderSnippet(snippet: string | string[]) {
  if (Array.isArray(snippet)) return snippet.join('\n');
  return snippet?.toString() || '';
}

export async function render(url: string, context: PageContext) {
  const router = await getRouter();
  const match = router.lookup(`/${url}`);
  const page = await match.handler();
  const content = await page(match.params, context);

  if (!content) return null;

  const { htmlAttributes, head, bodyAttributes, body, footer } = content;

  const html = `
    <!DOCTYPE html>
    <html lang="pt" ${renderSnippet(htmlAttributes)}>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${renderSnippet(head)}
      </head>
      <body ${renderSnippet(bodyAttributes)}>
        ${renderSnippet(body)}
        ${renderSnippet(footer)}
      </body>
    </html>
  `;

  return html;
}
