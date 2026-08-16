import * as _babel_core from '@babel/core';
import { NodePath, types } from '@babel/core';

interface OptionalChainAssumptions {
    pureGetters: boolean;
    noDocumentAll: boolean;
}
declare function transformOptionalChain(path: NodePath<types.OptionalCallExpression | types.OptionalMemberExpression>, { pureGetters, noDocumentAll }: OptionalChainAssumptions, replacementPath: NodePath<types.Expression>, ifNullish: types.Expression, wrapLast?: (value: types.Expression) => types.Expression): void;
declare function transform(path: NodePath<types.OptionalCallExpression | types.OptionalMemberExpression>, assumptions: OptionalChainAssumptions): void;

interface Options {
    /** @deprecated Use the `noDocumentAll` and `pureGetters` assumptions instead. */
    loose?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<_babel_core.PluginPass<object>>;

export { type Options, _default as default, transform, transformOptionalChain };
