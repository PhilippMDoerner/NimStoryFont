"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToNgrxPush = migrateToNgrxPush;
exports.importPushModule = importPushModule;
exports.exportPushModule = exportPushModule;
exports.default = default_1;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
var ASYNC_REGEXP = /\| {0,}async/g;
var PUSH_MODULE = 'PushModule';
var COMPONENT_MODULE = '@ngrx/component';
var pushModuleToFind = function (node) {
    return ts.isIdentifier(node) && node.text === PUSH_MODULE;
};
var ngModulesToFind = function (node) {
    return ts.isIdentifier(node) &&
        (node.text === 'CommonModule' || node.text === 'BrowserModule');
};
function migrateToNgrxPush() {
    return function (host) {
        return (0, schematics_core_1.visitTemplates)(host, function (template) {
            var match;
            var changes = [];
            while ((match = ASYNC_REGEXP.exec(template.content)) !== null) {
                var m = match.toString();
                changes.push(new schematics_core_1.ReplaceChange(template.fileName, 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                template.start + match.index, m, m.replace('async', 'ngrxPush')));
            }
            return (0, schematics_core_1.commitChanges)(host, template.fileName, changes);
        });
    };
}
function importPushModule() {
    return function (host) {
        (0, schematics_core_1.visitTSSourceFiles)(host, function (sourceFile) {
            var hasCommonModuleOrBrowserModule = false;
            var hasPushModule = false;
            (0, schematics_core_1.visitNgModuleImports)(sourceFile, function (_, importNodes) {
                hasCommonModuleOrBrowserModule = importNodes.some(ngModulesToFind);
                hasPushModule = importNodes.some(pushModuleToFind);
            });
            if (hasCommonModuleOrBrowserModule && !hasPushModule) {
                var changes = (0, schematics_core_1.addImportToModule)(sourceFile, sourceFile.fileName, PUSH_MODULE, COMPONENT_MODULE);
                (0, schematics_core_1.commitChanges)(host, sourceFile.fileName, changes);
            }
        });
    };
}
function exportPushModule() {
    return function (host) {
        (0, schematics_core_1.visitTSSourceFiles)(host, function (sourceFile) {
            var hasCommonModuleOrBrowserModule = false;
            var hasPushModule = false;
            (0, schematics_core_1.visitNgModuleExports)(sourceFile, function (_, exportNodes) {
                hasCommonModuleOrBrowserModule = exportNodes.some(ngModulesToFind);
                hasPushModule = exportNodes.some(pushModuleToFind);
            });
            if (hasCommonModuleOrBrowserModule && !hasPushModule) {
                var changes = (0, schematics_core_1.addExportToModule)(sourceFile, sourceFile.fileName, PUSH_MODULE, COMPONENT_MODULE);
                (0, schematics_core_1.commitChanges)(host, sourceFile.fileName, changes);
            }
        });
    };
}
function default_1() {
    return (0, schematics_1.chain)([migrateToNgrxPush(), importPushModule(), exportPushModule()]);
}
//# sourceMappingURL=index.js.map