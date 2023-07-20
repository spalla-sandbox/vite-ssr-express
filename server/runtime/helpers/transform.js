import fs from 'fs'
import path from 'node:path'
import { withLeadingSlash } from 'ufo'

const SOURCE_REGEX = /@source\((.*?)\)/gmi
const CONTENT_REGEX = /@content\((.*?)\)/gmi

export function transformSource(code, manifest) {
  return code.replace(SOURCE_REGEX, (_string, src) => {
    if (manifest[src].url) {
      return `src="${withLeadingSlash(manifest[src].url)}"`
    }
    return `src="${withLeadingSlash(manifest[src].file)}"`
  })
}

export function transformContent(code, manifest) {
  return code.replace(CONTENT_REGEX, (_string, src) => {
    return fs.readFileSync(path.resolve('./output/client', manifest[src].file), 'utf-8')
  })
}

export function transform(code, manifest) {
  let transformed = transformSource(code, manifest);
  transformed = transformContent(transformed, manifest);
  return transformed
}