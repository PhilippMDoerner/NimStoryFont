/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { z } from 'zod';
export declare const BEST_PRACTICES_TOOL: import("./tool-registry").McpToolDeclaration<{
    workspacePath: z.ZodOptional<z.ZodString>;
}, Readonly<{
    [k: string]: z.core.$ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>;
}>>;
