import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-logical-assignment-operators",
    manipulateOptions: undefined,
    visitor: {
      AssignmentExpression(path) {
        const {
          node,
          scope
        } = path;
        const {
          operator,
          left,
          right
        } = node;
        const operatorTrunc = operator.slice(0, -1);
        if (!types.LOGICAL_OPERATORS.includes(operatorTrunc)) {
          return;
        }
        const lhs = types.cloneNode(left);
        if (types.isMemberExpression(left)) {
          const {
            object,
            property,
            computed
          } = left;
          const memo = scope.maybeGenerateMemoised(object);
          if (memo) {
            left.object = memo;
            lhs.object = types.assignmentExpression("=", types.cloneNode(memo), object);
          }
          if (computed) {
            const memo = scope.maybeGenerateMemoised(property);
            if (memo) {
              left.property = memo;
              lhs.property = types.assignmentExpression("=", types.cloneNode(memo), property);
            }
          }
        }
        path.replaceWith(types.logicalExpression(operatorTrunc, lhs, types.assignmentExpression("=", left, right)));
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
