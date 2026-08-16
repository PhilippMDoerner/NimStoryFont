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
exports.migrateWritableStateSource = migrateWritableStateSource;
exports.default = default_1;
const ts = __importStar(require("typescript"));
const schematics_1 = require("@angular-devkit/schematics");
const schematics_core_1 = require("../../schematics-core");
function migrateWritableStateSource() {
    return (tree, ctx) => {
        let updateCounter = 0;
        ctx.logger.info(`[@ngrx/signals] Migrating 'StateSignal' to 'WritableStateSource'`);
        (0, schematics_core_1.visitTSSourceFiles)(tree, (sourceFile) => {
            const changes = (0, schematics_core_1.replaceImport)(sourceFile, sourceFile.fileName, '@ngrx/signals', 'StateSignal', 'WritableStateSource');
            if (changes.length) {
                visitIdentifiers(sourceFile, (node) => {
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
            ctx.logger.info(`[@ngrx/signals] Updated ${updateCounter} references from 'StateSignal' to 'WritableStateSource'`);
        }
        else {
            ctx.logger.info(`[@ngrx/signals] No 'StateSignal' refences found to, skipping the migration`);
        }
    };
}
function visitIdentifiers(node, visitor) {
    if (ts.isIdentifier(node)) {
        visitor(node);
    }
    ts.forEachChild(node, (childNode) => visitIdentifiers(childNode, visitor));
}
function default_1() {
    return (0, schematics_1.chain)([migrateWritableStateSource()]);
}
//# sourceMappingURL=index.js.map