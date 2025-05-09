"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComponentAlreadyDeclared = void 0;
const core_1 = require("@angular/core");
const reflectionCapabilities = new core_1.ɵReflectionCapabilities();
/**
 * Avoid component redeclaration
 *
 * Checks recursively if the component has already been declared in all import Module
 */
const isComponentAlreadyDeclared = (componentToFind, moduleDeclarations, moduleImports) => {
    if (moduleDeclarations &&
        moduleDeclarations.flat().some((declaration) => declaration === componentToFind)) {
        // Found component in declarations array
        return true;
    }
    if (!moduleImports) {
        return false;
    }
    return moduleImports.flat().some((importItem) => {
        const extractedNgModuleMetadata = extractNgModuleMetadata(importItem);
        if (!extractedNgModuleMetadata) {
            // Not an NgModule
            return false;
        }
        return (0, exports.isComponentAlreadyDeclared)(componentToFind, extractedNgModuleMetadata.declarations, extractedNgModuleMetadata.imports);
    });
};
exports.isComponentAlreadyDeclared = isComponentAlreadyDeclared;
const extractNgModuleMetadata = (importItem) => {
    const target = importItem && importItem.ngModule ? importItem.ngModule : importItem;
    const decorators = reflectionCapabilities.annotations(target);
    if (!decorators || decorators.length === 0) {
        return null;
    }
    const ngModuleDecorator = decorators.find((decorator) => decorator instanceof core_1.NgModule);
    if (!ngModuleDecorator) {
        return null;
    }
    return ngModuleDecorator;
};
