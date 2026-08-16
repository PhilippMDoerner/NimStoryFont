/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { RefactorReporter } from './utils/refactor-reporter';
/**
 * Transforms a string of Jasmine test code to Vitest test code.
 * This is the main entry point for the transformation.
 * @param filePath The path to the file being transformed.
 * @param content The source code to transform.
 * @param reporter The reporter to track TODOs.
 * @param options Transformation options, including whether to add Vitest API imports.
 * @returns The transformed code.
 */
export declare function transformJasmineToVitest(filePath: string, content: string, reporter: RefactorReporter, options: {
    addImports: boolean;
    browserMode: boolean;
    fakeAsync?: boolean;
}): string;
