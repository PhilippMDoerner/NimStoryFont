import CJS_COMPAT_NODE_URL_a8prd92229n from 'node:url';
import CJS_COMPAT_NODE_PATH_a8prd92229n from 'node:path';
import CJS_COMPAT_NODE_MODULE_a8prd92229n from "node:module";

var __filename = CJS_COMPAT_NODE_URL_a8prd92229n.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_a8prd92229n.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_a8prd92229n.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import "../_node-chunks/chunk-QYH4QKGX.js";

// src/loaders/webpack-automock-loader.ts
import { babelParser, getAutomockCode } from "storybook/internal/mocking-utils";
function webpackAutomockLoader(source) {
  let isSpy = this.getOptions().spy === "true";
  return getAutomockCode(source, isSpy, babelParser).toString();
}
export {
  webpackAutomockLoader as default
};
