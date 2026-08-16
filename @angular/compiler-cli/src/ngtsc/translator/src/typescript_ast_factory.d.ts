/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { AstFactory, BinaryOperator, BuiltInType, LeadingComment, ObjectLiteralProperty, Parameter, SourceMapRange, TemplateLiteral, UnaryOperator, VariableDeclarationType } from './api/ast_factory';
/**
 * A TypeScript flavoured implementation of the AstFactory.
 */
export declare class TypeScriptAstFactory implements AstFactory<ts.Statement, ts.Expression, ts.TypeNode> {
    private annotateForClosureCompiler;
    private externalSourceFiles;
    private readonly UNARY_OPERATORS;
    private readonly BINARY_OPERATORS;
    private readonly VAR_TYPES;
    constructor(annotateForClosureCompiler: boolean);
    attachComments: typeof attachComments;
    createArrayLiteral: (elements?: readonly ts.Expression[], multiLine?: boolean) => ts.ArrayLiteralExpression;
    createAssignment(target: ts.Expression, operator: BinaryOperator, value: ts.Expression): ts.Expression;
    createBinaryExpression(leftOperand: ts.Expression, operator: BinaryOperator, rightOperand: ts.Expression): ts.Expression;
    createBlock(body: ts.Statement[]): ts.Statement;
    createCallChain(callee: ts.Expression, args: ts.Expression[], pure: boolean, isOptional: boolean): ts.Expression;
    createCallExpression(callee: ts.Expression, args: ts.Expression[], pure: boolean): ts.Expression;
    private markAsPure;
    createConditional(condition: ts.Expression, whenTrue: ts.Expression, whenFalse: ts.Expression): ts.Expression;
    createElementAccess: (expression: ts.Expression, index: number | ts.Expression) => ts.ElementAccessExpression;
    createElementAccessChain(expression: ts.Expression, element: ts.Expression, isOptional: boolean): ts.Expression;
    createExpressionStatement: (expression: ts.Expression) => ts.ExpressionStatement;
    createDynamicImport(url: string | ts.Expression): ts.CallExpression;
    createFunctionDeclaration(functionName: string, parameters: Parameter<ts.TypeNode>[], body: ts.Statement): ts.Statement;
    createFunctionExpression(functionName: string | null, parameters: Parameter<ts.TypeNode>[], body: ts.Statement): ts.Expression;
    createArrowFunctionExpression(parameters: Parameter<ts.TypeNode>[], body: ts.Statement | ts.Expression): ts.Expression;
    private createParameter;
    createIdentifier: (text: string) => ts.Identifier;
    createIfStatement(condition: ts.Expression, thenStatement: ts.Statement, elseStatement: ts.Statement | null): ts.Statement;
    createLiteral(value: string | number | boolean | null | undefined): ts.Expression;
    createNewExpression(expression: ts.Expression, args: ts.Expression[]): ts.Expression;
    createObjectLiteral(properties: ObjectLiteralProperty<ts.Expression>[]): ts.Expression;
    createParenthesizedExpression: (expression: ts.Expression) => ts.ParenthesizedExpression;
    createPropertyAccess: (expression: ts.Expression, name: string | ts.MemberName) => ts.PropertyAccessExpression;
    createPropertyAccessChain(expression: ts.Expression, propertyName: string, isOptional: boolean): ts.Expression;
    createSpreadElement: (expression: ts.Expression) => ts.SpreadElement;
    createReturnStatement(expression: ts.Expression | null): ts.Statement;
    createTaggedTemplate(tag: ts.Expression, template: TemplateLiteral<ts.Expression>): ts.Expression;
    createTemplateLiteral(template: TemplateLiteral<ts.Expression>): ts.TemplateLiteral;
    createThrowStatement: (expression: ts.Expression) => ts.ThrowStatement;
    createTypeOfExpression: (expression: ts.Expression) => ts.TypeOfExpression;
    createVoidExpression: (expression: ts.Expression) => ts.VoidExpression;
    createUnaryExpression(operator: UnaryOperator, operand: ts.Expression): ts.Expression;
    createVariableDeclaration(variableName: string, initializer: ts.Expression | null, variableType: VariableDeclarationType, type: ts.TypeNode | null): ts.Statement;
    createRegularExpressionLiteral(body: string, flags: string | null): ts.Expression;
    setSourceMapRange<T extends ts.Node>(node: T, sourceMapRange: SourceMapRange | null): T;
    createBuiltInType(type: BuiltInType): ts.TypeNode;
    createExpressionType(expression: ts.Expression, typeParams: ts.TypeNode[] | null): ts.TypeNode;
    createArrayType(elementType: ts.TypeNode): ts.TypeNode;
    createMapType(valueType: ts.TypeNode): ts.TypeNode;
    transplantType(type: ts.TypeNode): ts.TypeNode;
}
export declare function createTemplateMiddle(cooked: string, raw: string): ts.TemplateMiddle;
export declare function createTemplateTail(cooked: string, raw: string): ts.TemplateTail;
/**
 * Attach the given `leadingComments` to the `statement` node.
 *
 * @param statement The statement that will have comments attached.
 * @param leadingComments The comments to attach to the statement.
 */
export declare function attachComments(statement: ts.Statement | ts.Expression, leadingComments: LeadingComment[]): void;
