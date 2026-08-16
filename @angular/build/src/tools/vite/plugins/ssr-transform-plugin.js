"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAngularSsrTransformPlugin = createAngularSsrTransformPlugin;
const remapping_1 = __importDefault(require("@ampproject/remapping"));
async function createAngularSsrTransformPlugin(workspaceRoot) {
    const { normalizePath } = (await Promise.resolve(`${'vite'}`).then(s => __importStar(require(s))));
    return {
        name: 'vite:angular-ssr-transform',
        enforce: 'post',
        transform(code, _id, { ssr, inMap } = {}) {
            if (!ssr || !inMap) {
                return null;
            }
            const remappedMap = (0, remapping_1.default)([inMap], () => null);
            // Set the sourcemap root to the workspace root. This is needed since we set a virtual path as root.
            remappedMap.sourceRoot = normalizePath(workspaceRoot) + '/';
            return {
                code,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                map: remappedMap,
            };
        },
    };
}
//# sourceMappingURL=ssr-transform-plugin.js.map