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
/**
 * Patches the Vite base middleware to correctly handle the Angular application's base href.
 * This is necessary because Vite's default base middleware might not align with Angular's
 * expected path handling when using SSR, especially when a base href is configured.
 *
 * @param middlewares The Connect server instance containing the middleware stack.
 * @param base The base URL path to be handled by the middleware.
 */
export declare function patchBaseMiddleware(middlewares: Connect.Server, base: string): void;
