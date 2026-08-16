/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { types as t } from '@babel/core';
import { AssignmentOperator, AstFactory, BinaryOperator, BuiltInType, LeadingComment, ObjectLiteralProperty, Parameter, SourceMapRange, TemplateLiteral, VariableDeclarationType } from '../../../../src/ngtsc/translator/src/api/ast_factory';
/**
 * A Babel flavored implementation of the AstFactory.
 */
export declare class BabelAstFactory implements AstFactory<t.Statement, t.Expression | t.SpreadElement, t.TSType> {
    /** The absolute path to the source file being compiled. */
    private sourcePath;
    private readonly typesEnabled;
    constructor(
    /** The absolute path to the source file being compiled. */
    sourcePath: string);
    attachComments(statement: t.Statement | t.Expression, leadingComments: LeadingComment[]): void;
    createArrayLiteral: typeof t.arrayExpression;
    createAssignment(target: t.Expression, operator: AssignmentOperator, value: t.Expression): t.Expression;
    createBinaryExpression(leftOperand: t.Expression, operator: BinaryOperator, rightOperand: t.Expression): t.Expression;
    createBlock: typeof t.blockStatement;
    createCallChain(callee: t.Expression, args: (t.Expression | t.SpreadElement)[], pure: boolean, isOptional: boolean): t.Expression;
    createCallExpression(callee: t.Expression, args: (t.Expression | t.SpreadElement)[], pure: boolean): t.Expression;
    createConditional: typeof t.conditionalExpression;
    createElementAccess(expression: t.Expression, element: t.Expression): t.Expression;
    createElementAccessChain(expression: t.Expression, element: t.Expression, isOptional: boolean): t.Expression;
    createExpressionStatement: typeof t.expressionStatement;
    createSpreadElement(expression: t.Expression): t.SpreadElement;
    createFunctionDeclaration(functionName: string, parameters: Parameter<t.TSType>[], body: t.Statement): t.Statement;
    createArrowFunctionExpression(parameters: Parameter<t.TSType>[], body: t.Statement | t.Expression): t.Expression;
    createFunctionExpression(functionName: string | null, parameters: Parameter<t.TSType>[], body: t.Statement): t.Expression;
    createIdentifier: typeof t.identifier;
    createIfStatement: typeof t.ifStatement;
    createDynamicImport(url: string | t.Expression): t.Expression;
    createLiteral(value: string | number | boolean | null | undefined): t.Expression;
    createNewExpression(expression: t.Expression, args: t.Expression[]): t.Expression;
    createObjectLiteral(properties: ObjectLiteralProperty<t.Expression>[]): t.Expression;
    createParenthesizedExpression: typeof t.parenthesizedExpression;
    createPropertyAccess(expression: t.Expression, propertyName: string): t.Expression;
    createPropertyAccessChain(expression: t.Expression, propertyName: string, isOptional: boolean): t.Expression;
    createReturnStatement(expression: t.Expression | null): t.Statement;
    createTaggedTemplate(tag: t.Expression, template: TemplateLiteral<t.Expression>): t.Expression;
    createTemplateLiteral(template: TemplateLiteral<t.Expression>): t.TemplateLiteral;
    createThrowStatement: typeof t.throwStatement;
    createTypeOfExpression(expression: t.Expression): t.Expression;
    createVoidExpression(expression: t.Expression): t.Expression;
    createUnaryExpression: typeof t.unaryExpression;
    createVariableDeclaration(variableName: string, initializer: t.Expression | null, variableType: VariableDeclarationType, type: t.TSType | null): t.Statement;
    createRegularExpressionLiteral(body: string, flags: string | null): t.Expression;
    setSourceMapRange<T extends t.Statement | t.Expression | t.TemplateElement | t.SpreadElement>(node: T, sourceMapRange: SourceMapRange | null): T;
    createBuiltInType(type: BuiltInType): t.TSType;
    createExpressionType(expression: t.Expression, typeParams: t.TSType[] | null): t.TSType;
    createArrayType(elementType: t.TSType): t.TSType;
    createMapType(valueType: t.TSType): t.TSType;
    transplantType(type: t.TSType): t.TSType;
    private identifierWithType;
}
