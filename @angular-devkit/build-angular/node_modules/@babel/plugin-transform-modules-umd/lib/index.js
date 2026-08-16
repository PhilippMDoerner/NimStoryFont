import { declare } from '@babel/helper-plugin-utils';
import { basename, extname } from 'node:path';
import { isModule, getModuleName, rewriteModuleStatementsAndPrepareHeader, hasExports, isSideEffectImport, wrapInterop, buildNamespaceInitStatements, ensureStatementsHoisted } from '@babel/helper-module-transforms';
import { template, types } from '@babel/core';

const buildPrerequisiteAssignment = template(`
  GLOBAL_REFERENCE = GLOBAL_REFERENCE || {}
`);
const buildWrapper = template(`
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(MODULE_NAME, AMD_ARGUMENTS, factory);
    } else if (typeof exports !== "undefined") {
      factory(COMMONJS_ARGUMENTS);
    } else {
      var mod = { exports: {} };
      factory(BROWSER_ARGUMENTS);

      GLOBAL_TO_ASSIGN;
    }
  })(
    typeof globalThis !== "undefined" ? globalThis
      : typeof self !== "undefined" ? self
      : this,
    function(IMPORT_NAMES) {
  })
`);
const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-modules-umd: The 'loose' option has been deprecated, " + "use the `constantReexports` and `enumerableModuleMeta` assumptions instead (https://babeljs.io/assumptions).");
  }
  const {
    globals,
    exactGlobals,
    allowTopLevelThis,
    strict,
    strictMode,
    noInterop,
    importInterop
  } = options;
  const constantReexports = api.assumption("constantReexports") ?? options.loose;
  const enumerableModuleMeta = api.assumption("enumerableModuleMeta") ?? options.loose;
  function buildBrowserInit(browserGlobals, exactGlobals, filename, moduleName) {
    const moduleNameOrBasename = moduleName ? moduleName.value : basename(filename, extname(filename));
    let globalToAssign = types.memberExpression(types.identifier("global"), types.identifier(types.toIdentifier(moduleNameOrBasename)));
    let initAssignments = [];
    if (exactGlobals) {
      const globalName = browserGlobals[moduleNameOrBasename];
      if (globalName) {
        initAssignments = [];
        const members = globalName.split(".");
        globalToAssign = members.slice(1).reduce((accum, curr) => {
          initAssignments.push(buildPrerequisiteAssignment({
            GLOBAL_REFERENCE: types.cloneNode(accum)
          }));
          return types.memberExpression(accum, types.identifier(curr));
        }, types.memberExpression(types.identifier("global"), types.identifier(members[0])));
      }
    }
    initAssignments.push(types.expressionStatement(types.assignmentExpression("=", globalToAssign, types.memberExpression(types.identifier("mod"), types.identifier("exports")))));
    return initAssignments;
  }
  function buildBrowserArg(browserGlobals, exactGlobals, source) {
    let memberExpression;
    if (exactGlobals) {
      const globalRef = browserGlobals[source];
      if (globalRef) {
        memberExpression = globalRef.split(".").reduce((accum, curr) => types.memberExpression(accum, types.identifier(curr)), types.identifier("global"));
      } else {
        memberExpression = types.memberExpression(types.identifier("global"), types.identifier(types.toIdentifier(source)));
      }
    } else {
      const requireName = basename(source, extname(source));
      const globalName = browserGlobals[requireName] || requireName;
      memberExpression = types.memberExpression(types.identifier("global"), types.identifier(types.toIdentifier(globalName)));
    }
    return memberExpression;
  }
  return {
    name: "transform-modules-umd",
    visitor: {
      Program: {
        exit(path) {
          if (!isModule(path)) return;
          const browserGlobals = globals || {};
          const moduleName = getModuleName(this.file.opts, options);
          let moduleNameLiteral;
          if (moduleName) moduleNameLiteral = types.stringLiteral(moduleName);
          const {
            meta,
            headers
          } = rewriteModuleStatementsAndPrepareHeader(path, {
            constantReexports,
            enumerableModuleMeta,
            strict,
            strictMode,
            allowTopLevelThis,
            noInterop,
            importInterop,
            filename: this.file.opts.filename
          });
          const amdArgs = [];
          const commonjsArgs = [];
          const browserArgs = [];
          const importNames = [];
          if (hasExports(meta)) {
            amdArgs.push(types.stringLiteral("exports"));
            commonjsArgs.push(types.identifier("exports"));
            browserArgs.push(types.memberExpression(types.identifier("mod"), types.identifier("exports")));
            importNames.push(types.identifier(meta.exportName));
          }
          for (const [source, metadata] of meta.source) {
            amdArgs.push(types.stringLiteral(source));
            commonjsArgs.push(types.callExpression(types.identifier("require"), [types.stringLiteral(source)]));
            browserArgs.push(buildBrowserArg(browserGlobals, exactGlobals, source));
            importNames.push(types.identifier(metadata.name));
            if (!isSideEffectImport(metadata)) {
              const interop = wrapInterop(path, types.identifier(metadata.name), metadata.interop);
              if (interop) {
                const header = types.expressionStatement(types.assignmentExpression("=", types.identifier(metadata.name), interop));
                header.loc = meta.loc;
                headers.push(header);
              }
            }
            headers.push(...buildNamespaceInitStatements(meta, metadata, constantReexports));
          }
          ensureStatementsHoisted(headers);
          path.unshiftContainer("body", headers);
          const {
            body,
            directives
          } = path.node;
          path.node.directives = [];
          path.node.body = [];
          const umdWrapper = path.pushContainer("body", [buildWrapper({
            MODULE_NAME: moduleNameLiteral,
            AMD_ARGUMENTS: types.arrayExpression(amdArgs),
            COMMONJS_ARGUMENTS: commonjsArgs,
            BROWSER_ARGUMENTS: browserArgs,
            IMPORT_NAMES: importNames,
            GLOBAL_TO_ASSIGN: buildBrowserInit(browserGlobals, exactGlobals, this.filename || "unknown", moduleNameLiteral)
          })])[0];
          const umdFactory = umdWrapper.get("expression.arguments.1").get("body");
          umdFactory.pushContainer("directives", directives);
          umdFactory.pushContainer("body", body);
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
