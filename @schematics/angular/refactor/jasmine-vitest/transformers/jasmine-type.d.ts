/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview This file contains a transformer that migrates Jasmine type definitions to
 * their Vitest equivalents. It handles the conversion of types like `jasmine.Spy` and
 * `jasmine.SpyObj` to Vitest's `Mock` and `MockedObject` types, and ensures that the
 * necessary `vitest` imports are added to the file.
 */
import ts from 'typescript';
import { RefactorContext } from '../utils/refactor-context';
export declare function transformJasmineTypes(node: ts.Node, { sourceFile, reporter, pendingVitestTypeImports }: RefactorContext): ts.Node;
