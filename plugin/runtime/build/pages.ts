import fs from 'fs';
import { globbySync } from 'globby';

export function getPages() {
  const pagesPaths = globbySync('src/pages/**/*.page.*');
  const pages = pagesPaths.map(pagePath => ({
    src: pagePath,
    code: fs.readFileSync(pagePath, 'utf-8'),
  }));
  return pages;
}
