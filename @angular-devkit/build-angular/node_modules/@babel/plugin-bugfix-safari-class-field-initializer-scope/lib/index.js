import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

function needsWrapping(node) {
  if (types.isLiteral(node) && !types.isTemplateLiteral(node)) {
    return false;
  }
  if (types.isCallExpression(node) || types.isOptionalCallExpression(node) || types.isNewExpression(node)) {
    return needsWrapping(node.callee) || node.arguments.some(needsWrapping);
  }
  if (types.isTemplateLiteral(node)) {
    return node.expressions.some(needsWrapping);
  }
  if (types.isTaggedTemplateExpression(node)) {
    return needsWrapping(node.tag) || needsWrapping(node.quasi);
  }
  if (types.isArrayExpression(node)) {
    return node.elements.some(needsWrapping);
  }
  if (types.isObjectExpression(node)) {
    return node.properties.some(prop => {
      if (types.isObjectProperty(prop)) {
        return needsWrapping(prop.value) || prop.computed && needsWrapping(prop.key);
      }
      if (types.isObjectMethod(prop)) {
        return false;
      }
      return false;
    });
  }
  if (types.isMemberExpression(node) || types.isOptionalMemberExpression(node)) {
    return needsWrapping(node.object) || node.computed && needsWrapping(node.property);
  }
  if (types.isFunctionExpression(node) || types.isArrowFunctionExpression(node) || types.isClassExpression(node)) {
    return false;
  }
  if (types.isThisExpression(node)) {
    return false;
  }
  if (types.isSequenceExpression(node)) {
    return node.expressions.some(needsWrapping);
  }
  return true;
}
function wrapInitializer(path) {
  const {
    value
  } = path.node;
  if (value && needsWrapping(value)) {
    path.node.value = types.callExpression(types.arrowFunctionExpression([], value), []);
  }
}
const index = declare(api => {
  api.assertVersion("^7.16.0 || ^8.0.0");
  return {
    name: "plugin-bugfix-safari-class-field-initializer-scope",
    visitor: {
      ClassProperty(path) {
        wrapInitializer(path);
      },
      ClassPrivateProperty(path) {
        wrapInitializer(path);
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
