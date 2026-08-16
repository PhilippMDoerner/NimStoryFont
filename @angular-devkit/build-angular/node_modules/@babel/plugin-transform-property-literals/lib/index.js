import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-property-literals",
    visitor: {
      ObjectProperty: {
        exit({
          node
        }) {
          const key = node.key;
          if (!node.computed && types.isIdentifier(key) && !types.isValidES3Identifier(key.name)) {
            node.key = types.stringLiteral(key.name);
          }
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
