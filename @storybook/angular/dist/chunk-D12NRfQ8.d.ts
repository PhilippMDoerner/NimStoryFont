import { CompatibleString, Options, StorybookConfig, TypescriptOptions as TypescriptOptions$1 } from "storybook/internal/types";
import { BuilderOptions, StorybookConfigWebpack, TypescriptOptions } from "@storybook/builder-webpack5";

//#region code/lib/core-webpack/dist/index.d.ts
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
type StorybookConfig$2<TWebpackConfiguration = WebpackConfiguration> = StorybookConfig & {
  /**
   * Modify or return a custom Webpack config after the Storybook's default configuration has run
   * (mostly used by addons).
   */
  webpack?: (config: TWebpackConfiguration, options: Options) => TWebpackConfiguration | Promise<TWebpackConfiguration>; /** Modify or return a custom Webpack config after every addon has run. */
  webpackFinal?: (config: TWebpackConfiguration, options: Options) => TWebpackConfiguration | Promise<TWebpackConfiguration>;
}; //#endregion
//#region code/lib/core-webpack/.dts-emit/code/lib/core-webpack/src/load-custom-webpack-config.d.ts
//#endregion
//#region code/frameworks/angular/.dts-emit/code/frameworks/angular/src/types.d.ts
type FrameworkName = CompatibleString<'@storybook/angular'>;
type BuilderName = CompatibleString<'@storybook/builder-webpack5'>;
type FrameworkOptions = AngularOptions & {
  builder?: BuilderOptions;
};
type StorybookConfigFramework = {
  framework: FrameworkName | {
    name: FrameworkName;
    options: FrameworkOptions;
  };
  core?: StorybookConfig$2['core'] & {
    builder?: BuilderName | {
      name: BuilderName;
      options: BuilderOptions;
    };
  };
  typescript?: Partial<TypescriptOptions & TypescriptOptions$1> & StorybookConfig$2['typescript'];
};
/** The interface for Storybook configuration in `main.ts` files. */
type StorybookConfig$1 = Omit<StorybookConfig$2, keyof StorybookConfigWebpack | keyof StorybookConfigFramework> & StorybookConfigWebpack & StorybookConfigFramework;
interface AngularOptions {
  enableIvy?: boolean;
}
//#endregion
export { FrameworkOptions as n, StorybookConfig$1 as r, AngularOptions as t };