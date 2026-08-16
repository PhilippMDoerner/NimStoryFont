import { declare } from '@babel/helper-plugin-utils';
import { transform } from '@babel/plugin-transform-optional-chaining';
import { skipTransparentExprWrappers } from '@babel/helper-skip-transparent-expression-wrappers';
import { types } from '@babel/core';

function matchAffectedArguments(argumentNodes) {
  const spreadIndex = argumentNodes.findIndex(node => types.isSpreadElement(node));
  return spreadIndex >= 0 && spreadIndex !== argumentNodes.length - 1;
}
function shouldTransform(path) {
  let optionalPath = path;
  const chains = [];
  for (;;) {
    if (optionalPath.isOptionalMemberExpression()) {
      chains.push(optionalPath.node);
      optionalPath = skipTransparentExprWrappers(optionalPath.get("object"));
    } else if (optionalPath.isOptionalCallExpression()) {
      chains.push(optionalPath.node);
      optionalPath = skipTransparentExprWrappers(optionalPath.get("callee"));
    } else {
      break;
    }
  }
  for (let i = 0; i < chains.length; i++) {
    const node = chains[i];
    if (types.isOptionalCallExpression(node) && matchAffectedArguments(node.arguments)) {
      if (node.optional) {
        return true;
      }
      const callee = chains[i + 1];
      if (types.isOptionalMemberExpression(callee, {
        optional: true
      })) {
        return true;
      }
    }
  }
  return false;
}

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  const noDocumentAll = api.assumption("noDocumentAll") ?? false;
  const pureGetters = api.assumption("pureGetters") ?? false;
  return {
    name: "bugfix-v8-spread-parameters-in-optional-chaining",
    visitor: api.traverse.explode({
      "OptionalCallExpression|OptionalMemberExpression"(path) {
        if (shouldTransform(path)) {
          transform(path, {
            noDocumentAll,
            pureGetters
          });
        }
      }
    })
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
