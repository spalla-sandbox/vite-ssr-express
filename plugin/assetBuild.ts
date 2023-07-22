import { ConfigEnv, PluginOption } from 'vite';
import { emitContents, emitScripts, emitSources } from './runtime/build/assets';
import { getPages } from './runtime/build/pages';

/**
 * Helps to emit assets to bundle on build step
 * @returns Plugin configuration
 */
export default function assetBuild(): PluginOption {
  let envConfig: ConfigEnv;
  return {
    name: 'vite-build-plugin',
    enforce: 'post',
    apply: 'build',
    config(_, env) {
      envConfig = env;
    },
    options(options) {
      if (!envConfig.ssrBuild) {
        return {
          ...options,
          input: undefined,
        };
      }
      return null;
    },
    buildStart() {
      if (!envConfig.ssrBuild) {
        getPages().forEach(({ code }) => {
          emitScripts(this, code);
          emitSources(this, code);
          emitContents(this, code);
        });
      }
    },
  };
}
