import fs from 'node:fs/promises';
import path from 'node:path';
import { getBaseURL, isProduction } from "../helpers/environment.js";

export default async function developmentHandler(app) {
  // Create and add Vite middleware
  const { createServer } = await import('vite')
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base: getBaseURL()
  })
  app.use(vite.middlewares)

  return async (req, res) => {
    try {
      const url = req.originalUrl.replace(getBaseURL(), '')
      const templateFile = await fs.readFile(path.resolve('.', 'index.html'), 'utf-8')
      const render = (await vite.ssrLoadModule(path.resolve('.', 'src/main.ts'))).render
      const rendered = await render(url, { req, res })
      
      const page = templateFile
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      
      const html = await vite.transformIndexHtml(url, page)
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  }

}