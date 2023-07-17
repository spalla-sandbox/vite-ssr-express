import { withBase, withLeadingSlash, withoutTrailingSlash } from "ufo";

export const GLOB_SCAN_PATTERN = "**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}";

export async function scanPages(prefix = '/') {
  const pages = import.meta.glob(`./pages/**/*.page.*`, {
    import: 'default',
  });
  
  const files = Object.keys(pages);
  return files.map(file => {
    let route = file
      .replace('.page', '')
      .substring('./pages'.length, file.length)
      .replace(/\.[A-Za-z]+$/, "")
      .replace(/\[\.{3}]/g, "**")
      .replace(/\[\.{3}(\w+)]/g, "**:$1")
      .replace(/\[(\w+)]/g, ":$1");
    route = withLeadingSlash(withoutTrailingSlash(withBase(route, prefix)));

    route = route.replace(/\/index$/, "") || "/";

    return {
      route,
      handler: pages[file]
    }
  });
}