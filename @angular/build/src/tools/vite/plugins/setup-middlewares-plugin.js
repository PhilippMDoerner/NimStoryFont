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
exports.ServerSsrMode = void 0;
exports.createAngularSetupMiddlewaresPlugin = createAngularSetupMiddlewaresPlugin;
const middlewares_1 = require("../middlewares");
var ServerSsrMode;
(function (ServerSsrMode) {
    /**
     * No SSR
     */
    ServerSsrMode[ServerSsrMode["NoSsr"] = 0] = "NoSsr";
    /**
     * Internal server-side rendering (SSR) is handled through the built-in middleware.
     *
     * In this mode, the SSR process is managed internally by the dev-server's middleware.
     * The server automatically renders pages on the server without requiring external
     * middleware or additional configuration from the developer.
     */
    ServerSsrMode[ServerSsrMode["InternalSsrMiddleware"] = 1] = "InternalSsrMiddleware";
    /**
     * External server-side rendering (SSR) is handled by a custom middleware defined in server.ts.
     *
     * This mode allows developers to define custom SSR behavior by providing a middleware in the
     * `server.ts` file. It gives more flexibility for handling SSR, such as integrating with other
     * frameworks or customizing the rendering pipeline.
     */
    ServerSsrMode[ServerSsrMode["ExternalSsrMiddleware"] = 2] = "ExternalSsrMiddleware";
})(ServerSsrMode || (exports.ServerSsrMode = ServerSsrMode = {}));
async function createEncapsulateStyle() {
    const { encapsulateStyle } = await Promise.resolve().then(() => __importStar(require('@angular/compiler')));
    const decoder = new TextDecoder('utf-8');
    return (style, componentId) => {
        return encapsulateStyle(decoder.decode(style), componentId);
    };
}
function createAngularSetupMiddlewaresPlugin(options) {
    return {
        name: 'vite:angular-setup-middlewares',
        enforce: 'pre',
        async configureServer(server) {
            const { indexHtmlTransformer, outputFiles, extensionMiddleware, assets, componentStyles, templateUpdates, ssrMode, resetComponentUpdates, } = options;
            const middlewares = server.middlewares;
            // Headers, assets and resources get handled first
            middlewares.use((0, middlewares_1.createAngularHeadersMiddleware)(server));
            middlewares.use((0, middlewares_1.createAngularComponentMiddleware)(server, templateUpdates));
            middlewares.use((0, middlewares_1.createAngularAssetsMiddleware)(server, assets, outputFiles, componentStyles, await createEncapsulateStyle()));
            middlewares.use((0, middlewares_1.createChromeDevtoolsMiddleware)(server.config.cacheDir, options.projectRoot));
            extensionMiddleware?.forEach((middleware) => middlewares.use(middleware));
            // Returning a function, installs middleware after the main transform middleware but
            // before the built-in HTML middleware
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            return async () => {
                (0, middlewares_1.patchHostValidationMiddleware)(server.middlewares);
                if (ssrMode === ServerSsrMode.ExternalSsrMiddleware) {
                    (0, middlewares_1.patchBaseMiddleware)(server.middlewares, server.config.base);
                    middlewares.use(await (0, middlewares_1.createAngularSsrExternalMiddleware)(server, indexHtmlTransformer));
                    return;
                }
                if (ssrMode === ServerSsrMode.InternalSsrMiddleware) {
                    middlewares.use((0, middlewares_1.createAngularSsrInternalMiddleware)(server, indexHtmlTransformer));
                }
                middlewares.use(middlewares_1.angularHtmlFallbackMiddleware);
                middlewares.use((0, middlewares_1.createAngularIndexHtmlMiddleware)(server, outputFiles, resetComponentUpdates, indexHtmlTransformer));
            };
        },
    };
}
//# sourceMappingURL=setup-middlewares-plugin.js.map