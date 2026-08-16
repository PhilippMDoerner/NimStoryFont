"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchHostValidationMiddleware = patchHostValidationMiddleware;
function patchHostValidationMiddleware(middlewares) {
    const entry = middlewares.stack.find(({ handle }) => typeof handle === 'function' && handle.name.startsWith('hostValidationMiddleware'));
    if (typeof entry?.handle !== 'function') {
        return;
    }
    const originalHandle = entry.handle;
    entry.handle = function angularHostValidationMiddleware(req, res, next) {
        originalHandle(req, {
            writeHead: (code) => {
                res.writeHead(code, { 'content-type': 'text/html' });
            },
            end: () => {
                const hostname = req.headers.host?.toLowerCase().split(':')[0] ?? '';
                res.end(html403(hostname));
            },
        }, next);
    };
}
function html403(hostname) {
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Blocked request</title>
    <style>
      body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;
      line-height:1.4;margin:2rem;color:#1f2937}
      code{background:#f3f4f6;padding:.15rem .35rem;border-radius:.25rem}
      main{max-width:760px;margin:0 auto}
      h1{font-size:1.5rem;margin-bottom:.75rem}
      p{margin:.5rem 0}
      pre{background:#f9fafb;border:1px solid #e5e7eb;padding:.75rem;border-radius:.5rem;overflow:auto}
    </style>
  </head>
  <body>
    <main>
      <h1>Blocked request. This host ("${hostname}") is not allowed.</h1>
      <p>To allow this host, add it to <code>allowedHosts</code> under the <code>serve</code> target in <code>angular.json</code>.</p>
      <pre><code>{
  "serve": {
    "options": {
      "allowedHosts": ["${hostname}"]
    }
  }
}</code></pre>
    </main>
  </body>
  </html>`;
}
//# sourceMappingURL=host-check-middleware.js.map