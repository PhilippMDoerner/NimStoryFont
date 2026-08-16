import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-sticky-regex",
    visitor: {
      RegExpLiteral(path) {
        const {
          node
        } = path;
        if (!node.flags.includes("y")) return;
        path.replaceWith(types.newExpression(types.identifier("RegExp"), [types.stringLiteral(node.pattern), types.stringLiteral(node.flags)]));
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
