/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Finds all test files in the project. This function implements a special handling
 * for static paths (non-globs) to improve developer experience. For example, if a
 * user provides a path to a component, this function will find the corresponding
 * test file. If a user provides a path to a directory, it will find all test
 * files within that directory.
 *
 * @param include Glob patterns of files to include.
 * @param exclude Glob patterns of files to exclude.
 * @param workspaceRoot The absolute path to the workspace root.
 * @param projectSourceRoot The absolute path to the project's source root.
 * @returns A unique set of absolute paths to all test files.
 */
export declare function findTests(include: string[], exclude: string[], workspaceRoot: string, projectSourceRoot: string): Promise<string[]>;
interface TestEntrypointsOptions {
    projectSourceRoot: string;
    workspaceRoot: string;
    removeTestExtension?: boolean;
    prefix?: string;
}
/**
 * Generates unique, dash-delimited bundle names for a set of test files.
 * This is used to create distinct output files for each test.
 *
 * @param testFiles An array of absolute paths to test files.
 * @param options Configuration options for generating entry points.
 * @returns A map where keys are the generated unique bundle names and values are the original file paths.
 */
export declare function getTestEntrypoints(testFiles: string[], { projectSourceRoot, workspaceRoot, removeTestExtension, prefix, }: TestEntrypointsOptions): Map<string, string>;
/**
 * Generates a unique, dash-delimited name from a file path. This is used to
 * create a consistent and readable bundle name for a given test file.
 *
 * @param testFile The absolute path to the test file.
 * @param roots An array of root paths to remove from the beginning of the test file path.
 * @param removeTestExtension Whether to remove the test file infix and extension from the result.
 * @returns A dash-cased name derived from the relative path of the test file.
 */
export declare function generateNameFromPath(testFile: string, roots: string[], removeTestExtension: boolean): string;
export {};
