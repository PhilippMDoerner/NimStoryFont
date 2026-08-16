/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { NgCompiler } from './core';
import { NgCompilerOptions } from './core/api';
/**
 * A driver for the Angular Compiler that performs "Source-to-Source" transformation.
 *
 * Unlike `NgtscProgram`, this driver does NOT use `program.emit()`. Instead, it:
 * 1. Analyzes the program using `NgCompiler`.
 * 2. Manually runs `ts.transform` with Angular's Ivy transformers.
 * 3. Prints the transformed AST back to a TypeScript string.
 *
 * This mode is designed for a mode where the Angular Compiler
 * acts as a pre-processor for a downstream TypeScript compiler.
 */
export declare class NgtscIsolatedPreprocessor {
    private options;
    readonly compiler: NgCompiler;
    private tsProgram;
    private host;
    private incrementalStrategy;
    constructor(rootNames: ReadonlyArray<string>, options: NgCompilerOptions, delegateHost: ts.CompilerHost, oldProgram?: NgtscIsolatedPreprocessor);
    transformAndPrint(): {
        fileName: string;
        content: string;
    }[];
}
