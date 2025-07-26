"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
exports.default = default_1;
const ts = __importStar(require("../../third_party/github.com/Microsoft/TypeScript/lib/typescript"));
const dependencies_1 = require("../../utility/dependencies");
const latest_versions_1 = require("../../utility/latest-versions");
function* visit(directory) {
    for (const path of directory.subfiles) {
        if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
            const entry = directory.file(path);
            if (entry) {
                const content = entry.content;
                if (content.includes('provideServerRendering') &&
                    content.includes('@angular/platform-server')) {
                    // Only need to rename the import so we can just string replacements.
                    yield [entry.path, content.toString()];
                }
            }
        }
    }
    for (const path of directory.subdirs) {
        if (path === 'node_modules' || path.startsWith('.')) {
            continue;
        }
        yield* visit(directory.dir(path));
    }
}
function default_1() {
    return async (tree) => {
        let angularSSRAdded = false;
        for (const [filePath, content] of visit(tree.root)) {
            let updatedContent = content;
            const ssrImports = new Set();
            const platformServerImports = new Set();
            const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
            sourceFile.forEachChild((node) => {
                if (ts.isImportDeclaration(node)) {
                    const moduleSpecifier = node.moduleSpecifier.getText(sourceFile);
                    if (moduleSpecifier.includes('@angular/platform-server')) {
                        const importClause = node.importClause;
                        if (importClause &&
                            importClause.namedBindings &&
                            ts.isNamedImports(importClause.namedBindings)) {
                            const namedImports = importClause.namedBindings.elements.map((e) => e.getText(sourceFile));
                            namedImports.forEach((importName) => {
                                if (importName === 'provideServerRendering') {
                                    ssrImports.add(importName);
                                }
                                else {
                                    platformServerImports.add(importName);
                                }
                            });
                        }
                        updatedContent = updatedContent.replace(node.getFullText(sourceFile), '');
                    }
                    else if (moduleSpecifier.includes('@angular/ssr')) {
                        const importClause = node.importClause;
                        if (importClause &&
                            importClause.namedBindings &&
                            ts.isNamedImports(importClause.namedBindings)) {
                            importClause.namedBindings.elements.forEach((e) => {
                                ssrImports.add(e.getText(sourceFile));
                            });
                        }
                        updatedContent = updatedContent.replace(node.getFullText(sourceFile), '');
                    }
                }
            });
            if (platformServerImports.size > 0) {
                updatedContent =
                    `import { ${Array.from(platformServerImports).sort().join(', ')} } from '@angular/platform-server';\n` +
                        updatedContent;
            }
            if (ssrImports.size > 0) {
                updatedContent =
                    `import { ${Array.from(ssrImports).sort().join(', ')} } from '@angular/ssr';\n` +
                        updatedContent;
            }
            if (content !== updatedContent) {
                tree.overwrite(filePath, updatedContent);
                if (!angularSSRAdded) {
                    (0, dependencies_1.addPackageJsonDependency)(tree, {
                        name: '@angular/ssr',
                        version: latest_versions_1.latestVersions.AngularSSR,
                        type: dependencies_1.NodeDependencyType.Default,
                        overwrite: false,
                    });
                    angularSSRAdded = true;
                }
            }
        }
    };
}
