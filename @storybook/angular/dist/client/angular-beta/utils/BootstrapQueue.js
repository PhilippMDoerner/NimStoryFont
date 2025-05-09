"use strict";
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
exports.queueBootstrapping = void 0;
const queue = [];
let isProcessing = false;
/**
 * Reset compiled components because we often want to compile the same component with more than one
 * NgModule.
 */
const resetCompiledComponents = async () => {
    try {
        // Clear global Angular component cache in order to be able to re-render the same component across multiple stories
        //
        // References:
        // https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/src/webpack/plugins/hmr/hmr-accept.ts#L50
        // https://github.com/angular/angular/blob/2ebe2bcb2fe19bf672316b05f15241fd7fd40803/packages/core/src/render3/jit/module.ts#L377-L384
        const { ɵresetCompiledComponents } = await Promise.resolve().then(() => __importStar(require('@angular/core')));
        ɵresetCompiledComponents();
    }
    catch (e) {
        /** Noop catch This means angular removed or modified ɵresetCompiledComponents */
    }
};
/**
 * Queue bootstrapping, so that only one application can be bootstrapped at a time.
 *
 * Bootstrapping multiple applications at once can cause Angular to throw an error that a component
 * is declared in multiple modules. This avoids two stories confusing the Angular compiler, by
 * bootstrapping more that one application at a time.
 *
 * @param fn Callback that should complete the bootstrap process
 * @returns ApplicationRef from the completed bootstrap process
 */
const queueBootstrapping = (fn) => {
    return new Promise((resolve, reject) => {
        queue.push(() => fn().then(resolve).catch(reject));
        if (!isProcessing) {
            processQueue();
        }
    });
};
exports.queueBootstrapping = queueBootstrapping;
const processQueue = async () => {
    isProcessing = true;
    while (queue.length > 0) {
        const bootstrappingFn = queue.shift();
        if (bootstrappingFn) {
            await bootstrappingFn();
            await resetCompiledComponents();
        }
    }
    isProcessing = false;
};
