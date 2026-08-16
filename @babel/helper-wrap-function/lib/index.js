import template from '@babel/template';
import * as _t from '@babel/types';

const {
  blockStatement,
  callExpression,
  functionExpression,
  isAssignmentPattern,
  isFunctionDeclaration,
  isRestElement,
  returnStatement,
  isCallExpression,
  memberExpression,
  identifier,
  thisExpression,
  isPattern
} = _t;
const buildAnonymousExpressionWrapper = template.expression(`
  (function () {
    var REF = FUNCTION;
    return function NAME(PARAMS) {
      return REF.apply(this, arguments);
    };
  })()
`);
const buildNamedExpressionWrapper = template.expression(`
  (function () {
    var REF = FUNCTION;
    function NAME(PARAMS) {
      return REF.apply(this, arguments);
    }
    return NAME;
  })()
`);
const buildDeclarationWrapper = template.statements(`
  function NAME(PARAMS) { return REF.apply(this, arguments); }
  function REF() {
    REF = FUNCTION;
    return REF.apply(this, arguments);
  }
`);
function classOrObjectMethod(path, callId, ignoreFunctionLength) {
  const node = path.node;
  const body = node.body;
  let params = [];
  const shouldForwardParams = node.params.some(p => isPattern(p));
  if (shouldForwardParams) {
    params = node.params;
    node.params = [];
    if (!ignoreFunctionLength) {
      for (const param of params) {
        if (isAssignmentPattern(param) || isRestElement(param)) {
          break;
        }
        node.params.push(path.scope.generateUidIdentifier("x"));
      }
    }
  }
  const container = functionExpression(null, params, blockStatement(body.body), true);
  if (shouldForwardParams) {
    body.body = [returnStatement(callExpression(memberExpression(callExpression(callId, [container]), identifier("apply")), [thisExpression(), identifier("arguments")]))];
    path.get("body.body.0.argument.callee.object.arguments.0").unwrapFunctionEnvironment();
  } else {
    body.body = [returnStatement(callExpression(callExpression(callId, [container]), []))];
    path.get("body.body.0.argument.callee.arguments.0").unwrapFunctionEnvironment();
  }
  node.async = false;
  node.generator = false;
}
function plainFunction(inPath, callId, noNewArrows, ignoreFunctionLength) {
  let path = inPath;
  let functionId = null;
  const nodeParams = inPath.node.params;
  if (path.isArrowFunctionExpression()) {
    path = path.arrowFunctionToExpression({
      noNewArrows
    });
  }
  const node = path.node;
  const isDeclaration = isFunctionDeclaration(node);
  let built = node;
  if (!isCallExpression(node)) {
    functionId = node.id;
    node.id = null;
    node.type = "FunctionExpression";
    built = callExpression(callId, [node]);
  }
  const params = [];
  for (const param of nodeParams) {
    if (isAssignmentPattern(param) || isRestElement(param)) {
      break;
    }
    params.push(path.scope.generateUidIdentifier("x"));
  }
  const wrapperArgs = {
    NAME: functionId || null,
    REF: path.scope.generateUidIdentifier(functionId ? functionId.name : "ref"),
    FUNCTION: built,
    PARAMS: params
  };
  if (isDeclaration) {
    const container = buildDeclarationWrapper(wrapperArgs);
    path.replaceWith(container[0]);
    path.insertAfter(container[1]);
  } else {
    let container;
    if (functionId) {
      container = buildNamedExpressionWrapper(wrapperArgs);
    } else {
      container = buildAnonymousExpressionWrapper(wrapperArgs);
    }
    if (functionId || !ignoreFunctionLength && params.length) {
      path.replaceWith(container);
    } else {
      path.replaceWith(built);
    }
  }
}
function wrapFunction(path, callId, noNewArrows = true, ignoreFunctionLength = false) {
  if (path.isMethod()) {
    classOrObjectMethod(path, callId, ignoreFunctionLength);
  } else {
    path = path.ensureFunctionName(false);
    plainFunction(path, callId, noNewArrows, ignoreFunctionLength);
  }
}

export { wrapFunction as default };
//# sourceMappingURL=index.js.map
