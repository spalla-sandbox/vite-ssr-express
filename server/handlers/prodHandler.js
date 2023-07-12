import fs from 'node:fs/promises';
import path from 'node:path';
import { getBaseURL, isDevelopment } from "../helpers/environment.js";

export default async function productionHandler(app) {

  // Skip if is production build
  if (isDevelopment()) {
    return (_req, _res, next) => next();
  }

  // Add production middlewares
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(getBaseURL(), sirv('./dist/client', { extensions: [] }))

  // Cached production assets
const templateHtml = await fs.readFile(path.resolve('.', 'dist/client/index.html'), 'utf-8')
const ssrManifest = await fs.readFile(path.resolve('.', 'dist/client/ssr-manifest.json'), 'utf-8')

  return async (req, res) => {
    try {
      const url = req.originalUrl.replace(getBaseURL(), '')
      const render = (await import(path.resolve('.', 'dist/server/entry-server.js'))).render
      const rendered = await render(url, ssrManifest)

      const html = templateHtml
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '')

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  }

}