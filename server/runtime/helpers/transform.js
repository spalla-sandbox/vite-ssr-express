import fs from 'fs';
import path from 'node:path';
import { withLeadingSlash, withTrailingSlash } from 'ufo';
import { getCDNUrl } from './environment.js';

const SOURCE_REGEX = /@source\((.*?)\)/gim;
const CONTENT_REGEX = /@content\((.*?)\)/gim;

function getManifestResource(src, manifest) {
  if (manifest[src].url) {
    return manifest[src].url;
  }
  return manifest[src].file;
}

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
    if (manifest) {
      return `${withTrailingSlash(getCDNUrl())}${getManifestResource(
        src,
        manifest,
      )}`;
    }
    return withLeadingSlash(src);
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
  return code.replace(CONTENT_REGEX, (_string, src) => {
    if (manifest) {
      return fs.readFileSync(
        path.resolve('./output/client', getManifestResource(src, manifest)),
        'utf-8',
      );
    }
    return fs.readFileSync(src, 'utf-8');
  });
}

/**
 *
 * @param {string} code Code to transform
 * @param {Recode<string, any>} manifest Manifest file contents in case of production env
 * @returns Transformed code
 */
export function transform(code, manifest = null) {
  let transformed = transformSource(code, manifest);
  transformed = transformContent(transformed, manifest);
  return transformed;
}
