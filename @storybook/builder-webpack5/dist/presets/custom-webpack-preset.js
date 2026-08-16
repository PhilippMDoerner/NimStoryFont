import CJS_COMPAT_NODE_URL_a8prd92229n from 'node:url';
import CJS_COMPAT_NODE_PATH_a8prd92229n from 'node:path';
import CJS_COMPAT_NODE_MODULE_a8prd92229n from "node:module";

var __filename = CJS_COMPAT_NODE_URL_a8prd92229n.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_a8prd92229n.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_a8prd92229n.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  __require
} from "../_node-chunks/chunk-QYH4QKGX.js";

// src/presets/custom-webpack-preset.ts
import { fileURLToPath as fileURLToPath3 } from "node:url";
import { findConfigFile } from "storybook/internal/common";
import { logger as logger3 } from "storybook/internal/node-logger";
import { loadCustomWebpackConfig } from "@storybook/core-webpack";
import webpackModule from "webpack";

// src/plugins/webpack-inject-mocker-runtime-plugin.ts
import { getMockerRuntime } from "storybook/internal/mocking-utils";
var PLUGIN_NAME = "WebpackInjectMockerRuntimePlugin", WebpackInjectMockerRuntimePlugin = class {
  constructor() {
    this.cachedRuntime = null;
  }
  // We need to lazy-require HtmlWebpackPlugin because it's an optional peer dependency.
  getHtmlWebpackPlugin(compiler) {
    try {
      let constructor = compiler.options.plugins.find(
        (p) => p?.constructor?.name === "HtmlWebpackPlugin"
      )?.constructor;
      return constructor || __require("html-webpack-plugin");
    } catch {
      return compiler.getInfrastructureLogger(PLUGIN_NAME).warn("html-webpack-plugin is not installed. Cannot inject mocker runtime."), null;
    }
  }
  /**
   * The main entry point for the Webpack plugin.
   *
   * @param {Compiler} compiler The Webpack compiler instance.
   */
  apply(compiler) {
    let HtmlWebpackPlugin = this.getHtmlWebpackPlugin(compiler);
    HtmlWebpackPlugin && compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        PLUGIN_NAME,
        (data, cb) => {
          try {
            let runtimeScriptContent = this.cachedRuntime ?? (this.cachedRuntime = getMockerRuntime()), runtimeAssetName = "mocker-runtime-injected.js";
            compilation.getAsset(runtimeAssetName) || (compilation.emitAsset(
              runtimeAssetName,
              new compiler.webpack.sources.RawSource(runtimeScriptContent)
            ), data.assets.js.unshift(runtimeAssetName)), cb(null, data);
          } catch (error) {
            cb(error);
          }
        }
      );
    });
  }
};

