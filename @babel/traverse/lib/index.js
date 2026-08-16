import { createDebug } from 'obug';
import { codeFrameColumns } from '@babel/code-frame';
import * as _t from '@babel/types';
import { parse } from '@babel/parser';
import globalsBuiltinLower from '@babel/helper-globals/data/builtin-lower.json' with { type: 'json' };
import globalsBuiltinUpper from '@babel/helper-globals/data/builtin-upper.json' with { type: 'json' };
import generator from '@babel/generator';
import template from '@babel/template';

const ReferencedIdentifier = ["Identifier", "JSXIdentifier"];
const ReferencedMemberExpression = ["MemberExpression"];
const BindingIdentifier = ["Identifier"];
const Statement = ["Statement"];
const Expression = ["Expression"];
const Scope$1 = ["Scopable", "Pattern"];
const Referenced = null;
const BlockScoped = ["FunctionDeclaration", "ClassDeclaration", "VariableDeclaration"];
const Var = ["VariableDeclaration"];
const User = null;
const Generated = null;
const Pure = null;
const Flow = ["Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier"];
const RestProperty = ["RestElement"];
const SpreadProperty = ["RestElement"];
const ExistentialTypeParam = ["ExistsTypeAnnotation"];
const NumericLiteralTypeAnnotation = ["NumberLiteralTypeAnnotation"];
const ForAwaitStatement = ["ForOfStatement"];

const virtualTypes = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  BindingIdentifier,
  BlockScoped,
  ExistentialTypeParam,
  Expression,
  Flow,
  ForAwaitStatement,
  Generated,
  NumericLiteralTypeAnnotation,
  Pure,
  Referenced,
  ReferencedIdentifier,
  ReferencedMemberExpression,
  RestProperty,
  Scope: Scope$1,
  SpreadProperty,
  Statement,
  User,
  Var
}, Symbol.toStringTag, { value: 'Module' });

class TraversalContext {
  constructor(opts, state) {
    this.state = state;
    this.opts = opts;
  }
  queue = null;
  priorityQueue = null;
  maybeQueue(path, notPriority) {
    if (this.queue) {
      if (notPriority) {
        this.queue.push(path);
      } else {
        this.priorityQueue.push(path);
      }
    }
  }
}

const {
  VISITOR_KEYS: VISITOR_KEYS$4
} = _t;
function _visitPaths(ctx, paths) {
  ctx.queue = paths;
  ctx.priorityQueue = [];
  const visited = new Set();
  let stop = false;
  let visitIndex = 0;
  for (; visitIndex < paths.length;) {
    const path = paths[visitIndex];
    visitIndex++;
    resync.call(path);
    if (path.contexts.length === 0 || path.contexts[path.contexts.length - 1] !== ctx) {
      pushContext.call(path, ctx);
    }
    if (path.key === null) continue;
    const {
      node
    } = path;
    if (visited.has(node)) continue;
    if (node) visited.add(node);
    if (_visit(ctx, path)) {
      stop = true;
      break;
    }
    if (ctx.priorityQueue.length) {
      stop = _visitPaths(ctx, ctx.priorityQueue);
      ctx.priorityQueue = [];
      ctx.queue = paths;
      if (stop) break;
    }
  }
  for (let i = 0; i < visitIndex; i++) {
    popContext.call(paths[i]);
  }
  ctx.queue = null;
  return stop;
}
function _visit(ctx, path) {
  const node = path.node;
  if (!node) {
    return false;
  }
  const opts = ctx.opts;
  const denylist = opts.denylist;
  if (denylist?.includes(node.type)) {
    return false;
  }
  if (opts.shouldSkip?.(path)) {
    return false;
  }
  if (path.shouldSkip) return path.shouldStop;
  if (_call.call(path, opts.enter)) return path.shouldStop;
  if (path.node) {
    if (_call.call(path, opts[node.type]?.enter)) return path.shouldStop;
  }
  path.shouldStop = traverseNode(path.node, opts, path.scope, ctx.state, path, path.skipKeys);
  if (path.node) {
    if (_call.call(path, opts.exit)) return path.shouldStop;
  }
  if (path.node) {
    _call.call(path, opts[node.type]?.exit);
  }
  return path.shouldStop;
}
function traverseNode(node, opts, scope, state, path, skipKeys, visitSelf) {
  const keys = VISITOR_KEYS$4[node.type];
  if (!keys?.length) return false;
  const ctx = new TraversalContext(opts, state);
  if (visitSelf) {
    if (skipKeys?.[path.parentKey]) return false;
    return _visitPaths(ctx, [path]);
  }
  const hub = path == null ? node.type === "Program" || node.type === "File" ? new Hub() : undefined : path.hub;
  for (const key of keys) {
    if (skipKeys?.[key]) continue;
    const prop = node[key];
    if (!prop) continue;
    if (Array.isArray(prop)) {
      if (!prop.length) continue;
      const paths = [];
      for (let i = 0; i < prop.length; i++) {
        const childPath = NodePath_Final.get({
          parentPath: path,
          parent: node,
          container: prop,
          key: i,
          listKey: key,
          hub
        });
        paths.push(childPath);
      }
      if (_visitPaths(ctx, paths)) return true;
    } else {
      if (_visitPaths(ctx, [NodePath_Final.get({
        parentPath: path,
        parent: node,
        container: node,
        key,
        listKey: null,
        hub
      })])) {
        return true;
      }
    }
  }
  return false;
}

const {
  isBinding,
  isBlockScoped: nodeIsBlockScoped,
  isExportDeclaration: isExportDeclaration$1,
  isExpression: nodeIsExpression,
  isFlow: nodeIsFlow,
  isForStatement,
  isForXStatement,
  isIdentifier: isIdentifier$5,
  isImportDeclaration: isImportDeclaration$1,
  isImportSpecifier,
  isJSXIdentifier,
  isJSXMemberExpression,
  isMemberExpression: isMemberExpression$1,
  isRestElement: nodeIsRestElement,
  isReferenced: nodeIsReferenced,
  isScope: nodeIsScope,
  isStatement: nodeIsStatement,
  isVar: nodeIsVar,
  isVariableDeclaration: isVariableDeclaration$2,
  react,
  isForOfStatement
} = _t;
const {
  isCompatTag
} = react;
function isReferencedIdentifier(opts) {
  const {
    node,
    parent
  } = this;
  if (isIdentifier$5(node, opts)) {
    return nodeIsReferenced(node, parent, this.parentPath.parent);
  } else if (isJSXIdentifier(node, opts)) {
    if (!isJSXMemberExpression(parent) && isCompatTag(node.name)) return false;
    return nodeIsReferenced(node, parent, this.parentPath.parent);
  } else {
    return false;
  }
}
function isReferencedMemberExpression() {
  const {
    node,
    parent
  } = this;
  return isMemberExpression$1(node) && nodeIsReferenced(node, parent);
}
function isBindingIdentifier() {
  const {
    node,
    parent
  } = this;
  const grandparent = this.parentPath.parent;
  return isIdentifier$5(node) && isBinding(node, parent, grandparent);
}
function isStatement$1() {
  const {
    node,
    parent
  } = this;
  if (nodeIsStatement(node)) {
    if (isVariableDeclaration$2(node)) {
      if (isForXStatement(parent, {
        left: node
      })) return false;
      if (isForStatement(parent, {
        init: node
      })) return false;
    }
    return true;
  } else {
    return false;
  }
}
function isExpression$3() {
  if (this.isIdentifier()) {
    return this.isReferencedIdentifier();
  } else {
    return nodeIsExpression(this.node);
  }
}
function isScope() {
  return nodeIsScope(this.node, this.parent);
}
function isReferenced() {
  return nodeIsReferenced(this.node, this.parent);
}
function isBlockScoped() {
  return nodeIsBlockScoped(this.node);
}
function isVar() {
  return nodeIsVar(this.node);
}
function isUser() {
  return !!this.node?.loc;
}
function isGenerated() {
  return !this.isUser();
}
function isPure(constantsOnly) {
  return this.scope.isPure(this.node, constantsOnly);
}
function isFlow() {
  const {
    node
  } = this;
  if (nodeIsFlow(node)) {
    return true;
  } else if (isImportDeclaration$1(node)) {
    return node.importKind === "type" || node.importKind === "typeof";
  } else if (isExportDeclaration$1(node)) {
    return node.exportKind === "type";
  } else if (isImportSpecifier(node)) {
    return node.importKind === "type" || node.importKind === "typeof";
  } else {
    return false;
  }
}
function isRestProperty() {
  return nodeIsRestElement(this.node) && this.parentPath?.isObjectPattern();
}
function isSpreadProperty() {
  return nodeIsRestElement(this.node) && this.parentPath?.isObjectExpression();
}
function isForAwaitStatement() {
  return isForOfStatement(this.node, {
    await: true
  });
}

const NodePath_virtual_types_validator = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  isBindingIdentifier,
  isBlockScoped,
  isExpression: isExpression$3,
  isFlow,
  isForAwaitStatement,
  isGenerated,
  isPure,
  isReferenced,
  isReferencedIdentifier,
  isReferencedMemberExpression,
  isRestProperty,
  isScope,
  isSpreadProperty,
  isStatement: isStatement$1,
  isUser,
  isVar
}, Symbol.toStringTag, { value: 'Module' });

const {
  DEPRECATED_KEYS,
  DEPRECATED_ALIASES,
  FLIPPED_ALIAS_KEYS,
  TYPES,
  __internal__deprecationWarning: deprecationWarning
} = _t;
function isVirtualType(type) {
  return type in virtualTypes;
}
function isExplodedVisitor(visitor) {
  return visitor?._exploded;
}
function explode$1(visitor) {
  if (isExplodedVisitor(visitor)) return visitor;
  visitor._exploded = true;
  if (Object.hasOwn(visitor, "blacklist")) {
    if (!Object.hasOwn(visitor, "denylist")) {
      throw new Error("The 'blacklist' visitor option has been renamed to 'denylist'. " + "Please update your configuration.");
    }
    delete visitor.blacklist;
  }
  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    const parts = nodeType.split("|");
    if (parts.length === 1) continue;
    const fns = visitor[nodeType];
    delete visitor[nodeType];
    for (const part of parts) {
      visitor[part] = fns;
    }
  }
  verify$1(visitor);
  delete visitor.__esModule;
  ensureEntranceObjects(visitor);
  ensureCallbackArrays(visitor);
  const visitorBase = visitor;
  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    if (!isVirtualType(nodeType)) continue;
    const fns = visitorBase[nodeType];
    for (const type of Object.keys(fns)) {
      fns[type] = wrapCheck(nodeType, fns[type]);
    }
    delete visitorBase[nodeType];
    const types = virtualTypes[nodeType];
    if (types !== null) {
      for (const type of types) {
        visitorBase[type] ??= {};
        mergePair(visitorBase[type], fns);
      }
    } else {
      mergePair(visitor, fns);
    }
  }
  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    let aliases = FLIPPED_ALIAS_KEYS[nodeType];
    if (nodeType in DEPRECATED_KEYS) {
      const deprecatedKey = DEPRECATED_KEYS[nodeType];
      deprecationWarning(nodeType, deprecatedKey, "Visitor ");
      aliases = [deprecatedKey];
    } else if (nodeType in DEPRECATED_ALIASES) {
      const deprecatedAlias = DEPRECATED_ALIASES[nodeType];
      deprecationWarning(nodeType, deprecatedAlias, "Visitor ");
      aliases = FLIPPED_ALIAS_KEYS[deprecatedAlias];
    }
    if (!aliases) continue;
    const fns = visitor[nodeType];
    delete visitor[nodeType];
    for (const alias of aliases) {
      const existing = visitorBase[alias];
      if (existing) {
        mergePair(existing, fns);
      } else {
        visitorBase[alias] = {
          ...fns
        };
      }
    }
  }
  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    ensureCallbackArrays(visitor[nodeType]);
  }
  return visitor;
}
function verify$1(visitor) {
  if (visitor._verified) return;
  if (typeof visitor === "function") {
    throw new Error("You passed `traverse()` a function when it expected a visitor object, " + "are you sure you didn't mean `{ enter: Function }`?");
  }
  for (const nodeType of Object.keys(visitor)) {
    if (nodeType === "enter" || nodeType === "exit") {
      validateVisitorMethods(nodeType, visitor[nodeType]);
    }
    if (shouldIgnoreKey(nodeType)) continue;
    if (!TYPES.includes(nodeType)) {
      throw new Error(`You gave us a visitor for the node type ${nodeType} but it's not a valid type in @babel/traverse ${"8.0.4"}`);
    }
    const visitors = visitor[nodeType];
    if (typeof visitors === "object") {
      for (const visitorKey of Object.keys(visitors)) {
        if (visitorKey === "enter" || visitorKey === "exit") {
          validateVisitorMethods(`${nodeType}.${visitorKey}`, visitors[visitorKey]);
        } else {
          throw new Error("You passed `traverse()` a visitor object with the property " + `${nodeType} that has the invalid property ${visitorKey}`);
        }
      }
    }
  }
  visitor._verified = true;
}
function validateVisitorMethods(path, val) {
  const fns = [].concat(val);
  for (const fn of fns) {
    if (typeof fn !== "function") {
      throw new TypeError(`Non-function found defined in ${path} with type ${typeof fn}`);
    }
  }
}
function merge(visitors, states = [], wrapper) {
  const mergedVisitor = {
    _verified: true,
    _exploded: true
  };
  for (let i = 0; i < visitors.length; i++) {
    const visitor = explode$1(visitors[i]);
    const state = states[i];
    let topVisitor = visitor;
    if (state || wrapper) {
      topVisitor = wrapWithStateOrWrapper(topVisitor, state, wrapper);
    }
    mergePair(mergedVisitor, topVisitor);
    for (const key of Object.keys(visitor)) {
      if (shouldIgnoreKey(key)) continue;
      let typeVisitor = visitor[key];
      if (state || wrapper) {
        typeVisitor = wrapWithStateOrWrapper(typeVisitor, state, wrapper);
      }
      const nodeVisitor = mergedVisitor[key] ||= {};
      mergePair(nodeVisitor, typeVisitor);
    }
  }
  return mergedVisitor;
}
function wrapWithStateOrWrapper(oldVisitor, state, wrapper) {
  const newVisitor = {};
  for (const phase of ["enter", "exit"]) {
    let fns = oldVisitor[phase];
    if (!Array.isArray(fns)) continue;
    fns = fns.map(function (fn) {
      let newFn = fn;
      if (state) {
        newFn = function (path) {
          fn.call(state, path, state);
        };
      }
      if (wrapper) {
        newFn = wrapper(state?.key, phase, newFn);
      }
      if (newFn !== fn) {
        newFn.toString = () => fn.toString();
      }
      return newFn;
    });
    newVisitor[phase] = fns;
  }
  return newVisitor;
}
function ensureEntranceObjects(obj) {
  for (const key of Object.keys(obj)) {
    if (shouldIgnoreKey(key)) continue;
    const fns = obj[key];
    if (typeof fns === "function") {
      obj[key] = {
        enter: fns
      };
    }
  }
}
function ensureCallbackArrays(obj) {
  if (obj.enter && !Array.isArray(obj.enter)) obj.enter = [obj.enter];
  if (obj.exit && !Array.isArray(obj.exit)) obj.exit = [obj.exit];
}
function wrapCheck(nodeType, fn) {
  const fnKey = `is${nodeType}`;
  const validator = NodePath_virtual_types_validator[fnKey];
  const newFn = function (path) {
    if (validator.call(path)) {
      return fn.apply(this, arguments);
    }
  };
  newFn.toString = () => fn.toString();
  return newFn;
}
function shouldIgnoreKey(key) {
  if (key.startsWith("_")) return true;
  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;
  if (key === "denylist" || key === "noScope" || key === "skipKeys") {
    return true;
  }
  if (key === "blacklist") {
    throw new Error("The 'blacklist' visitor option has been renamed to 'denylist'. " + "Please update your configuration.");
  }
  return false;
}
function mergePair(dest, src) {
  for (const phase of ["enter", "exit"]) {
    if (!src[phase]) continue;
    dest[phase] = [].concat(dest[phase] || [], src[phase]);
  }
}
const _environmentVisitor = {
  FunctionParent(path) {
    if (path.isArrowFunctionExpression()) return;
    path.skip();
    if (path.isMethod()) {
      path.requeueComputedKeyAndDecorators();
    }
  },
  Property(path) {
    if (path.isObjectProperty()) return;
    path.skip();
    path.requeueComputedKeyAndDecorators();
  }
};
function environmentVisitor(visitor) {
  return merge([_environmentVisitor, visitor]);
}

const visitors = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  environmentVisitor,
  explode: explode$1,
  isExplodedVisitor,
  merge,
  verify: verify$1
}, Symbol.toStringTag, { value: 'Module' });

const {
  getAssignmentIdentifiers: getAssignmentIdentifiers$1
} = _t;
let renameVisitor;
const getRenameVisitor = () => renameVisitor ??= explode$1({
  ReferencedIdentifier({
    node
  }, state) {
    if (node.name === state.oldName) {
      node.name = state.newName;
    }
  },
  Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.oldName, state.binding.identifier)) {
      path.skip();
      if (path.isMethod()) {
        path.requeueComputedKeyAndDecorators();
      }
      if (path.isSwitchStatement()) {
        path.context.maybeQueue(path.get("discriminant"));
      }
    }
  },
  ObjectProperty({
    node,
    scope
  }, state) {
    const {
      name
    } = node.key;
    if (node.shorthand && (name === state.oldName || name === state.newName) && scope.getBindingIdentifier(name) === state.binding.identifier) {
      node.shorthand = false;
    }
  },
  "AssignmentExpression|Declaration|VariableDeclarator"(path, state) {
    if (path.isVariableDeclaration()) return;
    const ids = path.isAssignmentExpression() ? getAssignmentIdentifiers$1(path.node) : path.getOuterBindingIdentifiers();
    for (const name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  }
});
class Renamer {
  constructor(binding, oldName, newName) {
    this.newName = newName;
    this.oldName = oldName;
    this.binding = binding;
  }
  maybeConvertFromExportDeclaration(parentDeclar) {
    const maybeExportDeclar = parentDeclar.parentPath;
    if (!maybeExportDeclar.isExportDeclaration()) {
      return;
    }
    if (maybeExportDeclar.isExportDefaultDeclaration()) {
      const {
        declaration
      } = maybeExportDeclar.node;
      if (_t.isDeclaration(declaration) && !declaration.id) {
        return;
      }
    }
    if (maybeExportDeclar.isExportAllDeclaration()) {
      return;
    }
    maybeExportDeclar.splitExportDeclaration();
  }
  maybeConvertFromClassFunctionDeclaration(path) {
    return path;
  }
  maybeConvertFromClassFunctionExpression(path) {
    return path;
  }
  rename() {
    const {
      binding,
      oldName,
      newName
    } = this;
    const {
      scope,
      path
    } = binding;
    const parentDeclar = path.find(path => path.isDeclaration() || path.isFunctionExpression() || path.isClassExpression());
    if (parentDeclar) {
      const bindingIds = parentDeclar.getOuterBindingIdentifiers();
      if (bindingIds[oldName] === binding.identifier) {
        this.maybeConvertFromExportDeclaration(parentDeclar);
      }
    }
    const blockToTraverse = scope.block;
    const skipKeys = {
      discriminant: true
    };
    if (_t.isMethod(blockToTraverse)) {
      if (blockToTraverse.computed) {
        skipKeys.key = true;
      }
      if (!_t.isObjectMethod(blockToTraverse)) {
        skipKeys.decorators = true;
      }
    }
    traverseNode(blockToTraverse, getRenameVisitor(), scope, this, scope.path, skipKeys);
    scope.removeOwnBinding(oldName);
    scope.bindings[newName] = binding;
    this.binding.identifier.name = newName;
    if (parentDeclar) {
      this.maybeConvertFromClassFunctionDeclaration(path);
      this.maybeConvertFromClassFunctionExpression(path);
    }
  }
}

