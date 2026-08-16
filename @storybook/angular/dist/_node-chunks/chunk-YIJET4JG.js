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
  up
} from "./chunk-STYMOUJP.js";

// ../../../node_modules/empathic/package.mjs
function up2(options) {
  return up("package.json", options);
}

// src/builders/utils/error-handler.ts
import { logger, instance as npmLog } from "storybook/internal/node-logger";
import { dedent } from "ts-dedent";
var printErrorDetails = (error) => {
  npmLog.heading = "", error instanceof Error ? error.error ? logger.error(error.error) : error.stats && error.stats.compilation.errors ? error.stats.compilation.errors.forEach((e) => logger.log(e)) : logger.error(error) : error.compilation?.errors && error.compilation.errors.forEach((e) => logger.log(e));
}, errorSummary = (error) => error.close ? dedent`
      FATAL broken build!, will close the process,
      Fix the error below and restart storybook.
    ` : dedent`
      Broken build, fix the error above.
      You may need to refresh the browser.
    `;

// src/builders/utils/run-compodoc.ts
import { isAbsolute, relative } from "node:path";
import { JsPackageManagerFactory } from "storybook/internal/common";
import { prompt } from "storybook/internal/node-logger";
var hasTsConfigArg = (args) => args.indexOf("-p") !== -1, hasOutputArg = (args) => args.indexOf("-d") !== -1 || args.indexOf("--output") !== -1, toRelativePath = (pathToTsConfig) => isAbsolute(pathToTsConfig) ? relative(".", pathToTsConfig) : pathToTsConfig, runCompodoc = async ({ compodocArgs, tsconfig }, context) => {
  let tsConfigPath = toRelativePath(tsconfig), finalCompodocArgs = [
    "compodoc",
    ...hasTsConfigArg(compodocArgs) ? [] : ["-p", tsConfigPath],
    ...hasOutputArg(compodocArgs) ? [] : ["-d", `${context.workspaceRoot || "."}`],
    ...compodocArgs
  ], packageManager = JsPackageManagerFactory.getPackageManager();
  await prompt.executeTaskWithSpinner(
    () => packageManager.runPackageCommand({
      args: finalCompodocArgs,
      cwd: context.workspaceRoot
    }),
    {
      id: "compodoc",
      intro: "Generating documentation with Compodoc",
      success: "Compodoc finished successfully",
      error: "Compodoc failed"
    }
  );
};

export {
  up2 as up,
  printErrorDetails,
  errorSummary,
  runCompodoc
};
