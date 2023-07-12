import { createRouter } from "radix3";
import { scanPages } from "./scan";
import { lookup } from "dns";

export default async function getRouter() {
  const router = createRouter()
  const pages = await scanPages()

  function addRoute(path, data) {
    router.insert(path, data)
  }

  pages.forEach(page => {
    addRoute(page.route, page)
  });

  return router
}