// src/plugins/webpack-mock-plugin.ts
import { dirname, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import {
  babelParser,
  extractMockCalls,
  findMockRedirect,
  getIsExternal,
  resolveExternalModule,
  resolveWithExtensions
} from "storybook/internal/mocking-utils";
import { logger } from "storybook/internal/node-logger";
var PLUGIN_NAME2 = "storybook-mock-plugin", WebpackMockPlugin = class {
  constructor(options) {
    this.mockMap = /* @__PURE__ */ new Map();
    this.candidateSpecifiers = /* @__PURE__ */ new Set();
    if (!options.previewConfigPath)
      throw new Error(`[${PLUGIN_NAME2}] \`previewConfigPath\` is required.`);
    this.options = options;
  }
  /**
   * The main entry point for the Webpack plugin.
   *
   * @param {Compiler} compiler The Webpack compiler instance.
   */
  apply(compiler) {
    let updateMocks = () => {
      let mTimePreviewConfig = this.getPreviewConfigMtime(compiler);
      if (this.lastPreviewMtime && mTimePreviewConfig && mTimePreviewConfig <= this.lastPreviewMtime)
        return;
      let resolved = this.extractAndResolveMocks(compiler);
      this.mockMap = new Map(
        resolved.flatMap((mock) => [
          [mock.absolutePath, mock],
          [mock.absolutePath.replace(/\.[^.]+$/, ""), mock]
        ])
      ), this.candidateSpecifiers = new Set(resolved.map((m) => m.path)), this.lastPreviewMtime = mTimePreviewConfig, resolved.length > 0 && logger.info(`Mock map updated with ${resolved.length} mocks.`);
    };
    compiler.hooks.beforeRun.tap(PLUGIN_NAME2, updateMocks), compiler.hooks.watchRun.tap(PLUGIN_NAME2, updateMocks), new compiler.webpack.NormalModuleReplacementPlugin(/.*/, (resource) => {
      try {
        if (this.mockMap.size === 0)
          return;
        let path = resource.request, importer = resource.context, isExternal = getIsExternal(path, importer);
        if (isExternal && !this.candidateSpecifiers.has(path))
          return;
        let absolutePath = isExternal ? resolveExternalModule(path, importer) : resolveWithExtensions(path, importer);
        this.mockMap.has(absolutePath) && (resource.request = this.mockMap.get(absolutePath).replacementResource);
      } catch {
        logger.debug(`Could not resolve mock for "${resource.request}".`);
      }
    }).apply(compiler), compiler.hooks.afterCompile.tap(PLUGIN_NAME2, (compilation) => {
      compilation.fileDependencies.add(this.options.previewConfigPath);
      for (let mock of this.mockMap.values())
        isAbsolute(mock.replacementResource) && mock.replacementResource.includes("__mocks__") && compilation.contextDependencies.add(dirname(mock.replacementResource));
    });
  }
  getPreviewConfigMtime(compiler) {
    try {
      return compiler.inputFileSystem.statSync?.(this.options.previewConfigPath)?.mtime?.getTime?.();
    } catch {
      return;
    }
  }
  /**
   * Reads the preview config, parses it to find all `sb.mock()` calls, and resolves their
   * corresponding mock implementations.
   *
   * @param {Compiler} compiler The Webpack compiler instance.
   * @returns {ResolvedMock[]} An array of fully processed mocks.
   */
  extractAndResolveMocks(compiler) {
    let { previewConfigPath } = this.options, logger4 = compiler.getInfrastructureLogger(PLUGIN_NAME2), mocks = extractMockCalls(
      { previewConfigPath, configDir: dirname(previewConfigPath) },
      babelParser,
      compiler.context,
      findMockRedirect
    ), resolvedMocks = [];
    for (let mock of mocks)
      try {
        let { absolutePath, redirectPath } = mock, replacementResource;
        redirectPath ? replacementResource = redirectPath : replacementResource = `${fileURLToPath(
          import.meta.resolve("@storybook/builder-webpack5/loaders/webpack-automock-loader")
        )}?spy=${mock.spy}!${absolutePath}`, resolvedMocks.push({
          ...mock,
          replacementResource
        });
      } catch {
        logger4.warn(`Could not resolve mock for "${mock.path}". It will be ignored.`);
      }
    return resolvedMocks;
  }
};

// src/preview/base-webpack.config.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { logger as logger2 } from "storybook/internal/node-logger";
async function createDefaultWebpackConfig(storybookBaseConfig, options) {
  if (options.presetsList?.some(
    (preset) => /@storybook(\/|\\)preset-create-react-app/.test(
      typeof preset == "string" ? preset : preset.name
    )
  ))
    return storybookBaseConfig;
  let hasPostcssAddon = options.presetsList?.some(
    (preset) => /@storybook(\/|\\)addon-postcss/.test(typeof preset == "string" ? preset : preset.name)
  ), cssLoaders = {};
  hasPostcssAddon || (logger2.info("Using implicit CSS loaders"), cssLoaders = {
    test: /\.css$/,
    sideEffects: !0,
    use: [
      // TODO: Decide if we want to keep style-loader & css-loader in core
      // Trying to apply style-loader or css-loader to files that already have been
      // processed by them causes webpack to crash, so no one else can add similar
      // loader configurations to the `.css` extension.
      fileURLToPath2(import.meta.resolve("style-loader")),
      {
        loader: fileURLToPath2(import.meta.resolve("css-loader")),
        options: {
          importLoaders: 1
        }
      }
    ]
  });
  let isProd = storybookBaseConfig.mode !== "development";
  return {
    ...storybookBaseConfig,
    // TODO: Implement the clearing functionality of StyledConsoleLogger so that we can use it for webpack
    // The issue currently is that the status line is not cleared when the webpack compiler is run,
    // which causes the status line to be printed multiple times.
    // infrastructureLogging: {
    //   console: new StyledConsoleLogger({ prefix: 'Webpack', color: 'bgBlue' }),
    // },
    module: {
      ...storybookBaseConfig.module,
      rules: [
        ...storybookBaseConfig.module?.rules || [],
        cssLoaders,
        {
          test: /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
          type: "asset/resource",
          generator: {
            filename: isProd ? "static/media/[name].[contenthash:8][ext]" : "static/media/[path][name][ext]"
          }
        },
        {
          test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 1e4
            }
          },
          generator: {
            filename: isProd ? "static/media/[name].[contenthash:8][ext]" : "static/media/[path][name][ext]"
          }
        },
        {
          // any imports from './some-file.md?raw' will be imported as raw string
          // see https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
          // used to support import raw .md files in MDX
          resourceQuery: /raw/,
          type: "asset/source"
        }
      ]
    },
    resolve: {
      ...storybookBaseConfig.resolve,
      // see https://github.com/webpack/webpack/issues/17692#issuecomment-1866272674 for the docs
      conditionNames: [
        ...storybookBaseConfig.resolve?.conditionNames ?? [],
        "storybook",
        "stories",
        "test",
        "..."
      ],
      fallback: {
        crypto: !1,
        assert: !1,
        ...storybookBaseConfig.resolve?.fallback
      }
    }
  };
}

