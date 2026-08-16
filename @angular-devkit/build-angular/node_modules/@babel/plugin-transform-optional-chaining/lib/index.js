import { declare } from '@babel/helper-plugin-utils';
import { template, types } from '@babel/core';
import { isTransparentExprWrapper, skipTransparentExprWrappers, skipTransparentExprWrapperNodes } from '@babel/helper-skip-transparent-expression-wrappers';

function willPathCastToBoolean(path) {
  const maybeWrapped = findOutermostTransparentParent(path);
  const {
    node,
    parentPath
  } = maybeWrapped;
  if (parentPath.isLogicalExpression()) {
    const {
      operator,
      right
    } = parentPath.node;
    if (operator === "&&" || operator === "||" || operator === "??" && node === right) {
      return willPathCastToBoolean(parentPath);
    }
  }
  if (parentPath.isSequenceExpression()) {
    const {
      expressions
    } = parentPath.node;
    if (expressions[expressions.length - 1] === node) {
      return willPathCastToBoolean(parentPath);
    } else {
      return true;
    }
  }
  return parentPath.isConditional({
    test: node
  }) || parentPath.isUnaryExpression({
    operator: "!"
  }) || parentPath.isForStatement({
    test: node
  }) || parentPath.isWhile({
    test: node
  });
}
function findOutermostTransparentParent(path) {
  let maybeWrapped = path;
  path.findParent(p => {
    if (!isTransparentExprWrapper(p.node)) return true;
    maybeWrapped = p;
    return false;
  });
  return maybeWrapped;
}

