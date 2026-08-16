import path from 'node:path';
import { makeStrongCache, isAsync, waitFor, makeWeakCache, makeWeakCacheSync } from '../../caching-shared.js';
import { readFile, stat } from '../../fs-shared.js';
import fs, { existsSync } from 'node:fs';
import { ConfigError, makeConfigAPI, pathToPattern } from '../../index-shared.js';
import { createDebug } from 'obug';
import json5 from 'json5';
import gensync from 'gensync';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { endHiddenCallStack } from '../../errors/rewrite-stack-trace.js';
import { resolve } from 'import-meta-resolve';

function makeStaticFileCache(fn) {
  return makeStrongCache(function* (filepath, cache) {
    const cached = cache.invalidate(() => fileMtime(filepath));
    if (cached === null) {
      return null;
    }
    return fn(filepath, yield* readFile(filepath, "utf8"));
  });
}
function fileMtime(filepath) {
  if (!fs.existsSync(filepath)) return null;
  try {
    return +fs.statSync(filepath).mtime;
  } catch (e) {
    if (e.code !== "ENOENT" && e.code !== "ENOTDIR") throw e;
  }
  return null;
}

const PACKAGE_FILENAME = "package.json";
const readConfigPackage = makeStaticFileCache((filepath, content) => {
  let options;
  try {
    options = JSON.parse(content);
  } catch (err) {
    throw new ConfigError(`Error while parsing JSON - ${err.message}`, filepath);
  }
  if (!options) throw new Error(`${filepath}: No config detected`);
  if (typeof options !== "object") {
    throw new ConfigError(`Config returned typeof ${typeof options}`, filepath);
  }
  if (Array.isArray(options)) {
    throw new ConfigError(`Expected config object but found array`, filepath);
  }
  return {
    filepath,
    dirname: path.dirname(filepath),
    options
  };
});
function* findPackageData(filepath) {
  let pkg = null;
  const directories = [];
  let isPackage = true;
  let dirname = path.dirname(filepath);
  while (!pkg && path.basename(dirname) !== "node_modules") {
    directories.push(dirname);
    pkg = yield* readConfigPackage(path.join(dirname, PACKAGE_FILENAME));
    const nextLoc = path.dirname(dirname);
    if (dirname === nextLoc) {
      isPackage = false;
      break;
    }
    dirname = nextLoc;
  }
  return {
    filepath,
    directories,
    pkg,
    isPackage
  };
}

const debug$2 = createDebug("babel:config:loading:files:module-types");
const require$3 = createRequire(import.meta.url);
const LOADING_CJS_FILES = new Set();
function loadCjsDefault(filepath) {
  if (LOADING_CJS_FILES.has(filepath)) {
    debug$2("Auto-ignoring usage of config %o.", filepath);
    return {};
  }
  let module;
  try {
    LOADING_CJS_FILES.add(filepath);
    module = endHiddenCallStack(require$3)(filepath);
  } finally {
    LOADING_CJS_FILES.delete(filepath);
  }
  return module != null && (module.__esModule || module[Symbol.toStringTag] === "Module") ? module.default : module;
}
const loadMjsFromPath = endHiddenCallStack(async function loadMjsFromPath(filepath) {
  const url = pathToFileURL(filepath).toString() + "?import";
  return await import(url);
});
const tsNotSupportedError = ext => `\
You are using a ${ext} config file, but Babel only supports transpiling .cts configs. Either:
- Use a .cts config file
- Update to Node.js 23.6.0, which has native TypeScript support
- Install tsx to transpile ${ext} files on the fly\
`;
const SUPPORTED_EXTENSIONS = {
  ".js": "unknown",
  ".mjs": "esm",
  ".cjs": "cjs",
  ".ts": "unknown",
  ".mts": "esm",
  ".cts": "cjs"
};
function* loadCodeDefault(filepath, loader, esmError, tlaError) {
  let async;
  const ext = path.extname(filepath);
  const isTS = ext === ".ts" || ext === ".cts" || ext === ".mts";
  const type = SUPPORTED_EXTENSIONS[Object.hasOwn(SUPPORTED_EXTENSIONS, ext) ? ext : ".js"];
  const pattern = `${loader} ${type}`;
  switch (pattern) {
    case "require cjs":
    case "auto cjs":
      return loadCjsDefault(filepath);
    case "auto unknown":
    case "require unknown":
    case "require esm":
      try {
        return loadCjsDefault(filepath);
      } catch (e) {
        if (e.code === "ERR_REQUIRE_ASYNC_MODULE") {
          if (!(async ??= yield* isAsync())) {
            throw new ConfigError(tlaError, filepath);
          }
        } else {
          throw e;
        }
      }
    case "auto esm":
      if (async ?? (yield* isAsync())) {
        return (yield* waitFor(loadMjsFromPath(filepath))).default;
      }
      if (isTS) {
        throw new ConfigError(tsNotSupportedError(ext), filepath);
      } else {
        throw new ConfigError(esmError, filepath);
      }
    default:
      throw new Error("Internal Babel error: unreachable code.");
  }
}