const {
  VISITOR_KEYS: VISITOR_KEYS$3
} = _t;
function traverseForScope(path, visitors, state) {
  const exploded = explode$1(visitors);
  if (exploded.enter || exploded.exit) {
    throw new Error("Should not be used with enter/exit visitors.");
  }
  _traverse(path.parentPath, path.parent, path.node, path.container, path.key, path.listKey, path.hub, path);
  function _traverse(parentPath, parent, node, container, key, listKey, hub, inPath) {
    if (!node) {
      return;
    }
    const path = inPath || NodePath_Final.get({
      hub,
      parentPath,
      parent,
      container,
      listKey,
      key
    });
    _forceSetScope.call(path);
    const visitor = exploded[node.type];
    if (visitor?.enter) {
      for (const visit of visitor.enter) {
        visit.call(state, path, state);
      }
    }
    if (path.shouldSkip) {
      return;
    }
    const keys = VISITOR_KEYS$3[node.type];
    if (!keys?.length) {
      return;
    }
    for (const key of keys) {
      const prop = node[key];
      if (!prop) continue;
      if (Array.isArray(prop)) {
        for (let i = 0; i < prop.length; i++) {
          const value = prop[i];
          _traverse(path, node, value, prop, i, key);
        }
      } else {
        _traverse(path, node, prop, node, key, null);
      }
    }
    if (visitor?.exit) {
      for (const visit of visitor.exit) {
        visit.call(state, path, state);
      }
    }
  }
}

class Binding {
  identifier;
  scope;
  path;
  kind;
  constructor({
    identifier,
    scope,
    path,
    kind
  }) {
    this.identifier = identifier;
    this.scope = scope;
    this.path = path;
    this.kind = kind;
    if ((kind === "var" || kind === "hoisted") && isInitInLoop(path)) {
      this.reassign(path);
    }
    this.clearValue();
  }
  constantViolations = [];
  constant = true;
  referencePaths = [];
  referenced = false;
  references = 0;
  deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  }
  setValue(value) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value = value;
  }
  clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue = false;
    this.value = null;
  }
  reassign(path) {
    this.constant = false;
    if (this.constantViolations.includes(path)) {
      return;
    }
    this.constantViolations.push(path);
  }
  reference(path) {
    if (this.referencePaths.includes(path)) {
      return;
    }
    this.referenced = true;
    this.references++;
    this.referencePaths.push(path);
  }
  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }
}
function isInitInLoop(path) {
  const isFunctionDeclarationOrHasInit = !path.isVariableDeclarator() || path.node.init;
  for (let {
    parentPath,
    key
  } = path; parentPath; {
    parentPath,
    key
  } = parentPath) {
    if (parentPath.isFunctionParent()) return false;
    if (key === "left" && parentPath.isForXStatement() || isFunctionDeclarationOrHasInit && key === "body" && parentPath.isLoop()) {
      return true;
    }
  }
  return false;
}

let pathsCache = new WeakMap();
let scope = new WeakMap();
function clear() {
  clearPath();
  clearScope();
}
function clearPath() {
  pathsCache = new WeakMap();
}
function clearScope() {
  scope = new WeakMap();
}
function getCachedPaths(path) {
  const {
    parent,
    parentPath
  } = path;
  return parentPath ? parentPath._store : pathsCache.get(parent);
}
function getOrCreateCachedPaths(node, parentPath) {
  if (parentPath) {
    return parentPath._store ||= new Map();
  }
  let paths = pathsCache.get(node);
  if (!paths) pathsCache.set(node, paths = new Map());
  return paths;
}

const cache = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  clear,
  clearPath,
  clearScope,
  getCachedPaths,
  getOrCreateCachedPaths,
  get path () { return pathsCache; },
  get scope () { return scope; }
}, Symbol.toStringTag, { value: 'Module' });

