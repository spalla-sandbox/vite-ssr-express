import { createRouter } from 'radix3';
import { scanPages } from './page';
import redirects from './redirects';

export default async function getRouter() {
  const router = createRouter();
  const pages = await scanPages();

  function addRoute(path, data) {
    router.insert(path, data);
  }

  pages.forEach(page => {
    addRoute(page.route, page);
  });

  Object.entries(redirects).forEach(rule => {
    const [route, config] = rule;
    if (Array.isArray(config)) {
      const [redirect, status] = config;
      addRoute(route, { redirect, status });
    } else {
      addRoute(route, { redirect: config });
    }
  });

  return router;
}
