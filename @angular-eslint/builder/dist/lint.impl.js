"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const fs_1 = require("fs");
const path_1 = require("path");
const eslint_utils_1 = require("./utils/eslint-utils");
exports.default = (0, architect_1.createBuilder)(async (options, context) => {
    try {
        const systemRoot = context.workspaceRoot;
        // eslint resolves files relative to the current working directory.
        // We want these paths to always be resolved relative to the workspace
        // root to be able to run the lint executor from any subfolder.
        process.chdir(systemRoot);
        // Resolve all relevant project metadata from the context
        let projectName = '<???>';
        let projectMetadata;
        let projectRoot = '';
        try {
            projectMetadata = await context.getProjectMetadata(context.target?.project ?? '');
            projectRoot = projectMetadata?.root ?? '';
            projectName =
                projectMetadata?.name ?? context.target?.project ?? '<???>';
        }
        catch {
            /* empty */
        }
        const printInfo = options.format && !options.silent;
        if (printInfo) {
            console.info(`\nLinting ${JSON.stringify(projectName)}...`);
        }
        const eslintConfigPath = options.eslintConfig
            ? (0, path_1.resolve)(systemRoot, options.eslintConfig)
            : undefined;
        options.cacheLocation = options.cacheLocation
            ? (0, path_1.join)(options.cacheLocation, projectName)
            : null;
        options.applySuppressions = options.applySuppressions ?? false;
        options.suppressionsLocation = options.suppressionsLocation
            ? (0, path_1.resolve)(systemRoot, options.suppressionsLocation)
            : null;
        const { eslint, ESLint } = await (0, eslint_utils_1.resolveAndInstantiateESLint)(eslintConfigPath, options);
        let lintResults = [];
        try {
            lintResults = await eslint.lintFiles(options.lintFilePatterns);
        }
        catch (err) {
            if (err instanceof Error &&
                err.message.includes('You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser')) {
                let eslintConfigPathForError = `for ${projectName}`;
                if (projectRoot) {
                    eslintConfigPathForError =
                        resolveESLintConfigPath(projectRoot) ?? '';
                }
                console.error(`
Error: You have attempted to use a lint rule which requires the full TypeScript type-checker to be available, but you have not configured type information for the TypeScript files in your project ESLint config ${eslintConfigPath || eslintConfigPathForError}

The simplest way to enable type information is to set \`languageOptions.parserOptions.projectService\` to \`true\` for your TypeScript files. For full guidance on how to resolve this issue, please see https://github.com/angular-eslint/angular-eslint/blob/main/docs/RULES_REQUIRING_TYPE_INFORMATION.md
`);
                return {
                    success: false,
                };
            }
            // If some unexpected error, rethrow
            throw err;
        }
        if (lintResults.length === 0) {
            const ignoredPatterns = (await Promise.all(options.lintFilePatterns.map(async (pattern) => (await eslint.isPathIgnored(pattern)) ? pattern : null)))
                .filter((pattern) => !!pattern)
                .map((pattern) => `- '${pattern}'`);
            if (ignoredPatterns.length) {
                throw new Error(`All files matching the following patterns are ignored:\n${ignoredPatterns.join('\n')}\n\nPlease check the 'ignores' configuration in your ESLint flat config.`);
            }
            throw new Error('Invalid lint configuration. Nothing to lint. Please check your lint target pattern(s).');
        }
        // output fixes to disk, if applicable based on the options
        await ESLint.outputFixes(lintResults);
        const formatter = await eslint.loadFormatter(options.format);
        let totalErrors = 0;
        let totalWarnings = 0;
        const reportOnlyErrors = options.quiet;
        const maxWarnings = options.maxWarnings;
        // Calculate totals for all results
        for (const result of lintResults) {
            totalErrors += result.errorCount;
            totalWarnings += result.warningCount;
        }
        /**
         * Pass all lint results to the formatter, including files with no issues.
         * This ensures formatters like "ratchet" that need complete file information work correctly.
         * If quiet mode is enabled, we still filter messages but preserve all file results.
         */
        let finalLintResults = lintResults;
        if (reportOnlyErrors) {
            // In quiet mode, filter messages but keep all file results
            finalLintResults = lintResults.map((result) => ({
                ...result,
                messages: result.messages.filter(({ severity }) => severity === 2),
            }));
        }
        const hasWarningsToPrint = totalWarnings > 0 && !reportOnlyErrors;
        const hasErrorsToPrint = totalErrors > 0;
        /**
         * It's important that we format all results together so that custom
         * formatters, such as checkstyle, can provide a valid output for the
         * whole project being linted.
         *
         * Additionally, apart from when outputting to a file, we want to always
         * log (even when no results) because different formatters handled the
         * "no results" case differently.
         */
        const formattedResults = await formatter.format(finalLintResults);
        if (options.outputFile) {
            // Interpolate placeholders in outputFile path
            let interpolatedOutputFile = options.outputFile;
            if (interpolatedOutputFile.includes('{projectName}')) {
                interpolatedOutputFile = interpolatedOutputFile.replace(/{projectName}/g, projectName);
            }
            if (interpolatedOutputFile.includes('{projectRoot}')) {
                interpolatedOutputFile = interpolatedOutputFile.replace(/{projectRoot}/g, projectRoot);
            }
            // Clean up any resulting double slashes or leading slashes from empty replacements
            interpolatedOutputFile = interpolatedOutputFile
                .replace(/\/+/g, '/')
                .replace(/^\//, '');
            const pathToOutputFile = (0, path_1.join)(systemRoot, interpolatedOutputFile);
            (0, fs_1.mkdirSync)((0, path_1.dirname)(pathToOutputFile), { recursive: true });
            (0, fs_1.writeFileSync)(pathToOutputFile, formattedResults);
        }
        else {
            console.info(formattedResults);
        }
        if (hasWarningsToPrint && printInfo) {
            console.warn('Lint warnings found in the listed files.\n');
        }
        if (hasErrorsToPrint && printInfo) {
            console.error('Lint errors found in the listed files.\n');
        }
        if ((totalWarnings === 0 || reportOnlyErrors) &&
            totalErrors === 0 &&
            printInfo) {
            console.info('All files pass linting.\n');
        }
        const tooManyWarnings = maxWarnings >= 0 && totalWarnings > maxWarnings;
        if (tooManyWarnings && printInfo) {
            console.error(`Found ${totalWarnings} warnings, which exceeds your configured limit (${options.maxWarnings}). Either increase your maxWarnings limit or fix some of the lint warnings.`);
        }
        return {
            success: options.force || (totalErrors === 0 && !tooManyWarnings),
        };
    }
    catch (err) {
        let errorMessage = 'Unknown error';
        if (err instanceof Error) {
            errorMessage = `Error when running ESLint: ${err.message}`;
        }
        return {
            success: false,
            error: String(errorMessage),
        };
    }
});
function resolveESLintConfigPath(projectRoot) {
    for (const name of eslint_utils_1.defaultFlatConfigNames) {
        const candidate = (0, path_1.join)(projectRoot, name);
        if ((0, fs_1.existsSync)(candidate)) {
            return candidate;
        }
    }
    return null;
}
