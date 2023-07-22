import path from 'node:path';
import fs from 'node:fs'
import { getBaseURL, isProduction } from "../helpers/environment.js";
import { transform } from '../helpers/transform.js';

const manifest = isProduction() ? JSON.parse(fs.readFileSync(path.resolve('.', 'output/client/manifest.json'), 'utf-8')) : '{}'

/**
 * Handle prod envinronment requests
 * @param {Express} app Express instance
 * @returns 
 */
export default async function productionHandler(app) {
  // Add production middlewares
  const compression = (await import('compression')).default
  app.use(compression())

  return async (req, res, next) => {
    try {
      const url = req.originalUrl.replace(getBaseURL(), '')
      const render = (await import(path.resolve('.', 'output/server/main.js'))).render
      const html = await render(url, { req, res })
      if (!res.headersSent) {
        const transformed = transform(html, manifest);
        res.set({ 'Content-Type': 'text/html' }).end(transformed)
      } else {
        next()
      }
    } catch (e) {
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  }

}