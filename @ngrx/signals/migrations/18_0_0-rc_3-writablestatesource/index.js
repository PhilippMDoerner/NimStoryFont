"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateWritableStateSource = migrateWritableStateSource;
exports.default = default_1;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
function migrateWritableStateSource() {
    return function (tree, ctx) {
        var updateCounter = 0;
        ctx.logger.info("[@ngrx/signals] Migrating 'StateSignal' to 'WritableStateSource'");
        (0, schematics_core_1.visitTSSourceFiles)(tree, function (sourceFile) {
            var changes = (0, schematics_core_1.replaceImport)(sourceFile, sourceFile.fileName, '@ngrx/signals', 'StateSignal', 'WritableStateSource');
            if (changes.length) {
                visitIdentifiers(sourceFile, function (node) {
                    if (node.getText() === 'StateSignal' &&
                        !ts.isImportSpecifier(node.parent)) {
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, node, 'StateSignal', 'WritableStateSource'));
                        updateCounter++;
                    }
                });
            }
            (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
        });
        if (updateCounter) {
            ctx.logger.info("[@ngrx/signals] Updated ".concat(updateCounter, " references from 'StateSignal' to 'WritableStateSource'"));
        }
        else {
            ctx.logger.info("[@ngrx/signals] No 'StateSignal' refences found to, skipping the migration");
        }
    };
}
function visitIdentifiers(node, visitor) {
    if (ts.isIdentifier(node)) {
        visitor(node);
    }
    ts.forEachChild(node, function (childNode) { return visitIdentifiers(childNode, visitor); });
}
function default_1() {
    return (0, schematics_1.chain)([migrateWritableStateSource()]);
}
//# sourceMappingURL=index.js.map