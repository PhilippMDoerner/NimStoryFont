"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
function updateSchematicCollections(host) {
    var workspace = (0, schematics_core_1.getWorkspace)(host);
    var path = (0, schematics_core_1.getWorkspacePath)(host);
    workspace.cli = workspace.cli || {};
    workspace.cli.schematicCollections = workspace.cli.schematicCollections || [];
    if (workspace.cli.defaultCollection) {
        workspace.cli.schematicCollections.push(workspace.cli.defaultCollection);
        delete workspace.cli.defaultCollection;
    }
    workspace.cli.schematicCollections.push('@ngrx/schematics');
    host.overwrite(path, JSON.stringify(workspace, null, 2));
}
function updateWorkspaceCli() {
    return function (host) {
        updateSchematicCollections(host);
        return host;
    };
}
function default_1() {
    return function (host, context) {
        return (0, schematics_1.chain)([updateWorkspaceCli()])(host, context);
    };
}
//# sourceMappingURL=index.js.map