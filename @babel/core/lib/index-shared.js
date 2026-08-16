import * as helpers from '@babel/helpers';
import traverse, { NodePath } from '@babel/traverse';
import { codeFrameColumns } from '@babel/code-frame';
import * as _t from '@babel/types';
import semver from 'semver';
import generate from '@babel/generator';
import template from '@babel/template';
import * as resolvers from '#config/files';
import { loadPlugin, loadPreset, loadConfig as loadConfig$1, findRootConfig, findPackageData, findRelativeConfig, resolveShowConfigPath, findConfigUpwards, ROOT_CONFIG_FILENAMES } from '#config/files';
import { parse as parse$1, tokTypes } from '@babel/parser';
import gensync from 'gensync';
import { isAsync, waitFor, makeWeakCacheSync, makeStrongCacheSync, makeStrongCache, assertSimpleType, mergeOptions, makeWeakCache, maybeAsync, isThenable, forwardAsync } from './caching-shared.js';
import path from 'node:path';
import convertSourceMap from 'convert-source-map';
import readInputSourceMapFile from '#transformation/read-input-source-map-file';
import { expectedError, injectVirtualStackFrame, endHiddenCallStack, beginHiddenCallStack } from './errors/rewrite-stack-trace.js';
import { transformFile as transformFile$1, transformFileAsync, transformFileSync } from '#transform-file';
import { resolveBrowserslistConfigFile } from './config/resolve-targets.js';
import { createDebug } from 'obug';
import { isBrowsersQueryValid, TargetNames } from '@babel/helper-compilation-targets';
import { resolveTargets } from '#config/resolve-targets';

const context = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get DEFAULT_EXTENSIONS () { return DEFAULT_EXTENSIONS; },
  get File () { return File; },
  get buildExternalHelpers () { return buildExternalHelpers; },
  get createConfigItem () { return createConfigItem; },
  get createConfigItemAsync () { return createConfigItemAsync; },
  get createConfigItemSync () { return createConfigItemSync; },
  get getEnv () { return getEnv; },
  get loadOptions () { return loadOptions; },
  get loadOptionsAsync () { return loadOptionsAsync; },
  get loadOptionsSync () { return loadOptionsSync; },
  get loadPartialConfig () { return loadPartialConfig; },
  get loadPartialConfigAsync () { return loadPartialConfigAsync; },
  get loadPartialConfigSync () { return loadPartialConfigSync; },
  get parse () { return parse; },
  get parseAsync () { return parseAsync; },
  get parseSync () { return parseSync; },
  get resolvePlugin () { return resolvePlugin; },
  get resolvePreset () { return resolvePreset; },
  get template () { return template; },
  get tokTypes () { return tokTypes; },
  get transform () { return transform; },
  get transformAsync () { return transformAsync; },
  get transformFile () { return transformFile$1; },
  get transformFileAsync () { return transformFileAsync; },
  get transformFileSync () { return transformFileSync; },
  get transformFromAst () { return transformFromAst; },
  get transformFromAstAsync () { return transformFromAstAsync; },
  get transformFromAstSync () { return transformFromAstSync; },
  get transformSync () { return transformSync; },
  get traverse () { return traverse; },
  get types () { return _t; },
  get version () { return version; }
}, Symbol.toStringTag, { value: 'Module' });

const {
  cloneNode: cloneNode$1,
  interpreterDirective,
  traverseFast
} = _t;
class File {
  _map = new Map();
  opts;
  declarations = {};
  path;
  ast;
  scope;
  metadata = {};
  code = "";
  inputMap;
  hub = {
    file: this,
    getCode: () => this.code,
    getScope: () => this.scope,
    addHelper: this.addHelper.bind(this),
    buildError: this.buildCodeFrameError.bind(this)
  };
  constructor(options, {
    code,
    ast,
    inputMap
  }) {
    this.opts = options;
    this.code = code;
    this.ast = ast;
    this.inputMap = inputMap;
    this.path = NodePath.get({
      hub: this.hub,
      parentPath: null,
      parent: this.ast,
      container: this.ast,
      key: "program"
    }).setContext();
    this.scope = this.path.scope;
  }
  get shebang() {
    const {
      interpreter
    } = this.path.node;
    return interpreter ? interpreter.value : "";
  }
  set shebang(value) {
    if (value) {
      this.path.get("interpreter").replaceWith(interpreterDirective(value));
    } else {
      this.path.get("interpreter").remove();
    }
  }
  set(key, val) {
    this._map.set(key, val);
  }
  get(key) {
    return this._map.get(key);
  }
  has(key) {
    return this._map.has(key);
  }
  availableHelper(name, versionRange) {
    if (helpers.isInternal(name)) return false;
    let minVersion;
    try {
      minVersion = helpers.minVersion(name);
    } catch (err) {
      if (err.code !== "BABEL_HELPER_UNKNOWN") throw err;
      return false;
    }
    if (typeof versionRange !== "string") return true;
    if (semver.valid(versionRange)) versionRange = `^${versionRange}`;
    return !semver.intersects(`<${minVersion}`, versionRange) && !semver.intersects(`>=9.0.0`, versionRange);
  }
  addHelper(name) {
    if (helpers.isInternal(name)) {
      throw new Error("Cannot use internal helper " + name);
    }
    return this._addHelper(name);
  }
  _addHelper(name) {
    const declar = this.declarations[name];
    if (declar) return cloneNode$1(declar);
    const generator = this.get("helperGenerator");
    if (generator) {
      const res = generator(name);
      if (res) return res;
    }
    helpers.minVersion(name);
    const uid = this.declarations[name] = this.scope.generateUidIdentifier(name);
    const dependencies = {};
    for (const dep of helpers.getDependencies(name)) {
      dependencies[dep] = this._addHelper(dep);
    }
    const {
      nodes,
      globals
    } = helpers.get(name, dep => dependencies[dep], uid.name, Object.keys(this.scope.getAllBindings()));
    globals.forEach(name => {
      if (this.path.scope.hasBinding(name, true)) {
        this.path.scope.rename(name);
      }
    });
    nodes.forEach(node => {
      node._compact = true;
    });
    const added = this.path.unshiftContainer("body", nodes);
    for (const path of added) {
      if (path.isVariableDeclaration()) this.scope.registerDeclaration(path);
    }
    return uid;
  }
  buildCodeFrameError(node, msg, _Error = SyntaxError) {
    let loc = node?.loc;
    if (!loc && node) {
      traverseFast(node, function (node) {
        if (node.loc) {
          loc = node.loc;
          return traverseFast.stop;
        }
      });
      let txt = "This is an error on an internal node. Probably an internal error.";
      if (loc) txt += " Location has been estimated.";
      msg += ` (${txt})`;
    }
    if (loc) {
      const {
        highlightCode = true
      } = this.opts;
      msg += "\n" + codeFrameColumns(this.code, {
        start: {
          line: loc.start.line,
          column: loc.start.column
        },
        end: loc.end && loc.start.line === loc.end.line ? {
          line: loc.end.line,
          column: loc.end.column
        } : undefined
      }, {
        highlightCode
      });
    }
    return new _Error(msg);
  }
}

