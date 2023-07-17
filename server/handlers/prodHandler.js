import fs from 'node:fs/promises';
import path from 'node:path';
import { getBaseURL, isDevelopment } from "../helpers/environment.js";

export default async function productionHandler(app) {
  // Add production middlewares
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  // app.use(getBaseURL(), sirv('./dist/client', { extensions: [] }))

  // Cached production assets
const templateHtml = await fs.readFile(path.resolve('.', 'output/client/index.html'), 'utf-8')

  return async (req, res) => {
    try {
      const url = req.originalUrl.replace(getBaseURL(), '')
      const render = (await import(path.resolve('.', 'output/server/main.js'))).render
      const rendered = await render(url, { req, res })

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