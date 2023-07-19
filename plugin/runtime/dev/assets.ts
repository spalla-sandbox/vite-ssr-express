import fs from 'fs'
import { withLeadingSlash } from "ufo"

export function transformDevScript(code) {
  return code.replace(/@asset\((.*)\)/gmi, (_string, group) => {
    if (group.endsWith('.ts')) {
      return `type="module" src="${withLeadingSlash(group)}"`
    }
    return _string
  })
}

export function transformDevCss(code) {
  return code.replace(/<style(.*)@asset\((.*)\)(.*)><\/style>/gmi, (_string, g1, g2, g3) => {
    return `<style ${g1.trim()} ${g3.trim()}>${fs.readFileSync(g2, 'utf-8')}</style>`
  })
}