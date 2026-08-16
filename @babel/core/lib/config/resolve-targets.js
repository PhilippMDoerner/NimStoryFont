import path from 'node:path';
import getTargets from '@babel/helper-compilation-targets';

function resolveBrowserslistConfigFile(browserslistConfigFile, configFileDir) {
  return path.resolve(configFileDir, browserslistConfigFile);
}
function resolveTargets(options, root) {
  const optTargets = options.targets;
  let targets;
  if (typeof optTargets === "string" || Array.isArray(optTargets)) {
    targets = {
      browsers: optTargets
    };
  } else if (optTargets) {
    targets = optTargets;
  }
  const {
    browserslistConfigFile
  } = options;
  let configFile;
  let ignoreBrowserslistConfig = false;
  if (typeof browserslistConfigFile === "string") {
    configFile = browserslistConfigFile;
  } else {
    ignoreBrowserslistConfig = browserslistConfigFile === false;
  }
  return getTargets(targets, {
    ignoreBrowserslistConfig,
    configFile,
    configPath: root,
    browserslistEnv: options.browserslistEnv
  });
}

export { resolveBrowserslistConfigFile, resolveTargets };
//# sourceMappingURL=resolve-targets.js.map
