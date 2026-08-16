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
  OxcParseError,
  oxcParse
} from "../_node-chunks/chunk-DMSSK5V7.js";
import "../_node-chunks/chunk-BKV2AHET.js";
import "../_node-chunks/chunk-TWWDCALS.js";
import "../_node-chunks/chunk-STC3JUUJ.js";
import "../_node-chunks/chunk-5SSDLDTJ.js";

// src/oxc-parser/index.ts
import {
  parseSync as oxcRawParseSync
} from "oxc-parser";

// src/oxc-parser/worker-pool.ts
import { existsSync } from "node:fs";
import { cpus } from "node:os";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { logger } from "storybook/internal/node-logger";
var WORKER_RELATIVE_PATH = "../oxc-parser/worker.js", DEFAULT_TASK_TIMEOUT_MS = 3e4;
function resolveWorkerScriptPath() {
  if (typeof import.meta.url != "string")
    return;
  let path = fileURLToPath(new URL(WORKER_RELATIVE_PATH, import.meta.url));
  return existsSync(path) ? path : void 0;
}
function computePoolSize() {
  let cpuCount = cpus().length;
  return Math.max(1, Math.min(4, cpuCount - 1));
}
var OxcWorkerPool = class {
  constructor(scriptPath, size, taskTimeoutMs = DEFAULT_TASK_TIMEOUT_MS) {
    this.workers = [];
    this.queue = [];
    this.pending = /* @__PURE__ */ new Map();
    this.nextId = 0;
    this.disposed = !1;
    this.taskTimeoutMs = taskTimeoutMs;
    try {
      for (let i = 0; i < size; i++) {
        let worker = new Worker(scriptPath), slot = { worker, busy: !1 };
        worker.on("message", (msg) => this.handleMessage(slot, msg)), worker.on("error", (error) => this.handleWorkerFailure(error)), worker.on("exit", (code) => {
          this.disposed || this.handleWorkerFailure(new Error(`oxc-worker exited unexpectedly with code ${code}`));
        }), worker.unref(), this.workers.push(slot);
      }
    } catch (err) {
      for (let slot of this.workers)
        slot.worker.terminate().catch(() => 0);
      throw this.workers.length = 0, err;
    }
  }
  parse(filePath, source) {
    return this.disposed ? Promise.reject(new OxcParseError("oxc parse pool disposed")) : new Promise((resolve, reject) => {
      this.queue.push({ filePath, source, resolve, reject }), this.drain();
    });
  }
  drain() {
    for (; this.queue.length > 0; ) {
      let slot = this.workers.find((s) => !s.busy);
      if (!slot)
        return;
      let task = this.queue.shift(), id = this.nextId++;
      slot.busy = !0;
      let pending = {
        resolve: task.resolve,
        reject: task.reject
      };
      this.taskTimeoutMs > 0 && (pending.timer = setTimeout(() => {
        this.handleWorkerFailure(
          new Error(`oxc-worker task ${id} timed out after ${this.taskTimeoutMs}ms`)
        );
      }, this.taskTimeoutMs), pending.timer.unref?.()), this.pending.set(id, pending), slot.worker.postMessage({ id, filePath: task.filePath, source: task.source });
    }
  }
  handleMessage(slot, msg) {
    let entry = this.pending.get(msg.id);
    if (entry) {
      if (entry.timer && clearTimeout(entry.timer), this.pending.delete(msg.id), slot.busy = !1, msg.ok && msg.edges)
        entry.resolve(msg.edges);
      else {
        let err = new OxcParseError(msg.message ?? "oxc-worker error");
        msg.name && (err.name = msg.name), entry.reject(err);
      }
      this.drain();
    }
  }
  /**
   * On any worker failure: reject all in-flight and queued tasks, dispose the pool so
   * subsequent parse() calls fail fast and the caller in index.ts falls back to inline
   * oxcParse. Nulls out the module-level pool reference so getOxcParsePool() returns null.
   */
  handleWorkerFailure(error) {
    if (!this.disposed) {
      logger.debug(`oxc-worker failure: ${error.message}`), this.disposed = !0;
      for (let [, entry] of this.pending)
        entry.timer && clearTimeout(entry.timer), entry.reject(new OxcParseError(`oxc-worker failure: ${error.message}`, { cause: error }));
      this.pending.clear();
      for (let queued of this.queue)
        queued.reject(new OxcParseError("oxc parse pool disposed"));
      this.queue.length = 0;
      for (let slot of this.workers)
        slot.worker.terminate().catch(() => 0);
      this.workers.length = 0, sharedPool = null;
    }
  }
  async dispose() {
    if (this.disposed)
      return;
    this.disposed = !0;
    for (let [, entry] of this.pending)
      entry.timer && clearTimeout(entry.timer), entry.reject(new OxcParseError("oxc parse pool disposed"));
    this.pending.clear();
    for (let queued of this.queue)
      queued.reject(new OxcParseError("oxc parse pool disposed"));
    this.queue.length = 0;
    let terminations = this.workers.map((s) => s.worker.terminate().catch(() => 0));
    this.workers.length = 0, await Promise.all(terminations);
  }
}, sharedPool = null;
function ensurePool() {
  if (sharedPool)
    return;
  let scriptPath = resolveWorkerScriptPath();
  if (!scriptPath) {
    logger.debug(
      "oxc worker pool disabled: compiled worker script not found (running from source?)"
    );
    return;
  }
  try {
    sharedPool = new OxcWorkerPool(scriptPath, computePoolSize());
  } catch (error) {
    logger.debug(
      `oxc worker pool disabled: failed to spawn (${error instanceof Error ? error.message : String(error)})`
    ), sharedPool = null;
  }
}
function getOxcParsePool() {
  return ensurePool(), sharedPool;
}
async function disposeOxcParsePool() {
  let pool = sharedPool;
  sharedPool = null, pool && await pool.dispose().catch(() => {
  });
}

