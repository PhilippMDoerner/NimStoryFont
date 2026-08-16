'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var schematics = require('@angular-devkit/schematics');
var path = require('path');
var messages = require('../messages-BL7pjewd.js');
var core = require('@angular-devkit/core');
var utility = require('@schematics/angular/utility');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

// Regular expression that matches all possible Angular CLI default style files
const defaultStyleFileRegex = /styles\.(c|le|sc|sa)ss/;
// Regular expression that matches all files that have a proper stylesheet extension
const validStyleFileRegex = /\.(c|le|sc|sa)ss/;
/**
 * Resolves options for the build target of the given project
 */
function getProjectTargetOptions(project, buildTarget) {
    const buildTargetObject = project.targets.get(buildTarget);
    if (buildTargetObject && buildTargetObject.options) {
        return buildTargetObject.options;
    }
    throw new schematics.SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
}
/**
 * Gets a style file with the given extension in a project and returns its path. If no
 * extension is specified, any style file with a valid extension will be returned.
 */
function getProjectStyleFile(project, extension) {
    const buildOptions = getProjectTargetOptions(project, 'build');
    if (buildOptions.styles && Array.isArray(buildOptions.styles) && buildOptions.styles.length) {
        const styles = buildOptions.styles.map((s) => (typeof s === 'string' ? s : s['input']));
        // Look for the default style file that is generated for new projects by the Angular CLI. This
        // default style file is usually called `styles.ext` unless it has been changed explicitly.
        const defaultMainStylePath = styles.find((file) => defaultStyleFileRegex.test(file));
        if (defaultMainStylePath) {
            return core.normalize(defaultMainStylePath);
        }
        // If no default style file could be found, use the first style file that matches the given
        // extension. If no extension specified explicitly, we look for any file with a valid style
        // file extension.
        const fallbackStylePath = styles.find((file) => validStyleFileRegex.test(file));
        if (fallbackStylePath) {
            return core.normalize(fallbackStylePath);
        }
    }
    return null;
}

const BOOTSTRAP_CSS_FILEPATH = 'node_modules/bootstrap/dist/css/bootstrap.min.css';
const SUPPORTED_BOOTSTRAP_STYLE_IMPORTS = {
    '.sass': `
/* Importing Bootstrap SCSS file. */
@import 'bootstrap/scss/bootstrap'
`,
    '.scss': `
/* Importing Bootstrap SCSS file. */
@import 'bootstrap/scss/bootstrap';
`,
};
/**
 * Adding bootstrap either to 'styles.scss' or 'styles.sass'
 * If not possible, we're simply adding 'bootstrap.css' to the 'angular.json'
 */
function addBootstrapStyles(options) {
    return async (host, context) => {
        const workspace = await utility.readWorkspace(host);
        const projectName = options.project || workspace.extensions.defaultProject.toString();
        const project = workspace.projects.get(projectName);
        if (!project) {
            throw new schematics.SchematicsException(messages.noProject(projectName));
        }
        const styleFilePath = getProjectStyleFile(project) || '';
        const styleFileExtension = path__namespace.extname(styleFilePath);
        const styleFilePatch = SUPPORTED_BOOTSTRAP_STYLE_IMPORTS[styleFileExtension];
        // found supported styles
        if (styleFilePatch) {
            return addBootstrapToStylesFile(styleFilePath, styleFilePatch);
        }
        else {
            // found some styles, but unsupported
            if (styleFileExtension !== '.css' && styleFileExtension !== '') {
                context.logger.warn(messages.unsupportedStyles(styleFilePath));
            }
            // just patching 'angular.json'
            addBootstrapToAngularJson(project);
            await utility.writeWorkspace(host, workspace);
        }
    };
}
/**
 * Patches 'styles.scss' or 'styles.sass' to add Bootstrap snippet
 */
function addBootstrapToStylesFile(styleFilePath, styleFilePatch) {
    return (host) => {
        const styleContent = host.read(styleFilePath).toString('utf-8');
        const recorder = host.beginUpdate(styleFilePath);
        recorder.insertRight(styleContent.length, styleFilePatch);
        host.commitUpdate(recorder);
    };
}
/**
 * Patches 'angular.json' to add 'bootstrap.css' styles
 */
function addBootstrapToAngularJson(project) {
    const targetOptions = getProjectTargetOptions(project, 'build');
    const styles = targetOptions.styles;
    if (!styles) {
        targetOptions.styles = [BOOTSTRAP_CSS_FILEPATH];
    }
    else {
        const existingStyles = styles.map((s) => (typeof s === 'string' ? s : s['input']));
        for (const [, stylePath] of existingStyles.entries()) {
            // If the given asset is already specified in the styles, we don't need to do anything.
            if (stylePath === BOOTSTRAP_CSS_FILEPATH) {
                return;
            }
        }
        styles.unshift(BOOTSTRAP_CSS_FILEPATH);
    }
}

const NG_BOOTSTRAP_MODULE_NAME = 'NgbModule';
const NG_BOOTSTRAP_PACKAGE_NAME = '@ng-bootstrap/ng-bootstrap';
/**
 * Patches main application module by adding 'NgbModule' import.
 */
function addNgbModuleToAppModule(options) {
    return utility.addRootImport(options.project, ({ code, external }) => code `${external(NG_BOOTSTRAP_MODULE_NAME, NG_BOOTSTRAP_PACKAGE_NAME)}`);
}

/**
 * Sets up a project with all required to run ng-bootstrap.
 * This is run after 'package.json' was patched and all dependencies installed
 */
function ngAddSetupProject(options) {
    return schematics.chain([
        addNgbModuleToAppModule(options),
        addBootstrapStyles(options),
        schematics.externalSchematic('@angular/localize', 'ng-add', options.project ? { project: options.project } : {}),
    ]);
}

exports.default = ngAddSetupProject;
