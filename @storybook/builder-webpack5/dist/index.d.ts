import { Builder, Options } from "storybook/internal/types";
import webpackModule, { Configuration, Stats } from "webpack";
import { BuilderResult as BuilderResult$1, Options as Options$1, StorybookConfig, TypescriptOptions as TypescriptOptions$1 } from "@storybook/core-webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

//#region code/builders/builder-webpack5/.dts-emit/code/builders/builder-webpack5/src/types.d.ts
type TypeScriptOptionsBase = Partial<TypescriptOptions$1>;
/** Options for TypeScript usage within Storybook. */
interface TypescriptOptions extends TypeScriptOptionsBase {
  /** Configures `fork-ts-checker-webpack-plugin` */
  checkOptions?: ConstructorParameters<typeof ForkTsCheckerWebpackPlugin>[0];
}
interface StorybookConfigWebpack extends Omit<StorybookConfig, 'webpack' | 'webpackFinal' | 'features'> {
  /**
   * Modify or return a custom Webpack config after the Storybook's default configuration has run
   * (mostly used by addons).
   */
  webpack?: (config: Configuration, options: Options$1) => Configuration | Promise<Configuration>;
  /** Modify or return a custom Webpack config after every addon has run. */
  webpackFinal?: (config: Configuration, options: Options$1) => Configuration | Promise<Configuration>;
  features?: StorybookConfig['features'] & {
    /**
     * Enable the experimental `.test` function in CSF Next
     *
     * @see https://storybook.js.org/docs/api/main-config/main-config-features#experimentaltestsyntax
     */
    experimentalTestSyntax?: boolean;
    /**
     * Remove the `bugfixes` option from `@babel/preset-env`. This is required when using Babel 8 and when
     * Storybook fails to detect your Babel version.
     * @default false
     */
    babelRemoveBugfixes?: boolean;
  };
}
type BuilderOptions = {
  fsCache?: boolean;
  lazyCompilation?: boolean;
};
interface BuilderResult extends BuilderResult$1 {
  stats?: Stats;
}
//#endregion
//#region code/builders/builder-webpack5/.dts-emit/code/builders/builder-webpack5/src/preview/virtual-module-mapping.d.ts
declare const getVirtualModules: (options: Options) => Promise<{
  virtualModules: Record<string, string>;
  entries: string[];
}>;
//#endregion
//#region code/builders/builder-webpack5/.dts-emit/code/builders/builder-webpack5/src/index.d.ts
declare const WebpackDefinePlugin: typeof webpackModule.DefinePlugin;
declare const WebpackIgnorePlugin: typeof webpackModule.IgnorePlugin;
declare const printDuration: (startTime: [number, number]) => string;
type WebpackBuilder = Builder<Configuration, Stats>;
type BuilderStartOptions = Parameters<WebpackBuilder['start']>['0'];
declare const executor: {
  get: (options: Options) => Promise<typeof webpackModule>;
};
declare const getConfig: WebpackBuilder['getConfig'];
declare const bail: WebpackBuilder['bail'];
/**
 * Returns a {@link ChangeDetectionAdapter} bound to the webpack compiler created by `start()`.
 *
 * Throws if called before `start()` has resolved (i.e. before the compiler exists).
 */
declare const changeDetectionAdapter: NonNullable<WebpackBuilder['changeDetectionAdapter']>;
declare const start: (options: BuilderStartOptions) => Promise<void | {
  stats?: Stats | undefined;
  totalTime: ReturnType<typeof process.hrtime>;
  bail: (e?: Error) => Promise<void>;
}>;
declare const build: (options: BuilderStartOptions) => Promise<void | Stats>;
declare const corePresets: string[];
declare const overridePresets: string[];
//#endregion
export { BuilderOptions, BuilderResult, StorybookConfigWebpack, TypescriptOptions, WebpackDefinePlugin, WebpackIgnorePlugin, bail, build, changeDetectionAdapter, corePresets, executor, getConfig, getVirtualModules, overridePresets, printDuration, start };