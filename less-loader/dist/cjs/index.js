"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodePath = _interopRequireDefault(require("node:path"));
var _options = _interopRequireDefault(require("./options.json"));
var _utils = require("./utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/** @typedef {import("webpack").LoaderContext<LoaderOptions>} LoaderContext */
/** @typedef {import("schema-utils/declarations/validate").Schema} Schema */
/** @typedef {import("./utils.js").LoaderOptions} LoaderOptions */
/** @typedef {import("./utils.js").LessError} LessError */
/** @typedef {import("./utils.js").SourceMap} SourceMap */

/**
 * Webpack loader that compiles Less to CSS.
 * @this {LoaderContext}
 * @param {string} content content
 * @returns {Promise<void>} loader result
 */
async function lessLoader(content) {
  const options = this.getOptions(/** @type {Schema} */_options.default);
  const callback = this.async();
  let implementation;
  try {
    implementation = await (0, _utils.getLessImplementation)(this, options.implementation);
  } catch (error) {
    callback(/** @type {Error} */error);
    return;
  }
  if (!implementation) {
    callback(new Error(`The Less implementation "${options.implementation}" not found`));
    return;
  }
  const {
    lessOptions,
    pendingDependencyTasks
  } = (0, _utils.getLessOptions)(this, options, implementation);
  const useSourceMap = typeof options.sourceMap === "boolean" ? options.sourceMap : this.sourceMap;
  if (useSourceMap) {
    lessOptions.sourceMap = {
      sourceMapBasepath: "",
      outputSourceFiles: true,
      // @ts-expect-error bad types
      disableSourcemapAnnotation: true
    };
  }
  let data = content;
  if (typeof options.additionalData !== "undefined") {
    data = typeof options.additionalData === "function" ? `${await options.additionalData(data, this)}` : `${options.additionalData}\n${data}`;
  }
  const logger = this.getLogger("less-loader");
  const loaderContext = this;
  const lessLogAsWarnOrErr = options.lessLogAsWarnOrErr !== false;
  const loggerListener = {
    /** @param {string} message message */
    error(message) {
      if (lessLogAsWarnOrErr) {
        loaderContext.emitError(new Error(message));
      } else {
        logger.error(message);
      }
    },
    /** @param {string} message message */
    warn(message) {
      if (lessLogAsWarnOrErr) {
        loaderContext.emitWarning(new Error(message));
      } else {
        logger.warn(message);
      }
    },
    /** @param {string} message message */
    info(message) {
      logger.log(message);
    },
    /** @param {string} message message */
    debug(message) {
      logger.debug(message);
    }
  };

  // @ts-expect-error bad types
  implementation.logger.addListener(loggerListener);
  let result;
  try {
    result = await implementation.render(data, lessOptions);
  } catch (error) {
    const lessError = /** @type {LessError} */error;
    if (lessError.filename) {
      // `less` returns forward slashes on windows when `webpack` resolver return an absolute windows path in `WebpackFileManager`
      // Ref: https://github.com/webpack/less-loader/issues/357
      this.addDependency(_nodePath.default.normalize(lessError.filename));
    }

    // Wait for any pending sync-load dependency tracking so the failed
    // build still snapshots the files it touched.
    await Promise.all(pendingDependencyTasks);
    callback((0, _utils.errorFactory)(lessError));
    return;
  } finally {
    // Fix memory leaks in `less`
    // @ts-expect-error bad types
    implementation.logger.removeListener(loggerListener);

    // @ts-expect-error we need it to reset loader context
    delete lessOptions.pluginManager.webpackLoaderContext;
    // @ts-expect-error we need it to reset loader context
    delete lessOptions.pluginManager;
  }

  // Ensure dependencies for any synchronously loaded resources (e.g.
  // `data-uri()`, `@plugin`) are tracked before the loader completes.
  await Promise.all(pendingDependencyTasks);
  const {
    css,
    imports
  } = result;
  for (const item of imports) {
    if ((0, _utils.isUnsupportedUrl)(item)) {
      continue;
    }

    // `less` return forward slashes on windows when `webpack` resolver return an absolute windows path in `WebpackFileManager`
    // Ref: https://github.com/webpack/less-loader/issues/357
    const normalizedItem = _nodePath.default.normalize(item);

    // Custom `importer` can return only `contents` so item will be relative
    if (_nodePath.default.isAbsolute(normalizedItem)) {
      this.addDependency(normalizedItem);
    }
  }
  let map = typeof result.map === "string" ? JSON.parse(result.map) : result.map;
  if (map && useSourceMap) {
    map = (0, _utils.normalizeSourceMap)(map);
  }
  callback(null, css, map);
}
var _default = exports.default = lessLoader;module.exports = exports.default;
module.exports.default = exports.default;
