function findConfigUpwards(rootDir) {
  return null;
}
function* findPackageData(filepath) {
  return {
    filepath,
    directories: [],
    pkg: null,
    isPackage: false
  };
}
function* findRelativeConfig(pkgData, envName, caller) {
  return {
    config: null,
    ignore: null
  };
}
function* findRootConfig(dirname, envName, caller) {
  return null;
}
function* loadConfig(name, dirname, envName, caller) {
  throw new Error(`Cannot load ${name} relative to ${dirname} in a browser`);
}
function* resolveShowConfigPath(dirname) {
  return null;
}
const ROOT_CONFIG_FILENAMES = [];
function resolvePlugin(name, dirname) {
  return null;
}
function resolvePreset(name, dirname) {
  return null;
}
function loadPlugin(name, dirname) {
  throw new Error(`Cannot load plugin ${name} relative to ${dirname} in a browser`);
}
function loadPreset(name, dirname) {
  throw new Error(`Cannot load preset ${name} relative to ${dirname} in a browser`);
}

export { ROOT_CONFIG_FILENAMES, findConfigUpwards, findPackageData, findRelativeConfig, findRootConfig, loadConfig, loadPlugin, loadPreset, resolvePlugin, resolvePreset, resolveShowConfigPath };
//# sourceMappingURL=index-browser.js.map
