/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DeclarationNode } from '../../reflection';
import { IndexedComponent, NodeAdapter } from './api.js';
import { IndexingContext } from './context.js';
/**
 * Generates `IndexedComponent` entries from a `IndexingContext`, which has information
 * about components discovered in the program registered in it.
 *
 * The context must be populated before `generateAnalysis` is called.
 */
export declare function generateAnalysis<T = DeclarationNode>(context: IndexingContext<T>, adapter: NodeAdapter<T>): Map<T, IndexedComponent<T>>;
