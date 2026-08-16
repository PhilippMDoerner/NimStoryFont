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

// src/loaders/export-order-loader.ts
import assert from "node:assert";
import { init as initCjsParser, parse as parseCjs } from "cjs-module-lexer";
import { parse as parseEs } from "es-module-lexer";
import MagicString from "magic-string";
async function loader(source, map, meta) {
  let callback = this.async();
  try {
    let magicString = new MagicString(source);
    if (!source.includes("__namedExportsOrder"))
      try {
        let namedExportsOrder = ((await parseEs(source))[1] || []).map((e) => source.substring(e.s, e.e)).filter((e) => e !== "default");
        assert(
          namedExportsOrder.length > 0,
          "No named exports found. Very likely that this is not a ES module."
        ), magicString.append(
          `;export const __namedExportsOrder = ${JSON.stringify(namedExportsOrder)};`
        );
      } catch {
        await initCjsParser();
        let namedExportsOrder = (parseCjs(source).exports || []).filter(
          (e) => e !== "default" && e !== "__esModule"
        );
        assert(
          namedExportsOrder.length > 0,
          "No named exports found. Very likely that this is not a CJS module."
        ), magicString.append(
          `;module.exports.__namedExportsOrder = ${JSON.stringify(namedExportsOrder)};`
        );
      }
    return callback(null, magicString.toString(), map, meta);
  } catch {
    return callback(null, source, map, meta);
  }
}
export {
  loader as default
};
