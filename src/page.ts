import type { Head, Script, Style } from '@unhead/schema';
import { renderSSR } from 'nano-jsx';
import { withBase, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { useServerHead, useServerSeoMeta } from 'unhead';
import type { UseSeoMetaInput } from 'unhead';
import { Page, PageContext, PageParams } from './types';

/**
 * Scan for all pages in application
 * @param prefix Prefix for pages routes
 * @returns Mapped pages with route and import function
 */
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
      import: pages[file],
    };
  });
}

export async function definePage(page: Page) {
  return async (params: PageParams, context: PageContext) => {
    const toRender = await Promise.resolve(page(params, context));
    return renderSSR(toRender);
  };
}

export async function defineAuthPage(page: Page) {
  return definePage((params: PageParams, context: PageContext) => {
    const hasToken = context.req.headers.cookie.includes('token=1');
    if (!hasToken) {
      context.res.redirect('/negado');
    }
    return page(params, { ...context, extra: { hasToken } });
  });
}

export async function defineGuestPage(page: Page) {
  return definePage((params: PageParams, context: PageContext) => {
    if (context.req.headers.cookie.includes('token=1')) {
      context.res.redirect('/');
    }
    return page(params, context);
  });
}

/**
 * Define page head tags
 * @param data
 * @returns
 */
export async function definePageHead(data: Head) {
  return useServerHead(data);
}

export async function definePageMeta(data: UseSeoMetaInput) {
  return useServerSeoMeta(data);
}

export async function definePageScripts(scripts: Script[]) {
  const handleDev = scripts.map(script => {
    if (script.src?.toString().startsWith('@')) {
      return {
        ...script,
        type: 'module',
      };
    }

    return script;
  });
  return useServerHead({
    script: handleDev,
  });
}

export async function definePageStyles(styles: Style[]) {
  return useServerHead({
    style: styles,
  });
}

/** A alias to best fit when define in components */
export const defineScripts = definePageScripts;
export const defineStyles = definePageStyles;
