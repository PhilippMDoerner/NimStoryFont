/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { z } from 'zod';
export declare const workspaceAndProjectOptions: {
    workspace: z.ZodOptional<z.ZodString>;
    project: z.ZodOptional<z.ZodString>;
};
