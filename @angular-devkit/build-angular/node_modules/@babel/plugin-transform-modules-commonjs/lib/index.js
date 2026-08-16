import { declare } from '@babel/helper-plugin-utils';
import { buildDynamicImport, isSideEffectImport, isModule, rewriteModuleStatementsAndPrepareHeader, wrapInterop, buildNamespaceInitStatements, ensureStatementsHoisted } from '@babel/helper-module-transforms';
import { template, types } from '@babel/core';

const requireNoInterop = source => template.expression.ast`require(${source})`;
const requireInterop = (source, file) => types.callExpression(file.addHelper("interopRequireWildcard"), [requireNoInterop(source)]);
function transformDynamicImport(path, noInterop, file) {
  const buildRequire = noInterop ? requireNoInterop : requireInterop;
  path.replaceWith(buildDynamicImport(path.node, true, false, specifier => buildRequire(specifier, file)));
}

const lazyImportsHook = lazy => ({
  name: `${"@babel/plugin-transform-modules-commonjs"}/lazy`,
  version: "8.0.1",
  getWrapperPayload(source, metadata) {
    if (isSideEffectImport(metadata) || metadata.reexportAll) {
      return null;
    }
    if (lazy === true) {
      return source.includes(".") ? null : "lazy/function";
    }
    if (Array.isArray(lazy)) {
      return !lazy.includes(source) ? null : "lazy/function";
    }
    if (typeof lazy === "function") {
      return lazy(source) ? "lazy/function" : null;
    }
    return null;
  },
  buildRequireWrapper(name, init, payload, referenced) {
    if (payload === "lazy/function") {
      if (!referenced) return false;
      return template.statement.ast`
        function ${name}() {
          const data = ${init};
          ${name} = function(){ return data; };
          return data;
        }
      `;
    }
    return null;
  },
  wrapReference(ref, payload) {
    if (payload === "lazy/function") return types.callExpression(ref, []);
    return null;
  }
});

