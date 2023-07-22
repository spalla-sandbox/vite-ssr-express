import fs from 'fs';
import path from 'node:path';
import { withLeadingSlash } from 'ufo';

const SOURCE_REGEX = /@source\((.*?)\)/gim;
const CONTENT_REGEX = /@content\((.*?)\)/gim;
const SCRIPT_REGEX = /@script\((.*?)\)/gim;

function getManifestResource(src, manifest, leadingSlash = true) {
  if (manifest[src].url) {
    return manifest[src].url;
  }
  if (leadingSlash) return withLeadingSlash(manifest[src].file);
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
      return getManifestResource(src, manifest);
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
        path.resolve(
          './output/client',
          getManifestResource(src, manifest, false),
        ),
        'utf-8',
      );
    }
    return fs.readFileSync(src, 'utf-8');
  });
}

/**
 * Transform @script(path/to/file.ts) in <script> tags
 * It accepts params as extra attributes like @script(path/file.ts,defer,async)
 * Should be used by pages scripts
 * @param {string} code Page code to be parsed
 * @returns Replace with <script src="/path/to/file.ts" ...></script>
 */
export function transformScript(code, manifest) {
  return code.replace(SCRIPT_REGEX, (_string, params) => {
    const [src, ...extra] = params.split(',');
    if (manifest) {
      // eslint-disable-next-line prettier/prettier
      return `<script src="${getManifestResource(src, manifest)}" ${extra.join(' ')}></script>`;
    }
    // eslint-disable-next-line prettier/prettier
    return `<script src="${withLeadingSlash(src)}" ${extra.join(' ')} type="module"></script>`;
  });
}

/**
 *
 * @param {string} code Code to transform
 * @param {Recode<string, any>} manifest Manifest file contents in case of production env
 * @returns Transformed code
 */
export function transform(code, manifest = null) {
  let transformed = transformScript(code, manifest);
  transformed = transformSource(transformed, manifest);
  transformed = transformContent(transformed, manifest);
  return transformed;
}
