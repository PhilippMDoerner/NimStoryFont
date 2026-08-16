"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInstructionsResource = registerInstructionsResource;
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
function registerInstructionsResource(server) {
    server.registerResource('instructions', 'instructions://best-practices', {
        title: 'Angular Best Practices and Code Generation Guide',
        description: "A comprehensive guide detailing Angular's best practices for code generation and development." +
            ' This guide should be used as a reference by an LLM to ensure any generated code' +
            ' adheres to modern Angular standards, including the use of standalone components,' +
            ' typed forms, modern control flow syntax, and other current conventions.',
        mimeType: 'text/markdown',
    }, async () => {
        const text = await (0, promises_1.readFile)((0, node_path_1.join)(__dirname, 'best-practices.md'), 'utf-8');
        return { contents: [{ uri: 'instructions://best-practices', text }] };
    });
}
//# sourceMappingURL=instructions.js.map