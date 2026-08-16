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
const node_assert_1 = __importDefault(require("node:assert"));
const posix_1 = require("node:path/posix");
const utility_1 = require("../utility");
const json_file_1 = require("../utility/json-file");
const latest_versions_1 = require("../utility/latest-versions");
const project_1 = require("../utility/project");
const TAILWIND_DEPENDENCIES = ['tailwindcss', '@tailwindcss/postcss', 'postcss'];
const POSTCSS_CONFIG_FILES = ['.postcssrc.json', 'postcss.config.json'];
function addTailwindStyles(options, project) {
    return async (tree) => {
        const buildTarget = project.targets.get('build');
        if (!buildTarget) {
            throw new schematics_1.SchematicsException(`Project "${options.project}" does not have a build target.`);
        }
        const styles = buildTarget.options?.['styles'];
        let stylesheetPath;
        if (styles) {
            stylesheetPath = styles
                .map((s) => (typeof s === 'string' ? s : s.input))
                .find((p) => p.endsWith('.css'));
        }
        if (!stylesheetPath) {
            const newStylesheetPath = (0, posix_1.join)(project.sourceRoot ?? 'src', 'tailwind.css');
            tree.create(newStylesheetPath, `@import 'tailwindcss';\n`);
            return (0, utility_1.updateWorkspace)((workspace) => {
                const project = workspace.projects.get(options.project);
                if (project) {
                    const buildTarget = project.targets.get('build');
                    (0, node_assert_1.default)(buildTarget, 'Build target should still be present');
                    // Update main styles
                    const buildOptions = buildTarget.options;
                    (0, node_assert_1.default)(buildOptions, 'Build options should still be present');
                    const existingStyles = buildOptions['styles'] ?? [];
                    buildOptions['styles'] = [newStylesheetPath, ...existingStyles];
                    // Update configuration styles
                    if (buildTarget.configurations) {
                        for (const config of Object.values(buildTarget.configurations)) {
                            if (config && 'styles' in config) {
                                const existingStyles = config['styles'] ?? [];
                                config['styles'] = [newStylesheetPath, ...existingStyles];
                            }
                        }
                    }
                }
            });
        }
        else {
            let stylesheetContent = tree.readText(stylesheetPath);
            if (!/@import ["']tailwindcss["'];/.test(stylesheetContent)) {
                stylesheetContent += `\n@import 'tailwindcss';\n`;
                tree.overwrite(stylesheetPath, stylesheetContent);
            }
        }
    };
}
function managePostCssConfiguration(project) {
    return async (tree) => {
        const searchPaths = ['/', project.root]; // Workspace root and project root
        for (const path of searchPaths) {
            for (const configFile of POSTCSS_CONFIG_FILES) {
                const fullPath = (0, posix_1.join)(path, configFile);
                if (tree.exists(fullPath)) {
                    const postcssConfig = new json_file_1.JSONFile(tree, fullPath);
                    const tailwindPluginPath = ['plugins', '@tailwindcss/postcss'];
                    if (postcssConfig.get(tailwindPluginPath) === undefined) {
                        postcssConfig.modify(tailwindPluginPath, {});
                    }
                    // Config found and handled
                    return;
                }
            }
        }
        // No existing config found, so create one from the template
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.applyTemplates)({
                ...schematics_1.strings,
            }),
            (0, schematics_1.move)(project.root),
        ]);
        return (0, schematics_1.mergeWith)(templateSource);
    };
}
const tailwindSchematic = (0, project_1.createProjectSchematic)((options, { project }) => {
    return (0, schematics_1.chain)([
        addTailwindStyles(options, project),
        managePostCssConfiguration(project),
        ...TAILWIND_DEPENDENCIES.map((name) => (0, utility_1.addDependency)(name, latest_versions_1.latestVersions[name], {
            type: utility_1.DependencyType.Dev,
            existing: utility_1.ExistingBehavior.Skip,
            install: options.skipInstall ? utility_1.InstallBehavior.None : utility_1.InstallBehavior.Auto,
        })),
    ]);
});
exports.default = tailwindSchematic;
//# sourceMappingURL=index.js.map