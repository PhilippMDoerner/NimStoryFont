import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  oxcParse
} from "../_node-chunks/chunk-DMSSK5V7.js";
import "../_node-chunks/chunk-BKV2AHET.js";
import "../_node-chunks/chunk-TWWDCALS.js";
import "../_node-chunks/chunk-STC3JUUJ.js";
import "../_node-chunks/chunk-5SSDLDTJ.js";

// src/oxc-parser/worker.ts
import { parentPort } from "node:worker_threads";
if (!parentPort)
  throw new Error("oxc-parser worker must be run as a worker thread");
var port = parentPort;
port.on("message", async (msg) => {
  try {
    let edges = await oxcParse(msg.filePath, msg.source), response = { id: msg.id, ok: !0, edges };
    port.postMessage(response);
  } catch (error) {
    let err = error, response = {
      id: msg.id,
      ok: !1,
      message: err?.message ?? String(error),
      name: err?.name ?? "Error"
    };
    port.postMessage(response);
  }
});
