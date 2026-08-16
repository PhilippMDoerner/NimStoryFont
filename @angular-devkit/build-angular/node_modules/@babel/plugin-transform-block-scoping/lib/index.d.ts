import * as _babel_core from '@babel/core';
import { PluginPass, Scope } from '@babel/core';

interface Options {
    tdz?: boolean;
    throwIfClosureRequired?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & PluginPass<object>>;

declare function isVarScope(scope: Scope): boolean;

export { type Options, _default as default, isVarScope };
