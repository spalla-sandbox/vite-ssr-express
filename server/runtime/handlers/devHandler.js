import path from 'node:path';
import { getBaseURL } from '../helpers/environment.js';
import { transform } from '../helpers/transform.js';

/**
 * Handle dev envinronment requests
 * Injects Vite client resources and transform page
 * @param {Express} app Express instance
 * @returns
 */
export default async function developmentHandler(app) {
  // Create and add Vite middleware
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base: getBaseURL(),
  });
  app.use(vite.middlewares);

  return async (req, res, next) => {
    try {
      const url = req.originalUrl.replace(getBaseURL(), '');
      const { render } = await vite.ssrLoadModule(
        path.resolve('.', 'src/main.ts'),
      );
      const page = await render(url, { req, res });

      if (!res.headersSent) {
        const transformed = transform(page);
        const html = await vite.transformIndexHtml(url, transformed || '');
        res.set({ 'Content-Type': 'text/html' }).end(html);
      } else {
        next();
      }
    } catch (e) {
      vite.ssrFixStacktrace(e);
      // eslint-disable-next-line no-console
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  };
}
