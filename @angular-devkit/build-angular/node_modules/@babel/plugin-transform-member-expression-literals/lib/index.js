import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-member-expression-literals",
    visitor: {
      MemberExpression: {
        exit({
          node
        }) {
          const prop = node.property;
          if (!node.computed && types.isIdentifier(prop) && !types.isValidES3Identifier(prop.name)) {
            node.property = types.stringLiteral(prop.name);
            node.computed = true;
          }
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
