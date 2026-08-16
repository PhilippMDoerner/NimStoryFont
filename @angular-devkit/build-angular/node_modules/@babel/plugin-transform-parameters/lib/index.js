import { declare } from '@babel/helper-plugin-utils';
import { traverse, types, template } from '@babel/core';

let iifeVisitor;
const getIIFEVisitor = () => iifeVisitor ??= traverse.explode({
  "ReferencedIdentifier|BindingIdentifier"(path, state) {
    const {
      scope,
      node
    } = path;
    const {
      name
    } = node;
    if (name === "eval" || scope.getBinding(name) === state.scope.parent.getBinding(name) && state.scope.hasOwnBinding(name)) {
      state.needsOuterBinding = true;
      path.stop();
    }
  },
  "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration": path => path.skip()
});
function collectShadowedParamsNames(param, functionScope, shadowedParams) {
  for (const name of Object.keys(param.getBindingIdentifiers())) {
    const constantViolations = functionScope.bindings[name]?.constantViolations;
    if (constantViolations) {
      for (const redeclarator of constantViolations) {
        const node = redeclarator.node;
        switch (node.type) {
          case "VariableDeclarator":
            {
              if (node.init === null) {
                const declaration = redeclarator.parentPath;
                if (!declaration.parentPath.isFor() || declaration.parentPath.get("body") === declaration) {
                  redeclarator.remove();
                  break;
                }
              }
              shadowedParams.add(name);
              break;
            }
          case "FunctionDeclaration":
            shadowedParams.add(name);
            break;
        }
      }
    }
  }
}
function buildScopeIIFE(shadowedParams, body) {
  const args = [];
  const params = [];
  for (const name of shadowedParams) {
    args.push(types.identifier(name));
    params.push(types.identifier(name));
  }
  return types.returnStatement(types.callExpression(types.arrowFunctionExpression(params, body), args));
}

