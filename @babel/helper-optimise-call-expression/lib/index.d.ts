import { Expression, CallExpression, OptionalCallExpression } from '@babel/types';

/**
 * A helper function that generates a new call expression with given thisNode.
 It will also optimize `(...arguments)` to `.apply(arguments)`
 *
 * @export
 * @param {Expression} callee The callee of call expression
 * @param {Expression} thisNode The desired this of call expression
 * @param {Readonly<CallExpression["arguments"]>} args The arguments of call expression
 * @param {boolean} optional Whether the call expression is optional
 * @returns {CallExpression | OptionalCallExpression} The generated new call expression
 */
declare function optimiseCallExpression(callee: Expression, thisNode: Expression, args: Readonly<CallExpression["arguments"]>, optional: boolean): CallExpression | OptionalCallExpression;

export { optimiseCallExpression as default };
