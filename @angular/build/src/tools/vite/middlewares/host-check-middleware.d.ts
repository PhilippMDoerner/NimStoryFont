/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { Connect } from 'vite' with {
    'resolution-mode': 'import'
};
export declare function patchHostValidationMiddleware(middlewares: Connect.Server): void;
