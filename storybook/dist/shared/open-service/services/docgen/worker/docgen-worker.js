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
  errorToErrorLike
} from "../../../../../_node-chunks/chunk-VRYTK5KC.js";
import "../../../../../_node-chunks/chunk-4XX73STB.js";
import "../../../../../_node-chunks/chunk-5SSDLDTJ.js";

// src/shared/open-service/services/docgen/worker/docgen-worker.ts
import { parentPort } from "node:worker_threads";
import { pathToFileURL } from "node:url";
if (!parentPort)
  throw new Error("docgen worker must be run as a worker thread");
var port = parentPort, seedProvider = async () => {
}, providerPromise;
async function composeProvider(descriptors) {
  let provider = seedProvider;
  for (let descriptor of descriptors) {
    let mod = await import(pathToFileURL(descriptor.moduleSpecifier).href);
    if (typeof mod.createDocgenProvider != "function")
      throw new Error(
        `docgen worker module "${descriptor.moduleSpecifier}" does not export createDocgenProvider`
      );
    provider = (await mod.createDocgenProvider())(provider);
  }
  return provider;
}
async function handleInit(descriptors) {
  try {
    providerPromise = composeProvider(descriptors), await providerPromise, port.postMessage({ type: "init" });
  } catch (error) {
    providerPromise = void 0, port.postMessage({
      type: "init",
      error: errorToErrorLike(error)
    });
  }
}
async function handleExtract(id, entry) {
  try {
    if (!providerPromise)
      throw new Error("docgen worker received an extract request before init");
    let payload = await (await providerPromise)({ entry });
    port.postMessage({ type: "extract", id, payload });
  } catch (error) {
    port.postMessage({
      type: "extract",
      id,
      error: errorToErrorLike(error)
    });
  }
}
port.on("message", (msg) => {
  switch (msg.type) {
    case "init":
      handleInit(msg.descriptors);
      return;
    case "extract":
      handleExtract(msg.id, msg.entry);
      return;
    default: {
      let _exhaustive = msg;
      throw new Error(`docgen worker received unknown message: ${JSON.stringify(_exhaustive)}`);
    }
  }
});
