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
exports.setupServer = setupServer;
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const plugins_1 = require("../../../tools/vite/plugins");
const utils_1 = require("../../../tools/vite/utils");
const utils_2 = require("../../../utils");
async function createServerConfig(serverOptions, assets, ssrMode, preTransformRequests, cacheDir) {
    const proxy = await (0, utils_2.loadProxyConfiguration)(serverOptions.workspaceRoot, serverOptions.proxyConfig);
    // Files used for SSR warmup.
    let ssrFiles;
    switch (ssrMode) {
        case plugins_1.ServerSsrMode.InternalSsrMiddleware:
            ssrFiles = ['./main.server.mjs'];
            break;
        case plugins_1.ServerSsrMode.ExternalSsrMiddleware:
            ssrFiles = ['./main.server.mjs', './server.mjs'];
            break;
    }
    const server = {
        preTransformRequests,
        warmup: {
            ssrFiles,
        },
        port: serverOptions.port,
        strictPort: true,
        host: serverOptions.host,
        open: serverOptions.open,
        allowedHosts: serverOptions.allowedHosts,
        headers: serverOptions.headers,
        // Disable the websocket if live reload is disabled (false/undefined are the only valid values)
        ws: serverOptions.liveReload === false && serverOptions.hmr === false ? false : undefined,
        proxy,
        cors: {
            // Allow preflight requests to be proxied.
            preflightContinue: true,
        },
        // File watching is handled by the build directly. `null` disables file watching for Vite.
        watch: null,
        fs: {
            // Ensure cache directory, node modules, and all assets are accessible by the client.
            // The first two are required for Vite to function in prebundling mode (the default) and to load
            // the Vite client-side code for browser reloading. These would be available by default but when
            // the `allow` option is explicitly configured, they must be included manually.
            allow: [
                cacheDir,
                (0, node_path_1.join)(serverOptions.workspaceRoot, 'node_modules'),
                ...[...assets.values()].map(({ source }) => source),
            ],
        },
    };
    if (serverOptions.ssl && serverOptions.sslCert && serverOptions.sslKey) {
        const [cert, key] = await Promise.all([
            (0, promises_1.readFile)(serverOptions.sslCert),
            (0, promises_1.readFile)(serverOptions.sslKey),
        ]);
        server.https = {
            cert,
            key,
        };
    }
    return server;
}
function createSsrConfig(externalMetadata, serverOptions, prebundleTransformer, prebundleLoaderExtensions, thirdPartySourcemaps, define) {
    return {
        // Note: `true` and `/.*/` have different sematics. When true, the `external` option is ignored.
        noExternal: /.*/,
        // Exclude any Node.js built in module and provided dependencies (currently build defined externals)
        external: externalMetadata.explicitServer,
        optimizeDeps: (0, utils_1.getDepOptimizationConfig)({
            // Only enable with caching since it causes prebundle dependencies to be cached
            disabled: serverOptions.prebundle === false,
            // Exclude any explicitly defined dependencies (currently build defined externals and node.js built-ins)
            exclude: externalMetadata.explicitServer,
            // Include all implict dependencies from the external packages internal option
            include: externalMetadata.implicitServer,
            prebundleTransformer,
            loader: prebundleLoaderExtensions,
            thirdPartySourcemaps,
            define: {
                ...define,
                'ngServerMode': 'true',
            },
        }),
    };
}
async function setupServer(serverOptions, outputFiles, assets, preserveSymlinks, externalMetadata, ssrMode, prebundleTransformer, target, componentStyles, templateUpdates, prebundleLoaderExtensions, define, extensionMiddleware, indexHtmlTransformer, thirdPartySourcemaps = false) {
    const { normalizePath } = (await Promise.resolve(`${'vite'}`).then(s => __importStar(require(s))));
    // Path will not exist on disk and only used to provide separate path for Vite requests
    const virtualProjectRoot = normalizePath((0, node_path_1.join)(serverOptions.workspaceRoot, `.angular/vite-root`, serverOptions.buildTarget.project));
    /**
     * Required when using `externalDependencies` to prevent Vite load errors.
     *
     * @note Can be removed if Vite introduces native support for externals.
     * @note Vite misresolves browser modules in SSR when accessing URLs with multiple segments
     *       (e.g., 'foo/bar'), as they are not correctly re-based from the base href.
     */
    const preTransformRequests = externalMetadata.explicitBrowser.length === 0 && ssrMode === plugins_1.ServerSsrMode.NoSsr;
    const cacheDir = (0, node_path_1.join)(serverOptions.cacheOptions.path, serverOptions.buildTarget.project, 'vite');
    const configuration = {
        configFile: false,
        envDir: false,
        cacheDir,
        root: virtualProjectRoot,
        publicDir: false,
        oxc: false,
        mode: 'development',
        // We use custom as we do not rely on Vite's htmlFallbackMiddleware and indexHtmlMiddleware.
        appType: 'custom',
        css: {
            devSourcemap: true,
        },
        // Ensure custom 'file' loader build option entries are handled by Vite in application code that
        // reference third-party libraries. Relative usage is handled directly by the build and not Vite.
        // Only 'file' loader entries are currently supported directly by Vite.
        assetsInclude: prebundleLoaderExtensions &&
            Object.entries(prebundleLoaderExtensions)
                .filter(([, value]) => value === 'asset')
                // Create a file extension glob for each key
                .map(([key]) => '*' + key),
        // Vite will normalize the `base` option by adding a leading slash.
        base: serverOptions.servePath,
        resolve: {
            mainFields: ['es2020', 'browser', 'module', 'main'],
            preserveSymlinks,
        },
        dev: {
            preTransformRequests,
        },
        server: await createServerConfig(serverOptions, assets, ssrMode, preTransformRequests, cacheDir),
        build: {
            target,
        },
        ssr: ssrMode === plugins_1.ServerSsrMode.NoSsr
            ? undefined
            : createSsrConfig(externalMetadata, serverOptions, prebundleTransformer, prebundleLoaderExtensions, thirdPartySourcemaps, define),
        plugins: [
            (0, plugins_1.createAngularSetupMiddlewaresPlugin)({
                outputFiles,
                assets,
                indexHtmlTransformer,
                extensionMiddleware,
                componentStyles,
                templateUpdates,
                ssrMode,
                resetComponentUpdates: () => templateUpdates.clear(),
                projectRoot: serverOptions.projectRoot,
            }),
            (0, plugins_1.createRemoveIdPrefixPlugin)(externalMetadata.explicitBrowser),
            await (0, plugins_1.createAngularSsrTransformPlugin)(serverOptions.workspaceRoot),
            await (0, plugins_1.createAngularMemoryPlugin)({
                virtualProjectRoot,
                outputFiles,
                templateUpdates,
                external: externalMetadata.explicitBrowser,
                disableViteTransport: !serverOptions.liveReload,
            }),
        ],
        // Browser only optimizeDeps. (This does not run for SSR dependencies).
        optimizeDeps: (0, utils_1.getDepOptimizationConfig)({
            // Only enable with caching since it causes prebundle dependencies to be cached
            disabled: serverOptions.prebundle === false,
            // Exclude any explicitly defined dependencies (currently build defined externals)
            exclude: externalMetadata.explicitBrowser,
            // Include all implict dependencies from the external packages internal option
            include: externalMetadata.implicitBrowser,
            prebundleTransformer,
            loader: prebundleLoaderExtensions,
            thirdPartySourcemaps,
            define,
        }),
    };
    if (serverOptions.ssl) {
        configuration.plugins ??= [];
        if (!serverOptions.sslCert || !serverOptions.sslKey) {
            const { default: basicSslPlugin } = await Promise.resolve().then(() => __importStar(require('@vitejs/plugin-basic-ssl')));
            configuration.plugins.push(basicSslPlugin());
        }
        if (ssrMode !== plugins_1.ServerSsrMode.NoSsr) {
            configuration.plugins?.push((0, plugins_1.createAngularServerSideSSLPlugin)());
        }
    }
    return configuration;
}
//# sourceMappingURL=server.js.map