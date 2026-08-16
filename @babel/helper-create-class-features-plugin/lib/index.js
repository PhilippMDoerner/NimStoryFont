import { types, template } from '@babel/core';
import semver from 'semver';
import { visitors } from '@babel/traverse';
import ReplaceSupers from '@babel/helper-replace-supers';
import memberExpressionToFunctions from '@babel/helper-member-expression-to-functions';
import optimiseCall from '@babel/helper-optimise-call-expression';
import annotateAsPure from '@babel/helper-annotate-as-pure';
import { skipTransparentExprWrapperNodes, skipTransparentExprWrappers } from '@babel/helper-skip-transparent-expression-wrappers';

function assertFieldTransformed(path) {
  if (path.node.declare || path.isClassProperty({
    definite: true
  })) {
    throw path.buildCodeFrameError(`TypeScript 'declare' fields must first be transformed by ` + `@babel/plugin-transform-typescript.\n` + `If you have already enabled that plugin (or '@babel/preset-typescript'), make sure ` + `that it runs before any plugin related to additional class features:\n` + ` - @babel/plugin-transform-class-properties\n` + ` - @babel/plugin-transform-private-methods\n` + ` - @babel/plugin-proposal-decorators`);
  }
}

function buildPrivateNamesMap(className, privateFieldsAsSymbolsOrProperties, props) {
  const privateNamesMap = new Map();
  let classBrandId;
  for (const prop of props) {
    if (prop.isPrivate()) {
      const {
        name
      } = prop.node.key.id;
      let update = privateNamesMap.get(name);
      if (!update) {
        const isMethod = !prop.isProperty();
        const isStatic = prop.node.static;
        let initAdded = false;
        let id;
        if (!privateFieldsAsSymbolsOrProperties && isMethod && !isStatic) {
          initAdded = !!classBrandId;
          classBrandId ??= prop.scope.generateUidIdentifier(`${className}_brand`);
          id = classBrandId;
        } else {
          id = prop.scope.generateUidIdentifier(name);
        }
        update = {
          id,
          static: isStatic,
          method: isMethod,
          initAdded
        };
        privateNamesMap.set(name, update);
      }
      if (prop.isClassPrivateMethod()) {
        if (prop.node.kind === "get") {
          const {
            body
          } = prop.node.body;
          let $;
          if (body.length === 1 && types.isReturnStatement($ = body[0]) && types.isCallExpression($ = $.argument) && $.arguments.length === 1 && types.isThisExpression($.arguments[0]) && types.isIdentifier($ = $.callee)) {
            update.getId = types.cloneNode($);
            update.getterDeclared = true;
          } else {
            update.getId = prop.scope.generateUidIdentifier(`get_${name}`);
          }
        } else if (prop.node.kind === "set") {
          const {
            params
          } = prop.node;
          const {
            body
          } = prop.node.body;
          let $;
          if (body.length === 1 && types.isExpressionStatement($ = body[0]) && types.isCallExpression($ = $.expression) && $.arguments.length === 2 && types.isThisExpression($.arguments[0]) && types.isIdentifier($.arguments[1], {
            name: params[0].name
          }) && types.isIdentifier($ = $.callee)) {
            update.setId = types.cloneNode($);
            update.setterDeclared = true;
          } else {
            update.setId = prop.scope.generateUidIdentifier(`set_${name}`);
          }
        } else if (prop.node.kind === "method") {
          update.methodId = prop.scope.generateUidIdentifier(name);
        }
      }
      privateNamesMap.set(name, update);
    }
  }
  return privateNamesMap;
}
function buildPrivateNamesNodes(privateNamesMap, privateFieldsAsProperties, privateFieldsAsSymbols, state) {
  const initNodes = [];
  const injectedIds = new Set();
  for (const [name, value] of privateNamesMap) {
    const {
      static: isStatic,
      method: isMethod
    } = value;
    const id = types.cloneNode(value.id);
    let init;
    if (privateFieldsAsProperties) {
      init = types.callExpression(state.addHelper("classPrivateFieldLooseKey"), [types.stringLiteral(name)]);
    } else if (privateFieldsAsSymbols) {
      init = types.callExpression(types.identifier("Symbol"), [types.stringLiteral(name)]);
    } else if (!isStatic) {
      if (injectedIds.has(id.name)) continue;
      injectedIds.add(id.name);
      init = types.newExpression(types.identifier(isMethod ? "WeakSet" : "WeakMap"), []);
    }
    if (init) {
      if (!privateFieldsAsSymbols) {
        annotateAsPure(init);
      }
      initNodes.push(template.statement.ast`var ${id} = ${init}`);
    }
  }
  return initNodes;
}
function privateNameVisitorFactory(visitor) {
  const nestedVisitor = visitors.environmentVisitor({
    ...visitor
  });
  const privateNameVisitor = {
    ...visitor,
    Class(path) {
      const {
        privateNamesMap
      } = this;
      const body = path.get("body.body");
      const visiblePrivateNames = new Map(privateNamesMap);
      const redeclared = [];
      for (const prop of body) {
        if (!prop.isPrivate()) continue;
        const {
          name
        } = prop.node.key.id;
        visiblePrivateNames.delete(name);
        redeclared.push(name);
      }
      if (!redeclared.length) {
        return;
      }
      path.get("body").traverse(nestedVisitor, {
        ...this,
        redeclared
      });
      path.traverse(privateNameVisitor, {
        ...this,
        privateNamesMap: visiblePrivateNames
      });
      path.skipKey("body");
    }
  };
  return privateNameVisitor;
}
const privateNameVisitor = privateNameVisitorFactory({
  PrivateName(path, {
    noDocumentAll
  }) {
    const {
      privateNamesMap,
      redeclared
    } = this;
    const {
      node,
      parentPath
    } = path;
    if (!parentPath.isMemberExpression({
      property: node
    }) && !parentPath.isOptionalMemberExpression({
      property: node
    })) {
      return;
    }
    const {
      name
    } = node.id;
    if (!privateNamesMap.has(name)) return;
    if (redeclared?.includes(name)) return;
    this.handle(parentPath, noDocumentAll);
  }
});
function unshadow(name, scope, innerBinding) {
  while (scope?.hasBinding(name) && scope.getBindingIdentifier(name) !== innerBinding) {
    scope.rename(name);
    scope = scope.parent;
  }
}
function buildCheckInRHS(rhs, file, inRHSIsObject) {
  if (inRHSIsObject || !file.availableHelper?.("checkInRHS")) return rhs;
  return types.callExpression(file.addHelper("checkInRHS"), [rhs]);
}
const privateInVisitor = privateNameVisitorFactory({
  BinaryExpression(path, {
    file
  }) {
    const {
      operator,
      left,
      right
    } = path.node;
    if (operator !== "in") return;
    if (!types.isPrivateName(left)) return;
    const {
      privateFieldsAsProperties,
      privateNamesMap,
      redeclared
    } = this;
    const {
      name
    } = left.id;
    if (!privateNamesMap.has(name)) return;
    if (redeclared?.includes(name)) return;
    unshadow(this.classRef.name, path.scope, this.innerBinding);
    if (privateFieldsAsProperties) {
      const {
        id
      } = privateNamesMap.get(name);
      path.replaceWith(template.expression.ast`
        Object.prototype.hasOwnProperty.call(${buildCheckInRHS(right, file)}, ${types.cloneNode(id)})
      `);
      return;
    }
    const {
      id,
      static: isStatic
    } = privateNamesMap.get(name);
    if (isStatic) {
      path.replaceWith(template.expression.ast`${buildCheckInRHS(right, file)} === ${types.cloneNode(this.classRef)}`);
      return;
    }
    path.replaceWith(template.expression.ast`${types.cloneNode(id)}.has(${buildCheckInRHS(right, file)})`);
  }
});
function readOnlyError(file, name) {
  return types.callExpression(file.addHelper("readOnlyError"), [types.stringLiteral(`#${name}`)]);
}
function writeOnlyError(file, name) {
  return types.callExpression(file.addHelper("writeOnlyError"), [types.stringLiteral(`#${name}`)]);
}
function buildStaticPrivateFieldAccess(expr, noUninitializedPrivateFieldAccess) {
  if (noUninitializedPrivateFieldAccess) return expr;
  return types.memberExpression(expr, types.identifier("_"));
}
function autoInherits(fn) {
  return function (member) {
    return types.inherits(fn.apply(this, arguments), member.node);
  };
}
const privateNameHandlerSpec = {
  memoise(member, count) {
    const {
      scope
    } = member;
    const {
      object
    } = member.node;
    const memo = scope.maybeGenerateMemoised(object);
    if (!memo) {
      return;
    }
    this.memoiser.set(object, memo, count);
  },
  receiver(member) {
    const {
      object
    } = member.node;
    if (this.memoiser.has(object)) {
      return types.cloneNode(this.memoiser.get(object));
    }
    return types.cloneNode(object);
  },
  get: autoInherits(function (member) {
    const {
      classRef,
      privateNamesMap,
      file,
      innerBinding,
      noUninitializedPrivateFieldAccess
    } = this;
    const privateName = member.node.property;
    const {
      name
    } = privateName.id;
    const {
      id,
      static: isStatic,
      method: isMethod,
      methodId,
      getId,
      setId
    } = privateNamesMap.get(name);
    const isGetterOrSetter = getId || setId;
    const cloneId = id => types.inherits(types.cloneNode(id), privateName);
    if (isStatic) {
      unshadow(classRef.name, member.scope, innerBinding);
      const receiver = this.receiver(member);
      const skipCheck = types.isIdentifier(receiver) && receiver.name === classRef.name;
      if (!isMethod) {
        if (skipCheck) {
          return buildStaticPrivateFieldAccess(cloneId(id), noUninitializedPrivateFieldAccess);
        }
        return buildStaticPrivateFieldAccess(types.callExpression(file.addHelper("assertClassBrand"), [types.cloneNode(classRef), receiver, cloneId(id)]), noUninitializedPrivateFieldAccess);
      }
      if (getId) {
        if (skipCheck) {
          return types.callExpression(cloneId(getId), [receiver]);
        }
        return types.callExpression(file.addHelper("classPrivateGetter"), [types.cloneNode(classRef), receiver, cloneId(getId)]);
      }
      if (setId) {
        const err = types.buildUndefinedNode();
        if (skipCheck) return err;
        return types.sequenceExpression([types.callExpression(file.addHelper("assertClassBrand"), [types.cloneNode(classRef), receiver]), err]);
      }
      if (skipCheck) return cloneId(id);
      return types.callExpression(file.addHelper("assertClassBrand"), [types.cloneNode(classRef), receiver, cloneId(id)]);
    }
    if (isMethod) {
      if (isGetterOrSetter) {
        if (!getId) {
          return types.sequenceExpression([this.receiver(member), writeOnlyError(file, name)]);
        }
        return types.callExpression(file.addHelper("classPrivateGetter"), [types.cloneNode(id), this.receiver(member), cloneId(getId)]);
      }
      return types.callExpression(file.addHelper("assertClassBrand"), [types.cloneNode(id), this.receiver(member), cloneId(methodId)]);
    }
    return types.callExpression(file.addHelper("classPrivateFieldGet2"), [cloneId(id), this.receiver(member)]);
  }),
  boundGet(member) {
    this.memoise(member, 1);
    return types.callExpression(types.memberExpression(this.get(member), types.identifier("bind")), [this.receiver(member)]);
  },
  set: autoInherits(function (member, value) {
    const {
      classRef,
      privateNamesMap,
      file,
      noUninitializedPrivateFieldAccess
    } = this;
    const privateName = member.node.property;
    const {
      name
    } = privateName.id;
    const {
      id,
      static: isStatic,
      method: isMethod,
      setId
    } = privateNamesMap.get(name);
    const cloneId = id => types.inherits(types.cloneNode(id), privateName);
    if (isStatic) {
      const receiver = this.receiver(member);
      const skipCheck = types.isIdentifier(receiver) && receiver.name === classRef.name;
      if (isMethod && !setId) {
        const err = readOnlyError(file, name);
        if (skipCheck) return types.sequenceExpression([value, err]);
        return types.sequenceExpression([value, types.callExpression(file.addHelper("assertClassBrand"), [types.cloneNode(classRef), receiver]), readOnlyError(file, name)]);
      }
      if (setId) {
        if (skipCheck) {
          return types.callExpression(types.cloneNode(setId), [receiver, value]);
        }
        return types.callExpression(file.addHelper("classPrivateSetter"), [types.cloneNode(classRef), cloneId(setId), receiver, value]);
      }
      return types.assignmentExpression("=", buildStaticPrivateFieldAccess(cloneId(id), noUninitializedPrivateFieldAccess), skipCheck ? value : types.callExpression(file.addHelper("assertClassBrand"), [types.cloneNode(classRef), receiver, value]));
    }
    if (isMethod) {
      if (setId) {
        return types.callExpression(file.addHelper("classPrivateSetter"), [types.cloneNode(id), cloneId(setId), this.receiver(member), value]);
      }
      return types.sequenceExpression([this.receiver(member), value, readOnlyError(file, name)]);
    }
    return types.callExpression(file.addHelper("classPrivateFieldSet2"), [cloneId(id), this.receiver(member), value]);
  }),
  destructureSet(member) {
    const {
      privateNamesMap,
      file,
      noUninitializedPrivateFieldAccess
    } = this;
    const privateName = member.node.property;
    const {
      name
    } = privateName.id;
    const {
      static: isStatic,
      method: isMethod,
      setId
    } = privateNamesMap.get(name);
    if (isMethod && !setId) {
      return types.memberExpression(types.sequenceExpression([member.node.object, readOnlyError(file, name)]), types.identifier("_"));
    }
    if (isStatic && !isMethod) {
      const getCall = this.get(member);
      if (!noUninitializedPrivateFieldAccess || !types.isCallExpression(getCall)) {
        return getCall;
      }
      const ref = getCall.arguments.pop();
      getCall.arguments.push(template.expression.ast`(_) => ${ref} = _`);
      return types.memberExpression(types.callExpression(file.addHelper("toSetter"), [getCall]), types.identifier("_"));
    }
    const setCall = this.set(member, types.identifier("_"));
    if (!types.isCallExpression(setCall) || !types.isIdentifier(setCall.arguments[setCall.arguments.length - 1], {
      name: "_"
    })) {
      throw member.buildCodeFrameError("Internal Babel error while compiling this code. This is a Babel bug. " + "Please report it at https://github.com/babel/babel/issues.");
    }
    let args;
    if (types.isMemberExpression(setCall.callee, {
      computed: false
    }) && types.isIdentifier(setCall.callee.property) && setCall.callee.property.name === "call") {
      args = [setCall.callee.object, types.arrayExpression(setCall.arguments.slice(1, -1)), setCall.arguments[0]];
    } else {
      args = [setCall.callee, types.arrayExpression(setCall.arguments.slice(0, -1))];
    }
    return types.memberExpression(types.callExpression(file.addHelper("toSetter"), args), types.identifier("_"));
  },
  call(member, args) {
    this.memoise(member, 1);
    return optimiseCall(this.get(member), this.receiver(member), args, false);
  },
  optionalCall(member, args) {
    this.memoise(member, 1);
    return optimiseCall(this.get(member), this.receiver(member), args, true);
  },
  delete() {
    throw new Error("Internal Babel error: deleting private elements is a parsing error.");
  }
};
const privateNameHandlerLoose = {
  get(member) {
    const {
      privateNamesMap,
      file
    } = this;
    const {
      object
    } = member.node;
    const {
      name
    } = member.node.property.id;
    return template.expression`BASE(REF, PROP)[PROP]`({
      BASE: file.addHelper("classPrivateFieldLooseBase"),
      REF: types.cloneNode(object),
      PROP: types.cloneNode(privateNamesMap.get(name).id)
    });
  },
  set() {
    throw new Error("private name handler with loose = true don't need set()");
  },
  boundGet(member) {
    return types.callExpression(types.memberExpression(this.get(member), types.identifier("bind")), [types.cloneNode(member.node.object)]);
  },
  simpleSet(member) {
    return this.get(member);
  },
  destructureSet(member) {
    return this.get(member);
  },
  call(member, args) {
    return types.callExpression(this.get(member), args);
  },
  optionalCall(member, args) {
    return types.optionalCallExpression(this.get(member), args, true);
  },
  delete() {
    throw new Error("Internal Babel error: deleting private elements is a parsing error.");
  }
};
function transformPrivateNamesUsage(ref, path, privateNamesMap, {
  privateFieldsAsProperties,
  noUninitializedPrivateFieldAccess,
  noDocumentAll,
  innerBinding
}, state) {
  if (!privateNamesMap.size) return;
  const body = path.get("body");
  const handler = privateFieldsAsProperties ? privateNameHandlerLoose : privateNameHandlerSpec;
  memberExpressionToFunctions(body, privateNameVisitor, {
    privateNamesMap,
    classRef: ref,
    file: state,
    ...handler,
    noDocumentAll,
    noUninitializedPrivateFieldAccess,
    innerBinding
  });
  body.traverse(privateInVisitor, {
    privateNamesMap,
    classRef: ref,
    file: state,
    privateFieldsAsProperties,
    innerBinding
  });
}
function buildPrivateFieldInitLoose(ref, prop, privateNamesMap) {
  const {
    id
  } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || types.buildUndefinedNode();
  return inheritPropComments(template.statement.ast`
      Object.defineProperty(${ref}, ${types.cloneNode(id)}, {
        // configurable is false by default
        // enumerable is false by default
        writable: true,
        value: ${value}
      });
    `, prop);
}
function buildPrivateInstanceFieldInitSpec(ref, prop, privateNamesMap, state) {
  const {
    id
  } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || types.buildUndefinedNode();
  const helper = state.addHelper("classPrivateFieldInitSpec");
  return inheritLoc(inheritPropComments(types.expressionStatement(types.callExpression(helper, [types.thisExpression(), inheritLoc(types.cloneNode(id), prop.node.key), value])), prop), prop.node);
}
function buildPrivateStaticFieldInitSpec(prop, privateNamesMap, noUninitializedPrivateFieldAccess) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const value = noUninitializedPrivateFieldAccess ? prop.node.value : template.expression.ast`{
        _: ${prop.node.value || types.buildUndefinedNode()}
      }`;
  return inheritPropComments(types.variableDeclaration("var", [types.variableDeclarator(types.cloneNode(privateName.id), value)]), prop);
}
function buildPrivateMethodInitLoose(ref, prop, privateNamesMap) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    methodId,
    id,
    getId,
    setId,
    initAdded
  } = privateName;
  if (initAdded) return;
  if (methodId) {
    return inheritPropComments(template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          value: ${methodId.name}
        });
      `, prop);
  }
  const isGetterOrSetter = getId || setId;
  if (isGetterOrSetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true
    });
    return inheritPropComments(template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId ? getId.name : types.buildUndefinedNode()},
          set: ${setId ? setId.name : types.buildUndefinedNode()}
        });
      `, prop);
  }
}
function buildPrivateInstanceMethodInitSpec(ref, prop, privateNamesMap, state) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  if (privateName.initAdded) return;
  return buildPrivateInstanceMethodInitialization(ref, prop, privateNamesMap, state);
}
function buildPrivateInstanceMethodInitialization(ref, prop, privateNamesMap, state) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    id
  } = privateName;
  const helper = state.addHelper("classPrivateMethodInitSpec");
  return inheritPropComments(template.statement.ast`${helper}(
      ${types.thisExpression()},
      ${types.cloneNode(id)}
    )`, prop);
}
function buildPublicFieldInitLoose(ref, prop) {
  const {
    key,
    computed
  } = prop.node;
  const value = prop.node.value || types.buildUndefinedNode();
  return inheritPropComments(types.expressionStatement(types.assignmentExpression("=", types.memberExpression(ref, key, computed || types.isLiteral(key)), value)), prop);
}
function buildPublicFieldInitSpec(ref, prop, state) {
  const {
    key,
    computed
  } = prop.node;
  const value = prop.node.value || types.buildUndefinedNode();
  return inheritPropComments(types.expressionStatement(types.callExpression(state.addHelper("defineProperty"), [ref, computed || types.isLiteral(key) ? key : types.stringLiteral(key.name), value])), prop);
}
function buildPrivateStaticMethodInitLoose(ref, prop, privateNamesMap) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    id,
    methodId,
    getId,
    setId,
    initAdded
  } = privateName;
  if (initAdded) return;
  const isGetterOrSetter = getId || setId;
  if (isGetterOrSetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true
    });
    return inheritPropComments(template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId ? getId.name : types.buildUndefinedNode()},
          set: ${setId ? setId.name : types.buildUndefinedNode()}
        })
      `, prop);
  }
  return inheritPropComments(template.statement.ast`
      Object.defineProperty(${ref}, ${id}, {
        // configurable is false by default
        // enumerable is false by default
        // writable is false by default
        value: ${methodId.name}
      });
    `, prop);
}
function buildPrivateMethodDeclaration(prop, privateNamesMap, privateFieldsAsSymbolsOrProperties = false) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    id,
    methodId,
    getId,
    setId,
    getterDeclared,
    setterDeclared,
    static: isStatic
  } = privateName;
  const {
    params,
    body,
    generator,
    async
  } = prop.node;
  const isGetter = getId && params.length === 0;
  const isSetter = setId && params.length > 0;
  if (isGetter && getterDeclared || isSetter && setterDeclared) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true
    });
    return null;
  }
  if ((isGetter || isSetter) && !privateFieldsAsSymbolsOrProperties) {
    const scope = prop.get("body").scope;
    const thisArg = scope.generateUidIdentifier("this");
    const state = {
      thisRef: thisArg,
      argumentsPath: []
    };
    prop.traverse(thisContextVisitor, state);
    if (state.argumentsPath.length) {
      const argumentsId = scope.generateUidIdentifier("arguments");
      scope.push({
        id: argumentsId,
        init: template.expression.ast`[].slice.call(arguments, 1)`
      });
      for (const path of state.argumentsPath) {
        path.replaceWith(types.cloneNode(argumentsId));
      }
    }
    params.unshift(types.cloneNode(thisArg));
  }
  let declId = methodId;
  if (isGetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      getterDeclared: true,
      initAdded: true
    });
    declId = getId;
  } else if (isSetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      setterDeclared: true,
      initAdded: true
    });
    declId = setId;
  } else if (isStatic && !privateFieldsAsSymbolsOrProperties) {
    declId = id;
  }
  return inheritPropComments(types.functionDeclaration(types.cloneNode(declId), params, body, generator, async), prop);
}
const thisContextVisitor = visitors.environmentVisitor({
  Identifier(path, state) {
    if (state.argumentsPath && path.node.name === "arguments") {
      state.argumentsPath.push(path);
    }
  },
  UnaryExpression(path) {
    const {
      node
    } = path;
    if (node.operator === "delete") {
      const argument = skipTransparentExprWrapperNodes(node.argument);
      if (types.isThisExpression(argument)) {
        path.replaceWith(types.booleanLiteral(true));
      }
    }
  },
  ThisExpression(path, state) {
    state.needsClassRef = true;
    path.replaceWith(types.cloneNode(state.thisRef));
  },
  MetaProperty(path) {
    const {
      node
    } = path;
    if (node.meta.name === "new" && node.property.name === "target") {
      path.replaceWith(types.buildUndefinedNode());
    }
  }
});
const innerReferencesVisitor = {
  ReferencedIdentifier(path, state) {
    if (path.scope.getBindingIdentifier(path.node.name) === state.innerBinding) {
      state.needsClassRef = true;
      path.node.name = state.thisRef.name;
    }
  }
};
function replaceThisContext(path, ref, innerBindingRef) {
  const state = {
    thisRef: ref,
    needsClassRef: false,
    innerBinding: innerBindingRef
  };
  if (!path.isMethod()) {
    path.traverse(thisContextVisitor, state);
  }
  if (innerBindingRef != null && state.thisRef?.name && state.thisRef.name !== innerBindingRef.name) {
    path.traverse(innerReferencesVisitor, state);
  }
  return state.needsClassRef;
}
function isNameOrLength({
  key,
  computed
}) {
  if (key.type === "Identifier") {
    return !computed && (key.name === "name" || key.name === "length");
  }
  if (key.type === "StringLiteral") {
    return key.value === "name" || key.value === "length";
  }
  return false;
}
function inheritPropComments(node, prop) {
  types.inheritLeadingComments(node, prop.node);
  types.inheritInnerComments(node, prop.node);
  return node;
}
function inheritLoc(node, original) {
  node.start = original.start;
  node.end = original.end;
  node.loc = original.loc;
  return node;
}
function buildFieldsInitNodes(ref, superRef, props, privateNamesMap, file, setPublicClassFields, privateFieldsAsSymbolsOrProperties, noUninitializedPrivateFieldAccess, constantSuper, innerBindingRef) {
  let classRefFlags = 0;
  let injectSuperRef;
  const staticNodes = [];
  const instanceNodes = [];
  let lastInstanceNodeReturnsThis = false;
  const pureStaticNodes = [];
  let classBindingNode = null;
  const getSuperRef = types.isIdentifier(superRef) ? () => superRef : () => {
    injectSuperRef ??= props[0].scope.generateUidIdentifierBasedOnNode(superRef);
    return injectSuperRef;
  };
  const classRefForInnerBinding = ref ?? props[0].scope.generateUidIdentifier(innerBindingRef.name || "Class");
  ref ??= types.cloneNode(innerBindingRef);
  for (const prop of props) {
    if (prop.isClassProperty()) {
      assertFieldTransformed(prop);
    }
    const isStatic = !types.isStaticBlock(prop.node) && prop.node.static;
    const isInstance = !isStatic;
    const isPrivate = prop.isPrivate();
    const isPublic = !isPrivate;
    const isField = prop.isProperty();
    const isMethod = !isField;
    const isStaticBlock = prop.isStaticBlock();
    if (isStatic) classRefFlags |= 1;
    if (isStatic || isMethod && isPrivate || isStaticBlock) {
      new ReplaceSupers({
        methodPath: prop,
        constantSuper,
        file: file,
        refToPreserve: innerBindingRef,
        getSuperRef,
        getObjectRef() {
          classRefFlags |= 2;
          if (isStatic || isStaticBlock) {
            return classRefForInnerBinding;
          } else {
            return types.memberExpression(classRefForInnerBinding, types.identifier("prototype"));
          }
        }
      }).replace();
      const replaced = replaceThisContext(prop, classRefForInnerBinding, innerBindingRef);
      if (replaced) {
        classRefFlags |= 2;
      }
    }
    lastInstanceNodeReturnsThis = false;
    switch (true) {
      case isStaticBlock:
        {
          const blockBody = prop.node.body;
          if (blockBody.length === 1 && types.isExpressionStatement(blockBody[0])) {
            staticNodes.push(inheritPropComments(blockBody[0], prop));
          } else {
            staticNodes.push(types.inheritsComments(template.statement.ast`(() => { ${blockBody} })()`, prop.node));
          }
          break;
        }
      case isStatic && isPrivate && isField && privateFieldsAsSymbolsOrProperties:
        staticNodes.push(buildPrivateFieldInitLoose(types.cloneNode(ref), prop, privateNamesMap));
        break;
      case isStatic && isPrivate && isField && !privateFieldsAsSymbolsOrProperties:
        staticNodes.push(buildPrivateStaticFieldInitSpec(prop, privateNamesMap, noUninitializedPrivateFieldAccess));
        break;
      case isStatic && isPublic && isField && setPublicClassFields:
        if (!isNameOrLength(prop.node)) {
          staticNodes.push(buildPublicFieldInitLoose(types.cloneNode(ref), prop));
          break;
        }
      case isStatic && isPublic && isField && !setPublicClassFields:
        staticNodes.push(buildPublicFieldInitSpec(types.cloneNode(ref), prop, file));
        break;
      case isInstance && isPrivate && isField && privateFieldsAsSymbolsOrProperties:
        instanceNodes.push(buildPrivateFieldInitLoose(types.thisExpression(), prop, privateNamesMap));
        break;
      case isInstance && isPrivate && isField && !privateFieldsAsSymbolsOrProperties:
        instanceNodes.push(buildPrivateInstanceFieldInitSpec(types.thisExpression(), prop, privateNamesMap, file));
        break;
      case isInstance && isPrivate && isMethod && privateFieldsAsSymbolsOrProperties:
        instanceNodes.unshift(buildPrivateMethodInitLoose(types.thisExpression(), prop, privateNamesMap));
        pureStaticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, privateFieldsAsSymbolsOrProperties));
        break;
      case isInstance && isPrivate && isMethod && !privateFieldsAsSymbolsOrProperties:
        instanceNodes.unshift(buildPrivateInstanceMethodInitSpec(types.thisExpression(), prop, privateNamesMap, file));
        pureStaticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, privateFieldsAsSymbolsOrProperties));
        break;
      case isStatic && isPrivate && isMethod && !privateFieldsAsSymbolsOrProperties:
        pureStaticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, privateFieldsAsSymbolsOrProperties));
        break;
      case isStatic && isPrivate && isMethod && privateFieldsAsSymbolsOrProperties:
        staticNodes.unshift(buildPrivateStaticMethodInitLoose(types.cloneNode(ref), prop, privateNamesMap));
        pureStaticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, privateFieldsAsSymbolsOrProperties));
        break;
      case isInstance && isPublic && isField && setPublicClassFields:
        instanceNodes.push(buildPublicFieldInitLoose(types.thisExpression(), prop));
        break;
      case isInstance && isPublic && isField && !setPublicClassFields:
        lastInstanceNodeReturnsThis = true;
        instanceNodes.push(buildPublicFieldInitSpec(types.thisExpression(), prop, file));
        break;
      default:
        throw new Error("Unreachable.");
    }
  }
  if (classRefFlags & 2 && innerBindingRef != null) {
    classBindingNode = types.expressionStatement(types.assignmentExpression("=", types.cloneNode(classRefForInnerBinding), types.cloneNode(innerBindingRef)));
  }
  return {
    staticNodes: staticNodes.filter(Boolean),
    instanceNodes: instanceNodes.filter(Boolean),
    lastInstanceNodeReturnsThis,
    pureStaticNodes: pureStaticNodes.filter(Boolean),
    classBindingNode,
    wrapClass(path) {
      for (const prop of props) {
        prop.node.leadingComments = null;
        prop.remove();
      }
      if (injectSuperRef) {
        path.scope.push({
          id: types.cloneNode(injectSuperRef)
        });
        path.set("superClass", types.assignmentExpression("=", injectSuperRef, path.node.superClass));
      }
      if (classRefFlags !== 0) {
        if (path.isClassExpression()) {
          path.scope.push({
            id: ref
          });
          path.replaceWith(types.assignmentExpression("=", types.cloneNode(ref), path.node));
        } else {
          if (innerBindingRef == null) {
            path.node.id = ref;
          }
          if (classBindingNode != null) {
            path.scope.push({
              id: classRefForInnerBinding
            });
          }
        }
      }
      return path;
    }
  };
}

const findBareSupers = visitors.environmentVisitor({
  Super(path) {
    const {
      node,
      parentPath
    } = path;
    if (parentPath.isCallExpression({
      callee: node
    })) {
      this.push(parentPath);
    }
  }
});
const referenceVisitor = {
  "TSTypeAnnotation|TypeAnnotation"(path) {
    path.skip();
  },
  ReferencedIdentifier(path, {
    scope
  }) {
    if (scope.hasOwnBinding(path.node.name)) {
      scope.rename(path.node.name);
      path.skip();
    }
  }
};
function handleClassTDZ(path, state) {
  if (state.classBinding && state.classBinding === path.scope.getBinding(path.node.name)) {
    const classNameTDZError = state.file.addHelper("classNameTDZError");
    const throwNode = types.callExpression(classNameTDZError, [types.stringLiteral(path.node.name)]);
    path.replaceWith(types.sequenceExpression([throwNode, path.node]));
    path.skip();
  }
}
const classFieldDefinitionEvaluationTDZVisitor = {
  ReferencedIdentifier: handleClassTDZ,
  "TSTypeAnnotation|TypeAnnotation"(path) {
    path.skip();
  }
};
function injectInitialization(path, constructor, nodes, renamer, lastReturnsThis) {
  if (!nodes.length) return;
  const isDerived = !!path.node.superClass;
  if (!constructor) {
    const newConstructor = types.classMethod("constructor", types.identifier("constructor"), [], types.blockStatement([]));
    if (isDerived) {
      newConstructor.params = [types.restElement(types.identifier("args"))];
      newConstructor.body.body.push(template.statement.ast`super(...args)`);
    }
    [constructor] = path.get("body").unshiftContainer("body", newConstructor);
  }
  if (renamer) {
    renamer(referenceVisitor, {
      scope: constructor.scope
    });
  }
  if (isDerived) {
    const bareSupers = [];
    constructor.traverse(findBareSupers, bareSupers);
    let isFirst = true;
    for (const bareSuper of bareSupers) {
      if (isFirst) {
        isFirst = false;
      } else {
        nodes = nodes.map(n => types.cloneNode(n));
      }
      if (!bareSuper.parentPath.isExpressionStatement()) {
        const allNodes = [bareSuper.node, ...nodes.map(n => types.toExpression(n))];
        if (!lastReturnsThis) allNodes.push(types.thisExpression());
        bareSuper.replaceWith(types.sequenceExpression(allNodes));
      } else {
        bareSuper.insertAfter(nodes);
      }
    }
  } else {
    constructor.get("body").unshiftContainer("body", nodes);
  }
}
function memoiseComputedKey(keyNode, scope, hint) {
  const isUidReference = types.isIdentifier(keyNode) && scope.hasUid(keyNode.name);
  if (isUidReference) {
    return;
  }
  const isMemoiseAssignment = types.isAssignmentExpression(keyNode, {
    operator: "="
  }) && types.isIdentifier(keyNode.left) && scope.hasUid(keyNode.left.name);
  if (isMemoiseAssignment) {
    return types.cloneNode(keyNode);
  } else {
    const ident = types.identifier(hint);
    scope.push({
      id: ident,
      kind: "let"
    });
    return types.assignmentExpression("=", types.cloneNode(ident), keyNode);
  }
}
function extractComputedKeys(path, computedPaths, file) {
  const {
    scope
  } = path;
  const declarations = [];
  const state = {
    classBinding: path.node.id && scope.getBinding(path.node.id.name),
    file
  };
  for (const computedPath of computedPaths) {
    const computedKey = computedPath.get("key");
    if (computedKey.isReferencedIdentifier()) {
      handleClassTDZ(computedKey, state);
    } else {
      computedKey.traverse(classFieldDefinitionEvaluationTDZVisitor, state);
    }
    const computedNode = computedPath.node;
    if (!computedKey.isConstantExpression()) {
      const assignment = memoiseComputedKey(computedKey.node, scope, scope.generateUidBasedOnNode(computedKey.node));
      if (assignment) {
        declarations.push(types.expressionStatement(assignment));
        computedNode.key = types.cloneNode(assignment.left);
      }
    }
  }
  return declarations;
}

function hasOwnDecorators(node) {
  return !!node.decorators?.length;
}
function incrementId(id, idx = id.length - 1) {
  if (idx === -1) {
    id.unshift(65);
    return;
  }
  const current = id[idx];
  if (current === 90) {
    id[idx] = 97;
  } else if (current === 122) {
    id[idx] = 65;
    incrementId(id, idx - 1);
  } else {
    id[idx] = current + 1;
  }
}
function createPrivateUidGeneratorForClass(classPath) {
  const currentPrivateId = [];
  const privateNames = new Set();
  types.traverseFast(classPath.node, node => {
    if (types.isPrivateName(node)) {
      privateNames.add(node.id.name);
    }
  });
  return () => {
    let reifiedId;
    do {
      incrementId(currentPrivateId);
      reifiedId = String.fromCharCode(...currentPrivateId);
    } while (privateNames.has(reifiedId));
    return types.privateName(types.identifier(reifiedId));
  };
}
function createLazyPrivateUidGeneratorForClass(classPath) {
  let generator;
  return () => {
    if (!generator) {
      generator = createPrivateUidGeneratorForClass(classPath);
    }
    return generator();
  };
}
function replaceClassWithVar(path, className) {
  const id = path.node.id;
  const scope = path.scope;
  if (path.type === "ClassDeclaration") {
    const className = id.name;
    const varId = scope.generateUidIdentifierBasedOnNode(id);
    const classId = types.identifier(className);
    scope.rename(className, varId.name);
    path.get("id").replaceWith(classId);
    return {
      id: types.cloneNode(varId),
      path
    };
  } else {
    let varId;
    if (id) {
      className = id.name;
      varId = generateLetUidIdentifier(scope.parent, className);
      scope.rename(className, varId.name);
    } else {
      varId = generateLetUidIdentifier(scope.parent, typeof className === "string" ? className : "decorated_class");
    }
    const newClassExpr = types.classExpression(typeof className === "string" ? types.identifier(className) : null, path.node.superClass, path.node.body);
    const [newPath] = path.replaceWith(types.sequenceExpression([newClassExpr, varId]));
    return {
      id: types.cloneNode(varId),
      path: newPath.get("expressions.0")
    };
  }
}
function generateClassProperty(key, value, isStatic) {
  if (key.type === "PrivateName") {
    return types.classPrivateProperty(key, value, undefined, isStatic);
  } else {
    return types.classProperty(key, value, undefined, undefined, isStatic);
  }
}
function assignIdForAnonymousClass(path, className) {
  if (!path.node.id) {
    path.node.id = typeof className === "string" ? types.identifier(className) : path.scope.generateUidIdentifier("Class");
  }
}
function addProxyAccessorsFor(className, element, getterKey, setterKey, targetKey, isComputed, isStatic) {
  const thisArg = isStatic ? className : types.thisExpression();
  const getterBody = types.blockStatement([types.returnStatement(types.memberExpression(types.cloneNode(thisArg), types.cloneNode(targetKey)))]);
  const setterBody = types.blockStatement([types.expressionStatement(types.assignmentExpression("=", types.memberExpression(types.cloneNode(thisArg), types.cloneNode(targetKey)), types.identifier("v")))]);
  let getter, setter;
  if (getterKey.type === "PrivateName") {
    getter = types.classPrivateMethod("get", getterKey, [], getterBody, isStatic);
    setter = types.classPrivateMethod("set", setterKey, [types.identifier("v")], setterBody, isStatic);
  } else {
    getter = types.classMethod("get", getterKey, [], getterBody, isComputed, isStatic);
    setter = types.classMethod("set", setterKey, [types.identifier("v")], setterBody, isComputed, isStatic);
  }
  element.insertAfter(setter);
  element.insertAfter(getter);
}
function extractProxyAccessorsFor(targetKey) {
  return [template.expression.ast`
      o => o.${types.cloneNode(targetKey)}
    `, template.expression.ast`
      (o, v) => o.${types.cloneNode(targetKey)} = v
    `];
}
function getComputedKeyLastElement(path) {
  path = skipTransparentExprWrappers(path);
  if (path.isSequenceExpression()) {
    const expressions = path.get("expressions");
    return getComputedKeyLastElement(expressions[expressions.length - 1]);
  }
  return path;
}
function getComputedKeyMemoiser(path) {
  const element = getComputedKeyLastElement(path);
  if (element.isConstantExpression()) {
    return types.cloneNode(path.node);
  } else if (element.isIdentifier() && path.scope.hasUid(element.node.name)) {
    return types.cloneNode(path.node);
  } else if (element.isAssignmentExpression() && element.get("left").isIdentifier()) {
    return types.cloneNode(element.node.left);
  } else {
    throw new Error(`Internal Error: the computed key ${path.toString()} has not yet been memoised.`);
  }
}
function prependExpressionsToComputedKey(expressions, fieldPath) {
  const key = fieldPath.get("key");
  if (key.isSequenceExpression()) {
    expressions.push(...key.node.expressions);
  } else {
    expressions.push(key.node);
  }
  key.replaceWith(maybeSequenceExpression(expressions));
}
function appendExpressionsToComputedKey(expressions, fieldPath) {
  const key = fieldPath.get("key");
  const completion = getComputedKeyLastElement(key);
  if (completion.isConstantExpression()) {
    prependExpressionsToComputedKey(expressions, fieldPath);
  } else {
    const scopeParent = key.scope.parent;
    const maybeAssignment = memoiseComputedKey(completion.node, scopeParent, scopeParent.generateUid("computedKey"));
    if (!maybeAssignment) {
      prependExpressionsToComputedKey(expressions, fieldPath);
    } else {
      const expressionSequence = [...expressions, types.cloneNode(maybeAssignment.left)];
      const completionParent = completion.parentPath;
      if (completionParent.isSequenceExpression()) {
        completionParent.pushContainer("expressions", expressionSequence);
      } else {
        completion.replaceWith(maybeSequenceExpression([types.cloneNode(maybeAssignment), ...expressionSequence]));
      }
    }
  }
}
function prependExpressionsToFieldInitializer(expressions, fieldPath) {
  const initializer = fieldPath.get("value");
  if (initializer.node) {
    expressions.push(initializer.node);
  } else if (expressions.length > 0) {
    expressions[expressions.length - 1] = types.unaryExpression("void", expressions[expressions.length - 1]);
  }
  initializer.replaceWith(maybeSequenceExpression(expressions));
}
function prependExpressionsToStaticBlock(expressions, blockPath) {
  blockPath.unshiftContainer("body", types.expressionStatement(maybeSequenceExpression(expressions)));
}
function prependExpressionsToConstructor(expressions, constructorPath) {
  constructorPath.node.body.body.unshift(types.expressionStatement(maybeSequenceExpression(expressions)));
}
function isProtoInitCallExpression(expression, protoInitCall) {
  return types.isCallExpression(expression) && types.isIdentifier(expression.callee, {
    name: protoInitCall.name
  });
}
function optimizeSuperCallAndExpressions(expressions, protoInitLocal) {
  if (protoInitLocal) {
    if (expressions.length >= 2 && isProtoInitCallExpression(expressions[1], protoInitLocal)) {
      const mergedSuperCall = types.callExpression(types.cloneNode(protoInitLocal), [expressions[0]]);
      expressions.splice(0, 2, mergedSuperCall);
    }
    if (expressions.length >= 2 && types.isThisExpression(expressions[expressions.length - 1]) && isProtoInitCallExpression(expressions[expressions.length - 2], protoInitLocal)) {
      expressions.splice(expressions.length - 1, 1);
    }
  }
  return maybeSequenceExpression(expressions);
}
function insertExpressionsAfterSuperCallAndOptimize(expressions, constructorPath, protoInitLocal) {
  constructorPath.traverse({
    CallExpression: {
      exit(path) {
        if (!path.get("callee").isSuper()) return;
        const newNodes = [path.node, ...expressions.map(expr => types.cloneNode(expr))];
        if (path.isCompletionRecord()) {
          newNodes.push(types.thisExpression());
        }
        path.replaceWith(optimizeSuperCallAndExpressions(newNodes, protoInitLocal));
        path.skip();
      }
    },
    ClassMethod(path) {
      if (path.node.kind === "constructor") {
        path.skip();
      }
    }
  });
}
function createConstructorFromExpressions(expressions, isDerivedClass) {
  const body = [types.expressionStatement(maybeSequenceExpression(expressions))];
  if (isDerivedClass) {
    body.unshift(types.expressionStatement(types.callExpression(types.super(), [types.spreadElement(types.identifier("args"))])));
  }
  return types.classMethod("constructor", types.identifier("constructor"), isDerivedClass ? [types.restElement(types.identifier("args"))] : [], types.blockStatement(body));
}
function createStaticBlockFromExpressions(expressions) {
  return types.staticBlock([types.expressionStatement(maybeSequenceExpression(expressions))]);
}
const FIELD = 0;
const ACCESSOR = 1;
const METHOD = 2;
const GETTER = 3;
const SETTER = 4;
const FIELD_IGNORED = 5;
const STATIC = 8;
const DECORATORS_HAVE_THIS = 16;
function getElementKind({
  node
}) {
  switch (node.type) {
    case "ClassProperty":
      return node.declare || node.abstract ? FIELD_IGNORED : FIELD;
    case "ClassPrivateProperty":
      return FIELD;
    case "ClassAccessorProperty":
      return ACCESSOR;
    case "ClassMethod":
    case "ClassPrivateMethod":
      if (node.kind === "get") {
        return GETTER;
      } else if (node.kind === "set") {
        return SETTER;
      } else {
        return METHOD;
      }
  }
}
function toSortedDecoratorInfo(info) {
  return [...info.filter(el => el.isStatic && el.kind >= ACCESSOR && el.kind <= SETTER), ...info.filter(el => !el.isStatic && el.kind >= ACCESSOR && el.kind <= SETTER), ...info.filter(el => el.isStatic && el.kind === FIELD), ...info.filter(el => !el.isStatic && el.kind === FIELD)];
}
function generateDecorationList(decorators, decoratorsThis) {
  const decsCount = decorators.length;
  const haveOneThis = decoratorsThis.some(Boolean);
  const decs = [];
  for (let i = 0; i < decsCount; i++) {
    if (haveOneThis) {
      decs.push(decoratorsThis[i] || types.buildUndefinedNode());
    }
    decs.push(decorators[i].expression);
  }
  return {
    haveThis: haveOneThis,
    decs
  };
}
function generateDecorationExprs(decorationInfo) {
  return types.arrayExpression(decorationInfo.map(el => {
    let flag = el.kind;
    if (el.isStatic) {
      flag += STATIC;
    }
    if (el.decoratorsHaveThis) flag += DECORATORS_HAVE_THIS;
    return types.arrayExpression([el.decoratorsArray, types.numericLiteral(flag), el.name, ...(el.privateMethods || [])]);
  }));
}
function extractElementLocalAssignments(decorationInfo) {
  const localIds = [];
  for (const el of decorationInfo) {
    const {
      locals
    } = el;
    if (Array.isArray(locals)) {
      localIds.push(...locals);
    } else if (locals !== undefined) {
      localIds.push(locals);
    }
  }
  return localIds;
}
function addCallAccessorsFor(element, key, getId, setId, isStatic) {
  element.insertAfter(types.classPrivateMethod("get", types.cloneNode(key), [], types.blockStatement([types.returnStatement(types.callExpression(types.cloneNode(getId), isStatic ? [] : [types.thisExpression()]))]), isStatic));
  element.insertAfter(types.classPrivateMethod("set", types.cloneNode(key), [types.identifier("v")], types.blockStatement([types.expressionStatement(types.callExpression(types.cloneNode(setId), isStatic ? [types.identifier("v")] : [types.thisExpression(), types.identifier("v")]))]), isStatic));
}
function movePrivateAccessor(element, key, methodLocalVar, isStatic) {
  let params;
  let block;
  if (element.node.kind === "set") {
    params = [types.identifier("v")];
    block = [types.expressionStatement(types.callExpression(methodLocalVar, [types.thisExpression(), types.identifier("v")]))];
  } else {
    params = [];
    block = [types.returnStatement(types.callExpression(methodLocalVar, [types.thisExpression()]))];
  }
  element.replaceWith(types.classPrivateMethod(element.node.kind, types.cloneNode(key), params, types.blockStatement(block), isStatic));
}
function isClassDecoratableElementPath(path) {
  const {
    type
  } = path;
  return type !== "TSDeclareMethod" && type !== "TSIndexSignature" && type !== "StaticBlock";
}
function staticBlockToIIFE(block) {
  return types.callExpression(types.arrowFunctionExpression([], types.blockStatement(block.body)), []);
}
function staticBlockToFunctionClosure(block) {
  return types.functionExpression(null, [], types.blockStatement(block.body));
}
function fieldInitializerToClosure(value) {
  return types.functionExpression(null, [], types.blockStatement([types.returnStatement(value)]));
}
function maybeSequenceExpression(exprs) {
  if (exprs.length === 0) return types.buildUndefinedNode();
  if (exprs.length === 1) return exprs[0];
  return types.sequenceExpression(exprs);
}
function createFunctionExpressionFromPrivateMethod(node) {
  const {
    params,
    body,
    generator: isGenerator,
    async: isAsync
  } = node;
  return types.functionExpression(undefined, params, body, isGenerator, isAsync);
}
function createSetFunctionNameCall(state, className) {
  return types.callExpression(state.addHelper("setFunctionName"), [types.thisExpression(), className]);
}
function createToPropertyKeyCall(state, propertyKey) {
  return types.callExpression(state.addHelper("toPropertyKey"), [propertyKey]);
}
function createPrivateBrandCheckClosure(brandName) {
  return types.arrowFunctionExpression([types.identifier("_")], types.binaryExpression("in", types.cloneNode(brandName), types.identifier("_")));
}
function usesPrivateField(expression) {
  return types.traverseFast(expression, node => {
    if (types.isPrivateName(node)) {
      return types.traverseFast.stop;
    }
  });
}
function convertToComputedKey(path) {
  const {
    node
  } = path;
  node.computed = true;
  if (types.isIdentifier(node.key)) {
    node.key = types.stringLiteral(node.key.name);
  }
}
function hasInstancePrivateAccess(path, privateNames) {
  let containsInstancePrivateAccess = false;
  if (privateNames.length > 0) {
    const privateNameVisitor = privateNameVisitorFactory({
      PrivateName(path, state) {
        if (state.privateNamesMap.has(path.node.id.name)) {
          containsInstancePrivateAccess = true;
          path.stop();
        }
      }
    });
    const privateNamesMap = new Map();
    for (const name of privateNames) {
      privateNamesMap.set(name, null);
    }
    path.traverse(privateNameVisitor, {
      privateNamesMap: privateNamesMap
    });
  }
  return containsInstancePrivateAccess;
}
function checkPrivateMethodUpdateError(path, decoratedPrivateMethods) {
  const privateNameVisitor = privateNameVisitorFactory({
    PrivateName(path, state) {
      if (!state.privateNamesMap.has(path.node.id.name)) return;
      const parentPath = path.parentPath;
      const parentParentPath = parentPath.parentPath;
      if (parentParentPath.node.type === "AssignmentExpression" && parentParentPath.node.left === parentPath.node || parentParentPath.node.type === "UpdateExpression" || parentParentPath.node.type === "RestElement" || parentParentPath.node.type === "ArrayPattern" || parentParentPath.node.type === "ObjectProperty" && parentParentPath.node.value === parentPath.node && parentParentPath.parentPath.type === "ObjectPattern" || parentParentPath.node.type === "ForOfStatement" && parentParentPath.node.left === parentPath.node) {
        throw path.buildCodeFrameError(`Decorated private methods are read-only, but "#${path.node.id.name}" is updated via this expression.`);
      }
    }
  });
  const privateNamesMap = new Map();
  for (const name of decoratedPrivateMethods) {
    privateNamesMap.set(name, null);
  }
  path.traverse(privateNameVisitor, {
    privateNamesMap: privateNamesMap
  });
}
function transformClass(path, state, constantSuper, ignoreFunctionLength, className, propertyVisitor) {
  const body = path.get("body.body");
  const classDecorators = path.node.decorators;
  let hasElementDecorators = false;
  let hasComputedKeysSideEffects = false;
  let elemDecsUseFnContext = false;
  const generateClassPrivateUid = createLazyPrivateUidGeneratorForClass(path);
  const classAssignments = [];
  const scopeParent = path.scope.parent;
  const memoiseExpression = (expression, hint, assignments) => {
    const localEvaluatedId = generateLetUidIdentifier(scopeParent, hint);
    assignments.push(types.assignmentExpression("=", localEvaluatedId, expression));
    return types.cloneNode(localEvaluatedId);
  };
  let protoInitLocal;
  let staticInitLocal;
  const classIdName = path.node.id?.name;
  const setClassName = typeof className === "object" ? className : undefined;
  const usesFunctionContextOrYieldAwait = decorator => {
    return types.traverseFast(decorator, node => {
      if (types.isThisExpression(node) || types.isSuper(node) || types.isYieldExpression(node) || types.isAwaitExpression(node) || types.isIdentifier(node, {
        name: "arguments"
      }) || classIdName && types.isIdentifier(node, {
        name: classIdName
      }) || types.isMetaProperty(node) && node.meta.name !== "import") {
        return types.traverseFast.stop;
      }
    });
  };
  const instancePrivateNames = [];
  for (const element of body) {
    if (!isClassDecoratableElementPath(element)) {
      continue;
    }
    const elementNode = element.node;
    if (!elementNode.static && types.isPrivateName(elementNode.key)) {
      instancePrivateNames.push(elementNode.key.id.name);
    }
    if (isDecorated(elementNode)) {
      switch (elementNode.type) {
        case "ClassProperty":
          propertyVisitor.ClassProperty(element, state);
          break;
        case "ClassPrivateProperty":
          propertyVisitor.ClassPrivateProperty(element, state);
          break;
        case "ClassAccessorProperty":
          propertyVisitor.ClassAccessorProperty(element, state);
          break;
        default:
          if (elementNode.static) {
            staticInitLocal ??= generateLetUidIdentifier(scopeParent, "initStatic");
          } else {
            protoInitLocal ??= generateLetUidIdentifier(scopeParent, "initProto");
          }
          break;
      }
      hasElementDecorators = true;
      elemDecsUseFnContext ||= elementNode.decorators.some(usesFunctionContextOrYieldAwait);
    } else if (elementNode.type === "ClassAccessorProperty") {
      propertyVisitor.ClassAccessorProperty(element, state);
      const {
        key,
        value,
        static: isStatic,
        computed
      } = elementNode;
      const newId = generateClassPrivateUid();
      const newField = generateClassProperty(newId, value, isStatic);
      const keyPath = element.get("key");
      const [newPath] = element.replaceWith(newField);
      let getterKey, setterKey;
      if (computed && !keyPath.isConstantExpression()) {
        getterKey = memoiseComputedKey(createToPropertyKeyCall(state, key), scopeParent, scopeParent.generateUid("computedKey"));
        setterKey = types.cloneNode(getterKey.left);
      } else {
        getterKey = types.cloneNode(key);
        setterKey = types.cloneNode(key);
      }
      assignIdForAnonymousClass(path, className);
      addProxyAccessorsFor(path.node.id, newPath, getterKey, setterKey, newId, computed, isStatic);
    }
    if ("computed" in element.node && element.node.computed) {
      hasComputedKeysSideEffects ||= !scopeParent.isStatic(element.node.key);
    }
  }
  if (!classDecorators && !hasElementDecorators) {
    if (!path.node.id && typeof className === "string") {
      path.node.id = types.identifier(className);
    }
    if (setClassName) {
      path.node.body.body.unshift(createStaticBlockFromExpressions([createSetFunctionNameCall(state, setClassName)]));
    }
    return;
  }
  const elementDecoratorInfo = [];
  let constructorPath;
  const decoratedPrivateMethods = new Set();
  let classInitLocal, classIdLocal;
  let decoratorReceiverId;
  function handleDecorators(decorators) {
    let hasSideEffects = false;
    let usesFnContext = false;
    const decoratorsThis = [];
    for (const decorator of decorators) {
      const {
        expression
      } = decorator;
      let object;
      if (types.isMemberExpression(expression)) {
        if (types.isSuper(expression.object)) {
          object = types.thisExpression();
        } else if (scopeParent.isStatic(expression.object)) {
          object = types.cloneNode(expression.object);
        } else {
          decoratorReceiverId ??= generateLetUidIdentifier(scopeParent, "obj");
          object = types.assignmentExpression("=", types.cloneNode(decoratorReceiverId), expression.object);
          expression.object = types.cloneNode(decoratorReceiverId);
        }
      }
      decoratorsThis.push(object);
      hasSideEffects ||= !scopeParent.isStatic(expression);
      usesFnContext ||= usesFunctionContextOrYieldAwait(decorator);
    }
    return {
      hasSideEffects,
      usesFnContext,
      decoratorsThis
    };
  }
  const willExtractSomeElemDecs = hasComputedKeysSideEffects || elemDecsUseFnContext;
  let needsDeclarationForClassBinding = false;
  let classDecorationsFlag = 0;
  let classDecorations = [];
  let classDecorationsId;
  let computedKeyAssignments = [];
  if (classDecorators) {
    classInitLocal = generateLetUidIdentifier(scopeParent, "initClass");
    needsDeclarationForClassBinding = path.isClassDeclaration();
    ({
      id: classIdLocal,
      path
    } = replaceClassWithVar(path, className));
    path.node.decorators = null;
    const classDecsUsePrivateName = classDecorators.some(usesPrivateField);
    const {
      hasSideEffects,
      usesFnContext,
      decoratorsThis
    } = handleDecorators(classDecorators);
    const {
      haveThis,
      decs
    } = generateDecorationList(classDecorators, decoratorsThis);
    classDecorationsFlag = haveThis ? 1 : 0;
    classDecorations = decs;
    if (usesFnContext || hasSideEffects && willExtractSomeElemDecs || classDecsUsePrivateName) {
      classDecorationsId = memoiseExpression(types.arrayExpression(classDecorations), "classDecs", classAssignments);
    }
    if (!hasElementDecorators) {
      for (const element of path.get("body.body")) {
        const {
          node
        } = element;
        const isComputed = "computed" in node && node.computed;
        if (isComputed) {
          if (element.isClassProperty({
            static: true
          })) {
            if (!element.get("key").isConstantExpression()) {
              const key = node.key;
              const maybeAssignment = memoiseComputedKey(key, scopeParent, scopeParent.generateUid("computedKey"));
              if (maybeAssignment != null) {
                node.key = types.cloneNode(maybeAssignment.left);
                computedKeyAssignments.push(maybeAssignment);
              }
            }
          } else if (computedKeyAssignments.length > 0) {
            prependExpressionsToComputedKey(computedKeyAssignments, element);
            computedKeyAssignments = [];
          }
        }
      }
    }
  } else {
    assignIdForAnonymousClass(path, className);
    classIdLocal = types.cloneNode(path.node.id);
  }
  let lastInstancePrivateName = null;
  let needsInstancePrivateBrandCheck = false;
  let fieldInitializerExpressions = [];
  let staticFieldInitializerExpressions = [];
  if (hasElementDecorators) {
    if (protoInitLocal) {
      const protoInitCall = types.callExpression(types.cloneNode(protoInitLocal), [types.thisExpression()]);
      fieldInitializerExpressions.push(protoInitCall);
    }
    for (const element of body) {
      if (!isClassDecoratableElementPath(element)) {
        if (staticFieldInitializerExpressions.length > 0 && element.isStaticBlock()) {
          prependExpressionsToStaticBlock(staticFieldInitializerExpressions, element);
          staticFieldInitializerExpressions = [];
        }
        continue;
      }
      const {
        node
      } = element;
      const decorators = node.decorators;
      const hasDecorators = !!decorators?.length;
      const isComputed = "computed" in node && node.computed;
      let name = "computedKey";
      if (node.key.type === "PrivateName") {
        name = node.key.id.name;
      } else if (!isComputed && node.key.type === "Identifier") {
        name = node.key.name;
      }
      let decoratorsArray;
      let decoratorsHaveThis;
      if (hasDecorators) {
        const {
          hasSideEffects,
          usesFnContext,
          decoratorsThis
        } = handleDecorators(decorators);
        const {
          decs,
          haveThis
        } = generateDecorationList(decorators, decoratorsThis);
        decoratorsHaveThis = haveThis;
        decoratorsArray = decs.length === 1 ? decs[0] : types.arrayExpression(decs);
        if (usesFnContext || hasSideEffects && willExtractSomeElemDecs) {
          decoratorsArray = memoiseExpression(decoratorsArray, name + "Decs", computedKeyAssignments);
        }
      }
      if (isComputed) {
        if (!element.get("key").isConstantExpression()) {
          const key = node.key;
          const maybeAssignment = memoiseComputedKey(hasDecorators ? createToPropertyKeyCall(state, key) : key, scopeParent, scopeParent.generateUid("computedKey"));
          if (maybeAssignment != null) {
            if (classDecorators && element.isClassProperty({
              static: true
            })) {
              node.key = types.cloneNode(maybeAssignment.left);
              computedKeyAssignments.push(maybeAssignment);
            } else {
              node.key = maybeAssignment;
            }
          }
        }
      }
      const {
        key,
        static: isStatic
      } = node;
      const isPrivate = key.type === "PrivateName";
      const kind = getElementKind(element);
      if (kind === FIELD_IGNORED) continue;
      if (isPrivate && !isStatic) {
        if (hasDecorators) {
          needsInstancePrivateBrandCheck = true;
        }
        if (types.isClassPrivateProperty(node) || !lastInstancePrivateName) {
          lastInstancePrivateName = key;
        }
      }
      if (element.isClassMethod({
        kind: "constructor"
      })) {
        constructorPath = element;
      }
      let locals;
      if (hasDecorators) {
        let privateMethods;
        let nameExpr;
        if (isComputed) {
          nameExpr = getComputedKeyMemoiser(element.get("key"));
        } else if (key.type === "PrivateName") {
          nameExpr = types.stringLiteral(key.id.name);
        } else if (key.type === "Identifier") {
          nameExpr = types.stringLiteral(key.name);
        } else {
          nameExpr = types.cloneNode(key);
        }
        if (kind === ACCESSOR) {
          const {
            value
          } = element.node;
          const params = isStatic ? [] : [types.thisExpression()];
          if (value) {
            params.push(types.cloneNode(value));
          }
          const newId = generateClassPrivateUid();
          const newFieldInitId = generateLetUidIdentifier(scopeParent, `init_${name}`);
          const newValue = types.callExpression(types.cloneNode(newFieldInitId), params);
          const newField = generateClassProperty(newId, newValue, isStatic);
          const [newPath] = element.replaceWith(newField);
          if (isPrivate) {
            privateMethods = extractProxyAccessorsFor(newId);
            const getId = generateLetUidIdentifier(scopeParent, `get_${name}`);
            const setId = generateLetUidIdentifier(scopeParent, `set_${name}`);
            addCallAccessorsFor(newPath, key, getId, setId, isStatic);
            locals = [newFieldInitId, getId, setId];
          } else {
            assignIdForAnonymousClass(path, className);
            addProxyAccessorsFor(path.node.id, newPath, types.cloneNode(key), types.isAssignmentExpression(key) ? types.cloneNode(key.left) : types.cloneNode(key), newId, isComputed, isStatic);
            locals = [newFieldInitId];
          }
        } else if (kind === FIELD) {
          const initId = generateLetUidIdentifier(scopeParent, `init_${name}`);
          const valuePath = element.get("value");
          const args = isStatic ? [] : [types.thisExpression()];
          if (valuePath.node) args.push(valuePath.node);
          valuePath.replaceWith(types.callExpression(types.cloneNode(initId), args));
          locals = [initId];
          if (isPrivate) {
            privateMethods = extractProxyAccessorsFor(key);
          }
        } else if (isPrivate) {
          const callId = generateLetUidIdentifier(scopeParent, `call_${name}`);
          locals = [callId];
          const replaceSupers = new ReplaceSupers({
            constantSuper,
            methodPath: element,
            objectRef: classIdLocal,
            superRef: path.node.superClass,
            file: state.file,
            refToPreserve: classIdLocal
          });
          replaceSupers.replace();
          privateMethods = [createFunctionExpressionFromPrivateMethod(element.node)];
          if (kind === GETTER || kind === SETTER) {
            movePrivateAccessor(element, types.cloneNode(key), types.cloneNode(callId), isStatic);
          } else {
            const node = element.node;
            path.node.body.body.unshift(types.classPrivateProperty(key, types.cloneNode(callId), [], node.static));
            decoratedPrivateMethods.add(key.id.name);
            element.remove();
          }
        }
        elementDecoratorInfo.push({
          kind,
          decoratorsArray: decoratorsArray,
          decoratorsHaveThis: decoratorsHaveThis,
          name: nameExpr,
          isStatic,
          privateMethods: privateMethods,
          locals: locals
        });
        if (element.node) {
          element.node.decorators = null;
        }
      }
      if (isComputed && computedKeyAssignments.length > 0) {
        if (classDecorators && element.isClassProperty({
          static: true
        })) ; else {
          prependExpressionsToComputedKey(computedKeyAssignments, kind === ACCESSOR ? element.getNextSibling() : element);
          computedKeyAssignments = [];
        }
      }
      if (fieldInitializerExpressions.length > 0 && !isStatic && (kind === FIELD || kind === ACCESSOR)) {
        prependExpressionsToFieldInitializer(fieldInitializerExpressions, element);
        fieldInitializerExpressions = [];
      }
      if (staticFieldInitializerExpressions.length > 0 && isStatic && (kind === FIELD || kind === ACCESSOR)) {
        prependExpressionsToFieldInitializer(staticFieldInitializerExpressions, element);
        staticFieldInitializerExpressions = [];
      }
      if (hasDecorators) {
        if (kind === FIELD || kind === ACCESSOR) {
          const initExtraId = generateLetUidIdentifier(scopeParent, `init_extra_${name}`);
          locals.push(initExtraId);
          const initExtraCall = types.callExpression(types.cloneNode(initExtraId), isStatic ? [] : [types.thisExpression()]);
          if (!isStatic) {
            fieldInitializerExpressions.push(initExtraCall);
          } else {
            staticFieldInitializerExpressions.push(initExtraCall);
          }
        }
      }
    }
  }
  if (computedKeyAssignments.length > 0) {
    const elements = path.get("body.body");
    let lastComputedElement;
    for (let i = elements.length - 1; i >= 0; i--) {
      const path = elements[i];
      const node = path.node;
      if (node.computed) {
        if (classDecorators && types.isClassProperty(node, {
          static: true
        })) {
          continue;
        }
        lastComputedElement = path;
        break;
      }
    }
    if (lastComputedElement != null) {
      appendExpressionsToComputedKey(computedKeyAssignments, lastComputedElement);
      computedKeyAssignments = [];
    }
  }
  if (fieldInitializerExpressions.length > 0) {
    const isDerivedClass = !!path.node.superClass;
    if (constructorPath) {
      if (isDerivedClass) {
        insertExpressionsAfterSuperCallAndOptimize(fieldInitializerExpressions, constructorPath, protoInitLocal);
      } else {
        prependExpressionsToConstructor(fieldInitializerExpressions, constructorPath);
      }
    } else {
      path.node.body.body.unshift(createConstructorFromExpressions(fieldInitializerExpressions, isDerivedClass));
    }
  }
  if (staticFieldInitializerExpressions.length > 0) {
    path.node.body.body.push(createStaticBlockFromExpressions(staticFieldInitializerExpressions));
    staticFieldInitializerExpressions = [];
  }
  const sortedElementDecoratorInfo = toSortedDecoratorInfo(elementDecoratorInfo);
  const elementDecorations = generateDecorationExprs(elementDecoratorInfo);
  const elementLocals = extractElementLocalAssignments(sortedElementDecoratorInfo);
  if (protoInitLocal) {
    elementLocals.push(protoInitLocal);
  }
  if (staticInitLocal) {
    elementLocals.push(staticInitLocal);
  }
  const classLocals = [];
  let classInitInjected = false;
  const classInitCall = classInitLocal && types.callExpression(types.cloneNode(classInitLocal), []);
  let originalClassPath = path;
  const originalClass = path.node;
  const staticClosures = [];
  if (classDecorators) {
    classLocals.push(classIdLocal, classInitLocal);
    const statics = [];
    path.get("body.body").forEach(element => {
      if (element.isStaticBlock() || !element.isClassMethod() && element.node.static) {
        const replaceSupers = new ReplaceSupers({
          constantSuper,
          methodPath: element,
          objectRef: classIdLocal,
          superRef: path.node.superClass,
          file: state.file,
          refToPreserve: classIdLocal
        });
        replaceSupers.replace();
      }
      if (element.isStaticBlock()) {
        if (hasInstancePrivateAccess(element, instancePrivateNames)) {
          const staticBlockClosureId = memoiseExpression(staticBlockToFunctionClosure(element.node), "staticBlock", staticClosures);
          staticFieldInitializerExpressions.push(types.callExpression(types.memberExpression(staticBlockClosureId, types.identifier("call")), [types.thisExpression()]));
        } else {
          staticFieldInitializerExpressions.push(staticBlockToIIFE(element.node));
        }
        element.remove();
        return;
      }
      if ((element.isClassProperty() || element.isClassPrivateProperty()) && element.node.static) {
        const valuePath = element.get("value");
        if (hasInstancePrivateAccess(valuePath, instancePrivateNames)) {
          const fieldValueClosureId = memoiseExpression(fieldInitializerToClosure(valuePath.node), "fieldValue", staticClosures);
          valuePath.replaceWith(types.callExpression(types.memberExpression(fieldValueClosureId, types.identifier("call")), [types.thisExpression()]));
        }
        if (staticFieldInitializerExpressions.length > 0) {
          prependExpressionsToFieldInitializer(staticFieldInitializerExpressions, element);
          staticFieldInitializerExpressions = [];
        }
        element.node.static = false;
        statics.push(element.node);
        element.remove();
      } else if (element.isClassPrivateMethod({
        static: true
      })) {
        if (hasInstancePrivateAccess(element, instancePrivateNames)) {
          const privateMethodDelegateId = memoiseExpression(createFunctionExpressionFromPrivateMethod(element.node), element.get("key.id").node.name, staticClosures);
          if (ignoreFunctionLength) {
            element.node.params = [types.restElement(types.identifier("arg"))];
            element.node.body = types.blockStatement([types.returnStatement(types.callExpression(types.memberExpression(privateMethodDelegateId, types.identifier("apply")), [types.thisExpression(), types.identifier("arg")]))]);
          } else {
            element.node.params = element.node.params.map((p, i) => {
              if (types.isRestElement(p)) {
                return types.restElement(types.identifier("arg"));
              } else {
                return types.identifier("_" + i);
              }
            });
            element.node.body = types.blockStatement([types.returnStatement(types.callExpression(types.memberExpression(privateMethodDelegateId, types.identifier("apply")), [types.thisExpression(), types.identifier("arguments")]))]);
          }
        }
        element.node.static = false;
        statics.push(element.node);
        element.remove();
      }
    });
    if (statics.length > 0 || staticFieldInitializerExpressions.length > 0) {
      const staticsClass = template.expression.ast`
        class extends ${state.addHelper("identity")} {}
      `;
      staticsClass.body.body = [types.classProperty(types.toExpression(originalClass), undefined, undefined, undefined, true, true), ...statics];
      const constructorBody = [];
      const newExpr = types.newExpression(staticsClass, []);
      if (staticFieldInitializerExpressions.length > 0) {
        constructorBody.push(...staticFieldInitializerExpressions);
      }
      if (classInitCall) {
        classInitInjected = true;
        constructorBody.push(classInitCall);
      }
      if (constructorBody.length > 0) {
        constructorBody.unshift(types.callExpression(types.super(), [types.cloneNode(classIdLocal)]));
        staticsClass.body.body.push(createConstructorFromExpressions(constructorBody, false));
      } else {
        newExpr.arguments.push(types.cloneNode(classIdLocal));
      }
      const [newPath] = path.replaceWith(newExpr);
      originalClassPath = newPath.get("callee").get("body").get("body.0.key");
    }
  }
  if (!classInitInjected && classInitCall) {
    path.node.body.body.push(types.staticBlock([types.expressionStatement(classInitCall)]));
  }
  let {
    superClass
  } = originalClass;
  if (superClass) {
    const id = path.scope.maybeGenerateMemoised(superClass);
    if (id) {
      originalClass.superClass = types.assignmentExpression("=", id, superClass);
      superClass = id;
    }
  }
  const applyDecoratorWrapper = types.staticBlock([]);
  originalClass.body.body.unshift(applyDecoratorWrapper);
  const applyDecsBody = applyDecoratorWrapper.body;
  if (computedKeyAssignments.length > 0) {
    const elements = originalClassPath.get("body.body");
    let firstPublicElement;
    for (const path of elements) {
      if ((path.isClassProperty() || path.isClassMethod()) && path.node.kind !== "constructor") {
        firstPublicElement = path;
        break;
      }
    }
    if (firstPublicElement != null) {
      convertToComputedKey(firstPublicElement);
      prependExpressionsToComputedKey(computedKeyAssignments, firstPublicElement);
    } else {
      originalClass.body.body.unshift(types.classProperty(types.sequenceExpression([...computedKeyAssignments, types.stringLiteral("_")]), undefined, undefined, undefined, true, true));
      applyDecsBody.push(types.expressionStatement(types.unaryExpression("delete", types.memberExpression(types.thisExpression(), types.identifier("_")))));
    }
  }
  applyDecsBody.push(types.expressionStatement(createLocalsAssignment(elementLocals, classLocals, elementDecorations, classDecorationsId ?? types.arrayExpression(classDecorations), types.numericLiteral(classDecorationsFlag), needsInstancePrivateBrandCheck ? lastInstancePrivateName : null, setClassName, types.cloneNode(superClass), state)));
  if (staticInitLocal) {
    applyDecsBody.push(types.expressionStatement(types.callExpression(types.cloneNode(staticInitLocal), [types.thisExpression()])));
  }
  if (staticClosures.length > 0) {
    applyDecsBody.push(...staticClosures.map(expr => types.expressionStatement(expr)));
  }
  path.insertBefore(classAssignments.map(expr => types.expressionStatement(expr)));
  if (needsDeclarationForClassBinding) {
    const classBindingInfo = scopeParent.getBinding(classIdLocal.name);
    if (!classBindingInfo.constantViolations.length) {
      path.insertBefore(types.variableDeclaration("let", [types.variableDeclarator(types.cloneNode(classIdLocal))]));
    } else {
      const classOuterBindingDelegateLocal = scopeParent.generateUidIdentifier("t" + classIdLocal.name);
      const classOuterBindingLocal = classIdLocal;
      path.replaceWithMultiple([types.variableDeclaration("let", [types.variableDeclarator(types.cloneNode(classOuterBindingLocal)), types.variableDeclarator(classOuterBindingDelegateLocal)]), types.blockStatement([types.variableDeclaration("let", [types.variableDeclarator(types.cloneNode(classIdLocal))]), path.node, types.expressionStatement(types.assignmentExpression("=", types.cloneNode(classOuterBindingDelegateLocal), types.cloneNode(classIdLocal)))]), types.expressionStatement(types.assignmentExpression("=", types.cloneNode(classOuterBindingLocal), types.cloneNode(classOuterBindingDelegateLocal)))]);
    }
  }
  if (decoratedPrivateMethods.size > 0) {
    checkPrivateMethodUpdateError(path, decoratedPrivateMethods);
  }
  path.scope.crawl();
  return path;
}
function createLocalsAssignment(elementLocals, classLocals, elementDecorations, classDecorations, classDecorationsFlag, maybePrivateBrandName, setClassName, superClass, state) {
  let lhs, rhs;
  const args = [setClassName ? createSetFunctionNameCall(state, setClassName) : types.thisExpression(), classDecorations, elementDecorations];
  if (maybePrivateBrandName || superClass || classDecorationsFlag.value !== 0) {
    args.push(classDecorationsFlag);
  }
  if (maybePrivateBrandName) {
    args.push(createPrivateBrandCheckClosure(maybePrivateBrandName));
  } else if (superClass) {
    args.push(types.buildUndefinedNode());
  }
  if (superClass) args.push(superClass);
  rhs = types.callExpression(state.addHelper("applyDecs2311"), args);
  if (elementLocals.length > 0) {
    if (classLocals.length > 0) {
      lhs = types.objectPattern([types.objectProperty(types.identifier("e"), types.arrayPattern(elementLocals)), types.objectProperty(types.identifier("c"), types.arrayPattern(classLocals))]);
    } else {
      lhs = types.arrayPattern(elementLocals);
      rhs = types.memberExpression(rhs, types.identifier("e"), false);
    }
  } else {
    lhs = types.arrayPattern(classLocals);
    rhs = types.memberExpression(rhs, types.identifier("c"), false);
  }
  return types.assignmentExpression("=", lhs, rhs);
}
function isProtoKey(node) {
  return node.type === "Identifier" ? node.name === "__proto__" : node.value === "__proto__";
}
function isDecorated(node) {
  return node.decorators && node.decorators.length > 0;
}
function shouldTransformElement(node) {
  switch (node.type) {
    case "ClassAccessorProperty":
      return true;
    case "ClassMethod":
    case "ClassProperty":
    case "ClassPrivateMethod":
    case "ClassPrivateProperty":
      return isDecorated(node);
    default:
      return false;
  }
}
function shouldTransformClass(node) {
  return isDecorated(node) || node.body.body.some(shouldTransformElement);
}
function buildNamedEvaluationVisitor(needsName, visitor) {
  function handleComputedProperty(propertyPath, key, state) {
    switch (key.type) {
      case "StringLiteral":
        return types.stringLiteral(key.value);
      case "NumericLiteral":
      case "BigIntLiteral":
        {
          const keyValue = key.value + "";
          propertyPath.get("key").replaceWith(types.stringLiteral(keyValue));
          return types.stringLiteral(keyValue);
        }
      default:
        {
          const ref = propertyPath.scope.maybeGenerateMemoised(key);
          propertyPath.get("key").replaceWith(types.assignmentExpression("=", ref, createToPropertyKeyCall(state, key)));
          return types.cloneNode(ref);
        }
    }
  }
  return {
    VariableDeclarator(path, state) {
      const id = path.node.id;
      if (id.type === "Identifier") {
        const initializer = skipTransparentExprWrappers(path.get("init"));
        if (needsName(initializer)) {
          const name = id.name;
          visitor(initializer, state, name);
        }
      }
    },
    AssignmentExpression(path, state) {
      const id = path.node.left;
      if (id.type === "Identifier") {
        const initializer = skipTransparentExprWrappers(path.get("right"));
        if (needsName(initializer)) {
          switch (path.node.operator) {
            case "=":
            case "&&=":
            case "||=":
            case "??=":
              visitor(initializer, state, id.name);
          }
        }
      }
    },
    AssignmentPattern(path, state) {
      const id = path.node.left;
      if (id.type === "Identifier") {
        const initializer = skipTransparentExprWrappers(path.get("right"));
        if (needsName(initializer)) {
          const name = id.name;
          visitor(initializer, state, name);
        }
      }
    },
    ObjectExpression(path, state) {
      for (const propertyPath of path.get("properties")) {
        if (!propertyPath.isObjectProperty()) continue;
        const {
          node
        } = propertyPath;
        const id = node.key;
        const initializer = skipTransparentExprWrappers(propertyPath.get("value"));
        if (needsName(initializer)) {
          if (!node.computed) {
            if (!isProtoKey(id)) {
              if (id.type === "Identifier") {
                visitor(initializer, state, id.name);
              } else {
                const className = types.stringLiteral(id.value + "");
                visitor(initializer, state, className);
              }
            }
          } else {
            const ref = handleComputedProperty(propertyPath, id, state);
            visitor(initializer, state, ref);
          }
        }
      }
    },
    ClassPrivateProperty(path, state) {
      const {
        node
      } = path;
      const initializer = skipTransparentExprWrappers(path.get("value"));
      if (needsName(initializer)) {
        const className = types.stringLiteral("#" + node.key.id.name);
        visitor(initializer, state, className);
      }
    },
    ClassAccessorProperty(path, state) {
      const {
        node
      } = path;
      const id = node.key;
      const initializer = skipTransparentExprWrappers(path.get("value"));
      if (needsName(initializer)) {
        if (!node.computed) {
          if (id.type === "Identifier") {
            visitor(initializer, state, id.name);
          } else if (id.type === "PrivateName") {
            const className = types.stringLiteral("#" + id.id.name);
            visitor(initializer, state, className);
          } else {
            const className = types.stringLiteral(id.value + "");
            visitor(initializer, state, className);
          }
        } else {
          const ref = handleComputedProperty(path, id, state);
          visitor(initializer, state, ref);
        }
      }
    },
    ClassProperty(path, state) {
      const {
        node
      } = path;
      const id = node.key;
      const initializer = skipTransparentExprWrappers(path.get("value"));
      if (needsName(initializer)) {
        if (!node.computed) {
          if (id.type === "Identifier") {
            visitor(initializer, state, id.name);
          } else {
            const className = types.stringLiteral(id.value + "");
            visitor(initializer, state, className);
          }
        } else {
          const ref = handleComputedProperty(path, id, state);
          visitor(initializer, state, ref);
        }
      }
    }
  };
}
function isDecoratedAnonymousClassExpression(path) {
  return path.isClassExpression({
    id: null
  }) && shouldTransformClass(path.node);
}
function generateLetUidIdentifier(scope, name) {
  const id = scope.generateUidIdentifier(name);
  scope.push({
    id,
    kind: "let"
  });
  return types.cloneNode(id);
}
function createDecoratorTransform ({
  assertVersion,
  assumption
}, version, inherits) {
  assertVersion("^7.21.0 || ^8.0.0");
  const VISITED = new WeakSet();
  const constantSuper = assumption("constantSuper") ?? false;
  const ignoreFunctionLength = assumption("ignoreFunctionLength") ?? false;
  const namedEvaluationVisitor = buildNamedEvaluationVisitor(isDecoratedAnonymousClassExpression, visitClass);
  function visitClass(path, state, className) {
    if (VISITED.has(path)) return;
    const {
      node
    } = path;
    className ??= node.id?.name;
    const newPath = transformClass(path, state, constantSuper, ignoreFunctionLength, className, namedEvaluationVisitor);
    if (newPath) {
      VISITED.add(newPath);
      return;
    }
    VISITED.add(path);
  }
  return {
    name: "proposal-decorators",
    inherits: inherits,
    visitor: {
      ExportDefaultDeclaration(path, state) {
        const {
          declaration
        } = path.node;
        if (declaration?.type === "ClassDeclaration" && isDecorated(declaration)) {
          const isAnonymous = !declaration.id;
          const updatedVarDeclarationPath = path.splitExportDeclaration();
          if (isAnonymous) {
            visitClass(updatedVarDeclarationPath, state, types.stringLiteral("default"));
          }
        }
      },
      ExportNamedDeclaration(path) {
        const {
          declaration
        } = path.node;
        if (declaration?.type === "ClassDeclaration" && isDecorated(declaration)) {
          path.splitExportDeclaration();
        }
      },
      Class(path, state) {
        visitClass(path, state, undefined);
      },
      ...namedEvaluationVisitor
    }
  };
}

const FEATURES = Object.freeze({
  fields: 1 << 1,
  privateMethods: 1 << 2,
  decorators: 1 << 3,
  privateIn: 1 << 4,
  staticBlocks: 1 << 5
});
const featuresSameLoose = new Map([[FEATURES.fields, "@babel/plugin-transform-class-properties"], [FEATURES.privateMethods, "@babel/plugin-transform-private-methods"], [FEATURES.privateIn, "@babel/plugin-transform-private-property-in-object"]]);
const featuresKey = "@babel/plugin-class-features/featuresKey";
const looseKey = "@babel/plugin-class-features/looseKey";
function enableFeature(file, feature, loose) {
  if (!hasFeature(file, feature)) {
    file.set(featuresKey, file.get(featuresKey) | feature);
    setLoose(file, feature, loose);
  }
  let resolvedLoose;
  for (const [mask] of featuresSameLoose) {
    if (!hasFeature(file, mask)) continue;
    const loose = isLoose(file, mask);
    if (resolvedLoose === !loose) {
      throw new Error("'loose' mode configuration must be the same for @babel/plugin-transform-class-properties, " + "@babel/plugin-transform-private-methods and " + "@babel/plugin-transform-private-property-in-object (when they are enabled)." + "\n\n" + getBabelShowConfigForHint(file));
    } else {
      resolvedLoose = loose;
    }
  }
}
function getBabelShowConfigForHint(file) {
  let {
    filename
  } = file.opts;
  if (!filename || filename === "unknown") {
    filename = "[name of the input file]";
  }
  return `\
