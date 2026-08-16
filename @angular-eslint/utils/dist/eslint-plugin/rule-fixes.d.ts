import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
export declare function getImportAddFix({ compatibleWithTypeOnlyImport, fixer, importName, moduleName, node, }: {
    compatibleWithTypeOnlyImport?: boolean;
    fixer: TSESLint.RuleFixer;
    importName: string;
    moduleName: string;
    node: TSESTree.Node;
}): TSESLint.RuleFix | undefined;
export declare function getImportRemoveFix(sourceCode: Readonly<TSESLint.SourceCode>, importDeclarations: readonly TSESTree.ImportDeclaration[], importName: string, fixer: TSESLint.RuleFixer): TSESLint.RuleFix | undefined;
/**
 * Migrates a named import from `fromName` to `toName` for the given module:
 * renames the specifier in place when possible, otherwise adds `toName` and
 * removes `fromName` once it is no longer used.
 */
export declare function getImportReplaceFix({ fixer, fromName, moduleName, node, sourceCode, toName, }: {
    fixer: TSESLint.RuleFixer;
    fromName: string;
    moduleName: string;
    node: TSESTree.Node;
    sourceCode: Readonly<TSESLint.SourceCode>;
    toName: string;
}): (TSESLint.RuleFix | undefined)[];
export declare function getImplementsSchemaFixer({ id, superClass, implements: classImplements, typeParameters, }: TSESTree.ClassDeclaration, interfaceName: string): {
    readonly implementsNodeReplace: TSESTree.TSClassImplements | TSESTree.Identifier | TSESTree.TSTypeParameterDeclaration;
    readonly implementsTextReplace: string;
};
export declare function getDecoratorPropertyAddFix({ expression }: TSESTree.Decorator, fixer: TSESLint.RuleFixer, text: string): TSESLint.RuleFix | undefined;
export declare function getImplementsRemoveFix(sourceCode: Readonly<TSESLint.SourceCode>, classDeclaration: TSESTree.ClassDeclaration, interfaceName: string, fixer: TSESLint.RuleFixer): TSESLint.RuleFix | undefined;
/**
 * Removes an element of a comma-separated list (object property, array element,
 * call argument) along with its own trailing comma and surrounding whitespace.
 * The preceding comma is kept so an existing trailing-comma style is preserved.
 */
export declare function getNodeToCommaRemoveFix(sourceCode: Readonly<TSESLint.SourceCode>, node: TSESTree.Node, fixer: TSESLint.RuleFixer): TSESLint.RuleFix;
//# sourceMappingURL=rule-fixes.d.ts.map