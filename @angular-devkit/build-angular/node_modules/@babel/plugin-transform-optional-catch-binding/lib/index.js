import { declare } from '@babel/helper-plugin-utils';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-optional-catch-binding",
    manipulateOptions: undefined,
    visitor: {
      CatchClause(path) {
        if (!path.node.param) {
          const uid = path.scope.generateUidIdentifier("unused");
          const paramPath = path.get("param");
          paramPath.replaceWith(uid);
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
