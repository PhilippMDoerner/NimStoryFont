import { types, File, NodePath, PluginPass, VisitorBase, Visitor, Scope, PluginObject, PluginAPI } from '@babel/core';

declare function buildCheckInRHS(rhs: types.Expression, file: File, inRHSIsObject?: boolean): types.Expression;

type DecoratorVersionKind = "2023-11";
declare function buildNamedEvaluationVisitor(needsName: (path: NodePath) => boolean, visitor: (path: NodePath, state: PluginPass, name: string | types.Identifier | types.StringLiteral | types.NumericLiteral | types.BigIntLiteral) => void): VisitorBase<PluginPass>;

interface RenamerState {
    scope: Scope;
}
declare function injectInitialization(path: NodePath<types.Class>, constructor: NodePath<types.ClassMethod> | undefined, nodes: types.ExpressionStatement[], renamer?: (visitor: Visitor<RenamerState>, state: RenamerState) => void, lastReturnsThis?: boolean): void;

declare const FEATURES: Readonly<{
    fields: number;
    privateMethods: number;
    decorators: number;
    privateIn: number;
    staticBlocks: number;
}>;
declare function enableFeature(file: File, feature: number, loose: boolean): void;

interface Options {
    name: string;
    feature: number;
    loose?: boolean;
    inherits?: PluginObject["inherits"];
    manipulateOptions?: PluginObject["manipulateOptions"];
    api: PluginAPI;
    decoratorVersion?: DecoratorVersionKind | "2018-09";
}
declare function createClassFeaturePlugin({ name, feature, loose, manipulateOptions, api, inherits, }: Options): PluginObject;

export { FEATURES, buildCheckInRHS, buildNamedEvaluationVisitor, createClassFeaturePlugin, enableFeature, injectInitialization };
