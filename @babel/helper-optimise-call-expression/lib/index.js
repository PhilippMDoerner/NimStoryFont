import * as _t from '@babel/types';

const {
  callExpression,
  identifier,
  isIdentifier,
  isSpreadElement,
  memberExpression,
  optionalCallExpression,
  optionalMemberExpression
} = _t;
function optimiseCallExpression(callee, thisNode, args, optional) {
  if (args.length === 1 && isSpreadElement(args[0]) && isIdentifier(args[0].argument, {
    name: "arguments"
  })) {
    if (optional) {
      return optionalCallExpression(optionalMemberExpression(callee, identifier("apply"), false, true), [thisNode, args[0].argument], false);
    }
    return callExpression(memberExpression(callee, identifier("apply")), [thisNode, args[0].argument]);
  } else {
    if (optional) {
      return optionalCallExpression(optionalMemberExpression(callee, identifier("call"), false, true), [thisNode, ...args], false);
    }
    return callExpression(memberExpression(callee, identifier("call")), [thisNode, ...args]);
  }
}

export { optimiseCallExpression as default };
//# sourceMappingURL=index.js.map
