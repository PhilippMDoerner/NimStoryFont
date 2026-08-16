"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSsrNodeRequestHandler = isSsrNodeRequestHandler;
exports.isSsrRequestHandler = isSsrRequestHandler;
exports.generateRedirectStaticPage = generateRedirectStaticPage;
function isSsrNodeRequestHandler(value) {
    return typeof value === 'function' && '__ng_node_request_handler__' in value;
}
function isSsrRequestHandler(value) {
    return typeof value === 'function' && '__ng_request_handler__' in value;
}
/**
 * Generates a static HTML page with a meta refresh tag to redirect the user to a specified URL.
 *
 * This function creates a simple HTML page that performs a redirect using a meta tag.
 * It includes a fallback link in case the meta-refresh doesn't work.
 *
 * @param url - The URL to which the page should redirect.
 * @returns The HTML content of the static redirect page.
 */
function generateRedirectStaticPage(url) {
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting</title>
    <meta http-equiv="refresh" content="0; url=${url}">
  </head>
  <body>
    <pre>Redirecting to <a href="${url}">${url}</a></pre>
  </body>
</html>
`.trim();
}
//# sourceMappingURL=utils.js.map