// src/presets/custom-webpack-preset.ts
var swc = (config, options) => {
  let shouldRemoveBugfixes = options.features && "babelRemoveBugfixes" in options.features && options.features.babelRemoveBugfixes, newConfig = {
    ...config,
    env: {
      ...config?.env ?? {},
      targets: config?.env?.targets ?? {
        chrome: 100,
        safari: 15,
        firefox: 91
      }
    }
  };
  return shouldRemoveBugfixes || (newConfig.env.bugfixes = config?.env?.bugfixes ?? !0), newConfig;
};
async function webpackFinal(config, options) {
  let previewConfigPath = findConfigFile("preview", options.configDir);
  return previewConfigPath && (config.plugins = config.plugins || [], config.module.rules.push({
    test: /preview\.(t|j)sx?$/,
    use: [
      {
        loader: fileURLToPath3(
          import.meta.resolve("@storybook/builder-webpack5/loaders/storybook-mock-transform-loader")
        )
      }
    ]
  }), config.plugins.push(new WebpackMockPlugin({ previewConfigPath })), config.plugins.push(new WebpackInjectMockerRuntimePlugin())), config;
}
async function webpack(config, options) {
  let { configDir, configType, presets } = options, coreOptions = await presets.apply("core"), defaultConfig = config;
  coreOptions?.disableWebpackDefaults || (defaultConfig = await createDefaultWebpackConfig(config, options));
  let finalDefaultConfig = await presets.apply("webpackFinal", defaultConfig, options), customConfig = await loadCustomWebpackConfig(configDir);
  return typeof customConfig == "function" ? (logger3.info("Loading custom Webpack config (full-control mode)."), customConfig({ config: finalDefaultConfig, mode: configType })) : (logger3.info("Using default Webpack5 setup"), finalDefaultConfig);
}
var webpackInstance = async () => webpackModule, webpackVersion = async () => "5";
export {
  swc,
  webpack,
  webpackFinal,
  webpackInstance,
  webpackVersion
};
