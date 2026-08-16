import { types, NodePath as NodePath$1 } from '@babel/core';
export { isModule } from '@babel/helper-module-imports';
import { NodePath } from '@babel/traverse';

declare function rewriteThis(programPath: NodePath): void;

interface ModuleMetadata {
    exportName: string;
    exportNameListName: null | string;
    hasExports: boolean;
    local: Map<string, LocalExportMetadata>;
    source: Map<string, SourceModuleMetadata>;
    stringSpecifiers: Set<string>;
}
type InteropType = "default" | "namespace" | "node-default" | "node-namespace" | "none";
type ImportInterop = "none" | "babel" | "node" | ((source: string, filename?: string) => "none" | "babel" | "node");
interface SourceModuleMetadata {
    name: string;
    loc: types.SourceLocation | undefined | null;
    interop: InteropType;
    imports: Map<string, string>;
    importsNamespace: Set<string>;
    reexports: Map<string, string>;
    reexportNamespace: Set<string>;
    reexportAll: null | {
        loc: types.SourceLocation | undefined | null;
    };
    wrap?: unknown;
    referenced: boolean;
}
interface LocalExportMetadata {
    names: string[];
    kind: "import" | "hoisted" | "block" | "var";
}
/**
 * Check if the module has any exports that need handling.
 */
declare function hasExports(metadata: ModuleMetadata): boolean;
/**
 * Check if a given source is an anonymous import, e.g. "import 'foo';"
 */
declare function isSideEffectImport(source: SourceModuleMetadata): boolean;

type Lazy = boolean | string[] | ((source: string) => boolean);

declare function buildDynamicImport(node: types.CallExpression | types.ImportExpression, deferToThen: boolean, wrapWithPromise: boolean, builder: (specifier: types.Expression) => types.Expression): types.Expression;

type RootOptions = {
    filename?: string;
    filenameRelative?: string;
    sourceRoot?: string;
};
type PluginOptions = {
    moduleId?: string;
    moduleIds?: boolean;
    getModuleId?: (moduleName: string) => string | null | undefined;
    moduleRoot?: string;
};
declare function getModuleName(rootOpts: RootOptions, pluginOpts: PluginOptions): string | null;

interface RewriteModuleStatementsAndPrepareHeaderOptions {
    exportName?: string;
    strict?: boolean;
    allowTopLevelThis?: boolean;
    strictMode?: boolean;
    loose?: boolean;
    importInterop?: ImportInterop;
    noInterop?: boolean;
    lazy?: Lazy;
    getWrapperPayload?: (source: string, metadata: SourceModuleMetadata, importNodes: types.Node[]) => unknown;
    wrapReference?: (ref: types.Expression, payload: unknown) => types.Expression | null;
    esNamespaceOnly?: boolean;
    filename: string | undefined;
    constantReexports?: boolean | void;
    enumerableModuleMeta?: boolean | void;
    noIncompleteNsImportDetection?: boolean | void;
}
/**
 * Perform all of the generic ES6 module rewriting needed to handle initial
 * module processing. This function will rewrite the majority of the given
 * program to reference the modules described by the returned metadata,
 * and returns a list of statements for use when initializing the module.
 */
declare function rewriteModuleStatementsAndPrepareHeader(path: NodePath$1<types.Program>, { exportName, strict, allowTopLevelThis, strictMode, noInterop, importInterop, lazy, getWrapperPayload, wrapReference, esNamespaceOnly, filename, constantReexports, enumerableModuleMeta, noIncompleteNsImportDetection, }: RewriteModuleStatementsAndPrepareHeaderOptions): {
    meta: ModuleMetadata;
    headers: (types.BlockStatement | types.BreakStatement | types.ClassDeclaration | types.ContinueStatement | types.DebuggerStatement | types.DeclareClass | types.DeclareExportAllDeclaration | types.DeclareExportDeclaration | types.DeclareFunction | types.DeclareInterface | types.DeclareModule | types.DeclareModuleExports | types.DeclareOpaqueType | types.DeclareTypeAlias | types.DeclareVariable | types.DoWhileStatement | types.EmptyStatement | types.EnumDeclaration | types.ExportAllDeclaration | types.ExportDefaultDeclaration | types.ExportNamedDeclaration | types.ExpressionStatement | types.ForInStatement | types.ForOfStatement | types.ForStatement | types.FunctionDeclaration | types.IfStatement | types.ImportDeclaration | types.InterfaceDeclaration | types.LabeledStatement | types.OpaqueType | types.ReturnStatement | types.SwitchStatement | types.TSDeclareFunction | types.TSEnumDeclaration | types.TSExportAssignment | types.TSImportEqualsDeclaration | types.TSInterfaceDeclaration | types.TSModuleDeclaration | types.TSNamespaceExportDeclaration | types.TSTypeAliasDeclaration | types.ThrowStatement | types.TryStatement | types.TypeAlias | types.VariableDeclaration | types.WhileStatement | types.WithStatement)[];
};
/**
 * Flag a set of statements as hoisted above all else so that module init
 * statements all run before user code.
 */
declare function ensureStatementsHoisted(statements: types.Statement[]): void;
/**
 * Given an expression for a standard import object, like "require('foo')",
 * wrap it in a call to the interop helpers based on the type.
 */
declare function wrapInterop(programPath: NodePath$1<types.Program>, expr: types.Expression, type: InteropType): types.CallExpression | null;
/**
 * Create the runtime initialization statements for a given requested source.
 * These will initialize all of the runtime import/export logic that
 * can't be handled statically by the statements created by
 * buildExportInitializationStatements().
 */
declare function buildNamespaceInitStatements(metadata: ModuleMetadata, sourceMetadata: SourceModuleMetadata, constantReexports?: boolean | void, wrapReference?: (ref: types.Identifier, payload: unknown) => types.Expression | null): (types.BlockStatement | types.BreakStatement | types.ClassDeclaration | types.ContinueStatement | types.DebuggerStatement | types.DeclareClass | types.DeclareExportAllDeclaration | types.DeclareExportDeclaration | types.DeclareFunction | types.DeclareInterface | types.DeclareModule | types.DeclareModuleExports | types.DeclareOpaqueType | types.DeclareTypeAlias | types.DeclareVariable | types.DoWhileStatement | types.EmptyStatement | types.EnumDeclaration | types.ExportAllDeclaration | types.ExportDefaultDeclaration | types.ExportNamedDeclaration | types.ExpressionStatement | types.ForInStatement | types.ForOfStatement | types.ForStatement | types.FunctionDeclaration | types.IfStatement | types.ImportDeclaration | types.InterfaceDeclaration | types.LabeledStatement | types.OpaqueType | types.ReturnStatement | types.SwitchStatement | types.TSDeclareFunction | types.TSEnumDeclaration | types.TSExportAssignment | types.TSImportEqualsDeclaration | types.TSInterfaceDeclaration | types.TSModuleDeclaration | types.TSNamespaceExportDeclaration | types.TSTypeAliasDeclaration | types.ThrowStatement | types.TryStatement | types.TypeAlias | types.VariableDeclaration | types.WhileStatement | types.WithStatement)[];

export { type PluginOptions, type RewriteModuleStatementsAndPrepareHeaderOptions, buildDynamicImport, buildNamespaceInitStatements, ensureStatementsHoisted, getModuleName, hasExports, isSideEffectImport, rewriteModuleStatementsAndPrepareHeader, rewriteThis, wrapInterop };
