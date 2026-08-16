"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const posix_1 = require("node:path/posix");
const typescript_1 = __importDefault(require("typescript"));
const utility_1 = require("../utility");
const ast_utils_1 = require("../utility/ast-utils");
const change_1 = require("../utility/change");
const dependency_1 = require("../utility/dependency");
const ng_ast_utils_1 = require("../utility/ng-ast-utils");
const paths_1 = require("../utility/paths");
const project_1 = require("../utility/project");
const project_targets_1 = require("../utility/project-targets");
const app_config_1 = require("../utility/standalone/app_config");
const util_1 = require("../utility/standalone/util");
const workspace_models_1 = require("../utility/workspace-models");
function addDependencies() {
    return (host) => {
        const coreDep = (0, dependency_1.getDependency)(host, '@angular/core');
        if (!coreDep) {
            throw new schematics_1.SchematicsException('Could not find "@angular/core" version.');
        }
        return (0, utility_1.addDependency)('@angular/service-worker', coreDep.version);
    };
}
function updateAppModule(mainPath) {
    return (host, context) => {
        context.logger.debug('Updating appmodule');
        const modulePath = (0, ng_ast_utils_1.getAppModulePath)(host, mainPath);
        context.logger.debug(`module path: ${modulePath}`);
        addImport(host, modulePath, 'ServiceWorkerModule', '@angular/service-worker');
        addImport(host, modulePath, 'isDevMode', '@angular/core');
        // register SW in application module
        const importText = `
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
    `;
        const moduleSource = getTsSourceFile(host, modulePath);
        const metadataChanges = (0, ast_utils_1.addSymbolToNgModuleMetadata)(moduleSource, modulePath, 'imports', importText);
        if (metadataChanges) {
            const recorder = host.beginUpdate(modulePath);
            (0, change_1.applyToUpdateRecorder)(recorder, metadataChanges);
            host.commitUpdate(recorder);
        }
        return host;
    };
}
function addProvideServiceWorker(projectName, mainPath) {
    return (host) => {
        const bootstrapCall = (0, util_1.findBootstrapApplicationCall)(host, mainPath);
        const appConfig = (0, app_config_1.findAppConfig)(bootstrapCall, host, mainPath)?.filePath || mainPath;
        addImport(host, appConfig, 'isDevMode', '@angular/core');
        return (0, utility_1.addRootProvider)(projectName, ({ code, external }) => code `${external('provideServiceWorker', '@angular/service-worker')}('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })`);
    };
}
function getTsSourceFile(host, path) {
    const content = host.readText(path);
    const source = typescript_1.default.createSourceFile(path, content, typescript_1.default.ScriptTarget.Latest, true);
    return source;
}
const serviceWorkerSchematic = (0, project_1.createProjectSchematic)(async (options, { project, workspace, tree, context: { logger } }) => {
    if (project.extensions.projectType !== 'application') {
        throw new schematics_1.SchematicsException(`Service worker requires a project type of "application".`);
    }
    const buildTarget = project.targets.get('build');
    if (!buildTarget) {
        throw (0, project_targets_1.targetBuildNotFoundError)();
    }
    const buildOptions = buildTarget.options;
    const browserEntryPoint = await (0, util_1.getMainFilePath)(tree, options.project);
    const ngswConfigPath = (0, posix_1.join)(project.root, 'ngsw-config.json');
    if (buildTarget.builder === workspace_models_1.Builders.Application ||
        buildTarget.builder === workspace_models_1.Builders.BuildApplication) {
        const productionConf = buildTarget.configurations?.production;
        if (productionConf) {
            productionConf.serviceWorker = ngswConfigPath;
        }
        else {
            logger.warn('No "production" configuration found for build target. ' +
                `The "serviceWorker" option with a value of "${ngswConfigPath}" will need to be set manually.`);
        }
    }
    else {
        buildOptions.serviceWorker = true;
        buildOptions.ngswConfigPath = ngswConfigPath;
    }
    await (0, utility_1.writeWorkspace)(tree, workspace);
    return (0, schematics_1.chain)([
        addDependencies(),
        (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.applyTemplates)({
                ...options,
                relativePathToWorkspaceRoot: (0, paths_1.relativePathToWorkspaceRoot)(project.root),
            }),
            (0, schematics_1.move)(project.root),
        ])),
        (0, ng_ast_utils_1.isStandaloneApp)(tree, browserEntryPoint)
            ? addProvideServiceWorker(options.project, browserEntryPoint)
            : updateAppModule(browserEntryPoint),
    ]);
});
exports.default = serviceWorkerSchematic;
function addImport(host, filePath, symbolName, moduleName) {
    const moduleSource = getTsSourceFile(host, filePath);
    const change = (0, ast_utils_1.insertImport)(moduleSource, filePath, symbolName, moduleName);
    if (change) {
        const recorder = host.beginUpdate(filePath);
        (0, change_1.applyToUpdateRecorder)(recorder, [change]);
        host.commitUpdate(recorder);
    }
}
//# sourceMappingURL=index.js.map