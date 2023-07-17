import { PluginOption } from 'vite'

const SCRIPT_REGEX = /<script(.*)></gim

export default function build(): PluginOption {
  return {
    name: 'vite-build-plugin',
    enforce: 'post',
    apply: 'build',
    transform(code, id, options) {
      if (SCRIPT_REGEX.test(code) && !options?.ssr) {
        code.replace(SCRIPT_REGEX, (content, g1: string, g2, g3) => {
          
          const attributes = [...g1.matchAll(/([a-zA-Z0-9-]+)(?:=['"](.*?)['"])?/gim)]
          const srcAttribute = attributes.find(attr => attr[1] === 'src')
          if (srcAttribute && srcAttribute[2] && srcAttribute[2].startsWith('@')) {

            const srcPath = srcAttribute[2].replace('@', 'src/').concat('.ts')

            const script = this.emitFile({
              id: srcPath,
              type: 'chunk',
            })
            console.log('\n\n\n\n script-', script)
          }
          return ''
        })
      }
    },
    outputOptions(options) {
      return null;
    }
  }
}