'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var schematics = require('@angular-devkit/schematics');
var tasks = require('@angular-devkit/schematics/tasks');
var utility = require('@schematics/angular/utility');
var messages = require('../messages-Coq8X1sU.js');

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => (result[key] = obj[key]) && result, {});
}
/**
 * Adds a package to the package.json in the given tree
 */
function addPackageToPackageJson(tree, pkg, version, devDependency = false) {
    if (tree.exists('package.json')) {
        const sourceText = tree.read('package.json').toString('utf-8');
        const json = JSON.parse(sourceText);
        const dependenciesType = devDependency ? 'devDependencies' : 'dependencies';
        const dependencies = json[dependenciesType] || {};
        if (!dependencies[pkg]) {
            dependencies[pkg] = version;
            json[dependenciesType] = sortObjectByKeys(dependencies);
        }
        tree.overwrite('package.json', JSON.stringify(json, null, 2));
    }
    return tree;
}
/**
 * Gets the version of the specified package by looking at the package.json in the given tree
 */
function getPackageVersionFromPackageJson(tree, name, includeDevDependencies = false) {
    if (!tree.exists('package.json')) {
        return null;
    }
    const packageJson = JSON.parse(tree.read('package.json').toString('utf8'));
    if (packageJson.dependencies && packageJson.dependencies[name]) {
        return packageJson.dependencies[name];
    }
    if (includeDevDependencies && packageJson.devDependencies && packageJson.devDependencies[name]) {
        return packageJson.devDependencies[name];
    }
    return null;
}

/**
 * This is executed when `ng add @ng-bootstrap/ng-bootstrap` is run.
 * It installs all dependencies in the 'package.json' and runs 'ng-add-setup-project' schematic.
 */
function ngAdd(options) {
    return async (tree, context) => {
        // Checking that project exists
        const { project } = options;
        if (project) {
            const workspace = await utility.readWorkspace(tree);
            const projectWorkspace = workspace.projects.get(project);
            if (!projectWorkspace) {
                throw new schematics.SchematicsException(messages.noProject(project));
            }
        }
        // Installing dependencies
        const angularCoreVersion = getPackageVersionFromPackageJson(tree, '@angular/core');
        const angularLocalizeVersion = getPackageVersionFromPackageJson(tree, '@angular/localize', true);
        addPackageToPackageJson(tree, 'bootstrap', "^5.3.3");
        addPackageToPackageJson(tree, '@popperjs/core', "^2.11.8");
        if (angularLocalizeVersion === null) {
            addPackageToPackageJson(tree, '@angular/localize', angularCoreVersion, true);
        }
        context.addTask(new tasks.RunSchematicTask('ng-add-setup-project', options), [
            context.addTask(new tasks.NodePackageInstallTask()),
        ]);
    };
}

exports.default = ngAdd;
