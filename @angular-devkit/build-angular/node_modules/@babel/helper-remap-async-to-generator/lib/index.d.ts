import { NodePath, types } from '@babel/core';

declare function export_default(path: NodePath<types.Function>, helpers: {
    wrapAsync: types.Expression;
    wrapAwait?: types.Expression;
}, noNewArrows?: boolean, ignoreFunctionLength?: boolean): void;

export { export_default as default };
