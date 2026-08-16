"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectDebugIds = injectDebugIds;
const bundler_files_1 = require("../../tools/esbuild/bundler-files");
const debug_id_1 = require("../../utils/debug-id");
/**
 * Embeds an ECMA-426 Debug ID into every browser JavaScript output that has a
 * matching source map sibling.
 *
 * The Debug ID is derived deterministically (UUIDv5) from the source map bytes
 * so rebuilds of the same source produce the same ID. The JS file gets a
 * `//# debugId=<uuid>` comment placed above any existing
 * `//# sourceMappingURL=` line and the source map JSON gets a top-level
 * `"debugId"` field. Together they make build artifacts self-identifying as
 * proposed by https://github.com/tc39/ecma426/blob/main/proposals/debug-id.md.
 */
function injectDebugIds(outputFiles) {
    const filesByPath = new Map();
    for (const file of outputFiles) {
        filesByPath.set(file.path, file);
    }
    const encoder = new TextEncoder();
    for (const file of outputFiles) {
        if (file.type !== bundler_files_1.BuildOutputFileType.Browser || !file.path.endsWith('.js')) {
            continue;
        }
        const map = filesByPath.get(`${file.path}.map`);
        if (!map) {
            continue;
        }
        const mapText = map.text;
        const mapTextForHash = (0, debug_id_1.stripDebugIdFromSourceMap)(mapText);
        const id = (0, debug_id_1.generateDebugId)(mapTextForHash);
        file.contents = encoder.encode((0, debug_id_1.injectDebugIdIntoJs)(file.text, id));
        map.contents = encoder.encode((0, debug_id_1.injectDebugIdIntoSourceMap)(mapText, id));
    }
}
//# sourceMappingURL=inject-debug-ids.js.map