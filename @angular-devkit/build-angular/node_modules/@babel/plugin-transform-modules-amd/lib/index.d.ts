import * as _babel_core from '@babel/core';
import { types, PluginPass } from '@babel/core';
import { PluginOptions, RewriteModuleStatementsAndPrepareHeaderOptions } from '@babel/helper-module-transforms';

interface Options extends PluginOptions {
    allowTopLevelThis?: boolean;
    importInterop?: RewriteModuleStatementsAndPrepareHeaderOptions["importInterop"];
    /** @deprecated Use the `constantReexports` and `enumerableModuleMeta` assumptions instead. */
    loose?: boolean;
    noInterop?: boolean;
    strict?: boolean;
    strictMode?: boolean;
}
type State = {
    requireId?: types.Identifier;
    resolveId?: types.Identifier;
    rejectId?: types.Identifier;
};
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<State & PluginPass<object>>;

export { type Options, _default as default };
