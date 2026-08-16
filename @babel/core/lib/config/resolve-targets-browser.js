import getTargets from '@babel/helper-compilation-targets';

function resolveBrowserslistConfigFile(browserslistConfigFile, configFilePath) {
  return undefined;
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
  return getTargets(targets, {
    ignoreBrowserslistConfig: true,
    browserslistEnv: options.browserslistEnv
  });
}

export { resolveBrowserslistConfigFile, resolveTargets };
//# sourceMappingURL=resolve-targets-browser.js.map
