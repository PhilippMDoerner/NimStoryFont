import { getEnvConfig, getProjectRoot, versions } from 'storybook/internal/common';
import { buildDevStandalone, withTelemetry } from 'storybook/internal/core-server';
import { addToGlobalContext } from 'storybook/internal/telemetry';
import { createBuilder, targetFromTargetString, } from '@angular-devkit/architect';
import { findPackageSync } from 'fd-package-json';
import { findUpSync } from 'find-up';
import { Observable, from, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
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
            ? runCompodoc({
                compodocArgs: [...options.compodocArgs, ...(options.quiet ? ['--silent'] : [])],
                tsconfig: docTSConfig ?? tsConfig,
            }, context).pipe(mapTo({ tsConfig }))
            : of({});
        return runCompodoc$.pipe(mapTo({ tsConfig }));
    }), map(({ tsConfig }) => {
        getEnvConfig(options, {
            port: 'SBCONFIG_PORT',
            host: 'SBCONFIG_HOSTNAME',
            staticDir: 'SBCONFIG_STATIC_DIR',
            configDir: 'SBCONFIG_CONFIG_DIR',
            ci: 'CI',
        });
        options.port = parseInt(`${options.port}`, 10);
        const { browserTarget, stylePreprocessorOptions, styles, ci, configDir, docs, host, https, port, quiet, enableProdMode = false, smokeTest, sslCa, sslCert, sslKey, disableTelemetry, assets, initialPath, open, debugWebpack, loglevel, webpackStatsJson, statsJson, previewUrl, sourceMap = false, preserveSymlinks = false, experimentalZoneless = false, } = options;
        const standaloneOptions = {
            packageJson: findPackageSync(__dirname),
            ci,
            configDir,
            ...(docs ? { docs } : {}),
            host,
            https,
            port,
            quiet,
            enableProdMode,
            smokeTest,
            sslCa,
            sslCert,
            sslKey,
            disableTelemetry,
            angularBrowserTarget: browserTarget,
            angularBuilderContext: context,
            angularBuilderOptions: {
                ...(stylePreprocessorOptions ? { stylePreprocessorOptions } : {}),
                ...(styles ? { styles } : {}),
                ...(assets ? { assets } : {}),
                preserveSymlinks,
                sourceMap,
                experimentalZoneless,
            },
            tsConfig,
            initialPath,
            open,
            debugWebpack,
            webpackStatsJson,
            statsJson,
            loglevel,
            previewUrl,
        };
        return standaloneOptions;
    }), switchMap((standaloneOptions) => runInstance(standaloneOptions)), map((port) => {
        return { success: true, info: { port } };
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
            findUpSync('tsconfig.json', { cwd: options.configDir }) ??
            browserOptions.tsConfig,
    };
}
function runInstance(options) {
    return new Observable((observer) => {
        // This Observable intentionally never complete, leaving the process running ;)
        withTelemetry('dev', {
            cliOptions: options,
            presetOptions: { ...options, corePresets: [], overridePresets: [] },
            printError: printErrorDetails,
        }, () => buildDevStandalone(options))
            .then(({ port }) => observer.next(port))
            .catch((error) => {
            observer.error(errorSummary(error));
        });
    });
}
