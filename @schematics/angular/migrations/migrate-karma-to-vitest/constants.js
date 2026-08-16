"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILD_OPTIONS_KEYS = exports.SUPPORTED_COVERAGE_REPORTERS = exports.SUPPORTED_REPORTERS = void 0;
exports.SUPPORTED_REPORTERS = new Set([
    'default',
    'verbose',
    'dots',
    'json',
    'junit',
    'tap',
    'tap-flat',
    'html',
]);
exports.SUPPORTED_COVERAGE_REPORTERS = new Set([
    'html',
    'lcov',
    'lcovonly',
    'text',
    'text-summary',
    'cobertura',
    'json',
    'json-summary',
]);
exports.BUILD_OPTIONS_KEYS = [
    'assets',
    'styles',
    'scripts',
    'polyfills',
    'inlineStyleLanguage',
    'stylePreprocessorOptions',
    'externalDependencies',
    'loader',
    'define',
    'fileReplacements',
    'webWorkerTsConfig',
    'aot',
];
//# sourceMappingURL=constants.js.map