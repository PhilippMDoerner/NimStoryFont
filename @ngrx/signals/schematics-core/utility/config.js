"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspacePath = getWorkspacePath;
exports.getWorkspace = getWorkspace;
const schematics_1 = require("@angular-devkit/schematics");
function getWorkspacePath(host) {
    const possibleFiles = ['/angular.json', '/.angular.json', '/workspace.json'];
    const path = possibleFiles.filter((path) => host.exists(path))[0];
    return path;
}
function getWorkspace(host) {
    const path = getWorkspacePath(host);
    const configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException(`Could not find (${path})`);
    }
    const config = configBuffer.toString();
    return JSON.parse(config);
}
//# sourceMappingURL=config.js.map