If you already set the same 'loose' mode for these plugins in your config, it's possible that they \
are enabled multiple times with different options.
You can re-run Babel with the BABEL_SHOW_CONFIG_FOR environment variable to show the loaded \
configuration:
\tnpx cross-env BABEL_SHOW_CONFIG_FOR=${filename} <your build command>
See https://babeljs.io/docs/configuration#print-effective-configs for more info.`;
}
function hasFeature(file, feature) {
  return !!(file.get(featuresKey) & feature);
}
function isLoose(file, feature) {
  return !!(file.get(looseKey) & feature);
}
function setLoose(file, feature, loose) {
  if (loose) file.set(looseKey, file.get(looseKey) | feature);else file.set(looseKey, file.get(looseKey) & ~feature);
}
function shouldTransform(path, file) {
  let decoratorPath = null;
  let publicFieldPath = null;
  let privateFieldPath = null;
  let privateMethodPath = null;
  let staticBlockPath = null;
  if (hasOwnDecorators(path.node)) {
    decoratorPath = path.get("decorators.0");
  }
  for (const el of path.get("body.body")) {
    if (!decoratorPath && hasOwnDecorators(el.node)) {
      decoratorPath = el.get("decorators.0");
    }
    if (!publicFieldPath && el.isClassProperty()) {
      publicFieldPath = el;
    }
    if (!privateFieldPath && el.isClassPrivateProperty()) {
      privateFieldPath = el;
    }
    if (!privateMethodPath && el.isClassPrivateMethod()) {
      privateMethodPath = el;
    }
    if (!staticBlockPath && el.isStaticBlock()) {
      staticBlockPath = el;
    }
  }
  if (decoratorPath && privateFieldPath) {
    throw privateFieldPath.buildCodeFrameError("Private fields in decorated classes are not supported yet.");
  }
  if (decoratorPath && privateMethodPath) {
    throw privateMethodPath.buildCodeFrameError("Private methods in decorated classes are not supported yet.");
  }
  if (decoratorPath && !hasFeature(file, FEATURES.decorators)) {
    throw path.buildCodeFrameError("Decorators are not enabled." + "\nIf you are using " + '["@babel/plugin-proposal-decorators", { "version": "legacy" }], ' + 'make sure it comes *before* "@babel/plugin-transform-class-properties" ' + "and enable loose mode, like so:\n" + '\t["@babel/plugin-proposal-decorators", { "version": "legacy" }]\n' + '\t["@babel/plugin-transform-class-properties", { "loose": true }]');
  }
  if (privateMethodPath && !hasFeature(file, FEATURES.privateMethods)) {
    throw privateMethodPath.buildCodeFrameError("Class private methods are not enabled. " + "Please add `@babel/plugin-transform-private-methods` to your configuration.");
  }
  if ((publicFieldPath || privateFieldPath) && !hasFeature(file, FEATURES.fields) && !hasFeature(file, FEATURES.privateMethods)) {
    throw path.buildCodeFrameError("Class fields are not enabled. " + "Please add `@babel/plugin-transform-class-properties` to your configuration.");
  }
  if (staticBlockPath && !hasFeature(file, FEATURES.staticBlocks)) {
    throw path.buildCodeFrameError("Static class blocks are not enabled. " + "Please add `@babel/plugin-transform-class-static-block` to your configuration.");
  }
  if (decoratorPath || privateMethodPath || staticBlockPath) {
    return true;
  }
  if ((publicFieldPath || privateFieldPath) && hasFeature(file, FEATURES.fields)) {
    return true;
  }
  return false;
}

