import { parseURL } from 'ufo';
import { getBaseURL } from './environment.js';
import { transform } from './transform.js';

export default async function executeRenderer(
  renderer,
  { req, res, vite, manifest },
) {
  const url = parseURL(req.originalUrl);
  const urlWithoutBase = url.pathname.replace(getBaseURL(), '');
  const page = await renderer(urlWithoutBase, { req, res });

  if (!res.headersSent) {
    const transformed = transform(page, manifest);
    let html = '';
    /**
     * vite dev server only in development environment
     * to transform HTML
     */
    if (vite) {
      html = await vite.transformIndexHtml(url.pathname, transformed || '');
    } else {
      /**
       * In production, delivery as it is
       */
      html = transformed;
    }
    return html;
  }
  return null;
}
