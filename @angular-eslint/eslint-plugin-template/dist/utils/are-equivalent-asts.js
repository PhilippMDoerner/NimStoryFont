"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areEquivalentASTs = areEquivalentASTs;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
function areEquivalentASTs(a, b) {
    // An `ImplicitReceiver` is equivalent to a `ThisReceiver` because
    // `this.foo` and `foo` mean the same thing. In Angular v21.1.0+,
    // `ThisReceiver` is a separate class, so we check for both types.
    if (a instanceof bundled_angular_compiler_1.ImplicitReceiver || a instanceof bundled_angular_compiler_1.ThisReceiver) {
        return b instanceof bundled_angular_compiler_1.ImplicitReceiver || b instanceof bundled_angular_compiler_1.ThisReceiver;
    }
    // Bail out if the two ASTs are not the same type.
    if (a.constructor !== b.constructor) {
        return false;
    }
    // Check reads and calls first, because
    // they are probably the most common type.
    if (a instanceof bundled_angular_compiler_1.PropertyRead && b instanceof bundled_angular_compiler_1.PropertyRead) {
        return a.name === b.name && areEquivalentASTs(a.receiver, b.receiver);
    }
    if (a instanceof bundled_angular_compiler_1.SafePropertyRead && b instanceof bundled_angular_compiler_1.SafePropertyRead) {
        return a.name === b.name && areEquivalentASTs(a.receiver, b.receiver);
    }
    if (a instanceof bundled_angular_compiler_1.Call && b instanceof bundled_angular_compiler_1.Call) {
        return (areEquivalentASTArrays(a.args, b.args) &&
            areEquivalentASTs(a.receiver, b.receiver));
    }
    if (a instanceof bundled_angular_compiler_1.SafeCall && b instanceof bundled_angular_compiler_1.SafeCall) {
        return (areEquivalentASTArrays(a.args, b.args) &&
            areEquivalentASTs(a.receiver, b.receiver));
    }
    if (a instanceof bundled_angular_compiler_1.KeyedRead && b instanceof bundled_angular_compiler_1.KeyedRead) {
        return (areEquivalentASTs(a.key, b.key) &&
            areEquivalentASTs(a.receiver, b.receiver));
    }
    if (a instanceof bundled_angular_compiler_1.SafeKeyedRead && b instanceof bundled_angular_compiler_1.SafeKeyedRead) {
        return (areEquivalentASTs(a.key, b.key) &&
            areEquivalentASTs(a.receiver, b.receiver));
    }
    if (a instanceof bundled_angular_compiler_1.NonNullAssert && b instanceof bundled_angular_compiler_1.NonNullAssert) {
        return areEquivalentASTs(a.expression, b.expression);
    }
    // Expressions used as conditions can come next.
    if (a instanceof bundled_angular_compiler_1.PrefixNot && b instanceof bundled_angular_compiler_1.PrefixNot) {
        return areEquivalentASTs(a.expression, b.expression);
    }
    // Unary extends Binary, so we need to check `Unary`
    // first, otherwise we will treat it as a `Binary`.
    if (a instanceof bundled_angular_compiler_1.Unary && b instanceof bundled_angular_compiler_1.Unary) {
        return a.operator === b.operator && areEquivalentASTs(a.expr, b.expr);
    }
    if (a instanceof bundled_angular_compiler_1.Binary && b instanceof bundled_angular_compiler_1.Binary) {
        return (a.operation === b.operation &&
            areEquivalentASTs(a.left, b.left) &&
            areEquivalentASTs(a.right, b.right));
    }
    if (a instanceof bundled_angular_compiler_1.Conditional && b instanceof bundled_angular_compiler_1.Conditional) {
        return (areEquivalentASTs(a.condition, b.condition) &&
            areEquivalentASTs(a.trueExp, b.trueExp) &&
            areEquivalentASTs(a.falseExp, b.falseExp));
    }
    // Literals can be checked next.
    if (a instanceof bundled_angular_compiler_1.LiteralPrimitive && b instanceof bundled_angular_compiler_1.LiteralPrimitive) {
        return a.value === b.value;
    }
    if (a instanceof bundled_angular_compiler_1.LiteralArray && b instanceof bundled_angular_compiler_1.LiteralArray) {
        return areEquivalentASTArrays(a.expressions, b.expressions);
    }
    if (a instanceof bundled_angular_compiler_1.LiteralMap && b instanceof bundled_angular_compiler_1.LiteralMap) {
        return (a.keys.length === b.keys.length &&
            // Only check that the keys are equivalent. We don't need to check
            // the `quoted` property because a quoted key with the same value as
            // an unquoted key is the same key. Likewise, the `isShorthandInitialized`
            // property doesn't affect the name of the key.
            a.keys.every((aKey, index) => {
                const bKey = b.keys[index];
                // Handle spread keys - they match if both are spread keys
                if (aKey.kind === 'spread' && bKey.kind === 'spread') {
                    return true;
                }
                // If one is spread and the other isn't, they don't match
                if (aKey.kind !== bKey.kind) {
                    return false;
                }
                // Both are property keys, compare the key values
                return (aKey.kind === 'property' &&
                    bKey.kind === 'property' &&
                    aKey.key === bKey.key);
            }) &&
            areEquivalentASTArrays(a.values, b.values));
    }
    // Pipes and interpolations are next.
    if (a instanceof bundled_angular_compiler_1.BindingPipe && b instanceof bundled_angular_compiler_1.BindingPipe) {
        return (a.name === b.name &&
            areEquivalentASTs(a.exp, b.exp) &&
            areEquivalentASTArrays(a.args, b.args));
    }
    if (a instanceof bundled_angular_compiler_1.Interpolation && b instanceof bundled_angular_compiler_1.Interpolation) {
        return (a.strings.length === b.strings.length &&
            a.strings.every((aString, index) => aString === b.strings[index]) &&
            areEquivalentASTArrays(a.expressions, b.expressions));
    }
    // Miscellaneous things and writes can be checked next.
    if (a instanceof bundled_angular_compiler_1.ASTWithSource && b instanceof bundled_angular_compiler_1.ASTWithSource) {
        return areEquivalentASTs(a.ast, b.ast);
    }
    if (a instanceof bundled_angular_compiler_1.Chain && b instanceof bundled_angular_compiler_1.Chain) {
        return areEquivalentASTArrays(a.expressions, b.expressions);
    }
    if (a instanceof bundled_angular_compiler_1.TypeofExpression && b instanceof bundled_angular_compiler_1.TypeofExpression) {
        return areEquivalentASTs(a.expression, b.expression);
    }
    return false;
}
function areEquivalentASTArrays(a, b) {
    return (a.length === b.length &&
        a.every((aElement, index) => areEquivalentASTs(aElement, b[index])));
}