// src/oxc-parser/index.ts
async function parseWithOxc(filePath, source) {
  let pool = getOxcParsePool();
  if (!pool)
    return oxcParse(filePath, source);
  try {
    return await pool.parse(filePath, source);
  } catch {
    return oxcParse(filePath, source);
  }
}
async function parseBarrelInfo(filePath, source) {
  let parseResult;
  try {
    parseResult = oxcRawParseSync(filePath, source);
  } catch {
    return { named: /* @__PURE__ */ new Map(), wildcards: [] };
  }
  let moduleInfo = parseResult.module;
  if (!moduleInfo)
    return { named: /* @__PURE__ */ new Map(), wildcards: [] };
  let named = /* @__PURE__ */ new Map(), wildcards = [];
  for (let staticExport of moduleInfo.staticExports)
    for (let entry of staticExport.entries) {
      if (!entry.moduleRequest)
        continue;
      let specifier = entry.moduleRequest.value;
      if (entry.exportName.kind === "None") {
        wildcards.push(specifier);
        continue;
      }
      let exportedName = entry.exportName.name;
      exportedName && (entry.importName.kind !== "Name" || !entry.importName.name || named.set(exportedName, { specifier, importedName: entry.importName.name }));
    }
  return { named, wildcards };
}
function collectDeclaredNames(node, names) {
  if (node.type === "FunctionDeclaration" || node.type === "ClassDeclaration") {
    node.id?.name && names.add(node.id.name);
    return;
  }
  if (node.type === "VariableDeclaration" && Array.isArray(node.declarations))
    for (let declarator of node.declarations) {
      let { id } = declarator;
      id?.type === "Identifier" && id.name && names.add(id.name);
    }
}
async function parseLocalBindings(filePath, source) {
  let parseResult;
  try {
    parseResult = oxcRawParseSync(filePath, source);
  } catch {
    return /* @__PURE__ */ new Set();
  }
  let body = parseResult.program?.body;
  if (!Array.isArray(body))
    return /* @__PURE__ */ new Set();
  let names = /* @__PURE__ */ new Set();
  for (let statement of body) {
    let node = statement;
    node.type === "VariableDeclaration" || node.type === "FunctionDeclaration" || node.type === "ClassDeclaration" ? collectDeclaredNames(node, names) : node.type === "ExportNamedDeclaration" && node.declaration && !node.source && collectDeclaredNames(node.declaration, names);
  }
  return names;
}
async function parseReExports(filePath, source) {
  let parseResult;
  try {
    parseResult = oxcRawParseSync(filePath, source);
  } catch {
    return /* @__PURE__ */ new Map();
  }
  let moduleInfo = parseResult.module;
  if (!moduleInfo)
    return /* @__PURE__ */ new Map();
  let map = /* @__PURE__ */ new Map();
  for (let staticExport of moduleInfo.staticExports)
    for (let entry of staticExport.entries) {
      if (entry.isType || !entry.moduleRequest || entry.exportName.kind === "None")
        continue;
      let exportedName = entry.exportName.name;
      if (!exportedName)
        continue;
      let specifier = entry.moduleRequest.value;
      if (entry.importName.kind !== "Name" || !entry.importName.name)
        continue;
      let importedName = entry.importName.name;
      map.set(exportedName, { specifier, importedName });
    }
  return map;
}
export {
  disposeOxcParsePool,
  parseBarrelInfo,
  parseLocalBindings,
  parseReExports,
  parseWithOxc
};
