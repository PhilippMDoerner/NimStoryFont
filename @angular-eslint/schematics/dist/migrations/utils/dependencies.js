"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDependencies = updateDependencies;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const utils_1 = require("../../utils");
function updateDependencies(depsToUpdate) {
    return (0, schematics_1.chain)([
        (0, utils_1.updateJsonInTree)('package.json', (json) => {
            for (const { packageName, version } of depsToUpdate) {
                updateIfExists(json, packageName, version);
            }
            return json;
        }),
        (_, context) => {
            context.addTask(new tasks_1.NodePackageInstallTask());
        },
    ]);
}
function updateIfExists(packageJson, depName, updatedVersion) {
    if (!packageJson) {
        return;
    }
    if (packageJson.dependencies && packageJson.dependencies[depName]) {
        packageJson.dependencies[depName] = updatedVersion;
    }
    if (packageJson.devDependencies && packageJson.devDependencies[depName]) {
        packageJson.devDependencies[depName] = updatedVersion;
    }
}
