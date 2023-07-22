import type { Head } from '@unhead/schema';
import { withBase, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { useServerHead, useServerSeoMeta } from 'unhead';
import type { UseSeoMetaInput } from 'unhead';
import { Page } from './types';

export async function scanPages(prefix = '/') {
  // Use import.meta.glob from vite, to track files dinamically imported
  // and later generate chunks on build
  const pages = import.meta.glob(`./pages/**/*.page.*`, {
    import: 'default',
  });

  const files = Object.keys(pages);
  return files.map(file => {
    let route = file
      .replace('.page', '')
      .substring('./pages'.length, file.length)
      .replace(/\.[A-Za-z]+$/, '')
      .replace(/\[\.{3}]/g, '**')
      .replace(/\[\.{3}(\w+)]/g, '**:$1')
      .replace(/\[(\w+)]/g, ':$1');
    route = withLeadingSlash(withoutTrailingSlash(withBase(route, prefix)));

    route = route.replace(/\/index$/, '') || '/';

    return {
      route,
      handler: pages[file],
    };
  });
}

export function definePage(page: Page) {
  return page;
}

export function defineAuthPage(_page: Page) {
  return definePage((props, context) => context.res.redirect('/forbidden'));
}

export function definePageHead(data: Head) {
  useServerHead(data);
}

export function definePageMeta(data: UseSeoMetaInput) {
  useServerSeoMeta(data);
}
