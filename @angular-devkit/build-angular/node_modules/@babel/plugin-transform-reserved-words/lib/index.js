import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-reserved-words",
    visitor: api.traverse.explode({
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (!types.isValidES3Identifier(path.node.name)) {
          path.scope.rename(path.node.name);
        }
      }
    })
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