const buildDefaultParam = template.statement(`
  let VARIABLE_NAME =
    arguments.length > ARGUMENT_KEY && arguments[ARGUMENT_KEY] !== undefined ?
      arguments[ARGUMENT_KEY]
    :
      DEFAULT_VALUE;
`);
const buildLooseDefaultParam = template.statement(`
  if (ASSIGNMENT_IDENTIFIER === UNDEFINED) {
    ASSIGNMENT_IDENTIFIER = DEFAULT_VALUE;
  }
`);
const buildLooseDestructuredDefaultParam = template.statement(`
  let ASSIGNMENT_IDENTIFIER = PARAMETER_NAME === UNDEFINED ? DEFAULT_VALUE : PARAMETER_NAME ;
`);
const buildSafeArgumentsAccess = template.statement(`
  let $0 = arguments.length > $1 ? arguments[$1] : undefined;
`);
function convertFunctionParams(path, ignoreFunctionLength, shouldTransformParam, replaceRestElement) {
  const params = path.get("params");
  const isSimpleParameterList = params.every(param => param.isIdentifier());
  if (isSimpleParameterList) return false;
  const {
    node,
    scope
  } = path;
  const body = [];
  const shadowedParams = new Set();
  for (const param of params) {
    collectShadowedParamsNames(param, scope, shadowedParams);
  }
  const state = {
    needsOuterBinding: false,
    scope
  };
  if (shadowedParams.size === 0) {
    for (const param of params) {
      if (!param.isIdentifier()) param.traverse(getIIFEVisitor(), state);
      if (state.needsOuterBinding) break;
    }
  }
  let firstOptionalIndex = null;
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (shouldTransformParam && !shouldTransformParam(i)) {
      continue;
    }
    const transformedRestNodes = [];
    if (replaceRestElement) {
      replaceRestElement(path, param, transformedRestNodes);
    }
    const paramIsAssignmentPattern = param.isAssignmentPattern();
    if (paramIsAssignmentPattern && (ignoreFunctionLength || types.isMethod(node, {
      kind: "set"
    }))) {
      const left = param.get("left");
      const right = param.get("right");
      const undefinedNode = types.buildUndefinedNode();
      if (left.isIdentifier()) {
        body.push(buildLooseDefaultParam({
          ASSIGNMENT_IDENTIFIER: types.cloneNode(left.node),
          DEFAULT_VALUE: right.node,
          UNDEFINED: undefinedNode
        }));
        param.replaceWith(left.node);
      } else if (left.isObjectPattern() || left.isArrayPattern()) {
        const paramName = scope.generateUidIdentifier();
        body.push(buildLooseDestructuredDefaultParam({
          ASSIGNMENT_IDENTIFIER: left.node,
          DEFAULT_VALUE: right.node,
          PARAMETER_NAME: types.cloneNode(paramName),
          UNDEFINED: undefinedNode
        }));
        param.replaceWith(paramName);
      }
    } else if (paramIsAssignmentPattern) {
      if (firstOptionalIndex === null) firstOptionalIndex = i;
      const left = param.get("left");
      const right = param.get("right");
      const defNode = buildDefaultParam({
        VARIABLE_NAME: left.node,
        DEFAULT_VALUE: right.node,
        ARGUMENT_KEY: types.numericLiteral(i)
      });
      body.push(defNode);
    } else if (firstOptionalIndex !== null) {
      const defNode = buildSafeArgumentsAccess([param.node, types.numericLiteral(i)]);
      body.push(defNode);
    } else if (param.isObjectPattern() || param.isArrayPattern()) {
      const uid = path.scope.generateUidIdentifier("ref");
      uid.typeAnnotation = param.node.typeAnnotation;
      const defNode = types.variableDeclaration("let", [types.variableDeclarator(param.node, uid)]);
      body.push(defNode);
      param.replaceWith(types.cloneNode(uid));
    }
    if (transformedRestNodes) {
      for (const transformedNode of transformedRestNodes) {
        body.push(transformedNode);
      }
    }
  }
  if (firstOptionalIndex !== null) {
    node.params = node.params.slice(0, firstOptionalIndex);
  }
  path.ensureBlock();
  const path2 = path;
  const {
    async,
    generator
  } = node;
  if (generator || state.needsOuterBinding || shadowedParams.size > 0) {
    body.push(buildScopeIIFE(shadowedParams, path2.node.body));
    path.set("body", types.blockStatement(body));
    const bodyPath = path2.get("body.body");
    const arrowPath = bodyPath[bodyPath.length - 1].get("argument.callee");
    arrowPath.arrowFunctionToExpression();
    arrowPath.node.generator = generator;
    arrowPath.node.async = async;
    node.generator = false;
    node.async = false;
    if (async && !generator) {
      path2.node.body = template.statement.ast`{
        try {
          ${path2.node.body.body}
        } catch (e) {
          return Promise.reject(e);
        }
      }`;
    }
  } else {
    path2.get("body").unshiftContainer("body", body);
  }
  return true;
}

