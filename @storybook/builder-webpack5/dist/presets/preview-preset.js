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
  getVirtualModules
} from "../_node-chunks/chunk-JWA5HLRN.js";
import "../_node-chunks/chunk-QYH4QKGX.js";

// src/presets/preview-preset.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";

// src/preview/iframe-webpack.config.ts
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getBuilderOptions,
  isPreservingSymlinks,
  normalizeStories,
  stringifyProcessEnvs
} from "storybook/internal/common";
import { globalsNameReferenceMap } from "storybook/internal/preview/globals";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import { dedent } from "ts-dedent";
import webpackModule from "webpack";
import VirtualModulePlugin from "webpack-virtual-modules";
var { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin } = webpackModule, iframe_webpack_config_default = async (options) => {
  let {
    outputDir = join(".", "public"),
    quiet,
    packageJson,
    configType,
    presets,
    previewUrl,
    typescriptOptions,
    features
  } = options, isProd = configType === "PRODUCTION", workingDir = process.cwd(), [
    coreOptions,
    frameworkOptions,
    envs,
    logLevel,
    headHtmlSnippet,
    bodyHtmlSnippet,
    template,
    docsOptions,
    entries2,
    nonNormalizedStories,
    modulesCount,
    build,
    tagsOptions
  ] = await Promise.all([
    presets.apply("core"),
    presets.apply("frameworkOptions"),
    presets.apply("env"),
    presets.apply("logLevel", void 0),
    presets.apply("previewHead"),
    presets.apply("previewBody"),
    presets.apply("previewMainTemplate"),
    presets.apply("docs"),
    presets.apply("entries", []),
    presets.apply("stories", []),
    options.cache?.get("modulesCount", 1e3),
    options.presets.apply("build"),
    presets.apply("tags", {})
  ]), stories = normalizeStories(nonNormalizedStories, {
    configDir: options.configDir,
    workingDir
  }), builderOptions = await getBuilderOptions(options), shouldCheckTs = typescriptOptions.check && !typescriptOptions.skipCompiler, tsCheckOptions = typescriptOptions.checkOptions || {}, cacheConfig = builderOptions.fsCache ? { cache: { type: "filesystem" } } : {}, lazyCompilationConfig = builderOptions.lazyCompilation && !isProd ? {
    lazyCompilation: { entries: !1 }
  } : {};
  if (!template)
    throw new Error(dedent`
      Storybook's Webpack5 builder requires a template to be specified.
      Somehow you've ended up with a falsy value for the template option.

      Please file an issue at https://github.com/storybookjs/storybook with a reproduction.
    `);
  let externals = globalsNameReferenceMap;
  build?.test?.disableBlocks && (externals["@storybook/addon-docs/blocks"] = "__STORYBOOK_BLOCKS_EMPTY_MODULE__");
  let { virtualModules: virtualModuleMapping, entries: dynamicEntries } = await getVirtualModules(options);
  return {
    name: "preview",
    mode: isProd ? "production" : "development",
    bail: isProd,
    devtool: options.build?.test?.disableSourcemaps ? !1 : "cheap-module-source-map",
    entry: [...entries2 ?? [], ...dynamicEntries],
    output: {
      path: resolve(process.cwd(), outputDir),
      filename: isProd ? "[name].[contenthash:8].iframe.bundle.js" : "[name].iframe.bundle.js",
      publicPath: ""
    },
    stats: {
      preset: "none",
      logging: "error"
    },
    watchOptions: {
      ignored: /node_modules/
    },
    externals,
    ignoreWarnings: [
      {
        message: /export '\S+' was not found in 'global'/
      },
      {
        message: /export '\S+' was not found in '@storybook\/global'/
      }
    ],
    plugins: [
      Object.keys(virtualModuleMapping).length > 0 ? new VirtualModulePlugin(virtualModuleMapping) : null,
      new HtmlWebpackPlugin({
        filename: "iframe.html",
        // FIXME: `none` isn't a known option
        chunksSortMode: "none",
        alwaysWriteToDisk: !0,
        inject: !1,
        template,
        templateParameters: {
          version: packageJson?.version,
          globals: {
            CONFIG_TYPE: configType,
            LOGLEVEL: logLevel,
            FRAMEWORK_OPTIONS: frameworkOptions,
            CHANNEL_OPTIONS: coreOptions.channelOptions,
            FEATURES: features,
            PREVIEW_URL: previewUrl,
            STORIES: stories.map((specifier) => ({
              ...specifier,
              importPathMatcher: specifier.importPathMatcher.source
            })),
            DOCS_OPTIONS: docsOptions,
            TAGS_OPTIONS: tagsOptions,
            ...build?.test?.disableBlocks ? { __STORYBOOK_BLOCKS_EMPTY_MODULE__: {} } : {}
          },
          headHtmlSnippet,
          bodyHtmlSnippet
        },
        minify: {
          collapseWhitespace: !0,
          removeComments: !0,
          removeRedundantAttributes: !0,
          removeScriptTypeAttributes: !1,
          removeStyleLinkTypeAttributes: !0,
          useShortDoctype: !0
        }
      }),
      new DefinePlugin({
        "process.env": `(${JSON.stringify(envs)})`,
        ...stringifyProcessEnvs(envs),
        NODE_ENV: JSON.stringify(
          features?.developmentModeForBuild && isProd ? "development" : process.env.NODE_ENV
        )
      }),
      isProd ? null : new HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      quiet ? null : new ProgressPlugin({ modulesCount }),
      shouldCheckTs ? new ForkTsCheckerWebpackPlugin(tsCheckOptions) : null
    ].filter(Boolean),
    module: {
      // Disable warning for dynamic requires
      unknownContextCritical: !1,
      rules: [
        {
          test: /\.stories\.([tj])sx?$|(stories|story)\.mdx$/,
          exclude: /node_modules/,
          enforce: "post",
          use: [
            {
              loader: fileURLToPath(
                import.meta.resolve("@storybook/builder-webpack5/loaders/export-order-loader")
              )
            }
          ]
        },
        {
          test: /\.m?js$/,
          type: "javascript/auto"
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: !1
          }
        },
        {
          test: /\.md$/,
          type: "asset/source"
        }
      ]
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json", ".cjs"],
      modules: ["node_modules"].concat(envs.NODE_PATH || []),
      mainFields: ["browser", "module", "main"].filter(Boolean),
      // Set webpack to resolve symlinks based on whether the user has asked node to.
      // This feels like it should be default out-of-the-box in webpack :shrug:
      symlinks: !isPreservingSymlinks()
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      },
      runtimeChunk: !0,
      sideEffects: !0,
      usedExports: options.build?.test?.disableTreeShaking ? !1 : isProd,
      moduleIds: "named",
      ...isProd ? {
        minimize: !0,
        minimizer: options.build?.test?.esbuildMinify ? [
          new TerserWebpackPlugin({
            parallel: !0,
            minify: TerserWebpackPlugin.esbuildMinify,
            terserOptions: {
              sourcemap: !options.build?.test?.disableSourcemaps,
              treeShaking: !options.build?.test?.disableTreeShaking
            }
          })
        ] : [
          new TerserWebpackPlugin({
            parallel: !0,
            terserOptions: {
              sourceMap: !options.build?.test?.disableSourcemaps,
              mangle: !1,
              keep_fnames: !0
            }
          })
        ]
      } : {}
    },
    performance: {
      hints: isProd ? "warning" : !1
    },
    ...cacheConfig,
    experiments: { ...lazyCompilationConfig }
  };
};

// src/presets/preview-preset.ts
var webpack = async (_, options) => iframe_webpack_config_default(options), entries = async (_, options) => {
  let result = [];
  return options.configType === "DEVELOPMENT" && (result = result.concat(
    `${fileURLToPath2(
      import.meta.resolve("webpack-hot-middleware/client.js")
    )}?reload=true&quiet=false&overlay=${JSON.stringify({
      errors: !0,
      warnings: !1,
      runtimeErrors: !1
    })}&noInfo=${options.quiet}`
  )), result;
}, previewMainTemplate = () => fileURLToPath2(import.meta.resolve("@storybook/builder-webpack5/templates/preview.ejs"));
export {
  entries,
  previewMainTemplate,
  webpack
};
