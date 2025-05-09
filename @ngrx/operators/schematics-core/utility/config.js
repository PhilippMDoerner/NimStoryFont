"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspacePath = getWorkspacePath;
exports.getWorkspace = getWorkspace;
var schematics_1 = require("@angular-devkit/schematics");
function getWorkspacePath(host) {
    var possibleFiles = ['/angular.json', '/.angular.json', '/workspace.json'];
    var path = possibleFiles.filter(function (path) { return host.exists(path); })[0];
    return path;
}
function getWorkspace(host) {
    var path = getWorkspacePath(host);
    var configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException("Could not find (".concat(path, ")"));
    }
    var config = configBuffer.toString();
    return JSON.parse(config);
}
//# sourceMappingURL=config.js.map