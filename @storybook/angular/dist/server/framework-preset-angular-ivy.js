import CJS_COMPAT_NODE_URL_m3cx8917gnb from 'node:url';
import CJS_COMPAT_NODE_PATH_m3cx8917gnb from 'node:path';
import CJS_COMPAT_NODE_MODULE_m3cx8917gnb from "node:module";

var __filename = CJS_COMPAT_NODE_URL_m3cx8917gnb.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_m3cx8917gnb.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_m3cx8917gnb.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/server/framework-preset-angular-ivy.ts
import { join } from "node:path";
import { createRequire } from "node:module";
var require2 = createRequire(import.meta.url);
function loadEsmModule(modulePath) {
  return new Function("modulePath", "return import(modulePath);")(modulePath);
}
var runNgcc = async () => {
  let ngcc;
  try {
    ngcc = require2("@angular/compiler-cli/ngcc");
  } catch {
    ngcc = await loadEsmModule("@angular/compiler-cli/ngcc");
  }
  ngcc.process({
    // should be async: true but does not work due to
    // https://github.com/storybookjs/storybook/pull/11157/files#r615413803
    async: !1,
    basePath: join(process.cwd(), "node_modules"),
    // absolute path to node_modules
    createNewEntryPointFormats: !0,
    // --create-ivy-entry-points
    compileAllFormats: !1
    // --first-only
  });
}, webpack = async (webpackConfig, options) => {
  let framework = await options.presets.apply("framework");
  return (typeof framework == "object" ? framework.options : {}).enableIvy === !1 ? webpackConfig : {
    ...webpackConfig,
    resolve: {
      ...webpackConfig.resolve,
      mainFields: ["browser", "module", "main"]
    }
  };
};
export {
  runNgcc,
  webpack
};
