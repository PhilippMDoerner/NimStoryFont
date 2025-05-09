"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("storybook/internal/common");
const core_server_1 = require("storybook/internal/core-server");
const telemetry_1 = require("storybook/internal/telemetry");
const architect_1 = require("@angular-devkit/architect");
const fd_package_json_1 = require("fd-package-json");
const find_up_1 = require("find-up");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const error_handler_1 = require("../utils/error-handler");
const run_compodoc_1 = require("../utils/run-compodoc");
(0, telemetry_1.addToGlobalContext)('cliVersion', common_1.versions.storybook);
const commandBuilder = (options, context) => {
    const builder = (0, rxjs_1.from)(setup(options, context)).pipe((0, operators_1.switchMap)(({ tsConfig }) => {
        const docTSConfig = (0, find_up_1.sync)('tsconfig.doc.json', { cwd: options.configDir });
        const runCompodoc$ = options.compodoc
            ? (0, run_compodoc_1.runCompodoc)({ compodocArgs: options.compodocArgs, tsconfig: docTSConfig ?? tsConfig }, context).pipe((0, operators_1.mapTo)({ tsConfig }))
            : (0, rxjs_1.of)({});
        return runCompodoc$.pipe((0, operators_1.mapTo)({ tsConfig }));
    }), (0, operators_1.map)(({ tsConfig }) => {
        (0, common_1.getEnvConfig)(options, {
            staticDir: 'SBCONFIG_STATIC_DIR',
            outputDir: 'SBCONFIG_OUTPUT_DIR',
            configDir: 'SBCONFIG_CONFIG_DIR',
        });
        const { browserTarget, stylePreprocessorOptions, styles, configDir, docs, loglevel, test, outputDir, quiet, enableProdMode = true, webpackStatsJson, statsJson, debugWebpack, disableTelemetry, assets, previewUrl, sourceMap = false, preserveSymlinks = false, experimentalZoneless = false, } = options;
        const standaloneOptions = {
            packageJson: (0, fd_package_json_1.findPackageSync)(__dirname),
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
    }), (0, operators_1.switchMap)((standaloneOptions) => runInstance({ ...standaloneOptions, mode: 'static' })), (0, operators_1.map)(() => {
        return { success: true };
    }));
    return builder;
};
exports.default = (0, architect_1.createBuilder)(commandBuilder);
async function setup(options, context) {
    let browserOptions;
    let browserTarget;
    if (options.browserTarget) {
        browserTarget = (0, architect_1.targetFromTargetString)(options.browserTarget);
        browserOptions = await context.validateOptions(await context.getTargetOptions(browserTarget), await context.getBuilderNameForTarget(browserTarget));
    }
    return {
        tsConfig: options.tsConfig ??
            (0, find_up_1.sync)('tsconfig.json', { cwd: options.configDir }) ??
            browserOptions.tsConfig,
    };
}
function runInstance(options) {
    return (0, rxjs_1.from)((0, core_server_1.withTelemetry)('build', {
        cliOptions: options,
        presetOptions: { ...options, corePresets: [], overridePresets: [] },
        printError: error_handler_1.printErrorDetails,
    }, () => (0, core_server_1.buildStaticStandalone)(options))).pipe((0, operators_1.catchError)((error) => (0, rxjs_1.throwError)((0, error_handler_1.errorSummary)(error))));
}
