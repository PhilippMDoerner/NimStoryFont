import * as _babel_core from '@babel/core';
import { NodePath, types } from '@babel/core';

declare function convertFunctionParams(path: NodePath<types.Function>, ignoreFunctionLength: boolean | void, shouldTransformParam?: (index: number) => boolean, replaceRestElement?: (path: NodePath<types.Function>, paramPath: NodePath<types.Function["params"][number]>, transformedRestNodes: types.Statement[]) => void): boolean;

interface Options {
    /** @deprecated Use the `ignoreFunctionLength` assumption instead. */
    loose?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & _babel_core.PluginPass<object>>;

export { type Options, convertFunctionParams, _default as default };
