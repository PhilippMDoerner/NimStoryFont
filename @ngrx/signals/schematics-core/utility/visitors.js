"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitTSSourceFiles = visitTSSourceFiles;
exports.visitTemplates = visitTemplates;
exports.visitNgModuleImports = visitNgModuleImports;
exports.visitNgModuleExports = visitNgModuleExports;
exports.visitComponents = visitComponents;
exports.visitNgModules = visitNgModules;
exports.visitDecorator = visitDecorator;
exports.visitImportDeclaration = visitImportDeclaration;
exports.visitImportSpecifier = visitImportSpecifier;
exports.visitTypeReference = visitTypeReference;
exports.visitTypeLiteral = visitTypeLiteral;
exports.visitCallExpression = visitCallExpression;
const ts = __importStar(require("typescript"));
const core_1 = require("@angular-devkit/core");
function visitTSSourceFiles(tree, visitor) {
    let result = undefined;
    for (const sourceFile of visit(tree.root)) {
        result = visitor(sourceFile, tree, result);
    }
    return result;
}
function visitTemplates(tree, visitor) {
    visitTSSourceFiles(tree, (source) => {
        visitComponents(source, (_, decoratorExpressionNode) => {
            ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
                if (ts.isPropertyAssignment(n) && ts.isIdentifier(n.name)) {
                    if (n.name.text === 'template' &&
                        ts.isStringLiteralLike(n.initializer)) {
                        // Need to add an offset of one to the start because the template quotes are
                        // not part of the template content.
                        const templateStartIdx = n.initializer.getStart() + 1;
                        visitor({
                            fileName: source.fileName,
                            content: n.initializer.text,
                            inline: true,
                            start: templateStartIdx,
                        }, tree);
                        return;
                    }
                    else if (n.name.text === 'templateUrl' &&
                        ts.isStringLiteralLike(n.initializer)) {
                        const parts = (0, core_1.normalize)(source.fileName).split('/').slice(0, -1);
                        const templatePath = (0, core_1.resolve)((0, core_1.normalize)(parts.join('/')), (0, core_1.normalize)(n.initializer.text));
                        if (!tree.exists(templatePath)) {
                            return;
                        }
                        const fileContent = tree.read(templatePath);
                        if (!fileContent) {
                            return;
                        }
                        visitor({
                            fileName: templatePath,
                            content: fileContent.toString(),
                            inline: false,
                            start: 0,
                        }, tree);
                        return;
                    }
                }
                ts.forEachChild(n, findTemplates);
            });
        });
    });
}
function visitNgModuleImports(sourceFile, callback) {
    visitNgModuleProperty(sourceFile, callback, 'imports');
}
function visitNgModuleExports(sourceFile, callback) {
    visitNgModuleProperty(sourceFile, callback, 'exports');
}
function visitNgModuleProperty(sourceFile, callback, property) {
    visitNgModules(sourceFile, (_, decoratorExpressionNode) => {
        ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
            if (ts.isPropertyAssignment(n) &&
                ts.isIdentifier(n.name) &&
                n.name.text === property &&
                ts.isArrayLiteralExpression(n.initializer)) {
                callback(n, n.initializer.elements);
                return;
            }
            ts.forEachChild(n, findTemplates);
        });
    });
}
function visitComponents(sourceFile, callback) {
    visitDecorator(sourceFile, 'Component', callback);
}
function visitNgModules(sourceFile, callback) {
    visitDecorator(sourceFile, 'NgModule', callback);
}
function visitDecorator(sourceFile, decoratorName, callback) {
    ts.forEachChild(sourceFile, function findClassDeclaration(node) {
        if (!ts.isClassDeclaration(node)) {
            ts.forEachChild(node, findClassDeclaration);
        }
        const classDeclarationNode = node;
        const decorators = ts.getDecorators(classDeclarationNode);
        if (!decorators || !decorators.length) {
            return;
        }
        const componentDecorator = decorators.find((d) => {
            return (ts.isCallExpression(d.expression) &&
                ts.isIdentifier(d.expression.expression) &&
                d.expression.expression.text === decoratorName);
        });
        if (!componentDecorator) {
            return;
        }
        const { expression } = componentDecorator;
        if (!ts.isCallExpression(expression)) {
            return;
        }
        const [arg] = expression.arguments;
        if (!arg || !ts.isObjectLiteralExpression(arg)) {
            return;
        }
        callback(classDeclarationNode, arg);
    });
}
function visitImportDeclaration(node, callback) {
    if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier.getText();
        const moduleName = moduleSpecifier.replaceAll('"', '').replaceAll("'", '');
        callback(node, moduleName);
    }
    ts.forEachChild(node, (child) => {
        visitImportDeclaration(child, callback);
    });
}
function visitImportSpecifier(node, callback) {
    const { importClause } = node;
    if (!importClause) {
        return;
    }
    const importClauseChildren = importClause.getChildren();
    for (const namedImport of importClauseChildren) {
        if (ts.isNamedImports(namedImport)) {
            const namedImportChildren = namedImport.elements;
            for (const importSpecifier of namedImportChildren) {
                if (ts.isImportSpecifier(importSpecifier)) {
                    callback(importSpecifier);
                }
            }
        }
    }
}
function visitTypeReference(node, callback) {
    if (ts.isTypeReferenceNode(node)) {
        callback(node);
    }
    ts.forEachChild(node, (child) => {
        visitTypeReference(child, callback);
    });
}
function visitTypeLiteral(node, callback) {
    if (ts.isTypeLiteralNode(node)) {
        callback(node);
    }
    ts.forEachChild(node, (child) => {
        visitTypeLiteral(child, callback);
    });
}
function visitCallExpression(node, callback) {
    if (ts.isCallExpression(node)) {
        callback(node);
    }
    ts.forEachChild(node, (child) => {
        visitCallExpression(child, callback);
    });
}
function* visit(directory) {
    for (const path of directory.subfiles) {
        if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
            const entry = directory.file(path);
            if (entry) {
                const content = entry.content;
                const source = ts.createSourceFile(entry.path, content.toString().replace(/^\uFEFF/, ''), ts.ScriptTarget.Latest, true);
                yield source;
            }
        }
    }
    for (const path of directory.subdirs) {
        if (path === 'node_modules') {
            continue;
        }
        yield* visit(directory.dir(path));
    }
}
//# sourceMappingURL=visitors.js.map