const {
  assignmentExpression: assignmentExpression$3,
  cloneNode: cloneNode$3,
  getBindingIdentifiers: getBindingIdentifiers$2,
  identifier: identifier$3,
  isArrayExpression,
  isBinary,
  isCallExpression: isCallExpression$1,
  isClass,
  isClassBody,
  isClassDeclaration,
  isExportAllDeclaration,
  isExportDefaultDeclaration,
  isExportNamedDeclaration: isExportNamedDeclaration$1,
  isFunctionDeclaration,
  isIdentifier: isIdentifier$4,
  isImportDeclaration,
  isLiteral: isLiteral$1,
  isMemberExpression,
  isMethod,
  isModuleSpecifier,
  isNullLiteral,
  isObjectExpression,
  isProperty,
  isPureish,
  isRegExpLiteral,
  isSuper: isSuper$1,
  isTaggedTemplateExpression,
  isTemplateLiteral,
  isThisExpression,
  isUnaryExpression,
  isVariableDeclaration: isVariableDeclaration$1,
  expressionStatement: expressionStatement$3,
  matchesPattern: matchesPattern$1,
  toIdentifier,
  variableDeclaration: variableDeclaration$1,
  variableDeclarator: variableDeclarator$1,
  isObjectProperty,
  isTopicReference,
  isMetaProperty,
  isPrivateName,
  isExportDeclaration,
  sequenceExpression: sequenceExpression$2
} = _t;
function gatherNodeParts(node, parts) {
  switch (node?.type) {
    default:
      if (isImportDeclaration(node) || isExportDeclaration(node)) {
        if ((isExportAllDeclaration(node) || isExportNamedDeclaration$1(node) || isImportDeclaration(node)) && node.source) {
          gatherNodeParts(node.source, parts);
        } else if ((isExportNamedDeclaration$1(node) || isImportDeclaration(node)) && node.specifiers?.length) {
          for (const e of node.specifiers) gatherNodeParts(e, parts);
        } else if ((isExportDefaultDeclaration(node) || isExportNamedDeclaration$1(node)) && node.declaration) {
          gatherNodeParts(node.declaration, parts);
        }
      } else if (isModuleSpecifier(node)) {
        gatherNodeParts(node.local, parts);
      } else if (isLiteral$1(node) && !isNullLiteral(node) && !isRegExpLiteral(node) && !isTemplateLiteral(node)) {
        parts.push(node.value);
      }
      break;
    case "MemberExpression":
    case "OptionalMemberExpression":
    case "JSXMemberExpression":
      gatherNodeParts(node.object, parts);
      gatherNodeParts(node.property, parts);
      break;
    case "Identifier":
    case "JSXIdentifier":
      parts.push(node.name);
      break;
    case "CallExpression":
    case "OptionalCallExpression":
    case "NewExpression":
      gatherNodeParts(node.callee, parts);
      break;
    case "ObjectExpression":
    case "ObjectPattern":
      for (const e of node.properties) {
        gatherNodeParts(e, parts);
      }
      break;
    case "SpreadElement":
    case "RestElement":
      gatherNodeParts(node.argument, parts);
      break;
    case "ObjectProperty":
    case "ObjectMethod":
    case "ClassProperty":
    case "ClassMethod":
    case "ClassPrivateProperty":
    case "ClassPrivateMethod":
      gatherNodeParts(node.key, parts);
      break;
    case "ThisExpression":
      parts.push("this");
      break;
    case "Super":
      parts.push("super");
      break;
    case "Import":
    case "ImportExpression":
      parts.push("import");
      break;
    case "DoExpression":
      parts.push("do");
      break;
    case "YieldExpression":
      parts.push("yield");
      gatherNodeParts(node.argument, parts);
      break;
    case "AwaitExpression":
      parts.push("await");
      gatherNodeParts(node.argument, parts);
      break;
    case "AssignmentExpression":
      gatherNodeParts(node.left, parts);
      break;
    case "VariableDeclarator":
      gatherNodeParts(node.id, parts);
      break;
    case "FunctionExpression":
    case "FunctionDeclaration":
    case "ClassExpression":
    case "ClassDeclaration":
      gatherNodeParts(node.id, parts);
      break;
    case "PrivateName":
      gatherNodeParts(node.id, parts);
      break;
    case "ParenthesizedExpression":
      gatherNodeParts(node.expression, parts);
      break;
    case "UnaryExpression":
    case "UpdateExpression":
      gatherNodeParts(node.argument, parts);
      break;
    case "MetaProperty":
      gatherNodeParts(node.meta, parts);
      gatherNodeParts(node.property, parts);
      break;
    case "JSXElement":
      gatherNodeParts(node.openingElement, parts);
      break;
    case "JSXOpeningElement":
      gatherNodeParts(node.name, parts);
      break;
    case "JSXFragment":
      gatherNodeParts(node.openingFragment, parts);
      break;
    case "JSXOpeningFragment":
      parts.push("Fragment");
      break;
    case "JSXNamespacedName":
      gatherNodeParts(node.namespace, parts);
      gatherNodeParts(node.name, parts);
      break;
  }
}
function resetScope(scope) {
  if (scope.path.type === "Program") {
    scope.referencesSet = new Set();
    scope.uidsSet = new Set();
  }
  scope.bindings = Object.create(null);
  scope.globals = Object.create(null);
}
function isAnonymousFunctionExpression(path) {
  return path.isFunctionExpression() && !path.node.id || path.isArrowFunctionExpression();
}
const collectorVisitor = {
  ForStatement(path) {
    const declar = path.get("init");
    if (declar.isVar()) {
      const {
        scope
      } = path;
      const parentScope = scope.getFunctionParent() || scope.getProgramParent();
      parentScope.registerBinding("var", declar);
    }
  },
  Declaration(path) {
    if (path.isBlockScoped()) return;
    if (path.isImportDeclaration()) return;
    if (path.isExportDeclaration()) return;
    const parent = path.scope.getFunctionParent() || path.scope.getProgramParent();
    parent.registerDeclaration(path);
  },
  ImportDeclaration(path) {
    const parent = path.scope.getBlockParent();
    parent.registerDeclaration(path);
  },
  TSImportEqualsDeclaration(path) {
    const parent = path.scope.getBlockParent();
    parent.registerDeclaration(path);
  },
  ReferencedIdentifier(path, state) {
    if (_t.isTSQualifiedName(path.parent) && path.parent.right === path.node) {
      return;
    }
    if (path.parentPath.isTSImportEqualsDeclaration()) return;
    state.references.push(path);
  },
  ForXStatement(path, state) {
    const left = path.get("left");
    if (left.isPattern() || left.isIdentifier()) {
      state.constantViolations.push(path);
    } else if (left.isVar()) {
      const {
        scope
      } = path;
      const parentScope = scope.getFunctionParent() || scope.getProgramParent();
      parentScope.registerBinding("var", left);
    }
  },
  ExportDeclaration: {
    exit(path) {
      const {
        node,
        scope
      } = path;
      if (isExportAllDeclaration(node)) return;
      const declar = node.declaration;
      if (isClassDeclaration(declar) || isFunctionDeclaration(declar)) {
        const id = declar.id;
        if (!id) return;
        const binding = scope.getBinding(id.name);
        binding?.reference(path);
      } else if (isVariableDeclaration$1(declar)) {
        for (const decl of declar.declarations) {
          for (const name of Object.keys(getBindingIdentifiers$2(decl))) {
            const binding = scope.getBinding(name);
            binding?.reference(path);
          }
        }
      }
    }
  },
  LabeledStatement(path) {
    path.scope.getBlockParent().registerDeclaration(path);
  },
  AssignmentExpression(path, state) {
    state.assignments.push(path);
  },
  UpdateExpression(path, state) {
    state.constantViolations.push(path);
  },
  UnaryExpression(path, state) {
    if (path.node.operator === "delete") {
      state.constantViolations.push(path);
    }
  },
  BlockScoped(path) {
    let scope = path.scope;
    if (scope.path === path) scope = scope.parent;
    const parent = scope.getBlockParent();
    parent.registerDeclaration(path);
    if (path.isClassDeclaration() && path.node.id) {
      const id = path.node.id;
      const name = id.name;
      path.scope.bindings[name] = path.scope.parent.getBinding(name);
    }
  },
  CatchClause(path) {
    path.scope.registerBinding("let", path);
  },
  Function(path) {
    const params = path.get("params");
    for (const param of params) {
      path.scope.registerBinding("param", param);
    }
    if (path.isFunctionExpression() && path.node.id) {
      path.scope.registerBinding("local", path.get("id"), path);
    }
  },
  ClassExpression(path) {
    if (path.node.id) {
      path.scope.registerBinding("local", path.get("id"), path);
    }
  },
  TSTypeAnnotation(path) {
    path.skip();
  }
};
let scopeVisitor;
let uid = 0;
class Scope {
  uid;
  path;
  block;
  inited;
  labels;
  bindings;
  referencesSet;
  globals;
  uidsSet;
  data;
  crawling;
  constructor(path) {
    const {
      node
    } = path;
    const cached = scope.get(node);
    if (cached?.path === path) {
      return cached;
    }
    scope.set(node, this);
    this.uid = uid++;
    this.block = node;
    this.path = path;
    this.labels = new Map();
    this.inited = false;
  }
  static globals = [...globalsBuiltinLower, ...globalsBuiltinUpper];
  static contextVariables = ["arguments", "undefined", "Infinity", "NaN"];
  get parent() {
    let parent,
      path = this.path;
    do {
      const shouldSkip = path.key === "key" || path.listKey === "decorators";
      path = path.parentPath;
      if (shouldSkip && path.isMethod()) path = path.parentPath;
      if (path?.isScope()) parent = path;
    } while (path && !parent);
    return parent?.scope;
  }
  get references() {
    throw new Error("Scope#references is not available in Babel 8. Use Scope#referencesSet instead.");
  }
  get uids() {
    throw new Error("Scope#uids is not available in Babel 8. Use Scope#uidsSet instead.");
  }
  generateDeclaredUidIdentifier(name) {
    const id = this.generateUidIdentifier(name);
    this.push({
      id
    });
    return cloneNode$3(id);
  }
  generateUidIdentifier(name) {
    return identifier$3(this.generateUid(name));
  }
  generateUid(name = "temp") {
    name = toIdentifier(name).replace(/^_+/, "").replace(/\d+$/g, "");
    let uid;
    let i = 0;
    do {
      uid = `_${name}`;
      if (i >= 11) uid += i - 1;else if (i >= 9) uid += i - 9;else if (i >= 1) uid += i + 1;
      i++;
    } while (this.hasLabel(uid) || this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));
    const program = this.getProgramParent();
    program.referencesSet.add(uid);
    program.uidsSet.add(uid);
    return uid;
  }
  generateUidBasedOnNode(node, defaultName) {
    const parts = [];
    gatherNodeParts(node, parts);
    let id = parts.join("$");
    id = id.replace(/^_/, "") || defaultName || "ref";
    return this.generateUid(id.slice(0, 20));
  }
  generateUidIdentifierBasedOnNode(node, defaultName) {
    return identifier$3(this.generateUidBasedOnNode(node, defaultName));
  }
  isStatic(node) {
    if (isThisExpression(node) || isSuper$1(node) || isTopicReference(node)) {
      return true;
    }
    if (isIdentifier$4(node)) {
      const binding = this.getBinding(node.name);
      if (binding) {
        return binding.constant;
      } else {
        return this.hasBinding(node.name);
      }
    }
    return false;
  }
  maybeGenerateMemoised(node, dontPush) {
    if (this.isStatic(node)) {
      return null;
    } else {
      const id = this.generateUidIdentifierBasedOnNode(node);
      if (!dontPush) {
        this.push({
          id
        });
        return cloneNode$3(id);
      }
      return id;
    }
  }
  checkBlockScopedCollisions(local, kind, name, id) {
    if (kind === "param") return;
    if (local.kind === "local") return;
    const duplicate = kind === "let" || local.kind === "let" || local.kind === "const" || local.kind === "module" || local.kind === "param" && kind === "const";
    if (duplicate) {
      throw this.path.hub.buildError(id, `Duplicate declaration "${name}"`, TypeError);
    }
  }
  rename(oldName, newName) {
    const binding = this.getBinding(oldName);
    if (binding) {
      newName ||= this.generateUidIdentifier(oldName).name;
      const renamer = new Renamer(binding, oldName, newName);
      renamer.rename();
    }
  }
  dump() {
    const sep = "-".repeat(60);
    console.log(sep);
    let scope = this;
    do {
      console.log("#", scope.block.type);
      for (const name of Object.keys(scope.bindings)) {
        const binding = scope.bindings[name];
        console.log(" -", name, {
          constant: binding.constant,
          references: binding.references,
          violations: binding.constantViolations.length,
          kind: binding.kind
        });
      }
    } while (scope = scope.parent);
    console.log(sep);
  }
  hasLabel(name) {
    return !!this.getLabel(name);
  }
  getLabel(name) {
    return this.labels.get(name);
  }
  registerLabel(path) {
    this.labels.set(path.node.label.name, path);
  }
  registerDeclaration(path) {
    if (path.isLabeledStatement()) {
      this.registerLabel(path);
    } else if (path.isFunctionDeclaration()) {
      this.registerBinding("hoisted", path.get("id"), path);
    } else if (path.isVariableDeclaration()) {
      const declarations = path.get("declarations");
      const {
        kind
      } = path.node;
      for (const declar of declarations) {
        this.registerBinding(kind === "using" || kind === "await using" ? "const" : kind, declar);
      }
    } else if (path.isClassDeclaration()) {
      if (path.node.declare) return;
      this.registerBinding("let", path);
    } else if (path.isImportDeclaration()) {
      const isTypeDeclaration = path.node.importKind === "type" || path.node.importKind === "typeof";
      const specifiers = path.get("specifiers");
      for (const specifier of specifiers) {
        const isTypeSpecifier = isTypeDeclaration || specifier.isImportSpecifier() && (specifier.node.importKind === "type" || specifier.node.importKind === "typeof");
        this.registerBinding(isTypeSpecifier ? "unknown" : "module", specifier);
      }
    } else if (path.isExportDeclaration()) {
      const declar = path.get("declaration");
      if (declar.isClassDeclaration() || declar.isFunctionDeclaration() || declar.isVariableDeclaration()) {
        this.registerDeclaration(declar);
      }
    } else {
      this.registerBinding("unknown", path);
    }
  }
  registerConstantViolation(path) {
    const ids = path.getAssignmentIdentifiers();
    for (const name of Object.keys(ids)) {
      this.getBinding(name)?.reassign(path);
    }
  }
  registerBinding(kind, path, bindingPath = path) {
    if (!kind) throw new ReferenceError("no `kind`");
    if (path.isVariableDeclaration()) {
      const declarators = path.get("declarations");
      for (const declar of declarators) {
        this.registerBinding(kind, declar);
      }
      return;
    }
    const parent = this.getProgramParent();
    const ids = path.getOuterBindingIdentifiers(true);
    for (const name of Object.keys(ids)) {
      parent.referencesSet.add(name);
      for (const id of ids[name]) {
        const local = this.getOwnBinding(name);
        if (local) {
          if (local.identifier === id) continue;
          this.checkBlockScopedCollisions(local, kind, name, id);
        }
        if (local) {
          local.reassign(bindingPath);
        } else {
          this.bindings[name] = new Binding({
            identifier: id,
            scope: this,
            path: bindingPath,
            kind: kind
          });
        }
      }
    }
  }
  addGlobal(node) {
    this.globals[node.name] = node;
  }
  hasUid(name) {
    return this.getProgramParent().uidsSet.has(name);
  }
  hasGlobal(name) {
    let scope = this;
    do {
      if (scope.globals[name]) return true;
    } while (scope = scope.parent);
    return false;
  }
  hasReference(name) {
    return this.getProgramParent().referencesSet.has(name);
  }
  isPure(node, constantsOnly) {
    if (isIdentifier$4(node)) {
      const binding = this.getBinding(node.name);
      if (!binding) return false;
      if (constantsOnly) return binding.constant;
      return true;
    } else if (isThisExpression(node) || isMetaProperty(node) || isTopicReference(node) || isPrivateName(node)) {
      return true;
    } else if (isClass(node)) {
      if (node.superClass && !this.isPure(node.superClass, constantsOnly)) {
        return false;
      }
      if (node.decorators?.length > 0) {
        return false;
      }
      return this.isPure(node.body, constantsOnly);
    } else if (isClassBody(node)) {
      for (const method of node.body) {
        if (!this.isPure(method, constantsOnly)) return false;
      }
      return true;
    } else if (isBinary(node)) {
      return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
    } else if (isArrayExpression(node)) {
      for (const elem of node.elements) {
        if (elem !== null && !this.isPure(elem, constantsOnly)) return false;
      }
      return true;
    } else if (isObjectExpression(node)) {
      for (const prop of node.properties) {
        if (!this.isPure(prop, constantsOnly)) return false;
      }
      return true;
    } else if (isMethod(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      if (node.decorators?.length > 0) {
        return false;
      }
      return true;
    } else if (isProperty(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      if (node.decorators?.length > 0) {
        return false;
      }
      if (isObjectProperty(node) || node.static) {
        if (node.value !== null && !this.isPure(node.value, constantsOnly)) {
          return false;
        }
      }
      return true;
    } else if (isUnaryExpression(node)) {
      return this.isPure(node.argument, constantsOnly);
    } else if (isTemplateLiteral(node)) {
      for (const expression of node.expressions) {
        if (!this.isPure(expression, constantsOnly)) return false;
      }
      return true;
    } else if (isTaggedTemplateExpression(node)) {
      return matchesPattern$1(node.tag, "String.raw") && !this.hasBinding("String", {
        noGlobals: true
      }) && this.isPure(node.quasi, constantsOnly);
    } else if (isMemberExpression(node)) {
      return !node.computed && isIdentifier$4(node.object) && node.object.name === "Symbol" && isIdentifier$4(node.property) && node.property.name !== "for" && !this.hasBinding("Symbol", {
        noGlobals: true
      });
    } else if (isCallExpression$1(node)) {
      return matchesPattern$1(node.callee, "Symbol.for") && !this.hasBinding("Symbol", {
        noGlobals: true
      }) && node.arguments.length === 1 && _t.isStringLiteral(node.arguments[0]);
    } else {
      return isPureish(node);
    }
  }
  setData(key, val) {
    return this.data[key] = val;
  }
  getData(key) {
    let scope = this;
    do {
      const data = scope.data[key];
      if (data != null) return data;
    } while (scope = scope.parent);
  }
  removeData(key) {
    let scope = this;
    do {
      const data = scope.data[key];
      if (data != null) scope.data[key] = null;
    } while (scope = scope.parent);
  }
  init() {
    if (!this.inited) {
      this.inited = true;
      this.crawl();
    }
  }
  crawl() {
    const path = this.path;
    resetScope(this);
    this.data = Object.create(null);
    let scope = this;
    do {
      if (scope.crawling) return;
      if (scope.path.isProgram()) {
        break;
      }
    } while (scope = scope.parent);
    const programParent = scope;
    const state = {
      references: [],
      constantViolations: [],
      assignments: []
    };
    this.crawling = true;
    scopeVisitor ||= traverse.visitors.merge([{
      Scope(path) {
        resetScope(path.scope);
      }
    }, collectorVisitor]);
    if (path.type !== "Program") {
      const typeVisitors = scopeVisitor[path.type];
      if (typeVisitors) {
        for (const visit of typeVisitors.enter) {
          visit.call(state, path, state);
        }
      }
    }
    traverseForScope(path, scopeVisitor, state);
    this.crawling = false;
    for (const path of state.assignments) {
      const ids = path.getAssignmentIdentifiers();
      for (const name of Object.keys(ids)) {
        if (path.scope.getBinding(name)) continue;
        programParent.addGlobal(ids[name]);
      }
      path.scope.registerConstantViolation(path);
    }
    for (const ref of state.references) {
      const binding = ref.scope.getBinding(ref.node.name);
      if (binding) {
        binding.reference(ref);
      } else {
        programParent.addGlobal(ref.node);
      }
    }
    for (const path of state.constantViolations) {
      path.scope.registerConstantViolation(path);
    }
  }
  push(opts) {
    let path = this.path;
    if (path.isPattern()) {
      path = this.getPatternParent().path;
    } else if (!path.isBlockStatement() && !path.isProgram()) {
      path = this.getBlockParent().path;
    }
    if (path.isSwitchStatement()) {
      path = (this.getFunctionParent() || this.getProgramParent()).path;
    }
    const {
      init,
      unique,
      kind = "var",
      id
    } = opts;
    if (!init && !unique && (kind === "var" || kind === "let") && isAnonymousFunctionExpression(path) && isCallExpression$1(path.parent, {
      callee: path.node
    }) && path.parent.arguments.length <= path.node.params.length && isIdentifier$4(id)) {
      path.pushContainer("params", id);
      path.scope.registerBinding("param", path.get("params")[path.node.params.length - 1]);
      return;
    }
    if (path.isLoop() || path.isCatchClause() || path.isFunction()) {
      path.ensureBlock();
      path = path.get("body");
    }
    const blockHoist = opts._blockHoist == null ? 2 : opts._blockHoist;
    const dataKey = `declaration:${kind}:${blockHoist}`;
    let declarPath = !unique && path.getData(dataKey);
    if (!declarPath) {
      const declar = variableDeclaration$1(kind, []);
      declar._blockHoist = blockHoist;
      [declarPath] = path.unshiftContainer("body", [declar]);
      if (!unique) path.setData(dataKey, declarPath);
    }
    const declarator = variableDeclarator$1(id, init);
    const len = declarPath.node.declarations.push(declarator);
    path.scope.registerBinding(kind, declarPath.get("declarations")[len - 1]);
  }
  getProgramParent() {
    let scope = this;
    do {
      if (scope.path.isProgram()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("Couldn't find a Program");
  }
  getFunctionParent() {
    let scope = this;
    do {
      if (scope.path.isFunctionParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    return null;
  }
  getBlockParent() {
    let scope = this;
    do {
      if (scope.path.isBlockParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
  }
  getPatternParent() {
    let scope = this;
    do {
      if (!scope.path.isPattern()) {
        return scope.getBlockParent();
      }
    } while (scope = scope.parent.parent);
    throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
  }
  getAllBindings() {
    const ids = Object.create(null);
    let scope = this;
    do {
      for (const key of Object.keys(scope.bindings)) {
        if (key in ids === false) {
          ids[key] = scope.bindings[key];
        }
      }
      scope = scope.parent;
    } while (scope);
    return ids;
  }
  bindingIdentifierEquals(name, node) {
    return this.getBindingIdentifier(name) === node;
  }
  getBinding(name) {
    let scope = this;
    let previousPath;
    do {
      const binding = scope.getOwnBinding(name);
      if (binding) {
        if (previousPath?.isPattern() && binding.kind !== "param" && binding.kind !== "local") ; else {
          return binding;
        }
      } else if (!binding && name === "arguments" && scope.path.isFunction() && !scope.path.isArrowFunctionExpression()) {
        break;
      }
      previousPath = scope.path;
    } while (scope = scope.parent);
  }
  getOwnBinding(name) {
    return this.bindings[name];
  }
  getBindingIdentifier(name) {
    return this.getBinding(name)?.identifier;
  }
  getOwnBindingIdentifier(name) {
    const binding = this.bindings[name];
    return binding?.identifier;
  }
  hasOwnBinding(name) {
    return !!this.getOwnBinding(name);
  }
  hasBinding(name, opts) {
    if (!name) return false;
    let noGlobals;
    let noUids;
    let upToScope;
    if (typeof opts === "object") {
      noGlobals = opts.noGlobals;
      noUids = opts.noUids;
      upToScope = opts.upToScope;
    } else if (typeof opts === "boolean") {
      noGlobals = opts;
    }
    let scope = this;
    do {
      if (upToScope === scope) {
        break;
      }
      if (scope.hasOwnBinding(name)) {
        return true;
      }
    } while (scope = scope.parent);
    if (!noUids && this.hasUid(name)) return true;
    if (!noGlobals && Scope.globals.includes(name)) return true;
    if (!noGlobals && Scope.contextVariables.includes(name)) return true;
    return false;
  }
  parentHasBinding(name, opts) {
    return this.parent?.hasBinding(name, opts);
  }
  moveBindingTo(name, scope) {
    const info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
      info.scope = scope;
      scope.bindings[name] = info;
    }
  }
  removeOwnBinding(name) {
    delete this.bindings[name];
  }
  removeBinding(name) {
    this.getBinding(name)?.scope.removeOwnBinding(name);
    this.getProgramParent().uidsSet.delete(name);
  }
  hoistVariables(emit = id => this.push({
    id
  })) {
    this.crawl();
    const seen = new Set();
    for (const name of Object.keys(this.bindings)) {
      const binding = this.bindings[name];
      if (!binding) continue;
      const {
        path
      } = binding;
      if (!path.isVariableDeclarator()) continue;
      const {
        parent,
        parentPath
      } = path;
      if (parent.kind !== "var" || seen.has(parent)) continue;
      seen.add(path.parent);
      let firstId;
      const init = [];
      for (const decl of parent.declarations) {
        firstId ??= decl.id;
        if (decl.init) {
          init.push(assignmentExpression$3("=", decl.id, decl.init));
        }
        const ids = Object.keys(getBindingIdentifiers$2(decl, false, true, true));
        for (const name of ids) {
          emit(identifier$3(name), decl.init != null);
        }
      }
      if (parentPath.parentPath.isForXStatement({
        left: parent
      })) {
        parentPath.replaceWith(firstId);
      } else if (init.length === 0) {
        parentPath.remove();
      } else {
        const expr = init.length === 1 ? init[0] : sequenceExpression$2(init);
        if (parentPath.parentPath.isForStatement({
          init: parent
        })) {
          parentPath.replaceWith(expr);
        } else {
          parentPath.replaceWith(expressionStatement$3(expr));
        }
      }
    }
  }
}

const {
  VISITOR_KEYS: VISITOR_KEYS$2
} = _t;
function findParent(callback) {
  let path = this;
  while (path = path.parentPath) {
    if (callback(path)) return path;
  }
  return null;
}
function find(callback) {
  let path = this;
  do {
    if (callback(path)) return path;
  } while (path = path.parentPath);
  return null;
}
function getFunctionParent() {
  return this.findParent(p => p.isFunction());
}
function getStatementParent() {
  let path = this;
  do {
    if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) {
      break;
    } else {
      path = path.parentPath;
    }
  } while (path);
  if (path && (path.isProgram() || path.isFile())) {
    throw new Error("File/Program node, we can't possibly find a statement parent to this");
  }
  return path;
}
function getEarliestCommonAncestorFrom(paths) {
  return this.getDeepestCommonAncestorFrom(paths, function (deepest, i, ancestries) {
    let earliest;
    const keys = VISITOR_KEYS$2[deepest.type];
    for (const ancestry of ancestries) {
      const path = ancestry[i + 1];
      if (!earliest) {
        earliest = path;
        continue;
      }
      if (path.listKey && earliest.listKey === path.listKey) {
        if (path.key < earliest.key) {
          earliest = path;
          continue;
        }
      }
      const earliestKeyIndex = keys.indexOf(earliest.parentKey);
      const currentKeyIndex = keys.indexOf(path.parentKey);
      if (earliestKeyIndex > currentKeyIndex) {
        earliest = path;
      }
    }
    return earliest;
  });
}
function getDeepestCommonAncestorFrom(paths, filter) {
  if (!paths.length) {
    return this;
  }
  if (paths.length === 1) {
    return paths[0];
  }
  let minDepth = Infinity;
  let lastCommonIndex, lastCommon;
  const ancestries = paths.map(path => {
    const ancestry = [];
    do {
      ancestry.unshift(path);
    } while ((path = path.parentPath) && path !== this);
    if (ancestry.length < minDepth) {
      minDepth = ancestry.length;
    }
    return ancestry;
  });
  const first = ancestries[0];
  depthLoop: for (let i = 0; i < minDepth; i++) {
    const shouldMatch = first[i];
    for (const ancestry of ancestries) {
      if (ancestry[i] !== shouldMatch) {
        break depthLoop;
      }
    }
    lastCommonIndex = i;
    lastCommon = shouldMatch;
  }
  if (lastCommon) {
    if (filter) {
      return filter(lastCommon, lastCommonIndex, ancestries);
    } else {
      return lastCommon;
    }
  } else {
    throw new Error("Couldn't find intersection");
  }
}
function getAncestry() {
  let path = this;
  const paths = [];
  do {
    paths.push(path);
  } while (path = path.parentPath);
  return paths;
}
function isAncestor(maybeDescendant) {
  return maybeDescendant.isDescendant(this);
}
function isDescendant(maybeAncestor) {
  return !!this.findParent(parent => parent === maybeAncestor);
}
function inType(...candidateTypes) {
  let path = this;
  while (path) {
    if (candidateTypes.includes(path.node.type)) return true;
    path = path.parentPath;
  }
  return false;
}

const {
  createFlowUnionType,
  createTSUnionType,
  isFlowType,
  isTSType
} = _t;
function createUnionType(types) {
  if (types.every(v => isFlowType(v))) {
    return createFlowUnionType(types);
  }
  if (types.every(v => isTSType(v))) {
    return createTSUnionType(types);
  }
}

const {
  BOOLEAN_NUMBER_BINARY_OPERATORS,
  createTypeAnnotationBasedOnTypeof,
  numberTypeAnnotation: numberTypeAnnotation$1,
  voidTypeAnnotation: voidTypeAnnotation$2
} = _t;
function infererReference (node) {
  if (!this.isReferenced()) return;
  const binding = this.scope.getBinding(node.name);
  if (binding) {
    if (binding.identifier.typeAnnotation) {
      return binding.identifier.typeAnnotation;
    } else {
      return getTypeAnnotationBindingConstantViolations(binding, this, node.name);
    }
  }
  if (node.name === "undefined") {
    return voidTypeAnnotation$2();
  } else if (node.name === "NaN" || node.name === "Infinity") {
    return numberTypeAnnotation$1();
  } else if (node.name === "arguments") ;
}
function getTypeAnnotationBindingConstantViolations(binding, path, name) {
  const types = [];
  const functionConstantViolations = [];
  let constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);
  const testType = getConditionalAnnotation(binding, path, name);
  if (testType) {
    const testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);
    constantViolations = constantViolations.filter(path => !testConstantViolations.includes(path));
    types.push(testType.typeAnnotation);
  }
  if (constantViolations.length) {
    constantViolations.push(...functionConstantViolations);
    for (const violation of constantViolations) {
      types.push(violation.getTypeAnnotation());
    }
  }
  if (!types.length) {
    return;
  }
  return createUnionType(types);
}
function getConstantViolationsBefore(binding, path, functions) {
  const violations = binding.constantViolations.slice();
  violations.unshift(binding.path);
  return violations.filter(violation => {
    violation = violation.resolve();
    const status = violation._guessExecutionStatusRelativeTo(path);
    if (functions && status === "unknown") functions.push(violation);
    return status === "before";
  });
}
function inferAnnotationFromBinaryExpression(name, path) {
  const operator = path.node.operator;
  const right = path.get("right").resolve();
  const left = path.get("left").resolve();
  let target;
  if (left.isIdentifier({
    name
  })) {
    target = right;
  } else if (right.isIdentifier({
    name
  })) {
    target = left;
  }
  if (target) {
    if (operator === "===") {
      return target.getTypeAnnotation();
    }
    if (BOOLEAN_NUMBER_BINARY_OPERATORS.includes(operator)) {
      return numberTypeAnnotation$1();
    }
    return;
  }
  if (operator !== "===" && operator !== "==") return;
  let typeofPath;
  let typePath;
  if (left.isUnaryExpression({
    operator: "typeof"
  })) {
    typeofPath = left;
    typePath = right;
  } else if (right.isUnaryExpression({
    operator: "typeof"
  })) {
    typeofPath = right;
    typePath = left;
  }
  if (!typeofPath) return;
  if (!typeofPath.get("argument").isIdentifier({
    name
  })) return;
  typePath = typePath.resolve();
  if (!typePath.isLiteral()) return;
  const typeValue = typePath.node.value;
  if (typeof typeValue !== "string") return;
  return createTypeAnnotationBasedOnTypeof(typeValue);
}
function getParentConditionalPath(binding, path, name) {
  let parentPath;
  while (parentPath = path.parentPath) {
    if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
      if (path.key === "test") {
        return;
      }
      return parentPath;
    }
    if (parentPath.isFunction()) {
      if (name == null || parentPath.parentPath.scope.getBinding(name) !== binding) return;
    }
    path = parentPath;
  }
}
function getConditionalAnnotation(binding, path, name) {
  const ifStatement = getParentConditionalPath(binding, path, name);
  if (!ifStatement) return;
  const test = ifStatement.get("test");
  const paths = [test];
  const types = [];
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (path.isLogicalExpression()) {
      if (path.node.operator === "&&") {
        paths.push(path.get("left"));
        paths.push(path.get("right"));
      }
    } else if (path.isBinaryExpression()) {
      const type = inferAnnotationFromBinaryExpression(name, path);
      if (type) types.push(type);
    }
  }
  if (types.length) {
    return {
      typeAnnotation: createUnionType(types),
      ifStatement
    };
  }
  return getConditionalAnnotation(binding, ifStatement, name);
}

const {
  BOOLEAN_BINARY_OPERATORS,
  BOOLEAN_UNARY_OPERATORS,
  NUMBER_BINARY_OPERATORS,
  NUMBER_UNARY_OPERATORS,
  STRING_UNARY_OPERATORS,
  anyTypeAnnotation: anyTypeAnnotation$1,
  arrayTypeAnnotation,
  booleanTypeAnnotation,
  buildMatchMemberExpression,
  genericTypeAnnotation,
  identifier: identifier$2,
  nullLiteralTypeAnnotation,
  numberTypeAnnotation,
  stringTypeAnnotation: stringTypeAnnotation$1,
  tupleTypeAnnotation,
  unionTypeAnnotation,
  voidTypeAnnotation: voidTypeAnnotation$1,
  isIdentifier: isIdentifier$3
} = _t;
function VariableDeclarator() {
  if (!this.get("id").isIdentifier()) return;
  return this.get("init").getTypeAnnotation();
}
function TypeCastExpression(node) {
  return node.typeAnnotation;
}
TypeCastExpression.validParent = true;
function TSAsExpression(node) {
  return node.typeAnnotation;
}
TSAsExpression.validParent = true;
function TSNonNullExpression() {
  return this.get("expression").getTypeAnnotation();
}
function NewExpression(node) {
  if (node.callee.type === "Identifier") {
    return genericTypeAnnotation(node.callee);
  }
}
function TemplateLiteral() {
  return stringTypeAnnotation$1();
}
function UnaryExpression(node) {
  const operator = node.operator;
  if (operator === "void") {
    return voidTypeAnnotation$1();
  } else if (NUMBER_UNARY_OPERATORS.includes(operator)) {
    return numberTypeAnnotation();
  } else if (STRING_UNARY_OPERATORS.includes(operator)) {
    return stringTypeAnnotation$1();
  } else if (BOOLEAN_UNARY_OPERATORS.includes(operator)) {
    return booleanTypeAnnotation();
  }
}
function BinaryExpression(node) {
  const operator = node.operator;
  if (NUMBER_BINARY_OPERATORS.includes(operator)) {
    return numberTypeAnnotation();
  } else if (BOOLEAN_BINARY_OPERATORS.includes(operator)) {
    return booleanTypeAnnotation();
  } else if (operator === "+") {
    const right = this.get("right");
    const left = this.get("left");
    if (left.isBaseType("number") && right.isBaseType("number")) {
      return numberTypeAnnotation();
    } else if (left.isBaseType("string") || right.isBaseType("string")) {
      return stringTypeAnnotation$1();
    }
    return unionTypeAnnotation([stringTypeAnnotation$1(), numberTypeAnnotation()]);
  }
}
function LogicalExpression() {
  const argumentTypes = [this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation()];
  return createUnionType(argumentTypes);
}
function ConditionalExpression() {
  const argumentTypes = [this.get("consequent").getTypeAnnotation(), this.get("alternate").getTypeAnnotation()];
  return createUnionType(argumentTypes);
}
function SequenceExpression() {
  return this.get("expressions").pop().getTypeAnnotation();
}
function ParenthesizedExpression() {
  return this.get("expression").getTypeAnnotation();
}
function AssignmentExpression() {
  return this.get("right").getTypeAnnotation();
}
function UpdateExpression(node) {
  const operator = node.operator;
  if (operator === "++" || operator === "--") {
    return numberTypeAnnotation();
  }
}
function StringLiteral() {
  return stringTypeAnnotation$1();
}
function NumericLiteral() {
  return numberTypeAnnotation();
}
function BooleanLiteral() {
  return booleanTypeAnnotation();
}
function NullLiteral() {
  return nullLiteralTypeAnnotation();
}
function RegExpLiteral() {
  return genericTypeAnnotation(identifier$2("RegExp"));
}
function ObjectExpression() {
  return genericTypeAnnotation(identifier$2("Object"));
}
function ArrayExpression() {
  return genericTypeAnnotation(identifier$2("Array"));
}
function RestElement() {
  return ArrayExpression();
}
RestElement.validParent = true;
function Func() {
  return genericTypeAnnotation(identifier$2("Function"));
}
const isArrayFrom = buildMatchMemberExpression("Array.from");
const isObjectKeys = buildMatchMemberExpression("Object.keys");
const isObjectValues = buildMatchMemberExpression("Object.values");
const isObjectEntries = buildMatchMemberExpression("Object.entries");
function CallExpression() {
  const {
    callee
  } = this.node;
  if (isObjectKeys(callee)) {
    return arrayTypeAnnotation(stringTypeAnnotation$1());
  } else if (isArrayFrom(callee) || isObjectValues(callee) || isIdentifier$3(callee, {
    name: "Array"
  })) {
    return arrayTypeAnnotation(anyTypeAnnotation$1());
  } else if (isObjectEntries(callee)) {
    return arrayTypeAnnotation(tupleTypeAnnotation([stringTypeAnnotation$1(), anyTypeAnnotation$1()]));
  }
  return resolveCall(this.get("callee"));
}
function TaggedTemplateExpression() {
  return resolveCall(this.get("tag"));
}
function resolveCall(callee) {
  callee = callee.resolve();
  if (callee.isFunction()) {
    const {
      node
    } = callee;
    if (node.async) {
      if (node.generator) {
        return genericTypeAnnotation(identifier$2("AsyncIterator"));
      } else {
        return genericTypeAnnotation(identifier$2("Promise"));
      }
    } else {
      if (node.generator) {
        return genericTypeAnnotation(identifier$2("Iterator"));
      } else if (callee.node.returnType) {
        return callee.node.returnType;
      } else ;
    }
  }
}

const inferers = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ArrayExpression,
  ArrowFunctionExpression: Func,
  AssignmentExpression,
  BinaryExpression,
  BooleanLiteral,
  CallExpression,
  ClassDeclaration: Func,
  ClassExpression: Func,
  ConditionalExpression,
  FunctionDeclaration: Func,
  FunctionExpression: Func,
  Identifier: infererReference,
  LogicalExpression,
  NewExpression,
  NullLiteral,
  NumericLiteral,
  ObjectExpression,
  ParenthesizedExpression,
  RegExpLiteral,
  RestElement,
  SequenceExpression,
  StringLiteral,
  TSAsExpression,
  TSNonNullExpression,
  TaggedTemplateExpression,
  TemplateLiteral,
  TypeCastExpression,
  UnaryExpression,
  UpdateExpression,
  VariableDeclarator
}, Symbol.toStringTag, { value: 'Module' });

