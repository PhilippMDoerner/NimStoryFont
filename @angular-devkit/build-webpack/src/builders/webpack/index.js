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
exports.runWebpack = runWebpack;
const architect_1 = require("@angular-devkit/architect");
const node_assert_1 = __importDefault(require("node:assert"));
const node_path_1 = require("node:path");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../utils");
/**
 * @deprecated Part of Angular's Webpack support deprecation. Use `@angular/build` APIs instead.
 * Deprecated since v22.
 */
function runWebpack(config, context, options = {}) {
    const { logging: log = (stats, config) => {
        if (config.stats !== false) {
            const statsOptions = config.stats === true ? undefined : config.stats;
            context.logger.info(stats.toString(statsOptions));
        }
    }, shouldProvideStats = true, } = options;
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
    return createWebpack({ ...config, watch: false }).pipe((0, rxjs_1.switchMap)((webpackCompiler) => new rxjs_1.Observable((obs) => {
        (0, node_assert_1.default)(webpackCompiler, 'Webpack compiler factory did not return a compiler instance.');
        const callback = (err, stats) => {
            if (err) {
                return obs.error(err);
            }
            if (!stats) {
                return;
            }
            // Log stats.
            log(stats, config);
            const statsOptions = typeof config.stats === 'boolean' ? undefined : config.stats;
            const result = {
                success: !stats.hasErrors(),
                webpackStats: shouldProvideStats ? stats.toJson(statsOptions) : undefined,
                emittedFiles: (0, utils_1.getEmittedFiles)(stats.compilation),
                outputPath: stats.compilation.outputOptions.path,
            };
            if (config.watch) {
                obs.next(result);
            }
            else {
                webpackCompiler.close(() => {
                    obs.next(result);
                    obs.complete();
                });
            }
        };
        try {
            if (config.watch) {
                const watchOptions = config.watchOptions || {};
                const watching = webpackCompiler.watch(watchOptions, callback);
                // Teardown logic. Close the watcher when unsubscribed from.
                return () => {
                    watching?.close(() => { });
                    webpackCompiler.close(() => { });
                };
            }
            else {
                webpackCompiler.run(callback);
            }
        }
        catch (err) {
            if (err) {
                context.logger.error(`\nAn error occurred during the build:\n${err instanceof Error ? err.stack : err}`);
            }
            throw err;
        }
    })));
}
const builder = (0, architect_1.createBuilder)((options, context) => {
    context.logger.warn('The "@angular-devkit/build-webpack:webpack" builder is deprecated as part of Angular\'s Webpack support deprecation. ' +
        'Use "@angular/build" instead.');
    const configPath = (0, node_path_1.resolve)(context.workspaceRoot, options.webpackConfig);
    return (0, rxjs_1.from)((0, utils_1.getWebpackConfig)(configPath)).pipe((0, rxjs_1.switchMap)((config) => runWebpack(config, context)));
});
exports.default = builder;
//# sourceMappingURL=index.js.map