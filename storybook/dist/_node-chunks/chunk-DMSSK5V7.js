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
  StorybookError
} from "./chunk-BKV2AHET.js";

// src/oxc-parser/parse.ts
import { parse as oxcRawParse } from "oxc-parser";

// src/oxc-parser/errors.ts
var OxcParseError = class extends StorybookError {
  constructor(message, options) {
    super({
      name: "OxcParseError",
      category: "CORE-SERVER" /* CORE_SERVER */,
      code: 17,
      message
    }), options?.cause !== void 0 && (this.cause = options.cause);
  }
};

// src/oxc-parser/parse.ts
var MAX_PARSE_SIZE = 2e6;
async function oxcParse(filePath, source) {
  if (source.length > MAX_PARSE_SIZE)
    return [];
  let parseResult;
  try {
    parseResult = await oxcRawParse(filePath, source);
  } catch (error) {
    throw new OxcParseError(
      `oxc-parser failed for ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
      error instanceof Error ? { cause: error } : void 0
    );
  }
  let moduleInfo = parseResult.module;
  if (!moduleInfo)
    throw new OxcParseError(`oxc-parser returned no module info for ${filePath}`);
  let edges = [], seen = /* @__PURE__ */ new Set(), staticImportEdges = /* @__PURE__ */ new Map();
  for (let staticImport of moduleInfo.staticImports) {
    let specifier = staticImport.moduleRequest.value;
    if (staticImport.entries.length > 0 && staticImport.entries.every((entry) => entry.isType))
      continue;
    let key = `static:${specifier}`, newNames = extractImportedNames(staticImport.entries), existing = staticImportEdges.get(key);
    if (existing)
      if (existing.importedNames !== null && newNames !== null)
        for (let name of newNames)
          existing.importedNames.add(name);
      else
        existing.importedNames = null;
    else {
      let edge = { specifier, kind: "static", importedNames: newNames };
      staticImportEdges.set(key, edge), edges.push(edge), seen.add(key);
    }
  }
  for (let staticExport of moduleInfo.staticExports)
    for (let entry of staticExport.entries) {
      if (!entry.moduleRequest || entry.isType)
        continue;
      let specifier = entry.moduleRequest.value, key = `static:${specifier}`;
      seen.has(key) || (seen.add(key), edges.push({ specifier, kind: "static", importedNames: null }));
    }
  for (let dynamicImport of moduleInfo.dynamicImports) {
    let specifierSpan = dynamicImport.moduleRequest, literal = extractLiteralFromSource(source, specifierSpan.start, specifierSpan.end);
    if (literal === null)
      continue;
    let key = `dynamic:${literal}`;
    seen.has(key) || (seen.add(key), edges.push({ specifier: literal, kind: "dynamic", importedNames: null }));
  }
  return parseResult.program?.body && canContainRequireCall(filePath, source) && collectRequireSpecifiers(parseResult.program, edges, seen), edges;
}
function canContainRequireCall(filePath, source) {
  let dot = filePath.lastIndexOf(".");
  if (dot !== -1) {
    let ext = filePath.slice(dot).toLowerCase();
    if (ext === ".mjs" || ext === ".mts")
      return !1;
  }
  return source.includes("require(");
}
function extractLiteralFromSource(source, start, end) {
  if (start < 0 || end > source.length || end <= start)
    return null;
  let slice = source.slice(start, end), first = slice[0], last = slice[slice.length - 1];
  if ((first === '"' || first === "'" || first === "`") && last === first && slice.length >= 2) {
    let inner = slice.slice(1, -1);
    return first === "`" && inner.includes("${") ? null : inner;
  }
  return null;
}
function extractImportedNames(entries) {
  if (entries.length === 0)
    return null;
  let names = /* @__PURE__ */ new Set();
  for (let entry of entries) {
    if (entry.isType)
      continue;
    let { kind, name } = entry.importName;
    if (kind === "NamespaceObject")
      return null;
    kind === "Default" ? names.add("default") : kind === "Name" && name && names.add(name);
  }
  return names.size > 0 ? names : null;
}
function collectRequireSpecifiers(root, edges, seen) {
  let stack = [root];
  for (; stack.length > 0; ) {
    let node = stack.pop();
    if (node === null || typeof node != "object")
      continue;
    if (Array.isArray(node)) {
      for (let i = node.length - 1; i >= 0; i--)
        stack.push(node[i]);
      continue;
    }
    let maybeNode = node;
    if (maybeNode.type === "CallExpression") {
      let callee = maybeNode.callee;
      if (callee && callee.type === "Identifier" && callee.name === "require") {
        let firstArg = (Array.isArray(maybeNode.arguments) ? maybeNode.arguments : [])[0];
        if (firstArg && (firstArg.type === "StringLiteral" || firstArg.type === "Literal") && typeof firstArg.value == "string") {
          let specifier = firstArg.value, key = `require:${specifier}`;
          seen.has(key) || (seen.add(key), edges.push({ specifier, kind: "require", importedNames: null }));
        }
      }
    }
    for (let key of Object.keys(node))
      key === "parent" || key === "loc" || key === "range" || stack.push(node[key]);
  }
}

export {
  OxcParseError,
  oxcParse
};
