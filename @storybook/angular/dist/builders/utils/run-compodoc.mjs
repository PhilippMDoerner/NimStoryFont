import { isAbsolute, relative } from 'node:path';
import { JsPackageManagerFactory } from 'storybook/internal/common';
import { Observable } from 'rxjs';
const hasTsConfigArg = (args) => args.indexOf('-p') !== -1;
const hasOutputArg = (args) => args.indexOf('-d') !== -1 || args.indexOf('--output') !== -1;
// relative is necessary to workaround a compodoc issue with
// absolute paths on windows machines
const toRelativePath = (pathToTsConfig) => {
    return isAbsolute(pathToTsConfig) ? relative('.', pathToTsConfig) : pathToTsConfig;
};
export const runCompodoc = ({ compodocArgs, tsconfig }, context) => {
    return new Observable((observer) => {
        const tsConfigPath = toRelativePath(tsconfig);
        const finalCompodocArgs = [
            ...(hasTsConfigArg(compodocArgs) ? [] : ['-p', tsConfigPath]),
            ...(hasOutputArg(compodocArgs) ? [] : ['-d', `${context.workspaceRoot || '.'}`]),
            ...compodocArgs,
        ];
        const packageManager = JsPackageManagerFactory.getPackageManager();
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
