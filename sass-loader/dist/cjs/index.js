"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeUrl = _interopRequireDefault(require("node:url"));
var _options = _interopRequireDefault(require("./options.json"));
var _utils = require("./utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/** @typedef {import("webpack").LoaderContext<LoaderOptions>} LoaderContext */
/** @typedef {import("schema-utils/declarations/validate").Schema} Schema */
/** @typedef {import("./utils.js").LoaderOptions} LoaderOptions */
/** @typedef {import("./utils.js").SassError} SassError */

/**
 * The sass-loader makes dart-sass and sass-embedded available to webpack modules.
 * @this {LoaderContext}
 * @param {string} content content
 * @returns {Promise<void>} loader result
 */
async function loader(content) {
  const options = this.getOptions(/** @type {Schema} */_options.default);
  const callback = this.async();
  let implementation;
  try {
    implementation = await (0, _utils.getSassImplementation)(options.implementation);
  } catch (error) {
    callback(/** @type {Error} */error);
    return;
  }
  const useSourceMap = typeof options.sourceMap === "boolean" ? options.sourceMap : this.sourceMap === true;
  const sassOptions = await (0, _utils.getSassOptions)(this, options, content, useSourceMap);
  const shouldUseWebpackImporter = typeof options.webpackImporter === "boolean" ? options.webpackImporter : true;
  if (shouldUseWebpackImporter) {
    sassOptions.importers.push((0, _utils.getModernWebpackImporter)(this));
  }
  let compile;
  try {
    compile = (0, _utils.getCompileFn)(this, implementation, options.api);
  } catch (error) {
    callback(/** @type {Error} */error);
    return;
  }
  let result;
  try {
    result = await compile(sassOptions);
  } catch (error) {
    const sassError = /** @type {SassError} */error;

    // There are situations when the `span.url` property does not exist
    if (sassError.span && typeof sassError.span.url !== "undefined") {
      this.addDependency(_nodeUrl.default.fileURLToPath(sassError.span.url));
    }
    callback((0, _utils.errorFactory)(sassError));
    return;
  }
  let map = result.sourceMap || undefined;

  // Modify source paths only for webpack, otherwise we do nothing
  if (map && useSourceMap) {
    map = (0, _utils.normalizeSourceMap)(map, this.rootContext);
  }
  if (typeof result.loadedUrls !== "undefined") {
    for (const includedFile of result.loadedUrls.filter(loadedUrl => loadedUrl.protocol === "file:")) {
      const normalizedIncludedFile = _nodeUrl.default.fileURLToPath(includedFile);

      // Custom `importer` can return only `contents` so includedFile will be relative
      if (_nodePath.default.isAbsolute(normalizedIncludedFile)) {
        this.addDependency(normalizedIncludedFile);
      }
    }
  }
  callback(null, result.css.toString(), map || undefined);
}
var _default = exports.default = loader;module.exports = exports.default;
module.exports.default = exports.default;
