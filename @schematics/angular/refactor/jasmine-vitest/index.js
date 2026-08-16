"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const posix_1 = require("node:path/posix");
const workspace_1 = require("../../utility/workspace");
const test_file_transformer_1 = require("./test-file-transformer");
const refactor_reporter_1 = require("./utils/refactor-reporter");
async function getProject(tree, projectName) {
    const workspace = await (0, workspace_1.getWorkspace)(tree);
    if (projectName) {
        const project = workspace.projects.get(projectName);
        if (!project) {
            throw new schematics_1.SchematicsException(`Project "${projectName}" not found.`);
        }
        return { project, name: projectName };
    }
    if (workspace.projects.size === 1) {
        const [name, project] = Array.from(workspace.projects.entries())[0];
        return { project, name };
    }
    const projectNames = Array.from(workspace.projects.keys());
    throw new schematics_1.SchematicsException(`Multiple projects found: [${projectNames.join(', ')}]. Please specify a project name.`);
}
const DIRECTORIES_TO_SKIP = new Set(['node_modules', '.git', 'dist', '.angular']);
function findTestFiles(directory, fileSuffix) {
    const files = [];
    const stack = [directory];
    let current;
    while ((current = stack.pop())) {
        for (const path of current.subfiles) {
            if (path.endsWith(fileSuffix)) {
                files.push(current.path + '/' + path);
            }
        }
        for (const path of current.subdirs) {
            if (DIRECTORIES_TO_SKIP.has(path)) {
                continue;
            }
            stack.push(current.dir(path));
        }
    }
    return files;
}
function default_1(options) {
    return async (tree, context) => {
        const reporter = new refactor_reporter_1.RefactorReporter(context.logger);
        const { project, name: projectName } = await getProject(tree, options.project);
        const projectRoot = project.root;
        const fileSuffix = options.fileSuffix ?? '.spec.ts';
        let files;
        let searchScope;
        if (options.include) {
            const normalizedInclude = options.include.replace(/\\/g, '/');
            const includePath = (0, posix_1.normalize)((0, posix_1.join)(projectRoot, normalizedInclude));
            searchScope = options.include;
            let dirEntry = null;
            try {
                dirEntry = tree.getDir(includePath);
            }
            catch {
                // Path is not a directory.
            }
            // Approximation of a directory exists check
            if (dirEntry && (dirEntry.subdirs.length > 0 || dirEntry.subfiles.length > 0)) {
                // It is a directory
                files = findTestFiles(dirEntry, fileSuffix);
            }
            else if (tree.exists(includePath)) {
                // It is a file
                files = [includePath];
            }
            else {
                throw new schematics_1.SchematicsException(`The specified include path '${options.include}' does not exist.`);
            }
        }
        else {
            searchScope = `project '${projectName}'`;
            files = findTestFiles(tree.getDir(projectRoot), fileSuffix);
        }
        if (files.length === 0) {
            throw new schematics_1.SchematicsException(`No files ending with '${fileSuffix}' found in ${searchScope}.`);
        }
        for (const file of files) {
            reporter.incrementScannedFiles();
            const content = tree.readText(file);
            const newContent = (0, test_file_transformer_1.transformJasmineToVitest)(file, content, reporter, {
                addImports: !!options.addImports,
                browserMode: !!options.browserMode,
                fakeAsync: !!options.fakeAsync,
            });
            if (content !== newContent) {
                tree.overwrite(file, newContent);
                reporter.incrementTransformedFiles();
            }
        }
        if (options.report) {
            const reportContent = reporter.generateReportContent();
            tree.create(`jasmine-vitest-${new Date().toISOString().replaceAll(/[-:.]/g, '')}.md`, reportContent);
        }
        reporter.printSummary(options.verbose);
    };
}
//# sourceMappingURL=index.js.map