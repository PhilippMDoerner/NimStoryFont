import * as _babel_core from '@babel/core';
import { types, Scope, File, NodePath } from '@babel/core';

declare function unshiftForXStatementBody(statementPath: NodePath<types.ForXStatement>, newStatements: types.Statement[]): void;
interface ExcludingKey {
    key: types.Expression | types.PrivateName;
    computed: boolean;
}
declare function buildObjectExcludingKeys<T extends ExcludingKey>(excludedKeys: T[], objRef: types.Expression, scope: Scope, addHelper: File["addHelper"], objectRestNoSymbols: boolean, useBuiltIns: boolean): types.CallExpression;

interface Options {
    allowArrayLike?: boolean;
    /** @deprecated Use the `iterableIsArray` and `objectRestNoSymbols` assumptions instead. */
    loose?: boolean;
    useBuiltIns?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & _babel_core.PluginPass<object>>;

export { type Options, buildObjectExcludingKeys, _default as default, unshiftForXStatementBody };
