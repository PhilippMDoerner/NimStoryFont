"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findComponentFromOptions = findComponentFromOptions;
exports.findComponent = findComponent;
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
 * Find the component referred by a set of options passed to the schematics.
 */
function findComponentFromOptions(host, options) {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }
    if (!options.component) {
        const pathToCheck = (options.path || '') +
            (options.flat ? '' : '/' + core_1.strings.dasherize(options.name));
        return (0, core_1.normalize)(findComponent(host, pathToCheck));
    }
    else {
        const componentPath = (0, core_1.normalize)('/' + options.path + '/' + options.component);
        const componentBaseName = (0, core_1.normalize)(componentPath).split('/').pop();
        if (host.exists(componentPath)) {
            return (0, core_1.normalize)(componentPath);
        }
        else if (host.exists(componentPath + '.ts')) {
            return (0, core_1.normalize)(componentPath + '.ts');
        }
        else if (host.exists(componentPath + '.component.ts')) {
            return (0, core_1.normalize)(componentPath + '.component.ts');
        }
        else if (host.exists(componentPath + '/' + componentBaseName + '.component.ts')) {
            return (0, core_1.normalize)(componentPath + '/' + componentBaseName + '.component.ts');
        }
        else {
            throw new Error(`Specified component path ${componentPath} does not exist`);
        }
    }
}
/**
 * Function to find the "closest" component to a generated file's path.
 */
function findComponent(host, generateDir) {
    let dir = host.getDir('/' + generateDir);
    const componentRe = /\.component\.ts$/;
    while (dir) {
        const matches = dir.subfiles.filter((p) => componentRe.test(p));
        if (matches.length == 1) {
            return (0, core_1.join)(dir.path, matches[0]);
        }
        else if (matches.length > 1) {
            throw new Error('More than one component matches. Use skip-import option to skip importing ' +
                'the component store into the closest component.');
        }
        dir = dir.parent;
    }
    throw new Error('Could not find an Component. Use the skip-import ' +
        'option to skip importing in Component.');
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
//# sourceMappingURL=find-component.js.map