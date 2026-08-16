import CJS_COMPAT_NODE_URL_p9algb9hq6 from 'node:url';
import CJS_COMPAT_NODE_PATH_p9algb9hq6 from 'node:path';
import CJS_COMPAT_NODE_MODULE_p9algb9hq6 from "node:module";

var __filename = CJS_COMPAT_NODE_URL_p9algb9hq6.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_p9algb9hq6.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_p9algb9hq6.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  compile
} from "./_node-chunks/chunk-GTWZI5L5.js";
import "./_node-chunks/chunk-RAGJXYBM.js";
import "./_node-chunks/chunk-WI3NMAB4.js";
import "./_node-chunks/chunk-OXARODWN.js";

// src/mdx-loader.ts
var DEFAULT_RENDERER = `
import React from 'react';
`;
async function loader(content) {
  let callback = this.async(), options = { ...this.getOptions(), filepath: this.resourcePath };
  try {
    let result = await compile(content, options), code = `${DEFAULT_RENDERER}
${result}`;
    return callback(null, code);
  } catch (err) {
    return console.error("Error loading:", this.resourcePath), callback(err);
  }
}
var mdx_loader_default = loader;
export {
  mdx_loader_default as default
};
