"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return function (host, context) {
        return (0, schematics_1.chain)((options.entity
            ? [
                (0, schematics_1.schematic)('entity', {
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    flat: options.flat,
                    skipTests: options.skipTests,
                    module: options.module,
                    reducers: options.reducers,
                    group: options.group,
                    feature: true,
                }),
            ]
            : [
                (0, schematics_1.schematic)('action', {
                    flat: options.flat,
                    group: options.group,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTests: options.skipTests,
                    api: options.api,
                    prefix: options.prefix,
                }),
                (0, schematics_1.schematic)('reducer', {
                    flat: options.flat,
                    group: options.group,
                    module: options.module,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTests: options.skipTests,
                    reducers: options.reducers,
                    feature: true,
                    api: options.api,
                    prefix: options.prefix,
                }),
                (0, schematics_1.schematic)('selector', {
                    flat: options.flat,
                    group: options.group,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTests: options.skipTests,
                    feature: true,
                }),
            ]).concat([
            (0, schematics_1.schematic)('effect', {
                flat: options.flat,
                group: options.group,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                skipTests: options.skipTests,
                feature: true,
                api: options.api,
                prefix: options.prefix,
            }),
        ]))(host, context);
    };
}
//# sourceMappingURL=index.js.map