const {
  arrayExpression,
  assignmentExpression,
  binaryExpression,
  blockStatement,
  callExpression,
  cloneNode,
  conditionalExpression,
  exportNamedDeclaration,
  exportSpecifier,
  expressionStatement,
  functionExpression,
  identifier,
  memberExpression,
  objectExpression,
  program,
  stringLiteral,
  unaryExpression,
  variableDeclaration,
  variableDeclarator
} = _t;
const buildUmdWrapper = replacements => template.statement`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(replacements);
function buildGlobal(allowlist) {
  const namespace = identifier("babelHelpers");
  const body = [];
  const container = functionExpression(null, [identifier("global")], blockStatement(body));
  const tree = program([expressionStatement(callExpression(container, [conditionalExpression(binaryExpression("===", unaryExpression("typeof", identifier("global")), stringLiteral("undefined")), identifier("self"), identifier("global"))]))]);
  body.push(variableDeclaration("var", [variableDeclarator(namespace, assignmentExpression("=", memberExpression(identifier("global"), namespace), objectExpression([])))]));
  buildHelpers(body, namespace, allowlist);
  return tree;
}
function buildModule(allowlist) {
  const body = [];
  const refs = buildHelpers(body, null, allowlist);
  body.unshift(exportNamedDeclaration(null, Object.keys(refs).map(name => {
    return exportSpecifier(cloneNode(refs[name]), identifier(name));
  })));
  return program(body, [], "module");
}
function buildUmd(allowlist) {
  const namespace = identifier("babelHelpers");
  const body = [];
  body.push(variableDeclaration("var", [variableDeclarator(namespace, identifier("global"))]));
  buildHelpers(body, namespace, allowlist);
  return program([buildUmdWrapper({
    FACTORY_PARAMETERS: identifier("global"),
    BROWSER_ARGUMENTS: assignmentExpression("=", memberExpression(identifier("root"), namespace), objectExpression([])),
    COMMON_ARGUMENTS: identifier("exports"),
    AMD_ARGUMENTS: arrayExpression([stringLiteral("exports")]),
    FACTORY_BODY: body,
    UMD_ROOT: identifier("this")
  })]);
}
function buildVar(allowlist) {
  const namespace = identifier("babelHelpers");
  const body = [];
  body.push(variableDeclaration("var", [variableDeclarator(namespace, objectExpression([]))]));
  const tree = program(body);
  buildHelpers(body, namespace, allowlist);
  body.push(expressionStatement(namespace));
  return tree;
}
function buildHelpers(body, namespace, allowlist) {
  const getHelperReference = name => {
    return namespace ? memberExpression(namespace, identifier(name)) : identifier(`_${name}`);
  };
  const refs = {};
  helpers.list.forEach(function (name) {
    if (allowlist && !allowlist.includes(name)) return;
    const ref = refs[name] = getHelperReference(name);
    const {
      nodes
    } = helpers.get(name, getHelperReference, namespace ? undefined : `_${name}`, [], namespace ? (ast, exportName, mapExportBindingAssignments) => {
      mapExportBindingAssignments(node => assignmentExpression("=", ref, node));
      ast.body.push(expressionStatement(assignmentExpression("=", ref, identifier(exportName))));
    } : undefined);
    body.push(...nodes);
  });
  return refs;
}
function buildExternalHelpers (allowlist, outputType = "global") {
  let tree;
  const build = {
    global: buildGlobal,
    module: buildModule,
    umd: buildUmd,
    var: buildVar
  }[outputType];
  if (build) {
    tree = build(allowlist);
  } else {
    throw new Error(`Unsupported output type ${outputType}`);
  }
  return generate(tree).code;
}

function getEnv(defaultValue = "development") {
  return process.env.BABEL_ENV || process.env.NODE_ENV || defaultValue;
}

function finalize(deepArr) {
  return Object.freeze(deepArr);
}
function flattenToSet(arr) {
  const result = new Set();
  const stack = [arr];
  while (stack.length > 0) {
    for (const el of stack.pop()) {
      if (Array.isArray(el)) stack.push(el);else result.add(el);
    }
  }
  return result;
}

class Plugin {
  key;
  manipulateOptions;
  post;
  pre;
  visitor;
  parserOverride;
  generatorOverride;
  options;
  externalDependencies;
  constructor(plugin, options, key, externalDependencies = finalize([])) {
    this.key = plugin.name || key;
    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor || {};
    this.parserOverride = plugin.parserOverride;
    this.generatorOverride = plugin.generatorOverride;
    this.options = options;
    this.externalDependencies = externalDependencies;
  }
}

function once(fn) {
  let result;
  let resultP;
  let promiseReferenced = false;
  return function* () {
    if (!result) {
      if (resultP) {
        promiseReferenced = true;
        return yield* waitFor(resultP);
      }
      if (!(yield* isAsync())) {
        try {
          result = {
            ok: true,
            value: yield* fn()
          };
        } catch (error) {
          result = {
            ok: false,
            value: error
          };
        }
      } else {
        let resolve, reject;
        resultP = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
        try {
          result = {
            ok: true,
            value: yield* fn()
          };
          resultP = null;
          if (promiseReferenced) resolve(result.value);
        } catch (error) {
          result = {
            ok: false,
            value: error
          };
          resultP = null;
          if (promiseReferenced) reject(error);
        }
      }
    }
    if (result.ok) return result.value;else throw result.value;
  };
}

function isEqualDescriptor(a, b) {
  return a.name === b.name && a.value === b.value && a.options === b.options && a.dirname === b.dirname && a.alias === b.alias && a.ownPass === b.ownPass && a.file?.request === b.file?.request && a.file?.resolved === b.file?.resolved;
}
function* handlerOf(value) {
  return value;
}
function optionsWithResolvedBrowserslistConfigFile(options, dirname) {
  if (typeof options.browserslistConfigFile === "string") {
    options.browserslistConfigFile = resolveBrowserslistConfigFile(options.browserslistConfigFile, dirname);
  }
  return options;
}
function createCachedDescriptors(dirname, options, alias) {
  const {
    plugins,
    presets,
    passPerPreset
  } = options;
  return {
    options: optionsWithResolvedBrowserslistConfigFile(options, dirname),
    plugins: plugins ? () => createCachedPluginDescriptors(plugins, dirname)(alias) : () => handlerOf([]),
    presets: presets ? () => createCachedPresetDescriptors(presets, dirname)(alias)(!!passPerPreset) : () => handlerOf([])
  };
}
function createUncachedDescriptors(dirname, options, alias) {
  return {
    options: optionsWithResolvedBrowserslistConfigFile(options, dirname),
    plugins: once(() => createPluginDescriptors(options.plugins || [], dirname, alias)),
    presets: once(() => createPresetDescriptors(options.presets || [], dirname, alias, !!options.passPerPreset))
  };
}
const PRESET_DESCRIPTOR_CACHE = new WeakMap();
const createCachedPresetDescriptors = makeWeakCacheSync((items, cache) => {
  const dirname = cache.using(dir => dir);
  return makeStrongCacheSync(alias => makeStrongCache(function* (passPerPreset) {
    const descriptors = yield* createPresetDescriptors(items, dirname, alias, passPerPreset);
    return descriptors.map(desc => loadCachedDescriptor(PRESET_DESCRIPTOR_CACHE, desc));
  }));
});
const PLUGIN_DESCRIPTOR_CACHE = new WeakMap();
const createCachedPluginDescriptors = makeWeakCacheSync((items, cache) => {
  const dirname = cache.using(dir => dir);
  return makeStrongCache(function* (alias) {
    const descriptors = yield* createPluginDescriptors(items, dirname, alias);
    return descriptors.map(desc => loadCachedDescriptor(PLUGIN_DESCRIPTOR_CACHE, desc));
  });
});
const DEFAULT_OPTIONS = {};
function loadCachedDescriptor(cache, desc) {
  const {
    value,
    options = DEFAULT_OPTIONS
  } = desc;
  if (options === false) return desc;
  let cacheByOptions = cache.get(value);
  if (!cacheByOptions) {
    cacheByOptions = new WeakMap();
    cache.set(value, cacheByOptions);
  }
  let possibilities = cacheByOptions.get(options);
  if (!possibilities) {
    possibilities = [];
    cacheByOptions.set(options, possibilities);
  }
  if (!possibilities.includes(desc)) {
    const matches = possibilities.filter(possibility => isEqualDescriptor(possibility, desc));
    if (matches.length > 0) {
      return matches[0];
    }
    possibilities.push(desc);
  }
  return desc;
}
function* createPresetDescriptors(items, dirname, alias, passPerPreset) {
  return yield* createDescriptors("preset", items, dirname, alias, passPerPreset);
}
function* createPluginDescriptors(items, dirname, alias) {
  return yield* createDescriptors("plugin", items, dirname, alias);
}
function* createDescriptors(type, items, dirname, alias, ownPass) {
  const descriptors = yield* gensync.all(items.map((item, index) => createDescriptor(item, dirname, {
    type,
    alias: `${alias}$${index}`,
    ownPass: !!ownPass
  })));
  assertNoDuplicates(descriptors);
  return descriptors;
}
function* createDescriptor(pair, dirname, {
  type,
  alias,
  ownPass
}) {
  const desc = getItemDescriptor(pair);
  if (desc) {
    return desc;
  }
  let name;
  let options;
  let value = pair;
  if (Array.isArray(value)) {
    if (value.length === 3) {
      [value, options, name] = value;
    } else {
      [value, options] = value;
    }
  }
  let file = undefined;
  let filepath = null;
  if (typeof value === "string") {
    if (typeof type !== "string") {
      throw new Error("To resolve a string-based item, the type of item must be given");
    }
    const resolver = type === "plugin" ? loadPlugin : loadPreset;
    const request = value;
    ({
      filepath,
      value
    } = yield* resolver(value, dirname));
    file = {
      request,
      resolved: filepath
    };
  }
  if (!value) {
    throw new Error(`Unexpected falsy value: ${String(value)}`);
  }
  if (typeof value === "object" && value.__esModule) {
    if (value.default) {
      value = value.default;
    } else {
      throw new Error("Must export a default export when using ES6 modules.");
    }
  }
  if (typeof value !== "object" && typeof value !== "function") {
    throw new Error(`Unsupported format: ${typeof value}. Expected an object or a function.`);
  }
  if (filepath !== null && typeof value === "object" && value) {
    throw new Error(`Plugin/Preset files are not allowed to export objects, only functions. In ${filepath}`);
  }
  return {
    name,
    alias: filepath || alias,
    value,
    options,
    dirname,
    ownPass,
    file
  };
}
function assertNoDuplicates(items) {
  const map = new Map();
  for (const item of items) {
    if (typeof item.value !== "function") continue;
    let nameMap = map.get(item.value);
    if (!nameMap) {
      nameMap = new Set();
      map.set(item.value, nameMap);
    }
    if (nameMap.has(item.name)) {
      const conflicts = items.filter(i => i.value === item.value);
      throw new Error([`Duplicate plugin/preset detected.`, `If you'd like to use two separate instances of a plugin,`, `they need separate names, e.g.`, ``, `  plugins: [`, `    ['some-plugin', {}],`, `    ['some-plugin', {}, 'some unique name'],`, `  ]`, ``, `Duplicates detected are:`, `${JSON.stringify(conflicts, null, 2)}`].join("\n"));
    }
    nameMap.add(item.name);
  }
}

function createItemFromDescriptor(desc) {
  return new ConfigItem(desc);
}
function* createConfigItem$1(value, {
  dirname = ".",
  type
} = {}) {
  const descriptor = yield* createDescriptor(value, path.resolve(dirname), {
    type,
    alias: "programmatic item"
  });
  return createItemFromDescriptor(descriptor);
}
const CONFIG_ITEM_BRAND = Symbol.for("@babel/core@8 - ConfigItem");
function getItemDescriptor(item) {
  if (item?.[CONFIG_ITEM_BRAND]) {
    return item._descriptor;
  }
  return undefined;
}
class ConfigItem {
  _descriptor;
  [CONFIG_ITEM_BRAND] = true;
  value;
  options;
  dirname;
  name;
  file;
  constructor(descriptor) {
    this._descriptor = descriptor;
    Object.defineProperty(this, "_descriptor", {
      enumerable: false
    });
    Object.defineProperty(this, CONFIG_ITEM_BRAND, {
      enumerable: false
    });
    this.value = this._descriptor.value;
    this.options = this._descriptor.options;
    this.dirname = this._descriptor.dirname;
    this.name = this._descriptor.name;
    this.file = this._descriptor.file ? {
      request: this._descriptor.file.request,
      resolved: this._descriptor.file.resolved
    } : undefined;
    Object.freeze(this);
  }
}
Object.freeze(ConfigItem.prototype);

const removed = {
  auxiliaryComment: {
    message: "Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"
  },
  blacklist: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  breakConfig: {
    message: "This is not a necessary option in Babel 6"
  },
  experimental: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  externalHelpers: {
    message: "Use the `external-helpers` plugin instead. " + "Check out http://babeljs.io/docs/plugins/external-helpers/"
  },
  extra: {
    message: ""
  },
  jsxPragma: {
    message: "use the `pragma` option in the `react-jsx` plugin. " + "Check out http://babeljs.io/docs/plugins/transform-react-jsx/"
  },
  loose: {
    message: "Specify the `loose` option for the relevant plugin you are using " + "or use a preset that sets the option."
  },
  metadataUsedHelpers: {
    message: "Not required anymore as this is enabled by default"
  },
  modules: {
    message: "Use the corresponding module transform plugin in the `plugins` option. " + "Check out http://babeljs.io/docs/plugins/#modules"
  },
  nonStandard: {
    message: "Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. " + "Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"
  },
  optional: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  sourceMapName: {
    message: "The `sourceMapName` option has been removed because it makes more sense for the " + "tooling that calls Babel to assign `map.file` themselves."
  },
  stage: {
    message: "Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"
  },
  whitelist: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  resolveModuleSource: {
    version: 6,
    message: "Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"
  },
  metadata: {
    version: 6,
    message: "Generated plugin metadata is always included in the output result"
  },
  sourceMapTarget: {
    version: 6,
    message: "The `sourceMapTarget` option has been removed because it makes more sense for the tooling " + "that calls Babel to assign `map.file` themselves."
  }
};