const versionKey = "@babel/plugin-class-features/version";
function createClassFeaturePlugin({
  name,
  feature,
  loose,
  manipulateOptions,
  api,
  inherits
}) {
  if (feature & FEATURES.decorators) {
    return createDecoratorTransform(api, "2023-11", inherits);
  }
  const setPublicClassFields = api.assumption("setPublicClassFields");
  const privateFieldsAsSymbols = api.assumption("privateFieldsAsSymbols");
  const privateFieldsAsProperties = api.assumption("privateFieldsAsProperties");
  const noUninitializedPrivateFieldAccess = api.assumption("noUninitializedPrivateFieldAccess") ?? false;
  const constantSuper = api.assumption("constantSuper");
  const noDocumentAll = api.assumption("noDocumentAll") ?? false;
  if (privateFieldsAsProperties && privateFieldsAsSymbols) {
    throw new Error(`Cannot enable both the "privateFieldsAsProperties" and ` + `"privateFieldsAsSymbols" assumptions as the same time.`);
  }
  const privateFieldsAsSymbolsOrProperties = privateFieldsAsProperties || privateFieldsAsSymbols;
  if (loose === true) {
    const explicit = [];
    if (setPublicClassFields !== undefined) {
      explicit.push(`"setPublicClassFields"`);
    }
    if (privateFieldsAsProperties !== undefined) {
      explicit.push(`"privateFieldsAsProperties"`);
    }
    if (privateFieldsAsSymbols !== undefined) {
      explicit.push(`"privateFieldsAsSymbols"`);
    }
    if (explicit.length !== 0) {
      console.warn(`[${name}]: You are using the "loose: true" option and you are` + ` explicitly setting a value for the ${explicit.join(" and ")}` + ` assumption${explicit.length > 1 ? "s" : ""}. The "loose" option` + ` can cause incompatibilities with the other class features` + ` plugins, so it's recommended that you replace it with the` + ` following top-level option:\n` + `\t"assumptions": {\n` + `\t\t"setPublicClassFields": true,\n` + `\t\t"privateFieldsAsSymbols": true\n` + `\t}`);
    }
  }
  return {
    name,
    manipulateOptions,
    inherits,
    pre(file) {
      enableFeature(file, feature, loose ?? false);
      if (!file.get(versionKey) || semver.lt(file.get(versionKey), "8.0.1")) {
        file.set(versionKey, "8.0.1");
      }
    },
    visitor: {
      Class(path, {
        file
      }) {
        if (file.get(versionKey) !== "8.0.1") return;
        if (!shouldTransform(path, file)) return;
        const pathIsClassDeclaration = path.isClassDeclaration();
        if (pathIsClassDeclaration) assertFieldTransformed(path);
        const loose = isLoose(file, feature);
        let constructor;
        const props = [];
        const computedPaths = [];
        const privateNames = new Set();
        const body = path.get("body");
        for (const path of body.get("body")) {
          if ((path.isClassProperty() || path.isClassMethod()) && path.node.computed) {
            computedPaths.push(path);
          }
          if (path.isPrivate()) {
            const {
              name
            } = path.node.key.id;
            const getName = `get ${name}`;
            const setName = `set ${name}`;
            if (path.isClassPrivateMethod()) {
              if (path.node.kind === "get") {
                if (privateNames.has(getName) || privateNames.has(name) && !privateNames.has(setName)) {
                  throw path.buildCodeFrameError("Duplicate private field");
                }
                privateNames.add(getName).add(name);
              } else if (path.node.kind === "set") {
                if (privateNames.has(setName) || privateNames.has(name) && !privateNames.has(getName)) {
                  throw path.buildCodeFrameError("Duplicate private field");
                }
                privateNames.add(setName).add(name);
              }
            } else {
              if (privateNames.has(name) && !privateNames.has(getName) && !privateNames.has(setName) || privateNames.has(name) && (privateNames.has(getName) || privateNames.has(setName))) {
                throw path.buildCodeFrameError("Duplicate private field");
              }
              privateNames.add(name);
            }
          }
          if (path.isClassMethod({
            kind: "constructor"
          })) {
            constructor = path;
          } else {
            if (path.isProperty() || path.isPrivate() || path.isStaticBlock()) {
              props.push(path);
            }
          }
        }
        if (!props.length) return;
        const innerBinding = path.node.id;
        let ref;
        if (!innerBinding || !pathIsClassDeclaration) {
          path.ensureFunctionName(false);
          ref = path.scope.generateUidIdentifier(innerBinding?.name || "Class");
        }
        const classRefForDefine = ref ?? types.cloneNode(innerBinding);
        const privateNamesMap = buildPrivateNamesMap(classRefForDefine.name, privateFieldsAsSymbolsOrProperties ?? loose, props);
        const privateNamesNodes = buildPrivateNamesNodes(privateNamesMap, privateFieldsAsProperties ?? loose, privateFieldsAsSymbols ?? false, file);
        transformPrivateNamesUsage(classRefForDefine, path, privateNamesMap, {
          privateFieldsAsProperties: privateFieldsAsSymbolsOrProperties ?? loose,
          noUninitializedPrivateFieldAccess,
          noDocumentAll,
          innerBinding
        }, file);
        const keysNodes = extractComputedKeys(path, computedPaths, file);
        const {
          staticNodes,
          pureStaticNodes,
          instanceNodes,
          lastInstanceNodeReturnsThis,
          classBindingNode,
          wrapClass
        } = buildFieldsInitNodes(ref, path.node.superClass, props, privateNamesMap, file, setPublicClassFields ?? loose, privateFieldsAsSymbolsOrProperties ?? loose, noUninitializedPrivateFieldAccess, constantSuper ?? loose, innerBinding);
        if (instanceNodes.length > 0) {
          injectInitialization(path, constructor, instanceNodes, (referenceVisitor, state) => {
            for (const prop of props) {
              if (types.isStaticBlock(prop.node) || prop.node.static) continue;
              prop.traverse(referenceVisitor, state);
            }
          }, lastInstanceNodeReturnsThis);
        }
        const wrappedPath = wrapClass(path);
        wrappedPath.insertBefore([...privateNamesNodes, ...keysNodes]);
        if (staticNodes.length > 0) {
          wrappedPath.insertAfter(staticNodes);
        }
        if (pureStaticNodes.length > 0) {
          wrappedPath.find(parent => parent.isStatement() || parent.isDeclaration()).insertAfter(pureStaticNodes);
        }
        if (classBindingNode != null && pathIsClassDeclaration) {
          wrappedPath.insertAfter(classBindingNode);
        }
      }
    }
  };
}

export { FEATURES, buildCheckInRHS, buildNamedEvaluationVisitor, createClassFeaturePlugin, enableFeature, injectInitialization };
//# sourceMappingURL=index.js.map
