"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCompodoc = void 0;
const node_path_1 = require("node:path");
const common_1 = require("storybook/internal/common");
const rxjs_1 = require("rxjs");
const hasTsConfigArg = (args) => args.indexOf('-p') !== -1;
const hasOutputArg = (args) => args.indexOf('-d') !== -1 || args.indexOf('--output') !== -1;
// relative is necessary to workaround a compodoc issue with
// absolute paths on windows machines
const toRelativePath = (pathToTsConfig) => {
    return (0, node_path_1.isAbsolute)(pathToTsConfig) ? (0, node_path_1.relative)('.', pathToTsConfig) : pathToTsConfig;
};
const runCompodoc = ({ compodocArgs, tsconfig }, context) => {
    return new rxjs_1.Observable((observer) => {
        const tsConfigPath = toRelativePath(tsconfig);
        const finalCompodocArgs = [
            ...(hasTsConfigArg(compodocArgs) ? [] : ['-p', tsConfigPath]),
            ...(hasOutputArg(compodocArgs) ? [] : ['-d', `${context.workspaceRoot || '.'}`]),
            ...compodocArgs,
        ];
        const packageManager = common_1.JsPackageManagerFactory.getPackageManager();
        try {
            const stdout = packageManager.runPackageCommandSync('compodoc', finalCompodocArgs, context.workspaceRoot, 'inherit');
            context.logger.info(stdout);
            observer.next();
            observer.complete();
        }
        catch (e) {
            context.logger.error(e);
            observer.error();
        }
    });
};
exports.runCompodoc = runCompodoc;
