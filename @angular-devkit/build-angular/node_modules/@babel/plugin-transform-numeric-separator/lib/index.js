import { declare } from '@babel/helper-plugin-utils';

function remover({
  node
}) {
  const {
    extra
  } = node;
  if (extra?.raw?.includes("_")) {
    extra.raw = extra.raw.replace(/_/g, "");
  }
}
const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-numeric-separator",
    manipulateOptions: undefined,
    visitor: {
      NumericLiteral: remover,
      BigIntLiteral: remover
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
