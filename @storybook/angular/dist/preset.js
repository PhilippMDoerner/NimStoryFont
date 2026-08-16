import CJS_COMPAT_NODE_URL_m3cx8917gnb from 'node:url';
import CJS_COMPAT_NODE_PATH_m3cx8917gnb from 'node:path';
import CJS_COMPAT_NODE_MODULE_m3cx8917gnb from "node:module";

var __filename = CJS_COMPAT_NODE_URL_m3cx8917gnb.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_m3cx8917gnb.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_m3cx8917gnb.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/preset.ts
import { fileURLToPath } from "node:url";
var addons = [
  fileURLToPath(import.meta.resolve("@storybook/angular/server/framework-preset-angular-cli")),
  fileURLToPath(import.meta.resolve("@storybook/angular/server/framework-preset-angular-ivy"))
], previewAnnotations = async (entries = [], options) => {
  let config = fileURLToPath(import.meta.resolve("@storybook/angular/client/config")), annotations = [...entries, config];
  if (options.enableProdMode) {
    let previewProdPath = fileURLToPath(
      import.meta.resolve("@storybook/angular/client/preview-prod")
    );
    annotations.unshift(previewProdPath);
  }
  let docsConfig = await options.presets.apply("docs", {}, options);
  if (Object.keys(docsConfig).length > 0) {
    let docsConfigPath = fileURLToPath(
      import.meta.resolve("@storybook/angular/client/docs/config")
    );
    annotations.push(docsConfigPath);
  }
  return annotations;
}, core = {
  builder: import.meta.resolve("@storybook/builder-webpack5")
}, typescript = async (config) => ({
  ...config,
  skipCompiler: !0
});
export {
  addons,
  core,
  previewAnnotations,
  typescript
};
