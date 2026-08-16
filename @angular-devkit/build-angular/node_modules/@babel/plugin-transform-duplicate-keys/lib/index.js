import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

function getName(key) {
  if (types.isIdentifier(key)) {
    return key.name;
  }
  return key.value.toString();
}
const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-duplicate-keys",
    visitor: {
      ObjectExpression(path) {
        const {
          node
        } = path;
        const plainProps = node.properties.filter(prop => !types.isSpreadElement(prop) && !prop.computed);
        const alreadySeenData = Object.create(null);
        const alreadySeenGetters = Object.create(null);
        const alreadySeenSetters = Object.create(null);
        for (const prop of plainProps) {
          const name = getName(prop.key);
          let isDuplicate = false;
          switch (prop.kind) {
            case "get":
              if (alreadySeenData[name] || alreadySeenGetters[name]) {
                isDuplicate = true;
              }
              alreadySeenGetters[name] = true;
              break;
            case "set":
              if (alreadySeenData[name] || alreadySeenSetters[name]) {
                isDuplicate = true;
              }
              alreadySeenSetters[name] = true;
              break;
            default:
              if (alreadySeenData[name] || alreadySeenGetters[name] || alreadySeenSetters[name]) {
                isDuplicate = true;
              }
              alreadySeenData[name] = true;
          }
          if (isDuplicate) {
            prop.computed = true;
            prop.key = types.stringLiteral(name);
          }
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
