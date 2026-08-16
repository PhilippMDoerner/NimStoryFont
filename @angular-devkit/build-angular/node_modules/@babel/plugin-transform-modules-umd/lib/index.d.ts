import * as _babel_core from '@babel/core';
import { PluginOptions, RewriteModuleStatementsAndPrepareHeaderOptions } from '@babel/helper-module-transforms';

interface Options extends PluginOptions {
    allowTopLevelThis?: boolean;
    exactGlobals?: boolean;
    globals?: Record<string, string>;
    importInterop?: RewriteModuleStatementsAndPrepareHeaderOptions["importInterop"];
    /** @deprecated Use the `constantReexports` and `enumerableModuleMeta` assumptions instead. */
    loose?: boolean;
    noInterop?: boolean;
    strict?: boolean;
    strictMode?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & _babel_core.PluginPass<object>>;

export { type Options, _default as default };
