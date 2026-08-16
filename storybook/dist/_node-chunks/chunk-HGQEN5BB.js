import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// ../../node_modules/nanoid/index.js
import { randomFillSync } from "crypto";

// ../../node_modules/nanoid/url-alphabet/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// ../../node_modules/nanoid/index.js
var POOL_SIZE_MULTIPLIER = 128, pool, poolOffset, fillPool = (bytes) => {
  !pool || pool.length < bytes ? (pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER), randomFillSync(pool), poolOffset = 0) : poolOffset + bytes > pool.length && (randomFillSync(pool), poolOffset = 0), poolOffset += bytes;
};
var nanoid = (size = 21) => {
  fillPool(size -= 0);
  let id = "";
  for (let i = poolOffset - size; i < poolOffset; i++)
    id += urlAlphabet[pool[i] & 63];
  return id;
};

export {
  nanoid
};