const last = arr => arr[arr.length - 1];
function isSimpleMemberExpression(expression) {
  expression = skipTransparentExprWrapperNodes(expression);
  return types.isIdentifier(expression) || types.isSuper(expression) || types.isMemberExpression(expression) && !expression.computed && isSimpleMemberExpression(expression.object);
}
function needsMemoize(path) {
  let optionalPath = path;
  const {
    scope
  } = path;
  while (optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression()) {
    const {
      node
    } = optionalPath;
    const childPath = skipTransparentExprWrappers(optionalPath.isOptionalMemberExpression() ? optionalPath.get("object") : optionalPath.get("callee"));
    if (node.optional) {
      return !scope.isStatic(childPath.node);
    }
    optionalPath = childPath;
  }
}
const NULLISH_CHECK = template.expression(`%%check%% === null || %%ref%% === void 0`);
const NULLISH_CHECK_NO_DDA = template.expression(`%%check%% == null`);
const NULLISH_CHECK_NEG = template.expression(`%%check%% !== null && %%ref%% !== void 0`);
const NULLISH_CHECK_NO_DDA_NEG = template.expression(`%%check%% != null`);
function transformOptionalChain(path, {
  pureGetters,
  noDocumentAll
}, replacementPath, ifNullish, wrapLast) {
  const {
    scope
  } = path;
  if (scope.path.isPattern() && needsMemoize(path)) {
    replacementPath.replaceWith(template.expression.ast`(() => ${replacementPath.node})()`);
    return;
  }
  const optionals = [];
  let optionalPath = path;
  while (optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression()) {
    const {
      node
    } = optionalPath;
    if (node.optional) {
      optionals.push(node);
    }
    if (optionalPath.isOptionalMemberExpression()) {
      optionalPath.node.type = "MemberExpression";
      optionalPath = skipTransparentExprWrappers(optionalPath.get("object"));
    } else if (optionalPath.isOptionalCallExpression()) {
      optionalPath.node.type = "CallExpression";
      optionalPath = skipTransparentExprWrappers(optionalPath.get("callee"));
    }
  }
  if (optionals.length === 0) {
    return;
  }
  const checks = [];
  let tmpVar;
  for (let i = optionals.length - 1; i >= 0; i--) {
    const node = optionals[i];
    const isCall = types.isCallExpression(node);
    const chainWithTypes = isCall ? node.callee : node.object;
    const chain = skipTransparentExprWrapperNodes(chainWithTypes);
    let ref;
    let check;
    if (isCall && types.isIdentifier(chain, {
      name: "eval"
    })) {
      check = ref = chain;
      node.callee = types.sequenceExpression([types.numericLiteral(0), ref]);
    } else if (pureGetters && isCall && isSimpleMemberExpression(chain)) {
      check = ref = node.callee;
    } else if (scope.isStatic(chain)) {
      check = ref = chainWithTypes;
    } else {
      if (!tmpVar || isCall) {
        tmpVar = scope.generateUidIdentifierBasedOnNode(chain);
        scope.push({
          id: types.cloneNode(tmpVar)
        });
      }
      ref = tmpVar;
      check = types.assignmentExpression("=", types.cloneNode(tmpVar), chainWithTypes);
      if (isCall) {
        node.callee = ref;
      } else {
        node.object = ref;
      }
    }
    if (isCall && types.isMemberExpression(chain)) {
      if (pureGetters && isSimpleMemberExpression(chain)) {
        node.callee = chainWithTypes;
      } else {
        const {
          object
        } = chain;
        let context;
        if (types.isSuper(object)) {
          context = types.thisExpression();
        } else {
          const memoized = scope.maybeGenerateMemoised(object);
          if (memoized) {
            context = memoized;
            chain.object = types.assignmentExpression("=", memoized, object);
          } else {
            context = object;
          }
        }
        node.arguments.unshift(types.cloneNode(context));
        node.callee = types.memberExpression(node.callee, types.identifier("call"));
      }
    }
    const data = {
      check: types.cloneNode(check),
      ref: types.cloneNode(ref)
    };
    Object.defineProperty(data, "ref", {
      enumerable: false
    });
    checks.push(data);
  }
  let result = replacementPath.node;
  if (wrapLast) result = wrapLast(result);
  const ifNullishBoolean = types.isBooleanLiteral(ifNullish);
  const ifNullishFalse = ifNullishBoolean && ifNullish.value === false;
  const ifNullishVoid = !ifNullishBoolean && types.isUnaryExpression(ifNullish, {
    operator: "void"
  });
  const isEvaluationValueIgnored = types.isExpressionStatement(replacementPath.parent) && !replacementPath.isCompletionRecord() || types.isSequenceExpression(replacementPath.parent) && last(replacementPath.parent.expressions) !== replacementPath.node;
  const tpl = ifNullishFalse ? noDocumentAll ? NULLISH_CHECK_NO_DDA_NEG : NULLISH_CHECK_NEG : noDocumentAll ? NULLISH_CHECK_NO_DDA : NULLISH_CHECK;
  const logicalOp = ifNullishFalse ? "&&" : "||";
  const check = checks.map(tpl).reduce((expr, check) => types.logicalExpression(logicalOp, expr, check));
  replacementPath.replaceWith(ifNullishBoolean || ifNullishVoid && isEvaluationValueIgnored ? types.logicalExpression(logicalOp, check, result) : types.conditionalExpression(check, ifNullish, result));
}
function transform(path, assumptions) {
  const {
    scope
  } = path;
  const maybeWrapped = findOutermostTransparentParent(path);
  const {
    parentPath
  } = maybeWrapped;
  if (parentPath.isUnaryExpression({
    operator: "delete"
  })) {
    transformOptionalChain(path, assumptions, parentPath, types.booleanLiteral(true));
  } else {
    let wrapLast;
    if (parentPath.isCallExpression({
      callee: maybeWrapped.node
    }) && path.isOptionalMemberExpression()) {
      wrapLast = replacement => {
        const object = skipTransparentExprWrapperNodes(replacement.object);
        let baseRef;
        if (!assumptions.pureGetters || !isSimpleMemberExpression(object)) {
          baseRef = scope.maybeGenerateMemoised(object);
          if (baseRef) {
            replacement.object = types.assignmentExpression("=", baseRef, object);
          }
        }
        return types.callExpression(types.memberExpression(replacement, types.identifier("bind")), [types.cloneNode(baseRef ?? object)]);
      };
    }
    transformOptionalChain(path, assumptions, path, willPathCastToBoolean(maybeWrapped) ? types.booleanLiteral(false) : types.buildUndefinedNode(), wrapLast);
  }
}

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-optional-chaining: The 'loose' option has been deprecated, " + "use the `noDocumentAll` and `pureGetters` assumptions instead (https://babeljs.io/assumptions).");
  }
  const {
    loose = false
  } = options;
  const noDocumentAll = api.assumption("noDocumentAll") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;
  return {
    name: "transform-optional-chaining",
    manipulateOptions: undefined,
    visitor: api.traverse.explode({
      "OptionalCallExpression|OptionalMemberExpression"(path) {
        transform(path, {
          noDocumentAll,
          pureGetters
        });
      }
    })
  };
});

export { index as default, transform, transformOptionalChain };
//# sourceMappingURL=index.js.map
