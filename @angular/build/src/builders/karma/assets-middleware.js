"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularAssetsMiddleware = void 0;
const node_path_1 = __importDefault(require("node:path"));
const isWindows = process.platform === 'win32';
const LATEST_BUILD_FILES_TOKEN = 'angularLatestBuildFiles';
class AngularAssetsMiddleware {
    serveFile;
    latestBuildFiles;
    static $inject = ['serveFile', LATEST_BUILD_FILES_TOKEN];
    static NAME = 'angular-test-assets';
    constructor(serveFile, latestBuildFiles) {
        this.serveFile = serveFile;
        this.latestBuildFiles = latestBuildFiles;
    }
    handle(req, res, next) {
        const url = new URL(`http://${req.headers['host'] ?? ''}${req.url ?? ''}`);
        // Remove the leading slash from the URL path and convert to platform specific.
        // The latest build files will use the platform path separator.
        let pathname = url.pathname.slice(1);
        if (isWindows) {
            pathname = pathname.replaceAll(node_path_1.default.posix.sep, node_path_1.default.win32.sep);
        }
        const file = this.latestBuildFiles.files[pathname];
        if (!file) {
            next();
            return;
        }
        // Implementation of serverFile can be found here:
        // https://github.com/karma-runner/karma/blob/84f85e7016efc2266fa6b3465f494a3fa151c85c/lib/middleware/common.js#L10
        switch (file.origin) {
            case 'disk':
                this.serveFile(file.inputPath, undefined, res, undefined, undefined, /* doNotCache */ true);
                break;
            case 'memory':
                // Include pathname to help with Content-Type headers.
                this.serveFile(`/unused/${url.pathname}`, undefined, res, undefined, file.contents, 
                /* doNotCache */ false);
                break;
        }
    }
    static createPlugin(initialFiles) {
        return {
            [LATEST_BUILD_FILES_TOKEN]: ['value', { files: { ...initialFiles.files } }],
            [`middleware:${AngularAssetsMiddleware.NAME}`]: [
                'factory',
                Object.assign((...args) => {
                    const inst = new AngularAssetsMiddleware(...args);
                    return inst.handle.bind(inst);
                }, AngularAssetsMiddleware),
            ],
        };
    }
}
exports.AngularAssetsMiddleware = AngularAssetsMiddleware;
//# sourceMappingURL=assets-middleware.js.map