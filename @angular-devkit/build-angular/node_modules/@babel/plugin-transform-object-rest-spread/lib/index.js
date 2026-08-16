import { declare } from '@babel/helper-plugin-utils';
import { types } from '@babel/core';
import { convertFunctionParams } from '@babel/plugin-transform-parameters';
import { isRequired } from '@babel/helper-compilation-targets';
import { unshiftForXStatementBody } from '@babel/plugin-transform-destructuring';

function shouldStoreRHSInTemporaryVariable(node) {
  if (!node) return false;
  if (node.type === "ArrayPattern") {
    const nonNullElements = node.elements.filter(element => element !== null && element.type !== "VoidPattern");
    if (nonNullElements.length > 1) return true;else return shouldStoreRHSInTemporaryVariable(nonNullElements[0]);
  } else if (node.type === "ObjectPattern") {
    const {
      properties
    } = node;
    if (properties.length > 1) return true;else if (properties.length === 0) return false;else {
      const firstProperty = properties[0];
      if (firstProperty.type === "ObjectProperty") {
        return shouldStoreRHSInTemporaryVariable(firstProperty.value);
      } else {
        return shouldStoreRHSInTemporaryVariable(firstProperty);
      }
    }
  } else if (node.type === "AssignmentPattern") {
    return shouldStoreRHSInTemporaryVariable(node.left);
  } else if (node.type === "RestElement") {
    if (node.argument.type === "Identifier") return true;
    return shouldStoreRHSInTemporaryVariable(node.argument);
  } else {
    return false;
  }
}

const compatData = {
  "Object.assign": {
    chrome: "49",
    opera: "36",
    edge: "13",
    firefox: "36",
    safari: "10",
    node: "6",
    deno: "1",
    ios: "10",
    samsung: "5",
    opera_mobile: "36",
    electron: "0.37"
  }
};

