import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/cli/detectLanguage.ts
import { existsSync } from "node:fs";
import { join } from "node:path";
import { SupportedLanguage } from "storybook/internal/types";
import semver from "semver";
async function detectLanguage(packageManager, workingDir = process.cwd()) {
  let language = SupportedLanguage.JAVASCRIPT;
  return existsSync(join(workingDir, "jsconfig.json")) || (!!packageManager.getAllDependencies().typescript ? (await detectIncompatiblePackageVersions(packageManager)).length === 0 && (language = SupportedLanguage.TYPESCRIPT) : existsSync(join(workingDir, "tsconfig.json")) && (language = SupportedLanguage.TYPESCRIPT)), language;
}
async function detectIncompatiblePackageVersions(packageManager) {
  let getModulePackageJSONVersion = async (pkg) => (await packageManager.getModulePackageJSON(pkg))?.version ?? null, [
    typescriptVersion,
    prettierVersion,
    babelPluginTransformTypescriptVersion,
    typescriptEslintParserVersion,
    eslintPluginStorybookVersion
  ] = await Promise.all([
    getModulePackageJSONVersion("typescript"),
    getModulePackageJSONVersion("prettier"),
    getModulePackageJSONVersion("@babel/plugin-transform-typescript"),
    getModulePackageJSONVersion("@typescript-eslint/parser"),
    getModulePackageJSONVersion("eslint-plugin-storybook")
  ]), satisfies = (version, range) => version ? semver.satisfies(version, range, { includePrerelease: !0 }) : !1, incompatibleReasons = [];
  return typescriptVersion && !satisfies(typescriptVersion, ">=4.9.0") && incompatibleReasons.push(`typescript ${typescriptVersion} is below 4.9.0`), prettierVersion && !semver.gte(prettierVersion, "2.8.0") && incompatibleReasons.push(`prettier ${prettierVersion} is below 2.8.0`), babelPluginTransformTypescriptVersion && !satisfies(babelPluginTransformTypescriptVersion, ">=7.20.0") && incompatibleReasons.push(
    `@babel/plugin-transform-typescript ${babelPluginTransformTypescriptVersion} is below 7.20.0`
  ), typescriptEslintParserVersion && !satisfies(typescriptEslintParserVersion, ">=5.44.0") && incompatibleReasons.push(
    `@typescript-eslint/parser ${typescriptEslintParserVersion} is below 5.44.0`
  ), eslintPluginStorybookVersion && !eslintPluginStorybookVersion.startsWith("0.0.0-") && !satisfies(eslintPluginStorybookVersion, ">=0.6.8") && incompatibleReasons.push(
    `eslint-plugin-storybook ${eslintPluginStorybookVersion} is below 0.6.8`
  ), incompatibleReasons;
}

// src/cli/getStorybookData.ts
import { dirname, isAbsolute, resolve } from "node:path";
import { JsPackageManagerFactory, getStorybookInfo } from "storybook/internal/common";
import { getStoriesPathsFromConfig } from "storybook/internal/core-server";
import { isCsfFactoryPreview, readConfig } from "storybook/internal/csf-tools";
import { logger } from "storybook/internal/node-logger";
function getWorkingDir(configDir) {
  return isAbsolute(configDir) ? dirname(configDir) : resolve(process.cwd(), dirname(configDir));
}
var getStorybookData = async ({
  configDir: userDefinedConfigDir,
  packageManagerName,
  skipCache
}) => {
  logger.debug("Getting Storybook info...");
  let {
    mainConfig,
    mainConfigPath,
    configDir: configDirFromScript,
    previewConfigPath,
    versionSpecifier,
    frameworkPackage,
    rendererPackage,
    renderer,
    builderPackage,
    addons
  } = await getStorybookInfo(
    userDefinedConfigDir,
    userDefinedConfigDir ? dirname(userDefinedConfigDir) : void 0,
    { skipCache }
  ), configDir = userDefinedConfigDir || configDirFromScript || ".storybook", workingDir = getWorkingDir(configDir);
  logger.debug("Getting stories paths...");
  let storiesPaths = await getStoriesPathsFromConfig({
    stories: mainConfig.stories,
    configDir,
    workingDir
  });
  logger.debug("Getting package manager...");
  let packageManager = JsPackageManagerFactory.getPackageManager({
    force: packageManagerName,
    configDir,
    storiesPaths
  });
  logger.debug("Getting Storybook version...");
  let versionInstalled = (await packageManager.getModulePackageJSON("storybook"))?.version;
  logger.debug("Detecting CSF factory usage...");
  let hasCsfFactoryPreview = previewConfigPath ? isCsfFactoryPreview(await readConfig(previewConfigPath)) : !1;
  return {
    configDir,
    workingDir,
    mainConfig,
    /** The version specifier of Storybook from the user's package.json */
    versionSpecifier,
    /** The version of Storybook installed in the user's project */
    versionInstalled,
    mainConfigPath,
    previewConfigPath,
    packageManager,
    storiesPaths,
    hasCsfFactoryPreview,
    frameworkPackage,
    rendererPackage,
    renderer,
    builderPackage,
    addons
  };
};

export {
  detectLanguage,
  detectIncompatiblePackageVersions,
  getWorkingDir,
  getStorybookData
};
