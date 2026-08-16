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

// src/builders/start-storybook/index.ts
import { readFileSync } from "node:fs";
import { getEnvConfig, getProjectRoot, versions } from "storybook/internal/common";
import { buildDevStandalone, withTelemetry } from "storybook/internal/core-server";
import { addToGlobalContext } from "storybook/internal/telemetry";
import { logger, logTracker } from "storybook/internal/node-logger";
import { createBuilder, targetFromTargetString } from "@angular-devkit/architect";
import { Observable } from "rxjs";
import { VERSION } from "@angular/core";
import { Channel } from "storybook/internal/channels";
addToGlobalContext("cliVersion", versions.storybook);
var commandBuilder = (options, context) => new Observable((observer) => {
  (async () => {
    try {
      options.loglevel && logger.setLogLevel(options.loglevel), options.logfile && logTracker.enableLogWriting(), logger.intro("Starting Storybook");
      let { tsConfig } = await setup(options, context), docTSConfig = up("tsconfig.doc.json", {
        cwd: options.configDir,
        last: getProjectRoot()
      });
      options.compodoc && await runCompodoc(
        {
          compodocArgs: [...options.compodocArgs, ...options.quiet ? ["--silent"] : []],
          tsconfig: docTSConfig ?? tsConfig
        },
        context
      ), getEnvConfig(options, {
        port: "SBCONFIG_PORT",
        host: "SBCONFIG_HOSTNAME",
        staticDir: "SBCONFIG_STATIC_DIR",
        configDir: "SBCONFIG_CONFIG_DIR",
        ci: "CI"
      }), options.port = parseInt(`${options.port}`, 10);
      let {
        browserTarget,
        stylePreprocessorOptions,
        styles,
        ci,
        configDir,
        docs,
        host,
        https,
        port,
        quiet,
        enableProdMode = !1,
        smokeTest,
        sslCa,
        sslCert,
        sslKey,
        disableTelemetry,
        assets,
        initialPath,
        open,
        debugWebpack,
        loglevel,
        webpackStatsJson,
        statsJson,
        previewUrl,
        sourceMap = !1,
        preserveSymlinks = !1,
        experimentalZoneless = !!(VERSION.major && Number(VERSION.major) >= 21)
      } = options, packageJsonPath = up2({ cwd: __dirname }), standaloneOptions = {
        packageJson: packageJsonPath != null ? JSON.parse(readFileSync(packageJsonPath, "utf8")) : null,
        ci,
        configDir,
        ...docs ? { docs } : {},
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
          ...stylePreprocessorOptions ? { stylePreprocessorOptions } : {},
          ...styles ? { styles } : {},
          ...assets ? { assets } : {},
          preserveSymlinks,
          sourceMap,
          experimentalZoneless
        },
        tsConfig,
        initialPath,
        open,
        debugWebpack,
        webpackStatsJson,
        statsJson,
        loglevel,
        previewUrl
      }, startedPort = await runInstance(standaloneOptions);
      observer.next({ success: !0, info: { port: startedPort } });
    } catch (error) {
      try {
        if (logTracker.shouldWriteLogsToFile)
          try {
            let logFile = await logTracker.writeToFile(options.logfile);
            logger.outro(`Debug logs are written to: ${logFile}`);
          } catch {
          }
      } catch {
      }
      observer.error(error);
    }
  })();
}), start_storybook_default = createBuilder(commandBuilder);
async function setup(options, context) {
  let browserOptions, browserTarget;
  return options.browserTarget && (browserTarget = targetFromTargetString(options.browserTarget), browserOptions = await context.validateOptions(
    await context.getTargetOptions(browserTarget),
    await context.getBuilderNameForTarget(browserTarget)
  )), {
    tsConfig: options.tsConfig ?? up("tsconfig.json", { cwd: options.configDir }) ?? browserOptions.tsConfig
  };
}
async function runInstance(options) {
  try {
    let { port } = await withTelemetry(
      "dev",
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
      () => buildDevStandalone(options)
    );
    return port;
  } catch (error) {
    let summarized = errorSummary(error);
    throw new Error(String(summarized));
  }
}
export {
  start_storybook_default as default
};
