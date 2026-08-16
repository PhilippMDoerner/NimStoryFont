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

// src/loaders/storybook-mock-transform-loader.ts
import { rewriteSbMockImportCalls } from "storybook/internal/mocking-utils";
import { logger } from "storybook/internal/node-logger";
var storybookMockTransformLoader = function(source, sourceMap, meta) {
  let callback = this.async();
  try {
    let result = rewriteSbMockImportCalls(source);
    callback(null, result.code, result.map || void 0, meta);
  } catch (error) {
    let filePath = this.resourcePath;
    logger.debug(`Could not transform sb.mock(import(...)) calls in ${filePath}: ${error}`), callback(null, source, sourceMap, meta);
  }
}, storybook_mock_transform_loader_default = storybookMockTransformLoader;
export {
  storybook_mock_transform_loader_default as default
};
