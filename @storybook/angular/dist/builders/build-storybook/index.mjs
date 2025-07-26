import { getEnvConfig, getProjectRoot, versions } from 'storybook/internal/common';
import { buildStaticStandalone, withTelemetry } from 'storybook/internal/core-server';
import { addToGlobalContext } from 'storybook/internal/telemetry';
import { createBuilder, targetFromTargetString, } from '@angular-devkit/architect';
import { findPackageSync } from 'fd-package-json';
import { findUpSync } from 'find-up';
import { from, of, throwError } from 'rxjs';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import { errorSummary, printErrorDetails } from '../utils/error-handler';
import { runCompodoc } from '../utils/run-compodoc';
addToGlobalContext('cliVersion', versions.storybook);
const commandBuilder = (options, context) => {
    const builder = from(setup(options, context)).pipe(switchMap(({ tsConfig }) => {
        const docTSConfig = findUpSync('tsconfig.doc.json', {
            cwd: options.configDir,
            stopAt: getProjectRoot(),
        });
        const runCompodoc$ = options.compodoc
            ? runCompodoc({ compodocArgs: options.compodocArgs, tsconfig: docTSConfig ?? tsConfig }, context).pipe(mapTo({ tsConfig }))
            : of({});
        return runCompodoc$.pipe(mapTo({ tsConfig }));
    }), map(({ tsConfig }) => {
        getEnvConfig(options, {
            staticDir: 'SBCONFIG_STATIC_DIR',
            outputDir: 'SBCONFIG_OUTPUT_DIR',
            configDir: 'SBCONFIG_CONFIG_DIR',
        });
        const { browserTarget, stylePreprocessorOptions, styles, configDir, docs, loglevel, test, outputDir, quiet, enableProdMode = true, webpackStatsJson, statsJson, debugWebpack, disableTelemetry, assets, previewUrl, sourceMap = false, preserveSymlinks = false, experimentalZoneless = false, } = options;
        const standaloneOptions = {
            packageJson: findPackageSync(__dirname),
            configDir,
            ...(docs ? { docs } : {}),
            loglevel,
            outputDir,
            test,
            quiet,
            enableProdMode,
            disableTelemetry,
            angularBrowserTarget: browserTarget,
            angularBuilderContext: context,
            angularBuilderOptions: {
                ...(stylePreprocessorOptions ? { stylePreprocessorOptions } : {}),
                ...(styles ? { styles } : {}),
                ...(assets ? { assets } : {}),
                sourceMap,
                preserveSymlinks,
                experimentalZoneless,
            },
            tsConfig,
            webpackStatsJson,
            statsJson,
            debugWebpack,
            previewUrl,
        };
        return standaloneOptions;
    }), switchMap((standaloneOptions) => runInstance({ ...standaloneOptions, mode: 'static' })), map(() => {
        return { success: true };
    }));
    return builder;
};
export default createBuilder(commandBuilder);
async function setup(options, context) {
    let browserOptions;
    let browserTarget;
    if (options.browserTarget) {
        browserTarget = targetFromTargetString(options.browserTarget);
        browserOptions = await context.validateOptions(await context.getTargetOptions(browserTarget), await context.getBuilderNameForTarget(browserTarget));
    }
    return {
        tsConfig: options.tsConfig ??
            findUpSync('tsconfig.json', { cwd: options.configDir, stopAt: getProjectRoot() }) ??
            browserOptions.tsConfig,
    };
}
function runInstance(options) {
    return from(withTelemetry('build', {
        cliOptions: options,
        presetOptions: { ...options, corePresets: [], overridePresets: [] },
        printError: printErrorDetails,
    }, () => buildStaticStandalone(options))).pipe(catchError((error) => throwError(errorSummary(error))));
}
