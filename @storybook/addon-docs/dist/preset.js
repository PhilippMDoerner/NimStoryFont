import CJS_COMPAT_NODE_URL_p9algb9hq6 from 'node:url';
import CJS_COMPAT_NODE_PATH_p9algb9hq6 from 'node:path';
import CJS_COMPAT_NODE_MODULE_p9algb9hq6 from "node:module";

var __filename = CJS_COMPAT_NODE_URL_p9algb9hq6.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_p9algb9hq6.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_p9algb9hq6.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import "./_node-chunks/chunk-OXARODWN.js";

// src/preset.ts
import { isAbsolute as isAbsolute2 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { logger as logger2 } from "storybook/internal/node-logger";

// ../../core/src/shared/utils/module.ts
import { createRequire, register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

// ../../../node_modules/exsolve/dist/index.mjs
import assert from "node:assert";
import v8 from "node:v8";
import { format, inspect } from "node:util";
var own$1 = {}.hasOwnProperty, classRegExp = /^([A-Z][a-z\d]*)+$/, kTypes = /* @__PURE__ */ new Set([
  "string",
  "function",
  "number",
  "object",
  "Function",
  "Object",
  "boolean",
  "bigint",
  "symbol"
]), messages = /* @__PURE__ */ new Map(), nodeInternalPrefix = "__node_internal_", userStackTraceLimit;
function formatList(array, type = "and") {
  return array.length < 3 ? array.join(` ${type} `) : `${array.slice(0, -1).join(", ")}, ${type} ${array.at(-1)}`;
}
function createError(sym, value, constructor) {
  return messages.set(sym, value), makeNodeErrorWithCode(constructor, sym);
}
function makeNodeErrorWithCode(Base, key) {
  return function(...parameters) {
    let limit = Error.stackTraceLimit;
    isErrorStackTraceLimitWritable() && (Error.stackTraceLimit = 0);
    let error = new Base();
    isErrorStackTraceLimitWritable() && (Error.stackTraceLimit = limit);
    let message = getMessage(key, parameters, error);
    return Object.defineProperties(error, {
      message: {
        value: message,
        enumerable: !1,
        writable: !0,
        configurable: !0
      },
      toString: {
        value() {
          return `${this.name} [${key}]: ${this.message}`;
        },
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), captureLargerStackTrace(error), error.code = key, error;
  };
}
function isErrorStackTraceLimitWritable() {
  try {
    if (v8.startupSnapshot.isBuildingSnapshot()) return !1;
  } catch {
  }
  let desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
  return desc === void 0 ? Object.isExtensible(Error) : own$1.call(desc, "writable") && desc.writable !== void 0 ? desc.writable : desc.set !== void 0;
}
function hideStackFrames(wrappedFunction) {
  let hidden = nodeInternalPrefix + wrappedFunction.name;
  return Object.defineProperty(wrappedFunction, "name", { value: hidden }), wrappedFunction;
}
var captureLargerStackTrace = hideStackFrames(function(error) {
  let stackTraceLimitIsWritable = isErrorStackTraceLimitWritable();
  return stackTraceLimitIsWritable && (userStackTraceLimit = Error.stackTraceLimit, Error.stackTraceLimit = Number.POSITIVE_INFINITY), Error.captureStackTrace(error), stackTraceLimitIsWritable && (Error.stackTraceLimit = userStackTraceLimit), error;
});
function getMessage(key, parameters, self) {
  let message = messages.get(key);
  if (assert.ok(message !== void 0, "expected `message` to be found"), typeof message == "function")
    return assert.ok(message.length <= parameters.length, `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${message.length}).`), Reflect.apply(message, self, parameters);
  let regex = /%[dfijoOs]/g, expectedLength = 0;
  for (; regex.exec(message) !== null; ) expectedLength++;
  return assert.ok(expectedLength === parameters.length, `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${expectedLength}).`), parameters.length === 0 ? message : (parameters.unshift(message), Reflect.apply(format, null, parameters));
}
function determineSpecificType(value) {
  if (value == null) return String(value);
  if (typeof value == "function" && value.name) return `function ${value.name}`;
  if (typeof value == "object")
    return value.constructor && value.constructor.name ? `an instance of ${value.constructor.name}` : `${inspect(value, { depth: -1 })}`;
  let inspected = inspect(value, { colors: !1 });
  return inspected.length > 28 && (inspected = `${inspected.slice(0, 25)}...`), `type ${typeof value} (${inspected})`;
}
var ERR_INVALID_ARG_TYPE = createError("ERR_INVALID_ARG_TYPE", (name, expected, actual) => {
  assert.ok(typeof name == "string", "'name' must be a string"), Array.isArray(expected) || (expected = [expected]);
  let message = "The ";
  if (name.endsWith(" argument")) message += `${name} `;
  else {
    let type = name.includes(".") ? "property" : "argument";
    message += `"${name}" ${type} `;
  }
  message += "must be ";
  let types = [], instances = [], other = [];
  for (let value of expected)
    assert.ok(typeof value == "string", "All expected entries have to be of type string"), kTypes.has(value) ? types.push(value.toLowerCase()) : classRegExp.exec(value) === null ? (assert.ok(value !== "object", 'The value "object" should be written as "Object"'), other.push(value)) : instances.push(value);
  if (instances.length > 0) {
    let pos = types.indexOf("object");
    pos !== -1 && (types.slice(pos, 1), instances.push("Object"));
  }
  return types.length > 0 && (message += `${types.length > 1 ? "one of type" : "of type"} ${formatList(types, "or")}`, (instances.length > 0 || other.length > 0) && (message += " or ")), instances.length > 0 && (message += `an instance of ${formatList(instances, "or")}`, other.length > 0 && (message += " or ")), other.length > 0 && (other.length > 1 ? message += `one of ${formatList(other, "or")}` : (other[0]?.toLowerCase() !== other[0] && (message += "an "), message += `${other[0]}`)), message += `. Received ${determineSpecificType(actual)}`, message;
}, TypeError), ERR_INVALID_MODULE_SPECIFIER = createError(
  "ERR_INVALID_MODULE_SPECIFIER",
  /**
  * @param {string} request
  * @param {string} reason
  * @param {string} [base]
  */
  (request, reason, base) => `Invalid module "${request}" ${reason}${base ? ` imported from ${base}` : ""}`,
  TypeError
), ERR_INVALID_PACKAGE_CONFIG = createError("ERR_INVALID_PACKAGE_CONFIG", (path$1, base, message) => `Invalid package config ${path$1}${base ? ` while importing ${base}` : ""}${message ? `. ${message}` : ""}`, Error), ERR_INVALID_PACKAGE_TARGET = createError("ERR_INVALID_PACKAGE_TARGET", (packagePath, key, target, isImport = !1, base) => {
  let relatedError = typeof target == "string" && !isImport && target.length > 0 && !target.startsWith("./");
  return key === "." ? (assert.ok(isImport === !1), `Invalid "exports" main target ${JSON.stringify(target)} defined in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? '; targets must start with "./"' : ""}`) : `Invalid "${isImport ? "imports" : "exports"}" target ${JSON.stringify(target)} defined for '${key}' in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? '; targets must start with "./"' : ""}`;
}, Error), ERR_MODULE_NOT_FOUND = createError("ERR_MODULE_NOT_FOUND", (path$1, base, exactUrl = !1) => `Cannot find ${exactUrl ? "module" : "package"} '${path$1}' imported from ${base}`, Error), ERR_NETWORK_IMPORT_DISALLOWED = createError("ERR_NETWORK_IMPORT_DISALLOWED", "import of '%s' by %s is not supported: %s", Error), ERR_PACKAGE_IMPORT_NOT_DEFINED = createError("ERR_PACKAGE_IMPORT_NOT_DEFINED", (specifier, packagePath, base) => `Package import specifier "${specifier}" is not defined${packagePath ? ` in package ${packagePath || ""}package.json` : ""} imported from ${base}`, TypeError), ERR_PACKAGE_PATH_NOT_EXPORTED = createError(
  "ERR_PACKAGE_PATH_NOT_EXPORTED",
  /**
  * @param {string} packagePath
  * @param {string} subpath
  * @param {string} [base]
  */
  (packagePath, subpath, base) => subpath === "." ? `No "exports" main defined in ${packagePath}package.json${base ? ` imported from ${base}` : ""}` : `Package subpath '${subpath}' is not defined by "exports" in ${packagePath}package.json${base ? ` imported from ${base}` : ""}`,
  Error
), ERR_UNSUPPORTED_DIR_IMPORT = createError("ERR_UNSUPPORTED_DIR_IMPORT", "Directory import '%s' is not supported resolving ES modules imported from %s", Error), ERR_UNSUPPORTED_RESOLVE_REQUEST = createError("ERR_UNSUPPORTED_RESOLVE_REQUEST", 'Failed to resolve module specifier "%s" from "%s": Invalid relative URL or base scheme is not hierarchical.', TypeError), ERR_UNKNOWN_FILE_EXTENSION = createError("ERR_UNKNOWN_FILE_EXTENSION", (extension, path$1) => `Unknown file extension "${extension}" for ${path$1}`, TypeError), ERR_INVALID_ARG_VALUE = createError("ERR_INVALID_ARG_VALUE", (name, value, reason = "is invalid") => {
  let inspected = inspect(value);
  return inspected.length > 128 && (inspected = `${inspected.slice(0, 128)}...`), `The ${name.includes(".") ? "property" : "argument"} '${name}' ${reason}. Received ${inspected}`;
}, TypeError), hasOwnProperty$1 = {}.hasOwnProperty;
var hasOwnProperty = {}.hasOwnProperty;
var RegExpPrototypeSymbolReplace = RegExp.prototype[Symbol.replace], own = {}.hasOwnProperty;
var isWindows = process.platform === "win32", globalCache = globalThis.__EXSOLVE_CACHE__ ||= /* @__PURE__ */ new Map();

// ../../../node_modules/pathe/dist/shared/pathe.ff20891b.mjs
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  return input && input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/, _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/, _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var normalize = function(path3) {
  if (path3.length === 0)
    return ".";
  path3 = normalizeWindowsPath(path3);
  let isUNCPath = path3.match(_UNC_REGEX), isPathAbsolute = isAbsolute(path3), trailingSeparator = path3[path3.length - 1] === "/";
  return path3 = normalizeString(path3, !isPathAbsolute), path3.length === 0 ? isPathAbsolute ? "/" : trailingSeparator ? "./" : "." : (trailingSeparator && (path3 += "/"), _DRIVE_LETTER_RE.test(path3) && (path3 += "/"), isUNCPath ? isPathAbsolute ? `//${path3}` : `//./${path3}` : isPathAbsolute && !isAbsolute(path3) ? `/${path3}` : path3);
}, join = function(...arguments_) {
  if (arguments_.length === 0)
    return ".";
  let joined;
  for (let argument of arguments_)
    argument && argument.length > 0 && (joined === void 0 ? joined = argument : joined += `/${argument}`);
  return joined === void 0 ? "." : normalize(joined.replace(/\/\/+/g, "/"));
};
function normalizeString(path3, allowAboveRoot) {
  let res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, char = null;
  for (let index = 0; index <= path3.length; ++index) {
    if (index < path3.length)
      char = path3[index];
    else {
      if (char === "/")
        break;
      char = "/";
    }
    if (char === "/") {
      if (!(lastSlash === index - 1 || dots === 1)) if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            let lastSlashIndex = res.lastIndexOf("/");
            lastSlashIndex === -1 ? (res = "", lastSegmentLength = 0) : (res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/")), lastSlash = index, dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "", lastSegmentLength = 0, lastSlash = index, dots = 0;
            continue;
          }
        }
        allowAboveRoot && (res += res.length > 0 ? "/.." : "..", lastSegmentLength = 2);
      } else
        res.length > 0 ? res += `/${path3.slice(lastSlash + 1, index)}` : res = path3.slice(lastSlash + 1, index), lastSegmentLength = index - lastSlash - 1;
      lastSlash = index, dots = 0;
    } else char === "." && dots !== -1 ? ++dots : dots = -1;
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
var dirname = function(p) {
  let segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  return segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0]) && (segments[0] += "/"), segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

// ../../core/src/shared/utils/module.ts
var importMetaResolve = (...args) => typeof import.meta.resolve != "function" && process.env.VITEST === "true" ? (console.warn(
  "importMetaResolve from within Storybook is being used in a Vitest test, but it shouldn't be. Please report this at https://github.com/storybookjs/storybook/issues/new?template=bug_report.yml"
), pathToFileURL(args[0]).href) : import.meta.resolve(...args), resolvePackageDir = (pkg, parent) => {
  try {
    return dirname(fileURLToPath(importMetaResolve(join(pkg, "package.json"), parent)));
  } catch {
    try {
      return dirname(fileURLToPath(importMetaResolve(join(pkg, "package.json"))));
    } catch {
      let req = createRequire(parent ?? import.meta.url);
      return dirname(req.resolve(join(pkg, "package.json")));
    }
  }
};

// src/mdx-service/server.ts
import { getComponentIdFromEntry as getComponentIdFromEntry2, groupBy as groupBy2, registerService } from "storybook/internal/common";
import { Tag as Tag2 } from "storybook/internal/core-server";

// src/manifest.ts
import * as fs from "node:fs/promises";
import * as path2 from "node:path";
import { getComponentIdFromEntry, groupBy } from "storybook/internal/common";
import {
  Tag,
  analyzeMdx,
  mdxManifestRef
} from "storybook/internal/core-server";
import { logger } from "storybook/internal/node-logger";

// src/extract-docs-summary.ts
function extractDocsSummary(content) {
  let result = content;
  result = result.replace(/^\s*import\s+(?:[\s\S]*?from\s+)?['"][^'"]+['"];?\s*$/gm, "");
  let prevResult = "";
  for (; prevResult !== result; )
    prevResult = result, result = result.replace(/\{[^{}]*\}/g, "");
  for (result = result.replace(/<[^>]+\/>/g, ""), prevResult = ""; prevResult !== result; )
    prevResult = result, result = result.replace(/<(\w+)[^>]*>([\s\S]*?)<\/\1>/g, "$2");
  if (result = result.replace(/<[^>]+>/g, ""), result = result.replace(/\s+/g, " ").trim(), !!result)
    return result.length > 90 ? `${result.slice(0, 90)}...` : result;
}

// src/manifest.ts
async function createDocsManifestEntry(entry) {
  let absolutePath = path2.join(process.cwd(), entry.importPath);
  try {
    let content = await fs.readFile(absolutePath, "utf-8"), { summary } = await analyzeMdx(content), derivedSummary = summary ?? extractDocsSummary(content);
    return {
      id: entry.id,
      name: entry.name,
      path: entry.importPath,
      title: entry.title,
      content,
      ...derivedSummary !== void 0 && { summary: derivedSummary }
    };
  } catch (err) {
    return {
      id: entry.id,
      name: entry.name,
      path: entry.importPath,
      title: entry.title,
      error: {
        name: err instanceof Error ? err.name : "Error",
        message: err instanceof Error ? err.message : String(err)
      }
    };
  }
}
function createDocsManifestRefEntry(entry, componentId) {
  return {
    id: entry.id,
    name: entry.name,
    mdx: { $ref: mdxManifestRef(componentId, entry.id) }
  };
}
async function buildUnattachedDocs(entries, build) {
  let docs2 = await Promise.all(
    entries.map(async (entry) => [entry.id, await build(entry, entry.id)])
  );
  return Object.fromEntries(docs2);
}
async function applyAttachedDocs(entries, existingComponents, build) {
  if (!existingComponents || entries.length === 0)
    return existingComponents;
  let docs2 = await Promise.all(
    entries.map(async (entry) => {
      let componentId = getComponentIdFromEntry(entry);
      return { componentId, doc: await build(entry, componentId) };
    })
  ), components = { ...existingComponents.components };
  for (let { componentId, doc } of docs2) {
    let component = components[componentId] ?? { id: componentId, name: componentId };
    components[componentId] = {
      ...component,
      docs: { ...component.docs, [doc.id]: doc }
    };
  }
  return { ...existingComponents, components };
}
var manifests = async (existingManifests = {}, { manifestEntries, presets }) => {
  let startPerformance = performance.now(), features = await presets?.apply?.("features"), useMdxService = features?.experimentalDocgenServer === !0 && features?.componentsManifest === !0, docsEntries = manifestEntries.filter(
    (entry) => entry.type === "docs"
  );
  if (docsEntries.length === 0)
    return existingManifests;
  let { attachedEntries = [], unattachedEntries = [] } = groupBy(docsEntries, (entry) => {
    switch (!0) {
      case entry.tags?.includes(Tag.UNATTACHED_MDX):
        return "unattachedEntries";
      case entry.tags?.includes(Tag.ATTACHED_MDX):
        return "attachedEntries";
      default:
        return "ignored";
    }
  });
  if (unattachedEntries.length === 0 && attachedEntries.length === 0)
    return existingManifests;
  let existingManifestsWithDocs = existingManifests, build = useMdxService ? createDocsManifestRefEntry : createDocsManifestEntry, [unattachedDocs, updatedComponents] = await Promise.all([
    buildUnattachedDocs(unattachedEntries, build),
    applyAttachedDocs(attachedEntries, existingManifestsWithDocs.components, build)
  ]), processedCount = unattachedEntries.length + attachedEntries.length;
  logger.verbose(
    `Docs manifest generation took ${performance.now() - startPerformance}ms for ${processedCount} entries (${unattachedEntries.length} unattached, ${attachedEntries.length} attached)`
  );
  let result = { ...existingManifestsWithDocs };
  return Object.keys(unattachedDocs).length > 0 && (result.docs = {
    v: useMdxService ? 1 : 0,
    docs: unattachedDocs
  }), updatedComponents && (result.components = updatedComponents), result;
};

// src/mdx-service/definition.ts
import {
  MDX_SERVICE_ID,
  mdxQueryStaticPath
} from "storybook/internal/core-server";

// ../../../node_modules/valibot/dist/index.mjs
var store$4, DEFAULT_CONFIG = {
  lang: void 0,
  message: void 0,
  abortEarly: void 0,
  abortPipeEarly: void 0
};
function getGlobalConfig(config$1) {
  return !config$1 && !store$4 ? DEFAULT_CONFIG : {
    lang: config$1?.lang ?? store$4?.lang,
    message: config$1?.message,
    abortEarly: config$1?.abortEarly ?? store$4?.abortEarly,
    abortPipeEarly: config$1?.abortPipeEarly ?? store$4?.abortPipeEarly
  };
}
var store$3;
function getGlobalMessage(lang) {
  return store$3?.get(lang);
}
var store$2;
function getSchemaMessage(lang) {
  return store$2?.get(lang);
}
var store$1;
function getSpecificMessage(reference, lang) {
  return store$1?.get(reference)?.get(lang);
}
function _stringify(input) {
  let type = typeof input;
  return type === "string" ? `"${input}"` : type === "number" || type === "bigint" || type === "boolean" ? `${input}` : type === "object" || type === "function" ? (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null" : type;
}
function _addIssue(context, label, dataset, config$1, other) {
  let input = other && "input" in other ? other.input : dataset.value, expected = other?.expected ?? context.expects ?? null, received = other?.received ?? _stringify(input), issue = {
    kind: context.kind,
    type: context.type,
    input,
    expected,
    received,
    message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
    requirement: context.requirement,
    path: other?.path,
    issues: other?.issues,
    lang: config$1.lang,
    abortEarly: config$1.abortEarly,
    abortPipeEarly: config$1.abortPipeEarly
  }, isSchema = context.kind === "schema", message$1 = other?.message ?? context.message ?? getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? getSchemaMessage(issue.lang) : null) ?? config$1.message ?? getGlobalMessage(issue.lang);
  message$1 !== void 0 && (issue.message = typeof message$1 == "function" ? message$1(issue) : message$1), isSchema && (dataset.typed = !1), dataset.issues ? dataset.issues.push(issue) : dataset.issues = [issue];
}
var _standardCache = /* @__PURE__ */ new WeakMap();
function _getStandardProps(context) {
  let cached = _standardCache.get(context);
  return cached || (cached = {
    version: 1,
    vendor: "valibot",
    validate(value$1) {
      return context["~run"]({ value: value$1 }, getGlobalConfig());
    }
  }, _standardCache.set(context, cached)), cached;
}
function _isValidObjectKey(object$1, key) {
  return Object.prototype.hasOwnProperty.call(object$1, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
}
var EMOJI_REGEX = new RegExp("^(?:[\\u{1F1E6}-\\u{1F1FF}]{2}|\\u{1F3F4}[\\u{E0061}-\\u{E007A}]{2}[\\u{E0030}-\\u{E0039}\\u{E0061}-\\u{E007A}]{1,3}\\u{E007F}|(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|(?![\\p{Emoji_Modifier_Base}\\u{1F1E6}-\\u{1F1FF}])\\p{Emoji_Presentation})(?:\\u200D(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|(?![\\p{Emoji_Modifier_Base}\\u{1F1E6}-\\u{1F1FF}])\\p{Emoji_Presentation}))*)+$", "u");
function getFallback(schema, dataset, config$1) {
  return typeof schema.fallback == "function" ? schema.fallback(dataset, config$1) : schema.fallback;
}
function getDefault(schema, dataset, config$1) {
  return typeof schema.default == "function" ? schema.default(dataset, config$1) : schema.default;
}
function object(entries$1, message$1) {
  return {
    kind: "schema",
    type: "object",
    reference: object,
    expects: "Object",
    async: !1,
    entries: entries$1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let input = dataset.value;
      if (input && typeof input == "object") {
        dataset.typed = !0, dataset.value = {};
        for (let key in this.entries) {
          let valueSchema = this.entries[key];
          if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
            let value$1 = key in input ? input[key] : getDefault(valueSchema), valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
            if (valueDataset.issues) {
              let pathItem = {
                type: "object",
                origin: "value",
                input,
                key,
                value: value$1
              };
              for (let issue of valueDataset.issues)
                issue.path ? issue.path.unshift(pathItem) : issue.path = [pathItem], dataset.issues?.push(issue);
              if (dataset.issues || (dataset.issues = valueDataset.issues), config$1.abortEarly) {
                dataset.typed = !1;
                break;
              }
            }
            valueDataset.typed || (dataset.typed = !1), dataset.value[key] = valueDataset.value;
          } else if (valueSchema.fallback !== void 0) dataset.value[key] = getFallback(valueSchema);
          else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish" && (_addIssue(this, "key", dataset, config$1, {
            input: void 0,
            expected: `"${key}"`,
            path: [{
              type: "object",
              origin: "key",
              input,
              key,
              value: input[key]
            }]
          }), config$1.abortEarly))
            break;
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
function optional(wrapped, default_) {
  return {
    kind: "schema",
    type: "optional",
    reference: optional,
    expects: `(${wrapped.expects} | undefined)`,
    async: !1,
    wrapped,
    default: default_,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return dataset.value === void 0 && (this.default !== void 0 && (dataset.value = getDefault(this, dataset, config$1)), dataset.value === void 0) ? (dataset.typed = !0, dataset) : this.wrapped["~run"](dataset, config$1);
    }
  };
}
function record(key, value$1, message$1) {
  return {
    kind: "schema",
    type: "record",
    reference: record,
    expects: "Object",
    async: !1,
    key,
    value: value$1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let input = dataset.value;
      if (input && typeof input == "object") {
        dataset.typed = !0, dataset.value = {};
        for (let entryKey in input) if (_isValidObjectKey(input, entryKey)) {
          let entryValue = input[entryKey], keyDataset = this.key["~run"]({ value: entryKey }, config$1);
          if (keyDataset.issues) {
            let pathItem = {
              type: "object",
              origin: "key",
              input,
              key: entryKey,
              value: entryValue
            };
            for (let issue of keyDataset.issues)
              issue.path = [pathItem], dataset.issues?.push(issue);
            if (dataset.issues || (dataset.issues = keyDataset.issues), config$1.abortEarly) {
              dataset.typed = !1;
              break;
            }
          }
          let valueDataset = this.value["~run"]({ value: entryValue }, config$1);
          if (valueDataset.issues) {
            let pathItem = {
              type: "object",
              origin: "value",
              input,
              key: entryKey,
              value: entryValue
            };
            for (let issue of valueDataset.issues)
              issue.path ? issue.path.unshift(pathItem) : issue.path = [pathItem], dataset.issues?.push(issue);
            if (dataset.issues || (dataset.issues = valueDataset.issues), config$1.abortEarly) {
              dataset.typed = !1;
              break;
            }
          }
          (!keyDataset.typed || !valueDataset.typed) && (dataset.typed = !1), keyDataset.typed && (dataset.value[keyDataset.value] = valueDataset.value);
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
function string(message$1) {
  return {
    kind: "schema",
    type: "string",
    reference: string,
    expects: "string",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return typeof dataset.value == "string" ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}
function undefined_(message$1) {
  return {
    kind: "schema",
    type: "undefined",
    reference: undefined_,
    expects: "undefined",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return dataset.value === void 0 ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}
function void_(message$1) {
  return {
    kind: "schema",
    type: "void",
    reference: void_,
    expects: "void",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return dataset.value === void 0 ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}

// src/mdx-service/definition.ts
import { defineService } from "storybook/open-service";
var mdxInputSchema = object({ id: string() }), mdxErrorSchema = object({
  name: string(),
  message: string()
}), mdxDocPayloadSchema = object({
  id: string(),
  name: string(),
  path: string(),
  title: string(),
  content: optional(string()),
  summary: optional(string()),
  error: optional(mdxErrorSchema)
}), mdxPayloadSchema = object({
  id: string(),
  name: string(),
  docs: record(string(), mdxDocPayloadSchema)
}), mdxOutputSchema = optional(mdxPayloadSchema), mdxServiceDef = defineService({
  id: MDX_SERVICE_ID,
  internal: !0,
  // this service really only ensures that the MDX docs are available in manifests, so there is no need to expose it to the public API
  initialState: { components: {} },
  queries: {
    mdxForComponent: {
      input: mdxInputSchema,
      output: mdxOutputSchema,
      handler: (input, ctx) => ctx.self.state.components[input.id],
      load: async (input, ctx) => {
        await ctx.self.commands._extractMdxForComponent(input);
      },
      staticPath: (input) => mdxQueryStaticPath(input.id)
    },
    mdxForAllComponents: {
      input: void_(),
      output: record(string(), mdxPayloadSchema),
      handler: (_input, ctx) => ctx.self.state.components,
      load: async (_input, ctx) => {
        await ctx.self.commands._extractAllMdx(void 0);
      }
    }
  },
  commands: {
    _extractMdxForComponent: {
      internal: !0,
      input: mdxInputSchema,
      output: mdxOutputSchema
    },
    _extractAllMdx: {
      internal: !0,
      input: undefined_(),
      output: void_()
    }
  }
});

// src/mdx-service/server.ts
function groupMdxEntriesByComponent(index) {
  return groupBy2(
    Object.values(index.entries).filter(
      (entry) => entry.type === "docs" && ((entry.tags?.includes(Tag2.ATTACHED_MDX) ?? !1) || (entry.tags?.includes(Tag2.UNATTACHED_MDX) ?? !1))
    ),
    (entry) => entry.tags?.includes(Tag2.ATTACHED_MDX) ? getComponentIdFromEntry2(entry) : entry.id
  );
}
var defaultMdxProvider = async ({ componentId, entries }) => {
  if (entries.length === 0)
    return;
  let docs2 = await Promise.all(entries.map(createDocsManifestEntry));
  return {
    id: componentId,
    name: componentId,
    docs: Object.fromEntries(docs2.map((doc) => [doc.id, doc]))
  };
};
function registerMdxService({
  getIndex,
  provider = defaultMdxProvider
}) {
  return registerService(mdxServiceDef, {
    queries: {
      mdxForComponent: {
        staticInputs: async () => {
          let index = await getIndex(), grouped = groupMdxEntriesByComponent(index);
          return Object.keys(grouped).map((id) => ({ id }));
        }
      }
    },
    commands: {
      _extractMdxForComponent: {
        handler: async (input, ctx) => {
          let index = await getIndex(), entries = groupMdxEntriesByComponent(index)[input.id] ?? [];
          if (entries.length === 0)
            return;
          let payload = await provider({
            componentId: input.id,
            entries
          });
          if (payload)
            return ctx.self.setState((state) => {
              state.components[input.id] = payload;
            }), payload;
        }
      },
      _extractAllMdx: {
        handler: async (_input, ctx) => {
          let index = await getIndex(), grouped = groupMdxEntriesByComponent(index), extracted = await Promise.all(
            Object.entries(grouped).map(async ([id, entries]) => {
              let payload = await provider({ componentId: id, entries });
              return payload ? [id, payload] : void 0;
            })
          );
          ctx.self.setState((state) => {
            for (let result of extracted) {
              if (!result)
                continue;
              let [id, payload] = result;
              state.components[id] = payload;
            }
          });
        }
      }
    }
  });
}

// src/preset.ts
var getResolvedReact = async (options) => {
  let resolvedReact2 = await options.presets.apply("resolvedReact", {});
  return {
    react: resolvedReact2.react ?? resolvePackageDir("react"),
    reactDom: resolvedReact2.reactDom ?? resolvePackageDir("react-dom"),
    // In Webpack, symlinked MDX files will cause @mdx-js/react to not be resolvable if it is not hoisted
    // This happens for the SB monorepo's template stories when a sandbox has a different react version than
    // addon-docs, causing addon-docs's dependencies not to be hoisted.
    // This might also affect regular users who have a similar setup.
    // Explicitly alias @mdx-js/react to avoid this issue.
    mdx: resolvedReact2.mdx ?? fileURLToPath2(import.meta.resolve("@mdx-js/react"))
  };
};
async function webpack(webpackConfig = {}, options) {
  let { module = {} } = webpackConfig, { csfPluginOptions = {}, mdxPluginOptions = {} } = options, enrichCsf = await options.presets.apply("experimental_enrichCsf"), rehypeSlug = (await import("./_node-chunks/rehype-slug-LH26LVDI.js")).default, rehypeExternalLinks = (await import("./_node-chunks/rehype-external-links-NSKE6R2I.js")).default, mdxLoaderOptions = await options.presets.apply("mdxLoaderOptions", {
    ...mdxPluginOptions,
    mdxCompileOptions: {
      providerImportSource: fileURLToPath2(
        import.meta.resolve("@storybook/addon-docs/mdx-react-shim")
      ),
      ...mdxPluginOptions.mdxCompileOptions,
      rehypePlugins: [
        ...mdxPluginOptions?.mdxCompileOptions?.rehypePlugins ?? [],
        rehypeSlug,
        rehypeExternalLinks
      ]
    }
  });
  logger2.info("Addon-docs: using MDX3");
  let { react, reactDom, mdx } = await getResolvedReact(options), alias;
  return Array.isArray(webpackConfig.resolve?.alias) ? (alias = [...webpackConfig.resolve?.alias], alias.push(
    {
      name: "react",
      alias: react
    },
    {
      name: "react-dom",
      alias: reactDom
    },
    {
      name: "@mdx-js/react",
      alias: mdx
    }
  )) : alias = {
    ...webpackConfig.resolve?.alias,
    react,
    "react-dom": reactDom,
    "@mdx-js/react": mdx
  }, {
    ...webpackConfig,
    plugins: [
      ...webpackConfig.plugins || [],
      ...csfPluginOptions ? [
        (await import("@storybook/csf-plugin")).webpack({
          ...csfPluginOptions,
          enrichCsf
        })
      ] : []
    ],
    resolve: {
      ...webpackConfig.resolve,
      alias
    },
    module: {
      ...module,
      rules: [
        ...module.rules || [],
        {
          test: /\.mdx$/,
          exclude: /(stories|story)\.mdx$/,
          use: [
            {
              loader: fileURLToPath2(import.meta.resolve("@storybook/addon-docs/mdx-loader")),
              options: mdxLoaderOptions
            }
          ]
        }
      ]
    }
  };
}
var docs = (input = {}, options) => {
  if (options?.build?.test?.disableAutoDocs)
    return;
  let result = {
    ...input,
    defaultName: "Docs"
  }, docsMode = options.docs;
  return docsMode && (result.docsMode = docsMode), result;
}, addons = [
  import.meta.resolve("@storybook/react-dom-shim/preset")
], viteFinal = async (config, options) => {
  let { plugins = [] } = config, { mdxPlugin } = await import("./_node-chunks/mdx-plugin-QXZEMQHC.js"), { react, reactDom, mdx } = await getResolvedReact(options), packageDeduplicationPlugin = {
    name: "storybook:package-deduplication",
    enforce: "pre",
    config: () => ({
      resolve: {
        alias: {
          react,
          // Vite doesn't respect export maps when resolving an absolute path, so we need to do that manually here
          ...isAbsolute2(reactDom) && { "react-dom/server": `${reactDom}/server.browser.js` },
          "react-dom": reactDom,
          "@mdx-js/react": mdx
        }
      }
    })
  };
  return plugins.unshift(packageDeduplicationPlugin), plugins.unshift(mdxPlugin(options)), {
    ...config,
    plugins
  };
}, webpackX = webpack, docsX = docs, resolvedReact = async (existing) => ({
  react: existing?.react ?? resolvePackageDir("react"),
  reactDom: existing?.reactDom ?? resolvePackageDir("react-dom"),
  mdx: existing?.mdx ?? fileURLToPath2(import.meta.resolve("@mdx-js/react"))
}), services = async (_value, options) => {
  let features = await options.presets.apply("features");
  if (features?.experimentalDocgenServer && features?.componentsManifest && !options.ignorePreview) {
    let generator = await options.presets.apply("storyIndexGenerator");
    registerMdxService({
      getIndex: () => generator.getIndex()
    });
  }
}, optimizeViteDeps = [
  "@storybook/addon-docs",
  "@storybook/addon-docs/blocks",
  "@storybook/addon-docs > @mdx-js/react",
  "@storybook/addon-docs > @storybook/react-dom-shim",
  "react-dom/client",
  "react/jsx-runtime",
  "react"
];
export {
  addons,
  docsX as docs,
  manifests as experimental_manifests,
  optimizeViteDeps,
  resolvedReact,
  services,
  viteFinal,
  webpackX as webpack
};
