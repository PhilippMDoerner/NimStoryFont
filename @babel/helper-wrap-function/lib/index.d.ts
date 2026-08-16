import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

declare function wrapFunction(path: NodePath<t.Function>, callId: t.Expression, noNewArrows?: boolean, ignoreFunctionLength?: boolean): void;

export { wrapFunction as default };
