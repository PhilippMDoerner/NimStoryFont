"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = getProject;
exports.getProjectPath = getProjectPath;
exports.isLib = isLib;
exports.getProjectMainFile = getProjectMainFile;
const config_1 = require("./config");
const schematics_1 = require("@angular-devkit/schematics");
function getProject(host, options) {
    const workspace = (0, config_1.getWorkspace)(host);
    if (!options.project) {
        const defaultProject = workspace
            .defaultProject;
        options.project =
            defaultProject !== undefined
                ? defaultProject
                : Object.keys(workspace.projects)[0];
    }
    return workspace.projects[options.project];
}
function getProjectPath(host, options) {
    const project = getProject(host, options);
    if (project.root.slice(-1) === '/') {
        project.root = project.root.substring(0, project.root.length - 1);
    }
    if (options.path === undefined) {
        const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
        return `${project.root ? `/${project.root}` : ''}/src/${projectDirName}`;
    }
    return options.path;
}
function isLib(host, options) {
    const project = getProject(host, options);
    return project.projectType === 'library';
}
function getProjectMainFile(host, options) {
    if (isLib(host, options)) {
        throw new schematics_1.SchematicsException(`Invalid project type`);
    }
    const project = getProject(host, options);
    const projectOptions = project.architect['build'].options;
    if (!projectOptions?.main && !projectOptions?.browser) {
        throw new schematics_1.SchematicsException(`Could not find the main file ${project}`);
    }
    return (projectOptions.browser || projectOptions.main);
}
//# sourceMappingURL=project.js.map