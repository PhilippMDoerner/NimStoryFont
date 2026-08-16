import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return {
    name: "transform-export-namespace-from",
    manipulateOptions: undefined,
    visitor: {
      ExportNamedDeclaration(path) {
        const {
          node,
          scope
        } = path;
        const {
          specifiers
        } = node;
        const index = types.isExportDefaultSpecifier(specifiers[0]) ? 1 : 0;
        if (!types.isExportNamespaceSpecifier(specifiers[index])) return;
        const nodes = [];
        if (index === 1) {
          nodes.push(types.exportNamedDeclaration(null, [specifiers.shift()], node.source));
        }
        const specifier = specifiers.shift();
        const {
          exported
        } = specifier;
        const uid = scope.generateUidIdentifier(exported.name ?? exported.value);
        nodes.push(types.importDeclaration([types.importNamespaceSpecifier(uid)], types.cloneNode(node.source)), types.exportNamedDeclaration(null, [types.exportSpecifier(types.cloneNode(uid), exported)]));
        if (node.specifiers.length >= 1) {
          nodes.push(node);
        }
        const [importDeclaration] = path.replaceWithMultiple(nodes);
        path.scope.registerDeclaration(importDeclaration);
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
