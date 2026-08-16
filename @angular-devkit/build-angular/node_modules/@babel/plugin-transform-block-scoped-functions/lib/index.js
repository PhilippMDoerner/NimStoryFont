import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  function transformStatementList(parentPath, paths) {
    const isInStrictMode = parentPath.isInStrictMode();
    for (const path of paths) {
      if (!path.isFunctionDeclaration()) continue;
      const useLet = isInStrictMode || path.node.async || path.node.generator || path.getData("@babel/plugin-transform-async-generator-functions/async_generator_function");
      const func = path.node;
      const declar = types.variableDeclaration(useLet ? "let" : "var", [types.variableDeclarator(func.id, types.toExpression(func))]);
      declar._blockHoist = 2;
      func.id = null;
      path.replaceWith(declar);
    }
  }
  const visitor = {
    BlockStatement(path) {
      const {
        node,
        parent
      } = path;
      if (types.isFunction(parent, {
        body: node
      }) || types.isExportDeclaration(parent)) {
        return;
      }
      transformStatementList(path, path.get("body"));
    },
    SwitchStatement(path) {
      const {
        node
      } = path;
      const fns = [];
      for (const caseNode of node.cases) {
        const {
          consequent
        } = caseNode;
        for (let i = consequent.length - 1; i >= 0; i--) {
          if (types.isFunctionDeclaration(consequent[i])) {
            fns.push(consequent[i]);
            consequent.splice(i, 1);
          }
        }
      }
      if (!fns.length) return;
      path.replaceWith(types.blockStatement([types.variableDeclaration("let", fns.map(fn => types.variableDeclarator(types.cloneNode(fn.id), types.toExpression(fn)))), node]));
    }
  };
  return {
    name: "transform-block-scoped-functions",
    visitor: {
      ...visitor,
      Loop(path) {
        path.traverse(visitor);
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
