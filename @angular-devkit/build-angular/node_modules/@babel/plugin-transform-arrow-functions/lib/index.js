import { declare } from '@babel/helper-plugin-utils';

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("spec" in options) {
    console.warn("@babel/plugin-transform-arrow-functions: The 'spec' option has been deprecated, " + `use the 'noNewArrows: ${!options.spec}' assumption instead (https://babeljs.io/assumptions).`);
  }
  const noNewArrows = api.assumption("noNewArrows") ?? !options.spec;
  return {
    name: "transform-arrow-functions",
    visitor: {
      ArrowFunctionExpression(path) {
        if (!path.isArrowFunctionExpression()) return;
        path.arrowFunctionToExpression({
          allowInsertArrow: false,
          noNewArrows
        });
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
