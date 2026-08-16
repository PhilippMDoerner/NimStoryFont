import * as t from '@babel/types';
import { Node, RemovePropertiesOptions } from '@babel/types';

type BindingKind = "var" | "let" | "const" | "module" | "hoisted" | "param" | "local" | "unknown";
/**
 * This class is responsible for a binding inside of a scope.
 *
 * It tracks the following:
 *
 *  * Node path.
 *  * Amount of times referenced by other nodes.
 *  * Paths to nodes that reassign or modify this binding.
 *  * The kind of binding. (Is it a parameter, declaration etc)
 */
declare class Binding {
    identifier: t.Identifier;
    scope: Scope;
    path: NodePath_Final;
    kind: BindingKind;
    constructor({ identifier, scope, path, kind, }: {
        identifier: t.Identifier;
        scope: Scope;
        path: NodePath_Final;
        kind: BindingKind;
    });
    constantViolations: NodePath_Final[];
    constant: boolean;
    referencePaths: NodePath_Final[];
    referenced: boolean;
    references: number;
    hasDeoptedValue: boolean;
    hasValue: boolean;
    value: any;
    deoptValue(): void;
    setValue(value: any): void;
    clearValue(): void;
    /**
     * Register a constant violation with the provided `path`.
     */
    reassign(path: NodePath_Final): void;
    /**
     * Increment the amount of references to this binding.
     */
    reference(path: NodePath_Final): void;
    /**
     * Decrement the amount of references to this binding.
     */
    dereference(): void;
}

type _Binding = Binding;
declare class Scope {
    uid: number | undefined;
    path: NodePath_Final;
    block: t.Pattern | t.Scopable;
    inited: boolean;
    labels: Map<string, NodePath_Final<t.LabeledStatement>>;
    bindings: Record<string, Binding>;
    /** Only defined in the program scope */
    referencesSet?: Set<string>;
    globals: Record<string, t.Identifier | t.JSXIdentifier>;
    /** Only defined in the program scope */
    uidsSet?: Set<string>;
    data: Record<string | symbol, unknown>;
    crawling: boolean;
    /**
     * This searches the current "scope" and collects all references/bindings
     * within.
     */
    constructor(path: NodePath_Final<t.Pattern | t.Scopable>);
    /**
     * Globals.
     */
    static globals: string[];
    /**
     * Variables available in current context.
     */
    static contextVariables: string[];
    get parent(): Scope | undefined;
    get references(): void;
    get uids(): void;
    /**
     * Generate a unique identifier and add it to the current scope.
     */
    generateDeclaredUidIdentifier(name?: string): t.Identifier;
    /**
     * Generate a unique identifier.
     */
    generateUidIdentifier(name?: string): t.Identifier;
    /**
     * Generate a unique `_id1` binding.
     */
    generateUid(name?: string): string;
    generateUidBasedOnNode(node: t.Node | undefined | null, defaultName?: string): string;
    /**
     * Generate a unique identifier based on a node.
     */
    generateUidIdentifierBasedOnNode(node: t.Node | undefined | null, defaultName?: string): t.Identifier;
    /**
     * Determine whether evaluating the specific input `node` is a consequenceless reference. ie.
     * evaluating it won't result in potentially arbitrary code from being ran. The following are
     * allowed and determined not to cause side effects:
     *
     *  - `this` expressions
     *  - `super` expressions
     *  - Bound identifiers
     */
    isStatic(node: t.Node | null): boolean;
    /**
     * Possibly generate a memoised identifier if it is not static and has consequences.
     */
    maybeGenerateMemoised(node: t.Node, dontPush?: boolean): t.Identifier | null;
    checkBlockScopedCollisions(local: Binding, kind: BindingKind, name: string, id: any): void;
    rename(oldName: string, newName?: string): void;
    dump(): void;
    hasLabel(name: string): boolean;
    getLabel(name: string): NodePath<t.LabeledStatement, "LabeledStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | undefined;
    registerLabel(path: NodePath_Final<t.LabeledStatement>): void;
    registerDeclaration(path: NodePath_Final<t.Node>): void;
    registerConstantViolation(path: NodePath_Final<t.Node>): void;
    registerBinding(kind: Binding["kind"], path: NodePath_Final<t.Node>, bindingPath?: NodePath_Final<t.Node>): void;
    addGlobal(node: t.Identifier | t.JSXIdentifier): void;
    hasUid(name: string): boolean;
    hasGlobal(name: string): boolean;
    hasReference(name: string): boolean;
    isPure(node: t.Node | null | undefined, constantsOnly?: boolean): boolean;
    /**
     * Set some arbitrary data on the current scope.
     */
    setData(key: string | symbol, val: any): any;
    /**
     * Recursively walk up scope tree looking for the data `key`.
     */
    getData(key: string | symbol): any;
    /**
     * Recursively walk up scope tree looking for the data `key` and if it exists,
     * remove it.
     */
    removeData(key: string): void;
    init(): void;
    crawl(): void;
    push(opts: {
        id: t.ArrayPattern | t.Identifier | t.ObjectPattern;
        init?: t.Expression;
        unique?: boolean;
        _blockHoist?: number | undefined;
        kind?: "var" | "let" | "const";
    }): void;
    /**
     * Walk up to the top of the scope tree and get the `Program`.
     */
    getProgramParent(): Scope & {
        referencesSet: Set<string>;
        uidsSet: Set<string>;
    };
    /**
     * Walk up the scope tree until we hit either a Function or return null.
     */
    getFunctionParent(): Scope | null;
    /**
     * Walk up the scope tree until we hit either a BlockStatement/Loop/Program/Function/Switch or reach the
     * very top and hit Program.
     */
    getBlockParent(): Scope;
    /**
     * Walk up from a pattern scope (function param initializer) until we hit a non-pattern scope,
     * then returns its block parent
     * @returns An ancestry scope whose path is a block parent
     */
    getPatternParent(): Scope;
    /**
     * Walks the scope tree and gathers **all** bindings.
     */
    getAllBindings(): Record<string, Binding>;
    bindingIdentifierEquals(name: string, node: t.Node): boolean;
    getBinding(name: string): Binding | undefined;
    getOwnBinding(name: string): Binding | undefined;
    getBindingIdentifier(name: string): t.Identifier | undefined;
    getOwnBindingIdentifier(name: string): t.Identifier | undefined;
    hasOwnBinding(name: string): boolean;
    hasBinding(name: string, opts?: boolean | {
        noGlobals?: boolean;
        noUids?: boolean;
        upToScope?: Scope;
    }): boolean;
    parentHasBinding(name: string, opts?: {
        noGlobals?: boolean;
        noUids?: boolean;
    }): boolean | undefined;
    /**
     * Move a binding of `name` to another `scope`.
     */
    moveBindingTo(name: string, scope: Scope): void;
    removeOwnBinding(name: string): void;
    removeBinding(name: string): void;
    /**
     * Hoist all the `var` variable to the beginning of the function/program
     * scope where their binding will be actually defined. For exmaple,
     *     { var x = 2 }
     * will be transformed to
     *     var x; { x = 2 }
     *
     * @param emit A custom function to emit `var` declarations, for example to
     *   emit them in a different scope.
     */
    hoistVariables(emit?: (id: t.Identifier, hasInit: boolean) => void): void;
}
declare namespace Scope {
    type Binding = _Binding;
}
//# sourceMappingURL=index.d.ts.map

interface HubInterface {
    getCode(): string | void;
    getScope(): Scope | void;
    addHelper(name: string): any;
    buildError(node: Node, msg: string, Error: new (msg: string) => Error): Error;
}
declare class Hub implements HubInterface {
    getCode(): void;
    getScope(): void;
    addHelper(): void;
    buildError(node: Node, msg: string, Error?: new (msg: string) => Error): Error;
}

interface VirtualTypeAliases {
    BindingIdentifier: t.Identifier;
    BlockScoped: t.FunctionDeclaration | t.ClassDeclaration | t.VariableDeclaration;
    ExistentialTypeParam: t.ExistsTypeAnnotation;
    Expression: t.Expression;
    Flow: t.Flow | t.ImportDeclaration | t.ExportDeclaration | t.ImportSpecifier;
    ForAwaitStatement: t.ForOfStatement;
    Generated: t.Node;
    NumericLiteralTypeAnnotation: t.NumberLiteralTypeAnnotation;
    Pure: t.Node;
    Referenced: t.Node;
    ReferencedIdentifier: t.Identifier | t.JSXIdentifier;
    ReferencedMemberExpression: t.MemberExpression;
    RestProperty: t.RestElement;
    Scope: t.Scopable | t.Pattern;
    SpreadProperty: t.RestElement;
    Statement: t.Statement;
    User: t.Node;
    Var: t.VariableDeclaration;
}

/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */


interface ExplVisitorBase<S> {
  AnyTypeAnnotation?: ExplVisitNode<S, t.AnyTypeAnnotation>;
  ArgumentPlaceholder?: ExplVisitNode<S, t.ArgumentPlaceholder>;
  ArrayExpression?: ExplVisitNode<S, t.ArrayExpression>;
  ArrayPattern?: ExplVisitNode<S, t.ArrayPattern>;
  ArrayTypeAnnotation?: ExplVisitNode<S, t.ArrayTypeAnnotation>;
  ArrowFunctionExpression?: ExplVisitNode<S, t.ArrowFunctionExpression>;
  AssignmentExpression?: ExplVisitNode<S, t.AssignmentExpression>;
  AssignmentPattern?: ExplVisitNode<S, t.AssignmentPattern>;
  AwaitExpression?: ExplVisitNode<S, t.AwaitExpression>;
  BigIntLiteral?: ExplVisitNode<S, t.BigIntLiteral>;
  BigIntLiteralTypeAnnotation?: ExplVisitNode<S, t.BigIntLiteralTypeAnnotation>;
  BinaryExpression?: ExplVisitNode<S, t.BinaryExpression>;
  BindExpression?: ExplVisitNode<S, t.BindExpression>;
  BlockStatement?: ExplVisitNode<S, t.BlockStatement>;
  BooleanLiteral?: ExplVisitNode<S, t.BooleanLiteral>;
  BooleanLiteralTypeAnnotation?: ExplVisitNode<
    S,
    t.BooleanLiteralTypeAnnotation
  >;
  BooleanTypeAnnotation?: ExplVisitNode<S, t.BooleanTypeAnnotation>;
  BreakStatement?: ExplVisitNode<S, t.BreakStatement>;
  CallExpression?: ExplVisitNode<S, t.CallExpression>;
  CatchClause?: ExplVisitNode<S, t.CatchClause>;
  ClassAccessorProperty?: ExplVisitNode<S, t.ClassAccessorProperty>;
  ClassBody?: ExplVisitNode<S, t.ClassBody>;
  ClassDeclaration?: ExplVisitNode<S, t.ClassDeclaration>;
  ClassExpression?: ExplVisitNode<S, t.ClassExpression>;
  ClassImplements?: ExplVisitNode<S, t.ClassImplements>;
  ClassMethod?: ExplVisitNode<S, t.ClassMethod>;
  ClassPrivateMethod?: ExplVisitNode<S, t.ClassPrivateMethod>;
  ClassPrivateProperty?: ExplVisitNode<S, t.ClassPrivateProperty>;
  ClassProperty?: ExplVisitNode<S, t.ClassProperty>;
  ConditionalExpression?: ExplVisitNode<S, t.ConditionalExpression>;
  ContinueStatement?: ExplVisitNode<S, t.ContinueStatement>;
  DebuggerStatement?: ExplVisitNode<S, t.DebuggerStatement>;
  DeclareClass?: ExplVisitNode<S, t.DeclareClass>;
  DeclareExportAllDeclaration?: ExplVisitNode<S, t.DeclareExportAllDeclaration>;
  DeclareExportDeclaration?: ExplVisitNode<S, t.DeclareExportDeclaration>;
  DeclareFunction?: ExplVisitNode<S, t.DeclareFunction>;
  DeclareInterface?: ExplVisitNode<S, t.DeclareInterface>;
  DeclareModule?: ExplVisitNode<S, t.DeclareModule>;
  DeclareModuleExports?: ExplVisitNode<S, t.DeclareModuleExports>;
  DeclareOpaqueType?: ExplVisitNode<S, t.DeclareOpaqueType>;
  DeclareTypeAlias?: ExplVisitNode<S, t.DeclareTypeAlias>;
  DeclareVariable?: ExplVisitNode<S, t.DeclareVariable>;
  DeclaredPredicate?: ExplVisitNode<S, t.DeclaredPredicate>;
  Decorator?: ExplVisitNode<S, t.Decorator>;
  Directive?: ExplVisitNode<S, t.Directive>;
  DirectiveLiteral?: ExplVisitNode<S, t.DirectiveLiteral>;
  DoExpression?: ExplVisitNode<S, t.DoExpression>;
  DoWhileStatement?: ExplVisitNode<S, t.DoWhileStatement>;
  EmptyStatement?: ExplVisitNode<S, t.EmptyStatement>;
  EmptyTypeAnnotation?: ExplVisitNode<S, t.EmptyTypeAnnotation>;
  EnumBooleanBody?: ExplVisitNode<S, t.EnumBooleanBody>;
  EnumBooleanMember?: ExplVisitNode<S, t.EnumBooleanMember>;
  EnumDeclaration?: ExplVisitNode<S, t.EnumDeclaration>;
  EnumDefaultedMember?: ExplVisitNode<S, t.EnumDefaultedMember>;
  EnumNumberBody?: ExplVisitNode<S, t.EnumNumberBody>;
  EnumNumberMember?: ExplVisitNode<S, t.EnumNumberMember>;
  EnumStringBody?: ExplVisitNode<S, t.EnumStringBody>;
  EnumStringMember?: ExplVisitNode<S, t.EnumStringMember>;
  EnumSymbolBody?: ExplVisitNode<S, t.EnumSymbolBody>;
  ExistsTypeAnnotation?: ExplVisitNode<S, t.ExistsTypeAnnotation>;
  ExportAllDeclaration?: ExplVisitNode<S, t.ExportAllDeclaration>;
  ExportDefaultDeclaration?: ExplVisitNode<S, t.ExportDefaultDeclaration>;
  ExportDefaultSpecifier?: ExplVisitNode<S, t.ExportDefaultSpecifier>;
  ExportNamedDeclaration?: ExplVisitNode<S, t.ExportNamedDeclaration>;
  ExportNamespaceSpecifier?: ExplVisitNode<S, t.ExportNamespaceSpecifier>;
  ExportSpecifier?: ExplVisitNode<S, t.ExportSpecifier>;
  ExpressionStatement?: ExplVisitNode<S, t.ExpressionStatement>;
  File?: ExplVisitNode<S, t.File>;
  ForInStatement?: ExplVisitNode<S, t.ForInStatement>;
  ForOfStatement?: ExplVisitNode<S, t.ForOfStatement>;
  ForStatement?: ExplVisitNode<S, t.ForStatement>;
  FunctionDeclaration?: ExplVisitNode<S, t.FunctionDeclaration>;
  FunctionExpression?: ExplVisitNode<S, t.FunctionExpression>;
  FunctionTypeAnnotation?: ExplVisitNode<S, t.FunctionTypeAnnotation>;
  FunctionTypeParam?: ExplVisitNode<S, t.FunctionTypeParam>;
  GenericTypeAnnotation?: ExplVisitNode<S, t.GenericTypeAnnotation>;
  Identifier?: ExplVisitNode<S, t.Identifier>;
  IfStatement?: ExplVisitNode<S, t.IfStatement>;
  Import?: ExplVisitNode<S, t.Import>;
  ImportAttribute?: ExplVisitNode<S, t.ImportAttribute>;
  ImportDeclaration?: ExplVisitNode<S, t.ImportDeclaration>;
  ImportDefaultSpecifier?: ExplVisitNode<S, t.ImportDefaultSpecifier>;
  ImportExpression?: ExplVisitNode<S, t.ImportExpression>;
  ImportNamespaceSpecifier?: ExplVisitNode<S, t.ImportNamespaceSpecifier>;
  ImportSpecifier?: ExplVisitNode<S, t.ImportSpecifier>;
  IndexedAccessType?: ExplVisitNode<S, t.IndexedAccessType>;
  InferredPredicate?: ExplVisitNode<S, t.InferredPredicate>;
  InterfaceDeclaration?: ExplVisitNode<S, t.InterfaceDeclaration>;
  InterfaceExtends?: ExplVisitNode<S, t.InterfaceExtends>;
  InterfaceTypeAnnotation?: ExplVisitNode<S, t.InterfaceTypeAnnotation>;
  InterpreterDirective?: ExplVisitNode<S, t.InterpreterDirective>;
  IntersectionTypeAnnotation?: ExplVisitNode<S, t.IntersectionTypeAnnotation>;
  JSXAttribute?: ExplVisitNode<S, t.JSXAttribute>;
  JSXClosingElement?: ExplVisitNode<S, t.JSXClosingElement>;
  JSXClosingFragment?: ExplVisitNode<S, t.JSXClosingFragment>;
  JSXElement?: ExplVisitNode<S, t.JSXElement>;
  JSXEmptyExpression?: ExplVisitNode<S, t.JSXEmptyExpression>;
  JSXExpressionContainer?: ExplVisitNode<S, t.JSXExpressionContainer>;
  JSXFragment?: ExplVisitNode<S, t.JSXFragment>;
  JSXIdentifier?: ExplVisitNode<S, t.JSXIdentifier>;
  JSXMemberExpression?: ExplVisitNode<S, t.JSXMemberExpression>;
  JSXNamespacedName?: ExplVisitNode<S, t.JSXNamespacedName>;
  JSXOpeningElement?: ExplVisitNode<S, t.JSXOpeningElement>;
  JSXOpeningFragment?: ExplVisitNode<S, t.JSXOpeningFragment>;
  JSXSpreadAttribute?: ExplVisitNode<S, t.JSXSpreadAttribute>;
  JSXSpreadChild?: ExplVisitNode<S, t.JSXSpreadChild>;
  JSXText?: ExplVisitNode<S, t.JSXText>;
  LabeledStatement?: ExplVisitNode<S, t.LabeledStatement>;
  LogicalExpression?: ExplVisitNode<S, t.LogicalExpression>;
  MemberExpression?: ExplVisitNode<S, t.MemberExpression>;
  MetaProperty?: ExplVisitNode<S, t.MetaProperty>;
  MixedTypeAnnotation?: ExplVisitNode<S, t.MixedTypeAnnotation>;
  ModuleExpression?: ExplVisitNode<S, t.ModuleExpression>;
  NewExpression?: ExplVisitNode<S, t.NewExpression>;
  NullLiteral?: ExplVisitNode<S, t.NullLiteral>;
  NullLiteralTypeAnnotation?: ExplVisitNode<S, t.NullLiteralTypeAnnotation>;
  NullableTypeAnnotation?: ExplVisitNode<S, t.NullableTypeAnnotation>;
  NumberLiteral?: ExplVisitNode<S, t.NumberLiteral>;
  NumberLiteralTypeAnnotation?: ExplVisitNode<S, t.NumberLiteralTypeAnnotation>;
  NumberTypeAnnotation?: ExplVisitNode<S, t.NumberTypeAnnotation>;
  NumericLiteral?: ExplVisitNode<S, t.NumericLiteral>;
  ObjectExpression?: ExplVisitNode<S, t.ObjectExpression>;
  ObjectMethod?: ExplVisitNode<S, t.ObjectMethod>;
  ObjectPattern?: ExplVisitNode<S, t.ObjectPattern>;
  ObjectProperty?: ExplVisitNode<S, t.ObjectProperty>;
  ObjectTypeAnnotation?: ExplVisitNode<S, t.ObjectTypeAnnotation>;
  ObjectTypeCallProperty?: ExplVisitNode<S, t.ObjectTypeCallProperty>;
  ObjectTypeIndexer?: ExplVisitNode<S, t.ObjectTypeIndexer>;
  ObjectTypeInternalSlot?: ExplVisitNode<S, t.ObjectTypeInternalSlot>;
  ObjectTypeProperty?: ExplVisitNode<S, t.ObjectTypeProperty>;
  ObjectTypeSpreadProperty?: ExplVisitNode<S, t.ObjectTypeSpreadProperty>;
  OpaqueType?: ExplVisitNode<S, t.OpaqueType>;
  OptionalCallExpression?: ExplVisitNode<S, t.OptionalCallExpression>;
  OptionalIndexedAccessType?: ExplVisitNode<S, t.OptionalIndexedAccessType>;
  OptionalMemberExpression?: ExplVisitNode<S, t.OptionalMemberExpression>;
  ParenthesizedExpression?: ExplVisitNode<S, t.ParenthesizedExpression>;
  Placeholder?: ExplVisitNode<S, t.Placeholder>;
  PrivateName?: ExplVisitNode<S, t.PrivateName>;
  Program?: ExplVisitNode<S, t.Program>;
  QualifiedTypeIdentifier?: ExplVisitNode<S, t.QualifiedTypeIdentifier>;
  RegExpLiteral?: ExplVisitNode<S, t.RegExpLiteral>;
  RegexLiteral?: ExplVisitNode<S, t.RegexLiteral>;
  RestElement?: ExplVisitNode<S, t.RestElement>;
  RestProperty?: ExplVisitNode<S, t.RestProperty>;
  ReturnStatement?: ExplVisitNode<S, t.ReturnStatement>;
  SequenceExpression?: ExplVisitNode<S, t.SequenceExpression>;
  SpreadElement?: ExplVisitNode<S, t.SpreadElement>;
  SpreadProperty?: ExplVisitNode<S, t.SpreadProperty>;
  StaticBlock?: ExplVisitNode<S, t.StaticBlock>;
  StringLiteral?: ExplVisitNode<S, t.StringLiteral>;
  StringLiteralTypeAnnotation?: ExplVisitNode<S, t.StringLiteralTypeAnnotation>;
  StringTypeAnnotation?: ExplVisitNode<S, t.StringTypeAnnotation>;
  Super?: ExplVisitNode<S, t.Super>;
  SwitchCase?: ExplVisitNode<S, t.SwitchCase>;
  SwitchStatement?: ExplVisitNode<S, t.SwitchStatement>;
  SymbolTypeAnnotation?: ExplVisitNode<S, t.SymbolTypeAnnotation>;
  TSAnyKeyword?: ExplVisitNode<S, t.TSAnyKeyword>;
  TSArrayType?: ExplVisitNode<S, t.TSArrayType>;
  TSAsExpression?: ExplVisitNode<S, t.TSAsExpression>;
  TSBigIntKeyword?: ExplVisitNode<S, t.TSBigIntKeyword>;
  TSBooleanKeyword?: ExplVisitNode<S, t.TSBooleanKeyword>;
  TSCallSignatureDeclaration?: ExplVisitNode<S, t.TSCallSignatureDeclaration>;
  TSClassImplements?: ExplVisitNode<S, t.TSClassImplements>;
  TSConditionalType?: ExplVisitNode<S, t.TSConditionalType>;
  TSConstructSignatureDeclaration?: ExplVisitNode<
    S,
    t.TSConstructSignatureDeclaration
  >;
  TSConstructorType?: ExplVisitNode<S, t.TSConstructorType>;
  TSDeclareFunction?: ExplVisitNode<S, t.TSDeclareFunction>;
  TSDeclareMethod?: ExplVisitNode<S, t.TSDeclareMethod>;
  TSEnumBody?: ExplVisitNode<S, t.TSEnumBody>;
  TSEnumDeclaration?: ExplVisitNode<S, t.TSEnumDeclaration>;
  TSEnumMember?: ExplVisitNode<S, t.TSEnumMember>;
  TSExportAssignment?: ExplVisitNode<S, t.TSExportAssignment>;
  TSExternalModuleReference?: ExplVisitNode<S, t.TSExternalModuleReference>;
  TSFunctionType?: ExplVisitNode<S, t.TSFunctionType>;
  TSImportEqualsDeclaration?: ExplVisitNode<S, t.TSImportEqualsDeclaration>;
  TSImportType?: ExplVisitNode<S, t.TSImportType>;
  TSIndexSignature?: ExplVisitNode<S, t.TSIndexSignature>;
  TSIndexedAccessType?: ExplVisitNode<S, t.TSIndexedAccessType>;
  TSInferType?: ExplVisitNode<S, t.TSInferType>;
  TSInstantiationExpression?: ExplVisitNode<S, t.TSInstantiationExpression>;
  TSInterfaceBody?: ExplVisitNode<S, t.TSInterfaceBody>;
  TSInterfaceDeclaration?: ExplVisitNode<S, t.TSInterfaceDeclaration>;
  TSInterfaceHeritage?: ExplVisitNode<S, t.TSInterfaceHeritage>;
  TSIntersectionType?: ExplVisitNode<S, t.TSIntersectionType>;
  TSIntrinsicKeyword?: ExplVisitNode<S, t.TSIntrinsicKeyword>;
  TSLiteralType?: ExplVisitNode<S, t.TSLiteralType>;
  TSMappedType?: ExplVisitNode<S, t.TSMappedType>;
  TSMethodSignature?: ExplVisitNode<S, t.TSMethodSignature>;
  TSModuleBlock?: ExplVisitNode<S, t.TSModuleBlock>;
  TSModuleDeclaration?: ExplVisitNode<S, t.TSModuleDeclaration>;
  TSNamedTupleMember?: ExplVisitNode<S, t.TSNamedTupleMember>;
  TSNamespaceExportDeclaration?: ExplVisitNode<
    S,
    t.TSNamespaceExportDeclaration
  >;
  TSNeverKeyword?: ExplVisitNode<S, t.TSNeverKeyword>;
  TSNonNullExpression?: ExplVisitNode<S, t.TSNonNullExpression>;
  TSNullKeyword?: ExplVisitNode<S, t.TSNullKeyword>;
  TSNumberKeyword?: ExplVisitNode<S, t.TSNumberKeyword>;
  TSObjectKeyword?: ExplVisitNode<S, t.TSObjectKeyword>;
  TSOptionalType?: ExplVisitNode<S, t.TSOptionalType>;
  TSParameterProperty?: ExplVisitNode<S, t.TSParameterProperty>;
  TSParenthesizedType?: ExplVisitNode<S, t.TSParenthesizedType>;
  TSPropertySignature?: ExplVisitNode<S, t.TSPropertySignature>;
  TSQualifiedName?: ExplVisitNode<S, t.TSQualifiedName>;
  TSRestType?: ExplVisitNode<S, t.TSRestType>;
  TSSatisfiesExpression?: ExplVisitNode<S, t.TSSatisfiesExpression>;
  TSStringKeyword?: ExplVisitNode<S, t.TSStringKeyword>;
  TSSymbolKeyword?: ExplVisitNode<S, t.TSSymbolKeyword>;
  TSTemplateLiteralType?: ExplVisitNode<S, t.TSTemplateLiteralType>;
  TSThisType?: ExplVisitNode<S, t.TSThisType>;
  TSTupleType?: ExplVisitNode<S, t.TSTupleType>;
  TSTypeAliasDeclaration?: ExplVisitNode<S, t.TSTypeAliasDeclaration>;
  TSTypeAnnotation?: ExplVisitNode<S, t.TSTypeAnnotation>;
  TSTypeAssertion?: ExplVisitNode<S, t.TSTypeAssertion>;
  TSTypeLiteral?: ExplVisitNode<S, t.TSTypeLiteral>;
  TSTypeOperator?: ExplVisitNode<S, t.TSTypeOperator>;
  TSTypeParameter?: ExplVisitNode<S, t.TSTypeParameter>;
  TSTypeParameterDeclaration?: ExplVisitNode<S, t.TSTypeParameterDeclaration>;
  TSTypeParameterInstantiation?: ExplVisitNode<
    S,
    t.TSTypeParameterInstantiation
  >;
  TSTypePredicate?: ExplVisitNode<S, t.TSTypePredicate>;
  TSTypeQuery?: ExplVisitNode<S, t.TSTypeQuery>;
  TSTypeReference?: ExplVisitNode<S, t.TSTypeReference>;
  TSUndefinedKeyword?: ExplVisitNode<S, t.TSUndefinedKeyword>;
  TSUnionType?: ExplVisitNode<S, t.TSUnionType>;
  TSUnknownKeyword?: ExplVisitNode<S, t.TSUnknownKeyword>;
  TSVoidKeyword?: ExplVisitNode<S, t.TSVoidKeyword>;
  TaggedTemplateExpression?: ExplVisitNode<S, t.TaggedTemplateExpression>;
  TemplateElement?: ExplVisitNode<S, t.TemplateElement>;
  TemplateLiteral?: ExplVisitNode<S, t.TemplateLiteral>;
  ThisExpression?: ExplVisitNode<S, t.ThisExpression>;
  ThisTypeAnnotation?: ExplVisitNode<S, t.ThisTypeAnnotation>;
  ThrowStatement?: ExplVisitNode<S, t.ThrowStatement>;
  TopicReference?: ExplVisitNode<S, t.TopicReference>;
  TryStatement?: ExplVisitNode<S, t.TryStatement>;
  TupleTypeAnnotation?: ExplVisitNode<S, t.TupleTypeAnnotation>;
  TypeAlias?: ExplVisitNode<S, t.TypeAlias>;
  TypeAnnotation?: ExplVisitNode<S, t.TypeAnnotation>;
  TypeCastExpression?: ExplVisitNode<S, t.TypeCastExpression>;
  TypeParameter?: ExplVisitNode<S, t.TypeParameter>;
  TypeParameterDeclaration?: ExplVisitNode<S, t.TypeParameterDeclaration>;
  TypeParameterInstantiation?: ExplVisitNode<S, t.TypeParameterInstantiation>;
  TypeofTypeAnnotation?: ExplVisitNode<S, t.TypeofTypeAnnotation>;
  UnaryExpression?: ExplVisitNode<S, t.UnaryExpression>;
  UnionTypeAnnotation?: ExplVisitNode<S, t.UnionTypeAnnotation>;
  UpdateExpression?: ExplVisitNode<S, t.UpdateExpression>;
  V8IntrinsicIdentifier?: ExplVisitNode<S, t.V8IntrinsicIdentifier>;
  VariableDeclaration?: ExplVisitNode<S, t.VariableDeclaration>;
  VariableDeclarator?: ExplVisitNode<S, t.VariableDeclarator>;
  Variance?: ExplVisitNode<S, t.Variance>;
  VoidPattern?: ExplVisitNode<S, t.VoidPattern>;
  VoidTypeAnnotation?: ExplVisitNode<S, t.VoidTypeAnnotation>;
  WhileStatement?: ExplVisitNode<S, t.WhileStatement>;
  WithStatement?: ExplVisitNode<S, t.WithStatement>;
  YieldExpression?: ExplVisitNode<S, t.YieldExpression>;
}

