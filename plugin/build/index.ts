import fs from 'fs'
import { ConfigEnv, PluginOption } from 'vite'
import { globbySync } from 'globby'
import { withLeadingSlash } from 'ufo'

const ASSET_REGEX = /@asset\((.*)\)/gmi

function getPages() {
  const pagesPaths = globbySync('src/pages/**/*.page.*')
  const pages = pagesPaths.map((pagePath) => {
    return {
      src: pagePath,
      code: fs.readFileSync(pagePath).toString()
    }
  })
  return pages
}

function getAssetsManifest() {
  if (!fs.existsSync('output/client/manifest.json')) {
    throw new Error(`
      No assets manifest found.
      Please, build client before server to generate the assets manifest
    `)
  }
  return fs.readFileSync('output/client/manifest.json').toString()
}

export default function build(): PluginOption {
  let envConfig: ConfigEnv | undefined;
  let manifest: Object;
  return {
    name: 'vite-build-plugin',
    enforce: 'post',
    apply: 'build',
    config(_, env) {
      envConfig = env
    },
    buildStart() {
      // If is client build
      if (!envConfig?.ssrBuild) {
        getPages().forEach(({ code }) => {
          const assetsSrc = [...code.matchAll(/@asset\((.*)\)/gmi)]
          assetsSrc.forEach(([_, src]) => {
            this.emitFile({
              id: src,
              type: 'chunk',
            })
          })
        })
      } else {
        manifest = JSON.parse(getAssetsManifest())
      }
    },
    transform(code, id, options) {
      if (options?.ssr) {
        const replaced = code.replace(ASSET_REGEX, (_, g1) => {          
          const src = `src="${withLeadingSlash(manifest[g1].file)}"`
          return src
        })

        return {
          code: replaced
        }
      }
    },
    outputOptions(options) {
      return null;
    }
  }
}