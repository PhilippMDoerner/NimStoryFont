"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDeclarationToNgModule = addDeclarationToNgModule;
const schematics_1 = require("@angular-devkit/schematics");
const typescript_1 = __importDefault(require("typescript"));
const ast_utils_1 = require("./ast-utils");
const change_1 = require("./change");
const find_module_1 = require("./find-module");
function addDeclarationToNgModule(options) {
    return (host) => {
        const modulePath = options.module;
        if (options.skipImport || options.standalone || !modulePath) {
            return host;
        }
        const typeSeparator = options.typeSeparator ?? '.';
        const sourceText = host.readText(modulePath);
        const source = typescript_1.default.createSourceFile(modulePath, sourceText, typescript_1.default.ScriptTarget.Latest, true);
        const filePath = `/${options.path}/` +
            (options.flat ? '' : schematics_1.strings.dasherize(options.name) + '/') +
            schematics_1.strings.dasherize(options.name) +
            (options.type ? typeSeparator + schematics_1.strings.dasherize(options.type) : '');
        const importPath = (0, find_module_1.buildRelativePath)(modulePath, filePath);
        const classifiedName = schematics_1.strings.classify(options.name) + (options.type ? schematics_1.strings.classify(options.type) : '');
        const changes = (0, ast_utils_1.addDeclarationToModule)(source, modulePath, classifiedName, importPath);
        if (options.export) {
            changes.push(...(0, ast_utils_1.addSymbolToNgModuleMetadata)(source, modulePath, 'exports', classifiedName));
        }
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
//# sourceMappingURL=add-declaration-to-ng-module.js.map