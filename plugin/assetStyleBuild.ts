import fs from 'fs'
import { ConfigEnv, PluginOption } from 'vite'
import { globbySync } from 'globby'
import { PreRenderedAsset } from 'rollup'
import path from 'path'
import { withLeadingSlash } from 'ufo'

const ASSET_REGEX = /<style(.*)@asset\((.*)\)(.*)><\/style>/gmi

function getPages() {
  const pagesPaths = globbySync('src/pages/**/*.page.*')
  const pages = pagesPaths.map((pagePath) => {
    return {
      src: pagePath,
      code: fs.readFileSync(pagePath, 'utf-8')
    }
  })
  return pages
}

function getAssetsManifest() {
  return fs.readFileSync('output/client/manifest.json', 'utf-8')
}

export default function assetStyleBuild(): PluginOption {
  let envConfig: ConfigEnv | undefined;
  let manifest: Object;
  return {
    name: 'vite-style-build-plugin',
    enforce: 'post',
    apply: 'build',
    config(_, env) {
      envConfig = env
    },
    outputOptions(options) {
      return {
        ...options,
        assetFileNames(assetInfo) {
          const defaultPattern = () => {
            if (typeof options.assetFileNames === 'function') {
              return options.assetFileNames(assetInfo)
            }
            return options.assetFileNames || 'assets/[name]-[hash].[ext]'
          }
          if (!assetInfo.name) return defaultPattern();
          let extType = path.extname(assetInfo.name)
          if (extType && /.css/i.test(extType)) {
            return 'styles/[name]-[hash].[ext]';
          }
          return defaultPattern();
        },
      }
    },
    buildStart() {
      if (!envConfig?.ssrBuild) {
        getPages().forEach(({ code }) => {
          const assetsSrc = [...code.matchAll(ASSET_REGEX)]
          assetsSrc.forEach(([_, _attr1, src, _attr2]) => {
            if (src.endsWith('.css')) {
              this.emitFile({
                id: src,
                type: 'chunk',
              })
            }
          })
        })
      } else {
        manifest = JSON.parse(getAssetsManifest())
      }
    },
    transform(code, _id, options) {
      if (options?.ssr) {
        const replaced = code.replace(ASSET_REGEX, (_string, g1, g2, g3) => {
          if (g2.endsWith('.css')) {
            const source = fs.readFileSync(`output/client/${manifest[g2].file}`, 'utf-8')
            return `<style ${g1.trim()} ${g3.trim()}>${source}</style>`
          }
          return _string
        })

        return {
          code: replaced
        }
      }
    }
  }
}