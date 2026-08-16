"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectKarmaReporter = injectKarmaReporter;
const test_files_1 = require("../../utils/test-files");
const results_1 = require("../application/results");
const LATEST_BUILD_FILES_TOKEN = 'angularLatestBuildFiles';
function injectKarmaReporter(buildOptions, buildIterator, karmaConfig, controller) {
    const reporterName = 'angular-progress-notifier';
    class ProgressNotifierReporter {
        emitter;
        latestBuildFiles;
        static $inject = ['emitter', LATEST_BUILD_FILES_TOKEN];
        // Needed for the karma reporter interface, see https://github.com/angular/angular-cli/issues/31629
        adapters = [];
        constructor(emitter, latestBuildFiles) {
            this.emitter = emitter;
            this.latestBuildFiles = latestBuildFiles;
            this.startWatchingBuild();
        }
        startWatchingBuild() {
            void (async () => {
                // This is effectively "for await of but skip what's already consumed".
                while (true) {
                    const { done, value: buildOutput } = await buildIterator.next();
                    if (done) {
                        break;
                    }
                    if (controller.desiredSize === null) {
                        break;
                    }
                    if (buildOutput.kind === results_1.ResultKind.Failure) {
                        if (controller.desiredSize !== null) {
                            try {
                                controller.enqueue({ success: false, message: 'Build failed' });
                            }
                            catch {
                                // Stream controller may already be closed or cancelled
                            }
                        }
                    }
                    else if (buildOutput.kind === results_1.ResultKind.Incremental ||
                        buildOutput.kind === results_1.ResultKind.Full) {
                        if (buildOutput.kind === results_1.ResultKind.Full) {
                            this.latestBuildFiles.files = buildOutput.files;
                        }
                        else {
                            this.latestBuildFiles.files = {
                                ...this.latestBuildFiles.files,
                                ...buildOutput.files,
                            };
                        }
                        await (0, test_files_1.writeTestFiles)(buildOutput.files, buildOptions.outputPath);
                        this.emitter.refreshFiles();
                    }
                }
            })();
        }
        onRunComplete = function (_browsers, results) {
            if (controller.desiredSize !== null) {
                try {
                    controller.enqueue({ success: results.exitCode === 0 });
                }
                catch {
                    // Stream controller may already be closed or cancelled
                }
            }
        };
    }
    karmaConfig.reporters ??= [];
    karmaConfig.reporters.push(reporterName);
    karmaConfig.plugins ??= [];
    karmaConfig.plugins.push({
        [`reporter:${reporterName}`]: [
            'factory',
            Object.assign((...args) => new ProgressNotifierReporter(...args), ProgressNotifierReporter),
        ],
    });
}
//# sourceMappingURL=progress-reporter.js.map