interface VisitorBaseNodes<S> {
  AnyTypeAnnotation?: VisitNode<S, t.AnyTypeAnnotation>;
  ArgumentPlaceholder?: VisitNode<S, t.ArgumentPlaceholder>;
  ArrayExpression?: VisitNode<S, t.ArrayExpression>;
  ArrayPattern?: VisitNode<S, t.ArrayPattern>;
  ArrayTypeAnnotation?: VisitNode<S, t.ArrayTypeAnnotation>;
  ArrowFunctionExpression?: VisitNode<S, t.ArrowFunctionExpression>;
  AssignmentExpression?: VisitNode<S, t.AssignmentExpression>;
  AssignmentPattern?: VisitNode<S, t.AssignmentPattern>;
  AwaitExpression?: VisitNode<S, t.AwaitExpression>;
  BigIntLiteral?: VisitNode<S, t.BigIntLiteral>;
  BigIntLiteralTypeAnnotation?: VisitNode<S, t.BigIntLiteralTypeAnnotation>;
  BinaryExpression?: VisitNode<S, t.BinaryExpression>;
  BindExpression?: VisitNode<S, t.BindExpression>;
  BlockStatement?: VisitNode<S, t.BlockStatement>;
  BooleanLiteral?: VisitNode<S, t.BooleanLiteral>;
  BooleanLiteralTypeAnnotation?: VisitNode<S, t.BooleanLiteralTypeAnnotation>;
  BooleanTypeAnnotation?: VisitNode<S, t.BooleanTypeAnnotation>;
  BreakStatement?: VisitNode<S, t.BreakStatement>;
  CallExpression?: VisitNode<S, t.CallExpression>;
  CatchClause?: VisitNode<S, t.CatchClause>;
  ClassAccessorProperty?: VisitNode<S, t.ClassAccessorProperty>;
  ClassBody?: VisitNode<S, t.ClassBody>;
  ClassDeclaration?: VisitNode<S, t.ClassDeclaration>;
  ClassExpression?: VisitNode<S, t.ClassExpression>;
  ClassImplements?: VisitNode<S, t.ClassImplements>;
  ClassMethod?: VisitNode<S, t.ClassMethod>;
  ClassPrivateMethod?: VisitNode<S, t.ClassPrivateMethod>;
  ClassPrivateProperty?: VisitNode<S, t.ClassPrivateProperty>;
  ClassProperty?: VisitNode<S, t.ClassProperty>;
  ConditionalExpression?: VisitNode<S, t.ConditionalExpression>;
  ContinueStatement?: VisitNode<S, t.ContinueStatement>;
  DebuggerStatement?: VisitNode<S, t.DebuggerStatement>;
  DeclareClass?: VisitNode<S, t.DeclareClass>;
  DeclareExportAllDeclaration?: VisitNode<S, t.DeclareExportAllDeclaration>;
  DeclareExportDeclaration?: VisitNode<S, t.DeclareExportDeclaration>;
  DeclareFunction?: VisitNode<S, t.DeclareFunction>;
  DeclareInterface?: VisitNode<S, t.DeclareInterface>;
  DeclareModule?: VisitNode<S, t.DeclareModule>;
  DeclareModuleExports?: VisitNode<S, t.DeclareModuleExports>;
  DeclareOpaqueType?: VisitNode<S, t.DeclareOpaqueType>;
  DeclareTypeAlias?: VisitNode<S, t.DeclareTypeAlias>;
  DeclareVariable?: VisitNode<S, t.DeclareVariable>;
  DeclaredPredicate?: VisitNode<S, t.DeclaredPredicate>;
  Decorator?: VisitNode<S, t.Decorator>;
  Directive?: VisitNode<S, t.Directive>;
  DirectiveLiteral?: VisitNode<S, t.DirectiveLiteral>;
  DoExpression?: VisitNode<S, t.DoExpression>;
  DoWhileStatement?: VisitNode<S, t.DoWhileStatement>;
  EmptyStatement?: VisitNode<S, t.EmptyStatement>;
  EmptyTypeAnnotation?: VisitNode<S, t.EmptyTypeAnnotation>;
  EnumBooleanBody?: VisitNode<S, t.EnumBooleanBody>;
  EnumBooleanMember?: VisitNode<S, t.EnumBooleanMember>;
  EnumDeclaration?: VisitNode<S, t.EnumDeclaration>;
  EnumDefaultedMember?: VisitNode<S, t.EnumDefaultedMember>;
  EnumNumberBody?: VisitNode<S, t.EnumNumberBody>;
  EnumNumberMember?: VisitNode<S, t.EnumNumberMember>;
  EnumStringBody?: VisitNode<S, t.EnumStringBody>;
  EnumStringMember?: VisitNode<S, t.EnumStringMember>;
  EnumSymbolBody?: VisitNode<S, t.EnumSymbolBody>;
  ExistsTypeAnnotation?: VisitNode<S, t.ExistsTypeAnnotation>;
  ExportAllDeclaration?: VisitNode<S, t.ExportAllDeclaration>;
  ExportDefaultDeclaration?: VisitNode<S, t.ExportDefaultDeclaration>;
  ExportDefaultSpecifier?: VisitNode<S, t.ExportDefaultSpecifier>;
  ExportNamedDeclaration?: VisitNode<S, t.ExportNamedDeclaration>;
  ExportNamespaceSpecifier?: VisitNode<S, t.ExportNamespaceSpecifier>;
  ExportSpecifier?: VisitNode<S, t.ExportSpecifier>;
  ExpressionStatement?: VisitNode<S, t.ExpressionStatement>;
  File?: VisitNode<S, t.File>;
  ForInStatement?: VisitNode<S, t.ForInStatement>;
  ForOfStatement?: VisitNode<S, t.ForOfStatement>;
  ForStatement?: VisitNode<S, t.ForStatement>;
  FunctionDeclaration?: VisitNode<S, t.FunctionDeclaration>;
  FunctionExpression?: VisitNode<S, t.FunctionExpression>;
  FunctionTypeAnnotation?: VisitNode<S, t.FunctionTypeAnnotation>;
  FunctionTypeParam?: VisitNode<S, t.FunctionTypeParam>;
  GenericTypeAnnotation?: VisitNode<S, t.GenericTypeAnnotation>;
  Identifier?: VisitNode<S, t.Identifier>;
  IfStatement?: VisitNode<S, t.IfStatement>;
  Import?: VisitNode<S, t.Import>;
  ImportAttribute?: VisitNode<S, t.ImportAttribute>;
  ImportDeclaration?: VisitNode<S, t.ImportDeclaration>;
  ImportDefaultSpecifier?: VisitNode<S, t.ImportDefaultSpecifier>;
  ImportExpression?: VisitNode<S, t.ImportExpression>;
  ImportNamespaceSpecifier?: VisitNode<S, t.ImportNamespaceSpecifier>;
  ImportSpecifier?: VisitNode<S, t.ImportSpecifier>;
  IndexedAccessType?: VisitNode<S, t.IndexedAccessType>;
  InferredPredicate?: VisitNode<S, t.InferredPredicate>;
  InterfaceDeclaration?: VisitNode<S, t.InterfaceDeclaration>;
  InterfaceExtends?: VisitNode<S, t.InterfaceExtends>;
  InterfaceTypeAnnotation?: VisitNode<S, t.InterfaceTypeAnnotation>;
  InterpreterDirective?: VisitNode<S, t.InterpreterDirective>;
  IntersectionTypeAnnotation?: VisitNode<S, t.IntersectionTypeAnnotation>;
  JSXAttribute?: VisitNode<S, t.JSXAttribute>;
  JSXClosingElement?: VisitNode<S, t.JSXClosingElement>;
  JSXClosingFragment?: VisitNode<S, t.JSXClosingFragment>;
  JSXElement?: VisitNode<S, t.JSXElement>;
  JSXEmptyExpression?: VisitNode<S, t.JSXEmptyExpression>;
  JSXExpressionContainer?: VisitNode<S, t.JSXExpressionContainer>;
  JSXFragment?: VisitNode<S, t.JSXFragment>;
  JSXIdentifier?: VisitNode<S, t.JSXIdentifier>;
  JSXMemberExpression?: VisitNode<S, t.JSXMemberExpression>;
  JSXNamespacedName?: VisitNode<S, t.JSXNamespacedName>;
  JSXOpeningElement?: VisitNode<S, t.JSXOpeningElement>;
  JSXOpeningFragment?: VisitNode<S, t.JSXOpeningFragment>;
  JSXSpreadAttribute?: VisitNode<S, t.JSXSpreadAttribute>;
  JSXSpreadChild?: VisitNode<S, t.JSXSpreadChild>;
  JSXText?: VisitNode<S, t.JSXText>;
  LabeledStatement?: VisitNode<S, t.LabeledStatement>;
  LogicalExpression?: VisitNode<S, t.LogicalExpression>;
  MemberExpression?: VisitNode<S, t.MemberExpression>;
  MetaProperty?: VisitNode<S, t.MetaProperty>;
  MixedTypeAnnotation?: VisitNode<S, t.MixedTypeAnnotation>;
  ModuleExpression?: VisitNode<S, t.ModuleExpression>;
  NewExpression?: VisitNode<S, t.NewExpression>;
  NullLiteral?: VisitNode<S, t.NullLiteral>;
  NullLiteralTypeAnnotation?: VisitNode<S, t.NullLiteralTypeAnnotation>;
  NullableTypeAnnotation?: VisitNode<S, t.NullableTypeAnnotation>;
  NumberLiteral?: VisitNode<S, t.NumberLiteral>;
  NumberLiteralTypeAnnotation?: VisitNode<S, t.NumberLiteralTypeAnnotation>;
  NumberTypeAnnotation?: VisitNode<S, t.NumberTypeAnnotation>;
  NumericLiteral?: VisitNode<S, t.NumericLiteral>;
  ObjectExpression?: VisitNode<S, t.ObjectExpression>;
  ObjectMethod?: VisitNode<S, t.ObjectMethod>;
  ObjectPattern?: VisitNode<S, t.ObjectPattern>;
  ObjectProperty?: VisitNode<S, t.ObjectProperty>;
  ObjectTypeAnnotation?: VisitNode<S, t.ObjectTypeAnnotation>;
  ObjectTypeCallProperty?: VisitNode<S, t.ObjectTypeCallProperty>;
  ObjectTypeIndexer?: VisitNode<S, t.ObjectTypeIndexer>;
  ObjectTypeInternalSlot?: VisitNode<S, t.ObjectTypeInternalSlot>;
  ObjectTypeProperty?: VisitNode<S, t.ObjectTypeProperty>;
  ObjectTypeSpreadProperty?: VisitNode<S, t.ObjectTypeSpreadProperty>;
  OpaqueType?: VisitNode<S, t.OpaqueType>;
  OptionalCallExpression?: VisitNode<S, t.OptionalCallExpression>;
  OptionalIndexedAccessType?: VisitNode<S, t.OptionalIndexedAccessType>;
  OptionalMemberExpression?: VisitNode<S, t.OptionalMemberExpression>;
  ParenthesizedExpression?: VisitNode<S, t.ParenthesizedExpression>;
  Placeholder?: VisitNode<S, t.Placeholder>;
  PrivateName?: VisitNode<S, t.PrivateName>;
  Program?: VisitNode<S, t.Program>;
  QualifiedTypeIdentifier?: VisitNode<S, t.QualifiedTypeIdentifier>;
  RegExpLiteral?: VisitNode<S, t.RegExpLiteral>;
  RegexLiteral?: VisitNode<S, t.RegexLiteral>;
  RestElement?: VisitNode<S, t.RestElement>;
  RestProperty?: VisitNode<S, t.RestProperty>;
  ReturnStatement?: VisitNode<S, t.ReturnStatement>;
  SequenceExpression?: VisitNode<S, t.SequenceExpression>;
  SpreadElement?: VisitNode<S, t.SpreadElement>;
  SpreadProperty?: VisitNode<S, t.SpreadProperty>;
  StaticBlock?: VisitNode<S, t.StaticBlock>;
  StringLiteral?: VisitNode<S, t.StringLiteral>;
  StringLiteralTypeAnnotation?: VisitNode<S, t.StringLiteralTypeAnnotation>;
  StringTypeAnnotation?: VisitNode<S, t.StringTypeAnnotation>;
  Super?: VisitNode<S, t.Super>;
  SwitchCase?: VisitNode<S, t.SwitchCase>;
  SwitchStatement?: VisitNode<S, t.SwitchStatement>;
  SymbolTypeAnnotation?: VisitNode<S, t.SymbolTypeAnnotation>;
  TSAnyKeyword?: VisitNode<S, t.TSAnyKeyword>;
  TSArrayType?: VisitNode<S, t.TSArrayType>;
  TSAsExpression?: VisitNode<S, t.TSAsExpression>;
  TSBigIntKeyword?: VisitNode<S, t.TSBigIntKeyword>;
  TSBooleanKeyword?: VisitNode<S, t.TSBooleanKeyword>;
  TSCallSignatureDeclaration?: VisitNode<S, t.TSCallSignatureDeclaration>;
  TSClassImplements?: VisitNode<S, t.TSClassImplements>;
  TSConditionalType?: VisitNode<S, t.TSConditionalType>;
  TSConstructSignatureDeclaration?: VisitNode<
    S,
    t.TSConstructSignatureDeclaration
  >;
  TSConstructorType?: VisitNode<S, t.TSConstructorType>;
  TSDeclareFunction?: VisitNode<S, t.TSDeclareFunction>;
  TSDeclareMethod?: VisitNode<S, t.TSDeclareMethod>;
  TSEnumBody?: VisitNode<S, t.TSEnumBody>;
  TSEnumDeclaration?: VisitNode<S, t.TSEnumDeclaration>;
  TSEnumMember?: VisitNode<S, t.TSEnumMember>;
  TSExportAssignment?: VisitNode<S, t.TSExportAssignment>;
  TSExternalModuleReference?: VisitNode<S, t.TSExternalModuleReference>;
  TSFunctionType?: VisitNode<S, t.TSFunctionType>;
  TSImportEqualsDeclaration?: VisitNode<S, t.TSImportEqualsDeclaration>;
  TSImportType?: VisitNode<S, t.TSImportType>;
  TSIndexSignature?: VisitNode<S, t.TSIndexSignature>;
  TSIndexedAccessType?: VisitNode<S, t.TSIndexedAccessType>;
  TSInferType?: VisitNode<S, t.TSInferType>;
  TSInstantiationExpression?: VisitNode<S, t.TSInstantiationExpression>;
  TSInterfaceBody?: VisitNode<S, t.TSInterfaceBody>;
  TSInterfaceDeclaration?: VisitNode<S, t.TSInterfaceDeclaration>;
  TSInterfaceHeritage?: VisitNode<S, t.TSInterfaceHeritage>;
  TSIntersectionType?: VisitNode<S, t.TSIntersectionType>;
  TSIntrinsicKeyword?: VisitNode<S, t.TSIntrinsicKeyword>;
  TSLiteralType?: VisitNode<S, t.TSLiteralType>;
  TSMappedType?: VisitNode<S, t.TSMappedType>;
  TSMethodSignature?: VisitNode<S, t.TSMethodSignature>;
  TSModuleBlock?: VisitNode<S, t.TSModuleBlock>;
  TSModuleDeclaration?: VisitNode<S, t.TSModuleDeclaration>;
  TSNamedTupleMember?: VisitNode<S, t.TSNamedTupleMember>;
  TSNamespaceExportDeclaration?: VisitNode<S, t.TSNamespaceExportDeclaration>;
  TSNeverKeyword?: VisitNode<S, t.TSNeverKeyword>;
  TSNonNullExpression?: VisitNode<S, t.TSNonNullExpression>;
  TSNullKeyword?: VisitNode<S, t.TSNullKeyword>;
  TSNumberKeyword?: VisitNode<S, t.TSNumberKeyword>;
  TSObjectKeyword?: VisitNode<S, t.TSObjectKeyword>;
  TSOptionalType?: VisitNode<S, t.TSOptionalType>;
  TSParameterProperty?: VisitNode<S, t.TSParameterProperty>;
  TSParenthesizedType?: VisitNode<S, t.TSParenthesizedType>;
  TSPropertySignature?: VisitNode<S, t.TSPropertySignature>;
  TSQualifiedName?: VisitNode<S, t.TSQualifiedName>;
  TSRestType?: VisitNode<S, t.TSRestType>;
  TSSatisfiesExpression?: VisitNode<S, t.TSSatisfiesExpression>;
  TSStringKeyword?: VisitNode<S, t.TSStringKeyword>;
  TSSymbolKeyword?: VisitNode<S, t.TSSymbolKeyword>;
  TSTemplateLiteralType?: VisitNode<S, t.TSTemplateLiteralType>;
  TSThisType?: VisitNode<S, t.TSThisType>;
  TSTupleType?: VisitNode<S, t.TSTupleType>;
  TSTypeAliasDeclaration?: VisitNode<S, t.TSTypeAliasDeclaration>;
  TSTypeAnnotation?: VisitNode<S, t.TSTypeAnnotation>;
  TSTypeAssertion?: VisitNode<S, t.TSTypeAssertion>;
  TSTypeLiteral?: VisitNode<S, t.TSTypeLiteral>;
  TSTypeOperator?: VisitNode<S, t.TSTypeOperator>;
  TSTypeParameter?: VisitNode<S, t.TSTypeParameter>;
  TSTypeParameterDeclaration?: VisitNode<S, t.TSTypeParameterDeclaration>;
  TSTypeParameterInstantiation?: VisitNode<S, t.TSTypeParameterInstantiation>;
  TSTypePredicate?: VisitNode<S, t.TSTypePredicate>;
  TSTypeQuery?: VisitNode<S, t.TSTypeQuery>;
  TSTypeReference?: VisitNode<S, t.TSTypeReference>;
  TSUndefinedKeyword?: VisitNode<S, t.TSUndefinedKeyword>;
  TSUnionType?: VisitNode<S, t.TSUnionType>;
  TSUnknownKeyword?: VisitNode<S, t.TSUnknownKeyword>;
  TSVoidKeyword?: VisitNode<S, t.TSVoidKeyword>;
  TaggedTemplateExpression?: VisitNode<S, t.TaggedTemplateExpression>;
  TemplateElement?: VisitNode<S, t.TemplateElement>;
  TemplateLiteral?: VisitNode<S, t.TemplateLiteral>;
  ThisExpression?: VisitNode<S, t.ThisExpression>;
  ThisTypeAnnotation?: VisitNode<S, t.ThisTypeAnnotation>;
  ThrowStatement?: VisitNode<S, t.ThrowStatement>;
  TopicReference?: VisitNode<S, t.TopicReference>;
  TryStatement?: VisitNode<S, t.TryStatement>;
  TupleTypeAnnotation?: VisitNode<S, t.TupleTypeAnnotation>;
  TypeAlias?: VisitNode<S, t.TypeAlias>;
  TypeAnnotation?: VisitNode<S, t.TypeAnnotation>;
  TypeCastExpression?: VisitNode<S, t.TypeCastExpression>;
  TypeParameter?: VisitNode<S, t.TypeParameter>;
  TypeParameterDeclaration?: VisitNode<S, t.TypeParameterDeclaration>;
  TypeParameterInstantiation?: VisitNode<S, t.TypeParameterInstantiation>;
  TypeofTypeAnnotation?: VisitNode<S, t.TypeofTypeAnnotation>;
  UnaryExpression?: VisitNode<S, t.UnaryExpression>;
  UnionTypeAnnotation?: VisitNode<S, t.UnionTypeAnnotation>;
  UpdateExpression?: VisitNode<S, t.UpdateExpression>;
  V8IntrinsicIdentifier?: VisitNode<S, t.V8IntrinsicIdentifier>;
  VariableDeclaration?: VisitNode<S, t.VariableDeclaration>;
  VariableDeclarator?: VisitNode<S, t.VariableDeclarator>;
  Variance?: VisitNode<S, t.Variance>;
  VoidPattern?: VisitNode<S, t.VoidPattern>;
  VoidTypeAnnotation?: VisitNode<S, t.VoidTypeAnnotation>;
  WhileStatement?: VisitNode<S, t.WhileStatement>;
  WithStatement?: VisitNode<S, t.WithStatement>;
  YieldExpression?: VisitNode<S, t.YieldExpression>;
}

interface VisitorBaseAliases<S> {
  Accessor?: VisitNode<S, t.Accessor>;
  Binary?: VisitNode<S, t.Binary>;
  Block?: VisitNode<S, t.Block>;
  BlockParent?: VisitNode<S, t.BlockParent>;
  Class?: VisitNode<S, t.Class>;
  CompletionStatement?: VisitNode<S, t.CompletionStatement>;
  Conditional?: VisitNode<S, t.Conditional>;
  Declaration?: VisitNode<S, t.Declaration>;
  EnumBody?: VisitNode<S, t.EnumBody>;
  EnumMember?: VisitNode<S, t.EnumMember>;
  ExportDeclaration?: VisitNode<S, t.ExportDeclaration>;
  Expression?: VisitNode<S, t.Expression>;
  ExpressionWrapper?: VisitNode<S, t.ExpressionWrapper>;
  Flow?: VisitNode<S, t.Flow>;
  FlowBaseAnnotation?: VisitNode<S, t.FlowBaseAnnotation>;
  FlowDeclaration?: VisitNode<S, t.FlowDeclaration>;
  FlowPredicate?: VisitNode<S, t.FlowPredicate>;
  FlowType?: VisitNode<S, t.FlowType>;
  For?: VisitNode<S, t.For>;
  ForXStatement?: VisitNode<S, t.ForXStatement>;
  Function?: VisitNode<S, t.Function>;
  FunctionParameter?: VisitNode<S, t.FunctionParameter>;
  FunctionParent?: VisitNode<S, t.FunctionParent>;
  Immutable?: VisitNode<S, t.Immutable>;
  ImportOrExportDeclaration?: VisitNode<S, t.ImportOrExportDeclaration>;
  JSX?: VisitNode<S, t.JSX>;
  LVal?: VisitNode<S, t.LVal>;
  Literal?: VisitNode<S, t.Literal>;
  Loop?: VisitNode<S, t.Loop>;
  Method?: VisitNode<S, t.Method>;
  Miscellaneous?: VisitNode<S, t.Miscellaneous>;
  ModuleDeclaration?: VisitNode<S, t.ModuleDeclaration>;
  ModuleSpecifier?: VisitNode<S, t.ModuleSpecifier>;
  ObjectMember?: VisitNode<S, t.ObjectMember>;
  Pattern?: VisitNode<S, t.Pattern>;
  PatternLike?: VisitNode<S, t.PatternLike>;
  Private?: VisitNode<S, t.Private>;
  Property?: VisitNode<S, t.Property>;
  Pureish?: VisitNode<S, t.Pureish>;
  Scopable?: VisitNode<S, t.Scopable>;
  Standardized?: VisitNode<S, t.Standardized>;
  Statement?: VisitNode<S, t.Statement>;
  TSBaseType?: VisitNode<S, t.TSBaseType>;
  TSEntityName?: VisitNode<S, t.TSEntityName>;
  TSType?: VisitNode<S, t.TSType>;
  TSTypeElement?: VisitNode<S, t.TSTypeElement>;
  Terminatorless?: VisitNode<S, t.Terminatorless>;
  TypeScript?: VisitNode<S, t.TypeScript>;
  UnaryLike?: VisitNode<S, t.UnaryLike>;
  UserWhitespacable?: VisitNode<S, t.UserWhitespacable>;
  While?: VisitNode<S, t.While>;
}

type VisitPhase = "enter" | "exit";
interface VisitNodeObject<S, P extends t.Node> {
    enter?: VisitNodeFunction<S, P>;
    exit?: VisitNodeFunction<S, P>;
}
interface ExplVisitNode<S, P extends t.Node> {
    enter?: VisitNodeFunction<S, P>[];
    exit?: VisitNodeFunction<S, P>[];
}
interface ExplodedVisitor<S = unknown> extends ExplVisitorBase<S>, ExplVisitNode<S, t.Node> {
    _exploded: true;
    _verified: true;
}
interface VisitorVirtualAliases<S> {
    BindingIdentifier?: VisitNode<S, VirtualTypeAliases["BindingIdentifier"]>;
    BlockScoped?: VisitNode<S, VirtualTypeAliases["BlockScoped"]>;
    ExistentialTypeParam?: VisitNode<S, VirtualTypeAliases["ExistentialTypeParam"]>;
    Expression?: VisitNode<S, VirtualTypeAliases["Expression"]>;
    ForAwaitStatement?: VisitNode<S, VirtualTypeAliases["ForAwaitStatement"]>;
    Generated?: VisitNode<S, VirtualTypeAliases["Generated"]>;
    NumericLiteralTypeAnnotation?: VisitNode<S, VirtualTypeAliases["NumericLiteralTypeAnnotation"]>;
    Pure?: VisitNode<S, VirtualTypeAliases["Pure"]>;
    Referenced?: VisitNode<S, VirtualTypeAliases["Referenced"]>;
    ReferencedIdentifier?: VisitNode<S, VirtualTypeAliases["ReferencedIdentifier"]>;
    ReferencedMemberExpression?: VisitNode<S, VirtualTypeAliases["ReferencedMemberExpression"]>;
    Scope?: VisitNode<S, VirtualTypeAliases["Scope"]>;
    Statement?: VisitNode<S, VirtualTypeAliases["Statement"]>;
    User?: VisitNode<S, VirtualTypeAliases["User"]>;
    Var?: VisitNode<S, VirtualTypeAliases["Var"]>;
}
interface VisitorBase<S> extends VisitNodeObject<S, t.Node>, VisitorBaseNodes<S>, VisitorBaseAliases<S>, VisitorVirtualAliases<S>, Record<`${string}|${string}`, VisitNode<S, t.Node>> {
}
type Visitor<S = unknown> = VisitorBase<S> | ExplodedVisitor<S>;
type VisitNode<S, P extends t.Node> = VisitNodeFunction<S, P> | VisitNodeObject<S, P>;
type VisitNodeFunction<S, P extends t.Node> = (this: S, path: NodePath_Final<P>, state: S) => void;
type Split$1<S extends string> = S extends `${infer L}|${infer R}` ? L | Split$1<R> : S;
type ToNode<S extends string, N = Split$1<S>> = N extends keyof t.Aliases ? t.Aliases[N] : N extends keyof VirtualTypeAliases ? VirtualTypeAliases[N] : Extract<t.Node, {
    type: N;
}>;
type OptionKeys = keyof TraverseOptions;
type VisitorProp<S, K extends string> = K extends OptionKeys ? TraverseOptions[K] : VisitNode<S, ToNode<K>>;
type TraverseOptions = {
    scope?: Scope;
    noScope?: boolean;
    denylist?: string[];
    shouldSkip?: (node: NodePath_Final) => boolean;
};

declare class TraversalContext<S = unknown> {
    constructor(opts: TraverseOptions & ExplodedVisitor<S>, state: S);
    state: S;
    opts: TraverseOptions & ExplodedVisitor<S>;
    queue: NodePath_Final<t.Node | null>[] | null;
    priorityQueue: NodePath_Final<t.Node | null>[] | null;
    maybeQueue(path: NodePath_Final<t.Node | null>, notPriority?: boolean): void;
}