const require$2 = createRequire(import.meta.url);
const debug$1 = createDebug("babel:config:loading:files:configuration");
const ROOT_CONFIG_FILENAMES = ["babel.config.js", "babel.config.cjs", "babel.config.mjs", "babel.config.json", "babel.config.cts", "babel.config.ts", "babel.config.mts"];
const RELATIVE_CONFIG_FILENAMES = [".babelrc", ".babelrc.js", ".babelrc.cjs", ".babelrc.mjs", ".babelrc.json", ".babelrc.cts"];
const BABELIGNORE_FILENAME = ".babelignore";
const runConfig = makeWeakCache(function* runConfig(options, cache) {
  yield* [];
  return {
    options: endHiddenCallStack(options)(makeConfigAPI(cache)),
    cacheNeedsConfiguration: !cache.configured()
  };
});
function* readConfigCode(filepath, data) {
  if (!fs.existsSync(filepath)) return null;
  let options = yield* loadCodeDefault(filepath, (yield* isAsync()) ? "auto" : "require", "You appear to be using a native ECMAScript module configuration " + "file, which is only supported when running Babel asynchronously " + "or when using the Node.js `--experimental-require-module` flag.", "You appear to be using a configuration file that contains top-level " + "await, which is only supported when running Babel asynchronously.");
  let cacheNeedsConfiguration = false;
  if (typeof options === "function") {
    ({
      options,
      cacheNeedsConfiguration
    } = yield* runConfig(options, data));
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new ConfigError(`Configuration should be an exported JavaScript object.`, filepath);
  }
  if (typeof options.then === "function") {
    options.catch?.(() => {});
    throw new ConfigError(`You appear to be using an async configuration, ` + `which your current version of Babel does not support. ` + `We may add support for this in the future, ` + `but if you're on the most recent version of @babel/core and still ` + `seeing this error, then you'll need to synchronously return your config.`, filepath);
  }
  if (cacheNeedsConfiguration) throwConfigError(filepath);
  return buildConfigFileObject(options, filepath);
}
const cfboaf = new WeakMap();
function buildConfigFileObject(options, filepath) {
  let configFilesByFilepath = cfboaf.get(options);
  if (!configFilesByFilepath) {
    cfboaf.set(options, configFilesByFilepath = new Map());
  }
  let configFile = configFilesByFilepath.get(filepath);
  if (!configFile) {
    configFile = {
      filepath,
      dirname: path.dirname(filepath),
      options
    };
    configFilesByFilepath.set(filepath, configFile);
  }
  return configFile;
}
const packageToBabelConfig = makeWeakCacheSync(file => {
  const babel = file.options.babel;
  if (babel === undefined) return null;
  if (typeof babel !== "object" || Array.isArray(babel) || babel === null) {
    throw new ConfigError(`.babel property must be an object`, file.filepath);
  }
  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: babel
  };
});
const readConfigJSON5 = makeStaticFileCache((filepath, content) => {
  let options;
  try {
    options = json5.parse(content);
  } catch (err) {
    throw new ConfigError(`Error while parsing config - ${err.message}`, filepath);
  }
  if (!options) throw new ConfigError(`No config detected`, filepath);
  if (typeof options !== "object") {
    throw new ConfigError(`Config returned typeof ${typeof options}`, filepath);
  }
  if (Array.isArray(options)) {
    throw new ConfigError(`Expected config object but found array`, filepath);
  }
  delete options.$schema;
  return {
    filepath,
    dirname: path.dirname(filepath),
    options
  };
});
const readIgnoreConfig = makeStaticFileCache((filepath, content) => {
  const ignoreDir = path.dirname(filepath);
  const ignorePatterns = content.split("\n").map(line => line.replace(/^#.*$/, "").trim()).filter(Boolean);
  for (const pattern of ignorePatterns) {
    if (pattern.startsWith("!")) {
      throw new ConfigError(`Negation of file paths is not supported.`, filepath);
    }
  }
  return {
    filepath,
    dirname: path.dirname(filepath),
    ignore: ignorePatterns.map(pattern => pathToPattern(pattern, ignoreDir))
  };
});
function findConfigUpwards(rootDir) {
  let dirname = rootDir;
  for (;;) {
    for (const filename of ROOT_CONFIG_FILENAMES) {
      if (fs.existsSync(path.join(dirname, filename))) {
        return dirname;
      }
    }
    const nextDir = path.dirname(dirname);
    if (dirname === nextDir) break;
    dirname = nextDir;
  }
  return null;
}
function* findRelativeConfig(packageData, envName, caller) {
  let config = null;
  let ignore = null;
  const dirname = path.dirname(packageData.filepath);
  for (const loc of packageData.directories) {
    if (!config) {
      config = yield* loadOneConfig(RELATIVE_CONFIG_FILENAMES, loc, envName, caller, packageData.pkg?.dirname === loc ? packageToBabelConfig(packageData.pkg) : null);
    }
    if (!ignore) {
      const ignoreLoc = path.join(loc, BABELIGNORE_FILENAME);
      ignore = yield* readIgnoreConfig(ignoreLoc);
      if (ignore) {
        debug$1("Found ignore %o from %o.", ignore.filepath, dirname);
      }
    }
  }
  return {
    config,
    ignore
  };
}
function findRootConfig(dirname, envName, caller) {
  return loadOneConfig(ROOT_CONFIG_FILENAMES, dirname, envName, caller);
}
function* loadOneConfig(names, dirname, envName, caller, previousConfig = null) {
  const configs = yield* gensync.all(names.map(filename => readConfig(path.join(dirname, filename), envName, caller)));
  const config = configs.reduce((previousConfig, config) => {
    if (config && previousConfig) {
      throw new ConfigError(`Multiple configuration files found. Please remove one:\n` + ` - ${path.basename(previousConfig.filepath)}\n` + ` - ${config.filepath}\n` + `from ${dirname}`);
    }
    return config || previousConfig;
  }, previousConfig);
  if (config) {
    debug$1("Found configuration %o from %o.", config.filepath, dirname);
  }
  return config;
}
function* loadConfig(name, dirname, envName, caller) {
  const filepath = require$2.resolve(name, {
    paths: [dirname]
  });
  const conf = yield* readConfig(filepath, envName, caller);
  if (!conf) {
    throw new ConfigError(`Config file contains no configuration data`, filepath);
  }
  debug$1("Loaded config %o from %o.", name, dirname);
  return conf;
}
function readConfig(filepath, envName, caller) {
  const ext = path.extname(filepath);
  switch (ext) {
    case ".js":
    case ".cjs":
    case ".mjs":
    case ".ts":
    case ".cts":
    case ".mts":
      return readConfigCode(filepath, {
        envName,
        caller
      });
    default:
      return readConfigJSON5(filepath);
  }
}
function* resolveShowConfigPath(dirname) {
  const targetPath = process.env.BABEL_SHOW_CONFIG_FOR;
  if (targetPath != null) {
    const absolutePath = path.resolve(dirname, targetPath);
    const stats = yield* stat(absolutePath);
    if (!stats.isFile()) {
      throw new Error(`${absolutePath}: BABEL_SHOW_CONFIG_FOR must refer to a regular file, directories are not supported.`);
    }
    return absolutePath;
  }
  return null;
}
function throwConfigError(filepath) {
  throw new ConfigError(`\
Caching was left unconfigured. Babel's plugins, presets, and .babelrc.js files can be configured
for various types of caching, using the first param of their handler functions:

module.exports = function(api) {
  // The API exposes the following:

  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  // Don't cache at all. Not recommended because it will be very slow.
  api.cache(false);

  // Cached based on the value of some function. If this function returns a value different from
  // a previously-encountered value, the plugins will re-evaluate.
  var env = api.cache(() => process.env.NODE_ENV);

  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for
  // any possible NODE_ENV value that might come up during plugin execution.
  var isProd = api.cache(() => process.env.NODE_ENV === "production");

  // .cache(fn) will perform a linear search though instances to find the matching plugin based
  // based on previous instantiated plugins. If you want to recreate the plugin and discard the
  // previous instance whenever something changes, you may use:
  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production");

  // Note, we also expose the following more-verbose versions of the above examples:
  api.cache.forever(); // api.cache(true)
  api.cache.never();   // api.cache(false)
  api.cache.using(fn); // api.cache(fn)

  // Return the value that will be cached.
  return { };
};`, filepath);
}

const require$1 = createRequire(import.meta.url);
const debug = createDebug("babel:config:loading:files:plugins");
const EXACT_RE = /^module:/;
const BABEL_PLUGIN_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-plugin-)/;
const BABEL_PRESET_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-preset-)/;
const BABEL_PLUGIN_ORG_RE = /^(@babel\/)(?!plugin-|[^/]+\/)/;
const BABEL_PRESET_ORG_RE = /^(@babel\/)(?!preset-|[^/]+\/)/;
const OTHER_PLUGIN_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-plugin(?:-|\/|$)|[^/]+\/)/;
const OTHER_PRESET_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-preset(?:-|\/|$)|[^/]+\/)/;
const OTHER_ORG_DEFAULT_RE = /^(@(?!babel$)[^/]+)$/;
const resolvePlugin = resolveStandardizedName.bind(null, "plugin");
const resolvePreset = resolveStandardizedName.bind(null, "preset");
function* loadPlugin(name, dirname) {
  const {
    filepath,
    loader
  } = resolvePlugin(name, dirname, yield* isAsync());
  const value = yield* requireModule("plugin", loader, filepath);
  debug("Loaded plugin %o from %o.", name, dirname);
  return {
    filepath,
    value
  };
}
function* loadPreset(name, dirname) {
  const {
    filepath,
    loader
  } = resolvePreset(name, dirname, yield* isAsync());
  const value = yield* requireModule("preset", loader, filepath);
  debug("Loaded preset %o from %o.", name, dirname);
  return {
    filepath,
    value
  };
}
function standardizeName(type, name) {
  if (path.isAbsolute(name)) return name;
  const isPreset = type === "preset";
  return name.replace(isPreset ? BABEL_PRESET_PREFIX_RE : BABEL_PLUGIN_PREFIX_RE, `babel-${type}-`).replace(isPreset ? BABEL_PRESET_ORG_RE : BABEL_PLUGIN_ORG_RE, `$1${type}-`).replace(isPreset ? OTHER_PRESET_ORG_RE : OTHER_PLUGIN_ORG_RE, `$1babel-${type}-`).replace(OTHER_ORG_DEFAULT_RE, `$1/babel-${type}`).replace(EXACT_RE, "");
}
function* resolveAlternativesHelper(type, name) {
  const standardizedName = standardizeName(type, name);
  const {
    error,
    value
  } = yield standardizedName;
  if (!error) return value;
  if (error.code !== "MODULE_NOT_FOUND") throw error;
  if (standardizedName !== name && !(yield name).error) {
    error.message += `\n- If you want to resolve "${name}", use "module:${name}"`;
  }
  if (!(yield standardizeName(type, "@babel/" + name)).error) {
    error.message += `\n- Did you mean "@babel/${name}"?`;
  }
  const oppositeType = type === "preset" ? "plugin" : "preset";
  if (!(yield standardizeName(oppositeType, name)).error) {
    error.message += `\n- Did you accidentally pass a ${oppositeType} as a ${type}?`;
  }
  if (type === "plugin") {
    const transformName = standardizedName.replace("-proposal-", "-transform-");
    if (transformName !== standardizedName && !(yield transformName).error) {
      error.message += `\n- Did you mean "${transformName}"?`;
    }
  }
  error.message += `\n
Make sure that all the Babel plugins and presets you are using
are defined as dependencies or devDependencies in your package.json
file. It's possible that the missing plugin is loaded by a preset
you are using that forgot to add the plugin to its dependencies: you
can workaround this problem by explicitly adding the missing package
to your top-level package.json.
`;
  throw error;
}
function tryRequireResolve(id, dirname) {
  try {
    if (dirname) {
      return {
        error: null,
        value: require$1.resolve(id, {
          paths: [dirname]
        })
      };
    } else {
      return {
        error: null,
        value: require$1.resolve(id)
      };
    }
  } catch (error) {
    return {
      error,
      value: null
    };
  }
}
function tryImportMetaResolve(id, options) {
  try {
    return {
      error: null,
      value: resolve(id, options)
    };
  } catch (error) {
    return {
      error,
      value: null
    };
  }
}
function resolveStandardizedNameForRequire(type, name, dirname) {
  const it = resolveAlternativesHelper(type, name);
  let res = it.next();
  while (!res.done) {
    res = it.next(tryRequireResolve(res.value, dirname));
  }
  return {
    loader: "require",
    filepath: res.value
  };
}
function resolveStandardizedNameForImport(type, name, dirname) {
  const parentUrl = pathToFileURL(path.join(dirname, "./babel-virtual-resolve-base.js")).href;
  const it = resolveAlternativesHelper(type, name);
  let res = it.next();
  while (!res.done) {
    res = it.next(tryImportMetaResolve(res.value, parentUrl));
  }
  return {
    loader: "auto",
    filepath: fileURLToPath(res.value)
  };
}
function resolveStandardizedName(type, name, dirname, allowAsync) {
  if (!allowAsync) {
    return resolveStandardizedNameForRequire(type, name, dirname);
  }
  try {
    const resolved = resolveStandardizedNameForImport(type, name, dirname);
    if (!existsSync(resolved.filepath)) {
      throw Object.assign(new Error(`Could not resolve "${name}" in file ${dirname}.`), {
        type: "MODULE_NOT_FOUND"
      });
    }
    return resolved;
  } catch (e) {
    try {
      return resolveStandardizedNameForRequire(type, name, dirname);
    } catch (e2) {
      if (e.type === "MODULE_NOT_FOUND") throw e;
      if (e2.type === "MODULE_NOT_FOUND") throw e2;
      throw e;
    }
  }
}
function* requireModule(type, loader, name) {
  try {
    return yield* loadCodeDefault(name, loader, `You appear to be using a native ECMAScript module ${type}, ` + "which is only supported when running Babel asynchronously " + "or when using the Node.js `--experimental-require-module` flag.", `You appear to be using a ${type} that contains top-level await, ` + "which is only supported when running Babel asynchronously.");
  } catch (err) {
    err.message = `[BABEL]: ${err.message} (While processing: ${name})`;
    throw err;
  }
}

export { ROOT_CONFIG_FILENAMES, findConfigUpwards, findPackageData, findRelativeConfig, findRootConfig, loadConfig, loadPlugin, loadPreset, resolvePlugin, resolvePreset, resolveShowConfigPath };
//# sourceMappingURL=index.js.map
