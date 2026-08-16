import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-typeof-symbol",
    visitor: {
      Scope({
        scope
      }) {
        if (!scope.getBinding("Symbol")) {
          return;
        }
        scope.rename("Symbol");
      },
      UnaryExpression(path) {
        const {
          node,
          parent
        } = path;
        if (node.operator !== "typeof") return;
        if (path.parentPath.isBinaryExpression() && types.EQUALITY_BINARY_OPERATORS.includes(parent.operator)) {
          const opposite = path.getOpposite();
          if (opposite.isStringLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") {
            return;
          }
        }
        const isUnderHelper = path.findParent(path => {
          if (path.isFunctionDeclaration()) {
            return path.get("body.directives.0")?.node.value.value === "@babel/helpers - typeof";
          }
          return false;
        });
        if (isUnderHelper) return;
        const helper = this.addHelper("typeof");
        const call = types.callExpression(helper, [node.argument]);
        const arg = path.get("argument");
        if (arg.isIdentifier() && !path.scope.hasBinding(arg.node.name, true)) {
          const unary = types.unaryExpression("typeof", types.cloneNode(node.argument));
          path.replaceWith(types.conditionalExpression(types.binaryExpression("===", unary, types.stringLiteral("undefined")), types.stringLiteral("undefined"), call));
        } else {
          path.replaceWith(call);
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