/**
 * Starting at the parent path of the current `NodePath` and going up the
 * tree, return the first `NodePath` that causes the provided `callback`
 * to return a truthy value, or `null` if the `callback` never returns a
 * truthy value.
 */
declare function findParent(this: NodePath_Final<t.Node | null>, callback: (path: NodePath_Final) => boolean): NodePath_Final | null;
/**
 * Starting at current `NodePath` and going up the tree, return the first
 * `NodePath` that causes the provided `callback` to return a truthy value,
 * or `null` if the `callback` never returns a truthy value.
 */
declare function find(this: NodePath_Final, callback: (path: NodePath_Final) => boolean): NodePath_Final | null;
/**
 * Get the parent function of the current path.
 */
declare function getFunctionParent(this: NodePath_Final<t.Node | null>): NodePath_Final<t.Function> | null;
/**
 * Walk up the tree until we hit a parent node path in a list.
 */
declare function getStatementParent(this: NodePath_Final<t.Node | null>): NodePath_Final<t.Statement>;
/**
 * Get the deepest common ancestor and then from it, get the earliest relationship path
 * to that ancestor.
 *
 * Earliest is defined as being "before" all the other nodes in terms of list container
 * position and visiting key.
 */
declare function getEarliestCommonAncestorFrom(this: NodePath_Final, paths: NodePath_Final[]): NodePath_Final;
/**
 * Get the earliest path in the tree where the provided `paths` intersect.
 *
 * TODO: Possible optimisation target.
 */
declare function getDeepestCommonAncestorFrom(this: NodePath_Final, paths: NodePath_Final[], filter?: (deepest: NodePath_Final, i: number, ancestries: NodePath_Final[][]) => NodePath_Final): NodePath_Final;
/**
 * Build an array of node paths containing the entire ancestry of the current node path.
 *
 * NOTE: The current node path is included in this.
 */
declare function getAncestry(this: NodePath_Final): NodePath_Final[];
/**
 * A helper to find if `this` path is an ancestor of @param maybeDescendant
 */
declare function isAncestor(this: NodePath_Final, maybeDescendant: NodePath_Final): boolean;
/**
 * A helper to find if `this` path is a descendant of @param maybeAncestor
 */
declare function isDescendant(this: NodePath_Final, maybeAncestor: NodePath_Final): boolean;
declare function inType(this: NodePath_Final, ...candidateTypes: string[]): boolean;

/**
 * Infer the type of the current `NodePath`.
 */
declare function getTypeAnnotation(this: NodePath_Final<t.Node | null>): t.FlowType | t.TSType;
declare function isBaseType(this: NodePath_Final, baseName: string, soft?: boolean): boolean;
declare function couldBeBaseType(this: NodePath_Final, name: string): boolean;
declare function baseTypeStrictlyMatches(this: NodePath_Final, rightArg: NodePath_Final): boolean;
declare function isGenericType(this: NodePath_Final, genericName: string): boolean;

declare function replaceWithMultiple<Nodes extends NodeOrNodeList<t.Node>>(this: NodePath_Final<t.Node | null>, nodes: Nodes): NodePaths<Nodes>;
/**
 * Parse a string as an expression and replace the current node with the result.
 *
 * NOTE: This is typically not a good idea to use. Building source strings when
 * transforming ASTs is an antipattern and SHOULD NOT be encouraged. Even if it's
 * easier to use, your transforms will be extremely brittle.
 */
