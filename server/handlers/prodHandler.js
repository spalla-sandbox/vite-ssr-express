import path from 'node:path';
import { getBaseURL } from "../helpers/environment.js";

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
        res.set({ 'Content-Type': 'text/html' }).end(html)
      } else {
        next()
      }
    } catch (e) {
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  }

}