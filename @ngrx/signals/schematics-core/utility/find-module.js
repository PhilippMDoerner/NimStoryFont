"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findModuleFromOptions = findModuleFromOptions;
exports.findModule = findModule;
exports.buildRelativePath = buildRelativePath;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
/**
 * Find the module referred by a set of options passed to the schematics.
 */
function findModuleFromOptions(host, options) {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }
    if (!options.module) {
        const pathToCheck = (options.path || '') +
            (options.flat ? '' : '/' + core_1.strings.dasherize(options.name));
        return (0, core_1.normalize)(findModule(host, pathToCheck));
    }
    else {
        const modulePath = (0, core_1.normalize)('/' + options.path + '/' + options.module);
        const moduleBaseName = (0, core_1.normalize)(modulePath).split('/').pop();
        if (host.exists(modulePath)) {
            return (0, core_1.normalize)(modulePath);
        }
        else if (host.exists(modulePath + '.ts')) {
            return (0, core_1.normalize)(modulePath + '.ts');
        }
        else if (host.exists(modulePath + '.module.ts')) {
            return (0, core_1.normalize)(modulePath + '.module.ts');
        }
        else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
            return (0, core_1.normalize)(modulePath + '/' + moduleBaseName + '.module.ts');
        }
        else if (host.exists(modulePath + '-module.ts')) {
            return (0, core_1.normalize)(modulePath + '-module.ts');
        }
        else if (host.exists(modulePath + '/' + moduleBaseName + '-module.ts')) {
            return (0, core_1.normalize)(modulePath + '/' + moduleBaseName + '-module.ts');
        }
        else {
            throw new Error(`Specified module path ${modulePath} does not exist`);
        }
    }
}
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir) {
    let dir = host.getDir('/' + generateDir);
    const moduleRe = /(\.|-)module\.ts$/;
    const routingModuleRe = /-routing(\.|-)module\.ts/;
    while (dir) {
        const matches = dir.subfiles.filter((p) => moduleRe.test(p) && !routingModuleRe.test(p));
        if (matches.length == 1) {
            return (0, core_1.join)(dir.path, matches[0]);
        }
        else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing ' +
                'the component into the closest module.');
        }
        dir = dir.parent;
    }
    throw new Error('Could not find an NgModule. Use the skip-import ' +
        'option to skip importing in NgModule.');
}
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    const { path: fromPath, filename: fromFileName, directory: fromDirectory, } = parsePath(from);
    const { path: toPath, filename: toFileName, directory: toDirectory, } = parsePath(to);
    const relativePath = (0, core_1.relative)(fromDirectory, toDirectory);
    const fixedRelativePath = relativePath.startsWith('.')
        ? relativePath
        : `./${relativePath}`;
    return !toFileName || toFileName === 'index.ts'
        ? fixedRelativePath
        : `${fixedRelativePath.endsWith('/')
            ? fixedRelativePath
            : fixedRelativePath + '/'}${convertToTypeScriptFileName(toFileName)}`;
}
function parsePath(path) {
    const pathNormalized = (0, core_1.normalize)(path);
    const filename = (0, core_1.extname)(pathNormalized) ? (0, core_1.basename)(pathNormalized) : '';
    const directory = filename ? (0, core_1.dirname)(pathNormalized) : pathNormalized;
    return {
        path: pathNormalized,
        filename,
        directory,
    };
}
/**
 * Strips the typescript extension and clears index filenames
 * foo.ts -> foo
 * index.ts -> empty
 */
function convertToTypeScriptFileName(filename) {
    return filename ? filename.replace(/(\.ts)|(index\.ts)$/, '') : '';
}
//# sourceMappingURL=find-module.js.map