function msg(loc) {
  switch (loc.type) {
    case "root":
      return ``;
    case "env":
      return `${msg(loc.parent)}.env["${loc.name}"]`;
    case "overrides":
      return `${msg(loc.parent)}.overrides[${loc.index}]`;
    case "option":
      return `${msg(loc.parent)}.${loc.name}`;
    case "access":
      return `${msg(loc.parent)}[${JSON.stringify(loc.name)}]`;
    default:
      throw new Error(`Assertion failure: Unknown type ${loc.type}`);
  }
}
function access(loc, name) {
  return {
    type: "access",
    name,
    parent: loc
  };
}
function assertRootMode(loc, value) {
  if (value !== undefined && value !== "root" && value !== "upward" && value !== "upward-optional") {
    throw new Error(`${msg(loc)} must be a "root", "upward", "upward-optional" or undefined`);
  }
  return value;
}
function assertSourceMaps(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && value !== "inline" && value !== "both") {
    throw new Error(`${msg(loc)} must be a boolean, "inline", "both", or undefined`);
  }
  return value;
}
function assertCompact(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && value !== "auto") {
    throw new Error(`${msg(loc)} must be a boolean, "auto", or undefined`);
  }
  return value;
}
function assertSourceType(loc, value) {
  if (value !== undefined && value !== "module" && value !== "commonjs" && value !== "script" && value !== "unambiguous") {
    throw new Error(`${msg(loc)} must be "module", "commonjs", "script", "unambiguous", or undefined`);
  }
  return value;
}
function assertCallerMetadata(loc, value) {
  const obj = assertObject(loc, value);
  if (obj) {
    if (typeof obj.name !== "string") {
      throw new Error(`${msg(loc)} set but does not contain "name" property string`);
    }
    for (const prop of Object.keys(obj)) {
      const propLoc = access(loc, prop);
      const value = obj[prop];
      if (value != null && typeof value !== "boolean" && typeof value !== "string" && typeof value !== "number") {
        throw new Error(`${msg(propLoc)} must be null, undefined, a boolean, a string, or a number.`);
      }
    }
  }
  return value;
}
function assertInputSourceMap(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && (typeof value !== "object" || !value)) {
    throw new Error(`${msg(loc)} must be a boolean, object, or undefined`);
  }
  return value;
}
function assertString(loc, value) {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`${msg(loc)} must be a string, or undefined`);
  }
  return value;
}
function assertFunction(loc, value) {
  if (value !== undefined && typeof value !== "function") {
    throw new Error(`${msg(loc)} must be a function, or undefined`);
  }
  return value;
}
function assertBoolean(loc, value) {
  if (value !== undefined && typeof value !== "boolean") {
    throw new Error(`${msg(loc)} must be a boolean, or undefined`);
  }
  return value;
}
function assertObject(loc, value) {
  if (value !== undefined && (typeof value !== "object" || Array.isArray(value) || !value)) {
    throw new Error(`${msg(loc)} must be an object, or undefined`);
  }
  return value;
}
function assertArray(loc, value) {
  if (value != null && !Array.isArray(value)) {
    throw new Error(`${msg(loc)} must be an array, or undefined`);
  }
  return value;
}
function assertIgnoreList(loc, value) {
  const arr = assertArray(loc, value);
  arr?.forEach((item, i) => assertIgnoreItem(access(loc, i), item));
  return arr;
}
function assertIgnoreItem(loc, value) {
  if (typeof value !== "string" && typeof value !== "function" && !(value instanceof RegExp)) {
    throw new Error(`${msg(loc)} must be an array of string/Function/RegExp values, or undefined`);
  }
  return value;
}
function assertConfigApplicableTest(loc, value) {
  if (value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(`${msg(access(loc, i))} must be a string/Function/RegExp.`);
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(`${msg(loc)} must be a string/Function/RegExp, or an array of those`);
  }
  return value;
}
function checkValidTest(value) {
  return typeof value === "string" || typeof value === "function" || value instanceof RegExp;
}
function assertConfigFileSearch(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && typeof value !== "string") {
    throw new Error(`${msg(loc)} must be a undefined, a boolean, a string, ` + `got ${JSON.stringify(value)}`);
  }
  return value;
}
function assertBabelrcSearch(loc, value) {
  if (value === undefined || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(`${msg(access(loc, i))} must be a string/Function/RegExp.`);
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(`${msg(loc)} must be a undefined, a boolean, a string/Function/RegExp ` + `or an array of those, got ${JSON.stringify(value)}`);
  }
  return value;
}
function assertPluginList(loc, value) {
  const arr = assertArray(loc, value);
  if (arr) {
    arr.forEach((item, i) => assertPluginItem(access(loc, i), item));
  }
  return arr;
}
function assertPluginItem(loc, value) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error(`${msg(loc)} must include an object`);
    }
    if (value.length > 3) {
      throw new Error(`${msg(loc)} may only be a two-tuple or three-tuple`);
    }
    assertPluginTarget(access(loc, 0), value[0]);
    if (value.length > 1) {
      const opts = value[1];
      if (opts !== undefined && opts !== false && (typeof opts !== "object" || Array.isArray(opts) || opts === null)) {
        throw new Error(`${msg(access(loc, 1))} must be an object, false, or undefined`);
      }
    }
    if (value.length === 3) {
      const name = value[2];
      if (name !== undefined && typeof name !== "string") {
        throw new Error(`${msg(access(loc, 2))} must be a string, or undefined`);
      }
    }
  } else {
    assertPluginTarget(loc, value);
  }
  return value;
}
function assertPluginTarget(loc, value) {
  if ((typeof value !== "object" || !value) && typeof value !== "string" && typeof value !== "function") {
    throw new Error(`${msg(loc)} must be a string, object, function`);
  }
  return value;
}
function assertTargets(loc, value) {
  if (isBrowsersQueryValid(value)) return value;
  if (typeof value !== "object" || !value || Array.isArray(value)) {
    throw new Error(`${msg(loc)} must be a string, an array of strings or an object`);
  }
  const browsersLoc = access(loc, "browsers");
  const esmodulesLoc = access(loc, "esmodules");
  assertBrowsersList(browsersLoc, value.browsers);
  assertBoolean(esmodulesLoc, value.esmodules);
  for (const key of Object.keys(value)) {
    const val = value[key];
    const subLoc = access(loc, key);
    if (key === "esmodules") assertBoolean(subLoc, val);else if (key === "browsers") assertBrowsersList(subLoc, val);else if (!Object.hasOwn(TargetNames, key)) {
      const validTargets = Object.keys(TargetNames).join(", ");
      throw new Error(`${msg(subLoc)} is not a valid target. Supported targets are ${validTargets}`);
    } else assertBrowserVersion(subLoc, val);
  }
  return value;
}
function assertBrowsersList(loc, value) {
  if (value !== undefined && !isBrowsersQueryValid(value)) {
    throw new Error(`${msg(loc)} must be undefined, a string or an array of strings`);
  }
}
function assertBrowserVersion(loc, value) {
  if (typeof value === "number" && Math.round(value) === value) return;
  if (typeof value === "string") return;
  throw new Error(`${msg(loc)} must be a string or an integer number`);
}
function assertAssumptions(loc, value) {
  if (value === undefined) return;
  if (typeof value !== "object" || value === null) {
    throw new Error(`${msg(loc)} must be an object or undefined.`);
  }
  let root = loc;
  do {
    root = root.parent;
  } while (root.type !== "root");
  const inPreset = root.source === "preset";
  for (const name of Object.keys(value)) {
    const subLoc = access(loc, name);
    if (!assumptionsNames.has(name)) {
      throw new Error(`${msg(subLoc)} is not a supported assumption.`);
    }
    if (typeof value[name] !== "boolean") {
      throw new Error(`${msg(subLoc)} must be a boolean.`);
    }
    if (inPreset && value[name] === false) {
      throw new Error(`${msg(subLoc)} cannot be set to 'false' inside presets.`);
    }
  }
  return value;
}

class ConfigError extends Error {
  constructor(message, filename) {
    super(message);
    expectedError(this);
    if (filename) injectVirtualStackFrame(this, filename);
  }
}

const ROOT_VALIDATORS = {
  cwd: assertString,
  root: assertString,
  rootMode: assertRootMode,
  configFile: assertConfigFileSearch,
  caller: assertCallerMetadata,
  filename: assertString,
  filenameRelative: assertString,
  code: assertBoolean,
  ast: assertBoolean,
  cloneInputAst: assertBoolean,
  envName: assertString
};
const BABELRC_VALIDATORS = {
  babelrc: assertBoolean,
  babelrcRoots: assertBabelrcSearch
};
const NONPRESET_VALIDATORS = {
  extends: assertString,
  ignore: assertIgnoreList,
  only: assertIgnoreList,
  targets: assertTargets,
  browserslistConfigFile: assertConfigFileSearch,
  browserslistEnv: assertString
};
const COMMON_VALIDATORS = {
  inputSourceMap: assertInputSourceMap,
  presets: assertPluginList,
  plugins: assertPluginList,
  passPerPreset: assertBoolean,
  assumptions: assertAssumptions,
  env: assertEnvSet,
  overrides: assertOverridesList,
  test: assertConfigApplicableTest,
  include: assertConfigApplicableTest,
  exclude: assertConfigApplicableTest,
  retainLines: assertBoolean,
  comments: assertBoolean,
  shouldPrintComment: assertFunction,
  compact: assertCompact,
  minified: assertBoolean,
  auxiliaryCommentBefore: assertString,
  auxiliaryCommentAfter: assertString,
  sourceType: assertSourceType,
  wrapPluginVisitorMethod: assertFunction,
  highlightCode: assertBoolean,
  sourceMaps: assertSourceMaps,
  sourceMap: assertSourceMaps,
  sourceFileName: assertString,
  sourceRoot: assertString,
  parserOpts: assertObject,
  generatorOpts: assertObject
};
const knownAssumptions = ["arrayLikeIsIterable", "constantReexports", "constantSuper", "enumerableModuleMeta", "ignoreFunctionLength", "ignoreToPrimitiveHint", "iterableIsArray", "mutableTemplateObject", "noClassCalls", "noDocumentAll", "noIncompleteNsImportDetection", "noNewArrows", "noUninitializedPrivateFieldAccess", "objectRestNoSymbols", "privateFieldsAsSymbols", "privateFieldsAsProperties", "pureGetters", "setClassMethods", "setComputedProperties", "setPublicClassFields", "setSpreadProperties", "skipForOfIteratorClosing", "superIsCallableConstructor"];
const assumptionsNames = new Set(knownAssumptions);
function getSource(loc) {
  return loc.type === "root" ? loc.source : getSource(loc.parent);
}
function validate(type, opts, filename) {
  try {
    return validateNested({
      type: "root",
      source: type
    }, opts);
  } catch (error) {
    const configError = new ConfigError(error.message, filename);
    if (error.code) configError.code = error.code;
    throw configError;
  }
}
function validateNested(loc, opts) {
  const type = getSource(loc);
  assertNoDuplicateSourcemap(opts);
  Object.keys(opts).forEach(key => {
    const optLoc = {
      type: "option",
      name: key,
      parent: loc
    };
    if (type === "preset" && NONPRESET_VALIDATORS[key]) {
      throw new Error(`${msg(optLoc)} is not allowed in preset options`);
    }
    if (type !== "arguments" && ROOT_VALIDATORS[key]) {
      throw new Error(`${msg(optLoc)} is only allowed in root programmatic options`);
    }
    if (type !== "arguments" && type !== "configfile" && BABELRC_VALIDATORS[key]) {
      if (type === "babelrcfile" || type === "extendsfile") {
        throw new Error(`${msg(optLoc)} is not allowed in .babelrc or "extends"ed files, only in root programmatic options, ` + `or babel.config.js/config file options`);
      }
      throw new Error(`${msg(optLoc)} is only allowed in root programmatic options, or babel.config.js/config file options`);
    }
    const validator = COMMON_VALIDATORS[key] || NONPRESET_VALIDATORS[key] || BABELRC_VALIDATORS[key] || ROOT_VALIDATORS[key] || throwUnknownError;
    validator(optLoc, opts[key]);
  });
  return opts;
}
function throwUnknownError(loc) {
  const key = loc.name;
  if (removed[key]) {
    const {
      message,
      version = 5
    } = removed[key];
    throw new Error(`Using removed Babel ${version} option: ${msg(loc)} - ${message}`);
  } else {
    const unknownOptErr = new Error(`Unknown option: ${msg(loc)}. Check out https://babeljs.io/docs/en/babel-core/#options for more information about options.`);
    unknownOptErr.code = "BABEL_UNKNOWN_OPTION";
    throw unknownOptErr;
  }
}
function assertNoDuplicateSourcemap(opts) {
  if (Object.hasOwn(opts, "sourceMap") && Object.hasOwn(opts, "sourceMaps")) {
    throw new Error(".sourceMap is an alias for .sourceMaps, cannot use both");
  }
}
function assertEnvSet(loc, value) {
  if (loc.parent.type === "env") {
    throw new Error(`${msg(loc)} is not allowed inside of another .env block`);
  }
  const parent = loc.parent;
  const obj = assertObject(loc, value);
  if (obj) {
    for (const envName of Object.keys(obj)) {
      const env = assertObject(access(loc, envName), obj[envName]);
      if (!env) continue;
      const envLoc = {
        type: "env",
        name: envName,
        parent
      };
      validateNested(envLoc, env);
    }
  }
  return obj;
}
function assertOverridesList(loc, value) {
  if (loc.parent.type === "env") {
    throw new Error(`${msg(loc)} is not allowed inside an .env block`);
  }
  if (loc.parent.type === "overrides") {
    throw new Error(`${msg(loc)} is not allowed inside an .overrides block`);
  }
  const parent = loc.parent;
  const arr = assertArray(loc, value);
  if (arr) {
    for (const [index, item] of arr.entries()) {
      const objLoc = access(loc, index);
      const env = assertObject(objLoc, item);
      if (!env) throw new Error(`${msg(objLoc)} must be an object`);
      const overridesLoc = {
        type: "overrides",
        index,
        parent
      };
      validateNested(overridesLoc, env);
    }
  }
  return arr;
}
function checkNoUnwrappedItemOptionPairs(items, index, type, e) {
  if (index === 0) return;
  const lastItem = items[index - 1];
  const thisItem = items[index];
  if (lastItem.file && lastItem.options === undefined && typeof thisItem.value === "object") {
    e.message += `\n- Maybe you meant to use\n` + `"${type}s": [\n  ["${lastItem.file.request}", ${JSON.stringify(thisItem.value, undefined, 2)}]\n]\n` + `To be a valid ${type}, its name and options should be wrapped in a pair of brackets`;
  }
}

