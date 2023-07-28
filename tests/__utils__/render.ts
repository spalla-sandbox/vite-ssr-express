import { renderSSRHead } from '@unhead/ssr';
import { renderToStaticMarkup } from 'react-dom/server';
import { createHead } from 'unhead';
import type { ViteDevServer } from 'vite';
// eslint-disable-next-line import/extensions
import { transform } from '../../server/runtime/helpers/transform.js';

export async function renderComponent(component, vite: ViteDevServer) {
  const unhead = createHead();
  const rendered = renderToStaticMarkup(component);
  const unheadPayload = await renderSSRHead(unhead);
  const template = `
    <!DOCTYPE html>
    <html ${unheadPayload.htmlAttrs}>
      <head>
        ${unheadPayload.headTags}
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