const {
  anyTypeAnnotation,
  isAnyTypeAnnotation,
  isArrayTypeAnnotation,
  isBooleanTypeAnnotation,
  isEmptyTypeAnnotation,
  isFlowBaseAnnotation,
  isGenericTypeAnnotation,
  isIdentifier: isIdentifier$2,
  isMixedTypeAnnotation,
  isNumberTypeAnnotation,
  isStringTypeAnnotation,
  isTSArrayType,
  isTSTypeAnnotation,
  isTSTypeReference,
  isTupleTypeAnnotation,
  isTypeAnnotation,
  isUnionTypeAnnotation,
  isVoidTypeAnnotation,
  stringTypeAnnotation,
  voidTypeAnnotation
} = _t;
function getTypeAnnotation() {
  let type = this.getData("typeAnnotation");
  if (type != null) {
    return type;
  }
  type = _getTypeAnnotation.call(this) || anyTypeAnnotation();
  if (isTypeAnnotation(type) || isTSTypeAnnotation(type)) {
    type = type.typeAnnotation;
  }
  this.setData("typeAnnotation", type);
  return type;
}
const typeAnnotationInferringNodes = new WeakSet();
function _getTypeAnnotation() {
  const node = this.node;
  if (!node) {
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      const declar = this.parentPath.parentPath;
      const declarParent = declar.parentPath;
      if (declar.key === "left" && declarParent.isForInStatement()) {
        return stringTypeAnnotation();
      }
      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return anyTypeAnnotation();
      }
      return voidTypeAnnotation();
    } else {
      return;
    }
  }
  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }
  if (typeAnnotationInferringNodes.has(node)) {
    return;
  }
  typeAnnotationInferringNodes.add(node);
  try {
    let inferer = inferers[node.type];
    if (inferer) {
      return inferer.call(this, node);
    }
    inferer = inferers[this.parentPath.type];
    if (inferer?.validParent) {
      return this.parentPath.getTypeAnnotation();
    }
  } finally {
    typeAnnotationInferringNodes.delete(node);
  }
}
function isBaseType(baseName, soft) {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}
function _isBaseType(baseName, type, soft) {
  if (baseName === "string") {
    return isStringTypeAnnotation(type);
  } else if (baseName === "number") {
    return isNumberTypeAnnotation(type);
  } else if (baseName === "boolean") {
    return isBooleanTypeAnnotation(type);
  } else if (baseName === "any") {
    return isAnyTypeAnnotation(type);
  } else if (baseName === "mixed") {
    return isMixedTypeAnnotation(type);
  } else if (baseName === "empty") {
    return isEmptyTypeAnnotation(type);
  } else if (baseName === "void") {
    return isVoidTypeAnnotation(type);
  } else {
    if (soft) {
      return false;
    } else {
      throw new Error(`Unknown base type ${baseName}`);
    }
  }
}
function couldBeBaseType(name) {
  const type = this.getTypeAnnotation();
  if (isAnyTypeAnnotation(type)) return true;
  if (isUnionTypeAnnotation(type)) {
    for (const type2 of type.types) {
      if (isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }
    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}
function baseTypeStrictlyMatches(rightArg) {
  const left = this.getTypeAnnotation();
  const right = rightArg.getTypeAnnotation();
  if (!isAnyTypeAnnotation(left) && isFlowBaseAnnotation(left)) {
    return right.type === left.type;
  }
  return false;
}
function isGenericType(genericName) {
  const type = this.getTypeAnnotation();
  if (genericName === "Array") {
    if (isTSArrayType(type) || isArrayTypeAnnotation(type) || isTupleTypeAnnotation(type)) {
      return true;
    }
  }
  return isGenericTypeAnnotation(type) && isIdentifier$2(type.id, {
    name: genericName
  }) || isTSTypeReference(type) && isIdentifier$2(type.typeName, {
    name: genericName
  });
}

const hooks = [function (self, parent) {
  const removeParent = self.key === "test" && (parent.isWhile() || parent.isSwitchCase()) || self.key === "declaration" && parent.isExportDeclaration() || self.key === "body" && parent.isLabeledStatement() || self.listKey === "declarations" && parent.isVariableDeclaration() && parent.node.declarations.length === 1 || self.key === "expression" && parent.isExpressionStatement();
  if (removeParent) {
    parent.remove();
    return true;
  }
}, function (self, parent) {
  if (parent.isSequenceExpression() && parent.node.expressions.length === 1) {
    parent.replaceWith(parent.node.expressions[0]);
    return true;
  }
}, function (self, parent) {
  if (parent.isBinary()) {
    if (self.key === "left") {
      parent.replaceWith(parent.node.right);
    } else {
      parent.replaceWith(parent.node.left);
    }
    return true;
  }
}, function (self, parent) {
  if (parent.isIfStatement() && self.key === "consequent" || self.key === "body" && (parent.isLoop() || parent.isArrowFunctionExpression())) {
    self.replaceWith({
      type: "BlockStatement",
      directives: [],
      body: []
    });
    return true;
  }
}];

function remove() {
  _assertUnremoved.call(this);
  resync.call(this);
  if (_callRemovalHooks.call(this)) {
    _markRemoved.call(this);
    return;
  }
  if (!this.opts?.noScope) {
    _removeFromScope.call(this);
  }
  this.shareCommentsWithSiblings();
  _remove.call(this);
  _markRemoved.call(this);
}
function _removeFromScope() {
  if (!this.node) return;
  const bindings = _t.getBindingIdentifiers(this.node, false, false, true);
  Object.keys(bindings).forEach(name => this.scope.removeBinding(name));
}
function _callRemovalHooks() {
  if (this.parentPath) {
    for (const fn of hooks) {
      if (fn(this, this.parentPath)) return true;
    }
  }
}
function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    updateSiblingKeys.call(this, this.key, -1);
  } else {
    _replaceWith.call(this, null);
  }
}
function _markRemoved() {
  this._traverseFlags |= SHOULD_SKIP | REMOVED;
  if (this.parent) {
    getCachedPaths(this)?.delete(this.node);
  }
  this.node = null;
}
function _assertUnremoved() {
  if (this.removed) {
    throw this.buildCodeFrameError("NodePath has been removed so is read-only.");
  }
}

