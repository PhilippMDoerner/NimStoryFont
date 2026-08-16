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
exports.DEFAULT_URL = void 0;
exports.launchServer = launchServer;
const node_assert_1 = __importDefault(require("node:assert"));
const node_http_1 = require("node:http");
const load_esm_from_memory_1 = require("./load-esm-from-memory");
const utils_1 = require("./utils");
exports.DEFAULT_URL = new URL('http://ng-localhost/');
/**
 * Launches a server that handles local requests.
 *
 * @returns A promise that resolves to the URL of the running server.
 */
async function launchServer() {
    const { reqHandler } = await (0, load_esm_from_memory_1.loadEsmModuleFromMemory)('./server.mjs');
    const { createWebRequestFromNodeRequest, writeResponseToNodeResponse } = (await Promise.resolve(`${'@angular/ssr/node'}`).then(s => __importStar(require(s))));
    if (!(0, utils_1.isSsrNodeRequestHandler)(reqHandler) && !(0, utils_1.isSsrRequestHandler)(reqHandler)) {
        return exports.DEFAULT_URL;
    }
    const server = (0, node_http_1.createServer)((req, res) => {
        (async () => {
            // handle request
            if ((0, utils_1.isSsrNodeRequestHandler)(reqHandler)) {
                await reqHandler(req, res, (e) => {
                    throw e ?? new Error(`Unable to handle request: '${req.url}'.`);
                });
            }
            else {
                const webRes = await reqHandler(createWebRequestFromNodeRequest(req));
                if (webRes) {
                    await writeResponseToNodeResponse(webRes, res);
                }
                else {
                    res.statusCode = 501;
                    res.end('Not Implemented.');
                }
            }
        })().catch((e) => {
            res.statusCode = 500;
            res.end('Internal Server Error.');
            // eslint-disable-next-line no-console
            console.error(e);
        });
    });
    server.unref();
    await new Promise((resolve) => server.listen(0, 'localhost', resolve));
    const serverAddress = server.address();
    (0, node_assert_1.default)(serverAddress, 'Server address should be defined.');
    (0, node_assert_1.default)(typeof serverAddress !== 'string', 'Server address should not be a string.');
    return new URL(`http://localhost:${serverAddress.port}/`);
}
//# sourceMappingURL=launch-server.js.map