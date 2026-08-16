"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeOptions = serializeOptions;
/**
 * Serializes a Zod-validated options record into standard CLI argument flags.
 * Enforces strict regex validation on option keys to prevent flag manipulation.
 */
function serializeOptions(options, excludeKeys = new Set()) {
    const args = [];
    if (!options) {
        return args;
    }
    for (const [key, value] of Object.entries(options)) {
        if (excludeKeys.has(key)) {
            continue;
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(key)) {
            throw new Error(`Invalid option key: '${key}'. Option keys must be alphanumeric, hyphens, or underscores.`);
        }
        if (typeof value === 'boolean') {
            args.push(value ? `--${key}` : `--no-${key}`);
        }
        else if (Array.isArray(value)) {
            for (const item of value) {
                args.push(`--${key}=${item}`);
            }
        }
        else if (value !== null && value !== undefined) {
            args.push(`--${key}=${value}`);
        }
    }
    return args;
}
//# sourceMappingURL=options-serializer.js.map