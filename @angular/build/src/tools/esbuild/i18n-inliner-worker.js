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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inlineFile;
exports.inlineCode = inlineCode;
const remapping_1 = __importDefault(require("@ampproject/remapping"));
const magic_string_1 = require("magic-string");
const node_assert_1 = __importDefault(require("node:assert"));
const node_worker_threads_1 = require("node:worker_threads");
const oxc_parser_1 = require("oxc-parser");
// Extract the application files and common options used for inline requests from the Worker context
// TODO: Evaluate overall performance difference of passing translations here as well
const { files, missingTranslation, shouldOptimize } = (node_worker_threads_1.workerData || {});
/**
 * Inlines the provided locale and translation into a JavaScript file that contains `$localize` usage.
 * This function is the main entry for the Worker's action that is called by the worker pool.
 *
 * @param request An InlineRequest object representing the options for inlining
 * @returns An object containing the inlined file and optional map content.
 */
async function inlineFile(request) {
    const data = files.get(request.filename);
    (0, node_assert_1.default)(data !== undefined, `Invalid inline request for file '${request.filename}'.`);
    const code = await data.text();
    const map = await files.get(request.filename + '.map')?.text();
    const result = await transformWithOxc(code, map && JSON.parse(map), request);
    return {
        file: request.filename,
        code: result.code,
        map: result.map,
        messages: result.diagnostics.messages,
    };
}
/**
 * Inlines the provided locale and translation into JavaScript code that contains `$localize` usage.
 * This function is a secondary entry primarily for use with component HMR update modules.
 *
 * @param request An InlineRequest object representing the options for inlining
 * @returns An object containing the inlined code.
 */
async function inlineCode(request) {
    const result = await transformWithOxc(request.code, undefined, request);
    return {
        output: result.code,
        messages: result.diagnostics.messages,
    };
}
/**
 * Cached instance of the `@angular/localize/tools` module.
 * This is used to remove the need to repeatedly import the module per file translation.
 */
let localizeToolsModule;
/**
 * Attempts to load the `@angular/localize/tools` module containing the functionality to
 * perform the file translations.
 * This module must be dynamically loaded as it is an ESM module and this file is CommonJS.
 */
async function loadLocalizeTools() {
    // Load ESM `@angular/localize/tools` using the TypeScript dynamic import workaround.
    // Once TypeScript provides support for keeping the dynamic import this workaround can be
    // changed to a direct dynamic import.
    localizeToolsModule ??= await Promise.resolve().then(() => __importStar(require('@angular/localize/tools')));
    return localizeToolsModule;
}
/**
 * Transforms a JavaScript file using OXC and Magic-String to inline the request locale and translation.
 * @param code A string containing the JavaScript code to transform.
 * @param map A sourcemap object for the provided JavaScript code.
 * @param options The inline request options to use.
 * @returns An object containing the code, map, and diagnostics from the transformation.
 */
async function transformWithOxc(code, map, options) {
    const { program } = (0, oxc_parser_1.parseSync)(options.filename, code, {
        sourceType: 'unambiguous',
    });
    if (!program) {
        throw new Error(`Unknown error occurred parsing file "${options.filename}" with OXC.`);
    }
    const magicString = new magic_string_1.MagicString(code);
    const { Diagnostics, translate } = await loadLocalizeTools();
    const diagnostics = new Diagnostics();
    const visitor = new oxc_parser_1.Visitor({
        Literal(node) {
            if (typeof node.value === 'string' && node.value === '___NG_LOCALE_INSERT___') {
                magicString.overwrite(node.start, node.end, JSON.stringify(options.locale));
            }
        },
        'TaggedTemplateExpression:exit'(node) {
            if (node.tag.type === 'Identifier' && node.tag.name === '$localize') {
                const cooked = node.quasi.quasis.map((q) => q.value.cooked);
                const raw = node.quasi.quasis.map((q) => q.value.raw);
                const messageParts = Object.assign(cooked, { raw });
                const [translatedParts, translatedSubstitutions] = translate(diagnostics, options.translation || {}, messageParts, node.quasi.expressions.map((_, index) => index), options.translation === undefined ? 'ignore' : missingTranslation);
                // Reconstruct the new template/string literal replacement
                let replacement;
                if (translatedSubstitutions.length === 0) {
                    replacement = JSON.stringify(translatedParts[0]);
                }
                else {
                    replacement = '`';
                    for (let i = 0; i < translatedParts.length; i++) {
                        const escapedPart = JSON.stringify(translatedParts[i])
                            .slice(1, -1)
                            .replace(/\\"/g, '"')
                            .replace(/`/g, '\\`')
                            .replace(/\$\{/g, '\\${');
                        replacement += escapedPart;
                        if (i < translatedSubstitutions.length) {
                            const originalIndex = translatedSubstitutions[i];
                            const exprNode = node.quasi.expressions[originalIndex];
                            const exprCode = magicString.slice(exprNode.start, exprNode.end);
                            replacement += '${' + exprCode + '}';
                        }
                    }
                    replacement += '`';
                }
                magicString.overwrite(node.start, node.end, replacement);
            }
        },
    });
    visitor.visit(program);
    const outputCode = magicString.toString();
    let outputMap;
    if (map && magicString.hasChanged()) {
        const rawMap = magicString.generateMap({
            source: options.filename,
            includeContent: true,
            hires: 'boundary',
        });
        outputMap = (0, remapping_1.default)([rawMap, map], () => null);
    }
    return {
        code: outputCode,
        map: outputMap && JSON.stringify(outputMap),
        diagnostics,
    };
}
//# sourceMappingURL=i18n-inliner-worker.js.map