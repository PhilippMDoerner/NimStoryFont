"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateUpdatedFiles = invalidateUpdatedFiles;
exports.handleUpdate = handleUpdate;
const node_path_1 = require("node:path");
const internal_1 = require("../internal");
/**
 * Invalidates any updated asset or generated files and resets their `updated` state.
 * This function also clears the server application cache when necessary.
 *
 * @returns A list of files that were updated and invalidated.
 */
async function invalidateUpdatedFiles(normalizePath, generatedFiles, assetFiles, server) {
    const updatedFiles = [];
    // Invalidate any updated asset
    for (const [file, record] of assetFiles) {
        if (!record.updated) {
            continue;
        }
        record.updated = false;
        updatedFiles.push(file);
    }
    // Invalidate any updated files
    let serverApplicationChanged = false;
    for (const [file, record] of generatedFiles) {
        if (!record.updated) {
            continue;
        }
        record.updated = false;
        updatedFiles.push(file);
        serverApplicationChanged ||= record.type === internal_1.BuildOutputFileType.ServerApplication;
        const updatedModules = server.moduleGraph.getModulesByFile(normalizePath((0, node_path_1.join)(server.config.root, file)));
        updatedModules?.forEach((m) => server.moduleGraph.invalidateModule(m));
    }
    if (serverApplicationChanged) {
        // Clear the server app cache and trigger module evaluation before reload to initiate dependency optimization.
        // The querystring is needed as a workaround for:
        // `ɵgetOrCreateAngularServerApp` can be undefined right after an error.
        try {
            const { ɵdestroyAngularServerApp } = (await server.ssrLoadModule(`/main.server.mjs?timestamp=${Date.now()}`));
            ɵdestroyAngularServerApp();
        }
        catch {
            // Ignored as the next SSR request will resolve compile errors and outdated pre-bundles.
        }
    }
    return updatedFiles;
}
/**
 * Handles updates for the client by sending HMR or full page reload commands
 * based on the updated files. It also ensures proper tracking of component styles and determines if
 * a full reload is needed.
 */
function handleUpdate(server, serverOptions, logger, componentStyles, updatedFiles) {
    if (!updatedFiles.length) {
        return;
    }
    if (serverOptions.hmr) {
        if (updatedFiles.every((f) => f.endsWith('.css'))) {
            let requiresReload = false;
            const timestamp = Date.now();
            const updates = updatedFiles.flatMap((filePath) => {
                // For component styles, an HMR update must be sent for each one with the corresponding
                // component identifier search parameter (`ngcomp`). The Vite client code will not keep
                // the existing search parameters when it performs an update and each one must be
                // specified explicitly. Typically, there is only one each though as specific style files
                // are not typically reused across components.
                const record = componentStyles.get(filePath);
                if (record) {
                    if (record.reload) {
                        // Shadow DOM components currently require a full reload.
                        // Vite's CSS hot replacement does not support shadow root searching.
                        requiresReload = true;
                        return [];
                    }
                    return Array.from(record.used ?? []).map((id) => {
                        return {
                            type: 'css-update',
                            timestamp,
                            path: `${filePath}?ngcomp` + (typeof id === 'string' ? `=${id}` : ''),
                            acceptedPath: filePath,
                        };
                    });
                }
                return {
                    type: 'css-update',
                    timestamp,
                    path: filePath,
                    acceptedPath: filePath,
                };
            });
            if (!requiresReload) {
                server.ws.send({
                    type: 'update',
                    updates,
                });
                logger.info('Stylesheet update sent to client(s).');
                return;
            }
        }
    }
    // Send reload command to clients
    if (serverOptions.liveReload) {
        // Clear used component tracking on full reload
        componentStyles.forEach((record) => record.used?.clear());
        server.ws.send({
            type: 'full-reload',
            path: '*',
        });
        logger.info('Page reload sent to client(s).');
    }
}
//# sourceMappingURL=hmr.js.map