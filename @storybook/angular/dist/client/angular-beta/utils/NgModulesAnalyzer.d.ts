/**
 * Avoid component redeclaration
 *
 * Checks recursively if the component has already been declared in all import Module
 */
export declare const isComponentAlreadyDeclared: (componentToFind: any, moduleDeclarations: any[], moduleImports: any[]) => boolean;