const {
  arrowFunctionExpression: arrowFunctionExpression$2,
  assertExpression,
  assignmentExpression: assignmentExpression$2,
  blockStatement: blockStatement$2,
  callExpression: callExpression$2,
  cloneNode: cloneNode$2,
  expressionStatement: expressionStatement$2,
  isAssignmentExpression,
  isCallExpression,
  isExportNamedDeclaration,
  isExpression: isExpression$2,
  isIdentifier: isIdentifier$1,
  isSequenceExpression,
  isSuper,
  thisExpression: thisExpression$1
} = _t;
function insertBefore(nodes_) {
  _assertUnremoved.call(this);
  const nodes = _verifyNodeList.call(this, nodes_);
  const {
    parentPath,
    parent
  } = this;
  if (parentPath.isExpressionStatement() || parentPath.isLabeledStatement() || isExportNamedDeclaration(parent) || parentPath.isExportDefaultDeclaration() && this.isDeclaration()) {
    return parentPath.insertBefore(nodes);
  } else if (this.isNodeType("Expression") && !this.isJSXElement() || parentPath.isForStatement() && this.key === "init") {
    if (this.node) nodes.push(this.node);
    return this.replaceExpressionWithStatements(nodes);
  } else if (Array.isArray(this.container)) {
    return _containerInsertBefore.call(this, nodes);
  } else if (this.isStatementOrBlock()) {
    const node = this.node;
    const shouldInsertCurrentNode = node && (!this.isExpressionStatement() || node.expression != null);
    const [blockPath] = this.replaceWith(blockStatement$2(shouldInsertCurrentNode ? [node] : []));
    return blockPath.unshiftContainer("body", nodes);
  } else {
    throw new Error("We don't know what to do with this node type. " + "We were previously a Statement but we can't fit in here?");
  }
}
function _containerInsert(from, nodes) {
  updateSiblingKeys.call(this, from, nodes.length);
  const paths = [];
  this.container.splice(from, 0, ...nodes);
  for (let i = 0; i < nodes.length; i++) {
    const to = from + i;
    const path = this.getSibling(to);
    paths.push(path);
    if (this.context?.queue) {
      pushContext.call(path, this.context);
    }
  }
  const contexts = _getQueueContexts.call(this);
  for (const path of paths) {
    setScope.call(path);
    path.debug("Inserted.");
    for (const context of contexts) {
      context.maybeQueue(path, true);
    }
  }
  return paths;
}
function _containerInsertBefore(nodes) {
  return _containerInsert.call(this, this.key, nodes);
}
function _containerInsertAfter(nodes) {
  return _containerInsert.call(this, this.key + 1, nodes);
}
const last = arr => arr[arr.length - 1];
function isHiddenInSequenceExpression(path) {
  return isSequenceExpression(path.parent) && (last(path.parent.expressions) !== path.node || isHiddenInSequenceExpression(path.parentPath));
}
function isAlmostConstantAssignment(node, scope) {
  if (!isAssignmentExpression(node) || !isIdentifier$1(node.left)) {
    return false;
  }
  const blockScope = scope.getBlockParent();
  return blockScope.hasOwnBinding(node.left.name) && blockScope.getOwnBinding(node.left.name).constantViolations.length <= 1;
}
function insertAfter(nodes_) {
  _assertUnremoved.call(this);
  if (this.isSequenceExpression()) {
    return last(this.get("expressions")).insertAfter(nodes_);
  }
  const nodes = _verifyNodeList.call(this, nodes_);
  const {
    parentPath,
    parent
  } = this;
  if (parentPath.isExpressionStatement() || parentPath.isLabeledStatement() || isExportNamedDeclaration(parent) || parentPath.isExportDefaultDeclaration() && this.isDeclaration()) {
    return parentPath.insertAfter(nodes.map(node => {
      return isExpression$2(node) ? expressionStatement$2(node) : node;
    }));
  } else if (this.isNodeType("Expression") && !this.isJSXElement() && !parentPath.isJSXElement() || parentPath.isForStatement() && this.key === "init") {
    const self = this;
    if (self.node) {
      const node = self.node;
      let {
        scope
      } = this;
      if (scope.path.isPattern()) {
        assertExpression(node);
        self.replaceWith(callExpression$2(arrowFunctionExpression$2([], node), []));
        self.get("callee.body").insertAfter(nodes);
        return [self];
      }
      if (isHiddenInSequenceExpression(self)) {
        nodes.unshift(node);
      } else if (isCallExpression(node) && isSuper(node.callee)) {
        nodes.unshift(node);
        nodes.push(thisExpression$1());
      } else if (isAlmostConstantAssignment(node, scope)) {
        nodes.unshift(node);
        nodes.push(cloneNode$2(node.left));
      } else if (scope.isPure(node, true)) {
        nodes.push(node);
      } else {
        if (parentPath.isMethod({
          computed: true,
          key: node
        })) {
          scope = scope.parent;
        }
        const temp = scope.generateDeclaredUidIdentifier();
        nodes.unshift(expressionStatement$2(assignmentExpression$2("=", cloneNode$2(temp), node)));
        nodes.push(expressionStatement$2(cloneNode$2(temp)));
      }
    }
    return this.replaceExpressionWithStatements(nodes);
  } else if (Array.isArray(this.container)) {
    return _containerInsertAfter.call(this, nodes);
  } else if (this.isStatementOrBlock()) {
    const node = this.node;
    const shouldInsertCurrentNode = node && (!this.isExpressionStatement() || node.expression != null);
    const [blockPath] = this.replaceWith(blockStatement$2(shouldInsertCurrentNode ? [node] : []));
    return blockPath.pushContainer("body", nodes);
  } else {
    throw new Error("We don't know what to do with this node type. " + "We were previously a Statement but we can't fit in here?");
  }
}
function updateSiblingKeys(fromIndex, incrementBy) {
  if (!this.parent) return;
  const paths = getCachedPaths(this);
  if (!paths) return;
  for (const [, path] of paths) {
    if (typeof path.key === "number" && path.container === this.container && path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}
function _verifyNodeList(nodes) {
  if (!nodes) {
    return [];
  }
  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    let msg;
    if (!node) {
      msg = "has falsy node";
    } else if (typeof node !== "object") {
      msg = "contains a non-object node";
    } else if (!node.type) {
      msg = "without a type";
    } else if (node instanceof NodePath_Final) {
      msg = "has a NodePath when it expected a raw object";
    }
    if (msg) {
      const type = Array.isArray(node) ? "array" : typeof node;
      throw new Error(`Node list ${msg} with the index of ${i} and type of ${type}`);
    }
  }
  return nodes;
}
function unshiftContainer(listKey, nodes) {
  _assertUnremoved.call(this);
  const verifiedNodes = _verifyNodeList.call(this, nodes);
  const container = this.node[listKey];
  const path = NodePath_Final.get({
    parentPath: this,
    parent: this.node,
    container,
    listKey,
    key: 0
  }).setContext(this.context);
  return _containerInsertBefore.call(path, verifiedNodes);
}
function pushContainer(listKey, nodes) {
  _assertUnremoved.call(this);
  const verifiedNodes = _verifyNodeList.call(this, nodes);
  const container = this.node[listKey];
  const path = NodePath_Final.get({
    parentPath: this,
    parent: this.node,
    container,
    listKey,
    key: container.length
  }).setContext(this.context);
  return path.replaceWithMultiple(verifiedNodes);
}

const {
  FUNCTION_TYPES,
  arrowFunctionExpression: arrowFunctionExpression$1,
  assignmentExpression: assignmentExpression$1,
  awaitExpression,
  blockStatement: blockStatement$1,
  buildUndefinedNode: buildUndefinedNode$2,
  callExpression: callExpression$1,
  cloneNode: cloneNode$1,
  conditionalExpression: conditionalExpression$1,
  expressionStatement: expressionStatement$1,
  getBindingIdentifiers: getBindingIdentifiers$1,
  identifier: identifier$1,
  inheritLeadingComments,
  inheritTrailingComments,
  inheritsComments,
  isBlockStatement: isBlockStatement$1,
  isEmptyStatement,
  isExpression: isExpression$1,
  isExpressionStatement,
  isIfStatement,
  isProgram,
  isStatement,
  isVariableDeclaration,
  removeComments,
  returnStatement: returnStatement$1,
  sequenceExpression: sequenceExpression$1,
  validate: validate$1,
  yieldExpression
} = _t;
function replaceWithMultiple(nodes) {
  resync.call(this);
  const verifiedNodes = _verifyNodeList.call(this, nodes);
  inheritLeadingComments(verifiedNodes[0], this.node);
  inheritTrailingComments(verifiedNodes[verifiedNodes.length - 1], this.node);
  getCachedPaths(this)?.delete(this.node);
  this.node = this.container[this.key] = null;
  const paths = this.insertAfter(nodes);
  if (this.node) {
    this.requeue();
  } else {
    this.remove();
  }
  return paths;
}
function replaceWithSourceString(replacement) {
  resync.call(this);
  let ast;
  try {
    replacement = `(${replacement})`;
    ast = parse(replacement);
  } catch (err) {
    const loc = err.loc;
    if (loc) {
      err.message += " - make sure this is an expression.\n" + codeFrameColumns(replacement, {
        start: {
          line: loc.line,
          column: loc.column
        }
      });
      err.code = "BABEL_REPLACE_SOURCE_ERROR";
    }
    throw err;
  }
  const expressionAST = ast.program.body[0].expression;
  traverse.removeProperties(expressionAST);
  return this.replaceWith(expressionAST);
}
function replaceWith(replacementPath) {
  resync.call(this);
  if (this.removed) {
    throw new Error("You can't replace this node, we've already removed it");
  }
  let replacement = replacementPath instanceof NodePath_Final ? replacementPath.node : replacementPath;
  if (!replacement) {
    throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");
  }
  if (this.node === replacement) {
    return [this];
  }
  if (this.isProgram() && !isProgram(replacement)) {
    throw new Error("You can only replace a Program root node with another Program node");
  }
  if (Array.isArray(replacement)) {
    throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
  }
  if (typeof replacement === "string") {
    throw new Error("Don't use `path.replaceWith()` with a source string, use `path.replaceWithSourceString()`");
  }
  let nodePath = "";
  if (this.isNodeType("Statement") && isExpression$1(replacement)) {
    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement) && !this.parentPath.isExportDefaultDeclaration()) {
      replacement = expressionStatement$1(replacement);
      nodePath = "expression";
    }
  }
  if (this.isNodeType("Expression") && isStatement(replacement)) {
    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) {
      return this.replaceExpressionWithStatements([replacement]);
    }
  }
  const oldNode = this.node;
  if (oldNode) {
    inheritsComments(replacement, oldNode);
    removeComments(oldNode);
  }
  _replaceWith.call(this, replacement);
  this.type = replacement.type;
  setScope.call(this);
  this.requeue();
  return [nodePath ? this.get(nodePath) : this];
}
function _replaceWith(node) {
  if (!this.container) {
    throw new ReferenceError("Container is falsy");
  }
  if (this.inList) {
    validate$1(this.parent, this.key, [node]);
  } else {
    validate$1(this.parent, this.key, node);
  }
  this.debug(`Replace with ${node?.type}`);
  getCachedPaths(this)?.set(node, this).delete(this.node);
  this.node = node;
  this.container[this.key] = node;
}
function replaceExpressionWithStatements(nodes) {
  resync.call(this);
  const declars = [];
  const nodesAsSingleExpression = gatherSequenceExpressions(nodes, declars);
  if (nodesAsSingleExpression) {
    for (const id of declars) this.scope.push({
      id
    });
    return this.replaceWith(nodesAsSingleExpression)[0].get("expressions");
  }
  const functionParent = this.getFunctionParent();
  const isParentAsync = functionParent?.node.async;
  const isParentGenerator = functionParent?.node.generator;
  const container = arrowFunctionExpression$1([], blockStatement$1(nodes));
  this.replaceWith(callExpression$1(container, []));
  const callee = this.get("callee");
  callee.get("body").scope.hoistVariables(id => this.scope.push({
    id
  }));
  const completionRecords = callee.getCompletionRecords();
  for (const path of completionRecords) {
    if (!path.isExpressionStatement()) continue;
    const loop = path.findParent(path => path.isLoop());
    if (loop) {
      let uid = loop.getData("expressionReplacementReturnUid");
      if (!uid) {
        uid = callee.scope.generateDeclaredUidIdentifier("ret");
        callee.get("body").pushContainer("body", returnStatement$1(cloneNode$1(uid)));
        loop.setData("expressionReplacementReturnUid", uid);
      } else {
        uid = identifier$1(uid.name);
      }
      path.get("expression").replaceWith(assignmentExpression$1("=", cloneNode$1(uid), path.node.expression));
    } else {
      path.replaceWith(returnStatement$1(path.node.expression));
    }
  }
  callee.arrowFunctionToExpression();
  const newCallee = callee;
  const needToAwaitFunction = isParentAsync && traverse.hasType(newCallee.node.body, "AwaitExpression", FUNCTION_TYPES);
  const needToYieldFunction = isParentGenerator && traverse.hasType(newCallee.node.body, "YieldExpression", FUNCTION_TYPES);
  if (needToAwaitFunction) {
    newCallee.set("async", true);
    if (!needToYieldFunction) {
      this.replaceWith(awaitExpression(this.node));
    }
  }
  if (needToYieldFunction) {
    newCallee.set("generator", true);
    this.replaceWith(yieldExpression(this.node, true));
  }
  return newCallee.get("body.body");
}
function gatherSequenceExpressions(nodes, declars) {
  const exprs = [];
  let ensureLastUndefined = true;
  for (const node of nodes) {
    if (!isEmptyStatement(node)) {
      ensureLastUndefined = false;
    }
    if (isExpression$1(node)) {
      exprs.push(node);
    } else if (isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (isVariableDeclaration(node)) {
      if (node.kind !== "var") return;
      for (const declar of node.declarations) {
        const bindings = getBindingIdentifiers$1(declar);
        for (const key of Object.keys(bindings)) {
          declars.push(cloneNode$1(bindings[key]));
        }
        if (declar.init) {
          exprs.push(assignmentExpression$1("=", declar.id, declar.init));
        }
      }
      ensureLastUndefined = true;
    } else if (isIfStatement(node)) {
      const consequent = node.consequent ? gatherSequenceExpressions([node.consequent], declars) : buildUndefinedNode$2();
      const alternate = node.alternate ? gatherSequenceExpressions([node.alternate], declars) : buildUndefinedNode$2();
      if (!consequent || !alternate) return;
      exprs.push(conditionalExpression$1(node.test, consequent, alternate));
    } else if (isBlockStatement$1(node)) {
      const body = gatherSequenceExpressions(node.body, declars);
      if (!body) return;
      exprs.push(body);
    } else if (isEmptyStatement(node)) {
      if (nodes.indexOf(node) === 0) {
        ensureLastUndefined = true;
      }
    } else {
      return;
    }
  }
  if (ensureLastUndefined) exprs.push(buildUndefinedNode$2());
  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return sequenceExpression$1(exprs);
  }
}
function replaceInline(nodes) {
  resync.call(this);
  if (Array.isArray(nodes)) {
    if (Array.isArray(this.container)) {
      nodes = _verifyNodeList.call(this, nodes);
      const paths = _containerInsertAfter.call(this, nodes);
      this.remove();
      return paths;
    } else {
      return this.replaceWithMultiple(nodes);
    }
  } else {
    return this.replaceWith(nodes);
  }
}

