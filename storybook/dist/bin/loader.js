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
  NODE_TARGET
} from "../_node-chunks/chunk-I3EOE2DR.js";
import {
  require_dist
} from "../_node-chunks/chunk-TWWDCALS.js";
import {
  __toESM
} from "../_node-chunks/chunk-5SSDLDTJ.js";

// src/bin/loader.ts
var import_ts_dedent = __toESM(require_dist(), 1);
import { readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { deprecate } from "storybook/internal/node-logger";
import { transform } from "esbuild";
var supportedExtensions = [
  ".js",
  ".mjs",
  ".cjs",
  ".jsx",
  ".ts",
  ".mts",
  ".cts",
  ".tsx"
], jsToTsExtensionMap = {
  ".js": [".ts", ".tsx"],
  ".mjs": [".mts"],
  ".cjs": [".cts"],
  ".jsx": [".tsx"]
}, directoryCache = /* @__PURE__ */ new Map();
function clearDirectoryCache() {
  directoryCache.clear();
}
function getDirectoryFiles(dir) {
  if (!directoryCache.has(dir))
    try {
      directoryCache.set(dir, new Set(readdirSync(dir)));
    } catch {
      directoryCache.set(dir, /* @__PURE__ */ new Set());
    }
  return directoryCache.get(dir);
}
function resolveWithExtension(importPath, currentFilePath) {
  let extImportPath = path.extname(importPath), currentDir = path.dirname(currentFilePath);
  if (extImportPath && extImportPath in jsToTsExtensionMap) {
    let basePath = importPath.slice(0, -extImportPath.length), tsExtensions = jsToTsExtensionMap[extImportPath], absoluteBase = path.resolve(currentDir, basePath), dirFiles2 = getDirectoryFiles(path.dirname(absoluteBase)), baseFileName2 = path.basename(absoluteBase);
    for (let tsExt of tsExtensions)
      if (dirFiles2.has(`${baseFileName2}${tsExt}`))
        return `${basePath}${tsExt}`;
    return importPath;
  }
  if (extImportPath)
    return importPath;
  deprecate(import_ts_dedent.dedent`
    One or more extensionless imports detected: "${importPath}" in file "${currentFilePath}".
    For more information on how to resolve the issue: 
    https://storybook.js.org/docs/faq#extensionless-imports-in-storybookmaints-and-required-ts-extensions
  `);
  let absolutePath = path.resolve(currentDir, importPath), dirFiles = getDirectoryFiles(path.dirname(absolutePath)), baseFileName = path.basename(absolutePath);
  for (let ext of supportedExtensions)
    if (dirFiles.has(`${baseFileName}${ext}`))
      return `${importPath}${ext}`;
  return importPath;
}
function addExtensionsToRelativeImports(source, filePath) {
  let patterns = [
    // import/export ... from './path' or "../path" (including side-effect imports)
    /(\b(?:import|export)\s+(?:[^'"]*?\s+from\s+)?['"])(\.[^'"]+)(['"])/g,
    // import('./path') or import("../path") - dynamic imports with quotes (with closing paren, no concatenation)
    /(\bimport\s*\(\s*['"])(\.[^'"]+)(['"]\s*\))/g,
    // import(`./path`) - dynamic imports with backticks (with closing paren, no template interpolation)
    /(\bimport\s*\(\s*`)(\.[^`$]+)(`\s*\))/g
  ], result = source;
  for (let pattern of patterns)
    result = result.replace(pattern, (match, prefix, path2, suffix) => {
      if (path2.startsWith("./") || path2.startsWith("../")) {
        let resolvedPath = resolveWithExtension(path2, filePath);
        return `${prefix}${resolvedPath}${suffix}`;
      }
      return match;
    });
  return result;
}
var load = async (url, context, nextLoad) => {
  let urlWithoutQuery = url.split("?")[0];
  if (urlWithoutQuery.endsWith(".ts") || urlWithoutQuery.endsWith(".tsx") || urlWithoutQuery.endsWith(".mts") || urlWithoutQuery.endsWith(".cts") || urlWithoutQuery.endsWith(".mtsx") || urlWithoutQuery.endsWith(".ctsx")) {
    let filePath = fileURLToPath(urlWithoutQuery), rawSource = await readFile(filePath, "utf-8"), transformedSource = await transform(rawSource, {
      loader: "ts",
      target: NODE_TARGET,
      format: "esm",
      platform: "neutral"
    });
    return {
      format: "module",
      shortCircuit: !0,
      source: addExtensionsToRelativeImports(transformedSource.code, filePath)
    };
  }
  return nextLoad(url, context);
};
export {
  addExtensionsToRelativeImports,
  clearDirectoryCache,
  load,
  resolveWithExtension,
  supportedExtensions
};