const index = declare((api, opts) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in opts) {
    console.warn("@babel/plugin-transform-object-rest-spread: The 'loose' option has been deprecated, " + "use the `ignoreFunctionLength`, `objectRestNoSymbols`, `pureGetters`, and `setSpreadProperties` assumptions instead (https://babeljs.io/assumptions).");
  }
  const targets = api.targets();
  const supportsObjectAssign = !isRequired("Object.assign", targets, {
    compatData
  });
  const {
    useBuiltIns = supportsObjectAssign,
    loose = false
  } = opts;
  if (typeof loose !== "boolean") {
    throw new Error(".loose must be a boolean, or undefined");
  }
  const ignoreFunctionLength = api.assumption("ignoreFunctionLength") ?? loose;
  const objectRestNoSymbols = api.assumption("objectRestNoSymbols") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;
  const setSpreadProperties = api.assumption("setSpreadProperties") ?? loose;
  function getExtendsHelper(file) {
    return useBuiltIns ? types.memberExpression(types.identifier("Object"), types.identifier("assign")) : file.addHelper("extends");
  }
  function* iterateObjectRestElement(path) {
    switch (path.type) {
      case "ArrayPattern":
        for (const elementPath of path.get("elements")) {
          if (elementPath.isRestElement()) {
            yield* iterateObjectRestElement(elementPath.get("argument"));
          } else {
            yield* iterateObjectRestElement(elementPath);
          }
        }
        break;
      case "ObjectPattern":
        for (const propertyPath of path.get("properties")) {
          if (propertyPath.isRestElement()) {
            yield propertyPath;
          } else {
            yield* iterateObjectRestElement(propertyPath.get("value"));
          }
        }
        break;
      case "AssignmentPattern":
        yield* iterateObjectRestElement(path.get("left"));
        break;
    }
  }
  function hasObjectRestElement(path) {
    const objectRestPatternIterator = iterateObjectRestElement(path);
    return !objectRestPatternIterator.next().done;
  }
  function visitObjectRestElements(path, visitor) {
    for (const restElementPath of iterateObjectRestElement(path)) {
      visitor(restElementPath);
    }
  }
  function hasSpread(node) {
    for (const prop of node.properties) {
      if (types.isSpreadElement(prop)) {
        return true;
      }
    }
    return false;
  }
  function extractNormalizedKeys(pattern) {
    const propsList = pattern.get("properties").map(p => p.node);
    const keys = [];
    let allPrimitives = true;
    let hasTemplateLiteral = false;
    for (const prop of propsList) {
      const key = prop.key;
      if (types.isIdentifier(key) && !prop.computed) {
        keys.push(types.stringLiteral(key.name));
      } else if (types.isTemplateLiteral(key)) {
        keys.push(types.cloneNode(key));
        hasTemplateLiteral = true;
      } else if (types.isLiteral(key)) {
        keys.push(types.stringLiteral(String(key.value)));
      } else {
        if (types.isAssignmentExpression(key) && types.isIdentifier(key.left)) {
          keys.push(types.cloneNode(key.left));
        } else {
          keys.push(types.cloneNode(key));
        }
        const keyToCheck = types.isAssignmentExpression(key) ? key.right : key;
        if (types.isMemberExpression(keyToCheck, {
          computed: false
        }) && types.isIdentifier(keyToCheck.object, {
          name: "Symbol"
        }) || types.isCallExpression(keyToCheck) && types.matchesPattern(keyToCheck.callee, "Symbol.for")) ; else {
          allPrimitives = false;
        }
      }
    }
    return {
      keys,
      allPrimitives,
      hasTemplateLiteral
    };
  }
  function replaceImpureComputedKeys(properties, scope) {
    const tempVariableDeclarations = [];
    for (const property of properties) {
      const keyExpression = property.get("key");
      if (keyExpression.isAssignmentExpression() && keyExpression.get("left").isIdentifier()) {
        const identName = keyExpression.node.left.name;
        if (scope.hasUid(identName)) {
          continue;
        }
      }
      if (property.node.computed && !keyExpression.isPure()) {
        const tempVariableName = scope.generateUidBasedOnNode(keyExpression.node);
        const tempVariableDeclaration = types.variableDeclarator(types.identifier(tempVariableName), keyExpression.node);
        tempVariableDeclarations.push(tempVariableDeclaration);
        keyExpression.replaceWith(types.identifier(tempVariableName));
      }
    }
    return tempVariableDeclarations;
  }
  function removeUnusedExcludedKeys(path) {
    const bindings = path.getOuterBindingIdentifierPaths();
    Object.keys(bindings).forEach(bindingName => {
      const bindingParentPath = bindings[bindingName].parentPath;
      if (path.scope.getBinding(bindingName).references > 0 || !bindingParentPath.isObjectProperty()) {
        return;
      }
      bindingParentPath.remove();
    });
  }
  function collectComputedKeysInSourceOrder(destructuringPattern) {
    const computedProperties = [];
    function visitPattern(pattern) {
      if (pattern.isObjectPattern()) {
        const properties = pattern.get("properties");
        for (const property of properties) {
          if (property.isRestElement()) continue;
          if (property.node.computed) {
            computedProperties.push(property);
          }
          const nestedPattern = property.get("value");
          visitPattern(nestedPattern);
        }
      } else if (pattern.isArrayPattern()) {
        for (const element of pattern.get("elements")) {
          if (!element) continue;
          if (element.isRestElement()) {
            const restArgument = element.get("argument");
            visitPattern(restArgument);
          } else {
            visitPattern(element);
          }
        }
      } else if (pattern.isAssignmentPattern()) {
        visitPattern(pattern.get("left"));
      }
    }
    visitPattern(destructuringPattern);
    return computedProperties;
  }
  function createObjectRest(path, file, objRef) {
    const props = path.get("properties");
    const last = props[props.length - 1];
    types.assertRestElement(last.node);
    const restElement = types.cloneNode(last.node);
    last.remove();
    const impureComputedPropertyDeclarators = replaceImpureComputedKeys(path.get("properties"), path.scope);
    const {
      keys,
      allPrimitives,
      hasTemplateLiteral
    } = extractNormalizedKeys(path);
    if (keys.length === 0) {
      return [impureComputedPropertyDeclarators, restElement.argument, types.callExpression(getExtendsHelper(file), [types.objectExpression([]), types.sequenceExpression([types.callExpression(file.addHelper("objectDestructuringEmpty"), [types.cloneNode(objRef)]), types.cloneNode(objRef)])])];
    }
    let keyExpression;
    if (!allPrimitives) {
      keyExpression = types.callExpression(types.memberExpression(types.arrayExpression(keys), types.identifier("map")), [file.addHelper("toPropertyKey")]);
    } else {
      keyExpression = types.arrayExpression(keys);
      if (!hasTemplateLiteral && !types.isProgram(path.scope.block)) {
        const program = path.findParent(path => path.isProgram());
        const id = path.scope.generateUidIdentifier("excluded");
        program.scope.push({
          id,
          init: keyExpression,
          kind: "const"
        });
        keyExpression = types.cloneNode(id);
      }
    }
    return [impureComputedPropertyDeclarators, restElement.argument, types.callExpression(file.addHelper(`objectWithoutProperties${objectRestNoSymbols ? "Loose" : ""}`), [types.cloneNode(objRef), keyExpression])];
  }
  function replaceRestElement(parentPath, paramPath, container) {
    if (paramPath.isAssignmentPattern()) {
      replaceRestElement(parentPath, paramPath.get("left"), container);
      return;
    }
    if (paramPath.isArrayPattern() && hasObjectRestElement(paramPath)) {
      const elements = paramPath.get("elements");
      for (let i = 0; i < elements.length; i++) {
        replaceRestElement(parentPath, elements[i], container);
      }
    }
    if (paramPath.isObjectPattern() && hasObjectRestElement(paramPath)) {
      const uid = parentPath.scope.generateUidIdentifier("ref");
      const declar = types.variableDeclaration("let", [types.variableDeclarator(paramPath.node, uid)]);
      if (container) {
        container.push(declar);
      } else {
        parentPath.ensureBlock();
        parentPath.get("body").unshiftContainer("body", declar);
      }
      paramPath.replaceWith(types.cloneNode(uid));
    }
  }
  return {
    name: "transform-object-rest-spread",
    manipulateOptions: undefined,
    visitor: {
      Function(path) {
        const params = path.get("params");
        const paramsWithRestElement = new Set();
        const idsInRestParams = new Set();
        for (let i = 0; i < params.length; ++i) {
          const param = params[i];
          if (hasObjectRestElement(param)) {
            paramsWithRestElement.add(i);
            for (const name of Object.keys(param.getBindingIdentifiers())) {
              idsInRestParams.add(name);
            }
          }
        }
        let idInRest = false;
        const IdentifierHandler = function (path, functionScope) {
          const name = path.node.name;
          if (path.scope.getBinding(name) === functionScope.getBinding(name) && idsInRestParams.has(name)) {
            idInRest = true;
            path.stop();
          }
        };
        let i;
        for (i = 0; i < params.length && !idInRest; ++i) {
          const param = params[i];
          if (!paramsWithRestElement.has(i)) {
            if (param.isReferencedIdentifier() || param.isBindingIdentifier()) {
              IdentifierHandler(param, path.scope);
            } else {
              param.traverse({
                "Scope|TypeAnnotation|TSTypeAnnotation": path => path.skip(),
                "ReferencedIdentifier|BindingIdentifier": IdentifierHandler
              }, path.scope);
            }
          }
        }
        if (!idInRest) {
          for (let i = 0; i < params.length; ++i) {
            const param = params[i];
            if (paramsWithRestElement.has(i)) {
              replaceRestElement(path, param);
            }
          }
        } else {
          const shouldTransformParam = idx => idx >= i - 1 || paramsWithRestElement.has(idx);
          convertFunctionParams(path, ignoreFunctionLength, shouldTransformParam, replaceRestElement);
        }
      },
      VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) {
          return;
        }
        let insertionPath = path;
        const originalPath = path;
        if (hasObjectRestElement(path.get("id"))) {
          const destructuringPattern = originalPath.get("id");
          const propertiesWithComputedKeys = collectComputedKeysInSourceOrder(destructuringPattern);
          for (const property of propertiesWithComputedKeys) {
            const computedKeyExpression = property.get("key");
            if (computedKeyExpression.isAssignmentExpression() && computedKeyExpression.get("left").isIdentifier() && originalPath.scope.hasUid(computedKeyExpression.node.left.name)) {
              continue;
            }
            if (!computedKeyExpression.isPure()) {
              const tempVariableName = originalPath.scope.generateUidBasedOnNode(computedKeyExpression.node);
              const tempIdentifier = types.identifier(tempVariableName);
              originalPath.scope.push({
                id: tempIdentifier,
                kind: "var"
              });
              computedKeyExpression.replaceWith(types.assignmentExpression("=", types.cloneNode(tempIdentifier), computedKeyExpression.node));
            }
          }
        }
        visitObjectRestElements(path.get("id"), path => {
          if (shouldStoreRHSInTemporaryVariable(originalPath.node.id) && !types.isIdentifier(originalPath.node.init)) {
            const initRef = path.scope.generateUidIdentifierBasedOnNode(originalPath.node.init, "ref");
            originalPath.insertBefore(types.variableDeclarator(initRef, originalPath.node.init));
            originalPath.replaceWith(types.variableDeclarator(originalPath.node.id, types.cloneNode(initRef)));
            return;
          }
          let ref = originalPath.node.init;
          const refPropertyPath = [];
          let kind;
          path.findParent(path => {
            if (path.isObjectProperty()) {
              refPropertyPath.unshift(path);
            } else if (path.isVariableDeclarator()) {
              kind = path.parentPath.node.kind;
              return true;
            }
            return false;
          });
          const impureObjRefComputedDeclarators = replaceImpureComputedKeys(refPropertyPath, path.scope);
          refPropertyPath.forEach(prop => {
            const keyPath = prop.get("key");
            let keyForMemberExpression = keyPath.node;
            if (types.isAssignmentExpression(keyPath.node)) {
              keyForMemberExpression = keyPath.node.left;
            }
            ref = types.memberExpression(ref, types.cloneNode(keyForMemberExpression), prop.node.computed || types.isLiteral(keyPath.node));
          });
          const objectPatternPath = path.parentPath;
          const [impureComputedPropertyDeclarators, argument, callExpression] = createObjectRest(objectPatternPath, file, ref);
          if (pureGetters) {
            removeUnusedExcludedKeys(objectPatternPath);
          }
          types.assertIdentifier(argument);
          insertionPath.insertBefore(impureComputedPropertyDeclarators);
          insertionPath.insertBefore(impureObjRefComputedDeclarators);
          insertionPath = insertionPath.insertAfter(types.variableDeclarator(argument, callExpression))[0];
          path.scope.registerBinding(kind, insertionPath);
          if (objectPatternPath.node.properties.length === 0) {
            objectPatternPath.findParent(path => path.isObjectProperty() || path.isVariableDeclarator()).remove();
          }
        });
      },
      ExportNamedDeclaration(path) {
        const declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        const hasRest = declaration.get("declarations").some(path => hasObjectRestElement(path.get("id")));
        if (!hasRest) return;
        path.splitExportDeclaration();
      },
      CatchClause(path) {
        const paramPath = path.get("param");
        replaceRestElement(path, paramPath);
      },
      AssignmentExpression(path, file) {
        const leftPath = path.get("left");
        if (leftPath.isObjectPattern() && hasObjectRestElement(leftPath)) {
          const nodes = [];
          const refName = path.scope.generateUidBasedOnNode(path.node.right, "ref");
          nodes.push(types.variableDeclaration("var", [types.variableDeclarator(types.identifier(refName), path.node.right)]));
          const [impureComputedPropertyDeclarators, argument, callExpression] = createObjectRest(leftPath, file, types.identifier(refName));
          if (impureComputedPropertyDeclarators.length > 0) {
            nodes.push(types.variableDeclaration("var", impureComputedPropertyDeclarators));
          }
          const nodeWithoutSpread = types.cloneNode(path.node);
          nodeWithoutSpread.right = types.identifier(refName);
          nodes.push(types.expressionStatement(nodeWithoutSpread));
          nodes.push(types.expressionStatement(types.assignmentExpression("=", argument, callExpression)));
          nodes.push(types.expressionStatement(types.identifier(refName)));
          path.replaceWithMultiple(nodes);
        }
      },
      ForXStatement(path) {
        const {
          node,
          scope
        } = path;
        const leftPath = path.get("left");
        if (!leftPath.isVariableDeclaration()) {
          if (!hasObjectRestElement(leftPath)) {
            return;
          }
          const temp = scope.generateUidIdentifier("ref");
          node.left = types.variableDeclaration("var", [types.variableDeclarator(temp)]);
          path.ensureBlock();
          const statementBody = path.node.body.body;
          const nodes = [];
          if (statementBody.length === 0 && path.isCompletionRecord()) {
            nodes.unshift(types.expressionStatement(types.buildUndefinedNode()));
          }
          nodes.unshift(types.expressionStatement(types.assignmentExpression("=", leftPath.node, types.cloneNode(temp))));
          unshiftForXStatementBody(path, nodes);
          scope.crawl();
          return;
        } else {
          const patternPath = leftPath.get("declarations")[0].get("id");
          if (!hasObjectRestElement(patternPath)) {
            return;
          }
          const left = leftPath.node;
          const pattern = patternPath.node;
          const key = scope.generateUidIdentifier("ref");
          node.left = types.variableDeclaration(left.kind, [types.variableDeclarator(key, null)]);
          path.ensureBlock();
          unshiftForXStatementBody(path, [types.variableDeclaration(node.left.kind, [types.variableDeclarator(pattern, types.cloneNode(key))])]);
          scope.crawl();
          return;
        }
      },
      ArrayPattern(path) {
        const objectPatterns = [];
        const {
          scope
        } = path;
        const uidIdentifiers = [];
        visitObjectRestElements(path, path => {
          const objectPattern = path.parentPath;
          const uid = scope.generateUidIdentifier("ref");
          objectPatterns.push({
            left: objectPattern.node,
            right: uid
          });
          uidIdentifiers.push(uid);
          objectPattern.replaceWith(types.cloneNode(uid));
          path.skip();
        });
        if (objectPatterns.length > 0) {
          const patternParentPath = path.findParent(path => !(path.isPattern() || path.isObjectProperty()));
          const patternParent = patternParentPath.node;
          switch (patternParent.type) {
            case "VariableDeclarator":
              patternParentPath.insertAfter(objectPatterns.map(({
                left,
                right
              }) => types.variableDeclarator(left, right)));
              break;
            case "AssignmentExpression":
              {
                for (const uidIdentifier of uidIdentifiers) {
                  scope.push({
                    id: types.cloneNode(uidIdentifier)
                  });
                }
                patternParentPath.insertAfter(objectPatterns.map(({
                  left,
                  right
                }) => types.assignmentExpression("=", left, right)));
              }
              break;
            default:
              throw new Error(`Unexpected pattern parent type: ${patternParent.type}`);
          }
        }
      },
      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;
        let helper;
        if (setSpreadProperties) {
          helper = getExtendsHelper(file);
        } else {
          helper = file.addHelper("objectSpread2");
        }
        let exp = null;
        let props = [];
        function make() {
          const hadProps = props.length > 0;
          const obj = types.objectExpression(props);
          props = [];
          if (!exp) {
            exp = types.callExpression(helper, [obj]);
            return;
          }
          if (pureGetters) {
            if (hadProps) {
              exp.arguments.push(obj);
            }
            return;
          }
          exp = types.callExpression(types.cloneNode(helper), [exp, ...(hadProps ? [types.objectExpression([]), obj] : [])]);
        }
        for (const prop of path.node.properties) {
          if (types.isSpreadElement(prop)) {
            make();
            exp.arguments.push(prop.argument);
          } else {
            props.push(prop);
          }
        }
        if (props.length) make();
        path.replaceWith(exp);
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
