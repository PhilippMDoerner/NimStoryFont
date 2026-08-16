import wrapFunction from '@babel/helper-wrap-function';
import annotateAsPure from '@babel/helper-annotate-as-pure';
import { types } from '@babel/core';
import { visitors } from '@babel/traverse';

const {
  callExpression,
  cloneNode,
  isIdentifier,
  isThisExpression,
  yieldExpression
} = types;
const awaitVisitor = visitors.environmentVisitor({
  ArrowFunctionExpression(path) {
    path.skip();
  },
  AwaitExpression(path, {
    wrapAwait
  }) {
    const argument = path.get("argument");
    path.replaceWith(yieldExpression(wrapAwait ? callExpression(cloneNode(wrapAwait), [argument.node]) : argument.node));
  }
});
function index (path, helpers, noNewArrows, ignoreFunctionLength) {
  path.traverse(awaitVisitor, {
    wrapAwait: helpers.wrapAwait
  });
  const isIIFE = checkIsIIFE(path);
  path.node.async = false;
  path.node.generator = true;
  wrapFunction(path, cloneNode(helpers.wrapAsync), noNewArrows, ignoreFunctionLength);
  const isProperty = path.isObjectMethod() || path.isClassMethod() || path.parentPath.isObjectProperty() || path.parentPath.isClassProperty();
  if (!isProperty && !isIIFE && path.isExpression()) {
    annotateAsPure(path);
  }
  function checkIsIIFE(path) {
    if (path.parentPath.isCallExpression({
      callee: path.node
    })) {
      return true;
    }
    const {
      parentPath
    } = path;
    if (parentPath.isMemberExpression()) {
      if (isIdentifier(parentPath.node.property, {
        name: "bind"
      })) {
        const {
          parentPath: bindCall
        } = parentPath;
        return (bindCall.isCallExpression() && bindCall.node.arguments.length === 1 && isThisExpression(bindCall.node.arguments[0]) && bindCall.parentPath.isCallExpression({
            callee: bindCall.node
          })
        );
      }
      return true;
    }
    return false;
  }
}

export { index as default };
//# sourceMappingURL=index.js.map
