import CJS_COMPAT_NODE_URL_m3cx8917gnb from 'node:url';
import CJS_COMPAT_NODE_PATH_m3cx8917gnb from 'node:path';
import CJS_COMPAT_NODE_MODULE_m3cx8917gnb from "node:module";

var __filename = CJS_COMPAT_NODE_URL_m3cx8917gnb.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_m3cx8917gnb.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_m3cx8917gnb.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  up
} from "../_node-chunks/chunk-STYMOUJP.js";

// src/server/framework-preset-angular-cli.ts
import { logger } from "storybook/internal/node-logger";
import { AngularLegacyBuildOptionsError } from "storybook/internal/server-errors";
import { targetFromTargetString } from "@angular-devkit/architect";
import { logging } from "@angular-devkit/core";
import { getProjectRoot, resolvePackageDir } from "storybook/internal/common";

// ../../../node_modules/pathe/dist/shared/pathe.ff20891b.mjs
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  return input && input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
function cwd() {
  return typeof process < "u" && typeof process.cwd == "function" ? process.cwd().replace(/\\/g, "/") : "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "", resolvedAbsolute = !1;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    let path2 = index >= 0 ? arguments_[index] : cwd();
    !path2 || path2.length === 0 || (resolvedPath = `${path2}/${resolvedPath}`, resolvedAbsolute = isAbsolute(path2));
  }
  return resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute), resolvedAbsolute && !isAbsolute(resolvedPath) ? `/${resolvedPath}` : resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path2, allowAboveRoot) {
  let res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, char = null;
  for (let index = 0; index <= path2.length; ++index) {
    if (index < path2.length)
      char = path2[index];
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
        res.length > 0 ? res += `/${path2.slice(lastSlash + 1, index)}` : res = path2.slice(lastSlash + 1, index), lastSegmentLength = index - lastSlash - 1;
      lastSlash = index, dots = 0;
    } else char === "." && dots !== -1 ? ++dots : dots = -1;
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
var relative = function(from, to) {
  let _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/"), _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0])
    return _to.join("/");
  let _fromCopy = [..._from];
  for (let segment of _fromCopy) {
    if (_to[0] !== segment)
      break;
    _from.shift(), _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};

// src/server/framework-preset-angular-cli.ts
async function webpackFinal(baseConfig, options) {
  if (!resolvePackageDir("@angular-devkit/build-angular"))
    return logger.info('Using base config because "@angular-devkit/build-angular" is not installed'), baseConfig;
  let { WebpackDefinePlugin, WebpackIgnorePlugin } = await import("@storybook/builder-webpack5"), { getWebpackConfig: getCustomWebpackConfig } = await import("../_node-chunks/angular-cli-webpack-TOQIWEH2.js");
  checkForLegacyBuildOptions(options);
  let builderContext = getBuilderContext(options), builderOptions = await getBuilderOptions(options, builderContext), webpackConfig = await getCustomWebpackConfig(baseConfig, {
    builderOptions: {
      watch: options.configType === "DEVELOPMENT",
      ...builderOptions
    },
    builderContext
  });
  webpackConfig.plugins = webpackConfig.plugins ?? [];
  let miniCssPlugin = webpackConfig?.plugins?.find(
    (plugin) => plugin?.constructor?.name === "MiniCssExtractPlugin"
  );
  miniCssPlugin && "options" in miniCssPlugin && (miniCssPlugin.options.filename = "[name].[contenthash].css", miniCssPlugin.options.chunkFilename = "[name].iframe.[contenthash].css"), webpackConfig.plugins.push(
    new WebpackDefinePlugin({
      STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({
        experimentalZoneless: builderOptions.experimentalZoneless
      })
    })
  );
  try {
    resolvePackageDir("@angular/animations");
  } catch {
    webpackConfig.plugins.push(
      new WebpackIgnorePlugin({
        resourceRegExp: /@angular\/platform-browser\/animations$/
      })
    ), webpackConfig.plugins.push(
      new WebpackIgnorePlugin({
        resourceRegExp: /@angular\/animations\/browser$/
      })
    );
  }
  return webpackConfig;
}
function getBuilderContext(options) {
  return options.angularBuilderContext ?? {
    target: { project: "noop-project", builder: "", options: {} },
    workspaceRoot: process.cwd(),
    getProjectMetadata: () => ({}),
    getTargetOptions: () => ({}),
    logger: new logging.Logger("Storybook")
  };
}
function deepMerge(target, source) {
  let result = { ...target };
  for (let key in source)
    source[key] !== void 0 && source[key] !== null && (typeof source[key] == "object" && !Array.isArray(source[key]) && typeof target[key] == "object" && !Array.isArray(target[key]) && target[key] !== null ? result[key] = deepMerge(target[key], source[key]) : result[key] = source[key]);
  return result;
}
async function getBuilderOptions(options, builderContext) {
  let browserTargetOptions = {};
  if (options.angularBrowserTarget) {
    let browserTarget = targetFromTargetString(options.angularBrowserTarget);
    logger.info(
      `Using angular browser target options from "${browserTarget.project}:${browserTarget.target}${browserTarget.configuration ? `:${browserTarget.configuration}` : ""}"`
    ), browserTargetOptions = await builderContext.getTargetOptions(browserTarget);
  }
  let explicitAngularBuilderOptions = await builderContext.getTargetOptions(
    builderContext.target
  ), builderOptions = deepMerge(browserTargetOptions, explicitAngularBuilderOptions || {});
  return builderOptions.tsConfig = options.tsConfig ?? up("tsconfig.json", { cwd: options.configDir, last: getProjectRoot() }) ?? browserTargetOptions.tsConfig, logger.info(
    `Using angular project with "tsConfig:${relative(getProjectRoot(), builderOptions.tsConfig)}"`
  ), builderOptions.experimentalZoneless = options.angularBuilderOptions?.experimentalZoneless, builderOptions;
}
function checkForLegacyBuildOptions(options) {
  if (options.angularBrowserTarget === void 0)
    throw new AngularLegacyBuildOptionsError();
}
export {
  deepMerge,
  getBuilderOptions,
  webpackFinal
};
