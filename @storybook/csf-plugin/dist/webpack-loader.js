import CJS_COMPAT_NODE_URL_f9ojq61007o from 'node:url';
import CJS_COMPAT_NODE_PATH_f9ojq61007o from 'node:path';
import CJS_COMPAT_NODE_MODULE_f9ojq61007o from "node:module";

var __filename = CJS_COMPAT_NODE_URL_f9ojq61007o.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_f9ojq61007o.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_f9ojq61007o.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/webpack-loader.ts
import { readFile } from "node:fs/promises";
import { enrichCsf, formatCsf, loadCsf } from "storybook/internal/csf-tools";
async function loader(content, map) {
  let callback = this.async(), options = this.getOptions(), id = this.resourcePath, sourceCode = await readFile(id, "utf-8");
  try {
    let makeTitle = (userTitle) => userTitle || "default", csf = loadCsf(content, { makeTitle }).parse(), csfSource = loadCsf(sourceCode, { makeTitle }).parse();
    await enrichCsf(csf, csfSource, options);
    let formattedCsf = formatCsf(
      csf,
      { sourceMaps: !0, inputSourceMap: map, sourceFileName: id },
      content
    );
    if (typeof formattedCsf == "string")
      return callback(null, formattedCsf, map);
    callback(null, formattedCsf.code, formattedCsf.map);
  } catch (err) {
    err.message?.startsWith("CSF:") || console.warn(err.message), callback(null, content, map);
  }
}
var webpack_loader_default = loader;
export {
  webpack_loader_default as default
};
