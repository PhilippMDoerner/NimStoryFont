import { declare } from '@babel/helper-plugin-utils';
import { isModule, getModuleName, rewriteModuleStatementsAndPrepareHeader, hasExports, isSideEffectImport, wrapInterop, buildNamespaceInitStatements, ensureStatementsHoisted, buildDynamicImport } from '@babel/helper-module-transforms';
import { template, types } from '@babel/core';

const buildWrapper = template.statement(`
  define(MODULE_NAME, AMD_ARGUMENTS, function(IMPORT_NAMES) {
  })
`);
const buildAnonymousWrapper = template.statement(`
  define(["require"], function(REQUIRE) {
  })
`);
function injectWrapper(path, wrapper) {
  const {
    body,
    directives
  } = path.node;
  path.node.directives = [];
  path.node.body = [];
  const amdFactoryCall = path.pushContainer("body", wrapper)[0].get("expression");
  const amdFactoryCallArgs = amdFactoryCall.get("arguments");
  const amdFactory = amdFactoryCallArgs[amdFactoryCallArgs.length - 1].get("body");
  amdFactory.pushContainer("directives", directives);
  amdFactory.pushContainer("body", body);
}
const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-modules-amd: The 'loose' option has been deprecated, " + "use the `constantReexports` and `enumerableModuleMeta` assumptions instead (https://babeljs.io/assumptions).");
  }
  const {
    allowTopLevelThis,
    strict,
    strictMode,
    importInterop,
    noInterop
  } = options;
  const constantReexports = api.assumption("constantReexports") ?? options.loose;
  const enumerableModuleMeta = api.assumption("enumerableModuleMeta") ?? options.loose;
  return {
    name: "transform-modules-amd",
    pre() {
      this.file.set("@babel/plugin-transform-modules-*", "amd");
    },
    visitor: api.traverse.explode({
      "CallExpression|ImportExpression"(path, state) {
        if (!this.file.has("@babel/plugin-proposal-dynamic-import")) return;
        if (path.isCallExpression() && !path.get("callee").isImport()) return;
        let {
          requireId,
          resolveId,
          rejectId
        } = state;
        if (!requireId) {
          requireId = path.scope.generateUidIdentifier("require");
          state.requireId = requireId;
        }
        if (!resolveId || !rejectId) {
          resolveId = path.scope.generateUidIdentifier("resolve");
          rejectId = path.scope.generateUidIdentifier("reject");
          state.resolveId = resolveId;
          state.rejectId = rejectId;
        }
        let result = types.identifier("imported");
        if (!noInterop) {
          result = wrapInterop(this.file.path, result, "namespace");
        }
        path.replaceWith(buildDynamicImport(path.node, false, false, specifier => template.expression.ast`
              new Promise((${resolveId}, ${rejectId}) =>
                ${requireId}(
                  [${specifier}],
                  imported => ${types.cloneNode(resolveId)}(${result}),
                  ${types.cloneNode(rejectId)}
                )
              )
            `));
      },
      Program: {
        exit(path, {
          requireId
        }) {
          if (!isModule(path)) {
            if (requireId) {
              injectWrapper(path, buildAnonymousWrapper({
                REQUIRE: types.cloneNode(requireId)
              }));
            }
            return;
          }
          const amdArgs = [];
          const importNames = [];
          if (requireId) {
            amdArgs.push(types.stringLiteral("require"));
            importNames.push(types.cloneNode(requireId));
          }
          let moduleName = getModuleName(this.file.opts, options);
          if (moduleName) moduleName = types.stringLiteral(moduleName);
          const {
            meta,
            headers
          } = rewriteModuleStatementsAndPrepareHeader(path, {
            enumerableModuleMeta,
            constantReexports,
            strict,
            strictMode,
            allowTopLevelThis,
            importInterop,
            noInterop,
            filename: this.file.opts.filename
          });
          if (hasExports(meta)) {
            amdArgs.push(types.stringLiteral("exports"));
            importNames.push(types.identifier(meta.exportName));
          }
          for (const [source, metadata] of meta.source) {
            amdArgs.push(types.stringLiteral(source));
            importNames.push(types.identifier(metadata.name));
            if (!isSideEffectImport(metadata)) {
              const interop = wrapInterop(path, types.identifier(metadata.name), metadata.interop);
              if (interop) {
                const header = types.expressionStatement(types.assignmentExpression("=", types.identifier(metadata.name), interop));
                header.loc = metadata.loc;
                headers.push(header);
              }
            }
            headers.push(...buildNamespaceInitStatements(meta, metadata, constantReexports));
          }
          ensureStatementsHoisted(headers);
          path.unshiftContainer("body", headers);
          injectWrapper(path, buildWrapper({
            MODULE_NAME: moduleName,
            AMD_ARGUMENTS: types.arrayExpression(amdArgs),
            IMPORT_NAMES: importNames
          }));
        }
      }
    })
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
