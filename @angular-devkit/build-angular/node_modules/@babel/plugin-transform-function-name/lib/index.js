import { isRequired } from '@babel/helper-compilation-targets';
import { declare } from '@babel/helper-plugin-utils';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  const supportUnicodeId = !isRequired("transform-unicode-escapes", api.targets());
  return {
    name: "transform-function-name",
    visitor: {
      FunctionExpression: {
        exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            path.ensureFunctionName(supportUnicodeId);
          }
        }
      },
      ObjectProperty(path) {
        const value = path.get("value");
        if (value.isFunction()) {
          value.ensureFunctionName(supportUnicodeId);
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
