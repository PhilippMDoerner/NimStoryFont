/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { OptionValue } from './types';
/**
 * Serializes a Zod-validated options record into standard CLI argument flags.
 * Enforces strict regex validation on option keys to prevent flag manipulation.
 */
export declare function serializeOptions(options: Record<string, OptionValue> | undefined, excludeKeys?: Set<string>): string[];
