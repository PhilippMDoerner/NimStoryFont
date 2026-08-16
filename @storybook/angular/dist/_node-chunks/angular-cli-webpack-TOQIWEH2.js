import CJS_COMPAT_NODE_URL_m3cx8917gnb from 'node:url';
import CJS_COMPAT_NODE_PATH_m3cx8917gnb from 'node:path';
import CJS_COMPAT_NODE_MODULE_m3cx8917gnb from "node:module";

var __filename = CJS_COMPAT_NODE_URL_m3cx8917gnb.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_m3cx8917gnb.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_m3cx8917gnb.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/server/angular-cli-webpack.js
import { createRequire } from "node:module";

// src/server/plugins/storybook-normalize-angular-entry-plugin.js
var PLUGIN_NAME = "storybook-normalize-angular-entry-plugin", StorybookNormalizeAngularEntryPlugin = class {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.environment.tap(PLUGIN_NAME, () => {
      let originalEntry = compiler.options.entry;
      compiler.options.entry = async () => {
        let entryResult;
        if (typeof originalEntry == "function")
          try {
            entryResult = await originalEntry();
          } catch (error) {
            throw console.error("Failed to execute the entry function:", error), error;
          }
        else
          entryResult = originalEntry;
        return entryResult && entryResult.main && entryResult.styles ? {
          main: {
            import: Array.from(
              /* @__PURE__ */ new Set([...entryResult.main.import, ...entryResult.styles.import])
            )
          }
        } : entryResult;
      };
    }), compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      this.compilation = compilation;
    });
  }
};

// src/server/utils/filter-out-styling-rules.ts
var isStylingRule = (rule) => {
  let { test } = rule;
  return !test || !(test instanceof RegExp) ? !1 : test.test(".css") || test.test(".scss") || test.test(".sass");
}, filterOutStylingRules = (config) => config.module.rules.filter((rule) => !isStylingRule(rule));

// src/server/angular-cli-webpack.js
var require2 = createRequire(import.meta.url), {
  generateI18nBrowserWebpackConfigFromContext
} = require2("@angular-devkit/build-angular/src/utils/webpack-browser-config"), TsconfigPathsPlugin = require2("tsconfig-paths-webpack-plugin"), {
  getCommonConfig,
  getStylesConfig,
  getDevServerConfig,
  getTypeScriptConfig
} = require2("@angular-devkit/build-angular/src/tools/webpack/configs"), getWebpackConfig = async (baseConfig, { builderOptions, builderContext }) => {
  async function getCustomStylesConfig(wco) {
    let { root } = wco;
    if ((() => {
      try {
        let output = import.meta.resolve("@tailwindcss/postcss", root);
        return isAbsolute(output);
      } catch {
        return !1;
      }
    })()) {
      let fs = require2("node:fs/promises"), originalReaddir = fs.readdir;
      fs.readdir = async function(path, options) {
        let results = await originalReaddir.call(this, path, options), tailwindFiles = [
          "tailwind.config.js",
          "tailwind.config.cjs",
          "tailwind.config.mjs",
          "tailwind.config.ts"
        ];
        return results.filter((file) => !tailwindFiles.includes(file));
      };
      let styleConfig = await getStylesConfig(wco);
      fs.readdir = originalReaddir;
      let tailwindPackage = await import(import.meta.resolve("@tailwindcss/postcss", root)), extraPostcssPlugins = [
        typeof tailwindPackage == "function" ? tailwindPackage() : tailwindPackage.default()
      ];
      return styleConfig.module.rules.map((rule) => rule.rules).forEach((rule) => {
        rule.forEach((r) => {
          r.oneOf?.forEach?.((oneOfRule) => oneOfRule.use.forEach((use) => {
            if (use.loader.includes("postcss-loader") && use.options.postcssOptions) {
              let originalOptionsFn = use.options.postcssOptions;
              use.options.postcssOptions = (loaderOptions) => {
                let originalOptions = originalOptionsFn(loaderOptions);
                return {
                  ...originalOptions,
                  plugins: [...originalOptions.plugins, ...extraPostcssPlugins]
                };
              };
            }
          }));
        });
      }), styleConfig;
    } else
      return getStylesConfig(wco);
  }
  let { config: cliConfig } = await generateI18nBrowserWebpackConfigFromContext(
    {
      // Default options
      index: "noop-index",
      main: "noop-main",
      // Options provided by user
      ...builderOptions,
      styles: builderOptions.styles?.map((style) => typeof style == "string" ? style : style.input).filter((style) => typeof style == "string" || style.inject !== !1),
      outputPath: typeof builderOptions.outputPath == "string" ? builderOptions.outputPath : builderOptions.outputPath?.base ?? "noop-out",
      // Fixed options
      optimization: !1,
      namedChunks: !1,
      progress: !1,
      buildOptimizer: !1,
      aot: !1
    },
    builderContext,
    (wco) => [
      getCommonConfig(wco),
      getCustomStylesConfig(wco),
      getTypeScriptConfig ? getTypeScriptConfig(wco) : getDevServerConfig(wco)
    ]
  );
  !builderOptions.experimentalZoneless && !cliConfig.entry.polyfills?.includes("zone.js") && (cliConfig.entry.polyfills ??= [], cliConfig.entry.polyfills.push("zone.js"));
  let entry = [
    ...cliConfig.entry.polyfills ?? [],
    ...baseConfig.entry,
    ...cliConfig.entry.styles ?? []
  ], rulesExcludingStyles = filterOutStylingRules(baseConfig), module = {
    ...baseConfig.module,
    rules: [...cliConfig.module.rules, ...rulesExcludingStyles]
  }, plugins = [
    ...cliConfig.plugins ?? [],
    ...baseConfig.plugins,
    new StorybookNormalizeAngularEntryPlugin()
  ], resolve = {
    ...baseConfig.resolve,
    modules: Array.from(/* @__PURE__ */ new Set([...baseConfig.resolve.modules, ...cliConfig.resolve.modules])),
    plugins: [
      new TsconfigPathsPlugin({
        configFile: builderOptions.tsConfig,
        mainFields: ["browser", "module", "main"]
      })
    ]
  };
  return {
    ...baseConfig,
    entry,
    module,
    plugins,
    resolve,
    resolveLoader: cliConfig.resolveLoader
  };
};
export {
  getWebpackConfig
};
