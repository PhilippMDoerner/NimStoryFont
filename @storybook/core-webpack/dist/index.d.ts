import { BuilderResult, NormalizedStoriesSpecifier, Options, Options as Options$1, Preset, StorybookConfig as StorybookConfig$1, TypescriptOptions } from "storybook/internal/types";

//#region code/lib/core-webpack/.dts-emit/code/lib/core-webpack/src/types.d.ts
type RulesConfig = any;
type ModuleConfig = {
  rules?: RulesConfig[];
};
type ResolveConfig = {
  extensions?: string[];
  mainFields?: (string | string[])[] | undefined;
  alias?: any;
};
interface WebpackConfiguration {
  plugins?: any[];
  module?: ModuleConfig;
  resolve?: ResolveConfig;
  optimization?: any;
  devtool?: false | string | {
    type: 'all' | 'javascript' | 'css';
    use: any;
  }[];
}
type BuilderOptions = {
  fsCache?: boolean;
  lazyCompilation?: boolean;
};
type StorybookConfig<TWebpackConfiguration = WebpackConfiguration> = StorybookConfig$1 & {
  /**
   * Modify or return a custom Webpack config after the Storybook's default configuration has run
   * (mostly used by addons).
   */
  webpack?: (config: TWebpackConfiguration, options: Options$1) => TWebpackConfiguration | Promise<TWebpackConfiguration>; /** Modify or return a custom Webpack config after every addon has run. */
  webpackFinal?: (config: TWebpackConfiguration, options: Options$1) => TWebpackConfiguration | Promise<TWebpackConfiguration>;
};
//#endregion
//#region code/lib/core-webpack/.dts-emit/code/lib/core-webpack/src/load-custom-webpack-config.d.ts
declare const loadCustomWebpackConfig: (configDir: string) => Promise<any>;
//#endregion
//#region code/lib/core-webpack/.dts-emit/code/lib/core-webpack/src/check-webpack-version.d.ts
declare const checkWebpackVersion: (webpack: {
  version?: string;
}, specifier: string, caption: string) => void;
//#endregion
//#region code/lib/core-webpack/.dts-emit/code/lib/core-webpack/src/merge-webpack-config.d.ts
declare function mergeConfigs(config: WebpackConfiguration, customConfig: WebpackConfiguration): WebpackConfiguration;
//#endregion
//#region code/lib/core-webpack/.dts-emit/code/lib/core-webpack/src/to-importFn.d.ts
declare function webpackIncludeRegexp(specifier: NormalizedStoriesSpecifier): RegExp;
declare function toImportFnPart(specifier: NormalizedStoriesSpecifier): string;
declare function toImportFn(stories: NormalizedStoriesSpecifier[], {
  needPipelinedImport
}?: {
  needPipelinedImport?: boolean;
}): string;
//#endregion
//#region code/lib/core-webpack/.dts-emit/code/lib/core-webpack/src/to-require-context.d.ts
declare const toRequireContext: (specifier: NormalizedStoriesSpecifier) => {
  path: string;
  recursive: boolean;
  match: RegExp;
};
declare const toRequireContextString: (specifier: NormalizedStoriesSpecifier) => string;
//#endregion
export { BuilderOptions, type BuilderResult, ModuleConfig, type Options, type Preset, ResolveConfig, RulesConfig, StorybookConfig, type TypescriptOptions, WebpackConfiguration, checkWebpackVersion, loadCustomWebpackConfig, mergeConfigs, toImportFn, toImportFnPart, toRequireContext, toRequireContextString, webpackIncludeRegexp };