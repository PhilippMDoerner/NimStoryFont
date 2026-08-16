
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    

// packages/compiler-cli/src/ngtsc/translator/src/context.js
var Context = class _Context {
  isStatement;
  constructor(isStatement) {
    this.isStatement = isStatement;
  }
  get withExpressionMode() {
    return this.isStatement ? new _Context(false) : this;
  }
  get withStatementMode() {
    return !this.isStatement ? new _Context(true) : this;
  }
};

// packages/compiler-cli/src/ngtsc/translator/src/translator.js
import * as o from "@angular/compiler";
function isSafeAccess(ast) {
  if (ast instanceof o.ReadPropExpr) {
    return ast.isOptional || isSafeAccess(ast.receiver);
  } else if (ast instanceof o.ReadKeyExpr) {
    return ast.isOptional || isSafeAccess(ast.receiver);
  } else if (ast instanceof o.InvokeFunctionExpr) {
    return ast.isOptional || isSafeAccess(ast.fn);
  }
  return false;
}
var UNARY_OPERATORS = /* @__PURE__ */ new Map([
  [o.UnaryOperator.Minus, "-"],
  [o.UnaryOperator.Plus, "+"]
]);
var BINARY_OPERATORS = /* @__PURE__ */ new Map([
  [o.BinaryOperator.And, "&&"],
  [o.BinaryOperator.Bigger, ">"],
  [o.BinaryOperator.BiggerEquals, ">="],
  [o.BinaryOperator.BitwiseAnd, "&"],
  [o.BinaryOperator.BitwiseOr, "|"],
  [o.BinaryOperator.Divide, "/"],
  [o.BinaryOperator.Equals, "=="],
  [o.BinaryOperator.Identical, "==="],
  [o.BinaryOperator.Lower, "<"],
  [o.BinaryOperator.LowerEquals, "<="],
  [o.BinaryOperator.Minus, "-"],
  [o.BinaryOperator.Modulo, "%"],
  [o.BinaryOperator.Multiply, "*"],
  [o.BinaryOperator.NotEquals, "!="],
  [o.BinaryOperator.NotIdentical, "!=="],
  [o.BinaryOperator.Or, "||"],
  [o.BinaryOperator.Plus, "+"],
  [o.BinaryOperator.NullishCoalesce, "??"],
  [o.BinaryOperator.Exponentiation, "**"],
  [o.BinaryOperator.In, "in"],
  [o.BinaryOperator.InstanceOf, "instanceof"],
  [o.BinaryOperator.Assign, "="],
  [o.BinaryOperator.AdditionAssignment, "+="],
  [o.BinaryOperator.SubtractionAssignment, "-="],
  [o.BinaryOperator.MultiplicationAssignment, "*="],
  [o.BinaryOperator.DivisionAssignment, "/="],
  [o.BinaryOperator.RemainderAssignment, "%="],
  [o.BinaryOperator.ExponentiationAssignment, "**="],
  [o.BinaryOperator.AndAssignment, "&&="],
  [o.BinaryOperator.OrAssignment, "||="],
  [o.BinaryOperator.NullishCoalesceAssignment, "??="]
]);
var ExpressionTranslatorVisitor = class {
  factory;
  imports;
  contextFile;
  downlevelTaggedTemplates;
  downlevelVariableDeclarations;
  recordWrappedNode;
  constructor(factory, imports, contextFile, options) {
    this.factory = factory;
    this.imports = imports;
    this.contextFile = contextFile;
    this.downlevelTaggedTemplates = options.downlevelTaggedTemplates === true;
    this.downlevelVariableDeclarations = options.downlevelVariableDeclarations === true;
    this.recordWrappedNode = options.recordWrappedNode || (() => {
    });
  }
  visitDeclareVarStmt(stmt, context) {
    const varType = this.downlevelVariableDeclarations ? "var" : stmt.hasModifier(o.StmtModifier.Final) ? "const" : "let";
    return this.attachComments(this.factory.createVariableDeclaration(stmt.name, stmt.value?.visitExpression(this, context.withExpressionMode), varType, stmt.type?.visitType(this, context)), stmt.leadingComments);
  }
  visitDeclareFunctionStmt(stmt, context) {
    return this.attachComments(this.factory.createFunctionDeclaration(stmt.name, this.translateParams(stmt.params, context), this.factory.createBlock(this.visitStatements(stmt.statements, context.withStatementMode))), stmt.leadingComments);
  }
  visitExpressionStmt(stmt, context) {
    return this.attachComments(this.factory.createExpressionStatement(stmt.expr.visitExpression(this, context.withStatementMode)), stmt.leadingComments);
  }
  visitReturnStmt(stmt, context) {
    return this.attachComments(this.factory.createReturnStatement(stmt.value.visitExpression(this, context.withExpressionMode)), stmt.leadingComments);
  }
  visitIfStmt(stmt, context) {
    return this.attachComments(this.factory.createIfStatement(stmt.condition.visitExpression(this, context), this.factory.createBlock(this.visitStatements(stmt.trueCase, context.withStatementMode)), stmt.falseCase.length > 0 ? this.factory.createBlock(this.visitStatements(stmt.falseCase, context.withStatementMode)) : null), stmt.leadingComments);
  }
  visitReadVarExpr(ast, _context) {
    const identifier = this.factory.createIdentifier(ast.name);
    this.setSourceMapRange(identifier, ast.sourceSpan);
    return this.attachComments(identifier, ast.leadingComments);
  }
  visitInvokeFunctionExpr(ast, context) {
    const fn = ast.fn.visitExpression(this, context);
    const args = ast.args.map((arg) => arg.visitExpression(this, context));
    return this.attachComments(this.setSourceMapRange(isSafeAccess(ast) ? this.factory.createCallChain(fn, args, ast.pure, ast.isOptional) : this.factory.createCallExpression(fn, args, ast.pure), ast.sourceSpan), ast.leadingComments);
  }
  visitTaggedTemplateLiteralExpr(ast, context) {
    return this.attachComments(this.setSourceMapRange(this.createTaggedTemplateExpression(ast.tag.visitExpression(this, context), this.getTemplateLiteralFromAst(ast.template, context)), ast.sourceSpan), ast.leadingComments);
  }
  visitTemplateLiteralExpr(ast, context) {
    return this.attachComments(this.setSourceMapRange(this.factory.createTemplateLiteral(this.getTemplateLiteralFromAst(ast, context)), ast.sourceSpan), ast.leadingComments);
  }
  visitInstantiateExpr(ast, context) {
    return this.attachComments(this.factory.createNewExpression(ast.classExpr.visitExpression(this, context), ast.args.map((arg) => arg.visitExpression(this, context))), ast.leadingComments);
  }
  visitLiteralExpr(ast, _context) {
    return this.attachComments(this.setSourceMapRange(this.factory.createLiteral(ast.value), ast.sourceSpan), ast.leadingComments);
  }
  visitRegularExpressionLiteral(ast, context) {
    return this.attachComments(this.setSourceMapRange(this.factory.createRegularExpressionLiteral(ast.body, ast.flags), ast.sourceSpan), ast.leadingComments);
  }
  visitLocalizedString(ast, context) {
    const elements = [createTemplateElement(ast.serializeI18nHead())];
    const expressions = [];
    for (let i = 0; i < ast.expressions.length; i++) {
      const placeholder = this.setSourceMapRange(ast.expressions[i].visitExpression(this, context), ast.getPlaceholderSourceSpan(i));
      expressions.push(placeholder);
      elements.push(createTemplateElement(ast.serializeI18nTemplatePart(i + 1)));
    }
    const localizeTag = this.factory.createIdentifier("$localize");
    return this.attachComments(this.setSourceMapRange(this.createTaggedTemplateExpression(localizeTag, { elements, expressions }), ast.sourceSpan), ast.leadingComments);
  }
  visitBuiltinType(ast) {
    let builtInType;
    switch (ast.name) {
      case o.BuiltinTypeName.Bool:
        builtInType = "boolean";
        break;
      case o.BuiltinTypeName.String:
        builtInType = "string";
        break;
      case o.BuiltinTypeName.Dynamic:
        builtInType = "any";
        break;
      case o.BuiltinTypeName.Number:
      case o.BuiltinTypeName.Int:
        builtInType = "number";
        break;
      case o.BuiltinTypeName.Function:
        builtInType = "function";
        break;
      case o.BuiltinTypeName.None:
        builtInType = "never";
        break;
      case o.BuiltinTypeName.Inferred:
        return null;
    }
    return this.factory.createBuiltInType(builtInType);
  }
  visitExpressionType(ast, context) {
    return this.factory.createExpressionType(ast.value.visitExpression(this, context), ast.typeParams === null || ast.typeParams.length === 0 ? null : ast.typeParams.map((param) => param.visitType(this, context)));
  }
  visitArrayType(ast, context) {
    return this.factory.createArrayType(ast.of.visitType(this, context));
  }
  visitMapType(ast, context) {
    const valueType = ast.valueType === null ? this.factory.createBuiltInType("unknown") : ast.valueType.visitType(this, context);
    return this.factory.createMapType(valueType);
  }
  visitTransplantedType(type) {
    return this.factory.transplantType(type.type);
  }
  createTaggedTemplateExpression(tag, template) {
    return this.downlevelTaggedTemplates ? this.createES5TaggedTemplateFunctionCall(tag, template) : this.factory.createTaggedTemplate(tag, template);
  }
  /**
   * Translate the tagged template literal into a call that is compatible with ES5, using the
   * imported `__makeTemplateObject` helper for ES5 formatted output.
   */
  createES5TaggedTemplateFunctionCall(tagHandler, { elements, expressions }) {
    const __makeTemplateObjectHelper = this.imports.addImport({
      exportModuleSpecifier: "tslib",
      exportSymbolName: "__makeTemplateObject",
      requestedFile: this.contextFile
    });
    const cooked = [];
    const raw = [];
    for (const element of elements) {
      cooked.push(this.factory.setSourceMapRange(this.factory.createLiteral(element.cooked), element.range));
      raw.push(this.factory.setSourceMapRange(this.factory.createLiteral(element.raw), element.range));
    }
    const templateHelperCall = this.factory.createCallExpression(
      __makeTemplateObjectHelper,
      [this.factory.createArrayLiteral(cooked), this.factory.createArrayLiteral(raw)],
      /* pure */
      false
    );
    return this.factory.createCallExpression(
      tagHandler,
      [templateHelperCall, ...expressions],
      /* pure */
      false
    );
  }
  visitExternalExpr(ast, _context) {
    let result;
    if (ast.value.name === null) {
      if (ast.value.moduleName === null) {
        throw new Error("Invalid import without name nor moduleName");
      }
      result = this.imports.addImport({
        exportModuleSpecifier: ast.value.moduleName,
        exportSymbolName: null,
        requestedFile: this.contextFile
      });
    } else if (ast.value.moduleName !== null) {
      result = this.imports.addImport({
        exportModuleSpecifier: ast.value.moduleName,
        exportSymbolName: ast.value.name,
        requestedFile: this.contextFile
      });
    } else {
      result = this.factory.createIdentifier(ast.value.name);
    }
    return this.attachComments(result, ast.leadingComments);
  }
  visitConditionalExpr(ast, context) {
    return this.attachComments(this.factory.createConditional(ast.condition.visitExpression(this, context), ast.trueCase.visitExpression(this, context), ast.falseCase.visitExpression(this, context)), ast.leadingComments);
  }
  visitDynamicImportExpr(ast, context) {
    const urlExpression = typeof ast.url === "string" ? this.factory.createLiteral(ast.url) : ast.url.visitExpression(this, context);
    if (ast.urlComment) {
      this.factory.attachComments(urlExpression, [o.leadingComment(ast.urlComment, true)]);
    }
    return this.attachComments(this.factory.createDynamicImport(urlExpression), ast.leadingComments);
  }
  visitNotExpr(ast, context) {
    return this.attachComments(this.factory.createUnaryExpression("!", ast.condition.visitExpression(this, context)), ast.leadingComments);
  }
  visitFunctionExpr(ast, context) {
    return this.attachComments(this.factory.createFunctionExpression(ast.name ?? null, this.translateParams(ast.params, context), this.factory.createBlock(this.visitStatements(ast.statements, context))), ast.leadingComments);
  }
  visitArrowFunctionExpr(ast, context) {
    return this.attachComments(this.factory.createArrowFunctionExpression(this.translateParams(ast.params, context), Array.isArray(ast.body) ? this.factory.createBlock(this.visitStatements(ast.body, context)) : ast.body.visitExpression(this, context)), ast.leadingComments);
  }
  visitBinaryOperatorExpr(ast, context) {
    if (!BINARY_OPERATORS.has(ast.operator)) {
      throw new Error(`Unknown binary operator: ${o.BinaryOperator[ast.operator]}`);
    }
    const operator = BINARY_OPERATORS.get(ast.operator);
    if (ast.isAssignment()) {
      return this.attachComments(this.factory.createAssignment(ast.lhs.visitExpression(this, context), operator, ast.rhs.visitExpression(this, context)), ast.leadingComments);
    }
    return this.attachComments(this.factory.createBinaryExpression(ast.lhs.visitExpression(this, context), operator, ast.rhs.visitExpression(this, context)), ast.leadingComments);
  }
  visitReadPropExpr(ast, context) {
    const receiver = ast.receiver.visitExpression(this, context);
    return this.attachComments(isSafeAccess(ast) ? this.factory.createPropertyAccessChain(receiver, ast.name, ast.isOptional) : this.factory.createPropertyAccess(receiver, ast.name), ast.leadingComments);
  }
  visitReadKeyExpr(ast, context) {
    const receiver = ast.receiver.visitExpression(this, context);
    const index = ast.index.visitExpression(this, context);
    return this.attachComments(isSafeAccess(ast) ? this.factory.createElementAccessChain(receiver, index, ast.isOptional) : this.factory.createElementAccess(receiver, index), ast.leadingComments);
  }
  visitLiteralArrayExpr(ast, context) {
    return this.attachComments(this.factory.createArrayLiteral(ast.entries.map((expr) => this.setSourceMapRange(expr.visitExpression(this, context), ast.sourceSpan))), ast.leadingComments);
  }
  visitLiteralMapExpr(ast, context) {
    const properties = ast.entries.map((entry) => {
      return entry instanceof o.LiteralMapPropertyAssignment ? {
        kind: "property",
        propertyName: entry.key,
        quoted: entry.quoted,
        value: entry.value.visitExpression(this, context)
      } : {
        kind: "spread",
        expression: entry.expression.visitExpression(this, context)
      };
    });
    return this.attachComments(this.setSourceMapRange(this.factory.createObjectLiteral(properties), ast.sourceSpan), ast.leadingComments);
  }
  visitCommaExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitTemplateLiteralElementExpr(ast, context) {
    throw new Error("Method not implemented");
  }
  visitSpreadElementExpr(ast, context) {
    const expression = ast.expression.visitExpression(this, context);
    return this.attachComments(this.setSourceMapRange(this.factory.createSpreadElement(expression), ast.sourceSpan), ast.leadingComments);
  }
  visitWrappedNodeExpr(ast, _context) {
    this.recordWrappedNode(ast);
    return this.attachComments(ast.node, ast.leadingComments);
  }
  visitTypeofExpr(ast, context) {
    return this.attachComments(this.factory.createTypeOfExpression(ast.expr.visitExpression(this, context)), ast.leadingComments);
  }
  visitVoidExpr(ast, context) {
    return this.attachComments(this.factory.createVoidExpression(ast.expr.visitExpression(this, context)), ast.leadingComments);
  }
  visitUnaryOperatorExpr(ast, context) {
    if (!UNARY_OPERATORS.has(ast.operator)) {
      throw new Error(`Unknown unary operator: ${o.UnaryOperator[ast.operator]}`);
    }
    return this.attachComments(this.factory.createUnaryExpression(UNARY_OPERATORS.get(ast.operator), ast.expr.visitExpression(this, context)), ast.leadingComments);
  }
  visitParenthesizedExpr(ast, context) {
    const result = ast.expr.visitExpression(this, context);
    return this.attachComments(this.factory.createParenthesizedExpression(result), ast.leadingComments);
  }
  visitStatements(statements, context) {
    return statements.map((stmt) => stmt.visitStatement(this, context)).filter((stmt) => stmt !== void 0);
  }
  setSourceMapRange(ast, span) {
    return this.factory.setSourceMapRange(ast, createRange(span));
  }
  attachComments(node, leadingComments) {
    if (leadingComments !== void 0 && leadingComments.length > 0) {
      this.factory.attachComments(node, leadingComments);
    }
    return node;
  }
  getTemplateLiteralFromAst(ast, context) {
    return {
      elements: ast.elements.map((e) => createTemplateElement({
        cooked: e.text,
        raw: e.rawText,
        range: e.sourceSpan ?? ast.sourceSpan
      })),
      expressions: ast.expressions.map((e) => e.visitExpression(this, context))
    };
  }
  translateParams(params, context) {
    return params.map((param) => ({
      name: param.name,
      type: param.type?.visitType(this, context)
    }));
  }
};
function createTemplateElement({ cooked, raw, range }) {
  return { cooked, raw, range: createRange(range) };
}
function createRange(span) {
  if (span === null) {
    return null;
  }
  const { start, end } = span;
  const { url, content } = start.file;
  if (!url) {
    return null;
  }
  return {
    url,
    content,
    start: { offset: start.offset, line: start.line, column: start.col },
    end: { offset: end.offset, line: end.line, column: end.col }
  };
}

export {
  Context,
  ExpressionTranslatorVisitor
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-ZUYMYKXC.js.map
