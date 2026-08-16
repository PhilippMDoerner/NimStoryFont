
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  AmbientImport,
  ClassMemberAccessLevel,
  ClassMemberKind,
  CompletionKind,
  DOC_PAGE_BASE_URL,
  DynamicValue,
  EnumValue,
  Environment,
  ErrorCode,
  ExpressionIdentifier,
  FatalDiagnosticError,
  ImportFlags,
  ImportManager,
  ImportedSymbolsTracker,
  MetaKind,
  OptimizeFor,
  PotentialImportKind,
  PotentialImportMode,
  Reference,
  ReferenceEmitEnvironment,
  ReferenceEmitKind,
  RegistryDomSchemaChecker,
  SymbolBuilder,
  SymbolKind,
  SyntheticValue,
  TcbInliningRequirement,
  TypeParameterEmitter,
  TypeScriptReflectionHost,
  assertSuccessfulReferenceEmit,
  attachDefaultImportDeclaration,
  classMemberAccessLevelToString,
  createForeignComponentMatcher,
  describeResolvedType,
  ensureTypeCheckFilePreparationImports,
  entityNameToValue,
  extractDirectiveTypeCheckMeta,
  filterToMembersWithDecorator,
  findAllMatchingNodes,
  findFirstMatchingNode,
  findTypeCheckBlock,
  flattenInheritedDirectiveMetadata,
  generateInlineTypeCtor,
  generateTcbTypeParameters,
  getDefaultImportDeclaration,
  getProjectRelativePath,
  getSourceFile,
  getSourceFileOrNull,
  getSourceMapping,
  getTokenAtPosition,
  getTypeCheckId,
  hasInjectableFields,
  identifierOfNode,
  isAliasImportDeclaration,
  isDirectiveDeclaration,
  isDtsPath,
  isFromDtsFile,
  isHostDirectiveMetaForGlobalMode,
  isNamedClassDeclaration,
  isNonDeclarationTsPath,
  isSymbolAliasOf,
  isSymbolWithValueDeclaration,
  loadIsReferencedAliasDeclarationPatch,
  makeDiagnostic,
  makeDiagnosticChain,
  makeRelatedInformation,
  makeTemplateDiagnostic,
  ngErrorCode,
  nodeNameForError,
  presetImportManagerForceNamespaceImports,
  reflectClassMember,
  reflectObjectLiteral,
  requiresInlineTypeCheckBlock,
  requiresInlineTypeCtor,
  tempPrint,
  toUnredirectedSourceFile,
  traceDynamicValue,
  translateExpression,
  translateStatement,
  translateType,
  typeNodeToValueExpr
} from "./chunk-SOEVA7UL.js";
import {
  absoluteFrom,
  absoluteFromSourceFile,
  getSourceFileOrError,
  relative
} from "./chunk-UTWH365F.js";

// packages/compiler-cli/src/ngtsc/transform/jit/src/downlevel_decorators_transform.js
import ts from "typescript";
function isAngularDecorator(decorator, isCore) {
  return isCore || decorator.import !== null && decorator.import.from === "@angular/core";
}
var DECORATOR_INVOCATION_JSDOC_TYPE = "!Array<{type: !Function, args: (undefined|!Array<?>)}>";
function extractMetadataFromSingleDecorator(decorator, diagnostics) {
  const metadataProperties = [];
  const expr = decorator.expression;
  switch (expr.kind) {
    case ts.SyntaxKind.Identifier:
      metadataProperties.push(ts.factory.createPropertyAssignment("type", expr));
      break;
    case ts.SyntaxKind.CallExpression:
      const call = expr;
      metadataProperties.push(ts.factory.createPropertyAssignment("type", call.expression));
      if (call.arguments.length) {
        const args = [];
        for (const arg of call.arguments) {
          args.push(arg);
        }
        const argsArrayLiteral = ts.factory.createArrayLiteralExpression(ts.factory.createNodeArray(args, true));
        metadataProperties.push(ts.factory.createPropertyAssignment("args", argsArrayLiteral));
      }
      break;
    default:
      diagnostics.push({
        file: decorator.getSourceFile(),
        start: decorator.getStart(),
        length: decorator.getEnd() - decorator.getStart(),
        messageText: `${ts.SyntaxKind[decorator.kind]} not implemented in gathering decorator metadata.`,
        category: ts.DiagnosticCategory.Error,
        code: 0
      });
      break;
  }
  return ts.factory.createObjectLiteralExpression(metadataProperties);
}
function createCtorParametersClassProperty(diagnostics, entityNameToExpression, ctorParameters, isClosureCompilerEnabled) {
  const params = [];
  for (const ctorParam of ctorParameters) {
    if (!ctorParam.type && ctorParam.decorators.length === 0) {
      params.push(ts.factory.createNull());
      continue;
    }
    const paramType = ctorParam.type ? typeReferenceToExpression(entityNameToExpression, ctorParam.type) : void 0;
    const members = [
      ts.factory.createPropertyAssignment("type", paramType || ts.factory.createIdentifier("undefined"))
    ];
    const decorators = [];
    for (const deco of ctorParam.decorators) {
      decorators.push(extractMetadataFromSingleDecorator(deco, diagnostics));
    }
    if (decorators.length) {
      members.push(ts.factory.createPropertyAssignment("decorators", ts.factory.createArrayLiteralExpression(decorators)));
    }
    params.push(ts.factory.createObjectLiteralExpression(members));
  }
  const initializer = ts.factory.createArrowFunction(void 0, void 0, [], void 0, ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), ts.factory.createArrayLiteralExpression(params, true));
  const ctorProp = ts.factory.createPropertyDeclaration([ts.factory.createToken(ts.SyntaxKind.StaticKeyword)], "ctorParameters", void 0, void 0, initializer);
  if (isClosureCompilerEnabled) {
    ts.setSyntheticLeadingComments(ctorProp, [
      {
        kind: ts.SyntaxKind.MultiLineCommentTrivia,
        text: [
          `*`,
          ` * @type {function(): !Array<(null|{`,
          ` *   type: ?,`,
          ` *   decorators: (undefined|${DECORATOR_INVOCATION_JSDOC_TYPE}),`,
          ` * })>}`,
          ` * @nocollapse`,
          ` `
        ].join("\n"),
        pos: -1,
        end: -1,
        hasTrailingNewLine: true
      }
    ]);
  }
  return ctorProp;
}
function typeReferenceToExpression(entityNameToExpression, node) {
  let kind = node.kind;
  if (ts.isLiteralTypeNode(node)) {
    kind = node.literal.kind;
  }
  switch (kind) {
    case ts.SyntaxKind.FunctionType:
    case ts.SyntaxKind.ConstructorType:
      return ts.factory.createIdentifier("Function");
    case ts.SyntaxKind.ArrayType:
    case ts.SyntaxKind.TupleType:
      return ts.factory.createIdentifier("Array");
    case ts.SyntaxKind.TypePredicate:
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.BooleanKeyword:
      return ts.factory.createIdentifier("Boolean");
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.StringKeyword:
      return ts.factory.createIdentifier("String");
    case ts.SyntaxKind.ObjectKeyword:
      return ts.factory.createIdentifier("Object");
    case ts.SyntaxKind.NumberKeyword:
    case ts.SyntaxKind.NumericLiteral:
      return ts.factory.createIdentifier("Number");
    case ts.SyntaxKind.TypeReference:
      const typeRef = node;
      return entityNameToExpression(typeRef.typeName);
    case ts.SyntaxKind.UnionType:
      const childTypeNodes = node.types.filter((t) => !(ts.isLiteralTypeNode(t) && t.literal.kind === ts.SyntaxKind.NullKeyword));
      return childTypeNodes.length === 1 ? typeReferenceToExpression(entityNameToExpression, childTypeNodes[0]) : void 0;
    default:
      return void 0;
  }
}
function symbolIsRuntimeValue(typeChecker, symbol) {
  if (symbol.flags & ts.SymbolFlags.Alias) {
    symbol = typeChecker.getAliasedSymbol(symbol);
  }
  return (symbol.flags & ts.SymbolFlags.Value & ts.SymbolFlags.ConstEnumExcludes) !== 0;
}
function getDownlevelDecoratorsTransform(typeChecker, host, diagnostics, isCore, isClosureCompilerEnabled, shouldTransformClass) {
  function addJSDocTypeAnnotation(node, jsdocType) {
    if (!isClosureCompilerEnabled) {
      return;
    }
    ts.setSyntheticLeadingComments(node, [
      {
        kind: ts.SyntaxKind.MultiLineCommentTrivia,
        text: `* @type {${jsdocType}} `,
        pos: -1,
        end: -1,
        hasTrailingNewLine: true
      }
    ]);
  }
  function createPropDecoratorsClassProperty(diagnostics2, properties) {
    const entries = [];
    for (const [name, decorators] of properties.entries()) {
      entries.push(ts.factory.createPropertyAssignment(name, ts.factory.createArrayLiteralExpression(decorators.map((deco) => extractMetadataFromSingleDecorator(deco, diagnostics2)))));
    }
    const initializer = ts.factory.createObjectLiteralExpression(entries, true);
    const prop = ts.factory.createPropertyDeclaration([ts.factory.createToken(ts.SyntaxKind.StaticKeyword)], "propDecorators", void 0, void 0, initializer);
    addJSDocTypeAnnotation(prop, `!Object<string, ${DECORATOR_INVOCATION_JSDOC_TYPE}>`);
    return prop;
  }
  return (context) => {
    const referencedParameterTypes = loadIsReferencedAliasDeclarationPatch(context);
    function entityNameToExpression(name) {
      const symbol = typeChecker.getSymbolAtLocation(name);
      if (!symbol || !symbolIsRuntimeValue(typeChecker, symbol) || !symbol.declarations || symbol.declarations.length === 0) {
        return void 0;
      }
      if (ts.isQualifiedName(name)) {
        const containerExpr = entityNameToExpression(name.left);
        if (containerExpr === void 0) {
          return void 0;
        }
        return ts.factory.createPropertyAccessExpression(containerExpr, name.right);
      }
      const decl = symbol.declarations[0];
      if (isAliasImportDeclaration(decl)) {
        referencedParameterTypes?.add(decl);
        if (decl.name !== void 0) {
          return ts.setOriginalNode(ts.factory.createIdentifier(decl.name.text), decl.name);
        }
      }
      return ts.setOriginalNode(ts.factory.createIdentifier(name.text), name);
    }
    function transformClassElement(element) {
      element = ts.visitEachChild(element, decoratorDownlevelVisitor, context);
      const decoratorsToKeep = [];
      const toLower = [];
      const decorators = host.getDecoratorsOfDeclaration(element) || [];
      for (const decorator of decorators) {
        const decoratorNode = decorator.node;
        if (!isAngularDecorator(decorator, isCore)) {
          decoratorsToKeep.push(decoratorNode);
          continue;
        }
        toLower.push(decoratorNode);
      }
      if (!toLower.length)
        return [void 0, element, []];
      if (!element.name || !ts.isIdentifier(element.name)) {
        diagnostics.push({
          file: element.getSourceFile(),
          start: element.getStart(),
          length: element.getEnd() - element.getStart(),
          messageText: `Cannot process decorators for class element with non-analyzable name.`,
          category: ts.DiagnosticCategory.Error,
          code: 0
        });
        return [void 0, element, []];
      }
      const elementModifiers = ts.canHaveModifiers(element) ? ts.getModifiers(element) : void 0;
      let modifiers;
      if (decoratorsToKeep.length || elementModifiers?.length) {
        modifiers = ts.setTextRange(ts.factory.createNodeArray([...decoratorsToKeep, ...elementModifiers || []]), element.modifiers);
      }
      return [element.name.text, cloneClassElementWithModifiers(element, modifiers), toLower];
    }
    function transformConstructor(ctor) {
      ctor = ts.visitEachChild(ctor, decoratorDownlevelVisitor, context);
      const newParameters = [];
      const oldParameters = ctor.parameters;
      const parametersInfo = [];
      for (const param of oldParameters) {
        const decoratorsToKeep = [];
        const paramInfo = { decorators: [], type: null };
        const decorators = host.getDecoratorsOfDeclaration(param) || [];
        for (const decorator of decorators) {
          const decoratorNode = decorator.node;
          if (!isAngularDecorator(decorator, isCore)) {
            decoratorsToKeep.push(decoratorNode);
            continue;
          }
          paramInfo.decorators.push(decoratorNode);
        }
        if (param.type) {
          paramInfo.type = param.type;
        }
        parametersInfo.push(paramInfo);
        let modifiers;
        const paramModifiers = ts.getModifiers(param);
        if (decoratorsToKeep.length || paramModifiers?.length) {
          modifiers = [...decoratorsToKeep, ...paramModifiers || []];
        }
        const newParam = ts.factory.updateParameterDeclaration(param, modifiers, param.dotDotDotToken, param.name, param.questionToken, param.type, param.initializer);
        newParameters.push(newParam);
      }
      const updated = ts.factory.updateConstructorDeclaration(ctor, ts.getModifiers(ctor), newParameters, ctor.body);
      return [updated, parametersInfo];
    }
    function transformClassDeclaration(classDecl) {
      const newMembers = [];
      const decoratedProperties = /* @__PURE__ */ new Map();
      let classParameters = null;
      for (const member of classDecl.members) {
        switch (member.kind) {
          case ts.SyntaxKind.PropertyDeclaration:
          case ts.SyntaxKind.GetAccessor:
          case ts.SyntaxKind.SetAccessor:
          case ts.SyntaxKind.MethodDeclaration: {
            const [name, newMember, decorators] = transformClassElement(member);
            newMembers.push(newMember);
            if (name)
              decoratedProperties.set(name, decorators);
            continue;
          }
          case ts.SyntaxKind.Constructor: {
            const ctor = member;
            if (!ctor.body)
              break;
            const [newMember, parametersInfo] = transformConstructor(member);
            classParameters = parametersInfo;
            newMembers.push(newMember);
            continue;
          }
          default:
            break;
        }
        newMembers.push(ts.visitEachChild(member, decoratorDownlevelVisitor, context));
      }
      const possibleAngularDecorators = host.getDecoratorsOfDeclaration(classDecl) || [];
      const hasAngularDecorator = possibleAngularDecorators.some((d) => isAngularDecorator(d, isCore));
      if (classParameters) {
        if (hasAngularDecorator || classParameters.some((p) => !!p.decorators.length)) {
          newMembers.push(createCtorParametersClassProperty(diagnostics, entityNameToExpression, classParameters, isClosureCompilerEnabled));
        }
      }
      if (decoratedProperties.size) {
        newMembers.push(createPropDecoratorsClassProperty(diagnostics, decoratedProperties));
      }
      const members = ts.setTextRange(ts.factory.createNodeArray(newMembers, classDecl.members.hasTrailingComma), classDecl.members);
      return ts.factory.updateClassDeclaration(classDecl, classDecl.modifiers, classDecl.name, classDecl.typeParameters, classDecl.heritageClauses, members);
    }
    function decoratorDownlevelVisitor(node) {
      if (ts.isClassDeclaration(node) && (shouldTransformClass === void 0 || shouldTransformClass(node))) {
        return transformClassDeclaration(node);
      }
      return ts.visitEachChild(node, decoratorDownlevelVisitor, context);
    }
    return (sf) => {
      return ts.visitEachChild(sf, decoratorDownlevelVisitor, context);
    };
  };
}
function cloneClassElementWithModifiers(node, modifiers) {
  let clone;
  if (ts.isMethodDeclaration(node)) {
    clone = ts.factory.createMethodDeclaration(modifiers, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body);
  } else if (ts.isPropertyDeclaration(node)) {
    clone = ts.factory.createPropertyDeclaration(modifiers, node.name, node.questionToken, node.type, node.initializer);
  } else if (ts.isGetAccessor(node)) {
    clone = ts.factory.createGetAccessorDeclaration(modifiers, node.name, node.parameters, node.type, node.body);
  } else if (ts.isSetAccessor(node)) {
    clone = ts.factory.createSetAccessorDeclaration(modifiers, node.name, node.parameters, node.body);
  } else {
    throw new Error(`Unsupported decorated member with kind ${ts.SyntaxKind[node.kind]}`);
  }
  return ts.setOriginalNode(clone, node);
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/util.js
import { ExternalExpr, ParseLocation, ParseSourceFile, ParseSourceSpan, ReadPropExpr, WrappedNodeExpr } from "@angular/compiler";
import ts2 from "typescript";
var CORE_MODULE = "@angular/core";
function valueReferenceToExpression(valueRef) {
  if (valueRef.kind === 2) {
    return null;
  } else if (valueRef.kind === 0) {
    const expr = new WrappedNodeExpr(valueRef.expression);
    if (valueRef.defaultImportStatement !== null) {
      attachDefaultImportDeclaration(expr, valueRef.defaultImportStatement);
    }
    return expr;
  } else {
    let importExpr = new ExternalExpr({
      moduleName: valueRef.moduleName,
      name: valueRef.importedName
    });
    if (valueRef.nestedPath !== null) {
      for (const property of valueRef.nestedPath) {
        importExpr = new ReadPropExpr(importExpr, property);
      }
    }
    return importExpr;
  }
}
function toR3Reference(origin, ref, context, refEmitter) {
  const emittedValueRef = refEmitter.emit(ref, context);
  assertSuccessfulReferenceEmit(emittedValueRef, origin, "class");
  const emittedTypeRef = refEmitter.emit(ref, context, ImportFlags.ForceNewImport | ImportFlags.AllowTypeImports);
  assertSuccessfulReferenceEmit(emittedTypeRef, origin, "class");
  return {
    value: emittedValueRef.expression,
    type: emittedTypeRef.expression
  };
}
function isAngularCore(decorator) {
  return decorator.import !== null && decorator.import.from === CORE_MODULE;
}
function isAngularCoreReferenceWithPotentialAliasing(reference, symbolName, isCore) {
  return (reference.ownedByModuleGuess === CORE_MODULE || isCore) && reference.debugName?.replace(/\$\d+$/, "") === symbolName;
}
function findAngularDecorator(decorators, name, isCore) {
  return decorators.find((decorator) => isAngularDecorator2(decorator, name, isCore));
}
function isAngularDecorator2(decorator, name, isCore) {
  if (isCore) {
    return decorator.name === name;
  } else if (isAngularCore(decorator)) {
    return decorator.import.name === name;
  }
  return false;
}
function getAngularDecorators(decorators, names, isCore) {
  return decorators.filter((decorator) => {
    const name = isCore ? decorator.name : decorator.import?.name;
    if (name === void 0 || !names.includes(name)) {
      return false;
    }
    return isCore || isAngularCore(decorator);
  });
}
function unwrapExpression(node) {
  while (ts2.isAsExpression(node) || ts2.isParenthesizedExpression(node)) {
    node = node.expression;
  }
  return node;
}
function expandForwardRef(arg) {
  arg = unwrapExpression(arg);
  if (!ts2.isArrowFunction(arg) && !ts2.isFunctionExpression(arg)) {
    return null;
  }
  const body = arg.body;
  if (ts2.isBlock(body)) {
    if (body.statements.length !== 1) {
      return null;
    }
    const stmt = body.statements[0];
    if (!ts2.isReturnStatement(stmt) || stmt.expression === void 0) {
      return null;
    }
    return stmt.expression;
  } else {
    return body;
  }
}
function tryUnwrapForwardRef(node, reflector) {
  node = unwrapExpression(node);
  if (!ts2.isCallExpression(node) || node.arguments.length !== 1) {
    return null;
  }
  const fn = ts2.isPropertyAccessExpression(node.expression) ? node.expression.name : node.expression;
  if (!ts2.isIdentifier(fn)) {
    return null;
  }
  const expr = expandForwardRef(node.arguments[0]);
  if (expr === null) {
    return null;
  }
  const imp = reflector.getImportOfIdentifier(fn);
  if (imp === null || imp.from !== "@angular/core" || imp.name !== "forwardRef") {
    return null;
  }
  return expr;
}
function createForwardRefResolver(isCore) {
  return (fn, callExpr, resolve, unresolvable) => {
    if (!isAngularCoreReferenceWithPotentialAliasing(fn, "forwardRef", isCore) || callExpr.arguments.length !== 1) {
      return unresolvable;
    }
    const expanded = expandForwardRef(callExpr.arguments[0]);
    if (expanded !== null) {
      return resolve(expanded);
    } else {
      return unresolvable;
    }
  };
}
function combineResolvers(resolvers) {
  return (fn, callExpr, resolve, unresolvable) => {
    for (const resolver of resolvers) {
      const resolved = resolver(fn, callExpr, resolve, unresolvable);
      if (resolved !== unresolvable) {
        return resolved;
      }
    }
    return unresolvable;
  };
}
function isExpressionForwardReference(expr, context, contextSource) {
  if (isWrappedTsNodeExpr(expr)) {
    const node = ts2.getOriginalNode(expr.node);
    return node.getSourceFile() === contextSource && context.pos < node.pos;
  } else {
    return false;
  }
}
function isWrappedTsNodeExpr(expr) {
  return expr instanceof WrappedNodeExpr;
}
function readBaseClass(node, reflector, evaluator) {
  const baseExpression = reflector.getBaseClassExpression(node);
  if (baseExpression !== null) {
    const baseClass = evaluator.evaluate(baseExpression);
    if (baseClass instanceof Reference && reflector.isClass(baseClass.node)) {
      return baseClass;
    } else {
      return "dynamic";
    }
  }
  return null;
}
var parensWrapperTransformerFactory = (context) => {
  const visitor = (node) => {
    const visited = ts2.visitEachChild(node, visitor, context);
    if (ts2.isArrowFunction(visited) || ts2.isFunctionExpression(visited)) {
      return ts2.factory.createParenthesizedExpression(visited);
    }
    return visited;
  };
  return (node) => ts2.visitEachChild(node, visitor, context);
};
function wrapFunctionExpressionsInParens(expression) {
  return ts2.transform(expression, [parensWrapperTransformerFactory]).transformed[0];
}
function resolveProvidersRequiringFactory(rawProviders, reflector, evaluator) {
  const providers = /* @__PURE__ */ new Set();
  const resolvedProviders = evaluator.evaluate(rawProviders);
  if (!Array.isArray(resolvedProviders)) {
    return providers;
  }
  resolvedProviders.forEach(function processProviders(provider) {
    let tokenClass = null;
    if (Array.isArray(provider)) {
      provider.forEach(processProviders);
    } else if (provider instanceof Reference) {
      tokenClass = provider;
    } else if (provider instanceof Map && provider.has("useClass") && !provider.has("deps")) {
      const useExisting = provider.get("useClass");
      if (useExisting instanceof Reference) {
        tokenClass = useExisting;
      }
    }
    if (tokenClass !== null && !tokenClass.node.getSourceFile().isDeclarationFile && reflector.isClass(tokenClass.node)) {
      const constructorParameters = reflector.getConstructorParameters(tokenClass.node);
      if (constructorParameters !== null && constructorParameters.length > 0) {
        providers.add(tokenClass);
      }
    }
  });
  return providers;
}
function wrapTypeReference(clazz) {
  const value = new WrappedNodeExpr(clazz.name);
  const type = value;
  return { value, type };
}
function createSourceSpan(node) {
  const sf = node.getSourceFile();
  const [startOffset, endOffset] = [node.getStart(), node.getEnd()];
  const { line: startLine, character: startCol } = sf.getLineAndCharacterOfPosition(startOffset);
  const { line: endLine, character: endCol } = sf.getLineAndCharacterOfPosition(endOffset);
  const parseSf = new ParseSourceFile(sf.getFullText(), sf.fileName);
  return new ParseSourceSpan(new ParseLocation(parseSf, startOffset, startLine + 1, startCol + 1), new ParseLocation(parseSf, endOffset, endLine + 1, endCol + 1));
}
function compileResults(fac, def, metadataStmt, propName, additionalFields, deferrableImports, debugInfo = null, hmrInitializer = null) {
  const statements = def.statements;
  if (metadataStmt !== null) {
    statements.push(metadataStmt);
  }
  if (debugInfo !== null) {
    statements.push(debugInfo);
  }
  if (hmrInitializer !== null) {
    statements.push(hmrInitializer);
  }
  const results = [
    fac,
    {
      name: propName,
      initializer: def.expression,
      statements: def.statements,
      type: def.type,
      deferrableImports
    }
  ];
  if (additionalFields !== null) {
    results.push(...additionalFields);
  }
  return results;
}
function toFactoryMetadata(meta, target) {
  return {
    name: meta.name,
    type: meta.type,
    typeArgumentCount: meta.typeArgumentCount,
    deps: meta.deps,
    target
  };
}
function resolveImportedFile(moduleResolver, importedFile, expr, origin) {
  if (importedFile !== "unknown") {
    return importedFile;
  }
  if (!(expr instanceof ExternalExpr)) {
    return null;
  }
  return moduleResolver.resolveModule(expr.value.moduleName, origin.fileName);
}
function getOriginNodeForDiagnostics(expr, container) {
  const nodeSf = expr.getSourceFile();
  const exprSf = container.getSourceFile();
  if (nodeSf === exprSf && expr.pos >= container.pos && expr.end <= container.end) {
    return expr;
  } else {
    return container;
  }
}
function isAbstractClassDeclaration(clazz) {
  return ts2.canHaveModifiers(clazz) && clazz.modifiers !== void 0 ? clazz.modifiers.some((mod) => mod.kind === ts2.SyntaxKind.AbstractKeyword) : false;
}
function parseStandaloneOption(decorator, evaluator, implicitStandaloneValue) {
  if (decorator === null || decorator.args === null || decorator.args.length !== 1) {
    return implicitStandaloneValue;
  }
  const meta = unwrapExpression(decorator.args[0]);
  if (!ts2.isObjectLiteralExpression(meta)) {
    return implicitStandaloneValue;
  }
  const obj = reflectObjectLiteral(meta);
  if (obj.has("standalone")) {
    const expr = obj.get("standalone");
    const resolved = evaluator.evaluate(expr);
    return typeof resolved === "boolean" ? resolved : true;
  }
  return implicitStandaloneValue;
}

// packages/compiler-cli/src/ngtsc/transform/src/api.js
var CompilationMode;
(function(CompilationMode2) {
  CompilationMode2[CompilationMode2["FULL"] = 0] = "FULL";
  CompilationMode2[CompilationMode2["PARTIAL"] = 1] = "PARTIAL";
  CompilationMode2[CompilationMode2["LOCAL"] = 2] = "LOCAL";
})(CompilationMode || (CompilationMode = {}));
var HandlerPrecedence;
(function(HandlerPrecedence2) {
  HandlerPrecedence2[HandlerPrecedence2["PRIMARY"] = 0] = "PRIMARY";
  HandlerPrecedence2[HandlerPrecedence2["SHARED"] = 1] = "SHARED";
  HandlerPrecedence2[HandlerPrecedence2["WEAK"] = 2] = "WEAK";
})(HandlerPrecedence || (HandlerPrecedence = {}));

// packages/compiler-cli/src/ngtsc/perf/src/api.js
var PerfPhase;
(function(PerfPhase2) {
  PerfPhase2[PerfPhase2["Unaccounted"] = 0] = "Unaccounted";
  PerfPhase2[PerfPhase2["Setup"] = 1] = "Setup";
  PerfPhase2[PerfPhase2["TypeScriptProgramCreate"] = 2] = "TypeScriptProgramCreate";
  PerfPhase2[PerfPhase2["Reconciliation"] = 3] = "Reconciliation";
  PerfPhase2[PerfPhase2["ResourceUpdate"] = 4] = "ResourceUpdate";
  PerfPhase2[PerfPhase2["TypeScriptDiagnostics"] = 5] = "TypeScriptDiagnostics";
  PerfPhase2[PerfPhase2["Analysis"] = 6] = "Analysis";
  PerfPhase2[PerfPhase2["Resolve"] = 7] = "Resolve";
  PerfPhase2[PerfPhase2["CycleDetection"] = 8] = "CycleDetection";
  PerfPhase2[PerfPhase2["TcbGeneration"] = 9] = "TcbGeneration";
  PerfPhase2[PerfPhase2["TcbUpdateProgram"] = 10] = "TcbUpdateProgram";
  PerfPhase2[PerfPhase2["TypeScriptEmit"] = 11] = "TypeScriptEmit";
  PerfPhase2[PerfPhase2["Compile"] = 12] = "Compile";
  PerfPhase2[PerfPhase2["TtcAutocompletion"] = 13] = "TtcAutocompletion";
  PerfPhase2[PerfPhase2["TtcDiagnostics"] = 14] = "TtcDiagnostics";
  PerfPhase2[PerfPhase2["TtcSuggestionDiagnostics"] = 15] = "TtcSuggestionDiagnostics";
  PerfPhase2[PerfPhase2["TtcSymbol"] = 16] = "TtcSymbol";
  PerfPhase2[PerfPhase2["LsReferencesAndRenames"] = 17] = "LsReferencesAndRenames";
  PerfPhase2[PerfPhase2["LsQuickInfo"] = 18] = "LsQuickInfo";
  PerfPhase2[PerfPhase2["LsDefinition"] = 19] = "LsDefinition";
  PerfPhase2[PerfPhase2["LsCompletions"] = 20] = "LsCompletions";
  PerfPhase2[PerfPhase2["LsTcb"] = 21] = "LsTcb";
  PerfPhase2[PerfPhase2["LsDiagnostics"] = 22] = "LsDiagnostics";
  PerfPhase2[PerfPhase2["LsSuggestionDiagnostics"] = 23] = "LsSuggestionDiagnostics";
  PerfPhase2[PerfPhase2["LsComponentLocations"] = 24] = "LsComponentLocations";
  PerfPhase2[PerfPhase2["LsSignatureHelp"] = 25] = "LsSignatureHelp";
  PerfPhase2[PerfPhase2["OutliningSpans"] = 26] = "OutliningSpans";
  PerfPhase2[PerfPhase2["LsCodeFixes"] = 27] = "LsCodeFixes";
  PerfPhase2[PerfPhase2["LsCodeFixesAll"] = 28] = "LsCodeFixesAll";
  PerfPhase2[PerfPhase2["LSComputeApplicableRefactorings"] = 29] = "LSComputeApplicableRefactorings";
  PerfPhase2[PerfPhase2["LSApplyRefactoring"] = 30] = "LSApplyRefactoring";
  PerfPhase2[PerfPhase2["LSSemanticClassification"] = 31] = "LSSemanticClassification";
  PerfPhase2[PerfPhase2["LAST"] = 32] = "LAST";
})(PerfPhase || (PerfPhase = {}));
var PerfEvent;
(function(PerfEvent2) {
  PerfEvent2[PerfEvent2["InputDtsFile"] = 0] = "InputDtsFile";
  PerfEvent2[PerfEvent2["InputTsFile"] = 1] = "InputTsFile";
  PerfEvent2[PerfEvent2["AnalyzeComponent"] = 2] = "AnalyzeComponent";
  PerfEvent2[PerfEvent2["AnalyzeDirective"] = 3] = "AnalyzeDirective";
  PerfEvent2[PerfEvent2["AnalyzeInjectable"] = 4] = "AnalyzeInjectable";
  PerfEvent2[PerfEvent2["AnalyzeNgModule"] = 5] = "AnalyzeNgModule";
  PerfEvent2[PerfEvent2["AnalyzePipe"] = 6] = "AnalyzePipe";
  PerfEvent2[PerfEvent2["AnalyzeService"] = 7] = "AnalyzeService";
  PerfEvent2[PerfEvent2["TraitAnalyze"] = 8] = "TraitAnalyze";
  PerfEvent2[PerfEvent2["TraitReuseAnalysis"] = 9] = "TraitReuseAnalysis";
  PerfEvent2[PerfEvent2["SourceFilePhysicalChange"] = 10] = "SourceFilePhysicalChange";
  PerfEvent2[PerfEvent2["SourceFileLogicalChange"] = 11] = "SourceFileLogicalChange";
  PerfEvent2[PerfEvent2["SourceFileReuseAnalysis"] = 12] = "SourceFileReuseAnalysis";
  PerfEvent2[PerfEvent2["GenerateTcb"] = 13] = "GenerateTcb";
  PerfEvent2[PerfEvent2["SkipGenerateTcbNoInline"] = 14] = "SkipGenerateTcbNoInline";
  PerfEvent2[PerfEvent2["ReuseTypeCheckFile"] = 15] = "ReuseTypeCheckFile";
  PerfEvent2[PerfEvent2["UpdateTypeCheckProgram"] = 16] = "UpdateTypeCheckProgram";
  PerfEvent2[PerfEvent2["EmitSkipSourceFile"] = 17] = "EmitSkipSourceFile";
  PerfEvent2[PerfEvent2["EmitSourceFile"] = 18] = "EmitSourceFile";
  PerfEvent2[PerfEvent2["LAST"] = 19] = "LAST";
})(PerfEvent || (PerfEvent = {}));
var PerfCheckpoint;
(function(PerfCheckpoint2) {
  PerfCheckpoint2[PerfCheckpoint2["Initial"] = 0] = "Initial";
  PerfCheckpoint2[PerfCheckpoint2["TypeScriptProgramCreate"] = 1] = "TypeScriptProgramCreate";
  PerfCheckpoint2[PerfCheckpoint2["PreAnalysis"] = 2] = "PreAnalysis";
  PerfCheckpoint2[PerfCheckpoint2["Analysis"] = 3] = "Analysis";
  PerfCheckpoint2[PerfCheckpoint2["Resolve"] = 4] = "Resolve";
  PerfCheckpoint2[PerfCheckpoint2["TtcGeneration"] = 5] = "TtcGeneration";
  PerfCheckpoint2[PerfCheckpoint2["TtcUpdateProgram"] = 6] = "TtcUpdateProgram";
  PerfCheckpoint2[PerfCheckpoint2["PreEmit"] = 7] = "PreEmit";
  PerfCheckpoint2[PerfCheckpoint2["Emit"] = 8] = "Emit";
  PerfCheckpoint2[PerfCheckpoint2["LAST"] = 9] = "LAST";
})(PerfCheckpoint || (PerfCheckpoint = {}));

// packages/compiler-cli/src/ngtsc/perf/src/noop.js
var NoopPerfRecorder = class {
  eventCount() {
  }
  memory() {
  }
  phase() {
    return PerfPhase.Unaccounted;
  }
  inPhase(phase, fn) {
    return fn();
  }
  reset() {
  }
};
var NOOP_PERF_RECORDER = new NoopPerfRecorder();

// packages/compiler-cli/src/ngtsc/perf/src/clock.js
function mark() {
  return process.hrtime();
}
function timeSinceInMicros(mark2) {
  const delta = process.hrtime(mark2);
  return delta[0] * 1e6 + Math.floor(delta[1] / 1e3);
}

// packages/compiler-cli/src/ngtsc/perf/src/recorder.js
var ActivePerfRecorder = class _ActivePerfRecorder {
  zeroTime;
  counters;
  phaseTime;
  bytes;
  currentPhase = PerfPhase.Unaccounted;
  currentPhaseEntered;
  /**
   * Creates an `ActivePerfRecorder` with its zero point set to the current time.
   */
  static zeroedToNow() {
    return new _ActivePerfRecorder(mark());
  }
  constructor(zeroTime) {
    this.zeroTime = zeroTime;
    this.currentPhaseEntered = this.zeroTime;
    this.counters = Array(PerfEvent.LAST).fill(0);
    this.phaseTime = Array(PerfPhase.LAST).fill(0);
    this.bytes = Array(PerfCheckpoint.LAST).fill(0);
    this.memory(PerfCheckpoint.Initial);
  }
  reset() {
    this.counters = Array(PerfEvent.LAST).fill(0);
    this.phaseTime = Array(PerfPhase.LAST).fill(0);
    this.bytes = Array(PerfCheckpoint.LAST).fill(0);
    this.zeroTime = mark();
    this.currentPhase = PerfPhase.Unaccounted;
    this.currentPhaseEntered = this.zeroTime;
  }
  memory(after) {
    this.bytes[after] = process.memoryUsage().heapUsed;
  }
  phase(phase) {
    const previous = this.currentPhase;
    this.phaseTime[this.currentPhase] += timeSinceInMicros(this.currentPhaseEntered);
    this.currentPhase = phase;
    this.currentPhaseEntered = mark();
    return previous;
  }
  inPhase(phase, fn) {
    const previousPhase = this.phase(phase);
    try {
      return fn();
    } finally {
      this.phase(previousPhase);
    }
  }
  eventCount(counter, incrementBy = 1) {
    this.counters[counter] += incrementBy;
  }
  /**
   * Return the current performance metrics as a serializable object.
   */
  finalize() {
    this.phase(PerfPhase.Unaccounted);
    const results = {
      events: {},
      phases: {},
      memory: {}
    };
    for (let i = 0; i < this.phaseTime.length; i++) {
      if (this.phaseTime[i] > 0) {
        results.phases[PerfPhase[i]] = this.phaseTime[i];
      }
    }
    for (let i = 0; i < this.phaseTime.length; i++) {
      if (this.counters[i] > 0) {
        results.events[PerfEvent[i]] = this.counters[i];
      }
    }
    for (let i = 0; i < this.bytes.length; i++) {
      if (this.bytes[i] > 0) {
        results.memory[PerfCheckpoint[i]] = this.bytes[i];
      }
    }
    return results;
  }
};
var DelegatingPerfRecorder = class {
  target;
  constructor(target) {
    this.target = target;
  }
  eventCount(counter, incrementBy) {
    this.target.eventCount(counter, incrementBy);
  }
  phase(phase) {
    return this.target.phase(phase);
  }
  inPhase(phase, fn) {
    const previousPhase = this.target.phase(phase);
    try {
      return fn();
    } finally {
      this.target.phase(previousPhase);
    }
  }
  memory(after) {
    this.target.memory(after);
  }
  reset() {
    this.target.reset();
  }
};

// packages/compiler-cli/src/ngtsc/transform/src/alias.js
import ts3 from "typescript";
function aliasTransformFactory(exportStatements) {
  return () => {
    return (file) => {
      if (ts3.isBundle(file) || !exportStatements.has(file.fileName)) {
        return file;
      }
      const statements = [...file.statements];
      exportStatements.get(file.fileName).forEach(([moduleName, symbolName], aliasName) => {
        const stmt = ts3.factory.createExportDeclaration(
          /* modifiers */
          void 0,
          /* isTypeOnly */
          false,
          /* exportClause */
          ts3.factory.createNamedExports([
            ts3.factory.createExportSpecifier(false, symbolName, aliasName)
          ]),
          /* moduleSpecifier */
          ts3.factory.createStringLiteral(moduleName)
        );
        statements.push(stmt);
      });
      return ts3.factory.updateSourceFile(file, statements);
    };
  };
}

// packages/compiler-cli/src/ngtsc/transform/src/compilation.js
import ts4 from "typescript";

// packages/compiler-cli/src/ngtsc/transform/src/trait.js
var TraitState;
(function(TraitState2) {
  TraitState2[TraitState2["Pending"] = 0] = "Pending";
  TraitState2[TraitState2["Analyzed"] = 1] = "Analyzed";
  TraitState2[TraitState2["Resolved"] = 2] = "Resolved";
  TraitState2[TraitState2["Skipped"] = 3] = "Skipped";
})(TraitState || (TraitState = {}));
var Trait = {
  pending: (handler, detected) => TraitImpl.pending(handler, detected)
};
var TraitImpl = class _TraitImpl {
  state = TraitState.Pending;
  handler;
  detected;
  analysis = null;
  symbol = null;
  resolution = null;
  analysisDiagnostics = null;
  resolveDiagnostics = null;
  typeCheckDiagnostics = null;
  constructor(handler, detected) {
    this.handler = handler;
    this.detected = detected;
  }
  toAnalyzed(analysis, diagnostics, symbol) {
    this.assertTransitionLegal(TraitState.Pending, TraitState.Analyzed);
    this.analysis = analysis;
    this.analysisDiagnostics = diagnostics;
    this.symbol = symbol;
    this.state = TraitState.Analyzed;
    return this;
  }
  toResolved(resolution, diagnostics) {
    this.assertTransitionLegal(TraitState.Analyzed, TraitState.Resolved);
    if (this.analysis === null) {
      throw new Error(`Cannot transition an Analyzed trait with a null analysis to Resolved`);
    }
    this.resolution = resolution;
    this.state = TraitState.Resolved;
    this.resolveDiagnostics = diagnostics;
    this.typeCheckDiagnostics = null;
    return this;
  }
  toSkipped() {
    this.assertTransitionLegal(TraitState.Pending, TraitState.Skipped);
    this.state = TraitState.Skipped;
    return this;
  }
  /**
   * Verifies that the trait is currently in one of the `allowedState`s.
   *
   * If correctly used, the `Trait` type and transition methods prevent illegal transitions from
   * occurring. However, if a reference to the `TraitImpl` instance typed with the previous
   * interface is retained after calling one of its transition methods, it will allow for illegal
   * transitions to take place. Hence, this assertion provides a little extra runtime protection.
   */
  assertTransitionLegal(allowedState, transitionTo) {
    if (!(this.state === allowedState)) {
      throw new Error(`Assertion failure: cannot transition from ${TraitState[this.state]} to ${TraitState[transitionTo]}.`);
    }
  }
  /**
   * Construct a new `TraitImpl` in the pending state.
   */
  static pending(handler, detected) {
    return new _TraitImpl(handler, detected);
  }
};

// packages/compiler-cli/src/ngtsc/transform/src/compilation.js
var TraitCompiler = class {
  handlers;
  reflector;
  perf;
  incrementalBuild;
  compileNonExportedClasses;
  compilationMode;
  dtsTransforms;
  semanticDepGraphUpdater;
  sourceFileTypeIdentifier;
  emitDeclarationOnly;
  emitIntermediateTs;
  /**
   * Maps class declarations to their `ClassRecord`, which tracks the Ivy traits being applied to
   * those classes.
   */
  classes = /* @__PURE__ */ new Map();
  /**
   * Maps source files to any class declaration(s) within them which have been discovered to contain
   * Ivy traits.
   */
  fileToClasses = /* @__PURE__ */ new Map();
  /**
   * Tracks which source files have been analyzed but did not contain any traits. This set allows
   * the compiler to skip analyzing these files in an incremental rebuild.
   */
  filesWithoutTraits = /* @__PURE__ */ new Set();
  reexportMap = /* @__PURE__ */ new Map();
  handlersByName = /* @__PURE__ */ new Map();
  constructor(handlers, reflector, perf, incrementalBuild, compileNonExportedClasses, compilationMode, dtsTransforms, semanticDepGraphUpdater, sourceFileTypeIdentifier, emitDeclarationOnly, emitIntermediateTs) {
    this.handlers = handlers;
    this.reflector = reflector;
    this.perf = perf;
    this.incrementalBuild = incrementalBuild;
    this.compileNonExportedClasses = compileNonExportedClasses;
    this.compilationMode = compilationMode;
    this.dtsTransforms = dtsTransforms;
    this.semanticDepGraphUpdater = semanticDepGraphUpdater;
    this.sourceFileTypeIdentifier = sourceFileTypeIdentifier;
    this.emitDeclarationOnly = emitDeclarationOnly;
    this.emitIntermediateTs = emitIntermediateTs;
    for (const handler of handlers) {
      this.handlersByName.set(handler.name, handler);
    }
  }
  analyzeSync(sf) {
    this.analyze(sf, false);
  }
  analyzeAsync(sf) {
    return this.analyze(sf, true);
  }
  analyze(sf, preanalyze) {
    if (sf.isDeclarationFile || this.sourceFileTypeIdentifier.isShim(sf) || this.sourceFileTypeIdentifier.isResource(sf)) {
      return void 0;
    }
    const promises = [];
    const priorWork = this.compilationMode !== CompilationMode.LOCAL ? this.incrementalBuild.priorAnalysisFor(sf) : null;
    if (priorWork !== null) {
      this.perf.eventCount(PerfEvent.SourceFileReuseAnalysis);
      if (priorWork.length > 0) {
        for (const priorRecord of priorWork) {
          this.adopt(priorRecord);
        }
        this.perf.eventCount(PerfEvent.TraitReuseAnalysis, priorWork.length);
      } else {
        this.filesWithoutTraits.add(sf);
      }
      return;
    }
    const visit2 = (node) => {
      if (this.reflector.isClass(node)) {
        this.analyzeClass(node, preanalyze ? promises : null);
      }
      ts4.forEachChild(node, visit2);
    };
    visit2(sf);
    if (!this.fileToClasses.has(sf)) {
      this.filesWithoutTraits.add(sf);
    }
    if (preanalyze && promises.length > 0) {
      return Promise.all(promises).then(() => void 0);
    } else {
      return void 0;
    }
  }
  recordFor(clazz) {
    if (this.classes.has(clazz)) {
      return this.classes.get(clazz);
    } else {
      return null;
    }
  }
  getAnalyzedRecords() {
    const result = /* @__PURE__ */ new Map();
    for (const [sf, classes] of this.fileToClasses) {
      const records = [];
      for (const clazz of classes) {
        records.push(this.classes.get(clazz));
      }
      result.set(sf, records);
    }
    for (const sf of this.filesWithoutTraits) {
      result.set(sf, []);
    }
    return result;
  }
  /**
   * Import a `ClassRecord` from a previous compilation (only to be used in global compilation
   * modes)
   *
   * Traits from the `ClassRecord` have accurate metadata, but the `handler` is from the old program
   * and needs to be updated (matching is done by name). A new pending trait is created and then
   * transitioned to analyzed using the previous analysis. If the trait is in the errored state,
   * instead the errors are copied over.
   */
  adopt(priorRecord) {
    const record = {
      hasPrimaryHandler: priorRecord.hasPrimaryHandler,
      hasWeakHandlers: priorRecord.hasWeakHandlers,
      metaDiagnostics: priorRecord.metaDiagnostics,
      node: priorRecord.node,
      traits: []
    };
    for (const priorTrait of priorRecord.traits) {
      const handler = this.handlersByName.get(priorTrait.handler.name);
      let trait = Trait.pending(handler, priorTrait.detected);
      if (priorTrait.state === TraitState.Analyzed || priorTrait.state === TraitState.Resolved) {
        const symbol = this.makeSymbolForTrait(handler, record.node, priorTrait.analysis);
        trait = trait.toAnalyzed(priorTrait.analysis, priorTrait.analysisDiagnostics, symbol);
        if (trait.analysis !== null && trait.handler.register !== void 0) {
          trait.handler.register(record.node, trait.analysis);
        }
      } else if (priorTrait.state === TraitState.Skipped) {
        trait = trait.toSkipped();
      }
      record.traits.push(trait);
    }
    this.classes.set(record.node, record);
    const sf = record.node.getSourceFile();
    if (!this.fileToClasses.has(sf)) {
      this.fileToClasses.set(sf, /* @__PURE__ */ new Set());
    }
    this.fileToClasses.get(sf).add(record.node);
  }
  scanClassForTraits(clazz) {
    const decorators = this.reflector.getDecoratorsOfDeclaration(clazz);
    return this.detectTraits(clazz, decorators);
  }
  detectTraits(clazz, decorators) {
    let record = this.recordFor(clazz);
    let foundTraits = [];
    const nonNgDecoratorsInLocalMode = this.compilationMode === CompilationMode.LOCAL ? new Set(decorators) : null;
    for (const handler of this.handlers) {
      const result = handler.detect(clazz, decorators);
      if (result === void 0) {
        continue;
      }
      if (nonNgDecoratorsInLocalMode !== null && result.decorator !== null) {
        nonNgDecoratorsInLocalMode.delete(result.decorator);
      }
      const isPrimaryHandler = handler.precedence === HandlerPrecedence.PRIMARY;
      const isWeakHandler = handler.precedence === HandlerPrecedence.WEAK;
      const trait = Trait.pending(handler, result);
      foundTraits.push(trait);
      if (record === null) {
        record = {
          node: clazz,
          traits: [trait],
          metaDiagnostics: null,
          hasPrimaryHandler: isPrimaryHandler,
          hasWeakHandlers: isWeakHandler
        };
        this.classes.set(clazz, record);
        const sf = clazz.getSourceFile();
        if (!this.fileToClasses.has(sf)) {
          this.fileToClasses.set(sf, /* @__PURE__ */ new Set());
        }
        this.fileToClasses.get(sf).add(clazz);
      } else {
        if (!isWeakHandler && record.hasWeakHandlers) {
          record.traits = record.traits.filter((field) => field.handler.precedence !== HandlerPrecedence.WEAK);
          record.hasWeakHandlers = false;
        } else if (isWeakHandler && !record.hasWeakHandlers) {
          continue;
        }
        if (isPrimaryHandler && record.hasPrimaryHandler) {
          record.metaDiagnostics = [
            {
              category: ts4.DiagnosticCategory.Error,
              code: Number("-99" + ErrorCode.DECORATOR_COLLISION),
              file: getSourceFile(clazz),
              start: clazz.getStart(void 0, false),
              length: clazz.getWidth(),
              messageText: "Two incompatible decorators on class"
            }
          ];
          record.traits = foundTraits = [];
          break;
        }
        record.traits.push(trait);
        record.hasPrimaryHandler = record.hasPrimaryHandler || isPrimaryHandler;
      }
    }
    if (nonNgDecoratorsInLocalMode !== null && nonNgDecoratorsInLocalMode.size > 0 && record !== null && record.metaDiagnostics === null) {
      const compilationModeName = this.emitDeclarationOnly ? "experimental declaration-only emission" : "local compilation";
      record.metaDiagnostics = [...nonNgDecoratorsInLocalMode].map((decorator) => ({
        category: ts4.DiagnosticCategory.Error,
        code: Number("-99" + ErrorCode.DECORATOR_UNEXPECTED),
        file: getSourceFile(clazz),
        start: decorator.node.getStart(),
        length: decorator.node.getWidth(),
        messageText: `In ${compilationModeName} mode, Angular does not support custom decorators. Ensure all class decorators are from Angular.`
      }));
      record.traits = foundTraits = [];
    }
    return foundTraits.length > 0 ? foundTraits : null;
  }
  makeSymbolForTrait(handler, decl, analysis) {
    if (analysis === null) {
      return null;
    }
    const symbol = handler.symbol(decl, analysis);
    if (symbol !== null && this.semanticDepGraphUpdater !== null) {
      const isPrimary = handler.precedence === HandlerPrecedence.PRIMARY;
      if (!isPrimary) {
        throw new Error(`AssertionError: ${handler.name} returned a symbol but is not a primary handler.`);
      }
      this.semanticDepGraphUpdater.registerSymbol(symbol);
    }
    return symbol;
  }
  analyzeClass(clazz, preanalyzeQueue) {
    const traits = this.scanClassForTraits(clazz);
    if (traits === null) {
      return;
    }
    for (const trait of traits) {
      const analyze = () => this.analyzeTrait(clazz, trait);
      let preanalysis = null;
      if (preanalyzeQueue !== null && trait.handler.preanalyze !== void 0) {
        try {
          preanalysis = trait.handler.preanalyze(clazz, trait.detected.metadata) || null;
        } catch (err) {
          if (err instanceof FatalDiagnosticError) {
            trait.toAnalyzed(null, [err.toDiagnostic()], null);
            return;
          } else {
            throw err;
          }
        }
      }
      if (preanalysis !== null) {
        preanalyzeQueue.push(preanalysis.then(analyze));
      } else {
        analyze();
      }
    }
  }
  analyzeTrait(clazz, trait) {
    if (trait.state !== TraitState.Pending) {
      throw new Error(`Attempt to analyze trait of ${clazz.name.text} in state ${TraitState[trait.state]} (expected DETECTED)`);
    }
    this.perf.eventCount(PerfEvent.TraitAnalyze);
    let result;
    try {
      result = trait.handler.analyze(clazz, trait.detected.metadata);
    } catch (err) {
      if (err instanceof FatalDiagnosticError) {
        trait.toAnalyzed(null, [err.toDiagnostic()], null);
        return;
      } else {
        throw err;
      }
    }
    const symbol = this.makeSymbolForTrait(trait.handler, clazz, result.analysis ?? null);
    const isStaticallyExported = this.reflector.isStaticallyExported(clazz);
    const isStandalone = result.analysis?.meta?.isStandalone ?? false;
    const shouldSkipResolution = !isStaticallyExported && !this.compileNonExportedClasses && !isStandalone;
    let analysisResult = result.analysis ?? null;
    if (shouldSkipResolution) {
      analysisResult = null;
    } else if (result.analysis !== void 0 && trait.handler.register !== void 0) {
      trait.handler.register(clazz, result.analysis);
    }
    trait = trait.toAnalyzed(analysisResult, result.diagnostics ?? null, symbol);
  }
  resolve() {
    const classes = this.classes.keys();
    for (const clazz of classes) {
      const record = this.classes.get(clazz);
      for (let trait of record.traits) {
        const handler = trait.handler;
        switch (trait.state) {
          case TraitState.Skipped:
            continue;
          case TraitState.Pending:
            throw new Error(`Resolving a trait that hasn't been analyzed: ${clazz.name.text} / ${trait.handler.name}`);
          case TraitState.Resolved:
            throw new Error(`Resolving an already resolved trait`);
        }
        if (trait.analysis === null) {
          continue;
        }
        if (handler.resolve === void 0) {
          trait = trait.toResolved(null, null);
          continue;
        }
        let result;
        try {
          result = handler.resolve(clazz, trait.analysis, trait.symbol);
        } catch (err) {
          if (err instanceof FatalDiagnosticError) {
            trait = trait.toResolved(null, [err.toDiagnostic()]);
            continue;
          } else {
            throw err;
          }
        }
        trait = trait.toResolved(result.data ?? null, result.diagnostics ?? null);
        if (result.reexports !== void 0) {
          const fileName = clazz.getSourceFile().fileName;
          if (!this.reexportMap.has(fileName)) {
            this.reexportMap.set(fileName, /* @__PURE__ */ new Map());
          }
          const fileReexports = this.reexportMap.get(fileName);
          for (const reexport of result.reexports) {
            fileReexports.set(reexport.asAlias, [reexport.fromModule, reexport.symbolName]);
          }
        }
      }
    }
  }
  /**
   * Generate type-checking code into the `TypeCheckContext` for any components within the given
   * `ts.SourceFile`.
   */
  typeCheck(sf, ctx) {
    if (!this.fileToClasses.has(sf) || this.compilationMode === CompilationMode.LOCAL) {
      return;
    }
    for (const clazz of this.fileToClasses.get(sf)) {
      const record = this.classes.get(clazz);
      for (const trait of record.traits) {
        if (trait.state !== TraitState.Resolved) {
          continue;
        } else if (trait.handler.typeCheck === void 0) {
          continue;
        }
        if (trait.resolution !== null) {
          trait.handler.typeCheck(ctx, clazz, trait.analysis, trait.resolution);
        }
      }
    }
  }
  runAdditionalChecks(sf, check) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      return [];
    }
    const classes = this.fileToClasses.get(sf);
    if (classes === void 0) {
      return [];
    }
    const diagnostics = [];
    for (const clazz of classes) {
      if (!isNamedClassDeclaration(clazz)) {
        continue;
      }
      const record = this.classes.get(clazz);
      for (const trait of record.traits) {
        const result = check(clazz, trait.handler);
        if (result !== null) {
          diagnostics.push(...result);
        }
      }
    }
    return diagnostics;
  }
  index(ctx) {
    for (const clazz of this.classes.keys()) {
      const record = this.classes.get(clazz);
      for (const trait of record.traits) {
        if (trait.state !== TraitState.Resolved) {
          continue;
        } else if (trait.handler.index === void 0) {
          continue;
        }
        if (trait.resolution !== null) {
          trait.handler.index(ctx, clazz, trait.analysis, trait.resolution);
        }
      }
    }
  }
  xi18n(bundle) {
    for (const clazz of this.classes.keys()) {
      const record = this.classes.get(clazz);
      for (const trait of record.traits) {
        if (trait.state !== TraitState.Analyzed && trait.state !== TraitState.Resolved) {
          continue;
        } else if (trait.handler.xi18n === void 0) {
          continue;
        }
        if (trait.analysis !== null) {
          trait.handler.xi18n(bundle, clazz, trait.analysis);
        }
      }
    }
  }
  updateResources(clazz) {
    if (this.compilationMode === CompilationMode.LOCAL || !this.reflector.isClass(clazz) || !this.classes.has(clazz)) {
      return;
    }
    const record = this.classes.get(clazz);
    for (const trait of record.traits) {
      if (trait.state !== TraitState.Resolved || trait.handler.updateResources === void 0) {
        continue;
      }
      trait.handler.updateResources(clazz, trait.analysis, trait.resolution);
    }
  }
  compile(clazz, constantPool) {
    const original = ts4.getOriginalNode(clazz);
    if (!this.reflector.isClass(clazz) || !this.reflector.isClass(original) || !this.classes.has(original)) {
      return null;
    }
    const record = this.classes.get(original);
    let res = [];
    for (const trait of record.traits) {
      let compileRes;
      if (trait.state !== TraitState.Resolved || containsErrors(trait.analysisDiagnostics) || containsErrors(trait.resolveDiagnostics)) {
        continue;
      }
      if (this.compilationMode === CompilationMode.LOCAL) {
        compileRes = trait.handler.compileLocal(clazz, trait.analysis, trait.resolution, constantPool);
      } else {
        if (this.compilationMode === CompilationMode.PARTIAL && trait.handler.compilePartial !== void 0) {
          compileRes = trait.handler.compilePartial(clazz, trait.analysis, trait.resolution);
        } else {
          compileRes = trait.handler.compileFull(clazz, trait.analysis, trait.resolution, constantPool);
        }
      }
      const compileMatchRes = compileRes;
      if (Array.isArray(compileMatchRes)) {
        for (const result of compileMatchRes) {
          if (!res.some((r) => r.name === result.name)) {
            res.push(result);
          }
        }
      } else if (!res.some((result) => result.name === compileMatchRes.name)) {
        res.push(compileMatchRes);
      }
    }
    this.dtsTransforms.getIvyDeclarationTransform(original.getSourceFile()).addFields(original, res);
    return res.length > 0 ? res : null;
  }
  compileHmrUpdateCallback(clazz) {
    const original = ts4.getOriginalNode(clazz);
    if (!this.reflector.isClass(clazz) || !this.reflector.isClass(original) || !this.classes.has(original)) {
      return null;
    }
    const record = this.classes.get(original);
    for (const trait of record.traits) {
      if (trait.state === TraitState.Resolved && trait.handler.compileHmrUpdateDeclaration !== void 0 && !containsErrors(trait.analysisDiagnostics) && !containsErrors(trait.resolveDiagnostics)) {
        return trait.handler.compileHmrUpdateDeclaration(clazz, trait.analysis, trait.resolution);
      }
    }
    return null;
  }
  decoratorsFor(node) {
    const original = ts4.getOriginalNode(node);
    if (!this.reflector.isClass(original) || !this.classes.has(original)) {
      return [];
    }
    const record = this.classes.get(original);
    const decorators = [];
    for (const trait of record.traits) {
      if (this.compilationMode !== CompilationMode.LOCAL && trait.state !== TraitState.Resolved) {
        continue;
      }
      if (trait.detected.trigger !== null && ts4.isDecorator(trait.detected.trigger)) {
        decorators.push(trait.detected.trigger);
      }
    }
    return decorators;
  }
  get diagnostics() {
    const diagnostics = [];
    for (const clazz of this.classes.keys()) {
      const record = this.classes.get(clazz);
      if (record.metaDiagnostics !== null) {
        diagnostics.push(...record.metaDiagnostics);
      }
      for (const trait of record.traits) {
        if ((trait.state === TraitState.Analyzed || trait.state === TraitState.Resolved) && trait.analysisDiagnostics !== null) {
          diagnostics.push(...trait.analysisDiagnostics);
        }
        if (trait.state === TraitState.Resolved) {
          diagnostics.push(...trait.resolveDiagnostics ?? []);
        }
      }
    }
    return diagnostics;
  }
  get exportStatements() {
    return this.reexportMap;
  }
};
function containsErrors(diagnostics) {
  return diagnostics !== null && diagnostics.some((diag) => diag.category === ts4.DiagnosticCategory.Error);
}

// packages/compiler-cli/src/ngtsc/transform/src/declaration.js
import { isUnsafeObjectKey } from "@angular/compiler";
import ts5 from "typescript";
var DtsTransformRegistry = class {
  ivyDeclarationTransforms = /* @__PURE__ */ new Map();
  getIvyDeclarationTransform(sf) {
    if (!this.ivyDeclarationTransforms.has(sf)) {
      this.ivyDeclarationTransforms.set(sf, new IvyDeclarationDtsTransform());
    }
    return this.ivyDeclarationTransforms.get(sf);
  }
  /**
   * Gets the dts transforms to be applied for the given source file, or `null` if no transform is
   * necessary.
   */
  getAllTransforms(sf) {
    if (!sf.isDeclarationFile) {
      return null;
    }
    const originalSf = ts5.getOriginalNode(sf);
    let transforms = null;
    if (this.ivyDeclarationTransforms.has(originalSf)) {
      transforms = [];
      transforms.push(this.ivyDeclarationTransforms.get(originalSf));
    }
    return transforms;
  }
};
function declarationTransformFactory(transformRegistry, reflector, refEmitter, importRewriter) {
  return (context) => {
    const transformer = new DtsTransformer(context, reflector, refEmitter, importRewriter);
    return (fileOrBundle) => {
      if (ts5.isBundle(fileOrBundle)) {
        return fileOrBundle;
      }
      const transforms = transformRegistry.getAllTransforms(fileOrBundle);
      if (transforms === null) {
        return fileOrBundle;
      }
      return transformer.transform(fileOrBundle, transforms);
    };
  };
}
var DtsTransformer = class {
  ctx;
  reflector;
  refEmitter;
  importRewriter;
  constructor(ctx, reflector, refEmitter, importRewriter) {
    this.ctx = ctx;
    this.reflector = reflector;
    this.refEmitter = refEmitter;
    this.importRewriter = importRewriter;
  }
  /**
   * Transform the declaration file and add any declarations which were recorded.
   */
  transform(sf, transforms) {
    const imports = new ImportManager({
      ...presetImportManagerForceNamespaceImports,
      rewriter: this.importRewriter
    });
    const visitor = (node) => {
      if (ts5.isClassDeclaration(node)) {
        return this.transformClassDeclaration(node, transforms, imports);
      } else {
        return ts5.visitEachChild(node, visitor, this.ctx);
      }
    };
    sf = ts5.visitNode(sf, visitor, ts5.isSourceFile) || sf;
    return imports.transformTsFile(this.ctx, sf);
  }
  transformClassDeclaration(clazz, transforms, imports) {
    let newClazz = clazz;
    for (const transform of transforms) {
      if (transform.transformClass !== void 0) {
        newClazz = transform.transformClass(newClazz, newClazz.members, this.reflector, this.refEmitter, imports);
      }
    }
    return newClazz;
  }
};
var IvyDeclarationDtsTransform = class {
  declarationFields = /* @__PURE__ */ new Map();
  addFields(decl, fields) {
    this.declarationFields.set(decl, fields);
  }
  transformClass(clazz, members, reflector, refEmitter, imports) {
    const original = ts5.getOriginalNode(clazz);
    if (!this.declarationFields.has(original)) {
      return clazz;
    }
    const fields = this.declarationFields.get(original);
    const newMembers = fields.map((decl) => {
      const modifiers = [ts5.factory.createModifier(ts5.SyntaxKind.StaticKeyword)];
      const typeRef = translateType(decl.type, original.getSourceFile(), reflector, refEmitter, imports);
      markForEmitAsSingleLine(typeRef);
      return ts5.factory.createPropertyDeclaration(
        /* modifiers */
        modifiers,
        /* name */
        isUnsafeObjectKey(decl.name) ? ts5.factory.createStringLiteral(decl.name) : decl.name,
        /* questionOrExclamationToken */
        void 0,
        /* type */
        typeRef,
        /* initializer */
        void 0
      );
    });
    return ts5.factory.updateClassDeclaration(
      /* node */
      clazz,
      /* modifiers */
      clazz.modifiers,
      /* name */
      clazz.name,
      /* typeParameters */
      clazz.typeParameters,
      /* heritageClauses */
      clazz.heritageClauses,
      /* members */
      [...members, ...newMembers]
    );
  }
};
function markForEmitAsSingleLine(node) {
  ts5.setEmitFlags(node, ts5.EmitFlags.SingleLine);
  ts5.forEachChild(node, markForEmitAsSingleLine);
}

// packages/compiler-cli/src/ngtsc/transform/src/transform.js
import { ConstantPool, isUnsafeObjectKey as isUnsafeObjectKey2 } from "@angular/compiler";
import ts7 from "typescript";

// packages/compiler-cli/src/ngtsc/util/src/visitor.js
import ts6 from "typescript";
function visit(node, visitor, context) {
  return visitor._visit(node, context);
}
var Visitor = class {
  /**
   * Maps statements to an array of statements that should be inserted before them.
   */
  _before = /* @__PURE__ */ new Map();
  /**
   * Maps statements to an array of statements that should be inserted after them.
   */
  _after = /* @__PURE__ */ new Map();
  _visitListEntryNode(node, visitor) {
    const result = visitor(node);
    if (result.before !== void 0) {
      this._before.set(result.node, result.before);
    }
    if (result.after !== void 0) {
      this._after.set(result.node, result.after);
    }
    return result.node;
  }
  /**
   * Visit types of nodes which don't have their own explicit visitor.
   */
  visitOtherNode(node) {
    return node;
  }
  /**
   * @internal
   */
  _visit(node, context) {
    let visitedNode = null;
    node = ts6.visitEachChild(node, (child) => child && this._visit(child, context), context);
    if (ts6.isClassDeclaration(node)) {
      visitedNode = this._visitListEntryNode(node, (node2) => this.visitClassDeclaration(node2));
    } else {
      visitedNode = this.visitOtherNode(node);
    }
    if (visitedNode && (ts6.isBlock(visitedNode) || ts6.isSourceFile(visitedNode))) {
      visitedNode = this._maybeProcessStatements(visitedNode);
    }
    return visitedNode;
  }
  _maybeProcessStatements(node) {
    if (node.statements.every((stmt) => !this._before.has(stmt) && !this._after.has(stmt))) {
      return node;
    }
    const newStatements = [];
    node.statements.forEach((stmt) => {
      if (this._before.has(stmt)) {
        newStatements.push(...this._before.get(stmt));
        this._before.delete(stmt);
      }
      newStatements.push(stmt);
      if (this._after.has(stmt)) {
        newStatements.push(...this._after.get(stmt));
        this._after.delete(stmt);
      }
    });
    const statementsArray = ts6.factory.createNodeArray(newStatements, node.statements.hasTrailingComma);
    if (ts6.isBlock(node)) {
      return ts6.factory.updateBlock(node, statementsArray);
    } else {
      return ts6.factory.updateSourceFile(node, statementsArray, node.isDeclarationFile, node.referencedFiles, node.typeReferenceDirectives, node.hasNoDefaultLib, node.libReferenceDirectives);
    }
  }
};

// packages/compiler-cli/src/ngtsc/transform/src/transform.js
var NO_DECORATORS = /* @__PURE__ */ new Set();
var CLOSURE_FILE_OVERVIEW_REGEXP = /\s+@fileoverview\s+/i;
function ivyTransformFactory(compilation, reflector, importRewriter, defaultImportTracker, localCompilationExtraImportsTracker, perf, isCore, isClosureCompilerEnabled, emitDeclarationOnly, refEmitter, enableTypeReification) {
  const recordWrappedNode = createRecorderFn(defaultImportTracker);
  return (context) => {
    return (file) => {
      return perf.inPhase(PerfPhase.Compile, () => transformIvySourceFile(compilation, context, reflector, importRewriter, localCompilationExtraImportsTracker, file, isCore, isClosureCompilerEnabled, emitDeclarationOnly, refEmitter, enableTypeReification, recordWrappedNode));
    };
  };
}
var IvyCompilationVisitor = class extends Visitor {
  compilation;
  constantPool;
  classCompilationMap = /* @__PURE__ */ new Map();
  deferrableImports = /* @__PURE__ */ new Set();
  constructor(compilation, constantPool) {
    super();
    this.compilation = compilation;
    this.constantPool = constantPool;
  }
  visitClassDeclaration(node) {
    const result = this.compilation.compile(node, this.constantPool);
    if (result !== null) {
      this.classCompilationMap.set(node, result);
      for (const classResult of result) {
        if (classResult.deferrableImports !== null && classResult.deferrableImports.size > 0) {
          classResult.deferrableImports.forEach((importDecl) => this.deferrableImports.add(importDecl));
        }
      }
    }
    return { node };
  }
};
var IvyTransformationVisitor = class extends Visitor {
  compilation;
  classCompilationMap;
  reflector;
  importManager;
  recordWrappedNodeExpr;
  isClosureCompilerEnabled;
  isCore;
  deferrableImports;
  refEmitter;
  enableTypeReification;
  constructor(compilation, classCompilationMap, reflector, importManager, recordWrappedNodeExpr, isClosureCompilerEnabled, isCore, deferrableImports, refEmitter, enableTypeReification) {
    super();
    this.compilation = compilation;
    this.classCompilationMap = classCompilationMap;
    this.reflector = reflector;
    this.importManager = importManager;
    this.recordWrappedNodeExpr = recordWrappedNodeExpr;
    this.isClosureCompilerEnabled = isClosureCompilerEnabled;
    this.isCore = isCore;
    this.deferrableImports = deferrableImports;
    this.refEmitter = refEmitter;
    this.enableTypeReification = enableTypeReification;
  }
  visitClassDeclaration(node) {
    const original = ts7.getOriginalNode(node, ts7.isClassDeclaration);
    const compileResults2 = this.classCompilationMap.get(node) ?? this.classCompilationMap.get(original);
    if (!compileResults2) {
      return { node };
    }
    const translateOptions = {
      recordWrappedNode: this.recordWrappedNodeExpr,
      annotateForClosureCompiler: this.isClosureCompilerEnabled
    };
    const statements = [];
    const members = [...node.members];
    const sourceFile = original.getSourceFile();
    for (const field of compileResults2) {
      if (field.initializer === null) {
        continue;
      }
      const exprNode = translateExpression(sourceFile, field.initializer, this.importManager, translateOptions);
      let typeNode = void 0;
      if (this.enableTypeReification && this.refEmitter !== null) {
        typeNode = translateType(field.type, sourceFile, this.reflector, this.refEmitter, this.importManager);
      }
      const property = ts7.factory.createPropertyDeclaration([ts7.factory.createToken(ts7.SyntaxKind.StaticKeyword)], isUnsafeObjectKey2(field.name) ? ts7.factory.createStringLiteral(field.name) : field.name, void 0, typeNode, exprNode);
      if (this.isClosureCompilerEnabled) {
        ts7.addSyntheticLeadingComment(
          property,
          ts7.SyntaxKind.MultiLineCommentTrivia,
          "* @nocollapse ",
          /* hasTrailingNewLine */
          false
        );
      }
      field.statements.map((stmt) => translateStatement(sourceFile, stmt, this.importManager, translateOptions)).forEach((stmt) => statements.push(stmt));
      members.push(property);
    }
    const filteredDecorators = (
      // Remove the decorator which triggered this compilation, leaving the others alone.
      maybeFilterDecorator(ts7.getDecorators(node), this.compilation.decoratorsFor(node))
    );
    const nodeModifiers = ts7.getModifiers(node);
    let updatedModifiers;
    if (filteredDecorators?.length || nodeModifiers?.length) {
      updatedModifiers = [...filteredDecorators || [], ...nodeModifiers || []];
    }
    node = ts7.factory.updateClassDeclaration(
      node,
      updatedModifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses || [],
      // Map over the class members and remove any Angular decorators from them.
      members.map((member) => this._stripAngularDecorators(member))
    );
    return { node, after: statements };
  }
  visitOtherNode(node) {
    if (ts7.isImportDeclaration(node) && this.deferrableImports.has(node)) {
      return null;
    }
    return node;
  }
  /**
   * Return all decorators on a `Declaration` which are from @angular/core, or an empty set if none
   * are.
   */
  _angularCoreDecorators(decl) {
    const decorators = this.reflector.getDecoratorsOfDeclaration(decl);
    if (decorators === null) {
      return NO_DECORATORS;
    }
    const coreDecorators = decorators.filter((dec) => this.isCore || isFromAngularCore(dec)).map((dec) => dec.node);
    if (coreDecorators.length > 0) {
      return new Set(coreDecorators);
    } else {
      return NO_DECORATORS;
    }
  }
  _nonCoreDecoratorsOnly(node) {
    const decorators = ts7.getDecorators(node);
    if (decorators === void 0) {
      return void 0;
    }
    const coreDecorators = this._angularCoreDecorators(node);
    return decorators.filter((dec) => !coreDecorators.has(dec));
  }
  /**
   * Remove Angular decorators from a `ts.Node` in a shallow manner.
   *
   * This will remove decorators from class elements (getters, setters, properties, methods) as well
   * as parameters of constructors.
   */
  _stripAngularDecorators(node) {
    const modifiers = ts7.canHaveModifiers(node) ? ts7.getModifiers(node) : void 0;
    if (ts7.isConstructorDeclaration(node)) {
      const parameters = node.parameters.map((param) => this._stripAngularDecorators(param));
      node = ts7.factory.updateConstructorDeclaration(node, modifiers, parameters, node.body);
    }
    if (!ts7.canHaveDecorators(node)) {
      return node;
    }
    const nonCoreDecorators = this._nonCoreDecoratorsOnly(node);
    if (nonCoreDecorators === void 0) {
      return node;
    }
    const combinedModifiers = [...nonCoreDecorators, ...modifiers ?? []];
    return ts7.factory.replaceDecoratorsAndModifiers(node, combinedModifiers);
  }
};
function transformIvySourceFile(compilation, context, reflector, importRewriter, localCompilationExtraImportsTracker, file, isCore, isClosureCompilerEnabled, emitDeclarationOnly, refEmitter, enableTypeReification, recordWrappedNode) {
  const constantPool = new ConstantPool(isClosureCompilerEnabled);
  const importManager = new ImportManager({
    ...presetImportManagerForceNamespaceImports,
    rewriter: importRewriter
  });
  const compilationVisitor = new IvyCompilationVisitor(compilation, constantPool);
  visit(file, compilationVisitor, context);
  if (emitDeclarationOnly) {
    return file;
  }
  const transformationVisitor = new IvyTransformationVisitor(compilation, compilationVisitor.classCompilationMap, reflector, importManager, recordWrappedNode, isClosureCompilerEnabled, isCore, compilationVisitor.deferrableImports, refEmitter, enableTypeReification);
  let sf = visit(file, transformationVisitor, context);
  const downlevelTranslatedCode = getLocalizeCompileTarget(context) < ts7.ScriptTarget.ES2015;
  const constants = constantPool.statements.map((stmt) => translateStatement(file, stmt, importManager, {
    recordWrappedNode,
    downlevelTaggedTemplates: downlevelTranslatedCode,
    downlevelVariableDeclarations: downlevelTranslatedCode,
    annotateForClosureCompiler: isClosureCompilerEnabled
  }));
  const fileOverviewMeta = isClosureCompilerEnabled ? getFileOverviewComment(sf.statements) : null;
  if (localCompilationExtraImportsTracker !== null) {
    for (const moduleName of localCompilationExtraImportsTracker.getImportsForFile(sf)) {
      importManager.addSideEffectImport(sf, moduleName);
    }
  }
  sf = importManager.transformTsFile(context, sf, constants);
  if (fileOverviewMeta !== null) {
    sf = insertFileOverviewComment(sf, fileOverviewMeta);
  }
  return sf;
}
function getLocalizeCompileTarget(context) {
  const target = context.getCompilerOptions().target || ts7.ScriptTarget.ES2015;
  return target !== ts7.ScriptTarget.JSON ? target : ts7.ScriptTarget.ES2015;
}
function getFileOverviewComment(statements) {
  if (statements.length > 0) {
    const host = statements[0];
    let trailing = false;
    let comments = ts7.getSyntheticLeadingComments(host);
    if (!comments || comments.length === 0) {
      trailing = true;
      comments = ts7.getSyntheticTrailingComments(host);
    }
    if (comments && comments.length > 0 && CLOSURE_FILE_OVERVIEW_REGEXP.test(comments[0].text)) {
      return { comments, host, trailing };
    }
  }
  return null;
}
function insertFileOverviewComment(sf, fileoverview) {
  const { comments, host, trailing } = fileoverview;
  if (sf.statements.length > 0 && host !== sf.statements[0]) {
    if (trailing) {
      ts7.setSyntheticTrailingComments(host, void 0);
    } else {
      ts7.setSyntheticLeadingComments(host, void 0);
    }
    const commentNode = ts7.factory.createNotEmittedStatement(sf);
    ts7.setSyntheticLeadingComments(commentNode, comments);
    return ts7.factory.updateSourceFile(sf, [commentNode, ...sf.statements], sf.isDeclarationFile, sf.referencedFiles, sf.typeReferenceDirectives, sf.hasNoDefaultLib, sf.libReferenceDirectives);
  }
  return sf;
}
function maybeFilterDecorator(decorators, toRemove) {
  if (decorators === void 0) {
    return void 0;
  }
  const filtered = decorators.filter((dec) => toRemove.find((decToRemove) => ts7.getOriginalNode(dec) === decToRemove) === void 0);
  if (filtered.length === 0) {
    return void 0;
  }
  return ts7.factory.createNodeArray(filtered);
}
function isFromAngularCore(decorator) {
  return decorator.import !== null && decorator.import.from === "@angular/core";
}
function createRecorderFn(defaultImportTracker) {
  return (node) => {
    const importDecl = getDefaultImportDeclaration(node);
    if (importDecl !== null) {
      defaultImportTracker.recordUsedImport(importDecl);
    }
  };
}

// packages/compiler-cli/src/ngtsc/transform/src/implicit_signal_debug_name_transform.js
import ts8 from "typescript";
function insertDebugNameIntoCallExpression(node, debugName) {
  const isRequiredInput = isRequiredInputFunction(node.expression);
  const hasNoArgs = node.arguments.length === 0;
  const configPosition = hasNoArgs || isSignalWithObjectOnlyDefinition(node) || isRequiredInput ? 0 : 1;
  const existingArg = configPosition >= node.arguments.length ? null : node.arguments[configPosition];
  if (existingArg !== null && (!ts8.isObjectLiteralExpression(existingArg) || existingArg.properties.some((prop) => ts8.isPropertyAssignment(prop) && ts8.isIdentifier(prop.name) && prop.name.text === "debugName"))) {
    return node;
  }
  const debugNameProperty = ts8.factory.createPropertyAssignment("debugName", ts8.factory.createStringLiteral(debugName));
  let newArgs;
  if (existingArg !== null) {
    const transformedArg = ts8.factory.createObjectLiteralExpression([
      ts8.factory.createSpreadAssignment(createNgDevModeConditional(ts8.factory.createObjectLiteralExpression([debugNameProperty]), ts8.factory.createObjectLiteralExpression())),
      ...existingArg.properties
    ]);
    newArgs = node.arguments.map((arg) => arg === existingArg ? transformedArg : arg);
  } else {
    const spreadArgs = [];
    if (hasNoArgs && !isRequiredInput) {
      spreadArgs.push(ts8.factory.createIdentifier("undefined"));
    }
    spreadArgs.push(ts8.factory.createObjectLiteralExpression([debugNameProperty]));
    const spread = ts8.factory.createSpreadElement(createNgDevModeConditional(ts8.factory.createArrayLiteralExpression(spreadArgs), ts8.factory.createArrayLiteralExpression()));
    ts8.addSyntheticLeadingComment(spread, ts8.SyntaxKind.MultiLineCommentTrivia, " @ts-ignore ", true);
    newArgs = [...node.arguments, spread];
  }
  return ts8.factory.updateCallExpression(node, node.expression, node.typeArguments, newArgs);
}
function createNgDevModeConditional(devModeExpression, prodModeExpression) {
  ts8.addSyntheticLeadingComment(prodModeExpression, ts8.SyntaxKind.MultiLineCommentTrivia, " istanbul ignore next ", false);
  return ts8.factory.createParenthesizedExpression(ts8.factory.createConditionalExpression(ts8.factory.createIdentifier("ngDevMode"), void 0, devModeExpression, void 0, prodModeExpression));
}
function isVariableDeclarationCase(node) {
  if (!ts8.isVariableDeclaration(node)) {
    return false;
  }
  if (!node.initializer || !ts8.isCallExpression(node.initializer)) {
    return false;
  }
  let expression = node.initializer.expression;
  if (ts8.isPropertyAccessExpression(expression)) {
    expression = expression.expression;
  }
  return ts8.isIdentifier(expression) && isSignalFunction(expression);
}
function isPropertyAssignmentCase(node) {
  if (!ts8.isExpressionStatement(node)) {
    return false;
  }
  if (!ts8.isBinaryExpression(node.expression)) {
    return false;
  }
  const binaryExpression = node.expression;
  if (binaryExpression.operatorToken.kind !== ts8.SyntaxKind.EqualsToken) {
    return false;
  }
  if (!ts8.isCallExpression(binaryExpression.right)) {
    return false;
  }
  if (!ts8.isPropertyAccessExpression(binaryExpression.left)) {
    return false;
  }
  let expression = binaryExpression.right.expression;
  if (ts8.isPropertyAccessExpression(expression)) {
    expression = expression.expression;
  }
  return ts8.isIdentifier(expression) && isSignalFunction(expression);
}
function isPropertyDeclarationCase(node) {
  if (!ts8.isPropertyDeclaration(node)) {
    return false;
  }
  if (!(node.initializer && ts8.isCallExpression(node.initializer))) {
    return false;
  }
  let expression = node.initializer.expression;
  if (ts8.isPropertyAccessExpression(expression)) {
    expression = expression.expression;
  }
  return ts8.isIdentifier(expression) && isSignalFunction(expression);
}
var signalFunctions = /* @__PURE__ */ new Map([
  ["signal", "core"],
  ["computed", "core"],
  ["linkedSignal", "core"],
  ["input", "core"],
  ["model", "core"],
  ["viewChild", "core"],
  ["viewChildren", "core"],
  ["contentChild", "core"],
  ["contentChildren", "core"],
  ["effect", "core"],
  ["resource", "core"],
  ["httpResource", "common"]
]);
function expressionIsUsingAngularImportedSymbol(program, expression) {
  const symbol = program.getTypeChecker().getSymbolAtLocation(expression);
  if (symbol === void 0) {
    return false;
  }
  const declarations = symbol.declarations;
  if (declarations === void 0 || declarations.length === 0) {
    return false;
  }
  const importSpecifier = declarations[0];
  if (!ts8.isImportSpecifier(importSpecifier)) {
    return false;
  }
  const namedImports = importSpecifier.parent;
  if (!ts8.isNamedImports(namedImports)) {
    return false;
  }
  const importsClause = namedImports.parent;
  if (!ts8.isImportClause(importsClause)) {
    return false;
  }
  const importDeclaration = importsClause.parent;
  if (!ts8.isImportDeclaration(importDeclaration) || !ts8.isStringLiteral(importDeclaration.moduleSpecifier)) {
    return false;
  }
  const specifier = importDeclaration.moduleSpecifier.text;
  const packageName = signalFunctions.get(expression.getText());
  return specifier !== void 0 && packageName !== void 0 && (specifier === `@angular/${packageName}` || specifier.startsWith(`@angular/${packageName}/`));
}
function isSignalFunction(expression) {
  const text = expression.text;
  return signalFunctions.has(text);
}
function isRequiredInputFunction(expression) {
  if (ts8.isPropertyAccessExpression(expression) && ts8.isIdentifier(expression.name) && ts8.isIdentifier(expression.expression)) {
    const accessName = expression.name.text;
    const parentName = expression.expression.text;
    if (accessName === "required" && (parentName === "input" || parentName === "model")) {
      return true;
    }
  }
  return false;
}
function transformVariableDeclaration(program, node) {
  if (!node.initializer || !ts8.isCallExpression(node.initializer))
    return node;
  const expression = node.initializer.expression;
  if (ts8.isPropertyAccessExpression(expression)) {
    if (!expressionIsUsingAngularImportedSymbol(program, expression.expression)) {
      return node;
    }
  } else if (!expressionIsUsingAngularImportedSymbol(program, expression)) {
    return node;
  }
  try {
    const nodeText = node.name.getText();
    return ts8.factory.updateVariableDeclaration(node, node.name, node.exclamationToken, node.type, insertDebugNameIntoCallExpression(node.initializer, nodeText));
  } catch {
    return node;
  }
}
function transformPropertyAssignment(program, node) {
  const expression = node.expression.right.expression;
  if (ts8.isPropertyAccessExpression(expression)) {
    if (!expressionIsUsingAngularImportedSymbol(program, expression.expression)) {
      return node;
    }
  } else if (!expressionIsUsingAngularImportedSymbol(program, expression)) {
    return node;
  }
  return ts8.factory.updateExpressionStatement(node, ts8.factory.createBinaryExpression(node.expression.left, node.expression.operatorToken, insertDebugNameIntoCallExpression(node.expression.right, node.expression.left.name.text)));
}
function transformPropertyDeclaration(program, node) {
  if (!node.initializer || !ts8.isCallExpression(node.initializer))
    return node;
  const expression = node.initializer.expression;
  if (ts8.isPropertyAccessExpression(expression)) {
    if (!expressionIsUsingAngularImportedSymbol(program, expression.expression)) {
      return node;
    }
  } else if (!expressionIsUsingAngularImportedSymbol(program, expression)) {
    return node;
  }
  try {
    const nodeText = node.name.getText();
    return ts8.factory.updatePropertyDeclaration(node, node.modifiers, node.name, node.questionToken, node.type, insertDebugNameIntoCallExpression(node.initializer, nodeText));
  } catch {
    return node;
  }
}
function isSignalWithObjectOnlyDefinition(callExpression) {
  const callExpressionText = callExpression.expression.getText();
  const nodeArgs = Array.from(callExpression.arguments);
  const isLinkedSignal = callExpressionText === "linkedSignal";
  const isComputationLinkedSignal = isLinkedSignal && nodeArgs[0].kind === ts8.SyntaxKind.ObjectLiteralExpression;
  const isResource = callExpressionText === "resource";
  return isComputationLinkedSignal || isResource;
}
function signalMetadataTransform(program) {
  return (context) => (rootNode) => {
    const visit2 = (node) => {
      if (isVariableDeclarationCase(node)) {
        return transformVariableDeclaration(program, node);
      }
      if (isPropertyAssignmentCase(node)) {
        return transformPropertyAssignment(program, node);
      }
      if (isPropertyDeclarationCase(node)) {
        return transformPropertyDeclaration(program, node);
      }
      return ts8.visitEachChild(node, visit2, context);
    };
    return ts8.visitNode(rootNode, visit2);
  };
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/shared.js
import { ArrowFunctionExpr as ArrowFunctionExpr2, ClassPropertyMapping, createMayBeForwardRefExpression as createMayBeForwardRefExpression2, emitDistinctChangesOnlyDefaultValue, ExternalExpr as ExternalExpr2, ExternalReference, getSafePropertyAccessString, literal as literal2, LiteralArrayExpr as LiteralArrayExpr2, literalMap as literalMap2, parseHostBindings, R3Identifiers, verifyHostBindings, WrappedNodeExpr as WrappedNodeExpr5 } from "@angular/compiler";
import ts16 from "typescript";

// packages/compiler-cli/src/ngtsc/annotations/common/src/di.js
import { LiteralExpr, WrappedNodeExpr as WrappedNodeExpr2 } from "@angular/compiler";
import ts9 from "typescript";
function getConstructorDependencies(clazz, reflector, isCore) {
  const deps = [];
  const errors = [];
  let ctorParams = reflector.getConstructorParameters(clazz);
  if (ctorParams === null) {
    if (reflector.hasBaseClass(clazz)) {
      return null;
    } else {
      ctorParams = [];
    }
  }
  ctorParams.forEach((param, idx) => {
    let token = valueReferenceToExpression(param.typeValueReference);
    let attributeNameType = null;
    let optional = false, self = false, skipSelf = false, host = false;
    (param.decorators || []).filter((dec) => isCore || isAngularCore(dec)).forEach((dec) => {
      const name = isCore || dec.import === null ? dec.name : dec.import.name;
      if (name === "Inject") {
        if (dec.args === null || dec.args.length !== 1) {
          throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, dec.node, `Unexpected number of arguments to @Inject().`);
        }
        token = new WrappedNodeExpr2(dec.args[0]);
      } else if (name === "Optional") {
        optional = true;
      } else if (name === "SkipSelf") {
        skipSelf = true;
      } else if (name === "Self") {
        self = true;
      } else if (name === "Host") {
        host = true;
      } else if (name === "Attribute") {
        if (dec.args === null || dec.args.length !== 1) {
          throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, dec.node, `Unexpected number of arguments to @Attribute().`);
        }
        const attributeName = dec.args[0];
        token = new WrappedNodeExpr2(attributeName);
        if (ts9.isStringLiteralLike(attributeName)) {
          attributeNameType = new LiteralExpr(attributeName.text);
        } else {
          attributeNameType = new WrappedNodeExpr2(ts9.factory.createKeywordTypeNode(ts9.SyntaxKind.UnknownKeyword));
        }
      } else {
        throw new FatalDiagnosticError(ErrorCode.DECORATOR_UNEXPECTED, dec.node, `Unexpected decorator ${name} on parameter.`);
      }
    });
    if (token === null) {
      if (param.typeValueReference.kind !== 2) {
        throw new Error("Illegal state: expected value reference to be unavailable if no token is present");
      }
      errors.push({
        index: idx,
        param,
        reason: param.typeValueReference.reason
      });
    } else {
      deps.push({ token, attributeNameType, optional, self, skipSelf, host });
    }
  });
  if (errors.length === 0) {
    return { deps };
  } else {
    return { deps: null, errors };
  }
}
function unwrapConstructorDependencies(deps) {
  if (deps === null) {
    return null;
  } else if (deps.deps !== null) {
    return deps.deps;
  } else {
    return "invalid";
  }
}
function getValidConstructorDependencies(clazz, reflector, isCore) {
  return validateConstructorDependencies(clazz, getConstructorDependencies(clazz, reflector, isCore));
}
function validateConstructorDependencies(clazz, deps) {
  if (deps === null) {
    return null;
  } else if (deps.deps !== null) {
    return deps.deps;
  } else {
    const error = deps.errors[0];
    throw createUnsuitableInjectionTokenError(clazz, error);
  }
}
function createUnsuitableInjectionTokenError(clazz, error) {
  const { param, index, reason } = error;
  let chainMessage = void 0;
  let hints = void 0;
  switch (reason.kind) {
    case 5:
      chainMessage = "Consider using the @Inject decorator to specify an injection token.";
      hints = [
        makeRelatedInformation(reason.typeNode, "This type is not supported as injection token.")
      ];
      break;
    case 1:
      chainMessage = "Consider using the @Inject decorator to specify an injection token.";
      hints = [
        makeRelatedInformation(reason.typeNode, "This type does not have a value, so it cannot be used as injection token.")
      ];
      if (reason.decl !== null) {
        hints.push(makeRelatedInformation(reason.decl, "The type is declared here."));
      }
      break;
    case 2:
      chainMessage = "Consider changing the type-only import to a regular import, or use the @Inject decorator to specify an injection token.";
      hints = [
        makeRelatedInformation(reason.typeNode, "This type is imported using a type-only import, which prevents it from being usable as an injection token."),
        makeRelatedInformation(reason.node, "The type-only import occurs here.")
      ];
      break;
    case 4:
      chainMessage = "Consider using the @Inject decorator to specify an injection token.";
      hints = [
        makeRelatedInformation(reason.typeNode, "This type corresponds with a namespace, which cannot be used as injection token."),
        makeRelatedInformation(reason.importClause, "The namespace import occurs here.")
      ];
      break;
    case 3:
      chainMessage = "The type should reference a known declaration.";
      hints = [makeRelatedInformation(reason.typeNode, "This type could not be resolved.")];
      break;
    case 0:
      chainMessage = "Consider adding a type to the parameter or use the @Inject decorator to specify an injection token.";
      break;
  }
  const chain = {
    messageText: `No suitable injection token for parameter '${param.name || index}' of class '${clazz.name.text}'.`,
    category: ts9.DiagnosticCategory.Error,
    code: 0,
    next: [
      {
        messageText: chainMessage,
        category: ts9.DiagnosticCategory.Message,
        code: 0
      }
    ]
  };
  return new FatalDiagnosticError(ErrorCode.PARAM_MISSING_TOKEN, param.nameNode, chain, hints);
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/diagnostics.js
import ts10 from "typescript";
function makeDuplicateDeclarationError(node, data, kind) {
  const context = [];
  for (const decl of data) {
    if (decl.rawDeclarations === null) {
      continue;
    }
    const contextNode = decl.ref.getOriginForDiagnostics(decl.rawDeclarations, decl.ngModule.name);
    context.push(makeRelatedInformation(contextNode, `'${node.name.text}' is listed in the declarations of the NgModule '${decl.ngModule.name.text}'.`));
  }
  return makeDiagnostic(ErrorCode.NGMODULE_DECLARATION_NOT_UNIQUE, node.name, `The ${kind} '${node.name.text}' is declared by more than one NgModule.`, context);
}
function createValueHasWrongTypeError(node, value, messageText) {
  let chainedMessage;
  let relatedInformation;
  if (value instanceof DynamicValue) {
    chainedMessage = "Value could not be determined statically.";
    relatedInformation = traceDynamicValue(node, value);
  } else if (value instanceof Reference) {
    const target = value.debugName !== null ? `'${value.debugName}'` : "an anonymous declaration";
    chainedMessage = `Value is a reference to ${target}.`;
    const referenceNode = identifierOfNode(value.node) ?? value.node;
    relatedInformation = [makeRelatedInformation(referenceNode, "Reference is declared here.")];
  } else {
    chainedMessage = `Value is of type '${describeResolvedType(value)}'.`;
  }
  const chain = {
    messageText,
    category: ts10.DiagnosticCategory.Error,
    code: 0,
    next: [
      {
        messageText: chainedMessage,
        category: ts10.DiagnosticCategory.Message,
        code: 0
      }
    ]
  };
  return new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, node, chain, relatedInformation);
}
function getProviderDiagnostics(providerClasses, providersDeclaration, registry) {
  const diagnostics = [];
  for (const provider of providerClasses) {
    const injectableMeta = registry.getInjectableMeta(provider.node);
    if (injectableMeta !== null) {
      continue;
    }
    const contextNode = provider.getOriginForDiagnostics(providersDeclaration);
    diagnostics.push(makeDiagnostic(ErrorCode.UNDECORATED_PROVIDER, contextNode, `The class '${provider.node.name.text}' cannot be created via dependency injection, as it does not have an Angular decorator. This will result in an error at runtime.

Either add the @Injectable() decorator to '${provider.node.name.text}', or configure a different provider (such as a provider with 'useFactory').
`, [makeRelatedInformation(provider.node, `'${provider.node.name.text}' is declared here.`)]));
  }
  return diagnostics;
}
function getDirectiveDiagnostics(node, injectableRegistry, evaluator, reflector, scopeRegistry, strictInjectionParameters, kind) {
  let diagnostics = [];
  const addDiagnostics = (more) => {
    if (more === null) {
      return;
    } else if (diagnostics === null) {
      diagnostics = Array.isArray(more) ? more : [more];
    } else if (Array.isArray(more)) {
      diagnostics.push(...more);
    } else {
      diagnostics.push(more);
    }
  };
  const duplicateDeclarations = scopeRegistry.getDuplicateDeclarations(node);
  if (duplicateDeclarations !== null) {
    addDiagnostics(makeDuplicateDeclarationError(node, duplicateDeclarations, kind));
  }
  addDiagnostics(checkInheritanceOfInjectable(node, injectableRegistry, reflector, evaluator, strictInjectionParameters, kind));
  return diagnostics;
}
function validateHostDirectives(origin, hostDirectives, metaReader) {
  const diagnostics = [];
  for (const current of hostDirectives) {
    if (!isHostDirectiveMetaForGlobalMode(current)) {
      throw new Error("Impossible state: diagnostics code path for local compilation");
    }
    const hostMeta = flattenInheritedDirectiveMetadata(metaReader, current.directive);
    if (hostMeta === null) {
      diagnostics.push(makeDiagnostic(ErrorCode.HOST_DIRECTIVE_INVALID, current.directive.getOriginForDiagnostics(origin), `${current.directive.debugName} must be a standalone directive to be used as a host directive`));
      continue;
    }
    if (!hostMeta.isStandalone) {
      diagnostics.push(makeDiagnostic(ErrorCode.HOST_DIRECTIVE_NOT_STANDALONE, current.directive.getOriginForDiagnostics(origin), `Host directive ${hostMeta.name} must be standalone`));
    }
    if (hostMeta.isComponent) {
      diagnostics.push(makeDiagnostic(ErrorCode.HOST_DIRECTIVE_COMPONENT, current.directive.getOriginForDiagnostics(origin), `Host directive ${hostMeta.name} cannot be a component`));
    }
    const requiredInputNames = Array.from(hostMeta.inputs).filter((input) => input.required).map((input) => input.classPropertyName);
    validateHostDirectiveMappings("input", current, hostMeta, origin, diagnostics, requiredInputNames.length > 0 ? new Set(requiredInputNames) : null);
    validateHostDirectiveMappings("output", current, hostMeta, origin, diagnostics, null);
  }
  return diagnostics;
}
function validateHostDirectiveMappings(bindingType, hostDirectiveMeta, meta, origin, diagnostics, requiredBindings) {
  if (!isHostDirectiveMetaForGlobalMode(hostDirectiveMeta)) {
    throw new Error("Impossible state: diagnostics code path for local compilation");
  }
  const className = meta.name;
  const hostDirectiveMappings = bindingType === "input" ? hostDirectiveMeta.inputs : hostDirectiveMeta.outputs;
  const existingBindings = bindingType === "input" ? meta.inputs : meta.outputs;
  const exposedRequiredBindings = /* @__PURE__ */ new Set();
  for (const publicName in hostDirectiveMappings) {
    if (hostDirectiveMappings.hasOwnProperty(publicName)) {
      const bindings = existingBindings.getByBindingPropertyName(publicName);
      if (bindings === null) {
        diagnostics.push(makeDiagnostic(ErrorCode.HOST_DIRECTIVE_UNDEFINED_BINDING, hostDirectiveMeta.directive.getOriginForDiagnostics(origin), `Directive ${className} does not have an ${bindingType} with a public name of ${publicName}.`));
      } else if (requiredBindings !== null) {
        for (const field of bindings) {
          if (requiredBindings.has(field.classPropertyName)) {
            exposedRequiredBindings.add(field.classPropertyName);
          }
        }
      }
      const remappedPublicName = hostDirectiveMappings[publicName];
      const bindingsForPublicName = existingBindings.getByBindingPropertyName(remappedPublicName);
      if (bindingsForPublicName !== null) {
        for (const binding of bindingsForPublicName) {
          if (binding.bindingPropertyName !== publicName) {
            diagnostics.push(makeDiagnostic(ErrorCode.HOST_DIRECTIVE_CONFLICTING_ALIAS, hostDirectiveMeta.directive.getOriginForDiagnostics(origin), `Cannot alias ${bindingType} ${publicName} of host directive ${className} to ${remappedPublicName}, because it already has a different ${bindingType} with the same public name.`));
          }
        }
      }
    }
  }
  if (requiredBindings !== null && requiredBindings.size !== exposedRequiredBindings.size) {
    const missingBindings = [];
    for (const publicName of requiredBindings) {
      if (!exposedRequiredBindings.has(publicName)) {
        const name = existingBindings.getByClassPropertyName(publicName);
        if (name) {
          missingBindings.push(`'${name.bindingPropertyName}'`);
        }
      }
    }
    diagnostics.push(makeDiagnostic(ErrorCode.HOST_DIRECTIVE_MISSING_REQUIRED_BINDING, hostDirectiveMeta.directive.getOriginForDiagnostics(origin), `Required ${bindingType}${missingBindings.length === 1 ? "" : "s"} ${missingBindings.join(", ")} from host directive ${className} must be exposed.`));
  }
}
function getUndecoratedClassWithAngularFeaturesDiagnostic(node) {
  return makeDiagnostic(ErrorCode.UNDECORATED_CLASS_USING_ANGULAR_FEATURES, node.name, `Class is using Angular features but is not decorated. Please add an explicit Angular decorator.`);
}
function checkInheritanceOfInjectable(node, injectableRegistry, reflector, evaluator, strictInjectionParameters, kind) {
  const classWithCtor = findInheritedCtor(node, injectableRegistry, reflector, evaluator);
  if (classWithCtor === null || classWithCtor.isCtorValid) {
    return null;
  }
  if (!classWithCtor.isDecorated) {
    return getInheritedUndecoratedCtorDiagnostic(node, classWithCtor.ref, kind);
  }
  if (isFromDtsFile(classWithCtor.ref.node)) {
    return null;
  }
  if (!strictInjectionParameters || isAbstractClassDeclaration(node)) {
    return null;
  }
  return getInheritedInvalidCtorDiagnostic(node, classWithCtor.ref, kind);
}
function findInheritedCtor(node, injectableRegistry, reflector, evaluator) {
  if (!reflector.isClass(node) || reflector.getConstructorParameters(node) !== null) {
    return null;
  }
  let baseClass = readBaseClass(node, reflector, evaluator);
  while (baseClass !== null) {
    if (baseClass === "dynamic") {
      return null;
    }
    const injectableMeta = injectableRegistry.getInjectableMeta(baseClass.node);
    if (injectableMeta !== null) {
      if (injectableMeta.ctorDeps !== null) {
        return {
          ref: baseClass,
          isCtorValid: injectableMeta.ctorDeps !== "invalid",
          isDecorated: true
        };
      }
    } else {
      const baseClassConstructorParams = reflector.getConstructorParameters(baseClass.node);
      if (baseClassConstructorParams !== null) {
        return {
          ref: baseClass,
          isCtorValid: baseClassConstructorParams.length === 0,
          isDecorated: false
        };
      }
    }
    baseClass = readBaseClass(baseClass.node, reflector, evaluator);
  }
  return null;
}
function getInheritedInvalidCtorDiagnostic(node, baseClass, kind) {
  const baseClassName = baseClass.debugName;
  return makeDiagnostic(ErrorCode.INJECTABLE_INHERITS_INVALID_CONSTRUCTOR, node.name, `The ${kind.toLowerCase()} ${node.name.text} inherits its constructor from ${baseClassName}, but the latter has a constructor parameter that is not compatible with dependency injection. Either add an explicit constructor to ${node.name.text} or change ${baseClassName}'s constructor to use parameters that are valid for DI.`);
}
function getInheritedUndecoratedCtorDiagnostic(node, baseClass, kind) {
  const baseClassName = baseClass.debugName;
  const baseNeedsDecorator = kind === "Component" || kind === "Directive" ? "Directive" : "Injectable";
  return makeDiagnostic(ErrorCode.DIRECTIVE_INHERITS_UNDECORATED_CTOR, node.name, `The ${kind.toLowerCase()} ${node.name.text} inherits its constructor from ${baseClassName}, but the latter does not have an Angular decorator of its own. Dependency injection will not be able to resolve the parameters of ${baseClassName}'s constructor. Either add a @${baseNeedsDecorator} decorator to ${baseClassName}, or add an explicit constructor to ${node.name.text}.`);
}
function assertLocalCompilationUnresolvedConst(compilationMode, value, nodeToHighlight, errorMessage) {
  if (compilationMode === CompilationMode.LOCAL && value instanceof DynamicValue && value.isFromUnknownIdentifier()) {
    throw new FatalDiagnosticError(ErrorCode.LOCAL_COMPILATION_UNRESOLVED_CONST, nodeToHighlight ?? value.node, errorMessage);
  }
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/evaluation.js
import { ViewEncapsulation } from "@angular/compiler";
import ts11 from "typescript";
function resolveEnumValue(evaluator, metadata, field, enumSymbolName, isCore) {
  let resolved = null;
  if (metadata.has(field)) {
    const expr = metadata.get(field);
    const value = evaluator.evaluate(expr);
    if (value instanceof EnumValue && isAngularCoreReferenceWithPotentialAliasing(value.enumRef, enumSymbolName, isCore)) {
      resolved = value.resolved;
    } else {
      throw createValueHasWrongTypeError(expr, value, `${field} must be a member of ${enumSymbolName} enum from @angular/core`);
    }
  }
  return resolved;
}
function resolveEncapsulationEnumValueLocally(expr) {
  if (!expr) {
    return null;
  }
  const exprText = expr.getText().trim();
  for (const key in ViewEncapsulation) {
    if (!Number.isNaN(Number(key))) {
      continue;
    }
    const suffix = `ViewEncapsulation.${key}`;
    if (exprText === suffix || exprText.endsWith(`.${suffix}`)) {
      const ans = Number(ViewEncapsulation[key]);
      return ans;
    }
  }
  return null;
}
function isStringArray(resolvedValue) {
  return Array.isArray(resolvedValue) && resolvedValue.every((elem) => typeof elem === "string");
}
function resolveLiteral(decorator, literalCache) {
  if (literalCache.has(decorator)) {
    return literalCache.get(decorator);
  }
  if (decorator.args === null || decorator.args.length !== 1) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `Incorrect number of arguments to @${decorator.name} decorator`);
  }
  const meta = unwrapExpression(decorator.args[0]);
  if (!ts11.isObjectLiteralExpression(meta)) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, `Decorator argument must be literal.`);
  }
  literalCache.set(decorator, meta);
  return meta;
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/factory.js
import { compileDeclareFactoryFunction, compileFactoryFunction } from "@angular/compiler";
function compileNgFactoryDefField(metadata) {
  const res = compileFactoryFunction(metadata);
  return {
    name: "\u0275fac",
    initializer: res.expression,
    statements: res.statements,
    type: res.type,
    deferrableImports: null
  };
}
function compileDeclareFactory(metadata) {
  const res = compileDeclareFactoryFunction(metadata);
  return {
    name: "\u0275fac",
    initializer: res.expression,
    statements: res.statements,
    type: res.type,
    deferrableImports: null
  };
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/injectable_registry.js
var InjectableClassRegistry = class {
  host;
  isCore;
  classes = /* @__PURE__ */ new Map();
  constructor(host, isCore) {
    this.host = host;
    this.isCore = isCore;
  }
  registerInjectable(declaration, meta) {
    this.classes.set(declaration, meta);
  }
  getInjectableMeta(declaration) {
    if (this.classes.has(declaration)) {
      return this.classes.get(declaration);
    }
    if (!hasInjectableFields(declaration, this.host)) {
      return null;
    }
    const ctorDeps = getConstructorDependencies(declaration, this.host, this.isCore);
    const meta = {
      ctorDeps: unwrapConstructorDependencies(ctorDeps)
    };
    this.classes.set(declaration, meta);
    return meta;
  }
};

// packages/compiler-cli/src/ngtsc/annotations/common/src/metadata.js
import { ArrowFunctionExpr, LiteralArrayExpr, LiteralExpr as LiteralExpr2, literalMap, WrappedNodeExpr as WrappedNodeExpr3 } from "@angular/compiler";
import ts12 from "typescript";
function extractClassMetadata(clazz, reflection, isCore, annotateForClosureCompiler, angularDecoratorTransform = (dec) => dec, undecoratedMetadataExtractor = () => null) {
  if (!reflection.isClass(clazz)) {
    return null;
  }
  const id = clazz.name;
  const classDecorators = reflection.getDecoratorsOfDeclaration(clazz);
  if (classDecorators === null) {
    return null;
  }
  const ngClassDecorators = classDecorators.filter((dec) => isAngularDecorator3(dec, isCore)).map((decorator) => decoratorToMetadata(angularDecoratorTransform(decorator), annotateForClosureCompiler)).map((decorator) => removeIdentifierReferences(decorator, id.text));
  if (ngClassDecorators.length === 0) {
    return null;
  }
  const metaDecorators = new WrappedNodeExpr3(ts12.factory.createArrayLiteralExpression(ngClassDecorators));
  let metaCtorParameters = null;
  const classCtorParameters = reflection.getConstructorParameters(clazz);
  if (classCtorParameters !== null) {
    const ctorParameters = classCtorParameters.map((param) => ctorParameterToMetadata(param, isCore));
    metaCtorParameters = new ArrowFunctionExpr([], new LiteralArrayExpr(ctorParameters));
  }
  let metaPropDecorators = null;
  const classMembers = reflection.getMembersOfClass(clazz).filter((member) => !member.isStatic && // Private fields are not supported in the metadata emit
  member.accessLevel !== ClassMemberAccessLevel.EcmaScriptPrivate);
  const decoratedMembers = [];
  const seenMemberNames = /* @__PURE__ */ new Set();
  let duplicateDecoratedMembers = null;
  for (const member of classMembers) {
    const shouldQuoteName = member.nameNode !== null && ts12.isStringLiteralLike(member.nameNode);
    if (member.decorators !== null && member.decorators.length > 0) {
      decoratedMembers.push({
        key: member.name,
        quoted: shouldQuoteName,
        value: decoratedClassMemberToMetadata(member.decorators, isCore)
      });
      if (seenMemberNames.has(member.name)) {
        duplicateDecoratedMembers ??= [];
        duplicateDecoratedMembers.push(member);
      } else {
        seenMemberNames.add(member.name);
      }
    } else {
      const undecoratedMetadata = undecoratedMetadataExtractor(member);
      if (undecoratedMetadata !== null) {
        decoratedMembers.push({
          key: member.name,
          quoted: shouldQuoteName,
          value: undecoratedMetadata
        });
      }
    }
  }
  if (duplicateDecoratedMembers !== null) {
    throw new FatalDiagnosticError(ErrorCode.DUPLICATE_DECORATED_PROPERTIES, duplicateDecoratedMembers[0].nameNode ?? clazz, `Duplicate decorated properties found on class '${clazz.name.text}': ` + duplicateDecoratedMembers.map((member) => member.name).join(", "));
  }
  if (decoratedMembers.length > 0) {
    metaPropDecorators = literalMap(decoratedMembers);
  }
  return {
    type: new WrappedNodeExpr3(id),
    decorators: metaDecorators,
    ctorParameters: metaCtorParameters,
    propDecorators: metaPropDecorators
  };
}
function ctorParameterToMetadata(param, isCore) {
  const type = param.typeValueReference.kind !== 2 ? valueReferenceToExpression(param.typeValueReference) : new LiteralExpr2(void 0);
  const mapEntries = [
    { key: "type", value: type, quoted: false }
  ];
  if (param.decorators !== null) {
    const ngDecorators = param.decorators.filter((dec) => isAngularDecorator3(dec, isCore)).map((decorator) => decoratorToMetadata(decorator));
    const value = new WrappedNodeExpr3(ts12.factory.createArrayLiteralExpression(ngDecorators));
    mapEntries.push({ key: "decorators", value, quoted: false });
  }
  return literalMap(mapEntries);
}
function decoratedClassMemberToMetadata(decorators, isCore) {
  const ngDecorators = decorators.filter((dec) => isAngularDecorator3(dec, isCore)).map((decorator) => new WrappedNodeExpr3(decoratorToMetadata(decorator)));
  return new LiteralArrayExpr(ngDecorators);
}
function decoratorToMetadata(decorator, wrapFunctionsInParens) {
  if (decorator.identifier === null) {
    throw new Error("Illegal state: synthesized decorator cannot be emitted in class metadata.");
  }
  const properties = [
    ts12.factory.createPropertyAssignment("type", decorator.identifier)
  ];
  if (decorator.args !== null && decorator.args.length > 0) {
    const args = decorator.args.map((arg) => {
      return wrapFunctionsInParens ? wrapFunctionExpressionsInParens(arg) : arg;
    });
    properties.push(ts12.factory.createPropertyAssignment("args", ts12.factory.createArrayLiteralExpression(args)));
  }
  return ts12.factory.createObjectLiteralExpression(properties, true);
}
function isAngularDecorator3(decorator, isCore) {
  return isCore || decorator.import !== null && decorator.import.from === "@angular/core";
}
function removeIdentifierReferences(node, names) {
  const result = ts12.transform(node, [
    (context) => (root) => ts12.visitNode(root, function walk(current) {
      return ts12.isIdentifier(current) && (typeof names === "string" ? current.text === names : names.has(current.text)) ? ts12.factory.createIdentifier(current.text) : ts12.visitEachChild(current, walk, context);
    })
  ]);
  return result.transformed[0];
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/debug_info.js
import { literal, WrappedNodeExpr as WrappedNodeExpr4 } from "@angular/compiler";
function extractClassDebugInfo(clazz, reflection, compilerHost, rootDirs, forbidOrphanRendering) {
  if (!reflection.isClass(clazz)) {
    return null;
  }
  const srcFile = clazz.getSourceFile();
  const srcFileMaybeRelativePath = getProjectRelativePath(srcFile.fileName, rootDirs, compilerHost);
  return {
    type: new WrappedNodeExpr4(clazz.name),
    className: literal(clazz.name.getText()),
    filePath: srcFileMaybeRelativePath ? literal(srcFileMaybeRelativePath) : null,
    lineNumber: literal(srcFile.getLineAndCharacterOfPosition(clazz.name.pos).line + 1),
    forbidOrphanRendering
  };
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/references_registry.js
var NoopReferencesRegistry = class {
  add(source, ...references) {
  }
};

// packages/compiler-cli/src/ngtsc/annotations/common/src/schema.js
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/compiler";
function extractSchemas(rawExpr, evaluator, context) {
  const schemas = [];
  const result = evaluator.evaluate(rawExpr);
  if (!Array.isArray(result)) {
    throw createValueHasWrongTypeError(rawExpr, result, `${context}.schemas must be an array`);
  }
  for (const schemaRef of result) {
    if (!(schemaRef instanceof Reference)) {
      throw createValueHasWrongTypeError(rawExpr, result, `${context}.schemas must be an array of schemas`);
    }
    const id = schemaRef.getIdentityIn(schemaRef.node.getSourceFile());
    if (id === null || schemaRef.ownedByModuleGuess !== "@angular/core") {
      throw createValueHasWrongTypeError(rawExpr, result, `${context}.schemas must be an array of schemas`);
    }
    switch (id.text) {
      case "CUSTOM_ELEMENTS_SCHEMA":
        schemas.push(CUSTOM_ELEMENTS_SCHEMA);
        break;
      case "NO_ERRORS_SCHEMA":
        schemas.push(NO_ERRORS_SCHEMA);
        break;
      default:
        throw createValueHasWrongTypeError(rawExpr, schemaRef, `'${schemaRef.debugName}' is not a valid ${context} schema`);
    }
  }
  return schemas;
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/input_transforms.js
import { outputAst } from "@angular/compiler";
function compileInputTransformFields(inputs) {
  const extraFields = [];
  for (const input of inputs) {
    if (input.transform) {
      extraFields.push({
        name: `ngAcceptInputType_${input.classPropertyName}`,
        type: input.transform.type.synthetic ? new outputAst.ExpressionType(new outputAst.WrappedNodeExpr(input.transform.type.node)) : outputAst.transplantedType(input.transform.type),
        statements: [],
        initializer: null,
        deferrableImports: null
      });
    }
  }
  return extraFields;
}

// packages/compiler-cli/src/ngtsc/annotations/common/src/jit_declaration_registry.js
var JitDeclarationRegistry = class {
  jitDeclarations = /* @__PURE__ */ new Set();
};

// packages/compiler-cli/src/ngtsc/annotations/directive/src/initializer_function_access.js
function validateAccessOfInitializerApiMember({ api, call }, member) {
  if (!api.allowedAccessLevels.includes(member.accessLevel)) {
    throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY, call, makeDiagnosticChain(`Cannot use "${api.functionName}" on a class member that is declared as ${classMemberAccessLevelToString(member.accessLevel)}.`, [
      makeDiagnosticChain(`Update the class field to be either: ` + api.allowedAccessLevels.map((l) => classMemberAccessLevelToString(l)).join(", "))
    ]));
  }
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/initializer_functions.js
import ts13 from "typescript";
function tryParseInitializerApi(functions, expression, reflector, importTracker) {
  if (ts13.isAsExpression(expression) || ts13.isParenthesizedExpression(expression)) {
    return tryParseInitializerApi(functions, expression.expression, reflector, importTracker);
  }
  if (!ts13.isCallExpression(expression)) {
    return null;
  }
  const staticResult = parseTopLevelCall(expression, functions, importTracker) || parseTopLevelRequiredCall(expression, functions, importTracker) || parseTopLevelCallFromNamespace(expression, functions, importTracker);
  if (staticResult === null) {
    return null;
  }
  const { api, apiReference, isRequired } = staticResult;
  const resolvedImport = reflector.getImportOfIdentifier(apiReference);
  if (resolvedImport === null || api.functionName !== resolvedImport.name || api.owningModule !== resolvedImport.from) {
    return null;
  }
  return {
    api,
    call: expression,
    isRequired
  };
}
function parseTopLevelCall(call, functions, importTracker) {
  const node = call.expression;
  if (!ts13.isIdentifier(node)) {
    return null;
  }
  const matchingApi = functions.find((fn) => importTracker.isPotentialReferenceToNamedImport(node, fn.functionName, fn.owningModule));
  if (matchingApi === void 0) {
    return null;
  }
  return { api: matchingApi, apiReference: node, isRequired: false };
}
function parseTopLevelRequiredCall(call, functions, importTracker) {
  const node = call.expression;
  if (!ts13.isPropertyAccessExpression(node) || !ts13.isIdentifier(node.expression) || node.name.text !== "required") {
    return null;
  }
  const expression = node.expression;
  const matchingApi = functions.find((fn) => importTracker.isPotentialReferenceToNamedImport(expression, fn.functionName, fn.owningModule));
  if (matchingApi === void 0) {
    return null;
  }
  return { api: matchingApi, apiReference: expression, isRequired: true };
}
function parseTopLevelCallFromNamespace(call, functions, importTracker) {
  const node = call.expression;
  if (!ts13.isPropertyAccessExpression(node)) {
    return null;
  }
  let apiReference = null;
  let matchingApi = void 0;
  let isRequired = false;
  if (ts13.isIdentifier(node.expression) && ts13.isIdentifier(node.name)) {
    const namespaceRef = node.expression;
    apiReference = node.name;
    matchingApi = functions.find((fn) => node.name.text === fn.functionName && importTracker.isPotentialReferenceToNamespaceImport(namespaceRef, fn.owningModule));
  } else if (
    // `prop = core.input.required()`
    ts13.isPropertyAccessExpression(node.expression) && ts13.isIdentifier(node.expression.expression) && ts13.isIdentifier(node.expression.name) && node.name.text === "required"
  ) {
    const potentialName = node.expression.name.text;
    const namespaceRef = node.expression.expression;
    apiReference = node.expression.name;
    matchingApi = functions.find((fn) => fn.functionName === potentialName && importTracker.isPotentialReferenceToNamespaceImport(namespaceRef, fn.owningModule));
    isRequired = true;
  }
  if (matchingApi === void 0 || apiReference === null) {
    return null;
  }
  return { api: matchingApi, apiReference, isRequired };
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/input_output_parse_options.js
import ts14 from "typescript";
function parseAndValidateInputAndOutputOptions(optionsNode) {
  if (!ts14.isObjectLiteralExpression(optionsNode)) {
    throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, optionsNode, "Argument needs to be an object literal that is statically analyzable.");
  }
  const options = reflectObjectLiteral(optionsNode);
  let alias = void 0;
  if (options.has("alias")) {
    const aliasExpr = options.get("alias");
    if (!ts14.isStringLiteralLike(aliasExpr)) {
      throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, aliasExpr, "Alias needs to be a string that is statically analyzable.");
    }
    alias = aliasExpr.text;
  }
  return { alias };
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/input_function.js
var INPUT_INITIALIZER_FN = {
  functionName: "input",
  owningModule: "@angular/core",
  // Inputs are accessed from parents, via the `property` instruction.
  // Conceptually, the fields need to be publicly readable, but in practice,
  // accessing `protected` or `private` members works at runtime, so we can allow
  // cases where the input is intentionally not part of the public API, programmatically.
  // Note: `private` is omitted intentionally as this would be a conceptual confusion point.
  allowedAccessLevels: [
    ClassMemberAccessLevel.PublicWritable,
    ClassMemberAccessLevel.PublicReadonly,
    ClassMemberAccessLevel.Protected
  ]
};
function tryParseSignalInputMapping(member, reflector, importTracker) {
  if (member.value === null) {
    return null;
  }
  const signalInput = tryParseInitializerApi([INPUT_INITIALIZER_FN], member.value, reflector, importTracker);
  if (signalInput === null) {
    return null;
  }
  validateAccessOfInitializerApiMember(signalInput, member);
  const optionsNode = signalInput.isRequired ? signalInput.call.arguments[0] : signalInput.call.arguments[1];
  const options = optionsNode !== void 0 ? parseAndValidateInputAndOutputOptions(optionsNode) : null;
  const classPropertyName = member.name;
  return {
    isSignal: true,
    classPropertyName,
    bindingPropertyName: options?.alias ?? classPropertyName,
    required: signalInput.isRequired,
    // Signal inputs do not capture complex transform metadata.
    // See more details in the `transform` type of `InputMapping`.
    transform: null
  };
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/model_function.js
var MODEL_INITIALIZER_FN = {
  functionName: "model",
  owningModule: "@angular/core",
  // Inputs are accessed from parents, via the `property` instruction.
  // Conceptually, the fields need to be publicly readable, but in practice,
  // accessing `protected` or `private` members works at runtime, so we can allow
  // cases where the input is intentionally not part of the public API, programmatically.
  allowedAccessLevels: [
    ClassMemberAccessLevel.PublicWritable,
    ClassMemberAccessLevel.PublicReadonly,
    ClassMemberAccessLevel.Protected
  ]
};
function tryParseSignalModelMapping(member, reflector, importTracker) {
  if (member.value === null) {
    return null;
  }
  const model = tryParseInitializerApi([MODEL_INITIALIZER_FN], member.value, reflector, importTracker);
  if (model === null) {
    return null;
  }
  validateAccessOfInitializerApiMember(model, member);
  const optionsNode = model.isRequired ? model.call.arguments[0] : model.call.arguments[1];
  const options = optionsNode !== void 0 ? parseAndValidateInputAndOutputOptions(optionsNode) : null;
  const classPropertyName = member.name;
  const bindingPropertyName = options?.alias ?? classPropertyName;
  return {
    call: model.call,
    input: {
      isSignal: true,
      transform: null,
      classPropertyName,
      bindingPropertyName,
      required: model.isRequired
    },
    output: {
      isSignal: false,
      classPropertyName,
      bindingPropertyName: bindingPropertyName + "Change"
    }
  };
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/output_function.js
var allowedAccessLevels = [
  ClassMemberAccessLevel.PublicWritable,
  ClassMemberAccessLevel.PublicReadonly,
  ClassMemberAccessLevel.Protected
];
var OUTPUT_INITIALIZER_FNS = [
  {
    functionName: "output",
    owningModule: "@angular/core",
    allowedAccessLevels
  },
  {
    functionName: "outputFromObservable",
    owningModule: "@angular/core/rxjs-interop",
    allowedAccessLevels
  }
];
function tryParseInitializerBasedOutput(member, reflector, importTracker) {
  if (member.value === null) {
    return null;
  }
  const output = tryParseInitializerApi(OUTPUT_INITIALIZER_FNS, member.value, reflector, importTracker);
  if (output === null) {
    return null;
  }
  if (output.isRequired) {
    throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_NO_REQUIRED_FUNCTION, output.call, `Output does not support ".required()".`);
  }
  validateAccessOfInitializerApiMember(output, member);
  const optionsNode = output.api.functionName === "output" ? output.call.arguments[0] : output.call.arguments[1];
  const options = optionsNode !== void 0 ? parseAndValidateInputAndOutputOptions(optionsNode) : null;
  const classPropertyName = member.name;
  return {
    call: output.call,
    metadata: {
      // Outputs are not signal-based.
      isSignal: false,
      classPropertyName,
      bindingPropertyName: options?.alias ?? classPropertyName
    }
  };
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/query_functions.js
import { createMayBeForwardRefExpression, outputAst as o } from "@angular/compiler";
import ts15 from "typescript";
var queryFunctionNames = [
  "viewChild",
  "viewChildren",
  "contentChild",
  "contentChildren"
];
var QUERY_INITIALIZER_FNS = queryFunctionNames.map((fnName) => ({
  functionName: fnName,
  owningModule: "@angular/core",
  // Queries are accessed from within static blocks, via the query definition functions.
  // Conceptually, the fields could access private members— even ES private fields.
  // Support for ES private fields requires special caution and complexity when partial
  // output is linked— hence not supported. TS private members are allowed in static blocks.
  allowedAccessLevels: [
    ClassMemberAccessLevel.PublicWritable,
    ClassMemberAccessLevel.PublicReadonly,
    ClassMemberAccessLevel.Protected,
    ClassMemberAccessLevel.Private
  ]
}));
var defaultDescendantsValue = (type) => type !== "contentChildren";
function tryParseSignalQueryFromInitializer(member, reflector, importTracker) {
  if (member.value === null) {
    return null;
  }
  const query = tryParseInitializerApi(QUERY_INITIALIZER_FNS, member.value, reflector, importTracker);
  if (query === null) {
    return null;
  }
  validateAccessOfInitializerApiMember(query, member);
  const { functionName } = query.api;
  const isSingleQuery = functionName === "viewChild" || functionName === "contentChild";
  const predicateNode = query.call.arguments[0];
  if (predicateNode === void 0) {
    throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, query.call, "No locator specified.");
  }
  const optionsNode = query.call.arguments[1];
  if (optionsNode !== void 0 && !ts15.isObjectLiteralExpression(optionsNode)) {
    throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, optionsNode, "Argument needs to be an object literal.");
  }
  const options = optionsNode && reflectObjectLiteral(optionsNode);
  const read = options?.has("read") ? parseReadOption(options.get("read")) : null;
  const descendants = options?.has("descendants") ? parseDescendantsOption(options.get("descendants")) : defaultDescendantsValue(functionName);
  return {
    name: functionName,
    call: query.call,
    metadata: {
      isSignal: true,
      propertyName: member.name,
      static: false,
      emitDistinctChangesOnly: true,
      predicate: parseLocator(predicateNode, reflector),
      first: isSingleQuery,
      read,
      descendants
    }
  };
}
function parseLocator(expression, reflector) {
  const unwrappedExpression = tryUnwrapForwardRef(expression, reflector);
  if (unwrappedExpression !== null) {
    expression = unwrappedExpression;
  }
  if (ts15.isStringLiteralLike(expression)) {
    return [expression.text];
  }
  return createMayBeForwardRefExpression(
    new o.WrappedNodeExpr(expression),
    unwrappedExpression !== null ? 2 : 0
    /* ForwardRefHandling.None */
  );
}
function parseReadOption(value) {
  if (ts15.isExpressionWithTypeArguments(value) || ts15.isParenthesizedExpression(value) || ts15.isAsExpression(value)) {
    return parseReadOption(value.expression);
  }
  if (ts15.isPropertyAccessExpression(value) && ts15.isIdentifier(value.expression) || ts15.isIdentifier(value)) {
    return new o.WrappedNodeExpr(value);
  }
  throw new FatalDiagnosticError(ErrorCode.VALUE_NOT_LITERAL, value, `Query "read" option expected a literal class reference.`);
}
function parseDescendantsOption(value) {
  if (value.kind === ts15.SyntaxKind.TrueKeyword) {
    return true;
  } else if (value.kind === ts15.SyntaxKind.FalseKeyword) {
    return false;
  }
  throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, value, `Expected "descendants" option to be a boolean literal.`);
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/shared.js
var EMPTY_OBJECT = {};
var queryDecoratorNames = [
  "ViewChild",
  "ViewChildren",
  "ContentChild",
  "ContentChildren"
];
var QUERY_TYPES = new Set(queryDecoratorNames);
function extractDirectiveMetadata(clazz, decorator, reflector, importTracker, evaluator, refEmitter, referencesRegistry, isCore, annotateForClosureCompiler, compilationMode, defaultSelector, strictStandalone, implicitStandaloneValue, emitDeclarationOnly, legacyOptionalChaining) {
  let directive;
  if (decorator.args === null || decorator.args.length === 0) {
    directive = /* @__PURE__ */ new Map();
  } else if (decorator.args.length !== 1) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `Incorrect number of arguments to @${decorator.name} decorator`);
  } else {
    const meta = unwrapExpression(decorator.args[0]);
    if (!ts16.isObjectLiteralExpression(meta)) {
      throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, `@${decorator.name} argument must be an object literal`);
    }
    directive = reflectObjectLiteral(meta);
  }
  if (directive.has("jit")) {
    return { jitForced: true };
  }
  const members = reflector.getMembersOfClass(clazz);
  const decoratedElements = members.filter((member) => !member.isStatic && member.decorators !== null);
  const coreModule = isCore ? void 0 : "@angular/core";
  const inputsFromMeta = parseInputsArray(clazz, directive, evaluator, reflector, refEmitter, compilationMode, emitDeclarationOnly);
  const inputsFromFields = parseInputFields(clazz, members, evaluator, reflector, importTracker, refEmitter, isCore, compilationMode, inputsFromMeta, decorator, emitDeclarationOnly);
  const inputs = ClassPropertyMapping.fromMappedObject({ ...inputsFromMeta, ...inputsFromFields });
  const outputsFromMeta = parseOutputsArray(directive, evaluator);
  const outputsFromFields = parseOutputFields(clazz, decorator, members, isCore, reflector, importTracker, evaluator, outputsFromMeta);
  const outputs = ClassPropertyMapping.fromMappedObject({ ...outputsFromMeta, ...outputsFromFields });
  const { viewQueries, contentQueries } = parseQueriesOfClassFields(members, reflector, importTracker, evaluator, isCore);
  if (directive.has("queries")) {
    const signalQueryFields = new Set([...viewQueries, ...contentQueries].filter((q) => q.isSignal).map((q) => q.propertyName));
    const queriesFromDecorator = extractQueriesFromDecorator(directive.get("queries"), reflector, evaluator, isCore);
    const checkAndUnwrapQuery = (q) => {
      if (signalQueryFields.has(q.metadata.propertyName)) {
        throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_DECORATOR_METADATA_COLLISION, q.expr, `Query is declared multiple times. "@${decorator.name}" declares a query for the same property.`);
      }
      return q.metadata;
    };
    contentQueries.push(...queriesFromDecorator.content.map((q) => checkAndUnwrapQuery(q)));
    viewQueries.push(...queriesFromDecorator.view.map((q) => checkAndUnwrapQuery(q)));
  }
  let selector = defaultSelector;
  if (directive.has("selector")) {
    const expr = directive.get("selector");
    const resolved = evaluator.evaluate(expr);
    assertLocalCompilationUnresolvedConst(compilationMode, resolved, null, "Unresolved identifier found for @Component.selector field! Did you import this identifier from a file outside of the compilation unit? This is not allowed when Angular compiler runs in local mode. Possible solutions: 1) Move the declarations into a file within the compilation unit, 2) Inline the selector");
    if (typeof resolved !== "string") {
      throw createValueHasWrongTypeError(expr, resolved, `selector must be a string`);
    }
    selector = resolved === "" ? defaultSelector : resolved;
    if (!selector) {
      throw new FatalDiagnosticError(ErrorCode.DIRECTIVE_MISSING_SELECTOR, expr, `Directive ${clazz.name.text} has no selector, please add it!`);
    }
  }
  const hostBindingNodes = {
    hostObjectLiteralBindings: [],
    hostBindingDecorators: [],
    hostListenerDecorators: [],
    rawNodes: []
  };
  const host = extractHostBindings(decoratedElements, evaluator, coreModule, compilationMode, hostBindingNodes, directive);
  const providers = directive.has("providers") ? new WrappedNodeExpr5(annotateForClosureCompiler ? wrapFunctionExpressionsInParens(directive.get("providers")) : directive.get("providers")) : null;
  const usesOnChanges = members.some((member) => !member.isStatic && member.kind === ClassMemberKind.Method && member.name === "ngOnChanges");
  const controlCreate = extractControlDirectiveDefinition(members);
  let exportAs = null;
  if (directive.has("exportAs")) {
    const expr = directive.get("exportAs");
    const resolved = evaluator.evaluate(expr);
    assertLocalCompilationUnresolvedConst(compilationMode, resolved, null, "Unresolved identifier found for exportAs field! Did you import this identifier from a file outside of the compilation unit? This is not allowed when Angular compiler runs in local mode. Possible solutions: 1) Move the declarations into a file within the compilation unit, 2) Inline the selector");
    if (typeof resolved !== "string") {
      throw createValueHasWrongTypeError(expr, resolved, `exportAs must be a string`);
    }
    exportAs = resolved.split(",").map((part) => part.trim());
  }
  const rawCtorDeps = getConstructorDependencies(clazz, reflector, isCore);
  const ctorDeps = selector !== null ? validateConstructorDependencies(clazz, rawCtorDeps) : unwrapConstructorDependencies(rawCtorDeps);
  const isStructural = ctorDeps !== null && ctorDeps !== "invalid" && ctorDeps.some((dep) => dep.token instanceof ExternalExpr2 && dep.token.value.moduleName === "@angular/core" && dep.token.value.name === "TemplateRef");
  let isStandalone = implicitStandaloneValue;
  if (directive.has("standalone")) {
    const expr = directive.get("standalone");
    const resolved = evaluator.evaluate(expr);
    if (typeof resolved !== "boolean") {
      throw createValueHasWrongTypeError(expr, resolved, `standalone flag must be a boolean`);
    }
    isStandalone = resolved;
    if (!isStandalone && strictStandalone) {
      throw new FatalDiagnosticError(ErrorCode.NON_STANDALONE_NOT_ALLOWED, expr, `Only standalone components/directives are allowed when 'strictStandalone' is enabled.`);
    }
  }
  let isSignal = false;
  if (directive.has("signals")) {
    const expr = directive.get("signals");
    const resolved = evaluator.evaluate(expr);
    if (typeof resolved !== "boolean") {
      throw createValueHasWrongTypeError(expr, resolved, `signals flag must be a boolean`);
    }
    isSignal = resolved;
  }
  const usesInheritance = reflector.hasBaseClass(clazz);
  const sourceFile = clazz.getSourceFile();
  const type = wrapTypeReference(clazz);
  const rawHostDirectives = directive.get("hostDirectives") || null;
  const hostDirectives = rawHostDirectives === null ? null : extractHostDirectives(rawHostDirectives, evaluator, reflector, compilationMode, createForwardRefResolver(isCore), emitDeclarationOnly);
  if (compilationMode !== CompilationMode.LOCAL && hostDirectives !== null) {
    referencesRegistry.add(clazz, ...hostDirectives.map((hostDir) => {
      if (!isHostDirectiveMetaForGlobalMode(hostDir)) {
        throw new Error("Impossible state");
      }
      return hostDir.directive;
    }));
  }
  const metadata = {
    name: clazz.name.text,
    deps: ctorDeps,
    host: {
      ...host
    },
    lifecycle: {
      usesOnChanges
    },
    inputs: inputs.toJointMappedObject(toR3InputMetadata),
    outputs: outputs.toDirectMappedObject(),
    queries: contentQueries,
    viewQueries,
    selector,
    type,
    typeArgumentCount: reflector.getGenericArityOfClass(clazz) || 0,
    typeSourceSpan: createSourceSpan(clazz.name),
    usesInheritance,
    controlCreate,
    exportAs,
    providers,
    isStandalone,
    isSignal,
    hostDirectives: hostDirectives?.map((hostDir) => toHostDirectiveMetadata(hostDir, sourceFile, refEmitter)) || null,
    legacyOptionalChaining
  };
  return {
    jitForced: false,
    decorator: directive,
    metadata,
    inputs,
    outputs,
    isStructural,
    hostDirectives,
    rawHostDirectives,
    hostBindingNodes,
    // Track inputs from class metadata. This is useful for migration efforts.
    inputFieldNamesFromMetadataArray: new Set(Object.values(inputsFromMeta).map((i) => i.classPropertyName))
  };
}
function extractDecoratorQueryMetadata(exprNode, name, args, propertyName, reflector, evaluator) {
  if (args.length === 0) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, exprNode, `@${name} must have arguments`);
  }
  const first = name === "ViewChild" || name === "ContentChild";
  const forwardReferenceTarget = tryUnwrapForwardRef(args[0], reflector);
  const node = forwardReferenceTarget ?? args[0];
  const arg = evaluator.evaluate(node);
  let isStatic = false;
  let predicate = null;
  if (arg instanceof Reference || arg instanceof DynamicValue) {
    predicate = createMayBeForwardRefExpression2(
      new WrappedNodeExpr5(node),
      forwardReferenceTarget !== null ? 2 : 0
      /* ForwardRefHandling.None */
    );
  } else if (typeof arg === "string") {
    predicate = [arg];
  } else if (isStringArrayOrDie(arg, `@${name} predicate`, node)) {
    predicate = arg;
  } else {
    throw createValueHasWrongTypeError(node, arg, `@${name} predicate cannot be interpreted`);
  }
  let read = null;
  let descendants = name !== "ContentChildren";
  let emitDistinctChangesOnly = emitDistinctChangesOnlyDefaultValue;
  if (args.length === 2) {
    const optionsExpr = unwrapExpression(args[1]);
    if (!ts16.isObjectLiteralExpression(optionsExpr)) {
      throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARG_NOT_LITERAL, optionsExpr, `@${name} options must be an object literal`);
    }
    const options = reflectObjectLiteral(optionsExpr);
    if (options.has("read")) {
      read = new WrappedNodeExpr5(options.get("read"));
    }
    if (options.has("descendants")) {
      const descendantsExpr = options.get("descendants");
      const descendantsValue = evaluator.evaluate(descendantsExpr);
      if (typeof descendantsValue !== "boolean") {
        throw createValueHasWrongTypeError(descendantsExpr, descendantsValue, `@${name} options.descendants must be a boolean`);
      }
      descendants = descendantsValue;
    }
    if (options.has("emitDistinctChangesOnly")) {
      const emitDistinctChangesOnlyExpr = options.get("emitDistinctChangesOnly");
      const emitDistinctChangesOnlyValue = evaluator.evaluate(emitDistinctChangesOnlyExpr);
      if (typeof emitDistinctChangesOnlyValue !== "boolean") {
        throw createValueHasWrongTypeError(emitDistinctChangesOnlyExpr, emitDistinctChangesOnlyValue, `@${name} options.emitDistinctChangesOnly must be a boolean`);
      }
      emitDistinctChangesOnly = emitDistinctChangesOnlyValue;
    }
    if (options.has("static")) {
      const staticValue = evaluator.evaluate(options.get("static"));
      if (typeof staticValue !== "boolean") {
        throw createValueHasWrongTypeError(node, staticValue, `@${name} options.static must be a boolean`);
      }
      isStatic = staticValue;
    }
  } else if (args.length > 2) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, node, `@${name} has too many arguments`);
  }
  return {
    isSignal: false,
    propertyName,
    predicate,
    first,
    descendants,
    read,
    static: isStatic,
    emitDistinctChangesOnly
  };
}
function extractHostBindings(members, evaluator, coreModule, compilationMode, hostBindingNodes, metadata) {
  let bindings;
  if (metadata && metadata.has("host")) {
    const hostExpression = metadata.get("host");
    bindings = evaluateHostExpressionBindings(hostExpression, evaluator);
    if (ts16.isObjectLiteralExpression(hostExpression)) {
      hostBindingNodes.rawNodes.push(hostExpression);
      for (const prop of hostExpression.properties) {
        if (ts16.isPropertyAssignment(prop)) {
          hostBindingNodes.hostObjectLiteralBindings.push({
            key: sourceNodeFromTs(prop.name),
            value: sourceNodeFromTs(prop.initializer),
            sourceSpan: createSourceSpan(prop)
          });
        }
      }
    }
  } else {
    bindings = parseHostBindings({});
  }
  filterToMembersWithDecorator(members, "HostBinding", coreModule).forEach(({ member, decorators }) => {
    decorators.forEach((decorator) => {
      let hostPropertyName = member.name;
      if (decorator.args !== null && decorator.args.length > 0) {
        if (decorator.args.length !== 1) {
          throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `@HostBinding can have at most one argument, got ${decorator.args.length} argument(s)`);
        }
        const resolved = evaluator.evaluate(decorator.args[0]);
        assertLocalCompilationUnresolvedConst(compilationMode, resolved, null, "Unresolved identifier found for @HostBinding's argument! Did you import this identifier from a file outside of the compilation unit? This is not allowed when Angular compiler runs in local mode. Possible solutions: 1) Move the declaration into a file within the compilation unit, 2) Inline the argument");
        if (typeof resolved !== "string") {
          throw createValueHasWrongTypeError(decorator.node, resolved, `@HostBinding's argument must be a string`);
        }
        hostPropertyName = resolved;
      }
      if (ts16.isDecorator(decorator.node)) {
        const member2 = decorator.node.parent;
        hostBindingNodes.rawNodes.push(decorator.node.expression);
        if (member2 && ts16.isPropertyDeclaration(member2) && member2.name) {
          const memberName = sourceNodeFromTs(member2.name);
          if (memberName.kind === "string" || memberName.kind === "identifier") {
            hostBindingNodes.hostBindingDecorators.push({
              memberName,
              memberSpan: createSourceSpan(member2),
              arguments: decorator.args === null ? [] : decorator.args.map(sourceNodeFromTs),
              decoratorSpan: createSourceSpan(decorator.node)
            });
          }
        }
      }
      bindings.properties[hostPropertyName] = getSafePropertyAccessString("this", member.name);
    });
  });
  filterToMembersWithDecorator(members, "HostListener", coreModule).forEach(({ member, decorators }) => {
    decorators.forEach((decorator) => {
      let eventName = member.name;
      let args = [];
      if (decorator.args !== null && decorator.args.length > 0) {
        if (decorator.args.length > 2) {
          throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.args[2], `@HostListener can have at most two arguments`);
        }
        const resolved = evaluator.evaluate(decorator.args[0]);
        assertLocalCompilationUnresolvedConst(compilationMode, resolved, null, "Unresolved identifier found for @HostListener's event name argument! Did you import this identifier from a file outside of the compilation unit? This is not allowed when Angular compiler runs in local mode. Possible solutions: 1) Move the declaration into a file within the compilation unit, 2) Inline the argument");
        if (typeof resolved !== "string") {
          throw createValueHasWrongTypeError(decorator.args[0], resolved, `@HostListener's event name argument must be a string`);
        }
        eventName = resolved;
        if (decorator.args.length === 2) {
          const expression = decorator.args[1];
          const resolvedArgs = evaluator.evaluate(decorator.args[1]);
          if (!isStringArrayOrDie(resolvedArgs, "@HostListener.args", expression)) {
            throw createValueHasWrongTypeError(decorator.args[1], resolvedArgs, `@HostListener's second argument must be a string array`);
          }
          args = resolvedArgs;
        }
      }
      if (ts16.isDecorator(decorator.node)) {
        const member2 = decorator.node.parent;
        hostBindingNodes.rawNodes.push(decorator.node.expression);
        if (member2 && ts16.isMethodDeclaration(member2) && member2.name) {
          const memberName = sourceNodeFromTs(member2.name);
          if (memberName.kind === "string" || memberName.kind === "identifier") {
            let eventName2 = null;
            let args2;
            if (decorator.args !== null && decorator.args.length > 0) {
              eventName2 = sourceNodeFromTs(decorator.args[0]);
              args2 = decorator.args.length > 1 && ts16.isArrayLiteralExpression(decorator.args[1]) ? decorator.args[1].elements.map(sourceNodeFromTs) : [];
            }
            hostBindingNodes.hostListenerDecorators.push({
              eventName: eventName2,
              memberName,
              memberSpan: createSourceSpan(member2),
              arguments: args2 ?? [],
              decoratorSpan: createSourceSpan(decorator.node)
            });
          }
        }
      }
      bindings.listeners[eventName] = `${member.name}(${args.join(",")})`;
    });
  });
  return bindings;
}
function sourceNodeFromTs(node) {
  const sourceSpan = createSourceSpan(node);
  if (ts16.isStringLiteralLike(node) || ts16.isIdentifier(node)) {
    if (ts16.isStringLiteralLike(node)) {
      sourceSpan.fullStart = sourceSpan.fullStart.moveBy(1);
      sourceSpan.start = sourceSpan.start.moveBy(1);
      sourceSpan.end = sourceSpan.end.moveBy(-1);
    }
    return {
      kind: ts16.isIdentifier(node) ? "identifier" : "string",
      sourceSpan,
      source: node.getText(),
      text: node.text
    };
  }
  return { kind: "unspecified", sourceSpan };
}
function extractQueriesFromDecorator(queryData, reflector, evaluator, isCore) {
  const content = [];
  const view = [];
  if (!ts16.isObjectLiteralExpression(queryData)) {
    throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, queryData, "Decorator queries metadata must be an object literal");
  }
  reflectObjectLiteral(queryData).forEach((queryExpr, propertyName) => {
    queryExpr = unwrapExpression(queryExpr);
    if (!ts16.isNewExpression(queryExpr)) {
      throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, queryData, "Decorator query metadata must be an instance of a query type");
    }
    const queryType = ts16.isPropertyAccessExpression(queryExpr.expression) ? queryExpr.expression.name : queryExpr.expression;
    if (!ts16.isIdentifier(queryType)) {
      throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, queryData, "Decorator query metadata must be an instance of a query type");
    }
    const type = reflector.getImportOfIdentifier(queryType);
    if (type === null || !isCore && type.from !== "@angular/core" || !QUERY_TYPES.has(type.name)) {
      throw new FatalDiagnosticError(ErrorCode.VALUE_HAS_WRONG_TYPE, queryData, "Decorator query metadata must be an instance of a query type");
    }
    const query = extractDecoratorQueryMetadata(queryExpr, type.name, queryExpr.arguments || [], propertyName, reflector, evaluator);
    if (type.name.startsWith("Content")) {
      content.push({ expr: queryExpr, metadata: query });
    } else {
      view.push({ expr: queryExpr, metadata: query });
    }
  });
  return { content, view };
}
function parseDirectiveStyles(directive, evaluator, compilationMode) {
  const expression = directive.get("styles");
  if (!expression) {
    return null;
  }
  const evaluated = evaluator.evaluate(expression);
  const value = typeof evaluated === "string" ? [evaluated] : evaluated;
  if (compilationMode === CompilationMode.LOCAL) {
    let unresolvedNode = null;
    if (Array.isArray(value)) {
      const entry = value.find((e) => e instanceof DynamicValue && e.isFromUnknownIdentifier());
      unresolvedNode = entry?.node ?? null;
    } else if (value instanceof DynamicValue && value.isFromUnknownIdentifier()) {
      unresolvedNode = value.node;
    }
    if (unresolvedNode !== null) {
      throw new FatalDiagnosticError(ErrorCode.LOCAL_COMPILATION_UNRESOLVED_CONST, unresolvedNode, "Unresolved identifier found for @Component.styles field! Did you import this identifier from a file outside of the compilation unit? This is not allowed when Angular compiler runs in local mode. Possible solutions: 1) Move the declarations into a file within the compilation unit, 2) Inline the styles, 3) Move the styles into separate files and include it using @Component.styleUrls");
    }
  }
  if (!isStringArrayOrDie(value, "styles", expression)) {
    throw createValueHasWrongTypeError(expression, value, `Failed to resolve @Component.styles to a string or an array of strings`);
  }
  return value;
}
function parseFieldStringArrayValue(directive, field, evaluator) {
  if (!directive.has(field)) {
    return null;
  }
  const expression = directive.get(field);
  const value = evaluator.evaluate(expression);
  if (!isStringArrayOrDie(value, field, expression)) {
    throw createValueHasWrongTypeError(expression, value, `Failed to resolve @Directive.${field} to a string array`);
  }
  return value;
}
function getDirectiveUndecoratedMetadataExtractor(reflector, importTracker) {
  return (member) => {
    const input = tryParseSignalInputMapping(member, reflector, importTracker);
    if (input !== null) {
      return getDecoratorMetaArray([
        [new ExternalExpr2(R3Identifiers.inputDecorator), memberMetadataFromSignalInput(input)]
      ]);
    }
    const output = tryParseInitializerBasedOutput(member, reflector, importTracker);
    if (output !== null) {
      return getDecoratorMetaArray([
        [
          new ExternalExpr2(R3Identifiers.outputDecorator),
          memberMetadataFromInitializerOutput(output.metadata)
        ]
      ]);
    }
    const model = tryParseSignalModelMapping(member, reflector, importTracker);
    if (model !== null) {
      return getDecoratorMetaArray([
        [
          new ExternalExpr2(R3Identifiers.inputDecorator),
          memberMetadataFromSignalInput(model.input)
        ],
        [
          new ExternalExpr2(R3Identifiers.outputDecorator),
          memberMetadataFromInitializerOutput(model.output)
        ]
      ]);
    }
    const query = tryParseSignalQueryFromInitializer(member, reflector, importTracker);
    if (query !== null) {
      let identifier;
      if (query.name === "viewChild") {
        identifier = R3Identifiers.viewChildDecorator;
      } else if (query.name === "viewChildren") {
        identifier = R3Identifiers.viewChildrenDecorator;
      } else if (query.name === "contentChild") {
        identifier = R3Identifiers.contentChildDecorator;
      } else if (query.name === "contentChildren") {
        identifier = R3Identifiers.contentChildrenDecorator;
      } else {
        return null;
      }
      return getDecoratorMetaArray([
        [new ExternalExpr2(identifier), memberMetadataFromSignalQuery(query.call)]
      ]);
    }
    return null;
  };
}
function getDecoratorMetaArray(decorators) {
  return new LiteralArrayExpr2(decorators.map(([type, args]) => literalMap2([
    { key: "type", value: type, quoted: false },
    { key: "args", value: args, quoted: false }
  ])));
}
function memberMetadataFromSignalInput(input) {
  return new LiteralArrayExpr2([
    literalMap2([
      {
        key: "isSignal",
        value: literal2(true),
        quoted: false
      },
      {
        key: "alias",
        value: literal2(input.bindingPropertyName),
        quoted: false
      },
      {
        key: "required",
        value: literal2(input.required),
        quoted: false
      }
    ])
  ]);
}
function memberMetadataFromInitializerOutput(output) {
  return new LiteralArrayExpr2([literal2(output.bindingPropertyName)]);
}
function memberMetadataFromSignalQuery(call) {
  const firstArg = call.arguments[0];
  const firstArgMeta = ts16.isStringLiteralLike(firstArg) || ts16.isCallExpression(firstArg) ? new WrappedNodeExpr5(firstArg) : (
    // If the first argument is a class reference, we need to wrap it in a `forwardRef`
    // because the reference might occur after the current class. This wouldn't be flagged
    // on the query initializer, because it executes after the class is initialized, whereas
    // `setClassMetadata` runs immediately.
    new ExternalExpr2(R3Identifiers.forwardRef).callFn([
      new ArrowFunctionExpr2([], new WrappedNodeExpr5(firstArg))
    ])
  );
  const entries = [
    // We use wrapped nodes here, because the output AST doesn't support spread assignments.
    firstArgMeta,
    new WrappedNodeExpr5(ts16.factory.createObjectLiteralExpression([
      ...call.arguments.length > 1 ? [ts16.factory.createSpreadAssignment(call.arguments[1])] : [],
      ts16.factory.createPropertyAssignment("isSignal", ts16.factory.createTrue())
    ]))
  ];
  return new LiteralArrayExpr2(entries);
}
function isStringArrayOrDie(value, name, node) {
  if (!Array.isArray(value)) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== "string") {
      throw createValueHasWrongTypeError(node, value[i], `Failed to resolve ${name} at position ${i} to a string`);
    }
  }
  return true;
}
function tryGetQueryFromFieldDecorator(member, reflector, evaluator, isCore) {
  const decorators = member.decorators;
  if (decorators === null) {
    return null;
  }
  const queryDecorators = getAngularDecorators(decorators, queryDecoratorNames, isCore);
  if (queryDecorators.length === 0) {
    return null;
  }
  if (queryDecorators.length !== 1) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_COLLISION, member.node ?? queryDecorators[0].node, "Cannot combine multiple query decorators.");
  }
  const decorator = queryDecorators[0];
  const node = member.node || decorator.node;
  if (decorators.some((v) => v.name === "Input")) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_COLLISION, node, "Cannot combine @Input decorators with query decorators");
  }
  if (!isPropertyTypeMember(member)) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_UNEXPECTED, node, "Query decorator must go on a property-type member");
  }
  const name = decorator.import?.name ?? decorator.name;
  return {
    name,
    decorator,
    metadata: extractDecoratorQueryMetadata(node, name, decorator.args || [], member.name, reflector, evaluator)
  };
}
function isPropertyTypeMember(member) {
  return member.kind === ClassMemberKind.Getter || member.kind === ClassMemberKind.Setter || member.kind === ClassMemberKind.Property;
}
function parseMappingStringArray(values) {
  return values.reduce((results, value) => {
    if (typeof value !== "string") {
      throw new Error("Mapping value must be a string");
    }
    const [bindingPropertyName, fieldName] = parseMappingString(value);
    results[fieldName] = bindingPropertyName;
    return results;
  }, {});
}
function parseMappingString(value) {
  const [fieldName, bindingPropertyName] = value.split(":", 2).map((str) => str.trim());
  return [bindingPropertyName ?? fieldName, fieldName];
}
function parseInputsArray(clazz, decoratorMetadata, evaluator, reflector, refEmitter, compilationMode, emitDeclarationOnly) {
  const inputsField = decoratorMetadata.get("inputs");
  if (inputsField === void 0) {
    return {};
  }
  const inputs = {};
  const inputsArray = evaluator.evaluate(inputsField);
  if (!Array.isArray(inputsArray)) {
    throw createValueHasWrongTypeError(inputsField, inputsArray, `Failed to resolve @Directive.inputs to an array`);
  }
  for (let i = 0; i < inputsArray.length; i++) {
    const value = inputsArray[i];
    if (typeof value === "string") {
      const [bindingPropertyName, classPropertyName] = parseMappingString(value);
      inputs[classPropertyName] = {
        bindingPropertyName,
        classPropertyName,
        required: false,
        transform: null,
        // Note: Signal inputs are not allowed with the array form.
        isSignal: false
      };
    } else if (value instanceof Map) {
      const name = value.get("name");
      const alias = value.get("alias");
      const required = value.get("required");
      let transform = null;
      if (typeof name !== "string") {
        throw createValueHasWrongTypeError(inputsField, name, `Value at position ${i} of @Directive.inputs array must have a "name" property`);
      }
      if (value.has("transform")) {
        const transformValue = value.get("transform");
        if (!(transformValue instanceof DynamicValue) && !(transformValue instanceof Reference)) {
          throw createValueHasWrongTypeError(inputsField, transformValue, `Transform of value at position ${i} of @Directive.inputs array must be a function`);
        }
        transform = parseDecoratorInputTransformFunction(clazz, name, transformValue, reflector, refEmitter, compilationMode, emitDeclarationOnly);
      }
      inputs[name] = {
        classPropertyName: name,
        bindingPropertyName: typeof alias === "string" ? alias : name,
        required: required === true,
        // Note: Signal inputs are not allowed with the array form.
        isSignal: false,
        transform
      };
    } else {
      throw createValueHasWrongTypeError(inputsField, value, `@Directive.inputs array can only contain strings or object literals`);
    }
  }
  return inputs;
}
function tryGetDecoratorOnMember(member, decoratorName, isCore) {
  if (member.decorators === null) {
    return null;
  }
  for (const decorator of member.decorators) {
    if (isAngularDecorator2(decorator, decoratorName, isCore)) {
      return decorator;
    }
  }
  return null;
}
function tryParseInputFieldMapping(clazz, member, evaluator, reflector, importTracker, isCore, refEmitter, compilationMode, emitDeclarationOnly) {
  const classPropertyName = member.name;
  const decorator = tryGetDecoratorOnMember(member, "Input", isCore);
  const signalInputMapping = tryParseSignalInputMapping(member, reflector, importTracker);
  const modelInputMapping = tryParseSignalModelMapping(member, reflector, importTracker);
  if (decorator !== null && signalInputMapping !== null) {
    throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_WITH_DISALLOWED_DECORATOR, decorator.node, `Using @Input with a signal input is not allowed.`);
  }
  if (decorator !== null && modelInputMapping !== null) {
    throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_WITH_DISALLOWED_DECORATOR, decorator.node, `Using @Input with a model input is not allowed.`);
  }
  if (decorator !== null) {
    if (decorator.args !== null && decorator.args.length > 1) {
      throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `@${decorator.name} can have at most one argument, got ${decorator.args.length} argument(s)`);
    }
    const optionsNode = decorator.args !== null && decorator.args.length === 1 ? decorator.args[0] : void 0;
    const options = optionsNode !== void 0 ? evaluator.evaluate(optionsNode) : null;
    const required = options instanceof Map ? options.get("required") === true : false;
    if (options !== null && typeof options !== "string" && !(options instanceof Map)) {
      throw createValueHasWrongTypeError(decorator.node, options, `@${decorator.name} decorator argument must resolve to a string or an object literal`);
    }
    let alias = null;
    if (typeof options === "string") {
      alias = options;
    } else if (options instanceof Map && typeof options.get("alias") === "string") {
      alias = options.get("alias");
    }
    const publicInputName = alias ?? classPropertyName;
    let transform = null;
    if (options instanceof Map && options.has("transform")) {
      const transformValue = options.get("transform");
      if (!(transformValue instanceof DynamicValue) && !(transformValue instanceof Reference)) {
        throw createValueHasWrongTypeError(optionsNode, transformValue, `Input transform must be a function`);
      }
      transform = parseDecoratorInputTransformFunction(clazz, classPropertyName, transformValue, reflector, refEmitter, compilationMode, emitDeclarationOnly);
    }
    return {
      isSignal: false,
      classPropertyName,
      bindingPropertyName: publicInputName,
      transform,
      required
    };
  }
  if (signalInputMapping !== null) {
    return signalInputMapping;
  }
  if (modelInputMapping !== null) {
    return modelInputMapping.input;
  }
  return null;
}
function parseInputFields(clazz, members, evaluator, reflector, importTracker, refEmitter, isCore, compilationMode, inputsFromClassDecorator, classDecorator, emitDeclarationOnly) {
  const inputs = {};
  const bindings = /* @__PURE__ */ new Map();
  for (const member of members) {
    const classPropertyName = member.name;
    const inputMapping = tryParseInputFieldMapping(clazz, member, evaluator, reflector, importTracker, isCore, refEmitter, compilationMode, emitDeclarationOnly);
    if (inputMapping === null) {
      continue;
    }
    const bindingPropertyName = inputMapping.bindingPropertyName;
    if (bindings.has(bindingPropertyName)) {
      const firstMember = bindings.get(bindingPropertyName);
      throw new FatalDiagnosticError(ErrorCode.DUPLICATE_BINDING_NAME, member.node ?? clazz, `Input '${bindingPropertyName}' is bound to both '${firstMember.name}' and '${member.name}'.`, [makeRelatedInformation(firstMember.node ?? clazz, `The first binding is declared here.`)]);
    }
    bindings.set(bindingPropertyName, member);
    if (member.isStatic) {
      throw new FatalDiagnosticError(ErrorCode.INCORRECTLY_DECLARED_ON_STATIC_MEMBER, member.node ?? clazz, `Input "${member.name}" is incorrectly declared as static member of "${clazz.name.text}".`);
    }
    if (inputMapping.isSignal && inputsFromClassDecorator.hasOwnProperty(classPropertyName)) {
      throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_DECORATOR_METADATA_COLLISION, member.node ?? clazz, `Input "${member.name}" is also declared as non-signal in @${classDecorator.name}.`);
    }
    inputs[classPropertyName] = inputMapping;
  }
  return inputs;
}
function parseDecoratorInputTransformFunction(clazz, classPropertyName, value, reflector, refEmitter, compilationMode, emitDeclarationOnly) {
  if (emitDeclarationOnly) {
    if (ts16.isArrowFunction(value.node) || ts16.isFunctionExpression(value.node)) {
      const firstParamName = value.node.parameters[0]?.name;
      const firstParam2 = firstParamName !== void 0 && ts16.isIdentifier(firstParamName) && firstParamName.text === "this" ? value.node.parameters[1] : value.node.parameters[0];
      if (!firstParam2) {
        const ref2 = new Reference(ts16.factory.createKeywordTypeNode(ts16.SyntaxKind.UnknownKeyword));
        ref2.synthetic = true;
        return {
          node: value.node,
          type: ref2
        };
      }
      if (!firstParam2.type) {
        throw createValueHasWrongTypeError(value.node, value, "Input transform function first parameter must have a type");
      }
      if (firstParam2.dotDotDotToken) {
        throw createValueHasWrongTypeError(value.node, value, "Input transform function first parameter cannot be a spread parameter");
      }
      const ref = new Reference(firstParam2.type);
      ref.synthetic = true;
      return {
        node: value.node,
        type: ref
      };
    }
    const node2 = value instanceof Reference ? value.getIdentityIn(clazz.getSourceFile()) : value.node;
    const entityName = node2 ? expressionToEntityName(node2) : null;
    if (entityName !== null) {
      const typeQuery = ts16.factory.createTypeQueryNode(entityName);
      const parametersType = ts16.factory.createTypeReferenceNode("Parameters", [typeQuery]);
      const indexedAccess = ts16.factory.createIndexedAccessTypeNode(parametersType, ts16.factory.createLiteralTypeNode(ts16.factory.createNumericLiteral("0")));
      const ref = new Reference(indexedAccess);
      ref.synthetic = true;
      return {
        node: value.node,
        type: ref
      };
    }
    throw createValueHasWrongTypeError(value.node, value, "Input transform function could not be referenced");
  }
  if (compilationMode === CompilationMode.LOCAL) {
    const node2 = value instanceof Reference ? value.getIdentityIn(clazz.getSourceFile()) : value.node;
    if (node2 === null) {
      throw createValueHasWrongTypeError(value.node, value, "Input transform function could not be referenced");
    }
    return {
      node: node2,
      type: new Reference(ts16.factory.createKeywordTypeNode(ts16.SyntaxKind.UnknownKeyword))
    };
  }
  const definition = reflector.getDefinitionOfFunction(value.node);
  if (definition === null) {
    throw createValueHasWrongTypeError(value.node, value, "Input transform must be a function");
  }
  if (definition.typeParameters !== null && definition.typeParameters.length > 0) {
    throw createValueHasWrongTypeError(value.node, value, "Input transform function cannot be generic");
  }
  if (definition.signatureCount > 1) {
    throw createValueHasWrongTypeError(value.node, value, "Input transform function cannot have multiple signatures");
  }
  const members = reflector.getMembersOfClass(clazz);
  for (const member of members) {
    const conflictingName = `ngAcceptInputType_${classPropertyName}`;
    if (member.name === conflictingName && member.isStatic) {
      throw new FatalDiagnosticError(ErrorCode.CONFLICTING_INPUT_TRANSFORM, value.node, `Class cannot have both a transform function on Input ${classPropertyName} and a static member called ${conflictingName}`);
    }
  }
  const node = value instanceof Reference ? value.getIdentityIn(clazz.getSourceFile()) : value.node;
  if (node === null) {
    throw createValueHasWrongTypeError(value.node, value, "Input transform function could not be referenced");
  }
  const firstParam = definition.parameters[0]?.name === "this" ? definition.parameters[1] : definition.parameters[0];
  if (!firstParam) {
    return {
      node,
      type: new Reference(ts16.factory.createKeywordTypeNode(ts16.SyntaxKind.UnknownKeyword))
    };
  }
  if (!firstParam.type) {
    throw createValueHasWrongTypeError(value.node, value, "Input transform function first parameter must have a type");
  }
  if (firstParam.node.dotDotDotToken) {
    throw createValueHasWrongTypeError(value.node, value, "Input transform function first parameter cannot be a spread parameter");
  }
  assertEmittableInputType(firstParam.type, clazz.getSourceFile(), reflector, refEmitter);
  const viaModule = value instanceof Reference ? value.bestGuessOwningModule : null;
  return { node, type: new Reference(firstParam.type, viaModule) };
}
function assertEmittableInputType(type, contextFile, reflector, refEmitter) {
  (function walk(node) {
    if (ts16.isTypeReferenceNode(node) && ts16.isIdentifier(node.typeName)) {
      const declaration = reflector.getDeclarationOfIdentifier(node.typeName);
      if (declaration !== null) {
        if (declaration.node.getSourceFile() !== contextFile) {
          const emittedType = refEmitter.emit(new Reference(declaration.node, declaration.viaModule === AmbientImport ? AmbientImport : null), contextFile, ImportFlags.NoAliasing | ImportFlags.AllowTypeImports | ImportFlags.AllowRelativeDtsImports | ImportFlags.AllowAmbientReferences);
          assertSuccessfulReferenceEmit(emittedType, node, "type");
        } else if (!reflector.isStaticallyExported(declaration.node)) {
          throw new FatalDiagnosticError(ErrorCode.SYMBOL_NOT_EXPORTED, type, `Symbol must be exported in order to be used as the type of an Input transform function`, [makeRelatedInformation(declaration.node, `The symbol is declared here.`)]);
        }
      }
    }
    node.forEachChild(walk);
  })(type);
}
function extractControlDirectiveDefinition(members) {
  const controlCreateMember = members.find((member) => !member.isStatic && member.kind === ClassMemberKind.Method && member.name === "\u0275ngControlCreate");
  if (controlCreateMember === void 0 || controlCreateMember.node === null || !ts16.isMethodDeclaration(controlCreateMember.node)) {
    return null;
  }
  const { node } = controlCreateMember;
  if (node.parameters.length === 0 || node.parameters[0].type === void 0 || !ts16.isTypeReferenceNode(node.parameters[0].type)) {
    return { passThroughInput: null };
  }
  const type = node.parameters[0].type;
  if (type.typeArguments?.length !== 1 || !ts16.isLiteralTypeNode(type.typeArguments[0]) || !ts16.isStringLiteral(type.typeArguments[0].literal)) {
    return { passThroughInput: null };
  }
  return { passThroughInput: type.typeArguments[0].literal.text };
}
function parseQueriesOfClassFields(members, reflector, importTracker, evaluator, isCore) {
  const viewQueries = [];
  const contentQueries = [];
  const decoratorViewChild = [];
  const decoratorViewChildren = [];
  const decoratorContentChild = [];
  const decoratorContentChildren = [];
  for (const member of members) {
    const decoratorQuery = tryGetQueryFromFieldDecorator(member, reflector, evaluator, isCore);
    const signalQuery = tryParseSignalQueryFromInitializer(member, reflector, importTracker);
    if (decoratorQuery !== null && signalQuery !== null) {
      throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_WITH_DISALLOWED_DECORATOR, decoratorQuery.decorator.node, `Using @${decoratorQuery.name} with a signal-based query is not allowed.`);
    }
    const queryNode = decoratorQuery?.decorator.node ?? signalQuery?.call;
    if (queryNode !== void 0 && member.isStatic) {
      throw new FatalDiagnosticError(ErrorCode.INCORRECTLY_DECLARED_ON_STATIC_MEMBER, queryNode, `Query is incorrectly declared on a static class member.`);
    }
    if (decoratorQuery !== null) {
      switch (decoratorQuery.name) {
        case "ViewChild":
          decoratorViewChild.push(decoratorQuery.metadata);
          break;
        case "ViewChildren":
          decoratorViewChildren.push(decoratorQuery.metadata);
          break;
        case "ContentChild":
          decoratorContentChild.push(decoratorQuery.metadata);
          break;
        case "ContentChildren":
          decoratorContentChildren.push(decoratorQuery.metadata);
          break;
      }
    } else if (signalQuery !== null) {
      switch (signalQuery.name) {
        case "viewChild":
        case "viewChildren":
          viewQueries.push(signalQuery.metadata);
          break;
        case "contentChild":
        case "contentChildren":
          contentQueries.push(signalQuery.metadata);
          break;
      }
    }
  }
  return {
    viewQueries: [...viewQueries, ...decoratorViewChild, ...decoratorViewChildren],
    contentQueries: [...contentQueries, ...decoratorContentChild, ...decoratorContentChildren]
  };
}
function parseOutputsArray(directive, evaluator) {
  const metaValues = parseFieldStringArrayValue(directive, "outputs", evaluator);
  return metaValues ? parseMappingStringArray(metaValues) : EMPTY_OBJECT;
}
function parseOutputFields(clazz, classDecorator, members, isCore, reflector, importTracker, evaluator, outputsFromMeta) {
  const outputs = {};
  const bindings = /* @__PURE__ */ new Map();
  for (const member of members) {
    const decoratorOutput = tryParseDecoratorOutput(member, evaluator, isCore);
    const initializerOutput = tryParseInitializerBasedOutput(member, reflector, importTracker);
    const modelMapping = tryParseSignalModelMapping(member, reflector, importTracker);
    if (decoratorOutput !== null && initializerOutput !== null) {
      throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_WITH_DISALLOWED_DECORATOR, decoratorOutput.decorator.node, `Using "@Output" with "output()" is not allowed.`);
    }
    if (decoratorOutput !== null && modelMapping !== null) {
      throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_WITH_DISALLOWED_DECORATOR, decoratorOutput.decorator.node, `Using @Output with a model input is not allowed.`);
    }
    const queryNode = decoratorOutput?.decorator.node ?? initializerOutput?.call ?? modelMapping?.call;
    if (queryNode !== void 0 && member.isStatic) {
      throw new FatalDiagnosticError(ErrorCode.INCORRECTLY_DECLARED_ON_STATIC_MEMBER, queryNode, `Output is incorrectly declared on a static class member.`);
    }
    let bindingPropertyName;
    if (decoratorOutput !== null) {
      bindingPropertyName = decoratorOutput.metadata.bindingPropertyName;
    } else if (initializerOutput !== null) {
      bindingPropertyName = initializerOutput.metadata.bindingPropertyName;
    } else if (modelMapping !== null) {
      bindingPropertyName = modelMapping.output.bindingPropertyName;
    } else {
      continue;
    }
    if (bindings.has(bindingPropertyName)) {
      const firstMember = bindings.get(bindingPropertyName);
      throw new FatalDiagnosticError(ErrorCode.DUPLICATE_BINDING_NAME, member.node ?? clazz, `Output '${bindingPropertyName}' is bound to both '${firstMember.name}' and '${member.name}'.`, [makeRelatedInformation(firstMember.node ?? clazz, `The first binding is declared here.`)]);
    }
    bindings.set(bindingPropertyName, member);
    if ((initializerOutput !== null || modelMapping !== null) && outputsFromMeta.hasOwnProperty(member.name)) {
      throw new FatalDiagnosticError(ErrorCode.INITIALIZER_API_DECORATOR_METADATA_COLLISION, member.node ?? clazz, `Output "${member.name}" is unexpectedly declared in @${classDecorator.name} as well.`);
    }
    outputs[member.name] = bindingPropertyName;
  }
  return outputs;
}
function tryParseDecoratorOutput(member, evaluator, isCore) {
  const decorator = tryGetDecoratorOnMember(member, "Output", isCore);
  if (decorator === null) {
    return null;
  }
  if (decorator.args !== null && decorator.args.length > 1) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `@Output can have at most one argument, got ${decorator.args.length} argument(s)`);
  }
  const classPropertyName = member.name;
  let alias = null;
  if (decorator.args?.length === 1) {
    const resolvedAlias = evaluator.evaluate(decorator.args[0]);
    if (typeof resolvedAlias !== "string") {
      throw createValueHasWrongTypeError(decorator.node, resolvedAlias, `@Output decorator argument must resolve to a string`);
    }
    alias = resolvedAlias;
  }
  return {
    decorator,
    metadata: {
      isSignal: false,
      classPropertyName,
      bindingPropertyName: alias ?? classPropertyName
    }
  };
}
function evaluateHostExpressionBindings(hostExpr, evaluator) {
  const hostMetaMap = evaluator.evaluate(hostExpr);
  if (!(hostMetaMap instanceof Map)) {
    throw createValueHasWrongTypeError(hostExpr, hostMetaMap, `Decorator host metadata must be an object`);
  }
  const hostMetadata = {};
  hostMetaMap.forEach((value, key) => {
    if (value instanceof EnumValue) {
      value = value.resolved;
    }
    if (typeof key !== "string") {
      throw createValueHasWrongTypeError(hostExpr, key, `Decorator host metadata must be a string -> string object, but found unparseable key`);
    }
    if (typeof value == "string") {
      hostMetadata[key] = value;
    } else if (value instanceof DynamicValue) {
      hostMetadata[key] = new WrappedNodeExpr5(value.node);
    } else {
      throw createValueHasWrongTypeError(hostExpr, value, `Decorator host metadata must be a string -> string object, but found unparseable value`);
    }
  });
  let bindings;
  try {
    bindings = parseHostBindings(hostMetadata);
  } catch (e) {
    throw new FatalDiagnosticError(ErrorCode.HOST_BINDING_PARSE_ERROR, hostExpr, e.message);
  }
  const errors = verifyHostBindings(bindings, createSourceSpan(hostExpr));
  if (errors.length > 0) {
    throw new FatalDiagnosticError(ErrorCode.HOST_BINDING_PARSE_ERROR, getHostBindingErrorNode(errors[0], hostExpr), errors.map((error) => error.msg).join("\n"));
  }
  return bindings;
}
function getHostBindingErrorNode(error, hostExpr) {
  if (ts16.isObjectLiteralExpression(hostExpr)) {
    for (const prop of hostExpr.properties) {
      if (ts16.isPropertyAssignment(prop) && ts16.isStringLiteralLike(prop.initializer) && error.msg.includes(`[${prop.initializer.text}]`)) {
        return prop.initializer;
      }
    }
  }
  return hostExpr;
}
function extractHostDirectives(rawHostDirectives, evaluator, reflector, compilationMode, forwardRefResolver, emitDeclarationOnly) {
  const resolved = evaluator.evaluate(rawHostDirectives, forwardRefResolver);
  if (!Array.isArray(resolved)) {
    throw createValueHasWrongTypeError(rawHostDirectives, resolved, "hostDirectives must be an array");
  }
  return resolved.map((value) => {
    const hostReference = value instanceof Map ? value.get("directive") : value;
    if (compilationMode !== CompilationMode.LOCAL) {
      if (!(hostReference instanceof Reference)) {
        throw createValueHasWrongTypeError(rawHostDirectives, hostReference, "Host directive must be a reference");
      }
      if (!isNamedClassDeclaration(hostReference.node)) {
        throw createValueHasWrongTypeError(rawHostDirectives, hostReference, "Host directive reference must be a class");
      }
    }
    let directive;
    let nameForErrors = (fieldName) => "@Directive.hostDirectives";
    if (compilationMode === CompilationMode.LOCAL && hostReference instanceof DynamicValue) {
      if (!ts16.isIdentifier(hostReference.node) && !ts16.isPropertyAccessExpression(hostReference.node)) {
        const compilationModeName = emitDeclarationOnly ? "experimental declaration-only emission" : "local compilation";
        throw new FatalDiagnosticError(ErrorCode.LOCAL_COMPILATION_UNSUPPORTED_EXPRESSION, hostReference.node, `In ${compilationModeName} mode, host directive cannot be an expression. Use an identifier instead`);
      }
      directive = new WrappedNodeExpr5(hostReference.node);
    } else if (hostReference instanceof Reference) {
      directive = hostReference;
      nameForErrors = (fieldName) => `@Directive.hostDirectives.${directive.node.name.text}.${fieldName}`;
    } else {
      throw new Error("Impossible state");
    }
    const meta = {
      directive,
      isForwardReference: hostReference instanceof Reference && hostReference.synthetic,
      inputs: parseHostDirectivesMapping("inputs", value, nameForErrors("input"), rawHostDirectives),
      outputs: parseHostDirectivesMapping("outputs", value, nameForErrors("output"), rawHostDirectives)
    };
    return meta;
  });
}
function parseHostDirectivesMapping(field, resolvedValue, nameForErrors, sourceExpression) {
  if (resolvedValue instanceof Map && resolvedValue.has(field)) {
    const rawInputs = resolvedValue.get(field);
    if (isStringArrayOrDie(rawInputs, nameForErrors, sourceExpression)) {
      return parseMappingStringArray(rawInputs);
    }
  }
  return null;
}
function toHostDirectiveMetadata(hostDirective, context, refEmitter) {
  let directive;
  if (hostDirective.directive instanceof Reference) {
    directive = toR3Reference(hostDirective.directive.node, hostDirective.directive, context, refEmitter);
  } else if (hostDirective.directive instanceof ExternalReference) {
    directive = {
      value: new ExternalExpr2(hostDirective.directive),
      type: new ExternalExpr2(hostDirective.directive)
    };
  } else {
    directive = {
      value: hostDirective.directive,
      type: hostDirective.directive
    };
  }
  return {
    directive,
    isForwardReference: hostDirective.isForwardReference,
    inputs: hostDirective.inputs || null,
    outputs: hostDirective.outputs || null
  };
}
function toR3InputMetadata(mapping) {
  return {
    classPropertyName: mapping.classPropertyName,
    bindingPropertyName: mapping.bindingPropertyName,
    required: mapping.required,
    transformFunction: mapping.transform !== null ? new WrappedNodeExpr5(mapping.transform.node) : null,
    isSignal: mapping.isSignal
  };
}
function extractHostBindingResources(nodes) {
  const result = /* @__PURE__ */ new Set();
  for (const node of nodes.rawNodes) {
    result.add({ path: null, node });
  }
  return result;
}
function expressionToEntityName(expr) {
  if (ts16.isIdentifier(expr)) {
    return expr;
  }
  if (ts16.isPropertyAccessExpression(expr) && ts16.isIdentifier(expr.name)) {
    const left = expressionToEntityName(expr.expression);
    return left === null ? null : ts16.factory.createQualifiedName(left, expr.name);
  }
  return null;
}

// packages/compiler-cli/src/ngtsc/program_driver/src/api.js
var NgOriginalFile = Symbol("NgOriginalFile");
var InliningMode;
(function(InliningMode2) {
  InliningMode2[InliningMode2["InlineOps"] = 0] = "InlineOps";
  InliningMode2[InliningMode2["Error"] = 1] = "Error";
  InliningMode2[InliningMode2["CopySourceToTcb"] = 2] = "CopySourceToTcb";
})(InliningMode || (InliningMode = {}));
var UpdateMode;
(function(UpdateMode2) {
  UpdateMode2[UpdateMode2["Complete"] = 0] = "Complete";
  UpdateMode2[UpdateMode2["Incremental"] = 1] = "Incremental";
})(UpdateMode || (UpdateMode = {}));

// packages/compiler-cli/src/ngtsc/shims/src/expando.js
var NgExtension = Symbol("NgExtension");
function isExtended(sf) {
  return sf[NgExtension] !== void 0;
}
function sfExtensionData(sf) {
  const extSf = sf;
  if (extSf[NgExtension] !== void 0) {
    return extSf[NgExtension];
  }
  const extension = {
    isTopLevelShim: false,
    fileShim: null,
    originalReferencedFiles: null,
    taggedReferenceFiles: null
  };
  extSf[NgExtension] = extension;
  return extension;
}
function isFileShimSourceFile(sf) {
  return isExtended(sf) && sf[NgExtension].fileShim !== null;
}
function isShim(sf) {
  return isExtended(sf) && (sf[NgExtension].fileShim !== null || sf[NgExtension].isTopLevelShim);
}
function copyFileShimData(from, to) {
  if (!isFileShimSourceFile(from)) {
    return;
  }
  sfExtensionData(to).fileShim = sfExtensionData(from).fileShim;
}
function untagAllTsFiles(program) {
  for (const sf of program.getSourceFiles()) {
    untagTsFile(sf);
  }
}
function retagAllTsFiles(program) {
  for (const sf of program.getSourceFiles()) {
    retagTsFile(sf);
  }
}
function untagTsFile(sf) {
  if (sf.isDeclarationFile || !isExtended(sf)) {
    return;
  }
  const ext = sfExtensionData(sf);
  if (ext.originalReferencedFiles !== null) {
    sf.referencedFiles = ext.originalReferencedFiles;
  }
}
function retagTsFile(sf) {
  if (sf.isDeclarationFile || !isExtended(sf)) {
    return;
  }
  const ext = sfExtensionData(sf);
  if (ext.taggedReferenceFiles !== null) {
    sf.referencedFiles = ext.taggedReferenceFiles;
  }
}

// packages/compiler-cli/src/ngtsc/shims/src/adapter.js
import ts17 from "typescript";

// packages/compiler-cli/src/ngtsc/shims/src/util.js
var TS_EXTENSIONS = /\.tsx?$/i;
function makeShimFileName(fileName, suffix) {
  return absoluteFrom(fileName.replace(TS_EXTENSIONS, suffix));
}

// packages/compiler-cli/src/ngtsc/shims/src/adapter.js
var ShimAdapter = class {
  delegate;
  /**
   * A map of shim file names to the `ts.SourceFile` generated for those shims.
   */
  shims = /* @__PURE__ */ new Map();
  /**
   * A map of shim file names to existing shims which were part of a previous iteration of this
   * program.
   *
   * Not all of these shims will be inherited into this program.
   */
  priorShims = /* @__PURE__ */ new Map();
  /**
   * File names which are already known to not be shims.
   *
   * This allows for short-circuit returns without the expense of running regular expressions
   * against the filename repeatedly.
   */
  notShims = /* @__PURE__ */ new Set();
  /**
   * The shim generators supported by this adapter as well as extra precalculated data facilitating
   * their use.
   */
  generators = [];
  /**
   * A `Set` of shim `ts.SourceFile`s which should not be emitted.
   */
  ignoreForEmit = /* @__PURE__ */ new Set();
  /**
   * A list of extra filenames which should be considered inputs to program creation.
   *
   * This includes any top-level shims generated for the program, as well as per-file shim names for
   * those files which are included in the root files of the program.
   */
  extraInputFiles;
  /**
   * Extension prefixes of all installed per-file shims.
   */
  extensionPrefixes = [];
  constructor(delegate, tsRootFiles, topLevelGenerators, perFileGenerators, oldProgram) {
    this.delegate = delegate;
    for (const gen of perFileGenerators) {
      const pattern = `^(.*)\\.${gen.extensionPrefix}\\.ts$`;
      const regexp = new RegExp(pattern, "i");
      this.generators.push({
        generator: gen,
        test: regexp,
        suffix: `.${gen.extensionPrefix}.ts`
      });
      this.extensionPrefixes.push(gen.extensionPrefix);
    }
    const extraInputFiles = [];
    for (const gen of topLevelGenerators) {
      const sf = gen.makeTopLevelShim();
      sfExtensionData(sf).isTopLevelShim = true;
      if (!gen.shouldEmit) {
        this.ignoreForEmit.add(sf);
      }
      const fileName = absoluteFromSourceFile(sf);
      this.shims.set(fileName, sf);
      extraInputFiles.push(fileName);
    }
    for (const rootFile of tsRootFiles) {
      for (const gen of this.generators) {
        extraInputFiles.push(makeShimFileName(rootFile, gen.suffix));
      }
    }
    this.extraInputFiles = extraInputFiles;
    if (oldProgram !== null) {
      for (const oldSf of oldProgram.getSourceFiles()) {
        if (oldSf.isDeclarationFile || !isFileShimSourceFile(oldSf)) {
          continue;
        }
        this.priorShims.set(absoluteFromSourceFile(oldSf), oldSf);
      }
    }
  }
  /**
   * Produce a shim `ts.SourceFile` if `fileName` refers to a shim file which should exist in the
   * program.
   *
   * If `fileName` does not refer to a potential shim file, `null` is returned. If a corresponding
   * base file could not be determined, `undefined` is returned instead.
   */
  maybeGenerate(fileName) {
    if (this.notShims.has(fileName)) {
      return null;
    } else if (this.shims.has(fileName)) {
      return this.shims.get(fileName);
    }
    if (isDtsPath(fileName)) {
      this.notShims.add(fileName);
      return null;
    }
    for (const record of this.generators) {
      const match = record.test.exec(fileName);
      if (match === null) {
        continue;
      }
      const prefix = match[1];
      let baseFileName = absoluteFrom(prefix + ".ts");
      let inputFile = this.delegate.getSourceFile(baseFileName, ts17.ScriptTarget.Latest);
      if (inputFile === void 0) {
        baseFileName = absoluteFrom(prefix + ".tsx");
        inputFile = this.delegate.getSourceFile(baseFileName, ts17.ScriptTarget.Latest);
      }
      if (inputFile === void 0 || isShim(inputFile)) {
        return void 0;
      }
      return this.generateSpecific(fileName, record.generator, inputFile);
    }
    this.notShims.add(fileName);
    return null;
  }
  generateSpecific(fileName, generator, inputFile) {
    let priorShimSf = null;
    if (this.priorShims.has(fileName)) {
      priorShimSf = this.priorShims.get(fileName);
      this.priorShims.delete(fileName);
    }
    const shimSf = generator.generateShimForFile(inputFile, fileName, priorShimSf);
    sfExtensionData(shimSf).fileShim = {
      extension: generator.extensionPrefix,
      generatedFrom: absoluteFromSourceFile(inputFile)
    };
    if (!generator.shouldEmit) {
      this.ignoreForEmit.add(shimSf);
    }
    this.shims.set(fileName, shimSf);
    return shimSf;
  }
};

// packages/compiler-cli/src/ngtsc/shims/src/reference_tagger.js
var ShimReferenceTagger = class {
  suffixes;
  /**
   * Tracks which original files have been processed and had shims generated if necessary.
   *
   * This is used to avoid generating shims twice for the same file.
   */
  tagged = /* @__PURE__ */ new Set();
  /**
   * Whether shim tagging is currently being performed.
   */
  enabled = true;
  constructor(shimExtensions) {
    this.suffixes = shimExtensions.map((extension) => `.${extension}.ts`);
  }
  /**
   * Tag `sf` with any needed references if it's not a shim itself.
   */
  tag(sf) {
    if (!this.enabled || sf.isDeclarationFile || isShim(sf) || this.tagged.has(sf) || !isNonDeclarationTsPath(sf.fileName)) {
      return;
    }
    const ext = sfExtensionData(sf);
    if (ext.originalReferencedFiles === null) {
      ext.originalReferencedFiles = sf.referencedFiles;
    }
    const referencedFiles = [...ext.originalReferencedFiles];
    const sfPath = absoluteFromSourceFile(sf);
    for (const suffix of this.suffixes) {
      referencedFiles.push({
        fileName: makeShimFileName(sfPath, suffix),
        pos: 0,
        end: 0
      });
    }
    ext.taggedReferenceFiles = referencedFiles;
    sf.referencedFiles = referencedFiles;
    this.tagged.add(sf);
  }
  /**
   * Disable the `ShimReferenceTagger` and free memory associated with tracking tagged files.
   */
  finalize() {
    this.enabled = false;
    this.tagged.clear();
  }
};

// packages/compiler-cli/src/ngtsc/program_driver/src/ts_create_program_driver.js
import ts18 from "typescript";
var DelegatingCompilerHost = class {
  delegate;
  createHash;
  directoryExists;
  getCancellationToken;
  getCanonicalFileName;
  getCurrentDirectory;
  getDefaultLibFileName;
  getDefaultLibLocation;
  getDirectories;
  getEnvironmentVariable;
  getNewLine;
  getParsedCommandLine;
  getSourceFileByPath;
  readDirectory;
  readFile;
  realpath;
  resolveModuleNames;
  resolveTypeReferenceDirectives;
  trace;
  useCaseSensitiveFileNames;
  getModuleResolutionCache;
  hasInvalidatedResolutions;
  resolveModuleNameLiterals;
  resolveTypeReferenceDirectiveReferences;
  // jsDocParsingMode is not a method like the other elements above
  get jsDocParsingMode() {
    return this.delegate.jsDocParsingMode;
  }
  set jsDocParsingMode(mode) {
    this.delegate.jsDocParsingMode = mode;
  }
  constructor(delegate) {
    this.delegate = delegate;
    this.createHash = this.delegateMethod("createHash");
    this.directoryExists = this.delegateMethod("directoryExists");
    this.getCancellationToken = this.delegateMethod("getCancellationToken");
    this.getCanonicalFileName = this.delegateMethod("getCanonicalFileName");
    this.getCurrentDirectory = this.delegateMethod("getCurrentDirectory");
    this.getDefaultLibFileName = this.delegateMethod("getDefaultLibFileName");
    this.getDefaultLibLocation = this.delegateMethod("getDefaultLibLocation");
    this.getDirectories = this.delegateMethod("getDirectories");
    this.getEnvironmentVariable = this.delegateMethod("getEnvironmentVariable");
    this.getNewLine = this.delegateMethod("getNewLine");
    this.getParsedCommandLine = this.delegateMethod("getParsedCommandLine");
    this.getSourceFileByPath = this.delegateMethod("getSourceFileByPath");
    this.readDirectory = this.delegateMethod("readDirectory");
    this.readFile = this.delegateMethod("readFile");
    this.realpath = this.delegateMethod("realpath");
    this.resolveModuleNames = this.delegateMethod("resolveModuleNames");
    this.resolveTypeReferenceDirectives = this.delegateMethod("resolveTypeReferenceDirectives");
    this.trace = this.delegateMethod("trace");
    this.useCaseSensitiveFileNames = this.delegateMethod("useCaseSensitiveFileNames");
    this.getModuleResolutionCache = this.delegateMethod("getModuleResolutionCache");
    this.hasInvalidatedResolutions = this.delegateMethod("hasInvalidatedResolutions");
    this.resolveModuleNameLiterals = this.delegateMethod("resolveModuleNameLiterals");
    this.resolveTypeReferenceDirectiveReferences = this.delegateMethod("resolveTypeReferenceDirectiveReferences");
  }
  delegateMethod(name) {
    return this.delegate[name] !== void 0 ? this.delegate[name].bind(this.delegate) : void 0;
  }
};
var UpdatedProgramHost = class extends DelegatingCompilerHost {
  originalProgram;
  shimExtensionPrefixes;
  /**
   * Map of source file names to `ts.SourceFile` instances.
   */
  sfMap;
  /**
   * The `ShimReferenceTagger` responsible for tagging `ts.SourceFile`s loaded via this host.
   *
   * The `UpdatedProgramHost` is used in the creation of a new `ts.Program`. Even though this new
   * program is based on a prior one, TypeScript will still start from the root files and enumerate
   * all source files to include in the new program.  This means that just like during the original
   * program's creation, these source files must be tagged with references to per-file shims in
   * order for those shims to be loaded, and then cleaned up afterwards. Thus the
   * `UpdatedProgramHost` has its own `ShimReferenceTagger` to perform this function.
   */
  shimTagger;
  constructor(sfMap, originalProgram, delegate, shimExtensionPrefixes) {
    super(delegate);
    this.originalProgram = originalProgram;
    this.shimExtensionPrefixes = shimExtensionPrefixes;
    this.shimTagger = new ShimReferenceTagger(this.shimExtensionPrefixes);
    this.sfMap = sfMap;
  }
  getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
    let delegateSf = this.originalProgram.getSourceFile(fileName);
    if (delegateSf === void 0) {
      delegateSf = this.delegate.getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
    }
    if (delegateSf === void 0) {
      return void 0;
    }
    let sf;
    if (this.sfMap.has(fileName)) {
      sf = this.sfMap.get(fileName);
      copyFileShimData(delegateSf, sf);
    } else {
      sf = delegateSf;
    }
    sf = toUnredirectedSourceFile(sf);
    this.shimTagger.tag(sf);
    return sf;
  }
  postProgramCreationCleanup() {
    this.shimTagger.finalize();
  }
  writeFile() {
    throw new Error(`TypeCheckProgramHost should never write files`);
  }
  fileExists(fileName) {
    return this.sfMap.has(fileName) || this.delegate.fileExists(fileName);
  }
};
var TsCreateProgramDriver = class {
  originalProgram;
  originalHost;
  options;
  shimExtensionPrefixes;
  /**
   * A map of source file paths to replacement `ts.SourceFile`s for those paths.
   *
   * Effectively, this tracks the delta between the user's program (represented by the
   * `originalHost`) and the template type-checking program being managed.
   */
  sfMap = /* @__PURE__ */ new Map();
  program;
  constructor(originalProgram, originalHost, options, shimExtensionPrefixes) {
    this.originalProgram = originalProgram;
    this.originalHost = originalHost;
    this.options = options;
    this.shimExtensionPrefixes = shimExtensionPrefixes;
    this.program = this.originalProgram;
  }
  inliningMode = InliningMode.InlineOps;
  get supportsInlineOperations() {
    return this.inliningMode === InliningMode.InlineOps || this.inliningMode === InliningMode.CopySourceToTcb;
  }
  getProgram() {
    return this.program;
  }
  updateFiles(contents, updateMode) {
    if (contents.size === 0) {
      if (updateMode !== UpdateMode.Complete || this.sfMap.size === 0) {
        return;
      }
    }
    if (updateMode === UpdateMode.Complete) {
      this.sfMap.clear();
    }
    for (const [filePath, { newText, originalFile }] of contents.entries()) {
      const sf = ts18.createSourceFile(filePath, newText, ts18.ScriptTarget.Latest, true);
      if (originalFile !== null) {
        sf[NgOriginalFile] = originalFile;
      }
      this.sfMap.set(filePath, sf);
    }
    const host = new UpdatedProgramHost(this.sfMap, this.originalProgram, this.originalHost, this.shimExtensionPrefixes);
    const oldProgram = this.program;
    retagAllTsFiles(oldProgram);
    this.program = ts18.createProgram({
      host,
      rootNames: this.program.getRootFileNames(),
      options: this.options,
      oldProgram
    });
    host.postProgramCreationCleanup();
    untagAllTsFiles(oldProgram);
    retagAllTsFiles(this.program);
  }
};

// packages/compiler-cli/src/ngtsc/annotations/component/src/resources.js
import { ParseSourceFile as ParseSourceFile2, parseTemplate } from "@angular/compiler";
import ts19 from "typescript";
function getTemplateDeclarationNodeForError(declaration) {
  return declaration.isInline ? declaration.expression : declaration.templateUrlExpression;
}
function extractTemplate(node, template, evaluator, depTracker, resourceLoader, options, compilationMode) {
  if (template.isInline) {
    let sourceStr;
    let sourceParseRange = null;
    let templateContent;
    let sourceMapping;
    let escapedString = false;
    let sourceMapUrl;
    if (ts19.isStringLiteral(template.expression) || ts19.isNoSubstitutionTemplateLiteral(template.expression)) {
      sourceParseRange = getTemplateRange(template.expression);
      sourceStr = template.expression.getSourceFile().text;
      templateContent = template.expression.text;
      escapedString = true;
      sourceMapping = {
        type: "direct",
        node: template.expression
      };
      sourceMapUrl = template.resolvedTemplateUrl;
    } else {
      const resolvedTemplate = evaluator.evaluate(template.expression);
      assertLocalCompilationUnresolvedConst(compilationMode, resolvedTemplate, template.expression, "Unresolved identifier found for @Component.template field! Did you import this identifier from a file outside of the compilation unit? This is not allowed when Angular compiler runs in local mode. Possible solutions: 1) Move the declaration into a file within the compilation unit, 2) Inline the template, 3) Move the template into a separate .html file and include it using @Component.templateUrl");
      if (typeof resolvedTemplate !== "string") {
        throw createValueHasWrongTypeError(template.expression, resolvedTemplate, "template must be a string");
      }
      sourceStr = resolvedTemplate;
      templateContent = resolvedTemplate;
      sourceMapping = {
        type: "indirect",
        node: template.expression,
        componentClass: node,
        template: templateContent
      };
      sourceMapUrl = null;
    }
    return {
      ...parseExtractedTemplate(template, sourceStr, sourceParseRange, escapedString, sourceMapUrl, options),
      content: templateContent,
      sourceMapping,
      declaration: template
    };
  } else {
    const templateContent = resourceLoader.load(template.resolvedTemplateUrl);
    if (depTracker !== null) {
      depTracker.addResourceDependency(node.getSourceFile(), absoluteFrom(template.resolvedTemplateUrl));
    }
    return {
      ...parseExtractedTemplate(
        template,
        /* sourceStr */
        templateContent,
        /* sourceParseRange */
        null,
        /* escapedString */
        false,
        /* sourceMapUrl */
        template.resolvedTemplateUrl,
        options
      ),
      content: templateContent,
      sourceMapping: {
        type: "external",
        componentClass: node,
        node: template.templateUrlExpression,
        template: templateContent,
        templateUrl: template.resolvedTemplateUrl
      },
      declaration: template
    };
  }
}
function createEmptyTemplate(componentClass, component, containingFile) {
  const templateUrl = component.get("templateUrl");
  const template = component.get("template");
  return {
    content: "",
    diagNodes: [],
    nodes: [],
    errors: null,
    styles: [],
    styleUrls: [],
    ngContentSelectors: [],
    file: new ParseSourceFile2("", ""),
    sourceMapping: templateUrl ? { type: "direct", node: template } : {
      type: "external",
      componentClass,
      node: templateUrl,
      template: "",
      templateUrl: "missing.ng.html"
    },
    declaration: templateUrl ? {
      isInline: false,
      preserveWhitespaces: false,
      templateUrlExpression: templateUrl,
      templateUrl: "missing.ng.html",
      resolvedTemplateUrl: "/missing.ng.html"
    } : {
      isInline: true,
      preserveWhitespaces: false,
      expression: template,
      templateUrl: containingFile,
      resolvedTemplateUrl: containingFile
    }
  };
}
function parseExtractedTemplate(template, sourceStr, sourceParseRange, escapedString, sourceMapUrl, options) {
  const i18nNormalizeLineEndingsInICUs = escapedString || options.i18nNormalizeLineEndingsInICUs;
  const commonParseOptions = {
    range: sourceParseRange ?? void 0,
    enableI18nLegacyMessageIdFormat: options.enableI18nLegacyMessageIdFormat,
    i18nNormalizeLineEndingsInICUs,
    alwaysAttemptHtmlToR3AstConversion: options.usePoisonedData,
    escapedString,
    enableBlockSyntax: options.enableBlockSyntax,
    enableLetSyntax: options.enableLetSyntax,
    enableSelectorless: options.enableSelectorless
  };
  const parsedTemplate = parseTemplate(sourceStr, sourceMapUrl ?? "", {
    ...commonParseOptions,
    preserveWhitespaces: template.preserveWhitespaces,
    preserveSignificantWhitespace: options.preserveSignificantWhitespace
  });
  const { nodes: diagNodes } = parseTemplate(sourceStr, sourceMapUrl ?? "", {
    ...commonParseOptions,
    preserveWhitespaces: true,
    preserveLineEndings: true,
    preserveSignificantWhitespace: true,
    leadingTriviaChars: []
  });
  return {
    ...parsedTemplate,
    diagNodes,
    file: new ParseSourceFile2(sourceStr, sourceMapUrl ?? "")
  };
}
function parseTemplateDeclaration(node, decorator, component, containingFile, evaluator, depTracker, resourceLoader, defaultPreserveWhitespaces) {
  let preserveWhitespaces = defaultPreserveWhitespaces;
  if (component.has("preserveWhitespaces")) {
    const expr = component.get("preserveWhitespaces");
    const value = evaluator.evaluate(expr);
    if (typeof value !== "boolean") {
      throw createValueHasWrongTypeError(expr, value, "preserveWhitespaces must be a boolean");
    }
    preserveWhitespaces = value;
  }
  if (component.has("interpolation")) {
    const expr = component.get("interpolation");
    const value = evaluator.evaluate(expr);
    if (!Array.isArray(value) || value.length !== 2 || !value.every((element) => typeof element === "string")) {
      throw createValueHasWrongTypeError(expr, value, "interpolation must be an array with 2 elements of string type");
    }
  }
  if (component.has("templateUrl")) {
    const templateUrlExpr = component.get("templateUrl");
    const templateUrl = evaluator.evaluate(templateUrlExpr);
    if (typeof templateUrl !== "string") {
      throw createValueHasWrongTypeError(templateUrlExpr, templateUrl, "templateUrl must be a string");
    }
    try {
      const resourceUrl = resourceLoader.resolve(templateUrl, containingFile);
      return {
        isInline: false,
        preserveWhitespaces,
        templateUrl,
        templateUrlExpression: templateUrlExpr,
        resolvedTemplateUrl: resourceUrl
      };
    } catch (e) {
      if (depTracker !== null) {
        depTracker.recordDependencyAnalysisFailure(node.getSourceFile());
      }
      throw makeResourceNotFoundError(
        templateUrl,
        templateUrlExpr,
        0
        /* ResourceTypeForDiagnostics.Template */
      );
    }
  } else if (component.has("template")) {
    return {
      isInline: true,
      preserveWhitespaces,
      expression: component.get("template"),
      templateUrl: containingFile,
      resolvedTemplateUrl: containingFile
    };
  } else {
    throw new FatalDiagnosticError(ErrorCode.COMPONENT_MISSING_TEMPLATE, decorator.node, "@Component is missing a template. Add either a `template` or `templateUrl`");
  }
}
function preloadAndParseTemplate(evaluator, resourceLoader, depTracker, preanalyzeTemplateCache, node, decorator, component, containingFile, defaultPreserveWhitespaces, options, compilationMode) {
  if (component.has("templateUrl")) {
    const templateUrlExpr = component.get("templateUrl");
    const templateUrl = evaluator.evaluate(templateUrlExpr);
    if (typeof templateUrl !== "string") {
      throw createValueHasWrongTypeError(templateUrlExpr, templateUrl, "templateUrl must be a string");
    }
    try {
      const resourceUrl = resourceLoader.resolve(templateUrl, containingFile);
      const templatePromise = resourceLoader.preload(resourceUrl, {
        type: "template",
        containingFile,
        className: node.name.text
      });
      if (templatePromise !== void 0) {
        return templatePromise.then(() => {
          const templateDecl = parseTemplateDeclaration(node, decorator, component, containingFile, evaluator, depTracker, resourceLoader, defaultPreserveWhitespaces);
          const template = extractTemplate(node, templateDecl, evaluator, depTracker, resourceLoader, options, compilationMode);
          preanalyzeTemplateCache.set(node, template);
          return template;
        });
      } else {
        return Promise.resolve(null);
      }
    } catch (e) {
      if (depTracker !== null) {
        depTracker.recordDependencyAnalysisFailure(node.getSourceFile());
      }
      throw makeResourceNotFoundError(
        templateUrl,
        templateUrlExpr,
        0
        /* ResourceTypeForDiagnostics.Template */
      );
    }
  } else {
    const templateDecl = parseTemplateDeclaration(node, decorator, component, containingFile, evaluator, depTracker, resourceLoader, defaultPreserveWhitespaces);
    const template = extractTemplate(node, templateDecl, evaluator, depTracker, resourceLoader, options, compilationMode);
    preanalyzeTemplateCache.set(node, template);
    return Promise.resolve(template);
  }
}
function getTemplateRange(templateExpr) {
  const startPos = templateExpr.getStart() + 1;
  const { line, character } = ts19.getLineAndCharacterOfPosition(templateExpr.getSourceFile(), startPos);
  return {
    startPos,
    startLine: line,
    startCol: character,
    endPos: templateExpr.getEnd() - 1
  };
}
function makeResourceNotFoundError(file, nodeForError, resourceType) {
  let errorText;
  switch (resourceType) {
    case 0:
      errorText = `Could not find template file '${file}'.`;
      break;
    case 1:
      errorText = `Could not find stylesheet file '${file}' linked from the template.`;
      break;
    case 2:
      errorText = `Could not find stylesheet file '${file}'.`;
      break;
  }
  return new FatalDiagnosticError(ErrorCode.COMPONENT_RESOURCE_NOT_FOUND, nodeForError, errorText);
}
function transformDecoratorResources(dec, component, styles, template) {
  if (dec.name !== "Component") {
    return dec;
  }
  if (!component.has("templateUrl") && !component.has("styleUrls") && !component.has("styleUrl") && !component.has("styles")) {
    return dec;
  }
  const metadata = new Map(component);
  if (metadata.has("templateUrl")) {
    metadata.delete("templateUrl");
    metadata.set("template", ts19.factory.createStringLiteral(template.content));
  }
  if (metadata.has("styleUrls") || metadata.has("styleUrl") || metadata.has("styles")) {
    metadata.delete("styles");
    metadata.delete("styleUrls");
    metadata.delete("styleUrl");
    if (styles.length > 0) {
      const styleNodes = styles.reduce((result, style) => {
        if (style.trim().length > 0) {
          result.push(ts19.factory.createStringLiteral(style));
        }
        return result;
      }, []);
      if (styleNodes.length > 0) {
        metadata.set("styles", ts19.factory.createArrayLiteralExpression(styleNodes));
      }
    }
  }
  const newMetadataFields = [];
  for (const [name, value] of metadata.entries()) {
    newMetadataFields.push(ts19.factory.createPropertyAssignment(name, value));
  }
  return { ...dec, args: [ts19.factory.createObjectLiteralExpression(newMetadataFields)] };
}
function extractComponentStyleUrls(evaluator, component) {
  const styleUrlsExpr = component.get("styleUrls");
  const styleUrlExpr = component.get("styleUrl");
  if (styleUrlsExpr !== void 0 && styleUrlExpr !== void 0) {
    throw new FatalDiagnosticError(ErrorCode.COMPONENT_INVALID_STYLE_URLS, styleUrlExpr, "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");
  }
  if (styleUrlsExpr !== void 0) {
    return extractStyleUrlsFromExpression(evaluator, component.get("styleUrls"));
  }
  if (styleUrlExpr !== void 0) {
    const styleUrl = evaluator.evaluate(styleUrlExpr);
    if (typeof styleUrl !== "string") {
      throw createValueHasWrongTypeError(styleUrlExpr, styleUrl, "styleUrl must be a string");
    }
    return [
      {
        url: styleUrl,
        source: 2,
        expression: styleUrlExpr
      }
    ];
  }
  return [];
}
function extractStyleUrlsFromExpression(evaluator, styleUrlsExpr) {
  const styleUrls = [];
  if (ts19.isArrayLiteralExpression(styleUrlsExpr)) {
    for (const styleUrlExpr of styleUrlsExpr.elements) {
      if (ts19.isSpreadElement(styleUrlExpr)) {
        styleUrls.push(...extractStyleUrlsFromExpression(evaluator, styleUrlExpr.expression));
      } else {
        const styleUrl = evaluator.evaluate(styleUrlExpr);
        if (typeof styleUrl !== "string") {
          throw createValueHasWrongTypeError(styleUrlExpr, styleUrl, "styleUrl must be a string");
        }
        styleUrls.push({
          url: styleUrl,
          source: 2,
          expression: styleUrlExpr
        });
      }
    }
  } else {
    const evaluatedStyleUrls = evaluator.evaluate(styleUrlsExpr);
    if (!isStringArray(evaluatedStyleUrls)) {
      throw createValueHasWrongTypeError(styleUrlsExpr, evaluatedStyleUrls, "styleUrls must be an array of strings");
    }
    for (const styleUrl of evaluatedStyleUrls) {
      styleUrls.push({
        url: styleUrl,
        source: 2,
        expression: styleUrlsExpr
      });
    }
  }
  return styleUrls;
}
function extractInlineStyleResources(component) {
  const styles = /* @__PURE__ */ new Set();
  function stringLiteralElements(array) {
    return array.elements.filter((e) => ts19.isStringLiteralLike(e));
  }
  const stylesExpr = component.get("styles");
  if (stylesExpr !== void 0) {
    if (ts19.isArrayLiteralExpression(stylesExpr)) {
      for (const expression of stringLiteralElements(stylesExpr)) {
        styles.add({ path: null, node: expression });
      }
    } else if (ts19.isStringLiteralLike(stylesExpr)) {
      styles.add({ path: null, node: stylesExpr });
    }
  }
  return styles;
}
function _extractTemplateStyleUrls(template) {
  if (template.styleUrls === null) {
    return [];
  }
  const expression = getTemplateDeclarationNodeForError(template.declaration);
  return template.styleUrls.map((url) => ({
    url,
    source: 1,
    expression
  }));
}

// packages/compiler-cli/src/ngtsc/annotations/component/src/handler.js
import { compileClassDebugInfo, compileComponentClassMetadata, compileComponentDeclareClassMetadata, compileComponentFromMetadata, compileDeclareComponentFromMetadata, compileDeferResolverFunction, compileHmrInitializer, ConstantPool as ConstantPool2, createHostElement as createHostElement2, CssSelector as CssSelector3, DomElementSchemaRegistry as DomElementSchemaRegistry2, ExternalExpr as ExternalExpr8, FactoryTarget as FactoryTarget3, makeBindingParser as makeBindingParser2, MatchSource as MatchSource2, outputAst as o4, R3TargetBinder as R3TargetBinder2, R3TemplateDependencyKind, SelectorlessMatcher as SelectorlessMatcher2, SelectorMatcher as SelectorMatcher2, ViewEncapsulation as ViewEncapsulation2 } from "@angular/compiler";
import ts39 from "typescript";

// packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/api.js
import ts20 from "typescript";
var SemanticSymbol = class {
  decl;
  /**
   * The path of the file that declares this symbol.
   */
  path;
  /**
   * The identifier of this symbol, or null if no identifier could be determined. It should
   * uniquely identify the symbol relative to `file`. This is typically just the name of a
   * top-level class declaration, as that uniquely identifies the class within the file.
   *
   * If the identifier is null, then this symbol cannot be recognized across rebuilds. In that
   * case, the symbol is always assumed to have semantically changed to guarantee a proper
   * rebuild.
   */
  identifier;
  constructor(decl) {
    this.decl = decl;
    this.path = absoluteFromSourceFile(decl.getSourceFile());
    this.identifier = getSymbolIdentifier(decl);
  }
};
function getSymbolIdentifier(decl) {
  if (!ts20.isSourceFile(decl.parent)) {
    return null;
  }
  return decl.name.text;
}

// packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/graph.js
import { ExternalExpr as ExternalExpr3 } from "@angular/compiler";
var OpaqueSymbol = class extends SemanticSymbol {
  isPublicApiAffected() {
    return false;
  }
  isTypeCheckApiAffected() {
    return false;
  }
};
var SemanticDepGraph = class {
  files = /* @__PURE__ */ new Map();
  // Note: the explicit type annotation is used to work around a CI failure on Windows:
  // error TS2742: The inferred type of 'symbolByDecl' cannot be named without a reference to
  // '../../../../../../../external/_main/node_modules/typescript/lib/typescript'. This is likely
  // not portable. A type annotation is necessary.
  symbolByDecl = /* @__PURE__ */ new Map();
  /**
   * Registers a symbol in the graph. The symbol is given a unique identifier if possible, such that
   * its equivalent symbol can be obtained from a prior graph even if its declaration node has
   * changed across rebuilds. Symbols without an identifier are only able to find themselves in a
   * prior graph if their declaration node is identical.
   */
  registerSymbol(symbol) {
    this.symbolByDecl.set(symbol.decl, symbol);
    if (symbol.identifier !== null) {
      if (!this.files.has(symbol.path)) {
        this.files.set(symbol.path, /* @__PURE__ */ new Map());
      }
      this.files.get(symbol.path).set(symbol.identifier, symbol);
    }
  }
  /**
   * Attempts to resolve a symbol in this graph that represents the given symbol from another graph.
   * If no matching symbol could be found, null is returned.
   *
   * @param symbol The symbol from another graph for which its equivalent in this graph should be
   * found.
   */
  getEquivalentSymbol(symbol) {
    let previousSymbol = this.getSymbolByDecl(symbol.decl);
    if (previousSymbol === null && symbol.identifier !== null) {
      previousSymbol = this.getSymbolByName(symbol.path, symbol.identifier);
    }
    return previousSymbol;
  }
  /**
   * Attempts to find the symbol by its identifier.
   */
  getSymbolByName(path, identifier) {
    if (!this.files.has(path)) {
      return null;
    }
    const file = this.files.get(path);
    if (!file.has(identifier)) {
      return null;
    }
    return file.get(identifier);
  }
  /**
   * Attempts to resolve the declaration to its semantic symbol.
   */
  getSymbolByDecl(decl) {
    if (!this.symbolByDecl.has(decl)) {
      return null;
    }
    return this.symbolByDecl.get(decl);
  }
};
var SemanticDepGraphUpdater = class {
  priorGraph;
  newGraph = new SemanticDepGraph();
  /**
   * Contains opaque symbols that were created for declarations for which there was no symbol
   * registered, which happens for e.g. external declarations.
   */
  opaqueSymbols = /* @__PURE__ */ new Map();
  constructor(priorGraph) {
    this.priorGraph = priorGraph;
  }
  /**
   * Registers the symbol in the new graph that is being created.
   */
  registerSymbol(symbol) {
    this.newGraph.registerSymbol(symbol);
  }
  /**
   * Takes all facts that have been gathered to create a new semantic dependency graph. In this
   * process, the semantic impact of the changes is determined which results in a set of files that
   * need to be emitted and/or type-checked.
   */
  finalize() {
    if (this.priorGraph === null) {
      return {
        needsEmit: /* @__PURE__ */ new Set(),
        needsTypeCheckEmit: /* @__PURE__ */ new Set(),
        newGraph: this.newGraph
      };
    }
    const needsEmit = this.determineInvalidatedFiles(this.priorGraph);
    const needsTypeCheckEmit = this.determineInvalidatedTypeCheckFiles(this.priorGraph);
    return {
      needsEmit,
      needsTypeCheckEmit,
      newGraph: this.newGraph
    };
  }
  determineInvalidatedFiles(priorGraph) {
    const isPublicApiAffected = /* @__PURE__ */ new Set();
    for (const symbol of this.newGraph.symbolByDecl.values()) {
      const previousSymbol = priorGraph.getEquivalentSymbol(symbol);
      if (previousSymbol === null || symbol.isPublicApiAffected(previousSymbol)) {
        isPublicApiAffected.add(symbol);
      }
    }
    const needsEmit = /* @__PURE__ */ new Set();
    for (const symbol of this.newGraph.symbolByDecl.values()) {
      if (symbol.isEmitAffected === void 0) {
        continue;
      }
      const previousSymbol = priorGraph.getEquivalentSymbol(symbol);
      if (previousSymbol === null || symbol.isEmitAffected(previousSymbol, isPublicApiAffected)) {
        needsEmit.add(symbol.path);
      }
    }
    return needsEmit;
  }
  determineInvalidatedTypeCheckFiles(priorGraph) {
    const isTypeCheckApiAffected = /* @__PURE__ */ new Set();
    for (const symbol of this.newGraph.symbolByDecl.values()) {
      const previousSymbol = priorGraph.getEquivalentSymbol(symbol);
      if (previousSymbol === null || symbol.isTypeCheckApiAffected(previousSymbol)) {
        isTypeCheckApiAffected.add(symbol);
      }
    }
    const needsTypeCheckEmit = /* @__PURE__ */ new Set();
    for (const symbol of this.newGraph.symbolByDecl.values()) {
      if (symbol.isTypeCheckBlockAffected === void 0) {
        continue;
      }
      const previousSymbol = priorGraph.getEquivalentSymbol(symbol);
      if (previousSymbol === null || symbol.isTypeCheckBlockAffected(previousSymbol, isTypeCheckApiAffected)) {
        needsTypeCheckEmit.add(symbol.path);
      }
    }
    return needsTypeCheckEmit;
  }
  /**
   * Creates a `SemanticReference` for the reference to `decl` using the expression `expr`. See
   * the documentation of `SemanticReference` for details.
   */
  getSemanticReference(decl, expr) {
    return {
      symbol: this.getSymbol(decl),
      importPath: getImportPath(expr)
    };
  }
  /**
   * Gets the `SemanticSymbol` that was registered for `decl` during the current compilation, or
   * returns an opaque symbol that represents `decl`.
   */
  getSymbol(decl) {
    const symbol = this.newGraph.getSymbolByDecl(decl);
    if (symbol === null) {
      return this.getOpaqueSymbol(decl);
    }
    return symbol;
  }
  /**
   * Gets or creates an `OpaqueSymbol` for the provided class declaration.
   */
  getOpaqueSymbol(decl) {
    if (this.opaqueSymbols.has(decl)) {
      return this.opaqueSymbols.get(decl);
    }
    const symbol = new OpaqueSymbol(decl);
    this.opaqueSymbols.set(decl, symbol);
    return symbol;
  }
};
function getImportPath(expr) {
  if (expr instanceof ExternalExpr3) {
    return `${expr.value.moduleName}$${expr.value.name}`;
  } else {
    return null;
  }
}

// packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/type_parameters.js
import ts21 from "typescript";

// packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/util.js
function isSymbolEqual(a, b) {
  if (a.decl === b.decl) {
    return true;
  }
  if (a.identifier === null || b.identifier === null) {
    return false;
  }
  return a.path === b.path && a.identifier === b.identifier;
}
function isReferenceEqual(a, b) {
  if (!isSymbolEqual(a.symbol, b.symbol)) {
    return false;
  }
  return a.importPath === b.importPath;
}
function referenceEquality(a, b) {
  return a === b;
}
function isArrayEqual(a, b, equalityTester = referenceEquality) {
  if (a === null || b === null) {
    return a === b;
  }
  if (a.length !== b.length) {
    return false;
  }
  return !a.some((item, index) => !equalityTester(item, b[index]));
}
function isSetEqual(a, b, equalityTester = referenceEquality) {
  if (a === null || b === null) {
    return a === b;
  }
  if (a.size !== b.size) {
    return false;
  }
  for (const itemA of a) {
    let found = false;
    for (const itemB of b) {
      if (equalityTester(itemA, itemB)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
}

// packages/compiler-cli/src/ngtsc/incremental/semantic_graph/src/type_parameters.js
function extractSemanticTypeParameters(node) {
  if (!ts21.isClassDeclaration(node) || node.typeParameters === void 0) {
    return null;
  }
  return node.typeParameters.map((typeParam) => ({
    hasGenericTypeBound: typeParam.constraint !== void 0
  }));
}
function areTypeParametersEqual(current, previous) {
  if (!isArrayEqual(current, previous, isTypeParameterEqual)) {
    return false;
  }
  if (current !== null && current.some((typeParam) => typeParam.hasGenericTypeBound)) {
    return false;
  }
  return true;
}
function isTypeParameterEqual(a, b) {
  return a.hasGenericTypeBound === b.hasGenericTypeBound;
}

// packages/compiler-cli/src/ngtsc/scope/src/api.js
var ComponentScopeKind;
(function(ComponentScopeKind2) {
  ComponentScopeKind2[ComponentScopeKind2["NgModule"] = 0] = "NgModule";
  ComponentScopeKind2[ComponentScopeKind2["Standalone"] = 1] = "Standalone";
  ComponentScopeKind2[ComponentScopeKind2["Selectorless"] = 2] = "Selectorless";
})(ComponentScopeKind || (ComponentScopeKind = {}));

// packages/compiler-cli/src/ngtsc/scope/src/component_scope.js
var CompoundComponentScopeReader = class {
  readers;
  constructor(readers) {
    this.readers = readers;
  }
  getScopeForComponent(clazz) {
    for (const reader of this.readers) {
      const meta = reader.getScopeForComponent(clazz);
      if (meta !== null) {
        return meta;
      }
    }
    return null;
  }
  getRemoteScope(clazz) {
    for (const reader of this.readers) {
      const remoteScope = reader.getRemoteScope(clazz);
      if (remoteScope !== null) {
        return remoteScope;
      }
    }
    return null;
  }
};

// packages/compiler-cli/src/ngtsc/scope/src/dependency.js
var MetadataDtsModuleScopeResolver = class {
  dtsMetaReader;
  aliasingHost;
  /**
   * Cache which holds fully resolved scopes for NgModule classes from .d.ts files.
   */
  cache = /* @__PURE__ */ new Map();
  /**
   * @param dtsMetaReader a `MetadataReader` which can read metadata from `.d.ts` files.
   */
  constructor(dtsMetaReader, aliasingHost) {
    this.dtsMetaReader = dtsMetaReader;
    this.aliasingHost = aliasingHost;
  }
  /**
   * Resolve a `Reference`'d NgModule from a .d.ts file and produce a transitive `ExportScope`
   * listing the directives and pipes which that NgModule exports to others.
   *
   * This operation relies on a `Reference` instead of a direct TypeScript node as the `Reference`s
   * produced depend on how the original NgModule was imported.
   */
  resolve(ref) {
    const clazz = ref.node;
    const sourceFile = clazz.getSourceFile();
    if (!sourceFile.isDeclarationFile) {
      throw new Error(`Debug error: DtsModuleScopeResolver.read(${ref.debugName} from ${sourceFile.fileName}), but not a .d.ts file`);
    }
    if (this.cache.has(clazz)) {
      return this.cache.get(clazz);
    }
    const dependencies = [];
    const meta = this.dtsMetaReader.getNgModuleMetadata(ref);
    if (meta === null) {
      this.cache.set(clazz, null);
      return null;
    }
    const declarations = /* @__PURE__ */ new Set();
    for (const declRef of meta.declarations) {
      declarations.add(declRef.node);
    }
    for (const exportRef of meta.exports) {
      const directive = this.dtsMetaReader.getDirectiveMetadata(exportRef);
      if (directive !== null) {
        const isReExport = !declarations.has(exportRef.node);
        dependencies.push(this.maybeAlias(directive, sourceFile, isReExport));
        continue;
      }
      const pipe = this.dtsMetaReader.getPipeMetadata(exportRef);
      if (pipe !== null) {
        const isReExport = !declarations.has(exportRef.node);
        dependencies.push(this.maybeAlias(pipe, sourceFile, isReExport));
        continue;
      }
      const exportScope2 = this.resolve(exportRef);
      if (exportScope2 !== null) {
        if (this.aliasingHost === null) {
          dependencies.push(...exportScope2.exported.dependencies);
        } else {
          for (const dep of exportScope2.exported.dependencies) {
            dependencies.push(this.maybeAlias(
              dep,
              sourceFile,
              /* isReExport */
              true
            ));
          }
        }
      }
      continue;
    }
    const exportScope = {
      exported: {
        dependencies,
        isPoisoned: meta.isPoisoned
      }
    };
    this.cache.set(clazz, exportScope);
    return exportScope;
  }
  maybeAlias(dirOrPipe, maybeAliasFrom, isReExport) {
    const ref = dirOrPipe.ref;
    if (this.aliasingHost === null || ref.node.getSourceFile() === maybeAliasFrom) {
      return dirOrPipe;
    }
    const alias = this.aliasingHost.getAliasIn(ref.node, maybeAliasFrom, isReExport);
    if (alias === null) {
      return dirOrPipe;
    }
    return {
      ...dirOrPipe,
      ref: ref.cloneWithAlias(alias)
    };
  }
};

// packages/compiler-cli/src/ngtsc/scope/src/local.js
import { ExternalExpr as ExternalExpr4 } from "@angular/compiler";
import ts22 from "typescript";

// packages/compiler-cli/src/ngtsc/scope/src/util.js
function getDiagnosticNode(ref, rawExpr) {
  return rawExpr !== null ? ref.getOriginForDiagnostics(rawExpr) : ref.node.name;
}
function makeNotStandaloneDiagnostic(scopeReader, ref, rawExpr, kind) {
  const scope = scopeReader.getScopeForComponent(ref.node);
  let message = `The ${kind} '${ref.node.name.text}' appears in 'imports', but is not standalone and cannot be imported directly.`;
  let relatedInformation = void 0;
  if (scope !== null && scope.kind === ComponentScopeKind.NgModule) {
    const isExported = scope.exported.dependencies.some((dep) => dep.ref.node === ref.node);
    const relatedInfoMessageText = isExported ? `It can be imported using its '${scope.ngModule.name.text}' NgModule instead.` : `It's declared in the '${scope.ngModule.name.text}' NgModule, but is not exported. Consider exporting it and importing the NgModule instead.`;
    relatedInformation = [makeRelatedInformation(scope.ngModule.name, relatedInfoMessageText)];
  } else {
  }
  if (relatedInformation === void 0) {
    message += " It must be imported via an NgModule.";
  }
  return makeDiagnostic(ErrorCode.COMPONENT_IMPORT_NOT_STANDALONE, getDiagnosticNode(ref, rawExpr), message, relatedInformation);
}
function makeUnknownComponentImportDiagnostic(ref, rawExpr) {
  return makeDiagnostic(ErrorCode.COMPONENT_UNKNOWN_IMPORT, getDiagnosticNode(ref, rawExpr), `Component imports must be standalone components, directives, pipes, or must be NgModules.`);
}
function makeUnknownComponentDeferredImportDiagnostic(ref, rawExpr) {
  return makeDiagnostic(ErrorCode.COMPONENT_UNKNOWN_DEFERRED_IMPORT, getDiagnosticNode(ref, rawExpr), `Component deferred imports must be standalone components, directives or pipes.`);
}

// packages/compiler-cli/src/ngtsc/scope/src/local.js
var IN_PROGRESS_RESOLUTION = {};
var LocalModuleScopeRegistry = class {
  localReader;
  fullReader;
  dependencyScopeReader;
  refEmitter;
  aliasingHost;
  /**
   * Tracks whether the registry has been asked to produce scopes for a module or component. Once
   * this is true, the registry cannot accept registrations of new directives/pipes/modules as it
   * would invalidate the cached scope data.
   */
  sealed = false;
  /**
   * A map of components from the current compilation unit to the NgModule which declared them.
   *
   * As components and directives are not distinguished at the NgModule level, this map may also
   * contain directives. This doesn't cause any problems but isn't useful as there is no concept of
   * a directive's compilation scope.
   */
  declarationToModule = /* @__PURE__ */ new Map();
  /**
   * This maps from the directive/pipe class to a map of data for each NgModule that declares the
   * directive/pipe. This data is needed to produce an error for the given class.
   */
  duplicateDeclarations = /* @__PURE__ */ new Map();
  moduleToRef = /* @__PURE__ */ new Map();
  /**
     * A cache of calculated `LocalModuleScope`s for each NgModule declared in the current program.
  
     */
  cache = /* @__PURE__ */ new Map();
  /**
   * Tracks the `RemoteScope` for components requiring "remote scoping".
   *
   * Remote scoping is when the set of directives which apply to a given component is set in the
   * NgModule's file instead of directly on the component def (which is sometimes needed to get
   * around cyclic import issues). This is not used in calculation of `LocalModuleScope`s, but is
   * tracked here for convenience.
   */
  remoteScoping = /* @__PURE__ */ new Map();
  /**
   * Tracks errors accumulated in the processing of scopes for each module declaration.
   */
  scopeErrors = /* @__PURE__ */ new Map();
  /**
   * Tracks which NgModules have directives/pipes that are declared in more than one module.
   */
  modulesWithStructuralErrors = /* @__PURE__ */ new Set();
  constructor(localReader, fullReader, dependencyScopeReader, refEmitter, aliasingHost) {
    this.localReader = localReader;
    this.fullReader = fullReader;
    this.dependencyScopeReader = dependencyScopeReader;
    this.refEmitter = refEmitter;
    this.aliasingHost = aliasingHost;
  }
  /**
   * Add an NgModule's data to the registry.
   */
  registerNgModuleMetadata(data) {
    this.assertCollecting();
    const ngModule = data.ref.node;
    this.moduleToRef.set(data.ref.node, data.ref);
    for (const decl of data.declarations) {
      this.registerDeclarationOfModule(ngModule, decl, data.rawDeclarations);
    }
  }
  registerDirectiveMetadata(directive) {
  }
  registerPipeMetadata(pipe) {
  }
  getScopeForComponent(clazz) {
    if (!this.declarationToModule.has(clazz)) {
      return null;
    }
    const module = this.declarationToModule.get(clazz).ngModule;
    return this.getScopeOfModule(module);
  }
  /**
   * If `node` is declared in more than one NgModule (duplicate declaration), then get the
   * `DeclarationData` for each offending declaration.
   *
   * Ordinarily a class is only declared in one NgModule, in which case this function returns
   * `null`.
   */
  getDuplicateDeclarations(node) {
    if (!this.duplicateDeclarations.has(node)) {
      return null;
    }
    return Array.from(this.duplicateDeclarations.get(node).values());
  }
  /**
   * Collects registered data for a module and its directives/pipes and convert it into a full
   * `LocalModuleScope`.
   *
   * This method implements the logic of NgModule imports and exports. It returns the
   * `LocalModuleScope` for the given NgModule if one can be produced, `null` if no scope was ever
   * defined, or the string `'error'` if the scope contained errors.
   */
  getScopeOfModule(clazz) {
    if (!this.moduleToRef.has(clazz)) {
      return null;
    }
    const scope = this.getScopeOfModuleReference(this.moduleToRef.get(clazz));
    return scope === "cycle" ? null : scope;
  }
  /**
   * Retrieves any `ts.Diagnostic`s produced during the calculation of the `LocalModuleScope` for
   * the given NgModule, or `null` if no errors were present.
   */
  getDiagnosticsOfModule(clazz) {
    this.getScopeOfModule(clazz);
    if (this.scopeErrors.has(clazz)) {
      return this.scopeErrors.get(clazz);
    } else {
      return null;
    }
  }
  registerDeclarationOfModule(ngModule, decl, rawDeclarations) {
    const declData = {
      ngModule,
      ref: decl,
      rawDeclarations
    };
    if (this.duplicateDeclarations.has(decl.node)) {
      this.duplicateDeclarations.get(decl.node).set(ngModule, declData);
    } else if (this.declarationToModule.has(decl.node) && this.declarationToModule.get(decl.node).ngModule !== ngModule) {
      const duplicateDeclMap = /* @__PURE__ */ new Map();
      const firstDeclData = this.declarationToModule.get(decl.node);
      this.modulesWithStructuralErrors.add(firstDeclData.ngModule);
      this.modulesWithStructuralErrors.add(ngModule);
      duplicateDeclMap.set(firstDeclData.ngModule, firstDeclData);
      duplicateDeclMap.set(ngModule, declData);
      this.duplicateDeclarations.set(decl.node, duplicateDeclMap);
      this.declarationToModule.delete(decl.node);
    } else {
      this.declarationToModule.set(decl.node, declData);
    }
  }
  /**
   * Implementation of `getScopeOfModule` which accepts a reference to a class.
   */
  getScopeOfModuleReference(ref) {
    if (this.cache.has(ref.node)) {
      const cachedValue = this.cache.get(ref.node);
      if (cachedValue === IN_PROGRESS_RESOLUTION) {
        return "cycle";
      }
      return cachedValue;
    }
    this.cache.set(ref.node, IN_PROGRESS_RESOLUTION);
    this.sealed = true;
    const ngModule = this.localReader.getNgModuleMetadata(ref);
    if (ngModule === null) {
      this.cache.set(ref.node, null);
      return null;
    }
    const diagnostics = [];
    const compilationDirectives = /* @__PURE__ */ new Map();
    const compilationPipes = /* @__PURE__ */ new Map();
    const declared = /* @__PURE__ */ new Set();
    const exportDirectives = /* @__PURE__ */ new Map();
    const exportPipes = /* @__PURE__ */ new Map();
    let isPoisoned = false;
    if (this.modulesWithStructuralErrors.has(ngModule.ref.node)) {
      isPoisoned = true;
    }
    for (const decl of ngModule.imports) {
      const importScope = this.getExportedScope(decl, diagnostics, ref.node, "import");
      if (importScope !== null) {
        if (importScope === "invalid" || importScope === "cycle" || importScope.exported.isPoisoned) {
          isPoisoned = true;
          if (importScope !== "cycle") {
            diagnostics.push(invalidTransitiveNgModuleRef(decl, ngModule.rawImports, "import"));
          }
          if (importScope === "invalid" || importScope === "cycle") {
            continue;
          }
        }
        for (const dep of importScope.exported.dependencies) {
          if (dep.kind === MetaKind.Directive) {
            compilationDirectives.set(dep.ref.node, dep);
          } else if (dep.kind === MetaKind.Pipe) {
            compilationPipes.set(dep.ref.node, dep);
          }
        }
        continue;
      }
      const directive = this.fullReader.getDirectiveMetadata(decl);
      if (directive !== null) {
        if (directive.isStandalone) {
          compilationDirectives.set(directive.ref.node, directive);
        } else {
          diagnostics.push(makeNotStandaloneDiagnostic(this, decl, ngModule.rawImports, directive.isComponent ? "component" : "directive"));
          isPoisoned = true;
        }
        continue;
      }
      const pipe = this.fullReader.getPipeMetadata(decl);
      if (pipe !== null) {
        if (pipe.isStandalone) {
          compilationPipes.set(pipe.ref.node, pipe);
        } else {
          diagnostics.push(makeNotStandaloneDiagnostic(this, decl, ngModule.rawImports, "pipe"));
          isPoisoned = true;
        }
        continue;
      }
      diagnostics.push(invalidRef(decl, ngModule.rawImports, "import"));
      isPoisoned = true;
    }
    for (const decl of ngModule.declarations) {
      const directive = this.localReader.getDirectiveMetadata(decl);
      const pipe = this.localReader.getPipeMetadata(decl);
      if (directive !== null) {
        if (directive.isStandalone) {
          const refType = directive.isComponent ? "Component" : "Directive";
          diagnostics.push(makeDiagnostic(ErrorCode.NGMODULE_DECLARATION_IS_STANDALONE, decl.getOriginForDiagnostics(ngModule.rawDeclarations), `${refType} ${decl.node.name.text} is standalone, and cannot be declared in an NgModule. Did you mean to import it instead?`));
          isPoisoned = true;
          continue;
        }
        compilationDirectives.set(decl.node, { ...directive, ref: decl });
        if (directive.isPoisoned) {
          isPoisoned = true;
        }
      } else if (pipe !== null) {
        if (pipe.isStandalone) {
          diagnostics.push(makeDiagnostic(ErrorCode.NGMODULE_DECLARATION_IS_STANDALONE, decl.getOriginForDiagnostics(ngModule.rawDeclarations), `Pipe ${decl.node.name.text} is standalone, and cannot be declared in an NgModule. Did you mean to import it instead?`));
          isPoisoned = true;
          continue;
        }
        compilationPipes.set(decl.node, { ...pipe, ref: decl });
      } else {
        const errorNode = decl.getOriginForDiagnostics(ngModule.rawDeclarations);
        diagnostics.push(makeDiagnostic(ErrorCode.NGMODULE_INVALID_DECLARATION, errorNode, `The class '${decl.node.name.text}' is listed in the declarations of the NgModule '${ngModule.ref.node.name.text}', but is not a directive, a component, or a pipe. Either remove it from the NgModule's declarations, or add an appropriate Angular decorator.`, [makeRelatedInformation(decl.node.name, `'${decl.node.name.text}' is declared here.`)]));
        isPoisoned = true;
        continue;
      }
      declared.add(decl.node);
    }
    for (const decl of ngModule.exports) {
      const exportScope = this.getExportedScope(decl, diagnostics, ref.node, "export");
      if (exportScope === "invalid" || exportScope === "cycle" || exportScope !== null && exportScope.exported.isPoisoned) {
        isPoisoned = true;
        if (exportScope !== "cycle") {
          diagnostics.push(invalidTransitiveNgModuleRef(decl, ngModule.rawExports, "export"));
        }
        if (exportScope === "invalid" || exportScope === "cycle") {
          continue;
        }
      } else if (exportScope !== null) {
        for (const dep of exportScope.exported.dependencies) {
          if (dep.kind == MetaKind.Directive) {
            exportDirectives.set(dep.ref.node, dep);
          } else if (dep.kind === MetaKind.Pipe) {
            exportPipes.set(dep.ref.node, dep);
          }
        }
      } else if (compilationDirectives.has(decl.node)) {
        const directive = compilationDirectives.get(decl.node);
        exportDirectives.set(decl.node, directive);
      } else if (compilationPipes.has(decl.node)) {
        const pipe = compilationPipes.get(decl.node);
        exportPipes.set(decl.node, pipe);
      } else {
        const dirMeta = this.fullReader.getDirectiveMetadata(decl);
        const pipeMeta = this.fullReader.getPipeMetadata(decl);
        if (dirMeta !== null || pipeMeta !== null) {
          const isStandalone = dirMeta !== null ? dirMeta.isStandalone : pipeMeta.isStandalone;
          diagnostics.push(invalidReexport(decl, ngModule.rawExports, isStandalone));
        } else {
          diagnostics.push(invalidRef(decl, ngModule.rawExports, "export"));
        }
        isPoisoned = true;
        continue;
      }
    }
    const exported = {
      dependencies: [...exportDirectives.values(), ...exportPipes.values()],
      isPoisoned
    };
    const reexports = this.getReexports(ngModule, ref, declared, exported.dependencies, diagnostics);
    const scope = {
      kind: ComponentScopeKind.NgModule,
      ngModule: ngModule.ref.node,
      compilation: {
        dependencies: [...compilationDirectives.values(), ...compilationPipes.values()],
        isPoisoned
      },
      exported,
      reexports,
      schemas: ngModule.schemas
    };
    if (diagnostics.length > 0) {
      this.scopeErrors.set(ref.node, diagnostics);
      this.modulesWithStructuralErrors.add(ref.node);
    }
    this.cache.set(ref.node, scope);
    return scope;
  }
  /**
   * Check whether a component requires remote scoping.
   */
  getRemoteScope(node) {
    return this.remoteScoping.has(node) ? this.remoteScoping.get(node) : null;
  }
  /**
   * Set a component as requiring remote scoping, with the given directives and pipes to be
   * registered remotely.
   */
  setComponentRemoteScope(node, directives, pipes) {
    this.remoteScoping.set(node, { directives, pipes });
  }
  /**
   * Look up the `ExportScope` of a given `Reference` to an NgModule.
   *
   * The NgModule in question may be declared locally in the current ts.Program, or it may be
   * declared in a .d.ts file.
   *
   * @returns `null` if no scope could be found, or `'invalid'` if the `Reference` is not a valid
   *     NgModule.
   *
   * May also contribute diagnostics of its own by adding to the given `diagnostics`
   * array parameter.
   */
  getExportedScope(ref, diagnostics, ownerForErrors, type) {
    if (ref.node.getSourceFile().isDeclarationFile) {
      if (!ts22.isClassDeclaration(ref.node)) {
        const code = type === "import" ? ErrorCode.NGMODULE_INVALID_IMPORT : ErrorCode.NGMODULE_INVALID_EXPORT;
        diagnostics.push(makeDiagnostic(code, identifierOfNode(ref.node) || ref.node, `Appears in the NgModule.${type}s of ${nodeNameForError(ownerForErrors)}, but could not be resolved to an NgModule`));
        return "invalid";
      }
      return this.dependencyScopeReader.resolve(ref);
    } else {
      const scope = this.getScopeOfModuleReference(ref);
      if (scope === "cycle") {
        diagnostics.push(makeDiagnostic(type === "import" ? ErrorCode.NGMODULE_INVALID_IMPORT : ErrorCode.NGMODULE_INVALID_EXPORT, identifierOfNode(ref.node) || ref.node, `NgModule "${type}" field contains a cycle`));
      }
      return scope;
    }
  }
  getReexports(ngModule, ref, declared, exported, diagnostics) {
    let reexports = null;
    const sourceFile = ref.node.getSourceFile();
    if (this.aliasingHost === null) {
      return null;
    }
    reexports = [];
    const reexportMap = /* @__PURE__ */ new Map();
    const ngModuleRef = ref;
    const addReexport = (exportRef) => {
      if (exportRef.node.getSourceFile() === sourceFile) {
        return;
      }
      const isReExport = !declared.has(exportRef.node);
      const exportName = this.aliasingHost.maybeAliasSymbolAs(exportRef, sourceFile, ngModule.ref.node.name.text, isReExport);
      if (exportName === null) {
        return;
      }
      if (!reexportMap.has(exportName)) {
        if (exportRef.alias && exportRef.alias instanceof ExternalExpr4) {
          reexports.push({
            fromModule: exportRef.alias.value.moduleName,
            symbolName: exportRef.alias.value.name,
            asAlias: exportName
          });
        } else {
          const emittedRef = this.refEmitter.emit(exportRef.cloneWithNoIdentifiers(), sourceFile);
          assertSuccessfulReferenceEmit(emittedRef, ngModuleRef.node.name, "class");
          const expr = emittedRef.expression;
          if (!(expr instanceof ExternalExpr4) || expr.value.moduleName === null || expr.value.name === null) {
            throw new Error("Expected ExternalExpr");
          }
          reexports.push({
            fromModule: expr.value.moduleName,
            symbolName: expr.value.name,
            asAlias: exportName
          });
        }
        reexportMap.set(exportName, exportRef);
      } else {
        const prevRef = reexportMap.get(exportName);
        diagnostics.push(reexportCollision(ngModuleRef.node, prevRef, exportRef));
      }
    };
    for (const { ref: ref2 } of exported) {
      addReexport(ref2);
    }
    return reexports;
  }
  assertCollecting() {
    if (this.sealed) {
      throw new Error(`Assertion: LocalModuleScopeRegistry is not COLLECTING`);
    }
  }
};
function invalidRef(decl, rawExpr, type) {
  const code = type === "import" ? ErrorCode.NGMODULE_INVALID_IMPORT : ErrorCode.NGMODULE_INVALID_EXPORT;
  const resolveTarget = type === "import" ? "NgModule" : "NgModule, Component, Directive, or Pipe";
  const message = `'${decl.node.name.text}' does not appear to be an ${resolveTarget} class.`;
  const library = decl.ownedByModuleGuess !== null ? ` (${decl.ownedByModuleGuess})` : "";
  const sf = decl.node.getSourceFile();
  let relatedMessage;
  if (!sf.isDeclarationFile) {
    const annotationType = type === "import" ? "@NgModule" : "Angular";
    relatedMessage = `Is it missing an ${annotationType} annotation?`;
  } else if (sf.fileName.indexOf("node_modules") !== -1) {
    relatedMessage = `This likely means that the library${library} which declares ${decl.debugName} is not compatible with Angular Ivy. Check if a newer version of the library is available, and update if so. Also consider checking with the library's authors to see if the library is expected to be compatible with Ivy.`;
  } else {
    relatedMessage = `This likely means that the dependency${library} which declares ${decl.debugName} is not compatible with Angular Ivy.`;
  }
  return makeDiagnostic(code, getDiagnosticNode(decl, rawExpr), message, [
    makeRelatedInformation(decl.node.name, relatedMessage)
  ]);
}
function invalidTransitiveNgModuleRef(decl, rawExpr, type) {
  const code = type === "import" ? ErrorCode.NGMODULE_INVALID_IMPORT : ErrorCode.NGMODULE_INVALID_EXPORT;
  return makeDiagnostic(code, getDiagnosticNode(decl, rawExpr), `This ${type} contains errors, which may affect components that depend on this NgModule.`);
}
function invalidReexport(decl, rawExpr, isStandalone) {
  let message = `Can't be exported from this NgModule, as `;
  if (isStandalone) {
    message += "it must be imported first";
  } else if (decl.node.getSourceFile().isDeclarationFile) {
    message += "it must be imported via its NgModule first";
  } else {
    message += "it must be either declared by this NgModule, or imported here via its NgModule first";
  }
  return makeDiagnostic(ErrorCode.NGMODULE_INVALID_REEXPORT, getDiagnosticNode(decl, rawExpr), message);
}
function reexportCollision(module, refA, refB) {
  const childMessageText = `This directive/pipe is part of the exports of '${module.name.text}' and shares the same name as another exported directive/pipe.`;
  return makeDiagnostic(ErrorCode.NGMODULE_REEXPORT_NAME_COLLISION, module.name, `
    There was a name collision between two classes named '${refA.node.name.text}', which are both part of the exports of '${module.name.text}'.

    Angular generates re-exports of an NgModule's exported directives/pipes from the module's source file in certain cases, using the declared name of the class. If two classes of the same name are exported, this automatic naming does not work.

    To fix this problem please re-export one or both classes directly from this file.
  `.trim(), [
    makeRelatedInformation(refA.node.name, childMessageText),
    makeRelatedInformation(refB.node.name, childMessageText)
  ]);
}

// packages/compiler-cli/src/ngtsc/scope/src/selectorless_scope.js
import ts23 from "typescript";
var SelectorlessComponentScopeReader = class {
  metaReader;
  reflector;
  cache = /* @__PURE__ */ new Map();
  constructor(metaReader, reflector) {
    this.metaReader = metaReader;
    this.reflector = reflector;
  }
  getScopeForComponent(node) {
    if (this.cache.has(node)) {
      return this.cache.get(node);
    }
    const clazzRef = new Reference(node);
    const meta = this.metaReader.getDirectiveMetadata(clazzRef);
    if (meta === null || !meta.isComponent || !meta.isStandalone || !meta.selectorlessEnabled) {
      this.cache.set(node, null);
      return null;
    }
    const eligibleIdentifiers = this.getAvailableIdentifiers(node);
    const dependencies = /* @__PURE__ */ new Map();
    const dependencyIdentifiers = [];
    let isPoisoned = meta.isPoisoned;
    for (const [name, identifier] of eligibleIdentifiers) {
      if (dependencies.has(name)) {
        continue;
      }
      const dep = this.getMetaFromIdentifier(meta, name, identifier);
      if (dep !== null) {
        dependencies.set(name, dep);
        dependencyIdentifiers.push(identifier);
        if (dep.kind === MetaKind.Directive && dep.isPoisoned) {
          isPoisoned = true;
        }
      }
    }
    const scope = {
      kind: ComponentScopeKind.Selectorless,
      component: node,
      dependencies,
      dependencyIdentifiers,
      isPoisoned,
      schemas: meta.schemas ?? []
    };
    this.cache.set(node, scope);
    return scope;
  }
  getRemoteScope() {
    return null;
  }
  /** Determines which identifiers a class has access to. */
  getAvailableIdentifiers(node) {
    const result = /* @__PURE__ */ new Map();
    let current = ts23.getOriginalNode(node).parent;
    while (current) {
      if (!ts23.isSourceFile(current) && !ts23.isBlock(current)) {
        current = current.parent;
        continue;
      }
      for (const stmt of current.statements) {
        if (this.reflector.isClass(stmt)) {
          result.set(stmt.name.text, stmt.name);
          continue;
        }
        if (ts23.isImportDeclaration(stmt) && stmt.importClause !== void 0 && !(stmt.importClause.phaseModifier === ts23.SyntaxKind.TypeKeyword)) {
          const clause = stmt.importClause;
          if (clause.namedBindings !== void 0 && ts23.isNamedImports(clause.namedBindings)) {
            for (const element of clause.namedBindings.elements) {
              if (!element.isTypeOnly) {
                result.set(element.name.text, element.name);
              }
            }
          }
          if (clause.name !== void 0) {
            result.set(clause.name.text, clause.name);
          }
          continue;
        }
      }
      current = current.parent;
    }
    return result;
  }
  getMetaFromIdentifier(meta, localName, node) {
    if (meta.localReferencedSymbols === null || !meta.localReferencedSymbols.has(localName)) {
      return null;
    }
    const declaration = this.reflector.getDeclarationOfIdentifier(node);
    if (declaration === null || !this.reflector.isClass(declaration.node)) {
      return null;
    }
    const ref = new Reference(declaration.node);
    return this.metaReader.getDirectiveMetadata(ref) ?? this.metaReader.getPipeMetadata(ref);
  }
};

// packages/compiler-cli/src/ngtsc/scope/src/typecheck.js
import { CssSelector, SelectorlessMatcher, SelectorMatcher } from "@angular/compiler";
var TypeCheckScopeRegistry = class {
  scopeReader;
  metaReader;
  hostDirectivesResolver;
  /**
   * Cache of flattened directive metadata. Because flattened metadata is scope-invariant it's
   * cached individually, such that all scopes refer to the same flattened metadata.
   */
  flattenedDirectiveMetaCache = /* @__PURE__ */ new Map();
  /**
   * Cache of the computed type check scope per NgModule declaration.
   */
  scopeCache = /* @__PURE__ */ new Map();
  constructor(scopeReader, metaReader, hostDirectivesResolver) {
    this.scopeReader = scopeReader;
    this.metaReader = metaReader;
    this.hostDirectivesResolver = hostDirectivesResolver;
  }
  /**
   * Computes the type-check scope information for the component declaration. If the NgModule
   * contains an error, then 'error' is returned. If the component is not declared in any NgModule,
   * an empty type-check scope is returned.
   */
  getTypeCheckScope(ref) {
    const directives = [];
    const pipes = /* @__PURE__ */ new Map();
    const scope = this.scopeReader.getScopeForComponent(ref.node);
    const hostMeta = this.getTypeCheckDirectiveMetadata(ref);
    const directivesOnHost = hostMeta === null ? null : this.combineWithHostDirectives(hostMeta);
    if (scope === null) {
      return {
        matcher: null,
        foreignMatcher: null,
        directives,
        pipes,
        schemas: [],
        isPoisoned: false,
        directivesOnHost
      };
    }
    const isNgModuleScope = scope.kind === ComponentScopeKind.NgModule;
    const isSelectorlessScope = scope.kind === ComponentScopeKind.Selectorless;
    const cacheKey = isNgModuleScope ? scope.ngModule : scope.component;
    if (this.scopeCache.has(cacheKey)) {
      return this.scopeCache.get(cacheKey);
    }
    let matcher;
    if (isSelectorlessScope) {
      matcher = this.getSelectorlessMatcher(scope);
      for (const [name, dep] of scope.dependencies) {
        if (dep.kind === MetaKind.Directive) {
          directives.push(dep);
        } else {
          pipes.set(name, dep);
        }
      }
    } else {
      const dependencies = isNgModuleScope ? scope.compilation.dependencies : scope.dependencies;
      let allDependencies = dependencies;
      if (!isNgModuleScope && Array.isArray(scope.deferredDependencies) && scope.deferredDependencies.length > 0) {
        allDependencies = [...allDependencies, ...scope.deferredDependencies];
      }
      matcher = this.getSelectorMatcher(allDependencies);
      for (const dep of allDependencies) {
        if (dep.kind === MetaKind.Directive) {
          directives.push(dep);
        } else if (dep.kind === MetaKind.Pipe && dep.name !== null) {
          pipes.set(dep.name, dep);
        }
      }
    }
    const foreignMatcher = hostMeta !== null ? createForeignComponentMatcher(hostMeta.foreignImports) : null;
    const typeCheckScope = {
      matcher,
      foreignMatcher,
      directives,
      pipes,
      schemas: scope.schemas,
      directivesOnHost,
      isPoisoned: scope.kind === ComponentScopeKind.NgModule ? scope.compilation.isPoisoned || scope.exported.isPoisoned : scope.isPoisoned
    };
    this.scopeCache.set(cacheKey, typeCheckScope);
    return typeCheckScope;
  }
  getTypeCheckDirectiveMetadata(ref) {
    const clazz = ref.node;
    if (this.flattenedDirectiveMetaCache.has(clazz)) {
      return this.flattenedDirectiveMetaCache.get(clazz);
    }
    const meta = flattenInheritedDirectiveMetadata(this.metaReader, ref);
    if (meta === null) {
      return null;
    }
    this.flattenedDirectiveMetaCache.set(clazz, meta);
    return meta;
  }
  applyExplicitlyDeferredFlag(meta, isExplicitlyDeferred) {
    return isExplicitlyDeferred === true ? { ...meta, isExplicitlyDeferred } : meta;
  }
  getSelectorMatcher(allDependencies) {
    const matcher = new SelectorMatcher();
    for (const meta of allDependencies) {
      if (meta.kind === MetaKind.Directive && meta.selector !== null) {
        const extMeta = this.getTypeCheckDirectiveMetadata(meta.ref);
        if (extMeta === null) {
          continue;
        }
        const directiveMeta = this.applyExplicitlyDeferredFlag(extMeta, meta.isExplicitlyDeferred);
        matcher.addSelectables(CssSelector.parse(meta.selector), this.combineWithHostDirectives(directiveMeta));
      }
    }
    return matcher;
  }
  getSelectorlessMatcher(scope) {
    const registry = /* @__PURE__ */ new Map();
    for (const [name, dep] of scope.dependencies) {
      const extMeta = dep.kind === MetaKind.Directive ? this.getTypeCheckDirectiveMetadata(dep.ref) : null;
      if (extMeta !== null) {
        registry.set(name, this.combineWithHostDirectives(extMeta));
      }
    }
    return new SelectorlessMatcher(registry);
  }
  combineWithHostDirectives(meta) {
    return [...this.hostDirectivesResolver.resolve(meta), meta];
  }
};

// packages/compiler-cli/src/ngtsc/annotations/directive/src/handler.js
import { compileClassMetadata, compileDeclareClassMetadata, compileDeclareDirectiveFromMetadata, compileDirectiveFromMetadata, createHostElement, FactoryTarget, makeBindingParser, MatchSource, R3TargetBinder, WrappedNodeExpr as WrappedNodeExpr6 } from "@angular/compiler";
import ts24 from "typescript";

// packages/compiler-cli/src/ngtsc/annotations/directive/src/symbol.js
var DirectiveSymbol = class _DirectiveSymbol extends SemanticSymbol {
  selector;
  inputs;
  outputs;
  exportAs;
  typeCheckMeta;
  typeParameters;
  baseClass = null;
  constructor(decl, selector, inputs, outputs, exportAs, typeCheckMeta, typeParameters) {
    super(decl);
    this.selector = selector;
    this.inputs = inputs;
    this.outputs = outputs;
    this.exportAs = exportAs;
    this.typeCheckMeta = typeCheckMeta;
    this.typeParameters = typeParameters;
  }
  isPublicApiAffected(previousSymbol) {
    if (!(previousSymbol instanceof _DirectiveSymbol)) {
      return true;
    }
    return this.selector !== previousSymbol.selector || !isArrayEqual(this.inputs.propertyNames, previousSymbol.inputs.propertyNames) || !isArrayEqual(this.outputs.propertyNames, previousSymbol.outputs.propertyNames) || !isArrayEqual(this.exportAs, previousSymbol.exportAs);
  }
  isTypeCheckApiAffected(previousSymbol) {
    if (this.isPublicApiAffected(previousSymbol)) {
      return true;
    }
    if (!(previousSymbol instanceof _DirectiveSymbol)) {
      return true;
    }
    if (!isArrayEqual(Array.from(this.inputs), Array.from(previousSymbol.inputs), isInputMappingEqual) || !isArrayEqual(Array.from(this.outputs), Array.from(previousSymbol.outputs), isInputOrOutputEqual)) {
      return true;
    }
    if (!areTypeParametersEqual(this.typeParameters, previousSymbol.typeParameters)) {
      return true;
    }
    if (!isTypeCheckMetaEqual(this.typeCheckMeta, previousSymbol.typeCheckMeta)) {
      return true;
    }
    if (!isBaseClassEqual(this.baseClass, previousSymbol.baseClass)) {
      return true;
    }
    return false;
  }
};
function isInputMappingEqual(current, previous) {
  return isInputOrOutputEqual(current, previous) && current.required === previous.required;
}
function isInputOrOutputEqual(current, previous) {
  return current.classPropertyName === previous.classPropertyName && current.bindingPropertyName === previous.bindingPropertyName && current.isSignal === previous.isSignal;
}
function isTypeCheckMetaEqual(current, previous) {
  if (current.hasNgTemplateContextGuard !== previous.hasNgTemplateContextGuard) {
    return false;
  }
  if (current.isGeneric !== previous.isGeneric) {
    return false;
  }
  if (!isArrayEqual(current.ngTemplateGuards, previous.ngTemplateGuards, isTemplateGuardEqual)) {
    return false;
  }
  if (!isSetEqual(current.coercedInputFields, previous.coercedInputFields)) {
    return false;
  }
  if (!isSetEqual(current.restrictedInputFields, previous.restrictedInputFields)) {
    return false;
  }
  if (!isSetEqual(current.stringLiteralInputFields, previous.stringLiteralInputFields)) {
    return false;
  }
  if (!isSetEqual(current.undeclaredInputFields, previous.undeclaredInputFields)) {
    return false;
  }
  return true;
}
function isTemplateGuardEqual(current, previous) {
  return current.inputName === previous.inputName && current.type === previous.type;
}
function isBaseClassEqual(current, previous) {
  if (current === null || previous === null) {
    return current === previous;
  }
  return isSymbolEqual(current, previous);
}

// packages/compiler-cli/src/ngtsc/annotations/directive/src/handler.js
var FIELD_DECORATORS = [
  "Input",
  "Output",
  "ViewChild",
  "ViewChildren",
  "ContentChild",
  "ContentChildren",
  "HostBinding",
  "HostListener"
];
var LIFECYCLE_HOOKS = /* @__PURE__ */ new Set([
  "ngOnChanges",
  "ngOnInit",
  "ngOnDestroy",
  "ngDoCheck",
  "ngAfterViewInit",
  "ngAfterViewChecked",
  "ngAfterContentInit",
  "ngAfterContentChecked"
]);
var DirectiveDecoratorHandler = class {
  reflector;
  evaluator;
  metaRegistry;
  scopeRegistry;
  metaReader;
  injectableRegistry;
  refEmitter;
  referencesRegistry;
  isCore;
  strictCtorDeps;
  semanticDepGraphUpdater;
  annotateForClosureCompiler;
  perf;
  importTracker;
  includeClassMetadata;
  typeCheckScopeRegistry;
  compilationMode;
  jitDeclarationRegistry;
  resourceRegistry;
  strictStandalone;
  implicitStandaloneValue;
  usePoisonedData;
  typeCheckHostBindings;
  emitDeclarationOnly;
  legacyOptionalChaining;
  constructor(reflector, evaluator, metaRegistry, scopeRegistry, metaReader, injectableRegistry, refEmitter, referencesRegistry, isCore, strictCtorDeps, semanticDepGraphUpdater, annotateForClosureCompiler, perf, importTracker, includeClassMetadata, typeCheckScopeRegistry, compilationMode, jitDeclarationRegistry, resourceRegistry, strictStandalone, implicitStandaloneValue, usePoisonedData, typeCheckHostBindings, emitDeclarationOnly, legacyOptionalChaining) {
    this.reflector = reflector;
    this.evaluator = evaluator;
    this.metaRegistry = metaRegistry;
    this.scopeRegistry = scopeRegistry;
    this.metaReader = metaReader;
    this.injectableRegistry = injectableRegistry;
    this.refEmitter = refEmitter;
    this.referencesRegistry = referencesRegistry;
    this.isCore = isCore;
    this.strictCtorDeps = strictCtorDeps;
    this.semanticDepGraphUpdater = semanticDepGraphUpdater;
    this.annotateForClosureCompiler = annotateForClosureCompiler;
    this.perf = perf;
    this.importTracker = importTracker;
    this.includeClassMetadata = includeClassMetadata;
    this.typeCheckScopeRegistry = typeCheckScopeRegistry;
    this.compilationMode = compilationMode;
    this.jitDeclarationRegistry = jitDeclarationRegistry;
    this.resourceRegistry = resourceRegistry;
    this.strictStandalone = strictStandalone;
    this.implicitStandaloneValue = implicitStandaloneValue;
    this.usePoisonedData = usePoisonedData;
    this.typeCheckHostBindings = typeCheckHostBindings;
    this.emitDeclarationOnly = emitDeclarationOnly;
    this.legacyOptionalChaining = legacyOptionalChaining;
    this.undecoratedMetadataExtractor = getDirectiveUndecoratedMetadataExtractor(reflector, importTracker);
  }
  precedence = HandlerPrecedence.PRIMARY;
  name = "DirectiveDecoratorHandler";
  undecoratedMetadataExtractor;
  detect(node, decorators) {
    if (!decorators) {
      const angularField = this.findClassFieldWithAngularFeatures(node);
      return angularField ? { trigger: angularField.node, decorator: null, metadata: null } : void 0;
    } else {
      const decorator = findAngularDecorator(decorators, "Directive", this.isCore);
      return decorator ? { trigger: decorator.node, decorator, metadata: decorator } : void 0;
    }
  }
  analyze(node, decorator) {
    if (decorator === null) {
      if (this.isCore) {
        return {};
      }
      return { diagnostics: [getUndecoratedClassWithAngularFeaturesDiagnostic(node)] };
    }
    this.perf.eventCount(PerfEvent.AnalyzeDirective);
    const directiveResult = extractDirectiveMetadata(
      node,
      decorator,
      this.reflector,
      this.importTracker,
      this.evaluator,
      this.refEmitter,
      this.referencesRegistry,
      this.isCore,
      this.annotateForClosureCompiler,
      this.compilationMode,
      /* defaultSelector */
      null,
      this.strictStandalone,
      this.implicitStandaloneValue,
      this.emitDeclarationOnly,
      this.legacyOptionalChaining
    );
    if (directiveResult.jitForced) {
      this.jitDeclarationRegistry.jitDeclarations.add(node);
      return {};
    }
    const analysis = directiveResult.metadata;
    let providersRequiringFactory = null;
    if (directiveResult !== void 0 && directiveResult.decorator.has("providers")) {
      providersRequiringFactory = resolveProvidersRequiringFactory(directiveResult.decorator.get("providers"), this.reflector, this.evaluator);
    }
    return {
      analysis: {
        inputs: directiveResult.inputs,
        inputFieldNamesFromMetadataArray: directiveResult.inputFieldNamesFromMetadataArray,
        outputs: directiveResult.outputs,
        meta: analysis,
        hostDirectives: directiveResult.hostDirectives,
        rawHostDirectives: directiveResult.rawHostDirectives,
        classMetadata: this.includeClassMetadata ? extractClassMetadata(node, this.reflector, this.isCore, this.annotateForClosureCompiler, void 0, this.undecoratedMetadataExtractor) : null,
        baseClass: readBaseClass(node, this.reflector, this.evaluator),
        typeCheckMeta: extractDirectiveTypeCheckMeta(node, directiveResult.inputs, this.reflector),
        providersRequiringFactory,
        isPoisoned: false,
        isStructural: directiveResult.isStructural,
        decorator: decorator?.node ?? null,
        hostBindingNodes: directiveResult.hostBindingNodes,
        resources: {
          template: null,
          styles: null,
          hostBindings: extractHostBindingResources(directiveResult.hostBindingNodes)
        }
      }
    };
  }
  symbol(node, analysis) {
    const typeParameters = extractSemanticTypeParameters(node);
    return new DirectiveSymbol(node, analysis.meta.selector, analysis.inputs, analysis.outputs, analysis.meta.exportAs, analysis.typeCheckMeta, typeParameters);
  }
  register(node, analysis) {
    const ref = new Reference(node);
    this.metaRegistry.registerDirectiveMetadata({
      kind: MetaKind.Directive,
      matchSource: MatchSource.Selector,
      ref,
      name: node.name.text,
      selector: analysis.meta.selector,
      exportAs: analysis.meta.exportAs,
      inputs: analysis.inputs,
      inputFieldNamesFromMetadataArray: analysis.inputFieldNamesFromMetadataArray,
      outputs: analysis.outputs,
      queries: analysis.meta.queries.map((query) => query.propertyName),
      isComponent: false,
      baseClass: analysis.baseClass,
      hostDirectives: analysis.hostDirectives,
      ...analysis.typeCheckMeta,
      isPoisoned: analysis.isPoisoned,
      isStructural: analysis.isStructural,
      animationTriggerNames: null,
      isStandalone: analysis.meta.isStandalone,
      isSignal: analysis.meta.isSignal,
      imports: null,
      foreignImports: null,
      rawImports: null,
      deferredImports: null,
      schemas: null,
      ngContentSelectors: null,
      decorator: analysis.decorator,
      preserveWhitespaces: false,
      // Directives analyzed within our own compilation are not _assumed_ to export providers.
      // Instead, we statically analyze their imports to make a direct determination.
      assumedToExportProviders: false,
      isExplicitlyDeferred: false,
      selectorlessEnabled: false,
      localReferencedSymbols: null
    });
    this.resourceRegistry.registerResources(analysis.resources, node);
    this.injectableRegistry.registerInjectable(node, {
      ctorDeps: analysis.meta.deps
    });
  }
  typeCheck(ctx, node, meta) {
    if (!this.typeCheckHostBindings) {
      return;
    }
    if (!ts24.isClassDeclaration(node) || meta.isPoisoned && !this.usePoisonedData) {
      return;
    }
    const ref = new Reference(node);
    const scope = this.typeCheckScopeRegistry.getTypeCheckScope(ref);
    if (scope.isPoisoned && !this.usePoisonedData) {
      return;
    }
    const hostElement = createHostElement("directive", meta.meta.selector, createSourceSpan(node.name), meta.hostBindingNodes.hostObjectLiteralBindings, meta.hostBindingNodes.hostBindingDecorators, meta.hostBindingNodes.hostListenerDecorators);
    if (hostElement !== null && scope.directivesOnHost !== null) {
      const binder = new R3TargetBinder(scope.matcher);
      const hostBindingsContext = {
        node: hostElement,
        directives: scope.directivesOnHost,
        sourceMapping: { type: "direct", node }
      };
      ctx.addDirective(ref, binder, scope.schemas, null, hostBindingsContext, meta.meta.isStandalone);
    }
  }
  resolve(node, analysis, symbol) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      return {};
    }
    if (this.semanticDepGraphUpdater !== null && analysis.baseClass instanceof Reference) {
      symbol.baseClass = this.semanticDepGraphUpdater.getSymbol(analysis.baseClass.node);
    }
    const diagnostics = [];
    if (analysis.providersRequiringFactory !== null && analysis.meta.providers instanceof WrappedNodeExpr6) {
      const providerDiagnostics = getProviderDiagnostics(analysis.providersRequiringFactory, analysis.meta.providers.node, this.injectableRegistry);
      diagnostics.push(...providerDiagnostics);
    }
    const directiveDiagnostics = getDirectiveDiagnostics(node, this.injectableRegistry, this.evaluator, this.reflector, this.scopeRegistry, this.strictCtorDeps, "Directive");
    if (directiveDiagnostics !== null) {
      diagnostics.push(...directiveDiagnostics);
    }
    const hostDirectivesDiagnotics = analysis.hostDirectives && analysis.rawHostDirectives ? validateHostDirectives(analysis.rawHostDirectives, analysis.hostDirectives, this.metaReader) : null;
    if (hostDirectivesDiagnotics !== null) {
      diagnostics.push(...hostDirectivesDiagnotics);
    }
    if (diagnostics.length > 0) {
      return { diagnostics };
    }
    return { data: {} };
  }
  compileFull(node, analysis, resolution, pool) {
    const fac = compileNgFactoryDefField(toFactoryMetadata(analysis.meta, FactoryTarget.Directive));
    const def = compileDirectiveFromMetadata(analysis.meta, pool, makeBindingParser());
    const inputTransformFields = compileInputTransformFields(analysis.inputs);
    const classMetadata = analysis.classMetadata !== null ? compileClassMetadata(analysis.classMetadata).toStmt() : null;
    return compileResults(
      fac,
      def,
      classMetadata,
      "\u0275dir",
      inputTransformFields,
      null
      /* deferrableImports */
    );
  }
  compilePartial(node, analysis, resolution) {
    const fac = compileDeclareFactory(toFactoryMetadata(analysis.meta, FactoryTarget.Directive));
    const def = compileDeclareDirectiveFromMetadata(analysis.meta);
    const inputTransformFields = compileInputTransformFields(analysis.inputs);
    const classMetadata = analysis.classMetadata !== null ? compileDeclareClassMetadata(analysis.classMetadata).toStmt() : null;
    return compileResults(
      fac,
      def,
      classMetadata,
      "\u0275dir",
      inputTransformFields,
      null
      /* deferrableImports */
    );
  }
  compileLocal(node, analysis, resolution, pool) {
    const fac = compileNgFactoryDefField(toFactoryMetadata(analysis.meta, FactoryTarget.Directive));
    const def = compileDirectiveFromMetadata(analysis.meta, pool, makeBindingParser());
    const inputTransformFields = compileInputTransformFields(analysis.inputs);
    const classMetadata = analysis.classMetadata !== null ? compileClassMetadata(analysis.classMetadata).toStmt() : null;
    return compileResults(
      fac,
      def,
      classMetadata,
      "\u0275dir",
      inputTransformFields,
      null
      /* deferrableImports */
    );
  }
  /**
   * Checks if a given class uses Angular features and returns the TypeScript node
   * that indicated the usage. Classes are considered using Angular features if they
   * contain class members that are either decorated with a known Angular decorator,
   * or if they correspond to a known Angular lifecycle hook.
   */
  findClassFieldWithAngularFeatures(node) {
    return this.reflector.getMembersOfClass(node).find((member) => {
      if (!member.isStatic && member.kind === ClassMemberKind.Method && LIFECYCLE_HOOKS.has(member.name)) {
        return true;
      }
      if (member.decorators) {
        return member.decorators.some((decorator) => FIELD_DECORATORS.some((decoratorName) => isAngularDecorator2(decorator, decoratorName, this.isCore)));
      }
      return false;
    });
  }
};

// packages/compiler-cli/src/ngtsc/annotations/ng_module/src/handler.js
import { compileClassMetadata as compileClassMetadata2, compileDeclareClassMetadata as compileDeclareClassMetadata2, compileDeclareInjectorFromMetadata, compileDeclareNgModuleFromMetadata, compileInjector, compileNgModule, ExternalExpr as ExternalExpr5, FactoryTarget as FactoryTarget2, FunctionExpr, InvokeFunctionExpr, LiteralArrayExpr as LiteralArrayExpr3, R3Identifiers as R3Identifiers2, R3NgModuleMetadataKind, R3SelectorScopeMode, ReturnStatement, TypeofExpr, WrappedNodeExpr as WrappedNodeExpr7 } from "@angular/compiler";
import ts26 from "typescript";

// packages/compiler-cli/src/ngtsc/annotations/ng_module/src/module_with_providers.js
import ts25 from "typescript";
function createModuleWithProvidersResolver(reflector, isCore) {
  function _reflectModuleFromTypeParam(type, node) {
    if (!ts25.isTypeReferenceNode(type)) {
      return null;
    }
    const typeName = type && (ts25.isIdentifier(type.typeName) && type.typeName || ts25.isQualifiedName(type.typeName) && type.typeName.right) || null;
    if (typeName === null) {
      return null;
    }
    const id = reflector.getImportOfIdentifier(typeName);
    if (id === null || id.name !== "ModuleWithProviders") {
      return null;
    }
    if (!isCore && id.from !== "@angular/core") {
      return null;
    }
    if (type.typeArguments === void 0 || type.typeArguments.length !== 1) {
      const parent = ts25.isMethodDeclaration(node) && ts25.isClassDeclaration(node.parent) ? node.parent : null;
      const symbolName = (parent && parent.name ? parent.name.getText() + "." : "") + (node.name ? node.name.getText() : "anonymous");
      throw new FatalDiagnosticError(ErrorCode.NGMODULE_MODULE_WITH_PROVIDERS_MISSING_GENERIC, type, `${symbolName} returns a ModuleWithProviders type without a generic type argument. Please add a generic type argument to the ModuleWithProviders type. If this occurrence is in library code you don't control, please contact the library authors.`);
    }
    const arg = type.typeArguments[0];
    return typeNodeToValueExpr(arg);
  }
  function _reflectModuleFromLiteralType(type) {
    if (!ts25.isIntersectionTypeNode(type)) {
      return null;
    }
    for (const t of type.types) {
      if (ts25.isTypeLiteralNode(t)) {
        for (const m of t.members) {
          const ngModuleType = ts25.isPropertySignature(m) && ts25.isIdentifier(m.name) && m.name.text === "ngModule" && m.type || null;
          let ngModuleExpression = null;
          if (ngModuleType !== null && ts25.isTypeQueryNode(ngModuleType)) {
            ngModuleExpression = entityNameToValue(ngModuleType.exprName);
          } else if (ngModuleType !== null) {
            ngModuleExpression = typeNodeToValueExpr(ngModuleType);
          }
          if (ngModuleExpression) {
            return ngModuleExpression;
          }
        }
      }
    }
    return null;
  }
  return (fn, callExpr, resolve, unresolvable) => {
    const rawType = fn.node.type;
    if (rawType === void 0) {
      return unresolvable;
    }
    const type = _reflectModuleFromTypeParam(rawType, fn.node) ?? _reflectModuleFromLiteralType(rawType);
    if (type === null) {
      return unresolvable;
    }
    const ngModule = resolve(type);
    if (!(ngModule instanceof Reference) || !isNamedClassDeclaration(ngModule.node)) {
      return unresolvable;
    }
    return new SyntheticValue({
      ngModule,
      mwpCall: callExpr
    });
  };
}
function isResolvedModuleWithProviders(sv) {
  return typeof sv.value === "object" && sv.value != null && sv.value.hasOwnProperty("ngModule") && sv.value.hasOwnProperty("mwpCall");
}

// packages/compiler-cli/src/ngtsc/annotations/ng_module/src/handler.js
var NgModuleSymbol = class _NgModuleSymbol extends SemanticSymbol {
  hasProviders;
  remotelyScopedComponents = [];
  /**
   * `SemanticSymbol`s of the transitive imports of this NgModule which came from imported
   * standalone components.
   *
   * Standalone components are excluded/included in the `InjectorDef` emit output of the NgModule
   * based on whether the compiler can prove that their transitive imports may contain exported
   * providers, so a change in this set of symbols may affect the compilation output of this
   * NgModule.
   */
  transitiveImportsFromStandaloneComponents = /* @__PURE__ */ new Set();
  constructor(decl, hasProviders) {
    super(decl);
    this.hasProviders = hasProviders;
  }
  isPublicApiAffected(previousSymbol) {
    if (!(previousSymbol instanceof _NgModuleSymbol)) {
      return true;
    }
    if (previousSymbol.hasProviders !== this.hasProviders) {
      return true;
    }
    return false;
  }
  isEmitAffected(previousSymbol) {
    if (!(previousSymbol instanceof _NgModuleSymbol)) {
      return true;
    }
    if (previousSymbol.remotelyScopedComponents.length !== this.remotelyScopedComponents.length) {
      return true;
    }
    for (const currEntry of this.remotelyScopedComponents) {
      const prevEntry = previousSymbol.remotelyScopedComponents.find((prevEntry2) => {
        return isSymbolEqual(prevEntry2.component, currEntry.component);
      });
      if (prevEntry === void 0) {
        return true;
      }
      if (!isArrayEqual(currEntry.usedDirectives, prevEntry.usedDirectives, isReferenceEqual)) {
        return true;
      }
      if (!isArrayEqual(currEntry.usedPipes, prevEntry.usedPipes, isReferenceEqual)) {
        return true;
      }
    }
    if (previousSymbol.transitiveImportsFromStandaloneComponents.size !== this.transitiveImportsFromStandaloneComponents.size) {
      return true;
    }
    const previousImports = Array.from(previousSymbol.transitiveImportsFromStandaloneComponents);
    for (const transitiveImport of this.transitiveImportsFromStandaloneComponents) {
      const prevEntry = previousImports.find((prevEntry2) => isSymbolEqual(prevEntry2, transitiveImport));
      if (prevEntry === void 0) {
        return true;
      }
      if (transitiveImport.isPublicApiAffected(prevEntry)) {
        return true;
      }
    }
    return false;
  }
  isTypeCheckApiAffected(previousSymbol) {
    if (!(previousSymbol instanceof _NgModuleSymbol)) {
      return true;
    }
    return false;
  }
  addRemotelyScopedComponent(component, usedDirectives, usedPipes) {
    this.remotelyScopedComponents.push({ component, usedDirectives, usedPipes });
  }
  addTransitiveImportFromStandaloneComponent(importedSymbol) {
    this.transitiveImportsFromStandaloneComponents.add(importedSymbol);
  }
};
var NgModuleDecoratorHandler = class {
  reflector;
  evaluator;
  metaReader;
  metaRegistry;
  scopeRegistry;
  referencesRegistry;
  exportedProviderStatusResolver;
  semanticDepGraphUpdater;
  isCore;
  refEmitter;
  annotateForClosureCompiler;
  onlyPublishPublicTypings;
  injectableRegistry;
  perf;
  includeClassMetadata;
  includeSelectorScope;
  compilationMode;
  localCompilationExtraImportsTracker;
  jitDeclarationRegistry;
  emitDeclarationOnly;
  constructor(reflector, evaluator, metaReader, metaRegistry, scopeRegistry, referencesRegistry, exportedProviderStatusResolver, semanticDepGraphUpdater, isCore, refEmitter, annotateForClosureCompiler, onlyPublishPublicTypings, injectableRegistry, perf, includeClassMetadata, includeSelectorScope, compilationMode, localCompilationExtraImportsTracker, jitDeclarationRegistry, emitDeclarationOnly) {
    this.reflector = reflector;
    this.evaluator = evaluator;
    this.metaReader = metaReader;
    this.metaRegistry = metaRegistry;
    this.scopeRegistry = scopeRegistry;
    this.referencesRegistry = referencesRegistry;
    this.exportedProviderStatusResolver = exportedProviderStatusResolver;
    this.semanticDepGraphUpdater = semanticDepGraphUpdater;
    this.isCore = isCore;
    this.refEmitter = refEmitter;
    this.annotateForClosureCompiler = annotateForClosureCompiler;
    this.onlyPublishPublicTypings = onlyPublishPublicTypings;
    this.injectableRegistry = injectableRegistry;
    this.perf = perf;
    this.includeClassMetadata = includeClassMetadata;
    this.includeSelectorScope = includeSelectorScope;
    this.compilationMode = compilationMode;
    this.localCompilationExtraImportsTracker = localCompilationExtraImportsTracker;
    this.jitDeclarationRegistry = jitDeclarationRegistry;
    this.emitDeclarationOnly = emitDeclarationOnly;
  }
  precedence = HandlerPrecedence.PRIMARY;
  name = "NgModuleDecoratorHandler";
  detect(node, decorators) {
    if (!decorators) {
      return void 0;
    }
    const decorator = findAngularDecorator(decorators, "NgModule", this.isCore);
    if (decorator !== void 0) {
      return {
        trigger: decorator.node,
        decorator,
        metadata: decorator
      };
    } else {
      return void 0;
    }
  }
  analyze(node, decorator) {
    this.perf.eventCount(PerfEvent.AnalyzeNgModule);
    const name = node.name.text;
    if (decorator.args === null || decorator.args.length > 1) {
      throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `Incorrect number of arguments to @NgModule decorator`);
    }
    const meta = decorator.args.length === 1 ? unwrapExpression(decorator.args[0]) : ts26.factory.createObjectLiteralExpression([]);
    if (!ts26.isObjectLiteralExpression(meta)) {
      throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, "@NgModule argument must be an object literal");
    }
    const ngModule = reflectObjectLiteral(meta);
    if (ngModule.has("jit")) {
      this.jitDeclarationRegistry.jitDeclarations.add(node);
      return {};
    }
    if (this.emitDeclarationOnly) {
      return this.analyzeForDeclarationOnly(node, name, ngModule, decorator);
    }
    const forwardRefResolver = createForwardRefResolver(this.isCore);
    const moduleResolvers = combineResolvers([
      createModuleWithProvidersResolver(this.reflector, this.isCore),
      forwardRefResolver
    ]);
    const allowUnresolvedReferences = this.compilationMode === CompilationMode.LOCAL;
    const diagnostics = [];
    let declarationRefs = [];
    const rawDeclarations = ngModule.get("declarations") ?? null;
    if (rawDeclarations !== null) {
      const declarationMeta = this.evaluator.evaluate(rawDeclarations, forwardRefResolver);
      declarationRefs = this.resolveTypeList(rawDeclarations, declarationMeta, name, "declarations", 0, allowUnresolvedReferences).references;
      for (const ref of declarationRefs) {
        if (ref.node.getSourceFile().isDeclarationFile) {
          const errorNode = ref.getOriginForDiagnostics(rawDeclarations);
          diagnostics.push(makeDiagnostic(ErrorCode.NGMODULE_INVALID_DECLARATION, errorNode, `Cannot declare '${ref.node.name.text}' in an NgModule as it's not a part of the current compilation.`, [makeRelatedInformation(ref.node.name, `'${ref.node.name.text}' is declared here.`)]));
        }
      }
    }
    if (diagnostics.length > 0) {
      return { diagnostics };
    }
    let importRefs = [];
    let rawImports = ngModule.get("imports") ?? null;
    if (rawImports !== null) {
      const importsMeta = this.evaluator.evaluate(rawImports, moduleResolvers);
      const result = this.resolveTypeList(rawImports, importsMeta, name, "imports", 0, allowUnresolvedReferences);
      if (this.compilationMode === CompilationMode.LOCAL && this.localCompilationExtraImportsTracker !== null) {
        for (const d of result.dynamicValues) {
          this.localCompilationExtraImportsTracker.addGlobalImportFromIdentifier(d.node);
        }
      }
      importRefs = result.references;
    }
    let exportRefs = [];
    const rawExports = ngModule.get("exports") ?? null;
    if (rawExports !== null) {
      const exportsMeta = this.evaluator.evaluate(rawExports, moduleResolvers);
      exportRefs = this.resolveTypeList(rawExports, exportsMeta, name, "exports", 0, allowUnresolvedReferences).references;
      this.referencesRegistry.add(node, ...exportRefs);
    }
    let bootstrapRefs = [];
    const rawBootstrap = ngModule.get("bootstrap") ?? null;
    if (!allowUnresolvedReferences && rawBootstrap !== null) {
      const bootstrapMeta = this.evaluator.evaluate(rawBootstrap, forwardRefResolver);
      bootstrapRefs = this.resolveTypeList(
        rawBootstrap,
        bootstrapMeta,
        name,
        "bootstrap",
        0,
        /* allowUnresolvedReferences */
        false
      ).references;
      for (const ref of bootstrapRefs) {
        const dirMeta = this.metaReader.getDirectiveMetadata(ref);
        if (dirMeta?.isStandalone) {
          diagnostics.push(makeStandaloneBootstrapDiagnostic(node, ref, rawBootstrap));
        }
      }
    }
    let schemas;
    try {
      schemas = this.compilationMode !== CompilationMode.LOCAL && ngModule.has("schemas") ? extractSchemas(ngModule.get("schemas"), this.evaluator, "NgModule") : [];
    } catch (e) {
      if (e instanceof FatalDiagnosticError) {
        diagnostics.push(e.toDiagnostic());
        schemas = [];
      } else {
        throw e;
      }
    }
    let id = null;
    if (ngModule.has("id")) {
      const idExpr = ngModule.get("id");
      if (!isModuleIdExpression(idExpr)) {
        id = new WrappedNodeExpr7(idExpr);
      } else {
        const diag = makeDiagnostic(ErrorCode.WARN_NGMODULE_ID_UNNECESSARY, idExpr, `Using 'module.id' for NgModule.id is a common anti-pattern that is ignored by the Angular compiler.`);
        diag.category = ts26.DiagnosticCategory.Warning;
        diagnostics.push(diag);
      }
    }
    const valueContext = node.getSourceFile();
    const exportedNodes = new Set(exportRefs.map((ref) => ref.node));
    const declarations = [];
    const exportedDeclarations = [];
    const bootstrap = bootstrapRefs.map((bootstrap2) => this._toR3Reference(bootstrap2.getOriginForDiagnostics(meta, node.name), bootstrap2, valueContext));
    for (const ref of declarationRefs) {
      const decl = this._toR3Reference(ref.getOriginForDiagnostics(meta, node.name), ref, valueContext);
      declarations.push(decl);
      if (exportedNodes.has(ref.node)) {
        exportedDeclarations.push(decl.type);
      }
    }
    const imports = importRefs.map((imp) => this._toR3Reference(imp.getOriginForDiagnostics(meta, node.name), imp, valueContext));
    const exports = exportRefs.map((exp) => this._toR3Reference(exp.getOriginForDiagnostics(meta, node.name), exp, valueContext));
    const isForwardReference = (ref) => isExpressionForwardReference(ref.value, node.name, valueContext);
    const containsForwardDecls = bootstrap.some(isForwardReference) || declarations.some(isForwardReference) || imports.some(isForwardReference) || exports.some(isForwardReference);
    const type = wrapTypeReference(node);
    let ngModuleMetadata;
    if (allowUnresolvedReferences) {
      ngModuleMetadata = {
        kind: R3NgModuleMetadataKind.Local,
        type,
        bootstrapExpression: rawBootstrap ? new WrappedNodeExpr7(rawBootstrap) : null,
        declarationsExpression: rawDeclarations ? new WrappedNodeExpr7(rawDeclarations) : null,
        exportsExpression: rawExports ? new WrappedNodeExpr7(rawExports) : null,
        importsExpression: rawImports ? new WrappedNodeExpr7(rawImports) : null,
        id,
        // Use `ɵɵsetNgModuleScope` to patch selector scopes onto the generated definition in a
        // tree-shakeable way.
        selectorScopeMode: R3SelectorScopeMode.SideEffect,
        // TODO: to be implemented as a part of FW-1004.
        schemas: []
      };
    } else {
      ngModuleMetadata = {
        kind: R3NgModuleMetadataKind.Global,
        type,
        bootstrap,
        declarations,
        publicDeclarationTypes: this.onlyPublishPublicTypings ? exportedDeclarations : null,
        exports,
        imports,
        // Imported types are generally private, so include them unless restricting the .d.ts emit
        // to only public types.
        includeImportTypes: !this.onlyPublishPublicTypings,
        containsForwardDecls,
        id,
        // Use `ɵɵsetNgModuleScope` to patch selector scopes onto the generated definition in a
        // tree-shakeable way.
        selectorScopeMode: this.includeSelectorScope ? R3SelectorScopeMode.SideEffect : R3SelectorScopeMode.Omit,
        // TODO: to be implemented as a part of FW-1004.
        schemas: []
      };
    }
    const rawProviders = ngModule.has("providers") ? ngModule.get("providers") : null;
    let wrappedProviders = null;
    if (rawProviders !== null && (!ts26.isArrayLiteralExpression(rawProviders) || rawProviders.elements.length > 0)) {
      wrappedProviders = new WrappedNodeExpr7(this.annotateForClosureCompiler ? wrapFunctionExpressionsInParens(rawProviders) : rawProviders);
    }
    const topLevelImports = [];
    if (!allowUnresolvedReferences && ngModule.has("imports")) {
      const rawImports2 = unwrapExpression(ngModule.get("imports"));
      let topLevelExpressions = [];
      if (ts26.isArrayLiteralExpression(rawImports2)) {
        for (const element of rawImports2.elements) {
          if (ts26.isSpreadElement(element)) {
            topLevelExpressions.push(element.expression);
            continue;
          }
          topLevelExpressions.push(element);
        }
      } else {
        topLevelExpressions.push(rawImports2);
      }
      let absoluteIndex = 0;
      for (const importExpr of topLevelExpressions) {
        const resolved = this.evaluator.evaluate(importExpr, moduleResolvers);
        const { references, hasModuleWithProviders } = this.resolveTypeList(
          importExpr,
          [resolved],
          node.name.text,
          "imports",
          absoluteIndex,
          /* allowUnresolvedReferences */
          false
        );
        absoluteIndex += references.length;
        topLevelImports.push({
          expression: importExpr,
          resolvedReferences: references,
          hasModuleWithProviders
        });
      }
    }
    const injectorMetadata = {
      name,
      type,
      providers: wrappedProviders,
      imports: []
    };
    if (allowUnresolvedReferences) {
      for (const exp of [rawImports, rawExports]) {
        if (exp === null) {
          continue;
        }
        if (ts26.isArrayLiteralExpression(exp)) {
          if (exp.elements) {
            injectorMetadata.imports.push(...exp.elements.map((n2) => new WrappedNodeExpr7(n2)));
          }
        } else {
          injectorMetadata.imports.push(new WrappedNodeExpr7(exp));
        }
      }
    }
    const factoryMetadata = {
      name,
      type,
      typeArgumentCount: 0,
      deps: getValidConstructorDependencies(node, this.reflector, this.isCore),
      target: FactoryTarget2.NgModule
    };
    const remoteScopesMayRequireCycleProtection = declarationRefs.some(isSyntheticReference) || importRefs.some(isSyntheticReference);
    return {
      diagnostics: diagnostics.length > 0 ? diagnostics : void 0,
      analysis: {
        id,
        schemas,
        mod: ngModuleMetadata,
        inj: injectorMetadata,
        fac: factoryMetadata,
        declarations: declarationRefs,
        rawDeclarations,
        imports: topLevelImports,
        rawImports,
        importRefs,
        exports: exportRefs,
        rawExports,
        providers: rawProviders,
        providersRequiringFactory: rawProviders ? resolveProvidersRequiringFactory(rawProviders, this.reflector, this.evaluator) : null,
        classMetadata: this.includeClassMetadata ? extractClassMetadata(node, this.reflector, this.isCore, this.annotateForClosureCompiler) : null,
        factorySymbolName: node.name.text,
        remoteScopesMayRequireCycleProtection,
        decorator: decorator?.node ?? null
      }
    };
  }
  symbol(node, analysis) {
    return new NgModuleSymbol(node, analysis.providers !== null);
  }
  register(node, analysis) {
    this.metaRegistry.registerNgModuleMetadata({
      kind: MetaKind.NgModule,
      ref: new Reference(node),
      schemas: analysis.schemas,
      declarations: analysis.declarations,
      imports: analysis.importRefs,
      exports: analysis.exports,
      rawDeclarations: analysis.rawDeclarations,
      rawImports: analysis.rawImports,
      rawExports: analysis.rawExports,
      decorator: analysis.decorator,
      mayDeclareProviders: analysis.providers !== null,
      isPoisoned: false
    });
    this.injectableRegistry.registerInjectable(node, {
      ctorDeps: analysis.fac.deps
    });
  }
  resolve(node, analysis) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      return {};
    }
    const scope = this.scopeRegistry.getScopeOfModule(node);
    const diagnostics = [];
    const scopeDiagnostics = this.scopeRegistry.getDiagnosticsOfModule(node);
    if (scopeDiagnostics !== null) {
      diagnostics.push(...scopeDiagnostics);
    }
    if (analysis.providersRequiringFactory !== null) {
      const providerDiagnostics = getProviderDiagnostics(analysis.providersRequiringFactory, analysis.providers, this.injectableRegistry);
      diagnostics.push(...providerDiagnostics);
    }
    const data = {
      injectorImports: []
    };
    for (const topLevelImport of analysis.imports) {
      if (topLevelImport.hasModuleWithProviders) {
        data.injectorImports.push(new WrappedNodeExpr7(topLevelImport.expression));
        continue;
      }
      const refsToEmit = [];
      let symbol = null;
      if (this.semanticDepGraphUpdater !== null) {
        const sym = this.semanticDepGraphUpdater.getSymbol(node);
        if (sym instanceof NgModuleSymbol) {
          symbol = sym;
        }
      }
      for (const ref of topLevelImport.resolvedReferences) {
        const dirMeta = this.metaReader.getDirectiveMetadata(ref);
        if (dirMeta !== null) {
          if (!dirMeta.isComponent) {
            continue;
          }
          const mayExportProviders = this.exportedProviderStatusResolver.mayExportProviders(dirMeta.ref, (importRef) => {
            if (symbol !== null && this.semanticDepGraphUpdater !== null) {
              const importSymbol = this.semanticDepGraphUpdater.getSymbol(importRef.node);
              symbol.addTransitiveImportFromStandaloneComponent(importSymbol);
            }
          });
          if (!mayExportProviders) {
            continue;
          }
        }
        const pipeMeta = dirMeta === null ? this.metaReader.getPipeMetadata(ref) : null;
        if (pipeMeta !== null) {
          continue;
        }
        refsToEmit.push(ref);
      }
      if (refsToEmit.length === topLevelImport.resolvedReferences.length) {
        data.injectorImports.push(new WrappedNodeExpr7(topLevelImport.expression));
      } else {
        const context = node.getSourceFile();
        for (const ref of refsToEmit) {
          const emittedRef = this.refEmitter.emit(ref, context);
          assertSuccessfulReferenceEmit(emittedRef, topLevelImport.expression, "class");
          data.injectorImports.push(emittedRef.expression);
        }
      }
    }
    if (scope !== null && !scope.compilation.isPoisoned) {
      const context = getSourceFile(node);
      for (const exportRef of analysis.exports) {
        if (isNgModule(exportRef.node, scope.compilation)) {
          const type = this.refEmitter.emit(exportRef, context);
          assertSuccessfulReferenceEmit(type, node, "NgModule");
          data.injectorImports.push(type.expression);
        }
      }
      for (const decl of analysis.declarations) {
        const dirMeta = this.metaReader.getDirectiveMetadata(decl);
        if (dirMeta !== null) {
          const refType = dirMeta.isComponent ? "Component" : "Directive";
          if (dirMeta.selector === null) {
            throw new FatalDiagnosticError(ErrorCode.DIRECTIVE_MISSING_SELECTOR, decl.node, `${refType} ${decl.node.name.text} has no selector, please add it!`);
          }
          continue;
        }
      }
    }
    if (diagnostics.length > 0) {
      return { diagnostics };
    }
    if (scope === null || scope.compilation.isPoisoned || scope.exported.isPoisoned || scope.reexports === null) {
      return { data };
    } else {
      return {
        data,
        reexports: scope.reexports
      };
    }
  }
  compileFull(node, { inj, mod, fac, classMetadata, declarations, remoteScopesMayRequireCycleProtection }, { injectorImports }) {
    const factoryFn = compileNgFactoryDefField(fac);
    const ngInjectorDef = compileInjector({
      ...inj,
      imports: injectorImports
    });
    const ngModuleDef = compileNgModule(mod);
    const statements = ngModuleDef.statements;
    const metadata = classMetadata !== null ? compileClassMetadata2(classMetadata) : null;
    this.insertMetadataStatement(statements, metadata);
    this.appendRemoteScopingStatements(statements, node, declarations, remoteScopesMayRequireCycleProtection);
    return this.compileNgModule(factoryFn, ngInjectorDef, ngModuleDef);
  }
  compilePartial(node, { inj, fac, mod, classMetadata }, { injectorImports }) {
    const factoryFn = compileDeclareFactory(fac);
    const injectorDef = compileDeclareInjectorFromMetadata({
      ...inj,
      imports: injectorImports
    });
    const ngModuleDef = compileDeclareNgModuleFromMetadata(mod);
    const metadata = classMetadata !== null ? compileDeclareClassMetadata2(classMetadata) : null;
    this.insertMetadataStatement(ngModuleDef.statements, metadata);
    return this.compileNgModule(factoryFn, injectorDef, ngModuleDef);
  }
  compileLocal(node, { inj, mod, fac, classMetadata, declarations, remoteScopesMayRequireCycleProtection }) {
    const factoryFn = compileNgFactoryDefField(fac);
    const ngInjectorDef = compileInjector({
      ...inj
    });
    const ngModuleDef = compileNgModule(mod);
    const statements = ngModuleDef.statements;
    const metadata = classMetadata !== null ? compileClassMetadata2(classMetadata) : null;
    this.insertMetadataStatement(statements, metadata);
    this.appendRemoteScopingStatements(statements, node, declarations, remoteScopesMayRequireCycleProtection);
    return this.compileNgModule(factoryFn, ngInjectorDef, ngModuleDef);
  }
  /**
   * Add class metadata statements, if provided, to the `ngModuleStatements`.
   */
  insertMetadataStatement(ngModuleStatements, metadata) {
    if (metadata !== null) {
      ngModuleStatements.unshift(metadata.toStmt());
    }
  }
  /**
   * Add remote scoping statements, as needed, to the `ngModuleStatements`.
   */
  appendRemoteScopingStatements(ngModuleStatements, node, declarations, remoteScopesMayRequireCycleProtection) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      return;
    }
    const context = getSourceFile(node);
    for (const decl of declarations) {
      const remoteScope = this.scopeRegistry.getRemoteScope(decl.node);
      if (remoteScope !== null) {
        const directives = remoteScope.directives.map((directive) => {
          const type = this.refEmitter.emit(directive, context);
          assertSuccessfulReferenceEmit(type, node, "directive");
          return type.expression;
        });
        const pipes = remoteScope.pipes.map((pipe) => {
          const type = this.refEmitter.emit(pipe, context);
          assertSuccessfulReferenceEmit(type, node, "pipe");
          return type.expression;
        });
        const directiveArray = new LiteralArrayExpr3(directives);
        const pipesArray = new LiteralArrayExpr3(pipes);
        const directiveExpr = remoteScopesMayRequireCycleProtection && directives.length > 0 ? new FunctionExpr([], [new ReturnStatement(directiveArray)]) : directiveArray;
        const pipesExpr = remoteScopesMayRequireCycleProtection && pipes.length > 0 ? new FunctionExpr([], [new ReturnStatement(pipesArray)]) : pipesArray;
        const componentType = this.refEmitter.emit(decl, context);
        assertSuccessfulReferenceEmit(componentType, node, "component");
        const declExpr = componentType.expression;
        const setComponentScope = new ExternalExpr5(R3Identifiers2.setComponentScope);
        const callExpr = new InvokeFunctionExpr(setComponentScope, [
          declExpr,
          directiveExpr,
          pipesExpr
        ]);
        ngModuleStatements.push(callExpr.toStmt());
      }
    }
  }
  compileNgModule(factoryFn, injectorDef, ngModuleDef) {
    const res = [
      factoryFn,
      {
        name: "\u0275mod",
        initializer: ngModuleDef.expression,
        statements: ngModuleDef.statements,
        type: ngModuleDef.type,
        deferrableImports: null
      },
      {
        name: "\u0275inj",
        initializer: injectorDef.expression,
        statements: injectorDef.statements,
        type: injectorDef.type,
        deferrableImports: null
      }
    ];
    return res;
  }
  _toR3Reference(origin, valueRef, valueContext) {
    if (valueRef.hasOwningModuleGuess) {
      return toR3Reference(origin, valueRef, valueContext, this.refEmitter);
    } else {
      return toR3Reference(origin, valueRef, valueContext, this.refEmitter);
    }
  }
  /**
   * Analyze path used in `emitDeclarationOnly` (isolated declarations) mode. The
   * `declarations`/`imports`/`exports` arrays are NOT statically resolved here - they're transformed
   * syntactically into the `Isolated` metadata kind's type-tuple expressions, which downstream
   * `.d.ts` metadata readers resolve. This skips the partial-evaluator path entirely.
   */
  analyzeForDeclarationOnly(node, name, ngModule, decorator) {
    const diagnostics = [];
    const rawDeclarations = ngModule.get("declarations") ?? null;
    const rawImports = ngModule.get("imports") ?? null;
    const rawExports = ngModule.get("exports") ?? null;
    const rawProviders = ngModule.get("providers") ?? null;
    let id = null;
    if (ngModule.has("id")) {
      const idExpr = ngModule.get("id");
      if (!isModuleIdExpression(idExpr)) {
        id = new WrappedNodeExpr7(idExpr);
      }
    }
    const type = wrapTypeReference(node);
    const ngModuleMetadata = {
      kind: R3NgModuleMetadataKind.Isolated,
      type,
      importsExpression: rawImports ? transformToTypeTupleExpression(rawImports, this.evaluator, this.refEmitter, node.getSourceFile(), this.reflector, diagnostics) : null,
      exportsExpression: rawExports ? transformToTypeTupleExpression(rawExports, this.evaluator, this.refEmitter, node.getSourceFile(), this.reflector, diagnostics) : null,
      id,
      selectorScopeMode: R3SelectorScopeMode.Omit,
      schemas: []
    };
    let wrappedProviders = null;
    if (rawProviders !== null && (!ts26.isArrayLiteralExpression(rawProviders) || rawProviders.elements.length > 0)) {
      wrappedProviders = new WrappedNodeExpr7(this.annotateForClosureCompiler ? wrapFunctionExpressionsInParens(rawProviders) : rawProviders);
    }
    const injectorMetadata = {
      name,
      type,
      providers: wrappedProviders,
      imports: []
    };
    const factoryMetadata = {
      name,
      type,
      typeArgumentCount: 0,
      deps: getValidConstructorDependencies(node, this.reflector, this.isCore),
      target: FactoryTarget2.NgModule
    };
    return {
      diagnostics: diagnostics.length > 0 ? diagnostics : void 0,
      analysis: {
        id,
        schemas: [],
        mod: ngModuleMetadata,
        inj: injectorMetadata,
        fac: factoryMetadata,
        declarations: [],
        rawDeclarations,
        imports: [],
        rawImports,
        importRefs: [],
        exports: [],
        rawExports,
        providers: rawProviders,
        providersRequiringFactory: null,
        classMetadata: null,
        factorySymbolName: node.name.text,
        remoteScopesMayRequireCycleProtection: false,
        decorator: decorator?.node ?? null
      }
    };
  }
  // Verify that a "Declaration" reference is a `ClassDeclaration` reference.
  isClassDeclarationReference(ref) {
    return this.reflector.isClass(ref.node);
  }
  /**
   * Compute a list of `Reference`s from a resolved metadata value.
   */
  resolveTypeList(expr, resolvedList, className, arrayName, absoluteIndex, allowUnresolvedReferences) {
    let hasModuleWithProviders = false;
    const refList = [];
    const dynamicValueSet = /* @__PURE__ */ new Set();
    if (!Array.isArray(resolvedList)) {
      if (allowUnresolvedReferences) {
        return {
          references: [],
          hasModuleWithProviders: false,
          dynamicValues: []
        };
      }
      throw createValueHasWrongTypeError(expr, resolvedList, `Expected array when reading the NgModule.${arrayName} of ${className}`);
    }
    for (let idx = 0; idx < resolvedList.length; idx++) {
      let entry = resolvedList[idx];
      if (entry instanceof SyntheticValue && isResolvedModuleWithProviders(entry)) {
        entry = entry.value.ngModule;
        hasModuleWithProviders = true;
      } else if (entry instanceof Map && entry.has("ngModule")) {
        entry = entry.get("ngModule");
        hasModuleWithProviders = true;
      }
      if (Array.isArray(entry)) {
        const recursiveResult = this.resolveTypeList(expr, entry, className, arrayName, absoluteIndex, allowUnresolvedReferences);
        refList.push(...recursiveResult.references);
        for (const d of recursiveResult.dynamicValues) {
          dynamicValueSet.add(d);
        }
        absoluteIndex += recursiveResult.references.length;
        hasModuleWithProviders = hasModuleWithProviders || recursiveResult.hasModuleWithProviders;
      } else if (entry instanceof Reference) {
        if (!this.isClassDeclarationReference(entry)) {
          throw createValueHasWrongTypeError(entry.node, entry, `Value at position ${absoluteIndex} in the NgModule.${arrayName} of ${className} is not a class`);
        }
        refList.push(entry);
        absoluteIndex += 1;
      } else if (entry instanceof DynamicValue && allowUnresolvedReferences) {
        dynamicValueSet.add(entry);
        continue;
      } else {
        throw createValueHasWrongTypeError(expr, entry, `Value at position ${absoluteIndex} in the NgModule.${arrayName} of ${className} is not a reference`);
      }
    }
    return {
      references: refList,
      hasModuleWithProviders,
      dynamicValues: [...dynamicValueSet]
    };
  }
};
function isNgModule(node, compilation) {
  return !compilation.dependencies.some((dep) => dep.ref.node === node);
}
function isModuleIdExpression(expr) {
  return ts26.isPropertyAccessExpression(expr) && ts26.isIdentifier(expr.expression) && expr.expression.text === "module" && expr.name.text === "id";
}
function makeStandaloneBootstrapDiagnostic(ngModuleClass, bootstrappedClassRef, rawBootstrapExpr) {
  const componentClassName = bootstrappedClassRef.node.name.text;
  const message = (
    //
    `The \`${componentClassName}\` class is a standalone component, which can not be used in the \`@NgModule.bootstrap\` array. Use the \`bootstrapApplication\` function for bootstrap instead.`
  );
  const relatedInformation = [
    makeRelatedInformation(ngModuleClass, `The 'bootstrap' array is present on this NgModule.`)
  ];
  return makeDiagnostic(ErrorCode.NGMODULE_BOOTSTRAP_IS_STANDALONE, getDiagnosticNode(bootstrappedClassRef, rawBootstrapExpr), message, relatedInformation);
}
function isSyntheticReference(ref) {
  return ref.synthetic;
}
function expressionToEntityName2(expr) {
  if (ts26.isIdentifier(expr)) {
    return expr;
  }
  if (ts26.isPropertyAccessExpression(expr) && ts26.isIdentifier(expr.name)) {
    const left = expressionToEntityName2(expr.expression);
    return left === null ? null : ts26.factory.createQualifiedName(left, expr.name);
  }
  return null;
}
function transformToTypeTupleElement(el, reflector, diagnostics) {
  let current = unwrapExpression(el);
  while (true) {
    const unwrapped = tryUnwrapForwardRef(current, reflector);
    if (unwrapped === null) {
      break;
    }
    current = unwrapExpression(unwrapped);
  }
  el = current;
  if (ts26.isCallExpression(el)) {
    const callee = expressionToEntityName2(el.expression);
    if (callee !== null) {
      return new WrappedNodeExpr7(ts26.factory.createTypeReferenceNode(ts26.factory.createIdentifier("ReturnType"), [
        ts26.factory.createTypeQueryNode(callee)
      ]));
    }
  }
  if (expressionToEntityName2(el) === null) {
    const diag = makeDiagnostic(ErrorCode.LOCAL_COMPILATION_UNSUPPORTED_EXPRESSION, el, `In experimental declaration-only emission mode, this expression is not supported in NgModule imports/exports as it cannot be referenced with 'typeof'. Use a direct reference or a supported call.`);
    diagnostics.push(diag);
    return new WrappedNodeExpr7(ts26.factory.createKeywordTypeNode(ts26.SyntaxKind.NeverKeyword));
  }
  return new TypeofExpr(new WrappedNodeExpr7(el));
}
function resolvedToTypeTupleElement(originalEl, resolved, refEmitter, sourceFile, reflector, diagnostics) {
  if (resolved instanceof Reference) {
    const emitted = refEmitter.emit(resolved, sourceFile);
    if (emitted.kind === ReferenceEmitKind.Success) {
      return new TypeofExpr(emitted.expression);
    }
  }
  if (Array.isArray(resolved)) {
    const elements = [];
    let allValid = true;
    for (const item of resolved) {
      if (item instanceof Reference) {
        const emitted = refEmitter.emit(item, sourceFile);
        if (emitted.kind === ReferenceEmitKind.Success) {
          elements.push(new TypeofExpr(emitted.expression));
          continue;
        }
      }
      allValid = false;
      break;
    }
    if (allValid && elements.length > 0) {
      return new LiteralArrayExpr3(elements);
    }
  }
  return transformToTypeTupleElement(originalEl, reflector, diagnostics);
}
function transformToTypeTupleExpression(expr, evaluator, refEmitter, sourceFile, reflector, diagnostics) {
  if (ts26.isArrayLiteralExpression(expr)) {
    if (expr.elements.length === 0) {
      return null;
    }
    return new LiteralArrayExpr3(expr.elements.map((el) => {
      const resolved2 = evaluator.evaluate(el);
      return resolvedToTypeTupleElement(el, resolved2, refEmitter, sourceFile, reflector, diagnostics);
    }));
  }
  const resolved = evaluator.evaluate(expr);
  return resolvedToTypeTupleElement(expr, resolved, refEmitter, sourceFile, reflector, diagnostics);
}

// packages/compiler-cli/src/ngtsc/hmr/src/metadata.js
import { outputAst as o3 } from "@angular/compiler";

// packages/compiler-cli/src/ngtsc/hmr/src/extract_dependencies.js
import { outputAst as o2 } from "@angular/compiler";
import ts27 from "typescript";
function extractHmrDependencies(node, definition, factory, deferBlockMetadata, classMetadata, debugInfo, reflection, evaluator) {
  const name = ts27.isClassDeclaration(node) && node.name ? node.name.text : null;
  const visitor = new PotentialTopLevelReadsVisitor();
  const sourceFile = ts27.getOriginalNode(node).getSourceFile();
  definition.expression.visitExpression(visitor, null);
  definition.statements.forEach((statement) => statement.visitStatement(visitor, null));
  factory.initializer?.visitExpression(visitor, null);
  factory.statements.forEach((statement) => statement.visitStatement(visitor, null));
  classMetadata?.visitStatement(visitor, null);
  debugInfo?.visitStatement(visitor, null);
  if (deferBlockMetadata.mode === 0) {
    deferBlockMetadata.blocks.forEach((loader) => loader?.visitExpression(visitor, null));
  } else {
    deferBlockMetadata.dependenciesFn?.visitExpression(visitor, null);
  }
  const availableTopLevel = getTopLevelDeclarationNames(sourceFile);
  const local = [];
  const seenLocals = /* @__PURE__ */ new Set();
  for (const readNode of visitor.allReads) {
    const readName = readNode instanceof o2.ReadVarExpr ? readNode.name : readNode.text;
    if (readName !== name && !seenLocals.has(readName) && availableTopLevel.has(readName)) {
      const runtimeRepresentation = getRuntimeRepresentation(readNode, reflection, evaluator);
      if (runtimeRepresentation === null) {
        return null;
      }
      local.push({ name: readName, runtimeRepresentation });
      seenLocals.add(readName);
    }
  }
  return {
    local,
    external: Array.from(visitor.namespaceReads, (name2, index) => ({
      moduleName: name2,
      assignedName: `\u0275hmr${index}`
    }))
  };
}
function getRuntimeRepresentation(node, reflection, evaluator) {
  if (node instanceof o2.ReadVarExpr) {
    return o2.variable(node.name);
  }
  if (isConstEnumReference(node, reflection)) {
    const evaluated = evaluator.evaluate(node);
    if (evaluated instanceof Map) {
      const members = [];
      for (const [name, value] of evaluated.entries()) {
        if (value instanceof EnumValue && (value.resolved == null || typeof value.resolved === "string" || typeof value.resolved === "boolean" || typeof value.resolved === "number")) {
          members.push({
            key: name,
            quoted: false,
            value: o2.literal(value.resolved)
          });
        } else {
          return null;
        }
      }
      return o2.literalMap(members);
    }
  }
  return o2.variable(node.text);
}
function getTopLevelDeclarationNames(sourceFile) {
  const results = /* @__PURE__ */ new Set();
  for (const node of sourceFile.statements) {
    if (ts27.isClassDeclaration(node) || ts27.isFunctionDeclaration(node) || ts27.isEnumDeclaration(node)) {
      if (node.name) {
        results.add(node.name.text);
      }
      continue;
    }
    if (ts27.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        trackBindingName(decl.name, results);
      }
      continue;
    }
    if (ts27.isImportDeclaration(node) && node.importClause) {
      const importClause = node.importClause;
      if (importClause.phaseModifier === ts27.SyntaxKind.TypeKeyword) {
        continue;
      }
      if (importClause.name) {
        results.add(importClause.name.text);
      }
      if (importClause.namedBindings) {
        const namedBindings = importClause.namedBindings;
        if (ts27.isNamespaceImport(namedBindings)) {
          results.add(namedBindings.name.text);
        } else {
          namedBindings.elements.forEach((el) => {
            if (!el.isTypeOnly) {
              results.add(el.name.text);
            }
          });
        }
      }
      continue;
    }
  }
  return results;
}
function trackBindingName(node, results) {
  if (ts27.isIdentifier(node)) {
    results.add(node.text);
  } else {
    for (const el of node.elements) {
      if (!ts27.isOmittedExpression(el)) {
        trackBindingName(el.name, results);
      }
    }
  }
}
var PotentialTopLevelReadsVisitor = class extends o2.RecursiveAstVisitor {
  allReads = /* @__PURE__ */ new Set();
  namespaceReads = /* @__PURE__ */ new Set();
  visitExternalExpr(ast, context) {
    if (ast.value.moduleName !== null) {
      this.namespaceReads.add(ast.value.moduleName);
    }
    super.visitExternalExpr(ast, context);
  }
  visitReadVarExpr(ast, context) {
    this.allReads.add(ast);
    super.visitReadVarExpr(ast, context);
  }
  visitWrappedNodeExpr(ast, context) {
    if (this.isTypeScriptNode(ast.node)) {
      this.addAllTopLevelIdentifiers(ast.node);
    }
    super.visitWrappedNodeExpr(ast, context);
  }
  /**
   * Traverses a TypeScript AST and tracks all the top-level reads.
   * @param node Node from which to start the traversal.
   */
  addAllTopLevelIdentifiers = (node) => {
    if (ts27.isIdentifier(node) && this.isTopLevelIdentifierReference(node)) {
      this.allReads.add(node);
    } else {
      ts27.forEachChild(node, this.addAllTopLevelIdentifiers);
    }
  };
  /**
   * TypeScript identifiers are used both when referring to a variable (e.g. `console.log(foo)`)
   * and for names (e.g. `{foo: 123}`). This function determines if the identifier is a top-level
   * variable read, rather than a nested name.
   * @param identifier Identifier to check.
   */
  isTopLevelIdentifierReference(identifier) {
    let node = identifier;
    let parent = node.parent;
    if (!parent) {
      return false;
    }
    if (ts27.isParenthesizedExpression(parent) && parent.expression === node) {
      while (parent && ts27.isParenthesizedExpression(parent)) {
        node = parent;
        parent = parent.parent;
      }
    }
    if (ts27.isSourceFile(parent)) {
      return true;
    }
    if (ts27.isCallExpression(parent)) {
      return parent.expression === node || parent.arguments.includes(node);
    }
    if (ts27.isExpressionStatement(parent) || ts27.isPropertyAccessExpression(parent) || ts27.isComputedPropertyName(parent) || ts27.isTemplateSpan(parent) || ts27.isSpreadAssignment(parent) || ts27.isSpreadElement(parent) || ts27.isAwaitExpression(parent) || ts27.isNonNullExpression(parent) || ts27.isIfStatement(parent) || ts27.isDoStatement(parent) || ts27.isWhileStatement(parent) || ts27.isSwitchStatement(parent) || ts27.isCaseClause(parent) || ts27.isThrowStatement(parent) || ts27.isNewExpression(parent) || ts27.isExpressionWithTypeArguments(parent)) {
      return parent.expression === node;
    }
    if (ts27.isArrayLiteralExpression(parent)) {
      return parent.elements.includes(node);
    }
    if (ts27.isPropertyAssignment(parent) || ts27.isParameter(parent) || ts27.isBindingElement(parent) || ts27.isPropertyDeclaration(parent) || ts27.isEnumMember(parent)) {
      return parent.initializer === node;
    }
    if (ts27.isVariableDeclaration(parent)) {
      return parent.name === node || parent.initializer === node;
    }
    if (ts27.isClassDeclaration(parent) || ts27.isFunctionDeclaration(parent) || ts27.isShorthandPropertyAssignment(parent)) {
      return parent.name === node;
    }
    if (ts27.isElementAccessExpression(parent)) {
      return parent.expression === node || parent.argumentExpression === node;
    }
    if (ts27.isBinaryExpression(parent)) {
      return parent.left === node || parent.right === node;
    }
    if (ts27.isForInStatement(parent) || ts27.isForOfStatement(parent)) {
      return parent.expression === node || parent.initializer === node;
    }
    if (ts27.isForStatement(parent)) {
      return parent.condition === node || parent.initializer === node || parent.incrementor === node;
    }
    if (ts27.isArrowFunction(parent)) {
      return parent.body === node;
    }
    if (ts27.isImportSpecifier(parent) || ts27.isExportSpecifier(parent)) {
      return (parent.propertyName || parent.name) === node;
    }
    if (ts27.isConditionalExpression(parent)) {
      return parent.condition === node || parent.whenFalse === node || parent.whenTrue === node;
    }
    return false;
  }
  /** Checks if a value is a TypeScript AST node. */
  isTypeScriptNode(value) {
    return !!value && typeof value.kind === "number";
  }
};
function isConstEnumReference(node, reflection) {
  const parent = node.parent;
  if (!parent || !ts27.isPropertyAccessExpression(parent) || parent.expression !== node || !ts27.isIdentifier(parent.name)) {
    return false;
  }
  const declaration = reflection.getDeclarationOfIdentifier(node);
  return declaration !== null && ts27.isEnumDeclaration(declaration.node) && !!declaration.node.modifiers?.some((m) => m.kind === ts27.SyntaxKind.ConstKeyword);
}

// packages/compiler-cli/src/ngtsc/hmr/src/metadata.js
import ts28 from "typescript";
function extractHmrMetatadata(clazz, reflection, evaluator, compilerHost, rootDirs, definition, factory, deferBlockMetadata, classMetadata, debugInfo) {
  if (!reflection.isClass(clazz)) {
    return null;
  }
  const sourceFile = ts28.getOriginalNode(clazz).getSourceFile();
  const filePath = getProjectRelativePath(sourceFile.fileName, rootDirs, compilerHost) || compilerHost.getCanonicalFileName(sourceFile.fileName);
  const dependencies = extractHmrDependencies(clazz, definition, factory, deferBlockMetadata, classMetadata, debugInfo, reflection, evaluator);
  if (dependencies === null) {
    return null;
  }
  const meta = {
    type: new o3.WrappedNodeExpr(clazz.name),
    className: clazz.name.text,
    filePath,
    localDependencies: dependencies.local,
    namespaceDependencies: dependencies.external
  };
  return meta;
}

// packages/compiler-cli/src/ngtsc/hmr/src/update_declaration.js
import { compileHmrUpdateCallback } from "@angular/compiler";
import ts29 from "typescript";
function getHmrUpdateDeclaration(compilationResults, constantStatements, meta, declaration) {
  const namespaceSpecifiers = meta.namespaceDependencies.reduce((result, current) => {
    result.set(current.moduleName, current.assignedName);
    return result;
  }, /* @__PURE__ */ new Map());
  const importRewriter = new HmrModuleImportRewriter(namespaceSpecifiers);
  const importManager = new ImportManager({
    ...presetImportManagerForceNamespaceImports,
    rewriter: importRewriter
  });
  const callback = compileHmrUpdateCallback(compilationResults, constantStatements, meta);
  const sourceFile = ts29.getOriginalNode(declaration).getSourceFile();
  const node = translateStatement(sourceFile, callback, importManager);
  return ts29.factory.updateFunctionDeclaration(node, [
    ts29.factory.createToken(ts29.SyntaxKind.ExportKeyword),
    ts29.factory.createToken(ts29.SyntaxKind.DefaultKeyword)
  ], node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body);
}
var HmrModuleImportRewriter = class {
  lookup;
  constructor(lookup) {
    this.lookup = lookup;
  }
  rewriteNamespaceImportIdentifier(specifier, moduleName) {
    return this.lookup.has(moduleName) ? this.lookup.get(moduleName) : specifier;
  }
  rewriteSymbol(symbol) {
    return symbol;
  }
  rewriteSpecifier(specifier) {
    return specifier;
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/checker.js
import { CssSelector as CssSelector2, DomElementSchemaRegistry, ExternalExpr as ExternalExpr7, WrappedNodeExpr as WrappedNodeExpr9 } from "@angular/compiler";
import ts36 from "typescript";

// packages/compiler-cli/src/ngtsc/typecheck/src/completion.js
import { EmptyExpr, ImplicitReceiver, PropertyRead, SafePropertyRead, ThisReceiver, TmplAstLetDeclaration, TmplAstReference, TmplAstTextAttribute } from "@angular/compiler";
import ts30 from "typescript";
var CompletionEngine = class {
  tcb;
  data;
  tcbPath;
  tcbIsShim;
  componentContext;
  /**
   * Get the `TcbLocation` for the global context, which is the location of the `this` variable.
   */
  globalTsContext;
  /**
   * Cache of completions for various levels of the template, including the root template (`null`).
   * Memoizes `getTemplateContextCompletions`.
   */
  templateContextCache = /* @__PURE__ */ new Map();
  expressionCompletionCache = /* @__PURE__ */ new Map();
  constructor(tcb, data, tcbPath, tcbIsShim) {
    this.tcb = tcb;
    this.data = data;
    this.tcbPath = tcbPath;
    this.tcbIsShim = tcbIsShim;
    const globalRead = findFirstMatchingNode(this.tcb, {
      filter: ts30.isPropertyAccessExpression,
      withExpressionIdentifier: ExpressionIdentifier.COMPONENT_COMPLETION
    });
    if (globalRead !== null) {
      this.componentContext = {
        tcbPath: this.tcbPath,
        isShimFile: this.tcbIsShim,
        // `globalRead.name` is an empty `ts.Identifier`, so its start position immediately follows
        // the `.` in `ctx.`. TS autocompletion APIs can then be used to access completion results
        // for the component context.
        positionInFile: globalRead.name.getStart()
      };
      this.globalTsContext = {
        tcbPath: this.tcbPath,
        isShimFile: this.tcbIsShim,
        positionInFile: globalRead.name.getStart() - 1
      };
    } else {
      this.componentContext = null;
      this.globalTsContext = null;
    }
  }
  getGlobalTsContext() {
    return this.globalTsContext;
  }
  /**
   * Get global completions within the given template context and AST node.
   *
   * @param context the given template context - either a `TmplAstTemplate` embedded view, or `null`
   *     for the root
   * template context.
   * @param node the given AST node
   */
  getGlobalCompletions(context, node) {
    if (this.componentContext === null) {
      return null;
    }
    const templateContext = this.getTemplateContextCompletions(context);
    if (templateContext === null) {
      return null;
    }
    let nodeContext = null;
    if (node instanceof EmptyExpr) {
      const nodeLocation = findFirstMatchingNode(this.tcb, {
        filter: ts30.isIdentifier,
        withSpan: node.sourceSpan
      });
      if (nodeLocation !== null) {
        nodeContext = {
          tcbPath: this.tcbPath,
          isShimFile: this.tcbIsShim,
          positionInFile: nodeLocation.getStart()
        };
      }
    }
    if (node instanceof PropertyRead && (node.receiver instanceof ImplicitReceiver || node.receiver instanceof ThisReceiver)) {
      const nodeLocation = findFirstMatchingNode(this.tcb, {
        filter: ts30.isPropertyAccessExpression,
        withSpan: node.sourceSpan
      });
      if (nodeLocation) {
        nodeContext = {
          tcbPath: this.tcbPath,
          isShimFile: this.tcbIsShim,
          positionInFile: nodeLocation.getStart()
        };
      }
    }
    return {
      componentContext: this.componentContext,
      templateContext,
      nodeContext
    };
  }
  getExpressionCompletionLocation(expr) {
    if (this.expressionCompletionCache.has(expr)) {
      return this.expressionCompletionCache.get(expr);
    }
    let tsExpr = null;
    if (expr instanceof PropertyRead) {
      tsExpr = findFirstMatchingNode(this.tcb, {
        filter: ts30.isPropertyAccessExpression,
        withSpan: expr.nameSpan
      });
    } else if (expr instanceof SafePropertyRead) {
      tsExpr = findFirstMatchingNode(this.tcb, {
        filter: ts30.isPropertyAccessExpression,
        withSpan: expr.nameSpan
      });
      const ternaryExpr = tsExpr === null ? findFirstMatchingNode(this.tcb, {
        filter: ts30.isParenthesizedExpression,
        withSpan: expr.sourceSpan
      }) : null;
      if (ternaryExpr !== null && ts30.isConditionalExpression(ternaryExpr.expression)) {
        const whenTrue = ternaryExpr.expression.whenTrue;
        if (ts30.isPropertyAccessExpression(whenTrue)) {
          tsExpr = whenTrue;
        } else if (ts30.isCallExpression(whenTrue) && ts30.isPropertyAccessExpression(whenTrue.expression)) {
          tsExpr = whenTrue.expression;
        }
      }
    }
    if (tsExpr === null) {
      return null;
    }
    const res = {
      tcbPath: this.tcbPath,
      isShimFile: this.tcbIsShim,
      positionInFile: tsExpr.name.getEnd()
    };
    this.expressionCompletionCache.set(expr, res);
    return res;
  }
  getLiteralCompletionLocation(expr) {
    if (this.expressionCompletionCache.has(expr)) {
      return this.expressionCompletionCache.get(expr);
    }
    let tsExpr = null;
    if (expr instanceof TmplAstTextAttribute) {
      const strNode = findFirstMatchingNode(this.tcb, {
        filter: ts30.isParenthesizedExpression,
        withSpan: expr.sourceSpan
      });
      if (strNode !== null && ts30.isStringLiteral(strNode.expression)) {
        tsExpr = strNode.expression;
      }
    } else {
      tsExpr = findFirstMatchingNode(this.tcb, {
        filter: (n2) => ts30.isStringLiteral(n2) || ts30.isNumericLiteral(n2),
        withSpan: expr.sourceSpan
      });
    }
    if (tsExpr === null) {
      return null;
    }
    let positionInShimFile = tsExpr.getEnd();
    if (ts30.isStringLiteral(tsExpr)) {
      positionInShimFile -= 1;
    }
    const res = {
      tcbPath: this.tcbPath,
      isShimFile: this.tcbIsShim,
      positionInFile: positionInShimFile
    };
    this.expressionCompletionCache.set(expr, res);
    return res;
  }
  /**
   * Get global completions within the given template context - either a `TmplAstTemplate` embedded
   * view, or `null` for the root context.
   */
  getTemplateContextCompletions(context) {
    if (this.templateContextCache.has(context)) {
      return this.templateContextCache.get(context);
    }
    const templateContext = /* @__PURE__ */ new Map();
    for (const node of this.data.boundTarget.getEntitiesInScope(context)) {
      if (node instanceof TmplAstReference) {
        templateContext.set(node.name, {
          kind: CompletionKind.Reference,
          node
        });
      } else if (node instanceof TmplAstLetDeclaration) {
        templateContext.set(node.name, {
          kind: CompletionKind.LetDeclaration,
          node
        });
      } else {
        templateContext.set(node.name, {
          kind: CompletionKind.Variable,
          node
        });
      }
    }
    this.templateContextCache.set(context, templateContext);
    return templateContext;
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/context.js
import { generateTypeCheckBlock as generateTypeCheckBlock2, ParseSourceFile as ParseSourceFile3, TcbGenericContextBehavior as TcbGenericContextBehavior2 } from "@angular/compiler";

// node_modules/.aspect_rules_js/magic-string@0.30.21/node_modules/magic-string/dist/magic-string.es.mjs
import { encode } from "@jridgewell/sourcemap-codec";
var BitSet = class _BitSet {
  constructor(arg) {
    this.bits = arg instanceof _BitSet ? arg.bits.slice() : [];
  }
  add(n2) {
    this.bits[n2 >> 5] |= 1 << (n2 & 31);
  }
  has(n2) {
    return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
  }
};
var Chunk = class _Chunk {
  constructor(start, end, content) {
    this.start = start;
    this.end = end;
    this.original = content;
    this.intro = "";
    this.outro = "";
    this.content = content;
    this.storeName = false;
    this.edited = false;
    {
      this.previous = null;
      this.next = null;
    }
  }
  appendLeft(content) {
    this.outro += content;
  }
  appendRight(content) {
    this.intro = this.intro + content;
  }
  clone() {
    const chunk = new _Chunk(this.start, this.end, this.original);
    chunk.intro = this.intro;
    chunk.outro = this.outro;
    chunk.content = this.content;
    chunk.storeName = this.storeName;
    chunk.edited = this.edited;
    return chunk;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
  eachNext(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.next;
    }
  }
  eachPrevious(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.previous;
    }
  }
  edit(content, storeName, contentOnly) {
    this.content = content;
    if (!contentOnly) {
      this.intro = "";
      this.outro = "";
    }
    this.storeName = storeName;
    this.edited = true;
    return this;
  }
  prependLeft(content) {
    this.outro = content + this.outro;
  }
  prependRight(content) {
    this.intro = content + this.intro;
  }
  reset() {
    this.intro = "";
    this.outro = "";
    if (this.edited) {
      this.content = this.original;
      this.storeName = false;
      this.edited = false;
    }
  }
  split(index) {
    const sliceIndex = index - this.start;
    const originalBefore = this.original.slice(0, sliceIndex);
    const originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    const newChunk = new _Chunk(index, this.end, originalAfter);
    newChunk.outro = this.outro;
    this.outro = "";
    this.end = index;
    if (this.edited) {
      newChunk.edit("", false);
      this.content = "";
    } else {
      this.content = originalBefore;
    }
    newChunk.next = this.next;
    if (newChunk.next)
      newChunk.next.previous = newChunk;
    newChunk.previous = this;
    this.next = newChunk;
    return newChunk;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(rx) {
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.start + trimmed.length).edit("", void 0, true);
        if (this.edited) {
          this.edit(trimmed, this.storeName, true);
        }
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length)
        return true;
    }
  }
  trimStart(rx) {
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        const newChunk = this.split(this.end - trimmed.length);
        if (this.edited) {
          newChunk.edit(trimmed, this.storeName, true);
        }
        this.edit("", void 0, true);
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length)
        return true;
    }
  }
};
function getBtoa() {
  if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
    return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
}
var btoa = getBtoa();
var SourceMap = class {
  constructor(properties) {
    this.version = 3;
    this.file = properties.file;
    this.sources = properties.sources;
    this.sourcesContent = properties.sourcesContent;
    this.names = properties.names;
    this.mappings = encode(properties.mappings);
    if (typeof properties.x_google_ignoreList !== "undefined") {
      this.x_google_ignoreList = properties.x_google_ignoreList;
    }
    if (typeof properties.debugId !== "undefined") {
      this.debugId = properties.debugId;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
  }
};
function guessIndent(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current) => {
    const numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--)
      fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
var toString = Object.prototype.toString;
function isObject(thing) {
  return toString.call(thing) === "[object Object]";
}
function getLocator(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate(index) {
    let i = 0;
    let j = lineOffsets.length;
    while (i < j) {
      const m = i + j >> 1;
      if (index < lineOffsets[m]) {
        j = m;
      } else {
        i = m + 1;
      }
    }
    const line = i - 1;
    const column = index - lineOffsets[line];
    return { line, column };
  };
}
var wordRegex = /\w/;
var Mappings = class {
  constructor(hires) {
    this.hires = hires;
    this.generatedCodeLine = 0;
    this.generatedCodeColumn = 0;
    this.raw = [];
    this.rawSegments = this.raw[this.generatedCodeLine] = [];
    this.pending = null;
  }
  addEdit(sourceIndex, content, loc, nameIndex) {
    if (content.length) {
      const contentLengthMinusOne = content.length - 1;
      let contentLineEnd = content.indexOf("\n", 0);
      let previousContentLineEnd = -1;
      while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
        const segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (nameIndex >= 0) {
          segment2.push(nameIndex);
        }
        this.rawSegments.push(segment2);
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        previousContentLineEnd = contentLineEnd;
        contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
      }
      const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
      if (nameIndex >= 0) {
        segment.push(nameIndex);
      }
      this.rawSegments.push(segment);
      this.advance(content.slice(previousContentLineEnd + 1));
    } else if (this.pending) {
      this.rawSegments.push(this.pending);
      this.advance(content);
    }
    this.pending = null;
  }
  addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
    let originalCharIndex = chunk.start;
    let first = true;
    let charInHiresBoundary = false;
    while (originalCharIndex < chunk.end) {
      if (original[originalCharIndex] === "\n") {
        loc.line += 1;
        loc.column = 0;
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        first = true;
        charInHiresBoundary = false;
      } else {
        if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
          const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
          if (this.hires === "boundary") {
            if (wordRegex.test(original[originalCharIndex])) {
              if (!charInHiresBoundary) {
                this.rawSegments.push(segment);
                charInHiresBoundary = true;
              }
            } else {
              this.rawSegments.push(segment);
              charInHiresBoundary = false;
            }
          } else {
            this.rawSegments.push(segment);
          }
        }
        loc.column += 1;
        this.generatedCodeColumn += 1;
        first = false;
      }
      originalCharIndex += 1;
    }
    this.pending = null;
  }
  advance(str) {
    if (!str)
      return;
    const lines = str.split("\n");
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        this.generatedCodeLine++;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
      }
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += lines[lines.length - 1].length;
  }
};
var n = "\n";
var warned = {
  insertLeft: false,
  insertRight: false,
  storeName: false
};
var MagicString = class _MagicString {
  constructor(string, options = {}) {
    const chunk = new Chunk(0, string.length, string);
    Object.defineProperties(this, {
      original: { writable: true, value: string },
      outro: { writable: true, value: "" },
      intro: { writable: true, value: "" },
      firstChunk: { writable: true, value: chunk },
      lastChunk: { writable: true, value: chunk },
      lastSearchedChunk: { writable: true, value: chunk },
      byStart: { writable: true, value: {} },
      byEnd: { writable: true, value: {} },
      filename: { writable: true, value: options.filename },
      indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
      sourcemapLocations: { writable: true, value: new BitSet() },
      storedNames: { writable: true, value: {} },
      indentStr: { writable: true, value: void 0 },
      ignoreList: { writable: true, value: options.ignoreList },
      offset: { writable: true, value: options.offset || 0 }
    });
    this.byStart[0] = chunk;
    this.byEnd[string.length] = chunk;
  }
  addSourcemapLocation(char) {
    this.sourcemapLocations.add(char);
  }
  append(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.outro += content;
    return this;
  }
  appendLeft(index, content) {
    index = index + this.offset;
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.appendLeft(content);
    } else {
      this.intro += content;
    }
    return this;
  }
  appendRight(index, content) {
    index = index + this.offset;
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.appendRight(content);
    } else {
      this.outro += content;
    }
    return this;
  }
  clone() {
    const cloned = new _MagicString(this.original, { filename: this.filename, offset: this.offset });
    let originalChunk = this.firstChunk;
    let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    while (originalChunk) {
      cloned.byStart[clonedChunk.start] = clonedChunk;
      cloned.byEnd[clonedChunk.end] = clonedChunk;
      const nextOriginalChunk = originalChunk.next;
      const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      if (nextClonedChunk) {
        clonedChunk.next = nextClonedChunk;
        nextClonedChunk.previous = clonedChunk;
        clonedChunk = nextClonedChunk;
      }
      originalChunk = nextOriginalChunk;
    }
    cloned.lastChunk = clonedChunk;
    if (this.indentExclusionRanges) {
      cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
    }
    cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
    cloned.intro = this.intro;
    cloned.outro = this.outro;
    return cloned;
  }
  generateDecodedMap(options) {
    options = options || {};
    const sourceIndex = 0;
    const names = Object.keys(this.storedNames);
    const mappings = new Mappings(options.hires);
    const locate = getLocator(this.original);
    if (this.intro) {
      mappings.advance(this.intro);
    }
    this.firstChunk.eachNext((chunk) => {
      const loc = locate(chunk.start);
      if (chunk.intro.length)
        mappings.advance(chunk.intro);
      if (chunk.edited) {
        mappings.addEdit(
          sourceIndex,
          chunk.content,
          loc,
          chunk.storeName ? names.indexOf(chunk.original) : -1
        );
      } else {
        mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
      }
      if (chunk.outro.length)
        mappings.advance(chunk.outro);
    });
    if (this.outro) {
      mappings.advance(this.outro);
    }
    return {
      file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
      sources: [
        options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
      ],
      sourcesContent: options.includeContent ? [this.original] : void 0,
      names,
      mappings: mappings.raw,
      x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  _ensureindentStr() {
    if (this.indentStr === void 0) {
      this.indentStr = guessIndent(this.original);
    }
  }
  _getRawIndentString() {
    this._ensureindentStr();
    return this.indentStr;
  }
  getIndentString() {
    this._ensureindentStr();
    return this.indentStr === null ? "	" : this.indentStr;
  }
  indent(indentStr, options) {
    const pattern = /^[^\r\n]/gm;
    if (isObject(indentStr)) {
      options = indentStr;
      indentStr = void 0;
    }
    if (indentStr === void 0) {
      this._ensureindentStr();
      indentStr = this.indentStr || "	";
    }
    if (indentStr === "")
      return this;
    options = options || {};
    const isExcluded = {};
    if (options.exclude) {
      const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
      exclusions.forEach((exclusion) => {
        for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
          isExcluded[i] = true;
        }
      });
    }
    let shouldIndentNextCharacter = options.indentStart !== false;
    const replacer = (match) => {
      if (shouldIndentNextCharacter)
        return `${indentStr}${match}`;
      shouldIndentNextCharacter = true;
      return match;
    };
    this.intro = this.intro.replace(pattern, replacer);
    let charIndex = 0;
    let chunk = this.firstChunk;
    while (chunk) {
      const end = chunk.end;
      if (chunk.edited) {
        if (!isExcluded[charIndex]) {
          chunk.content = chunk.content.replace(pattern, replacer);
          if (chunk.content.length) {
            shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
          }
        }
      } else {
        charIndex = chunk.start;
        while (charIndex < end) {
          if (!isExcluded[charIndex]) {
            const char = this.original[charIndex];
            if (char === "\n") {
              shouldIndentNextCharacter = true;
            } else if (char !== "\r" && shouldIndentNextCharacter) {
              shouldIndentNextCharacter = false;
              if (charIndex === chunk.start) {
                chunk.prependRight(indentStr);
              } else {
                this._splitChunk(chunk, charIndex);
                chunk = chunk.next;
                chunk.prependRight(indentStr);
              }
            }
          }
          charIndex += 1;
        }
      }
      charIndex = chunk.end;
      chunk = chunk.next;
    }
    this.outro = this.outro.replace(pattern, replacer);
    return this;
  }
  insert() {
    throw new Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(index, content) {
    if (!warned.insertLeft) {
      console.warn(
        "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
      );
      warned.insertLeft = true;
    }
    return this.appendLeft(index, content);
  }
  insertRight(index, content) {
    if (!warned.insertRight) {
      console.warn(
        "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
      );
      warned.insertRight = true;
    }
    return this.prependRight(index, content);
  }
  move(start, end, index) {
    start = start + this.offset;
    end = end + this.offset;
    index = index + this.offset;
    if (index >= start && index <= end)
      throw new Error("Cannot move a selection inside itself");
    this._split(start);
    this._split(end);
    this._split(index);
    const first = this.byStart[start];
    const last = this.byEnd[end];
    const oldLeft = first.previous;
    const oldRight = last.next;
    const newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk)
      return this;
    const newLeft = newRight ? newRight.previous : this.lastChunk;
    if (oldLeft)
      oldLeft.next = oldRight;
    if (oldRight)
      oldRight.previous = oldLeft;
    if (newLeft)
      newLeft.next = first;
    if (newRight)
      newRight.previous = last;
    if (!first.previous)
      this.firstChunk = last.next;
    if (!last.next) {
      this.lastChunk = first.previous;
      this.lastChunk.next = null;
    }
    first.previous = newLeft;
    last.next = newRight || null;
    if (!newLeft)
      this.firstChunk = first;
    if (!newRight)
      this.lastChunk = last;
    return this;
  }
  overwrite(start, end, content, options) {
    options = options || {};
    return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
  }
  update(start, end, content, options) {
    start = start + this.offset;
    end = end + this.offset;
    if (typeof content !== "string")
      throw new TypeError("replacement content must be a string");
    if (this.original.length !== 0) {
      while (start < 0)
        start += this.original.length;
      while (end < 0)
        end += this.original.length;
    }
    if (end > this.original.length)
      throw new Error("end is out of bounds");
    if (start === end)
      throw new Error(
        "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
      );
    this._split(start);
    this._split(end);
    if (options === true) {
      if (!warned.storeName) {
        console.warn(
          "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
        );
        warned.storeName = true;
      }
      options = { storeName: true };
    }
    const storeName = options !== void 0 ? options.storeName : false;
    const overwrite = options !== void 0 ? options.overwrite : false;
    if (storeName) {
      const original = this.original.slice(start, end);
      Object.defineProperty(this.storedNames, original, {
        writable: true,
        value: true,
        enumerable: true
      });
    }
    const first = this.byStart[start];
    const last = this.byEnd[end];
    if (first) {
      let chunk = first;
      while (chunk !== last) {
        if (chunk.next !== this.byStart[chunk.end]) {
          throw new Error("Cannot overwrite across a split point");
        }
        chunk = chunk.next;
        chunk.edit("", false);
      }
      first.edit(content, storeName, !overwrite);
    } else {
      const newChunk = new Chunk(start, end, "").edit(content, storeName);
      last.next = newChunk;
      newChunk.previous = last;
    }
    return this;
  }
  prepend(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.intro = content + this.intro;
    return this;
  }
  prependLeft(index, content) {
    index = index + this.offset;
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.prependLeft(content);
    } else {
      this.intro = content + this.intro;
    }
    return this;
  }
  prependRight(index, content) {
    index = index + this.offset;
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.prependRight(content);
    } else {
      this.outro = content + this.outro;
    }
    return this;
  }
  remove(start, end) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0)
        start += this.original.length;
      while (end < 0)
        end += this.original.length;
    }
    if (start === end)
      return this;
    if (start < 0 || end > this.original.length)
      throw new Error("Character is out of bounds");
    if (start > end)
      throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.intro = "";
      chunk.outro = "";
      chunk.edit("");
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  reset(start, end) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0)
        start += this.original.length;
      while (end < 0)
        end += this.original.length;
    }
    if (start === end)
      return this;
    if (start < 0 || end > this.original.length)
      throw new Error("Character is out of bounds");
    if (start > end)
      throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.reset();
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  lastChar() {
    if (this.outro.length)
      return this.outro[this.outro.length - 1];
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length)
        return chunk.outro[chunk.outro.length - 1];
      if (chunk.content.length)
        return chunk.content[chunk.content.length - 1];
      if (chunk.intro.length)
        return chunk.intro[chunk.intro.length - 1];
    } while (chunk = chunk.previous);
    if (this.intro.length)
      return this.intro[this.intro.length - 1];
    return "";
  }
  lastLine() {
    let lineIndex = this.outro.lastIndexOf(n);
    if (lineIndex !== -1)
      return this.outro.substr(lineIndex + 1);
    let lineStr = this.outro;
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length > 0) {
        lineIndex = chunk.outro.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.outro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.outro + lineStr;
      }
      if (chunk.content.length > 0) {
        lineIndex = chunk.content.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.content.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.content + lineStr;
      }
      if (chunk.intro.length > 0) {
        lineIndex = chunk.intro.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.intro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.intro + lineStr;
      }
    } while (chunk = chunk.previous);
    lineIndex = this.intro.lastIndexOf(n);
    if (lineIndex !== -1)
      return this.intro.substr(lineIndex + 1) + lineStr;
    return this.intro + lineStr;
  }
  slice(start = 0, end = this.original.length - this.offset) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0)
        start += this.original.length;
      while (end < 0)
        end += this.original.length;
    }
    let result = "";
    let chunk = this.firstChunk;
    while (chunk && (chunk.start > start || chunk.end <= start)) {
      if (chunk.start < end && chunk.end >= end) {
        return result;
      }
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start)
      throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
    const startChunk = chunk;
    while (chunk) {
      if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
        result += chunk.intro;
      }
      const containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end)
        throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
      const sliceStart = startChunk === chunk ? start - chunk.start : 0;
      const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      result += chunk.content.slice(sliceStart, sliceEnd);
      if (chunk.outro && (!containsEnd || chunk.end === end)) {
        result += chunk.outro;
      }
      if (containsEnd) {
        break;
      }
      chunk = chunk.next;
    }
    return result;
  }
  // TODO deprecate this? not really very useful
  snip(start, end) {
    const clone = this.clone();
    clone.remove(0, start);
    clone.remove(end, clone.original.length);
    return clone;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index])
      return;
    let chunk = this.lastSearchedChunk;
    let previousChunk = chunk;
    const searchForward = index > chunk.end;
    while (chunk) {
      if (chunk.contains(index))
        return this._splitChunk(chunk, index);
      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
      if (chunk === previousChunk)
        return;
      previousChunk = chunk;
    }
  }
  _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      const loc = getLocator(this.original)(index);
      throw new Error(
        `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
      );
    }
    const newChunk = chunk.split(index);
    this.byEnd[index] = chunk;
    this.byStart[index] = newChunk;
    this.byEnd[newChunk.end] = newChunk;
    if (chunk === this.lastChunk)
      this.lastChunk = newChunk;
    this.lastSearchedChunk = chunk;
    return true;
  }
  toString() {
    let str = this.intro;
    let chunk = this.firstChunk;
    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }
    return str + this.outro;
  }
  isEmpty() {
    let chunk = this.firstChunk;
    do {
      if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
        return false;
    } while (chunk = chunk.next);
    return true;
  }
  length() {
    let chunk = this.firstChunk;
    let length = 0;
    do {
      length += chunk.intro.length + chunk.content.length + chunk.outro.length;
    } while (chunk = chunk.next);
    return length;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimEndAborted(charType) {
    const rx = new RegExp((charType || "\\s") + "+$");
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    let chunk = this.lastChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimEnd(rx);
      if (chunk.end !== end) {
        if (this.lastChunk === chunk) {
          this.lastChunk = chunk.next;
        }
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.previous;
    } while (chunk);
    return false;
  }
  trimEnd(charType) {
    this.trimEndAborted(charType);
    return this;
  }
  trimStartAborted(charType) {
    const rx = new RegExp("^" + (charType || "\\s") + "+");
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    let chunk = this.firstChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimStart(rx);
      if (chunk.end !== end) {
        if (chunk === this.lastChunk)
          this.lastChunk = chunk.next;
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.next;
    } while (chunk);
    return false;
  }
  trimStart(charType) {
    this.trimStartAborted(charType);
    return this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(searchValue, replacement) {
    function getReplacement(match, str) {
      if (typeof replacement === "string") {
        return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
          if (i === "$")
            return "$";
          if (i === "&")
            return match[0];
          const num = +i;
          if (num < match.length)
            return match[+i];
          return `$${i}`;
        });
      } else {
        return replacement(...match, match.index, str, match.groups);
      }
    }
    function matchAll(re, str) {
      let match;
      const matches = [];
      while (match = re.exec(str)) {
        matches.push(match);
      }
      return matches;
    }
    if (searchValue.global) {
      const matches = matchAll(searchValue, this.original);
      matches.forEach((match) => {
        if (match.index != null) {
          const replacement2 = getReplacement(match, this.original);
          if (replacement2 !== match[0]) {
            this.overwrite(match.index, match.index + match[0].length, replacement2);
          }
        }
      });
    } else {
      const match = this.original.match(searchValue);
      if (match && match.index != null) {
        const replacement2 = getReplacement(match, this.original);
        if (replacement2 !== match[0]) {
          this.overwrite(match.index, match.index + match[0].length, replacement2);
        }
      }
    }
    return this;
  }
  _replaceString(string, replacement) {
    const { original } = this;
    const index = original.indexOf(string);
    if (index !== -1) {
      if (typeof replacement === "function") {
        replacement = replacement(string, index, original);
      }
      if (string !== replacement) {
        this.overwrite(index, index + string.length, replacement);
      }
    }
    return this;
  }
  replace(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceString(searchValue, replacement);
    }
    return this._replaceRegexp(searchValue, replacement);
  }
  _replaceAllString(string, replacement) {
    const { original } = this;
    const stringLength = string.length;
    for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
      const previous = original.slice(index, index + stringLength);
      let _replacement = replacement;
      if (typeof replacement === "function") {
        _replacement = replacement(previous, index, original);
      }
      if (previous !== _replacement)
        this.overwrite(index, index + stringLength, _replacement);
    }
    return this;
  }
  replaceAll(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceAllString(searchValue, replacement);
    }
    if (!searchValue.global) {
      throw new TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    }
    return this._replaceRegexp(searchValue, replacement);
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/context.js
import ts35 from "typescript";

// packages/compiler-cli/src/ngtsc/typecheck/src/tcb_adapter.js
import { AbsoluteSourceSpan, ExternalExpr as ExternalExpr6, ExpressionType, TransplantedType, WrappedNodeExpr as WrappedNodeExpr8, ClassPropertyMapping as ClassPropertyMapping2, TcbGenericContextBehavior } from "@angular/compiler";
import ts31 from "typescript";
function adaptTypeCheckBlockMetadata(ref, meta, env, reflector, genericContextBehavior) {
  const refCache = /* @__PURE__ */ new Map();
  const dirCache = /* @__PURE__ */ new Map();
  const canReferenceType = (r) => {
    const result = env.refEmitter.emit(r, env.contextFile, ImportFlags.NoAliasing | ImportFlags.AllowTypeImports | ImportFlags.AllowRelativeDtsImports);
    return result.kind === ReferenceEmitKind.Success;
  };
  const referenceType = (r) => {
    const ngExpr = env.refEmitter.emit(r, env.contextFile, ImportFlags.NoAliasing | ImportFlags.AllowTypeImports | ImportFlags.AllowRelativeDtsImports);
    assertSuccessfulReferenceEmit(ngExpr, env.contextFile, "symbol");
    return translateType(new ExpressionType(ngExpr.expression), env.contextFile, reflector, env.refEmitter, env.importManager);
  };
  const extractRef = (ref2) => {
    if (refCache.has(ref2)) {
      return refCache.get(ref2);
    }
    const result = extractReferenceMetadata(ref2, env);
    refCache.set(ref2, result);
    return result;
  };
  const convertDir = (dir) => {
    if (dirCache.has(dir))
      return dirCache.get(dir);
    const tcbDir = {
      isComponent: dir.isComponent,
      name: dir.name,
      selector: dir.selector,
      exportAs: dir.exportAs,
      inputs: ClassPropertyMapping2.fromMappedObject(dir.inputs.toJointMappedObject((input) => {
        return {
          classPropertyName: input.classPropertyName,
          bindingPropertyName: input.bindingPropertyName,
          required: input.required,
          isSignal: input.isSignal,
          transformType: (() => {
            if (input.transform != null) {
              const node = translateType(new TransplantedType(input.transform.type), env.contextFile, reflector, env.refEmitter, env.importManager);
              return tempPrint(node, env.contextFile);
            }
            return void 0;
          })()
        };
      })),
      outputs: dir.outputs,
      isStructural: dir.isStructural,
      isStandalone: dir.isStandalone,
      isExplicitlyDeferred: dir.isExplicitlyDeferred,
      preserveWhitespaces: dir.preserveWhitespaces,
      ngContentSelectors: dir.ngContentSelectors,
      animationTriggerNames: dir.animationTriggerNames,
      ngTemplateGuards: dir.ngTemplateGuards,
      hasNgTemplateContextGuard: dir.hasNgTemplateContextGuard,
      hasNgFieldDirective: ts31.isClassDeclaration(dir.ref.node) && dir.ref.node.members.some((member) => ts31.isPropertyDeclaration(member) && ts31.isComputedPropertyName(member.name) && ts31.isIdentifier(member.name.expression) && member.name.expression.text === "\u0275NgFieldDirective"),
      coercedInputFields: dir.coercedInputFields,
      restrictedInputFields: dir.restrictedInputFields,
      stringLiteralInputFields: dir.stringLiteralInputFields,
      undeclaredInputFields: dir.undeclaredInputFields,
      publicMethods: dir.publicMethods,
      matchSource: dir.matchSource,
      ref: extractRef(dir.ref),
      isGeneric: dir.isGeneric,
      requiresInlineTypeCtor: requiresInlineTypeCtor(dir.ref.node, reflector, canReferenceType),
      ...adaptGenerics(
        dir.ref.node,
        env,
        reflector,
        // The directive that we're processing is its own dependency
        // so we should the same generic context behavior.
        extractRef(dir.ref).key === extractRef(ref).key ? genericContextBehavior : TcbGenericContextBehavior.UseEmitter,
        canReferenceType,
        referenceType
      )
    };
    dirCache.set(dir, tcbDir);
    return tcbDir;
  };
  const originalBoundTarget = meta.boundTarget.target;
  const adaptedBoundTarget = {
    target: {
      template: originalBoundTarget.template,
      host: originalBoundTarget.host ? {
        node: originalBoundTarget.host.node,
        directives: originalBoundTarget.host.directives.map(convertDir)
      } : void 0
    },
    getUsedDirectives: () => meta.boundTarget.getUsedDirectives().map(convertDir),
    getEagerlyUsedDirectives: () => meta.boundTarget.getEagerlyUsedDirectives().map(convertDir),
    getUsedPipes: () => meta.boundTarget.getUsedPipes(),
    getDirectivesOfNode: (node) => {
      const dirs = meta.boundTarget.getDirectivesOfNode(node);
      return dirs ? dirs.map(convertDir) : null;
    },
    getForeignComponent: (element) => meta.boundTarget.getForeignComponent(element),
    getReferenceTarget: (ref2) => {
      const target = meta.boundTarget.getReferenceTarget(ref2);
      if (target && "directive" in target) {
        return {
          directive: convertDir(target.directive),
          node: target.node
        };
      }
      return target;
    },
    getDeferredTriggerTarget: (b, t) => meta.boundTarget.getDeferredTriggerTarget(b, t),
    isDeferred: (node) => meta.boundTarget.isDeferred(node),
    referencedDirectiveExists: (name) => meta.boundTarget.referencedDirectiveExists(name),
    getConsumerOfBinding: (binding) => {
      const consumer = meta.boundTarget.getConsumerOfBinding(binding);
      if (consumer && consumer.isComponent !== void 0) {
        return convertDir(consumer);
      }
      return consumer;
    },
    getExpressionTarget: (expr) => meta.boundTarget.getExpressionTarget(expr),
    getDefinitionNodeOfSymbol: (sym) => meta.boundTarget.getDefinitionNodeOfSymbol(sym),
    getNestingLevel: (node) => meta.boundTarget.getNestingLevel(node),
    getEntitiesInScope: (node) => meta.boundTarget.getEntitiesInScope(node),
    getEagerlyUsedPipes: () => meta.boundTarget.getEagerlyUsedPipes(),
    getDeferBlocks: () => meta.boundTarget.getDeferBlocks(),
    getConflictingHostDirectiveBindings: (node) => meta.boundTarget.getConflictingHostDirectiveBindings(node)
  };
  const pipes = /* @__PURE__ */ new Map();
  if (meta.pipes !== null) {
    for (const pipeName of meta.boundTarget.getUsedPipes()) {
      if (!meta.pipes.has(pipeName) || pipes.has(pipeName)) {
        continue;
      }
      const pipe = meta.pipes.get(pipeName);
      pipes.set(pipeName, {
        name: pipe.name,
        ref: extractRef(pipe.ref),
        isExplicitlyDeferred: pipe.isExplicitlyDeferred
      });
    }
  }
  return {
    tcbMeta: {
      id: meta.id,
      boundTarget: adaptedBoundTarget,
      pipes,
      schemas: meta.schemas,
      isStandalone: meta.isStandalone,
      preserveWhitespaces: meta.preserveWhitespaces
    },
    component: {
      ref: extractRef(ref),
      ...adaptGenerics(ref.node, env, reflector, genericContextBehavior, canReferenceType, referenceType)
    }
  };
}
function adaptGenerics(node, env, reflector, genericContextBehavior, canReferenceType, referenceType) {
  let typeParameters;
  let typeArguments;
  if (node.typeParameters !== void 0 && node.typeParameters.length > 0) {
    if (!env.config.useContextGenericType) {
      genericContextBehavior = TcbGenericContextBehavior.FallbackToAny;
    }
    switch (genericContextBehavior) {
      case TcbGenericContextBehavior.UseEmitter:
        const emitter = new TypeParameterEmitter(node.typeParameters, reflector);
        const emittedParams = emitter.canEmit(canReferenceType) ? emitter.emit(referenceType) : void 0;
        typeParameters = generateTcbTypeParameters(emittedParams || node.typeParameters, env.contextFile);
        typeArguments = typeParameters.map((param) => param.name);
        break;
      case TcbGenericContextBehavior.CopyClassNodes:
        typeParameters = generateTcbTypeParameters(node.typeParameters, env.contextFile);
        typeArguments = typeParameters.map((param) => param.name);
        break;
      case TcbGenericContextBehavior.FallbackToAny:
        typeParameters = generateTcbTypeParameters(node.typeParameters, env.contextFile);
        typeArguments = new Array(node.typeParameters.length).fill("any");
        break;
    }
  } else {
    typeParameters = typeArguments = null;
  }
  return { typeParameters, typeArguments };
}
function extractReferenceMetadata(ref, env) {
  let name = ref.debugName || ref.node.name.text;
  let moduleName = ref.ownedByModuleGuess;
  let unexportedDiagnostic = null;
  let isLocal = true;
  if (env.copiedSourceOriginPath !== void 0) {
    const refFile = absoluteFromSourceFile(ref.node.getSourceFile());
    if (refFile === env.copiedSourceOriginPath) {
      const nodeName2 = ref.node?.name;
      const nodeNameSpan2 = nodeName2 ? new AbsoluteSourceSpan(nodeName2.getStart(), nodeName2.getEnd()) : void 0;
      let key2;
      if (nodeNameSpan2 !== void 0) {
        key2 = `${refFile}#${nodeNameSpan2.start}`;
      } else {
        key2 = name;
      }
      return {
        name,
        moduleName: null,
        isLocal: true,
        unexportedDiagnostic: null,
        nodeNameSpan: nodeNameSpan2,
        nodeFilePath: refFile,
        key: key2
      };
    }
  }
  const emitted = env.refEmitter.emit(ref, env.contextFile, ImportFlags.NoAliasing);
  if (emitted.kind === ReferenceEmitKind.Success) {
    if (emitted.expression instanceof ExternalExpr6) {
      name = emitted.expression.value.name;
      moduleName = emitted.expression.value.moduleName;
      isLocal = false;
    } else if (emitted.expression instanceof WrappedNodeExpr8) {
      const node = emitted.expression.node;
      const extractedName = extractNameFromExpr(node);
      if (extractedName !== null) {
        name = extractedName;
      }
    }
  } else if (emitted.kind === ReferenceEmitKind.Failed) {
    unexportedDiagnostic = emitted.reason;
    isLocal = false;
  }
  const nodeName = ref.node?.name;
  const nodeNameSpan = nodeName ? new AbsoluteSourceSpan(nodeName.getStart(), nodeName.getEnd()) : void 0;
  const nodeFilePath = nodeName !== void 0 ? absoluteFromSourceFile(nodeName.getSourceFile()) : void 0;
  let key;
  if (nodeFilePath !== void 0 && nodeNameSpan !== void 0) {
    key = `${nodeFilePath}#${nodeNameSpan.start}`;
  } else {
    key = moduleName ? `${moduleName}#${name}` : name;
  }
  return {
    name,
    moduleName,
    isLocal,
    unexportedDiagnostic,
    nodeNameSpan,
    nodeFilePath,
    key
  };
}
function extractNameFromExpr(node) {
  if (ts31.isIdentifier(node)) {
    return node.text;
  } else if (ts31.isPropertyAccessExpression(node)) {
    const receiver = extractNameFromExpr(node.expression);
    return receiver !== null ? `${receiver}.${node.name.text}` : null;
  }
  return null;
}

// packages/compiler-cli/src/ngtsc/typecheck/src/oob.js
import { AbsoluteSourceSpan as AbsoluteSourceSpan2, BindingType, OutOfBandDiagnosticCategory, ParseSourceSpan as ParseSourceSpan2, TmplAstBoundAttribute, TmplAstBoundEvent, TmplAstComponent, TmplAstDirective, TmplAstElement } from "@angular/compiler";
import ts32 from "typescript";
var OutOfBandDiagnosticRecorderImpl = class {
  resolver;
  getSourceFile;
  _diagnostics = [];
  /**
   * Tracks which `BindingPipe` nodes have already been recorded as invalid, so only one diagnostic
   * is ever produced per node.
   */
  recordedPipes = /* @__PURE__ */ new Set();
  /** Common pipes that can be suggested to users. */
  pipeSuggestions = /* @__PURE__ */ new Map([
    ["async", "AsyncPipe"],
    ["uppercase", "UpperCasePipe"],
    ["lowercase", "LowerCasePipe"],
    ["json", "JsonPipe"],
    ["slice", "SlicePipe"],
    ["number", "DecimalPipe"],
    ["percent", "PercentPipe"],
    ["titlecase", "TitleCasePipe"],
    ["currency", "CurrencyPipe"],
    ["date", "DatePipe"],
    ["i18nPlural", "I18nPluralPipe"],
    ["i18nSelect", "I18nSelectPipe"],
    ["keyvalue", "KeyValuePipe"]
  ]);
  constructor(resolver, getSourceFile2 = (name) => void 0) {
    this.resolver = resolver;
    this.getSourceFile = getSourceFile2;
  }
  get diagnostics() {
    return this._diagnostics;
  }
  missingReferenceTarget(id, ref) {
    const mapping = this.resolver.getTemplateSourceMapping(id);
    const value = ref.value.trim();
    const errorMsg = `No directive found with exportAs '${value}'.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, ref.valueSpan || ref.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.MISSING_REFERENCE_TARGET), errorMsg));
  }
  missingPipe(id, ast, isStandalone) {
    if (this.recordedPipes.has(ast)) {
      return;
    }
    const sourceSpan = this.resolver.toTemplateParseSourceSpan(id, ast.nameSpan);
    if (sourceSpan === null) {
      throw new Error(`Assertion failure: no SourceLocation found for usage of pipe '${ast.name}'.`);
    }
    const mapping = this.resolver.getTemplateSourceMapping(id);
    let errorMsg = `No pipe found with name '${ast.name}'.`;
    if (this.pipeSuggestions.has(ast.name)) {
      const suggestedClassName = this.pipeSuggestions.get(ast.name);
      const suggestedImport = "@angular/common";
      if (isStandalone) {
        errorMsg += `
To fix this, import the "${suggestedClassName}" class from "${suggestedImport}" and add it to the "imports" array of the component.`;
      } else {
        errorMsg += `
To fix this, import the "${suggestedClassName}" class from "${suggestedImport}" and add it to the "imports" array of the module declaring the component.`;
      }
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.MISSING_PIPE), errorMsg));
    this.recordedPipes.add(ast);
  }
  deferredPipeUsedEagerly(id, ast) {
    if (this.recordedPipes.has(ast)) {
      return;
    }
    const mapping = this.resolver.getTemplateSourceMapping(id);
    const errorMsg = `Pipe '${ast.name}' was imported  via \`@Component.deferredImports\`, but was used outside of a \`@defer\` block in a template. To fix this, either use the '${ast.name}' pipe inside of a \`@defer\` block or import this dependency using the \`@Component.imports\` field.`;
    const sourceSpan = this.resolver.toTemplateParseSourceSpan(id, ast.nameSpan);
    if (sourceSpan === null) {
      throw new Error(`Assertion failure: no SourceLocation found for usage of pipe '${ast.name}'.`);
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.DEFERRED_PIPE_USED_EAGERLY), errorMsg));
    this.recordedPipes.add(ast);
  }
  deferredComponentUsedEagerly(id, element) {
    const mapping = this.resolver.getTemplateSourceMapping(id);
    const errorMsg = `Element '${element.name}' contains a component or a directive that was imported  via \`@Component.deferredImports\`, but the element itself is located outside of a \`@defer\` block in a template. To fix this, either use the '${element.name}' element inside of a \`@defer\` block or import referenced component/directive dependency using the \`@Component.imports\` field.`;
    const { start, end } = element.startSourceSpan;
    const absoluteSourceSpan = new AbsoluteSourceSpan2(start.offset, end.offset);
    const sourceSpan = this.resolver.toTemplateParseSourceSpan(id, absoluteSourceSpan);
    if (sourceSpan === null) {
      throw new Error(`Assertion failure: no SourceLocation found for usage of pipe '${element.name}'.`);
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.DEFERRED_DIRECTIVE_USED_EAGERLY), errorMsg));
  }
  duplicateTemplateVar(id, variable, firstDecl) {
    const mapping = this.resolver.getTemplateSourceMapping(id);
    const errorMsg = `Cannot redeclare variable '${variable.name}' as it was previously declared elsewhere for the same template.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, variable.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.DUPLICATE_VARIABLE_DECLARATION), errorMsg, [
      {
        text: `The variable '${firstDecl.name}' was first declared here.`,
        start: firstDecl.sourceSpan.start.offset,
        end: firstDecl.sourceSpan.end.offset,
        sourceFile: mapping.node.getSourceFile()
      }
    ]));
  }
  suboptimalTypeInference(id, variables) {
    const mapping = this.resolver.getTemplateSourceMapping(id);
    let diagnosticVar = null;
    for (const variable of variables) {
      if (diagnosticVar === null || variable.value === "" || variable.value === "$implicit") {
        diagnosticVar = variable;
      }
    }
    if (diagnosticVar === null) {
      return;
    }
    let varIdentification = `'${diagnosticVar.name}'`;
    if (variables.length === 2) {
      varIdentification += ` (and 1 other)`;
    } else if (variables.length > 2) {
      varIdentification += ` (and ${variables.length - 1} others)`;
    }
    const message = `This structural directive supports advanced type inference, but the current compiler configuration prevents its usage. The variable ${varIdentification} will have type 'any' as a result.

Consider enabling the 'strictTemplates' option in your tsconfig.json for better type inference within this template.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, diagnosticVar.keySpan, ts32.DiagnosticCategory.Suggestion, ngErrorCode(ErrorCode.SUGGEST_SUBOPTIMAL_TYPE_INFERENCE), message));
  }
  splitTwoWayBinding(id, input, output, inputConsumer, outputConsumer) {
    const mapping = this.resolver.getTemplateSourceMapping(id);
    const errorMsg = `The property and event halves of the two-way binding '${input.name}' are not bound to the same target.
            Find more at ${DOC_PAGE_BASE_URL}/guide/templates/two-way-binding`;
    const relatedMessages = [];
    if (inputConsumer.ref.nodeNameSpan && inputConsumer.ref.nodeFilePath) {
      const sf = this.getSourceFile(inputConsumer.ref.nodeFilePath);
      if (sf) {
        relatedMessages.push({
          text: `The property half of the binding is to the '${inputConsumer.name}' ${inputConsumer.isComponent ? "component" : "directive"}.`,
          start: inputConsumer.ref.nodeNameSpan.start,
          end: inputConsumer.ref.nodeNameSpan.end,
          sourceFile: sf
        });
      }
    }
    if (outputConsumer instanceof TmplAstElement) {
      let message = `The event half of the binding is to a native event called '${input.name}' on the <${outputConsumer.name}> DOM element.`;
      if (!mapping.node.getSourceFile().isDeclarationFile) {
        message += `
 
 Are you missing an output declaration called '${output.name}'?`;
      }
      relatedMessages.push({
        text: message,
        start: outputConsumer.sourceSpan.start.offset + 1,
        end: outputConsumer.sourceSpan.start.offset + outputConsumer.name.length + 1,
        sourceFile: mapping.node.getSourceFile()
      });
    } else {
      if (outputConsumer.ref.nodeNameSpan && outputConsumer.ref.nodeFilePath) {
        const sf = this.getSourceFile(outputConsumer.ref.nodeFilePath);
        if (sf) {
          relatedMessages.push({
            text: `The event half of the binding is to the '${outputConsumer.name}' ${outputConsumer.isComponent ? "component" : "directive"}.`,
            start: outputConsumer.ref.nodeNameSpan.start,
            end: outputConsumer.ref.nodeNameSpan.end,
            sourceFile: sf
          });
        }
      }
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, input.keySpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.SPLIT_TWO_WAY_BINDING), errorMsg, relatedMessages));
  }
  missingRequiredInputs(id, element, directiveName, isComponent, inputAliases) {
    const message = `Required input${inputAliases.length === 1 ? "" : "s"} ${inputAliases.map((n2) => `'${n2}'`).join(", ")} from ${isComponent ? "component" : "directive"} ${directiveName} must be specified.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), this.getTagNameSpan(element), ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.MISSING_REQUIRED_INPUTS), message));
  }
  illegalForLoopTrackAccess(id, block, access) {
    const sourceSpan = this.resolver.toTemplateParseSourceSpan(id, access.sourceSpan);
    if (sourceSpan === null) {
      throw new Error(`Assertion failure: no SourceLocation found for property read.`);
    }
    const messageVars = [block.item, ...block.contextVariables.filter((v) => v.value === "$index")].map((v) => `'${v.name}'`).join(", ");
    const message = `Cannot access '${access.name}' inside of a track expression. Only ${messageVars} and properties on the containing component are available to this expression.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.ILLEGAL_FOR_LOOP_TRACK_ACCESS), message));
  }
  inaccessibleDeferredTriggerElement(id, trigger) {
    let message;
    if (trigger.reference === null) {
      message = `Trigger cannot find reference. Make sure that the @defer block has a @placeholder with at least one root element node.`;
    } else {
      message = `Trigger cannot find reference "${trigger.reference}".
Check that an element with #${trigger.reference} exists in the same template and it's accessible from the @defer block.
Deferred blocks can only access triggers in same view, a parent embedded view or the root view of the @placeholder block.`;
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), trigger.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.INACCESSIBLE_DEFERRED_TRIGGER_ELEMENT), message));
  }
  controlFlowPreventingContentProjection(id, category, projectionNode, componentName, slotSelector, controlFlowNode, preservesWhitespaces) {
    const blockName = controlFlowNode.nameSpan.toString().trim();
    const lines = [
      `Node matches the "${slotSelector}" slot of the "${componentName}" component, but will not be projected into the specific slot because the surrounding ${blockName} has more than one node at its root. To project the node in the right slot, you can:
`,
      `1. Wrap the content of the ${blockName} block in an <ng-container/> that matches the "${slotSelector}" selector.`,
      `2. Split the content of the ${blockName} block across multiple ${blockName} blocks such that each one only has a single projectable node at its root.`,
      `3. Remove all content from the ${blockName} block, except for the node being projected.`
    ];
    if (preservesWhitespaces) {
      lines.push("Note: the host component has `preserveWhitespaces: true` which may cause whitespace to affect content projection.");
    }
    lines.push("", 'This check can be disabled using the `extendedDiagnostics.checks.controlFlowPreventingContentProjection = "suppress" compiler option.`');
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), projectionNode.startSourceSpan, translateCategory(category), ngErrorCode(ErrorCode.CONTROL_FLOW_PREVENTING_CONTENT_PROJECTION), lines.join("\n")));
  }
  illegalWriteToLetDeclaration(id, node, target) {
    const sourceSpan = this.resolver.toTemplateParseSourceSpan(id, node.sourceSpan);
    if (sourceSpan === null) {
      throw new Error(`Assertion failure: no SourceLocation found for property write.`);
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.ILLEGAL_LET_WRITE), `Cannot assign to @let declaration '${target.name}'.`));
  }
  letUsedBeforeDefinition(id, node, target) {
    const sourceSpan = this.resolver.toTemplateParseSourceSpan(id, node.sourceSpan);
    if (sourceSpan === null) {
      throw new Error(`Assertion failure: no SourceLocation found for property read.`);
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.LET_USED_BEFORE_DEFINITION), `Cannot read @let declaration '${target.name}' before it has been defined.`));
  }
  conflictingDeclaration(id, decl) {
    const mapping = this.resolver.getTemplateSourceMapping(id);
    const errorMsg = `Cannot declare @let called '${decl.name}' as there is another symbol in the template with the same name.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, mapping, decl.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.CONFLICTING_LET_DECLARATION), errorMsg));
  }
  missingNamedTemplateDependency(id, node) {
    this._diagnostics.push(makeTemplateDiagnostic(
      id,
      this.resolver.getTemplateSourceMapping(id),
      node.startSourceSpan,
      ts32.DiagnosticCategory.Error,
      ngErrorCode(ErrorCode.MISSING_NAMED_TEMPLATE_DEPENDENCY),
      // Wording is meant to mimic the wording TS uses in their diagnostic for missing symbols.
      `Cannot find name "${node instanceof TmplAstDirective ? node.name : node.componentName}". Selectorless references are only supported to classes or non-type import statements.`
    ));
  }
  incorrectTemplateDependencyType(id, node) {
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), node.startSourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.INCORRECT_NAMED_TEMPLATE_DEPENDENCY_TYPE), `Incorrect reference type. Type must be a standalone ${node instanceof TmplAstComponent ? "@Component" : "@Directive"}.`));
  }
  unclaimedDirectiveBinding(id, directive, node) {
    const errorMsg = `Directive ${directive.name} does not have an ${node instanceof TmplAstBoundEvent ? "output" : "input"} named "${node.name}". Bindings to directives must target existing inputs or outputs.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), node.keySpan || node.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.UNCLAIMED_DIRECTIVE_BINDING), errorMsg));
  }
  deferImplicitTriggerMissingPlaceholder(id, trigger) {
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), trigger.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.DEFER_IMPLICIT_TRIGGER_MISSING_PLACEHOLDER), "Trigger with no target can only be placed on an @defer that has a @placeholder block"));
  }
  deferImplicitTriggerInvalidPlaceholder(id, trigger) {
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), trigger.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.DEFER_IMPLICIT_TRIGGER_INVALID_PLACEHOLDER), "Trigger with no target can only be placed on an @defer that has a @placeholder block with exactly one root element node"));
  }
  formFieldUnsupportedBinding(id, node) {
    let message;
    if (node instanceof TmplAstBoundAttribute) {
      let name;
      if (node.type === BindingType.Property) {
        name = `[${node.name}]`;
      } else if (node.type === BindingType.Attribute) {
        name = `[attr.${node.name}]`;
      } else {
        name = node.name;
      }
      message = `Binding to '${name}' is not allowed on nodes using the '[formField]' directive`;
    } else {
      message = `Setting the '${node.name}' attribute is not allowed on nodes using the '[formField]' directive`;
    }
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), node.sourceSpan, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.FORM_FIELD_UNSUPPORTED_BINDING), message));
  }
  multipleMatchingComponents(id, element, componentNames) {
    const start = element.startSourceSpan.start.moveBy(1);
    const end = element.startSourceSpan.end.moveBy(start.offset + element.name.length - element.startSourceSpan.end.offset);
    const span = new ParseSourceSpan2(start, end);
    const names = componentNames.map((n2) => `'${n2}'`).join(", ");
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), span, ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.MULTIPLE_MATCHING_COMPONENTS), `Multiple components match node with tagname ${element.name}: ${names}.`));
  }
  conflictingHostDirectiveBinding(id, node, directiveName, kind, classPropertyName, aliases) {
    const message = `${kind === "input" ? "Input" : "Output"} declared in ${directiveName}.${classPropertyName} is exposed under the following conflicting names: ${aliases.map((a) => `"${a}"`).join(", ")}. An ${kind} can only be exposed under a single name.`;
    this._diagnostics.push(makeTemplateDiagnostic(id, this.resolver.getTemplateSourceMapping(id), this.getTagNameSpan(node), ts32.DiagnosticCategory.Error, ngErrorCode(ErrorCode.CONFLICTING_HOST_DIRECTIVE_BINDING), message));
  }
  getTagNameSpan(node) {
    let span;
    let name;
    if (node instanceof TmplAstElement || node instanceof TmplAstDirective) {
      name = node.name;
    } else if (node instanceof TmplAstComponent) {
      name = node.componentName;
    } else {
      name = null;
    }
    if (name === null) {
      span = node.startSourceSpan;
    } else {
      const start = node.startSourceSpan.start.moveBy(1);
      const end = node.startSourceSpan.end.moveBy(start.offset + name.length - node.startSourceSpan.end.offset);
      span = new ParseSourceSpan2(start, end);
    }
    return span;
  }
};
function translateCategory(category) {
  switch (category) {
    case OutOfBandDiagnosticCategory.Error:
      return ts32.DiagnosticCategory.Error;
    case OutOfBandDiagnosticCategory.Warning:
      return ts32.DiagnosticCategory.Warning;
  }
}

// packages/compiler-cli/src/ngtsc/typecheck/src/shim.js
import ts33 from "typescript";
var TypeCheckShimGenerator = class {
  extensionPrefix = "ngtypecheck";
  shouldEmit = false;
  generateShimForFile(sf, genFilePath, priorShimSf) {
    if (priorShimSf !== null) {
      return priorShimSf;
    }
    return ts33.createSourceFile(genFilePath, "export const USED_FOR_NG_TYPE_CHECKING = true;", ts33.ScriptTarget.Latest, true, ts33.ScriptKind.TS);
  }
  static shimFor(fileName) {
    return absoluteFrom(fileName.replace(/\.tsx?$/, ".ngtypecheck.ts"));
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/type_check_file.js
import { generateTypeCheckBlock } from "@angular/compiler";
import ts34 from "typescript";
var TCB_FUNCTION_PREFIX = "_tcb";
var TypeCheckFile = class extends Environment {
  fileName;
  isTypeCheckFile = true;
  nextTcbId = 1;
  tcbStatements = [];
  sourceContent = "";
  get hasCopiedSource() {
    return this.copiedSourceOriginPath !== void 0;
  }
  setSourceContent(text) {
    this.sourceContent = text;
  }
  constructor(fileName, config, refEmitter, compilerHost) {
    super(config, new ImportManager({
      // This minimizes noticeable changes with older versions of `ImportManager`.
      forceGenerateNamespacesForNewImports: true,
      // Type check block code affects code completion and fix suggestions.
      // We want to encourage single quotes for now, like we always did.
      shouldUseSingleQuotes: () => true
    }), refEmitter, ts34.createSourceFile(compilerHost.getCanonicalFileName(fileName), "", ts34.ScriptTarget.Latest, true));
    this.fileName = fileName;
  }
  addTypeCheckBlock(ref, meta, domSchemaChecker, oobRecorder, genericContextBehavior, reflector) {
    const fnId = `${TCB_FUNCTION_PREFIX}${this.nextTcbId++}`;
    const { tcbMeta, component } = adaptTypeCheckBlockMetadata(ref, meta, this, reflector, genericContextBehavior);
    const fn = generateTypeCheckBlock(this, component, fnId, tcbMeta, domSchemaChecker, oobRecorder);
    this.tcbStatements.push(fn);
  }
  render() {
    ensureTypeCheckFilePreparationImports(this);
    const importChanges = this.importManager.finalize();
    if (importChanges.updatedImports.size > 0) {
      throw new Error("AssertionError: Expected no imports to be updated for a new type check file.");
    }
    const printer = ts34.createPrinter();
    let source = this.sourceContent;
    const newImports = importChanges.newImports.get(this.contextFile.fileName);
    if (newImports !== void 0) {
      if (source.length > 0 && !source.endsWith("\n")) {
        source += "\n";
      }
      source += newImports.map((i) => printer.printNode(ts34.EmitHint.Unspecified, i, this.contextFile)).join("\n");
    }
    source += "\n";
    for (const expr of this.pipeInstStatements) {
      source += `${expr.print()};
`;
    }
    for (const expr of this.typeCtorStatements) {
      source += `${expr.print()};
`;
    }
    source += "\n";
    for (const stmt of this.tcbStatements) {
      source += stmt + "\n";
    }
    source += "\nexport const IS_A_MODULE = true;\n";
    return source;
  }
  getPreludeStatements() {
    return [];
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/context.js
var TypeCheckContextImpl = class {
  config;
  compilerHost;
  refEmitter;
  reflector;
  host;
  inlining;
  perf;
  fileMap = /* @__PURE__ */ new Map();
  constructor(config, compilerHost, refEmitter, reflector, host, inlining, perf) {
    this.config = config;
    this.compilerHost = compilerHost;
    this.refEmitter = refEmitter;
    this.reflector = reflector;
    this.host = host;
    this.inlining = inlining;
    this.perf = perf;
    if (inlining === InliningMode.Error && config.useInlineTypeConstructors) {
      throw new Error(`AssertionError: invalid inlining configuration.`);
    }
  }
  /**
   * A `Map` of `ts.SourceFile`s that the context has seen to the operations (additions of methods
   * or type-check blocks) that need to be eventually performed on that file.
   */
  opMap = /* @__PURE__ */ new Map();
  /**
   * Tracks when an a particular class has a pending type constructor patching operation already
   * queued.
   */
  typeCtorPending = /* @__PURE__ */ new Set();
  /**
   * Register a template to potentially be type-checked.
   *
   * Implements `TypeCheckContext.addTemplate`.
   */
  addDirective(ref, binder, schemas, templateContext, hostBindingContext, isStandalone) {
    if (!this.host.shouldCheckClass(ref.node)) {
      return;
    }
    const sourceFile = ref.node.getSourceFile();
    const fileData = this.dataForFile(sourceFile);
    const shimData = this.pendingShimForClass(ref.node);
    const id = fileData.sourceManager.getTypeCheckId(ref.node);
    const templateParsingDiagnostics = [];
    if (templateContext !== null && templateContext.parseErrors !== null) {
      templateParsingDiagnostics.push(...getTemplateDiagnostics(templateContext.parseErrors, id, templateContext.sourceMapping));
    }
    const boundTarget = binder.bind({
      template: templateContext?.nodes,
      host: hostBindingContext === null ? void 0 : {
        node: hostBindingContext.node,
        directives: hostBindingContext.directives
      }
    });
    if (this.inlining === InliningMode.InlineOps) {
      for (const dir of boundTarget.getUsedDirectives()) {
        const dirRef = dir.ref;
        const dirNode = dirRef.node;
        if (!dir.isGeneric || !requiresInlineTypeCtor(dirNode, this.reflector, (r) => shimData.file.canReferenceType(r))) {
          continue;
        }
        this.addInlineTypeCtor(fileData, dirNode.getSourceFile(), dirRef, {
          fnName: "ngTypeCtor",
          // The constructor should have a body if the directive comes from a .ts file, but not if
          // it comes from a .d.ts file. .d.ts declarations don't have bodies.
          body: !dirNode.getSourceFile().isDeclarationFile,
          fields: {
            inputs: dir.inputs
            // TODO(alxhub): support queries
          },
          coercedInputFields: dir.coercedInputFields
        });
      }
    }
    shimData.data.set(id, {
      template: templateContext?.nodes || null,
      boundTarget,
      templateParsingDiagnostics,
      hostElement: hostBindingContext?.node ?? null
    });
    const usedPipes = [];
    if (templateContext !== null) {
      for (const name of boundTarget.getUsedPipes()) {
        if (templateContext.pipes.has(name)) {
          usedPipes.push(templateContext.pipes.get(name).ref);
        }
      }
    }
    const inliningRequirement = requiresInlineTypeCheckBlock(ref, shimData.file, usedPipes, this.reflector);
    if (this.inlining === InliningMode.Error && inliningRequirement === TcbInliningRequirement.MustInline) {
      shimData.shimDiagnostics ??= [];
      shimData.shimDiagnostics.push({
        ...makeDiagnostic(ErrorCode.INLINE_TCB_REQUIRED, ref.node.name, `This component requires inline template type-checking, which is not supported by the current environment.`),
        sourceFile: ref.node.getSourceFile(),
        typeCheckId: id
      });
      this.perf.eventCount(PerfEvent.SkipGenerateTcbNoInline);
      return;
    }
    if (templateContext !== null) {
      fileData.sourceManager.captureTemplateSource(id, templateContext.sourceMapping, templateContext.file);
    }
    if (hostBindingContext !== null) {
      fileData.sourceManager.captureHostBindingsMapping(
        id,
        hostBindingContext.sourceMapping,
        // We only support host bindings in the same file as the directive
        // so we can get the source file from here.
        new ParseSourceFile3(sourceFile.text, sourceFile.fileName)
      );
    }
    const meta = {
      id,
      boundTarget,
      pipes: templateContext?.pipes || null,
      schemas,
      isStandalone,
      preserveWhitespaces: templateContext?.preserveWhitespaces ?? false
    };
    this.perf.eventCount(PerfEvent.GenerateTcb);
    if (inliningRequirement !== TcbInliningRequirement.None && (this.inlining === InliningMode.InlineOps || this.inlining === InliningMode.CopySourceToTcb)) {
      this.addInlineTypeCheckBlock(fileData, shimData, ref, meta);
      if (this.inlining === InliningMode.CopySourceToTcb) {
        shimData.file.copiedSourceOriginPath = absoluteFromSourceFile(sourceFile);
      }
    } else if (inliningRequirement === TcbInliningRequirement.ShouldInlineForGenericBounds && this.inlining === InliningMode.Error) {
      shimData.file.addTypeCheckBlock(ref, meta, shimData.domSchemaChecker, shimData.oobRecorder, TcbGenericContextBehavior2.FallbackToAny, this.reflector);
    } else {
      shimData.file.addTypeCheckBlock(ref, meta, shimData.domSchemaChecker, shimData.oobRecorder, TcbGenericContextBehavior2.UseEmitter, this.reflector);
    }
  }
  /**
   * Record a type constructor for the given `node` with the given `ctorMetadata`.
   */
  addInlineTypeCtor(fileData, sf, ref, ctorMeta) {
    if (this.typeCtorPending.has(ref.node)) {
      return;
    }
    this.typeCtorPending.add(ref.node);
    if (!this.opMap.has(sf)) {
      this.opMap.set(sf, []);
    }
    const ops = this.opMap.get(sf);
    ops.push(new TypeCtorOp(ref, this.reflector, ctorMeta));
    fileData.hasInlines = true;
  }
  /**
   * Applies operations to a file.
   */
  executeOperations(targetSf, opsSourceSf) {
    const printer = ts35.createPrinter({ omitTrailingSemicolon: true });
    const importManager = new ImportManager({
      // This minimizes noticeable changes with older versions of `ImportManager`.
      forceGenerateNamespacesForNewImports: true,
      // Type check block code affects code completion and fix suggestions.
      // We want to encourage single quotes for now, like we always did.
      shouldUseSingleQuotes: () => true
    });
    const updates = this.opMap.get(opsSourceSf).map((op) => {
      return {
        pos: op.splitPoint,
        text: op.execute(importManager, targetSf, this.refEmitter)
      };
    });
    const { newImports, updatedImports } = importManager.finalize();
    if (newImports.has(targetSf.fileName)) {
      newImports.get(targetSf.fileName).forEach((newImport) => {
        updates.push({
          pos: 0,
          text: printer.printNode(ts35.EmitHint.Unspecified, newImport, targetSf)
        });
      });
    }
    for (const [oldBindings, newBindings] of updatedImports.entries()) {
      if (oldBindings.getSourceFile() !== targetSf) {
        throw new Error("Unexpected updates to unrelated source files.");
      }
      updates.push({
        pos: oldBindings.getStart(),
        deletePos: oldBindings.getEnd(),
        text: printer.printNode(ts35.EmitHint.Unspecified, newBindings, targetSf)
      });
    }
    const result = new MagicString(targetSf.text, { filename: targetSf.fileName });
    for (const update of updates) {
      if (update.deletePos !== void 0) {
        result.remove(update.pos, update.deletePos);
      }
      result.appendLeft(update.pos, update.text);
    }
    return result.toString();
  }
  /**
   * Generates the transformed text for an original source file.
   */
  generateTransformedOriginalFile(sf) {
    if (this.inlining !== InliningMode.InlineOps || !this.opMap.has(sf)) {
      return null;
    }
    return this.executeOperations(sf, sf);
  }
  /**
   * Generates the content for a shim file that copies the source of the original file.
   */
  generateCopiedShimContent(originalSf, shimFileName) {
    if (this.inlining !== InliningMode.CopySourceToTcb || !this.opMap.has(originalSf)) {
      return null;
    }
    const fakeSf = ts35.createSourceFile(shimFileName, originalSf.text, ts35.ScriptTarget.Latest, true);
    return this.executeOperations(fakeSf, originalSf);
  }
  finalize() {
    const updates = /* @__PURE__ */ new Map();
    for (const originalSf of this.opMap.keys()) {
      const newText = this.generateTransformedOriginalFile(originalSf);
      if (newText !== null) {
        updates.set(absoluteFromSourceFile(originalSf), {
          newText,
          originalFile: originalSf
        });
      }
    }
    for (const [sfPath, pendingFileData] of this.fileMap) {
      for (const pendingShimData of pendingFileData.shimData.values()) {
        const genesisDiagnostics = [
          ...pendingShimData.domSchemaChecker.diagnostics,
          ...pendingShimData.oobRecorder.diagnostics
        ];
        if (pendingShimData.shimDiagnostics !== null) {
          genesisDiagnostics.unshift(...pendingShimData.shimDiagnostics);
        }
        this.host.recordShimData(sfPath, {
          genesisDiagnostics,
          hasInlines: pendingFileData.hasInlines,
          path: pendingShimData.file.fileName,
          data: pendingShimData.data
        });
        const originalSf = pendingFileData.sourceFile;
        if (originalSf !== void 0) {
          const transformedText = this.generateCopiedShimContent(originalSf, pendingShimData.file.fileName);
          if (transformedText !== null) {
            pendingShimData.file.setSourceContent(transformedText);
          }
        }
        const sfText = pendingShimData.file.render();
        updates.set(pendingShimData.file.fileName, {
          newText: sfText,
          // Shim files do not have an associated original file.
          originalFile: null
        });
      }
    }
    return updates;
  }
  addInlineTypeCheckBlock(fileData, shimData, ref, tcbMeta) {
    const sf = ref.node.getSourceFile();
    if (!this.opMap.has(sf)) {
      this.opMap.set(sf, []);
    }
    const ops = this.opMap.get(sf);
    ops.push(new InlineTcbOp(ref, tcbMeta, this.config, this.reflector, shimData.domSchemaChecker, shimData.oobRecorder));
    fileData.hasInlines = true;
  }
  pendingShimForClass(node) {
    const fileData = this.dataForFile(node.getSourceFile());
    const shimPath = TypeCheckShimGenerator.shimFor(absoluteFromSourceFile(node.getSourceFile()));
    if (!fileData.shimData.has(shimPath)) {
      fileData.shimData.set(shimPath, {
        domSchemaChecker: new RegistryDomSchemaChecker(fileData.sourceManager),
        oobRecorder: new OutOfBandDiagnosticRecorderImpl(fileData.sourceManager, (name) => this.compilerHost.getSourceFile(name, ts35.ScriptTarget.Latest)),
        file: new TypeCheckFile(shimPath, this.config, this.refEmitter, this.compilerHost),
        data: /* @__PURE__ */ new Map(),
        shimDiagnostics: null
      });
    }
    return fileData.shimData.get(shimPath);
  }
  dataForFile(sf) {
    const sfPath = absoluteFromSourceFile(sf);
    if (!this.fileMap.has(sfPath)) {
      const data = {
        hasInlines: false,
        sourceManager: this.host.getSourceManager(sfPath),
        shimData: /* @__PURE__ */ new Map(),
        sourceFile: sf
      };
      this.fileMap.set(sfPath, data);
    }
    return this.fileMap.get(sfPath);
  }
};
function getTemplateDiagnostics(parseErrors, templateId, sourceMapping) {
  return parseErrors.map((error) => {
    const span = error.span;
    if (span.start.offset === span.end.offset) {
      span.end.offset++;
    }
    return makeTemplateDiagnostic(templateId, sourceMapping, span, ts35.DiagnosticCategory.Error, ngErrorCode(ErrorCode.TEMPLATE_PARSE_ERROR), error.msg);
  });
}
var InlineTcbOp = class {
  ref;
  meta;
  config;
  reflector;
  domSchemaChecker;
  oobRecorder;
  constructor(ref, meta, config, reflector, domSchemaChecker, oobRecorder) {
    this.ref = ref;
    this.meta = meta;
    this.config = config;
    this.reflector = reflector;
    this.domSchemaChecker = domSchemaChecker;
    this.oobRecorder = oobRecorder;
  }
  /**
   * Type check blocks are inserted immediately after the end of the directve class.
   */
  get splitPoint() {
    return this.ref.node.end + 1;
  }
  execute(im, tcbSf, refEmitter) {
    const env = new Environment(this.config, im, refEmitter, tcbSf);
    const originalSf = this.ref.node.getSourceFile();
    if (tcbSf !== originalSf) {
      env.copiedSourceOriginPath = absoluteFromSourceFile(originalSf);
    }
    const fnName = `${TCB_FUNCTION_PREFIX}_${this.ref.node.pos}`;
    const { tcbMeta, component } = adaptTypeCheckBlockMetadata(this.ref, this.meta, env, this.reflector, TcbGenericContextBehavior2.CopyClassNodes);
    const fn = generateTypeCheckBlock2(env, component, fnName, tcbMeta, this.domSchemaChecker, this.oobRecorder);
    return `
${fn}`;
  }
};
var TypeCtorOp = class {
  ref;
  reflector;
  meta;
  constructor(ref, reflector, meta) {
    this.ref = ref;
    this.reflector = reflector;
    this.meta = meta;
  }
  /**
   * Type constructor operations are inserted immediately before the end of the directive class.
   */
  get splitPoint() {
    return this.ref.node.end - 1;
  }
  execute(im, sf, refEmitter) {
    const emitEnv = new ReferenceEmitEnvironment(im, refEmitter, sf);
    return generateInlineTypeCtor(emitEnv, this.ref.node, this.meta);
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/diagnostics.js
function shouldReportDiagnostic(diagnostic) {
  const { code } = diagnostic;
  if (code === 6133) {
    return false;
  } else if (code === 6199) {
    return false;
  } else if (code === 2695) {
    return false;
  } else if (code === 7006) {
    return false;
  }
  return true;
}
function translateDiagnostic(diagnostic, resolver) {
  if (diagnostic.file === void 0 || diagnostic.start === void 0) {
    return null;
  }
  const fullMapping = getSourceMapping(
    diagnostic.file,
    diagnostic.start,
    resolver,
    /*isDiagnosticsRequest*/
    true
  );
  if (fullMapping === null) {
    return null;
  }
  const { sourceLocation, sourceMapping: templateSourceMapping, span } = fullMapping;
  return makeTemplateDiagnostic(sourceLocation.id, templateSourceMapping, span, diagnostic.category, diagnostic.code, diagnostic.messageText, void 0, diagnostic.reportsDeprecated !== void 0 ? {
    reportsDeprecated: diagnostic.reportsDeprecated,
    relatedMessages: diagnostic.relatedInformation
  } : void 0);
}

// packages/compiler-cli/src/ngtsc/typecheck/src/source.js
import { ParseLocation as ParseLocation2, ParseSourceSpan as ParseSourceSpan3 } from "@angular/compiler";

// packages/compiler-cli/src/ngtsc/typecheck/src/line_mappings.js
var LF_CHAR = 10;
var CR_CHAR = 13;
var LINE_SEP_CHAR = 8232;
var PARAGRAPH_CHAR = 8233;
function getLineAndCharacterFromPosition(lineStartsMap, position) {
  const lineIndex = findClosestLineStartPosition(lineStartsMap, position);
  return { character: position - lineStartsMap[lineIndex], line: lineIndex };
}
function computeLineStartsMap(text) {
  const result = [0];
  let pos = 0;
  while (pos < text.length) {
    const char = text.charCodeAt(pos++);
    if (char === CR_CHAR) {
      if (text.charCodeAt(pos) === LF_CHAR) {
        pos++;
      }
      result.push(pos);
    } else if (char === LF_CHAR || char === LINE_SEP_CHAR || char === PARAGRAPH_CHAR) {
      result.push(pos);
    }
  }
  result.push(pos);
  return result;
}
function findClosestLineStartPosition(linesMap, position, low = 0, high = linesMap.length - 1) {
  while (low <= high) {
    const pivotIdx = Math.floor((low + high) / 2);
    const pivotEl = linesMap[pivotIdx];
    if (pivotEl === position) {
      return pivotIdx;
    } else if (position > pivotEl) {
      low = pivotIdx + 1;
    } else {
      high = pivotIdx - 1;
    }
  }
  return low - 1;
}

// packages/compiler-cli/src/ngtsc/typecheck/src/source.js
var Source = class {
  mapping;
  file;
  lineStarts = null;
  constructor(mapping, file) {
    this.mapping = mapping;
    this.file = file;
  }
  toParseSourceSpan(start, end) {
    const startLoc = this.toParseLocation(start);
    const endLoc = this.toParseLocation(end);
    return new ParseSourceSpan3(startLoc, endLoc);
  }
  toParseLocation(position) {
    const lineStarts = this.acquireLineStarts();
    const { line, character } = getLineAndCharacterFromPosition(lineStarts, position);
    return new ParseLocation2(this.file, position, line, character);
  }
  acquireLineStarts() {
    if (this.lineStarts === null) {
      this.lineStarts = computeLineStartsMap(this.file.content);
    }
    return this.lineStarts;
  }
};
var DirectiveSourceManager = class {
  /**
   * This map keeps track of all template sources that have been type-checked by the id that is
   * attached to a TCB's function declaration as leading trivia. This enables translation of
   * diagnostics produced for TCB code to their source location in the template.
   */
  templateSources = /* @__PURE__ */ new Map();
  /** Keeps track of type check IDs and the source location of their host bindings. */
  hostBindingSources = /* @__PURE__ */ new Map();
  getTypeCheckId(node) {
    return getTypeCheckId(node);
  }
  captureTemplateSource(id, mapping, file) {
    this.templateSources.set(id, new Source(mapping, file));
  }
  captureHostBindingsMapping(id, mapping, file) {
    this.hostBindingSources.set(id, new Source(mapping, file));
  }
  getTemplateSourceMapping(id) {
    if (!this.templateSources.has(id)) {
      throw new Error(`Unexpected unknown type check ID: ${id}`);
    }
    return this.templateSources.get(id).mapping;
  }
  getHostBindingsMapping(id) {
    if (!this.hostBindingSources.has(id)) {
      throw new Error(`Unexpected unknown type check ID: ${id}`);
    }
    return this.hostBindingSources.get(id).mapping;
  }
  toTemplateParseSourceSpan(id, span) {
    if (!this.templateSources.has(id)) {
      return null;
    }
    const templateSource = this.templateSources.get(id);
    return templateSource.toParseSourceSpan(span.start, span.end);
  }
  toHostParseSourceSpan(id, span) {
    if (!this.hostBindingSources.has(id)) {
      return null;
    }
    const source = this.hostBindingSources.get(id);
    return source.toParseSourceSpan(span.start, span.end);
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/checker.js
var TypeCheckableDirectiveMetaAdapter = class {
  meta;
  componentScopeReader;
  constructor(meta, componentScopeReader) {
    this.meta = meta;
    this.componentScopeReader = componentScopeReader;
  }
  getSymbolReference() {
    return {
      filePath: this.meta.ref.node.getSourceFile().fileName,
      position: this.meta.ref.node.name.getStart(),
      name: this.meta.ref.node.name.text,
      moduleSpecifier: this.meta.ref.bestGuessOwningModule?.specifier
    };
  }
  getNgModule() {
    if (ts36.isClassDeclaration(this.meta.ref.node)) {
      const scope = this.componentScopeReader.getScopeForComponent(this.meta.ref.node);
      if (scope === null || scope.kind !== ComponentScopeKind.NgModule) {
        return null;
      }
      return scope.ngModule;
    }
    return null;
  }
  getReferenceTargetNode() {
    return ts36.isClassDeclaration(this.meta.ref.node) ? this.meta.ref.node : null;
  }
  get selector() {
    return this.meta.selector;
  }
  get isComponent() {
    return this.meta.isComponent;
  }
  get inputs() {
    return this.meta.inputs;
  }
  get outputs() {
    return this.meta.outputs;
  }
  get isStructural() {
    return this.meta.isStructural;
  }
  get hostDirectives() {
    return this.meta.hostDirectives;
  }
  get matchSource() {
    return this.meta.matchSource;
  }
};
var BoundTargetAdapter = class {
  delegate;
  componentScopeReader;
  constructor(delegate, componentScopeReader) {
    this.delegate = delegate;
    this.componentScopeReader = componentScopeReader;
  }
  getDirectivesOfNode(node) {
    const dirs = this.delegate.getDirectivesOfNode(node);
    return dirs ? dirs.map((d) => new TypeCheckableDirectiveMetaAdapter(d, this.componentScopeReader)) : null;
  }
  getReferenceTarget(ref) {
    const target = this.delegate.getReferenceTarget(ref);
    if (target === null)
      return null;
    if ("directive" in target) {
      return {
        directive: new TypeCheckableDirectiveMetaAdapter(target.directive, this.componentScopeReader),
        node: target.node
      };
    }
    return target;
  }
  getConsumerOfBinding(binding) {
    const consumer = this.delegate.getConsumerOfBinding(binding);
    if (consumer === null)
      return null;
    if (typeof consumer === "object" && "ref" in consumer) {
      return new TypeCheckableDirectiveMetaAdapter(consumer, this.componentScopeReader);
    }
    return consumer;
  }
  getExpressionTarget(expr) {
    return this.delegate.getExpressionTarget(expr);
  }
};
function getTcbLocationForSymbol(symbol) {
  if ("tcbLocation" in symbol && symbol.tcbLocation !== void 0) {
    return symbol.tcbLocation;
  }
  if (!("kind" in symbol)) {
    return null;
  }
  switch (symbol.kind) {
    case SymbolKind.Reference:
      return symbol.targetLocation;
    case SymbolKind.Variable:
    case SymbolKind.LetDeclaration:
      return symbol.initializerLocation;
    default:
      return null;
  }
}
var REGISTRY = new DomElementSchemaRegistry();
var TemplateTypeCheckerImpl = class {
  originalProgram;
  programDriver;
  typeCheckAdapter;
  config;
  refEmitter;
  reflector;
  compilerHost;
  priorBuild;
  metaReader;
  localMetaReader;
  ngModuleIndex;
  componentScopeReader;
  typeCheckScopeRegistry;
  perf;
  state = /* @__PURE__ */ new Map();
  /**
   * Stores the `CompletionEngine` which powers autocompletion for each component class.
   *
   * Must be invalidated whenever the component's template or the `ts.Program` changes. Invalidation
   * on template changes is performed within this `TemplateTypeCheckerImpl` instance. When the
   * `ts.Program` changes, the `TemplateTypeCheckerImpl` as a whole is destroyed and replaced.
   */
  completionCache = /* @__PURE__ */ new Map();
  /**
   * Stores the `SymbolBuilder` which creates symbols for each component class.
   *
   * Must be invalidated whenever the component's template or the `ts.Program` changes. Invalidation
   * on template changes is performed within this `TemplateTypeCheckerImpl` instance. When the
   * `ts.Program` changes, the `TemplateTypeCheckerImpl` as a whole is destroyed and replaced.
   */
  symbolBuilderCache = /* @__PURE__ */ new Map();
  /**
   * Stores directives and pipes that are in scope for each component.
   *
   * Unlike other caches, the scope of a component is not affected by its template. It will be
   * destroyed when the `ts.Program` changes and the `TemplateTypeCheckerImpl` as a whole is
   * destroyed and replaced.
   */
  scopeCache = /* @__PURE__ */ new Map();
  /**
   * Stores potential element tags for each component (a union of DOM tags as well as directive
   * tags).
   *
   * Unlike other caches, the scope of a component is not affected by its template. It will be
   * destroyed when the `ts.Program` changes and the `TemplateTypeCheckerImpl` as a whole is
   * destroyed and replaced.
   */
  elementTagCache = /* @__PURE__ */ new Map();
  generatedRangeCache = /* @__PURE__ */ new WeakMap();
  isComplete = false;
  priorResultsAdopted = false;
  constructor(originalProgram, programDriver, typeCheckAdapter, config, refEmitter, reflector, compilerHost, priorBuild, metaReader, localMetaReader, ngModuleIndex, componentScopeReader, typeCheckScopeRegistry, perf) {
    this.originalProgram = originalProgram;
    this.programDriver = programDriver;
    this.typeCheckAdapter = typeCheckAdapter;
    this.config = config;
    this.refEmitter = refEmitter;
    this.reflector = reflector;
    this.compilerHost = compilerHost;
    this.priorBuild = priorBuild;
    this.metaReader = metaReader;
    this.localMetaReader = localMetaReader;
    this.ngModuleIndex = ngModuleIndex;
    this.componentScopeReader = componentScopeReader;
    this.typeCheckScopeRegistry = typeCheckScopeRegistry;
    this.perf = perf;
  }
  getTypeOfSymbol(symbol) {
    const location = "tcbTypeLocation" in symbol && symbol.tcbTypeLocation !== void 0 ? symbol.tcbTypeLocation : "kind" in symbol && (symbol.kind === SymbolKind.Variable || symbol.kind === SymbolKind.LetDeclaration) ? symbol.localVarLocation : getTcbLocationForSymbol(symbol);
    if (!location) {
      return null;
    }
    const sf = this.programDriver.getProgram().getSourceFile(location.tcbPath);
    if (!sf) {
      return null;
    }
    let node = getTokenAtPosition(sf, location.positionInFile);
    let bestMatch = node;
    if (location.endInFile !== void 0) {
      while (node && node.getEnd() <= location.endInFile) {
        if (node.getStart() >= location.positionInFile) {
          bestMatch = node;
        }
        node = node.parent;
      }
    }
    node = bestMatch;
    return this.programDriver.getProgram().getTypeChecker().getTypeAtLocation(node);
  }
  getTsSymbolOfSymbol(symbol) {
    const location = getTcbLocationForSymbol(symbol);
    if (!location) {
      return null;
    }
    const sf = this.programDriver.getProgram().getSourceFile(location.tcbPath);
    if (!sf) {
      return null;
    }
    let node = getTokenAtPosition(sf, location.positionInFile);
    let bestMatch = node;
    if (location.endInFile !== void 0) {
      while (node && node.getEnd() <= location.endInFile) {
        if (node.getStart() >= location.positionInFile) {
          bestMatch = node;
        }
        if (node.getEnd() === location.endInFile && node.getStart() === location.positionInFile) {
          bestMatch = node;
          break;
        }
        node = node.parent;
      }
    }
    node = bestMatch;
    const typeChecker = this.programDriver.getProgram().getTypeChecker();
    if ("kind" in symbol && symbol.kind === SymbolKind.Directive) {
      const tsSymbol2 = this.getTsSymbolOfReference(symbol.ref, typeChecker);
      if (tsSymbol2)
        return tsSymbol2;
    }
    if ("kind" in symbol && symbol.kind === SymbolKind.Reference) {
      const tsSymbol2 = this.getTsSymbolOfReference(symbol.target, typeChecker);
      if (tsSymbol2)
        return tsSymbol2;
      if (ts36.isCallExpression(node)) {
        return null;
      }
    }
    if ("isPipeClassSymbol" in symbol && symbol.isPipeClassSymbol) {
      const type = typeChecker.getTypeAtLocation(node);
      if (type && type.getSymbol())
        return type.getSymbol() || null;
    }
    let tsSymbol;
    if (ts36.isPropertyAccessExpression(node)) {
      tsSymbol = typeChecker.getSymbolAtLocation(node.name);
    } else if (ts36.isCallExpression(node)) {
      tsSymbol = typeChecker.getSymbolAtLocation(node.expression);
    } else if (ts36.isElementAccessExpression(node) && ts36.isStringLiteral(node.argumentExpression)) {
      const type = typeChecker.getTypeAtLocation(node.expression);
      tsSymbol = typeChecker.getPropertyOfType(type, node.argumentExpression.text);
    } else {
      tsSymbol = typeChecker.getSymbolAtLocation(node);
    }
    if (tsSymbol !== void 0 && tsSymbol.name.startsWith("_t")) {
      let type = typeChecker.getTypeAtLocation(node);
      tsSymbol = type.aliasSymbol ?? type.symbol;
    }
    if (tsSymbol === void 0 && ts36.isIdentifier(node) && node.text.startsWith("_t")) {
      let type = typeChecker.getTypeAtLocation(node);
      tsSymbol = type.aliasSymbol ?? type.symbol;
    }
    return tsSymbol ?? typeChecker.getTypeAtLocation(node).symbol ?? null;
  }
  getTsSymbolOfReference(target, typeChecker) {
    if (!target || !("filePath" in target)) {
      return null;
    }
    const sf = this.programDriver.getProgram().getSourceFile(target.filePath);
    if (!sf) {
      return null;
    }
    const visit2 = (node) => {
      if (node.pos <= target.position && target.position < node.end) {
        if (ts36.isClassDeclaration(node)) {
          return node;
        }
        return ts36.forEachChild(node, visit2) ?? null;
      }
      return null;
    };
    const classDecl = ts36.forEachChild(sf, visit2) ?? null;
    if (!classDecl) {
      return null;
    }
    const nameNode = classDecl.name ?? classDecl;
    return typeChecker.getSymbolAtLocation(nameNode) ?? null;
  }
  getTemplate(component, optimizeFor) {
    const { data } = this.getLatestComponentState(component, optimizeFor);
    return data?.template ?? null;
  }
  getHostElement(directive, optimizeFor) {
    const { data } = this.getLatestComponentState(directive, optimizeFor);
    return data?.hostElement ?? null;
  }
  getDirectivesOfNode(component, node) {
    return this.getLatestComponentState(component).data?.boundTarget.getDirectivesOfNode(node) ?? null;
  }
  getForeignComponent(component, element) {
    return this.getLatestComponentState(component).data?.boundTarget.getForeignComponent(element) ?? null;
  }
  getUsedDirectives(component) {
    return this.getLatestComponentState(component).data?.boundTarget.getUsedDirectives() ?? null;
  }
  getUsedPipes(component) {
    return this.getLatestComponentState(component).data?.boundTarget.getUsedPipes() ?? null;
  }
  getLatestComponentState(component, optimizeFor = OptimizeFor.SingleFile) {
    switch (optimizeFor) {
      case OptimizeFor.WholeProgram:
        this.ensureAllShimsForAllFiles();
        break;
      case OptimizeFor.SingleFile:
        this.ensureShimForComponent(component);
        break;
    }
    const sf = component.getSourceFile();
    const sfPath = absoluteFromSourceFile(sf);
    const shimPath = TypeCheckShimGenerator.shimFor(sfPath);
    const fileRecord = this.getFileData(sfPath);
    if (!fileRecord.shimData.has(shimPath)) {
      return { data: null, tcb: null, tcbPath: shimPath, tcbIsShim: true };
    }
    const id = fileRecord.sourceManager.getTypeCheckId(component);
    const shimRecord = fileRecord.shimData.get(shimPath);
    const program = this.programDriver.getProgram();
    const shimSf = getSourceFileOrNull(program, shimPath);
    if (shimSf === null || !fileRecord.shimData.has(shimPath)) {
      throw new Error(`Error: no shim file in program: ${shimPath}`);
    }
    let tcb = findTypeCheckBlock(
      shimSf,
      id,
      /*isDiagnosticsRequest*/
      false
    );
    let tcbPath = shimPath;
    if (tcb === null) {
      const inlineSf = getSourceFileOrError(program, sfPath);
      tcb = findTypeCheckBlock(
        inlineSf,
        id,
        /*isDiagnosticsRequest*/
        false
      );
      if (tcb !== null) {
        tcbPath = sfPath;
      }
    }
    let data = null;
    if (shimRecord.data.has(id)) {
      data = shimRecord.data.get(id);
    }
    return { data, tcb, tcbPath, tcbIsShim: tcbPath === shimPath };
  }
  isTrackedTypeCheckFile(filePath) {
    return this.getFileAndShimRecordsForPath(filePath) !== null;
  }
  getFileRecordForTcbLocation({ tcbPath, isShimFile }) {
    if (!isShimFile) {
      if (this.state.has(tcbPath)) {
        return this.state.get(tcbPath);
      } else {
        return null;
      }
    }
    const records = this.getFileAndShimRecordsForPath(tcbPath);
    if (records !== null) {
      return records.fileRecord;
    } else {
      return null;
    }
  }
  getFileAndShimRecordsForPath(shimPath) {
    for (const fileRecord of this.state.values()) {
      if (fileRecord.shimData.has(shimPath)) {
        return { fileRecord, shimRecord: fileRecord.shimData.get(shimPath) };
      }
    }
    return null;
  }
  getSourceMappingAtTcbLocation(tcbLocation) {
    const fileRecord = this.getFileRecordForTcbLocation(tcbLocation);
    if (fileRecord === null) {
      return null;
    }
    const shimSf = this.programDriver.getProgram().getSourceFile(tcbLocation.tcbPath);
    if (shimSf === void 0) {
      return null;
    }
    return getSourceMapping(
      shimSf,
      tcbLocation.positionInFile,
      fileRecord.sourceManager,
      /*isDiagnosticsRequest*/
      false
    );
  }
  generateAllTypeCheckBlocks() {
    this.ensureAllShimsForAllFiles();
  }
  getGeneratedCodeRanges(sf) {
    if (this.generatedRangeCache.has(sf)) {
      return this.generatedRangeCache.get(sf);
    }
    const ranges = [];
    const visit2 = (node) => {
      if (ts36.isInterfaceDeclaration(node)) {
        return;
      }
      if (ts36.isFunctionDeclaration(node)) {
        if (node.name !== void 0) {
          const name = node.name.text;
          if (name.startsWith(TCB_FUNCTION_PREFIX)) {
            ranges.push({ pos: node.getStart(), end: node.getEnd() });
            return;
          }
        }
      }
      ts36.forEachChild(node, visit2);
    };
    ts36.forEachChild(sf, visit2);
    this.generatedRangeCache.set(sf, ranges);
    return ranges;
  }
  filterShimDiagnostics(shimSf, semanticDiagnostics) {
    if (this.programDriver.inliningMode !== InliningMode.CopySourceToTcb) {
      return semanticDiagnostics;
    }
    const ranges = this.getGeneratedCodeRanges(shimSf);
    return semanticDiagnostics.filter((diag) => {
      if (diag.start === void 0)
        return true;
      return ranges.some((range) => diag.start >= range.pos && diag.start < range.end);
    });
  }
  /**
   * Retrieve type-checking and template parse diagnostics from the given `ts.SourceFile` using the
   * most recent type-checking program.
   */
  getDiagnosticsForFile(sf, optimizeFor) {
    switch (optimizeFor) {
      case OptimizeFor.WholeProgram:
        this.ensureAllShimsForAllFiles();
        break;
      case OptimizeFor.SingleFile:
        this.ensureAllShimsForOneFile(sf);
        break;
    }
    return this.perf.inPhase(PerfPhase.TtcDiagnostics, () => {
      const sfPath = absoluteFromSourceFile(sf);
      const fileRecord = this.state.get(sfPath);
      const typeCheckProgram = this.programDriver.getProgram();
      const diagnostics = [];
      if (fileRecord.hasInlines) {
        const inlineSf = getSourceFileOrError(typeCheckProgram, sfPath);
        diagnostics.push(...typeCheckProgram.getSemanticDiagnostics(inlineSf).map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
      }
      for (const [shimPath, shimRecord] of fileRecord.shimData) {
        const shimSf = getSourceFileOrError(typeCheckProgram, shimPath);
        const semanticDiagnostics = typeCheckProgram.getSemanticDiagnostics(shimSf);
        const filteredDiagnostics = this.filterShimDiagnostics(shimSf, semanticDiagnostics);
        diagnostics.push(...filteredDiagnostics.map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
        diagnostics.push(...shimRecord.genesisDiagnostics);
        for (const templateData of shimRecord.data.values()) {
          diagnostics.push(...templateData.templateParsingDiagnostics);
        }
      }
      return diagnostics.filter((diag) => diag !== null);
    });
  }
  getSuggestionDiagnosticsForFile(sf, tsLs, optimizeFor) {
    switch (optimizeFor) {
      case OptimizeFor.WholeProgram:
        this.ensureAllShimsForAllFiles();
        break;
      case OptimizeFor.SingleFile:
        this.ensureAllShimsForOneFile(sf);
        break;
    }
    return this.perf.inPhase(PerfPhase.TtcSuggestionDiagnostics, () => {
      const sfPath = absoluteFromSourceFile(sf);
      const fileRecord = this.state.get(sfPath);
      const diagnostics = [];
      const program = this.programDriver.getProgram();
      if (fileRecord.hasInlines) {
        diagnostics.push(...getDeprecatedSuggestionDiagnostics(tsLs, program, sfPath, fileRecord, this));
      }
      for (const [shimPath] of fileRecord.shimData) {
        diagnostics.push(...getDeprecatedSuggestionDiagnostics(tsLs, program, shimPath, fileRecord, this));
      }
      return diagnostics.filter((diag) => diag !== null);
    });
  }
  getDiagnosticsForComponent(component) {
    this.ensureShimForComponent(component);
    return this.perf.inPhase(PerfPhase.TtcDiagnostics, () => {
      const sf = component.getSourceFile();
      const sfPath = absoluteFromSourceFile(sf);
      const shimPath = TypeCheckShimGenerator.shimFor(sfPath);
      const fileRecord = this.getFileData(sfPath);
      if (!fileRecord.shimData.has(shimPath)) {
        return [];
      }
      const id = fileRecord.sourceManager.getTypeCheckId(component);
      const shimRecord = fileRecord.shimData.get(shimPath);
      const typeCheckProgram = this.programDriver.getProgram();
      const diagnostics = [];
      if (shimRecord.hasInlines) {
        const inlineSf = getSourceFileOrError(typeCheckProgram, sfPath);
        diagnostics.push(...typeCheckProgram.getSemanticDiagnostics(inlineSf).map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
      }
      const shimSf = getSourceFileOrError(typeCheckProgram, shimPath);
      const semanticDiagnostics = typeCheckProgram.getSemanticDiagnostics(shimSf);
      const filteredDiagnostics = this.filterShimDiagnostics(shimSf, semanticDiagnostics);
      diagnostics.push(...filteredDiagnostics.map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
      diagnostics.push(...shimRecord.genesisDiagnostics);
      for (const templateData of shimRecord.data.values()) {
        diagnostics.push(...templateData.templateParsingDiagnostics);
      }
      return diagnostics.filter((diag) => diag !== null && diag.typeCheckId === id);
    });
  }
  getSuggestionDiagnosticsForComponent(component, tsLs) {
    this.ensureShimForComponent(component);
    return this.perf.inPhase(PerfPhase.TtcSuggestionDiagnostics, () => {
      const sf = component.getSourceFile();
      const sfPath = absoluteFromSourceFile(sf);
      const shimPath = TypeCheckShimGenerator.shimFor(sfPath);
      const fileRecord = this.getFileData(sfPath);
      if (!fileRecord.shimData.has(shimPath)) {
        return [];
      }
      const templateId = fileRecord.sourceManager.getTypeCheckId(component);
      const shimRecord = fileRecord.shimData.get(shimPath);
      const diagnostics = [];
      const program = this.programDriver.getProgram();
      if (shimRecord.hasInlines) {
        diagnostics.push(...getDeprecatedSuggestionDiagnostics(tsLs, program, sfPath, fileRecord, this));
      }
      diagnostics.push(...getDeprecatedSuggestionDiagnostics(tsLs, program, shimPath, fileRecord, this));
      return diagnostics.filter((diag) => diag !== null && diag.typeCheckId === templateId);
    });
  }
  getTypeCheckBlock(component) {
    return this.getLatestComponentState(component).tcb;
  }
  getGlobalCompletions(context, component, node) {
    const engine = this.getOrCreateCompletionEngine(component);
    if (engine === null) {
      return null;
    }
    return this.perf.inPhase(PerfPhase.TtcAutocompletion, () => engine.getGlobalCompletions(context, node));
  }
  getExpressionCompletionLocation(ast, component) {
    const engine = this.getOrCreateCompletionEngine(component);
    if (engine === null) {
      return null;
    }
    return this.perf.inPhase(PerfPhase.TtcAutocompletion, () => engine.getExpressionCompletionLocation(ast));
  }
  getLiteralCompletionLocation(node, component) {
    const engine = this.getOrCreateCompletionEngine(component);
    if (engine === null) {
      return null;
    }
    return this.perf.inPhase(PerfPhase.TtcAutocompletion, () => engine.getLiteralCompletionLocation(node));
  }
  invalidateClass(clazz) {
    this.completionCache.delete(clazz);
    this.symbolBuilderCache.delete(clazz);
    this.scopeCache.delete(clazz);
    this.elementTagCache.delete(clazz);
    const sf = clazz.getSourceFile();
    const sfPath = absoluteFromSourceFile(sf);
    const shimPath = TypeCheckShimGenerator.shimFor(sfPath);
    const fileData = this.getFileData(sfPath);
    const id = fileData.sourceManager.getTypeCheckId(clazz);
    fileData.shimData.delete(shimPath);
    fileData.isComplete = false;
    this.isComplete = false;
  }
  getExpressionTarget(expression, clazz) {
    return this.getLatestComponentState(clazz).data?.boundTarget.getExpressionTarget(expression) ?? null;
  }
  makeTemplateDiagnostic(clazz, sourceSpan, category, errorCode, message, relatedInformation) {
    const sfPath = absoluteFromSourceFile(clazz.getSourceFile());
    const fileRecord = this.state.get(sfPath);
    const id = fileRecord.sourceManager.getTypeCheckId(clazz);
    const mapping = fileRecord.sourceManager.getTemplateSourceMapping(id);
    return {
      ...makeTemplateDiagnostic(id, mapping, sourceSpan, category, ngErrorCode(errorCode), message, relatedInformation),
      __ngCode: errorCode
    };
  }
  getOrCreateCompletionEngine(component) {
    if (this.completionCache.has(component)) {
      return this.completionCache.get(component);
    }
    const { tcb, data, tcbPath, tcbIsShim } = this.getLatestComponentState(component);
    if (tcb === null || data === null) {
      return null;
    }
    const engine = new CompletionEngine(tcb, data, tcbPath, tcbIsShim);
    this.completionCache.set(component, engine);
    return engine;
  }
  maybeAdoptPriorResults() {
    if (this.priorResultsAdopted) {
      return;
    }
    for (const sf of this.originalProgram.getSourceFiles()) {
      if (sf.isDeclarationFile || isShim(sf)) {
        continue;
      }
      const sfPath = absoluteFromSourceFile(sf);
      if (this.state.has(sfPath)) {
        const existingResults = this.state.get(sfPath);
        if (existingResults.isComplete) {
          continue;
        }
      }
      const previousResults = this.priorBuild.priorTypeCheckingResultsFor(sf);
      if (previousResults === null || !previousResults.isComplete) {
        continue;
      }
      this.perf.eventCount(PerfEvent.ReuseTypeCheckFile);
      this.state.set(sfPath, previousResults);
    }
    this.priorResultsAdopted = true;
  }
  ensureAllShimsForAllFiles() {
    if (this.isComplete) {
      return;
    }
    this.maybeAdoptPriorResults();
    this.perf.inPhase(PerfPhase.TcbGeneration, () => {
      const host = new WholeProgramTypeCheckingHost(this);
      const ctx = this.newContext(host);
      for (const sf of this.originalProgram.getSourceFiles()) {
        if (sf.isDeclarationFile || isShim(sf)) {
          continue;
        }
        const sfPath = absoluteFromSourceFile(sf);
        const fileData = this.getFileData(sfPath);
        if (fileData.isComplete) {
          continue;
        }
        this.typeCheckAdapter.typeCheck(sf, ctx);
        fileData.isComplete = true;
      }
      this.updateFromContext(ctx);
      this.isComplete = true;
    });
  }
  ensureAllShimsForOneFile(sf) {
    this.maybeAdoptPriorResults();
    this.perf.inPhase(PerfPhase.TcbGeneration, () => {
      const sfPath = absoluteFromSourceFile(sf);
      const fileData = this.getFileData(sfPath);
      if (fileData.isComplete) {
        return;
      }
      const host = new SingleFileTypeCheckingHost(sfPath, fileData, this);
      const ctx = this.newContext(host);
      this.typeCheckAdapter.typeCheck(sf, ctx);
      fileData.isComplete = true;
      this.updateFromContext(ctx);
    });
  }
  ensureShimForComponent(component) {
    this.maybeAdoptPriorResults();
    const sf = component.getSourceFile();
    const sfPath = absoluteFromSourceFile(sf);
    const shimPath = TypeCheckShimGenerator.shimFor(sfPath);
    const fileData = this.getFileData(sfPath);
    if (fileData.shimData.has(shimPath)) {
      return;
    }
    const host = new SingleShimTypeCheckingHost(sfPath, fileData, this, shimPath);
    const ctx = this.newContext(host);
    this.typeCheckAdapter.typeCheck(sf, ctx);
    this.updateFromContext(ctx);
  }
  newContext(host) {
    return new TypeCheckContextImpl(this.config, this.compilerHost, this.refEmitter, this.reflector, host, this.programDriver.inliningMode, this.perf);
  }
  /**
   * Remove any shim data that depends on inline operations applied to the type-checking program.
   *
   * This can be useful if new inlines need to be applied, and it's not possible to guarantee that
   * they won't overwrite or corrupt existing inlines that are used by such shims.
   */
  clearAllShimDataUsingInlines() {
    for (const fileData of this.state.values()) {
      if (!fileData.hasInlines) {
        continue;
      }
      for (const [shimFile, shimData] of fileData.shimData.entries()) {
        if (shimData.hasInlines) {
          fileData.shimData.delete(shimFile);
        }
      }
      fileData.hasInlines = false;
      fileData.isComplete = false;
      this.isComplete = false;
    }
  }
  updateFromContext(ctx) {
    const updates = ctx.finalize();
    return this.perf.inPhase(PerfPhase.TcbUpdateProgram, () => {
      if (updates.size > 0) {
        this.perf.eventCount(PerfEvent.UpdateTypeCheckProgram);
      }
      this.programDriver.updateFiles(updates, UpdateMode.Incremental);
      this.priorBuild.recordSuccessfulTypeCheck(this.state);
      this.perf.memory(PerfCheckpoint.TtcUpdateProgram);
    });
  }
  getFileData(path) {
    if (!this.state.has(path)) {
      this.state.set(path, {
        hasInlines: false,
        sourceManager: new DirectiveSourceManager(),
        isComplete: false,
        shimData: /* @__PURE__ */ new Map()
      });
    }
    return this.state.get(path);
  }
  getSymbolOfNode(node, component) {
    const builder = this.getOrCreateSymbolBuilder(component);
    if (builder === null) {
      return null;
    }
    return this.perf.inPhase(PerfPhase.TtcSymbol, () => builder.getSymbol(node));
  }
  getOrCreateSymbolBuilder(component) {
    if (this.symbolBuilderCache.has(component)) {
      return this.symbolBuilderCache.get(component);
    }
    const { tcb, data, tcbPath, tcbIsShim } = this.getLatestComponentState(component);
    if (tcb === null || data === null) {
      return null;
    }
    const builder = new SymbolBuilder(tcbPath, tcbIsShim, tcb, new BoundTargetAdapter(data.boundTarget, this.componentScopeReader), this.config);
    this.symbolBuilderCache.set(component, builder);
    return builder;
  }
  getGlobalTsContext(component) {
    const engine = this.getOrCreateCompletionEngine(component);
    if (engine === null) {
      return null;
    }
    return engine.getGlobalTsContext();
  }
  getRefKey(ref) {
    if ("filePath" in ref) {
      return `${ref.filePath}#${ref.position}`;
    } else {
      return `${ref.node.getSourceFile().fileName}#${ref.node.name.getStart()}`;
    }
  }
  getPotentialTemplateDirectives(component, tsLs, options) {
    const scope = this.getComponentScope(component);
    if (scope?.kind === ComponentScopeKind.Selectorless) {
      return [];
    }
    const resultingDirectives = /* @__PURE__ */ new Map();
    const directivesInScope = this.getTemplateDirectiveInScope(component);
    const directiveInGlobal = this.getElementsInGlobal(component, tsLs, options);
    for (const directive of [...directivesInScope, ...directiveInGlobal]) {
      const key = this.getRefKey(directive.ref);
      if (resultingDirectives.has(key)) {
        continue;
      }
      resultingDirectives.set(key, directive);
    }
    return Array.from(resultingDirectives.values());
  }
  getPotentialPipes(component) {
    const scope = this.getComponentScope(component);
    if (scope?.kind === ComponentScopeKind.Selectorless) {
      return [];
    }
    const typeChecker = this.programDriver.getProgram().getTypeChecker();
    const resultingPipes = /* @__PURE__ */ new Map();
    if (scope !== null) {
      const inScopePipes = this.getScopeData(component, scope)?.pipes ?? [];
      for (const p of inScopePipes) {
        resultingPipes.set(this.getRefKey(p.ref), p);
      }
    }
    for (const pipeClass of this.localMetaReader.getKnown(MetaKind.Pipe)) {
      const pipeMeta = this.metaReader.getPipeMetadata(new Reference(pipeClass));
      if (pipeMeta === null)
        continue;
      if (resultingPipes.has(this.getRefKey(new Reference(pipeClass))))
        continue;
      const withScope = this.scopeDataOfPipeMeta(typeChecker, pipeMeta);
      if (withScope === null)
        continue;
      resultingPipes.set(this.getRefKey(withScope.ref), { ...withScope, isInScope: false });
    }
    return Array.from(resultingPipes.values());
  }
  getDirectiveMetadata(dir) {
    if (!isNamedClassDeclaration(dir)) {
      return null;
    }
    return this.typeCheckScopeRegistry.getTypeCheckDirectiveMetadata(new Reference(dir));
  }
  getNgModuleMetadata(module) {
    if (!isNamedClassDeclaration(module)) {
      return null;
    }
    return this.metaReader.getNgModuleMetadata(new Reference(module));
  }
  getPipeMetadata(pipe) {
    if (!isNamedClassDeclaration(pipe)) {
      return null;
    }
    return this.metaReader.getPipeMetadata(new Reference(pipe));
  }
  getTemplateDirectiveInScope(component) {
    const resultingDirectives = /* @__PURE__ */ new Map();
    const scope = this.getComponentScope(component);
    if (scope?.kind === ComponentScopeKind.Selectorless) {
      return [];
    }
    if (scope !== null) {
      const inScopeDirectives = this.getScopeData(component, scope)?.directives ?? [];
      for (const d of inScopeDirectives) {
        resultingDirectives.set(this.getRefKey(d.ref), d);
      }
    }
    const typeChecker = this.programDriver.getProgram().getTypeChecker();
    const currentComponentFileName = component.getSourceFile().fileName;
    for (const directiveClass of this.localMetaReader.getKnown(MetaKind.Directive)) {
      if (directiveClass.getSourceFile().fileName !== currentComponentFileName) {
        continue;
      }
      const ref = new Reference(directiveClass);
      const directiveMeta = this.metaReader.getDirectiveMetadata(ref);
      if (directiveMeta === null)
        continue;
      const key = this.getRefKey(ref);
      if (resultingDirectives.has(key))
        continue;
      const withScope = this.scopeDataOfDirectiveMeta(typeChecker, directiveMeta);
      if (withScope === null)
        continue;
      resultingDirectives.set(key, { ...withScope, isInScope: false });
    }
    return Array.from(resultingDirectives.values());
  }
  getDirectiveScopeData(component, isInScope, tsCompletionEntryInfo) {
    const typeChecker = this.programDriver.getProgram().getTypeChecker();
    if (!isNamedClassDeclaration(component)) {
      return null;
    }
    const directiveMeta = this.metaReader.getDirectiveMetadata(new Reference(component));
    if (directiveMeta === null) {
      return null;
    }
    const withScope = this.scopeDataOfDirectiveMeta(typeChecker, directiveMeta);
    if (withScope === null) {
      return null;
    }
    return {
      ...withScope,
      isInScope,
      /**
       * The Angular LS only supports displaying one directive at a time when
       * providing the completion item, even if it's exported by multiple modules.
       */
      tsCompletionEntryInfos: tsCompletionEntryInfo !== null ? [tsCompletionEntryInfo] : null
    };
  }
  getElementsInFileScope(component) {
    const tagMap = /* @__PURE__ */ new Map();
    const potentialDirectives = this.getTemplateDirectiveInScope(component);
    for (const directive of potentialDirectives) {
      if (directive.selector === null) {
        continue;
      }
      for (const selector of CssSelector2.parse(directive.selector)) {
        if (selector.element === null || tagMap.has(selector.element)) {
          continue;
        }
        tagMap.set(selector.element, directive);
      }
    }
    return tagMap;
  }
  getElementsInGlobal(component, tsLs, options) {
    const tsContext = this.getGlobalTsContext(component);
    if (tsContext === null) {
      return [];
    }
    if (!options.includeExternalModule) {
      return [];
    }
    const entries = tsLs.getCompletionsAtPosition(tsContext.tcbPath, tsContext.positionInFile, {
      includeSymbol: true,
      includeCompletionsForModuleExports: true
    })?.entries;
    const typeChecker = this.programDriver.getProgram().getTypeChecker();
    const resultingDirectives = /* @__PURE__ */ new Map();
    const currentComponentFileName = component.getSourceFile().fileName;
    for (const { symbol, data } of entries ?? []) {
      const symbolFileName = symbol?.declarations?.[0]?.getSourceFile().fileName;
      const symbolName = symbol?.name;
      if (symbolFileName === void 0 || symbolName === void 0) {
        continue;
      }
      if (symbolFileName === currentComponentFileName) {
        continue;
      }
      const decl = getClassDeclFromSymbol(symbol, typeChecker);
      if (decl === null) {
        continue;
      }
      const directiveDecls = [];
      const ref = new Reference(decl);
      const directiveMeta = this.metaReader.getDirectiveMetadata(ref);
      if (directiveMeta?.isStandalone) {
        directiveDecls.push({
          meta: directiveMeta,
          ref
        });
      } else {
        const directiveDeclsForNgModule = this.getDirectiveDeclsForNgModule(ref);
        directiveDecls.push(...directiveDeclsForNgModule);
      }
      for (const directiveDecl of directiveDecls) {
        const cachedCompletionEntryInfos = resultingDirectives.get(directiveDecl.ref.node)?.tsCompletionEntryInfos ?? [];
        appendOrReplaceTsEntryInfo(cachedCompletionEntryInfos, {
          tsCompletionEntryData: data,
          tsCompletionEntrySymbolFileName: symbolFileName,
          tsCompletionEntrySymbolName: symbolName
        }, this.programDriver.getProgram());
        if (resultingDirectives.has(directiveDecl.ref.node)) {
          const directiveInfo = resultingDirectives.get(directiveDecl.ref.node);
          resultingDirectives.set(directiveDecl.ref.node, {
            ...directiveInfo,
            tsCompletionEntryInfos: cachedCompletionEntryInfos
          });
          continue;
        }
        const withScope = this.scopeDataOfDirectiveMeta(typeChecker, directiveDecl.meta);
        if (withScope === null) {
          continue;
        }
        resultingDirectives.set(directiveDecl.ref.node, {
          ...withScope,
          isInScope: false,
          tsCompletionEntryInfos: cachedCompletionEntryInfos
        });
      }
    }
    return Array.from(resultingDirectives.values());
  }
  /**
   * If the NgModule exports a new module, we need to recursively get its directives.
   */
  getDirectiveDeclsForNgModule(ref) {
    const ngModuleMeta = this.metaReader.getNgModuleMetadata(ref);
    if (ngModuleMeta === null) {
      return [];
    }
    const directiveDecls = [];
    for (const moduleExports of ngModuleMeta.exports) {
      const directiveMeta = this.metaReader.getDirectiveMetadata(moduleExports);
      if (directiveMeta !== null) {
        directiveDecls.push({
          meta: directiveMeta,
          ref: moduleExports
        });
      } else {
        const ngModuleMeta2 = this.metaReader.getNgModuleMetadata(moduleExports);
        if (ngModuleMeta2 === null) {
          continue;
        }
        const nestedDirectiveDecls = this.getDirectiveDeclsForNgModule(moduleExports);
        directiveDecls.push(...nestedDirectiveDecls);
      }
    }
    return directiveDecls;
  }
  getPotentialElementTags(component, tsLs, options) {
    if (this.elementTagCache.has(component)) {
      return this.elementTagCache.get(component);
    }
    const tagMap = /* @__PURE__ */ new Map();
    for (const tag of REGISTRY.allKnownElementNames()) {
      tagMap.set(tag, null);
    }
    const potentialDirectives = this.getPotentialTemplateDirectives(component, tsLs, options);
    for (const directive of potentialDirectives) {
      if (directive.selector === null) {
        continue;
      }
      for (const selector of CssSelector2.parse(directive.selector)) {
        if (selector.element === null || tagMap.has(selector.element)) {
          continue;
        }
        tagMap.set(selector.element, directive);
      }
    }
    this.elementTagCache.set(component, tagMap);
    return tagMap;
  }
  getPotentialDomBindings(tagName) {
    const attributes = REGISTRY.allKnownAttributesOfElement(tagName);
    return attributes.map((attribute) => ({
      attribute,
      property: REGISTRY.getMappedPropName(attribute)
    }));
  }
  getPotentialDomEvents(tagName) {
    return REGISTRY.allKnownEventsOfElement(tagName);
  }
  getPrimaryAngularDecorator(target) {
    this.ensureAllShimsForOneFile(target.getSourceFile());
    if (!isNamedClassDeclaration(target)) {
      return null;
    }
    const ref = new Reference(target);
    const dirMeta = this.metaReader.getDirectiveMetadata(ref);
    if (dirMeta !== null) {
      return dirMeta.decorator;
    }
    const pipeMeta = this.metaReader.getPipeMetadata(ref);
    if (pipeMeta !== null) {
      return pipeMeta.decorator;
    }
    const ngModuleMeta = this.metaReader.getNgModuleMetadata(ref);
    if (ngModuleMeta !== null) {
      return ngModuleMeta.decorator;
    }
    return null;
  }
  getOwningNgModule(component) {
    if (!isNamedClassDeclaration(component)) {
      return null;
    }
    const dirMeta = this.metaReader.getDirectiveMetadata(new Reference(component));
    if (dirMeta !== null && dirMeta.isStandalone) {
      return null;
    }
    const scope = this.componentScopeReader.getScopeForComponent(component);
    if (scope === null || scope.kind !== ComponentScopeKind.NgModule || !isNamedClassDeclaration(scope.ngModule)) {
      return null;
    }
    return scope.ngModule;
  }
  emit(kind, refTo, inContext) {
    const emittedRef = this.refEmitter.emit(refTo, inContext.getSourceFile());
    if (emittedRef.kind === ReferenceEmitKind.Failed) {
      return null;
    }
    const emitted = emittedRef.expression;
    if (emitted instanceof WrappedNodeExpr9) {
      if (refTo.node === inContext) {
        return null;
      }
      let isForwardReference = false;
      if (emitted.node.getStart() > inContext.getStart()) {
        const declaration = this.programDriver.getProgram().getTypeChecker().getTypeAtLocation(emitted.node).getSymbol()?.declarations?.[0];
        if (declaration && declaration.getSourceFile() === inContext.getSourceFile()) {
          isForwardReference = true;
        }
      }
      return { kind, symbolName: emitted.node.text, isForwardReference };
    } else if (emitted instanceof ExternalExpr7 && emitted.value.moduleName !== null && emitted.value.name !== null) {
      return {
        kind,
        moduleSpecifier: emitted.value.moduleName,
        symbolName: emitted.value.name,
        isForwardReference: false
      };
    }
    return null;
  }
  getPotentialImportsFor(toImport, inContext, importMode, potentialDirectiveModuleSpecifierResolver) {
    const imports = [];
    const meta = this.metaReader.getDirectiveMetadata(toImport) ?? this.metaReader.getPipeMetadata(toImport);
    if (meta === null) {
      return imports;
    }
    let highestImportPriority = -1;
    const collectImports = (emit, moduleSpecifierDetail) => {
      if (emit === null) {
        return;
      }
      imports.push({
        ...emit,
        moduleSpecifier: moduleSpecifierDetail?.moduleSpecifier ?? emit.moduleSpecifier,
        symbolName: moduleSpecifierDetail?.exportName ?? emit.symbolName
      });
      if (moduleSpecifierDetail !== null && highestImportPriority === -1) {
        highestImportPriority = imports.length - 1;
      }
    };
    if (meta.isStandalone || importMode === PotentialImportMode.ForceDirect) {
      const emitted = this.emit(PotentialImportKind.Standalone, toImport, inContext);
      const moduleSpecifierDetail = potentialDirectiveModuleSpecifierResolver?.resolve(toImport, inContext) ?? null;
      collectImports(emitted, moduleSpecifierDetail);
    }
    const exportingNgModules = this.ngModuleIndex.getNgModulesExporting(meta.ref.node);
    if (exportingNgModules !== null) {
      for (const exporter of exportingNgModules) {
        const emittedRef = this.emit(PotentialImportKind.NgModule, exporter, inContext);
        const moduleSpecifierDetail = potentialDirectiveModuleSpecifierResolver?.resolve(exporter, inContext) ?? null;
        collectImports(emittedRef, moduleSpecifierDetail);
      }
    }
    if (highestImportPriority > 0) {
      const highImport = imports.splice(highestImportPriority, 1)[0];
      imports.unshift(highImport);
    }
    return imports;
  }
  getComponentScope(component) {
    if (!isNamedClassDeclaration(component)) {
      throw new Error(`AssertionError: components must have names`);
    }
    return this.componentScopeReader.getScopeForComponent(component);
  }
  getScopeData(component, scope) {
    if (this.scopeCache.has(component)) {
      return this.scopeCache.get(component);
    }
    const dependencies = scope.kind === ComponentScopeKind.NgModule ? scope.compilation.dependencies : scope.dependencies;
    const data = {
      directives: [],
      pipes: [],
      isPoisoned: scope.kind === ComponentScopeKind.NgModule ? scope.compilation.isPoisoned : scope.isPoisoned
    };
    const typeChecker = this.programDriver.getProgram().getTypeChecker();
    for (const dep of dependencies) {
      if (dep.kind === MetaKind.Directive) {
        const dirScope = this.scopeDataOfDirectiveMeta(typeChecker, dep);
        if (dirScope === null)
          continue;
        data.directives.push({ ...dirScope, isInScope: true });
      } else if (dep.kind === MetaKind.Pipe) {
        const pipeScope = this.scopeDataOfPipeMeta(typeChecker, dep);
        if (pipeScope === null)
          continue;
        data.pipes.push({ ...pipeScope, isInScope: true });
      }
    }
    this.scopeCache.set(component, data);
    return data;
  }
  scopeDataOfDirectiveMeta(typeChecker, dep) {
    if (dep.selector === null) {
      return null;
    }
    const tsSymbol = typeChecker.getSymbolAtLocation(dep.ref.node.name);
    if (!isSymbolWithValueDeclaration(tsSymbol)) {
      return null;
    }
    let ngModule = null;
    const moduleScopeOfDir = this.componentScopeReader.getScopeForComponent(dep.ref.node);
    if (moduleScopeOfDir !== null && moduleScopeOfDir.kind === ComponentScopeKind.NgModule) {
      ngModule = moduleScopeOfDir.ngModule;
    }
    return {
      ref: {
        filePath: dep.ref.node.getSourceFile().fileName,
        position: dep.ref.node.name.getStart(),
        name: dep.ref.node.name.text,
        moduleSpecifier: dep.ref.bestGuessOwningModule?.specifier
      },
      isComponent: dep.isComponent,
      isStructural: dep.isStructural,
      selector: dep.selector,
      ngModule,
      tsCompletionEntryInfos: null
    };
  }
  scopeDataOfPipeMeta(typeChecker, dep) {
    if (!dep.ref.node.name) {
      return null;
    }
    return {
      ref: {
        filePath: dep.ref.node.getSourceFile().fileName,
        position: dep.ref.node.name.getStart(),
        name: dep.ref.node.name.text,
        moduleSpecifier: dep.ref.bestGuessOwningModule?.specifier
      },
      name: dep.name,
      tsCompletionEntryInfos: null
    };
  }
};
function convertDiagnostic(diag, sourceResolver) {
  if (!shouldReportDiagnostic(diag)) {
    return null;
  }
  return translateDiagnostic(diag, sourceResolver);
}
var WholeProgramTypeCheckingHost = class {
  impl;
  constructor(impl) {
    this.impl = impl;
  }
  getSourceManager(sfPath) {
    return this.impl.getFileData(sfPath).sourceManager;
  }
  shouldCheckClass(node) {
    const sfPath = absoluteFromSourceFile(node.getSourceFile());
    const shimPath = TypeCheckShimGenerator.shimFor(sfPath);
    const fileData = this.impl.getFileData(sfPath);
    return !fileData.shimData.has(shimPath);
  }
  recordShimData(sfPath, data) {
    const fileData = this.impl.getFileData(sfPath);
    fileData.shimData.set(data.path, data);
    if (data.hasInlines) {
      fileData.hasInlines = true;
    }
  }
  recordComplete(sfPath) {
    this.impl.getFileData(sfPath).isComplete = true;
  }
};
var SingleFileTypeCheckingHost = class {
  sfPath;
  fileData;
  impl;
  seenInlines = false;
  constructor(sfPath, fileData, impl) {
    this.sfPath = sfPath;
    this.fileData = fileData;
    this.impl = impl;
  }
  assertPath(sfPath) {
    if (this.sfPath !== sfPath) {
      throw new Error(`AssertionError: querying TypeCheckingHost outside of assigned file`);
    }
  }
  getSourceManager(sfPath) {
    this.assertPath(sfPath);
    return this.fileData.sourceManager;
  }
  shouldCheckClass(node) {
    if (this.sfPath !== absoluteFromSourceFile(node.getSourceFile())) {
      return false;
    }
    const shimPath = TypeCheckShimGenerator.shimFor(this.sfPath);
    return !this.fileData.shimData.has(shimPath);
  }
  recordShimData(sfPath, data) {
    this.assertPath(sfPath);
    if (data.hasInlines && !this.seenInlines) {
      this.impl.clearAllShimDataUsingInlines();
      this.seenInlines = true;
    }
    this.fileData.shimData.set(data.path, data);
    if (data.hasInlines) {
      this.fileData.hasInlines = true;
    }
  }
  recordComplete(sfPath) {
    this.assertPath(sfPath);
    this.fileData.isComplete = true;
  }
};
var SingleShimTypeCheckingHost = class extends SingleFileTypeCheckingHost {
  shimPath;
  constructor(sfPath, fileData, impl, shimPath) {
    super(sfPath, fileData, impl);
    this.shimPath = shimPath;
  }
  shouldCheckNode(node) {
    if (this.sfPath !== absoluteFromSourceFile(node.getSourceFile())) {
      return false;
    }
    const shimPath = TypeCheckShimGenerator.shimFor(this.sfPath);
    if (shimPath !== this.shimPath) {
      return false;
    }
    return !this.fileData.shimData.has(shimPath);
  }
};
function getClassDeclFromSymbol(symbol, checker) {
  const tsDecl = symbol?.getDeclarations();
  if (tsDecl === void 0) {
    return null;
  }
  let decl = tsDecl.length > 0 ? tsDecl[0] : void 0;
  if (decl === void 0) {
    return null;
  }
  if (ts36.isExportAssignment(decl)) {
    const symbol2 = checker.getTypeAtLocation(decl.expression).getSymbol();
    return getClassDeclFromSymbol(symbol2, checker);
  }
  if (ts36.isExportSpecifier(decl)) {
    const symbol2 = checker.getTypeAtLocation(decl).getSymbol();
    return getClassDeclFromSymbol(symbol2, checker);
  }
  if (isNamedClassDeclaration(decl)) {
    return decl;
  }
  return null;
}
function getDeprecatedSuggestionDiagnostics(tsLs, program, path, fileRecord, templateTypeChecker) {
  const sourceFile = program.getSourceFile(path);
  if (sourceFile === void 0) {
    return [];
  }
  const tsDiags = tsLs.getSuggestionDiagnostics(path).filter(isDeprecatedDiagnostics);
  const commonTemplateDiags = tsDiags.map((diag) => {
    return convertDiagnostic(diag, fileRecord.sourceManager);
  });
  const elementTagDiags = getTheElementTagDeprecatedSuggestionDiagnostics(path, program, fileRecord, tsDiags, templateTypeChecker);
  return [...commonTemplateDiags, ...elementTagDiags];
}
function getTheElementTagDeprecatedSuggestionDiagnostics(shimPath, program, fileRecord, diags, templateTypeChecker) {
  const sourceFile = program.getSourceFile(shimPath);
  if (sourceFile === void 0) {
    return [];
  }
  const typeChecker = program.getTypeChecker();
  const nodeToDiag = /* @__PURE__ */ new Map();
  for (const tsDiag of diags) {
    const diagNode = getTokenAtPosition(sourceFile, tsDiag.start);
    const nodeType = typeChecker.getTypeAtLocation(diagNode);
    const nodeSymbolDeclarations = nodeType.getSymbol()?.declarations;
    const decl = nodeSymbolDeclarations !== void 0 && nodeSymbolDeclarations.length > 0 ? nodeSymbolDeclarations[0] : void 0;
    if (decl === void 0 || !ts36.isClassDeclaration(decl)) {
      continue;
    }
    const directiveForDiagnostic = templateTypeChecker.getDirectiveMetadata(decl);
    if (directiveForDiagnostic === null || !directiveForDiagnostic.isComponent) {
      continue;
    }
    nodeToDiag.set(decl, tsDiag);
  }
  const directiveNodesInTcb = findAllMatchingNodes(sourceFile, {
    filter: isDirectiveDeclaration
  });
  const templateDiagnostics = [];
  for (const directive of directiveNodesInTcb) {
    const directiveType = typeChecker.getTypeAtLocation(directive);
    const directiveSymbolDeclarations = directiveType.getSymbol()?.declarations;
    const decl = directiveSymbolDeclarations !== void 0 && directiveSymbolDeclarations.length > 0 ? directiveSymbolDeclarations[0] : void 0;
    if (decl === void 0) {
      continue;
    }
    if (!ts36.isClassDeclaration(decl)) {
      continue;
    }
    const diagnostic = nodeToDiag.get(decl);
    if (diagnostic === void 0) {
      continue;
    }
    const fullMapping = getSourceMapping(
      diagnostic.file,
      directive.getStart(),
      fileRecord.sourceManager,
      /**
       * Don't set to true, the deprecated diagnostics will be ignored if this is a diagnostics request.
       * Only the deprecated diagnostics will be reported here.
       */
      // For example:
      // var _t2 /*T:DIR*/ /*87,104*/ = _ctor1({ "name": ("") /*96,103*/ }) /*D:ignore*/;
      // At the end of the statement, there is a comment `/*D:ignore*/` which means that this diagnostic
      // should be ignored in diagnostics request.
      /*isDiagnosticsRequest*/
      false
    );
    if (fullMapping === null) {
      continue;
    }
    const { sourceLocation, sourceMapping: templateSourceMapping, span } = fullMapping;
    const templateDiagnostic = makeTemplateDiagnostic(sourceLocation.id, templateSourceMapping, span, diagnostic.category, diagnostic.code, diagnostic.messageText, void 0, diagnostic.reportsDeprecated !== void 0 ? {
      reportsDeprecated: diagnostic.reportsDeprecated,
      relatedMessages: diagnostic.relatedInformation
    } : void 0);
    templateDiagnostics.push(templateDiagnostic);
  }
  return templateDiagnostics;
}
function isDeprecatedDiagnostics(diag) {
  return diag.reportsDeprecated !== void 0;
}
function appendOrReplaceTsEntryInfo(tsEntryInfos, newTsEntryInfo, program) {
  const typeChecker = program.getTypeChecker();
  const newTsEntryInfoSymbol = getSymbolFromTsEntryInfo(newTsEntryInfo, program);
  if (newTsEntryInfoSymbol === null) {
    return;
  }
  const matchedEntryIndex = tsEntryInfos.findIndex((currentTsEntryInfo) => {
    const currentTsEntrySymbol = getSymbolFromTsEntryInfo(currentTsEntryInfo, program);
    if (currentTsEntrySymbol === null) {
      return false;
    }
    return isSymbolTypeMatch(currentTsEntrySymbol, newTsEntryInfoSymbol, typeChecker);
  });
  if (matchedEntryIndex === -1) {
    tsEntryInfos.push(newTsEntryInfo);
    return;
  }
  const matchedEntry = tsEntryInfos[matchedEntryIndex];
  const matchedEntrySymbol = getSymbolFromTsEntryInfo(matchedEntry, program);
  if (matchedEntrySymbol === null) {
    return;
  }
  if (isSymbolAliasOf(matchedEntrySymbol, newTsEntryInfoSymbol, typeChecker)) {
    tsEntryInfos[matchedEntryIndex] = newTsEntryInfo;
    return;
  }
  return;
}
function getSymbolFromTsEntryInfo(tsInfo, program) {
  const typeChecker = program.getTypeChecker();
  const sf = program.getSourceFile(tsInfo.tsCompletionEntrySymbolFileName);
  if (sf === void 0) {
    return null;
  }
  const sfSymbol = typeChecker.getSymbolAtLocation(sf);
  if (sfSymbol === void 0) {
    return null;
  }
  return typeChecker.tryGetMemberInModuleExports(tsInfo.tsCompletionEntrySymbolName, sfSymbol) ?? null;
}
function getFirstTypeDeclarationOfSymbol(symbol, typeChecker) {
  const type = typeChecker.getTypeOfSymbol(symbol);
  return type.getSymbol()?.declarations?.[0];
}
function isSymbolTypeMatch(first, last, typeChecker) {
  const firstTypeNode = getFirstTypeDeclarationOfSymbol(first, typeChecker);
  const lastTypeNode = getFirstTypeDeclarationOfSymbol(last, typeChecker);
  return firstTypeNode === lastTypeNode && firstTypeNode !== void 0;
}

// packages/compiler-cli/src/ngtsc/annotations/component/src/animations.js
import { CombinedRecursiveAstVisitor, tmplAstVisitAll } from "@angular/compiler";
var ANIMATE_ENTER = "animate.enter";
var ANIMATE_LEAVE = `animate.leave`;
function analyzeTemplateForAnimations(template) {
  const analyzer = new AnimationsAnalyzer();
  tmplAstVisitAll(analyzer, template);
  return { hasAnimations: analyzer.hasAnimations };
}
var AnimationsAnalyzer = class extends CombinedRecursiveAstVisitor {
  hasAnimations = false;
  visitElement(element) {
    for (const attr of element.attributes) {
      if (attr.name === ANIMATE_LEAVE || attr.name === ANIMATE_ENTER) {
        this.hasAnimations = true;
      }
    }
    for (const input of element.inputs) {
      if (input.name === ANIMATE_LEAVE || input.name === ANIMATE_ENTER) {
        this.hasAnimations = true;
      }
    }
    super.visitElement(element);
  }
};

// packages/compiler-cli/src/ngtsc/annotations/component/src/diagnostics.js
function makeCyclicImportInfo(ref, type, cycle) {
  const name = ref.debugName || "(unknown)";
  const path = cycle.getPath().map((sf) => sf.fileName).join(" -> ");
  const message = `The ${type} '${name}' is used in the template but importing it would create a cycle: `;
  return makeRelatedInformation(ref.node, message + path);
}
function checkCustomElementSelectorForErrors(selector) {
  if (selector.includes(".") || selector.includes("[") && selector.includes("]")) {
    return null;
  }
  if (!/^[a-z]/.test(selector)) {
    return "Selector of a ShadowDom-encapsulated component must start with a lower case letter.";
  }
  if (/[A-Z]/.test(selector)) {
    return "Selector of a ShadowDom-encapsulated component must all be in lower case.";
  }
  if (!selector.includes("-")) {
    return "Selector of a component that uses ViewEncapsulation.ShadowDom must contain a hyphen.";
  }
  return null;
}

// packages/compiler-cli/src/ngtsc/annotations/component/src/foreign_component.js
import { BindingType as BindingType2, TmplAstContentBlock, TmplAstElement as TmplAstElement2, TmplAstRecursiveVisitor, tmplAstVisitAll as tmplAstVisitAll2 } from "@angular/compiler";
import ts37 from "typescript";
var CHILDREN = "children";
function analyzeForeignComponentFeatures(template, foreignMatcher) {
  const analyzer = new ForeignComponentFeatureAnalyzer(foreignMatcher, template.sourceMapping);
  tmplAstVisitAll2(analyzer, template.nodes);
  return analyzer.diagnostics;
}
var ForeignComponentFeatureAnalyzer = class extends TmplAstRecursiveVisitor {
  foreignMatcher;
  sourceMapping;
  currentParent = null;
  diagnostics = [];
  // Tracks the named @content blocks defined for each foreign component element.
  // This is used to detect duplicate @content declarations under the same parent
  // during the recursive AST traversal.
  seenContentBlocks = /* @__PURE__ */ new Map();
  constructor(foreignMatcher, sourceMapping) {
    super();
    this.foreignMatcher = foreignMatcher;
    this.sourceMapping = sourceMapping;
  }
  elementIsForeignComponent(tagName) {
    return this.foreignMatcher !== null && this.foreignMatcher.match(tagName).length > 0;
  }
  parentNodeIsForeignComponent() {
    return this.currentParent !== null && this.currentParent instanceof TmplAstElement2 && this.elementIsForeignComponent(this.currentParent.name);
  }
  visitElement(element) {
    if (this.elementIsForeignComponent(element.name)) {
      this.validateForeignComponent(element);
    }
    const prevParent = this.currentParent;
    this.currentParent = element;
    super.visitElement(element);
    this.currentParent = prevParent;
  }
  validateForeignComponent(element) {
    if (element.outputs.length > 0) {
      this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, element.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.FOREIGN_COMPONENT_UNSUPPORTED_BINDING), "Foreign components do not support event bindings."));
    }
    if (element.references.length > 0) {
      this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, element.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.FOREIGN_COMPONENT_UNSUPPORTED_BINDING), "Foreign components do not support references."));
    }
    if (element.inputs.some((input) => input.type !== BindingType2.Property)) {
      this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, element.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.FOREIGN_COMPONENT_UNSUPPORTED_BINDING), "Foreign components only support static attributes and property bindings."));
    }
    const childrenInput = element.inputs.find((input) => input.type === BindingType2.Property && input.name === CHILDREN);
    const childrenAttr = element.attributes.find((attr) => attr.name === CHILDREN);
    const conflictingSource = childrenInput ?? childrenAttr;
    if (conflictingSource === void 0) {
      return;
    }
    const firstChild = element.children.find((child) => !(child instanceof TmplAstContentBlock));
    if (firstChild === void 0) {
      return;
    }
    this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, conflictingSource.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.CONFLICTING_CONTENT_AND_PROPERTY), `A foreign component cannot have both a '${CHILDREN}' property and child nodes.`, [
      {
        text: "Child nodes are defined here.",
        start: firstChild.sourceSpan.start.offset,
        end: firstChild.sourceSpan.end.offset,
        sourceFile: this.sourceMapping.node.getSourceFile()
      }
    ]));
  }
  visitTemplate(template) {
    const prevParent = this.currentParent;
    this.currentParent = template;
    super.visitTemplate(template);
    this.currentParent = prevParent;
  }
  visitDeferredBlock(deferred) {
    const prevParent = this.currentParent;
    this.currentParent = deferred;
    super.visitDeferredBlock(deferred);
    this.currentParent = prevParent;
  }
  visitDeferredBlockPlaceholder(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitDeferredBlockPlaceholder(block);
    this.currentParent = prevParent;
  }
  visitDeferredBlockError(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitDeferredBlockError(block);
    this.currentParent = prevParent;
  }
  visitDeferredBlockLoading(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitDeferredBlockLoading(block);
    this.currentParent = prevParent;
  }
  visitSwitchBlock(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitSwitchBlock(block);
    this.currentParent = prevParent;
  }
  visitSwitchBlockCaseGroup(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitSwitchBlockCaseGroup(block);
    this.currentParent = prevParent;
  }
  visitForLoopBlock(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitForLoopBlock(block);
    this.currentParent = prevParent;
  }
  visitForLoopBlockEmpty(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitForLoopBlockEmpty(block);
    this.currentParent = prevParent;
  }
  visitIfBlock(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitIfBlock(block);
    this.currentParent = prevParent;
  }
  visitIfBlockBranch(block) {
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitIfBlockBranch(block);
    this.currentParent = prevParent;
  }
  visitContent(content) {
    const prevParent = this.currentParent;
    this.currentParent = content;
    super.visitContent(content);
    this.currentParent = prevParent;
  }
  visitContentBlock(block) {
    if (this.parentNodeIsForeignComponent()) {
      this.validateContentBlock(block);
    } else {
      this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, block.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.INVALID_CONTENT_PLACEMENT), "@content blocks are only valid as direct children of foreign components."));
    }
    const prevParent = this.currentParent;
    this.currentParent = block;
    super.visitContentBlock(block);
    this.currentParent = prevParent;
  }
  validateContentBlock(block) {
    const parent = this.currentParent;
    let seen = this.seenContentBlocks.get(parent);
    if (seen === void 0) {
      seen = /* @__PURE__ */ new Map();
      this.seenContentBlocks.set(parent, seen);
    }
    if (seen.has(block.name)) {
      const firstDecl = seen.get(block.name);
      this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, block.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.CONFLICTING_CONTENT_DECLARATION), `A @content block with the name '${block.name}' has already been defined for this component.`, [
        {
          text: `The @content block '${block.name}' was first defined here.`,
          start: firstDecl.sourceSpan.start.offset,
          end: firstDecl.sourceSpan.end.offset,
          sourceFile: this.sourceMapping.node.getSourceFile()
        }
      ]));
    } else {
      seen.set(block.name, block);
    }
    const conflictInput = parent.inputs.find((input) => input.type === BindingType2.Property && input.name === block.name);
    const conflictAttr = parent.attributes.find((attr) => attr.name === block.name);
    const conflict = conflictInput ?? conflictAttr;
    if (conflict !== void 0) {
      this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, block.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.CONFLICTING_CONTENT_AND_PROPERTY), `A @content block with the name '${block.name}' conflicts with a property on the parent component.`, [
        {
          text: `The property '${block.name}' is defined here.`,
          start: conflict.sourceSpan.start.offset,
          end: conflict.sourceSpan.end.offset,
          sourceFile: this.sourceMapping.node.getSourceFile()
        }
      ]));
    }
    if (block.name === CHILDREN && block.variables.length === 0) {
      this.diagnostics.push(makeTemplateDiagnostic("", this.sourceMapping, block.sourceSpan, ts37.DiagnosticCategory.Error, ngErrorCode(ErrorCode.FOREIGN_COMPONENT_CONTENT_UNNECESSARY_FOR_CHILDREN), `Defining a @content (${CHILDREN}) block with no parameters is unnecessary. Pass children as direct nested content of the foreign component instead.`));
    }
  }
};

// packages/compiler-cli/src/ngtsc/annotations/component/src/selectorless.js
import { BindingPipe, CombinedRecursiveAstVisitor as CombinedRecursiveAstVisitor2, tmplAstVisitAll as tmplAstVisitAll3, BindingPipeType } from "@angular/compiler";
function analyzeTemplateForSelectorless(template) {
  const analyzer = new SelectorlessDirectivesAnalyzer();
  tmplAstVisitAll3(analyzer, template);
  const isSelectorless = analyzer.symbols !== null && analyzer.symbols.size > 0;
  const localReferencedSymbols = analyzer.symbols;
  return { isSelectorless, localReferencedSymbols };
}
var SelectorlessDirectivesAnalyzer = class extends CombinedRecursiveAstVisitor2 {
  symbols = null;
  visit(node) {
    if (node instanceof BindingPipe && node.type === BindingPipeType.ReferencedDirectly) {
      this.trackSymbol(node.name);
    }
    super.visit(node);
  }
  visitComponent(component) {
    this.trackSymbol(component.componentName);
    super.visitComponent(component);
  }
  visitDirective(directive) {
    this.trackSymbol(directive.name);
    super.visitDirective(directive);
  }
  trackSymbol(name) {
    this.symbols ??= /* @__PURE__ */ new Set();
    this.symbols.add(name);
  }
};

// packages/compiler-cli/src/ngtsc/annotations/component/src/symbol.js
var ComponentSymbol = class _ComponentSymbol extends DirectiveSymbol {
  usedDirectives = [];
  usedPipes = [];
  isRemotelyScoped = false;
  isEmitAffected(previousSymbol, publicApiAffected) {
    if (!(previousSymbol instanceof _ComponentSymbol)) {
      return true;
    }
    const isSymbolUnaffected = (current, previous) => isReferenceEqual(current, previous) && !publicApiAffected.has(current.symbol);
    return this.isRemotelyScoped !== previousSymbol.isRemotelyScoped || !isArrayEqual(this.usedDirectives, previousSymbol.usedDirectives, isSymbolUnaffected) || !isArrayEqual(this.usedPipes, previousSymbol.usedPipes, isSymbolUnaffected);
  }
  isTypeCheckBlockAffected(previousSymbol, typeCheckApiAffected) {
    if (!(previousSymbol instanceof _ComponentSymbol)) {
      return true;
    }
    const isInheritanceChainAffected = (symbol) => {
      let currentSymbol = symbol;
      while (currentSymbol instanceof DirectiveSymbol) {
        if (typeCheckApiAffected.has(currentSymbol)) {
          return true;
        }
        currentSymbol = currentSymbol.baseClass;
      }
      return false;
    };
    const isDirectiveUnaffected = (current, previous) => isReferenceEqual(current, previous) && !isInheritanceChainAffected(current.symbol);
    const isPipeUnaffected = (current, previous) => isReferenceEqual(current, previous) && !typeCheckApiAffected.has(current.symbol);
    return !isArrayEqual(this.usedDirectives, previousSymbol.usedDirectives, isDirectiveUnaffected) || !isArrayEqual(this.usedPipes, previousSymbol.usedPipes, isPipeUnaffected);
  }
};

// packages/compiler-cli/src/ngtsc/annotations/component/src/util.js
import ts38 from "typescript";
function collectLegacyAnimationNames(value, legacyAnimationTriggerNames) {
  if (value instanceof Map) {
    const name = value.get("name");
    if (typeof name === "string") {
      legacyAnimationTriggerNames.staticTriggerNames.push(name);
    } else {
      legacyAnimationTriggerNames.includesDynamicAnimations = true;
    }
  } else if (Array.isArray(value)) {
    for (const resolvedValue of value) {
      collectLegacyAnimationNames(resolvedValue, legacyAnimationTriggerNames);
    }
  } else {
    legacyAnimationTriggerNames.includesDynamicAnimations = true;
  }
}
function isLegacyAngularAnimationsReference(reference, symbolName) {
  return reference.ownedByModuleGuess === "@angular/animations" && reference.debugName === symbolName;
}
var legacyAnimationTriggerResolver = (fn, node, resolve, unresolvable) => {
  const animationTriggerMethodName = "trigger";
  if (!isLegacyAngularAnimationsReference(fn, animationTriggerMethodName)) {
    return unresolvable;
  }
  const triggerNameExpression = node.arguments[0];
  if (!triggerNameExpression) {
    return unresolvable;
  }
  const res = /* @__PURE__ */ new Map();
  res.set("name", resolve(triggerNameExpression));
  return res;
};
function validateAndFlattenComponentImports(imports, expr, isDeferred) {
  const flattened = [];
  const errorMessage = isDeferred ? `'deferredImports' must be an array of components, directives, or pipes.` : `'imports' must be an array of components, directives, pipes, or NgModules.`;
  if (!Array.isArray(imports)) {
    const error = createValueHasWrongTypeError(expr, imports, errorMessage).toDiagnostic();
    return {
      imports: [],
      diagnostics: [error]
    };
  }
  const diagnostics = [];
  for (let i = 0; i < imports.length; i++) {
    const ref = imports[i];
    let refExpr = expr;
    if (ts38.isArrayLiteralExpression(expr) && expr.elements.length === imports.length && !expr.elements.some(ts38.isSpreadAssignment)) {
      refExpr = expr.elements[i];
    }
    if (Array.isArray(ref)) {
      const { imports: childImports, diagnostics: childDiagnostics } = validateAndFlattenComponentImports(ref, refExpr, isDeferred);
      flattened.push(...childImports);
      diagnostics.push(...childDiagnostics);
    } else if (ref instanceof Reference) {
      if (isNamedClassDeclaration(ref.node)) {
        flattened.push(ref);
      } else {
        diagnostics.push(createValueHasWrongTypeError(ref.getOriginForDiagnostics(expr), ref, errorMessage).toDiagnostic());
      }
    } else if (isLikelyModuleWithProviders(ref)) {
      let origin = expr;
      if (ref instanceof SyntheticValue) {
        origin = getOriginNodeForDiagnostics(ref.value.mwpCall, expr);
      }
      diagnostics.push(makeDiagnostic(ErrorCode.COMPONENT_UNKNOWN_IMPORT, origin, `Component imports contains a ModuleWithProviders value, likely the result of a 'Module.forRoot()'-style call. These calls are not used to configure components and are not valid in standalone component imports - consider importing them in the application bootstrap instead.`));
    } else {
      const { node: diagnosticNode, value: diagnosticValue } = getDiagnosticOrigin(ref, expr, refExpr, imports);
      diagnostics.push(createValueHasWrongTypeError(diagnosticNode, diagnosticValue, errorMessage).toDiagnostic());
    }
  }
  return { imports: flattened, diagnostics };
}
function extractForeignImportsFromAst(expr) {
  const foreignImports = [];
  const diagnostics = [];
  const unwrappedExpr = unwrapExpression(expr);
  if (!ts38.isArrayLiteralExpression(unwrappedExpr)) {
    diagnostics.push(makeDiagnostic(ErrorCode.VALUE_HAS_WRONG_TYPE, expr, `'foreignImports' must be an array of foreign imports, e.g. 'foreignImports: [myImport(MyComponent)]'.`));
    return { foreignImports, diagnostics };
  }
  for (const element of unwrappedExpr.elements) {
    const unwrappedEl = unwrapExpression(element);
    if (!ts38.isCallExpression(unwrappedEl)) {
      diagnostics.push(makeDiagnostic(ErrorCode.VALUE_HAS_WRONG_TYPE, element, `Each foreign import must be a call expression, e.g. 'myImport(MyComponent)'.`));
      continue;
    }
    const callee = unwrapExpression(unwrappedEl.expression);
    if (!ts38.isIdentifier(callee)) {
      diagnostics.push(makeDiagnostic(ErrorCode.VALUE_HAS_WRONG_TYPE, unwrappedEl.expression, `The foreign import function must be a simple identifier, e.g. 'myImport(MyComponent)'.`));
      continue;
    }
    if (unwrappedEl.arguments.length !== 1) {
      diagnostics.push(makeDiagnostic(ErrorCode.VALUE_HAS_WRONG_TYPE, element, `Foreign import calls must receive exactly one argument, e.g. 'myImport(MyComponent)'.`));
      continue;
    }
    const arg = unwrapExpression(unwrappedEl.arguments[0]);
    if (!ts38.isIdentifier(arg)) {
      diagnostics.push(makeDiagnostic(ErrorCode.VALUE_HAS_WRONG_TYPE, unwrappedEl.arguments[0], `The component reference passed to the foreign import must be a simple identifier, e.g. 'myImport(MyComponent)'.`));
      continue;
    }
    foreignImports.push({
      name: arg.text,
      rawExpression: element
    });
  }
  return { foreignImports, diagnostics };
}
function getDiagnosticOrigin(ref, expr, refExpr, fallbackValue) {
  if (ref instanceof DynamicValue && isWithinExpression(ref.node, expr)) {
    return { node: ref.node, value: ref };
  } else if (refExpr !== expr) {
    return { node: refExpr, value: ref };
  } else {
    return { node: expr, value: fallbackValue };
  }
}
function isWithinExpression(node, expr) {
  let current = node;
  while (current !== void 0) {
    if (current === expr) {
      return true;
    }
    current = current.parent;
  }
  return false;
}
function isLikelyModuleWithProviders(value) {
  if (value instanceof SyntheticValue && isResolvedModuleWithProviders(value)) {
    return true;
  }
  if (value instanceof Map && value.has("ngModule")) {
    return true;
  }
  return false;
}

// packages/compiler-cli/src/ngtsc/annotations/component/src/handler.js
var EMPTY_ARRAY = [];
var isUsedDirective = (decl) => decl.kind === R3TemplateDependencyKind.Directive;
var isUsedPipe = (decl) => decl.kind === R3TemplateDependencyKind.Pipe;
var ComponentDecoratorHandler = class {
  reflector;
  evaluator;
  metaRegistry;
  metaReader;
  scopeReader;
  compilerHost;
  scopeRegistry;
  typeCheckScopeRegistry;
  resourceRegistry;
  isCore;
  strictCtorDeps;
  resourceLoader;
  rootDirs;
  defaultPreserveWhitespaces;
  i18nUseExternalIds;
  enableI18nLegacyMessageIdFormat;
  usePoisonedData;
  i18nNormalizeLineEndingsInICUs;
  moduleResolver;
  cycleAnalyzer;
  cycleHandlingStrategy;
  refEmitter;
  referencesRegistry;
  depTracker;
  injectableRegistry;
  semanticDepGraphUpdater;
  annotateForClosureCompiler;
  perf;
  hostDirectivesResolver;
  importTracker;
  includeClassMetadata;
  compilationMode;
  deferredSymbolTracker;
  forbidOrphanRendering;
  enableBlockSyntax;
  enableLetSyntax;
  externalRuntimeStyles;
  localCompilationExtraImportsTracker;
  jitDeclarationRegistry;
  i18nPreserveSignificantWhitespace;
  strictStandalone;
  enableHmr;
  implicitStandaloneValue;
  typeCheckHostBindings;
  enableSelectorless;
  emitDeclarationOnly;
  legacyOptionalChaining;
  constructor(reflector, evaluator, metaRegistry, metaReader, scopeReader, compilerHost, scopeRegistry, typeCheckScopeRegistry, resourceRegistry, isCore, strictCtorDeps, resourceLoader, rootDirs, defaultPreserveWhitespaces, i18nUseExternalIds, enableI18nLegacyMessageIdFormat, usePoisonedData, i18nNormalizeLineEndingsInICUs, moduleResolver, cycleAnalyzer, cycleHandlingStrategy, refEmitter, referencesRegistry, depTracker, injectableRegistry, semanticDepGraphUpdater, annotateForClosureCompiler, perf, hostDirectivesResolver, importTracker, includeClassMetadata, compilationMode, deferredSymbolTracker, forbidOrphanRendering, enableBlockSyntax, enableLetSyntax, externalRuntimeStyles, localCompilationExtraImportsTracker, jitDeclarationRegistry, i18nPreserveSignificantWhitespace, strictStandalone, enableHmr, implicitStandaloneValue, typeCheckHostBindings, enableSelectorless, emitDeclarationOnly, legacyOptionalChaining) {
    this.reflector = reflector;
    this.evaluator = evaluator;
    this.metaRegistry = metaRegistry;
    this.metaReader = metaReader;
    this.scopeReader = scopeReader;
    this.compilerHost = compilerHost;
    this.scopeRegistry = scopeRegistry;
    this.typeCheckScopeRegistry = typeCheckScopeRegistry;
    this.resourceRegistry = resourceRegistry;
    this.isCore = isCore;
    this.strictCtorDeps = strictCtorDeps;
    this.resourceLoader = resourceLoader;
    this.rootDirs = rootDirs;
    this.defaultPreserveWhitespaces = defaultPreserveWhitespaces;
    this.i18nUseExternalIds = i18nUseExternalIds;
    this.enableI18nLegacyMessageIdFormat = enableI18nLegacyMessageIdFormat;
    this.usePoisonedData = usePoisonedData;
    this.i18nNormalizeLineEndingsInICUs = i18nNormalizeLineEndingsInICUs;
    this.moduleResolver = moduleResolver;
    this.cycleAnalyzer = cycleAnalyzer;
    this.cycleHandlingStrategy = cycleHandlingStrategy;
    this.refEmitter = refEmitter;
    this.referencesRegistry = referencesRegistry;
    this.depTracker = depTracker;
    this.injectableRegistry = injectableRegistry;
    this.semanticDepGraphUpdater = semanticDepGraphUpdater;
    this.annotateForClosureCompiler = annotateForClosureCompiler;
    this.perf = perf;
    this.hostDirectivesResolver = hostDirectivesResolver;
    this.importTracker = importTracker;
    this.includeClassMetadata = includeClassMetadata;
    this.compilationMode = compilationMode;
    this.deferredSymbolTracker = deferredSymbolTracker;
    this.forbidOrphanRendering = forbidOrphanRendering;
    this.enableBlockSyntax = enableBlockSyntax;
    this.enableLetSyntax = enableLetSyntax;
    this.externalRuntimeStyles = externalRuntimeStyles;
    this.localCompilationExtraImportsTracker = localCompilationExtraImportsTracker;
    this.jitDeclarationRegistry = jitDeclarationRegistry;
    this.i18nPreserveSignificantWhitespace = i18nPreserveSignificantWhitespace;
    this.strictStandalone = strictStandalone;
    this.enableHmr = enableHmr;
    this.implicitStandaloneValue = implicitStandaloneValue;
    this.typeCheckHostBindings = typeCheckHostBindings;
    this.enableSelectorless = enableSelectorless;
    this.emitDeclarationOnly = emitDeclarationOnly;
    this.legacyOptionalChaining = legacyOptionalChaining;
    this.extractTemplateOptions = {
      enableI18nLegacyMessageIdFormat: this.enableI18nLegacyMessageIdFormat,
      i18nNormalizeLineEndingsInICUs: this.i18nNormalizeLineEndingsInICUs,
      usePoisonedData: this.usePoisonedData,
      enableBlockSyntax: this.enableBlockSyntax,
      enableLetSyntax: this.enableLetSyntax,
      enableSelectorless: this.enableSelectorless,
      preserveSignificantWhitespace: this.i18nPreserveSignificantWhitespace
    };
    this.undecoratedMetadataExtractor = getDirectiveUndecoratedMetadataExtractor(reflector, importTracker);
    this.canDeferDeps = !enableHmr;
  }
  literalCache = /* @__PURE__ */ new Map();
  elementSchemaRegistry = new DomElementSchemaRegistry2();
  undecoratedMetadataExtractor;
  /**
   * During the asynchronous preanalyze phase, it's necessary to parse the template to extract
   * any potential <link> tags which might need to be loaded. This cache ensures that work is not
   * thrown away, and the parsed template is reused during the analyze phase.
   */
  preanalyzeTemplateCache = /* @__PURE__ */ new Map();
  preanalyzeStylesCache = /* @__PURE__ */ new Map();
  /** Whether generated code for a component can defer its dependencies. */
  canDeferDeps;
  extractTemplateOptions;
  precedence = HandlerPrecedence.PRIMARY;
  name = "ComponentDecoratorHandler";
  detect(node, decorators) {
    if (!decorators) {
      return void 0;
    }
    const decorator = findAngularDecorator(decorators, "Component", this.isCore);
    if (decorator !== void 0) {
      return {
        trigger: decorator.node,
        decorator,
        metadata: decorator
      };
    } else {
      return void 0;
    }
  }
  preanalyze(node, decorator) {
    if (!this.resourceLoader.canPreload) {
      return void 0;
    }
    const meta = resolveLiteral(decorator, this.literalCache);
    const component = reflectObjectLiteral(meta);
    const containingFile = node.getSourceFile().fileName;
    const resolveStyleUrl = (styleUrl) => {
      try {
        const resourceUrl = this.resourceLoader.resolve(styleUrl, containingFile);
        return this.resourceLoader.preload(resourceUrl, {
          type: "style",
          containingFile,
          className: node.name.text
        });
      } catch {
        return void 0;
      }
    };
    const templateAndTemplateStyleResources = preloadAndParseTemplate(this.evaluator, this.resourceLoader, this.depTracker, this.preanalyzeTemplateCache, node, decorator, component, containingFile, this.defaultPreserveWhitespaces, this.extractTemplateOptions, this.compilationMode).then((template) => {
      if (template === null) {
        return { templateStyles: [], templateStyleUrls: [] };
      }
      let templateUrl;
      if (template.sourceMapping.type === "external") {
        templateUrl = template.sourceMapping.templateUrl;
      }
      return {
        templateUrl,
        templateStyles: template.styles,
        templateStyleUrls: template.styleUrls
      };
    });
    const componentStyleUrls = extractComponentStyleUrls(this.evaluator, component);
    return templateAndTemplateStyleResources.then(async (templateInfo) => {
      let styles = null;
      let orderOffset = 0;
      const rawStyles = parseDirectiveStyles(component, this.evaluator, this.compilationMode);
      if (rawStyles?.length) {
        styles = await Promise.all(rawStyles.map((style) => this.resourceLoader.preprocessInline(style, {
          type: "style",
          containingFile,
          order: orderOffset++,
          className: node.name.text
        })));
      }
      if (templateInfo.templateStyles) {
        styles ??= [];
        styles.push(...await Promise.all(templateInfo.templateStyles.map((style) => this.resourceLoader.preprocessInline(style, {
          type: "style",
          containingFile: templateInfo.templateUrl ?? containingFile,
          order: orderOffset++,
          className: node.name.text
        }))));
      }
      this.preanalyzeStylesCache.set(node, styles);
      if (this.externalRuntimeStyles) {
        return;
      }
      await Promise.all([
        ...componentStyleUrls.map((styleUrl) => resolveStyleUrl(styleUrl.url)),
        ...templateInfo.templateStyleUrls.map((url) => resolveStyleUrl(url))
      ]);
    });
  }
  analyze(node, decorator) {
    this.perf.eventCount(PerfEvent.AnalyzeComponent);
    const containingFile = node.getSourceFile().fileName;
    this.literalCache.delete(decorator);
    let diagnostics;
    let isPoisoned = false;
    const directiveResult = extractDirectiveMetadata(node, decorator, this.reflector, this.importTracker, this.evaluator, this.refEmitter, this.referencesRegistry, this.isCore, this.annotateForClosureCompiler, this.compilationMode, this.elementSchemaRegistry.getDefaultComponentElementName(), this.strictStandalone, this.implicitStandaloneValue, this.emitDeclarationOnly, this.legacyOptionalChaining);
    if (directiveResult.jitForced) {
      this.jitDeclarationRegistry.jitDeclarations.add(node);
      return {};
    }
    const { decorator: component, metadata, inputs, outputs, hostDirectives, rawHostDirectives } = directiveResult;
    const encapsulation = (this.compilationMode !== CompilationMode.LOCAL ? resolveEnumValue(this.evaluator, component, "encapsulation", "ViewEncapsulation", this.isCore) : resolveEncapsulationEnumValueLocally(component.get("encapsulation"))) ?? ViewEncapsulation2.Emulated;
    let changeDetection = null;
    if (this.compilationMode !== CompilationMode.LOCAL) {
      changeDetection = resolveEnumValue(this.evaluator, component, "changeDetection", "ChangeDetectionStrategy", this.isCore);
    } else if (component.has("changeDetection")) {
      changeDetection = new o4.WrappedNodeExpr(component.get("changeDetection"));
    }
    let animations = null;
    let legacyAnimationTriggerNames = null;
    if (component.has("animations")) {
      const animationExpression = component.get("animations");
      animations = new o4.WrappedNodeExpr(animationExpression);
      const animationsValue = this.evaluator.evaluate(animationExpression, legacyAnimationTriggerResolver);
      legacyAnimationTriggerNames = { includesDynamicAnimations: false, staticTriggerNames: [] };
      collectLegacyAnimationNames(animationsValue, legacyAnimationTriggerNames);
    }
    const relativeContextFilePath = this.rootDirs.reduce((previous, rootDir) => {
      const candidate = relative(absoluteFrom(rootDir), absoluteFrom(containingFile));
      if (previous === void 0 || candidate.length < previous.length) {
        return candidate;
      } else {
        return previous;
      }
    }, void 0);
    let viewProvidersRequiringFactory = null;
    let providersRequiringFactory = null;
    let wrappedViewProviders = null;
    if (component.has("viewProviders")) {
      const viewProviders = component.get("viewProviders");
      viewProvidersRequiringFactory = resolveProvidersRequiringFactory(viewProviders, this.reflector, this.evaluator);
      wrappedViewProviders = new o4.WrappedNodeExpr(this.annotateForClosureCompiler ? wrapFunctionExpressionsInParens(viewProviders) : viewProviders);
    }
    if (component.has("providers")) {
      providersRequiringFactory = resolveProvidersRequiringFactory(component.get("providers"), this.reflector, this.evaluator);
    }
    let resolvedImports = null;
    let foreignImports = null;
    let resolvedDeferredImports = null;
    let rawImports = component.get("imports") ?? null;
    let rawDeferredImports = component.get("deferredImports") ?? null;
    let rawForeignImports = component.get("foreignImports") ?? null;
    if ((rawImports || rawDeferredImports || rawForeignImports) && !metadata.isStandalone) {
      if (diagnostics === void 0) {
        diagnostics = [];
      }
      const importsField = rawImports ? "imports" : rawDeferredImports ? "deferredImports" : "foreignImports";
      diagnostics.push(makeDiagnostic(ErrorCode.COMPONENT_NOT_STANDALONE, component.get(importsField), `'${importsField}' is only valid on a component that is standalone.`, [
        makeRelatedInformation(node.name, `Did you forget to add 'standalone: true' to this @Component?`)
      ]));
      isPoisoned = true;
    } else if (rawImports || rawDeferredImports || rawForeignImports) {
      const importDiagnostics = [];
      if (rawForeignImports && !this.emitDeclarationOnly) {
        const { foreignImports: imports, diagnostics: diagnostics2 } = extractForeignImportsFromAst(rawForeignImports);
        importDiagnostics.push(...diagnostics2);
        foreignImports = imports;
      }
      if (this.compilationMode !== CompilationMode.LOCAL && (rawImports || rawDeferredImports)) {
        const importResolvers = combineResolvers([
          createModuleWithProvidersResolver(this.reflector, this.isCore),
          createForwardRefResolver(this.isCore)
        ]);
        if (rawImports) {
          const expr = rawImports;
          const imported = this.evaluator.evaluate(expr, importResolvers);
          const { imports: flattened, diagnostics: diagnostics2 } = validateAndFlattenComponentImports(
            imported,
            expr,
            false
            /* isDeferred */
          );
          importDiagnostics.push(...diagnostics2);
          resolvedImports = flattened;
          rawImports = expr;
        }
        if (rawDeferredImports) {
          const expr = rawDeferredImports;
          const imported = this.evaluator.evaluate(expr, importResolvers);
          const { imports: flattened, diagnostics: diagnostics2 } = validateAndFlattenComponentImports(
            imported,
            expr,
            true
            /* isDeferred */
          );
          importDiagnostics.push(...diagnostics2);
          resolvedDeferredImports = flattened;
          rawDeferredImports = expr;
        }
      }
      if (importDiagnostics.length > 0) {
        isPoisoned = true;
        if (diagnostics === void 0) {
          diagnostics = [];
        }
        diagnostics.push(...importDiagnostics);
      }
    }
    let schemas = null;
    if (component.has("schemas") && !metadata.isStandalone) {
      if (diagnostics === void 0) {
        diagnostics = [];
      }
      diagnostics.push(makeDiagnostic(ErrorCode.COMPONENT_NOT_STANDALONE, component.get("schemas"), `'schemas' is only valid on a component that is standalone.`));
    } else if (this.compilationMode !== CompilationMode.LOCAL && component.has("schemas")) {
      schemas = extractSchemas(component.get("schemas"), this.evaluator, "Component");
    } else if (metadata.isStandalone) {
      schemas = [];
    }
    let template;
    if (this.preanalyzeTemplateCache.has(node)) {
      const preanalyzed = this.preanalyzeTemplateCache.get(node);
      this.preanalyzeTemplateCache.delete(node);
      template = preanalyzed;
    } else {
      try {
        const templateDecl = parseTemplateDeclaration(node, decorator, component, containingFile, this.evaluator, this.depTracker, this.resourceLoader, this.defaultPreserveWhitespaces);
        template = extractTemplate(node, templateDecl, this.evaluator, this.depTracker, this.resourceLoader, {
          enableI18nLegacyMessageIdFormat: this.enableI18nLegacyMessageIdFormat,
          i18nNormalizeLineEndingsInICUs: this.i18nNormalizeLineEndingsInICUs,
          usePoisonedData: this.usePoisonedData,
          enableBlockSyntax: this.enableBlockSyntax,
          enableLetSyntax: this.enableLetSyntax,
          enableSelectorless: this.enableSelectorless,
          preserveSignificantWhitespace: this.i18nPreserveSignificantWhitespace
        }, this.compilationMode);
        if (this.compilationMode === CompilationMode.LOCAL && template.errors && template.errors.length > 0) {
          if (diagnostics === void 0) {
            diagnostics = [];
          }
          diagnostics.push(...getTemplateDiagnostics(
            template.errors,
            // Type check ID is required as part of the ype check, mainly for mapping the
            // diagnostic back to its source. But here we are generating the diagnostic outside
            // of the type check context, and so we skip the template ID.
            "",
            template.sourceMapping
          ));
        }
      } catch (e) {
        if (e instanceof FatalDiagnosticError) {
          diagnostics ??= [];
          diagnostics.push(e.toDiagnostic());
          isPoisoned = true;
          template = createEmptyTemplate(node, component, containingFile);
        } else {
          throw e;
        }
      }
    }
    if (component.has("animations")) {
      const { hasAnimations } = analyzeTemplateForAnimations(template.nodes);
      if (hasAnimations) {
        if (diagnostics === void 0) {
          diagnostics = [];
        }
        diagnostics.push(makeDiagnostic(ErrorCode.COMPONENT_ANIMATIONS_CONFLICT, component.get("animations"), `A component cannot have both the '@Component.animations' property (legacy animations) and use 'animate.enter' or 'animate.leave' in the template.`));
        isPoisoned = true;
      }
    }
    const templateResource = template.declaration.isInline ? { path: null, node: component.get("template") } : {
      path: absoluteFrom(template.declaration.resolvedTemplateUrl),
      node: template.sourceMapping.node
    };
    const relativeTemplatePath = getProjectRelativePath(templateResource.path ?? ts39.getOriginalNode(node).getSourceFile().fileName, this.rootDirs, this.compilerHost);
    let selectorlessEnabled = false;
    let localReferencedSymbols = null;
    if (this.enableSelectorless) {
      const templateAnalysis = analyzeTemplateForSelectorless(template.nodes);
      selectorlessEnabled = templateAnalysis.isSelectorless;
      localReferencedSymbols = templateAnalysis.localReferencedSymbols;
    }
    if (selectorlessEnabled) {
      if (!metadata.isStandalone) {
        isPoisoned = true;
        diagnostics ??= [];
        diagnostics.push(makeDiagnostic(ErrorCode.COMPONENT_NOT_STANDALONE, component.get("standalone") || node.name, `Cannot use selectorless with a component that is not standalone`));
      } else if (rawImports || rawDeferredImports) {
        isPoisoned = true;
        diagnostics ??= [];
        diagnostics.push(makeDiagnostic(ErrorCode.UNSUPPORTED_SELECTORLESS_COMPONENT_FIELD, rawImports || rawDeferredImports, `Cannot use the "${rawImports === null ? "deferredImports" : "imports"}" field in a selectorless component`));
      }
    }
    const foreignMatcher = createForeignComponentMatcher(foreignImports);
    const foreignComponentDiagnostics = analyzeForeignComponentFeatures(template, foreignMatcher);
    if (foreignComponentDiagnostics.length > 0) {
      isPoisoned = true;
      diagnostics ??= [];
      diagnostics.push(...foreignComponentDiagnostics);
    }
    let styles = [];
    const externalStyles = [];
    const hostBindingResources = extractHostBindingResources(directiveResult.hostBindingNodes);
    const styleResources = extractInlineStyleResources(component);
    const styleUrls = [
      ...extractComponentStyleUrls(this.evaluator, component),
      ..._extractTemplateStyleUrls(template)
    ];
    for (const styleUrl of styleUrls) {
      try {
        const resourceUrl = this.resourceLoader.resolve(styleUrl.url, containingFile);
        if (this.externalRuntimeStyles) {
          externalStyles.push(resourceUrl);
          continue;
        }
        if (styleUrl.source === 2 && ts39.isStringLiteralLike(styleUrl.expression)) {
          styleResources.add({
            path: absoluteFrom(resourceUrl),
            node: styleUrl.expression
          });
        }
        const resourceStr = this.resourceLoader.load(resourceUrl);
        styles.push(resourceStr);
        if (this.depTracker !== null) {
          this.depTracker.addResourceDependency(node.getSourceFile(), absoluteFrom(resourceUrl));
        }
      } catch {
        if (this.depTracker !== null) {
          this.depTracker.recordDependencyAnalysisFailure(node.getSourceFile());
        }
        if (diagnostics === void 0) {
          diagnostics = [];
        }
        const resourceType = styleUrl.source === 2 ? 2 : 1;
        diagnostics.push(makeResourceNotFoundError(styleUrl.url, styleUrl.expression, resourceType).toDiagnostic());
      }
    }
    if ((encapsulation === ViewEncapsulation2.ShadowDom || encapsulation === ViewEncapsulation2.ExperimentalIsolatedShadowDom) && metadata.selector !== null) {
      const selectorError = checkCustomElementSelectorForErrors(metadata.selector);
      if (selectorError !== null) {
        if (diagnostics === void 0) {
          diagnostics = [];
        }
        diagnostics.push(makeDiagnostic(ErrorCode.COMPONENT_INVALID_SHADOW_DOM_SELECTOR, component.get("selector"), selectorError));
      }
    }
    let inlineStyles = null;
    if (this.preanalyzeStylesCache.has(node)) {
      inlineStyles = this.preanalyzeStylesCache.get(node);
      this.preanalyzeStylesCache.delete(node);
      if (inlineStyles?.length) {
        if (this.externalRuntimeStyles) {
          externalStyles.push(...inlineStyles);
        } else {
          styles.push(...inlineStyles);
        }
      }
    } else {
      if (this.resourceLoader.canPreprocess) {
        throw new Error("Inline resource processing requires asynchronous preanalyze.");
      }
      if (component.has("styles")) {
        const litStyles = parseDirectiveStyles(component, this.evaluator, this.compilationMode);
        if (litStyles !== null) {
          inlineStyles = [...litStyles];
          styles.push(...litStyles);
        }
      }
      if (template.styles.length > 0) {
        styles.push(...template.styles);
      }
    }
    let explicitlyDeferredTypes = null;
    if (metadata.isStandalone && rawDeferredImports !== null) {
      const deferredTypes = this.collectExplicitlyDeferredSymbols(rawDeferredImports);
      for (const [deferredType, importDetails] of deferredTypes) {
        explicitlyDeferredTypes ??= [];
        explicitlyDeferredTypes.push({
          symbolName: importDetails.name,
          importPath: importDetails.from,
          isDefaultImport: isDefaultImport(importDetails.node)
        });
        this.deferredSymbolTracker.markAsDeferrableCandidate(
          deferredType,
          importDetails.node,
          node,
          true
          /* isExplicitlyDeferred */
        );
      }
    }
    const output = {
      analysis: {
        baseClass: readBaseClass(node, this.reflector, this.evaluator),
        inputs,
        inputFieldNamesFromMetadataArray: directiveResult.inputFieldNamesFromMetadataArray,
        outputs,
        hostDirectives,
        rawHostDirectives,
        selectorlessEnabled,
        localReferencedSymbols,
        meta: {
          ...metadata,
          template,
          encapsulation,
          changeDetection,
          styles,
          externalStyles,
          legacyOptionalChaining: this.legacyOptionalChaining,
          // These will be replaced during the compilation step, after all `NgModule`s have been
          // analyzed and the full compilation scope for the component can be realized.
          animations,
          viewProviders: wrappedViewProviders,
          i18nUseExternalIds: this.i18nUseExternalIds,
          relativeContextFilePath,
          rawImports: rawImports !== null ? new o4.WrappedNodeExpr(rawImports) : void 0,
          relativeTemplatePath,
          foreignImports: null
        },
        typeCheckMeta: extractDirectiveTypeCheckMeta(node, inputs, this.reflector),
        classMetadata: this.includeClassMetadata ? extractClassMetadata(node, this.reflector, this.isCore, this.annotateForClosureCompiler, (dec) => transformDecoratorResources(dec, component, styles, template), this.undecoratedMetadataExtractor) : null,
        classDebugInfo: extractClassDebugInfo(
          node,
          this.reflector,
          this.compilerHost,
          this.rootDirs,
          /* forbidOrphanRenderering */
          this.forbidOrphanRendering
        ),
        template,
        providersRequiringFactory,
        viewProvidersRequiringFactory,
        inlineStyles,
        styleUrls,
        resources: {
          styles: styleResources,
          template: templateResource,
          hostBindings: hostBindingResources
        },
        isPoisoned,
        legacyAnimationTriggerNames,
        rawImports,
        resolvedImports,
        foreignImports,
        rawDeferredImports,
        resolvedDeferredImports,
        explicitlyDeferredTypes,
        schemas,
        decorator: decorator?.node ?? null,
        hostBindingNodes: directiveResult.hostBindingNodes
      },
      diagnostics
    };
    return output;
  }
  symbol(node, analysis) {
    const typeParameters = extractSemanticTypeParameters(node);
    return new ComponentSymbol(node, analysis.meta.selector, analysis.inputs, analysis.outputs, analysis.meta.exportAs, analysis.typeCheckMeta, typeParameters);
  }
  register(node, analysis) {
    const ref = new Reference(node);
    this.metaRegistry.registerDirectiveMetadata({
      kind: MetaKind.Directive,
      matchSource: MatchSource2.Selector,
      ref,
      name: node.name.text,
      selector: analysis.meta.selector,
      exportAs: analysis.meta.exportAs,
      inputs: analysis.inputs,
      inputFieldNamesFromMetadataArray: analysis.inputFieldNamesFromMetadataArray,
      outputs: analysis.outputs,
      queries: analysis.meta.queries.map((query) => query.propertyName),
      isComponent: true,
      baseClass: analysis.baseClass,
      hostDirectives: analysis.hostDirectives,
      ...analysis.typeCheckMeta,
      isPoisoned: analysis.isPoisoned,
      isStructural: false,
      isStandalone: analysis.meta.isStandalone,
      isSignal: analysis.meta.isSignal,
      imports: analysis.resolvedImports,
      foreignImports: analysis.foreignImports,
      rawImports: analysis.rawImports,
      deferredImports: analysis.resolvedDeferredImports,
      animationTriggerNames: analysis.legacyAnimationTriggerNames,
      schemas: analysis.schemas,
      decorator: analysis.decorator,
      assumedToExportProviders: false,
      ngContentSelectors: analysis.template.ngContentSelectors,
      preserveWhitespaces: analysis.template.preserveWhitespaces ?? false,
      isExplicitlyDeferred: false,
      selectorlessEnabled: analysis.selectorlessEnabled,
      localReferencedSymbols: analysis.localReferencedSymbols
    });
    this.resourceRegistry.registerResources(analysis.resources, node);
    this.injectableRegistry.registerInjectable(node, {
      ctorDeps: analysis.meta.deps
    });
  }
  index(context, node, analysis) {
    if (analysis.isPoisoned && !this.usePoisonedData) {
      return null;
    }
    const scope = this.scopeReader.getScopeForComponent(node);
    const selector = analysis.meta.selector;
    let matcher = null;
    if (scope !== null) {
      const isPoisoned = scope.kind === ComponentScopeKind.NgModule ? scope.compilation.isPoisoned : scope.isPoisoned;
      if ((isPoisoned || scope.kind === ComponentScopeKind.NgModule && scope.exported.isPoisoned) && !this.usePoisonedData) {
        return null;
      }
      matcher = createMatcherFromScope(scope, this.hostDirectivesResolver);
    }
    const binder = new R3TargetBinder2(matcher);
    const boundTemplate = binder.bind({ template: analysis.template.diagNodes });
    const abstractBoundTemplate = {
      getDirectivesOfNode(node2) {
        return boundTemplate.getDirectivesOfNode(node2);
      },
      getReferenceTarget(node2) {
        return boundTemplate.getReferenceTarget(node2);
      },
      getExpressionTarget(ast) {
        return boundTemplate.getExpressionTarget(ast);
      },
      getUsedDirectives() {
        return boundTemplate.getUsedDirectives().map((dir) => ({
          ref: { node: dir.ref.node },
          isComponent: dir.isComponent
        }));
      },
      getTemplateAst() {
        return boundTemplate.target.template;
      }
    };
    context.addComponent({
      declaration: node,
      selector,
      boundTemplate: abstractBoundTemplate,
      templateMeta: {
        isInline: analysis.template.declaration.isInline,
        file: analysis.template.file
      }
    });
    return null;
  }
  typeCheck(ctx, node, meta) {
    if (!ts39.isClassDeclaration(node) || meta.isPoisoned && !this.usePoisonedData) {
      return;
    }
    const ref = new Reference(node);
    const scope = this.typeCheckScopeRegistry.getTypeCheckScope(ref);
    if (scope.isPoisoned && !this.usePoisonedData) {
      return;
    }
    const binder = new R3TargetBinder2(scope.matcher, scope.foreignMatcher);
    const templateContext = {
      nodes: meta.template.diagNodes,
      pipes: scope.pipes,
      sourceMapping: meta.template.sourceMapping,
      file: meta.template.file,
      parseErrors: meta.template.errors,
      preserveWhitespaces: meta.meta.template.preserveWhitespaces ?? false
    };
    const hostElement = this.typeCheckHostBindings ? createHostElement2("component", meta.meta.selector, createSourceSpan(node.name), meta.hostBindingNodes.hostObjectLiteralBindings, meta.hostBindingNodes.hostBindingDecorators, meta.hostBindingNodes.hostListenerDecorators) : null;
    const hostBindingsContext = hostElement === null || scope.directivesOnHost === null ? null : {
      node: hostElement,
      directives: scope.directivesOnHost,
      sourceMapping: { type: "direct", node }
    };
    ctx.addDirective(ref, binder, scope.schemas, templateContext, hostBindingsContext, meta.meta.isStandalone);
  }
  extendedTemplateCheck(component, extendedTemplateChecker) {
    return extendedTemplateChecker.getDiagnosticsForComponent(component);
  }
  templateSemanticsCheck(component, templateSemanticsChecker) {
    return templateSemanticsChecker.getDiagnosticsForComponent(component);
  }
  resolve(node, analysis, symbol) {
    const metadata = analysis.meta;
    const diagnostics = [];
    const context = getSourceFile(node);
    const nonRemovableImports = this.deferredSymbolTracker.getNonRemovableDeferredImports(context, node);
    if (nonRemovableImports.length > 0) {
      for (const importDecl of nonRemovableImports) {
        const diagnostic = makeDiagnostic(ErrorCode.DEFERRED_DEPENDENCY_IMPORTED_EAGERLY, importDecl, `This import contains symbols that are used both inside and outside of the \`@Component.deferredImports\` fields in the file. This renders all these defer imports useless as this import remains and its module is eagerly loaded. To fix this, make sure that all symbols from the import are *only* used within \`@Component.deferredImports\` arrays and there are no other references to those symbols present in this file.`);
        diagnostics.push(diagnostic);
      }
      return { diagnostics };
    }
    let data;
    if (this.compilationMode === CompilationMode.LOCAL) {
      data = {
        declarations: EMPTY_ARRAY,
        declarationListEmitMode: !analysis.meta.isStandalone || analysis.rawImports !== null ? 3 : 0,
        deferPerBlockDependencies: this.locateDeferBlocksWithoutScope(analysis.template),
        deferBlockDepsEmitMode: 1,
        deferrableDeclToImportDecl: /* @__PURE__ */ new Map(),
        deferPerComponentDependencies: analysis.explicitlyDeferredTypes ?? [],
        hasDirectiveDependencies: true
      };
      if (this.localCompilationExtraImportsTracker === null) {
        return { data };
      }
    } else {
      data = {
        declarations: EMPTY_ARRAY,
        declarationListEmitMode: 0,
        deferPerBlockDependencies: /* @__PURE__ */ new Map(),
        deferBlockDepsEmitMode: 0,
        deferrableDeclToImportDecl: /* @__PURE__ */ new Map(),
        deferPerComponentDependencies: [],
        hasDirectiveDependencies: true
      };
    }
    if (this.semanticDepGraphUpdater !== null && analysis.baseClass instanceof Reference) {
      symbol.baseClass = this.semanticDepGraphUpdater.getSymbol(analysis.baseClass.node);
    }
    if (analysis.isPoisoned && !this.usePoisonedData) {
      return {};
    }
    const scope = this.scopeReader.getScopeForComponent(node);
    if (scope === null) {
      data.deferPerBlockDependencies = this.locateDeferBlocksWithoutScope(metadata.template);
    } else {
      const { eagerlyUsed, deferBlocks, allDependencies, wholeTemplateUsed, pipes } = this.resolveComponentDependencies(node, context, analysis, scope, metadata, diagnostics);
      const declarations = this.componentDependenciesToDeclarations(node, context, allDependencies, wholeTemplateUsed, pipes);
      if (this.semanticDepGraphUpdater !== null) {
        const getSemanticReference = (decl) => this.semanticDepGraphUpdater.getSemanticReference(decl.ref.node, decl.type);
        symbol.usedDirectives = Array.from(declarations.values()).filter(isUsedDirective).map(getSemanticReference);
        symbol.usedPipes = Array.from(declarations.values()).filter(isUsedPipe).map(getSemanticReference);
      }
      if (this.compilationMode !== CompilationMode.LOCAL) {
        this.resolveDeferBlocks(node, scope, deferBlocks, declarations, data, analysis, eagerlyUsed);
        data.hasDirectiveDependencies = !analysis.meta.isStandalone || allDependencies.some(({ kind, ref }) => {
          return (kind === MetaKind.Directive || kind === MetaKind.NgModule) && wholeTemplateUsed.has(ref.node);
        });
      } else {
        data.hasDirectiveDependencies = true;
      }
      this.handleDependencyCycles(node, context, scope, data, analysis, metadata, declarations, eagerlyUsed, symbol);
    }
    if (this.compilationMode !== CompilationMode.LOCAL) {
      const nonLocalDiagnostics = this.getNonLocalDiagnostics(node, analysis);
      if (nonLocalDiagnostics !== null) {
        diagnostics.push(...nonLocalDiagnostics);
      }
    }
    if (diagnostics.length > 0) {
      return { diagnostics };
    }
    return { data };
  }
  xi18n(ctx, node, analysis) {
    ctx.updateFromTemplate(analysis.template.content, analysis.template.declaration.resolvedTemplateUrl);
  }
  updateResources(node, analysis) {
    const containingFile = node.getSourceFile().fileName;
    const templateDecl = analysis.template.declaration;
    if (!templateDecl.isInline) {
      analysis.template = extractTemplate(node, templateDecl, this.evaluator, this.depTracker, this.resourceLoader, this.extractTemplateOptions, this.compilationMode);
    }
    let styles = [];
    if (analysis.styleUrls !== null) {
      for (const styleUrl of analysis.styleUrls) {
        try {
          const resolvedStyleUrl = this.resourceLoader.resolve(styleUrl.url, containingFile);
          const styleText = this.resourceLoader.load(resolvedStyleUrl);
          styles.push(styleText);
        } catch (e) {
        }
      }
    }
    if (analysis.inlineStyles !== null) {
      for (const styleText of analysis.inlineStyles) {
        styles.push(styleText);
      }
    }
    for (const styleText of analysis.template.styles) {
      styles.push(styleText);
    }
    analysis.meta.styles = styles.filter((s) => s.trim().length > 0);
  }
  compileFull(node, analysis, resolution, pool) {
    if (analysis.template.errors !== null && analysis.template.errors.length > 0) {
      return [];
    }
    const perComponentDeferredDeps = this.canDeferDeps ? this.resolveAllDeferredDependencies(resolution) : null;
    const defer = this.compileDeferBlocks(resolution);
    const foreignImports = this.resolveForeignComponentImports(analysis);
    const meta = {
      ...analysis.meta,
      ...resolution,
      defer,
      foreignImports
    };
    const fac = compileNgFactoryDefField(toFactoryMetadata(meta, FactoryTarget3.Component));
    if (perComponentDeferredDeps !== null) {
      removeDeferrableTypesFromComponentDecorator(analysis, perComponentDeferredDeps);
    }
    const def = compileComponentFromMetadata(meta, pool, this.getNewBindingParser());
    const inputTransformFields = compileInputTransformFields(analysis.inputs);
    const classMetadata = analysis.classMetadata !== null ? compileComponentClassMetadata(analysis.classMetadata, perComponentDeferredDeps).toStmt() : null;
    const debugInfo = analysis.classDebugInfo !== null ? compileClassDebugInfo(analysis.classDebugInfo).toStmt() : null;
    const hmrMeta = this.enableHmr ? extractHmrMetatadata(node, this.reflector, this.evaluator, this.compilerHost, this.rootDirs, def, fac, defer, classMetadata, debugInfo) : null;
    const hmrInitializer = hmrMeta ? compileHmrInitializer(hmrMeta).toStmt() : null;
    const deferrableImports = this.canDeferDeps ? this.deferredSymbolTracker.getDeferrableImportDecls() : null;
    return compileResults(fac, def, classMetadata, "\u0275cmp", inputTransformFields, deferrableImports, debugInfo, hmrInitializer);
  }
  compilePartial(node, analysis, resolution) {
    if (analysis.template.errors !== null && analysis.template.errors.length > 0) {
      return [];
    }
    const templateInfo = {
      content: analysis.template.content,
      sourceUrl: analysis.template.declaration.resolvedTemplateUrl,
      isInline: analysis.template.declaration.isInline,
      inlineTemplateLiteralExpression: analysis.template.sourceMapping.type === "direct" ? new o4.WrappedNodeExpr(analysis.template.sourceMapping.node) : null
    };
    const perComponentDeferredDeps = this.canDeferDeps ? this.resolveAllDeferredDependencies(resolution) : null;
    const defer = this.compileDeferBlocks(resolution);
    const meta = {
      ...analysis.meta,
      ...resolution,
      defer
    };
    const fac = compileDeclareFactory(toFactoryMetadata(meta, FactoryTarget3.Component));
    const inputTransformFields = compileInputTransformFields(analysis.inputs);
    const def = compileDeclareComponentFromMetadata(meta, analysis.template, templateInfo);
    const classMetadata = analysis.classMetadata !== null ? compileComponentDeclareClassMetadata(analysis.classMetadata, perComponentDeferredDeps).toStmt() : null;
    const hmrMeta = this.enableHmr ? extractHmrMetatadata(node, this.reflector, this.evaluator, this.compilerHost, this.rootDirs, def, fac, defer, classMetadata, null) : null;
    const hmrInitializer = hmrMeta ? compileHmrInitializer(hmrMeta).toStmt() : null;
    const deferrableImports = this.canDeferDeps ? this.deferredSymbolTracker.getDeferrableImportDecls() : null;
    return compileResults(fac, def, classMetadata, "\u0275cmp", inputTransformFields, deferrableImports, null, hmrInitializer);
  }
  compileLocal(node, analysis, resolution, pool) {
    const deferrableTypes = this.canDeferDeps ? analysis.explicitlyDeferredTypes : null;
    const defer = this.compileDeferBlocks(resolution);
    const foreignImports = this.resolveForeignComponentImports(analysis);
    const meta = {
      ...analysis.meta,
      ...resolution,
      defer,
      foreignImports
    };
    if (deferrableTypes !== null) {
      removeDeferrableTypesFromComponentDecorator(analysis, deferrableTypes);
    }
    const fac = compileNgFactoryDefField(toFactoryMetadata(meta, FactoryTarget3.Component));
    const def = compileComponentFromMetadata(meta, pool, this.getNewBindingParser());
    const inputTransformFields = compileInputTransformFields(analysis.inputs);
    const classMetadata = analysis.classMetadata !== null ? compileComponentClassMetadata(analysis.classMetadata, deferrableTypes).toStmt() : null;
    const debugInfo = analysis.classDebugInfo !== null ? compileClassDebugInfo(analysis.classDebugInfo).toStmt() : null;
    const hmrMeta = this.enableHmr ? extractHmrMetatadata(node, this.reflector, this.evaluator, this.compilerHost, this.rootDirs, def, fac, defer, classMetadata, debugInfo) : null;
    const hmrInitializer = hmrMeta ? compileHmrInitializer(hmrMeta).toStmt() : null;
    const deferrableImports = this.canDeferDeps ? this.deferredSymbolTracker.getDeferrableImportDecls() : null;
    return compileResults(fac, def, classMetadata, "\u0275cmp", inputTransformFields, deferrableImports, debugInfo, hmrInitializer);
  }
  compileHmrUpdateDeclaration(node, analysis, resolution) {
    if (analysis.template.errors !== null && analysis.template.errors.length > 0) {
      return null;
    }
    const pool = new ConstantPool2();
    const defer = this.compileDeferBlocks(resolution);
    const foreignImports = this.resolveForeignComponentImports(analysis);
    const meta = {
      ...analysis.meta,
      ...resolution,
      defer,
      foreignImports
    };
    const fac = compileNgFactoryDefField(toFactoryMetadata(meta, FactoryTarget3.Component));
    const def = compileComponentFromMetadata(meta, pool, this.getNewBindingParser());
    const classMetadata = analysis.classMetadata !== null ? compileComponentClassMetadata(analysis.classMetadata, null).toStmt() : null;
    const debugInfo = analysis.classDebugInfo !== null ? compileClassDebugInfo(analysis.classDebugInfo).toStmt() : null;
    const hmrMeta = this.enableHmr ? extractHmrMetatadata(node, this.reflector, this.evaluator, this.compilerHost, this.rootDirs, def, fac, defer, classMetadata, debugInfo) : null;
    const res = compileResults(fac, def, classMetadata, "\u0275cmp", null, null, debugInfo, null);
    return hmrMeta === null || res.length === 0 ? null : getHmrUpdateDeclaration(res, pool.statements, hmrMeta, node);
  }
  /**
   * Determines the dependencies of a component and
   * categorizes them based on how they were introduced.
   */
  resolveComponentDependencies(node, context, analysis, scope, metadata, diagnostics) {
    const isModuleScope = scope.kind === ComponentScopeKind.NgModule;
    const isSelectorlessScope = scope.kind === ComponentScopeKind.Selectorless;
    const pipes = /* @__PURE__ */ new Map();
    const explicitlyDeferredDependencies = scope.kind === ComponentScopeKind.Standalone ? scope.deferredDependencies : null;
    const dependencies = [];
    if (isSelectorlessScope) {
      for (const [localName, dep] of scope.dependencies) {
        if (dep.kind === MetaKind.Pipe) {
          pipes.set(localName, dep);
        }
        dependencies.push(dep);
      }
    } else {
      const scopeDeps = isModuleScope ? scope.compilation.dependencies : scope.dependencies;
      for (const dep of scopeDeps) {
        if (dep.kind === MetaKind.Pipe && dep.name !== null) {
          pipes.set(dep.name, dep);
        }
        dependencies.push(dep);
      }
    }
    if (isModuleScope && context.fileName !== getSourceFile(scope.ngModule).fileName) {
      this.localCompilationExtraImportsTracker?.markFileForExtraImportGeneration(context);
    }
    if (!isSelectorlessScope && metadata.isStandalone && analysis.rawDeferredImports !== null && explicitlyDeferredDependencies !== null && explicitlyDeferredDependencies.length > 0) {
      const diagnostic = validateNoImportOverlap(dependencies, explicitlyDeferredDependencies, analysis.rawDeferredImports);
      if (diagnostic !== null) {
        diagnostics.push(diagnostic);
      }
    }
    const binder = new R3TargetBinder2(createMatcherFromScope(scope, this.hostDirectivesResolver), createForeignComponentMatcher(analysis.foreignImports));
    let allDependencies = dependencies;
    let deferBlockBinder = binder;
    if (explicitlyDeferredDependencies !== null && explicitlyDeferredDependencies.length > 0) {
      allDependencies = [...explicitlyDeferredDependencies, ...dependencies];
      const deferBlockMatcher = new SelectorMatcher2();
      for (const dep of allDependencies) {
        if (dep.kind === MetaKind.Pipe && dep.name !== null) {
          pipes.set(dep.name, dep);
        } else if (dep.kind === MetaKind.Directive && dep.selector !== null) {
          deferBlockMatcher.addSelectables(CssSelector3.parse(dep.selector), [dep]);
        }
      }
      deferBlockBinder = new R3TargetBinder2(deferBlockMatcher);
    }
    const bound = binder.bind({ template: metadata.template.nodes });
    const deferBlocks = /* @__PURE__ */ new Map();
    for (const deferBlock of bound.getDeferBlocks()) {
      deferBlocks.set(deferBlock, deferBlockBinder.bind({ template: deferBlock.children }));
    }
    const eagerlyUsed = /* @__PURE__ */ new Set();
    if (this.enableHmr) {
      for (const dep of dependencies) {
        if (dep.ref.node !== node) {
          eagerlyUsed.add(dep.ref.node);
        } else {
          const used = bound.getEagerlyUsedDirectives();
          if (used.some((current) => current.ref.node === node)) {
            eagerlyUsed.add(node);
          }
        }
      }
    } else {
      for (const dir of bound.getEagerlyUsedDirectives()) {
        eagerlyUsed.add(dir.ref.node);
      }
      for (const name of bound.getEagerlyUsedPipes()) {
        if (pipes.has(name)) {
          eagerlyUsed.add(pipes.get(name).ref.node);
        }
      }
    }
    const wholeTemplateUsed = new Set(eagerlyUsed);
    for (const bound2 of deferBlocks.values()) {
      for (const dir of bound2.getUsedDirectives()) {
        wholeTemplateUsed.add(dir.ref.node);
      }
      for (const name of bound2.getUsedPipes()) {
        if (!pipes.has(name)) {
          continue;
        }
        wholeTemplateUsed.add(pipes.get(name).ref.node);
      }
    }
    return { allDependencies, eagerlyUsed, wholeTemplateUsed, deferBlocks, pipes };
  }
  /**
   * Converts component dependencies into declarations by
   * resolving their metadata and deduplicating them.
   */
  componentDependenciesToDeclarations(node, context, allDependencies, wholeTemplateUsed, pipes) {
    const declarations = /* @__PURE__ */ new Map();
    for (const dep of allDependencies) {
      if (declarations.has(dep.ref.node)) {
        continue;
      }
      switch (dep.kind) {
        case MetaKind.Directive:
          if (!wholeTemplateUsed.has(dep.ref.node) || dep.matchSource !== MatchSource2.Selector) {
            continue;
          }
          const dirType = this.refEmitter.emit(dep.ref, context);
          assertSuccessfulReferenceEmit(dirType, node.name, dep.isComponent ? "component" : "directive");
          declarations.set(dep.ref.node, {
            kind: R3TemplateDependencyKind.Directive,
            ref: dep.ref,
            type: dirType.expression,
            importedFile: dirType.importedFile,
            selector: dep.selector,
            inputs: dep.inputs.propertyNames,
            outputs: dep.outputs.propertyNames,
            exportAs: dep.exportAs,
            isComponent: dep.isComponent
          });
          break;
        case MetaKind.NgModule:
          const ngModuleType = this.refEmitter.emit(dep.ref, context);
          assertSuccessfulReferenceEmit(ngModuleType, node.name, "NgModule");
          declarations.set(dep.ref.node, {
            kind: R3TemplateDependencyKind.NgModule,
            type: ngModuleType.expression,
            importedFile: ngModuleType.importedFile
          });
          break;
      }
    }
    for (const [localName, dep] of pipes) {
      if (!wholeTemplateUsed.has(dep.ref.node)) {
        continue;
      }
      const pipeType = this.refEmitter.emit(dep.ref, context);
      assertSuccessfulReferenceEmit(pipeType, node.name, "pipe");
      declarations.set(dep.ref.node, {
        kind: R3TemplateDependencyKind.Pipe,
        type: pipeType.expression,
        // Use the local name for pipes to account for selectorless.
        name: localName,
        ref: dep.ref,
        importedFile: pipeType.importedFile
      });
    }
    return declarations;
  }
  /** Handles any cycles in the dependencies of a component. */
  handleDependencyCycles(node, context, scope, data, analysis, metadata, declarations, eagerlyUsed, symbol) {
    const eagerDeclarations = Array.from(declarations.values()).filter((decl) => {
      return decl.kind === R3TemplateDependencyKind.NgModule || eagerlyUsed.has(decl.ref.node);
    });
    const cyclesFromDirectives = /* @__PURE__ */ new Map();
    const cyclesFromPipes = /* @__PURE__ */ new Map();
    if (!metadata.isStandalone) {
      for (const usedDep of eagerDeclarations) {
        const cycle = this._checkForCyclicImport(usedDep.importedFile, usedDep.type, context);
        if (cycle !== null) {
          switch (usedDep.kind) {
            case R3TemplateDependencyKind.Directive:
              cyclesFromDirectives.set(usedDep, cycle);
              break;
            case R3TemplateDependencyKind.Pipe:
              cyclesFromPipes.set(usedDep, cycle);
              break;
          }
        }
      }
    }
    const standaloneImportMayBeForwardDeclared = analysis.resolvedImports !== null && analysis.resolvedImports.some((ref) => ref.synthetic);
    const cycleDetected = cyclesFromDirectives.size !== 0 || cyclesFromPipes.size !== 0;
    if (!cycleDetected) {
      for (const { type, importedFile } of eagerDeclarations) {
        this.maybeRecordSyntheticImport(importedFile, type, context);
      }
      const declarationIsForwardDeclared = eagerDeclarations.some((decl) => isExpressionForwardReference(decl.type, node.name, context));
      if (this.compilationMode !== CompilationMode.LOCAL && (declarationIsForwardDeclared || standaloneImportMayBeForwardDeclared)) {
        data.declarationListEmitMode = 1;
      }
      data.declarations = eagerDeclarations;
      if (this.compilationMode === CompilationMode.LOCAL && this.localCompilationExtraImportsTracker !== null) {
        for (const { type } of eagerDeclarations) {
          if (type instanceof ExternalExpr8 && type.value.moduleName) {
            this.localCompilationExtraImportsTracker.addImportForFile(context, type.value.moduleName);
          }
        }
      }
    } else if (this.cycleHandlingStrategy === 0) {
      this.scopeRegistry.setComponentRemoteScope(node, eagerDeclarations.filter(isUsedDirective).map((dir) => dir.ref), eagerDeclarations.filter(isUsedPipe).map((pipe) => pipe.ref));
      symbol.isRemotelyScoped = true;
      if (this.semanticDepGraphUpdater !== null && scope.kind === ComponentScopeKind.NgModule && scope.ngModule !== null) {
        const moduleSymbol = this.semanticDepGraphUpdater.getSymbol(scope.ngModule);
        if (!(moduleSymbol instanceof NgModuleSymbol)) {
          throw new Error(`AssertionError: Expected ${scope.ngModule.name} to be an NgModuleSymbol.`);
        }
        moduleSymbol.addRemotelyScopedComponent(symbol, symbol.usedDirectives, symbol.usedPipes);
      }
    } else {
      const relatedMessages = [];
      for (const [dir, cycle] of cyclesFromDirectives) {
        relatedMessages.push(makeCyclicImportInfo(dir.ref, dir.isComponent ? "component" : "directive", cycle));
      }
      for (const [pipe, cycle] of cyclesFromPipes) {
        relatedMessages.push(makeCyclicImportInfo(pipe.ref, "pipe", cycle));
      }
      throw new FatalDiagnosticError(ErrorCode.IMPORT_CYCLE_DETECTED, node, "One or more import cycles would need to be created to compile this component, which is not supported by the current compiler configuration.", relatedMessages);
    }
  }
  /** Produces diagnostics that require more than local information. */
  getNonLocalDiagnostics(node, analysis) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      throw new Error("Method cannot be called in local compilation mode.");
    }
    let diagnostics = null;
    if (analysis.resolvedImports !== null && analysis.rawImports !== null) {
      const importDiagnostics = validateStandaloneImports(
        analysis.resolvedImports,
        analysis.rawImports,
        this.metaReader,
        this.scopeReader,
        false
        /* isDeferredImport */
      );
      diagnostics ??= [];
      diagnostics.push(...importDiagnostics);
    }
    if (analysis.resolvedDeferredImports !== null && analysis.rawDeferredImports !== null) {
      const importDiagnostics = validateStandaloneImports(
        analysis.resolvedDeferredImports,
        analysis.rawDeferredImports,
        this.metaReader,
        this.scopeReader,
        true
        /* isDeferredImport */
      );
      diagnostics ??= [];
      diagnostics.push(...importDiagnostics);
    }
    if (analysis.providersRequiringFactory !== null && analysis.meta.providers instanceof o4.WrappedNodeExpr) {
      const providerDiagnostics = getProviderDiagnostics(analysis.providersRequiringFactory, analysis.meta.providers.node, this.injectableRegistry);
      diagnostics ??= [];
      diagnostics.push(...providerDiagnostics);
    }
    if (analysis.viewProvidersRequiringFactory !== null && analysis.meta.viewProviders instanceof o4.WrappedNodeExpr) {
      const viewProviderDiagnostics = getProviderDiagnostics(analysis.viewProvidersRequiringFactory, analysis.meta.viewProviders.node, this.injectableRegistry);
      diagnostics ??= [];
      diagnostics.push(...viewProviderDiagnostics);
    }
    const directiveDiagnostics = getDirectiveDiagnostics(node, this.injectableRegistry, this.evaluator, this.reflector, this.scopeRegistry, this.strictCtorDeps, "Component");
    if (directiveDiagnostics !== null) {
      diagnostics ??= [];
      diagnostics.push(...directiveDiagnostics);
    }
    const hostDirectivesDiagnostics = analysis.hostDirectives && analysis.rawHostDirectives ? validateHostDirectives(analysis.rawHostDirectives, analysis.hostDirectives, this.metaReader) : null;
    if (hostDirectivesDiagnostics !== null) {
      diagnostics ??= [];
      diagnostics.push(...hostDirectivesDiagnostics);
    }
    return diagnostics;
  }
  /**
   * Locates defer blocks in case scope information is not available.
   * For example, this happens in the local compilation mode.
   */
  locateDeferBlocksWithoutScope(template) {
    const deferBlocks = /* @__PURE__ */ new Map();
    const directivelessBinder = new R3TargetBinder2(null);
    const bound = directivelessBinder.bind({ template: template.nodes });
    const deferredBlocks = bound.getDeferBlocks();
    for (const block of deferredBlocks) {
      deferBlocks.set(block, []);
    }
    return deferBlocks;
  }
  /**
   * Computes a list of deferrable symbols based on dependencies from
   * the `@Component.imports` field and their usage in `@defer` blocks.
   */
  resolveAllDeferredDependencies(resolution) {
    const seenDeps = /* @__PURE__ */ new Set();
    const deferrableTypes = [];
    for (const [_, deps] of resolution.deferPerBlockDependencies) {
      for (const deferBlockDep of deps) {
        const node = deferBlockDep.declaration.node;
        const importInfo = resolution.deferrableDeclToImportDecl.get(node) ?? null;
        if (importInfo !== null && this.deferredSymbolTracker.canDefer(importInfo.node)) {
          deferBlockDep.isDeferrable = true;
          deferBlockDep.symbolName = importInfo.name;
          deferBlockDep.importPath = importInfo.from;
          deferBlockDep.isDefaultImport = isDefaultImport(importInfo.node);
          if (!seenDeps.has(node)) {
            seenDeps.add(node);
            deferrableTypes.push(deferBlockDep);
          }
        }
      }
    }
    return deferrableTypes;
  }
  /**
   * Collects deferrable symbols from the `@Component.deferredImports` field.
   */
  collectExplicitlyDeferredSymbols(rawDeferredImports) {
    const deferredTypes = /* @__PURE__ */ new Map();
    if (!ts39.isArrayLiteralExpression(rawDeferredImports)) {
      return deferredTypes;
    }
    for (const element of rawDeferredImports.elements) {
      const node = tryUnwrapForwardRef(element, this.reflector) || element;
      if (!ts39.isIdentifier(node)) {
        continue;
      }
      const imp = this.reflector.getImportOfIdentifier(node);
      if (imp !== null) {
        deferredTypes.set(node, imp);
      }
    }
    return deferredTypes;
  }
  /**
   * Check whether adding an import from `origin` to the source-file corresponding to `expr` would
   * create a cyclic import.
   *
   * @returns a `Cycle` object if a cycle would be created, otherwise `null`.
   */
  _checkForCyclicImport(importedFile, expr, origin) {
    const imported = resolveImportedFile(this.moduleResolver, importedFile, expr, origin);
    if (imported === null) {
      return null;
    }
    return this.cycleAnalyzer.wouldCreateCycle(origin, imported);
  }
  maybeRecordSyntheticImport(importedFile, expr, origin) {
    const imported = resolveImportedFile(this.moduleResolver, importedFile, expr, origin);
    if (imported === null) {
      return;
    }
    this.cycleAnalyzer.recordSyntheticImport(origin, imported);
  }
  /**
   * Resolves imported foreign components for code generation.
   */
  resolveForeignComponentImports(analysis) {
    if (analysis.foreignImports === null || analysis.foreignImports.length === 0) {
      return null;
    }
    return analysis.foreignImports.map((foreignMeta) => {
      const { name, rawExpression } = foreignMeta;
      ts39.setEmitFlags(rawExpression, ts39.EmitFlags.NoComments | ts39.EmitFlags.NoNestedComments);
      return {
        name,
        component: new o4.WrappedNodeExpr(rawExpression)
      };
    });
  }
  /**
   * Resolves information about defer blocks dependencies to make it
   * available for the final `compile` step.
   */
  resolveDeferBlocks(componentClassDecl, scope, deferBlocks, deferrableDecls, resolutionData, analysisData, eagerlyUsedDecls) {
    const allDeferredDecls = /* @__PURE__ */ new Set();
    for (const [deferBlock, bound] of deferBlocks) {
      const usedDirectives = new Set(bound.getEagerlyUsedDirectives().map((d) => d.ref.node));
      const usedPipes = new Set(bound.getEagerlyUsedPipes());
      let deps;
      if (resolutionData.deferPerBlockDependencies.has(deferBlock)) {
        deps = resolutionData.deferPerBlockDependencies.get(deferBlock);
      } else {
        deps = [];
        resolutionData.deferPerBlockDependencies.set(deferBlock, deps);
      }
      for (const decl of Array.from(deferrableDecls.values())) {
        if (decl.kind === R3TemplateDependencyKind.NgModule) {
          continue;
        }
        if (decl.kind === R3TemplateDependencyKind.Directive && !usedDirectives.has(decl.ref.node)) {
          continue;
        }
        if (decl.kind === R3TemplateDependencyKind.Pipe && !usedPipes.has(decl.name)) {
          continue;
        }
        deps.push({
          typeReference: decl.type,
          symbolName: decl.ref.node.name.text,
          isDeferrable: false,
          importPath: null,
          isDefaultImport: false,
          declaration: decl.ref
        });
        allDeferredDecls.add(decl.ref.node);
      }
    }
    if (analysisData.meta.isStandalone) {
      if (analysisData.rawImports !== null && ts39.isArrayLiteralExpression(analysisData.rawImports)) {
        for (const element of analysisData.rawImports.elements) {
          this.registerDeferrableCandidate(componentClassDecl, element, false, allDeferredDecls, eagerlyUsedDecls, resolutionData);
        }
      }
      if (analysisData.rawDeferredImports !== null && ts39.isArrayLiteralExpression(analysisData.rawDeferredImports)) {
        for (const element of analysisData.rawDeferredImports.elements) {
          this.registerDeferrableCandidate(componentClassDecl, element, false, allDeferredDecls, eagerlyUsedDecls, resolutionData);
        }
      }
      if (scope.kind === ComponentScopeKind.Selectorless) {
        for (const identifier of scope.dependencyIdentifiers) {
          this.registerDeferrableCandidate(componentClassDecl, identifier, false, allDeferredDecls, eagerlyUsedDecls, resolutionData);
        }
      }
    }
  }
  /**
   * Inspects provided imports expression (either `@Component.imports` or
   * `@Component.deferredImports`) and registers imported types as deferrable
   * candidates.
   */
  registerDeferrableCandidate(componentClassDecl, element, isDeferredImport, allDeferredDecls, eagerlyUsedDecls, resolutionData) {
    const node = tryUnwrapForwardRef(element, this.reflector) || element;
    if (!ts39.isIdentifier(node)) {
      return;
    }
    const imp = this.reflector.getImportOfIdentifier(node);
    if (imp === null) {
      return;
    }
    const decl = this.reflector.getDeclarationOfIdentifier(node);
    if (decl === null) {
      return;
    }
    if (!isNamedClassDeclaration(decl.node)) {
      return;
    }
    if (!allDeferredDecls.has(decl.node)) {
      return;
    }
    if (eagerlyUsedDecls.has(decl.node)) {
      return;
    }
    const dirMeta = this.metaReader.getDirectiveMetadata(new Reference(decl.node));
    if (dirMeta !== null && !dirMeta.isStandalone) {
      return;
    }
    const pipeMeta = this.metaReader.getPipeMetadata(new Reference(decl.node));
    if (pipeMeta !== null && !pipeMeta.isStandalone) {
      return;
    }
    if (dirMeta === null && pipeMeta === null) {
      return;
    }
    resolutionData.deferrableDeclToImportDecl.set(decl.node, imp);
    this.deferredSymbolTracker.markAsDeferrableCandidate(node, imp.node, componentClassDecl, isDeferredImport);
  }
  compileDeferBlocks(resolution) {
    const { deferBlockDepsEmitMode: mode, deferPerBlockDependencies: perBlockDeps, deferPerComponentDependencies: perComponentDeps } = resolution;
    if (mode === 0) {
      if (!perBlockDeps) {
        throw new Error("Internal error: deferPerBlockDependencies must be present when compiling in PerBlock mode");
      }
      const blocks = /* @__PURE__ */ new Map();
      for (const [block, dependencies] of perBlockDeps) {
        blocks.set(block, dependencies.length === 0 ? null : compileDeferResolverFunction({ mode, dependencies }));
      }
      return { mode, blocks };
    }
    if (mode === 1) {
      if (!perComponentDeps) {
        throw new Error("Internal error: deferPerComponentDependencies must be present in PerComponent mode");
      }
      return {
        mode,
        dependenciesFn: perComponentDeps.length === 0 ? null : compileDeferResolverFunction({ mode, dependencies: perComponentDeps })
      };
    }
    throw new Error(`Invalid deferBlockDepsEmitMode. Cannot compile deferred block metadata.`);
  }
  /** Creates a new binding parser. */
  getNewBindingParser() {
    return makeBindingParser2(this.enableSelectorless);
  }
};
function createMatcherFromScope(scope, hostDirectivesResolver) {
  if (scope.kind === ComponentScopeKind.Selectorless) {
    const registry = /* @__PURE__ */ new Map();
    for (const [name, dep] of scope.dependencies) {
      if (dep.kind === MetaKind.Directive) {
        registry.set(name, [dep, ...hostDirectivesResolver.resolve(dep)]);
      }
    }
    return new SelectorlessMatcher2(registry);
  }
  const matcher = new SelectorMatcher2();
  const dependencies = scope.kind === ComponentScopeKind.NgModule ? scope.compilation.dependencies : scope.dependencies;
  for (const dep of dependencies) {
    if (dep.kind === MetaKind.Directive && dep.selector !== null) {
      matcher.addSelectables(CssSelector3.parse(dep.selector), [dep]);
    }
  }
  return matcher;
}
function removeDeferrableTypesFromComponentDecorator(analysis, deferrableTypes) {
  if (analysis.classMetadata) {
    const deferrableSymbols = new Set(deferrableTypes.map((t) => t.symbolName));
    const rewrittenDecoratorsNode = removeIdentifierReferences(analysis.classMetadata.decorators.node, deferrableSymbols);
    analysis.classMetadata.decorators = new o4.WrappedNodeExpr(rewrittenDecoratorsNode);
  }
}
function validateNoImportOverlap(eagerDeps, deferredDeps, rawDeferredImports) {
  let diagnostic = null;
  const eagerDepsSet = /* @__PURE__ */ new Set();
  for (const eagerDep of eagerDeps) {
    eagerDepsSet.add(eagerDep.ref.node);
  }
  for (const deferredDep of deferredDeps) {
    if (eagerDepsSet.has(deferredDep.ref.node)) {
      const classInfo = deferredDep.ref.debugName ? `The \`${deferredDep.ref.debugName}\`` : "One of the dependencies";
      diagnostic = makeDiagnostic(ErrorCode.DEFERRED_DEPENDENCY_IMPORTED_EAGERLY, getDiagnosticNode(deferredDep.ref, rawDeferredImports), `\`${classInfo}\` is imported via both \`@Component.imports\` and \`@Component.deferredImports\`. To fix this, make sure that dependencies are imported only once.`);
      break;
    }
  }
  return diagnostic;
}
function validateStandaloneImports(importRefs, importExpr, metaReader, scopeReader, isDeferredImport) {
  const diagnostics = [];
  for (const ref of importRefs) {
    const dirMeta = metaReader.getDirectiveMetadata(ref);
    if (dirMeta !== null) {
      if (!dirMeta.isStandalone) {
        diagnostics.push(makeNotStandaloneDiagnostic(scopeReader, ref, importExpr, dirMeta.isComponent ? "component" : "directive"));
      }
      continue;
    }
    const pipeMeta = metaReader.getPipeMetadata(ref);
    if (pipeMeta !== null) {
      if (!pipeMeta.isStandalone) {
        diagnostics.push(makeNotStandaloneDiagnostic(scopeReader, ref, importExpr, "pipe"));
      }
      continue;
    }
    const ngModuleMeta = metaReader.getNgModuleMetadata(ref);
    if (!isDeferredImport && ngModuleMeta !== null) {
      continue;
    }
    const error = isDeferredImport ? makeUnknownComponentDeferredImportDiagnostic(ref, importExpr) : makeUnknownComponentImportDiagnostic(ref, importExpr);
    diagnostics.push(error);
  }
  return diagnostics;
}
function isDefaultImport(node) {
  return node.importClause !== void 0 && node.importClause.namedBindings === void 0;
}

// packages/compiler-cli/src/ngtsc/annotations/src/injectable.js
import { compileClassMetadata as compileClassMetadata3, compileDeclareClassMetadata as compileDeclareClassMetadata3, compileDeclareInjectableFromMetadata, compileInjectable, createMayBeForwardRefExpression as createMayBeForwardRefExpression3, FactoryTarget as FactoryTarget4, LiteralExpr as LiteralExpr3, WrappedNodeExpr as WrappedNodeExpr10 } from "@angular/compiler";
import ts40 from "typescript";
var InjectableDecoratorHandler = class {
  reflector;
  evaluator;
  isCore;
  strictCtorDeps;
  injectableRegistry;
  perf;
  includeClassMetadata;
  compilationMode;
  errorOnDuplicateProv;
  constructor(reflector, evaluator, isCore, strictCtorDeps, injectableRegistry, perf, includeClassMetadata, compilationMode, errorOnDuplicateProv = true) {
    this.reflector = reflector;
    this.evaluator = evaluator;
    this.isCore = isCore;
    this.strictCtorDeps = strictCtorDeps;
    this.injectableRegistry = injectableRegistry;
    this.perf = perf;
    this.includeClassMetadata = includeClassMetadata;
    this.compilationMode = compilationMode;
    this.errorOnDuplicateProv = errorOnDuplicateProv;
  }
  precedence = HandlerPrecedence.SHARED;
  name = "InjectableDecoratorHandler";
  detect(node, decorators) {
    if (!decorators) {
      return void 0;
    }
    const decorator = findAngularDecorator(decorators, "Injectable", this.isCore);
    if (decorator !== void 0) {
      return {
        trigger: decorator.node,
        decorator,
        metadata: decorator
      };
    } else {
      return void 0;
    }
  }
  analyze(node, decorator) {
    this.perf.eventCount(PerfEvent.AnalyzeInjectable);
    const meta = extractInjectableMetadata(node, decorator, this.reflector);
    const decorators = this.reflector.getDecoratorsOfDeclaration(node);
    return {
      analysis: {
        meta,
        ctorDeps: extractInjectableCtorDeps(node, meta, decorator, this.reflector, this.isCore, this.strictCtorDeps),
        classMetadata: this.includeClassMetadata ? extractClassMetadata(node, this.reflector, this.isCore) : null,
        // Avoid generating multiple factories if a class has
        // more Angular decorators, apart from Injectable.
        needsFactory: !decorators || decorators.every((current) => !isAngularCore(current) || current.name === "Injectable")
      }
    };
  }
  symbol() {
    return null;
  }
  register(node, analysis) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      return;
    }
    this.injectableRegistry.registerInjectable(node, {
      ctorDeps: analysis.ctorDeps
    });
  }
  resolve(node, analysis) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      return {};
    }
    if (requiresValidCtor(analysis.meta)) {
      const diagnostic = checkInheritanceOfInjectable(node, this.injectableRegistry, this.reflector, this.evaluator, this.strictCtorDeps, "Injectable");
      if (diagnostic !== null) {
        return {
          diagnostics: [diagnostic]
        };
      }
    }
    return {};
  }
  compileFull(node, analysis) {
    return this.compile(compileNgFactoryDefField, (meta) => compileInjectable(meta, false), compileClassMetadata3, node, analysis);
  }
  compilePartial(node, analysis) {
    return this.compile(compileDeclareFactory, compileDeclareInjectableFromMetadata, compileDeclareClassMetadata3, node, analysis);
  }
  compileLocal(node, analysis) {
    return this.compile(compileNgFactoryDefField, (meta) => compileInjectable(meta, false), compileClassMetadata3, node, analysis);
  }
  compile(compileFactoryFn, compileInjectableFn, compileClassMetadataFn, node, analysis) {
    const results = [];
    if (analysis.needsFactory) {
      const meta = analysis.meta;
      const factoryRes = compileFactoryFn(toFactoryMetadata({ ...meta, deps: analysis.ctorDeps }, FactoryTarget4.Injectable));
      if (analysis.classMetadata !== null) {
        factoryRes.statements.push(compileClassMetadataFn(analysis.classMetadata).toStmt());
      }
      results.push(factoryRes);
    }
    const \u0275prov = this.reflector.getMembersOfClass(node).find((member) => member.name === "\u0275prov");
    if (\u0275prov !== void 0 && this.errorOnDuplicateProv) {
      throw new FatalDiagnosticError(ErrorCode.INJECTABLE_DUPLICATE_PROV, \u0275prov.nameNode || \u0275prov.node || node, "Injectables cannot contain a static \u0275prov property, because the compiler is going to generate one.");
    }
    if (\u0275prov === void 0) {
      const res = compileInjectableFn(analysis.meta);
      results.push({
        name: "\u0275prov",
        initializer: res.expression,
        statements: res.statements,
        type: res.type,
        deferrableImports: null
      });
    }
    return results;
  }
};
function extractInjectableMetadata(clazz, decorator, reflector) {
  const name = clazz.name.text;
  const type = wrapTypeReference(clazz);
  const typeArgumentCount = reflector.getGenericArityOfClass(clazz) || 0;
  if (decorator.args === null) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_NOT_CALLED, decorator.node, "@Injectable must be called");
  }
  if (decorator.args.length === 0) {
    return {
      name,
      type,
      typeArgumentCount,
      providedIn: createMayBeForwardRefExpression3(
        new LiteralExpr3(null),
        0
        /* ForwardRefHandling.None */
      )
    };
  } else if (decorator.args.length === 1) {
    const metaNode = decorator.args[0];
    if (!ts40.isObjectLiteralExpression(metaNode)) {
      throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARG_NOT_LITERAL, metaNode, `@Injectable argument must be an object literal`);
    }
    const meta = reflectObjectLiteral(metaNode);
    const providedIn = meta.has("providedIn") ? getProviderExpression(meta.get("providedIn"), reflector) : createMayBeForwardRefExpression3(
      new LiteralExpr3(null),
      0
      /* ForwardRefHandling.None */
    );
    let deps = void 0;
    if ((meta.has("useClass") || meta.has("useFactory")) && meta.has("deps")) {
      const depsExpr = meta.get("deps");
      if (!ts40.isArrayLiteralExpression(depsExpr)) {
        throw new FatalDiagnosticError(ErrorCode.VALUE_NOT_LITERAL, depsExpr, `@Injectable deps metadata must be an inline array`);
      }
      deps = depsExpr.elements.map((dep) => getDep(dep, reflector));
    }
    const result = { name, type, typeArgumentCount, providedIn };
    if (meta.has("useValue")) {
      result.useValue = getProviderExpression(meta.get("useValue"), reflector);
    } else if (meta.has("useExisting")) {
      result.useExisting = getProviderExpression(meta.get("useExisting"), reflector);
    } else if (meta.has("useClass")) {
      result.useClass = getProviderExpression(meta.get("useClass"), reflector);
      result.deps = deps;
    } else if (meta.has("useFactory")) {
      result.useFactory = new WrappedNodeExpr10(meta.get("useFactory"));
      result.deps = deps;
    }
    return result;
  } else {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARITY_WRONG, decorator.args[2], "Too many arguments to @Injectable");
  }
}
function getProviderExpression(expression, reflector) {
  const forwardRefValue = tryUnwrapForwardRef(expression, reflector);
  return createMayBeForwardRefExpression3(
    new WrappedNodeExpr10(forwardRefValue ?? expression),
    forwardRefValue !== null ? 2 : 0
    /* ForwardRefHandling.None */
  );
}
function extractInjectableCtorDeps(clazz, meta, decorator, reflector, isCore, strictCtorDeps) {
  if (decorator.args === null) {
    throw new FatalDiagnosticError(ErrorCode.DECORATOR_NOT_CALLED, decorator.node, "@Injectable must be called");
  }
  let ctorDeps = null;
  if (decorator.args.length === 0) {
    if (strictCtorDeps && !isAbstractClassDeclaration(clazz)) {
      ctorDeps = getValidConstructorDependencies(clazz, reflector, isCore);
    } else {
      ctorDeps = unwrapConstructorDependencies(getConstructorDependencies(clazz, reflector, isCore));
    }
    return ctorDeps;
  } else if (decorator.args.length === 1) {
    const rawCtorDeps = getConstructorDependencies(clazz, reflector, isCore);
    if (strictCtorDeps && !isAbstractClassDeclaration(clazz) && requiresValidCtor(meta)) {
      ctorDeps = validateConstructorDependencies(clazz, rawCtorDeps);
    } else {
      ctorDeps = unwrapConstructorDependencies(rawCtorDeps);
    }
  }
  return ctorDeps;
}
function requiresValidCtor(meta) {
  return meta.useValue === void 0 && meta.useExisting === void 0 && meta.useClass === void 0 && meta.useFactory === void 0;
}
function getDep(dep, reflector) {
  const meta = {
    token: new WrappedNodeExpr10(dep),
    attributeNameType: null,
    host: false,
    optional: false,
    self: false,
    skipSelf: false
  };
  function maybeUpdateDecorator(dec, reflector2, token) {
    const source = reflector2.getImportOfIdentifier(dec);
    if (source === null || source.from !== "@angular/core") {
      return false;
    }
    switch (source.name) {
      case "Inject":
        if (token !== void 0) {
          meta.token = new WrappedNodeExpr10(token);
        }
        break;
      case "Optional":
        meta.optional = true;
        break;
      case "SkipSelf":
        meta.skipSelf = true;
        break;
      case "Self":
        meta.self = true;
        break;
      default:
        return false;
    }
    return true;
  }
  if (ts40.isArrayLiteralExpression(dep)) {
    dep.elements.forEach((el) => {
      let isDecorator = false;
      if (ts40.isIdentifier(el)) {
        isDecorator = maybeUpdateDecorator(el, reflector);
      } else if (ts40.isNewExpression(el) && ts40.isIdentifier(el.expression)) {
        const token = el.arguments && el.arguments.length > 0 && el.arguments[0] || void 0;
        isDecorator = maybeUpdateDecorator(el.expression, reflector, token);
      }
      if (!isDecorator) {
        meta.token = new WrappedNodeExpr10(el);
      }
    });
  }
  return meta;
}

// packages/compiler-cli/src/ngtsc/annotations/src/pipe.js
import { compileClassMetadata as compileClassMetadata4, compileDeclareClassMetadata as compileDeclareClassMetadata4, compileDeclarePipeFromMetadata, compilePipeFromMetadata, FactoryTarget as FactoryTarget5 } from "@angular/compiler";
import ts41 from "typescript";
var PipeSymbol = class _PipeSymbol extends SemanticSymbol {
  name;
  constructor(decl, name) {
    super(decl);
    this.name = name;
  }
  isPublicApiAffected(previousSymbol) {
    if (!(previousSymbol instanceof _PipeSymbol)) {
      return true;
    }
    return this.name !== previousSymbol.name;
  }
  isTypeCheckApiAffected(previousSymbol) {
    return this.isPublicApiAffected(previousSymbol);
  }
};
var PipeDecoratorHandler = class {
  reflector;
  evaluator;
  metaRegistry;
  scopeRegistry;
  injectableRegistry;
  isCore;
  perf;
  includeClassMetadata;
  compilationMode;
  generateExtraImportsInLocalMode;
  strictStandalone;
  implicitStandaloneValue;
  constructor(reflector, evaluator, metaRegistry, scopeRegistry, injectableRegistry, isCore, perf, includeClassMetadata, compilationMode, generateExtraImportsInLocalMode, strictStandalone, implicitStandaloneValue) {
    this.reflector = reflector;
    this.evaluator = evaluator;
    this.metaRegistry = metaRegistry;
    this.scopeRegistry = scopeRegistry;
    this.injectableRegistry = injectableRegistry;
    this.isCore = isCore;
    this.perf = perf;
    this.includeClassMetadata = includeClassMetadata;
    this.compilationMode = compilationMode;
    this.generateExtraImportsInLocalMode = generateExtraImportsInLocalMode;
    this.strictStandalone = strictStandalone;
    this.implicitStandaloneValue = implicitStandaloneValue;
  }
  precedence = HandlerPrecedence.PRIMARY;
  name = "PipeDecoratorHandler";
  detect(node, decorators) {
    if (!decorators) {
      return void 0;
    }
    const decorator = findAngularDecorator(decorators, "Pipe", this.isCore);
    if (decorator !== void 0) {
      return {
        trigger: decorator.node,
        decorator,
        metadata: decorator
      };
    } else {
      return void 0;
    }
  }
  isStandalone(decorator) {
    return parseStandaloneOption(decorator, this.evaluator, this.implicitStandaloneValue);
  }
  analyze(clazz, decorator) {
    this.perf.eventCount(PerfEvent.AnalyzePipe);
    const name = clazz.name.text;
    const type = wrapTypeReference(clazz);
    if (decorator.args === null) {
      throw new FatalDiagnosticError(ErrorCode.DECORATOR_NOT_CALLED, decorator.node, `@Pipe must be called`);
    }
    const meta = decorator.args.length === 0 || // TODO(crisbeto): temporary for testing until we've changed
    // the pipe public API not to require a name.
    ts41.isNonNullExpression(decorator.args[0]) && decorator.args[0].expression.kind === ts41.SyntaxKind.NullKeyword ? null : unwrapExpression(decorator.args[0]);
    let pipeName = null;
    let pipeNameExpr = null;
    let pure = true;
    let isStandalone = this.implicitStandaloneValue;
    if (meta !== null) {
      if (!ts41.isObjectLiteralExpression(meta)) {
        throw new FatalDiagnosticError(ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, "@Pipe must have a literal argument");
      }
      const pipe = reflectObjectLiteral(meta);
      if (!pipe.has("name")) {
        throw new FatalDiagnosticError(ErrorCode.PIPE_MISSING_NAME, meta, `@Pipe decorator is missing name field`);
      }
      pipeNameExpr = pipe.get("name");
      const evaluatedName = this.evaluator.evaluate(pipeNameExpr);
      if (typeof evaluatedName !== "string") {
        throw createValueHasWrongTypeError(pipeNameExpr, evaluatedName, `@Pipe.name must be a string`);
      }
      pipeName = evaluatedName;
      if (pipe.has("pure")) {
        const expr = pipe.get("pure");
        const pureValue = this.evaluator.evaluate(expr);
        if (typeof pureValue !== "boolean") {
          throw createValueHasWrongTypeError(expr, pureValue, `@Pipe.pure must be a boolean`);
        }
        pure = pureValue;
      }
      if (pipe.has("standalone")) {
        const expr = pipe.get("standalone");
        const resolved = this.evaluator.evaluate(expr);
        if (typeof resolved !== "boolean") {
          throw createValueHasWrongTypeError(expr, resolved, `standalone flag must be a boolean`);
        }
        isStandalone = resolved;
        if (!isStandalone && this.strictStandalone) {
          throw new FatalDiagnosticError(ErrorCode.NON_STANDALONE_NOT_ALLOWED, expr, `Only standalone pipes are allowed when 'strictStandalone' is enabled.`);
        }
      }
    }
    return {
      analysis: {
        meta: {
          name,
          type,
          typeArgumentCount: this.reflector.getGenericArityOfClass(clazz) || 0,
          pipeName,
          deps: getValidConstructorDependencies(clazz, this.reflector, this.isCore),
          pure,
          isStandalone
        },
        classMetadata: this.includeClassMetadata ? extractClassMetadata(clazz, this.reflector, this.isCore) : null,
        pipeNameExpr,
        decorator: decorator?.node ?? null
      }
    };
  }
  symbol(node, analysis) {
    return new PipeSymbol(node, analysis.meta.pipeName ?? analysis.meta.name);
  }
  register(node, analysis) {
    const ref = new Reference(node);
    this.metaRegistry.registerPipeMetadata({
      kind: MetaKind.Pipe,
      ref,
      name: analysis.meta.pipeName,
      nameExpr: analysis.pipeNameExpr,
      isStandalone: analysis.meta.isStandalone,
      decorator: analysis.decorator,
      isExplicitlyDeferred: false,
      isPure: analysis.meta.pure
    });
    this.injectableRegistry.registerInjectable(node, {
      ctorDeps: analysis.meta.deps
    });
  }
  resolve(node) {
    if (this.compilationMode === CompilationMode.LOCAL) {
      return {};
    }
    const duplicateDeclData = this.scopeRegistry.getDuplicateDeclarations(node);
    if (duplicateDeclData !== null) {
      return {
        diagnostics: [makeDuplicateDeclarationError(node, duplicateDeclData, "Pipe")]
      };
    }
    return {};
  }
  compileFull(node, analysis) {
    const fac = compileNgFactoryDefField(toFactoryMetadata(analysis.meta, FactoryTarget5.Pipe));
    const def = compilePipeFromMetadata(analysis.meta);
    const classMetadata = analysis.classMetadata !== null ? compileClassMetadata4(analysis.classMetadata).toStmt() : null;
    return compileResults(
      fac,
      def,
      classMetadata,
      "\u0275pipe",
      null,
      null
      /* deferrableImports */
    );
  }
  compilePartial(node, analysis) {
    const fac = compileDeclareFactory(toFactoryMetadata(analysis.meta, FactoryTarget5.Pipe));
    const def = compileDeclarePipeFromMetadata(analysis.meta);
    const classMetadata = analysis.classMetadata !== null ? compileDeclareClassMetadata4(analysis.classMetadata).toStmt() : null;
    return compileResults(
      fac,
      def,
      classMetadata,
      "\u0275pipe",
      null,
      null
      /* deferrableImports */
    );
  }
  compileLocal(node, analysis) {
    const fac = compileNgFactoryDefField(toFactoryMetadata(analysis.meta, FactoryTarget5.Pipe));
    const def = compilePipeFromMetadata(analysis.meta);
    const classMetadata = analysis.classMetadata !== null ? compileClassMetadata4(analysis.classMetadata).toStmt() : null;
    return compileResults(
      fac,
      def,
      classMetadata,
      "\u0275pipe",
      null,
      null
      /* deferrableImports */
    );
  }
};

// packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/transform.js
import ts44 from "typescript";

// packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/transform_api.js
import ts42 from "typescript";
function createSyntheticAngularCoreDecoratorAccess(factory, importManager, ngClassDecorator, sourceFile, decoratorName) {
  const classDecoratorIdentifier = ts42.isIdentifier(ngClassDecorator.identifier) ? ngClassDecorator.identifier : ngClassDecorator.identifier.expression;
  return factory.createPropertyAccessExpression(
    importManager.addImport({
      exportModuleSpecifier: "@angular/core",
      exportSymbolName: null,
      requestedFile: sourceFile
    }),
    // The synthetic identifier may be checked later by the downlevel decorators
    // transform to resolve to an Angular import using `getSymbolAtLocation`. We trick
    // the transform to think it's not synthetic and comes from Angular core.
    ts42.setOriginalNode(factory.createIdentifier(decoratorName), classDecoratorIdentifier)
  );
}
function castAsAny(factory, expr) {
  return factory.createAsExpression(expr, factory.createKeywordTypeNode(ts42.SyntaxKind.AnyKeyword));
}

// packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/input_function.js
var signalInputsTransform = (member, sourceFile, host, factory, importTracker, importManager, classDecorator, isCore) => {
  if (host.getDecoratorsOfDeclaration(member.node)?.some((d) => isAngularDecorator2(d, "Input", isCore))) {
    return member.node;
  }
  const inputMapping = tryParseSignalInputMapping(member, host, importTracker);
  if (inputMapping === null) {
    return member.node;
  }
  const fields = {
    "isSignal": factory.createTrue(),
    "alias": factory.createStringLiteral(inputMapping.bindingPropertyName),
    "required": inputMapping.required ? factory.createTrue() : factory.createFalse(),
    // For signal inputs, transforms are captured by the input signal. The runtime will
    // determine whether a transform needs to be run via the input signal, so the `transform`
    // option is always `undefined`.
    "transform": factory.createIdentifier("undefined")
  };
  const newDecorator = factory.createDecorator(factory.createCallExpression(createSyntheticAngularCoreDecoratorAccess(factory, importManager, classDecorator, sourceFile, "Input"), void 0, [
    // Cast to `any` because `isSignal` will be private, and in case this
    // transform is used directly as a pre-compilation step, the decorator should
    // not fail. It is already validated now due to us parsing the input metadata.
    castAsAny(factory, factory.createObjectLiteralExpression(Object.entries(fields).map(([name, value]) => factory.createPropertyAssignment(name, value))))
  ]));
  return factory.updatePropertyDeclaration(member.node, [newDecorator, ...member.node.modifiers ?? []], member.name, member.node.questionToken, member.node.type, member.node.initializer);
};

// packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/model_function.js
import ts43 from "typescript";
var signalModelTransform = (member, sourceFile, host, factory, importTracker, importManager, classDecorator, isCore) => {
  if (host.getDecoratorsOfDeclaration(member.node)?.some((d) => {
    return isAngularDecorator2(d, "Input", isCore) || isAngularDecorator2(d, "Output", isCore);
  })) {
    return member.node;
  }
  const modelMapping = tryParseSignalModelMapping(member, host, importTracker);
  if (modelMapping === null) {
    return member.node;
  }
  const inputConfig = factory.createObjectLiteralExpression([
    factory.createPropertyAssignment("isSignal", modelMapping.input.isSignal ? factory.createTrue() : factory.createFalse()),
    factory.createPropertyAssignment("alias", factory.createStringLiteral(modelMapping.input.bindingPropertyName)),
    factory.createPropertyAssignment("required", modelMapping.input.required ? factory.createTrue() : factory.createFalse())
  ]);
  const inputDecorator = createDecorator(
    "Input",
    // Config is cast to `any` because `isSignal` will be private, and in case this
    // transform is used directly as a pre-compilation step, the decorator should
    // not fail. It is already validated now due to us parsing the input metadata.
    factory.createAsExpression(inputConfig, factory.createKeywordTypeNode(ts43.SyntaxKind.AnyKeyword)),
    classDecorator,
    factory,
    sourceFile,
    importManager
  );
  const outputDecorator = createDecorator("Output", factory.createStringLiteral(modelMapping.output.bindingPropertyName), classDecorator, factory, sourceFile, importManager);
  return factory.updatePropertyDeclaration(member.node, [inputDecorator, outputDecorator, ...member.node.modifiers ?? []], member.node.name, member.node.questionToken, member.node.type, member.node.initializer);
};
function createDecorator(name, config, classDecorator, factory, sourceFile, importManager) {
  const callTarget = createSyntheticAngularCoreDecoratorAccess(factory, importManager, classDecorator, sourceFile, name);
  return factory.createDecorator(factory.createCallExpression(callTarget, void 0, [config]));
}

// packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/output_function.js
var initializerApiOutputTransform = (member, sourceFile, host, factory, importTracker, importManager, classDecorator, isCore) => {
  if (host.getDecoratorsOfDeclaration(member.node)?.some((d) => isAngularDecorator2(d, "Output", isCore))) {
    return member.node;
  }
  const output = tryParseInitializerBasedOutput(member, host, importTracker);
  if (output === null) {
    return member.node;
  }
  const newDecorator = factory.createDecorator(factory.createCallExpression(createSyntheticAngularCoreDecoratorAccess(factory, importManager, classDecorator, sourceFile, "Output"), void 0, [factory.createStringLiteral(output.metadata.bindingPropertyName)]));
  return factory.updatePropertyDeclaration(member.node, [newDecorator, ...member.node.modifiers ?? []], member.node.name, member.node.questionToken, member.node.type, member.node.initializer);
};

// packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/query_functions.js
var queryFunctionToDecorator = {
  "viewChild": "ViewChild",
  "viewChildren": "ViewChildren",
  "contentChild": "ContentChild",
  "contentChildren": "ContentChildren"
};
var queryFunctionsTransforms = (member, sourceFile, host, factory, importTracker, importManager, classDecorator, isCore) => {
  const decorators = host.getDecoratorsOfDeclaration(member.node);
  const queryDecorators = decorators && getAngularDecorators(decorators, queryDecoratorNames, isCore);
  if (queryDecorators !== null && queryDecorators.length > 0) {
    return member.node;
  }
  const queryDefinition = tryParseSignalQueryFromInitializer(member, host, importTracker);
  if (queryDefinition === null) {
    return member.node;
  }
  const callArgs = queryDefinition.call.arguments;
  const newDecorator = factory.createDecorator(factory.createCallExpression(
    createSyntheticAngularCoreDecoratorAccess(factory, importManager, classDecorator, sourceFile, queryFunctionToDecorator[queryDefinition.name]),
    void 0,
    // All positional arguments of the query functions can be mostly re-used as is
    // for the decorator. i.e. predicate is always first argument. Options are second.
    [
      queryDefinition.call.arguments[0],
      // Note: Casting as `any` because `isSignal` is not publicly exposed and this
      // transform might pre-transform TS sources.
      castAsAny(factory, factory.createObjectLiteralExpression([
        ...callArgs.length > 1 ? [factory.createSpreadAssignment(callArgs[1])] : [],
        factory.createPropertyAssignment("isSignal", factory.createTrue())
      ]))
    ]
  ));
  return factory.updatePropertyDeclaration(member.node, [newDecorator, ...member.node.modifiers ?? []], member.node.name, member.node.questionToken, member.node.type, member.node.initializer);
};

// packages/compiler-cli/src/ngtsc/transform/jit/src/initializer_api_transforms/transform.js
var decoratorsWithInputs = ["Directive", "Component"];
var propertyTransforms = [
  signalInputsTransform,
  initializerApiOutputTransform,
  queryFunctionsTransforms,
  signalModelTransform
];
function getInitializerApiJitTransform(host, importTracker, isCore, shouldTransformClass) {
  return (ctx) => {
    return (sourceFile) => {
      const importManager = new ImportManager();
      sourceFile = ts44.visitNode(sourceFile, createTransformVisitor(ctx, host, importManager, importTracker, isCore, shouldTransformClass), ts44.isSourceFile);
      return importManager.transformTsFile(ctx, sourceFile);
    };
  };
}
function createTransformVisitor(ctx, host, importManager, importTracker, isCore, shouldTransformClass) {
  const visitor = (node) => {
    if (ts44.isClassDeclaration(node) && node.name !== void 0) {
      const originalNode = ts44.getOriginalNode(node, ts44.isClassDeclaration);
      const angularDecorator = host.getDecoratorsOfDeclaration(originalNode)?.find((d) => decoratorsWithInputs.some((name) => isAngularDecorator2(d, name, isCore)));
      if (angularDecorator !== void 0 && (shouldTransformClass === void 0 || shouldTransformClass(node))) {
        let hasChanged = false;
        const sourceFile = originalNode.getSourceFile();
        const members = node.members.map((memberNode) => {
          if (!ts44.isPropertyDeclaration(memberNode)) {
            return memberNode;
          }
          const member = reflectClassMember(memberNode);
          if (member === null) {
            return memberNode;
          }
          for (const transform of propertyTransforms) {
            const newNode = transform({ ...member, node: memberNode }, sourceFile, host, ctx.factory, importTracker, importManager, angularDecorator, isCore);
            if (newNode !== member.node) {
              hasChanged = true;
              return newNode;
            }
          }
          return memberNode;
        });
        if (hasChanged) {
          return ctx.factory.updateClassDeclaration(node, node.modifiers, node.name, node.typeParameters, node.heritageClauses, members);
        }
      }
    }
    return ts44.visitEachChild(node, visitor, ctx);
  };
  return visitor;
}

// packages/compiler-cli/src/ngtsc/transform/jit/src/index.js
function angularJitApplicationTransform(program, isCore = false, shouldTransformClass) {
  const typeChecker = program.getTypeChecker();
  const reflectionHost = new TypeScriptReflectionHost(typeChecker);
  const importTracker = new ImportedSymbolsTracker();
  const downlevelDecoratorTransform = getDownlevelDecoratorsTransform(
    typeChecker,
    reflectionHost,
    [],
    isCore,
    /* enableClosureCompiler */
    false,
    shouldTransformClass
  );
  const initializerApisJitTransform = getInitializerApiJitTransform(reflectionHost, importTracker, isCore, shouldTransformClass);
  return (ctx) => {
    return (sourceFile) => {
      sourceFile = initializerApisJitTransform(ctx)(sourceFile);
      sourceFile = downlevelDecoratorTransform(ctx)(sourceFile);
      return sourceFile;
    };
  };
}

export {
  getDownlevelDecoratorsTransform,
  findAngularDecorator,
  getAngularDecorators,
  unwrapExpression,
  createForwardRefResolver,
  readBaseClass,
  wrapTypeReference,
  toFactoryMetadata,
  CompilationMode,
  HandlerPrecedence,
  aliasTransformFactory,
  PerfPhase,
  PerfEvent,
  PerfCheckpoint,
  ActivePerfRecorder,
  DelegatingPerfRecorder,
  TraitCompiler,
  DtsTransformRegistry,
  declarationTransformFactory,
  ivyTransformFactory,
  signalMetadataTransform,
  compileNgFactoryDefField,
  compileDeclareFactory,
  InjectableClassRegistry,
  extractClassMetadata,
  NoopReferencesRegistry,
  JitDeclarationRegistry,
  SemanticDepGraphUpdater,
  ComponentScopeKind,
  CompoundComponentScopeReader,
  MetadataDtsModuleScopeResolver,
  LocalModuleScopeRegistry,
  SelectorlessComponentScopeReader,
  TypeCheckScopeRegistry,
  tryParseInitializerApi,
  INPUT_INITIALIZER_FN,
  MODEL_INITIALIZER_FN,
  OUTPUT_INITIALIZER_FNS,
  QUERY_INITIALIZER_FNS,
  queryDecoratorNames,
  extractDecoratorQueryMetadata,
  parseDecoratorInputTransformFunction,
  DirectiveDecoratorHandler,
  NgModuleDecoratorHandler,
  NgOriginalFile,
  InliningMode,
  isShim,
  untagAllTsFiles,
  retagAllTsFiles,
  ShimAdapter,
  ShimReferenceTagger,
  TsCreateProgramDriver,
  TypeCheckShimGenerator,
  TemplateTypeCheckerImpl,
  extractTemplate,
  ComponentDecoratorHandler,
  InjectableDecoratorHandler,
  PipeDecoratorHandler,
  getInitializerApiJitTransform,
  angularJitApplicationTransform
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.dev/license
*/
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-COHPTPZ2.js.map
