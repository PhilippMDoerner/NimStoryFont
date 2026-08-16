import { declare } from '@babel/helper-plugin-utils';
import { types, template } from '@babel/core';

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-nullish-coalescing-operator: The 'loose' option has been deprecated, " + "use the `noDocumentAll` assumption instead (https://babeljs.io/assumptions).");
  }
  const noDocumentAll = api.assumption("noDocumentAll") ?? options.loose;
  const pureGetters = api.assumption("pureGetters") ?? false;
  return {
    name: "transform-nullish-coalescing-operator",
    manipulateOptions: undefined,
    visitor: {
      LogicalExpression(path) {
        const {
          node,
          scope
        } = path;
        if (node.operator !== "??") {
          return;
        }
        let ref;
        let assignment;
        if (pureGetters && scope.path.isPattern() && types.isMemberExpression(node.left) && !node.left.computed && types.isIdentifier(node.left.object) && types.isIdentifier(node.left.property) || types.isIdentifier(node.left) && (pureGetters || scope.hasBinding(node.left.name))) {
          ref = node.left;
          assignment = types.cloneNode(node.left);
        } else if (scope.path.isPattern()) {
          path.replaceWith(template.statement.ast`(() => ${path.node})()`);
          return;
        } else {
          ref = scope.generateUidIdentifierBasedOnNode(node.left);
          scope.push({
            id: types.cloneNode(ref)
          });
          assignment = types.assignmentExpression("=", ref, node.left);
        }
        path.replaceWith(types.conditionalExpression(noDocumentAll ? types.binaryExpression("!=", assignment, types.nullLiteral()) : types.logicalExpression("&&", types.binaryExpression("!==", assignment, types.nullLiteral()), types.binaryExpression("!==", types.cloneNode(ref), types.buildUndefinedNode())), types.cloneNode(ref), node.right));
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
