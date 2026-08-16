"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const schematics_core_1 = require("../../schematics-core");
function addModuleToPackageJson() {
    return (host, context) => {
        (0, schematics_core_1.addPackageToPackageJson)(host, 'dependencies', '@ngrx/signals', schematics_core_1.platformVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
function default_1(options) {
    return (host, context) => {
        return (0, schematics_1.chain)([
            options && options.skipPackageJson ? (0, schematics_1.noop)() : addModuleToPackageJson(),
        ])(host, context);
    };
}
//# sourceMappingURL=index.js.map