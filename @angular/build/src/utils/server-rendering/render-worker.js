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
Object.defineProperty(exports, "__esModule", { value: true });
const node_worker_threads_1 = require("node:worker_threads");
const fetch_patch_1 = require("./fetch-patch");
const launch_server_1 = require("./launch-server");
const load_esm_from_memory_1 = require("./load-esm-from-memory");
const utils_1 = require("./utils");
/**
 * This is passed as workerData when setting up the worker via the `piscina` package.
 */
const { outputMode, hasSsrEntry } = node_worker_threads_1.workerData;
let serverURL = launch_server_1.DEFAULT_URL;
/**
 * Renders each route in routes and writes them to <outputPath>/<route>/index.html.
 */
async function renderPage({ url }) {
    const { ɵgetOrCreateAngularServerApp: getOrCreateAngularServerApp } = await (0, load_esm_from_memory_1.loadEsmModuleFromMemory)('./main.server.mjs');
    const angularServerApp = getOrCreateAngularServerApp({
        allowStaticRouteRender: true,
    });
    const response = await angularServerApp.handle(new Request(new URL(url, serverURL), { signal: AbortSignal.timeout(30_000) }));
    if (!response) {
        return null;
    }
    const location = response.headers.get('Location');
    return location ? (0, utils_1.generateRedirectStaticPage)(location) : response.text();
}
async function initialize() {
    // Load the compiler because `@angular/ssr/node` depends on `@angular/` packages,
    // which must be processed by the runtime linker, even if they are not used.
    await Promise.resolve().then(() => __importStar(require('@angular/compiler')));
    if (outputMode !== undefined && hasSsrEntry) {
        serverURL = await (0, launch_server_1.launchServer)();
    }
    (0, fetch_patch_1.patchFetchToLoadInMemoryAssets)(serverURL);
    return renderPage;
}
exports.default = initialize();
//# sourceMappingURL=render-worker.js.map