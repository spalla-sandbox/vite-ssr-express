import path from 'node:path';
import { getBaseURL } from '../helpers/environment.js';
import executeRenderer from '../helpers/renderer.js';

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
      const entryPointPath = path.resolve('.', 'src/main.ts');
      const { render } = await vite.ssrLoadModule(entryPointPath);
      const content = await executeRenderer(render, { req, res, vite });

      if (content) {
        res.set({ 'Content-Type': 'text/html' }).end(content);
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
