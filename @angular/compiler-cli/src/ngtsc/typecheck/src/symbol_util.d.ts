/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Symbol, TemplateTypeChecker } from '../api';
/** Returns whether a symbol is a reference to a signal. */
export declare function isSignalReference(symbol: Symbol, typeChecker: TemplateTypeChecker): boolean;
