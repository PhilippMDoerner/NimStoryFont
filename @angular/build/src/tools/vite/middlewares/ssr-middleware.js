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
exports.createAngularSsrInternalMiddleware = createAngularSsrInternalMiddleware;
exports.createAngularSsrExternalMiddleware = createAngularSsrExternalMiddleware;
const utils_1 = require("../../../utils/server-rendering/utils");
function createAngularSsrInternalMiddleware(server, indexHtmlTransformer) {
    let cachedAngularServerApp;
    return function angularSsrMiddleware(req, res, next) {
        if (req.url === undefined) {
            return next();
        }
        (async () => {
            // Load the compiler because `@angular/ssr/node` depends on `@angular/` packages,
            // which must be processed by the runtime linker, even if they are not used.
            await Promise.resolve().then(() => __importStar(require('@angular/compiler')));
            const { writeResponseToNodeResponse, createWebRequestFromNodeRequest } = (await Promise.resolve(`${'@angular/ssr/node'}`).then(s => __importStar(require(s))));
            const { ɵgetOrCreateAngularServerApp } = (await server.ssrLoadModule('/main.server.mjs'));
            const angularServerApp = ɵgetOrCreateAngularServerApp({
                allowStaticRouteRender: true,
            });
            // Only Add the transform hook only if it's a different instance.
            if (cachedAngularServerApp !== angularServerApp) {
                angularServerApp.hooks.on('html:transform:pre', async ({ html, url }) => {
                    const processedHtml = await server.transformIndexHtml(url.pathname, html);
                    return indexHtmlTransformer?.(processedHtml) ?? processedHtml;
                });
                cachedAngularServerApp = angularServerApp;
            }
            const webReq = new Request(createWebRequestFromNodeRequest(req), {
                signal: AbortSignal.timeout(30_000),
            });
            const webRes = await angularServerApp.handle(webReq);
            if (!webRes) {
                return next();
            }
            return writeResponseToNodeResponse(webRes, res);
        })().catch(next);
    };
}
async function createAngularSsrExternalMiddleware(server, indexHtmlTransformer) {
    let fallbackWarningShown = false;
    let cachedAngularAppEngine;
    let angularSsrInternalMiddleware;
    // Load the compiler because `@angular/ssr/node` depends on `@angular/` packages,
    // which must be processed by the runtime linker, even if they are not used.
    await Promise.resolve().then(() => __importStar(require('@angular/compiler')));
    const { createWebRequestFromNodeRequest, writeResponseToNodeResponse } = (await Promise.resolve(`${'@angular/ssr/node'}`).then(s => __importStar(require(s))));
    // Disable host check if allowed hosts is true meaning allow all hosts.
    const { allowedHosts } = server.config.server;
    const disableAllowedHostsCheck = allowedHosts === true;
    return function angularSsrExternalMiddleware(req, res, next) {
        (async () => {
            const { reqHandler, AngularAppEngine } = (await server.ssrLoadModule('./server.mjs'));
            if (!(0, utils_1.isSsrNodeRequestHandler)(reqHandler) && !(0, utils_1.isSsrRequestHandler)(reqHandler)) {
                if (!fallbackWarningShown) {
                    // eslint-disable-next-line no-console
                    console.warn(`The 'reqHandler' export in 'server.ts' is either undefined or does not provide a recognized request handler. ` +
                        'Using the internal SSR middleware instead.');
                    fallbackWarningShown = true;
                }
                angularSsrInternalMiddleware ??= createAngularSsrInternalMiddleware(server, indexHtmlTransformer);
                angularSsrInternalMiddleware(req, res, next);
                return;
            }
            if (cachedAngularAppEngine !== AngularAppEngine) {
                AngularAppEngine.ɵdisableAllowedHostsCheck = disableAllowedHostsCheck;
                AngularAppEngine.ɵallowStaticRouteRender = true;
                AngularAppEngine.ɵhooks.on('html:transform:pre', async ({ html, url }) => {
                    const processedHtml = await server.transformIndexHtml(url.pathname, html);
                    return indexHtmlTransformer?.(processedHtml) ?? processedHtml;
                });
                cachedAngularAppEngine = AngularAppEngine;
            }
            // Forward the request to the middleware in server.ts
            if ((0, utils_1.isSsrNodeRequestHandler)(reqHandler)) {
                await reqHandler(req, res, next);
            }
            else {
                const webRes = await reqHandler(createWebRequestFromNodeRequest(req));
                if (!webRes) {
                    next();
                    return;
                }
                await writeResponseToNodeResponse(webRes, res);
            }
        })().catch(next);
    };
}
//# sourceMappingURL=ssr-middleware.js.map