const VALID_OBJECT_CALLEES = ["Number", "String", "Math"];
const VALID_IDENTIFIER_CALLEES = ["isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "btoa", "atob"];
const INVALID_METHODS = ["random"];
function isValidObjectCallee(val) {
  return VALID_OBJECT_CALLEES.includes(val);
}
function isValidIdentifierCallee(val) {
  return VALID_IDENTIFIER_CALLEES.includes(val);
}
function isInvalidMethod(val) {
  return INVALID_METHODS.includes(val);
}
function evaluateTruthy() {
  const res = this.evaluate();
  if (res.confident) return !!res.value;
}
function deopt(path, state) {
  if (!state.confident) return;
  state.deoptPath = path;
  state.confident = false;
}
const Globals = new Map([["undefined", undefined], ["Infinity", Infinity], ["NaN", NaN]]);
function evaluateCached(path, state) {
  const {
    node
  } = path;
  const {
    seen
  } = state;
  if (seen.has(node)) {
    const existing = seen.get(node);
    if (existing.resolved) {
      return existing.value;
    } else {
      deopt(path, state);
      return;
    }
  } else {
    const item = {
      resolved: false
    };
    seen.set(node, item);
    const val = _evaluate(path, state);
    if (state.confident) {
      item.resolved = true;
      item.value = val;
    }
    return val;
  }
}
function _evaluate(path, state) {
  if (!state.confident) return;
  if (path.isSequenceExpression()) {
    const exprs = path.get("expressions");
    return evaluateCached(exprs[exprs.length - 1], state);
  }
  if (path.isStringLiteral() || path.isNumericLiteral() || path.isBooleanLiteral()) {
    return path.node.value;
  }
  if (path.isNullLiteral()) {
    return null;
  }
  if (path.isTemplateLiteral()) {
    return evaluateQuasis(path, path.node.quasis, state);
  }
  if (path.isTaggedTemplateExpression() && path.get("tag").isMemberExpression()) {
    const object = path.get("tag.object");
    const {
      node: {
        name
      }
    } = object;
    const property = path.get("tag.property");
    if (object.isIdentifier() && name === "String" && !path.scope.getBinding(name) && property.isIdentifier() && property.node.name === "raw") {
      return evaluateQuasis(path, path.node.quasi.quasis, state, true);
    }
  }
  if (path.isConditionalExpression()) {
    const testResult = evaluateCached(path.get("test"), state);
    if (!state.confident) return;
    if (testResult) {
      return evaluateCached(path.get("consequent"), state);
    } else {
      return evaluateCached(path.get("alternate"), state);
    }
  }
  if (path.isExpressionWrapper()) {
    return evaluateCached(path.get("expression"), state);
  }
  if (path.isMemberExpression() && !path.parentPath.isCallExpression({
    callee: path.node
  })) {
    const property = path.get("property");
    const object = path.get("object");
    if (object.isLiteral()) {
      const value = object.node.value;
      const type = typeof value;
      let key = null;
      if (path.node.computed) {
        key = evaluateCached(property, state);
        if (!state.confident) return;
      } else if (property.isIdentifier()) {
        key = property.node.name;
      }
      if ((type === "number" || type === "string") && key != null && (typeof key === "number" || typeof key === "string")) {
        return value[key];
      }
    }
  }
  if (path.isReferencedIdentifier()) {
    const binding = path.scope.getBinding(path.node.name);
    if (binding) {
      if (binding.constantViolations.length > 0 || path.node.start < binding.path.node.end) {
        deopt(binding.path, state);
        return;
      }
      const bindingPathScope = binding.path.scope;
      if (binding.kind === "var" && bindingPathScope !== binding.scope) {
        let hasUnsafeBlock = !bindingPathScope.path.parentPath.isBlockStatement();
        for (let scope = bindingPathScope.parent; scope; scope = scope.parent) {
          if (scope === path.scope) {
            if (hasUnsafeBlock) {
              deopt(binding.path, state);
              return;
            }
            break;
          }
          if (scope.path.parentPath?.isBlockStatement()) {
            hasUnsafeBlock = true;
          }
        }
      }
      if (binding.hasValue) {
        return binding.value;
      }
    }
    const name = path.node.name;
    if (Globals.has(name)) {
      if (!binding) {
        return Globals.get(name);
      }
      deopt(binding.path, state);
      return;
    }
    if (!binding) {
      deopt(path, state);
      return;
    }
    const bindingPath = binding.path;
    if (!bindingPath.isVariableDeclarator()) {
      deopt(bindingPath, state);
      return;
    }
    const initPath = bindingPath.get("init");
    const value = evaluateCached(initPath, state);
    if (typeof value === "object" && value !== null && binding.references > 1) {
      deopt(initPath, state);
      return;
    }
    return value;
  }
  if (path.isUnaryExpression({
    prefix: true
  })) {
    if (path.node.operator === "void") {
      return undefined;
    }
    const argument = path.get("argument");
    if (path.node.operator === "typeof" && (argument.isFunction() || argument.isClass())) {
      return "function";
    }
    const arg = evaluateCached(argument, state);
    if (!state.confident) return;
    switch (path.node.operator) {
      case "!":
        return !arg;
      case "+":
        return +arg;
      case "-":
        return -arg;
      case "~":
        return ~arg;
      case "typeof":
        return typeof arg;
    }
  }
  if (path.isArrayExpression()) {
    const arr = [];
    const elems = path.get("elements");
    for (const elem of elems) {
      const elemValue = elem.evaluate();
      if (elemValue.confident) {
        arr.push(elemValue.value);
      } else {
        deopt(elemValue.deopt, state);
        return;
      }
    }
    return arr;
  }
  if (path.isObjectExpression()) {
    const obj = {};
    const props = path.get("properties");
    for (const prop of props) {
      if (prop.isObjectMethod() || prop.isSpreadElement()) {
        deopt(prop, state);
        return;
      }
      const keyPath = prop.get("key");
      let key;
      if (prop.node.computed) {
        key = keyPath.evaluate();
        if (!key.confident) {
          deopt(key.deopt, state);
          return;
        }
        key = key.value;
      } else if (keyPath.isIdentifier()) {
        key = keyPath.node.name;
      } else {
        key = keyPath.node.value;
      }
      const valuePath = prop.get("value");
      let value = valuePath.evaluate();
      if (!value.confident) {
        deopt(value.deopt, state);
        return;
      }
      value = value.value;
      obj[key] = value;
    }
    return obj;
  }
  if (path.isLogicalExpression()) {
    const wasConfident = state.confident;
    const left = evaluateCached(path.get("left"), state);
    const leftConfident = state.confident;
    state.confident = wasConfident;
    const right = evaluateCached(path.get("right"), state);
    const rightConfident = state.confident;
    switch (path.node.operator) {
      case "||":
        state.confident = leftConfident && (!!left || rightConfident);
        if (!state.confident) return;
        return left || right;
      case "&&":
        state.confident = leftConfident && (!left || rightConfident);
        if (!state.confident) return;
        return left && right;
      case "??":
        state.confident = leftConfident && (left != null || rightConfident);
        if (!state.confident) return;
        return left ?? right;
    }
  }
  if (path.isBinaryExpression()) {
    const left = evaluateCached(path.get("left"), state);
    if (!state.confident) return;
    const right = evaluateCached(path.get("right"), state);
    if (!state.confident) return;
    switch (path.node.operator) {
      case "-":
        return left - right;
      case "+":
        return left + right;
      case "/":
        return left / right;
      case "*":
        return left * right;
      case "%":
        return left % right;
      case "**":
        return left ** right;
      case "<":
        return left < right;
      case ">":
        return left > right;
      case "<=":
        return left <= right;
      case ">=":
        return left >= right;
      case "==":
        return left == right;
      case "!=":
        return left != right;
      case "===":
        return left === right;
      case "!==":
        return left !== right;
      case "|":
        return left | right;
      case "&":
        return left & right;
      case "^":
        return left ^ right;
      case "<<":
        return left << right;
      case ">>":
        return left >> right;
      case ">>>":
        return left >>> right;
    }
  }
  if (path.isCallExpression()) {
    const callee = path.get("callee");
    let context;
    let func;
    if (callee.isIdentifier() && !path.scope.getBinding(callee.node.name) && (isValidObjectCallee(callee.node.name) || isValidIdentifierCallee(callee.node.name))) {
      func = global[callee.node.name];
    }
    if (callee.isMemberExpression()) {
      const object = callee.get("object");
      const property = callee.get("property");
      if (object.isIdentifier() && property.isIdentifier() && isValidObjectCallee(object.node.name) && !isInvalidMethod(property.node.name) && !path.scope.getBinding(object.node.name)) {
        context = global[object.node.name];
        const key = property.node.name;
        if (Object.hasOwn(context, key)) {
          func = context[key];
        }
      }
      if (object.isLiteral() && property.isIdentifier()) {
        const type = typeof object.node.value;
        if (type === "string" || type === "number") {
          context = object.node.value;
          func = context[property.node.name];
        }
      }
    }
    if (func) {
      const args = path.get("arguments").map(arg => evaluateCached(arg, state));
      if (!state.confident) return;
      return func.apply(context, args);
    }
  }
  deopt(path, state);
}
function evaluateQuasis(path, quasis, state, raw = false) {
  let str = "";
  let i = 0;
  const exprs = path.isTemplateLiteral() ? path.get("expressions") : path.get("quasi.expressions");
  for (const elem of quasis) {
    if (!state.confident) break;
    str += raw ? elem.value.raw : elem.value.cooked;
    const expr = exprs[i++];
    if (expr) str += String(evaluateCached(expr, state));
  }
  if (!state.confident) return;
  return str;
}
function evaluate() {
  const state = {
    confident: true,
    deoptPath: null,
    seen: new Map()
  };
  let value = evaluateCached(this, state);
  if (!state.confident) value = undefined;
  return {
    confident: state.confident,
    deopt: state.deoptPath,
    value: value
  };
}

const {
  arrowFunctionExpression,
  assignmentExpression,
  binaryExpression,
  blockStatement,
  callExpression,
  conditionalExpression,
  expressionStatement,
  identifier,
  jsxIdentifier,
  logicalExpression,
  LOGICAL_OPERATORS,
  memberExpression,
  metaProperty,
  numericLiteral,
  objectExpression,
  restElement,
  returnStatement,
  sequenceExpression,
  spreadElement,
  stringLiteral,
  super: _super,
  thisExpression,
  toExpression,
  unaryExpression,
  toBindingIdentifierName,
  isFunction,
  isAssignmentPattern,
  isRestElement,
  getFunctionName,
  cloneNode,
  variableDeclaration,
  variableDeclarator,
  exportNamedDeclaration,
  exportSpecifier,
  inherits,
  buildUndefinedNode: buildUndefinedNode$1
} = _t;
function ensureBlock() {
  const body = this.get("body");
  const bodyNode = body.node;
  if (Array.isArray(body)) {
    throw new Error("Can't convert array path to a block statement");
  }
  if (!bodyNode) {
    throw new Error("Can't convert node without a body");
  }
  if (body.isBlockStatement()) {
    return bodyNode;
  }
  const statements = [];
  let stringPath = "body";
  let key;
  let listKey;
  if (body.isStatement()) {
    listKey = "body";
    key = 0;
    statements.push(body.node);
  } else {
    stringPath += ".body.0";
    if (this.isFunction()) {
      key = "argument";
      statements.push(returnStatement(body.node));
    } else {
      key = "expression";
      statements.push(expressionStatement(body.node));
    }
  }
  this.node.body = blockStatement(statements);
  const parentPath = this.get(stringPath);
  setup.call(body, parentPath, listKey ? parentPath.node[listKey] : parentPath.node, listKey, key);
  return this.node;
}
function unwrapFunctionEnvironment() {
  if (!this.isArrowFunctionExpression() && !this.isFunctionExpression() && !this.isFunctionDeclaration()) {
    throw this.buildCodeFrameError("Can only unwrap the environment of a function.");
  }
  hoistFunctionEnvironment(this);
}
function setType(path, type) {
  path.node.type = type;
}
function arrowFunctionToExpression({
  allowInsertArrow = true,
  allowInsertArrowWithRest = allowInsertArrow,
  noNewArrows = true
} = {}) {
  if (!this.isArrowFunctionExpression()) {
    throw this.buildCodeFrameError("Cannot convert non-arrow function to a function expression.");
  }
  let self = this;
  if (!noNewArrows) {
    self = self.ensureFunctionName(false) ?? self;
  }
  const {
    thisBinding,
    fnPath: fn
  } = hoistFunctionEnvironment(self, noNewArrows, allowInsertArrow, allowInsertArrowWithRest);
  fn.ensureBlock();
  setType(fn, "FunctionExpression");
  if (!noNewArrows) {
    const checkBinding = thisBinding ? null : fn.scope.generateUidIdentifier("arrowCheckId");
    if (checkBinding) {
      fn.parentPath.scope.push({
        id: checkBinding,
        init: objectExpression([])
      });
    }
    fn.get("body").unshiftContainer("body", expressionStatement(callExpression(this.hub.addHelper("newArrowCheck"), [thisExpression(), checkBinding ? identifier(checkBinding.name) : identifier(thisBinding)])));
    return fn.replaceWith(callExpression(memberExpression(fn.node, identifier("bind")), [checkBinding ? identifier(checkBinding.name) : thisExpression()]))[0].get("callee.object");
  }
  return fn;
}
const getSuperCallsVisitor = environmentVisitor({
  CallExpression(child, {
    allSuperCalls
  }) {
    if (!child.get("callee").isSuper()) return;
    allSuperCalls.push(child);
  }
});
function hoistFunctionEnvironment(fnPath, noNewArrows = true, allowInsertArrow = true, allowInsertArrowWithRest = true) {
  let arrowParent;
  let thisEnvFn = fnPath.findParent(p => {
    if (p.isArrowFunctionExpression()) {
      arrowParent ??= p;
      return false;
    }
    return p.isFunction() || p.isProgram() || p.isClassProperty({
      static: false
    }) || p.isClassPrivateProperty({
      static: false
    });
  });
  const inConstructor = thisEnvFn.isClassMethod({
    kind: "constructor"
  });
  if (thisEnvFn.isClassProperty() || thisEnvFn.isClassPrivateProperty()) {
    if (arrowParent) {
      thisEnvFn = arrowParent;
    } else if (allowInsertArrow) {
      thisEnvFn = fnPath.replaceWith(callExpression(arrowFunctionExpression([], toExpression(fnPath.node)), []))[0].get("callee");
      fnPath = thisEnvFn.get("body");
    } else {
      throw fnPath.buildCodeFrameError("Unable to transform arrow inside class property");
    }
  }
  const {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls
  } = getScopeInformation(fnPath);
  if (inConstructor && superCalls.length > 0) {
    if (!allowInsertArrow) {
      throw superCalls[0].buildCodeFrameError("When using '@babel/plugin-transform-arrow-functions', " + "it's not possible to compile `super()` in an arrow function without compiling classes.\n" + "Please add '@babel/plugin-transform-classes' to your Babel configuration.");
    }
    if (!allowInsertArrowWithRest) {
      throw superCalls[0].buildCodeFrameError("When using '@babel/plugin-transform-parameters', " + "it's not possible to compile `super()` in an arrow function with default or rest parameters without compiling classes.\n" + "Please add '@babel/plugin-transform-classes' to your Babel configuration.");
    }
    const allSuperCalls = [];
    thisEnvFn.traverse(getSuperCallsVisitor, {
      allSuperCalls
    });
    const superBinding = getSuperBinding(thisEnvFn);
    allSuperCalls.forEach(superCall => {
      const callee = identifier(superBinding);
      callee.loc = superCall.node.callee.loc;
      superCall.get("callee").replaceWith(callee);
    });
  }
  if (argumentsPaths.length > 0) {
    const argumentsBinding = getBinding(thisEnvFn, "arguments", () => {
      const args = () => identifier("arguments");
      if (thisEnvFn.scope.path.isProgram()) {
        return conditionalExpression(binaryExpression("===", unaryExpression("typeof", args()), stringLiteral("undefined")), buildUndefinedNode$1(), args());
      } else {
        return args();
      }
    });
    argumentsPaths.forEach(argumentsChild => {
      const argsRef = identifier(argumentsBinding);
      argsRef.loc = argumentsChild.node.loc;
      argumentsChild.replaceWith(argsRef);
    });
  }
  if (newTargetPaths.length > 0) {
    const newTargetBinding = getBinding(thisEnvFn, "newtarget", () => metaProperty(identifier("new"), identifier("target")));
    newTargetPaths.forEach(targetChild => {
      const targetRef = identifier(newTargetBinding);
      targetRef.loc = targetChild.node.loc;
      targetChild.replaceWith(targetRef);
    });
  }
  if (superProps.length > 0) {
    if (!allowInsertArrow) {
      throw superProps[0].buildCodeFrameError("When using '@babel/plugin-transform-arrow-functions', " + "it's not possible to compile `super.prop` in an arrow function without compiling classes.\n" + "Please add '@babel/plugin-transform-classes' to your Babel configuration.");
    }
    const flatSuperProps = superProps.reduce((acc, superProp) => acc.concat(standardizeSuperProperty(superProp)), []);
    flatSuperProps.forEach(superProp => {
      const key = superProp.node.computed ? "" : superProp.get("property").node.name;
      const superParentPath = superProp.parentPath;
      const isAssignment = superParentPath.isAssignmentExpression({
        left: superProp.node
      });
      const isCall = superParentPath.isCallExpression({
        callee: superProp.node
      });
      const isTaggedTemplate = superParentPath.isTaggedTemplateExpression({
        tag: superProp.node
      });
      const superBinding = getSuperPropBinding(thisEnvFn, isAssignment, key);
      const args = [];
      if (superProp.node.computed) {
        args.push(superProp.get("property").node);
      }
      if (isAssignment) {
        const value = superParentPath.node.right;
        args.push(value);
      }
      const call = callExpression(identifier(superBinding), args);
      if (isCall) {
        superParentPath.unshiftContainer("arguments", thisExpression());
        superProp.replaceWith(memberExpression(call, identifier("call")));
        thisPaths.push(superParentPath.get("arguments.0"));
      } else if (isAssignment) {
        superParentPath.replaceWith(call);
      } else if (isTaggedTemplate) {
        thisPaths.push(superProp.replaceWith(callExpression(memberExpression(call, identifier("bind"), false), [thisExpression()]))[0].get("arguments.0"));
      } else {
        superProp.replaceWith(call);
      }
    });
  }
  let thisBinding;
  if (thisPaths.length > 0 || !noNewArrows) {
    thisBinding = getThisBinding(thisEnvFn, inConstructor);
    if (noNewArrows || inConstructor && hasSuperClass(thisEnvFn)) {
      thisPaths.forEach(thisChild => {
        const thisRef = thisChild.isJSX() ? jsxIdentifier(thisBinding) : identifier(thisBinding);
        thisRef.loc = thisChild.node.loc;
        thisChild.replaceWith(thisRef);
      });
      if (!noNewArrows) thisBinding = null;
    }
  }
  return {
    thisBinding: thisBinding,
    fnPath
  };
}
function isLogicalOp(op) {
  return LOGICAL_OPERATORS.includes(op);
}
function standardizeSuperProperty(superProp) {
  if (superProp.parentPath.isAssignmentExpression() && superProp.parentPath.node.operator !== "=") {
    const assignmentPath = superProp.parentPath;
    const op = assignmentPath.node.operator.slice(0, -1);
    const value = assignmentPath.node.right;
    const isLogicalAssignment = isLogicalOp(op);
    if (superProp.node.computed) {
      const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
      const {
        object,
        property
      } = superProp.node;
      assignmentPath.get("left").replaceWith(memberExpression(object, assignmentExpression("=", tmp, property), true));
      assignmentPath.get("right").replaceWith(rightExpression(isLogicalAssignment ? "=" : op, memberExpression(object, identifier(tmp.name), true), value));
    } else {
      const object = superProp.node.object;
      const property = superProp.node.property;
      assignmentPath.get("left").replaceWith(memberExpression(object, property));
      assignmentPath.get("right").replaceWith(rightExpression(isLogicalAssignment ? "=" : op, memberExpression(object, identifier(property.name)), value));
    }
    if (isLogicalAssignment) {
      assignmentPath.replaceWith(logicalExpression(op, assignmentPath.node.left, assignmentPath.node.right));
    } else {
      assignmentPath.node.operator = "=";
    }
    return [assignmentPath.get("left"), assignmentPath.get("right").get("left")];
  } else if (superProp.parentPath.isUpdateExpression()) {
    const updateExpr = superProp.parentPath;
    const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
    const computedKey = superProp.node.computed ? superProp.scope.generateDeclaredUidIdentifier("prop") : null;
    const parts = [assignmentExpression("=", tmp, memberExpression(superProp.node.object, computedKey ? assignmentExpression("=", computedKey, superProp.node.property) : superProp.node.property, superProp.node.computed)), assignmentExpression("=", memberExpression(superProp.node.object, computedKey ? identifier(computedKey.name) : superProp.node.property, superProp.node.computed), binaryExpression(superProp.parentPath.node.operator[0], identifier(tmp.name), numericLiteral(1)))];
    if (!superProp.parentPath.node.prefix) {
      parts.push(identifier(tmp.name));
    }
    const sequenceExpr = updateExpr.replaceWith(sequenceExpression(parts))[0];
    const left = sequenceExpr.get("expressions.0.right");
    const right = sequenceExpr.get("expressions.1.left");
    return [left, right];
  }
  return [superProp];
  function rightExpression(op, left, right) {
    if (op === "=") {
      return assignmentExpression("=", left, right);
    } else {
      return binaryExpression(op, left, right);
    }
  }
}
function hasSuperClass(thisEnvFn) {
  return thisEnvFn.isClassMethod() && !!thisEnvFn.parentPath.parentPath.node.superClass;
}
const assignSuperThisVisitor = environmentVisitor({
  CallExpression(child, {
    supers,
    thisBinding
  }) {
    if (!child.get("callee").isSuper()) return;
    if (supers.has(child.node)) return;
    supers.add(child.node);
    child.replaceWithMultiple([child.node, assignmentExpression("=", identifier(thisBinding), identifier("this"))]);
  }
});
function getThisBinding(thisEnvFn, inConstructor) {
  return getBinding(thisEnvFn, "this", thisBinding => {
    if (!inConstructor || !hasSuperClass(thisEnvFn)) return thisExpression();
    thisEnvFn.traverse(assignSuperThisVisitor, {
      supers: new WeakSet(),
      thisBinding
    });
  });
}
function getSuperBinding(thisEnvFn) {
  return getBinding(thisEnvFn, "supercall", () => {
    const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
    return arrowFunctionExpression([restElement(argsBinding)], callExpression(_super(), [spreadElement(identifier(argsBinding.name))]));
  });
}
function getSuperPropBinding(thisEnvFn, isAssignment, propName) {
  const op = isAssignment ? "set" : "get";
  return getBinding(thisEnvFn, `superprop_${op}:${propName || ""}`, () => {
    const argsList = [];
    let fnBody;
    if (propName) {
      fnBody = memberExpression(_super(), identifier(propName));
    } else {
      const method = thisEnvFn.scope.generateUidIdentifier("prop");
      argsList.unshift(method);
      fnBody = memberExpression(_super(), identifier(method.name), true);
    }
    if (isAssignment) {
      const valueIdent = thisEnvFn.scope.generateUidIdentifier("value");
      argsList.push(valueIdent);
      fnBody = assignmentExpression("=", fnBody, identifier(valueIdent.name));
    }
    return arrowFunctionExpression(argsList, fnBody);
  });
}
function getBinding(thisEnvFn, key, init) {
  const cacheKey = "binding:" + key;
  let data = thisEnvFn.getData(cacheKey);
  if (!data) {
    const id = thisEnvFn.scope.generateUidIdentifier(key);
    data = id.name;
    thisEnvFn.setData(cacheKey, data);
    thisEnvFn.scope.push({
      id: id,
      init: init(data)
    });
  }
  return data;
}
const getScopeInformationVisitor = environmentVisitor({
  ThisExpression(child, {
    thisPaths
  }) {
    thisPaths.push(child);
  },
  JSXIdentifier(child, {
    thisPaths
  }) {
    if (child.node.name !== "this") return;
    if (!child.parentPath.isJSXMemberExpression({
      object: child.node
    }) && !child.parentPath.isJSXOpeningElement({
      name: child.node
    })) {
      return;
    }
    thisPaths.push(child);
  },
  CallExpression(child, {
    superCalls
  }) {
    if (child.get("callee").isSuper()) superCalls.push(child);
  },
  MemberExpression(child, {
    superProps
  }) {
    if (child.get("object").isSuper()) superProps.push(child);
  },
  Identifier(child, {
    argumentsPaths
  }) {
    if (!child.isReferencedIdentifier({
      name: "arguments"
    })) return;
    let curr = child.scope;
    do {
      if (curr.hasOwnBinding("arguments")) {
        curr.rename("arguments");
        return;
      }
      if (curr.path.isFunction() && !curr.path.isArrowFunctionExpression()) {
        break;
      }
    } while (curr = curr.parent);
    argumentsPaths.push(child);
  },
  MetaProperty(child, {
    newTargetPaths
  }) {
    if (!child.get("meta").isIdentifier({
      name: "new"
    })) return;
    if (!child.get("property").isIdentifier({
      name: "target"
    })) return;
    newTargetPaths.push(child);
  }
});
function getScopeInformation(fnPath) {
  const thisPaths = [];
  const argumentsPaths = [];
  const newTargetPaths = [];
  const superProps = [];
  const superCalls = [];
  fnPath.traverse(getScopeInformationVisitor, {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls
  });
  return {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls
  };
}
function splitExportDeclaration() {
  if (!this.isExportDeclaration() || this.isExportAllDeclaration()) {
    throw new Error("Only default and named export declarations can be split.");
  }
  if (this.isExportNamedDeclaration() && this.get("specifiers").length > 0) {
    throw new Error("It doesn't make sense to split exported specifiers.");
  }
  const declaration = this.get("declaration");
  if (this.isExportDefaultDeclaration()) {
    const standaloneDeclaration = declaration.isFunctionDeclaration() || declaration.isClassDeclaration();
    const exportExpr = declaration.isFunctionExpression() || declaration.isClassExpression();
    const scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
    let id = declaration.node.id;
    let needBindingRegistration = false;
    if (!id) {
      needBindingRegistration = true;
      id = scope.generateUidIdentifier("default");
      if (standaloneDeclaration || exportExpr) {
        declaration.node.id = cloneNode(id);
      }
    } else if (exportExpr && scope.hasBinding(id.name)) {
      needBindingRegistration = true;
      id = scope.generateUidIdentifier(id.name);
    }
    const updatedDeclaration = standaloneDeclaration ? declaration.node : variableDeclaration("var", [variableDeclarator(cloneNode(id), declaration.node)]);
    const updatedExportDeclaration = exportNamedDeclaration(null, [exportSpecifier(cloneNode(id), identifier("default"))]);
    this.insertAfter(updatedExportDeclaration);
    this.replaceWith(updatedDeclaration);
    if (needBindingRegistration) {
      scope.registerDeclaration(this);
    }
    return this;
  } else if (this.get("specifiers").length > 0) {
    throw new Error("It doesn't make sense to split exported specifiers.");
  }
  const bindingIdentifiers = declaration.getOuterBindingIdentifiers();
  const specifiers = Object.keys(bindingIdentifiers).map(name => {
    return exportSpecifier(identifier(name), identifier(name));
  });
  const aliasDeclar = exportNamedDeclaration(null, specifiers);
  this.insertAfter(aliasDeclar);
  this.replaceWith(declaration.node);
  return this;
}
const getRefersOuterBindingVisitor = () => explode$1({
  "ReferencedIdentifier|BindingIdentifier"(path, state) {
    if (path.node.name !== state.name) return;
    state.needsRename = true;
    path.stop();
  },
  Scope(path, state) {
    if (path.scope.hasOwnBinding(state.name)) {
      path.skip();
    }
  }
});
function ensureFunctionName(supportUnicodeId) {
  if (this.node.id) return this;
  const res = getFunctionName(this.node, this.parent);
  if (res == null) return this;
  let {
    name
  } = res;
  if (!supportUnicodeId && /[\uD800-\uDFFF]/.test(name)) {
    return null;
  }
  if (name.startsWith("get ") || name.startsWith("set ")) {
    return null;
  }
  name = toBindingIdentifierName(name.replace(/[/ ]/g, "_"));
  const id = identifier(name);
  inherits(id, res.originalNode);
  const state = {
    needsRename: false,
    name
  };
  const {
    scope
  } = this;
  const binding = scope.getOwnBinding(name);
  if (binding) {
    if (binding.kind === "param") {
      state.needsRename = true;
    }
  } else if (scope.parent.hasBinding(name) || scope.hasGlobal(name)) {
    this.traverse(getRefersOuterBindingVisitor(), state);
  }
  if (!state.needsRename) {
    this.node.id = id;
    scope.getProgramParent().referencesSet.add(id.name);
    return this;
  }
  if (scope.hasBinding(id.name) && !scope.hasGlobal(id.name)) {
    scope.rename(id.name);
    this.node.id = id;
    scope.getProgramParent().referencesSet.add(id.name);
    return this;
  }
  if (!isFunction(this.node)) return null;
  const key = scope.generateUidIdentifier(id.name);
  const params = [];
  for (let i = 0, len = getFunctionArity(this.node); i < len; i++) {
    params.push(scope.generateUidIdentifier("x"));
  }
  const call = template.expression.ast`
    (function (${key}) {
      function ${id}(${params}) {
        return ${cloneNode(key)}.apply(this, arguments);
      }

      ${cloneNode(id)}.toString = function () {
        return ${cloneNode(key)}.toString();
      }

      return ${cloneNode(id)};
    })(${toExpression(this.node)})
  `;
  return this.replaceWith(call)[0].get("arguments.0");
}
function getFunctionArity(node) {
  const count = node.params.findIndex(param => isAssignmentPattern(param) || isRestElement(param));
  return count === -1 ? node.params.length : count;
}

const {
  STATEMENT_OR_BLOCK_KEYS,
  VISITOR_KEYS: VISITOR_KEYS$1,
  isBlockStatement,
  isExpression,
  isIdentifier,
  isLiteral,
  isStringLiteral,
  isType,
  matchesPattern: _matchesPattern,
  toComputedKey
} = _t;
function matchesPattern(pattern, allowPartial) {
  return _matchesPattern(this.node, pattern, allowPartial);
}
function isStatic() {
  return this.scope.isStatic(this.node);
}
function isNodeType(type) {
  return isType(this.type, type);
}
function canHaveVariableDeclarationOrExpression() {
  return (this.key === "init" || this.key === "left") && this.parentPath.isFor();
}
function canSwapBetweenExpressionAndStatement(replacement) {
  if (this.key !== "body" || !this.parentPath.isArrowFunctionExpression()) {
    return false;
  }
  if (this.isExpression()) {
    return isBlockStatement(replacement);
  } else if (this.isBlockStatement()) {
    return isExpression(replacement);
  }
  return false;
}
function isCompletionRecord(allowInsideFunction) {
  let path = this;
  let first = true;
  do {
    const {
      type,
      container
    } = path;
    if (!first && (path.isFunction() || type === "StaticBlock")) {
      return !!allowInsideFunction;
    }
    first = false;
    if (Array.isArray(container) && path.key !== container.length - 1) {
      return false;
    }
  } while ((path = path.parentPath) && !path.isProgram() && !path.isDoExpression());
  return true;
}
function isStatementOrBlock() {
  if (this.parentPath.isLabeledStatement() || isBlockStatement(this.container)) {
    return false;
  } else {
    return STATEMENT_OR_BLOCK_KEYS.includes(this.key);
  }
}
function referencesImport(moduleSource, importName) {
  if (!this.isReferencedIdentifier()) {
    if (this.isJSXMemberExpression() && this.node.property.name === importName || (this.isMemberExpression() || this.isOptionalMemberExpression()) && (this.node.computed ? isStringLiteral(this.node.property, {
      value: importName
    }) : this.node.property.name === importName)) {
      const object = this.get("object");
      return object.isReferencedIdentifier() && object.referencesImport(moduleSource, "*");
    }
    return false;
  }
  const binding = this.scope.getBinding(this.node.name);
  if (binding?.kind !== "module") return false;
  const path = binding.path;
  const parent = path.parentPath;
  if (!parent.isImportDeclaration()) return false;
  if (parent.node.source.value === moduleSource) {
    if (!importName) return true;
  } else {
    return false;
  }
  if (path.isImportDefaultSpecifier() && importName === "default") {
    return true;
  }
  if (path.isImportNamespaceSpecifier() && importName === "*") {
    return true;
  }
  if (path.isImportSpecifier() && isIdentifier(path.node.imported, {
    name: importName
  })) {
    return true;
  }
  return false;
}
function getSource() {
  const node = this.node;
  if (node.end) {
    const code = this.hub.getCode();
    if (code) return code.slice(node.start, node.end);
  }
  return "";
}
function willIMaybeExecuteBefore(target) {
  return this._guessExecutionStatusRelativeTo(target) !== "after";
}
function getOuterFunction(path) {
  return path.isProgram() ? path : (path.parentPath.scope.getFunctionParent() || path.parentPath.scope.getProgramParent()).path;
}
function isExecutionUncertain(type, key) {
  switch (type) {
    case "LogicalExpression":
      return key === "right";
    case "ConditionalExpression":
    case "IfStatement":
      return key === "consequent" || key === "alternate";
    case "WhileStatement":
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForOfStatement":
      return key === "body";
    case "ForStatement":
      return key === "body" || key === "update";
    case "SwitchStatement":
      return key === "cases";
    case "TryStatement":
      return key === "handler";
    case "AssignmentPattern":
      return key === "right";
    case "OptionalMemberExpression":
      return key === "property";
    case "OptionalCallExpression":
      return key === "arguments";
    default:
      return false;
  }
}
function isExecutionUncertainInList(paths, maxIndex) {
  for (let i = 0; i < maxIndex; i++) {
    const path = paths[i];
    if (isExecutionUncertain(path.parent.type, path.parentKey)) {
      return true;
    }
  }
  return false;
}
const SYMBOL_CHECKING = Symbol();
function _guessExecutionStatusRelativeTo(target) {
  return _guessExecutionStatusRelativeToCached(this, target, new Map());
}
function _guessExecutionStatusRelativeToCached(base, target, cache) {
  const funcParent = {
    this: getOuterFunction(base),
    target: getOuterFunction(target)
  };
  if (funcParent.target.node !== funcParent.this.node) {
    return _guessExecutionStatusRelativeToDifferentFunctionsCached(base, funcParent.target, cache);
  }
  const paths = {
    target: target.getAncestry(),
    this: base.getAncestry()
  };
  if (paths.target.includes(base)) return "after";
  if (paths.this.includes(target)) return "before";
  let commonPath;
  const commonIndex = {
    target: 0,
    this: 0
  };
  while (!commonPath && commonIndex.this < paths.this.length) {
    const path = paths.this[commonIndex.this];
    commonIndex.target = paths.target.indexOf(path);
    if (commonIndex.target >= 0) {
      commonPath = path;
    } else {
      commonIndex.this++;
    }
  }
  if (!commonPath) {
    throw new Error("Internal Babel error - The two compared nodes" + " don't appear to belong to the same program.");
  }
  if (isExecutionUncertainInList(paths.this, commonIndex.this - 1) || isExecutionUncertainInList(paths.target, commonIndex.target - 1)) {
    return "unknown";
  }
  const divergence = {
    this: paths.this[commonIndex.this - 1],
    target: paths.target[commonIndex.target - 1]
  };
  if (divergence.target.listKey && divergence.this.listKey && divergence.target.container === divergence.this.container) {
    return divergence.target.key > divergence.this.key ? "before" : "after";
  }
  const keys = VISITOR_KEYS$1[commonPath.type];
  const keyPosition = {
    this: keys.indexOf(divergence.this.parentKey),
    target: keys.indexOf(divergence.target.parentKey)
  };
  return keyPosition.target > keyPosition.this ? "before" : "after";
}
function _guessExecutionStatusRelativeToDifferentFunctionsInternal(base, target, cache) {
  if (!target.isFunctionDeclaration()) {
    if (_guessExecutionStatusRelativeToCached(base, target, cache) === "before") {
      return "before";
    }
    return "unknown";
  } else if (target.parentPath.isExportDeclaration()) {
    return "unknown";
  }
  const binding = target.scope.getBinding(target.node.id.name);
  if (!binding.references) return "before";
  const referencePaths = binding.referencePaths;
  let allStatus;
  for (const path of referencePaths) {
    const childOfFunction = !!path.find(path => path.node === target.node);
    if (childOfFunction) continue;
    if (path.key !== "callee" || !path.parentPath.isCallExpression()) {
      return "unknown";
    }
    const status = _guessExecutionStatusRelativeToCached(base, path, cache);
    if (allStatus && allStatus !== status) {
      return "unknown";
    } else {
      allStatus = status;
    }
  }
  return allStatus;
}
function _guessExecutionStatusRelativeToDifferentFunctionsCached(base, target, cache) {
  let nodeMap = cache.get(base.node);
  let cached;
  if (!nodeMap) {
    cache.set(base.node, nodeMap = new Map());
  } else if (cached = nodeMap.get(target.node)) {
    if (cached === SYMBOL_CHECKING) {
      return "unknown";
    }
    return cached;
  }
  nodeMap.set(target.node, SYMBOL_CHECKING);
  const result = _guessExecutionStatusRelativeToDifferentFunctionsInternal(base, target, cache);
  nodeMap.set(target.node, result);
  return result;
}
function resolve(dangerous, resolved) {
  return _resolve.call(this, dangerous, resolved) || this;
}
function _resolve(dangerous, resolved) {
  if (resolved?.includes(this)) return;
  resolved = resolved || [];
  resolved.push(this);
  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(dangerous, resolved);
    }
  } else if (this.isReferencedIdentifier()) {
    const binding = this.scope.getBinding(this.node.name);
    if (!binding) return;
    if (!binding.constant) return;
    if (binding.kind === "module") return;
    if (binding.path !== this) {
      const ret = binding.path.resolve(dangerous, resolved);
      if (this.find(parent => parent.node === ret.node)) return;
      return ret;
    }
  } else if (this.isTypeCastExpression()) {
    return this.get("expression").resolve(dangerous, resolved);
  } else if (dangerous && this.isMemberExpression()) {
    const targetKey = toComputedKey(this.node);
    if (!isLiteral(targetKey)) return;
    const targetName = targetKey.value;
    const target = this.get("object").resolve(dangerous, resolved);
    if (target.isObjectExpression()) {
      const props = target.get("properties");
      for (const prop of props) {
        if (!prop.isProperty()) continue;
        const key = prop.get("key");
        let match = prop.isnt("computed") && key.isIdentifier({
          name: targetName
        });
        match = match || key.isLiteral({
          value: targetName
        });
        if (match) return prop.get("value").resolve(dangerous, resolved);
      }
    } else if (target.isArrayExpression() && !isNaN(+targetName)) {
      const elems = target.get("elements");
      const elem = elems[targetName];
      if (elem) return elem.resolve(dangerous, resolved);
    }
  }
}
function isConstantExpression() {
  if (this.isIdentifier()) {
    const binding = this.scope.getBinding(this.node.name);
    if (!binding) return false;
    return binding.constant;
  }
  if (this.isLiteral()) {
    if (this.isRegExpLiteral()) {
      return false;
    }
    if (this.isTemplateLiteral()) {
      return this.get("expressions").every(expression => expression.isConstantExpression());
    }
    return true;
  }
  if (this.isUnaryExpression()) {
    if (this.node.operator !== "void") {
      return false;
    }
    return this.get("argument").isConstantExpression();
  }
  if (this.isBinaryExpression()) {
    const {
      operator
    } = this.node;
    return operator !== "in" && operator !== "instanceof" && this.get("left").isConstantExpression() && this.get("right").isConstantExpression();
  }
  if (this.isMemberExpression()) {
    return !this.node.computed && this.get("object").isIdentifier({
      name: "Symbol"
    }) && !this.scope.hasBinding("Symbol", {
      noGlobals: true
    });
  }
  if (this.isCallExpression()) {
    return this.node.arguments.length === 1 && this.get("callee").matchesPattern("Symbol.for") && !this.scope.hasBinding("Symbol", {
      noGlobals: true
    }) && this.get("arguments")[0].isStringLiteral();
  }
  return false;
}
function isInStrictMode() {
  const start = this.isProgram() ? this : this.parentPath;
  const strictParent = start.find(path => {
    if (path.isProgram({
      sourceType: "module"
    })) return true;
    if (path.isClass()) return true;
    if (path.isArrowFunctionExpression() && !path.get("body").isBlockStatement()) {
      return false;
    }
    let body;
    if (path.isFunction()) {
      body = path.node.body;
    } else if (path.isProgram()) {
      body = path.node;
    } else {
      return false;
    }
    for (const directive of body.directives) {
      if (directive.value.value === "use strict") {
        return true;
      }
    }
    return false;
  });
  return !!strictParent;
}

