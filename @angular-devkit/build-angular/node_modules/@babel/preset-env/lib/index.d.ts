import * as _babel_core from '@babel/core';
import { PresetAPI } from '@babel/core';
import { InputTargets, Targets } from '@babel/helper-compilation-targets';

declare const ModulesOption: {
    readonly false: false;
    readonly auto: "auto";
    readonly amd: "amd";
    readonly commonjs: "commonjs";
    readonly cjs: "cjs";
    readonly systemjs: "systemjs";
    readonly umd: "umd";
};

// Options
// Use explicit modules to prevent typo errors.
type ModuleOption = (typeof ModulesOption)[keyof typeof ModulesOption];

type PluginListItem = string | RegExp;
type PluginListOption = PluginListItem[];

type Options = {
  configPath?: string;
  debug?: boolean;
  exclude?: PluginListOption;
  forceAllTransforms?: boolean;
  ignoreBrowserslistConfig?: boolean;
  include?: PluginListOption;
  modules?: ModuleOption;
  shippedProposals?: boolean;
  targets?: {
    esmodules?: boolean;
  } & InputTargets;
  browserslistEnv?: string;
};

/**
 * @deprecated Use `isRequired` from `@babel/helper-compilation-targets` instead.
 */
declare function isPluginRequired(targets: Targets, support: Targets): void;
declare const transformIncludesAndExcludes: (opts: string[]) => any;
declare const _default: (api: PresetAPI, options: Options, dirname: string) => _babel_core.PresetObject;

export { type Options, _default as default, isPluginRequired, transformIncludesAndExcludes };
