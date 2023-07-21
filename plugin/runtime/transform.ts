import fs from 'fs'
import { withLeadingSlash } from "ufo"

const SOURCE_REGEX = /@source\((.*?)\)/gmi
const CONTENT_REGEX = /@content\((.*?)\)/gmi

export function transformSource(code, extraAttrs = '') {
  return code.replace(SOURCE_REGEX, (_string, params: string) => {
    const [src, srcAttr] = params.split(',')
    if (params.endsWith('.ts')) {
      return `${srcAttr?.trim() || 'src'}="${withLeadingSlash(src)}" ${extraAttrs}`
    }
    return `${srcAttr?.trim() || 'src'}="${withLeadingSlash(src)}"`
  })
}

export function transformContent(code) {
  return code.replace(CONTENT_REGEX, (_string, src) => {
    return fs.readFileSync(src, 'utf-8')
  })
}