const sep = `\\${path.sep}`;
const endSep = `(?:${sep}|$)`;
const substitution = `[^${sep}]+`;
const starPat = `(?:${substitution}${sep})`;
const starPatLast = `(?:${substitution}${endSep})`;
const starStarPat = `${starPat}*?`;
const starStarPatLast = `${starPat}*?${starPatLast}?`;
function escapeRegExp(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}
function pathToPattern(pattern, dirname) {
  const parts = path.resolve(dirname, pattern).split(path.sep);
  return new RegExp(["^", ...parts.map((part, i) => {
    const last = i === parts.length - 1;
    if (part === "**") return last ? starStarPatLast : starStarPat;
    if (part === "*") return last ? starPatLast : starPat;
    if (part.startsWith("*.")) {
      return substitution + escapeRegExp(part.slice(1)) + (last ? endSep : sep);
    }
    return escapeRegExp(part) + (last ? endSep : sep);
  })].join(""));
}

const ChainFormatter = {
  Programmatic: 0,
  Config: 1
};
const Formatter = {
  title(type, callerName, filepath) {
    let title;
    if (type === ChainFormatter.Programmatic) {
      title = "programmatic options";
      if (callerName) {
        title += " from " + callerName;
      }
    } else {
      title = "config " + filepath;
    }
    return title;
  },
  loc(index, envName) {
    let loc = "";
    if (index != null) {
      loc += `.overrides[${index}]`;
    }
    if (envName != null) {
      loc += `.env["${envName}"]`;
    }
    return loc;
  },
  *optionsAndDescriptors(opt) {
    const content = {
      ...opt.options
    };
    delete content.overrides;
    delete content.env;
    const pluginDescriptors = [...(yield* opt.plugins())];
    if (pluginDescriptors.length) {
      content.plugins = pluginDescriptors.map(d => descriptorToConfig(d));
    }
    const presetDescriptors = [...(yield* opt.presets())];
    if (presetDescriptors.length) {
      content.presets = [...presetDescriptors].map(d => descriptorToConfig(d));
    }
    return JSON.stringify(content, undefined, 2);
  }
};
function descriptorToConfig(d) {
  let name = d.file?.request;
  if (name == null) {
    if (typeof d.value === "object") {
      name = d.value;
    } else if (typeof d.value === "function") {
      name = `[Function: ${d.value.toString().slice(0, 50)} ... ]`;
    }
  }
  if (name == null) {
    name = "[Unknown]";
  }
  if (d.options === undefined) {
    return name;
  } else if (d.name == null) {
    return [name, d.options];
  } else {
    return [name, d.options, d.name];
  }
}
class ConfigPrinter {
  _stack = [];
  configure(enabled, type, {
    callerName,
    filepath
  }) {
    if (!enabled) return () => {};
    return (content, index, envName) => {
      this._stack.push({
        type,
        callerName,
        filepath,
        content,
        index,
        envName
      });
    };
  }
  static *format(config) {
    let title = Formatter.title(config.type, config.callerName, config.filepath);
    const loc = Formatter.loc(config.index, config.envName);
    if (loc) title += ` ${loc}`;
    const content = yield* Formatter.optionsAndDescriptors(config.content);
    return `${title}\n${content}`;
  }
  *output() {
    if (this._stack.length === 0) return "";
    const configs = yield* gensync.all(this._stack.map(s => ConfigPrinter.format(s)));
    return configs.join("\n\n");
  }
}

const debug = createDebug("babel:config:config-chain");
function* buildPresetChain(arg, context) {
  const chain = yield* buildPresetChainWalker(arg, context);
  if (!chain) return null;
  return {
    plugins: dedupDescriptors(chain.plugins),
    presets: dedupDescriptors(chain.presets),
    options: chain.options.map(o => createConfigChainOptions(o)),
    files: new Set()
  };
}
const buildPresetChainWalker = makeChainWalker({
  root: preset => loadPresetDescriptors(preset),
  env: (preset, envName) => loadPresetEnvDescriptors(preset)(envName),
  overrides: (preset, index) => loadPresetOverridesDescriptors(preset)(index),
  overridesEnv: (preset, index, envName) => loadPresetOverridesEnvDescriptors(preset)(index)(envName),
  createLogger: () => () => {}
});
const loadPresetDescriptors = makeWeakCacheSync(preset => buildRootDescriptors(preset, preset.alias, createUncachedDescriptors));
const loadPresetEnvDescriptors = makeWeakCacheSync(preset => makeStrongCacheSync(envName => buildEnvDescriptors(preset, preset.alias, createUncachedDescriptors, envName)));
const loadPresetOverridesDescriptors = makeWeakCacheSync(preset => makeStrongCacheSync(index => buildOverrideDescriptors(preset, preset.alias, createUncachedDescriptors, index)));
const loadPresetOverridesEnvDescriptors = makeWeakCacheSync(preset => makeStrongCacheSync(index => makeStrongCacheSync(envName => buildOverrideEnvDescriptors(preset, preset.alias, createUncachedDescriptors, index, envName))));
function* buildRootChain(opts, context) {
  let configReport, babelRcReport;
  const programmaticLogger = new ConfigPrinter();
  const programmaticChain = yield* loadProgrammaticChain({
    options: opts,
    dirname: context.cwd
  }, context, undefined, programmaticLogger);
  if (!programmaticChain) return null;
  const programmaticReport = yield* programmaticLogger.output();
  let configFile;
  if (typeof opts.configFile === "string") {
    configFile = yield* loadConfig$1(opts.configFile, context.cwd, context.envName, context.caller);
  } else if (opts.configFile !== false) {
    configFile = yield* findRootConfig(context.root, context.envName, context.caller);
  }
  let {
    babelrc,
    babelrcRoots
  } = opts;
  let babelrcRootsDirectory = context.cwd;
  const configFileChain = emptyChain();
  const configFileLogger = new ConfigPrinter();
  if (configFile) {
    const validatedFile = validateConfigFile(configFile);
    const result = yield* loadFileChain(validatedFile, context, undefined, configFileLogger);
    if (!result) return null;
    configReport = yield* configFileLogger.output();
    if (babelrc === undefined) {
      babelrc = validatedFile.options.babelrc;
    }
    if (babelrcRoots === undefined) {
      babelrcRootsDirectory = validatedFile.dirname;
      babelrcRoots = validatedFile.options.babelrcRoots;
    }
    mergeChain(configFileChain, result);
  }
  let ignoreFile, babelrcFile;
  let isIgnored = false;
  const fileChain = emptyChain();
  if ((babelrc === true || babelrc === undefined) && typeof context.filename === "string") {
    const pkgData = yield* findPackageData(context.filename);
    if (pkgData && babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory)) {
      ({
        ignore: ignoreFile,
        config: babelrcFile
      } = yield* findRelativeConfig(pkgData, context.envName, context.caller));
      if (ignoreFile) {
        fileChain.files.add(ignoreFile.filepath);
      }
      if (ignoreFile && shouldIgnore(context, ignoreFile.ignore, null, ignoreFile.dirname)) {
        isIgnored = true;
      }
      if (babelrcFile && !isIgnored) {
        const validatedFile = validateBabelrcFile(babelrcFile);
        const babelrcLogger = new ConfigPrinter();
        const result = yield* loadFileChain(validatedFile, context, undefined, babelrcLogger);
        if (!result) {
          isIgnored = true;
        } else {
          babelRcReport = yield* babelrcLogger.output();
          mergeChain(fileChain, result);
        }
      }
      if (babelrcFile && isIgnored) {
        fileChain.files.add(babelrcFile.filepath);
      }
    }
  }
  if (context.showConfig) {
    console.log(`Babel configs on "${context.filename}" (ascending priority):\n` + [configReport, babelRcReport, programmaticReport].filter(x => !!x).join("\n\n") + "\n-----End Babel configs-----");
  }
  const chain = mergeChain(mergeChain(mergeChain(emptyChain(), configFileChain), fileChain), programmaticChain);
  return {
    plugins: isIgnored ? [] : dedupDescriptors(chain.plugins),
    presets: isIgnored ? [] : dedupDescriptors(chain.presets),
    options: isIgnored ? [] : chain.options.map(o => createConfigChainOptions(o)),
    fileHandling: isIgnored ? "ignored" : "transpile",
    ignore: ignoreFile || undefined,
    babelrc: babelrcFile || undefined,
    config: configFile || undefined,
    files: chain.files
  };
}
function babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory) {
  if (typeof babelrcRoots === "boolean") return babelrcRoots;
  const absoluteRoot = context.root;
  if (babelrcRoots === undefined) {
    return pkgData.directories.includes(absoluteRoot);
  }
  let babelrcPatterns = babelrcRoots;
  if (!Array.isArray(babelrcPatterns)) {
    babelrcPatterns = [babelrcPatterns];
  }
  babelrcPatterns = babelrcPatterns.map(pat => {
    return typeof pat === "string" ? path.resolve(babelrcRootsDirectory, pat) : pat;
  });
  if (babelrcPatterns.length === 1 && babelrcPatterns[0] === absoluteRoot) {
    return pkgData.directories.includes(absoluteRoot);
  }
  return babelrcPatterns.some(pat => {
    if (typeof pat === "string") {
      pat = pathToPattern(pat, babelrcRootsDirectory);
    }
    return pkgData.directories.some(directory => {
      return matchPattern(pat, babelrcRootsDirectory, directory, context);
    });
  });
}
const validateConfigFile = makeWeakCacheSync(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: validate("configfile", file.options, file.filepath)
}));
const validateBabelrcFile = makeWeakCacheSync(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: validate("babelrcfile", file.options, file.filepath)
}));
const validateExtendFile = makeWeakCacheSync(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: validate("extendsfile", file.options, file.filepath)
}));
const loadProgrammaticChain = makeChainWalker({
  root: input => buildRootDescriptors(input, "base", createCachedDescriptors),
  env: (input, envName) => buildEnvDescriptors(input, "base", createCachedDescriptors, envName),
  overrides: (input, index) => buildOverrideDescriptors(input, "base", createCachedDescriptors, index),
  overridesEnv: (input, index, envName) => buildOverrideEnvDescriptors(input, "base", createCachedDescriptors, index, envName),
  createLogger: (input, context, baseLogger) => buildProgrammaticLogger(input, context, baseLogger)
});
const loadFileChainWalker = makeChainWalker({
  root: file => loadFileDescriptors(file),
  env: (file, envName) => loadFileEnvDescriptors(file)(envName),
  overrides: (file, index) => loadFileOverridesDescriptors(file)(index),
  overridesEnv: (file, index, envName) => loadFileOverridesEnvDescriptors(file)(index)(envName),
  createLogger: (file, context, baseLogger) => buildFileLogger(file.filepath, context, baseLogger)
});
function* loadFileChain(input, context, files, baseLogger) {
  const chain = yield* loadFileChainWalker(input, context, files, baseLogger);
  chain?.files.add(input.filepath);
  return chain;
}
const loadFileDescriptors = makeWeakCacheSync(file => buildRootDescriptors(file, file.filepath, createUncachedDescriptors));
const loadFileEnvDescriptors = makeWeakCacheSync(file => makeStrongCacheSync(envName => buildEnvDescriptors(file, file.filepath, createUncachedDescriptors, envName)));
const loadFileOverridesDescriptors = makeWeakCacheSync(file => makeStrongCacheSync(index => buildOverrideDescriptors(file, file.filepath, createUncachedDescriptors, index)));
const loadFileOverridesEnvDescriptors = makeWeakCacheSync(file => makeStrongCacheSync(index => makeStrongCacheSync(envName => buildOverrideEnvDescriptors(file, file.filepath, createUncachedDescriptors, index, envName))));
function buildFileLogger(filepath, context, baseLogger) {
  if (!baseLogger) {
    return () => {};
  }
  return baseLogger.configure(context.showConfig, ChainFormatter.Config, {
    filepath
  });
}
function buildRootDescriptors({
  dirname,
  options
}, alias, descriptors) {
  return descriptors(dirname, options, alias);
}
function buildProgrammaticLogger(_, context, baseLogger) {
  if (!baseLogger) {
    return () => {};
  }
  return baseLogger.configure(context.showConfig, ChainFormatter.Programmatic, {
    callerName: context.caller?.name
  });
}
function buildEnvDescriptors({
  dirname,
  options
}, alias, descriptors, envName) {
  const opts = options.env?.[envName];
  return opts ? descriptors(dirname, opts, `${alias}.env["${envName}"]`) : null;
}
function buildOverrideDescriptors({
  dirname,
  options
}, alias, descriptors, index) {
  const opts = options.overrides?.[index];
  if (!opts) throw new Error("Assertion failure - missing override");
  return descriptors(dirname, opts, `${alias}.overrides[${index}]`);
}
function buildOverrideEnvDescriptors({
  dirname,
  options
}, alias, descriptors, index, envName) {
  const override = options.overrides?.[index];
  if (!override) throw new Error("Assertion failure - missing override");
  const opts = override.env?.[envName];
  return opts ? descriptors(dirname, opts, `${alias}.overrides[${index}].env["${envName}"]`) : null;
}
function makeChainWalker({
  root,
  env,
  overrides,
  overridesEnv,
  createLogger
}) {
  return function* chainWalker(input, context, files = new Set(), baseLogger) {
    const {
      dirname
    } = input;
    const flattenedConfigs = [];
    const rootOpts = root(input);
    if (configIsApplicable(rootOpts, dirname, context, input.filepath)) {
      flattenedConfigs.push({
        config: rootOpts,
        envName: undefined,
        index: undefined
      });
      const envOpts = env(input, context.envName);
      if (envOpts && configIsApplicable(envOpts, dirname, context, input.filepath)) {
        flattenedConfigs.push({
          config: envOpts,
          envName: context.envName,
          index: undefined
        });
      }
      (rootOpts.options.overrides || []).forEach((_, index) => {
        const overrideOps = overrides(input, index);
        if (configIsApplicable(overrideOps, dirname, context, input.filepath)) {
          flattenedConfigs.push({
            config: overrideOps,
            index,
            envName: undefined
          });
          const overrideEnvOpts = overridesEnv(input, index, context.envName);
          if (overrideEnvOpts && configIsApplicable(overrideEnvOpts, dirname, context, input.filepath)) {
            flattenedConfigs.push({
              config: overrideEnvOpts,
              index,
              envName: context.envName
            });
          }
        }
      });
    }
    if (flattenedConfigs.some(({
      config: {
        options: {
          ignore,
          only
        }
      }
    }) => shouldIgnore(context, ignore, only, dirname))) {
      return null;
    }
    const chain = emptyChain();
    const logger = createLogger(input, context, baseLogger);
    for (const {
      config,
      index,
      envName
    } of flattenedConfigs) {
      if (!(yield* mergeExtendsChain(chain, config.options, dirname, context, files, baseLogger))) {
        return null;
      }
      logger(config, index, envName);
      yield* mergeChainOpts(chain, config);
    }
    return chain;
  };
}
function* mergeExtendsChain(chain, opts, dirname, context, files, baseLogger) {
  if (opts.extends === undefined) return true;
  const file = yield* loadConfig$1(opts.extends, dirname, context.envName, context.caller);
  if (files.has(file)) {
    throw new Error(`Configuration cycle detected loading ${file.filepath}.\n` + `File already loaded following the config chain:\n` + Array.from(files, file => ` - ${file.filepath}`).join("\n"));
  }
  files.add(file);
  const fileChain = yield* loadFileChain(validateExtendFile(file), context, files, baseLogger);
  files.delete(file);
  if (!fileChain) return false;
  mergeChain(chain, fileChain);
  return true;
}
function mergeChain(target, source) {
  target.options.push(...source.options);
  target.plugins.push(...source.plugins);
  target.presets.push(...source.presets);
  for (const file of source.files) {
    target.files.add(file);
  }
  return target;
}
function* mergeChainOpts(target, {
  options,
  plugins,
  presets
}) {
  target.options.push(options);
  target.plugins.push(...(yield* plugins()));
  target.presets.push(...(yield* presets()));
  return target;
}
function emptyChain() {
  return {
    options: [],
    presets: [],
    plugins: [],
    files: new Set()
  };
}
function createConfigChainOptions(opts) {
  const options = {
    ...opts
  };
  delete options.extends;
  delete options.env;
  delete options.overrides;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;
  delete options.test;
  delete options.include;
  delete options.exclude;
  if (Object.hasOwn(options, "sourceMap")) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }
  return options;
}
function dedupDescriptors(items) {
  const map = new Map();
  const descriptors = [];
  for (const item of items) {
    if (typeof item.value === "function") {
      const fnKey = item.value;
      let nameMap = map.get(fnKey);
      if (!nameMap) {
        nameMap = new Map();
        map.set(fnKey, nameMap);
      }
      let desc = nameMap.get(item.name);
      if (!desc) {
        desc = {
          value: item
        };
        descriptors.push(desc);
        if (!item.ownPass) nameMap.set(item.name, desc);
      } else {
        desc.value = item;
      }
    } else {
      descriptors.push({
        value: item
      });
    }
  }
  return descriptors.reduce((acc, desc) => {
    acc.push(desc.value);
    return acc;
  }, []);
}
function configIsApplicable({
  options
}, dirname, context, configName) {
  return (options.test === undefined || configFieldIsApplicable(context, options.test, dirname, configName)) && (options.include === undefined || configFieldIsApplicable(context, options.include, dirname, configName)) && (options.exclude === undefined || !configFieldIsApplicable(context, options.exclude, dirname, configName));
}
function configFieldIsApplicable(context, test, dirname, configName) {
  const patterns = Array.isArray(test) ? test : [test];
  return matchesPatterns(context, patterns, dirname, configName);
}
function ignoreListReplacer(_key, value) {
  if (value instanceof RegExp) {
    return String(value);
  }
  return value;
}
function shouldIgnore(context, ignore, only, dirname) {
  if (ignore && matchesPatterns(context, ignore, dirname)) {
    const message = `No config is applied to "${context.filename ?? "(unknown)"}" because it matches one of \`ignore: ${JSON.stringify(ignore, ignoreListReplacer)}\` from "${dirname}"`;
    debug(message);
    if (context.showConfig) {
      console.log(message);
    }
    return true;
  }
  if (only && !matchesPatterns(context, only, dirname)) {
    const message = `No config is applied to "${context.filename ?? "(unknown)"}" because it fails to match one of \`only: ${JSON.stringify(only, ignoreListReplacer)}\` from "${dirname}"`;
    debug(message);
    if (context.showConfig) {
      console.log(message);
    }
    return true;
  }
  return false;
}
function matchesPatterns(context, patterns, dirname, configName) {
  return patterns.some(pattern => matchPattern(pattern, dirname, context.filename, context, configName));
}
function matchPattern(pattern, dirname, pathToTest, context, configName) {
  if (typeof pattern === "function") {
    return !!endHiddenCallStack(pattern)(pathToTest, {
      dirname,
      envName: context.envName,
      caller: context.caller
    });
  }
  if (typeof pathToTest !== "string") {
    throw new ConfigError(`Configuration contains string/RegExp pattern, but no filename was passed to Babel`, configName);
  }
  if (typeof pattern === "string") {
    pattern = pathToPattern(pattern, dirname);
  }
  return pattern.test(pathToTest);
}

