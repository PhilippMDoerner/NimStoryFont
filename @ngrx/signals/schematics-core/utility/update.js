"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackage = updatePackage;
const schematics_1 = require("@angular-devkit/schematics");
function updatePackage(name) {
    return (tree, context) => {
        const pkgPath = '/package.json';
        const buffer = tree.read(pkgPath);
        if (buffer === null) {
            throw new schematics_1.SchematicsException('Could not read package.json');
        }
        const content = buffer.toString();
        const pkg = JSON.parse(content);
        if (pkg === null || typeof pkg !== 'object' || Array.isArray(pkg)) {
            throw new schematics_1.SchematicsException('Error reading package.json');
        }
        const dependencyCategories = ['dependencies', 'devDependencies'];
        dependencyCategories.forEach((category) => {
            const packageName = `@ngrx/${name}`;
            if (pkg[category] && pkg[category][packageName]) {
                const firstChar = pkg[category][packageName][0];
                const suffix = match(firstChar, '^') || match(firstChar, '~');
                pkg[category][packageName] = `${suffix}6.0.0`;
            }
        });
        tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
        return tree;
    };
}
function match(value, test) {
    return value === test ? test : '';
}
//# sourceMappingURL=update.js.map