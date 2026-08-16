'use strict';

function noProject(project) {
    return `Unable to find project '${project}' in the workspace`;
}
function unsupportedStyles(styleFilePath) {
    return `Project style file found has unsupported extension: '${styleFilePath}'\nAdding 'bootstrap.min.css' to 'angular.json'`;
}

exports.noProject = noProject;
exports.unsupportedStyles = unsupportedStyles;
