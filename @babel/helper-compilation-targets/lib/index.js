import browserslist from 'browserslist';
import { OptionValidator, findSuggestion } from '@babel/helper-validator-option';
import browserModulesData from '@babel/compat-data/native-modules' with { type: 'json' };
import { LRUCache } from 'lru-cache';
import semver from 'semver';
import pluginsCompatData from '@babel/compat-data/plugins' with { type: 'json' };

const unreleasedLabels = {
  safari: "tp"
};
const browserNameMap = {
  and_chr: "chrome",
  and_ff: "firefox",
  android: "android",
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ie_mob: "ie",
  ios_saf: "ios",
  node: "node",
  deno: "deno",
  op_mob: "opera_mobile",
  opera: "opera",
  safari: "safari",
  samsung: "samsung"
};

const versionRegExp = /^(?:\d+|\d(?:\d?[^\d\n\r\u2028\u2029]\d+|\d{2,}(?:[^\d\n\r\u2028\u2029]\d+)?))$/;
const v$1 = new OptionValidator("@babel/helper-compilation-targets");
function semverMin(first, second) {
  return first && semver.lt(first, second) ? first : second;
}
function semverify(version) {
  if (typeof version === "string" && semver.valid(version)) {
    return version;
  }
  v$1.invariant(typeof version === "number" || typeof version === "string" && versionRegExp.test(version), `'${version}' is not a valid version`);
  version = version.toString();
  let pos = 0;
  let num = 0;
  while ((pos = version.indexOf(".", pos + 1)) > 0) {
    num++;
  }
  return version + ".0".repeat(2 - num);
}
function isUnreleasedVersion(version, env) {
  const unreleasedLabel = unreleasedLabels[env];
  return !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase();
}
function getLowestUnreleased(a, b, env) {
  const unreleasedLabel = unreleasedLabels[env];
  if (a === unreleasedLabel) {
    return b;
  }
  if (b === unreleasedLabel) {
    return a;
  }
  return semverMin(a, b);
}
function getHighestUnreleased(a, b, env) {
  return getLowestUnreleased(a, b, env) === a ? b : a;
}
function getLowestImplementedVersion(plugin, environment) {
  const result = plugin[environment];
  if (!result && environment === "android") {
    return plugin.chrome;
  }
  return result;
}

const TargetNames = {
  node: "node",
  deno: "deno",
  chrome: "chrome",
  opera: "opera",
  edge: "edge",
  firefox: "firefox",
  safari: "safari",
  ie: "ie",
  ios: "ios",
  android: "android",
  electron: "electron",
  samsung: "samsung",
  rhino: "rhino",
  opera_mobile: "opera_mobile"
};

function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }
  const {
    major,
    minor,
    patch
  } = semver.parse(version);
  const parts = [major];
  if (minor || patch) {
    parts.push(minor);
  }
  if (patch) {
    parts.push(patch);
  }
  return parts.join(".");
}
function prettifyTargets(targets) {
  return Object.keys(targets).reduce((results, target) => {
    let value = targets[target];
    const unreleasedLabel = unreleasedLabels[target];
    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }
    results[target] = value;
    return results;
  }, {});
}

function getInclusionReasons(item, targetVersions, list) {
  const minVersions = list[item] || {};
  return Object.keys(targetVersions).reduce((result, env) => {
    const minVersion = getLowestImplementedVersion(minVersions, env);
    const targetVersion = targetVersions[env];
    if (!minVersion) {
      result[env] = prettifyVersion(targetVersion);
    } else {
      const minIsUnreleased = isUnreleasedVersion(minVersion, env);
      const targetIsUnreleased = isUnreleasedVersion(targetVersion, env);
      if (!targetIsUnreleased && (minIsUnreleased || semver.lt(targetVersion.toString(), semverify(minVersion)))) {
        result[env] = prettifyVersion(targetVersion);
      }
    }
    return result;
  }, {});
}

