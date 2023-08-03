import { renderSSRHead } from '@unhead/ssr';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { createHead } from 'unhead';
import type { ViteDevServer } from 'vite';
// eslint-disable-next-line import/extensions
import { transform } from '../../server/runtime/helpers/transform.js';
import Theme from '../../src/themes';

export async function renderComponent(component, vite: ViteDevServer) {
  const unhead = createHead();
  const sheet = new ServerStyleSheet();
  const withStyles = sheet.collectStyles(<Theme>{component}</Theme>);
  const rendered = renderToStaticMarkup(withStyles);
  const unheadPayload = await renderSSRHead(unhead);
  const styles = sheet.getStyleTags();
  const template = `
    <!DOCTYPE html>
    <html ${unheadPayload.htmlAttrs}>
      <head>
        ${unheadPayload.headTags}
        ${styles}
      </head>
      <body ${unheadPayload.bodyAttrs}>
        ${unheadPayload.bodyTagsOpen}
        ${rendered}
        ${unheadPayload.bodyTags}
      </body>
    </html>
  `;

  const transformed = transform(template);

  const html = await vite.transformIndexHtml('/', transformed);

  return html;
}
