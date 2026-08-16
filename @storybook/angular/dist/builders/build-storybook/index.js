import CJS_COMPAT_NODE_URL_m3cx8917gnb from 'node:url';
import CJS_COMPAT_NODE_PATH_m3cx8917gnb from 'node:path';
import CJS_COMPAT_NODE_MODULE_m3cx8917gnb from "node:module";

var __filename = CJS_COMPAT_NODE_URL_m3cx8917gnb.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_m3cx8917gnb.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_m3cx8917gnb.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  errorSummary,
  printErrorDetails,
  runCompodoc,
  up as up2
} from "../../_node-chunks/chunk-YIJET4JG.js";
import {
  up
} from "../../_node-chunks/chunk-STYMOUJP.js";

// src/builders/build-storybook/index.ts
import { readFileSync } from "node:fs";
import { getEnvConfig, getProjectRoot, versions } from "storybook/internal/common";
import { buildStaticStandalone, withTelemetry } from "storybook/internal/core-server";
import { addToGlobalContext } from "storybook/internal/telemetry";
import { logger, logTracker } from "storybook/internal/node-logger";
import { createBuilder, targetFromTargetString } from "@angular-devkit/architect";
import { VERSION } from "@angular/core";
import { Channel } from "storybook/internal/channels";
addToGlobalContext("cliVersion", versions.storybook);
var commandBuilder = async (options, context) => {
  options.loglevel && logger.setLogLevel(options.loglevel), options.logfile && logTracker.enableLogWriting(), logger.intro("Building Storybook");
  let { tsConfig } = await setup(options, context), docTSConfig = up("tsconfig.doc.json", {
    cwd: options.configDir,
    last: getProjectRoot()
  });
  options.compodoc && await runCompodoc(
    { compodocArgs: options.compodocArgs, tsconfig: docTSConfig ?? tsConfig },
    context
  ), getEnvConfig(options, {
    staticDir: "SBCONFIG_STATIC_DIR",
    outputDir: "SBCONFIG_OUTPUT_DIR",
    configDir: "SBCONFIG_CONFIG_DIR"
  });
  let {
    browserTarget,
    stylePreprocessorOptions,
    styles,
    configDir,
    docs,
    loglevel,
    test,
    outputDir,
    quiet,
    enableProdMode = !0,
    webpackStatsJson,
    statsJson,
    debugWebpack,
    disableTelemetry,
    assets,
    previewUrl,
    sourceMap = !1,
    preserveSymlinks = !1,
    experimentalZoneless = !!(VERSION.major && Number(VERSION.major) >= 21)
  } = options, packageJsonPath = up2({ cwd: __dirname }), standaloneOptions = {
    packageJson: packageJsonPath != null ? JSON.parse(readFileSync(packageJsonPath, "utf8")) : null,
    configDir,
    ...docs ? { docs } : {},
    loglevel,
    outputDir,
    test,
    quiet,
    enableProdMode,
    disableTelemetry,
    angularBrowserTarget: browserTarget,
    angularBuilderContext: context,
    angularBuilderOptions: {
      ...stylePreprocessorOptions ? { stylePreprocessorOptions } : {},
      ...styles ? { styles } : {},
      ...assets ? { assets } : {},
      sourceMap,
      preserveSymlinks,
      experimentalZoneless
    },
    tsConfig,
    webpackStatsJson,
    statsJson,
    debugWebpack,
    previewUrl
  };
  if (await runInstance({ ...standaloneOptions, mode: "static" }), logTracker.shouldWriteLogsToFile) {
    let logFile = await logTracker.writeToFile(options.logfile);
    logger.info(`Debug logs are written to: ${logFile}`);
  }
  return logger.outro("Storybook build completed successfully"), { success: !0 };
}, build_storybook_default = createBuilder(commandBuilder);
async function setup(options, context) {
  let browserOptions, browserTarget;
  return options.browserTarget && (browserTarget = targetFromTargetString(options.browserTarget), browserOptions = await context.validateOptions(
    await context.getTargetOptions(browserTarget),
    await context.getBuilderNameForTarget(browserTarget)
  )), {
    tsConfig: options.tsConfig ?? up("tsconfig.json", { cwd: options.configDir, last: getProjectRoot() }) ?? browserOptions.tsConfig
  };
}
async function runInstance(options) {
  try {
    await withTelemetry(
      "build",
      {
        cliOptions: options,
        presetOptions: {
          ...options,
          corePresets: [],
          overridePresets: [],
          channel: new Channel({})
        },
        printError: printErrorDetails
      },
      async () => await buildStaticStandalone(options)
    );
  } catch (error) {
    let summary = errorSummary(error);
    throw new Error(summary);
  }
}
export {
  build_storybook_default as default
};
