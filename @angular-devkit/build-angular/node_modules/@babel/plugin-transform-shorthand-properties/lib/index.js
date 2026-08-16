import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-shorthand-properties",
    visitor: {
      ObjectMethod(path) {
        const {
          node
        } = path;
        if (node.kind === "method") {
          const func = types.functionExpression(null, node.params, node.body, node.generator, node.async);
          func.returnType = node.returnType;
          const computedKey = types.toComputedKey(node);
          if (types.isStringLiteral(computedKey, {
            value: "__proto__"
          })) {
            path.replaceWith(types.objectProperty(computedKey, func, true));
          } else {
            path.replaceWith(types.objectProperty(node.key, func, node.computed));
          }
        }
      },
      ObjectProperty(path) {
        const {
          node
        } = path;
        if (node.shorthand) {
          const computedKey = types.toComputedKey(node);
          if (types.isStringLiteral(computedKey, {
            value: "__proto__"
          })) {
            path.replaceWith(types.objectProperty(computedKey, node.value, true));
          } else {
            node.shorthand = false;
          }
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