const {
  getAssignmentIdentifiers: _getAssignmentIdentifiers,
  getBindingIdentifiers: _getBindingIdentifiers,
  getOuterBindingIdentifiers: _getOuterBindingIdentifiers,
  buildUndefinedNode
} = _t;
const NORMAL_COMPLETION = 0;
const BREAK_COMPLETION = 1;
function NormalCompletion(path) {
  return {
    type: NORMAL_COMPLETION,
    path
  };
}
function BreakCompletion(path) {
  return {
    type: BREAK_COMPLETION,
    path
  };
}
function getOpposite() {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
  return null;
}
function addCompletionRecords(path, records, context) {
  if (path) {
    records.push(..._getCompletionRecords(path, context));
  }
  return records;
}
function completionRecordForSwitch(cases, records, context) {
  let lastNormalCompletions = [];
  for (let i = 0; i < cases.length; i++) {
    const casePath = cases[i];
    const caseCompletions = _getCompletionRecords(casePath, context);
    const normalCompletions = [];
    const breakCompletions = [];
    for (const c of caseCompletions) {
      if (c.type === NORMAL_COMPLETION) {
        normalCompletions.push(c);
      }
      if (c.type === BREAK_COMPLETION) {
        breakCompletions.push(c);
      }
    }
    if (normalCompletions.length) {
      lastNormalCompletions = normalCompletions;
    }
    records.push(...breakCompletions);
  }
  records.push(...lastNormalCompletions);
  return records;
}
function normalCompletionToBreak(completions) {
  completions.forEach(c => {
    c.type = BREAK_COMPLETION;
  });
}
function replaceBreakStatementInBreakCompletion(completions, reachable) {
  completions.forEach(c => {
    if (c.path.isBreakStatement({
      label: null
    })) {
      if (reachable) {
        c.path.replaceWith(buildUndefinedNode());
      } else {
        c.path.remove();
      }
    }
  });
}
function getStatementListCompletion(paths, context) {
  const completions = [];
  if (context.canHaveBreak) {
    let lastNormalCompletions = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const newContext = {
        ...context,
        inCaseClause: false
      };
      if (path.isBlockStatement() && (context.inCaseClause || context.shouldPopulateBreak)) {
        newContext.shouldPopulateBreak = true;
      } else {
        newContext.shouldPopulateBreak = false;
      }
      const statementCompletions = _getCompletionRecords(path, newContext);
      if (statementCompletions.length > 0 && statementCompletions.every(c => c.type === BREAK_COMPLETION)) {
        if (lastNormalCompletions.length > 0 && statementCompletions.every(c => c.path.isBreakStatement({
          label: null
        }))) {
          normalCompletionToBreak(lastNormalCompletions);
          completions.push(...lastNormalCompletions);
          if (lastNormalCompletions.some(c => c.path.isDeclaration())) {
            completions.push(...statementCompletions);
            if (!context.shouldPreserveBreak) {
              replaceBreakStatementInBreakCompletion(statementCompletions, true);
            }
          }
          if (!context.shouldPreserveBreak) {
            replaceBreakStatementInBreakCompletion(statementCompletions, false);
          }
        } else {
          completions.push(...statementCompletions);
          if (!context.shouldPopulateBreak && !context.shouldPreserveBreak) {
            replaceBreakStatementInBreakCompletion(statementCompletions, true);
          }
        }
        break;
      }
      if (i === paths.length - 1) {
        completions.push(...statementCompletions);
      } else {
        lastNormalCompletions = [];
        for (let i = 0; i < statementCompletions.length; i++) {
          const c = statementCompletions[i];
          if (c.type === BREAK_COMPLETION) {
            completions.push(c);
          }
          if (c.type === NORMAL_COMPLETION) {
            lastNormalCompletions.push(c);
          }
        }
      }
    }
  } else if (paths.length) {
    for (let i = paths.length - 1; i >= 0; i--) {
      const pathCompletions = _getCompletionRecords(paths[i], context);
      if (pathCompletions.length > 1 || pathCompletions.length === 1 && !pathCompletions[0].path.isVariableDeclaration() && !pathCompletions[0].path.isEmptyStatement()) {
        completions.push(...pathCompletions);
        break;
      }
    }
  }
  return completions;
}
function _getCompletionRecords(path, context) {
  let records = [];
  if (path.isIfStatement()) {
    records = addCompletionRecords(path.get("consequent"), records, context);
    records = addCompletionRecords(path.get("alternate"), records, context);
  } else if (path.isDoExpression() || path.isFor() || path.isWhile() || path.isLabeledStatement()) {
    return addCompletionRecords(path.get("body"), records, context);
  } else if (path.isProgram() || path.isBlockStatement()) {
    return getStatementListCompletion(path.get("body"), context);
  } else if (path.isFunction()) {
    return _getCompletionRecords(path.get("body"), context);
  } else if (path.isTryStatement()) {
    records = addCompletionRecords(path.get("block"), records, context);
    records = addCompletionRecords(path.get("handler"), records, context);
  } else if (path.isCatchClause()) {
    return addCompletionRecords(path.get("body"), records, context);
  } else if (path.isSwitchStatement()) {
    return completionRecordForSwitch(path.get("cases"), records, context);
  } else if (path.isSwitchCase()) {
    return getStatementListCompletion(path.get("consequent"), {
      canHaveBreak: true,
      shouldPopulateBreak: false,
      inCaseClause: true,
      shouldPreserveBreak: context.shouldPreserveBreak
    });
  } else if (path.isBreakStatement()) {
    records.push(BreakCompletion(path));
  } else {
    records.push(NormalCompletion(path));
  }
  return records;
}
function getCompletionRecords(shouldPreserveBreak = false) {
  const records = _getCompletionRecords(this, {
    canHaveBreak: false,
    shouldPopulateBreak: false,
    inCaseClause: false,
    shouldPreserveBreak
  });
  return records.map(r => r.path);
}
function getSibling(key) {
  return NodePath_Final.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key
  }).setContext(this.context);
}
function getPrevSibling() {
  return this.getSibling(this.key - 1);
}
function getNextSibling() {
  return this.getSibling(this.key + 1);
}
function getAllNextSiblings() {
  let _key = this.key;
  let sibling = this.getSibling(++_key);
  const siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(++_key);
  }
  return siblings;
}
function getAllPrevSiblings() {
  let _key = this.key;
  let sibling = this.getSibling(--_key);
  const siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(--_key);
  }
  return siblings;
}
function get(key, context = true) {
  if (context === true) context = this.context;
  const parts = key.split(".");
  if (parts.length === 1) {
    return _getKey.call(this, key, context);
  } else {
    return _getPattern.call(this, parts, context);
  }
}
function _getKey(key, context) {
  const node = this.node;
  const container = node[key];
  if (Array.isArray(container)) {
    return container.map((_, i) => {
      return NodePath_Final.get({
        listKey: key,
        parentPath: this,
        parent: node,
        container: container,
        key: i
      }).setContext(context);
    });
  } else {
    return NodePath_Final.get({
      parentPath: this,
      parent: node,
      container: node,
      key: key
    }).setContext(context);
  }
}
function _getPattern(parts, context) {
  let path = this;
  for (const part of parts) {
    if (part === ".") {
      path = path.parentPath;
    } else {
      if (Array.isArray(path)) {
        path = path[part];
      } else {
        path = path.get(part, context);
      }
    }
  }
  return path;
}
function getAssignmentIdentifiers() {
  return _getAssignmentIdentifiers(this.node);
}
function getBindingIdentifiers(duplicates) {
  return _getBindingIdentifiers(this.node, duplicates);
}
function getOuterBindingIdentifiers(duplicates) {
  return _getOuterBindingIdentifiers(this.node, duplicates);
}
function getBindingIdentifierPaths(duplicates = false, outerOnly = false) {
  const path = this;
  const search = [path];
  const ids = Object.create(null);
  while (search.length) {
    const id = search.shift();
    if (!id) continue;
    if (!id.node) continue;
    const keys = _getBindingIdentifiers.keys[id.node.type];
    if (id.isIdentifier()) {
      if (duplicates) {
        const _ids = ids[id.node.name] = ids[id.node.name] || [];
        _ids.push(id);
      } else {
        ids[id.node.name] = id;
      }
      continue;
    }
    if (id.isExportDeclaration()) {
      const declaration = id.get("declaration");
      if (declaration.isDeclaration()) {
        search.push(declaration);
      }
      continue;
    }
    if (outerOnly) {
      if (id.isFunctionDeclaration()) {
        search.push(id.get("id"));
        continue;
      }
      if (id.isFunctionExpression()) {
        continue;
      }
    }
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const child = id.get(key);
        if (Array.isArray(child)) {
          search.push(...child);
        } else if (child.node) {
          search.push(child);
        }
      }
    }
  }
  return ids;
}
function getOuterBindingIdentifierPaths(duplicates = false) {
  return this.getBindingIdentifierPaths(duplicates, true);
}

