import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-new-target",
    visitor: {
      MetaProperty(path) {
        const meta = path.get("meta");
        const property = path.get("property");
        const {
          scope
        } = path;
        if (meta.isIdentifier({
          name: "new"
        }) && property.isIdentifier({
          name: "target"
        })) {
          const func = path.findParent(path => {
            if (path.isClass()) return true;
            if (path.isFunction() && !path.isArrowFunctionExpression()) {
              if (path.isClassMethod({
                kind: "constructor"
              })) {
                return false;
              }
              return true;
            }
            return false;
          });
          if (!func) {
            throw path.buildCodeFrameError("new.target must be under a (non-arrow) function or a class.");
          }
          const {
            node
          } = func;
          if (types.isMethod(node)) {
            path.replaceWith(types.buildUndefinedNode());
            return;
          }
          const constructor = types.memberExpression(types.thisExpression(), types.identifier("constructor"));
          if (func.isClass()) {
            path.replaceWith(constructor);
            return;
          }
          if (!node.id) {
            node.id = scope.generateUidIdentifier("target");
          } else {
            let scope = path.scope;
            const name = node.id.name;
            while (scope !== func.parentPath.scope) {
              if (scope.hasOwnBinding(name) && !scope.bindingIdentifierEquals(name, node.id)) {
                scope.rename(name);
              }
              scope = scope.parent;
            }
          }
          path.replaceWith(types.conditionalExpression(types.binaryExpression("instanceof", types.thisExpression(), types.cloneNode(node.id)), constructor, types.buildUndefinedNode()));
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
