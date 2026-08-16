import { declare } from '@babel/helper-plugin-utils';
import ReplaceSupers from '@babel/helper-replace-supers';
import { types } from '@babel/core';

function replacePropertySuper(path, getObjectRef, file) {
  const replaceSupers = new ReplaceSupers({
    getObjectRef: getObjectRef,
    methodPath: path,
    file: file
  });
  replaceSupers.replace();
}
const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  const newLets = new Set();
  return {
    name: "transform-object-super",
    visitor: {
      Loop: {
        exit(path) {
          newLets.forEach(v => {
            if (v.scopePath === path) {
              path.scope.push({
                id: v.id,
                kind: "let"
              });
              path.scope.crawl();
              path.requeue();
              newLets.delete(v);
            }
          });
        }
      },
      ObjectExpression(path, state) {
        let objectRef;
        const getObjectRef = () => objectRef = objectRef || path.scope.generateUidIdentifier("obj");
        path.get("properties").forEach(propPath => {
          if (!propPath.isMethod()) return;
          replacePropertySuper(propPath, getObjectRef, state.file);
        });
        if (objectRef) {
          const scopePath = path.findParent(p => p.isFunction() || p.isProgram() || p.isLoop());
          const useLet = scopePath.isLoop();
          if (useLet) {
            newLets.add({
              scopePath,
              id: types.cloneNode(objectRef)
            });
          } else {
            path.scope.push({
              id: types.cloneNode(objectRef),
              kind: "var"
            });
          }
          path.replaceWith(types.assignmentExpression("=", types.cloneNode(objectRef), path.node));
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
