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
exports.assertTypeScriptPrinterInternals = assertTypeScriptPrinterInternals;
exports.printSourceFileWithMap = printSourceFileWithMap;
/**
 * @fileoverview Helper functions and typings for utilizing internal TypeScript printer
 * and sourcemap generation APIs.
 */
const node_assert_1 = __importDefault(require("node:assert"));
const node_path_1 = require("node:path");
const typescript_1 = __importDefault(require("typescript"));
const tsInternals = typescript_1.default;
/**
 * Asserts that the required internal TypeScript APIs are present in the currently
 * loaded TypeScript module.
 *
 * @throws {AssertionError} If any required internal API is missing.
 */
function assertTypeScriptPrinterInternals() {
    (0, node_assert_1.default)(typeof tsInternals.createTextWriter === 'function', 'TypeScript internal "createTextWriter" is missing.');
    (0, node_assert_1.default)(typeof tsInternals.createSourceMapGenerator === 'function', 'TypeScript internal "createSourceMapGenerator" is missing.');
}
/**
 * Prints a TypeScript source file AST to a string, optionally generating a sourcemap
 * using internal TypeScript APIs.
 *
 * @param sourceFile The TypeScript AST node representing the file to print.
 * @param printer The printer instance to print the file with.
 * @param compilerHost The TypeScript compiler host, used for path canonicalization and context.
 * @param compilerOptions The compiler options configured for the build target.
 * @returns A result containing the printed code and optional sourcemap text.
 */
function printSourceFileWithMap(sourceFile, printer, compilerHost, compilerOptions) {
    const shouldGenerateMap = compilerOptions.sourceMap || compilerOptions.inlineSourceMap;
    if (!shouldGenerateMap) {
        return { code: printer.printFile(sourceFile) };
    }
    assertTypeScriptPrinterInternals();
    const extendedPrinter = printer;
    (0, node_assert_1.default)(typeof extendedPrinter.writeFile === 'function', 'TypeScript Printer is missing internal "writeFile" method.');
    const writer = tsInternals.createTextWriter(compilerHost.getNewLine());
    const sourceMapGenerator = tsInternals.createSourceMapGenerator({
        getCurrentDirectory: () => compilerHost.getCurrentDirectory(),
        getCanonicalFileName: (fileName) => compilerHost.getCanonicalFileName(fileName),
    }, sourceFile.fileName, compilerOptions.sourceRoot, (0, node_path_1.dirname)(sourceFile.fileName), compilerOptions);
    extendedPrinter.writeFile(sourceFile, writer, sourceMapGenerator);
    const code = writer.getText();
    const map = sourceMapGenerator.toString();
    return { code, map };
}
//# sourceMappingURL=typescript-printer.js.map