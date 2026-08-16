import memberExpressionToFunctions from '@babel/helper-member-expression-to-functions';
import optimiseCall from '@babel/helper-optimise-call-expression';
import { types, template } from '@babel/core';
import { visitors } from '@babel/traverse';

const {
  assignmentExpression,
  callExpression,
  cloneNode,
  identifier,
  memberExpression,
  sequenceExpression,
  stringLiteral,
  thisExpression
} = types;
const visitor = visitors.environmentVisitor({
  Super(path, state) {
    const {
      node,
      parentPath
    } = path;
    if (!parentPath.isMemberExpression({
      object: node
    })) return;
    state.handle(parentPath);
  }
});
const unshadowSuperBindingVisitor = visitors.environmentVisitor({
  Scopable(path, {
    refName
  }) {
    const binding = path.scope.getOwnBinding(refName);
    if (binding?.identifier.name === refName) {
      path.scope.rename(refName);
    }
  }
});
const specHandlers = {
  memoise(superMember, count) {
    const {
      scope,
      node
    } = superMember;
    const {
      computed,
      property
    } = node;
    if (!computed) {
      return;
    }
    const memo = scope.maybeGenerateMemoised(property);
    if (!memo) {
      return;
    }
    this.memoiser.set(property, memo, count);
  },
  prop(superMember) {
    const {
      computed,
      property
    } = superMember.node;
    if (this.memoiser.has(property)) {
      return cloneNode(this.memoiser.get(property));
    }
    if (computed) {
      return cloneNode(property);
    }
    return stringLiteral(property.name);
  },
  get(superMember) {
    const objectRef = cloneNode(this.getObjectRef());
    return callExpression(this.file.addHelper("superPropGet"), [this.isDerivedConstructor ? sequenceExpression([thisExpression(), objectRef]) : objectRef, this.prop(superMember), thisExpression(), ...(this.isStatic || this.isPrivateMethod ? [] : [types.numericLiteral(1)])]);
  },
  _call(superMember, args, optional) {
    const objectRef = cloneNode(this.getObjectRef());
    let argsNode;
    if (args.length === 1 && types.isSpreadElement(args[0]) && (types.isIdentifier(args[0].argument) || types.isArrayExpression(args[0].argument))) {
      argsNode = args[0].argument;
    } else {
      argsNode = types.arrayExpression(args);
    }
    const call = types.callExpression(this.file.addHelper("superPropGet"), [this.isDerivedConstructor ? sequenceExpression([thisExpression(), objectRef]) : objectRef, this.prop(superMember), thisExpression(), types.numericLiteral(2 | (this.isStatic || this.isPrivateMethod ? 0 : 1))]);
    if (optional) {
      return types.optionalCallExpression(call, [argsNode], true);
    }
    return callExpression(call, [argsNode]);
  },
  set(superMember, value) {
    const objectRef = cloneNode(this.getObjectRef());
    return callExpression(this.file.addHelper("superPropSet"), [this.isDerivedConstructor ? sequenceExpression([thisExpression(), objectRef]) : objectRef, this.prop(superMember), value, thisExpression(), types.numericLiteral(superMember.isInStrictMode() ? 1 : 0), ...(this.isStatic || this.isPrivateMethod ? [] : [types.numericLiteral(1)])]);
  },
  destructureSet(superMember) {
    throw superMember.buildCodeFrameError(`Destructuring to a super field is not supported yet.`);
  },
  call(superMember, args) {
    return this._call(superMember, args, false);
  },
  optionalCall(superMember, args) {
    return this._call(superMember, args, true);
  },
  delete(superMember) {
    if (superMember.node.computed) {
      return sequenceExpression([callExpression(this.file.addHelper("toPropertyKey"), [cloneNode(superMember.node.property)]), template.expression.ast`
          function () { throw new ReferenceError("'delete super[expr]' is invalid"); }()
        `]);
    } else {
      return template.expression.ast`
        function () { throw new ReferenceError("'delete super.prop' is invalid"); }()
      `;
    }
  }
};
const looseHandlers = {
  ...specHandlers,
  prop(superMember) {
    const {
      property
    } = superMember.node;
    if (this.memoiser.has(property)) {
      return cloneNode(this.memoiser.get(property));
    }
    return cloneNode(property);
  },
  get(superMember) {
    const {
      isStatic,
      getSuperRef
    } = this;
    const {
      computed
    } = superMember.node;
    const prop = this.prop(superMember);
    let object;
    if (isStatic) {
      object = getSuperRef() ?? memberExpression(identifier("Function"), identifier("prototype"));
    } else {
      object = memberExpression(getSuperRef() ?? identifier("Object"), identifier("prototype"));
    }
    return memberExpression(object, prop, computed);
  },
  set(superMember, value) {
    const {
      computed
    } = superMember.node;
    const prop = this.prop(superMember);
    return assignmentExpression("=", memberExpression(thisExpression(), prop, computed), value);
  },
  destructureSet(superMember) {
    const {
      computed
    } = superMember.node;
    const prop = this.prop(superMember);
    return memberExpression(thisExpression(), prop, computed);
  },
  call(superMember, args) {
    return optimiseCall(this.get(superMember), thisExpression(), args, false);
  },
  optionalCall(superMember, args) {
    return optimiseCall(this.get(superMember), thisExpression(), args, true);
  }
};
class ReplaceSupers {
  constructor(opts) {
    this.opts = opts;
  }
  replace() {
    const {
      opts
    } = this;
    const {
      methodPath,
      constantSuper
    } = opts;
    if (opts.refToPreserve) {
      methodPath.traverse(unshadowSuperBindingVisitor, {
        refName: opts.refToPreserve.name
      });
    }
    const handler = constantSuper ? looseHandlers : specHandlers;
    visitor.shouldSkip = path => {
      if (path.parentPath === methodPath) {
        if (path.parentKey === "decorators" || path.parentKey === "key") {
          return true;
        }
      }
    };
    memberExpressionToFunctions(methodPath, visitor, {
      file: opts.file,
      isDerivedConstructor: methodPath.isClassMethod({
        kind: "constructor"
      }) && !!opts.superRef,
      isStatic: methodPath.isObjectMethod() || methodPath.node.static || methodPath.isStaticBlock(),
      isPrivateMethod: methodPath.isClassPrivateMethod(),
      getObjectRef: () => {
        return cloneNode(opts.objectRef || opts.getObjectRef());
      },
      getSuperRef: () => {
        if (opts.superRef) return cloneNode(opts.superRef);
        if (opts.getSuperRef) {
          return cloneNode(opts.getSuperRef());
        }
      },
      boundGet: handler.get,
      ...handler
    });
  }
}

export { ReplaceSupers as default };
//# sourceMappingURL=index.js.map
