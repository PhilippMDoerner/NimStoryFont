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
exports.runWebpackDevServer = runWebpackDevServer;
const architect_1 = require("@angular-devkit/architect");
const node_assert_1 = __importDefault(require("node:assert"));
const node_path_1 = require("node:path");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../utils");
/**
 * @deprecated Part of Angular's Webpack support deprecation. Use `@angular/build` APIs instead.
 * Deprecated since v22.
 */
function runWebpackDevServer(config, context, options = {}) {
    const createWebpack = (c) => {
        if (options.webpackFactory) {
            const result = options.webpackFactory(c);
            if ((0, rxjs_1.isObservable)(result)) {
                return result;
            }
            else {
                return (0, rxjs_1.of)(result);
            }
        }
        else {
            return (0, rxjs_1.from)(Promise.resolve().then(() => __importStar(require('webpack'))).then((mod) => mod.default(c)));
        }
    };
    const createWebpackDevServer = (webpack, config) => {
        if (options.webpackDevServerFactory) {
            return new options.webpackDevServerFactory(config, webpack);
        }
        else {
            return (0, rxjs_1.from)(Promise.resolve().then(() => __importStar(require('webpack-dev-server'))).then((mod) => new mod.default(config, webpack)));
        }
    };
    const { logging: log = (stats, config) => {
        if (config.stats !== false) {
            const statsOptions = config.stats === true ? undefined : config.stats;
            context.logger.info(stats.toString(statsOptions));
        }
    }, shouldProvideStats = true, } = options;
    return createWebpack({ ...config, watch: false }).pipe((0, rxjs_1.switchMap)(async (webpackCompiler) => {
        return [
            webpackCompiler,
            options.webpackDevServerFactory ?? (await Promise.resolve().then(() => __importStar(require('webpack-dev-server')))).default,
        ];
    }), (0, rxjs_1.switchMap)(([webpackCompiler, webpackDevServerFactory]) => new rxjs_1.Observable((obs) => {
        (0, node_assert_1.default)(webpackCompiler, 'Webpack compiler factory did not return a compiler instance.');
        const devServerConfig = options.devServerConfig || config.devServer || {};
        devServerConfig.host ??= 'localhost';
        let result;
        const statsOptions = typeof config.stats === 'boolean' ? undefined : config.stats;
        webpackCompiler.hooks.done.tap('build-webpack', (stats) => {
            // Log stats.
            log(stats, config);
            obs.next({
                ...result,
                webpackStats: shouldProvideStats ? stats.toJson(statsOptions) : undefined,
                emittedFiles: (0, utils_1.getEmittedFiles)(stats.compilation),
                success: !stats.hasErrors(),
                outputPath: stats.compilation.outputOptions.path,
            });
        });
        const devServer = new webpackDevServerFactory(devServerConfig, webpackCompiler);
        devServer.startCallback((err) => {
            if (err) {
                obs.error(err);
                return;
            }
            const address = devServer.server?.address();
            if (!address) {
                obs.error(new Error(`Dev-server address info is not defined.`));
                return;
            }
            result = {
                success: true,
                port: typeof address === 'string' ? 0 : address.port,
                family: typeof address === 'string' ? '' : address.family,
                address: typeof address === 'string' ? address : address.address,
            };
        });
        // Teardown logic. Close the server when unsubscribed from.
        return () => {
            devServer.stopCallback(() => { });
            webpackCompiler.close(() => { });
        };
    })));
}
const builder = (0, architect_1.createBuilder)((options, context) => {
    context.logger.warn('The "@angular-devkit/build-webpack:webpack-dev-server" builder is deprecated as part of Angular\'s Webpack support deprecation. ' +
        'Use "@angular/build" instead.');
    const configPath = (0, node_path_1.resolve)(context.workspaceRoot, options.webpackConfig);
    return (0, rxjs_1.from)((0, utils_1.getWebpackConfig)(configPath)).pipe((0, rxjs_1.switchMap)((config) => runWebpackDevServer(config, context)));
});
exports.default = builder;
//# sourceMappingURL=index.js.map