function targetsSupported(target, support) {
  const targetEnvironments = Object.keys(target);
  if (targetEnvironments.length === 0) {
    return false;
  }
  const unsupportedEnvironments = targetEnvironments.filter(environment => {
    const lowestImplementedVersion = getLowestImplementedVersion(support, environment);
    if (!lowestImplementedVersion) {
      return true;
    }
    const lowestTargetedVersion = target[environment];
    if (isUnreleasedVersion(lowestTargetedVersion, environment)) {
      return false;
    }
    if (isUnreleasedVersion(lowestImplementedVersion, environment)) {
      return true;
    }
    if (!semver.valid(lowestTargetedVersion.toString())) {
      throw new Error(`Invalid version passed for target "${environment}": "${lowestTargetedVersion}". ` + "Versions must be in semver format (major.minor.patch)");
    }
    return semver.gt(semverify(lowestImplementedVersion), lowestTargetedVersion.toString());
  });
  return unsupportedEnvironments.length === 0;
}
function isRequired(name, targets, {
  compatData = pluginsCompatData,
  includes,
  excludes
} = {}) {
  if (excludes?.has(name)) return false;
  if (includes?.has(name)) return true;
  return !targetsSupported(targets, compatData[name]);
}
function filterItems(list, includes, excludes, targets, defaultIncludes, defaultExcludes, pluginSyntaxMap) {
  const result = new Set();
  const options = {
    compatData: list,
    includes,
    excludes
  };
  for (const item in list) {
    if (isRequired(item, targets, options)) {
      result.add(item);
    } else if (pluginSyntaxMap) {
      const shippedProposalsSyntax = pluginSyntaxMap.get(item);
      if (shippedProposalsSyntax) {
        result.add(shippedProposalsSyntax);
      }
    }
  }
  defaultIncludes?.forEach(item => !excludes.has(item) && result.add(item));
  defaultExcludes?.forEach(item => !includes.has(item) && result.delete(item));
  return result;
}