declare function replaceWithSourceString(this: NodePath_Final<t.Node | null>, replacement: string): [NodePath<t.Identifier, "Identifier", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.BreakStatement | t.CallExpression | t.CatchClause | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassImplements | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.ContinueStatement | t.DeclareClass | t.DeclareFunction | t.DeclareInterface | t.DeclareModule | t.DeclareOpaqueType | t.DeclareTypeAlias | t.DeclareVariable | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.EnumDeclaration | t.EnumDefaultedMember | t.EnumNumberMember | t.EnumStringMember | t.ExportDefaultDeclaration | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.FunctionDeclaration | t.FunctionExpression | t.FunctionTypeParam | t.GenericTypeAnnotation | t.IfStatement | t.ImportAttribute | t.ImportDefaultSpecifier | t.ImportExpression | t.ImportNamespaceSpecifier | t.ImportSpecifier | t.InterfaceDeclaration | t.InterfaceExtends | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LabeledStatement | t.LogicalExpression | t.MemberExpression | t.MetaProperty | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.OpaqueType | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.Placeholder | t.PrivateName | t.QualifiedTypeIdentifier | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSCallSignatureDeclaration | t.TSClassImplements | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSEnumDeclaration | t.TSEnumMember | t.TSExportAssignment | t.TSFunctionType | t.TSImportEqualsDeclaration | t.TSImportType | t.TSIndexSignature | t.TSInstantiationExpression | t.TSInterfaceDeclaration | t.TSInterfaceHeritage | t.TSMappedType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNamedTupleMember | t.TSNamespaceExportDeclaration | t.TSNonNullExpression | t.TSParameterProperty | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAliasDeclaration | t.TSTypeAssertion | t.TSTypeParameter | t.TSTypePredicate | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeAlias | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ArrayExpression, "ArrayExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ArrowFunctionExpression, "ArrowFunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AssignmentExpression, "AssignmentExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AwaitExpression, "AwaitExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BigIntLiteral, "BigIntLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BinaryExpressionIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BinaryExpressionNotIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BindExpression, "BindExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BooleanLiteral, "BooleanLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.CallExpression, "CallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ClassExpression, "ClassExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ConditionalExpression, "ConditionalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.DoExpression, "DoExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.FunctionExpression, "FunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ImportExpression, "ImportExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXElement, "JSXElement", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXFragment, "JSXFragment", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.LogicalExpression, "LogicalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionNonComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MetaProperty, "MetaProperty", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ModuleExpression, "ModuleExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NewExpression, "NewExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NullLiteral, "NullLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NumericLiteral, "NumericLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumNumberMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ObjectExpression, "ObjectExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalCallExpression, "OptionalCallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalMemberExpressionComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalMemberExpressionNonComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ParenthesizedExpression, "ParenthesizedExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.RegExpLiteral, "RegExpLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.SequenceExpression, "SequenceExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.StringLiteral, "StringLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportAllDeclaration | t.DeclareExportDeclaration | t.DeclareModule | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumStringMember | t.ExportAllDeclaration | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportAttribute | t.ImportDeclaration | t.ImportExpression | t.ImportSpecifier | t.JSXAttribute | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSExternalModuleReference | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSAsExpression, "TSAsExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSInstantiationExpression, "TSInstantiationExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSNonNullExpression, "TSNonNullExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSSatisfiesExpression, "TSSatisfiesExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSTypeAssertion, "TSTypeAssertion", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TaggedTemplateExpression, "TaggedTemplateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TemplateLiteral, "TemplateLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ThisExpression, "ThisExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportEqualsDeclaration | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TopicReference, "TopicReference", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TypeCastExpression, "TypeCastExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportDeclaration | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.UnaryExpression, "UnaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.UpdateExpression, "UpdateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.YieldExpression, "YieldExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>>];
/**
 * Replace the current node with another.
 */
declare function replaceWith<R extends t.Node>(this: NodePath_Final<t.Node | null>, replacementPath: R): [NodePath_Final<R>];
declare function replaceWith<R extends NodePath_Final<t.Node>>(this: NodePath_Final<t.Node | null>, replacementPath: R): [R];
/**
 * This method takes an array of statements nodes and then explodes it
 * into expressions. This method retains completion records which is
 * extremely important to retain original semantics.
 */
declare function replaceExpressionWithStatements(this: NodePath_Final<t.Node | null>, nodes: t.Statement[]): NodePath<null, null, t.Node> | (NodePath<t.Identifier, "Identifier", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.BreakStatement | t.CallExpression | t.CatchClause | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassImplements | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.ContinueStatement | t.DeclareClass | t.DeclareFunction | t.DeclareInterface | t.DeclareModule | t.DeclareOpaqueType | t.DeclareTypeAlias | t.DeclareVariable | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.EnumDeclaration | t.EnumDefaultedMember | t.EnumNumberMember | t.EnumStringMember | t.ExportDefaultDeclaration | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.FunctionDeclaration | t.FunctionExpression | t.FunctionTypeParam | t.GenericTypeAnnotation | t.IfStatement | t.ImportAttribute | t.ImportDefaultSpecifier | t.ImportExpression | t.ImportNamespaceSpecifier | t.ImportSpecifier | t.InterfaceDeclaration | t.InterfaceExtends | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LabeledStatement | t.LogicalExpression | t.MemberExpression | t.MetaProperty | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.OpaqueType | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.Placeholder | t.PrivateName | t.QualifiedTypeIdentifier | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSCallSignatureDeclaration | t.TSClassImplements | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSEnumDeclaration | t.TSEnumMember | t.TSExportAssignment | t.TSFunctionType | t.TSImportEqualsDeclaration | t.TSImportType | t.TSIndexSignature | t.TSInstantiationExpression | t.TSInterfaceDeclaration | t.TSInterfaceHeritage | t.TSMappedType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNamedTupleMember | t.TSNamespaceExportDeclaration | t.TSNonNullExpression | t.TSParameterProperty | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAliasDeclaration | t.TSTypeAssertion | t.TSTypeParameter | t.TSTypePredicate | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeAlias | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ArrayExpression, "ArrayExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ArrowFunctionExpression, "ArrowFunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AssignmentExpression, "AssignmentExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AwaitExpression, "AwaitExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BigIntLiteral, "BigIntLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BinaryExpressionIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BinaryExpressionNotIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BindExpression, "BindExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BooleanLiteral, "BooleanLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.CallExpression, "CallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ClassExpression, "ClassExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ConditionalExpression, "ConditionalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.DoExpression, "DoExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.FunctionExpression, "FunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ImportExpression, "ImportExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXElement, "JSXElement", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXFragment, "JSXFragment", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.LogicalExpression, "LogicalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionNonComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MetaProperty, "MetaProperty", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ModuleExpression, "ModuleExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NewExpression, "NewExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NullLiteral, "NullLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NumericLiteral, "NumericLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumNumberMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ObjectExpression, "ObjectExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalCallExpression, "OptionalCallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalMemberExpressionComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalMemberExpressionNonComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ParenthesizedExpression, "ParenthesizedExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.RegExpLiteral, "RegExpLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.SequenceExpression, "SequenceExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.StringLiteral, "StringLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportAllDeclaration | t.DeclareExportDeclaration | t.DeclareModule | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumStringMember | t.ExportAllDeclaration | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportAttribute | t.ImportDeclaration | t.ImportExpression | t.ImportSpecifier | t.JSXAttribute | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSExternalModuleReference | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSAnyKeyword, "TSAnyKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSArrayType, "TSArrayType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSAsExpression, "TSAsExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSBigIntKeyword, "TSBigIntKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSBooleanKeyword, "TSBooleanKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSClassImplements, "TSClassImplements", NonNullable<t.ClassDeclaration | t.ClassExpression | t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSConditionalType, "TSConditionalType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSConstructorType, "TSConstructorType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSFunctionType, "TSFunctionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSImportType, "TSImportType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSTypeQuery | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIndexedAccessType, "TSIndexedAccessType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSInferType, "TSInferType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSInstantiationExpression, "TSInstantiationExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSInterfaceHeritage, "TSInterfaceHeritage", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSInterfaceDeclaration | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIntersectionType, "TSIntersectionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIntrinsicKeyword, "TSIntrinsicKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSLiteralType, "TSLiteralType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSMappedType, "TSMappedType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSNeverKeyword, "TSNeverKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSNonNullExpression, "TSNonNullExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSNullKeyword, "TSNullKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSNumberKeyword, "TSNumberKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSObjectKeyword, "TSObjectKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSOptionalType, "TSOptionalType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSParenthesizedType, "TSParenthesizedType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSRestType, "TSRestType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSSatisfiesExpression, "TSSatisfiesExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSStringKeyword, "TSStringKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSSymbolKeyword, "TSSymbolKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTemplateLiteralType, "TSTemplateLiteralType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSThisType, "TSThisType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSTypePredicate | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTupleType, "TSTupleType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeAssertion, "TSTypeAssertion", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSTypeLiteral, "TSTypeLiteral", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeOperator, "TSTypeOperator", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypePredicate, "TSTypePredicate", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeQuery, "TSTypeQuery", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeReference, "TSTypeReference", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUndefinedKeyword, "TSUndefinedKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUnionType, "TSUnionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUnknownKeyword, "TSUnknownKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSVoidKeyword, "TSVoidKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TaggedTemplateExpression, "TaggedTemplateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TemplateLiteral, "TemplateLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ThisExpression, "ThisExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportEqualsDeclaration | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TopicReference, "TopicReference", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TypeCastExpression, "TypeCastExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportDeclaration | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.UnaryExpression, "UnaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.UpdateExpression, "UpdateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.YieldExpression, "YieldExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>>)[] | (NodePath<t.BlockStatement, "BlockStatement", NonNullable<t.ArrowFunctionExpression | t.BlockStatement | t.CatchClause | t.ClassMethod | t.ClassPrivateMethod | t.DeclareModule | t.DoExpression | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.FunctionDeclaration | t.FunctionExpression | t.IfStatement | t.LabeledStatement | t.ObjectMethod | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.TryStatement | t.WhileStatement | t.WithStatement>> | NodePath<t.BreakStatement, "BreakStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ClassDeclaration, "ClassDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ContinueStatement, "ContinueStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DebuggerStatement, "DebuggerStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareClass, "DeclareClass", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareExportAllDeclaration, "DeclareExportAllDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareExportDeclaration, "DeclareExportDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareFunction, "DeclareFunction", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareInterface, "DeclareInterface", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareModule, "DeclareModule", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareModuleExports, "DeclareModuleExports", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareOpaqueType, "DeclareOpaqueType", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareTypeAlias, "DeclareTypeAlias", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareVariable, "DeclareVariable", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DoWhileStatement, "DoWhileStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EmptyStatement, "EmptyStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EnumDeclaration, "EnumDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportAllDeclaration, "ExportAllDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportDefaultDeclaration, "ExportDefaultDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportNamedDeclaration, "ExportNamedDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExpressionStatement, "ExpressionStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ForInStatement, "ForInStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ForOfStatement, "ForOfStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ForStatement, "ForStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.FunctionDeclaration, "FunctionDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.IfStatement, "IfStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ImportDeclaration, "ImportDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.InterfaceDeclaration, "InterfaceDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.LabeledStatement, "LabeledStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.OpaqueType, "OpaqueType", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ReturnStatement, "ReturnStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.SwitchStatement, "SwitchStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSDeclareFunction, "TSDeclareFunction", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSEnumDeclaration, "TSEnumDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSExportAssignment, "TSExportAssignment", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSImportEqualsDeclaration, "TSImportEqualsDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSInterfaceDeclaration, "TSInterfaceDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSModuleDeclaration, "TSModuleDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSNamespaceExportDeclaration, "TSNamespaceExportDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSTypeAliasDeclaration, "TSTypeAliasDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ThrowStatement, "ThrowStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TryStatement, "TryStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TypeAlias, "TypeAlias", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.VariableDeclaration, "VariableDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.WhileStatement, "WhileStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.WithStatement, "WithStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>>)[];
declare function replaceInline(this: NodePath_Final<t.Node | null>, nodes: t.Node | t.Node[]): (NodePath<t.Identifier, "Identifier", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.BreakStatement | t.CallExpression | t.CatchClause | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassImplements | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.ContinueStatement | t.DeclareClass | t.DeclareFunction | t.DeclareInterface | t.DeclareModule | t.DeclareOpaqueType | t.DeclareTypeAlias | t.DeclareVariable | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.EnumDeclaration | t.EnumDefaultedMember | t.EnumNumberMember | t.EnumStringMember | t.ExportDefaultDeclaration | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.FunctionDeclaration | t.FunctionExpression | t.FunctionTypeParam | t.GenericTypeAnnotation | t.IfStatement | t.ImportAttribute | t.ImportDefaultSpecifier | t.ImportExpression | t.ImportNamespaceSpecifier | t.ImportSpecifier | t.InterfaceDeclaration | t.InterfaceExtends | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LabeledStatement | t.LogicalExpression | t.MemberExpression | t.MetaProperty | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.OpaqueType | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.Placeholder | t.PrivateName | t.QualifiedTypeIdentifier | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSCallSignatureDeclaration | t.TSClassImplements | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSEnumDeclaration | t.TSEnumMember | t.TSExportAssignment | t.TSFunctionType | t.TSImportEqualsDeclaration | t.TSImportType | t.TSIndexSignature | t.TSInstantiationExpression | t.TSInterfaceDeclaration | t.TSInterfaceHeritage | t.TSMappedType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNamedTupleMember | t.TSNamespaceExportDeclaration | t.TSNonNullExpression | t.TSParameterProperty | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAliasDeclaration | t.TSTypeAssertion | t.TSTypeParameter | t.TSTypePredicate | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeAlias | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AnyTypeAnnotation, "AnyTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ArgumentPlaceholder, "ArgumentPlaceholder", NonNullable<t.CallExpression | t.NewExpression | t.OptionalCallExpression>> | NodePath<t.ArrayExpression, "ArrayExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ArrayPattern, "ArrayPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.CatchClause | t.ClassMethod | t.ClassPrivateMethod | t.ForInStatement | t.ForOfStatement | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.RestElement | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSMethodSignature | t.VariableDeclarator>> | NodePath<t.ArrayTypeAnnotation, "ArrayTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ArrowFunctionExpression, "ArrowFunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AssignmentExpression, "AssignmentExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AssignmentPattern, "AssignmentPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.TSDeclareFunction | t.TSDeclareMethod | t.TSParameterProperty>> | NodePath<t.AwaitExpression, "AwaitExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BigIntLiteral, "BigIntLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BigIntLiteralTypeAnnotation, "BigIntLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.BinaryExpressionIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BinaryExpressionNotIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BindExpression, "BindExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BlockStatement, "BlockStatement", NonNullable<t.ArrowFunctionExpression | t.BlockStatement | t.CatchClause | t.ClassMethod | t.ClassPrivateMethod | t.DeclareModule | t.DoExpression | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.FunctionDeclaration | t.FunctionExpression | t.IfStatement | t.LabeledStatement | t.ObjectMethod | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.TryStatement | t.WhileStatement | t.WithStatement>> | NodePath<t.BooleanLiteral, "BooleanLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BooleanLiteralTypeAnnotation, "BooleanLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.BooleanTypeAnnotation, "BooleanTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.BreakStatement, "BreakStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.CallExpression, "CallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.CatchClause, "CatchClause", t.TryStatement> | NodePath<t.ClassAccessorPropertyComputed, "ClassAccessorProperty", t.ClassBody> | NodePath<t.ClassAccessorPropertyNonComputed, "ClassAccessorProperty", t.ClassBody> | NodePath<t.ClassBody, "ClassBody", NonNullable<t.ClassDeclaration | t.ClassExpression>> | NodePath<t.ClassDeclaration, "ClassDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ClassExpression, "ClassExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ClassImplements, "ClassImplements", NonNullable<t.ClassDeclaration | t.ClassExpression | t.DeclareClass | t.DeclareExportDeclaration>> | NodePath<t.ClassMethodComputed, "ClassMethod", t.ClassBody> | NodePath<t.ClassMethodNonComputed, "ClassMethod", t.ClassBody> | NodePath<t.ClassPrivateMethod, "ClassPrivateMethod", t.ClassBody> | NodePath<t.ClassPrivateProperty, "ClassPrivateProperty", t.ClassBody> | NodePath<t.ClassPropertyComputed, "ClassProperty", t.ClassBody> | NodePath<t.ClassPropertyNonComputed, "ClassProperty", t.ClassBody> | NodePath<t.ConditionalExpression, "ConditionalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ContinueStatement, "ContinueStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DebuggerStatement, "DebuggerStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareClass, "DeclareClass", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareExportAllDeclaration, "DeclareExportAllDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareExportDeclaration, "DeclareExportDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareFunction, "DeclareFunction", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareInterface, "DeclareInterface", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareModule, "DeclareModule", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareModuleExports, "DeclareModuleExports", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareOpaqueType, "DeclareOpaqueType", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareTypeAlias, "DeclareTypeAlias", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareVariable, "DeclareVariable", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclaredPredicate, "DeclaredPredicate", NonNullable<t.ArrowFunctionExpression | t.DeclareExportDeclaration | t.DeclareFunction | t.FunctionDeclaration | t.FunctionExpression>> | NodePath<t.Decorator, "Decorator", NonNullable<t.Identifier | t.ArrayPattern | t.AssignmentPattern | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.ObjectMethod | t.ObjectPattern | t.ObjectProperty | t.Placeholder | t.RestElement | t.TSParameterProperty>> | NodePath<t.Directive, "Directive", NonNullable<t.BlockStatement | t.Program>> | NodePath<t.DirectiveLiteral, "DirectiveLiteral", t.Directive> | NodePath<t.DoExpression, "DoExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.DoWhileStatement, "DoWhileStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EmptyStatement, "EmptyStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EmptyTypeAnnotation, "EmptyTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.EnumBooleanBody, "EnumBooleanBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.EnumBooleanMember, "EnumBooleanMember", NonNullable<t.DeclareExportDeclaration | t.EnumBooleanBody>> | NodePath<t.EnumDeclaration, "EnumDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EnumDefaultedMember, "EnumDefaultedMember", NonNullable<t.DeclareExportDeclaration | t.EnumStringBody | t.EnumSymbolBody>> | NodePath<t.EnumNumberBody, "EnumNumberBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.EnumNumberMember, "EnumNumberMember", NonNullable<t.DeclareExportDeclaration | t.EnumNumberBody>> | NodePath<t.EnumStringBody, "EnumStringBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.EnumStringMember, "EnumStringMember", NonNullable<t.DeclareExportDeclaration | t.EnumStringBody>> | NodePath<t.EnumSymbolBody, "EnumSymbolBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.ExistsTypeAnnotation, "ExistsTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ExportAllDeclaration, "ExportAllDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportDefaultDeclaration, "ExportDefaultDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportDefaultSpecifier, "ExportDefaultSpecifier", t.ExportNamedDeclaration> | NodePath<t.ExportNamedDeclaration, "ExportNamedDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportNamespaceSpecifier, "ExportNamespaceSpecifier", NonNullable<t.DeclareExportDeclaration | t.ExportNamedDeclaration>> | NodePath<t.ExportSpecifier, "ExportSpecifier", NonNullable<t.DeclareExportDeclaration | t.ExportNamedDeclaration>> | NodePath<t.ExpressionStatement, "ExpressionStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.File, "File", never> | NodePath<t.ForInStatement, "ForInStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ForOfStatement, "ForOfStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ForStatement, "ForStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.FunctionDeclaration, "FunctionDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.FunctionExpression, "FunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.FunctionTypeAnnotation, "FunctionTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.FunctionTypeParam, "FunctionTypeParam", NonNullable<t.DeclareExportDeclaration | t.FunctionTypeAnnotation>> | NodePath<t.GenericTypeAnnotation, "GenericTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.IfStatement, "IfStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.Import, "Import", t.CallExpression> | NodePath<t.ImportAttribute, "ImportAttribute", NonNullable<t.DeclareExportAllDeclaration | t.DeclareExportDeclaration | t.ExportAllDeclaration | t.ExportNamedDeclaration | t.ImportDeclaration>> | NodePath<t.ImportDeclaration, "ImportDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ImportDefaultSpecifier, "ImportDefaultSpecifier", t.ImportDeclaration> | NodePath<t.ImportExpression, "ImportExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ImportNamespaceSpecifier, "ImportNamespaceSpecifier", t.ImportDeclaration> | NodePath<t.ImportSpecifier, "ImportSpecifier", t.ImportDeclaration> | NodePath<t.IndexedAccessType, "IndexedAccessType", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.InferredPredicate, "InferredPredicate", NonNullable<t.ArrowFunctionExpression | t.DeclareExportDeclaration | t.DeclareFunction | t.FunctionDeclaration | t.FunctionExpression>> | NodePath<t.InterfaceDeclaration, "InterfaceDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.InterfaceExtends, "InterfaceExtends", NonNullable<t.ClassDeclaration | t.ClassExpression | t.DeclareClass | t.DeclareExportDeclaration | t.DeclareInterface | t.InterfaceDeclaration | t.InterfaceTypeAnnotation>> | NodePath<t.InterfaceTypeAnnotation, "InterfaceTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.InterpreterDirective, "InterpreterDirective", t.Program> | NodePath<t.IntersectionTypeAnnotation, "IntersectionTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.JSXAttribute, "JSXAttribute", t.JSXOpeningElement> | NodePath<t.JSXClosingElement, "JSXClosingElement", t.JSXElement> | NodePath<t.JSXClosingFragment, "JSXClosingFragment", t.JSXFragment> | NodePath<t.JSXElement, "JSXElement", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXEmptyExpression, "JSXEmptyExpression", t.JSXExpressionContainer> | NodePath<t.JSXExpressionContainer, "JSXExpressionContainer", NonNullable<t.JSXAttribute | t.JSXElement | t.JSXFragment>> | NodePath<t.JSXFragment, "JSXFragment", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXIdentifier, "JSXIdentifier", NonNullable<t.JSXAttribute | t.JSXClosingElement | t.JSXMemberExpression | t.JSXNamespacedName | t.JSXOpeningElement>> | NodePath<t.JSXMemberExpression, "JSXMemberExpression", NonNullable<t.JSXClosingElement | t.JSXMemberExpression | t.JSXOpeningElement>> | NodePath<t.JSXNamespacedName, "JSXNamespacedName", NonNullable<t.JSXAttribute | t.JSXClosingElement | t.JSXOpeningElement>> | NodePath<t.JSXOpeningElement, "JSXOpeningElement", t.JSXElement> | NodePath<t.JSXOpeningFragment, "JSXOpeningFragment", t.JSXFragment> | NodePath<t.JSXSpreadAttribute, "JSXSpreadAttribute", t.JSXOpeningElement> | NodePath<t.JSXSpreadChild, "JSXSpreadChild", NonNullable<t.JSXElement | t.JSXFragment>> | NodePath<t.JSXText, "JSXText", NonNullable<t.JSXElement | t.JSXFragment>> | NodePath<t.LabeledStatement, "LabeledStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.LogicalExpression, "LogicalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionNonComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MetaProperty, "MetaProperty", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MixedTypeAnnotation, "MixedTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ModuleExpression, "ModuleExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NewExpression, "NewExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NullLiteral, "NullLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NullLiteralTypeAnnotation, "NullLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NullableTypeAnnotation, "NullableTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NumberLiteral, "NumberLiteral", never> | NodePath<t.NumberLiteralTypeAnnotation, "NumberLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NumberTypeAnnotation, "NumberTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NumericLiteral, "NumericLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumNumberMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ObjectExpression, "ObjectExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ObjectMethodComputed, "ObjectMethod", t.ObjectExpression> | NodePath<t.ObjectMethodNonComputed, "ObjectMethod", t.ObjectExpression> | NodePath<t.ObjectPattern, "ObjectPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.CatchClause | t.ClassMethod | t.ClassPrivateMethod | t.ForInStatement | t.ForOfStatement | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.RestElement | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSMethodSignature | t.VariableDeclarator>> | NodePath<t.ObjectPropertyComputed, "ObjectProperty", NonNullable<t.ObjectExpression | t.ObjectPattern>> | NodePath<t.ObjectPropertyNonComputed, "ObjectProperty", NonNullable<t.ObjectExpression | t.ObjectPattern>> | NodePath<t.ObjectTypeAnnotation, "ObjectTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareClass | t.DeclareExportDeclaration | t.DeclareInterface | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.InterfaceDeclaration | t.InterfaceTypeAnnotation | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ObjectTypeCallProperty, "ObjectTypeCallProperty", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeIndexer, "ObjectTypeIndexer", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeInternalSlot, "ObjectTypeInternalSlot", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeProperty, "ObjectTypeProperty", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeSpreadProperty, "ObjectTypeSpreadProperty", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.OpaqueType, "OpaqueType", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.OptionalCallExpression, "OptionalCallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalIndexedAccessType, "OptionalIndexedAccessType", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.OptionalMemberExpressionComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalMemberExpressionNonComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ParenthesizedExpression, "ParenthesizedExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.Placeholder, "Placeholder", NonNullable<t.Node>> | NodePath<t.PrivateName, "PrivateName", NonNullable<t.BinaryExpression | t.ClassAccessorProperty | t.ClassPrivateMethod | t.ClassPrivateProperty | t.MemberExpression | t.ObjectProperty | t.OptionalMemberExpression>> | NodePath<t.Program, "Program", NonNullable<t.File | t.ModuleExpression>> | NodePath<t.QualifiedTypeIdentifier, "QualifiedTypeIdentifier", NonNullable<t.DeclareExportDeclaration | t.GenericTypeAnnotation | t.InterfaceExtends | t.QualifiedTypeIdentifier>> | NodePath<t.RegExpLiteral, "RegExpLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.RegexLiteral, "RegexLiteral", never> | NodePath<t.RestElement, "RestElement", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectPattern | t.ObjectProperty | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSMethodSignature>> | NodePath<t.RestProperty, "RestProperty", never> | NodePath<t.ReturnStatement, "ReturnStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.SequenceExpression, "SequenceExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.SpreadElement, "SpreadElement", NonNullable<t.ArrayExpression | t.CallExpression | t.NewExpression | t.ObjectExpression | t.OptionalCallExpression>> | NodePath<t.SpreadProperty, "SpreadProperty", never> | NodePath<t.StaticBlock, "StaticBlock", t.ClassBody> | NodePath<t.StringLiteral, "StringLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportAllDeclaration | t.DeclareExportDeclaration | t.DeclareModule | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumStringMember | t.ExportAllDeclaration | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportAttribute | t.ImportDeclaration | t.ImportExpression | t.ImportSpecifier | t.JSXAttribute | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSExternalModuleReference | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.StringLiteralTypeAnnotation, "StringLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.StringTypeAnnotation, "StringTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.Super, "Super", NonNullable<t.CallExpression | t.MemberExpression>> | NodePath<t.SwitchCase, "SwitchCase", t.SwitchStatement> | NodePath<t.SwitchStatement, "SwitchStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.SymbolTypeAnnotation, "SymbolTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.TSAnyKeyword, "TSAnyKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSArrayType, "TSArrayType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSAsExpression, "TSAsExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSBigIntKeyword, "TSBigIntKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSBooleanKeyword, "TSBooleanKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSCallSignatureDeclaration, "TSCallSignatureDeclaration", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSClassImplements, "TSClassImplements", NonNullable<t.ClassDeclaration | t.ClassExpression | t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSConditionalType, "TSConditionalType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSConstructSignatureDeclaration, "TSConstructSignatureDeclaration", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSConstructorType, "TSConstructorType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSDeclareFunction, "TSDeclareFunction", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSDeclareMethodComputed, "TSDeclareMethod", t.ClassBody> | NodePath<t.TSDeclareMethodNonComputed, "TSDeclareMethod", t.ClassBody> | NodePath<t.TSEnumBody, "TSEnumBody", t.TSEnumDeclaration> | NodePath<t.TSEnumDeclaration, "TSEnumDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSEnumMember, "TSEnumMember", t.TSEnumBody> | NodePath<t.TSExportAssignment, "TSExportAssignment", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSExternalModuleReference, "TSExternalModuleReference", t.TSImportEqualsDeclaration> | NodePath<t.TSFunctionType, "TSFunctionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSImportEqualsDeclaration, "TSImportEqualsDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSImportType, "TSImportType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSTypeQuery | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIndexSignature, "TSIndexSignature", NonNullable<t.ClassBody | t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSIndexedAccessType, "TSIndexedAccessType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSInferType, "TSInferType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSInstantiationExpression, "TSInstantiationExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSInterfaceBody, "TSInterfaceBody", t.TSInterfaceDeclaration> | NodePath<t.TSInterfaceDeclaration, "TSInterfaceDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSInterfaceHeritage, "TSInterfaceHeritage", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSInterfaceDeclaration | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIntersectionType, "TSIntersectionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIntrinsicKeyword, "TSIntrinsicKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSLiteralType, "TSLiteralType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSMappedType, "TSMappedType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSMethodSignature, "TSMethodSignature", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSModuleBlock, "TSModuleBlock", t.TSModuleDeclaration> | NodePath<t.TSModuleDeclaration, "TSModuleDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSNamedTupleMember, "TSNamedTupleMember", t.TSTupleType> | NodePath<t.TSNamespaceExportDeclaration, "TSNamespaceExportDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSNeverKeyword, "TSNeverKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSNonNullExpression, "TSNonNullExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSNullKeyword, "TSNullKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSNumberKeyword, "TSNumberKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSObjectKeyword, "TSObjectKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSOptionalType, "TSOptionalType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSParameterProperty, "TSParameterProperty", NonNullable<t.ClassMethod | t.ClassPrivateMethod | t.TSDeclareMethod>> | NodePath<t.TSParenthesizedType, "TSParenthesizedType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSPropertySignature, "TSPropertySignature", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSQualifiedName, "TSQualifiedName", NonNullable<t.TSImportEqualsDeclaration | t.TSImportType | t.TSModuleDeclaration | t.TSQualifiedName | t.TSTypeQuery | t.TSTypeReference>> | NodePath<t.TSRestType, "TSRestType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSSatisfiesExpression, "TSSatisfiesExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSStringKeyword, "TSStringKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSSymbolKeyword, "TSSymbolKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTemplateLiteralType, "TSTemplateLiteralType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSThisType, "TSThisType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSTypePredicate | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTupleType, "TSTupleType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeAliasDeclaration, "TSTypeAliasDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSTypeAnnotation, "TSTypeAnnotation", NonNullable<t.Identifier | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentPattern | t.ClassAccessorProperty | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectPattern | t.Placeholder | t.RestElement | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSIndexSignature | t.TSMethodSignature | t.TSPropertySignature | t.TSTypePredicate>> | NodePath<t.TSTypeAssertion, "TSTypeAssertion", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSTypeLiteral, "TSTypeLiteral", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeOperator, "TSTypeOperator", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeParameter, "TSTypeParameter", NonNullable<t.TSInferType | t.TSTypeParameterDeclaration>> | NodePath<t.TSTypeParameterDeclaration, "TSTypeParameterDeclaration", NonNullable<t.ArrowFunctionExpression | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSInterfaceDeclaration | t.TSMethodSignature | t.TSTypeAliasDeclaration>> | NodePath<t.TSTypeParameterInstantiation, "TSTypeParameterInstantiation", NonNullable<t.CallExpression | t.ClassDeclaration | t.ClassExpression | t.JSXOpeningElement | t.NewExpression | t.OptionalCallExpression | t.TSClassImplements | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression>> | NodePath<t.TSTypePredicate, "TSTypePredicate", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeQuery, "TSTypeQuery", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeReference, "TSTypeReference", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUndefinedKeyword, "TSUndefinedKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUnionType, "TSUnionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUnknownKeyword, "TSUnknownKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSVoidKeyword, "TSVoidKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TaggedTemplateExpression, "TaggedTemplateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TemplateElement, "TemplateElement", NonNullable<t.TSTemplateLiteralType | t.TemplateLiteral>> | NodePath<t.TemplateLiteral, "TemplateLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ThisExpression, "ThisExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportEqualsDeclaration | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ThisTypeAnnotation, "ThisTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ThrowStatement, "ThrowStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TopicReference, "TopicReference", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TryStatement, "TryStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TupleTypeAnnotation, "TupleTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.TypeAlias, "TypeAlias", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TypeAnnotation, "TypeAnnotation", NonNullable<t.Identifier | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentPattern | t.ClassAccessorProperty | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.DeclareExportDeclaration | t.DeclareModuleExports | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectPattern | t.Placeholder | t.RestElement | t.TypeCastExpression | t.TypeParameter>> | NodePath<t.TypeCastExpression, "TypeCastExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportDeclaration | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TypeParameter, "TypeParameter", NonNullable<t.DeclareExportDeclaration | t.TypeParameterDeclaration>> | NodePath<t.TypeParameterDeclaration, "TypeParameterDeclaration", NonNullable<t.ArrowFunctionExpression | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateMethod | t.DeclareClass | t.DeclareExportDeclaration | t.DeclareInterface | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionDeclaration | t.FunctionExpression | t.FunctionTypeAnnotation | t.InterfaceDeclaration | t.ObjectMethod | t.OpaqueType | t.TypeAlias>> | NodePath<t.TypeParameterInstantiation, "TypeParameterInstantiation", NonNullable<t.CallExpression | t.ClassDeclaration | t.ClassExpression | t.ClassImplements | t.DeclareExportDeclaration | t.GenericTypeAnnotation | t.InterfaceExtends | t.JSXOpeningElement | t.NewExpression | t.OptionalCallExpression | t.TaggedTemplateExpression>> | NodePath<t.TypeofTypeAnnotation, "TypeofTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.UnaryExpression, "UnaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.UnionTypeAnnotation, "UnionTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.UpdateExpression, "UpdateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.V8IntrinsicIdentifier, "V8IntrinsicIdentifier", t.CallExpression> | NodePath<t.VariableDeclaration, "VariableDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.VariableDeclarator, "VariableDeclarator", t.VariableDeclaration> | NodePath<t.Variance, "Variance", NonNullable<t.ClassAccessorProperty | t.ClassPrivateProperty | t.ClassProperty | t.DeclareExportDeclaration | t.ObjectTypeIndexer | t.ObjectTypeProperty | t.TypeParameter>> | NodePath<t.VoidPattern, "VoidPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.TSDeclareFunction | t.TSDeclareMethod | t.VariableDeclarator>> | NodePath<t.VoidTypeAnnotation, "VoidTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.WhileStatement, "WhileStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.WithStatement, "WithStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.YieldExpression, "YieldExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>>)[];

/**
 * Walk the input `node` and statically evaluate if it's truthy.
 *
 * Returning `true` when we're sure that the expression will evaluate to a
 * truthy value, `false` if we're sure that it will evaluate to a falsy
 * value and `undefined` if we aren't sure. Because of this please do not
 * rely on coercion when using this method and check with === if it's false.
 *
 * For example do:
 *
 *   if (t.evaluateTruthy(node) === false) falsyLogic();
 *
 * **AND NOT**
 *
 *   if (!t.evaluateTruthy(node)) falsyLogic();
 *
 */
declare function evaluateTruthy(this: NodePath_Final): boolean | undefined;
/**
 * Walk the input `node` and statically evaluate it.
 *
 * Returns an object in the form `{ confident, value, deopt }`. `confident`
 * indicates whether or not we had to drop out of evaluating the expression
 * because of hitting an unknown node that we couldn't confidently find the
 * value of, in which case `deopt` is the path of said node.
 *
 * Example:
 *
 *   t.evaluate(parse("5 + 5")) // { confident: true, value: 10 }
 *   t.evaluate(parse("!true")) // { confident: true, value: false }
 *   t.evaluate(parse("foo + foo")) // { confident: false, value: undefined, deopt: NodePath }
 *
 */
declare function evaluate(this: NodePath_Final): {
    confident: boolean;
    value: any;
    deopt: NodePath_Final | null;
};

declare function ensureBlock(this: NodePath_Final<t.Loop | t.WithStatement | t.Function | t.LabeledStatement | t.CatchClause>): void;
/**
 * Given an arbitrary function, process its content as if it were an arrow function, moving references
 * to "this", "arguments", "super", and such into the function's parent scope. This method is useful if
 * you have wrapped some set of items in an IIFE or other function, but want "this", "arguments", and super"
 * to continue behaving as expected.
 */
declare function unwrapFunctionEnvironment(this: NodePath_Final<t.ArrayExpression | t.FunctionExpression | t.FunctionDeclaration>): void;
/**
 * Convert a given arrow function into a normal ES5 function expression.
 */
declare function arrowFunctionToExpression(this: NodePath_Final<t.ArrowFunctionExpression>, { allowInsertArrow, allowInsertArrowWithRest, noNewArrows, }?: {
    allowInsertArrow?: boolean;
    allowInsertArrowWithRest?: boolean;
    noNewArrows?: boolean;
}): NodePath_Final<Exclude<t.Function, t.Method | t.ArrowFunctionExpression> | t.CallExpression>;
declare function splitExportDeclaration(this: NodePath_Final<t.ExportDefaultDeclaration | t.ExportNamedDeclaration>): NodePath_Final<t.Declaration>;
declare function ensureFunctionName<N extends t.FunctionExpression | t.ClassExpression>(this: NodePath_Final<N>, supportUnicodeId: boolean): null | NodePath_Final<N>;

/**
 * Match the current node if it matches the provided `pattern`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */
declare function matchesPattern(this: NodePath_Final, pattern: string, allowPartial?: boolean): boolean;
declare function isStatic(this: NodePath_Final): boolean;
/**
 * Check the type against our stored internal type of the node. This is handy when a node has
 * been removed yet we still internally know the type and need it to calculate node replacement.
 */
declare function isNodeType(this: NodePath_Final<t.Node | null>, type: string): boolean;
/**
 * This checks whether or not we're in one of the following positions:
 *
 *   for (KEY in right);
 *   for (KEY;;);
 *
 * This is because these spots allow VariableDeclarations AND normal expressions so we need
 * to tell the path replacement that it's ok to replace this with an expression.
 */
declare function canHaveVariableDeclarationOrExpression(this: NodePath_Final<t.Node | null>): boolean;
/**
 * This checks whether we are swapping an arrow function's body between an
 * expression and a block statement (or vice versa).
 *
 * This is because arrow functions may implicitly return an expression, which
 * is the same as containing a block statement.
 */
declare function canSwapBetweenExpressionAndStatement(this: NodePath_Final<t.Node | null>, replacement: t.Node): boolean;
/**
 * Check whether the current path references a completion record
 */
declare function isCompletionRecord(this: NodePath_Final, allowInsideFunction?: boolean): boolean;
/**
 * Check whether or not the current `key` allows either a single statement or block statement
 * so we can explode it if necessary.
 */
declare function isStatementOrBlock(this: NodePath_Final<t.Node | null>): boolean;
/**
 * Check if the currently assigned path references the `importName` of `moduleSource`.
 */
declare function referencesImport(this: NodePath_Final, moduleSource: string, importName: string): boolean;
/**
 * Get the source code associated with this node.
 */
declare function getSource(this: NodePath_Final): string;
declare function willIMaybeExecuteBefore(this: NodePath_Final, target: NodePath_Final): boolean;
type RelativeExecutionStatus = "before" | "after" | "unknown";
/**
 * Given a `target` check the execution status of it relative to the current path.
 *
 * "Execution status" simply refers to where or not we **think** this will execute
 * before or after the input `target` element.
 */
declare function _guessExecutionStatusRelativeTo(this: NodePath_Final, target: NodePath_Final): RelativeExecutionStatus;
/**
 * Resolve the value pointed to by a NodePath
 * e.g.
 * ```
 *  var a = 1;
 *  var b = a;
 *  b;
 * ```
 * `b.resolve()` will return `1`
 */
declare function resolve(this: NodePath_Final, dangerous?: boolean, resolved?: NodePath_Final[]): NodePath_Final;
declare function isConstantExpression(this: NodePath_Final<t.Node | null>): boolean;
declare function isInStrictMode(this: NodePath_Final<t.Node | null>): boolean;

declare function isDenylisted(this: NodePath_Final): boolean;
declare function skip(this: NodePath_Final): void;
declare function skipKey(this: NodePath_Final, key: string): void;
declare function stop(this: NodePath_Final): void;
declare function setContext<S = unknown>(this: NodePath_Final<t.Node | null>, context?: TraversalContext<S>): NodePath_Final<t.Node | null>;
declare function requeue(this: NodePath_Final<t.Node | null>, pathToQueue?: NodePath_Final<t.Node | null>): void;
declare function requeueComputedKeyAndDecorators(this: NodePath_Final<t.Method | t.Property>): void;

declare function remove(this: NodePath_Final<t.Node | null>): void;

/**
 * Insert the provided nodes before the current one.
 */
declare function insertBefore<Nodes extends NodeOrNodeList<t.Node>>(this: NodePath_Final<t.Node | null>, nodes_: Nodes): NodePaths<Nodes>;
/**
 * Insert the provided nodes after the current one. When inserting nodes after an
 * expression, ensure that the completion record is correct by pushing the current node.
 */
declare function insertAfter<Nodes extends NodeOrNodeList<t.Node>>(this: NodePath_Final<t.Node | null>, nodes_: Nodes): NodePaths<Nodes>;
type NodeKeyOfArrays<N extends t.Node> = {
    [P in string & keyof N]-?: N[P] extends (t.Node | null)[] ? P : never;
}[string & keyof N];
declare function unshiftContainer<N extends t.Node, K extends NodeKeyOfArrays<N>, Nodes extends NodeOrNodeList<NodeListType<N, K>>>(this: NodePath_Final<N>, listKey: K, nodes: Nodes): NodePaths<Nodes>;
declare function pushContainer<N extends t.Node, K extends NodeKeyOfArrays<N>, Nodes extends NodeOrNodeList<NodeListType<N, K>>>(this: NodePath_Final<N>, listKey: K, nodes: Nodes): NodePaths<Nodes>;

declare function getOpposite(this: NodePath_Final): NodePath_Final<t.Node | null> | null;
/**
 * Retrieve the completion records of a given path.
 * Note: to ensure proper support on `break` statement, this method
 * will manipulate the AST around the break statement. Do not call the method
 * twice for the same path.
 *
 * @export
 * @param {NodePath} this
 * @param {boolean} [shouldPreserveBreak=false] Whether the `break` statement should be preserved.
 * @returns {NodePath[]} Completion records
 */
declare function getCompletionRecords(this: NodePath_Final, shouldPreserveBreak?: boolean): NodePath_Final[];
declare function getSibling(this: NodePath_Final<t.Node | null>, key: string | number): NodePath_Final<t.Node | null>;
declare function getPrevSibling(this: NodePath_Final<t.Node | null>): NodePath_Final<t.Node | null>;
declare function getNextSibling(this: NodePath_Final<t.Node | null>): NodePath_Final<t.Node | null>;
declare function getAllNextSiblings(this: NodePath_Final<t.Node | null>): NodePath_Final<t.Node | null>[];
declare function getAllPrevSiblings(this: NodePath_Final<t.Node | null>): NodePath_Final<t.Node | null>[];
type MaybeToIndex<T extends string> = T extends `${number}` ? number : T;
type Pattern<Obj extends string, Prop extends string> = `${Obj}.${Prop}`;
type Split<P extends string> = P extends Pattern<infer O, infer U> ? [MaybeToIndex<O>, ...Split<U>] : [MaybeToIndex<P>];
type Trav<Node extends t.Node | t.Node[], Path extends unknown[]> = Path extends [infer K, ...infer R] ? K extends keyof Node ? R extends [] ? Node[K] : Node[K] extends t.Node | t.Node[] | null | undefined ? null | undefined extends Node[K] ? TravD<Node[K] & {}, R> | null : TravD<Node[K] & {}, R> : never : string extends K ? t.Node | null : null : never;
type TravD<Node extends t.Node | t.Node[], Path extends unknown[]> = Node extends any ? Trav<Node, Path> : never;
type ToNodePath<T> = T extends undefined | null ? NodePath_Final<null> : T extends (infer U extends t.Node | null)[] ? NodePath_Final<U>[] : T extends t.Node | null | undefined ? NodePath_Final<T & {}> : never;
declare function get<T extends NodePath_Final, K extends keyof T["node"]>(this: T, key: K, context?: true | TraversalContext): T extends any ? T["node"][K] extends (infer U extends t.Node | null)[] | null | undefined ? NodePath_Final<U>[] : T["node"][K] extends (infer U extends t.Node | null) | undefined ? NodePath_Final<U> : never : never;
declare function get<T extends NodePath_Final<t.Node>, K extends string>(this: T, key: K, context?: true | TraversalContext): string extends K ? NodePath_Final<t.Node | null> | NodePath_Final<t.Node | null>[] : T extends any ? ToNodePath<Trav<T["node"], Split<K>>> : never;
declare function get(this: NodePath_Final, key: string, context?: true | TraversalContext): NodePath_Final<t.Node | null> | NodePath_Final<t.Node | null>[];

declare function getAssignmentIdentifiers(this: NodePath_Final): Record<string, t.Identifier>;
declare function getBindingIdentifiers(duplicates: true): Record<string, t.Identifier[]>;
declare function getBindingIdentifiers(duplicates?: false): Record<string, t.Identifier>;
declare function getBindingIdentifiers(duplicates: boolean): Record<string, t.Identifier[] | t.Identifier>;

declare function getOuterBindingIdentifiers(duplicates: true): Record<string, t.Identifier[]>;
declare function getOuterBindingIdentifiers(duplicates?: false): Record<string, t.Identifier>;
declare function getOuterBindingIdentifiers(duplicates: boolean): Record<string, t.Identifier[] | t.Identifier>;

declare function getBindingIdentifierPaths(duplicates: true, outerOnly?: boolean): Record<string, NodePath_Final<t.Identifier>[]>;
declare function getBindingIdentifierPaths(duplicates: false, outerOnly?: boolean): Record<string, NodePath_Final<t.Identifier>>;
declare function getBindingIdentifierPaths(duplicates?: boolean, outerOnly?: boolean): Record<string, NodePath_Final<t.Identifier> | NodePath_Final<t.Identifier>[]>;

declare function getOuterBindingIdentifierPaths(duplicates: true): Record<string, NodePath_Final<t.Identifier>[]>;
declare function getOuterBindingIdentifierPaths(duplicates?: false): Record<string, NodePath_Final<t.Identifier>>;
declare function getOuterBindingIdentifierPaths(duplicates?: boolean): Record<string, NodePath_Final<t.Identifier> | NodePath_Final<t.Identifier>[]>;

/**
 * Share comments amongst siblings.
 */
declare function shareCommentsWithSiblings(this: NodePath_Final<t.Node | null>): void;
declare function addComment(this: NodePath_Final, type: t.CommentTypeShorthand, content: string, line?: boolean): void;
/**
 * Give node `comments` of the specified `type`.
 */
declare function addComments(this: NodePath_Final, type: t.CommentTypeShorthand, comments: t.Comment[]): void;

/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */


type Options$2<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
      ? t.Node[]
      : Obj[Prop];
}>;

interface NodePathAssertions {
  assertAccessor<Opts extends Options$2<t.Accessor>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Accessor & Opts>;
  assertAnyTypeAnnotation<Opts extends Options$2<t.AnyTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.AnyTypeAnnotation & Opts>;
  assertArgumentPlaceholder<Opts extends Options$2<t.ArgumentPlaceholder>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ArgumentPlaceholder & Opts>;
  assertArrayExpression<Opts extends Options$2<t.ArrayExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ArrayExpression & Opts>;
  assertArrayPattern<Opts extends Options$2<t.ArrayPattern>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ArrayPattern & Opts>;
  assertArrayTypeAnnotation<Opts extends Options$2<t.ArrayTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ArrayTypeAnnotation & Opts>;
  assertArrowFunctionExpression<
    Opts extends Options$2<t.ArrowFunctionExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ArrowFunctionExpression & Opts>;
  assertAssignmentExpression<Opts extends Options$2<t.AssignmentExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.AssignmentExpression & Opts>;
  assertAssignmentPattern<Opts extends Options$2<t.AssignmentPattern>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.AssignmentPattern & Opts>;
  assertAwaitExpression<Opts extends Options$2<t.AwaitExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.AwaitExpression & Opts>;
  assertBigIntLiteral<Opts extends Options$2<t.BigIntLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BigIntLiteral & Opts>;
  assertBigIntLiteralTypeAnnotation<
    Opts extends Options$2<t.BigIntLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BigIntLiteralTypeAnnotation & Opts>;
  assertBinary<Opts extends Options$2<t.Binary>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Binary & Opts>;
  assertBinaryExpression<Opts extends Options$2<t.BinaryExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BinaryExpression & Opts>;
  assertBindExpression<Opts extends Options$2<t.BindExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BindExpression & Opts>;
  assertBlock<Opts extends Options$2<t.Block>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Block & Opts>;
  assertBlockParent<Opts extends Options$2<t.BlockParent>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BlockParent & Opts>;
  assertBlockStatement<Opts extends Options$2<t.BlockStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BlockStatement & Opts>;
  assertBooleanLiteral<Opts extends Options$2<t.BooleanLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BooleanLiteral & Opts>;
  assertBooleanLiteralTypeAnnotation<
    Opts extends Options$2<t.BooleanLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BooleanLiteralTypeAnnotation & Opts>;
  assertBooleanTypeAnnotation<Opts extends Options$2<t.BooleanTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BooleanTypeAnnotation & Opts>;
  assertBreakStatement<Opts extends Options$2<t.BreakStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.BreakStatement & Opts>;
  assertCallExpression<Opts extends Options$2<t.CallExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.CallExpression & Opts>;
  assertCatchClause<Opts extends Options$2<t.CatchClause>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.CatchClause & Opts>;
  assertClass<Opts extends Options$2<t.Class>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Class & Opts>;
  assertClassAccessorProperty<Opts extends Options$2<t.ClassAccessorProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassAccessorProperty & Opts>;
  assertClassBody<Opts extends Options$2<t.ClassBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassBody & Opts>;
  assertClassDeclaration<Opts extends Options$2<t.ClassDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassDeclaration & Opts>;
  assertClassExpression<Opts extends Options$2<t.ClassExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassExpression & Opts>;
  assertClassImplements<Opts extends Options$2<t.ClassImplements>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassImplements & Opts>;
  assertClassMethod<Opts extends Options$2<t.ClassMethod>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassMethod & Opts>;
  assertClassPrivateMethod<Opts extends Options$2<t.ClassPrivateMethod>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassPrivateMethod & Opts>;
  assertClassPrivateProperty<Opts extends Options$2<t.ClassPrivateProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassPrivateProperty & Opts>;
  assertClassProperty<Opts extends Options$2<t.ClassProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ClassProperty & Opts>;
  assertCompletionStatement<Opts extends Options$2<t.CompletionStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.CompletionStatement & Opts>;
  assertConditional<Opts extends Options$2<t.Conditional>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Conditional & Opts>;
  assertConditionalExpression<Opts extends Options$2<t.ConditionalExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ConditionalExpression & Opts>;
  assertContinueStatement<Opts extends Options$2<t.ContinueStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ContinueStatement & Opts>;
  assertDebuggerStatement<Opts extends Options$2<t.DebuggerStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DebuggerStatement & Opts>;
  assertDeclaration<Opts extends Options$2<t.Declaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Declaration & Opts>;
  assertDeclareClass<Opts extends Options$2<t.DeclareClass>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareClass & Opts>;
  assertDeclareExportAllDeclaration<
    Opts extends Options$2<t.DeclareExportAllDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareExportAllDeclaration & Opts>;
  assertDeclareExportDeclaration<
    Opts extends Options$2<t.DeclareExportDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareExportDeclaration & Opts>;
  assertDeclareFunction<Opts extends Options$2<t.DeclareFunction>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareFunction & Opts>;
  assertDeclareInterface<Opts extends Options$2<t.DeclareInterface>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareInterface & Opts>;
  assertDeclareModule<Opts extends Options$2<t.DeclareModule>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareModule & Opts>;
  assertDeclareModuleExports<Opts extends Options$2<t.DeclareModuleExports>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareModuleExports & Opts>;
  assertDeclareOpaqueType<Opts extends Options$2<t.DeclareOpaqueType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareOpaqueType & Opts>;
  assertDeclareTypeAlias<Opts extends Options$2<t.DeclareTypeAlias>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareTypeAlias & Opts>;
  assertDeclareVariable<Opts extends Options$2<t.DeclareVariable>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclareVariable & Opts>;
  assertDeclaredPredicate<Opts extends Options$2<t.DeclaredPredicate>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DeclaredPredicate & Opts>;
  assertDecorator<Opts extends Options$2<t.Decorator>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Decorator & Opts>;
  assertDirective<Opts extends Options$2<t.Directive>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Directive & Opts>;
  assertDirectiveLiteral<Opts extends Options$2<t.DirectiveLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DirectiveLiteral & Opts>;
  assertDoExpression<Opts extends Options$2<t.DoExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DoExpression & Opts>;
  assertDoWhileStatement<Opts extends Options$2<t.DoWhileStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.DoWhileStatement & Opts>;
  assertEmptyStatement<Opts extends Options$2<t.EmptyStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EmptyStatement & Opts>;
  assertEmptyTypeAnnotation<Opts extends Options$2<t.EmptyTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EmptyTypeAnnotation & Opts>;
  assertEnumBody<Opts extends Options$2<t.EnumBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumBody & Opts>;
  assertEnumBooleanBody<Opts extends Options$2<t.EnumBooleanBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumBooleanBody & Opts>;
  assertEnumBooleanMember<Opts extends Options$2<t.EnumBooleanMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumBooleanMember & Opts>;
  assertEnumDeclaration<Opts extends Options$2<t.EnumDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumDeclaration & Opts>;
  assertEnumDefaultedMember<Opts extends Options$2<t.EnumDefaultedMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumDefaultedMember & Opts>;
  assertEnumMember<Opts extends Options$2<t.EnumMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumMember & Opts>;
  assertEnumNumberBody<Opts extends Options$2<t.EnumNumberBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumNumberBody & Opts>;
  assertEnumNumberMember<Opts extends Options$2<t.EnumNumberMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumNumberMember & Opts>;
  assertEnumStringBody<Opts extends Options$2<t.EnumStringBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumStringBody & Opts>;
  assertEnumStringMember<Opts extends Options$2<t.EnumStringMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumStringMember & Opts>;
  assertEnumSymbolBody<Opts extends Options$2<t.EnumSymbolBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.EnumSymbolBody & Opts>;
  assertExistsTypeAnnotation<Opts extends Options$2<t.ExistsTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExistsTypeAnnotation & Opts>;
  assertExportAllDeclaration<Opts extends Options$2<t.ExportAllDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExportAllDeclaration & Opts>;
  assertExportDeclaration<Opts extends Options$2<t.ExportDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExportDeclaration & Opts>;
  assertExportDefaultDeclaration<
    Opts extends Options$2<t.ExportDefaultDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExportDefaultDeclaration & Opts>;
  assertExportDefaultSpecifier<Opts extends Options$2<t.ExportDefaultSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExportDefaultSpecifier & Opts>;
  assertExportNamedDeclaration<Opts extends Options$2<t.ExportNamedDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExportNamedDeclaration & Opts>;
  assertExportNamespaceSpecifier<
    Opts extends Options$2<t.ExportNamespaceSpecifier>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExportNamespaceSpecifier & Opts>;
  assertExportSpecifier<Opts extends Options$2<t.ExportSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExportSpecifier & Opts>;
  assertExpression<Opts extends Options$2<t.Expression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Expression & Opts>;
  assertExpressionStatement<Opts extends Options$2<t.ExpressionStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExpressionStatement & Opts>;
  assertExpressionWrapper<Opts extends Options$2<t.ExpressionWrapper>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ExpressionWrapper & Opts>;
  assertFile<Opts extends Options$2<t.File>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.File & Opts>;
  assertFlow<Opts extends Options$2<t.Flow>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Flow & Opts>;
  assertFlowBaseAnnotation<Opts extends Options$2<t.FlowBaseAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FlowBaseAnnotation & Opts>;
  assertFlowDeclaration<Opts extends Options$2<t.FlowDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FlowDeclaration & Opts>;
  assertFlowPredicate<Opts extends Options$2<t.FlowPredicate>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FlowPredicate & Opts>;
  assertFlowType<Opts extends Options$2<t.FlowType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FlowType & Opts>;
  assertFor<Opts extends Options$2<t.For>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.For & Opts>;
  assertForInStatement<Opts extends Options$2<t.ForInStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ForInStatement & Opts>;
  assertForOfStatement<Opts extends Options$2<t.ForOfStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ForOfStatement & Opts>;
  assertForStatement<Opts extends Options$2<t.ForStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ForStatement & Opts>;
  assertForXStatement<Opts extends Options$2<t.ForXStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ForXStatement & Opts>;
  assertFunction<Opts extends Options$2<t.Function>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Function & Opts>;
  assertFunctionDeclaration<Opts extends Options$2<t.FunctionDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FunctionDeclaration & Opts>;
  assertFunctionExpression<Opts extends Options$2<t.FunctionExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FunctionExpression & Opts>;
  assertFunctionParameter<Opts extends Options$2<t.FunctionParameter>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FunctionParameter & Opts>;
  assertFunctionParent<Opts extends Options$2<t.FunctionParent>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FunctionParent & Opts>;
  assertFunctionTypeAnnotation<Opts extends Options$2<t.FunctionTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FunctionTypeAnnotation & Opts>;
  assertFunctionTypeParam<Opts extends Options$2<t.FunctionTypeParam>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.FunctionTypeParam & Opts>;
  assertGenericTypeAnnotation<Opts extends Options$2<t.GenericTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.GenericTypeAnnotation & Opts>;
  assertIdentifier<Opts extends Options$2<t.Identifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Identifier & Opts>;
  assertIfStatement<Opts extends Options$2<t.IfStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.IfStatement & Opts>;
  assertImmutable<Opts extends Options$2<t.Immutable>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Immutable & Opts>;
  assertImport<Opts extends Options$2<t.Import>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Import & Opts>;
  assertImportAttribute<Opts extends Options$2<t.ImportAttribute>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ImportAttribute & Opts>;
  assertImportDeclaration<Opts extends Options$2<t.ImportDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ImportDeclaration & Opts>;
  assertImportDefaultSpecifier<Opts extends Options$2<t.ImportDefaultSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ImportDefaultSpecifier & Opts>;
  assertImportExpression<Opts extends Options$2<t.ImportExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ImportExpression & Opts>;
  assertImportNamespaceSpecifier<
    Opts extends Options$2<t.ImportNamespaceSpecifier>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ImportNamespaceSpecifier & Opts>;
  assertImportOrExportDeclaration<
    Opts extends Options$2<t.ImportOrExportDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ImportOrExportDeclaration & Opts>;
  assertImportSpecifier<Opts extends Options$2<t.ImportSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ImportSpecifier & Opts>;
  assertIndexedAccessType<Opts extends Options$2<t.IndexedAccessType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.IndexedAccessType & Opts>;
  assertInferredPredicate<Opts extends Options$2<t.InferredPredicate>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.InferredPredicate & Opts>;
  assertInterfaceDeclaration<Opts extends Options$2<t.InterfaceDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.InterfaceDeclaration & Opts>;
  assertInterfaceExtends<Opts extends Options$2<t.InterfaceExtends>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.InterfaceExtends & Opts>;
  assertInterfaceTypeAnnotation<
    Opts extends Options$2<t.InterfaceTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.InterfaceTypeAnnotation & Opts>;
  assertInterpreterDirective<Opts extends Options$2<t.InterpreterDirective>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.InterpreterDirective & Opts>;
  assertIntersectionTypeAnnotation<
    Opts extends Options$2<t.IntersectionTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.IntersectionTypeAnnotation & Opts>;
  assertJSX<Opts extends Options$2<t.JSX>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSX & Opts>;
  assertJSXAttribute<Opts extends Options$2<t.JSXAttribute>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXAttribute & Opts>;
  assertJSXClosingElement<Opts extends Options$2<t.JSXClosingElement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXClosingElement & Opts>;
  assertJSXClosingFragment<Opts extends Options$2<t.JSXClosingFragment>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXClosingFragment & Opts>;
  assertJSXElement<Opts extends Options$2<t.JSXElement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXElement & Opts>;
  assertJSXEmptyExpression<Opts extends Options$2<t.JSXEmptyExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXEmptyExpression & Opts>;
  assertJSXExpressionContainer<Opts extends Options$2<t.JSXExpressionContainer>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXExpressionContainer & Opts>;
  assertJSXFragment<Opts extends Options$2<t.JSXFragment>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXFragment & Opts>;
  assertJSXIdentifier<Opts extends Options$2<t.JSXIdentifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXIdentifier & Opts>;
  assertJSXMemberExpression<Opts extends Options$2<t.JSXMemberExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXMemberExpression & Opts>;
  assertJSXNamespacedName<Opts extends Options$2<t.JSXNamespacedName>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXNamespacedName & Opts>;
  assertJSXOpeningElement<Opts extends Options$2<t.JSXOpeningElement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXOpeningElement & Opts>;
  assertJSXOpeningFragment<Opts extends Options$2<t.JSXOpeningFragment>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXOpeningFragment & Opts>;
  assertJSXSpreadAttribute<Opts extends Options$2<t.JSXSpreadAttribute>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXSpreadAttribute & Opts>;
  assertJSXSpreadChild<Opts extends Options$2<t.JSXSpreadChild>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXSpreadChild & Opts>;
  assertJSXText<Opts extends Options$2<t.JSXText>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.JSXText & Opts>;
  assertLVal<Opts extends Options$2<t.LVal>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.LVal & Opts>;
  assertLabeledStatement<Opts extends Options$2<t.LabeledStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.LabeledStatement & Opts>;
  assertLiteral<Opts extends Options$2<t.Literal>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Literal & Opts>;
  assertLogicalExpression<Opts extends Options$2<t.LogicalExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.LogicalExpression & Opts>;
  assertLoop<Opts extends Options$2<t.Loop>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Loop & Opts>;
  assertMemberExpression<Opts extends Options$2<t.MemberExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.MemberExpression & Opts>;
  assertMetaProperty<Opts extends Options$2<t.MetaProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.MetaProperty & Opts>;
  assertMethod<Opts extends Options$2<t.Method>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Method & Opts>;
  assertMiscellaneous<Opts extends Options$2<t.Miscellaneous>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Miscellaneous & Opts>;
  assertMixedTypeAnnotation<Opts extends Options$2<t.MixedTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.MixedTypeAnnotation & Opts>;
  assertModuleDeclaration<Opts extends Options$2<t.ModuleDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ModuleDeclaration & Opts>;
  assertModuleExpression<Opts extends Options$2<t.ModuleExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ModuleExpression & Opts>;
  assertModuleSpecifier<Opts extends Options$2<t.ModuleSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ModuleSpecifier & Opts>;
  assertNewExpression<Opts extends Options$2<t.NewExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NewExpression & Opts>;
  assertNullLiteral<Opts extends Options$2<t.NullLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NullLiteral & Opts>;
  assertNullLiteralTypeAnnotation<
    Opts extends Options$2<t.NullLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NullLiteralTypeAnnotation & Opts>;
  assertNullableTypeAnnotation<Opts extends Options$2<t.NullableTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NullableTypeAnnotation & Opts>;
  assertNumberLiteral<Opts extends Options$2<t.NumberLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NumberLiteral & Opts>;
  assertNumberLiteralTypeAnnotation<
    Opts extends Options$2<t.NumberLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NumberLiteralTypeAnnotation & Opts>;
  assertNumberTypeAnnotation<Opts extends Options$2<t.NumberTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NumberTypeAnnotation & Opts>;
  assertNumericLiteral<Opts extends Options$2<t.NumericLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.NumericLiteral & Opts>;
  assertObjectExpression<Opts extends Options$2<t.ObjectExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectExpression & Opts>;
  assertObjectMember<Opts extends Options$2<t.ObjectMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectMember & Opts>;
  assertObjectMethod<Opts extends Options$2<t.ObjectMethod>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectMethod & Opts>;
  assertObjectPattern<Opts extends Options$2<t.ObjectPattern>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectPattern & Opts>;
  assertObjectProperty<Opts extends Options$2<t.ObjectProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectProperty & Opts>;
  assertObjectTypeAnnotation<Opts extends Options$2<t.ObjectTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectTypeAnnotation & Opts>;
  assertObjectTypeCallProperty<Opts extends Options$2<t.ObjectTypeCallProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectTypeCallProperty & Opts>;
  assertObjectTypeIndexer<Opts extends Options$2<t.ObjectTypeIndexer>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectTypeIndexer & Opts>;
  assertObjectTypeInternalSlot<Opts extends Options$2<t.ObjectTypeInternalSlot>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectTypeInternalSlot & Opts>;
  assertObjectTypeProperty<Opts extends Options$2<t.ObjectTypeProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectTypeProperty & Opts>;
  assertObjectTypeSpreadProperty<
    Opts extends Options$2<t.ObjectTypeSpreadProperty>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ObjectTypeSpreadProperty & Opts>;
  assertOpaqueType<Opts extends Options$2<t.OpaqueType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.OpaqueType & Opts>;
  assertOptionalCallExpression<Opts extends Options$2<t.OptionalCallExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.OptionalCallExpression & Opts>;
  assertOptionalIndexedAccessType<
    Opts extends Options$2<t.OptionalIndexedAccessType>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.OptionalIndexedAccessType & Opts>;
  assertOptionalMemberExpression<
    Opts extends Options$2<t.OptionalMemberExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.OptionalMemberExpression & Opts>;
  assertParenthesizedExpression<
    Opts extends Options$2<t.ParenthesizedExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ParenthesizedExpression & Opts>;
  assertPattern<Opts extends Options$2<t.Pattern>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Pattern & Opts>;
  assertPatternLike<Opts extends Options$2<t.PatternLike>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.PatternLike & Opts>;
  assertPlaceholder<Opts extends Options$2<t.Placeholder>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Placeholder & Opts>;
  assertPrivate<Opts extends Options$2<t.Private>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Private & Opts>;
  assertPrivateName<Opts extends Options$2<t.PrivateName>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.PrivateName & Opts>;
  assertProgram<Opts extends Options$2<t.Program>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Program & Opts>;
  assertProperty<Opts extends Options$2<t.Property>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Property & Opts>;
  assertPureish<Opts extends Options$2<t.Pureish>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Pureish & Opts>;
  assertQualifiedTypeIdentifier<
    Opts extends Options$2<t.QualifiedTypeIdentifier>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.QualifiedTypeIdentifier & Opts>;
  assertRegExpLiteral<Opts extends Options$2<t.RegExpLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.RegExpLiteral & Opts>;
  assertRegexLiteral<Opts extends Options$2<t.RegexLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.RegexLiteral & Opts>;
  assertRestElement<Opts extends Options$2<t.RestElement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.RestElement & Opts>;
  assertRestProperty<Opts extends Options$2<t.RestProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.RestProperty & Opts>;
  assertReturnStatement<Opts extends Options$2<t.ReturnStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ReturnStatement & Opts>;
  assertScopable<Opts extends Options$2<t.Scopable>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Scopable & Opts>;
  assertSequenceExpression<Opts extends Options$2<t.SequenceExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.SequenceExpression & Opts>;
  assertSpreadElement<Opts extends Options$2<t.SpreadElement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.SpreadElement & Opts>;
  assertSpreadProperty<Opts extends Options$2<t.SpreadProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.SpreadProperty & Opts>;
  assertStandardized<Opts extends Options$2<t.Standardized>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Standardized & Opts>;
  assertStatement<Opts extends Options$2<t.Statement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Statement & Opts>;
  assertStaticBlock<Opts extends Options$2<t.StaticBlock>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.StaticBlock & Opts>;
  assertStringLiteral<Opts extends Options$2<t.StringLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.StringLiteral & Opts>;
  assertStringLiteralTypeAnnotation<
    Opts extends Options$2<t.StringLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.StringLiteralTypeAnnotation & Opts>;
  assertStringTypeAnnotation<Opts extends Options$2<t.StringTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.StringTypeAnnotation & Opts>;
  assertSuper<Opts extends Options$2<t.Super>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Super & Opts>;
  assertSwitchCase<Opts extends Options$2<t.SwitchCase>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.SwitchCase & Opts>;
  assertSwitchStatement<Opts extends Options$2<t.SwitchStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.SwitchStatement & Opts>;
  assertSymbolTypeAnnotation<Opts extends Options$2<t.SymbolTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.SymbolTypeAnnotation & Opts>;
  assertTSAnyKeyword<Opts extends Options$2<t.TSAnyKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSAnyKeyword & Opts>;
  assertTSArrayType<Opts extends Options$2<t.TSArrayType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSArrayType & Opts>;
  assertTSAsExpression<Opts extends Options$2<t.TSAsExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSAsExpression & Opts>;
  assertTSBaseType<Opts extends Options$2<t.TSBaseType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSBaseType & Opts>;
  assertTSBigIntKeyword<Opts extends Options$2<t.TSBigIntKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSBigIntKeyword & Opts>;
  assertTSBooleanKeyword<Opts extends Options$2<t.TSBooleanKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSBooleanKeyword & Opts>;
  assertTSCallSignatureDeclaration<
    Opts extends Options$2<t.TSCallSignatureDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSCallSignatureDeclaration & Opts>;
  assertTSClassImplements<Opts extends Options$2<t.TSClassImplements>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSClassImplements & Opts>;
  assertTSConditionalType<Opts extends Options$2<t.TSConditionalType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSConditionalType & Opts>;
  assertTSConstructSignatureDeclaration<
    Opts extends Options$2<t.TSConstructSignatureDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSConstructSignatureDeclaration & Opts>;
  assertTSConstructorType<Opts extends Options$2<t.TSConstructorType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSConstructorType & Opts>;
  assertTSDeclareFunction<Opts extends Options$2<t.TSDeclareFunction>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSDeclareFunction & Opts>;
  assertTSDeclareMethod<Opts extends Options$2<t.TSDeclareMethod>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSDeclareMethod & Opts>;
  assertTSEntityName<Opts extends Options$2<t.TSEntityName>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSEntityName & Opts>;
  assertTSEnumBody<Opts extends Options$2<t.TSEnumBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSEnumBody & Opts>;
  assertTSEnumDeclaration<Opts extends Options$2<t.TSEnumDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSEnumDeclaration & Opts>;
  assertTSEnumMember<Opts extends Options$2<t.TSEnumMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSEnumMember & Opts>;
  assertTSExportAssignment<Opts extends Options$2<t.TSExportAssignment>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSExportAssignment & Opts>;
  assertTSExternalModuleReference<
    Opts extends Options$2<t.TSExternalModuleReference>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSExternalModuleReference & Opts>;
  assertTSFunctionType<Opts extends Options$2<t.TSFunctionType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSFunctionType & Opts>;
  assertTSImportEqualsDeclaration<
    Opts extends Options$2<t.TSImportEqualsDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSImportEqualsDeclaration & Opts>;
  assertTSImportType<Opts extends Options$2<t.TSImportType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSImportType & Opts>;
  assertTSIndexSignature<Opts extends Options$2<t.TSIndexSignature>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSIndexSignature & Opts>;
  assertTSIndexedAccessType<Opts extends Options$2<t.TSIndexedAccessType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSIndexedAccessType & Opts>;
  assertTSInferType<Opts extends Options$2<t.TSInferType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSInferType & Opts>;
  assertTSInstantiationExpression<
    Opts extends Options$2<t.TSInstantiationExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSInstantiationExpression & Opts>;
  assertTSInterfaceBody<Opts extends Options$2<t.TSInterfaceBody>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSInterfaceBody & Opts>;
  assertTSInterfaceDeclaration<Opts extends Options$2<t.TSInterfaceDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSInterfaceDeclaration & Opts>;
  assertTSInterfaceHeritage<Opts extends Options$2<t.TSInterfaceHeritage>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSInterfaceHeritage & Opts>;
  assertTSIntersectionType<Opts extends Options$2<t.TSIntersectionType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSIntersectionType & Opts>;
  assertTSIntrinsicKeyword<Opts extends Options$2<t.TSIntrinsicKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSIntrinsicKeyword & Opts>;
  assertTSLiteralType<Opts extends Options$2<t.TSLiteralType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSLiteralType & Opts>;
  assertTSMappedType<Opts extends Options$2<t.TSMappedType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSMappedType & Opts>;
  assertTSMethodSignature<Opts extends Options$2<t.TSMethodSignature>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSMethodSignature & Opts>;
  assertTSModuleBlock<Opts extends Options$2<t.TSModuleBlock>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSModuleBlock & Opts>;
  assertTSModuleDeclaration<Opts extends Options$2<t.TSModuleDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSModuleDeclaration & Opts>;
  assertTSNamedTupleMember<Opts extends Options$2<t.TSNamedTupleMember>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSNamedTupleMember & Opts>;
  assertTSNamespaceExportDeclaration<
    Opts extends Options$2<t.TSNamespaceExportDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSNamespaceExportDeclaration & Opts>;
  assertTSNeverKeyword<Opts extends Options$2<t.TSNeverKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSNeverKeyword & Opts>;
  assertTSNonNullExpression<Opts extends Options$2<t.TSNonNullExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSNonNullExpression & Opts>;
  assertTSNullKeyword<Opts extends Options$2<t.TSNullKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSNullKeyword & Opts>;
  assertTSNumberKeyword<Opts extends Options$2<t.TSNumberKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSNumberKeyword & Opts>;
  assertTSObjectKeyword<Opts extends Options$2<t.TSObjectKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSObjectKeyword & Opts>;
  assertTSOptionalType<Opts extends Options$2<t.TSOptionalType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSOptionalType & Opts>;
  assertTSParameterProperty<Opts extends Options$2<t.TSParameterProperty>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSParameterProperty & Opts>;
  assertTSParenthesizedType<Opts extends Options$2<t.TSParenthesizedType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSParenthesizedType & Opts>;
  assertTSPropertySignature<Opts extends Options$2<t.TSPropertySignature>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSPropertySignature & Opts>;
  assertTSQualifiedName<Opts extends Options$2<t.TSQualifiedName>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSQualifiedName & Opts>;
  assertTSRestType<Opts extends Options$2<t.TSRestType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSRestType & Opts>;
  assertTSSatisfiesExpression<Opts extends Options$2<t.TSSatisfiesExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSSatisfiesExpression & Opts>;
  assertTSStringKeyword<Opts extends Options$2<t.TSStringKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSStringKeyword & Opts>;
  assertTSSymbolKeyword<Opts extends Options$2<t.TSSymbolKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSSymbolKeyword & Opts>;
  assertTSTemplateLiteralType<Opts extends Options$2<t.TSTemplateLiteralType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTemplateLiteralType & Opts>;
  assertTSThisType<Opts extends Options$2<t.TSThisType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSThisType & Opts>;
  assertTSTupleType<Opts extends Options$2<t.TSTupleType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTupleType & Opts>;
  assertTSType<Opts extends Options$2<t.TSType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSType & Opts>;
  assertTSTypeAliasDeclaration<Opts extends Options$2<t.TSTypeAliasDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeAliasDeclaration & Opts>;
  assertTSTypeAnnotation<Opts extends Options$2<t.TSTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeAnnotation & Opts>;
  assertTSTypeAssertion<Opts extends Options$2<t.TSTypeAssertion>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeAssertion & Opts>;
  assertTSTypeElement<Opts extends Options$2<t.TSTypeElement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeElement & Opts>;
  assertTSTypeLiteral<Opts extends Options$2<t.TSTypeLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeLiteral & Opts>;
  assertTSTypeOperator<Opts extends Options$2<t.TSTypeOperator>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeOperator & Opts>;
  assertTSTypeParameter<Opts extends Options$2<t.TSTypeParameter>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeParameter & Opts>;
  assertTSTypeParameterDeclaration<
    Opts extends Options$2<t.TSTypeParameterDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeParameterDeclaration & Opts>;
  assertTSTypeParameterInstantiation<
    Opts extends Options$2<t.TSTypeParameterInstantiation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeParameterInstantiation & Opts>;
  assertTSTypePredicate<Opts extends Options$2<t.TSTypePredicate>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypePredicate & Opts>;
  assertTSTypeQuery<Opts extends Options$2<t.TSTypeQuery>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeQuery & Opts>;
  assertTSTypeReference<Opts extends Options$2<t.TSTypeReference>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSTypeReference & Opts>;
  assertTSUndefinedKeyword<Opts extends Options$2<t.TSUndefinedKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSUndefinedKeyword & Opts>;
  assertTSUnionType<Opts extends Options$2<t.TSUnionType>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSUnionType & Opts>;
  assertTSUnknownKeyword<Opts extends Options$2<t.TSUnknownKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSUnknownKeyword & Opts>;
  assertTSVoidKeyword<Opts extends Options$2<t.TSVoidKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TSVoidKeyword & Opts>;
  assertTaggedTemplateExpression<
    Opts extends Options$2<t.TaggedTemplateExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TaggedTemplateExpression & Opts>;
  assertTemplateElement<Opts extends Options$2<t.TemplateElement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TemplateElement & Opts>;
  assertTemplateLiteral<Opts extends Options$2<t.TemplateLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TemplateLiteral & Opts>;
  assertTerminatorless<Opts extends Options$2<t.Terminatorless>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Terminatorless & Opts>;
  assertThisExpression<Opts extends Options$2<t.ThisExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ThisExpression & Opts>;
  assertThisTypeAnnotation<Opts extends Options$2<t.ThisTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ThisTypeAnnotation & Opts>;
  assertThrowStatement<Opts extends Options$2<t.ThrowStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.ThrowStatement & Opts>;
  assertTopicReference<Opts extends Options$2<t.TopicReference>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TopicReference & Opts>;
  assertTryStatement<Opts extends Options$2<t.TryStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TryStatement & Opts>;
  assertTupleTypeAnnotation<Opts extends Options$2<t.TupleTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TupleTypeAnnotation & Opts>;
  assertTypeAlias<Opts extends Options$2<t.TypeAlias>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeAlias & Opts>;
  assertTypeAnnotation<Opts extends Options$2<t.TypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeAnnotation & Opts>;
  assertTypeCastExpression<Opts extends Options$2<t.TypeCastExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeCastExpression & Opts>;
  assertTypeParameter<Opts extends Options$2<t.TypeParameter>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeParameter & Opts>;
  assertTypeParameterDeclaration<
    Opts extends Options$2<t.TypeParameterDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeParameterDeclaration & Opts>;
  assertTypeParameterInstantiation<
    Opts extends Options$2<t.TypeParameterInstantiation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeParameterInstantiation & Opts>;
  assertTypeScript<Opts extends Options$2<t.TypeScript>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeScript & Opts>;
  assertTypeofTypeAnnotation<Opts extends Options$2<t.TypeofTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.TypeofTypeAnnotation & Opts>;
  assertUnaryExpression<Opts extends Options$2<t.UnaryExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.UnaryExpression & Opts>;
  assertUnaryLike<Opts extends Options$2<t.UnaryLike>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.UnaryLike & Opts>;
  assertUnionTypeAnnotation<Opts extends Options$2<t.UnionTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.UnionTypeAnnotation & Opts>;
  assertUpdateExpression<Opts extends Options$2<t.UpdateExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.UpdateExpression & Opts>;
  assertUserWhitespacable<Opts extends Options$2<t.UserWhitespacable>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.UserWhitespacable & Opts>;
  assertV8IntrinsicIdentifier<Opts extends Options$2<t.V8IntrinsicIdentifier>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.V8IntrinsicIdentifier & Opts>;
  assertVariableDeclaration<Opts extends Options$2<t.VariableDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.VariableDeclaration & Opts>;
  assertVariableDeclarator<Opts extends Options$2<t.VariableDeclarator>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.VariableDeclarator & Opts>;
  assertVariance<Opts extends Options$2<t.Variance>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.Variance & Opts>;
  assertVoidPattern<Opts extends Options$2<t.VoidPattern>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.VoidPattern & Opts>;
  assertVoidTypeAnnotation<Opts extends Options$2<t.VoidTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.VoidTypeAnnotation & Opts>;
  assertWhile<Opts extends Options$2<t.While>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.While & Opts>;
  assertWhileStatement<Opts extends Options$2<t.WhileStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.WhileStatement & Opts>;
  assertWithStatement<Opts extends Options$2<t.WithStatement>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.WithStatement & Opts>;
  assertYieldExpression<Opts extends Options$2<t.YieldExpression>>(
    opts?: Opts,
  ): asserts this is NodePath_Final<t.YieldExpression & Opts>;
}

type Options$1<Obj> = Partial<{
    [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node ? t.Node : Obj[Prop] extends t.Node[] ? t.Node[] : Obj[Prop];
}>;
interface VirtualTypeNodePathValidators {
    isBindingIdentifier(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["BindingIdentifier"]>;
    isBlockScoped(this: NodePath_Final<t.Node | null>): boolean;
    /**
     * @deprecated
     */
    isExistentialTypeParam(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["ExistentialTypeParam"]>;
    isExpression(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Expression>;
    isFlow(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Flow>;
    isForAwaitStatement(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["ForAwaitStatement"]>;
    isGenerated(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["Generated"]>;
    /**
     * @deprecated
     */
    isNumericLiteralTypeAnnotation(this: NodePath_Final<t.Node | null>): void;
    isPure(): boolean;
    isReferenced(): boolean;
    isReferencedIdentifier<Opts extends Options$1<VirtualTypeAliases["ReferencedIdentifier"]>>(this: NodePath_Final<t.Node | null>, opts?: Opts): this is NodePath_Final<VirtualTypeAliases["ReferencedIdentifier"] & Opts>;
    isReferencedMemberExpression(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["ReferencedMemberExpression"]>;
    isRestProperty(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.RestProperty>;
    isScope(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["Scope"]>;
    isSpreadProperty(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.SpreadProperty>;
    isStatement(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Statement>;
    isUser(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["User"]>;
    isVar(this: NodePath_Final<t.Node | null>): this is NodePath_Final<VirtualTypeAliases["Var"]>;
}

/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */


type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
      ? t.Node[]
      : Obj[Prop];
}>;

interface BaseNodePathValidators {
  isAccessor(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Accessor>;
  isAccessor<Opts extends Options<t.Accessor>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Accessor & Opts>;
  isAnyTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.AnyTypeAnnotation>;
  isAnyTypeAnnotation<Opts extends Options<t.AnyTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.AnyTypeAnnotation & Opts>;
  isArgumentPlaceholder(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ArgumentPlaceholder>;
  isArgumentPlaceholder<Opts extends Options<t.ArgumentPlaceholder>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ArgumentPlaceholder & Opts>;
  isArrayExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ArrayExpression>;
  isArrayExpression<Opts extends Options<t.ArrayExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ArrayExpression & Opts>;
  isArrayPattern(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ArrayPattern>;
  isArrayPattern<Opts extends Options<t.ArrayPattern>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ArrayPattern & Opts>;
  isArrayTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ArrayTypeAnnotation>;
  isArrayTypeAnnotation<Opts extends Options<t.ArrayTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ArrayTypeAnnotation & Opts>;
  isArrowFunctionExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ArrowFunctionExpression>;
  isArrowFunctionExpression<Opts extends Options<t.ArrowFunctionExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ArrowFunctionExpression & Opts>;
  isAssignmentExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.AssignmentExpression>;
  isAssignmentExpression<Opts extends Options<t.AssignmentExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.AssignmentExpression & Opts>;
  isAssignmentPattern(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.AssignmentPattern>;
  isAssignmentPattern<Opts extends Options<t.AssignmentPattern>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.AssignmentPattern & Opts>;
  isAwaitExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.AwaitExpression>;
  isAwaitExpression<Opts extends Options<t.AwaitExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.AwaitExpression & Opts>;
  isBigIntLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BigIntLiteral>;
  isBigIntLiteral<Opts extends Options<t.BigIntLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BigIntLiteral & Opts>;
  isBigIntLiteralTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BigIntLiteralTypeAnnotation>;
  isBigIntLiteralTypeAnnotation<
    Opts extends Options<t.BigIntLiteralTypeAnnotation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BigIntLiteralTypeAnnotation & Opts>;
  isBinary(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Binary>;
  isBinary<Opts extends Options<t.Binary>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Binary & Opts>;
  isBinaryExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BinaryExpression>;
  isBinaryExpression<Opts extends Options<t.BinaryExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BinaryExpression & Opts>;
  isBindExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BindExpression>;
  isBindExpression<Opts extends Options<t.BindExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BindExpression & Opts>;
  isBlock(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Block>;
  isBlock<Opts extends Options<t.Block>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Block & Opts>;
  isBlockParent(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.BlockParent>;
  isBlockParent<Opts extends Options<t.BlockParent>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BlockParent & Opts>;
  isBlockStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BlockStatement>;
  isBlockStatement<Opts extends Options<t.BlockStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BlockStatement & Opts>;
  isBooleanLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BooleanLiteral>;
  isBooleanLiteral<Opts extends Options<t.BooleanLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BooleanLiteral & Opts>;
  isBooleanLiteralTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BooleanLiteralTypeAnnotation>;
  isBooleanLiteralTypeAnnotation<
    Opts extends Options<t.BooleanLiteralTypeAnnotation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BooleanLiteralTypeAnnotation & Opts>;
  isBooleanTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BooleanTypeAnnotation>;
  isBooleanTypeAnnotation<Opts extends Options<t.BooleanTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BooleanTypeAnnotation & Opts>;
  isBreakStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.BreakStatement>;
  isBreakStatement<Opts extends Options<t.BreakStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.BreakStatement & Opts>;
  isCallExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.CallExpression>;
  isCallExpression<Opts extends Options<t.CallExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.CallExpression & Opts>;
  isCatchClause(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.CatchClause>;
  isCatchClause<Opts extends Options<t.CatchClause>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.CatchClause & Opts>;
  isClass(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Class>;
  isClass<Opts extends Options<t.Class>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Class & Opts>;
  isClassAccessorProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ClassAccessorProperty>;
  isClassAccessorProperty<Opts extends Options<t.ClassAccessorProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassAccessorProperty & Opts>;
  isClassBody(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.ClassBody>;
  isClassBody<Opts extends Options<t.ClassBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassBody & Opts>;
  isClassDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ClassDeclaration>;
  isClassDeclaration<Opts extends Options<t.ClassDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassDeclaration & Opts>;
  isClassExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ClassExpression>;
  isClassExpression<Opts extends Options<t.ClassExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassExpression & Opts>;
  isClassImplements(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ClassImplements>;
  isClassImplements<Opts extends Options<t.ClassImplements>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassImplements & Opts>;
  isClassMethod(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.ClassMethod>;
  isClassMethod<Opts extends Options<t.ClassMethod>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassMethod & Opts>;
  isClassPrivateMethod(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ClassPrivateMethod>;
  isClassPrivateMethod<Opts extends Options<t.ClassPrivateMethod>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassPrivateMethod & Opts>;
  isClassPrivateProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ClassPrivateProperty>;
  isClassPrivateProperty<Opts extends Options<t.ClassPrivateProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassPrivateProperty & Opts>;
  isClassProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ClassProperty>;
  isClassProperty<Opts extends Options<t.ClassProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ClassProperty & Opts>;
  isCompletionStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.CompletionStatement>;
  isCompletionStatement<Opts extends Options<t.CompletionStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.CompletionStatement & Opts>;
  isConditional(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Conditional>;
  isConditional<Opts extends Options<t.Conditional>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Conditional & Opts>;
  isConditionalExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ConditionalExpression>;
  isConditionalExpression<Opts extends Options<t.ConditionalExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ConditionalExpression & Opts>;
  isContinueStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ContinueStatement>;
  isContinueStatement<Opts extends Options<t.ContinueStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ContinueStatement & Opts>;
  isDebuggerStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DebuggerStatement>;
  isDebuggerStatement<Opts extends Options<t.DebuggerStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DebuggerStatement & Opts>;
  isDeclaration(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Declaration>;
  isDeclaration<Opts extends Options<t.Declaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Declaration & Opts>;
  isDeclareClass(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareClass>;
  isDeclareClass<Opts extends Options<t.DeclareClass>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareClass & Opts>;
  isDeclareExportAllDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareExportAllDeclaration>;
  isDeclareExportAllDeclaration<
    Opts extends Options<t.DeclareExportAllDeclaration>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareExportAllDeclaration & Opts>;
  isDeclareExportDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareExportDeclaration>;
  isDeclareExportDeclaration<Opts extends Options<t.DeclareExportDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareExportDeclaration & Opts>;
  isDeclareFunction(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareFunction>;
  isDeclareFunction<Opts extends Options<t.DeclareFunction>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareFunction & Opts>;
  isDeclareInterface(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareInterface>;
  isDeclareInterface<Opts extends Options<t.DeclareInterface>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareInterface & Opts>;
  isDeclareModule(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareModule>;
  isDeclareModule<Opts extends Options<t.DeclareModule>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareModule & Opts>;
  isDeclareModuleExports(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareModuleExports>;
  isDeclareModuleExports<Opts extends Options<t.DeclareModuleExports>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareModuleExports & Opts>;
  isDeclareOpaqueType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareOpaqueType>;
  isDeclareOpaqueType<Opts extends Options<t.DeclareOpaqueType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareOpaqueType & Opts>;
  isDeclareTypeAlias(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareTypeAlias>;
  isDeclareTypeAlias<Opts extends Options<t.DeclareTypeAlias>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareTypeAlias & Opts>;
  isDeclareVariable(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclareVariable>;
  isDeclareVariable<Opts extends Options<t.DeclareVariable>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclareVariable & Opts>;
  isDeclaredPredicate(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DeclaredPredicate>;
  isDeclaredPredicate<Opts extends Options<t.DeclaredPredicate>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DeclaredPredicate & Opts>;
  isDecorator(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Decorator>;
  isDecorator<Opts extends Options<t.Decorator>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Decorator & Opts>;
  isDirective(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Directive>;
  isDirective<Opts extends Options<t.Directive>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Directive & Opts>;
  isDirectiveLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DirectiveLiteral>;
  isDirectiveLiteral<Opts extends Options<t.DirectiveLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DirectiveLiteral & Opts>;
  isDoExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DoExpression>;
  isDoExpression<Opts extends Options<t.DoExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DoExpression & Opts>;
  isDoWhileStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.DoWhileStatement>;
  isDoWhileStatement<Opts extends Options<t.DoWhileStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.DoWhileStatement & Opts>;
  isEmptyStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EmptyStatement>;
  isEmptyStatement<Opts extends Options<t.EmptyStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EmptyStatement & Opts>;
  isEmptyTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EmptyTypeAnnotation>;
  isEmptyTypeAnnotation<Opts extends Options<t.EmptyTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EmptyTypeAnnotation & Opts>;
  isEnumBody(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.EnumBody>;
  isEnumBody<Opts extends Options<t.EnumBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumBody & Opts>;
  isEnumBooleanBody(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumBooleanBody>;
  isEnumBooleanBody<Opts extends Options<t.EnumBooleanBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumBooleanBody & Opts>;
  isEnumBooleanMember(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumBooleanMember>;
  isEnumBooleanMember<Opts extends Options<t.EnumBooleanMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumBooleanMember & Opts>;
  isEnumDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumDeclaration>;
  isEnumDeclaration<Opts extends Options<t.EnumDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumDeclaration & Opts>;
  isEnumDefaultedMember(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumDefaultedMember>;
  isEnumDefaultedMember<Opts extends Options<t.EnumDefaultedMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumDefaultedMember & Opts>;
  isEnumMember(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.EnumMember>;
  isEnumMember<Opts extends Options<t.EnumMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumMember & Opts>;
  isEnumNumberBody(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumNumberBody>;
  isEnumNumberBody<Opts extends Options<t.EnumNumberBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumNumberBody & Opts>;
  isEnumNumberMember(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumNumberMember>;
  isEnumNumberMember<Opts extends Options<t.EnumNumberMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumNumberMember & Opts>;
  isEnumStringBody(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumStringBody>;
  isEnumStringBody<Opts extends Options<t.EnumStringBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumStringBody & Opts>;
  isEnumStringMember(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumStringMember>;
  isEnumStringMember<Opts extends Options<t.EnumStringMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumStringMember & Opts>;
  isEnumSymbolBody(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.EnumSymbolBody>;
  isEnumSymbolBody<Opts extends Options<t.EnumSymbolBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.EnumSymbolBody & Opts>;
  isExistsTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExistsTypeAnnotation>;
  isExistsTypeAnnotation<Opts extends Options<t.ExistsTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExistsTypeAnnotation & Opts>;
  isExportAllDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExportAllDeclaration>;
  isExportAllDeclaration<Opts extends Options<t.ExportAllDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExportAllDeclaration & Opts>;
  isExportDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExportDeclaration>;
  isExportDeclaration<Opts extends Options<t.ExportDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExportDeclaration & Opts>;
  isExportDefaultDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExportDefaultDeclaration>;
  isExportDefaultDeclaration<Opts extends Options<t.ExportDefaultDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExportDefaultDeclaration & Opts>;
  isExportDefaultSpecifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExportDefaultSpecifier>;
  isExportDefaultSpecifier<Opts extends Options<t.ExportDefaultSpecifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExportDefaultSpecifier & Opts>;
  isExportNamedDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExportNamedDeclaration>;
  isExportNamedDeclaration<Opts extends Options<t.ExportNamedDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExportNamedDeclaration & Opts>;
  isExportNamespaceSpecifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExportNamespaceSpecifier>;
  isExportNamespaceSpecifier<Opts extends Options<t.ExportNamespaceSpecifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExportNamespaceSpecifier & Opts>;
  isExportSpecifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExportSpecifier>;
  isExportSpecifier<Opts extends Options<t.ExportSpecifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExportSpecifier & Opts>;
  isExpression(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Expression>;
  isExpression<Opts extends Options<t.Expression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Expression & Opts>;
  isExpressionStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExpressionStatement>;
  isExpressionStatement<Opts extends Options<t.ExpressionStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExpressionStatement & Opts>;
  isExpressionWrapper(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ExpressionWrapper>;
  isExpressionWrapper<Opts extends Options<t.ExpressionWrapper>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ExpressionWrapper & Opts>;
  isFile(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.File>;
  isFile<Opts extends Options<t.File>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.File & Opts>;
  isFlow(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Flow>;
  isFlow<Opts extends Options<t.Flow>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Flow & Opts>;
  isFlowBaseAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FlowBaseAnnotation>;
  isFlowBaseAnnotation<Opts extends Options<t.FlowBaseAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FlowBaseAnnotation & Opts>;
  isFlowDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FlowDeclaration>;
  isFlowDeclaration<Opts extends Options<t.FlowDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FlowDeclaration & Opts>;
  isFlowPredicate(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FlowPredicate>;
  isFlowPredicate<Opts extends Options<t.FlowPredicate>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FlowPredicate & Opts>;
  isFlowType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.FlowType>;
  isFlowType<Opts extends Options<t.FlowType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FlowType & Opts>;
  isFor(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.For>;
  isFor<Opts extends Options<t.For>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.For & Opts>;
  isForInStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ForInStatement>;
  isForInStatement<Opts extends Options<t.ForInStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ForInStatement & Opts>;
  isForOfStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ForOfStatement>;
  isForOfStatement<Opts extends Options<t.ForOfStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ForOfStatement & Opts>;
  isForStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ForStatement>;
  isForStatement<Opts extends Options<t.ForStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ForStatement & Opts>;
  isForXStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ForXStatement>;
  isForXStatement<Opts extends Options<t.ForXStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ForXStatement & Opts>;
  isFunction(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Function>;
  isFunction<Opts extends Options<t.Function>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Function & Opts>;
  isFunctionDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FunctionDeclaration>;
  isFunctionDeclaration<Opts extends Options<t.FunctionDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FunctionDeclaration & Opts>;
  isFunctionExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FunctionExpression>;
  isFunctionExpression<Opts extends Options<t.FunctionExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FunctionExpression & Opts>;
  isFunctionParameter(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FunctionParameter>;
  isFunctionParameter<Opts extends Options<t.FunctionParameter>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FunctionParameter & Opts>;
  isFunctionParent(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FunctionParent>;
  isFunctionParent<Opts extends Options<t.FunctionParent>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FunctionParent & Opts>;
  isFunctionTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FunctionTypeAnnotation>;
  isFunctionTypeAnnotation<Opts extends Options<t.FunctionTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FunctionTypeAnnotation & Opts>;
  isFunctionTypeParam(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.FunctionTypeParam>;
  isFunctionTypeParam<Opts extends Options<t.FunctionTypeParam>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.FunctionTypeParam & Opts>;
  isGenericTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.GenericTypeAnnotation>;
  isGenericTypeAnnotation<Opts extends Options<t.GenericTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.GenericTypeAnnotation & Opts>;
  isIdentifier(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Identifier>;
  isIdentifier<Opts extends Options<t.Identifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Identifier & Opts>;
  isIfStatement(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.IfStatement>;
  isIfStatement<Opts extends Options<t.IfStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.IfStatement & Opts>;
  isImmutable(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Immutable>;
  isImmutable<Opts extends Options<t.Immutable>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Immutable & Opts>;
  isImport(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Import>;
  isImport<Opts extends Options<t.Import>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Import & Opts>;
  isImportAttribute(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ImportAttribute>;
  isImportAttribute<Opts extends Options<t.ImportAttribute>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ImportAttribute & Opts>;
  isImportDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ImportDeclaration>;
  isImportDeclaration<Opts extends Options<t.ImportDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ImportDeclaration & Opts>;
  isImportDefaultSpecifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ImportDefaultSpecifier>;
  isImportDefaultSpecifier<Opts extends Options<t.ImportDefaultSpecifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ImportDefaultSpecifier & Opts>;
  isImportExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ImportExpression>;
  isImportExpression<Opts extends Options<t.ImportExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ImportExpression & Opts>;
  isImportNamespaceSpecifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ImportNamespaceSpecifier>;
  isImportNamespaceSpecifier<Opts extends Options<t.ImportNamespaceSpecifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ImportNamespaceSpecifier & Opts>;
  isImportOrExportDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ImportOrExportDeclaration>;
  isImportOrExportDeclaration<
    Opts extends Options<t.ImportOrExportDeclaration>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ImportOrExportDeclaration & Opts>;
  isImportSpecifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ImportSpecifier>;
  isImportSpecifier<Opts extends Options<t.ImportSpecifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ImportSpecifier & Opts>;
  isIndexedAccessType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.IndexedAccessType>;
  isIndexedAccessType<Opts extends Options<t.IndexedAccessType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.IndexedAccessType & Opts>;
  isInferredPredicate(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.InferredPredicate>;
  isInferredPredicate<Opts extends Options<t.InferredPredicate>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.InferredPredicate & Opts>;
  isInterfaceDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.InterfaceDeclaration>;
  isInterfaceDeclaration<Opts extends Options<t.InterfaceDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.InterfaceDeclaration & Opts>;
  isInterfaceExtends(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.InterfaceExtends>;
  isInterfaceExtends<Opts extends Options<t.InterfaceExtends>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.InterfaceExtends & Opts>;
  isInterfaceTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.InterfaceTypeAnnotation>;
  isInterfaceTypeAnnotation<Opts extends Options<t.InterfaceTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.InterfaceTypeAnnotation & Opts>;
  isInterpreterDirective(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.InterpreterDirective>;
  isInterpreterDirective<Opts extends Options<t.InterpreterDirective>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.InterpreterDirective & Opts>;
  isIntersectionTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.IntersectionTypeAnnotation>;
  isIntersectionTypeAnnotation<
    Opts extends Options<t.IntersectionTypeAnnotation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.IntersectionTypeAnnotation & Opts>;
  isJSX(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.JSX>;
  isJSX<Opts extends Options<t.JSX>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSX & Opts>;
  isJSXAttribute(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXAttribute>;
  isJSXAttribute<Opts extends Options<t.JSXAttribute>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXAttribute & Opts>;
  isJSXClosingElement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXClosingElement>;
  isJSXClosingElement<Opts extends Options<t.JSXClosingElement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXClosingElement & Opts>;
  isJSXClosingFragment(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXClosingFragment>;
  isJSXClosingFragment<Opts extends Options<t.JSXClosingFragment>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXClosingFragment & Opts>;
  isJSXElement(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.JSXElement>;
  isJSXElement<Opts extends Options<t.JSXElement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXElement & Opts>;
  isJSXEmptyExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXEmptyExpression>;
  isJSXEmptyExpression<Opts extends Options<t.JSXEmptyExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXEmptyExpression & Opts>;
  isJSXExpressionContainer(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXExpressionContainer>;
  isJSXExpressionContainer<Opts extends Options<t.JSXExpressionContainer>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXExpressionContainer & Opts>;
  isJSXFragment(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.JSXFragment>;
  isJSXFragment<Opts extends Options<t.JSXFragment>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXFragment & Opts>;
  isJSXIdentifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXIdentifier>;
  isJSXIdentifier<Opts extends Options<t.JSXIdentifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXIdentifier & Opts>;
  isJSXMemberExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXMemberExpression>;
  isJSXMemberExpression<Opts extends Options<t.JSXMemberExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXMemberExpression & Opts>;
  isJSXNamespacedName(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXNamespacedName>;
  isJSXNamespacedName<Opts extends Options<t.JSXNamespacedName>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXNamespacedName & Opts>;
  isJSXOpeningElement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXOpeningElement>;
  isJSXOpeningElement<Opts extends Options<t.JSXOpeningElement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXOpeningElement & Opts>;
  isJSXOpeningFragment(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXOpeningFragment>;
  isJSXOpeningFragment<Opts extends Options<t.JSXOpeningFragment>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXOpeningFragment & Opts>;
  isJSXSpreadAttribute(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXSpreadAttribute>;
  isJSXSpreadAttribute<Opts extends Options<t.JSXSpreadAttribute>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXSpreadAttribute & Opts>;
  isJSXSpreadChild(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.JSXSpreadChild>;
  isJSXSpreadChild<Opts extends Options<t.JSXSpreadChild>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXSpreadChild & Opts>;
  isJSXText(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.JSXText>;
  isJSXText<Opts extends Options<t.JSXText>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.JSXText & Opts>;
  isLVal(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.LVal>;
  isLVal<Opts extends Options<t.LVal>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.LVal & Opts>;
  isLabeledStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.LabeledStatement>;
  isLabeledStatement<Opts extends Options<t.LabeledStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.LabeledStatement & Opts>;
  isLiteral(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Literal>;
  isLiteral<Opts extends Options<t.Literal>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Literal & Opts>;
  isLogicalExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.LogicalExpression>;
  isLogicalExpression<Opts extends Options<t.LogicalExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.LogicalExpression & Opts>;
  isLoop(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Loop>;
  isLoop<Opts extends Options<t.Loop>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Loop & Opts>;
  isMemberExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.MemberExpression>;
  isMemberExpression<Opts extends Options<t.MemberExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.MemberExpression & Opts>;
  isMetaProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.MetaProperty>;
  isMetaProperty<Opts extends Options<t.MetaProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.MetaProperty & Opts>;
  isMethod(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Method>;
  isMethod<Opts extends Options<t.Method>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Method & Opts>;
  isMiscellaneous(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.Miscellaneous>;
  isMiscellaneous<Opts extends Options<t.Miscellaneous>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Miscellaneous & Opts>;
  isMixedTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.MixedTypeAnnotation>;
  isMixedTypeAnnotation<Opts extends Options<t.MixedTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.MixedTypeAnnotation & Opts>;
  isModuleDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ModuleDeclaration>;
  isModuleDeclaration<Opts extends Options<t.ModuleDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ModuleDeclaration & Opts>;
  isModuleExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ModuleExpression>;
  isModuleExpression<Opts extends Options<t.ModuleExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ModuleExpression & Opts>;
  isModuleSpecifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ModuleSpecifier>;
  isModuleSpecifier<Opts extends Options<t.ModuleSpecifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ModuleSpecifier & Opts>;
  isNewExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.NewExpression>;
  isNewExpression<Opts extends Options<t.NewExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NewExpression & Opts>;
  isNullLiteral(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.NullLiteral>;
  isNullLiteral<Opts extends Options<t.NullLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NullLiteral & Opts>;
  isNullLiteralTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.NullLiteralTypeAnnotation>;
  isNullLiteralTypeAnnotation<
    Opts extends Options<t.NullLiteralTypeAnnotation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NullLiteralTypeAnnotation & Opts>;
  isNullableTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.NullableTypeAnnotation>;
  isNullableTypeAnnotation<Opts extends Options<t.NullableTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NullableTypeAnnotation & Opts>;
  isNumberLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.NumberLiteral>;
  isNumberLiteral<Opts extends Options<t.NumberLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NumberLiteral & Opts>;
  isNumberLiteralTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.NumberLiteralTypeAnnotation>;
  isNumberLiteralTypeAnnotation<
    Opts extends Options<t.NumberLiteralTypeAnnotation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NumberLiteralTypeAnnotation & Opts>;
  isNumberTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.NumberTypeAnnotation>;
  isNumberTypeAnnotation<Opts extends Options<t.NumberTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NumberTypeAnnotation & Opts>;
  isNumericLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.NumericLiteral>;
  isNumericLiteral<Opts extends Options<t.NumericLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.NumericLiteral & Opts>;
  isObjectExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectExpression>;
  isObjectExpression<Opts extends Options<t.ObjectExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectExpression & Opts>;
  isObjectMember(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectMember>;
  isObjectMember<Opts extends Options<t.ObjectMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectMember & Opts>;
  isObjectMethod(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectMethod>;
  isObjectMethod<Opts extends Options<t.ObjectMethod>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectMethod & Opts>;
  isObjectPattern(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectPattern>;
  isObjectPattern<Opts extends Options<t.ObjectPattern>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectPattern & Opts>;
  isObjectProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectProperty>;
  isObjectProperty<Opts extends Options<t.ObjectProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectProperty & Opts>;
  isObjectTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectTypeAnnotation>;
  isObjectTypeAnnotation<Opts extends Options<t.ObjectTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectTypeAnnotation & Opts>;
  isObjectTypeCallProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectTypeCallProperty>;
  isObjectTypeCallProperty<Opts extends Options<t.ObjectTypeCallProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectTypeCallProperty & Opts>;
  isObjectTypeIndexer(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectTypeIndexer>;
  isObjectTypeIndexer<Opts extends Options<t.ObjectTypeIndexer>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectTypeIndexer & Opts>;
  isObjectTypeInternalSlot(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectTypeInternalSlot>;
  isObjectTypeInternalSlot<Opts extends Options<t.ObjectTypeInternalSlot>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectTypeInternalSlot & Opts>;
  isObjectTypeProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectTypeProperty>;
  isObjectTypeProperty<Opts extends Options<t.ObjectTypeProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectTypeProperty & Opts>;
  isObjectTypeSpreadProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ObjectTypeSpreadProperty>;
  isObjectTypeSpreadProperty<Opts extends Options<t.ObjectTypeSpreadProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ObjectTypeSpreadProperty & Opts>;
  isOpaqueType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.OpaqueType>;
  isOpaqueType<Opts extends Options<t.OpaqueType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.OpaqueType & Opts>;
  isOptionalCallExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.OptionalCallExpression>;
  isOptionalCallExpression<Opts extends Options<t.OptionalCallExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.OptionalCallExpression & Opts>;
  isOptionalIndexedAccessType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.OptionalIndexedAccessType>;
  isOptionalIndexedAccessType<
    Opts extends Options<t.OptionalIndexedAccessType>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.OptionalIndexedAccessType & Opts>;
  isOptionalMemberExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.OptionalMemberExpression>;
  isOptionalMemberExpression<Opts extends Options<t.OptionalMemberExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.OptionalMemberExpression & Opts>;
  isParenthesizedExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ParenthesizedExpression>;
  isParenthesizedExpression<Opts extends Options<t.ParenthesizedExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ParenthesizedExpression & Opts>;
  isPattern(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Pattern>;
  isPattern<Opts extends Options<t.Pattern>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Pattern & Opts>;
  isPatternLike(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.PatternLike>;
  isPatternLike<Opts extends Options<t.PatternLike>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.PatternLike & Opts>;
  isPlaceholder(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Placeholder>;
  isPlaceholder<Opts extends Options<t.Placeholder>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Placeholder & Opts>;
  isPrivate(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Private>;
  isPrivate<Opts extends Options<t.Private>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Private & Opts>;
  isPrivateName(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.PrivateName>;
  isPrivateName<Opts extends Options<t.PrivateName>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.PrivateName & Opts>;
  isProgram(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Program>;
  isProgram<Opts extends Options<t.Program>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Program & Opts>;
  isProperty(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Property>;
  isProperty<Opts extends Options<t.Property>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Property & Opts>;
  isPureish(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Pureish>;
  isPureish<Opts extends Options<t.Pureish>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Pureish & Opts>;
  isQualifiedTypeIdentifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.QualifiedTypeIdentifier>;
  isQualifiedTypeIdentifier<Opts extends Options<t.QualifiedTypeIdentifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.QualifiedTypeIdentifier & Opts>;
  isRegExpLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.RegExpLiteral>;
  isRegExpLiteral<Opts extends Options<t.RegExpLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.RegExpLiteral & Opts>;
  isRegexLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.RegexLiteral>;
  isRegexLiteral<Opts extends Options<t.RegexLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.RegexLiteral & Opts>;
  isRestElement(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.RestElement>;
  isRestElement<Opts extends Options<t.RestElement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.RestElement & Opts>;
  isRestProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.RestProperty>;
  isRestProperty<Opts extends Options<t.RestProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.RestProperty & Opts>;
  isReturnStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ReturnStatement>;
  isReturnStatement<Opts extends Options<t.ReturnStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ReturnStatement & Opts>;
  isScopable(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Scopable>;
  isScopable<Opts extends Options<t.Scopable>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Scopable & Opts>;
  isSequenceExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.SequenceExpression>;
  isSequenceExpression<Opts extends Options<t.SequenceExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.SequenceExpression & Opts>;
  isSpreadElement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.SpreadElement>;
  isSpreadElement<Opts extends Options<t.SpreadElement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.SpreadElement & Opts>;
  isSpreadProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.SpreadProperty>;
  isSpreadProperty<Opts extends Options<t.SpreadProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.SpreadProperty & Opts>;
  isStandardized(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.Standardized>;
  isStandardized<Opts extends Options<t.Standardized>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Standardized & Opts>;
  isStatement(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Statement>;
  isStatement<Opts extends Options<t.Statement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Statement & Opts>;
  isStaticBlock(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.StaticBlock>;
  isStaticBlock<Opts extends Options<t.StaticBlock>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.StaticBlock & Opts>;
  isStringLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.StringLiteral>;
  isStringLiteral<Opts extends Options<t.StringLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.StringLiteral & Opts>;
  isStringLiteralTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.StringLiteralTypeAnnotation>;
  isStringLiteralTypeAnnotation<
    Opts extends Options<t.StringLiteralTypeAnnotation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.StringLiteralTypeAnnotation & Opts>;
  isStringTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.StringTypeAnnotation>;
  isStringTypeAnnotation<Opts extends Options<t.StringTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.StringTypeAnnotation & Opts>;
  isSuper(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Super>;
  isSuper<Opts extends Options<t.Super>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Super & Opts>;
  isSwitchCase(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.SwitchCase>;
  isSwitchCase<Opts extends Options<t.SwitchCase>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.SwitchCase & Opts>;
  isSwitchStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.SwitchStatement>;
  isSwitchStatement<Opts extends Options<t.SwitchStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.SwitchStatement & Opts>;
  isSymbolTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.SymbolTypeAnnotation>;
  isSymbolTypeAnnotation<Opts extends Options<t.SymbolTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.SymbolTypeAnnotation & Opts>;
  isTSAnyKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSAnyKeyword>;
  isTSAnyKeyword<Opts extends Options<t.TSAnyKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSAnyKeyword & Opts>;
  isTSArrayType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSArrayType>;
  isTSArrayType<Opts extends Options<t.TSArrayType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSArrayType & Opts>;
  isTSAsExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSAsExpression>;
  isTSAsExpression<Opts extends Options<t.TSAsExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSAsExpression & Opts>;
  isTSBaseType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSBaseType>;
  isTSBaseType<Opts extends Options<t.TSBaseType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSBaseType & Opts>;
  isTSBigIntKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSBigIntKeyword>;
  isTSBigIntKeyword<Opts extends Options<t.TSBigIntKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSBigIntKeyword & Opts>;
  isTSBooleanKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSBooleanKeyword>;
  isTSBooleanKeyword<Opts extends Options<t.TSBooleanKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSBooleanKeyword & Opts>;
  isTSCallSignatureDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSCallSignatureDeclaration>;
  isTSCallSignatureDeclaration<
    Opts extends Options<t.TSCallSignatureDeclaration>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSCallSignatureDeclaration & Opts>;
  isTSClassImplements(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSClassImplements>;
  isTSClassImplements<Opts extends Options<t.TSClassImplements>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSClassImplements & Opts>;
  isTSConditionalType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSConditionalType>;
  isTSConditionalType<Opts extends Options<t.TSConditionalType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSConditionalType & Opts>;
  isTSConstructSignatureDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSConstructSignatureDeclaration>;
  isTSConstructSignatureDeclaration<
    Opts extends Options<t.TSConstructSignatureDeclaration>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSConstructSignatureDeclaration & Opts>;
  isTSConstructorType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSConstructorType>;
  isTSConstructorType<Opts extends Options<t.TSConstructorType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSConstructorType & Opts>;
  isTSDeclareFunction(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSDeclareFunction>;
  isTSDeclareFunction<Opts extends Options<t.TSDeclareFunction>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSDeclareFunction & Opts>;
  isTSDeclareMethod(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSDeclareMethod>;
  isTSDeclareMethod<Opts extends Options<t.TSDeclareMethod>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSDeclareMethod & Opts>;
  isTSEntityName(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSEntityName>;
  isTSEntityName<Opts extends Options<t.TSEntityName>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSEntityName & Opts>;
  isTSEnumBody(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSEnumBody>;
  isTSEnumBody<Opts extends Options<t.TSEnumBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSEnumBody & Opts>;
  isTSEnumDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSEnumDeclaration>;
  isTSEnumDeclaration<Opts extends Options<t.TSEnumDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSEnumDeclaration & Opts>;
  isTSEnumMember(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSEnumMember>;
  isTSEnumMember<Opts extends Options<t.TSEnumMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSEnumMember & Opts>;
  isTSExportAssignment(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSExportAssignment>;
  isTSExportAssignment<Opts extends Options<t.TSExportAssignment>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSExportAssignment & Opts>;
  isTSExternalModuleReference(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSExternalModuleReference>;
  isTSExternalModuleReference<
    Opts extends Options<t.TSExternalModuleReference>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSExternalModuleReference & Opts>;
  isTSFunctionType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSFunctionType>;
  isTSFunctionType<Opts extends Options<t.TSFunctionType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSFunctionType & Opts>;
  isTSImportEqualsDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSImportEqualsDeclaration>;
  isTSImportEqualsDeclaration<
    Opts extends Options<t.TSImportEqualsDeclaration>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSImportEqualsDeclaration & Opts>;
  isTSImportType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSImportType>;
  isTSImportType<Opts extends Options<t.TSImportType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSImportType & Opts>;
  isTSIndexSignature(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSIndexSignature>;
  isTSIndexSignature<Opts extends Options<t.TSIndexSignature>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSIndexSignature & Opts>;
  isTSIndexedAccessType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSIndexedAccessType>;
  isTSIndexedAccessType<Opts extends Options<t.TSIndexedAccessType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSIndexedAccessType & Opts>;
  isTSInferType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSInferType>;
  isTSInferType<Opts extends Options<t.TSInferType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSInferType & Opts>;
  isTSInstantiationExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSInstantiationExpression>;
  isTSInstantiationExpression<
    Opts extends Options<t.TSInstantiationExpression>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSInstantiationExpression & Opts>;
  isTSInterfaceBody(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSInterfaceBody>;
  isTSInterfaceBody<Opts extends Options<t.TSInterfaceBody>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSInterfaceBody & Opts>;
  isTSInterfaceDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSInterfaceDeclaration>;
  isTSInterfaceDeclaration<Opts extends Options<t.TSInterfaceDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSInterfaceDeclaration & Opts>;
  isTSInterfaceHeritage(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSInterfaceHeritage>;
  isTSInterfaceHeritage<Opts extends Options<t.TSInterfaceHeritage>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSInterfaceHeritage & Opts>;
  isTSIntersectionType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSIntersectionType>;
  isTSIntersectionType<Opts extends Options<t.TSIntersectionType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSIntersectionType & Opts>;
  isTSIntrinsicKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSIntrinsicKeyword>;
  isTSIntrinsicKeyword<Opts extends Options<t.TSIntrinsicKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSIntrinsicKeyword & Opts>;
  isTSLiteralType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSLiteralType>;
  isTSLiteralType<Opts extends Options<t.TSLiteralType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSLiteralType & Opts>;
  isTSMappedType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSMappedType>;
  isTSMappedType<Opts extends Options<t.TSMappedType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSMappedType & Opts>;
  isTSMethodSignature(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSMethodSignature>;
  isTSMethodSignature<Opts extends Options<t.TSMethodSignature>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSMethodSignature & Opts>;
  isTSModuleBlock(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSModuleBlock>;
  isTSModuleBlock<Opts extends Options<t.TSModuleBlock>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSModuleBlock & Opts>;
  isTSModuleDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSModuleDeclaration>;
  isTSModuleDeclaration<Opts extends Options<t.TSModuleDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSModuleDeclaration & Opts>;
  isTSNamedTupleMember(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSNamedTupleMember>;
  isTSNamedTupleMember<Opts extends Options<t.TSNamedTupleMember>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSNamedTupleMember & Opts>;
  isTSNamespaceExportDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSNamespaceExportDeclaration>;
  isTSNamespaceExportDeclaration<
    Opts extends Options<t.TSNamespaceExportDeclaration>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSNamespaceExportDeclaration & Opts>;
  isTSNeverKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSNeverKeyword>;
  isTSNeverKeyword<Opts extends Options<t.TSNeverKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSNeverKeyword & Opts>;
  isTSNonNullExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSNonNullExpression>;
  isTSNonNullExpression<Opts extends Options<t.TSNonNullExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSNonNullExpression & Opts>;
  isTSNullKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSNullKeyword>;
  isTSNullKeyword<Opts extends Options<t.TSNullKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSNullKeyword & Opts>;
  isTSNumberKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSNumberKeyword>;
  isTSNumberKeyword<Opts extends Options<t.TSNumberKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSNumberKeyword & Opts>;
  isTSObjectKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSObjectKeyword>;
  isTSObjectKeyword<Opts extends Options<t.TSObjectKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSObjectKeyword & Opts>;
  isTSOptionalType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSOptionalType>;
  isTSOptionalType<Opts extends Options<t.TSOptionalType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSOptionalType & Opts>;
  isTSParameterProperty(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSParameterProperty>;
  isTSParameterProperty<Opts extends Options<t.TSParameterProperty>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSParameterProperty & Opts>;
  isTSParenthesizedType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSParenthesizedType>;
  isTSParenthesizedType<Opts extends Options<t.TSParenthesizedType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSParenthesizedType & Opts>;
  isTSPropertySignature(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSPropertySignature>;
  isTSPropertySignature<Opts extends Options<t.TSPropertySignature>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSPropertySignature & Opts>;
  isTSQualifiedName(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSQualifiedName>;
  isTSQualifiedName<Opts extends Options<t.TSQualifiedName>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSQualifiedName & Opts>;
  isTSRestType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSRestType>;
  isTSRestType<Opts extends Options<t.TSRestType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSRestType & Opts>;
  isTSSatisfiesExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSSatisfiesExpression>;
  isTSSatisfiesExpression<Opts extends Options<t.TSSatisfiesExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSSatisfiesExpression & Opts>;
  isTSStringKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSStringKeyword>;
  isTSStringKeyword<Opts extends Options<t.TSStringKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSStringKeyword & Opts>;
  isTSSymbolKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSSymbolKeyword>;
  isTSSymbolKeyword<Opts extends Options<t.TSSymbolKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSSymbolKeyword & Opts>;
  isTSTemplateLiteralType(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTemplateLiteralType>;
  isTSTemplateLiteralType<Opts extends Options<t.TSTemplateLiteralType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTemplateLiteralType & Opts>;
  isTSThisType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSThisType>;
  isTSThisType<Opts extends Options<t.TSThisType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSThisType & Opts>;
  isTSTupleType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSTupleType>;
  isTSTupleType<Opts extends Options<t.TSTupleType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTupleType & Opts>;
  isTSType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSType>;
  isTSType<Opts extends Options<t.TSType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSType & Opts>;
  isTSTypeAliasDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeAliasDeclaration>;
  isTSTypeAliasDeclaration<Opts extends Options<t.TSTypeAliasDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeAliasDeclaration & Opts>;
  isTSTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeAnnotation>;
  isTSTypeAnnotation<Opts extends Options<t.TSTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeAnnotation & Opts>;
  isTSTypeAssertion(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeAssertion>;
  isTSTypeAssertion<Opts extends Options<t.TSTypeAssertion>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeAssertion & Opts>;
  isTSTypeElement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeElement>;
  isTSTypeElement<Opts extends Options<t.TSTypeElement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeElement & Opts>;
  isTSTypeLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeLiteral>;
  isTSTypeLiteral<Opts extends Options<t.TSTypeLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeLiteral & Opts>;
  isTSTypeOperator(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeOperator>;
  isTSTypeOperator<Opts extends Options<t.TSTypeOperator>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeOperator & Opts>;
  isTSTypeParameter(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeParameter>;
  isTSTypeParameter<Opts extends Options<t.TSTypeParameter>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeParameter & Opts>;
  isTSTypeParameterDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeParameterDeclaration>;
  isTSTypeParameterDeclaration<
    Opts extends Options<t.TSTypeParameterDeclaration>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeParameterDeclaration & Opts>;
  isTSTypeParameterInstantiation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeParameterInstantiation>;
  isTSTypeParameterInstantiation<
    Opts extends Options<t.TSTypeParameterInstantiation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeParameterInstantiation & Opts>;
  isTSTypePredicate(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypePredicate>;
  isTSTypePredicate<Opts extends Options<t.TSTypePredicate>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypePredicate & Opts>;
  isTSTypeQuery(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSTypeQuery>;
  isTSTypeQuery<Opts extends Options<t.TSTypeQuery>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeQuery & Opts>;
  isTSTypeReference(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSTypeReference>;
  isTSTypeReference<Opts extends Options<t.TSTypeReference>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSTypeReference & Opts>;
  isTSUndefinedKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSUndefinedKeyword>;
  isTSUndefinedKeyword<Opts extends Options<t.TSUndefinedKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSUndefinedKeyword & Opts>;
  isTSUnionType(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TSUnionType>;
  isTSUnionType<Opts extends Options<t.TSUnionType>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSUnionType & Opts>;
  isTSUnknownKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSUnknownKeyword>;
  isTSUnknownKeyword<Opts extends Options<t.TSUnknownKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSUnknownKeyword & Opts>;
  isTSVoidKeyword(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TSVoidKeyword>;
  isTSVoidKeyword<Opts extends Options<t.TSVoidKeyword>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TSVoidKeyword & Opts>;
  isTaggedTemplateExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TaggedTemplateExpression>;
  isTaggedTemplateExpression<Opts extends Options<t.TaggedTemplateExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TaggedTemplateExpression & Opts>;
  isTemplateElement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TemplateElement>;
  isTemplateElement<Opts extends Options<t.TemplateElement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TemplateElement & Opts>;
  isTemplateLiteral(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TemplateLiteral>;
  isTemplateLiteral<Opts extends Options<t.TemplateLiteral>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TemplateLiteral & Opts>;
  isTerminatorless(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.Terminatorless>;
  isTerminatorless<Opts extends Options<t.Terminatorless>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Terminatorless & Opts>;
  isThisExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ThisExpression>;
  isThisExpression<Opts extends Options<t.ThisExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ThisExpression & Opts>;
  isThisTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ThisTypeAnnotation>;
  isThisTypeAnnotation<Opts extends Options<t.ThisTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ThisTypeAnnotation & Opts>;
  isThrowStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.ThrowStatement>;
  isThrowStatement<Opts extends Options<t.ThrowStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.ThrowStatement & Opts>;
  isTopicReference(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TopicReference>;
  isTopicReference<Opts extends Options<t.TopicReference>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TopicReference & Opts>;
  isTryStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TryStatement>;
  isTryStatement<Opts extends Options<t.TryStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TryStatement & Opts>;
  isTupleTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TupleTypeAnnotation>;
  isTupleTypeAnnotation<Opts extends Options<t.TupleTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TupleTypeAnnotation & Opts>;
  isTypeAlias(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TypeAlias>;
  isTypeAlias<Opts extends Options<t.TypeAlias>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeAlias & Opts>;
  isTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TypeAnnotation>;
  isTypeAnnotation<Opts extends Options<t.TypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeAnnotation & Opts>;
  isTypeCastExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TypeCastExpression>;
  isTypeCastExpression<Opts extends Options<t.TypeCastExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeCastExpression & Opts>;
  isTypeParameter(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TypeParameter>;
  isTypeParameter<Opts extends Options<t.TypeParameter>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeParameter & Opts>;
  isTypeParameterDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TypeParameterDeclaration>;
  isTypeParameterDeclaration<Opts extends Options<t.TypeParameterDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeParameterDeclaration & Opts>;
  isTypeParameterInstantiation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TypeParameterInstantiation>;
  isTypeParameterInstantiation<
    Opts extends Options<t.TypeParameterInstantiation>,
  >(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeParameterInstantiation & Opts>;
  isTypeScript(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.TypeScript>;
  isTypeScript<Opts extends Options<t.TypeScript>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeScript & Opts>;
  isTypeofTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.TypeofTypeAnnotation>;
  isTypeofTypeAnnotation<Opts extends Options<t.TypeofTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.TypeofTypeAnnotation & Opts>;
  isUnaryExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.UnaryExpression>;
  isUnaryExpression<Opts extends Options<t.UnaryExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.UnaryExpression & Opts>;
  isUnaryLike(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.UnaryLike>;
  isUnaryLike<Opts extends Options<t.UnaryLike>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.UnaryLike & Opts>;
  isUnionTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.UnionTypeAnnotation>;
  isUnionTypeAnnotation<Opts extends Options<t.UnionTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.UnionTypeAnnotation & Opts>;
  isUpdateExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.UpdateExpression>;
  isUpdateExpression<Opts extends Options<t.UpdateExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.UpdateExpression & Opts>;
  isUserWhitespacable(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.UserWhitespacable>;
  isUserWhitespacable<Opts extends Options<t.UserWhitespacable>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.UserWhitespacable & Opts>;
  isV8IntrinsicIdentifier(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.V8IntrinsicIdentifier>;
  isV8IntrinsicIdentifier<Opts extends Options<t.V8IntrinsicIdentifier>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.V8IntrinsicIdentifier & Opts>;
  isVariableDeclaration(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.VariableDeclaration>;
  isVariableDeclaration<Opts extends Options<t.VariableDeclaration>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.VariableDeclaration & Opts>;
  isVariableDeclarator(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.VariableDeclarator>;
  isVariableDeclarator<Opts extends Options<t.VariableDeclarator>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.VariableDeclarator & Opts>;
  isVariance(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Variance>;
  isVariance<Opts extends Options<t.Variance>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.Variance & Opts>;
  isVoidPattern(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.VoidPattern>;
  isVoidPattern<Opts extends Options<t.VoidPattern>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.VoidPattern & Opts>;
  isVoidTypeAnnotation(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.VoidTypeAnnotation>;
  isVoidTypeAnnotation<Opts extends Options<t.VoidTypeAnnotation>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.VoidTypeAnnotation & Opts>;
  isWhile(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.While>;
  isWhile<Opts extends Options<t.While>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.While & Opts>;
  isWhileStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.WhileStatement>;
  isWhileStatement<Opts extends Options<t.WhileStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.WhileStatement & Opts>;
  isWithStatement(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.WithStatement>;
  isWithStatement<Opts extends Options<t.WithStatement>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.WithStatement & Opts>;
  isYieldExpression(
    this: NodePath_Final<t.Node | null>,
  ): this is NodePath_Final<t.YieldExpression>;
  isYieldExpression<Opts extends Options<t.YieldExpression>>(
    this: NodePath_Final<t.Node | null>,
    opts: Opts,
  ): this is NodePath_Final<t.YieldExpression & Opts>;
}

interface NodePathValidators
  extends
    Omit<BaseNodePathValidators, keyof VirtualTypeNodePathValidators>,
    VirtualTypeNodePathValidators {}

type NodePaths<T extends t.Node | t.Node[]> = T extends t.Node[] ? {
    [K in keyof T]: NodePath_Final<Extract<T[K], t.Node>>;
} : T extends t.Node ? [NodePath_Final<T>] : never;
type NodeListType<N, K extends keyof N> = N[K] extends (infer P extends t.Node)[] ? P : never;
type NodeOrNodeList<T extends t.Node> = T | NodeList<T>;
type NodeList<T extends t.Node> = T[] | [T, ...T[]];
declare const methods: {
    findParent: typeof findParent;
    find: typeof find;
    getFunctionParent: typeof getFunctionParent;
    getStatementParent: typeof getStatementParent;
    getEarliestCommonAncestorFrom: typeof getEarliestCommonAncestorFrom;
    getDeepestCommonAncestorFrom: typeof getDeepestCommonAncestorFrom;
    getAncestry: typeof getAncestry;
    isAncestor: typeof isAncestor;
    isDescendant: typeof isDescendant;
    inType: typeof inType;
    getTypeAnnotation: typeof getTypeAnnotation;
    isBaseType: typeof isBaseType;
    couldBeBaseType: typeof couldBeBaseType;
    baseTypeStrictlyMatches: typeof baseTypeStrictlyMatches;
    isGenericType: typeof isGenericType;
    replaceWithMultiple: typeof replaceWithMultiple;
    replaceWithSourceString: typeof replaceWithSourceString;
    replaceWith: typeof replaceWith;
    replaceExpressionWithStatements: typeof replaceExpressionWithStatements;
    replaceInline: typeof replaceInline;
    evaluateTruthy: typeof evaluateTruthy;
    evaluate: typeof evaluate;
    ensureBlock: typeof ensureBlock;
    unwrapFunctionEnvironment: typeof unwrapFunctionEnvironment;
    arrowFunctionToExpression: typeof arrowFunctionToExpression;
    splitExportDeclaration: typeof splitExportDeclaration;
    ensureFunctionName: typeof ensureFunctionName;
    matchesPattern: typeof matchesPattern;
    isStatic: typeof isStatic;
    isNodeType: typeof isNodeType;
    canHaveVariableDeclarationOrExpression: typeof canHaveVariableDeclarationOrExpression;
    canSwapBetweenExpressionAndStatement: typeof canSwapBetweenExpressionAndStatement;
    isCompletionRecord: typeof isCompletionRecord;
    isStatementOrBlock: typeof isStatementOrBlock;
    referencesImport: typeof referencesImport;
    getSource: typeof getSource;
    willIMaybeExecuteBefore: typeof willIMaybeExecuteBefore;
    _guessExecutionStatusRelativeTo: typeof _guessExecutionStatusRelativeTo;
    resolve: typeof resolve;
    isConstantExpression: typeof isConstantExpression;
    isInStrictMode: typeof isInStrictMode;
    isDenylisted: typeof isDenylisted;
    skip: typeof skip;
    skipKey: typeof skipKey;
    stop: typeof stop;
    setContext: typeof setContext;
    requeue: typeof requeue;
    requeueComputedKeyAndDecorators: typeof requeueComputedKeyAndDecorators;
    remove: typeof remove;
    insertBefore: typeof insertBefore;
    insertAfter: typeof insertAfter;
    unshiftContainer: typeof unshiftContainer;
    pushContainer: typeof pushContainer;
    getOpposite: typeof getOpposite;
    getCompletionRecords: typeof getCompletionRecords;
    getSibling: typeof getSibling;
    getPrevSibling: typeof getPrevSibling;
    getNextSibling: typeof getNextSibling;
    getAllNextSiblings: typeof getAllNextSiblings;
    getAllPrevSiblings: typeof getAllPrevSiblings;
    get: typeof get;
    getAssignmentIdentifiers: typeof getAssignmentIdentifiers;
    getBindingIdentifiers: typeof getBindingIdentifiers;
    getOuterBindingIdentifiers: typeof getOuterBindingIdentifiers;
    getBindingIdentifierPaths: typeof getBindingIdentifierPaths;
    getOuterBindingIdentifierPaths: typeof getOuterBindingIdentifierPaths;
    shareCommentsWithSiblings: typeof shareCommentsWithSiblings;
    addComment: typeof addComment;
    addComments: typeof addComments;
};
interface NodePathOverwrites {
    /**
     * NOTE: This assertion doesn't narrow the type on unions of
     * NodePaths, due to https://github.com/microsoft/TypeScript/issues/44212
     *
     * @see ./conversion.ts for implementation.
     */
    ensureBlock(this: NodePath_Final): asserts this is NodePath_Final<(t.Loop | t.WithStatement | t.Function | t.LabeledStatement | t.CatchClause) & {
        body: t.BlockStatement;
    }>;
    /**
     * @see ./introspection.ts for implementation.
     */
    isStatementOrBlock(this: NodePath_Final<t.Node | null>): this is NodePath_Final<t.Statement | t.Block>;
}
type NodePathMixins = Omit<typeof methods, keyof NodePathOverwrites>;
interface NodePath<N extends t.Node | null, T extends t.Node["type"] | null = N extends null ? null : NonNullable<N>["type"], P extends t.Node = T extends null ? t.Node : NonNullable<t.ParentMaps[NonNullable<T>]>> extends InstanceType<typeof NodePath_Final>, NodePathAssertions, NodePathValidators, NodePathMixins, NodePathOverwrites {
    type: T;
    node: N;
    parent: P;
    parentPath: NodePath_Final<P>;
}
declare const NodePath_Final: {
    new (hub: HubInterface | undefined, parent: t.Node): {
        parent: t.Node;
        hub: HubInterface;
        data: Record<string | symbol, unknown> | null;
        context: TraversalContext;
        scope: Scope;
        contexts: TraversalContext[];
        state: any;
        opts: TraverseOptions & ExplodedVisitor;
        _traverseFlags: number;
        get removed(): boolean;
        set removed(arg: boolean);
        get shouldStop(): boolean;
        set shouldStop(arg: boolean);
        get shouldSkip(): boolean;
        set shouldSkip(arg: boolean);
        skipKeys: Record<string, boolean> | null;
        parentPath: NodePath_Final | null;
        container: t.Node | t.Node[] | null;
        listKey: string | null | undefined;
        key: string | number | null;
        node: t.Node | null;
        type: t.Node["type"] | null;
        _store: Map<t.Node, NodePath_Final> | null;
        getScope(this: NodePath_Final, scope: Scope): Scope;
        setData<T>(key: string | symbol, val: T): T;
        getData(key: string | symbol, def?: any): any;
        hasNode(): boolean;
        buildCodeFrameError(msg: string, Error?: new () => Error): Error;
        traverse<S, T extends object>(this: NodePath_Final, visitor: { [P in keyof T]: VisitorProp<S, P & string>; }, state: S): void;
        traverse<T extends object>(this: NodePath_Final, visitor: { [P in keyof T]: VisitorProp<any, P & string>; }): void;
        traverse<S>(this: NodePath_Final, visitor: TraverseOptions & Visitor<S>, state: S): void;
        traverse(this: NodePath_Final, visitor: TraverseOptions & Visitor<any>): void;
        set(key: string, node: any): void;
        getPathLocation(this: NodePath_Final<t.Node | null>): string;
        debug(this: NodePath_Final<t.Node | null>, message: string): void;
        toString(): string;
        get inList(): boolean;
        set inList(inList: boolean);
        get parentKey(): string;
    };
    get({ hub, parentPath, parent, container, listKey, key, }: {
        hub?: HubInterface;
        parentPath: NodePath_Final | null | undefined;
        parent: t.Node;
        container: t.Node | t.Node[];
        listKey?: string | null;
        key: string | number;
    }): NodePath_Final;
};
type NodePath_Final<T extends t.Node | null = t.Node> = T extends any ? NodePath<T> : never;

declare let pathsCache: WeakMap<Node, Map<Node, NodePath_Final>>;

declare let scope: WeakMap<Node, Scope>;
declare function clear(): void;
declare function clearPath(): void;
declare function clearScope(): void;
declare function getCachedPaths(path: NodePath_Final<Node | null>): Map<Node, NodePath<t.Identifier, "Identifier", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.BreakStatement | t.CallExpression | t.CatchClause | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassImplements | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.ContinueStatement | t.DeclareClass | t.DeclareFunction | t.DeclareInterface | t.DeclareModule | t.DeclareOpaqueType | t.DeclareTypeAlias | t.DeclareVariable | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.EnumDeclaration | t.EnumDefaultedMember | t.EnumNumberMember | t.EnumStringMember | t.ExportDefaultDeclaration | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.FunctionDeclaration | t.FunctionExpression | t.FunctionTypeParam | t.GenericTypeAnnotation | t.IfStatement | t.ImportAttribute | t.ImportDefaultSpecifier | t.ImportExpression | t.ImportNamespaceSpecifier | t.ImportSpecifier | t.InterfaceDeclaration | t.InterfaceExtends | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LabeledStatement | t.LogicalExpression | t.MemberExpression | t.MetaProperty | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.OpaqueType | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.Placeholder | t.PrivateName | t.QualifiedTypeIdentifier | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSCallSignatureDeclaration | t.TSClassImplements | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSEnumDeclaration | t.TSEnumMember | t.TSExportAssignment | t.TSFunctionType | t.TSImportEqualsDeclaration | t.TSImportType | t.TSIndexSignature | t.TSInstantiationExpression | t.TSInterfaceDeclaration | t.TSInterfaceHeritage | t.TSMappedType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNamedTupleMember | t.TSNamespaceExportDeclaration | t.TSNonNullExpression | t.TSParameterProperty | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAliasDeclaration | t.TSTypeAssertion | t.TSTypeParameter | t.TSTypePredicate | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeAlias | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AnyTypeAnnotation, "AnyTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ArgumentPlaceholder, "ArgumentPlaceholder", NonNullable<t.CallExpression | t.NewExpression | t.OptionalCallExpression>> | NodePath<t.ArrayExpression, "ArrayExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ArrayPattern, "ArrayPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.CatchClause | t.ClassMethod | t.ClassPrivateMethod | t.ForInStatement | t.ForOfStatement | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.RestElement | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSMethodSignature | t.VariableDeclarator>> | NodePath<t.ArrayTypeAnnotation, "ArrayTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ArrowFunctionExpression, "ArrowFunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AssignmentExpression, "AssignmentExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.AssignmentPattern, "AssignmentPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.TSDeclareFunction | t.TSDeclareMethod | t.TSParameterProperty>> | NodePath<t.AwaitExpression, "AwaitExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BigIntLiteral, "BigIntLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BigIntLiteralTypeAnnotation, "BigIntLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.BinaryExpressionIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BinaryExpressionNotIn, "BinaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BindExpression, "BindExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BlockStatement, "BlockStatement", NonNullable<t.ArrowFunctionExpression | t.BlockStatement | t.CatchClause | t.ClassMethod | t.ClassPrivateMethod | t.DeclareModule | t.DoExpression | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.FunctionDeclaration | t.FunctionExpression | t.IfStatement | t.LabeledStatement | t.ObjectMethod | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.TryStatement | t.WhileStatement | t.WithStatement>> | NodePath<t.BooleanLiteral, "BooleanLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumBooleanMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.BooleanLiteralTypeAnnotation, "BooleanLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.BooleanTypeAnnotation, "BooleanTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.BreakStatement, "BreakStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.CallExpression, "CallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.CatchClause, "CatchClause", t.TryStatement> | NodePath<t.ClassAccessorPropertyComputed, "ClassAccessorProperty", t.ClassBody> | NodePath<t.ClassAccessorPropertyNonComputed, "ClassAccessorProperty", t.ClassBody> | NodePath<t.ClassBody, "ClassBody", NonNullable<t.ClassDeclaration | t.ClassExpression>> | NodePath<t.ClassDeclaration, "ClassDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ClassExpression, "ClassExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ClassImplements, "ClassImplements", NonNullable<t.ClassDeclaration | t.ClassExpression | t.DeclareClass | t.DeclareExportDeclaration>> | NodePath<t.ClassMethodComputed, "ClassMethod", t.ClassBody> | NodePath<t.ClassMethodNonComputed, "ClassMethod", t.ClassBody> | NodePath<t.ClassPrivateMethod, "ClassPrivateMethod", t.ClassBody> | NodePath<t.ClassPrivateProperty, "ClassPrivateProperty", t.ClassBody> | NodePath<t.ClassPropertyComputed, "ClassProperty", t.ClassBody> | NodePath<t.ClassPropertyNonComputed, "ClassProperty", t.ClassBody> | NodePath<t.ConditionalExpression, "ConditionalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ContinueStatement, "ContinueStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DebuggerStatement, "DebuggerStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareClass, "DeclareClass", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareExportAllDeclaration, "DeclareExportAllDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareExportDeclaration, "DeclareExportDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareFunction, "DeclareFunction", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareInterface, "DeclareInterface", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareModule, "DeclareModule", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareModuleExports, "DeclareModuleExports", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareOpaqueType, "DeclareOpaqueType", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareTypeAlias, "DeclareTypeAlias", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclareVariable, "DeclareVariable", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.DeclaredPredicate, "DeclaredPredicate", NonNullable<t.ArrowFunctionExpression | t.DeclareExportDeclaration | t.DeclareFunction | t.FunctionDeclaration | t.FunctionExpression>> | NodePath<t.Decorator, "Decorator", NonNullable<t.Identifier | t.ArrayPattern | t.AssignmentPattern | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.ObjectMethod | t.ObjectPattern | t.ObjectProperty | t.Placeholder | t.RestElement | t.TSParameterProperty>> | NodePath<t.Directive, "Directive", NonNullable<t.BlockStatement | t.Program>> | NodePath<t.DirectiveLiteral, "DirectiveLiteral", t.Directive> | NodePath<t.DoExpression, "DoExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.DoWhileStatement, "DoWhileStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EmptyStatement, "EmptyStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EmptyTypeAnnotation, "EmptyTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.EnumBooleanBody, "EnumBooleanBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.EnumBooleanMember, "EnumBooleanMember", NonNullable<t.DeclareExportDeclaration | t.EnumBooleanBody>> | NodePath<t.EnumDeclaration, "EnumDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.EnumDefaultedMember, "EnumDefaultedMember", NonNullable<t.DeclareExportDeclaration | t.EnumStringBody | t.EnumSymbolBody>> | NodePath<t.EnumNumberBody, "EnumNumberBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.EnumNumberMember, "EnumNumberMember", NonNullable<t.DeclareExportDeclaration | t.EnumNumberBody>> | NodePath<t.EnumStringBody, "EnumStringBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.EnumStringMember, "EnumStringMember", NonNullable<t.DeclareExportDeclaration | t.EnumStringBody>> | NodePath<t.EnumSymbolBody, "EnumSymbolBody", NonNullable<t.DeclareExportDeclaration | t.EnumDeclaration>> | NodePath<t.ExistsTypeAnnotation, "ExistsTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ExportAllDeclaration, "ExportAllDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportDefaultDeclaration, "ExportDefaultDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportDefaultSpecifier, "ExportDefaultSpecifier", t.ExportNamedDeclaration> | NodePath<t.ExportNamedDeclaration, "ExportNamedDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ExportNamespaceSpecifier, "ExportNamespaceSpecifier", NonNullable<t.DeclareExportDeclaration | t.ExportNamedDeclaration>> | NodePath<t.ExportSpecifier, "ExportSpecifier", NonNullable<t.DeclareExportDeclaration | t.ExportNamedDeclaration>> | NodePath<t.ExpressionStatement, "ExpressionStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.File, "File", never> | NodePath<t.ForInStatement, "ForInStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ForOfStatement, "ForOfStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ForStatement, "ForStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.FunctionDeclaration, "FunctionDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.FunctionExpression, "FunctionExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.FunctionTypeAnnotation, "FunctionTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.FunctionTypeParam, "FunctionTypeParam", NonNullable<t.DeclareExportDeclaration | t.FunctionTypeAnnotation>> | NodePath<t.GenericTypeAnnotation, "GenericTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.IfStatement, "IfStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.Import, "Import", t.CallExpression> | NodePath<t.ImportAttribute, "ImportAttribute", NonNullable<t.DeclareExportAllDeclaration | t.DeclareExportDeclaration | t.ExportAllDeclaration | t.ExportNamedDeclaration | t.ImportDeclaration>> | NodePath<t.ImportDeclaration, "ImportDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.ImportDefaultSpecifier, "ImportDefaultSpecifier", t.ImportDeclaration> | NodePath<t.ImportExpression, "ImportExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ImportNamespaceSpecifier, "ImportNamespaceSpecifier", t.ImportDeclaration> | NodePath<t.ImportSpecifier, "ImportSpecifier", t.ImportDeclaration> | NodePath<t.IndexedAccessType, "IndexedAccessType", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.InferredPredicate, "InferredPredicate", NonNullable<t.ArrowFunctionExpression | t.DeclareExportDeclaration | t.DeclareFunction | t.FunctionDeclaration | t.FunctionExpression>> | NodePath<t.InterfaceDeclaration, "InterfaceDeclaration", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.InterfaceExtends, "InterfaceExtends", NonNullable<t.ClassDeclaration | t.ClassExpression | t.DeclareClass | t.DeclareExportDeclaration | t.DeclareInterface | t.InterfaceDeclaration | t.InterfaceTypeAnnotation>> | NodePath<t.InterfaceTypeAnnotation, "InterfaceTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.InterpreterDirective, "InterpreterDirective", t.Program> | NodePath<t.IntersectionTypeAnnotation, "IntersectionTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.JSXAttribute, "JSXAttribute", t.JSXOpeningElement> | NodePath<t.JSXClosingElement, "JSXClosingElement", t.JSXElement> | NodePath<t.JSXClosingFragment, "JSXClosingFragment", t.JSXFragment> | NodePath<t.JSXElement, "JSXElement", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXEmptyExpression, "JSXEmptyExpression", t.JSXExpressionContainer> | NodePath<t.JSXExpressionContainer, "JSXExpressionContainer", NonNullable<t.JSXAttribute | t.JSXElement | t.JSXFragment>> | NodePath<t.JSXFragment, "JSXFragment", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXAttribute | t.JSXElement | t.JSXExpressionContainer | t.JSXFragment | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.JSXIdentifier, "JSXIdentifier", NonNullable<t.JSXAttribute | t.JSXClosingElement | t.JSXMemberExpression | t.JSXNamespacedName | t.JSXOpeningElement>> | NodePath<t.JSXMemberExpression, "JSXMemberExpression", NonNullable<t.JSXClosingElement | t.JSXMemberExpression | t.JSXOpeningElement>> | NodePath<t.JSXNamespacedName, "JSXNamespacedName", NonNullable<t.JSXAttribute | t.JSXClosingElement | t.JSXOpeningElement>> | NodePath<t.JSXOpeningElement, "JSXOpeningElement", t.JSXElement> | NodePath<t.JSXOpeningFragment, "JSXOpeningFragment", t.JSXFragment> | NodePath<t.JSXSpreadAttribute, "JSXSpreadAttribute", t.JSXOpeningElement> | NodePath<t.JSXSpreadChild, "JSXSpreadChild", NonNullable<t.JSXElement | t.JSXFragment>> | NodePath<t.JSXText, "JSXText", NonNullable<t.JSXElement | t.JSXFragment>> | NodePath<t.LabeledStatement, "LabeledStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.LogicalExpression, "LogicalExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MemberExpressionNonComputed, "MemberExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.UpdateExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MetaProperty, "MetaProperty", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.MixedTypeAnnotation, "MixedTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ModuleExpression, "ModuleExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NewExpression, "NewExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NullLiteral, "NullLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.NullLiteralTypeAnnotation, "NullLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NullableTypeAnnotation, "NullableTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NumberLiteral, "NumberLiteral", never> | NodePath<t.NumberLiteralTypeAnnotation, "NumberLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NumberTypeAnnotation, "NumberTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.NumericLiteral, "NumericLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumNumberMember | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ObjectExpression, "ObjectExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ObjectMethodComputed, "ObjectMethod", t.ObjectExpression> | NodePath<t.ObjectMethodNonComputed, "ObjectMethod", t.ObjectExpression> | NodePath<t.ObjectPattern, "ObjectPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.CatchClause | t.ClassMethod | t.ClassPrivateMethod | t.ForInStatement | t.ForOfStatement | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.RestElement | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSMethodSignature | t.VariableDeclarator>> | NodePath<t.ObjectPropertyComputed, "ObjectProperty", NonNullable<t.ObjectExpression | t.ObjectPattern>> | NodePath<t.ObjectPropertyNonComputed, "ObjectProperty", NonNullable<t.ObjectExpression | t.ObjectPattern>> | NodePath<t.ObjectTypeAnnotation, "ObjectTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareClass | t.DeclareExportDeclaration | t.DeclareInterface | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.InterfaceDeclaration | t.InterfaceTypeAnnotation | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ObjectTypeCallProperty, "ObjectTypeCallProperty", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeIndexer, "ObjectTypeIndexer", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeInternalSlot, "ObjectTypeInternalSlot", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeProperty, "ObjectTypeProperty", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.ObjectTypeSpreadProperty, "ObjectTypeSpreadProperty", NonNullable<t.DeclareExportDeclaration | t.ObjectTypeAnnotation>> | NodePath<t.OpaqueType, "OpaqueType", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.OptionalCallExpression, "OptionalCallExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalIndexedAccessType, "OptionalIndexedAccessType", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.OptionalMemberExpressionComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.OptionalMemberExpressionNonComputed, "OptionalMemberExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ParenthesizedExpression, "ParenthesizedExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.Placeholder, "Placeholder", NonNullable<Node>> | NodePath<t.PrivateName, "PrivateName", NonNullable<t.BinaryExpression | t.ClassAccessorProperty | t.ClassPrivateMethod | t.ClassPrivateProperty | t.MemberExpression | t.ObjectProperty | t.OptionalMemberExpression>> | NodePath<t.Program, "Program", NonNullable<t.File | t.ModuleExpression>> | NodePath<t.QualifiedTypeIdentifier, "QualifiedTypeIdentifier", NonNullable<t.DeclareExportDeclaration | t.GenericTypeAnnotation | t.InterfaceExtends | t.QualifiedTypeIdentifier>> | NodePath<t.RegExpLiteral, "RegExpLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.RegexLiteral, "RegexLiteral", never> | NodePath<t.RestElement, "RestElement", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectPattern | t.ObjectProperty | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSMethodSignature>> | NodePath<t.RestProperty, "RestProperty", never> | NodePath<t.ReturnStatement, "ReturnStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.SequenceExpression, "SequenceExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.SpreadElement, "SpreadElement", NonNullable<t.ArrayExpression | t.CallExpression | t.NewExpression | t.ObjectExpression | t.OptionalCallExpression>> | NodePath<t.SpreadProperty, "SpreadProperty", never> | NodePath<t.StaticBlock, "StaticBlock", t.ClassBody> | NodePath<t.StringLiteral, "StringLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportAllDeclaration | t.DeclareExportDeclaration | t.DeclareModule | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.EnumStringMember | t.ExportAllDeclaration | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ExportNamespaceSpecifier | t.ExportSpecifier | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportAttribute | t.ImportDeclaration | t.ImportExpression | t.ImportSpecifier | t.JSXAttribute | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.ObjectTypeProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSExternalModuleReference | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.StringLiteralTypeAnnotation, "StringLiteralTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.StringTypeAnnotation, "StringTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.Super, "Super", NonNullable<t.CallExpression | t.MemberExpression>> | NodePath<t.SwitchCase, "SwitchCase", t.SwitchStatement> | NodePath<t.SwitchStatement, "SwitchStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.SymbolTypeAnnotation, "SymbolTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.TSAnyKeyword, "TSAnyKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSArrayType, "TSArrayType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSAsExpression, "TSAsExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSBigIntKeyword, "TSBigIntKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSBooleanKeyword, "TSBooleanKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSCallSignatureDeclaration, "TSCallSignatureDeclaration", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSClassImplements, "TSClassImplements", NonNullable<t.ClassDeclaration | t.ClassExpression | t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSConditionalType, "TSConditionalType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSConstructSignatureDeclaration, "TSConstructSignatureDeclaration", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSConstructorType, "TSConstructorType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSDeclareFunction, "TSDeclareFunction", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSDeclareMethodComputed, "TSDeclareMethod", t.ClassBody> | NodePath<t.TSDeclareMethodNonComputed, "TSDeclareMethod", t.ClassBody> | NodePath<t.TSEnumBody, "TSEnumBody", t.TSEnumDeclaration> | NodePath<t.TSEnumDeclaration, "TSEnumDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSEnumMember, "TSEnumMember", t.TSEnumBody> | NodePath<t.TSExportAssignment, "TSExportAssignment", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSExternalModuleReference, "TSExternalModuleReference", t.TSImportEqualsDeclaration> | NodePath<t.TSFunctionType, "TSFunctionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSImportEqualsDeclaration, "TSImportEqualsDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSImportType, "TSImportType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSTypeQuery | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIndexSignature, "TSIndexSignature", NonNullable<t.ClassBody | t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSIndexedAccessType, "TSIndexedAccessType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSInferType, "TSInferType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSInstantiationExpression, "TSInstantiationExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSInterfaceBody, "TSInterfaceBody", t.TSInterfaceDeclaration> | NodePath<t.TSInterfaceDeclaration, "TSInterfaceDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSInterfaceHeritage, "TSInterfaceHeritage", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSInterfaceDeclaration | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIntersectionType, "TSIntersectionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSIntrinsicKeyword, "TSIntrinsicKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSLiteralType, "TSLiteralType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSMappedType, "TSMappedType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSMethodSignature, "TSMethodSignature", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSModuleBlock, "TSModuleBlock", t.TSModuleDeclaration> | NodePath<t.TSModuleDeclaration, "TSModuleDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSNamedTupleMember, "TSNamedTupleMember", t.TSTupleType> | NodePath<t.TSNamespaceExportDeclaration, "TSNamespaceExportDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSNeverKeyword, "TSNeverKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSNonNullExpression, "TSNonNullExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSNullKeyword, "TSNullKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSNumberKeyword, "TSNumberKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSObjectKeyword, "TSObjectKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSOptionalType, "TSOptionalType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSParameterProperty, "TSParameterProperty", NonNullable<t.ClassMethod | t.ClassPrivateMethod | t.TSDeclareMethod>> | NodePath<t.TSParenthesizedType, "TSParenthesizedType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSPropertySignature, "TSPropertySignature", NonNullable<t.TSInterfaceBody | t.TSTypeLiteral>> | NodePath<t.TSQualifiedName, "TSQualifiedName", NonNullable<t.TSImportEqualsDeclaration | t.TSImportType | t.TSModuleDeclaration | t.TSQualifiedName | t.TSTypeQuery | t.TSTypeReference>> | NodePath<t.TSRestType, "TSRestType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSSatisfiesExpression, "TSSatisfiesExpression", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSStringKeyword, "TSStringKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSSymbolKeyword, "TSSymbolKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTemplateLiteralType, "TSTemplateLiteralType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSThisType, "TSThisType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSTypePredicate | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTupleType, "TSTupleType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeAliasDeclaration, "TSTypeAliasDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TSTypeAnnotation, "TSTypeAnnotation", NonNullable<t.Identifier | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentPattern | t.ClassAccessorProperty | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectPattern | t.Placeholder | t.RestElement | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSIndexSignature | t.TSMethodSignature | t.TSPropertySignature | t.TSTypePredicate>> | NodePath<t.TSTypeAssertion, "TSTypeAssertion", NonNullable<t.ArrayExpression | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.RestElement | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TSTypeLiteral, "TSTypeLiteral", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeOperator, "TSTypeOperator", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeParameter, "TSTypeParameter", NonNullable<t.TSInferType | t.TSTypeParameterDeclaration>> | NodePath<t.TSTypeParameterDeclaration, "TSTypeParameterDeclaration", NonNullable<t.ArrowFunctionExpression | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.TSCallSignatureDeclaration | t.TSConstructSignatureDeclaration | t.TSConstructorType | t.TSDeclareFunction | t.TSDeclareMethod | t.TSFunctionType | t.TSInterfaceDeclaration | t.TSMethodSignature | t.TSTypeAliasDeclaration>> | NodePath<t.TSTypeParameterInstantiation, "TSTypeParameterInstantiation", NonNullable<t.CallExpression | t.ClassDeclaration | t.ClassExpression | t.JSXOpeningElement | t.NewExpression | t.OptionalCallExpression | t.TSClassImplements | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression>> | NodePath<t.TSTypePredicate, "TSTypePredicate", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeQuery, "TSTypeQuery", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSTypeReference, "TSTypeReference", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUndefinedKeyword, "TSUndefinedKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUnionType, "TSUnionType", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSUnknownKeyword, "TSUnknownKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TSVoidKeyword, "TSVoidKeyword", NonNullable<t.TSArrayType | t.TSAsExpression | t.TSConditionalType | t.TSIndexedAccessType | t.TSIntersectionType | t.TSMappedType | t.TSNamedTupleMember | t.TSOptionalType | t.TSParenthesizedType | t.TSRestType | t.TSSatisfiesExpression | t.TSTemplateLiteralType | t.TSTupleType | t.TSTypeAliasDeclaration | t.TSTypeAnnotation | t.TSTypeAssertion | t.TSTypeOperator | t.TSTypeParameter | t.TSTypeParameterInstantiation | t.TSUnionType | t.TemplateLiteral>> | NodePath<t.TaggedTemplateExpression, "TaggedTemplateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TemplateElement, "TemplateElement", NonNullable<t.TSTemplateLiteralType | t.TemplateLiteral>> | NodePath<t.TemplateLiteral, "TemplateLiteral", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ThisExpression, "ThisExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSImportEqualsDeclaration | t.TSImportType | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSModuleDeclaration | t.TSNonNullExpression | t.TSPropertySignature | t.TSQualifiedName | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TSTypeQuery | t.TSTypeReference | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.ThisTypeAnnotation, "ThisTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.ThrowStatement, "ThrowStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TopicReference, "TopicReference", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TryStatement, "TryStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TupleTypeAnnotation, "TupleTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.TypeAlias, "TypeAlias", NonNullable<t.BlockStatement | t.DeclareExportDeclaration | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.TypeAnnotation, "TypeAnnotation", NonNullable<t.Identifier | t.ArrayPattern | t.ArrowFunctionExpression | t.AssignmentPattern | t.ClassAccessorProperty | t.ClassMethod | t.ClassPrivateMethod | t.ClassPrivateProperty | t.ClassProperty | t.DeclareExportDeclaration | t.DeclareModuleExports | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectPattern | t.Placeholder | t.RestElement | t.TypeCastExpression | t.TypeParameter>> | NodePath<t.TypeCastExpression, "TypeCastExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclareExportDeclaration | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.TypeParameter, "TypeParameter", NonNullable<t.DeclareExportDeclaration | t.TypeParameterDeclaration>> | NodePath<t.TypeParameterDeclaration, "TypeParameterDeclaration", NonNullable<t.ArrowFunctionExpression | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateMethod | t.DeclareClass | t.DeclareExportDeclaration | t.DeclareInterface | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionDeclaration | t.FunctionExpression | t.FunctionTypeAnnotation | t.InterfaceDeclaration | t.ObjectMethod | t.OpaqueType | t.TypeAlias>> | NodePath<t.TypeParameterInstantiation, "TypeParameterInstantiation", NonNullable<t.CallExpression | t.ClassDeclaration | t.ClassExpression | t.ClassImplements | t.DeclareExportDeclaration | t.GenericTypeAnnotation | t.InterfaceExtends | t.JSXOpeningElement | t.NewExpression | t.OptionalCallExpression | t.TaggedTemplateExpression>> | NodePath<t.TypeofTypeAnnotation, "TypeofTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.UnaryExpression, "UnaryExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSLiteralType | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.UnionTypeAnnotation, "UnionTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.UpdateExpression, "UpdateExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>> | NodePath<t.V8IntrinsicIdentifier, "V8IntrinsicIdentifier", t.CallExpression> | NodePath<t.VariableDeclaration, "VariableDeclaration", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ExportNamedDeclaration | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.VariableDeclarator, "VariableDeclarator", t.VariableDeclaration> | NodePath<t.Variance, "Variance", NonNullable<t.ClassAccessorProperty | t.ClassPrivateProperty | t.ClassProperty | t.DeclareExportDeclaration | t.ObjectTypeIndexer | t.ObjectTypeProperty | t.TypeParameter>> | NodePath<t.VoidPattern, "VoidPattern", NonNullable<t.ArrayPattern | t.ArrowFunctionExpression | t.ClassMethod | t.ClassPrivateMethod | t.FunctionDeclaration | t.FunctionExpression | t.ObjectMethod | t.ObjectProperty | t.TSDeclareFunction | t.TSDeclareMethod | t.VariableDeclarator>> | NodePath<t.VoidTypeAnnotation, "VoidTypeAnnotation", NonNullable<t.ArrayTypeAnnotation | t.DeclareExportDeclaration | t.DeclareOpaqueType | t.DeclareTypeAlias | t.FunctionTypeAnnotation | t.FunctionTypeParam | t.IndexedAccessType | t.IntersectionTypeAnnotation | t.NullableTypeAnnotation | t.ObjectTypeCallProperty | t.ObjectTypeIndexer | t.ObjectTypeInternalSlot | t.ObjectTypeProperty | t.ObjectTypeSpreadProperty | t.OpaqueType | t.OptionalIndexedAccessType | t.TupleTypeAnnotation | t.TypeAlias | t.TypeAnnotation | t.TypeParameter | t.TypeParameterInstantiation | t.TypeofTypeAnnotation | t.UnionTypeAnnotation>> | NodePath<t.WhileStatement, "WhileStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.WithStatement, "WithStatement", NonNullable<t.BlockStatement | t.DoWhileStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.LabeledStatement | t.Program | t.StaticBlock | t.SwitchCase | t.TSModuleBlock | t.WhileStatement | t.WithStatement>> | NodePath<t.YieldExpression, "YieldExpression", NonNullable<t.ArrayExpression | t.ArrowFunctionExpression | t.AssignmentExpression | t.AssignmentPattern | t.AwaitExpression | t.BinaryExpression | t.BindExpression | t.CallExpression | t.ClassAccessorProperty | t.ClassDeclaration | t.ClassExpression | t.ClassMethod | t.ClassPrivateProperty | t.ClassProperty | t.ConditionalExpression | t.DeclaredPredicate | t.Decorator | t.DoWhileStatement | t.ExportDefaultDeclaration | t.ExpressionStatement | t.ForInStatement | t.ForOfStatement | t.ForStatement | t.IfStatement | t.ImportExpression | t.JSXExpressionContainer | t.JSXSpreadAttribute | t.JSXSpreadChild | t.LogicalExpression | t.MemberExpression | t.NewExpression | t.ObjectMethod | t.ObjectProperty | t.OptionalCallExpression | t.OptionalMemberExpression | t.ParenthesizedExpression | t.ReturnStatement | t.SequenceExpression | t.SpreadElement | t.SwitchCase | t.SwitchStatement | t.TSAsExpression | t.TSClassImplements | t.TSDeclareMethod | t.TSEnumMember | t.TSExportAssignment | t.TSInstantiationExpression | t.TSInterfaceHeritage | t.TSMethodSignature | t.TSNonNullExpression | t.TSPropertySignature | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TaggedTemplateExpression | t.TemplateLiteral | t.ThrowStatement | t.TypeCastExpression | t.UnaryExpression | t.VariableDeclarator | t.WhileStatement | t.WithStatement | t.YieldExpression>>> | null | undefined;
declare function getOrCreateCachedPaths(node: Node, parentPath?: NodePath_Final | null): Map<any, any>;

declare const __cache_ts_clear: typeof clear;
declare const __cache_ts_clearPath: typeof clearPath;
declare const __cache_ts_clearScope: typeof clearScope;
declare const __cache_ts_getCachedPaths: typeof getCachedPaths;
declare const __cache_ts_getOrCreateCachedPaths: typeof getOrCreateCachedPaths;
declare const __cache_ts_scope: typeof scope;
declare namespace __cache_ts {
  export { __cache_ts_clear as clear, __cache_ts_clearPath as clearPath, __cache_ts_clearScope as clearScope, __cache_ts_getCachedPaths as getCachedPaths, __cache_ts_getOrCreateCachedPaths as getOrCreateCachedPaths, pathsCache as path, __cache_ts_scope as scope };
}

type VisitWrapper<S = any> = (stateName: string | undefined, visitorType: VisitPhase, callback: VisitNodeFunction<S, Node>) => VisitNodeFunction<S, Node>;
declare function isExplodedVisitor(visitor: Visitor<any>): visitor is ExplodedVisitor;

/**
 * explode() will take a visitor object with all of the various shorthands
 * that we support, and validates & normalizes it into a common format, ready
 * to be used in traversal
 *
 * The various shorthands are:
 * * `Identifier() { ... }` -> `Identifier: { enter() { ... } }`
 * * `"Identifier|NumericLiteral": { ... }` -> `Identifier: { ... }, NumericLiteral: { ... }`
 * * Aliases in `@babel/types`: e.g. `Property: { ... }` -> `ObjectProperty: { ... }, ClassProperty: { ... }`
 * Other normalizations are:
 * * Visitors of virtual types are wrapped, so that they are only visited when
 *   their dynamic check passes
 * * `enter` and `exit` functions are wrapped in arrays, to ease merging of
 *   visitors
 */
declare function explode$1<S, T extends object>(visitor: {
    [P in keyof T]: VisitorProp<S, P & string>;
}): ExplodedVisitor<S>;
declare function explode$1<S>(visitor: Visitor<S>): ExplodedVisitor<S>;

declare function verify$1(visitor: Visitor<any>): void;
declare function merge<State>(visitors: Visitor<State>[]): ExplodedVisitor<State>;
declare function merge<State>(visitors: Visitor<State>[], states?: State[], wrapper?: VisitWrapper<State> | null): ExplodedVisitor<State>;
declare function environmentVisitor<S>(visitor: Visitor<S>): ExplodedVisitor<S>;

type __visitors_ts_VisitWrapper<S = any> = VisitWrapper<S>;
declare const __visitors_ts_environmentVisitor: typeof environmentVisitor;
declare const __visitors_ts_isExplodedVisitor: typeof isExplodedVisitor;
declare const __visitors_ts_merge: typeof merge;
declare namespace __visitors_ts {
  export { type __visitors_ts_VisitWrapper as VisitWrapper, __visitors_ts_environmentVisitor as environmentVisitor, explode$1 as explode, __visitors_ts_isExplodedVisitor as isExplodedVisitor, __visitors_ts_merge as merge, verify$1 as verify };
}

declare function traverse<S, T extends object>(parent: t.Node, opts: {
    [P in keyof T]: VisitorProp<S, P & string>;
}, scope: Scope | null | undefined, state: S, parentPath?: NodePath_Final, visitSelf?: boolean): void;
declare function traverse<T extends object>(parent: t.Node, opts: {
    [P in keyof T]: VisitorProp<any, P & string>;
}, scope?: Scope | null, state?: any, parentPath?: NodePath_Final, visitSelf?: boolean): void;
declare function traverse<S>(parent: t.Node, opts: TraverseOptions & Visitor<S>, scope: Scope | null | undefined, state: S, parentPath?: NodePath_Final, visitSelf?: boolean): void;
declare function traverse(parent: t.Node, opts: TraverseOptions & Visitor<any>, scope?: Scope | null, state?: any, parentPath?: NodePath_Final, visitSelf?: boolean): void;
declare namespace traverse {
    var visitors: typeof __visitors_ts;
    var verify: typeof verify$1;
    var explode: typeof explode$1;
    var cheap: (node: t.Node, enter: (node: t.Node) => void) => void;
    var node: (node: t.Node, opts: TraverseOptions & ExplodedVisitor, scope?: Scope, state?: any, path?: NodePath_Final, skipKeys?: Record<string, boolean>) => void;
    var clearNode: (node: t.Node, opts?: RemovePropertiesOptions) => void;
    var removeProperties: (tree: t.Node, opts?: RemovePropertiesOptions) => t.Node;
    var hasType: (tree: t.Node, type: t.Node["type"], denylistTypes?: string[]) => boolean;
    var cache: typeof __cache_ts;
}
//# sourceMappingURL=index.d.ts.map

export { Binding, type BindingKind, type ExplodedVisitor, Hub, type HubInterface, NodePath_Final as NodePath, Scope, type TraverseOptions, type VisitWrapper, type Visitor, type VisitorBase, traverse as default, __visitors_ts as visitors };
