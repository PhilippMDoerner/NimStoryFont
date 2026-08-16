"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareTool = declareTool;
exports.registerTools = registerTools;
function declareTool(declaration) {
    return declaration;
}
async function registerTools(server, context, declarations) {
    for (const declaration of declarations) {
        const toolContext = { ...context, server };
        if (declaration.shouldRegister && !(await declaration.shouldRegister(toolContext))) {
            continue;
        }
        const { name, factory, shouldRegister, isReadOnly, isLocalOnly, ...config } = declaration;
        const handler = await factory(toolContext);
        // Add declarative characteristics to annotations
        config.annotations ??= {};
        if (isReadOnly !== undefined) {
            config.annotations.readOnlyHint = isReadOnly;
        }
        if (isLocalOnly !== undefined) {
            // openWorldHint: false means local only
            config.annotations.openWorldHint = !isLocalOnly;
        }
        server.registerTool(name, config, handler);
    }
}
//# sourceMappingURL=tool-registry.js.map