const buildRest = template.statement(`
  for (var LEN = ARGUMENTS.length,
           ARRAY = new Array(ARRAY_LEN),
           KEY = START;
       KEY < LEN;
       KEY++) {
    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];
  }
`);
const restIndex = template.expression(`
  (INDEX < OFFSET || ARGUMENTS.length <= INDEX) ? undefined : ARGUMENTS[INDEX]
`);
const restIndexImpure = template.expression(`
  REF = INDEX, (REF < OFFSET || ARGUMENTS.length <= REF) ? undefined : ARGUMENTS[REF]
`);
const restLength = template.expression(`
  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET
`);
function referencesRest(path, state) {
  if (path.node.name === state.name) {
    return path.scope.bindingIdentifierEquals(state.name, state.outerBinding);
  }
  return false;
}
const memberExpressionOptimisationVisitor = {
  Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      path.skip();
    }
  },
  Flow(path) {
    if (path.isTypeCastExpression()) return;
    path.skip();
  },
  Function(path, state) {
    const oldNoOptimise = state.noOptimise;
    state.noOptimise = true;
    path.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = oldNoOptimise;
    path.skip();
  },
  ReferencedIdentifier(path, state) {
    const {
      node
    } = path;
    if (node.name === "arguments") {
      state.deopted = true;
    }
    if (!referencesRest(path, state)) return;
    if (state.noOptimise) {
      state.deopted = true;
    } else {
      const {
        parentPath
      } = path;
      if (parentPath.listKey === "params" && parentPath.key < state.offset) {
        return;
      }
      if (parentPath.isMemberExpression({
        object: node
      })) {
        const grandparentPath = parentPath.parentPath;
        const argsOptEligible = !state.deopted && !(grandparentPath.isAssignmentExpression() && parentPath.node === grandparentPath.node.left || grandparentPath.isLVal() || grandparentPath.isForXStatement() || grandparentPath.isUpdateExpression() || grandparentPath.isUnaryExpression({
          operator: "delete"
        }) || (grandparentPath.isCallExpression() || grandparentPath.isNewExpression()) && parentPath.node === grandparentPath.node.callee);
        if (argsOptEligible) {
          if (parentPath.node.computed) {
            if (parentPath.get("property").isBaseType("number")) {
              state.candidates.push({
                cause: "indexGetter",
                path
              });
              return;
            }
          } else if (parentPath.node.property.name === "length") {
            state.candidates.push({
              cause: "lengthGetter",
              path
            });
            return;
          }
        }
      }
      if (state.offset === 0 && parentPath.isSpreadElement()) {
        const call = parentPath.parentPath;
        if (call.isCallExpression() && call.node.arguments.length === 1) {
          state.candidates.push({
            cause: "argSpread",
            path
          });
          return;
        }
      }
      state.references.push(path);
    }
  },
  BindingIdentifier(path, state) {
    if (referencesRest(path, state)) {
      state.deopted = true;
    }
  }
};
function getParamsCount(node) {
  let count = node.params.length;
  if (count > 0 && types.isIdentifier(node.params[0], {
    name: "this"
  })) {
    count -= 1;
  }
  return count;
}
function hasRest(node) {
  const length = node.params.length;
  return length > 0 && types.isRestElement(node.params[length - 1]);
}
function optimiseIndexGetter(path, argsId, offset) {
  const offsetLiteral = types.numericLiteral(offset);
  let index;
  const parent = path.parent;
  if (types.isNumericLiteral(parent.property)) {
    index = types.numericLiteral(parent.property.value + offset);
  } else if (offset === 0) {
    index = parent.property;
  } else {
    index = types.binaryExpression("+", parent.property, types.cloneNode(offsetLiteral));
  }
  const {
    scope,
    parentPath
  } = path;
  if (!scope.isPure(index)) {
    const temp = scope.generateUidIdentifierBasedOnNode(index);
    scope.push({
      id: temp,
      kind: "var"
    });
    parentPath.replaceWith(restIndexImpure({
      ARGUMENTS: argsId,
      OFFSET: offsetLiteral,
      INDEX: index,
      REF: types.cloneNode(temp)
    }));
  } else {
    parentPath.replaceWith(restIndex({
      ARGUMENTS: argsId,
      OFFSET: offsetLiteral,
      INDEX: index
    }));
    const replacedParentPath = parentPath;
    const offsetTestPath = replacedParentPath.get("test");
    const valRes = offsetTestPath.get("left").evaluate();
    if (valRes.confident) {
      if (valRes.value === true) {
        replacedParentPath.replaceWith(types.buildUndefinedNode());
      } else {
        offsetTestPath.replaceWith(offsetTestPath.get("right"));
      }
    }
  }
}
function optimiseLengthGetter(path, argsId, offset) {
  if (offset) {
    path.parentPath.replaceWith(restLength({
      ARGUMENTS: argsId,
      OFFSET: types.numericLiteral(offset)
    }));
  } else {
    path.replaceWith(argsId);
  }
}
function convertFunctionRest(path) {
  const {
    node,
    scope
  } = path;
  if (!hasRest(node)) return false;
  const restPath = path.get(`params.${node.params.length - 1}.argument`);
  if (!restPath.isIdentifier()) {
    const shadowedParams = new Set();
    collectShadowedParamsNames(restPath, path.scope, shadowedParams);
    let needsIIFE = shadowedParams.size > 0;
    if (!needsIIFE) {
      const state = {
        needsOuterBinding: false,
        scope
      };
      restPath.traverse(getIIFEVisitor(), state);
      needsIIFE = state.needsOuterBinding;
    }
    if (needsIIFE) {
      path.ensureBlock();
      path.set("body", types.blockStatement([buildScopeIIFE(shadowedParams, path.node.body)]));
    }
  }
  let rest = restPath.node;
  node.params.pop();
  if (types.isPattern(rest)) {
    const pattern = rest;
    rest = scope.generateUidIdentifier("ref");
    const declar = types.variableDeclaration("let", [types.variableDeclarator(pattern, rest)]);
    path.ensureBlock();
    node.body.body.unshift(declar);
  } else if (rest.name === "arguments") {
    scope.rename(rest.name);
  }
  const argsId = types.identifier("arguments");
  const paramsCount = getParamsCount(node);
  const state = {
    references: [],
    offset: paramsCount,
    argumentsNode: argsId,
    outerBinding: scope.getBindingIdentifier(rest.name),
    candidates: [],
    name: rest.name,
    deopted: false
  };
  path.traverse(memberExpressionOptimisationVisitor, state);
  if (!state.deopted && !state.references.length) {
    for (const {
      path,
      cause
    } of state.candidates) {
      const clonedArgsId = types.cloneNode(argsId);
      switch (cause) {
        case "indexGetter":
          optimiseIndexGetter(path, clonedArgsId, state.offset);
          break;
        case "lengthGetter":
          optimiseLengthGetter(path, clonedArgsId, state.offset);
          break;
        default:
          path.replaceWith(clonedArgsId);
      }
    }
    return true;
  }
  state.references.push(...state.candidates.map(({
    path
  }) => path));
  const start = types.numericLiteral(paramsCount);
  const key = scope.generateUidIdentifier("key");
  const len = scope.generateUidIdentifier("len");
  let arrKey, arrLen;
  if (paramsCount) {
    arrKey = types.binaryExpression("-", types.cloneNode(key), types.cloneNode(start));
    arrLen = types.conditionalExpression(types.binaryExpression(">", types.cloneNode(len), types.cloneNode(start)), types.binaryExpression("-", types.cloneNode(len), types.cloneNode(start)), types.numericLiteral(0));
  } else {
    arrKey = types.identifier(key.name);
    arrLen = types.identifier(len.name);
  }
  const loop = buildRest({
    ARGUMENTS: argsId,
    ARRAY_KEY: arrKey,
    ARRAY_LEN: arrLen,
    START: start,
    ARRAY: rest,
    KEY: key,
    LEN: len
  });
  if (state.deopted) {
    node.body.body.unshift(loop);
  } else {
    let target = path.getEarliestCommonAncestorFrom(state.references).getStatementParent();
    target.findParent(path => {
      if (path.isLoop()) {
        target = path;
      } else {
        return path.isFunction();
      }
      return false;
    });
    target.insertBefore(loop);
  }
  return true;
}

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-parameters: The 'loose' option has been deprecated, " + "use the `ignoreFunctionLength` assumption instead (https://babeljs.io/assumptions).");
  }
  const ignoreFunctionLength = api.assumption("ignoreFunctionLength") ?? options.loose;
  const noNewArrows = api.assumption("noNewArrows") ?? true;
  return {
    name: "transform-parameters",
    visitor: {
      Function(path) {
        if (path.isArrowFunctionExpression() && path.get("params").some(param => param.isRestElement() || param.isAssignmentPattern())) {
          path.arrowFunctionToExpression({
            allowInsertArrowWithRest: false,
            noNewArrows
          });
          if (!path.isFunctionExpression()) return;
        }
        const convertedRest = convertFunctionRest(path);
        const convertedParams = convertFunctionParams(path, ignoreFunctionLength);
        if (convertedRest || convertedParams) {
          path.scope.crawl();
        }
      }
    }
  };
});

export { convertFunctionParams, index as default };
//# sourceMappingURL=index.js.map