const VALIDATORS = {
  name: assertString,
  manipulateOptions: assertFunction,
  pre: assertFunction,
  post: assertFunction,
  inherits: assertFunction,
  visitor: assertVisitorMap,
  parserOverride: assertFunction,
  generatorOverride: assertFunction
};
function assertVisitorMap(loc, value) {
  const obj = assertObject(loc, value);
  if (obj) {
    Object.keys(obj).forEach(prop => {
      if (prop !== "_exploded" && prop !== "_verified") {
        assertVisitorHandler(prop, obj[prop]);
      }
    });
    if (obj.enter || obj.exit) {
      throw new Error(`${msg(loc)} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`);
    }
  }
  return obj;
}
function assertVisitorHandler(key, value) {
  if (value && typeof value === "object") {
    Object.keys(value).forEach(handler => {
      if (handler !== "enter" && handler !== "exit") {
        throw new Error(`.visitor["${key}"] may only have .enter and/or .exit handlers.`);
      }
    });
  } else if (typeof value !== "function") {
    throw new Error(`.visitor["${key}"] must be a function`);
  }
}
function validatePluginObject(obj) {
  const rootPath = {
    type: "root",
    source: "plugin"
  };
  Object.keys(obj).forEach(key => {
    const validator = VALIDATORS[key];
    if (validator) {
      const optLoc = {
        type: "option",
        name: key,
        parent: rootPath
      };
      validator(optLoc, obj[key]);
    } else {
      const invalidPluginPropertyError = new Error(`.${key} is not a valid Plugin property`);
      invalidPluginPropertyError.code = "BABEL_UNKNOWN_PLUGIN_PROPERTY";
      throw invalidPluginPropertyError;
    }
  });
  return obj;
}

function makeConfigAPI(cache) {
  const env = value => cache.using(data => {
    if (value === undefined) return data.envName;
    if (typeof value === "function") {
      return assertSimpleType(value(data.envName));
    }
    return (Array.isArray(value) ? value : [value]).some(entry => {
      if (typeof entry !== "string") {
        throw new Error("Unexpected non-string value");
      }
      return entry === data.envName;
    });
  });
  const caller = cb => cache.using(data => assertSimpleType(cb(data.caller)));
  return {
    version: version,
    cache: cache.simple(),
    env,
    async: () => false,
    caller: caller,
    assertVersion
  };
}
function makePresetAPI(cache, externalDependencies) {
  const targets = () => JSON.parse(cache.using(data => JSON.stringify(data.targets)));
  const addExternalDependency = ref => {
    externalDependencies.push(ref);
  };
  return {
    ...makeConfigAPI(cache),
    targets,
    addExternalDependency
  };
}
function makePluginAPI(cache, externalDependencies) {
  const assumption = name => cache.using(data => data.assumptions[name]);
  return {
    ...makePresetAPI(cache, externalDependencies),
    assumption
  };
}
function assertVersion(range) {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }
    range = `^${range}.0.0-0`;
  }
  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }
  if (range === "*" || semver.satisfies(version, range)) return;
  const message = `Requires Babel "${range}", but was loaded with "${version}". ` + `If you are sure you have a compatible version of @babel/core, ` + `it is likely that something in your build process is loading the ` + `wrong version. Inspect the stack trace of this error to look for ` + `the first entry that doesn't mention "@babel/core" or "babel-core" ` + `to see what is calling Babel.`;
  if (typeof process !== "undefined" && process.env.BABEL_7_TO_8_DANGEROUSLY_DISABLE_VERSION_CHECK) {
    console.warn(message);
    return;
  }
  const limit = Error.stackTraceLimit;
  if (typeof limit === "number" && limit < 25) {
    Error.stackTraceLimit = 25;
  }
  const err = new Error(message);
  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }
  throw Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version: version,
    range
  });
}

