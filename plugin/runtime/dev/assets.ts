import fs from 'fs'
import { withLeadingSlash } from "ufo"

function log(...text) {
  console.log('\n\n\n', ...text, '\n\n\n')
}

const SCRIPT_REGEX = /(['"`]?)<script(.*)@asset\((.*?)\)(.*)><\\\/script>(['"`]?)/gmi
const STYLE_REGEX = /(['"`]?)<style(.*)@asset\((.*)\)(.*)><\/style>(['"`]?)/gmi

export function transformDevScript(code: string) {
  return code.replace(SCRIPT_REGEX, (_string, _g1, g2, g3, g4) => {
    if (g3.endsWith('.ts')) {
      return `\`<script ${g2.trim()} ${g4.trim()} type="module" src="${withLeadingSlash(g3)}"></script>\``
    }
    return _string
  })
}

export function transformDevCss(code) {
  return code.replace(STYLE_REGEX, (_string, _g1, g2, g3, g4) => {
    return `\`<style ${g2.trim()} ${g4.trim()}>${fs.readFileSync(g3, 'utf-8')}</style>\``
  })
}