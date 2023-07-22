import fs from 'fs';
import path from 'node:path';
import { withLeadingSlash } from 'ufo';
import { isProduction } from './environment.js';

const SOURCE_REGEX = /@source\((.*?)\)/gim;
const CONTENT_REGEX = /@content\((.*?)\)/gim;

/**
 * Transform @source(path/to/file.[ts|image])
 * mapped in manifest.json prod file
 * @param {string} code Code to transform
 * @param {Record<string, any>} manifest Manifest file builded
 * @returns Replace with src="path/to/file-[hash].[js|image]"
 */
export function transformSource(code, manifest) {
  return code.replace(SOURCE_REGEX, (_string, params) => {
    const [src] = params.split(',');
    if (manifest[src].url) {
      return `src="${withLeadingSlash(manifest[src].url)}"`;
    }
    return `src="${withLeadingSlash(manifest[src].file)}"`;
  });
}

/**
 * Transform @content(path/to/file.css)
 * mapped in manifest.json prod file
 * @param {string} code Code to transform
 * @param {Record<string, any>} manifest Manifest file builded
 * @returns Replace with path/to/file-[hash].css content
 */
export function transformContent(code, manifest) {
  return code.replace(CONTENT_REGEX, (_string, src) =>
    fs.readFileSync(
      path.resolve('./output/client', manifest[src].file),
      'utf-8',
    ),
  );
}

/**
 * Transform @source(path/to/file.[ts|image])
 * @param {string} code Code to replace
 * @returns Replace with src="path/to/file.[ts|image]".
 * In case of TS files, append type="module" to Vite handle correctly
 */
export function transformDevSource(code) {
  return code.replace(SOURCE_REGEX, (_string, params) => {
    const [src, srcAttr] = params.split(',');
    if (params.endsWith('.ts')) {
      return `${srcAttr?.trim() || 'src'}="${withLeadingSlash(
        src,
      )}" type="module"`;
    }
    return `${srcAttr?.trim() || 'src'}="${withLeadingSlash(src)}"`;
  });
}

/**
 * Transform @content(path/to/file.css) to content of file
 * @param {string} code Code to transform
 * @returns Replace with path/to/file.css content
 */
export function transformDevContent(code) {
  return code.replace(CONTENT_REGEX, (_string, src) =>
    fs.readFileSync(src, 'utf-8'),
  );
}

/**
 *
 * @param {string} code Code to transform
 * @param {Recode<string, any>} manifest Manifest file contents in case of production env
 * @returns Transformed code
 */
export function transform(code, manifest = {}) {
  if (isProduction()) {
    let transformed = transformSource(code, manifest);
    transformed = transformContent(transformed, manifest);
    return transformed;
  }
  let transformed = transformDevSource(code);
  transformed = transformDevContent(transformed);
  return transformed;
}
