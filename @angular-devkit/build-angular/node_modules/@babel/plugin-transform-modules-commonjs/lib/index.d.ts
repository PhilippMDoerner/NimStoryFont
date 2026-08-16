import * as _babel_core from '@babel/core';
import { File, types, PluginPass } from '@babel/core';
import { isSideEffectImport, PluginOptions, RewriteModuleStatementsAndPrepareHeaderOptions } from '@babel/helper-module-transforms';

type SourceMetadata = Parameters<typeof isSideEffectImport>[0];
interface CommonJSHook {
    name: string;
    version: string;
    wrapReference?(ref: types.Expression, payload: unknown): types.CallExpression | null;
    buildRequireWrapper?(name: string, init: types.Expression, payload: unknown, referenced: boolean): types.Statement | false | null;
    getWrapperPayload?(source: string, metadata: SourceMetadata, importNodes: types.Node[]): string | null;
}
declare function defineCommonJSHook(file: File, hook: CommonJSHook): void;

interface Options extends PluginOptions {
    allowCommonJSExports?: boolean;
    allowTopLevelThis?: boolean;
    importInterop?: RewriteModuleStatementsAndPrepareHeaderOptions["importInterop"];
    lazy?: RewriteModuleStatementsAndPrepareHeaderOptions["lazy"];
    /** @deprecated Use the `constantReexports` and `enumerableModuleMeta` assumptions instead. */
    loose?: boolean;
    mjsStrictNamespace?: boolean;
    noInterop?: boolean;
    strict?: boolean;
    strictMode?: boolean;
    strictNamespace?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & PluginPass<object>>;

export { type Options, _default as default, defineCommonJSHook };