function resolveRootMode(rootDir, rootMode) {
  switch (rootMode) {
    case "root":
      return rootDir;
    case "upward-optional":
      {
        const upwardRootDir = findConfigUpwards(rootDir);
        return upwardRootDir === null ? rootDir : upwardRootDir;
      }
    case "upward":
      {
        const upwardRootDir = findConfigUpwards(rootDir);
        if (upwardRootDir !== null) return upwardRootDir;
        throw Object.assign(new Error(`Babel was run with rootMode:"upward" but a root could not ` + `be found when searching upward from "${rootDir}".\n` + `One of the following config files must be in the directory tree: ` + `"${ROOT_CONFIG_FILENAMES.join(", ")}".`), {
          code: "BABEL_ROOT_NOT_FOUND",
          dirname: rootDir
        });
      }
    default:
      throw new Error(`Assertion failure - unknown rootMode value.`);
  }
}
function* loadPrivatePartialConfig(inputOpts) {
  if (inputOpts != null && (typeof inputOpts !== "object" || Array.isArray(inputOpts))) {
    throw new Error("Babel options must be an object, null, or undefined");
  }
  const args = inputOpts ? validate("arguments", inputOpts) : {};
  const {
    envName = getEnv(),
    cwd = ".",
    root: rootDir = ".",
    rootMode = "root",
    caller,
    cloneInputAst = true
  } = args;
  const absoluteCwd = path.resolve(cwd);
  const absoluteRootDir = resolveRootMode(path.resolve(absoluteCwd, rootDir), rootMode);
  const filename = typeof args.filename === "string" ? path.resolve(cwd, args.filename) : undefined;
  const showConfigPath = yield* resolveShowConfigPath(absoluteCwd);
  const context = {
    filename,
    cwd: absoluteCwd,
    root: absoluteRootDir,
    envName,
    caller,
    showConfig: showConfigPath === filename
  };
  const configChain = yield* buildRootChain(args, context);
  if (!configChain) return null;
  const merged = {
    assumptions: {}
  };
  configChain.options.forEach(opts => {
    mergeOptions(merged, opts);
  });
  const options = {
    ...merged,
    targets: resolveTargets(merged, absoluteRootDir),
    cloneInputAst,
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    passPerPreset: false,
    envName: context.envName,
    cwd: context.cwd,
    root: context.root,
    rootMode: "root",
    filename: typeof context.filename === "string" ? context.filename : undefined,
    plugins: configChain.plugins.map(descriptor => createItemFromDescriptor(descriptor)),
    presets: configChain.presets.map(descriptor => createItemFromDescriptor(descriptor))
  };
  return {
    options,
    context,
    fileHandling: configChain.fileHandling,
    ignore: configChain.ignore,
    babelrc: configChain.babelrc,
    config: configChain.config,
    files: configChain.files
  };
}
function* loadPartialConfig$1(opts) {
  let showIgnoredFiles = false;
  if (typeof opts === "object" && opts !== null && !Array.isArray(opts)) {
    ({
      showIgnoredFiles,
      ...opts
    } = opts);
  }
  const result = yield* loadPrivatePartialConfig(opts);
  if (!result) return null;
  const {
    options,
    babelrc,
    ignore,
    config,
    fileHandling,
    files
  } = result;
  if (fileHandling === "ignored" && !showIgnoredFiles) {
    return null;
  }
  (options.plugins || []).forEach(item => {
    if (item.value instanceof Plugin) {
      throw new Error("Passing cached plugin instances is not supported in " + "babel.loadPartialConfig()");
    }
  });
  return new PartialConfig(options, babelrc ? babelrc.filepath : undefined, ignore ? ignore.filepath : undefined, config ? config.filepath : undefined, fileHandling, files);
}
class PartialConfig {
  options;
  babelrc;
  babelignore;
  config;
  fileHandling;
  files;
  constructor(options, babelrc, ignore, config, fileHandling, files) {
    this.options = options;
    this.babelignore = ignore;
    this.babelrc = babelrc;
    this.config = config;
    this.fileHandling = fileHandling;
    this.files = files;
    Object.freeze(this);
  }
  hasFilesystemConfig() {
    return this.babelrc !== undefined || this.config !== undefined;
  }
}
Object.freeze(PartialConfig.prototype);

const loadConfig = gensync(function* loadFullConfig(inputOpts) {
  const result = yield* loadPrivatePartialConfig(inputOpts);
  if (!result) {
    return null;
  }
  const {
    options,
    context,
    fileHandling
  } = result;
  if (fileHandling === "ignored") {
    return null;
  }
  const optionDefaults = {};
  const {
    plugins,
    presets
  } = options;
  if (!plugins || !presets) {
    throw new Error("Assertion failure - plugins and presets exist");
  }
  const presetContext = {
    ...context,
    targets: options.targets
  };
  const toDescriptor = item => {
    const desc = getItemDescriptor(item);
    if (!desc) {
      throw new Error("Assertion failure - must be config item");
    }
    return desc;
  };
  const presetsDescriptors = presets.map(toDescriptor);
  const initialPluginsDescriptors = plugins.map(toDescriptor);
  const pluginDescriptorsByPass = [[]];
  const passes = [];
  const externalDependencies = [];
  const ignored = yield* enhanceError(context, function* recursePresetDescriptors(rawPresets, pluginDescriptorsPass) {
    const presets = [];
    for (let i = 0; i < rawPresets.length; i++) {
      const descriptor = rawPresets[i];
      if (descriptor.options !== false) {
        try {
          var preset = yield* loadPresetDescriptor(descriptor, presetContext);
        } catch (e) {
          if (e.code === "BABEL_UNKNOWN_OPTION") {
            checkNoUnwrappedItemOptionPairs(rawPresets, i, "preset", e);
          }
          throw e;
        }
        externalDependencies.push(preset.externalDependencies);
        if (descriptor.ownPass) {
          presets.push({
            preset: preset.chain,
            pass: []
          });
        } else {
          presets.unshift({
            preset: preset.chain,
            pass: pluginDescriptorsPass
          });
        }
      }
    }
    if (presets.length > 0) {
      pluginDescriptorsByPass.splice(1, 0, ...presets.map(o => o.pass).filter(p => p !== pluginDescriptorsPass));
      for (const {
        preset,
        pass
      } of presets) {
        if (!preset) return true;
        pass.push(...preset.plugins);
        const ignored = yield* recursePresetDescriptors(preset.presets, pass);
        if (ignored) return true;
        preset.options.forEach(opts => {
          mergeOptions(optionDefaults, opts);
        });
      }
    }
  })(presetsDescriptors, pluginDescriptorsByPass[0]);
  if (ignored) return null;
  const opts = optionDefaults;
  mergeOptions(opts, options);
  const pluginContext = {
    ...presetContext,
    assumptions: opts.assumptions ?? {}
  };
  yield* enhanceError(context, function* loadPluginDescriptors() {
    pluginDescriptorsByPass[0].unshift(...initialPluginsDescriptors);
    for (const descs of pluginDescriptorsByPass) {
      const pass = [];
      passes.push(pass);
      for (let i = 0; i < descs.length; i++) {
        const descriptor = descs[i];
        if (descriptor.options !== false) {
          try {
            var plugin = yield* loadPluginDescriptor(descriptor, pluginContext);
          } catch (e) {
            if (e.code === "BABEL_UNKNOWN_PLUGIN_PROPERTY") {
              checkNoUnwrappedItemOptionPairs(descs, i, "plugin", e);
            }
            throw e;
          }
          pass.push(plugin);
          externalDependencies.push(plugin.externalDependencies);
        }
      }
    }
  })();
  opts.plugins = passes[0];
  opts.presets = passes.slice(1).filter(plugins => plugins.length > 0).map(plugins => ({
    plugins
  }));
  opts.passPerPreset = opts.presets.length > 0;
  return {
    options: opts,
    passes: passes,
    externalDependencies: finalize(externalDependencies)
  };
});
function enhanceError(context, fn) {
  return function* (arg1, arg2) {
    try {
      return yield* fn(arg1, arg2);
    } catch (e) {
      if (!e.message.startsWith("[BABEL]")) {
        e.message = `[BABEL] ${context.filename ?? "unknown file"}: ${e.message}`;
      }
      throw e;
    }
  };
}
const makeDescriptorLoader = apiFactory => makeWeakCache(function* ({
  value,
  options,
  dirname,
  alias
}, cache) {
  if (options === false) throw new Error("Assertion failure");
  options = options || {};
  const externalDependencies = [];
  let item = value;
  if (typeof value === "function") {
    const factory = maybeAsync(value, `You appear to be using an async plugin/preset, but Babel has been called synchronously`);
    const api = {
      ...context,
      ...apiFactory(cache, externalDependencies)
    };
    try {
      item = yield* factory(api, options, dirname);
    } catch (e) {
      if (alias) {
        e.message += ` (While processing: ${JSON.stringify(alias)})`;
      }
      throw e;
    }
  }
  if (!item || typeof item !== "object") {
    throw new Error("Plugin/Preset did not return an object.");
  }
  if (isThenable(item)) {
    yield* [];
    throw new Error(`You appear to be using a promise as a plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, ` + `you may need to upgrade your @babel/core version. ` + `As an alternative, you can prefix the promise with "await". ` + `(While processing: ${JSON.stringify(alias)})`);
  }
  if (externalDependencies.length > 0 && (!cache.configured() || cache.mode() === "forever")) {
    let error = `A plugin/preset has external untracked dependencies ` + `(${externalDependencies[0]}), but the cache `;
    if (!cache.configured()) {
      error += `has not been configured to be invalidated when the external dependencies change. `;
    } else {
      error += ` has been configured to never be invalidated. `;
    }
    error += `Plugins/presets should configure their cache to be invalidated when the external ` + `dependencies change, for example using \`api.cache.invalidate(() => ` + `statSync(filepath).mtimeMs)\` or \`api.cache.never()\`\n` + `(While processing: ${JSON.stringify(alias)})`;
    throw new Error(error);
  }
  return {
    value: item,
    options,
    dirname,
    alias,
    externalDependencies: finalize(externalDependencies)
  };
});
const pluginDescriptorLoader = makeDescriptorLoader(makePluginAPI);
const presetDescriptorLoader = makeDescriptorLoader(makePresetAPI);
const instantiatePlugin = makeWeakCache(function* ({
  value,
  options,
  dirname,
  alias,
  externalDependencies
}, cache) {
  const pluginObj = validatePluginObject(value);
  const plugin = {
    ...pluginObj
  };
  if (plugin.visitor) {
    plugin.visitor = traverse.explode({
      ...plugin.visitor
    });
  }
  if (plugin.inherits) {
    const inheritsDescriptor = {
      name: undefined,
      alias: `${alias}$inherits`,
      value: plugin.inherits,
      options,
      dirname
    };
    const inherits = yield* forwardAsync(loadPluginDescriptor, run => {
      return cache.invalidate(data => run(inheritsDescriptor, data));
    });
    plugin.pre = chainMaybeAsync(inherits.pre, plugin.pre);
    plugin.post = chainMaybeAsync(inherits.post, plugin.post);
    plugin.manipulateOptions = chainMaybeAsync(inherits.manipulateOptions, plugin.manipulateOptions);
    plugin.visitor = traverse.visitors.merge([inherits.visitor || {}, plugin.visitor || {}]);
    if (inherits.externalDependencies.length > 0) {
      if (externalDependencies.length === 0) {
        externalDependencies = inherits.externalDependencies;
      } else {
        externalDependencies = finalize([externalDependencies, inherits.externalDependencies]);
      }
    }
  }
  return new Plugin(plugin, options, alias, externalDependencies);
});
function* loadPluginDescriptor(descriptor, context) {
  if (descriptor.value instanceof Plugin) {
    if (descriptor.options) {
      throw new Error("Passed options to an existing Plugin instance will not work.");
    }
    return descriptor.value;
  }
  return yield* instantiatePlugin(yield* pluginDescriptorLoader(descriptor, context), context);
}
const needsFilename = val => val && typeof val !== "function";
const validateIfOptionNeedsFilename = (options, descriptor) => {
  if (needsFilename(options.test) || needsFilename(options.include) || needsFilename(options.exclude)) {
    const formattedPresetName = descriptor.name ? `"${descriptor.name}"` : "/* your preset */";
    throw new ConfigError([`Preset ${formattedPresetName} requires a filename to be set when babel is called directly,`, `\`\`\``, `babel.transformSync(code, { filename: 'file.ts', presets: [${formattedPresetName}] });`, `\`\`\``, `See https://babeljs.io/docs/en/options#filename for more information.`].join("\n"));
  }
};
const validatePreset = (preset, context, descriptor) => {
  if (!context.filename) {
    const {
      options
    } = preset;
    validateIfOptionNeedsFilename(options, descriptor);
    options.overrides?.forEach(overrideOptions => validateIfOptionNeedsFilename(overrideOptions, descriptor));
  }
};
const instantiatePreset = makeWeakCacheSync(({
  value,
  dirname,
  alias,
  externalDependencies
}) => {
  return {
    options: validate("preset", value),
    alias,
    dirname,
    externalDependencies
  };
});
function* loadPresetDescriptor(descriptor, context) {
  const preset = instantiatePreset(yield* presetDescriptorLoader(descriptor, context));
  validatePreset(preset, context, descriptor);
  return {
    chain: yield* buildPresetChain(preset, context),
    externalDependencies: preset.externalDependencies
  };
}
function chainMaybeAsync(a, b) {
  if (!a) return b;
  if (!b) return a;
  return function (...args) {
    const res = a.apply(this, args);
    if (res && typeof res.then === "function") {
      return res.then(() => b.apply(this, args));
    }
    return b.apply(this, args);
  };
}

