import { minify } from 'html-minifier-terser';
import fs from 'node:fs';
import path from 'node:path';
import { isProduction } from '../helpers/environment.js';
import executeRenderer from '../helpers/renderer.js';

const manifest = isProduction()
  ? JSON.parse(
      fs.readFileSync(
        path.resolve('.', 'output/client/manifest.json'),
        'utf-8',
      ),
    )
  : {};

/**
 * Handle prod envinronment requests
 * @param {Express} app Express instance
 * @returns
 */
export default async function productionHandler(app) {
  // Add production middlewares
  const compression = (await import('compression')).default;
  app.use(compression());

  return async (req, res, next) => {
    try {
      const entryPointPath = path.resolve('.', 'output/server/main.js');
      const { render } = await import(entryPointPath);
      const content = await executeRenderer(render, { req, res, manifest });
      if (content) {
        const minified = await minify(content, {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          processScripts: ['application/ld+json'],
        });
        res.set({ 'Content-Type': 'text/html' }).end(minified);
      } else {
        next();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  };
}
