"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDependencyType = void 0;
exports.addPackageJsonDependency = addPackageJsonDependency;
exports.removePackageJsonDependency = removePackageJsonDependency;
exports.getPackageJsonDependency = getPackageJsonDependency;
exports.addTestRunnerDependencies = addTestRunnerDependencies;
const schema_1 = require("../ng-new/schema");
const dependency_1 = require("./dependency");
const json_file_1 = require("./json-file");
const latest_versions_1 = require("./latest-versions");
const PKG_JSON_PATH = '/package.json';
var NodeDependencyType;
(function (NodeDependencyType) {
    NodeDependencyType["Default"] = "dependencies";
    NodeDependencyType["Dev"] = "devDependencies";
    NodeDependencyType["Peer"] = "peerDependencies";
    NodeDependencyType["Optional"] = "optionalDependencies";
})(NodeDependencyType || (exports.NodeDependencyType = NodeDependencyType = {}));
const ALL_DEPENDENCY_TYPE = [
    NodeDependencyType.Default,
    NodeDependencyType.Dev,
    NodeDependencyType.Optional,
    NodeDependencyType.Peer,
];
function addPackageJsonDependency(tree, dependency, pkgJsonPath = PKG_JSON_PATH) {
    const json = new json_file_1.JSONFile(tree, pkgJsonPath);
    const { overwrite, type, name, version } = dependency;
    const path = [type, name];
    if (overwrite || !json.get(path)) {
        json.modify(path, version);
    }
}
function removePackageJsonDependency(tree, name, pkgJsonPath = PKG_JSON_PATH) {
    const json = new json_file_1.JSONFile(tree, pkgJsonPath);
    for (const depType of ALL_DEPENDENCY_TYPE) {
        json.remove([depType, name]);
    }
}
function getPackageJsonDependency(tree, name, pkgJsonPath = PKG_JSON_PATH) {
    const json = new json_file_1.JSONFile(tree, pkgJsonPath);
    for (const depType of ALL_DEPENDENCY_TYPE) {
        const version = json.get([depType, name]);
        if (typeof version === 'string') {
            return {
                type: depType,
                name: name,
                version,
            };
        }
    }
    return null;
}
function addTestRunnerDependencies(testRunner, skipInstall) {
    const dependencies = testRunner === schema_1.TestRunner.Vitest
        ? ['vitest', 'jsdom']
        : [
            'karma',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-jasmine-html-reporter',
            'jasmine-core',
            '@types/jasmine',
            'istanbul-lib-instrument',
        ];
    return dependencies.map((name) => (0, dependency_1.addDependency)(name, latest_versions_1.latestVersions[name], {
        type: dependency_1.DependencyType.Dev,
        existing: dependency_1.ExistingBehavior.Skip,
        install: skipInstall ? dependency_1.InstallBehavior.None : dependency_1.InstallBehavior.Auto,
    }));
}
//# sourceMappingURL=dependencies.js.map