const {
  addComment: _addComment,
  addComments: _addComments
} = _t;
function shareCommentsWithSiblings() {
  if (typeof this.key === "string") return;
  const node = this.node;
  if (!node) return;
  const trailing = node.trailingComments;
  const leading = node.leadingComments;
  if (!trailing && !leading) return;
  const prev = this.getSibling(this.key - 1);
  const next = this.getSibling(this.key + 1);
  const hasPrev = !!prev.node;
  const hasNext = !!next.node;
  if (hasPrev) {
    if (leading) {
      prev.addComments("trailing", removeIfExisting(leading, prev.node.trailingComments));
    }
    if (trailing && !hasNext) prev.addComments("trailing", trailing);
  }
  if (hasNext) {
    if (trailing) {
      next.addComments("leading", removeIfExisting(trailing, next.node.leadingComments));
    }
    if (leading && !hasPrev) next.addComments("leading", leading);
  }
}
function removeIfExisting(list, toRemove) {
  if (!toRemove?.length) return list;
  const set = new Set(toRemove);
  return list.filter(el => {
    return !set.has(el);
  });
}
function addComment(type, content, line) {
  _addComment(this.node, type, content, line);
}
function addComments(type, comments) {
  _addComments(this.node, type, comments);
}

const {
  validate
} = _t;
const debug = createDebug("babel");
const REMOVED = 1 << 0;
const SHOULD_STOP = 1 << 1;
const SHOULD_SKIP = 1 << 2;
const NodePath_Final = class NodePath {
  constructor(hub, parent) {
    this.parent = parent;
    this.hub = hub;
    this.data = null;
    this.context = null;
    this.scope = null;
  }
  contexts = [];
  state = null;
  _traverseFlags = 0;
  get removed() {
    return (this._traverseFlags & 1) > 0;
  }
  set removed(v) {
    if (v) this._traverseFlags |= 1;else this._traverseFlags &= -2;
  }
  get shouldStop() {
    return (this._traverseFlags & 2) > 0;
  }
  set shouldStop(v) {
    if (v) this._traverseFlags |= 2;else this._traverseFlags &= -3;
  }
  get shouldSkip() {
    return (this._traverseFlags & 4) > 0;
  }
  set shouldSkip(v) {
    if (v) this._traverseFlags |= 4;else this._traverseFlags &= -5;
  }
  skipKeys = null;
  parentPath = null;
  container = null;
  listKey = null;
  key = null;
  node = null;
  type = null;
  _store = null;
  static get({
    hub,
    parentPath,
    parent,
    container,
    listKey,
    key
  }) {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }
    if (!parent) {
      throw new Error("To get a node path the parent needs to exist");
    }
    const targetNode = container[key];
    const paths = getOrCreateCachedPaths(parent, parentPath);
    let path = paths.get(targetNode);
    if (!path) {
      path = new NodePath(hub, parent);
      if (targetNode) paths.set(targetNode, path);
    }
    setup.call(path, parentPath, container, listKey, key);
    return path;
  }
  getScope(scope) {
    return this.isScope() ? new Scope(this) : scope;
  }
  setData(key, val) {
    if (this.data == null) {
      this.data = Object.create(null);
    }
    return this.data[key] = val;
  }
  getData(key, def) {
    if (this.data == null) {
      this.data = Object.create(null);
    }
    let val = this.data[key];
    if (val === undefined && def !== undefined) val = this.data[key] = def;
    return val;
  }
  hasNode() {
    return this.node != null;
  }
  buildCodeFrameError(msg, Error = SyntaxError) {
    return this.hub.buildError(this.node, msg, Error);
  }
  traverse(visitor, state) {
    traverse(this.node, visitor, this.scope, state, this);
  }
  set(key, node) {
    validate(this.node, key, node);
    this.node[key] = node;
  }
  getPathLocation() {
    const parts = [];
    let path = this;
    do {
      let key = path.key;
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while (path = path.parentPath);
    return parts.join(".");
  }
  debug(message) {
    if (!debug.enabled) return;
    debug(`${this.getPathLocation()} ${this.type}: ${message}`);
  }
  toString() {
    return generator(this.node).code;
  }
  get inList() {
    return !!this.listKey;
  }
  set inList(inList) {
    if (!inList) {
      this.listKey = null;
    }
  }
  get parentKey() {
    return this.listKey || this.key;
  }
};
const methods = {
  findParent: findParent,
  find: find,
  getFunctionParent: getFunctionParent,
  getStatementParent: getStatementParent,
  getEarliestCommonAncestorFrom: getEarliestCommonAncestorFrom,
  getDeepestCommonAncestorFrom: getDeepestCommonAncestorFrom,
  getAncestry: getAncestry,
  isAncestor: isAncestor,
  isDescendant: isDescendant,
  inType: inType,
  getTypeAnnotation: getTypeAnnotation,
  isBaseType: isBaseType,
  couldBeBaseType: couldBeBaseType,
  baseTypeStrictlyMatches: baseTypeStrictlyMatches,
  isGenericType: isGenericType,
  replaceWithMultiple: replaceWithMultiple,
  replaceWithSourceString: replaceWithSourceString,
  replaceWith: replaceWith,
  replaceExpressionWithStatements: replaceExpressionWithStatements,
  replaceInline: replaceInline,
  evaluateTruthy: evaluateTruthy,
  evaluate: evaluate,
  ensureBlock: ensureBlock,
  unwrapFunctionEnvironment: unwrapFunctionEnvironment,
  arrowFunctionToExpression: arrowFunctionToExpression,
  splitExportDeclaration: splitExportDeclaration,
  ensureFunctionName: ensureFunctionName,
  matchesPattern: matchesPattern,
  isStatic: isStatic,
  isNodeType: isNodeType,
  canHaveVariableDeclarationOrExpression: canHaveVariableDeclarationOrExpression,
  canSwapBetweenExpressionAndStatement: canSwapBetweenExpressionAndStatement,
  isCompletionRecord: isCompletionRecord,
  isStatementOrBlock: isStatementOrBlock,
  referencesImport: referencesImport,
  getSource: getSource,
  willIMaybeExecuteBefore: willIMaybeExecuteBefore,
  _guessExecutionStatusRelativeTo: _guessExecutionStatusRelativeTo,
  resolve: resolve,
  isConstantExpression: isConstantExpression,
  isInStrictMode: isInStrictMode,
  isDenylisted: isDenylisted,
  skip: skip,
  skipKey: skipKey,
  stop: stop,
  setContext: setContext,
  requeue: requeue,
  requeueComputedKeyAndDecorators: requeueComputedKeyAndDecorators,
  remove: remove,
  insertBefore: insertBefore,
  insertAfter: insertAfter,
  unshiftContainer: unshiftContainer,
  pushContainer: pushContainer,
  getOpposite: getOpposite,
  getCompletionRecords: getCompletionRecords,
  getSibling: getSibling,
  getPrevSibling: getPrevSibling,
  getNextSibling: getNextSibling,
  getAllNextSiblings: getAllNextSiblings,
  getAllPrevSiblings: getAllPrevSiblings,
  get: get,
  getAssignmentIdentifiers: getAssignmentIdentifiers,
  getBindingIdentifiers: getBindingIdentifiers,
  getOuterBindingIdentifiers: getOuterBindingIdentifiers,
  getBindingIdentifierPaths: getBindingIdentifierPaths,
  getOuterBindingIdentifierPaths: getOuterBindingIdentifierPaths,
  shareCommentsWithSiblings: shareCommentsWithSiblings,
  addComment: addComment,
  addComments: addComments
};
Object.assign(NodePath_Final.prototype, methods);
for (const type of _t.TYPES) {
  const typeKey = `is${type}`;
  const fn = _t[typeKey];
  NodePath_Final.prototype[typeKey] = function (opts) {
    return fn(this.node, opts);
  };
  NodePath_Final.prototype[`assert${type}`] = function (opts) {
    if (!fn(this.node, opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}
Object.assign(NodePath_Final.prototype, NodePath_virtual_types_validator);
for (const type of Object.keys(virtualTypes)) {
  if (type.startsWith("_")) continue;
  if (!_t.TYPES.includes(type)) _t.TYPES.push(type);
}

function _call(fns) {
  if (!fns) return false;
  for (const fn of fns) {
    if (!fn) continue;
    const node = this.node;
    if (!node) return true;
    const ret = fn.call(this.state, this, this.state);
    if (ret && typeof ret === "object" && typeof ret.then === "function") {
      throw new Error(`You appear to be using a plugin with an async traversal visitor, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
    }
    if (ret) {
      throw new Error(`Unexpected return value from visitor method ${fn}`);
    }
    if (this.node !== node) return true;
    if (this._traverseFlags > 0) return true;
  }
  return false;
}
function isDenylisted() {
  return !!this.opts.denylist?.includes(this.node.type);
}
function skip() {
  this.shouldSkip = true;
}
function skipKey(key) {
  if (this.skipKeys == null) {
    this.skipKeys = {};
  }
  this.skipKeys[key] = true;
}
function stop() {
  this._traverseFlags |= SHOULD_SKIP | SHOULD_STOP;
}
function _forceSetScope() {
  let path = this.parentPath;
  if ((this.key === "key" || this.listKey === "decorators") && path.isMethod() || this.key === "discriminant" && path.isSwitchStatement()) {
    path = path.parentPath;
  }
  let target;
  while (path && !target) {
    target = path.scope;
    path = path.parentPath;
  }
  this.scope = this.getScope(target);
  this.scope?.init();
}
function setScope() {
  if (this.opts?.noScope) return;
  let path = this.parentPath;
  if ((this.key === "key" || this.listKey === "decorators") && path.isMethod() || this.key === "discriminant" && path.isSwitchStatement()) {
    path = path.parentPath;
  }
  let target;
  while (path && !target) {
    if (path.opts?.noScope) return;
    target = path.scope;
    path = path.parentPath;
  }
  this.scope = this.getScope(target);
  this.scope?.init();
}
function setContext(context) {
  if (this.skipKeys != null) {
    this.skipKeys = {};
  }
  this._traverseFlags = 0;
  if (context) {
    this.context = context;
    this.state = context.state;
    this.opts = context.opts;
  }
  setScope.call(this);
  return this;
}
function resync() {
  if (this.removed) return;
  _resyncParent.call(this);
  _resyncList.call(this);
  _resyncKey.call(this);
}
function _resyncParent() {
  if (this.parentPath) {
    this.parent = this.parentPath.node;
  }
}
function _resyncKey() {
  if (!this.container) return;
  if (this.node === this.container[this.key]) {
    return;
  }
  if (Array.isArray(this.container)) {
    for (let i = 0; i < this.container.length; i++) {
      if (this.container[i] === this.node) {
        setKey.call(this, i);
        return;
      }
    }
  } else {
    for (const key of Object.keys(this.container)) {
      if (this.container[key] === this.node) {
        setKey.call(this, key);
        return;
      }
    }
  }
  this.key = null;
}
function _resyncList() {
  if (!this.parent || !this.inList) return;
  const newContainer = this.parent[this.listKey];
  if (this.container === newContainer) return;
  this.container = newContainer || null;
}
function popContext() {
  this.contexts.pop();
  if (this.contexts.length > 0) {
    this.setContext(this.contexts[this.contexts.length - 1]);
  } else {
    this.setContext(undefined);
  }
}
function pushContext(context) {
  this.contexts.push(context);
  this.setContext(context);
}
function setup(parentPath, container, listKey, key) {
  this.listKey = listKey;
  this.container = container;
  this.parentPath = parentPath || this.parentPath;
  setKey.call(this, key);
}
function setKey(key) {
  this.key = key;
  this.node = this.container[this.key];
  this.type = this.node?.type ?? null;
}
function requeue(pathToQueue = this) {
  if (pathToQueue.removed) return;
  pathToQueue.shouldSkip = false;
  const contexts = this.contexts;
  for (const context of contexts) {
    context.maybeQueue(pathToQueue);
  }
}
function requeueComputedKeyAndDecorators() {
  const {
    context,
    node
  } = this;
  if (!_t.isPrivate(node) && node.computed) {
    context.maybeQueue(this.get("key"));
  }
  if (node.decorators) {
    for (const decorator of this.get("decorators")) {
      context.maybeQueue(decorator);
    }
  }
}
function _getQueueContexts() {
  let path = this;
  let contexts = this.contexts;
  while (!contexts.length) {
    path = path.parentPath;
    if (!path) break;
    contexts = path.contexts;
  }
  return contexts;
}

class Hub {
  getCode() {}
  getScope() {}
  addHelper() {
    throw new Error("Helpers are not supported by the default hub.");
  }
  buildError(node, msg, Error = TypeError) {
    return new Error(msg);
  }
}

const {
  VISITOR_KEYS,
  removeProperties,
  traverseFast
} = _t;
function traverse(parent, opts = {}, scope, state, parentPath, visitSelf) {
  if (!parent) return;
  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error("You must pass a scope and parentPath unless traversing a Program/File. " + `Instead of that you tried to traverse a ${parent.type} node without ` + "passing scope and parentPath.");
    }
  }
  if (!parentPath && visitSelf) {
    throw new Error("visitSelf can only be used when providing a NodePath.");
  }
  if (!VISITOR_KEYS[parent.type]) {
    return;
  }
  explode$1(opts);
  traverseNode(parent, opts, scope, state, parentPath, undefined, visitSelf);
}
traverse.visitors = visitors;
traverse.verify = verify$1;
traverse.explode = explode$1;
traverse.cheap = function (node, enter) {
  traverseFast(node, enter);
  return;
};
traverse.node = function (node, opts, scope, state, path, skipKeys) {
  traverseNode(node, opts, scope, state, path, skipKeys);
};
traverse.clearNode = function (node, opts) {
  removeProperties(node, opts);
};
traverse.removeProperties = function (tree, opts) {
  traverseFast(tree, traverse.clearNode, opts);
  return tree;
};
traverse.hasType = function (tree, type, denylistTypes) {
  if (denylistTypes?.includes(tree.type)) return false;
  if (tree.type === type) return true;
  return traverseFast(tree, function (node) {
    if (denylistTypes?.includes(node.type)) {
      return traverseFast.skip;
    }
    if (node.type === type) {
      return traverseFast.stop;
    }
  });
};
traverse.cache = cache;

export { Hub, NodePath_Final as NodePath, Scope, traverse as default, visitors };
//# sourceMappingURL=index.js.map
