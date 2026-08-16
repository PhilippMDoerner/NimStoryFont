import { declare } from '@babel/helper-plugin-utils';
import { unshiftForXStatementBody } from '@babel/plugin-transform-destructuring';
import { types, template, traverse } from '@babel/core';

function isAnonymousFunctionDefinition(node) {
  return types.isArrowFunctionExpression(node) || (types.isFunctionExpression(node) || types.isClassExpression(node)) && !node.id;
}
function emitSetFunctionNameCall(state, expression, name) {
  return types.callExpression(state.addHelper("setFunctionName"), [expression, types.stringLiteral(name)]);
}
const index = declare(api => {
  api.assertVersion("^7.23.9 || ^8.0.0");
  const TOP_LEVEL_USING = new Map();
  function isUsingDeclaration(node) {
    if (!types.isVariableDeclaration(node)) return false;
    return node.kind === "using" || node.kind === "await using" || TOP_LEVEL_USING.has(node);
  }
  const transformUsingDeclarationsVisitor = api.traverse.explode({
    ForOfStatement(path) {
      const {
        left
      } = path.node;
      if (!isUsingDeclaration(left)) return;
      const {
        id
      } = left.declarations[0];
      const tmpId = path.scope.generateUidIdentifierBasedOnNode(id);
      left.declarations[0].id = tmpId;
      left.kind = "const";
      path.ensureBlock();
      unshiftForXStatementBody(path, [types.variableDeclaration("using", [types.variableDeclarator(id, types.cloneNode(tmpId))])]);
    },
    "BlockStatement|StaticBlock"(path, state) {
      let ctx = null;
      let needsAwait = false;
      const scope = path.scope;
      for (const node of path.node.body) {
        if (!isUsingDeclaration(node)) continue;
        ctx ??= scope.generateUidIdentifier("usingCtx");
        const isAwaitUsing = node.kind === "await using" || TOP_LEVEL_USING.get(node) === 1;
        needsAwait ||= isAwaitUsing;
        if (!TOP_LEVEL_USING.delete(node)) {
          node.kind = "const";
        }
        for (const decl of node.declarations) {
          const currentInit = decl.init;
          decl.init = types.callExpression(types.memberExpression(types.cloneNode(ctx), isAwaitUsing ? types.identifier("a") : types.identifier("u")), [isAnonymousFunctionDefinition(currentInit) && types.isIdentifier(decl.id) ? emitSetFunctionNameCall(state, currentInit, decl.id.name) : currentInit]);
        }
      }
      if (!ctx) return;
      const disposeCall = types.callExpression(types.memberExpression(types.cloneNode(ctx), types.identifier("d")), []);
      const replacement = template.statement.ast`
        try {
          var ${types.cloneNode(ctx)} = ${state.addHelper("usingCtx")}();
          ${path.node.body}
        } catch (_) {
          ${types.cloneNode(ctx)}.e = _;
        } finally {
          ${needsAwait ? types.awaitExpression(disposeCall) : disposeCall}
        }
      `;
      types.inherits(replacement, path.node);
      const {
        parentPath
      } = path;
      if (parentPath.isFunction() || parentPath.isTryStatement() || parentPath.isCatchClause()) {
        path.replaceWith(types.blockStatement([replacement]));
      } else if (path.isStaticBlock()) {
        path.node.body = [replacement];
      } else {
        path.replaceWith(replacement);
      }
    }
  });
  const transformUsingDeclarationsVisitorSkipFn = traverse.visitors.merge([transformUsingDeclarationsVisitor, {
    Function(path) {
      path.skip();
    }
  }]);
  return {
    name: "transform-explicit-resource-management",
    visitor: traverse.visitors.merge([transformUsingDeclarationsVisitor, {
      Program(path) {
        TOP_LEVEL_USING.clear();
        if (path.node.sourceType !== "module") return;
        if (!path.node.body.some(isUsingDeclaration)) return;
        const innerBlockBody = [];
        for (const stmt of path.get("body")) {
          if (stmt.isFunctionDeclaration() || stmt.isImportDeclaration()) {
            continue;
          }
          let node = stmt.node;
          let shouldRemove = true;
          if (stmt.isExportDefaultDeclaration()) {
            let {
              declaration
            } = stmt.node;
            let varId;
            if (types.isClassDeclaration(declaration)) {
              varId = declaration.id;
              declaration.id = types.cloneNode(varId);
              declaration = types.toExpression(declaration);
            } else if (!types.isExpression(declaration)) {
              continue;
            }
            varId ??= path.scope.generateUidIdentifier("_default");
            innerBlockBody.push(types.variableDeclaration("var", [types.variableDeclarator(varId, declaration)]));
            stmt.replaceWith(types.exportNamedDeclaration(null, [types.exportSpecifier(types.cloneNode(varId), types.identifier("default"))]));
            continue;
          }
          if (stmt.isExportNamedDeclaration()) {
            node = stmt.node.declaration;
            if (!node || types.isFunction(node)) continue;
            stmt.replaceWith(types.exportNamedDeclaration(null, Object.keys(types.getOuterBindingIdentifiers(node, false)).map(id => types.exportSpecifier(types.identifier(id), types.identifier(id)))));
            shouldRemove = false;
          } else if (stmt.isExportDeclaration()) {
            continue;
          }
          if (types.isClassDeclaration(node)) {
            const id = node.id;
            node.id = types.cloneNode(id);
            innerBlockBody.push(types.variableDeclaration("var", [types.variableDeclarator(id, types.toExpression(node))]));
          } else if (types.isVariableDeclaration(node)) {
            if (node.kind === "using") {
              TOP_LEVEL_USING.set(stmt.node, 0);
            } else if (node.kind === "await using") {
              TOP_LEVEL_USING.set(stmt.node, 1);
            }
            node.kind = "var";
            innerBlockBody.push(node);
          } else {
            innerBlockBody.push(stmt.node);
          }
          if (shouldRemove) stmt.remove();
        }
        path.pushContainer("body", types.blockStatement(innerBlockBody));
      },
      Function(path, state) {
        if (path.node.async) {
          path.traverse(transformUsingDeclarationsVisitorSkipFn, state);
        }
      }
    }])
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