const loadPartialConfigRunner = gensync(loadPartialConfig$1);
function loadPartialConfigAsync(...args) {
  return beginHiddenCallStack(loadPartialConfigRunner.async)(...args);
}
function loadPartialConfigSync(...args) {
  return beginHiddenCallStack(loadPartialConfigRunner.sync)(...args);
}
function loadPartialConfig(opts, callback) {
  if (callback !== undefined) {
    beginHiddenCallStack(loadPartialConfigRunner.errback)(opts, callback);
  } else if (typeof opts === "function") {
    beginHiddenCallStack(loadPartialConfigRunner.errback)(undefined, opts);
  } else {
    throw new Error("Starting from Babel 8.0.0, the 'loadPartialConfig' function expects a callback. If you need to call it synchronously, please use 'loadPartialConfigSync'.");
  }
}
function* loadOptionsImpl(opts) {
  const config = yield* loadConfig(opts);
  return config?.options ?? null;
}
const loadOptionsRunner = gensync(loadOptionsImpl);
function loadOptionsAsync(...args) {
  return beginHiddenCallStack(loadOptionsRunner.async)(...args);
}
function loadOptionsSync(...args) {
  return beginHiddenCallStack(loadOptionsRunner.sync)(...args);
}
function loadOptions(opts, callback) {
  if (callback !== undefined) {
    beginHiddenCallStack(loadOptionsRunner.errback)(opts, callback);
  } else if (typeof opts === "function") {
    beginHiddenCallStack(loadOptionsRunner.errback)(undefined, opts);
  } else {
    throw new Error("Starting from Babel 8.0.0, the 'loadOptions' function expects a callback. If you need to call it synchronously, please use 'loadOptionsSync'.");
  }
}
const createConfigItemRunner = gensync(createConfigItem$1);
function createConfigItemAsync(...args) {
  return beginHiddenCallStack(createConfigItemRunner.async)(...args);
}
function createConfigItemSync(...args) {
  return beginHiddenCallStack(createConfigItemRunner.sync)(...args);
}
function createConfigItem(target, options, callback) {
  if (callback !== undefined) {
    beginHiddenCallStack(createConfigItemRunner.errback)(target, options, callback);
  } else if (typeof options === "function") {
    beginHiddenCallStack(createConfigItemRunner.errback)(target, undefined, callback);
  } else {
    throw new Error("Starting from Babel 8.0.0, the 'createConfigItem' function expects a callback. If you need to call it synchronously, please use 'createConfigItemSync'.");
  }
}

class PluginPass {
  _map = new Map();
  key;
  file;
  opts;
  cwd;
  filename;
  isAsync;
  constructor(file, key, options, isAsync) {
    this.key = key;
    this.file = file;
    this.opts = options || {};
    this.cwd = file.opts.cwd;
    this.filename = file.opts.filename;
    this.isAsync = isAsync;
  }
  set(key, val) {
    this._map.set(key, val);
  }
  get(key) {
    return this._map.get(key);
  }
  availableHelper(name, versionRange) {
    return this.file.availableHelper(name, versionRange);
  }
  addHelper(name) {
    return this.file.addHelper(name);
  }
  buildCodeFrameError(node, msg, _Error) {
    return this.file.buildCodeFrameError(node, msg, _Error);
  }
}

let LOADED_PLUGIN;
const blockHoistPlugin = {
  name: "internal.blockHoist",
  visitor: {
    Block: {
      exit({
        node
      }) {
        node.body = performHoisting(node.body);
      }
    },
    SwitchCase: {
      exit({
        node
      }) {
        node.consequent = performHoisting(node.consequent);
      }
    }
  }
};
function performHoisting(body) {
  let max = 2 ** 30 - 1;
  let hasChange = false;
  for (let i = 0; i < body.length; i++) {
    const n = body[i];
    const p = priority(n);
    if (p > max) {
      hasChange = true;
      break;
    }
    max = p;
  }
  if (!hasChange) return body;
  return stableSort(body.slice());
}
function loadBlockHoistPlugin() {
  if (!LOADED_PLUGIN) {
    LOADED_PLUGIN = new Plugin({
      ...blockHoistPlugin,
      visitor: traverse.explode(blockHoistPlugin.visitor)
    }, {});
  }
  return LOADED_PLUGIN;
}
function priority(bodyNode) {
  const priority = bodyNode?._blockHoist;
  if (priority == null) return 1;
  if (priority === true) return 2;
  return priority;
}
function stableSort(body) {
  const buckets = Object.create(null);
  for (let i = 0; i < body.length; i++) {
    const n = body[i];
    const p = priority(n);
    const bucket = buckets[p] || (buckets[p] = []);
    bucket.push(n);
  }
  const keys = Object.keys(buckets).map(k => +k).sort((a, b) => b - a);
  let index = 0;
  for (const key of keys) {
    const bucket = buckets[key];
    for (const n of bucket) {
      body[index++] = n;
    }
  }
  return body;
}

function normalizeOptions(config) {
  const {
    filename,
    cwd,
    filenameRelative = typeof filename === "string" ? path.relative(cwd, filename) : "unknown",
    sourceType = "module",
    inputSourceMap,
    sourceMaps = !!inputSourceMap,
    sourceRoot = undefined,
    sourceFileName = path.basename(filenameRelative),
    comments = true,
    compact = "auto"
  } = config.options;
  const opts = config.options;
  const options = {
    ...opts,
    parserOpts: {
      sourceType: path.extname(filenameRelative) === ".mjs" ? "module" : sourceType,
      sourceFileName: filename,
      plugins: [],
      ...opts.parserOpts
    },
    generatorOpts: {
      filename,
      auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
      auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
      retainLines: opts.retainLines,
      comments,
      shouldPrintComment: opts.shouldPrintComment,
      compact,
      minified: opts.minified,
      sourceMaps: !!sourceMaps,
      sourceRoot,
      sourceFileName,
      ...opts.generatorOpts
    }
  };
  for (const plugins of config.passes) {
    for (const plugin of plugins) {
      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(options, options.parserOpts);
      }
    }
  }
  return options;
}

const pluginNameMap = {
  asyncDoExpressions: {
    syntax: {
      name: "@babel/plugin-syntax-async-do-expressions",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-async-do-expressions"
    }
  },
  decimal: {
    syntax: {
      name: "@babel/plugin-syntax-decimal",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-decimal"
    }
  },
  decorators: {
    syntax: {
      name: "@babel/plugin-syntax-decorators",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-decorators"
    },
    transform: {
      name: "@babel/plugin-proposal-decorators",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-decorators"
    }
  },
  doExpressions: {
    syntax: {
      name: "@babel/plugin-syntax-do-expressions",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-do-expressions"
    },
    transform: {
      name: "@babel/plugin-proposal-do-expressions",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-do-expressions"
    }
  },
  exportDefaultFrom: {
    syntax: {
      name: "@babel/plugin-syntax-export-default-from",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-export-default-from"
    },
    transform: {
      name: "@babel/plugin-proposal-export-default-from",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-export-default-from"
    }
  },
  flow: {
    syntax: {
      name: "@babel/plugin-syntax-flow",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-flow"
    },
    transform: {
      name: "@babel/preset-flow",
      url: "https://github.com/babel/babel/tree/main/packages/babel-preset-flow"
    }
  },
  functionBind: {
    syntax: {
      name: "@babel/plugin-syntax-function-bind",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-function-bind"
    },
    transform: {
      name: "@babel/plugin-proposal-function-bind",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-function-bind"
    }
  },
  functionSent: {
    syntax: {
      name: "@babel/plugin-syntax-function-sent",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-function-sent"
    },
    transform: {
      name: "@babel/plugin-proposal-function-sent",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-function-sent"
    }
  },
  jsx: {
    syntax: {
      name: "@babel/plugin-syntax-jsx",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-jsx"
    },
    transform: {
      name: "@babel/preset-react",
      url: "https://github.com/babel/babel/tree/main/packages/babel-preset-react"
    }
  },
  pipelineOperator: {
    syntax: {
      name: "@babel/plugin-syntax-pipeline-operator",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-pipeline-operator"
    },
    transform: {
      name: "@babel/plugin-proposal-pipeline-operator",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-pipeline-operator"
    }
  },
  recordAndTuple: {
    syntax: {
      name: "@babel/plugin-syntax-record-and-tuple",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-record-and-tuple"
    }
  },
  throwExpressions: {
    syntax: {
      name: "@babel/plugin-syntax-throw-expressions",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-throw-expressions"
    },
    transform: {
      name: "@babel/plugin-proposal-throw-expressions",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-throw-expressions"
    }
  },
  typescript: {
    syntax: {
      name: "@babel/plugin-syntax-typescript",
      url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-typescript"
    },
    transform: {
      name: "@babel/preset-typescript",
      url: "https://github.com/babel/babel/tree/main/packages/babel-preset-typescript"
    }
  }
};
const getNameURLCombination = ({
  name,
  url
}) => `${name} (${url})`;
function generateMissingPluginMessage(missingPluginName, loc, codeFrame, filename) {
  let helpMessage = `Support for the experimental syntax '${missingPluginName}' isn't currently enabled ` + `(${loc.line}:${loc.column + 1}):\n\n` + codeFrame;
  const pluginInfo = pluginNameMap[missingPluginName];
  if (pluginInfo) {
    const {
      syntax: syntaxPlugin,
      transform: transformPlugin
    } = pluginInfo;
    if (syntaxPlugin) {
      const syntaxPluginInfo = getNameURLCombination(syntaxPlugin);
      if (transformPlugin) {
        const transformPluginInfo = getNameURLCombination(transformPlugin);
        const sectionType = transformPlugin.name.startsWith("@babel/plugin") ? "plugins" : "presets";
        helpMessage += `\n\nAdd ${transformPluginInfo} to the '${sectionType}' section of your Babel config to enable transformation.
If you want to leave it as-is, add ${syntaxPluginInfo} to the 'plugins' section to enable parsing.`;
      } else {
        helpMessage += `\n\nAdd ${syntaxPluginInfo} to the 'plugins' section of your Babel config ` + `to enable parsing.`;
      }
    }
  }
  const msgFilename = filename === "unknown" ? "<name of the input file>" : filename;
  helpMessage += `

If you already added the plugin for this syntax to your config, it's possible that your config \
isn't being loaded.
You can re-run Babel with the BABEL_SHOW_CONFIG_FOR environment variable to show the loaded \
configuration:
\tnpx cross-env BABEL_SHOW_CONFIG_FOR=${msgFilename} <your build command>
See https://babeljs.io/docs/configuration#print-effective-configs for more info.
`;
  return helpMessage;
}