const commonJSHooksKey = "@babel/plugin-transform-modules-commonjs/customWrapperPlugin";
function defineCommonJSHook(file, hook) {
  let hooks = file.get(commonJSHooksKey);
  if (!hooks) file.set(commonJSHooksKey, hooks = []);
  hooks.push(hook);
}
function findMap(arr, cb) {
  if (arr) {
    for (const el of arr) {
      const res = cb(el);
      if (res != null) return res ?? null;
    }
  }
  return null;
}
function makeInvokers(file) {
  const hooks = file.get(commonJSHooksKey);
  return {
    getWrapperPayload(...args) {
      return findMap(hooks, hook => hook.getWrapperPayload?.(...args));
    },
    wrapReference(...args) {
      return findMap(hooks, hook => hook.wrapReference?.(...args));
    },
    buildRequireWrapper(...args) {
      return findMap(hooks, hook => hook.buildRequireWrapper?.(...args));
    }
  };
}

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-modules-commonjs: The 'loose' option has been deprecated, " + "use the `constantReexports` and `enumerableModuleMeta` assumptions instead (https://babeljs.io/assumptions).");
  }
  const {
    strictNamespace = false,
    mjsStrictNamespace = strictNamespace,
    allowTopLevelThis,
    strict,
    strictMode,
    noInterop,
    importInterop,
    lazy = false,
    allowCommonJSExports = true,
    loose = false
  } = options;
  const constantReexports = api.assumption("constantReexports") ?? loose;
  const enumerableModuleMeta = api.assumption("enumerableModuleMeta") ?? loose;
  const noIncompleteNsImportDetection = api.assumption("noIncompleteNsImportDetection") ?? false;
  if (typeof lazy !== "boolean" && typeof lazy !== "function" && (!Array.isArray(lazy) || !lazy.every(item => typeof item === "string"))) {
    throw new Error(`.lazy must be a boolean, array of strings, or a function`);
  }
  if (typeof strictNamespace !== "boolean") {
    throw new Error(`.strictNamespace must be a boolean, or undefined`);
  }
  if (typeof mjsStrictNamespace !== "boolean") {
    throw new Error(`.mjsStrictNamespace must be a boolean, or undefined`);
  }
  const getAssertion = localName => template.expression.ast`
    (function(){
      throw new Error(
        "The CommonJS '" + "${localName}" + "' variable is not available in ES6 modules." +
        "Consider setting setting sourceType:script or sourceType:unambiguous in your " +
        "Babel config for this file.");
    })()
  `;
  const moduleExportsVisitor = {
    ReferencedIdentifier(path) {
      const localName = path.node.name;
      if (localName !== "module" && localName !== "exports") return;
      const localBinding = path.scope.getBinding(localName);
      const rootBinding = this.scope.getBinding(localName);
      if (rootBinding !== localBinding || path.parentPath.isObjectProperty({
        value: path.node
      }) && path.parentPath.parentPath.isObjectPattern() || path.parentPath.isAssignmentExpression({
        left: path.node
      }) || path.isAssignmentExpression({
        left: path.node
      })) {
        return;
      }
      path.replaceWith(getAssertion(localName));
    },
    UpdateExpression(path) {
      const arg = path.get("argument");
      if (!arg.isIdentifier()) return;
      const localName = arg.node.name;
      if (localName !== "module" && localName !== "exports") return;
      const localBinding = path.scope.getBinding(localName);
      const rootBinding = this.scope.getBinding(localName);
      if (rootBinding !== localBinding) return;
      path.replaceWith(types.assignmentExpression(path.node.operator[0] + "=", arg.node, getAssertion(localName)));
    },
    AssignmentExpression(path) {
      const left = path.get("left");
      if (left.isIdentifier()) {
        const localName = left.node.name;
        if (localName !== "module" && localName !== "exports") return;
        const localBinding = path.scope.getBinding(localName);
        const rootBinding = this.scope.getBinding(localName);
        if (rootBinding !== localBinding) return;
        const right = path.get("right");
        right.replaceWith(types.sequenceExpression([right.node, getAssertion(localName)]));
      } else if (left.isPattern()) {
        const ids = left.getOuterBindingIdentifiers();
        const localName = Object.keys(ids).find(localName => {
          if (localName !== "module" && localName !== "exports") return false;
          return this.scope.getBinding(localName) === path.scope.getBinding(localName);
        });
        if (localName) {
          const right = path.get("right");
          right.replaceWith(types.sequenceExpression([right.node, getAssertion(localName)]));
        }
      }
    }
  };
  return {
    name: "transform-modules-commonjs",
    pre() {
      this.file.set("@babel/plugin-transform-modules-*", "commonjs");
      if (lazy) defineCommonJSHook(this.file, lazyImportsHook(lazy));
    },
    visitor: api.traverse.explode({
      "CallExpression|ImportExpression"(path) {
        if (!this.file.has("@babel/plugin-proposal-dynamic-import")) return;
        if (path.isCallExpression() && !types.isImport(path.node.callee)) return;
        let {
          scope
        } = path;
        do {
          scope.rename("require");
        } while (scope = scope.parent);
        transformDynamicImport(path, noInterop, this.file);
      },
      Program: {
        exit(path, state) {
          if (!isModule(path)) return;
          path.scope.rename("exports");
          path.scope.rename("module");
          path.scope.rename("require");
          path.scope.rename("__filename");
          path.scope.rename("__dirname");
          if (!allowCommonJSExports) {
            path.traverse(moduleExportsVisitor, {
              scope: path.scope
            });
          }
          const hooks = makeInvokers(this.file);
          const {
            meta,
            headers
          } = rewriteModuleStatementsAndPrepareHeader(path, {
            exportName: "exports",
            constantReexports,
            enumerableModuleMeta,
            strict,
            strictMode,
            allowTopLevelThis,
            noInterop,
            importInterop,
            wrapReference: hooks.wrapReference,
            getWrapperPayload: hooks.getWrapperPayload,
            esNamespaceOnly: typeof state.filename === "string" && state.filename.endsWith(".mjs") ? mjsStrictNamespace : strictNamespace,
            noIncompleteNsImportDetection,
            filename: this.file.opts.filename
          });
          for (const [source, metadata] of meta.source) {
            const loadExpr = types.callExpression(types.identifier("require"), [types.stringLiteral(source)]);
            let header;
            if (isSideEffectImport(metadata)) {
              if (lazy && metadata.wrap === "function") {
                throw new Error("Assertion failure");
              }
              header = types.expressionStatement(loadExpr);
            } else {
              const init = wrapInterop(path, loadExpr, metadata.interop) || loadExpr;
              if (metadata.wrap) {
                const res = hooks.buildRequireWrapper(metadata.name, init, metadata.wrap, metadata.referenced);
                if (res === false) continue;else header = res;
              }
              header ??= template.statement.ast`
                var ${metadata.name} = ${init};
              `;
            }
            header.loc = metadata.loc;
            headers.push(header);
            headers.push(...buildNamespaceInitStatements(meta, metadata, constantReexports, hooks.wrapReference));
          }
          ensureStatementsHoisted(headers);
          path.unshiftContainer("body", headers);
          path.get("body").forEach(path => {
            if (!headers.includes(path.node)) return;
            if (path.isVariableDeclaration()) {
              path.scope.registerDeclaration(path);
            }
          });
        }
      }
    })
  };
});

export { index as default, defineCommonJSHook };
//# sourceMappingURL=index.js.map
