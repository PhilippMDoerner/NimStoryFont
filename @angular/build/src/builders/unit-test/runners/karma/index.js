"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_checker_1 = require("../dependency-checker");
const executor_1 = require("./executor");
/**
 * A declarative definition of the Karma test runner.
 */
const KarmaTestRunner = {
    name: 'karma',
    isStandalone: true,
    validateDependencies(options) {
        const checker = new dependency_checker_1.DependencyChecker(options.projectSourceRoot);
        checker.check('karma');
        checker.check('karma-jasmine');
        // Check for browser launchers
        if (options.browsers?.length) {
            for (const browser of options.browsers) {
                const launcherName = `karma-${browser.toLowerCase().split('headless')[0]}-launcher`;
                checker.check(launcherName);
            }
        }
        if (options.coverage) {
            checker.check('karma-coverage');
        }
        checker.report();
    },
    getBuildOptions() {
        return {
            buildOptions: {},
        };
    },
    async createExecutor(context, options) {
        return new executor_1.KarmaExecutor(context, options);
    },
};
exports.default = KarmaTestRunner;
//# sourceMappingURL=index.js.map