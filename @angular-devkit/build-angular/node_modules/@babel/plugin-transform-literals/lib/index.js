import { declare } from '@babel/helper-plugin-utils';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-literals",
    visitor: {
      NumericLiteral({
        node
      }) {
        if (node.extra && /^0[ob]/i.test(node.extra.raw)) {
          node.extra = undefined;
        }
      },
      StringLiteral({
        node
      }) {
        if (node.extra && /\\u/i.test(node.extra.raw)) {
          node.extra = undefined;
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
