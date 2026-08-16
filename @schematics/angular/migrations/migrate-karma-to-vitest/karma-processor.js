"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.processKarmaConfig = processKarmaConfig;
const constants_1 = require("./constants");
const karma_config_analyzer_1 = require("./karma-config-analyzer");
const karma_config_comparer_1 = require("./karma-config-comparer");
function extractReporters(analysis, options, projectName, context) {
    const reporters = analysis.settings.get('reporters');
    if (Array.isArray(reporters)) {
        const mappedReporters = [];
        for (const r of reporters) {
            if (typeof r === 'string') {
                if (r === 'progress') {
                    mappedReporters.push('default');
                }
                else if (r === 'kjhtml') {
                    context.logger.warn(`Project "${projectName}" uses the "kjhtml" reporter. ` +
                        `This has not been automatically mapped. ` +
                        `For an interactive test UI in Vitest, consider setting the "ui" option to true in your test target options ` +
                        `and installing "@vitest/ui".`);
                }
                else if (constants_1.SUPPORTED_REPORTERS.has(r)) {
                    mappedReporters.push(r);
                }
                else {
                    context.logger.warn(`Project "${projectName}" uses a custom Karma reporter "${r}". ` +
                        `This reporter cannot be automatically mapped to Vitest. ` +
                        `Please check the Vitest documentation for equivalent reporters.`);
                }
            }
            else {
                context.logger.warn(`Project "${projectName}" has a non-string reporter in Karma config. ` +
                    `This cannot be automatically mapped to Vitest.`);
            }
        }
        if (mappedReporters.length > 0) {
            options['reporters'] = [...new Set(mappedReporters)];
        }
    }
}
function extractCoverageSettings(analysis, options, projectName, context) {
    const coverageReporter = analysis.settings.get('coverageReporter');
    if (typeof coverageReporter !== 'object' || coverageReporter === null) {
        return;
    }
    // Extract coverage reporters
    const covReporters = coverageReporter['reporters'];
    if (Array.isArray(covReporters)) {
        const mappedCovReporters = [];
        for (const r of covReporters) {
            let type;
            if (typeof r === 'object' && r !== null && 'type' in r) {
                if (typeof r['type'] === 'string') {
                    type = r['type'];
                }
            }
            else if (typeof r === 'string') {
                type = r;
            }
            if (type) {
                if (constants_1.SUPPORTED_COVERAGE_REPORTERS.has(type)) {
                    mappedCovReporters.push(type);
                }
                else {
                    context.logger.warn(`Project "${projectName}" uses a custom coverage reporter "${type}". ` +
                        `This reporter cannot be automatically mapped to Vitest. ` +
                        `Please check the Vitest documentation for equivalent coverage reporters.`);
                }
            }
        }
        if (mappedCovReporters.length > 0) {
            options['coverageReporters'] = [...new Set(mappedCovReporters)];
        }
    }
    // Extract coverage thresholds
    const check = coverageReporter['check'];
    if (typeof check === 'object' && check !== null) {
        const global = check['global'];
        if (typeof global === 'object' && global !== null) {
            const thresholds = {};
            const keys = ['statements', 'branches', 'functions', 'lines'];
            for (const key of keys) {
                const value = global[key];
                if (typeof value === 'number') {
                    thresholds[key] = value;
                }
            }
            if (Object.keys(thresholds).length > 0) {
                options['coverageThresholds'] = {
                    ...thresholds,
                    perFile: false,
                };
            }
        }
    }
}
async function processKarmaConfig(karmaConfig, options, projectName, context, tree, cache, needDevkitPlugin, manualMigrationFiles) {
    let cachedResult = cache.get(karmaConfig);
    if (!cachedResult && tree.exists(karmaConfig)) {
        const content = tree.readText(karmaConfig);
        const analysis = (0, karma_config_analyzer_1.analyzeKarmaConfig)(content);
        let isRemovable = false;
        if (!analysis.hasUnsupportedValues) {
            const diff = await (0, karma_config_comparer_1.compareKarmaConfigToDefault)(analysis, projectName, karmaConfig, needDevkitPlugin);
            isRemovable = !(0, karma_config_comparer_1.hasDifferences)(diff) && diff.isReliable;
        }
        cachedResult = { analysis, isRemovable };
        cache.set(karmaConfig, cachedResult);
    }
    if (cachedResult) {
        extractReporters(cachedResult.analysis, options, projectName, context);
        extractCoverageSettings(cachedResult.analysis, options, projectName, context);
        if (!cachedResult.isRemovable) {
            context.logger.warn(`Project "${projectName}" uses a custom Karma configuration file "${karmaConfig}". ` +
                `Tests have been migrated to use Vitest, but you may need to manually migrate custom settings ` +
                `from this Karma config to a Vitest config (e.g. "vitest-base.config.ts") ` +
                `and set the "runnerConfig" option to true.`);
            manualMigrationFiles.push(karmaConfig);
        }
    }
    delete options['karmaConfig'];
}
//# sourceMappingURL=karma-processor.js.map