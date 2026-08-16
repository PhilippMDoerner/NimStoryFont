"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const posix_1 = require("node:path/posix");
const util_1 = require("util");
const dependency_1 = require("../../utility/dependency");
const json_file_1 = require("../../utility/json-file");
const latest_versions_1 = require("../../utility/latest-versions");
const workspace_1 = require("../../utility/workspace");
const workspace_models_1 = require("../../utility/workspace-models");
const constants_1 = require("./constants");
const karma_processor_1 = require("./karma-processor");
async function processTestTargetOptions(testTarget, projectName, context, tree, removableKarmaConfigs, customBuildOptions, needDevkitPlugin, manualMigrationFiles) {
    let needsCoverage = false;
    let needsIstanbul = false;
    for (const [configName, options] of (0, workspace_1.allTargetOptions)(testTarget, false)) {
        const configKey = configName || '';
        if (!customBuildOptions[configKey]) {
            // Match Karma behavior where AOT was disabled by default
            customBuildOptions[configKey] = {
                aot: false,
                optimization: false,
                extractLicenses: false,
            };
        }
        // Collect custom build options
        for (const key of constants_1.BUILD_OPTIONS_KEYS) {
            if (options[key] !== undefined) {
                customBuildOptions[configKey][key] = options[key];
                delete options[key];
            }
        }
        // Map Karma options to Unit-Test options
        if (options['codeCoverage'] !== undefined) {
            options['coverage'] = options['codeCoverage'];
            delete options['codeCoverage'];
        }
        if (options['codeCoverageExclude'] !== undefined) {
            options['coverageExclude'] = options['codeCoverageExclude'];
            delete options['codeCoverageExclude'];
        }
        if (options['coverage'] === true || options['coverageExclude'] !== undefined) {
            needsCoverage = true;
        }
        if (options['sourceMap'] !== undefined) {
            context.logger.info(`Project "${projectName}" has "sourceMap" set for tests. ` +
                `In unit-test builder with Vitest, source maps are always enabled. The option has been removed.`);
            delete options['sourceMap'];
        }
        // Convert browser list to array format if it is a comma-separated string
        const browsers = options['browsers'];
        if (typeof browsers === 'string') {
            options['browsers'] = browsers.split(',').map((b) => b.trim());
        }
        else if (browsers === false) {
            options['browsers'] = [];
        }
        const updatedBrowsers = options['browsers'];
        if (Array.isArray(updatedBrowsers) && updatedBrowsers.length > 0) {
            const hasNonChromium = updatedBrowsers.some((b) => {
                if (typeof b !== 'string') {
                    return false;
                }
                const normalized = b.toLowerCase();
                return !['chrome', 'chromium', 'edge'].some((name) => normalized.includes(name));
            });
            if (hasNonChromium) {
                needsIstanbul = true;
            }
            context.logger.info(`Project "${projectName}" has browsers configured for tests. ` +
                `To run tests in a browser with Vitest, you will need to install either ` +
                `"@vitest/browser-playwright" or "@vitest/browser-webdriverio" depending on your preference.`);
        }
        // Check if the karma configuration file can be safely removed and extract settings
        const karmaConfig = options['karmaConfig'];
        if (typeof karmaConfig === 'string') {
            await (0, karma_processor_1.processKarmaConfig)(karmaConfig, options, projectName, context, tree, removableKarmaConfigs, needDevkitPlugin, manualMigrationFiles);
        }
        // Map the main entry file to the setupFiles of the unit-test builder
        const mainFile = options['main'];
        if (typeof mainFile === 'string') {
            options['setupFiles'] = [mainFile];
            context.logger.info(`Project "${projectName}" uses a "main" entry file for tests: "${mainFile}". ` +
                `This has been mapped to the unit-test builder "setupFiles" array. ` +
                `Please ensure you remove any TestBed.initTestEnvironment calls from this file ` +
                `as the builder now handles test environment initialization automatically.`);
        }
        delete options['main'];
    }
    return { needsCoverage, needsIstanbul };
}
function updateTsConfigTypes(tree, tsConfigsToUpdate, context) {
    for (const tsConfigPath of tsConfigsToUpdate) {
        if (tree.exists(tsConfigPath)) {
            try {
                const json = new json_file_1.JSONFile(tree, tsConfigPath);
                const typesPath = ['compilerOptions', 'types'];
                const existingTypes = json.get(typesPath) ?? [];
                const newTypes = existingTypes.filter((t) => t !== 'jasmine');
                if (!newTypes.includes('vitest/globals')) {
                    newTypes.push('vitest/globals');
                }
                if (newTypes.length !== existingTypes.length ||
                    newTypes.some((t, i) => t !== existingTypes[i])) {
                    json.modify(typesPath, newTypes);
                }
            }
            catch (err) {
                context.logger.warn(`Failed to automatically update types in "${tsConfigPath}". ` +
                    `Please manually remove "jasmine" and add "vitest/globals" to compilerOptions.types.`);
            }
        }
    }
}
function logSummary(context, migratedProjects, skippedNonApplications, skippedMissingAppBuilder, manualMigrationFiles) {
    context.logger.info('\n--- Karma to Vitest Migration Summary ---');
    context.logger.info(`Projects migrated: ${migratedProjects.length}`);
    if (migratedProjects.length > 0) {
        context.logger.info(`  - ${migratedProjects.join(', ')}`);
    }
    context.logger.info(`Projects skipped (non-applications): ${skippedNonApplications.length}`);
    if (skippedNonApplications.length > 0) {
        context.logger.info(`  - ${skippedNonApplications.join(', ')}`);
    }
    context.logger.info(`Projects skipped (missing application builder): ${skippedMissingAppBuilder.length}`);
    if (skippedMissingAppBuilder.length > 0) {
        context.logger.info(`  - ${skippedMissingAppBuilder.join(', ')}`);
    }
    const uniqueManualFiles = [...new Set(manualMigrationFiles)];
    if (uniqueManualFiles.length > 0) {
        context.logger.warn(`\nThe following Karma configuration files require manual migration:`);
        for (const file of uniqueManualFiles) {
            context.logger.warn(`  - ${file}`);
        }
    }
    if (migratedProjects.length > 0) {
        context.logger.info(`\nNote: To refactor your test files from Jasmine to Vitest, consider running the following command:` +
            `\n  ng g @schematics/angular:refactor-jasmine-vitest <project_name>`);
    }
    context.logger.info('-----------------------------------------\n');
}
function updateProjects(tree, context) {
    return (0, workspace_1.updateWorkspace)(async (workspace) => {
        let needsCoverage = false;
        let needsIstanbul = false;
        const removableKarmaConfigs = new Map();
        const migratedProjects = [];
        const tsConfigsToUpdate = new Set();
        const skippedNonApplications = [];
        const skippedMissingAppBuilder = [];
        const manualMigrationFiles = [];
        for (const [projectName, project] of workspace.projects) {
            // Restrict to application types for now
            if (project.extensions.projectType !== 'application') {
                skippedNonApplications.push(projectName);
                continue;
            }
            // Check if build target uses the new application builder
            const buildTarget = project.targets.get('build');
            if (!buildTarget || buildTarget.builder !== '@angular/build:application') {
                context.logger.info(`Project "${projectName}" cannot be migrated to Vitest yet. ` +
                    `The project must first be migrated to use the "@angular/build:application" builder.`);
                skippedMissingAppBuilder.push(projectName);
                continue;
            }
            // Find the test target to migrate
            const testTarget = project.targets.get('test');
            if (!testTarget) {
                continue;
            }
            let isKarma = false;
            let needDevkitPlugin = false;
            // Check if target uses Karma builders
            switch (testTarget.builder) {
                case workspace_models_1.Builders.Karma:
                    isKarma = true;
                    needDevkitPlugin = true;
                    break;
                case workspace_models_1.Builders.BuildKarma:
                    isKarma = true;
                    break;
            }
            if (!isKarma) {
                continue;
            }
            // Collect tsConfig paths to perform globals updates
            const baseTsConfig = testTarget.options?.['tsConfig'];
            if (typeof baseTsConfig === 'string') {
                tsConfigsToUpdate.add(baseTsConfig);
            }
            if (testTarget.configurations) {
                for (const config of Object.values(testTarget.configurations)) {
                    if (typeof config?.['tsConfig'] === 'string') {
                        tsConfigsToUpdate.add(config['tsConfig']);
                    }
                }
            }
            // Always include fallback to the default tsconfig.spec.json path
            tsConfigsToUpdate.add((0, posix_1.join)(project.root, 'tsconfig.spec.json'));
            // Store custom build options to move to a new build configuration if needed
            const customBuildOptions = Object.create(null);
            const projectCoverageInfo = await processTestTargetOptions(testTarget, projectName, context, tree, removableKarmaConfigs, customBuildOptions, needDevkitPlugin, manualMigrationFiles);
            if (projectCoverageInfo.needsCoverage) {
                needsCoverage = true;
                if (projectCoverageInfo.needsIstanbul) {
                    needsIstanbul = true;
                }
            }
            // If we have custom build options, create testing configurations
            const baseOptions = buildTarget.options || {};
            for (const [configKey, configOptions] of Object.entries(customBuildOptions)) {
                const finalConfig = {};
                // Omit options that already have the same value in the base build options.
                // Using isDeepStrictEqual for a deep comparison of arrays and objects.
                for (const [key, value] of Object.entries(configOptions)) {
                    if (!(0, util_1.isDeepStrictEqual)(value, baseOptions[key])) {
                        finalConfig[key] = value;
                    }
                }
                if (Object.keys(finalConfig).length > 0) {
                    buildTarget.configurations ??= {};
                    const configurations = buildTarget.configurations;
                    let configName = configKey ? `testing-${configKey}` : 'testing';
                    if (configurations[configName]) {
                        let counter = 1;
                        while (configurations[`${configName}-${counter}`]) {
                            counter++;
                        }
                        configName = `${configName}-${counter}`;
                    }
                    configurations[configName] = finalConfig;
                    if (configKey === '') {
                        testTarget.options ??= {};
                        testTarget.options['buildTarget'] = `:build:${configName}`;
                    }
                    else {
                        testTarget.configurations ??= {};
                        testTarget.configurations[configKey] ??= {};
                        testTarget.configurations[configKey]['buildTarget'] = `:build:${configName}`;
                    }
                }
            }
            // Update builder
            testTarget.builder = '@angular/build:unit-test';
            testTarget.options ??= {};
            testTarget.options['runner'] = 'vitest';
            migratedProjects.push(projectName);
        }
        // Perform cleanup of removable karma config files
        for (const [configPath, result] of removableKarmaConfigs) {
            if (result.isRemovable && tree.exists(configPath)) {
                tree.delete(configPath);
            }
        }
        // Update TSConfig files to use Vitest types instead of Jasmine
        updateTsConfigTypes(tree, tsConfigsToUpdate, context);
        // Log summary
        logSummary(context, migratedProjects, skippedNonApplications, skippedMissingAppBuilder, manualMigrationFiles);
        if (migratedProjects.length > 0) {
            const rules = [
                (0, dependency_1.addDependency)('vitest', latest_versions_1.latestVersions['vitest'], {
                    type: dependency_1.DependencyType.Dev,
                    existing: dependency_1.ExistingBehavior.Skip,
                }),
            ];
            if (needsCoverage) {
                rules.push((0, dependency_1.addDependency)('@vitest/coverage-v8', latest_versions_1.latestVersions['@vitest/coverage-v8'], {
                    type: dependency_1.DependencyType.Dev,
                    existing: dependency_1.ExistingBehavior.Skip,
                }));
                if (needsIstanbul) {
                    rules.push((0, dependency_1.addDependency)('@vitest/coverage-istanbul', latest_versions_1.latestVersions['@vitest/coverage-istanbul'], {
                        type: dependency_1.DependencyType.Dev,
                        existing: dependency_1.ExistingBehavior.Skip,
                    }));
                }
            }
            return (0, schematics_1.chain)(rules);
        }
    });
}
function default_1() {
    return updateProjects;
}
//# sourceMappingURL=migration.js.map