const ESM_SUPPORT = browserModulesData["es6.module"];
const v = new OptionValidator("@babel/helper-compilation-targets");
function validateTargetNames(targets) {
  const validTargets = Object.keys(TargetNames);
  for (const target of Object.keys(targets)) {
    if (!(target in TargetNames)) {
      throw new Error(v.formatMessage(`'${target}' is not a valid target
- Did you mean '${findSuggestion(target, validTargets)}'?`));
    }
  }
  return targets;
}
function isBrowsersQueryValid(browsers) {
  return typeof browsers === "string" || Array.isArray(browsers) && browsers.every(b => typeof b === "string");
}
function validateBrowsers(browsers) {
  v.invariant(browsers === undefined || isBrowsersQueryValid(browsers), `'${String(browsers)}' is not a valid browserslist query`);
  return browsers;
}
function getLowestVersions(browsers) {
  return browsers.reduce((all, browser) => {
    const [browserName, browserVersion] = browser.split(" ");
    const target = browserNameMap[browserName];
    if (!target) {
      return all;
    }
    try {
      const splitVersion = browserVersion.split("-")[0].toLowerCase();
      const isSplitUnreleased = isUnreleasedVersion(splitVersion, target);
      if (!all[target]) {
        all[target] = isSplitUnreleased ? splitVersion : semverify(splitVersion);
        return all;
      }
      const version = all[target];
      const isUnreleased = isUnreleasedVersion(version, target);
      if (isUnreleased && isSplitUnreleased) {
        all[target] = getLowestUnreleased(version, splitVersion, target);
      } else if (isUnreleased) {
        all[target] = semverify(splitVersion);
      } else if (!isUnreleased && !isSplitUnreleased) {
        const parsedBrowserVersion = semverify(splitVersion);
        all[target] = semverMin(version, parsedBrowserVersion);
      }
    } catch (_) {}
    return all;
  }, {});
}
function outputDecimalWarning(decimalTargets) {
  if (!decimalTargets.length) {
    return;
  }
  console.warn("Warning, the following targets are using a decimal version:\n");
  decimalTargets.forEach(({
    target,
    value
  }) => console.warn(`  ${target}: ${value}`));
  console.warn(`
We recommend using a string for minor/patch versions to avoid numbers like 6.10
getting parsed as 6.1, which can lead to unexpected behavior.
`);
}
function semverifyTarget(target, value) {
  try {
    return semverify(value);
  } catch (e) {
    throw new Error(v.formatMessage(`'${value}' is not a valid value for 'targets.${target}'.`), {
      cause: e
    });
  }
}
function nodeTargetParser(value) {
  const parsed = value === true || value === "current" ? process.versions.node.split("-")[0] : semverifyTarget("node", value);
  return ["node", parsed];
}
function defaultTargetParser(target, value) {
  const version = isUnreleasedVersion(value, target) ? value.toLowerCase() : semverifyTarget(target, value);
  return [target, version];
}
function generateTargets(inputTargets) {
  const input = {
    ...inputTargets
  };
  delete input.esmodules;
  delete input.browsers;
  return input;
}
function resolveTargets(queries, env) {
  const resolved = browserslist(queries, {
    mobileToDesktop: true,
    env
  });
  return getLowestVersions(resolved);
}
const targetsCache = new LRUCache({
  max: 64
});
function resolveTargetsCached(queries, env) {
  const cacheKey = typeof queries === "string" ? queries : queries.join() + env;
  let cached = targetsCache.get(cacheKey);
  if (!cached) {
    cached = resolveTargets(queries, env);
    targetsCache.set(cacheKey, cached);
  }
  return {
    ...cached
  };
}
function getTargets(inputTargets = {}, options = {}) {
  let {
    browsers,
    esmodules
  } = inputTargets;
  const {
    configPath = ".",
    onBrowserslistConfigFound
  } = options;
  validateBrowsers(browsers);
  const input = generateTargets(inputTargets);
  let targets = validateTargetNames(input);
  const shouldParseBrowsers = !!browsers;
  const hasTargets = shouldParseBrowsers || Object.keys(targets).length > 0;
  const shouldSearchForConfig = !options.ignoreBrowserslistConfig && !hasTargets;
  if (!browsers && shouldSearchForConfig) {
    browsers = process.env.BROWSERSLIST;
    if (!browsers) {
      const configFile = options.configFile || process.env.BROWSERSLIST_CONFIG || browserslist.findConfigFile(configPath);
      if (configFile != null) {
        onBrowserslistConfigFound?.(configFile);
        browsers = browserslist.loadConfig({
          config: configFile,
          env: options.browserslistEnv
        });
      }
    }
    if (browsers == null) {
      browsers = ["defaults"];
    }
  }
  if (esmodules && !browsers?.length) {
    browsers = Object.keys(ESM_SUPPORT).map(browser => `${browser} >= ${ESM_SUPPORT[browser]}`).join(", ");
    esmodules = false;
  }
  if (browsers?.length) {
    const queryBrowsers = resolveTargetsCached(browsers, options.browserslistEnv);
    if (esmodules) {
      for (const browser of Object.keys(queryBrowsers)) {
        if (browser !== "deno" && browser !== "ie") {
          const esmSupportVersion = ESM_SUPPORT[browser === "opera_mobile" ? "op_mob" : browser];
          if (esmSupportVersion) {
            const version = queryBrowsers[browser];
            queryBrowsers[browser] = getHighestUnreleased(version, semverify(esmSupportVersion), browser);
          } else {
            delete queryBrowsers[browser];
          }
        } else {
          delete queryBrowsers[browser];
        }
      }
    }
    targets = Object.assign(queryBrowsers, targets);
  }
  const result = {};
  const decimalWarnings = [];
  for (const target of Object.keys(targets).sort()) {
    const value = targets[target];
    if (typeof value === "number" && value % 1 !== 0) {
      decimalWarnings.push({
        target,
        value
      });
    }
    const [parsedTarget, parsedValue] = target === "node" ? nodeTargetParser(value) : defaultTargetParser(target, value);
    if (parsedValue) {
      result[parsedTarget] = parsedValue;
    }
  }
  outputDecimalWarning(decimalWarnings);
  return result;
}

export { TargetNames, getTargets as default, filterItems, getInclusionReasons, isBrowsersQueryValid, isRequired, prettifyTargets, unreleasedLabels };
//# sourceMappingURL=index.js.map
