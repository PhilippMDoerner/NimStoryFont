import { declare } from '@babel/helper-plugin-utils';

function shouldTransform(path) {
  const {
    node
  } = path;
  const functionId = node.id;
  if (!functionId) return false;
  const name = functionId.name;
  const paramNameBinding = path.scope.getOwnBinding(name);
  if (paramNameBinding === undefined) {
    return false;
  }
  if (paramNameBinding.kind !== "param") {
    return false;
  }
  if (paramNameBinding.identifier === paramNameBinding.path.node) {
    return false;
  }
  return name;
}

const index = declare(api => {
  api.assertVersion("^7.16.0 || ^8.0.0");
  return {
    name: "plugin-bugfix-safari-id-destructuring-collision-in-function-expression",
    visitor: {
      FunctionExpression(path) {
        const name = shouldTransform(path);
        if (name) {
          const {
            scope
          } = path;
          const newParamName = scope.generateUid(name);
          scope.rename(name, newParamName);
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