function* parser(pluginPasses, {
  parserOpts,
  highlightCode = true,
  filename = "unknown"
}, code) {
  try {
    const results = [];
    for (const plugins of pluginPasses) {
      for (const plugin of plugins) {
        const {
          parserOverride
        } = plugin;
        if (parserOverride) {
          const ast = parserOverride(code, parserOpts, parse$1);
          if (ast !== undefined) results.push(ast);
        }
      }
    }
    if (results.length === 0) {
      return parse$1(code, parserOpts);
    } else if (results.length === 1) {
      yield* [];
      if (typeof results[0].then === "function") {
        throw new Error(`You appear to be using an async parser plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
      }
      return results[0];
    }
    throw new Error("More than one plugin attempted to override parsing.");
  } catch (err) {
    if (err.code === "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED") {
      err.message += "\nConsider renaming the file to '.mjs', or setting sourceType:module " + "or sourceType:unambiguous in your Babel config for this file.";
    }
    const startLine = parserOpts?.startLine;
    const startColumn = parserOpts?.startColumn;
    if (startColumn != null) {
      code = " ".repeat(startColumn) + code;
    }
    const {
      loc,
      missingPlugin
    } = err;
    if (loc) {
      const codeFrame = codeFrameColumns(code, {
        start: {
          line: loc.line,
          column: loc.column
        }
      }, {
        highlightCode,
        startLine: startLine
      });
      if (missingPlugin) {
        err.message = `${filename}: ` + generateMissingPluginMessage(missingPlugin[0], loc, codeFrame, filename);
      } else {
        err.message = `${filename}: ${err.message}\n\n` + codeFrame;
      }
      err.code = "BABEL_PARSE_ERROR";
    }
    throw err;
  }
}

const circleSet = new Set();
let depth = 0;
function deepClone(value, cache, allowCircle) {
  if (value !== null) {
    if (allowCircle) {
      if (cache.has(value)) return cache.get(value);
    } else if (++depth > 250) {
      if (circleSet.has(value)) {
        depth = 0;
        circleSet.clear();
        throw new Error("Babel-deepClone: Cycles are not allowed in AST");
      }
      circleSet.add(value);
    }
    let cloned;
    if (Array.isArray(value)) {
      cloned = new Array(value.length);
      if (allowCircle) cache.set(value, cloned);
      for (let i = 0; i < value.length; i++) {
        cloned[i] = typeof value[i] !== "object" ? value[i] : deepClone(value[i], cache, allowCircle);
      }
    } else {
      cloned = {};
      if (allowCircle) cache.set(value, cloned);
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        cloned[key] = typeof value[key] !== "object" ? value[key] : deepClone(value[key], cache, allowCircle || key === "leadingComments" || key === "innerComments" || key === "trailingComments" || key === "extra");
      }
    }
    if (!allowCircle) {
      if (depth-- > 250) circleSet.delete(value);
    }
    return cloned;
  }
  return value;
}
function cloneDeep (value) {
  if (typeof value !== "object") return value;
  return deepClone(value, new Map(), false);
}

const {
  file
} = _t;
const SOURCEMAP_REGEX = /^[@#]\s+sourceMappingURL=.*$/;
const INLINE_SOURCEMAP_REGEX = /^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,.*$/;
const EXTERNAL_SOURCEMAP_REGEX = /^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;
function* normalizeFile(pluginPasses, options, code, ast) {
  code = `${code || ""}`;
  if (ast) {
    if (ast.type === "Program") {
      ast = file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }
    if (options.cloneInputAst) {
      ast = cloneDeep(ast);
    }
  } else {
    ast = yield* parser(pluginPasses, options, code);
  }
  let inputMap = null;
  if (options.sourceMaps && options.inputSourceMap !== false) {
    if (typeof options.inputSourceMap === "object") {
      inputMap = convertSourceMap.fromObject(options.inputSourceMap);
    }
    if (!inputMap) {
      const body = ast.program.body;
      const comment = extractCommentFromList(body.length > 0 ? body[body.length - 1].trailingComments : ast.program.innerComments);
      if (comment) {
        if (INLINE_SOURCEMAP_REGEX.test(comment)) {
          try {
            inputMap = convertSourceMap.fromComment("//" + comment);
          } catch (err) {
            console.warn("discarding unknown inline input sourcemap", options.filename, err);
          }
        } else if (typeof options.filename === "string" && EXTERNAL_SOURCEMAP_REGEX.test(comment)) {
          try {
            const inputMapURL = EXTERNAL_SOURCEMAP_REGEX.exec(comment)[1];
            inputMap = readInputSourceMapFile(options.filename, options.root, inputMapURL);
          } catch (err) {
            console.warn("discarding unknown file input sourcemap", err);
          }
        } else {
          console.warn("discarding un-loadable file input sourcemap");
        }
      }
    }
  }
  return new File(options, {
    code,
    ast: ast,
    inputMap
  });
}
function extractCommentFromList(comments) {
  if (comments == null || comments.length === 0) return null;
  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i];
    if (SOURCEMAP_REGEX.test(comment.value)) {
      comments.splice(i, 1);
      return comment.value;
    }
  }
  return null;
}

function generateCode(pluginPasses, file) {
  const {
    opts,
    ast,
    code,
    inputMap
  } = file;
  const generatorOpts = opts.generatorOpts;
  generatorOpts.inputSourceMap = inputMap?.toObject();
  const results = [];
  for (const plugins of pluginPasses) {
    for (const plugin of plugins) {
      const {
        generatorOverride
      } = plugin;
      if (generatorOverride) {
        const result = generatorOverride(ast, generatorOpts, code, generate);
        if (result !== undefined) results.push(result);
      }
    }
  }
  let result;
  if (results.length === 0) {
    result = generate(ast, generatorOpts, code);
  } else if (results.length === 1) {
    result = results[0];
    if (typeof result.then === "function") {
      throw new Error(`You appear to be using an async codegen plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, ` + `you may need to upgrade your @babel/core version.`);
    }
  } else {
    throw new Error("More than one plugin attempted to override codegen.");
  }
  let {
    code: outputCode
  } = result;
  let outputMap = result.map;
  if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
    outputCode += "\n" + convertSourceMap.fromObject(outputMap).toComment();
  }
  if (opts.sourceMaps === "inline") {
    outputMap = null;
  }
  return {
    outputCode,
    outputMap
  };
}

function* run(config, code, ast) {
  const file = yield* normalizeFile(config.passes, normalizeOptions(config), code, ast);
  const opts = file.opts;
  try {
    yield* transformFile(file, config.passes);
  } catch (e) {
    e.message = `${opts.filename ?? "unknown file"}: ${e.message}`;
    if (!e.code) {
      e.code = "BABEL_TRANSFORM_ERROR";
    }
    throw e;
  }
  let outputCode, outputMap;
  try {
    if (opts.code !== false) {
      ({
        outputCode,
        outputMap
      } = generateCode(config.passes, file));
    }
  } catch (e) {
    e.message = `${opts.filename ?? "unknown file"}: ${e.message}`;
    if (!e.code) {
      e.code = "BABEL_GENERATE_ERROR";
    }
    throw e;
  }
  return {
    metadata: file.metadata,
    options: opts,
    ast: opts.ast === true ? file.ast : null,
    code: outputCode === undefined ? null : outputCode,
    map: outputMap === undefined ? null : outputMap,
    sourceType: file.ast.program.sourceType,
    externalDependencies: flattenToSet(config.externalDependencies)
  };
}
function* transformFile(file, pluginPasses) {
  const async = yield* isAsync();
  for (const pluginPairs of pluginPasses) {
    const passPairs = [];
    const passes = [];
    const visitors = [];
    for (const plugin of pluginPairs.concat([loadBlockHoistPlugin()])) {
      const pass = new PluginPass(file, plugin.key, plugin.options, async);
      passPairs.push([plugin, pass]);
      passes.push(pass);
      visitors.push(plugin.visitor);
    }
    for (const [plugin, pass] of passPairs) {
      if (plugin.pre) {
        const fn = maybeAsync(plugin.pre, `You appear to be using an async plugin/preset, but Babel has been called synchronously`);
        yield* fn.call(pass, file);
      }
    }
    const visitor = traverse.visitors.merge(visitors, passes, file.opts.wrapPluginVisitorMethod);
    traverse(file.ast.program, visitor, file.scope, null, file.path, true);
    for (const [plugin, pass] of passPairs) {
      if (plugin.post) {
        const fn = maybeAsync(plugin.post, `You appear to be using an async plugin/preset, but Babel has been called synchronously`);
        yield* fn.call(pass, file);
      }
    }
  }
}

const transformRunner = gensync(function* transform(code, opts) {
  const config = yield* loadConfig(opts);
  if (config === null) return null;
  return yield* run(config, code);
});
const transform = function transform(code, optsOrCallback, maybeCallback) {
  let opts;
  let callback;
  if (typeof optsOrCallback === "function") {
    callback = optsOrCallback;
    opts = undefined;
  } else {
    opts = optsOrCallback;
    callback = maybeCallback;
  }
  if (callback === undefined) {
    throw new Error("Starting from Babel 8.0.0, the 'transform' function expects a callback. If you need to call it synchronously, please use 'transformSync'.");
  }
  beginHiddenCallStack(transformRunner.errback)(code, opts, callback);
  return null;
};
function transformSync(...args) {
  return beginHiddenCallStack(transformRunner.sync)(...args);
}
function transformAsync(...args) {
  return beginHiddenCallStack(transformRunner.async)(...args);
}

const transformFromAstRunner = gensync(function* (ast, code, opts) {
  const config = yield* loadConfig(opts);
  if (config === null) return null;
  if (!ast) throw new Error("No AST given");
  return yield* run(config, code, ast);
});
const transformFromAst = function transformFromAst(ast, code, optsOrCallback, maybeCallback) {
  let opts;
  let callback;
  if (typeof optsOrCallback === "function") {
    callback = optsOrCallback;
    opts = undefined;
  } else {
    opts = optsOrCallback;
    callback = maybeCallback;
  }
  if (callback === undefined) {
    throw new Error("Starting from Babel 8.0.0, the 'transformFromAst' function expects a callback. If you need to call it synchronously, please use 'transformFromAstSync'.");
  }
  beginHiddenCallStack(transformFromAstRunner.errback)(ast, code, opts, callback);
  return null;
};
function transformFromAstSync(...args) {
  return beginHiddenCallStack(transformFromAstRunner.sync)(...args);
}
function transformFromAstAsync(...args) {
  return beginHiddenCallStack(transformFromAstRunner.async)(...args);
}

const parseRunner = gensync(function* parse(code, opts) {
  const config = yield* loadConfig(opts);
  if (config === null) {
    return null;
  }
  return yield* parser(config.passes, normalizeOptions(config), code);
});
const parse = function parse(code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }
  if (callback === undefined) {
    throw new Error("Starting from Babel 8.0.0, the 'parse' function expects a callback. If you need to call it synchronously, please use 'parseSync'.");
  }
  beginHiddenCallStack(parseRunner.errback)(code, opts, callback);
  return null;
};
function parseSync(...args) {
  return beginHiddenCallStack(parseRunner.sync)(...args);
}
function parseAsync(...args) {
  return beginHiddenCallStack(parseRunner.async)(...args);
}

const version = "8.0.1";
const resolvePlugin = (name, dirname) => resolvers.resolvePlugin(name, dirname, false).filepath;
const resolvePreset = (name, dirname) => resolvers.resolvePreset(name, dirname, false).filepath;
const DEFAULT_EXTENSIONS = Object.freeze([".js", ".jsx", ".es6", ".es", ".mjs", ".cjs"]);

export { ConfigError, DEFAULT_EXTENSIONS, File, buildExternalHelpers, createConfigItem, createConfigItemAsync, createConfigItemSync, getEnv, loadConfig, loadOptions, loadOptionsAsync, loadOptionsSync, loadPartialConfig, loadPartialConfigAsync, loadPartialConfigSync, makeConfigAPI, parse, parseAsync, parseSync, pathToPattern, resolvePlugin, resolvePreset, run, transform, transformAsync, transformFromAst, transformFromAstAsync, transformFromAstSync, transformSync, version };
//# sourceMappingURL=index-shared.js.map
