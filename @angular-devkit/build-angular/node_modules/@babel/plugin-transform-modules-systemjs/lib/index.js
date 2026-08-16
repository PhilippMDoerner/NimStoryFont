import { declare } from '@babel/helper-plugin-utils';
import { template, types } from '@babel/core';
import { getModuleName, rewriteThis, buildDynamicImport } from '@babel/helper-module-transforms';
import { isIdentifierName } from '@babel/helper-validator-identifier';

const buildTemplate = template.statement(`
  SYSTEM_REGISTER(MODULE_NAME, SOURCES, function (EXPORT_IDENTIFIER, CONTEXT_IDENTIFIER) {
    "use strict";
    BEFORE_BODY;
    return {
      setters: SETTERS,
      execute: EXECUTE,
    };
  });
`);
const buildExportAll = template.statement(`
  for (var KEY in TARGET) {
    if (KEY !== "default" && KEY !== "__esModule") EXPORT_OBJ[KEY] = TARGET[KEY];
  }
`);
const MISSING_PLUGIN_ERROR = `\
ERROR: Dynamic import() transformation must be enabled using the
       @babel/plugin-transform-dynamic-import plugin. Babel 8
       no longer transforms import() without using that plugin.
`;
function getExportSpecifierName(node, stringSpecifiers) {
  if (node.type === "Identifier") {
    return node.name;
  } else if (node.type === "StringLiteral") {
    const stringValue = node.value;
    if (!isIdentifierName(stringValue)) {
      stringSpecifiers.add(stringValue);
    }
    return stringValue;
  } else {
    throw new Error(`Expected export specifier to be either Identifier or StringLiteral, got ${node.type}`);
  }
}
const protoKey = "__proto__";
function constructExportCall(path, exportIdent, exportNames, exportValues, exportStarTarget, stringSpecifiers) {
  const statements = [];
  if (!exportStarTarget) {
    if (exportNames.length === 1) {
      statements.push(types.expressionStatement(types.callExpression(exportIdent, [types.stringLiteral(exportNames[0]), exportValues[0]])));
    } else {
      const objectProperties = [];
      for (let i = 0; i < exportNames.length; i++) {
        const exportName = exportNames[i];
        const computed = exportName === protoKey;
        const exportNameNode = stringSpecifiers.has(exportName) || computed ? types.stringLiteral(exportName) : types.identifier(exportName);
        const exportValue = exportValues[i];
        objectProperties.push(types.objectProperty(exportNameNode, exportValue, computed));
      }
      statements.push(types.expressionStatement(types.callExpression(exportIdent, [types.objectExpression(objectProperties)])));
    }
  } else {
    const exportObj = path.scope.generateUid("exportObj");
    statements.push(types.variableDeclaration("var", [types.variableDeclarator(types.identifier(exportObj), types.objectExpression([types.objectProperty(types.identifier(protoKey), types.nullLiteral())]))]));
    statements.push(buildExportAll({
      KEY: path.scope.generateUidIdentifier("key"),
      EXPORT_OBJ: types.identifier(exportObj),
      TARGET: exportStarTarget
    }));
    for (let i = 0; i < exportNames.length; i++) {
      const exportName = exportNames[i];
      const computed = stringSpecifiers.has(exportName);
      const exportNameNode = computed ? types.stringLiteral(exportName) : types.identifier(exportName);
      const exportValue = exportValues[i];
      statements.push(types.expressionStatement(types.assignmentExpression("=", types.memberExpression(types.identifier(exportObj), exportNameNode, computed), exportValue)));
    }
    statements.push(types.expressionStatement(types.callExpression(exportIdent, [types.identifier(exportObj)])));
  }
  return statements;
}
const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  const {
    systemGlobal = "System",
    allowTopLevelThis = false
  } = options;
  const reassignmentVisited = new WeakSet();
  return {
    name: "transform-modules-systemjs",
    pre() {
      this.file.set("@babel/plugin-transform-modules-*", "systemjs");
    },
    visitor: api.traverse.explode({
      "CallExpression|ImportExpression"(path, state) {
        if (path.isCallExpression() && !types.isImport(path.node.callee)) return;
        if (path.isCallExpression()) {
          if (!this.file.has("@babel/plugin-proposal-dynamic-import")) {
            throw new Error(MISSING_PLUGIN_ERROR);
          }
        } else {
          if (!this.file.has("@babel/plugin-proposal-dynamic-import")) {
            throw new Error(MISSING_PLUGIN_ERROR);
          }
        }
        path.replaceWith(buildDynamicImport(path.node, false, true, specifier => types.callExpression(types.memberExpression(types.identifier(state.contextIdent), types.identifier("import")), [specifier])));
      },
      MetaProperty(path, state) {
        if (path.node.meta.name === "import" && path.node.property.name === "meta") {
          path.replaceWith(types.memberExpression(types.identifier(state.contextIdent), types.identifier("meta")));
        }
      },
      ReferencedIdentifier(path, state) {
        if (path.node.name === "__moduleName" && !path.scope.hasBinding("__moduleName")) {
          path.replaceWith(types.memberExpression(types.identifier(state.contextIdent), types.identifier("id")));
        }
      },
      Program: {
        enter(path, state) {
          state.contextIdent = path.scope.generateUid("context");
          state.stringSpecifiers = new Set();
          if (!allowTopLevelThis) {
            rewriteThis(path);
          }
        },
        exit(path, state) {
          const scope = path.scope;
          const exportIdent = scope.generateUid("export");
          const {
            contextIdent,
            stringSpecifiers
          } = state;
          const exportMap = Object.create(null);
          const modules = [];
          const beforeBody = [];
          const setters = [];
          const sources = [];
          const variableIds = [];
          const removedPaths = [];
          function addExportName(key, val) {
            exportMap[key] = exportMap[key] || [];
            exportMap[key].push(val);
          }
          function pushModule(source, key, specifiers) {
            let module;
            modules.forEach(function (m) {
              if (m.key === source) {
                module = m;
              }
            });
            if (!module) {
              modules.push(module = {
                key: source,
                imports: [],
                exports: []
              });
            }
            module[key] = module[key].concat(specifiers);
          }
          function buildExportCall(name, val) {
            return types.expressionStatement(types.callExpression(types.identifier(exportIdent), [types.stringLiteral(name), val]));
          }
          const exportNames = [];
          const exportValues = [];
          const body = path.get("body");
          for (const path of body) {
            if (path.isFunctionDeclaration()) {
              beforeBody.push(path.node);
              removedPaths.push(path);
            } else if (path.isClassDeclaration()) {
              variableIds.push(types.cloneNode(path.node.id));
              path.replaceWith(types.expressionStatement(types.assignmentExpression("=", types.cloneNode(path.node.id), types.toExpression(path.node))));
            } else if (path.isVariableDeclaration()) {
              path.node.kind = "var";
            } else if (path.isImportDeclaration()) {
              const source = path.node.source.value;
              pushModule(source, "imports", path.node.specifiers);
              for (const name of Object.keys(path.getBindingIdentifiers())) {
                scope.removeBinding(name);
                variableIds.push(types.identifier(name));
              }
              path.remove();
            } else if (path.isExportAllDeclaration()) {
              pushModule(path.node.source.value, "exports", path.node);
              path.remove();
            } else if (path.isExportDefaultDeclaration()) {
              const declar = path.node.declaration;
              if (types.isClassDeclaration(declar)) {
                const id = declar.id;
                if (id) {
                  exportNames.push("default");
                  exportValues.push(types.buildUndefinedNode());
                  variableIds.push(types.cloneNode(id));
                  addExportName(id.name, "default");
                  path.replaceWith(types.expressionStatement(types.assignmentExpression("=", types.cloneNode(id), types.toExpression(declar))));
                } else {
                  exportNames.push("default");
                  exportValues.push(types.toExpression(declar));
                  removedPaths.push(path);
                }
              } else if (types.isFunctionDeclaration(declar)) {
                const id = declar.id;
                if (id) {
                  beforeBody.push(declar);
                  exportNames.push("default");
                  exportValues.push(types.cloneNode(id));
                  addExportName(id.name, "default");
                } else {
                  exportNames.push("default");
                  exportValues.push(types.toExpression(declar));
                }
                removedPaths.push(path);
              } else {
                path.replaceWith(buildExportCall("default", declar));
              }
            } else if (path.isExportNamedDeclaration()) {
              const declar = path.node.declaration;
              if (declar) {
                path.replaceWith(declar);
                if (types.isFunction(declar)) {
                  const name = declar.id.name;
                  addExportName(name, name);
                  beforeBody.push(declar);
                  exportNames.push(name);
                  exportValues.push(types.cloneNode(declar.id));
                  removedPaths.push(path);
                } else if (types.isClass(declar)) {
                  const name = declar.id.name;
                  exportNames.push(name);
                  exportValues.push(types.buildUndefinedNode());
                  variableIds.push(types.cloneNode(declar.id));
                  path.replaceWith(types.expressionStatement(types.assignmentExpression("=", types.cloneNode(declar.id), types.toExpression(declar))));
                  addExportName(name, name);
                } else {
                  if (types.isVariableDeclaration(declar)) {
                    declar.kind = "var";
                  }
                  for (const name of Object.keys(types.getBindingIdentifiers(declar))) {
                    addExportName(name, name);
                  }
                }
              } else {
                const specifiers = path.node.specifiers;
                if (specifiers?.length) {
                  if (path.node.source) {
                    pushModule(path.node.source.value, "exports", specifiers);
                    path.remove();
                  } else {
                    const nodes = [];
                    for (const specifier of specifiers) {
                      const {
                        local,
                        exported
                      } = specifier;
                      const binding = scope.getBinding(local.name);
                      const exportedName = getExportSpecifierName(exported, stringSpecifiers);
                      if (binding && types.isFunctionDeclaration(binding.path.node)) {
                        exportNames.push(exportedName);
                        exportValues.push(types.cloneNode(local));
                      } else if (!binding) {
                        nodes.push(buildExportCall(exportedName, local));
                      }
                      addExportName(local.name, exportedName);
                    }
                    path.replaceWithMultiple(nodes);
                  }
                } else {
                  path.remove();
                }
              }
            }
          }
          modules.forEach(function (specifiers) {
            const setterBody = [];
            const target = scope.generateUid(specifiers.key);
            for (let specifier of specifiers.imports) {
              if (types.isImportNamespaceSpecifier(specifier)) {
                setterBody.push(types.expressionStatement(types.assignmentExpression("=", specifier.local, types.identifier(target))));
              } else if (types.isImportDefaultSpecifier(specifier)) {
                specifier = types.importSpecifier(specifier.local, types.identifier("default"));
              }
              if (types.isImportSpecifier(specifier)) {
                const {
                  imported
                } = specifier;
                setterBody.push(types.expressionStatement(types.assignmentExpression("=", specifier.local, types.memberExpression(types.identifier(target), specifier.imported, imported.type === "StringLiteral"))));
              }
            }
            if (specifiers.exports.length) {
              const exportNames = [];
              const exportValues = [];
              let hasExportStar = false;
              for (const node of specifiers.exports) {
                if (types.isExportAllDeclaration(node)) {
                  hasExportStar = true;
                } else if (types.isExportSpecifier(node)) {
                  const exportedName = getExportSpecifierName(node.exported, stringSpecifiers);
                  exportNames.push(exportedName);
                  exportValues.push(types.memberExpression(types.identifier(target), node.local, types.isStringLiteral(node.local)));
                } else ;
              }
              setterBody.push(...constructExportCall(path, types.identifier(exportIdent), exportNames, exportValues, hasExportStar ? types.identifier(target) : null, stringSpecifiers));
            }
            sources.push(types.stringLiteral(specifiers.key));
            setters.push(types.functionExpression(null, [types.identifier(target)], types.blockStatement(setterBody)));
          });
          let moduleName = getModuleName(this.file.opts, options);
          if (moduleName) moduleName = types.stringLiteral(moduleName);
          path.scope.hoistVariables((id, hasInit) => {
            variableIds.push(id);
            if (!hasInit && id.name in exportMap) {
              for (const exported of exportMap[id.name]) {
                exportNames.push(exported);
                exportValues.push(types.buildUndefinedNode());
              }
            }
          });
          if (variableIds.length) {
            beforeBody.unshift(types.variableDeclaration("var", variableIds.map(id => types.variableDeclarator(id))));
          }
          if (exportNames.length) {
            beforeBody.push(...constructExportCall(path, types.identifier(exportIdent), exportNames, exportValues, null, stringSpecifiers));
          }
          path.traverse({
            "AssignmentExpression|UpdateExpression"(path) {
              if (reassignmentVisited.has(path.node)) return;
              reassignmentVisited.add(path.node);
              const arg = path.isAssignmentExpression() ? path.get("left") : path.get("argument");
              if (arg.isObjectPattern() || arg.isArrayPattern()) {
                const exprs = [path.node];
                for (const name of Object.keys(arg.getBindingIdentifiers())) {
                  if (this.scope.getBinding(name) !== path.scope.getBinding(name)) {
                    return;
                  }
                  const exportedNames = this.exports[name];
                  if (!exportedNames) continue;
                  for (const exportedName of exportedNames) {
                    exprs.push(this.buildCall(exportedName, types.identifier(name)).expression);
                  }
                }
                path.replaceWith(types.sequenceExpression(exprs));
                return;
              }
              if (!arg.isIdentifier()) return;
              const name = arg.node.name;
              if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;
              const exportedNames = this.exports[name];
              if (!exportedNames) return;
              let node = path.node;
              const isPostUpdateExpression = types.isUpdateExpression(node, {
                prefix: false
              });
              if (isPostUpdateExpression) {
                node = types.binaryExpression(node.operator[0], types.unaryExpression("+", types.cloneNode(node.argument)), types.numericLiteral(1));
              }
              for (const exportedName of exportedNames) {
                node = this.buildCall(exportedName, node).expression;
              }
              if (isPostUpdateExpression) {
                node = types.sequenceExpression([node, path.node]);
              }
              path.replaceWith(node);
            }
          }, {
            exports: exportMap,
            buildCall: buildExportCall,
            scope
          });
          for (const path of removedPaths) {
            path.remove();
          }
          const hasTLA = types.traverseFast(path.node, node => {
            if (types.isFunction(node)) return types.traverseFast.skip;
            if (types.isAwaitExpression(node)) {
              return types.traverseFast.stop;
            }
          });
          path.node.body = [buildTemplate({
            SYSTEM_REGISTER: types.memberExpression(types.identifier(systemGlobal), types.identifier("register")),
            BEFORE_BODY: beforeBody,
            MODULE_NAME: moduleName,
            SETTERS: types.arrayExpression(setters),
            EXECUTE: types.functionExpression(null, [], types.blockStatement(path.node.body), false, hasTLA),
            SOURCES: types.arrayExpression(sources),
            EXPORT_IDENTIFIER: types.identifier(exportIdent),
            CONTEXT_IDENTIFIER: types.identifier(contextIdent)
          })];
          path.requeue(path.get("body.0"));
        }
      }
    })
  };
});

export { index as default, getExportSpecifierName };
//# sourceMappingURL=index.js.map
