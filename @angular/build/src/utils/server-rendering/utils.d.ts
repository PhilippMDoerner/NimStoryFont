/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { createRequestHandler } from '@angular/ssr';
import type { createNodeRequestHandler } from '@angular/ssr/node' with {
    'resolution-mode': 'import'
};
export declare function isSsrNodeRequestHandler(value: unknown): value is ReturnType<typeof createNodeRequestHandler>;
export declare function isSsrRequestHandler(value: unknown): value is ReturnType<typeof createRequestHandler>;
/**
 * Generates a static HTML page with a meta refresh tag to redirect the user to a specified URL.
 *
 * This function creates a simple HTML page that performs a redirect using a meta tag.
 * It includes a fallback link in case the meta-refresh doesn't work.
 *
 * @param url - The URL to which the page should redirect.
 * @returns The HTML content of the static redirect page.
 */
export declare function generateRedirectStaticPage(url: string): string;
