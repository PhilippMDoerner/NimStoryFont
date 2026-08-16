import CJS_COMPAT_NODE_URL_m3cx8917gnb from 'node:url';
import CJS_COMPAT_NODE_PATH_m3cx8917gnb from 'node:path';
import CJS_COMPAT_NODE_MODULE_m3cx8917gnb from "node:module";

var __filename = CJS_COMPAT_NODE_URL_m3cx8917gnb.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_m3cx8917gnb.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_m3cx8917gnb.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// ../../../node_modules/empathic/find.mjs
import { join as join2 } from "node:path";
import { existsSync, statSync } from "node:fs";

// ../../../node_modules/empathic/walk.mjs
import { dirname } from "node:path";

// ../../../node_modules/empathic/resolve.mjs
import { isAbsolute, join, resolve } from "node:path";
function absolute(input, root) {
  return isAbsolute(input) ? input : resolve(root || ".", input);
}

// ../../../node_modules/empathic/walk.mjs
function up(base, options) {
  let { last, cwd } = options || {}, tmp = absolute(base, cwd), root = absolute(last || "/", cwd), prev, arr = [];
  for (; prev !== root && (arr.push(tmp), tmp = dirname(prev = tmp), tmp !== prev); )
    ;
  return arr;
}

// ../../../node_modules/empathic/find.mjs
function up2(name, options) {
  let dir, tmp, start = options && options.cwd || "";
  for (dir of up(start, options))
    if (tmp = join2(dir, name), existsSync(tmp)) return tmp;
}

export {
  up2 as up
};
